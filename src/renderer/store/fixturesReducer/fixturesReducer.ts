import { Reducer } from 'redux';

import {RootActions} from "../rootActions";
import { IFixture, IFixturesGroup, IParamsDMX, IPatternBase, TFixturesTypes } from '../../../types/fixtureTypes';
import { DELETE_FIXTURE, PATCH_FIXTURE, UPDATE_FIXTURE } from './fixturesActions';

const generateMockFixtures = (count: number): IFixture[] => {
    let res: IFixture[] = [];
    let prevAddres = 1;
    for (let i = 0; i < count; i++) {
        res.push({
            id: `mock-fixture-created-${i}`,
            number: i + 1,
            selected: false,
            type: 'fixture',
            active: false,
            img: null,
            name: `fire-machine ${i}`,
            posX: 0,
            posY: 0,
            startAddress: prevAddres + 5 * i,
            params: [
                {
                dmxOutput: 0,
                physicalOutput: 0,
                parts: null,
                dmxAddress: prevAddres + 1,
                name: 'dimmer'
                },
                {
                    dmxOutput: 0,
                    physicalOutput: 0,
                    parts: null,
                    dmxAddress: prevAddres + 2,
                    name: 'tilt'
                },
                {
                    dmxOutput: 0,
                    physicalOutput: 0,
                    parts: null,
                    dmxAddress: prevAddres + 3,
                    name: 'speed'
                }
            ]
        });
        prevAddres = prevAddres + 1
    }
    return res
};

export interface IFixturesState {
    readonly fixtures: IFixture[],
    readonly groups: IFixturesGroup[],
}

const defaultState: IFixturesState = {
    fixtures: generateMockFixtures(8),
    groups: [],
};

export const fixturesReducer: Reducer<IFixturesState> = (
    state = defaultState,
    action: RootActions
) => {
    switch (action.type) {
        case PATCH_FIXTURE:
            return {
                ...state
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
