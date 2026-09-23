import React, { useState } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';
import { FACTIONS, ARCHETYPES } from '../game/rosterData.js';
import ChassisCard from '../components/ChassisCard.jsx';
import { computeChassisStats } from '../game/battleEngine.js';

export default function Hangar() {
  const { state, levelUpChassis, starUpChassis, autoEquipChassis } = useGameState();
  const { userRoster, currencies } = state;

  const [selectedFaction, setSelectedFaction] = useState('ALL');
  const [selectedArchetype, setSelectedArchetype] = useState('ALL');
  const [selectedChassisId, setSelectedChassisId] = useState(userRoster[0]?.uniqueId || null);

  const filteredRoster = userRoster.filter(c => {
    if (!c.unlocked) return false;
    if (selectedFaction !== 'ALL' && c.faction !== selectedFaction) return false;
    if (selectedArchetype !== 'ALL' && c.archetype !== selectedArchetype) return false;
    return true;
  });

  const selectedChassis = userRoster.find(c => c.uniqueId === selectedChassisId) || filteredRoster[0] || null;
  const computedStats = selectedChassis ? computeChassisStats(selectedChassis) : null;
  const faction = selectedChassis ? FACTIONS[selectedChassis.faction] : null;
  const archetype = selectedChassis ? ARCHETYPES[selectedChassis.archetype] : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête Hangar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span>🚗</span> Hangar & Gestion de Flotte
          </h1>
          <p className="text-sm text-slate-400">
            Calibrez, améliorez et débridez les processeurs de vos véhicules tactiques autonomes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <span className="text-slate-400">Véhicules Opérationnels :</span>
          <span className="text-cyan-400 font-bold">{userRoster.filter(c => c.unlocked).length} / {userRoster.length}</span>
        </div>
      </div>

      {/* Barre de Filtres Faction & Archétype */}
      <div className="scifi-panel p-4 flex flex-wrap items-center justify-between gap-4">
        {/* Filtres par Faction */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedFaction('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              selectedFaction === 'ALL' ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tous ({userRoster.filter(c => c.unlocked).length})
          </button>
          {Object.values(FACTIONS).map(f => {
            const count = userRoster.filter(c => c.unlocked && c.faction === f.id).length;
            const isSelected = selectedFaction === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setSelectedFaction(f.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800 text-white border-2'
                    : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                }`}
                style={{ borderColor: isSelected ? f.color : undefined }}
              >
                <span>{f.icon}</span>
                <span>{f.shortName}</span>
                <span className="text-[10px] opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Filtres par Archétype */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setSelectedArchetype('ALL')}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
              selectedArchetype === 'ALL' ? 'bg-slate-700 text-white' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Tous Rôles
          </button>
          {Object.values(ARCHETYPES).map(a => (
            <button
              key={a.id}
              onClick={() => setSelectedArchetype(a.id)}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1 ${
                selectedArchetype === a.id ? 'bg-slate-700 text-white border border-cyan-500/50' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{a.icon}</span>
              <span>{a.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Grille principale : Liste des Châssis (Gauche) + Fiche Détail (Droite) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Grille de Châssis (7 colonnes) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[750px] overflow-y-auto pr-1">
          {filteredRoster.map(chassis => (
            <ChassisCard
              key={chassis.uniqueId}
              chassis={chassis}
              isSelected={selectedChassis?.uniqueId === chassis.uniqueId}
              onClick={() => setSelectedChassisId(chassis.uniqueId)}
            />
          ))}
          {filteredRoster.length === 0 && (
            <div className="col-span-2 text-center py-12 text-slate-500 font-mono">
              Aucun véhicule trouvé pour ces critères de filtrage.
            </div>
          )}
        </div>

        {/* Fiche Détail & Atelier d'Amélioration (5 colonnes) */}
        {selectedChassis && computedStats && (
          <div className="lg:col-span-5 scifi-panel-glow p-6 space-y-6 sticky top-20">
            {/* Titre & Identité */}
            <div className="flex items-start justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="text-5xl p-3 bg-slate-950 border border-slate-800 rounded-2xl shadow-inner">
                  {selectedChassis.avatar}
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-100">{selectedChassis.name}</h2>
                  <p className="text-xs text-slate-400">{selectedChassis.title}</p>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded bg-slate-950 border ${faction.borderColor} ${faction.textColor}`}>
                      {faction.icon} {faction.name}
                    </span>
                    <span className="text-xs bg-slate-950 px-2 py-0.5 rounded border border-slate-800 text-slate-300 font-mono">
                      {archetype.icon} {archetype.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Étoiles */}
              <div className="text-right">
                <div className="text-sm">
                  {selectedChassis.stars > 10 ? (
                    <span className="text-pink-400 font-bold flex items-center justify-end gap-1">
                      {'🌸'.repeat(selectedChassis.stars - 10)}
                      <span className="text-xs font-mono">LB{selectedChassis.stars - 10}</span>
                    </span>
                  ) : (
                    <span className="text-yellow-400 tracking-wider">{'★'.repeat(selectedChassis.stars)}</span>
                  )}
                </div>
                <span className="text-[10px] text-slate-500 font-mono">Niveau Max : {selectedChassis.stars * 30}</span>
              </div>
            </div>

            {/* Statistiques Détaillées */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Télémétrie & Spécifications de Combat
              </h4>
              <div className="grid grid-cols-2 gap-2 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs font-mono">
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Intégrité HP :</span>
                  <span className="text-emerald-400 font-bold">{computedStats.stats.maxHp.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Puissance ATK :</span>
                  <span className="text-red-400 font-bold">{computedStats.stats.atk.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Blindage DEF :</span>
                  <span className="text-blue-400 font-bold">{computedStats.stats.armor.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Vitesse CPU :</span>
                  <span className="text-cyan-400 font-bold">{computedStats.stats.speed}</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Taux Critique :</span>
                  <span className="text-yellow-400 font-bold">{(computedStats.stats.critRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Dégâts Crit :</span>
                  <span className="text-yellow-300 font-bold">{(computedStats.stats.critDmg * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Déflexion (Block) :</span>
                  <span className="text-purple-400 font-bold">{(computedStats.stats.block * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between py-0.5">
                  <span className="text-slate-400">Atténuation (DR) :</span>
                  <span className="text-indigo-400 font-bold">{(computedStats.stats.damageReduction * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>

            {/* Actions d'Amélioration (Level Up & Star-Up) */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                  Atelier de Maintenance
                </span>
                <button
                  onClick={() => autoEquipChassis(selectedChassis.uniqueId)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono flex items-center gap-1"
                >
                  ⚡ Équiper Meilleur Set
                </button>
              </div>

              {/* Boutons de Montée en Niveau */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => levelUpChassis(selectedChassis.uniqueId, 1)}
                  className="btn-scifi text-xs py-2 text-center"
                >
                  +1 Niveau
                </button>
                <button
                  onClick={() => levelUpChassis(selectedChassis.uniqueId, 10)}
                  className="btn-scifi text-xs py-2 text-center"
                >
                  +10 Niveaux
                </button>
                <button
                  onClick={() => levelUpChassis(selectedChassis.uniqueId, 50)}
                  className="btn-scifi-orange text-xs py-2 text-center"
                >
                  Niveau Max
                </button>
              </div>

              {/* Ascension d'Étoiles (Star-Up / Overclocking) */}
              <div className="bg-slate-950/90 p-3 rounded-xl border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-200">
                    {selectedChassis.stars >= 10 ? 'Overclocking Quantique (LB)' : 'Montée d\'Étoile (Star-Up)'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {selectedChassis.stars >= 15 ? 'Évolution Maximale Atteinte' : `Passe à ${selectedChassis.stars + 1}★ (Multiplicateur +25%)`}
                  </div>
                </div>

                <button
                  onClick={() => starUpChassis(selectedChassis.uniqueId)}
                  disabled={selectedChassis.stars >= 15}
                  className="btn-scifi-purple text-xs px-3 py-1.5"
                >
                  ⭐ Évoluer
                </button>
              </div>
            </div>

            {/* Aptitude Majeure & Passifs */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                Protocoles d'Armement
              </h4>

              {/* Aptitude Majeure (Ultime) */}
              <div className="bg-cyan-950/30 border border-cyan-500/40 p-3 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5">
                    <span>🔥</span> {selectedChassis.activeSkill.name}
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                    100 Énergie
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedChassis.activeSkill.description}
                </p>
              </div>

              {/* Passifs */}
              <div className="space-y-1.5 text-xs text-slate-400">
                {selectedChassis.passives.map((p, idx) => (
                  <div key={idx} className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/80">
                    <span className="font-bold text-slate-200 text-xs mr-1">⚙️ {p.name} :</span>
                    <span className="text-[11px] text-slate-400">{p.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
