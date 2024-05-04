import {COLORS} from "@assets/index";
import React, {FC, memo} from "react";
import {StyleSheet, Text, TouchableOpacity, ViewProps} from "react-native";
import openMap from "react-native-open-maps";
import Icon from "react-native-vector-icons/FontAwesome";

interface Props extends ViewProps {
    address?: string
}

const Address: FC<Props> = ({address}): React.ReactElement => {

    const goToMaps = () => {
        openMap({end: address, provider: "google"});
    };

    return (
        <TouchableOpacity style={styles.addressContainer} onPress={goToMaps}>
            <Icon name={"map"} size={25} color={"black"}/>
            <Text style={styles.address}>{address}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    addressContainer: {
        flexDirection: "row",
        color: "black",
        alignItems: "center"
    },
    address: {
        textDecorationLine: "underline",
        color: COLORS.black,
        fontWeight: "700",
        fontSize: 14,
        paddingLeft: 10,
        paddingRight: 10
    }
});

export default memo(Address);
