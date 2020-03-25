import { Action, ActionCreator, Dispatch } from 'redux';
import { IFixture } from '../../../types/fixtureTypes';

export const PATCH_FIXTURE = 'fixtures/PATCH_FIXTURE';
export const DELETE_FIXTURE = 'fixtures/DELETE_FIXTURE';
export const UPDATE_FIXTURE = 'fixtures/UPDATE_FIXTURE';

export type IFixtureActions = IPatchFixtureAC | IDeleteFixtureAC | IUpdateFixtureAC;

export interface IPatchFixtureAC extends Action {
    type: typeof PATCH_FIXTURE, payload: IFixture[]
}
export interface IDeleteFixtureAC extends Action {
    type: typeof DELETE_FIXTURE, fixtureId: string
}
export interface IUpdateFixtureAC extends Action {
    type: typeof UPDATE_FIXTURE, fixture: IFixture
}

export const patchFixtureAC: ActionCreator<IPatchFixtureAC> = (payload) => ({
    type: PATCH_FIXTURE, payload
});

export const deleteFixtureAC: ActionCreator<IDeleteFixtureAC> = (fixtureId: string) => ({
    type: DELETE_FIXTURE, fixtureId
});
export const updateFixture = (fixture: IFixture) => (dispatch: Dispatch) => ({
    type: UPDATE_FIXTURE, fixture
});


