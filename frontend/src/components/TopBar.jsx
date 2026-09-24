import React from 'react';
import { IconPlus, IconMail } from './Icons.jsx';

function TopBar({ gameStore }) {
  const { gold, gems } = gameStore;

  return (
    <div className="gxb-topbar">
      {/* Player Avatar & Realm Info (Matching Screenshot 1) */}
      <div className="gxb-player-section">
        <div className="gxb-avatar-frame">
          <img
            src="/vehicle-striker.jpg"
            alt="Commandant"
            className="avatar-img-circle"
          />
          <div className="avatar-lvl-badge">5</div>
        </div>
        <div className="gxb-server-tag">
          <span className="server-dot" />
          <span className="server-name">Secteur 1 / Découverte [FR]</span>
        </div>
      </div>

      {/* Center Currency Pills */}
      <div className="gxb-currencies-center">
        {/* Gold Pill */}
        <div className="gxb-nav-res-pill">
          <div className="res-pill-icon coin-glow">
            <svg viewBox="0 0 16 16" fill="#ffcc00"><circle cx="8" cy="8" r="7" fill="#ffcc00"/><text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">C</text></svg>
          </div>
          <span className="res-pill-number">{gold.toLocaleString()}</span>
          <button className="res-pill-add-btn">
            <IconPlus style={{ width: 8, height: 8, fill: '#fff' }} />
          </button>
        </div>

        {/* Gem Pill */}
        <div className="gxb-nav-res-pill">
          <div className="res-pill-icon gem-glow">
            <svg viewBox="0 0 16 16" fill="#00d4ff"><path d="M8 1L2 6l6 9 6-9-6-5z"/></svg>
          </div>
          <span className="res-pill-number">{gems.toLocaleString()}</span>
          <button className="res-pill-add-btn">
            <IconPlus style={{ width: 8, height: 8, fill: '#fff' }} />
          </button>
        </div>
      </div>

      {/* Right Mail Box Button */}
      <div className="gxb-mail-box-wrapper">
        <button className="gxb-mail-btn" title="Courrier">
          <IconMail style={{ width: 18, height: 18, fill: '#3388ff' }} />
          <span className="mail-notif-dot" />
        </button>
      </div>
    </div>
  );
}

export default TopBar;
