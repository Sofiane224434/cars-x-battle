import React from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout.jsx';
import HubGXB2 from './pages/HubGXB2.jsx';
import Hangar from './pages/Hangar.jsx';
import BattleView from './pages/BattleView.jsx';
import CampaignView from './pages/CampaignView.jsx';
import GachaView from './pages/GachaView.jsx';
import ArenaView from './pages/ArenaView.jsx';
import GuildTechView from './pages/GuildTechView.jsx';
import { GameStateProvider } from './game/gameStateContext.jsx';

function AppContent() {
  const navigate = useNavigate();

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HubGXB2 onNavigate={(dest) => navigate(`/${dest === 'hub' ? '' : dest}`)} />} />
        <Route path="/hangar" element={<Hangar />} />
        <Route path="/battle" element={<BattleView />} />
        <Route path="/campaign" element={<CampaignView />} />
        <Route path="/gacha" element={<GachaView />} />
        <Route path="/arena" element={<ArenaView />} />
        <Route path="/guild-tech" element={<GuildTechView />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

function App() {
  return (
    <GameStateProvider>
      <AppContent />
    </GameStateProvider>
  );
}

export default App;