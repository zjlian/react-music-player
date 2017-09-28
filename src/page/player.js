import React, {Component} from 'react';
import Buzz from 'buzz';
import { Link } from 'react-router';

import Progress from '../components/progress.js';
import MusicInfo from '../components/musicInfo.js';
import './player.css'


export default
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlay: this.props.currentPlay,
      //当前播放进度的字符串形式 00:20
      progress: '--:--',
      //当前播放进度的秒数形式
      time: 0,
      //当前播放音频的中长度，数值: 秒数
      duration: 0,
      //当前播放进度的百分比形式，数值0到1
      percent: ''
    };
    this.progressChangeHandler = this.progressChangeHandler.bind(this);
    this.setVolumeHandler = this.setVolumeHandler.bind(this);
    this.togglePlayHandler = this.togglePlayHandler.bind(this);
  }

  progressChangeHandler(progress) {
    let music = this.state.currentPlay;
    music.setTime(this.state.duration * progress);
    let classList = this.refs.togglePlay.classList;
    classList.remove('stop');
    classList.add('play');
  }

  setVolumeHandler(e) {
    //let music = this.state.currentPlay;
    this.props.musicGroup.setVolume(e.target.value);
  }

  togglePlayHandler(e) {
    let music = this.state.currentPlay;
    let classList = this.refs.togglePlay.classList;
    this.togglePlayIcon(music, classList);
    music.togglePlay();
  }
  togglePlayIcon(music, classList) {
    classList.toggle('stop');
    classList.toggle('play');
  }


  componentDidMount() {
    let music = this.state.currentPlay;
    music.bind('timeupdate', () => {
      let time = music.getTime();
      let duration = music.getDuration();
      let progress = Buzz.toTimer(music.getTime());
      let percent = Buzz.toPercent(time, duration, 2);

      this.setState({
        progress: progress,
        duration: duration,
        time: time,
        percent: percent
      });
    });
  }

  componentWillUnmount() {
    this.state.currentPlay.unbind('timeupdate');
  }

  render() {
    return (
      <div className="page-player">
        <div className="player-ui">
          <Link to="/list" className="caption">播放列表 &gt;</Link>
          <MusicInfo 
            title={this.props.currentInfo.title}
            singer={this.props.currentInfo.singer}
            cover={this.props.currentInfo.cover} />
            <div className="controls row">
              <span className="previous-music -col-auto"></span>
              <span className="togglePlay play -col-auto" ref="togglePlay"
                    onClick={this.togglePlayHandler}></span>
              <span className="next-music -col-auto"
                    onClick={this.props.onClikcNext}></span>
              <Progress
              progress={this.state.progress}
              duration={this.state.duration}
              percent={this.state.percent}
              onProgressChange={this.progressChangeHandler}/>
              <span className="current-progress  -col-auto">{this.state.progress}</span>
              <span className="set-volume  -col-auto">
                <input type="range" max="100" defaultValue={this.props.currentPlay.getVolume()} onInput={this.setVolumeHandler} />
              </span>
            </div>
        </div>
      </div>
    )
  }
}