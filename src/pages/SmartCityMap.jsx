import React, { useState } from 'react';
import { sectorTelemetry } from '../utils/mockData';
import { Map, Layers, CheckSquare, Square, Info, ShieldAlert, Thermometer, MapPin } from 'lucide-react';

export const SmartCityMap = () => {
  const [layers, setLayers] = useState({
    traffic: true,
    flood: false,
    hospitals: true,
    pollution: false
  });

  const [selectedSector, setSelectedSector] = useState(1);
  const [hoveredSector, setHoveredSector] = useState(null);

  const toggleLayer = (key) => {
    setLayers({ ...layers, [key]: !layers[key] });
  };

  const getSectorColor = (id) => {
    const isSelected = selectedSector === id;
    const isHovered = hoveredSector === id;
    
    if (layers.pollution) {
      // AQI Heatmap coloring
      if (id === 3) return 'rgba(234, 67, 53, 0.45)'; // Hazardous industrial
      if (id === 1) return 'rgba(251, 188, 5, 0.3)';  // Moderate downtown
      return 'rgba(52, 168, 83, 0.2)';                // Good residential/coastal
    }

    if (isSelected) return 'rgba(66, 133, 244, 0.15)';
    if (isHovered) return 'rgba(66, 133, 244, 0.05)';
    return 'var(--bg-secondary)';
  };

  const getSectorBorder = (id) => {
    const isSelected = selectedSector === id;
    if (isSelected) return 'var(--google-blue)';
    return 'var(--border-color)';
  };

  return (
    <div style={{
      height: 'calc(100vh - 130px)',
      display: 'grid',
      gridTemplateColumns: '1.4fr 0.6fr',
      gap: '24px'
    }} className="animate-fade-in">
      
      {/* LEFT COLUMN: LARGE MAP INTERACTION */}
      <div className="card" style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px',
        overflow: 'hidden'
      }}>
        {/* Layer Controller overlay */}
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '12px 16px',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)'
        }}>
          <h4 style={{ fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, borderBottom: '1px solid var(--border-color)', paddingBottom: '6px' }}>
            <Layers size={14} style={{ color: 'var(--google-blue)' }} /> Map Layers
          </h4>
          
          <button
            onClick={() => toggleLayer('traffic')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.75rem', textAlign: 'left' }}
          >
            {layers.traffic ? <CheckSquare size={14} style={{ color: 'var(--google-blue)' }} /> : <Square size={14} />}
            <span>Traffic Overlay</span>
          </button>
          
          <button
            onClick={() => toggleLayer('flood')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.75rem', textAlign: 'left' }}
          >
            {layers.flood ? <CheckSquare size={14} style={{ color: 'var(--google-blue)' }} /> : <Square size={14} />}
            <span>Flood Hazard Zones</span>
          </button>
          
          <button
            onClick={() => toggleLayer('hospitals')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.75rem', textAlign: 'left' }}
          >
            {layers.hospitals ? <CheckSquare size={14} style={{ color: 'var(--google-blue)' }} /> : <Square size={14} />}
            <span>Hospitals & Schools</span>
          </button>
          
          <button
            onClick={() => toggleLayer('pollution')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.75rem', textAlign: 'left' }}
          >
            {layers.pollution ? <CheckSquare size={14} style={{ color: 'var(--google-blue)' }} /> : <Square size={14} />}
            <span>AQI Heatmap Overlay</span>
          </button>
        </div>

        {/* Large SVG Smart Map representation */}
        <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 500 400" width="100%" height="100%" style={{ maxHeight: '380px' }}>
            
            {/* GRID LINES FOR FUTURISTIC HUD LOOK */}
            <path d="M 0,100 L 500,100 M 0,200 L 500,200 M 0,300 L 500,300 M 100,0 L 100,400 M 200,0 L 200,400 M 300,0 L 300,400 M 400,0 L 400,400" fill="none" stroke="var(--border-color)" strokeWidth="0.25" strokeDasharray="2,5" />

            {/* SECTORS polygons */}
            {/* Sector 1: Downtown */}
            <polygon 
              points="250,200 130,100 370,100" 
              fill={getSectorColor(1)} 
              stroke={getSectorBorder(1)}
              strokeWidth={selectedSector === 1 ? 2.5 : 1.5}
              style={{ transition: 'fill 0.2s', cursor: 'pointer' }}
              onClick={() => setSelectedSector(1)}
              onMouseEnter={() => setHoveredSector(1)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="250" y="140" fill="var(--text-primary)" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
              Sector 1 (Downtown)
            </text>

            {/* Sector 2: Residential */}
            <polygon 
              points="250,200 370,100 370,300" 
              fill={getSectorColor(2)} 
              stroke={getSectorBorder(2)}
              strokeWidth={selectedSector === 2 ? 2.5 : 1.5}
              style={{ transition: 'fill 0.2s', cursor: 'pointer' }}
              onClick={() => setSelectedSector(2)}
              onMouseEnter={() => setHoveredSector(2)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="320" y="200" fill="var(--text-primary)" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
              Sector 2 (Residential)
            </text>

            {/* Sector 3: Industrial */}
            <polygon 
              points="250,200 370,300 130,300" 
              fill={getSectorColor(3)} 
              stroke={getSectorBorder(3)}
              strokeWidth={selectedSector === 3 ? 2.5 : 1.5}
              style={{ transition: 'fill 0.2s', cursor: 'pointer' }}
              onClick={() => setSelectedSector(3)}
              onMouseEnter={() => setHoveredSector(3)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="250" y="270" fill="var(--text-primary)" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
              Sector 3 (Industrial)
            </text>

            {/* Sector 4: Waterfront */}
            <polygon 
              points="250,200 130,300 130,100" 
              fill={getSectorColor(4)} 
              stroke={getSectorBorder(4)}
              strokeWidth={selectedSector === 4 ? 2.5 : 1.5}
              style={{ transition: 'fill 0.2s', cursor: 'pointer' }}
              onClick={() => setSelectedSector(4)}
              onMouseEnter={() => setHoveredSector(4)}
              onMouseLeave={() => setHoveredSector(null)}
            />
            <text x="175" y="200" fill="var(--text-primary)" fontSize="10" fontWeight="bold" textAnchor="middle" pointerEvents="none">
              Sector 4 (Waterfront)
            </text>

            {/* FLOOD DANGER OVERLAYS (Rings over sector 4 Waterfront) */}
            {layers.flood && (
              <g pointerEvents="none">
                <circle cx="160" cy="180" r="32" fill="none" stroke="var(--google-red)" strokeWidth="1.5" strokeDasharray="3,3" className="pulse-glow-purple" />
                <circle cx="150" cy="220" r="24" fill="none" stroke="var(--google-red)" strokeWidth="1.5" strokeDasharray="3,3" />
                <text x="145" y="165" fill="var(--google-red)" fontSize="7" fontWeight="bold">Flood hazard zone</text>
              </g>
            )}

            {/* TRAFFIC ROAD OVERLAYS */}
            {layers.traffic && (
              <g strokeLinecap="round" strokeWidth="4" pointerEvents="none">
                {/* Sector 1: Red artery */}
                <line x1="230" y1="120" x2="270" y2="120" stroke="var(--google-red)" />
                {/* Sector 2: Green artery */}
                <line x1="310" y1="170" x2="350" y2="230" stroke="var(--google-green)" />
                {/* Sector 3: Yellow artery */}
                <line x1="220" y1="280" x2="280" y2="280" stroke="var(--google-yellow)" />
              </g>
            )}

            {/* HOSPITALS & SCHOOLS MARKERS */}
            {layers.hospitals && (
              <g pointerEvents="none">
                {/* Sector 5 Hospital Marker (Node 5) */}
                <g transform="translate(350, 260)">
                  <circle cx="0" cy="0" r="8" fill="var(--google-red)" stroke="white" strokeWidth="1" />
                  <text x="0" y="3" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">H</text>
                </g>
                {/* School Marker Downtown */}
                <g transform="translate(200, 130)">
                  <circle cx="0" cy="0" r="8" fill="var(--google-blue)" stroke="white" strokeWidth="1" />
                  <text x="0" y="3" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">S</text>
                </g>
              </g>
            )}

            {/* Interactive node Sector 5: Health City */}
            <g 
              transform="translate(380, 240)"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedSector(5)}
            >
              <circle 
                cx="0" cy="0" r="14" 
                fill={selectedSector === 5 ? 'rgba(139, 92, 246, 0.2)' : 'var(--bg-secondary)'} 
                stroke="var(--purple-ai)" 
                strokeWidth={selectedSector === 5 ? 2.5 : 1.5}
              />
              <text x="0" y="3" fontSize="8" fontWeight="bold" textAnchor="middle" fill="var(--text-primary)">S5</text>
            </g>

          </svg>
        </div>
      </div>

      {/* RIGHT COLUMN: READOUT DETAIL */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={18} style={{ color: 'var(--google-red)' }} /> Sector Sensory Grid
        </h3>

        {selectedSector && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '12px', backgroundColor: 'var(--bg-primary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600, display: 'block' }}>TARGET INSPECT AREA</span>
              <strong style={{ fontSize: '1.1rem' }}>{sectorTelemetry[selectedSector].name}</strong>
            </div>

            {/* Grid properties */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>TRAFFIC CAPACITY FLOW</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{sectorTelemetry[selectedSector].traffic}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>PARTICULATE AIR QUALITY</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: selectedSector === 3 ? 'var(--google-red)' : 'inherit' }}>
                  {sectorTelemetry[selectedSector].aqi}
                </span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>CITIZEN RESIDENT SATISFACTION</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{sectorTelemetry[selectedSector].satisfaction}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>HOSPITAL EMERGENCY OCCUPANCY</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{sectorTelemetry[selectedSector].healthcare}</span>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>UTILITY POWER DRAW RATE</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{sectorTelemetry[selectedSector].energy}</span>
              </div>
            </div>

            {/* Alerts connected to sector */}
            {sectorTelemetry[selectedSector].alertsCount > 0 ? (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(234, 67, 53, 0.08)',
                border: '1px solid rgba(234, 67, 53, 0.2)',
                color: 'var(--google-red)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                <ShieldAlert size={16} />
                <span>Sector has active unresolved warnings. Check Alert Center!</span>
              </div>
            ) : (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(52, 168, 83, 0.08)',
                border: '1px solid rgba(52, 168, 83, 0.2)',
                color: 'var(--google-green)',
                fontSize: '0.8rem',
                fontWeight: 600
              }}>
                <CheckCircle2 size={16} style={{ color: 'var(--google-green)' }} />
                <span>Sector telemetry limits are stable.</span>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
import { CheckCircle2 } from 'lucide-react';
