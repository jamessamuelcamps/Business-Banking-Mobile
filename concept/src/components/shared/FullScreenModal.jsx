import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const FullScreenModal = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  showBackButton = false,
  onBack = null,
  backgroundColor = '#F9FAFA'
}) => {
  const [translateY, setTranslateY] = useState(800);

  const colors = {
    brightwhite: '#FFFFFF',
    black: '#1F2020',
    grey300: '#DEDFDF',
    clearblue: '#3280F6',
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setTranslateY(0), 10);
      document.body.style.overflow = 'hidden';
    } else {
      setTranslateY(800);
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => {
    setTranslateY(800);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 100,
        }}
      />

      {/* Modal */}
      <div
        style={{
          position: 'fixed',
          top: '44px',
          left: '50%',
          transform: `translateX(-50%) translateY(${translateY}px)`,
          width: '100%',
          height: 'calc(100dvh - 44px)',
          backgroundColor: backgroundColor,
          transition: 'transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          zIndex: 101,
          borderRadius: '16px 16px 0 0',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: "'Manrope', sans-serif",
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Header */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            backgroundColor: backgroundColor,
            borderBottom: `0.5px solid ${colors.grey300}`,
            position: 'relative',
            minHeight: '52px',
            flexShrink: 0,
            borderRadius: '10px 10px 0 0'
          }}
        >
          <button
            onClick={showBackButton && onBack ? onBack : handleClose}
            style={{
              position: 'absolute',
              left: '16px',
              border: 'none',
              background: 'none',
              padding: '0',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: colors.clearblue,
              fontSize: '17px',
              fontWeight: 400,
            }}
          >
            {showBackButton ? (
              <>
                <ChevronLeft size={20} strokeWidth={2} />
                <span>Back</span>
              </>
            ) : (
              <span>Close</span>
            )}
          </button>

          <h2 style={{
            fontSize: '17px',
            fontWeight: 600,
            color: colors.black,
            margin: 0,
          }}>
            {title}
          </h2>
        </div>

        {/* Content Area - with min-height to force display */}
        <div 
          style={{
            flex: 1,
            overflow: 'auto',
            backgroundColor: backgroundColor,
            minHeight: '400px', // FORCE minimum height
            position: 'relative', // Ensure positioning context
          }}
        >
          <div style={{ width: '100%', minHeight: '100%' }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default FullScreenModal;