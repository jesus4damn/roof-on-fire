import { Action, ActionCreator } from 'redux';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface I_IncrementAction extends Action {
    type: typeof INCREMENT;
}
export interface I_DecrementAction extends Action {
    type: typeof DECREMENT;
}

export const increment: ActionCreator<I_IncrementAction> = () => ({
    type: INCREMENT
});

export const decrement: ActionCreator<I_DecrementAction> = () => ({
    type: DECREMENT
});

export type I_CounterActions = I_IncrementAction | I_DecrementAction;
