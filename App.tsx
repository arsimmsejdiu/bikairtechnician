/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import SnackBar from "@containers/SnackBar";
import {defaultRemoteConfig} from "@models/defaultRemoteConfig";
import remoteConfig from "@react-native-firebase/remote-config";
import {store} from "@redux/store";
import RootStack from "@stacks/RootStack";
import i18next from "i18next";
import React, {useEffect} from "react";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {Provider} from "react-redux";
import {ToastProvider} from "react-native-toast-notifications";


import {TEST_ENV} from "./env";

const App = () => {
    useEffect(() => {
        remoteConfig()
            .setDefaults(defaultRemoteConfig)
            .then(() => {
                console.log("Default values set.");
            })
            .then(() => remoteConfig().settings.minimumFetchIntervalMillis = TEST_ENV ? 1000 : 43200000)
            .then(() => remoteConfig().fetchAndActivate())
            .then(fetchedRemotely => {
                if (fetchedRemotely) {
                    console.log("Configs were retrieved from the backend and activated.");
                } else {
                    console.log(
                        "No configs were fetched from the backend, and the local configs were already activated",
                    );
                }
                i18next.addResourceBundle("fr", "translation", JSON.parse(remoteConfig().getString("trad_fr")), true, true);
            });
    }, []);

    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <ToastProvider
                    animationDuration={250}
                    animationType={"zoom-in"}
                    swipeEnabled={true}
                    offsetTop={15}
                >
                    <RootStack/>
                    <SnackBar />
                </ToastProvider>
            </SafeAreaProvider>
        </Provider>
    );
};

export default App;
