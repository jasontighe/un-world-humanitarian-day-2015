/* VIDEO PLAYER */

import React, { PropTypes } from 'react';
import styles from './CelebrityVideo.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class CelebrityVideo {
  static propTypes = {
    className: PropTypes.string,
    videoYouTubeID: PropTypes.string,
    celebIDFromURL: PropTypes.string,
    celebIDs: PropTypes.shape
  };

  render() {
    var celebs = {
      'cody': 'LViYO_C_tm8',
      'kaka': 'mvUnrqpQNro'
    };
    var youtubeURL = 'https://www.youtube.com/embed/';
    var celebIDs = this.props.celebIDs;
    var youtubeID = celebs[this.props.celebIDFromURL];
    if( youtubeID ){
      youtubeURL = youtubeURL + youtubeID;
      setTimeout( function(){
        var videoElm = document.getElementById('CelebrityVideo');
        console.log(videoElm);
        videoElm.className = videoElm.className + ' open';
      }, 2500 );

      //close video on close button click
      document.getElementById('celeb-video-close').onclick = function(){
        var elems = document.querySelectorAll('#CelebrityVideo.open');
        [].forEach.call(elems, function(el) {
            el.className = el.className.replace(/open/g, '');
        });
      };
    }


    return (
      <div id="CelebrityVideo" className="module">
        <div id="celeb-video-close"></div>
        <div className="video">
          <div className="row collapse">
            <div className="small-12 medium-12 large-12 columns">
              <div className="ratioBox ratio16_9">
                <div className="ratioContent">
                  <iframe width="100%" height="100%" src={youtubeURL} frameborder="0" allowfullscreen modestbranding="1" rel="0"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CelebrityVideo;
