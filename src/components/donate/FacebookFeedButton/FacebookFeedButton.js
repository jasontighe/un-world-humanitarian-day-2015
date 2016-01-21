import React, { PropTypes } from 'react';
import styles from './FacebookFeedButton.scss';
import withStyles from '../../../decorators/withStyles';
import analytics from '../../../utils/analytics';

@withStyles(styles)
class FacebookFeedButton {
  static propTypes = {
    className: PropTypes.string,
    handleClick: PropTypes.func,
    language: PropTypes.string,
    network: PropTypes.string,
    copy: PropTypes.string,
    defaultNetwork: PropTypes.string,
    isThankYou: PropTypes.bool
  };

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

  handleClick(string) {
    //console.log('handleClick string: ', string);
    if( this.props.network === this.props.defaultNetwork ) {
      return;
    }

    // trigger analytics before url change
    var buttonAnalysticsCategory = this.props.isThankYou ? 'thank you page' : 'sharing page';
    var analyticsData = {'category': buttonAnalysticsCategory, 'action': 'click', 'optlabel': 'share facebook feed'};
    analytics.customTrackEvent(analyticsData);

    window.location.href = '/auth/facebook';
  };

  render() {
    var classes = 'button blue FacebookFeedButton donateHeroBtn';
    var isActiveClass = ( this.props.network === this.props.defaultNetwork ) ? ' active' : '';
    classes += isActiveClass;
    return (
      <div className={classes} type="button" onClick={this.handleClick.bind(this, 'facebook')}>
          {this.props.copy}
      </div>
    );
  };
}

FacebookFeedButton.defaultProps = {
    defaultNetwork: 'facebook'
};

export default FacebookFeedButton;
