import React, { useState } from 'react';
import { useGameState } from '../game/gameStateContext.jsx';
import { FACTIONS } from '../game/rosterData.js';
import ChassisCard from '../components/ChassisCard.jsx';

export default function GachaView() {
  const { state, pullGacha } = useGameState();
  const { currencies, gachaStats } = state;

  const [pulledCards, setPulledCards] = useState([]);
  const [isPulling, setIsPulling] = useState(false);
  const [selectedFaction, setSelectedFaction] = useState('CYBERKINETIC');
  const [activeTab, setActiveTab] = useState('ADVANCED'); // ADVANCED | FACTION | RECYCLE

  const handlePull = (count, isFaction = false) => {
    setIsPulling(true);
    setPulledCards([]);

    setTimeout(() => {
      const results = pullGacha(count, isFaction, isFaction ? selectedFaction : null);
      setPulledCards(results);
      setIsPulling(false);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* En-tête Gacha */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
            <span>🏭</span> Port Central de Rapatriement
          </h1>
          <p className="text-sm text-slate-400">
            Émettez des protocoles d'acquisition et réquisitionnez de nouveaux châssis d'élite.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Bons de Commande : </span>
            <span className="text-purple-400 font-bold">{currencies.advanceCapsules}</span>
          </div>
          <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-slate-400">Sceaux de Constructeur : </span>
            <span className="text-red-400 font-bold">{currencies.seals}</span>
          </div>
        </div>
      </div>

      {/* Onglets Port */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('ADVANCED')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'ADVANCED' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          🎟️ Protocole Industriel Avancé
        </button>
        <button
          onClick={() => setActiveTab('FACTION')}
          className={`px-4 py-2 rounded-lg text-xs font-mono font-bold transition-all ${
            activeTab === 'FACTION' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'text-slate-400 hover:text-white bg-slate-900'
          }`}
        >
          🔮 Réquisition Ciblée par Constructeur
        </button>
      </div>

      {/* Section 1 : Gacha Avancé */}
      {activeTab === 'ADVANCED' && (
        <div className="scifi-panel p-6 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h2 className="text-lg font-extrabold text-purple-300">Terminal d'Acquisition Orbital</h2>
              <p className="text-xs text-slate-400">
                Taux de base 5★ : 12.0% (Boost Bêta Démo) • Taux 4★ : 33.0% • Taux 3★ : 55.0%
              </p>
            </div>

            {/* Jauge de Pity */}
            <div className="flex items-center gap-3 text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="text-slate-400">Garantie 5★ (Pity) :</span>
              <div className="w-24 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="h-full bg-purple-500"
                  style={{ width: `${(gachaStats.pityCounter / 50) * 100}%` }}
                />
              </div>
              <span className="text-purple-400 font-bold">{gachaStats.pityCounter} / 50</span>
            </div>
          </div>

          {/* Boutons d'Action de Tirage */}
          <div className="flex flex-wrap items-center justify-center gap-6 py-6">
            <button
              onClick={() => handlePull(1, false)}
              disabled={isPulling || currencies.advanceCapsules < 1}
              className="btn-scifi py-4 px-8 text-base font-extrabold flex flex-col items-center gap-1 shadow-lg shadow-cyan-500/20"
            >
              <span>🎟️ 1 Commande</span>
              <span className="text-[10px] font-mono text-cyan-200">Coût : 1 Bon</span>
            </button>

            <button
              onClick={() => handlePull(10, false)}
              disabled={isPulling || currencies.advanceCapsules < 10}
              className="btn-scifi-purple py-4 px-10 text-base font-extrabold flex flex-col items-center gap-1 shadow-lg shadow-purple-500/30 active:scale-95"
            >
              <span>🎟️ 10 Commandes Décuplées</span>
              <span className="text-[10px] font-mono text-purple-200">Coût : 10 Bons (Bonus Alliage)</span>
            </button>
          </div>
        </div>
      )}

      {/* Section 2 : Gacha de Constructeur (Sceaux) */}
      {activeTab === 'FACTION' && (
        <div className="scifi-panel p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-extrabold text-red-400">Matrice de Réquisition Ciblée</h2>
            <p className="text-xs text-slate-400">
              Ciblez exclusivement le constructeur de votre choix pour obtenir ses châssis et plans d'ascension.
            </p>
          </div>

          {/* Sélecteur de Constructeur */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Object.values(FACTIONS).map(f => (
              <button
                key={f.id}
                onClick={() => setSelectedFaction(f.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedFaction === f.id
                    ? 'bg-slate-800 border-2 shadow-lg shadow-cyan-500/10'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-600'
                }`}
                style={{ borderColor: selectedFaction === f.id ? f.color : undefined }}
              >
                <div className="text-2xl mb-1">{f.icon}</div>
                <div className="font-extrabold text-xs text-white truncate">{f.name}</div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">{f.description}</div>
              </button>
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <button
              onClick={() => handlePull(10, true)}
              disabled={isPulling || currencies.seals < 10}
              className="btn-scifi-orange py-4 px-10 text-base font-extrabold flex flex-col items-center gap-1 shadow-lg shadow-orange-500/30"
            >
              <span>🔮 Déployer 10 Sceaux [{FACTIONS[selectedFaction].shortName}]</span>
              <span className="text-[10px] font-mono text-orange-200">Coût : 10 Sceaux de Constructeur</span>
            </button>
          </div>
        </div>
      )}

      {/* Animation de Chargement */}
      {isPulling && (
        <div className="scifi-panel-glow p-12 text-center space-y-4">
          <div className="text-6xl animate-bounce">📡</div>
          <h3 className="text-xl font-extrabold text-cyan-400 font-mono animate-pulse">
            TRANSMISSION ORBITALE EN COURS...
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Acquisition des plans structurels et assemblage des châssis dans le hangar...
          </p>
        </div>
      )}

      {/* Affichage des Résultats de Tirage */}
      {pulledCards.length > 0 && !isPulling && (
        <div className="scifi-panel-glow p-6 space-y-4 animate-in zoom-in-95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-extrabold text-base text-cyan-400 font-mono flex items-center gap-2">
              <span>🎉</span> CHÂSSIS RAPATRIÉS ({pulledCards.length})
            </h3>
            <button
              onClick={() => setPulledCards([])}
              className="text-xs text-slate-400 hover:text-white font-mono"
            >
              Masquer
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {pulledCards.map((chassis, idx) => (
              <ChassisCard key={idx} chassis={chassis} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
