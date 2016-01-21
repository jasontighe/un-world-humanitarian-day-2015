/* DETAIL PAGE */

import React, { PropTypes } from 'react';
import StoriesHero from '../StoriesHero';
import styles from './StoriesPage.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class StoriesPage {
    static propTypes = {
        path: PropTypes.string.isRequired,
        className: PropTypes.string,
        title: PropTypes.string,
        content: PropTypes.array,
        authorName: PropTypes.string,
        authorDesc: PropTypes.string,
        text1Header: PropTypes.string,
        text1Body: PropTypes.string,
        text2Body: PropTypes.string,
        text2Header: PropTypes.string,
        vid1Caption: PropTypes.string,
        image1Caption: PropTypes.string,
        image2Caption: PropTypes.string,
        text3Header: PropTypes.string,
        text3Body: PropTypes.string,
        text4Header: PropTypes.string,
        image3Caption: PropTypes.string,
        image4CaptionTitle: PropTypes.string,
        image4Caption: PropTypes.string,
        image5Caption: PropTypes.string,
        text5BigHeader: PropTypes.string,
        text5Header: PropTypes.string,
        text5Body: PropTypes.string,
        text6Eyebrow: PropTypes.string,
        text6Header: PropTypes.string,
        text6Body: PropTypes.string,
        image6BigCaption: PropTypes.string
    };

    static contextTypes = {
        onSetTitle: PropTypes.func.isRequired
    };

    render() {
        this.context.onSetTitle(this.props.title);
        return (
            <div className="StoriesPage">
                <div className="ContentPage-container">
                  <StoriesHero {...this.props}/>
                  <div className="row collapse">
                    <div className="small-4 medium-4 large-4 columns">
                      <div className="by-block">
                        <img src="./images/story_damascus_profile_pic.png" />
                        <div className="author">
                          <div className="author-name">{this.props.authorName}</div>
                          <div className="author-desc">{this.props.authorDesc}</div>
                        </div>
                      </div>
                      <div className="textblock-blue">
                        <h2>{this.props.text1Header}</h2>
                        <p>{this.props.text1Body}</p>
                      </div>
                    </div>
                    <div className="small-8 medium-8 large-8 columns">
                      <div className="video-half-block">
                        <img src="./images/story_damascus_vid1.jpg" />
                        <div className="caption">{this.props.vid1Caption}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-5 medium-5 large-5 columns textblock">
                      <h2>{this.props.text2Header}</h2>
                      <p>{this.props.text2Body}</p>
                    </div>
                    <div className="small-7 medium-7 large-7 columns">
                      <div className="full-width-short">
                        <img src="./images/story_damascus_map.jpg" />
                        <div className="caption">{this.props.image1Caption}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-8 medium-8 large-8 columns">
                      <div className="full-width-medium">
                        <img src="./images/story_damascus_family.jpg" />
                        <div className="caption">{this.props.image2Caption}</div>
                      </div>
                    </div>
                    <div className="small-4 medium-4 large-4 columns">
                      <div className="textblock-blue">
                        <h2>{this.props.text3Header}</h2>
                        <p>{this.props.text3Body}</p>
                      </div>
                      <div className="textblock">
                        <h2>{this.props.text4Header}</h2>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-12 medium-12 large-12 columns">
                      <div className="full-width-short">
                        <img src="./images/story_damascus_boat_closeup.jpg" />
                        <div className="caption">{this.props.image3Caption}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-12 medium-12 large-12 columns">
                      <div className="full-width-tall">
                        <img src="./images/story_damascus_boat_wide.jpg" />
                        <div className="caption-title">{this.props.image4CaptionTitle}</div>
                        <div className="caption">{this.props.image4Caption}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-6 medium-6 large-6 columns">
                      <div className="half-width-medium">
                        <img src="./images/story_damascus_bus.jpg" />
                        <div className="caption">{this.props.image5Caption}</div>
                      </div>
                    </div>
                    <div className="small-6 medium-6 large-6 columns">
                      <div className="textblock-tall">
                        <h1>{this.props.text5BigHeader}</h1>
                        <h2>{this.props.text5Header}</h2>
                        <p>{this.props.text5Body}</p>
                      </div>
                    </div>
                  </div>
                  <div className="row collapse">
                    <div className="small-6 medium-6 large-6 columns">
                      <div className="textblock">
                        <div className="eyebrow">{this.props.text6Eyebrow}</div>
                        <h2>{this.props.text6Header}</h2>
                        <p>{this.props.text6Body}</p>
                      </div>
                    </div>
                    <div className="small-6 medium-6 large-6 columns">
                      <div className="textblock-blue">
                        <h2>{this.props.text5Header}</h2>
                        <p>{this.props.text5Body}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row collapse">
                  <div className="small-12 medium-12 large-12 columns">
                    <div className="full-width-short">
                      <img src="./images/story_damascus_closeup_fullwidth.jpg" />
                      <div className="caption-top-lrg">{this.props.image6BigCaption}</div>
                    </div>
                  </div>
                </div>
            </div>
      );
    }
}

