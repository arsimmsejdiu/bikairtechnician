import {createStackNavigator} from "@react-navigation/stack";
// Screens
import BikeListScreen from "@screens/BikeListScreen";
import BikeScreen from "@screens/BikeScreen";
import ReportScreen from "@screens/ReportScreen";
import ReportSelectScreen from "@screens/ReportSelectScreen";
import ScannerScreen from "@screens/ScannerScreen";
import StatusScreen from "@screens/StatusScreen";
import React, {memo} from "react";
import {useTranslation} from "react-i18next";

import {BikeStackParamList} from "./types";


// TODO Remove un-use file and cleanup all (DONE)
const Stack = createStackNavigator<BikeStackParamList>();

const BikeStack = () => {
    const {t} = useTranslation();

    return (
        <Stack.Navigator initialRouteName="BikeList">
            <Stack.Screen name="BikeList" options={{headerShown: false}} component={BikeListScreen}/>

            <Stack.Screen
                name="Bike"
                options={{headerShown: false, headerTitle: t("bottom_tabs.bike_info") ?? "Infos vélo"}}
                component={BikeScreen}
            />
            <Stack.Screen
                name="Status"
                options={{headerShown: true, headerTitle: t("bottom_tabs.status") ?? "Status"}}
                component={StatusScreen}
            />
            <Stack.Screen
                name="BikeScanner"
                options={{headerShown: true, headerTitle: t("bottom_tabs.scanner") ?? "Scanner"}}
                component={ScannerScreen}
            />
            <Stack.Screen
                name="Report"
                options={{headerShown: true, headerTitle: t("bottom_tabs.report") ?? "Rapport"}}
                component={ReportScreen}
            />
            <Stack.Screen
                name="ReportSelect"
                options={{headerShown: true, headerTitle: t("bottom_tabs.report_select") ?? "Rapport sélectionné"}}
                component={ReportSelectScreen}
            />
        </Stack.Navigator>
    );
};

export default memo(BikeStack);
