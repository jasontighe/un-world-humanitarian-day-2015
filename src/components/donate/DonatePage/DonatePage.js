/* SOCIAL PAGE */

import React, { PropTypes } from 'react';
import DonateHero from '../DonateHero';
import DonatePostMenu from '../DonatePostMenu';
import DonateError from '../DonateError';
import ThankYouForDonating from '../ThankYouForDonating';
import EmailSignUp from '../../shared/EmailSignUp';
import styles from './DonatePage.scss';
import withStyles from '../../../decorators/withStyles';
import helpers from '../../../utils/helpers';
import http from 'superagent';

@withStyles(styles)
class DonatePage extends React.Component {
  static propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.array,
    language: PropTypes.string,
    network: PropTypes.string,
    emailCTA: PropTypes.string,
    emailPlaceholder: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      content: []

    };
  }

  componentDidMount() {
    console.log('DonatePage.componentDidMount');
    this.getContent();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getContent() {
    //console.log('DonatePage.getContent');
    var params = helpers.getDonateParams(this.props.path);
    var language = ( params[0] === '') ? 'en' : params[0];
    var file = '/json/donate-' + language + '.json';
      http.get(file)
        .end(function(err, res){
        if (err && err.status === 404) {
          console.log('DonatePage.getContent - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('DonatePage.getContent - err: ', err);
        }
        else {
          //console.log('DonatePage.getContent - res: ', res);
          console.log('DonatePage.getContent - res.body: ', res.body);
          this.setState({content: res.body});
        }
      }.bind(this));
  };

  render() {
    this.context.onSetTitle(this.props.title);
    var path = this.props.path;
    console.log('DonatePage.render - this.props.path: ', this.props.path);
    console.log('DonatePage.render - path: ', path);
    // Get 'language' and 'network' from path via utils/helper
    var params = helpers.getDonateParams(path);
    var language = params[0];
    var network = params[1];
    //console.log('DonatePage.render - params: ', params);
    //console.log('DonatePage.render - language: ', language);
    //console.log('DonatePage.render - network: ', network);

    // Set body after hero
    var body;
    var isThankYou = false;
    // If error, display error
    if( path.indexOf('error') > -1 ){

      body = (
        <div>
          <DonateError network={network}
                       language={language}
                       title={this.state.content.errorTitle}
                       desc={this.state.content.errorDesc}
                       cta={this.state.content.errorCta} />
        </div>
      );
    }
    // If thankyou, display thankyou
    else if( path.indexOf('thankyou') > -1 ){
      isThankYou = true;
      body = (
        <div>
          <ThankYouForDonating network={network}
                               language={language}
                               thankYouTitle={this.state.content.thankYouTitle}
                               thankYouCta={this.state.content.thankYouCta} />


          <EmailSignUp emailTitle={this.state.content.emailTitle}
                       emailDesc={this.state.content.emailDesc}
                       emailPlaceholder={this.state.content.emailPlaceholder}
                       emailCTA={this.state.content.emailCTA}
                       emailThankYou={this.state.content.emailThankYou} />
        </div>
      );
    }
    // if those neither are present, check if network has been set
    else if( ( network.indexOf('facebook') > -1 ) ||
             ( network.indexOf('twitter') > -1) ||
             ( network.indexOf('weibo') > -1 ) ) {
      if( network.indexOf('facebook') < 0 ){ this.state.content.pleaseDonateMessage = ''; }  //only have copy if facebook
      body = (
        <DonatePostMenu language={language}
                        network={network}
                        storyEyebrow={this.state.content.storyEyebrow}
                        title={this.state.content.donatePostTitle}
                        pleaseDonateMessage0={this.state.content.pleaseDonateMessage0}
                        pleaseDonateMessage1={this.state.content.pleaseDonateMessage1}
                        pleaseDonateMessage2={this.state.content.pleaseDonateMessage2}
                        donatePostDisclaimer={this.state.content.donatePostDisclaimer}
                        submit={this.state.content.donatePostSubmit}
                        storyChangeBtn={this.state.content.donatePostChangeStory}
                        copyFB={this.state.content.donatePostFBCopy}
                        fbPlaceholder={this.state.content.fbPlaceholder} />
      );
    }
    // If no network, then leave body empty
    else {
      body = '';
    }

    return (
      <div className="DonatePage">
        <div className="ContentPage-container">
          <DonateHero network={network}
                      language={language}
                      title={this.state.content.heroTitle}
                      desc={this.state.content.heroDesc}
                      isThankYou={isThankYou}
                      facebookCopy={this.state.content.heroFacebookButton}
                      twitterCopy={this.state.content.heroTwitterButton}
                      weiboCopy={this.state.content.heroWeiboButton} />
            { body }
          <div dangerouslySetInnerHTML={{__html: this.props.content || ''}} />
        </div>
      </div>
    );
  }
}

DonatePage.defaultProps = {
  title: 'World Humanitarian Day'
};

export default DonatePage;
