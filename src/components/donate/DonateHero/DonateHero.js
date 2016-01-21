/* COUNTER */

import React, { PropTypes } from 'react';
import styles from './DonateHero.scss';
import withStyles from '../../../decorators/withStyles';
import FacebookFeedButton from '../FacebookFeedButton';
import TwiiterFeedButton from '../TwiiterFeedButton';
import WeiboFeedButton from '../WeiboFeedButton';

@withStyles(styles)
class DonateHero extends React.Component{

  static propTypes = {
    className: PropTypes.string,
    title: PropTypes.string,
    desc: PropTypes.string,
    handleClick: PropTypes.func,
    language: PropTypes.string,
    network: PropTypes.string,
    facebookCopy: PropTypes.string,
    twitterCopy: PropTypes.string,
    weiboCopy: PropTypes.string,
    isThankYou: PropTypes.bool

  };

  constructor(props) {
    super(props);
  };

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  handleClick(index) {
    console.log('DonateHero.handleClick e.target: ', index);
  };

  render() {
    //console.log('DonateHero.render this.props.network: ', this.props.network);

    var buttons;
    if( this.props.language === 'zh') {
        buttons = <WeiboFeedButton network={this.props.network} language={this.props.language} copy={this.props.weiboCopy} isThankYou={this.props.isThankYou}/>;
    }
      else {
        buttons = <div> <FacebookFeedButton network={this.props.network} language={this.props.language} copy={this.props.facebookCopy} isThankYou={this.props.isThankYou}/><TwiiterFeedButton network={this.props.network} copy={this.props.twitterCopy} language={this.props.language} isThankYou={this.props.isThankYou}/></div>;
    }

    return (
      <div className="DonateHero module">
        <div className="row DonateHeroCopy">
          <div className="small-12 medium-12 large-7 large-centered columns">
            <h1>
                { this.props.title }
            </h1>
            <p>
                { this.props.desc }
            </p>
          </div>
        </div>
          <div className="row DonateHeroButtons">
            <div className="small-12 medium-12 large-12 columns">
              {buttons}
          </div>
        </div>
      </div>
    );
  }
}

//DonateHero.defaultProps = {
//    title: 'Use your feed TO share one person' + String.fromCharCode(39) + 's story with the world',
//    desc: 'By donating your feed the following story will be told using XX number of posts over one day. You are giving a voice to someone in need and inspiring others to do the same.'
//};

export default DonateHero;
