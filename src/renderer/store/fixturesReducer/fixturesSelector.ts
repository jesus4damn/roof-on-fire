import { RootState } from '../rootReducer';
import { createSelector } from "reselect";
import { IFixture, IPattern, TFixturesTypes } from '../../../types/fixtureTypes';
import { getSelectedFixtureTypesScreenWindow } from '../appReducer/appSelectors';

export const getFixtures = (state:RootState):IFixture[] => state.fixtures.fixtures;
export const getPatterns = (state:RootState):IPattern[] => state.fixtures.patterns.fireMachine;
export const getFixtureGroups = (state:RootState) => state.fixtures.groups;
export const getFixturesTypes = (state:RootState):TFixturesTypes[] => state.fixtures.fixtureTypes;


export const getSelectedGroupFixtures = createSelector(getFixtures, getFixtureGroups, (fixtures, fixturesGroups) => {
    let res: IFixture[] = [];
    fixturesGroups.filter(gr => gr.selected).forEach(gr => {
       res = [...res, ...fixtures.filter(f => gr.fixturesIds.includes(f.id))]
    });
    return res;
});
