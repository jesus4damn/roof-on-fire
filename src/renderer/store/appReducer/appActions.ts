import { Action, ActionCreator } from 'redux';
import {
    IActionsScreenSwitchers, IAppScreenModes,
    IContextMenuOption,
    IMainRightScreenSwitchers,
    IMainScreenSwitchers
} from '../../../types/appTypes';
import { TFixturesTypes } from '../../../types/fixtureTypes';
import { ThunkDispatch } from 'redux-thunk';
import { GetStateType } from '../rootReducer';
import { IFixtureActions } from '../fixturesReducer/fixturesActions';
import { controllerAPI } from '../../components/API/API';

export const SWITCH_APP_SCREEN_MODE = 'app/SWITCH_APP_SCREEN_MODE';
export const SWITCH_MAIN_SCREEN = 'app/SWITCH_MAIN_SCREEN';
export const SWITCH_MAIN_RIGHT_PART = 'app/SWITCH_MAIN_RIGHT_PART';
export const SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN';
export const SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN';
export const SET_CONTEXT_MENU_OPTIONS = 'app/SET_CONTEXT_MENU_OPTIONS';
export const SELECT_MUSIC_FILE = 'app/SELECT_MUSIC_FILE';
export const SET_MUSIC_LENGTH = 'app/SET_MUSIC_LENGTH';
export const SET_ALLOW_API = 'app/SET_ALLOW_API';



export interface ISwitchAppScreenMode extends Action {
    type: typeof SWITCH_APP_SCREEN_MODE, payload: IAppScreenModes
}
export interface ISwitchMainScreenAction extends Action {
    type: typeof SWITCH_MAIN_SCREEN, payload: IMainScreenSwitchers
}
export interface ISwitchMainRightPartAction extends Action {
    type: typeof SWITCH_MAIN_RIGHT_PART, payload: IMainRightScreenSwitchers
}
export interface ISwitchFixturePropertiesButtonsScreen extends Action {
    type: typeof SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN, payload: IActionsScreenSwitchers
}
export interface ISwitchFixtureTypesButtonsScreen extends Action {
    type: typeof SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN, payload: TFixturesTypes
}
export interface ISetContextMenuOptions extends Action {
    type: typeof SET_CONTEXT_MENU_OPTIONS, payload: IContextMenuOption[]
}
export interface ISelectMusicFile extends Action {
    type: typeof SELECT_MUSIC_FILE, payload: string
}
export interface ISetMusicFileLength extends Action {
    type: typeof SET_MUSIC_LENGTH, payload: number
}
export interface ISetAllowAPI extends Action {
    type: typeof SET_ALLOW_API, payload: boolean
}

export const switchMainScreenAction: ActionCreator<ISwitchMainScreenAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN, payload
});
export const switchAppScreenMode: ActionCreator<ISwitchAppScreenMode> = (payload) => ({
    type: SWITCH_APP_SCREEN_MODE, payload
});
export const selectMusicFile: ActionCreator<ISelectMusicFile> = (payload) => ({
    type: SELECT_MUSIC_FILE, payload
});
export const switchMainRightPartAction: ActionCreator<ISwitchMainRightPartAction> = (payload) => ({
    type: SWITCH_MAIN_RIGHT_PART, payload
});

export const switchFixturePropertiesButtonsScreen: ActionCreator<ISwitchFixturePropertiesButtonsScreen> = (payload) => ({
    type: SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN, payload
});
export const switchFixtureTypesButtonsScreen: ActionCreator<ISwitchFixtureTypesButtonsScreen> = (payload) => ({
    type: SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN, payload
});
export const setContextMenuOptions: ActionCreator<ISetContextMenuOptions> = (payload: IContextMenuOption[]) => ({
    type: SET_CONTEXT_MENU_OPTIONS, payload
});
export const setMusicFileLength: ActionCreator<ISetMusicFileLength> = (payload: number) => ({
    type: SET_MUSIC_LENGTH, payload
});
export const setAllowAPI: ActionCreator<ISetAllowAPI> = (payload: boolean) => ({
    type: SET_ALLOW_API, payload
});

export const sendMusicAction = (payload: string) =>
    async (dispatch: ThunkDispatch<{}, {}, IFixtureActions>, getState: GetStateType) => {
        const res = await controllerAPI.sendEvent(payload);
        console.log(res);
    };

export type IAppActions = ISwitchMainScreenAction | ISwitchFixturePropertiesButtonsScreen
    | ISwitchMainRightPartAction | ISwitchFixtureTypesButtonsScreen | ISetContextMenuOptions
    | ISelectMusicFile | ISetMusicFileLength | ISetAllowAPI | ISwitchAppScreenMode;
