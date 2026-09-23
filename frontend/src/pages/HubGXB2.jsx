import React, { useState } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';
import { FACTIONS } from '../game/rosterData.js';

export default function HubGXB2({ onNavigate }) {
  const { state, calculatePendingLoot, claimCampaignLoot, fastRewardCampaign } = useGameState();
  const { currencies, userRoster, campaign, isVeteranProfile } = state;

  const [secretaryDialogue, setSecretaryDialogue] = useState('Systèmes opérationnels, Commandant. Flotte en alerte.');
  const [dialogueFade, setDialogueFade] = useState(false);
  const [fastRewardAlert, setFastRewardAlert] = useState(null);

  // Le véhicule secrétaire (le premier châssis le plus puissant ou débloqué)
  const secretaryChassis = userRoster.find(c => c.unlocked) || userRoster[0];
  const pendingLoot = calculatePendingLoot();

  const dialogues = [
    `Capteurs thermiques optimaux. Le secteur ${campaign.currentSector} attend notre offensive.`,
    'Noyau énergétique stable à 99.8%. Prêt pour le prochain banc d\'essai.',
    'Commandant, de nouveaux protocoles de rapatriement sont disponibles au Port.',
    'Alerte : plusieurs alliances rivales ont été détectées dans le secteur 04.',
    'Raffinage des alliages en cours. Les usines automatisées tournent à plein régime.'
  ];

  const handleSecretaryClick = () => {
    setDialogueFade(true);
    setTimeout(() => {
      const nextDialogue = dialogues[Math.floor(Math.random() * dialogues.length)];
      setSecretaryDialogue(nextDialogue);
      setDialogueFade(false);
    }, 150);
  };

  const handleFastLoot = () => {
    const reward = fastRewardCampaign();
    setFastRewardAlert(`⚡ Récolte Turbo : +${reward.gold.toLocaleString()} Or, +${reward.juice.toLocaleString()} Fluide EXP, +${reward.gems} Gemmes !`);
    setTimeout(() => setFastRewardAlert(null), 4000);
  };

  return (
    <div className="relative min-h-[calc(100vh-140px)] flex flex-col justify-between overflow-hidden bg-slate-950 select-none">
      {/* Fond immersif Hangar Sci-Fi avec grille et halo */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-950/30 via-slate-950 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#082f4915_1px,transparent_1px),linear-gradient(to_bottom,#082f4915_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Notification Récolte Turbo */}
      {fastRewardAlert && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-cyan-950/95 border border-cyan-400 text-cyan-200 px-4 py-2 rounded-xl text-xs font-mono shadow-xl shadow-cyan-500/20 animate-bounce">
          {fastRewardAlert}
        </div>
      )}

      {/* Raccourcis Flottants Latéraux Gauche (Events, Daily, Courrier) */}
      <div className="absolute top-6 left-4 z-20 flex flex-col gap-3">
        <button
          onClick={handleFastLoot}
          className="group relative flex items-center gap-2 bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 p-2.5 rounded-2xl shadow-lg transition-all active:scale-95"
          title="Récolte Turbo (Fast Reward)"
        >
          <span className="text-2xl animate-pulse">⚡</span>
          <div className="hidden sm:block text-left pr-2 font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Récolte Turbo</div>
            <div className="text-xs text-yellow-400 font-extrabold">120 min AFK</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('campaign')}
          className="group relative flex items-center gap-2 bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 p-2.5 rounded-2xl shadow-lg transition-all active:scale-95"
          title="Usines d'Extraction Passives"
        >
          <span className="text-2xl">📦</span>
          <div className="hidden sm:block text-left pr-2 font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Coffre AFK</div>
            <div className="text-xs text-emerald-400 font-extrabold">{pendingLoot.minutes} min prêtes</div>
          </div>
        </button>

        <button
          onClick={() => onNavigate('guild-tech')}
          className="group relative flex items-center gap-2 bg-slate-900/90 hover:bg-cyan-950 border border-slate-700 hover:border-cyan-400 p-2.5 rounded-2xl shadow-lg transition-all active:scale-95"
          title="Laboratoire d'Ingénierie"
        >
          <span className="text-2xl">🧪</span>
          <div className="hidden sm:block text-left pr-2 font-mono">
            <div className="text-[10px] text-slate-400 font-bold uppercase">Recherche</div>
            <div className="text-xs text-cyan-400 font-extrabold">Guild Tech</div>
          </div>
        </button>
      </div>

      {/* Raccourcis Flottants Latéraux Droite (Bâtiments Tactiques du Hangar) */}
      <div className="absolute top-6 right-4 z-20 flex flex-col gap-3">
        <button
          onClick={() => onNavigate('gacha')}
          className="group flex items-center gap-2.5 bg-purple-950/80 hover:bg-purple-900 border border-purple-500/60 p-2.5 rounded-2xl shadow-lg shadow-purple-950/40 transition-all active:scale-95 text-right justify-end"
        >
          <div className="hidden sm:block text-right pl-2 font-mono">
            <div className="text-[10px] text-purple-300 font-bold uppercase">Port Central</div>
            <div className="text-xs text-white font-extrabold">Invocations</div>
          </div>
          <span className="text-2xl">🎟️</span>
        </button>

        <button
          onClick={() => onNavigate('arena')}
          className="group flex items-center gap-2.5 bg-red-950/80 hover:bg-red-900 border border-red-500/60 p-2.5 rounded-2xl shadow-lg shadow-red-950/40 transition-all active:scale-95 text-right justify-end"
        >
          <div className="hidden sm:block text-right pl-2 font-mono">
            <div className="text-[10px] text-red-300 font-bold uppercase">Banc d'Essai</div>
            <div className="text-xs text-white font-extrabold">Arène PvP</div>
          </div>
          <span className="text-2xl">🏆</span>
        </button>

        <button
          onClick={() => onNavigate('battle')}
          className="group flex items-center gap-2.5 bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/60 p-2.5 rounded-2xl shadow-lg shadow-cyan-950/40 transition-all active:scale-95 text-right justify-end"
        >
          <div className="hidden sm:block text-right pl-2 font-mono">
            <div className="text-[10px] text-cyan-300 font-bold uppercase">Simulateur</div>
            <div className="text-xs text-white font-extrabold">Combat 6v6</div>
          </div>
          <span className="text-2xl">⚔️</span>
        </button>
      </div>

      {/* Zone Centrale : Le Véhicule Amiral / Secrétaire Interactif (Style GXB2) */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4">
        {/* Bulle de dialogue interactive du Secrétaire */}
        <div
          onClick={handleSecretaryClick}
          className={`cursor-pointer max-w-md bg-slate-900/90 backdrop-blur-md border border-cyan-500/50 px-5 py-3 rounded-2xl shadow-xl shadow-cyan-950/30 text-center mb-6 transition-all duration-200 hover:border-cyan-400 hover:scale-102 ${
            dialogueFade ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          <div className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest mb-1 flex items-center justify-center gap-1.5">
            <span>📡</span> {secretaryChassis.name} • Télémétrie IA
          </div>
          <p className="text-sm font-medium text-slate-100 italic">
            "{secretaryDialogue}"
          </p>
          <span className="text-[9px] text-slate-500 font-mono block mt-1">Cliquez sur le véhicule pour interagir</span>
        </div>

        {/* Graphisme / Silhouette du Véhicule en Vedette */}
        <div
          onClick={handleSecretaryClick}
          className="group relative cursor-pointer flex flex-col items-center justify-center transition-all duration-300 hover:scale-105"
        >
          {/* Halo d'énergie sous le véhicule */}
          <div className="absolute -bottom-6 w-64 h-16 bg-cyan-500/20 rounded-full blur-xl group-hover:bg-cyan-400/30 transition-all" />

          <div className="text-9xl filter drop-shadow-[0_10px_20px_rgba(6,182,212,0.3)] animate-pulse-slow">
            {secretaryChassis.avatar}
          </div>

          <div className="mt-4 text-center">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700 text-slate-300">
              {FACTIONS[secretaryChassis.faction]?.name} • Nv.{secretaryChassis.level}
            </span>
          </div>
        </div>
      </div>

      {/* Bandeau d'Accès Rapide Inférieur : Bâtiments du Hangar */}
      <div className="relative z-20 max-w-4xl mx-auto w-full px-4 mb-3">
        <div className="grid grid-cols-4 gap-3 bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-800 shadow-2xl">
          <button
            onClick={() => onNavigate('hangar')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🚗</span>
            <span className="text-xs font-bold text-slate-300 font-mono group-hover:text-cyan-400">Atelier Châssis</span>
          </button>

          <button
            onClick={() => onNavigate('battle')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">⚔️</span>
            <span className="text-xs font-bold text-slate-300 font-mono group-hover:text-cyan-400">Arène 6v6</span>
          </button>

          <button
            onClick={() => onNavigate('campaign')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🗺️</span>
            <span className="text-xs font-bold text-slate-300 font-mono group-hover:text-cyan-400">Campagne</span>
          </button>

          <button
            onClick={() => onNavigate('gacha')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-slate-800 transition-all group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">🏭</span>
            <span className="text-xs font-bold text-slate-300 font-mono group-hover:text-purple-400">Rapatriement</span>
          </button>
        </div>
      </div>
    </div>
  );
}
