/* THANK YOU FOR DONATING */

import React, { PropTypes } from 'react';
import styles from './ThankYouForDonating.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class ThankYouForDonating {
  static propTypes = {
    className: PropTypes.string,
    thankYouTitle: PropTypes.string,
    thankYouCta: PropTypes.string,
    language: PropTypes.string,
    network: PropTypes.string
  };

  componentWillMount() {
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  onSubmit() {
    window.location = `/`;
  }

  render() {
    console.log('ThankYouForDonating.render -  this.props.network: ', this.props.thankYouTitle);
    console.log('ThankYouForDonating.render -  this.props.language: ', this.props.thankYouCta);

    return (
      <div className="ThankYouForDonating module">
        <div className="row">
          <div className="small-12 medium-12 large-12 columns">
            <h3>{this.props.thankYouTitle}</h3>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-12 large-12 large-centered columns">
            <div className="button blue large-centered" onClick={this.onSubmit.bind(this)}>
              {this.props.thankYouCta}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-12 large-12 columns">
            <hr />
          </div>
        </div>
      </div>
    );
  }
}

//ThankYouForDonating.defaultProps = {
//  title: 'Thank you for donating your feed',
//  desc: 'Share your donation',
//  cta: 'follow more stories'
//};

export default ThankYouForDonating;
