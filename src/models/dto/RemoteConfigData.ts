import {FirebaseRemoteConfigTypes} from "@react-native-firebase/remote-config";

export interface RemoteConfigData extends FirebaseRemoteConfigTypes.ConfigDefaults {
    test: string
    report_controller: string
    report_controller_test: string
    report_collector: string
    report_collector_test: string
    report_technician: string
    report_technician_test: string
    trad_fr: string
}
