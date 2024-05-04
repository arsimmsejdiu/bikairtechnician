import React from "react";
import {Image, StyleSheet, Text, View, ViewProps} from "react-native";
import Svg, {Path} from "react-native-svg";

import {COLORS} from "../assets/constant";
import {Bike} from "../models/dto/MarkerData";
import {BIKE_STATUS} from "@bikairproject/shared";

interface Props extends ViewProps {
    element: Bike,
}

const MarkerBike: React.FC<Props> = React.memo<Props>(({
                                                           element,
                                                       }): React.ReactElement | null => {

    if (!element) return null;

    const getBattery = (element: Bike) => {
        const fullCapacity = element.full_capacity ?? 70;
        const percent = Math.floor(element.capacity / fullCapacity * 100);
        if (percent < 25) {
            return <Image
                fadeDuration={0}
                source={require("../assets/images/battery_1_4.webp")}
                style={styles.pin}
            />;
        }
        if (percent < 50) {
            return <Image
                fadeDuration={0}
                source={require("../assets/images/battery_2_4.webp")}
                style={styles.pin}
            />;
        }
        if (percent < 75) {
            return <Image
                fadeDuration={0}
                source={require("../assets/images/battery_3_4.webp")}
                style={styles.pin}
            />;
        }
        return <Image
            fadeDuration={0}
            source={require("../assets/images/battery_4_4.webp")}
            style={styles.pin}
        />;
    };

    const getTextBackground = (element: Bike) => {
        switch (element.status) {
            case BIKE_STATUS.USED:
                return styles.USED;
            case BIKE_STATUS.AVAILABLE:
                return styles.AVAILABLE;
            case BIKE_STATUS.MAINTENANCE:
                return styles.MAINTENANCE;
            case BIKE_STATUS.STOLEN:
                return styles.STOLEN;
            case BIKE_STATUS.BOOKED:
                return styles.BOOKED;
            case BIKE_STATUS.RENTAL:
                return styles.RENTAL;
            case BIKE_STATUS.PAUSED:
                return styles.PAUSED;
            default:
                return styles.GREY;
        }
    };

    const renderName = (element: Bike) => {
        if (element.name) {
            return (
                <Text style={[styles.text, getTextBackground(element)]}>{element.name}</Text>
            );
        } else {
            return <Text style={[styles.text, getTextBackground(element)]}>TEST</Text>;
        }
    };

    const getDropImage = (backgroundColor: string, bikeColor: string | null = null) => {
        bikeColor = bikeColor ?? COLORS.white;
        return (
            <Svg width="35" height="46" viewBox="0 0 35 46">
                <Path fill={backgroundColor} stroke={COLORS.black} stroke-width="1"
                      d="M 18 46 Q 16 41 4 28 A 17 17 0 1 1 31 28 Q 20 41 18 46 Z"/>
                <Path fill="transparent" stroke={bikeColor} stroke-width="1"
                      d="M 10.8 24 A 1.7 1.7 90 0 1 10.8 15.3 M 10.8 24 A 1.7 1.7 90 0 0 10.8 15.3 M 24.3 24 A 1.7 1.7 90 0 1 24.3 15.3 M 24.3 24 A 1.7 1.7 90 0 0 24.3 15.3 M 9.3 19.7 Q 12.3 21.1 12.4 15.2 Q 12.3 12.6 13.8 12.9 T 16.4 17.1 T 18.1 18.1 T 19.4 12.6 T 22.6 16.1 L 24.3 20 M 19.6 10 L 22.6 10 Z"/>
            </Svg>
        );
    };

    const renderIcon = (element: Bike) => {
        if (element.name) {
            switch (element.status) {
                case BIKE_STATUS.USED:
                    return getDropImage(COLORS.green);
                case BIKE_STATUS.NOT_FOUND:
                    return getDropImage(COLORS.black);
                case BIKE_STATUS.WAIT_DEPLOY:
                    return getDropImage(COLORS.darkGrey);
                case BIKE_STATUS.AVAILABLE:
                    return getDropImage(COLORS.darkBlue);
                case BIKE_STATUS.MAINTENANCE:
                    return getDropImage(COLORS.purple);
                case BIKE_STATUS.STOLEN:
                    return getDropImage(COLORS.red);
                case BIKE_STATUS.BOOKED:
                    return getDropImage(COLORS.yellow);
                case BIKE_STATUS.RENTAL:
                    return getDropImage(COLORS.yellow);
                case BIKE_STATUS.PAUSED:
                    return getDropImage(COLORS.darkGreen);
                default:
                    return getDropImage(COLORS.lightGrey, COLORS.black);
            }
        } else {
            return null;
        }
    };

    const renderBattery = (element: Bike) => {
        if (element.capacity) {
            return getBattery(element);
        } else {
            return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderName(element)}
            {renderIcon(element)}
        </View>
    );
});

export default MarkerBike;

const styles = StyleSheet.create({
    container: {
        height: 66,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 14,
        color: "white",
        padding: 2,
        fontWeight: "bold",
        textAlign: "center"
    },
    pin: {
        width: 35,
        height: 46,
    },
    battery: {
        position: "absolute",
        left: "70%",
        top: "75%",
        width: "25%",
        height: "25%"
    },
    AVAILABLE: {
        backgroundColor: COLORS.lightBlue,
    },
    USED: {
        backgroundColor: COLORS.green,
    },
    MAINTENANCE: {
        backgroundColor: COLORS.purple,
    },
    STOLEN: {
        backgroundColor: COLORS.red,
    },
    BOOKED: {
        backgroundColor: COLORS.yellow,
    },
    RENTAL: {
        backgroundColor: COLORS.yellow,
    },
    PAUSED: {
        backgroundColor: COLORS.darkGreen,
    },
    GREY: {
        backgroundColor: COLORS.darkGrey,
    },
    SPOT: {
        backgroundColor: COLORS.green,
    }
});
