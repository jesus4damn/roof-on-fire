import { Reducer } from 'redux';

import { DECREMENT, INCREMENT } from './counterActions';
import {RootActions} from "../rootActions";

export interface ICounterState {
    readonly value: number;
}

const defaultState: ICounterState = {
    value: 0
};

export const counterReducer: Reducer<ICounterState> = (
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
