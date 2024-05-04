import {COLORS, DEFAULT_COORDS, FontAwesomeIcon, WhiteLogo} from "@assets/index";
import {ImageAtom} from "@components/Atom/ImageAtom";
import {TextAtom} from "@components/Atom/TextAtom";
import {EngageButton} from "@components/Button";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import RequestLocationPermission from "@permissions/LocationPermission";
import {useFocusEffect} from "@react-navigation/native";
import {authLogin} from "@redux/reducers/auth";
import {setLatLng} from "@redux/reducers/global";
import {AuthStackScreenProps} from "@stacks/types";
import {loginStyles} from "@styles/ScreenStyles";
import {getPosition} from "@utils/helpers";
import React, {useCallback, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
    ViewProps
} from "react-native";
import {TextInput} from "react-native-gesture-handler";
import MapView from "react-native-maps";

import {version} from "../../package.json";

interface Props extends ViewProps, AuthStackScreenProps<"Login"> {
}

const LoginScreen: React.FC<Props> = (): React.ReactElement => {
    const map = useRef<MapView>(null);
    const [username, setUsername] = React.useState<string>("");
    const [password, setPassword] = React.useState<string>("");
    const [hidePassword, setHidePassword] = useState<boolean>(true);
    const {t} = useTranslation();

    // Redux
    const isFetching = useAppSelector(state => state.auth.isFetching);
    const error = useAppSelector(state => state.global.error);
    const dispatch = useAppDispatch();

    const onSubmit = () => {
        if (username && password) {
            dispatch(authLogin(username.trim(), password.trim()));
        }
    };

    const getLocation = async () => {
        try {
            await RequestLocationPermission();
            const locations = await getPosition();
            dispatch(setLatLng({lat: locations.coords.latitude, lng: locations.coords.longitude}));
            if (typeof map?.current?.animateToRegion !== "undefined") {
                map.current.animateToRegion({
                    ...DEFAULT_COORDS,
                    latitude: locations.coords.latitude,
                    longitude: locations.coords.longitude,
                });
            }
        } catch (err) {
            console.log("getLocation", err);
            Alert.alert("Allumer votre GPS");
        }
    };

    const onOpenActions = () => {
        getLocation().finally(() => console.log(""));
    };

    useFocusEffect(useCallback(() => {
        onOpenActions();
    }, []));

    const renderError = () => {
        if (error) {
            let message;
            switch (error) {
                case 404:
                    message = t("user.incorrect_identifiers");
                    break;
                case 401:
                    message = t("user.incorrect_password");
                    break;
                case 409:
                    message = t("user.fill_all_the_fields");
                    break;
                default:
                    message = t("user.server_error");
                    break;
            }
            return (
                <View>
                    <TextAtom style={loginStyles.error}>
                        {message}
                    </TextAtom>
                </View>
            );
        }
    };

    const handleTogglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    return (
        <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{width: "100%", height: "100%"}}>
            <StatusBar backgroundColor={COLORS.darkBlue}/>
            <View style={loginStyles.container}>
                <View style={loginStyles.connectionContainer}>
                    <ImageAtom source={WhiteLogo} style={{width: 90, height: 90}} resizeMode={"contain"}/>
                    <TextAtom style={loginStyles.title}>
                        {t("user.connection")}
                    </TextAtom>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    {renderError()}
                    <View style={loginStyles.fields}>
                        <TextInput
                            placeholder={t("user.username") ?? "Nom d'utilisateur"}
                            placeholderTextColor={COLORS.darkGrey}
                            style={loginStyles.input}
                            value={username}
                            onChangeText={text => setUsername(text)}
                            keyboardType={"default"}
                        />
                    </View>
                    <View style={loginStyles.fields}>
                        <TextInput
                            placeholder={t("user.password") ?? "Mot de passe"}
                            placeholderTextColor={COLORS.darkGrey}
                            style={loginStyles.input}
                            value={password}
                            secureTextEntry={hidePassword}
                            onChangeText={text => setPassword(text)}
                            keyboardType={"default"}
                            autoCapitalize="none"
                        />
                        <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                            {
                                hidePassword ?
                                    <FontAwesomeIcon name={"eye-slash"}/> :
                                    <FontAwesomeIcon name={"eye"}/>
                            }
                        </TouchableOpacity>
                    </View>
                    <EngageButton
                        style={loginStyles.buttonContainer}
                        inProgress={isFetching}
                        onClick={onSubmit}
                        value={t("user.login") ?? "Connexion"}
                    />
                </KeyboardAvoidingView>

                <Text style={loginStyles.versionText}>v{version}</Text>
            </View>
        </ScrollView>
    );
};


export default LoginScreen;


