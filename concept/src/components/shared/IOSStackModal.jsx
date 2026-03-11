import React, { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';

const IOSStackModal = ({ 
  modalStack,
  onClose,
  onBack,
  renderScreen
}) => {
  const [animatedStack, setAnimatedStack] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragDeltaY, setDragDeltaY] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [backdropOpacity, setBackdropOpacity] = useState(0);

  const colors = {
    white: '#F9FAFA',
    black: '#1F2020',
    grey300: '#DEDFDF',
    clearblue: '#3280F6',
  };

  // Internal close handler that animates before calling onClose
  const handleAnimatedClose = () => {
    setIsClosing(true);
    // Fade out backdrop
    setBackdropOpacity(0);
    // Animate modals out
    setAnimatedStack(prev => 
      prev.map(item => ({ ...item, translateY: 800 }))
    );
    // Call actual close after animation
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Animate modals in/out when modalStack changes
  useEffect(() => {
    console.log('modalStack changed:', modalStack.length, modalStack);
    console.log('animatedStack before:', animatedStack.length, animatedStack);
    
    if (modalStack.length > animatedStack.length) {
      // Modal added - fade in backdrop and animate modals in from bottom
      
      // Start backdrop at 0
      setBackdropOpacity(0);
      
      const startIndex = animatedStack.length;
      const newModals = modalStack.slice(startIndex);
      
      setAnimatedStack([
        ...modalStack.slice(0, startIndex).map((m, idx) => ({
          ...m,
          translateY: animatedStack[idx]?.translateY || 0
        })),
        ...newModals.map(m => ({ ...m, translateY: 800 }))
      ]);
      
      // Trigger animations after render
      setTimeout(() => {
        setBackdropOpacity(1); // Fade in backdrop
        setAnimatedStack(modalStack.map(m => ({ ...m, translateY: 0 })));
      }, 10);
    } else if (modalStack.length < animatedStack.length) {
      // Modal removed - animate out to bottom
      setAnimatedStack(prev => [
        ...modalStack.map((m, idx) => ({ ...m, translateY: prev[idx]?.translateY || 0 })),
        ...prev.slice(modalStack.length).map(m => ({ ...m, translateY: 800 }))
      ]);
      
      // Remove from animated stack after animation completes
      setTimeout(() => {
        setAnimatedStack(modalStack.map(m => ({ ...m, translateY: 0 })));
      }, 300);
    } else if (modalStack.length === 0) {
      // All modals closed
      setAnimatedStack([]);
    }
    
    if (modalStack.length > 0) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      if (modalStack.length === 0) {
        document.body.style.overflow = '';
      }
    };
  }, [modalStack]);

  const handleTouchStart = (e, index) => {
    // Only allow dragging the top modal
    if (index !== modalStack.length - 1) return;
    
    if (e.target.closest('.modal-header')) {
      setIsDragging(true);
      setDragStartY(e.touches[0].clientY);
    }
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - dragStartY;
    
    if (deltaY > 0) {
      setDragDeltaY(deltaY);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragDeltaY > 150) {
      // Close or go back
      if (modalStack.length > 1) {
        onBack();
      } else {
        handleAnimatedClose();
      }
    }
    
    setDragDeltaY(0);
  };

  const handleMouseDown = (e, index) => {
    if (index !== modalStack.length - 1) return;
    
    if (e.target.closest('.modal-header')) {
      setIsDragging(true);
      setDragStartY(e.clientY);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentY = e.clientY;
    const deltaY = currentY - dragStartY;
    
    if (deltaY > 0) {
      setDragDeltaY(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    if (dragDeltaY > 150) {
      if (modalStack.length > 1) {
        onBack();
      } else {
        handleAnimatedClose();
      }
    }
    
    setDragDeltaY(0);
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
  }, [isDragging, dragStartY, dragDeltaY]);

  if (animatedStack.length === 0) return null;

  return (
    <>
      {/* White Status Bar Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '390px',
          height: '44px',
          zIndex: 150,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '24px',
          paddingRight: '24px',
          paddingTop: '0px',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 600 }}>9:41</div>
        <div style={{ 
          width: '128px', 
          height: '28px', 
          borderRadius: '50px', 
          backgroundColor: '#000000',
        }}></div>
        <div style={{ display: 'flex', alignItems: 'center', color: '#FFFFFF', gap: '4px' }}>
          <svg width="18" height="12" fill="currentColor">
            <rect x="0" y="3" width="4" height="6" rx="1"/>
            <rect x="5" y="2" width="4" height="8" rx="1"/>
            <rect x="10" y="1" width="4" height="10" rx="1"/>
            <rect x="15" y="0" width="3" height="12" rx="1"/>
          </svg>
        </div>
      </div>

      {/* Backdrop - solid black with fade animation */}
      <div
        onClick={() => {
          if (modalStack.length === 1) handleAnimatedClose();
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: '#000000',
          opacity: backdropOpacity,
          zIndex: 100,
          transition: 'opacity 300ms ease',
        }}
      />

      {/* Stacked Modals */}
      {animatedStack.map((modal, index) => {
        const isTop = index === animatedStack.length - 1;
        const distanceFromTop = animatedStack.length - 1 - index; // 0 for top, 1 for second, etc.
        
        // Calculate scale and translation for stacking effect
        const scale = 1 - (distanceFromTop * 0.05); // Each card is 5% smaller
        const translateYValue = modal.translateY + (isTop && isDragging ? dragDeltaY : 0);
        // First modal (index 0) = 0px offset = 44px total
        // Second modal (index 1) = 16px offset = 60px total
        // Third modal (index 2) = 32px offset = 76px total
        const stackOffset = index * 16;
        const opacity = 1 - (distanceFromTop * 0.1); // Fade cards further back
        
        return (
          <div
            key={`${modal.type}-${index}`}
            onTouchStart={(e) => handleTouchStart(e, index)}
            onMouseDown={(e) => handleMouseDown(e, index)}
            style={{
              position: 'fixed',
              top: `${44 + stackOffset}px`,
              left: '50%',
              transform: `translateX(-50%) translateY(${translateYValue}px) scale(${scale})`,
              transformOrigin: 'top center',
              width: '390px',
              height: `calc(100dvh - ${44 + stackOffset}px)`,
              backgroundColor: colors.white,
              transition: isDragging && isTop ? 'none' : 'transform 300ms cubic-bezier(0.4, 0.0, 0.2, 1), opacity 300ms ease',
              zIndex: 101 + index,
              borderRadius: '16px 16px 0 0',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: "'Manrope', sans-serif",
              boxShadow: '0 -2px 20px rgba(0, 0, 0, 0.15)',
              opacity: opacity,
              pointerEvents: isTop ? 'auto' : 'none',
              visibility: 'visible', // Force all cards to be visible
              overflow: 'hidden', // This ensures border-radius is applied properly
            }}
          >
            {/* Header */}
            <div 
              className="modal-header"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                backgroundColor: colors.white,
                borderBottom: `0.5px solid ${colors.grey300}`,
                cursor: isTop && !isDragging ? 'grab' : isDragging ? 'grabbing' : 'default',
                position: 'relative',
                minHeight: '52px',
                flexShrink: 0,
              }}
            >
              {/* Back/Close Button */}
              <button
                onClick={() => {
                  if (animatedStack.length > 1) {
                    onBack();
                  } else {
                    handleAnimatedClose();
                  }
                }}
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
                {animatedStack.length > 1 ? (
                  <>
                    <ChevronLeft size={20} strokeWidth={2} />
                    <span>Back</span>
                  </>
                ) : (
                  <span>Close</span>
                )}
              </button>

              {/* Centered Title */}
              <h2 style={{
                fontSize: '17px',
                fontWeight: 600,
                color: colors.black,
                margin: 0,
              }}>
                {modal.title}
              </h2>
            </div>

            {/* Content */}
            <div 
              style={{
                flex: 1,
                overflow: 'auto',
                backgroundColor: colors.white,
              }}
            >
              {renderScreen(modal)}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default IOSStackModal;