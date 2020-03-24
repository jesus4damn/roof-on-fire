import { Action, ActionCreator } from 'redux';

export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

export interface IIncrementAction extends Action {
    type: typeof INCREMENT;
}
export interface IDecrementAction extends Action {
    type: typeof DECREMENT;
}

export const increment: ActionCreator<IIncrementAction> = () => ({
    type: INCREMENT
});

export const decrement: ActionCreator<IDecrementAction> = () => ({
    type: DECREMENT
});

export type ICounterActions = IIncrementAction | IDecrementAction;
