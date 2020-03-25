import { combineReducers } from 'redux';

import { ICounterState, counterReducer } from './counterReducer/counterReducer';
import {appReducer, IAppState} from "./appReducer/appReducer";
import fixturesReducer, { IFixturesState } from './fixturesReducer/fixturesReducer';

export interface RootState {
    counter: ICounterState,
    app: IAppState,
    fixtures: IFixturesState,
}

export const rootReducer = combineReducers<RootState>({
    counter: counterReducer,
    app: appReducer,
    fixtures: fixturesReducer
});
