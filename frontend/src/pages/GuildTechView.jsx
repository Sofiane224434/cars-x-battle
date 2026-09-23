import React, { useState } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';
import { ARCHETYPES } from '../game/rosterData.js';

export default function GuildTechView() {
  const { state, upgradeGuildTech } = useGameState();
  const { guildTech, currencies } = state;

  const [selectedArchetype, setSelectedArchetype] = useState('TANK');

  const currentTech = guildTech[selectedArchetype] || { hpLevel: 0, atkLevel: 0, critLevel: 0, speedLevel: 0 };
  const archetypeInfo = ARCHETYPES[selectedArchetype];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête Guild Tech */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span>🧪</span> Complexe d'Ingénierie de Consortium (Guild Tech)
          </h1>
          <p className="text-sm text-slate-400">
            Recherchez des protocoles passifs permanents qui renforcent l'intégralité des véhicules de votre flotte.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Crédits Disponibles :</span>
          <span className="text-yellow-400 font-bold">{currencies.gold.toLocaleString()} 🪙</span>
        </div>
      </div>

      {/* Sélecteur d'Archétype */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Object.values(ARCHETYPES).map(arch => {
          const isSelected = selectedArchetype === arch.id;
          const tech = guildTech[arch.id] || {};
          const totalLevels = (tech.hpLevel || 0) + (tech.atkLevel || 0) + (tech.critLevel || 0) + (tech.speedLevel || 0);

          return (
            <button
              key={arch.id}
              onClick={() => setSelectedArchetype(arch.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="text-3xl mb-2">{arch.icon}</div>
              <div className="font-extrabold text-sm text-slate-100">{arch.name}</div>
              <div className="text-xs text-slate-400 font-mono mt-1">Niveau Tech : <span className="text-cyan-400 font-bold">{totalLevels}</span></div>
            </button>
          );
        })}
      </div>

      {/* Arbre de Recherche de l'Archétype Sélectionné */}
      <div className="scifi-panel p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-2 rounded-xl bg-slate-950 border border-slate-800">{archetypeInfo.icon}</span>
            <div>
              <h2 className="text-lg font-extrabold text-cyan-400">Arbre Technologique : {archetypeInfo.name}</h2>
              <p className="text-xs text-slate-400">{archetypeInfo.description}</p>
            </div>
          </div>
        </div>

        {/* 4 Paliers Technologiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Palier 1 : Intégrité Structurelle */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">❤️</span>
                <h4 className="font-extrabold text-sm text-slate-100">Intégrité de Coque (HP)</h4>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Effet : <span className="text-emerald-400 font-bold">+{(currentTech.hpLevel || 0)}% HP</span> universel
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Niveau : {currentTech.hpLevel || 0} / 50 • Coût : {((currentTech.hpLevel || 0) + 1) * 15000} 🪙
              </div>
            </div>

            <button
              onClick={() => upgradeGuildTech(selectedArchetype, 'hpLevel')}
              disabled={currencies.gold < ((currentTech.hpLevel || 0) + 1) * 15000}
              className="btn-scifi text-xs py-2 px-4"
            >
              Améliorer
            </button>
          </div>

          {/* Palier 2 : Sortie Énergétique */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚔️</span>
                <h4 className="font-extrabold text-sm text-slate-100">Sortie d'Armement (ATK)</h4>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Effet : <span className="text-red-400 font-bold">+{(currentTech.atkLevel || 0)}% ATK</span> universel
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Niveau : {currentTech.atkLevel || 0} / 50 • Coût : {((currentTech.atkLevel || 0) + 1) * 15000} 🪙
              </div>
            </div>

            <button
              onClick={() => upgradeGuildTech(selectedArchetype, 'atkLevel')}
              disabled={currencies.gold < ((currentTech.atkLevel || 0) + 1) * 15000}
              className="btn-scifi text-xs py-2 px-4"
            >
              Améliorer
            </button>
          </div>

          {/* Palier 3 : Focalisation Critique */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">🎯</span>
                <h4 className="font-extrabold text-sm text-slate-100">Focalisation Critique</h4>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Effet : <span className="text-yellow-400 font-bold">+{( (currentTech.critLevel || 0) * 0.5 ).toFixed(1)}% Taux Critique</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Niveau : {currentTech.critLevel || 0} / 30 • Coût : {((currentTech.critLevel || 0) + 1) * 20000} 🪙
              </div>
            </div>

            <button
              onClick={() => upgradeGuildTech(selectedArchetype, 'critLevel')}
              disabled={currencies.gold < ((currentTech.critLevel || 0) + 1) * 20000}
              className="btn-scifi text-xs py-2 px-4"
            >
              Améliorer
            </button>
          </div>

          {/* Palier 4 : Vitesse de Traitement */}
          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl">⚡</span>
                <h4 className="font-extrabold text-sm text-slate-100">Vitesse de Traitement CPU</h4>
              </div>
              <div className="text-xs text-slate-400 font-mono mt-1">
                Effet : <span className="text-cyan-400 font-bold">+{( (currentTech.speedLevel || 0) * 2 )} Vitesse</span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                Niveau : {currentTech.speedLevel || 0} / 30 • Coût : {((currentTech.speedLevel || 0) + 1) * 20000} 🪙
              </div>
            </div>

            <button
              onClick={() => upgradeGuildTech(selectedArchetype, 'speedLevel')}
              disabled={currencies.gold < ((currentTech.speedLevel || 0) + 1) * 20000}
              className="btn-scifi text-xs py-2 px-4"
            >
              Améliorer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
