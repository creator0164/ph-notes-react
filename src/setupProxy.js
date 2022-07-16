const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://ph-notes.herokuapp.com',
      changeOrigin: true,
    })
  );
};
