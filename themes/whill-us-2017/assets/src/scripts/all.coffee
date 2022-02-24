$ = require 'jquery'
SlideMenu = require('./SlideMenu').default
Tooltip = require('./Tooltip').default
SwiperThumbs = require('./SwiperThumbs').default
MobileNavigation = require('./MobileNavigation').default
SubscriptionPopup = require('./SubscriptionPopup').default
FixedNavbar = require './FixedNavbar'
ScrollAction = require './ScrollAction'
SubNavigation = require './SubNavigation'
FixedSubNavbar = require './FixedSubNavbar'
Masonry = require './Masonry'
Swiper = require './../../../node_modules/swiper/dist/js/swiper.js'


$ ->
  #
  # MVのフェードアウト
  #

  $(window).on 'load', () ->
    $('.p-main-visual__overlay_fadeout')
    .delay(5000)
    .queue( () -> $(this).addClass("p-main-visual__overlay_hide").dequeue() )



#$ ->

  #
  # Yotube Link Btn.
  # =======================================================
  #
  #$('a[href*="youtu.be"]').each ()->
  #  href = $(this).attr('href');
  #  href = href.replace("youtu.be/", "www.youtube.com/watch?v=");
  #  $(this).attr('href', href);

  #youtube = $( 'a[href*="youtu"]:has(img):not(.header-youtube)');
  #youtube.append('<div class="p-text-image-block__play-btn"/>')
  #youtube.magnificPopup({
  #  type: 'iframe',
  #  mainClass: 'mfp-fade',
  #  removalDelay: 160,
  #  preloader: false,
  #  fixedContentPos: false
  #});

$ ->

  $( 'a.p-main-visual' ).magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });



$ ->
  $(document).ajaxSuccess (event, xhr, settings) ->
    url = settings.url
    if ga?
      ga 'send', 'pageview', url.replace location.origin, ""

$ ->
  SlideMenu.init()
  
$ ->
  Tooltip.init()

$ ->
  SwiperThumbs.init()
  
$ ->
  MobileNavigation.init()

$ ->
  SubscriptionPopup.init()

$ ->
  $(window).on 'load', () ->
    $('.p-voice-container').addClass('is-transition');

$ ->
  unless !navigator.userAgent.match(/Mobile/i) and !navigator.userAgent.match(/ios/i) and !navigator.userAgent.match(/android/i)
    $("video").attr("controls","controls");



$ ->

  #
  # Scroll Top
  # =======================================================
  #
  $("[data-pageTop]").click ()->
    speed = 800;
    $("html, body").animate({scrollTop:0}, speed, "easeOutExpo");
    return false;

  #
  # in page scroll.
  # =======================================================
  #

  $ ->

    fixHash = (event) ->

      if event
        event.preventDefault()
      if location.hash.length > 1
        offsetTop = $(location.hash).offset().top
        $(window).scrollTop offsetTop - 130
      false

    fixHash()

    $(window).on "hashchange", fixHash


    $('.p-sub-navigation').on 'click', 'a', (event) ->

      hash = @.hash
      $target = $(hash)
      if $target.length
        event.preventDefault()
        offsetTop = $target.offset().top - 130
        $("html, body").animate({scrollTop:offsetTop}, 600, "easeOutExpo").promise().done () ->
          #location.hash = ''





$ ->


  $voiceContainer = $('[data-voice-container]')

  if $voiceContainer.length
    new Masonry {
      container: '[data-masonry]'
      sizer: '[data-masonry-sizer]'
      item: '[data-masonry-item]'
    }


    $(window).on "popstate",(event) ->
      loadContent( location.href )


    ###
    $("[data-masonry]").on  'click', '[data-masonry-item]', (event)->
      event.preventDefault()
      loadContent @.href, true
      $( 'a.p-main-visual' ).magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,

        fixedContentPos: false
      })

      return false

    $voiceContainer.on 'click', '.p-voice-content-header .c-btn', (event) ->
      event.preventDefault()
      loadContent( @.href, true )
    ###


  loadContent = ( href , addHistory )->
    scroll = $(window).scrollTop() #for chrome bug fix.

    parser = document.createElement('a')
    parser.href = href

    console.log(parser.pathname.substr(1).split('/').length);

    if parser.pathname.substr(1).split('/').length > 2

      $.ajax(
        url: href
      )
      .done( ( data ) =>
        $voiceContainer.one 'transitionend', () ->
          if addHistory
            history.pushState({href: href}, '', href)
          $('body').css overflow: 'hidden'

          $(window).one 'scroll', ()->
            $(window).scrollTop(scroll)



        html =  '<div>' + data + '</div>'
        $content = $(html).find('[data-voice-content]')
        $voiceContainer.html($content)
        $voiceContainer.addClass('is-active');
        $voiceContainer.css paddingTop: $('.p-navbar').height()

      )

    else

      if $voiceContainer.length
        $voiceContainer.removeClass('is-active')
        $('body').css overflow: 'visible'
        if addHistory
          history.pushState({href: href}, '', href)
      else
        if location.pathname.indexOf('experiences') > -1
          location.reload()

