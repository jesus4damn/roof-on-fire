import { Action, ActionCreator } from 'redux';
import { IActionsScreenSwitchers, IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';
import { TFixtureType } from '../fixturesReducer/fixturesReducer';

export const SWITCH_MAIN_SCREEN = 'app/SWITCH_MAIN_SCREEN';
export const SWITCH_MAIN_RIGHT_PART = 'app/SWITCH_MAIN_RIGHT_PART';
export const SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURE_PROPERTIES_BUTTONS_SCREEN';
export const SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN = 'app/SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN';

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
    type: typeof SWITCH_FIXTURES_TYPES_BUTTONS_SCREEN, payload: TFixtureType
}

export const switchMainScreenAction: ActionCreator<ISwitchMainScreenAction> = (payload) => ({
    type: SWITCH_MAIN_SCREEN, payload
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

export type IAppActions = ISwitchMainScreenAction | ISwitchFixturePropertiesButtonsScreen
    | ISwitchMainRightPartAction | ISwitchFixtureTypesButtonsScreen;
