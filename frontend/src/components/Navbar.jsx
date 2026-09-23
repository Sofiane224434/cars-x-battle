import React from 'react';
import { NavLink } from 'react-router-dom';
import { useGameState } from '../game/gameStateContext.jsx';

export default function Navbar() {
  const { state, switchProfile, resetGame } = useGameState();
  const { currencies, isVeteranProfile } = state;

  return (
    <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      {/* Barre supérieure : Devises & Commandement */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 text-xs font-mono">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚗</span>
            <span className="font-extrabold text-sm tracking-wider bg-linear-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              CARS X BATTLE
            </span>
            <span className="px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[10px] font-bold">
              BÊTA DÉMO
            </span>
          </div>

          {/* Sélecteur de profil Démo */}
          <div className="flex items-center bg-slate-900 border border-slate-700 rounded-lg p-0.5">
            <button
              onClick={() => switchProfile(false)}
              className={`px-2.5 py-1 rounded transition-all ${!isVeteranProfile ? 'bg-cyan-600 text-black font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Profil Débutant (Unités 5★ Niv 1)"
            >
              🌱 Débutant
            </button>
            <button
              onClick={() => switchProfile(true)}
              className={`px-2.5 py-1 rounded transition-all ${isVeteranProfile ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              title="Profil Vétéran (Unités 10★/LB5, équipements max, tech avancée)"
            >
              👑 Vétéran Max
            </button>
          </div>
        </div>

        {/* Devises Industrielles */}
        <div className="flex flex-wrap items-center gap-3 text-slate-300">
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800" title="Crédits d'Usine (Gold)">
            <span className="text-yellow-400">🪙</span>
            <span className="font-bold text-yellow-300">{currencies.gold.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800" title="Fluide de Maintenance (Juice/EXP)">
            <span className="text-emerald-400">🧪</span>
            <span className="font-bold text-emerald-300">{currencies.juice.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800" title="Gemmes Énergétiques">
            <span className="text-cyan-400">💎</span>
            <span className="font-bold text-cyan-300">{currencies.gems.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800" title="Bons de Commande Avancés (Capsules)">
            <span className="text-purple-400">🎟️</span>
            <span className="font-bold text-purple-300">{currencies.advanceCapsules}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800" title="Sceaux Industriels (Seals)">
            <span className="text-red-400">🔮</span>
            <span className="font-bold text-red-300">{currencies.seals}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-900/80 px-2 py-1 rounded border border-slate-800" title="Fragments d'Alliage Raffiné">
            <span className="text-slate-400">🔩</span>
            <span className="font-bold text-slate-200">{currencies.alloyShards}</span>
          </div>
        </div>
      </div>

      {/* Barre de navigation principale */}
      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-1 py-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`
            }
          >
            <span>🚗</span> Hangar & Flotte
          </NavLink>

          <NavLink
            to="/battle"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`
            }
          >
            <span>⚔️</span> Simulateur Combat 6v6
          </NavLink>

          <NavLink
            to="/campaign"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`
            }
          >
            <span>🗺️</span> Campagne & Loot AFK
          </NavLink>

          <NavLink
            to="/gacha"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`
            }
          >
            <span>🏭</span> Port de Rapatriement
          </NavLink>

          <NavLink
            to="/arena"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`
            }
          >
            <span>🏆</span> Arène de Duel PvP
          </NavLink>

          <NavLink
            to="/guild-tech"
            className={({ isActive }) =>
              `flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-500/50 shadow-sm shadow-cyan-500/20'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`
            }
          >
            <span>🧪</span> Ingénierie de Flotte
          </NavLink>
        </div>

        <button
          onClick={resetGame}
          className="text-xs text-slate-500 hover:text-red-400 px-2 py-1 rounded transition-colors"
          title="Réinitialiser la démo"
        >
          🔄 Reset
        </button>
      </nav>
    </header>
  );
}
