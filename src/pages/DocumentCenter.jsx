import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Upload, FileText, Search, Sparkles, Database, Check, Loader2 } from 'lucide-react';

export const DocumentCenter = () => {
  const { documents, addDocument } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState("doc-1");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      simulateUpload(file);
    }
  };

  const simulateUpload = (file) => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      const newDoc = {
        id: `doc-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: file.name.split('.').pop().toUpperCase(),
        date: new Date().toISOString().split('T')[0],
        summary: `Custom scanned index. Captured 18 sensory coordinates. Data has high spatial similarity to historic flood zones.`,
        entities: ["Sensory Node", "Spatial Match", "Water level"]
      };
      addDocument(newDoc);
      setSelectedDocId(newDoc.id);
    }, 1500);
  };

  const selectedDoc = documents.find(d => d.id === selectedDocId);

  // RAG Search simulation
  const filteredDocs = documents.filter(doc => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return doc.name.toLowerCase().includes(query) || 
           doc.summary.toLowerCase().includes(query) || 
           doc.entities.some(e => e.toLowerCase().includes(query));
  });

  return (
    <div style={{
      height: 'calc(100vh - 130px)',
      display: 'grid',
      gridTemplateColumns: '0.8fr 1.2fr',
      gap: '24px'
    }} className="animate-fade-in">
      
      {/* LEFT COLUMN: UPLOAD & FILE LIST */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
        
        {/* Upload Zone */}
        <div 
          className="card"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          style={{
            border: '2px dashed var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            textAlign: 'center',
            cursor: 'pointer',
            backgroundColor: isUploading ? 'rgba(66, 133, 244, 0.03)' : 'var(--bg-secondary)',
            transition: 'all var(--transition-fast)'
          }}
        >
          {isUploading ? (
            <>
              <Loader2 size={32} className="animate-spin" style={{ color: 'var(--google-blue)', marginBottom: '10px' }} />
              <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Scanning Document OCR...</span>
            </>
          ) : (
            <label style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Upload size={32} style={{ color: 'var(--google-blue)', marginBottom: '10px' }} />
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>Upload Document Vault</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginTop: '4px' }}>
                Drag and drop PDF, DOCX, CSV, or PNG (Max 15MB)
              </span>
              <input type="file" onChange={handleFileInput} style={{ display: 'none' }} />
            </label>
          )}
        </div>

        {/* Search Bar */}
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-tertiary)' }} />
          <input
            type="text"
            placeholder="Semantic RAG Search across vault..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem'
            }}
          />
        </div>

        {/* File catalog list */}
        <div className="card" style={{ flexGrow: 1, overflowY: 'auto', padding: '16px' }}>
          <h4 style={{ fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', marginBottom: '12px' }}>
            Semantic Knowledge Index ({filteredDocs.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredDocs.map(doc => {
              const isSelected = selectedDocId === doc.id;
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDocId(doc.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '10px',
                    borderRadius: 'var(--radius-md)',
                    cursor: 'pointer',
                    border: isSelected ? '1px solid var(--google-blue)' : '1px solid transparent',
                    backgroundColor: isSelected ? 'rgba(66, 133, 244, 0.06)' : 'var(--bg-primary)'
                  }}
                >
                  <FileText size={20} style={{ color: 'var(--google-blue)', flexShrink: 0 }} />
                  <div style={{ flexGrow: 1, overflow: 'hidden' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.name}
                    </div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>{doc.size} &bull; {doc.type}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* RIGHT COLUMN: RAG KNOWLEDGE BASE VIEWER */}
      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%', overflowY: 'auto' }}>
        {selectedDoc ? (
          <>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'rgba(66, 133, 244, 0.1)',
                  color: 'var(--google-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-title)' }}>{selectedDoc.name}</h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Indexed on {selectedDoc.date}</span>
                </div>
              </div>
              <span className="badge badge-blue">{selectedDoc.type} Document</span>
            </div>

            {/* RAG Summary */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--purple-ai)' }} /> AI-Generated Summary (Gemini)
              </h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, backgroundColor: 'var(--bg-primary)', padding: '16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                {selectedDoc.summary}
              </p>
            </div>

            {/* Entity Extraction */}
            <div>
              <h4 style={{ fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <Database size={16} style={{ color: 'var(--google-green)' }} /> Extracted Semantic Entities
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedDoc.entities.map((ent, idx) => (
                  <span key={idx} style={{
                    fontSize: '0.75rem',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'rgba(52, 168, 83, 0.08)',
                    border: '1px solid rgba(52, 168, 83, 0.2)',
                    color: 'var(--google-green)',
                    fontWeight: 600
                  }}>
                    {ent}
                  </span>
                ))}
              </div>
            </div>

            {/* OCR Raw Text Preview */}
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ fontSize: '0.9rem' }}>Captured OCR Text Segment</h4>
              <div style={{
                flexGrow: 1,
                backgroundColor: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                minHeight: '120px'
              }}>
                [OCR EXTRACT START]
                <br />
                COMMUNITYIQ VECTOR DATA INDEXING -- SYSTEM ID: {selectedDoc.id}
                <br />
                SOURCE NAME: {selectedDoc.name}
                <br />
                METADATA: Size {selectedDoc.size} | Type {selectedDoc.type} | Date {selectedDoc.date}
                <br />
                TEXT BODY: Evaluated regional parameters. Sensor calibration matches expected boundaries. The model reports high likelihood of target anomaly correlation with the primary parameters: {selectedDoc.entities.join(', ')}. Details verified on public works infrastructure mapping.
                <br />
                [OCR EXTRACT END]
              </div>
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-tertiary)' }}>
            Select a document to audit OCR results.
          </div>
        )}
      </div>
    </div>
  );
};
