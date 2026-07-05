import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { MainLayout } from './components/MainLayout';
import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';

// Import Feature Pages
import { Dashboard } from './pages/Dashboard';
import { ChatAssistant } from './pages/ChatAssistant';
import { AgentsWorkflow } from './pages/AgentsWorkflow';
import { Analytics } from './pages/Analytics';
import { Predictions } from './pages/Predictions';
import { Recommendations } from './pages/Recommendations';
import { AlertCenter } from './pages/AlertCenter';
import { DocumentCenter } from './pages/DocumentCenter';
import { DataSources } from './pages/DataSources';
import { AutomationBuilder } from './pages/AutomationBuilder';
import { ReportGenerator } from './pages/ReportGenerator';
import { SmartCityMap } from './pages/SmartCityMap';
import { Settings } from './pages/Settings';

const AppContent = () => {
  const { currentPage, isLoggedIn } = useApp();

  // Public/Landing route
  if (currentPage === 'landing') {
    return <LandingPage />;
  }

  // Auth gateway route
  if (currentPage === 'auth') {
    return <AuthPage />;
  }

  // Fallback protection: if not logged in, enforce Landing
  if (!isLoggedIn) {
    return <LandingPage />;
  }

  // Render workspace panels
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatAssistant />;
      case 'agents':
        return <AgentsWorkflow />;
      case 'analytics':
        return <Analytics />;
      case 'predictions':
        return <Predictions />;
      case 'recommendations':
        return <Recommendations />;
      case 'alerts':
        return <AlertCenter />;
      case 'documents':
        return <DocumentCenter />;
      case 'sources':
        return <DataSources />;
      case 'automation':
        return <AutomationBuilder />;
      case 'reports':
        return <ReportGenerator />;
      case 'map':
        return <SmartCityMap />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return <MainLayout>{renderPage()}</MainLayout>;
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
