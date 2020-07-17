import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import {
    switchFixturePropertiesButtonsScreen,
    switchFixtureTypesButtonsScreen
} from '../../store/appReducer/appActions';
import { IActionsScreenSwitchers } from '../../../types/appTypes';
import Properties from './Patterns/Patterns';
import Cues from './Cues/Cues';
import { getFixturesTypes } from '../../store/fixturesReducer/fixturesSelector';
import { TFixturesTypes } from '../../../types/fixtureTypes';

require('./ButtonsWorkspace.scss');

export interface IProps {
    fixtureTypesScreenWindow: string,
    fixturesPropertiesScreenWindow: IActionsScreenSwitchers,
    fixturesTypes: TFixturesTypes[],
    switchFixturePropertiesButtonsScreen: (val: IActionsScreenSwitchers) => void
    switchFixtureTypesButtonsScreen: (val: string) => void
}

const ButtonsWorkspace: React.FunctionComponent<IProps> = ({
                                                               fixturesTypes,
                                                               fixtureTypesScreenWindow,
                                                               fixturesPropertiesScreenWindow,
                                                               switchFixturePropertiesButtonsScreen,
                                                               switchFixtureTypesButtonsScreen
                                                           }) => {
    return (
            <div className='cuesWrapper'>
                <div className="selectionButtonsSetting">
                    <div className="selectionButtonsTop">
                        {fixturesTypes.length && fixturesTypes.map(ft => {
                            return (
                                <button className={fixtureTypesScreenWindow === ft ? 'activeButtonsTop' : ''}
                                        key={'fixtureTypeButton' + ft}
                                        onClick={() => {
                                            switchFixtureTypesButtonsScreen(ft);
                                        }}>
                                    {ft}
                                </button>
                            );
                        })}
                    </div>
                    <div className="selectionButtonsBottom">
                        <button
                            className={fixturesPropertiesScreenWindow === 'long' ? 'activeButtonsBottom' : ''}
                            onClick={() => {
                                switchFixturePropertiesButtonsScreen('long');
                            }}>
                            Протяжные
                        </button>
                        <button
                            className={fixturesPropertiesScreenWindow === 'dynamic' ? 'activeButtonsBottom' : ''}
                            onClick={() => {
                                switchFixturePropertiesButtonsScreen('dynamic');
                            }}>
                            Динамика
                        </button>
                        <button
                            className={fixturesPropertiesScreenWindow === 'static' ? 'activeButtonsBottom' : ''}
                            onClick={() => {
                                switchFixturePropertiesButtonsScreen('static');
                            }}>
                            Статика
                        </button>
                        <button
                            className={fixturesPropertiesScreenWindow === 'cues' ? 'activeButtonsBottom' : ''}
                            onClick={() => {
                                switchFixturePropertiesButtonsScreen('cues');
                            }}>
                            Мои
                        </button>
                    </div>
                </div>
                <div className="cuesWrapperContentScroll">
                    <div className="cuesWrapperContent">
                        {fixturesPropertiesScreenWindow === 'static' && <Properties/>}
                        {fixturesPropertiesScreenWindow === 'dynamic' && <Properties/>}
                        {fixturesPropertiesScreenWindow === 'long' && <Properties/>}
                        {fixturesPropertiesScreenWindow === 'cues' && <Cues/>}
                    </div>
                </div>
            </div>
    );
};


const mapStateToProps = (state: RootState) => ({
    fixturesPropertiesScreenWindow: state.app.fixturesPropertiesScreenWindow,
    fixtureTypesScreenWindow: state.app.fixtureTypesScreenWindow,
    fixturesTypes: getFixturesTypes(state)
});

export default connect(mapStateToProps, {
    switchFixturePropertiesButtonsScreen,
    switchFixtureTypesButtonsScreen
})(ButtonsWorkspace);
