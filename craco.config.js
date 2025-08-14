module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Configure source maps properly
      webpackConfig.devtool = 'source-map';
      
      // Remove source-map-loader to avoid malformed source map issues
      webpackConfig.module.rules = webpackConfig.module.rules.map(rule => {
        if (rule.enforce === 'pre' && rule.use) {
          rule.use = rule.use.filter(useItem => {
            return !(useItem.loader && useItem.loader.includes('source-map-loader'));
          });
        }
        return rule;
      }).filter(rule => {
        // Remove empty pre-loader rules
        return !(rule.enforce === 'pre' && (!rule.use || rule.use.length === 0));
      });
      
      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    // Override deprecated middleware options
    delete devServerConfig.onBeforeSetupMiddleware;
    delete devServerConfig.onAfterSetupMiddleware;
    
    // Use the new setupMiddlewares option if not already present
    if (!devServerConfig.setupMiddlewares) {
      devServerConfig.setupMiddlewares = (middlewares) => {
        // Custom middleware setup logic here if needed
        return middlewares;
      };
    }
    
    return devServerConfig;
  },
};