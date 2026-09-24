import React from 'react';
import {
  IconHome, IconTank, IconBag, IconCapsule,
  IconShield, IconMenu
} from './Icons.jsx';

const NAV_TABS = [
  { id: 'lobby',  label: 'Accueil',  Icon: IconHome,    color: '#3388ff' },
  { id: 'roster', label: 'Châssis',  Icon: IconTank,    color: '#ff77aa' },
  { id: 'bag',    label: 'Sac',      Icon: IconBag,     color: '#ff4444' },
  { id: 'gacha',  label: 'Capsule',  Icon: IconCapsule, color: '#ff9900' },
  { id: 'guild',  label: 'Guilde',   Icon: IconShield,  color: '#22cc66' },
  { id: 'menu',   label: 'Menu',     Icon: IconMenu,    color: '#88bb00' }
];

function BottomNav({ activeTab, onTabChange }) {
  return (
    <nav className="gxb-bottom-nav">
      {NAV_TABS.map((tab, index) => {
        const isActive = activeTab === tab.id;
        return (
          <React.Fragment key={tab.id}>
            <button
              onClick={() => onTabChange(tab.id)}
              className={`gxb-nav-item ${isActive ? 'active' : ''}`}
            >
              <div className="nav-item-icon-box">
                <tab.Icon style={{ width: 22, height: 22 }} />
                {tab.id === 'roster' && <span className="nav-badge-dot" />}
              </div>
              <span className="nav-item-text">{tab.label}</span>
            </button>

            {/* Pink dot separator between buttons (from Screenshot 1) */}
            {index < NAV_TABS.length - 1 && (
              <div className="gxb-nav-separator" />
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default BottomNav;
