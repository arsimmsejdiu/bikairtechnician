import {createStackNavigator} from "@react-navigation/stack";
// Public Screens
import LoginScreen from "@screens/LoginScreen";
import UpdateScreen from "@screens/UpdateScreen";
import React from "react";

import {AuthStackParamList} from "./types";

const Stack = createStackNavigator<AuthStackParamList>();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen}/>
            <Stack.Screen name="Update" component={UpdateScreen}/>
        </Stack.Navigator>
    );
};

export default AuthStack;
