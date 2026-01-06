import React, {useState} from 'react'
import "./Popup.css"
import ReactModal from 'react-modal'
import "../ArtistInfo/ArtistInfo.css"
function convert(value){
    const min = String(((value/1000)/60)).split(".")[0]
    const seconds = String(((value/1000)%60)).split(".")[0]
    return min+":"+seconds;
}

export default function Popup({selectedTrack=null,modalIsOpen,onClose,artist=null}){
       
    return(
        <ReactModal closeTimeoutMS={200}  onRequestClose= {onClose} isOpen={modalIsOpen} shouldCloseOnOverlayClick={true}
                                            className={{base:'myModalContent',afterOpen:'myModalContent--after-open',beforeClose:'myModalContent--before-close'}} 
                                            
                                            overlayClassName={{base: 'myModalOverlay',afterOpen: 'myModalOverlay--after-open',beforeClose: 'myModalOverlay--before-close'}}>
                                            
                                            {selectedTrack&& selectedTrack.album && selectedTrack.album.images?(<div>
                                                <div className="popup-header">
                                                   <div>
                                                    {selectedTrack?(selectedTrack.name):""}
                                                    <p className= "popup-header-tagline">Album: {selectedTrack?selectedTrack.album.name:"none"}</p>
                                                   </div>
                                                    <button className = "button" onClick={onClose}>X</button>
                                                </div>
                                                
                                                <img src={selectedTrack.album.images?.[0]?.url||''} alt={artist?artist.name:"error"} className="artist-image-popup"/>
                                                <p>Runtime: {convert(selectedTrack.duration_ms)}</p>
                                            </div>
                                            ):<div>FallBack</div>}
                                        
                        </ReactModal>
)}
