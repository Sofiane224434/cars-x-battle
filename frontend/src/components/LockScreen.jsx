import React, { useState } from 'react';

function LockScreen({ onUnlock }) {
  const [fading, setFading] = useState(false);

  const handleTap = () => {
    setFading(true);
    setTimeout(onUnlock, 500);
  };

  return (
    <div
      className="lock-screen"
      onClick={handleTap}
      style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.5s ease' }}
    >
      {/* Illustrated background */}
      <div className="lock-screen-bg" />
      <div className="lock-screen-overlay" />

      {/* Logo */}
      <div className="lock-content">
        <div className="lock-title-cars">CARS</div>
        <div className="lock-title-x">×</div>
        <div className="lock-title-battle">BATTLE</div>
        <div className="lock-subtitle">Tactical Vehicle Combat</div>
        <div className="lock-divider" />
        <div className="lock-tap-text">Appuyer pour jouer</div>
        <div className="lock-version">v0.1.0 — Early Build</div>
      </div>
    </div>
  );
}

export default LockScreen;
