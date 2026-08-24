const fs = require('fs');
const path = require('path');
const { PDFDocument, rgb, StandardFonts } = require('pdf-lib');

async function createBuyingGuidePdf() {
  const pdfDoc = await PDFDocument.create();
  
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let page = pdfDoc.addPage([595.28, 841.89]);
  const { width, height } = page.getSize();

  const primaryOrange = rgb(0.917, 0.345, 0.047);
  const darkNavy = rgb(0.058, 0.09, 0.164);
  const textDark = rgb(0.15, 0.2, 0.28);
  const emeraldGreen = rgb(0.063, 0.725, 0.506);

  // Banner
  page.drawRectangle({
    x: 35,
    y: height - 120,
    width: width - 70,
    height: 75,
    color: rgb(0.96, 0.98, 1),
    borderColor: darkNavy,
    borderWidth: 1.5,
  });

  page.drawText('3altayer.app - Step-by-Step Production Procurement & Setup Guide', {
    x: 55,
    y: height - 80,
    size: 14,
    font: fontBold,
    color: darkNavy,
  });

  page.drawText('Exact Platforms, Providers, URLs & Actionable Instructions to Go Live (Egypt Market)', {
    x: 55,
    y: height - 100,
    size: 9,
    font: fontRegular,
    color: primaryOrange,
  });

  let currentY = height - 150;

  function drawHeading(title) {
    page.drawText(title, {
      x: 35,
      y: currentY,
      size: 11.5,
      font: fontBold,
      color: primaryOrange,
    });
    currentY -= 16;
  }

  function drawStep(title, provider, url, cost, action) {
    page.drawText(`* ${title}`, {
      x: 45,
      y: currentY,
      size: 9,
      font: fontBold,
      color: darkNavy,
    });
    currentY -= 13;

    page.drawText(`  Where to Buy: ${provider} (${url}) | Cost: ${cost}`, {
      x: 50,
      y: currentY,
      size: 8.5,
      font: fontRegular,
      color: primaryOrange,
    });
    currentY -= 13;

    page.drawText(`  Action: ${action}`, {
      x: 50,
      y: currentY,
      size: 8.5,
      font: fontRegular,
      color: textDark,
    });
    currentY -= 15;
  }

  // 1. Domain
  drawHeading('1. Domain Registration (Official Brand URL)');
  drawStep(
    'Custom Domain Name (3altayer.app / 3altayer.com)',
    'Namecheap or GoDaddy',
    'www.namecheap.com',
    '~12$ - 15$ / year',
    'Search domain, purchase with card, enable free Whois privacy protection.'
  );

  // 2. Cloud Server
  drawHeading('2. Cloud VPS Server Infrastructure');
  drawStep(
    'Linux Cloud VPS (4 vCPU / 8-16 GB RAM / Ubuntu 24.04 LTS)',
    'Hetzner Cloud (Recommended) or DigitalOcean',
    'www.hetzner.com / www.digitalocean.com',
    '~16 - 24 EUR/month (~850 - 1,250 EGP)',
    'Sign up, create a CPX31 cloud server in Germany/Finland (lowest latency to Cairo), and install Docker.'
  );

  // 3. App Stores
  drawHeading('3. App Store Developer Publishing Accounts');
  drawStep(
    'Google Play Console (Android App Distribution)',
    'Google Play Developer Console',
    'play.google.com/console/signup',
    '25$ (One-time lifetime)',
    'Sign in with company Gmail, complete identity verification, and pay one-time fee.'
  );
  drawStep(
    'Apple Developer Program (iOS App Distribution)',
    'Apple Developer Center',
    'developer.apple.com/programs/enroll',
    '99$ / year',
    'Enroll with Apple ID on iPhone/Mac, complete verification, and pay annual fee.'
  );

  // 4. SMS & Third-Party APIs
  drawHeading('4. SMS Gateway & Maps API Services in Egypt');
  drawStep(
    'SMS OTP Verification Gateway for Egypt Numbers',
    'SMS Misr or VictoryLink or Taqnyat',
    'www.smsmisr.com / www.victorylink.com',
    '~0.35 EGP / SMS (Pay as you go via Fawry / InstaPay)',
    'Create account, recharge 500 EGP bundle, and get Sender ID & API Key.'
  );
  drawStep(
    'Google Maps Platform (Maps SDK, Places & Geocoding)',
    'Google Cloud Console',
    'console.cloud.google.com',
    '0$ (Covered by Google 200$ monthly free tier)',
    'Create project, enable Maps SDK for Android & iOS, enable Places API, and copy API Key.'
  );
  drawStep(
    'Cloud Security, DNS & CDN',
    'Cloudflare',
    'www.cloudflare.com',
    'FREE ($0)',
    'Add domain, point Namecheap Nameservers to Cloudflare for automatic DDoS protection & SSL.'
  );

  currentY -= 15;

  // Bottom Box
  page.drawRectangle({
    x: 35,
    y: currentY - 45,
    width: width - 70,
    height: 45,
    color: rgb(0.94, 0.99, 0.96),
    borderColor: emeraldGreen,
    borderWidth: 1.5,
  });

  page.drawText('All API Keys and Server IPs will be dropped directly into the .env file in 1 minute.', {
    x: 50,
    y: currentY - 18,
    size: 9,
    font: fontBold,
    color: emeraldGreen,
  });

  page.drawText('3altayer.app (C) 2026 - Production Procurement Guide | Cairo, Egypt', {
    x: 160,
    y: 25,
    size: 8,
    font: fontRegular,
    color: rgb(0.5, 0.5, 0.5),
  });

  const pdfBytes = await pdfDoc.save();
  const outputPath = path.join(__dirname, '3altayer_buying_guide.pdf');
  fs.writeFileSync(outputPath, pdfBytes);
  console.log(`Buying Guide PDF created at: ${outputPath}`);
}

createBuyingGuidePdf().catch(console.error);
