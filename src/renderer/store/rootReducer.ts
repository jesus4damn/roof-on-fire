import { combineReducers } from 'redux';

import { ICounterState, counterReducer } from './counterReducer/counterReducer';
import {appReducer, IAppState} from "./appReducer/appReducer";

export interface RootState {
    counter: ICounterState,
    app: IAppState
}

export const rootReducer = combineReducers<RootState>({
    counter: counterReducer,
    app: appReducer
});
