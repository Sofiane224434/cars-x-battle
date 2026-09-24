import React from 'react';
import { IconHome, IconTank, IconSwords, IconCapsule, IconShield } from './Icons.jsx';

const TABS = [
  { id: 'lobby',  Icon: IconHome,    label: 'Base' },
  { id: 'roster', Icon: IconTank,    label: 'Hangar' },
  { id: 'battle', Icon: IconSwords,  label: 'Combat' },
  { id: 'gacha',  Icon: IconCapsule, label: 'Capsule' },
  { id: 'guild',  Icon: IconShield,  label: 'Alliance' },
];

function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="bottom-nav">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
          data-t={tab.id}
          onClick={() => onTabChange(tab.id)}
        >
          <div className="nav-icon-wrap">
            <tab.Icon />
          </div>
          <span className="nav-label">{tab.label}</span>
          {tab.id === 'gacha' && <span className="nav-dot" />}
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;
