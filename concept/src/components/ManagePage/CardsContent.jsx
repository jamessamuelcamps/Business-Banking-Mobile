import React from 'react';
import { colors } from '../../styles/colors';
import GroupedListItem from '../shared/GroupedListItem';
import { CardIcon } from '../shared/SvgIcons';

const CardsContent = () => {
  const cardSections = [
    {
      name: 'Active cards',
      cards: [
        { 
          holder: 'Alex Turner',
          lastFour: '4532',
        },
        { 
          holder: 'Joanna Ashford',
          lastFour: '8291',
        }
      ]
    },
    {
      name: 'Blocked cards',
      cards: [
        { 
          holder: 'Brian Murphy',
          lastFour: '1067',
        }
      ]
    },
    {
      name: 'Virtual cards',
      cards: [
        { 
          holder: 'Sarah Johnson',
          lastFour: '3421',
        },
        { 
          holder: 'Michael Chen',
          lastFour: '9876',
        }
      ]
    }
  ];

  return (
    <div style={{ paddingBottom: '96px' }}>
      {cardSections.map((section, sectionIndex) => (
        <div key={sectionIndex}>
          {/* Section name subtitle */}
          <div style={{ 
            fontSize: '14px', 
            color: colors.black, 
            fontWeight: 600,
            paddingLeft: '16px',
            paddingRight: '16px',
            paddingTop: sectionIndex === 0 ? '16px' : '24px',
            paddingBottom: '12px'
          }}>
            {section.name}
          </div>

          {/* Grouped list of cards */}
          <div style={{ paddingLeft: '16px', paddingRight: '16px' }}>
            {section.cards.map((card, index) => (
              <GroupedListItem
                key={index}
                item={card}
                index={index}
                totalItems={section.cards.length}
                colors={colors}
                showChevron={true}
                renderContent={(item) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', flex: 1 }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '8px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <CardIcon size={32} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '16px', color: colors.black, fontWeight: 500, marginBottom: '2px' }}>
                        {item.holder}
                      </div>
                      <div style={{ fontSize: '14px', color: colors.textSecondary, fontWeight: 400 }}>
                        •••• {item.lastFour}
                      </div>
                    </div>
                  </div>
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardsContent;