import {Spot} from "@models/dto/MarkerData";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface initialStateState {
    spotFilter: boolean,
    spots: Record<string, Spot>,
    lastUpdate: number | null,
    currentSpot: Spot | null
}

const initialState: initialStateState = {
    spotFilter: false,
    spots: {},
    lastUpdate: null,
    currentSpot: null
};

const spotSlice = createSlice({
    name: "spot",
    initialState: initialState,
    reducers: {
        resetSpot(state) {
            state.spotFilter = initialState.spotFilter;
            state.spots = initialState.spots;
            state.lastUpdate = initialState.lastUpdate;
        },
        setSpotFilter(state, action) {
            state.spotFilter = action.payload;
        },
        setSpots(state, action) {
            state.spots = action.payload;
        },
        updateSpots(state, action: PayloadAction<Spot[]>) {
            for (let i = 0; i < action.payload.length; i++) {
                state.spots[action.payload[i].uuid] = action.payload[i];
            }

        },
        setSpotLastUpdate(state, action) {
            state.lastUpdate = action.payload;
        },
        selectSpot(state, action: PayloadAction<string | null>) {
            if (action.payload === null) {
                state.currentSpot = null;
            } else {
                state.currentSpot = state.spots[action.payload] ?? null;
            }
        }
    }
});

export default spotSlice.reducer;

// ACTIONS
export const {
    resetSpot,
    setSpotFilter,
    updateSpots,
    selectSpot
} = spotSlice.actions;
