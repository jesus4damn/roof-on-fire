import * as React from "react";
import { ICue } from '../../../../types/cuesTypes';

require('./CueLine.scss');

interface IProps {
    cueItem: ICue,
    selected: ICue | null,
    index: number,
    mousePosition: {x: number, y: number},
    select: () => void
}

const CueTimeLineItem:React.FC<IProps> = ({cueItem, selected, select}) => {
    const [cueWidth, setCueWidth] = React.useState(100);
    const isOpen = selected && selected.id === cueItem.id;
    const add = () => {
        setCueWidth(cueWidth + 20)
    };
    const minus = () => {
        setCueWidth(cueWidth - 20)
    };

    const classnameForOpen = isOpen ? '' : '';

    return (
        <div className={classnameForOpen} style={{marginLeft: `${cueItem.startTime}px`, width: `${cueWidth}px`}} onClick={select}>
            {isOpen
                ? <div className={'timelineCue'}>
                    {cueItem.name}<span onClick={add}>X</span>
                    <span  className={'timelineCue'} onClick={minus}>-</span>
                    {cueItem.actions.map(a => <span className={'timelineCue-triangle'}></span>)}
                </div>
                : <div className={'timelineCue'} >

                </div>
            }
        </div>
    )
};

export default CueTimeLineItem;
