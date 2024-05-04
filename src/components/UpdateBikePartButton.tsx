import {COLORS} from "@assets/constant";
import {useAppSelector} from "@hooks/useAppSelector";
import {BikeStackScreenProps} from "@stacks/types";
import {bikeStyles} from "@styles/ScreenStyles";
import React from "react";
import {useTranslation} from "react-i18next";
import {Alert, Text, TouchableOpacity, View, ViewProps} from "react-native";

interface Props extends ViewProps, BikeStackScreenProps<"Bike"> {
}

export const UpdateBikePartButton: React.FC<Props> = ({navigation}): React.ReactElement => {
    const user = useAppSelector(state => state.auth.me);
    const bike = useAppSelector(state => state.bike.currentBike);

    const {t} = useTranslation();

    const handleUpdateTracker = async () => {
        try {
            if (!bike) {
                return;
            }

            navigation.navigate("BikeConfigStack", {
                screen: "AddTracker",
                params: {
                    context: "update",
                    bikeId: bike.id
                }
            });
        } catch (err: any) {
            console.log(err);
            Alert.alert(err.message);
        }
    };

    const handleUpdateLock = async () => {
        try {
            if (!bike) {
                return;
            }
            navigation.navigate("BikeConfigStack", {
                screen: "AddLock",
                params: {
                    context: "update",
                    bikeId: bike.id
                }
            });
        } catch (err: any) {
            console.log(err);
            Alert.alert(err.message);
        }
    };

    const renderUpdateBikePartButton = () => {
        if (user?.access_rights.includes("UPDATE_BIKE_PARTS")) {
            return (
                <View style={{
                    paddingHorizontal: 10,
                }}>
                    <View style={{
                        backgroundColor: COLORS.lightGrey,
                        marginBottom: 20,
                        borderRadius: 10,
                    }}>
                        <Text style={{textAlign: "center", fontSize: 18, marginTop: 10, color: "black"}}>
                            {t("bike_info_screen.change_bike_components")}
                        </Text>
                        <View style={{justifyContent: "space-around", flexDirection: "row"}}>
                            <TouchableOpacity
                                style={bikeStyles.buttonPadlock}
                                onPress={handleUpdateLock}>
                                <Text style={{color: COLORS.white, padding: 10, fontWeight: "bold"}}>
                                    {t("bike_info_screen.change_lock")}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={bikeStyles.buttonTracker}
                                onPress={handleUpdateTracker}>
                                <Text style={{color: COLORS.white, padding: 10, fontWeight: "bold"}}>
                                    {t("bike_info_screen.change_tracker")}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            );
        }
    };
    
    return (
        <View>
            {renderUpdateBikePartButton()}
        </View>
    );
};
