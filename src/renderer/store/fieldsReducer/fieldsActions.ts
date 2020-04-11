import { Action, ActionCreator } from 'redux';
import { IPattern } from '../../../types/fixtureTypes';
import { IFieldsState } from './fieldsReducer';
import { ICueField, IField, IPatternField } from '../../../types/fieldsTypes';

export const PICK_UP_FIELD = 'app/buttons/PICK_UP_FIELD';
export const SET_NEW_FIELDS = 'app/buttons/SET_NEW_FIELDS';
export const SET_INITIAL_FIELDS = 'app/buttons/SET_INITIAL_FIELDS';
export const UPDATE_FIELD = 'app/buttons/UPDATE_FIELD';

export interface IPickUpField extends Action {
    type: typeof PICK_UP_FIELD, payload: string
}
export interface ISetNewFields extends Action {
    type: typeof SET_NEW_FIELDS, payload: {patterns: IPattern[] | null, patternsType: string}
}
export interface ISetInitialFields extends Action {
    type: typeof SET_INITIAL_FIELDS, payload: {fields: IFieldsState}
}
export interface IUpdateField extends Action {
    type: typeof UPDATE_FIELD, field: IField | IPatternField | ICueField
}

export const pickUpField: ActionCreator<IPickUpField> = (payload):IPickUpField => ({
    type: PICK_UP_FIELD, payload
});
export const updateField: ActionCreator<IUpdateField> = (field: IField | IPatternField | ICueField):IUpdateField => ({
    type: UPDATE_FIELD, field
});
export const setNewFields: ActionCreator<ISetNewFields> = (patterns, patternsType):ISetNewFields => ({
    type: SET_NEW_FIELDS, payload: {patterns, patternsType}
});
export const setInitialFields: ActionCreator<ISetInitialFields> = (fields: IFieldsState):ISetInitialFields => {
    return ({ type: SET_INITIAL_FIELDS, payload: {fields} });
};

export type IFieldsActions = IPickUpField | ISetNewFields | ISetInitialFields | IUpdateField ;
