/* COUNTER */

import React, { PropTypes } from 'react';
import styles from './StoriesHero.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class StoriesHero {
  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    handleClick: PropTypes.func,
    network: PropTypes.string,
    bgUrl: PropTypes.string,
    heroCaption: PropTypes.string
  };

  handleClick(index) {
    console.log('handleClick e.target: ', index);
  }

;

  render() {
    var bgStyle = {
      backgroundImage: 'url(' + this.props.bgUrl + ')'
    };

    return (
      <div style={bgStyle} className="StoriesHero module">
        <div className="row">
          <div className="small-12 medium-12 large-12 columns">
            <h1>
                { this.props.title }
            </h1>
          </div>
        </div>
        <div className="caption">{this.props.heroCaption}</div>
      </div>
    );
  }
}

StoriesHero.defaultProps = {
  bgUrl: '',
  heroCaption: '',
  title: 'TITLE HERE',
  desc: 'Story description'
};

export default StoriesHero;
