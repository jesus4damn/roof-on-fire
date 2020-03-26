import { Reducer } from 'redux';

import { DECREMENT, INCREMENT } from './visualizerActions';
import {RootActions} from "../rootActions";

export interface ICounterState {
    readonly value: number;
}

const defaultState: ICounterState = {
    value: 0
};

export const visualizerReducer: Reducer<ICounterState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case INCREMENT:
            return {
                ...state,
                value: state.value + 1
            };
        case DECREMENT:
            return {
                ...state,
                value: state.value - 1
            };
        default:
            return state;
    }
};
