const logger = require("log4js").getLogger("jaeger-middleware")
const { FORMAT_HTTP_HEADERS } = require("opentracing")
const { tagObject } = require("./helper")

class JaegerMiddleware {
  constructor(jaeger) {
    this._jaeger = jaeger
    this.handleLogBeforeResponse = this.handleLogBeforeResponse.bind(this)
    this.jaegerLog = this.jaegerLog.bind(this)
    this.createSpanAfterReceivedRequest = this.createSpanAfterReceivedRequest.bind(this)
  }

  createSpanAfterReceivedRequest(req, res, next) {
    const parentSpan = this._jaeger.extract(FORMAT_HTTP_HEADERS, req.headers)
    const span = parentSpan ? this._jaeger.startSpan(`${req.originalUrl}`, {
      childOf: parentSpan
    }) : this._jaeger.startSpan(`${req.originalUrl}`)
    req.span = span;
    next()
  }

  handleLogBeforeResponse(req, res, next) {
    let send = res.send;
    const resClone = res;
    // overwrite send method
    res.send = (resBody) => {
      logger.info("request body before send back", resBody)
      res.resBody = resBody;
      this.jaegerLog(req, res)
      send.call(resClone, resBody)
      return resClone;
    }
    next()
  }

  jaegerLog(req, res) {
    tagObject(req.span, req.query)
    tagObject(req.span, req.params)
    tagObject(req.span, req.body)
    const span = this._jaeger.startSpan("jaeger-middleware", {
      childOf: req.span
    })
    const requestInfo = {
      path: req.path,
      body: req.body,
      query: req.query,
      params: req.params
    }

    const responseInfo = {
      body: JSON.parse(res.resBody)
    }
    span.log({ requestInfo })
    span.log({ responseInfo })
    logger.info("requestInfo", JSON.stringify(requestInfo, null, 2))
    logger.info("responseInfo", JSON.stringify(responseInfo, null, 2))
    span.finish()
    req.span.finish();
  }
}

module.exports = JaegerMiddleware;
