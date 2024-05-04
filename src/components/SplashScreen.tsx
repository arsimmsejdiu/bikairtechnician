import {COLORS} from "@assets/index";
import {useAppSelector} from "@hooks/index";
import React, {FC} from "react";
import {ActivityIndicator, StatusBar, StyleSheet, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    visible: boolean
}

export const SplashScreen: FC<Props> = ({
    visible,
}): React.ReactElement | null => {
    const showSplashScreenLoading = useAppSelector(state => state.global.showSplashScreenLoading);

    if (showSplashScreenLoading || visible) {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor={COLORS.lightBlue}
                    barStyle={"dark-content"}
                />
                <ActivityIndicator size="small" color="#fff" style={{marginTop: 20}}/>
            </View>
        );
    } else {
        return null;
    }

};

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.lightBlue
    }
});

export default SplashScreen;
