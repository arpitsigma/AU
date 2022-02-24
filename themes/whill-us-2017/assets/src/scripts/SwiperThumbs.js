import $ from 'jquery';

export default class SwiperThumbs {

  static init() {
    var galleryTop, galleryThumbs;
    var galleryTop = new Swiper('.gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 0,
    });
    var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 0,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true,
    });
    galleryTop.params.control = galleryThumbs;
    galleryThumbs.params.control = galleryTop;
  }

}