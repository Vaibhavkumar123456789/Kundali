import React, { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import PushNotification from "react-native-push-notification";

const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage((remoteMessage) => {
            console.log('Message handled in the background!', remoteMessage);
            const { notification, messageId } = remoteMessage
            let data;
            if (remoteMessage.data) {
                data = remoteMessage.data;
            }
            PushNotification.localNotification({
                channelId: 'mychannel',
                autoCancel: true,
                bigText: data.body,
                playSound: true,
                subText: 'Kundali',
                title: data.title,
                id: messageId,
                message: data.body,
                vibrate: true,
                vibration: 300,
                playSound: true,
                soundName: 'default',
                ignoreInForeground: false,
                importance: 'high',
                invokeApp: true,
                allowWhileIdle: true,
                priority: 'high',
                visibility: 'public',
            })
        })
        return unsubscribe
    }, [])


    useEffect(() => {
        const unsubscribe1 = messaging().setBackgroundMessageHandler(remoteMessage => {
            console.log('Message handled in kill mode', remoteMessage);
            const { notification, messageId } = remoteMessage
            let data;
            if (remoteMessage.data) {
                data = remoteMessage.data;
            }
            PushNotification.localNotification({
                channelId: 'mychannel',
                autoCancel: true,
                bigText: data.body,
                playSound: true,
                subText: 'Kundali',
                title: data.title,
                id: messageId,
                message: data.body,
                vibrate: true,
                vibration: 300,
                playSound: true,
                soundName: 'default',
                ignoreInForeground: false,
                importance: 'high',
                invokeApp: true,
                allowWhileIdle: true,
                priority: 'high',
                visibility: 'public',
            })
        })
        return unsubscribe1
    }, [])
    return null
}

export default ForegroundHandler