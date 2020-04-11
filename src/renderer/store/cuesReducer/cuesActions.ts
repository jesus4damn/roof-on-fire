import { Action, ActionCreator } from 'redux';
import { IFixture } from '../../../types/fixtureTypes';
import { ThunkDispatch } from 'redux-thunk';
import { RootActions } from '../rootActions';
import { GetStateType } from '../rootReducer';
import { ICue, ICueAction } from '../../../types/cuesTypes';
import { v4 as uuid } from 'uuid';
import { updateField } from '../fieldsReducer/fieldsActions';
import { IField } from '../../../types/fieldsTypes';

export const CREATE_CUE = 'cues/CREATE_CUE';
export const DELETE_CUE = 'cues/DELETE_CUE';
export const UPDATE_CUE = 'cues/UPDATE_CUE';
export const SET_SELECTED_CUE = 'cues/SET_SELECTED_CUE';

export interface IOnCueSelection {
    type: typeof SET_SELECTED_CUE,
    cue: ICue | null
}

export interface ICreateCueAction extends Action {
    type: typeof CREATE_CUE,
    cue: ICue
}

export interface IDeleteCueAction extends Action {
    type: typeof DELETE_CUE;
}

export interface IUpdateCueAction extends Action {
    type: typeof UPDATE_CUE;
}

export const createCue: ActionCreator<ICreateCueAction> = (cue: ICue) => ({
    type: CREATE_CUE, cue
});

export const deleteCue: ActionCreator<IDeleteCueAction> = () => ({
    type: DELETE_CUE
});

export const updateCue: ActionCreator<IUpdateCueAction> = () => ({
    type: UPDATE_CUE
});

export const setSelectedCue: ActionCreator<IOnCueSelection> = (cue: ICue | null) => ({
    type: SET_SELECTED_CUE, cue
});

const cueBase: ICue = {
    id: uuid(),
    startTime: null,
    endTime: null,
    fixtureType: 'fireMachine',
    name: 'new cue',
    active: false,
    actions: []
};
const cueActionBase: ICueAction = {
    id: uuid(),
    fixtureId: '',
    patternId: '',
    fixtureType: 'fireMachine',
    img: '',
    startTime: 0,
    totalTime: 2,
    active: false
};

export const createNewCue = (fixtures: IFixture[], field: IField) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const newActions: ICueAction[] = fixtures.map(f => {
            if (f.activePattern !== null) {
                return {
                    ...cueActionBase,
                    fixtureId: f.id,
                    fixtureType: f.type,
                    patternId: f.activePattern ? f.activePattern.id : '',
                    img: f.activePattern ? f.activePattern.img : '',
                    startTime: 0,
                    totalTime: 2,
                    active: false
                };
            } else return { ...cueActionBase, fixtureId: f.id };
        });
        const newCue: ICue = {
            ...cueBase,
            actions: newActions.length ? newActions : []
        };
        dispatch(createCue(newCue));
        dispatch(updateField({ ...field, connected: newCue }));
    };


export type ICuesActions = ICreateCueAction | IDeleteCueAction | IUpdateCueAction | IOnCueSelection;
