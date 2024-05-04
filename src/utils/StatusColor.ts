import {BIKE_STATUS, BikeStatusType} from "@bikairproject/shared";

export const statusColor = (status: BikeStatusType) => {
    let color = "#FFC9AB";
    switch (status) {
        case BIKE_STATUS.AVAILABLE:
            color = "#E3FFE6";
            break;
        case BIKE_STATUS.MAINTENANCE:
            color = "#FFC9C9";
            break;
        default:
            break;
    }
    return color;
};
