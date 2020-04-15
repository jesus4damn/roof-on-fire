import { Reducer } from 'redux';
import { v4 as uuid } from 'uuid';

import { RootActions } from '../rootActions';
import { CREATE_CUE, CREATE_CUE_TIMELINE, DELETE_CUE, SET_SELECTED_CUE } from './cuesActions';
import { ICue } from '../../../types/cuesTypes';

export interface ICuesState {
    readonly selectedCue: ICue | null,
    readonly cues: ICue[],
    readonly timelineCues: ICue[],
}


const defaultState: ICuesState = {
    selectedCue: null,
    cues: [],
    timelineCues: [],
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
        case CREATE_CUE_TIMELINE:
            return {
                ...state,
                timelineCues: [...state.timelineCues, {...action.cue, startTime: action.startTime}]
                    .sort((a,b) => a.startTime - b.startTime)
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
