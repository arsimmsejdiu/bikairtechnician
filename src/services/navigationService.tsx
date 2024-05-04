import {COLORS, FontAwesomeIcon} from "@assets/index";
import {StackNavigationOptions} from "@react-navigation/stack";
import {BikeCreateStackScreenProps} from "@stacks/types";
import React from "react";

export const headerOptionLock = (props: BikeCreateStackScreenProps<"AddLock">): StackNavigationOptions => {
    const {route} = props;
    return {
        headerShown: true,
        title: route?.params?.context === "create" ? "Ajouter un vélo" : "Modifier le cadenas",
    };
};

export const headerOptionTracker = (props: BikeCreateStackScreenProps<"AddTracker">): StackNavigationOptions => {
    const {route} = props;
    return {
        headerShown: true,
        title: route?.params?.context === "create" ? "Ajouter un vélo" : "Modifier le traqueur",
    };
};

export const selectTabBarIcon = (iconName: string) => (): React.ReactNode => {
    return <FontAwesomeIcon
        name={iconName}
        color={COLORS.black}
    />;
};
