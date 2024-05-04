import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import {GET_CITIES, GET_CITY_POLYGONS, GET_CITY_RED_ZONES} from "@utils/endPoints";

import {AppThunk} from "../store";
import {setError} from "./global";
import {
    GetCitiesOutput,
    GetCitiesOutputData,
    GetCityPolygonsOutput,
    GetCityPolygonsOutputData,
    GetCityRedZonesOutput,
    GetCityRedZonesOutputData
} from "@bikairproject/shared";

interface InitialStateState {
    cities: GetCitiesOutputData[];
    cityRedZones: GetCityRedZonesOutputData[],
    cityPolygons: GetCityPolygonsOutputData[],
}

const initialState: InitialStateState = {
    cities: [],
    cityPolygons: [],
    cityRedZones: []
};

const citySlice = createSlice({
    name: "city",
    initialState: initialState,
    reducers: {
        resetCity(state, action: PayloadAction<undefined>) {
            state.cities = initialState.cities;
            state.cityRedZones = initialState.cityRedZones;
        },
        setCities(state, action: PayloadAction<GetCitiesOutputData[]>) {
            state.cities = action.payload;
        },
        setCityPolygons(state, action: PayloadAction<GetCityPolygonsOutputData[]>) {
            state.cityPolygons = action.payload;
        },
        setCityRedZones(state, action: PayloadAction<GetCityRedZonesOutputData[]>) {
            state.cityRedZones = action.payload;
        },
    },
});

export default citySlice.reducer;

// ACTIONS
export const {
    resetCity,
    setCities,
    setCityPolygons,
    setCityRedZones
} = citySlice.actions;

export const getCities = (): AppThunk => async dispatch => {
    try {
        const promiseCities = await instanceaxiosApi.get<GetCitiesOutput>(GET_CITIES);
        dispatch(setCities(promiseCities.data.rows));

        const promiseCityPolygons = await instanceaxiosApi.get<GetCityPolygonsOutput>(GET_CITY_POLYGONS);
        dispatch(setCityPolygons(promiseCityPolygons.data.rows ?? promiseCityPolygons.data));

        const promiseCityRedZone = await instanceaxiosApi.get<GetCityRedZonesOutput>(GET_CITY_RED_ZONES);
        dispatch(setCityRedZones(promiseCityRedZone.data.rows ?? promiseCityRedZone.data));

        dispatch(setError(null));
    } catch (err: any) {
        const message = err.message ? err.message : err;
        dispatch(setError(message));
    }
};
