require('styles/Search.scss');

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

  searchSonos(service, e) {
    e.preventDefault();

    var search = $('.Search .value').val();

    var q = $.ajax({
      method: 'POST',
      url: Config.api + '/play?service=' + service + '&search=' + search
    });
  }

  render() {
    return (
      <div className="Search">
        <form>
          <input className="value" type="text" name="search" placeholder="Search" />
          <button type="submit" name="service" value="Spotify" onClick={ this.searchSonos.bind(this, 'spotify') }>Spotify</button>
          <button type="submit" name="service" value="Tunein" onClick={ this.searchSonos.bind(this, 'tunein') }>Tunein</button>
        </form>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
