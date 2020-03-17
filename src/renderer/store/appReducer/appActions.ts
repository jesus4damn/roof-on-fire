import { Action, ActionCreator } from 'redux';
import {I_ActionsScreenSwitchers, I_MainScreenSwitchers} from "../../../types/appTypes";

export const SWITCH_MAIN_SCREEN = 'app/SWITCH_MAIN_SCREEN';
export const SWITCH_ACTIONS_SCREEN = 'app/SWITCH_ACTIONS_SCREEN';

export interface I_SwitchMainScreenAction extends Action {
    type: typeof SWITCH_MAIN_SCREEN, payload: I_MainScreenSwitchers
}
export interface I_SwitchActionsScreenAction extends Action {
    type: typeof SWITCH_ACTIONS_SCREEN, payload: I_ActionsScreenSwitchers
}

export const switchMainScreenAction: ActionCreator<I_SwitchMainScreenAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN, payload
});

export const switchActionsScreenAction: ActionCreator<I_SwitchActionsScreenAction> = (payload) => ({
    type: SWITCH_ACTIONS_SCREEN, payload
});

export type I_AppActions = I_SwitchMainScreenAction | I_SwitchActionsScreenAction;
