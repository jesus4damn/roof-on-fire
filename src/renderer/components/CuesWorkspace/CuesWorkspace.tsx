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
        <div className="selectionButtonsSetting">
            <button onClick={() => {switchActionsScreenAction('props')}}>
            Горелки
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            Фейерверки T1
            </button>
            <button onClick={() => {switchActionsScreenAction('props')}}>
            Фейерверки T2
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            Диммера
            </button>
            <button onClick={() => {switchActionsScreenAction('props')}}>
            Протяжные
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            Динамика
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            Статика
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            Мои
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            +
            </button>
        </div>
        <div className="cuesWrapperContent">
            {actionsScreenSwitcher === 'props' && <Properties />}
            {actionsScreenSwitcher === 'cues' && <Cues />}
        </div>
        <div className="selectionButtons">
            <button onClick={() => {switchActionsScreenAction('props')}}>
            Кью
            </button>
            <button onClick={() => {switchActionsScreenAction('cues')}}>
            Параметры
            </button>
        </div>
    </div>
);


const mapStateToProps = (state: RootState) => ({
    actionsScreenSwitcher: state.app.actionsScreenSwitcher
});

export default connect(mapStateToProps, { switchActionsScreenAction })(CuesWorkspace);
