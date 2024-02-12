   // .mocharc.js
   module.exports = {
    require: 'ts-node/register', // Use ts-node to run TypeScript files
    spec: 'tests/**/get.test.ts',  // Your test files pattern
    // ... other configurations
  };