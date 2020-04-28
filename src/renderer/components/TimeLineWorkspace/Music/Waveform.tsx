import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';
import { getMp3 } from '../../../../assets/musicGetter';

// @ts-ignore
const TimelinePlugin = require('wavesurfer.js/dist/plugin/wavesurfer.timeline.js');
const CursorPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.cursor.js');
const MinimapPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.minimap.js');
const RegionsPlugin = require('wavesurfer.js/dist/plugin/wavesurfer.regions.js');

interface IProps {
    children: any
    musicFilePath: string
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
    waveformTimeLine: any | React.Ref<any>;
    waveformCursor: any | React.Ref<any>;
    minimapRef: any | React.Ref<any>;
    regionRef: any | React.Ref<any>;
    cuesWrapperRef: any | React.Ref<any>;

    wavesurfer: any | WaveSurfer;
    setWaveFormRef: (element: HTMLDivElement) => void;
    setWaveFormTimelineRef: (element: HTMLDivElement) => void;
    setWaveFormCursorRef: (element: HTMLDivElement) => void;
    setMinimapRef: (element: HTMLDivElement) => void;
    setRegionRef: (element: HTMLDivElement) => void;
    setCuesWrapperRef: (element: HTMLDivElement) => void;

    constructor(props: IProps) {
        super(props);
        this.waveform = null;

        this.setWaveFormRef = element => {
            this.waveform = element;
        };
        this.setWaveFormCursorRef = element => {
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
        this.setCuesWrapperRef = element => {
            this.cuesWrapperRef = element;
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
            container: this.waveform,
            backend: 'WebAudio',
            height: 170,
            maxCanvasWidth: 1600,
            //normalize: true,
            partialRender: true,
            progressColor: '#2D5BFF',
            scrollParent: true,
            fillParent: false,
            // @ts-ignore
            responsive: true,
            waveColor: '#031109',
            cursorColor: 'transparent',
            plugins: [
                TimelinePlugin.create({
                    container: this.waveformTimeLine,
                    formatTimeCallback: this.handljjjy,
                    primaryFontColor: '#FFF',
                    secondaryFontColor: '#ff6fcc',
                    secondaryColor: '#c38a0d',
                    primaryColor: '#006dd9',
                    fontSize: 10,
                    zoomDebounce: 1200
                    // plugin options ...
                }),
                CursorPlugin.create({
                    cursor: this.waveformCursor
                    // plugin options ...
                }),
                MinimapPlugin.create({
                    container: this.minimapRef,
                    waveColor: '#777',
                    progressColor: '#222',
                    height: 50
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
            this.setState({ loaded: true, duration: this.wavesurfer.getDuration() });
            this.wavesurfer.enableDragSelection({loop: true, drag: true, resize: true, color: "rgba(0, 0, 255, 0.1)"})
        });

        this.wavesurfer.on('audioprocess', () => {
            this.handleTrackTimeChange(this.wavesurfer.getCurrentTime());
        });

        this.wavesurfer.on('zoom', (val: number) => {
            console.log('zoom ===>' + val);
            console.log('width ===' + val * this.state.duration);
            this.setState({
                zoomValue: val,
                parentDivWidth: val * this.state.duration
            });
        });

        this.wavesurfer.load(this.props.musicFilePath);
    };

    componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
        if (prevProps.musicFilePath !== this.props.musicFilePath) {
            console.log(this.props.musicFilePath);
            this.wavesurfer.load(this.props.musicFilePath);
            this.wavesurfer.on('ready', () => {
                this.setState({ loaded: true,  duration: this.wavesurfer.getDuration() });
            });
        }
    }

    componentWillUnmount(): void {
        this.wavesurfer.unAll();
    }

    handleStop = () => {
        this.wavesurfer.stop();
        this.wavesurfer.clearRegions();
    };
    handlePause = () => {
        if (this.state.playing) {
            this.setState({ playing: false });
            this.wavesurfer.pause();
        }
    };
    handlePlay = () => {
        this.setState({ playing: true });
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
        this.setState({ zoomValue: this.state.zoomValue + val }, () => {
            this.wavesurfer.zoom(this.state.zoomValue + val);
        });
    };

    handleScroll = () => {
        window.scrollTo(0, this.cuesWrapperRef.current)
    }

    handlePlaybackRate = (speed: number) => {
        this.setState({ speed: speed });
        this.wavesurfer.setPlaybackRate();
    };

    setVolume = (vol: number) => {
        this.setState({ volume: vol });
        this.wavesurfer.setVolume(vol);
    };

    handleTrackTimeChange = (time: number) => {
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
                    <div ref={this.setWaveFormRef} className='waveWrapper'>
                        {this.props.children}
                        <div ref={this.setWaveFormTimelineRef}/>
                        <div ref={this.setWaveFormCursorRef}/>
                        <div ref={this.setRegionRef}/>
                    </div>

                <div className={'timelineControllerWrapper'}>
                    <div className={'timelinePlayerActionsContainer'}>
                        <button onClick={() => {
                            this.handlePlay();
                        }}
                                disabled={!this.state.loaded}
                        >
                            {'Play'}
                        </button>
                        <button onClick={() => {
                            this.handlePause();
                        }}
                                disabled={!this.state.loaded}
                        >
                            {'Pause'}
                        </button>
                        <button onClick={() => {
                            this.handleStop();
                        }}>
                            {'Stop'}
                        </button>
                        <input type={'range'}
                               value={this.state.volume * 100}
                               onChange={(e) => {
                                   this.setVolume(+e.currentTarget.value / 100);
                               }}
                               min={0} max={100}/>
                        <span className={'trackTimeSpan'}>
                                 {this.state.currentTrackTime}
                               </span>
                    </div>
                    <div className={'timelineNavContainer'}>
                        <div ref={this.setMinimapRef}/>
                    </div>
                </div>
            </div>
        );
    }
};

export default Waveform;


