import React, { PropTypes } from 'react';
import styles from './TwitterFeedButton.scss';
import withStyles from '../../../decorators/withStyles';
import analytics from '../../../utils/analytics';

@withStyles(styles)
class TwitterFeedButton {
  static propTypes = {
    className: PropTypes.string,
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
    var analyticsData = {'category': buttonAnalysticsCategory, 'action': 'click', 'optlabel': 'share twitter feed'};
    analytics.customTrackEvent(analyticsData);

    window.location.href = '/auth/twitter';
  };

  render() {
    var classes = 'button blue TwitterFeedButton donateHeroBtn';
    var isActiveClass = ( this.props.network === this.props.defaultNetwork ) ? ' active' : '';
    classes += isActiveClass;
    //console.log('TwitterFeedButton.render - this.props.network: ', this.props.network);
    //console.log('TwitterFeedButton.render - this.props.defaultNetwork: ', this.props.defaultNetwork);
    //console.log('TwitterFeedButton.render - isActiveClass: ', isActiveClass);

    return (
      <div className={classes} type="button" onClick={this.handleClick.bind(this, 'twitter')}>
          {this.props.copy}
      </div>
    );
  };
}

TwitterFeedButton.defaultProps = {
  defaultNetwork: 'twitter'
};

export default TwitterFeedButton;
