import MarkerSpot from "@components/MarkerSpot";
import {Geometry} from "@models/dto/Geometry";
import {MarkerData, Spot} from "@models/dto/MarkerData";
import {useFocusEffect} from "@react-navigation/native";
import React, {useCallback, useState} from "react";
import {Dimensions, ViewProps} from "react-native";
import {useClusterer} from "react-native-clusterer";
import SuperCluster from "react-native-clusterer/lib/typescript/types";
import {Marker, Region} from "react-native-maps";

const MAP_WIDTH = Dimensions.get("window").width;
const MAP_HEIGHT = Dimensions.get("window").height;
const MAP_DIMENSIONS = {width: MAP_WIDTH, height: MAP_HEIGHT};

interface Props extends ViewProps {
    spots: Spot[],
    spotFilter: boolean,
    region: Region,
    handleMarkerClick: (element: SuperCluster.PointFeature<MarkerData>) => void,
    zoom: number,
    setGeometry: (spot: Spot) => Geometry<Spot> | null
}

export const SpotCluster: React.FC<Props> = (
    {
        spots,
        spotFilter,
        handleMarkerClick,
        setGeometry,
        zoom,
        region
    }
): React.ReactElement => {

    const [spotsValue, setSpotsValue] = useState<Geometry<Spot>[]>([]);

    const [spotPoints, spotSuperCluster] = useClusterer(
        spotsValue,
        MAP_DIMENSIONS,
        region,
        {
            radius: 10,
            minPoints: 1000
        }
    );

    useFocusEffect(
        useCallback(() => {
            const newSpotValues: Geometry<Spot>[] = [];
            if (spots.length > 0 && spotFilter) {
                for (const spot of Object.values(spots)) {
                    const geometry = setGeometry(spot);
                    if (geometry) {
                        newSpotValues.push(geometry);
                    }
                }
            }
            setSpotsValue([...newSpotValues]);
        }, [spots, spotFilter])
    );

    return <>
        {
            zoom > 13 && spotPoints.flatMap((point) => {
                if (point.properties.cluster) {
                    const clusterPoint = point as SuperCluster.ClusterFeatureClusterer<SuperCluster.AnyProps>;
                    return spotSuperCluster.getLeaves(clusterPoint.properties.cluster_id).map((leaf) => {
                        const spot = leaf.properties;
                        return (
                            <Marker
                                key={spot.nodeId}
                                identifier={spot.uuid}
                                onPress={() => handleMarkerClick(leaf)}
                                coordinate={{
                                    longitude: leaf.geometry.coordinates[0],
                                    latitude: leaf.geometry.coordinates[1],
                                }}
                                tracksViewChanges={false}
                            >
                                <MarkerSpot element={spot}/>
                            </Marker>
                        );
                    });
                } else {
                    const leaf = point as SuperCluster.PointFeature<Spot>;
                    const spot = leaf.properties;
                    return (
                        <Marker
                            key={spot.nodeId}
                            identifier={spot.uuid}
                            onPress={() => handleMarkerClick(leaf)}
                            coordinate={{
                                longitude: leaf.geometry.coordinates[0],
                                latitude: leaf.geometry.coordinates[1],
                            }}
                            tracksViewChanges={false}
                        >
                            <MarkerSpot element={spot}/>
                        </Marker>
                    );
                }
            })
        }
    </>;
};

export default SpotCluster;
