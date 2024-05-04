import {COLORS, FeatherIcon} from "@assets/index";
import React, {FC, memo,useEffect} from "react";
import {StyleSheet, TouchableOpacity, View, ViewProps} from "react-native";

interface Props extends ViewProps {
    filter: boolean,
    onFilterChange: (filter: boolean) => void,
}

export const SpotFilter: FC<Props> = ({
    filter,
    onFilterChange,
}): React.ReactElement => {
    const [color, setColor] = React.useState(filter ? COLORS.green : COLORS.darkGrey);

    const filterOnPress = () => {
        onFilterChange(!filter);

    };

    useEffect(() => {
        setColor(filter ? COLORS.green : COLORS.darkGrey);
    }, [filter]);

    return (
        <View style={{marginBottom: 10}}>
            <TouchableOpacity onPress={filterOnPress}>
                <View
                    style={{
                        ...styles.control,
                        backgroundColor: color
                    }}>
                    <FeatherIcon
                        name="map-pin"
                        size={30}
                        color="white"
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    control: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.5,
        shadowRadius: 25,
    },
});

export default memo(SpotFilter);
