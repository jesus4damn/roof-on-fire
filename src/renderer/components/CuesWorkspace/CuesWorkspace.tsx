import * as React from 'react';
import {RootState} from "../../store/rootReducer";
import { switchActionsScreenAction } from "../../store/appReducer/appActions";
import {connect} from "react-redux";
import {I_ActionsScreenSwitchers } from "../../../types/appTypes";
import Properties from "./Properties/Properties";
import Cues from "./Cues/Cues";

require('./CuesWorkspace.scss');

export interface I_Props {
    actionsScreenSwitcher: I_ActionsScreenSwitchers,
    switchActionsScreenAction: (val: I_ActionsScreenSwitchers) => void
}

const CuesWorkspace: React.FunctionComponent<I_Props> = ({actionsScreenSwitcher, switchActionsScreenAction}) => (
    <div className={'cuesWrapper'}>
        <div>
            <button onClick={() => {switchActionsScreenAction('props')}}>
                props
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
                cues
            </button>
        </div>
       <h2>MAIN SCREEN</h2>
        {actionsScreenSwitcher === 'props' && <Properties />}
        {actionsScreenSwitcher === 'cues' && <Cues />}
    </div>
);


const mapStateToProps = (state: RootState) => ({
    actionsScreenSwitcher: state.app.actionsScreenSwitcher
});

export default connect(mapStateToProps, { switchActionsScreenAction })(CuesWorkspace);
