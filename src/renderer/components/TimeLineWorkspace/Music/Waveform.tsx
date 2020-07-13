import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';
// @ts-ignore
import ReactCursorPosition from 'react-cursor-position';
import CueTimeLine from '../CueTimeLineItem/CueLine';
import { ICue } from '../../../../types/cuesTypes';

import {throttle} from 'lodash';
require('./Waveform.scss');
// @ts-ignore
const TimelinePlugin = require('wavesurfer.js/dist/plugin/wavesurfer.timeline.js');
const CursorPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.cursor.js');
const MinimapPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.minimap.js');
const RegionsPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');


const someImg = require('../../../../assets/images/svg/note.svg');
const setupMusic = require('../../../../assets/images/svg/setupMusic.svg');

export const getSomeImg = () => {
    return someImg
};

export const getSetupMusic = () => {
    return setupMusic
};

interface IProps {
    children: any
    setCurrentTime: (time: number) => void
    setTotalTime: (time: number) => void
    setContextStatus: (val: string) => void
    cues: ICue[]
    musicFilePath: string
    setMusicFileLength: (length: number) => void
}

interface IState {
    loaded: boolean,
    playing: boolean,
    pos: number,
    duration: number,
    speed: number,
    volume: number,
    currentTrackTime: number,
    zoomValue: number,
    parentDivWidth: number
}

class Waveform extends React.Component<IProps, IState> {
    waveform: any | React.Ref<any>;
    wave: any | React.Ref<any>;
    waveformTimeLine: any | React.Ref<any>;
    waveformCursor: any | React.Ref<any>;
    minimapRef: any | React.Ref<any>;
    regionRef: any | React.Ref<any>;
    cuesWrapperRef: any | React.Ref<any>;

    wavesurfer: any | WaveSurfer;
    setWaveFormTimelineRef: (element: HTMLDivElement) => void;
    setCuesWrapperRef: (element: HTMLDivElement) => void;
    setWaveFormCursorRef: (element: HTMLDivElement) => void;
    setMinimapRef: (element: HTMLDivElement) => void;
    setRegionRef: (element: HTMLDivElement) => void;

    constructor(props: IProps) {
        super(props);
        this.waveform = React.createRef();
        this.wave = React.createRef();
        this.cuesWrapperRef = React.createRef();

        this.setWaveFormCursorRef = element => {
            this.waveformCursor = element;
        };
        this.setCuesWrapperRef = element => {
            this.waveformCursor = element;
        };
        this.setWaveFormTimelineRef = element => {
            this.waveformTimeLine = element;
        };
        this.setMinimapRef = element => {
            this.minimapRef = element;
        };
        this.setRegionRef = element => {
            this.regionRef = element;
        };

        this.state = {
            loaded: false,
            duration: 0,
            playing: false,
            pos: 0,
            speed: 0,
            volume: 0,
            currentTrackTime: 0,
            zoomValue: 0,
            parentDivWidth: 800
        };
    }

