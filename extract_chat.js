const fs = require('fs');
const path = require('path');

const srcPath = 'C:\\Users\\administrator.SALAMTECH\\.gemini\\antigravity\\brain\\c933c55d-07c0-4d91-91af-19f31b299363\\.system_generated\\steps\\1559\\content.md';
const content = fs.readFileSync(srcPath, 'utf8');

// Match all JSON objects or text blocks embedded in next data or html
let extracted = [];

// Regex to capture arabic blocks
const arabicRegex = /[\u0600-\u06FF][\u0600-\u06FF\s0-9%.,:;()!?"'«»\-—\n]{15,}/g;
let match;
while ((match = arabicRegex.exec(content)) !== null) {
  const clean = match[0].replace(/\s+/g, ' ').trim();
  if (clean.length > 25 && !extracted.includes(clean)) {
    extracted.push(clean);
  }
}

const outPath = path.join('d:', '3altayer.app', 'bus14_analysis_extracted.txt');
fs.writeFileSync(outPath, extracted.join('\n\n---\n\n'), 'utf8');
console.log(`Extracted ${extracted.length} Arabic sections to ${outPath}`);
