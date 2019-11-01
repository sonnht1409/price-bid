const Router = require('express').Router;
const router = Router()
const axios = require('axios')
const log = require("log4js")
const logger = log.getLogger('crm-server-router')
logger.level = 'debug'


router.get('/health', (req, res) => {
  res.json({ ok: true });
});
module.exports = router;