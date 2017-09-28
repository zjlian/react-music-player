import React, {Component} from 'react';
import { Link } from 'react-router';

import './header.css';
import logoIcon from '../image/logo.png';

export default
class Header extends Component {
  render() {
    return (
      <div className="component-header row">
        <Link className="a-logo -col-ault" to="/"><img src={logoIcon} alt="" className="logo -col-ault"/></Link>
        <h1 className="caption">Naive Music Player</h1>
      </div>
    )
  }
}