/* VIDEO PLAYER */

import React, { PropTypes } from 'react';
import styles from './VideoPlayer.scss';
import withStyles from '../../../decorators/withStyles';

@withStyles(styles)
class VideoPlayer {
  static propTypes = {
    className: PropTypes.string,
    videoYouTubeID: PropTypes.string
  };

  render() {

    var youtubeURL = `https://www.youtube.com/embed/${this.props.videoYouTubeID}`;

    return (
      <div className="VideoPlayer module">
        <div className="video">
          <div className="row collapse">
            <div className="small-12 medium-12 large-12 columns">
              <div className="ratioBox ratio16_9">
                <div className="ratioContent">
                  <iframe width="100%" height="100%" src={youtubeURL} frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VideoPlayer;
