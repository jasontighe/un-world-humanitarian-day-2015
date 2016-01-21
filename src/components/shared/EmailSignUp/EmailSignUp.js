/* SIGNUP */

import React, { PropTypes } from 'react';
import styles from './EmailSignUp.scss';
import withStyles from '../../../decorators/withStyles';
import http from 'superagent';

@withStyles(styles)
class EmailSignUp {
  static propTypes = {
    className: PropTypes.string,
    emailTitle: PropTypes.string,
    emailDesc: PropTypes.string,
    emailCTA: PropTypes.string,
    language: PropTypes.string,
    network: PropTypes.string,
    emailPlaceholder: PropTypes.string,
    emailThankYou: PropTypes.string
  };

  componentDidMount() {
    var pathname = document.location.pathname;
    if( pathname.indexOf('donate') <= 0) {
      document.getElementById('emailSignUp').className += ' homeHorizontalLines';
    }
  }

  onSubmit() {
    //console.log('EmailSignUp.onSubmit - ********');
    var hasErrors = false;
    var email = document.getElementById('emailInput').value;
    console.log('EmailSignUp.onSubmit -email: ', email);
    var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    if (filter.test(email)){
      console.log('EMAIL IS VALID');
      document.getElementById('emailInput').classList.remove('error');
    }
    else{
      console.log('Please input a valid email address!');
      document.getElementById('emailInput').classList.add('error');
      hasErrors = true;
    }
    //console.log('EmailSignUp.onSubmit - hasErrors: ', hasErrors);


    if( hasErrors ) {
      return;
    }
    else {

      http.post('/api/addemail')
        .send({ email: email })
        .end(function(err, res){
          if (res) {
            console.log('EmailSignUp.onSubmit - res ', res);
            console.log('EmailSignUp.onSubmit - res.body ', res.body);
            console.log('EmailSignUp.onSubmit - res.body.status ', res.body.status);
            //var responseURL = (res.body.status === 'ok') ? baseURL + '/thankyou' : baseURL + '/error';
            //console.log('EmailSignUp.onSubmit - responseURL ', responseURL);
            //window.location = responseURL;
            console.log('EmailSignUp.onSubmit - document.getElementById(emailThankYouRow) ', document.getElementById('emailThankYouRow'));
            document.getElementById('emailThankYouRow').classList.remove('not-visible');
            var emailRows = document.getElementsByClassName('emailFormRow');
            for( var i = 0; i < emailRows.length; i++ ){
              emailRows[i].classList.add('not-visible');
            }
          } else if( err ){
            console.log('EmailSignUp.onSubmit - err ', err);
            document.getElementById('emailInput').classList.add('error');
          }
        }).bind(this);
    }
  }

  //shouldComponentUpdate(nextProps, nextState) {
  //  return true;
  //}

  render() {

    return (
      <div id="emailSignUp" className="EmailSignUp">
        <div className="row emailFormRow">
          <div className="small-12 medium-12 large-8 large-offset-2 columns">
            <h3>{this.props.emailTitle}</h3>
            <p>{this.props.emailDesc}</p>
          </div>
        </div>
        <div className="row emailFormRow">
          <div className="small-10 small-offset-1 medium-8 large-7 large-offset-1 columns">
            <input id="emailInput" type="text" placeholder={this.props.emailPlaceholder} />
          </div>
          <div className="small-12 medium-4 large-2 end columns">
            <div className="button blue" onClick={this.onSubmit.bind(this)}>
              {this.props.emailCTA}
            </div>
          </div>
        </div>
        <div id="emailThankYouRow" className="row not-visible fadeAll25">
          <div className="small-12 medium-12 large-12 columns">
            <h3>{this.props.emailThankYou}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default EmailSignUp;
