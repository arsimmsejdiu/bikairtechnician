import {ReportPageButonActionConfig} from "./ReportPageButonActionConfig";

export interface ReportPageButonConfig {
    label: string
    next?: string
    actions?: ReportPageButonActionConfig[]
}
