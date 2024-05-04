import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

export interface StaticData {
    parts: string[]
    workshop: string[]
    perimeter: number
    n_bikes: number
    status_available: BikeStatusType[]
    status_update: BikeStatusType[]
    tag_available: BikeTagType[]
    tag_update: BikeTagType[]
}
