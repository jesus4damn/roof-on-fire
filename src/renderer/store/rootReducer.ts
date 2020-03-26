import { combineReducers } from 'redux';

import { ICounterState, visualizerReducer } from './visualizerReducer/visualizerReducer';
import {appReducer, IAppState} from "./appReducer/appReducer";
import fixturesReducer, { IFixturesState } from './fixturesReducer/fixturesReducer';

export interface RootState {
    counter: ICounterState,
    app: IAppState,
    fixtures: IFixturesState,
}

export const rootReducer = combineReducers<RootState>({
    counter: visualizerReducer,
    app: appReducer,
    fixtures: fixturesReducer
});
