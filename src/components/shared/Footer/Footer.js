/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes } from 'react';
import styles from './Footer.scss';
import withViewport from '../../../decorators/withViewport';
import withStyles from '../../../decorators/withStyles';
import helpers from '../../../utils/helpers';
import LazyLoad from 'react-lazy-load';
import analytics from '../../../utils/analytics';

@withViewport
@withStyles(styles)
class Footer {

  static propTypes = {
    className: PropTypes.string,
    //corporate: PropTypes.array,
    social: PropTypes.array,
    desc: PropTypes.string
  };

  handleClick(string) {
    var params = helpers.getPageParams();
    var locale = params[2];
    var url = '/about/' + locale;

    // trigger analytics before url change
    var analyticsData = {'category': 'footer menu', 'action': 'click', 'optlabel': 'about WHD'};
    analytics.customTrackEvent(analyticsData);

    document.location.href = url;
  };

  render() {

    return (

      <div className="Footer module">
          <div className="row">
            <footer>

            <div className="small-12 medium-12 large-8 columns corporate">
              <div className="aboutWHD corp">
                <a onClick={this.handleClick.bind(this)} alt="aboutWHD">
                  About WHD
                </a>
              </div>
              <div className="privacyPolicy corp">
                <a href="http://www.un.org/en/aboutun/privacy" alt="privacyPolicy">
                  Privacy Policy
                </a>
              </div>
              <div className="responseFund corp">
                <a href="https://secure.globalproblems-globalsolutions.org/site/Donation2;jsessionid=CC4286C640D23A35B7E2B020CD31C937.app245a?idb=1649881960&df_id=1240&1240.donation=form1" alt="responseFund" data-track="{'label':'Give to the emergency response fund', 'action': 'click', 'category':'footer menu'}">
                  Give to the emergency response fund
                </a>
              </div>

            </div>

            <LazyLoad>
              <div className="small-12 medium-12 large-4 columns socialnetworks">
                <div className="float-right-wrapper">
                  <p>{this.props.desc}</p>

                  <div className="facebook social">
                    <a href="http://www.facebook.com/UNOCHA" alt="facebook" target="_blank" data-track="{'category': 'footer menu', 'action': 'click', 'optlabel': 'facebook'}">
                      <img src="http://res.cloudinary.com/hadpuw6bl/footer/footer-facebook.png" />
                    </a>
                  </div>
                  <div className="twitter social">
                    <a href="http://twitter.com/unocha" alt="twitter" target="_blank" data-track="{'category': 'footer menu', 'action': 'click', 'optlabel': 'twitter'}">
                      <img src="http://res.cloudinary.com/hadpuw6bl/footer/footer-twitter.png" />
                    </a>
                  </div>
                  <div className="instagram social">
                    <a href="http://instagram.com/un_ocha/" alt="instagram" target="_blank" data-track="{'category': 'footer menu', 'action': 'click', 'optlabel': 'instagram'}">
                      <img src="http://res.cloudinary.com/hadpuw6bl/footer/footer-instagram.png" />
                    </a>
                  </div>
                  <div className="youtube social">
                    <a href="http://www.youtube.com/user/ochafilms" alt="youtube" target="_blank" data-track="{'category': 'footer menu', 'action': 'click', 'optlabel':'youtube'}">
                      <img src="http://res.cloudinary.com/hadpuw6bl/footer/footer-youtube.png" />
                    </a>
                  </div>
                </div>
              </div>
            </LazyLoad>

            </footer>
          </div>
      </div>
    );
  }
}

Footer.defaultProps = {
  desc: 'Follow Us'
};

export default Footer;
