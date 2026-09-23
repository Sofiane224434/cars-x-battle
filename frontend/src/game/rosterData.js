// Base de données des Constructeurs, Archétypes, Châssis et Équipements de Cars x Battle

export const FACTIONS = {
  CYBERKINETIC: {
    id: 'CYBERKINETIC',
    name: 'CyberKinetic Corp',
    shortName: 'CyberKinetic',
    color: '#06b6d4', // Cyan
    bgGradient: 'from-cyan-900/40 to-slate-900',
    borderColor: 'border-cyan-500/60',
    textColor: 'text-cyan-400',
    icon: '⚡',
    description: 'Pionniers en guerre électronique, nanocorrosion et réactivation d\'épaves.',
    advantageAgainst: 'IRONFORGE',
  },
  IRONFORGE: {
    id: 'IRONFORGE',
    name: 'IronForge Heavy',
    shortName: 'IronForge',
    color: '#f97316', // Orange
    bgGradient: 'from-orange-900/40 to-slate-900',
    borderColor: 'border-orange-500/60',
    textColor: 'text-orange-400',
    icon: '⚙️',
    description: 'Blindages en tungstène massif, canons cinétiques lourds et coups critiques.',
    advantageAgainst: 'BIOMECH',
  },
  BIOMECH: {
    id: 'BIOMECH',
    name: 'BioMech Industries',
    shortName: 'BioMech',
    color: '#ef4444', // Rouge
    bgGradient: 'from-red-900/40 to-slate-900',
    borderColor: 'border-red-500/60',
    textColor: 'text-red-400',
    icon: '🧬',
    description: 'Châssis organo-mécaniques, autoréparation brutale et ripostes agressives.',
    advantageAgainst: 'SOLARPULSE',
  },
  SOLARPULSE: {
    id: 'SOLARPULSE',
    name: 'SolarPulse Dynamics',
    shortName: 'SolarPulse',
    color: '#10b981', // Émeraude
    bgGradient: 'from-emerald-900/40 to-slate-900',
    borderColor: 'border-emerald-500/60',
    textColor: 'text-emerald-400',
    icon: '☀️',
    description: 'Champs déflecteurs ioniques, régénération d\'énergie et modulations de fréquence.',
    advantageAgainst: 'CYBERKINETIC',
  },
  DARKMATTER: {
    id: 'DARKMATTER',
    name: 'DarkMatter Orbital',
    shortName: 'DarkMatter',
    color: '#a855f7', // Violet
    bgGradient: 'from-purple-900/40 to-slate-900',
    borderColor: 'border-purple-500/60',
    textColor: 'text-purple-400',
    icon: '🌌',
    description: 'Faction d\'élite utilisant l\'antimatière, drain d\'énergie et dégâts de fission purs.',
    advantageAgainst: 'STELLARAEGIS',
  },
  STELLARAEGIS: {
    id: 'STELLARAEGIS',
    name: 'StellarAegis Prime',
    shortName: 'StellarAegis',
    color: '#eab308', // Doré
    bgGradient: 'from-yellow-900/40 to-slate-900',
    borderColor: 'border-yellow-500/60',
    textColor: 'text-yellow-400',
    icon: '🛡️',
    description: 'Faction d\'élite aux barrières d\'invulnérabilité stellaire et purifications IEM globales.',
    advantageAgainst: 'DARKMATTER',
  }
};

export const ARCHETYPES = {
  TANK: {
    id: 'TANK',
    name: 'Avant-Garde Lourde',
    icon: '🛡️',
    description: 'Haute résistance structurelle, blindage épais et contrôle de la ligne avant.'
  },
  ASSAULT: {
    id: 'ASSAULT',
    name: 'Unité d\'Assaut',
    icon: '⚔️',
    description: 'Puissance balistique continue et perforation des défenses de première ligne.'
  },
  ASSASSIN: {
    id: 'ASSASSIN',
    name: 'Intercepteur',
    icon: '⚡',
    description: 'Vitesse et taux critique extrêmes, ciblage chirurgical des unités arrière fragiles.'
  },
  ARTILLERY: {
    id: 'ARTILLERY',
    name: 'Artillerie & Siège',
    icon: '💥',
    description: 'Frappes de zone (AoE) dévastatrices et neutralisation électronique de masse.'
  },
  SUPPORT: {
    id: 'SUPPORT',
    name: 'Laboratoire Mobile',
    icon: '🔧',
    description: 'Nano-réparation de coque, dissipation des altérations et surtension d\'énergie alliée.'
  }
};

