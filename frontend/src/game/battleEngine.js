// Moteur de Simulation de Combat 6v6 de Cars x Battle
import { FACTIONS } from './rosterData.js';

/**
 * Calcule l'Aura de Flotte selon la composition de l'équipe (6 slots)
 */
export function calculateFleetAura(team) {
  const activeUnits = team.filter(Boolean);
  if (activeUnits.length === 0) return { name: 'Aucune Aura', hpBonus: 0, atkBonus: 0, ccResistBonus: 0 };

  const factionCounts = {};
  activeUnits.forEach(unit => {
    factionCounts[unit.faction] = (factionCounts[unit.faction] || 0) + 1;
  });

  const distinctCount = Object.keys(factionCounts).length;
  const counts = Object.values(factionCounts).sort((a, b) => b - a);

  // Pure Faction (6)
  if (counts[0] === 6) {
    return { name: `Suprématie ${FACTIONS[activeUnits[0].faction].name} (6x)`, hpBonus: 0.20, atkBonus: 0.15, ccResistBonus: 0.10 };
  }

  // Rainbow (1 de chaque faction parmi les 6 distincts)
  if (distinctCount === 6) {
    return { name: 'Spectre Universel (Rainbow)', hpBonus: 0.10, atkBonus: 0.10, ccResistBonus: 0.10 };
  }

  // Dualité Cosmique (3 DarkMatter + 3 StellarAegis)
  if (factionCounts.DARKMATTER === 3 && factionCounts.STELLARAEGIS === 3) {
    return { name: 'Convergence Cosmique (3+3)', hpBonus: 0.20, atkBonus: 0.16, ccResistBonus: 0.15 };
  }

  // Duo 3+3
  if (counts[0] === 3 && counts[1] === 3) {
    return { name: 'Alliance Industrielle (3+3)', hpBonus: 0.13, atkBonus: 0.09, ccResistBonus: 0.05 };
  }

  // 4 du même constructeur
  if (counts[0] >= 4) {
    return { name: 'Escadron Standard (4x)', hpBonus: 0.08, atkBonus: 0.06, ccResistBonus: 0 };
  }

  return { name: 'Formation Standard', hpBonus: 0.05, atkBonus: 0.03, ccResistBonus: 0 };
}

/**
 * Calcule les statistiques complètes d'un châssis (Niveau + Étoiles + Équipement + Artefact + Tech + Aura)
 */
