import * as React from "react";
import {connect} from "react-redux";
import { RootState } from '../../../store/rootReducer';
import { getFixtureGroups, getFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { IFixture, IFixturesGroup } from '../../../../types/fixtureTypes';
import FixtureItem from './FixtureItem';
import { updateFixture } from '../../../store/fixturesReducer/fixturesActions';

require('./FixtureItem.scss');

interface IProps {
    fixtures: IFixture[],
    groups: IFixturesGroup[],
    updateFixture: (fixture: IFixture) => void
}

const Fixtures:React.FC<IProps> = ({fixtures, groups, updateFixture}) => {
    return (
        <div>
            <h2>
                Fixtures
            </h2>
            <div className="fixtures">
                <div>
                    {fixtures.map( f => {
                        return (
                            <FixtureItem fixture={f} update={updateFixture}/>
                        )
                    })}
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    fixtures: getFixtures(state),
    groups: getFixtureGroups(state)
});

export default connect(mapStateToProps, { updateFixture })(Fixtures);
