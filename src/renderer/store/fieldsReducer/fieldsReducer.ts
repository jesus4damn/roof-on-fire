import { Reducer } from 'redux';
import { RootActions } from '../rootActions';
import { IField } from '../../../types/fieldsTypes';
import { generateFields } from '../mockDataGenerators';
import { PICK_UP_FIELD, SET_INITIAL_FIELDS, SET_NEW_FIELDS } from './fieldsActions';

export interface IFieldsState {
    readonly cuesFields: IField[],
    readonly staticFields: IField[],
    readonly dynamicFields: IField[],
    readonly longFields: IField[],
}

const defaultState: IFieldsState = {
    cuesFields: [],
    staticFields: [],
    dynamicFields: [],
    longFields: [],
};

export const fieldsReducer: Reducer<IFieldsState> = (
    state = defaultState,
    action: RootActions
): IFieldsState => {
    switch (action.type) {
        case PICK_UP_FIELD:
            return {
                ...state
            };
        case SET_INITIAL_FIELDS:
            return {
                ...state,
                ...action.payload.fields
            }
        case SET_NEW_FIELDS:
            const isRearrange = action.payload.patterns && action.payload.patterns.length
                ? action.payload.patterns
                : null;
            const toRearrange = action.payload.patternsType === 'static'
                ? {staticFields: generateFields(isRearrange)}
                : action.payload.patternsType === 'dynamic'
                    ? {staticFields: generateFields(isRearrange)}
                    : {longFields: generateFields(isRearrange)};
            return {
                ...state,
                ...toRearrange
            };
        default:
            return state;
    }
};
