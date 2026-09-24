import React, { useState } from 'react';
import {
  IconBack, IconHeart, IconLock, IconSearch, IconBook,
  IconStar, IconWingedSword, IconAnkh, IconArrowUp,
  IconBoot, IconPlus
} from '../Icons.jsx';

function RosterView({ onBack, gameStore }) {
  const {
    gold, fluid, activeVehicle,
    nextVehicle, prevVehicle, toggleFav, toggleLock,
    upgradeActiveVehicle
  } = gameStore;

  const [activeSubTab, setActiveSubTab] = useState('attribut');
  const [levelUpEffect, setLevelUpEffect] = useState(false);

  const handleUpgradeClick = () => {
    const success = upgradeActiveVehicle();
    if (success) {
      setLevelUpEffect(true);
      setTimeout(() => setLevelUpEffect(false), 800);
    }
  };

  return (
    <div className="gxb-upgrade-screen">
      {/* Top Resource & Back Bar (matching Screenshot 2) */}
      <div className="gxb-upgrade-topbar">
        <div className="upgrade-res-group">
          {/* Gold */}
          <div className="gxb-res-pill">
            <div className="pill-coin-icon">
              <svg viewBox="0 0 16 16" fill="#ffcc00"><circle cx="8" cy="8" r="7" fill="#ffcc00"/><text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">C</text></svg>
            </div>
            <span className="pill-amt">{gold.toLocaleString()}</span>
            <div className="pill-plus-btn"><IconPlus /></div>
          </div>

          {/* Fluid / Energy */}
          <div className="gxb-res-pill">
            <div className="pill-fluid-icon">
              <svg viewBox="0 0 16 16" fill="#22cc66"><path d="M7 1L3 7h3l-1 4 4-6H6l1-4z"/></svg>
            </div>
            <span className="pill-amt">{fluid.toLocaleString()}</span>
            <div className="pill-plus-btn"><IconPlus /></div>
          </div>
        </div>

        {/* Back Button */}
        <button onClick={onBack} className="gxb-back-btn" title="Retour au Lobby">
          <IconBack style={{ width: 20, height: 20, fill: '#fff' }} />
        </button>
      </div>

      {/* Main Vehicle Showcase Area */}
      <div className="gxb-hero-display-area">
        {/* Background Aura */}
        <div
          className="hero-aura-burst"
          style={{ background: `radial-gradient(circle, ${activeVehicle.factionColor}44 0%, transparent 65%)` }}
        />

        {/* Top Character Meta Header (Left: Faction + Stars + Name | Right: Voice/Origin) */}
        <div className="hero-meta-overlay">
          <div className="hero-meta-left">
            <div className="hero-faction-crest">
              <div className="crest-badge" style={{ borderColor: activeVehicle.factionColor }}>
                <svg viewBox="0 0 24 24" fill={activeVehicle.factionColor} style={{ width: 18, height: 18 }}><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>
              </div>
              <div className="hero-stars-row">
                {[...Array(activeVehicle.stars)].map((_, i) => (
                  <IconStar key={i} className="star-icon-gold" />
                ))}
              </div>
            </div>
            <h2 className="hero-name-heading">{activeVehicle.name}</h2>
          </div>

          <div className="hero-meta-right">
            <div className="hero-voice-tag">{activeVehicle.voice}</div>
          </div>
        </div>

        {/* Floating Side Tools on Character Art */}
        <div className="hero-side-tools-left">
          <button
            onClick={toggleFav}
            className={`hero-tool-btn ${activeVehicle.isFav ? 'active-fav' : ''}`}
          >
            <IconHeart style={{ width: 16, height: 16, fill: activeVehicle.isFav ? '#ff3366' : '#fff' }} />
          </button>
        </div>

        <div className="hero-side-tools-right">
          <button className="hero-tool-btn">
            <IconBook style={{ width: 16, height: 16, fill: '#fff' }} />
          </button>
          <button
            onClick={toggleLock}
            className={`hero-tool-btn ${activeVehicle.isLocked ? 'active-lock' : ''}`}
          >
            <IconLock style={{ width: 16, height: 16, fill: activeVehicle.isLocked ? '#ffcc00' : '#fff' }} />
          </button>
          <button className="hero-tool-btn">
            <IconSearch style={{ width: 16, height: 16, fill: '#fff' }} />
          </button>
        </div>

        {/* Navigation Arrows for Next / Prev Vehicle */}
        <button onClick={prevVehicle} className="hero-nav-arrow arrow-left">
          <svg viewBox="0 0 24 24" fill="#fff"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button onClick={nextVehicle} className="hero-nav-arrow arrow-right">
          <svg viewBox="0 0 24 24" fill="#fff"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>
        </button>

        {/* Big Vehicle Graphic with Level-Up Flash */}
        <div className={`hero-image-container ${levelUpEffect ? 'upgrade-flash' : ''}`}>
          <img
            src={activeVehicle.img}
            alt={activeVehicle.name}
            className="hero-full-splash"
          />
          {levelUpEffect && (
            <div className="level-up-floating-badge">
              <span>NIVEAU SUPÉRIEUR !</span>
              <strong>PC +85</strong>
            </div>
          )}
        </div>
      </div>

      {/* 3 Sub-Tabs — [ Attribut ] [ Équipement ] [ Skin ] */}
      <div className="gxb-subtabs-row">
        <button
          onClick={() => setActiveSubTab('attribut')}
          className={`subtab-btn ${activeSubTab === 'attribut' ? 'active' : ''}`}
        >
          Attribut
        </button>
        <button
          onClick={() => setActiveSubTab('equipement')}
          className={`subtab-btn ${activeSubTab === 'equipement' ? 'active' : ''}`}
        >
          Équipement
        </button>
        <button
          onClick={() => setActiveSubTab('skin')}
          className={`subtab-btn ${activeSubTab === 'skin' ? 'active' : ''}`}
        >
          Skin
        </button>
      </div>

      {/* Bottom Attribute Card Panel (Direct Match of Screenshot 2) */}
      <div className="gxb-attribute-panel">
        {/* Row 1: Power Badge + Level + Role */}
        <div className="panel-row-power">
          <div className="power-winged-badge">
            <IconWingedSword style={{ width: 20, height: 20, fill: '#ffcc00' }} />
            <span className="power-number">{activeVehicle.power}</span>
          </div>

          <div className="level-label">
            Lv: <strong>{activeVehicle.level}</strong>/{activeVehicle.maxLevel}
          </div>

          <div className="role-tag">
            <IconAnkh style={{ width: 16, height: 16, stroke: '#4a6080' }} />
            <span>{activeVehicle.role}</span>
          </div>
        </div>

        {/* Row 2: Grade (with 5 hexagons) */}
        <div className="panel-row-grade">
          <div className="grade-badge">Grade</div>
          <div className="hexagons-row">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`hexagon-item ${i < activeVehicle.grade ? 'filled' : 'empty'}`}
              >
                <svg viewBox="0 0 24 24" className="hex-svg">
                  <polygon
                    points="12,2 22,7.5 22,18.5 12,24 2,18.5 2,7.5"
                    fill={i < activeVehicle.grade ? '#3388ff' : '#e4ebf5'}
                    stroke={i < activeVehicle.grade ? '#1a66dd' : '#b8c9df'}
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Améliorer (Upgrade row with costs & big blue up-arrow button) */}
        <div className="panel-row-upgrade">
          <div className="upgrade-tag-label">Améliorer</div>

          <div className="upgrade-cost-pill">
            <div className="cost-item">
              <svg className="cost-coin" viewBox="0 0 16 16" fill="#ffcc00"><circle cx="8" cy="8" r="7" fill="#ffcc00"/><text x="8" y="11" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#000">C</text></svg>
              <span className="cost-val">{activeVehicle.upgradeCostGold}</span>
            </div>
            <div className="cost-item">
              <svg className="cost-fluid" viewBox="0 0 16 16" fill="#22cc66"><path d="M7 1L3 7h3l-1 4 4-6H6l1-4z"/></svg>
              <span className="cost-val fluid-cost">{activeVehicle.upgradeCostFluid}</span>
            </div>
          </div>

          {/* Big Blue Square Button with White Arrow */}
          <button
            onClick={handleUpgradeClick}
            className="big-blue-upgrade-btn"
            title="Améliorer le niveau"
          >
            <IconArrowUp style={{ width: 22, height: 22, fill: '#fff' }} />
          </button>
        </div>

        {/* Row 4: Stats with colorful icons (Heart, Swords, Shield, Boot, Info) */}
        <div className="panel-row-stats">
          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-heart">
              <IconHeart style={{ width: 14, height: 14, fill: '#ff4477' }} />
            </div>
            <span className="stat-text-val">{activeVehicle.hp.toLocaleString()}</span>
          </div>

          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-swords">
              <svg viewBox="0 0 24 24" fill="#ff7700" style={{ width: 14, height: 14 }}><path d="M6.2 3L2 7.2l3.5 3.5L2 14.2 3.8 16l3.5-3.5L10.8 16l1.8-1.8-7.6-7.6L6.2 3zM17.8 3l1.2 3.6-7.6 7.6L13.2 16l3.5-3.5L20.2 16 22 14.2l-3.5-3.5L22 7.2 17.8 3z"/></svg>
            </div>
            <span className="stat-text-val">{activeVehicle.atk.toLocaleString()}</span>
          </div>

          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-shield">
              <svg viewBox="0 0 24 24" fill="#00bbdd" style={{ width: 14, height: 14 }}><path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3z"/></svg>
            </div>
            <span className="stat-text-val">{activeVehicle.def.toLocaleString()}</span>
          </div>

          <div className="stat-pill-item">
            <div className="stat-icon-wrap icon-boot">
              <IconBoot style={{ width: 14, height: 14, fill: '#88cc00' }} />
            </div>
            <span className="stat-text-val">{activeVehicle.spd.toLocaleString()}</span>
          </div>

          <button className="stat-info-circle" title="Attributs détaillés">
            <span>!</span>
          </button>
        </div>

        {/* Row 5: 4 Skill Slots (Active Skill 1 with purple glow + 3 Passives) */}
        <div className="panel-row-skills">
          {activeVehicle.skills.map((skill, index) => {
            const isActive = index === 0;
            return (
              <div
                key={skill.id}
                className={`skill-slot-box ${isActive ? 'skill-active-glow' : 'skill-passive'}`}
                title={`${skill.name} (${skill.type})`}
              >
                {isActive ? (
                  <div className="skill-inner-icon-active">
                    <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1a2 2 0 002 2v1.93zm6.9-2.54A1.99 1.99 0 0016 16h-1v-3a1 1 0 00-1-1H8v-2h2a1 1 0 001-1V7h2a2 2 0 002-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                  </div>
                ) : (
                  <div className="skill-inner-icon-passive">
                    {index === 1 && (
                      <svg viewBox="0 0 24 24" fill="#7a8da8"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>
                    )}
                    {index === 2 && (
                      <svg viewBox="0 0 24 24" fill="#7a8da8"><circle cx="12" cy="12" r="8" fill="none" stroke="#7a8da8" strokeWidth="2"/><circle cx="12" cy="12" r="3" fill="#7a8da8"/></svg>
                    )}
                    {index === 3 && (
                      <svg viewBox="0 0 24 24" fill="#7a8da8"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z"/></svg>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default RosterView;
