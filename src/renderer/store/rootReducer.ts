import { combineReducers } from 'redux';

import { ICounterState, visualizerReducer } from './visualizerReducer/visualizerReducer';
import {appReducer, IAppState} from "./appReducer/appReducer";
import fixturesReducer, { IFixturesState } from './fixturesReducer/fixturesReducer';
import { fieldsReducer, IFieldsState } from './fieldsReducer/fieldsReducer';
import { cuesReducer, ICuesState } from './cuesReducer/cuesReducer';

export interface RootState {
    counter: ICounterState,
    app: IAppState,
    fixtures: IFixturesState,
    fields: IFieldsState,
    cues: ICuesState,
}

export const rootReducer = combineReducers<RootState>({
    counter: visualizerReducer,
    app: appReducer,
    fixtures: fixturesReducer,
    fields: fieldsReducer,
    cues: cuesReducer
});


export type GetStateType = () => RootState;
