
import './App.css';
import {useEffect, useState} from 'react'
import {getProfile, handleAuthCallback} from './utils/Spotify'
import Header from "./Header"
import ArtistInfo from "./ArtistInfo"
import TracksList from "./TracksList"

function App() {
    const [searchResults, setSearchResults] = useState(null);



    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleClick = async () => {
    const profile = await getProfile();
    console.log('User Profile:', profile);
  };

  return (
    <div className="App">
      <Header onSearchResults={handleSearchResults} />
      
      <div className="main-content">
        {searchResults && (
          <>
            <ArtistInfo artist={searchResults.artist} />
            <TracksList tracks={searchResults.tracks} />
          </>
        )}
        
        <button onClick={handleClick}>Get Spotify Profile</button>
      </div>
    </div>
  );
};


export default App;
