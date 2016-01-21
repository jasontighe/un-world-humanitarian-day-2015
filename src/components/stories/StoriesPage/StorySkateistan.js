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
    textblock1Title: PropTypes.string,
    textblock1Body: PropTypes.string,
    image1Caption: PropTypes.string,
    image2Caption: PropTypes.string,
    textblock2Title: PropTypes.string,
    textblock2Body: PropTypes.string,
    image3Caption: PropTypes.string,
    textblock3Body: PropTypes.string,
    image4Caption: PropTypes.string,
    image5Caption: PropTypes.string,
    image6Caption: PropTypes.string,
    image7Caption: PropTypes.string,
    textblock4Body: PropTypes.string,
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
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_profile.png" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_profile.png" alt="…" />
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
                      <h2>{this.props.textblock1Title}</h2>
                      <p>{this.props.textblock1Body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 medium-6 large-8 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_1.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_1_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image1Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-25">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_2.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_2_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image2Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="textblock">
                  <h2>{this.props.textblock2Title}</h2>
                  <p>{this.props.textblock2Body}</p>
                </div>
              </div>
            </div>
            <div className="row collapse height-50">
              <div className="small-12 medium-8 large-8 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_3.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_3_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image3Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-4 large-4 columns">
                <div className="row collapse stacked-wrapper">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="textblock blue">
                      <h2>{this.props.textblock3Body}</h2>
                    </div>
                  </div>
                </div>
                <div className="row collapse stacked-wrapper">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="full-width-short">
                      <picture>
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_4.jpg" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_4_sm.jpg" alt="…" />
                      </picture>
                      <div className="caption">{this.props.image4Caption}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row collapse height-25">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_5.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_5_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image5Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_6.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_6_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image6Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-50">
              <div className="small-12 medium-6 large-4 columns">
                <div className="row collapse">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="full-width-short">
                      <picture>
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_7.jpg" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_7_sm.jpg" alt="…" />
                      </picture>
                      <div className="caption">{this.props.image7Caption}</div>
                    </div>
                  </div>
                </div>
                <div className="row collapse stacked-wrapper">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="textblock blue">
                      <h2>{this.props.textblock4Body}</h2>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 medium-6 large-8 columns">
                <div className="full-width-medium">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_8.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_8_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image8Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width">
                  <picture>
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_9.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_9_sm.jpg" alt="…" />
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


StoriesCircus.defaultProps = {
  bgUrl: 'http://res.cloudinary.com/hadpuw6bl/stories/skateistan/stories_skateistan_hero.jpg',
  title: 'welcome to SKATEISTAN',
  heroCaption: 'Something amazing happened today. Children from all different ethnicities and backgrounds were skateboarding and laughing together. Then they all started to dance and sing the most beautiful song. It opened my eyes to how powerful something as simple as skateboarding can be for a community.',
  authorName: 'Oliver percovich',
  authorDesc: 'Founder of Skateistan',
  textblock1Title: 'It’s disheartening for me to see',
  textblock1Body: 'the situation for women and girls in Afghanistan. Most women are not allowed to work and most girls can’t go to school. It’s even been deemed culturally inappropriate for them to ride a bicycle.',
  image1Caption: 'There are so many young people here! Half of the population is under the age of 16 and 70% of the population is under the age of 25.',
  image2Caption: 'The children here are naturals at skateboarding. Check out Subhanullah!',
  textblock2Title: 'We love skateboarding',
  textblock2Body: 'so we went out for a quick session on the streets today. Everyone was asking about skateboarding so we showed some of the kids how to do it. They were so excited!',
  image3Caption: 'Skateboarding is so new to Afghanistan that nobody has had a chance to say girls couldn’t do it yet. So we’re going to keep on skating.',
  textblock3Body: 'Burned 400 calories landing ollies with the kids.',
  image4Caption: 'I’m not sure what I’m doing here. I’m living on $10 a week and we only have electricity every few days. But every time I go skateboarding with the kids, I feel like I should keep making this work.',
  image5Caption: 'I’ve been thinking more and more about the skateboarding and education. What if we can help other children to get a better education while teaching them how to skateboard?',
  image6Caption: 'Just about ready to open the doors of our new school. Welcome to Skateistan! Come for the skateboarding, stay for the education.',
  image7Caption: '“I can feel freedom in skateboarding.” - Parwana, 13, Skateistan student ',
  textblock4Body: 'A sunny Skateistan ollie competition in Kabul, finished with a 50/50!',
  image8Caption: 'Today in Afghanistan, 40% of skateboarders are girls. In the rest of the world, girls only make up 5%. Skateboarding is now the largest female sport in Afghanistan.',
  image9Caption: 'My name is Oliver percovich. Thank you for letting me share my story.'
};

export default StoriesCircus;
