import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  LayoutDashboard, MessageSquare, ShieldAlert, Cpu, 
  Database, LineChart, HelpCircle, FileText, Settings, 
  Map, Lightbulb, Bell, LogOut, Sun, Moon, Search, 
  Menu, ChevronLeft, ChevronRight, CheckCircle2, 
  AlertCircle, Info, Languages, Shield, BrainCircuit,
  Workflow
} from 'lucide-react';

export const MainLayout = ({ children }) => {
  const { 
    currentPage, 
    setCurrentPage, 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    theme, 
    setTheme, 
    language, 
    setLanguage, 
    userRole, 
    setUserRole,
    userName,
    setIsLoggedIn,
    alerts,
    toasts,
    removeToast
  } = useApp();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { id: 'chat', name: 'AI Assistant', icon: MessageSquare },
    { id: 'agents', name: 'Agents', icon: BrainCircuit },
    { id: 'analytics', name: 'Analytics', icon: LineChart },
    { id: 'predictions', name: 'Predictions', icon: HelpCircle },
    { id: 'recommendations', name: 'Recommendations', icon: Lightbulb },
    { id: 'alerts', name: 'Alerts', icon: ShieldAlert, count: alerts.filter(a => a.status === 'Unresolved').length },
    { id: 'documents', name: 'Documents', icon: FileText },
    { id: 'sources', name: 'Data Sources', icon: Database },
    { id: 'automation', name: 'Automation', icon: Cpu },
    { id: 'reports', name: 'Reports', icon: Workflow },
    { id: 'map', name: 'Smart City Map', icon: Map },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('landing');
  };

  const currentMenu = menuItems.find(item => item.id === currentPage);
  const activeAlerts = alerts.filter(a => a.status === 'Unresolved');

  return (
    <div className="app-container">
      {/* LEFT SIDEBAR */}
      <aside 
        style={{
          width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
          transition: 'width var(--transition-normal)',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Sidebar Header Logo */}
        <div style={{
          padding: '20px',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}>
          <div style={{
            backgroundColor: 'var(--google-blue)',
            color: 'white',
            width: '32px',
            height: '32px',
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            flexShrink: 0
          }}>
            IQ
          </div>
          {!sidebarCollapsed && (
            <span style={{ 
              fontWeight: 700, 
              fontSize: '1.2rem', 
              fontFamily: 'var(--font-title)', 
              color: 'var(--text-primary)' 
            }}>
              CommunityIQ
            </span>
          )}
        </div>

        {/* Navigation Items */}
        <nav style={{ 
          padding: '12px 8px', 
          flexGrow: 1, 
          overflowY: 'auto', 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '4px' 
        }}>
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  width: '100%',
                  cursor: 'pointer',
                  backgroundColor: isActive ? 'rgba(66, 133, 244, 0.08)' : 'transparent',
                  color: isActive ? 'var(--google-blue)' : 'var(--text-secondary)',
                  fontWeight: isActive ? 600 : 500,
                  transition: 'all var(--transition-fast)',
                  position: 'relative'
                }}
                className={!isActive ? 'btn-icon-hover' : ''}
                title={sidebarCollapsed ? item.name : ''}
              >
                <Icon size={20} style={{ flexShrink: 0 }} />
                {!sidebarCollapsed && <span>{item.name}</span>}
                {item.count > 0 && !sidebarCollapsed && (
                  <span style={{
                    marginLeft: 'auto',
                    backgroundColor: 'var(--google-red)',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: '10px'
                  }}>
                    {item.count}
                  </span>
                )}
                {item.count > 0 && sidebarCollapsed && (
                  <div style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--google-red)',
                    borderRadius: '50%'
                  }} />
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer Controls */}
        <div style={{
          padding: '12px 8px',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          {/* Theme Switcher in sidebar */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 12px',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              width: '100%'
            }}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            {!sidebarCollapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>

          {/* User Profile Summary */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--purple-ai)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              flexShrink: 0
            }}>
              {userName.charAt(0)}
            </div>
            {!sidebarCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                  {userName}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>
                  {userRole}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            position: 'absolute',
            bottom: '72px',
            right: '-12px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: 'var(--card-shadow)',
            color: 'var(--text-secondary)',
            zIndex: 10
          }}
        >
          {sidebarCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </aside>

      {/* MAIN CONTENT WINDOW */}
      <div 
        className={`main-content ${sidebarCollapsed ? 'collapsed' : ''}`}
        style={{
          width: '100%'
        }}
      >
        {/* TOP HEADER */}
        <header style={{
          height: '70px',
          backgroundColor: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-color)',
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'between',
          position: 'sticky',
          top: 0,
          zIndex: 90
        }}>
          {/* Left section: Search Bar mimicking Google Cloud Console */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexGrow: 1 }}>
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '480px'
            }}>
              <Search size={18} style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--text-tertiary)'
              }} />
              <input
                type="text"
                placeholder="Search resources, reports, predictions or ask Vertex AI..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 16px 10px 42px',
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  transition: 'all var(--transition-fast)'
                }}
              />
            </div>
          </div>

          {/* Right section: System utilities */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Role switcher badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={16} style={{ color: 'var(--google-blue)' }} />
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.85rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-primary)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  textTransform: 'capitalize'
                }}
              >
                <option value="citizen">Citizen</option>
                <option value="administrator">Administrator</option>
                <option value="government">Government</option>
                <option value="ngo">NGO</option>
                <option value="researcher">Researcher</option>
              </select>
            </div>

            {/* Language Selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Languages size={18} style={{ color: 'var(--text-secondary)' }} />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                style={{
                  padding: '4px 8px',
                  fontSize: '0.85rem',
                  border: 'none',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  fontWeight: 500
                }}
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Notifications Center */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="btn-icon" 
                style={{ position: 'relative', cursor: 'pointer' }}
              >
                <Bell size={20} style={{ color: 'var(--text-secondary)' }} />
                {activeAlerts.length > 0 && (
                  <span style={{
                    position: 'absolute',
                    top: '2px',
                    right: '2px',
                    width: '8px',
                    height: '8px',
                    backgroundColor: 'var(--google-red)',
                    borderRadius: '50%'
                  }} />
                )}
              </button>
              {showNotifications && (
                <div style={{
                  position: 'absolute',
                  top: '40px',
                  right: 0,
                  width: '320px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--card-shadow)',
                  zIndex: 200,
                  padding: '16px'
                }}>
                  <h4 style={{ marginBottom: '12px', fontSize: '0.95rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                    Active Notifications ({activeAlerts.length})
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'col', gap: '10px', maxHeight: '240px', overflowY: 'auto' }}>
                    {activeAlerts.length === 0 ? (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)', textAlign: 'center', padding: '16px 0' }}>
                        No unresolved warnings.
                      </span>
                    ) : (
                      activeAlerts.slice(0, 3).map(alert => (
                        <div key={alert.id} style={{
                          padding: '8px',
                          borderRadius: 'var(--radius-sm)',
                          borderLeft: `3px solid ${alert.severity === 'Critical' ? 'var(--google-red)' : alert.severity === 'High' ? 'var(--orange-warn)' : 'var(--google-blue)'}`,
                          backgroundColor: 'var(--bg-primary)'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'between', fontSize: '0.8rem', fontWeight: 600 }}>
                            <span style={{ color: alert.severity === 'Critical' ? 'var(--google-red)' : 'var(--text-primary)' }}>{alert.category}</span>
                            <span style={{ color: 'var(--text-tertiary)' }}>{alert.time}</span>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {alert.title}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                  <button 
                    onClick={() => { setCurrentPage('alerts'); setShowNotifications(false); }}
                    style={{
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '0.8rem',
                      color: 'var(--google-blue)',
                      fontWeight: 600,
                      marginTop: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    View All Warnings & Alerts
                  </button>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--google-blue)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600
                }}>
                  {userName.charAt(0)}
                </div>
              </button>
              {showProfileMenu && (
                <div style={{
                  position: 'absolute',
                  top: '44px',
                  right: 0,
                  width: '200px',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--card-shadow)',
                  zIndex: 200,
                  padding: '8px 0'
                }}>
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-color)' }}>
                    <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600 }}>{userName}</span>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', textTransform: 'capitalize' }}>{userRole}</span>
                  </div>
                  <button 
                    onClick={() => { setCurrentPage('settings'); setShowProfileMenu(false); }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      width: '100%',
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <Settings size={16} /> Settings
                  </button>
                  <button 
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '10px 16px',
                      width: '100%',
                      fontSize: '0.85rem',
                      color: 'var(--google-red)',
                      cursor: 'pointer',
                      textAlign: 'left',
                      borderTop: '1px solid var(--border-color)'
                    }}
                  >
                    <LogOut size={16} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CENTRAL VIEW AREA */}
        <main className="page-container">
          {children}
        </main>
      </div>

      {/* TOAST SYSTEM CONTAINER */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        zIndex: 1000,
        pointerEvents: 'none'
      }}>
        {toasts.map(toast => {
          let Icon = Info;
          let color = 'var(--google-blue)';
          let bgColor = 'var(--bg-secondary)';
          if (toast.type === 'success') {
            Icon = CheckCircle2;
            color = 'var(--google-green)';
          } else if (toast.type === 'warning') {
            Icon = AlertCircle;
            color = 'var(--google-yellow)';
          } else if (toast.type === 'error') {
            Icon = AlertCircle;
            color = 'var(--google-red)';
          }

          return (
            <div
              key={toast.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 20px',
                borderRadius: 'var(--radius-lg)',
                backgroundColor: 'var(--bg-secondary)',
                border: `1px solid var(--border-color)`,
                borderLeft: `4px solid ${color}`,
                boxShadow: 'var(--card-shadow)',
                minWidth: '280px',
                maxWidth: '400px',
                pointerEvents: 'auto',
                animation: 'fadeIn 0.2s forwards'
              }}
            >
              <Icon size={20} style={{ color, flexShrink: 0 }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                {toast.message}
              </span>
              <button 
                onClick={() => removeToast(toast.id)}
                style={{
                  marginLeft: 'auto',
                  cursor: 'pointer',
                  color: 'var(--text-tertiary)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
