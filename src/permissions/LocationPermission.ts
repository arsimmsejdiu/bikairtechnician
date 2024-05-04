import {Platform} from "react-native";
import {PERMISSIONS,} from "react-native-permissions";

import {requestPermission} from "./permissionUtils";

const RequestLocationPermission = async () => {
    if (Platform.OS === "ios") {
        return await requestPermission(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    }
    if (Platform.OS === "android") {
        return await requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
};

export default RequestLocationPermission;
