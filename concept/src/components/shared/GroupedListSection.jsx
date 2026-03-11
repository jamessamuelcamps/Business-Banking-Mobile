import React from 'react';

const GroupedListSection = ({ 
  title, 
  colors, 
  children,
  marginBottom = '24px',
  showMenuButton = true,
  onMenuClick
}) => {
  return (
    <div style={{ marginBottom }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        marginBottom: '16px' 
      }}>
        <h2 style={{ fontSize: '16px', color: colors.black, fontWeight: 600 }}>
          {title}
        </h2>
        {showMenuButton && (
          <button 
            onClick={onMenuClick}
            style={{ 
              color: colors.black, 
              background: 'none', 
              border: 'none', 
              padding: 0,
              cursor: 'pointer'
            }}
          >
            <svg width="4" height="16" fill="currentColor">
              <circle cx="2" cy="2" r="2"/>
              <circle cx="2" cy="8" r="2"/>
              <circle cx="2" cy="14" r="2"/>
            </svg>
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default GroupedListSection;
