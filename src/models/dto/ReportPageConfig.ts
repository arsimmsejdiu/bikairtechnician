import {ReportScreensType} from "../types";
import {ReportPageButonConfig} from "./ReportPageButonConfig";
import { ReportPageButtonsConfig } from "./ReportPageButtonsConfig";
import {ReportPageConditionConfig} from "./ReportPageConditionConfig";

export interface ReportPageConfig {
    name: string
    screen: ReportScreensType
    text: string
    buttons?: ReportPageButtonsConfig[],
    comment?: boolean
    condition?: ReportPageConditionConfig
    yes: ReportPageButonConfig
    no?: ReportPageButonConfig
}
