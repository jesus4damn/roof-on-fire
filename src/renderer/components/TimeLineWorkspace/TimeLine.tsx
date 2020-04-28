import * as React from 'react';
import { connect } from 'react-redux';
import CueTimeLineItem from './CueTimeLineItem/CueLine';
import { RootState } from '../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../types/cuesTypes';
import { setSelectedCue } from '../../store/cuesReducer/cuesActions';
import { useContext, useState } from 'react';
// @ts-ignore
import Waveform from './Music/Waveform';
import { IMusicContextHook, useMusicContext } from '../../misicContext/musicContext';

require('./TimeLine.scss');

interface ICommonProps {
    position: { x: number, y: number },
}

interface IConnectedProps {
    cues: ICue[]
    musicFilePath: string
    selectedCue: ICue | null,
    setSelectedCue: (cue: ICue) => void
}

type TProps = ICommonProps
    & IConnectedProps & any & any;

const TimeLine: React.FC<TProps> = ({ position, cues, selectedCue, setSelectedCue, musicFilePath }) => {
    const context = useMusicContext();
///TODO(Victor) think about how better to tranfer position props between waveForm and cues
    return (
            <div
                className={'timelineTrack'}
                //style={{ width: `${audioLength / 100}px` }}
            >
                <span className={'x-y-mousePos'}>{` x = ${position.x} + y${position.y}`}</span>
                <Waveform
                    musicFilePath={musicFilePath}
                    setCurrentTime={(val: number) => {context.setMusicContext({...context.musicContext, currentTime: val})}}
                    setTotalTime={(val: number) => {context.setMusicContext({...context.musicContext, totalTime: val})}}
                >
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
    selectedCue: getSelectedCue(state),
    musicFilePath: state.app.musicFilePath
});

export default connect(mapStateToProps, { setSelectedCue })(TimeLine);
