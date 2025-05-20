
// This is a helper script to copy the WASM files to the public directory
// You can run this with Node.js after installing the swisseph-wasm package
const fs = require('fs');
const path = require('path');

const sourceWasmPath = path.resolve(__dirname, '../node_modules/swisseph-wasm/dist/swisseph-wasm.wasm');
const targetWasmPath = path.resolve(__dirname, 'node_modules/swisseph-wasm/dist/swisseph-wasm.wasm');

// Create directories if they don't exist
fs.mkdirSync(path.dirname(targetWasmPath), { recursive: true });

// Copy the WASM file
fs.copyFileSync(sourceWasmPath, targetWasmPath);

console.log('WASM file copied successfully to', targetWasmPath);
