const Notification = require('./src');


exports.register = (config , withRequest = true) => Notification(config , withRequest)
