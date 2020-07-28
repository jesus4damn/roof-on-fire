import { Reducer } from 'redux';
import { v4 as uuid } from 'uuid';
import { RootActions } from '../rootActions';
import {
    CREATE_CUE,
    CREATE_CUE_TIMELINE,
    DELETE_CUE,
    SET_LOADED_CUES_DATA,
    SET_SELECTED_CUE,
    UPDATE_CUE
} from './cuesActions';
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
        case SET_LOADED_CUES_DATA:
            return action.state;
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
                timelineCues: [...state.timelineCues, {...action.cue, id: uuid(), startTime: action.startTime, endTime: action.startTime + 2}]
                    .sort((a,b) => a.startTime - b.startTime)
            };
        case UPDATE_CUE:
            if (action.cue.id) {
                let toSet = {...action.cue, actions: action.cue.actions.sort((a, b) => a.startTime - b.startTime)};
                return {
                    ...state,
                    cues: state.cues.map(c => c.id === action.cue.id ? toSet : c),
                    timelineCues: state.timelineCues.map(c => c.id === action.cue.id ? toSet : c).sort((a, b) => a.startTime - b.startTime),
                    selectedCue: (state.selectedCue
                        && state.selectedCue.id === action.cue.id)
                        ? toSet
                        : state.selectedCue,
                };
            } else return state;

        case SET_SELECTED_CUE:
            // console.log(state.cues);
            // console.log(state.timelineCues);
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
