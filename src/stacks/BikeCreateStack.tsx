import {createStackNavigator} from "@react-navigation/stack";
import {AddBikeScreen} from "@screens/AddBikeScreen";
import {QrReaderScreen} from "@screens/QrReaderScreen";
import {SetBikeLockScreen} from "@screens/SetBikeLockScreen";
import {SetBikeTrackerScreen} from "@screens/SetBikeTrackerScreen";
import {ValidateAddBikeScreen} from "@screens/ValidateAddBikeScreen";
import {headerOptionLock, headerOptionTracker} from "@services/navigationService";
import React, {memo} from "react";
import {useTranslation } from "react-i18next";

// Screens
import {BikeCreateStackParamList} from "./types";

const Stack = createStackNavigator<BikeCreateStackParamList>();

const BikeCreateStack = () => {
    const {t} = useTranslation();
    return (
        <Stack.Navigator initialRouteName="AddBike">
            <Stack.Screen name="AddBike"
                options={{headerShown: true, headerTitle: t("bottom_tabs.add_bike") ?? "Ajouter vélo"}}
                component={AddBikeScreen}/>
            <Stack.Screen name="AddLock"
                options={headerOptionLock}
                component={SetBikeLockScreen}/>
            <Stack.Screen name="AddTracker"
                options={headerOptionTracker}
                component={SetBikeTrackerScreen}/>
            <Stack.Screen name="Validate"
                options={{headerShown: true, headerTitle: t("bottom_tabs.add_bike") ?? "Ajouter vélo"}}
                component={ValidateAddBikeScreen}/>
            <Stack.Screen name="QrReader"
                options={{headerShown: true, headerTitle: t("bottom_tabs.qr_reading") ?? "Lecture QR"}}
                component={QrReaderScreen}/>
        </Stack.Navigator>
    );
};

export default memo(BikeCreateStack);
