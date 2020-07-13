import * as React from 'react';
import { Rnd } from 'react-rnd';
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
// const [cueState, setState] = React.useState(
//         {
//             isOpen: false,
//             width: cueItem.endTime ? (cueItem.endTime - cueItem.startTime) * zoom : 100,
//             height: 8,
//             x: selectedCue && selectedCue.startTime ? selectedCue.startTime * zoom : 1,
//             y: 40 + (index * 15),
//         }
//     );
const ButtonsWorkspace: React.FunctionComponent<IProps> = ({
                                                            fixturesTypes,
                                                            fixtureTypesScreenWindow,
                                                            fixturesPropertiesScreenWindow,
                                                            switchFixturePropertiesButtonsScreen,
                                                            switchFixtureTypesButtonsScreen
                                                        }) => {

    return (
        // <Rnd
        // className={'cuesWrapperContentScroll'}
        //     // onDoubleClick={onSelect}
        //     default={{
        //         x:0,
        //         y:0,
        //         width: 385,
        //         height: 532,
                
        //     }}
        //     // onResizeStop={onResizeEnd}            
        //     enableUserSelectHack='false'
        //     disableDragging={'false'}
        //     // resizeGrid?:[]
        //     // bounds={".cursorContainer"}
        //     // enableResizing={{
        //     //     top:false,
        //     //     right: globalThis.isOpen,
        //     //     bottom:false, left:false,
        //     //     topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
        //     // }}
        //     // resizeHandleComponent={{topRight : <span>O</span>}}
        //     // size={{ width: this.state.width,  height: cueState.height }}
        //     // position={{ x: cueState.x, y: cueState.y }}
        //     // onDragStop={onDragStop}
        //     // onResize={onResize}
        //     >
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
                        className={fixturesPropertiesScreenWindow === 'long' ? "activeButtonsBottom" : ''}
                        onClick={() => {
                        switchFixturePropertiesButtonsScreen('long');
                    }}>
                        Протяжные
                    </button>
                    <button
                        className={fixturesPropertiesScreenWindow === 'dynamic' ? "activeButtonsBottom" : ''}
                            onClick={() => {
                        switchFixturePropertiesButtonsScreen('dynamic');
                    }}>
                        Динамика
                    </button>
                    <button
                        className={fixturesPropertiesScreenWindow === 'static' ? "activeButtonsBottom" : ''}
                        onClick={() => {
                        switchFixturePropertiesButtonsScreen('static');
                    }}>
                        Статика
                    </button>
                    <button
                        className={fixturesPropertiesScreenWindow === 'cues' ? "activeButtonsBottom" : ''}
                        onClick={() => {
                        switchFixturePropertiesButtonsScreen('cues');
                    }}>
                        Мои
                    </button>
                </div>
            </div>
            <div className="cuesWrapperContentScroll">
                <div className="cuesWrapperContent">
                    {fixturesPropertiesScreenWindow === 'static' && <Properties />}
                    {fixturesPropertiesScreenWindow === 'dynamic' && <Properties />}
                    {fixturesPropertiesScreenWindow === 'long' && <Properties />}
                    {fixturesPropertiesScreenWindow === 'cues' && <Cues />}
                </div>
            </div>
            
        </div>
        //  </Rnd>
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
