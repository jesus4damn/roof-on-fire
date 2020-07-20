import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import CueTimeLineItem from './CueLineItem';
import { ICursorPosition } from '../TimeLineContainer';
import { useDrop } from 'react-dnd';
import { dragTypes } from '../../../../types/dragTypes';

require('./CueLine.scss');

interface IProps {
    position: { x: number, y: number },
    parentDivWidth: number,
    zoom: number,
    cues: ICue[],
}

const CueTimeLine: React.FC<IProps & ICursorPosition & any> = ({cues, zoom, position}) => {
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: dragTypes.CUE_FIELD,
        drop: () => ({ cueList: 'CUE_TIMELINE', startTime: position.x / zoom }),
        //canDrop: () => onDropPattern(),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
        }),
    });

    return (
       <div ref={drop} className={"cueLineContainer"} style={isOver && canDrop ? {zIndex: 814, backgroundColor: '#3cd07a2e'} : {}}>
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