StoriesPage.defaultProps = {
  title: 'DAMASCUS TO ITALY',
  desc: 'By donating your feed the following story will be told using XX number of posts over one day. You are giving a voice to someone in need and inspiring others to do the same.',
  authorName: 'Thair Orfahli',
  authorDesc: 'Refugee from Damascus, Syria',
  vid1Caption: 'Yesterday a bomb went off in the street near me, wounding many innocent bystanders. I couldn’t bring myself to post the full video out of respect to the deceased families.',
  text1Header: 'Syria is filled with tension & fighting.',
  text1Body: 'I’m not sure what the future holds from here. Thousands of people have been killed and injured. Millions have been displaced. Countless homes, hospitals and schools have been damaged or destroyed.',
  image1Caption: 'Syrian refugees now make up one out of four people in Lebanon. As a result, services are being strained and tensions are rising. I no longer feel safe. I’ve decided to shift my studies to Egypt – a group of us will leave for Alexandria tomorrow.',
  image2Caption: 'I have been in Alexandria, Egypt, for two weeks and have been able to continue my studies. I found a room in a shared apartment with other Syrian refugees. It’s been great to see my old friend Sara, together we are helping refugees communities that are struggling with basic needs.',
  text2Header: 'It is no longer safe for me in Syria.',
  text2Body: 'I have no choice but to leave. Millions have already sought protection in neighbouring countries. I am taking a shared car tonight to Lebanon. In 2 hours I will be in Beirut, Inch’allah.',
  text3Header: 'My passport was stolen',
  text3Body: 'and the Syrian embassy in Cairo would not issue a new one for me. Without a passport I cannot get a valid visa to stay in Egypt. Should the police find me without papers once again, they will very likely send me back to Syria where my life will be in big danger. It became too dangerous here and I am scar.',
  text4Header: 'It’s 2.00 am, I can’t sleep. The police were just here at Sara’s house asking if she is hosting Syrians',
  image3Caption: 'You have to pay US$ 2,000 for the very expensive crossing from Alexandria to Sicily, Italy. The news talks about these boats sinking with no survivors but I need to try to cross so that I can build a new life. Maybe I’m making the wrong choice?',
  image4CaptionTitle: '10 Days',
  image4Caption: 'I have met so many amazing refugees. 234 of us from Sudan, Eritrea, Somalia, Syria and Iraq. Each story is more touching than the next. The strength they have shown is unbelievable.',
  image5Caption: 'We have been well received in Sicily, Southern Italy, but it\'s not our final destination. From here we\'ll push on to Northern Italy. It\'s dangerous, but I know we can make it.',
  text5BigHeader: '3248km',
  text5Header: 'travelled so far.',
  text5Body: 'It’s hard to say goodbye to wonderful Italy but it’s not my best hope for an asylum application. England was my first choice but the France-Uk crossing is a dangerous one. Refugees and asylum seekers have to jump on container ships and many risk death from suffocation the containers. My friends have suggested Berlin, Germany. Arrivederci, Italia.',
  text6Eyebrow: 'ITALY TO BERLIN',
  text6Header: 'I’m embarking on what I hope is the final leg of this long journey.',
  text6Body: 'by crossing the border to Germany. Since Italian, French, Swiss, Austrian and German authorities are controlling everyone on trains and buses that cross the borders I have to travel by car to avoid being caught and sent back to Italy.',
  text7Header: 'I’ve made it to berlin. i am so grateful to germany,',
  text7Body: 'however, I consider the UK “my home away from home”. My grandfather was British and my mum is a British Citizen Overseas. She hasn’t seen me in 4 long years and her biggest hope is that she will soon be reunited with me in the UK.',
  image6BigCaption: 'My name is thatr Orfahli. Thank you for letting me share my story.'
};

export default StoriesPage;
