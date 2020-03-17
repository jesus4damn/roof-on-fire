import { Reducer } from 'redux';

import { DECREMENT, INCREMENT } from './counterActions';
import {RootActions} from "../rootActions";

export interface I_CounterState {
    readonly value: number;
}

const defaultState: I_CounterState = {
    value: 0
};

export const counterReducer: Reducer<I_CounterState> = (
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
