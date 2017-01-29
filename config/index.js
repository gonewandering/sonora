module.exports = {
  redis: {
    host: '127.0.0.1',
    port: 6379,
    ns: 'rsmq'
  },
  hapi: {
    port: 8002,
    host: '0.0.0.0',
    cors: true,
    routes: {
        cors: true
    }
  }
}
