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
      currentID: 1,
      currentPlay: null,
      currentInfo: null
    };

    this.musicGroup = new Buzz.group();
    this.buzzList = MUSIC_LIST.map((infos) => {
      let tmp = new Buzz.sound(infos.url);
      this.musicTable[infos.id] = tmp;
      this.itemTable[infos.id] = infos;
      this.musicGroup.add(tmp);
      return tmp;
    });
    this.nextMusicHandler = this.nextMusicHandler.bind(this);
  }

  nextMusicHandler() {
  }

  setMusicPlay(item) {
    console.log(this);
    this.state.currentPlay.stop();
    this.setState({
      currentID: item.id,
      currentInfo: item,
      currentPlay: this.musicTable[item.id]
    });
  }

  updateMusicPlay() {
    //console.log(this.musicGroup.getSounds(), this.state.currentID);
    let music = this.musicTable[this.state.currentID];
    music.play();
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
    let music = this.state.currentPlay;
    music.stop();
    this.state.musicGroup.setVolume(60);

    Pubsub.subscribe('DELETE_MUSIC', (msg, musicItem) => {
      this.setState({
        musicList: this.state.musicList.filter(item => {
          return item !== musicItem;
        })
      });
    });

    Pubsub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
      const item = this.state.musicList.filter(item => {
        return item.id === musicItem.id;
      });
      console.log(item);
      if(item.length !== 0) {
        this.setMusicPlay(item[0]);
      }
    });
    // music.bindOnce('canplay', () => {
    //   music.play();
    // });
  }

  componentWillUnmount() {
    Pubsub.unsubscribe('DELETE_MUSIC');
    Pubsub.unsubscribe('PLAY_MUSIC');
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
