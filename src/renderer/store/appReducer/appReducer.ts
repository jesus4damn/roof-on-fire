import { Reducer } from 'redux';
import {
    IActionsScreenSwitchers,
    IContextMenuOption,
    IMainRightScreenSwitchers,
    IMainScreenSwitchers
} from '../../../types/appTypes';
import {
    SET_CONTEXT_MENU_OPTIONS,
    SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN,
    SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN,
    SWITCH_MAIN_RIGHT_PART,
    SWITCH_MAIN_SCREEN
} from './appActions';
import { RootActions } from '../rootActions';
import { TFixturesTypes } from '../../../types/fixtureTypes';

export interface IAppState {
    readonly mainLeftScreenSwitcher: IMainScreenSwitchers,
    readonly mainRightScreenSwitcher: IMainRightScreenSwitchers,
    readonly fixtureTypesScreenWindow: TFixturesTypes,
    readonly fixturesPropertiesScreenWindow: IActionsScreenSwitchers,
    readonly contextMenuOptions: IContextMenuOption[],
}

const defaultState: IAppState = {
    mainLeftScreenSwitcher: 'visualiser',
    mainRightScreenSwitcher: null,
    fixtureTypesScreenWindow: 'fireMachine',
    fixturesPropertiesScreenWindow: 'cues',
    contextMenuOptions: []
};

export const appReducer: Reducer<IAppState> = (
    state = defaultState,
    action: RootActions
): IAppState => {
    switch (action.type) {
        case SWITCH_MAIN_SCREEN:
            return {
                ...state,
                mainLeftScreenSwitcher: action.payload,
                mainRightScreenSwitcher: state.mainLeftScreenSwitcher === 'visualiser'
                && action.payload === 'visualiser'
                    ? null
                    : action.payload === 'cueListWindow' ? 'cuesWindow' : state.mainRightScreenSwitcher
            };
        case SWITCH_MAIN_RIGHT_PART:
            return {
                ...state,
                mainRightScreenSwitcher: state.mainLeftScreenSwitcher === 'cueListWindow'
                && action.payload === state.mainRightScreenSwitcher
                    ? 'cuesWindow'
                    : action.payload === state.mainRightScreenSwitcher ? null : action.payload
            };
        case SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN:
            return {
                ...state,
                fixturesPropertiesScreenWindow: action.payload
            };
        case SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN:
            return {
                ...state,
                fixtureTypesScreenWindow: action.payload
            };
        case SET_CONTEXT_MENU_OPTIONS:
            return {
                ...state,
                contextMenuOptions: action.payload
            };
        default:
            return state;
    }
};
