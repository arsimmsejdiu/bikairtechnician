import {COLORS} from "@assets/index";
import React, {FC} from "react";
import {ActivityIndicator, StyleSheet, View} from "react-native";

export const Loader: FC = (): React.ReactElement => {
    return (
        <View style={styles.root}>
            <ActivityIndicator color={COLORS.lightBlue} size="large"/>
        </View>
    );
};


export default Loader;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.lightGrey
    },
});
