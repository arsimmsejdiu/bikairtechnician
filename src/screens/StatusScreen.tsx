import {BikeCityPicker} from "@components/BikeStatus/BikeCityPicker";
import {BikeStatusPicker} from "@components/BikeStatus/BikeStatusPicker";
import {BikeTagPicker} from "@components/BikeStatus/BikeTagPicker";
import {ReportButton} from "@components/Button";
import {useAppSelector} from "@hooks/index";
import {BikeInfos} from "@models/dto/BikeInfos";
import {updateBikeCache} from "@redux/reducers/bike";
import {setSnackbar} from "@redux/reducers/snackbar";
import {updateBikeInfos} from "@services/bikesService";
import {BikeStackScreenProps} from "@stacks/types";
import {StatusStyles} from "@styles/BikeStatusAndTagsStyles";
import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {
    ActivityIndicator,
    View,
    ViewProps
} from "react-native";
import {ItemType} from "react-native-dropdown-picker";
import {useDispatch} from "react-redux";

import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

interface Props extends ViewProps, BikeStackScreenProps<"Status"> {
}

const Status: React.FC<Props> = ({route}): React.ReactElement => {
    const {t} = useTranslation();

    const dispatch = useDispatch();
    const STATIC_DATA = useAppSelector(state => state.global.staticState);
    const user = useAppSelector(state => state.auth.me);
    const cities = useAppSelector(state => state.city.cities);

    const [bikeId, setBikeId] = useState<number | string>(0);
    const [statusItems, setStatusItems] = useState<ItemType<BikeStatusType>[]>(
        []
    );
    const [statusItem, setStatusItem] = useState<BikeStatusType | null>(null);
    const [cityItems, setCityItems] = useState<ItemType<number>[]>([]);
    const [cityItem, setCityItem] = useState<number | null>(null);
    const [tagsItem, setTagsItem] = useState<ItemType<BikeTagType>[]>([]);
    const [tagsSelected, setTagsSelected] = useState<BikeTagType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [openCity, setOpenCity] = useState<boolean>(false);
    const [openTags, setOpenTags] = useState<boolean>(false);

    const statusUpdate = STATIC_DATA?.status_update || [];
    const tabUpdate = STATIC_DATA?.tag_update|| [];
    console.log("Tags", tabUpdate);

    const itemsStatus = statusUpdate.map(status => {
        return {
            label: t(`bike.status.${status}`) as string,
            value: status,
        };
    });

    const itemTag = tabUpdate.map(tag => {
        return {
            label: t(`bike.tags.${tag}`),
            value: tag
        };
    });

    useEffect(() => {
        setOpenCity(false);
        setOpenTags(false);
    }, [openStatus]);
    useEffect(() => {
        setOpenTags(false);
        setOpenStatus(false);
    }, [openCity]);
    useEffect(() => {
        setOpenCity(false);
        setOpenStatus(false);
    }, [openTags]);

    const handleUpdateBikeInfos = async () => {
        try {
            setLoading(true);
            if (statusItem && cityItem) {
                const bikeToUpdate: BikeInfos = {
                    id: bikeId,
                    status: statusItem,
                    tags: tagsSelected.map(item => item),
                    city_id: cityItem,
                };
                const newBike = await updateBikeInfos(bikeToUpdate);

                if (newBike) {
                    console.log(newBike);
                    dispatch(setSnackbar({message: "Données modifiées avec succès", type: "success"}));
                    dispatch(updateBikeCache(newBike));
                }
            }
        } catch (e: any) {
            dispatch(setSnackbar({message: e.message, type: "danger"}));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("------- Init -------");
        if (route.params?.bikeId) {
            console.log("bikeId: ", route.params.bikeId);
            setBikeId(route.params.bikeId);
        }
        if (route.params?.status) {
            console.log("status: ", route.params.status);
            setStatusItem(route.params.status);
        }
        if (route.params?.city_id) {
            console.log("city_id: ", route.params.city_id);
            setCityItem(route.params.city_id);
        }
        if (route.params?.tags) {
            console.log("tags: ", route.params.tags);
            setTagsSelected(route.params.tags);
        }
        console.log("------------------");
    }, [route.params]);

    useEffect(() => {
        console.log("update status list");
        if (STATIC_DATA?.status_update) {
            setStatusItems(itemsStatus);
        }
    }, [STATIC_DATA?.status_update]);

    useEffect(() => {
        console.log("update city list");
        setCityItems(
            cities.map(city => {
                return {
                    label: city.name,
                    value: city.id
                };
            })
        );
    }, [cities]);

    useEffect(() => {
        console.log("update tag list");
        if (STATIC_DATA?.tag_update) {
            setTagsItem(itemTag);
        }
    }, [STATIC_DATA?.tag_update]);

    useEffect(() => {
        console.log("------- Selection -------");
        console.log(statusItem);
        console.log(cityItem);
        console.log(tagsSelected);
        console.log("------------------");
    }, [statusItem, cityItem, tagsSelected]);

    const renderStatusPicker = () => {
        if (user?.access_rights.includes("UPDATE_BIKE_STATUS")) {
            return (
                <BikeStatusPicker
                    value={statusItem}
                    items={statusItems}
                    open={openStatus}
                    setOpen={setOpenStatus}
                    setValue={setStatusItem}
                    onPress={setOpenStatus}
                    zIndex={1000}
                    zIndexInverse={1000}
                    style={{zIndex: 4}}
                    text={t("status_screen.select_status")}
                />
            );
        } else {
            return null;
        }
    };

    const renderCityPicker = () => {
        if (user?.access_rights.includes("UPDATE_BIKE_CITY")) {
            return (
                <BikeCityPicker
                    value={cityItem}
                    items={cityItems}
                    open={openCity}
                    setOpen={setOpenCity}
                    setValue={setCityItem}
                    onPress={setOpenCity}
                    zIndex={1000}
                    zIndexInverse={2000}
                    style={{zIndex: 3}}
                    text={t("status_screen.select_city")}
                />
            );
        } else {
            return null;
        }
    };

    const renderTagsPicker = () => {
        if (user?.access_rights.includes("UPDATE_BIKE_TAGS")) {
            return (
                <BikeTagPicker
                    value={tagsSelected}
                    items={tagsItem}
                    open={openTags}
                    setOpen={setOpenTags}
                    setValue={setTagsSelected}
                    onPress={setOpenTags}
                    zIndex={1000}
                    zIndexInverse={3000}
                    style={{zIndex: 1}}
                    mode={"BADGE"}
                    text={t("status_screen.select_tag")}
                />
            );
        } else {
            return null;
        }
    };

    return (
        <View style={StatusStyles.root}>
            {loading ? (
                <ActivityIndicator
                    size="small"
                    color="#4F8AFF"
                    style={{marginBottom: 20}}
                />
            ) : null}
            <View>
                {renderStatusPicker()}
                {renderCityPicker()}
                {renderTagsPicker()}
            </View>
            <View style={StatusStyles.footer}>
                <View style={StatusStyles.noButton}>
                    <ReportButton
                        style={{marginLeft: 2}}
                        value={t("ReportButton.validate") ?? "Valider"}
                        onClick={handleUpdateBikeInfos}
                        inProgress={loading}
                    />
                </View>
            </View>
        </View>
    );
};

export default Status;
