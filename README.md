# ArogyaCare — Rural Offline-First AI Symptom Triage

[![Render Deployment](https://img.shields.io/badge/Deploy%20to-Render-46E3B7?style=flat&logo=render&logoColor=black)](https://render.com)
[![PWA Ready](https://img.shields.io/badge/PWA-100%25%20Offline-0f766e?style=flat)](https://web.dev/progressive-web-apps/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

An offline-first, mobile-centric clinical symptom triage and health guidance Progressive Web App (PWA) designed specifically for rural patients, families, and community health workers (e.g., ASHA/CHWs) facing limited or unreliable internet connectivity.

---

## 🌟 Key Features

- **100% Offline Autonomy**: All triage logic, clinical danger flag detectors, first-aid references, and patient evaluation history run directly within the client browser via service worker caching and IndexedDB/localStorage.
- **Rural-Centric Interaction Design (IX)**:
  - Accessible typography with 1-tap font scaling (**Standard 16px**, **Large 18px**, **Extra Large 20px**).
  - High Contrast Outdoor Mode for bright direct sunlight viewing.
  - Large touch targets (≥48px) and low cognitive load step-by-step triage wizard.
- **Multilingual Support**:
  - English, हिन्दी (Hindi), Español (Spanish), and தமிழ் (Tamil).
- **Offline Text-to-Speech (Audio)**:
  - Native browser speech synthesis reads triage results and care instructions aloud for low-literacy or visually impaired patients.
- **Life-Threatening Red-Flag Interceptor**:
  - Immediate emergency alert triggering upon detection of critical symptoms (severe breathlessness, chest pressure, snake/scorpion bites, severe pediatric dehydration).
  - 1-tap direct ambulance dialer (**108 / 112** / customizable).
- **First-Aid & Home Care Guide**:
  - Step-by-step offline recipes for Homemade Oral Rehydration Solution (ORS), snakebite immobilization dos & don'ts, pediatric fever sponge baths, and heat stroke cooling.
- **Local Private Health History**:
  - Saves evaluations privately in browser storage with single-record review, clipboard export, and full deletion capabilities. Zero login or account required.
- **Progressive Web App (PWA)**:
  - Installable to Android, iOS, or desktop home screens with service worker offline caching.

---

## 💻 Tech Stack

- **Framework**: React 18 with TypeScript
- **Bundler**: Vite (SWC)
- **Styling**: Tailwind CSS + Radix UI Primitives + Lucide Icons
- **PWA**: Service Worker (`sw.js`) + Web App Manifest (`manifest.webmanifest`)
- **Speech API**: Web Speech API for zero-network speech synthesis

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd model-mobile-marvel
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Run production build locally**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Production Deployment on Render

This project is configured for one-click deployment to **Render** as a **Static Site** (recommended for zero latency, global CDN caching, and 100% free hosting with zero cold starts).

### Method 1: Deploy with Render Blueprint (`render.yaml`)

1. Push your code to your GitHub / GitLab repository.
2. Log in to [Render Dashboard](https://dashboard.render.com).
3. Click **New +** → **Blueprint**.
4. Connect your repository.
5. Render will automatically detect `render.yaml` and configure:
   - **Name**: `arogyacare-offline-triage`
   - **Environment**: `Static Site`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `./dist`
   - **SPA Rewrite Rule**: `/* -> /index.html` (prevents 404s on page refresh)
6. Click **Apply**. Your app will be live within 1–2 minutes!

---

### Method 2: Manual Setup via Render Dashboard

If you prefer setting up manually without Blueprints:

1. In Render Dashboard, click **New +** → **Static Site**.
2. Connect your Git repository.
3. Configure the following exact settings:
   - **Name**: `arogyacare-offline-triage` (or your choice)
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `.` (leave blank or default)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
4. Under **Redirects/Rewrites**:
   - Click **Add Rule**
   - **Type**: `Rewrite`
   - **Source**: `/*`
   - **Destination**: `/index.html`
   - *(This ensures SPA client routing works cleanly without 404s on refresh)*
5. Click **Create Static Site**.

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env` if custom configuration is needed:

```bash
cp .env.example .env
```

| Variable | Description | Default |
| :--- | :--- | :--- |
| `VITE_APP_NAME` | Display name of the application | `ArogyaCare` |
| `VITE_DEFAULT_EMERGENCY_NUMBER` | Default ambulance hotline to dial | `108` |

> **Note**: Because this is an offline-first client-side PWA, **never** store sensitive backend API secrets or database passwords in frontend `.env` files.

---

## ⚠️ Important Medical Disclaimer

ArogyaCare is strictly an **educational triage support and prioritization tool**. 

- It does **not** provide a clinical diagnosis, prescribe pharmaceutical drugs, or replace a physical medical examination by a certified physician.
- In any life-threatening emergency (such as severe chest pain, inability to breathe, sudden numbness/paralysis, or heavy bleeding), always contact your local emergency services (**108 / 112 / 911**) or proceed to the nearest hospital emergency department immediately.
