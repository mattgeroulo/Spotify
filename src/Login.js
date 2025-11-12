import React from 'react'
import "./Login.css"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

const redirectUri = BACKEND_URL+'/callback';
export default function Login(){


    function handleClick(){
        
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        console.log(clientId)
        
        console.log("in the login button login.js")
        
        console.log(redirectUri)
        const scope = 'user-read-private user-read-email';
        const state = '1234567898';

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

        window.location.href = authUrl;
    }

    return(
        <div>
            <button className="login-button" onClick={handleClick}>Login</button>
            {BACKEND_URL}
        </div>
    )
}
