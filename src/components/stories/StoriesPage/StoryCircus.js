/* DETAIL PAGE */

import React, { PropTypes } from 'react';
import StoriesHero from '../StoriesHero';
import styles from './StoriesPage.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class StoriesCircus {
  static propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    heroCaption: PropTypes.string,
    content: PropTypes.array,
    authorName: PropTypes.string,
    authorDesc: PropTypes.string,
    image1Caption: PropTypes.string,
    textblock1Title: PropTypes.string,
    textblock1Body: PropTypes.string,
    image2Caption: PropTypes.string,
    image3Caption: PropTypes.string,
    image4Caption: PropTypes.string,
    image5Caption: PropTypes.string,
    image6Caption: PropTypes.string,
    textblock2Body: PropTypes.string,
    image7Caption: PropTypes.string
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired
  };

  componentDidMount(){
    var loc = this;
    console.log('SMALL SCREEN: ' + this.isSmallScreen());
    window.onload = function(){
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

    if(document.getElementsByClassName('height-50')) {
      var h50Arr = document.getElementsByClassName('height-50');
      for (var i = 0; i < h50Arr.length; i++) {
        h50Arr[i].style.height = height50 + 'px';
      }
    }
    if(document.getElementsByClassName('height-25')) {
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
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_profile.png" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_profile.png" alt="…" />
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
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_1.jpg" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_1_sm.jpg" alt="…" />
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

            <div className="row collapse">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_2.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_2_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image2Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_3.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_3_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image3Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width-huge">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_4.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_4_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image4Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_5.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_5_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image5Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_6.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_6_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image6Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-12">
              <div className="small-12 medium-12 large-12 columns">
                <div className="textblock-short blue">
                  <h2>{this.props.textblock2Body}</h2>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_7.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_7_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption-top-lrg">{this.props.image7Caption}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StoriesCircus.defaultProps = {
  bgUrl: 'http://res.cloudinary.com/hadpuw6bl/stories/circus/stories_circus_hero.jpg',
  title: 'juggling in jordan',
  heroCaption: 'The boys are getting happier and stronger, too! Circus is a good way to release war traumas and discharge the energy that builds up in young people forced to live in a camp.',
  authorName: 'Anwar Abujesh',
  authorDesc: 'circus trainer in za’atari',
  image1Caption: 'The Za’atari Refugee camp in Jordan was created to host Syrians fleeing the violent Syrian civil war. Over 80,000 refugees live here. The camp is so large it could fit 1,000 American football fields inside its boundaries!',
  textblock1Title: 'two years ago, ',
  textblock1Body: 'my life changed when Finn Church Aid started a circus school here at Za’atari. Now I’m a circus trainer and I get to teach the other refugees. I love my work.',
  image2Caption: 'I always get emotional when I think about how all this started. Many of my students started the circus so shy and scared but now they’re running around confident and excited!',
  image3Caption: 'Children and youths at Za’atari need a way to unwind and focus their attention on something positive. The circus school helps to give them hope for their future.',
  image4Caption: 'Circus activities teach kids that it’s okay to make mistakes. They learn to trust each other and work as a team.',
  image5Caption: '“Make it last forever, friendship never ends.” Girls dancing to Wannabe, the Spice Girls song!',
  image6Caption: 'One final rehearsal before our show tomorrow.',
  textblock2Body: 'Today was such a great day, a lot of applause and satisfaction, I’m so proud',
  image7Caption: 'My name is anwar abujesh. Thank you for letting me share my story.'
};

export default StoriesCircus;
