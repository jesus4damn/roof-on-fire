import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import { getTimelineCues } from '../../store/cuesReducer/cuesSelector';
import { ICue } from '../../../types/cuesTypes';
// @ts-ignore
import Waveform from './Music/Waveform';
import { useMusicContext } from '../../misicContext/musicContext';
import ShowRunner from '../ShowRunner';
import { setMusicFileLength } from '../../store/appReducer/appActions';
import { useCallback } from 'react';

require('./TimeLine.scss');

interface IConnectedProps {
    cues: ICue[]
    musicFilePath: string,
    setMusicFileLength: (length: number) => void
}

type TProps = IConnectedProps & any & any;

const TimeLine: React.FC<TProps> = ({ cues, musicFilePath, setMusicFileLength }) => {
    const {setMusicContext, musicContext, setCurrentTime, currentTime} = useMusicContext();
///TODO(Victor) think about how better to tranfer position props between waveForm and cues
  const setMusicFileLengthCallback = useCallback((time: number) => setMusicFileLength(time), [])
  const setCurrentTimeCallback = useCallback((time: number) => setCurrentTime(time), [])
  const setMusicContextCallback = useCallback((time: number) => setMusicContext({totalTime: time}), [])
  const setMusicContextStatus = useCallback((val: string) => setMusicContext({status: val}), [])
    return (
            <div className={'timelineTrack'}>
                <ShowRunner currentTime={currentTime}
                            status={musicContext.status}
                            />
                <Waveform
                    musicFilePath={musicFilePath}
                    setCurrentTime={setCurrentTimeCallback}
                    setTotalTime={setMusicContextCallback}
                    setContextStatus={setMusicContextStatus}
                    cues={cues}
                    setMusicFileLength={setMusicFileLengthCallback}
                />
            </div>
    );
};

const mapStateToProps = (state: RootState) => ({
    cues: getTimelineCues(state),
    musicFilePath: state.app.musicFilePath
});

export default connect(mapStateToProps, {setMusicFileLength} )(TimeLine);
