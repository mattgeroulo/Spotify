import { useState, useEffect } from "react";
import Header from "./Header";

export default function MyProfile() {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    fetch("http://backend:3001/profile")
      .then(res => res.json())
      .then(data => {
        console.log("Spotify playlists data:", data);
        // ✅ the playlist array is inside data.items
        setPlaylists(data.items || []);
      })
      .catch(err => console.error("Error fetching profile:", err));
  }, []);

  return (
    <div>
      <Header />

      <div>
        {playlists.length > 0 ? (
          <ul>
            {playlists.map((playlist) => (
              <li key={playlist.id}>
                {playlist.images?.[0] && (
                  <img
                    src={playlist.images[0].url}
                    alt={playlist.name}
                    style={{ width: "80px", height: "80px", borderRadius: "8px" }}
                  />
                )}
                <p>{playlist.name}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading playlists...</p>
        )}
      </div>
    </div>
  );
}
