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
// const style = {    
//     gridTemplateColumns: "1fr 1fr 1fr"
    
//   };
export interface StandardComponentProps {
    title?: string
    children: React.ReactNode
  }
  
  export function StandardComponent({
    children,
    title = 'Dr.',
  }: StandardComponentProps) {
    return (
      <div>
        {title}: {children}
      </div>
    )
  }

const ButtonsWorkspace: React.FunctionComponent<IProps> = ({
                                                            fixturesTypes,
                                                            fixtureTypesScreenWindow,
                                                            fixturesPropertiesScreenWindow,
                                                            switchFixturePropertiesButtonsScreen,
                                                            switchFixtureTypesButtonsScreen
                                                        }) => {
// const screenW = React.createRef();
// const [cuesResize, setState] = React.useState(
//     {
//             isOpen: false,
//             x:0,
//             y:0,
//             width: 465,
//             height: 532        
//         }
//     );
    const Box = () => (
        <div className='cuesWrapper'>
        <div className="selectionButtonsSetting">
            <div className="selectionButtonsTop">
                {fixturesTypes.length && fixturesTypes.map(ft => {
                    return ft === "fireMachine" ? (
                        <button className={fixtureTypesScreenWindow === ft ? 'activeButtonsTop' : ''}
                                key={'fixtureTypeButton' + ft}
                                onClick={() => {
                                    switchFixtureTypesButtonsScreen(ft);
                                }}>
                            {ft}
                        </button>
                    ) : null;
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
                    className={fixturesPropertiesScreenWindow === 'all' ? "activeButtonsBottom" : ''}
                    onClick={() => {
                    switchFixturePropertiesButtonsScreen('all');
                }}>
                    Bce
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
                {fixturesPropertiesScreenWindow !== 'cues' && <Properties patternsType={fixturesPropertiesScreenWindow} />}
                {fixturesPropertiesScreenWindow === 'cues' && <Cues />}
            </div>
        </div>

    </div>
    );
                                                                          
    return (
    //     <Rnd
    //     className={'cuesWrapperContentScroll'}
    //         // onDoubleClick={onSelect}
    //         // style={style}
    //         disableDragging={'false'}
    //         default={{
    //             x: cuesResize.x,
    //             y: cuesResize.y,
    //             width: cuesResize.width,
    //             height: cuesResize.height
    //         }}
    //         enableResizing={{
    //             top:false,
    //             right: false,
    //             bottom:false, left:true,
    //             topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
    //         }}
    //         minWidth={270}
    //         maxWidth={780}            
    //         bounds="body"
    //         // size={{ width: cuesResize.width, height: cuesResize.height }}
    //         // position={{ x: cuesResize.x, y: cuesResize.y }}
    //         // onResizeStop={onResizeEnd}            
    //         // enableUserSelectHack='false'
    //         // disableDragging={'false'}
    //         // resizeGrid?:[]
    //         // bounds={".cursorContainer"}
           
    //         // resizeHandleComponent={{topRight : <span>O</span>}}
            
    //         // position={{ x: cueState.x, y: cueState.y }}
    //         // onDragStop={onDragStop}
    //         // onResize={onResize}
    //         >
    //    {/* <console className="log">{screenW}</console> */}
        <Box />
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
