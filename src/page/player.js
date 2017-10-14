import React, {Component} from 'react';
import Buzz from 'buzz';
import { Link } from 'react-router';
import Pubsub from 'pubsub-js';

import Progress from '../components/progress.js';
import MusicInfo from '../components/musicInfo.js';
import './player.css'


export default
class Player extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPlay: this.props.currentPlay,
      //当前播放进度的字符串形式
      progress: '00:00',
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
    const music = this.props.currentPlay;
    music.setTime(this.state.duration * progress);

    // let classList = this.refs.togglePlay.classList;
    // if(classList.contains('stop')) {
    //   this.togglePlayIcon(music, classList);
    // }
  }

  setVolumeHandler(e) {
    //let music = this.state.currentPlay;
    this.props.musicGroup.setVolume(e.target.value);
  }

  togglePlayHandler(e) {
    let music = this.props.currentPlay;
    music.togglePlay();
  }
  setPlayIcon() {
    const classList = this.refs.togglePlay.classList;
    classList.remove('stop');
    classList.add('play');
  }
  setPauseIcon() {
    const classList = this.refs.togglePlay.classList;
    classList.remove('play');
    classList.add('stop');
  }
  nextPlay() {
    Pubsub.publish('NEXT_PLAY');
  }
  prevPlay() {
    Pubsub.publish('PREV_PLAY');
  }

  componentDidMount() {
    this.props.musicGroup.bind('timeupdate', () => {
      const music = this.props.currentPlay;
      const time = music.getTime();
      const duration = music.getDuration();
      const progress = Buzz.toTimer(music.getTime());
      const percent = Buzz.toPercent(time, duration, 2);

      this.setState({
        progress: progress,
        duration: duration,
        time: time,
        percent: percent
      });
      if(music.isPaused()) {
        this.setPauseIcon();
      } else {
        this.setPlayIcon();
      }
    });
  }

  componentWillUnmount() {
    this.props.musicGroup.unbind('timeupdate');
  }

  render() {
    return (
      <div className="page-player">
        <div className="player-ui">
          <Link to="/list" className="caption">播放列表 &gt;</Link>
          <MusicInfo 
            name={this.props.currentInfo.name}
            singer={this.props.currentInfo.singer}
            special={this.props.currentInfo.special}
            artistPic={this.props.currentInfo.cover}
          />
            <div className="controls row">
              <span className="previous-music -col-auto"
                    onClick={this.prevPlay}></span>
              <span className="togglePlay -col-auto stop" ref="togglePlay"
                    onClick={this.togglePlayHandler}></span>
              <span className="next-music -col-auto"
                    onClick={this.nextPlay}></span>
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