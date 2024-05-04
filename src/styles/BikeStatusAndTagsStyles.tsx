import {COLORS} from "@assets/constant";
import {StyleSheet} from "react-native";

export const StatusStyles = StyleSheet.create({
    root: {
        flex: 1,
        marginTop: 30,
        justifyContent: "flex-start",
        paddingHorizontal: 10
    },
    contentButton: {
        height: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderColor: "#c5c5c5",
        paddingLeft: 10,
        paddingRight: 10
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
        paddingRight: 30,// to ensure the text is never behind the icon
        zIndex: 10
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        color: "black",
        marginBottom: 20,
        zIndex: -1
    }
});
