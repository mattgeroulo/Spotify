import React from "react";
import "./TracksList.css";

export default function TracksList({ tracks }) {
    if (!tracks || tracks.length === 0) {
        return null;
    }

    return (
        <div className="tracks-list">
            <h3 className="tracks-title">Popular Songs</h3>
            <div className="tracks-container">
                {tracks.map((track, index) => (
                    <div key={track.id} className="track-item">
                        <div className="track-number">{index + 1}</div>
                        <div className="track-info">
                            <div className="track-name">{track.name}</div>
                            <div className="track-album">{track.album.name}</div>
                        </div>
                        <div className="track-duration">
                            {Math.floor(track.duration_ms / 60000)}:
                            {Math.floor((track.duration_ms % 60000) / 1000)
                                .toString()
                                .padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
