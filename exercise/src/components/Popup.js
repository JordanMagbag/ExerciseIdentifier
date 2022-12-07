import React from 'react'
import "./Popup.css"

const Popup = props => {
    return (
        <div className="popup-box"> 
            <div className='box'>
                <button className='btn-close' onClick={props.handleClose}>x</button>
                {props.content}
            </div>
        </div>
    )
}

export default Popup

/*
 <Popup  
    handleClose={() => {}} 
    content = {<div>
            <h1>We do not have the given exercise in our dataset</h1>
            <h1>Please upload a new image</h1>
        </div>} />
        */