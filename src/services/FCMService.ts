import {COLORS} from "@assets/index";
import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import {PUT_USER_DEVICE_TOKEN} from "@utils/endPoints";
import {Alert} from  "react-native";

import {instanceaxiosApi} from "./axiosInterceptor";

/**
 *
 * @param {*} args
 */
export const onMessageReceived =  async (data: any) => {
    const { title, message } = data;
    console.log("[NOTIFICATION]", data);
    const channelId = await notifee.createChannel({
        id: "default",
        name: "Default Channel"
    });
    // Display a notification
    await notifee.displayNotification({
        title: title,
        body: message,
        android: {
            channelId,
            color: COLORS.lightBlue,
            smallIcon: "ic_launcher", // optional, defaults to 'ic_launcher'.
            // actions: [
            // {
            //     title: `<p style="color: ${COLORS.lightBlue}"><b>Mark as read</b> &#128557;</p>`,
            //     pressAction: { id: 'read' },
            // }]
        }
    });
};

export const onTapNotification = async (props: {detail: any}) => {
    console.log("[ONTAB-NOTIFICATION]", props.detail);
    Alert.alert(props.detail.notification.message);
    return;
};


// Remove the notification
// export const removeNotification =  async (id) => {
//     await notifee.cancelNotification(id);
// }

export const onSaveToken =  async () => {
    try{
        const token = await messaging().getToken();
        await instanceaxiosApi.put(PUT_USER_DEVICE_TOKEN, {token: token});
    }catch(err: any){
        console.log("[ERROR]-onSaveToken", JSON.stringify(err.data));
    }
};

export const getExistingSettings = async () =>  {
    const settings = await notifee.getNotificationSettings();
    if (settings) {
        console.log("Current permission settings: ", settings);
    }
};
