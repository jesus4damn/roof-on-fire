import { Reducer } from 'redux';
import { RootActions } from '../rootActions';
import { IField } from '../../../types/fieldsTypes';
import { PICK_UP_FIELD, SET_INITIAL_FIELDS, SET_NEW_FIELDS } from './fieldsActions';
import { UPDATE_PATTERN } from '../fixturesReducer/fixturesActions';

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
        case UPDATE_PATTERN:
            const key = action.pattern.type === 'static'
                ? 'staticFields'
                : action.pattern.type === 'dynamic'
                    ? 'dynamicFields' : 'longFields';
            return {
                ...state,
                fireMachines: {
                    ...state.fireMachines,
                    [key]: state.fireMachines[key].map( f =>
                        f.connected && f.connected.id === action.pattern.id
                            ? {...f, connected: action.pattern} : f
                    )
                }
            };
        case SET_NEW_FIELDS:
            return state;
        default:
            return state;
    }
};
