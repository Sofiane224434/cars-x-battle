import React from 'react';
import { FACTIONS, ARCHETYPES } from '../game/rosterData.js';
import { computeChassisStats } from '../game/battleEngine.js';

export default function ChassisCard({ chassis, isSelected, onClick, showEquip = true, compact = false }) {
  if (!chassis) {
    return (
      <div 
        onClick={onClick}
        className="scifi-panel border-dashed border-slate-700 h-40 flex flex-col items-center justify-center cursor-pointer hover:border-cyan-500 hover:bg-slate-900/50 transition-all p-3 text-center"
      >
        <span className="text-3xl text-slate-600 mb-1">➕</span>
        <span className="text-xs font-mono text-slate-400">Emplacement Libre</span>
      </div>
    );
  }

  const faction = FACTIONS[chassis.faction] || FACTIONS.CYBERKINETIC;
  const archetype = ARCHETYPES[chassis.archetype] || ARCHETYPES.TANK;
  const computed = computeChassisStats(chassis);
  const stars = chassis.stars || 5;
  const level = chassis.level || 1;

  // Calcul du rendu des étoiles (Étoiles jaunes standards jusqu'à 10, puis étoiles roses LB1 à LB5)
  const isPinkStars = stars > 10;
  const pinkStarsCount = stars - 10;

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`relative scifi-panel p-2.5 cursor-pointer transition-all hover:scale-102 ${
          isSelected ? 'border-cyan-400 bg-cyan-950/40 shadow-md shadow-cyan-500/20' : 'hover:border-slate-500'
        }`}
      >
        <div className="flex items-center gap-2">
          <div className="text-2xl p-1.5 rounded-lg bg-slate-950 border border-slate-800">
            {chassis.avatar}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold truncate text-slate-200">{chassis.name}</span>
              <span className="font-mono text-cyan-400">Nv.{level}</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className={`text-[10px] font-bold ${faction.textColor}`}>{faction.icon} {faction.shortName}</span>
              <span className="text-slate-600">•</span>
              <span className="text-[10px] text-slate-400">{archetype.name}</span>
            </div>
            {/* Étoiles */}
            <div className="flex items-center gap-0.5 text-[10px] mt-0.5">
              {isPinkStars ? (
                <span className="text-pink-400 font-bold flex items-center gap-0.5">
                  {'🌸'.repeat(pinkStarsCount)} <span className="text-[10px] font-mono">(LB{pinkStarsCount})</span>
                </span>
              ) : (
                <span className="text-yellow-400">{'★'.repeat(stars)}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative scifi-panel overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 hover:shadow-xl ${
        isSelected ? 'border-cyan-400 bg-cyan-950/30 shadow-lg shadow-cyan-500/30' : 'hover:border-slate-500'
      }`}
    >
      {/* Bandeau supérieur Constructeur */}
      <div className={`px-3 py-1.5 bg-linear-to-r ${faction.bgGradient} border-b border-slate-800 flex items-center justify-between`}>
        <span className={`text-xs font-bold font-mono flex items-center gap-1.5 ${faction.textColor}`}>
          <span>{faction.icon}</span> {faction.name}
        </span>
        <span className="text-xs bg-slate-950/80 px-2 py-0.5 rounded text-slate-300 font-mono border border-slate-800">
          {archetype.icon} {archetype.name}
        </span>
      </div>

      <div className="p-4">
        {/* Avatar & Identité */}
        <div className="flex items-start gap-3 mb-3">
          <div className="text-4xl p-2.5 rounded-xl bg-slate-950 border border-slate-800 shadow-inner">
            {chassis.avatar}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-extrabold text-sm text-slate-100 truncate">{chassis.name}</h3>
            <p className="text-xs text-slate-400 truncate">{chassis.title}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="px-2 py-0.5 bg-cyan-950/60 border border-cyan-800 text-cyan-300 rounded text-xs font-mono font-bold">
                Niveau {level}
              </span>
              <div className="text-xs">
                {isPinkStars ? (
                  <span className="text-pink-400 font-bold flex items-center gap-0.5">
                    {'🌸'.repeat(pinkStarsCount)} <span className="text-[10px] font-mono text-pink-300">LB{pinkStarsCount}</span>
                  </span>
                ) : (
                  <span className="text-yellow-400 tracking-wider">{'★'.repeat(stars)}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Statistiques principales */}
        <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80 mb-3">
          <div className="flex justify-between">
            <span className="text-slate-400">❤️ PV :</span>
            <span className="text-emerald-400 font-bold">{computed.stats.maxHp.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">⚔️ ATK :</span>
            <span className="text-red-400 font-bold">{computed.stats.atk.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">🛡️ DEF :</span>
            <span className="text-blue-400 font-bold">{computed.stats.armor.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">⚡ SPD :</span>
            <span className="text-cyan-400 font-bold">{computed.stats.speed}</span>
          </div>
        </div>

        {/* Équipements & Artefact */}
        {showEquip && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
            <div className="flex items-center gap-1.5" title="Modules d'Équipement (Arme, Blindage, Propulsion, Télémétrie)">
              <span className={`p-1 rounded bg-slate-950 border ${chassis.equippedGear?.weapon ? 'border-red-500/50 text-red-400' : 'border-slate-800 text-slate-600'}`}>🔫</span>
              <span className={`p-1 rounded bg-slate-950 border ${chassis.equippedGear?.armor ? 'border-blue-500/50 text-blue-400' : 'border-slate-800 text-slate-600'}`}>🛡️</span>
              <span className={`p-1 rounded bg-slate-950 border ${chassis.equippedGear?.propulsion ? 'border-cyan-500/50 text-cyan-400' : 'border-slate-800 text-slate-600'}`}>🚀</span>
              <span className={`p-1 rounded bg-slate-950 border ${chassis.equippedGear?.telemetry ? 'border-yellow-500/50 text-yellow-400' : 'border-slate-800 text-slate-600'}`}>📡</span>
            </div>

            <div className="flex items-center gap-1" title="Instrument Scientifique / Artefact">
              {chassis.equippedArtifact ? (
                <span className="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/50 text-purple-300 font-mono text-[10px]">
                  {chassis.equippedArtifact.icon} {chassis.equippedArtifact.name.slice(0, 10)}...
                </span>
              ) : (
                <span className="text-[10px] text-slate-600 font-mono">Sans Artefact</span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
