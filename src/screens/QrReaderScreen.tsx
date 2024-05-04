import {AppCamera} from "@components/AppCamera/AppCamera";
import {useFocusEffect} from "@react-navigation/native";
import {BikeCreateStackScreenProps} from "@stacks/types";
import {absoluteFillObjectScreen} from "@styles/ScreenStyles";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Platform, View, ViewProps} from "react-native";
import {check, PERMISSIONS, request} from "react-native-permissions";

interface Props extends ViewProps, BikeCreateStackScreenProps<"QrReader"> {
}

export const QrReaderScreen: React.FC<Props> = ({
    navigation,
    route,
}): React.ReactElement => {

    const [cameraPerm, setCameraPerm] = useState(false);
    const {t} = useTranslation();

    const handleLockRead = (value: string) => {
        const split = value.split("-");
        navigation.navigate("AddLock", {
            lockUid: split[1],
            lockClaimCode: split[2]
        });
    };
    const handleTrackerRead = (value: string) => {
        const split = value.split("\n")[0].split(",");
        const imei = split[0].slice(5);
        const mac = split[1].slice(7);
        navigation.navigate("AddTracker", {
            trackerImei: imei,
            trackerMac: mac,
        });
    };

    const handleQrValueRead = (value: string | undefined) => {
        if (!value) {
            return;
        }
        switch (route.params.type) {
            case "lock":
                handleLockRead(value);
                break;
            case "tracker":
                handleTrackerRead(value);
                break;
            default:
                break;
        }
    };

    const handleQrCodeRead = (result: any[]) => {
        console.log("result", result)
        if (result.length > 0) {
            handleQrValueRead(result[0].value);
        }
    };

    const getType = () => {
        switch (route.params.type) {
            case "lock":
                return "matrix";
            case "tracker":
                return "qrcode";
            default:
                return null;
        }
    };

    useFocusEffect(
        useCallback(() => {
            const permissionName = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
            check(permissionName).then(perm => {
                if (perm === "denied" || perm === "unavailable") {
                    request(permissionName).then(perm => {
                        if (perm === "blocked" || perm === "denied") {
                            Alert.alert(t("qr-reader-screen.authorize_camera"));
                        } else if (perm === "granted") {
                            setCameraPerm(true);
                        }
                    });
                } else if (perm === "blocked") {
                    Alert.alert(t("qr-reader-screen.authorize_camera"));
                } else if (perm === "granted") {
                    setCameraPerm(true);
                }
            });
        }, []),
    );

    const renderCamera = () => {
        console.log("[Cam perm]", cameraPerm);
        if (cameraPerm) {
            return (
                <AppCamera
                    type={getType()}
                    captureEnabled={false}
                    onProcessorResult={handleQrCodeRead}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <View style={absoluteFillObjectScreen}>
            {renderCamera()}
        </View>
    );
};
