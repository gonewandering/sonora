require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

import Current from './Current'
import Volume from './Volume'
import Presets from './Presets'
import Search from './Search'

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">
        <h1>Sonora</h1>
        <Current></Current>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
