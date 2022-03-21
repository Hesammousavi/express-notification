const nodemailer = require('nodemailer')

class MailChannel {
  // init MailChannel 
  constructor (config) {
    // check mail config is exsits in config
    if(! ('mail' in config)) {
      throw new Error('mail config is mixing')
    }

    this.transporter = nodemailer.createTransport(config.mail)
  }

  async sendEmail({ from, to, subject, html }) {
    await this.transporter.sendMail({  from, to, subject, html });
  };

  /**
   *
   * @param notifiable
   * @param {Notification} notification
   */
  async send(notifiable , notification ) {
    let message = notification.toMail(notifiable);
    let { email } = notifiable;

    if(email)
      await this.sendEmail(message);
  }
}

module.exports = MailChannel;
