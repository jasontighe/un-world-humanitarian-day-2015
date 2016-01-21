/**
 * Created by jsnptrkti on 8/4/15.
 */
/* CelebrityCell */

import React, { PropTypes } from 'react';
import styles from './CelebrityCell.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class CelebrityCell extends React.Component{
  static propTypes = {
    className: PropTypes.string,
    size: PropTypes.number,
    top: PropTypes.number,
    left: PropTypes.number,
    id: PropTypes.number,
    image: PropTypes.string,
    name: PropTypes.string,
    time: PropTypes.string,
    profileImage: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  render() {
    //console.log('CelebrityCell.render - this.props.size: ', this.props.size );
    //console.log('CelebrityCell.render - this.props.top: ', this.props.top );
    //console.log('CelebrityCell.render - this.props.left: ', this.props.left );
    var idName = 'celebCell' + this.props.id;
    var top = this.props.id * 10;
    var left = this.props.id * 10;
    var divStyle = {
      zIndex: this.props.id,
      width: this.props.size,
      height: this.props.size,
      top: this.props.top,
      left: this.props.left
    };
        return (
              <div id={idName} className="CelebrityCell" style={divStyle}>
                <div className="ratioBox ratio1_1">
                  <div className="ratioContent">
                    <img src={this.props.image} />
                    <div className="overlay">
                      <p className="name">{this.props.name}</p>
                      <p className="time">{this.props.time}</p>
                    </div>

                    <div className="overState fadeAll25">
                      <div className="vertAlign">

                        <img src={this.props.profileImage} />
                        <p className="title">{this.props.title}</p>
                        <p className="desc">{this.props.desc}</p>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
        );
    }
}

CelebrityCell.defaultProps = {
  size: 320
};

export default CelebrityCell;
