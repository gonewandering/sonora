require('styles/Presets.scss');

import React from 'react';
import $ from 'jquery';
import Config from '../Config';

class AppComponent extends React.Component {
  constructor() {
    super();

    this.state = {
      preset: {}
    }
  }

  play(options, e) {
    e.preventDefault();

    var q = $.ajax({
      method: 'POST',
      url: Config.api + '/play?service=' + options.service + '&search=' + options.search
    });

    this.setState({
      preset: options
    });
  }

  render() {
    return (
      <div className="Presets">
        <a className="preset" href="" onClick={ this.play.bind(this, {service: 'tunein', search: 'kqed'}) }>KQED</a>
        <a className="preset" href="" onClick={ this.play.bind(this, {service: 'tunein', search: 'wnyc'}) }>WNYC</a>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
