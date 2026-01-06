import React from 'react';
import './NowPlaying.css';
import { useSpotifyPlayer } from '../../context/SpotifyPlayerContext';

export default function NowPlaying() {
    const { isReady, isPlaying, currentTrack, togglePlay } = useSpotifyPlayer();

    if (!isReady || !currentTrack) {
        return null;
    }

    const albumImage = currentTrack.album?.images?.[0]?.url;

    return (
        <div className="now-playing" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
            {albumImage && (
                <img
                    src={albumImage}
                    alt={currentTrack.name}
                    className="now-playing-cover"
                />
            )}
            <div className="now-playing-info">
                <span className="now-playing-title">{currentTrack.name}</span>
                <span className="now-playing-artist">
                    {currentTrack.artists?.map(a => a.name).join(', ')}
                </span>
            </div>
            {isPlaying ? (
                <div className="audio-bars">
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
            ) : (
                <div className="paused-icon">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M8 5v14l11-7z" />
                    </svg>
                </div>
            )}
        </div>
    );
}
