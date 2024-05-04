import {BikeImg, COLORS} from "@assets/index";
import {ImageAtom} from "@components/Atom/ImageAtom";
import {TextAtom} from "@components/Atom/TextAtom";
import {BikeReportCheckIconsOrganisms} from "@components/Organisms/BikeReportCheckIconsOrganisms";
import {useAppDispatch, useAppSelector, useFocusedDestroyAction} from "@hooks/index";
import {Bike} from "@models/dto/MarkerData";
import {useFocusEffect} from "@react-navigation/native";
import {selectBike, setBikeLastUpdate, setBikeStatusFilter, setBikeTagFilter, updateBikes} from "@redux/reducers/bike";
import {getBikes} from "@services/bikesService";
import {BikeStackScreenProps} from "@stacks/types";
import {bikeListStyles} from "@styles/ScreenStyles";
import {statusColor} from "@utils/StatusColor";
import React, {lazy, memo, Suspense, useCallback, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {Animated, SafeAreaView, StatusBar, View, ViewProps} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

const SkeletonLoader = lazy(() => import("@components/SkeletonLoader"));
const SearchBar = lazy(() => import("@components/SearchBar"));
const StatusFilter = lazy(() => import("@components/StatusFilter"));
const TagFilter = lazy(() => import("@components/TagFilter"));

interface Props extends ViewProps, BikeStackScreenProps<"BikeList"> {
}

const BikeListScreen: React.FC<Props> = ({navigation,}): React.ReactElement => {
    const access_rights = useAppSelector(state => state.auth.me?.access_rights ?? []);
    const scrollY = React.useRef(new Animated.Value(0)).current;
    const bikeData = useAppSelector(state => state.bike.bikes);
    const lastUpdate = useAppSelector(state => state.bike.lastUpdate);
    const statusFilters = useAppSelector(state => state.bike.statusFilters);
    const tagsFilters = useAppSelector(state => state.bike.tagFilters);

    // Redux
    const {t} = useTranslation();
    const dispatch = useAppDispatch();
    const [textFilter, setTextFilter] = useState("");
    const [bikeFiltered, setBikeFiltered] = useState<Bike[]>([]);

    const handleBikeStatusFilterChange = (filter: BikeStatusType) => {
        dispatch(setBikeStatusFilter(filter));
    };

    const handleBikeTagFilterChange = (filter: BikeTagType) => {
        dispatch(setBikeTagFilter(filter));
    };

    const filteredBikes = () => {
        const filter = textFilter ? textFilter.trim().toUpperCase() : "";
        let newBikeFiltered;
        if (!filter && statusFilters.length === 0 && tagsFilters.length === 0) {
            newBikeFiltered = Object.values(bikeData);
        } else {
            newBikeFiltered = [];
            for (const bike of Object.values(bikeData)) {
                if (typeof bike.name === "undefined") {
                    console.log(bike);
                } else {
                    if (filter) {
                        const nameMatch = !filter || bike.name.toUpperCase().includes(filter);
                        if (nameMatch) {
                            newBikeFiltered.push(bike);
                        }
                    } else {
                        const statusMatch = statusFilters.length === 0 || statusFilters.includes(bike.status);
                        const tagsMatch = tagsFilters.length === 0 || bike.tags.filter(t => tagsFilters.includes(t)).length !== 0;
                        if (statusMatch && tagsMatch) {
                            newBikeFiltered.push(bike);
                        }
                    }
                }
            }
        }

        return newBikeFiltered.sort((a, b) => {
            const aName = a.name ?? "";
            const bName = b.name ?? "";
            if (aName < bName) {
                return -1;
            }
            if (aName > bName) {
                return 1;
            }
            return 0;
        });
    };

    const memoizedFilteredBikes = useCallback(() => filteredBikes(), [bikeData, textFilter, statusFilters, tagsFilters]);

    const getBikeList = async () => {
        try {
            const response = await getBikes(lastUpdate);
            dispatch(updateBikes(response?.rows));
            dispatch(setBikeLastUpdate(response?.lastUpdate));
        } catch (err) {
            console.log(err);
        }
    };

    const handleSelectElement = (item: Bike) => () => {
        dispatch(selectBike(item.uuid));
        navigation.navigate("Bike");
    };

    useFocusedDestroyAction(() => {
        setTextFilter("");
    });

    useFocusEffect(
        useCallback(() => {
            dispatch(selectBike(null));
            getBikeList().finally(() => console.log(""));
        }, [])
    );

    useEffect(() => {
        setBikeFiltered(memoizedFilteredBikes());
    }, [bikeData, textFilter, statusFilters, tagsFilters]);

    return (
        <SafeAreaView style={bikeListStyles.container}>
            <StatusBar backgroundColor={COLORS.lightGrey} barStyle={"dark-content"}/>
            <View style={{
                paddingTop: 20,
                paddingHorizontal: 10,
                backgroundColor: COLORS.lightGrey
            }}>
                <TextAtom style={bikeListStyles.title}>
                    {bikeFiltered.length} {t("bike_list.bikes")}
                </TextAtom>
                <View style={bikeListStyles.fields}>
                    <Suspense fallback={<View></View>}>
                        <SearchBar
                            live={true}
                            onPress={setTextFilter}
                            placeholder={t("forms.search_bike_place_holder")}
                        />
                    </Suspense>
                </View>
            </View>
            {bikeFiltered.length !== 0 ? (
                <Animated.FlatList
                    keyboardShouldPersistTaps="always"
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {y: scrollY}}}],
                        {useNativeDriver: true}
                    )}
                    contentContainerStyle={{
                        paddingHorizontal: 10,
                        marginTop: 10,
                        marginBottom: 20
                    }}
                    data={bikeFiltered}
                    keyExtractor={(item) => item.uuid}
                    renderItem={({item, index}) => {
                        const SPACING = 20;
                        const CONTAINER_SPACE = 90;
                        const ITEM_SIZE = CONTAINER_SPACE + SPACING * 4;

                        const inputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 2),
                        ];

                        const opacityInputRange = [
                            -1,
                            0,
                            ITEM_SIZE * index,
                            ITEM_SIZE * (index + 1),
                        ];

                        const scale = scrollY.interpolate({
                            inputRange,
                            outputRange: [1, 1, 1, 0]
                        });

                        const opacity = scrollY.interpolate({
                            inputRange: opacityInputRange,
                            outputRange: [1, 1, 1, 0]
                        });

                        return (
                            <TouchableOpacity
                                onPress={handleSelectElement(item)}
                            >
                                <Animated.View style={{
                                    height: 150,
                                    borderRadius: 12,
                                    marginBottom: SPACING,
                                    padding: SPACING,
                                    overflow: "hidden",
                                    backgroundColor: statusColor(item.status),
                                    transform: [{scale}],
                                    opacity,
                                }}>
                                    <View>
                                        <TextAtom style={bikeListStyles.itemName}>
                                            {t("bike_list.bike")} : {item.name}
                                        </TextAtom>
                                        <TextAtom style={bikeListStyles.itemCapacity}>
                                            {t("bike_list.battery")} : {!item.capacity ? "Non installer" : item.capacity} km
                                        </TextAtom>
                                        <TextAtom style={bikeListStyles.itemState}>
                                            {t("bike_list.state")} : {t(`bike.status.${item.status}`)}
                                        </TextAtom>
                                    </View>
                                    <BikeReportCheckIconsOrganisms item={item}/>
                                    <ImageAtom resizeMode={"cover"} source={BikeImg} style={bikeListStyles.itemImage}/>
                                </Animated.View>
                            </TouchableOpacity>
                        );
                    }}
                />
            ) : (
                <View style={{
                    paddingHorizontal: 10,
                    marginTop: 10
                }}>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                    <SkeletonLoader/>
                </View>
            )}

            <View style={bikeListStyles.btnWrapperRight}>
                {access_rights.includes("FILTER_STATUS") ?
                    <Suspense fallback={<View></View>}>
                        <StatusFilter
                            filters={statusFilters}
                            onFilterChange={handleBikeStatusFilterChange}
                        />
                    </Suspense>
                    : null
                }
                {access_rights.includes("FILTER_TAGS") ?
                    <Suspense fallback={<View></View>}>
                        <TagFilter
                            filters={tagsFilters}
                            onFilterChange={handleBikeTagFilterChange}
                        />
                    </Suspense>
                    : null
                }
            </View>
        </SafeAreaView>
    );
};

export default memo(BikeListScreen);


