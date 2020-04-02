import * as React from 'react';
import { RootState } from '../../store/rootReducer';
import { switchMainRightPartAction, switchMainScreenAction } from '../../store/appReducer/appActions';
import { connect } from 'react-redux';
import { IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';
import Visualizer from './Visualizer/VisualizerContainer';
import Fixtures from './Fixtures/Fixtures';
import CueList from './CueList/CueList';
import Cues from './Cues/Cues';

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
            <button onClick={() => {
                switchMainScreenAction('visualiser') ;             
                                  
                 
            }}>
                Визуализация
            </button>
            <button onClick={() => {
                switchMainScreenAction('cueListWindow');
            }}>
                Список Кью
            </button>
            </div>

                <div className="navGroupButton">
                    <button onClick={() => {
                        switchMainRightPartAction('fixtures');
                    }}>
                        Список Приборов
                    </button>
                    <button onClick={() => {
                        switchMainRightPartAction('cuesWindow');
                    }}>
                        Все Кью
                    </button>
                </div>
            </div>
           
        <div className="workspaceContent">
            <div className="workspaceContainer">
                {mainLeftScreenSwitcher === 'visualiser' && <Visualizer/>}
                {mainLeftScreenSwitcher === 'cueListWindow' && <CueList/>}
            </div>
            {mainRightScreenSwitcher && <div  className="workspaceContainer" style={{borderLeft: '1px solid grey'}}>
                {mainRightScreenSwitcher === 'fixtures' && <Fixtures/>}
                {mainRightScreenSwitcher === 'cuesWindow' && <Cues/>}
            </div>}
        </div>
    </div>
)};

const mapStateToProps = (state: RootState) => ({
    mainLeftScreenSwitcher: state.app.mainLeftScreenSwitcher,
    mainRightScreenSwitcher: state.app.mainRightScreenSwitcher,
});

export default connect(mapStateToProps, { switchMainScreenAction, switchMainRightPartAction })(MainWorkspace);
