import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, Clock, MapPin, Send } from 'lucide-react';

export const AlertCenter = () => {
  const { alerts, resolveAlert } = useApp();
  const [filterSeverity, setFilterSeverity] = useState('all');

  const filteredAlerts = alerts.filter(alert => {
    if (filterSeverity === 'all') return true;
    return alert.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  const getAlertIcon = (severity) => {
    if (severity === 'Critical') return <ShieldAlert size={20} style={{ color: 'var(--google-red)' }} />;
    if (severity === 'High') return <AlertTriangle size={20} style={{ color: 'var(--orange-warn)' }} />;
    return <Info size={20} style={{ color: 'var(--google-blue)' }} />;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
            Incident Command Center
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Monitor and resolve real-time emergency incidents. Triggers dispatches directly to public response units.
          </p>
        </div>
      </div>

      {/* Severity Filter Chips */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {['all', 'Critical', 'High', 'Medium'].map(sev => (
          <button
            key={sev}
            onClick={() => setFilterSeverity(sev)}
            style={{
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              backgroundColor: filterSeverity === sev ? 'var(--google-blue)' : 'var(--bg-secondary)',
              color: filterSeverity === sev ? 'white' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {sev.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid containing Alerts list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filteredAlerts.length === 0 ? (
          <div className="card text-center" style={{ padding: '60px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
            <CheckCircle size={48} style={{ color: 'var(--google-green)' }} />
            <span style={{ fontWeight: 600 }}>No unresolved incidents found.</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>All community telemetry is within standard tolerances.</span>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div 
              key={alert.id}
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                gap: '24px',
                alignItems: 'center',
                borderLeft: `5px solid ${alert.severity === 'Critical' ? 'var(--google-red)' : alert.severity === 'High' ? 'var(--orange-warn)' : 'var(--google-blue)'}`,
                opacity: alert.status === 'Resolved' ? 0.7 : 1
              }}
            >
              {/* Left Column icon */}
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--bg-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getAlertIcon(alert.severity)}
              </div>

              {/* Center Column details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={`badge ${alert.severity === 'Critical' ? 'badge-red' : alert.severity === 'High' ? 'badge-orange' : 'badge-blue'}`} style={{ fontSize: '0.65rem' }}>
                    {alert.severity}
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{alert.category}</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {alert.time}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{alert.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                  {alert.details}
                </p>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                  <MapPin size={12} style={{ color: 'var(--google-red)' }} /> {alert.sector}
                </div>
              </div>

              {/* Right Column Action */}
              <div>
                {alert.status === 'Unresolved' ? (
                  <button
                    onClick={() => resolveAlert(alert.id)}
                    className="btn btn-primary"
                    style={{
                      padding: '10px 16px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    <Send size={14} /> Dispatch Response
                  </button>
                ) : (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--google-green)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    border: '1px solid rgba(52, 168, 83, 0.2)',
                    backgroundColor: 'rgba(52, 168, 83, 0.05)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)'
                  }}>
                    <CheckCircle size={16} /> Dispatched & Resolved
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
