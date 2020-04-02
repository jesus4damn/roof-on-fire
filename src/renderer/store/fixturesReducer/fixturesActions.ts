import { Action, ActionCreator } from 'redux';
import { IFixture } from '../../../types/fixtureTypes';

export const PATCH_FIXTURES = 'fixtures/PATCH_FIXTURE';
export const DELETE_FIXTURE = 'fixtures/DELETE_FIXTURE';
export const UPDATE_FIXTURE = 'fixtures/UPDATE_FIXTURE';

export type IFixtureActions = IPatchFixturesAC | IDeleteFixtureAC | IUpdateFixtureAC;

export interface IPatchFixturesAC extends Action {
    type: typeof PATCH_FIXTURES, payload: IFixture[]
}
export interface IDeleteFixtureAC extends Action {
    type: typeof DELETE_FIXTURE, fixtureId: string
}
export interface IUpdateFixtureAC extends Action {
    type: typeof UPDATE_FIXTURE, fixture: IFixture
}

export const patchFixturesAC: ActionCreator<IPatchFixturesAC> = (payload: IFixture[]) =>
    ({ type: PATCH_FIXTURES, payload });

export const deleteFixtureAC: ActionCreator<IDeleteFixtureAC> = (fixtureId: string) =>
    ({ type: DELETE_FIXTURE, fixtureId });

export const updateFixture = (fixture: IFixture):IUpdateFixtureAC =>
    ({ type: UPDATE_FIXTURE, fixture });

export const getFixturePatternById = () => {

};

