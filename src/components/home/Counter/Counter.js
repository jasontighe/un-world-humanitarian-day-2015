/* COUNTER */

import React, { PropTypes } from 'react';
import styles from './Counter.scss';
import withStyles from '../../../decorators/withStyles';
import http from 'superagent';

@withStyles(styles)
class Counter extends React.Component{
  static propTypes = {
    className: PropTypes.string,
    count: PropTypes.number,
    counterDesc: PropTypes.string,
    counterHeadline: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      count: null
    };
  }

  componentDidMount() {
    http
      .get('/api/messagecount')
      .end(function(err, res){
        if (res) {
          //console.log('Counter.componentWillMount - res: ', res);
          this.setState({count: res.body.count});
        }
        else if( err ){
          console.log('Counter.componentWillMount - err ', err);
        }
      }.bind(this));
  }


  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    return (
      <div className="Counter module">
        <div className="row">
          <div className="small-12 medium-5 large-5 columns">
            <div className="count">
              <h3>{this.state.count}</h3>
              <p className="title">{this.props.counterDesc}</p>
            </div>
          </div>
          <div className="small-10 small-offset-1 medium-7 large-6 end columns">
            <p className="desc">{this.props.counterHeadline}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Counter;
