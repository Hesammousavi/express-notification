class ExampleNotification {

    /**
     * return list of channels that you want to send notification to
     * @returns {string[]}
     */
    via() {
      return ['mail'];
    }
  
    /**
     *
     * @param {{ email : string }} notifiable
     * @returns {{subject: string, from: string, html: string, to}}
     */
    toMail(notifiable) {
      return {
        from : 'hi@example.com',
        to : notifiable.email,
        subject: 'hello world',
        html : `
            <h2>Hello World</h2>
            `
      }
    }
  }
  
  
  module.exports = () => new ExampleNotification()
  