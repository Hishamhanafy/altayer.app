const fs = require('fs');

const srcPath = 'C:\\Users\\administrator.SALAMTECH\\.gemini\\antigravity\\brain\\c933c55d-07c0-4d91-91af-19f31b299363\\.system_generated\\steps\\1559\\content.md';
const raw = fs.readFileSync(srcPath, 'utf8');

// Match JSON object with "mapping" or messages
let textOutput = [];

try {
  // Let's find scripts containing conversation data
  const jsonMatches = raw.match(/\{"linear_conversation":\[.*?\]\}/s) || raw.match(/\{"title":.*?\}\<\/script\>/gs);
  
  // Extract all text inside markdown or message blocks
  const re = /"text":\s*"([^"]+)"/g;
  let m;
  while ((m = re.exec(raw)) !== null) {
    let unescaped = m[1].replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    // Unicode unescape
    unescaped = unescaped.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
    if (unescaped.length > 20 && !textOutput.includes(unescaped)) {
      textOutput.push(unescaped);
    }
  }
} catch (e) {
  console.error(e);
}

fs.writeFileSync('d:\\3altayer.app\\chatgpt_study_clean.txt', textOutput.join('\n\n====================\n\n'), 'utf8');
console.log(`Saved ${textOutput.length} clean text parts to d:\\3altayer.app\\chatgpt_study_clean.txt`);
