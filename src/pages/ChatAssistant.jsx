import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { mockChatAnswers, mockDocuments } from '../utils/mockData';
import { 
  Send, Mic, Image, FileText, Paperclip, 
  Sparkles, Trash2, ArrowUpRight, HelpCircle, Check, Loader2 
} from 'lucide-react';

export const ChatAssistant = () => {
  const { chatHistory, setChatHistory, addToast } = useApp();
  
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [uploadingFile, setUploadingFile] = useState(null);
  const [ocrProgress, setOcrProgress] = useState(0);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  const promptSuggestions = [
    "Why is traffic increasing today?",
    "Predict flood risk tomorrow.",
    "Which hospitals are overcrowded?",
    "Recommend waste collection optimization.",
    "Summarize today's city status."
  ];

  // Simple Markdown & Table parser for chat bubbles
  const parseChatText = (text) => {
    const lines = text.split('\n');
    let insideTable = false;
    let tableRows = [];
    const htmlElements = [];

    lines.forEach((line, idx) => {
      // Parse Headers
      if (line.startsWith('### ')) {
        htmlElements.push(<h3 key={idx} style={{ fontSize: '1.2rem', margin: '12px 0 6px 0', fontWeight: 700, fontFamily: 'var(--font-title)' }}>{line.replace('### ', '')}</h3>);
      }
      // Parse Bold Bullet points
      else if (line.startsWith('* **') || line.startsWith('- **') || line.startsWith('1. **')) {
        const cleaned = line.replace(/^[\*\-\d\.]\s\*\*/, '').replace(/\*\*/, '');
        const parts = cleaned.split(':');
        htmlElements.push(
          <li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', fontSize: '0.85rem' }}>
            <strong>{parts[0]}:</strong>{parts[1]}
          </li>
        );
      }
      // Parse Standard bullet points
      else if (line.startsWith('* ') || line.startsWith('- ')) {
        htmlElements.push(<li key={idx} style={{ marginLeft: '16px', marginBottom: '4px', fontSize: '0.85rem' }}>{line.substring(2)}</li>);
      }
      // Parse Table Rows
      else if (line.startsWith('|')) {
        if (line.includes('---|')) return; // skip header separator
        
        insideTable = true;
        const columns = line.split('|').map(c => c.trim()).filter(c => c !== '');
        tableRows.push(columns);
      }
      // Line break or standard text
      else {
        if (insideTable) {
          // Render accumulated table rows
          htmlElements.push(
            <div key={`table-${idx}`} style={{ overflowX: 'auto', margin: '12px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '2px solid var(--border-color)' }}>
                    {tableRows[0].map((th, i) => (
                      <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{th}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.slice(1).map((tr, rIdx) => (
                    <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      {tr.map((td, cIdx) => (
                        <td key={cIdx} style={{ padding: '8px 12px' }}>{td}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
          tableRows = [];
          insideTable = false;
        }

        if (line.trim() !== '') {
          // Check for bold styling inside normal text
          let formattedLine = line;
          const boldMatches = line.match(/\*\*(.*?)\*\*/g);
          if (boldMatches) {
            boldMatches.forEach(match => {
              const cleanedText = match.replace(/\*\*/g, '');
              formattedLine = formattedLine.replace(match, `<strong>${cleanedText}</strong>`);
            });
            htmlElements.push(<p key={idx} style={{ fontSize: '0.9rem', marginBottom: '8px' }} dangerouslySetInnerHTML={{ __html: formattedLine }} />);
          } else {
            htmlElements.push(<p key={idx} style={{ fontSize: '0.9rem', marginBottom: '8px' }}>{line}</p>);
          }
        }
      }
    });

    // Handle trailing table if any
    if (insideTable && tableRows.length > 0) {
      htmlElements.push(
        <div key="table-trail" style={{ overflowX: 'auto', margin: '12px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', border: '1px solid var(--border-color)' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-primary)', borderBottom: '2px solid var(--border-color)' }}>
                {tableRows[0].map((th, i) => (
                  <th key={i} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 600 }}>{th}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(1).map((tr, rIdx) => (
                <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  {tr.map((td, cIdx) => (
                    <td key={cIdx} style={{ padding: '8px 12px' }}>{td}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Add inline visualizations based on content matching!
    if (text.toLowerCase().includes('traffic') && text.toLowerCase().includes('accident')) {
      htmlElements.push(
        <div key="traffic-viz" style={{ marginTop: '12px', padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--google-blue)', display: 'block', marginBottom: '8px' }}>INLINE VISUALIZATION: CONGESTION BUFFER SIZE</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.8rem', width: '60px' }}>Expressway</span>
            <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', backgroundColor: 'var(--google-red)' }} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>85% delay</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '6px' }}>
            <span style={{ fontSize: '0.8rem', width: '60px' }}>Alt Route B</span>
            <div style={{ flexGrow: 1, height: '8px', backgroundColor: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '30%', height: '100%', backgroundColor: 'var(--google-green)' }} />
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>30% delay</span>
          </div>
        </div>
      );
    }

    if (text.toLowerCase().includes('flood') && text.toLowerCase().includes('danger')) {
      htmlElements.push(
        <div key="flood-viz" style={{ marginTop: '12px', padding: '12px', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-primary)', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--google-blue)', display: 'block', marginBottom: '8px' }}>INLINE VISUALIZATION: TIDAL HEIGHT SAFETY THRESHOLD</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '80px', gap: '20px', padding: '0 20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <div style={{ height: '30px', width: '100%', backgroundColor: 'var(--google-blue)', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.7rem', marginTop: '4px' }}>09:00 AM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <div style={{ height: '55px', width: '100%', backgroundColor: 'var(--google-yellow)', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.7rem', marginTop: '4px' }}>12:00 PM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <div style={{ height: '80px', width: '100%', backgroundColor: 'var(--google-red)', borderRadius: '4px 4px 0 0', position: 'relative' }}>
                <span style={{ position: 'absolute', top: '4px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.65rem', color: 'white', fontWeight: 'bold' }}>MAX TIDE</span>
              </div>
              <span style={{ fontSize: '0.7rem', marginTop: '4px', fontWeight: 'bold' }}>02:00 PM</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              <div style={{ height: '40px', width: '100%', backgroundColor: 'var(--google-blue)', borderRadius: '4px 4px 0 0' }} />
              <span style={{ fontSize: '0.7rem', marginTop: '4px' }}>05:00 PM</span>
            </div>
          </div>
        </div>
      );
    }

    return htmlElements;
  };

  // Simulates character-by-character response streaming
  const handleStreamingResponse = (prompt, simulatedAnswer) => {
    setIsTyping(true);
    
    // Simulate thinking delay
    setTimeout(() => {
      let currentLength = 0;
      const speed = 10; // ms per char
      const targetText = simulatedAnswer;
      
      const newAssistantMsg = { id: `chat-${Date.now()}`, sender: 'assistant', text: '' };
      setChatHistory(prev => [...prev, newAssistantMsg]);

      const interval = setInterval(() => {
        if (currentLength < targetText.length) {
          currentLength += 8; // feed chunks for speed
          const textChunk = targetText.slice(0, currentLength);
          
          setChatHistory(prev => 
            prev.map(msg => msg.id === newAssistantMsg.id ? { ...msg, text: textChunk } : msg)
          );
        } else {
          clearInterval(interval);
          setIsTyping(false);
        }
      }, 35);
    }, 1000);
  };

  // Submits a message
  const handleSendMessage = (text) => {
    if (!text.trim()) return;

    const newChatHistory = [
      ...chatHistory,
      { id: `chat-usr-${Date.now()}`, sender: 'user', text }
    ];
    setChatHistory(newChatHistory);
    setInputValue('');

    const matchedQuery = text.toLowerCase().trim();
    let simulatedAnswer = "I'm sorry, I don't have a direct telemetry solution for that. Ask me to: \n* **Summarize today's city status**\n* **Predict flood risk tomorrow**\n* **Analyze traffic**\n* **Assess hospital occupancy**.";
    
    // Check keyword matching for mock responses
    for (const key in mockChatAnswers) {
      if (matchedQuery.includes(key.replace('.', ''))) {
        simulatedAnswer = mockChatAnswers[key];
        break;
      }
    }

    handleStreamingResponse(text, simulatedAnswer);
  };

  // Triggers mock mic dictation
  const handleMicClick = () => {
    if (isListening) return;
    setIsListening(true);
    addToast("Voice Assistant Listening... Speak now.", "info");

    setTimeout(() => {
      setIsListening(false);
      setInputValue("Summarize today's city status.");
      addToast("Voice command processed: 'Summarize today's city status.'", "success");
    }, 2800);
  };

  // Triggers mock file uploading
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingFile(file);
    setOcrProgress(10);
    addToast(`Uploading "${file.name}"...`, 'info');

    // Simulate progress bar OCR scan
    const interval = setInterval(() => {
      setOcrProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          setTimeout(() => {
            // Find if there is a matching doc in mockDocuments or create a dummy summary
            const matchedDoc = mockDocuments.find(d => file.name.toLowerCase().includes(d.name.split('.')[0].toLowerCase()));
            const docName = file.name;
            const summary = matchedDoc ? matchedDoc.summary : `Custom OCR summary for ${file.name}. Found 12 data rows matching community sensor coordinates. High correlation with current traffic indicators.`;
            
            // Append upload message and AI analysis response
            setChatHistory(prevChat => [
              ...prevChat,
              { id: `file-up-${Date.now()}`, sender: 'user', text: `📎 Uploaded Document: ${docName}` }
            ]);

            const analysisReply = `### OCR & RAG Document Scan Completed\nParsed **${docName}** successfully. Added data indices to the CommunityIQ Knowledge Graph.\n\n**Key Semantic Extract:**\n${summary}\n\nWould you like to cross-reference this information with our **Analytics** dashboard or build a new **Automation** alert?`;
            
            handleStreamingResponse(docName, analysisReply);
            setUploadingFile(null);
            setOcrProgress(0);
          }, 600);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  const handleClearHistory = () => {
    setChatHistory([{ id: "ch-1", sender: "assistant", text: "Welcome to CommunityIQ. I am your Multi-Agent Decision Intelligence Assistant. How can I assist you with city data analysis, predictive forecasting, or resource optimization today?" }]);
    addToast("Chat conversation history cleared.", "info");
  };

  return (
    <div style={{
      height: 'calc(100vh - 130px)',
      display: 'grid',
      gridTemplateColumns: '1.3fr 0.7fr',
      gap: '24px'
    }} className="animate-fade-in">
      
      {/* LEFT CHAT PANEL */}
      <div className="card" style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '20px'
      }}>
        {/* Chat Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-color)',
          paddingBottom: '16px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={20} style={{ color: 'var(--purple-ai)' }} />
            <div>
              <h3 style={{ fontSize: '1.05rem', fontFamily: 'var(--font-title)' }}>Gemini Decision Assistant</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>RAG Search & Explainable AI enabled</span>
            </div>
          </div>
          <button 
            onClick={handleClearHistory}
            className="btn-icon" 
            title="Clear Chat Logs"
            style={{ cursor: 'pointer' }}
          >
            <Trash2 size={16} style={{ color: 'var(--text-tertiary)' }} />
          </button>
        </div>

        {/* Chat Message Logs */}
        <div style={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          padding: '8px 4px',
          marginBottom: '16px'
        }}>
          {chatHistory.map((msg) => (
            <div 
              key={msg.id}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
              }}
            >
              <div 
                className={`chat-bubble ${msg.sender === 'user' ? 'user' : 'assistant'}`}
                style={{
                  boxShadow: msg.sender === 'assistant' ? 'var(--card-shadow)' : 'none'
                }}
              >
                {/* Parse bubble texts */}
                {parseChatText(msg.text)}
              </div>
              <span style={{
                fontSize: '0.7rem',
                color: 'var(--text-tertiary)',
                marginTop: '4px',
                padding: msg.sender === 'user' ? '0 4px 0 0' : '0 0 0 4px',
                textTransform: 'uppercase',
                fontWeight: 600
              }}>
                {msg.sender}
              </span>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
              <div className="chat-bubble assistant" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 18px' }}>
                <Loader2 size={16} className="animate-spin" style={{ color: 'var(--purple-ai)', animation: 'gradientFlow 2s linear infinite' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Gemini is synthesizing telemetry nodes...</span>
              </div>
            </div>
          )}

          {/* Upload Progress Simulator */}
          {uploadingFile && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <div className="chat-bubble user" style={{ backgroundColor: 'transparent', border: '1px solid var(--google-blue)', color: 'var(--google-blue)', padding: '12px 16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FileText size={18} />
                  <div style={{ display: 'flex', flexDirection: 'column', minWidth: '150px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{uploadingFile.name}</span>
                    <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--border-color)', borderRadius: '2px', marginTop: '6px', overflow: 'hidden' }}>
                      <div style={{ width: `${ocrProgress}%`, height: '100%', backgroundColor: 'var(--google-blue)', transition: 'width 0.2s' }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>{ocrProgress}%</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Mic wave listening overlay indicator */}
        {isListening && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: 'rgba(66, 133, 244, 0.08)',
            padding: '10px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '10px',
            animation: 'fadeIn 0.2s'
          }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--google-blue)', fontWeight: 600 }}>Capturing Voice Input</span>
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
              <div style={{ width: '3px', height: '15px', backgroundColor: 'var(--google-blue)', animation: 'gradientFlow 1s infinite alternate' }} />
              <div style={{ width: '3px', height: '24px', backgroundColor: 'var(--google-blue)', animation: 'gradientFlow 0.8s infinite alternate' }} />
              <div style={{ width: '3px', height: '10px', backgroundColor: 'var(--google-blue)', animation: 'gradientFlow 1.2s infinite alternate' }} />
            </div>
          </div>
        )}

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px 12px',
            backgroundColor: 'var(--bg-primary)'
          }}
        >
          {/* File Upload Hidden Input */}
          <label style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }} className="btn-icon">
            <Paperclip size={18} style={{ color: 'var(--text-tertiary)' }} />
            <input 
              type="file" 
              accept=".pdf,.docx,.csv,.xlsx,image/*" 
              onChange={handleFileChange}
              style={{ display: 'none' }} 
            />
          </label>
          
          <input
            type="text"
            placeholder="Ask Gemini to forecasting risk, query databases, or suggest actions..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{
              flexGrow: 1,
              padding: '8px',
              fontSize: '0.9rem',
              color: 'var(--text-primary)'
            }}
          />

          <button 
            type="button" 
            onClick={handleMicClick}
            className="btn-icon"
            title="Speech Dictation"
            style={{ cursor: 'pointer' }}
          >
            <Mic size={18} style={{ color: isListening ? 'var(--google-red)' : 'var(--text-tertiary)' }} />
          </button>
          
          <button 
            type="submit" 
            className="btn btn-primary"
            style={{ padding: '8px 16px', borderRadius: 'var(--radius-md)', cursor: 'pointer' }}
          >
            <Send size={14} /> Send
          </button>
        </form>
      </div>

      {/* RIGHT PRESETS / SUGGESTIONS PANEL */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Suggested Queries */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <HelpCircle size={16} style={{ color: 'var(--google-blue)' }} /> Suggested Inquiries
          </h4>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
            Select a sample telemetry search query to trigger agent answers.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {promptSuggestions.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(prompt)}
                style={{
                  textAlign: 'left',
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-primary)',
                  cursor: 'pointer',
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  transition: 'all var(--transition-fast)'
                }}
                className="btn-icon-hover"
              >
                <span>{prompt}</span>
                <ArrowUpRight size={14} style={{ color: 'var(--text-tertiary)', flexShrink: 0 }} />
              </button>
            ))}
          </div>
        </div>

        {/* AI Capabilities highlights */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
          <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-title)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} style={{ color: 'var(--purple-ai)' }} /> Cognitive Capabilities
          </h4>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--google-green)', flexShrink: 0 }} />
              <span><strong>Multilingual (RAG):</strong> Answers in Hindi, Tamil, Bengali, Marathi.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--google-green)', flexShrink: 0 }} />
              <span><strong>OCR Scan:</strong> Automatic OCR data ingestion on PDF/CSV uploads.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--google-green)', flexShrink: 0 }} />
              <span><strong>Data Vector:</strong> Connected directly to Vertex AI Search & Vector Store.</span>
            </li>
            <li style={{ display: 'flex', gap: '8px' }}>
              <Check size={14} style={{ color: 'var(--google-green)', flexShrink: 0 }} />
              <span><strong>Decision Support:</strong> References real recommendation cards like <code>REC-01</code>.</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  );
};
