const fs = require('fs');

const scriptContent = fs.readFileSync('d:\\3altayer.app\\script_3.txt', 'utf8');

// Match all string parts inside parts array e.g. "parts":["..."] or content
let messages = [];

// Match "parts":["..."]
const partsRegex = /"parts":\s*\["(.*?)"\]/gs;
let m;
while ((m = partsRegex.exec(scriptContent)) !== null) {
  let text = m[1];
  text = text.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
  text = text.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
  if (text.trim().length > 10) {
    messages.push(text.trim());
  }
}

// If parts not found, let's search for "content":{"content_type":"text","parts":[...]}
if (messages.length === 0) {
  const genericTextRegex = /"text":\s*"((?:\\.|[^"\\])*)"/g;
  while ((m = genericTextRegex.exec(scriptContent)) !== null) {
    let text = m[1];
    text = text.replace(/\\n/g, '\n').replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    text = text.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => String.fromCharCode(parseInt(grp, 16)));
    if (text.trim().length > 20) {
      messages.push(text.trim());
    }
  }
}

fs.writeFileSync('d:\\3altayer.app\\chatgpt_extracted_document.md', messages.join('\n\n---\n\n'), 'utf8');
console.log(`Extracted ${messages.length} messages into d:\\3altayer.app\\chatgpt_extracted_document.md`);
