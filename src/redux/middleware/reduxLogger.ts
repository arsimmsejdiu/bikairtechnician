import {Middleware} from "redux";

import {RootState} from "../store";

export const reduxLogger: Middleware<unknown, RootState> = store => next => action => {
    // console.group('-------------ACTION------------',action.type)
    // console.info('-------------DISPATCH------------', action.payload)
    const result = next(action);
    // console.log('--------------NEXT STATE------------', JSON.stringify(store.getState()))
    console.groupEnd();
    return result;
};
