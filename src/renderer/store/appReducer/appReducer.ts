import { Reducer } from 'redux';
import {I_ActionsScreenSwitchers, I_MainScreenSwitchers} from "../../../types/appTypes";
import {SWITCH_ACTIONS_SCREEN, SWITCH_MAIN_SCREEN} from "./appActions";
import {RootActions} from "../rootActions";

export interface I_AppState {
    readonly mainScreenSwitcher: I_MainScreenSwitchers;
    readonly actionsScreenSwitcher: I_ActionsScreenSwitchers;
}

const defaultState: I_AppState = {
    mainScreenSwitcher: 'visualiser',
    actionsScreenSwitcher: 'cues'
};

export const appReducer: Reducer<I_AppState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case SWITCH_MAIN_SCREEN:
            return {
                ...state,
                mainScreenSwitcher: action.payload
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
