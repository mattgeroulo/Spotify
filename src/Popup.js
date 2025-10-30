import React, {useState} from 'react'
import "./Popup.css"
import ReactModal from 'react-modal'
import "./ArtistInfo.css"
export default function Popup({selectedTrack=null,modalIsOpen,onClose,artist=null}){
       
    return(
        <ReactModal closeTimeoutMS={200}  onRequestClose= {onClose} isOpen={modalIsOpen} shouldCloseOnOverlayClick={true}
                                            className={{base:'myModalContent',afterOpen:'myModalContent--after-open',beforeClose:'myModalContent--before-close'}} 
                                            
                                            overlayClassName={{base: 'myModalOverlay',afterOpen: 'myModalOverlay--after-open',beforeClose: 'myModalOverlay--before-close'}}>
                                            
                                            {selectedTrack&& selectedTrack.album && selectedTrack.album.images?(<div>
                                                <div className="popup-header">
                                                    {/* {selectedTrack.name +" by "+artist.name }*/}
                                                    
                                                    {selectedTrack?(selectedTrack.name +" by "+artist.name ):""}
                                                    
                                                    <button className = "button" onClick={onClose}>Close</button>
                                                </div>
                                                <img src={selectedTrack.album.images?.[0]?.url||''} alt={artist?artist.name:"error"} className="artist-image-popup"/>
                                                <p>{selectedTrack?selectedTrack.album.name:"none"}</p>
                                            </div>
                                            ):<div>FallBack</div>}
                                        
                        </ReactModal>
)}
