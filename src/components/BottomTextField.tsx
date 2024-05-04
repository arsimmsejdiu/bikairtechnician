import {BASE, COLORS, FeatherIcon} from "@assets/index";
import React, {FC, useState} from "react";
import {useTranslation} from "react-i18next";
import {ActivityIndicator, KeyboardAvoidingView, Platform, StyleSheet, TextInput, View, ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

interface Props extends ViewProps {
    loading?: boolean
    onSubmit?: (value: string) => void
}

export const BottomTextField: FC<Props> = (
    {
        loading,
        onSubmit,
    }): React.ReactElement => {

    const [value, setValue] = useState("");
    const {t} = useTranslation();

    const handleOnPress = () => {
        if (typeof onSubmit !== "undefined") {
            onSubmit(value);
        }
    };

    const handleValueChange = (newValue: string) => {
        setValue(newValue);
    };

    return (
        <KeyboardAvoidingView
            style={[styles.formWrapper]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.formContainer}>
                <View style={{width: "95%"}}>
                    <TextInput
                        placeholder={t("permissions.camera_location.bike_number") ?? "Numéro de vélo"}
                        placeholderTextColor={COLORS.inputGrey}
                        onChangeText={handleValueChange}
                        style={{
                            backgroundColor: "transparent",
                            color: COLORS.black,
                            width: "90%"
                        }}
                        onSubmitEditing={handleOnPress}
                        autoCorrect={false}
                    />
                </View>

                <View style={{position: "absolute", right: 20}}>
                    <TouchableOpacity
                        disabled={loading}
                        onPress={handleOnPress}>
                        {
                            loading ?
                                <ActivityIndicator color={COLORS.lightBlue} size={20}/>
                                : <FeatherIcon name={"arrow-right"} size={20} color={"black"}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    formWrapper: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center"
    },
    formContainer: {
        width: BASE.window.width - 20,
        position: "relative",
        minHeight: 50,
        flexDirection: "row",
        padding: 4,
        alignItems: "center",
        borderWidth: 1,
        marginBottom: 65,
        borderColor: COLORS.lightGrey,
        borderRadius: BASE.radius.main,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.35,
    },
});
