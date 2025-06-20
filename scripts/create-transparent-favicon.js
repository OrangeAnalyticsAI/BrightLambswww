const fs = require('fs');
const path = require('path');

// A 1x1 transparent PNG in base64
const transparentPng = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

const outputPath = path.join(__dirname, '..', 'public', 'favicon.png');
const buffer = Buffer.from(transparentPng, 'base64');

fs.writeFileSync(outputPath, buffer);
console.log('Created transparent favicon.png');
