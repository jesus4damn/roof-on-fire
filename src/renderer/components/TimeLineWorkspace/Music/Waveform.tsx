import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';
import { getMp3 } from '../../../assets/musicGetter';

interface IProps {
  children: any
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
}

class Waveform extends React.Component<IProps, IState> {
  waveform: any | React.Ref<any>;

  wavesurfer: any | WaveSurfer;
  setWaveFormRef: (element: HTMLDivElement) => void;

  constructor(props: IProps) {
    super(props);
    this.waveform = null;

    this.setWaveFormRef = element => {
      this.waveform = element;
    };
    this.state = {
      loaded: false,
      duration: 0,
      playing: false,
      pos: 0,
      speed: 0,
      volume: 0,
      currentTrackTime: 0,
      zoomValue: 0
    };
  }

  componentDidMount() {
    this.wavesurfer = WaveSurfer.create({
      barWidth: 0,
      cursorWidth: 1,
      container: this.waveform,
      backend: 'WebAudio',
      height: 170,
      progressColor: '#2D5BFF',
      //scrollParent: true,
      fillParent: true,
      // @ts-ignore
      responsive: true,
      waveColor: '#031109',
      cursorColor: 'transparent'
    });

    this.setState({
      duration: this.wavesurfer.getDuration(),
      speed: this.wavesurfer.getPlaybackRate(),
      volume: this.wavesurfer.getVolume(),
    });

    this.wavesurfer.on('ready', () => {
      this.setState({loaded: true})
    });

    this.wavesurfer.on('audioprocess', () => {
      this.handleTrackTimeChange(this.wavesurfer.getCurrentTime())
    });

    this.wavesurfer.on('zoom', (dd: number) => {
      //console.log('zoom ===>' + dd);
      this.setState({
        zoomValue: dd
      });
    });

    this.wavesurfer.load(getMp3('guanoApes'));
  };

  componentWillUnmount(): void {
    this.wavesurfer.un('audioprocess', () => {});
    this.wavesurfer.un('zoom', () => {});
  }

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.wavesurfer.playPause();
  };

  handleZoom = (val: number, dec: boolean) => {
    let dd = dec ? this.state.zoomValue - val : this.state.zoomValue + val;
    //console.log(dd);
    this.wavesurfer.zoom(dd)
  };

  handlePlaybackRate = (speed: number) => {
    this.setState({ speed: speed });
    this.wavesurfer.setPlaybackRate();
  };

  setVolume = (vol: number) => {
    this.setState({ volume: vol });
    this.wavesurfer.setVolume(vol);
  };

  handleTrackTimeChange(time: number) {
    this.setState({
      currentTrackTime: time
    });
  }

  render() {
    return (
        <div className='timelineBlock'>
          <div className={"timelinePlayerActionsContainer"}>
            <button onClick={() => {this.handlePlay()}} disabled={!this.state.loaded}>
              {!this.state.playing ? 'Play' : 'Pause'}
            </button>
            <input type={"range"}
                   value={this.state.volume * 100}
                   onChange={(e)=> {
                     this.setVolume(+e.currentTarget.value/100)
                   }}
                   min={0} max={100} />
          </div>
          <div ref={this.setWaveFormRef} className='waveWrapper'>
          {this.props.children}
        </div>
          <div className={"timelineNavContainer"}>
            <button onClick={() => {this.handleZoom(5, false)}}>+</button>
            <button onClick={() => {this.handleZoom(5, true)}}>-</button>
          </div>
        </div>
    );
  }
};

export default Waveform;


