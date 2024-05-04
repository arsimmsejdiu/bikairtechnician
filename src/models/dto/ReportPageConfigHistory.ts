import {BikeUpdate} from "./BikeUpdate";
import {ReportPageConfig} from "./ReportPageConfig";
import {ReportUpdate} from "./ReportUpdate";

export interface ReportPageConfigHistory {
  reportPageConfig: ReportPageConfig;
  report: ReportUpdate;
  bike: BikeUpdate;
}
