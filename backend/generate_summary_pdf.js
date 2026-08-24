const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createDailySummaryPdf() {
  const pdfDoc = await PDFDocument.create();
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Page Setup (A4)
  let page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  // Color Palette
  const primaryOrange = rgb(0.917, 0.345, 0.047);
  const darkNavy = rgb(0.058, 0.09, 0.164);
  const textDark = rgb(0.15, 0.2, 0.28);
  const emeraldGreen = rgb(0.063, 0.725, 0.506);
  const lightBg = rgb(0.98, 0.985, 0.99);

  // Top Banner
  page.drawRectangle({
    x: 35,
    y: height - 120,
    width: width - 70,
    height: 75,
    color: rgb(1, 0.965, 0.925),
    borderColor: primaryOrange,
    borderWidth: 1.5,
  });

  page.drawText('3altayer.app - Comprehensive Daily Executive Summary', {
    x: 55,
    y: height - 80,
    size: 16,
    font: fontBold,
    color: primaryOrange,
  });

  page.drawText('Official Technical, Financial & UI/UX Architectural Report | Egypt (EGP)', {
    x: 55,
    y: height - 100,
    size: 9.5,
    font: fontRegular,
    color: darkNavy,
  });

  let currentY = height - 150;

  function drawHeading(title) {
    page.drawText(title, {
      x: 35,
      y: currentY,
      size: 13,
      font: fontBold,
      color: primaryOrange,
    });
    currentY -= 17;
  }

  function drawBullet(title, desc) {
    page.drawText(`* ${title}: `, {
      x: 45,
      y: currentY,
      size: 9.5,
      font: fontBold,
      color: darkNavy,
    });
    const titleWidth = fontBold.widthOfTextAtSize(`* ${title}: `, 9.5);
    page.drawText(desc, {
      x: 45 + titleWidth,
      y: currentY,
      size: 9.5,
      font: fontRegular,
      color: textDark,
    });
    currentY -= 15;
  }

  // 1. Executive Summary
  drawHeading('1. Executive Vision & Hybrid Ride-Hailing Model');
  drawBullet('Dual Mode System', 'Instant Ride (Uber fixed fare, 15% comm) + Bidding Mode (inDrive negotiation, 10% comm).');
  drawBullet('Primary Target Market', 'Egypt (Greater Cairo & Alexandria) with Egyptian Pounds (EGP) & Arabic Primary (RTL).');
  drawBullet('Fleet Categories in Egypt', 'Economy (18+5 EGP/km), Comfort (28+7 EGP/km), Scooter (12+3.5 EGP/km), Toktok (10+3 EGP/km).');
  currentY -= 12;

  // 2. Completed Backend Architecture
  drawHeading('2. Full Backend Engine Completed (NestJS + PostgreSQL + Redis)');
  drawBullet('Auth & Profiles Module', 'SMS OTP authentication, JWT Bearer tokens, Rider profiles & Driver verification.');
  drawBullet('Geospatial & Pricing Engine', 'Distance calculations, Redis Geo low-latency tracking & category pricing matrices in EGP.');
  drawBullet('Rides & Bidding Engine', 'Real-time WebSocket broadcasting, instant auto-dispatch loop, counter-offers, and 4-digit OTP start.');
  drawBullet('Wallets & Financial Ledger', 'Automated cash commission debiting, digital earnings credit, and -150 EGP debt ceiling.');
  drawBullet('Swagger API Docs & Seed Data', 'Interactive testing available at http://localhost:4000/api/docs with pre-seeded Cairo accounts.');
  currentY -= 12;

  // 3. Complete Mobile Experience (100% Smartphone Operations for Captains)
  drawHeading('3. Mobile Ecosystem & UI/UX (Rider & Driver Apps)');
  drawBullet('Captain Mobile Autonomy', 'Captains manage 100% of their work from the phone (registration, dispatch, OTP, payments).');
  drawBullet('Wallet & Repayment Hub', 'Drivers settle commissions & top-up via Vodafone Cash, InstaPay, Fawry, and withdraw earnings.');
  drawBullet('Dispute & Incident Center', 'Captains submit in-app tickets (unpaid cash, toll fees, cancellations) for instant reimbursement.');
  drawBullet('Rider Offers & Referrals', 'Promo codes (ALTAYER50), WhatsApp referral sharing (SALEM-789), and loyalty cashbacks.');
  currentY -= 12;

  // 4. Central Admin Dashboard & Executive Reports
  drawHeading('4. Central Operations & Reports Dashboard (http://localhost:3000)');
  drawBullet('Live Operations Radar', 'Real-time fleet tracking, active orders stream, and driver document approvals.');
  drawBullet('Payouts & Disputes Queue', 'Approving driver withdrawal requests and issuing instant wallet compensation.');
  drawBullet('Incentives & Marketing', 'Managing peak hour quests (+60 EGP) and creating custom promo code campaigns.');
  drawBullet('Comprehensive Reports', 'Daily, Weekly, Monthly, and Yearly analytics covering GMV, net revenue, categories, and top zones.');
  currentY -= 12;

  // 5. Smart Maps Strategy
  drawHeading('5. Smart Hybrid Google Maps Architecture');
  drawBullet('User Facing UI', 'Google Maps SDK & Google Places Autocomplete API for pinpoint street accuracy in Egypt.');
  drawBullet('Cost Optimization', 'High-frequency GPS tracking handled by internal Redis Geo server at zero API cost.');
  currentY -= 25;

  // Footer
  page.drawText('3altayer.app (C) 2026 - Comprehensive Project Delivery Report | All Rights Reserved', {
    x: 100,
    y: 35,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '3altayer_daily_summary_report.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Summary PDF successfully created at: ${outputPath}`);
}

createDailySummaryPdf().catch(console.error);
