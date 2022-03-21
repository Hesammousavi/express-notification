const MailChannel = require('./channels/mailChannel');


/**
 * Register A Notify method for send notification
 * @param {object} config
 * @returns {function} return middleware
 */

module.exports = ({ config , channels }) => {

  if(typeof config != 'object')
    throw new Error('you must set conifg as object')

  /**
   * LIST OF CHANNELS THAT NOTIFICATION CAN SEND
   * And Merge Default Channels with Custom Channels
   */
   channels = {
     mail : MailChannel,
     ...channels
   }

  /**
   * the user data for send notification
   * @param notifiable
   * @param notification
   */
  const notifyHandler = async (notifiable, notification) => {
    // get channels that notification must send to them
    let channelsMustBeNotify = notification.via();

    // notify to notifiable with different channels
    for (const channel of channelsMustBeNotify) {
      await channelToNotify(channel , { notifiable, notification });
    }
  }

  const channelToNotify = async (channel , { notifiable, notification }) => {
    // check channel exists in global channels list
    if(channels[channel])
      await (new channels[channel](config)).send(notifiable , notification);
  }

  return (req , res , next) => {
    // set notify handler
    res.notify = notifyHandler;
    next();
  }
}

