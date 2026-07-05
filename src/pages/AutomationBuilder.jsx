import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Cpu, Plus, Sparkles, CheckCircle2, RefreshCw, Trash2, ArrowRight } from 'lucide-react';

export const AutomationBuilder = () => {
  const { automations, addAutomation, addToast } = useApp();

  const [trigger, setTrigger] = useState('Pollution AQI > 250');
  const [condition, setCondition] = useState('Department = Public Health');
  const [action, setAction] = useState('Send SMS Alert & Notify Hospital networks');
  const [isAssembling, setIsAssembling] = useState(false);

  const triggerOptions = [
    'Pollution AQI > 250',
    'Waterfront Flood Risk > 80%',
    'Hospital Occupancy > 90%',
    'Power Grid Load > 95%',
    'Traffic Congestion Delay > 30 mins'
  ];

  const conditionOptions = [
    'Department = Public Health',
    'Tide = High Tide Alert',
    'Time between 12:00 - 18:00',
    'Sector = Sector 1 (Downtown)',
    'None'
  ];

  const actionOptions = [
    'Send SMS Alert & Notify Hospital networks',
    'Deploy Sand Barriers & Close floodgate 3',
    'Flag Recommendation: Open Temporary Clinic',
    'Auto-dim street lights & Alert large commercial grids',
    'Dispatch supplementary transit shuttle buses'
  ];

  const handleAssembleRule = (e) => {
    e.preventDefault();
    setIsAssembling(true);

    setTimeout(() => {
      setIsAssembling(false);
      addAutomation({
        trigger,
        condition,
        action
      });
    }, 1200);
  };

  return (
    <div style={{
      height: 'calc(100vh - 130px)',
      display: 'grid',
      gridTemplateColumns: '1.2fr 0.8fr',
      gap: '24px'
    }} className="animate-fade-in">

      {/* LEFT COLUMN: VISUAL FLOW CANVAS */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={20} style={{ color: 'var(--google-blue)' }} /> Visual Workflow Canvas
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Assemble logical modules to direct automation loops in the Smart City infrastructure.
          </p>
        </div>

        {/* Visual blocks */}
        <form onSubmit={handleAssembleRule} style={{ display: 'flex', flexDirection: 'column', gap: '20px', flexGrow: 1, justifyContent: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            {/* Block 1: TRIGGER */}
            <div style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: 'rgba(66, 133, 244, 0.05)',
              border: '2px solid var(--google-blue)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              position: 'relative'
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--google-blue)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>1. If Trigger Occurs</span>
              <select
                value={trigger}
                onChange={(e) => setTrigger(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {triggerOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <ArrowRight size={18} style={{ transform: 'rotate(90deg)', color: 'var(--text-tertiary)' }} />

            {/* Block 2: CONDITION */}
            <div style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              border: '2px solid var(--purple-ai)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              position: 'relative'
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--purple-ai)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>2. Under Condition</span>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {conditionOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <ArrowRight size={18} style={{ transform: 'rotate(90deg)', color: 'var(--text-tertiary)' }} />

            {/* Block 3: ACTION */}
            <div style={{
              width: '100%',
              maxWidth: '360px',
              backgroundColor: 'rgba(52, 168, 83, 0.05)',
              border: '2px solid var(--google-green)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px',
              position: 'relative'
            }}>
              <span style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--google-green)', display: 'block', textTransform: 'uppercase', marginBottom: '6px' }}>3. Execute Action</span>
              <select
                value={action}
                onChange={(e) => setAction(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {actionOptions.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isAssembling}
            style={{
              width: '100%',
              maxWidth: '360px',
              margin: '20px auto 0 auto',
              padding: '12px',
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            {isAssembling ? (
              <>
                <RefreshCw size={16} className="animate-spin" /> Compiling Graph...
              </>
            ) : (
              <>
                <Plus size={18} /> Initialize Trigger Workflow
              </>
            )}
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: ACTIVE RULES & LOGS */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
          Active Automations Rules ({automations.length})
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {automations.map(rule => (
            <div 
              key={rule.id}
              style={{
                padding: '14px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{rule.id}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>RUNS: {rule.runs}</span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                <div>If: <strong>{rule.trigger}</strong></div>
                <div>Condition: <strong>{rule.condition}</strong></div>
                <div style={{ color: 'var(--google-green)', marginTop: '4px' }}>Then: <strong>{rule.action}</strong></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
