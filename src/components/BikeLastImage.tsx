import {COLORS} from "@assets/constant";
import {NoPhoto} from "@assets/index";
import {ImageAtom} from "@components/Atom/ImageAtom";
import {TextAtom} from "@components/Atom/TextAtom";
import SkeletonLoader from "@components/SkeletonLoader";
import {bikeStyles} from "@styles/ScreenStyles";
import React from "react";
import {useTranslation} from "react-i18next";
import {View} from "react-native";

interface BikeLastImageProp {
    loadingLastImage: boolean,
    photoUrl: string | null
}

export const BikeLastImage = ({loadingLastImage, photoUrl}: BikeLastImageProp) => {
    const {t} = useTranslation();
    console.log("Photo Url --> ", photoUrl);

    return (
        <View style={{
            paddingHorizontal: 10
        }}>
            {loadingLastImage ? (
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
                            {t("bike_info_screen.last_image")}
                        </TextAtom>
                        {photoUrl ?
                            <View style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 10
                            }}>
                                <ImageAtom
                                    source={{uri: photoUrl}}
                                    style={{
                                        width: 200,
                                        height: 200,
                                    }}
                                />
                            </View>
                            :
                            <View>
                                <ImageAtom
                                    source={NoPhoto}
                                    style={{
                                        alignSelf: "center",
                                        width: 100,
                                        height: 100,
                                    }}
                                />
                                <TextAtom style={{textAlign: "center", paddingVertical: 20, color: COLORS.darkGrey}}>
                                    {t("bike_info_screen.no_image")}
                                </TextAtom>
                            </View>
                        }
                    </View>
                </View>
            )}
        </View>
    );
};
