import React, { useState } from 'react';
import {
  IconShield, IconSkull, IconLab, IconShop,
  IconTrophy, IconCheck, IconChevronRight, IconFlame
} from '../Icons.jsx';

function GuildView() {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="view-container view-guild">
      {/* Background with Holographic Command Center */}
      <div className="view-bg guild-bg" />
      <div className="view-overlay" />

      <div className="view-content-wrapper">
        {/* Guild Header Banner */}
        <div className="guild-command-header">
          <div className="guild-emblem-badge">
            <IconShield style={{ fill: '#22cc66', width: 28, height: 28 }} />
          </div>
          <div className="guild-header-details">
            <div className="guild-name-row">
              <h1 className="guild-title">CYBER-SYNDICATE</h1>
              <span className="guild-lvl-tag">NIV. 7</span>
            </div>
            <div className="guild-meta-row">
              <span>Chef : <strong>Aegis_Prime</strong></span>
              <span>·</span>
              <span>Effectif : <strong>28 / 30</strong></span>
              <span>·</span>
              <span className="guild-rank-tag">RANG SERVEUR #4</span>
            </div>
          </div>

          <div className="guild-checkin-wrapper">
            <button
              onClick={() => setCheckedIn(true)}
              className={`game-btn ${checkedIn ? 'btn-checked' : 'btn-checkin'}`}
              disabled={checkedIn}
            >
              <IconCheck style={{ fill: checkedIn ? '#22cc66' : '#fff', width: 16, height: 16 }} />
              <span>{checkedIn ? 'RAPPORT ENREGISTRÉ' : 'RAPPORT DU JOUR (+250)'}</span>
            </button>
          </div>
        </div>

        {/* Guild Grid of Tactical Operations */}
        <div className="guild-tactical-grid">
          {/* Card 1: GvG Territory War */}
          <div className="guild-op-card card-gvg">
            <div className="op-card-header">
              <span className="op-card-badge red">ÉVÉNEMENT GUERRE</span>
              <span className="op-card-status">EN COURS</span>
            </div>
            <h3 className="op-card-title">GUERRE DE TERRITOIRES</h3>
            <p className="op-card-desc">Secteur Gamma-7 en contestation directe contre l'Alliance Red_Viper.</p>
            <div className="op-card-footer">
              <span className="op-card-score">Score : 4,820 vs 4,110 pts</span>
              <button className="game-btn-sub btn-red">COMBATTRE</button>
            </div>
          </div>

          {/* Card 2: Guild Boss Raid */}
          <div className="guild-op-card card-boss">
            <div className="op-card-header">
              <span className="op-card-badge orange">RAID COOP</span>
              <span className="op-card-status">2/2 ESSAIS</span>
            </div>
            <h3 className="op-card-title">LÉVIATHAN PHASE 2</h3>
            <p className="op-card-desc">Boss mécanique colosse. Barrière énergétique à 64% restants.</p>
            <div className="op-card-footer">
              <div className="boss-hp-bar">
                <div className="boss-hp-fill" style={{ width: '64%' }} />
              </div>
              <button className="game-btn-sub btn-orange">ASSAUT</button>
            </div>
          </div>

          {/* Card 3: Tech Lab */}
          <div className="guild-op-card card-tech">
            <div className="op-card-header">
              <span className="op-card-badge purple">RECHERCHE</span>
              <span className="op-card-status">NIV. 12</span>
            </div>
            <h3 className="op-card-title">LABORATOIRE D'ARMEMENT</h3>
            <p className="op-card-desc">Bonus passifs permanents sur l'ensemble de la flotte de l'alliance.</p>
            <div className="op-card-footer">
              <span className="tech-bonus-text">+14% Blindage · +10% Crit</span>
              <button className="game-btn-sub btn-purple">BOOSTER</button>
            </div>
          </div>

          {/* Card 4: Guild Shop */}
          <div className="guild-op-card card-shop">
            <div className="op-card-header">
              <span className="op-card-badge green">RAVITAILLEMENT</span>
              <span className="op-card-status">4,850 JETONS</span>
            </div>
            <h3 className="op-card-title">MARCHÉ NOIR ALLIANCE</h3>
            <p className="op-card-desc">Échangez vos médailles d'alliance contre des pièces de châssis exclusives.</p>
            <div className="op-card-footer">
              <span className="shop-refresh-text">Reset dans 4h 15m</span>
              <button className="game-btn-sub btn-green">ACCÉDER</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuildView;
