import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { sectorTelemetry } from '../utils/mockData';
import { 
  Car, Leaf, HeartHandshake, ShieldAlert, Zap, Trash2,
  TrendingUp, CheckCircle, AlertTriangle, Play, RefreshCw, Sparkles, MapPin
} from 'lucide-react';

export const Dashboard = () => {
  const { 
    stats, 
    alerts, 
    recommendations, 
    handleAcceptRecommendation, 
    handleRejectRecommendation, 
    resolveAlert,
    setCurrentPage 
  } = useApp();

  const [selectedSector, setSelectedSector] = useState(1);

  // Active items
  const activeAlerts = alerts.filter(a => a.status === 'Unresolved');
  const activeRecs = recommendations.filter(r => r.status === 'Pending').slice(0, 2);

  // Helper for environment dial styling
  const getAqiColor = (aqi) => {
    if (aqi <= 100) return 'var(--google-green)';
    if (aqi <= 200) return 'var(--google-yellow)';
    return 'var(--google-red)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
            Smart Community Telemetry
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Real-time sensory feeds aggregated by Multi-Agent networks.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => setCurrentPage('chat')}
            className="btn btn-secondary" 
            style={{ fontSize: '0.85rem' }}
          >
            <Sparkles size={16} style={{ color: 'var(--purple-ai)' }} /> Ask AI Assistant
          </button>
          <button 
            onClick={() => { window.location.reload(); }}
            className="btn btn-secondary" 
            style={{ fontSize: '0.85rem' }}
          >
            <RefreshCw size={16} /> Sync Feeds
          </button>
        </div>
      </div>

      {/* METRICS GRID CARD SECTION */}
      <div className="grid grid-3" style={{ gap: '20px' }}>
        {/* Card 1: Traffic */}
        <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(66, 133, 244, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--google-blue)',
            flexShrink: 0
          }}>
            <Car size={26} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Traffic Speed</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {stats.trafficSpeed} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>km/h</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: stats.trafficSpeed >= 40 ? 'var(--google-green)' : 'var(--google-red)', fontWeight: 600 }}>
              {stats.trafficSpeed >= 40 ? 'Flowing Stable' : 'Congestion Detected'}
            </div>
          </div>
        </div>

        {/* Card 2: AQI */}
        <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(52, 168, 83, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--google-green)',
            flexShrink: 0
          }}>
            <Leaf size={26} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Environment AQI</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {stats.aqiScore} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Index</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: getAqiColor(stats.aqiScore), fontWeight: 600 }}>
              {stats.aqiScore <= 100 ? 'Air Quality: Good' : stats.aqiScore <= 150 ? 'Moderate Particle Density' : 'Hazardous Pollution Level'}
            </div>
          </div>
        </div>

        {/* Card 3: Satisfaction */}
        <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--purple-ai)',
            flexShrink: 0
          }}>
            <HeartHandshake size={26} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Citizen Satisfaction</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {stats.citizenSatisfaction}% <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Rating</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--google-blue)', fontWeight: 600 }}>
              +1.4% improvement this week
            </div>
          </div>
        </div>

        {/* Card 4: Healthcare */}
        <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(234, 67, 53, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--google-red)',
            flexShrink: 0
          }}>
            <ShieldAlert size={26} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Hospital Capacity</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {stats.healthcareLoad}% <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Bed Occupancy</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: stats.healthcareLoad > 85 ? 'var(--google-red)' : 'var(--google-green)', fontWeight: 600 }}>
              {stats.healthcareLoad > 85 ? 'Critical load warning' : 'Normal capacity threshold'}
            </div>
          </div>
        </div>

        {/* Card 5: Energy */}
        <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(251, 188, 5, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#B27B00',
            flexShrink: 0
          }}>
            <Zap size={26} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Grid Demand</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {stats.energyDemand} <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>MW</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Peak Capacity: 30.0 MW
            </div>
          </div>
        </div>

        {/* Card 6: Waste */}
        <div className="card card-hover" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(249, 115, 22, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--orange-warn)',
            flexShrink: 0
          }}>
            <Trash2 size={26} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>Waste Collection</span>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              {stats.wasteCollection}% <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-secondary)' }}>Cleared</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--google-green)', fontWeight: 600 }}>
              Optimization routes loaded
            </div>
          </div>
        </div>
      </div>

      {/* MID SECTION: CHARTS & DYNAMIC SECTOR INSPECTOR MAP */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px' }}>
        {/* SVG charts */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)' }}>Hourly Traffic & Congestion Trends</h3>
            <span className="badge badge-blue">Real-Time Sync</span>
          </div>

          {/* SVG Area Chart representing congestion profile */}
          <div style={{ position: 'relative', height: '240px', width: '100%' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              {/* Grids */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="var(--border-color)" strokeWidth="1" />

              {/* Area path */}
              <path 
                d="M 40,170 C 80,160 120,130 160,80 C 200,30 240,120 280,140 C 320,160 360,70 400,60 C 440,50 460,90 480,110 L 480,170 Z" 
                fill="rgba(66, 133, 244, 0.12)" 
              />

              {/* Line path */}
              <path 
                d="M 40,170 C 80,160 120,130 160,80 C 200,30 240,120 280,140 C 320,160 360,70 400,60 C 440,50 460,90 480,110" 
                fill="none" 
                stroke="var(--google-blue)" 
                strokeWidth="3" 
                strokeLinecap="round"
              />

              {/* Data Node Dots */}
              <circle cx="160" cy="80" r="4" fill="var(--google-blue)" stroke="white" strokeWidth="1.5" />
              <circle cx="200" cy="30" r="4" fill="var(--google-red)" stroke="white" strokeWidth="1.5" className="pulse-glow-purple" />
              <circle cx="400" cy="60" r="4" fill="var(--google-blue)" stroke="white" strokeWidth="1.5" />

              {/* Node Labels */}
              <text x="200" y="20" fill="var(--google-red)" fontSize="8" fontWeight="bold" textAnchor="middle">08:30 Rush Peak</text>

              {/* Axes Labels */}
              <text x="35" y="24" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">Critical</text>
              <text x="35" y="74" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">High</text>
              <text x="35" y="124" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">Moderate</text>
              <text x="35" y="174" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">Low</text>

              <text x="40" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">00:00</text>
              <text x="120" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">06:00</text>
              <text x="200" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">12:00</text>
              <text x="280" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">15:00</text>
              <text x="360" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">18:00</text>
              <text x="440" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">21:00</text>
            </svg>
          </div>
        </div>

        {/* Sector Interactive Map Widget */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)' }}>Sector Sensor Network</h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Click map sectors to query live IoT nodes.</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
            {/* SVG Interactive Map representation */}
            <svg viewBox="0 0 200 200" style={{ width: '100%', height: 'auto', maxHeight: '150px' }}>
              {/* Sector 1: Center/Downtown */}
              <polygon 
                points="100,100 60,60 140,60" 
                fill={selectedSector === 1 ? 'rgba(66, 133, 244, 0.4)' : 'var(--bg-primary)'} 
                stroke={selectedSector === 1 ? 'var(--google-blue)' : 'var(--border-color)'}
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedSector(1)}
              />
              {/* Sector 2: Right/Residential */}
              <polygon 
                points="100,100 140,60 140,140" 
                fill={selectedSector === 2 ? 'rgba(52, 168, 83, 0.3)' : 'var(--bg-primary)'} 
                stroke={selectedSector === 2 ? 'var(--google-green)' : 'var(--border-color)'}
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedSector(2)}
              />
              {/* Sector 3: Bottom/Industrial */}
              <polygon 
                points="100,100 140,140 60,140" 
                fill={selectedSector === 3 ? 'rgba(234, 67, 53, 0.3)' : 'var(--bg-primary)'} 
                stroke={selectedSector === 3 ? 'var(--google-red)' : 'var(--border-color)'}
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedSector(3)}
              />
              {/* Sector 4: Left/Waterfront */}
              <polygon 
                points="100,100 60,140 60,60" 
                fill={selectedSector === 4 ? 'rgba(251, 188, 5, 0.3)' : 'var(--bg-primary)'} 
                stroke={selectedSector === 4 ? 'var(--google-yellow)' : 'var(--border-color)'}
                strokeWidth="1.5"
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedSector(4)}
              />
              {/* Small Hospital dot marker Sector 5 */}
              <circle 
                cx="150" cy="150" r="10" 
                fill={selectedSector === 5 ? 'rgba(139, 92, 246, 0.4)' : 'var(--bg-secondary)'} 
                stroke="var(--purple-ai)" 
                strokeWidth="1.5" 
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedSector(5)}
              />
              <text x="150" y="153" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-primary)" style={{ cursor: 'pointer' }} onClick={() => setSelectedSector(5)}>H</text>
            </svg>

            {/* Readouts side panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: 'var(--bg-primary)', padding: '12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
                <MapPin size={12} style={{ color: 'var(--google-blue)' }} />
                <span>{sectorTelemetry[selectedSector].name}</span>
              </div>
              <div style={{ fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px', color: 'var(--text-secondary)' }}>
                <div>Traffic: <b>{sectorTelemetry[selectedSector].traffic}</b></div>
                <div>Pollution: <b style={{ color: selectedSector === 3 ? 'var(--google-red)' : 'inherit' }}>{sectorTelemetry[selectedSector].aqi}</b></div>
                <div>Healthcare: <b>{sectorTelemetry[selectedSector].healthcare}</b></div>
                <div>Energy Draw: <b>{sectorTelemetry[selectedSector].energy}</b></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LOWER SECTION: ALERTS & RECOMMENDATIONS QUICK INTERACTION */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Quick Alerts Handler */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldAlert size={18} style={{ color: 'var(--google-red)' }} /> Critical Unresolved Warnings
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--google-red)', fontWeight: 600 }}>
              {activeAlerts.length} Warnings Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
            {activeAlerts.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: '8px', flexGrow: 1 }}>
                <CheckCircle size={36} style={{ color: 'var(--google-green)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>All community sectors operating stable.</span>
              </div>
            ) : (
              activeAlerts.slice(0, 2).map(alert => (
                <div 
                  key={alert.id} 
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    borderLeft: `4px solid ${alert.severity === 'Critical' ? 'var(--google-red)' : 'var(--orange-warn)'}`,
                    backgroundColor: 'var(--bg-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '70%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className={`badge ${alert.severity === 'Critical' ? 'badge-red' : 'badge-orange'}`} style={{ fontSize: '0.65rem' }}>
                        {alert.severity}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{alert.time}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{alert.title}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{alert.sector}</span>
                  </div>
                  <button 
                    onClick={() => resolveAlert(alert.id)}
                    className="btn btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                  >
                    Dispatch Action
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Recommendation approving */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={18} style={{ color: 'var(--google-blue)' }} /> High Impact AI Proposals
            </h3>
            <button 
              onClick={() => setCurrentPage('recommendations')} 
              style={{ fontSize: '0.8rem', color: 'var(--google-blue)', cursor: 'pointer', fontWeight: 600 }}
            >
              Configure Hub
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
            {activeRecs.length === 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', gap: '8px', flexGrow: 1 }}>
                <CheckCircle size={36} style={{ color: 'var(--google-green)' }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>All recommendations processed.</span>
              </div>
            ) : (
              activeRecs.map(rec => (
                <div 
                  key={rec.id} 
                  style={{
                    padding: '16px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--bg-primary)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxWidth: '70%' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{rec.department}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--google-green)', fontWeight: 600 }}>ROI: {rec.impact}</span>
                    </div>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{rec.title}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {rec.description}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleRejectRecommendation(rec.id)}
                      className="btn btn-secondary"
                      style={{ padding: '6px 10px', fontSize: '0.75rem' }}
                    >
                      Dismiss
                    </button>
                    <button 
                      onClick={() => handleAcceptRecommendation(rec.id)}
                      className="btn btn-primary"
                      style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
