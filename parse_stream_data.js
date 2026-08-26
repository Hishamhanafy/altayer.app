const fs = require('fs');

const raw = fs.readFileSync('d:\\3altayer.app\\stream_data.txt', 'utf8');

// In React Router streamController enqueue, string is JSON encoded
// Let's find all strings in the chunk
const matches = raw.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g) || [];

let allDecoded = [];

for (const m of matches) {
  try {
    const unquoted = JSON.parse(m);
    if (typeof unquoted === 'string' && unquoted.length > 15 && /[\u0600-\u06FF]/.test(unquoted)) {
      allDecoded.push(unquoted);
    }
  } catch (e) {}
}

fs.writeFileSync('d:\\3altayer.app\\bus14_analysis_complete.md', allDecoded.join('\n\n---\n\n'), 'utf8');
console.log(`Extracted ${allDecoded.length} decoded Arabic sections!`);
