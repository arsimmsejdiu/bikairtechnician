import {FeatherIcon} from "@assets/icons/icons";
import {useAppDispatch} from "@hooks/useAppDispatch";
import {selectBike} from "@redux/reducers/bike";
import {BikeStackScreenProps} from "@stacks/types";
import React from "react";
import {TouchableOpacity, ViewProps} from "react-native";

interface Props extends ViewProps, BikeStackScreenProps<"Bike"> {
}

export const GoBackActionButton: React.FC<Props>  = ({navigation}): React.ReactElement  => {
    const dispatch = useAppDispatch();

    const handleBackAction = () => {
        dispatch(selectBike(null));
        navigation.navigate("BikeList");
    };

    return (
        <TouchableOpacity onPress={handleBackAction}>
            <FeatherIcon
                style={{marginLeft: 10}}
                name={"arrow-left"}
                size={25}
                color={"black"}
            />
        </TouchableOpacity>
    );
};
