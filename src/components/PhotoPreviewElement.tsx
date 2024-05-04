import React, {FC} from "react";
import {Alert, Image, StyleSheet, ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

interface Props extends ViewProps {
    uri: string
    onDelete?: () => void
}


export const PhotoPreviewElement: FC<Props> = ({
    uri,
    onDelete
}): React.ReactElement => {

    const handleDelete = () => {
        return Alert.alert(
            "Etes vous sur ?",
            "Etes-vous sur de vouloir retirer cette photo ?",
            [
                {
                    text: "Non",
                },
                {
                    text: "Oui",
                    onPress: () => {
                        if (typeof onDelete !== "undefined") {
                            onDelete();
                        }
                    },
                },
            ]
        );
    };

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={handleDelete}
        >
            <Image source={{uri: uri}}
                style={styles.image}
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "relative",
        top: 0,
        left: 0,
        width: 50,
        height: 50,
    },
    image: {
        width: "100%",
        height: "100%",
        borderRadius: 10000,
        overflow: "hidden"
    },
});
