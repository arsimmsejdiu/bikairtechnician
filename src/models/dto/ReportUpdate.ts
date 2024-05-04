import {MapObject} from "../types";
import {Spot} from "./MarkerData";
import Transcript from "./Transcript";

export interface ReportUpdate extends MapObject{
    "incidents"?: string[] | null
    "part_repaired"?: string[] | null
    "bike_id"?: number
    "admin_id"?: number
    "comment"?: string | null
    "workshop"?: string | null
    "lat"?: number | null
    "lng"?: number | null
    "battery_changed"?: boolean
    "pick_up"?: boolean
    "spot"?: Spot | null
    "photos"?: string[] | null
    "created_at"?: Date
    "updated_at"?: Date
    "bike_name"?: string
    "full_repair"?: boolean
    "battery"?:string | null
    "transcripts"?: Transcript[]
}
