import React, { useState } from 'react';
import TopBar from './TopBar.jsx';
import BottomNav from './BottomNav.jsx';
import LobbyView from './views/LobbyView.jsx';
import RosterView from './views/RosterView.jsx';
import BattleView from './views/BattleView.jsx';
import GachaView from './views/GachaView.jsx';
import GuildView from './views/GuildView.jsx';

const TABS = ['lobby', 'roster', 'battle', 'gacha', 'guild'];

function GameShell() {
  const [activeTab, setActiveTab] = useState('lobby');

  const renderView = () => {
    switch (activeTab) {
      case 'lobby':  return <LobbyView />;
      case 'roster': return <RosterView />;
      case 'battle': return <BattleView />;
      case 'gacha':  return <GachaView />;
      case 'guild':  return <GuildView />;
      default:       return <LobbyView />;
    }
  };

  return (
    <div className="game-shell">
      <TopBar />
      <div className="main-viewport">
        <div key={activeTab} className="view-enter" style={{ position: 'absolute', inset: 0 }}>
          {renderView()}
        </div>
      </div>
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}

export default GameShell;
