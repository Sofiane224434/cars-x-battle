import React, { useState, useEffect, useRef } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';
import { CHASSIS_DATABASE, FACTIONS } from '../game/rosterData.js';
import { calculateFleetAura, computeChassisStats, simulateBattle } from '../game/battleEngine.js';
import ChassisCard from '../components/ChassisCard.jsx';

// Ensembles d'ennemis de test pré-configurés
const ENEMY_PRESETS = [
  {
    id: 'preset_ironforge_heavy',
    name: 'Bataillon Blindé IronForge',
    description: 'Une ligne de front ultra blindée soutenue par de l\'artillerie lourde.',
    auraName: 'Suprématie IronForge (6x)',
    units: [
      { ...CHASSIS_DATABASE[3], level: 160, stars: 9, uniqueId: 'en_1' }, // IronTitan
      { ...CHASSIS_DATABASE[4], level: 160, stars: 9, uniqueId: 'en_2' }, // Vulcan-X
      { ...CHASSIS_DATABASE[5], level: 160, stars: 9, uniqueId: 'en_3' }, // SiegeHowitzer
      { ...CHASSIS_DATABASE[3], level: 150, stars: 8, uniqueId: 'en_4' },
      { ...CHASSIS_DATABASE[4], level: 150, stars: 8, uniqueId: 'en_5' },
      { ...CHASSIS_DATABASE[5], level: 150, stars: 8, uniqueId: 'en_6' }
    ]
  },
  {
    id: 'preset_rainbow_elite',
    name: 'Coalition Inter-Constructeurs (Rainbow)',
    description: '1 châssis d\'élite issu de chaque constructeur, profitant de l\'aura Spectre Universel.',
    auraName: 'Spectre Universel (Rainbow)',
    units: [
      { ...CHASSIS_DATABASE[0], level: 200, stars: 10, uniqueId: 'en_r1' }, // CK-9000
      { ...CHASSIS_DATABASE[6], level: 200, stars: 10, uniqueId: 'en_r2' }, // BioBehemoth
      { ...CHASSIS_DATABASE[12], level: 220, stars: 11, uniqueId: 'en_r3' }, // VoidReaper
      { ...CHASSIS_DATABASE[15], level: 220, stars: 11, uniqueId: 'en_r4' }, // Chronos Prime
      { ...CHASSIS_DATABASE[4], level: 200, stars: 10, uniqueId: 'en_r5' }, // Vulcan-X
      { ...CHASSIS_DATABASE[9], level: 200, stars: 10, uniqueId: 'en_r6' }  // SolarAegis
    ]
  },
  {
    id: 'preset_cosmic_boss',
    name: 'Escadre Cosmique DarkMatter & StellarAegis',
    description: 'Composition d\'élite endgame ultra agressive combinant antimatière et boucliers stellaires.',
    auraName: 'Convergence Cosmique (3+3)',
    units: [
      { ...CHASSIS_DATABASE[13], level: 260, stars: 12, uniqueId: 'en_c1' }, // Abyssal Titan
      { ...CHASSIS_DATABASE[17], level: 260, stars: 12, uniqueId: 'en_c2' }, // Paladin Bastion
      { ...CHASSIS_DATABASE[12], level: 280, stars: 13, uniqueId: 'en_c3' }, // VoidReaper
      { ...CHASSIS_DATABASE[14], level: 280, stars: 13, uniqueId: 'en_c4' }, // Orbital Nullifier
      { ...CHASSIS_DATABASE[15], level: 280, stars: 13, uniqueId: 'en_c5' }, // Chronos Prime
      { ...CHASSIS_DATABASE[16], level: 280, stars: 13, uniqueId: 'en_c6' }  // Valkyrie Spear
    ]
  }
];

