import { Reducer } from 'redux';
import {
    IActionsScreenSwitchers, IAppScreenModes,
    IContextMenuOption,
    IMainRightScreenSwitchers,
    IMainScreenSettingsSwitcher,
    IMainScreenSwitchers
} from '../../../types/appTypes';
import {
    SELECT_MUSIC_FILE, SET_ALLOW_API,
    SET_CONTEXT_MENU_OPTIONS, SET_ERROR, SET_MUSIC_LENGTH, SET_WHOLE_STATE, SWITCH_APP_SCREEN_MODE,
    SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN,
    SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN,
    SWITCH_MAIN_RIGHT_PART,
    SWITCH_MAIN_SCREEN,
    SWITCH_MAIN_SCREEN_SETTINGS
} from './appActions';
import { RootActions } from '../rootActions';
import { TFixturesTypes } from '../../../types/fixtureTypes';

export interface IAppState {
    readonly mainScreenSettings: IMainScreenSettingsSwitcher,
    readonly appScreenMode: IAppScreenModes,
    readonly mainLeftScreenSwitcher: IMainScreenSwitchers,
    readonly mainRightScreenSwitcher: IMainRightScreenSwitchers,
    readonly fixtureTypesScreenWindow: TFixturesTypes | 'all',
    readonly fixturesPropertiesScreenWindow: IActionsScreenSwitchers,
    readonly contextMenuOptions: IContextMenuOption[],
    readonly musicFilePath: string,
    readonly musicTotalTime: number,
    readonly allowedAPI: boolean,
    readonly error: {},
}

export const defaultState: IAppState = {
    mainScreenSettings:{
        width:0,
        height:0,
        image:''
    },
    appScreenMode: 'main',
    mainLeftScreenSwitcher: 'visualiser',
    mainRightScreenSwitcher: null,
    fixtureTypesScreenWindow: 'fireMachine',
    fixturesPropertiesScreenWindow: 'cues',
    contextMenuOptions: [],
    musicFilePath: '',
    musicTotalTime: 0,
    allowedAPI: false,
    error: {}
};

export const appReducer: Reducer<IAppState> = (
    state = defaultState,
    action: RootActions
): IAppState => {
    switch (action.type)  {
        case SWITCH_APP_SCREEN_MODE:
            return {
                ...state,
                appScreenMode: action.payload,
            };
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
        case SELECT_MUSIC_FILE:
            return {
                ...state,
                musicFilePath: action.payload
            };
        case SET_MUSIC_LENGTH:
            return {
                ...state,
                musicTotalTime: action.payload
            };
        case SET_ALLOW_API:
            return {
                ...state,
                allowedAPI: action.payload
            };
        case SET_WHOLE_STATE:
            return action.payload.app;
        case SET_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SWITCH_MAIN_SCREEN_SETTINGS:
            return {
                ...state,
                mainScreenSettings: action.payload
            };
        default:
            return state;
    }
};
