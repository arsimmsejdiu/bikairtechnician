import {BikeInfos} from "@models/dto/BikeInfos";
import {BikeParts} from "@models/dto/BikeParts";
import {Bike} from "@models/dto/MarkerData";
import RequestResponse from "@models/dto/RequestResponse";
import {setSnackbar} from "@redux/reducers/snackbar";
import {AppThunk} from "@redux/store";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import {
    GET_BIKES_DETAILS,
    GET_BIKES_TECHNICIAN,
    POST_BIKES,
    PUT_BIKES,
    PUT_BIKES_ADDRESS,
    PUT_BIKES_LOCK,
    PUT_BIKES_POSITION,
    PUT_BIKES_TRACKER
} from "@utils/endPoints";

import {GetBikeDetailOutput, GetBikesTechnicianOutput} from "@bikairproject/shared";

export const getBikes = async (lastUpdate?: number | null) => {
    try {
        console.log(`lastUpdate : ${lastUpdate}`);
        const config = {
            params: {
                lastUpdate: lastUpdate
            }
        };

        const {data} = await instanceaxiosApi.get<GetBikesTechnicianOutput>(GET_BIKES_TECHNICIAN, config);

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};

export const getBike = async (bikeId: number) => {
    try {
        const {data} = await instanceaxiosApi.get<GetBikeDetailOutput>(GET_BIKES_DETAILS(bikeId));

        return data;
    } catch (err) {
        console.log(err);
        return null;
    }
};


export const updateBikeAddress = async (bike: Bike) => {
    try {
        const {data} = await instanceaxiosApi.put(PUT_BIKES_ADDRESS(bike.id));
        return data;
    } catch (err) {
        console.log(err);
        throw err;
    }
};

export const updateBikePosition = async (bikeId: number, latitude: number, longitude: number) => {
    try {
        const {data} = await instanceaxiosApi.put(PUT_BIKES_POSITION(bikeId), {
            lat: latitude,
            lng: longitude
        });
        console.log(data);
        return data;
    } catch (err) {
        console.log("in service");
        console.log(err);
        throw err;
    }
};

export const updateBikeInfos = async (bike: BikeInfos) => {
    try {
        const req = await instanceaxiosApi.put<Bike>(PUT_BIKES, bike);
        return req.data;
    } catch (err) {
        console.log(err);
    }
};

export const createBike = async (bike: BikeParts) => {
    const req = await instanceaxiosApi.post<RequestResponse<Bike>>(POST_BIKES, bike);
    console.log(req.data);
    return req.data.result;
};

export const updateBikeLock = async (bike: BikeParts) => {
    const req = await instanceaxiosApi.put<Bike>(PUT_BIKES_LOCK, bike);
    return req.data;
};

export const updateBikeTracker = async (bike: BikeParts) => {
    const req = await instanceaxiosApi.put<Bike>(PUT_BIKES_TRACKER, bike);
    return req.data;
};
