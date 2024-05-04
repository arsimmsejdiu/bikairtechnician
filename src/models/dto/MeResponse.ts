import {StaticData} from "./StaticData";
import { AdminMe  } from "@bikairproject/shared";

export interface MeResponse {
    STATIC_DATA: StaticData
    user: AdminMe
}