// 18 Châssis Originaux Définis
export const CHASSIS_DATABASE = [
  // --- CYBERKINETIC ---
  {
    id: 'ck_goliath_01',
    name: 'CK-9000 AegisCore',
    title: 'Forteresse Électromagnétique',
    faction: 'CYBERKINETIC',
    archetype: 'TANK',
    baseStars: 5,
    avatar: '🛡️🚗',
    description: 'Châssis lourd doté d\'une cage de Faraday réactive qui absorbe et réémet les impulsions cinétiques.',
    baseStats: { hp: 12500, atk: 1100, armor: 420, speed: 920, critRate: 0.05, block: 0.35, damageReduction: 0.20 },
    activeSkill: {
      name: 'Champ d\'Onde Déphasé',
      description: 'Inflige 160% d\'ATK aux 2 ennemis avant et active un bouclier absorbant 25% des PV Max pendant 3 tours. 40% de chance d\'infliger Brouillage IEM.',
      energyCost: 100
    },
    passives: [
      { name: 'Blindage Supraconducteur', desc: '+25% HP Max, +15% Déflexion (Block).' },
      { name: 'Contre-Décharge IEM', desc: 'Lorsqu\'il subit un tir critique, riposte avec une décharge infligeant 60% d\'ATK et 20% de chance d\'étourdir l\'attaquant (1 tour).' },
      { name: 'Survie d\'Urgence', desc: 'Si les HP tombent sous 30%, restaure instantanément 25% de ses HP Max (1 fois par combat).' }
    ]
  },
  {
    id: 'ck_specter_02',
    name: 'CyberSpecter RX-7',
    title: 'Intercepteur Furtif',
    faction: 'CYBERKINETIC',
    archetype: 'ASSASSIN',
    baseStars: 5,
    avatar: '🏎️⚡',
    description: 'Véhicule ultra-léger propulsé par turbine plasma, contournant les lignes de front pour frapper l\'arrière-garde.',
    baseStats: { hp: 7800, atk: 2450, armor: 210, speed: 1280, critRate: 0.35, critDmg: 1.80, armorBreak: 0.25 },
    activeSkill: {
      name: 'Tranchant Hyper-Fréquence',
      description: 'Frappe le châssis ennemi ayant le moins de PV pour 380% d\'ATK avec +30% de Taux Critique garanti. Si la cible meurt, gagne 100 d\'énergie.',
      energyCost: 100
    },
    passives: [
      { name: 'Propulsion Cyber-Furtive', desc: '+30% ATK, +60 Vitesse, +15% Taux Critique.' },
      { name: 'Nanocorrosion Perforante', desc: 'Les attaques de base appliquent une Fissuration (DoT) infligeant 75% d\'ATK pendant 2 tours.' },
      { name: 'Surtension d\'Abattage', desc: 'Chaque élimination augmente son ATK de 20% pour le reste du combat (cumulable).' }
    ]
  },
  {
    id: 'ck_storm_03',
    name: 'Vortex-Array ML',
    title: 'Batterie de Brouillage',
    faction: 'CYBERKINETIC',
    archetype: 'ARTILLERY',
    baseStars: 5,
    avatar: '🛰️💥',
    description: 'Plateforme mobile de saturation radar émettant des ondes de résonance qui consument les circuits adverses.',
    baseStats: { hp: 8400, atk: 2100, armor: 240, speed: 1050, critRate: 0.15, skillDmg: 0.40 },
    activeSkill: {
      name: 'Tempête Électro-Magnétique',
      description: 'Frappe l\'ensemble des 6 ennemis pour 135% d\'ATK, avec 35% de chance d\'infliger Impulsion IEM (Stun 1 tour) et -20% d\'Armure.',
      energyCost: 100
    },
    passives: [
      { name: 'Générateur de Résonance', desc: '+20% ATK, +15% Dégâts de Compétence, +15% Résistance IEM.' },
      { name: 'Onde Parasite', desc: 'À la fin de chaque tour, draine 10 d\'énergie au châssis ennemi le plus chargé.' },
      { name: 'Amplificateur de Surcharge', desc: 'Les dégâts contre les cibles sous débuff ou contrôle sont augmentés de 30%.' }
    ]
  },

  // --- IRONFORGE HEAVY ---
  {
    id: 'if_dreadnought_01',
    name: 'IronTitan 155mm',
    title: 'Char de Rupture Lourde',
    faction: 'IRONFORGE',
    archetype: 'TANK',
    baseStars: 5,
    avatar: '🚜🛡️',
    description: 'Une masse de 80 tonnes de blindage réactif en tungstène, capable de tenir le front sous un feu d\'artillerie continu.',
    baseStats: { hp: 13800, atk: 1050, armor: 480, speed: 890, block: 0.40, damageReduction: 0.25 },
    activeSkill: {
      name: 'Obusier à Charge Creuse',
      description: 'Tire un obus perforant sur les cibles avant pour 180% d\'ATK et augmente sa propre Réduction de Dégâts de 25% pendant 3 tours.',
      energyCost: 100
    },
    passives: [
      { name: 'Blindage au Carbure de Tungstène', desc: '+30% HP Max, +20% Armure brute.' },
      { name: 'Riposte Percutante', desc: 'Chaque attaque bloquée (Block) déclenche une riposte automatique infligeant 80% d\'ATK à l\'attaquant.' },
      { name: 'Bastion Inébranlable', desc: 'Immunisé aux effets de Gel (Cryo) et gagne +15% de Résistance IEM.' }
    ]
  },
  {
    id: 'if_vulcan_02',
    name: 'Vulcan-X Rotary',
    title: 'Véhicule d\'Assaut Gatling',
    faction: 'IRONFORGE',
    archetype: 'ASSAULT',
    baseStars: 5,
    avatar: '🚙🔥',
    description: 'Équipé d\'une double batterie rotative 30mm à haute vélocité, déchiquetant les blindages ennemis couche par couche.',
    baseStats: { hp: 9200, atk: 2300, armor: 280, speed: 1120, critRate: 0.25, armorBreak: 0.35 },
    activeSkill: {
      name: 'Déluge Balistique',
      description: 'Délivre une salve continue sur 3 cibles aléatoires pour 240% d\'ATK et déchiquette 30% de leur blindage pour 3 tours.',
      energyCost: 100
    },
    passives: [
      { name: 'Munitions Perforantes Uranium', desc: '+25% ATK, +20% Perforation d\'Armure.' },
      { name: 'Cadence Accélérée', desc: 'Chaque coup critique augmente sa Vitesse de 30 et son Taux Critique de 5% (cumulable 4 fois).' },
      { name: 'Tir d\'Interdiction', desc: 'Les attaques de base ont 50% de chance d\'attaquer une seconde fois.' }
    ]
  },
  {
    id: 'if_mortar_03',
    name: 'SiegeHowitzer 400',
    title: 'Plateforme Balistique Lourde',
    faction: 'IRONFORGE',
    archetype: 'ARTILLERY',
    baseStars: 5,
    avatar: '🚚💥',
    description: 'Mortier thermique lourd déployable, frappant l\'ensemble du théâtre d\'opérations avec des ogives incendiaires.',
    baseStats: { hp: 8600, atk: 2250, armor: 260, speed: 980, critRate: 0.20, critDmg: 1.65 },
    activeSkill: {
      name: 'Salbe Thermobarrique',
      description: 'Bombarde toute l\'équipe adverse pour 150% d\'ATK et applique une Brûlure Plasma infligeant 60% d\'ATK par tour pendant 3 tours.',
      energyCost: 100
    },
    passives: [
      { name: 'Calibrage de Portée', desc: '+25% ATK, +15% HP Max.' },
      { name: 'Composé Incendiaire', desc: 'Augmente de 40% les dégâts infligés aux cibles en feu.' },
      { name: 'Ogive à Sous-Munitions', desc: 'À la mort d\'un ennemi, inflige 100% d\'ATK à tous les survivants.' }
    ]
  },

  // --- BIOMECH INDUSTRIES ---
  {
    id: 'bm_behemoth_01',
    name: 'BioBehemoth B-6',
    title: 'Cuirassé à Régénération',
    faction: 'BIOMECH',
    archetype: 'TANK',
    baseStars: 5,
    avatar: '🦖🛡️',
    description: 'Châssis symbiotique recouvert de fibres musculaires synthétiques capables de colmater instantanément les brèches.',
    baseStats: { hp: 14500, atk: 980, armor: 390, speed: 910, block: 0.25, damageReduction: 0.20 },
    activeSkill: {
      name: 'Frénésie Régénératrice',
      description: 'Frappe la première ligne pour 170% d\'ATK et active une régénération cellulaire restaurant 30% des dégâts infligés + 15% HP Max sur 3 tours.',
      energyCost: 100
    },
    passives: [
      { name: 'Cellules Autoréparatrices', desc: '+35% HP Max. Restaure 4% de ses HP Max au début de chaque tour.' },
      { name: 'Épine Musculaire Réactive', desc: 'Quand il subit des dégâts, inflige un Saignement (Bleed) à l\'attaquant (40% ATK sur 2 tours).' },
      { name: 'Fureur de Survie', desc: 'Plus ses PV sont bas, plus son Attaque et son Armure augmentent (jusqu\'à +50%).' }
    ]
  },
  {
    id: 'bm_predator_02',
    name: 'Raptor-Claw 4x4',
    title: 'Chasseur Tout-Terrain',
    faction: 'BIOMECH',
    archetype: 'ASSASSIN',
    baseStars: 5,
    avatar: '🛻⚡',
    description: 'Véhicule d\'assaut agile doté de pinces hydrauliques perforantes ciblant systématiquement les cibles blessées.',
    baseStats: { hp: 7900, atk: 2500, armor: 220, speed: 1260, critRate: 0.30, critDmg: 1.75 },
    activeSkill: {
      name: 'Broyeur Hydraulique',
      description: 'Attaque la cible avec le moins de HP pour 350% d\'ATK. Inflige +50% de dégâts supplémentaires si la cible a moins de 50% HP.',
      energyCost: 100
    },
    passives: [
      { name: 'Instinct Carnassier', desc: '+25% ATK, +50 Vitesse, +15% Taux Critique.' },
      { name: 'Venin Neuro-Corrosif', desc: 'Les attaques critiques réduisent l\'ATK de la cible de 20% pendant 2 tours.' },
      { name: 'Absorption de Matière', desc: 'Soigne le Raptor-Claw de 50% des dégâts infligés par ses coups critiques.' }
    ]
  },
  {
    id: 'bm_repair_03',
    name: 'BioRig Nano-Lab',
    title: 'Plateforme Médicale Mobile',
    faction: 'BIOMECH',
    archetype: 'SUPPORT',
    baseStars: 5,
    avatar: '🚑🔧',
    description: 'Laboratoire mobile déployant des nanorobots de réparation et des stimulants chimiques d\'énergie pour la flotte.',
    baseStats: { hp: 10200, atk: 1650, armor: 320, speed: 1080, damageReduction: 0.15 },
    activeSkill: {
      name: 'Injection d\'Essaim Bio-Nano',
      description: 'Restaure 220% d\'ATK en HP aux 3 alliés les plus endommagés et leur confère +20% d\'ATK pendant 3 tours.',
      energyCost: 100
    },
    passives: [
      { name: 'Bioréacteur d\'Assistance', desc: '+25% HP Max, +15% Puissance de Soin.' },
      { name: 'Purgeur de Toxines', desc: 'Chaque tour, dissipe 1 altération d\'état (IEM/Gel/Silence) sur l\'allié le plus fort.' },
      { name: 'Onde Revigorante', desc: 'Les attaques de base restaurent 30 d\'énergie à un allié aléatoire en plus du tir.' }
    ]
  },

  // --- SOLARPULSE DYNAMICS ---
  {
    id: 'sp_mirage_01',
    name: 'SolarAegis Prism',
    title: 'Déflecteur Photovoltaïque',
    faction: 'SOLARPULSE',
    archetype: 'SUPPORT',
    baseStars: 5,
    avatar: '🚐☀️',
    description: 'Véhicule expérimental canalisant l\'énergie solaire pour créer des prismes réfractaires protégeant toute l\'équipe.',
    baseStats: { hp: 11000, atk: 1550, armor: 340, speed: 1100, damageReduction: 0.20 },
    activeSkill: {
      name: 'Prisme de Déviation Totale',
      description: 'Déploie un bouclier sur toute l\'équipe absorbant 180% d\'ATK en dégâts et confère +30 d\'énergie à tous les alliés.',
      energyCost: 100
    },
    passives: [
      { name: 'Panneaux Haute Efficacité', desc: '+20% HP Max, +30 Vitesse de Traitement.' },
      { name: 'Flash Aveuglant', desc: 'Lorsque le bouclier se brise, inflige Silence (1 tour, 40% chance) aux attaquants.' },
      { name: 'Aura Photolithique', desc: 'Augmente passivement la Précision et le Taux Critique de toute l\'équipe de 10%.' }
    ]
  },
  {
    id: 'sp_helios_02',
    name: 'Helios Ray Cannon',
    title: 'Châssis Laser Solaire',
    faction: 'SOLARPULSE',
    archetype: 'ASSAULT',
    baseStars: 5,
    avatar: '🏎️☀️',
    description: 'Châssis d\'assaut rapide équipé d\'un canon à focalisation laser alimenté par supraconducteurs thermiques.',
    baseStats: { hp: 8800, atk: 2400, armor: 250, speed: 1200, critRate: 0.25, critDmg: 1.70 },
    activeSkill: {
      name: 'Rayon de Focalisation Pure',
      description: 'Tire un rayon laser continu sur toute la ligne ennemie la plus peuplée pour 210% d\'ATK avec 50% de pénétration d\'armure.',
      energyCost: 100
    },
    passives: [
      { name: 'Condensateur Solaire', desc: '+25% ATK, +15% Vitesse.' },
      { name: 'Surchauffe Cutanée', desc: 'Chaque tir applique une Brûlure Solaire infligeant 50% d\'ATK (ignorant l\'armure).' },
      { name: 'Rayonnement Réfracté', desc: 'Si le tir est un coup critique, gagne instantanément 40 d\'énergie.' }
    ]
  },
  {
    id: 'sp_eclipse_03',
    name: 'Aurora SoundWave',
    title: 'Disrupteur Sonique',
    faction: 'SOLARPULSE',
    archetype: 'ARTILLERY',
    baseStars: 5,
    avatar: '🚎📡',
    description: 'Émetteur d\'ondes soniques à basse fréquence qui déstabilise la cohésion moléculaire des boucliers adverses.',
    baseStats: { hp: 8900, atk: 2150, armor: 260, speed: 1060, skillDmg: 0.35 },
    activeSkill: {
      name: 'Impulsion Sonique Résonante',
      description: 'Frappe tous les ennemis pour 140% d\'ATK, brise instantanément leurs boucliers et a 45% de chance de Silence (1 tour).',
      energyCost: 100
    },
    passives: [
      { name: 'Modulateur Harmonique', desc: '+20% ATK, +20% Résistance IEM.' },
      { name: 'Écho Déboussolant', desc: 'Réduit la Vitesse de toute l\'équipe ennemie de 40 points pendant le combat.' },
      { name: 'Harmonie de Flotte', desc: 'Augmente les soins reçus par tous les alliés de 25%.' }
    ]
  },

  // --- DARKMATTER ORBITAL (ÉLITE) ---
  {
    id: 'dm_singularity_01',
    name: 'VoidReaper Omega',
    title: 'Destructeur à Antimatière',
    faction: 'DARKMATTER',
    archetype: 'ASSASSIN',
    baseStars: 5,
    avatar: '🛸🌌',
    description: 'Véhicule orbital équipé d\'un réacteur à singularité créant des micro trous noirs à l\'impact.',
    baseStats: { hp: 9500, atk: 2800, armor: 290, speed: 1320, critRate: 0.40, critDmg: 2.00, trueDamage: 0.25 },
    activeSkill: {
      name: 'Singularité d\'Éradication',
      description: 'Frappe les 2 ennemis les plus puissants pour 320% d\'ATK en Dégâts Bruts (True Damage). Vole 50 d\'énergie à chaque cible touchée.',
      energyCost: 100
    },
    passives: [
      { name: 'Horizon des Événements', desc: '+35% ATK, +20% Taux Critique, +25% Dégâts Bruts.' },
      { name: 'Néant Rémanent', desc: 'Chaque fois qu\'une unité ennemie ou alliée est détruite, VoidReaper gagne +15% ATK et restaure 20% HP.' },
      { name: 'Déphasage Quantique', desc: 'Immunisé à la première attaque fatale (reste à 1 HP et devient intouchable 1 tour).' }
    ]
  },
  {
    id: 'dm_abyss_02',
    name: 'Abyssal Titan X',
    title: 'Colosse à Gravité Inversée',
    faction: 'DARKMATTER',
    archetype: 'TANK',
    baseStars: 5,
    avatar: '🚜🌌',
    description: 'Monstre mécanique déformant l\'espace-temps autour de sa coque pour rediriger les tirs ennemis vers le néant.',
    baseStats: { hp: 16000, atk: 1200, armor: 520, speed: 940, damageReduction: 0.30, controlImmune: 0.30 },
    activeSkill: {
      name: 'Puits Gravitationnel',
      description: 'Attire l\'ensemble des 6 ennemis pour 150% d\'ATK, force les tirs sur lui-même (Taunt 2 tours) et gagne 50% de Réduction de Dégâts.',
      energyCost: 100
    },
    passives: [
      { name: 'Masse Inerte Déformée', desc: '+40% HP Max, +30% Résistance IEM globale.' },
      { name: 'Réfraction Gravitationnelle', desc: 'Renvoie 35% de tous les dégâts subis aux attaquants sous forme de Dégâts Bruts.' },
      { name: 'Effondrement Terminal', desc: 'À sa destruction, explose et inflige 250% d\'ATK à tous les ennemis.' }
    ]
  },
  {
    id: 'dm_nebula_03',
    name: 'Orbital Nullifier',
    title: 'Plateforme de Dissolution',
    faction: 'DARKMATTER',
    archetype: 'ARTILLERY',
    baseStars: 5,
    avatar: '🛰️🌌',
    description: 'Relais orbital tirant des faisceaux de désintégration atomique couvrant l\'intégralité du champ de bataille.',
    baseStats: { hp: 9100, atk: 2600, armor: 270, speed: 1140, critRate: 0.25, skillDmg: 0.45 },
    activeSkill: {
      name: 'Faisceau d\'Antimatière Lourde',
      description: 'Désintègre tous les ennemis pour 175% d\'ATK et applique Surchauffe (annule tout gain d\'énergie pendant 1 tour pour les cibles touchées).',
      energyCost: 100
    },
    passives: [
      { name: 'Matrice de Dissolution', desc: '+30% ATK, +20% Dégâts de Compétence.' },
      { name: 'Entropie Croissante', desc: 'Les dégâts de l\'équipe augmentent de 5% par tour écoulé (max +50%).' },
      { name: 'Suppression Totale', desc: 'Les ennemis sous l\'effet de Surchauffe subissent +30% de dégâts de toutes sources.' }
    ]
  },

  // --- STELLARAEGIS PRIME (ÉLITE) ---
  {
    id: 'sa_chronos_01',
    name: 'Chronos Prime Archon',
    title: 'Vaisseau Amiral Suprême',
    faction: 'STELLARAEGIS',
    archetype: 'SUPPORT',
    baseStars: 5,
    avatar: '🛸👑',
    description: 'Châssis amiral doté d\'une horloge quantique capable de remonter le temps structurel des unités détruites.',
    baseStats: { hp: 12800, atk: 1800, armor: 380, speed: 1220, controlImmune: 0.50, damageReduction: 0.25 },
    activeSkill: {
      name: 'Restauration Chrono-Quantique',
      description: 'Restaure 250% d\'ATK en HP à toute l\'équipe, dissipe TOUS les débuffs et réactive le premier allié détruit avec 40% de ses HP (1 fois/combat).',
      energyCost: 100
    },
    passives: [
      { name: 'Noyau Stellaire Éternel', desc: '+35% HP Max, +50% Résistance IEM, +20 Vitesse.' },
      { name: 'Bénédiction d\'Archon', desc: 'Confère passivement +15% ATK et +15% Réduction de Dégâts à tous les alliés.' },
      { name: 'Aegis Sacré', desc: 'Déploie une barrière d\'invulnérabilité de 1 tour sur l\'allié ayant le moins de HP lorsqu\'il est proche de mourir.' }
    ]
  },
  {
    id: 'sa_valkyrie_02',
    name: 'Valkyrie-Spear Mk.IV',
    title: 'Chasseur de Faisceau Radiant',
    faction: 'STELLARAEGIS',
    archetype: 'ASSAULT',
    baseStars: 5,
    avatar: '🏎️✨',
    description: 'Châssis stellaire ultra-précis utilisant des lances d\'énergie pure capables de traverser n\'importe quel blindage.',
    baseStats: { hp: 9900, atk: 2750, armor: 310, speed: 1240, critRate: 0.35, critDmg: 1.90, armorBreak: 0.40 },
    activeSkill: {
      name: 'Lance Stellaire Percutante',
      description: 'Transperce 3 ennemis alignés pour 280% d\'ATK avec 100% de pénétration d\'armure et applique Aveuglement Télémétrique (-40% Précision ennemie).',
      energyCost: 100
    },
    passives: [
      { name: 'Focalisation Divine', desc: '+30% ATK, +20% Coup Critique, +20% Perforation.' },
      { name: 'Radiance Purifiante', desc: 'Les tirs ont 50% de chance de dissiper tous les boucliers et buffs sur la cible.' },
      { name: 'Jugement Lumineux', desc: 'Les coups critiques restaurent 20 d\'énergie à toute l\'équipe.' }
    ]
  },
  {
    id: 'sa_paladin_03',
    name: 'Paladin Bastion IX',
    title: 'Garde Stellaire Blindé',
    faction: 'STELLARAEGIS',
    archetype: 'TANK',
    baseStars: 5,
    avatar: '🛡️✨',
    description: 'Forteresse mobile recouverte de feuilles d\'or résonantes et d\'émetteurs de champs barrières infranchissables.',
    baseStats: { hp: 15500, atk: 1150, armor: 500, speed: 960, block: 0.45, damageReduction: 0.30 },
    activeSkill: {
      name: 'Rempart de Lumière Stellaire',
      description: 'Inflige 160% d\'ATK à la ligne avant et absorbe 50% des dégâts subis par les alliés de la ligne arrière pendant 2 tours.',
      energyCost: 100
    },
    passives: [
      { name: 'Carénage d\'Aegis', desc: '+35% HP Max, +25% Déflexion.' },
      { name: 'Réflecteur d\'Énergie Pure', desc: 'Chaque attaque bloquée augmente son Armure de 10% (cumulable jusqu\'à 50%).' },
      { name: 'Protection Finale', desc: 'À sa mort, confère un bouclier égal à 40% de ses HP Max à tous les alliés survivants.' }
    ]
  }
];

