import {ReportPageConfig} from "./ReportPageConfig";

export interface ReportConfig {
    name: string
    root: string
    steps: ReportPageConfig[]
}
