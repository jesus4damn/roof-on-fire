import { Reducer } from 'redux';
import { RootActions } from '../rootActions';
import { ICueField, IField, IPatternField } from '../../../types/fieldsTypes';
import { PICK_UP_FIELD, SET_INITIAL_FIELDS, SET_NEW_FIELDS, UPDATE_FIELD } from './fieldsActions';
import { UPDATE_PATTERN } from '../fixturesReducer/fixturesActions';
import { UPDATE_CUE } from '../cuesReducer/cuesActions';
import { generateField } from '../mockDataGenerators';

export interface IFieldsState {
    readonly cuesFields: Array<IField | ICueField>,
    readonly fireMachines: {
        readonly staticFields: Array<IField | IPatternField>,
        readonly dynamicFields: Array<IField | IPatternField>,
        readonly longFields: Array<IField | IPatternField>,
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

export function isCueField(field: IField | ICueField | IPatternField): field is ICueField {
    return (field as ICueField).connected && (field as ICueField).connected.actions !== undefined;
}
export function isPatternField(field: IField | ICueField | IPatternField): field is IPatternField {
    return (field as IPatternField).connected && (field as IPatternField).connected.dmxStart !== undefined;
}
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
                        isPatternField(f) && f.connected.id === action.pattern.id
                            ? {...f, connected: action.pattern} : f
                    )
                }
            };
        case UPDATE_FIELD:
            if (!isPatternField(action.field) && action.fieldType === 'cue') {
                let fieldIndex = state.cuesFields.map(f => f.id).indexOf(action.field.id);
                const updated = state.cuesFields.map(f => f.id === action.field.id ? action.field : f);
                return {
                    ...state,
                    cuesFields: fieldIndex === state.cuesFields.length -1
                        ? [...updated, generateField(null)]
                        : updated
                }
            } else return state;
        case UPDATE_CUE:
            let fieldIndex = state.cuesFields.map(f => isCueField(f) ? f.connected.id : null).indexOf(action.cue.id);
            if (fieldIndex >= 0) {
                return {
                    ...state,
                    cuesFields: state.cuesFields.map((f, i) => i === fieldIndex ? {...f, connected: action.cue} : f)
                }
            } else return state;
        case SET_NEW_FIELDS:
            return state;
        default:
            return state;
    }
};
