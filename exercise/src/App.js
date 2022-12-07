import './App.css';
import Popup from './components/Popup.js';
import React,{ useState } from 'react';
import DisplayImage from './components/DisplayImage';

function App() {

  const[isOpenYes,setIsOpenYes] = useState(false);
  const[isOpenNo,setIsOpenNo] = useState(false);
  
  const togglePopupYes = () => {
    setIsOpenYes(!isOpenYes);
  }
  const togglePopupNo = () => {
    setIsOpenNo(!isOpenNo);
  }

  return (
    <div className="app">
      <div className="grid">

        <div class="title">Exercise Identifier</div>

        <div class="flexbox-container">
          <DisplayImage/>
          <div class="image-guess">Push ups</div> 
        </div>

        <div class="flexbox-container">
          <div class="image-text-upload">Uploaded Image</div>
          <div class="image-text-exercise">Exercise Guess</div>
        </div>

        <div class="text-question">is this the correct exercise?</div>

        <div class="flexbox-container">
          <button onClick={togglePopupYes} class="button-yes">yes!</button>
          <button onClick={togglePopupNo}class="button-no">no</button>
        </div>

        {isOpenYes && <Popup 
          handleClose={togglePopupYes} 
          content = {<div>
            <h1>Yay, we got it right! Please upload a new image</h1>
          </div>} 
        />}

        {isOpenNo && <Popup 
          handleClose={togglePopupNo} 
          content = {<div>
            <h1>We could not identify the exercise in your image, please try a new image.</h1>
          </div>} 
        />}

      </div>
    </div>
  );
}

export default App;

