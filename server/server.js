// server.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import querystring from 'querystring';

var redirect_uri="http://127.0.0.1:3001/callback"

const app = express();
app.use(cors({
  origin: ["http://127.0.0.1:3000","http://localhost:3000"]// React server
}));

const PORT = 3001;

app.get('/callback', async (req, res) => {
  
  const code = req.query.code;
  const state = req.query.state;
  
  if (!code) {
    return res.redirect('http://localhost:3000/?error=access_denied');
  }
  console.log(code)
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
 // console.log(clientId)
  try {
    const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({         //exchanging access code for a authorization code
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }),
    });
    
    const tokenData = await tokenResponse.json();
    console.log(tokenData)
    
    if (tokenData.access_token) {
      res.redirect(`http://localhost:3000/?access_token=${tokenData.access_token}`);
    } else {
      res.redirect('http://localhost:3000/?error=token_failed');
    }
  } catch (error) {
    console.error('Token exchange error:', error);
    res.redirect('http://localhost:3000/?error=server_error');
  }
});




app.get('/spotify-token', async (req, res) => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

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
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get token' });
  }
});

app.listen(PORT,'127.0.0.1', () => console.log(`✅ Server running at ${PORT}`));
