import {COLORS} from "@assets/constant";
import React, {useState} from "react";
import {ViewProps} from "react-native";
import {Polygon} from "react-native-maps";
import {LatLng} from "react-native-maps/lib/sharedTypes";

import {CityRedZones} from "@bikairproject/shared";

interface CityPolygonRedZonesProps extends ViewProps {
    cityRedZones: CityRedZones[]
}

interface CityRedZoneInfo {
    city_name: string
    coordinates: LatLng[]
}

export const CityPolygonRedZones: React.FC<CityPolygonRedZonesProps> = ({cityRedZones}): React.ReactElement | null => {

    const [array, setArray] = useState<CityRedZoneInfo[] | null>(null);

    const constructCoordinatesArray = (cityRedZones: CityRedZones[]) => {
        const arr: CityRedZoneInfo[] = [];
        for (let i = 0; i < cityRedZones.length; i++) {
            const tmp: CityRedZoneInfo = {
                city_name: cityRedZones[i].name,
                coordinates: []
            };
            const polygon = cityRedZones[i].polygon;
            if (typeof polygon !== "undefined") {
                for (let x = 0; x < polygon.coordinates[0].length; x++) {
                    const coords: LatLng = {
                        latitude: polygon.coordinates[0][x][1],
                        longitude: polygon.coordinates[0][x][0],
                    };
                    tmp.coordinates.push(coords);
                }
                arr.push(tmp);
            }
        }
        return arr;
    };

    const getArray = () => {
        if (array === null) {
            const result = constructCoordinatesArray(cityRedZones);

            setArray(result);
            return result;
        } else {
            return array;
        }
    };

    if (typeof cityRedZones === "undefined" || cityRedZones == null || cityRedZones.length === 0) {
        return null;
    }

    return (
        <>
            {
                getArray().map((item: CityRedZoneInfo, i: number) => {
                    return <Polygon
                        key={i}
                        coordinates={item.coordinates}
                        strokeColor={COLORS.red}
                        strokeWidth={2}
                        fillColor="rgba(255, 0, 0, 0.4)"
                    />;
                })
            }
        </>
    );
};

export default CityPolygonRedZones;
