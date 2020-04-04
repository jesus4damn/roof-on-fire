import { Action, ActionCreator } from 'redux';
import { IFixture, IPattern } from '../../../types/fixtureTypes';
import { IFixturesState } from './fixturesReducer';

export const PATCH_FIXTURES = 'fixtures/PATCH_FIXTURE';
export const SET_FIXTURES_STATE = 'fixtures/SET_FIXTURES_STATE';
export const DELETE_FIXTURE = 'fixtures/DELETE_FIXTURE';
export const UPDATE_FIXTURE = 'fixtures/UPDATE_FIXTURE';
export const SET_FIXTURE_PATTERN = 'fixtures/SET_FIXTURE_PATTERN';
export const UPDATE_PATTERN = 'fixtures/UPDATE_PATTERN';

export type IFixtureActions = IPatchFixturesAC | IDeleteFixtureAC
    | IUpdateFixtureAC | ISetFixturePatternAC | ISETFixturesSateAC
    | IUpdateFixturePattern;

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
export interface ISetFixturePatternAC extends Action {
    type: typeof SET_FIXTURE_PATTERN, pattern: IPattern
}
export interface IUpdateFixturePattern extends Action {
    type: typeof UPDATE_PATTERN, pattern: IPattern
}

export const patchFixturesAC: ActionCreator<IPatchFixturesAC> = (payload: IFixture[]) =>
    ({ type: PATCH_FIXTURES, payload });

export const deleteFixtureAC: ActionCreator<IDeleteFixtureAC> = (fixtureId: string) =>
    ({ type: DELETE_FIXTURE, fixtureId });

export const updateFixture = (fixture: IFixture):IUpdateFixtureAC =>
    ({ type: UPDATE_FIXTURE, fixture });

export const setFixturePattern = (pattern: IPattern):ISetFixturePatternAC =>
    ({ type: SET_FIXTURE_PATTERN, pattern });

export const sETFixturesSateAC = (payload: IFixturesState):ISETFixturesSateAC =>
    ({ type: SET_FIXTURES_STATE, payload });

export const updateFixturePattern = (pattern: IPattern):IUpdateFixturePattern =>
    ({ type: UPDATE_PATTERN, pattern });

