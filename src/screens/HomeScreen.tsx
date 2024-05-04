import {DEFAULT_COORDS} from "@assets/constant";
import {FeatherIcon} from "@assets/icons/icons";
import useFocusedInterval from "@hooks/useFocusedInterval";
import {Bike, MarkerData} from "@models/dto/MarkerData";
import {MeResponse} from "@models/dto/MeResponse";
import RequestLocationPermission from "@permissions/LocationPermission";
import {useFocusEffect} from "@react-navigation/native";
import {loginSuccess, resetMe} from "@redux/reducers/auth";
import {
    resetBike,
    selectBike,
    setBikeLastUpdate,
    setBikeStatusFilter,
    setBikeTagFilter,
    updateBikeCache,
    updateBikes
} from "@redux/reducers/bike";
import {resetCity, setCities, setCityPolygons, setCityRedZones} from "@redux/reducers/city";
import {setLatLng, setStaticState} from "@redux/reducers/global";
import {resetReport} from "@redux/reducers/report";
import {resetSpot, selectSpot, setSpotFilter, updateSpots} from "@redux/reducers/spot";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import {getBikes, updateBikeAddress} from "@services/bikesService";
import {retryPostReport} from "@services/reportService";
import {getSpots} from "@services/spotsService";
import {BottomTabsScreenProps} from "@stacks/types";
import {homeScreenStyle} from "@styles/HomeScreenStyle";
import {GET_ADMIN_ME, GET_CITIES, GET_CITY_POLYGONS, GET_CITY_RED_ZONES} from "@utils/endPoints";
import {getPosition} from "@utils/helpers";
import {t} from "i18next";
import React, {lazy, memo, Suspense, useCallback, useEffect, useRef, useState} from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewProps
} from "react-native";
import MapView from "react-native-maps";

import {useAppDispatch, useAppSelector} from "../hooks";
import {
    BikeStatusType,
    BikeTagType,
    GetCitiesOutput,
    GetCityPolygonsOutput,
    GetCityRedZonesOutput,
} from "@bikairproject/shared";

const MarkerDetailsBike = lazy(() => import("@components/MarkerDetailsBike"));
const MarkerDetailsSpot = lazy(() => import("@components/MarkerDetailsSpot"));
const SearchBar = lazy(() => import("@components/SearchBar"));
const SpotsFilter = lazy(() => import("@components/SpotsFilter"));
const StatusFilter = lazy(() => import("@components/StatusFilter"));
const TagFilter = lazy(() => import("@components/TagFilter"));
const AppMap = lazy(() => import("@containers/AppMap"));

interface Props extends ViewProps, BottomTabsScreenProps<"Home"> {
}

