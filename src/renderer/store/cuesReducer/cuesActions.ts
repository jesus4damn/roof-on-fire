import { Action, ActionCreator } from 'redux';
import { IFixture } from '../../../types/fixtureTypes';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../rootActions';
import { GetStateType } from '../rootReducer';
import { ICue, ICueAction } from '../../../types/cuesTypes';
import { v4 as uuid } from 'uuid';
import { updateField } from '../fieldsReducer/fieldsActions';
import { IField } from '../../../types/fieldsTypes';
import { ICuesState } from './cuesReducer';
import { getSelectedCue } from './cuesSelector';
import { controllerAPI } from '../../components/API/API';

export const SET_LOADED_CUES_DATA = 'cues/SET_LOADED_CUES_DATA';
export const CREATE_CUE = 'cues/CREATE_CUE';
export const CREATE_CUE_TIMELINE = 'cues/CREATE_CUE_TIMELINE';
export const DELETE_CUE = 'cues/DELETE_CUE';
export const UPDATE_CUE = 'cues/UPDATE_CUE';
export const ADD_FIXTURES_TO_CUE = 'cues/ADD_FIXTURES_TO_CUE';
export const SET_SELECTED_CUE = 'cues/SET_SELECTED_CUE';

export interface ISetCuesData {
    type: typeof SET_LOADED_CUES_DATA,
    state: ICuesState
}

export interface IOnCueSelection {
    type: typeof SET_SELECTED_CUE,
    cue: ICue
}

export interface ICreateCueAction extends Action {
    type: typeof CREATE_CUE,
    cue: ICue
}

export interface ICreateTimelineCueAction extends Action {
    type: typeof CREATE_CUE_TIMELINE,
    cue: ICue
    startTime: number
}

export interface IDeleteCueAction extends Action {
    type: typeof DELETE_CUE, cueId: string, isTimeline: boolean
}

export interface IUpdateCueAction extends Action {
    type: typeof UPDATE_CUE, cue: ICue
}

export interface IAddFixturesToCue extends Action {
    type: typeof ADD_FIXTURES_TO_CUE, cueId: string, fixtures: IFixture[]
}

export const createCue: ActionCreator<ICreateCueAction> = (cue: ICue) => ({
    type: CREATE_CUE, cue
});

export const createTimelineCue: ActionCreator<ICreateTimelineCueAction> = (cue: ICue, startTime: number) => ({
    type: CREATE_CUE_TIMELINE, cue: {...cue, id: uuid()}, startTime
});

export const deleteCue: ActionCreator<IDeleteCueAction> = (cueId: string, isTimeline: boolean) => ({
    type: DELETE_CUE, cueId, isTimeline
});

export const updateCue: ActionCreator<IUpdateCueAction> = (cue: ICue) => ({
    type: UPDATE_CUE, cue
});

export const setSelectedCue: ActionCreator<IOnCueSelection> = (cue: ICue) => ({
    type: SET_SELECTED_CUE, cue
});

export const setCuesData: ActionCreator<ISetCuesData> = (state: ICuesState) => ({
    type: SET_LOADED_CUES_DATA, state
});

const cueBase: ICue = {
    id: '',
    startTime: 1,
    endTime: 20,
    fixtureType: 'fireMachine',
    name: 'new cue',
    active: false,
    actions: []
};

const cueActionBase: ICueAction = {
    id: '',
    fixtureId: '',
    patternId: '',
    fixtureType: 'fireMachine',
    img: '',
    startTime: 0,
    totalTime: 2,
    active: false
};

export const createNewCue = (fixtures: IFixture[], field: IField | null, startTime?: number) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const newActions: ICueAction[] = fixtures.map(f => {
            if (f.activePattern !== null) {
                return {
                    ...cueActionBase,
                    id: uuid(),
                    fixtureId: f.id,
                    fixtureType: f.type,
                    patternId: f.activePattern ? f.activePattern.id : '',
                    img: f.activePattern ? f.activePattern.img : '',
                    startTime: 0,
                    totalTime: 2,
                    active: false
                };
            } else return { ...cueActionBase, id: uuid(), fixtureId: f.id };
        });
        const newCue: ICue = {
            ...cueBase,
            id: uuid(),
            actions: newActions.length ? newActions : []
        };
        dispatch(createCue(newCue));
        if (field && field.id) {
            dispatch(updateField({ ...field, connected: newCue }, 'cue'));
        } else {
            dispatch(createTimelineCue(newCue, startTime ? startTime : 0))
        }
    };

export const addFixturesToCue = (fixtures: IFixture[]) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const cue = getSelectedCue(getState());
        if (cue && cue.id) {
            const newActions: ICueAction[] = fixtures.map(f => {
                if (f.activePattern !== null) {
                    return {
                        ...cueActionBase,
                        id: uuid(),
                        fixtureId: f.id,
                        fixtureType: f.type,
                        patternId: f.activePattern ? f.activePattern.id : '',
                        img: f.activePattern ? f.activePattern.img : '',
                        startTime: 0,
                        totalTime: 2,
                        active: false
                    };
                } else return { ...cueActionBase, id: uuid(), fixtureId: f.id };
            });
            dispatch(updateCue({...cue, actions: [...cue.actions, ...newActions]}))
        }
};

export const initDevices = (fixtures: IFixture[]) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const res = await controllerAPI.sendInitDevises(fixtures);
        console.log(res);
};

export type ICuesActions = ICreateCueAction | IDeleteCueAction | IUpdateCueAction | IOnCueSelection
    | ICreateTimelineCueAction | ISetCuesData | IAddFixturesToCue;
