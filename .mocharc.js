   // .mocharc.js
   module.exports = {
    require: 'ts-node/register', // Use ts-node to run TypeScript files
    spec: 'tests/**/search.test.ts',  // Your test files pattern
    // ... other configurations
  };