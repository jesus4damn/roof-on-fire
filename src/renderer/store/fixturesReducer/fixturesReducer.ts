import { Reducer } from 'redux';
import {RootActions} from "../rootActions";
import {
    IFixture,
    IFixturesGroup,
} from '../../../types/fixtureTypes';
import { DELETE_FIXTURE, PATCH_FIXTURES, UPDATE_FIXTURE } from './fixturesActions';
import { generateMockFixtures } from '../mockDataGenerators';

export interface IFixturesState {
    readonly fixtures: IFixture[],
    readonly groups: IFixturesGroup[],
    readonly fixtureTypes: string[],
}

const defaultState: IFixturesState = {
    fixtures: generateMockFixtures(8),
    groups: [],
    fixtureTypes: ['fire-machine', 'fireworks-position T1', 'fireworks-position T2', 'Dimmers'],
};

export const fixturesReducer: Reducer<IFixturesState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case PATCH_FIXTURES:
            return {
                ...state,
                fixtures: action.payload
            };
        case DELETE_FIXTURE:
            return {
                ...state
            };
        case UPDATE_FIXTURE:
            return {
                ...state,
                fixtures: [...state.fixtures.map(f => f.id === action.fixture.id ? action.fixture : f)]
            };
        default:
            return state;
    }
};

export default fixturesReducer;
