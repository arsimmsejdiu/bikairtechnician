/**
 * @format
 */
import "react-native-reanimated";
import "@i18n/i18n";
import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import {onTapNotification} from "@services/FCMService";
import {AppRegistry, LogBox} from "react-native";

import App from "./App";
import {name as appName} from "./app.json";

LogBox.ignoreLogs(["SerializableStateInvariantMiddleware"]); // Ignore log notification by message

// Initialize notification handler
messaging().setBackgroundMessageHandler(async remoteMessage => remoteMessage);

messaging().subscribeToTopic("TECH_INFORMATIONS").then(r => console.log(r));

// Handle tap event on notification-background
notifee.onBackgroundEvent(onTapNotification);

AppRegistry.registerComponent(appName, () => App);
