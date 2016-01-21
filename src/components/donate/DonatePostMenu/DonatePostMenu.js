import React, { PropTypes } from 'react';
import styles from './DonatePostMenu.scss';
import withStyles from '../../../decorators/withStyles';
import DonateDefaultItem from '../DonateDefaultItem';
import DonateFacebookItem from '../DonateFacebookItem';
import http from 'superagent';
import analytics from '../../../utils/analytics';

@withStyles(styles)
class DonatePostMenu extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    content: PropTypes.array,
    storyId: PropTypes.number,
    title: PropTypes.string,
    submit: PropTypes.string,
    pleaseDonateMessage0: PropTypes.string,
    pleaseDonateMessage1: PropTypes.string,
    pleaseDonateMessage2: PropTypes.string,
    fbPlaceholder: PropTypes.string,
    storyEyebrow: PropTypes.string,
    donatePostDisclaimer: PropTypes.string,
    language: PropTypes.string,
    network: PropTypes.string,
    storyChangeBtn: PropTypes.string,
    copyFB: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      storyId: null,
      storyTitle: '',
      canSubmit: true
    };
  };

  componentWillMount() {
    this.getStories();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
  }

  getStories() {
    var url = `/api/story/${this.props.language}/${this.props.network}`;
    console.log('DonatePostMenu.getStories - url: ', url);

    http
      .get(url)
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('DonatePostMenu.getStories - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('DonatePostMenu.getStories - err: ', err);
        }
        else {
          this.state.storyTitle = res.body.name;
          console.log('DonatePostMenu.getStories - res.body.name: ', res.body.name);
          console.log('DonatePostMenu.getStories - this.state.storyTitle: ', this.state.storyTitle);
          console.log('DonatePostMenu.getStories - res: ', res.body);
          console.log('DonatePostMenu.getStories - res.body): ', res.body);
          console.log('DonatePostMenu.getStories - res.body.messages: ', res.body.messages);
          console.log('DonatePostMenu.getStories - res.body.id: ', res.body.id);
          this.setState({messages: res.body.messages});
          this.state.storyId = res.body.id;
          $('.DonateHero').addClass('collapse');
          $('.DonateHeroButtons').fadeOut();
          $('.DonateHeroCopy').fadeOut();
        }
      }.bind(this));
  }

  getNextStories() {

    var url = `/api/story/${this.props.language}/${this.props.network}?next=${this.state.storyId}`;
    console.log('DonatePostMenu.getNextStories - url: ', url);

    // trigger analytics before url change
    var analyticsData = {'category': 'sharing page', 'action': 'click', 'optlabel': 'uncomfortable with this story'};
    analytics.customTrackEvent(analyticsData);

    http
      .get(url)
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('DonatePostMenu.getNextStories - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('DonatePostMenu.getNextStories - err: ', err);
        }
        else {
          this.state.storyTitle = res.body.name;
          console.log('DonatePostMenu.getNextStories - res.body.name: ', res.body.name);
          console.log('DonatePostMenu.getNextStories - this.state.storyTitle: ', this.state.storyTitle);
          console.log('DonatePostMenu.getNextStories - res: ', res.body);
          console.log('DonatePostMenu.getNextStories - res.body.messages: ', res.body.messages);
          console.log('DonatePostMenu.getNextStories - res.body.id: ', res.body.id);
          this.setState({messages: res.body.messages});
          this.state.storyId = res.body.id;
        }
      }.bind(this));
  }

  onSubmit() {
    if( this.state.canSubmit === false ) {
      return;
    }

    this.state.canSubmit = false;

    // trigger analytics before url change
    var analyticsData = {'category': 'sharing page', 'action': 'click', 'optlabel': 'accept button'};
    analytics.customTrackEvent(analyticsData);

    console.log('DonatePostMenu.onSubmit - ********');
    var hasErrors = false;
    var checkboxes = document.getElementsByClassName('storyCheckbox');
    //console.log('DonatePostMenu.onSubmit - checkboxes: ', checkboxes);
    var messages = [];
    for( var i = 0; i < checkboxes.length; i++ ){
      var checkbox = checkboxes[i];
      //console.log('DonatePostMenu.onSubmit - checkbox', checkbox);
      //console.log('DonatePostMenu.onSubmit - checkbox.checked', checkbox.checked);
      //console.log('DonatePostMenu.onSubmit - checkbox.value', checkbox.value);

      if(checkbox.checked ) {
        var messageId = checkbox.value;
        var messageCopyId = 'messageCopy' + messageId;
        var messageCopy = document.getElementById(messageCopyId).innerHTML;

        //console.log('DonatePostMenu.onSubmit - messageId', messageId);
        //console.log('DonatePostMenu.onSubmit - messageCopy', messageCopy);

        var message;

        if( this.props.network === 'facebook') {
          var messageInputId = 'messageInputId' + messageId;
          var messageInput = document.getElementById(messageInputId).value;
          //console.log('DonatePostMenu.onSubmit - messageInput', messageInput);

          if((typeof messageInput === 'undefined') || ( messageInput === '') || (messageInput === null) ){
            message = messageCopy;
            document.getElementById(messageInputId).setAttribute('class', 'error');
            hasErrors = true;
          }
          else {
            message = messageInput;
            document.getElementById(messageInputId).classList.remove('error');
          }
        }
        else {
          message = messageCopy;
        }
        messages.push({id: messageId, message: message });

        //console.log('DonatePostMenu.onSubmit - message', message);
      }
    }

    if( hasErrors || checkboxes.length === 0 ) {
      return;
    }
    else {
      var baseURL = `/donate/${this.props.language}/${this.props.network}`;

        http.post('/api/donate')
        .send({ messages })
        .end(function(err, res){
          if (res) {
            console.log('DonatePostMenu.onSubmit - res ', res);
            console.log('DonatePostMenu.onSubmit - res.body ', res.body);
            console.log('DonatePostMenu.onSubmit - res.body.status ', res.body.status);
            var responseURL = (res.body.status === 'ok') ? baseURL + '/thankyou' : baseURL + '/error';
            console.log('DonatePostMenu.onSubmit - responseURL ', responseURL);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
            window.location = responseURL;
            this.state.canSubmit = true;
          } else if( err ){
            console.log('DonatePostMenu.onSubmit - err ', err);
            this.state.canSubmit = true;
          }
        }.bind(this));
    }
  }

  render() {
    var fbInstrctionsRowClasses;
    var messages = this.state.messages.map((message, index) => {
      if( this.props.network === 'facebook') {
        fbInstrctionsRowClasses = 'row';

        return (<DonateFacebookItem key={index}
                                    image={message.siteImage}
                                    text={message.text}
                                    storyId={message.StoryId}
                                    id={message.id}
                                    copyFB={this.props.copyFB}
                                    fbPlaceholder={this.props.fbPlaceholder} />);
      }
      else {
        fbInstrctionsRowClasses = 'row not-visible';
        return (<DonateDefaultItem key={index}
                                   image={message.siteImage}
                                   text={message.text}
                                   storyId={message.StoryId}
                                   id={message.id} />);
      }
    });
    console.log('this.state.storyTitle: '+this.state.storyTitle);
    return (
      <div className="DonatePostMenu module">
        <div className="row">
          <div className="small-12 medium-12 large-12 columns storyTitleGroup">
            <p className="storyEyebrow">{this.props.storyEyebrow}</p>
            <h3 className="title">{this.state.storyTitle}</h3>
          </div>
        <div className={fbInstrctionsRowClasses}>
          <div className="small-12-centered medium-12-centered large-10 large-offset-1 columns">
            <p className="please-donate-message">{this.props.pleaseDonateMessage0}<br /> <span className="important">{this.props.pleaseDonateMessage1}</span>{this.props.pleaseDonateMessage2}</p>
          </div>
        </div>
        </div>
        <div className="row">
          <div className="small-10 small-offset-1 medium-10 large-10 large-offset-1 columns">
            <form className="custom">
              <ul className="small-block-grid-0 medium-block-grid-2 large-block-grid-2">
                {messages}
              </ul>
            </form>
          </div>
        </div>
        <div className="row">
          <div className="small-12 medium-12 large-12 columns">
            <div className="buttonWrapper">
              <div className="button blue donatePostButton" type="button" onClick={this.onSubmit.bind(this)}>
                {this.props.submit}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="small-12 medium-12 large-12 center columns">
              <div className="buttonWrapper">
                <div className="changeStoryBtn" type="button" onClick={this.getNextStories.bind(this)}>
                  {this.props.storyChangeBtn}
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="small-12 medium-7 large-7 large-centered medium-centered center columns donate-post-disclaimer">
              {this.props.donatePostDisclaimer}
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default DonatePostMenu;
