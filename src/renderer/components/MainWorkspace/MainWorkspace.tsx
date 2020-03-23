import * as React from 'react';
import { RootState } from '../../store/rootReducer';
import { switchMainScreenAction } from '../../store/appReducer/appActions';
import { connect } from 'react-redux';
import { IMainScreenSwitchers } from '../../../types/appTypes';
import CounterContainer from './Counter/CounterContainer';
import Fixtures from './Fixtures/Fixtures';

require('./MainWorkspace.scss');

export interface IProps {
    mainScreenSwitcher: IMainScreenSwitchers,
    switchMainScreenAction: (val: IMainScreenSwitchers) => void
}

const MainWorkspace: React.FunctionComponent<IProps> = ({ mainScreenSwitcher, switchMainScreenAction }) => (
    <div className='mainWorkspaceContent'>
        <div className="navGroup">
            <button id="increment" onClick={() => {
                switchMainScreenAction('visualiser');
            }}>
                visualiser
            </button>
            <button id="decrement" onClick={() => {
                switchMainScreenAction('program');
            }}>
                program
            </button>
        </div>
        <div className="workspaceContent">
            <h2>MAIN SCREEN</h2>
            {mainScreenSwitcher === 'visualiser' && <CounterContainer/>}
            {mainScreenSwitcher === 'program' && <Fixtures/>}
        </div>
    </div>
);


const mapStateToProps = (state: RootState) => ({
    mainScreenSwitcher: state.app.mainScreenSwitcher
});

export default connect(mapStateToProps, { switchMainScreenAction })(MainWorkspace);
