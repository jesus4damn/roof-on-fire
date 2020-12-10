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
    leftOffset: number
}

const CueTimeLine: React.FC<IProps & ICursorPosition & any> = React.memo(({cues, zoom, position, leftOffset}) => {
    const [{ isOver, canDrop, item, offs }, drop] = useDrop({
        accept: [dragTypes.FIXTURE, dragTypes.CUE_FIELD, dragTypes.PATTERN_FIELD],
        drop: () => {
                return { cueList: 'CUE_TIMELINE', startTime: times }
            },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop(),
            item: monitor.getItem(),
            offs: monitor.getSourceClientOffset()
        }),
    });
    const [times, setTimes] = useState(0);

    useEffect(() => {
        if (item && offs) {
            setTimes(offs && offs.x ? (offs.x + leftOffset) / zoom  : 3)
        } else {
            setTimes(0)
        }

    }, [offs, item]);
    const calculateI = (i: number):number => {
        let x = 0;
        if (i / 8 === 0) {
            return 0
        }
        if (i / 8 > 1) {
            x = Math.floor(i/8)
        }
        return x > 0 ? i - (x * 8) : i
    }

    return (
       <div
           ref={drop}
           className={"cueLineContainer"}
           style={canDrop ? {zIndex: 81, backgroundColor: canDrop ? '#3cd07a2e' : !canDrop ? '#be494969' : ''} : {}}
       >
           <span className={'x-y-mousePos'}>{position && ` x = ${position.x} + y${position.y}`}</span>
           {cues.map((c: ICue, i: number) => (
               <CueTimeLineItem
                   key={c.id}
                   zoom={zoom}
                   cueId={c.id}
                   index={calculateI(i)}
               />
           ))}
           <span>a</span>
       </div>
    );
});


export default CueTimeLine;
