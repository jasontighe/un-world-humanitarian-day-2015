/* NAVIGATION */

import React, { PropTypes } from 'react';
import Dropdown from 'react-dropdown';
//import classNames from 'classnames';
import styles from './Navigation.scss';
import withStyles from '../../../decorators/withStyles';
import helpers from '../../../utils/helpers';
import analytics from '../../../utils/analytics';

@withStyles(styles)
class Navigation {

  static propTypes = {
    className: PropTypes.string,
    options: PropTypes.array,
    path: PropTypes.string,
    storyPaths: PropTypes.array,
    getCurrentPaths: PropTypes.func
  };

  componentDidMount() {
    this.setVisibilty();
  }

  setVisibilty() {
    var path = document.location.pathname;
    for( var i = 0; i < this.props.storyPaths.length; i++ ) {
      if( path.indexOf(this.props.storyPaths[i]) > -1){
        document.getElementById('languageNav').classList.add('notVisible');
        return;
      }
      else {
        document.getElementById('languageNav').classList.remove('notVisible');
      }
    }
  }

  onSelect(option) {
    var selectedLocal = option.label;
    var params = helpers.getPageParams();
    var paths = params[0];
    var section = params[1];
    var locale = params[2];
    //console.log('Navigation.getCurrentPath - locale: ', locale);
    var spliceIndex = (section === '' ) ? 1 : 2;
    //console.log('Navigation.getCurrentPath - spliceIndex: ', spliceIndex);
    paths.splice(spliceIndex, 1, selectedLocal);
    var newPath = paths.join('/');
    var url = window.location.origin + newPath;
    //console.log('Navigation.onSelect - newPath: ', newPath);
    //console.log('Navigation.onSelect - url: ', url);

    // trigger analytics before url change
    var analyticsData = {'category': 'header menu', 'action': 'click', 'optlabel': locale};
    analytics.customTrackEvent(analyticsData);

    window.location = url;
  };

  render() {
    //var params = helpers.getDonateParams(this.props.path);
    //var language = ( params[0] === '') ? 'en' : params[0];
    var params = helpers.getPageParamsWithPath(this.props.path);
    var locale = params[2];

    var defaultOption = { value: locale, label: locale };
    var options = this.props.options;

    return (
      <nav id="languageNav" className="Navigation notVisible">
        <Dropdown options={options} onChange={this.onSelect.bind(this)} value={defaultOption}/>
      </nav>
    );
  }
}

Navigation.defaultProps = {
  options: [
    { value: 'en', label: 'en' },
    { value: 'fr', label: 'fr' },
    { value: 'es', label: 'es' },
    { value: 'ar', label: 'ar' }
  ],
  storyPaths: [ 'damascus', 'trekking', 'surviving', 'circus', 'whitehelmets', 'skateistan' ]
};

export default Navigation;
