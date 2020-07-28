import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getFixtureGroups, getFixtures, getFixturesTypes } from '../../../store/fixturesReducer/fixturesSelector';
import { IFixture, IFixturesGroup, TFixturesTypes } from '../../../../types/fixtureTypes';
import FixtureItem from './FixtureItem';
import { updateFixture } from '../../../store/fixturesReducer/fixturesActions';
import { IField } from '../../../../types/fieldsTypes';
import { createNewCue, initDevices } from '../../../store/cuesReducer/cuesActions';
import Accordeon from '../../common/Accordeon/Accordeon';
import { generateMockFixtures } from '../../../store/mockDataGenerators';

require('./FixtureItem.scss');

interface IProps {
    fixtures: IFixture[],
    groups: IFixturesGroup[],
    fixtureTypes: TFixturesTypes[],
    createNewCue: (fixtures: IFixture[], field: IField | null, startTime?: number) => void
    updateFixture: (fixture: IFixture) => void
    initDevices: (fixtures: IFixture[]) => void
}


const Fixtures: React.FC<IProps> = ({ fixtures, groups, updateFixture, createNewCue, fixtureTypes, initDevices }) => {
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
                                <div className={'positionPachItem'}>
                                    <div className={'PachItemOne'}>12</div>
                                    <div className={'PachItemTwo'}>Все</div>
                                    <div className={'PachItemThree'}>12</div>
                                </div>
                                <div className={'positionPachItem'}>
                                    <div className={'PachItemOne'}>12</div>
                                    <div className={'PachItemTwo'}>Чётные</div>
                                    <div className={'PachItemThree'}>6</div>
                                </div>
                                <div className={'positionPachItem'}>
                                    <div className={'PachItemOne'}>11</div>
                                    <div className={'PachItemTwo'}>Нечётные</div>
                                    <div className={'PachItemThree'}>6</div>
                                </div>
                                <div className={'positionPachItem'}>
                                    <div className={'PachItemOne'}>11</div>
                                    <div className={'PachItemTwo'}>Левые</div>
                                    <div className={'PachItemThree'}>6</div>
                                </div>
                                <div className={'positionPachItem'}>
                                    <div className={'PachItemOne'}>11</div>
                                    <div className={'PachItemTwo'}>Правые</div>
                                    <div className={'PachItemThree'}>6</div>
                                </div>
                            </div>
                        </Accordeon>
                    </React.Fragment> : ''
                )}
                <Accordeon headerTitle={"Flame Jet"}>
                    <div className="fixtures">
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

        </div>

    );
};

const mapStateToProps = (state: RootState) => ({
    fixtures: getFixtures(state),
    groups: getFixtureGroups(state),
    fixtureTypes: getFixturesTypes(state)
});


export default connect(mapStateToProps, { updateFixture, createNewCue, initDevices })(Fixtures);
