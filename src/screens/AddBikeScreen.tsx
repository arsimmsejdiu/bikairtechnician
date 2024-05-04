import {COLORS} from "@assets/constant";
import {ReportButton} from "@components/Button";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {useFocusEffect} from "@react-navigation/native";
import {resetAddBike, setBikeCity, setBikeName,} from "@redux/reducers/addBike";
import {BikeCreateStackScreenProps} from "@stacks/types";
import {addBikeStyles, pickerSelectStyles} from "@styles/ScreenStyles";
import React, {useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {Alert, Platform, StatusBar, Text, TextInput, View, ViewProps} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

interface Props extends ViewProps, BikeCreateStackScreenProps<"AddBike"> {
}

export const AddBikeScreen: React.FC<Props> = ({navigation,}): React.ReactElement => {
    const cities = useAppSelector(state => state.city.cities);

    const [name, setName] = useState("");
    const [city, setCity] = useState<number | null>(null);
    const [cityItem, setCityItem] = useState<number | null>(null);
    const [openCity, setOpenCity] = useState<boolean>(false);

    const {t} = useTranslation();


    const dispatch = useAppDispatch();

    const handleValidate = async () => {
        if (!name || !city) {
            Alert.alert(t("add_bike_screen.all_fields_required"));
            return;
        }

        dispatch(setBikeName(name));
        dispatch(setBikeCity(city));

        navigation.navigate("AddLock", {
            context: "create"
        });
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(resetAddBike(null));
            return () => {
                setName("");
                setCity(null);
            };
        }, [])
    );

    return (
        <View style={addBikeStyles.container}>
            <StatusBar backgroundColor={COLORS.white} barStyle={"dark-content"}/>
            <View>
                <Text style={addBikeStyles.title}>{t("add_bike_screen.bike")} {name}</Text>
                <Text style={addBikeStyles.label}>{t("add_bike_screen.bike_name")}</Text>
                <TextInput
                    style={addBikeStyles.input}
                    value={name}
                    onChangeText={value => setName(value)}
                />
            </View>
            <Text style={addBikeStyles.label}>{t("add_bike_screen.city")}</Text>
            <DropDownPicker
                placeholder={"Sélectionner une ville"}
                zIndex={1000}
                zIndexInverse={1000}
                items={cities.map(item => {
                    return {
                        label: item.name,
                        value: item.id,
                    };
                })}
                style={
                    Platform.OS === "android"
                        ? pickerSelectStyles.inputAndroid
                        : pickerSelectStyles.inputIOS
                }
                value={cityItem}
                open={openCity}
                setOpen={setOpenCity}
                setValue={setCity}
                onPress={setOpenCity}
            />
            <View style={addBikeStyles.footer}>
                <View style={addBikeStyles.noButton}>
                    <ReportButton
                        style={{marginLeft: 2}}
                        value="Valider"
                        onClick={handleValidate}
                    />
                </View>
            </View>
        </View>
    );
};
