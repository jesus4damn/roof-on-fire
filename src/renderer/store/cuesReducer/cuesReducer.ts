import { Reducer } from 'redux';

import { RootActions } from '../rootActions';
import { CREATE_CUE, DELETE_CUE } from './cuesActions';

export interface ICuesState {
    readonly value: number;
}

const defaultState: ICuesState = {
    value: 0
};

export const cuesReducer: Reducer<ICuesState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case CREATE_CUE:
            return {
                ...state,
                value: state.value + 1
            };
        case DELETE_CUE:
            return {
                ...state,
                value: state.value - 1
            };
        default:
            return state;
    }
};
