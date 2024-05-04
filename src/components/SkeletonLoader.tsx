import {COLORS} from "@assets/index";
import React, {memo, useEffect,useRef} from "react";
import {Animated, Dimensions,StyleSheet, View} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const SPACING = 20;
const {width} = Dimensions.get("window");
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const SkeletonLoader = () => {
    const x = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(Animated.timing(x, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true
        })).start();
    }, []);

    return (
        <View style={styles.box}>
            <AnimatedLinearGradient
                colors={["#DCDCDC", "#FFFFFF", "#DCDCDC"]}
                style={{
                    ...StyleSheet.absoluteFillObject,
                    transform: [{
                        translateX: x.interpolate({
                            inputRange: [0 ,1],
                            outputRange: [-width, width]
                        })
                    }]
                }}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        height: 150,
        borderRadius: 12,
        marginBottom: SPACING,
        overflow: "hidden",
        backgroundColor: COLORS.inputGrey,
    },
    line: {
        ...StyleSheet.absoluteFillObject
    }
});

export default memo(SkeletonLoader);
