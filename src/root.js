import React, {Component} from 'react';
import {IndexRoute,
        Router, 
        hashHistory, 
        Route, 
        Link } from 'react-router';

import Buzz from 'buzz';

import Header from './components/header.js';
import Player from './page/player.js';
import MusicList from './page/musicList.js';
import MUSIC_LIST from './config.js'

export
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      musicList: MUSIC_LIST,
      musicGroup: null,
      currentID: 1,
      currentPlay: null,
      currentInfo: null
    };
    this.musicGroup = new Buzz.group();
    this.buzzList = MUSIC_LIST.map((infos) => {
      let tmp = new Buzz.sound(infos.url);
      this.musicGroup.add(tmp);
      return tmp;
    });
    this.nextMusicHandler = this.nextMusicHandler.bind(this);
   }

   nextMusicHandler() {
    let id = this.state.currentID;
    //id进一位并对，音乐列表的len取模
    id = (++id) % MUSIC_LIST.length;
    this.setState(
      (prev, props) => {
        prev.currentPlay.stop();
        return { currentID: id };
      },
      () => {
        this.updateMusicPlay();
      }
    );
   }

   updateMusicPlay() {
    //console.log(this.musicGroup.getSounds(), this.state.currentID);
    let music = this.musicGroup.getSounds()[this.state.currentID];
    music.play();
    this.setState({
      currentPlay: music,
      currentInfo: MUSIC_LIST[this.state.currentID]
    });
   }

  componentWillMount() {
    this.updateMusicPlay();
    this.setState({
      musicGroup: this.musicGroup
    });
  }

  componentDidMount() {
    let music = this.state.currentPlay;
    music.setVolume(60);
    music.bindOnce('canplay', () => {
      music.play();
    });
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children && React.cloneElement(this.props.children, this.state)}
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
