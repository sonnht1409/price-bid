require('dotenv').config()
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
const route = require('./routes')
const log = require("log4js")
const logger = log.getLogger('bid-price-proxy')
logger.level = 'debug'
const port = process.env.API_PORT || 5001

const jaeger = require('./libs/jaeger');
const JaegerMiddleware = require('./middlewares/jaeger/');
const jaegerMiddleware = new JaegerMiddleware(jaeger);

app.use(jaegerMiddleware.createSpanAfterReceivedRequest, jaegerMiddleware.handleLogBeforeResponse);
app.use(bodyParser.json({ limit: '100mb' }))

app.use('/api', route)

app.get('/health', (req, res) => {
  res.json({ ok: true });
});


app.listen(port, () => {
  logger.info(`listening on port: ${port}`)
})