// Spotify.js
export const getProfile = async () => {
  try {
    // 1️⃣ Fetch a valid access token from your backend server
    const tokenResponse = await fetch("http://localhost:3001/spotify-token");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2️⃣ Use that token to call Spotify's API
    const endPoint = "https://api.spotify.com/v1/tracks/2TpxZ7JUBn3uw46aR7qd6V";
    const response = await fetch(endPoint, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log("hello")

    // 3️⃣ Handle the response
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log("Spotify Track Info:", jsonResponse);
      return jsonResponse;
    } else {
      console.error("Failed to fetch track:", response.status, response.statusText);
    }
  } catch (error) {
    console.error("Error fetching track:", error);
  }
};

export const searchArtist = async (artistName) => {
  try {
    // 1️⃣ Fetch a valid access token from your backend server
    const tokenResponse = await fetch("http://localhost:3001/spotify-token");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // 2️⃣ Search for the artist
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=1`;
    const searchResponse = await fetch(searchEndpoint, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    const artist = searchData.artists.items[0];

    if (!artist) {
      throw new Error("Artist not found");
    }

    // 3️⃣ Get artist's top tracks
    const tracksEndpoint = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`;
    const tracksResponse = await fetch(tracksEndpoint, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!tracksResponse.ok) {
      throw new Error(`Tracks fetch failed: ${tracksResponse.status}`);
    }

    const tracksData = await tracksResponse.json();

    return {
      artist: artist,
      tracks: tracksData.tracks
    };

  } catch (error) {
    console.error("Error searching artist:", error);
    throw error;
  }
};

export const getArtistSuggestions = async (query) => {
  try {
    // 1️⃣ Fetch a valid access token from your backend server
    const tokenResponse = await fetch("http://localhost:3001/spotify-token");
    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;
    console.log(query);
<<<<<<< Updated upstream
=======
    console.log("playing with git")
>>>>>>> Stashed changes

    // 2️⃣ Search for artists with the query
    const searchEndpoint = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=5`;
    const searchResponse = await fetch(searchEndpoint, {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!searchResponse.ok) {
      throw new Error(`Search failed: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();
    
    return searchData.artists.items;

  } catch (error) {
    console.error("Error fetching suggestions:", error);
    return [];
  }
};