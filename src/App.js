
import './App.css';
import {useEffect, useState} from 'react'
import {getProfile} from './utils/Spotify'
import Header from "./Header"
import ArtistInfo from "./ArtistInfo"
import TracksList from "./TracksList"

const getToken = async () => {
      try{
      const response = await fetch('http://localhost:3001/spotify-token');
      const data = await response.json();
      console.log('Spotify access token:', data.access_token);
      }catch(errors){
        console.error("Error:",errors)
      }}

function App() {
    const [searchResults, setSearchResults] = useState(null);

    useEffect(() => {
      getToken();
    }, []);

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
