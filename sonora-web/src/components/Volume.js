require('styles/Volume.scss');

import React from 'react';
import $ from 'jquery';
import Config from '../Config';

class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      data: {}
    }
  }

  getCurrent() {
    var q = $.ajax({
      url: Config.api + '/volume'
    });

    q.then(function (data) {
      console.log(data);

      this.setState({
        data: data,
        volume: Number(data.response)
      });
    }.bind(this));
  }

  componentDidMount() {
    this.getCurrent.bind(this)();
  }

  updateVolume(volume) {
    var q = $.ajax({
      method: 'POST',
      url: Config.api + '/volume?volume=' + volume
    });

    this.setState({
      volume: volume
    });
  }

  handleVolumeSlider(e) {
    var volume = $('.Volume input').val();
    this.updateVolume.bind(this)(volume);
  }

  render() {
    var current = this.state.volume || 0;

    if (!current) {
      return (
        <h3>Loading Volume...</h3>
      )
    }

    var style = {
      width: current + '%'
    };

    return (
      <div className="Volume">
        <input type="range" min="0" max="60" value={ current } onChange={ this.handleVolumeSlider.bind(this) } />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
