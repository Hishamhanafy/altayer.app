const fs = require('fs');

const raw = fs.readFileSync('d:\\3altayer.app\\script_3.txt', 'utf8');

// The script tag format is usually: window.__remixContext = {...}; or JSON.parse(...)
let jsonStart = raw.indexOf('{');
let jsonEnd = raw.lastIndexOf('}');

if (jsonStart !== -1 && jsonEnd !== -1) {
  const jsonStr = raw.substring(jsonStart, jsonEnd + 1);
  try {
    const data = JSON.parse(jsonStr);
    console.log('Successfully parsed JSON!');
    fs.writeFileSync('d:\\3altayer.app\\parsed_data.json', JSON.stringify(data, null, 2), 'utf8');
  } catch (e) {
    console.log('JSON.parse failed, let search with recursive string matcher:', e.message);
    // Find all unicode escaped sequences
    let allArabic = [];
    const re = /(?:\\u[0-9a-fA-F]{4}){3,}/g;
    let m;
    while ((m = re.exec(raw)) !== null) {
      let decoded = m[0].replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
      if (decoded.length > 20 && !allArabic.includes(decoded)) {
        allArabic.push(decoded);
      }
    }
    console.log(`Found ${allArabic.length} decoded Arabic segments!`);
    fs.writeFileSync('d:\\3altayer.app\\chatgpt_study_decoded.txt', allArabic.join('\n\n---\n\n'), 'utf8');
  }
}
