import {COLORS} from "@assets/index";
import React, {useEffect, useState} from "react";
import {Modal, StyleSheet, Text, View, ViewProps} from "react-native";

interface ModalProps extends ViewProps {
    text: string | null
}

export const LoadingModal: React.FC<ModalProps> = ({
    text,
}): React.ReactElement => {
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        setVisible(!!text);
    }, [text]);

    return (
        <View style={styles.centeredView}>

            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {text}
                        </Text>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        margin: 20,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        minWidth: 200,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: COLORS.black
    }
});
