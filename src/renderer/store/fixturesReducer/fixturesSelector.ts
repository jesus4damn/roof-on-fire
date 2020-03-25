import { RootState } from '../rootReducer';
import { createSelector } from "reselect";
import { IFixture } from '../../../types/fixtureTypes';

export const getFixtures = (state:RootState) => state.fixtures.fixtures;
export const getFixtureGroups = (state:RootState) => state.fixtures.groups;

export const getSelectedGroupFixtures = createSelector(getFixtures, getFixtureGroups, (fixtures, fixturesGroups) => {
    let res: IFixture[] = [];
    fixturesGroups.filter(gr => gr.selected).forEach(gr => {
       res = [...res, ...fixtures.filter(f => gr.fixturesIds.includes(f.id))]
    });
    return res;
});
