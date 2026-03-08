const fs = require('fs');
const file = 'src/app/llm-info/page.tsx';
let txt = fs.readFileSync(file, 'utf8');

const searchStart = '\`# About Markdown Preview Live';
const startIdx = txt.indexOf(searchStart);

if (startIdx !== -1) {
    const endStr = '}\n              </code>';
    const endIdx = txt.lastIndexOf(endStr);
    
    if (endIdx !== -1) {
        let before = txt.slice(0, startIdx + 1);
        let endBacktickIdx = txt.lastIndexOf('\`', endIdx);
        
        let middle = txt.slice(startIdx + 1, endBacktickIdx);
        let after = txt.slice(endBacktickIdx);
        
        // Escape backslashes, backticks, and dollar signs
        middle = middle.replace(/\\/g, '\\\\').replace(/\`/g, '\\`').replace(/\$/g, '\\$');
        
        fs.writeFileSync(file, before + middle + after, 'utf8');
        console.log('Successfully escaped backticks in page.tsx');
    } else {
        console.log('End marker not found');
    }
} else {
    console.log('Start marker not found');
}
