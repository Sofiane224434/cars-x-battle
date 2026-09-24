import React, { useState } from 'react';
import {
  IconCapsule, IconStar, IconTarget, IconFoundry,
  IconGem, IconFlame, IconCheck
} from '../Icons.jsx';

function GachaView() {
  const [summonAnim, setSummonAnim] = useState(false);
  const [pullCount, setPullCount] = useState(36);
  const [lastLoot, setLastLoot] = useState(null);

  const triggerSummon = (amount) => {
    setSummonAnim(true);
    setPullCount(prev => Math.min(50, prev + amount));
    setTimeout(() => {
      setSummonAnim(false);
      setLastLoot(amount === 10 ? 'Titan Goliath Mech 5★ OBTENU !' : 'Striker Mk-II 4★ OBTENU !');
    }, 1200);
  };

  return (
    <div className="view-container view-gacha">
      {/* Background with Quantum Portal Lab */}
      <div className="view-bg gacha-bg" />
      <div className="view-overlay" />

      <div className="view-content-wrapper">
        {/* Header */}
        <div className="section-game-header">
          <div className="section-title-group">
            <span className="section-badge" style={{ color: '#ff8800' }}>
              CHAMBRE QUANTIQUE D'ASSEMBLAGE
            </span>
            <h1 className="section-main-title">RAPATRIEMENT DE CHÂSSIS</h1>
          </div>
          <div className="gacha-currency-display">
            <span className="currency-pill">
              <IconGem style={{ width: 14, height: 14, fill: '#00d4ff' }} />
              <strong>2,450 Gemmes</strong>
            </span>
          </div>
        </div>

        {/* Central Summon Altar Box */}
        <div className="gacha-altar-container">
          {/* Banner Hero Showcase */}
          <div className="gacha-banner-card">
            <div className="banner-badge-focus">FOCUS LIMITÉ · TAUX AUGMENTÉS x3</div>
            <h2 className="banner-featured-title">AETHELRED STEALTH INTERCEPTOR</h2>
            <div className="banner-stars">★★★★★ · Châssis Quantique Légendaire</div>
            <p className="banner-subtext">
              Le chasseur d'interception le plus rapide du secteur. Équipé de doubles canons lasers à phase thermique.
            </p>

            {/* Pity gauge */}
            <div className="gacha-pity-gauge-box">
              <div className="pity-gauge-header">
                <span>GARANTI 5★ DANS :</span>
                <strong className="pity-count">{50 - pullCount} TIRAGES</strong>
              </div>
              <div className="pity-bar-track">
                <div
                  className="pity-bar-fill"
                  style={{ width: `${(pullCount / 50) * 100}%` }}
                />
              </div>
              <div className="pity-progress-text">{pullCount} / 50 Protocoles activés</div>
            </div>

            {/* Live loot feedback alert */}
            {lastLoot && (
              <div className="gacha-loot-alert">
                <IconStar style={{ fill: '#ffcc00', width: 18, height: 18 }} />
                <span>{lastLoot}</span>
              </div>
            )}
          </div>

          {/* Summon Action Buttons */}
          <div className="gacha-summon-actions">
            <button
              onClick={() => triggerSummon(1)}
              disabled={summonAnim}
              className="game-btn gacha-btn-single"
            >
              <div className="btn-label-top">1x RAPATRIER</div>
              <div className="btn-cost-row">
                <IconGem style={{ width: 14, height: 14, fill: '#00d4ff' }} />
                <span>200 Gemmes</span>
              </div>
            </button>

            <button
              onClick={() => triggerSummon(10)}
              disabled={summonAnim}
              className="game-btn gacha-btn-multi"
            >
              <div className="multi-ribbon">-10% RÉDUCTION</div>
              <div className="btn-label-top">10x RAPATRIER</div>
              <div className="btn-cost-row">
                <IconGem style={{ width: 16, height: 16, fill: '#ffcc00' }} />
                <span className="gold-text">1,800 Gemmes</span>
                <span className="strike-text">2,000</span>
              </div>
            </button>
          </div>

          {/* Rates / Info footer */}
          <div className="gacha-rates-footer">
            <span className="rate-badge legend">5★ Châssis : 4.5%</span>
            <span className="rate-badge epic">4★ Prototype : 18.0%</span>
            <span className="rate-badge rare">3★ Standard : 77.5%</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GachaView;
