/* APP */

import React, { PropTypes } from 'react';
import styles from './App.scss';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import AppActions from '../../actions/AppActions';
import AppStore from '../../stores/AppStore';
import Header from '../shared/Header';
import HomePage from '../home/HomePage';
import DonatePage from '../donate/DonatePage';
import AboutPage from '../about/AboutPage';
import StoryDamascus from '../stories/StoriesPage/StoryDamascus';
import StoryMountainExpress from '../stories/StoriesPage/StoryMountainExpress';
import StorySurvivingNepalQuake from '../stories/StoriesPage/StorySurvivingNepalQuake';
import StoryCircus from '../stories/StoriesPage/StoryCircus';
import StoryWhiteHelmets from '../stories/StoriesPage/StoryWhiteHelmets';
import StorySkateistan from '../stories/StoriesPage/StorySkateistan';
//import ThankYouPage from '../thankyou/ThankYouPage';
import NotFoundPage from '../NotFoundPage';
import Footer from '../shared/Footer';
import http from 'superagent';
import analytics from '../../utils/analytics';

const pages = {
  HomePage,
  DonatePage,
  AboutPage,
  StoryDamascus,
  StoryMountainExpress,
  StorySurvivingNepalQuake,
  StoryCircus,
  StoryWhiteHelmets,
  StorySkateistan,
  //ThankYouPage,
  NotFoundPage
};

@withContext
@withStyles(styles)
class App {

  static propTypes = {
    path: PropTypes.string.isRequired
  };

  componentDidMount() {
    window.addEventListener('popstate', this.handlePopState);

    // trigger analytics on page load
    analytics.init();
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }

  shouldComponentUpdate(nextProps) {
    return this.props.path !== nextProps.path;
  }

  render() {
    let component;
    let page = AppStore.getPage(this.props.path);
    component = page ? React.createElement(pages[page.component], page) : null;

    let pageFound = (
        <div className="container">
            <Header path={this.props.path} />
            {component}
            <Footer path={this.props.path} />
        </div>
    );
    let pageNotFound = (<NotFoundPage />);

    return component ? pageFound : pageNotFound;
  }

  handlePopState(event) {
    AppActions.navigateTo(window.location.pathname, {replace: !!event.state});
  }

}

export default App;
