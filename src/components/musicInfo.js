import React, {Component} from 'react';
import './musicInfo.css';


// class MusicInfo extends Component {
//   render() {
//     return (
//       <div className="music-info row">
//         <div className="info-text">
//           <h2 className="music-title">{this.props.title}</h2>
//           <h5 className="music-singer">{this.props.singer}</h5>
//         </div>
//         <div
//           className="music-cover -col-auto"
//           style={{
//             backgroundImage: `url(${this.props.cover})`
//           }}></div>
//       </div>
//     );
//   }
// }
export default
function MusicInfo(props) {
  return (
    <div className="music-info row">
      <div className="info-text">
        <h2 className="music-title">
          {props.name || '无法获取歌曲名称'}
        </h2>
        <h5 className="music-singer">
          {props.singer || '无法获取歌手名字'}
          <span className="special">专辑：{props.special || '未知'}</span>
        </h5>
      </div>
      <div
        className="music-cover -col-auto"
        style={{
          backgroundImage: `url(${props.artistPic})`
        }}></div>
    </div>
  );
}