import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import { Rnd } from 'react-rnd';
import { ReactElement } from 'react';

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
    selected: ICue | null,
    index: number,
    select: () => void
}

const CueTimeLineItem: React.FC<IProps> = ({ cueItem, selected, select }) => {
    const isOpen = selected && selected.id === cueItem.id;
    const [cueState, setState] = React.useState(
        {
            width: selected && selected.endTime ? selected.startTime + selected.endTime : 100,
            height: isOpen ? 8 : 45,
            x: selected && selected.startTime ? selected.startTime : 1,
            y: 40,
        }
    );
    const [isDragging, setIsDragging] = React.useState(false);


    const minus = () => {

    };

    const onDragStop = (e: any, d: any) => {
        console.log(e);
        console.log(d);

        setState({...cueState, x: d.x, y: d.y })
    };
    const onResize = (e: any, direction: any, ref: any, delta: any, position: any) => {
        console.log(e);
        console.log(direction);
        console.log(delta);
        console.log(position);
        setState({
            width: ref.offsetWidth,
            height: isOpen ? 45 : 8,
            ...position
        });
    };
    return (
        <Rnd
            className={'timelineCue'}
            onClick={() => {select()}}
            default={{
                x: cueState.x,
                y: cueState.y,
                width: cueState.width,
                height: cueState.height,
            }}
            //dragAxis={'x'}
            bounds={".cursorContainer"}
            enableResizing={{ top:false, right:true, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false }}
            resizeHandleComponent={{topRight : <span>O</span>}}
            size={{ width: cueState.width,  height: cueState.height }}
            position={{ x: cueState.x, y: cueState.y }}
            onDragStop={onDragStop}
            onResize={onResize}
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
