import {COLORS} from "@assets/constant";
import React, {FC, useState} from "react";
import {ViewProps} from "react-native";
import {Polygon} from "react-native-maps";
import {LatLng} from "react-native-maps/lib/sharedTypes";

import {CityPolygons} from "@bikairproject/shared";

interface CityPolygonProps extends ViewProps {
    cities: CityPolygons[]
}

interface CityInfo {
    city_name: string
    coordinates: LatLng[]
}

export const CityPolygon: FC<CityPolygonProps> = ({cities}): React.ReactElement | null => {
    const [array, setArray] = useState<CityInfo[] | null>(null);

    const constructCoordinatesArray = (cities: CityPolygons[]) => {
        const arr: CityInfo[] = [];
        for (let i = 0; i < cities.length; i++) {
            const tmp: CityInfo = {
                city_name: cities[i].name ?? "",
                coordinates: []
            };
            const polygon = cities[i].polygon?.coordinates ?? [];
            for (let x = 0; x < polygon[0].length; x++) {
                const coords = {
                    latitude: Number(polygon[0][x][1]),
                    longitude: Number(polygon[0][x][0]),
                };
                tmp.coordinates.push(coords);
            }
            arr.push(tmp);
        }
        return arr;
    };

    const getArray = () => {
        if (array === null) {
            const result = constructCoordinatesArray(cities);
            setArray(result);
            return result;
        } else {
            return array;
        }
    };

    if (typeof cities === "undefined" || cities == null || cities.length === 0) {
        return null;
    }

    return (
        <>
            {getArray().map((item, i) => {
                return <Polygon
                    key={i}
                    coordinates={item.coordinates}
                    strokeColor={COLORS.darkBlue}
                    strokeWidth={2}
                    fillColor="rgba(255, 255, 255, 0.01)"
                />;
            })}
        </>
    );
};

export default CityPolygon;
