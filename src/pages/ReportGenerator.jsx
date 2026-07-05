import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, Play, Calendar, CheckSquare, Square, RefreshCw, CheckCircle2 } from 'lucide-react';

export const ReportGenerator = () => {
  const { addToast } = useApp();

  const [frequency, setFrequency] = useState('daily');
  const [format, setFormat] = useState('pdf');
  const [sections, setSections] = useState({
    charts: true,
    recommendations: true,
    agentLogs: false,
    iotRaw: false
  });
  const [isCompiling, setIsCompiling] = useState(false);
  const [compileProgress, setCompileProgress] = useState(0);

  const [reportHistory, setReportHistory] = useState([
    { name: "Monthly_Urban_Summary_June.pdf", type: "PDF", size: "3.4 MB", date: "2026-07-01", status: "Available" },
    { name: "Weekly_Commute_Metrics_W26.xlsx", type: "Excel", size: "1.2 MB", date: "2026-06-28", status: "Available" },
    { name: "Environmental_Audit_Q2.pptx", type: "PPTX", size: "8.6 MB", date: "2026-06-15", status: "Available" }
  ]);

  const toggleSection = (key) => {
    setSections({ ...sections, [key]: !sections[key] });
  };

  const handleCompile = (e) => {
    e.preventDefault();
    setIsCompiling(true);
    setCompileProgress(10);
    addToast("Querying BigQuery and Vertex AI datasets...", "info");

    const interval = setInterval(() => {
      setCompileProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            setIsCompiling(false);
            setCompileProgress(0);
            
            const repName = `${frequency.charAt(0).toUpperCase() + frequency.slice(1)}_Intelligence_Report_${new Date().toISOString().split('T')[0]}.${format}`;
            const newReport = {
              name: repName,
              type: format.toUpperCase(),
              size: format === 'pdf' ? '2.4 MB' : format === 'xlsx' ? '820 KB' : '5.1 MB',
              date: new Date().toISOString().split('T')[0],
              status: "Available"
            };

            setReportHistory(prevHistory => [newReport, ...prevHistory]);
            addToast(`Report compiled successfully: ${repName}`, "success");
            
            // Simulate direct file download
            const link = document.createElement("a");
            const fileBlob = new Blob([`CommunityIQ Compiled Report\nFrequency: ${frequency}\nFormat: ${format}\nCompiled: ${new Date().toLocaleString()}`], {type: 'text/plain'});
            link.href = URL.createObjectURL(fileBlob);
            link.download = repName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

          }, 500);
          return 100;
        }
        return prev + 20;
      });
    }, 45000 / 150); // Simulate progress steps over 1.5 seconds
  };

  return (
    <div style={{
      height: 'calc(100vh - 130px)',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '24px'
    }} className="animate-fade-in">

      {/* LEFT COLUMN: BUILDER CONFIG */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={20} style={{ color: 'var(--google-blue)' }} /> Report Compiler
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Trigger cloud functions to aggregate BigQuery warehouse stores into executive summaries.
          </p>
        </div>

        <form onSubmit={handleCompile} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Time scale */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Report Period Frequency</label>
            <select
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              className="form-input"
              style={{ fontWeight: 600, cursor: 'pointer' }}
            >
              <option value="daily">Daily Briefing</option>
              <option value="weekly">Weekly Analysis Digest</option>
              <option value="monthly">Monthly Community Summary</option>
              <option value="annual">Annual Infrastructure Audit</option>
            </select>
          </div>

          {/* Export File Format */}
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Target File Format</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="form-input"
              style={{ fontWeight: 600, cursor: 'pointer' }}
            >
              <option value="pdf">Aesthetic PDF (Standard)</option>
              <option value="xlsx">Structured Excel Spreadsheet (CSV compatible)</option>
              <option value="pptx">Executive PowerPoint Deck</option>
            </select>
          </div>

          {/* Sections selection */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label className="form-label">Telemetry Modules to Include</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => toggleSection('charts')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {sections.charts ? <CheckSquare size={18} style={{ color: 'var(--google-blue)' }} /> : <Square size={18} style={{ color: 'var(--text-tertiary)' }} />}
                <span>Data Charts & Trend Graphs</span>
              </button>
              <button
                type="button"
                onClick={() => toggleSection('recommendations')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {sections.recommendations ? <CheckSquare size={18} style={{ color: 'var(--google-blue)' }} /> : <Square size={18} style={{ color: 'var(--text-tertiary)' }} />}
                <span>Approved & Dismissed Policy Recommendations</span>
              </button>
              <button
                type="button"
                onClick={() => toggleSection('agentLogs')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {sections.agentLogs ? <CheckSquare size={18} style={{ color: 'var(--google-blue)' }} /> : <Square size={18} style={{ color: 'var(--text-tertiary)' }} />}
                <span>AI Multi-Agent Background Task Audit logs</span>
              </button>
              <button
                type="button"
                onClick={() => toggleSection('iotRaw')}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', textAlign: 'left', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {sections.iotRaw ? <CheckSquare size={18} style={{ color: 'var(--google-blue)' }} /> : <Square size={18} style={{ color: 'var(--text-tertiary)' }} />}
                <span>Raw sensor IoT coordinates logs (BigQuery query)</span>
              </button>
            </div>
          </div>

          {/* Compilation progress bar */}
          {isCompiling && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 600 }}>
                <span style={{ color: 'var(--purple-ai)' }}>Vertex AI compiling telemetry indices...</span>
                <span>{compileProgress}%</span>
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--border-color)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ width: `${compileProgress}%`, height: '100%', backgroundColor: 'var(--google-blue)', transition: 'width 0.2s' }} />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isCompiling}
            style={{
              padding: '12px',
              fontSize: '1rem',
              cursor: isCompiling ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              marginTop: '12px'
            }}
          >
            {isCompiling ? (
              <>
                <RefreshCw size={18} className="animate-spin" /> Compiling Document...
              </>
            ) : (
              <>
                <Play size={18} fill="currentColor" /> Compile & Download Report
              </>
            )}
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: DOWNLOAD ARCHIVE */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          Cloud Storage Report Archive
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reportHistory.map((rep, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)'
              }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <FileText size={22} style={{ color: 'var(--google-blue)' }} />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, wordBreak: 'break-all' }}>{rep.name}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{rep.size} &bull; {rep.date}</span>
                </div>
              </div>
              
              <button
                onClick={() => addToast(`Downloading file: ${rep.name}`, "success")}
                className="btn btn-secondary"
                style={{ padding: '8px', borderRadius: '50%', cursor: 'pointer' }}
                title="Download from Cloud Storage"
              >
                <Download size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
