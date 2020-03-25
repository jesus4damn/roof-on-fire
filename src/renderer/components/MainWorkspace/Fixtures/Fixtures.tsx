import * as React from "react";
import {connect} from "react-redux";
import { RootState } from '../../../store/rootReducer';
import { getFixtureGroups, getFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { updateFixture } from '../../../store/fixturesReducer/fixturesActions';
import { IFixture, IFixturesGroup } from '../../../../types/fixtureTypes';

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
            <table>
                <tbody>
                    {fixtures.map( f => {
                        return (
                            <tr key={f.id}>
                                <td>{f.name}</td>
                                <td>{f.active}</td>
                                <td>{f.img}</td>
                                <td>{f.type}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
};

const mapStateToProps = (state: RootState) => ({
    fixtures: getFixtures(state),
    groups: getFixtureGroups(state)
});

export default connect(mapStateToProps, {updateFixture})(Fixtures);
