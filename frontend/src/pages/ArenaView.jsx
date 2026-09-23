import React, { useState } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';
import { CHASSIS_DATABASE } from '../game/rosterData.js';
import { simulateBattle } from '../game/battleEngine.js';
import { useNavigate } from 'react-router-dom';

const OPPONENTS = [
  {
    id: 'opp_1',
    name: 'Commandant_Viper',
    server: 'S-104',
    rating: 1720,
    rank: 18,
    avatar: '🏎️⚡',
    power: 128500,
    team: [
      { ...CHASSIS_DATABASE[1], level: 200, stars: 10, uniqueId: 'opp_1_1' },
      { ...CHASSIS_DATABASE[0], level: 180, stars: 9, uniqueId: 'opp_1_2' },
      { ...CHASSIS_DATABASE[2], level: 190, stars: 9, uniqueId: 'opp_1_3' },
      { ...CHASSIS_DATABASE[4], level: 180, stars: 9, uniqueId: 'opp_1_4' },
      { ...CHASSIS_DATABASE[8], level: 190, stars: 9, uniqueId: 'opp_1_5' },
      { ...CHASSIS_DATABASE[11], level: 190, stars: 9, uniqueId: 'opp_1_6' }
    ]
  },
  {
    id: 'opp_2',
    name: 'Général_Krupp',
    server: 'S-104',
    rating: 1890,
    rank: 8,
    avatar: '🚜🛡️',
    power: 165000,
    team: [
      { ...CHASSIS_DATABASE[3], level: 240, stars: 11, uniqueId: 'opp_2_1' },
      { ...CHASSIS_DATABASE[6], level: 240, stars: 11, uniqueId: 'opp_2_2' },
      { ...CHASSIS_DATABASE[12], level: 250, stars: 11, uniqueId: 'opp_2_3' },
      { ...CHASSIS_DATABASE[13], level: 250, stars: 11, uniqueId: 'opp_2_4' },
      { ...CHASSIS_DATABASE[15], level: 250, stars: 11, uniqueId: 'opp_2_5' },
      { ...CHASSIS_DATABASE[16], level: 250, stars: 11, uniqueId: 'opp_2_6' }
    ]
  },
  {
    id: 'opp_3',
    name: 'Aegis_Champion_01',
    server: 'S-101 (Inter-Serveur)',
    rating: 2150,
    rank: 1,
    avatar: '🛸👑',
    power: 245000,
    team: [
      { ...CHASSIS_DATABASE[17], level: 300, stars: 15, uniqueId: 'opp_3_1' },
      { ...CHASSIS_DATABASE[13], level: 300, stars: 15, uniqueId: 'opp_3_2' },
      { ...CHASSIS_DATABASE[12], level: 300, stars: 15, uniqueId: 'opp_3_3' },
      { ...CHASSIS_DATABASE[14], level: 300, stars: 15, uniqueId: 'opp_3_4' },
      { ...CHASSIS_DATABASE[15], level: 300, stars: 15, uniqueId: 'opp_3_5' },
      { ...CHASSIS_DATABASE[16], level: 300, stars: 15, uniqueId: 'opp_3_6' }
    ]
  }
];

export default function ArenaView() {
  const { state, getActiveTeam } = useGameState();
  const { arena } = state;
  const navigate = useNavigate();

  const [duelResult, setDuelResult] = useState(null);

  const handleFight = (opponent) => {
    const playerTeam = getActiveTeam();
    const result = simulateBattle(playerTeam, opponent.team, state.guildTech, null);
    setDuelResult({ opponent, result });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête Arène */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span>🏆</span> Arène de Duel & Bancs d'Essai PvP
          </h1>
          <p className="text-sm text-slate-400">
            Défiez les hangars des commandants rivaux pour grimper dans la hiérarchie du secteur.
          </p>
        </div>

        {/* Stats Arène */}
        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Rang Actuel : </span>
            <span className="text-yellow-400 font-bold">#{arena.rank}</span>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Score ELO : </span>
            <span className="text-cyan-400 font-bold">{arena.rating} PTS</span>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Pass de Duel : </span>
            <span className="text-purple-400 font-bold">{arena.tickets}</span>
          </div>
        </div>
      </div>

      {/* Liste des Défis */}
      <div className="scifi-panel p-6 space-y-4">
        <h3 className="font-extrabold text-base text-slate-200 font-mono flex items-center gap-2 border-b border-slate-800 pb-3">
          <span>⚔️</span> COMMANDANTS RIVAUX DISPONIBLES
        </h3>

        <div className="space-y-3">
          {OPPONENTS.map(opp => (
            <div
              key={opp.id}
              className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/50 transition-all flex flex-wrap items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="text-4xl p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {opp.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-sm text-slate-100">{opp.name}</h4>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">{opp.server}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-1">
                    <span>Rang : <span className="text-yellow-400 font-bold">#{opp.rank}</span></span>
                    <span>•</span>
                    <span>Score : <span className="text-cyan-400">{opp.rating}</span></span>
                    <span>•</span>
                    <span>Puissance : <span className="text-orange-400 font-bold">{opp.power.toLocaleString()}</span></span>
                  </div>
                </div>
              </div>

              {/* Composition de l'adversaire (Mini icônes) */}
              <div className="flex items-center gap-1.5">
                {opp.team.map((u, idx) => (
                  <div key={idx} className="p-1.5 bg-slate-900 border border-slate-800 rounded-lg text-sm" title={u.name}>
                    {u.avatar}
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleFight(opp)}
                className="btn-scifi py-2.5 px-6 font-bold text-xs"
              >
                ⚔️ Lancer Duel
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Résultat du Duel */}
      {duelResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="scifi-panel-glow p-6 max-w-lg w-full space-y-5 animate-in zoom-in-95">
            <div className="text-center space-y-2 border-b border-slate-800 pb-4">
              <div className="text-5xl">
                {duelResult.result.isVictory ? '🏆' : '💀'}
              </div>
              <h2 className={`text-2xl font-extrabold ${duelResult.result.isVictory ? 'text-cyan-400' : 'text-red-400'}`}>
                {duelResult.result.isVictory ? 'DUEL REMPORTÉ !' : 'DÉFAITE DU CONVOI'}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Adversaire : {duelResult.opponent.name} • Résolu en {duelResult.result.totalRounds} round(s)
              </p>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Gain ELO :</span>
                <span className={duelResult.result.isVictory ? 'text-emerald-400 font-bold' : 'text-red-400 font-bold'}>
                  {duelResult.result.isVictory ? '+32 PTS' : '-18 PTS'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Prime de Victoire :</span>
                <span className="text-cyan-400 font-bold">{duelResult.result.isVictory ? '+250 Gemmes' : '+50 Gemmes'}</span>
              </div>
            </div>

            <div className="flex justify-between pt-2">
              <button
                onClick={() => navigate('/battle')}
                className="text-xs text-cyan-400 hover:underline font-mono"
              >
                Inspecter dans le Simulateur 6v6 ➔
              </button>
              <button
                onClick={() => setDuelResult(null)}
                className="btn-scifi px-6 py-2"
              >
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
