import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import CueTimeLineItem from './CueLineItem';
import { ICursorPosition } from '../TimeLineContainer';

require('./CueLine.scss');

interface IProps {
    mousePosition: { x: number, y: number },
}

const CueTimeLine: React.FC<IProps & ICursorPosition & any> = ({cues, setSelectedCue, selectedCue, position}) => {

    return (
       <div className={"cueLineContainer"}>
           <span className={'x-y-mousePos'}>{` x = ${position.x} + y${position.y}`}</span>
           {cues.map((c: ICue, i: number) =>
               <CueTimeLineItem
                   select={() => {
                       setSelectedCue(c);
                   }}
                   key={c.id}
                   cueItem={c}
                   selected={selectedCue}
                   index={i}
               />
           )}
           <span>a</span>
       </div>
    );
};


export default CueTimeLine;
