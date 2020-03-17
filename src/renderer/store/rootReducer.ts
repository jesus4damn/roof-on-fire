import { combineReducers } from 'redux';

import { I_CounterState, counterReducer } from './counterReducer/counterReducer';
import {appReducer, I_AppState} from "./appReducer/appReducer";

export interface RootState {
    counter: I_CounterState,
    app: I_AppState
}

export const rootReducer = combineReducers<RootState>({
    counter: counterReducer,
    app: appReducer
});
