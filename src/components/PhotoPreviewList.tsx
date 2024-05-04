import React, {FC} from "react";
import {StyleSheet, View, ViewProps} from "react-native";

import {PhotoPreviewElement} from "./PhotoPreviewElement";

interface Props extends ViewProps {
    uriList: string[]
    onDelete?: (index: number) => void
}


export const PhotoPreviewList: FC<Props> = ({
    uriList,
    onDelete
}): React.ReactElement => {
    const handleDeleteElement = (index: number) => () => {
        if (typeof onDelete !== "undefined") {
            console.log(`delete element ${index}`);
            onDelete(index);
        }
    };

    return (
        <View style={styles.container}>
            {uriList.map((uri, i) => {
                return (
                    <PhotoPreviewElement key={`photo-preview-element-${i}`} uri={uri}
                        onDelete={handleDeleteElement(i)}/>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 70,
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
});