// Base d'Équipements et Artefacts
export const GEAR_SETS = {
  WEAPONS: [
    { id: 'w_1', name: 'Canon Autocannon 20mm', stars: 1, atk: 150, skillDmg: 0.05 },
    { id: 'w_2', name: 'Batterie Gatling 30mm', stars: 2, atk: 350, skillDmg: 0.10 },
    { id: 'w_3', name: 'Canon Railgun Cinétique 75mm', stars: 3, atk: 800, skillDmg: 0.15 },
    { id: 'w_4', name: 'Projecteur Plasma 155mm', stars: 4, atk: 1500, skillDmg: 0.20 },
    { id: 'w_5', name: 'Dévastateur à Antimatière Mk.V', stars: 5, atk: 2800, skillDmg: 0.30, critRate: 0.10 }
  ],
  ARMOR: [
    { id: 'a_1', name: 'Plaques d\'Acier Standard', stars: 1, hp: 1200, armor: 50 },
    { id: 'a_2', name: 'Blindage Titane Réactif', stars: 2, hp: 2800, armor: 120 },
    { id: 'a_3', name: 'Cloison Nanotubes de Carbone', stars: 3, hp: 6000, armor: 240 },
    { id: 'a_4', name: 'Matrice Composite Céramique', stars: 4, hp: 12000, armor: 400, damageReduction: 0.05 },
    { id: 'a_5', name: 'Blindage Déphasé Stellaire', stars: 5, hp: 22000, armor: 650, damageReduction: 0.12 }
  ],
  PROPULSION: [
    { id: 'p_1', name: 'Moteur Combustion V8 Turbo', stars: 1, hp: 800, speed: 20 },
    { id: 'p_2', name: 'Transmission Électrique Haute Puissance', stars: 2, hp: 1800, speed: 45 },
    { id: 'p_3', name: 'Propulseur Ionique à Double Flux', stars: 3, hp: 4200, speed: 80 },
    { id: 'p_4', name: 'Noyau à Lévitation Magnétique', stars: 4, hp: 8500, speed: 120 },
    { id: 'p_5', name: 'Générateur de Distorsion Warp', stars: 5, hp: 15000, speed: 180, critRate: 0.05 }
  ],
  TELEMETRY: [
    { id: 't_1', name: 'Radar Optique Doppler', stars: 1, atk: 100, critRate: 0.03 },
    { id: 't_2', name: 'Télémètre Laser Haute Définition', stars: 2, atk: 250, critRate: 0.06 },
    { id: 't_3', name: 'Matrice de Visée Thermique IA', stars: 3, atk: 600, critRate: 0.10, armorBreak: 0.08 },
    { id: 't_4', name: 'Calculateur Quantique de Balistique', stars: 4, atk: 1200, critRate: 0.15, armorBreak: 0.15 },
    { id: 't_5', name: 'Système de Guidage Orbital Omniscient', stars: 5, atk: 2200, critRate: 0.22, critDmg: 0.25 }
  ]
};

