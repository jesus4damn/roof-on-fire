import * as React from 'react';
import { connect } from 'react-redux';
import CueTimeLineItem from './CueTimeLineItem/CueLine';
import { RootState } from '../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../types/cuesTypes';
import { setSelectedCue } from '../../store/cuesReducer/cuesActions';
require('./TimeLine.scss');

interface ICommonProps {
    position: {x: number, y: number},
}

interface IConnectedProps {
    cues: ICue[]
    selectedCue: ICue | null,
    setSelectedCue: (cue: ICue) => void
}
type TProps = ICommonProps
    & IConnectedProps & any & any;

const TimeLine: React.FC<TProps> = ({position, cues, selectedCue, setSelectedCue}) => {

    return (
        <div
            style={{ backgroundColor: 'black' }} //`url(${getTimeLineBackground()})`
            className={'timelineBlock'}>
            <span>{` x = ${position.x} + y${position.y}`}</span>
            {cues.map((c:ICue, i:number) =>
                <CueTimeLineItem
                    select={() => {setSelectedCue(c)}}
                    key={c.id}
                    cueItem={c}
                    selected={selectedCue}
                    index={i}
                    mousePosition={position}
                />
            )}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    selectedCue: getSelectedCue(state)
});

export default connect(mapStateToProps, {setSelectedCue})(TimeLine);