export function computeChassisStats(chassis, aura = null, guildTech = null) {
  if (!chassis) return null;
  const level = chassis.level || 1;
  const stars = chassis.stars || chassis.baseStars || 5;
  const base = chassis.baseStats;

  // Multiplicateurs de niveau et d'étoiles
  const levelMultiplier = 1 + (level - 1) * 0.035;
  const starMultiplier = 1 + (stars - 5) * 0.25;

  let hp = Math.round(base.hp * levelMultiplier * starMultiplier);
  let atk = Math.round(base.atk * levelMultiplier * starMultiplier);
  let armor = Math.round(base.armor * (1 + (level - 1) * 0.02) * starMultiplier);
  let speed = Math.round(base.speed + (level - 1) * 2 + (stars - 5) * 15);
  let critRate = base.critRate || 0.10;
  let critDmg = base.critDmg || 1.50;
  let precision = base.precision || 0.10;
  let block = base.block || 0.15;
  let armorBreak = base.armorBreak || 0;
  let damageReduction = base.damageReduction || 0;
  let controlImmune = base.controlImmune || 0;
  let skillDmg = base.skillDmg || 0;
  let trueDamage = base.trueDamage || 0;
  let initialEnergy = 50;

  // Bonus Équipements
  if (chassis.equippedGear) {
    Object.values(chassis.equippedGear).forEach(gear => {
      if (!gear) return;
      if (gear.hp) hp += gear.hp;
      if (gear.atk) atk += gear.atk;
      if (gear.armor) armor += gear.armor;
      if (gear.speed) speed += gear.speed;
      if (gear.critRate) critRate += gear.critRate;
      if (gear.critDmg) critDmg += gear.critDmg;
      if (gear.armorBreak) armorBreak += gear.armorBreak;
      if (gear.damageReduction) damageReduction += gear.damageReduction;
      if (gear.skillDmg) skillDmg += gear.skillDmg;
    });
  }

  // Bonus Artefact
  if (chassis.equippedArtifact) {
    const art = chassis.equippedArtifact;
    if (art.stats) {
      if (art.stats.hp) hp += art.stats.hp;
      if (art.stats.hpPercent) hp = Math.round(hp * (1 + art.stats.hpPercent));
      if (art.stats.atk) atk += art.stats.atk;
      if (art.stats.speed) speed += art.stats.speed;
      if (art.stats.critRate) critRate += art.stats.critRate;
      if (art.stats.damageReduction) damageReduction += art.stats.damageReduction;
      if (art.stats.skillDmg) skillDmg += art.stats.skillDmg;
      if (art.stats.initialEnergy) initialEnergy += art.stats.initialEnergy;
    }
  }

  // Bonus Guild Tech
  if (guildTech && guildTech[chassis.archetype]) {
    const tech = guildTech[chassis.archetype];
    hp = Math.round(hp * (1 + (tech.hpLevel || 0) * 0.01));
    atk = Math.round(atk * (1 + (tech.atkLevel || 0) * 0.01));
    critRate += (tech.critLevel || 0) * 0.005;
    speed += (tech.speedLevel || 0) * 2;
  }

  // Bonus Aura
  if (aura) {
    hp = Math.round(hp * (1 + (aura.hpBonus || 0)));
    atk = Math.round(atk * (1 + (aura.atkBonus || 0)));
    controlImmune += aura.ccResistBonus || 0;
  }

  // Plafonds logiques
  critRate = Math.min(1.0, critRate);
  block = Math.min(0.85, block);
  damageReduction = Math.min(0.70, damageReduction);
  controlImmune = Math.min(0.85, controlImmune);

  return {
    ...chassis,
    stats: {
      maxHp: hp,
      currentHp: hp,
      atk,
      armor,
      speed,
      critRate,
      critDmg,
      precision,
      block,
      armorBreak,
      damageReduction,
      controlImmune,
      skillDmg,
      trueDamage,
      energy: initialEnergy,
      maxEnergy: 100
    }
  };
}

/**
 * Teste l'avantage de faction (+30% DMG, +15% Hit)
 */
function checkFactionAdvantage(attackerFaction, defenderFaction) {
  const fData = FACTIONS[attackerFaction];
  if (fData && fData.advantageAgainst === defenderFaction) {
    return { hasAdvantage: true, dmgBonus: 0.30, precisionBonus: 0.15 };
  }
  return { hasAdvantage: false, dmgBonus: 0, precisionBonus: 0 };
}

/**
 * Moteur principal de combat simulé
 */
