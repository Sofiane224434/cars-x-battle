import React, { useState } from 'react';
import {
  IconCalendar, IconClipboard, IconGift, IconMail,
  IconShop, IconStadium, IconLab, IconSettings, IconSwords,
  IconStar, IconFlame
} from '../Icons.jsx';

function LobbyView() {
  const [claimed, setClaimed] = useState(false);

  return (
    <div className="lobby">
      {/* Illustrated hangar background */}
      <div className="lobby-bg-img" />
      <div className="lobby-bg-overlay" />

      <div className="lobby-inner">
        {/* Main interactive area */}
        <div className="lobby-sides">
          {/* LEFT side tactical buttons */}
          <div className="side-col side-col-left">
            <div className="side-btn">
              <IconCalendar style={{ fill: '#00d4ff' }} />
              <span className="side-btn-txt">Events</span>
              <span className="notif-dot" />
            </div>
            <div className="side-btn">
              <IconClipboard style={{ fill: '#ffcc00' }} />
              <span className="side-btn-txt">Quêtes</span>
              <span className="notif-dot" />
            </div>
            <div className="side-btn">
              <IconGift style={{ fill: '#ff44aa' }} />
              <span className="side-btn-txt">Cadeaux</span>
            </div>
            <div className="side-btn">
              <IconMail style={{ fill: '#b0bdd4' }} />
              <span className="side-btn-txt">Courrier</span>
            </div>
          </div>

          {/* CENTER — Vehicle showcase podium */}
          <div className="vehicle-stage">
            <div className="vehicle-glow-effect" />
            <img
              className="vehicle-img"
              src="/vehicle-striker.jpg"
              alt="Striker Mk-II"
            />
            <div className="vehicle-plate">
              <div className="vehicle-stars-row">
                <IconStar className="star-icon-gold" />
                <IconStar className="star-icon-gold" />
                <IconStar className="star-icon-gold" />
                <IconStar className="star-icon-gold" />
                <IconStar className="star-icon-gold" />
              </div>
              <div className="vehicle-plate-name">Striker Mk-II</div>
              <div className="vehicle-plate-class">Avant-Garde · CyberKinetic · Niv. 85</div>
              <div className="vehicle-plate-power">
                <span>PUISSANCE :</span>
                <strong>34,500 PC</strong>
              </div>
            </div>
          </div>

          {/* RIGHT side tactical buttons */}
          <div className="side-col side-col-right">
            <div className="side-btn">
              <IconShop style={{ fill: '#22cc66' }} />
              <span className="side-btn-txt">Boutique</span>
            </div>
            <div className="side-btn">
              <IconStadium style={{ fill: '#ff8800' }} />
              <span className="side-btn-txt">Arène</span>
            </div>
            <div className="side-btn">
              <IconLab style={{ fill: '#aa44ff' }} />
              <span className="side-btn-txt">Atelier</span>
            </div>
            <div className="side-btn">
              <IconSettings style={{ fill: '#6a7d9e' }} />
              <span className="side-btn-txt">Système</span>
            </div>
          </div>
        </div>

        {/* Bottom action zone */}
        <div className="lobby-bottom">
          {/* AFK passive factory */}
          <div className="afk-bar">
            <div className="afk-icon-wrap">
              <svg viewBox="0 0 24 24" fill="#000"><path d="M4 8h16v10a2 2 0 01-2 2H6a2 2 0 01-2-2V8zm0 0V6a2 2 0 012-2h12a2 2 0 012 2v2M12 12v4M10 14h4"/></svg>
            </div>
            <div className="afk-info">
              <div className="afk-title">USINE PASSIVE · 4H 32M D'ACCUMULATION</div>
              <div className="afk-detail">+18,400 Crédits · +12,200 Fluide · +65 Alliages Rares</div>
            </div>
            <button
              onClick={() => setClaimed(true)}
              className={`afk-claim ${claimed ? 'claimed' : ''}`}
            >
              {claimed ? 'RÉCOLTÉ !' : 'RÉCOLTER'}
            </button>
          </div>

          {/* Epic Battle button */}
          <button className="battle-btn">
            <IconSwords style={{ fill: '#fff' }} />
            <div className="battle-btn-inner-text">
              <span className="battle-btn-text">CAMPAGNE</span>
              <span className="battle-btn-stage">Secteur 3-5 : Désert de Silicium</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LobbyView;
