import { useState, useEffect } from 'react';

const INITIAL_VEHICLES = [
  {
    id: 'striker',
    name: 'Striker Mk-II',
    title: 'Avant-Garde · CyberKinetic',
    role: 'Avant-Garde',
    roleIcon: 'shield',
    faction: 'CyberKinetic',
    factionColor: '#00d4ff',
    stars: 5,
    level: 18,
    maxLevel: 30,
    power: 1015,
    grade: 1, // 0 to 5 hexes
    img: '/vehicle-striker.jpg',
    voice: 'Voix : Neo-V8 AI',
    isLocked: true,
    isFav: true,
    hp: 2230,
    atk: 501,
    def: 143,
    spd: 233,
    upgradeCostGold: 1250,
    upgradeCostFluid: 298,
    skills: [
      { id: 1, name: 'Surcharge Thermique', type: 'Active', unlocked: true, icon: 'plasma' },
      { id: 2, name: 'Blindage Réactif', type: 'Passive', unlocked: false, icon: 'vortex' },
      { id: 3, name: 'Propulseur Nitro', type: 'Passive', unlocked: false, icon: 'impact' },
      { id: 4, name: 'Noyau Cyber-Titan', type: 'Passive', unlocked: false, icon: 'core' }
    ]
  },
  {
    id: 'phantom',
    name: 'Aethelred Stealth',
    title: 'Assaut · Quantum Flux',
    role: 'Assaut Furtif',
    roleIcon: 'swords',
    faction: 'Quantum Flux',
    factionColor: '#aa44ff',
    stars: 5,
    level: 22,
    maxLevel: 30,
    power: 1340,
    grade: 2,
    img: '/vehicle-phantom.jpg',
    voice: 'Voix : Ghost Protocol',
    isLocked: false,
    isFav: true,
    hp: 1890,
    atk: 680,
    def: 110,
    spd: 310,
    upgradeCostGold: 1600,
    upgradeCostFluid: 380,
    skills: [
      { id: 1, name: 'Faisceaux Jumeaux', type: 'Active', unlocked: true, icon: 'plasma' },
      { id: 2, name: 'Camouflage Optique', type: 'Passive', unlocked: true, icon: 'vortex' },
      { id: 3, name: 'Frappe Critique', type: 'Passive', unlocked: false, icon: 'impact' },
      { id: 4, name: 'Vortex Quantique', type: 'Passive', unlocked: false, icon: 'core' }
    ]
  },
  {
    id: 'vortex',
    name: 'Titan Goliath Mech',
    title: 'Artillerie · V8 Bio-Fuel',
    role: 'Artillerie Lourde',
    roleIcon: 'tank',
    faction: 'V8 Bio-Fuel',
    factionColor: '#ff8800',
    stars: 5,
    level: 25,
    maxLevel: 30,
    power: 1560,
    grade: 3,
    img: '/vehicle-vortex.jpg',
    voice: 'Voix : Dreadnought Heavy',
    isLocked: true,
    isFav: false,
    hp: 3100,
    atk: 580,
    def: 220,
    spd: 165,
    upgradeCostGold: 2100,
    upgradeCostFluid: 520,
    skills: [
      { id: 1, name: 'Canons Railgun Plasma', type: 'Active', unlocked: true, icon: 'plasma' },
      { id: 2, name: 'Matrice de Bouclier', type: 'Passive', unlocked: true, icon: 'vortex' },
      { id: 3, name: 'Barrière Magnétique', type: 'Passive', unlocked: true, icon: 'impact' },
      { id: 4, name: 'Obus IEM Explosif', type: 'Passive', unlocked: false, icon: 'core' }
    ]
  }
];

export function useGameStore() {
  const [gold, setGold] = useState(8653);
  const [gems, setGems] = useState(40);
  const [fluid, setFluid] = useState(1100);
  const [vehicles, setVehicles] = useState(INITIAL_VEHICLES);
  const [selectedVehicleIndex, setSelectedVehicleIndex] = useState(0);

  const activeVehicle = vehicles[selectedVehicleIndex] || vehicles[0];

  const nextVehicle = () => {
    setSelectedVehicleIndex((prev) => (prev + 1) % vehicles.length);
  };

  const prevVehicle = () => {
    setSelectedVehicleIndex((prev) => (prev - 1 + vehicles.length) % vehicles.length);
  };

  const toggleFav = () => {
    setVehicles((prev) =>
      prev.map((v, i) =>
        i === selectedVehicleIndex ? { ...v, isFav: !v.isFav } : v
      )
    );
  };

  const toggleLock = () => {
    setVehicles((prev) =>
      prev.map((v, i) =>
        i === selectedVehicleIndex ? { ...v, isLocked: !v.isLocked } : v
      )
    );
  };

  const upgradeActiveVehicle = () => {
    if (activeVehicle.level >= activeVehicle.maxLevel) return false;
    if (gold < activeVehicle.upgradeCostGold || fluid < activeVehicle.upgradeCostFluid) {
      alert("Ressources insuffisantes ! Récoltez plus d'or ou de fluide.");
      return false;
    }

    setGold((g) => g - activeVehicle.upgradeCostGold);
    setFluid((f) => f - activeVehicle.upgradeCostFluid);

    setVehicles((prev) =>
      prev.map((v, i) => {
        if (i !== selectedVehicleIndex) return v;
        const newLvl = v.level + 1;
        const hpGain = Math.round(v.hp * 0.08);
        const atkGain = Math.round(v.atk * 0.08);
        const defGain = Math.round(v.def * 0.08);
        const spdGain = Math.round(v.spd * 0.04);
        const newPower = v.power + 85;

        return {
          ...v,
          level: newLvl,
          power: newPower,
          hp: v.hp + hpGain,
          atk: v.atk + atkGain,
          def: v.def + defGain,
          spd: v.spd + spdGain,
          upgradeCostGold: Math.round(v.upgradeCostGold * 1.15),
          upgradeCostFluid: Math.round(v.upgradeCostFluid * 1.15)
        };
      })
    );
    return true;
  };

  return {
    gold,
    gems,
    fluid,
    vehicles,
    activeVehicle,
    selectedVehicleIndex,
    nextVehicle,
    prevVehicle,
    toggleFav,
    toggleLock,
    upgradeActiveVehicle,
    setGold,
    setGems,
    setFluid
  };
}
