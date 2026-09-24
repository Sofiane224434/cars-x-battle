import React, { useState } from 'react';
import {
  IconTank, IconUpgrade, IconStar, IconFormation,
  IconFlame, IconCheck, IconChevronRight
} from '../Icons.jsx';

const ROSTER_VEHICLES = [
  {
    id: 'striker',
    name: 'Striker Mk-II',
    codename: 'PROTOTYPE-01',
    role: 'Avant-Garde · Brawler',
    faction: 'CyberKinetic',
    factionColor: '#00d4ff',
    power: 34500,
    level: 85,
    maxLevel: 100,
    stars: 5,
    img: '/vehicle-striker.jpg',
    stats: { atk: '14,250', def: '9,800', hp: '108,400', spd: '1,320' },
    skill: 'Surcharge Plasma : 320% DGT + Brûlure thermique de zone'
  },
  {
    id: 'phantom',
    name: 'Aethelred Stealth',
    codename: 'INTERCEPTOR-X',
    role: 'Assaut Furtif · DPS',
    faction: 'Quantum Flux',
    factionColor: '#aa44ff',
    power: 38200,
    level: 90,
    maxLevel: 100,
    stars: 5,
    img: '/vehicle-phantom.jpg',
    stats: { atk: '19,800', def: '7,400', hp: '84,000', spd: '1,890' },
    skill: 'Faisceaux Jumeaux : Perforation d’armure 45% + Frappe Critique'
  },
  {
    id: 'vortex',
    name: 'Titan Goliath Mech',
    codename: 'HEAVY-BASTION',
    role: 'Artillerie Lourde · Tank',
    faction: 'V8 Bio-Fuel',
    factionColor: '#ff8800',
    power: 41800,
    level: 92,
    maxLevel: 100,
    stars: 5,
    img: '/vehicle-vortex.jpg',
    stats: { atk: '16,500', def: '14,200', hp: '145,000', spd: '950' },
    skill: 'Bouclier Magnétique : Barrière 25% PV + Canons Railgun de riposte'
  }
];

function RosterView() {
  const [selectedId, setSelectedId] = useState('striker');
  const activeVehicle = ROSTER_VEHICLES.find(v => v.id === selectedId) || ROSTER_VEHICLES[0];
  const [activeTabSub, setActiveTabSub] = useState('stats');

  return (
    <div className="view-container view-roster">
      {/* Background with Hangar scenery */}
      <div className="view-bg hangar-bg" />
      <div className="view-overlay" />

      <div className="view-content-wrapper">
        {/* Top Header of Hangar */}
        <div className="section-game-header">
          <div className="section-title-group">
            <span className="section-badge" style={{ color: activeVehicle.factionColor }}>
              {activeVehicle.faction}
            </span>
            <h1 className="section-main-title">HANGAR & FLOTTE</h1>
          </div>
          <div className="hangar-stats-summary">
            <span className="hangar-total-power">PUISSANCE FLOTTE : <strong>114,500</strong></span>
          </div>
        </div>

        {/* Center Stage : Big Vehicle Podium on Desktop / Mobile */}
        <div className="hangar-stage-grid">
          {/* Main Visual Display */}
          <div className="hangar-podium">
            <div className="podium-halo" style={{ background: `radial-gradient(circle, ${activeVehicle.factionColor}33 0%, transparent 70%)` }} />
            <img
              src={activeVehicle.img}
              alt={activeVehicle.name}
              className="hangar-vehicle-hero"
            />
            
            {/* Identity floating card */}
            <div className="hangar-hero-card">
              <div className="hero-card-stars">
                {[...Array(activeVehicle.stars)].map((_, i) => (
                  <IconStar key={i} className="star-icon-gold" />
                ))}
              </div>
              <div className="hero-card-name">{activeVehicle.name}</div>
              <div className="hero-card-role">{activeVehicle.role}</div>
              <div className="hero-card-pc">PC {activeVehicle.power.toLocaleString()}</div>
            </div>
          </div>

          {/* Tactical Specs & Upgrade Panel */}
          <div className="hangar-control-panel">
            <div className="panel-cyber-box">
              <div className="panel-cyber-header">
                <span className="panel-label">FICHE TACTIQUE</span>
                <span className="panel-level">NIV. {activeVehicle.level} / {activeVehicle.maxLevel}</span>
              </div>

              {/* Stat gauges */}
              <div className="stat-gauges-list">
                <div className="stat-row">
                  <span className="stat-label">ATQ (Attaque)</span>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill fill-red" style={{ width: '85%' }} />
                  </div>
                  <span className="stat-value">{activeVehicle.stats.atk}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">DEF (Armure)</span>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill fill-cyan" style={{ width: '70%' }} />
                  </div>
                  <span className="stat-value">{activeVehicle.stats.def}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">PV (Structure)</span>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill fill-green" style={{ width: '90%' }} />
                  </div>
                  <span className="stat-value">{activeVehicle.stats.hp}</span>
                </div>
                <div className="stat-row">
                  <span className="stat-label">VIT (Vitesse)</span>
                  <div className="stat-bar-track">
                    <div className="stat-bar-fill fill-gold" style={{ width: '65%' }} />
                  </div>
                  <span className="stat-value">{activeVehicle.stats.spd}</span>
                </div>
              </div>

              {/* Special Skill box */}
              <div className="skill-preview-box">
                <div className="skill-box-title">
                  <IconFlame style={{ fill: '#ff7700', width: 14, height: 14 }} />
                  <span>COMPÉTENCE ULTIME</span>
                </div>
                <p className="skill-desc">{activeVehicle.skill}</p>
              </div>

              {/* Big Action Buttons */}
              <div className="hangar-actions-row">
                <button className="game-btn btn-primary-gold">
                  <IconUpgrade style={{ fill: '#fff', width: 18, height: 18 }} />
                  <span>AMÉLIORER (LVL UP)</span>
                </button>
                <button className="game-btn btn-secondary-cyber">
                  <IconStar style={{ fill: '#00d4ff', width: 16, height: 16 }} />
                  <span>OVERCLOCK ★</span>
                </button>
                <button className="game-btn btn-secondary-cyber">
                  <IconFormation style={{ fill: '#aa44ff', width: 16, height: 16 }} />
                  <span>FORMATION</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Fleet Selector Bar */}
        <div className="fleet-selector-section">
          <div className="fleet-selector-title">
            <span>SÉLECTION DU CHÂSSIS ACTIF ({ROSTER_VEHICLES.length}/12)</span>
          </div>
          <div className="fleet-cards-row">
            {ROSTER_VEHICLES.map((v) => (
              <div
                key={v.id}
                onClick={() => setSelectedId(v.id)}
                className={`fleet-card-item ${v.id === selectedId ? 'selected' : ''}`}
                style={{ borderColor: v.id === selectedId ? v.factionColor : 'var(--border-med)' }}
              >
                <img src={v.img} alt={v.name} className="fleet-card-thumb" />
                <div className="fleet-card-info">
                  <div className="fleet-card-title">{v.name}</div>
                  <div className="fleet-card-meta">
                    <span className="fleet-card-lvl">Lv.{v.level}</span>
                    <span className="fleet-card-stars">★★★★★</span>
                  </div>
                </div>
                {v.id === selectedId && (
                  <div className="fleet-badge-active" style={{ background: v.factionColor }}>
                    <IconCheck style={{ fill: '#000', width: 12, height: 12 }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RosterView;
