import { useState, useRef, useEffect } from 'react';
import { colors } from '../../styles/colors';
import AccountsTab from '../Tabs/AccountsTab';
import CashflowTab from '../Tabs/CashflowTab';
import ApprovalsTab from '../Tabs/ApprovalsTab';
import InvoicesTab from '../Tabs/InvoicesTab';

export default function BottomSheet() {
  const [sheetHeight, setSheetHeight] = useState(375);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [startHeight, setStartHeight] = useState(375);
  const [activeTab, setActiveTab] = useState('Accounts');
  const contentRef = useRef(null);

  const COLLAPSED_HEIGHT = 342;
  const EXPANDED_HEIGHT = window.innerHeight;

  useEffect(() => {
    if (activeTab === 'Cashflow') {
      setSheetHeight(Math.min(554, EXPANDED_HEIGHT));
    } else if (activeTab === 'Invoices') {
      setSheetHeight(COLLAPSED_HEIGHT);
    } else if (sheetHeight <= 554) {
      setSheetHeight(COLLAPSED_HEIGHT);
    }
  }, [activeTab]);

  const handleStart = (clientY) => {
    setIsDragging(true);
    setStartY(clientY);
    setStartHeight(sheetHeight);
  };

  const handleMove = (clientY) => {
    if (!isDragging) return;
    const deltaY = startY - clientY;
    let newHeight = startHeight + deltaY;
    newHeight = Math.max(COLLAPSED_HEIGHT, Math.min(EXPANDED_HEIGHT, newHeight));
    setSheetHeight(newHeight);
  };

  const handleEnd = () => {
    setIsDragging(false);
    if (sheetHeight > 422) {
      setSheetHeight(EXPANDED_HEIGHT);
    } else {
      setSheetHeight(COLLAPSED_HEIGHT);
    }
  };

  // Mouse event handlers
  const handleMouseDown = (e) => {
    handleStart(e.clientY);
  };

  const handleMouseMove = (e) => {
    handleMove(e.clientY);
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  // Touch event handlers
  const handleTouchStart = (e) => {
    handleStart(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('touchend', handleTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isDragging, startY, startHeight, sheetHeight]);

  const isExpanded = sheetHeight >= EXPANDED_HEIGHT - 20;

  const tabs = ['Accounts', 'Cashflow', 'Approvals', 'Invoices'];

  return (
    <div style={{ 
      position: 'absolute', 
      left: 0, 
      right: 0, 
      bottom: 0, 
      height: `${sheetHeight}px`, 
      backgroundColor: colors.brightwhite, 
      borderRadius: '24px 24px 0 0', 
      display: 'flex', 
      flexDirection: 'column', 
      boxShadow: '0 0 8px 0 rgba(0, 0, 0, 0.05), 0 -4px 24px 0 rgba(0, 0, 0, 0.08)', 
      transition: 'height 300ms ease',
      zIndex: 50 
    }}>
      <div 
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          paddingTop: '12px', 
          paddingBottom: '24px', 
          cursor: 'grab',
          touchAction: 'none'
        }}
      >
        <div style={{ 
          backgroundColor: colors.grey300, 
          width: '48px', 
          height: '4px', 
          borderRadius: '50px' 
        }} />
      </div>

      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <div style={{ 
          backgroundColor: colors.grey200, 
          padding: '2px', 
          borderRadius: '8px', 
          display: 'flex' 
        }}>
          {tabs.map(tab => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)} 
              style={{ 
                flex: 1, 
                borderRadius: '6px', 
                fontSize: '12px', 
                padding: '4px 0', 
                 
                border: 'none', 
                cursor: 'pointer', 
                backgroundColor: activeTab === tab ? colors.brightwhite : 'transparent', 
                color: activeTab === tab ? colors.black : colors.grey600, 
                boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none' 
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div 
        ref={contentRef} 
        style={{ 
          flex: 1, 
          overflowY: isExpanded ? 'auto' : 'hidden', 
          paddingBottom: '96px'
        }} 
        className="scrollbar-hide"
      >
        {activeTab === 'Accounts' && <AccountsTab />}
        {activeTab === 'Cashflow' && <CashflowTab />}
        {activeTab === 'Approvals' && <ApprovalsTab />}
        {activeTab === 'Invoices' && <InvoicesTab />}
      </div>
    </div>
  );
}