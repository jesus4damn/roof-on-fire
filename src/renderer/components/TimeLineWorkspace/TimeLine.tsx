import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { getSelectedCue, getTimelineCues } from '../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../types/cuesTypes';
import { setSelectedCue } from '../../store/cuesReducer/cuesActions';
// @ts-ignore
import Waveform from './Music/Waveform';
import { useMusicContext } from '../../misicContext/musicContext';
import CueTimeLine from './CueTimeLineItem/CueLine';
import ShowRunner from '../ShowRunner';

require('./TimeLine.scss');

interface IConnectedProps {
    cues: ICue[]
    musicFilePath: string
}

type TProps = IConnectedProps & any & any;

const TimeLine: React.FC<TProps> = ({ cues, musicFilePath }) => {
    const context = useMusicContext();
///TODO(Victor) think about how better to tranfer position props between waveForm and cues
    return (
            <div
                className={'timelineTrack'}
                //style={{ width: `${audioLength / 100}px` }}
            >
                <ShowRunner context={context}/>
                <Waveform
                    musicFilePath={musicFilePath}
                    setCurrentTime={(val: number) => {context.setMusicContext({...context.musicContext, currentTime: val})}}
                    setTotalTime={(val: number) => {context.setMusicContext({...context.musicContext, totalTime: val})}}
                    cues={cues}
                >
                    <span> </span>
                </Waveform>
            </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    musicFilePath: state.app.musicFilePath
});

export default connect(mapStateToProps, {} )(TimeLine);
