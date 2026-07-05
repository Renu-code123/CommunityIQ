// CommunityIQ Rich Mock Dataset

export const mockAgents = [
  {
    id: 1,
    name: "Data Collection Agent",
    role: "Collector",
    status: "Active",
    uptime: "99.98%",
    apiCalls: "452,192",
    description: "Ingests real-time IoT feeds, municipal APIs, satellite visuals, healthcare reports, and weather telemetry.",
    inputs: ["IoT Sensors", "Weather API", "Google Maps", "Gov APIs"],
    logs: [
      "Synced IoT traffic loops in Sector 1 (Downtown) - 1.2s latency",
      "Retrieved weather pressure maps from NOAA - Success",
      "Parsed healthcare census from General Hospital admissions feed",
      "Completed visual segmentation check on Landsat-9 cloud tiles"
    ]
  },
  {
    id: 2,
    name: "Insight Agent",
    role: "Analyzer",
    status: "Active",
    uptime: "99.95%",
    apiCalls: "320,448",
    description: "Performs anomaly detection, spatial clustering, and trend analysis on raw incoming sensor and citizen streams.",
    inputs: ["Raw Sensor Logs", "Citizen Complaints", "Traffic Feeds"],
    logs: [
      "Detected anomaly: 22% spike in PM2.5 levels in Sector 3 (Industrial)",
      "Flagged recurring citizen complaints about water pressure in Zone 2",
      "Clustered traffic backups near arterial crossing A-14",
      "Identified correlation between ambient temperature and power grid spikes"
    ]
  },
  {
    id: 3,
    name: "Prediction Agent",
    role: "Forecaster",
    status: "Active",
    uptime: "99.90%",
    apiCalls: "284,102",
    description: "Runs time-series forecasting, disease spike models, flood simulations, and grid demand predictive curves.",
    inputs: ["Historical data", "Synoptic models", "Insight anomalies"],
    logs: [
      "Updated flood risk forecast: Sector 4 (Waterfront) reaches 84% at 14:00 high tide",
      "Generated 24h traffic congestion prediction for central arteries",
      "Predicted 3.4% rise in regional energy peak demand due to incoming heatwave",
      "Updated epidemiological hazard index: influenza spread forecast down by 2%"
    ]
  },
  {
    id: 4,
    name: "Recommendation Agent",
    role: "Strategist",
    status: "Active",
    uptime: "99.97%",
    apiCalls: "154,890",
    description: "Runs multi-criteria optimization to generate policy choices, resource deployments, and emergency plans.",
    inputs: ["Prediction risks", "Budget tables", "Constraint weights"],
    logs: [
      "Created optimization recipe: R-492 (Redistribute zone 4 transit)",
      "Evaluated cost-benefit metrics for emergency cooling shelters",
      "Generated waste collection truck routing based on overflow signals",
      "Recommended 10-minute offset for street lighting smart switches"
    ]
  },
  {
    id: 5,
    name: "Automation Agent",
    role: "Executor",
    status: "Active",
    uptime: "99.99%",
    apiCalls: "589,010",
    description: "Handles workflow notifications, task delegations, webhook dispatches, automated reporting, and warning broadcasts.",
    inputs: ["Approved suggestions", "Triggers", "Alert signals"],
    logs: [
      "Sent critical air quality SMS warning to 18,200 users in Sector 3",
      "Compiled weekly smart community analytics digest and uploaded to Cloud Storage",
      "Triggered API webhook: closed intake valve #12 in flood mitigation routine",
      "Created priority ticket #T-889 in public works dispatch for garbage collection"
    ]
  },
  {
    id: 6,
    name: "Citizen Support Agent",
    role: "Interface",
    status: "Active",
    uptime: "99.94%",
    apiCalls: "94,281",
    description: "Converses with residents in multiple languages, files claims/complaints, explains city plans, and provides emergency help.",
    inputs: ["Citizen chat portal", "Knowledge Base (RAG)"],
    logs: [
      "Resolved citizen inquiry about flood safety shelter locations (Tamil)",
      "Logged grievance: 'Pothole on Main St' -> dispatched to Data Collection Agent",
      "Provided step-by-step assistance for smart-grid subsidy enrollment (Hindi)",
      "Answered public transport timetable query - Success (English)"
    ]
  }
];

