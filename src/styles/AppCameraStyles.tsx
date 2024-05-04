import {BASE, FONTS} from "@assets/constant";
import {Platform, StyleSheet} from "react-native";

// Capture Button
export const CAPTURE_BUTTON_SIZE = 78;
const BUTTON_SIZE = 40;
const BORDER_WIDTH = CAPTURE_BUTTON_SIZE * 0.1;
export const CONTENT_SPACING = 15;
export const MAX_ZOOM_FACTOR = 20;

export const absoluteFillObject = StyleSheet.absoluteFillObject;

export const appCameraStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    },
    captureButton: {
        position: "absolute",
        alignSelf: "center",
    },
    submitButton: {
        marginBottom: CONTENT_SPACING,
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        borderRadius: BUTTON_SIZE / 2,
        backgroundColor: "rgba(140, 140, 140, 0.3)",
        justifyContent: "center",
        alignItems: "center",
    },
    rightButtonRow: {
        position: "absolute",
        zIndex: 20,
        elevation: 20,
    },
});

export const captureButton = StyleSheet.create({
    flex: {
        flex: 1,
    },
    shadow: {
        position: "absolute",
        width: CAPTURE_BUTTON_SIZE,
        height: CAPTURE_BUTTON_SIZE,
        borderRadius: CAPTURE_BUTTON_SIZE / 2,
    },
    submitButton: {
        width: CAPTURE_BUTTON_SIZE,
        height: CAPTURE_BUTTON_SIZE,
        borderRadius: CAPTURE_BUTTON_SIZE / 2,
        borderWidth: BORDER_WIDTH,
        borderColor: "white",
    },
});

export const photoOverlay = StyleSheet.create({
    container: {
        position: "absolute",
        top: 0,
        left: 0,
        width: BASE.window.width,
        height: BASE.window.height,
    },
    image: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
    },
    buttonsContainer: {
        position: "absolute",
        width: "80%",
        left: "10%",
        bottom: "20%",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    buttonBackground: {
        borderRadius: 100,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
    },
    submitButton: {
        margin: 10,
        fontSize: 50,
    }
});

export const qrCodeOverlay = StyleSheet.create({
    header: {
        marginTop: Platform.OS === "ios" ? 0 : 0,
        paddingTop: 25,
        paddingLeft: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        height: "33.33%",
    },
    title: {
        color: "white",
        fontFamily: FONTS.main,
        fontSize: 20,
        marginTop: 20,
        textAlign: "center",
    },
    targetContainer: {
        height: "33.35%",

    },
    targetWrapper: {
        flex: 1,
        flexDirection: "row",
    },
    sideTarget: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    target: {
        flex: 3,
        padding: 20,
        position: "relative",
    },
    corner: {
        width: 30,
        height: 30,
        position: "absolute",
    },
    cornerTopLeft: {
        left: 0,
        top: 0,
        borderLeftColor: "white",
        borderLeftWidth: 3,
        borderTopColor: "white",
        borderTopWidth: 3,
    },
    cornerBottomLeft: {
        left: 0,
        bottom: 0,
        borderLeftColor: "white",
        borderLeftWidth: 3,
        borderBottomColor: "white",
        borderBottomWidth: 3,
    },
    cornerTopRight: {
        right: 0,
        top: 0,
        borderRightColor: "white",
        borderRightWidth: 3,
        borderTopColor: "white",
        borderTopWidth: 3,
    },
    cornerBottomRight: {
        right: 0,
        bottom: 0,
        borderRightColor: "white",
        borderRightWidth: 3,
        borderBottomColor: "white",
        borderBottomWidth: 3,
    },
});

export const statusBarBlurBackground = StyleSheet.create({
    statusBarBackground: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        // height: StaticSafeAreaInsets.safeAreaInsetsTop,
    },
});
