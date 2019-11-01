require('dotenv').config()
const express = require('express');
const path = require('path');
const app = express();
const proxy = require('http-proxy-middleware');
const log = require('log4js')
const logger = log.getLogger('client-proxy')

const { API_HOST = 'localhost', API_PORT = 5001, PORT = 5000 } = process.env
app.use(express.static(path.join(__dirname, 'build')));

app.use(
  proxy('/api', {
    target: `http://${API_HOST}:${API_PORT}`
  })
);

app.get('/health', (req, res) => {
  res.json({ ok: true });
});

app.get('/health-check', (req, res) => {
  res.json({ ok: true });
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


app.listen(PORT, () => {
  logger.info(`client-proxy listening on port: ${PORT}`)
});