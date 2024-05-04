import {BASE} from "@assets/index";
import React, {FC, memo} from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View, ViewProps } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props extends ViewProps {
    visible: boolean,
    title: string | null,
    message?: string | null,
    handleOpen: (e: boolean) => void,
}

const NotificationItem: FC<Props> = ({
    visible,
    title,
    message,
    style,
    handleOpen
}): React.ReactElement | null => {

    if(!visible) return null;

    return  <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() =>  handleOpen(false)}>
            <View style={[styles.container, style]}>
                <View style={[styles.modalView, {
                    alignItems: "center",
                }]}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => handleOpen(false)}>
                        <Icon   name={"close"} size={25} color={"#287CC2"}/>
                    </TouchableOpacity>
                    <View style={styles.textContainer}>
                        <Text style={[styles.text, {fontWeight: "bold"}]}>{title}oko</Text>
                        <Text style={styles.text}>{message}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    </View>;
};

export default memo(NotificationItem);

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.2)",

    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        position: "relative",

        width: BASE.window.width - BASE.margin,
        backgroundColor: "white",
        borderRadius: BASE.radius.medium,
        padding: BASE.margin,
        shadowColor: "#000",
        height: 150, // BASE.window.height / 2.4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: BASE.elevation.medium,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        color: "black"

    },
    closeButton:{
        position: "absolute",
        color: "black",
        top: 15,
        right: 15
    }
});

