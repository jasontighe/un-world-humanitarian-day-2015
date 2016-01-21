/**
 * Created by jsnptrkti on 8/8/15.
 */
/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './AboutPage.scss';
import withStyles from '../../../decorators/withStyles';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import http from 'superagent';
import helpers from '../../../utils/helpers';

@withStyles(styles)
class AboutPage extends Component {

  static propTypes = {
    path: PropTypes.string.isRequired,
    title: PropTypes.string,
    content: PropTypes.array
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      content: [],
      URL: canUseDOM ? window.location : ''
    };
  }

  componentDidMount() {
    console.log('AboutPage.componentDidMount');
    this.getContent();
  }

  getContent() {
    var params = helpers.getPageParamsWithPath(this.props.path);
    var locale = params[2];
    //console.log('AboutPage.getContent - params: ' + params);
    //console.log('AboutPage.getContent - locale: ' + locale);
    var file = '/json/about-' + locale + '.json';
    console.log('File: ' + file);
    http.get(file)
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('AboutPage.getContent - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('AboutPage.getContent - err: ', err);
        }
        else {
          this.setState({content: res.body});

        }
      }.bind(this));
  };


  render() {
    this.context.onSetTitle(this.props.title);
    console.log( 'this.state.content' );
    console.log( this.state.content );

    return (
      <div className="AboutPage">
        <div className="ContentPage-container">
          <div className="row collapse about-title-row">
            <div className="small-12 medium-12 large-12 columns">
              <h1>{this.state.content.aboutPageTitle}</h1>
            </div>
          </div>
          <div className="row about-content">
            <div className="large-6 columns">
              <p>{this.state.content.column1Copy}</p>
            </div>
            <div className="large-6 columns">
              <p>{this.state.content.column2Copy}</p>
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }
}

export default AboutPage;

AboutPage.defaultProps = {
    title: 'World Humanitarian Day'
};
