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
import { SET_WHOLE_STATE } from '../appReducer/appActions';
import * as _ from 'lodash';

export interface ICuesState {
    readonly selectedCue: ICue | null,
    readonly cues: ICue[],
    readonly timelineCues: ICue[],
}


export const defaultState: ICuesState = {
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
                let index = _.findIndex(state.cues, {id: action.cue.id})
                let timeIndex = _.findIndex(state.timelineCues, {id: action.cue.id})
                let toSet = (oldCue: ICue):ICue => ({
                    ...oldCue,
                    ...action.cue,
                    actions: action.cue.actions
                      ? action.cue.actions.sort((a, b) => a.startTime - b.startTime)
                      : oldCue.actions
                });
                let timelineCues = [...state.timelineCues];
                if (timeIndex >= 0) {
                    timelineCues[timeIndex] = toSet(timelineCues[timeIndex]);
                    if (action.cue.startTime || action.cue.endTime) {
                        timelineCues.sort((a, b) => a.startTime - b.startTime)
                    }
                }
                return {
                    ...state,
                    cues: index >= 0 ? [...state.cues.splice(index, 1, toSet(state.cues[index]))] : state.cues,
                    timelineCues: timelineCues,
                    selectedCue: (state.selectedCue
                        && state.selectedCue.id === action.cue.id)
                        ? toSet(state.selectedCue)
                        : state.selectedCue,
                };
            } else return state;

        case SET_SELECTED_CUE:
            // console.log(state.cues);
            let index = _.findIndex(state.cues, {id: action.cueId})
            let timeIndex = _.findIndex(state.timelineCues, {id: action.cueId})
            return {
                ...state,
                selectedCue: (state.selectedCue
                && state.selectedCue.id === action.cueId)
                    ? null
                    : index >= 0 ? state.cues[index] : timeIndex >= 0 ? state.timelineCues[timeIndex] : null,
            };
        case SET_WHOLE_STATE:
            return action.payload.cues;
        default:
            return state;
    }
};
