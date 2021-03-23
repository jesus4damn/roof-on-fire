import { Action, ActionCreator } from 'redux';
import {
    IActionsScreenSwitchers,
    IAppScreenModes,
    IContextMenuOption,
    IMainRightScreenSwitchers,
    IMainScreenSwitchers,
    IMainScreenSettingsSwitcher
} from '../../../types/appTypes';
import { IPattern, TFixturesTypes } from '../../../types/fixtureTypes';
import { ThunkDispatch } from 'redux-thunk';
import { GetStateType, RootState } from '../rootReducer';
import { IFixtureActions } from '../fixturesReducer/fixturesActions';
import { controllerAPI } from '../../components/API/API';
import { RootActions } from '../rootActions';
import { IInitAppParams, loadPrevious, resetState, saveState } from '../getInitalState';
import { initDevices } from '../cuesReducer/cuesActions';

export const SWITCH_APP_SCREEN_MODE = 'app/SWITCH_APP_SCREEN_MODE';
export const SWITCH_MAIN_SCREEN = 'app/SWITCH_MAIN_SCREEN';
export const SWITCH_MAIN_SCREEN_SETTINGS = 'app/SWITCH_MAIN_SCREEN_SETTINGS';
export const SWITCH_MAIN_RIGHT_PART = 'app/SWITCH_MAIN_RIGHT_PART';
export const SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN';
export const SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN';
export const SET_CONTEXT_MENU_OPTIONS = 'app/SET_CONTEXT_MENU_OPTIONS';
export const SELECT_MUSIC_FILE = 'app/SELECT_MUSIC_FILE';
export const SET_MUSIC_LENGTH = 'app/SET_MUSIC_LENGTH';
export const SET_ALLOW_API = 'app/SET_ALLOW_API';
export const SET_WHOLE_STATE = 'app/SET_WHOLE_STATE';
export const SET_ERROR = 'app/SET_ERROR';


export interface ISetWholeState extends Action {
    type: typeof SET_WHOLE_STATE,
    payload: RootState
}

export interface ISwitchAppScreenMode extends Action {
    type: typeof SWITCH_APP_SCREEN_MODE,
    payload: IAppScreenModes
}

export interface ISetError extends Action {
    type: typeof SET_ERROR,
    payload: any
}

export interface ISwitchMainScreenAction extends Action {
    type: typeof SWITCH_MAIN_SCREEN,
    payload: IMainScreenSwitchers
}

export interface ISwitchMainScreenSettingsAction extends Action {
    type: typeof SWITCH_MAIN_SCREEN_SETTINGS,
    payload: IMainScreenSettingsSwitcher
}

export interface ISwitchMainRightPartAction extends Action {
    type: typeof SWITCH_MAIN_RIGHT_PART,
    payload: IMainRightScreenSwitchers
}

export interface ISwitchFixturePropertiesButtonsScreen extends Action {
    type: typeof SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN,
    payload: IActionsScreenSwitchers
}

export interface ISwitchFixtureTypesButtonsScreen extends Action {
    type: typeof SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN,
    payload: TFixturesTypes
}

export interface ISetContextMenuOptions extends Action {
    type: typeof SET_CONTEXT_MENU_OPTIONS,
    payload: IContextMenuOption[]
}

export interface ISelectMusicFile extends Action {
    type: typeof SELECT_MUSIC_FILE,
    payload: string
}

export interface ISetMusicFileLength extends Action {
    type: typeof SET_MUSIC_LENGTH,
    payload: number
}

export interface ISetAllowAPI extends Action {
    type: typeof SET_ALLOW_API,
    payload: boolean
}

export const switchMainScreenAction: ActionCreator<ISwitchMainScreenAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN, payload
});
export const switchMainScreenSettingsAction: ActionCreator<ISwitchMainScreenSettingsAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN_SETTINGS, payload
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
export const setError: ActionCreator<ISetError> = (payload: any) => ({
    type: SET_ERROR, payload
});

export const sendMusicAction = (payload: string) =>
    async (dispatch: ThunkDispatch<{}, {}, IFixtureActions>, getState: GetStateType) => {
        const res = await controllerAPI.sendEvent(payload);
        console.log(res);
    };

export const storeShowFile = (path: string) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const state = getState();
        try {
            await controllerAPI.saveShowFile(state, path);
            saveState({ fixtures: state.fixtures, fields: state.fields, cues: state.cues });
        } catch (e) {
            saveState({ fixtures: state.fixtures, fields: state.fields, cues: state.cues });
            dispatch(setError({load: "Не удалось сохранить файл! Данные сохранены в временное франилище."}));
        }
    };

export const loadShowFile = (path: string) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        console.log('load ==========>');
        try {
            const wholeState = await controllerAPI.loadShowFile(path);
            if (wholeState) {
                dispatch({ type: SET_WHOLE_STATE, payload: wholeState });
            } else {
                const commonData = loadPrevious();
                dispatch({ type: SET_WHOLE_STATE, payload: {...getState(), ...commonData} });
                if (path) {
                    dispatch(setError({load: "Не удалось загрузить файл! Данные загружены из временного франилища."}))
                }
            }
        } catch (e) {
            console.log(e);
            try {
                const commonData = loadPrevious();
                dispatch({ type: SET_WHOLE_STATE, payload: {...getState(), ...commonData} });
                if (path) {
                    dispatch(setError({load: "Не удалось загрузить файл! Данные загружены из временного франилища."}))
                }
            } catch (e) {
                const commonData = resetState();
                let state = getState();
                dispatch({ type: SET_WHOLE_STATE, payload: {...state, ...commonData} });
            }
        }
    };
export const resetShowData = (params: IInitAppParams, patterns?: IPattern[]) =>
    async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {
        const common = resetState(patterns ? {
            fixtures: getState().fixtures.fixtures.length,
            static: 1,
            dynamic: 1,
            long: 1
        } : params, patterns);
        dispatch({ type: SET_WHOLE_STATE, payload: {...getState(), ...common} });
        // @ts-ignore
        await dispatch(initDevices(common.fixtures.fixtures));
    };

export const onDeletePressed = () =>
  async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {};

export const onSpacePressed = () =>
  async (dispatch: ThunkDispatch<{}, {}, RootActions>, getState: GetStateType) => {};

export type IAppActions = ISwitchMainScreenAction | ISwitchMainScreenSettingsAction | ISwitchFixturePropertiesButtonsScreen
    | ISwitchMainRightPartAction | ISwitchFixtureTypesButtonsScreen | ISetContextMenuOptions
    | ISelectMusicFile | ISetMusicFileLength | ISetAllowAPI | ISwitchAppScreenMode | ISetWholeState | ISetError;
