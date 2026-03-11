import { useEffect, useState } from 'react';
import { colors } from '../styles/colors';
import StatusBar from './shared/StatusBar';
import HomeHeader from './HomePage/HomeHeader';
import BalanceSection from './HomePage/BalanceSection';
import PromoCard from './HomePage/PromoCard';
import BottomSheet from './HomePage/BottomSheet';
import BalanceModal from './HomePage/BalanceModal';
import { allAccounts } from '../data/accountsData';

export default function HomePage() {
  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [selectedAccounts, setSelectedAccounts] = useState(
    allAccounts.map(acc => acc.id)
  );

  // Calculate total balance based on selected accounts
  const totalBalance = allAccounts
    .filter(acc => selectedAccounts.includes(acc.id))
    .reduce((sum, acc) => sum + acc.amount, 0);

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  return (
    <div style={{ 
      width: '390px',
      maxWidth: '390px', 
      margin: '0 auto', 
      height: '844px', 
      fontFamily: "'Manrope', sans-serif", 
      backgroundColor: colors.white, 
      position: 'relative', 
      overflow: 'hidden'
    }}>
      <StatusBar />
      
      <div style={{ paddingTop: '44px', height: '100%' }}>
        <HomeHeader />
        <BalanceSection 
          totalBalance={totalBalance}
          onOpenBalanceModal={() => setShowBalanceModal(true)}
        />
        <PromoCard />
      </div>

      <BottomSheet allAccounts={allAccounts} />

      <BalanceModal 
        isOpen={showBalanceModal}
        onClose={() => setShowBalanceModal(false)}
        allAccounts={allAccounts}
        selectedAccounts={selectedAccounts}
        setSelectedAccounts={setSelectedAccounts}
      />

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { 
          display: none; 
        } 
        .scrollbar-hide { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
        }
      `}</style>
    </div>
  );
}