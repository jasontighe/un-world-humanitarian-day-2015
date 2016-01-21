/* CONTACT PAGE */

import React, { PropTypes } from 'react';
import styles from './MessageCount.scss';
import withStyles from '../../../decorators/withStyles';
import http from 'superagent';

@withStyles(styles)
class MessageCount {

  static propTypes = {
    count: PropTypes.number
  };

  static defaultProps = {
  };

  componentDidMount() {
    console.log('MessageCount.componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('MessageCount.shouldComponentUpdate');
      return true;
  }

    componentWillUnmount() {
        console.log('MessageCount.componentWillUnmount');
    }

  render() {
      console.log('MessageCount.componentWillUnmount - this.props.count: ', this.props.count);
      console.log('MessageCount.componentWillUnmount - this.props: ', this.props);

    return (
      <div className="MessageCount">
        <p>{this.props.count}</p>
      </div>
    );
  }
}

export default MessageCount;