#
#
# jumbotron
# =======================================================
#

$ ->
  swiper = new Swiper('.p-jumbotron', {
    spaceBetween: 0,
    #loop: true,
    loop: false,
    speed: 900,
    autoplay: 8000,
    autoplayDisableOnInteraction: false,
    pagination: '.p-jumbotron__pagination',
    paginationClickable: true

  });

  new Swiper('.p-slideshow', {
    spaceBetween: 0,
    speed: 1000,
    autoplay: 3000,
    effect: 'fade',
    autoplayDisableOnInteraction: false
  })

###
$ ->
    galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      controller: {
          control: galleryThumbs;
      },
    });

$ ->
    galleryThumbs = new Swiper('.gallery-thumbs', {
      spaceBetween: 10,
      centeredSlides: true,
      slidesPerView: 'auto',
      touchRatio: 0.2,
      slideToClickedSlide: true,
      controller: {
          control: galleryTop;
      },
    });
###

$(window).load ->

  $('.p-slider-gallery').each () ->
    $(@).find(".gallery-item").addClass('swiper-slide')
    $(@).find(".gallery").addClass('swiper-wrapper')
    new Swiper( @, {
      spaceBetween: 0,
      speed: 500,
      autoplay: 2000,
      autoplayDisableOnInteraction: false
    })




#
#
# Navbar fixed
# =======================================================
#

$ ->
  subNavigation =  new SubNavigation '[data-sub-navigation]', '.p-page-content'
  subNavigation.$element.clone(true).appendTo $ '[data-sub-navigation-fixed]'

  navbar = new FixedNavbar('[data-fixed-navbar]', '[data-fixed-body]')

  $("[data-sub-navigation-container]").each ()->
    subNavigation = new FixedSubNavbar($(@), 'is-hidden', navbar)

  .on "setClass", () ->
    $(".p-navbar__sub-navigation").show()

  .on "unsetClass", () ->
    $(".p-navbar__sub-navigation").hide()



#
# Scroll Add/remove Class.
# =======================================================
#
$ ->
  $("[data-scroll-addclass]").each ()->
    $this = $ @
    new ScrollAction $this, $this.data("scroll-addclass")


  $('.p-navbar')
  .on "setClass", () ->
    $(".p-navigation__item_tel-content").removeClass('is-active')

  .on "unsetClass", () ->
    $(".p-navigation__item_tel-content").addClass('is-active')


  $(".p-navigation__item_tel i").on 'click', () ->
    $(".p-navigation__item_tel-content").toggleClass('is-active')


  if $(".p-navbar_small").length > 0
    $(".p-navigation__item_tel-content").removeClass('is-active')

  else
    $(".p-navigation__item_tel-content").addClass('is-active')




$ ->

  $window = $(window);
  $player = $('.player')
  $player.mb_YTPlayer();


  $(".p-page-content video").each () ->
    $this = $(@)
    $window.on 'load scroll', =>
      if !navigator.userAgent.match(/Mobile/i) and !navigator.userAgent.match(/ios/i) and !navigator.userAgent.match(/android/i)
        triggerNodePosition = $this.offset().top - $window.height()
        if triggerNodePosition < $window.scrollTop() and $window.scrollTop() < $this.offset().top + $this.height()
          $this.get(0).play()
        else
          $this.get(0).pause()
          #$this.get(0).currentTime = 0


#  $("[data-scroll-class]").each ()->
#    $this = $(@)
#    classData = $this.data("scroll-class");
#
#    $firstView = true;
#    $window = $ window;
#
#
#
#
#  $("[data-scr-rmclass]").each ()->
#    $this = $(@)
#    classData = $this.data("scr-rmclass");
#
#    $firstView = true;
#    $window = $ window;
#    $window.on "load resize scroll", ()->
#      if $window.height() > $window.scrollTop() + $this.height()
#        unless $firstView
#          $firstView = true
#          $this.addClass(classData)
#      else
#        if $firstView
#          $firstView = false
#          $this.removeClass(classData)
