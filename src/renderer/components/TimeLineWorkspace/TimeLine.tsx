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
