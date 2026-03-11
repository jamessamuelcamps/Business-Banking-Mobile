import { useState } from 'react';
import { colors } from '../styles/colors';
import RecipientsScreen from './PayPage/RecipientsScreen';
import SearchModal from './PayPage/SearchModal';
import EnterAmountScreen from './PayPage/EnterAmountScreen';
import ScheduleModal from './PayPage/ScheduleModal';
import ReviewScreen from './PayPage/ReviewScreen';
import PaymentResultScreen from './PayPage/PaymentResultScreen';

// Screens in the pay flow
// 'recipients' → 'enterAmount' → 'review' → 'loading' → 'success'
// Modals: 'search', 'schedule'

export default function PayPage({ onClose }) {
  const [screen, setScreen] = useState('recipients');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  // Payment state
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [amount, setAmount] = useState('');
  const [reference, setReference] = useState('');
  const [scheduleOptions, setScheduleOptions] = useState({
    repeat: null,
    deferDate: null,
    ends: null,
  });

  const handleSelectRecipient = (recipient) => {
    setSelectedRecipient(recipient);
    setScreen('enterAmount');
  };

  const handleAmountConfirm = () => {
    setScreen('review');
  };

  const handleSendPayment = () => {
    setScreen('result');
  };

  const handleDone = () => {
    // Reset all state and go back to home
    setSelectedRecipient(null);
    setAmount('');
    setReference('');
    setScheduleOptions({ repeat: null, deferDate: null, ends: null });
    onClose(); // goes back to payments hub, then nav to home
  };

  const handleMakeAnother = () => {
    // Reset payment state but stay in pay flow at recipients
    setSelectedRecipient(null);
    setAmount('');
    setReference('');
    setScheduleOptions({ repeat: null, deferDate: null, ends: null });
    setScreen('recipients');
  };

  const renderScreen = () => {
    switch (screen) {
      case 'recipients':
        return (
          <RecipientsScreen
            onSelectRecipient={handleSelectRecipient}
            onOpenSearch={() => setShowSearchModal(true)}
            onClose={onClose}
          />
        );
      case 'enterAmount':
        return (
          <EnterAmountScreen
            recipient={selectedRecipient}
            amount={amount}
            setAmount={setAmount}
            reference={reference}
            setReference={setReference}
            scheduleOptions={scheduleOptions}
            onOpenSchedule={() => setShowScheduleModal(true)}
            onBack={() => setScreen('recipients')}
            onContinue={handleAmountConfirm}
          />
        );
      case 'review':
        return (
          <ReviewScreen
            recipient={selectedRecipient}
            amount={amount}
            reference={reference}
            scheduleOptions={scheduleOptions}
            onBack={() => setScreen('enterAmount')}
            onSend={handleSendPayment}
          />
        );
      case 'result':
        return (
          <PaymentResultScreen
            recipient={selectedRecipient}
            amount={amount}
            onDone={handleDone}
            onMakeAnother={handleMakeAnother}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      width: '100%',
      height: '100%',
      fontFamily: "'Manrope', sans-serif",
      backgroundColor: colors.white,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {renderScreen()}
      </div>

      {/* Search modal - overlays recipients screen */}
      {showSearchModal && (
        <SearchModal
          onClose={() => setShowSearchModal(false)}
          onSelectRecipient={(recipient) => {
            setShowSearchModal(false);
            handleSelectRecipient(recipient);
          }}
        />
      )}

      {/* Schedule modal - overlays enter amount screen */}
      {showScheduleModal && (
        <ScheduleModal
          scheduleOptions={scheduleOptions}
          onClose={() => setShowScheduleModal(false)}
          onConfirm={(options) => {
            setScheduleOptions(options);
            setShowScheduleModal(false);
          }}
        />
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}