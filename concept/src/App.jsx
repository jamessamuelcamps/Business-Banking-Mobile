import React, { useState } from 'react';
import HomePage from './components/HomePage';
import ManagePage from './components/ManagePage';
import PaymentsPage from './components/PaymentsPage';
import PayPage from './components/PayPage';
import IOSStackModal from './components/shared/IOSStackModal';
import AccountDetailScreen from './components/DetailScreens/AccountDetailScreen';
import CardDetailScreen from './components/DetailScreens/CardDetailScreen';
import TransactionDetailScreen from './components/DetailScreens/TransactionDetailScreen';
import NavBar from './components/shared/NavBar';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  
  // Modal stack
  const [modalStack, setModalStack] = useState([]);

  // Modal helper functions
  const openModal = (modalData) => {
    setModalStack(prev => [...prev, modalData]);
  };

  const closeModal = () => {
    setModalStack([]);
  };

  const goBack = () => {
    setModalStack(prev => prev.slice(0, -1));
  };

  // Render the appropriate screen based on modal type
  const renderScreen = (modal) => {
    switch (modal.type) {
      case 'account':
        return (
          <AccountDetailScreen 
            account={modal.data}
            onTransactionClick={(transaction) => openModal({
              type: 'transaction',
              title: 'Transaction',
              data: transaction
            })}
          />
        );
      
      case 'card':
        return <CardDetailScreen card={modal.data} />;
      
      case 'transaction':
        return <TransactionDetailScreen transaction={modal.data} />;
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Main App Container */}
      <div style={{ 
        maxWidth: '390px', 
        margin: '0 auto', 
        height: '844px', 
        fontFamily: "'Manrope', sans-serif", 
        backgroundColor: '#F9FAFA', 
        position: 'relative', 
        overflow: 'hidden' 
      }}>
        {/* Page content */}
        {currentPage === 'home' && <HomePage openModal={openModal} />}
        {currentPage === 'manage' && <ManagePage openModal={openModal} />}
        {currentPage === 'payments' && <PaymentsPage onNavigate={setCurrentPage} onStartPayment={() => setCurrentPage('pay')} />}
        {currentPage === 'pay' && <PayPage onClose={() => setCurrentPage('home')} />}
        
        {/* NavBar */}
        {currentPage !== 'pay' && <NavBar currentPage={currentPage} onNavigate={setCurrentPage} />}
      </div>
      
      {/* iOS Stacked Modal System */}
      {modalStack.length > 0 && (
        <IOSStackModal
          modalStack={modalStack}
          onClose={closeModal}
          onBack={goBack}
          renderScreen={renderScreen}
        />
      )}
    </>
  );
};

export default App;