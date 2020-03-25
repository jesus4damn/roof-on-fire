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
                mainLeftScreenSwitcher: action.payload,
                mainRightScreenSwitcher: state.mainLeftScreenSwitcher === 'visualiser'
                && action.payload === 'visualiser'
                    ? null
                    : action.payload === 'cueListWindow' ? "cuesWindow" : state.mainRightScreenSwitcher,
            };
        case SWITCH_MAIN_RIGHT_PART:
            return {
                ...state,
                mainRightScreenSwitcher: state.mainLeftScreenSwitcher === 'cueListWindow'
                && action.payload === state.mainRightScreenSwitcher
                    ? 'cuesWindow'
                    : action.payload === state.mainRightScreenSwitcher ? null : action.payload
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
