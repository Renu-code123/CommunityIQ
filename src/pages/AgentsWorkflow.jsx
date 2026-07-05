import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockAgents } from '../utils/mockData';
import { 
  Database, LineChart, HelpCircle, Lightbulb, Cpu, MessageSquare, 
  Play, Pause, Server, Activity, ChevronRight, CheckCircle, RefreshCw
} from 'lucide-react';

export const AgentsWorkflow = () => {
  const { addToast } = useApp();
  const [agents, setAgents] = useState(mockAgents);
  const [selectedAgentId, setSelectedAgentId] = useState(1);
  const [isFlowing, setIsFlowing] = useState(true);
  const [agentLogs, setAgentLogs] = useState({});

  // Initialize logs from mock data
  useEffect(() => {
    const initialLogs = {};
    agents.forEach(agent => {
      initialLogs[agent.id] = agent.logs;
    });
    setAgentLogs(initialLogs);
  }, []);

  // Simulating live workflow activity logs updating in background!
  useEffect(() => {
    if (!isFlowing) return;

    const interval = setInterval(() => {
      const randomAgentId = Math.floor(Math.random() * 6) + 1;
      const targetAgent = agents.find(a => a.id === randomAgentId);
      
      const sampleEvents = {
        1: [
          "Ingested traffic congestion nodes on Arterial 3 - Sync: 40ms",
          "Pulled fresh regional humidity levels from open-source weather feed",
          "Logged citizen grievance ticket #CG-778 from online complaint portal",
          "Read live PM2.5 readings from smart sensor array #SS-99"
        ],
        2: [
          "Identified abnormal patient admissions surge at Sector 5 clinic",
          "Detected traffic bottleneck forming at downtown bridge intersection",
          "Flagged anomaly: grid load rate exceeds standard deviations (+12%)",
          "Clustered micro-climate telemetry matching early heatwave warnings"
        ],
        3: [
          "Calculated flood hazard index: waterfront Sector 4 peaking at 84%",
          "Simulated 24-hour congestion curve under incoming weather factors",
          "Projected energy grid draw load curves for tomorrow peak: 24.2 MW",
          "Updated time-series forecast on gastroenteritis clinic admission rates"
        ],
        4: [
          "Evaluated energy grid dimming schedules - Target: 12,000 kWh saved",
          "Drafted sandbag staging route maps for waterfront disaster response",
          "Generated alternative route recommendations for expressway detours",
          "Optimized waste collection route for garbage trucks in residential sector"
        ],
        5: [
          "Dispatched smart dimming commands to Sector 1 & 2 lighting servers",
          "Sent critical air quality warning SMS to residential subscriber list",
          "Created public works work-order for trash container clearing #T-809",
          "Broadcast high tide safety notifications to waterfront sector admins"
        ],
        6: [
          "Translated disaster evacuation details into Hindi & Tamil formats",
          "Filed official grievance request for street light restoration near Central Park",
          "Answered citizen inquiry on location of cooling shelters (English)",
          "Provided step-by-step documentation for solar grid subsidies enrollment"
        ]
      };

      const agentEvents = sampleEvents[randomAgentId];
      const newLog = agentEvents[Math.floor(Math.random() * agentEvents.length)];

      setAgentLogs(prevLogs => {
        const currentAgentLogs = prevLogs[randomAgentId] || [];
        // Keep last 4 logs
        const updatedLogs = [newLog, ...currentAgentLogs.slice(0, 3)];
        return {
          ...prevLogs,
          [randomAgentId]: updatedLogs
        };
      });

      // Show tiny toast occasionally for execution alerts
      if (Math.random() > 0.75) {
        addToast(`Agent "${targetAgent.name}" executed cognitive analysis.`, "info");
      }

    }, 4500);

    return () => clearInterval(interval);
  }, [isFlowing, agents]);

  const agentIcons = {
    1: Database,
    2: LineChart,
    3: HelpCircle,
    4: Lightbulb,
    5: Cpu,
    6: MessageSquare
  };

  const selectedAgent = agents.find(a => a.id === selectedAgentId);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
            Multi-Agent Coordination Canvas
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Monitor and audit background coordination pathways. AI Agents continuously stream, model and execute workflows.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => { setIsFlowing(!isFlowing); addToast(isFlowing ? "Workflow paused." : "Workflow resumed.", "warning"); }}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            {isFlowing ? <Pause size={16} /> : <Play size={16} />}
            {isFlowing ? 'Pause Workflow' : 'Resume Workflow'}
          </button>
        </div>
      </div>

      {/* SVG WORKFLOW CANVAS */}
      <div className="card" style={{
        backgroundColor: 'var(--bg-secondary)',
        padding: '32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '280px'
      }}>
        {/* Connection flowpaths inside canvas */}
        <svg viewBox="0 0 800 200" width="100%" height="auto" style={{ zIndex: 1, maxWidth: '720px' }}>
          <defs>
            <linearGradient id="purpleBlue" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--google-blue)" />
              <stop offset="50%" stopColor="var(--purple-ai)" />
              <stop offset="100%" stopColor="var(--google-green)" />
            </linearGradient>
          </defs>

          {/* Connection Lines between agent nodes */}
          <path d="M 60,100 L 180,100" fill="none" stroke="var(--border-color)" strokeWidth="3" />
          <path d="M 180,100 L 300,100" fill="none" stroke="var(--border-color)" strokeWidth="3" />
          <path d="M 300,100 L 420,100" fill="none" stroke="var(--border-color)" strokeWidth="3" />
          <path d="M 420,100 L 540,100" fill="none" stroke="var(--border-color)" strokeWidth="3" />
          <path d="M 540,100 L 660,100" fill="none" stroke="var(--border-color)" strokeWidth="3" />
          
          {/* Loopback line */}
          <path d="M 660,100 Q 360,20 60,100" fill="none" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="5,5" />

          {/* Glowing Animated Flowing Data Packets */}
          {isFlowing && (
            <>
              <circle cx="60" cy="100" r="5" fill="var(--google-blue)">
                <animate attributeName="cx" values="60;180;300;420;540;660" dur="8s" repeatCount="indefinite" />
              </circle>
              <circle cx="180" cy="100" r="5" fill="var(--purple-ai)">
                <animate attributeName="cx" values="180;300;420;540;660;60" dur="8s" repeatCount="indefinite" />
              </circle>
              <circle cx="420" cy="100" r="5" fill="var(--google-green)">
                <animate attributeName="cx" values="420;540;660;60;180;300" dur="8s" repeatCount="indefinite" />
              </circle>
            </>
          )}

          {/* Agent Nodes */}
          {[1, 2, 3, 4, 5, 6].map((id, index) => {
            const cx = 60 + index * 120;
            const isSelected = selectedAgentId === id;
            return (
              <g 
                key={id} 
                transform={`translate(${cx}, 100)`} 
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedAgentId(id)}
              >
                <circle 
                  cx="0" cy="0" r="24" 
                  fill={isSelected ? 'rgba(139, 92, 246, 0.15)' : 'var(--bg-secondary)'} 
                  stroke={isSelected ? 'var(--purple-ai)' : 'var(--border-color)'} 
                  strokeWidth={isSelected ? '2.5' : '1.5'}
                  className={isSelected ? 'pulse-glow-purple' : ''}
                />
                <circle cx="0" cy="0" r="18" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="0.5" />
                <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="bold" fill="var(--text-primary)">
                  A{id}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Labels below canvas */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          maxWidth: '720px',
          marginTop: '12px',
          fontSize: '0.7rem',
          fontWeight: 600,
          color: 'var(--text-tertiary)',
          textAlign: 'center'
        }}>
          <span style={{ width: '80px' }}>Data Collection</span>
          <span style={{ width: '80px' }}>Insight</span>
          <span style={{ width: '80px' }}>Prediction</span>
          <span style={{ width: '80px' }}>Recommendation</span>
          <span style={{ width: '80px' }}>Automation</span>
          <span style={{ width: '80px' }}>Citizen Support</span>
        </div>
      </div>

      {/* LOWER SECTION: AGENTS OVERVIEW GRID & LIVE LOGGER DETAILS */}
      <div style={{ display: 'grid', gridTemplateColumns: '0.90fr 1.10fr', gap: '24px' }}>
        {/* Left Side: Agent Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {agents.map(agent => {
            const Icon = agentIcons[agent.id];
            const isSelected = selectedAgentId === agent.id;
            return (
              <div 
                key={agent.id}
                onClick={() => setSelectedAgentId(agent.id)}
                className={`card ${isSelected ? 'glow-border' : 'card-hover'}`}
                style={{
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  cursor: 'pointer',
                  border: isSelected ? '1px solid var(--purple-ai)' : '1px solid var(--border-color)',
                  backgroundColor: isSelected ? 'var(--bg-secondary)' : 'var(--bg-secondary)'
                }}
              >
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSelected ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: isSelected ? 'var(--purple-ai)' : 'var(--text-secondary)',
                  flexShrink: 0
                }}>
                  <Icon size={20} />
                </div>
                <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>{agent.name}</span>
                    <span className="badge badge-green" style={{ fontSize: '0.6rem', padding: '1px 5px' }}>{agent.status}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{agent.role} Agent</span>
                </div>
                <ChevronRight size={16} style={{ color: 'var(--text-tertiary)' }} />
              </div>
            );
          })}
        </div>

        {/* Right Side: Selected Agent Auditor Panel */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {selectedAgent && (
            <>
              {/* Auditor Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(139, 92, 246, 0.1)',
                    color: 'var(--purple-ai)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {React.createElement(agentIcons[selectedAgent.id], { size: 24 })}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)' }}>{selectedAgent.name}</h3>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{selectedAgent.role} Node</span>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>API UPTIME</span>
                  <span style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--google-green)' }}>{selectedAgent.uptime}</span>
                </div>
              </div>

              {/* Stats Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>AGGREGATED INGESTS</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{selectedAgent.apiCalls}</span>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>FEED SYNC LATENCY</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--google-blue)' }}>14ms avg</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '6px' }}>Agent Description</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {selectedAgent.description}
                </p>
              </div>

              {/* Data Connections */}
              <div>
                <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Active IO Connections</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {selectedAgent.inputs.map((input, idx) => (
                    <span key={idx} style={{
                      fontSize: '0.75rem',
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-primary)',
                      border: '1px solid var(--border-color)',
                      fontWeight: 500
                    }}>
                      {input}
                    </span>
                  ))}
                </div>
              </div>

              {/* Live Logger */}
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Activity size={16} style={{ color: 'var(--purple-ai)' }} /> Live Event Telemetry Stream
                </h4>
                <div style={{
                  backgroundColor: 'var(--bg-primary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  padding: '12px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  height: '160px',
                  overflowY: 'auto'
                }}>
                  {agentLogs[selectedAgent.id] && agentLogs[selectedAgent.id].length > 0 ? (
                    agentLogs[selectedAgent.id].map((log, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.02)', paddingBottom: '6px' }}>
                        <span style={{ color: 'var(--purple-ai)', fontWeight: 'bold' }}>&gt;</span>
                        <span style={{ color: 'var(--text-secondary)' }}>{log}</span>
                      </div>
                    ))
                  ) : (
                    <span style={{ color: 'var(--text-tertiary)', textAlign: 'center', padding: '24px 0' }}>No telemetry logs.</span>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
