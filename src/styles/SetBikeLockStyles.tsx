import {COLORS} from "@assets/index";
import {StyleSheet} from "react-native";

export const validateAddBikeStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 8,
    },
    titlePhotoContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 2,
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
        marginLeft: 0,
        fontSize: 20,
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
        margin: 20,
    },
});

export const setBikeLockStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
        zIndex: 10
    },
    titlePhotoContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
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
        marginLeft: 0,
        fontSize: 25,
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
        maxWidth: 50,
        justifyContent: "center",
        flex: 1,
        alignItems: "center"

    },
    submitButton: {
        margin: 20,
    },
});

export const pickerSelectBikeLockStyles = StyleSheet.create({
    inputIOS: {
        color: COLORS.black,
        height: 40,
        borderRadius: 4,
        fontSize: 16,
        marginBottom: 25,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        color: COLORS.black,
        height: 40,
        borderRadius: 8,
        marginBottom: 25,
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export const setBikeTrackerStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 15,
    },
    titlePhotoContainer: {
        display: "flex",
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
    },
    title: {
        color: COLORS.black,
        marginLeft: 0,
        fontSize: 25,
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
        margin: 20,
    },
});
