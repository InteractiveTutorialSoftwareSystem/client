# Interactive Tutorial System (Frontend)

[![Production Ready](https://img.shields.io/badge/Production-Ready-green.svg)](https://github.com/InteractiveTutorialSoftwareSystem/client)
[![ESLint](https://img.shields.io/badge/ESLint-Configured-blue.svg)](https://github.com/InteractiveTutorialSoftwareSystem/client)
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)](https://reactjs.org/)

## Table of Contents
1. [Introduction](#introduction)
2. [Latest Updates](#latest-updates)
3. [Technologies Required](#technologies-required)
4. [Fresh Installation](#fresh-installation)
5. [Development](#development)
6. [Production Deployment](#production-deployment)
7. [Code Quality](#code-quality)
8. [Troubleshooting](#troubleshooting)
9. [References](#references)

## Introduction
This repository contains the frontend React application for the Interactive Tutorial System (ITSS) project. The system provides an interactive web-based authoring and playback environment for programming tutorials.

**Backend Repository:** [InteractiveTutorialSoftwareSystem/server](https://github.com/InteractiveTutorialSoftwareSystem/server)

## Latest Updates

### 🚀 Production Ready (August 2024)
- ✅ **Security Fixes**: All critical ESLint security issues resolved
- ✅ **Production Build**: Optimized build configuration with zero errors
- ✅ **Code Quality**: 75+ files improved with modern JavaScript practices
- ✅ **Environment Configuration**: Separate development and production configs

### 🔧 Technical Improvements
- **ESLint Configuration**: Production-ready linting with strict security rules
- **Modern JavaScript**: Migrated from React imports to React 17+ syntax
- **Build Optimization**: Enhanced Craco configuration for production builds
- **Input Validation**: Comprehensive security improvements
- **Code Formatting**: Prettier configuration for consistent code style

## Technologies Required

### Core Requirements
- **Node.js**: >= 16.0.0 (LTS recommended)
- **npm**: >= 8.0.0 (comes with Node.js)
- **Git**: Latest version

### Additional Tools (Optional)
- **VS Code**: Recommended IDE with ESLint and Prettier extensions
- **Chrome DevTools**: For debugging and development

### Version Check
```bash
node --version    # Should be >= 16.0.0
npm --version     # Should be >= 8.0.0
git --version     # Any recent version
```

## Fresh Installation

### 1. Clone Repository
```bash
git clone https://github.com/InteractiveTutorialSoftwareSystem/client.git
cd client
```

### 2. Install Dependencies
```bash
# Install all project dependencies
npm install

# Optional: Clean install if you encounter issues
npm ci
```

### 3. Environment Configuration

#### Development Environment
Create a `.env` file in the root directory:
```env
# Backend API URLs
REACT_APP_AUTH_URL=http://localhost:5001
REACT_APP_TUTORIAL_URL=http://localhost:5002

# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id

# Stack Exchange API
REACT_APP_STACKEXCHANGE_KEY=your-stackexchange-key

# Development Settings
GENERATE_SOURCEMAP=false
ESLINT_NO_DEV_ERRORS=true
```

#### Production Environment
For production deployment, use `.env.production`:
```env
# Production API URLs
REACT_APP_AUTH_URL=https://your-production-auth-api.com
REACT_APP_TUTORIAL_URL=https://your-production-tutorial-api.com

# Production OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your-production-google-client-id
REACT_APP_STACKEXCHANGE_KEY=your-production-stackexchange-key

# Production Settings
GENERATE_SOURCEMAP=false
ESLINT_NO_DEV_ERRORS=false
NODE_ENV=production
```

### 4. API Configuration

#### Google OAuth Setup
1. Go to [Google API Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Configure authorized origins:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`

#### Stack Exchange API
1. Visit [Stack Apps](https://stackapps.com/apps/oauth/register)
2. Register your application
3. Obtain your API key

### 5. Backend Setup
Ensure the backend server is running:
```bash
# In a separate terminal, clone and run the server
git clone https://github.com/InteractiveTutorialSoftwareSystem/server.git
cd server
# Follow server README instructions
```

## Development

### Start Development Server
```bash
npm start
```
- Opens browser at `http://localhost:3000`
- Hot reload enabled
- Development ESLint rules (lenient)

### Available Scripts
```bash
npm start              # Start development server
npm run build          # Build for production
npm test               # Run test suite
npm run lint:check     # Check ESLint issues (development)
npm run lint:fix       # Auto-fix ESLint issues (development)
npm run lint:prod      # Check production ESLint rules
npm run lint:prod:fix  # Auto-fix production issues
```

## Production Deployment

### Build for Production
```bash
# Create optimized production build
npm run build

# Test production build locally (optional)
npx serve -s build
```

### Pre-deployment Checklist
1. **Run production linting**:
   ```bash
   npm run lint:prod
   ```

2. **Verify build succeeds**:
   ```bash
   npm run build
   ```

3. **Test functionality**:
   - Authentication flow
   - Tutorial creation and playback
   - File upload/download

4. **Security verification**:
   - No console.log statements in production
   - All ESLint security rules passing
   - Environment variables properly configured

### Deployment Options

#### Static Hosting (Netlify, Vercel, etc.)
```bash
# Build command
npm run build

# Publish directory
build/
```

#### Docker Deployment
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build"]
```

## Code Quality

### ESLint Configuration
- **Development**: Lenient rules in `.eslintrc.js`
- **Production**: Strict security rules in `.eslintrc.production.js`

### Code Standards
- **Modern JavaScript**: ES6+ features, const/let over var
- **React Best Practices**: Hooks, functional components
- **Security**: No eval(), secure external links
- **Performance**: Optimized imports, code splitting

### Contributing Guidelines
1. Run `npm run lint:fix` before committing
2. Ensure `npm run build` succeeds
3. Follow existing code patterns
4. Add JSDoc comments for complex functions
5. Test on both development and production builds

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear npm cache
npm cache clean --force
```

#### ESLint Errors
```bash
# Check development rules
npm run lint:check

# Auto-fix issues
npm run lint:fix

# Check production readiness
npm run lint:prod
```

#### Environment Issues
- Verify `.env` file exists and has correct values
- Check API endpoints are accessible
- Ensure backend server is running
- Validate Google OAuth configuration

#### Port Conflicts
```bash
# If port 3000 is in use
PORT=3001 npm start
```

### Getting Help
1. Check [Issues](https://github.com/InteractiveTutorialSoftwareSystem/client/issues)
2. Review [Production ESLint Guide](./PRODUCTION_ESLINT_GUIDE.md)
3. Ensure backend server is properly configured

## Performance Optimization

### Production Performance
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Unused code elimination
- **Minification**: Optimized bundle size
- **Source Maps**: Disabled in production for security

### Development Performance
- **Fast Refresh**: Hot reloading for React components
- **ESLint**: Development rules for faster iteration
- **Source Maps**: Enabled for debugging

## Security Features

### Implemented Security Measures
- ✅ **Input Validation**: All user inputs properly sanitized
- ✅ **XSS Prevention**: No dangerous innerHTML usage
- ✅ **CSRF Protection**: Secure external links with rel="noreferrer"
- ✅ **Code Injection**: All eval() usage eliminated
- ✅ **Production Hardening**: Console statements removed

### Security Best Practices
- Environment variables for sensitive configuration
- Secure HTTP headers in production
- Regular dependency updates
- ESLint security rules enforcement

## References
Ouh, Eng Lieh, Benjamin Kok Siew Gan, and David Lo. "ITSS: Interactive Web-Based Authoring and Playback Integrated Environment for Programming Tutorials." Proceedings of the 2022 ACM Conference on International Computing Education Research-Volume 1. 2022.
[📄 Research Paper](https://dl.acm.org/doi/10.1145/3510456.3514142)

---

**Repository**: [InteractiveTutorialSoftwareSystem/client](https://github.com/InteractiveTutorialSoftwareSystem/client)  
**License**: [MIT](LICENSE)  
**Maintained by**: Interactive Tutorial Software System Team