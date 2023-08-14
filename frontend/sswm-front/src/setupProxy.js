const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i9a206.p.ssafy.io',
      changeOrigin: true,
    })
  );
};