const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createSpecificationPdf() {
  const pdfDoc = await PDFDocument.create();
  
  // Embed fonts
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Add Page 1
  let page = pdfDoc.addPage([595.28, 841.89]); // A4
  const { width, height } = page.getSize();

  // Colors
  const primaryOrange = rgb(0.917, 0.345, 0.047);
  const darkNavy = rgb(0.058, 0.09, 0.164);
  const textGray = rgb(0.2, 0.25, 0.33);
  const lightBg = rgb(0.97, 0.98, 0.99);

  // Top Header Banner
  page.drawRectangle({
    x: 40,
    y: height - 120,
    width: width - 80,
    height: 70,
    color: rgb(1, 0.968, 0.929),
    borderColor: primaryOrange,
    borderWidth: 1.5,
  });

  page.drawText('3altayer.app - Project Specification & Architecture', {
    x: 60,
    y: height - 85,
    size: 18,
    font: fontBold,
    color: primaryOrange,
  });

  page.drawText('Hybrid Ride-Hailing Platform (Instant & Bidding) | Currency: EGP (Egyptian Pounds)', {
    x: 60,
    y: height - 105,
    size: 10,
    font: fontRegular,
    color: darkNavy,
  });

  let currentY = height - 150;

  function drawHeading(title) {
    page.drawText(title, {
      x: 40,
      y: currentY,
      size: 14,
      font: fontBold,
      color: darkNavy,
    });
    currentY -= 18;
  }

  function drawBullet(title, desc) {
    page.drawText(`- ${title}: `, {
      x: 50,
      y: currentY,
      size: 10,
      font: fontBold,
      color: textGray,
    });
    const titleWidth = fontBold.widthOfTextAtSize(`- ${title}: `, 10);
    page.drawText(desc, {
      x: 50 + titleWidth,
      y: currentY,
      size: 10,
      font: fontRegular,
      color: textGray,
    });
    currentY -= 16;
  }

  // 1. Executive Summary
  drawHeading('1. Executive Overview & Hybrid Mechanism');
  drawBullet('Core Vision', 'Hybrid ride-hailing combining Instant (Uber-like) and Bidding (inDrive-like) modes.');
  drawBullet('Instant Ride Mode', 'Fixed calculated upfront fare, auto-dispatch to nearest driver within 15s timeout. (15% commission)');
  drawBullet('Bidding Ride Mode', 'Recommended benchmark fare, driver counter-offers in real-time, rider picks preferred driver. (10% commission)');
  drawBullet('Primary Target Market', 'Egypt (Greater Cairo & Alexandria) | Primary Language: Arabic (RTL), Secondary: English.');
  currentY -= 15;

  // 2. Pricing Matrix in Egypt (EGP)
  drawHeading('2. Fleet Categories & Pricing Structure in Egypt (EGP)');
  drawBullet('Economy (Sedan)', 'Base: 18.00 EGP | Per KM: 5.00 EGP | Minimum: 25.00 EGP');
  drawBullet('Comfort (Air-Conditioned)', 'Base: 28.00 EGP | Per KM: 7.00 EGP | Minimum: 40.00 EGP');
  drawBullet('Scooter / Motorcycle', 'Base: 12.00 EGP | Per KM: 3.50 EGP | Minimum: 18.00 EGP');
  drawBullet('Toktok (Local Short-Trips)', 'Base: 10.00 EGP | Per KM: 3.00 EGP | Minimum: 15.00 EGP');
  currentY -= 15;

  // 3. System Architecture & Tech Stack
  drawHeading('3. Technical Infrastructure & Architecture');
  drawBullet('Backend API', 'Node.js (NestJS + TypeScript) - Modular enterprise architecture with REST & Swagger.');
  drawBullet('Real-time & Geospatial', 'Redis Geo for ultra-low latency driver coordinates & WebSocket (Socket.io) broadcast.');
  drawBullet('Database & ORM', 'PostgreSQL 16 + PostGIS spatial extensions managed by Prisma ORM.');
  drawBullet('Admin Dashboard', 'Next.js 14 + Tailwind CSS with Live Radar Visualizer & bilingual Arabic/English support.');
  drawBullet('Mobile Ecosystem', 'Flutter (Dart) shared monorepo for Rider and Driver apps on iOS & Android.');
  currentY -= 15;

  // 4. Safety & Wallet Economics
  drawHeading('4. Safety Protocols & Financial Ledger (Wallets)');
  drawBullet('Ride Security', '4-digit OTP code verified before trip starts, SOS emergency button, and live trip sharing.');
  drawBullet('Cash Settlements', 'Automatic platform commission debit from driver in-app wallet upon trip completion.');
  drawBullet('Driver Debt Limit', 'Allowed negative debt limit up to -150.00 EGP before requiring a top-up recharge.');
  drawBullet('Digital Payments', 'Instant net earnings credit for electronic card and mobile wallet transactions.');
  currentY -= 15;

  // 5. Milestones & Roadmap
  drawHeading('5. Milestones & Delivery Status');
  drawBullet('Phase 0 & 1 [Completed]', 'Docker, PostgreSQL, Redis, Auth OTP, JWT, and Driver profiles established.');
  drawBullet('Phase 2 & 3 [Completed]', 'Geospatial Redis Geo engine, Instant auto-dispatch, Bidding broadcast & OTP lifecycle.');
  drawBullet('Phase 4 & 5 [Completed]', 'Wallet ledger in EGP, Admin Operations radar, and bilingual support (Arabic primary).');
  drawBullet('Phase 6 [Next Steps]', 'Flutter mobile UI screen completion and staging soft launch.');
  currentY -= 30;

  // Footer
  page.drawText('3altayer.app (C) 2026 - All Rights Reserved | Official Project Documentation', {
    x: 120,
    y: 40,
    size: 9,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '3altayer_project_specification.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`PDF successfully created at: ${outputPath}`);
}

createSpecificationPdf().catch(console.error);
