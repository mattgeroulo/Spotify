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
