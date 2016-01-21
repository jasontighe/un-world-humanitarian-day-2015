/* DETAIL PAGE */

import React, { PropTypes } from 'react';
import StoriesHero from '../StoriesHero';
import styles from './StoriesPage.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class StoriesWhiteHelmets {
  static propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.array,
    authorName: PropTypes.string,
    authorDesc: PropTypes.string,
    imageCaption1: PropTypes.string,
    textblock1Title: PropTypes.string,
    textblock1Body: PropTypes.string,
    image1Caption: PropTypes.string,
    image2Caption: PropTypes.string,
    image3Caption: PropTypes.string,
    image4Caption: PropTypes.string,
    textblock2Body: PropTypes.string,
    image5Caption: PropTypes.string

  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  componentDidMount() {
    var loc = this;
    console.log('SMALL SCREEN: ' + this.isSmallScreen());
    window.onload = function () {
      if (!loc.isSmallScreen()) {
        loc.adjustRowHeight();
        window.addEventListener('resize', loc.adjustRowHeight);
      }
    };
  }

  isSmallScreen() {
    var layout = window.innerWidth < 768 ? true : false;
    return layout;
  }

  adjustRowHeight() {
    var winWidth = document.getElementsByClassName('row')[0].clientWidth,
      height50 = winWidth * .50,
      height25 = winWidth * .25;

    console.log(winWidth, height50, height25);

    if (document.getElementsByClassName('height-50')) {
      var h50Arr = document.getElementsByClassName('height-50');
      for (var i = 0; i < h50Arr.length; i++) {
        h50Arr[i].style.height = height50 + 'px';
      }
    }
    if (document.getElementsByClassName('height-25')) {
      var h25Arr = document.getElementsByClassName('height-25');
      for (var j = 0; j < h25Arr.length; j++) {
        h25Arr[j].style.height = height25 + 'px';
      }
    }
  }

  render() {
    this.context.onSetTitle(this.props.title);
    return (
      <div className="StoriesPage">
        <div className="ContentPage-container">
          <StoriesHero {...this.props}/>
          <div className="stories-body">
            <div className="row collapse height-50">
              <div className="small-12 medium-6 large-4 columns">
                <div className="row collapse stacked-wrapper">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="by-block">
                      <picture>
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_profile.png" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_profile.png" alt="…" />
                      </picture>
                      <div className="author">
                        <div className="author-name">{this.props.authorName}</div>
                        <div className="author-desc">{this.props.authorDesc}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row collapse">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="full-width-short">
                      <picture>
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_1.jpg" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_1_sm.jpg" alt="…" />
                      </picture>
                      <div className="caption">{this.props.image1Caption}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 medium-6 large-8 columns">
                <div className="textblock-large blue">
                  <h2>{this.props.textblock1Title}</h2>
                  <p>{this.props.textblock1Body}</p>
                </div>
              </div>
            </div>
            <div className="row collapse height-25">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_2.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_2_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image2Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_3.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_3_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image3Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="video-wrapper">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/NOTWR0Q4qLA" frameBorder="0" allowFullScreen></iframe>
                  <div className="caption">{this.props.image4Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="textblock-short">
                  <p>{this.props.textblock2Body}</p>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_5.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_5_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption-top-lrg">{this.props.image5Caption}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


StoriesWhiteHelmets.defaultProps = {
  bgUrl: 'http://res.cloudinary.com/hadpuw6bl/stories/whitehelmets/story_whitehelmets_hero.jpg',
  title: 'Baby in the rubble: Syria’s White Helmets',
  authorName: 'khaled farah',
  authorDesc: 'first responder with the white helmets',
  image1Caption: 'Before I was a White Helmet I had a normal day job like the rest of the team members. We were teachers, bakers, salesmen and tailors. Now we have put our lives on hold to try and save lives during this crisis.',
  textblock1Title: 'Four years ago',
  textblock1Body: 'the conflict began with peaceful anti-government protests. Now almost 200,000 Syrians have lost their lives. Civilians are targeted daily with bombs.',
  image2Caption: 'Arrived at the scene of the blast… it has torn a whole tower block apart. As we work we have to keep an eye on the sky, as a second bomb is often dropped to kill rescue workers.',
  image3Caption: 'As I rest my head against the concrete I hear a baby crying. Am I going crazy? I call over the team and we start digging. If there is a life in there, we have to be very gentle.',
  image4Caption: 'The proudest moment of my life.',
  textblock2Body: 'Visiting baby Muhammad for the first time after finding him in the rubble. There are over 2,700 White Helmets in Syria and so far we have saved over 22,000 lives. We need the world to step in to stop the bombing.',
  image5Caption: 'My name is Khaled Farah. Thank you for letting me share my story.'
};

export default StoriesWhiteHelmets;
