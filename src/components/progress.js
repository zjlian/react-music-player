import React, {Component} from 'react';

import './progress.css';

export default
class Progress extends Component {
  static defaultProps = {
    barColor: 'darkseagreen'
  }
  constructor(props) {
    super(props);

    this.changeProgress = this.changeProgress.bind(this);
  }

  changeProgress(e) {
    let progressBar = this.refs.progressBar;
    //console.log(progressBar);
    let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;
    this.props.onProgressChange(progress);
  }

  render() {
    return (
      <div
        className="component-progress"
        onClick={this.changeProgress}
        ref="progressBar"
      >
        <div
          className="progress"
          style={{
            width: `${this.props.percent}%`,
            backgroundColor: `${this.props.barColor}`
          }}
        >
        </div>
      </div>
    )
  }
}