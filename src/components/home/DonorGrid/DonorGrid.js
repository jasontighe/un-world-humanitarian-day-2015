/* DONATE GRID */

import React, { PropTypes, Component } from 'react';
import styles from './DonorGrid.scss';
import withStyles from '../../../decorators/withStyles';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import CelebrityCell from '../CelebrityCell';
import DonorCell from '../DonorCell';
import http from 'superagent';
import helpers from '../../../utils/helpers';

@withStyles(styles)
class DonorGrid extends Component {
  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.array,
    donors: PropTypes.array,
    handleResize: PropTypes.func,
    celebCoords: PropTypes.array,
    donorCoords: PropTypes.array,
    celebCoordsMobile: PropTypes.array,
    donorCoordsMobile: PropTypes.array,
    getLatestUsers: PropTypes.func,
    celebrities: PropTypes.array,
    width: PropTypes.number,
    mobileBreakpoint: PropTypes.number,
    minTime: PropTypes.number,
    maxTime: PropTypes.number,
    minIntroTime: PropTypes.number,
    maxIntroTime: PropTypes.number,
    totalDonors: PropTypes.number,
    timeActive: PropTypes.boolean
  };

  constructor(props) {
    super(props);
    this.state = {
      latestUsers: [],
      currentUsers: [],
      currentOffset: -1,
      latestOffset: null,
      nextName: ''
    };
  }

  componentDidMount() {
    console.log('DonorGrid.componentDidMount - this.props.donorCoords.length: ', this.props.donorCoords.length );
    this.getLatestUsers();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  componentWillUnmount() {
    this.props.timeActive = false;
  }

  getLatestUsers() {
    //console.log('DonorGrid.getLatestUsers');
    http.get('/api/latestusers')
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('DonorGrid.getLatestUsers - 404 err: ', err);
        }
        else if (err) {
          console.log('DonorGrid.getLatestUsers - err: ', err);
        }
        else {
          this.setState({
            latestUsers: this.state.latestUsers.concat(res.body.slice(0, res.body.length)),
            currentUsers: this.state.latestUsers.slice(0, this.props.totalDonors),
            latestOffset: this.props.totalDonors
          });
          this.startTimer();
        }
      }.bind(this));
  }

  startTimer() {
    if( this.props.timeActive ) {
      var minTime = (this.state.latestOffset <= 16 ) ? this.props.minIntroTime : this.props.minTime;
      var maxTime = (this.state.latestOffset <= 16 ) ? this.props.maxIntroTime : this.props.maxTime;


      var time = ( Math.random() * maxTime ) + minTime;
      setTimeout(() => {
        this.updateName();
      }, time);
    }
  }

  updateName() {
    ////console.log('DonorGrid.updateName - total: ', this.state.latestUsers.length);
    if( this.state.latestOffset < this.state.latestUsers.length ) {
      ////console.log('DonorGrid.updateName - UPDATE');
      var nextUser = this.state.latestUsers[this.state.latestOffset];
      //console.log('DonorGrid.updateName - this.state.latestOffset: ', this.state.latestOffset);

      /* Update current users by splicing array at currentOffset */
      var currentOffset = ( (this.state.currentOffset + 1 ) > this.props.totalDonors - 1) ? 0 : this.state.currentOffset + 1;
      this.state.currentUsers.splice(this.state.currentOffset, 1, nextUser);
      this.state.latestUsers.splice(this.state.currentOffset, 1, nextUser);
      this.setState({
        currentOffset: currentOffset,
        latestOffset: this.state.latestOffset + 1
      });

      this.startTimer();
    }
    else {
      this.getLatestUsers();
    }
  }

  getGridRatio(){
   var ratio = ( this.props.width > this.props.mobileBreakpoint ) ? 'ratio8_5' : 'ratio3_7';
    return ratio;
  }

  render() {
    var celebCols = ( this.props.width > this.props.mobileBreakpoint ) ? 4 : 3;
    var donorCols = ( this.props.width > this.props.mobileBreakpoint ) ? 8 : 3;
    var totalCols = ( this.props.width > this.props.mobileBreakpoint ) ? 8 : 3;
    var totalRows = ( this.props.width > this.props.mobileBreakpoint ) ? 5 : 7;

    var celebSize = this.props.width / celebCols;
    var donorSize = this.props.width / donorCols;

    var celebCoords = [];
    var xPos;
    var yPos;
    var ratio = ( this.props.width > this.props.mobileBreakpoint ) ? 0.625 : 2.33;
    var height = this.props.width * ratio;
    var deviceCelebCoords = ( this.props.width > this.props.mobileBreakpoint ) ? this.props.celebCoords : this.props.celebCoordsMobile;
    deviceCelebCoords.map((coordinate, index) => {
      xPos = ( coordinate.x / totalCols ) * this.props.width;
      yPos = ( coordinate.y / totalRows ) * height;
      celebCoords.push({ x: xPos, y: yPos });
    });

    var celebrityCells = this.props.celebrities.map((person, index) => {
      return (
          <CelebrityCell size={celebSize}
                         key={index}
                         id={index}
                         top={celebCoords[index].y}
                         left={celebCoords[index].x}
                         image={person.backgroundImage}
                         name={person.name}
                         time={person.time}
                         profileImage={person.profileImage}
                         title={person.title}
                         desc={person.desc} />
      );
    });

    var donorCoords = [];
    var deviceDonorCoords = ( this.props.width > this.props.mobileBreakpoint ) ? this.props.donorCoords : this.props.donorCoordsMobile;
    deviceDonorCoords.map((coordinate, index) => {
      xPos = ( coordinate.x / totalCols ) * this.props.width;
      yPos = ( coordinate.y / totalRows ) * height;
      donorCoords.push({ x: xPos, y: yPos });
    });

    var donorCells = this.state.currentUsers.map((person, index) => {
    var namesArr = person.givenName.split(' ');
    var willAnimate = (this.state.currentOffset - 1 === index ) ? true : false;
    return (
        <DonorCell size={donorSize}
                   key={index}
                   id={index}
                   top={donorCoords[index].y}
                   left={donorCoords[index].x}
                   name={person.givenName}
                   namesArr={namesArr}
                   time={person.createdAt}
                   willAnimate={willAnimate} />
      );
    });
    var id = 'donorGrid' + this.state.currentOffset;
    var classes = 'ratioBox';
    classes += ' ' + this.getGridRatio();

    return (
      <div className="DonorGrid module" id={id} >
        <div className="row collapse">
          <div id="gridArea" className="small-12 medium-12 large-12">
            <div className={classes}>
              <div className="ratioContent">
                {celebrityCells}
                {donorCells}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

DonorGrid.defaultProps = {
  donateCopy: 'Donate Your Feed',
  dontateUrl: 'dontate',
  celebrities: [],
  celebCoords: [],
  celebCoordsMobile: [],
  donorCoordsMobile: [],
  totalDonors: 0,
  donorCoords: [],
  minTime: 1600,
  maxTime: 5000,
  minIntroTime: 50,
  maxIntroTime: 250,
  mobileBreakpoint: 768,
  timeActive: true
};

export default DonorGrid;
