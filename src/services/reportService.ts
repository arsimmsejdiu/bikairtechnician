import {Report, Review} from "@models/data";
import {Coordinates} from "@models/dto/Trips";
import {initialReportState} from "@redux/reducers/report";
import {loadData, storeData} from "@services/asyncStorage";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import {saveReportPhoto} from "@services/storeService";
import {
    GET_BIKES_POSITION,
    GET_HISTORY_BIKE_REPORT,
    GET_LAST_REPORT,
    GET_LAST_REVIEW,
    GET_TRIP_DETAILS, GET_TRIPS_END_COORDS,
    POST_REPORTS,
    PUT_BIKES
} from "@utils/endPoints";
import RNFS from "react-native-fs";

import {GetBikeDetailOutput, GetReportHistoryOutput, GetTripDetailsOutput} from "@bikairproject/shared";

let reportSaving = false;

export const getLastReport = async (bikeId: number) => {
    try {
        const {data} = await instanceaxiosApi.get<Report>(GET_LAST_REPORT(bikeId));
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getHistoryBikeReport = async (bikeId: number): Promise<GetReportHistoryOutput> => {
    try {
        const {data} = await instanceaxiosApi.get<GetReportHistoryOutput>(GET_HISTORY_BIKE_REPORT(bikeId));
        return data;
    } catch (err) {
        console.log(err);
        return [];
    }
};

export const getLastReview = async (bikeId: number) => {
    try {
        const {data} = await instanceaxiosApi.get<Review>(GET_LAST_REVIEW(bikeId));
        return data;
    } catch (err) {
        console.log(err);
    }
};

export const getBikeDetails = async (tripId: number): Promise<GetBikeDetailOutput | null> => {
    try {
        const response = await instanceaxiosApi.get<GetBikeDetailOutput>(GET_TRIP_DETAILS(tripId));
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return null;
    }
};

export const getTripEndCoordsData = async (): Promise<Coordinates[]> => {
    try {
        const response = await instanceaxiosApi.get<Coordinates[]>(GET_TRIPS_END_COORDS);
        return response.data;
    } catch (error: any) {
        if (error.status || error.response.status) {
            throw error;
        }
        return [];
    }
};

export const retryPostReport = async () => {
    if (!reportSaving) {
        reportSaving = true;
        try {
            const storedReports: any = await loadData("@storeReports");
            const reports: initialReportState[] = storedReports ? JSON.parse(storedReports) : [];
            const failed: initialReportState[] = [];
            console.log("report to save : ", reports.length);
            if (reports.length > 0) {
                for (const report of reports) {
                    try {
                        console.log("trying to save report : ", report);
                        await saveReport(report);
                    } catch (err) {
                        console.log("Error at retryPostReport");
                        console.log(err);
                        failed.push(report);
                    }
                }
            }
            await storeData("@storeReports", JSON.stringify(failed));
            reportSaving = false;
        } catch (error) {
            reportSaving = false;
            throw error;
        }
    }
};

export const saveReport = async (report: initialReportState) => {
    const savedPhotos = [];
    const photoUris = report.photoUris;
    const adminId = report.report.admin_id?.toString();
    const bikeId = report.report.bike_id?.toString();
    console.log("photoUris = ", photoUris);
    try {
        for (const uri of photoUris) {
            const fileExist = await RNFS.exists(uri);
            if (fileExist) {
                const fileName = await saveReportPhoto(uri, adminId, bikeId);
                savedPhotos.push(fileName);
            } else {
                console.log("This file doesn't exist : ", uri);
            }
        }
        report.report.photos = savedPhotos;
    } catch (error) {
        console.log("Error while saving photos : ", error);
    }

    const bike = report.bike;
    if (Object.keys(bike).length > 1) {
        await instanceaxiosApi.put(PUT_BIKES, bike);
    }
    await instanceaxiosApi.post(POST_REPORTS, report.report);
};

interface BikePositionHistory {
    coordinates: number[],
    created_at: string,
}

export const getBikeHistory = async (bikeId: string): Promise<BikePositionHistory[]> => {
    try {
        const response = await instanceaxiosApi.get<BikePositionHistory[]>(GET_BIKES_POSITION(bikeId));
        return response.data;
    } catch (error: any) {
        if (error.response.status) {
            throw error;
        }
        return [];
    }
};

