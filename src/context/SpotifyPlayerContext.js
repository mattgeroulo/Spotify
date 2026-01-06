import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SpotifyPlayerContext = createContext(null);

const API_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3001";

export function SpotifyPlayerProvider({ children }) {
    const [player, setPlayer] = useState(null);
    const [deviceId, setDeviceId] = useState(null);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const initializePlayer = async () => {
            // Check if user is logged in
            try {
                const response = await fetch(`${API_URL}/api/auth-status`);
                const { isLoggedIn } = await response.json();

                if (!isLoggedIn) {
                    console.log('User not logged in, skipping player initialization');
                    return;
                }

                // Get access token
                const tokenResponse = await fetch(`${API_URL}/api/spotify-token`);
                const tokenData = await tokenResponse.json();

                if (!tokenData.is_user_token) {
                    console.log('No user token available, skipping player initialization');
                    return;
                }

                const token = tokenData.access_token;

                const initPlayer = () => {
                    const spotifyPlayer = new window.Spotify.Player({
                        name: "Bump'n Web Player",
                        getOAuthToken: cb => { cb(token); },
                        volume: 0.5
                    });

                    // Error handling
                    spotifyPlayer.addListener('initialization_error', ({ message }) => {
                        console.error('Initialization error:', message);
                        setError(message);
                    });

                    spotifyPlayer.addListener('authentication_error', ({ message }) => {
                        console.error('Authentication error:', message);
                        setError(message);
                    });

                    spotifyPlayer.addListener('account_error', ({ message }) => {
                        console.error('Account error:', message);
                        setError('Premium required for playback');
                    });

                    spotifyPlayer.addListener('playback_error', ({ message }) => {
                        console.error('Playback error:', message);
                        setError(message);
                    });

                    // Ready
                    spotifyPlayer.addListener('ready', ({ device_id }) => {
                        console.log('Spotify Player ready with Device ID:', device_id);
                        setDeviceId(device_id);
                        setIsReady(true);
                        setError(null);
                    });

                    // Not Ready
                    spotifyPlayer.addListener('not_ready', ({ device_id }) => {
                        console.log('Device has gone offline:', device_id);
                        setIsReady(false);
                    });

                    // Playback state changes
                    spotifyPlayer.addListener('player_state_changed', state => {
                        if (!state) return;

                        setIsPlaying(!state.paused);
                        setPosition(state.position);
                        setDuration(state.duration);

                        if (state.track_window.current_track) {
                            setCurrentTrack(state.track_window.current_track);
                        }
                    });

                    spotifyPlayer.connect();
                    setPlayer(spotifyPlayer);
                };

                // If SDK already loaded, initialize immediately
                if (window.Spotify) {
                    initPlayer();
                } else {
                    // Define callback first, then load SDK
                    window.onSpotifyWebPlaybackSDKReady = initPlayer;

                    // Dynamically load the SDK
                    const script = document.createElement('script');
                    script.src = 'https://sdk.scdn.co/spotify-player.js';
                    script.async = true;
                    document.body.appendChild(script);
                }

            } catch (err) {
                console.error('Error initializing player:', err);
                setError(err.message);
            }
        };

        initializePlayer();

        return () => {
            if (player) {
                player.disconnect();
            }
        };
    }, []);

    // Update position periodically when playing
    useEffect(() => {
        let interval;
        if (isPlaying && player) {
            interval = setInterval(async () => {
                const state = await player.getCurrentState();
                if (state) {
                    setPosition(state.position);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, player]);

    const playTrack = useCallback(async (trackUri) => {
        if (!deviceId) {
            setError('Player not ready');
            return;
        }

        try {
            const tokenResponse = await fetch(`${API_URL}/api/spotify-token`);
            const { access_token } = await tokenResponse.json();

            await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: [trackUri]
                })
            });
            setError(null);
        } catch (err) {
            console.error('Error playing track:', err);
            setError(err.message);
        }
    }, [deviceId]);

    const togglePlay = useCallback(async () => {
        if (player) {
            await player.togglePlay();
        }
    }, [player]);

    const seek = useCallback(async (positionMs) => {
        if (player) {
            await player.seek(positionMs);
        }
    }, [player]);

    const setVolume = useCallback(async (volume) => {
        if (player) {
            await player.setVolume(volume);
        }
    }, [player]);

    const value = {
        player,
        deviceId,
        isReady,
        isPlaying,
        currentTrack,
        position,
        duration,
        error,
        playTrack,
        togglePlay,
        seek,
        setVolume
    };

    return (
        <SpotifyPlayerContext.Provider value={value}>
            {children}
        </SpotifyPlayerContext.Provider>
    );
}

export function useSpotifyPlayer() {
    const context = useContext(SpotifyPlayerContext);
    if (!context) {
        throw new Error('useSpotifyPlayer must be used within a SpotifyPlayerProvider');
    }
    return context;
}
