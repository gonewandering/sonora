require('normalize.css/normalize.css');
require('styles/App.css');

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
        <Search></Search>
        <Controls></Controls>
        <Volume></Volume>
        <Current></Current>
        <Presets></Presets>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
