import {COLORS} from "@assets/constant";
import {FeatherIcon} from "@assets/icons/icons";
import {useAppSelector} from "@hooks/index";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {RouteProp} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";
import HomeScreen from "@screens/HomeScreen";
import LogoutScreen from "@screens/LogoutScreen";
import React, {memo} from "react";
import {useTranslation} from "react-i18next";
import {Text, View} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import BikeCreateStack from "./BikeCreateStack";
import BikeStack from "./BikeStack";
import {BottomTabsParamList} from "./types";

const Tab = createBottomTabNavigator<BottomTabsParamList>();
type tabBarListenersType = {
    navigation: StackNavigationProp<BottomTabsParamList>,
    route: RouteProp<BottomTabsParamList>
}

const BottomTabs = () => {
    const user = useAppSelector(state => state.auth.me);
    const {t} = useTranslation();
    const insets = useSafeAreaInsets();

    const tabBarListeners = ({navigation, route}: tabBarListenersType) => ({
        tabPress: (data: any) => {
            data.preventDefault();
            if (route.name === "BikeStack") {
                navigation.navigate(route.name, {screen: "BikeList"});
            } else if (route.name === "BikeConfigStack") {
                navigation.navigate(route.name, {screen: "AddBike"});
            }
        }
    });

    return (
        <Tab.Navigator screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 75,
                paddingTop: 20,
                paddingBottom: insets.bottom
            },
        }}>
            <Tab.Screen
                name="Home"
                options={{
                    title: t("bottom_tabs.map") ?? "Carte",
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: focused ? "#f0f5fd" : COLORS.white,
                                paddingHorizontal: 10,
                                bottom: 10,
                                borderRadius: 10,
                                marginLeft: 15
                            }}>
                                <FeatherIcon
                                    style={{marginLeft: 10}}
                                    name={"map"}
                                    color={COLORS.black}
                                    size={focused ? 20 : 20}
                                />
                                {focused ? (<Text style={{
                                    marginLeft: 10,
                                    color: COLORS.black,
                                    fontSize: 14,
                                    fontWeight: "bold"
                                }}>{t("bottom_tabs.map")}</Text>) : null}
                            </View>
                        );
                    }
                }}
                component={HomeScreen}
            />
            <Tab.Screen
                name="BikeStack"
                options={{
                    title: t("bottom_tabs.list_of_bikes") ?? "Liste",
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: focused ? "#f0f5fd" : COLORS.white,
                                paddingHorizontal: 10,
                                bottom: 10,
                                borderRadius: 10,
                                marginLeft: 15
                            }}>
                                <FeatherIcon
                                    name={"list"}
                                    color={COLORS.black}
                                    size={focused ? 25 : 20}
                                />
                                {focused ? (<Text style={{
                                    marginLeft: 10,
                                    color: COLORS.black,
                                    fontSize: 16,
                                    fontWeight: "bold"
                                }}>List</Text>) : null}
                            </View>
                        );
                    }
                }}
                component={BikeStack}
                listeners={tabBarListeners}

            />
            {user?.access_rights.includes("UPDATE_BIKE_PARTS") &&
                (
                    <Tab.Screen
                        name="BikeConfigStack"
                        options={{
                            title: t("bottom_tabs.add_bike") ?? "Ajouter",
                            tabBarIcon: ({focused}) => {
                                return (
                                    <View style={{
                                        flex: 1,
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: focused ? "#f0f5fd" : COLORS.white,
                                        paddingHorizontal: 20,
                                        bottom: 10,
                                        borderRadius: 10,
                                        marginLeft: 15
                                    }}>
                                        <FeatherIcon
                                            name={"plus-circle"}
                                            color={COLORS.black}
                                            size={focused ? 25 : 20}
                                        />
                                        {focused ? (<Text numberOfLines={1} adjustsFontSizeToFit style={{
                                            marginLeft: 5,
                                            color: COLORS.black,
                                            fontSize: 16,
                                            fontWeight: "bold"
                                        }}>Ajouter</Text>) : null}
                                    </View>
                                );
                            }
                        }}
                        component={BikeCreateStack}
                        listeners={tabBarListeners}
                    />
                )}
            <Tab.Screen
                name="Logout"
                options={{
                    title: t("bottom_tabs.logout") ?? "Déconnexion",
                    tabBarIcon: ({focused}) => {
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: focused ? "#f0f5fd" : COLORS.white,
                                paddingHorizontal: 10,
                                bottom: 10,
                                borderRadius: 10,
                                marginLeft: 15
                            }}>
                                <FeatherIcon
                                    name={"log-out"}
                                    color={COLORS.black}
                                    size={focused ? 25 : 20}
                                />
                            </View>
                        );
                    }
                }}
                component={LogoutScreen}
            />
        </Tab.Navigator>
    );
};

export default memo(BottomTabs);
