import * as React from 'react';
import { useState, useRef } from 'react';
import { connect, useSelector } from 'react-redux';
import { TFixturesTypes } from '../../../types/fixtureTypes';
import { getFixtures, getFixturesTypes } from '../../store/fixturesReducer/fixturesSelector';
import { RootState } from '../../store/rootReducer';
import OutputRow from './OutputRow';
import { getTimelineCues } from '../../store/cuesReducer/cuesSelector';

require('./Output.scss');

interface IProps {}

const Output: React.FC = () => {
  const { fixturesTypes, fixtures, timeLineCues } = useSelector((state: RootState) => ({
    fixturesTypes: getFixturesTypes(state),
    fixtures: getFixtures(state),
    timeLineCues: getTimelineCues(state)
  }));
  const fixturesRowWrapperRef = useRef<HTMLDivElement>(null);
  const [activeType, setActiveType] = useState<TFixturesTypes>(fixturesTypes[0]);
  const [activeFixture, setActiveFixture] = useState<string>(fixtures[0].id);

  const scrollFixturesBar = (left: boolean) => {
    if (fixturesRowWrapperRef && fixturesRowWrapperRef.current) {
      fixturesRowWrapperRef.current.scrollLeft = left
        ? fixturesRowWrapperRef.current.scrollLeft >= 50
          ? fixturesRowWrapperRef.current.scrollLeft - 50
          : 0
        : fixturesRowWrapperRef.current.scrollLeft + 50;
    }

  };

  ////TODO Vratch design output tables and buttons navigation
  return (
    <React.Fragment>
      <div className="outputCol onePanel">
        <div className="navGroup">
          <div className="navGroupButton">
            {fixturesTypes.filter(ft => ft === 'fireMachine').map(b => (
              <button
                key={b}
                className={activeType === b ? 'navGroupButtonActive' : ''}
                onClick={() => setActiveType(b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>
        <div className="wrapTableCues">
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
              {timeLineCues.map((c, i) =>
                c.actions.map((a, i) => (
                  <tr key={a.id+i}>
                    <OutputRow action={a} index={i} key={a.id} onUpdate={() => {}} />
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="WrapControls">
        <div className="BtnConsole">
          <div className="ControlsItem">
            <span>Button</span>
            <span>-</span>
          </div>
          <div className="ControlsItem">
            <span>Button</span>
            <span>Программа 2</span>
          </div>
          <div className="ControlsItem">
            <span>Button</span>
            <span>-</span>
          </div>
          <div className="ControlsItem">
            <span>Button</span>
            <span>Программа 2</span>
          </div>
          <div className="ControlsItem">
            <span>Button</span>
            <span>-</span>
          </div>
          <div className="ControlsItem">
            <span>Button</span>
            <span>-</span>
          </div>
          <div className="ControlsItem">
            <span>Button</span>
            <span>-</span>
          </div>
        </div>
        <div className="BtnConsoleInteractions">
          <div className="BtnInterItem">
            <button className="ControlsBt">Экспорт .txt</button>
            <button className="ControlsBt">Экспорт .table</button>
          </div>
          <div className="BtnInterItem">
            <button className="ControlsBt">Выгрузить</button>
            <button className="ControlsBt">Загрузить</button>
          </div>
        </div>
      </div>

      <div className="outputCol twoPanel">
        <div className="navGroup">
        <button onClick={() => scrollFixturesBar(true)}>{"<"}</button>
          <div className="navGroupButton" ref={fixturesRowWrapperRef}>
            {fixtures.map(f => (
              <button
                key={f.id + 'tag'}
                className={activeFixture === f.id ? 'navGroupButtonActive' : ''}
                onClick={() => setActiveFixture(f.id)}
              >
                {f.name}
              </button>
            ))}
          </div>
          <button onClick={() => scrollFixturesBar(false)}>{">"}</button>
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

            {fixtures.map((f, i) => (
              <tr key={f.id + 'table'} >
                <td>{i}</td>
                <td style={{ fontSize: '0.7rem' }}>{f.name}</td>
                <td>
                  {/*<img style={pattern.color ? {filter: `drop-shadow(0 0 5px ${pattern.color})`}: {}} src={action.img} alt=""/>*/}
                </td>
                <td>{f && f.number}</td>
                <td className="lineDecorate" />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default connect(null, null)(Output);
