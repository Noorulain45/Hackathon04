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
            let modified = false;

            const sRegex = /'http:\/\/localhost:5000([^']*)'/g;
            if(sRegex.test(content)) {
                content = content.replace(sRegex, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
                modified = true;
            }

            const dRegex = /"http:\/\/localhost:5000([^"]*)"/g;
            if(dRegex.test(content)) {
                content = content.replace(dRegex, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
                modified = true;
            }

            const bRegex = /`http:\/\/localhost:5000([^`]*)`/g;
            if (bRegex.test(content)) {
                content = content.replace(bRegex, '`${import.meta.env.VITE_API_URL || "http://localhost:5000"}$1`');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log('Updated:', fullPath);
            }
        }
    }
}

processDir(dir);
