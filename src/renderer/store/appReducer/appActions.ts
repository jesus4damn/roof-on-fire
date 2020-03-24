import { Action, ActionCreator } from 'redux';
import { IActionsScreenSwitchers, IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';

export const SWITCH_MAIN_SCREEN = 'app/SWITCH_MAIN_SCREEN';
export const SWITCH_MAIN_RIGHT_PART = 'app/SWITCH_MAIN_RIGHT_PART';
export const SWITCH_ACTIONS_SCREEN = 'app/SWITCH_ACTIONS_SCREEN';

export interface ISwitchMainScreenAction extends Action {
    type: typeof SWITCH_MAIN_SCREEN, payload: IMainScreenSwitchers
}
export interface ISwitchMainRightPartAction extends Action {
    type: typeof SWITCH_MAIN_RIGHT_PART, payload: IMainRightScreenSwitchers
}
export interface ISwitchActionsScreenAction extends Action {
    type: typeof SWITCH_ACTIONS_SCREEN, payload: IActionsScreenSwitchers
}

export const switchMainScreenAction: ActionCreator<ISwitchMainScreenAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN, payload
});
export const switchMainRightPartAction: ActionCreator<ISwitchMainRightPartAction> = (payload) => ({
    type: SWITCH_MAIN_RIGHT_PART, payload
});

export const switchActionsScreenAction: ActionCreator<ISwitchActionsScreenAction> = (payload) => ({
    type: SWITCH_ACTIONS_SCREEN, payload
});

export type IAppActions = ISwitchMainScreenAction | ISwitchActionsScreenAction | ISwitchMainRightPartAction;
