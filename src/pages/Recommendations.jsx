import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lightbulb, CheckCircle2, XCircle, AlertTriangle, TrendingUp, Coins, Activity } from 'lucide-react';

export const Recommendations = () => {
  const { recommendations, handleAcceptRecommendation, handleRejectRecommendation } = useApp();
  const [filterDept, setFilterDept] = useState('all');

  const filteredRecs = recommendations.filter(rec => {
    if (filterDept === 'all') return true;
    return rec.department.toLowerCase() === filterDept.toLowerCase();
  });

  const getPriorityBadge = (priority) => {
    if (priority === 'Critical') return 'badge-red';
    if (priority === 'High') return 'badge-orange';
    if (priority === 'Medium') return 'badge-blue';
    return 'badge-yellow';
  };

  const getCostBadge = (cost) => {
    if (cost === 'High') return 'badge-red';
    if (cost === 'Medium') return 'badge-orange';
    return 'badge-green';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }} className="animate-fade-in">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.85rem', fontFamily: 'var(--font-title)', fontWeight: 700 }}>
            AI Recommendations Optimization Engine
          </h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Review, reject, or approve resource deployment blueprints compiled by Strategy Agents.
          </p>
        </div>
      </div>

      {/* Department filter tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {['all', 'Transportation', 'Waste Management', 'Healthcare', 'Energy', 'Disaster Management'].map(dept => (
          <button
            key={dept}
            onClick={() => setFilterDept(dept)}
            style={{
              padding: '6px 14px',
              borderRadius: '100px',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              border: '1px solid var(--border-color)',
              backgroundColor: filterDept === dept ? 'var(--google-blue)' : 'var(--bg-secondary)',
              color: filterDept === dept ? 'white' : 'var(--text-secondary)',
              transition: 'all var(--transition-fast)'
            }}
          >
            {dept.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid of Recommendation Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {filteredRecs.length === 0 ? (
          <div className="card text-center" style={{ padding: '40px 0' }}>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>No recommendations found matching filter.</span>
          </div>
        ) : (
          filteredRecs.map(rec => (
            <div 
              key={rec.id} 
              className="card"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: '24px',
                borderLeft: rec.status === 'Approved' ? '5px solid var(--google-green)' : rec.status === 'Rejected' ? '5px solid var(--text-tertiary)' : '1px solid var(--border-color)'
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
                justifyContent: 'center',
                color: 'var(--purple-ai)',
                flexShrink: 0
              }}>
                <Lightbulb size={24} />
              </div>

              {/* Right Column details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Header metrics */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', fontWeight: 600 }}>{rec.id}</span>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{rec.title}</h3>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span className="badge badge-purple" style={{ fontSize: '0.65rem' }}>{rec.department}</span>
                    <span className={`badge ${getPriorityBadge(rec.priority)}`} style={{ fontSize: '0.65rem' }}>
                      {rec.priority} Priority
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  {rec.description}
                </p>

                {/* Bottom stats row */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px',
                  backgroundColor: 'var(--bg-primary)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.8rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TrendingUp size={16} style={{ color: 'var(--google-blue)' }} />
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>EXPECTED IMPACT</span>
                      <strong>{rec.impact}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Coins size={16} style={{ color: 'var(--google-green)' }} />
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>BUDGET COST</span>
                      <strong className={`badge ${getCostBadge(rec.cost)}`} style={{ padding: '1px 6px', fontSize: '0.7rem' }}>{rec.cost}</strong>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Activity size={16} style={{ color: 'var(--purple-ai)' }} />
                    <div>
                      <span style={{ display: 'block', color: 'var(--text-tertiary)', fontSize: '0.65rem' }}>ESTIMATED IMPROVEMENT</span>
                      <strong>{rec.expectedImprovement}</strong>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                {rec.status === 'Pending' && (
                  <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                    <button
                      onClick={() => handleAcceptRecommendation(rec.id)}
                      className="btn btn-primary"
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <CheckCircle2 size={16} /> Accept Proposal
                    </button>
                    
                    <button
                      onClick={() => handleRejectRecommendation(rec.id)}
                      className="btn btn-secondary"
                      style={{
                        padding: '8px 16px',
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <XCircle size={16} /> Reject Proposal
                    </button>
                  </div>
                )}

                {rec.status === 'Approved' && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--google-green)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    backgroundColor: 'rgba(52, 168, 83, 0.05)',
                    border: '1px solid rgba(52, 168, 83, 0.2)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    width: 'fit-content'
                  }}>
                    <CheckCircle2 size={16} /> Approved & Actively Deploying
                  </div>
                )}

                {rec.status === 'Rejected' && (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: 'var(--text-tertiary)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    backgroundColor: 'var(--bg-primary)',
                    border: '1px solid var(--border-color)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    width: 'fit-content'
                  }}>
                    <XCircle size={16} /> Recommendation Dismissed
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
