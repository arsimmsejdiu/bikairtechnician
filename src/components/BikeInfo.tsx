import {COLORS} from "@assets/constant";
import {TextAtom} from "@components/Atom/TextAtom";
import {UpdateAddressButton} from "@components/UpdateAddressButton";
import {Bike} from "@models/dto/MarkerData";
import {BikeStackScreenProps} from "@stacks/types";
import {bikeStyles} from "@styles/ScreenStyles";
import {statusColor} from "@utils/StatusColor";
import React, {lazy, Suspense} from "react";
import {useTranslation} from "react-i18next";
import {TouchableOpacity, View, ViewProps} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

const Header = lazy(() => import("@components/Header"));

interface Props extends ViewProps, BikeStackScreenProps<"Bike"> {
    bike: Bike | null;
}

export const BikeInfo: React.FC<Props> = ({navigation, bike}): React.ReactElement => {
    const insets = useSafeAreaInsets();
    const {t} = useTranslation();

    const handleUpdateStatusButton = () => {
        if (bike) {
            navigation.push("Status", {
                bikeId: bike.id,
                status: bike.status,
                city_id: bike.city_id,
                tags: bike.tags
            });
        }
    };

    return (
        <>
            {bike !== null ? (
                <View style={{
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    padding: 10,
                    paddingTop: 10 + insets.top,
                    marginBottom: 20,
                    backgroundColor: statusColor(bike.status)
                }}>
                    <Suspense fallback={<View></View>}>
                        <Header
                            name={bike.name}
                            status={bike.status}
                            address={bike.address || undefined}
                            capacity={bike.capacity}
                            navigation={navigation}
                        />
                    </Suspense>
                    <View style={{justifyContent: "center", flexDirection: "row"}}>
                        <TouchableOpacity
                            style={bikeStyles.buttonStatus}
                            onPress={handleUpdateStatusButton}>
                            <TextAtom
                                style={{
                                    color: COLORS.black,
                                    padding: 10,
                                    fontWeight: "500",
                                    fontSize: 16
                                }}>
                                {t("bike_info_screen.change_status_bike")}
                            </TextAtom>
                        </TouchableOpacity>
                    </View>
                    <UpdateAddressButton/>
                </View>
            ) : null}
        </>

    );
};
