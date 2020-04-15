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
    const asd = () => {
        setCueWidth(cueWidth + 200)
    };

    const classnameForOpen = isOpen ? '' : '';

    return (
        <div className={classnameForOpen} style={{marginLeft: `${cueItem.startTime}px`, width: `${cueWidth}px`}} onClick={select}>
            {isOpen
                ? <div className={'timelineCue'}>
                    {cueItem.name} closed <span onClick={asd}>X</span>
                    {cueItem.actions.map(a => <span className={'timelineCue-triangle'}>aa</span>)}
                </div>
                : <div >
                    {cueItem.name}
                </div>
            }
        </div>
    )
};

export default CueTimeLineItem;