export const mockAlerts = [
  {
    id: "AL-809",
    title: "Waterfront Flood Risk Level Critical",
    category: "Flood Warning",
    sector: "Sector 4 (Waterfront)",
    severity: "Critical",
    time: "10 mins ago",
    status: "Unresolved",
    details: "Tidal gauges indicate water levels exceeding safety margins. Rain forecast: +45mm in next 3 hours."
  },
  {
    id: "AL-808",
    title: "Air Pollution Spike (AQI 265)",
    category: "Air Quality",
    sector: "Sector 3 (Industrial)",
    severity: "High",
    time: "45 mins ago",
    status: "Unresolved",
    details: "Sensor network confirms highly elevated particulate matter. Residents advised to limit outdoor activity."
  },
  {
    id: "AL-807",
    title: "Major Congestion at Central Link A-12",
    category: "Road Accident",
    sector: "Sector 1 (Downtown)",
    severity: "Medium",
    time: "1 hour ago",
    status: "Unresolved",
    details: "Two-vehicle collision blocking two central lanes. Tow trucks dispatched. Delay: 35 minutes."
  },
  {
    id: "AL-806",
    title: "Substation Grid Failure",
    category: "Power Outage",
    sector: "Sector 2 (Residential)",
    severity: "Medium",
    time: "2 hours ago",
    status: "Resolved",
    details: "Transformer malfunction caused outage affecting 800 households. Grid routed backups; service fully restored."
  },
  {
    id: "AL-805",
    title: "Elevated Gastroenteritis Admissions",
    category: "Disease Spike",
    sector: "Sector 5 (Health City)",
    severity: "High",
    time: "5 hours ago",
    status: "Unresolved",
    details: "Admissions database shows 14% spike in gastric cases within last 24 hours. Testing municipal water lines."
  }
];

export const mockRecommendations = [
  {
    id: "REC-01",
    title: "Deploy 4 Extra Transit Shuttles in Sector 1",
    description: "Peak hour traffic delay is up 28% on Downtown expressway. Adding direct shuttles will absorb 350+ private commutes.",
    department: "Transportation",
    priority: "High",
    impact: "+18% Speed",
    cost: "Low",
    expectedImprovement: "15% commute duration reduction",
    status: "Pending"
  },
  {
    id: "REC-02",
    title: "Dispatch Overflow Trash Compactor to Sector 2",
    description: "IoT garbage lid sensors report 92% capacity across 14 trash bins in Residential Zone A. Current route is 3 days out.",
    department: "Waste Management",
    priority: "Medium",
    impact: "Clean Environment",
    cost: "Low",
    expectedImprovement: "Zero street litter overflow reports",
    status: "Pending"
  },
  {
    id: "REC-03",
    title: "Activate Sector 5 Temporary Heatwave Clinic",
    description: "Meteorological predictions project 44°C temperatures for tomorrow. Sector 5 hospitals are already at 85% capacity.",
    department: "Healthcare",
    priority: "Critical",
    impact: "Life Saving",
    cost: "Medium",
    expectedImprovement: "Reduces ER patient queues by 30%",
    status: "Pending"
  },
  {
    id: "REC-04",
    title: "Enable Eco-Dimming for Streets (Sectors 1, 2, 3)",
    description: "Energy demand forecasted to hit peak capacity. Automatically dim streetlights by 20% after midnight.",
    department: "Energy",
    priority: "Low",
    impact: "-8% Load",
    cost: "None",
    expectedImprovement: "12,000 kWh saved nightly",
    status: "Pending"
  },
  {
    id: "REC-05",
    title: "Issue Pre-emptive Flood Defenses in Sector 4",
    description: "Prediction Agent places flood hazard probability at 84% for tomorrow high tide. Deploy temporary sand barriers.",
    department: "Disaster Management",
    priority: "Critical",
    impact: "Property Protection",
    cost: "Medium",
    expectedImprovement: "Prevents $1.2M in coastal street flooding",
    status: "Pending"
  }
];

