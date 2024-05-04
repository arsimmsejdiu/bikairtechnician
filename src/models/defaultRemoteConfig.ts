import fr from "../i18n/fr.json";
import {RemoteConfigData} from "./dto/RemoteConfigData";

export const defaultRemoteConfig: RemoteConfigData = {
    test: "default config",
    report_collector: "{}",
    report_collector_test: "{}",
    report_controller: "{}",
    report_controller_test: "{}",
    report_technician: "{}",
    report_technician_test: "{}",
    trad_fr: JSON.stringify(fr),
};
