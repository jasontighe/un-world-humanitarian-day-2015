/* PARTNERS */

import React, { PropTypes } from 'react';
import styles from './Partners.scss';
import withStyles from '../../../decorators/withStyles';
import LazyLoad from 'react-lazy-load';

@withStyles(styles)
class Partners {
  static propTypes = {
    className: PropTypes.string,
    partnerLinks: PropTypes.array,
    content: PropTypes.array,
    partners: PropTypes.string
  };

  render() {
    var logos = this.props.partnerLinks.map((logo, index) => {
      return (
        <div className="small-6 medium-3 large-3 columns logo" key={index}>
          <a href={logo.link} target="_blank">
            <LazyLoad><img src={logo.image} alt={logo.alt} /></LazyLoad>
          </a>
        </div>
      );
    });
    return (
      <div className="Partners module">
        <div className="row">
          <div className="small-12 medium-12 large-12 columns">
            <div className="title">{this.props.partners}</div>
          </div>
        </div>
        <div className="row collapse">
          {logos}
        </div>
      </div>
    );
  }
}

Partners.defaultProps = {
  partnerLinks: []
};

export default Partners;
