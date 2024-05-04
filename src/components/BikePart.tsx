import {BikePartType} from "@models/types";
import React, {FC} from "react";
import {StyleSheet, Text, View, ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import {COLORS, FontelloIcon,FONTS} from "../assets/index";

interface Props extends ViewProps {
    item: BikePartType,
    setSelectedPart: (part: string) => void,
    isSelected: boolean,
}

export const BikePart: FC<Props> = ({
    item,
    setSelectedPart,
    isSelected,
}): React.ReactElement => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => setSelectedPart(item.label)}
                style={[
                    styles.flatList,
                    {
                        backgroundColor: isSelected
                            ? COLORS.yellow
                            : "#F7F7F7",
                    },
                ]}>
                <FontelloIcon
                    name={item.sources}
                    color={COLORS.darkGrey}
                    size={25}
                />
                <Text style={styles.textFlatList}>{item.label}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    flatList: {
        borderWidth: 1,
        borderColor: COLORS.darkGrey,
        borderRadius: 10,
        marginHorizontal: 5,
        marginVertical: 5,
        height: 80,
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F7F7F7",
    },
    textFlatList: {
        fontFamily: FONTS.main,
        textAlign: "center",
        padding: 2,
        color: COLORS.black
    },
});
