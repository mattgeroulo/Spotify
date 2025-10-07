import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import {getProfile} from './utils/Spotify'
import Header from "./Header"

const getToken = async () => {
      try{
      const response = await fetch('http://localhost:3001/spotify-token');
      const data = await response.json();
      console.log('Spotify access token:', data.access_token);
      }catch(errors){
        console.error("Error:",errors)
      }}



function App() {
    useEffect(() => {
      getToken();
    }, []);

    const handleClick = async () => {
    const profile = await getProfile();
    console.log('User Profile:', profile);
  };

  return (
    <div>
      <Header />
      
      <button onClick={handleClick}>Get Spotify Profile</button>
    </div>
  );
};


export default App;
