import * as React from 'react';
import { ICue } from '../../../../types/cuesTypes';
import { useEffect, useState } from 'react';

require('./CueList.scss');

interface ICommonProps {
    cue: ICue
    index: number
    selected: boolean
    setSelectedCue: (cue: ICue) => void
    updateCue: (cue: ICue) => void
}


type TProps = ICommonProps & any & any;

const CueListItem: React.FC<TProps> = ({cue, index, selected, setSelectedCue, updateCue}) => {
    const [cueCopy, setCueCopy] = useState<ICue>(cue);
    const [cueWidth, setCueWidth] = useState<number>(+(cue.endTime - cue.startTime).toFixed(2));
    const [editName, setEditName] = useState(false);
    const [editStartTime, setEditStartTime] = useState(false);
    const [editTotalTime, setEditTotalTime] = useState(false);

    useEffect(() => {
        setCueCopy(cue);
        setCueWidth(+(cue.endTime - cue.startTime).toFixed(2));
    }, [cue]);

    const setActiveCue = () => {
        setSelectedCue(cue);
    };

    const onTotalTimeChange = (val: number) => {
        let part = val / (cueCopy.actions.length -1);
        setCueWidth(val);
        setCueCopy({
            ...cueCopy,
            endTime: +(val + cueCopy.startTime).toFixed(2),
            actions: cueCopy.actions.map( (a, i) => i === 0
                ? {...a, startTime: 0}
                : {...a, startTime: +(i * part).toFixed(2)}
                )
        })
    };

    const onEditEnd = () => {
        setEditName(false);
        setEditStartTime(false);
        setEditTotalTime(false);
        updateCue(cueCopy);
    };

    return (
        <tr onClick={() => (editName || editStartTime || editTotalTime) && selected ? '' : setActiveCue}
            className={'cueListItem'}
            style={{cursor: 'pointer', backgroundColor: selected ? 'green' : 'inherit'}}
        >
            <td>{index}</td>
            <td onDoubleClick={() => setEditName(true)} style={editName ? {padding: '0'} : {}}>
                {editName
                    ? <input
                        className={'cueListNameInput'}
                        value={cueCopy.name}
                        onChange={(event => setCueCopy({...cueCopy, name: event.target.value}))}
                        onBlur={(event) => event.target.value ? onEditEnd() : ''}
                    />
                    : cueCopy.name}
            </td>
            <td onDoubleClick={() => setEditStartTime(true)} style={editStartTime ? {padding: '0'} : {}}>
                {editStartTime
                ? <input
                    type={'number'}
                    className={'cueListNameInput'}
                    value={cueCopy.startTime}
                    onChange={(event => setCueCopy({ ...cueCopy, startTime: +event.target.value, endTime: +event.target.value + cueWidth }))}
                    onBlur={(event) => event.target.value ? onEditEnd() : ''}
                />
                : cueCopy.startTime}</td>
            <td onDoubleClick={() => setEditTotalTime(true)} style={editTotalTime ? {padding: '0'} : {}}>{
                editTotalTime
                ? <input
                    type={'number'}
                    className={'cueListNameInput'}
                    value={cueWidth}
                    onChange={event => +event.target.value >= 0
                        ? onTotalTimeChange(+event.target.value)
                        : ''
                    }
                    onBlur={(event) => event.target.value ? onEditEnd() : ''}
                />
                : cueWidth}</td>
            <td>{}</td>
            <td className="headerTableCuesList-dmx">dmx</td>
        </tr>
    );
};

export default React.memo(CueListItem);
