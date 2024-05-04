import {pickerSelectStyles} from "@styles/BikeStatusAndTagsStyles";
import React from "react";
import {Platform, Text, View} from "react-native";
import DropDownPicker, {ItemType} from "react-native-dropdown-picker";

interface BikeCityPickerProps {
    value: number | null,
    items: ItemType<number>[],
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<number | null>>
    onPress: React.Dispatch<React.SetStateAction<boolean>>,
    zIndex: number,
    zIndexInverse: number,
    style: any,
    text: string

}
export const BikeCityPicker = ({text, style, value, items, open, setOpen, setValue, onPress, zIndex, zIndexInverse}: BikeCityPickerProps) => {
    return (
        <View style={style}>
            <Text style={pickerSelectStyles.text}>
                {text}
            </Text>
            <DropDownPicker
                zIndex={zIndex}
                zIndexInverse={zIndexInverse}
                style={
                    Platform.OS === "android"
                        ? pickerSelectStyles.inputAndroid
                        : pickerSelectStyles.inputIOS
                }
                value={value}
                items={items}
                open={open}
                setOpen={setOpen}
                setValue={setValue}
                onPress={onPress}
            />
        </View>
    );
};
