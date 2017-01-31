require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

import Current from './Current'
import Volume from './Volume'
import Presets from './Presets'
import Search from './Search'
import Controls from './Controls'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="Index">
        <div className="Title">
          <h3>SONORA</h3>
        </div>
        <Volume></Volume>
        <Current></Current>
        <Search></Search>
        <Controls></Controls>
        <Presets></Presets>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
