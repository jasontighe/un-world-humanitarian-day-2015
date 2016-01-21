/**
 * Created by jsnptrkti on 8/4/15.
 */
/* DonorCell */

import React, { PropTypes } from 'react';
import styles from './DonorCell.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class DonorCell extends React.Component{
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    id: PropTypes.number,
    namesArr: PropTypes.array,
    name: PropTypes.string,
    willAnimate: PropTypes.boolean,
    //nextName: PropTypes.array,
    time: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('DonorCell.componentDidMount');
    //if( this.props.willAnimate ) {
    //  console.log('DonorCell.componentDidMount');
    //  var overlayId = 'overlay' + this.props.id;
    //  document.getElementById(overlayId).removeAttribute('offsetLeft');
    //  console.log('DonorCell.componentDidMount - document.getElementById(overlayId): ', document.getElementById(overlayId) );
    //}
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    //console.log('DonorCell.render - this.props.size: ', this.props.size );
    //console.log('DonorCell.render - this.props.top: ', this.props.top );
    //console.log('DonorCell.render - this.props.left: ', this.props.left );
    ////if(this.props.willAnimate) {
      ////console.log('DonorCell.render - WILL ANIMATE this.props.name: ', this.props.name );
    ////}
    var idName = 'donorCell' + this.props.id;
    var top = this.props.id * 10;
    var left = this.props.id * 10;
    var divStyle = {
      zIndex: this.props.id,
      width: this.props.size,
      height: this.props.size,
      top: this.props.top,
      left: this.props.left
    };

    // KEEP IN CASE THEY WANT EACH NAME TO BE ON SEPARATE LINE
    //var nameSplit = this.props.namesArr.map((name, index) => {
    //  return (
    //    <p className="name" key={index}>{name}</p>
    //  );
    //});
    var overlayId = 'overlay' + this.props.id;
    var classes = 'overlay fadeAll25';
    if( this.props.willAnimate === true ) {
      classes += ' offsetLeft';
    }

    return (
      <div id={idName} className="DonorCell" style={divStyle}>
        <div className="ratioBox ratio1_1">
          <div className="ratioContent">
            <div id={overlayId} className={classes}>
              <div className="vertAlign">
                <p className="name" >{this.props.name}</p>
                <p className="time">{this.props.time}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DonorCell.defaultProps = {
  size: 160,
  namesArr: [],
  willAnimate: false
};

export default DonorCell;
