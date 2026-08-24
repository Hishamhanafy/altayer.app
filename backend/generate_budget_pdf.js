const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createBudgetStudyPdf() {
  const pdfDoc = await PDFDocument.create();
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const primaryOrange = rgb(0.917, 0.345, 0.047);
  const darkNavy = rgb(0.058, 0.09, 0.164);
  const textDark = rgb(0.15, 0.2, 0.28);
  const emeraldGreen = rgb(0.063, 0.725, 0.506);

  // Top Banner
  page.drawRectangle({
    x: 35,
    y: height - 120,
    width: width - 70,
    height: 75,
    color: rgb(0.96, 0.98, 1),
    borderColor: darkNavy,
    borderWidth: 1.5,
  });

  page.drawText('3altayer.app - Official Financial Budget & Launch Feasibility Study', {
    x: 55,
    y: height - 80,
    size: 15,
    font: fontBold,
    color: darkNavy,
  });

  page.drawText('Detailed Cost Breakdown, Cloud Infrastructure & ROI Projections (Egypt / EGP & USD)', {
    x: 55,
    y: height - 100,
    size: 9.5,
    font: fontRegular,
    color: primaryOrange,
  });

  let currentY = height - 150;

  function drawHeading(title) {
    page.drawText(title, {
      x: 35,
      y: currentY,
      size: 12.5,
      font: fontBold,
      color: primaryOrange,
    });
    currentY -= 17;
  }

  function drawBullet(title, desc) {
    page.drawText(`* ${title}: `, {
      x: 45,
      y: currentY,
      size: 9,
      font: fontBold,
      color: darkNavy,
    });
    const titleWidth = fontBold.widthOfTextAtSize(`* ${title}: `, 9);
    page.drawText(desc, {
      x: 45 + titleWidth,
      y: currentY,
      size: 9,
      font: fontRegular,
      color: textDark,
    });
    currentY -= 14;
  }

  // 1. One-Time Setup Costs
  drawHeading('1. One-Time Setup & App Store Developer Accounts');
  drawBullet('Domain Registration', 'Official custom domain (3altayer.app / 3altayer.com) = $15 (~750 EGP/year).');
  drawBullet('Google Play Console', 'Lifetime Android Developer account to publish Rider & Driver apps = $25 (~1,250 EGP).');
  drawBullet('Apple Developer Program', 'Annual iOS Developer account for App Store distribution = $99 (~4,850 EGP/year).');
  drawBullet('SSL & DDoS Protection', 'Cloudflare Enterprise-grade DNS & HTTPS certificates = $0 (FREE).');
  drawBullet('Total Setup Capital', '$139 (~6,850 EGP) one-time fixed cost.');
  currentY -= 10;

  // 2. Monthly Cloud & API Operations
  drawHeading('2. Monthly Cloud Hosting & API Running Expenses');
  drawBullet('Cloud VPS Server', 'Hetzner / DigitalOcean (4-8 vCPU, 16GB RAM) hosting NestJS, Postgres, Redis = $25 (~1,250 EGP/mo).');
  drawBullet('Google Maps Platform', 'SDK, Geocoding & Places APIs = $0 (Fully covered by Google 200 USD monthly free credit).');
  drawBullet('SMS OTP Authentication', '3,000 verification SMS via SMS Misr / Twilio @ ~0.35 EGP/SMS = $20 (~1,000 EGP/mo).');
  drawBullet('Push Notifications', 'Firebase Cloud Messaging (FCM) for background mobile audio alerts = $0 (FREE).');
  drawBullet('Driver Documents Storage', 'Cloudflare R2 / AWS S3 encrypted KYC storage = $2 (~100 EGP/mo).');
  drawBullet('Payment Gateway (E-Wallets)', 'Paymob / Fawry integrations = 0 fixed fees (pay-as-you-go per transaction).');
  drawBullet('Total Monthly Cloud Running Cost', '~47 USD (~2,350 EGP / month).');
  currentY -= 10;

  // 3. Recommended Marketing & Launch Budget
  drawHeading('3. First-Month Growth & Driver Acquisition (Optional)');
  drawBullet('Targeted Social Ads', 'Facebook & TikTok campaigns targeting drivers in Cairo & Alexandria = ~8,000 EGP.');
  drawBullet('Rider Promo Campaigns', 'Localized ads in Nasr City, New Cairo, Zamalek & Maadi = ~7,000 EGP.');
  drawBullet('First Week Captain Quests', 'Peak hour bonus incentives to bootstrap active driver supply = ~5,000 EGP.');
  drawBullet('Total Marketing Allocation', '~20,000 EGP (~400 USD).');
  currentY -= 10;

  // 4. Financial ROI & Revenue Projection
  drawHeading('4. Financial ROI & Net Revenue Projection');
  drawBullet('Base Scenario', '300 completed rides/day @ 75 EGP average fare = 22,500 EGP daily GMV (675,000 EGP/month).');
  drawBullet('Platform Commission Net', 'Average 12% blended commission (15% instant, 10% bidding) = 81,000 EGP gross revenue/month.');
  drawBullet('Net Profit After Cloud & Ops', '81,000 - 2,350 EGP = ~78,650 EGP / month net operational profit.');
  currentY -= 20;

  // Bottom Summary Box
  page.drawRectangle({
    x: 35,
    y: currentY - 50,
    width: width - 70,
    height: 55,
    color: rgb(0.94, 0.99, 0.96),
    borderColor: emeraldGreen,
    borderWidth: 1.5,
  });

  page.drawText('Executive Capital Conclusion:', {
    x: 50,
    y: currentY - 15,
    size: 10.5,
    font: fontBold,
    color: emeraldGreen,
  });

  page.drawText('Total launch capital required (Setup + 1st month Cloud + Marketing) = ~29,200 EGP (~590 USD).', {
    x: 50,
    y: currentY - 32,
    size: 9.5,
    font: fontRegular,
    color: darkNavy,
  });

  page.drawText('3altayer.app (C) 2026 - Official Financial Feasibility Report', {
    x: 170,
    y: 30,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '3altayer_financial_budget_study.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Budget Study PDF created at: ${outputPath}`);
}

createBudgetStudyPdf().catch(console.error);
