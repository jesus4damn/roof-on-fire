import { Reducer } from 'redux';
import { IActionsScreenSwitchers, IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';
import { SWITCH_ACTIONS_SCREEN, SWITCH_MAIN_RIGHT_PART, SWITCH_MAIN_SCREEN } from './appActions';
import {RootActions} from "../rootActions";

export interface IAppState {
    readonly mainLeftScreenSwitcher: IMainScreenSwitchers,
    readonly mainRightScreenSwitcher: IMainRightScreenSwitchers,
    readonly actionsScreenSwitcher: IActionsScreenSwitchers,
}

const defaultState: IAppState = {
    mainLeftScreenSwitcher: 'visualiser',
    mainRightScreenSwitcher: null,
    actionsScreenSwitcher: 'cues'
};

export const appReducer: Reducer<IAppState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case SWITCH_MAIN_SCREEN:
            return {
                ...state,
                mainLeftScreenSwitcher:  action.payload
            };
        case SWITCH_MAIN_RIGHT_PART:
            return {
                ...state,
                mainRightScreenSwitcher: action.payload === state.mainRightScreenSwitcher ? null : action.payload
            };
        case SWITCH_ACTIONS_SCREEN:
            return {
                ...state,
                actionsScreenSwitcher: action.payload
            };
        default:
            return state;
    }
};
