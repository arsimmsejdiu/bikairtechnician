import {COLORS} from "@assets/index";
import {Spot} from "@models/dto/MarkerData";
import React from "react";
import {StyleSheet, Text, View, ViewProps} from "react-native";
import Svg, {Path} from "react-native-svg";

interface Props extends ViewProps {
    element: Spot | null
}

const MarkerSpot: React.FC<Props> = React.memo<Props>((
    {
        element,
    }): React.ReactElement | null => {

    const getParkingImage = (width = 20, height = 20, backgroundColor: string | null = null, letterColor: string | null = null) => {
        backgroundColor = backgroundColor ?? COLORS.greenSpot;
        letterColor = letterColor ?? COLORS.white;
        return (
            <Svg width={width} height={height} viewBox="0 0 16 16">
                <Path
                    fill={letterColor}
                    d="M 3 3 L 13 3 L 13 13 L 3 13 L 3 3"/>
                <Path
                    fill={backgroundColor}
                    d="M8.27 8.074c.893 0 1.419-.545 1.419-1.488s-.526-1.482-1.42-1.482H6.778v2.97H8.27Z"/>
                <Path
                    fill={backgroundColor}
                    d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2Zm3.5 4.002h2.962C10.045 4.002 11 5.104 11 6.586c0 1.494-.967 2.578-2.55 2.578H6.784V12H5.5V4.002Z"/>
            </Svg>
        );
    };

    const handleColor = () => {
        if (!element || !element.max_bikes) return "transparent";
        if (!element.bike_ids) return "red";

        if (element.bike_ids.length > element.max_bikes) {
            return "yellow";
        }
        if (element.bike_ids.length < element.max_bikes) {
            return "red";
        }
        if (element.bike_ids.length === element.max_bikes) {
            return "green";
        }
    };

    const renderIcon = () => {
        return getParkingImage();
    };
    const renderText = () => {
        if(element?.max_bikes) {
            return (
                <Text
                    style={[styles.textBikeInSpot, {fontSize: 15, color: handleColor()}]}>
                    {element.nb_bikes ?? 0}/{element.max_bikes}
                </Text>
            );
        } else {
            return null;
        }
    };

    if (!element) {
        return null;
    }

    return (
        <View style={styles.container}>
            {renderIcon()}
            {renderText()}
        </View>
    );
});

export default MarkerSpot;

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    },
    textBikeInSpot: {
        fontSize: 15,
        color: "red",
        fontWeight: "bold",
        backgroundColor: "white",
        padding: 3
    }
});
