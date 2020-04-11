import { Reducer } from 'redux';
import { v4 as uuid } from 'uuid';

import { RootActions } from '../rootActions';
import { CREATE_CUE, DELETE_CUE, SET_SELECTED_CUE } from './cuesActions';
import { ICue } from '../../../types/cuesTypes';

export interface ICuesState {
    readonly selectedCue: ICue | null,
    readonly cues: ICue[];
}


const defaultState: ICuesState = {
    selectedCue: null,
    cues: []
};

export const cuesReducer: Reducer<ICuesState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case CREATE_CUE:
            return {
                ...state,
                cues: [...state.cues, action.cue]
            };
        case DELETE_CUE:
            return {
                ...state,
            };
        case SET_SELECTED_CUE:
            return {
                ...state,
                selectedCue: action.cue
            };
        default:
            return state;
    }
};
