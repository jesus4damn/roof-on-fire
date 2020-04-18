import * as React from 'react';
import * as WaveSurfer from 'wavesurfer.js';


class Waveform extends React.Component {  
  state = {
    playing: false,
  };

  componentDidMount() {
    let wav = WaveSurfer.create({
      barWidth: 0,
      cursorWidth: 1,
      container: '#waveform',
      backend: 'WebAudio',
      height: 120,
      progressColor: '#2D5BFF',
      //responsive: true,
      waveColor: '#EFEFEF',
      cursorColor: 'transparent'
    });
    wav.load("https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3");
    
  };
  
  handlePlay = () => {
    this.setState({ playing: !this.state.playing });
    //waveform.playPause();
  };
  
  render() {
    const url = 'https://www.mfiles.co.uk/mp3-downloads/gs-cd-track2.mp3';

    return (
      <>
        <button onClick={this.handlePlay} >
          {!this.state.playing ? 'Play' : 'Pause'}
        </button>
        <div id="waveform" />
        <audio id="track" src={url} />
        </>
    );
  }
};

export default Waveform;


