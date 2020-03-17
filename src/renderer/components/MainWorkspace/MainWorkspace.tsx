import * as React from 'react';
import {RootState} from "../../store/rootReducer";
import { switchMainScreenAction} from "../../store/appReducer/appActions";
import {connect} from "react-redux";
import {I_MainScreenSwitchers} from "../../../types/appTypes";
import CounterContainer from "./Counter/CounterContainer";
import Fixtures from "./Fixtures/Fixtures";

require('./MainWorkspace.scss');

export interface I_Props {
    mainScreenSwitcher: I_MainScreenSwitchers,
    switchMainScreenAction: (val: I_MainScreenSwitchers) => void
}

const MainWorkspace: React.FunctionComponent<I_Props> = ({mainScreenSwitcher, switchMainScreenAction}) => (
    <div className={'mainWorkspace'}>
        <div>
            <button id="increment" onClick={() => {switchMainScreenAction('visualiser')}}>
                visualiser
            </button>
            <button id="decrement" onClick={() => {switchMainScreenAction('program')}}>
                program
            </button>
        </div>
       <h2>MAIN SCREEN</h2>
        {mainScreenSwitcher === 'visualiser' && <CounterContainer />}
        {mainScreenSwitcher === 'program' && <Fixtures />}
    </div>
);


const mapStateToProps = (state: RootState) => ({
    mainScreenSwitcher: state.app.mainScreenSwitcher
});

export default connect(mapStateToProps, { switchMainScreenAction })(MainWorkspace);
