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

                                            {selectedTrack && selectedTrack.album && selectedTrack.album.images ? (
                                                <div className="popup-container">
                                                    <button className="popup-close-btn" onClick={onClose}>×</button>

                                                    <div className="popup-header">
                                                        <h2 className="popup-song-title">{selectedTrack.name}</h2>
                                                        <p className="popup-album-name">{selectedTrack.album.name}</p>
                                                    </div>

                                                    <div className="popup-body">
                                                        <img
                                                            src={selectedTrack.album.images?.[0]?.url || ''}
                                                            alt={selectedTrack.album.name}
                                                            className="popup-album-cover"
                                                        />
                                                        <div className="popup-runtime">
                                                            <span className="runtime-label">Duration</span>
                                                            <span className="runtime-value">{convert(selectedTrack.duration_ms)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : <div>FallBack</div>}

                        </ReactModal>
)}
