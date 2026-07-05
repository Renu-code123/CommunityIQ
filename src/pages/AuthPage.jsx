import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Sparkles, User, Mail, Lock, LogIn, ArrowLeft } from 'lucide-react';

export const AuthPage = () => {
  const { 
    setCurrentPage, 
    setIsLoggedIn, 
    userRole, 
    setUserRole, 
    setUserName, 
    addToast 
  } = useApp();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { id: 'administrator', name: 'Administrator', desc: 'Manage configurations, review all agent nodes, deploy automations.' },
    { id: 'government', name: 'Government Official', desc: 'Authorise recommendations, view macro-analytics reports.' },
    { id: 'ngo', name: 'NGO Representative', desc: 'Assess risk areas, check disaster recommendations, coordinate aid.' },
    { id: 'researcher', name: 'Researcher', desc: 'Export datasets, audit time-series forecasts, check sensor telemetry.' },
    { id: 'citizen', name: 'Citizen Resident', desc: 'Check regional AQI/traffic maps, submit complaints, talk to Support Agent.' }
  ];

  const handleAuth = (e) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      addToast('Please fill in all details.', 'warning');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      if (isRegister) {
        setUserName(name);
        addToast(`Account created! Welcoming ${name} as ${userRole}.`, 'success');
      } else {
        const generatedName = email.split('@')[0];
        setUserName(generatedName.charAt(0).toUpperCase() + generatedName.slice(1));
        addToast(`Signed in successfully as ${userRole}.`, 'success');
      }
      setCurrentPage('dashboard');
    }, 1500);
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
      setUserName('Officer Renu');
      addToast(`Authorized with Google. Welcome back, Officer Renu!`, 'success');
      setCurrentPage('dashboard');
    }, 1200);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg-primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative'
    }}>
      {/* Back button */}
      <button 
        onClick={() => setCurrentPage('landing')}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
          color: 'var(--text-secondary)',
          fontWeight: 500
        }}
      >
        <ArrowLeft size={18} /> Back to Home
      </button>

      <div style={{
        width: '100%',
        maxWidth: '1000px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '40px',
        backgroundColor: 'var(--bg-secondary)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border-color)',
        boxShadow: 'var(--card-shadow)',
        overflow: 'hidden',
        padding: '32px'
      }}>
        {/* LEFT SIDE: Role Selection */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
              Select System Persona
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Choose your profile role. Permissions and modules adapt to target responsibilities.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {roles.map(role => {
              const isSelected = userRole === role.id;
              return (
                <button
                  key={role.id}
                  onClick={() => setUserRole(role.id)}
                  style={{
                    textAlign: 'left',
                    padding: '12px 16px',
                    borderRadius: 'var(--radius-md)',
                    border: isSelected ? '2px solid var(--google-blue)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'rgba(66, 133, 244, 0.05)' : 'var(--bg-primary)',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, color: isSelected ? 'var(--google-blue)' : 'var(--text-primary)', fontSize: '0.9rem' }}>
                      {role.name}
                    </span>
                    {isSelected && (
                      <span style={{
                        fontSize: '0.7rem',
                        backgroundColor: 'var(--google-blue)',
                        color: 'white',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        fontWeight: 600
                      }}>
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                    {role.desc}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT SIDE: Authentication Form */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '24px', borderLeft: '1px solid var(--border-color)', paddingLeft: '40px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(66, 133, 244, 0.1)',
              color: 'var(--google-blue)',
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              marginBottom: '12px'
            }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
              {isRegister ? 'Create Platform Profile' : 'Access Gateway'}
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Authorize credential access or sign in instantly.
            </p>
          </div>

          <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {isRegister && (
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-tertiary)' }} />
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    style={{ paddingLeft: '42px' }}
                  />
                </div>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Work Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-tertiary)' }} />
                <input
                  type="email"
                  required
                  placeholder="name@communityiq.gov"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-tertiary)' }} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '12px',
                fontSize: '1rem',
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Verifying Gateway...' : isRegister ? 'Register Profile' : 'Authenticate Session'}
            </button>
          </form>

          {/* Divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '0.8rem',
            color: 'var(--text-tertiary)'
          }}>
            <hr style={{ width: '40%', border: 'none', borderTop: '1px solid var(--border-color)' }} />
            <span>OR</span>
            <hr style={{ width: '40%', border: 'none', borderTop: '1px solid var(--border-color)' }} />
          </div>

          {/* Google Sign-in */}
          <button 
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '10px 16px',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--bg-primary)',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              fontSize: '0.9rem',
              fontWeight: 500
            }}
          >
            {/* Google Icon SVG */}
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.71v2.24h2.92c1.71-1.57 2.68-3.88 2.68-6.58z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.23l-2.91-2.24c-.8.54-1.84.87-3.05.87-2.34 0-4.33-1.58-5.03-3.7H.95v2.3C2.43 15.89 5.5 18 9 18z" />
              <path fill="#FBBC05" d="M3.97 10.73c-.18-.54-.28-1.12-.28-1.73s.1-1.19.28-1.73V4.97H.95C.35 6.18 0 7.55 0 9s.35 2.82.95 4.03l3.02-2.3z" />
              <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.47 1.03 11.43 0 9 0 5.5 0 2.43 2.11.95 4.97l3.02 2.3c.7-2.12 2.69-3.7 5.03-3.7z" />
            </svg>
            Google Authenticator
          </button>

          <div style={{ textAlign: 'center', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--text-secondary)' }}>
              {isRegister ? 'Already registered?' : 'Need to register code?'}
            </span>{' '}
            <button
              onClick={() => setIsRegister(!isRegister)}
              style={{
                color: 'var(--google-blue)',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {isRegister ? 'Sign In Instead' : 'Register Profile'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
