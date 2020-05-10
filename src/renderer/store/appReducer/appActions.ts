import { Action, ActionCreator } from 'redux';
import {
    IActionsScreenSwitchers,
    IContextMenuOption,
    IMainRightScreenSwitchers,
    IMainScreenSwitchers
} from '../../../types/appTypes';
import { TFixturesTypes } from '../../../types/fixtureTypes';

export const SWITCH_MAIN_SCREEN = 'app/SWITCH_MAIN_SCREEN';
export const SWITCH_MAIN_RIGHT_PART = 'app/SWITCH_MAIN_RIGHT_PART';
export const SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN';
export const SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN';
export const SET_CONTEXT_MENU_OPTIONS = 'app/SET_CONTEXT_MENU_OPTIONS';
export const SELECT_MUSIC_FILE = 'app/SELECT_MUSIC_FILE';
export const SET_MUSIC_LENGTH = 'app/SET_MUSIC_LENGTH';



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

export const switchMainScreenAction: ActionCreator<ISwitchMainScreenAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN, payload
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

export type IAppActions = ISwitchMainScreenAction | ISwitchFixturePropertiesButtonsScreen
    | ISwitchMainRightPartAction | ISwitchFixtureTypesButtonsScreen | ISetContextMenuOptions
    | ISelectMusicFile | ISetMusicFileLength;
