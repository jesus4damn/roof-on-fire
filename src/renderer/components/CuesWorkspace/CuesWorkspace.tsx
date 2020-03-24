import * as React from 'react';
import {RootState} from "../../store/rootReducer";
import { switchActionsScreenAction } from "../../store/appReducer/appActions";
import {connect} from "react-redux";
import {IActionsScreenSwitchers } from "../../../types/appTypes";
import Properties from "./Properties/Properties";
import Cues from "./Cues/Cues";

require('./CuesWorkspace.scss');

export interface IProps {
    actionsScreenSwitcher: IActionsScreenSwitchers,
    switchActionsScreenAction: (val: IActionsScreenSwitchers) => void
}

const CuesWorkspace: React.FunctionComponent<IProps> = ({actionsScreenSwitcher, switchActionsScreenAction}) => (
    <div className='cuesWrapper'>
        <div className="selectionButtons">
            <button onClick={() => {switchActionsScreenAction('props')}}>
                props
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
                cues
            </button>
        </div>
        <div className="cuesWrapperContent">
            {actionsScreenSwitcher === 'props' && <Properties />}
            {actionsScreenSwitcher === 'cues' && <Cues />}
        </div>
    </div>
);


const mapStateToProps = (state: RootState) => ({
    actionsScreenSwitcher: state.app.actionsScreenSwitcher
});

export default connect(mapStateToProps, { switchActionsScreenAction })(CuesWorkspace);
