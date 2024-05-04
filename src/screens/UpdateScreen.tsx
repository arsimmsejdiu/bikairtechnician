import {COLORS} from "@assets/index";
import {AuthStackScreenProps} from "@stacks/types";
import {updateStyles} from "@styles/ScreenStyles";
import React from "react";
import {useTranslation} from "react-i18next";
import {StatusBar, Text, View, ViewProps} from "react-native";

interface Props extends ViewProps, AuthStackScreenProps<"Update"> {
}

const UpdateScreen: React.FC<Props> = (): React.ReactElement => {
    const {t} = useTranslation();

    return (
        <View style={updateStyles.container}>
            <StatusBar
                backgroundColor={COLORS.lightGrey}
                barStyle={"dark-content"}
            />

            <View>
                <Text style={updateStyles.title}>{t("update_screen.update_necessary")}</Text>
                <Text style={updateStyles.instruction}>
                    {t("update_screen.benefit_last_functionalities")}
                </Text>
                <Text style={updateStyles.instruction}>
                    {t("update_screen.benefit_last_version")}
                </Text>
            </View>
        </View>
    );
};

export default UpdateScreen;


