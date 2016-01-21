/* DETAIL PAGE */

import React, { PropTypes } from 'react';
import StoriesHero from '../StoriesHero';
import styles from './StoriesPage.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class StorySurvivingNepalQuake {
  static propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    heroCaption: PropTypes.string,
    content: PropTypes.array,
    authorName: PropTypes.string,
    authorDesc: PropTypes.string,
    textblock1Eyebrow: PropTypes.string,
    textblock1Title: PropTypes.string,
    textblock1Body: PropTypes.string,
    image2Caption: PropTypes.string,
    image3Caption: PropTypes.string,
    textblock2Body: PropTypes.string,
    image4Caption: PropTypes.string,
    image5Caption: PropTypes.string,
    image6Caption: PropTypes.string,
    image7Caption: PropTypes.string,
    textblock3Eyebrow: PropTypes.string,
    textblock3Title: PropTypes.string,
    textblock3Body: PropTypes.string,
    image8Caption: PropTypes.string,
    image9Caption: PropTypes.string
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
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_profile.png" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_profile.png" alt="…" />
                      </picture>
                      <div className="author">
                        <div className="author-name">{this.props.authorName}</div>
                        <div className="author-desc">{this.props.authorDesc}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row collapse stacked-wrapper">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="textblock blue">
                      <div className="eyebrow">{this.props.textblock1Eyebrow}</div>
                      <h2>{this.props.textblock1Title}</h2>
                      <p>{this.props.textblock1Body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 medium-6 large-8 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_2.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_2_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image2Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-50">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_3.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_3_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image3Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="textblock">
                  <h3>{this.props.textblock2Body}</h3>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_4.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_4_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image4Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width-huge">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_5.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_5_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image5Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-25">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_6.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_6_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image6Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_7.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_7_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image7Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-25">
              <div className="small-12 medium-6 large-6 columns">
                <div className="textblock blue">
                  <div className="eyebrow">{this.props.textblock3Eyebrow}</div>
                  <h2>{this.props.textblock3Title}</h2>
                  <p>{this.props.textblock3Body}</p>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_8.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_8_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image8Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_9.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_9_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption-top-lrg">{this.props.image9Caption}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


StorySurvivingNepalQuake.defaultProps = {
  bgUrl: 'http://res.cloudinary.com/hadpuw6bl/stories/surviving/story_surviving_hero.jpg',
  title: 'surviving the nepal quake',
  heroCaption: 'We at International Medical Corps, alongside others like WFP, are trying to get people aid as fast we can, but the aftershocks are causing massive landslides and are slowing our relief efforts.',
  authorName: 'DR. Karch',
  authorDesc: 'medical volunteer in Nepal',
  textblock1Eyebrow: 'Tribhuvan International Airport',
  textblock1Title: 'Just landed. what I’m seeing is utterly devastating.',
  textblock1Body: 'Rubble everywhere. thousands of people are homeless in the streets.',
  image2Caption: 'We have set up the International Medical Corps mobile medical unit at 10,000ft Photo credit: International Medical Corps',
  image3Caption: 'Members from an affected village just arrived for treatment. Their village is only at 690 metres but it’s been completely decimated by the landslides',
  textblock2Body: 'Our translator just told me that a woman’s husband is still down in the village and needs help. We’re going to climb down the mountain and get him to medical treatment.',
  image4Caption: 'My rescue squad: Tim Collins, an EMT, a young Nepali man and the patient’s wife. We are literally running down the mountain as fast as we can',
  image5Caption: 'We found the patient. He’s sustained a spinal injury and a stroke. Locals have tied him to a rock pile to stabilize him. *Due to patient confidentiality he cannot be named.',
  image6Caption: 'Three days strapped to a rock. Now carried down a mountain. My patient is a fighter',
  image7Caption: 'The rescue chopper is here!',
  textblock3Eyebrow: 'Feeling happy',
  textblock3Title: 'I can’t fully express how relieved I am that we’re on our way to the hospital.',
  textblock3Body: 'This man now has a chance at life.',
  image8Caption: 'Could not have done this without help from these guys. Friends 4 ever',
  image9Caption: 'Thanks you for giving me this opportunity to tell people about my life as a humanitarian doctor in Nepal.'
};

export default StorySurvivingNepalQuake;
