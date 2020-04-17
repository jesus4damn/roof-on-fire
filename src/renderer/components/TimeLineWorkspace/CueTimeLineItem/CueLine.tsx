import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import { Rnd } from 'react-rnd';
import { ReactElement } from 'react';

require('./CueLine.scss');

interface IProps {
    cueItem: ICue,
    selected: ICue | null,
    index: number,
    mousePosition: { x: number, y: number },
    select: () => void
}

const CueTimeLineItem: React.FC<IProps> = ({ cueItem, selected, select, mousePosition }) => {
    const isOpen = selected && selected.id === cueItem.id;
    const [cueState, setState] = React.useState(
        {
            width: selected && selected.endTime ? selected.startTime + selected.endTime : 100,
            height: isOpen ? 8 : 45,
            x: selected && selected.startTime ? selected.startTime : 1,
            y: 10
        }
    );
    const [isDragging, setIsDragging] = React.useState(false);


    const minus = () => {

    };

    return (
        <Rnd
            className={'timelineCue'}
            onClick={() => {select()}}
            default={{
                x: cueState.x,
                y: cueState.y,
                width: cueState.width,
                height: cueState.height
            }}
            resizeHandleComponent={{topRight : <span>O</span>}}
            size={{ width: cueState.width,  height: cueState.height }}
            position={{ x: cueState.x, y: cueState.y }}
            onDragStop={(e, d) => { setState({...cueState, x: d.x, y: d.y }) }}
            onResize={(e, direction, ref, delta, position) => {
                setState({
                    width: ref.offsetWidth,
                    height: 45,
                    ...position
                });
            }}
        >
            <div>
                {isOpen
                    ? <React.Fragment>
                        <span>{cueItem.name}</span>
                        <span onClick={minus}>{cueItem.startTime}{isDragging ? '' : '=>>'}{cueItem.endTime}</span>
                        {cueItem.actions.map(a => <span key={a.id} className={'timelineCue-triangle'}> </span>)}
                    </React.Fragment>
                    : null}
            </div>
        </Rnd>
    );
};

export default CueTimeLineItem;

const HandleComponent: ReactElement = <span className={'actionMarker'} >O</span>;
