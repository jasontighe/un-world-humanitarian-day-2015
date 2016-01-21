/**
 * Created by jsnptrkti on 8/12/15.
 */
/**
 * Created by jsnptrkti on 8/8/15.
 */
/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ThankYouPage.scss';
import withStyles from '../../../decorators/withStyles';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';
import FacebookFeedButton from '../../donate/FacebookFeedButton';
import TwiiterFeedButton from '../../donate/TwiiterFeedButton';
import WeiboFeedButton from '../../donate/WeiboFeedButton';
import EmailSignUp from '../../shared/EmailSignUp';
import http from 'superagent';
import helpers from '../../../utils/helpers';


@withStyles(styles)
class ThankYouPage extends Component {
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
    console.log('ThankYouPage.componentDidMount');
    this.getContent();
  }

  getContent() {
    var params = helpers.getPageParamsWithPath(this.props.path);
    var locale = params[2];
    //console.log('ThankYouPage.getContent - params: ' + params);
    //console.log('ThankYouPage.getContent - locale: ' + locale);
    var file = '/json/thankyou-' + locale + '.json';
    console.log('File: ' + file);
    http.get(file)
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('ThankYouPage.getContent - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('ThankYouPage.getContent - err: ', err);
        }
        else {
          this.setState({content: res.body});

        }
      }.bind(this));
  };

  handleClick(string) {
    console.log('ThankYouPage.handleClick string: ', string);
    if( this.props.network === this.props.defaultNetwork ) {
      return;
    }
    //window.location.href = `/auth/${string}}`;
  };


  render() {
    console.log( 'ThankYouPage.render - this.state.content: ', this.state.content );
    var params = helpers.getPageParamsWithPath(this.props.path);
    var locale = params[2];
    var buttons;
    if( locale === 'zh') {
      buttons = <WeiboFeedButton network={this.props.network} language={this.props.language} copy={this.props.weiboCopy} isThankYou={this.props.isThankYou}/>;
    }
    else {
      buttons = <div> <FacebookFeedButton network={this.props.network} language={this.props.language} copy={this.props.facebookCopy} isThankYou={this.props.isThankYou}/><TwiiterFeedButton network={this.props.network} copy={this.props.twitterCopy} language={this.props.language} isThankYou={this.props.isThankYou}/></div>;
    }

    return (
      <div className="ThankYouPage">
        <div className="ContentPage-container">
          <div className="row collapse title-row">
            <div className="small-12 medium-12 large-12 columns">
              <h1>THANK YOU TITLE</h1>
              <p>Thank you description.</p>
              {buttons}
            </div>
          </div>
          <div className="row content">
            <div className="large-6 columns">
              <p>THANK YOU BODY</p>
              <EmailSignUp emailTitle={this.state.content.emailTitle}
                           emailDesc={this.state.content.emailDesc}
                           emailPlaceholder={this.state.content.emailPlaceholder}
                           emailCTA={this.state.content.emailCTA}
                           emailThankYou={this.state.content.emailThankYou} />
            </div>
          </div>
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }
}

export default ThankYouPage;

ThankYouPage.defaultProps = {
  title: 'World Humanitarian Day'
};
