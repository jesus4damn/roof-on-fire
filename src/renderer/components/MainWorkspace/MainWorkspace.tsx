import * as React from 'react';
import { RootState } from '../../store/rootReducer';
import { switchMainRightPartAction, switchMainScreenAction } from '../../store/appReducer/appActions';
import { connect } from 'react-redux';
import { IMainRightScreenSwitchers, IMainScreenSwitchers } from '../../../types/appTypes';
import VisualizerContainer from './Visualizer/VisualizerContainer';
import Fixtures from './Fixtures/Fixtures';
import CueList from './CueList/CueList';
import Cues from './Cues/Cues';

require('./MainWorkspace.scss');

export interface IProps {
    mainLeftScreenSwitcher: IMainScreenSwitchers,
    mainRightScreenSwitcher: IMainRightScreenSwitchers,
    switchMainScreenAction: (val: IMainScreenSwitchers) => void
    switchMainRightPartAction: (val: IMainRightScreenSwitchers) => void
}

const MainWorkspace: React.FunctionComponent<IProps> = ({
                                                            mainLeftScreenSwitcher,
                                                            mainRightScreenSwitcher,
                                                            switchMainScreenAction,
                                                            switchMainRightPartAction }) => {

    return (
    <div className='mainWorkspaceContent'>
        <div className="navGroup">
            <button onClick={() => {
                switchMainScreenAction('visualiser');
            }}>
                visualiser
            </button>
            <button onClick={() => {
                switchMainScreenAction('cueListWindow');
            }}>
                cueListWindow
            </button>
            <button onClick={() => {
                switchMainRightPartAction('fixtures');
            }}>
                fixtures
            </button>
            <button onClick={() => {
                switchMainRightPartAction('cuesWindow');
            }}>
                cues
            </button>
        </div>
        <div className="workspaceContent">
            <div className="workspaceContainer">
                {mainLeftScreenSwitcher === 'visualiser' && <VisualizerContainer/>}
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
