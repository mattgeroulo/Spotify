import React from 'react'
import "./Login.css"


export default function Login(){


    function handleClick(){
        
        const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
        console.log(clientId)
        console.log("in the login button login.js")
        const redirectUri = 'http://127.0.0.1:3001/callback';
        const scope = 'user-read-private user-read-email';
        const state = '1234567898';

        const authUrl = `https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scope)}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${state}`;

        window.location.href = authUrl;
    }

    return(
        <div>
            <button className="login-button" onClick={handleClick}>Login</button>
        </div>
    )
}
