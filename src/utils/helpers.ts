import Geolocation from "@react-native-community/geolocation";
import {centroid, polygon} from "@turf/turf";

import {GetCityPolygonsOutputData} from "@bikairproject/shared";

type CoordsType = { latitude: number, longitude: number }

type CoordArrayType = {
    city_name: string | null | undefined,
    coordinates: CoordsType[]
}

export const getPosition = async (timeout = 15000, maximumAge = 1000) => {
    return await new Promise(function (resolve, reject) {
        return Geolocation.getCurrentPosition(info => resolve(info), error => reject(error), {
            timeout: timeout,
            maximumAge: maximumAge,
            enableHighAccuracy: true
        });
    });
};

export const zoomLevel = (longitudeDelta: number) => {
    return Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
};

export const getCenterOfPolygon = (coords: number[][][]) => {
    const _pol = polygon(coords);
    return centroid(_pol).geometry.coordinates;
};

/**
 * Toggle an element that is in array
 * @param array
 * @param item
 * @returns
 */
export function toggleInOutArray<T>(array: T[], item: T) {
    const index = array.findIndex(c => c === item);
    if (index === -1) return [...array, item];
    array.splice(index, 1);
    return array;
}

export const constructCoordinatesArray = (cities: GetCityPolygonsOutputData[]) => {
    const arr: CoordArrayType[] = [];
    for (let i = 0; i < cities.length; i++) {
        const tmp: CoordArrayType = {
            city_name: cities[i].name,
            coordinates: []
        };
        const polygon = cities[i].polygon;
        if (polygon && cities[i].status === "ACTIVE") {
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
