import './App.css';
import Popup from './components/Popup.js';
import dog from './images/dog3.jpg'
import cat from './images/cat.jpg'
import { useState } from 'react';


function App() {

  const[isOpen,setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
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
          <button onClick={togglePopup} class="button-yes">yes!</button>
          <button class="button-no">no</button>
        </div>

        {isOpen && <Popup 
          handleClose={() => {}} 
          content = {<div>
            <h1>We do not have the given exercise in our dataset</h1>
            <h1>Please upload a new image</h1>
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