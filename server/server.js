// server.js
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import querystring from 'querystring';

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL || 'http://localhost:3000';
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://127.0.0.1:3001';


var redirect_uri="http://127.0.0.1:3001/callback"
var access_token_profile=""
const app = express();
app.use(cors({
  origin: ["http://127.0.0.1:3000",FRONTEND_URL]// React server
}));

const PORT = process.env.PORT || 3001;

app.get('/callback', async (req, res) => {
  
  const code = req.query.code;
  const state = req.query.state;
  
  if (!code) {
    return res.redirect(FRONTEND_URL+'/?error=access_denied');
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
      //res.redirect(`http://localhost:3000/?access_token=${tokenData.access_token}`);
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

app.get('/profile', async(req,res)=>{
  try{
    const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
    const data = await fetch("https://api.spotify.com/v1/me/playlists",{
      method:"Get",
      headers:{
        "Authorization":`Bearer ${access_token_profile.access_token}`,
          
        }
      }
    );
    if (data.ok){
      const json_data = await data.json()
      console.log("Playlists: ", json_data)
      return data
    }}
    catch(error){

    console.error("Error fetching playlists:" , error)

    }
  }
)
  


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

// Listen on all interfaces so the container can receive external connections
app.listen(PORT, '0.0.0.0', () => console.log(`✅ Server running on ${PORT}`));
