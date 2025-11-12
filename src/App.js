
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
  console.log(searchResults)
  return (
    <div className="App">
      <Header onSearchResults={handleSearchResults} searchElements={true}/>
      
      <div className="main-content">
        {searchResults && (
          <>
            
            <ArtistInfo artist={searchResults.artist} albums={["temporary array in app.js"]}/>
            <TracksList tracks={searchResults.tracks} artist={searchResults.artist}/>
          </>
        )}
        
        <button onClick={handleClick}>Get Spotify Profile</button>
      </div>
    </div>
  );
};


export default App;
