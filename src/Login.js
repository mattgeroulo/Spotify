import React from 'react'
import "./Login.css"
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

//const redirectUri = BACKEND_URL+'/callback';
export default function Login(){


    function handleClick(){
        
       
        window.location.href = `${BACKEND_URL}/login`
    }

    return(
        <div>
            <button className="login-button" onClick={handleClick}>Login</button>
            
        </div>
    )
}
