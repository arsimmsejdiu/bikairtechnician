import {Spot} from "@models/dto/MarkerData";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import {GET_SPOTS} from "@utils/endPoints";

import {GetSpotsNearbyOutput} from "@bikairproject/shared";

export const getSpots = async (lat?: number | null, lng?: number | null): Promise<Spot[]> => {
    try {
        let queryString = "";
        if(lat && lng) {
            queryString = `?offset=0&lat=${lat}&lng=${lng}`;
        }
        const {data} = await instanceaxiosApi.get<GetSpotsNearbyOutput>(`${GET_SPOTS}${queryString}`);
        const now = Date.now();
        const spots = data.rows.map(s => {
            return {
                ...s,
                nodeId: `${s.uuid}-${now}`,
                cluster: false
            } as Spot;
        });

        return spots ?? [];
    } catch (err) {
        console.log(err);
        return [];
    }
};
