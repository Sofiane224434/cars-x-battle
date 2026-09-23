import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGameState } from '../game/gameStateContext.jsx';
import { computeChassisStats, calculateFleetAura } from '../game/battleEngine.js';

export default function Navbar() {
  const { state, getActiveTeam } = useGameState();
  const { currencies, guildTech } = state;

  const playerTeam = getActiveTeam();
  const playerAura = calculateFleetAura(playerTeam);

  // Puissance de Combat Totale
  const totalCombatPower = playerTeam.reduce((acc, unit) => {
    if (!unit) return acc;
    const computed = computeChassisStats(unit, playerAura, guildTech);
    return acc + Math.round(computed.stats.maxHp / 5 + computed.stats.atk + computed.stats.armor * 2);
  }, 0);

  return (
    <>
      {/* Header Supérieur GXB2 : Profil Commandant, VIP, Devises */}
      <header className="sticky top-0 z-50 bg-slate-950/95 backdrop-blur-md border-b border-slate-800 shadow-xl select-none">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 font-mono text-xs">
          
          {/* Bloc Profil Joueur */}
          <div className="flex items-center gap-3">
            <div className="relative cursor-pointer hover:scale-105 transition-transform">
              <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-cyan-600 to-slate-900 border-2 border-cyan-400 p-0.5 flex items-center justify-center text-xl shadow-md shadow-cyan-500/20">
                🏎️
              </div>
              <div className="absolute -bottom-1 -right-1 bg-cyan-500 text-black font-extrabold text-[9px] px-1.5 py-0.2 rounded-sm border border-black leading-tight">
                Nv.45
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-slate-100 tracking-wide">Commandant</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500">
                  VIP 4
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-yellow-400 font-bold mt-0.5">
                <span>⚔️</span>
                <span>Puissance : {totalCombatPower.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Barres de Devises Principales */}
          <div className="flex items-center gap-2.5 text-slate-200">
            {/* Or */}
            <div className="flex items-center bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800 gap-1.5 shadow-inner">
              <span className="text-base">🪙</span>
              <span className="font-extrabold text-yellow-300 text-xs">
                {currencies.gold >= 1000000 ? `${(currencies.gold / 1000000).toFixed(1)}M` : currencies.gold.toLocaleString()}
              </span>
            </div>

            {/* Fluide EXP */}
            <div className="flex items-center bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800 gap-1.5 shadow-inner">
              <span className="text-base">🧪</span>
              <span className="font-extrabold text-emerald-300 text-xs">
                {currencies.juice >= 1000000 ? `${(currencies.juice / 1000000).toFixed(1)}M` : currencies.juice.toLocaleString()}
              </span>
            </div>

            {/* Gemmes */}
            <div className="flex items-center bg-slate-900/90 px-2.5 py-1.5 rounded-xl border border-slate-800 gap-1.5 shadow-inner">
              <span className="text-base">💎</span>
              <span className="font-extrabold text-cyan-300 text-xs">
                {currencies.gems.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Barre Inférieure de Navigation Fixe (Dock de Jeu) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-lg border-t border-slate-800 shadow-2xl">
        <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-around">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-2xl">🏠</span>
            <span>Campus</span>
          </NavLink>

          <NavLink
            to="/hangar"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-cyan-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-2xl">🚗</span>
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
            <span className="text-2xl">⚔️</span>
            <span>Combat</span>
          </NavLink>

          <NavLink
            to="/gacha"
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[11px] font-mono font-bold transition-all ${
                isActive ? 'text-purple-400 scale-105' : 'text-slate-400 hover:text-slate-200'
              }`
            }
          >
            <span className="text-2xl">🎟️</span>
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
            <span className="text-2xl">🧪</span>
            <span>Tech</span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
