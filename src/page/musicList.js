import React, {Component} from 'react';
import Pubsub from 'pubsub-js';
import MusicListItem from '../components/musicListItem.js';

export default
function MusicList(props) {
  console.log(props);
  const List = props.musicList.map((el) => {
    const action = () => {
      Pubsub.publish("PLAY_MUSIC", el);
    };
    return (
      <MusicListItem
        key={el.id}
        item={el}
        clickHandler={action.bind(this)}
        focus={props.currentInfo === el}
      />
    );
  });

  return (
    <ul style={{margin: 0, padding: 0}}>
      {List}
    </ul>
  );
}