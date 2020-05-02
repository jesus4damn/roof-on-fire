import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import CueTimeLineItem from './CueLineItem';
import { ICursorPosition } from '../TimeLineContainer';

require('./CueLine.scss');

interface IProps {
    position: { x: number, y: number },
    parentDivWidth: number,
    zoom: number,
    cues: ICue[],
}

const CueTimeLine: React.FC<IProps & ICursorPosition & any> = ({cues, zoom, position}) => {

    return (
       <div className={"cueLineContainer"}>
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
