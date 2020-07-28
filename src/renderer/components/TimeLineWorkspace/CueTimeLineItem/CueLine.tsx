import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import CueTimeLineItem from './CueLineItem';
import { ICursorPosition } from '../TimeLineContainer';
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';
import { useEffect, useState } from 'react';

require('./CueLine.scss');

interface IProps {
    position: { x: number, y: number },
    parentDivWidth: number,
    zoom: number,
    cues: ICue[],
    handleZIndexChange: (val: boolean) => void
}

const CueTimeLine: React.FC<IProps & ICursorPosition & any> = ({cues, zoom, position, handleZIndexChange}) => {
    const [{ isOver, canDrop, item }, drop] = useDrop({
        accept: [dragTypes.FIXTURE, dragTypes.CUE_FIELD, dragTypes.PATTERN_FIELD],
        drop: () => {
                return { cueList: 'CUE_TIMELINE', startTime: position.x / zoom }
            },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            item: monitor.getItem()
        }),
    });
    const [visibleOverlay, setVisibleOverlay] = useState<boolean>(false);
    useEffect(() => {
        if (item && item.id) {
            setVisibleOverlay(true);
        } else {
            setVisibleOverlay(false);
        }
    }, [item]);
    return (
       <div
           ref={drop}
           className={"cueLineContainer"}
           style={visibleOverlay ? {zIndex: 81, backgroundColor: isOver && canDrop ? '#3cd07a2e' : !canDrop ? '#be494969' : ''} : {}}
       >
           <span className={'x-y-mousePos'}>{` x = ${position.x} + y${position.y}`}</span>
           {cues.map((c: ICue, i: number) =>
               <CueTimeLineItem
                   key={c.id}
                   zoom={zoom}
                   cueItem={c}
                   index={i}
               />
           )}
           <span>a</span>
       </div>
    );
};


export default CueTimeLine;
