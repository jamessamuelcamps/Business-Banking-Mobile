import React from 'react';
import { ChevronRight } from 'lucide-react';

const GroupedListItem = ({ 
  item, 
  index, 
  totalItems, 
  colors,
  renderContent,
  showChevron = true,  // Default to true
  onClick  // ADD THIS
}) => {
  const isFirst = index === 0;
  const isLast = index === totalItems - 1;
  const isSingle = totalItems === 1;
  
  const borderRadius = isSingle ? '12px' : 
                       isFirst ? '12px 12px 0 0' : 
                       isLast ? '0 0 12px 12px' : '0';

  return (
    <div 
      onClick={onClick}  // ADD THIS LINE
      style={{ 
        paddingLeft: '16px', 
        paddingRight: '16px', 
        paddingTop: '12px', 
        paddingBottom: '12px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        backgroundColor: colors.grey100,
        borderRadius: borderRadius,
        borderTop: !isFirst ? '1px solid ' + colors.white : 'none',
        cursor: onClick ? 'pointer' : 'default'  // ADD THIS LINE to show it's clickable
      }}
    >
      {renderContent(item)}
      {showChevron && <ChevronRight size={20} style={{ color: colors.black }} />}
    </div>
  );
};

export default GroupedListItem;