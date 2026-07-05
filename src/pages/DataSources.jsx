import React from 'react';
import { useApp } from '../context/AppContext';
import { Database, RefreshCw, Link2, Link2Off, CheckCircle2, AlertOctagon, Activity } from 'lucide-react';

export const DataSources = () => {
  const { dataSources, toggleDataSource } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
          Telemetry Integration Gateway
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Manage streaming API services, check hardware node pings, and synchronize local vector caches.
        </p>
      </div>

      {/* Grid of Sources */}
      <div className="grid grid-3" style={{ gap: '20px' }}>
        {dataSources.map(source => {
          const isConnected = source.status === 'Connected';
          const isSyncing = source.status === 'Syncing';
          
          return (
            <div 
              key={source.id} 
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
                border: isConnected ? '1px solid var(--border-color)' : isSyncing ? '1px solid var(--google-yellow)' : '1px solid var(--google-red)',
                opacity: isConnected || isSyncing ? 1 : 0.75
              }}
            >
              {/* Header inside card */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: isConnected ? 'rgba(66, 133, 244, 0.1)' : 'var(--bg-primary)',
                    color: isConnected ? 'var(--google-blue)' : 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Database size={18} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700 }}>{source.name}</h3>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{source.type} Source</span>
                  </div>
                </div>
                
                {/* Connect Switch */}
                <button
                  onClick={() => toggleDataSource(source.id)}
                  style={{
                    cursor: 'pointer',
                    color: isConnected ? 'var(--google-green)' : 'var(--text-tertiary)',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  title={isConnected ? 'Disconnect API' : 'Connect API'}
                >
                  {isConnected ? <Link2 size={18} /> : <Link2Off size={18} />}
                </button>
              </div>

              {/* Status Indicator */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {isConnected ? (
                  <CheckCircle2 size={14} style={{ color: 'var(--google-green)' }} />
                ) : isSyncing ? (
                  <RefreshCw size={14} className="animate-spin" style={{ color: 'var(--google-yellow)' }} />
                ) : (
                  <AlertOctagon size={14} style={{ color: 'var(--google-red)' }} />
                )}
                <span style={{ 
                  fontSize: '0.75rem', 
                  fontWeight: 600,
                  color: isConnected ? 'var(--google-green)' : isSyncing ? '#B27B00' : 'var(--google-red)'
                }}>
                  {source.status.toUpperCase()}
                </span>
              </div>

              {/* Grid Statistics */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px',
                borderTop: '1px solid var(--border-color)',
                paddingTop: '12px',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)'
              }}>
                <div>
                  <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>LATENCY</span>
                  <strong>{source.latency}</strong>
                </div>
                <div>
                  <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>RELIABILITY</span>
                  <strong>{source.reliability}</strong>
                </div>
                <div style={{ marginTop: '4px' }}>
                  <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>SYNC CYCLE</span>
                  <strong>{source.frequency}</strong>
                </div>
                <div style={{ marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Activity size={10} style={{ color: 'var(--google-blue)' }} />
                  <strong>Active Ping</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
