import { useState } from 'react';
import { colors } from '../styles/colors';
import StatusBar from './shared/StatusBar';
import ManageHeader from './ManagePage/ManageHeader';
import ManageSubTabs from './ManagePage/ManageSubTabs';
import CompaniesContent from './ManagePage/CompaniesContent';
import AccountsContent from './ManagePage/AccountsContent';
import CardsContent from './ManagePage/CardsContent';
import TeamContent from './ManagePage/TeamContent';
import IntegrationsContent from './ManagePage/IntegrationsContent';

export default function ManagePage({ openModal }) {  // ADD openModal prop here
  const [activeSubTab, setActiveSubTab] = useState('Companies');

  const renderContent = () => {
    switch (activeSubTab) {
      case 'Companies':
        return <CompaniesContent />;
      case 'Accounts':
        return <AccountsContent openModal={openModal} />;  // PASS openModal here
      case 'Cards':
        return <CardsContent openModal={openModal} />;    // PASS openModal here too
      case 'Team':
        return <TeamContent />;
      case 'Integrations':
        return <IntegrationsContent />;
      default:
        return <AccountsContent openModal={openModal} />;  // PASS openModal here
    }
  };

  return (
    <div style={{ 
      width: '390px',
      maxWidth: '390px', 
      margin: '0 auto', 
      height: '844px', 
      fontFamily: "'Manrope', sans-serif", 
      backgroundColor: colors.white, 
      position: 'relative', 
      overflow: 'hidden'
    }}>
      <StatusBar />

      <div style={{ paddingTop: '44px', height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header Section */}
        <div style={{
          backgroundColor: colors.white,
          zIndex: 10,
          flexShrink: 0
        }}>
          <ManageHeader />
          <ManageSubTabs activeTab={activeSubTab} onTabChange={setActiveSubTab} />
        </div>

        {/* Scrollable Content */}
        <div 
          className="scrollbar-hide"
          style={{ 
            flex: 1,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '24px'
          }}
        >
          {renderContent()}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        } 
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
}