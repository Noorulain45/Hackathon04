const fs = require('fs');
const path = require('path');

const dir = 'frontend/src';

function processDir(directory) {
    const files = fs.readdirSync(directory, { withFileTypes: true });
    for (const file of files) {
        const fullPath = path.join(directory, file.name);
        if (file.isDirectory()) {
            processDir(fullPath);
        } else if (file.isFile() && fullPath.endsWith('.jsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('http://localhost:5000')) {
                // Replace string literal 'http://localhost:5000' with a variable expression
                // We use template literals or replace the exact string "http://localhost:5000" and 'http://localhost:5000'
                content = content.replace(/"http:\/\/localhost:5000"/g, '(import.meta.env.VITE_API_URL || "http://localhost:5000")');
                content = content.replace(/'http:\/\/localhost:5000'/g, '(import.meta.env.VITE_API_URL || "http://localhost:5000")');
                
                // Also handle cases where it's part of a template string like `http://localhost:5000/api...`
                content = content.replace(/`http:\/\/localhost:5000/g, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}');

                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated:', fullPath);
            }
        }
    }
}

processDir(dir);
console.log('Done replacing URLs');
