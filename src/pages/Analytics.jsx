import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Download, Calendar, MapPin, Building, Activity, FileText, CheckCircle2 } from 'lucide-react';

export const Analytics = () => {
  const { analyticsFilter, setAnalyticsFilter, addToast } = useApp();
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    addToast(`Compiling analytics tables...`, 'info');
    
    setTimeout(() => {
      setIsExporting(false);
      addToast(`Analytics report exported as ${exportFormat.toUpperCase()}!`, 'success');
      
      const element = document.createElement("a");
      const file = new Blob([`CommunityIQ Analytics Report\nDate: ${analyticsFilter.date}\nArea: ${analyticsFilter.area}\nDepartment: ${analyticsFilter.department}\nPM2.5 Avg: 92 ug/m3\nTraffic Speed Avg: 41.5 km/h\nHospital occupancy: 78.4%`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `CommunityIQ_Analytics_${analyticsFilter.date}.${exportFormat}`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 1800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
            Macro-Analytics Platform
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Filter historical time-series datasets, run cross-department comparisons, and download audit sheets.
          </p>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="card" style={{ padding: '16px 24px' }}>
        <div style={{
          display: 'flex',
          gap: '20px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {/* Date Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Calendar size={18} style={{ color: 'var(--google-blue)' }} />
            <input 
              type="date"
              value={analyticsFilter.date}
              onChange={(e) => setAnalyticsFilter({ ...analyticsFilter, date: e.target.value })}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            />
          </div>

          {/* Area Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <MapPin size={18} style={{ color: 'var(--google-green)' }} />
            <select
              value={analyticsFilter.area}
              onChange={(e) => setAnalyticsFilter({ ...analyticsFilter, area: e.target.value })}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              <option value="all">All Sectors</option>
              <option value="sector1">Sector 1 (Downtown)</option>
              <option value="sector2">Sector 2 (Residential)</option>
              <option value="sector3">Sector 3 (Industrial)</option>
              <option value="sector4">Sector 4 (Waterfront)</option>
              <option value="sector5">Sector 5 (Health City)</option>
            </select>
          </div>

          {/* Department Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building size={18} style={{ color: 'var(--purple-ai)' }} />
            <select
              value={analyticsFilter.department}
              onChange={(e) => setAnalyticsFilter({ ...analyticsFilter, department: e.target.value })}
              style={{
                padding: '6px 12px',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                cursor: 'pointer',
                fontSize: '0.85rem'
              }}
            >
              <option value="all">All Departments</option>
              <option value="transport">Transportation</option>
              <option value="env">Environment & Energy</option>
              <option value="health">Public Healthcare</option>
              <option value="waste">Waste Management</option>
            </select>
          </div>
        </div>
      </div>

      {/* CHARTS GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        
        {/* Line Chart: Telemetry Trends */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)' }}>Weekly Air Quality Index (AQI)</h3>
          
          <div style={{ position: 'relative', height: '220px', width: '100%' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              {/* Grids */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="var(--border-color)" strokeWidth="1" />

              {/* Line path */}
              <path 
                d="M 40,140 L 113,110 L 186,130 L 260,85 L 333,120 L 406,65 L 480,98" 
                fill="none" 
                stroke="var(--google-green)" 
                strokeWidth="3" 
                strokeLinecap="round"
              />

              {/* Node dots */}
              <circle cx="40" cy="140" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />
              <circle cx="113" cy="110" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />
              <circle cx="186" cy="130" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />
              <circle cx="260" cy="85" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />
              <circle cx="333" cy="120" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />
              <circle cx="406" cy="65" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />
              <circle cx="480" cy="98" r="3.5" fill="var(--google-green)" stroke="white" strokeWidth="1" />

              {/* Axes Labels */}
              <text x="35" y="24" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">300 (Haz)</text>
              <text x="35" y="74" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">200 (Poor)</text>
              <text x="35" y="124" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">100 (Mod)</text>
              <text x="35" y="174" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">0 (Good)</text>

              <text x="40" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Mon</text>
              <text x="113" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Tue</text>
              <text x="186" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Wed</text>
              <text x="260" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Thu</text>
              <text x="333" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Fri</text>
              <text x="406" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Sat</text>
              <text x="480" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Sun</text>
            </svg>
          </div>
        </div>

        {/* Bar Chart: Department Resource Draw */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)' }}>Resource Draw by Department</h3>
          
          <div style={{ position: 'relative', height: '220px', width: '100%' }}>
            <svg viewBox="0 0 500 200" width="100%" height="100%">
              {/* Grids */}
              <line x1="40" y1="20" x2="480" y2="20" stroke="var(--border-color)" strokeWidth="0.5" />
              <line x1="40" y1="70" x2="480" y2="70" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="40" y1="120" x2="480" y2="120" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="3,3" />
              <line x1="40" y1="170" x2="480" y2="170" stroke="var(--border-color)" strokeWidth="1" />

              {/* Bars */}
              {/* Bar 1 */}
              <rect x="70" y="50" width="30" height="120" rx="3" fill="var(--google-blue)" />
              {/* Bar 2 */}
              <rect x="170" y="90" width="30" height="80" rx="3" fill="var(--purple-ai)" />
              {/* Bar 3 */}
              <rect x="270" y="120" width="30" height="50" rx="3" fill="var(--google-green)" />
              {/* Bar 4 */}
              <rect x="370" y="30" width="30" height="140" rx="3" fill="var(--orange-warn)" />

              {/* Axes Labels */}
              <text x="35" y="24" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">100%</text>
              <text x="35" y="74" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">50%</text>
              <text x="35" y="174" fill="var(--text-tertiary)" fontSize="8" textAnchor="end">0%</text>

              <text x="85" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Transport</text>
              <text x="185" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Energy</text>
              <text x="285" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Health</text>
              <text x="385" y="186" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle">Waste</text>
            </svg>
          </div>
        </div>

      </div>

      {/* EXPORT DATA PANEL */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-title)' }}>Export filtered telemetry metrics</h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
          Download clean spreadsheets for offsite analytics matching filters: Date ({analyticsFilter.date}), Area ({analyticsFilter.area.toUpperCase()}), Department ({analyticsFilter.department.toUpperCase()}).
        </p>
        
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value)}
            style={{
              padding: '10px 16px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-primary)',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <option value="csv">Standard CSV Spreadsheet</option>
            <option value="pdf">Aggregated PDF Document</option>
          </select>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="btn btn-primary"
            style={{
              padding: '10px 20px',
              fontSize: '0.85rem',
              cursor: isExporting ? 'not-allowed' : 'pointer'
            }}
          >
            {isExporting ? <RefreshCw size={16} className="animate-spin" /> : <Download size={16} />}
            {isExporting ? 'Exporting...' : 'Export Filtered Data'}
          </button>
        </div>
      </div>
    </div>
  );
};
import { X } from 'lucide-react';
