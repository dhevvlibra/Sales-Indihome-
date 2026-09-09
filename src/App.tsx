import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavigationProvider, useAppNavigation } from './navigation';
import { OrderProvider } from './context/OrderContext';
import { SalesProvider } from './context/SalesContext';
import { ActiveSalesBanner } from './components/ActiveSalesBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { OrderModal } from './components/OrderModal';
import { HomePage } from './pages/HomePage';
import { PaketPage } from './pages/PaketPage';
import { CekAreaPage } from './pages/CekAreaPage';
import { KeunggulanPage } from './pages/KeunggulanPage';
import { CaraPasangPage } from './pages/CaraPasangPage';
import { TestimoniPage } from './pages/TestimoniPage';
import { FAQPage } from './pages/FAQPage';
import { AdminSalesPage } from './pages/AdminSalesPage';

function AppContent() {
  const { currentPage } = useAppNavigation();

  // Ensure scroll is at the top when entering a new page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentPage]);

  const isAdminPage = currentPage === 'admin';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-red-600 selection:text-white overflow-x-hidden">
      {/* Top Sales Referral Notification Banner */}
      {!isAdminPage && <ActiveSalesBanner />}

      {/* Header & Sticky Navigation (Hidden in dedicated Admin Portal) */}
      {!isAdminPage && <Navbar />}

      {/* Main Page View Switcher with Smooth Transition */}
      <main className="flex-1 relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{
              duration: 0.22,
              ease: [0.25, 1, 0.5, 1],
            }}
            className="w-full"
          >
            {currentPage === 'home' && <HomePage />}
            {currentPage === 'paket' && <PaketPage />}
            {currentPage === 'cek-area' && <CekAreaPage />}
            {currentPage === 'keunggulan' && <KeunggulanPage />}
            {currentPage === 'cara-pasang' && <CaraPasangPage />}
            {currentPage === 'testimoni' && <TestimoniPage />}
            {currentPage === 'faq' && <FAQPage />}
            {currentPage === 'admin' && <AdminSalesPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer with multi-page navigation links & contact */}
      {!isAdminPage && <Footer />}

      {/* Floating WhatsApp Quick Access Widget */}
      {!isAdminPage && <FloatingWhatsApp />}

      {/* Global Order / Registration Modal */}
      <OrderModal />
    </div>
  );
}

export default function App() {
  return (
    <SalesProvider>
      <NavigationProvider>
        <OrderProvider>
          <AppContent />
        </OrderProvider>
      </NavigationProvider>
    </SalesProvider>
  );
}