    componentDidMount() {

        this.wavesurfer = WaveSurfer.create({
            barWidth: 0,
            // @ts-ignore
            barGap: 200,
            cursorWidth: 1,
            container: this.waveform.current,
            backend: 'WebAudio',
            height: 170,
            maxCanvasWidth: 15000,
            minPxPerSec: 1,
            pixelRatio: 2,
            partialRender: true,
            progressColor: '#2D5BFF',
            scrollParent: true,
            fillParent: true,
            // @ts-ignore
            responsive: true,
            waveColor: '#4F4F4F',
            cursorColor: 'transparent',
            plugins: [
                TimelinePlugin.create({
                    container: this.waveformTimeLine,
                    formatTimeCallback: this.handljjjy,
                    primaryFontColor: '#FFF',
                    secondaryFontColor: '#FFF',
                    secondaryColor: '#222',
                    primaryColor: '#FFF',
                    fontSize: 10,
                    notchPercentHeight:50,
                    zoomDebounce: 1200
                    // plugin options ...
                }),
                CursorPlugin.create({
                    cursor: this.waveformCursor
                    // plugin options ...
                }),
                MinimapPlugin.create({
                    container: this.minimapRef,
                    waveColor: '#828282',
                    progressColor: '#222',
                    height: 24,
                    backgroundColor:'#222',
                    forceDecode:true,
                }),
                RegionsPlugin.create({
                    maxRegions: 1,
                    wrapper: this.regionRef,
                    wavesurfer: this.waveformTimeLine
                })
            ]
        });

        this.setState({
            duration: this.wavesurfer.getDuration(),
            speed: this.wavesurfer.getPlaybackRate(),
            volume: this.wavesurfer.getVolume()
        });

        this.wavesurfer.on('ready', () => {
            this.setState({
                loaded: true,
                duration: this.wavesurfer.getDuration(),
                speed: this.wavesurfer.getPlaybackRate(),
                volume: this.wavesurfer.getVolume(),
                parentDivWidth: this.wavesurfer.getDuration() * 20,
            });
            this.props.setTotalTime(this.wavesurfer.getDuration());
            this.props.setMusicFileLength(this.wavesurfer.getDuration());

            this.wavesurfer.enableDragSelection({
                drag: true,
                resize: true,
                loop: true,
                color: "rgba(0, 0, 255, 0.1)"
            });

        });

        this.wavesurfer.on('scroll', throttle((e:any) => {

            this.setState({
                parentDivWidth: e.target.width
            });

            this.cuesWrapperRef.current.scrollLeft = e.target.scrollLeft;
        }, 200));

        this.wavesurfer.on('audioprocess', throttle(() => {
            this.handleTrackTimeChange(this.wavesurfer.getCurrentTime());
        }, 75));

        this.wavesurfer.on('zoom', throttle((val: number) => {
            this.setState({
                zoomValue: val,
                parentDivWidth: val * this.state.duration,
            });
        }, 200));

        this.wavesurfer.load(this.props.musicFilePath);
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (prevProps.musicFilePath !== this.props.musicFilePath) {
            console.log(this.props.musicFilePath);
            this.wavesurfer.load(this.props.musicFilePath);
            this.wavesurfer.on('ready', () => {
                this.props.setTotalTime(this.wavesurfer.getDuration());
                this.setState({
                    loaded: true,
                    duration: this.wavesurfer.getDuration()
                });
            });
        }
    }

    componentWillUnmount(): void {
        this.wavesurfer.unAll();
    }

    handlePosChange(e: any) {
        console.log(e);
        // this.setState({
        //     pos: e.originalArgs[0]
        // });
    }

    handleStop = () => {
        this.wavesurfer.stop();
        this.props.setCurrentTime(0);
        this.props.setContextStatus("stop");
        this.wavesurfer.clearRegions();
    };
    handlePause = () => {
        if (this.state.playing) {
            this.setState({ playing: false });
            this.props.setContextStatus("pause");
            this.wavesurfer.pause();
        }
    };
    handlePlay = () => {
        this.setState({ playing: true });
        this.props.setContextStatus("play");
        //this.wavesurfer.play(this.state.currentTrackTime, this.state.duration);
        this.wavesurfer.playPause();

    };

    handljjjy = (seconds: any, pxPerSec: any) => {
        seconds = Number(seconds);
        let minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;

        // fill up seconds with zeroes
        let secondsStr = Math.round(seconds).toString();
        if (pxPerSec >= 25 * 10) {
            secondsStr = seconds.toFixed(2);
        } else if (pxPerSec >= 25 * 1) {
            secondsStr = seconds.toFixed(1);
        }

        if (minutes > 0) {
            if (seconds < 10) {
                secondsStr = '0' + secondsStr;
            }
            //console.log(`${minutes}:${secondsStr}`);
            return `${minutes}:${secondsStr}`;
        }
        //console.log(secondsStr);
        return secondsStr;
    };

    handleZoom = (val: number) => {
        this.wavesurfer.zoom(this.state.zoomValue + val);
    };

    clearSelections = () => {
        this.wavesurfer.clearRegions();
    };

