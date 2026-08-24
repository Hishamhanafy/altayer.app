# ⚡ 3altayer.app (منصة عالطاير)
> **The Real-time Hybrid Ride-Hailing Platform for Egypt & MENA**  
> *Combining Instant Rides (Uber-style, 15% commission) and Live Bidding/Negotiation (inDrive-style, 10% commission).*

---

## 🌟 Key Platform Highlights

- 🤝 **Hybrid Dispatch Engine**: Riders choose between **Instant Ride** (algorithmic matching) and **Live Bidding** (interactive fare counter-offers).
- 🇪🇬 **Egyptian Pound Economics**: Full support for EGP (ج.م), Vodafone Cash, InstaPay, Fawry, and a **-150 EGP** driver debt ceiling.
- 📱 **100% Autonomous Driver Experience**: Complete mobile onboarding (KYC camera uploads), live GPS radar, wallet top-ups, dispute resolution, and daily quest incentives.
- 📊 **Centralized Operations & Analytics Dashboard**: Daily/Weekly/Monthly/Yearly GMV, commission reporting, driver verification queue, promo code management, and payout approvals.
- ☁️ **Automated Cloud APK Compilation**: Preconfigured GitHub Actions CI/CD to build Android `.apk` files automatically on push.

---

## 🏗️ Repository Architecture

```text
3altayer.app/
├── ⚙️ backend/                 # NestJS 10 + Prisma ORM + PostgreSQL + Redis Geo
│   ├── src/
│   │   ├── modules/
│   │   │   ├── auth/          # OTP Authentication & JWT Guards
│   │   │   ├── users/         # Rider & Driver Profiles + KYC Verification
│   │   │   ├── rides/         # Trip State Machine & Lifecycle
│   │   │   ├── bidding/       # Real-time Driver Bidding & Negotiation
│   │   │   ├── geospatial/    # Redis Geo Driver Radar & Search
│   │   │   ├── wallets/       # EGP Accounting, Ledger, Top-ups & Payouts
│   │   │   └── admin/         # Platform Metrics, Promos & Quests
│   │   └── main.ts            # Swagger API Docs at /api/docs
│   └── prisma/
│       └── schema.prisma      # PostgreSQL Database Schema
│
├── 🖥️ admin-dashboard/         # Next.js 14 + Tailwind CSS + Lucide Icons
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.tsx       # Central Operations Hub & Analytics Reports
│   │   │   ├── rider/         # Interactive Rider Web Experience
│   │   │   ├── driver/        # Driver Mobile Autonomous Hub
│   │   │   └── ui-ux/         # Design System & Mobile Mockups
│   │   └── components/
│   └── public/                # WebAPK Manifests & Static Assets
│
├── 📱 mobile/apps/             # Native Flutter Mobile Applications
│   ├── rider_app/             # Flutter Rider Native App (Bidding + Instant)
│   └── driver_app/            # Flutter Driver Native App (Radar + Wallet)
│
├── 🤖 .github/workflows/       # GitHub Actions CI/CD
│   └── build-apk.yml          # Automated Android APK Cloud Compiler
│
└── 📄 docs/                   # PDF & HTML System Specs & Procurement Guides
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js**: v18+ (Tested on v24)
- **PostgreSQL** & **Redis** (Optional for local dev, fallback in-memory mode supported)
- **Flutter SDK**: v3.22+ (For mobile development)

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run start:dev
```
- **Backend API**: `http://localhost:4000`
- **Swagger Documentation**: `http://localhost:4000/api/docs`

### 3. Admin Dashboard & Web Apps Setup
```bash
cd admin-dashboard
npm install
npm run dev
```
- **Admin Dashboard**: `http://localhost:3000`
- **Rider App Web**: `http://localhost:3000/rider`
- **Driver App Web**: `http://localhost:3000/driver`

---

## 📱 Building Android APKs

### Method A: Automated Cloud Build (Recommended)
Simply push this repository to GitHub. The GitHub Actions workflow (`.github/workflows/build-apk.yml`) will automatically compile and produce downloadable release APKs:
- `3altayer-rider-apk`
- `3altayer-driver-apk`

### Method B: Local Flutter Build
```bash
# Rider App
cd mobile/apps/rider_app
flutter pub get
flutter build apk --release

# Driver App
cd mobile/apps/driver_app
flutter pub get
flutter build apk --release
```

---

## 🔒 Security & Best Practices
- Never commit `.env` or sensitive keystore files.
- All driver identity documents and licenses are managed through authenticated endpoints.
- WebSocket connections are secured with JWT handshake guards.

---

## 📄 Documentation & Studies
- `3altayer_summary_report.pdf` - Full Technical Specification & Feature Matrix
- `3altayer_financial_budget_study.pdf` - 3-Year Financial Model & ROI Study
- `3altayer_buying_guide.pdf` - Step-by-Step Server & Domain Procurement Guide

---

© 2026 3altayer.app. All rights reserved.
