# 🚀 Full-Stack Deployment Guide

A streamlined, step-by-step guide to deploying your Frontend (React/Vite) and Backend (Node/Python) applications.

<br/>

## 📦 Phase 1: Preparation & Git

| Step | Action | 🎨 Frontend (React/Vite) | ⚙️ Backend (Node/Express/Python) |
| :---: | :--- | :--- | :--- |
| **1** | **Local Test** | Run `npm run build` to ensure the project compiles without errors. | Start server locally to ensure no runtime crashes. |
| **2** | **Env Setup** | Set variables with `VITE_` prefix (e.g., `VITE_API_URL`). | Create `.env` for secrets (DB URL, API Keys). |
| **3** | **Git Repo** | Run `git add .`, `git commit`, and `git push` to your repository. | Commit code (ensure `node_modules` and `.env` are in `.gitignore`). |

<br/>

## ☁️ Phase 2: Platform Setup

| Step | Action | 🎨 Frontend (React/Vite) | ⚙️ Backend (Node/Express/Python) |
| :---: | :--- | :--- | :--- |
| **4** | **Platform** | Use **Vercel** or **Netlify**. | Use **Render**, **Railway**, or **Heroku**. |
| **5** | **Connect** | Log in, click **New Project**, and connect the GitHub repository. | Log in, create **New Web Service**, and connect GitHub repository. |
| **6** | **Env Vars** | Add `VITE_API_URL` to Vercel/Netlify dashboard settings. | Add all `DATABASE_URL` and secret keys to Render/Railway settings. |

<br/>

## 🔨 Phase 3: Build Configuration

| Step | Action | 🎨 Frontend (React/Vite) | ⚙️ Backend (Node/Express/Python) |
| :---: | :--- | :--- | :--- |
| **7** | **Install** | `npm install` | `npm install` or `pip install -r requirements.txt` |
| **8** | **Build** | `npm run build` | *Usually none, or platform specific build step* |
| **9** | **Output/Start** | Set **Output Directory** to: `dist` | Set **Start Command**: `npm start` or `python main.py` |

<br/>

## 🚀 Phase 4: Launch & Connect

| Step | Action | 🎨 Frontend (React/Vite) | ⚙️ Backend (Node/Express/Python) |
| :---: | :--- | :--- | :--- |
| **10** | **Deploy** | Click **Deploy**. Platform will build and host static files. | Click **Deploy**. Platform will build and start the server. |
| **11** | **CORS** | *N/A (Browser handles this)* | **Critical:** Add your new Frontend URL to the Backend CORS config. |
| **12** | **Verify** | Visit the live URL. Test routing and page loads. | Use the live API URL to test endpoints via Postman or browser. |

<br/>

## 🛠 Troubleshooting Cheat Sheet

| Error / Issue | 🎨 Frontend Solution | ⚙️ Backend Solution |
| :--- | :--- | :--- |
| **404 on Refresh** | Add `vercel.json` to rewrite routes to `/index.html`. | Check if API route paths are exact and server is listening. |
| **Network/CORS Error** | Ensure `VITE_API_URL` points exactly to the live backend URL. | Update `cors({ origin: 'https://frontend.com' })` in code. |
| **Missing Env Variables** | Variables **must** start with `VITE_` to be readable in React. | Ensure variable names in dashboard exactly match the code. |
