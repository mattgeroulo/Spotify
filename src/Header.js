import React from "react";
import "./Header.css";
import SearchBar from "./SearchBar";
import Login from "./Login"

export default function Header({ onSearchResults }) {
    return (
        <header className="header">
            <div className="header-content">
                <div className="logo-section">
                    <h1 className="mainTitle">Bump'n</h1>
                    <p className="tagline">Discover Music</p>
                </div>
                <div className="search-section">
                    <SearchBar onSearchResults={onSearchResults} />
                   
                </div>
                <Login />
                
            </div>
        </header>
    );
}