import React, { createContext, useContext, useState, useEffect } from 'react';
import { CHASSIS_DATABASE, GEAR_SETS, ARTIFACTS } from './rosterData.js';
import { simulateBattle } from './battleEngine.js';

const GameStateContext = createContext(null);

const STORAGE_KEY = 'cxb_beta_demo_state_v1';

// Profil Démo Vétéran pour tester les châssis 10★ / LB5
const createInitialState = (isVeteran = false) => {
  const allChassis = CHASSIS_DATABASE.map((base, idx) => {
    const isUnlocked = isVeteran || idx < 6;
    const stars = isVeteran ? (idx < 3 ? 10 : 8) : base.baseStars;
    const level = isVeteran ? (idx < 3 ? 250 : 180) : 1;

    // Attribution d'équipements
    const equippedGear = isVeteran ? {
      weapon: GEAR_SETS.WEAPONS[Math.min(4, Math.floor(idx / 2))],
      armor: GEAR_SETS.ARMOR[Math.min(4, Math.floor(idx / 2))],
      propulsion: GEAR_SETS.PROPULSION[Math.min(4, Math.floor(idx / 2))],
      telemetry: GEAR_SETS.TELEMETRY[Math.min(4, Math.floor(idx / 2))]
    } : {
      weapon: idx < 3 ? GEAR_SETS.WEAPONS[0] : null,
      armor: idx < 3 ? GEAR_SETS.ARMOR[0] : null,
      propulsion: null,
      telemetry: null
    };

    const equippedArtifact = isVeteran && idx < ARTIFACTS.length ? ARTIFACTS[idx] : null;

    return {
      ...base,
      uniqueId: `inst_${base.id}_${idx}`,
      unlocked: isUnlocked,
      level,
      stars,
      copies: isVeteran ? 4 : 1,
      equippedGear,
      equippedArtifact,
      lbTalents: isVeteran ? { lb1: 'ATK', lb2: 'CRIT', lb3: 'PURGE', lb4: 'ARMOR_BREAK', lb5: 'SURVIVAL' } : {}
    };
  });

  // Sélection de la formation initiale (6 slots)
  const activeTeamIds = allChassis.filter(c => c.unlocked).slice(0, 6).map(c => c.uniqueId);

  return {
    isVeteranProfile: isVeteran,
    currencies: {
      gold: isVeteran ? 25000000 : 250000,
      juice: isVeteran ? 15000000 : 150000,
      gems: isVeteran ? 45000 : 3500,
      soulCrystals: isVeteran ? 8000 : 800,
      advanceCapsules: isVeteran ? 150 : 30,
      seals: isVeteran ? 60 : 15,
      slotCoins: isVeteran ? 80 : 20,
      alloyShards: isVeteran ? 1200 : 150
    },
    inventory: {
      weapons: [...GEAR_SETS.WEAPONS],
      armors: [...GEAR_SETS.ARMOR],
      propulsions: [...GEAR_SETS.PROPULSION],
      telemetries: [...GEAR_SETS.TELEMETRY],
      artifacts: [...ARTIFACTS]
    },
    userRoster: allChassis,
    activeTeamIds, // 6 slots
    campaign: {
      currentSector: isVeteran ? 12 : 3,
      currentStage: isVeteran ? 20 : 5,
      maxSector: 20,
      lastLootClaimTime: Date.now() - (isVeteran ? 14400000 : 3600000), // 4h ou 1h passées
      fastRewardsUsedToday: 0
    },
    guildTech: {
      TANK: { hpLevel: isVeteran ? 15 : 2, atkLevel: isVeteran ? 10 : 1, critLevel: isVeteran ? 5 : 0, speedLevel: isVeteran ? 5 : 0 },
      ASSAULT: { hpLevel: isVeteran ? 12 : 2, atkLevel: isVeteran ? 18 : 3, critLevel: isVeteran ? 8 : 1, speedLevel: isVeteran ? 6 : 0 },
      ASSASSIN: { hpLevel: isVeteran ? 8 : 1, atkLevel: isVeteran ? 20 : 3, critLevel: isVeteran ? 12 : 2, speedLevel: isVeteran ? 10 : 1 },
      ARTILLERY: { hpLevel: isVeteran ? 10 : 2, atkLevel: isVeteran ? 16 : 2, critLevel: isVeteran ? 6 : 0, speedLevel: isVeteran ? 4 : 0 },
      SUPPORT: { hpLevel: isVeteran ? 15 : 2, atkLevel: isVeteran ? 12 : 1, critLevel: isVeteran ? 4 : 0, speedLevel: isVeteran ? 8 : 1 }
    },
    arena: {
      rating: isVeteran ? 1850 : 1000,
      rank: isVeteran ? 14 : 240,
      tickets: isVeteran ? 35 : 10,
      history: []
    },
    gachaStats: {
      totalPulls: isVeteran ? 450 : 0,
      pityCounter: isVeteran ? 15 : 0
    }
  };
};

