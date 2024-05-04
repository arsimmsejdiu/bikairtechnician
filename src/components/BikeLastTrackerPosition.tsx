import {COLORS} from "@assets/constant";
import {TextAtom} from "@components/Atom/TextAtom";
import SkeletonLoader from "@components/SkeletonLoader";
import {bikeStyles} from "@styles/ScreenStyles";
import React from "react";
import {useTranslation} from "react-i18next";
import {View} from "react-native";

interface BikeLastPositionProp {
    loadingLastPosition: boolean,
    trackerCoordinates: number[] | undefined
}

export const BikeLastTrackerPosition = ({loadingLastPosition, trackerCoordinates}: BikeLastPositionProp) => {
    const {t} = useTranslation();

    return (
        <View style={{
            paddingHorizontal: 10
        }}>
            {loadingLastPosition ? (
                <SkeletonLoader/>
            ) : (

                <View style={{
                    backgroundColor: COLORS.lightGrey,
                    marginBottom: 20,
                    borderRadius: 10,
                    padding: 15,
                }}>
                    <View style={bikeStyles.container}>
                        <TextAtom style={{
                            textAlign: "center",
                            fontSize: 18,
                            color: COLORS.black
                        }}>
                            {t("bike_info_screen.last_tracker")}
                        </TextAtom>
                    </View>
                    {trackerCoordinates ? (
                        <View style={{flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center"}}>
                            <TextAtom>{trackerCoordinates[0]}{" , "}</TextAtom>
                            <TextAtom>{trackerCoordinates[1]}</TextAtom>
                        </View>
                    ) : (
                        <TextAtom style={{textAlign: "center", paddingVertical: 20, color: COLORS.darkGrey}}>
                            {t("bike_info_screen.no_tracker")}
                        </TextAtom>
                    )}
                </View>
            )}
        </View>
    );
};
