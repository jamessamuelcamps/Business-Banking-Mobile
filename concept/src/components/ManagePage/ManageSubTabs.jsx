import { colors } from '../../styles/colors';

export default function ManageSubTabs({ activeTab, onTabChange }) {
  const tabs = ['Companies', 'Accounts', 'Team', 'Cards', 'Integrations', 'Permissions'];

  return (
    <div 
      className="scrollbar-hide"
      style={{ 
        paddingLeft: '16px', 
        paddingRight: '16px',  
        borderBottom: `1px solid ${colors.grey200}`, 
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch'
      }}
    >
      <div style={{ display: 'flex', gap: '24px', minWidth: 'max-content' }}>
        {tabs.map(tab => (
          <button 
            key={tab} 
            onClick={() => onTabChange(tab)}
            style={{ 
              fontSize: '14px', 
              fontWeight: 500, 
              color: activeTab === tab ? colors.black : colors.grey600,
              background: 'none', 
              border: 'none', 
              cursor: 'pointer',
              paddingBottom: '12px',
              borderBottom: activeTab === tab ? `2px solid ${colors.aquamarine}` : `2px solid ${colors.white}`,
              whiteSpace: 'nowrap',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}