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
    return (
            <div className={'timelineTrack'}>
                <ShowRunner currentTime={currentTime}
                            status={musicContext.status}
                            />
                <Waveform
                    musicFilePath={musicFilePath}
                    setCurrentTime={(val: number) => {setCurrentTime(val)}}
                    setTotalTime={(val: number) => {setMusicContext({...musicContext, totalTime: val})}}
                    setContextStatus={(val: string) => {setMusicContext({...musicContext, status: val})}}
                    cues={cues}
                    setMusicFileLength={setMusicFileLength}
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

export default connect(mapStateToProps, {setMusicFileLength} )(TimeLine);
