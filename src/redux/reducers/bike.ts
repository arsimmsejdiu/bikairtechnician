import {Bike} from "@models/dto/MarkerData";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {toggleInOutArray} from "@utils/helpers";

import {
    BikeStatusType,
    BikeTagType,
    BikeTechnician,
    GetBikeDetailOutput,
} from "@bikairproject/shared";

interface initialStateState {
    statusFilters: BikeStatusType[],
    tagFilters: BikeTagType[],
    bikes: { [key: string]: Bike },
    lastUpdate: number | null,
    currentBike: Bike | null,
    bikeDetails: GetBikeDetailOutput | null
}

const initialState: initialStateState = {
    statusFilters: [],
    tagFilters: [],
    bikes: {},
    lastUpdate: null,
    currentBike: null,
    bikeDetails: null
};

const bikeSlice = createSlice({
    name: "bike",
    initialState: initialState,
    reducers: {
        resetBike(state) {
            state.statusFilters = initialState.statusFilters;
            state.tagFilters = initialState.tagFilters;
            state.bikes = initialState.bikes;
            state.lastUpdate = initialState.lastUpdate;
            state.currentBike = initialState.currentBike;
        },
        setBikeStatusFilter(state, action) {
            state.statusFilters = action.payload === "ALL" ? [] : toggleInOutArray(state.statusFilters, action.payload);
        },
        setBikeTagFilter(state, action) {
            state.tagFilters = action.payload === "ALL" ? [] : toggleInOutArray(state.tagFilters, action.payload);
        },
        updateBikes(state, action: PayloadAction<BikeTechnician[] | undefined>) {
            if(action.payload) {
                const now = Date.now();
                for (let i = 0; i < action.payload.length; i++) {
                    state.bikes[action.payload[i].uuid] = {
                        ...action.payload[i],
                        nodeId: `${action.payload[i].uuid}-${now}`,
                        cluster: false,
                        status: action.payload[i].status as BikeStatusType,
                        tags: action.payload[i].tags as BikeTagType[],
                        marker_type: "BIKE"
                    };
                }
            }
        },
        setBikeDetails(state, action) {
            state.bikeDetails = action.payload;
        },
        setBikeLastUpdate(state, action: PayloadAction<number | null | undefined>) {
            state.lastUpdate = action.payload ?? null;
        },
        updateBikeCache(state, action: PayloadAction<Bike | null | undefined>) {
            if (typeof action.payload !== "undefined" && action.payload !== null) {
                const now = Date.now();
                action.payload.nodeId = `${action.payload.uuid}-${now}`;
                state.bikes[action.payload.uuid] = {
                    ...state.bikes[action.payload.uuid],
                    ...action.payload
                };
            }
        },
        selectBike(state, action: PayloadAction<string | null>) {
            if(action.payload === null) {
                state.currentBike = null;
            } else {
                state.currentBike = state.bikes[action.payload] ?? null;
            }
        }
    }
});

export default bikeSlice.reducer;

// ACTIONS
export const {
    resetBike,
    setBikeStatusFilter,
    setBikeTagFilter,
    updateBikes,
    setBikeLastUpdate,
    updateBikeCache,
    selectBike,
    setBikeDetails
} = bikeSlice.actions;
