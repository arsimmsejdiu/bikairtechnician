import {markerBlue, markerGreen, markerGrey, markerPurple, markerRed, markerYellow} from "@assets/index";

import { BIKE_STATUS } from "@bikairproject/shared";
import {BikeStatusType} from "@bikairproject/shared";


export const getMarkerImage = (status: BikeStatusType) => {
    switch (status) {
        case BIKE_STATUS.USED:
            return markerGreen;
        case BIKE_STATUS.AVAILABLE:
            return markerBlue;
        case BIKE_STATUS.MAINTENANCE:
            return markerPurple;
        case BIKE_STATUS.STOLEN:
            return markerRed;
        case BIKE_STATUS.BOOKED:
            return markerYellow;
        case BIKE_STATUS.RENTAL:
            return markerYellow;
        default:
            return markerGrey;
    }
};
