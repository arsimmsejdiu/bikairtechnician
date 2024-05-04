import {BASE, COLORS, FontAwesomeIcon, Parking, SHADOW} from "@assets/index";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {selectSpot} from "@redux/reducers/spot";
import React, {memo} from "react";
import {Image, Platform, StyleSheet, Text, TouchableOpacity, View, ViewProps} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import Address from "./Address";

interface Props extends ViewProps {
    onClose?: () => void;
}

const MarkerDetailsSpot: React.FC<Props> = React.memo<Props>(({onClose}): React.ReactElement | null => {
    const spot = useAppSelector(state => state.spot.currentSpot);
    const dispatch = useAppDispatch();

    const handleClose = () => {
        if (typeof onClose !== "undefined") {
            onClose();
        }
        dispatch(selectSpot(null));
    };

    if (!spot) return null;

    const handleColor = () => {
        if (!spot || !spot.max_bikes) return "transparent";
        if (!spot.bike_ids) return COLORS.lightGrey;

        if (spot.bike_ids.length > spot.max_bikes) {
            return COLORS.yellow;
        }
        if (spot.bike_ids.length < spot.max_bikes) {
            return COLORS.red;
        }
        if (spot.bike_ids.length === spot.max_bikes) {
            return COLORS.green;
        }
    };

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
                <Image source={Parking} style={{width: 50, height: 50}} resizeMode={"contain"}/>
                <View style={{
                    marginLeft: 10,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                    <Text style={styles.spotName}>{spot.name}</Text>
                    <Icon
                        name={"circle"}
                        size={20}
                        color={handleColor()}
                    />
                    {spot.max_bikes ? (
                        <Text style={{marginLeft: 10, fontSize: 18, textAlign: "center"}}>
                            {spot.nb_bikes}/{spot.max_bikes} places
                        </Text>
                    ) : null}
                </View>
            </View>
            <View style={{
                paddingVertical: 10
            }}>
                <Address address={spot.address ?? undefined}/>
            </View>
        </View>
    );
});

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
    spotName: {
        fontSize: 20,
        fontWeight: "700",
        backgroundColor: "white",
        color: "black",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 4,
        paddingBottom: 4
    },
});

export default memo(MarkerDetailsSpot);
