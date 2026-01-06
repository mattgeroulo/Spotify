import React, {useState}  from "react";
import "./TracksList.css";
import Popup from "../Popup/Popup"
import ReactModal from 'react-modal'
import "../Popup/Popup.css"

ReactModal.setAppElement('#root')


export default function TracksList({ tracks, artist }) {
    const [modalIsOpen,setModalIsOpen]=useState(false)
    const [selectedTrack,setSelectedTrack]=useState({tracks})
    if (!tracks || tracks.length === 0) {
        return null;
    }
    
    const handleClick =(track,index)=>{
        //need to pass params in here about the song details, unsure how to do that right now
        setModalIsOpen(true);
        setSelectedTrack(track);
        console.log(track)
        
    }

    return (
        <div className="tracks-list">
            <h3 className="tracks-title">Popular Songs</h3>
            <div className="tracks-container">
                {tracks.map((track, index) => (
                    <div key={track.id} className="track-item" onClick={()=>handleClick(track,index)} >
                        <div className="track-number">{index + 1}</div>
                        <div className="track-info" >
                            
                            <div className="track-name">{track.name}</div>
                            <div className="track-album">{track.album.name}</div>
                            
                        </div>
                        <div className="track-duration">
                            {Math.floor(track.duration_ms / 60000)}:
                            {Math.floor((track.duration_ms % 60000) / 1000)
                                .toString()
                                .padStart(2, '0')}
                        </div>
                    </div>
                ))}
            </div>
                <Popup selectedTrack={selectedTrack} modalIsOpen={modalIsOpen}onClose={()=>setModalIsOpen(false)} artist={artist}/>
                
        </div>
    );
}