export function simulateBattle(teamPlayerRaw, teamEnemyRaw, playerGuildTech = null, enemyGuildTech = null) {
  const playerAura = calculateFleetAura(teamPlayerRaw);
  const enemyAura = calculateFleetAura(teamEnemyRaw);

  // Initialisation des unités
  const teamPlayer = teamPlayerRaw.map((u, idx) => {
    if (!u) return null;
    const computed = computeChassisStats(u, playerAura, playerGuildTech);
    return {
      ...computed,
      team: 'player',
      slotIndex: idx,
      isFrontline: idx < 2,
      shield: 0,
      buffs: [],
      debuffs: [],
      isDead: false,
      statsReport: { damageDealt: 0, damageTaken: 0, healingDone: 0 }
    };
  });

  const teamEnemy = teamEnemyRaw.map((u, idx) => {
    if (!u) return null;
    const computed = computeChassisStats(u, enemyAura, enemyGuildTech);
    return {
      ...computed,
      team: 'enemy',
      slotIndex: idx,
      isFrontline: idx < 2,
      shield: 0,
      buffs: [],
      debuffs: [],
      isDead: false,
      statsReport: { damageDealt: 0, damageTaken: 0, healingDone: 0 }
    };
  });

  const logs = [];
  const roundsHistory = [];
  let winner = null;
  const MAX_ROUNDS = 15;

  logs.push({
    type: 'START',
    text: `⚡ Début de l'engagement tactique ! Flotte Joueur [${playerAura.name}] vs Flotte Ennemie [${enemyAura.name}]`,
    round: 0
  });

  for (let round = 1; round <= MAX_ROUNDS; round++) {
    const roundEvents = [];

    // Phase 1 : Traitement du début de round (DoT, purge, etc.)
    const allLivingUnits = [...teamPlayer, ...teamEnemy].filter(u => u && !u.isDead);
    
    // DoT & Effets de début de tour
    allLivingUnits.forEach(unit => {
      // Traitement des débuffs DoT (Brûlure, Saignement, Corrosion)
      unit.debuffs = unit.debuffs.filter(d => {
        if (d.type === 'DOT') {
          const dotDmg = Math.round(d.damage);
          unit.stats.currentHp = Math.max(0, unit.stats.currentHp - dotDmg);
          unit.statsReport.damageTaken += dotDmg;
          roundEvents.push({
            type: 'DOT_DAMAGE',
            targetId: unit.id,
            targetTeam: unit.team,
            amount: dotDmg,
            dotName: d.name,
            currentHp: unit.stats.currentHp,
            maxHp: unit.stats.maxHp,
            text: `🧪 [${unit.name}] subit ${dotDmg} dégâts de ${d.name}.`
          });
          if (unit.stats.currentHp <= 0) {
            unit.isDead = true;
            roundEvents.push({ type: 'DEATH', targetId: unit.id, targetTeam: unit.team, text: `💥 [${unit.name}] a été neutralisé !` });
          }
        }
        d.duration -= 1;
        return d.duration > 0 && !unit.isDead;
      });
    });

    // Vérification de victoire prématurée suite aux DoTs
    const livingPlayersAfterDot = teamPlayer.filter(u => u && !u.isDead);
    const livingEnemiesAfterDot = teamEnemy.filter(u => u && !u.isDead);
    if (livingPlayersAfterDot.length === 0 || livingEnemiesAfterDot.length === 0) {
      winner = livingPlayersAfterDot.length > 0 ? 'player' : 'enemy';
      roundsHistory.push({ round, events: roundEvents });
      break;
    }

    // Phase 2 : Détermination de l'ordre d'action (Tri par Vitesse décroissante)
    const activeFighters = [...teamPlayer, ...teamEnemy]
      .filter(u => u && !u.isDead)
      .sort((a, b) => b.stats.speed - a.stats.speed);

    for (const actor of activeFighters) {
      if (actor.isDead) continue;

      // Vérification des altérations d'état bloquantes (Stun / Freeze / Petrify)
      const isImmobilized = actor.debuffs.some(d => ['STUN', 'FREEZE', 'PETRIFY'].includes(d.type));
      if (isImmobilized) {
        roundEvents.push({
          type: 'IMMOBILIZED',
          actorId: actor.id,
          actorTeam: actor.team,
          text: `⚡ [${actor.name}] est neutralisé (IEM / Cryo) et ne peut pas agir ce round.`
        });
        continue;
      }

      const isSilenced = actor.debuffs.some(d => d.type === 'SILENCE');
      const isPlayer = actor.team === 'player';
      const enemies = (isPlayer ? teamEnemy : teamPlayer).filter(u => u && !u.isDead);
      const allies = (isPlayer ? teamPlayer : teamEnemy).filter(u => u && !u.isDead);

      if (enemies.length === 0) break;

      // Choix : Aptitude Majeure (Ultime) ou Attaque de Base
      const canCastUltimate = actor.stats.energy >= 100 && !isSilenced;

      if (canCastUltimate) {
        // === DÉCLENCHEMENT DE L'ULTIME ===
        actor.stats.energy = 0; // Réinitialisation de l'énergie
        const skill = actor.activeSkill;

        roundEvents.push({
          type: 'ULTIMATE_CAST',
          actorId: actor.id,
          actorTeam: actor.team,
          skillName: skill.name,
          text: `🔥 [${actor.name}] DÉCLENCHE SON ULTIME : [${skill.name}] !`
        });

        // Application de l'Ultime selon l'archétype
        if (actor.archetype === 'SUPPORT') {
          // Soin & Buffs d'alliés
          const healTargets = [...allies].sort((a, b) => (a.stats.currentHp / a.stats.maxHp) - (b.stats.currentHp / b.stats.maxHp)).slice(0, 3);
          healTargets.forEach(target => {
            const healAmount = Math.round(actor.stats.atk * 2.2 * (1 + (actor.stats.skillDmg || 0)));
            target.stats.currentHp = Math.min(target.stats.maxHp, target.stats.currentHp + healAmount);
            target.stats.energy = Math.min(100, target.stats.energy + 25);
            actor.statsReport.healingDone += healAmount;

            roundEvents.push({
              type: 'HEAL',
              actorId: actor.id,
              targetId: target.id,
              targetTeam: target.team,
              amount: healAmount,
              currentHp: target.stats.currentHp,
              maxHp: target.stats.maxHp,
              text: `🧪 [${actor.name}] répare [${target.name}] pour +${healAmount} HP (+25 Énergie).`
            });
          });
        } else if (actor.archetype === 'ARTILLERY') {
          // Frappe de Zone (AoE sur tous les ennemis)
          enemies.forEach(target => {
            applyDamage(actor, target, 1.45, true, roundEvents);
            // 35% chance de Stun/IEM
            if (Math.random() < 0.35 && !target.isDead) {
              target.debuffs.push({ type: 'STUN', name: 'Impulsion IEM', duration: 1 });
              roundEvents.push({
                type: 'DEBUFF_APPLIED',
                targetId: target.id,
                targetTeam: target.team,
                debuff: 'STUN',
                text: `⚡ [${target.name}] subit une Impulsion IEM (Étourdissement 1 tour).`
              });
            }
          });
        } else if (actor.archetype === 'ASSASSIN') {
          // Frappe mono-cible ciblée sur l'ennemi le plus faible
          const lowestEnemy = [...enemies].sort((a, b) => a.stats.currentHp - b.stats.currentHp)[0];
          if (lowestEnemy) {
            applyDamage(actor, lowestEnemy, 3.60, true, roundEvents);
          }
        } else {
          // Assaut / Tank : Frappe les 2 ennemis de la ligne avant ou 2 cibles prioritaires
          const frontEnemies = enemies.filter(e => e.isFrontline);
          const targets = frontEnemies.length > 0 ? frontEnemies : enemies.slice(0, 2);
          targets.forEach(target => {
            applyDamage(actor, target, 1.90, true, roundEvents);
          });
          // Si Tank, gagne un bouclier
          if (actor.archetype === 'TANK') {
            const shieldValue = Math.round(actor.stats.maxHp * 0.25);
            actor.shield = (actor.shield || 0) + shieldValue;
            roundEvents.push({
              type: 'SHIELD_GAINED',
              actorId: actor.id,
              actorTeam: actor.team,
              amount: shieldValue,
              text: `🛡️ [${actor.name}] active un Blindage Électromagnétique (+${shieldValue} Bouclier).`
            });
          }
        }

      } else {
        // === ATTAQUE DE BASE MONO-CIBLE ===
        // Priorité de ciblage : Ligne avant ennemie F1 > F2, sinon arrière-garde
        const frontEnemies = enemies.filter(e => e.isFrontline);
        const target = frontEnemies.length > 0 ? frontEnemies[0] : enemies[0];

        if (target) {
          applyDamage(actor, target, 1.0, false, roundEvents);
          // Gain d'énergie pour l'attaquant
          actor.stats.energy = Math.min(100, actor.stats.energy + 50);
          roundEvents.push({
            type: 'ENERGY_GAIN',
            actorId: actor.id,
            actorTeam: actor.team,
            energy: actor.stats.energy,
            amount: 50
          });
        }
      }

      // Vérification des survivants après l'action
      const currentLivingEnemies = enemies.filter(e => !e.isDead);
      if (currentLivingEnemies.length === 0) {
        winner = isPlayer ? 'player' : 'enemy';
        break;
      }
    }

    roundsHistory.push({ round, events: roundEvents });

    // Fin du round : décrémenter la durée des buffs/débuffs
    allLivingUnits.forEach(unit => {
      unit.debuffs = unit.debuffs.filter(d => d.type === 'DOT' || (d.duration -= 1) > 0);
    });

    if (winner) break;
  }

  // Si limite de rounds atteinte (15 rounds), l'attaquant perd (défense victorieuse)
  if (!winner) {
    winner = 'enemy';
    logs.push({ type: 'TIMEOUT', text: '⏱️ Limite de temps dépassée (15 rounds) : Victoire de la défense ennemie.', round: MAX_ROUNDS });
  }

  // Calcul du score et bilan
  const playerStatsSummary = teamPlayer.filter(Boolean).map(u => ({
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    stars: u.stars,
    damageDealt: u.statsReport.damageDealt,
    damageTaken: u.statsReport.damageTaken,
    healingDone: u.statsReport.healingDone,
    isDead: u.isDead
  }));

  const enemyStatsSummary = teamEnemy.filter(Boolean).map(u => ({
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    stars: u.stars,
    damageDealt: u.statsReport.damageDealt,
    damageTaken: u.statsReport.damageTaken,
    healingDone: u.statsReport.healingDone,
    isDead: u.isDead
  }));

  return {
    winner,
    isVictory: winner === 'player',
    totalRounds: roundsHistory.length,
    roundsHistory,
    logs,
    playerStatsSummary,
    enemyStatsSummary
  };
}

