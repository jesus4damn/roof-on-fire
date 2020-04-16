import { Reducer } from 'redux';
import { v4 as uuid } from 'uuid';
import { RootActions } from '../rootActions';
import { CREATE_CUE, CREATE_CUE_TIMELINE, DELETE_CUE, SET_SELECTED_CUE, UPDATE_CUE } from './cuesActions';
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
            if (action.isTimeline) {
                return {
                    ...state,
                    timelineCues: state.timelineCues.filter(c => c.id !== action.cueId)
                };
            } else {
                return {
                    ...state,
                    cues: state.cues.filter(c => c.id !== action.cueId)
                }
            }
        case CREATE_CUE_TIMELINE:
            return {
                ...state,
                timelineCues: [...state.timelineCues, {...action.cue, id: uuid(), startTime: action.startTime}]
                    .sort((a,b) => a.startTime - b.startTime)
            };
        case UPDATE_CUE:
            return {
                ...state,
                cues: state.cues.map(c => c.id === action.cue.id ? action.cue : c),
                timelineCues: state.timelineCues.map(c => c.id === action.cue.id ? action.cue : c),
                selectedCue: (state.selectedCue
                    && state.selectedCue.id === action.cue.id)
                    ? action.cue
                    : state.selectedCue,
            };
        case SET_SELECTED_CUE:
            console.log(state.cues);
            console.log(state.timelineCues);
            return {
                ...state,
                selectedCue: (state.selectedCue
                && state.selectedCue.id === action.cue.id)
                    ? null
                    : action.cue,
            };
        default:
            return state;
    }
};
