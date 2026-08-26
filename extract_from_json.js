const fs = require('fs');

const data = JSON.parse(fs.readFileSync('d:\\3altayer.app\\parsed_data.json', 'utf8'));

// Function to recursively find all text in the object
let texts = [];

function findTexts(obj) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.length > 20 && /[\u0600-\u06FF]/.test(obj)) {
      texts.push(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(findTexts);
  } else if (typeof obj === 'object') {
    for (let key in obj) {
      findTexts(obj[key]);
    }
  }
}

findTexts(data);

// Remove duplicates while preserving order
const uniqueTexts = [];
const seen = new Set();

for (const t of texts) {
  const trimmed = t.trim();
  if (!seen.has(trimmed) && trimmed.length > 25) {
    seen.add(trimmed);
    uniqueTexts.push(trimmed);
  }
}

fs.writeFileSync('d:\\3altayer.app\\chatgpt_study_full_arabic.md', uniqueTexts.join('\n\n---\n\n'), 'utf8');
console.log(`Successfully extracted ${uniqueTexts.length} Arabic content blocks into d:\\3altayer.app\\chatgpt_study_full_arabic.md!`);
