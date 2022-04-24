const MailChannel = require('./channels/mailChannel');
const NotificationHandler = require("./notificationHandler");


/**
 * Register A Notify method for send notification
 * @param {object} config
 * @returns {function} return middleware
 */

module.exports = ({config, channels} , withRequest = true) => {

    if (typeof config != 'object')
        throw new Error('you must set conifg as object')

    /**
     * LIST OF CHANNELS THAT NOTIFICATION CAN SEND
     * And Merge Default Channels with Custom Channels
     */
    channels = {
        mail: MailChannel,
        ...channels
    }

    /**
     * the user data for send notification
     * @param notification
     */
    const notifyHandler = (notification) => (new NotificationHandler(config, notification)).setChannels(channels).handle()

    if(withRequest)
        return (req, res, next) => {// set notify handler
            res.notify = notifyHandler;
            next();
        }

    return notifyHandler;
}

