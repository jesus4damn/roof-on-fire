import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getFixtureGroups, getFixtures } from '../../../store/fixturesReducer/fixturesSelector';
import { IFixture, IFixturesGroup } from '../../../../types/fixtureTypes';
import FixtureItem from './FixtureItem';
import { updateFixture } from '../../../store/fixturesReducer/fixturesActions';
import { IField } from '../../../../types/fieldsTypes';
import { createNewCue } from '../../../store/cuesReducer/cuesActions';

require('./FixtureItem.scss');

interface IProps {
    fixtures: IFixture[],
    groups: IFixturesGroup[],
    createNewCue: (fixtures: IFixture[], field: IField | null, startTime?: number) => void
    updateFixture: (fixture: IFixture) => void
}


const Fixtures: React.FC<IProps> = ({ fixtures, groups, updateFixture, createNewCue }) => {
    const [collapsed, setCollapsed] = React.useState(false);

    const createNewCueCallback = (time: number) => {
        createNewCue(fixtures.filter(f => f.selected && f.activePattern), null, time)
    };

    return (
        <div className="WrapFixtures">
            <div className="WrapFixturesScroll">
                <div className="FrameAccordion">
                    <h2>
                        Crazy Flame Mod 1
                    </h2>
                    <span className={collapsed ? 'FrameAccordionImg-collapsed ' : 'FrameAccordionImg'}
                          onClick={() => setCollapsed(!collapsed)}></span>
                    <div className={collapsed ? 'AccordionBottom-collapsed ' : 'AccordionBottom'}>
                        <div className="fixtures">

                            {fixtures.map(f => {
                                return (
                                    <FixtureItem key={f.id} fixture={f} update={updateFixture}
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
                    </div>
                </div>
                <div className="FrameAccordionBottom">
                    <h2>
                        Flame Jet
                    </h2>
                    <span className="FrameAccordionImg">+</span>
                </div>
                <div className="FrameAccordionBottom">
                    <h2>
                        Switch
                    </h2>
                    <span className="FrameAccordionImg">+</span>
                </div>
                <div className="FrameAccordionBottom">
                    <h2>
                        Piro Block
                    </h2>
                    <span className="FrameAccordionImg">+</span>
                </div>
            </div>

        </div>

    );
};

const mapStateToProps = (state: RootState) => ({
    fixtures: getFixtures(state),
    groups: getFixtureGroups(state)
});


export default connect(mapStateToProps, { updateFixture, createNewCue })(Fixtures);
