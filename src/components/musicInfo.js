import React, {Component} from 'react';
import './musicInfo.css';

export default
class MusicInfo extends Component {
  static defaultProps = {
    title: '无法获取歌曲名称',
    singer: '无法获取歌手名字',
    cover: 'http://ww1.sinaimg.cn/large/0060lm7Tly1fjw0nb8u7rj30e10e1dh1.jpg'
  }
  render() {
    return (
      <div className="music-info row">
        <div className="info-text">
          <h2 className="music-title">{this.props.title}</h2>
          <h5 className="music-singer">{this.props.singer}</h5>
        </div>
        <div
          className="music-cover -col-auto"
          style={{
            backgroundImage: `url(${this.props.cover})`
          }}></div>
      </div>
    );
  }
}