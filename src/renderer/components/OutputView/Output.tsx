import * as React from 'react';
import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { TFixturesTypes } from '../../../types/fixtureTypes';
import { getFixtures, getFixturesTypes } from '../../store/fixturesReducer/fixturesSelector';
import { RootState } from '../../store/rootReducer';
import OutputRow from './OutputRow';
import { getTimelineCues } from '../../store/cuesReducer/cuesSelector';

require('./Output.scss');

interface IProps {

}

const Output: React.FC = () => {
  const {
    fixturesTypes,
    fixtures,
    timeLineCues
  } = useSelector((state: RootState) => ({
    fixturesTypes: getFixturesTypes(state),
    fixtures: getFixtures(state),
    timeLineCues: getTimelineCues(state)
  }));
  const [activeType, setActiveType] = useState<TFixturesTypes>(fixturesTypes[0]);
  const [activeFixture, setActiveFixture] = useState<string>(fixtures[0].id);

    ////TODO Vratch design output tables and buttons navigation
  return (
    <React.Fragment>
      <div className="outputCol">
        <div className="navGroup">
          <div className="navGroupButton">
            {fixturesTypes.map((b) => <button key={b}  className={activeType === b ? 'navGroupButtonActive' : ''}
                                              onClick={() => setActiveType(b)}>
              {b}
            </button>)}
          </div>
        </div>

        <table>
          <tbody>

          <tr className="headerTableCues">
            <td>№</td>
            <td>Fixture</td>
            <td>IMG pattern</td>
            <td>Pattern</td>
            <td>Time</td>
            <td>Time between</td>
            <td>Prefire</td>
          </tr>

          {timeLineCues.map((c, i) => c.actions.map(a => <OutputRow action={a} index={i} key={a.id} onUpdate={() => {}} />))}
          </tbody>
        </table>

      </div>

      <div className="WrapControls">
        <button className="ControlsBt">Effect</button>
        <div className="ControlsItem">
          <span>Offset</span>
          <span>1</span>
        </div>
      </div>

      <div className="outputCol">
        <div className="navGroup">
          <div className="navGroupButton">
            {fixtures.map(f => <button key={f.id + "tag"} className={activeFixture === f.id ? 'navGroupButtonActive' : ''}
                                       onClick={() => setActiveFixture(f.id)}>
              {f.name}
            </button>)}
          </div>
        </div>

        <table>
          <tbody>

          <tr className="headerTableCues">
            <td>№</td>
            <td>Fixture</td>
            <td>IMG pattern</td>
            <td>Pattern</td>
            <td>Time</td>
            <td>Time between</td>
            <td>Prefire</td>
          </tr>

          {fixtures.map((f, i) =>
            <tr key={f.id + "table"}
              className="headerTableCues-active"
            >
              <td>{i}</td>
              <td style={{fontSize: '0.7rem'}}>{f.name}</td>
              <td>
                {/*<img style={pattern.color ? {filter: `drop-shadow(0 0 5px ${pattern.color})`}: {}} src={action.img} alt=""/>*/}
              </td>
              <td>{f && f.number}</td>
              <td className="lineDecorate"/>
            </tr>
          )}
          </tbody>
        </table>


      </div>
    </React.Fragment>
  );
};

export default connect(null, null)(Output);
