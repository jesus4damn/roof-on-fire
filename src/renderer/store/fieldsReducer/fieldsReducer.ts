import { Reducer } from 'redux';
import { RootActions } from '../rootActions';
import { IField } from '../../../types/fieldsTypes';
import { PICK_UP_FIELD, SET_INITIAL_FIELDS, SET_NEW_FIELDS } from './fieldsActions';

export interface IFieldsState {
    readonly cuesFields: IField[],
    readonly fireMachines: {
        readonly staticFields: IField[],
        readonly dynamicFields: IField[],
        readonly longFields: IField[],
    },
    readonly fireWorks: {
        readonly fields: IField[]
    }
}

const defaultState: IFieldsState = {
    cuesFields: [],
    fireMachines: {
        staticFields: [],
        dynamicFields: [],
        longFields: []
    },
    fireWorks: {
        fields: []
    }
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
            const asd = {
            ...state,
            ...action.payload.fields
        };
            return {
                ...asd
            };
        case SET_NEW_FIELDS:
            return state;
        default:
            return state;
    }
};
