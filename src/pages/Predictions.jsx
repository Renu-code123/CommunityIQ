import React from 'react';
import { HelpCircle, TrendingUp, AlertTriangle, CheckCircle, Info, BarChart2 } from 'lucide-react';

export const Predictions = () => {
  const forecasts = [
    {
      id: "PR-01",
      title: "Waterfront Tidal Flood Hazard",
      confidence: "94.8%",
      risk: "Critical",
      trend: "Rising sharply",
      timeframe: "Tomorrow at 14:00 (High Tide)",
      explanation: "Driven by 45mm predicted heavy precipitation coinciding with +2.74m spring high tide. Soil moisture is saturated at 92%.",
      features: [
        { name: "Tidal Level Height", weight: "42%", hazard: "Critical" },
        { name: "Projected Rain Vol", weight: "28%", hazard: "High" },
        { name: "Soil Water Saturation", weight: "22%", hazard: "High" },
        { name: "Drainage Valve Status", weight: "8%", hazard: "Low" }
      ]
    },
    {
      id: "PR-02",
      title: "Regional Energy Grid Peak Load",
      confidence: "92.1%",
      risk: "High",
      trend: "Rising",
      timeframe: "Next 48 Hours",
      explanation: "Incoming summer heatwave projects 44°C ambient temperatures, causing intensive residential air-conditioner draw.",
      features: [
        { name: "Ambient Temperature Forecast", weight: "55%", hazard: "Critical" },
        { name: "Commercial Office Hours", weight: "25%", hazard: "High" },
        { name: "Substation Thermal Latency", weight: "12%", hazard: "Medium" },
        { name: "Solar Generation Capacity", weight: "-8%", hazard: "Mitigating" }
      ]
    },
    {
      id: "PR-03",
      title: "Arterial Expressway Gridlock",
      confidence: "88.5%",
      risk: "High",
      trend: "Rising",
      timeframe: "Today at 17:30 (Evening Peak)",
      explanation: "Construction bottle-neck on highway lanes, coupled with minor accident backlog, creates secondary spillover queues.",
      features: [
        { name: "Lane Obstruction Construction", weight: "48%", hazard: "High" },
        { name: "Commuter Rush Volume", weight: "32%", hazard: "High" },
        { name: "Adverse Drizzle Weather", weight: "15%", hazard: "Medium" },
        { name: "Alternative Shuttle Frequency", weight: "-5%", hazard: "Mitigating" }
      ]
    },
    {
      id: "PR-04",
      title: "Public Health Gastric Disease Outbreak",
      confidence: "74.2%",
      risk: "Medium",
      trend: "Stable",
      timeframe: "Next 7 Days",
      explanation: "Fecal coliform telemetry spikes in Sector 5 secondary lines. Clinic intake records minor abdominal complaints.",
      features: [
        { name: "Sensory Water Coliform Count", weight: "50%", hazard: "High" },
        { name: "Weekly Admissions Growth", weight: "30%", hazard: "Medium" },
        { name: "Ambient Humidity Spikes", weight: "12%", hazard: "Low" },
        { name: "Water Purification Dosage", weight: "-8%", hazard: "Mitigating" }
      ]
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
          Predictive Analytics Hub
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Time-series projections, hazard assessments, and Explainable AI (XAI) feature attribution maps.
        </p>
      </div>

      {/* Grid of Predictions */}
      <div className="grid grid-2" style={{ gap: '24px' }}>
        {forecasts.map(pred => (
          <div key={pred.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Title / Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--purple-ai)' }}>{pred.id}</span>
                <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)', marginTop: '2px' }}>{pred.title}</h3>
              </div>
              <span className={`badge ${pred.risk === 'Critical' ? 'badge-red' : pred.risk === 'High' ? 'badge-orange' : 'badge-yellow'}`}>
                {pred.risk} Risk
              </span>
            </div>

            {/* Core Metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
              <div>
                <span style={{ display: 'block', color: 'var(--text-tertiary)', fontWeight: 600 }}>CONFIDENCE LEVEL</span>
                <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--google-blue)' }}>{pred.confidence}</span>
              </div>
              <div>
                <span style={{ display: 'block', color: 'var(--text-tertiary)', fontWeight: 600 }}>TREND STATUS</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{pred.trend}</span>
              </div>
              <div>
                <span style={{ display: 'block', color: 'var(--text-tertiary)', fontWeight: 600 }}>TIMEFRAME</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{pred.timeframe}</span>
              </div>
            </div>

            {/* Explanation paragraph */}
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', fontSize: '0.85rem', lineHeight: 1.5 }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start', marginBottom: '4px' }}>
                <Info size={14} style={{ color: 'var(--google-blue)', flexShrink: 0, marginTop: '2px' }} />
                <strong>Model Reasoning Summary:</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>{pred.explanation}</p>
            </div>

            {/* Explainable AI weights */}
            <div>
              <h4 style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                <BarChart2 size={16} style={{ color: 'var(--purple-ai)' }} /> Feature Hazard Attribution
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {pred.features.map((feat, idx) => {
                  const isNeg = feat.weight.startsWith('-');
                  const numWeight = parseFloat(feat.weight.replace('%', ''));
                  const absWeight = Math.abs(numWeight);
                  const barWidth = `${absWeight}%`;
                  const barColor = isNeg ? 'var(--google-green)' : feat.hazard === 'Critical' ? 'var(--google-red)' : feat.hazard === 'High' ? 'var(--orange-warn)' : 'var(--google-blue)';

                  return (
                    <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 500 }}>
                        <span style={{ color: 'var(--text-secondary)' }}>{feat.name}</span>
                        <span style={{ fontWeight: 600, color: isNeg ? 'var(--google-green)' : 'var(--text-primary)' }}>
                          {feat.weight}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: barWidth, height: '100%', backgroundColor: barColor }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