const HomeScreen: React.FC<Props> = ({navigation}): React.ReactElement => {
    const map = useRef<MapView>(null);
    const access_rights = useAppSelector(state => state.auth.me?.access_rights ?? []);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const bikes = useAppSelector(state => state.bike.bikes);
    const spots = useAppSelector(state => state.spot.spots);
    const cities = useAppSelector(state => state.city.cityPolygons);
    const cityRedZones = useAppSelector(state => state.city.cityRedZones);
    const lastUpdate = useAppSelector(state => state.bike.lastUpdate);
    const statusFilters = useAppSelector(state => state.bike.statusFilters);
    const tagFilters = useAppSelector(state => state.bike.tagFilters);
    const spotsFilter = useAppSelector(state => state.spot.spotFilter);
    const userLatitude = useAppSelector(state => state.global.lat);
    const userLongitude = useAppSelector(state => state.global.lng);
    const [lockPosition, setLockPosition] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);

    const dispatch = useAppDispatch();

    const getLocation = async () => {
        try {
            await RequestLocationPermission();
            const locations: any = await getPosition();
            const {latitude, longitude} = locations.coords;
            dispatch(setLatLng({lat: latitude, lng: longitude}));
            if (typeof map?.current?.animateToRegion !== "undefined") {
                map.current.animateToRegion({
                    ...DEFAULT_COORDS,
                    latitude: latitude,
                    longitude: longitude,
                });
            }
        } catch (err) {
            console.log("getLocation", err);
            Alert.alert("Allumer votre GPS");
        }
    };

    const refreshCache = async () => {
        setLoading(true);
        try {
            console.log("Reset Bike **********");
            dispatch(resetBike());
            const response = await getBikes();
            dispatch(updateBikes(response?.rows));

            console.log("Reset Spot **********");
            dispatch(resetSpot());
            const responseSpots = await getSpots();
            dispatch(updateSpots(responseSpots));

            console.log("Reset Cities **********");
            dispatch(resetCity());
            await getCities();

            console.log("Reset Me **********");
            dispatch(resetMe());
            const meResponse = await instanceaxiosApi.get<MeResponse>(GET_ADMIN_ME);
            const me = meResponse.data;
            dispatch(loginSuccess(me));
            dispatch(setStaticState(me.STATIC_DATA));

            console.log("Reset Report **********");
            dispatch(resetReport());

            if (isAuthenticated) {
                dispatch(setBikeLastUpdate(response?.lastUpdate));
            } else {
                dispatch(setBikeLastUpdate(null));
            }
        } catch (err) {
            console.log("refreshCache", err);
        } finally {
            setLoading(false);
        }
    };

    const getNearByBikes = async () => {
        try {
            const response = await getBikes(lastUpdate);
            dispatch(updateBikes(response?.rows));

            if (isAuthenticated) {
                dispatch(setBikeLastUpdate(response?.lastUpdate));
            } else {
                dispatch(setBikeLastUpdate(null));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getNearBySpots = async () => {
        try {
            const response = await getSpots(userLatitude, userLongitude);
            dispatch(updateSpots(response));
        } catch (err) {
            console.log("getNearBySpots", err);
        }
    };

    const getCities = async () => {
        try {
            const promiseCities = await instanceaxiosApi.get<GetCitiesOutput>(GET_CITIES);
            dispatch(setCities(promiseCities.data.rows));

            const promiseCityPolygons = await instanceaxiosApi.get<GetCityPolygonsOutput>(GET_CITY_POLYGONS);
            dispatch(setCityPolygons(promiseCityPolygons.data.rows ?? promiseCityPolygons.data));

            const promiseCityRedZone = await instanceaxiosApi.get<GetCityRedZonesOutput>(GET_CITY_RED_ZONES);
            dispatch(setCityRedZones(promiseCityRedZone.data.rows ?? promiseCityRedZone.data));
        } catch (err) {
            console.log("getCities", err);
        }
    };

    const handleBikeStatusFilterChange = (filter: BikeStatusType) => {
        dispatch(setBikeStatusFilter(filter));
    };

    const handleBikeTagFilterChange = (filter: BikeTagType) => {
        dispatch(setBikeTagFilter(filter));
    };

    const handleSpotFilterChange = (filter: boolean) => {
        dispatch(setSpotFilter(filter));
    };

    const handleLockPositionPress = () => {
        getLocation().then(() => {
            setLockPosition(!lockPosition);
        });
    };

    const handleMarkerClick = (element: MarkerData) => {
        if (element.marker_type === "BIKE") {
            dispatch(selectBike(element.uuid));
            dispatch(selectSpot(null));
            const markerBike = element as Bike;
            updateBikeAddress(markerBike).then(bike => {
                const newBike = {
                    ...markerBike,
                    address: bike.address
                };
                dispatch(updateBikeCache(newBike));
                dispatch(selectBike(newBike.uuid));
            });
        }
        if (element.marker_type === "SPOT") {
            dispatch(selectSpot(element.uuid));
            dispatch(selectBike(null));
        }
    };

    const handleOpenDetailsScreen = () => {
        navigation.navigate("BikeStack", {
            screen: "Bike"
        });
    };

    //Fetch bikes list every 30second
    useFocusedInterval(() => {
        getNearByBikes().catch(error => console.log("useFocusedInterval", error));
    }, 30000);

    const onOpenActions = () => {
        getLocation().finally(() => console.log(""));
    };

    useFocusEffect(
        useCallback(() => {
            dispatch(selectBike(null));
            dispatch(selectSpot(null));
            retryPostReport()
                .then(() => {
                    console.log("Report saved");
                })
                .finally(() => {
                    getNearByBikes()
                        .catch(error => console.log("useFocusEffect", error));
                });
        }, [])
    );

    useFocusEffect(useCallback(() => {
        onOpenActions();
    }, []));

    useEffect(() => {
        dispatch(selectBike(null));
        dispatch(selectSpot(null));
        getNearBySpots().catch(error => console.log("useEffect-1", error));
        getCities().catch(error => console.log("useEffect-2", error));
        getCities().catch(error => console.log("useEffect-2", error));
    }, []);

    const onSearchBikeLocation = (bikeName: string) => {
        const bike = Object.values(bikes).find((bike: Bike) => bike.name == bikeName);
        if (bike) {
            map.current && map.current.animateToRegion({
                ...DEFAULT_COORDS,
                latitude: bike.marker_coordinates.coordinates[1],
                longitude: bike.marker_coordinates.coordinates[0],
            });
        } else {
            Alert.alert("Aucun vélo trouvé");
        }
    };


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={homeScreenStyle.container}>
                <Suspense fallback={<View></View>}>
                    <AppMap
                        ref={map}
                        bikes={Object.values(bikes)}
                        spots={Object.values(spots)}
                        cities={cities}
                        cityRedZones={cityRedZones}
                        statusFilters={statusFilters}
                        tagFilters={tagFilters}
                        spotFilter={spotsFilter}
                        followUserPosition={lockPosition}
                        onMarkerClick={handleMarkerClick}
                    />
                </Suspense>
                <Suspense fallback={<View></View>}>
                    <SearchBar onPress={onSearchBikeLocation} placeholder={t("forms.search_bike_place_holder")}/>
                </Suspense>
                <View style={homeScreenStyle.btnWrapperRight}>
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
                                filters={tagFilters}
                                onFilterChange={handleBikeTagFilterChange}
                            />
                        </Suspense>
                        : null
                    }
                    <Suspense fallback={<View></View>}>
                        <SpotsFilter
                            filter={spotsFilter}
                            onFilterChange={handleSpotFilterChange}
                        />
                    </Suspense>
                    <TouchableOpacity onPress={getLocation} activeOpacity={0.8}>
                        <View
                            style={homeScreenStyle.control}>
                            <FeatherIcon
                                name="crosshair"
                                size={30}
                                color="grey"
                            />
                        </View>
                    </TouchableOpacity>
                    {access_rights.includes("LOCK_GPS") ?
                        <TouchableOpacity
                            onPress={handleLockPositionPress}
                            activeOpacity={0.8}>
                            <View
                                style={[homeScreenStyle.control, {marginTop: 10}]}>
                                <FeatherIcon
                                    name={lockPosition ? "lock" : "unlock"}
                                    size={30}
                                    color="grey"
                                />
                            </View>
                        </TouchableOpacity>
                        : null
                    }

                </View>

                {access_rights.includes("REFRESH_DATA") ?
                    <View style={homeScreenStyle.btnWrapperLeft}>
                        <TouchableOpacity onPress={refreshCache} activeOpacity={0.8}>
                            <View
                                style={homeScreenStyle.control}>
                                {
                                    loading ?
                                        <ActivityIndicator
                                            style={{display: "flex", alignItems: "center", justifyContent: "center"}}
                                            size="large"
                                            color={"lightblue"}
                                        />
                                        : <FeatherIcon
                                            name="refresh-cw"
                                            size={30}
                                            color="grey"
                                        />
                                }
                            </View>
                        </TouchableOpacity>

                    </View>
                    : null
                }
                <Suspense fallback={<View></View>}>
                    <MarkerDetailsBike onOpenDetails={handleOpenDetailsScreen}/>
                </Suspense>
                <Suspense fallback={<View></View>}>
                    <MarkerDetailsSpot/>
                </Suspense>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default memo(HomeScreen);


