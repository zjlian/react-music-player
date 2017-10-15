import React from 'react';
import Pubsub from 'pubsub-js';
import MusicListItem from '../components/musicListItem.js';

export default
function MusicList(props) {
  let key = 0;
  const List = props.musicList.map((el) => {
    const action = () => {
      Pubsub.publish("PLAY_MUSIC", el);
    };
    return (
      <MusicListItem
        key={key++}
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