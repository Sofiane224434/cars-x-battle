import React, { useState } from 'react';
import LockScreen from './components/LockScreen.jsx';
import GameShell from './components/GameShell.jsx';
import { IconScreenDesktop } from './components/Icons.jsx';

function App() {
  const [unlocked, setUnlocked] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  return (
    <div className={`app-root ${isMobileView ? 'force-mobile' : 'desktop-widescreen'}`}>
      {/* Quick view switcher for testing on PC */}
      <div className="viewport-toggle-bar">
        <button
          onClick={() => setIsMobileView(!isMobileView)}
          className="toggle-viewport-btn"
          title="Basculer entre affichage Desktop étendu et Mobile 430px"
        >
          <IconScreenDesktop style={{ width: 14, height: 14, fill: '#00d4ff' }} />
          <span>{isMobileView ? 'Format Mobile (430px) ⇄ Passer en Desktop' : 'Mode Desktop Large ⇄ Passer en Mobile'}</span>
        </button>
      </div>

      <div className="game-frame-container">
        {!unlocked ? (
          <LockScreen onUnlock={() => setUnlocked(true)} />
        ) : (
          <GameShell />
        )}
      </div>
    </div>
  );
}

export default App;