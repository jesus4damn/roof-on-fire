import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getFixtureGroups, getFixtures, getFixturesTypes } from '../../../store/fixturesReducer/fixturesSelector';
import { IFixture, IFixturesGroup, TFixturesGroups, TFixturesTypes } from '../../../../types/fixtureTypes';
import FixtureItem from './FixtureItem';
import { selectFixturesGroup, updateFixture } from '../../../store/fixturesReducer/fixturesActions';
import { IField } from '../../../../types/fieldsTypes';
import { createNewCue, initDevices } from '../../../store/cuesReducer/cuesActions';
import Accordeon from '../../common/Accordeon/Accordeon';

require('./FixtureItem.scss');

interface IProps {
  fixtures: IFixture[],
  groups: IFixturesGroup[],
  fixtureTypes: TFixturesTypes[],
  createNewCue: (fixtures: IFixture[], field: IField | null, startTime?: number) => void
  updateFixture: (fixture: IFixture) => void
  initDevices: (fixtures: IFixture[]) => void
  selectFixturesGroup: (group: TFixturesGroups) => void
}


const Fixtures: React.FC<IProps> = ({ fixtures,
                                      updateFixture,
                                      createNewCue,
                                      fixtureTypes,
                                      initDevices,
                                      groups,
                                      selectFixturesGroup,
                                    }) => {
  const createNewCueCallback = (time: number) => {
    createNewCue(fixtures.filter(f => f.selected && f.activePattern), null, time);
  };

  const onInitDevices = (dev: IFixture) => {
    initDevices(fixtures.map(f => f.id === dev.id ? dev : f));
  };

  console.log(groups)

  return (
    <div className="WrapFixtures">
      <div className="WrapFixturesScroll">
        {fixtureTypes.map(t =>
          t === 'fireMachine' ? <React.Fragment key={t}>
            <Accordeon headerTitle={'Crazy Flame Mod 1'} expanded={true}>
              <div className="fixtures">
                {fixtures.map(f => {
                  return (
                    <FixtureItem key={f.id}
                                 fixture={f}
                                 update={updateFixture}
                                 onInitDevices={onInitDevices}
                                 createNewCueCallback={createNewCueCallback} />
                  );
                })}
              </div>
              <div className={'positionPach'}>
                {groups.map(gr => <div
                  className='positionPachItem'
                  onClick={() => selectFixturesGroup(gr.id)}
                  style={{color: gr.selected ?  '#27ae60' : ''}}
                >
                  <div className={'PachItemOne'}>{fixtures.length}</div>
                  <div className={'PachItemTwo'}>{
                    gr.id === 'all' ? 'Все' : gr.id === 'left' ? 'Левые'
                      : gr.id ===  'right' ? 'Правые' : gr.id ===  'odd' ? 'Чётные' : 'Нечётные'
                  }</div>
                  <div className={'PachItemThree'}>{gr.fixturesIds.length}</div>
                </div>)}
              </div>
            </Accordeon>
          </React.Fragment> : ''
        )}
        {/*<Accordeon headerTitle={"Flame Jet"} disabled={true}>*/}
        {/*<div className="column" style={{marginTop: '25px'}}>*/}
        {/*        {mockStrings("Flame Jet", 5).map((s, i) =>*/}
        {/*            <div key={s}  className={'positionPachItem'}>*/}
        {/*                <div className={'PachItemOne'}>{i + 1}</div>*/}
        {/*                <div className={'PachItemTwo'}>{s}</div>*/}
        {/*            </div>*/}
        {/*        )}*/}
        {/*</div>*/}
        {/*</Accordeon>*/}
      </div>
    </div>

  );
};

const mapStateToProps = (state: RootState) => ({
  fixtures: getFixtures(state),
  groups: getFixtureGroups(state),
  fixtureTypes: getFixturesTypes(state)
});


export default connect(mapStateToProps, { updateFixture, createNewCue, initDevices, selectFixturesGroup })(Fixtures);
