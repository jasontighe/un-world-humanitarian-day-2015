/* DETAIL PAGE */

import React, { PropTypes } from 'react';
import StoriesHero from '../StoriesHero';
import styles from './StoriesPage.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class StoriesMountainExpress {
  static propTypes = {
    path: PropTypes.string.isRequired,
    className: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.array,
    authorName: PropTypes.string,
    authorDesc: PropTypes.string,
    image1Caption: PropTypes.string,
    image2Caption: PropTypes.string,
    text1Body: PropTypes.string,
    image3Caption: PropTypes.string,
    image4Caption: PropTypes.string,
    image5CaptionTitle: PropTypes.string,
    image5Caption: PropTypes.string,
    text2Body: PropTypes.string,
    image6Caption: PropTypes.string,
    vid1Caption: PropTypes.string,
    image7Caption: PropTypes.string,
    text3Eyebrow: PropTypes.string,
    text3Header: PropTypes.string,
    text3Body: PropTypes.string,
    image8Caption: PropTypes.string,
    image9Caption: PropTypes.string
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
                      <picture className="picture">
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_express_profile_pic.png" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_express_profile_pic.png" alt="…" />
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
                      <picture className="picture">
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_1.jpg" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_1_sm.jpg" alt="…" />
                      </picture>
                      <div className="caption">{this.props.image1Caption}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 medium-6 large-8 columns">
                <div className="full-width-medium">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_2.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_2_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image2Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-12">
              <div className="small-12 medium-12 large-12 columns">
                <div className="textblock-short blue">
                  <p>{this.props.text1Body}</p>
                </div>
              </div>
            </div>
            <div className="row collapse height-25">
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_3.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_3_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image3Caption}</div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-short">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_4.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_4_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image4Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-75">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width-huge">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_5.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_5_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption-title">{this.props.image5CaptionTitle}</div>
                  <div className="caption">{this.props.image5Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-50">
              <div className="small-12 medium-6 large-6 columns">
                <div className="textblock-pullquote">
                  <h2>{this.props.text2Body}</h2>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-medium">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_6.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_6_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image6Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="video-wrapper">
                  <iframe width="560" height="315" src="https://www.youtube.com/embed/-iGm4f5Fuhg" frameBorder="0" allowFullScreen></iframe>
                  <div className="caption">{this.props.vid1Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse height-50">
              <div className="small-12 medium-6 large-6 columns">
                <div className="row collapse">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="full-width-short">
                      <picture className="picture">
                        <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_8.jpg" media="(min-width: 768px)" />
                        <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_8_sm.jpg" alt="…" />
                      </picture>
                      <div className="caption">{this.props.image7Caption}</div>
                    </div>
                  </div>
                </div>
                <div className="row collapse stacked-wrapper">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="textblock blue">
                      <div className="eyebrow">{this.props.text3Eyebrow}</div>
                      <h2>{this.props.text3Header}</h2>
                      <p>{this.props.text3Body}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="small-12 medium-6 large-6 columns">
                <div className="full-width-medium">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_9.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_9_sm.jpg" alt="…" />
                  </picture>
                  <div className="caption">{this.props.image8Caption}</div>
                </div>
              </div>
            </div>
            <div className="row collapse">
              <div className="small-12 medium-12 large-12 columns">
                <div className="full-width">
                  <picture className="picture">
                    <source srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_10.jpg" media="(min-width: 768px)" />
                    <img srcSet="http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_10_sm.jpg" alt="…" />
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


StoriesMountainExpress.defaultProps = {
  bgUrl: 'http://res.cloudinary.com/hadpuw6bl/stories/trekking/story_mountain_express_hero.jpg',
  title: 'Nepal’s operation Mountain Express',
  authorName: 'Nuri Sherpa',
  authorDesc: 'sherpa in the himalayas',
  image1Caption: 'This is Don Bowie. He has come all the way from Canada to climb Annapurna circut. Tomorrow we will make the push for the summit. I am one of the sherpas on his team.',
  image2Caption: 'Most of my life I’ve been helping climbers from all over the world hike the mountains of Nepal. ',
  text1Body: 'In the middle of the night we are literally shaken from our sleep. The ground convulsing shaking below us. Thankfully we are all safe. But we are hearing chaos on the radio. Hundreds of villages flattened.',
  image3Caption: 'Don and the climbers have decided to remain in Nepal to help. These mountains are   in the epicentre of the quake and almost entirely cut off from supplies.',
  image4Caption: 'My family’s home has been destroyed, I want to be with them, but I’m needed here. I’ve decided to stay with Don’s crew to join the World Food Programme efforts to bring humanitatian relief.',
  image5CaptionTitle: '5,100m',
  image5Caption: 'For three weeks we have been working to get the Larke Pass open for supplies. 5,100 m high and 1,000 mules a day used to pass through it before it was cut off by a landslide.',
  text2Body: 'The first shipment of mules with food supplies to the villages cut off by the earthquake arrives tomorrow.',
  image6Caption: 'Preparing the mules for the long journey to bring WFP food to remote villages.',
  vid1Caption: 'We crossed the first devastated village of our journey. It’s staggering to see from above.',
  image7Caption: 'We’re halfway there.',
  text3Eyebrow: 'LArke pass',
  text3Header: 'Our team is completely self-sufficient.',
  text3Body: 'We carry our own food, equipment and medical supplies. We hike from village to village assessing needs and then relaying these details via satellite phone back to WFP’s operations team.',
  image8Caption: 'Preparing the mules for the long journey to bring WFP food to remote villages.',
  image9Caption: 'My name is Nuri Sherpa. Thank you for letting me share my story.'

};

export default StoriesMountainExpress;
