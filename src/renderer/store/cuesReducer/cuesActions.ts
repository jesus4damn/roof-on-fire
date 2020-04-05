import { Action, ActionCreator } from 'redux';

export const CREATE_CUE = 'cues/CREATE_CUE';
export const DELETE_CUE = 'cues/DELETE_CUE';
export const UPDATE_CUE = 'cues/UPDATE_CUE';


export interface ICreateCueAction extends Action {
    type: typeof CREATE_CUE;
}
export interface IDeleteCueAction extends Action {
    type: typeof DELETE_CUE;
}
export interface IUpdateCueAction extends Action {
    type: typeof UPDATE_CUE;
}

export const createCue: ActionCreator<ICreateCueAction> = () => ({
    type: CREATE_CUE
});

export const deleteCue: ActionCreator<IDeleteCueAction> = () => ({
    type: DELETE_CUE
});

export const updateCue: ActionCreator<IUpdateCueAction> = () => ({
    type: UPDATE_CUE
});

export type ICuesActions = ICreateCueAction | IDeleteCueAction | IUpdateCueAction;
