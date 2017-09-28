import React, {Component} from 'react';
import Pubsub from 'pubsub-js';


import './musicListItem.css';
import DeleteIcon from '../image/delete.png'


export default
class MusicListItem extends Component {
  playMusic(musicItem) {

  }
  deleteItem(musicItem) {
    
  }

  render() {
    let item = this.props.item;
    return (
      <li
        className={`component-musiclist-item row ${this.props.focus ? 'focus' : ''}`}
        onClick={this.playMusic.bind(this, item)}
      >
        <p>
          {item.title} -
          <span style={{fontWeight: 'lighter', fontSize: '.8em', marginLeft: '.5em'}}>
            {item.singer}
          </span>
        </p>
        <p
          className="-col-auto delete"
          onClick={this.deleteItem.bind(this, item)}
          style={{backgroundImage: `url(${DeleteIcon})`}}
        ></p>
      </li>
    );
  }
}