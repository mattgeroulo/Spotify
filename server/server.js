// server.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import querystring from 'querystring';

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:3001';

var access_token_profile=""
const app = express();
app.use(cors({
  origin: ["http://127.0.0.1:3000",FRONTEND_URL]// React server
}));

const PORT = process.env.PORT || 3001;

app.get('/api/login', (req, res) => {
    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const redirectUri = process.env.REDIRECT_URI; // e.g. http://3.144.32.93/callback
    const scope = 'user-read-private user-read-email streaming user-read-playback-state user-modify-playback-state';
    const state = '123456';
    console.log(redirectUri)
    const authUrl =
        `https://accounts.spotify.com/authorize?response_type=code` +
        `&client_id=${clientId}` +
        `&scope=${encodeURIComponent(scope)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${state}`;

    res.redirect(authUrl);
});



app.get('/api/callback', async (req, res) => {
  const code = req.query.code;
  const state = req.query.state;
  const redirectUri = process.env.REDIRECT_URI;
  if (!code) {
    return res.redirect(FRONTEND_URL+'/?error=access_denied');
  }
  console.log(code)
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenResponse.json();
    console.log(tokenData)

    if (tokenData.access_token) {
      access_token_profile=tokenData;
      res.redirect(FRONTEND_URL+'/profile')
    } else {
      res.redirect(FRONTEND_URL+'/?error=token_failed');
    }
  } catch (error) {
    console.error('Token exchange error:', error);
    res.redirect(FRONTEND_URL+'/?error=server_error');
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const data = await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token_profile.access_token}`,
      }
    });

    if (!data.ok) {
      return res.status(500).json({ error: "Spotify API error" });
    }

    const playlists = await data.json();
    console.log("Playlists:", playlists);

    // ✅ Send JSON back to frontend
    res.json(playlists);

  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Server error" });
  }
});

  


app.get('/api/spotify-token', async (req, res) => {
  // If user is logged in, return their token (enables preview URLs)
  if (access_token_profile && access_token_profile.access_token) {
    return res.json({
      access_token: access_token_profile.access_token,
      token_type: 'Bearer',
      is_user_token: true
    });
  }

  // Fall back to client credentials
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    const data = await response.json();
    res.json({ ...data, is_user_token: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get token' });
  }
});

// Check if user is logged in
app.get('/api/auth-status', (req, res) => {
  res.json({
    isLoggedIn: !!(access_token_profile && access_token_profile.access_token)
  });
});

// Logout endpoint
app.post('/api/logout', (req, res) => {
  access_token_profile = "";
  res.json({ success: true });
});

// Listen on all interfaces so the container can receive external connections
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on ${PORT}`));
