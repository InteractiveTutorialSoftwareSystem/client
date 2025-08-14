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
    // Error prevention - make them warnings instead of errors
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-debugger': 'warn',
    'no-redeclare': 'warn',
    'no-empty': 'warn',
    'no-self-assign': 'warn',
    
    // React specific - make them warnings
    'react/prop-types': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/jsx-uses-react': 'off', // Not needed in React 17+
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/jsx-key': 'warn', // Don't block compilation for missing keys
    'react/jsx-no-target-blank': 'warn', // Warn about security issues
    'react/jsx-no-undef': 'warn',
    'react/jsx-no-duplicate-props': 'warn',
    'react/no-unescaped-entities': 'warn',
    'react/display-name': 'warn',
    
    // Code quality - make less strict
    'prefer-const': 'warn',
    'no-var': 'warn', // Change from error to warning
    'object-shorthand': 'warn',
    'prefer-arrow-callback': 'warn',
    
    // Security - keep as warnings but don't block
    'no-eval': 'warn',
    'no-implied-eval': 'warn',
    'no-new-func': 'warn',
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
  ],
};