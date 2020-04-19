import * as React from 'react';
import { connect } from 'react-redux';
import CueTimeLineItem from './CueTimeLineItem/CueLine';
import { RootState } from '../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../types/cuesTypes';
import { setSelectedCue } from '../../store/cuesReducer/cuesActions';
import { useState } from 'react';
// @ts-ignore
import Waveform from './Music/Waveform';

require('./TimeLine.scss');

interface ICommonProps {
    position: { x: number, y: number },
}

interface IConnectedProps {
    cues: ICue[]
    selectedCue: ICue | null,
    setSelectedCue: (cue: ICue) => void
}

type TProps = ICommonProps
    & IConnectedProps & any & any;

const TimeLine: React.FC<TProps> = ({ position, cues, selectedCue, setSelectedCue }) => {
    const [audioLength, setAudioLength] = useState(240000);
///TODO(Victor) think about how better to tranfer position props between waveForm and cues
    return (
            <div
                className={'timelineTrack'}
                //style={{ width: `${audioLength / 100}px` }}
            >
                <span className={'x-y-mousePos'}>{` x = ${position.x} + y${position.y}`}</span>
                <Waveform>
                    {cues.map((c: ICue, i: number) =>
                        <CueTimeLineItem
                            select={() => {
                                setSelectedCue(c);
                            }}
                            key={c.id}
                            cueItem={c}
                            selected={selectedCue}
                            index={i}
                            mousePosition={position}
                        />
                    )}
                </Waveform>
            </div>

    );
};

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    selectedCue: getSelectedCue(state)
});

export default connect(mapStateToProps, { setSelectedCue })(TimeLine);
