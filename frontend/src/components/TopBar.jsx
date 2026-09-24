import React from 'react';
import { IconPlus } from './Icons.jsx';

function TopBar() {
  return (
    <div className="top-bar">
      <div className="top-left">
        <div className="avatar-ring">
          <svg viewBox="0 0 24 24" fill="var(--orange)">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
        </div>
        <div className="player-meta">
          <div className="player-name">Commandant</div>
          <div className="player-rank">Nv. 24 — Secteur 3</div>
        </div>
      </div>

      <div className="top-right">
        {/* Gold */}
        <div className="res-pill">
          <div className="res-icon gold-icon">
            <svg viewBox="0 0 12 12" fill="#000"><circle cx="6" cy="6" r="4" fill="none" stroke="#000" strokeWidth="1.2"/><text x="6" y="8.5" textAnchor="middle" fontSize="7" fontWeight="bold">C</text></svg>
          </div>
          <span className="res-val">145K</span>
          <div className="res-plus"><IconPlus /></div>
        </div>

        {/* Gems */}
        <div className="res-pill">
          <div className="res-icon gem-icon">
            <svg viewBox="0 0 12 12" fill="#fff"><path d="M6 1L2 5l4 6 4-6-4-4z" fill="none" stroke="#fff" strokeWidth="1" strokeLinejoin="round"/></svg>
          </div>
          <span className="res-val">3.4K</span>
          <div className="res-plus"><IconPlus /></div>
        </div>

        {/* Energy */}
        <div className="res-pill">
          <div className="res-icon nrg-icon">
            <svg viewBox="0 0 12 12" fill="#000"><path d="M7 1L3 7h3l-1 4 4-6H6l1-4z"/></svg>
          </div>
          <span className="res-val">95</span>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
