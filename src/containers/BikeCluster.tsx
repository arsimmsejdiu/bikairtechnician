import MarkerBike from "@components/MarkerBike";
import MarkerCluster from "@components/MarkerCluster";
import {Geometry} from "@models/dto/Geometry";
import {Bike,MarkerData} from "@models/dto/MarkerData";
import {useFocusEffect} from "@react-navigation/native";
import React, {useCallback, useState} from "react";
import {Dimensions, ViewProps} from "react-native";
import {useClusterer} from "react-native-clusterer";
import SuperCluster from "react-native-clusterer/lib/typescript/types";
import {Marker, Region} from "react-native-maps";

import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

const MAP_WIDTH = Dimensions.get("window").width;
const MAP_HEIGHT = Dimensions.get("window").height;
const MAP_DIMENSIONS = {width: MAP_WIDTH, height: MAP_HEIGHT};

interface Props extends ViewProps {
    bikes: Bike[],
    statusFilters: BikeStatusType[],
    tagFilters: BikeTagType[],
    region: Region,
    handleMarkerClick: (element: SuperCluster.PointFeature<MarkerData>) => void,
    handleClusterClick: (element: SuperCluster.ClusterFeatureClusterer<SuperCluster.AnyProps>) => void,
    zoom: number,
    setGeometry: (bike: Bike) => Geometry<Bike> | null
}

export const BikeCluster: React.FC<Props> = (
    {
        bikes,
        statusFilters,
        tagFilters,
        handleMarkerClick,
        handleClusterClick,
        setGeometry,
        zoom,
        region
    }
): React.ReactElement => {

    const [bikesValue, setBikesValue] = useState<Geometry<Bike>[]>([]);

    const [bikePoints, bikeSuperCluster] = useClusterer(
        bikesValue,
        MAP_DIMENSIONS,
        region,
        {
            radius: 10
        }
    );

    useFocusEffect(
        useCallback(() => {
            const newBikeValues: Geometry<Bike>[] = [];
            if (bikes.length > 0) {
                for (const bike of bikes) {
                    const statusMatch = statusFilters.length === 0 || statusFilters.includes(bike.status);
                    const tagsMatch = tagFilters.length === 0 || bike.tags.filter(t => tagFilters.includes(t)).length !== 0;
                    if (statusMatch && tagsMatch && !bike.reported) {
                        const geometry = setGeometry(bike);
                        if (geometry) {
                            newBikeValues.push(geometry);
                        }
                    }

                }
            }
            setBikesValue([...newBikeValues]);
        }, [bikes, statusFilters, tagFilters])
    );

    return <>
        {
            bikePoints.flatMap((point) => {
                if (point.properties.cluster) {
                    const clusterPoint = point as SuperCluster.ClusterFeatureClusterer<SuperCluster.AnyProps>;
                    if (zoom > 20) {
                        return bikeSuperCluster.getLeaves(clusterPoint.properties.cluster_id).map((leaf) => {
                            const bike = leaf.properties;
                            return (
                                <Marker
                                    key={bike.nodeId}
                                    identifier={bike.uuid}
                                    onPress={() => handleMarkerClick(leaf)}
                                    coordinate={{
                                        longitude: leaf.geometry.coordinates[0],
                                        latitude: leaf.geometry.coordinates[1],
                                    }}
                                    tracksViewChanges={false}
                                >
                                    <MarkerBike element={bike}/>
                                </Marker>
                            );
                        });
                    } else {
                        return (
                            <Marker
                                key={`cluster-${clusterPoint.properties.cluster_id}`}
                                identifier={`${clusterPoint.properties.cluster_id}`}
                                onPress={() => handleClusterClick(clusterPoint)}
                                coordinate={{
                                    longitude: clusterPoint.geometry.coordinates[0],
                                    latitude: clusterPoint.geometry.coordinates[1],
                                }}
                                tracksViewChanges={false}
                            >
                                <MarkerCluster element={clusterPoint}/>
                            </Marker>
                        );
                    }
                } else {
                    const leaf = point as SuperCluster.PointFeature<Bike>;
                    const bike = leaf.properties;
                    return (
                        <Marker
                            key={bike.nodeId}
                            identifier={bike.uuid}
                            onPress={() => handleMarkerClick(leaf)}
                            coordinate={{
                                longitude: leaf.geometry.coordinates[0],
                                latitude: leaf.geometry.coordinates[1],
                            }}
                            tracksViewChanges={false}
                        >
                            <MarkerBike element={bike}/>
                        </Marker>
                    );
                }
            })
        }
    </>;
};

export default BikeCluster;
