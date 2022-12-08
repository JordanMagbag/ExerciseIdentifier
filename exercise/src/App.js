import './App.css';
import Popup from './components/Popup.js';
import React, { useState } from 'react';
import DisplayImage from './components/DisplayImage';

function App() {

  const [isOpenYes, setIsOpenYes] = useState(false);
  const [isOpenNo, setIsOpenNo] = useState(false);
  const [guesses, setGuesses] = useState([]);

  const togglePopupYes = () => {
    setIsOpenYes(!isOpenYes);
  }
  const togglePopupNo = () => {
    if (guesses.length > 1) {
      // Get the next guess
      let newArr = [...guesses];
      newArr.shift();
      setGuesses(newArr);
    } else {
      setIsOpenNo(!isOpenNo);
    }
  }

  return (
    <div className="app">
      <div className="grid">

        <div class="title">Exercise Identifier</div>

        <div class="flexbox-container">
          <DisplayImage setGuesses={setGuesses} setIsOpenNo={setIsOpenNo} />
          <div class="image-guess">{guesses[0]}</div>
        </div>

        <div class="flexbox-container">
          <div class="image-text-upload">Uploaded Image</div>
          <div class="image-text-exercise">Exercise Guess</div>
        </div>

        {guesses.length > 0 &&
          <div>
            <div class="text-question">is this the correct exercise?</div>

            <div class="flexbox-container">
              <button onClick={togglePopupYes} class="button-yes">yes!</button>
              <button onClick={togglePopupNo} class="button-no">no</button>
            </div>
          </div>}

        {isOpenYes && <Popup
          handleClose={togglePopupYes}
          content={<div>
            <h1>Yay, we got it right! Please upload a new image</h1>
          </div>}
        />}

        {isOpenNo && <Popup
          handleClose={togglePopupNo}
          content={<div>
            <h1>We could not identify the exercise in your image, please try a new image.</h1>
          </div>}
        />}

      </div>
    </div>
  );
}

export default App;

