import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IPhoneShell from './components/shell/IPhoneShell';
import StatusBar from './components/shell/StatusBar';
import BottomNav from './components/layout/BottomNav';
import HomePage from './components/home/HomePage';
import PaymentsPage from './components/pages/PaymentsPage';
import ApplyPage from './components/pages/ApplyPage';
import HelpPage from './components/pages/HelpPage';
import ManagePage from './components/pages/ManagePage';
import AccountDetailPage from './components/pages/AccountDetailPage';
import MemberDetailPage from './components/pages/MemberDetailPage';
import CardDetailPage from './components/pages/CardDetailPage';
import TransferPage from './components/pages/TransferPage';
import ReviewPage from './components/pages/ReviewPage';
import TransferSuccessFlow from './components/pages/TransferSuccessFlow';
import SplashScreen from './components/onboarding/SplashScreen';

const PAGE_ORDER = ['home', 'explore', 'pay', 'manage', 'card'];

function getDirection(from, to) {
  return PAGE_ORDER.indexOf(to) > PAGE_ORDER.indexOf(from) ? 1 : -1;
}

const variants = {
  enter: (dir) => ({ x: dir * 393, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir * -393, opacity: 0 }),
};

export default function App() {
  const [stage, setStage] = useState('splash'); // 'splash' | 'app'
  const [currentPage, setCurrentPage] = useState('home');
  const [prevPage, setPrevPage] = useState('home');
  const [detail, setDetail] = useState(null); // null | 'account' | 'member' | 'card'
  const [savingsChoice, setSavingsChoice] = useState(null);
  const [timeAdvanced, setTimeAdvanced] = useState(false);
  const [transferAmount, setTransferAmount] = useState('50000');
  const [transferStarted, setTransferStarted] = useState(false);
  const [transferComplete, setTransferComplete] = useState(false);
  const [setupDismissed, setSetupDismissed] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAdvanceTime = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setTimeAdvanced(true);
      setIsTransitioning(false);
    }, 400);
  };

  const handleNavigate = (page) => {
    if (page === currentPage) return;
    setPrevPage(currentPage);
    setCurrentPage(page);
  };

  const direction = getDirection(prevPage, currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage savingsChoice={savingsChoice} timeAdvanced={timeAdvanced} transferStarted={transferStarted} transferComplete={transferComplete} setupDismissed={setupDismissed} onSetupDismiss={() => setSetupDismissed(true)} onTransfer={() => { setTransferStarted(true); setDetail('transfer'); }} />;
      case 'explore':  return <ApplyPage />;
      case 'pay':     return <PaymentsPage />;
      case 'manage':  return <ManagePage onOpenDetail={setDetail} />;
      case 'card':    return <HelpPage />;
      default:        return null;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
      <IPhoneShell showHomeIndicator={false}>

        <AnimatePresence mode="wait">
          {stage === 'splash' ? (
            <SplashScreen key="splash" onLogin={(choice) => { setSavingsChoice(choice); setStage('app'); }} />
          ) : (
            <motion.div
              key="app"
              initial={{ opacity: 0 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }}
              transition={{ duration: 0.35 }}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
            >
              {/* Page area */}
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                  <motion.div
                    key={currentPage}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 35,
                      mass: 0.8,
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    {renderPage()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <BottomNav currentPage={currentPage} onNavigate={handleNavigate} />

              {/* Detail overlay — covers page + nav */}
              <AnimatePresence>
                {detail && (
                  <motion.div
                    key={['review', 'success'].includes(detail) ? 'transfer' : detail}
                    initial={{ x: 393 }}
                    animate={{ x: 0 }}
                    exit={{ x: 393 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
                    style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}
                  >
                    {detail === 'account' && <AccountDetailPage onBack={() => setDetail(null)} />}
                    {detail === 'member'  && <MemberDetailPage  onBack={() => setDetail(null)} />}
                    {detail === 'card'    && <CardDetailPage    onBack={() => setDetail(null)} />}
                    {(detail === 'transfer' || detail === 'review' || detail === 'success') && (
                      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                        <TransferPage
                          onBack={() => setDetail(null)}
                          savingsChoice={savingsChoice}
                          onNext={(amt) => { setTransferAmount(amt); setDetail('review'); }}
                        />
                        <AnimatePresence>
                          {(detail === 'review' || detail === 'success') && (
                            <motion.div
                              key="review-layer"
                              initial={{ x: 393 }}
                              animate={{ x: 0 }}
                              exit={{ x: 393 }}
                              transition={{ type: 'spring', stiffness: 300, damping: 35, mass: 0.8 }}
                              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', backgroundColor: '#ffffff' }}
                            >
                              <ReviewPage
                                onBack={() => setDetail('transfer')}
                                onConfirm={() => setDetail('success')}
                                savingsChoice={savingsChoice}
                                amount={transferAmount}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                        <AnimatePresence>
                          {detail === 'success' && (
                            <motion.div
                              key="success-layer"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column' }}
                            >
                              <TransferSuccessFlow
                                onDone={() => { setDetail(null); setTransferComplete(true); }}
                                savingsChoice={savingsChoice}
                                amount={transferAmount}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </IPhoneShell>

      {/* Time control — outside the phone shell */}
      {stage === 'app' && (
        <button
          onClick={handleAdvanceTime}
          disabled={timeAdvanced}
          style={{
            padding: '10px 18px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.3)',
            backgroundColor: 'rgba(255,255,255,0.15)',
            backdropFilter: 'blur(8px)',
            color: '#000000',
            fontFamily: 'Manrope, sans-serif',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            letterSpacing: '0.01em',
            visibility: timeAdvanced ? 'hidden' : 'visible',
          }}
        >
          + 7 days
        </button>
      )}
    </div>
  );
}
