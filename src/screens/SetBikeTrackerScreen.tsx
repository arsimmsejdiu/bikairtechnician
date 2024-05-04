import {COLORS, FeatherIcon, FontAwesomeIcon} from "@assets/index";
import {EngageButton} from "@components/Button";
import {useAppDispatch} from "@hooks/index";
import {useFocusEffect} from "@react-navigation/native";
import {setTrackerImei, setTrackerMac} from "@redux/reducers/addBike";
import {updateBikeTracker} from "@services/bikesService";
import {BikeCreateStackScreenProps} from "@stacks/types";
import {setBikeTrackerStyles} from "@styles/SetBikeLockStyles";
import React, {useCallback, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, ViewProps} from "react-native";

interface Props extends ViewProps, BikeCreateStackScreenProps<"AddTracker"> {
}

export const SetBikeTrackerScreen: React.FC<Props> = ({
    navigation,
    route,
}): React.ReactElement => {

    const [context, setContext] = useState<"create" | "update">("create");
    const [bikeId, setBikeId] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [imei, setImei] = useState("");
    const [mac, setMac] = useState("");
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const handlePhotoPressed = () => {
        navigation.navigate("QrReader", {type: "tracker"});
    };
    const handleValidate = async () => {
        if (!imei || !mac) {
            Alert.alert(t("add_bike_screen.all_fields_required"));
            return;
        }

        if (context === "create") {
            dispatch(setTrackerImei(imei));
            dispatch(setTrackerMac(mac));

            navigation.navigate("Validate");
        } else {
            if (typeof bikeId === "undefined") {
                Alert.alert(t("set_bike_tracker_screen.error_configuration"));
            } else {
                try {
                    setLoading(true);
                    await updateBikeTracker({
                        bikeId: bikeId,
                        trackerImei: imei,
                        trackerMac: mac
                    });
                    Alert.alert(t("set_bike_tracker_screen.success"),
                        t("set_bike_tracker_screen.updated_tracker") ?? "Traqueur mis à jour",
                        [
                            {
                                text: "Ok",
                                onPress: () => {
                                    navigation.navigate("BikeStack", {
                                        screen: "Bike"
                                    });
                                }
                            }
                        ]);
                } catch (error: any) {
                    console.log(error);
                    Alert.alert(
                        t("set_bike_tracker_screen.error"),
                        t("set_bike_tracker_screen.error_modification_tracker") ?? "Erreur lors de la modification du traqueur"
                    );
                } finally {
                    setLoading(true);
                }
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (route.params?.trackerImei) {
                setImei(route.params.trackerImei);
            }
            if (route.params?.trackerMac) {
                setMac(route.params.trackerMac);
            }
            if (route.params?.bikeId) {
                setBikeId(route.params.bikeId);
            }
            if (route.params?.context) {
                setContext(route.params.context);
                setBikeId(route.params.bikeId);
                setImei("");
                setMac("");
                setLoading(false);
            }
        }, [route.params])
    );

    const handleBackAction = () => {
        if (context === "create") {
            navigation.navigate("BikeConfigStack", {
                screen: "AddLock",
            });
        } else {
            if (bikeId === undefined) {
                navigation.navigate("BikeStack", {
                    screen: "BikeList"
                });
            } else {
                navigation.navigate("BikeStack", {
                    screen: "Bike"
                });
            }
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity onPress={handleBackAction}>
                    <FeatherIcon
                        style={{marginLeft: 10}}
                        name={"arrow-left"}
                        size={25}
                        color={"black"}
                    />
                </TouchableOpacity>
            ),
        });
    });

    return (
        <ScrollView>
            <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"}/>
            <View style={setBikeTrackerStyles.container}>
                <View style={setBikeTrackerStyles.titlePhotoContainer}>
                    <Text style={setBikeTrackerStyles.title}>{t("set_bike_tracker_screen.tracker")}</Text>
                    <TouchableOpacity style={setBikeTrackerStyles.photoButton} onPress={handlePhotoPressed}>
                        <FontAwesomeIcon
                            name={"camera"}
                            color={COLORS.white}
                            style={setBikeTrackerStyles.photo}
                        />
                    </TouchableOpacity>
                </View>
                <Text style={setBikeTrackerStyles.label}>{t("set_bike_tracker_screen.imei")}</Text>
                <TextInput
                    style={setBikeTrackerStyles.input}
                    value={imei}
                    onChangeText={value => setImei(value)}
                />
                <Text style={setBikeTrackerStyles.label}>{t("set_bike_tracker_screen.mac")}</Text>
                <TextInput
                    style={setBikeTrackerStyles.input}
                    value={mac}
                    onChangeText={value => setMac(value)}
                />
            </View>

            <EngageButton
                value="Valider"
                inProgress={loading}
                style={setBikeTrackerStyles.submitButton}
                onClick={handleValidate}
            />
        </ScrollView>
    );
};
