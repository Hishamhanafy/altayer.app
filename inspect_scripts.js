const fs = require('fs');

const srcPath = 'C:\\Users\\administrator.SALAMTECH\\.gemini\\antigravity\\brain\\c933c55d-07c0-4d91-91af-19f31b299363\\.system_generated\\steps\\1559\\content.md';
const raw = fs.readFileSync(srcPath, 'utf8');

const scriptMatches = raw.match(/<script[^>]*>(.*?)<\/script>/gs) || [];
console.log(`Found ${scriptMatches.length} script tags`);

for (let i = 0; i < scriptMatches.length; i++) {
  const s = scriptMatches[i];
  if (s.includes('BUS') || s.includes('تحليل') || s.includes('linear_conversation') || s.includes('serverResponse')) {
    console.log(`Script ${i} has keywords! Length: ${s.length}`);
    fs.writeFileSync(`d:\\3altayer.app\\script_${i}.txt`, s, 'utf8');
  }
}
