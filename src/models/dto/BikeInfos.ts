import {BikeStatusType, BikeTagType} from "@bikairproject/shared";

export interface BikeInfos {
    id: string | number,
    status: BikeStatusType,
    tags: BikeTagType[],
    city_id: number | null
}
