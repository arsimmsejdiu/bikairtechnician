import {StyleSheet} from "react-native";

export const homeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
    },
    btnWrapperRight: {
        position: "absolute",
        bottom: 20,
        right: 20
    },
    btnWrapperLeft: {
        position: "absolute",
        bottom: 20,
        left: 20
    },
    control: {
        backgroundColor: "white",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 25,
    },
});
