import {FeatherIcon} from "@assets/index";
import React, {FC} from "react";
import {ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

interface Props extends ViewProps {
    backAction: () => void,
}

export const BackButton: FC<Props> = ({
    backAction
}): React.ReactElement => {
    const handleBackAction = () => {
        backAction();
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