export const ARTIFACTS = [
  {
    id: 'art_quick_charge',
    name: 'Condensateur à Décharge Rapide',
    icon: '⚡',
    type: 'ENERGY',
    stars: 5,
    effect: 'Confère +50 Énergie de départ et +35% Dégâts d\'Ultime. Permet de tirer l\'Ultime dès le Tour 1 !',
    stats: { initialEnergy: 50, skillDmg: 0.35, atk: 800 }
  },
  {
    id: 'art_deflector_shield',
    name: 'Barrière Déflectrice Ionique',
    icon: '🛡️',
    type: 'DEFENSE',
    stars: 5,
    effect: '+25% Réduction de Dégâts globale et +20% HP Structurels.',
    stats: { damageReduction: 0.25, hpPercent: 0.20, hp: 10000 }
  },
  {
    id: 'art_nano_injector',
    name: 'Injecteur d\'Essaim Nano-Médical',
    icon: '🧪',
    type: 'HEAL',
    stars: 5,
    effect: 'Restaure 15% des HP Max à chaque round et augmente la puissance des soins de 30%.',
    stats: { healBoost: 0.30, hp: 8000, atk: 600 }
  },
  {
    id: 'art_cpu_overclock',
    name: 'Processeur Quantique Surchargé',
    icon: '💻',
    type: 'SPEED',
    stars: 5,
    effect: '+90 Vitesse de Traitement et +20% Taux Critique.',
    stats: { speed: 90, critRate: 0.20, atk: 900 }
  }
];
