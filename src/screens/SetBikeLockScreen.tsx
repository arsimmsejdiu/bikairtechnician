import {COLORS, FeatherIcon, FontAwesomeIcon} from "@assets/index";
import {EngageButton} from "@components/Button";
import {useAppDispatch} from "@hooks/index";
import {useFocusEffect} from "@react-navigation/native";
import {setLockClaimCode, setLockUid, setLockVersion} from "@redux/reducers/addBike";
import {updateBikeLock} from "@services/bikesService";
import {BikeCreateStackScreenProps} from "@stacks/types";
import {pickerSelectBikeLockStyles, setBikeLockStyles} from "@styles/SetBikeLockStyles";
import React, {useCallback, useLayoutEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View, ViewProps} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Props extends ViewProps, BikeCreateStackScreenProps<"AddLock"> {
}

const versions = [
    {label: "erl2", value: "erl2"},
    {label: "erl1", value: "erl1"},
];

export const SetBikeLockScreen: React.FC<Props> = ({
    navigation,
    route,
}): React.ReactElement => {
    const [context, setContext] = useState<"create" | "update">("create");
    const [bikeId, setBikeId] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [uid, setUid] = useState("");
    const [claimCode, setClaimCode] = useState("");
    const [version, setVersion] = useState("erl2");
    const [openVersion, setOpenVersion] = useState<boolean>(false);

    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const handlePhotoPressed = () => {
        navigation.navigate("QrReader", {type: "lock"});
    };

    const handleValidate = async () => {
        if (!claimCode || !uid || !version) {
            Alert.alert(t("bike_lock_screen.required_fields"));
            return;
        }

        if (context === "create") {
            dispatch(setLockUid(uid));
            dispatch(setLockClaimCode(claimCode));
            dispatch(setLockVersion(version));

            navigation.navigate("AddTracker", {
                context: "create"
            });
        } else {
            if (typeof bikeId === "undefined") {
                Alert.alert(t("bike_lock_screen.error_configuration"));
            } else {
                try {
                    setLoading(true);
                    await updateBikeLock({
                        bikeId: bikeId,
                        lockUid: uid,
                        lockClaimCode: claimCode,
                        lockVersion: version
                    });
                    Alert.alert(t("bike_lock_screen.success"),
                        t("bike_lock_screen.padlock_updated") ?? "PadLock updated",
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
                    Alert.alert(t("bike_lock_screen.error"), t("bike_lock_screen.error_modifying_padlock") ?? "Error modifying padlock");
                } finally {
                    setLoading(false);
                }
            }
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (route.params?.lockUid) {
                setUid(route.params.lockUid);
            }
            if (route.params?.lockClaimCode) {
                setClaimCode(route.params.lockClaimCode);
            }
            if (route.params?.bikeId) {
                setBikeId(route.params.bikeId);
            }
            if (route.params?.context) {
                setContext(route.params.context);
                setBikeId(route.params.bikeId);
                setUid("");
                setClaimCode("");
                setVersion("erl2");
                setLoading(false);
            }
        }, [route.params])
    );

    const handleBackAction = () => {
        if (context === "create") {
            navigation.navigate("BikeConfigStack", {
                screen: "AddBike",
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
            <View style={setBikeLockStyles.container}>
                <View style={setBikeLockStyles.titlePhotoContainer}>
                    <Text style={setBikeLockStyles.title}>{t("bike_lock_screen.padlock")}</Text>
                    <View style={setBikeLockStyles.photoButton}>
                        <TouchableOpacity onPress={handlePhotoPressed}>
                            <FontAwesomeIcon
                                name={"camera"}
                                color={COLORS.white}
                                style={setBikeLockStyles.photo}
                            />
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <Text style={setBikeLockStyles.label}>{t("bike_lock_screen.uid")}</Text>
                <TextInput
                    style={setBikeLockStyles.input}
                    value={uid}
                    onChangeText={value => setUid(value)}
                />
                <Text style={setBikeLockStyles.label}>{t("bike_lock_screen.claim_code")}</Text>
                <TextInput
                    style={setBikeLockStyles.input}
                    value={claimCode}
                    onChangeText={value => setClaimCode(value)}
                />
                <Text style={setBikeLockStyles.label}>{t("bike_lock_screen.version")}</Text>
                <DropDownPicker
                    style={Platform.OS === "android" ? pickerSelectBikeLockStyles.inputAndroid : pickerSelectBikeLockStyles.inputIOS}
                    value={version}
                    items={versions}
                    open={openVersion}
                    setOpen={setOpenVersion}
                    setValue={setVersion}
                    onPress={setOpenVersion}
                />
            </View>
            <EngageButton
                value={t("bike_lock_screen.validate") ?? "Valider"}
                inProgress={loading}
                style={setBikeLockStyles.submitButton}
                onClick={handleValidate}
            />
        </ScrollView>
    );
};
