import React, { useState } from 'react';
import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';
import LobbyView from './views/LobbyView.jsx';
import RosterView from './views/RosterView.jsx';
import BattleView from './views/BattleView.jsx';
import GachaView from './views/GachaView.jsx';
import GuildView from './views/GuildView.jsx';
import { useGameStore } from '../gameStore.js';

function GameShell() {
  const [activeTab, setActiveTab] = useState('lobby');
  const gameStore = useGameStore();

  const renderCurrentView = () => {
    switch (activeTab) {
      case 'lobby':
        return (
          <LobbyView
            onNavigate={(tab) => setActiveTab(tab)}
            gameStore={gameStore}
          />
        );
      case 'roster':
        return (
          <RosterView
            onBack={() => setActiveTab('lobby')}
            gameStore={gameStore}
          />
        );
      case 'battle':
        return (
          <BattleView
            onBack={() => setActiveTab('lobby')}
            gameStore={gameStore}
          />
        );
      case 'gacha':
        return (
          <GachaView
            onBack={() => setActiveTab('lobby')}
            gameStore={gameStore}
          />
        );
      case 'guild':
        return (
          <GuildView
            onBack={() => setActiveTab('lobby')}
            gameStore={gameStore}
          />
        );
      case 'bag':
      case 'menu':
      default:
        return (
          <LobbyView
            onNavigate={(tab) => setActiveTab(tab)}
            gameStore={gameStore}
          />
        );
    }
  };

  return (
    <div className="game-shell">
      {/* TopBar matching Screenshot 1 (shown in lobby and default views) */}
      {activeTab !== 'roster' && (
        <TopBar gameStore={gameStore} />
      )}

      {/* Main Viewport */}
      <div className="main-viewport">
        <div key={activeTab} className="view-enter" style={{ position: 'absolute', inset: 0 }}>
          {renderCurrentView()}
        </div>
      </div>

      {/* BottomNav matching Screenshot 1 */}
      {activeTab !== 'roster' && (
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </div>
  );
}

export default GameShell;
