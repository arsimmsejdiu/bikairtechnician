import {COLORS} from "@assets/index";
import React, {FC} from "react";
import {StyleSheet, View, ViewProps} from "react-native";
import {createIconSetFromFontello} from "react-native-vector-icons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import fontelloConfig from "./fontelloConfig.json";

const FontelloIconSet = createIconSetFromFontello(fontelloConfig);

const defaultStyle = StyleSheet.create({
    icon: {
        backgroundColor: "transparent",
    },
});

interface FontelloIconProps extends ViewProps {
    name: string
    size?: number
    color?: string
}

export const FontelloIcon: FC<FontelloIconProps> = ({
    name,
    size,
    color,
    ...props
}): React.ReactElement => {
    return (
        <View style={props.style}>
            <FontelloIconSet
                name={name}
                size={size ?? 20}
                color={color ?? COLORS.darkBlue}
                style={defaultStyle.icon}
            />
        </View>
    );
};

interface FeatherIconProps extends ViewProps {
    name: string
    size?: number
    color?: string
}

export const FeatherIcon: FC<FeatherIconProps> = ({
    name,
    size,
    color,
    ...props
}): React.ReactElement => {
    return (
        <View style={props.style}>
            <Feather
                name={name}
                size={size ?? 20}
                color={color ?? COLORS.darkBlue}
                style={defaultStyle.icon}
            />
        </View>
    );
};

interface FontAwesomeIconProps extends ViewProps {
    name: string
    size?: number
    color?: string
}

export const FontAwesomeIcon: FC<FontAwesomeIconProps> = ({
    name,
    size,
    color,
    ...props
}): React.ReactElement => {
    return (
        <View style={props.style}>
            <FontAwesome
                name={name}
                size={size ?? 20}
                color={color ?? COLORS.darkBlue}
                style={defaultStyle.icon}
            />
        </View>
    );
};


interface SimpleLineProps extends ViewProps {
    name: string
    size?: number
    color?: string
}

export const SimpleLine: FC<SimpleLineProps> = ({
    name,
    size,
    color,
    ...props
}): React.ReactElement => {
    return (
        <View style={props.style}>
            <SimpleLineIcons
                name={name}
                size={size ?? 20}
                color={color ?? COLORS.darkBlue}
                style={defaultStyle.icon}
            />
        </View>
    );
};
