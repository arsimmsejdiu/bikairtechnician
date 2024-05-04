import {StaticData} from "@models/dto/StaticData";
import {createSlice} from "@reduxjs/toolkit";

interface initialStateState {
    isFetching: boolean,
    fetchingCount: number,
    error: any,
    lat: number | null,
    lng: number | null,
    perimeter: number,
    isBluetooth: boolean,
    staticState: StaticData | null,
    showSplashScreenLoading: boolean,
    splashScreenLoadingCount: number,
}

const initialState: initialStateState = {
    isFetching: false,
    fetchingCount: 0,
    error: null,
    lat: null,
    lng: null,
    perimeter: 3000,
    isBluetooth: false,
    staticState: null,
    showSplashScreenLoading: false,
    splashScreenLoadingCount: 0,
};

const globalSlice = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        resetGlobal(state, action) {
            state.isFetching = initialState.isFetching;
            state.error = initialState.error;
            state.lat = initialState.lat;
            state.lng = initialState.lng;
            state.perimeter = initialState.perimeter;
            state.isBluetooth = initialState.isBluetooth;
            state.staticState = initialState.staticState;
            state.showSplashScreenLoading = initialState.showSplashScreenLoading;
            state.splashScreenLoadingCount = initialState.splashScreenLoadingCount;
        },
        globalFetching(state, action) {
            state.isFetching = action.payload;
        },
        setPerimeter(state, action){
            state.perimeter = action.payload;
        },
        setLatLng(state, action){
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
        },
        setError(state, action) {
            state.error = action.payload;
        },
        setBluetooth(state, action){
            state.isBluetooth = action.payload;
        },
        setStaticState(state, action) {
            state.staticState = action.payload;
        },
        setSplashScreenLoading(state, action) {
            const loading = action.payload;
            let splashScreenLoadingCount = state.splashScreenLoadingCount;
            if(loading) {
                splashScreenLoadingCount = splashScreenLoadingCount + 1;
            } else {
                splashScreenLoadingCount = splashScreenLoadingCount - 1;
            }
            state.showSplashScreenLoading = splashScreenLoadingCount > 0;
            state.splashScreenLoadingCount = splashScreenLoadingCount;
        }
    }
});

export default globalSlice.reducer;

// ACTIONS
export const {
    resetGlobal,
    globalFetching,
    setPerimeter,
    setLatLng,
    setError,
    setBluetooth,
    setStaticState,
    setSplashScreenLoading
} = globalSlice.actions;
