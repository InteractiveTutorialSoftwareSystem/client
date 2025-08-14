module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    // PRODUCTION: Security rules are ERRORS - must be fixed before deployment
    'no-eval': 'error',
    'no-implied-eval': 'error', 
    'no-new-func': 'error',
    'no-script-url': 'error',
    'no-alert': 'error',
    'no-console': 'error', // Remove console logs in production
    'no-debugger': 'error', // Remove debugger statements in production
    
    // PRODUCTION: React security - must be fixed
    'react/jsx-no-target-blank': 'error', // Security: prevent window.opener attacks
    'react/no-danger': 'error', // Prevent dangerous innerHTML usage
    
    // PRODUCTION: Code quality - errors that indicate real problems
    'no-unused-vars': 'error', // Unused variables indicate dead code
    'no-undef': 'error', // Undefined variables cause runtime errors
    'no-redeclare': 'error', // Variable redeclaration causes confusion
    'react/jsx-key': 'error', // Missing keys cause React performance issues
    'react/jsx-no-undef': 'error', // Undefined components cause crashes
    'react/jsx-no-duplicate-props': 'error', // Duplicate props cause unexpected behavior
    'react/no-unescaped-entities': 'error', // Unescaped entities cause rendering issues
    
    // PRODUCTION: Allow controlled flexibility for existing codebase
    'no-var': 'warn', // Gradually migrate to let/const
    'prefer-const': 'warn', // Suggest const where appropriate
    'object-shorthand': 'warn', // Modern JS syntax suggestions
    'prefer-arrow-callback': 'warn',
    
    // PRODUCTION: React best practices - warnings for gradual improvement
    'react/prop-types': 'warn', // Type checking suggestions
    'react/display-name': 'warn', // Component naming suggestions
    'react/no-unused-prop-types': 'warn',
    
    // PRODUCTION: Disable rules that are too restrictive for existing codebase
    'react/jsx-uses-react': 'off', // Not needed in React 17+
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    
    // PRODUCTION: Code structure - warnings for maintenance
    'no-empty': 'warn', // Empty blocks should have comments
    'no-self-assign': 'warn', // Self-assignment is usually a mistake
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  ignorePatterns: [
    'build/',
    'node_modules/',
    '*.min.js',
    'dist/',
    'coverage/',
  ],
};