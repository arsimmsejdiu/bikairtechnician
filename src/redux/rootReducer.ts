import { combineReducers } from "@reduxjs/toolkit";

// Reducers
import addBike from "./reducers/addBike";
import auth from "./reducers/auth";
import bike from "./reducers/bike";
import city from "./reducers/city";
import global from "./reducers/global";
import report from "./reducers/report";
import snackbar from "./reducers/snackbar";
import spot from "./reducers/spot";

const rootReducer = combineReducers({
    addBike,
    auth,
    bike,
    city,
    global,
    report,
    spot,
    snackbar
});

export default rootReducer;
