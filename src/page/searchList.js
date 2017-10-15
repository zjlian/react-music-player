import React from 'react';
import Pubsub from 'pubsub-js';
import MusicListItem from '../components/musicListItem.js';

export default
function MusicList(props) {
  let List = null;
  if(!!props.searchReaultList) {
    let key = 0;
    List = props.searchReaultList.map((el) => {
      const action = () => {
        Pubsub.publish("ADD_MUSIC", el);
      };
      return (
        <MusicListItem
          key={key++}
          item={el}
          clickHandler={action.bind(this)}
          focus={props.currentInfo === el}
          canNotDelete={true}
        />
      );
    });
  }

  return (
    <ul style={{margin: 0, padding: 0}}>
      {List}
    </ul>
  );
}