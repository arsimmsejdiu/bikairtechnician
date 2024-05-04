import {pickerSelectStyles} from "@styles/BikeStatusAndTagsStyles";
import React from "react";
import {Platform, Text, View} from "react-native";
import DropDownPicker, {ItemType} from "react-native-dropdown-picker";

import {BikeTagType} from "@bikairproject/shared";

interface BikeTagPickerProps {
    value: BikeTagType[],
    items: ItemType<BikeTagType>[],
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setValue: React.Dispatch<React.SetStateAction<BikeTagType[]>>
    onPress: React.Dispatch<React.SetStateAction<boolean>>,
    zIndex: number,
    zIndexInverse: number,
    style: any,
    text: string,
    mode: "DEFAULT" | "SIMPLE" | "BADGE",

}
export const BikeTagPicker = ({mode, text, style, value, items, open, setOpen, setValue, onPress, zIndex, zIndexInverse}: BikeTagPickerProps) => {
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
                mode={mode}
                multiple
                setValue={setValue}
                onPress={onPress}
            />
        </View>
    );
};
