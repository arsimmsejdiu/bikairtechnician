import {COLORS, GoBack} from "@assets/index";
import React, {FC, memo} from "react";
import {useTranslation} from "react-i18next";
import {Image, StyleSheet, Text, TouchableOpacity, View, ViewProps} from "react-native";

import Address from "./Address";
import {BikeStatusType} from "@bikairproject/shared";

interface Props extends ViewProps {
    name: string
    status: BikeStatusType
    address?: string
    capacity?: number,
    navigation: any
}

const Header: FC<Props> = (
    {
        name,
        status,
        address,
        capacity,
        navigation
    }): React.ReactElement | null => {
    const {t} = useTranslation();

    return (
        <View style={{
            padding: 10
        }}>
            <View style={styles.title}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("BikeList")}
                    style={styles.crossContainer}
                >
                    <Image style={styles.imageCross} source={GoBack} resizeMode={"cover"}/>
                </TouchableOpacity>
                <Text style={styles.titleText}>{name}</Text>
            </View>
            <View style={styles.content}>
                <View>
                    <Text style={[styles.text]}>{t(`bike.status.${status}`)}</Text>
                </View>
                {
                    capacity ? (
                        <View>
                            <Text numberOfLines={1} adjustsFontSizeToFit style={[styles.text]}>
                                {t("bike_info_screen.autonomy")}: {capacity || 0} km
                            </Text>
                        </View>
                    ) : null
                }
            </View>
            {
                address ? (
                    <Address address={address}/>
                ) : null
            }

        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    titleText: {
        fontSize: 40,
        color: COLORS.black,
        fontWeight: "700",
        marginLeft: 20
    },
    text: {
        fontSize: 17,
        color: COLORS.black,
        fontWeight: "700",
        textTransform: "capitalize"
    },
    content: {
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 30
    },
    statusBullet: {
        height: 20,
        width: 20,
        borderRadius: 20,
        marginRight: 10
    },
    crossContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    imageCross: {
        width: 30,
        height: 30,
        tintColor: COLORS.black
    },
    backText: {
        marginLeft: 10,
        fontSize: 25,
        fontWeight: "bold",
        color: COLORS.black
    }
});


export default memo(Header);
