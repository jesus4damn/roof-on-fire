import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';
import { getMp3 } from '../../../assets/musicGetter';

interface IProps {

}

interface IState {
  playing: boolean,
  // wave: WaveSurfer
  pos: number
}

class Waveform extends React.Component<IProps, IState> {
  aud: any;
  wavesurfer: any | WaveSurfer;
  waveform: any | React.Ref<any>;

  state: IState = {
    playing: false,
    pos: 0,
    //waw: WaveSurfer
  };


  componentDidMount() {
    this.aud = React.createRef();
    this.waveform = React.createRef();

    this.wavesurfer = WaveSurfer.create({
      barWidth: 0,
      cursorWidth: 1,
      container: '#waveform',
      //container: this.waveform.current,
      backend: 'WebAudio',
      height: 120,
      progressColor: '#2D5BFF',
      // @ts-ignore
      responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    });
    //
    this.wavesurfer.load(getMp3('guanoApes'));
    // this.setState({waw: wav});
  };

  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    this.wavesurfer.playPause();
    //waveform.playPause();
  };
  handlePosChange(e: any) {
    this.setState({
      pos: e.originalArgs[0]
    });
  }
  render() {

    return (
        <>
          <button onClick={() => {this.handlePlay()}}>
            {!this.state.playing ? 'Play' : 'Pause'}
          </button>
          <div ref={this.waveform} id="waveform"/>
          <audio ref={this.aud} src={getMp3('guanoApes')}/>
        </>
    );
  }
};

export default Waveform;


