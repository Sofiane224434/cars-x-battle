import express from 'express';

const router = express.Router();

// Données d'état général du jeu
router.get('/info', (req, res) => {
  res.json({
    gameTitle: 'Cars x Battle',
    version: '1.0.0-beta.demo',
    status: 'operational',
    universe: 'Hard Sci-Fi / Autonomous Tactical Vehicles',
    features: [
      '6v6 Automated Tactical Battle Simulator',
      '6 Megacorp Manufacturers & Fleet Auras',
      '5 Strategic Combat Archetypes',
      '1 to 15 Stars Quantum Overclocking',
      'Orbital Gacha Acquisition Matrix',
      'AFK Automated Extraction Campaign',
      'Asynchronous Arena & ELO Ladder',
      'Consortium Fleet Engineering Lab'
    ]
  });
});

// Endpoint de validation d'état
router.get('/ping', (req, res) => {
  res.json({ pong: true, time: new Date().toISOString() });
});

export default router;
