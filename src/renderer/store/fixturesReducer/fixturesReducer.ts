import { Reducer } from 'redux';
import { RootActions } from '../rootActions';
import { IFixture, IFixturesGroup, IPattern, TFixturesTypes } from '../../../types/fixtureTypes';
import {
    DELETE_FIXTURE,
    PATCH_FIXTURES, SELECT_GROUP,
    SET_FIXTURE_PATTERN,
    SET_FIXTURES_STATE,
    SET_SELECTED_FIXTURES_PATTERN,
    UPDATE_FIXTURE,
    UPDATE_FIXTURE_SHOT,
    UPDATE_PATTERN
} from './fixturesActions';
import { generateMockFixtures } from '../mockDataGenerators';
import { SET_WHOLE_STATE } from '../appReducer/appActions';
import { isEven } from '../../utils/Helpers';

export interface IFixturesState {
    readonly patterns: {
        readonly [Fixture in TFixturesTypes]: IPattern[]
    },
    readonly fixtures: IFixture[],
    readonly groups: IFixturesGroup[],
    readonly fixtureTypes: TFixturesTypes[],
}

export const defaultState: IFixturesState = {
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
            return state;
        case UPDATE_FIXTURE:{
            let idx = state.fixtures.map(f => f.id).indexOf(action.fixture.id);
            let newFixtures = [...state.fixtures];
            newFixtures[idx] = {...newFixtures[idx], ...action.fixture};
            return {
                ...state,
                fixtures: newFixtures
            };
        }
        case SELECT_GROUP: {
            const isSelect = (i: number) => {
                switch(action.group) {
                    case 'even': return isEven(i);
                    case 'odd': return !isEven(i);
                    case 'left': return i < state.fixtures.length / 2;
                    case 'right': return i > (state.fixtures.length / 2) - 0.01;
                    default: {
                        return true;
                    }
                }
            };
            return {
                ...state,
                fixtures: state.fixtures.map((f, i) => ({...f, selected: isSelect(i)}))
            };
        }
        case UPDATE_FIXTURE_SHOT: {
            let idx = state.fixtures.map(f => f.id).indexOf(action.fixture.id);
            let newFixtures = [...state.fixtures];
            newFixtures[idx] = {...newFixtures[idx], ...action.fixture};
            return {
                ...state,
                fixtures: newFixtures
            };
        }
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
        case SET_FIXTURE_PATTERN: {
            let idx = state.fixtures.map(f => f.id).indexOf(action.fixtureId);
            let newFixtures = [...state.fixtures];
            newFixtures[idx] = {...newFixtures[idx], activePattern: action.pattern};
            return {
                ...state,
                fixtures: newFixtures
            };
        }


        case UPDATE_PATTERN: {
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
        }
        case SET_FIXTURES_STATE:
            return action.payload;
        case SET_WHOLE_STATE:
            return action.payload.fixtures;
        default:
            return state;
    }
};

export default fixturesReducer;
