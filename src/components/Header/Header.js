import React,{useState} from "react";
import "./Header.css";
import SearchBar from "../SearchBar/SearchBar";

import "../Login/Login.css"



import { Routes, Route, Link } from "react-router-dom"
import App from "../App/App"
import "../Login/Login.css"
export default function Header({ onSearchResults,searchElements=false }) {
    const [isOpen,SetIsOpen]=useState(true)
    return (
        <header className="header">
            <div className="header-content">
                <button className="toggle-button" onClick={()=>SetIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg"  fill="#000000" version="1.1" id="Capa_1" width="40px" height="40px" viewBox="0 0 248.862 248.863" >
                            <g>
                                <g>
                                    <path d="M31.87,63.729h185.125c17.576,0,31.861-14.292,31.861-31.864C248.856,14.31,234.571,0,216.995,0H31.87    C14.297,0,0.006,14.303,0.006,31.865C0.012,49.438,14.297,63.729,31.87,63.729z M27.006,15.606h32.522v32.522H27.006V15.606z"/>
                                    <path d="M216.995,185.127H31.87c-17.573,0-31.864,14.292-31.864,31.868c0,17.552,14.292,31.867,31.864,31.867h185.125    c17.576,0,31.861-14.304,31.861-31.867C248.856,199.431,234.565,185.127,216.995,185.127z M59.528,229.329H27.006v-32.521h32.522    V229.329z"/>
                                    <path d="M216.995,92.573H31.87c-17.573,0-31.864,14.295-31.864,31.858c0,17.57,14.292,31.868,31.864,31.868h185.125    c17.576,0,31.861-14.298,31.861-31.868C248.856,106.868,234.565,92.573,216.995,92.573z M59.528,140.686H27.006v-32.51h32.522    V140.686z"/>
                                </g>
                            </g>
                            </svg>
                </button>
                
                {isOpen&&
                <nav className="header-content">
                    <Link to="/" className ="login-button">Home</Link>
                    <Link to="/login" className ="login-button">Login</Link>
                    <Link to ="/profile" className="login-button">Profile</Link>
                </nav>}
                <div className="logo-section">
                    <h1 className="mainTitle">Bump'n</h1>
                    <p className="tagline">Discover Music</p>
                </div>
                {searchElements&&
                <div className="search-section">
                    <SearchBar onSearchResults={onSearchResults} />
                   
                </div>}
                
                
            
                
                
            </div>
        </header>
    );
}