export function GameStateProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Erreur de chargement de la sauvegarde:', e);
    }
    return createInitialState(true); // Profil Vétéran débloqué par défaut pour tester immédiatement toute la profondeur
  });

  // Sauvegarde automatique
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error('Erreur sauvegarde:', e);
    }
  }, [state]);

  // Basculer profil (Nouveau vs Vétéran)
  const switchProfile = (isVeteran) => {
    const newState = createInitialState(isVeteran);
    setState(newState);
  };

  // Réinitialiser sauvegarde
  const resetGame = () => {
    const newState = createInitialState(true);
    setState(newState);
  };

  // --- ACTIONS HANGAR (Level up, Star up, Équipements) ---
  const levelUpChassis = (uniqueId, levelsCount = 1) => {
    setState(prev => {
      const roster = [...prev.userRoster];
      const chassisIdx = roster.findIndex(c => c.uniqueId === uniqueId);
      if (chassisIdx === -1) return prev;

      const chassis = { ...roster[chassisIdx] };
      const maxLevel = chassis.stars * 30; // ex: 5★ = 150, 10★ = 300
      const actualLevels = Math.min(levelsCount, maxLevel - chassis.level);
      if (actualLevels <= 0) return prev;

      const costGold = actualLevels * 2500 * (chassis.level / 10 + 1);
      const costJuice = actualLevels * 1800 * (chassis.level / 10 + 1);

      if (prev.currencies.gold < costGold || prev.currencies.juice < costJuice) {
        return prev;
      }

      chassis.level += actualLevels;
      roster[chassisIdx] = chassis;

      return {
        ...prev,
        currencies: {
          ...prev.currencies,
          gold: Math.max(0, prev.currencies.gold - costGold),
          juice: Math.max(0, prev.currencies.juice - costJuice)
        },
        userRoster: roster
      };
    });
  };

  // Star-Up / Overclocking (Ascension)
  const starUpChassis = (uniqueId) => {
    setState(prev => {
      const roster = [...prev.userRoster];
      const chassisIdx = roster.findIndex(c => c.uniqueId === uniqueId);
      if (chassisIdx === -1) return prev;

      const chassis = { ...roster[chassisIdx] };
      if (chassis.stars >= 15) return prev; // LB5 max

      const costSoulCrystals = (chassis.stars - 4) * 500;
      const costAlloy = (chassis.stars - 4) * 80;

      if (prev.currencies.soulCrystals < costSoulCrystals || prev.currencies.alloyShards < costAlloy) {
        return prev;
      }

      chassis.stars += 1;
      roster[chassisIdx] = chassis;

      return {
        ...prev,
        currencies: {
          ...prev.currencies,
          soulCrystals: prev.currencies.soulCrystals - costSoulCrystals,
          alloyShards: prev.currencies.alloyShards - costAlloy
        },
        userRoster: roster
      };
    });
  };

  // Équipement automatique du meilleur équipement
  const autoEquipChassis = (uniqueId) => {
    setState(prev => {
      const roster = [...prev.userRoster];
      const chassisIdx = roster.findIndex(c => c.uniqueId === uniqueId);
      if (chassisIdx === -1) return prev;

      const chassis = { ...roster[chassisIdx] };
      chassis.equippedGear = {
        weapon: GEAR_SETS.WEAPONS[Math.min(4, Math.floor(chassis.stars / 2))],
        armor: GEAR_SETS.ARMOR[Math.min(4, Math.floor(chassis.stars / 2))],
        propulsion: GEAR_SETS.PROPULSION[Math.min(4, Math.floor(chassis.stars / 2))],
        telemetry: GEAR_SETS.TELEMETRY[Math.min(4, Math.floor(chassis.stars / 2))]
      };
      if (!chassis.equippedArtifact) {
        chassis.equippedArtifact = ARTIFACTS[Math.floor(Math.random() * ARTIFACTS.length)];
      }

      roster[chassisIdx] = chassis;
      return { ...prev, userRoster: roster };
    });
  };

  // Changer de composition d'équipe (6 slots)
  const setTeamSlot = (slotIndex, uniqueId) => {
    setState(prev => {
      const active = [...prev.activeTeamIds];
      // Si déjà dans une autre position, intervertir
      const existingIdx = active.indexOf(uniqueId);
      if (existingIdx !== -1) {
        active[existingIdx] = active[slotIndex];
      }
      active[slotIndex] = uniqueId;
      return { ...prev, activeTeamIds: active };
    });
  };

  // --- ACTIONS GACHA & INVOCATIONS ---
  const pullGacha = (count = 10, isFactionPull = false, targetFaction = null) => {
    let pulledUnits = [];
    setState(prev => {
      const costCapsules = isFactionPull ? 0 : count;
      const costSeals = isFactionPull ? count : 0;

      if (!isFactionPull && prev.currencies.advanceCapsules < costCapsules) return prev;
      if (isFactionPull && prev.currencies.seals < costSeals) return prev;

      const roster = [...prev.userRoster];
      let pool = isFactionPull && targetFaction
        ? CHASSIS_DATABASE.filter(c => c.faction === targetFaction)
        : CHASSIS_DATABASE;

      for (let i = 0; i < count; i++) {
        // Probabilités : 5★ = 10% (Boosté pour la démo), 4★ = 30%, 3★ = 60%
        const rand = Math.random();
        let chosenBase = pool[Math.floor(Math.random() * pool.length)];
        let stars = 3;
        if (rand < 0.12) stars = 5;
        else if (rand < 0.45) stars = 4;

        const newChassis = {
          ...chosenBase,
          uniqueId: `inst_${chosenBase.id}_${Date.now()}_${i}`,
          unlocked: true,
          level: 1,
          stars,
          copies: 1,
          equippedGear: { weapon: null, armor: null, propulsion: null, telemetry: null },
          equippedArtifact: null,
          lbTalents: {}
        };

        pulledUnits.push(newChassis);
        roster.push(newChassis);
      }

      return {
        ...prev,
        currencies: {
          ...prev.currencies,
          advanceCapsules: Math.max(0, prev.currencies.advanceCapsules - costCapsules),
          seals: Math.max(0, prev.currencies.seals - costSeals),
          alloyShards: prev.currencies.alloyShards + count * 10
        },
        userRoster: roster,
        gachaStats: {
          totalPulls: prev.gachaStats.totalPulls + count,
          pityCounter: (prev.gachaStats.pityCounter + count) % 50
        }
      };
    });

    return pulledUnits;
  };

  // --- ACTIONS CAMPAGNE (Loot passif & Récolte Turbo) ---
  const calculatePendingLoot = () => {
    const elapsedMinutes = Math.min(720, Math.floor((Date.now() - state.campaign.lastLootClaimTime) / 60000));
    const rateMultiplier = state.campaign.currentSector * 1.5;

    return {
      minutes: elapsedMinutes,
      gold: Math.round(elapsedMinutes * 150 * rateMultiplier),
      juice: Math.round(elapsedMinutes * 100 * rateMultiplier),
      alloyShards: Math.round(elapsedMinutes * 1.2 * rateMultiplier),
      gems: Math.round(elapsedMinutes * 0.5 * rateMultiplier)
    };
  };

  const claimCampaignLoot = () => {
    const loot = calculatePendingLoot();
    setState(prev => ({
      ...prev,
      currencies: {
        ...prev.currencies,
        gold: prev.currencies.gold + loot.gold,
        juice: prev.currencies.juice + loot.juice,
        alloyShards: prev.currencies.alloyShards + loot.alloyShards,
        gems: prev.currencies.gems + loot.gems
      },
      campaign: {
        ...prev.campaign,
        lastLootClaimTime: Date.now()
      }
    }));
    return loot;
  };

  const fastRewardCampaign = () => {
    const rateMultiplier = state.campaign.currentSector * 1.5;
    const instantGold = Math.round(120 * 150 * rateMultiplier);
    const instantJuice = Math.round(120 * 100 * rateMultiplier);
    const instantAlloy = Math.round(120 * 1.2 * rateMultiplier);
    const instantGems = Math.round(120 * 0.5 * rateMultiplier);

    setState(prev => ({
      ...prev,
      currencies: {
        ...prev.currencies,
        gold: prev.currencies.gold + instantGold,
        juice: prev.currencies.juice + instantJuice,
        alloyShards: prev.currencies.alloyShards + instantAlloy,
        gems: prev.currencies.gems + instantGems
      },
      campaign: {
        ...prev.campaign,
        fastRewardsUsedToday: prev.campaign.fastRewardsUsedToday + 1
      }
    }));

    return { gold: instantGold, juice: instantJuice, alloyShards: instantAlloy, gems: instantGems };
  };

  // --- ACTIONS GUILD TECH ---
  const upgradeGuildTech = (archetype, statKey) => {
    setState(prev => {
      const currentLevel = prev.guildTech[archetype][statKey] || 0;
      const cost = (currentLevel + 1) * 15000;
      if (prev.currencies.gold < cost) return prev;

      return {
        ...prev,
        currencies: { ...prev.currencies, gold: prev.currencies.gold - cost },
        guildTech: {
          ...prev.guildTech,
          [archetype]: {
            ...prev.guildTech[archetype],
            [statKey]: currentLevel + 1
          }
        }
      };
    });
  };

  // Récupérer les 6 unités de l'équipe active
  const getActiveTeam = () => {
    return state.activeTeamIds.map(id => state.userRoster.find(c => c.uniqueId === id) || null);
  };

  return (
    <GameStateContext.Provider value={{
      state,
      switchProfile,
      resetGame,
      levelUpChassis,
      starUpChassis,
      autoEquipChassis,
      setTeamSlot,
      pullGacha,
      calculatePendingLoot,
      claimCampaignLoot,
      fastRewardCampaign,
      upgradeGuildTech,
      getActiveTeam
    }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) throw new Error('useGameState must be used within a GameStateProvider');
  return context;
}
