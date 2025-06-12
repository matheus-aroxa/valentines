import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showCatHeart, setShowCatHeart] = useState(false);
  const [noClicked, setNoClicked] = useState(false);
  const [flashing, setFlashing] = useState(false);
  const [yesFontSize, setYesFontSize] = useState(26);
  const [customAlert, setCustomAlert] = useState(false);
  const [alertShown, setAlertShown] = useState(false); // novo controle

  const flashRainbowColors = () => {
    return new Promise(resolve => {
      const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#9400d3'];
      let i = 0;
      setFlashing(true);

      const interval = setInterval(() => {
        document.body.style.backgroundColor = colors[i];
        i = (i + 1) % colors.length;
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        document.body.style.backgroundColor = '';
        setFlashing(false);
        resolve();
      }, 2000);
    });
  };

  const handleYesClick = async () => {
    await flashRainbowColors();
    setShowCatHeart(true);
  };

  const handleNoClick = () => {
    if (!noClicked) {
      setNoClicked(true);
      setYesFontSize(prev => prev * 2);
    } else {
      setYesFontSize(prev => prev * 2);

      if (!alertShown) {
        setCustomAlert(true);
        setAlertShown(true);
      }
    }
  };

  const closeCustomAlert = () => {
    setCustomAlert(false);
  };

  return (
      <div id="container">
        <div id="image-container">
          {!showCatHeart ? (
              <img src="cat.gif" alt="Cat" />
          ) : (
              <img src="sailor-heart.gif" alt="Cat Heart" />
          )}
        </div>

        {!showCatHeart && (
            <div id="text-container">
              <div id="question">Will you be my valentine?</div>
              <div id="options">
                <button
                    id="yes-button"
                    onClick={handleYesClick}
                    style={{ fontSize: `${yesFontSize}px` }}
                    disabled={flashing}
                >
                  Yes
                </button>
                <button id="no-button" onClick={handleNoClick}>
                  {noClicked ? 'You sure?' : 'No'}
                </button>
              </div>
            </div>
        )}

        {customAlert && (
            <div className="custom-alert">
              <div className="custom-alert-content">
                You're breaking my heart 💔
                <br />
                <button onClick={closeCustomAlert}>OK</button>
              </div>
            </div>
        )}
      </div>
  );
}

export default App;
