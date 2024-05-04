import {COLORS} from "@assets/index";
import React, {FC} from "react";
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, ViewProps} from "react-native";

interface EngageButtonProps extends ViewProps {
    value?: string
    inProgress?: boolean
    onClick?: () => void
}

export const EngageButton: FC<EngageButtonProps> = ({
    value,
    inProgress,
    onClick,
    style,
}): React.ReactElement => {
    const handleClick = () => {
        if (!inProgress && typeof onClick !== "undefined") {
            onClick();
        }
    };

    return (
        <TouchableOpacity onPress={handleClick} activeOpacity={0.8}>
            <View style={style ? [styles.roundContainer, style] : styles.roundContainer}>
                <Text style={styles.whiteText}>
                    {
                        inProgress ?
                            <ActivityIndicator
                                style={{marginTop: 20}}
                                size="small"
                                color={"white"}
                            />
                            : value
                    }
                </Text>
            </View>
        </TouchableOpacity>
    );
};

interface ReportButtonProps extends ViewProps {
    value?: string
    inProgress?: boolean
    onClick?: () => void
}

export const ReportButton: FC<ReportButtonProps> = ({
    value,
    inProgress,
    onClick,
    style,
}): React.ReactElement => {

    const handleClick = () => {
        if (!inProgress && typeof onClick !== "undefined") {
            onClick();
        }
    };

    return (
        <TouchableOpacity
            onPress={handleClick}
            activeOpacity={0.8}
            style={style ? [styles.fillContainer, style] : styles.fillContainer}>
            <Text style={styles.whiteText}>
                {
                    inProgress ?
                        <ActivityIndicator
                            style={{marginTop: 20}}
                            size="small"
                            color={"white"}
                        />
                        : value
                }
            </Text>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    roundContainer: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 6,
        padding: 20,
        backgroundColor: COLORS.lightBlue,
    },
    fillContainer: {
        flexDirection: "row",
        justifyContent: "center",
        borderRadius: 6,
        backgroundColor: COLORS.lightBlue,
        minHeight: 50
    },
    whiteText: {
        color: COLORS.white,
        alignSelf: "center",
    }
});
