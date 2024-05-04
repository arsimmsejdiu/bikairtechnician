import {FeatherIcon} from "@assets/index";
import {EngageButton} from "@components/Button";
import Loader from "@components/Loader";
import {LoadingModal} from "@components/LoadingModal";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {selectBike, updateBikeCache} from "@redux/reducers/bike";
import {createBike} from "@services/bikesService";
import {BikeCreateStackScreenProps} from "@stacks/types";
import {validateAddBikeStyles} from "@styles/SetBikeLockStyles";
import React, {useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {ScrollView, Text, TouchableOpacity, View, ViewProps} from "react-native";

interface Props extends ViewProps, BikeCreateStackScreenProps<"Validate"> {
}

export const ValidateAddBikeScreen: React.FC<Props> = ({navigation}): React.ReactElement => {

    const bikeName = useAppSelector(state => state.addBike.bikeName);
    const cities = useAppSelector(state => state.city.cities);
    const city = useAppSelector(state => state.addBike.city);
    const lockClaimCode = useAppSelector(state => state.addBike.lockClaimCode);
    const lockUid = useAppSelector(state => state.addBike.lockUid);
    const lockVersion = useAppSelector(state => state.addBike.lockVersion);
    const trackerImei = useAppSelector(state => state.addBike.trackerImei);
    const trackerMac = useAppSelector(state => state.addBike.trackerMac);
    const {t} = useTranslation();
    const dispatch = useAppDispatch();

    const [loading, setLoading] = useState(false);
    const [modalText, setModalText] = useState<string | null>(null);

    const handleValidate = async () => {
        try {
            setLoading(true);

            const bike = await createBike({
                bikeName: bikeName,
                city: city || undefined,
                lockClaimCode: lockClaimCode,
                lockUid: lockUid,
                lockVersion: lockVersion,
                trackerImei: trackerImei,
                trackerMac: trackerMac,
            });
            setModalText(t("add_bike_screen.message_success"));
            setTimeout(() => {
                setModalText(null);
                dispatch(updateBikeCache(bike));
                dispatch(selectBike(bike.uuid));
                navigation.navigate("BikeStack", {
                    screen: "Bike"
                });
            }, 5000);

        } catch (error: any) {
            setModalText(`${t("add_bike_screen.error_create_bike")}: ${error.message ? error.message : error}`);
            setTimeout(() => {
                setModalText(null);
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    const getCityName = () => {
        if (typeof cities !== "undefined" && cities !== null) {
            const index = cities.findIndex(c => c.id === city);
            if (index > 0) {
                return cities[index].name;
            }
        }
        return "";
    };

    const handleBackAction = () => {
        navigation.navigate("BikeConfigStack", {
            screen: "AddTracker",
        });
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

    if (loading) {
        return <Loader/>;
    }

    return (
        <ScrollView>
            <LoadingModal text={modalText}/>
            <View style={validateAddBikeStyles.container}>
                <Text style={validateAddBikeStyles.title}>{t("validate_add_bike_screen.validation")}</Text>
                <Text style={validateAddBikeStyles.label}>{t("validate_add_bike_screen.bike_name")} : {bikeName}</Text>
                <Text style={validateAddBikeStyles.label}>{t("validate_add_bike_screen.city")} : {getCityName()}</Text>
            </View>

            <View style={validateAddBikeStyles.line}/>

            <EngageButton
                value={String(t("validate_add_bike_screen.validate") ?? "Valider")}
                style={validateAddBikeStyles.submitButton}
                onClick={handleValidate}
            />
        </ScrollView>
    );
};

