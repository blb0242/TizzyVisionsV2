const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://tizzy-visions-v2.herokuapp.com/',
      changeOrigin: true,
    })
  );
};