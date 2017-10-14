import React, {Component} from 'react';
import Pubsub from 'pubsub-js';


import './musicListItem.css';
import DeleteIcon from '../image/delete.png'


export default
class MusicListItem extends Component {
  // clickHandler(musicItem) {
  //   Pubsub.publish("PLAY_MUSIC", musicItem);
  // }
  deleteItem(musicItem, e) {
    e.stopPropagation();
    Pubsub.publish("DELETE_MUSIC", musicItem);
  }

  render() {
    const item = this.props.item;
    const canNotDelete = this.props.canNotDelete;
    const DeleteBtn = !!canNotDelete ? null : (
      <p
        className="-col-auto delete"
        onClick={this.deleteItem.bind(this, item)}
        style={{backgroundImage: `url(${DeleteIcon})`}}
      ></p>
    );
    
    return (
      <li
        className={`component-musiclist-item row ${this.props.focus ? 'focus' : ''}`}
        onClick={this.props.clickHandler}
      >
        <p>
          {item.name} -
          <span style={{fontWeight: 'lighter', fontSize: '.8em', marginLeft: '.5em'}}>
            {item.singer} - 
            {item.special || "未知专辑"}
          </span>
        </p>
        {DeleteBtn}
      </li>
    );
  }
}