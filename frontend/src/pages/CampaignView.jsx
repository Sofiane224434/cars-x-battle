import React, { useState, useEffect } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';

const SECTORS = [
  { id: 1, name: 'Secteur 01 : Usines Automatisées de Neo-Detroit', hazard: 'Faible', boss: 'Goliath Prototype' },
  { id: 2, name: 'Secteur 02 : Complexe Sidérurgique d\'IronForge', hazard: 'Moyen', boss: 'IronTitan 155mm' },
  { id: 3, name: 'Secteur 03 : Friches Bio-Organiques de Sector-X', hazard: 'Élevé', boss: 'BioBehemoth B-6' },
  { id: 4, name: 'Secteur 04 : Centrale Thermique Solaire', hazard: 'Sévère', boss: 'Helios Array Core' },
  { id: 5, name: 'Secteur 05 : Anneau d\'Accélération Orbital', hazard: 'Extrême', boss: 'VoidReaper Omega' },
  { id: 6, name: 'Secteur 06 : Cité Céleste d\'Aegis Prime', hazard: 'Légendaire', boss: 'Chronos Prime Archon' }
];

export default function CampaignView() {
  const { state, calculatePendingLoot, claimCampaignLoot, fastRewardCampaign } = useGameState();
  const { campaign } = state;

  const [pendingLoot, setPendingLoot] = useState(calculatePendingLoot());
  const [notification, setNotification] = useState(null);

  // Mise à jour du loot toutes les 5 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setPendingLoot(calculatePendingLoot());
    }, 5000);
    return () => clearInterval(interval);
  }, [state.campaign.lastLootClaimTime]);

  const handleClaim = () => {
    const loot = claimCampaignLoot();
    setNotification(`✅ Récolte passive réussie : +${loot.gold.toLocaleString()} Or, +${loot.juice.toLocaleString()} Fluide EXP, +${loot.alloyShards} Alliages !`);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleFastReward = () => {
    const loot = fastRewardCampaign();
    setNotification(`⚡ Récolte Turbo (120 min) : +${loot.gold.toLocaleString()} Or, +${loot.juice.toLocaleString()} Fluide EXP, +${loot.alloyShards} Alliages, +${loot.gems} Gemmes !`);
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête Campagne */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span>🗺️</span> Campagne Cartographique & Extraction AFK
          </h1>
          <p className="text-sm text-slate-400">
            Progressez à travers les secteurs industriels pour augmenter le rendement horaire de vos usines automatisées.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Secteur Actuel :</span>
          <span className="text-cyan-400 font-bold">Secteur {campaign.currentSector} - Étape {campaign.currentStage}</span>
        </div>
      </div>

      {notification && (
        <div className="bg-emerald-950/80 border border-emerald-500 text-emerald-300 p-3 rounded-xl font-mono text-xs animate-in fade-in">
          {notification}
        </div>
      )}

      {/* Module de Production Passive AFK (Coffre en temps réel) */}
      <div className="scifi-panel-glow p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-extrabold text-cyan-400 flex items-center gap-2">
              <span>📦</span> Coffre d'Extraction Continue (AFK Auto-Loot)
            </h2>
            <p className="text-xs text-slate-400">
              Temps d'accumulation actuel : <span className="text-white font-mono font-bold">{pendingLoot.minutes} minute(s)</span> (Plafond : 12 heures)
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClaim}
              className="btn-scifi px-6 py-2.5 text-sm font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/30"
            >
              <span>📥</span> Récolter les Ressources
            </button>
            <button
              onClick={handleFastReward}
              className="btn-scifi-orange px-4 py-2.5 text-xs font-bold font-mono flex items-center gap-1.5 shadow-lg shadow-orange-500/20"
            >
              <span>⚡</span> Récolte Turbo (120 min)
            </button>
          </div>
        </div>

        {/* Aperçu des gains en attente */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <span className="text-3xl">🪙</span>
            <div>
              <div className="text-xs text-slate-400 font-mono">Crédits d'Or</div>
              <div className="text-base font-extrabold text-yellow-400 font-mono">+{pendingLoot.gold.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <span className="text-3xl">🧪</span>
            <div>
              <div className="text-xs text-slate-400 font-mono">Fluide de Maintenance</div>
              <div className="text-base font-extrabold text-emerald-400 font-mono">+{pendingLoot.juice.toLocaleString()}</div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <span className="text-3xl">🔩</span>
            <div>
              <div className="text-xs text-slate-400 font-mono">Fragments d'Alliage</div>
              <div className="text-base font-extrabold text-slate-200 font-mono">+{pendingLoot.alloyShards}</div>
            </div>
          </div>

          <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 flex items-center gap-3">
            <span className="text-3xl">💎</span>
            <div>
              <div className="text-xs text-slate-400 font-mono">Gemmes Énergétiques</div>
              <div className="text-base font-extrabold text-cyan-400 font-mono">+{pendingLoot.gems}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Carte des Secteurs Industriels */}
      <div className="scifi-panel p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-200 font-mono flex items-center gap-2">
          <span>🏭</span> SECTEURS CARTOGRAPHIQUES CONQUIS & EN COURS
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map(sec => {
            const isUnlocked = campaign.currentSector >= sec.id;
            const isCurrent = campaign.currentSector === sec.id;
            return (
              <div
                key={sec.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-500/10'
                    : isUnlocked
                    ? 'bg-slate-900/80 border-slate-800'
                    : 'bg-slate-950/50 border-slate-900 opacity-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400">SECTEUR 0{sec.id}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                    isCurrent ? 'bg-cyan-500 text-black' : isUnlocked ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-900 text-slate-600'
                  }`}>
                    {isCurrent ? 'EN PROGRESSION' : isUnlocked ? 'SÉCURISÉ' : 'VERROUILLÉ'}
                  </span>
                </div>
                <h4 className="font-extrabold text-sm text-slate-100 mb-1">{sec.name}</h4>
                <div className="text-xs text-slate-400 font-mono flex items-center justify-between mt-3 pt-2 border-t border-slate-800">
                  <span>Niveau Danger : <span className="text-orange-400 font-bold">{sec.hazard}</span></span>
                  <span>Boss : <span className="text-cyan-400">{sec.boss}</span></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
