/* CONTACT PAGE */

import React, { PropTypes, Component } from 'react';
import styles from './ResizeHandler.scss';
import withStyles from '../../../decorators/withStyles';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';

@withStyles(styles)
class ResizeHandler extends Component {

  // variables
  static propTypes = {
    handleResize: PropTypes.func
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      viewport: canUseDOM ?
      {width: window.innerWidth} :
      {width: 1280}, // Default size for server-side rendering
      celebSize: null,
      donorSize: null
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    console.log('ResizeHandler.componentDidMount');
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
  }

  componentWillReceiveProps() {
    console.log('ResizeHandler.componentWillReceiveProps');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('ResizeHandler.shouldComponentUpdate');
    return true;
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
  }

  conponentWillMount() {
    console.log('ResizeHandler.conponentWillMount');
    this.handleResize();
  }

  handleResize(e) {
    var gridTest = document.getElementById('gridTest');
    //console.log('ResizeHandler.updateDimensions - gridTest: ', gridTest);
    //console.log('ResizeHandler.handleResize - gridTest.offsetWidth: ', gridTest.offsetWidth);
    var width = gridTest.offsetWidth;
    this.setState({width: width});
    this.updateGridComponents();
  }

  updateGridComponents() {
    //console.log('ResizeHandler.updateGridComponents');
    var celebSize = this.state.width / 4;
    var donorSize = this.state.width / 8;
    this.setState({
      celebSize: celebSize,
      donorSize: donorSize
    });
  }

  render() {
    //console.log('ResizeHandler.render');
    let title = 'Resize Handler';
    this.context.onSetTitle(title);

    return (
      <div className="ResizeHandler">
        <div className="row">
          <div id="gridTest" className="small-12 medium-12 large-12" >
            <h1>{title}</h1>
          </div>
        </div>
        <div className="row">
          <div id="gridTest" className="small-12 medium-12 large-12">
            <h2>Grid width: {this.state.width}</h2><br />
            <h2>Celeb size: {this.state.celebSize}</h2><br />
            <h2>Donor size: {this.state.donorSize}</h2><br />
          </div>
        </div>
      </div>
    );
  }
}

export default ResizeHandler;