export default function BattleView() {
  const { state, setTeamSlot, getActiveTeam } = useGameState();
  const { userRoster, guildTech } = state;

  const [selectedEnemyPreset, setSelectedEnemyPreset] = useState(ENEMY_PRESETS[1]);
  const [isSlotPickerOpen, setIsSlotPickerOpen] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(0);

  // État de la simulation active
  const [battleResult, setBattleResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1); // 1x, 2x, 4x, 100x
  const [liveFighters, setLiveFighters] = useState({ player: [], enemy: [] });
  const [liveLogs, setLiveLogs] = useState([]);
  const [showResultModal, setShowResultModal] = useState(false);

  const playerTeam = getActiveTeam();
  const playerAura = calculateFleetAura(playerTeam);

  // Calcul de la Puissance Totale de Flotte
  const totalFleetPower = playerTeam.reduce((acc, unit) => {
    if (!unit) return acc;
    const computed = computeChassisStats(unit, playerAura, guildTech);
    return acc + Math.round(computed.stats.maxHp / 5 + computed.stats.atk + computed.stats.armor * 2);
  }, 0);

  // Lancement du combat
  const handleStartBattle = (skipAnimation = false) => {
    const rawEnemyTeam = selectedEnemyPreset.units;
    const result = simulateBattle(playerTeam, rawEnemyTeam, guildTech, null);

    setBattleResult(result);
    setShowResultModal(false);

    if (skipAnimation) {
      // Fin immédiate
      setIsSimulating(false);
      setShowResultModal(true);
      return;
    }

    // Initialisation du rendu animé
    setIsSimulating(true);
    setCurrentRound(1);
    setCurrentEventIndex(0);
    setLiveLogs([]);

    // Cloner l'état initial des combattants pour l'affichage visuel
    const initialPlayers = playerTeam.map((u, idx) => {
      if (!u) return null;
      const computed = computeChassisStats(u, playerAura, guildTech);
      return {
        id: u.uniqueId,
        name: u.name,
        avatar: u.avatar,
        faction: u.faction,
        currentHp: computed.stats.maxHp,
        maxHp: computed.stats.maxHp,
        energy: computed.stats.energy || 50,
        isDead: false,
        shield: 0
      };
    });

    const initialEnemies = rawEnemyTeam.map((u, idx) => {
      if (!u) return null;
      const computed = computeChassisStats(u);
      return {
        id: u.uniqueId,
        name: u.name,
        avatar: u.avatar,
        faction: u.faction,
        currentHp: computed.stats.maxHp,
        maxHp: computed.stats.maxHp,
        energy: computed.stats.energy || 50,
        isDead: false,
        shield: 0
      };
    });

    setLiveFighters({ player: initialPlayers, enemy: initialEnemies });
  };

  // Moteur d'animation du combat
  useEffect(() => {
    if (!isSimulating || !battleResult) return;

    const roundData = battleResult.roundsHistory[currentRound - 1];
    if (!roundData) {
      setIsSimulating(false);
      setShowResultModal(true);
      return;
    }

    const events = roundData.events;
    if (currentEventIndex >= events.length) {
      // Passage au round suivant
      if (currentRound < battleResult.roundsHistory.length) {
        const timer = setTimeout(() => {
          setCurrentRound(prev => prev + 1);
          setCurrentEventIndex(0);
        }, 600 / playbackSpeed);
        return () => clearTimeout(timer);
      } else {
        // Fin de combat
        setIsSimulating(false);
        setShowResultModal(true);
        return;
      }
    }

    const currentEvt = events[currentEventIndex];
    const timer = setTimeout(() => {
      // Mettre à jour l'état visuel selon l'événement
      setLiveFighters(prev => {
        const next = { player: [...prev.player], enemy: [...prev.enemy] };

        if (currentEvt.type === 'DAMAGE' || currentEvt.type === 'DOT_DAMAGE') {
          const teamList = currentEvt.targetTeam === 'player' ? next.player : next.enemy;
          const target = teamList.find(u => u && (u.id === currentEvt.targetId || u.uniqueId === currentEvt.targetId));
          if (target) {
            target.currentHp = currentEvt.currentHp;
            if (currentEvt.targetEnergy !== undefined) target.energy = currentEvt.targetEnergy;
          }
        } else if (currentEvt.type === 'HEAL') {
          const teamList = currentEvt.targetTeam === 'player' ? next.player : next.enemy;
          const target = teamList.find(u => u && (u.id === currentEvt.targetId || u.uniqueId === currentEvt.targetId));
          if (target) {
            target.currentHp = currentEvt.currentHp;
          }
        } else if (currentEvt.type === 'DEATH') {
          const teamList = currentEvt.targetTeam === 'player' ? next.player : next.enemy;
          const target = teamList.find(u => u && (u.id === currentEvt.targetId || u.uniqueId === currentEvt.targetId));
          if (target) {
            target.isDead = true;
            target.currentHp = 0;
          }
        } else if (currentEvt.type === 'ULTIMATE_CAST') {
          const teamList = currentEvt.actorTeam === 'player' ? next.player : next.enemy;
          const actor = teamList.find(u => u && (u.id === currentEvt.actorId || u.uniqueId === currentEvt.actorId));
          if (actor) {
            actor.energy = 0;
          }
        } else if (currentEvt.type === 'ENERGY_GAIN') {
          const teamList = currentEvt.actorTeam === 'player' ? next.player : next.enemy;
          const actor = teamList.find(u => u && (u.id === currentEvt.actorId || u.uniqueId === currentEvt.actorId));
          if (actor) {
            actor.energy = currentEvt.energy;
          }
        }

        return next;
      });

      if (currentEvt.text) {
        setLiveLogs(prev => [currentEvt.text, ...prev.slice(0, 40)]);
      }

      setCurrentEventIndex(prev => prev + 1);
    }, 450 / playbackSpeed);

    return () => clearTimeout(timer);
  }, [isSimulating, currentRound, currentEventIndex, battleResult, playbackSpeed]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête Simulateur */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span>⚔️</span> Simulateur de Combat Tactique 6v6
          </h1>
          <p className="text-sm text-slate-400">
            Déployez votre formation de combat, exploitez les auras de constructeurs et simulez des affrontements asynchrones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleStartBattle(false)}
            disabled={isSimulating}
            className="btn-scifi px-6 py-2.5 text-base font-extrabold shadow-lg shadow-cyan-500/30 flex items-center gap-2"
          >
            <span>🚀</span> Démarrer Simulation
          </button>
          <button
            onClick={() => handleStartBattle(true)}
            className="btn-scifi-orange text-xs py-2.5 px-3 font-mono"
            title="Calculer immédiatement le résultat sans animation"
          >
            ⚡ Résultat Direct
          </button>
        </div>
      </div>

      {/* Barre de Statut & Aura de Flotte */}
      <div className="scifi-panel p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400 font-bold text-xs font-mono">
            🛡️ AURA : <span className="text-white">{playerAura.name}</span>
          </div>
          <div className="text-xs text-slate-400 font-mono">
            Bonus : <span className="text-emerald-400 font-bold">+{(playerAura.hpBonus * 100).toFixed(0)}% HP</span>, <span className="text-red-400 font-bold">+{(playerAura.atkBonus * 100).toFixed(0)}% ATK</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400">Puissance de Flotte : </span>
            <span className="text-yellow-400 font-extrabold text-sm">{totalFleetPower.toLocaleString()}</span>
          </div>

          {/* Sélecteur de Cible Ennemie */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Adversaire :</span>
            <select
              value={selectedEnemyPreset.id}
              onChange={(e) => setSelectedEnemyPreset(ENEMY_PRESETS.find(p => p.id === e.target.value))}
              className="bg-slate-950 text-slate-200 border border-slate-700 rounded-lg px-2.5 py-1 text-xs font-mono focus:outline-none focus:border-cyan-500"
            >
              {ENEMY_PRESETS.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Champ de Bataille / Grilles 6v6 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Grille Joueur (Gauche - 6 Slots) */}
        <div className="lg:col-span-6 scifi-panel p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-cyan-400 font-mono flex items-center gap-2">
              <span>🔵</span> FLOTTE ALLIÉE (VOTRE ESCOUADE)
            </h3>
            <span className="text-xs text-slate-400 font-mono">Cliquez pour modifier</span>
          </div>

          {/* Formation : Ligne Avant (2 slots) */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Ligne Avant (Frontline - Aggro Principale)
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[0, 1].map(slotIdx => {
                const chassis = playerTeam[slotIdx];
                return (
                  <div key={slotIdx} className="relative">
                    <div className="absolute top-1 left-2 z-10 text-[9px] font-bold font-mono bg-slate-950/80 px-1.5 py-0.5 rounded text-cyan-400 border border-slate-800">
                      SLOT F{slotIdx + 1}
                    </div>
                    <ChassisCard
                      chassis={chassis}
                      compact
                      onClick={() => {
                        setSelectedSlotIndex(slotIdx);
                        setIsSlotPickerOpen(true);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formation : Ligne Arrière (4 slots) */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Ligne Arrière (Backline - Artillerie & Support)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[2, 3, 4, 5].map(slotIdx => {
                const chassis = playerTeam[slotIdx];
                return (
                  <div key={slotIdx} className="relative">
                    <div className="absolute top-1 left-2 z-10 text-[9px] font-bold font-mono bg-slate-950/80 px-1.5 py-0.5 rounded text-slate-400 border border-slate-800">
                      SLOT B{slotIdx - 1}
                    </div>
                    <ChassisCard
                      chassis={chassis}
                      compact
                      onClick={() => {
                        setSelectedSlotIndex(slotIdx);
                        setIsSlotPickerOpen(true);
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Grille Ennemie (Droite - 6 Slots) */}
        <div className="lg:col-span-6 scifi-panel p-5 space-y-4 border-red-500/30">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-sm text-red-400 font-mono flex items-center gap-2">
              <span>🔴</span> FLOTTE ADVERSE [{selectedEnemyPreset.name}]
            </h3>
            <span className="text-xs text-red-400 font-mono">{selectedEnemyPreset.auraName}</span>
          </div>

          {/* Ennemis Ligne Avant */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Ligne Avant Ennemie
            </span>
            <div className="grid grid-cols-2 gap-3">
              {selectedEnemyPreset.units.slice(0, 2).map((chassis, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute top-1 left-2 z-10 text-[9px] font-bold font-mono bg-slate-950/80 px-1.5 py-0.5 rounded text-red-400 border border-slate-800">
                    SLOT EF{idx + 1}
                  </div>
                  <ChassisCard chassis={chassis} compact />
                </div>
              ))}
            </div>
          </div>

          {/* Ennemis Ligne Arrière */}
          <div className="space-y-2 pt-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              Ligne Arrière Ennemie
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedEnemyPreset.units.slice(2, 6).map((chassis, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute top-1 left-2 z-10 text-[9px] font-bold font-mono bg-slate-950/80 px-1.5 py-0.5 rounded text-slate-500 border border-slate-800">
                    SLOT EB{idx + 1}
                  </div>
                  <ChassisCard chassis={chassis} compact />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Zone de Visualisation de Combat en Direct & Journal de Combat */}
      {isSimulating && (
        <div className="scifi-panel-glow p-6 space-y-4 animate-in fade-in">
          {/* Barre de contrôle du lecteur de combat */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-cyan-950 border border-cyan-800 text-cyan-300">
                ROUND ACTUEL : {currentRound} / 15
              </span>
              <span className="text-xs text-slate-400 font-mono animate-pulse">
                ⚡ Simulation en direct...
              </span>
            </div>

            {/* Vitesse de lecture */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-mono">Vitesse :</span>
              {[1, 2, 4].map(spd => (
                <button
                  key={spd}
                  onClick={() => setPlaybackSpeed(spd)}
                  className={`px-2 py-1 rounded text-xs font-mono font-bold transition-all ${
                    playbackSpeed === spd ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {spd}x
                </button>
              ))}
              <button
                onClick={() => {
                  setIsSimulating(false);
                  setShowResultModal(true);
                }}
                className="btn-scifi-orange text-xs py-1 px-3 ml-2"
              >
                Passer (Skip)
              </button>
            </div>
          </div>

          {/* Arène Visuelle en Direct 2D avec Décor Wasteland Holographique */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-black min-h-[360px] flex flex-col justify-between p-4">
            {/* Décor 2D Arène */}
            <img
              src="/assets/images/battle_wasteland_bg.jpg"
              alt="Arène de Combat"
              className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-80"
            />
            <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

            {/* Combattants sur le Champ de Bataille (Joueurs Gauche vs Ennemis Droite) */}
            <div className="relative z-10 grid grid-cols-2 gap-8 items-center h-full my-auto">
              {/* Équipe Joueur (Gauche) */}
              <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                {liveFighters.player.filter(Boolean).map(u => (
                  <div key={u.id} className={`p-2 rounded-xl backdrop-blur-md bg-slate-950/85 border-2 ${u.isDead ? 'opacity-20 border-slate-800' : 'border-cyan-500/80 shadow-lg shadow-cyan-500/20'} transition-all`}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-xl">{u.avatar}</span>
                      <span className="font-extrabold text-[10px] font-mono text-cyan-300 truncate max-w-[80px]">{u.name}</span>
                    </div>
                    {/* Barre de PV */}
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700 mb-1">
                      <div
                        className="h-full bg-linear-to-r from-emerald-500 to-green-400 transition-all duration-300"
                        style={{ width: `${Math.max(0, (u.currentHp / u.maxHp) * 100)}%` }}
                      />
                    </div>
                    {/* Jauge d'Énergie */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-linear-to-r from-yellow-400 to-amber-300 transition-all duration-300"
                        style={{ width: `${Math.min(100, (u.energy / 100) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Équipe Ennemie (Droite) */}
              <div className="grid grid-cols-2 gap-2.5 max-w-sm ml-auto">
                {liveFighters.enemy.filter(Boolean).map(u => (
                  <div key={u.id} className={`p-2 rounded-xl backdrop-blur-md bg-slate-950/85 border-2 ${u.isDead ? 'opacity-20 border-slate-800' : 'border-red-500/80 shadow-lg shadow-red-500/20'} transition-all`}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-extrabold text-[10px] font-mono text-red-300 truncate max-w-[80px]">{u.name}</span>
                      <span className="text-xl">{u.avatar}</span>
                    </div>
                    {/* Barre de PV */}
                    <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700 mb-1">
                      <div
                        className="h-full bg-linear-to-r from-red-500 to-rose-400 transition-all duration-300"
                        style={{ width: `${Math.max(0, (u.currentHp / u.maxHp) * 100)}%` }}
                      />
                    </div>
                    {/* Jauge d'Énergie */}
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                      <div
                        className="h-full bg-linear-to-r from-yellow-400 to-amber-300 transition-all duration-300"
                        style={{ width: `${Math.min(100, (u.energy / 100) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Flux de logs en direct */}
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 h-36 overflow-y-auto font-mono text-xs space-y-1">
            {liveLogs.map((log, idx) => (
              <div key={idx} className="text-slate-300 py-0.5 border-b border-slate-900 last:border-0">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal de Résultat & Statistiques de Fin de Combat */}
      {showResultModal && battleResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="scifi-panel-glow p-6 max-w-2xl w-full space-y-6 animate-in zoom-in-95">
            {/* En-tête Résultat */}
            <div className="text-center space-y-2 border-b border-slate-800 pb-4">
              <div className="text-5xl mb-2">
                {battleResult.isVictory ? '🏆' : '💀'}
              </div>
              <h2 className={`text-3xl font-extrabold tracking-wider ${battleResult.isVictory ? 'text-cyan-400' : 'text-red-400'}`}>
                {battleResult.isVictory ? 'VICTOIRE TACTIQUE !' : 'ÉCHEC DE MISSION'}
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Combat résolu en {battleResult.totalRounds} round(s) de simulation tactique.
              </p>
            </div>

            {/* Statistiques Détaillées par Châssis */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 font-mono">
                Bilan de Performance de la Flotte
              </h4>
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {battleResult.playerStatsSummary.map(u => (
                  <div key={u.id} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{u.avatar}</span>
                      <div>
                        <div className="font-bold text-slate-200">{u.name}</div>
                        <div className="text-[10px] text-slate-500">{'★'.repeat(u.stars)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <div className="text-red-400 font-bold">{u.damageDealt.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">Dégâts infligés</div>
                      </div>
                      <div>
                        <div className="text-blue-400 font-bold">{u.damageTaken.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">Dégâts subis</div>
                      </div>
                      <div>
                        <div className="text-emerald-400 font-bold">{u.healingDone.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">Réparations</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowResultModal(false)}
                className="btn-scifi px-6 py-2"
              >
                Fermer le Rapport
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Sélection d'Unité pour un Slot */}
      {isSlotPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="scifi-panel p-6 max-w-3xl w-full space-y-4 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-cyan-400 font-mono">
                Choisir le Châssis pour l'Emplacement {selectedSlotIndex < 2 ? `F${selectedSlotIndex + 1} (Ligne Avant)` : `B${selectedSlotIndex - 1} (Ligne Arrière)`}
              </h3>
              <button
                onClick={() => setIsSlotPickerOpen(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 overflow-y-auto p-1 flex-1">
              {userRoster.filter(c => c.unlocked).map(chassis => {
                const isAssigned = state.activeTeamIds.includes(chassis.uniqueId);
                return (
                  <div
                    key={chassis.uniqueId}
                    onClick={() => {
                      setTeamSlot(selectedSlotIndex, chassis.uniqueId);
                      setIsSlotPickerOpen(false);
                    }}
                    className="relative cursor-pointer"
                  >
                    <ChassisCard chassis={chassis} compact isSelected={state.activeTeamIds[selectedSlotIndex] === chassis.uniqueId} />
                    {isAssigned && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold font-mono bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">
                        Déjà Assigné
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
