import React, { useState } from 'react';
import {
  IconCalendar, IconGift, IconMail, IconPlus,
  IconChat, IconUsers, IconSwords,
  IconStar, IconFlame, IconCheck
} from '../Icons.jsx';

function LobbyView({ onNavigate, gameStore }) {
  const { gold, gems, activeVehicle } = gameStore;
  const [claimBonus, setClaimBonus] = useState(false);

  return (
    <div className="gxb-lobby">
      {/* Background Campus & Sky scenery */}
      <div className="gxb-lobby-bg" />
      <div className="gxb-lobby-overlay" />

      {/* Center Grand Vehicle Splash Art */}
      <div className="gxb-center-hero">
        <div className="gxb-hero-aura" style={{ background: `radial-gradient(circle, ${activeVehicle.factionColor}33 0%, transparent 70%)` }} />
        <img
          src={activeVehicle.img}
          alt={activeVehicle.name}
          className="gxb-hero-splash"
        />
        <div className="gxb-hero-name-plate">
          <div className="hero-faction-badge" style={{ color: activeVehicle.factionColor }}>
            {activeVehicle.faction}
          </div>
          <div className="hero-name-text">{activeVehicle.name}</div>
        </div>
      </div>

      {/* Floating Side Icons Left Column */}
      <div className="gxb-side-left">
        <div className="gxb-circle-btn btn-exercice">
          <div className="circle-inner-icon bg-cyan">
            <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"/></svg>
          </div>
          <span className="circle-btn-label">Exercice</span>
        </div>

        <div className="gxb-circle-btn btn-visite">
          <div className="circle-inner-icon bg-red-gold">
            <svg viewBox="0 0 24 24" fill="#fff"><path d="M20 6h-2.18c.11-.31.18-.65.18-1a3 3 0 00-3-3c-1.05 0-1.95.56-2.5 1.37L12 4l-.5-.63A2.99 2.99 0 009 2a3 3 0 00-3 3c0 .35.07.69.18 1H4a2 2 0 00-2 2v3h20V8a2 2 0 00-2-2z"/></svg>
          </div>
          <span className="circle-btn-label">Visite</span>
        </div>

        <div className="gxb-circle-btn btn-exclusif">
          <div className="circle-inner-icon bg-pink">
            <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09A6.04 6.04 0 0116.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
          </div>
          <span className="circle-btn-label">Exclusif</span>
        </div>

        <div
          onClick={() => setClaimBonus(!claimBonus)}
          className="gxb-circle-btn btn-gratuit"
        >
          <div className="circle-inner-icon bg-gold-green">
            <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
            {!claimBonus && <span className="gxb-red-dot" />}
          </div>
          <span className="circle-btn-label">{claimBonus ? 'Réclamé' : 'Gratuit'}</span>
        </div>

        {/* Energy can badge */}
        <div className="gxb-can-badge">
          <div className="can-icon-wrap">
            <svg className="can-crown-svg" viewBox="0 0 24 24" fill="#ffcc00"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-1h14v1z"/></svg>
            <span className="can-amt">1000</span>
          </div>
        </div>

        {/* Chat tab */}
        <div className="gxb-chat-tab">
          <IconChat style={{ width: 18, height: 18, fill: '#ff44aa' }} />
        </div>
      </div>

      {/* Floating Side Icons Right Column */}
      <div className="gxb-side-right">
        <div className="gxb-circle-btn btn-ami">
          <div className="circle-inner-icon bg-cyan-soft">
            <IconUsers style={{ width: 18, height: 18, fill: '#fff' }} />
            <span className="gxb-red-dot" />
          </div>
          <span className="circle-btn-label">Ami</span>
        </div>

        <div
          onClick={() => onNavigate('roster')}
          className="gxb-circle-btn btn-dortoir"
        >
          <div className="circle-inner-icon bg-purple-soft">
            <svg viewBox="0 0 24 24" fill="#fff"><path d="M4 17h16M6 17V13h12v4M8 13V11h8v2M10 11V9h4v2M7 17a2 2 0 11-4 0M11 17a2 2 0 11-4 0M15 17a2 2 0 11-4 0M19 17a2 2 0 004 0M21 17a2 2 0 11-4 0"/></svg>
            <span className="gxb-red-dot" />
          </div>
          <span className="circle-btn-label">Hangar</span>
        </div>
      </div>

      {/* Bottom Action Trio — Campus / Campagne / Défier */}
      <div className="gxb-bottom-trio">
        {/* Button Left : Campus */}
        <div
          onClick={() => onNavigate('roster')}
          className="trio-card card-campus"
        >
          <div className="campus-visual-box">
            <div className="campus-board-icon">
              <svg className="board-bulb-svg" viewBox="0 0 24 24" fill="#ffcc00"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/></svg>
              <div className="board-lines">
                <span /><span /><span />
              </div>
            </div>
          </div>
          <div className="trio-card-title text-green-glow">Campus</div>
        </div>

        {/* Button Center : Campagne (En Vedette & Surélevé) */}
        <div
          onClick={() => onNavigate('battle')}
          className="trio-card card-campagne-hero"
        >
          <div className="hero-banner-inner">
            <div className="campagne-mini-chibis">
              <img src="/vehicle-striker.jpg" alt="V1" className="mini-chibi c1" />
              <img src="/vehicle-phantom.jpg" alt="V2" className="mini-chibi c2" />
            </div>
            <div className="trio-card-title text-gold-glow">Campagne</div>
          </div>
        </div>

        {/* Button Right : Défier */}
        <div
          onClick={() => onNavigate('battle')}
          className="trio-card card-defier"
        >
          <div className="defier-flags-box">
            <div className="flag flag-red">
              <IconSwords style={{ width: 14, height: 14, fill: '#ffcc00' }} />
            </div>
            <div className="flag flag-blue">
              <IconSwords style={{ width: 14, height: 14, fill: '#00d4ff' }} />
            </div>
          </div>
          <div className="trio-card-title text-purple-glow">Défier</div>
        </div>
      </div>
    </div>
  );
}

export default LobbyView;
