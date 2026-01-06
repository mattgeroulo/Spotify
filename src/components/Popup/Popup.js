import React, { useEffect } from 'react'
import "./Popup.css"
import ReactModal from 'react-modal'
import "../ArtistInfo/ArtistInfo.css"
import { useSpotifyPlayer } from '../../context/SpotifyPlayerContext'

function formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
}

export default function Popup({ selectedTrack = null, modalIsOpen, onClose, artist = null }) {
    const {
        isReady,
        isPlaying,
        currentTrack,
        position,
        duration,
        error,
        playTrack,
        togglePlay,
        seek
    } = useSpotifyPlayer();

    const isCurrentTrack = currentTrack?.uri === selectedTrack?.uri;

    const handlePlayClick = () => {
        if (isCurrentTrack) {
            togglePlay();
        } else if (selectedTrack?.uri) {
            playTrack(selectedTrack.uri);
        }
    };

    const handleSeek = (e) => {
        const progressBar = e.currentTarget;
        const clickPosition = e.nativeEvent.offsetX;
        const barWidth = progressBar.offsetWidth;
        const seekPosition = (clickPosition / barWidth) * duration;
        seek(seekPosition);
    };

    return (
        <ReactModal
            closeTimeoutMS={200}
            onRequestClose={onClose}
            isOpen={modalIsOpen}
            shouldCloseOnOverlayClick={true}
            className={{
                base: 'myModalContent',
                afterOpen: 'myModalContent--after-open',
                beforeClose: 'myModalContent--before-close'
            }}
            overlayClassName={{
                base: 'myModalOverlay',
                afterOpen: 'myModalOverlay--after-open',
                beforeClose: 'myModalOverlay--before-close'
            }}
        >
            {selectedTrack && selectedTrack.album && selectedTrack.album.images ? (
                <div className="popup-container">
                    <button className="popup-close-btn" onClick={onClose}>×</button>

                    <div className="popup-header">
                        <h2 className="popup-song-title">{selectedTrack.name}</h2>
                        <p className="popup-album-name">{selectedTrack.album.name}</p>
                    </div>

                    <div className="popup-body">
                        <img
                            src={selectedTrack.album.images?.[0]?.url || ''}
                            alt={selectedTrack.album.name}
                            className="popup-album-cover"
                        />

                        <div className="popup-player">
                            {error ? (
                                <div className="player-error">
                                    <span>{error}</span>
                                    <p className="error-hint">Make sure you're logged in with Spotify Premium</p>
                                </div>
                            ) : !isReady ? (
                                <div className="player-loading">
                                    <span>Connecting to Spotify...</span>
                                    <p className="loading-hint">Login required for playback</p>
                                </div>
                            ) : (
                                <>
                                    <button
                                        className="play-button"
                                        onClick={handlePlayClick}
                                        aria-label={isCurrentTrack && isPlaying ? 'Pause' : 'Play'}
                                    >
                                        {isCurrentTrack && isPlaying ? (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                                <rect x="14" y="4" width="4" height="16" rx="1" />
                                            </svg>
                                        ) : (
                                            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32">
                                                <path d="M8 5v14l11-7z" />
                                            </svg>
                                        )}
                                    </button>

                                    {isCurrentTrack && (
                                        <div className="progress-container">
                                            <span className="time-current">{formatTime(position)}</span>
                                            <div className="progress-bar" onClick={handleSeek}>
                                                <div
                                                    className="progress-fill"
                                                    style={{ width: `${(position / duration) * 100}%` }}
                                                />
                                            </div>
                                            <span className="time-total">{formatTime(duration)}</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="popup-runtime">
                            <span className="runtime-label">Track Duration</span>
                            <span className="runtime-value">{formatTime(selectedTrack.duration_ms)}</span>
                        </div>
                    </div>
                </div>
            ) : <div>Fallback</div>}
        </ReactModal>
    )
}
