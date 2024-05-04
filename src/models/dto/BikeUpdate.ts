import {MapObject} from "../types";
import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

export interface BikeUpdate extends MapObject {
    id?: number
    city_id?: number
    name?: string
    status?: BikeStatusType
    tags?: BikeTagType[]
}
