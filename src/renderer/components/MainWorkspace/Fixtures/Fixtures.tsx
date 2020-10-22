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


const Fixtures: React.FC<IProps> = ({ fixtures, updateFixture, createNewCue, fixtureTypes, initDevices, selectFixturesGroup }) => {
    const createNewCueCallback = (time: number) => {
        createNewCue(fixtures.filter(f => f.selected && f.activePattern), null, time)
    };

    const mockStrings = (name: string, q: number) => {
        let res = [];
        for (let i = q; i > 0;  i--) {
            res.push(`${name} #${i}`)
        }
        return res;
    };

    const onInitDevices = (dev: IFixture) => {
        initDevices(fixtures.map(f => f.id === dev.id ? dev : f))
    };

    return (
        <div className="WrapFixtures">
            <div className="WrapFixturesScroll">
                {fixtureTypes.map(t =>
                    t === "fireMachine" ? <React.Fragment key={t}>
                        <Accordeon headerTitle={"Crazy Flame Mod 1"}>
                            <div className="fixtures">
                                {fixtures.map(f => {
                                    return (
                                        <FixtureItem key={f.id}
                                                     fixture={f}
                                                     update={updateFixture}
                                                     onInitDevices={onInitDevices}
                                                     createNewCueCallback={createNewCueCallback}/>
                                    );
                                })}
                            </div>
                            <div className={'positionPach'}>
                                <div className={'positionPachItem'} onClick={() => selectFixturesGroup('all')}>
                                    <div className={'PachItemOne'}>{fixtures.length}</div>
                                    <div className={'PachItemTwo'}>Все</div>
                                    <div className={'PachItemThree'}>{fixtures.length}</div>
                                </div>
                                <div className={'positionPachItem'} onClick={() => selectFixturesGroup('odd')}>
                                    <div className={'PachItemOne'}>{fixtures.length}</div>
                                    <div className={'PachItemTwo'}>Чётные</div>
                                    <div className={'PachItemThree'}>{fixtures.length / 2}</div>
                                </div>
                                <div className={'positionPachItem'} onClick={() => selectFixturesGroup('even')}>
                                    <div className={'PachItemOne'}>{fixtures.length}</div>
                                    <div className={'PachItemTwo'}>Нечётные</div>
                                    <div className={'PachItemThree'}>{fixtures.length / 2}</div>
                                </div>
                                <div className={'positionPachItem'} onClick={() => selectFixturesGroup('left')}>
                                    <div className={'PachItemOne'}>{fixtures.length}</div>
                                    <div className={'PachItemTwo'}>Левые</div>
                                    <div className={'PachItemThree'}>{fixtures.length / 2}</div>
                                </div>
                                <div className={'positionPachItem'} onClick={() => selectFixturesGroup('right')}>
                                    <div className={'PachItemOne'}>{fixtures.length}</div>
                                    <div className={'PachItemTwo'}>Правые</div>
                                    <div className={'PachItemThree'}>{fixtures.length / 2}</div>
                                </div>
                            </div>
                        </Accordeon>
                    </React.Fragment> : ''
                )}
                <Accordeon headerTitle={"Flame Jet"}>
                <div className="column" style={{marginTop: '25px'}}>
                        {mockStrings("Flame Jet", 5).map((s, i) =>
                            <div key={s}  className={'positionPachItem'}>
                                <div className={'PachItemOne'}>{i + 1}</div>
                                <div className={'PachItemTwo'}>{s}</div>
                            </div>
                        )}
                        </div>
                                    </Accordeon>
                <Accordeon headerTitle={"Switch"}>
                    <div className="column" style={{marginTop: '25px'}}>
                        {mockStrings("Switch", 5).map((s, i) =>
                            <div key={s}  className={'positionPachItem'}>
                                <div className={'PachItemOne'}>{i + 1}</div>
                                <div className={'PachItemTwo'}>{s}</div>
                            </div>
                        )}
                    </div>
                </Accordeon>
                <Accordeon headerTitle={"Piro Block"}>
                    <div className="column" style={{marginTop: '25px'}}>
                        {mockStrings("Switch", 5).map((s, i) =>
                                <div key={s}  className={'positionPachItem'}>
                                    <div className={'PachItemOne'}>{i + 1}</div>
                                    <div className={'PachItemTwo'}>{s}</div>
                                </div>
                        )}
                    </div>
                </Accordeon>
                
            </div>
            <div className={"FixturesControlsWrapper"}>                
                <div className={"FixturesRowBtn"}>
                    <button>Add Device</button>
                    <button>Add Group</button>
                    <button>Delete Selected</button>
                </div>
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