/**
 * Calcul mathématique et application des dégâts
 */
function applyDamage(attacker, defender, skillMultiplier, isUltimate, eventsList) {
  const advantage = checkFactionAdvantage(attacker.faction, defender.faction);
  
  // Base de dégâts
  let rawDmg = attacker.stats.atk * skillMultiplier;
  if (advantage.hasAdvantage) {
    rawDmg *= (1 + advantage.dmgBonus);
  }
  if (isUltimate) {
    rawDmg *= (1 + (attacker.stats.skillDmg || 0));
  }

  // Calcul Coup Critique
  let isCrit = false;
  if (Math.random() < attacker.stats.critRate) {
    isCrit = true;
    rawDmg *= attacker.stats.critDmg;
  }

  // Calcul Déflexion (Block / Parade)
  let isBlocked = false;
  const effectiveBlockRate = Math.max(0, defender.stats.block - (attacker.stats.precision + advantage.precisionBonus));
  if (Math.random() < effectiveBlockRate) {
    isBlocked = true;
    rawDmg *= 0.67; // Réduction de 33% des dégâts
  }

  // Mitigation d'Armure & Réduction de Dégâts
  const effectiveArmor = Math.max(0, defender.stats.armor * (1 - attacker.stats.armorBreak));
  const armorMitigation = effectiveArmor / (effectiveArmor + 800); // Courbe d'atténuation classique
  let finalDmg = rawDmg * (1 - armorMitigation);

  // Réduction de Dégâts brute (Damage Reduction)
  finalDmg *= (1 - (defender.stats.damageReduction || 0));

  // Dégâts Bruts (True Damage de Fission)
  if (attacker.stats.trueDamage > 0) {
    const trueDmgPart = attacker.stats.atk * attacker.stats.trueDamage;
    finalDmg += trueDmgPart;
  }

  finalDmg = Math.max(1, Math.round(finalDmg));

  // Absorption par le bouclier
  let absorbedByShield = 0;
  if (defender.shield > 0) {
    if (defender.shield >= finalDmg) {
      defender.shield -= finalDmg;
      absorbedByShield = finalDmg;
      finalDmg = 0;
    } else {
      absorbedByShield = defender.shield;
      finalDmg -= defender.shield;
      defender.shield = 0;
    }
  }

  // Application aux PV
  defender.stats.currentHp = Math.max(0, defender.stats.currentHp - finalDmg);
  attacker.statsReport.damageDealt += (finalDmg + absorbedByShield);
  defender.statsReport.damageTaken += (finalDmg + absorbedByShield);

  // Gain d'énergie pour la cible attaquée (+15 d'énergie)
  defender.stats.energy = Math.min(100, defender.stats.energy + 15);

  eventsList.push({
    type: 'DAMAGE',
    attackerId: attacker.id,
    attackerTeam: attacker.team,
    targetId: defender.id,
    targetTeam: defender.team,
    damage: finalDmg,
    absorbed: absorbedByShield,
    isCrit,
    isBlocked,
    isAdvantage: advantage.hasAdvantage,
    currentHp: defender.stats.currentHp,
    maxHp: defender.stats.maxHp,
    targetEnergy: defender.stats.energy,
    text: `💥 [${attacker.name}] attaque [${defender.name}] ➔ ${finalDmg} dégâts ${isCrit ? '🔥 CRITIQUE !' : ''} ${isBlocked ? '🛡️ DÉVIÉ (-33%)' : ''} ${advantage.hasAdvantage ? '⚡ AVANTAGE FACTION' : ''}`
  });

  // Mort de la cible
  if (defender.stats.currentHp <= 0) {
    defender.isDead = true;
    eventsList.push({
      type: 'DEATH',
      targetId: defender.id,
      targetTeam: defender.team,
      text: `☠️ Le châssis [${defender.name}] est détruit !`
    });
  }
}
