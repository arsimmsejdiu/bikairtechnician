import {COLORS} from "@assets/constant";
import {TextAtom} from "@components/Atom/TextAtom";
import {useAppSelector} from "@hooks/useAppSelector";
import {Ekey} from "@models/dto/Ekey";
import RequestBluetoothPermission from "@permissions/BluetoothPermission";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import Locker from "@services/Locker";
import {bikeStyles} from "@styles/ScreenStyles";
import {GET_BIKES_EKEY, POST_LOCKS_NOTIFICATION} from "@utils/endPoints";
import {getPosition} from "@utils/helpers";
import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, TouchableOpacity, View} from "react-native";

interface OpenCloseButtonProp {
    setModalVisible: any,
    setLockAction: any,
}

export const OpenCloseButton = ({setModalVisible, setLockAction}: OpenCloseButtonProp) => {
    const [loadingLock, setLoadingLock] = useState(false);
    const user = useAppSelector(state => state.auth.me);
    const bike = useAppSelector(state => state.bike.currentBike);
    const {t} = useTranslation();

    const notifyLockChangeToBackEnd = async (lat: number, lng: number, action: string, bikeUuid: string) => {
        try {
            const args = {
                bike_uuid: bikeUuid,
                lat: lat,
                lng: lng,
                action: action
            };
            await instanceaxiosApi.post(POST_LOCKS_NOTIFICATION, args);

        } catch (err) {
            console.log(err);
        }
    };

    const handleSetModalLock = async (action: string) => {
        await RequestBluetoothPermission();
        if (bike === null) {
            return;
        }
        try {
            setLoadingLock(true);
            setModalVisible(true);
            const bleState = await Locker.getBleState();
            if (bleState === "PoweredOff") {
                setModalVisible(false);
                Alert.alert(t("bike_info_screen.bluetooth_on"));
                return;
            }

            setLockAction(action);
            const locations = await getPosition();
            if (!locations.coords) {
                Alert.alert(t("bike_info_screen.geolocation_on"));
                return;
            }
            const {latitude, longitude} = locations.coords;

            await Locker.disconnect();
            const {data} = await instanceaxiosApi.get<Ekey>(GET_BIKES_EKEY(bike.id));
            const connectionStatus = await Locker.scanAndConnect(data);
            if (connectionStatus === "CONNECTED") {
                const lockState = await Locker.getState();
                if (action === "open" && lockState.length > 0 && lockState[0] === "open") {
                    Alert.alert(t("bike_info_screen.open_already"));
                    await Locker.disconnect();
                    return;
                }
                if (action === "close" && lockState.length > 0 && lockState[0] === "close") {
                    Alert.alert(t("bike_info_screen.close_already"));
                    await Locker.disconnect();
                    return;
                }
                await Locker.write();
                await notifyLockChangeToBackEnd(latitude, longitude, action, bike.uuid);
            } else {
                Alert.alert(t("bike_info_screen.error_connecting_lock"));
            }
        } catch (err: any) {
            console.log(err);
            Alert.alert(err?.message ?? t("bike_info_screen.error_handling_lock"));
        } finally {
            setModalVisible(false);
            setLoadingLock(false);
        }
    };

    return (
        <View>
            {
                user?.access_rights.includes("LOCK_ACCESS") ?
                    <View style={{
                        paddingHorizontal: 10,
                    }}>
                        <View style={{
                            backgroundColor: COLORS.lightGrey,
                            marginBottom: 20,
                            borderRadius: 10,
                            padding: 15,
                        }}>
                            <View style={bikeStyles.container}>
                                <TextAtom style={{
                                    textAlign: "center",
                                    fontSize: 18,
                                    color: COLORS.black
                                }}>
                                    {t("bike_info_screen.opening_closing")}
                                </TextAtom>
                                <View
                                    style={{justifyContent: "space-around", flexDirection: "row"}}>
                                    <TouchableOpacity
                                        disabled={loadingLock}
                                        style={bikeStyles.buttonOpen}
                                        onPress={() => handleSetModalLock("open")}>
                                        <TextAtom style={{
                                            color: COLORS.white,
                                            fontSize: 18,
                                            fontWeight: "bold"
                                        }}>
                                            {t("bike_info_screen.opening")}
                                        </TextAtom>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        disabled={loadingLock}
                                        style={bikeStyles.buttonClose}
                                        onPress={() => handleSetModalLock("close")}>
                                        <TextAtom style={{
                                            color: COLORS.white,
                                            fontSize: 18,
                                            fontWeight: "bold"
                                        }}>
                                            {t("bike_info_screen.closing")}
                                        </TextAtom>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                    : null
            }
        </View>
    );
};
