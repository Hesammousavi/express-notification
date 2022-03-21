const express = require('express')
const app = express()
const port = 3000
const notification = require('express-notification');
const { exampleNotification } = require('./notifications');


// define config of notification package
const notificationConfig = {
    config : {
        mail : {
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


app.get('/', (req, res) => {
  // send notificaiton
  res.notify({ email : 'hesam@gmail.com' } , exampleNotification() )
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})