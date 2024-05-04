import {COLORS} from "@assets/constant";
import {useAppDispatch} from "@hooks/useAppDispatch";
import {useAppSelector} from "@hooks/useAppSelector";
import {updateBikeCache} from "@redux/reducers/bike";
import {updateBikeAddress, updateBikePosition} from "@services/bikesService";
import {bikeStyles} from "@styles/ScreenStyles";
import {getPosition} from "@utils/helpers";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Text, TouchableOpacity, View} from "react-native";

export const UpdateAddressButton = () => {
    const bike = useAppSelector(state => state.bike.currentBike);
    const user = useAppSelector(state => state.auth.me);
    const [loadingAddress, setLoadingAddress] = useState(false);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const handleUpdateAddress = async () => {
        try {
            setLoadingAddress(true);
            if (!bike) {
                return;
            }
            const data = await updateBikeAddress(bike);
            const newBike = {
                ...bike,
                address: data.address
            };
            dispatch(updateBikeCache(newBike));
        } catch (err) {
            console.log(err);
        } finally {
            setLoadingAddress(false);
        }
    };

    const handleUpdatePosition = async () => {
        try {
            const locations: any = await getPosition();
            if (!locations.coords) {
                Alert.alert(t("bike_info_screen.geolocation_on"));
                return;
            }
            const {latitude, longitude} = locations.coords;
            setLoadingAddress(true);
            if (!bike) {
                return;
            }
            const data = await updateBikePosition(bike.id, latitude, longitude);
            const newBike = {
                ...bike,
                address: data.address
            };
            dispatch(updateBikeCache(newBike));
        } catch (err: any) {
            console.log(err);
            Alert.alert(err.message);
        } finally {
            setLoadingAddress(false);
        }
    };

    const renderUpdateAddressButton = () => {
        if (user?.access_rights.includes("UPDATE_BIKE_ADDRESS")) {
            return (
                <View style={{justifyContent: "space-between", flexDirection: "row", width: "100%"}}>
                    <TouchableOpacity
                        style={bikeStyles.buttonAddress}
                        onPress={handleUpdateAddress}>
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{color: COLORS.black, padding: 5, fontWeight: "bold", fontSize: 12}}>
                            {loadingAddress ? t("bike_info_screen.loading") : t("bike_info_screen.update_address")}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={bikeStyles.buttonPosition}
                        onPress={handleUpdatePosition}>
                        <Text
                            numberOfLines={1}
                            adjustsFontSizeToFit
                            style={{color: COLORS.black, padding: 5, fontWeight: "bold", fontSize: 12}}>
                            {loadingAddress ? t("bike_info_screen.loading") : t("bike_info_screen.update_position")}
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    };
    return (
        <View>
            {renderUpdateAddressButton()}
        </View>
    );
};
