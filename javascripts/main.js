const events = require('./events');
const apiKeys = require('./apiKeys');

events.bindEvents();
apiKeys.retrieveKeys();
