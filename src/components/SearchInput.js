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
    this.enterHandler = this.enterHandler.bind(this);
  }

  inputChangeHandler(e) {
    let str = e.target.value;
    this.setState({
      value: str
    });
  }
  enterHandler(e) {
    if(e.keyCode === 13) {
      console.log(this.state.value);
    }
  }

  render() {
    return (
      <div className="SearchInput -col-auto">
        <input
         type="text" placeholder="搜索音乐"
         value={this.state.value}
         onChange={this.inputChangeHandler}
         onKeyUp={this.enterHandler}
        />
        <span
         className="searchBtn"
         onClick={null}
        ></span>
      </div>
    );
  }
}