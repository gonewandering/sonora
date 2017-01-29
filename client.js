var queue = require('./helpers/queue');

queue.add({
  service: 'spotify',
  search: 'blink 182'
}).then(function () {
  process.exit();
})