export const mockDataSources = [
  { id: "src-1", name: "Weather API (NOAA)", type: "API", status: "Connected", latency: "140ms", reliability: "99.9%", frequency: "Every 15 min" },
  { id: "src-2", name: "Google Maps Platform", type: "API", status: "Connected", latency: "85ms", reliability: "99.99%", frequency: "Real-time" },
  { id: "src-3", name: "IoT Flow Sensors", type: "Hardware", status: "Connected", latency: "12ms", reliability: "98.7%", frequency: "Every 5 sec" },
  { id: "src-4", name: "City Traffic Cameras", type: "API", status: "Connected", latency: "310ms", reliability: "97.5%", frequency: "Stream" },
  { id: "src-5", name: "Hospital Admissions Feed", type: "Database", status: "Connected", latency: "90ms", reliability: "99.95%", frequency: "Hourly" },
  { id: "src-6", name: "Citizen Complaint Portal", type: "API", status: "Connected", latency: "45ms", reliability: "99.5%", frequency: "Event-driven" },
  { id: "src-7", name: "Satellite Landsat-9", type: "SaaS", status: "Syncing", latency: "3400ms", reliability: "99.0%", frequency: "Daily sync" },
  { id: "src-8", name: "Air Quality Nodes", type: "Hardware", status: "Inactive", latency: "---", reliability: "88.2%", frequency: "Fault detected" }
];

export const mockDocuments = [
  { id: "doc-1", name: "Urban_Mobility_Report_2026.pdf", size: "4.2 MB", type: "PDF", date: "2026-06-15", summary: "Comprehensive analysis of transit growth, bus line optimization, and congestion nodes in Central areas. Suggests expanding bus route 4 by 4.2km to service Sector 2.", entities: ["Route 4", "Sector 2", "Bus Lines", "Downtown Grid"] },
  { id: "doc-2", name: "Flood_Plain_Assessment_S4.docx", size: "1.8 MB", type: "DOCX", date: "2026-05-30", summary: "Topographical safety evaluation of Sector 4 Waterfront. Warns that current seawalls are vulnerable to storm surges exceeding 2.5 meters. Proposes installing bioswales and smart drainage valves.", entities: ["Sector 4", "Seawall", "Storm Surge", "Smart Valves"] },
  { id: "doc-3", name: "Air_Quality_Correlations.csv", size: "720 KB", type: "CSV", date: "2026-06-22", summary: "Tabular raw telemetry matching steel mill exhaust logs with particulate readings. Demonstrates a clear 84% correlation between midnight chimney purging and early morning PM2.5 spikes in Sector 3.", entities: ["Sector 3", "Steel Mill", "PM2.5", "Chimney Purge"] }
];

export const mockAutomations = [
  { id: "auto-1", trigger: "Pollution AQI > 250", condition: "Department = Public Health", action: "Send SMS Alert & Notify Hospital networks", runs: 4, active: true },
  { id: "auto-2", trigger: "Waterfront Flood Risk > 80%", condition: "Tide = High Tide Alert", action: "Deploy Sand Barriers & Close floodgate 3", runs: 1, active: true },
  { id: "auto-3", trigger: "Hospital Occupancy > 90%", condition: "None", action: "Flag Recommendation: Open Temporary Clinic", runs: 0, active: true },
  { id: "auto-4", trigger: "Power Grid Load > 95%", condition: "Time between 12:00 - 18:00", action: "Auto-dim street lights & Alert large commercial grids", runs: 12, active: false }
];

