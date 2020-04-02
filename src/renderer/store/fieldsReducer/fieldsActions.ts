import { Action, ActionCreator } from 'redux';
import { IPattern } from '../../../types/fixtureTypes';

export const PICK_UP_FIELD = 'app/buttons/PICK_UP_FIELD';
export const SET_NEW_FIELDS = 'app/buttons/SET_NEW_FIELDS';

export interface IPickUpField extends Action {
    type: typeof PICK_UP_FIELD, payload: string
}
export interface ISetNewFields extends Action {
    type: typeof SET_NEW_FIELDS, payload: {patterns: IPattern[] | null, patternsType: string}
}

export const pickUpField: ActionCreator<IPickUpField> = (payload):IPickUpField => ({
    type: PICK_UP_FIELD, payload
});
export const setNewFields: ActionCreator<ISetNewFields> = (patterns, patternsType):ISetNewFields => ({
    type: SET_NEW_FIELDS, payload: {patterns, patternsType}
});

export type IFieldsActions = IPickUpField | ISetNewFields ;
