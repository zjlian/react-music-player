import React, {Component} from 'react';
import { Link } from 'react-router';

import './header.css';
import logoIcon from '../image/logo.png';
import SearchInput from './SearchInput.js';

export default
class Header extends Component {
  render() {
    return (
      <div className="component-header row">
        <Link className="a-logo -col-auto" to="/">
          <img src={logoIcon} alt="" className="logo -col-auto"/>
        </Link>
        <h1 className="caption -col7">Naive Music Player</h1>
        <SearchInput />
      </div>
    )
  }
}