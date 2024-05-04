import {Spot} from "@models/dto/MarkerData";
import React from "react";
import {StyleSheet, Text, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    spot: Spot
}

const PolygonSpot: React.FC<Props> = React.memo<Props>(({spot,}): React.ReactElement | null => {

    const handleColor = () => {
        if (!spot || !spot.max_bikes) return "transparent";
        if (!spot.bike_ids) return "red";

        if (spot.bike_ids.length > spot.max_bikes) {
            return "yellow";
        }
        if (spot.bike_ids.length < spot.max_bikes) {
            return "red";
        }
        if (spot.bike_ids.length === spot.max_bikes) {
            return "green";
        }
    };

    if (!spot.max_bikes) {
        return null;
    }

    return (
        <View>
            <Text
                style={[styles.textBikeInSpot, {fontSize: 15, color: handleColor()}]}>
                {spot.bike_ids ? spot.bike_ids.length : 0}/{spot.max_bikes}
            </Text>
        </View>
    );
});

export default PolygonSpot;

const styles = StyleSheet.create({
    textBikeInSpot: {
        fontSize: 15,
        color: "red",
        fontWeight: "bold",
        backgroundColor: "white",
        padding: 3
    }
});
