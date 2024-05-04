import {ReportButton} from "@components/Button";
import {useAppDispatch, useAppSelector} from "@hooks/index";
import {Spot} from "@models/dto/MarkerData";
import {ReportPageConfig} from "@models/dto/ReportPageConfig";
import {setReportSpot} from "@redux/reducers/report";
import {pickerSelectStyles, spotStepStyles} from "@styles/ReportStyles";
import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {useTranslation} from "react-i18next";
import {Platform, Text, View, ViewProps} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

import {GetCitiesOutputData} from "@bikairproject/shared";

interface Props extends ViewProps {
    config: ReportPageConfig;
    loading: boolean;
    onYes: () => void;
}

interface FormData {
    cityId: number | null;
    spotId: number | null;
}

export const SpotStep: React.FC<Props> = (
    {
        config,
        loading,
        onYes
    }): React.ReactElement => {
    const dispatch = useAppDispatch();
    const {t} = useTranslation();

    const cities = useAppSelector(state => state.city.cities);
    const spotsMap = useAppSelector(state => state.spot.spots);
    const user = useAppSelector(state => state.auth.me);

    const [citySelected, setCitySelected] = useState(false);
    const [spots, setSpots] = useState<Spot[]>([]);
    const [openCity, setOpenCity] = useState<boolean>(false);
    const [openSpots, setOpenSpots] = useState<boolean>(false);

    const [cityItem, setCityItem] = useState<number | null>(null);
    const [spotItem, setSpotItem] = useState<number | null>(null);

    const {
        control,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<FormData>({
        defaultValues: {
            cityId: null,
            spotId: null
        }
    });

    useEffect(() => {
        setOpenSpots(false);
    }, [openCity]);
    useEffect(() => {
        setOpenCity(false);
    }, [openSpots]);

    // Filter the list of city
    const filterCities = (cities: GetCitiesOutputData[]) => {
        console.log(user?.cities);
        if (user?.cities && user?.cities.length > 0) {
            return cities.filter((city: GetCitiesOutputData) => city.name && user.cities.includes(city.id));
        } else {
            return cities;
        }
    };

    const handleValidate = () => {
        onYes();
    };

    const selectSpots = (cityId: number) => {
        console.log("cityId : ", cityId);
        console.log(spotsMap);
        const newSpots: Spot[] = [];
        const spotValues = Object.values(spotsMap);
        console.log(spotValues);
        for (const spot of spotValues) {
            console.log(spot);
            if (spot.city_id === cityId) {
                newSpots.push(spot);
            }
        }
        console.log(newSpots);
        return newSpots;
    };

    useEffect(() => {
        setValue("cityId", cityItem);
        if (cityItem) {
            setCitySelected(true);
            setSpots(selectSpots(cityItem));
        } else {
            setValue("spotId", null);
            setCitySelected(false);
            setSpots([]);
        }
    }, [cityItem]);

    useEffect(() => {
        setValue("spotId", spotItem);
        const spot = spots.filter(s => s.id === spotItem)[0];
        dispatch(setReportSpot(spot));
    }, [spotItem]);

    return (
        <View style={spotStepStyles.container}>
            <Text style={spotStepStyles.text}>{config.text}</Text>
            <View style={{
                zIndex: 4
            }}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <DropDownPicker
                            placeholder={"Sélectionner une ville"}
                            zIndex={2000}
                            zIndexInverse={3000}
                            style={
                                Platform.OS === "android"
                                    ? pickerSelectStyles.inputAndroid
                                    : pickerSelectStyles.inputIOS
                            }
                            value={value}
                            items={filterCities(cities).map((item: GetCitiesOutputData) => {
                                return {
                                    label: item.name,
                                    value: item.id,
                                };
                            })}
                            open={openCity}
                            setOpen={setOpenCity}
                            setValue={setCityItem}
                            onPress={setOpenCity}
                        />
                    )}
                    name="cityId"
                />
            </View>
            {errors.cityId && <Text style={{zIndex: -1}}>{t("question_flow.spot_step.required")}</Text>}
            <View style={{
                zIndex: 3
            }}>
                <Controller
                    control={control}
                    rules={{
                        required: true,
                    }}
                    render={({field: {onChange, value}}) => (
                        <DropDownPicker
                            placeholder={!citySelected ? "Choisir une ville avant de choisir un spot" : "Sélectionner un spot"}
                            zIndex={1000}
                            zIndexInverse={2000}
                            style={
                                Platform.OS === "android"
                                    ? pickerSelectStyles.inputAndroid
                                    : pickerSelectStyles.inputIOS
                            }
                            value={value}
                            items={spots.map(item => {
                                return {
                                    label: item.name,
                                    value: item.id,
                                };
                            })}
                            open={openSpots}
                            setOpen={setOpenSpots}
                            setValue={setSpotItem}
                            disabled={!citySelected}
                            onPress={setOpenSpots}
                        />
                    )}
                    name="spotId"
                />
            </View>

            {errors.spotId && <Text style={{zIndex: -1}}>This is required.</Text>}
            <ReportButton
                style={spotStepStyles.footer}
                value={config.yes.label}
                onClick={handleSubmit(handleValidate)}
                inProgress={loading}
            />
        </View>
    );
};

