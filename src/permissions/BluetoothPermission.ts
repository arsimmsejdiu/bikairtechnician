import {Platform} from "react-native";
import {PERMISSIONS,} from "react-native-permissions";

import {requestPermission} from "./permissionUtils";

const RequestBluetoothPermission = async () => {
    if (Platform.OS !== "ios") {
        const fineLocPerm = await requestPermission(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        const coarseLocPerm = await requestPermission(PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION);
        const bleScanPerm = await requestPermission(PERMISSIONS.ANDROID.BLUETOOTH_SCAN);
        const bleConnectPerm = await requestPermission(PERMISSIONS.ANDROID.BLUETOOTH_CONNECT);
        return fineLocPerm && coarseLocPerm && bleScanPerm && bleConnectPerm;
    } else {
        return true;
    }
};

export default RequestBluetoothPermission;
