import React, {Component} from 'react';

import MusicListItem from '../components/musicListItem.js';

export default
class MusicList extends Component {
  render() {
    let List = null;
    List = this.props.musicList.map((el) => {
      return (
        <MusicListItem
          key={el.id}
          item={el}
          focus={this.props.currentInfo === el}
        />
      );
    });

    return (
      <ul style={{margin: 0, padding: 0}}>
        {List}
      </ul>
    );
  }
}