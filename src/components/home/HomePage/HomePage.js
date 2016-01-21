/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './HomePage.scss';
import withStyles from '../../../decorators/withStyles';
import CelebrityVideo from '../CelebrityVideo';
import HeroCarousel from '../HeroCarousel';
import Counter from '../Counter';
import DonorGrid from '../DonorGrid';
import DonateFeedButton from '../DonateFeedButton';
import VideoPlayer from '../../shared/VideoPlayer';
import EmailSignUp from '../../shared/EmailSignUp';
import Partners from '../Partners';
import helpers from '../../../utils/helpers';
import analytics from '../../../utils/analytics';
import http from 'superagent';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';

@withStyles(styles)
class HomePage extends Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.array,
    getContent: PropTypes.func
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      content: [],
      URL: canUseDOM ? window.location : '',
      viewport: canUseDOM ? {width: window.innerWidth} : { width: 1280 }
    };
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('orientationchange', this.handleResize);
    this.getContent();
    this.handleResize();
  }

  componentWillReceiveProps() {
    console.log('HomePage.componentWillReceiveProps');
  }

  shouldComponentUpdate(nextProps, nextState) {
    //console.log('HomePage.shouldComponentUpdate');
    return true;
  }

  componentWillUnmount() {
    console.log('HomePage.componentWillUnmount');
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('orientationchange', this.handleResize);
  }

  handleResize(e) {
    var gridArea = document.getElementById('gridArea');
    var width = gridArea.offsetWidth;
    this.setState({width: width});
    //this.updateGridComponents();
  }

  getContent() {
    console.log('HomePage.getContent');
    var params = helpers.getPageParamsWithPath(this.props.path);
    var locale = params[2];
    var file = '/json/home-' + locale + '.json';
    console.log('HomePage.getContent - file: ', file);
    http.get(file)
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('HomePage.getContent - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('HomePage.getContent - err: ', err);
        }
        else {
          console.log('HomePage.getContent - JSON LOADED');
          console.log('HomePage.getContent - res: ', res);
          //console.log('HomePage.getContent - res.body.carousel: ', res.body.carousel);
          //console.log('HomePage.getContent - res.body.donorGrid: ', res.body.gridDonorCoords);
          this.setState({content: res.body});
        }
      }.bind(this));
  };

  render() {
    this.context.onSetTitle(this.props.title);
    this.state.content.celebIDFromURL = helpers.getURLParam(this.state.URL, 'v');
    var totalDonors = 0;
    if (typeof (this.state.content.gridDonorCoords) !== 'undefined') {
      totalDonors = this.state.content.gridDonorCoords.length;
    }
    return (
      <div className="HomePage">
        <div className="ContentPage-container">
          <CelebrityVideo celebIDFromURL={this.state.content.celebIDFromURL} celebIDs={this.state.content.celebYoutubeID}/>
          <HeroCarousel carousel={this.state.content.carousel}
                        donateCopy={this.state.content.carouselDonateCopy}
                        followCopy={this.state.content.carouselFollowCopy} />
          <Counter counterDesc={this.state.content.counterDesc}
                   counterHeadline={this.state.content.counterHeadline} />
          <DonorGrid celebrities={this.state.content.gridCelebrities}
                     celebCoords={this.state.content.gridCelebCoords}
                     donorCoords={this.state.content.gridDonorCoords}
                     celebCoordsMobile={this.state.content.gridCelebCoordsMobile}
                     donorCoordsMobile={this.state.content.gridDonorCoordsMobile}
                     width={this.state.width}
                     totalDonors={totalDonors} />
          <DonateFeedButton donateFeedCTA={this.state.content.donateFeedCTA} />
          <VideoPlayer videoYouTubeID={this.state.content.videoYouTubeID} />
          <EmailSignUp emailTitle={this.state.content.emailTitle}
                       emailDesc={this.state.content.emailDesc}
                       emailPlaceholder={this.state.content.emailPlaceholder}
                       emailCTA={this.state.content.emailCTA}
                       emailThankYou={this.state.content.emailThankYou} />
          <Partners partners={this.state.content.partners}
                    partnerLinks={this.state.content.partnerLinks} />
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }

}

export default HomePage;

HomePage.defaultProps = {
  title: 'World Humanitarian Day',
  content: []
};
