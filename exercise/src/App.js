import './App.css';
import Popup from 'reactjs-popup';

function App() {
  return (
    <div className="app">
      <div className="grid">
        <div class="grid-item">Exercise Identifier</div>
        <div class="grid-item">Uploaded Image</div>
        <div class="grid-item">Exercise Guess</div>
        <div class="grid-item">is this the correct exercise?</div>
        <div class="grid-item">1</div>
        <img src="./dog.jpg" alt="dog"/>
        <img src="./cat.jpg" alt="cat"/>
        <Popup class="grid-item" trigger={<button>yes!</button>} position="right center">
          <div>Popup 1 content here !!</div>
        </Popup>
        <Popup class="grid-item" trigger={<button>no</button>} position="right center">
          <div>Popup 2 content here !!</div>
        </Popup>
      </div>
    </div>
  );
}

export default App;

//add popup when we run out of exercises from the dataset