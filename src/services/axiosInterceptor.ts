import {authLogout} from "@redux/reducers/auth";
import {store} from "@redux/store";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {NativeModules, Platform} from "react-native";

import {API_KEY} from "../../env";
import {version} from "../../package.json";
import {loadData, removeValue, storeData} from "./asyncStorage";

const instanceaxiosApi = axios.create({
    timeout: 30000,
});

const returnLocale = () => {
    let locale;
    if (Platform.OS === "android") {
        // Android:
        locale = NativeModules.I18nManager.localeIdentifier; // "fr_FR"
    } else {
        // iOS:
        locale = NativeModules.SettingsManager.settings.AppleLocale ||
            NativeModules.SettingsManager.settings.AppleLanguages[0]; // "fr_FR"
    }

    const reducedLocale = locale.substring(0, 2);
    return reducedLocale === "fr" ? "fr" : "en";
};


/**
 * Catch all request and add bearerToken
 */
const headerInterceptor = async (config: AxiosRequestConfig) => {
    const locale = returnLocale();
    // Set api-key
    config.headers = {
        "X-Api-Key": API_KEY,
        "x-origin": "TECH_APP",
        "x-device": Platform.OS,
        "x-app-version": version,
        "x-locale": locale,
        "x-os-version": Platform.Version,
        "Accept": "application/json",
        "Content-Type": "application/json"
    };

    console.log(`[API] ${config.method}: ${config.url}`);
    const token = await loadData("@bearerToken");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
};
const headerErrorInterceptor = (error: any) => {
    return Promise.reject(error);
};

// Add a response interceptor
const responseInterceptor = async (response: AxiosResponse) => {
    // We need to generate a new token for each request
    // and update the local-storage
    // if no action from the app, the token will become unvalid after 1 hour
    if (response.headers["x-bearer-token"]) {
        await storeData("@bearerToken", response.headers["x-bearer-token"]);
    }
    return response;
};

const responseErrorInterceptor = async (error: any) => {
    const originalRequest = error.config;

    if (!error.response) {
        return Promise.reject("Server error");
    }
    console.log(`[${error.response.status}]-[${error.response?.config?.url}] `, error.message);

    // If 502 error retry request
    if (error.response.status === 502 && !originalRequest._retry502) {
        originalRequest._retry502 = true;
        return axios(originalRequest);
    }

    if (error.response.status === 403 || error.response.status === 401) {
        console.log("logout because wrong token");
        await removeValue("@bearerToken");
        store.dispatch(authLogout());
    }

    error.message = error.response.data ? error.response.data : "Server error !";
    console.log(`[${error.response.status}] `, error.message);
    return Promise.reject(error);
};

instanceaxiosApi.interceptors.request.use(headerInterceptor, headerErrorInterceptor);

// Add a response interceptor
instanceaxiosApi.interceptors.response.use(responseInterceptor, responseErrorInterceptor);


export {instanceaxiosApi};
