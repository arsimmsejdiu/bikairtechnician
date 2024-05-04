import {DEFAULT_COORDS} from "@assets/constant";
import CityPolygon from "@components/CityPolygon";
import CityPolygonRedZones from "@components/CityPolygonRedZones";
import CityPolygonSpot from "@components/CityPolygonSpot";
import BikeCluster from "@containers/BikeCluster";
import SpotCluster from "@containers/SpotCluster";
import useFocusedDestroyAction from "@hooks/useFocusedDestroyAction";
import {Geometry} from "@models/dto/Geometry";
import {Bike, MarkerData, Spot} from "@models/dto/MarkerData";
import RequestLocationPermission from "@permissions/LocationPermission";
import {setLatLng} from "@redux/reducers/global";
import {getPosition} from "@utils/helpers";
import React, {forwardRef, memo, MutableRefObject, RefAttributes, useState} from "react";
import {Dimensions, StyleSheet, ViewProps} from "react-native";
import SuperCluster from "react-native-clusterer/lib/typescript/types";
import MapView, {PROVIDER_GOOGLE, Region} from "react-native-maps";
import {UserLocationChangeEvent} from "react-native-maps/lib/MapView.types";
import {useDispatch} from "react-redux";

import {BikeStatusType, BikeTagType, CityPolygons, CityRedZones} from "@bikairproject/shared";

const MAP_WIDTH = Dimensions.get("window").width;
const MAP_HEIGHT = Dimensions.get("window").height;


interface Props extends ViewProps {
    bikes: Bike[],
    spots: Spot[],
    cities: CityPolygons[],
    cityRedZones: CityRedZones[],
    statusFilters: BikeStatusType[],
    tagFilters: BikeTagType[],
    spotFilter: boolean,
    followUserPosition: boolean,
    onMarkerClick: (element: MarkerData) => void,
}


const AppMap: React.FC<Props & RefAttributes<MapView>> = forwardRef<MapView, Props>((
    {
        bikes,
        spots,
        cities,
        cityRedZones,
        statusFilters,
        tagFilters,
        spotFilter,
        followUserPosition,
        onMarkerClick,
    }, ref): React.ReactElement => {

    const [region, setRegion] = useState<Region>(DEFAULT_COORDS);
    const [zoom, setZoom] = useState(0);

    const dispatch = useDispatch();


    const getMapRef = () => {
        if (!ref) {
            return null;
        } else {
            return ref as MutableRefObject<MapView>;
        }
    };

    const handleInitMap = async () => {
        await RequestLocationPermission();
        const locations: any = await getPosition();
        dispatch(setLatLng({lat: locations.coords.latitude, lng: locations.coords.longitude}));
        const currentRegion = {
            ...DEFAULT_COORDS,
            latitude: locations.coords.latitude,
            longitude: locations.coords.longitude,
        };
        setRegion(currentRegion);
        const mapRef = getMapRef();
        if (mapRef) {
            mapRef.current.animateToRegion(currentRegion);
        }
    };

    const handleRegionChange = async (region: Region) => {
        setRegion(region);
        const nextZoom = Math.log2(360 * ((MAP_WIDTH / 256) / region.longitudeDelta)) + 1;
        setZoom(nextZoom);
    };

    const handleUserMoveChange = async (event: UserLocationChangeEvent) => {
        if (followUserPosition && event.nativeEvent.coordinate) {
            const mapRef = getMapRef();
            if (mapRef) {
                mapRef.current.animateToRegion({
                    ...region,
                    latitude: event.nativeEvent.coordinate.latitude,
                    longitude: event.nativeEvent.coordinate.longitude,
                });
            }
        }
    };

    const handleMarkerClick = (element: SuperCluster.PointFeature<MarkerData>) => {
        onMarkerClick(element.properties);
        const mapRef = getMapRef();
        if (mapRef) {
            mapRef.current.animateCamera(
                {
                    center: {
                        latitude: element.geometry.coordinates[1],
                        longitude: element.geometry.coordinates[0]
                    }, pitch: 2, heading: 20, altitude: 200, zoom: 20
                });
        }
    };

    const handleClusterClick = (element: SuperCluster.ClusterFeatureClusterer<SuperCluster.AnyProps>) => {
        const newRegion = element.properties.getClusterExpansionRegion();
        newRegion.longitudeDelta = newRegion.longitudeDelta + (newRegion.longitudeDelta / 2);
        newRegion.latitudeDelta = newRegion.latitudeDelta + (newRegion.latitudeDelta / 2);
        const mapRef = getMapRef();
        if (mapRef) {
            mapRef.current.animateToRegion(newRegion);
        }
    };

    const setGeometry = <T extends MarkerData>(element: T): Geometry<T> | null => {
        if (typeof element?.marker_coordinates?.coordinates === "undefined" || element.marker_coordinates.coordinates === null) {
            return null;
        }
        if (typeof element.marker_coordinates.coordinates[0] === "undefined" || element.marker_coordinates.coordinates[0] === null) {
            return null;
        }
        if (typeof element.marker_coordinates.coordinates[1] === "undefined" || element.marker_coordinates.coordinates[1] === null) {
            return null;
        }
        return {
            type: "Feature",
            properties: element,
            geometry: element.marker_coordinates,
            polygon: {
                type: "Polygon",
                coordinates: element.polygon?.coordinates ?? null
            }
        };
    };

    useFocusedDestroyAction(() => {
        const {latitude, longitude} = region;
        dispatch(setLatLng({lat: latitude, lng: longitude}));
    });

    return (
        <MapView
            ref={ref}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={{
                width: MAP_WIDTH,
                height: MAP_HEIGHT,
                ...styles.map
            }}
            loadingEnabled={true}
            loadingIndicatorColor={"#666666"}
            initialRegion={region}
            onRegionChangeComplete={handleRegionChange}
            showsUserLocation={true}
            zoomControlEnabled={false}
            zoomEnabled={true}
            userInterfaceStyle="light"
            zoomTapEnabled={true}
            showsMyLocationButton={false}
            onUserLocationChange={handleUserMoveChange}
            onMapReady={handleInitMap}
        >
            <BikeCluster
                bikes={bikes}
                statusFilters={statusFilters}
                tagFilters={tagFilters}
                handleMarkerClick={handleMarkerClick}
                handleClusterClick={handleClusterClick}
                zoom={zoom}
                region={region}
                setGeometry={setGeometry}
            />

            <SpotCluster
                spots={spots}
                spotFilter={spotFilter}
                handleMarkerClick={handleMarkerClick}
                zoom={zoom}
                region={region}
                setGeometry={setGeometry}
            />
            <CityPolygonSpot citySpots={spots}/>
            <CityPolygon cities={cities}/>
            <CityPolygonRedZones cityRedZones={cityRedZones}/>
        </MapView>
    );
});

export default memo(AppMap);


const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});
