import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';
// @ts-ignore
import ReactCursorPosition from 'react-cursor-position';
import CueTimeLine from '../CueTimeLineItem/CueLine';
import { ICue } from '../../../../types/cuesTypes';

import { throttle } from 'lodash';
import { useRef } from 'react';
import { Tooltip } from '@material-ui/core';

require('./Waveform.scss');
// @ts-ignore
const TimelinePlugin = require('wavesurfer.js/dist/plugin/wavesurfer.timeline.js');
const CursorPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.cursor.js');
const MinimapPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.minimap.js');
const RegionsPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');


const noteImg = require('../../../../assets/images/svg/note.svg');
const setupMusic = require('../../../../assets/images/svg/setupMusic.svg');
export const getNoteImg = () => {
    return noteImg;
};

export const getMusicImg = () => {
    return setupMusic;
};

interface IProps {
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
    stopBtn: boolean
    leftOffset: number
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
            parentDivWidth: 800,
            stopBtn: false,
            leftOffset: 0
        };
    }

    componentDidMount() {

        this.wavesurfer = WaveSurfer.create({
            autoCenter: true,
            barWidth: 0,
            // @ts-ignore
            barGap: 22,
            barRadius: 3,
            cursorWidth: 3,
            barMinHeight: 1,
            container: this.waveform.current,
            backend: 'WebAudio',
            height: 167,
            forceDecode: true,
            maxCanvasWidth: 14000,
            minPxPerSec: 50,
            normalize: true,
            pixelRatio: 1,
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
                    formatTimeCallback: this.handleTimePlay,
                    primaryFontColor: '#FFF',
                    secondaryFontColor: '#FFF',
                    secondaryColor: '#222',
                    primaryColor: '#FFF',
                    fontSize: 10,
                    notchPercentHeight: 50,
                    zoomDebounce: 1200
                    // plugin options ...
                }),
                CursorPlugin.create({
                    cursor: this.waveformCursor,
                    showTime: true,
                    opacity: 0.2,
                    customShowTimeStyle: {
                        'background-color': '#aaa',
                        color: '#fff',
                        padding: '2px',
                        'font-size': '10px'
                    }
                }),
                MinimapPlugin.create({
                    container: this.minimapRef,
                    showOverview: true,
                    overviewBorderColor: 'green',
                    overviewBorderSize: 0.2,
                    waveColor: '#828282',
                    progressColor: '#373737',
                    height: 24,
                    backgroundColor: '#222',
                    forceDecode: true
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
            this.wavesurfer.setVolume(0.05);
            this.handleZoom(200);
            this.setState({
                loaded: true,
                duration: this.wavesurfer.getDuration(),
                speed: this.wavesurfer.getPlaybackRate(),
                volume: 0.05,
                parentDivWidth: this.wavesurfer.getDuration() * 20
            });
            this.props.setTotalTime(this.wavesurfer.getDuration());
            this.props.setMusicFileLength(this.wavesurfer.getDuration());

            // this.wavesurfer.enableDragSelection({
            //     drag: true,
            //     resize: true,
            //     loop: true,
            //     color: 'rgba(0, 0, 255, 0.1)'
            // });
            window.addEventListener('keydown', this.handleSpacePress);
        });

        this.wavesurfer.on('scroll', throttle((e: any) => {
            this.setState({
                parentDivWidth: e.target.width,
                leftOffset: e.target.scrollLeft
            });

            this.cuesWrapperRef.current.scrollLeft = e.target.scrollLeft;
        }, 30));

        this.wavesurfer.on('audioprocess', throttle(() => {
            this.handleTrackTimeChange(this.wavesurfer.getCurrentTime());
        }, 100));

        this.wavesurfer.on('zoom', throttle((val: number) => {
            this.setState({
                zoomValue: val,
                parentDivWidth: val * this.state.duration
            });
        }, 50));

        if (this.props.musicFilePath) {
            this.wavesurfer.load(this.props.musicFilePath);
        }
    };

    handleSpacePress = (e: KeyboardEvent) => {
        if (e.code === 'Space' && document.activeElement && document.activeElement.tagName !== 'INPUT') {
            if (this.state.playing) {
                this.setState({ ...this.state, stopBtn: !this.state.stopBtn });
                this.handlePause();
            } else {
                this.setState({ ...this.state, stopBtn: !this.state.stopBtn });
                this.handlePlay();
            }
        }
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (prevProps.musicFilePath !== this.props.musicFilePath && this.props.musicFilePath) {
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
        if (prevProps.cues.length !== this.props.cues.length && this.props.cues.length) {
            this.wavesurfer.zoom(this.state.zoomValue + 1);
        }
    }

    componentWillUnmount(): void {
        this.wavesurfer.unAll();
        window.removeEventListener('keydown', this.handleSpacePress);
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
        this.props.setContextStatus('stop');
        this.wavesurfer.clearRegions();
    };
    handlePause = () => {
        if (this.state.playing) {
            this.setState({ playing: false });
            this.props.setContextStatus('pause');
            this.wavesurfer.pause();
        }
    };
    handlePlay = () => {
        this.setState({
            playing: true
        });
        this.props.setContextStatus('play');
        //this.wavesurfer.play(this.state.currentTrackTime, this.state.duration);
        this.wavesurfer.playPause();
    };


    handleTimePlay = (seconds: any, pxPerSec: any) => {
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
        if (this.state.zoomValue + val > 1) {
            this.wavesurfer.zoom(this.state.zoomValue + val);
        }
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
        this.props.setCurrentTime(time);
        this.setState({
            currentTrackTime: time
        });
    };

    handleWheel = (e: any) => {
        let delta = e.deltaY || e.detail || e.wheelDelta;
        this.handleZoom(-delta / 100);
    };

    handleScrollY = (up: boolean) => {
        this.cuesWrapperRef.current.scrollTop = up
          ? this.cuesWrapperRef.current.scrollTop >= 50
            ? this.cuesWrapperRef.current.scrollTop - 50
            : 0
          : this.cuesWrapperRef.current.scrollTop + 50;
    };
    // shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
    //     return !(this.state.loaded && nextState.currentTrackTime !== this.state.currentTrackTime)
    //
    //     // loaded: boolean,
    //     //   playing: boolean,
    //     //   pos: number,
    //     //   duration: number,
    //     //   speed: number,
    //     //   volume: number,
    //     //   currentTrackTime: number,
    //     //   zoomValue: number,
    //     //   parentDivWidth: number
    //     // stopBtn: boolean
    //     // leftOffset: number
    // }

    render() {
        return (
            <div className='timelineBlock' onWheel={this.handleWheel}>
                <div ref={this.waveform} className='waveWrapper'>
                    <div ref={this.cuesWrapperRef} className={'scrollWrap'}>
                        {/*<div className="leftNavWrapper">
                            <button style={{}} onClick={() => this.handleScrollY(true)}>{">"}</button>
                            <button style={{}} onClick={() => this.handleScrollY(false)}>{"<"}</button>
                        </div>*/}
                        <ReactCursorPosition className={'cursorContainer'}
                                             style={{ width: `${this.state.parentDivWidth}px`}}>
                            <CueTimeLine
                                parentDivWidth={this.state.parentDivWidth}
                                zoom={this.state.zoomValue}
                                cues={this.props.cues}
                                leftOffset={this.state.leftOffset}
                            />
                        </ReactCursorPosition>
                    </div>
                    <div className={'wave'} ref={this.wave}/>
                    <div ref={this.setWaveFormTimelineRef}/>
                    <div ref={this.setWaveFormCursorRef}/>
                    <div className={'tttt'} ref={this.setRegionRef}/>
                </div>

                <div className={'timelineControllerWrapper'}>
                    <div className={'timelinePlayerActionsContainer'}>
                        <Tooltip title={this.state.stopBtn ? "Pause" : "Play"}>
                            <Button className={`${this.state.stopBtn ? 'playBtn' : 'stopBtn'}`} onClick={() => {
                                this.setState({ ...this.state, stopBtn: !this.state.stopBtn });
                                this.handlePlay();
                            }}
                                    disabled={!this.state.loaded}
                            />
                        </Tooltip>
                        <Tooltip title={"Stop"}>
                            <Button onClick={() => {
                                this.setState({ ...this.state, stopBtn: !this.state.stopBtn });
                                this.handleStop();
                            }}/>
                        </Tooltip>
                        <Tooltip title={"Clear Selections"}>
                            <Button onClick={() => {
                                this.clearSelections();
                            }}/>
                        </Tooltip>


                        <div className={'trackTimeSpan'}>
                            <div>0</div>
                            <span> : </span>
                            <div>{this.state.currentTrackTime > 60 ? (this.state.currentTrackTime / 60).toFixed(0) : 0}</div>
                            <span> : </span>
                            <div>{
                                this.state.currentTrackTime > 60
                                    ? (this.state.currentTrackTime - (this.state.currentTrackTime > 60 && this.state.currentTrackTime < 120 ? 60 : 120)).toFixed(0)
                                    : this.state.currentTrackTime.toFixed(0)
                            }</div>
                            <span> : </span>
                            <div
                                className={'TimeSpanMillisecond'}>{`${this.state.currentTrackTime.toFixed(3)}`.split('.')[1]}</div>
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
                                backgroundImage: `url(${getNoteImg()})`,
                                backgroundSize: '60%',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat'
                            }}
                                    onClick={() => {
                                    }}
                                    disabled={!this.state.loaded}
                            >
                                {'Note'}
                            </button>
                            <button style={{
                                backgroundImage: `url(${getMusicImg()})`,
                                backgroundSize: '60%',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat'
                            }}
                                    onClick={() => {

                                    }}
                                    disabled={!this.state.loaded}
                            >
                                {'setupMusic'}
                            </button>
                        </div>
                        <div className={'btnPrecent'}>
                            <span>{Math.round(this.state.zoomValue)}%</span>
                        </div>
                        <div className={'Minimap'} ref={this.setMinimapRef}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Waveform;

const Button:React.FC<any & any> = (props: any) => {
    const ref = useRef<HTMLButtonElement>(null);
    return (
        <button {...props} ref={ref} onClick={(e) => {
            props.onClick ? props.onClick(e) : '';
            ref && ref.current && ref.current.blur ? ref.current.blur() : '';
        }}>{props.children}</button>
    );
};
