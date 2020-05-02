import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import { Rnd } from 'react-rnd';
import { ReactElement, useCallback, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../../store/cuesReducer/cuesSelector';
import { setSelectedCue, updateCue } from '../../../store/cuesReducer/cuesActions';

require('./CueLine.scss');
export type Enable = {
    bottom?: boolean;
    bottomLeft?: boolean;
    bottomRight?: boolean;
    left?: boolean;
    right?: boolean;
    top?: boolean;
    topLeft?: boolean;
    topRight?: boolean;
}

interface IProps {
    cueItem: ICue,
    selectedCue: ICue | null,
    index: number,
    zoom: number,
    setSelectedCue: (cue: ICue) => void
    updateCue: (cue: ICue) => void
}

const CueTimeLineItem: React.FC<IProps> = ({ cueItem, selectedCue, setSelectedCue, zoom, index, updateCue }) => {
    const [cueState, setState] = React.useState(
        {
            isOpen: false,
            width: cueItem.endTime ? (cueItem.endTime - cueItem.startTime) * zoom : 100,
            height: 8,
            x: selectedCue && selectedCue.startTime ? selectedCue.startTime * zoom : 1,
            y: 40 + (index * 15),
        }
    );
    const calculatePosition = useCallback(() => {
        setState({
            ...cueState,
            width: cueItem.endTime ? (cueItem.endTime - cueItem.startTime) * zoom : 100,
            x: cueItem.startTime * zoom,
        })
    }, [zoom]);

    useEffect(() => {
        // setState({
        //     ...cueState,
        //     width: cueItem.endTime ? (cueItem.endTime - cueItem.startTime) * zoom : 100,
        //     x: cueItem.startTime * zoom,
        // })
        calculatePosition();
    }, [zoom]);

    useEffect(() => {
        let isOpen = selectedCue && selectedCue.id === cueItem.id ? true : false;
        setState({
            ...cueState,
            isOpen: isOpen,
            height: isOpen ? 40 : 8,
        })
    }, [selectedCue]);

    const minus = () => {

    };

    const onDragStop = (e: any, d: any) => {
        setState({...cueState, x: d.x, y: d.y });
        updateCue({
            ...cueItem,
            startTime: d.x / zoom,
            endTime: (d.x + cueState.width) / zoom
        });
    };
    const onResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
        setState({
            ...cueState,
            width: ref.offsetWidth,
            ...position
        });
    };

    const onResizeEnd = () => {
        updateCue({
            ...cueItem,
            endTime: (cueState.x + cueState.width) / zoom
        })
    };

    const onSelect = () => {
        setSelectedCue(cueItem);
    };

    return (
        <Rnd
            className={'timelineCue'}
            onDoubleClick={onSelect}
            default={{
                x: cueState.x,
                y: cueState.y,
                width: cueState.width,
                height: cueState.height,
            }}
            onResizeStop={onResizeEnd}
            //dragAxis={'x'}
            bounds={".cursorContainer"}
            enableResizing={{
                top:false,
                right: cueState.isOpen,
                bottom:false, left:false,
                topRight:false, bottomRight:false, bottomLeft:false, topLeft:false
            }}
            resizeHandleComponent={{topRight : <span>O</span>}}
            size={{ width: cueState.width,  height: cueState.height }}
            position={{ x: cueState.x, y: cueState.y }}
            onDragStop={onDragStop}
            onResize={onResize}
        >
            <div>
                {cueState.isOpen
                    ? <React.Fragment>
                        <span>{cueItem.startTime} ===> </span>
                        <span>{cueItem.endTime}</span>
                        {/*<span onClick={minus}>{cueItem.startTime}{isDragging ? '' : '=>>'}{cueItem.endTime}</span>*/}
                        {cueItem.actions.map(a => <span key={a.id} className={'timelineCue-triangle'}> </span>)}
                    </React.Fragment>
                    : null}
            </div>
        </Rnd>
    );
};

const mapStateToProps = (state: RootState) => ({
    selectedCue: getSelectedCue(state),
});

export default connect(mapStateToProps, {setSelectedCue, updateCue })(CueTimeLineItem);

const HandleComponent: ReactElement = <span className={'actionMarker'} >O</span>;
