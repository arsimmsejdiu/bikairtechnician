import {BASE, COLORS, FeatherIcon,SHADOW} from "@assets/index";
import React, {FC, memo} from "react";
import {Keyboard, StyleSheet, TextInput, TouchableOpacity, View, ViewProps} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

interface Props extends ViewProps {
    onPress: (bikeName: string) => void,
    placeholder: string,
    live?: boolean
}

const SearchBar: FC<Props> = ({
    onPress,
    placeholder,
    live
}): React.ReactElement => {
    const [text, onChangeText] = React.useState("");

    const insets = useSafeAreaInsets();

    const handleOnPress = () => {
        Keyboard.dismiss();
        onPress(text);
    };

    const setText = (text: string) => {
        onChangeText(text);
        if (live) onPress(text);
    };

    return (
        <View style={{
            ...styles.container,
            top: styles.container.top + insets.top,
        }}>
            <TextInput
                autoCapitalize={"characters"}
                style={styles.input}
                onChangeText={setText}
                value={text}
                placeholder={placeholder}
                placeholderTextColor={COLORS.darkGrey}
                onSubmitEditing={handleOnPress}
            />
            <TouchableOpacity onPress={() => handleOnPress()}>
                <FeatherIcon style={styles.icon} name={"search"} size={20} color={"black"}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 10,
        backgroundColor: COLORS.white,
        width: BASE.window.width - BASE.margin,
        boxShadow: SHADOW,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,

        elevation: 16,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: BASE.radius.main
    },
    icon: {
        padding: 10,
        marginRight: 10,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 0,
        padding: 10,
        color: COLORS.black
    },
});

export default memo(SearchBar);
