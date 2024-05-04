import {BASE, COLORS, FONTS} from "@assets/constant";
import {StyleSheet} from "react-native";

export const absoluteFillObjectScreen = StyleSheet.absoluteFillObject;

export const updateStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.lightGrey,
    },
    title: {
        fontFamily: FONTS.main,
        fontSize: 25,
        color: COLORS.darkBlue,
        textAlign: "center",
    },
    logo: {
        width: 70,
        height: 50,
    },
    instruction: {
        textAlign: "center",
        fontFamily: FONTS.main,
        color: COLORS.darkGrey,
        fontSize: 13,
        padding: 20,
    },
    submitContainer: {
        marginTop: 10,
        width: BASE.window.width - 20
    },
});

export const addBikeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        paddingHorizontal: 20,
    },
    titlePhotoContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 23,
        justifyContent: "space-between",
    },
    line: {
        marginTop: 15,
        marginBottom: 15,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 1,
    },
    title: {
        color: COLORS.black,
        padding: 10,
        fontSize: 30,
        fontWeight: "bold",
    },
    label: {
        color: COLORS.black,
        margin: 20,
        marginLeft: 0,
        fontSize: 15,
    },
    photo: {
        width: "100%",
        textAlign: "center"
    },
    input: {
        backgroundColor: COLORS.white,
        color: COLORS.black,
        height: 40,
        padding: 10,
        fontSize: 15,
        borderRadius: 4,
    },
    photoButton: {
        backgroundColor: COLORS.darkBlue,
        color: COLORS.white,
        height: 40,
        borderRadius: 4,
        minWidth: 50,
        justifyContent: "center",

    },
    submitButton: {
        width: "100%",
        marginTop: 10,
        zIndex: -1
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 15,
        zIndex: -1
    },
    noButton: {
        color: COLORS.black,
        width: "100%",
    },
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: COLORS.black,
        height: 40,
        borderRadius: 4,
        fontSize: 16,
        marginBottom: 25,
        paddingRight: 30, // to ensure the text is never behind the icon
        zIndex: 10
    },
    inputAndroid: {
        color: COLORS.black,
        height: 40,
        borderRadius: 8,
        marginBottom: 25,
        paddingRight: 30, // to ensure the text is never behind the icon
        zIndex: 10
    },
});

export const bikeListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGrey,
    },
    itemName: {
        color: COLORS.black,
        fontSize: 23,
        fontWeight: "700"
    },
    itemCapacity: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "500"
    },
    itemState: {
        color: COLORS.black,
        fontSize: 16,
        fontWeight: "500"
    },
    itemImage: {
        height: 150,
        width: "100%",
        position: "absolute",
        bottom: 0,
        right: "-45%",
        resizeMode: "center"
    },
    title: {
        fontSize: 40,
        color: COLORS.black,
        marginBottom: 10,
        fontWeight: "700",
        marginLeft: 10
    },
    fields: {
        marginBottom: 100,
        width: BASE.window.width - BASE.margin
    },
    btnWrapperRight: {
        position: "absolute",
        bottom: 20,
        right: 20
    },
    check: {
        width: 40,
        height: 40,
        left: 25,
        bottom: 10,
        backgroundColor: "transparent",
        position: "absolute",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
    }
});

export const bikeStyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: 0
    },
    container: {
        margin: 10
    },
    content: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 10
    },
    text: {
        fontSize: 16,
        color: "black",
        textTransform: "capitalize",
        flexWrap: "wrap"
    },
    loader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 30,
        backgroundColor: COLORS.lightGrey,
        borderRadius: 10,
        marginBottom: 20,
    }
    ,
    buttonStatus: {
        marginTop: 15,
        marginBottom: 5,
        backgroundColor:
            COLORS.white,
        height: 60,
        minWidth: 120,
        width: "100%",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonAddress: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor:
            COLORS.white,
        height: 60,
        minWidth: 120,
        width: 180,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPosition: {
        marginTop: 5,
        marginBottom: 15,
        backgroundColor: COLORS.white,
        height: 60,
        minWidth: 120,
        width: 180,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonControl: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: COLORS.lightBlue,
        height: 60,
        minWidth: 120,
        width: "100%",
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonPadlock: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: COLORS.lightBlue,
        height: 60,
        minWidth: 120,
        maxWidth: 240,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTracker: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: COLORS.lightBlue,
        height: 60,
        minWidth: 120,
        maxWidth: 240,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonOpen: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: COLORS.lightBlue,
        height: 60,
        minWidth: 120,
        maxWidth: 220,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonClose: {
        marginTop: 15,
        marginBottom: 15,
        backgroundColor: COLORS.lightBlue,
        height: 60,
        minWidth: 120,
        maxWidth: 220,
        borderRadius: 50,
        alignItems: "center",
        justifyContent: "center",
    },
    addressContainer: {
        backgroundColor: COLORS.lightGrey,
        marginBottom: 20,
        borderRadius: 10,
        padding: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    }
});

export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: COLORS.darkBlue,
    },
    connectionContainer: {
        paddingTop: 50,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        paddingTop: 10,
        fontSize: 30,
        color: COLORS.white
    },
    fields: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        height: 60,
        backgroundColor: "white",
        borderRadius: BASE.radius.main,
        marginBottom: 20,
        width: BASE.window.width - 20
    },
    input: {
        flex: 1,
        paddingRight: 10,
        fontFamily: FONTS.main,
        fontSize: FONTS.sizeText,
        color: COLORS.black,
        width: BASE.window.width - 40
    },
    buttonContainer: {
        width: BASE.window.width - 20
    },
    versionText: {
        marginBottom: 10,
    },
    error: {
        textAlign: "center",
        fontFamily: FONTS.main,
        color: COLORS.red,
        fontWeight: "bold",
        fontSize: 13,
        padding: 20,
        height: 60,
    }
});

export const logoutStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.lightBlue
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

export const reportStyles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
});

export const reportSelectStyles = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    title:{
        color: COLORS.black,
        fontSize: 25,
        textAlign: "center",
        fontWeight: "500",
        marginTop: BASE.margin,
        marginBottom:BASE.margin * 2
    },
    textSeparator: {
        marginTop: BASE.margin,
        marginBottom:BASE.margin
    }
});

export const ScannerStyles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
