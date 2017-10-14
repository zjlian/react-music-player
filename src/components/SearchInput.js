import React, {Component} from 'react';
import Pubsub from 'pubsub-js';

import './SearchInput.css';

export default
class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.searchHandler = this.searchHandler.bind(this);
  }

  inputChangeHandler(e) {
    this.setState({
      value: e.target.value
    });
  }
  searchHandler(e) {
    if((e.keyCode === 13 || e.type === 'click') && this.state.value !== "") {
      this.search(this.state.value);
    }
  }


  search(str) {
    const xhr = new XMLHttpRequest();
    const url = `http://localhost/api/naivemusic.php?&name=${str}`;

    xhr.open("GET", url, true);
    xhr.send();

    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4 && xhr.status === 200) {
        const musicItems = JSON.parse(xhr.responseText);
        Pubsub.publish('DID_SEARCH', musicItems);
      }
    };
  }

  render() {
    return (
      <div className="SearchInput -col-auto">
        <input
         type="text" placeholder="搜索音乐"
         value={this.state.value}
         onChange={this.inputChangeHandler}
         onKeyDown={this.searchHandler}
        />
        <span
         className="searchBtn"
         onClick={this.searchHandler}
        ></span>
      </div>
    );
  }
}