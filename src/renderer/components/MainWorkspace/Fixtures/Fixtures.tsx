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
            <table className="fixtures">
                <tbody>
                    {fixtures.map( f => {
                        return (
                            <tr key={f.id}>
                                <td><div className="fixturesItem"><span>{f.img}</span> </div> </td>
                                <td><div className="fixturesItem"><span>№</span> <span>{f.name}</span> </div></td>
                                <td><div className="fixturesItem"><span>nonegit</span> <span>{f.active}</span> </div> </td>
                                <td><div className="fixturesItem"><span>DMX</span> <span>{f.type}</span>  </div></td>
                                <td><div className="fixturesItem"><span>ARM adress</span> <span>500</span>  </div></td>
                                <td><div className="fixturesItem"><span>dimm</span> <span>0</span> </div> </td>
                                <td><div className="fixturesItem"><span>tilt</span> <span>127</span> </div> </td>
                                <td><div className="fixturesItem"><span>speed</span> <span>0</span> </div> </td>
                                <td><div className="fixturesItem"><span>speed</span> <span>-</span>  </div></td>
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

export default connect(mapStateToProps, { updateFixture })(Fixtures);
