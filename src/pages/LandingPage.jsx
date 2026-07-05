import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  MessageSquare, BrainCircuit, LineChart, HelpCircle, 
  Lightbulb, ShieldAlert, Cpu, Sparkles, ArrowRight, Play
} from 'lucide-react';

export const LandingPage = () => {
  const { setCurrentPage, setIsLoggedIn, setUserRole, addToast } = useApp();

  const handleLaunchDemo = () => {
    setUserRole('administrator');
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
    addToast('Logged in as Administrator (Demo Mode)', 'success');
  };

  const stats = [
    { value: "1M+", label: "Data Points Processed" },
    { value: "95%", label: "Prediction Accuracy" },
    { value: "50+", label: "Connected Services" },
    { value: "100+", label: "AI Insights Daily" }
  ];

  const features = [
    {
      title: "Multi-Agent Intelligence",
      description: "6 specialized AI Agents coordinate tasks, share telemetry summaries, and suggest responses dynamically.",
      icon: BrainCircuit,
      color: "var(--purple-ai)"
    },
    {
      title: "Predictive Analytics",
      description: "Perform early flood warnings, forecasting of traffic congestions, and energy utility spikes.",
      icon: HelpCircle,
      color: "var(--google-blue)"
    },
    {
      title: "Smart Recommendations",
      description: "AI-generated resource redeployments, emergency plans, and scheduling with ROI statistics.",
      icon: Lightbulb,
      color: "var(--google-yellow)"
    },
    {
      title: "AI Assistant",
      description: "Interact with the city database using a ChatGPT-style conversational assistant in multiple languages.",
      icon: MessageSquare,
      color: "var(--google-green)"
    },
    {
      title: "Real-time Monitoring",
      description: "Color-coded critical alerts, live IoT readings, and rapid emergency dispatch actions.",
      icon: ShieldAlert,
      color: "var(--google-red)"
    },
    {
      title: "Workflow Automation",
      description: "Visual node-based triggers, rules and dispatches to automate communication and responses.",
      icon: Cpu,
      color: "var(--orange-warn)"
    }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      color: 'var(--text-primary)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* HEADER NAVBAR */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '24px 64px',
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            backgroundColor: 'var(--google-blue)',
            color: 'white',
            width: '36px',
            height: '36px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '1.1rem'
          }}>IQ</div>
          <span style={{ fontWeight: 800, fontSize: '1.4rem', fontFamily: 'var(--font-title)' }}>CommunityIQ</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button 
            onClick={() => setCurrentPage('auth')} 
            className="btn btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.9rem' }}
          >
            Sign In
          </button>
          <button 
            onClick={handleLaunchDemo} 
            className="btn btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.9rem' }}
          >
            Launch Demo
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section style={{
        flexGrow: 1,
        maxWidth: '1400px',
        width: '100%',
        margin: '0 auto',
        padding: '40px 64px',
        display: 'grid',
        gridTemplateColumns: '1.1fr 0.9fr',
        gap: '48px',
        alignItems: 'center',
        zIndex: 10
      }}>
        {/* Hero Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 14px',
            borderRadius: '100px',
            backgroundColor: 'rgba(66, 133, 244, 0.1)',
            border: '1px solid rgba(66, 133, 244, 0.2)',
            color: 'var(--google-blue)',
            width: 'fit-content',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            <Sparkles size={14} /> Powered by Vertex AI & Gemini
          </div>
          <h1 style={{
            fontSize: '4rem',
            lineHeight: 1.1,
            fontWeight: 800,
            fontFamily: 'var(--font-title)',
            letterSpacing: '-0.02em'
          }}>
            AI-Driven <br />
            <span style={{
              background: 'linear-gradient(90deg, var(--google-blue), var(--purple-ai), var(--google-green))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Decision Intelligence</span> <br />
            for Smart Communities
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '560px',
            lineHeight: 1.6
          }}>
            Empower city managers, research institutes, and disaster response teams. CommunityIQ aggregates multi-source IoT telemetry, runs predictive models, and coordinates multi-agent responses in real-time.
          </p>

          <div style={{ display: 'flex', gap: '16px', marginTop: '12px' }}>
            <button 
              onClick={() => setCurrentPage('auth')} 
              className="btn btn-primary"
              style={{ padding: '14px 28px', fontSize: '1.05rem', boxShadow: '0 8px 24px -6px rgba(66, 133, 244, 0.4)' }}
            >
              Get Started <ArrowRight size={18} />
            </button>
            <button 
              onClick={handleLaunchDemo} 
              className="btn btn-secondary"
              style={{ padding: '14px 28px', fontSize: '1.05rem' }}
            >
              <Play size={18} fill="currentColor" /> View Live Demo
            </button>
          </div>

          {/* Stats Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginTop: '32px',
            borderTop: '1px solid var(--border-color)',
            paddingTop: '24px'
          }}>
            {stats.map((stat, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, fontFamily: 'var(--font-title)', color: 'var(--google-blue)' }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', fontWeight: 500 }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Smart City Illustration (SVG based vector art) */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Fictional Futuristic City Graphics */}
          <svg viewBox="0 0 500 500" width="100%" height="auto" style={{ maxHeight: '440px' }}>
            <defs>
              <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(66, 133, 244, 0.15)" />
                <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
              </linearGradient>
              <linearGradient id="glowLine" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--google-blue)" stopOpacity="0.8" />
                <stop offset="50%" stopColor="var(--purple-ai)" stopOpacity="0.8" />
                <stop offset="100%" stopColor="var(--google-green)" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Glowing background ring */}
            <circle cx="250" cy="250" r="180" fill="url(#skyGrad)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            <circle cx="250" cy="250" r="140" fill="none" stroke="var(--border-color)" strokeWidth="0.5" strokeDasharray="5,5" />

            {/* City Ground */}
            <line x1="50" y1="380" x2="450" y2="380" stroke="var(--border-color)" strokeWidth="2" />

            {/* Skyscrapers / Buildings */}
            {/* Building 1 (Left) */}
            <rect x="90" y="220" width="48" height="160" rx="4" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
            <line x1="114" y1="220" x2="114" y2="380" stroke="var(--border-color)" strokeWidth="0.75" />
            <circle cx="102" cy="240" r="2" fill="var(--google-yellow)" />
            <circle cx="126" cy="240" r="2" fill="var(--google-yellow)" />
            <circle cx="102" cy="260" r="2" fill="var(--google-green)" />
            <circle cx="126" cy="260" r="2" fill="var(--google-blue)" />
            <circle cx="102" cy="280" r="2" fill="var(--google-blue)" />
            <circle cx="126" cy="280" r="2" fill="var(--google-yellow)" />

            {/* Building 2 (Center Spike) */}
            <rect x="170" y="140" width="70" height="240" rx="6" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
            <path d="M205,80 L205,140" stroke="var(--google-blue)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="205" cy="80" r="3" fill="var(--google-blue)" className="pulse-glow-purple" />
            {/* Windows */}
            <rect x="185" y="160" width="12" height="180" rx="2" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="0.5" />
            <rect x="208" y="160" width="12" height="180" rx="2" fill="var(--bg-primary)" stroke="var(--border-color)" strokeWidth="0.5" />

            {/* Building 3 (Right Curved Dome) */}
            <rect x="270" y="200" width="80" height="180" rx="10" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1.5" />
            <circle cx="310" cy="200" r="30" fill="none" stroke="var(--border-color)" strokeWidth="1.5" strokeDasharray="1,1" />

            {/* Wind Turbines (Renewable Clean Tech) */}
            <g transform="translate(390, 260)">
              <line x1="0" y1="0" x2="0" y2="120" stroke="var(--text-tertiary)" strokeWidth="2" />
              {/* Rotating Blades Simulator */}
              <circle cx="0" cy="0" r="4" fill="var(--text-secondary)" />
              <g style={{ transformOrigin: '0px 0px', animation: 'gradientFlow 12s linear infinite' }}>
                <line x1="0" y1="0" x2="0" y2="-30" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="26" y2="15" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                <line x1="0" y1="0" x2="-26" y2="15" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              </g>
            </g>

            {/* Pulsing Grid Data Lines */}
            <path 
              d="M 90,320 L 170,300 L 270,330 L 390,320" 
              fill="none" 
              stroke="url(#glowLine)" 
              strokeWidth="2.5" 
              className="data-flow-line" 
            />

            <path 
              d="M 114,240 Q 200,100 310,240" 
              fill="none" 
              stroke="var(--purple-ai)" 
              strokeWidth="1.5" 
              strokeDasharray="4,4" 
            />
          </svg>

          {/* Floating Analytics Card Preview */}
          <div className="glass-panel" style={{
            position: 'absolute',
            bottom: '40px',
            right: '-10px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border-color)',
            animation: 'fadeIn 0.8s ease-out'
          }}>
            <div style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: 'var(--google-green)',
              animation: 'pulseGlow 2s infinite'
            }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>AQI MONITOR</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Sector 2: Good (54)</span>
            </div>
          </div>

          <div className="glass-panel" style={{
            position: 'absolute',
            top: '40px',
            left: '-20px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            border: '1px solid var(--border-color)',
            animation: 'fadeIn 1s ease-out'
          }}>
            <Sparkles size={16} style={{ color: 'var(--purple-ai)' }} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>AI RECOMMENDATION</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Optimize Grid Routing</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section style={{
        backgroundColor: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-color)',
        padding: '80px 64px'
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto'
        }}>
          <h2 style={{
            textAlign: 'center',
            fontSize: '2.5rem',
            fontFamily: 'var(--font-title)',
            marginBottom: '12px',
            fontWeight: 800
          }}>
            Complete Decision Control Suite
          </h2>
          <p style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto 60px auto',
            fontSize: '1.05rem'
          }}>
            CommunityIQ deploys multiple specialized cognitive modules to solve real-world community administration challenges dynamically.
          </p>

          <div className="grid grid-3" style={{ gap: '24px' }}>
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="card card-hover" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feat.color,
                    border: '1px solid var(--border-color)'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-title)' }}>{feat.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: '1px solid var(--border-color)',
        padding: '32px 64px',
        backgroundColor: 'var(--bg-primary)',
        marginTop: 'auto'
      }}>
        <div style={{
          maxWidth: '1400px',
          width: '100%',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          fontSize: '0.85rem',
          color: 'var(--text-tertiary)'
        }}>
          <div>
            &copy; 2026 CommunityIQ. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Documentation</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</a>
            <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Contact Support</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
            <span>Powered by</span>
            <span style={{ color: 'var(--google-blue)' }}>G</span>
            <span style={{ color: 'var(--google-red)' }}>o</span>
            <span style={{ color: 'var(--google-yellow)' }}>o</span>
            <span style={{ color: 'var(--google-blue)' }}>g</span>
            <span style={{ color: 'var(--google-green)' }}>l</span>
            <span style={{ color: 'var(--google-red)' }}>e</span>
            <span style={{ marginLeft: '4px' }}>Cloud</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
