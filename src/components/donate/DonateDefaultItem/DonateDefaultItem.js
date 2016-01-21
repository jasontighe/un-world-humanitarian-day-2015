/* DONATE DEFAULT ITEM */

import React, { PropTypes } from 'react';
import styles from './DonateDefaultItem.scss';
import withStyles from '../../../decorators/withStyles';
import http from 'superagent';
import LazyLoad from 'react-lazy-load';

@withStyles(styles)
class DonateDefaultItem {
  static propTypes = {
    className: PropTypes.string,
    image: PropTypes.string,
    text: PropTypes.string,
    storyId: PropTypes.number,
    id: PropTypes.number,
    checked: PropTypes.func
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  checkHandler(e) {
    console.log('DonateDefaultItem.checkHandler e: ', e.target.value);
  }

  render() {

    var messageId = 'message' + this.props.id;
    var messageCopy = 'messageCopy' + this.props.id;

    return (
      <li className="DonateDefaultItem">
        <div className="row collapse">
          <div className="small-1 medium-1 large-1 columns">
            <input type="checkbox" name="story" className="storyCheckbox" storyId={this.props.storyId} messageId={this.props.id} value={this.props.id} defaultChecked="true" onChange={this.checkHandler} />
          </div>
          <div className="small-11 medium-11 large-11 columns">
            <p id={messageCopy} className="desc">{this.props.text}</p>
            <LazyLoad><img src={this.props.image} /></LazyLoad>
          </div>
        </div>
      </li>
    );
  }
}

export default DonateDefaultItem;
