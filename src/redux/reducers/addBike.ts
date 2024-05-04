import {createSlice} from "@reduxjs/toolkit";

interface initialStateState {
    bikeName: string,
    city: number | null,
    lockUid: string,
    lockClaimCode: string,
    lockVersion: string,
    trackerImei: string,
    trackerMac: string
}

const initialState: initialStateState = {
    bikeName: "",
    city: null,
    lockUid: "",
    lockClaimCode: "",
    lockVersion: "erl2",
    trackerImei: "",
    trackerMac: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        resetAddBike(state, action) {
            state.bikeName = initialState.bikeName;
            state.city = initialState.city;
            state.lockUid = initialState.lockUid;
            state.lockClaimCode = initialState.lockClaimCode;
            state.lockVersion = initialState.lockVersion;
            state.trackerImei = initialState.trackerImei;
            state.trackerMac = initialState.trackerMac;
        },
        setBikeName(state, action) {
            state.bikeName = action.payload;
        },
        setBikeCity(state, action) {
            state.city = action.payload;
        },
        setLockUid(state, action) {
            state.lockUid = action.payload;
        },
        setLockClaimCode(state, action) {
            state.lockClaimCode = action.payload;
        },
        setLockVersion(state, action) {
            state.lockVersion = action.payload;
        },
        setTrackerImei(state, action) {
            state.trackerImei = action.payload;
        },
        setTrackerMac(state, action) {
            state.trackerMac = action.payload;
        },
    }
});

export default authSlice.reducer;

// ACTIONS
export const {
    resetAddBike,
    setBikeName,
    setBikeCity,
    setLockUid,
    setLockClaimCode,
    setLockVersion,
    setTrackerImei,
    setTrackerMac,
} = authSlice.actions;
