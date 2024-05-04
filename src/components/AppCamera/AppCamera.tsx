import {FeatherIcon} from "@assets/icons/icons";
import {CaptureButton} from "@components/AppCamera/CaptureButton";
import {PhotoOverlay} from "@components/AppCamera/PhotoOverlay";
import {QrCodeOverlay} from "@components/AppCamera/QrCodeOverlay";
import {StatusBarBlurBackground} from "@components/AppCamera/StatusBarBlurBackground";
import {useIsForeground} from "@hooks/index";
import {useFocusEffect, useIsFocused} from "@react-navigation/native";
import {SAFE_AREA_PADDING} from "@services/constants";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {Linking, StyleSheet, Text, View, ViewProps} from "react-native";
import {PressableOpacity} from "react-native-pressable-opacity";
import Reanimated, {runOnJS, useSharedValue} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {
    Camera,
    CameraDeviceFormat,
    CameraPermissionStatus,
    PhotoFile,
    useCameraDevice,
    useCameraDevices,
    useCodeScanner,
    useFrameProcessor,
    VideoFile
} from "react-native-vision-camera";
import {appCameraStyles} from "@styles/AppCameraStyles";

const ReanimatedCamera = Reanimated.createAnimatedComponent(Camera);
Reanimated.addWhitelistedNativeProps({
    zoom: true,
});

interface Props extends ViewProps {
    type?: "matrix" | "qrcode" | "photo" | null
    captureEnabled?: boolean
    label?: string,
    onProcessorResult?: (result: any[]) => void
    onMediaCaptured?: (photo: PhotoFile) => void
}

export const AppCamera: React.FC<Props> = ({
    type,
    captureEnabled,
    label,
    onMediaCaptured,
    onProcessorResult,
    style,
    ...props
}): React.ReactElement => {
    const insets = useSafeAreaInsets();
    const camera = useRef<Camera>(null);
    const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
    const [isCameraInitialized, setIsCameraInitialized] = useState(false);
    const [mediaCaptured, setMediaCaptured] = useState<PhotoFile | null>(null);
    const isPressingButton = useSharedValue(false);
    const {t} = useTranslation();

    // check if camera page is active
    const isFocussed = useIsFocused();
    const isForeground = useIsForeground();
    const isActive = isFocussed && isForeground;
    const isCaptureEnabled = typeof captureEnabled === "undefined" ? true : captureEnabled;

    const [flash, setFlash] = useState<"off" | "on">("off");

    // camera format settings
    const device = useCameraDevice("back");

    const supportsFlash = device?.hasFlash ?? false;


    //#region Callbacks
    const setIsPressingButton = useCallback(
        (_isPressingButton: boolean) => {
            isPressingButton.value = _isPressingButton;
        },
        [isPressingButton],
    );
    // Camera callbacks
    const onError = useCallback((error: any) => {
        console.error(error);
    }, []);

    const onInitialized = useCallback(() => {
        console.log("Camera initialized!");
        setIsCameraInitialized(true);
    }, []);

    const handleMediaCaptured = useCallback(
        (media: PhotoFile | VideoFile, type: "video" | "photo") => {
            if (type === "photo") {
                setMediaCaptured(media as PhotoFile);
            }
        }, []);

    const handleMediaValidation = (photo: PhotoFile) => {
        if (typeof onMediaCaptured !== "undefined") {
            onMediaCaptured(photo);
            setMediaCaptured(null);
        }
    };

    const handleMediaCancellation = () => {
        setMediaCaptured(null);
    };

    const onFlashPressed = useCallback(() => {
        setFlash((f) => (f === "off" ? "on" : "off"));
    }, []);
    //#endregion

    // if (device != null && format != null) {
    //     console.log(
    //         `Re-rendering camera page with ${isActive ? "active" : "inactive"} camera. ` +
    //         `Device: "${device.name}" (${format.photoWidth}x${format.photoHeight} @ ${30}fps). ` +
    //         `Flash: support flash ${device?.hasFlash} and flash active ${flash}`,
    //     );
    // } else {
    //     console.log("re-rendering camera page without active camera");
    // }

    const requestCameraPermission = useCallback(async () => {
        console.log("Requesting camera permission...");
        const permission = await Camera.requestCameraPermission();
        console.log(`Camera permission status: ${permission}`);

        if (permission === "denied") await Linking.openSettings();
        setCameraPermission(permission);
    }, []);

    const codeScanner = useCodeScanner({
        codeTypes: ["qr"],
        onCodeScanned: (codes: any) => {
            if (typeof onProcessorResult !== "undefined") {
                runOnJS(onProcessorResult)(codes);
                return;
            }
        }
    });


    useEffect(() => {
        Camera.getCameraPermissionStatus().then(setCameraPermission);
    }, []);

    useFocusEffect(
        useCallback(() => {
            if (cameraPermission !== "granted") {
                requestCameraPermission().then(r => console.log(r));
            }
        }, [])
    );

    if (cameraPermission !== "granted") {
        return (
            <View>
                <Text>{t("app_camera.camera_authorize")}</Text>
            </View>
        );
    }

    return (
        <View style={appCameraStyles.container}>
            {device != null && (
                <Reanimated.View style={StyleSheet.absoluteFill}>
                    <ReanimatedCamera
                        ref={camera}
                        style={StyleSheet.absoluteFill}
                        device={device}
                        torch={flash}
                        fps={30}
                        isActive={isActive}
                        onInitialized={onInitialized}
                        onError={onError}
                        enableZoomGesture={false}
                        photo={type !==  "qrcode"}
                        video={false}
                        orientation="portrait"
                        codeScanner={type ===  "qrcode" || type === "matrix" ? codeScanner : undefined}
                    />
                </Reanimated.View>
            )}

            <StatusBarBlurBackground/>

            <QrCodeOverlay visible={type === "qrcode" || type === "matrix"} label={label}/>

            <CaptureButton
                style={[appCameraStyles.captureButton, {bottom: SAFE_AREA_PADDING(insets).paddingBottom}]}
                camera={camera}
                onMediaCaptured={handleMediaCaptured}
                enabled={isCameraInitialized && isActive}
                setIsPressingButton={setIsPressingButton}
                visible={isCaptureEnabled}
            />

            <View style={[appCameraStyles.rightButtonRow, {
                right: SAFE_AREA_PADDING(insets).paddingRight,
                top: SAFE_AREA_PADDING(insets).paddingTop
            }]}>
                {(supportsFlash && !mediaCaptured) && (
                    <PressableOpacity style={appCameraStyles.submitButton} onPress={onFlashPressed} disabledOpacity={0.4}>
                        <FeatherIcon name={flash === "on" ? "zap" : "zap-off"} size={20} color={"white"}/>
                    </PressableOpacity>
                )}
            </View>

            <PhotoOverlay
                media={mediaCaptured}
                onValidate={handleMediaValidation}
                onCancel={handleMediaCancellation}
            />
            {props.children}
        </View>
    );
};
