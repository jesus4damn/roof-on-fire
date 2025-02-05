import { Action, ActionCreator } from 'redux';
import { IFixture, IPattern, TFixturesGroups, TFixturesTypes } from '../../../types/fixtureTypes';
import { IFixturesState } from './fixturesReducer';
import {ThunkDispatch} from "redux-thunk";
import { GetStateType } from '../rootReducer';
import { controllerAPI } from '../../components/API/API';
import { ICueAction } from '../../../types/cuesTypes';
import { getFixtureById, getPatternByAction } from './fixturesSelector';

export const PATCH_FIXTURES = 'fixtures/PATCH_FIXTURE';
export const SET_FIXTURES_STATE = 'fixtures/SET_FIXTURES_STATE';
export const DELETE_FIXTURE = 'fixtures/DELETE_FIXTURE';
export const UPDATE_FIXTURE = 'fixtures/UPDATE_FIXTURE';
export const UPDATE_FIXTURE_SHOT = 'fixtures/UPDATE_FIXTURE_SHOT';
export const SET_SELECTED_FIXTURES_PATTERN = 'fixtures/SET_SELECTED_FIXTURES_PATTERN';
export const UPDATE_PATTERN = 'fixtures/UPDATE_SELECTED_FIXTURES_PATTERN';
export const SET_FIXTURE_PATTERN = 'fixtures/UPDATE_FIXTURE_PATTERN';
export const SELECT_GROUP = 'fixtures/SELECT_GROUP';

export type IFixtureActions = IPatchFixturesAC | IDeleteFixtureAC
    | IUpdateFixtureAC | IUpdatePattern | ISETFixturesSateAC
    | ISetSelectedFixturesPattern | ISetFixturePattern | IUpdateFixtureShotAC | ISelectFixturesGroupAC;

export interface IPatchFixturesAC extends Action {
    type: typeof PATCH_FIXTURES, payload: IFixture[]
}
export interface ISETFixturesSateAC extends Action {
    type: typeof SET_FIXTURES_STATE, payload: IFixturesState
}
export interface IDeleteFixtureAC extends Action {
    type: typeof DELETE_FIXTURE, fixtureId: string
}
export interface IUpdateFixtureAC extends Action {
    type: typeof UPDATE_FIXTURE, fixture: IFixture
}
export interface ISelectFixturesGroupAC extends Action {
    type: typeof SELECT_GROUP, group: TFixturesGroups
}
export interface IUpdateFixtureShotAC extends Action {
    type: typeof UPDATE_FIXTURE_SHOT, fixture: {id: string, shot: boolean, activePattern: IPattern}
}
export interface IUpdatePattern extends Action {
    type: typeof UPDATE_PATTERN, pattern: IPattern
}
export interface ISetSelectedFixturesPattern extends Action {
    type: typeof SET_SELECTED_FIXTURES_PATTERN, pattern: IPattern
}
export interface ISetFixturePattern extends Action {
    type: typeof SET_FIXTURE_PATTERN, pattern: IPattern, fixtureId: string
}

export const patchFixturesAC: ActionCreator<IPatchFixturesAC> = (payload: IFixture[]) =>
    ({ type: PATCH_FIXTURES, payload });

export const deleteFixtureAC: ActionCreator<IDeleteFixtureAC> = (fixtureId: string) =>
    ({ type: DELETE_FIXTURE, fixtureId });

export const updateFixture = (fixture: IFixture):IUpdateFixtureAC =>
    ({ type: UPDATE_FIXTURE, fixture });

export const selectFixturesGroup = (group: TFixturesGroups):ISelectFixturesGroupAC =>
    ({ type: SELECT_GROUP, group });

export const updateFixtureShot = (fixture: { id: string, shot: boolean, action: ICueAction }) =>
    async (dispatch: ThunkDispatch<{}, {}, IFixtureActions>, getState: GetStateType) => {
        const found = getFixtureById(getState(), fixture.id);
        const pattern = getPatternByAction(getState(), fixture.action);
        const allowedAPI = getState().app.allowedAPI;
        let fixCopy = {...fixture, activePattern: pattern};
        delete fixCopy.action;
        if (found && found.startAddress) {
            try {
                dispatch({type: UPDATE_FIXTURE_SHOT, fixture: fixCopy});
                if (allowedAPI) {
                    //const res = await controllerAPI.sendVal({ channel: found.startAddress, value: fixture.shot ? 255 : 0});
                    const res = await controllerAPI.sendFixture({...found, activePattern: pattern});
                    console.log(res);
                }
            } catch (e) {
                console.log(e);
                dispatch({type: UPDATE_FIXTURE_SHOT, fixture: fixCopy});
            }
        }
    };

export const patchFixtures = (payload: { count: number, fixtureType: TFixturesTypes }) =>
    async (dispatch: ThunkDispatch<{}, {}, IFixtureActions>, getState: GetStateType) => {
        const allowedAPI = getState().app.allowedAPI;
        if (payload.count && payload.fixtureType) {
            try {
                if (allowedAPI) {
                    const res = await controllerAPI.sendPatch("create", "firework", 1);
                    console.log(res);
                }
                dispatch(patchFixturesAC());
            } catch (e) {
                console.log(e);
            }
        }
    };

export const updatePattern = (pattern: IPattern):IUpdatePattern =>
    ({ type: UPDATE_PATTERN, pattern });

export const sETFixturesSateAC = (payload: IFixturesState):ISETFixturesSateAC =>
    ({ type: SET_FIXTURES_STATE, payload });

export const setSelectedFixturesPattern = (pattern: IPattern):ISetSelectedFixturesPattern =>
    ({ type: SET_SELECTED_FIXTURES_PATTERN, pattern });

export const setFixturePattern = (pattern: IPattern, fixtureId: string):ISetFixturePattern =>
    ({ type: SET_FIXTURE_PATTERN, pattern, fixtureId });

