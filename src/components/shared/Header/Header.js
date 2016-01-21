/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Header.scss';
import withStyles from '../../../decorators/withStyles';
//import Link from '../../../utils/Link';
import Navigation from '../Navigation';
import helpers from '../../../utils/helpers';
import analytics from '../../../utils/analytics';

@withStyles(styles)
class Header {

  static propTypes = {
    image: PropTypes.string,
    imageAlt: PropTypes.string,
    path: PropTypes.string.isRequired
  };

  handleClick(string) {
    var params = helpers.getPageParams();
    var locale = params[2];
    var url = '/' + locale;

    // trigger analytics for logo before url change
    var analyticsData = {'category': 'header menu', 'action': 'click', 'optlabel': 'world humanitarian day'};
    analytics.customTrackEvent(analyticsData);

    document.location.href = url;
  };

  render() {
    return (
      <div className="Header module">
        <div className="row collapse">
          <div className="small-4 medium-3 large-3 columns">
            <div className="logo">
              <a onClick={this.handleClick.bind(this)} alt="home">
                {this.props.image && <img src={this.props.image} alt={this.props.imageAlt} />}
              </a>
            </div>
          </div>
          <div className="small-4 medium-1 medium-offset-8 large-1 large-offset-8 columns">
            <Navigation path={this.props.path} />
          </div>
        </div>
      </div>
    );
  }

}

Header.defaultProps = {
  image: 'http://res.cloudinary.com/hadpuw6bl/header/logo-unwhd-small.png',
  imageAlt: 'World Humanitarian Day'
};

export default Header;
