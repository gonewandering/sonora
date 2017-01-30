require('styles/Controls.scss');

import React from 'react';
import $ from 'jquery';
import Config from '../Config';

class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      play: true
    }
  }

  change(option, e) {
    e.preventDefault();

    var q = $.ajax({
      method: 'POST',
      url: Config.api + '/' + option
    });

    if (option == 'play' || option == 'pause') {
      this.setState({
        play: !this.state.play
      });
    }
  }

  render() {
    var pausePlay = (<a className="control play" href="" onClick={ this.change.bind(this, 'play') }><i className="fa fa-play"></i></a>);

    if (this.state.play) {
      pausePlay = (<a className="control pause" href="" onClick={ this.change.bind(this, 'pause') }><i className="fa fa-pause"></i></a>);
    }

    return (
      <div className="Controls">
        <a className="control previous" href="" onClick={ this.change.bind(this, 'previous') }><i className="fa fa-backward"></i></a>
        { pausePlay }
        <a className="control next" href="" onClick={ this.change.bind(this, 'next') }><i className="fa fa-forward"></i></a>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
