const { initTracer } = require('jaeger-client');

const config = {
  serviceName: 'bid-price',
  reporter: {
    name: 'bid-price-reporter',
    logSpans: true,
    agentHost: process.env.JAEGER_AGENT_HOST || 'localhost',
    agentPort: process.env.JAEGER_AGENT_PORT || 6832
  },
  sampler: {
    type: 'const',
    param: 1.0
  }
};
const options = {
  tags: {
    'service': 'bid-price',
    'version': process.env.npm_package_version || '1.0.0',
  }
};

module.exports = initTracer(config, options);