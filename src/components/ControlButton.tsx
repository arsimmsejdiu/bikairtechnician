import {COLORS} from "@assets/constant";
import {TextAtom} from "@components/Atom/TextAtom";
import {useAppSelector} from "@hooks/useAppSelector";
import {Review} from "@models/data";
import {BikeStackScreenProps} from "@stacks/types";
import {bikeStyles} from "@styles/ScreenStyles";
import React from "react";
import {useTranslation} from "react-i18next";
import {TouchableOpacity, View, ViewProps} from "react-native";

interface Props extends ViewProps, BikeStackScreenProps<"Bike"> {
    review: Review | null;
}

export const ControlButton: React.FC<Props> = ({navigation, review}): React.ReactElement => {
    const bike = useAppSelector(state => state.bike.currentBike);
    const user = useAppSelector(state => state.auth.me);
    const {t} = useTranslation();

    const handleCreateReportButton = () => {
        if (bike) {
            navigation.navigate("BikeScanner", {
                bikeId: bike.id,
                bikeName: bike.name,
                bikeStatus: bike.status,
                issue: review?.issue
            });
        }
    };

    return (
        <View style={{
            paddingHorizontal: 10,
        }}>
            <View style={{
                backgroundColor: COLORS.lightGrey,
                marginBottom: 20,
                borderRadius: 10,
                padding: 15,
            }}>
                <TextAtom style={{textAlign: "center", fontSize: 18, marginTop: 10, color: "black"}}>
                    {t("bike_info_screen.button_control_bike")}
                </TextAtom>
                <View style={{justifyContent: "center", flexDirection: "row"}}>
                    {
                        user?.access_rights.includes("CONTROL_WRITE") ?
                            <TouchableOpacity
                                style={bikeStyles.buttonControl}
                                onPress={handleCreateReportButton}>
                                <TextAtom style={{
                                    color: COLORS.white,
                                    fontSize: 18,
                                    fontWeight: "bold"
                                }}>
                                    {t("bike_info_screen.control")}
                                </TextAtom>
                            </TouchableOpacity>
                            : <TextAtom>
                                {t("bike_info_screen.no_access_control_button")}
                            </TextAtom>
                    }
                </View>
            </View>
        </View>
    );
};
