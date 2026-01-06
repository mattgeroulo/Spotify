import React,{useState} from "react";
import "./ArtistInfo.css";

export default function ArtistInfo({ artist,albums }) {
    const[selectedAlbum,setSelectedAlbum]=useState('')
    const[selectOpen,setSelectOpen]=useState(false)
    if (!artist) {
        return null;
    }
    
    return (
        <div className="artist-info">
            <div className="artist-header">
                {artist.images && artist.images.length > 0 && (
                    <img 
                        src={artist.images[0].url} 
                        alt={artist.name}
                        className="artist-image"
                    />
                )}
                <div className="artist-details">
                    <h2 className="artist-name">{artist.name}</h2>
                    <p className="artist-followers">
                        {artist.followers.total.toLocaleString()} followers
                    </p>
                    <p className="artist-genres">
                        {artist.genres.slice(0, 3).join(", ")}
                    </p>
                </div>
                {albums&&
                <div>
                    <p>Album Selection:
                        <select value={selectedAlbum}onChange ={e=>setSelectedAlbum(e.target.value)} onClick={()=>setSelectOpen(!selectOpen)}>
                            {albums.map((album,index)=>(
                            <option value={album}>{album}</option>
                                
                            ))}
                            {/* set album above with api call^^^^^^^*/}
                            <option value="test">test</option>
                            <option value="test">test</option>
                            
                        </select>
                        {selectOpen&&<div>testing conditional rendering</div>}
                    </p>
                </div>}
            </div>
        </div>
    );
}
