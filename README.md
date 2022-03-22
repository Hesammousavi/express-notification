# express-router
express notification system

> you can send notification with diffrent channels

## Installation

first of all you must install the package

run this command first : 
```
npm i express-notification
```

## How To Use

- you can see ./example directory for a real example

### Step One : Register Express Notification Middleware

after you install the package you can require express notification
and then you must register a middleware for the package

```js
const express = require('express')
const app = express()
const notification = require('express-notification');

// define config of notification package
const notificationConfig = {
    config : {}
}


// register notification system
app.use(notification.register(notificationConfig))
```
### Step Two: Config of Default Channels

list of default channels:
1. mail channel

you have one channel by defualt named 'mail channel', you must set config to use it

```js
// define config of notification package
const notificationConfig = {
    config : {
        mail : {
            // you can config your smtp server
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: '',
              pass: '',
            }
        }
    }
}

// register notification system
app.use(notification.register(notificationConfig))
```

### Step Three : You Must Define A Notification

now you must define a notification to send.

maybe in ./notifications/exampleNotification.js

```js
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
```

### Step Four : Send Notificaiton

now you can easily send notifition in Route Handler

```js 
const exampleNotification = require('./notifications/exampleNotification');

app.get('/', (req, res) => {
  // send notificaiton
  res.notify({ email : 'hesam@gmail.com' } , exampleNotification() )
  res.send('Hello World!')
});
```


## Define a Custom Channel

you can define custom channels for sending your notifications

### Step One :  you must write the channel class

maybe in ./notifications/channels/smsChannel.js

```js

class SmsChannel {
  // init MailChannel 
  constructor (config) {
    // check mail config is exsits in config
    if(! ('sms' in config)) {
      throw new Error('sms config is mixing')
    }
  }
  /**
   *
   * @param notifiable
   * @param {Notification} notification
   */
  async send(notifiable , notification ) {
    // this message comes from Notification classes
    let message = notification.toSms(notifiable);
    let { phoneNumber } = notifiable;

    // can require an api to send sms here
  }
}

module.exports = SmsChannel;

```

### Step Two : you must register the custom channel

when you registered express notification middleware, you can set custom channels in notification config



```js
// we could define the channel in everywhere we want 
const SmsChannel = require('./notifications/channels/smsChannel.js')

// define config of notification package
const notificationConfig = {
    config : {
        mail : {
            // you can config your smtp server
            host: 'smtp.mailtrap.io',
            port: 2525,
            auth: {
              user: '',
              pass: '',
            }
        },
        sms : {
            // sms channel config
        }
    },
    channels : {
        'sms' : SmsChannel
    }
}

// register notification system
app.use(notification.register(notificationConfig))

```

### Step Three : You everywhere You want

you can use the channel in every notification class you want

```js
class ExampleNotification {

    /**
     * return list of channels that you want to send notification to
     * @returns {string[]}
     */
    via() {
      return ['mail' , 'sms'];
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

    toSms(notifiable) {
        return {
            message : 'hello roocket'
        }
    }
  }
  
  
  module.exports = () => new ExampleNotification()
```
