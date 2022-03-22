class NotificationHandler {
    /**
     * the notification class to send message with different channels
     */
    notification;


    /**
     * channels list that the system support
     */
    channels;

    /**
     *
     * prepare list of channels and notifications must be sent
     */
    listOfNotificationMustSendWithChannels = {};


    /**
     * list of configs to get from register middleware of package
     */
    config;

    constructor(config, notification) {
        this.config = config;
        this.notification = notification;
    }


    setChannels(channels) {
        this.channels = channels;
        return this;
    }

    handle() {
        // get channels that notification must send to them
        let channelsMustBeNotify = this.notification.via();

        // notify to notifiable with different channels
        for (const channel of channelsMustBeNotify) {
            this.listOfNotificationMustSendWithChannels[channel] = this.notification;
        }

        return this;
    }

     async to(notifiable) {
        for (const channel in this.listOfNotificationMustSendWithChannels) {
            let notification = this.listOfNotificationMustSendWithChannels[channel];
            // check channel exists in global channels list
            if (this.channels[channel]) {
                await (new this.channels[channel](this.config)).send(notifiable, notification);
            }
        }

    }
}

module.exports = NotificationHandler;
