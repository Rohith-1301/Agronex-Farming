import React, { useState, useEffect } from 'react';
import { FarmerProvider } from './context/FarmerContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

// 6 Core Modules Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import CropSelectionPage from './pages/CropSelectionPage';
import CropDoctorPage from './pages/CropDoctorPage';
import AgroAIAssistantPage from './pages/AgroAIAssistantPage';
import GovernmentSchemesPage from './pages/GovernmentSchemesPage';
import ProfitCalculatorPage from './pages/ProfitCalculatorPage';

// Auxiliary Pages
import WeatherPage from './pages/WeatherPage';
import MarketplacePage from './pages/MarketplacePage';
import AdminDatasetsPage from './pages/AdminDatasetsPage';

import { Language, UserRole } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [currentLang, setCurrentLang] = useState<Language>('ta');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState('செல்வராஜ் முனியப்பன்');
  const [userRole, setUserRole] = useState<UserRole>('farmer');

  // Scroll to top on page switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentTab]);

  const handleLoginSuccess = (name: string, role: UserRole) => {
    setUserName(name);
    setUserRole(role);
    setIsLoggedIn(true);
  };

  return (
    <FarmerProvider>
      <div className="min-h-screen bg-[#041008] text-gray-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white font-sans">
        {/* Top Sticky Navigation Bar */}
        <Navbar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          currentLang={currentLang}
          onSelectLang={setCurrentLang}
          onOpenLoginModal={() => setIsAuthOpen(true)}
          isLoggedIn={isLoggedIn}
          userName={userName}
        />

        {/* Main Content Router for the 6 Modules */}
        <main className="flex-1">
          {currentTab === 'home' && <HomePage onNavigate={setCurrentTab} />}
          {currentTab === 'dashboard' && <DashboardPage onNavigate={setCurrentTab} />}
          {currentTab === 'crop-selection' && <CropSelectionPage />}
          {currentTab === 'crop-doctor' && <CropDoctorPage />}
          {currentTab === 'agro-ai' && <AgroAIAssistantPage />}
          {currentTab === 'schemes' && <GovernmentSchemesPage />}
          {currentTab === 'profit-calc' && <ProfitCalculatorPage />}

          {/* Auxiliary fallbacks */}
          {currentTab === 'weather' && <WeatherPage />}
          {currentTab === 'marketplace' && <MarketplacePage />}
          {currentTab === 'admin-datasets' && <AdminDatasetsPage />}
        </main>

        {/* Auth Modal */}
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />

        {/* Footer (Rendered on internal operating modules) */}
        {currentTab !== 'home' && <Footer onNavigate={setCurrentTab} />}
      </div>
    </FarmerProvider>
  );
}
