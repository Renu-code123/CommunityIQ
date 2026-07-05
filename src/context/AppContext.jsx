import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  mockAlerts, 
  mockRecommendations, 
  mockDataSources, 
  mockDocuments, 
  mockAutomations, 
  defaultChatHistory 
} from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Shell
  const [currentPage, setCurrentPage] = useState('landing');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [language, setLanguage] = useState('en');
  
  // Auth & Roles
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('administrator');
  const [userName, setUserName] = useState('Admin Officer');

  // Application Data States
  const [alerts, setAlerts] = useState(mockAlerts);
  const [recommendations, setRecommendations] = useState(mockRecommendations);
  const [dataSources, setDataSources] = useState(mockDataSources);
  const [documents, setDocuments] = useState(mockDocuments);
  const [automations, setAutomations] = useState(mockAutomations);
  const [chatHistory, setChatHistory] = useState(defaultChatHistory);
  
  // Custom Analytics Filter
  const [analyticsFilter, setAnalyticsFilter] = useState({
    date: '2026-07-05',
    area: 'all',
    department: 'all'
  });

  // Dynamic Dashboard Stats to update when user interacts
  const [stats, setStats] = useState({
    trafficSpeed: 42,         // average speed in km/h
    aqiScore: 112,            // ambient Air Quality Index
    citizenSatisfaction: 84,  // percentage
    healthcareLoad: 78,       // occupancy rate
    energyDemand: 20.4,       // MegaWatts
    wasteCollection: 95       // recycling rate percent
  });

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme changes to Document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Handle recommendation updates (Accept / Reject)
  const handleAcceptRecommendation = (id) => {
    setRecommendations(prevRecs => 
      prevRecs.map(rec => {
        if (rec.id === id) {
          addToast(`Recommendation approved: "${rec.title}"`, 'success');
          
          // Dynamically adjust stats based on accepted item to simulate real feedback loop!
          if (rec.id === 'REC-01') { // transit shuttles
            setStats(s => ({ ...s, trafficSpeed: Math.min(s.trafficSpeed + 6, 60), citizenSatisfaction: Math.min(s.citizenSatisfaction + 3, 100) }));
          } else if (rec.id === 'REC-02') { // waste compactor
            setStats(s => ({ ...s, wasteCollection: Math.min(s.wasteCollection + 4, 100), citizenSatisfaction: Math.min(s.citizenSatisfaction + 2, 100) }));
          } else if (rec.id === 'REC-03') { // temporary heatwave clinic
            setStats(s => ({ ...s, healthcareLoad: Math.max(s.healthcareLoad - 12, 50), citizenSatisfaction: Math.min(s.citizenSatisfaction + 4, 100) }));
          } else if (rec.id === 'REC-04') { // dim street lights
            setStats(s => ({ ...s, energyDemand: parseFloat((s.energyDemand - 1.2).toFixed(1)) }));
          } else if (rec.id === 'REC-05') { // flood defenses
            setStats(s => ({ ...s, citizenSatisfaction: Math.min(s.citizenSatisfaction + 3, 100) }));
          }
          
          return { ...rec, status: 'Approved' };
        }
        return rec;
      })
    );
  };

  const handleRejectRecommendation = (id) => {
    setRecommendations(prevRecs => 
      prevRecs.map(rec => {
        if (rec.id === id) {
          addToast(`Recommendation dismissed.`, 'warning');
          return { ...rec, status: 'Rejected' };
        }
        return rec;
      })
    );
  };

  // Toggle Data Source connection
  const toggleDataSource = (id) => {
    setDataSources(prevSources => 
      prevSources.map(source => {
        if (source.id === id) {
          const newStatus = source.status === 'Connected' ? 'Disconnected' : 'Connected';
          addToast(`${source.name} status changed to ${newStatus}`, newStatus === 'Connected' ? 'success' : 'warning');
          return { 
            ...source, 
            status: newStatus,
            latency: newStatus === 'Connected' ? '120ms' : '---'
          };
        }
        return source;
      })
    );
  };

  // Handle Alert resolution
  const resolveAlert = (id) => {
    setAlerts(prevAlerts => 
      prevAlerts.map(alert => {
        if (alert.id === id) {
          addToast(`Emergency dispatch triggered for alert: ${alert.title}`, 'success');
          return { ...alert, status: 'Resolved' };
        }
        return alert;
      })
    );
  };

  // Trigger custom automation creation
  const addAutomation = (newRule) => {
    setAutomations(prev => [
      {
        id: `auto-${prev.length + 1}`,
        ...newRule,
        runs: 0,
        active: true
      },
      ...prev
    ]);
    addToast(`New automation rule successfully initialized!`, 'success');
  };

  // Trigger custom document upload simulation
  const addDocument = (newDoc) => {
    setDocuments(prev => [newDoc, ...prev]);
    addToast(`File "${newDoc.name}" uploaded. Scanning OCR data...`, 'info');
    
    // Simulate OCR delay
    setTimeout(() => {
      addToast(`OCR completed. Document added to Semantic Vector Index (RAG).`, 'success');
    }, 2500);
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      sidebarCollapsed,
      setSidebarCollapsed,
      theme,
      setTheme,
      language,
      setLanguage,
      isLoggedIn,
      setIsLoggedIn,
      userRole,
      setUserRole,
      userName,
      setUserName,
      alerts,
      setAlerts,
      recommendations,
      stats,
      dataSources,
      documents,
      automations,
      chatHistory,
      setChatHistory,
      analyticsFilter,
      setAnalyticsFilter,
      toasts,
      addToast,
      removeToast,
      handleAcceptRecommendation,
      handleRejectRecommendation,
      toggleDataSource,
      resolveAlert,
      addAutomation,
      addDocument
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
