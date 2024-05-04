import SplashScreen from "@components/SplashScreen";
import Notification from "@containers/Notification";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {NavigationContainer, useNavigationContainerRef} from "@react-navigation/native";
import {refreshAuth} from "@redux/reducers/auth";
import {getCities} from "@redux/reducers/city";
import {loadData} from "@services/asyncStorage";
import AuthStack from "@stacks/AuthStack";
import BottomTabs from "@stacks/BottomTabs";
import React, {useEffect} from "react";

const RootStack = () => {
    const [loading, setLoading] = React.useState(false);

    // Redux state
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const navigationRef = useNavigationContainerRef();

    useEffect(() => {
        // Update city list
        dispatch(getCities());
    }, []);

    useEffect(() => {
        let unmounted = false;
        // setLoading(true)
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            setLoading(true);
            let bearerToken;
            try {
                bearerToken = await loadData("@bearerToken");
                console.log("*************************--RECONNECTING--*************************", bearerToken);
                dispatch(getCities());
                if (bearerToken) {
                    dispatch(refreshAuth());

                } else {
                    throw new Error("Wrong token");
                }
            } catch (e) {
                // Restoring token failed
                console.log("____________________REMOVE_BEARER_________________________-", e);
                // removeValue('@bearerToken')
            } finally {
                setLoading(false);
            }
        };
        bootstrapAsync().then(() => console.log(""));
        return () => {
            unmounted = true;
        };
    }, []);

    if (loading || auth.isRefreshing) {
        return <SplashScreen visible={true}/>;
    }

    return (
        <NavigationContainer ref={navigationRef}>
            {
                auth.isAuthenticated ?
                    <>
                        <Notification/>
                        <BottomTabs/>
                    </> :
                    <AuthStack/>
            }
        </NavigationContainer>
    );
};

export default RootStack;
