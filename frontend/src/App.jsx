import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import Hangar from './pages/Hangar.jsx';
import BattleView from './pages/BattleView.jsx';
import CampaignView from './pages/CampaignView.jsx';
import GachaView from './pages/GachaView.jsx';
import ArenaView from './pages/ArenaView.jsx';
import GuildTechView from './pages/GuildTechView.jsx';
import { GameStateProvider } from './game/gameStateContext.jsx';

function App() {
  return (
    <GameStateProvider>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Hangar />} />
          <Route path="/battle" element={<BattleView />} />
          <Route path="/campaign" element={<CampaignView />} />
          <Route path="/gacha" element={<GachaView />} />
          <Route path="/arena" element={<ArenaView />} />
          <Route path="/guild-tech" element={<GuildTechView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </GameStateProvider>
  );
}

export default App;