import NotificationItem from "@components/NotificationItem";
import notifee, {EventType} from "@notifee/react-native";
import RequestNotificationPermission from "@permissions/NotificationPermission";
import messaging from "@react-native-firebase/messaging";
import {onSaveToken} from "@services/FCMService";
import React from "react";

export const Notification: React.FC = (): React.ReactElement => {

    const [open, setOpen] = React.useState(false);
    const [title, setTitle] = React.useState<string | null>(null);
    const [message, setMessage] = React.useState<string | null>(null);
    React.useEffect(() => {
        // Save device token
        onSaveToken().then(r => console.log(r));
    }, []);

    // Handle firebase messaging subscription
    React.useEffect(() => {
        RequestNotificationPermission().then(r => console.log(r)); // IOS only
        return messaging().onMessage(async (remoteMessage: any) => {
            setMessage(remoteMessage.notification.body);
            setTitle(remoteMessage.notification.title);
            setOpen(true);
        });
    }, []);

    // handle notification foreground
    React.useEffect(() => {
        return notifee.onForegroundEvent(({type, detail}) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log("User dismissed notification___________________________________________________", detail.notification);
                    break;
                case EventType.PRESS:
                    if (detail?.notification?.body && detail?.notification?.title) {
                        console.log("User pressed notification+++++++++++++++++++++++++++++++++++++++++++++++++++", detail.notification);
                        setMessage(detail.notification.body);
                        setTitle(detail.notification.title);
                        setOpen(true);
                    }
                    break;
            }
        });
    }, []);

    return <NotificationItem
        title={title}
        visible={open}
        handleOpen={setOpen}
        message={message}
    />;
};

export default Notification;
