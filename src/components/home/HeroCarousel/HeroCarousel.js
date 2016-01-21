/* HEROCAROUSEL */

import React, { PropTypes } from 'react';
import styles from './HeroCarousel.scss';
import withStyles from '../../../decorators/withStyles';
import helpers from '../../../utils/helpers';
import LazyLoad from 'react-lazy-load';

@withStyles(styles)
class HeroCarousel extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    carousel: PropTypes.array,
    donateCopy: PropTypes.string,
    followCopy: PropTypes.string,
    settings: PropTypes.string,
    handleResize: PropTypes.func,
    customDots: PropTypes.array,
    link: PropTypes.string,
    storyIndex: PropTypes.number,
    handleDonateClick: PropTypes.func,
    handleStoryClick: PropTypes.func

  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('HeroCarousel.componentDidMount()');
    this.insertDotsInSlick(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('HeroCarousel.shouldComponentUpdate()');
    return true;
  }

  insertDotsInSlick(scope) {
    console.log('HeroCarousel.insertDotsInSlick()');

    setTimeout( function(){
      console.log("***Slick Loading***");
      $('.hero-slider').slick({
        dots: true,
        arrows: true,
        speed: 500,
        slidesToShow: 1,
        autoplay: false,
        autoplaySpeed: 1000
      });

      $('.hero-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
        console.log(this);
        scope.updateDotIndicator(nextSlide);
      });
      scope.updateDotIndicator(0);
    }, 2000 );
  }

  updateDotIndicator(index){
    console.log('updateDotIndicator');
    $('.custom-slick-dots-nav').find('img').removeClass('selected');
    var selectedDot = $('.custom-slick-dots-nav').children().eq(index);
    selectedDot.find('img').addClass('selected');
  }

  goToSliderNum(index) {
    /**/
    
    console.log('HerCarousel.goToSliderNum - index: ', index);
    $('.hero-slider').slick('slickGoTo', index);
    this.props.storyIndex = index;
  };

  handleDonateClick() {
    var params = helpers.getPageParams();
    var locale = params[2];
    var url = this.props.link + locale;
    document.location.href = url;
  };

  handleStoryClick() {
    var index = $('.hero-slider').slick('slickCurrentSlide');
    var url = this.props.carousel[index].link;
    document.location.href = url;
  };

  render() {
    console.log('HeroCarousel.render()');

    // setup analytics variables
    var analyticsDonate = '{"label":"' + this.props.donateCopy + '", "category":"hero carousel"}',
        analyticsFollow = '{"label":"' + this.props.followCopy + '", "category":"hero carousel"}';

    var slides = this.props.carousel.map((slide, index) => {
      return (
        <div className="stories-carousel-item" key={index}>
          <picture>
            <source srcSet={slide.backgroundImage} media="(min-width: 769px)" />
            <img srcSet={slide.mobileImage} />
          </picture>
          <div className="content-overlay">
            <div className="row collapse">
              <div className="small-12 medium-12 large-8 large-offset-2 columns">
                <img src={slide.profileImage} alt={slide.firstName} />
                <p className="title">{slide.title}</p>
              </div>
            </div>
          </div>
        </div>
      );
    });

    var dots = this.props.carousel.map((slide, index) => {
      // setup analytics variable
      var analyticsCelebs = '{"label":"'+ slide.firstName + ' ' + slide.lastName + '", "category":"hero carousel"}';
//    "{'label':'{slide.firstName} {slide.lastName}', 'category':'hero carousel'}"
      return (
        <div className="custom-dot-nav-item" key={index} onClick={this.goToSliderNum.bind(this, index)}
             data-track={analyticsCelebs}>
          <img className="carouselNavImages fadeAll15" src={slide.navImage} alt={slide.firstName} />
          <p className="name">{slide.firstName} {slide.lastName}</p>
        </div>
      );
    });

    var settings = {
      dots: true,
      arrows: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: false,
      autoplaySpeed: 1000
    };

    //console.log('HeroCarousel.render() $: ', $);
    return (
      <div className="HeroCarousel module">
        <div className="row collapse">
          <div className="small-12 medium-12 large-12 columns">

            <div className="hero-slider" >
              {slides}
            </div>

            <div className="row collapse">
              <div className="overlayButtons">

                  <div className="small-12 medium-6 large-6 columns">
                    <div className="button blueToClear carouselBtn donateBtn noBoxShadow"
                         onClick={this.handleDonateClick.bind(this)}
                         data-track={analyticsDonate}>
                      {this.props.donateCopy}
                    </div>
                  </div>

                  <div className="small-12 medium-6 large-6 columns">
                    <div className="button clearToBlue carouselBtn followBtn noBoxShadow"
                         onClick={this.handleStoryClick.bind(this)}
                         data-track={analyticsFollow}>
                      {this.props.followCopy}
                    </div>
                  </div>
              </div>
            </div>

          </div>
        </div>
        <div className="row collapse">
          <div className="small-12 medium-12 large-12 columns">
            <div className="custom-slick-dots-nav">
              {dots}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HeroCarousel.defaultProps = {
  carousel: [],
  link: '/donate/',
  storyIndex: 0
};

export default HeroCarousel;
