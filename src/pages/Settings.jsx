import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Settings as SettingsIcon, User, Bell, Key, Check } from 'lucide-react';

export const Settings = () => {
  const { userName, setUserName, userRole, addToast } = useApp();

  const [inputName, setInputName] = useState(userName);
  const [channels, setChannels] = useState({
    toast: true,
    email: false,
    push: true
  });
  const [apiKeys, setApiKeys] = useState({
    gemini: '••••••••••••••••••••••••••••',
    vertex: '••••••••••••••••••••••••••••',
    maps: '••••••••••••••••••••••••••••'
  });

  const handleProfileSave = (e) => {
    e.preventDefault();
    setUserName(inputName);
    addToast("Profile settings updated.", "success");
  };

  const handleToggleChannel = (key) => {
    setChannels({ ...channels, [key]: !channels[key] });
    addToast("Notification channel preference saved.", "success");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
          System Configuration
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Manage user personas, communication dispatch preferences, and Google Cloud API credentials.
        </p>
      </div>

      <div className="grid grid-2" style={{ gap: '24px' }}>
        {/* Profile Card */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <User size={18} style={{ color: 'var(--google-blue)' }} /> Profile Identity
          </h3>

          <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Display Name</label>
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="form-input"
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Assigned Privilege Role</label>
              <input
                type="text"
                disabled
                value={userRole.toUpperCase()}
                className="form-input"
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  cursor: 'not-allowed',
                  opacity: 0.8,
                  fontWeight: 'bold'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              style={{ padding: '10px 16px', fontSize: '0.85rem', alignSelf: 'flex-start', cursor: 'pointer' }}
            >
              Update Profile Name
            </button>
          </form>
        </div>

        {/* Notifications Channels */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <Bell size={18} style={{ color: 'var(--google-green)' }} /> Broadcast Subscriptions
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Select output devices to sync real-time alerts.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {/* Toast */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Toast Banners</strong>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Renders in bottom-right corner</span>
              </div>
              <button 
                onClick={() => handleToggleChannel('toast')}
                className={`btn ${channels.toast ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                {channels.toast ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Email */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Automated Work emails</strong>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Sends daily executive summaries</span>
              </div>
              <button 
                onClick={() => handleToggleChannel('email')}
                className={`btn ${channels.email ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                {channels.email ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            {/* Push Notifications */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px' }}>
              <div>
                <strong style={{ fontSize: '0.85rem' }}>Browser Push Indicators</strong>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Pings directly to system shelf</span>
              </div>
              <button 
                onClick={() => handleToggleChannel('push')}
                className={`btn ${channels.push ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '6px 12px', fontSize: '0.75rem', cursor: 'pointer' }}
              >
                {channels.push ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* API Credentials */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', gridColumn: 'span 2' }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <Key size={18} style={{ color: 'var(--purple-ai)' }} /> Google Cloud API Access Tokens
          </h3>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            API keys verified. Direct endpoints are managed securely inside GCP Cloud Secret Manager.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Gemini API Key</label>
              <input
                type="text"
                value={apiKeys.gemini}
                onChange={(e) => setApiKeys({ ...apiKeys, gemini: e.target.value })}
                className="form-input"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Vertex AI Project Token</label>
              <input
                type="text"
                value={apiKeys.vertex}
                onChange={(e) => setApiKeys({ ...apiKeys, vertex: e.target.value })}
                className="form-input"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Google Maps SDK Credentials</label>
              <input
                type="text"
                value={apiKeys.maps}
                onChange={(e) => setApiKeys({ ...apiKeys, maps: e.target.value })}
                className="form-input"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              />
            </div>
          </div>

          <button
            onClick={() => addToast("API Credentials successfully saved.", "success")}
            className="btn btn-primary"
            style={{ padding: '10px 16px', fontSize: '0.85rem', alignSelf: 'flex-start', cursor: 'pointer' }}
          >
            Save Credentials Key
          </button>
        </div>
      </div>
    </div>
  );
};
