import {COLORS} from "@assets/index";
import {Spot} from "@models/dto/MarkerData";
import React, {useState} from "react";
import {ViewProps} from "react-native";
import {Polygon} from "react-native-maps";

type CoordsType = { latitude: number, longitude: number }

type CoordArrayType = {
    city_name: string | null | undefined,
    coordinates: CoordsType[]
}


interface IProps extends ViewProps {
    citySpots: Spot[]
}

const CityPolygonSpot: React.FC<IProps> = ({citySpots}): React.ReactElement | null => {
    const [array, setArray] = useState<CoordArrayType[] | null>(null);

    const constructCoordinatesArray = (citySpots: Spot[]) => {
        const arr: CoordArrayType[] = [];
        for (let i = 0; i < citySpots.length; i++) {
            const tmp: CoordArrayType = {
                city_name: citySpots[i].name,
                coordinates: []
            };
            const polygon = citySpots[i]?.spot_polygon;
            if (polygon) {
                const coordinates = polygon.coordinates[0];
                for (let x = 0; x < coordinates.length; x++) {
                    const coords: CoordsType = {
                        latitude: coordinates[x][1],
                        longitude: coordinates[x][0],
                    };
                    tmp.coordinates.push(coords);
                }
            }
            arr.push(tmp);
        }
        return arr;
    };

    const getArray = () => {
        if (array === null) {
            const result = constructCoordinatesArray(citySpots);
            setArray(result);
            return result;
        } else {
            return array;
        }
    };

    if (citySpots.length === 0) {
        return null;
    }

    if(process.env.NODE_ENV === "production"){
        return null;
    }

    return (
        <>
            {
                getArray().map((item: CoordArrayType, i) => {
                    return <Polygon
                        key={i}
                        coordinates={item.coordinates}
                        strokeColor={COLORS.darkBlue}
                        strokeWidth={2}
                        fillColor="rgba(39, 124, 194,0.2)"
                    />;
                })
            }
        </>
    );
};

export default CityPolygonSpot;
