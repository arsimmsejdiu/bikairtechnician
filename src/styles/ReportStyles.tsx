import {BASE, COLORS} from "@assets/constant";
import {StyleSheet} from "react-native";

export const buttonsStep = StyleSheet.create({
    container: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: COLORS.black,
        fontSize: 25,
        fontWeight: "600",
        padding: 20,
        textAlign: "center"
    },
});

export const commentStep = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
        height: "100%"
    },
    text: {
        color: COLORS.black,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginTop: BASE.margin,
        marginBottom: BASE.margin
    },
    container: {
        flex: 1
    },
    content: {
        alignItems: "center",
        bottom: 0
    },
    formWrapper: {
        alignItems: "center",
        justifyContent: "flex-end"
        // position: "absolute"
    },
    input: {
        marginTop: BASE.margin,
        marginBottom: BASE.margin,
        color: COLORS.black,
        borderColor: COLORS.lightGrey,
        height: 70,
        backgroundColor: "white",
        width: BASE.window.width - BASE.margin,
        padding: 10,
        borderRadius: 4
    },
    footer: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 15,
        width: "95%",
        justifyContent: "space-between",
    },
    yesButton: {
        width: "100%"
    }
});

export const incidentStep = StyleSheet.create({
    wrapper: {
        flexDirection: "row",
    },
    text: {
        color: COLORS.black,
        fontSize: 22,
        fontWeight: "600",
        textAlign: "center",
        marginTop: BASE.margin,
        marginBottom: BASE.margin
    },
    container: {
        flex: 1
    },
    content: {
        alignItems: "center",
        bottom: 0
    },
    formWrapper: {
        alignItems: "center",
        justifyContent: "flex-end"
        // position: "absolute"
    },
    input: {
        marginTop: BASE.margin,
        marginBottom: BASE.margin,
        color: COLORS.black,
        borderColor: COLORS.lightGrey,
        height: 70,
        backgroundColor: "white",
        width: BASE.window.width - BASE.margin,
        padding: 10,
        borderRadius: 4
    },
    footer: {
        flexDirection: "row",
        paddingTop: 5,
        paddingBottom: 15,
        width: "95%",
        justifyContent: "space-between",
    },
    yesButton: {
        width: "100%"
    }
});

export const photoStep = StyleSheet.create({
    text: {
        alignSelf: "center",
        color: COLORS.black,
        fontSize: 23,
        fontWeight: "600",
        textAlign: "center",
        marginTop: BASE.margin,
        marginBottom: BASE.margin
    },
    textValid: {
        alignSelf: "center",
        color: COLORS.darkGrey,
        fontSize: 18,
        marginTop: BASE.margin,
        marginBottom: BASE.margin
    },
});

export const questionStep = StyleSheet.create({
    container: {
        height: "100%",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center"
    },
    text: {
        color: COLORS.black,
        fontSize: 25,
        textAlign: "center",
        fontWeight: "600",
        padding: 20
    },
    footer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 10,
    },
    yesButton: {
        color: COLORS.black,
        width: "47%",
    },
    noButton: {
        color: COLORS.black,
        width: "47%",
    },
});

export const repairedStepsStyles = StyleSheet.create({
    text: {
        color: COLORS.black,
        fontSize: 25,
        fontWeight: "600",
        textAlign: "center",
        padding: 20,
    },
    content: {
        flexDirection: "column",
        justifyContent: "space-around",
        height: "100%",
        alignItems: "center"
    },
    checkbox: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingLeft: 10,
    },
    checkboxText: {
        alignSelf: "center",
    },
    footer: {
        flexDirection: "row",
        padding: 10,
        width: "100%",
        justifyContent: "space-between",
    },
    yesButton: {
        width: "100%"
    }
});

export const spotStepStyles = StyleSheet.create({
    container: {
        flex: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: BASE.padding.main
    },
    text: {
        color: COLORS.black,
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        padding: 20,
    },
    footer: {
        flexDirection: "row",
        padding: 10,
        width: "100%",
        justifyContent: "center",
        zIndex: -1
    }
});

export const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        color: COLORS.black,
        height: 60,
        borderRadius: 4,
        fontSize: 16,
        marginBottom: 35, // to ensure the text is never behind the icon
        zIndex: 1
    },
    inputAndroid: {
        color: COLORS.black,
        height: 60,
        borderRadius: 8,
        marginBottom: 35,// to ensure the text is never behind the icon
        zIndex: 1
    }
});
