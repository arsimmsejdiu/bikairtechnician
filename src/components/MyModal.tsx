import React, {FC, memo} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Modal, StyleSheet, Text, View, ViewProps} from "react-native";

interface MyModalProps extends ViewProps {
    modalVisible: boolean
    action: string
    setModalVisible?: (value: boolean) => void
}

const MyModal: FC<MyModalProps> = ({
    modalVisible,
    action,
    setModalVisible
}): React.ReactElement | null => {
    const {t} = useTranslation();

    const handleModalVisible = (value: boolean) => {
        if (typeof setModalVisible !== "undefined") {
            setModalVisible(value);
        }
    };

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    handleModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text
                            style={styles.modalText}>{action === "close" ? t("my_modal.closing") : t("my_modal.opening")}</Text>
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
        backgroundColor: "rgba(0,0,0,0.2)",

    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
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
        elevation: 5
    },
    submitButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontWeight: "bold",
        fontSize: 17,
        textAlign: "center",
        color: "black"
    }
});

export default memo(MyModal);
