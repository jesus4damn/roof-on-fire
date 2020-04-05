import { Reducer } from 'redux';
import { RootActions } from '../rootActions';
import { IFixture, IFixturesGroup, IPattern, TFixturesTypes } from '../../../types/fixtureTypes';
import {
    DELETE_FIXTURE,
    PATCH_FIXTURES,
    SET_FIXTURE_PATTERN,
    SET_FIXTURES_STATE,
    SET_SELECTED_FIXTURES_PATTERN,
    UPDATE_FIXTURE,
    UPDATE_PATTERN
} from './fixturesActions';
import { generateMockFixtures } from '../mockDataGenerators';

export interface IFixturesState {
    readonly patterns: {
        readonly [Fixture in TFixturesTypes]: IPattern[]
    },
    readonly fixtures: IFixture[],
    readonly groups: IFixturesGroup[],
    readonly fixtureTypes: TFixturesTypes[],
}

const defaultState: IFixturesState = {
    patterns: {
        fireMachine: [],
        fireWorks: [],
        dimmer: []
    },
    fixtures: generateMockFixtures(8),
    groups: [],
    fixtureTypes: ['fireMachine', 'fireWorks', 'dimmer']
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
                fixtures: [...state.fixtures.map(f => f.id === action.fixture.id
                    ? action.fixture
                    : f)
                ]
            };
        case SET_SELECTED_FIXTURES_PATTERN:
            return {
                ...state,
                [action.pattern.fixtureType]: state.patterns[action.pattern.fixtureType].map(pat =>
                    pat.id === action.pattern.id
                        ? action.pattern
                        : pat
                ),
                fixtures: [...state.fixtures.map(f =>
                    f.selected
                        ? { ...f, activePattern: action.pattern }
                        : f)
                ]
            };
        case SET_FIXTURE_PATTERN:
            return {
                ...state,
                fixtures: state.fixtures.map(f => f.id === action.fixtureId ? {
                    ...f,
                    activePattern: action.pattern
                } : f)
            };
        case UPDATE_PATTERN:
            const toUpdate = {
                ...state.patterns,
                [action.pattern.fixtureType]: state.patterns[action.pattern.fixtureType].map(pat =>
                    pat.id === action.pattern.id
                        ? action.pattern
                        : pat
                )
            };
            return {
                ...state,
                fixtures: state.fixtures.map(f =>
                    f.activePattern && f.activePattern.id === action.pattern.id
                        ? {
                            ...f,
                            active: true,
                            activePattern: action.pattern
                        }
                        : f),
                patterns: toUpdate
            };
        case SET_FIXTURES_STATE:
            return action.payload;
        default:
            return state;
    }
};

export default fixturesReducer;
