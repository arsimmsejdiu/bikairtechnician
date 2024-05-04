import {pickerSelectStyles} from "@styles/BikeStatusAndTagsStyles";
import React from "react";
import {Platform, Text, View} from "react-native";
import DropDownPicker, {ItemType} from "react-native-dropdown-picker";

import {BikeStatusType} from "@bikairproject/shared";

interface BikeStatusPickerProps {
    value: BikeStatusType | null,
    items: ItemType<BikeStatusType>[],
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<BikeStatusType | null>>
    onPress: React.Dispatch<React.SetStateAction<boolean>>,
    zIndex: number,
    zIndexInverse: number,
    style: any,
    text: string

}
export const BikeStatusPicker = ({text, style, value, items, open, setOpen, setValue, onPress, zIndex, zIndexInverse}: BikeStatusPickerProps) => {
    return (
        <View style={style}>
            <Text style={pickerSelectStyles.text}>{text}</Text>
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
}
