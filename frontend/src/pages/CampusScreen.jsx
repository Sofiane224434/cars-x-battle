import React, { useState } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';

export default function CampusScreen({ onNavigate }) {
  const { state, calculatePendingLoot, claimCampaignLoot } = useGameState();
  const { campaign } = state;
  const [claimToast, setClaimToast] = useState(null);

  const pendingLoot = calculatePendingLoot();

  const handleClaimAFK = (e) => {
    e.stopPropagation();
    const loot = claimCampaignLoot();
    setClaimToast(`+${loot.gold.toLocaleString()} Or • +${loot.juice.toLocaleString()} EXP • +${loot.alloyShards} Alliages`);
    setTimeout(() => setClaimToast(null), 3000);
  };

  return (
    <div className="relative w-full aspect-16/9 max-h-[82vh] mx-auto rounded-2xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-black select-none">
      {/* Illustration 2D du Campus Hangar */}
      <img
        src="/assets/images/hangar_campus_bg.jpg"
        alt="Campus Hangar"
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay ambiance lumineuse */}
      <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />

      {/* Notification Toast de Récolte */}
      {claimToast && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-cyan-950/95 border-2 border-cyan-400 text-cyan-200 px-4 py-2 rounded-xl text-xs font-mono font-bold shadow-xl shadow-cyan-500/30 animate-bounce">
          ✨ Récolte Reçue : {claimToast}
        </div>
      )}

      {/* === BÂTIMENTS CLIQUABLES SUR LA CARTE DU CAMPUS (Style GXB2) === */}

      {/* 1. Hangar Principal / Atelier Véhicules (Centre) */}
      <button
        onClick={() => onNavigate('hangar')}
        className="group absolute top-[28%] left-[48%] -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <div className="px-3 py-1 bg-amber-950/90 border-2 border-amber-400 text-amber-300 font-extrabold text-xs font-mono rounded-lg shadow-lg shadow-amber-500/30 group-hover:bg-amber-500 group-hover:text-black transition-all flex items-center gap-1.5">
          <span>🚗</span> HANGAR 01 (FLOTTE)
        </div>
        <div className="w-3 h-3 bg-amber-400 rotate-45 -mt-1.5 shadow-sm" />
      </button>

      {/* 2. R&D Labs / Laboratoire Tech (Haut Gauche) */}
      <button
        onClick={() => onNavigate('guild-tech')}
        className="group absolute top-[22%] left-[24%] -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <div className="px-2.5 py-1 bg-cyan-950/90 border-2 border-cyan-400 text-cyan-300 font-extrabold text-xs font-mono rounded-lg shadow-lg shadow-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-black transition-all flex items-center gap-1">
          <span>🧪</span> LABS R&D
        </div>
        <div className="w-2.5 h-2.5 bg-cyan-400 rotate-45 -mt-1 shadow-sm" />
      </button>

      {/* 3. Summon / Gacha Bay (Bas Droite) */}
      <button
        onClick={() => onNavigate('gacha')}
        className="group absolute top-[52%] right-[10%] flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <div className="px-3 py-1.5 bg-purple-950/90 border-2 border-purple-400 text-purple-200 font-extrabold text-xs font-mono rounded-lg shadow-lg shadow-purple-500/40 group-hover:bg-purple-500 group-hover:text-white transition-all flex items-center gap-1.5 animate-pulse">
          <span>🎟️</span> PORT D'INVOCATION
        </div>
        <div className="w-2.5 h-2.5 bg-purple-400 rotate-45 -mt-1 shadow-sm" />
      </button>

      {/* 4. Arena Colosseum (Bas Gauche) */}
      <button
        onClick={() => onNavigate('arena')}
        className="group absolute top-[58%] left-[18%] -translate-x-1/2 flex flex-col items-center cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95"
      >
        <div className="px-3 py-1 bg-red-950/90 border-2 border-red-500 text-red-300 font-extrabold text-xs font-mono rounded-lg shadow-lg shadow-red-500/30 group-hover:bg-red-600 group-hover:text-white transition-all flex items-center gap-1.5">
          <span>🏆</span> ARÈNE DE COMBAT
        </div>
        <div className="w-2.5 h-2.5 bg-red-500 rotate-45 -mt-1 shadow-sm" />
      </button>

      {/* === RACCOURCIS HUD FLOTTANTS (Style GXB2) === */}

      {/* Bouton Coffre AFK Passif (Bas Gauche Flottant) */}
      <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
        <button
          onClick={handleClaimAFK}
          className="group flex items-center gap-2.5 bg-slate-900/90 backdrop-blur-md border-2 border-emerald-500/80 hover:border-emerald-400 px-3.5 py-2 rounded-2xl shadow-xl shadow-emerald-950/50 transition-all active:scale-95 cursor-pointer"
        >
          <span className="text-3xl animate-bounce">📦</span>
          <div className="text-left font-mono">
            <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Coffre AFK</div>
            <div className="text-xs text-white font-extrabold">{pendingLoot.minutes} min de loot</div>
          </div>
          <span className="bg-emerald-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full ml-1">
            Récolter
          </span>
        </button>
      </div>

      {/* Gros Bouton d'Aventure / Campagne (Bas Droite Flottant - Exactement comme GXB2) */}
      <div className="absolute bottom-4 right-4 z-20">
        <button
          onClick={() => onNavigate('battle')}
          className="group flex items-center gap-3 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-2 border-cyan-300 px-6 py-3 rounded-2xl shadow-2xl shadow-cyan-500/40 transition-all hover:scale-105 active:scale-95 cursor-pointer font-mono"
        >
          <span className="text-3xl animate-pulse">⚔️</span>
          <div className="text-left">
            <div className="text-[10px] text-cyan-200 font-bold uppercase tracking-widest">Secteur 0{campaign.currentSector}</div>
            <div className="text-sm text-white font-extrabold tracking-wider">COMBAT 6v6</div>
          </div>
          <span className="text-cyan-200 text-lg group-hover:translate-x-1 transition-transform">➔</span>
        </button>
      </div>
    </div>
  );
}
