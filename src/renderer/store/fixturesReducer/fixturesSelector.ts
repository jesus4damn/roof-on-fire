import { RootState } from '../rootReducer';
import { createSelector } from "reselect";
import { IFixture, IPattern } from '../../../types/fixtureTypes';
import { getSelectedFixtureTypesScreenWindow } from '../appReducer/appSelectors';

export const getFixtures = (state:RootState):IFixture[] => state.fixtures.fixtures;
export const getFixtureGroups = (state:RootState) => state.fixtures.groups;

export const getSelectedGroupFixtures = createSelector(getFixtures, getFixtureGroups, (fixtures, fixturesGroups) => {
    let res: IFixture[] = [];
    fixturesGroups.filter(gr => gr.selected).forEach(gr => {
       res = [...res, ...fixtures.filter(f => gr.fixturesIds.includes(f.id))]
    });
    return res;
});
export const getFixturesTypes = (state:RootState):string[] => state.fixtures.fixtureTypes;

export const getPatternsByFixtureType = createSelector(
    getFixtures,
    getSelectedFixtureTypesScreenWindow,
    (fixtures, selectedFixType):IPattern[] => {
    let res: IPattern[] = [];
    let fixtureTypeItem = fixtures.filter(f=> f.type === selectedFixType && f.params.filter(p => p.parts))[0];
        fixtureTypeItem && fixtureTypeItem.params.forEach(p => p.parts && p.parts.forEach(par => res.push(par)));
    return res;
});
