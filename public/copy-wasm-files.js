
// This is a helper script to copy the WASM files to the public directory
// You can run this with Node.js after installing the swisseph-wasm package
const fs = require('fs');
const path = require('path');

const sourceWasmPath = path.resolve(__dirname, '../node_modules/swisseph-wasm/dist/swisseph-wasm.wasm');
const targetWasmPath = path.resolve(__dirname, 'swisseph-wasm.wasm');

// Copy the WASM file
try {
  fs.copyFileSync(sourceWasmPath, targetWasmPath);
  console.log('WASM file copied successfully to', targetWasmPath);
} catch (err) {
  console.error('Error copying WASM file:', err);
  console.log('Please make sure swisseph-wasm package is installed.');
  console.log('You can install it with: npm install swisseph-wasm');
  console.log('The application will use a mock implementation until the actual WASM file is available.');
}
