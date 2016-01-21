import React, { PropTypes } from 'react';
import styles from './ApiTests.scss';
import withStyles from '../../../decorators/withStyles';
import http from 'superagent';
import MessageCount from '../MessageCount';

@withStyles(styles)
class ApiTests extends React.Component {


  // variables
  static propTypes = {
    getMessageCount: PropTypes.func,
    getStories: PropTypes.func,
    getStoriesRes: PropTypes.array,
    getLatestUsers: PropTypes.func
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      count: null,
      data: [],
      latestUsers: []
    };
    //this.setState = this.setState.bind(this);
  }

  getInitialState() {
    // naming it initialX clearly indicates that the only purpose
    // of the passed down prop is to initialize something internally
    return { count: 0 };
  }

  componentDidMount() {
    console.log('ApiTests.componentDidMount');
    //this.getMessageCount();
    //this.getStories();
    this.getLatestUsers();
    //this.postDonateMessages();
  }

  componentWillReceiveProps() {
    console.log('ApiTests.componentWillReceiveProps');
    //  this.setState({ count: 76});
    //    this.state.count = 55;
  }

  shouldComponentUpdate() {
    console.log('ApiTests.shouldComponentUpdate');
  }

  componentWillUnmount() {
    console.log('ApiTests.componentWillUnmount');
  }

  conponentWillMount() {
    console.log('ApiTests.conponentWillMount');
  }

  getStories() {
    console.log('ApiTests.getStories');
    http.get('/api/story/en/facebook')
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('ApiTests.getStories - 404 res.body: ', res.body);
        }
        else if (err) {
          console.log('ApiTests.getStories - err: ', err);
        }
        else {
          console.log('ApiTests.getStories - res: ', res);
          console.log('ApiTests.getStories - res.body.messages: ', res.body.messages);
          this.setState({data: res.body.messages});
        }
      }.bind(this));
  };

  shouldComponentUpdate(nextProps, nextState) {
    //return nextState.count !== this.state.count;
    return true;
  }

  getMessageCount() {
    console.log('ApiTests.getMessageCount');
    http.get('/api/messagecount')
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('ApiTests.getMessageCount - 404 err: ', err);
        }
        else if (err) {
          console.log('ApiTests.getMessageCount - err: ', err);
        }
        else {
          console.log('ApiTests.getMessageCount - res.body.count: ', res.body.count);
          this.setState({count: res.body.count});
        }
      }.bind(this));
  }

  getLatestUsers() {
    console.log('ApiTests.getLatestUsers');
    http.get('/api/latestusers')
      .end(function(err, res){
        if (err && err.status === 404) {
          console.log('ApiTests.getLatestUsers - 404 err: ', err);
        }
        else if (err) {
          console.log('ApiTests.getLatestUsers - err: ', err);
        }
        else {
          console.log('ApiTests.getLatestUsers - res.body: ', res.body);
          this.setState({latestUsers: res.body});
        }
      }.bind(this));
  }

  //postDonateMessages() {
  //    console.log('ApiTests.getDonateMessages');
  //    http.post('/api/story/en/facebook')
  //        .end(function(err, res){
  //            if (err && err.status === 404) {
  //                console.log('ApiTests.postDonateMessages - 404 res.body: ', res.body);
  //            }
  //            else if (err) {
  //                console.log('ApiTests.postDonateMessages - err: ', err);
  //            }
  //            else {
  //                console.log('ApiTests.postDonateMessages - res: ', res);
  //                console.log('ApiTests.postDonateMessages - . res.body: ', res.body);
  //            }
  //        });
  //}

  render() {
    console.log('ApiTests.render');
    let title = 'API Tests';
    this.context.onSetTitle(title);

    var messages = this.state.data.map((message, index) => {
      console.log(index);
      return (
        <p key={index}>StoryId: {message.StoryId}, id: {message.id}, image: {message.image}, text: {message.text}</p>
      );
    });

    var latestUsers = this.state.latestUsers.map((person, index) => {
      console.log(index);
      return (
        <p key={index}>givenName: {person.givenName}, createdAt: {person.createdAt}</p>
      );
    });

    return (
      <div className="ApiTests">
        <div className="row">
          <div className="small-12 medium-12 large-12">
            <h1>{title}</h1>
            <p>Message Count: <MessageCount count={this.state.count} /></p>
            <p>getLatestUsers: {latestUsers}</p>
            <p>getStories: {messages}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ApiTests;
