import './App.css';
import Popup from './components/Popup.js';
import dog from './images/dog3.jpg'
import cat from './images/cat.jpg'
import React, { useState } from 'react';


function App() {

  const[isOpenYes,setIsOpenYes] = useState(false);

  const togglePopupYes = () => {
    setIsOpenYes(!isOpenYes);
  }

  const[isOpenNo,setIsOpenNo] = useState(false);

  const togglePopupNo = () => {
    setIsOpenNo(!isOpenNo);
  }

  return (
    <div className="app">
      <div className="grid">

        <div class="title">Exercise Identifier</div>

        <div class="flexbox-container">
          <img class="image" src={dog} alt="dog"/>
          <img class="image" src={cat} alt="cat"/>
        </div>

        <div class="flexbox-container">
          <div class="image-text">Uploaded Image</div>
          <div class="image-text">Exercise Guess</div>
        </div>

        <div class="text-question">is this the correct exercise?</div>

        <div class="flexbox-container">
          <button onClick={togglePopupYes} class="button-yes">yes!</button>
          <button onClick={togglePopupNo}class="button-no">no</button>
        </div>

        {isOpenYes && <Popup 
          handleClose={togglePopupYes} 
          content = {<div>
            <h1>Please upload a new image</h1>
          </div>} 
        />}

        {isOpenNo && <Popup 
          handleClose={togglePopupNo} 
          content = {<div>
            <h1>We do not have the given exercise in our dataset</h1>
          </div>} 
        />}

      </div>
    </div>
  );
}

export default App;

//add popup when we run out of exercises from the dataset
/*
<Popup class="button-no" trigger={<button>no</button>} position="right center">
          <div>Popup 2 content here !!</div>
        </Popup>
*/