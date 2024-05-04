import {useAppDispatch} from "@hooks/index";
import {resetAddBike} from "@redux/reducers/addBike";
import {authLogout} from "@redux/reducers/auth";
import {resetBike} from "@redux/reducers/bike";
import {resetCity} from "@redux/reducers/city";
import {resetGlobal} from "@redux/reducers/global";
import {resetReport} from "@redux/reducers/report";
import {resetSpot} from "@redux/reducers/spot";
import {BottomTabsScreenProps} from "@stacks/types";
import {logoutStyles} from "@styles/ScreenStyles";
import React, {memo} from "react";
import {ActivityIndicator, View, ViewProps} from "react-native";

interface Props extends ViewProps, BottomTabsScreenProps<"Logout"> {
}

const LogoutScreen: React.FC<Props> = (): React.ReactElement => {

    // Redux
    const dispatch = useAppDispatch();


    React.useEffect(() => {
        dispatch(resetAddBike(null));
        dispatch(resetBike());
        dispatch(resetSpot());
        dispatch(resetReport());
        dispatch(resetGlobal(null));
        dispatch(resetCity());
        dispatch(authLogout());
    }, []);

    return (
        <View style={[logoutStyles.container, logoutStyles.horizontal]}>
            <ActivityIndicator size="large" color={"white"}/>
        </View>
    );
};

export default memo(LogoutScreen);
