import React from "react";
import "./ArtistInfo.css";

export default function ArtistInfo({ artist }) {
    if (!artist) {
        return null;
    }

    return (
        <div className="artist-info">
            <div className="artist-header">
                {artist.images && artist.images.length > 0 && (
                    <img 
                        src={artist.images[0].url} 
                        alt={artist.name}
                        className="artist-image"
                    />
                )}
                <div className="artist-details">
                    <h2 className="artist-name">{artist.name}</h2>
                    <p className="artist-followers">
                        {artist.followers.total.toLocaleString()} followers
                    </p>
                    <p className="artist-genres">
                        {artist.genres.slice(0, 3).join(", ")}
                    </p>
                </div>
            </div>
        </div>
    );
}
