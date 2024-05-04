import {MapObject} from "../types/MapObject";

export interface ReviewUpdate extends MapObject {
    id?: number
    issue?: string[] | null
}
