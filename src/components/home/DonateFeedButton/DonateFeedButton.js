/* DONATE FEED BUTTON */

import React, { PropTypes } from 'react';
import styles from './DonateFeedButton.scss';
import withStyles from '../../../decorators/withStyles';
import Link from '../../../utils/Link';
import helpers from '../../../utils/helpers';
import analytics from '../../../utils/analytics';

@withStyles(styles)
class DonateFeedButton {
  static propTypes = {
    className: PropTypes.string,
    link: PropTypes.string,
    donateFeedCTA: PropTypes.string
  };

  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}

  handleClick(string) {
    var params = helpers.getPageParams();
    var locale = params[2];
    var url = this.props.link + locale;

    // trigger analytics before url change
    var analyticsData = {'category': 'celebrity collage', 'action': 'click', 'optlabel': 'donate your feed'};
    analytics.customTrackEvent(analyticsData);

    document.location.href = url;
  };

  render() {
    return (
      <div className="DonateFeedButton module">
        <div className="row">
          <div className="small-12 medium-12 large-4 columns small-centered medium-centered large-centered">
            <div className="button blue" onClick={this.handleClick.bind(this)}>
              {this.props.donateFeedCTA}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DonateFeedButton.defaultProps = {
  //desc: 'Donate Your Feed',
  link: '/donate/'
};

export default DonateFeedButton;
