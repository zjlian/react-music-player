import React, {Component} from 'react';
import {IndexRoute,
        Router,
        hashHistory,
        Route,
        Link } from 'react-router';
import Buzz from 'buzz';
import Pubsub from 'pubsub-js';

import {SimpleKeyValue} from './util.js';

import Header from './components/header.js';
import Player from './page/player.js';
import MusicList from './page/musicList.js';
import MUSIC_LIST from './config.js';

export
class App extends Component {
  constructor(props) {
    super(props);
    this.musicTable = new SimpleKeyValue();
    this.itemTable = new SimpleKeyValue();
    this.state = {
      musicList: MUSIC_LIST,
      musicGroup: null,
      currentID: MUSIC_LIST[0].id,
      currentPlay: null,
      currentInfo: null
    };

    this.musicGroup = new Buzz.group();
    MUSIC_LIST.map((item) => {
      let tmp = new Buzz.sound(item.url);
      this.musicTable[item.id] = tmp;
      this.itemTable[item.id] = item;
      this.musicGroup.add(tmp);
    });
  }

  getNextItem(type = 'next') {
    const { musicList, currentInfo } = this.state;
    const i = musicList.indexOf(currentInfo);
    let next = '';

    if(type === 'next') {
      next = (i + 1) % musicList.length;
    } else if(type === 'prev') {
      next = i - 1 < 0 ? musicList.length - 1 : i - 1;
    }

    if(i !== -1)
      return musicList[next];

    throw new Error('意外的错误');
  }

  setMusicPlay(item) {
    //先停掉当前播放的音频
    this.state.currentPlay.stop();

    function cb(that) {
      that.state.currentPlay.play();
    }

    this.setState({
      currentID: item.id,
      currentInfo: item,
      currentPlay: this.musicTable[item.id]
    }, cb.bind(this, this));
  }

  //这个方法功能重复
  updateMusicPlay() {
    //console.log(this.musicGroup.getSounds(), this.state.currentID);
    let music = this.musicTable[this.state.currentID];
    this.setState({
      currentPlay: music,
      currentInfo: this.itemTable[this.state.currentID]
    });
  }

  componentWillMount() {
    this.updateMusicPlay();
    this.setState({
      musicGroup: this.musicGroup
    });
  }

  componentDidMount() {
    this.state.musicGroup.setVolume(60);

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      if(musicItem === this.state.currentInfo) {
        const nexrItem = this.getNextItem();
        this.setMusicPlay(nexrItem);
      }
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      });
      delete this.itemTable[musicItem.id];
      delete this.musicTable[musicItem.id];
    });

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      const item = this.state.musicList.filter(item => {
        return item.id === musicItem.id;
      });

      if(item.length !== 0 && item[0] !== this.state.currentInfo) {
        this.setMusicPlay(item[0]);
      }
    });

    Pubsub.subscribe('NEXT_PLAY', (msg) => {
      const item = this.getNextItem();
      this.setMusicPlay(item);
    });
    Pubsub.subscribe('PREV_PLAY', (msg) => {
      const item = this.getNextItem('prev');
      this.setMusicPlay(item);
    });

    this.musicGroup.bind('ended', () => {
      const item = this.getNextItem();
      this.setMusicPlay(item);
    });
  }

  componentWillUnmount() {
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_MUSIC');
    Pubsub.unsubscribe('NEXT_PLAY');
    Pubsub.unsubscribe('PREV_PLAY');
    this.musicGroup.unbind('ended');
  }

  render() {
    return (
      <div>
        <Header />
        {React.cloneElement(this.props.children, this.state)}
      </div>
    );
  }
}

          {/* <Player
            musicGroup={this.musicGroup}
            currentPlay={this.state.currentPlay}
            musicInfo={this.state.currentInfo}
            onClikcNext={this.nextMusicHandler}
          /> */}
          {/* <MusicList
            currentPlayItem={this.state.currentInfo}
            musicList={this.state.musicList}
          ></MusicList> */}

// history={hashHistory}
export default
class Root extends Component {
  render() {
    console.log('root update');
    return (
      <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Player} />
            <Route path="/list" component={MusicList} />
        </Route>
      </Router>
    );
  }
}

const Home = () => (
  <p>Home Page</p>
);
