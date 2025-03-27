const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const vhost = require('vhost');

const app = express();
const PORT = process.env.PORT || 3000;

// إعداد النطاق الرئيسي salink.me
const mainApp = express();
mainApp.use(createProxyMiddleware({
  target: 'http://localhost:5173',
  changeOrigin: true,
  ws: true,
}));

// إعداد النطاق الفرعي help.salink.me
const helpApp = express();
helpApp.use(createProxyMiddleware({
  target: 'http://localhost:5173/help',
  changeOrigin: true,
  pathRewrite: {
    '^/': '/'
  }
}));

// توجيه الطلبات حسب النطاق
app.use(vhost('salink.me', mainApp));
app.use(vhost('help.salink.me', helpApp));

// تشغيل الخادم
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Main site: http://salink.me:3000');
  console.log('Help site: http://help.salink.me:3000');
});

// إضافة النطاقات إلى ملف hosts المحلي
console.log('\nIMPORTANT: Add the following lines to your hosts file:');
console.log('127.0.0.1 salink.me');
console.log('127.0.0.1 help.salink.me');
