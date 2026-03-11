import { useState, useEffect } from 'react';
import { colors } from '../../styles/colors';

export default function BalanceModal({ 
  isOpen, 
  onClose, 
  allAccounts, 
  selectedAccounts, 
  setSelectedAccounts 
}) {
  const [modalHeight, setModalHeight] = useState(393);
  const [isModalDragging, setIsModalDragging] = useState(false);
  const [modalStartY, setModalStartY] = useState(0);
  const [modalStartHeight, setModalStartHeight] = useState(393);
  const [tempSelectedAccounts, setTempSelectedAccounts] = useState(selectedAccounts);

  const MODAL_MIN_HEIGHT = 393;
  const MODAL_MAX_HEIGHT = 750;

  // Reset temp selection and modal height when modal opens
  useEffect(() => {
    if (isOpen) {
      setTempSelectedAccounts(selectedAccounts);
      setModalHeight(MODAL_MIN_HEIGHT);
    }
  }, [isOpen, selectedAccounts]);

  const handleModalMouseDown = (e) => {
    setIsModalDragging(true);
    setModalStartY(e.clientY);
    setModalStartHeight(modalHeight);
  };

  const handleModalMouseMove = (e) => {
    if (!isModalDragging) return;
    const deltaY = modalStartY - e.clientY;
    let newHeight = modalStartHeight + deltaY;
    newHeight = Math.max(MODAL_MIN_HEIGHT, Math.min(MODAL_MAX_HEIGHT, newHeight));
    setModalHeight(newHeight);
  };

  const handleModalMouseUp = () => {
    setIsModalDragging(false);
  };

  const handleModalTouchStart = (e) => {
    setIsModalDragging(true);
    setModalStartY(e.touches[0].clientY);
    setModalStartHeight(modalHeight);
  };

  const handleModalTouchMove = (e) => {
    if (!isModalDragging) return;
    const deltaY = modalStartY - e.touches[0].clientY;
    let newHeight = modalStartHeight + deltaY;
    newHeight = Math.max(MODAL_MIN_HEIGHT, Math.min(MODAL_MAX_HEIGHT, newHeight));
    setModalHeight(newHeight);
  };

  const handleModalTouchEnd = () => {
    setIsModalDragging(false);
  };

  useEffect(() => {
    if (isModalDragging) {
      document.addEventListener('mousemove', handleModalMouseMove);
      document.addEventListener('mouseup', handleModalMouseUp);
      document.addEventListener('touchmove', handleModalTouchMove, { passive: false });
      document.addEventListener('touchend', handleModalTouchEnd);
      return () => {
        document.removeEventListener('mousemove', handleModalMouseMove);
        document.removeEventListener('mouseup', handleModalMouseUp);
        document.removeEventListener('touchmove', handleModalTouchMove);
        document.removeEventListener('touchend', handleModalTouchEnd);
      };
    }
  }, [isModalDragging, modalStartY, modalStartHeight, modalHeight]);

  const handleClose = () => {
    setSelectedAccounts(tempSelectedAccounts);
    onClose();
  };

  const formatCurrency = (amount) => {
    return '£' + amount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  if (!isOpen) return null;

  // Group accounts by company
  const companiesList = [...new Set(allAccounts.map(acc => acc.company))];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      width: '390px',
      height: '100dvh',
      pointerEvents: 'none',
      zIndex: 100
    }}>
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0,
          right: 0,
          bottom: 0, 
          backgroundColor: 'rgba(0, 0, 0, 0.4)', 
          animation: 'fadeIn 0.3s ease',
          pointerEvents: 'auto'
        }} 
      />
      
      {/* Modal */}
      <div style={{ 
        position: 'absolute', 
        left: 0,
        right: 0,
        bottom: 0, 
        height: modalHeight + 'px',
        backgroundColor: colors.brightwhite, 
        borderRadius: '24px 24px 0 0', 
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 -4px 24px 0 rgba(0, 0, 0, 0.15)',
        animation: 'slideUp 0.4s cubic-bezier(0.32, 0.72, 0, 1)',
        transition: isModalDragging ? 'none' : 'height 0.3s ease',
        pointerEvents: 'auto'
      }}>
        {/* Drag Handle */}
        <div 
          onMouseDown={handleModalMouseDown}
          onTouchStart={handleModalTouchStart}
          style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            paddingTop: '12px', 
            paddingBottom: '12px', 
            cursor: 'grab',
            touchAction: 'none'
          }}
        >
          <div style={{ backgroundColor: colors.grey300, width: '48px', height: '4px', borderRadius: '50px' }}></div>
        </div>

        {/* Modal Header */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '12px 16px 24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: colors.black, margin: 0 }}>
            Select accounts to include
          </h2>
          <button 
            onClick={handleClose}
            style={{ 
              backgroundColor: colors.grey100, 
              border: 'none', 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={colors.black} strokeWidth="2">
              <line x1="2" y1="2" x2="14" y2="14"/>
              <line x1="14" y1="2" x2="2" y2="14"/>
            </svg>
          </button>
        </div>

        {/* Account List */}
        <div style={{ 
          flex: 1, 
          overflowY: modalHeight >= MODAL_MAX_HEIGHT - 50 ? 'auto' : 'hidden',
          padding: '0 16px 24px'
        }} className="scrollbar-hide">
          {companiesList.map(companyName => {
            const companyAccounts = allAccounts.filter(acc => acc.company === companyName);
            
            return (
              <div key={companyName} style={{ marginBottom: '24px' }}>
                <div style={{ 
                  fontSize: '14px', 
                  fontWeight: 600, 
                  color: colors.black, 
                  marginBottom: '12px',
                  paddingLeft: '4px'
                }}>
                  {companyName}
                </div>
                
                {companyAccounts.map(account => {
                  const isSelected = tempSelectedAccounts.includes(account.id);
                  
                  return (
                    <button
                      key={account.id}
                      onClick={() => {
                        setTempSelectedAccounts(prev => 
                          prev.includes(account.id)
                            ? prev.filter(id => id !== account.id)
                            : [...prev, account.id]
                        );
                      }}
                      style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px',
                        marginBottom: '8px',
                        backgroundColor: colors.grey100,
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ 
                        fontSize: '16px', 
                        fontWeight: 500, 
                        color: colors.black,
                        textAlign: 'left'
                      }}>
                        {account.title}
                      </div>
                      
                      {/* iOS-style Toggle Switch */}
                      <div style={{
                        width: '51px',
                        height: '31px',
                        borderRadius: '15.5px',
                        backgroundColor: isSelected ? colors.springgreen : colors.grey300,
                        position: 'relative',
                        transition: 'background-color 0.3s ease',
                        flexShrink: 0
                      }}>
                        <div style={{
                          width: '27px',
                          height: '27px',
                          borderRadius: '50%',
                          backgroundColor: colors.brightwhite,
                          position: 'absolute',
                          top: '2px',
                          left: isSelected ? '22px' : '2px',
                          transition: 'left 0.3s ease',
                          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                        }} />
                      </div>
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}