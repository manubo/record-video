import React, {Component, PropTypes} from 'react';
import Video from './video/video';
import css from './styles.scss';

export default class App extends Component {
  static propTypes = {
    stream: PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
    this.mediaRecorder = null;
    this.chunks = [];
    this.state = {
      recording: false,
      blob: null,
    };
  }

  render() {
    const {stream} = this.props;
    const {recording, blob} = this.state;

    return (
      <div className={css.container}>
        <Video stream={stream}>
          <div className={css.actions}>
            {recording ?
              <button className={css.stop} onClick={this.handleStop}>Stop</button> :
              <button onClick={this.handleStart}>Start</button>
            }
          </div>
        </Video>
        <Video stream={blob} controls loop>
          <div className={css.actions}>
            {blob ?
              <button className={css.download} onClick={this.handleDownload}>Download</button> :
              null
            }
          </div>
        </Video>
      </div>
    );
  }

  handleStart() {
    const {stream} = this.props;
    const options = {
      mimeType: 'video/webm',
      videoBitsPerSecond: 2500000,
      audioBitsPerSecond: 128000
    };
    this.mediaRecorder = new MediaRecorder(stream, options);
    this.mediaRecorder.ondataavailable = e => this.chunks.push(e.data);
    this.mediaRecorder.onstop = e => {
      this.setState({
        blob: new Blob(this.chunks, {type: 'video/webm'})
      });
      this.chunks = [];
    };
    this.mediaRecorder.start();
    this.setState({recording: true});
  }

  handleStop() {
    this.mediaRecorder.stop();
    this.mediaRecorder = null;
    this.setState({recording: false});
  }

  handleDownload() {
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = window.URL.createObjectURL(this.state.blob);
    a.download = 'video.webm';
    document.body.appendChild(a);
    a.click();
    this.setState({blob: null}, () => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(a.url);
    });
  }
}

