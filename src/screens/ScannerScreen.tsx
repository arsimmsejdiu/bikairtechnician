import {COLORS} from "@assets/index";
import {AppCamera} from "@components/AppCamera/AppCamera";
import {BottomTextField} from "@components/BottomTextField";
import {useAppSelector} from "@hooks/index";
import {useFocusEffect} from "@react-navigation/native";
import {BikeStackScreenProps} from "@stacks/types";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Platform, StatusBar, StyleSheet, View, ViewProps, Text} from "react-native";
import {check, PERMISSIONS, request} from "react-native-permissions";

import {ROLES} from "@bikairproject/shared";
import {ScannerStyles} from "@styles/ScreenStyles";

interface Props extends ViewProps, BikeStackScreenProps<"BikeScanner"> {
}

const ScannerScreen: React.FC<Props> = (
    {
        navigation,
        route,
    }): React.ReactElement => {

    const [cameraPerm, setCameraPerm] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);
    const user = useAppSelector(state => state.auth.me);
    const role = user?.role ?? null;
    const {t} = useTranslation();

    const handleValidateBikeName = (bikeName: string | undefined) => {
        if (!bikeName || !route.params.bikeName || !role) {
            setAlertOpen(false);
            return;
        }
        if (bikeName.trim().toUpperCase() === route.params.bikeName.toUpperCase()) {
            if (  user &&  user.access_rights.filter((status: string) => ["COLLECTOR_REPORT", "CONTROLLER_REPORT", "TECHNICIAN_REPORT"].includes(status)).length > 1 ) {
                // Redirect to screen to select collector || controller report || technician report
                navigation.navigate("ReportSelect", {
                    bikeId: route.params.bikeId,
                    bikeName: route.params.bikeName,
                    issue: route.params.issue,
                });
            } else {
                navigation.navigate("Report", {
                    bikeId: route.params.bikeId,
                    bikeName: route.params.bikeName,
                    role: role as ROLES,
                    issue: route.params.issue,
                });
            }
        } else {
            setAlertOpen(true);
            navigation.navigate("Bike");
            if(!alertOpen){
                Alert.alert(t("scanner_screen.bike_no_response"));
            }
        }
    };

    const handleQrCodeRead = (result: any[]) => {
        if (result.length > 0) {
            handleValidateBikeName(result[0].value);
        }
    };

    useFocusEffect(
        useCallback(() => {
            const permissionName = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA;
            check(permissionName).then(perm => {
                if (perm === "denied" || perm === "unavailable") {
                    request(permissionName).then(perm => {
                        if (perm === "blocked" || perm === "denied") {
                            Alert.alert(t("photo_step.authorize_camera"));
                        } else if (perm === "granted") {
                            setCameraPerm(true);
                        }
                    });
                } else if (perm === "blocked") {
                    Alert.alert(t("photo_step.authorize_camera"));
                } else if (perm === "granted") {
                    setCameraPerm(true);
                }
            });
        }, []),
    );

    const renderCamera = () => {
        if (cameraPerm) {
            return (
                <AppCamera
                    type={"qrcode"}
                    captureEnabled={false}
                    onProcessorResult={handleQrCodeRead}
                >
                    <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"}/>
                    <BottomTextField
                        onSubmit={handleValidateBikeName}
                    />
                </AppCamera>
            );
        } else {
            return null;
        }
    };

    return (
        <View style={ScannerStyles.container}>
            <View style={StyleSheet.absoluteFill}>
                {renderCamera()}
            </View>
        </View>
    );
};

export default ScannerScreen;
