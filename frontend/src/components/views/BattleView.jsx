import React, { useState } from 'react';
import {
  IconSwords, IconCampaign, IconStadium, IconTower,
  IconCompass, IconSkull, IconFlame, IconChevronRight, IconBolt
} from '../Icons.jsx';

function BattleView() {
  const [selectedMode, setSelectedMode] = useState('campaign');

  const modes = [
    {
      id: 'campaign',
      name: 'CAMPAGNE MONDIALE',
      subtitle: 'Secteur 3 : Désert de Silicium · Stage 3-5',
      tag: 'PvE PRINCIPAL',
      tagColor: '#ff8800',
      Icon: IconCampaign,
      desc: 'Avancez à travers les zones radioactives et débloquez la production passive de l\'usine.',
      energy: '10 ⚡',
      drops: ['Noyaux 5★', 'Alliage Titan', 'Puces IA'],
      boss: 'Goliath RX-4 Heavy Mech'
    },
    {
      id: 'arena',
      name: 'ARÈNE CLASSEE 1v1',
      subtitle: 'Division Argent II · 1,480 Points',
      tag: 'PvP EN DIRECT',
      tagColor: '#00d4ff',
      Icon: IconStadium,
      desc: 'Défiez les autres commandants. Montez au classement saisonnier pour les récompenses de ligue.',
      energy: '3/5 Gratuits',
      drops: ['Cyber-Gemmes', 'Médailles de Duel'],
      boss: 'Rang #14 Serveur'
    },
    {
      id: 'tower',
      name: 'TOUR DES 1000 PALIERS',
      subtitle: 'Étage Actuel : Palier 42 / 1000',
      tag: 'DÉFI ASCENSION',
      tagColor: '#aa44ff',
      Icon: IconTower,
      desc: 'Banc d\'essai extrême pour tester l\'endurance et la synergie de votre flotte.',
      energy: 'Illimité',
      drops: ['Module Doré', '500 Gemmes'],
      boss: 'Gardien d\'Étage 45'
    },
    {
      id: 'patrol',
      name: 'EXPÉDITION PATROUILLE',
      subtitle: 'Secteur Inconnu · Reset 18h',
      tag: 'ROGUE-LITE 48H',
      tagColor: '#22cc66',
      Icon: IconCompass,
      desc: 'Choisissez votre itinéraire avec artefacts aléatoires, caisses de ravitaillement et mercenaires.',
      energy: '1 Pass',
      drops: ['Artefacts Rares', 'Crédits x2'],
      boss: 'Raid Sécurisé'
    },
    {
      id: 'boss',
      name: 'LÉVIATHAN DE GUILDE',
      subtitle: 'Boss Mondial · 64% PV Restants',
      tag: 'COOP ALLIANCE',
      tagColor: '#ff3344',
      Icon: IconSkull,
      desc: 'Coopérez avec les membres de votre guilde pour terrasser le Titan Mécanique.',
      energy: '2/2 Essais',
      drops: ['Équipement Mythique', 'Jetons Guilde'],
      boss: 'Titan Alpha Phase 2'
    }
  ];

  const activeMode = modes.find(m => m.id === selectedMode) || modes[0];

  return (
    <div className="view-container view-battle">
      {/* Background with Wasteland scenery */}
      <div className="view-bg battle-bg" />
      <div className="view-overlay" />

      <div className="view-content-wrapper">
        {/* Header */}
        <div className="section-game-header">
          <div className="section-title-group">
            <span className="section-badge" style={{ color: '#ff3344' }}>
              THÉÂTRE D'OPÉRATIONS
            </span>
            <h1 className="section-main-title">ZONES DE COMBAT</h1>
          </div>
          <div className="battle-energy-display">
            <IconBolt style={{ fill: '#22cc66', width: 16, height: 16 }} />
            <span>CARBURANT : <strong>120 / 120</strong></span>
          </div>
        </div>

        {/* Desktop Layout : Featured Mode Showcase + Mode Selector */}
        <div className="battle-layout-grid">
          {/* Active Featured Card Banner */}
          <div className="battle-hero-banner">
            <div className="hero-banner-glass">
              <div className="hero-banner-top">
                <span className="hero-banner-tag" style={{ background: activeMode.tagColor }}>
                  {activeMode.tag}
                </span>
                <span className="hero-banner-energy">{activeMode.energy}</span>
              </div>

              <h2 className="hero-banner-title">{activeMode.name}</h2>
              <div className="hero-banner-sub">{activeMode.subtitle}</div>
              <p className="hero-banner-desc">{activeMode.desc}</p>

              {/* Boss / Objective preview */}
              <div className="hero-objective-box">
                <div className="objective-label">CIBLE / ADVERSAIRE :</div>
                <div className="objective-name">
                  <IconFlame style={{ fill: '#ff5500', width: 16, height: 16 }} />
                  <span>{activeMode.boss}</span>
                </div>
              </div>

              {/* Drop rewards preview */}
              <div className="hero-drops-row">
                <span className="drops-label">RÉCOMPENSES :</span>
                {activeMode.drops.map((drop, i) => (
                  <span key={i} className="drop-chip">{drop}</span>
                ))}
              </div>

              {/* Big Deploy Button */}
              <button className="game-btn btn-battle-deploy">
                <IconSwords style={{ fill: '#fff', width: 22, height: 22 }} />
                <span>DÉPLOYER LA FORMATION</span>
              </button>
            </div>
          </div>

          {/* Mode Selector List */}
          <div className="battle-modes-column">
            <div className="modes-column-title">MODES DISPONIBLES</div>
            <div className="modes-list-cards">
              {modes.map((m) => {
                const isSelected = m.id === selectedMode;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedMode(m.id)}
                    className={`battle-mode-card ${isSelected ? 'active' : ''}`}
                    style={{ borderLeftColor: m.tagColor }}
                  >
                    <div className="mode-card-icon" style={{ background: `${m.tagColor}22` }}>
                      <m.Icon style={{ fill: m.tagColor, width: 20, height: 20 }} />
                    </div>
                    <div className="mode-card-text">
                      <div className="mode-card-title">{m.name}</div>
                      <div className="mode-card-sub">{m.subtitle}</div>
                    </div>
                    <div className="mode-card-action">
                      <IconChevronRight style={{ fill: isSelected ? m.tagColor : 'var(--text-dim)', width: 18, height: 18 }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BattleView;
