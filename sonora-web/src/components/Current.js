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
      console.log(data);

      this.setState({
        data: data
      });
    }.bind(this));
  }

  componentDidMount() {
    console.log('this far');
    this.getCurrent.bind(this)();
  }

  render() {
    if (!this.state.data) {
      return (
        <h3>Loading Current...</h3>
      )
    }

    return (
      <div className="index">

      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
