import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import IPhoneShell from './components/shell/IPhoneShell';
import StatusBar from './components/shell/StatusBar';
import BottomNav from './components/layout/BottomNav';
import HomePage from './components/home/HomePage';
import PaymentsPage from './components/pages/PaymentsPage';
import CardPage from './components/pages/CardPage';
import HelpPage from './components/pages/HelpPage';
import SplashScreen from './components/onboarding/SplashScreen';

const PAGE_ORDER = ['home', 'apply', 'pay', 'manage', 'invoice'];

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

  const handleNavigate = (page) => {
    if (page === currentPage) return;
    setPrevPage(currentPage);
    setCurrentPage(page);
  };

  const direction = getDirection(prevPage, currentPage);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':    return <HomePage />;
      case 'apply':   return <CardPage />;
      case 'pay':     return <PaymentsPage />;
      case 'manage':  return <HelpPage />;
      case 'invoice': return <HelpPage />;
      default:        return null;
    }
  };

  return (
    <IPhoneShell showHomeIndicator={false}>

      <AnimatePresence mode="wait">
        {stage === 'splash' ? (
          <SplashScreen key="splash" onLogin={() => setStage('app')} />
        ) : (
          <motion.div
            key="app"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </IPhoneShell>
  );
}
