import { Reducer } from 'redux';
import {IActionsScreenSwitchers, IMainScreenSwitchers} from "../../../types/appTypes";
import {SWITCH_ACTIONS_SCREEN, SWITCH_MAIN_SCREEN} from "./appActions";
import {RootActions} from "../rootActions";

export interface IAppState {
    readonly mainScreenSwitcher: IMainScreenSwitchers;
    readonly actionsScreenSwitcher: IActionsScreenSwitchers;
}

const defaultState: IAppState = {
    mainScreenSwitcher: 'visualiser',
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
