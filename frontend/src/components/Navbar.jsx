import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGameState } from '../game/gameStateContext.jsx';
import { computeChassisStats, calculateFleetAura } from '../game/battleEngine.js';

export default function Navbar() {
  const { state, switchProfile, resetGame, getActiveTeam } = useGameState();
  const { currencies, isVeteranProfile, campaign, guildTech } = state;

  const playerTeam = getActiveTeam();
  const playerAura = calculateFleetAura(playerTeam);

  // Puissance de Combat Globale (Total Power style GXB2)
  const totalCombatPower = playerTeam.reduce((acc, unit) => {
    if (!unit) return acc;
    const computed = computeChassisStats(unit, playerAura, guildTech);
    return acc + Math.round(computed.stats.maxHp / 5 + computed.stats.atk + computed.stats.armor * 2);
  }, 0);

  return (
    <>
      {/* Header Supérieur GXB2 : Profil Commandant, VIP, Devises */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-3 py-2 flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          
          {/* Bloc Profil Commandant GXB2 */}
          <div className="flex items-center gap-2.5">
            {/* Avatar & Niveau */}
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-600 to-slate-900 border border-cyan-400 p-0.5 flex items-center justify-center text-lg shadow-md shadow-cyan-500/20">
                👨‍✈️
              </div>
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black font-extrabold text-[9px] px-1 rounded-sm border border-black leading-tight">
                Nv.{isVeteranProfile ? 142 : 28}
              </div>
            </div>

            {/* Pseudo & Puissance de Combat */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm text-slate-100 tracking-wide">Commandant_Azim</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-600">
                  VIP {isVeteranProfile ? 11 : 3}
                </span>
              </div>
              {/* Puissance de combat avec épées croisées */}
              <div className="flex items-center gap-1 text-[11px] text-yellow-400 font-bold">
                <span>⚔️</span>
                <span>Puissance : {totalCombatPower.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Sélecteur de Profil Démo */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => switchProfile(false)}
              className={`px-2 py-0.5 rounded text-[11px] transition-all ${!isVeteranProfile ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              🌱 Débutant
            </button>
            <button
              onClick={() => switchProfile(true)}
              className={`px-2 py-0.5 rounded text-[11px] transition-all ${isVeteranProfile ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
            >
              👑 Vétéran Max
            </button>
          </div>

          {/* Barres de Devises GXB2 avec boutons + */}
          <div className="flex items-center gap-2 text-slate-200">
            {/* Or */}
            <div className="flex items-center bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 gap-1.5">
              <span className="text-yellow-400">🪙</span>
              <span className="font-extrabold text-yellow-300 text-xs">
                {currencies.gold >= 1000000 ? `${(currencies.gold / 1000000).toFixed(1)}M` : currencies.gold.toLocaleString()}
              </span>
            </div>

            {/* Fluide EXP */}
            <div className="flex items-center bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 gap-1.5">
              <span className="text-emerald-400">🧪</span>
              <span className="font-extrabold text-emerald-300 text-xs">
                {currencies.juice >= 1000000 ? `${(currencies.juice / 1000000).toFixed(1)}M` : currencies.juice.toLocaleString()}
              </span>
            </div>

            {/* Gemmes */}
            <div className="flex items-center bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 gap-1.5">
              <span className="text-cyan-400">💎</span>
              <span className="font-extrabold text-cyan-300 text-xs">{currencies.gems.toLocaleString()}</span>
            </div>

            {/* Bons de Commande */}
            <div className="hidden sm:flex items-center bg-slate-900 px-2 py-1 rounded-lg border border-slate-800 gap-1.5">
              <span className="text-purple-400">🎟️</span>
              <span className="font-extrabold text-purple-300 text-xs">{currencies.advanceCapsules}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Barre Inférieure de Navigation GXB2 Fixe (Style Dock Mobile & Desktop) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl">
        <div className="max-w-xl mx-auto px-2 py-1.5 flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-xl">🏠</span>
            <span>Hangar</span>
          </NavLink>

          <NavLink
            to="/hangar"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-xl">🚗</span>
            <span>Flotte</span>
          </NavLink>

          <NavLink
            to="/battle"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-xl">⚔️</span>
            <span>Combat</span>
          </NavLink>

          <NavLink
            to="/campaign"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-xl">🗺️</span>
            <span>Campagne</span>
          </NavLink>

          <NavLink
            to="/gacha"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-purple-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-xl">🏭</span>
            <span>Port</span>
          </NavLink>

          <NavLink
            to="/guild-tech"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-emerald-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-xl">🧪</span>
            <span>Tech</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
