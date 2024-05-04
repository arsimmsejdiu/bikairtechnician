import {BikeUpdate} from "@models/dto/BikeUpdate";
import {ReportUpdate} from "@models/dto/ReportUpdate";
import {ReviewUpdate} from "@models/dto/ReviewUpdate";
import {MapObject} from "@models/types";
import {createSlice} from "@reduxjs/toolkit";

import {AppThunk} from "../store";

export interface initialReportState extends MapObject {
    "report": ReportUpdate
    "bike": BikeUpdate
    "review": ReviewUpdate
    "photoUris": string[]
}

const initialState: initialReportState = {
    report: {
        incidents: [],
        part_repaired: [],
        comment: null,
        spot: null,
        battery_changed: false,
        pick_up: false,
        workshop: null,
        photos: null,
        lat: null,
        lng: null,
        bike_name: "",
        full_repair: false,
        battery: null,
        transcripts: []
    },
    bike: {},
    review: {},
    photoUris: [],
};

const reportSlice = createSlice({
    name: "report",
    initialState: initialState,
    reducers: {
        resetReport(state) {
            state.report = initialState.report;
            state.bike = initialState.bike;
            state.review = initialState.review;
            state.photoUris = initialState.photoUris;
        },
        setReportBattery(state, action) {
            state.report.battery = action.payload;
        },
        setReportBikeName(state, action) {
            state.report.bike_name = action.payload;
        },
        setReportBikeId(state, action) {
            state.bike.id = action.payload;
        },
        setReportPosition(state, action) {
            state.report.lat = action.payload.latitude;
            state.report.lng = action.payload.longitude;
        },
        setReportPhoto(state, action) {
            state.report.photos = action.payload;
        },
        setReportPhotoUris(state, action) {
            state.photoUris = [...state.photoUris, ...action.payload];
        },
        setReportIncidents(state, action) {
            state.report.incidents = action.payload;
        },
        setReportPartRepaired(state, action) {
            state.report.part_repaired = action.payload;
        },
        setReportFullRepair(state, action) {
            state.report.full_repair = action.payload;
        },
        setReportComment(state, action) {
            state.report.comment = action.payload;
        },
        addReportComment(state, action) {
            state.report.comment = (state.report.comment  ? state.report.comment + "\n" : "") + action.payload;
        },
        setReportSpot(state, action) {
            state.report.spot = action.payload;
        },
        setReviewIssue(state, action) {
            state.review.issue = action.payload;
        },
        setReport(state, action) {
            state.report = action.payload;
        },
        setBike(state, action) {
            state.bike = action.payload;
        },
        setReportField(state, action) {
            state.report = {
                ...state.report,
                ...action.payload
            };
        },
        setBikeField(state, action) {
            state.bike = {
                ...state.bike,
                ...action.payload
            };
        },
        setBikeFieldEmpty(state) {
            state.bike = {};
        },
        setReviewField(state, action) {
            state.review = {
                ...state.review,
                ...action.payload
            };
        },
        addTranscript(state, action) {
            if (state.report?.transcripts) {
                state.report?.transcripts.push(action.payload);
            }
        }
    }
});

export default reportSlice.reducer;
// ACTIONS
export const {
    resetReport,
    setReportBikeName,
    setReportBikeId,
    setReportPosition,
    setReportPhoto,
    setReportPhotoUris,
    setReportIncidents,
    setReportComment,
    addReportComment,
    setReportSpot,
    setReportPartRepaired,
    setReportFullRepair,
    setReportBattery,
    setReviewIssue,
    setReportField,
    setBikeField,
    setReviewField,
    setReport,
    setBike,
    setBikeFieldEmpty,
    addTranscript,
} = reportSlice.actions;

export const updateReportValue = (model: string, field: string, value: any): AppThunk => async (dispatch, getState) => {
    const entity: MapObject = {};

    if (Array.isArray(value)) {
        const stateEntity = getState().report[model];
        if (typeof stateEntity[field] === "undefined" || stateEntity[field] === null || !Array.isArray(stateEntity[field])) {
            entity[field] = value;
        } else {
            entity[field] = [...stateEntity[field], ...value];
        }
    } else {
        entity[field] = value;
    }

    switch (model) {
        case "report":
            dispatch(setReportField(entity));
            break;
        case "bike":
            dispatch(setBikeField(entity));
            break;
        case "review":
            dispatch(setReviewField(entity));
            break;
        default:
            throw `Erreur dans la configuration du rapport. ${model} n'est pas un model valide.`;
    }
};


