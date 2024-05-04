import {BASE, BikeParts} from "@assets/index";
import {BikePartType} from "@models/types";
import {useFocusEffect} from "@react-navigation/native";
import React, {FC, useCallback, useEffect} from "react";
import {StyleSheet, View, ViewProps} from "react-native";

import {BikePart} from "./BikePart";

interface Props extends ViewProps {
    value?: string[]
    selection?: string[] | null,
    onChange?: (selection: string[]) => void,
}

export const BikePartList: FC<Props> = ({
    value,
    selection,
    onChange,
    ...props
}): React.ReactElement => {
    const bikeParts = (BikeParts as BikePartType[]);

    const [parts, setParts] = React.useState<BikePartType[]>([]);
    const [selectedPart, setSelectedPart] = React.useState<string[]>([]);

    const handleSelectedPart = (part: string) => {
        const isIn = selectedPart.includes(part);
        let newSelection = selectedPart;
        if (isIn) {
            newSelection = selectedPart.filter(el => el !== part);
            setSelectedPart(newSelection);
        } else {
            newSelection = [...selectedPart, part];
            setSelectedPart(newSelection);
        }
        if (typeof onChange !== "undefined") {
            onChange(newSelection);
        }
    };

    useFocusEffect(
        useCallback(() => {
            let newParts = [];
            if (selection) {
                for (const part of bikeParts) {
                    if (selection.includes(part.label)) {
                        newParts.push(part);
                    }
                }
            } else {
                newParts = bikeParts;
            }
            setParts(newParts);
        }, [])
    );

    useEffect(() => {
        setSelectedPart(value ?? []);
    }, [value]);

    return (
        <View style={styles.bikePartContainer}>
            {
                parts.map((item, key) => {
                    return <BikePart
                        key={key}
                        item={item}
                        setSelectedPart={handleSelectedPart}
                        isSelected={selectedPart.includes(item.label)}/>;
                })
            }
        </View>
    );
};

const styles = StyleSheet.create({
    bikePartContainer: {
        // flex: 1,
        flexWrap: "wrap",
        justifyContent: "space-evenly",
        alignItems: "center",
        alignSelf: "center",
        flexDirection: "row",
        width: BASE.window.width - 20,
    },
});
