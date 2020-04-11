import { RootState } from '../rootReducer';
import { createSelector } from "reselect";
import { IFixture, IPattern, TFixturesTypes } from '../../../types/fixtureTypes';
import { ICueAction } from '../../../types/cuesTypes';

export const getFixtures = (state:RootState):IFixture[] => state.fixtures.fixtures;
export const getAllPatterns = (state:RootState) => state.fixtures.patterns;
export const getFixtureGroups = (state:RootState) => state.fixtures.groups;
export const getFixturesTypes = (state:RootState):TFixturesTypes[] => state.fixtures.fixtureTypes;


export const getSelectedGroupFixtures = createSelector(getFixtures, getFixtureGroups, (fixtures, fixturesGroups) => {
    let res: IFixture[] = [];
    fixturesGroups.filter(gr => gr.selected).forEach(gr => {
       res = [...res, ...fixtures.filter(f => gr.fixturesIds.includes(f.id))]
    });
    return res;
});

export const getFixtureById = (state:RootState, id: string):IFixture =>
    state.fixtures.fixtures.filter(f => id === f.id)[0];

export const getPatternByAction = (state:RootState, action: ICueAction):IPattern =>
    state.fixtures.patterns[action.fixtureType].filter(p => p.id === action.patternId)[0];


export const getSelectedFixtures = (state:RootState):IFixture[] => state.fixtures.fixtures.filter(f => f.selected);
