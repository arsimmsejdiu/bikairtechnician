import {MeResponse} from "@models/dto/MeResponse";
import analytics from "@react-native-firebase/analytics";
import {getCities} from "@redux/reducers/city";
import {setError, setStaticState} from "@redux/reducers/global";
import {AppThunk} from "@redux/store";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {removeValue, storeData} from "@services/asyncStorage";
import {instanceaxiosApi} from "@services/axiosInterceptor";
import {GET_ADMIN_ME, POST_AUTH_LOGIN} from "@utils/endPoints";

import {version} from "../../../package.json";
import {AdminMe, ROLES} from "@bikairproject/shared";

interface initialStateState {
    isFetching: boolean,
    isAuthenticated: boolean,
    accessToken: any,
    newUser: boolean,
    isRefreshing: boolean,
    role: string,
    me: AdminMe | null,
}

const initialState: initialStateState = {
    isFetching: false,
    isAuthenticated: false,
    accessToken: null,
    newUser: true,
    isRefreshing: false,
    role: ROLES.TECHNICIAN,
    me: null
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        setAuthFetching(state, action) {
            state.isFetching = action.payload;
        },
        resetMe(state) {
            state.me = initialState.me;
        },
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload;
        },
        refreshing(state, action) {
            state.isRefreshing = action.payload;
        },
        logoutSuccess(state, action: PayloadAction<undefined>) {
            state.isAuthenticated = false;
            state.me = null;
            state.role = ROLES.TECHNICIAN;
        },
        loginSuccess(state, action) {
            state.isAuthenticated = true;
            const user = action.payload.user as AdminMe;
            state.me = user;
            state.role = user.role;
        }
    }
});


export default authSlice.reducer;

// ACTIONS
export const {
    setAuthFetching,
    setAuthenticated,
    refreshing,
    logoutSuccess,
    loginSuccess,
    resetMe,
} = authSlice.actions;

export const authLogin = (username: string, password: string): AppThunk => async dispatch => {
    try {
        dispatch(setAuthFetching(true));
        const authResponse = await instanceaxiosApi.post(POST_AUTH_LOGIN, {
            username: username.toUpperCase(),
            password: password,
        });
        const auth = authResponse.data;

        // Store token in local storage
        await storeData("@bearerToken", auth.bearerToken);

        const meResponse = await instanceaxiosApi.get<MeResponse>(GET_ADMIN_ME);
        const me = meResponse.data;
        dispatch(loginSuccess(me));

        await analytics().setUserProperties({
            version: version
        });

        dispatch(setError(null));
        dispatch(setStaticState(me.STATIC_DATA));
    } catch (err: any) {
        console.log(JSON.stringify(err.response.status));
        const message = err.response.status ?? 409;
        dispatch(setError(message));
        dispatch(setAuthenticated(false));
    } finally {
        dispatch(setAuthFetching(false));
    }
};

export const refreshAuth = (): AppThunk => async dispatch => {
    dispatch(refreshing(true));
    dispatch(setAuthFetching(true));
    try {
        const req = await instanceaxiosApi.get<MeResponse>(GET_ADMIN_ME);
        const response = req.data;
        console.log(response);
        dispatch(getCities());
        dispatch(loginSuccess(response));
        dispatch(setError(null));
        dispatch(setStaticState(response.STATIC_DATA));
    } catch (err: any) {
        const message = err.response.status ? err.response.status : err;
        dispatch(setError(message));
        dispatch(setAuthenticated(false));
    } finally {
        dispatch(refreshing(false));
        dispatch(setAuthFetching(false));
    }
};

export const authLogout = (): AppThunk => async dispatch => {
    try {
        await removeValue("@bearerToken");
        await removeValue("@storeReports");
        dispatch(logoutSuccess());
        dispatch(setError(null));

    } catch (err: any) {
        const message = err.message ? err.message : err;
        dispatch(setError(message));
        dispatch(setAuthenticated(false));
    }
};