    handlePlaybackRate = (speed: number) => {
        this.setState({ speed: speed });
        this.wavesurfer.setPlaybackRate();
    };

    setVolume = (vol: number) => {
        this.setState({ volume: vol });
        this.wavesurfer.setVolume(vol);
    };

    handleTrackTimeChange = (time: number) => {
        console.log(time);
            this.props.setCurrentTime(time);
            this.setState({
                currentTrackTime: time
            });
    };

    handleWheel = (e: any) => {
        let delta = e.deltaY || e.detail || e.wheelDelta;
        this.handleZoom(-delta / 100);
    };

    render() {
        return (
            <div className='timelineBlock' onWheel={this.handleWheel}>
                <div ref={this.waveform} className='waveWrapper'>
                    <div ref={this.cuesWrapperRef} className={"scrollWrap"}>
                        <ReactCursorPosition className={"cursorContainer"} style={{ width: `${this.state.parentDivWidth}px`}}>
                            <CueTimeLine
                                parentDivWidth={this.state.parentDivWidth}
                                zoom={this.state.zoomValue}
                                cues={this.props.cues}
                            />
                            {this.props.children}
                        </ReactCursorPosition>
                    </div>
                    <div className={'wave'} ref={this.wave} />
                    <div ref={this.setWaveFormTimelineRef}/>
                    <div ref={this.setWaveFormCursorRef}/>
                    <div ref={this.setRegionRef}/>
                </div>

                <div className={'timelineControllerWrapper'}>
                    <div className={'timelinePlayerActionsContainer'}>

                        <button onClick={() => {
                            this.handlePause();
                        }}
                                disabled={!this.state.loaded}
                        >
                            {'Pause'}
                        </button>
                        <button onClick={() => {
                            this.handlePlay();
                        }}
                                disabled={!this.state.loaded}
                        >
                            {'Play'}
                        </button>
                        <button onClick={() => {
                            this.handleStop();
                        }}>
                            {'Stop'}
                        </button>
                        <button onClick={() => {
                            this.clearSelections();
                        }}>
                            {'Clear'}
                        </button>

                        <div className={'trackTimeSpan'}>
                        <div>{this.state.currentTrackTime > 60 ? (this.state.currentTrackTime / 60).toFixed(0) : 0}</div>
                        <span> : </span>
                            <div>{this.state.currentTrackTime > 60 ? (this.state.currentTrackTime / 60).toFixed(0) : 0}</div>
                            <span> : </span>
                            <div>{
                                this.state.currentTrackTime > 60
                                ? (this.state.currentTrackTime - (this.state.currentTrackTime > 60 && this.state.currentTrackTime < 120 ? 60 : 120)).toFixed(0)
                                : this.state.currentTrackTime.toFixed(0)
                            }</div>
                            <span> : </span>
                            <div>{`${this.state.currentTrackTime.toFixed(3)}`.split('.')[1]}</div>
                        </div>
                        <div className={'timelineNavContainer--option'}>
                    <input type={'range'}
                               value={this.state.volume * 100}
                               onChange={(e) => {
                                   this.setVolume(+e.currentTarget.value / 100);
                               }}
                               min={0} max={100}/>
                    </div>
                    </div>

                    <div className={'timelineNavContainer'}>
                    <div className={'musicNote'}>
                   <button style={{
                        backgroundImage: `url(${getSomeImg()})`,
                        backgroundSize: '60%',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        }}
                        onClick={() => {
                            this.handlePause();
                        }}
                                disabled={!this.state.loaded}
                        >
                            {'Note'}
                        </button>
                        <button style={{
                        backgroundImage: `url(${getSetupMusic()})`,
                        backgroundSize: '60%',
                        backgroundPosition: 'center center',
                        backgroundRepeat: 'no-repeat',
                        }}
                        onClick={() => {
                            this.handlePlay();
                        }}
                                disabled={!this.state.loaded}
                        >
                            {'setupMusic'}
                        </button>
                   </div>
                        <div className={'btnPrecent'}>
                            <span>50%</span>
                        </div>
                        <div className={'Minimap'} ref={this.setMinimapRef}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Waveform;


