import notifee, {AuthorizationStatus} from "@notifee/react-native";

async function RequestNotificationPermission() {
    const settings = await notifee.requestPermission();

    if (AuthorizationStatus) {
        if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
            console.log("Permission settings:", settings);
        } else {
            console.log("User declined permissions");
        }
    }
}

export default RequestNotificationPermission;
