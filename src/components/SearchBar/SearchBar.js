import React, { useState, useEffect, useRef } from "react";
import "./SearchBar.css";
import { searchArtist, getArtistSuggestions } from "../../utils/Spotify";

export default function SearchBar({ onSearchResults }) {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);
    
    // Debounce function for suggestions
    useEffect(() => {
        const timeoutId = setTimeout(async () => {
            if (query.trim().length > 2) {
                try {
                    const artistSuggestions = await getArtistSuggestions(query);
                    setSuggestions(artistSuggestions);
                    setShowSuggestions(true);
                } catch (error) {
                    console.error("Error fetching suggestions:", error);
                    setSuggestions([]);
                }
            } else {
                setSuggestions([]);
                setShowSuggestions(false);
            }
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [query]);

    // Handle clicks outside to close suggestions
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        setIsLoading(true);
        setShowSuggestions(false);
        try {
            const results = await searchArtist(query);
            onSearchResults(results);
        } catch (error) {
            console.error("Search failed:", error);
            alert("Failed to search for artist. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleChange = (e) => {
        setQuery(e.target.value);
        setSelectedIndex(-1);
    };

    const handleSuggestionClick = (suggestion) => {
        setQuery(suggestion.name);
        setShowSuggestions(false);
        setSelectedIndex(-1);
    };

    const handleKeyDown = (e) => {
        if (!showSuggestions || suggestions.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < suggestions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0) {
                    handleSuggestionClick(suggestions[selectedIndex]);
                } else {
                    handleSubmit(e);
                }
                break;
            case 'Escape':
                setShowSuggestions(false);
                setSelectedIndex(-1);
                break;
        }
    };

    return (
        <div className="search-container" ref={suggestionsRef}>
            <form className="inputBar" onSubmit={handleSubmit}>
                <input 
                    ref={inputRef}
                    type="text" 
                    value={query} 
                    className="searchInput" 
                    placeholder="Search an artist" 
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setShowSuggestions(suggestions.length > 0)}
                />
                <button type="submit" className="searchButton" disabled={isLoading}>
                    {isLoading ? "Searching..." : "Search"}
                </button>
            </form>
            {showSuggestions && suggestions.length > 0 && (
                <div className="suggestions-dropdown">
                    {suggestions.map((suggestion, index) => (
                        <div
                            key={suggestion.id}
                            className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            <div className="suggestion-content">
                                {suggestion.images && suggestion.images.length > 0 && (
                                    <img 
                                        src={suggestion.images[0].url} 
                                        alt={suggestion.name}
                                        className="suggestion-image"
                                    />
                                )}
                                <div className="suggestion-text">
                                    <div className="suggestion-name">{suggestion.name}</div>
                                    <div className="suggestion-followers">
                                        {suggestion.followers.total.toLocaleString()} followers
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
