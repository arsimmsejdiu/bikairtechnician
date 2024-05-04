import {BASE, COLORS, FontAwesomeIcon, Iconbike,SHADOW} from "@assets/index";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {selectBike} from "@redux/reducers/bike";
import React from "react";
import {useTranslation} from "react-i18next";
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View, ViewProps,} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Address from "./Address";
import {BIKE_STATUS} from "@bikairproject/shared";

interface Props extends ViewProps {
    onOpenDetails?: () => void,
    onClose?: () => void
}

const MarkerDetailsBike: React.FC<Props> = ({onOpenDetails, onClose}): React.ReactElement | null => {
    const {t} = useTranslation();
    const isFetching = useAppSelector(state => state.global.isFetching);
    const bike = useAppSelector(state => state.bike.currentBike);
    const dispatch = useAppDispatch();

    const onDetailsClick = () => {
        if (typeof onOpenDetails !== "undefined") {
            onOpenDetails();
        }
    };

    const handleClose = () => {
        if (typeof onClose !== "undefined") {
            onClose();
        }
        dispatch(selectBike(null));
    };

    const getColor = (status: string) => {
        switch (status) {
            case BIKE_STATUS.AVAILABLE:
                return COLORS.darkBlue;
            case BIKE_STATUS.BOOKED:
                return COLORS.yellow;
            case BIKE_STATUS.USED:
                return COLORS.green;
            case BIKE_STATUS.MAINTENANCE:
                return COLORS.purple;
            case BIKE_STATUS.RENTAL:
                return COLORS.yellow;
            default:
                return COLORS.white;
        }
    };

    const handleColor = () => {
        if (!bike || !bike.capacity) return "transparent";
        if (!bike.capacity) return COLORS.lightGrey;

        if (bike.capacity > 25 && bike.capacity <= 35) {
            return COLORS.yellow;
        }
        if (bike.capacity > 15 && bike.capacity <= 25) {
            return COLORS.orange;
        }
        if (bike.capacity <= 15) {
            return COLORS.red;
        }
        if (bike.capacity > 35) {
            return COLORS.green;
        }
    };

    if (!bike) return null;

    return (
        <View style={styles.modalContainer}>
            <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                <FontAwesomeIcon
                    name={"close"}
                    size={30}
                    color="red"
                />
            </TouchableOpacity>

            <View style={styles.container}>
                <Image source={Iconbike} style={{width: 70, height: 70}} resizeMode={"contain"}/>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center"
                }}>
                    <View style={{
                        flexDirection: "column",
                        marginLeft: 10,
                        justifyContent: "flex-start",
                        alignItems: "flex-start"
                    }}>
                        <Text style={styles.bikeName}>{t("marker_details_bike.bike")}: {bike.name}</Text>
                        <View style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "flex-start"
                        }}>
                            <Text
                                style={styles.bikeEtat}>{t("marker_details_bike.state")}: {t(`bike.status.${bike.status}`)}</Text>
                            <Icon
                                name={"circle"}
                                style={{marginLeft: 10}}
                                size={25}
                                color={getColor(bike.status)}
                            />
                        </View>
                    </View>
                </View>
            </View>
            <View style={{
                paddingVertical: 10,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Address address={bike.address ?? undefined}/>
            </View>
            <View style={styles.batteryContainer}>
                <Icon name={"battery-2"} size={25} color={handleColor()}/>
                <Text style={styles.battery}>
                    {t("marker_details_bike.battery")}:
                    {!bike.capacity ? "0 km" : ` ${bike.capacity} km`}
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    disabled={isFetching}
                    onPress={onDetailsClick}
                    style={{
                        ...styles.submitButton,
                        backgroundColor: isFetching ? "grey" : "#287CC2",
                    }}>
                    <Text style={{
                        color: "white",
                        fontSize: 15
                    }}>{isFetching ? t("marker_details_bike.loading") : t("marker_details_bike.details")}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        position: "absolute",
        padding: 20,
        marginTop: Platform.OS === "ios" ? 70 : 90,
        backgroundColor: "white",
        width: BASE.window.width - 40,
        borderRadius: 15,
        boxShadow: SHADOW,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
    },
    closeButton: {
        position: "absolute",
        right: 10,
        top: 10
    },
    container: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    bikeName: {
        fontSize: 18,
        fontWeight: "700",
        color: "black",
    },
    bikeEtat: {
        fontSize: 18,
        fontWeight: "700",
        color: "black",
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    submitButton: {
        width: 200,
        height: 40,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    batteryContainer: {
        flexDirection: "row",
        paddingVertical: 10,
        color: "black",
        alignItems: "center",
        justifyContent: "center"
    },
    battery: {
        color: "black",
        fontSize: 16,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default MarkerDetailsBike;
