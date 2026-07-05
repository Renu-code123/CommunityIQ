<div align="center">

# 🏙️ CommunityIQ

### AI-Powered Multi-Agent Decision Intelligence Platform for Smart Communities

[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Google Cloud](https://img.shields.io/badge/Google_Cloud-Vertex_AI-4285F4?style=for-the-badge&logo=googlecloud&logoColor=white)](https://cloud.google.com/)
[![Gemini](https://img.shields.io/badge/Gemini-API-8B5CF6?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-MIT-34A853?style=for-the-badge)](LICENSE)

> **Empowering Communities with AI-Driven Decision Intelligence**  
> A production-quality SaaS prototype built for the Google Cloud Hackathon 2026

[🚀 Live Demo](#-quick-start) • [📖 Documentation](#-project-structure) • [🧠 AI Features](#-ai-features) • [🗺️ Pages & Navigation](#️-pages--navigation) • [☁️ Google Cloud Stack](#️-google-cloud-architecture)

</div>

---

## 📌 Table of Contents

1. [Project Overview](#-project-overview)
2. [Key Features](#-key-features)
3. [Technology Stack](#-technology-stack)
4. [Google Cloud Architecture](#️-google-cloud-architecture)
5. [Quick Start](#-quick-start)
6. [Project Structure](#-project-structure)
7. [Pages & Navigation](#️-pages--navigation)
8. [AI Features](#-ai-features)
9. [Multi-Agent System](#-multi-agent-system)
10. [Interactive Demo Flows](#-interactive-demo-flows)
11. [Design System](#-design-system)
12. [Database Schema](#-database-schema)
13. [Sample Data](#-sample-data)
14. [Target Users](#-target-users)
15. [Contributing](#-contributing)

---

## 🌐 Project Overview

**CommunityIQ** is a comprehensive AI-powered decision intelligence platform designed for city administrators, government officials, NGOs, universities, and disaster response teams. Instead of manually analyzing multiple data sources, CommunityIQ combines structured and unstructured telemetry into one intelligent platform that:

| Capability | Description |
|---|---|
| 🧠 **Understands Natural Language** | Gemini-powered chat assistant with streaming AI responses |
| 🔍 **Retrieves Relevant Information** | RAG (Retrieval-Augmented Generation) over uploaded documents |
| 📈 **Predicts Future Outcomes** | Time-series forecasting for traffic, flood, energy, and disease risks |
| ⚠️ **Detects Anomalies** | Multi-source IoT analysis identifying spikes and pattern deviations |
| 💡 **Generates Recommendations** | AI-optimized resource redeployment proposals with ROI analysis |
| ⚙️ **Automates Workflows** | Visual trigger-condition-action builder with smart dispatch rules |
| 🗺️ **Interactive Smart City Map** | SVG-based sector map with Traffic, Flood, Pollution, and Health overlays |

---

## ✨ Key Features

### 🏠 Landing Page
- Animated smart city SVG illustration with glowing data flows
- Real-time platform statistics: `1M+` data points, `95%` prediction accuracy
- Feature highlights for each of the 6 AI Agents
- Google-colored footer with documentation links

### 🔐 Authentication & Role Management
- Mock credential login (email + password)
- **Google Sign-In** simulation
- **5 Role Profiles** with distinct permission scopes:
  - `Citizen` · `Administrator` · `Government Official` · `NGO Representative` · `Researcher`

### 📊 Dashboard
- 6 reactive KPI metric cards (Traffic Speed, AQI, Satisfaction, Health, Energy, Waste)
- Interactive SVG sector city map with live telemetry readouts
- Hourly traffic congestion area chart
- Quick Alert dispatch panel + AI proposal approvals
- **State-connected**: Accepting recommendations dynamically updates Dashboard KPIs

### 🤖 AI Chat Assistant
- ChatGPT-style streaming text interface
- Pre-loaded smart prompt chips (flood risk, hospital status, city summary)
- **Inline Visualizations**: Bar chart renders inside responses for tidal/traffic data
- **Voice Input** simulation with wave animation
- **File Upload**: Drag-and-drop PDF/CSV → OCR progress → RAG entity extraction
- Full markdown rendering (headers, bold, tables, bullet lists)

### 🧬 Multi-Agent Workflow Canvas
- Interactive SVG flowchart with 6 animated data-packet-carrying agent nodes
- Live telemetry log feeds that auto-rotate every ~4.5 seconds
- Per-agent detail auditor: uptime, API call volumes, I/O connections
- Pause/Resume workflow controls

### 📉 Analytics Platform
- Date range, sector, and department filter selectors
- Weekly AQI Line Chart and Department Resource Bar Chart (pure SVG)
- CSV/PDF Export simulation with actual file download

### 🔮 Predictions Hub
- 4 risk forecasting cards: Flood, Energy Grid, Traffic Gridlock, Disease Outbreak
- Confidence scores, timeframes, and trend indicators
- **Explainable AI (XAI)**: Feature attribution weight bars for each prediction factor

### 💼 Recommendations Engine
- Priority-sorted proposals (Critical, High, Medium, Low)
- Impact, Cost, and Expected Improvement metrics per card
- **Accept** → triggers toast, updates Dashboard stats, marks "Approved & Deploying"
- **Reject** → marks "Dismissed"

### 🚨 Alert Center
- Real-time color-coded incident cards (Critical / High / Medium)
- Severity filter tabs
- **Dispatch Response** button resolves alerts and triggers automation chains

### 📁 Document Center
- Drag-and-drop file vault (PDF, DOCX, CSV, Images)
- OCR progress bar simulation
- **RAG Semantic Search**: Filters documents by keyword matching entities
- Full OCR text preview and Gemini AI-generated summaries

### 🔌 Data Sources
- 8 integration endpoints (Weather API, Google Maps, IoT Sensors, Hospital Records, etc.)
- Toggle connection switches → real-time status updates
- Latency, reliability %, and sync frequency per source

### ⚙️ Automation Builder
- Visual node-based workflow builder: **Trigger → Condition → Action**
- 5 pre-loaded trigger options (AQI threshold, Flood Risk %, Hospital occupancy)
- Create new custom rules that append to the active rules registry

### 📄 Report Generator
- Frequency selector (Daily, Weekly, Monthly, Annual)
- Format selector (PDF, Excel, PowerPoint)
- Section toggles (Charts, Recommendations, Agent Logs, Raw IoT)
- Compilation progress bar → simulated file download
- Cloud Storage Archive with download history

### 🗺️ Smart City Map (Full Screen)
- Large interactive SVG city map with 5 clickable geographic sectors
- **Layer Overlays**:
  - 🚗 Traffic (colored road arteries: Green/Yellow/Red)
  - 🌊 Flood Hazard Zones (dashed alert rings)
  - 🏥 Hospitals & Schools (icon markers)
  - 🌫️ AQI Heatmap (sector color changes by pollution level)
- Right panel: sector-specific sensor telemetry readouts + active alert warnings

### ⚙️ Settings
- Profile name editor
- Notification channel toggles (Toast, Email, Push)
- Google Cloud API key vault (Gemini, Vertex AI, Maps)

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | [React 18](https://react.dev/) + [Vite 8](https://vitejs.dev/) | Fast SPA with HMR dev server |
| **Styling** | Vanilla CSS (custom design system) | Material Design 3, Glassmorphism, Dark/Light themes |
| **Icons** | [Lucide React](https://lucide.dev/) | 1000+ premium SVG icon set |
| **Fonts** | [Google Fonts](https://fonts.google.com/) – Inter, Outfit, JetBrains Mono | Premium typography |
| **State** | React Context API | Global app state, telemetry, toast queue |
| **Charts** | Custom inline SVG | Zero-dependency, theme-aware data visualizations |
| **Maps** | Custom SVG Canvas | Interactive sector map with layer controls |

---

## ☁️ Google Cloud Architecture

CommunityIQ is designed to be fully deployable on Google Cloud Platform:

```
┌─────────────────────────────────────────────────────────────┐
│                    CommunityIQ on GCP                       │
│                                                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Cloud Run   │    │  Vertex AI   │    │  Gemini API  │  │
│  │  (Frontend)  │◄──►│  (ML Models) │◄──►│  (Chat/RAG)  │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   │           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Firestore   │    │  BigQuery    │    │ Cloud Storage│  │
│  │  (Real-time) │    │ (Analytics)  │    │  (Documents) │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│         │                   │                   │           │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │  Maps API    │    │ Vertex Search│    │Cloud Functions│  │
│  │  (Traffic)   │    │(Vector Store)│    │ (Automation) │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

| GCP Service | Role in Platform |
|---|---|
| **Gemini API** | Natural language chat, document summarization, multilingual support |
| **Vertex AI** | Predictive ML models (flood forecasting, traffic prediction, disease outbreak) |
| **Agent Development Kit (ADK)** | Orchestrates the 6 AI agents in coordination workflows |
| **BigQuery** | Stores and queries massive telemetry datasets from IoT and APIs |
| **Firestore** | Real-time storage for alerts, recommendations, and chat history |
| **Cloud Storage** | Document vault for PDFs, CSVs, images, and generated reports |
| **Cloud Functions** | Serverless automation triggers and webhook dispatchers |
| **Cloud Run** | Hosts the frontend SPA and API gateway |
| **Vertex AI Search** | Powers the RAG semantic document search |
| **Vector Search** | Embedding store for document knowledge graph |
| **Maps API** | Real-time traffic layers and routing optimization |
| **Looker Studio** | Embedded interactive dashboards for exported reports |

---

## 🚀 Quick Start

### Prerequisites
- [Node.js](https://nodejs.org/) v18+ and npm v9+
- A modern browser (Chrome, Edge, Firefox)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-org/communityiq.git
cd communityiq

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

### Access the Application
Open your browser and navigate to: **[http://localhost:5173/](http://localhost:5173/)**

### Build for Production

```bash
# Create an optimized production bundle
npm run build

# Preview the production build locally
npm run preview
```

### Demo Access
Click **"Launch Demo"** on the landing page to instantly sign in as an Administrator and explore all features with pre-loaded mock data. No credentials required.

---

## 📁 Project Structure

```
communityiq/
├── public/                         # Static assets
├── src/
│   ├── assets/                     # Images, icons
│   ├── context/
│   │   └── AppContext.jsx          # Global state (theme, auth, alerts, recommendations)
│   ├── components/
│   │   └── MainLayout.jsx          # Shell: sidebar, header, toast notifications
│   ├── pages/
│   │   ├── LandingPage.jsx         # Public homepage with SVG smart city hero
│   │   ├── AuthPage.jsx            # Login, register, Google Sign-In, role selector
│   │   ├── Dashboard.jsx           # KPI cards, charts, sector map, quick actions
│   │   ├── ChatAssistant.jsx       # Gemini streaming chat, file upload, voice input
│   │   ├── AgentsWorkflow.jsx      # Multi-agent SVG canvas with live telemetry logs
│   │   ├── Analytics.jsx           # Filters, SVG charts, data export
│   │   ├── Predictions.jsx         # Risk forecasts with explainable AI
│   │   ├── Recommendations.jsx     # Accept/Reject AI proposals (state-connected)
│   │   ├── AlertCenter.jsx         # Incident command center with dispatch actions
│   │   ├── DocumentCenter.jsx      # RAG document vault with OCR scanner
│   │   ├── DataSources.jsx         # API integration gateway with toggle switches
│   │   ├── AutomationBuilder.jsx   # Visual Trigger → Condition → Action builder
│   │   ├── ReportGenerator.jsx     # Report compiler with Cloud Storage archive
│   │   ├── SmartCityMap.jsx        # Full-screen interactive SVG city map
│   │   └── Settings.jsx            # Profile, notifications, API key management
│   ├── utils/
│   │   └── mockData.js             # Rich realistic demo datasets for all modules
│   ├── App.jsx                     # Root component and page router
│   ├── main.jsx                    # React DOM entry point
│   └── index.css                   # Full custom design system (tokens, glass, animations)
├── index.html                      # HTML entry point
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

---

## 🗺️ Pages & Navigation

| Page | Sidebar Label | Key Interactions |
|---|---|---|
| [LandingPage.jsx](./src/pages/LandingPage.jsx) | *(Public)* | Hero section, statistics, feature cards, CTA buttons |
| [AuthPage.jsx](./src/pages/AuthPage.jsx) | *(Public)* | Login/Register form, Google Sign-In, role selection |
| [Dashboard.jsx](./src/pages/Dashboard.jsx) | Dashboard | 6 KPI cards, hourly chart, sector map, alert + rec panels |
| [ChatAssistant.jsx](./src/pages/ChatAssistant.jsx) | AI Assistant | Streaming chat, file upload, voice dictation, inline charts |
| [AgentsWorkflow.jsx](./src/pages/AgentsWorkflow.jsx) | Agents | SVG agent canvas, live log feed, telemetry auditor |
| [Analytics.jsx](./src/pages/Analytics.jsx) | Analytics | AQI line chart, resource bar chart, date/area filters, export |
| [Predictions.jsx](./src/pages/Predictions.jsx) | Predictions | Risk forecasts, XAI feature attributions, confidence meters |
| [Recommendations.jsx](./src/pages/Recommendations.jsx) | Recommendations | Priority cards, Accept/Reject with live stat feedback |
| [AlertCenter.jsx](./src/pages/AlertCenter.jsx) | Alerts | Severity-filtered incident list, dispatch actions |
| [DocumentCenter.jsx](./src/pages/DocumentCenter.jsx) | Documents | Upload vault, OCR scanner, RAG semantic search |
| [DataSources.jsx](./src/pages/DataSources.jsx) | Data Sources | 8 API integrations with connection toggles |
| [AutomationBuilder.jsx](./src/pages/AutomationBuilder.jsx) | Automation | Visual node workflow builder, active rules registry |
| [ReportGenerator.jsx](./src/pages/ReportGenerator.jsx) | Reports | Compile triggers, progress bar, Cloud Storage archive |
| [SmartCityMap.jsx](./src/pages/SmartCityMap.jsx) | Smart City Map | Full SVG map, 4 layer overlays, sector telemetry inspector |
| [Settings.jsx](./src/pages/Settings.jsx) | Settings | Profile editor, notification channels, API key vault |

---

## 🧠 AI Features

| Feature | Implementation | Technology |
|---|---|---|
| **Gemini Chat** | Streaming character-by-character response | Simulated (real: Gemini API) |
| **RAG Search** | Semantic document retrieval from knowledge base | Simulated (real: Vertex AI Search) |
| **OCR Scanning** | Document text extraction with progress indicator | Simulated (real: Cloud Vision API) |
| **Predictive Analytics** | Time-series flood, traffic, energy, disease forecasting | Simulated (real: Vertex AI Tabular) |
| **Explainable AI (XAI)** | Feature attribution weight visualization | Custom SVG bar charts |
| **Knowledge Graph** | Entity extraction from uploaded documents | Simulated entity tagging |
| **Voice Input** | Speech-to-text dictation with wave animation | Simulated (real: Speech-to-Text API) |
| **Multilingual Support** | English, Hindi, Tamil, Bengali, Marathi | Language selector (real: Gemini multilingual) |
| **Smart Recommendations** | Multi-criteria resource optimization | Rule-based engine (real: Vertex AI) |
| **Automation Triggers** | Event-based workflow execution | Custom rule engine (real: Cloud Functions) |

---

## 🤖 Multi-Agent System

The platform orchestrates **6 specialized AI Agents** in a coordinated workflow:

```
┌─────────────────────────────────────────────────────────────────┐
│                    Agent Coordination Loop                      │
│                                                                 │
│  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐     │
│  │ Agent 1 │───►│ Agent 2 │───►│ Agent 3 │───►│ Agent 4 │     │
│  │  Data   │    │ Insight │    │Prediction│   │ Recom-  │     │
│  │Collector│    │ Analyst │    │ Forecaster│  │ mendation│     │
│  └─────────┘    └─────────┘    └─────────┘    └────┬────┘     │
│       ▲                                              │          │
│       │           ┌─────────┐    ┌─────────┐        │          │
│       └───────────│ Agent 6 │◄───│ Agent 5 │◄───────┘          │
│                   │ Citizen │    │Automation│                  │
│                   │ Support │    │ Executor │                  │
│                   └─────────┘    └─────────┘                  │
└─────────────────────────────────────────────────────────────────┘
```

| Agent | Role | Responsibilities |
|---|---|---|
| **Agent 1** – Data Collection | Collector | Ingests IoT sensors, weather APIs, traffic feeds, hospital records |
| **Agent 2** – Insight | Analyzer | Anomaly detection, pattern clustering, trend identification |
| **Agent 3** – Prediction | Forecaster | Flood risk, energy demand, disease outbreak, traffic congestion |
| **Agent 4** – Recommendation | Strategist | Multi-criteria optimization, resource blueprints, policy suggestions |
| **Agent 5** – Automation | Executor | Webhook dispatches, SMS alerts, report generation, task routing |
| **Agent 6** – Citizen Support | Interface | Multilingual Q&A, grievance filing, scheme enrollment assistance |

---

## 🎮 Interactive Demo Flows

### Flow 1: Decision Telemetry Feedback Loop
1. Open the app and click **"Launch Demo"** → signed in as Administrator
2. Note **Traffic Speed: 42 km/h** on the Dashboard
3. Navigate to **Recommendations** in the sidebar
4. Find proposal `REC-01`: *"Deploy 4 Extra Transit Shuttles in Sector 1"*
5. Click **Accept Proposal** → green toast notification appears
6. Return to **Dashboard** → Traffic Speed has updated to **48 km/h** ✅

### Flow 2: Gemini Chat + Inline Visualization
1. Navigate to **AI Assistant**
2. Click the chip: **"Predict flood risk tomorrow."**
3. Watch the response stream character-by-character
4. Observe the markdown table and embedded **Tidal Height Safety Threshold** bar chart render inline ✅

### Flow 3: Smart City Map with Layer Overlays
1. Navigate to **Smart City Map**
2. Click **Sector 3 (Industrial)** → see AQI 265 (Hazardous) in the right panel
3. Toggle **AQI Heatmap** layer → Industrial sector turns red
4. Toggle **Flood Hazard Zones** → animated alert rings appear over the Waterfront sector ✅

### Flow 4: Multi-Agent Live Telemetry
1. Navigate to **Agents**
2. Watch the SVG animated data packets flow between the 6 agent nodes
3. Click **Insight Agent** in the list → see its live telemetry log auto-rotate every few seconds ✅

### Flow 5: Document RAG Search
1. Navigate to **Documents**
2. Click on **"Flood_Plain_Assessment_S4.docx"** → read the AI-generated summary
3. Type `"Sector 3"` in the semantic search bar → filtered list shows matching documents ✅

### Flow 6: Automation Builder
1. Navigate to **Automation**
2. Select a new **Trigger**, **Condition**, and **Action** from the dropdowns
3. Click **Initialize Trigger Workflow** → new rule appears in the Active Rules list ✅

---

## 🎨 Design System

Built with a **custom zero-dependency CSS design system** inspired by Google Material Design 3:

### Color Palette
| Token | Value | Usage |
|---|---|---|
| `--google-blue` | `#4285F4` | Primary actions, links, active states |
| `--google-green` | `#34A853` | Success, connected, approved |
| `--google-red` | `#EA4335` | Critical alerts, errors, rejected |
| `--google-yellow` | `#FBBC05` | Warnings, medium priority |
| `--purple-ai` | `#8B5CF6` | AI features, agent nodes, predictions |
| `--orange-warn` | `#F97316` | High priority, caution states |

### Dark Mode (Default)
```css
--bg-primary:   #0F172A    /* Deep navy background */
--bg-secondary: #1E293B    /* Card surfaces */
--text-primary: #F8FAFC    /* Primary text */
```

### Typography
- **Headings** → `Outfit` (700–800 weight)
- **Body** → `Inter` (400–600 weight)
- **Code/Logs** → `JetBrains Mono` (400–500 weight)

### Key CSS Classes
```css
.card          /* Rounded glass card with shadow */
.card-hover    /* Lifts and glows on hover */
.glass-panel   /* Backdrop blur glassmorphism panel */
.glow-border   /* Animated gradient glow border on hover */
.badge-blue    /* Status badge: blue variant */
.btn-primary   /* Google Blue filled button */
.btn-secondary /* Surface outlined button */
.animate-fade-in /* Slide-up fade entrance animation */
.data-flow-line  /* Animated dashed SVG stroke for agent flows */
.pulse-glow-purple /* Radial pulse animation for agent nodes */
```

---

## 🗄️ Database Schema

*(Designed for Firestore / BigQuery deployment)*

```
Collections:
├── users/            { uid, name, email, role, department, city }
├── departments/      { id, name, city, head, budget, agents }
├── alerts/           { id, title, severity, sector, category, time, status }
├── predictions/      { id, title, confidence, risk, features[], timeframe }
├── recommendations/  { id, title, priority, impact, cost, improvement, status }
├── documents/        { id, name, size, type, summary, entities[], date }
├── reports/          { id, name, format, frequency, date, url }
├── chats/            { id, userId, messages[], createdAt }
├── agents/           { id, name, role, status, uptime, apiCalls, logs[] }
├── automations/      { id, trigger, condition, action, runs, active }
├── datasets/         { id, source, frequency, latency, reliability, status }
└── logs/             { id, agentId, event, timestamp, sector }
```

---

## 📊 Sample Data

All pages are pre-populated with realistic mock data from [`src/utils/mockData.js`](./src/utils/mockData.js):

| Dataset | Records | Coverage |
|---|---|---|
| AI Agents | 6 | Full agent definitions, log event pools |
| Community Alerts | 5 | Flood, AQI, Traffic, Power, Disease incidents |
| AI Recommendations | 5 | Transport, Waste, Health, Energy, Disaster |
| Data Sources | 8 | Weather, Maps, IoT, Hospital, Complaints, Satellite |
| Documents | 3 | Urban Mobility, Flood Assessment, Air Quality CSV |
| Automation Rules | 4 | Pollution, Flood, Hospital, Grid triggers |
| Chat Presets | 5 | Canned streaming AI responses with tables + charts |
| Sector Telemetry | 5 | Per-sector AQI, traffic, health, energy readouts |

---

## 👥 Target Users

### Primary Users
- 🏛️ **City Administrators** — Monitor KPIs, approve AI recommendations, manage automations
- 🏢 **Government Officials** — View macro reports, authorize policy proposals
- 🏥 **Public Health Departments** — Track hospital capacity, disease outbreak risks
- 🌊 **Disaster Response Teams** — Monitor flood forecasts, activate emergency protocols
- 🌿 **Environmental Agencies** — Track AQI, pollution sources, green energy metrics
- 📚 **NGOs & Universities** — Research datasets, sector analytics exports

### Secondary Users
- 👤 **Citizens** — Check local AQI, traffic, and file complaints via Citizen Support Agent
- 🔬 **Researchers** — Export telemetry datasets, audit time-series model predictions

---

## 🙌 Contributing

We welcome contributions to CommunityIQ! Please follow the guidelines below:

1. **Fork** the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. **Make your changes** following the existing code style and component patterns.
3. **Test** your changes with `npm run dev` and verify the production build with `npm run build`.
4. **Submit a Pull Request** with a clear description of what was changed and why.

### Development Guidelines
- All new pages must be registered in [`src/App.jsx`](./src/App.jsx) and [`src/components/MainLayout.jsx`](./src/components/MainLayout.jsx)
- Follow the existing CSS class system in [`src/index.css`](./src/index.css) — avoid inline one-off styles
- Mock data additions belong in [`src/utils/mockData.js`](./src/utils/mockData.js)
- New global state should be added to [`src/context/AppContext.jsx`](./src/context/AppContext.jsx)

---

## 📜 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

---

## 🔗 Resources & Links

| Resource | Link |
|---|---|
| 🌐 React Documentation | [https://react.dev/](https://react.dev/) |
| ⚡ Vite Documentation | [https://vitejs.dev/](https://vitejs.dev/) |
| 🎨 Lucide Icons | [https://lucide.dev/](https://lucide.dev/) |
| 🔤 Google Fonts (Inter) | [https://fonts.google.com/specimen/Inter](https://fonts.google.com/specimen/Inter) |
| 🔤 Google Fonts (Outfit) | [https://fonts.google.com/specimen/Outfit](https://fonts.google.com/specimen/Outfit) |
| ☁️ Google Cloud Console | [https://console.cloud.google.com/](https://console.cloud.google.com/) |
| 🤖 Gemini API Docs | [https://ai.google.dev/docs](https://ai.google.dev/docs) |
| 🧠 Vertex AI Docs | [https://cloud.google.com/vertex-ai/docs](https://cloud.google.com/vertex-ai/docs) |
| 🗺️ Google Maps Platform | [https://developers.google.com/maps](https://developers.google.com/maps) |
| 🔍 Vertex AI Search | [https://cloud.google.com/generative-ai-app-builder/docs](https://cloud.google.com/generative-ai-app-builder/docs) |
| 📊 BigQuery Docs | [https://cloud.google.com/bigquery/docs](https://cloud.google.com/bigquery/docs) |
| 🔥 Firestore Docs | [https://firebase.google.com/docs/firestore](https://firebase.google.com/docs/firestore) |
| 🐳 Cloud Run Docs | [https://cloud.google.com/run/docs](https://cloud.google.com/run/docs) |
| 📐 Material Design 3 | [https://m3.material.io/](https://m3.material.io/) |

---

<div align="center">

**Built with ❤️ for the Google Cloud Hackathon 2026**

Powered by **G**oogle **C**loud · **Gemini** · **Vertex AI** · **Agent Development Kit**

</div>
