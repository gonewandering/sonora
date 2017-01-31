require('styles/Current.scss');

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
    console.log(Config.api + '/currentTrack');

    var q = $.ajax({
      url: Config.api + '/currentTrack'
    });

    q.then(function (data) {
      if (this.state.data == data) { return; }

      this.setState({
        data: data
      });
    }.bind(this));
  }

  componentDidMount() {
    this.getCurrent.bind(this)();

    window.setInterval(this.getCurrent.bind(this), 3000);
  }

  render() {
    var current = this.state.data.response || {};

    if (!current.title) {
      return (
        <h3>Loading Current...</h3>
      )
    }

    return (
      <div className="Current">
        <h2>{ current.title }</h2>
        <h4>{ current.artist }</h4>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
