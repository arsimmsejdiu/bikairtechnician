import {Position} from "geojson";

import {BikeStatusType, BikeTagType, Point, Polygon} from "@bikairproject/shared";

export type MarkerData = CommonMarkerData & (SpotMarker | BikeMarker);
export type Spot = CommonMarkerData & SpotMarker;
export type Bike = CommonMarkerData & BikeMarker;

export interface CommonMarkerData {
    id: number;
    uuid: string;
    nodeId: string;
    address: string | null;
    city_id: number;
    name: string;
    coordinates: Position;
    marker_coordinates: Point;
    cluster: false;
    polygon?: Polygon
}

export interface SpotMarker {
    marker_type: "SPOT";
    spot_polygon?: Polygon;
    bike_ids?: [];
    nb_bikes?: number
    max_bikes: number;
}

export interface BikeMarker {
    marker_type: "BIKE"
    lock_id: number,
    tracker_id: number,
    battery_id: number
    status: BikeStatusType,
    tags: BikeTagType[],
    capacity: number
    full_capacity: number
    reported?: boolean
    last_trip_date?: Date
}
