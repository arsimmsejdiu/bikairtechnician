import {Position} from "geojson";

import {MarkerData} from "./MarkerData";

export interface Geometry<T extends MarkerData> {
  type: "Feature";
  properties: T;
  geometry: {
    type: "Point";
    coordinates: Position;
  };
  polygon?: {
    type: "Polygon";
    coordinates: any;
  };
}
