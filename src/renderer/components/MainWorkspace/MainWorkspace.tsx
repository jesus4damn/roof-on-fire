import * as React from 'react';
import { RootState } from '../../store/rootReducer';
import { switchMainRightPartAction, switchMainScreenAction } from '../../store/appReducer/appActions';
import { connect } from 'react-redux';
import { IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';
import Visualizer from './Visualizer/VisualizerContainer';
import Fixtures from './Fixtures/Fixtures';
import CueList from './CueList/CueList';
import Cues from './Cues/CueEditor';

require('./MainWorkspace.scss');

export interface IConnectedProps {
    mainLeftScreenSwitcher: IMainScreenSwitchers,
    mainRightScreenSwitcher: IMainRightScreenSwitchers,
}
export interface IDispatchedProps {
    switchMainScreenAction: (val: IMainScreenSwitchers) => void
    switchMainRightPartAction: (val: IMainRightScreenSwitchers) => void
}

interface IAllProps extends IConnectedProps, IDispatchedProps {}

const MainWorkspace: React.FunctionComponent<IAllProps> = ({
                                                            mainLeftScreenSwitcher,
                                                            mainRightScreenSwitcher,
                                                            switchMainScreenAction,
                                                            switchMainRightPartAction }) => {
    return (
    <div className='mainWorkspaceContent'>
        <div className="navGroup">
        <div className="navGroupButton">
            <button className={mainLeftScreenSwitcher === "visualiser" ? "navGroupButtonActive" : ''}  onClick={() => {
                switchMainScreenAction('visualiser') ;
            }}>
                Визуализация
            </button>
            <button  className={mainLeftScreenSwitcher === "cueListWindow" ? "navGroupButtonActive" : ''} onClick={() => {
                switchMainScreenAction('cueListWindow');
            }}>
                Список Кью
            </button>
            </div>

                <div className="navGroupButton">
                    <button className={mainRightScreenSwitcher === "fixtures" ? "navGroupButtonActive" : ''} onClick={() => {
                        switchMainRightPartAction('fixtures');
                    }}>
                        Список Приборов
                    </button>
                    <button className={mainRightScreenSwitcher === "cuesWindow" ? "navGroupButtonActive" : ''} onClick={() => {
                        switchMainRightPartAction('cuesWindow');
                    }}>
                        Контент Кью
                    </button>
                </div>
            </div>

        <div className="workspaceContent">
            <div className="workspaceContainer" style={{maxWidth: mainRightScreenSwitcher ? '40%' : '100%',width: mainRightScreenSwitcher ? '40%' : '100%'}}>
                {mainLeftScreenSwitcher === 'visualiser' && <Visualizer/>}
                {mainLeftScreenSwitcher === 'cueListWindow' && <CueList />}
            </div>
            {mainRightScreenSwitcher && <div  className="workspaceContainer" style={{maxWidth: '60%',width: '60%'}} >
                {mainRightScreenSwitcher === 'fixtures' && <Fixtures/>}
                {mainRightScreenSwitcher === 'cuesWindow' && <Cues />}
            </div>}
        </div>
    </div>
)};

const mapStateToProps = (state: RootState) => ({
    mainLeftScreenSwitcher: state.app.mainLeftScreenSwitcher,
    mainRightScreenSwitcher: state.app.mainRightScreenSwitcher,
});

export default connect(mapStateToProps, { switchMainScreenAction, switchMainRightPartAction })(MainWorkspace);