export const mockChatAnswers = {
  "why is traffic increasing today?": `### Traffic Congestion Analysis - Sector 1 (Downtown)
Our data stream reports a **28% increase in traffic volume** on the Downtown Arterial route A-12.

**Primary Factors:**
1. **Minor Incident:** A fender bender on Lane 2 occurred around 08:15 AM near the 4th Avenue junction. (Resolved, but residual buffer delays persist).
2. **Weather Transition:** Light drizzle reduced average speeds from 48 km/h to 36 km/h.
3. **Transit Diversion:** Commuters from Route B are detouring due to standard water main maintenance on Sector 2 crossing.

**Recommended Action:**
Click on the **Recommendations** tab and approve **REC-01** to dispatch 4 supplementary shuttle buses immediately to alleviate volume.`,

  "predict flood risk tomorrow.": `### Flood Risk Forecasting: Waterfront (Sector 4)
Using current tide telemetry combined with meteorological rainfall predictions, the **Prediction Agent** projects a **High Risk Event** for tomorrow.

| Parameters | Value | Hazard Contribution |
|---|---|---|
| Projected Rainfall | 45mm (in 3h) | High |
| High Tide Level | +2.74 meters | Critical |
| Soil Moisture Index | 92% (Saturated) | High |
| **Combined Risk Probability** | **84%** | **Critical Alert** |

**Forecast graph:**
*   **09:00 AM:** Safe (Risk 15%)
*   **12:00 PM:** Warning (Risk 45%)
*   **02:00 PM (Tide Peak):** **Danger (Risk 84%)**
*   **05:00 PM:** Safe (Risk 30%)

**Action Initiated:** The Automation Agent is staging sandbag deployers. Recommend approving the emergency sand barrier protocol under the **Recommendations** dashboard.`,

  "which hospitals are overcrowded?": `### Healthcare Facility Census: Sector 5 (Health City)
Current occupancy rates across primary smart-community clinics:

| Hospital Name | Occupancy | ICU Availability | Status | Patient Delay |
|---|---|---|---|---|
| **Metro General** | 89% | 2 Beds | **Critical** | 45m |
| **St. Jude Medical** | 86% | 1 Bed | **Critical** | 50m |
| **Sector 5 Community** | 94% | 0 Beds | **Emergency** | 90m |
| **Children's Specialty** | 52% | 14 Beds | **Normal** | 10m |

**Causal Analysis:** The overcrowding is strongly linked to the recent heatwave spike (+4.2°C temperature index) resulting in dehydration admissions.

*Recommendation:* Open the **Temporary Health Camp** clinic (REC-03) in Sector 5 immediately to screen minor incidents.`,

  "recommend waste collection optimization.": `### Smart Waste Collection Optimization Report
Sensor readings in Sector 2 (Residential) show rapid container filling.

**Problem:** 14 public smart bins have surpassed **92% capacity**, while the next scheduled garbage collection cycle is in 72 hours.

**Optimization Blueprint:**
*   **Current Routing:** 4 heavy diesel trucks follow a fixed route daily.
*   **Optimized Routing:** Reroute **Truck #2** from Sector 3 (currently at 30% waste level) directly to the Zone A clusters in Sector 2.
*   **Estimated Savings:**
    *   *Fuel consumption:* -12% CO2 emissions.
    *   *Sewer blocks:* 0 complaints.
    *   *Collection latency:* Improved from 72h to 4h.

Select **Recommendations** in the menu and click **Accept** on **REC-02** to push this optimized route directly to the drivers' consoles.`,

  "summarize today's city status.": `### CommunityIQ Smart City Daily Summary: Jul 5, 2026

**1. Transportation:**
*   Traffic speed is normal (42 km/h) except on Downtown Expressway due to minor incident (28% delay, Sector 1).
*   Public transit capacity is running at 74%.

**2. Environment & Utility:**
*   **AQI:** 112 (Moderate) in residential zones, but spikes to **265 (High)** in Sector 3 (Industrial).
*   **Energy Grid:** Load is at 78%. Dimming scheduler on standby.

**3. Disaster Threat:**
*   **Flood Risk:** Currently Low (12%), rising to **84% Tomorrow** at high tide. Sector 4 Waterfront is on high alert.

**4. Public Health:**
*   Overcrowding identified at Sector 5 Community Hospital (94% occupancy). 

*Quick Actions Recommended:* Approve Sandbag deployment (Disaster), deploy supplementary shuttles (Transit), and active Heatwave clinic (Health).`
};

export const defaultChatHistory = [
  { id: "ch-1", sender: "assistant", text: "Welcome to CommunityIQ. I am your Multi-Agent Decision Intelligence Assistant. How can I assist you with city data analysis, predictive forecasting, or resource optimization today?" }
];

export const sectorTelemetry = {
  1: { name: "Sector 1 (Downtown)", traffic: "Busy (38 km/h)", aqi: "98 - Moderate", satisfaction: "84%", healthcare: "72% load", energy: "2.4 MW", alertsCount: 1 },
  2: { name: "Sector 2 (Residential)", traffic: "Smooth (52 km/h)", aqi: "54 - Good", satisfaction: "90%", healthcare: "68% load", energy: "4.1 MW", alertsCount: 0 },
  3: { name: "Sector 3 (Industrial)", traffic: "Heavy (32 km/h)", aqi: "265 - Hazardous", satisfaction: "62%", healthcare: "48% load", energy: "8.9 MW", alertsCount: 1 },
  4: { name: "Sector 4 (Waterfront)", traffic: "Moderate (44 km/h)", aqi: "72 - Good", satisfaction: "79%", healthcare: "55% load", energy: "1.8 MW", alertsCount: 1 },
  5: { name: "Sector 5 (Health City)", traffic: "Smooth (48 km/h)", aqi: "65 - Good", satisfaction: "88%", healthcare: "94% Overloaded", energy: "3.2 MW", alertsCount: 1 }
};
