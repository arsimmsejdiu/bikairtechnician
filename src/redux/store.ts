import {AnyAction, configureStore, ThunkAction} from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import {reduxLogger} from "./middleware/reduxLogger";
import rootReducer from "./rootReducer";

export const store = configureStore({
    reducer:  rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(reduxLogger, thunk),
    devTools: process.env.NODE_ENV !== "production",
}
);

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    AnyAction>
