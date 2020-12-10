import * as React from 'react';
import { ICue, ICueLineCue } from '../../../../types/cuesTypes';
import { Rnd } from 'react-rnd';
import { useCallback, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../../store/rootReducer';
import { getSelectedCue, getTimelineCueById } from '../../../store/cuesReducer/cuesSelector';
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
    cueId: string,
    index: number,
    zoom: number,
}
interface IConnectedProps {
    cueItem: ICueLineCue,
    selectedCue: ICue | null,
    setSelectedCue: (cueId: string) => void
    updateCue: (cue: Partial<ICue>) => void
}

const CueTimeLineItem: React.FC<IProps & IConnectedProps> = ({
                                               cueItem,
                                               selectedCue,
                                               setSelectedCue,
                                               zoom,
                                               index,
                                               updateCue
                                           }) => {
    const [cueState, setState] = React.useState(
        {
            isOpen: false,
            width: cueItem.endTime ? cueItem.endTime - cueItem.startTime < 0.2 ? 80 : (cueItem.endTime - cueItem.startTime) * zoom : 100,
            height: 8,
            x: selectedCue && selectedCue.startTime ? selectedCue.startTime * zoom : 1,
            y: 10 + (index * 15),
        }
    );
    const cueRef = useRef<HTMLDivElement>(null);
    const calculatePosition = useCallback(() => {
        setState({
            ...cueState,
            width: cueItem.endTime ? (cueItem.endTime - cueItem.startTime) * zoom : 100,
            x: cueItem.startTime * zoom,
        })
    }, [zoom, cueItem]);

    useEffect(() => {
        calculatePosition();
    }, [zoom, cueItem]);

    useEffect(() => {
        let isOpen = !!(selectedCue && selectedCue.id === cueItem.id);
        setState({
            ...cueState,
            isOpen: isOpen,
            height: isOpen ? 40 : 8,
        })
    }, [selectedCue]);

    const onDragStop = (e: any, d: any) => {
        setState({...cueState, x: d.x, y: d.y });
        updateCue({
            id: cueItem.id,
            startTime: +(d.x / zoom).toFixed(2),
            endTime: +((d.x + cueState.width) / zoom).toFixed(2)
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
        let part = (cueState.width / zoom) / (cueItem.actions.length -1);
        updateCue({
            id: cueItem.id,
            endTime: +((cueState.x + cueState.width) / zoom).toFixed(2),
            actions: cueItem.actions.map( (a, i) => i === 0 ? {...a, startTime: 0} : {...a, startTime: i * part})
        })
    };

    const onSelect = () => {
        setSelectedCue(cueItem.id);
    };
    useEffect(() => {
        if (cueRef && cueRef.current && selectedCue && selectedCue.id === cueItem.id) {
            cueRef.current.scrollIntoView()
        }
    }, [selectedCue]);

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
            <div ref={cueRef}>
                {cueState.isOpen
                    ? <React.Fragment>
                        <span>{cueItem.startTime.toFixed(2) + '==>'}  </span>
                        <span>{cueItem.endTime.toFixed(2)}</span>
                        {/*<span onClick={minus}>{cueItem.startTime}{isDragging ? '' : '=>>'}{cueItem.endTime}</span>*/}
                        {cueItem.actions.map(a => <span key={a.id} style={{left: `${a.startTime * zoom -5}px`}}
                                                        className={'timelineCue-triangle'}> </span>)}
                    </React.Fragment>
                    : null}
            </div>
        </Rnd>
    );
};

const mapStateToProps = (state: RootState, props: IProps) => ({
    selectedCue: getSelectedCue(state),
    cueItem: getTimelineCueById(state, props.cueId)
});

export default connect(mapStateToProps, {setSelectedCue, updateCue })(CueTimeLineItem);