(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var $, FixedNavbar,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

module.exports = FixedNavbar = (function() {
  function FixedNavbar(navbarSelector, bodySelector) {
    this.init = bind(this.init, this);
    this.getNavbarOffset = bind(this.getNavbarOffset, this);
    this.getNavbarHeight = bind(this.getNavbarHeight, this);
    this.$navbar = $(navbarSelector);
    this.$body = $(bodySelector);
    this.on();
    this.init();
  }

  FixedNavbar.prototype.getNavbarHeight = function() {
    return this.$navbar.height();
  };

  FixedNavbar.prototype.getNavbarOffset = function() {
    return this.$navbar.position().top;
  };

  FixedNavbar.prototype.init = function() {
    this.$navbar.addClass('is-fixed');
    return this.$body.css({
      paddingTop: this.getNavbarHeight()
    });
  };

  FixedNavbar.prototype.on = function() {
    var $window;
    $window = $(window);
    $window.resize(this.init);
    $window.on("hashchange", this.shiftWindow);
    return $("body").on("click", "a", (function(_this) {
      return function(event) {};
    })(this));
  };

  return FixedNavbar;

})();


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
var $, FixedSubNavbar,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

module.exports = FixedSubNavbar = (function() {
  function FixedSubNavbar($element, classData, navbar) {
    this.action = bind(this.action, this);
    this.getOffset = bind(this.getOffset, this);
    this.unsetClass = bind(this.unsetClass, this);
    this.setClass = bind(this.setClass, this);
    this.navbar = navbar;
    this.$element = $element;
    this.classData = classData;
    this.$window = $(window);
    this.action();
    this.$window.on("load resize scroll", this.action);
  }

  FixedSubNavbar.prototype.setClass = function() {
    this.$element.addClass(this.classData);
    return this.$element.trigger("setClass");
  };

  FixedSubNavbar.prototype.unsetClass = function() {
    this.$element.removeClass(this.classData);
    return this.$element.trigger("unsetClass");
  };

  FixedSubNavbar.prototype.getOffset = function() {
    return parseInt(this.$element.offset().top);
  };

  FixedSubNavbar.prototype.action = function() {
    if (this.$window.scrollTop() < this.getOffset() - parseInt(this.navbar.getNavbarHeight())) {
      return this.unsetClass();
    } else {
      return this.setClass();
    }
  };

  return FixedSubNavbar;

})();


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){
var $, _;

_ = (typeof window !== "undefined" ? window['_'] : typeof global !== "undefined" ? global['_'] : null);

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

require("./..\\..\\..\\bower_components\\jquery-bridget\\jquery.bridget.js");

$.bridget('packery', require('packery'));

module.exports = function(option) {
  var $appendButton, $masonry, append, isContentsOverScreen, isLoading, page, triggerScrollToBottom;
  page = 1;
  isLoading = false;
  $masonry = $('[data-masonry]').packery({
    columnWidth: '[data-masonry-sizer]',
    itemSelector: '[data-masonry-item]',
    percentPosition: true,
    transitionDuration: 0
  });
  isContentsOverScreen = function() {
    var $container;
    $container = $('[data-masonry]');
    return $container.height() + $container.offset().top < $(window).height() + $(window).scrollTop();
  };
  triggerScrollToBottom = function() {
    if (isContentsOverScreen()) {
      return $(window).trigger('scrollToBottom');
    }
  };
  append = function() {
    var nextPage;
    if (!isLoading) {
      if (page < $masonry.data('masonry-max-page')) {
        nextPage = page + 1;
        isLoading = true;
        $masonry.packery('once', 'layoutComplete', function() {
          isLoading = false;
          return page++;
        });
        return $.ajax({
          url: '/experiences/page/' + nextPage
        }).done(function(data) {
          var $items, html;
          html = '<div>' + data + '</div>';
          $items = $(html).find('[data-masonry-item]');
          $masonry.append($items);
          return $masonry.packery('appended', $items);
        });
      }
    }
  };
  $masonry.on({
    layoutComplete: function() {
      console.log('Packery layout completed on 1');
      $('.p-voices__item').css('opacity', '1');
      return console.log('Packery layout completed on 2');
    }

    /*
    $grid.on( 'layoutComplete',
      function( event, laidOutItems ) {
        console.log( 'Packery layout completed on ' +
          laidOutItems.length + ' items' );
      }
    );
     */
  });
  $appendButton = $('[data-tile-append]');
  if ($appendButton) {
    $appendButton.on('click', (function(_this) {
      return function(event) {
        event.preventDefault();
        return _.throttle(append, 0);
      };
    })(this));
  }
  if ($masonry.length > 0) {
    $(window).on('load', function() {
      return $masonry.packery();
    });
    $(window).on('scroll', _.throttle(triggerScrollToBottom, 0));
    return $(window).on('scrollToBottom', append);
  }
};


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./..\\..\\..\\bower_components\\jquery-bridget\\jquery.bridget.js":12,"packery":24}],4:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MobileNavigation = function () {
  function MobileNavigation() {
    _classCallCheck(this, MobileNavigation);
  }

  _createClass(MobileNavigation, null, [{
    key: 'init',
    value: function init() {

      if ('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch) {

        // Touch events are supported

        (0, _jquery2.default)(document).on('touchstart', '.menu-item-has-children', function (e) {
          if (e.target.tagName == 'LI') {
            (0, _jquery2.default)(this).toggleClass('active');
          }
        });
      } else {

        (0, _jquery2.default)(document).on('click', '.menu-item-has-children', function (e) {
          if (e.target.tagName == 'LI') {
            (0, _jquery2.default)(this).toggleClass('active');
          }
        });
      }

      (0, _jquery2.default)(window).resize(function () {
        (0, _jquery2.default)('.menu-item-has-children').removeClass('active');
      });
    }
  }]);

  return MobileNavigation;
}();

exports.default = MobileNavigation;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
(function (global){
var $, ScrollAction,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

module.exports = ScrollAction = (function() {
  function ScrollAction($element, classData) {
    this.action = bind(this.action, this);
    this.getOffset = bind(this.getOffset, this);
    this.unsetClass = bind(this.unsetClass, this);
    this.setClass = bind(this.setClass, this);
    this.$element = $element;
    this.classData = classData;
    this.$window = $(window);
    this.$window.on("load resize scroll", this.action);
    this.action();
  }

  ScrollAction.prototype.setClass = function() {
    if (!this.$element.hasClass(this.classData)) {
      this.$element.addClass(this.classData);
      return this.$element.trigger("setClass");
    }
  };

  ScrollAction.prototype.unsetClass = function() {
    if (this.$element.hasClass(this.classData)) {
      this.$element.removeClass(this.classData);
      return this.$element.trigger("unsetClass");
    }
  };

  ScrollAction.prototype.getOffset = function() {
    if (this.$element.css('position') === "fixed") {
      return parseInt(this.$element.height()) + parseInt(this.$element.position().top);
    } else {
      return parseInt(this.$element.offset().top);
    }
  };

  ScrollAction.prototype.action = function() {
    if (this.$window.scrollTop() < this.getOffset()) {
      return this.unsetClass();
    } else {
      return this.setClass();
    }
  };

  return ScrollAction;

})();


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],6:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SlideMenu = function () {
	function SlideMenu($el) {
		_classCallCheck(this, SlideMenu);

		this.$el = $el;
		this.state = false;
		this.$target = (0, _jquery2.default)(this.$el.data("slidemenu-target"));
		this.on();
	}

	_createClass(SlideMenu, [{
		key: 'on',
		value: function on() {
			this.$el.on('click', this.toggle.bind(this));
		}
	}, {
		key: 'toggle',
		value: function toggle(event) {
			event.preventDefault();
			this.state = !this.state;
			if (this.state) {
				this.open();
			} else {
				this.close();
			}
		}
	}, {
		key: 'open',
		value: function open() {
			var height;
			this.$el.addClass("is-open");
			this.$target.addClass("is-open");
			this.$target.height("");
			height = this.$target.height();
			this.$target.height(0);
			this.$target.height(height);
			if (this.$el.hasClass('p-navbar__toggle')) {
				(0, _jquery2.default)('body').height(height).css('overflow', 'hidden');
			}
		}
	}, {
		key: 'close',
		value: function close() {
			this.$target.height(this.$target.height());
			this.$target.height(0);
			this.$el.removeClass("is-open");
			this.$target.removeClass("is-open");
			if (this.$el.hasClass('p-navbar__toggle')) {
				(0, _jquery2.default)('body').height('auto').css('overflow', 'visible');
			}
		}
	}], [{
		key: 'init',
		value: function init() {
			(0, _jquery2.default)("[data-slidemenu-target]").each(function () {
				return new SlideMenu((0, _jquery2.default)(this));
			});
		}
	}]);

	return SlideMenu;
}();

exports.default = SlideMenu;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],7:[function(require,module,exports){
(function (global){
var $, SubNavigation, _;

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

_ = (typeof window !== "undefined" ? window['_'] : typeof global !== "undefined" ? global['_'] : null);

module.exports = SubNavigation = (function() {
  function SubNavigation(selector, contentsSelector) {
    var items, self;
    this.$element = $(selector);
    this.$content = $(contentsSelector);
    items = this.create();
    self = this;
    this.$element.each(function() {
      var $this, html, template;
      $this = $(this);
      template = _.template($('[data-sub-navigation-template]').text());
      if (template) {
        html = _.map(items, function(item) {
          return template(item);
        });
        return $this.append(html);
      }
    });
  }

  SubNavigation.prototype.create = function() {
    var items;
    items = [];
    this.$content.find('h1, h2, h3, h4').each(function() {
      var $this, id;
      $this = $(this);
      id = $this.attr('id');
      if (!id) {
        id = $this.find('a').attr('id');
      }
      if (id) {
        return items.push({
          id: id,
          text: $this.text()
        });
      }
    });
    return items;
  };

  return SubNavigation;

})();


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SubscriptionPopup = function () {
  function SubscriptionPopup() {
    _classCallCheck(this, SubscriptionPopup);
  }

  _createClass(SubscriptionPopup, null, [{
    key: 'init',
    value: function init() {

      var targetHeight = (0, _jquery2.default)(window).height(),
          subPop = (0, _jquery2.default)('.subscription-popup'),
          showSubscriptionPopup = false;

      if (typeof Storage !== 'undefined') {
        //localStorage.subscriptionEnabled = 'yes';
        //console.log(localStorage.subscriptionEnabled);
        //console.log(sessionStorage.subscriptionClosed);
        if (sessionStorage.subscriptionClosed == undefined) {
          //console.log('sessionStorage.subscriptionClosed is undefined');
          showSubscriptionPopup = true;
        } else {
          //console.log('sessionStorage.subscriptionClosed is present');
          if (sessionStorage.subscriptionClosed == 'yes') {
            showSubscriptionPopup = false;
          }
        }
      }

      (0, _jquery2.default)(window).scroll(function () {
        var scrollPos = (0, _jquery2.default)(document).scrollTop();
        if (scrollPos > targetHeight && showSubscriptionPopup) {
          subPop.addClass('showed-popup');
        } else {
          subPop.removeClass('showed-popup');
        }
      });

      (0, _jquery2.default)(document).on('click', '.subscription-popup .close-popup', function () {
        subPop.hide();
        sessionStorage.subscriptionClosed = 'yes';
      }).on('click', '.pardot-forms-widget', function () {
        //console.log('click');
      }).on('click', '.js-show-teaser-popup', function (e) {
        e.preventDefault();
        ShowTeaserBG(function () {
          setTimeout(function () {
            ShowTeaserPopup();
          }, 100);
        });
      }).on('click', '.teaser-popup-wrapper .close-popup', function (e) {
        (0, _jquery2.default)('.teaser-popup-wrapper').removeClass('showed-popup').addClass('closed-popup');
      });

      function ShowTeaserBG(callback) {
        (0, _jquery2.default)('.teaser-popup-wrapper').toggleClass('closed-popup');
        if (typeof callback == "function") {
          callback();
        }
      }

      function ShowTeaserPopup() {
        (0, _jquery2.default)('.teaser-popup-wrapper').toggleClass('showed-popup');
      }
    }
  }]);

  return SubscriptionPopup;
}();

exports.default = SubscriptionPopup;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SwiperThumbs = function () {
    function SwiperThumbs() {
        _classCallCheck(this, SwiperThumbs);
    }

    _createClass(SwiperThumbs, null, [{
        key: 'init',
        value: function init() {
            var galleryTop, galleryThumbs;
            var galleryTop = new Swiper('.gallery-top', {
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 0
            });
            var galleryThumbs = new Swiper('.gallery-thumbs', {
                spaceBetween: 0,
                centeredSlides: true,
                slidesPerView: 'auto',
                touchRatio: 0.2,
                slideToClickedSlide: true
            });
            galleryTop.params.control = galleryThumbs;
            galleryThumbs.params.control = galleryTop;
        }
    }]);

    return SwiperThumbs;
}();

exports.default = SwiperThumbs;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tooltip = function () {
  function Tooltip() {
    _classCallCheck(this, Tooltip);
  }

  _createClass(Tooltip, null, [{
    key: 'init',
    value: function init() {
      (0, _jquery2.default)('#supportTooltip').toggle();
      (0, _jquery2.default)(document).on('click', '#showSupportTooltip, #supportTooltip .close', function () {
        (0, _jquery2.default)('#supportTooltip').toggle();
      });
    }
  }]);

  return Tooltip;
}();

exports.default = Tooltip;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],11:[function(require,module,exports){
(function (global){
var $, FixedNavbar, FixedSubNavbar, Masonry, MobileNavigation, ScrollAction, SlideMenu, SubNavigation, SubscriptionPopup, Swiper, SwiperThumbs, Tooltip;

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

SlideMenu = require('./SlideMenu')["default"];

Tooltip = require('./Tooltip')["default"];

SwiperThumbs = require('./SwiperThumbs')["default"];

MobileNavigation = require('./MobileNavigation')["default"];

SubscriptionPopup = require('./SubscriptionPopup')["default"];

FixedNavbar = require('./FixedNavbar');

ScrollAction = require('./ScrollAction');

SubNavigation = require('./SubNavigation');

FixedSubNavbar = require('./FixedSubNavbar');

Masonry = require('./Masonry');

Swiper = require('./../../../node_modules/swiper/dist/js/swiper.js');

$(function() {
  return $(window).on('load', function() {
    return $('.p-main-visual__overlay_fadeout').delay(5000).queue(function() {
      return $(this).addClass("p-main-visual__overlay_hide").dequeue();
    });
  });
});

$(function() {
  return $(document).ajaxSuccess(function(event, xhr, settings) {
    var url;
    url = settings.url;
    if (typeof ga !== "undefined" && ga !== null) {
      return ga('send', 'pageview', url.replace(location.origin, ""));
    }
  });
});

$(function() {
  return SlideMenu.init();
});

$(function() {
  return Tooltip.init();
});

$(function() {
  return SwiperThumbs.init();
});

$(function() {
  return MobileNavigation.init();
});

$(function() {
  return SubscriptionPopup.init();
});

$(function() {
  return $(window).on('load', function() {
    return $('.p-voice-container').addClass('is-transition');
  });
});

$(function() {
  if (!(!navigator.userAgent.match(/Mobile/i) && !navigator.userAgent.match(/ios/i) && !navigator.userAgent.match(/android/i))) {
    return $("video").attr("controls", "controls");
  }
});

$(function() {
  $("[data-pageTop]").click(function() {
    var speed;
    speed = 800;
    $("html, body").animate({
      scrollTop: 0
    }, speed, "easeOutExpo");
    return false;
  });
  return $(function() {
    var fixHash;
    fixHash = function(event) {
      var offsetTop;
      if (event) {
        event.preventDefault();
      }
      if (location.hash.length > 1) {
        offsetTop = $(location.hash).offset().top;
        $(window).scrollTop(offsetTop - 130);
      }
      return false;
    };
    fixHash();
    $(window).on("hashchange", fixHash);
    return $('.p-sub-navigation').on('click', 'a', function(event) {
      var $target, hash, offsetTop;
      hash = this.hash;
      $target = $(hash);
      if ($target.length) {
        event.preventDefault();
        offsetTop = $target.offset().top - 130;
        return $("html, body").animate({
          scrollTop: offsetTop
        }, 600, "easeOutExpo").promise().done(function() {});
      }
    });
  });
});

$(function() {
  var $voiceContainer, loadContent;
  $voiceContainer = $('[data-voice-container]');
  if ($voiceContainer.length) {
    new Masonry({
      container: '[data-masonry]',
      sizer: '[data-masonry-sizer]',
      item: '[data-masonry-item]'
    });
    $(window).on("popstate", function(event) {
      return loadContent(location.href);
    });

    /*
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
     */
  }
  return loadContent = function(href, addHistory) {
    var parser, scroll;
    scroll = $(window).scrollTop();
    parser = document.createElement('a');
    parser.href = href;
    console.log(parser.pathname.substr(1).split('/').length);
    if (parser.pathname.substr(1).split('/').length > 2) {
      return $.ajax({
        url: href
      }).done((function(_this) {
        return function(data) {
          var $content, html;
          $voiceContainer.one('transitionend', function() {
            if (addHistory) {
              history.pushState({
                href: href
              }, '', href);
            }
            $('body').css({
              overflow: 'hidden'
            });
            return $(window).one('scroll', function() {
              return $(window).scrollTop(scroll);
            });
          });
          html = '<div>' + data + '</div>';
          $content = $(html).find('[data-voice-content]');
          $voiceContainer.html($content);
          $voiceContainer.addClass('is-active');
          return $voiceContainer.css({
            paddingTop: $('.p-navbar').height()
          });
        };
      })(this));
    } else {
      if ($voiceContainer.length) {
        $voiceContainer.removeClass('is-active');
        $('body').css({
          overflow: 'visible'
        });
        if (addHistory) {
          return history.pushState({
            href: href
          }, '', href);
        }
      } else {
        if (location.pathname.indexOf('experiences') > -1) {
          return location.reload();
        }
      }
    }
  };
});

$(function() {
  var swiper;
  swiper = new Swiper('.p-jumbotron', {
    spaceBetween: 0,
    loop: false,
    speed: 900,
    autoplay: 8000,
    autoplayDisableOnInteraction: false,
    pagination: '.p-jumbotron__pagination',
    paginationClickable: true
  });
  return new Swiper('.p-slideshow', {
    spaceBetween: 0,
    speed: 1000,
    autoplay: 3000,
    effect: 'fade',
    autoplayDisableOnInteraction: false
  });
});


/*
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
 */

$(window).load(function() {
  return $('.p-slider-gallery').each(function() {
    $(this).find(".gallery-item").addClass('swiper-slide');
    $(this).find(".gallery").addClass('swiper-wrapper');
    return new Swiper(this, {
      spaceBetween: 0,
      speed: 500,
      autoplay: 2000,
      autoplayDisableOnInteraction: false
    });
  });
});

$(function() {
  var navbar, subNavigation;
  subNavigation = new SubNavigation('[data-sub-navigation]', '.p-page-content');
  subNavigation.$element.clone(true).appendTo($('[data-sub-navigation-fixed]'));
  navbar = new FixedNavbar('[data-fixed-navbar]', '[data-fixed-body]');
  return $("[data-sub-navigation-container]").each(function() {
    return subNavigation = new FixedSubNavbar($(this), 'is-hidden', navbar);
  }).on("setClass", function() {
    return $(".p-navbar__sub-navigation").show();
  }).on("unsetClass", function() {
    return $(".p-navbar__sub-navigation").hide();
  });
});

$(function() {
  $("[data-scroll-addclass]").each(function() {
    var $this;
    $this = $(this);
    return new ScrollAction($this, $this.data("scroll-addclass"));
  });
  $('.p-navbar').on("setClass", function() {
    return $(".p-navigation__item_tel-content").removeClass('is-active');
  }).on("unsetClass", function() {
    return $(".p-navigation__item_tel-content").addClass('is-active');
  });
  $(".p-navigation__item_tel i").on('click', function() {
    return $(".p-navigation__item_tel-content").toggleClass('is-active');
  });
  if ($(".p-navbar_small").length > 0) {
    return $(".p-navigation__item_tel-content").removeClass('is-active');
  } else {
    return $(".p-navigation__item_tel-content").addClass('is-active');
  }
});

$(function() {
  var $player, $window;
  $window = $(window);
  $player = $('.player');
  $player.mb_YTPlayer();
  return $(".p-page-content video").each(function() {
    var $this;
    $this = $(this);
    return $window.on('load scroll', (function(_this) {
      return function() {
        var triggerNodePosition;
        if (!navigator.userAgent.match(/Mobile/i) && !navigator.userAgent.match(/ios/i) && !navigator.userAgent.match(/android/i)) {
          triggerNodePosition = $this.offset().top - $window.height();
          if (triggerNodePosition < $window.scrollTop() && $window.scrollTop() < $this.offset().top + $this.height()) {
            return $this.get(0).play();
          } else {
            return $this.get(0).pause();
          }
        }
      };
    })(this));
  });
});


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./../../../node_modules/swiper/dist/js/swiper.js":26,"./FixedNavbar":1,"./FixedSubNavbar":2,"./Masonry":3,"./MobileNavigation":4,"./ScrollAction":5,"./SlideMenu":6,"./SubNavigation":7,"./SubscriptionPopup":8,"./SwiperThumbs":9,"./Tooltip":10}],12:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Bridget makes jQuery widgets
 * v1.1.0
 * MIT license
 */

(function (window) {

  'use strict';

  // -------------------------- utils -------------------------- //

  var slice = Array.prototype.slice;

  function noop() {}

  // -------------------------- definition -------------------------- //

  function defineBridget($) {

    // bail if no jQuery
    if (!$) {
      return;
    }

    // -------------------------- addOptionMethod -------------------------- //

    /**
     * adds option method -> $().plugin('option', {...})
     * @param {Function} PluginClass - constructor class
     */
    function addOptionMethod(PluginClass) {
      // don't overwrite original option method
      if (PluginClass.prototype.option) {
        return;
      }

      // option setter
      PluginClass.prototype.option = function (opts) {
        // bail out if not an object
        if (!$.isPlainObject(opts)) {
          return;
        }
        this.options = $.extend(true, this.options, opts);
      };
    }

    // -------------------------- plugin bridge -------------------------- //

    // helper function for logging errors
    // $.error breaks jQuery chaining
    var logError = typeof console === 'undefined' ? noop : function (message) {
      console.error(message);
    };

    /**
     * jQuery plugin bridge, access methods like $elem.plugin('method')
     * @param {String} namespace - plugin name
     * @param {Function} PluginClass - constructor class
     */
    function bridge(namespace, PluginClass) {
      // add to jQuery fn namespace
      $.fn[namespace] = function (options) {
        if (typeof options === 'string') {
          // call plugin method when first argument is a string
          // get arguments for method
          var args = slice.call(arguments, 1);

          for (var i = 0, len = this.length; i < len; i++) {
            var elem = this[i];
            var instance = $.data(elem, namespace);
            if (!instance) {
              logError("cannot call methods on " + namespace + " prior to initialization; " + "attempted to call '" + options + "'");
              continue;
            }
            if (!$.isFunction(instance[options]) || options.charAt(0) === '_') {
              logError("no such method '" + options + "' for " + namespace + " instance");
              continue;
            }

            // trigger method with arguments
            var returnValue = instance[options].apply(instance, args);

            // break look and return first value if provided
            if (returnValue !== undefined) {
              return returnValue;
            }
          }
          // return this if no return value
          return this;
        } else {
          return this.each(function () {
            var instance = $.data(this, namespace);
            if (instance) {
              // apply options & init
              instance.option(options);
              instance._init();
            } else {
              // initialize new instance
              instance = new PluginClass(this, options);
              $.data(this, namespace, instance);
            }
          });
        }
      };
    }

    // -------------------------- bridget -------------------------- //

    /**
     * converts a Prototypical class into a proper jQuery plugin
     *   the class must have a ._init method
     * @param {String} namespace - plugin name, used in $().pluginName
     * @param {Function} PluginClass - constructor class
     */
    $.bridget = function (namespace, PluginClass) {
      addOptionMethod(PluginClass);
      bridge(namespace, PluginClass);
    };

    return $.bridget;
  }

  // transport
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], defineBridget);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    defineBridget((typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null));
  } else {
    // get jquery from browser global
    defineBridget(window.jQuery);
  }
})(window);

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],13:[function(require,module,exports){
/*!
 * classie v1.0.1
 * class helper functions
 * from bonzo https://github.com/ded/bonzo
 * MIT license
 * 
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = classie;
} else {
  // browser global
  window.classie = classie;
}

})( window );

},{}],14:[function(require,module,exports){
/*!
 * getStyleProperty v1.0.4
 * original by kangax
 * http://perfectionkills.com/feature-testing-css-properties/
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false, exports: false, module: false */

( function( window ) {

'use strict';

var prefixes = 'Webkit Moz ms Ms O'.split(' ');
var docElemStyle = document.documentElement.style;

function getStyleProperty( propName ) {
  if ( !propName ) {
    return;
  }

  // test standard property first
  if ( typeof docElemStyle[ propName ] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = propName.charAt(0).toUpperCase() + propName.slice(1);

  // test vendor specific properties
  var prefixed;
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof docElemStyle[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( function() {
    return getStyleProperty;
  });
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = getStyleProperty;
} else {
  // browser global
  window.getStyleProperty = getStyleProperty;
}

})( window );

},{}],15:[function(require,module,exports){
/**
 * matchesSelector v1.0.3
 * matchesSelector( element, '.selector' )
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, module: false */

( function( ElemProto ) {

  'use strict';

  var matchesMethod = ( function() {
    // check for the standard method name first
    if ( ElemProto.matches ) {
      return 'matches';
    }
    // check un-prefixed
    if ( ElemProto.matchesSelector ) {
      return 'matchesSelector';
    }
    // check vendor prefixes
    var prefixes = [ 'webkit', 'moz', 'ms', 'o' ];

    for ( var i=0, len = prefixes.length; i < len; i++ ) {
      var prefix = prefixes[i];
      var method = prefix + 'MatchesSelector';
      if ( ElemProto[ method ] ) {
        return method;
      }
    }
  })();

  // ----- match ----- //

  function match( elem, selector ) {
    return elem[ matchesMethod ]( selector );
  }

  // ----- appendToFragment ----- //

  function checkParent( elem ) {
    // not needed if already has parent
    if ( elem.parentNode ) {
      return;
    }
    var fragment = document.createDocumentFragment();
    fragment.appendChild( elem );
  }

  // ----- query ----- //

  // fall back to using QSA
  // thx @jonathantneal https://gist.github.com/3062955
  function query( elem, selector ) {
    // append to fragment if no parent
    checkParent( elem );

    // match elem with all selected elems of parent
    var elems = elem.parentNode.querySelectorAll( selector );
    for ( var i=0, len = elems.length; i < len; i++ ) {
      // return true if match
      if ( elems[i] === elem ) {
        return true;
      }
    }
    // otherwise return false
    return false;
  }

  // ----- matchChild ----- //

  function matchChild( elem, selector ) {
    checkParent( elem );
    return match( elem, selector );
  }

  // ----- matchesSelector ----- //

  var matchesSelector;

  if ( matchesMethod ) {
    // IE9 supports matchesSelector, but doesn't work on orphaned elems
    // check for that
    var div = document.createElement('div');
    var supportsOrphans = match( div, 'div' );
    matchesSelector = supportsOrphans ? match : matchChild;
  } else {
    matchesSelector = query;
  }

  // transport
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( function() {
      return matchesSelector;
    });
  } else if ( typeof exports === 'object' ) {
    module.exports = matchesSelector;
  }
  else {
    // browser global
    window.matchesSelector = matchesSelector;
  }

})( Element.prototype );

},{}],16:[function(require,module,exports){
/*!
 * docReady v1.0.4
 * Cross browser DOMContentLoaded event emitter
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true*/
/*global define: false, require: false, module: false */

( function( window ) {

'use strict';

var document = window.document;
// collection of functions to be triggered on ready
var queue = [];

function docReady( fn ) {
  // throw out non-functions
  if ( typeof fn !== 'function' ) {
    return;
  }

  if ( docReady.isReady ) {
    // ready now, hit it
    fn();
  } else {
    // queue function when ready
    queue.push( fn );
  }
}

docReady.isReady = false;

// triggered on various doc ready events
function onReady( event ) {
  // bail if already triggered or IE8 document is not ready just yet
  var isIE8NotReady = event.type === 'readystatechange' && document.readyState !== 'complete';
  if ( docReady.isReady || isIE8NotReady ) {
    return;
  }

  trigger();
}

function trigger() {
  docReady.isReady = true;
  // process queue
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var fn = queue[i];
    fn();
  }
}

function defineDocReady( eventie ) {
  // trigger ready if page is ready
  if ( document.readyState === 'complete' ) {
    trigger();
  } else {
    // listen for events
    eventie.bind( document, 'DOMContentLoaded', onReady );
    eventie.bind( document, 'readystatechange', onReady );
    eventie.bind( window, 'load', onReady );
  }

  return docReady;
}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( [ 'eventie/eventie' ], defineDocReady );
} else if ( typeof exports === 'object' ) {
  module.exports = defineDocReady( require('eventie') );
} else {
  // browser global
  window.docReady = defineDocReady( window.eventie );
}

})( window );

},{"eventie":17}],17:[function(require,module,exports){
/*!
 * eventie v1.0.6
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false, module: false */

( function( window ) {

'use strict';

var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// ----- module definition ----- //

if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( eventie );
} else if ( typeof exports === 'object' ) {
  // CommonJS
  module.exports = eventie;
} else {
  // browser global
  window.eventie = eventie;
}

})( window );

},{}],18:[function(require,module,exports){
/**
 * Fizzy UI utils v1.0.1
 * MIT license
 */

/*jshint browser: true, undef: true, unused: true, strict: true */

( function( window, factory ) {
  /*global define: false, module: false, require: false */
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
      'doc-ready/doc-ready',
      'matches-selector/matches-selector'
    ], function( docReady, matchesSelector ) {
      return factory( window, docReady, matchesSelector );
    });
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('doc-ready'),
      require('desandro-matches-selector')
    );
  } else {
    // browser global
    window.fizzyUIUtils = factory(
      window,
      window.docReady,
      window.matchesSelector
    );
  }

}( window, function factory( window, docReady, matchesSelector ) {

'use strict';

var utils = {};

// ----- extend ----- //

// extends objects
utils.extend = function( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
};

// ----- modulo ----- //

utils.modulo = function( num, div ) {
  return ( ( num % div ) + div ) % div;
};

// ----- isArray ----- //
  
var objToString = Object.prototype.toString;
utils.isArray = function( obj ) {
  return objToString.call( obj ) == '[object Array]';
};

// ----- makeArray ----- //

// turn element or nodeList into an array
utils.makeArray = function( obj ) {
  var ary = [];
  if ( utils.isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( obj && typeof obj.length == 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
};

// ----- indexOf ----- //

// index of helper cause IE8
utils.indexOf = Array.prototype.indexOf ? function( ary, obj ) {
    return ary.indexOf( obj );
  } : function( ary, obj ) {
    for ( var i=0, len = ary.length; i < len; i++ ) {
      if ( ary[i] === obj ) {
        return i;
      }
    }
    return -1;
  };

// ----- removeFrom ----- //

utils.removeFrom = function( ary, obj ) {
  var index = utils.indexOf( ary, obj );
  if ( index != -1 ) {
    ary.splice( index, 1 );
  }
};

// ----- isElement ----- //

// http://stackoverflow.com/a/384380/182183
utils.isElement = ( typeof HTMLElement == 'function' || typeof HTMLElement == 'object' ) ?
  function isElementDOM2( obj ) {
    return obj instanceof HTMLElement;
  } :
  function isElementQuirky( obj ) {
    return obj && typeof obj == 'object' &&
      obj.nodeType == 1 && typeof obj.nodeName == 'string';
  };

// ----- setText ----- //

utils.setText = ( function() {
  var setTextProperty;
  function setText( elem, text ) {
    // only check setTextProperty once
    setTextProperty = setTextProperty || ( document.documentElement.textContent !== undefined ? 'textContent' : 'innerText' );
    elem[ setTextProperty ] = text;
  }
  return setText;
})();

// ----- getParent ----- //

utils.getParent = function( elem, selector ) {
  while ( elem != document.body ) {
    elem = elem.parentNode;
    if ( matchesSelector( elem, selector ) ) {
      return elem;
    }
  }
};

// ----- getQueryElement ----- //

// use element as selector string
utils.getQueryElement = function( elem ) {
  if ( typeof elem == 'string' ) {
    return document.querySelector( elem );
  }
  return elem;
};

// ----- handleEvent ----- //

// enable .ontype to trigger from .addEventListener( elem, 'type' )
utils.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// ----- filterFindElements ----- //

utils.filterFindElements = function( elems, selector ) {
  // make array of elems
  elems = utils.makeArray( elems );
  var ffElems = [];

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // check that elem is an actual element
    if ( !utils.isElement( elem ) ) {
      continue;
    }
    // filter & find items if we have a selector
    if ( selector ) {
      // filter siblings
      if ( matchesSelector( elem, selector ) ) {
        ffElems.push( elem );
      }
      // find children
      var childElems = elem.querySelectorAll( selector );
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        ffElems.push( childElems[j] );
      }
    } else {
      ffElems.push( elem );
    }
  }

  return ffElems;
};

// ----- debounceMethod ----- //

utils.debounceMethod = function( _class, methodName, threshold ) {
  // original method
  var method = _class.prototype[ methodName ];
  var timeoutName = methodName + 'Timeout';

  _class.prototype[ methodName ] = function() {
    var timeout = this[ timeoutName ];
    if ( timeout ) {
      clearTimeout( timeout );
    }
    var args = arguments;

    var _this = this;
    this[ timeoutName ] = setTimeout( function() {
      method.apply( _this, args );
      delete _this[ timeoutName ];
    }, threshold || 100 );
  };
};

// ----- htmlInit ----- //

// http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/
utils.toDashed = function( str ) {
  return str.replace( /(.)([A-Z])/g, function( match, $1, $2 ) {
    return $1 + '-' + $2;
  }).toLowerCase();
};

var console = window.console;
/**
 * allow user to initialize classes via .js-namespace class
 * htmlInit( Widget, 'widgetName' )
 * options are parsed from data-namespace-option attribute
 */
utils.htmlInit = function( WidgetClass, namespace ) {
  docReady( function() {
    var dashedNamespace = utils.toDashed( namespace );
    var elems = document.querySelectorAll( '.js-' + dashedNamespace );
    var dataAttr = 'data-' + dashedNamespace + '-options';

    for ( var i=0, len = elems.length; i < len; i++ ) {
      var elem = elems[i];
      var attr = elem.getAttribute( dataAttr );
      var options;
      try {
        options = attr && JSON.parse( attr );
      } catch ( error ) {
        // log error, do not initialize
        if ( console ) {
          console.error( 'Error parsing ' + dataAttr + ' on ' +
            elem.nodeName.toLowerCase() + ( elem.id ? '#' + elem.id : '' ) + ': ' +
            error );
        }
        continue;
      }
      // initialize
      var instance = new WidgetClass( elem, options );
      // make available via $().data('layoutname')
      var jQuery = window.jQuery;
      if ( jQuery ) {
        jQuery.data( elem, namespace, instance );
      }
    }
  });
};

// -----  ----- //

return utils;

}));

},{"desandro-matches-selector":15,"doc-ready":16}],19:[function(require,module,exports){
/*!
 * getSize v1.2.2
 * measure size of elements
 * MIT license
 */

/*jshint browser: true, strict: true, undef: true, unused: true */
/*global define: false, exports: false, require: false, module: false, console: false */

( function( window, undefined ) {

'use strict';

// -------------------------- helpers -------------------------- //

// get a number from a string, not a percentage
function getStyleSize( value ) {
  var num = parseFloat( value );
  // not a percent like '100%', and a number
  var isValid = value.indexOf('%') === -1 && !isNaN( num );
  return isValid && num;
}

function noop() {}

var logError = typeof console === 'undefined' ? noop :
  function( message ) {
    console.error( message );
  };

// -------------------------- measurements -------------------------- //

var measurements = [
  'paddingLeft',
  'paddingRight',
  'paddingTop',
  'paddingBottom',
  'marginLeft',
  'marginRight',
  'marginTop',
  'marginBottom',
  'borderLeftWidth',
  'borderRightWidth',
  'borderTopWidth',
  'borderBottomWidth'
];

function getZeroSize() {
  var size = {
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0,
    outerWidth: 0,
    outerHeight: 0
  };
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    size[ measurement ] = 0;
  }
  return size;
}



function defineGetSize( getStyleProperty ) {

// -------------------------- setup -------------------------- //

var isSetup = false;

var getStyle, boxSizingProp, isBoxSizeOuter;

/**
 * setup vars and functions
 * do it on initial getSize(), rather than on script load
 * For Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=548397
 */
function setup() {
  // setup once
  if ( isSetup ) {
    return;
  }
  isSetup = true;

  var getComputedStyle = window.getComputedStyle;
  getStyle = ( function() {
    var getStyleFn = getComputedStyle ?
      function( elem ) {
        return getComputedStyle( elem, null );
      } :
      function( elem ) {
        return elem.currentStyle;
      };

      return function getStyle( elem ) {
        var style = getStyleFn( elem );
        if ( !style ) {
          logError( 'Style returned ' + style +
            '. Are you running this code in a hidden iframe on Firefox? ' +
            'See http://bit.ly/getsizebug1' );
        }
        return style;
      };
  })();

  // -------------------------- box sizing -------------------------- //

  boxSizingProp = getStyleProperty('boxSizing');

  /**
   * WebKit measures the outer-width on style.width on border-box elems
   * IE & Firefox measures the inner-width
   */
  if ( boxSizingProp ) {
    var div = document.createElement('div');
    div.style.width = '200px';
    div.style.padding = '1px 2px 3px 4px';
    div.style.borderStyle = 'solid';
    div.style.borderWidth = '1px 2px 3px 4px';
    div.style[ boxSizingProp ] = 'border-box';

    var body = document.body || document.documentElement;
    body.appendChild( div );
    var style = getStyle( div );

    isBoxSizeOuter = getStyleSize( style.width ) === 200;
    body.removeChild( div );
  }

}

// -------------------------- getSize -------------------------- //

function getSize( elem ) {
  setup();

  // use querySeletor if elem is string
  if ( typeof elem === 'string' ) {
    elem = document.querySelector( elem );
  }

  // do not proceed on non-objects
  if ( !elem || typeof elem !== 'object' || !elem.nodeType ) {
    return;
  }

  var style = getStyle( elem );

  // if hidden, everything is 0
  if ( style.display === 'none' ) {
    return getZeroSize();
  }

  var size = {};
  size.width = elem.offsetWidth;
  size.height = elem.offsetHeight;

  var isBorderBox = size.isBorderBox = !!( boxSizingProp &&
    style[ boxSizingProp ] && style[ boxSizingProp ] === 'border-box' );

  // get all measurements
  for ( var i=0, len = measurements.length; i < len; i++ ) {
    var measurement = measurements[i];
    var value = style[ measurement ];
    value = mungeNonPixel( elem, value );
    var num = parseFloat( value );
    // any 'auto', 'medium' value will be 0
    size[ measurement ] = !isNaN( num ) ? num : 0;
  }

  var paddingWidth = size.paddingLeft + size.paddingRight;
  var paddingHeight = size.paddingTop + size.paddingBottom;
  var marginWidth = size.marginLeft + size.marginRight;
  var marginHeight = size.marginTop + size.marginBottom;
  var borderWidth = size.borderLeftWidth + size.borderRightWidth;
  var borderHeight = size.borderTopWidth + size.borderBottomWidth;

  var isBorderBoxSizeOuter = isBorderBox && isBoxSizeOuter;

  // overwrite width and height if we can get it from style
  var styleWidth = getStyleSize( style.width );
  if ( styleWidth !== false ) {
    size.width = styleWidth +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingWidth + borderWidth );
  }

  var styleHeight = getStyleSize( style.height );
  if ( styleHeight !== false ) {
    size.height = styleHeight +
      // add padding and border unless it's already including it
      ( isBorderBoxSizeOuter ? 0 : paddingHeight + borderHeight );
  }

  size.innerWidth = size.width - ( paddingWidth + borderWidth );
  size.innerHeight = size.height - ( paddingHeight + borderHeight );

  size.outerWidth = size.width + marginWidth;
  size.outerHeight = size.height + marginHeight;

  return size;
}

// IE8 returns percent values, not pixels
// taken from jQuery's curCSS
function mungeNonPixel( elem, value ) {
  // IE8 and has percent value
  if ( window.getComputedStyle || value.indexOf('%') === -1 ) {
    return value;
  }
  var style = elem.style;
  // Remember the original values
  var left = style.left;
  var rs = elem.runtimeStyle;
  var rsLeft = rs && rs.left;

  // Put in the new values to get a computed value out
  if ( rsLeft ) {
    rs.left = elem.currentStyle.left;
  }
  style.left = value;
  value = style.pixelLeft;

  // Revert the changed values
  style.left = left;
  if ( rsLeft ) {
    rs.left = rsLeft;
  }

  return value;
}

return getSize;

}

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD for RequireJS
  define( [ 'get-style-property/get-style-property' ], defineGetSize );
} else if ( typeof exports === 'object' ) {
  // CommonJS for Component
  module.exports = defineGetSize( require('desandro-get-style-property') );
} else {
  // browser global
  window.getSize = defineGetSize( window.getStyleProperty );
}

})( window );

},{"desandro-get-style-property":14}],20:[function(require,module,exports){
/**
 * Outlayer Item
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'get-style-property/get-style-property',
        'fizzy-ui-utils/utils'
      ],
      function( EventEmitter, getSize, getStyleProperty, utils ) {
        return factory( window, EventEmitter, getSize, getStyleProperty, utils );
      }
    );
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('get-size'),
      require('desandro-get-style-property'),
      require('fizzy-ui-utils')
    );
  } else {
    // browser global
    window.Outlayer = {};
    window.Outlayer.Item = factory(
      window,
      window.EventEmitter,
      window.getSize,
      window.getStyleProperty,
      window.fizzyUIUtils
    );
  }

}( window, function factory( window, EventEmitter, getSize, getStyleProperty, utils ) {
'use strict';

// ----- helpers ----- //

var getComputedStyle = window.getComputedStyle;
var getStyle = getComputedStyle ?
  function( elem ) {
    return getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };


function isEmptyObj( obj ) {
  for ( var prop in obj ) {
    return false;
  }
  prop = null;
  return true;
}

// -------------------------- CSS3 support -------------------------- //

var transitionProperty = getStyleProperty('transition');
var transformProperty = getStyleProperty('transform');
var supportsCSS3 = transitionProperty && transformProperty;
var is3d = !!getStyleProperty('perspective');

var transitionEndEvent = {
  WebkitTransition: 'webkitTransitionEnd',
  MozTransition: 'transitionend',
  OTransition: 'otransitionend',
  transition: 'transitionend'
}[ transitionProperty ];

// properties that could have vendor prefix
var prefixableProperties = [
  'transform',
  'transition',
  'transitionDuration',
  'transitionProperty'
];

// cache all vendor properties
var vendorProperties = ( function() {
  var cache = {};
  for ( var i=0, len = prefixableProperties.length; i < len; i++ ) {
    var prop = prefixableProperties[i];
    var supportedProp = getStyleProperty( prop );
    if ( supportedProp && supportedProp !== prop ) {
      cache[ prop ] = supportedProp;
    }
  }
  return cache;
})();

// -------------------------- Item -------------------------- //

function Item( element, layout ) {
  if ( !element ) {
    return;
  }

  this.element = element;
  // parent layout class, i.e. Masonry, Isotope, or Packery
  this.layout = layout;
  this.position = {
    x: 0,
    y: 0
  };

  this._create();
}

// inherit EventEmitter
utils.extend( Item.prototype, EventEmitter.prototype );

Item.prototype._create = function() {
  // transition objects
  this._transn = {
    ingProperties: {},
    clean: {},
    onEnd: {}
  };

  this.css({
    position: 'absolute'
  });
};

// trigger specified handler for event type
Item.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

Item.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * apply CSS styles to element
 * @param {Object} style
 */
Item.prototype.css = function( style ) {
  var elemStyle = this.element.style;

  for ( var prop in style ) {
    // use vendor property if available
    var supportedProp = vendorProperties[ prop ] || prop;
    elemStyle[ supportedProp ] = style[ prop ];
  }
};

 // measure position, and sets it
Item.prototype.getPosition = function() {
  var style = getStyle( this.element );
  var layoutOptions = this.layout.options;
  var isOriginLeft = layoutOptions.isOriginLeft;
  var isOriginTop = layoutOptions.isOriginTop;
  var xValue = style[ isOriginLeft ? 'left' : 'right' ];
  var yValue = style[ isOriginTop ? 'top' : 'bottom' ];
  // convert percent to pixels
  var layoutSize = this.layout.size;
  var x = xValue.indexOf('%') != -1 ?
    ( parseFloat( xValue ) / 100 ) * layoutSize.width : parseInt( xValue, 10 );
  var y = yValue.indexOf('%') != -1 ?
    ( parseFloat( yValue ) / 100 ) * layoutSize.height : parseInt( yValue, 10 );

  // clean up 'auto' or other non-integer values
  x = isNaN( x ) ? 0 : x;
  y = isNaN( y ) ? 0 : y;
  // remove padding from measurement
  x -= isOriginLeft ? layoutSize.paddingLeft : layoutSize.paddingRight;
  y -= isOriginTop ? layoutSize.paddingTop : layoutSize.paddingBottom;

  this.position.x = x;
  this.position.y = y;
};

// set settled position, apply padding
Item.prototype.layoutPosition = function() {
  var layoutSize = this.layout.size;
  var layoutOptions = this.layout.options;
  var style = {};

  // x
  var xPadding = layoutOptions.isOriginLeft ? 'paddingLeft' : 'paddingRight';
  var xProperty = layoutOptions.isOriginLeft ? 'left' : 'right';
  var xResetProperty = layoutOptions.isOriginLeft ? 'right' : 'left';

  var x = this.position.x + layoutSize[ xPadding ];
  // set in percentage or pixels
  style[ xProperty ] = this.getXValue( x );
  // reset other property
  style[ xResetProperty ] = '';

  // y
  var yPadding = layoutOptions.isOriginTop ? 'paddingTop' : 'paddingBottom';
  var yProperty = layoutOptions.isOriginTop ? 'top' : 'bottom';
  var yResetProperty = layoutOptions.isOriginTop ? 'bottom' : 'top';

  var y = this.position.y + layoutSize[ yPadding ];
  // set in percentage or pixels
  style[ yProperty ] = this.getYValue( y );
  // reset other property
  style[ yResetProperty ] = '';

  this.css( style );
  this.emitEvent( 'layout', [ this ] );
};

Item.prototype.getXValue = function( x ) {
  var layoutOptions = this.layout.options;
  return layoutOptions.percentPosition && !layoutOptions.isHorizontal ?
    ( ( x / this.layout.size.width ) * 100 ) + '%' : x + 'px';
};

Item.prototype.getYValue = function( y ) {
  var layoutOptions = this.layout.options;
  return layoutOptions.percentPosition && layoutOptions.isHorizontal ?
    ( ( y / this.layout.size.height ) * 100 ) + '%' : y + 'px';
};


Item.prototype._transitionTo = function( x, y ) {
  this.getPosition();
  // get current x & y from top/left
  var curX = this.position.x;
  var curY = this.position.y;

  var compareX = parseInt( x, 10 );
  var compareY = parseInt( y, 10 );
  var didNotMove = compareX === this.position.x && compareY === this.position.y;

  // save end position
  this.setPosition( x, y );

  // if did not move and not transitioning, just go to layout
  if ( didNotMove && !this.isTransitioning ) {
    this.layoutPosition();
    return;
  }

  var transX = x - curX;
  var transY = y - curY;
  var transitionStyle = {};
  transitionStyle.transform = this.getTranslate( transX, transY );

  this.transition({
    to: transitionStyle,
    onTransitionEnd: {
      transform: this.layoutPosition
    },
    isCleaning: true
  });
};

Item.prototype.getTranslate = function( x, y ) {
  // flip cooridinates if origin on right or bottom
  var layoutOptions = this.layout.options;
  x = layoutOptions.isOriginLeft ? x : -x;
  y = layoutOptions.isOriginTop ? y : -y;

  if ( is3d ) {
    return 'translate3d(' + x + 'px, ' + y + 'px, 0)';
  }

  return 'translate(' + x + 'px, ' + y + 'px)';
};

// non transition + transform support
Item.prototype.goTo = function( x, y ) {
  this.setPosition( x, y );
  this.layoutPosition();
};

// use transition and transforms if supported
Item.prototype.moveTo = supportsCSS3 ?
  Item.prototype._transitionTo : Item.prototype.goTo;

Item.prototype.setPosition = function( x, y ) {
  this.position.x = parseInt( x, 10 );
  this.position.y = parseInt( y, 10 );
};

// ----- transition ----- //

/**
 * @param {Object} style - CSS
 * @param {Function} onTransitionEnd
 */

// non transition, just trigger callback
Item.prototype._nonTransition = function( args ) {
  this.css( args.to );
  if ( args.isCleaning ) {
    this._removeStyles( args.to );
  }
  for ( var prop in args.onTransitionEnd ) {
    args.onTransitionEnd[ prop ].call( this );
  }
};

/**
 * proper transition
 * @param {Object} args - arguments
 *   @param {Object} to - style to transition to
 *   @param {Object} from - style to start transition from
 *   @param {Boolean} isCleaning - removes transition styles after transition
 *   @param {Function} onTransitionEnd - callback
 */
Item.prototype._transition = function( args ) {
  // redirect to nonTransition if no transition duration
  if ( !parseFloat( this.layout.options.transitionDuration ) ) {
    this._nonTransition( args );
    return;
  }

  var _transition = this._transn;
  // keep track of onTransitionEnd callback by css property
  for ( var prop in args.onTransitionEnd ) {
    _transition.onEnd[ prop ] = args.onTransitionEnd[ prop ];
  }
  // keep track of properties that are transitioning
  for ( prop in args.to ) {
    _transition.ingProperties[ prop ] = true;
    // keep track of properties to clean up when transition is done
    if ( args.isCleaning ) {
      _transition.clean[ prop ] = true;
    }
  }

  // set from styles
  if ( args.from ) {
    this.css( args.from );
    // force redraw. http://blog.alexmaccaw.com/css-transitions
    var h = this.element.offsetHeight;
    // hack for JSHint to hush about unused var
    h = null;
  }
  // enable transition
  this.enableTransition( args.to );
  // set styles that are transitioning
  this.css( args.to );

  this.isTransitioning = true;

};

// dash before all cap letters, including first for
// WebkitTransform => -webkit-transform
function toDashedAll( str ) {
  return str.replace( /([A-Z])/g, function( $1 ) {
    return '-' + $1.toLowerCase();
  });
}

var transitionProps = 'opacity,' +
  toDashedAll( vendorProperties.transform || 'transform' );

Item.prototype.enableTransition = function(/* style */) {
  // HACK changing transitionProperty during a transition
  // will cause transition to jump
  if ( this.isTransitioning ) {
    return;
  }

  // make `transition: foo, bar, baz` from style object
  // HACK un-comment this when enableTransition can work
  // while a transition is happening
  // var transitionValues = [];
  // for ( var prop in style ) {
  //   // dash-ify camelCased properties like WebkitTransition
  //   prop = vendorProperties[ prop ] || prop;
  //   transitionValues.push( toDashedAll( prop ) );
  // }
  // enable transition styles
  this.css({
    transitionProperty: transitionProps,
    transitionDuration: this.layout.options.transitionDuration
  });
  // listen for transition end event
  this.element.addEventListener( transitionEndEvent, this, false );
};

Item.prototype.transition = Item.prototype[ transitionProperty ? '_transition' : '_nonTransition' ];

// ----- events ----- //

Item.prototype.onwebkitTransitionEnd = function( event ) {
  this.ontransitionend( event );
};

Item.prototype.onotransitionend = function( event ) {
  this.ontransitionend( event );
};

// properties that I munge to make my life easier
var dashedVendorProperties = {
  '-webkit-transform': 'transform',
  '-moz-transform': 'transform',
  '-o-transform': 'transform'
};

Item.prototype.ontransitionend = function( event ) {
  // disregard bubbled events from children
  if ( event.target !== this.element ) {
    return;
  }
  var _transition = this._transn;
  // get property name of transitioned property, convert to prefix-free
  var propertyName = dashedVendorProperties[ event.propertyName ] || event.propertyName;

  // remove property that has completed transitioning
  delete _transition.ingProperties[ propertyName ];
  // check if any properties are still transitioning
  if ( isEmptyObj( _transition.ingProperties ) ) {
    // all properties have completed transitioning
    this.disableTransition();
  }
  // clean style
  if ( propertyName in _transition.clean ) {
    // clean up style
    this.element.style[ event.propertyName ] = '';
    delete _transition.clean[ propertyName ];
  }
  // trigger onTransitionEnd callback
  if ( propertyName in _transition.onEnd ) {
    var onTransitionEnd = _transition.onEnd[ propertyName ];
    onTransitionEnd.call( this );
    delete _transition.onEnd[ propertyName ];
  }

  this.emitEvent( 'transitionEnd', [ this ] );
};

Item.prototype.disableTransition = function() {
  this.removeTransitionStyles();
  this.element.removeEventListener( transitionEndEvent, this, false );
  this.isTransitioning = false;
};

/**
 * removes style property from element
 * @param {Object} style
**/
Item.prototype._removeStyles = function( style ) {
  // clean up transition styles
  var cleanStyle = {};
  for ( var prop in style ) {
    cleanStyle[ prop ] = '';
  }
  this.css( cleanStyle );
};

var cleanTransitionStyle = {
  transitionProperty: '',
  transitionDuration: ''
};

Item.prototype.removeTransitionStyles = function() {
  // remove transition
  this.css( cleanTransitionStyle );
};

// ----- show/hide/remove ----- //

// remove element from DOM
Item.prototype.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // remove display: none
  this.css({ display: '' });
  this.emitEvent( 'remove', [ this ] );
};

Item.prototype.remove = function() {
  // just remove element if no transition support or no transition
  if ( !transitionProperty || !parseFloat( this.layout.options.transitionDuration ) ) {
    this.removeElem();
    return;
  }

  // start transition
  var _this = this;
  this.once( 'transitionEnd', function() {
    _this.removeElem();
  });
  this.hide();
};

Item.prototype.reveal = function() {
  delete this.isHidden;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('visibleStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onRevealTransitionEnd;

  this.transition({
    from: options.hiddenStyle,
    to: options.visibleStyle,
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

Item.prototype.onRevealTransitionEnd = function() {
  // check if still visible
  // during transition, item may have been hidden
  if ( !this.isHidden ) {
    this.emitEvent('reveal');
  }
};

/**
 * get style property use for hide/reveal transition end
 * @param {String} styleProperty - hiddenStyle/visibleStyle
 * @returns {String}
 */
Item.prototype.getHideRevealTransitionEndProperty = function( styleProperty ) {
  var optionStyle = this.layout.options[ styleProperty ];
  // use opacity
  if ( optionStyle.opacity ) {
    return 'opacity';
  }
  // get first property
  for ( var prop in optionStyle ) {
    return prop;
  }
};

Item.prototype.hide = function() {
  // set flag
  this.isHidden = true;
  // remove display: none
  this.css({ display: '' });

  var options = this.layout.options;

  var onTransitionEnd = {};
  var transitionEndProperty = this.getHideRevealTransitionEndProperty('hiddenStyle');
  onTransitionEnd[ transitionEndProperty ] = this.onHideTransitionEnd;

  this.transition({
    from: options.visibleStyle,
    to: options.hiddenStyle,
    // keep hidden stuff hidden
    isCleaning: true,
    onTransitionEnd: onTransitionEnd
  });
};

Item.prototype.onHideTransitionEnd = function() {
  // check if still hidden
  // during transition, item may have been un-hidden
  if ( this.isHidden ) {
    this.css({ display: 'none' });
    this.emitEvent('hide');
  }
};

Item.prototype.destroy = function() {
  this.css({
    position: '',
    left: '',
    right: '',
    top: '',
    bottom: '',
    transition: '',
    transform: ''
  });
};

return Item;

}));

},{"desandro-get-style-property":14,"fizzy-ui-utils":18,"get-size":19,"wolfy87-eventemitter":27}],21:[function(require,module,exports){
/*!
 * Outlayer v1.4.2
 * the brains and guts of a layout library
 * MIT license
 */

( function( window, factory ) {
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'eventie/eventie',
        'eventEmitter/EventEmitter',
        'get-size/get-size',
        'fizzy-ui-utils/utils',
        './item'
      ],
      function( eventie, EventEmitter, getSize, utils, Item ) {
        return factory( window, eventie, EventEmitter, getSize, utils, Item);
      }
    );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('eventie'),
      require('wolfy87-eventemitter'),
      require('get-size'),
      require('fizzy-ui-utils'),
      require('./item')
    );
  } else {
    // browser global
    window.Outlayer = factory(
      window,
      window.eventie,
      window.EventEmitter,
      window.getSize,
      window.fizzyUIUtils,
      window.Outlayer.Item
    );
  }

}( window, function factory( window, eventie, EventEmitter, getSize, utils, Item ) {
'use strict';

// ----- vars ----- //

var console = window.console;
var jQuery = window.jQuery;
var noop = function() {};

// -------------------------- Outlayer -------------------------- //

// globally unique identifiers
var GUID = 0;
// internal store of all Outlayer intances
var instances = {};


/**
 * @param {Element, String} element
 * @param {Object} options
 * @constructor
 */
function Outlayer( element, options ) {
  var queryElement = utils.getQueryElement( element );
  if ( !queryElement ) {
    if ( console ) {
      console.error( 'Bad element for ' + this.constructor.namespace +
        ': ' + ( queryElement || element ) );
    }
    return;
  }
  this.element = queryElement;
  // add jQuery
  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = utils.extend( {}, this.constructor.defaults );
  this.option( options );

  // add id for Outlayer.getFromElement
  var id = ++GUID;
  this.element.outlayerGUID = id; // expando
  instances[ id ] = this; // associate via id

  // kick it off
  this._create();

  if ( this.options.isInitLayout ) {
    this.layout();
  }
}

// settings are for internal use only
Outlayer.namespace = 'outlayer';
Outlayer.Item = Item;

// default options
Outlayer.defaults = {
  containerStyle: {
    position: 'relative'
  },
  isInitLayout: true,
  isOriginLeft: true,
  isOriginTop: true,
  isResizeBound: true,
  isResizingContainer: true,
  // item options
  transitionDuration: '0.4s',
  hiddenStyle: {
    opacity: 0,
    transform: 'scale(0.001)'
  },
  visibleStyle: {
    opacity: 1,
    transform: 'scale(1)'
  }
};

// inherit EventEmitter
utils.extend( Outlayer.prototype, EventEmitter.prototype );

/**
 * set options
 * @param {Object} opts
 */
Outlayer.prototype.option = function( opts ) {
  utils.extend( this.options, opts );
};

Outlayer.prototype._create = function() {
  // get items from children
  this.reloadItems();
  // elements that affect layout, but are not laid out
  this.stamps = [];
  this.stamp( this.options.stamp );
  // set container style
  utils.extend( this.element.style, this.options.containerStyle );

  // bind resize method
  if ( this.options.isResizeBound ) {
    this.bindResize();
  }
};

// goes through all children again and gets bricks in proper order
Outlayer.prototype.reloadItems = function() {
  // collection of item elements
  this.items = this._itemize( this.element.children );
};


/**
 * turn elements into Outlayer.Items to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - collection of new Outlayer Items
 */
Outlayer.prototype._itemize = function( elems ) {

  var itemElems = this._filterFindItemElements( elems );
  var Item = this.constructor.Item;

  // create new Outlayer Items for collection
  var items = [];
  for ( var i=0, len = itemElems.length; i < len; i++ ) {
    var elem = itemElems[i];
    var item = new Item( elem, this );
    items.push( item );
  }

  return items;
};

/**
 * get item elements to be used in layout
 * @param {Array or NodeList or HTMLElement} elems
 * @returns {Array} items - item elements
 */
Outlayer.prototype._filterFindItemElements = function( elems ) {
  return utils.filterFindElements( elems, this.options.itemSelector );
};

/**
 * getter method for getting item elements
 * @returns {Array} elems - collection of item elements
 */
Outlayer.prototype.getItemElements = function() {
  var elems = [];
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    elems.push( this.items[i].element );
  }
  return elems;
};

// ----- init & layout ----- //

/**
 * lays out all items
 */
Outlayer.prototype.layout = function() {
  this._resetLayout();
  this._manageStamps();

  // don't animate first layout
  var isInstant = this.options.isLayoutInstant !== undefined ?
    this.options.isLayoutInstant : !this._isLayoutInited;
  this.layoutItems( this.items, isInstant );

  // flag for initalized
  this._isLayoutInited = true;
};

// _init is alias for layout
Outlayer.prototype._init = Outlayer.prototype.layout;

/**
 * logic before any new layout
 */
Outlayer.prototype._resetLayout = function() {
  this.getSize();
};


Outlayer.prototype.getSize = function() {
  this.size = getSize( this.element );
};

/**
 * get measurement from option, for columnWidth, rowHeight, gutter
 * if option is String -> get element from selector string, & get size of element
 * if option is Element -> get size of element
 * else use option as a number
 *
 * @param {String} measurement
 * @param {String} size - width or height
 * @private
 */
Outlayer.prototype._getMeasurement = function( measurement, size ) {
  var option = this.options[ measurement ];
  var elem;
  if ( !option ) {
    // default to 0
    this[ measurement ] = 0;
  } else {
    // use option as an element
    if ( typeof option === 'string' ) {
      elem = this.element.querySelector( option );
    } else if ( utils.isElement( option ) ) {
      elem = option;
    }
    // use size of element, if element
    this[ measurement ] = elem ? getSize( elem )[ size ] : option;
  }
};

/**
 * layout a collection of item elements
 * @api public
 */
Outlayer.prototype.layoutItems = function( items, isInstant ) {
  items = this._getItemsForLayout( items );

  this._layoutItems( items, isInstant );

  this._postLayout();
};

/**
 * get the items to be laid out
 * you may want to skip over some items
 * @param {Array} items
 * @returns {Array} items
 */
Outlayer.prototype._getItemsForLayout = function( items ) {
  var layoutItems = [];
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    if ( !item.isIgnored ) {
      layoutItems.push( item );
    }
  }
  return layoutItems;
};

/**
 * layout items
 * @param {Array} items
 * @param {Boolean} isInstant
 */
Outlayer.prototype._layoutItems = function( items, isInstant ) {
  this._emitCompleteOnItems( 'layout', items );

  if ( !items || !items.length ) {
    // no items, emit event with empty array
    return;
  }

  var queue = [];

  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    // get x/y object from method
    var position = this._getItemLayoutPosition( item );
    // enqueue
    position.item = item;
    position.isInstant = isInstant || item.isLayoutInstant;
    queue.push( position );
  }

  this._processLayoutQueue( queue );
};

/**
 * get item layout position
 * @param {Outlayer.Item} item
 * @returns {Object} x and y position
 */
Outlayer.prototype._getItemLayoutPosition = function( /* item */ ) {
  return {
    x: 0,
    y: 0
  };
};

/**
 * iterate over array and position each item
 * Reason being - separating this logic prevents 'layout invalidation'
 * thx @paul_irish
 * @param {Array} queue
 */
Outlayer.prototype._processLayoutQueue = function( queue ) {
  for ( var i=0, len = queue.length; i < len; i++ ) {
    var obj = queue[i];
    this._positionItem( obj.item, obj.x, obj.y, obj.isInstant );
  }
};

/**
 * Sets position of item in DOM
 * @param {Outlayer.Item} item
 * @param {Number} x - horizontal position
 * @param {Number} y - vertical position
 * @param {Boolean} isInstant - disables transitions
 */
Outlayer.prototype._positionItem = function( item, x, y, isInstant ) {
  if ( isInstant ) {
    // if not transition, just set CSS
    item.goTo( x, y );
  } else {
    item.moveTo( x, y );
  }
};

/**
 * Any logic you want to do after each layout,
 * i.e. size the container
 */
Outlayer.prototype._postLayout = function() {
  this.resizeContainer();
};

Outlayer.prototype.resizeContainer = function() {
  if ( !this.options.isResizingContainer ) {
    return;
  }
  var size = this._getContainerSize();
  if ( size ) {
    this._setContainerMeasure( size.width, true );
    this._setContainerMeasure( size.height, false );
  }
};

/**
 * Sets width or height of container if returned
 * @returns {Object} size
 *   @param {Number} width
 *   @param {Number} height
 */
Outlayer.prototype._getContainerSize = noop;

/**
 * @param {Number} measure - size of width or height
 * @param {Boolean} isWidth
 */
Outlayer.prototype._setContainerMeasure = function( measure, isWidth ) {
  if ( measure === undefined ) {
    return;
  }

  var elemSize = this.size;
  // add padding and border width if border box
  if ( elemSize.isBorderBox ) {
    measure += isWidth ? elemSize.paddingLeft + elemSize.paddingRight +
      elemSize.borderLeftWidth + elemSize.borderRightWidth :
      elemSize.paddingBottom + elemSize.paddingTop +
      elemSize.borderTopWidth + elemSize.borderBottomWidth;
  }

  measure = Math.max( measure, 0 );
  this.element.style[ isWidth ? 'width' : 'height' ] = measure + 'px';
};

/**
 * emit eventComplete on a collection of items events
 * @param {String} eventName
 * @param {Array} items - Outlayer.Items
 */
Outlayer.prototype._emitCompleteOnItems = function( eventName, items ) {
  var _this = this;
  function onComplete() {
    _this.dispatchEvent( eventName + 'Complete', null, [ items ] );
  }

  var count = items.length;
  if ( !items || !count ) {
    onComplete();
    return;
  }

  var doneCount = 0;
  function tick() {
    doneCount++;
    if ( doneCount === count ) {
      onComplete();
    }
  }

  // bind callback
  for ( var i=0, len = items.length; i < len; i++ ) {
    var item = items[i];
    item.once( eventName, tick );
  }
};

/**
 * emits events via eventEmitter and jQuery events
 * @param {String} type - name of event
 * @param {Event} event - original event
 * @param {Array} args - extra arguments
 */
Outlayer.prototype.dispatchEvent = function( type, event, args ) {
  // add original event to arguments
  var emitArgs = event ? [ event ].concat( args ) : args;
  this.emitEvent( type, emitArgs );

  if ( jQuery ) {
    // set this.$element
    this.$element = this.$element || jQuery( this.element );
    if ( event ) {
      // create jQuery event
      var $event = jQuery.Event( event );
      $event.type = type;
      this.$element.trigger( $event, args );
    } else {
      // just trigger with type if no event available
      this.$element.trigger( type, args );
    }
  }
};

// -------------------------- ignore & stamps -------------------------- //


/**
 * keep item in collection, but do not lay it out
 * ignored items do not get skipped in layout
 * @param {Element} elem
 */
Outlayer.prototype.ignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.isIgnored = true;
  }
};

/**
 * return item to layout collection
 * @param {Element} elem
 */
Outlayer.prototype.unignore = function( elem ) {
  var item = this.getItem( elem );
  if ( item ) {
    delete item.isIgnored;
  }
};

/**
 * adds elements to stamps
 * @param {NodeList, Array, Element, or String} elems
 */
Outlayer.prototype.stamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ) {
    return;
  }

  this.stamps = this.stamps.concat( elems );
  // ignore
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    this.ignore( elem );
  }
};

/**
 * removes elements to stamps
 * @param {NodeList, Array, or Element} elems
 */
Outlayer.prototype.unstamp = function( elems ) {
  elems = this._find( elems );
  if ( !elems ){
    return;
  }

  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    // filter out removed stamp elements
    utils.removeFrom( this.stamps, elem );
    this.unignore( elem );
  }

};

/**
 * finds child elements
 * @param {NodeList, Array, Element, or String} elems
 * @returns {Array} elems
 */
Outlayer.prototype._find = function( elems ) {
  if ( !elems ) {
    return;
  }
  // if string, use argument as selector string
  if ( typeof elems === 'string' ) {
    elems = this.element.querySelectorAll( elems );
  }
  elems = utils.makeArray( elems );
  return elems;
};

Outlayer.prototype._manageStamps = function() {
  if ( !this.stamps || !this.stamps.length ) {
    return;
  }

  this._getBoundingRect();

  for ( var i=0, len = this.stamps.length; i < len; i++ ) {
    var stamp = this.stamps[i];
    this._manageStamp( stamp );
  }
};

// update boundingLeft / Top
Outlayer.prototype._getBoundingRect = function() {
  // get bounding rect for container element
  var boundingRect = this.element.getBoundingClientRect();
  var size = this.size;
  this._boundingRect = {
    left: boundingRect.left + size.paddingLeft + size.borderLeftWidth,
    top: boundingRect.top + size.paddingTop + size.borderTopWidth,
    right: boundingRect.right - ( size.paddingRight + size.borderRightWidth ),
    bottom: boundingRect.bottom - ( size.paddingBottom + size.borderBottomWidth )
  };
};

/**
 * @param {Element} stamp
**/
Outlayer.prototype._manageStamp = noop;

/**
 * get x/y position of element relative to container element
 * @param {Element} elem
 * @returns {Object} offset - has left, top, right, bottom
 */
Outlayer.prototype._getElementOffset = function( elem ) {
  var boundingRect = elem.getBoundingClientRect();
  var thisRect = this._boundingRect;
  var size = getSize( elem );
  var offset = {
    left: boundingRect.left - thisRect.left - size.marginLeft,
    top: boundingRect.top - thisRect.top - size.marginTop,
    right: thisRect.right - boundingRect.right - size.marginRight,
    bottom: thisRect.bottom - boundingRect.bottom - size.marginBottom
  };
  return offset;
};

// -------------------------- resize -------------------------- //

// enable event handlers for listeners
// i.e. resize -> onresize
Outlayer.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

/**
 * Bind layout to window resizing
 */
Outlayer.prototype.bindResize = function() {
  // bind just one listener
  if ( this.isResizeBound ) {
    return;
  }
  eventie.bind( window, 'resize', this );
  this.isResizeBound = true;
};

/**
 * Unbind layout to window resizing
 */
Outlayer.prototype.unbindResize = function() {
  if ( this.isResizeBound ) {
    eventie.unbind( window, 'resize', this );
  }
  this.isResizeBound = false;
};

// original debounce by John Hann
// http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/

// this fires every resize
Outlayer.prototype.onresize = function() {
  if ( this.resizeTimeout ) {
    clearTimeout( this.resizeTimeout );
  }

  var _this = this;
  function delayed() {
    _this.resize();
    delete _this.resizeTimeout;
  }

  this.resizeTimeout = setTimeout( delayed, 100 );
};

// debounced, layout on resize
Outlayer.prototype.resize = function() {
  // don't trigger if size did not change
  // or if resize was unbound. See #9
  if ( !this.isResizeBound || !this.needsResizeLayout() ) {
    return;
  }

  this.layout();
};

/**
 * check if layout is needed post layout
 * @returns Boolean
 */
Outlayer.prototype.needsResizeLayout = function() {
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  return hasSizes && size.innerWidth !== this.size.innerWidth;
};

// -------------------------- methods -------------------------- //

/**
 * add items to Outlayer instance
 * @param {Array or NodeList or Element} elems
 * @returns {Array} items - Outlayer.Items
**/
Outlayer.prototype.addItems = function( elems ) {
  var items = this._itemize( elems );
  // add items to collection
  if ( items.length ) {
    this.items = this.items.concat( items );
  }
  return items;
};

/**
 * Layout newly-appended item elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.appended = function( elems ) {
  var items = this.addItems( elems );
  if ( !items.length ) {
    return;
  }
  // layout and reveal just the new items
  this.layoutItems( items, true );
  this.reveal( items );
};

/**
 * Layout prepended elements
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.prepended = function( elems ) {
  var items = this._itemize( elems );
  if ( !items.length ) {
    return;
  }
  // add items to beginning of collection
  var previousItems = this.items.slice(0);
  this.items = items.concat( previousItems );
  // start new layout
  this._resetLayout();
  this._manageStamps();
  // layout new stuff without transition
  this.layoutItems( items, true );
  this.reveal( items );
  // layout previous items
  this.layoutItems( previousItems );
};

/**
 * reveal a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.reveal = function( items ) {
  this._emitCompleteOnItems( 'reveal', items );

  var len = items && items.length;
  for ( var i=0; len && i < len; i++ ) {
    var item = items[i];
    item.reveal();
  }
};

/**
 * hide a collection of items
 * @param {Array of Outlayer.Items} items
 */
Outlayer.prototype.hide = function( items ) {
  this._emitCompleteOnItems( 'hide', items );

  var len = items && items.length;
  for ( var i=0; len && i < len; i++ ) {
    var item = items[i];
    item.hide();
  }
};

/**
 * reveal item elements
 * @param {Array}, {Element}, {NodeList} items
 */
Outlayer.prototype.revealItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.reveal( items );
};

/**
 * hide item elements
 * @param {Array}, {Element}, {NodeList} items
 */
Outlayer.prototype.hideItemElements = function( elems ) {
  var items = this.getItems( elems );
  this.hide( items );
};

/**
 * get Outlayer.Item, given an Element
 * @param {Element} elem
 * @param {Function} callback
 * @returns {Outlayer.Item} item
 */
Outlayer.prototype.getItem = function( elem ) {
  // loop through items to get the one that matches
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    if ( item.element === elem ) {
      // return item
      return item;
    }
  }
};

/**
 * get collection of Outlayer.Items, given Elements
 * @param {Array} elems
 * @returns {Array} items - Outlayer.Items
 */
Outlayer.prototype.getItems = function( elems ) {
  elems = utils.makeArray( elems );
  var items = [];
  for ( var i=0, len = elems.length; i < len; i++ ) {
    var elem = elems[i];
    var item = this.getItem( elem );
    if ( item ) {
      items.push( item );
    }
  }

  return items;
};

/**
 * remove element(s) from instance and DOM
 * @param {Array or NodeList or Element} elems
 */
Outlayer.prototype.remove = function( elems ) {
  var removeItems = this.getItems( elems );

  this._emitCompleteOnItems( 'remove', removeItems );

  // bail if no items to remove
  if ( !removeItems || !removeItems.length ) {
    return;
  }

  for ( var i=0, len = removeItems.length; i < len; i++ ) {
    var item = removeItems[i];
    item.remove();
    // remove item from collection
    utils.removeFrom( this.items, item );
  }
};

// ----- destroy ----- //

// remove and disable Outlayer instance
Outlayer.prototype.destroy = function() {
  // clean up dynamic styles
  var style = this.element.style;
  style.height = '';
  style.position = '';
  style.width = '';
  // destroy items
  for ( var i=0, len = this.items.length; i < len; i++ ) {
    var item = this.items[i];
    item.destroy();
  }

  this.unbindResize();

  var id = this.element.outlayerGUID;
  delete instances[ id ]; // remove reference to instance by id
  delete this.element.outlayerGUID;
  // remove data for jQuery
  if ( jQuery ) {
    jQuery.removeData( this.element, this.constructor.namespace );
  }

};

// -------------------------- data -------------------------- //

/**
 * get Outlayer instance from element
 * @param {Element} elem
 * @returns {Outlayer}
 */
Outlayer.data = function( elem ) {
  elem = utils.getQueryElement( elem );
  var id = elem && elem.outlayerGUID;
  return id && instances[ id ];
};


// -------------------------- create Outlayer class -------------------------- //

/**
 * create a layout class
 * @param {String} namespace
 */
Outlayer.create = function( namespace, options ) {
  // sub-class Outlayer
  function Layout() {
    Outlayer.apply( this, arguments );
  }
  // inherit Outlayer prototype, use Object.create if there
  if ( Object.create ) {
    Layout.prototype = Object.create( Outlayer.prototype );
  } else {
    utils.extend( Layout.prototype, Outlayer.prototype );
  }
  // set contructor, used for namespace and Item
  Layout.prototype.constructor = Layout;

  Layout.defaults = utils.extend( {}, Outlayer.defaults );
  // apply new options
  utils.extend( Layout.defaults, options );
  // keep prototype.settings for backwards compatibility (Packery v1.2.0)
  Layout.prototype.settings = {};

  Layout.namespace = namespace;

  Layout.data = Outlayer.data;

  // sub-class Item
  Layout.Item = function LayoutItem() {
    Item.apply( this, arguments );
  };

  Layout.Item.prototype = new Item();

  // -------------------------- declarative -------------------------- //

  utils.htmlInit( Layout, namespace );

  // -------------------------- jQuery bridge -------------------------- //

  // make into jQuery plugin
  if ( jQuery && jQuery.bridget ) {
    jQuery.bridget( namespace, Layout );
  }

  return Layout;
};

// ----- fin ----- //

// back in global
Outlayer.Item = Item;

return Outlayer;

}));


},{"./item":20,"eventie":17,"fizzy-ui-utils":18,"get-size":19,"wolfy87-eventemitter":27}],22:[function(require,module,exports){
/**
 * Packery Item Element
**/

( function( window, factory ) {
  'use strict';
  // universal module definition

  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'get-style-property/get-style-property',
        'outlayer/outlayer',
        './rect'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('desandro-get-style-property'),
      require('outlayer'),
      require('./rect')
    );
  } else {
    // browser global
    window.Packery.Item = factory(
      window.getStyleProperty,
      window.Outlayer,
      window.Packery.Rect
    );
  }

}( window, function factory( getStyleProperty, Outlayer, Rect ) {
'use strict';

// -------------------------- Item -------------------------- //

var transformProperty = getStyleProperty('transform');

// sub-class Item
var Item = function PackeryItem() {
  Outlayer.Item.apply( this, arguments );
};

Item.prototype = new Outlayer.Item();

var protoCreate = Item.prototype._create;
Item.prototype._create = function() {
  // call default _create logic
  protoCreate.call( this );
  this.rect = new Rect();
  // rect used for placing, in drag or Packery.fit()
  this.placeRect = new Rect();
};

// -------------------------- drag -------------------------- //

Item.prototype.dragStart = function() {
  this.getPosition();
  this.removeTransitionStyles();
  // remove transform property from transition
  if ( this.isTransitioning && transformProperty ) {
    this.element.style[ transformProperty ] = 'none';
  }
  this.getSize();
  // create place rect, used for position when dragged then dropped
  // or when positioning
  this.isPlacing = true;
  this.needsPositioning = false;
  this.positionPlaceRect( this.position.x, this.position.y );
  this.isTransitioning = false;
  this.didDrag = false;
};

/**
 * handle item when it is dragged
 * @param {Number} x - horizontal position of dragged item
 * @param {Number} y - vertical position of dragged item
 */
Item.prototype.dragMove = function( x, y ) {
  this.didDrag = true;
  var packerySize = this.layout.size;
  x -= packerySize.paddingLeft;
  y -= packerySize.paddingTop;
  this.positionPlaceRect( x, y );
};

Item.prototype.dragStop = function() {
  this.getPosition();
  var isDiffX = this.position.x != this.placeRect.x;
  var isDiffY = this.position.y != this.placeRect.y;
  // set post-drag positioning flag
  this.needsPositioning = isDiffX || isDiffY;
  // reset flag
  this.didDrag = false;
};

// -------------------------- placing -------------------------- //

/**
 * position a rect that will occupy space in the packer
 * @param {Number} x
 * @param {Number} y
 * @param {Boolean} isMaxYContained
 */
Item.prototype.positionPlaceRect = function( x, y, isMaxYOpen ) {
  this.placeRect.x = this.getPlaceRectCoord( x, true );
  this.placeRect.y = this.getPlaceRectCoord( y, false, isMaxYOpen );
};

/**
 * get x/y coordinate for place rect
 * @param {Number} coord - x or y
 * @param {Boolean} isX
 * @param {Boolean} isMaxOpen - does not limit value to outer bound
 * @returns {Number} coord - processed x or y
 */
Item.prototype.getPlaceRectCoord = function( coord, isX, isMaxOpen ) {
  var measure = isX ? 'Width' : 'Height';
  var size = this.size[ 'outer' + measure ];
  var segment = this.layout[ isX ? 'columnWidth' : 'rowHeight' ];
  var parentSize = this.layout.size[ 'inner' + measure ];

  // additional parentSize calculations for Y
  if ( !isX ) {
    parentSize = Math.max( parentSize, this.layout.maxY );
    // prevent gutter from bumping up height when non-vertical grid
    if ( !this.layout.rowHeight ) {
      parentSize -= this.layout.gutter;
    }
  }

  var max;

  if ( segment ) {
    segment += this.layout.gutter;
    // allow for last column to reach the edge
    parentSize += isX ? this.layout.gutter : 0;
    // snap to closest segment
    coord = Math.round( coord / segment );
    // contain to outer bound
    // contain non-growing bound, allow growing bound to grow
    var mathMethod;
    if ( this.layout.options.isHorizontal ) {
      mathMethod = !isX ? 'floor' : 'ceil';
    } else {
      mathMethod = isX ? 'floor' : 'ceil';
    }
    var maxSegments = Math[ mathMethod ]( parentSize / segment );
    maxSegments -= Math.ceil( size / segment );
    max = maxSegments;
  } else {
    max = parentSize - size;
  }

  coord = isMaxOpen ? coord : Math.min( coord, max );
  coord *= segment || 1;

  return Math.max( 0, coord );
};

Item.prototype.copyPlaceRectPosition = function() {
  this.rect.x = this.placeRect.x;
  this.rect.y = this.placeRect.y;
};

// -----  ----- //

// remove element from DOM
Item.prototype.removeElem = function() {
  this.element.parentNode.removeChild( this.element );
  // add space back to packer
  this.layout.packer.addSpace( this.rect );
  this.emitEvent( 'remove', [ this ] );
};

// -----  ----- //

return Item;

}));

},{"./rect":25,"desandro-get-style-property":14,"outlayer":21}],23:[function(require,module,exports){
/**
 * Packer
 * bin-packing algorithm
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [ './rect' ], factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('./rect')
    );
  } else {
    // browser global
    var Packery = window.Packery = window.Packery || {};
    Packery.Packer = factory( Packery.Rect );
  }

}( window, function factory( Rect ) {
'use strict';

// -------------------------- Packer -------------------------- //

/**
 * @param {Number} width
 * @param {Number} height
 * @param {String} sortDirection
 *   topLeft for vertical, leftTop for horizontal
 */
function Packer( width, height, sortDirection ) {
  this.width = width || 0;
  this.height = height || 0;
  this.sortDirection = sortDirection || 'downwardLeftToRight';

  this.reset();
}

Packer.prototype.reset = function() {
  this.spaces = [];
  this.newSpaces = [];

  var initialSpace = new Rect({
    x: 0,
    y: 0,
    width: this.width,
    height: this.height
  });

  this.spaces.push( initialSpace );
  // set sorter
  this.sorter = sorters[ this.sortDirection ] || sorters.downwardLeftToRight;
};

// change x and y of rect to fit with in Packer's available spaces
Packer.prototype.pack = function( rect ) {
  for ( var i=0, len = this.spaces.length; i < len; i++ ) {
    var space = this.spaces[i];
    if ( space.canFit( rect ) ) {
      this.placeInSpace( rect, space );
      break;
    }
  }
};

Packer.prototype.placeInSpace = function( rect, space ) {
  // place rect in space
  rect.x = space.x;
  rect.y = space.y;

  this.placed( rect );
};

// update spaces with placed rect
Packer.prototype.placed = function( rect ) {
  // update spaces
  var revisedSpaces = [];
  for ( var i=0, len = this.spaces.length; i < len; i++ ) {
    var space = this.spaces[i];
    var newSpaces = space.getMaximalFreeRects( rect );
    // add either the original space or the new spaces to the revised spaces
    if ( newSpaces ) {
      revisedSpaces.push.apply( revisedSpaces, newSpaces );
    } else {
      revisedSpaces.push( space );
    }
  }

  this.spaces = revisedSpaces;

  this.mergeSortSpaces();
};

Packer.prototype.mergeSortSpaces = function() {
  // remove redundant spaces
  Packer.mergeRects( this.spaces );
  this.spaces.sort( this.sorter );
};

// add a space back
Packer.prototype.addSpace = function( rect ) {
  this.spaces.push( rect );
  this.mergeSortSpaces();
};

// -------------------------- utility functions -------------------------- //

/**
 * Remove redundant rectangle from array of rectangles
 * @param {Array} rects: an array of Rects
 * @returns {Array} rects: an array of Rects
**/
Packer.mergeRects = function( rects ) {
  for ( var i=0, len = rects.length; i < len; i++ ) {
    var rect = rects[i];
    // skip over this rect if it was already removed
    if ( !rect ) {
      continue;
    }
    // clone rects we're testing, remove this rect
    var compareRects = rects.slice(0);
    // do not compare with self
    compareRects.splice( i, 1 );
    // compare this rect with others
    var removedCount = 0;
    for ( var j=0, jLen = compareRects.length; j < jLen; j++ ) {
      var compareRect = compareRects[j];
      // if this rect contains another,
      // remove that rect from test collection
      var indexAdjust = i > j ? 0 : 1;
      if ( rect.contains( compareRect ) ) {
        // console.log( 'current test rects:' + testRects.length, testRects );
        // console.log( i, j, indexAdjust, rect, compareRect );
        rects.splice( j + indexAdjust - removedCount, 1 );
        removedCount++;
      }
    }
  }

  return rects;
};


// -------------------------- sorters -------------------------- //

// functions for sorting rects in order
var sorters = {
  // top down, then left to right
  downwardLeftToRight: function( a, b ) {
    return a.y - b.y || a.x - b.x;
  },
  // left to right, then top down
  rightwardTopToBottom: function( a, b ) {
    return a.x - b.x || a.y - b.y;
  }
};


// --------------------------  -------------------------- //

return Packer;

}));
},{"./rect":25}],24:[function(require,module,exports){
/*!
 * Packery v1.4.3
 * bin-packing layout library
 *
 * Licensed GPLv3 for open source use
 * or Flickity Commercial License for commercial use
 *
 * http://packery.metafizzy.co
 * Copyright 2015 Metafizzy
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( [
        'classie/classie',
        'get-size/get-size',
        'outlayer/outlayer',
        './rect',
        './packer',
        './item'
      ],
      factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory(
      require('desandro-classie'),
      require('get-size'),
      require('outlayer'),
      require('./rect'),
      require('./packer'),
      require('./item')
    );
  } else {
    // browser global
    window.Packery = factory(
      window.classie,
      window.getSize,
      window.Outlayer,
      window.Packery.Rect,
      window.Packery.Packer,
      window.Packery.Item
    );
  }

}( window, function factory( classie, getSize, Outlayer, Rect, Packer, Item ) {
'use strict';

// ----- Rect ----- //

// allow for pixel rounding errors IE8-IE11 & Firefox; #227
Rect.prototype.canFit = function( rect ) {
  return this.width >= rect.width - 1 && this.height >= rect.height - 1;
};

// -------------------------- Packery -------------------------- //

// create an Outlayer layout class
var Packery = Outlayer.create('packery');
Packery.Item = Item;

Packery.prototype._create = function() {
  // call super
  Outlayer.prototype._create.call( this );

  // initial properties
  this.packer = new Packer();

  // Left over from v1.0
  this.stamp( this.options.stamped );

  // create drag handlers
  var _this = this;
  this.handleDraggabilly = {
    dragStart: function() {
      _this.itemDragStart( this.element );
    },
    dragMove: function() {
      _this.itemDragMove( this.element, this.position.x, this.position.y );
    },
    dragEnd: function() {
      _this.itemDragEnd( this.element );
    }
  };

  this.handleUIDraggable = {
    start: function handleUIDraggableStart( event, ui ) {
      // HTML5 may trigger dragstart, dismiss HTML5 dragging
      if ( !ui ) {
        return;
      }
      _this.itemDragStart( event.currentTarget );
    },
    drag: function handleUIDraggableDrag( event, ui ) {
      if ( !ui ) {
        return;
      }
      _this.itemDragMove( event.currentTarget, ui.position.left, ui.position.top );
    },
    stop: function handleUIDraggableStop( event, ui ) {
      if ( !ui ) {
        return;
      }
      _this.itemDragEnd( event.currentTarget );
    }
  };

};


// ----- init & layout ----- //

/**
 * logic before any new layout
 */
Packery.prototype._resetLayout = function() {
  this.getSize();

  this._getMeasurements();

  // reset packer
  var packer = this.packer;
  // packer settings, if horizontal or vertical
  if ( this.options.isHorizontal ) {
    packer.width = Number.POSITIVE_INFINITY;
    packer.height = this.size.innerHeight + this.gutter;
    packer.sortDirection = 'rightwardTopToBottom';
  } else {
    packer.width = this.size.innerWidth + this.gutter;
    packer.height = Number.POSITIVE_INFINITY;
    packer.sortDirection = 'downwardLeftToRight';
  }

  packer.reset();

  // layout
  this.maxY = 0;
  this.maxX = 0;
};

/**
 * update columnWidth, rowHeight, & gutter
 * @private
 */
Packery.prototype._getMeasurements = function() {
  this._getMeasurement( 'columnWidth', 'width' );
  this._getMeasurement( 'rowHeight', 'height' );
  this._getMeasurement( 'gutter', 'width' );
};

Packery.prototype._getItemLayoutPosition = function( item ) {
  this._packItem( item );
  return item.rect;
};


/**
 * layout item in packer
 * @param {Packery.Item} item
 */
Packery.prototype._packItem = function( item ) {
  this._setRectSize( item.element, item.rect );
  // pack the rect in the packer
  this.packer.pack( item.rect );
  this._setMaxXY( item.rect );
};

/**
 * set max X and Y value, for size of container
 * @param {Packery.Rect} rect
 * @private
 */
Packery.prototype._setMaxXY = function( rect ) {
  this.maxX = Math.max( rect.x + rect.width, this.maxX );
  this.maxY = Math.max( rect.y + rect.height, this.maxY );
};

/**
 * set the width and height of a rect, applying columnWidth and rowHeight
 * @param {Element} elem
 * @param {Packery.Rect} rect
 */
Packery.prototype._setRectSize = function( elem, rect ) {
  var size = getSize( elem );
  var w = size.outerWidth;
  var h = size.outerHeight;
  // size for columnWidth and rowHeight, if available
  // only check if size is non-zero, #177
  if ( w || h ) {
    w = this._applyGridGutter( w, this.columnWidth );
    h = this._applyGridGutter( h, this.rowHeight );
  }
  // rect must fit in packer
  rect.width = Math.min( w, this.packer.width );
  rect.height = Math.min( h, this.packer.height );
};

/**
 * fits item to columnWidth/rowHeight and adds gutter
 * @param {Number} measurement - item width or height
 * @param {Number} gridSize - columnWidth or rowHeight
 * @returns measurement
 */
Packery.prototype._applyGridGutter = function( measurement, gridSize ) {
  // just add gutter if no gridSize
  if ( !gridSize ) {
    return measurement + this.gutter;
  }
  gridSize += this.gutter;
  // fit item to columnWidth/rowHeight
  var remainder = measurement % gridSize;
  var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
  measurement = Math[ mathMethod ]( measurement / gridSize ) * gridSize;
  return measurement;
};

Packery.prototype._getContainerSize = function() {
  if ( this.options.isHorizontal ) {
    return {
      width: this.maxX - this.gutter
    };
  } else {
    return {
      height: this.maxY - this.gutter
    };
  }
};


// -------------------------- stamp -------------------------- //

/**
 * makes space for element
 * @param {Element} elem
 */
Packery.prototype._manageStamp = function( elem ) {

  var item = this.getItem( elem );
  var rect;
  if ( item && item.isPlacing ) {
    rect = item.placeRect;
  } else {
    var offset = this._getElementOffset( elem );
    rect = new Rect({
      x: this.options.isOriginLeft ? offset.left : offset.right,
      y: this.options.isOriginTop ? offset.top : offset.bottom
    });
  }

  this._setRectSize( elem, rect );
  // save its space in the packer
  this.packer.placed( rect );
  this._setMaxXY( rect );
};

// -------------------------- methods -------------------------- //

function verticalSorter( a, b ) {
  return a.position.y - b.position.y || a.position.x - b.position.x;
}

function horizontalSorter( a, b ) {
  return a.position.x - b.position.x || a.position.y - b.position.y;
}

Packery.prototype.sortItemsByPosition = function() {
  var sorter = this.options.isHorizontal ? horizontalSorter : verticalSorter;
  this.items.sort( sorter );
};

/**
 * Fit item element in its current position
 * Packery will position elements around it
 * useful for expanding elements
 *
 * @param {Element} elem
 * @param {Number} x - horizontal destination position, optional
 * @param {Number} y - vertical destination position, optional
 */
Packery.prototype.fit = function( elem, x, y ) {
  var item = this.getItem( elem );
  if ( !item ) {
    return;
  }

  // prepare internal properties
  this._getMeasurements();

  // stamp item to get it out of layout
  this.stamp( item.element );
  // required for positionPlaceRect
  item.getSize();
  // set placing flag
  item.isPlacing = true;
  // fall back to current position for fitting
  x = x === undefined ? item.rect.x: x;
  y = y === undefined ? item.rect.y: y;

  // position it best at its destination
  item.positionPlaceRect( x, y, true );

  this._bindFitEvents( item );
  item.moveTo( item.placeRect.x, item.placeRect.y );
  // layout everything else
  this.layout();

  // return back to regularly scheduled programming
  this.unstamp( item.element );
  this.sortItemsByPosition();
  // un set placing flag, back to normal
  item.isPlacing = false;
  // copy place rect position
  item.copyPlaceRectPosition();
};

/**
 * emit event when item is fit and other items are laid out
 * @param {Packery.Item} item
 * @private
 */
Packery.prototype._bindFitEvents = function( item ) {
  var _this = this;
  var ticks = 0;
  function tick() {
    ticks++;
    if ( ticks != 2 ) {
      return;
    }
    _this.dispatchEvent( 'fitComplete', null, [ item ] );
  }
  // when item is laid out
  item.on( 'layout', function() {
    tick();
    return true;
  });
  // when all items are laid out
  this.on( 'layoutComplete', function() {
    tick();
    return true;
  });
};

// -------------------------- resize -------------------------- //

// debounced, layout on resize
Packery.prototype.resize = function() {
  // don't trigger if size did not change
  var size = getSize( this.element );
  // check that this.size and size are there
  // IE8 triggers resize on body size change, so they might not be
  var hasSizes = this.size && size;
  var innerSize = this.options.isHorizontal ? 'innerHeight' : 'innerWidth';
  if ( hasSizes && size[ innerSize ] == this.size[ innerSize ] ) {
    return;
  }

  this.layout();
};

// -------------------------- drag -------------------------- //

/**
 * handle an item drag start event
 * @param {Element} elem
 */
Packery.prototype.itemDragStart = function( elem ) {
  this.stamp( elem );
  var item = this.getItem( elem );
  if ( item ) {
    item.dragStart();
  }
};

/**
 * handle an item drag move event
 * @param {Element} elem
 * @param {Number} x - horizontal change in position
 * @param {Number} y - vertical change in position
 */
Packery.prototype.itemDragMove = function( elem, x, y ) {
  var item = this.getItem( elem );
  if ( item ) {
    item.dragMove( x, y );
  }

  // debounce
  var _this = this;
  // debounce triggering layout
  function delayed() {
    _this.layout();
    delete _this.dragTimeout;
  }

  this.clearDragTimeout();

  this.dragTimeout = setTimeout( delayed, 40 );
};

Packery.prototype.clearDragTimeout = function() {
  if ( this.dragTimeout ) {
    clearTimeout( this.dragTimeout );
  }
};

/**
 * handle an item drag end event
 * @param {Element} elem
 */
Packery.prototype.itemDragEnd = function( elem ) {
  var item = this.getItem( elem );
  var itemDidDrag;
  if ( item ) {
    itemDidDrag = item.didDrag;
    item.dragStop();
  }
  // if elem didn't move, or if it doesn't need positioning
  // unignore and unstamp and call it a day
  if ( !item || ( !itemDidDrag && !item.needsPositioning ) ) {
    this.unstamp( elem );
    return;
  }
  // procced with dragged item

  classie.add( item.element, 'is-positioning-post-drag' );

  // save this var, as it could get reset in dragStart
  var onLayoutComplete = this._getDragEndLayoutComplete( elem, item );

  if ( item.needsPositioning ) {
    item.on( 'layout', onLayoutComplete );
    item.moveTo( item.placeRect.x, item.placeRect.y );
  } else if ( item ) {
    // item didn't need placement
    item.copyPlaceRectPosition();
  }

  this.clearDragTimeout();
  this.on( 'layoutComplete', onLayoutComplete );
  this.layout();

};

/**
 * get drag end callback
 * @param {Element} elem
 * @param {Packery.Item} item
 * @returns {Function} onLayoutComplete
 */
Packery.prototype._getDragEndLayoutComplete = function( elem, item ) {
  var itemNeedsPositioning = item && item.needsPositioning;
  var completeCount = 0;
  var asyncCount = itemNeedsPositioning ? 2 : 1;
  var _this = this;

  return function onLayoutComplete() {
    completeCount++;
    // don't proceed if not complete
    if ( completeCount != asyncCount ) {
      return true;
    }
    // reset item
    if ( item ) {
      classie.remove( item.element, 'is-positioning-post-drag' );
      item.isPlacing = false;
      item.copyPlaceRectPosition();
    }

    _this.unstamp( elem );
    // only sort when item moved
    _this.sortItemsByPosition();

    // emit item drag event now that everything is done
    if ( itemNeedsPositioning ) {
      _this.dispatchEvent( 'dragItemPositioned', null, [ item ] );
    }
    // listen once
    return true;
  };
};

/**
 * binds Draggabilly events
 * @param {Draggabilly} draggie
 */
Packery.prototype.bindDraggabillyEvents = function( draggie ) {
  draggie.on( 'dragStart', this.handleDraggabilly.dragStart );
  draggie.on( 'dragMove', this.handleDraggabilly.dragMove );
  draggie.on( 'dragEnd', this.handleDraggabilly.dragEnd );
};

/**
 * binds jQuery UI Draggable events
 * @param {jQuery} $elems
 */
Packery.prototype.bindUIDraggableEvents = function( $elems ) {
  $elems
    .on( 'dragstart', this.handleUIDraggable.start )
    .on( 'drag', this.handleUIDraggable.drag )
    .on( 'dragstop', this.handleUIDraggable.stop );
};

Packery.Rect = Rect;
Packery.Packer = Packer;

return Packery;

}));

},{"./item":22,"./packer":23,"./rect":25,"desandro-classie":13,"get-size":19,"outlayer":21}],25:[function(require,module,exports){
/**
 * Rect
 * low-level utility class for basic geometry
 */

( function( window, factory ) {
  'use strict';
  // universal module definition
  if ( typeof define == 'function' && define.amd ) {
    // AMD
    define( factory );
  } else if ( typeof exports == 'object' ) {
    // CommonJS
    module.exports = factory();
  } else {
    // browser global
    window.Packery = window.Packery || {};
    window.Packery.Rect = factory();
  }

}( window, function factory() {
'use strict';

// -------------------------- Packery -------------------------- //

// global namespace
var Packery = window.Packery = function() {};

// -------------------------- Rect -------------------------- //

function Rect( props ) {
  // extend properties from defaults
  for ( var prop in Rect.defaults ) {
    this[ prop ] = Rect.defaults[ prop ];
  }

  for ( prop in props ) {
    this[ prop ] = props[ prop ];
  }

}

// make available
Packery.Rect = Rect;

Rect.defaults = {
  x: 0,
  y: 0,
  width: 0,
  height: 0
};

/**
 * Determines whether or not this rectangle wholly encloses another rectangle or point.
 * @param {Rect} rect
 * @returns {Boolean}
**/
Rect.prototype.contains = function( rect ) {
  // points don't have width or height
  var otherWidth = rect.width || 0;
  var otherHeight = rect.height || 0;
  return this.x <= rect.x &&
    this.y <= rect.y &&
    this.x + this.width >= rect.x + otherWidth &&
    this.y + this.height >= rect.y + otherHeight;
};

/**
 * Determines whether or not the rectangle intersects with another.
 * @param {Rect} rect
 * @returns {Boolean}
**/
Rect.prototype.overlaps = function( rect ) {
  var thisRight = this.x + this.width;
  var thisBottom = this.y + this.height;
  var rectRight = rect.x + rect.width;
  var rectBottom = rect.y + rect.height;

  // http://stackoverflow.com/a/306332
  return this.x < rectRight &&
    thisRight > rect.x &&
    this.y < rectBottom &&
    thisBottom > rect.y;
};

/**
 * @param {Rect} rect - the overlapping rect
 * @returns {Array} freeRects - rects representing the area around the rect
**/
Rect.prototype.getMaximalFreeRects = function( rect ) {

  // if no intersection, return false
  if ( !this.overlaps( rect ) ) {
    return false;
  }

  var freeRects = [];
  var freeRect;

  var thisRight = this.x + this.width;
  var thisBottom = this.y + this.height;
  var rectRight = rect.x + rect.width;
  var rectBottom = rect.y + rect.height;

  // top
  if ( this.y < rect.y ) {
    freeRect = new Rect({
      x: this.x,
      y: this.y,
      width: this.width,
      height: rect.y - this.y
    });
    freeRects.push( freeRect );
  }

  // right
  if ( thisRight > rectRight ) {
    freeRect = new Rect({
      x: rectRight,
      y: this.y,
      width: thisRight - rectRight,
      height: this.height
    });
    freeRects.push( freeRect );
  }

  // bottom
  if ( thisBottom > rectBottom ) {
    freeRect = new Rect({
      x: this.x,
      y: rectBottom,
      width: this.width,
      height: thisBottom - rectBottom
    });
    freeRects.push( freeRect );
  }

  // left
  if ( this.x < rect.x ) {
    freeRect = new Rect({
      x: this.x,
      y: this.y,
      width: rect.x - this.x,
      height: this.height
    });
    freeRects.push( freeRect );
  }

  return freeRects;
};

Rect.prototype.canFit = function( rect ) {
  return this.width >= rect.width && this.height >= rect.height;
};

return Rect;

}));

},{}],26:[function(require,module,exports){
/**
 * Swiper 3.4.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2016, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: December 13, 2016
 */
(function () {
    'use strict';
    var $;
    /*===========================
    Swiper
    ===========================*/
    var Swiper = function (container, params) {
        if (!(this instanceof Swiper)) return new Swiper(container, params);

        var defaults = {
            direction: 'horizontal',
            touchEventsTarget: 'container',
            initialSlide: 0,
            speed: 300,
            // autoplay
            autoplay: false,
            autoplayDisableOnInteraction: true,
            autoplayStopOnLast: false,
            // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
            iOSEdgeSwipeDetection: false,
            iOSEdgeSwipeThreshold: 20,
            // Free mode
            freeMode: false,
            freeModeMomentum: true,
            freeModeMomentumRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeSticky: false,
            freeModeMinimumVelocity: 0.02,
            // Autoheight
            autoHeight: false,
            // Set wrapper width
            setWrapperSize: false,
            // Virtual Translate
            virtualTranslate: false,
            // Effects
            effect: 'slide', // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows : true
            },
            flip: {
                slideShadows : true,
                limitRotation: true
            },
            cube: {
                slideShadows: true,
                shadow: true,
                shadowOffset: 20,
                shadowScale: 0.94
            },
            fade: {
                crossFade: false
            },
            // Parallax
            parallax: false,
            // Zoom
            zoom: false,
            zoomMax: 3,
            zoomMin: 1,
            zoomToggle: true,
            // Scrollbar
            scrollbar: null,
            scrollbarHide: true,
            scrollbarDraggable: false,
            scrollbarSnapOnRelease: false,
            // Keyboard Mousewheel
            keyboardControl: false,
            mousewheelControl: false,
            mousewheelReleaseOnEdges: false,
            mousewheelInvert: false,
            mousewheelForceToAxis: false,
            mousewheelSensitivity: 1,
            mousewheelEventsTarged: 'container',
            // Hash Navigation
            hashnav: false,
            hashnavWatchState: false,
            // History
            history: false,
            // Commong Nav State
            replaceState: false,
            // Breakpoints
            breakpoints: undefined,
            // Slides grid
            spaceBetween: 0,
            slidesPerView: 1,
            slidesPerColumn: 1,
            slidesPerColumnFill: 'column',
            slidesPerGroup: 1,
            centeredSlides: false,
            slidesOffsetBefore: 0, // in px
            slidesOffsetAfter: 0, // in px
            // Round length
            roundLengths: false,
            // Touches
            touchRatio: 1,
            touchAngle: 45,
            simulateTouch: true,
            shortSwipes: true,
            longSwipes: true,
            longSwipesRatio: 0.5,
            longSwipesMs: 300,
            followFinger: true,
            onlyExternal: false,
            threshold: 0,
            touchMoveStopPropagation: true,
            touchReleaseOnEdges: false,
            // Unique Navigation Elements
            uniqueNavElements: true,
            // Pagination
            pagination: null,
            paginationElement: 'span',
            paginationClickable: false,
            paginationHide: false,
            paginationBulletRender: null,
            paginationProgressRender: null,
            paginationFractionRender: null,
            paginationCustomRender: null,
            paginationType: 'bullets', // 'bullets' or 'progress' or 'fraction' or 'custom'
            // Resistance
            resistance: true,
            resistanceRatio: 0.85,
            // Next/prev buttons
            nextButton: null,
            prevButton: null,
            // Progress
            watchSlidesProgress: false,
            watchSlidesVisibility: false,
            // Cursor
            grabCursor: false,
            // Clicks
            preventClicks: true,
            preventClicksPropagation: true,
            slideToClickedSlide: false,
            // Lazy Loading
            lazyLoading: false,
            lazyLoadingInPrevNext: false,
            lazyLoadingInPrevNextAmount: 1,
            lazyLoadingOnTransitionStart: false,
            // Images
            preloadImages: true,
            updateOnImagesReady: true,
            // loop
            loop: false,
            loopAdditionalSlides: 0,
            loopedSlides: null,
            // Control
            control: undefined,
            controlInverse: false,
            controlBy: 'slide', //or 'container'
            normalizeSlideIndex: true,
            // Swiping/no swiping
            allowSwipeToPrev: true,
            allowSwipeToNext: true,
            swipeHandler: null, //'.swipe-handler',
            noSwiping: true,
            noSwipingClass: 'swiper-no-swiping',
            // Passive Listeners
            passiveListeners: true,
            // NS
            containerModifierClass: 'swiper-container-', // NEW
            slideClass: 'swiper-slide',
            slideActiveClass: 'swiper-slide-active',
            slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
            slideVisibleClass: 'swiper-slide-visible',
            slideDuplicateClass: 'swiper-slide-duplicate',
            slideNextClass: 'swiper-slide-next',
            slideDuplicateNextClass: 'swiper-slide-duplicate-next',
            slidePrevClass: 'swiper-slide-prev',
            slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
            wrapperClass: 'swiper-wrapper',
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            buttonDisabledClass: 'swiper-button-disabled',
            paginationCurrentClass: 'swiper-pagination-current',
            paginationTotalClass: 'swiper-pagination-total',
            paginationHiddenClass: 'swiper-pagination-hidden',
            paginationProgressbarClass: 'swiper-pagination-progressbar',
            paginationClickableClass: 'swiper-pagination-clickable', // NEW
            paginationModifierClass: 'swiper-pagination-', // NEW
            lazyLoadingClass: 'swiper-lazy',
            lazyStatusLoadingClass: 'swiper-lazy-loading',
            lazyStatusLoadedClass: 'swiper-lazy-loaded',
            lazyPreloaderClass: 'swiper-lazy-preloader',
            notificationClass: 'swiper-notification',
            preloaderClass: 'preloader',
            zoomContainerClass: 'swiper-zoom-container',
        
            // Observer
            observer: false,
            observeParents: false,
            // Accessibility
            a11y: false,
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
            // Callbacks
            runCallbacksOnInit: true
            /*
            Callbacks:
            onInit: function (swiper)
            onDestroy: function (swiper)
            onClick: function (swiper, e)
            onTap: function (swiper, e)
            onDoubleTap: function (swiper, e)
            onSliderMove: function (swiper, e)
            onSlideChangeStart: function (swiper)
            onSlideChangeEnd: function (swiper)
            onTransitionStart: function (swiper)
            onTransitionEnd: function (swiper)
            onImagesReady: function (swiper)
            onProgress: function (swiper, progress)
            onTouchStart: function (swiper, e)
            onTouchMove: function (swiper, e)
            onTouchMoveOpposite: function (swiper, e)
            onTouchEnd: function (swiper, e)
            onReachBeginning: function (swiper)
            onReachEnd: function (swiper)
            onSetTransition: function (swiper, duration)
            onSetTranslate: function (swiper, translate)
            onAutoplayStart: function (swiper)
            onAutoplayStop: function (swiper),
            onLazyImageLoad: function (swiper, slide, image)
            onLazyImageReady: function (swiper, slide, image)
            */
        
        };
        var initialVirtualTranslate = params && params.virtualTranslate;
        
        params = params || {};
        var originalParams = {};
        for (var param in params) {
            if (typeof params[param] === 'object' && params[param] !== null && !(params[param].nodeType || params[param] === window || params[param] === document || (typeof Dom7 !== 'undefined' && params[param] instanceof Dom7) || (typeof jQuery !== 'undefined' && params[param] instanceof jQuery))) {
                originalParams[param] = {};
                for (var deepParam in params[param]) {
                    originalParams[param][deepParam] = params[param][deepParam];
                }
            }
            else {
                originalParams[param] = params[param];
            }
        }
        for (var def in defaults) {
            if (typeof params[def] === 'undefined') {
                params[def] = defaults[def];
            }
            else if (typeof params[def] === 'object') {
                for (var deepDef in defaults[def]) {
                    if (typeof params[def][deepDef] === 'undefined') {
                        params[def][deepDef] = defaults[def][deepDef];
                    }
                }
            }
        }
        
        // Swiper
        var s = this;
        
        // Params
        s.params = params;
        s.originalParams = originalParams;
        
        // Classname
        s.classNames = [];
        /*=========================
          Dom Library and plugins
          ===========================*/
        if (typeof $ !== 'undefined' && typeof Dom7 !== 'undefined'){
            $ = Dom7;
        }
        if (typeof $ === 'undefined') {
            if (typeof Dom7 === 'undefined') {
                $ = window.Dom7 || window.Zepto || window.jQuery;
            }
            else {
                $ = Dom7;
            }
            if (!$) return;
        }
        // Export it to Swiper instance
        s.$ = $;
        
        /*=========================
          Breakpoints
          ===========================*/
        s.currentBreakpoint = undefined;
        s.getActiveBreakpoint = function () {
            //Get breakpoint for window width
            if (!s.params.breakpoints) return false;
            var breakpoint = false;
            var points = [], point;
            for ( point in s.params.breakpoints ) {
                if (s.params.breakpoints.hasOwnProperty(point)) {
                    points.push(point);
                }
            }
            points.sort(function (a, b) {
                return parseInt(a, 10) > parseInt(b, 10);
            });
            for (var i = 0; i < points.length; i++) {
                point = points[i];
                if (point >= window.innerWidth && !breakpoint) {
                    breakpoint = point;
                }
            }
            return breakpoint || 'max';
        };
        s.setBreakpoint = function () {
            //Set breakpoint for window width and update parameters
            var breakpoint = s.getActiveBreakpoint();
            if (breakpoint && s.currentBreakpoint !== breakpoint) {
                var breakPointsParams = breakpoint in s.params.breakpoints ? s.params.breakpoints[breakpoint] : s.originalParams;
                var needsReLoop = s.params.loop && (breakPointsParams.slidesPerView !== s.params.slidesPerView);
                for ( var param in breakPointsParams ) {
                    s.params[param] = breakPointsParams[param];
                }
                s.currentBreakpoint = breakpoint;
                if(needsReLoop && s.destroyLoop) {
                    s.reLoop(true);
                }
            }
        };
        // Set breakpoint on load
        if (s.params.breakpoints) {
            s.setBreakpoint();
        }
        
        /*=========================
          Preparation - Define Container, Wrapper and Pagination
          ===========================*/
        s.container = $(container);
        if (s.container.length === 0) return;
        if (s.container.length > 1) {
            var swipers = [];
            s.container.each(function () {
                var container = this;
                swipers.push(new Swiper(this, params));
            });
            return swipers;
        }
        
        // Save instance in container HTML Element and in data
        s.container[0].swiper = s;
        s.container.data('swiper', s);
        
        s.classNames.push(s.params.containerModifierClass + s.params.direction);
        
        if (s.params.freeMode) {
            s.classNames.push(s.params.containerModifierClass + 'free-mode');
        }
        if (!s.support.flexbox) {
            s.classNames.push(s.params.containerModifierClass + 'no-flexbox');
            s.params.slidesPerColumn = 1;
        }
        if (s.params.autoHeight) {
            s.classNames.push(s.params.containerModifierClass + 'autoheight');
        }
        // Enable slides progress when required
        if (s.params.parallax || s.params.watchSlidesVisibility) {
            s.params.watchSlidesProgress = true;
        }
        // Max resistance when touchReleaseOnEdges
        if (s.params.touchReleaseOnEdges) {
            s.params.resistanceRatio = 0;
        }
        // Coverflow / 3D
        if (['cube', 'coverflow', 'flip'].indexOf(s.params.effect) >= 0) {
            if (s.support.transforms3d) {
                s.params.watchSlidesProgress = true;
                s.classNames.push(s.params.containerModifierClass + '3d');
            }
            else {
                s.params.effect = 'slide';
            }
        }
        if (s.params.effect !== 'slide') {
            s.classNames.push(s.params.containerModifierClass + s.params.effect);
        }
        if (s.params.effect === 'cube') {
            s.params.resistanceRatio = 0;
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.centeredSlides = false;
            s.params.spaceBetween = 0;
            s.params.virtualTranslate = true;
            s.params.setWrapperSize = false;
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
            s.params.setWrapperSize = false;
            if (typeof initialVirtualTranslate === 'undefined') {
                s.params.virtualTranslate = true;
            }
        }
        
        // Grab Cursor
        if (s.params.grabCursor && s.support.touch) {
            s.params.grabCursor = false;
        }
        
        // Wrapper
        s.wrapper = s.container.children('.' + s.params.wrapperClass);
        
        // Pagination
        if (s.params.pagination) {
            s.paginationContainer = $(s.params.pagination);
            if (s.params.uniqueNavElements && typeof s.params.pagination === 'string' && s.paginationContainer.length > 1 && s.container.find(s.params.pagination).length === 1) {
                s.paginationContainer = s.container.find(s.params.pagination);
            }
        
            if (s.params.paginationType === 'bullets' && s.params.paginationClickable) {
                s.paginationContainer.addClass(s.params.paginationModifierClass + 'clickable');
            }
            else {
                s.params.paginationClickable = false;
            }
            s.paginationContainer.addClass(s.params.paginationModifierClass + s.params.paginationType);
        }
        // Next/Prev Buttons
        if (s.params.nextButton || s.params.prevButton) {
            if (s.params.nextButton) {
                s.nextButton = $(s.params.nextButton);
                if (s.params.uniqueNavElements && typeof s.params.nextButton === 'string' && s.nextButton.length > 1 && s.container.find(s.params.nextButton).length === 1) {
                    s.nextButton = s.container.find(s.params.nextButton);
                }
            }
            if (s.params.prevButton) {
                s.prevButton = $(s.params.prevButton);
                if (s.params.uniqueNavElements && typeof s.params.prevButton === 'string' && s.prevButton.length > 1 && s.container.find(s.params.prevButton).length === 1) {
                    s.prevButton = s.container.find(s.params.prevButton);
                }
            }
        }
        
        // Is Horizontal
        s.isHorizontal = function () {
            return s.params.direction === 'horizontal';
        };
        // s.isH = isH;
        
        // RTL
        s.rtl = s.isHorizontal() && (s.container[0].dir.toLowerCase() === 'rtl' || s.container.css('direction') === 'rtl');
        if (s.rtl) {
            s.classNames.push(s.params.containerModifierClass + 'rtl');
        }
        
        // Wrong RTL support
        if (s.rtl) {
            s.wrongRTL = s.wrapper.css('display') === '-webkit-box';
        }
        
        // Columns
        if (s.params.slidesPerColumn > 1) {
            s.classNames.push(s.params.containerModifierClass + 'multirow');
        }
        
        // Check for Android
        if (s.device.android) {
            s.classNames.push(s.params.containerModifierClass + 'android');
        }
        
        // Add classes
        s.container.addClass(s.classNames.join(' '));
        
        // Translate
        s.translate = 0;
        
        // Progress
        s.progress = 0;
        
        // Velocity
        s.velocity = 0;
        
        /*=========================
          Locks, unlocks
          ===========================*/
        s.lockSwipeToNext = function () {
            s.params.allowSwipeToNext = false;
            if (s.params.allowSwipeToPrev === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = false;
            if (s.params.allowSwipeToNext === false && s.params.grabCursor) {
                s.unsetGrabCursor();
            }
        };
        s.lockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = false;
            if (s.params.grabCursor) s.unsetGrabCursor();
        };
        s.unlockSwipeToNext = function () {
            s.params.allowSwipeToNext = true;
            if (s.params.allowSwipeToPrev === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipeToPrev = function () {
            s.params.allowSwipeToPrev = true;
            if (s.params.allowSwipeToNext === true && s.params.grabCursor) {
                s.setGrabCursor();
            }
        };
        s.unlockSwipes = function () {
            s.params.allowSwipeToNext = s.params.allowSwipeToPrev = true;
            if (s.params.grabCursor) s.setGrabCursor();
        };
        
        /*=========================
          Round helper
          ===========================*/
        function round(a) {
            return Math.floor(a);
        }
        /*=========================
          Set grab cursor
          ===========================*/
        s.setGrabCursor = function(moving) {
            s.container[0].style.cursor = 'move';
            s.container[0].style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
            s.container[0].style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
            s.container[0].style.cursor = moving ? 'grabbing': 'grab';
        };
        s.unsetGrabCursor = function () {
            s.container[0].style.cursor = '';
        };
        if (s.params.grabCursor) {
            s.setGrabCursor();
        }
        /*=========================
          Update on Images Ready
          ===========================*/
        s.imagesToLoad = [];
        s.imagesLoaded = 0;
        
        s.loadImage = function (imgElement, src, srcset, sizes, checkForComplete, callback) {
            var image;
            function onReady () {
                if (callback) callback();
            }
            if (!imgElement.complete || !checkForComplete) {
                if (src) {
                    image = new window.Image();
                    image.onload = onReady;
                    image.onerror = onReady;
                    if (sizes) {
                        image.sizes = sizes;
                    }
                    if (srcset) {
                        image.srcset = srcset;
                    }
                    if (src) {
                        image.src = src;
                    }
                } else {
                    onReady();
                }
        
            } else {//image already loaded...
                onReady();
            }
        };
        s.preloadImages = function () {
            s.imagesToLoad = s.container.find('img');
            function _onReady() {
                if (typeof s === 'undefined' || s === null || !s) return;
                if (s.imagesLoaded !== undefined) s.imagesLoaded++;
                if (s.imagesLoaded === s.imagesToLoad.length) {
                    if (s.params.updateOnImagesReady) s.update();
                    s.emit('onImagesReady', s);
                }
            }
            for (var i = 0; i < s.imagesToLoad.length; i++) {
                s.loadImage(s.imagesToLoad[i], (s.imagesToLoad[i].currentSrc || s.imagesToLoad[i].getAttribute('src')), (s.imagesToLoad[i].srcset || s.imagesToLoad[i].getAttribute('srcset')), s.imagesToLoad[i].sizes || s.imagesToLoad[i].getAttribute('sizes'), true, _onReady);
            }
        };
        
        /*=========================
          Autoplay
          ===========================*/
        s.autoplayTimeoutId = undefined;
        s.autoplaying = false;
        s.autoplayPaused = false;
        function autoplay() {
            var autoplayDelay = s.params.autoplay;
            var activeSlide = s.slides.eq(s.activeIndex);
            if (activeSlide.attr('data-swiper-autoplay')) {
                autoplayDelay = activeSlide.attr('data-swiper-autoplay') || s.params.autoplay;
            }
            s.autoplayTimeoutId = setTimeout(function () {
                if (s.params.loop) {
                    s.fixLoop();
                    s._slideNext();
                    s.emit('onAutoplay', s);
                }
                else {
                    if (!s.isEnd) {
                        s._slideNext();
                        s.emit('onAutoplay', s);
                    }
                    else {
                        if (!params.autoplayStopOnLast) {
                            s._slideTo(0);
                            s.emit('onAutoplay', s);
                        }
                        else {
                            s.stopAutoplay();
                        }
                    }
                }
            }, autoplayDelay);
        }
        s.startAutoplay = function () {
            if (typeof s.autoplayTimeoutId !== 'undefined') return false;
            if (!s.params.autoplay) return false;
            if (s.autoplaying) return false;
            s.autoplaying = true;
            s.emit('onAutoplayStart', s);
            autoplay();
        };
        s.stopAutoplay = function (internal) {
            if (!s.autoplayTimeoutId) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplaying = false;
            s.autoplayTimeoutId = undefined;
            s.emit('onAutoplayStop', s);
        };
        s.pauseAutoplay = function (speed) {
            if (s.autoplayPaused) return;
            if (s.autoplayTimeoutId) clearTimeout(s.autoplayTimeoutId);
            s.autoplayPaused = true;
            if (speed === 0) {
                s.autoplayPaused = false;
                autoplay();
            }
            else {
                s.wrapper.transitionEnd(function () {
                    if (!s) return;
                    s.autoplayPaused = false;
                    if (!s.autoplaying) {
                        s.stopAutoplay();
                    }
                    else {
                        autoplay();
                    }
                });
            }
        };
        /*=========================
          Min/Max Translate
          ===========================*/
        s.minTranslate = function () {
            return (-s.snapGrid[0]);
        };
        s.maxTranslate = function () {
            return (-s.snapGrid[s.snapGrid.length - 1]);
        };
        /*=========================
          Slider/slides sizes
          ===========================*/
        s.updateAutoHeight = function () {
            var activeSlides = [];
            var newHeight = 0;
            var i;
        
            // Find slides currently in view
            if(s.params.slidesPerView !== 'auto' && s.params.slidesPerView > 1) {
                for (i = 0; i < Math.ceil(s.params.slidesPerView); i++) {
                    var index = s.activeIndex + i;
                    if(index > s.slides.length) break;
                    activeSlides.push(s.slides.eq(index)[0]);
                }
            } else {
                activeSlides.push(s.slides.eq(s.activeIndex)[0]);
            }
        
            // Find new height from heighest slide in view
            for (i = 0; i < activeSlides.length; i++) {
                if (typeof activeSlides[i] !== 'undefined') {
                    var height = activeSlides[i].offsetHeight;
                    newHeight = height > newHeight ? height : newHeight;
                }
            }
        
            // Update Height
            if (newHeight) s.wrapper.css('height', newHeight + 'px');
        };
        s.updateContainerSize = function () {
            var width, height;
            if (typeof s.params.width !== 'undefined') {
                width = s.params.width;
            }
            else {
                width = s.container[0].clientWidth;
            }
            if (typeof s.params.height !== 'undefined') {
                height = s.params.height;
            }
            else {
                height = s.container[0].clientHeight;
            }
            if (width === 0 && s.isHorizontal() || height === 0 && !s.isHorizontal()) {
                return;
            }
        
            //Subtract paddings
            width = width - parseInt(s.container.css('padding-left'), 10) - parseInt(s.container.css('padding-right'), 10);
            height = height - parseInt(s.container.css('padding-top'), 10) - parseInt(s.container.css('padding-bottom'), 10);
        
            // Store values
            s.width = width;
            s.height = height;
            s.size = s.isHorizontal() ? s.width : s.height;
        };
        
        s.updateSlidesSize = function () {
            s.slides = s.wrapper.children('.' + s.params.slideClass);
            s.snapGrid = [];
            s.slidesGrid = [];
            s.slidesSizesGrid = [];
        
            var spaceBetween = s.params.spaceBetween,
                slidePosition = -s.params.slidesOffsetBefore,
                i,
                prevSlideSize = 0,
                index = 0;
            if (typeof s.size === 'undefined') return;
            if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
                spaceBetween = parseFloat(spaceBetween.replace('%', '')) / 100 * s.size;
            }
        
            s.virtualSize = -spaceBetween;
            // reset margins
            if (s.rtl) s.slides.css({marginLeft: '', marginTop: ''});
            else s.slides.css({marginRight: '', marginBottom: ''});
        
            var slidesNumberEvenToRows;
            if (s.params.slidesPerColumn > 1) {
                if (Math.floor(s.slides.length / s.params.slidesPerColumn) === s.slides.length / s.params.slidesPerColumn) {
                    slidesNumberEvenToRows = s.slides.length;
                }
                else {
                    slidesNumberEvenToRows = Math.ceil(s.slides.length / s.params.slidesPerColumn) * s.params.slidesPerColumn;
                }
                if (s.params.slidesPerView !== 'auto' && s.params.slidesPerColumnFill === 'row') {
                    slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, s.params.slidesPerView * s.params.slidesPerColumn);
                }
            }
        
            // Calc slides
            var slideSize;
            var slidesPerColumn = s.params.slidesPerColumn;
            var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
            var numFullColumns = slidesPerRow - (s.params.slidesPerColumn * slidesPerRow - s.slides.length);
            for (i = 0; i < s.slides.length; i++) {
                slideSize = 0;
                var slide = s.slides.eq(i);
                if (s.params.slidesPerColumn > 1) {
                    // Set slides order
                    var newSlideOrderIndex;
                    var column, row;
                    if (s.params.slidesPerColumnFill === 'column') {
                        column = Math.floor(i / slidesPerColumn);
                        row = i - column * slidesPerColumn;
                        if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn-1)) {
                            if (++row >= slidesPerColumn) {
                                row = 0;
                                column++;
                            }
                        }
                        newSlideOrderIndex = column + row * slidesNumberEvenToRows / slidesPerColumn;
                        slide
                            .css({
                                '-webkit-box-ordinal-group': newSlideOrderIndex,
                                '-moz-box-ordinal-group': newSlideOrderIndex,
                                '-ms-flex-order': newSlideOrderIndex,
                                '-webkit-order': newSlideOrderIndex,
                                'order': newSlideOrderIndex
                            });
                    }
                    else {
                        row = Math.floor(i / slidesPerRow);
                        column = i - row * slidesPerRow;
                    }
                    slide
                        .css(
                            'margin-' + (s.isHorizontal() ? 'top' : 'left'),
                            (row !== 0 && s.params.spaceBetween) && (s.params.spaceBetween + 'px')
                        )
                        .attr('data-swiper-column', column)
                        .attr('data-swiper-row', row);
        
                }
                if (slide.css('display') === 'none') continue;
                if (s.params.slidesPerView === 'auto') {
                    slideSize = s.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
                    if (s.params.roundLengths) slideSize = round(slideSize);
                }
                else {
                    slideSize = (s.size - (s.params.slidesPerView - 1) * spaceBetween) / s.params.slidesPerView;
                    if (s.params.roundLengths) slideSize = round(slideSize);
        
                    if (s.isHorizontal()) {
                        s.slides[i].style.width = slideSize + 'px';
                    }
                    else {
                        s.slides[i].style.height = slideSize + 'px';
                    }
                }
                s.slides[i].swiperSlideSize = slideSize;
                s.slidesSizesGrid.push(slideSize);
        
        
                if (s.params.centeredSlides) {
                    slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
                    if (i === 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
                    if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                }
                else {
                    if ((index) % s.params.slidesPerGroup === 0) s.snapGrid.push(slidePosition);
                    s.slidesGrid.push(slidePosition);
                    slidePosition = slidePosition + slideSize + spaceBetween;
                }
        
                s.virtualSize += slideSize + spaceBetween;
        
                prevSlideSize = slideSize;
        
                index ++;
            }
            s.virtualSize = Math.max(s.virtualSize, s.size) + s.params.slidesOffsetAfter;
            var newSlidesGrid;
        
            if (
                s.rtl && s.wrongRTL && (s.params.effect === 'slide' || s.params.effect === 'coverflow')) {
                s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
            }
            if (!s.support.flexbox || s.params.setWrapperSize) {
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
            }
        
            if (s.params.slidesPerColumn > 1) {
                s.virtualSize = (slideSize + s.params.spaceBetween) * slidesNumberEvenToRows;
                s.virtualSize = Math.ceil(s.virtualSize / s.params.slidesPerColumn) - s.params.spaceBetween;
                if (s.isHorizontal()) s.wrapper.css({width: s.virtualSize + s.params.spaceBetween + 'px'});
                else s.wrapper.css({height: s.virtualSize + s.params.spaceBetween + 'px'});
                if (s.params.centeredSlides) {
                    newSlidesGrid = [];
                    for (i = 0; i < s.snapGrid.length; i++) {
                        if (s.snapGrid[i] < s.virtualSize + s.snapGrid[0]) newSlidesGrid.push(s.snapGrid[i]);
                    }
                    s.snapGrid = newSlidesGrid;
                }
            }
        
            // Remove last grid elements depending on width
            if (!s.params.centeredSlides) {
                newSlidesGrid = [];
                for (i = 0; i < s.snapGrid.length; i++) {
                    if (s.snapGrid[i] <= s.virtualSize - s.size) {
                        newSlidesGrid.push(s.snapGrid[i]);
                    }
                }
                s.snapGrid = newSlidesGrid;
                if (Math.floor(s.virtualSize - s.size) - Math.floor(s.snapGrid[s.snapGrid.length - 1]) > 1) {
                    s.snapGrid.push(s.virtualSize - s.size);
                }
            }
            if (s.snapGrid.length === 0) s.snapGrid = [0];
        
            if (s.params.spaceBetween !== 0) {
                if (s.isHorizontal()) {
                    if (s.rtl) s.slides.css({marginLeft: spaceBetween + 'px'});
                    else s.slides.css({marginRight: spaceBetween + 'px'});
                }
                else s.slides.css({marginBottom: spaceBetween + 'px'});
            }
            if (s.params.watchSlidesProgress) {
                s.updateSlidesOffset();
            }
        };
        s.updateSlidesOffset = function () {
            for (var i = 0; i < s.slides.length; i++) {
                s.slides[i].swiperSlideOffset = s.isHorizontal() ? s.slides[i].offsetLeft : s.slides[i].offsetTop;
            }
        };
        
        /*=========================
          Dynamic Slides Per View
          ===========================*/
        s.currentSlidesPerView = function () {
            var spv = 1, i, j;
            if (s.params.centeredSlides) {
                var size = s.slides[s.activeIndex].swiperSlideSize;
                var breakLoop;
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slides[i] && !breakLoop) {
                        size += s.slides[i].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
                for (j = s.activeIndex - 1; j >= 0; j--) {
                    if (s.slides[j] && !breakLoop) {
                        size += s.slides[j].swiperSlideSize;
                        spv ++;
                        if (size > s.size) breakLoop = true;
                    }
                }
            }
            else {
                for (i = s.activeIndex + 1; i < s.slides.length; i++) {
                    if (s.slidesGrid[i] - s.slidesGrid[s.activeIndex] < s.size) {
                        spv++;
                    }
                }
            }
            return spv;
        };
        /*=========================
          Slider/slides progress
          ===========================*/
        s.updateSlidesProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            if (s.slides.length === 0) return;
            if (typeof s.slides[0].swiperSlideOffset === 'undefined') s.updateSlidesOffset();
        
            var offsetCenter = -translate;
            if (s.rtl) offsetCenter = translate;
        
            // Visible Slides
            s.slides.removeClass(s.params.slideVisibleClass);
            for (var i = 0; i < s.slides.length; i++) {
                var slide = s.slides[i];
                var slideProgress = (offsetCenter + (s.params.centeredSlides ? s.minTranslate() : 0) - slide.swiperSlideOffset) / (slide.swiperSlideSize + s.params.spaceBetween);
                if (s.params.watchSlidesVisibility) {
                    var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
                    var slideAfter = slideBefore + s.slidesSizesGrid[i];
                    var isVisible =
                        (slideBefore >= 0 && slideBefore < s.size) ||
                        (slideAfter > 0 && slideAfter <= s.size) ||
                        (slideBefore <= 0 && slideAfter >= s.size);
                    if (isVisible) {
                        s.slides.eq(i).addClass(s.params.slideVisibleClass);
                    }
                }
                slide.progress = s.rtl ? -slideProgress : slideProgress;
            }
        };
        s.updateProgress = function (translate) {
            if (typeof translate === 'undefined') {
                translate = s.translate || 0;
            }
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            var wasBeginning = s.isBeginning;
            var wasEnd = s.isEnd;
            if (translatesDiff === 0) {
                s.progress = 0;
                s.isBeginning = s.isEnd = true;
            }
            else {
                s.progress = (translate - s.minTranslate()) / (translatesDiff);
                s.isBeginning = s.progress <= 0;
                s.isEnd = s.progress >= 1;
            }
            if (s.isBeginning && !wasBeginning) s.emit('onReachBeginning', s);
            if (s.isEnd && !wasEnd) s.emit('onReachEnd', s);
        
            if (s.params.watchSlidesProgress) s.updateSlidesProgress(translate);
            s.emit('onProgress', s, s.progress);
        };
        s.updateActiveIndex = function () {
            var translate = s.rtl ? s.translate : -s.translate;
            var newActiveIndex, i, snapIndex;
            for (i = 0; i < s.slidesGrid.length; i ++) {
                if (typeof s.slidesGrid[i + 1] !== 'undefined') {
                    if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1] - (s.slidesGrid[i + 1] - s.slidesGrid[i]) / 2) {
                        newActiveIndex = i;
                    }
                    else if (translate >= s.slidesGrid[i] && translate < s.slidesGrid[i + 1]) {
                        newActiveIndex = i + 1;
                    }
                }
                else {
                    if (translate >= s.slidesGrid[i]) {
                        newActiveIndex = i;
                    }
                }
            }
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                if (newActiveIndex < 0 || typeof newActiveIndex === 'undefined') newActiveIndex = 0;
            }
            // for (i = 0; i < s.slidesGrid.length; i++) {
                // if (- translate >= s.slidesGrid[i]) {
                    // newActiveIndex = i;
                // }
            // }
            snapIndex = Math.floor(newActiveIndex / s.params.slidesPerGroup);
            if (snapIndex >= s.snapGrid.length) snapIndex = s.snapGrid.length - 1;
        
            if (newActiveIndex === s.activeIndex) {
                return;
            }
            s.snapIndex = snapIndex;
            s.previousIndex = s.activeIndex;
            s.activeIndex = newActiveIndex;
            s.updateClasses();
            s.updateRealIndex();
        };
        s.updateRealIndex = function(){
            s.realIndex = parseInt(s.slides.eq(s.activeIndex).attr('data-swiper-slide-index') || s.activeIndex, 10);
        };
        
        /*=========================
          Classes
          ===========================*/
        s.updateClasses = function () {
            s.slides.removeClass(s.params.slideActiveClass + ' ' + s.params.slideNextClass + ' ' + s.params.slidePrevClass + ' ' + s.params.slideDuplicateActiveClass + ' ' + s.params.slideDuplicateNextClass + ' ' + s.params.slideDuplicatePrevClass);
            var activeSlide = s.slides.eq(s.activeIndex);
            // Active classes
            activeSlide.addClass(s.params.slideActiveClass);
            if (params.loop) {
                // Duplicate to all looped slides
                if (activeSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + s.realIndex + '"]').addClass(s.params.slideDuplicateActiveClass);
                }
            }
            // Next Slide
            var nextSlide = activeSlide.next('.' + s.params.slideClass).addClass(s.params.slideNextClass);
            if (s.params.loop && nextSlide.length === 0) {
                nextSlide = s.slides.eq(0);
                nextSlide.addClass(s.params.slideNextClass);
            }
            // Prev Slide
            var prevSlide = activeSlide.prev('.' + s.params.slideClass).addClass(s.params.slidePrevClass);
            if (s.params.loop && prevSlide.length === 0) {
                prevSlide = s.slides.eq(-1);
                prevSlide.addClass(s.params.slidePrevClass);
            }
            if (params.loop) {
                // Duplicate to all looped slides
                if (nextSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + nextSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicateNextClass);
                }
                if (prevSlide.hasClass(s.params.slideDuplicateClass)) {
                    s.wrapper.children('.' + s.params.slideClass + ':not(.' + s.params.slideDuplicateClass + ')[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
                else {
                    s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + prevSlide.attr('data-swiper-slide-index') + '"]').addClass(s.params.slideDuplicatePrevClass);
                }
            }
        
            // Pagination
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                // Current/Total
                var current,
                    total = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                if (s.params.loop) {
                    current = Math.ceil((s.activeIndex - s.loopedSlides)/s.params.slidesPerGroup);
                    if (current > s.slides.length - 1 - s.loopedSlides * 2) {
                        current = current - (s.slides.length - s.loopedSlides * 2);
                    }
                    if (current > total - 1) current = current - total;
                    if (current < 0 && s.params.paginationType !== 'bullets') current = total + current;
                }
                else {
                    if (typeof s.snapIndex !== 'undefined') {
                        current = s.snapIndex;
                    }
                    else {
                        current = s.activeIndex || 0;
                    }
                }
                // Types
                if (s.params.paginationType === 'bullets' && s.bullets && s.bullets.length > 0) {
                    s.bullets.removeClass(s.params.bulletActiveClass);
                    if (s.paginationContainer.length > 1) {
                        s.bullets.each(function () {
                            if ($(this).index() === current) $(this).addClass(s.params.bulletActiveClass);
                        });
                    }
                    else {
                        s.bullets.eq(current).addClass(s.params.bulletActiveClass);
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    s.paginationContainer.find('.' + s.params.paginationCurrentClass).text(current + 1);
                    s.paginationContainer.find('.' + s.params.paginationTotalClass).text(total);
                }
                if (s.params.paginationType === 'progress') {
                    var scale = (current + 1) / total,
                        scaleX = scale,
                        scaleY = 1;
                    if (!s.isHorizontal()) {
                        scaleY = scale;
                        scaleX = 1;
                    }
                    s.paginationContainer.find('.' + s.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + scaleX + ') scaleY(' + scaleY + ')').transition(s.params.speed);
                }
                if (s.params.paginationType === 'custom' && s.params.paginationCustomRender) {
                    s.paginationContainer.html(s.params.paginationCustomRender(s, current + 1, total));
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        
            // Next/active buttons
            if (!s.params.loop) {
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    if (s.isBeginning) {
                        s.prevButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.prevButton);
                    }
                    else {
                        s.prevButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.prevButton);
                    }
                }
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    if (s.isEnd) {
                        s.nextButton.addClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.disable(s.nextButton);
                    }
                    else {
                        s.nextButton.removeClass(s.params.buttonDisabledClass);
                        if (s.params.a11y && s.a11y) s.a11y.enable(s.nextButton);
                    }
                }
            }
        };
        
        /*=========================
          Pagination
          ===========================*/
        s.updatePagination = function () {
            if (!s.params.pagination) return;
            if (s.paginationContainer && s.paginationContainer.length > 0) {
                var paginationHTML = '';
                if (s.params.paginationType === 'bullets') {
                    var numberOfBullets = s.params.loop ? Math.ceil((s.slides.length - s.loopedSlides * 2) / s.params.slidesPerGroup) : s.snapGrid.length;
                    for (var i = 0; i < numberOfBullets; i++) {
                        if (s.params.paginationBulletRender) {
                            paginationHTML += s.params.paginationBulletRender(s, i, s.params.bulletClass);
                        }
                        else {
                            paginationHTML += '<' + s.params.paginationElement+' class="' + s.params.bulletClass + '"></' + s.params.paginationElement + '>';
                        }
                    }
                    s.paginationContainer.html(paginationHTML);
                    s.bullets = s.paginationContainer.find('.' + s.params.bulletClass);
                    if (s.params.paginationClickable && s.params.a11y && s.a11y) {
                        s.a11y.initPagination();
                    }
                }
                if (s.params.paginationType === 'fraction') {
                    if (s.params.paginationFractionRender) {
                        paginationHTML = s.params.paginationFractionRender(s, s.params.paginationCurrentClass, s.params.paginationTotalClass);
                    }
                    else {
                        paginationHTML =
                            '<span class="' + s.params.paginationCurrentClass + '"></span>' +
                            ' / ' +
                            '<span class="' + s.params.paginationTotalClass+'"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType === 'progress') {
                    if (s.params.paginationProgressRender) {
                        paginationHTML = s.params.paginationProgressRender(s, s.params.paginationProgressbarClass);
                    }
                    else {
                        paginationHTML = '<span class="' + s.params.paginationProgressbarClass + '"></span>';
                    }
                    s.paginationContainer.html(paginationHTML);
                }
                if (s.params.paginationType !== 'custom') {
                    s.emit('onPaginationRendered', s, s.paginationContainer[0]);
                }
            }
        };
        /*=========================
          Common update method
          ===========================*/
        s.update = function (updateTranslate) {
            if (!s) return;
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updateProgress();
            s.updatePagination();
            s.updateClasses();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated, newTranslate;
                if (s.controller && s.controller.spline) {
                    s.controller.spline = undefined;
                }
                if (s.params.freeMode) {
                    forceSetTranslate();
                    if (s.params.autoHeight) {
                        s.updateAutoHeight();
                    }
                }
                else {
                    if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                        translated = s.slideTo(s.slides.length - 1, 0, false, true);
                    }
                    else {
                        translated = s.slideTo(s.activeIndex, 0, false, true);
                    }
                    if (!translated) {
                        forceSetTranslate();
                    }
                }
            }
            else if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
        };
        
        /*=========================
          Resize Handler
          ===========================*/
        s.onResize = function (forceUpdatePagination) {
            //Breakpoints
            if (s.params.breakpoints) {
                s.setBreakpoint();
            }
        
            // Disable locks on resize
            var allowSwipeToPrev = s.params.allowSwipeToPrev;
            var allowSwipeToNext = s.params.allowSwipeToNext;
            s.params.allowSwipeToPrev = s.params.allowSwipeToNext = true;
        
            s.updateContainerSize();
            s.updateSlidesSize();
            if (s.params.slidesPerView === 'auto' || s.params.freeMode || forceUpdatePagination) s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
            }
            if (s.controller && s.controller.spline) {
                s.controller.spline = undefined;
            }
            var slideChangedBySlideTo = false;
            if (s.params.freeMode) {
                var newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
        
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
            }
            else {
                s.updateClasses();
                if ((s.params.slidesPerView === 'auto' || s.params.slidesPerView > 1) && s.isEnd && !s.params.centeredSlides) {
                    slideChangedBySlideTo = s.slideTo(s.slides.length - 1, 0, false, true);
                }
                else {
                    slideChangedBySlideTo = s.slideTo(s.activeIndex, 0, false, true);
                }
            }
            if (s.params.lazyLoading && !slideChangedBySlideTo && s.lazy) {
                s.lazy.load();
            }
            // Return locks after resize
            s.params.allowSwipeToPrev = allowSwipeToPrev;
            s.params.allowSwipeToNext = allowSwipeToNext;
        };
        
        /*=========================
          Events
          ===========================*/
        
        //Define Touch Events
        s.touchEventsDesktop = {start: 'mousedown', move: 'mousemove', end: 'mouseup'};
        if (window.navigator.pointerEnabled) s.touchEventsDesktop = {start: 'pointerdown', move: 'pointermove', end: 'pointerup'};
        else if (window.navigator.msPointerEnabled) s.touchEventsDesktop = {start: 'MSPointerDown', move: 'MSPointerMove', end: 'MSPointerUp'};
        s.touchEvents = {
            start : s.support.touch || !s.params.simulateTouch  ? 'touchstart' : s.touchEventsDesktop.start,
            move : s.support.touch || !s.params.simulateTouch ? 'touchmove' : s.touchEventsDesktop.move,
            end : s.support.touch || !s.params.simulateTouch ? 'touchend' : s.touchEventsDesktop.end
        };
        
        
        // WP8 Touch Events Fix
        if (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) {
            (s.params.touchEventsTarget === 'container' ? s.container : s.wrapper).addClass('swiper-wp8-' + s.params.direction);
        }
        
        // Attach/detach events
        s.initEvents = function (detach) {
            var actionDom = detach ? 'off' : 'on';
            var action = detach ? 'removeEventListener' : 'addEventListener';
            var touchEventsTarget = s.params.touchEventsTarget === 'container' ? s.container[0] : s.wrapper[0];
            var target = s.support.touch ? touchEventsTarget : document;
        
            var moveCapture = s.params.nested ? true : false;
        
            //Touch Events
            if (s.browser.ie) {
                touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, false);
                target[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                target[action](s.touchEvents.end, s.onTouchEnd, false);
            }
            else {
                if (s.support.touch) {
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    touchEventsTarget[action](s.touchEvents.start, s.onTouchStart, passiveListener);
                    touchEventsTarget[action](s.touchEvents.move, s.onTouchMove, moveCapture);
                    touchEventsTarget[action](s.touchEvents.end, s.onTouchEnd, passiveListener);
                }
                if ((params.simulateTouch && !s.device.ios && !s.device.android) || (params.simulateTouch && !s.support.touch && s.device.ios)) {
                    touchEventsTarget[action]('mousedown', s.onTouchStart, false);
                    document[action]('mousemove', s.onTouchMove, moveCapture);
                    document[action]('mouseup', s.onTouchEnd, false);
                }
            }
            window[action]('resize', s.onResize);
        
            // Next, Prev, Index
            if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                s.nextButton[actionDom]('click', s.onClickNext);
                if (s.params.a11y && s.a11y) s.nextButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                s.prevButton[actionDom]('click', s.onClickPrev);
                if (s.params.a11y && s.a11y) s.prevButton[actionDom]('keydown', s.a11y.onEnterKey);
            }
            if (s.params.pagination && s.params.paginationClickable) {
                s.paginationContainer[actionDom]('click', '.' + s.params.bulletClass, s.onClickIndex);
                if (s.params.a11y && s.a11y) s.paginationContainer[actionDom]('keydown', '.' + s.params.bulletClass, s.a11y.onEnterKey);
            }
        
            // Prevent Links Clicks
            if (s.params.preventClicks || s.params.preventClicksPropagation) touchEventsTarget[action]('click', s.preventClicks, true);
        };
        s.attachEvents = function () {
            s.initEvents();
        };
        s.detachEvents = function () {
            s.initEvents(true);
        };
        
        /*=========================
          Handle Clicks
          ===========================*/
        // Prevent Clicks
        s.allowClick = true;
        s.preventClicks = function (e) {
            if (!s.allowClick) {
                if (s.params.preventClicks) e.preventDefault();
                if (s.params.preventClicksPropagation && s.animating) {
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                }
            }
        };
        // Clicks
        s.onClickNext = function (e) {
            e.preventDefault();
            if (s.isEnd && !s.params.loop) return;
            s.slideNext();
        };
        s.onClickPrev = function (e) {
            e.preventDefault();
            if (s.isBeginning && !s.params.loop) return;
            s.slidePrev();
        };
        s.onClickIndex = function (e) {
            e.preventDefault();
            var index = $(this).index() * s.params.slidesPerGroup;
            if (s.params.loop) index = index + s.loopedSlides;
            s.slideTo(index);
        };
        
        /*=========================
          Handle Touches
          ===========================*/
        function findElementInEvent(e, selector) {
            var el = $(e.target);
            if (!el.is(selector)) {
                if (typeof selector === 'string') {
                    el = el.parents(selector);
                }
                else if (selector.nodeType) {
                    var found;
                    el.parents().each(function (index, _el) {
                        if (_el === selector) found = selector;
                    });
                    if (!found) return undefined;
                    else return selector;
                }
            }
            if (el.length === 0) {
                return undefined;
            }
            return el[0];
        }
        s.updateClickedSlide = function (e) {
            var slide = findElementInEvent(e, '.' + s.params.slideClass);
            var slideFound = false;
            if (slide) {
                for (var i = 0; i < s.slides.length; i++) {
                    if (s.slides[i] === slide) slideFound = true;
                }
            }
        
            if (slide && slideFound) {
                s.clickedSlide = slide;
                s.clickedIndex = $(slide).index();
            }
            else {
                s.clickedSlide = undefined;
                s.clickedIndex = undefined;
                return;
            }
            if (s.params.slideToClickedSlide && s.clickedIndex !== undefined && s.clickedIndex !== s.activeIndex) {
                var slideToIndex = s.clickedIndex,
                    realIndex,
                    duplicatedSlides,
                    slidesPerView = s.params.slidesPerView === 'auto' ? s.currentSlidesPerView() : s.params.slidesPerView;
                if (s.params.loop) {
                    if (s.animating) return;
                    realIndex = parseInt($(s.clickedSlide).attr('data-swiper-slide-index'), 10);
                    if (s.params.centeredSlides) {
                        if ((slideToIndex < s.loopedSlides - slidesPerView/2) || (slideToIndex > s.slides.length - s.loopedSlides + slidesPerView/2)) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                    else {
                        if (slideToIndex > s.slides.length - slidesPerView) {
                            s.fixLoop();
                            slideToIndex = s.wrapper.children('.' + s.params.slideClass + '[data-swiper-slide-index="' + realIndex + '"]:not(.' + s.params.slideDuplicateClass + ')').eq(0).index();
                            setTimeout(function () {
                                s.slideTo(slideToIndex);
                            }, 0);
                        }
                        else {
                            s.slideTo(slideToIndex);
                        }
                    }
                }
                else {
                    s.slideTo(slideToIndex);
                }
            }
        };
        
        var isTouched,
            isMoved,
            allowTouchCallbacks,
            touchStartTime,
            isScrolling,
            currentTranslate,
            startTranslate,
            allowThresholdMove,
            // Form elements to match
            formElements = 'input, select, textarea, button, video',
            // Last click time
            lastClickTime = Date.now(), clickTimeout,
            //Velocities
            velocities = [],
            allowMomentumBounce;
        
        // Animating Flag
        s.animating = false;
        
        // Touches information
        s.touches = {
            startX: 0,
            startY: 0,
            currentX: 0,
            currentY: 0,
            diff: 0
        };
        
        // Touch handlers
        var isTouchEvent, startMoving;
        s.onTouchStart = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            isTouchEvent = e.type === 'touchstart';
            if (!isTouchEvent && 'which' in e && e.which === 3) return;
            if (s.params.noSwiping && findElementInEvent(e, '.' + s.params.noSwipingClass)) {
                s.allowClick = true;
                return;
            }
            if (s.params.swipeHandler) {
                if (!findElementInEvent(e, s.params.swipeHandler)) return;
            }
        
            var startX = s.touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
            var startY = s.touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
        
            // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore
            if(s.device.ios && s.params.iOSEdgeSwipeDetection && startX <= s.params.iOSEdgeSwipeThreshold) {
                return;
            }
        
            isTouched = true;
            isMoved = false;
            allowTouchCallbacks = true;
            isScrolling = undefined;
            startMoving = undefined;
            s.touches.startX = startX;
            s.touches.startY = startY;
            touchStartTime = Date.now();
            s.allowClick = true;
            s.updateContainerSize();
            s.swipeDirection = undefined;
            if (s.params.threshold > 0) allowThresholdMove = false;
            if (e.type !== 'touchstart') {
                var preventDefault = true;
                if ($(e.target).is(formElements)) preventDefault = false;
                if (document.activeElement && $(document.activeElement).is(formElements)) {
                    document.activeElement.blur();
                }
                if (preventDefault) {
                    e.preventDefault();
                }
            }
            s.emit('onTouchStart', s, e);
        };
        
        s.onTouchMove = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (isTouchEvent && e.type === 'mousemove') return;
            if (e.preventedByNestedSwiper) {
                s.touches.startX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                s.touches.startY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                return;
            }
            if (s.params.onlyExternal) {
                // isMoved = true;
                s.allowClick = false;
                if (isTouched) {
                    s.touches.startX = s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                    s.touches.startY = s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
                    touchStartTime = Date.now();
                }
                return;
            }
            if (isTouchEvent && s.params.touchReleaseOnEdges && !s.params.loop) {
                if (!s.isHorizontal()) {
                    // Vertical
                    if (
                        (s.touches.currentY < s.touches.startY && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentY > s.touches.startY && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
                else {
                    if (
                        (s.touches.currentX < s.touches.startX && s.translate <= s.maxTranslate()) ||
                        (s.touches.currentX > s.touches.startX && s.translate >= s.minTranslate())
                        ) {
                        return;
                    }
                }
            }
            if (isTouchEvent && document.activeElement) {
                if (e.target === document.activeElement && $(e.target).is(formElements)) {
                    isMoved = true;
                    s.allowClick = false;
                    return;
                }
            }
            if (allowTouchCallbacks) {
                s.emit('onTouchMove', s, e);
            }
            if (e.targetTouches && e.targetTouches.length > 1) return;
        
            s.touches.currentX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
            s.touches.currentY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
            if (typeof isScrolling === 'undefined') {
                var touchAngle;
                if (s.isHorizontal() && s.touches.currentY === s.touches.startY || !s.isHorizontal() && s.touches.currentX === s.touches.startX) {
                    isScrolling = false;
                }
                else {
                    touchAngle = Math.atan2(Math.abs(s.touches.currentY - s.touches.startY), Math.abs(s.touches.currentX - s.touches.startX)) * 180 / Math.PI;
                    isScrolling = s.isHorizontal() ? touchAngle > s.params.touchAngle : (90 - touchAngle > s.params.touchAngle);
                }
            }
            if (isScrolling) {
                s.emit('onTouchMoveOpposite', s, e);
            }
            if (typeof startMoving === 'undefined' && s.browser.ieTouch) {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving && s.browser.ieTouch) {
                return;
            }
            s.allowClick = false;
            s.emit('onSliderMove', s, e);
            e.preventDefault();
            if (s.params.touchMoveStopPropagation && !s.params.nested) {
                e.stopPropagation();
            }
        
            if (!isMoved) {
                if (params.loop) {
                    s.fixLoop();
                }
                startTranslate = s.getWrapperTranslate();
                s.setWrapperTransition(0);
                if (s.animating) {
                    s.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd');
                }
                if (s.params.autoplay && s.autoplaying) {
                    if (s.params.autoplayDisableOnInteraction) {
                        s.stopAutoplay();
                    }
                    else {
                        s.pauseAutoplay();
                    }
                }
                allowMomentumBounce = false;
                //Grab Cursor
                if (s.params.grabCursor && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                    s.setGrabCursor(true);
                }
            }
            isMoved = true;
        
            var diff = s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
        
            diff = diff * s.params.touchRatio;
            if (s.rtl) diff = -diff;
        
            s.swipeDirection = diff > 0 ? 'prev' : 'next';
            currentTranslate = diff + startTranslate;
        
            var disableParentSwiper = true;
            if ((diff > 0 && currentTranslate > s.minTranslate())) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.minTranslate() - 1 + Math.pow(-s.minTranslate() + startTranslate + diff, s.params.resistanceRatio);
            }
            else if (diff < 0 && currentTranslate < s.maxTranslate()) {
                disableParentSwiper = false;
                if (s.params.resistance) currentTranslate = s.maxTranslate() + 1 - Math.pow(s.maxTranslate() - startTranslate - diff, s.params.resistanceRatio);
            }
        
            if (disableParentSwiper) {
                e.preventedByNestedSwiper = true;
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && s.swipeDirection === 'next' && currentTranslate < startTranslate) {
                currentTranslate = startTranslate;
            }
            if (!s.params.allowSwipeToPrev && s.swipeDirection === 'prev' && currentTranslate > startTranslate) {
                currentTranslate = startTranslate;
            }
        
        
            // Threshold
            if (s.params.threshold > 0) {
                if (Math.abs(diff) > s.params.threshold || allowThresholdMove) {
                    if (!allowThresholdMove) {
                        allowThresholdMove = true;
                        s.touches.startX = s.touches.currentX;
                        s.touches.startY = s.touches.currentY;
                        currentTranslate = startTranslate;
                        s.touches.diff = s.isHorizontal() ? s.touches.currentX - s.touches.startX : s.touches.currentY - s.touches.startY;
                        return;
                    }
                }
                else {
                    currentTranslate = startTranslate;
                    return;
                }
            }
        
            if (!s.params.followFinger) return;
        
            // Update active index in free mode
            if (s.params.freeMode || s.params.watchSlidesProgress) {
                s.updateActiveIndex();
            }
            if (s.params.freeMode) {
                //Velocity
                if (velocities.length === 0) {
                    velocities.push({
                        position: s.touches[s.isHorizontal() ? 'startX' : 'startY'],
                        time: touchStartTime
                    });
                }
                velocities.push({
                    position: s.touches[s.isHorizontal() ? 'currentX' : 'currentY'],
                    time: (new window.Date()).getTime()
                });
            }
            // Update progress
            s.updateProgress(currentTranslate);
            // Update translate
            s.setWrapperTranslate(currentTranslate);
        };
        s.onTouchEnd = function (e) {
            if (e.originalEvent) e = e.originalEvent;
            if (allowTouchCallbacks) {
                s.emit('onTouchEnd', s, e);
            }
            allowTouchCallbacks = false;
            if (!isTouched) return;
            //Return Grab Cursor
            if (s.params.grabCursor && isMoved && isTouched  && (s.params.allowSwipeToNext === true || s.params.allowSwipeToPrev === true)) {
                s.setGrabCursor(false);
            }
        
            // Time diff
            var touchEndTime = Date.now();
            var timeDiff = touchEndTime - touchStartTime;
        
            // Tap, doubleTap, Click
            if (s.allowClick) {
                s.updateClickedSlide(e);
                s.emit('onTap', s, e);
                if (timeDiff < 300 && (touchEndTime - lastClickTime) > 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    clickTimeout = setTimeout(function () {
                        if (!s) return;
                        if (s.params.paginationHide && s.paginationContainer.length > 0 && !$(e.target).hasClass(s.params.bulletClass)) {
                            s.paginationContainer.toggleClass(s.params.paginationHiddenClass);
                        }
                        s.emit('onClick', s, e);
                    }, 300);
        
                }
                if (timeDiff < 300 && (touchEndTime - lastClickTime) < 300) {
                    if (clickTimeout) clearTimeout(clickTimeout);
                    s.emit('onDoubleTap', s, e);
                }
            }
        
            lastClickTime = Date.now();
            setTimeout(function () {
                if (s) s.allowClick = true;
            }, 0);
        
            if (!isTouched || !isMoved || !s.swipeDirection || s.touches.diff === 0 || currentTranslate === startTranslate) {
                isTouched = isMoved = false;
                return;
            }
            isTouched = isMoved = false;
        
            var currentPos;
            if (s.params.followFinger) {
                currentPos = s.rtl ? s.translate : -s.translate;
            }
            else {
                currentPos = -currentTranslate;
            }
            if (s.params.freeMode) {
                if (currentPos < -s.minTranslate()) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                else if (currentPos > -s.maxTranslate()) {
                    if (s.slides.length < s.snapGrid.length) {
                        s.slideTo(s.snapGrid.length - 1);
                    }
                    else {
                        s.slideTo(s.slides.length - 1);
                    }
                    return;
                }
        
                if (s.params.freeModeMomentum) {
                    if (velocities.length > 1) {
                        var lastMoveEvent = velocities.pop(), velocityEvent = velocities.pop();
        
                        var distance = lastMoveEvent.position - velocityEvent.position;
                        var time = lastMoveEvent.time - velocityEvent.time;
                        s.velocity = distance / time;
                        s.velocity = s.velocity / 2;
                        if (Math.abs(s.velocity) < s.params.freeModeMinimumVelocity) {
                            s.velocity = 0;
                        }
                        // this implies that the user stopped moving a finger then released.
                        // There would be no events with distance zero, so the last event is stale.
                        if (time > 150 || (new window.Date().getTime() - lastMoveEvent.time) > 300) {
                            s.velocity = 0;
                        }
                    } else {
                        s.velocity = 0;
                    }
                    s.velocity = s.velocity * s.params.freeModeMomentumVelocityRatio;
        
                    velocities.length = 0;
                    var momentumDuration = 1000 * s.params.freeModeMomentumRatio;
                    var momentumDistance = s.velocity * momentumDuration;
        
                    var newPosition = s.translate + momentumDistance;
                    if (s.rtl) newPosition = - newPosition;
                    var doBounce = false;
                    var afterBouncePosition;
                    var bounceAmount = Math.abs(s.velocity) * 20 * s.params.freeModeMomentumBounceRatio;
                    if (newPosition < s.maxTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition + s.maxTranslate() < -bounceAmount) {
                                newPosition = s.maxTranslate() - bounceAmount;
                            }
                            afterBouncePosition = s.maxTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.maxTranslate();
                        }
                    }
                    else if (newPosition > s.minTranslate()) {
                        if (s.params.freeModeMomentumBounce) {
                            if (newPosition - s.minTranslate() > bounceAmount) {
                                newPosition = s.minTranslate() + bounceAmount;
                            }
                            afterBouncePosition = s.minTranslate();
                            doBounce = true;
                            allowMomentumBounce = true;
                        }
                        else {
                            newPosition = s.minTranslate();
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        var j = 0,
                            nextSlide;
                        for (j = 0; j < s.snapGrid.length; j += 1) {
                            if (s.snapGrid[j] > -newPosition) {
                                nextSlide = j;
                                break;
                            }
        
                        }
                        if (Math.abs(s.snapGrid[nextSlide] - newPosition) < Math.abs(s.snapGrid[nextSlide - 1] - newPosition) || s.swipeDirection === 'next') {
                            newPosition = s.snapGrid[nextSlide];
                        } else {
                            newPosition = s.snapGrid[nextSlide - 1];
                        }
                        if (!s.rtl) newPosition = - newPosition;
                    }
                    //Fix duration
                    if (s.velocity !== 0) {
                        if (s.rtl) {
                            momentumDuration = Math.abs((-newPosition - s.translate) / s.velocity);
                        }
                        else {
                            momentumDuration = Math.abs((newPosition - s.translate) / s.velocity);
                        }
                    }
                    else if (s.params.freeModeSticky) {
                        s.slideReset();
                        return;
                    }
        
                    if (s.params.freeModeMomentumBounce && doBounce) {
                        s.updateProgress(afterBouncePosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        s.animating = true;
                        s.wrapper.transitionEnd(function () {
                            if (!s || !allowMomentumBounce) return;
                            s.emit('onMomentumBounce', s);
        
                            s.setWrapperTransition(s.params.speed);
                            s.setWrapperTranslate(afterBouncePosition);
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        });
                    } else if (s.velocity) {
                        s.updateProgress(newPosition);
                        s.setWrapperTransition(momentumDuration);
                        s.setWrapperTranslate(newPosition);
                        s.onTransitionStart();
                        if (!s.animating) {
                            s.animating = true;
                            s.wrapper.transitionEnd(function () {
                                if (!s) return;
                                s.onTransitionEnd();
                            });
                        }
        
                    } else {
                        s.updateProgress(newPosition);
                    }
        
                    s.updateActiveIndex();
                }
                if (!s.params.freeModeMomentum || timeDiff >= s.params.longSwipesMs) {
                    s.updateProgress();
                    s.updateActiveIndex();
                }
                return;
            }
        
            // Find current slide
            var i, stopIndex = 0, groupSize = s.slidesSizesGrid[0];
            for (i = 0; i < s.slidesGrid.length; i += s.params.slidesPerGroup) {
                if (typeof s.slidesGrid[i + s.params.slidesPerGroup] !== 'undefined') {
                    if (currentPos >= s.slidesGrid[i] && currentPos < s.slidesGrid[i + s.params.slidesPerGroup]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[i + s.params.slidesPerGroup] - s.slidesGrid[i];
                    }
                }
                else {
                    if (currentPos >= s.slidesGrid[i]) {
                        stopIndex = i;
                        groupSize = s.slidesGrid[s.slidesGrid.length - 1] - s.slidesGrid[s.slidesGrid.length - 2];
                    }
                }
            }
        
            // Find current slide size
            var ratio = (currentPos - s.slidesGrid[stopIndex]) / groupSize;
        
            if (timeDiff > s.params.longSwipesMs) {
                // Long touches
                if (!s.params.longSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    if (ratio >= s.params.longSwipesRatio) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
        
                }
                if (s.swipeDirection === 'prev') {
                    if (ratio > (1 - s.params.longSwipesRatio)) s.slideTo(stopIndex + s.params.slidesPerGroup);
                    else s.slideTo(stopIndex);
                }
            }
            else {
                // Short swipes
                if (!s.params.shortSwipes) {
                    s.slideTo(s.activeIndex);
                    return;
                }
                if (s.swipeDirection === 'next') {
                    s.slideTo(stopIndex + s.params.slidesPerGroup);
        
                }
                if (s.swipeDirection === 'prev') {
                    s.slideTo(stopIndex);
                }
            }
        };
        /*=========================
          Transitions
          ===========================*/
        s._slideTo = function (slideIndex, speed) {
            return s.slideTo(slideIndex, speed, true, true);
        };
        s.slideTo = function (slideIndex, speed, runCallbacks, internal) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (typeof slideIndex === 'undefined') slideIndex = 0;
            if (slideIndex < 0) slideIndex = 0;
            s.snapIndex = Math.floor(slideIndex / s.params.slidesPerGroup);
            if (s.snapIndex >= s.snapGrid.length) s.snapIndex = s.snapGrid.length - 1;
        
            var translate = - s.snapGrid[s.snapIndex];
            // Stop autoplay
            if (s.params.autoplay && s.autoplaying) {
                if (internal || !s.params.autoplayDisableOnInteraction) {
                    s.pauseAutoplay(speed);
                }
                else {
                    s.stopAutoplay();
                }
            }
            // Update progress
            s.updateProgress(translate);
        
            // Normalize slideIndex
            if(s.params.normalizeSlideIndex){
                for (var i = 0; i < s.slidesGrid.length; i++) {
                    if (- Math.floor(translate * 100) >= Math.floor(s.slidesGrid[i] * 100)) {
                        slideIndex = i;
                    }
                }
            }
        
            // Directions locks
            if (!s.params.allowSwipeToNext && translate < s.translate && translate < s.minTranslate()) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && translate > s.translate && translate > s.maxTranslate()) {
                if ((s.activeIndex || 0) !== slideIndex ) return false;
            }
        
            // Update Index
            if (typeof speed === 'undefined') speed = s.params.speed;
            s.previousIndex = s.activeIndex || 0;
            s.activeIndex = slideIndex;
            s.updateRealIndex();
            if ((s.rtl && -translate === s.translate) || (!s.rtl && translate === s.translate)) {
                // Update Height
                if (s.params.autoHeight) {
                    s.updateAutoHeight();
                }
                s.updateClasses();
                if (s.params.effect !== 'slide') {
                    s.setWrapperTranslate(translate);
                }
                return false;
            }
            s.updateClasses();
            s.onTransitionStart(runCallbacks);
        
            if (speed === 0 || s.browser.lteIE9) {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(0);
                s.onTransitionEnd(runCallbacks);
            }
            else {
                s.setWrapperTranslate(translate);
                s.setWrapperTransition(speed);
                if (!s.animating) {
                    s.animating = true;
                    s.wrapper.transitionEnd(function () {
                        if (!s) return;
                        s.onTransitionEnd(runCallbacks);
                    });
                }
        
            }
        
            return true;
        };
        
        s.onTransitionStart = function (runCallbacks) {
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.params.autoHeight) {
                s.updateAutoHeight();
            }
            if (s.lazy) s.lazy.onTransitionStart();
            if (runCallbacks) {
                s.emit('onTransitionStart', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeStart', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextStart', s);
                    }
                    else {
                        s.emit('onSlidePrevStart', s);
                    }
                }
        
            }
        };
        s.onTransitionEnd = function (runCallbacks) {
            s.animating = false;
            s.setWrapperTransition(0);
            if (typeof runCallbacks === 'undefined') runCallbacks = true;
            if (s.lazy) s.lazy.onTransitionEnd();
            if (runCallbacks) {
                s.emit('onTransitionEnd', s);
                if (s.activeIndex !== s.previousIndex) {
                    s.emit('onSlideChangeEnd', s);
                    if (s.activeIndex > s.previousIndex) {
                        s.emit('onSlideNextEnd', s);
                    }
                    else {
                        s.emit('onSlidePrevEnd', s);
                    }
                }
            }
            if (s.params.history && s.history) {
                s.history.setHistory(s.params.history, s.activeIndex);
            }
            if (s.params.hashnav && s.hashnav) {
                s.hashnav.setHash();
            }
        
        };
        s.slideNext = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex + s.params.slidesPerGroup, speed, runCallbacks, internal);
        };
        s._slideNext = function (speed) {
            return s.slideNext(true, speed, true);
        };
        s.slidePrev = function (runCallbacks, speed, internal) {
            if (s.params.loop) {
                if (s.animating) return false;
                s.fixLoop();
                var clientLeft = s.container[0].clientLeft;
                return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
            }
            else return s.slideTo(s.activeIndex - 1, speed, runCallbacks, internal);
        };
        s._slidePrev = function (speed) {
            return s.slidePrev(true, speed, true);
        };
        s.slideReset = function (runCallbacks, speed, internal) {
            return s.slideTo(s.activeIndex, speed, runCallbacks);
        };
        
        s.disableTouchControl = function () {
            s.params.onlyExternal = true;
            return true;
        };
        s.enableTouchControl = function () {
            s.params.onlyExternal = false;
            return true;
        };
        
        /*=========================
          Translate/transition helpers
          ===========================*/
        s.setWrapperTransition = function (duration, byController) {
            s.wrapper.transition(duration);
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTransition(duration);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTransition(duration);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTransition(duration);
            }
            if (s.params.control && s.controller) {
                s.controller.setTransition(duration, byController);
            }
            s.emit('onSetTransition', s, duration);
        };
        s.setWrapperTranslate = function (translate, updateActiveIndex, byController) {
            var x = 0, y = 0, z = 0;
            if (s.isHorizontal()) {
                x = s.rtl ? -translate : translate;
            }
            else {
                y = translate;
            }
        
            if (s.params.roundLengths) {
                x = round(x);
                y = round(y);
            }
        
            if (!s.params.virtualTranslate) {
                if (s.support.transforms3d) s.wrapper.transform('translate3d(' + x + 'px, ' + y + 'px, ' + z + 'px)');
                else s.wrapper.transform('translate(' + x + 'px, ' + y + 'px)');
            }
        
            s.translate = s.isHorizontal() ? x : y;
        
            // Check if we need to update progress
            var progress;
            var translatesDiff = s.maxTranslate() - s.minTranslate();
            if (translatesDiff === 0) {
                progress = 0;
            }
            else {
                progress = (translate - s.minTranslate()) / (translatesDiff);
            }
            if (progress !== s.progress) {
                s.updateProgress(translate);
            }
        
            if (updateActiveIndex) s.updateActiveIndex();
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                s.effects[s.params.effect].setTranslate(s.translate);
            }
            if (s.params.parallax && s.parallax) {
                s.parallax.setTranslate(s.translate);
            }
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.setTranslate(s.translate);
            }
            if (s.params.control && s.controller) {
                s.controller.setTranslate(s.translate, byController);
            }
            s.emit('onSetTranslate', s, s.translate);
        };
        
        s.getTranslate = function (el, axis) {
            var matrix, curTransform, curStyle, transformMatrix;
        
            // automatic axis detection
            if (typeof axis === 'undefined') {
                axis = 'x';
            }
        
            if (s.params.virtualTranslate) {
                return s.rtl ? -s.translate : s.translate;
            }
        
            curStyle = window.getComputedStyle(el, null);
            if (window.WebKitCSSMatrix) {
                curTransform = curStyle.transform || curStyle.webkitTransform;
                if (curTransform.split(',').length > 6) {
                    curTransform = curTransform.split(', ').map(function(a){
                        return a.replace(',','.');
                    }).join(', ');
                }
                // Some old versions of Webkit choke when 'none' is passed; pass
                // empty string instead in this case
                transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
            }
            else {
                transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
                matrix = transformMatrix.toString().split(',');
            }
        
            if (axis === 'x') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m41;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[12]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[4]);
            }
            if (axis === 'y') {
                //Latest Chrome and webkits Fix
                if (window.WebKitCSSMatrix)
                    curTransform = transformMatrix.m42;
                //Crazy IE10 Matrix
                else if (matrix.length === 16)
                    curTransform = parseFloat(matrix[13]);
                //Normal Browsers
                else
                    curTransform = parseFloat(matrix[5]);
            }
            if (s.rtl && curTransform) curTransform = -curTransform;
            return curTransform || 0;
        };
        s.getWrapperTranslate = function (axis) {
            if (typeof axis === 'undefined') {
                axis = s.isHorizontal() ? 'x' : 'y';
            }
            return s.getTranslate(s.wrapper[0], axis);
        };
        
        /*=========================
          Observer
          ===========================*/
        s.observers = [];
        function initObserver(target, options) {
            options = options || {};
            // create an observer instance
            var ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
            var observer = new ObserverFunc(function (mutations) {
                mutations.forEach(function (mutation) {
                    s.onResize(true);
                    s.emit('onObserverUpdate', s, mutation);
                });
            });
        
            observer.observe(target, {
                attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
                childList: typeof options.childList === 'undefined' ? true : options.childList,
                characterData: typeof options.characterData === 'undefined' ? true : options.characterData
            });
        
            s.observers.push(observer);
        }
        s.initObservers = function () {
            if (s.params.observeParents) {
                var containerParents = s.container.parents();
                for (var i = 0; i < containerParents.length; i++) {
                    initObserver(containerParents[i]);
                }
            }
        
            // Observe container
            initObserver(s.container[0], {childList: false});
        
            // Observe wrapper
            initObserver(s.wrapper[0], {attributes: false});
        };
        s.disconnectObservers = function () {
            for (var i = 0; i < s.observers.length; i++) {
                s.observers[i].disconnect();
            }
            s.observers = [];
        };
        /*=========================
          Loop
          ===========================*/
        // Create looped slides
        s.createLoop = function () {
            // Remove duplicated slides
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
        
            var slides = s.wrapper.children('.' + s.params.slideClass);
        
            if(s.params.slidesPerView === 'auto' && !s.params.loopedSlides) s.params.loopedSlides = slides.length;
        
            s.loopedSlides = parseInt(s.params.loopedSlides || s.params.slidesPerView, 10);
            s.loopedSlides = s.loopedSlides + s.params.loopAdditionalSlides;
            if (s.loopedSlides > slides.length) {
                s.loopedSlides = slides.length;
            }
        
            var prependSlides = [], appendSlides = [], i;
            slides.each(function (index, el) {
                var slide = $(this);
                if (index < s.loopedSlides) appendSlides.push(el);
                if (index < slides.length && index >= slides.length - s.loopedSlides) prependSlides.push(el);
                slide.attr('data-swiper-slide-index', index);
            });
            for (i = 0; i < appendSlides.length; i++) {
                s.wrapper.append($(appendSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
            for (i = prependSlides.length - 1; i >= 0; i--) {
                s.wrapper.prepend($(prependSlides[i].cloneNode(true)).addClass(s.params.slideDuplicateClass));
            }
        };
        s.destroyLoop = function () {
            s.wrapper.children('.' + s.params.slideClass + '.' + s.params.slideDuplicateClass).remove();
            s.slides.removeAttr('data-swiper-slide-index');
        };
        s.reLoop = function (updatePosition) {
            var oldIndex = s.activeIndex - s.loopedSlides;
            s.destroyLoop();
            s.createLoop();
            s.updateSlidesSize();
            if (updatePosition) {
                s.slideTo(oldIndex + s.loopedSlides, 0, false);
            }
        
        };
        s.fixLoop = function () {
            var newIndex;
            //Fix For Negative Oversliding
            if (s.activeIndex < s.loopedSlides) {
                newIndex = s.slides.length - s.loopedSlides * 3 + s.activeIndex;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
            //Fix For Positive Oversliding
            else if ((s.params.slidesPerView === 'auto' && s.activeIndex >= s.loopedSlides * 2) || (s.activeIndex > s.slides.length - s.params.slidesPerView * 2)) {
                newIndex = -s.slides.length + s.activeIndex + s.loopedSlides;
                newIndex = newIndex + s.loopedSlides;
                s.slideTo(newIndex, 0, false, true);
            }
        };
        /*=========================
          Append/Prepend/Remove Slides
          ===========================*/
        s.appendSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.append(slides[i]);
                }
            }
            else {
                s.wrapper.append(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
        };
        s.prependSlide = function (slides) {
            if (s.params.loop) {
                s.destroyLoop();
            }
            var newActiveIndex = s.activeIndex + 1;
            if (typeof slides === 'object' && slides.length) {
                for (var i = 0; i < slides.length; i++) {
                    if (slides[i]) s.wrapper.prepend(slides[i]);
                }
                newActiveIndex = s.activeIndex + slides.length;
            }
            else {
                s.wrapper.prepend(slides);
            }
            if (s.params.loop) {
                s.createLoop();
            }
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            s.slideTo(newActiveIndex, 0, false);
        };
        s.removeSlide = function (slidesIndexes) {
            if (s.params.loop) {
                s.destroyLoop();
                s.slides = s.wrapper.children('.' + s.params.slideClass);
            }
            var newActiveIndex = s.activeIndex,
                indexToRemove;
            if (typeof slidesIndexes === 'object' && slidesIndexes.length) {
                for (var i = 0; i < slidesIndexes.length; i++) {
                    indexToRemove = slidesIndexes[i];
                    if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                    if (indexToRemove < newActiveIndex) newActiveIndex--;
                }
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
            else {
                indexToRemove = slidesIndexes;
                if (s.slides[indexToRemove]) s.slides.eq(indexToRemove).remove();
                if (indexToRemove < newActiveIndex) newActiveIndex--;
                newActiveIndex = Math.max(newActiveIndex, 0);
            }
        
            if (s.params.loop) {
                s.createLoop();
            }
        
            if (!(s.params.observer && s.support.observer)) {
                s.update(true);
            }
            if (s.params.loop) {
                s.slideTo(newActiveIndex + s.loopedSlides, 0, false);
            }
            else {
                s.slideTo(newActiveIndex, 0, false);
            }
        
        };
        s.removeAllSlides = function () {
            var slidesIndexes = [];
            for (var i = 0; i < s.slides.length; i++) {
                slidesIndexes.push(i);
            }
            s.removeSlide(slidesIndexes);
        };
        

        /*=========================
          Effects
          ===========================*/
        s.effects = {
            fade: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var offset = slide[0].swiperSlideOffset;
                        var tx = -offset;
                        if (!s.params.virtualTranslate) tx = tx - s.translate;
                        var ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
                        var slideOpacity = s.params.fade.crossFade ?
                                Math.max(1 - Math.abs(slide[0].progress), 0) :
                                1 + Math.min(Math.max(slide[0].progress, -1), 0);
                        slide
                            .css({
                                opacity: slideOpacity
                            })
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px)');
        
                    }
        
                },
                setTransition: function (duration) {
                    s.slides.transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            flip: {
                setTranslate: function () {
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var progress = slide[0].progress;
                        if (s.params.flip.limitRotation) {
                            progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        }
                        var offset = slide[0].swiperSlideOffset;
                        var rotate = -180 * progress,
                            rotateY = rotate,
                            rotateX = 0,
                            tx = -offset,
                            ty = 0;
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                            rotateX = -rotateY;
                            rotateY = 0;
                        }
                        else if (s.rtl) {
                            rotateY = -rotateY;
                        }
        
                        slide[0].style.zIndex = -Math.abs(Math.round(progress)) + s.slides.length;
        
                        if (s.params.flip.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
        
                        slide
                            .transform('translate3d(' + tx + 'px, ' + ty + 'px, 0px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)');
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.virtualTranslate && duration !== 0) {
                        var eventTriggered = false;
                        s.slides.eq(s.activeIndex).transitionEnd(function () {
                            if (eventTriggered) return;
                            if (!s) return;
                            if (!$(this).hasClass(s.params.slideActiveClass)) return;
                            eventTriggered = true;
                            s.animating = false;
                            var triggerEvents = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'];
                            for (var i = 0; i < triggerEvents.length; i++) {
                                s.wrapper.trigger(triggerEvents[i]);
                            }
                        });
                    }
                }
            },
            cube: {
                setTranslate: function () {
                    var wrapperRotate = 0, cubeShadow;
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow = s.wrapper.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.wrapper.append(cubeShadow);
                            }
                            cubeShadow.css({height: s.width + 'px'});
                        }
                        else {
                            cubeShadow = s.container.find('.swiper-cube-shadow');
                            if (cubeShadow.length === 0) {
                                cubeShadow = $('<div class="swiper-cube-shadow"></div>');
                                s.container.append(cubeShadow);
                            }
                        }
                    }
                    for (var i = 0; i < s.slides.length; i++) {
                        var slide = s.slides.eq(i);
                        var slideAngle = i * 90;
                        var round = Math.floor(slideAngle / 360);
                        if (s.rtl) {
                            slideAngle = -slideAngle;
                            round = Math.floor(-slideAngle / 360);
                        }
                        var progress = Math.max(Math.min(slide[0].progress, 1), -1);
                        var tx = 0, ty = 0, tz = 0;
                        if (i % 4 === 0) {
                            tx = - round * 4 * s.size;
                            tz = 0;
                        }
                        else if ((i - 1) % 4 === 0) {
                            tx = 0;
                            tz = - round * 4 * s.size;
                        }
                        else if ((i - 2) % 4 === 0) {
                            tx = s.size + round * 4 * s.size;
                            tz = s.size;
                        }
                        else if ((i - 3) % 4 === 0) {
                            tx = - s.size;
                            tz = 3 * s.size + s.size * 4 * round;
                        }
                        if (s.rtl) {
                            tx = -tx;
                        }
        
                        if (!s.isHorizontal()) {
                            ty = tx;
                            tx = 0;
                        }
        
                        var transform = 'rotateX(' + (s.isHorizontal() ? 0 : -slideAngle) + 'deg) rotateY(' + (s.isHorizontal() ? slideAngle : 0) + 'deg) translate3d(' + tx + 'px, ' + ty + 'px, ' + tz + 'px)';
                        if (progress <= 1 && progress > -1) {
                            wrapperRotate = i * 90 + progress * 90;
                            if (s.rtl) wrapperRotate = -i * 90 - progress * 90;
                        }
                        slide.transform(transform);
                        if (s.params.cube.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
                            if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
                        }
                    }
                    s.wrapper.css({
                        '-webkit-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-moz-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        '-ms-transform-origin': '50% 50% -' + (s.size / 2) + 'px',
                        'transform-origin': '50% 50% -' + (s.size / 2) + 'px'
                    });
        
                    if (s.params.cube.shadow) {
                        if (s.isHorizontal()) {
                            cubeShadow.transform('translate3d(0px, ' + (s.width / 2 + s.params.cube.shadowOffset) + 'px, ' + (-s.width / 2) + 'px) rotateX(90deg) rotateZ(0deg) scale(' + (s.params.cube.shadowScale) + ')');
                        }
                        else {
                            var shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
                            var multiplier = 1.5 - (Math.sin(shadowAngle * 2 * Math.PI / 360) / 2 + Math.cos(shadowAngle * 2 * Math.PI / 360) / 2);
                            var scale1 = s.params.cube.shadowScale,
                                scale2 = s.params.cube.shadowScale / multiplier,
                                offset = s.params.cube.shadowOffset;
                            cubeShadow.transform('scale3d(' + scale1 + ', 1, ' + scale2 + ') translate3d(0px, ' + (s.height / 2 + offset) + 'px, ' + (-s.height / 2 / scale2) + 'px) rotateX(-90deg)');
                        }
                    }
                    var zFactor = (s.isSafari || s.isUiWebView) ? (-s.size / 2) : 0;
                    s.wrapper.transform('translate3d(0px,0,' + zFactor + 'px) rotateX(' + (s.isHorizontal() ? 0 : wrapperRotate) + 'deg) rotateY(' + (s.isHorizontal() ? -wrapperRotate : 0) + 'deg)');
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                    if (s.params.cube.shadow && !s.isHorizontal()) {
                        s.container.find('.swiper-cube-shadow').transition(duration);
                    }
                }
            },
            coverflow: {
                setTranslate: function () {
                    var transform = s.translate;
                    var center = s.isHorizontal() ? -transform + s.width / 2 : -transform + s.height / 2;
                    var rotate = s.isHorizontal() ? s.params.coverflow.rotate: -s.params.coverflow.rotate;
                    var translate = s.params.coverflow.depth;
                    //Each slide offset from center
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideSize = s.slidesSizesGrid[i];
                        var slideOffset = slide[0].swiperSlideOffset;
                        var offsetMultiplier = (center - slideOffset - slideSize / 2) / slideSize * s.params.coverflow.modifier;
        
                        var rotateY = s.isHorizontal() ? rotate * offsetMultiplier : 0;
                        var rotateX = s.isHorizontal() ? 0 : rotate * offsetMultiplier;
                        // var rotateZ = 0
                        var translateZ = -translate * Math.abs(offsetMultiplier);
        
                        var translateY = s.isHorizontal() ? 0 : s.params.coverflow.stretch * (offsetMultiplier);
                        var translateX = s.isHorizontal() ? s.params.coverflow.stretch * (offsetMultiplier) : 0;
        
                        //Fix for ultra small values
                        if (Math.abs(translateX) < 0.001) translateX = 0;
                        if (Math.abs(translateY) < 0.001) translateY = 0;
                        if (Math.abs(translateZ) < 0.001) translateZ = 0;
                        if (Math.abs(rotateY) < 0.001) rotateY = 0;
                        if (Math.abs(rotateX) < 0.001) rotateX = 0;
        
                        var slideTransform = 'translate3d(' + translateX + 'px,' + translateY + 'px,' + translateZ + 'px)  rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
        
                        slide.transform(slideTransform);
                        slide[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
                        if (s.params.coverflow.slideShadows) {
                            //Set shadows
                            var shadowBefore = s.isHorizontal() ? slide.find('.swiper-slide-shadow-left') : slide.find('.swiper-slide-shadow-top');
                            var shadowAfter = s.isHorizontal() ? slide.find('.swiper-slide-shadow-right') : slide.find('.swiper-slide-shadow-bottom');
                            if (shadowBefore.length === 0) {
                                shadowBefore = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'left' : 'top') + '"></div>');
                                slide.append(shadowBefore);
                            }
                            if (shadowAfter.length === 0) {
                                shadowAfter = $('<div class="swiper-slide-shadow-' + (s.isHorizontal() ? 'right' : 'bottom') + '"></div>');
                                slide.append(shadowAfter);
                            }
                            if (shadowBefore.length) shadowBefore[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
                            if (shadowAfter.length) shadowAfter[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0;
                        }
                    }
        
                    //Set correct perspective for IE10
                    if (s.browser.ie) {
                        var ws = s.wrapper[0].style;
                        ws.perspectiveOrigin = center + 'px 50%';
                    }
                },
                setTransition: function (duration) {
                    s.slides.transition(duration).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(duration);
                }
            }
        };

        /*=========================
          Images Lazy Loading
          ===========================*/
        s.lazy = {
            initialImageLoaded: false,
            loadImageInSlide: function (index, loadInDuplicate) {
                if (typeof index === 'undefined') return;
                if (typeof loadInDuplicate === 'undefined') loadInDuplicate = true;
                if (s.slides.length === 0) return;
        
                var slide = s.slides.eq(index);
                var img = slide.find('.' + s.params.lazyLoadingClass + ':not(.' + s.params.lazyStatusLoadedClass + '):not(.' + s.params.lazyStatusLoadingClass + ')');
                if (slide.hasClass(s.params.lazyLoadingClass) && !slide.hasClass(s.params.lazyStatusLoadedClass) && !slide.hasClass(s.params.lazyStatusLoadingClass)) {
                    img = img.add(slide[0]);
                }
                if (img.length === 0) return;
        
                img.each(function () {
                    var _img = $(this);
                    _img.addClass(s.params.lazyStatusLoadingClass);
                    var background = _img.attr('data-background');
                    var src = _img.attr('data-src'),
                        srcset = _img.attr('data-srcset'),
                        sizes = _img.attr('data-sizes');
                    s.loadImage(_img[0], (src || background), srcset, sizes, false, function () {
                        if (background) {
                            _img.css('background-image', 'url("' + background + '")');
                            _img.removeAttr('data-background');
                        }
                        else {
                            if (srcset) {
                                _img.attr('srcset', srcset);
                                _img.removeAttr('data-srcset');
                            }
                            if (sizes) {
                                _img.attr('sizes', sizes);
                                _img.removeAttr('data-sizes');
                            }
                            if (src) {
                                _img.attr('src', src);
                                _img.removeAttr('data-src');
                            }
        
                        }
        
                        _img.addClass(s.params.lazyStatusLoadedClass).removeClass(s.params.lazyStatusLoadingClass);
                        slide.find('.' + s.params.lazyPreloaderClass + ', .' + s.params.preloaderClass).remove();
                        if (s.params.loop && loadInDuplicate) {
                            var slideOriginalIndex = slide.attr('data-swiper-slide-index');
                            if (slide.hasClass(s.params.slideDuplicateClass)) {
                                var originalSlide = s.wrapper.children('[data-swiper-slide-index="' + slideOriginalIndex + '"]:not(.' + s.params.slideDuplicateClass + ')');
                                s.lazy.loadImageInSlide(originalSlide.index(), false);
                            }
                            else {
                                var duplicatedSlide = s.wrapper.children('.' + s.params.slideDuplicateClass + '[data-swiper-slide-index="' + slideOriginalIndex + '"]');
                                s.lazy.loadImageInSlide(duplicatedSlide.index(), false);
                            }
                        }
                        s.emit('onLazyImageReady', s, slide[0], _img[0]);
                    });
        
                    s.emit('onLazyImageLoad', s, slide[0], _img[0]);
                });
        
            },
            load: function () {
                var i;
                var slidesPerView = s.params.slidesPerView;
                if (slidesPerView === 'auto') {
                    slidesPerView = 0;
                }
                if (!s.lazy.initialImageLoaded) s.lazy.initialImageLoaded = true;
                if (s.params.watchSlidesVisibility) {
                    s.wrapper.children('.' + s.params.slideVisibleClass).each(function () {
                        s.lazy.loadImageInSlide($(this).index());
                    });
                }
                else {
                    if (slidesPerView > 1) {
                        for (i = s.activeIndex; i < s.activeIndex + slidesPerView ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        s.lazy.loadImageInSlide(s.activeIndex);
                    }
                }
                if (s.params.lazyLoadingInPrevNext) {
                    if (slidesPerView > 1 || (s.params.lazyLoadingInPrevNextAmount && s.params.lazyLoadingInPrevNextAmount > 1)) {
                        var amount = s.params.lazyLoadingInPrevNextAmount;
                        var spv = slidesPerView;
                        var maxIndex = Math.min(s.activeIndex + spv + Math.max(amount, spv), s.slides.length);
                        var minIndex = Math.max(s.activeIndex - Math.max(spv, amount), 0);
                        // Next Slides
                        for (i = s.activeIndex + slidesPerView; i < maxIndex; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                        // Prev Slides
                        for (i = minIndex; i < s.activeIndex ; i++) {
                            if (s.slides[i]) s.lazy.loadImageInSlide(i);
                        }
                    }
                    else {
                        var nextSlide = s.wrapper.children('.' + s.params.slideNextClass);
                        if (nextSlide.length > 0) s.lazy.loadImageInSlide(nextSlide.index());
        
                        var prevSlide = s.wrapper.children('.' + s.params.slidePrevClass);
                        if (prevSlide.length > 0) s.lazy.loadImageInSlide(prevSlide.index());
                    }
                }
            },
            onTransitionStart: function () {
                if (s.params.lazyLoading) {
                    if (s.params.lazyLoadingOnTransitionStart || (!s.params.lazyLoadingOnTransitionStart && !s.lazy.initialImageLoaded)) {
                        s.lazy.load();
                    }
                }
            },
            onTransitionEnd: function () {
                if (s.params.lazyLoading && !s.params.lazyLoadingOnTransitionStart) {
                    s.lazy.load();
                }
            }
        };
        

        /*=========================
          Scrollbar
          ===========================*/
        s.scrollbar = {
            isTouched: false,
            setDragPosition: function (e) {
                var sb = s.scrollbar;
                var x = 0, y = 0;
                var translate;
                var pointerPosition = s.isHorizontal() ?
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX) :
                    ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY) ;
                var position = (pointerPosition) - sb.track.offset()[s.isHorizontal() ? 'left' : 'top'] - sb.dragSize / 2;
                var positionMin = -s.minTranslate() * sb.moveDivider;
                var positionMax = -s.maxTranslate() * sb.moveDivider;
                if (position < positionMin) {
                    position = positionMin;
                }
                else if (position > positionMax) {
                    position = positionMax;
                }
                position = -position / sb.moveDivider;
                s.updateProgress(position);
                s.setWrapperTranslate(position, true);
            },
            dragStart: function (e) {
                var sb = s.scrollbar;
                sb.isTouched = true;
                e.preventDefault();
                e.stopPropagation();
        
                sb.setDragPosition(e);
                clearTimeout(sb.dragTimeout);
        
                sb.track.transition(0);
                if (s.params.scrollbarHide) {
                    sb.track.css('opacity', 1);
                }
                s.wrapper.transition(100);
                sb.drag.transition(100);
                s.emit('onScrollbarDragStart', s);
            },
            dragMove: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                if (e.preventDefault) e.preventDefault();
                else e.returnValue = false;
                sb.setDragPosition(e);
                s.wrapper.transition(0);
                sb.track.transition(0);
                sb.drag.transition(0);
                s.emit('onScrollbarDragMove', s);
            },
            dragEnd: function (e) {
                var sb = s.scrollbar;
                if (!sb.isTouched) return;
                sb.isTouched = false;
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.dragTimeout);
                    sb.dragTimeout = setTimeout(function () {
                        sb.track.css('opacity', 0);
                        sb.track.transition(400);
                    }, 1000);
        
                }
                s.emit('onScrollbarDragEnd', s);
                if (s.params.scrollbarSnapOnRelease) {
                    s.slideReset();
                }
            },
            draggableEvents: (function () {
                if ((s.params.simulateTouch === false && !s.support.touch)) return s.touchEventsDesktop;
                else return s.touchEvents;
            })(),
            enableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).on(sb.draggableEvents.start, sb.dragStart);
                $(target).on(sb.draggableEvents.move, sb.dragMove);
                $(target).on(sb.draggableEvents.end, sb.dragEnd);
            },
            disableDraggable: function () {
                var sb = s.scrollbar;
                var target = s.support.touch ? sb.track : document;
                $(sb.track).off(s.draggableEvents.start, sb.dragStart);
                $(target).off(s.draggableEvents.move, sb.dragMove);
                $(target).off(s.draggableEvents.end, sb.dragEnd);
            },
            set: function () {
                if (!s.params.scrollbar) return;
                var sb = s.scrollbar;
                sb.track = $(s.params.scrollbar);
                if (s.params.uniqueNavElements && typeof s.params.scrollbar === 'string' && sb.track.length > 1 && s.container.find(s.params.scrollbar).length === 1) {
                    sb.track = s.container.find(s.params.scrollbar);
                }
                sb.drag = sb.track.find('.swiper-scrollbar-drag');
                if (sb.drag.length === 0) {
                    sb.drag = $('<div class="swiper-scrollbar-drag"></div>');
                    sb.track.append(sb.drag);
                }
                sb.drag[0].style.width = '';
                sb.drag[0].style.height = '';
                sb.trackSize = s.isHorizontal() ? sb.track[0].offsetWidth : sb.track[0].offsetHeight;
        
                sb.divider = s.size / s.virtualSize;
                sb.moveDivider = sb.divider * (sb.trackSize / s.size);
                sb.dragSize = sb.trackSize * sb.divider;
        
                if (s.isHorizontal()) {
                    sb.drag[0].style.width = sb.dragSize + 'px';
                }
                else {
                    sb.drag[0].style.height = sb.dragSize + 'px';
                }
        
                if (sb.divider >= 1) {
                    sb.track[0].style.display = 'none';
                }
                else {
                    sb.track[0].style.display = '';
                }
                if (s.params.scrollbarHide) {
                    sb.track[0].style.opacity = 0;
                }
            },
            setTranslate: function () {
                if (!s.params.scrollbar) return;
                var diff;
                var sb = s.scrollbar;
                var translate = s.translate || 0;
                var newPos;
        
                var newSize = sb.dragSize;
                newPos = (sb.trackSize - sb.dragSize) * s.progress;
                if (s.rtl && s.isHorizontal()) {
                    newPos = -newPos;
                    if (newPos > 0) {
                        newSize = sb.dragSize - newPos;
                        newPos = 0;
                    }
                    else if (-newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize + newPos;
                    }
                }
                else {
                    if (newPos < 0) {
                        newSize = sb.dragSize + newPos;
                        newPos = 0;
                    }
                    else if (newPos + sb.dragSize > sb.trackSize) {
                        newSize = sb.trackSize - newPos;
                    }
                }
                if (s.isHorizontal()) {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(' + (newPos) + 'px, 0, 0)');
                    }
                    else {
                        sb.drag.transform('translateX(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.width = newSize + 'px';
                }
                else {
                    if (s.support.transforms3d) {
                        sb.drag.transform('translate3d(0px, ' + (newPos) + 'px, 0)');
                    }
                    else {
                        sb.drag.transform('translateY(' + (newPos) + 'px)');
                    }
                    sb.drag[0].style.height = newSize + 'px';
                }
                if (s.params.scrollbarHide) {
                    clearTimeout(sb.timeout);
                    sb.track[0].style.opacity = 1;
                    sb.timeout = setTimeout(function () {
                        sb.track[0].style.opacity = 0;
                        sb.track.transition(400);
                    }, 1000);
                }
            },
            setTransition: function (duration) {
                if (!s.params.scrollbar) return;
                s.scrollbar.drag.transition(duration);
            }
        };

        /*=========================
          Controller
          ===========================*/
        s.controller = {
            LinearSpline: function (x, y) {
                this.x = x;
                this.y = y;
                this.lastIndex = x.length - 1;
                // Given an x value (x2), return the expected y2 value:
                // (x1,y1) is the known point before given value,
                // (x3,y3) is the known point after given value.
                var i1, i3;
                var l = this.x.length;
        
                this.interpolate = function (x2) {
                    if (!x2) return 0;
        
                    // Get the indexes of x1 and x3 (the array indexes before and after given x2):
                    i3 = binarySearch(this.x, x2);
                    i1 = i3 - 1;
        
                    // We have our indexes i1 & i3, so we can calculate already:
                    // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
                    return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
                };
        
                var binarySearch = (function() {
                    var maxIndex, minIndex, guess;
                    return function(array, val) {
                        minIndex = -1;
                        maxIndex = array.length;
                        while (maxIndex - minIndex > 1)
                            if (array[guess = maxIndex + minIndex >> 1] <= val) {
                                minIndex = guess;
                            } else {
                                maxIndex = guess;
                            }
                        return maxIndex;
                    };
                })();
            },
            //xxx: for now i will just save one spline function to to
            getInterpolateFunction: function(c){
                if(!s.controller.spline) s.controller.spline = s.params.loop ?
                    new s.controller.LinearSpline(s.slidesGrid, c.slidesGrid) :
                    new s.controller.LinearSpline(s.snapGrid, c.snapGrid);
            },
            setTranslate: function (translate, byController) {
               var controlled = s.params.control;
               var multiplier, controlledTranslate;
               function setControlledTranslate(c) {
                    // this will create an Interpolate function based on the snapGrids
                    // x is the Grid of the scrolled scroller and y will be the controlled scroller
                    // it makes sense to create this only once and recall it for the interpolation
                    // the function does a lot of value caching for performance
                    translate = c.rtl && c.params.direction === 'horizontal' ? -s.translate : s.translate;
                    if (s.params.controlBy === 'slide') {
                        s.controller.getInterpolateFunction(c);
                        // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
                        // but it did not work out
                        controlledTranslate = -s.controller.spline.interpolate(-translate);
                    }
        
                    if(!controlledTranslate || s.params.controlBy === 'container'){
                        multiplier = (c.maxTranslate() - c.minTranslate()) / (s.maxTranslate() - s.minTranslate());
                        controlledTranslate = (translate - s.minTranslate()) * multiplier + c.minTranslate();
                    }
        
                    if (s.params.controlInverse) {
                        controlledTranslate = c.maxTranslate() - controlledTranslate;
                    }
                    c.updateProgress(controlledTranslate);
                    c.setWrapperTranslate(controlledTranslate, false, s);
                    c.updateActiveIndex();
               }
               if (s.isArray(controlled)) {
                   for (var i = 0; i < controlled.length; i++) {
                       if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                           setControlledTranslate(controlled[i]);
                       }
                   }
               }
               else if (controlled instanceof Swiper && byController !== controlled) {
        
                   setControlledTranslate(controlled);
               }
            },
            setTransition: function (duration, byController) {
                var controlled = s.params.control;
                var i;
                function setControlledTransition(c) {
                    c.setWrapperTransition(duration, s);
                    if (duration !== 0) {
                        c.onTransitionStart();
                        c.wrapper.transitionEnd(function(){
                            if (!controlled) return;
                            if (c.params.loop && s.params.controlBy === 'slide') {
                                c.fixLoop();
                            }
                            c.onTransitionEnd();
        
                        });
                    }
                }
                if (s.isArray(controlled)) {
                    for (i = 0; i < controlled.length; i++) {
                        if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
                            setControlledTransition(controlled[i]);
                        }
                    }
                }
                else if (controlled instanceof Swiper && byController !== controlled) {
                    setControlledTransition(controlled);
                }
            }
        };

        /*=========================
          Hash Navigation
          ===========================*/
        s.hashnav = {
            onHashCange: function (e, a) {
                var newHash = document.location.hash.replace('#', '');
                var activeSlideHash = s.slides.eq(s.activeIndex).attr('data-hash');
                if (newHash !== activeSlideHash) {
                    s.slideTo(s.wrapper.children('.' + s.params.slideClass + '[data-hash="' + (newHash) + '"]').index());
                }
            },
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
                $(window)[action]('hashchange', s.hashnav.onHashCange);
            },
            setHash: function () {
                if (!s.hashnav.initialized || !s.params.hashnav) return;
                if (s.params.replaceState && window.history && window.history.replaceState) {
                    window.history.replaceState(null, null, ('#' + s.slides.eq(s.activeIndex).attr('data-hash') || ''));
                } else {
                    var slide = s.slides.eq(s.activeIndex);
                    var hash = slide.attr('data-hash') || slide.attr('data-history');
                    document.location.hash = hash || '';
                }
            },
            init: function () {
                if (!s.params.hashnav || s.params.history) return;
                s.hashnav.initialized = true;
                var hash = document.location.hash.replace('#', '');
                if (!hash) return;
                var speed = 0;
                for (var i = 0, length = s.slides.length; i < length; i++) {
                    var slide = s.slides.eq(i);
                    var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                    if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                        var index = slide.index();
                        s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                    }
                }
                if (s.params.hashnavWatchState) s.hashnav.attachEvents();
            },
            destroy: function () {
                if (s.params.hashnavWatchState) s.hashnav.attachEvents(true);
            }
        };

        /*=========================
          History Api with fallback to Hashnav
          ===========================*/
        s.history = {
            init: function () {
                if (!s.params.history) return;
                if (!window.history || !window.history.pushState) {
                    s.params.history = false;
                    s.params.hashnav = true;
                    return;
                }
                s.history.initialized = true;
                this.paths = this.getPathValues();
                if (!this.paths.key && !this.paths.value) return;
                this.scrollToSlide(0, this.paths.value, s.params.runCallbacksOnInit);
                if (!s.params.replaceState) {
                    window.addEventListener('popstate', this.setHistoryPopState);
                }
            },
            setHistoryPopState: function() {
                s.history.paths = s.history.getPathValues();
                s.history.scrollToSlide(s.params.speed, s.history.paths.value, false);
            },
            getPathValues: function() {
                var pathArray = window.location.pathname.slice(1).split('/');
                var total = pathArray.length;
                var key = pathArray[total - 2];
                var value = pathArray[total - 1];
                return { key: key, value: value };
            },
            setHistory: function (key, index) {
                if (!s.history.initialized || !s.params.history) return;
                var slide = s.slides.eq(index);
                var value = this.slugify(slide.attr('data-history'));
                if (!window.location.pathname.includes(key)) {
                    value = key + '/' + value;
                }
                if (s.params.replaceState) {
                    window.history.replaceState(null, null, value);
                } else {
                    window.history.pushState(null, null, value);
                }
            },
            slugify: function(text) {
                return text.toString().toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w\-]+/g, '')
                    .replace(/\-\-+/g, '-')
                    .replace(/^-+/, '')
                    .replace(/-+$/, '');
            },
            scrollToSlide: function(speed, value, runCallbacks) {
                if (value) {
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHistory = this.slugify(slide.attr('data-history'));
                        if (slideHistory === value && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, runCallbacks);
                        }
                    }
                } else {
                    s.slideTo(0, speed, runCallbacks);
                }
            }
        };

        /*=========================
          Keyboard Control
          ===========================*/
        function handleKeyboard(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var kc = e.keyCode || e.charCode;
            // Directions locks
            if (!s.params.allowSwipeToNext && (s.isHorizontal() && kc === 39 || !s.isHorizontal() && kc === 40)) {
                return false;
            }
            if (!s.params.allowSwipeToPrev && (s.isHorizontal() && kc === 37 || !s.isHorizontal() && kc === 38)) {
                return false;
            }
            if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
                return;
            }
            if (document.activeElement && document.activeElement.nodeName && (document.activeElement.nodeName.toLowerCase() === 'input' || document.activeElement.nodeName.toLowerCase() === 'textarea')) {
                return;
            }
            if (kc === 37 || kc === 39 || kc === 38 || kc === 40) {
                var inView = false;
                //Check that swiper should be inside of visible area of window
                if (s.container.parents('.' + s.params.slideClass).length > 0 && s.container.parents('.' + s.params.slideActiveClass).length === 0) {
                    return;
                }
                var windowScroll = {
                    left: window.pageXOffset,
                    top: window.pageYOffset
                };
                var windowWidth = window.innerWidth;
                var windowHeight = window.innerHeight;
                var swiperOffset = s.container.offset();
                if (s.rtl) swiperOffset.left = swiperOffset.left - s.container[0].scrollLeft;
                var swiperCoord = [
                    [swiperOffset.left, swiperOffset.top],
                    [swiperOffset.left + s.width, swiperOffset.top],
                    [swiperOffset.left, swiperOffset.top + s.height],
                    [swiperOffset.left + s.width, swiperOffset.top + s.height]
                ];
                for (var i = 0; i < swiperCoord.length; i++) {
                    var point = swiperCoord[i];
                    if (
                        point[0] >= windowScroll.left && point[0] <= windowScroll.left + windowWidth &&
                        point[1] >= windowScroll.top && point[1] <= windowScroll.top + windowHeight
                    ) {
                        inView = true;
                    }
        
                }
                if (!inView) return;
            }
            if (s.isHorizontal()) {
                if (kc === 37 || kc === 39) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if ((kc === 39 && !s.rtl) || (kc === 37 && s.rtl)) s.slideNext();
                if ((kc === 37 && !s.rtl) || (kc === 39 && s.rtl)) s.slidePrev();
            }
            else {
                if (kc === 38 || kc === 40) {
                    if (e.preventDefault) e.preventDefault();
                    else e.returnValue = false;
                }
                if (kc === 40) s.slideNext();
                if (kc === 38) s.slidePrev();
            }
        }
        s.disableKeyboardControl = function () {
            s.params.keyboardControl = false;
            $(document).off('keydown', handleKeyboard);
        };
        s.enableKeyboardControl = function () {
            s.params.keyboardControl = true;
            $(document).on('keydown', handleKeyboard);
        };
        

        /*=========================
          Mousewheel Control
          ===========================*/
        s.mousewheel = {
            event: false,
            lastScrollTime: (new window.Date()).getTime()
        };
        if (s.params.mousewheelControl) {
            /**
             * The best combination if you prefer spinX + spinY normalization.  It favors
             * the older DOMMouseScroll for Firefox, as FF does not include wheelDelta with
             * 'wheel' event, making spin speed determination impossible.
             */
            s.mousewheel.event = (navigator.userAgent.indexOf('firefox') > -1) ?
                'DOMMouseScroll' :
                isEventSupported() ?
                    'wheel' : 'mousewheel';
        }
        
        function isEventSupported() {
            var eventName = 'onwheel';
            var isSupported = eventName in document;
        
            if (!isSupported) {
                var element = document.createElement('div');
                element.setAttribute(eventName, 'return;');
                isSupported = typeof element[eventName] === 'function';
            }
        
            if (!isSupported &&
                document.implementation &&
                document.implementation.hasFeature &&
                    // always returns true in newer browsers as per the standard.
                    // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
                document.implementation.hasFeature('', '') !== true ) {
                // This is the only way to test support for the `wheel` event in IE9+.
                isSupported = document.implementation.hasFeature('Events.wheel', '3.0');
            }
        
            return isSupported;
        }
        
        function handleMousewheel(e) {
            if (e.originalEvent) e = e.originalEvent; //jquery fix
            var delta = 0;
            var rtlFactor = s.rtl ? -1 : 1;
        
            var data = normalizeWheel( e );
        
            if (s.params.mousewheelForceToAxis) {
                if (s.isHorizontal()) {
                    if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = data.pixelX * rtlFactor;
                    else return;
                }
                else {
                    if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = data.pixelY;
                    else return;
                }
            }
            else {
                delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? - data.pixelX * rtlFactor : - data.pixelY;
            }
        
            if (delta === 0) return;
        
            if (s.params.mousewheelInvert) delta = -delta;
        
            if (!s.params.freeMode) {
                if ((new window.Date()).getTime() - s.mousewheel.lastScrollTime > 60) {
                    if (delta < 0) {
                        if ((!s.isEnd || s.params.loop) && !s.animating) {
                            s.slideNext();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                    else {
                        if ((!s.isBeginning || s.params.loop) && !s.animating) {
                            s.slidePrev();
                            s.emit('onScroll', s, e);
                        }
                        else if (s.params.mousewheelReleaseOnEdges) return true;
                    }
                }
                s.mousewheel.lastScrollTime = (new window.Date()).getTime();
        
            }
            else {
                //Freemode or scrollContainer:
                var position = s.getWrapperTranslate() + delta * s.params.mousewheelSensitivity;
                var wasBeginning = s.isBeginning,
                    wasEnd = s.isEnd;
        
                if (position >= s.minTranslate()) position = s.minTranslate();
                if (position <= s.maxTranslate()) position = s.maxTranslate();
        
                s.setWrapperTransition(0);
                s.setWrapperTranslate(position);
                s.updateProgress();
                s.updateActiveIndex();
        
                if (!wasBeginning && s.isBeginning || !wasEnd && s.isEnd) {
                    s.updateClasses();
                }
        
                if (s.params.freeModeSticky) {
                    clearTimeout(s.mousewheel.timeout);
                    s.mousewheel.timeout = setTimeout(function () {
                        s.slideReset();
                    }, 300);
                }
                else {
                    if (s.params.lazyLoading && s.lazy) {
                        s.lazy.load();
                    }
                }
                // Emit event
                s.emit('onScroll', s, e);
        
                // Stop autoplay
                if (s.params.autoplay && s.params.autoplayDisableOnInteraction) s.stopAutoplay();
        
                // Return page scroll on edge positions
                if (position === 0 || position === s.maxTranslate()) return;
            }
        
            if (e.preventDefault) e.preventDefault();
            else e.returnValue = false;
            return false;
        }
        s.disableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.off(s.mousewheel.event, handleMousewheel);
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            return true;
        };
        
        /**
         * Mouse wheel (and 2-finger trackpad) support on the web sucks.  It is
         * complicated, thus this doc is long and (hopefully) detailed enough to answer
         * your questions.
         *
         * If you need to react to the mouse wheel in a predictable way, this code is
         * like your bestest friend. * hugs *
         *
         * As of today, there are 4 DOM event types you can listen to:
         *
         *   'wheel'                -- Chrome(31+), FF(17+), IE(9+)
         *   'mousewheel'           -- Chrome, IE(6+), Opera, Safari
         *   'MozMousePixelScroll'  -- FF(3.5 only!) (2010-2013) -- don't bother!
         *   'DOMMouseScroll'       -- FF(0.9.7+) since 2003
         *
         * So what to do?  The is the best:
         *
         *   normalizeWheel.getEventType();
         *
         * In your event callback, use this code to get sane interpretation of the
         * deltas.  This code will return an object with properties:
         *
         *   spinX   -- normalized spin speed (use for zoom) - x plane
         *   spinY   -- " - y plane
         *   pixelX  -- normalized distance (to pixels) - x plane
         *   pixelY  -- " - y plane
         *
         * Wheel values are provided by the browser assuming you are using the wheel to
         * scroll a web page by a number of lines or pixels (or pages).  Values can vary
         * significantly on different platforms and browsers, forgetting that you can
         * scroll at different speeds.  Some devices (like trackpads) emit more events
         * at smaller increments with fine granularity, and some emit massive jumps with
         * linear speed or acceleration.
         *
         * This code does its best to normalize the deltas for you:
         *
         *   - spin is trying to normalize how far the wheel was spun (or trackpad
         *     dragged).  This is super useful for zoom support where you want to
         *     throw away the chunky scroll steps on the PC and make those equal to
         *     the slow and smooth tiny steps on the Mac. Key data: This code tries to
         *     resolve a single slow step on a wheel to 1.
         *
         *   - pixel is normalizing the desired scroll delta in pixel units.  You'll
         *     get the crazy differences between browsers, but at least it'll be in
         *     pixels!
         *
         *   - positive value indicates scrolling DOWN/RIGHT, negative UP/LEFT.  This
         *     should translate to positive value zooming IN, negative zooming OUT.
         *     This matches the newer 'wheel' event.
         *
         * Why are there spinX, spinY (or pixels)?
         *
         *   - spinX is a 2-finger side drag on the trackpad, and a shift + wheel turn
         *     with a mouse.  It results in side-scrolling in the browser by default.
         *
         *   - spinY is what you expect -- it's the classic axis of a mouse wheel.
         *
         *   - I dropped spinZ/pixelZ.  It is supported by the DOM 3 'wheel' event and
         *     probably is by browsers in conjunction with fancy 3D controllers .. but
         *     you know.
         *
         * Implementation info:
         *
         * Examples of 'wheel' event if you scroll slowly (down) by one step with an
         * average mouse:
         *
         *   OS X + Chrome  (mouse)     -    4   pixel delta  (wheelDelta -120)
         *   OS X + Safari  (mouse)     -  N/A   pixel delta  (wheelDelta  -12)
         *   OS X + Firefox (mouse)     -    0.1 line  delta  (wheelDelta  N/A)
         *   Win8 + Chrome  (mouse)     -  100   pixel delta  (wheelDelta -120)
         *   Win8 + Firefox (mouse)     -    3   line  delta  (wheelDelta -120)
         *
         * On the trackpad:
         *
         *   OS X + Chrome  (trackpad)  -    2   pixel delta  (wheelDelta   -6)
         *   OS X + Firefox (trackpad)  -    1   pixel delta  (wheelDelta  N/A)
         *
         * On other/older browsers.. it's more complicated as there can be multiple and
         * also missing delta values.
         *
         * The 'wheel' event is more standard:
         *
         * http://www.w3.org/TR/DOM-Level-3-Events/#events-wheelevents
         *
         * The basics is that it includes a unit, deltaMode (pixels, lines, pages), and
         * deltaX, deltaY and deltaZ.  Some browsers provide other values to maintain
         * backward compatibility with older events.  Those other values help us
         * better normalize spin speed.  Example of what the browsers provide:
         *
         *                          | event.wheelDelta | event.detail
         *        ------------------+------------------+--------------
         *          Safari v5/OS X  |       -120       |       0
         *          Safari v5/Win7  |       -120       |       0
         *         Chrome v17/OS X  |       -120       |       0
         *         Chrome v17/Win7  |       -120       |       0
         *                IE9/Win7  |       -120       |   undefined
         *         Firefox v4/OS X  |     undefined    |       1
         *         Firefox v4/Win7  |     undefined    |       3
         *
         */
        function normalizeWheel( /*object*/ event ) /*object*/ {
            // Reasonable defaults
            var PIXEL_STEP = 10;
            var LINE_HEIGHT = 40;
            var PAGE_HEIGHT = 800;
        
            var sX = 0, sY = 0,       // spinX, spinY
                pX = 0, pY = 0;       // pixelX, pixelY
        
            // Legacy
            if( 'detail' in event ) {
                sY = event.detail;
            }
            if( 'wheelDelta' in event ) {
                sY = -event.wheelDelta / 120;
            }
            if( 'wheelDeltaY' in event ) {
                sY = -event.wheelDeltaY / 120;
            }
            if( 'wheelDeltaX' in event ) {
                sX = -event.wheelDeltaX / 120;
            }
        
            // side scrolling on FF with DOMMouseScroll
            if( 'axis' in event && event.axis === event.HORIZONTAL_AXIS ) {
                sX = sY;
                sY = 0;
            }
        
            pX = sX * PIXEL_STEP;
            pY = sY * PIXEL_STEP;
        
            if( 'deltaY' in event ) {
                pY = event.deltaY;
            }
            if( 'deltaX' in event ) {
                pX = event.deltaX;
            }
        
            if( (pX || pY) && event.deltaMode ) {
                if( event.deltaMode === 1 ) {          // delta in LINE units
                    pX *= LINE_HEIGHT;
                    pY *= LINE_HEIGHT;
                } else {                             // delta in PAGE units
                    pX *= PAGE_HEIGHT;
                    pY *= PAGE_HEIGHT;
                }
            }
        
            // Fall-back if spin cannot be determined
            if( pX && !sX ) {
                sX = (pX < 1) ? -1 : 1;
            }
            if( pY && !sY ) {
                sY = (pY < 1) ? -1 : 1;
            }
        
            return {
                spinX: sX,
                spinY: sY,
                pixelX: pX,
                pixelY: pY
            };
        }

        /*=========================
          Parallax
          ===========================*/
        function setParallaxTransform(el, progress) {
            el = $(el);
            var p, pX, pY;
            var rtlFactor = s.rtl ? -1 : 1;
        
            p = el.attr('data-swiper-parallax') || '0';
            pX = el.attr('data-swiper-parallax-x');
            pY = el.attr('data-swiper-parallax-y');
            if (pX || pY) {
                pX = pX || '0';
                pY = pY || '0';
            }
            else {
                if (s.isHorizontal()) {
                    pX = p;
                    pY = '0';
                }
                else {
                    pY = p;
                    pX = '0';
                }
            }
        
            if ((pX).indexOf('%') >= 0) {
                pX = parseInt(pX, 10) * progress * rtlFactor + '%';
            }
            else {
                pX = pX * progress * rtlFactor + 'px' ;
            }
            if ((pY).indexOf('%') >= 0) {
                pY = parseInt(pY, 10) * progress + '%';
            }
            else {
                pY = pY * progress + 'px' ;
            }
        
            el.transform('translate3d(' + pX + ', ' + pY + ',0px)');
        }
        s.parallax = {
            setTranslate: function () {
                s.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    setParallaxTransform(this, s.progress);
        
                });
                s.slides.each(function () {
                    var slide = $(this);
                    slide.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                        var progress = Math.min(Math.max(slide[0].progress, -1), 1);
                        setParallaxTransform(this, progress);
                    });
                });
            },
            setTransition: function (duration) {
                if (typeof duration === 'undefined') duration = s.params.speed;
                s.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function(){
                    var el = $(this);
                    var parallaxDuration = parseInt(el.attr('data-swiper-parallax-duration'), 10) || duration;
                    if (duration === 0) parallaxDuration = 0;
                    el.transition(parallaxDuration);
                });
            }
        };
        

        /*=========================
          Zoom
          ===========================*/
        s.zoom = {
            // "Global" Props
            scale: 1,
            currentScale: 1,
            isScaling: false,
            gesture: {
                slide: undefined,
                slideWidth: undefined,
                slideHeight: undefined,
                image: undefined,
                imageWrap: undefined,
                zoomMax: s.params.zoomMax
            },
            image: {
                isTouched: undefined,
                isMoved: undefined,
                currentX: undefined,
                currentY: undefined,
                minX: undefined,
                minY: undefined,
                maxX: undefined,
                maxY: undefined,
                width: undefined,
                height: undefined,
                startX: undefined,
                startY: undefined,
                touchesStart: {},
                touchesCurrent: {}
            },
            velocity: {
                x: undefined,
                y: undefined,
                prevPositionX: undefined,
                prevPositionY: undefined,
                prevTime: undefined
            },
            // Calc Scale From Multi-touches
            getDistanceBetweenTouches: function (e) {
                if (e.targetTouches.length < 2) return 1;
                var x1 = e.targetTouches[0].pageX,
                    y1 = e.targetTouches[0].pageY,
                    x2 = e.targetTouches[1].pageX,
                    y2 = e.targetTouches[1].pageY;
                var distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                return distance;
            },
            // Events
            onGestureStart: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchstart' || e.type === 'touchstart' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleStart = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.slide || !z.gesture.slide.length) {
                    z.gesture.slide = $(this);
                    if (z.gesture.slide.length === 0) z.gesture.slide = s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                    z.gesture.zoomMax = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax ;
                    if (z.gesture.imageWrap.length === 0) {
                        z.gesture.image = undefined;
                        return;
                    }
                }
                z.gesture.image.transition(0);
                z.isScaling = true;
            },
            onGestureChange: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchmove' || e.type === 'touchmove' && e.targetTouches.length < 2) {
                        return;
                    }
                    z.gesture.scaleMove = z.getDistanceBetweenTouches(e);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (s.support.gestures) {
                    z.scale = e.scale * z.currentScale;
                }
                else {
                    z.scale = (z.gesture.scaleMove / z.gesture.scaleStart) * z.currentScale;
                }
                if (z.scale > z.gesture.zoomMax) {
                    z.scale = z.gesture.zoomMax - 1 + Math.pow((z.scale - z.gesture.zoomMax + 1), 0.5);
                }
                if (z.scale < s.params.zoomMin) {
                    z.scale =  s.params.zoomMin + 1 - Math.pow((s.params.zoomMin - z.scale + 1), 0.5);
                }
                z.gesture.image.transform('translate3d(0,0,0) scale(' + z.scale + ')');
            },
            onGestureEnd: function (e) {
                var z = s.zoom;
                if (!s.support.gestures) {
                    if (e.type !== 'touchend' || e.type === 'touchend' && e.changedTouches.length < 2) {
                        return;
                    }
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                z.scale = Math.max(Math.min(z.scale, z.gesture.zoomMax), s.params.zoomMin);
                z.gesture.image.transition(s.params.speed).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                z.currentScale = z.scale;
                z.isScaling = false;
                if (z.scale === 1) z.gesture.slide = undefined;
            },
            onTouchStart: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (z.image.isTouched) return;
                if (s.device.os === 'android') e.preventDefault();
                z.image.isTouched = true;
                z.image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
            },
            onTouchMove: function (e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                s.allowClick = false;
                if (!z.image.isTouched || !z.gesture.slide) return;
        
                if (!z.image.isMoved) {
                    z.image.width = z.gesture.image[0].offsetWidth;
                    z.image.height = z.gesture.image[0].offsetHeight;
                    z.image.startX = s.getTranslate(z.gesture.imageWrap[0], 'x') || 0;
                    z.image.startY = s.getTranslate(z.gesture.imageWrap[0], 'y') || 0;
                    z.gesture.slideWidth = z.gesture.slide[0].offsetWidth;
                    z.gesture.slideHeight = z.gesture.slide[0].offsetHeight;
                    z.gesture.imageWrap.transition(0);
                    if (s.rtl) z.image.startX = -z.image.startX;
                    if (s.rtl) z.image.startY = -z.image.startY;
                }
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
        
                if (scaledWidth < z.gesture.slideWidth && scaledHeight < z.gesture.slideHeight) return;
        
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
        
                z.image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
                z.image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
        
                if (!z.image.isMoved && !z.isScaling) {
                    if (s.isHorizontal() &&
                        (Math.floor(z.image.minX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x < z.image.touchesStart.x) ||
                        (Math.floor(z.image.maxX) === Math.floor(z.image.startX) && z.image.touchesCurrent.x > z.image.touchesStart.x)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                    else if (!s.isHorizontal() &&
                        (Math.floor(z.image.minY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y < z.image.touchesStart.y) ||
                        (Math.floor(z.image.maxY) === Math.floor(z.image.startY) && z.image.touchesCurrent.y > z.image.touchesStart.y)
                        ) {
                        z.image.isTouched = false;
                        return;
                    }
                }
                e.preventDefault();
                e.stopPropagation();
        
                z.image.isMoved = true;
                z.image.currentX = z.image.touchesCurrent.x - z.image.touchesStart.x + z.image.startX;
                z.image.currentY = z.image.touchesCurrent.y - z.image.touchesStart.y + z.image.startY;
        
                if (z.image.currentX < z.image.minX) {
                    z.image.currentX =  z.image.minX + 1 - Math.pow((z.image.minX - z.image.currentX + 1), 0.8);
                }
                if (z.image.currentX > z.image.maxX) {
                    z.image.currentX = z.image.maxX - 1 + Math.pow((z.image.currentX - z.image.maxX + 1), 0.8);
                }
        
                if (z.image.currentY < z.image.minY) {
                    z.image.currentY =  z.image.minY + 1 - Math.pow((z.image.minY - z.image.currentY + 1), 0.8);
                }
                if (z.image.currentY > z.image.maxY) {
                    z.image.currentY = z.image.maxY - 1 + Math.pow((z.image.currentY - z.image.maxY + 1), 0.8);
                }
        
                //Velocity
                if (!z.velocity.prevPositionX) z.velocity.prevPositionX = z.image.touchesCurrent.x;
                if (!z.velocity.prevPositionY) z.velocity.prevPositionY = z.image.touchesCurrent.y;
                if (!z.velocity.prevTime) z.velocity.prevTime = Date.now();
                z.velocity.x = (z.image.touchesCurrent.x - z.velocity.prevPositionX) / (Date.now() - z.velocity.prevTime) / 2;
                z.velocity.y = (z.image.touchesCurrent.y - z.velocity.prevPositionY) / (Date.now() - z.velocity.prevTime) / 2;
                if (Math.abs(z.image.touchesCurrent.x - z.velocity.prevPositionX) < 2) z.velocity.x = 0;
                if (Math.abs(z.image.touchesCurrent.y - z.velocity.prevPositionY) < 2) z.velocity.y = 0;
                z.velocity.prevPositionX = z.image.touchesCurrent.x;
                z.velocity.prevPositionY = z.image.touchesCurrent.y;
                z.velocity.prevTime = Date.now();
        
                z.gesture.imageWrap.transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTouchEnd: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.image || z.gesture.image.length === 0) return;
                if (!z.image.isTouched || !z.image.isMoved) {
                    z.image.isTouched = false;
                    z.image.isMoved = false;
                    return;
                }
                z.image.isTouched = false;
                z.image.isMoved = false;
                var momentumDurationX = 300;
                var momentumDurationY = 300;
                var momentumDistanceX = z.velocity.x * momentumDurationX;
                var newPositionX = z.image.currentX + momentumDistanceX;
                var momentumDistanceY = z.velocity.y * momentumDurationY;
                var newPositionY = z.image.currentY + momentumDistanceY;
        
                //Fix duration
                if (z.velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - z.image.currentX) / z.velocity.x);
                if (z.velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - z.image.currentY) / z.velocity.y);
                var momentumDuration = Math.max(momentumDurationX, momentumDurationY);
        
                z.image.currentX = newPositionX;
                z.image.currentY = newPositionY;
        
                // Define if we need image drag
                var scaledWidth = z.image.width * z.scale;
                var scaledHeight = z.image.height * z.scale;
                z.image.minX = Math.min((z.gesture.slideWidth / 2 - scaledWidth / 2), 0);
                z.image.maxX = -z.image.minX;
                z.image.minY = Math.min((z.gesture.slideHeight / 2 - scaledHeight / 2), 0);
                z.image.maxY = -z.image.minY;
                z.image.currentX = Math.max(Math.min(z.image.currentX, z.image.maxX), z.image.minX);
                z.image.currentY = Math.max(Math.min(z.image.currentY, z.image.maxY), z.image.minY);
        
                z.gesture.imageWrap.transition(momentumDuration).transform('translate3d(' + z.image.currentX + 'px, ' + z.image.currentY + 'px,0)');
            },
            onTransitionEnd: function (s) {
                var z = s.zoom;
                if (z.gesture.slide && s.previousIndex !== s.activeIndex) {
                    z.gesture.image.transform('translate3d(0,0,0) scale(1)');
                    z.gesture.imageWrap.transform('translate3d(0,0,0)');
                    z.gesture.slide = z.gesture.image = z.gesture.imageWrap = undefined;
                    z.scale = z.currentScale = 1;
                }
            },
            // Toggle Zoom
            toggleZoom: function (s, e) {
                var z = s.zoom;
                if (!z.gesture.slide) {
                    z.gesture.slide = s.clickedSlide ? $(s.clickedSlide) : s.slides.eq(s.activeIndex);
                    z.gesture.image = z.gesture.slide.find('img, svg, canvas');
                    z.gesture.imageWrap = z.gesture.image.parent('.' + s.params.zoomContainerClass);
                }
                if (!z.gesture.image || z.gesture.image.length === 0) return;
        
                var touchX, touchY, offsetX, offsetY, diffX, diffY, translateX, translateY, imageWidth, imageHeight, scaledWidth, scaledHeight, translateMinX, translateMinY, translateMaxX, translateMaxY, slideWidth, slideHeight;
        
                if (typeof z.image.touchesStart.x === 'undefined' && e) {
                    touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
                    touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
                }
                else {
                    touchX = z.image.touchesStart.x;
                    touchY = z.image.touchesStart.y;
                }
        
                if (z.scale && z.scale !== 1) {
                    // Zoom Out
                    z.scale = z.currentScale = 1;
                    z.gesture.imageWrap.transition(300).transform('translate3d(0,0,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(1)');
                    z.gesture.slide = undefined;
                }
                else {
                    // Zoom In
                    z.scale = z.currentScale = z.gesture.imageWrap.attr('data-swiper-zoom') || s.params.zoomMax;
                    if (e) {
                        slideWidth = z.gesture.slide[0].offsetWidth;
                        slideHeight = z.gesture.slide[0].offsetHeight;
                        offsetX = z.gesture.slide.offset().left;
                        offsetY = z.gesture.slide.offset().top;
                        diffX = offsetX + slideWidth/2 - touchX;
                        diffY = offsetY + slideHeight/2 - touchY;
        
                        imageWidth = z.gesture.image[0].offsetWidth;
                        imageHeight = z.gesture.image[0].offsetHeight;
                        scaledWidth = imageWidth * z.scale;
                        scaledHeight = imageHeight * z.scale;
        
                        translateMinX = Math.min((slideWidth / 2 - scaledWidth / 2), 0);
                        translateMinY = Math.min((slideHeight / 2 - scaledHeight / 2), 0);
                        translateMaxX = -translateMinX;
                        translateMaxY = -translateMinY;
        
                        translateX = diffX * z.scale;
                        translateY = diffY * z.scale;
        
                        if (translateX < translateMinX) {
                            translateX =  translateMinX;
                        }
                        if (translateX > translateMaxX) {
                            translateX = translateMaxX;
                        }
        
                        if (translateY < translateMinY) {
                            translateY =  translateMinY;
                        }
                        if (translateY > translateMaxY) {
                            translateY = translateMaxY;
                        }
                    }
                    else {
                        translateX = 0;
                        translateY = 0;
                    }
                    z.gesture.imageWrap.transition(300).transform('translate3d(' + translateX + 'px, ' + translateY + 'px,0)');
                    z.gesture.image.transition(300).transform('translate3d(0,0,0) scale(' + z.scale + ')');
                }
            },
            // Attach/Detach Events
            attachEvents: function (detach) {
                var action = detach ? 'off' : 'on';
        
                if (s.params.zoom) {
                    var target = s.slides;
                    var passiveListener = s.touchEvents.start === 'touchstart' && s.support.passiveListener && s.params.passiveListeners ? {passive: true, capture: false} : false;
                    // Scale image
                    if (s.support.gestures) {
                        s.slides[action]('gesturestart', s.zoom.onGestureStart, passiveListener);
                        s.slides[action]('gesturechange', s.zoom.onGestureChange, passiveListener);
                        s.slides[action]('gestureend', s.zoom.onGestureEnd, passiveListener);
                    }
                    else if (s.touchEvents.start === 'touchstart') {
                        s.slides[action](s.touchEvents.start, s.zoom.onGestureStart, passiveListener);
                        s.slides[action](s.touchEvents.move, s.zoom.onGestureChange, passiveListener);
                        s.slides[action](s.touchEvents.end, s.zoom.onGestureEnd, passiveListener);
                    }
        
                    // Move image
                    s[action]('touchStart', s.zoom.onTouchStart);
                    s.slides.each(function (index, slide){
                        if ($(slide).find('.' + s.params.zoomContainerClass).length > 0) {
                            $(slide)[action](s.touchEvents.move, s.zoom.onTouchMove);
                        }
                    });
                    s[action]('touchEnd', s.zoom.onTouchEnd);
        
                    // Scale Out
                    s[action]('transitionEnd', s.zoom.onTransitionEnd);
                    if (s.params.zoomToggle) {
                        s.on('doubleTap', s.zoom.toggleZoom);
                    }
                }
            },
            init: function () {
                s.zoom.attachEvents();
            },
            destroy: function () {
                s.zoom.attachEvents(true);
            }
        };

        /*=========================
          Plugins API. Collect all and init all plugins
          ===========================*/
        s._plugins = [];
        for (var plugin in s.plugins) {
            var p = s.plugins[plugin](s, s.params[plugin]);
            if (p) s._plugins.push(p);
        }
        // Method to call all plugins event/method
        s.callPlugins = function (eventName) {
            for (var i = 0; i < s._plugins.length; i++) {
                if (eventName in s._plugins[i]) {
                    s._plugins[i][eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
        };

        /*=========================
          Events/Callbacks/Plugins Emitter
          ===========================*/
        function normalizeEventName (eventName) {
            if (eventName.indexOf('on') !== 0) {
                if (eventName[0] !== eventName[0].toUpperCase()) {
                    eventName = 'on' + eventName[0].toUpperCase() + eventName.substring(1);
                }
                else {
                    eventName = 'on' + eventName;
                }
            }
            return eventName;
        }
        s.emitterEventListeners = {
        
        };
        s.emit = function (eventName) {
            // Trigger callbacks
            if (s.params[eventName]) {
                s.params[eventName](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
            }
            var i;
            // Trigger events
            if (s.emitterEventListeners[eventName]) {
                for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                    s.emitterEventListeners[eventName][i](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
                }
            }
            // Trigger plugins
            if (s.callPlugins) s.callPlugins(eventName, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
        };
        s.on = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            if (!s.emitterEventListeners[eventName]) s.emitterEventListeners[eventName] = [];
            s.emitterEventListeners[eventName].push(handler);
            return s;
        };
        s.off = function (eventName, handler) {
            var i;
            eventName = normalizeEventName(eventName);
            if (typeof handler === 'undefined') {
                // Remove all handlers for such event
                s.emitterEventListeners[eventName] = [];
                return s;
            }
            if (!s.emitterEventListeners[eventName] || s.emitterEventListeners[eventName].length === 0) return;
            for (i = 0; i < s.emitterEventListeners[eventName].length; i++) {
                if(s.emitterEventListeners[eventName][i] === handler) s.emitterEventListeners[eventName].splice(i, 1);
            }
            return s;
        };
        s.once = function (eventName, handler) {
            eventName = normalizeEventName(eventName);
            var _handler = function () {
                handler(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
                s.off(eventName, _handler);
            };
            s.on(eventName, _handler);
            return s;
        };

        // Accessibility tools
        s.a11y = {
            makeFocusable: function ($el) {
                $el.attr('tabIndex', '0');
                return $el;
            },
            addRole: function ($el, role) {
                $el.attr('role', role);
                return $el;
            },
        
            addLabel: function ($el, label) {
                $el.attr('aria-label', label);
                return $el;
            },
        
            disable: function ($el) {
                $el.attr('aria-disabled', true);
                return $el;
            },
        
            enable: function ($el) {
                $el.attr('aria-disabled', false);
                return $el;
            },
        
            onEnterKey: function (event) {
                if (event.keyCode !== 13) return;
                if ($(event.target).is(s.params.nextButton)) {
                    s.onClickNext(event);
                    if (s.isEnd) {
                        s.a11y.notify(s.params.lastSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.nextSlideMessage);
                    }
                }
                else if ($(event.target).is(s.params.prevButton)) {
                    s.onClickPrev(event);
                    if (s.isBeginning) {
                        s.a11y.notify(s.params.firstSlideMessage);
                    }
                    else {
                        s.a11y.notify(s.params.prevSlideMessage);
                    }
                }
                if ($(event.target).is('.' + s.params.bulletClass)) {
                    $(event.target)[0].click();
                }
            },
        
            liveRegion: $('<span class="' + s.params.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>'),
        
            notify: function (message) {
                var notification = s.a11y.liveRegion;
                if (notification.length === 0) return;
                notification.html('');
                notification.html(message);
            },
            init: function () {
                // Setup accessibility
                if (s.params.nextButton && s.nextButton && s.nextButton.length > 0) {
                    s.a11y.makeFocusable(s.nextButton);
                    s.a11y.addRole(s.nextButton, 'button');
                    s.a11y.addLabel(s.nextButton, s.params.nextSlideMessage);
                }
                if (s.params.prevButton && s.prevButton && s.prevButton.length > 0) {
                    s.a11y.makeFocusable(s.prevButton);
                    s.a11y.addRole(s.prevButton, 'button');
                    s.a11y.addLabel(s.prevButton, s.params.prevSlideMessage);
                }
        
                $(s.container).append(s.a11y.liveRegion);
            },
            initPagination: function () {
                if (s.params.pagination && s.params.paginationClickable && s.bullets && s.bullets.length) {
                    s.bullets.each(function () {
                        var bullet = $(this);
                        s.a11y.makeFocusable(bullet);
                        s.a11y.addRole(bullet, 'button');
                        s.a11y.addLabel(bullet, s.params.paginationBulletMessage.replace(/{{index}}/, bullet.index() + 1));
                    });
                }
            },
            destroy: function () {
                if (s.a11y.liveRegion && s.a11y.liveRegion.length > 0) s.a11y.liveRegion.remove();
            }
        };
        

        /*=========================
          Init/Destroy
          ===========================*/
        s.init = function () {
            if (s.params.loop) s.createLoop();
            s.updateContainerSize();
            s.updateSlidesSize();
            s.updatePagination();
            if (s.params.scrollbar && s.scrollbar) {
                s.scrollbar.set();
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.enableDraggable();
                }
            }
            if (s.params.effect !== 'slide' && s.effects[s.params.effect]) {
                if (!s.params.loop) s.updateProgress();
                s.effects[s.params.effect].setTranslate();
            }
            if (s.params.loop) {
                s.slideTo(s.params.initialSlide + s.loopedSlides, 0, s.params.runCallbacksOnInit);
            }
            else {
                s.slideTo(s.params.initialSlide, 0, s.params.runCallbacksOnInit);
                if (s.params.initialSlide === 0) {
                    if (s.parallax && s.params.parallax) s.parallax.setTranslate();
                    if (s.lazy && s.params.lazyLoading) {
                        s.lazy.load();
                        s.lazy.initialImageLoaded = true;
                    }
                }
            }
            s.attachEvents();
            if (s.params.observer && s.support.observer) {
                s.initObservers();
            }
            if (s.params.preloadImages && !s.params.lazyLoading) {
                s.preloadImages();
            }
            if (s.params.zoom && s.zoom) {
                s.zoom.init();
            }
            if (s.params.autoplay) {
                s.startAutoplay();
            }
            if (s.params.keyboardControl) {
                if (s.enableKeyboardControl) s.enableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.enableMousewheelControl) s.enableMousewheelControl();
            }
            // Deprecated hashnavReplaceState changed to replaceState for use in hashnav and history
            if (s.params.hashnavReplaceState) {
                s.params.replaceState = s.params.hashnavReplaceState;
            }
            if (s.params.history) {
                if (s.history) s.history.init();
            }
            if (s.params.hashnav) {
                if (s.hashnav) s.hashnav.init();
            }
            if (s.params.a11y && s.a11y) s.a11y.init();
            s.emit('onInit', s);
        };
        
        // Cleanup dynamic styles
        s.cleanupStyles = function () {
            // Container
            s.container.removeClass(s.classNames.join(' ')).removeAttr('style');
        
            // Wrapper
            s.wrapper.removeAttr('style');
        
            // Slides
            if (s.slides && s.slides.length) {
                s.slides
                    .removeClass([
                      s.params.slideVisibleClass,
                      s.params.slideActiveClass,
                      s.params.slideNextClass,
                      s.params.slidePrevClass
                    ].join(' '))
                    .removeAttr('style')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row');
            }
        
            // Pagination/Bullets
            if (s.paginationContainer && s.paginationContainer.length) {
                s.paginationContainer.removeClass(s.params.paginationHiddenClass);
            }
            if (s.bullets && s.bullets.length) {
                s.bullets.removeClass(s.params.bulletActiveClass);
            }
        
            // Buttons
            if (s.params.prevButton) $(s.params.prevButton).removeClass(s.params.buttonDisabledClass);
            if (s.params.nextButton) $(s.params.nextButton).removeClass(s.params.buttonDisabledClass);
        
            // Scrollbar
            if (s.params.scrollbar && s.scrollbar) {
                if (s.scrollbar.track && s.scrollbar.track.length) s.scrollbar.track.removeAttr('style');
                if (s.scrollbar.drag && s.scrollbar.drag.length) s.scrollbar.drag.removeAttr('style');
            }
        };
        
        // Destroy
        s.destroy = function (deleteInstance, cleanupStyles) {
            // Detach evebts
            s.detachEvents();
            // Stop autoplay
            s.stopAutoplay();
            // Disable draggable
            if (s.params.scrollbar && s.scrollbar) {
                if (s.params.scrollbarDraggable) {
                    s.scrollbar.disableDraggable();
                }
            }
            // Destroy loop
            if (s.params.loop) {
                s.destroyLoop();
            }
            // Cleanup styles
            if (cleanupStyles) {
                s.cleanupStyles();
            }
            // Disconnect observer
            s.disconnectObservers();
        
            // Destroy zoom
            if (s.params.zoom && s.zoom) {
                s.zoom.destroy();
            }
            // Disable keyboard/mousewheel
            if (s.params.keyboardControl) {
                if (s.disableKeyboardControl) s.disableKeyboardControl();
            }
            if (s.params.mousewheelControl) {
                if (s.disableMousewheelControl) s.disableMousewheelControl();
            }
            // Disable a11y
            if (s.params.a11y && s.a11y) s.a11y.destroy();
            // Delete history popstate
            if (s.params.history && !s.params.replaceState) {
                window.removeEventListener('popstate', s.history.setHistoryPopState);
            }
            if (s.params.hashnav && s.hashnav)  {
                s.hashnav.destroy();
            }
            // Destroy callback
            s.emit('onDestroy');
            // Delete instance
            if (deleteInstance !== false) s = null;
        };
        
        s.init();
        

    
        // Return swiper instance
        return s;
    };
    

    /*==================================================
        Prototype
    ====================================================*/
    Swiper.prototype = {
        isSafari: (function () {
            var ua = window.navigator.userAgent.toLowerCase();
            return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
        })(),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
        isArray: function (arr) {
            return Object.prototype.toString.apply(arr) === '[object Array]';
        },
        /*==================================================
        Browser
        ====================================================*/
        browser: {
            ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
            ieTouch: (window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1) || (window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1),
            lteIE9: (function() {
                // create temporary DIV
                var div = document.createElement('div');
                // add content to tmp DIV which is wrapped into the IE HTML conditional statement
                div.innerHTML = '<!--[if lte IE 9]><i></i><![endif]-->';
                // return true / false value based on what will browser render
                return div.getElementsByTagName('i').length === 1;
            })()
        },
        /*==================================================
        Devices
        ====================================================*/
        device: (function () {
            var ua = window.navigator.userAgent;
            var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
            var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
            var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
            var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
            return {
                ios: ipad || iphone || ipod,
                android: android
            };
        })(),
        /*==================================================
        Feature Detection
        ====================================================*/
        support: {
            touch : (window.Modernizr && Modernizr.touch === true) || (function () {
                return !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            })(),
    
            transforms3d : (window.Modernizr && Modernizr.csstransforms3d === true) || (function () {
                var div = document.createElement('div').style;
                return ('webkitPerspective' in div || 'MozPerspective' in div || 'OPerspective' in div || 'MsPerspective' in div || 'perspective' in div);
            })(),
    
            flexbox: (function () {
                var div = document.createElement('div').style;
                var styles = ('alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient').split(' ');
                for (var i = 0; i < styles.length; i++) {
                    if (styles[i] in div) return true;
                }
            })(),
    
            observer: (function () {
                return ('MutationObserver' in window || 'WebkitMutationObserver' in window);
            })(),
    
            passiveListener: (function () {
                var supportsPassive = false;
                try {
                    var opts = Object.defineProperty({}, 'passive', {
                        get: function() {
                            supportsPassive = true;
                        }
                    });
                    window.addEventListener('testPassiveListener', null, opts);
                } catch (e) {}
                return supportsPassive;
            })(),
    
            gestures: (function () {
                return 'ongesturestart' in window;
            })()
        },
        /*==================================================
        Plugins
        ====================================================*/
        plugins: {}
    };
    

    /*===========================
    Dom7 Library
    ===========================*/
    var Dom7 = (function () {
        var Dom7 = function (arr) {
            var _this = this, i = 0;
            // Create array-like object
            for (i = 0; i < arr.length; i++) {
                _this[i] = arr[i];
            }
            _this.length = arr.length;
            // Return collection with methods
            return this;
        };
        var $ = function (selector, context) {
            var arr = [], i = 0;
            if (selector && !context) {
                if (selector instanceof Dom7) {
                    return selector;
                }
            }
            if (selector) {
                // String
                if (typeof selector === 'string') {
                    var els, tempParent, html = selector.trim();
                    if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
                        var toCreate = 'div';
                        if (html.indexOf('<li') === 0) toCreate = 'ul';
                        if (html.indexOf('<tr') === 0) toCreate = 'tbody';
                        if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
                        if (html.indexOf('<tbody') === 0) toCreate = 'table';
                        if (html.indexOf('<option') === 0) toCreate = 'select';
                        tempParent = document.createElement(toCreate);
                        tempParent.innerHTML = selector;
                        for (i = 0; i < tempParent.childNodes.length; i++) {
                            arr.push(tempParent.childNodes[i]);
                        }
                    }
                    else {
                        if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
                            // Pure ID selector
                            els = [document.getElementById(selector.split('#')[1])];
                        }
                        else {
                            // Other selectors
                            els = (context || document).querySelectorAll(selector);
                        }
                        for (i = 0; i < els.length; i++) {
                            if (els[i]) arr.push(els[i]);
                        }
                    }
                }
                // Node/element
                else if (selector.nodeType || selector === window || selector === document) {
                    arr.push(selector);
                }
                //Array of elements or instance of Dom
                else if (selector.length > 0 && selector[0].nodeType) {
                    for (i = 0; i < selector.length; i++) {
                        arr.push(selector[i]);
                    }
                }
            }
            return new Dom7(arr);
        };
        Dom7.prototype = {
            // Classes and attriutes
            addClass: function (className) {
                if (typeof className === 'undefined') {
                    return this;
                }
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.add(classes[i]);
                    }
                }
                return this;
            },
            removeClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.remove(classes[i]);
                    }
                }
                return this;
            },
            hasClass: function (className) {
                if (!this[0]) return false;
                else return this[0].classList.contains(className);
            },
            toggleClass: function (className) {
                var classes = className.split(' ');
                for (var i = 0; i < classes.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        this[j].classList.toggle(classes[i]);
                    }
                }
                return this;
            },
            attr: function (attrs, value) {
                if (arguments.length === 1 && typeof attrs === 'string') {
                    // Get attr
                    if (this[0]) return this[0].getAttribute(attrs);
                    else return undefined;
                }
                else {
                    // Set attrs
                    for (var i = 0; i < this.length; i++) {
                        if (arguments.length === 2) {
                            // String
                            this[i].setAttribute(attrs, value);
                        }
                        else {
                            // Object
                            for (var attrName in attrs) {
                                this[i][attrName] = attrs[attrName];
                                this[i].setAttribute(attrName, attrs[attrName]);
                            }
                        }
                    }
                    return this;
                }
            },
            removeAttr: function (attr) {
                for (var i = 0; i < this.length; i++) {
                    this[i].removeAttribute(attr);
                }
                return this;
            },
            data: function (key, value) {
                if (typeof value === 'undefined') {
                    // Get value
                    if (this[0]) {
                        var dataKey = this[0].getAttribute('data-' + key);
                        if (dataKey) return dataKey;
                        else if (this[0].dom7ElementDataStorage && (key in this[0].dom7ElementDataStorage)) return this[0].dom7ElementDataStorage[key];
                        else return undefined;
                    }
                    else return undefined;
                }
                else {
                    // Set value
                    for (var i = 0; i < this.length; i++) {
                        var el = this[i];
                        if (!el.dom7ElementDataStorage) el.dom7ElementDataStorage = {};
                        el.dom7ElementDataStorage[key] = value;
                    }
                    return this;
                }
            },
            // Transforms
            transform : function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            },
            transition: function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            },
            //Events
            on: function (eventName, targetSelector, listener, capture) {
                function handleLiveEvent(e) {
                    var target = e.target;
                    if ($(target).is(targetSelector)) listener.call(target, e);
                    else {
                        var parents = $(target).parents();
                        for (var k = 0; k < parents.length; k++) {
                            if ($(parents[k]).is(targetSelector)) listener.call(parents[k], e);
                        }
                    }
                }
                var events = eventName.split(' ');
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof targetSelector === 'function' || targetSelector === false) {
                        // Usual events
                        if (typeof targetSelector === 'function') {
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        for (j = 0; j < events.length; j++) {
                            this[i].addEventListener(events[j], listener, capture);
                        }
                    }
                    else {
                        //Live events
                        for (j = 0; j < events.length; j++) {
                            if (!this[i].dom7LiveListeners) this[i].dom7LiveListeners = [];
                            this[i].dom7LiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                            this[i].addEventListener(events[j], handleLiveEvent, capture);
                        }
                    }
                }
    
                return this;
            },
            off: function (eventName, targetSelector, listener, capture) {
                var events = eventName.split(' ');
                for (var i = 0; i < events.length; i++) {
                    for (var j = 0; j < this.length; j++) {
                        if (typeof targetSelector === 'function' || targetSelector === false) {
                            // Usual events
                            if (typeof targetSelector === 'function') {
                                listener = arguments[1];
                                capture = arguments[2] || false;
                            }
                            this[j].removeEventListener(events[i], listener, capture);
                        }
                        else {
                            // Live event
                            if (this[j].dom7LiveListeners) {
                                for (var k = 0; k < this[j].dom7LiveListeners.length; k++) {
                                    if (this[j].dom7LiveListeners[k].listener === listener) {
                                        this[j].removeEventListener(events[i], this[j].dom7LiveListeners[k].liveListener, capture);
                                    }
                                }
                            }
                        }
                    }
                }
                return this;
            },
            once: function (eventName, targetSelector, listener, capture) {
                var dom = this;
                if (typeof targetSelector === 'function') {
                    targetSelector = false;
                    listener = arguments[1];
                    capture = arguments[2];
                }
                function proxy(e) {
                    listener(e);
                    dom.off(eventName, targetSelector, proxy, capture);
                }
                dom.on(eventName, targetSelector, proxy, capture);
            },
            trigger: function (eventName, eventData) {
                for (var i = 0; i < this.length; i++) {
                    var evt;
                    try {
                        evt = new window.CustomEvent(eventName, {detail: eventData, bubbles: true, cancelable: true});
                    }
                    catch (e) {
                        evt = document.createEvent('Event');
                        evt.initEvent(eventName, true, true);
                        evt.detail = eventData;
                    }
                    this[i].dispatchEvent(evt);
                }
                return this;
            },
            transitionEnd: function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            },
            // Sizing/Styles
            width: function () {
                if (this[0] === window) {
                    return window.innerWidth;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('width'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerWidth: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            },
            height: function () {
                if (this[0] === window) {
                    return window.innerHeight;
                }
                else {
                    if (this.length > 0) {
                        return parseFloat(this.css('height'));
                    }
                    else {
                        return null;
                    }
                }
            },
            outerHeight: function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom'));
                    else
                        return this[0].offsetHeight;
                }
                else return null;
            },
            offset: function () {
                if (this.length > 0) {
                    var el = this[0];
                    var box = el.getBoundingClientRect();
                    var body = document.body;
                    var clientTop  = el.clientTop  || body.clientTop  || 0;
                    var clientLeft = el.clientLeft || body.clientLeft || 0;
                    var scrollTop  = window.pageYOffset || el.scrollTop;
                    var scrollLeft = window.pageXOffset || el.scrollLeft;
                    return {
                        top: box.top  + scrollTop  - clientTop,
                        left: box.left + scrollLeft - clientLeft
                    };
                }
                else {
                    return null;
                }
            },
            css: function (props, value) {
                var i;
                if (arguments.length === 1) {
                    if (typeof props === 'string') {
                        if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                    }
                    else {
                        for (i = 0; i < this.length; i++) {
                            for (var prop in props) {
                                this[i].style[prop] = props[prop];
                            }
                        }
                        return this;
                    }
                }
                if (arguments.length === 2 && typeof props === 'string') {
                    for (i = 0; i < this.length; i++) {
                        this[i].style[props] = value;
                    }
                    return this;
                }
                return this;
            },
    
            //Dom manipulation
            each: function (callback) {
                for (var i = 0; i < this.length; i++) {
                    callback.call(this[i], i, this[i]);
                }
                return this;
            },
            html: function (html) {
                if (typeof html === 'undefined') {
                    return this[0] ? this[0].innerHTML : undefined;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].innerHTML = html;
                    }
                    return this;
                }
            },
            text: function (text) {
                if (typeof text === 'undefined') {
                    if (this[0]) {
                        return this[0].textContent.trim();
                    }
                    else return null;
                }
                else {
                    for (var i = 0; i < this.length; i++) {
                        this[i].textContent = text;
                    }
                    return this;
                }
            },
            is: function (selector) {
                if (!this[0]) return false;
                var compareWith, i;
                if (typeof selector === 'string') {
                    var el = this[0];
                    if (el === document) return selector === document;
                    if (el === window) return selector === window;
    
                    if (el.matches) return el.matches(selector);
                    else if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
                    else if (el.mozMatchesSelector) return el.mozMatchesSelector(selector);
                    else if (el.msMatchesSelector) return el.msMatchesSelector(selector);
                    else {
                        compareWith = $(selector);
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                }
                else if (selector === document) return this[0] === document;
                else if (selector === window) return this[0] === window;
                else {
                    if (selector.nodeType || selector instanceof Dom7) {
                        compareWith = selector.nodeType ? [selector] : selector;
                        for (i = 0; i < compareWith.length; i++) {
                            if (compareWith[i] === this[0]) return true;
                        }
                        return false;
                    }
                    return false;
                }
    
            },
            index: function () {
                if (this[0]) {
                    var child = this[0];
                    var i = 0;
                    while ((child = child.previousSibling) !== null) {
                        if (child.nodeType === 1) i++;
                    }
                    return i;
                }
                else return undefined;
            },
            eq: function (index) {
                if (typeof index === 'undefined') return this;
                var length = this.length;
                var returnIndex;
                if (index > length - 1) {
                    return new Dom7([]);
                }
                if (index < 0) {
                    returnIndex = length + index;
                    if (returnIndex < 0) return new Dom7([]);
                    else return new Dom7([this[returnIndex]]);
                }
                return new Dom7([this[index]]);
            },
            append: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        while (tempDiv.firstChild) {
                            this[i].appendChild(tempDiv.firstChild);
                        }
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].appendChild(newChild[j]);
                        }
                    }
                    else {
                        this[i].appendChild(newChild);
                    }
                }
                return this;
            },
            prepend: function (newChild) {
                var i, j;
                for (i = 0; i < this.length; i++) {
                    if (typeof newChild === 'string') {
                        var tempDiv = document.createElement('div');
                        tempDiv.innerHTML = newChild;
                        for (j = tempDiv.childNodes.length - 1; j >= 0; j--) {
                            this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                        }
                        // this[i].insertAdjacentHTML('afterbegin', newChild);
                    }
                    else if (newChild instanceof Dom7) {
                        for (j = 0; j < newChild.length; j++) {
                            this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                        }
                    }
                    else {
                        this[i].insertBefore(newChild, this[i].childNodes[0]);
                    }
                }
                return this;
            },
            insertBefore: function (selector) {
                var before = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (before.length === 1) {
                        before[0].parentNode.insertBefore(this[i], before[0]);
                    }
                    else if (before.length > 1) {
                        for (var j = 0; j < before.length; j++) {
                            before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                        }
                    }
                }
            },
            insertAfter: function (selector) {
                var after = $(selector);
                for (var i = 0; i < this.length; i++) {
                    if (after.length === 1) {
                        after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                    }
                    else if (after.length > 1) {
                        for (var j = 0; j < after.length; j++) {
                            after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                        }
                    }
                }
            },
            next: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].nextElementSibling) return new Dom7([this[0].nextElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            nextAll: function (selector) {
                var nextEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.nextElementSibling) {
                    var next = el.nextElementSibling;
                    if (selector) {
                        if($(next).is(selector)) nextEls.push(next);
                    }
                    else nextEls.push(next);
                    el = next;
                }
                return new Dom7(nextEls);
            },
            prev: function (selector) {
                if (this.length > 0) {
                    if (selector) {
                        if (this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                    else {
                        if (this[0].previousElementSibling) return new Dom7([this[0].previousElementSibling]);
                        else return new Dom7([]);
                    }
                }
                else return new Dom7([]);
            },
            prevAll: function (selector) {
                var prevEls = [];
                var el = this[0];
                if (!el) return new Dom7([]);
                while (el.previousElementSibling) {
                    var prev = el.previousElementSibling;
                    if (selector) {
                        if($(prev).is(selector)) prevEls.push(prev);
                    }
                    else prevEls.push(prev);
                    el = prev;
                }
                return new Dom7(prevEls);
            },
            parent: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    if (selector) {
                        if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }
                    else {
                        parents.push(this[i].parentNode);
                    }
                }
                return $($.unique(parents));
            },
            parents: function (selector) {
                var parents = [];
                for (var i = 0; i < this.length; i++) {
                    var parent = this[i].parentNode;
                    while (parent) {
                        if (selector) {
                            if ($(parent).is(selector)) parents.push(parent);
                        }
                        else {
                            parents.push(parent);
                        }
                        parent = parent.parentNode;
                    }
                }
                return $($.unique(parents));
            },
            find : function (selector) {
                var foundElements = [];
                for (var i = 0; i < this.length; i++) {
                    var found = this[i].querySelectorAll(selector);
                    for (var j = 0; j < found.length; j++) {
                        foundElements.push(found[j]);
                    }
                }
                return new Dom7(foundElements);
            },
            children: function (selector) {
                var children = [];
                for (var i = 0; i < this.length; i++) {
                    var childNodes = this[i].childNodes;
    
                    for (var j = 0; j < childNodes.length; j++) {
                        if (!selector) {
                            if (childNodes[j].nodeType === 1) children.push(childNodes[j]);
                        }
                        else {
                            if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                        }
                    }
                }
                return new Dom7($.unique(children));
            },
            remove: function () {
                for (var i = 0; i < this.length; i++) {
                    if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
                }
                return this;
            },
            add: function () {
                var dom = this;
                var i, j;
                for (i = 0; i < arguments.length; i++) {
                    var toAdd = $(arguments[i]);
                    for (j = 0; j < toAdd.length; j++) {
                        dom[dom.length] = toAdd[j];
                        dom.length++;
                    }
                }
                return dom;
            }
        };
        $.fn = Dom7.prototype;
        $.unique = function (arr) {
            var unique = [];
            for (var i = 0; i < arr.length; i++) {
                if (unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
            }
            return unique;
        };
    
        return $;
    })();
    

    /*===========================
     Get Dom libraries
     ===========================*/
    var swiperDomPlugins = ['jQuery', 'Zepto', 'Dom7'];
    for (var i = 0; i < swiperDomPlugins.length; i++) {
    	if (window[swiperDomPlugins[i]]) {
    		addLibraryPlugin(window[swiperDomPlugins[i]]);
    	}
    }
    // Required DOM Plugins
    var domLib;
    if (typeof Dom7 === 'undefined') {
    	domLib = window.Dom7 || window.Zepto || window.jQuery;
    }
    else {
    	domLib = Dom7;
    }

    /*===========================
    Add .swiper plugin from Dom libraries
    ===========================*/
    function addLibraryPlugin(lib) {
        lib.fn.swiper = function (params) {
            var firstInstance;
            lib(this).each(function () {
                var s = new Swiper(this, params);
                if (!firstInstance) firstInstance = s;
            });
            return firstInstance;
        };
    }
    
    if (domLib) {
        if (!('transitionEnd' in domLib.fn)) {
            domLib.fn.transitionEnd = function (callback) {
                var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'],
                    i, j, dom = this;
                function fireCallBack(e) {
                    /*jshint validthis:true */
                    if (e.target !== this) return;
                    callback.call(this, e);
                    for (i = 0; i < events.length; i++) {
                        dom.off(events[i], fireCallBack);
                    }
                }
                if (callback) {
                    for (i = 0; i < events.length; i++) {
                        dom.on(events[i], fireCallBack);
                    }
                }
                return this;
            };
        }
        if (!('transform' in domLib.fn)) {
            domLib.fn.transform = function (transform) {
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
                }
                return this;
            };
        }
        if (!('transition' in domLib.fn)) {
            domLib.fn.transition = function (duration) {
                if (typeof duration !== 'string') {
                    duration = duration + 'ms';
                }
                for (var i = 0; i < this.length; i++) {
                    var elStyle = this[i].style;
                    elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
                }
                return this;
            };
        }
        if (!('outerWidth' in domLib.fn)) {
            domLib.fn.outerWidth = function (includeMargins) {
                if (this.length > 0) {
                    if (includeMargins)
                        return this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left'));
                    else
                        return this[0].offsetWidth;
                }
                else return null;
            };
        }
    }

    window.Swiper = Swiper;
})();
/*===========================
Swiper AMD Export
===========================*/
if (typeof(module) !== 'undefined')
{
    module.exports = window.Swiper;
}
else if (typeof define === 'function' && define.amd) {
    define([], function () {
        'use strict';
        return window.Swiper;
    });
}


},{}],27:[function(require,module,exports){
/*!
 * EventEmitter v4.2.11 - git.io/ee
 * Unlicense - http://unlicense.org/
 * Oliver Caldwell - http://oli.me.uk/
 * @preserve
 */

;(function () {
    'use strict';

    /**
     * Class for managing events.
     * Can be extended to provide event functionality in other classes.
     *
     * @class EventEmitter Manages event registering and emitting.
     */
    function EventEmitter() {}

    // Shortcuts to improve speed and size
    var proto = EventEmitter.prototype;
    var exports = this;
    var originalGlobalValue = exports.EventEmitter;

    /**
     * Finds the index of the listener for the event in its storage array.
     *
     * @param {Function[]} listeners Array of listeners to search through.
     * @param {Function} listener Method to look for.
     * @return {Number} Index of the specified listener, -1 if not found
     * @api private
     */
    function indexOfListener(listeners, listener) {
        var i = listeners.length;
        while (i--) {
            if (listeners[i].listener === listener) {
                return i;
            }
        }

        return -1;
    }

    /**
     * Alias a method while keeping the context correct, to allow for overwriting of target method.
     *
     * @param {String} name The name of the target method.
     * @return {Function} The aliased method
     * @api private
     */
    function alias(name) {
        return function aliasClosure() {
            return this[name].apply(this, arguments);
        };
    }

    /**
     * Returns the listener array for the specified event.
     * Will initialise the event object and listener arrays if required.
     * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
     * Each property in the object response is an array of listener functions.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Function[]|Object} All listener functions for the event.
     */
    proto.getListeners = function getListeners(evt) {
        var events = this._getEvents();
        var response;
        var key;

        // Return a concatenated array of all matching events if
        // the selector is a regular expression.
        if (evt instanceof RegExp) {
            response = {};
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    response[key] = events[key];
                }
            }
        }
        else {
            response = events[evt] || (events[evt] = []);
        }

        return response;
    };

    /**
     * Takes a list of listener objects and flattens it into a list of listener functions.
     *
     * @param {Object[]} listeners Raw listener objects.
     * @return {Function[]} Just the listener functions.
     */
    proto.flattenListeners = function flattenListeners(listeners) {
        var flatListeners = [];
        var i;

        for (i = 0; i < listeners.length; i += 1) {
            flatListeners.push(listeners[i].listener);
        }

        return flatListeners;
    };

    /**
     * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
     *
     * @param {String|RegExp} evt Name of the event to return the listeners from.
     * @return {Object} All listener functions for an event in an object.
     */
    proto.getListenersAsObject = function getListenersAsObject(evt) {
        var listeners = this.getListeners(evt);
        var response;

        if (listeners instanceof Array) {
            response = {};
            response[evt] = listeners;
        }

        return response || listeners;
    };

    /**
     * Adds a listener function to the specified event.
     * The listener will not be added if it is a duplicate.
     * If the listener returns true then it will be removed after it is called.
     * If you pass a regular expression as the event name then the listener will be added to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListener = function addListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var listenerIsWrapped = typeof listener === 'object';
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
                listeners[key].push(listenerIsWrapped ? listener : {
                    listener: listener,
                    once: false
                });
            }
        }

        return this;
    };

    /**
     * Alias of addListener
     */
    proto.on = alias('addListener');

    /**
     * Semi-alias of addListener. It will add a listener that will be
     * automatically removed after its first execution.
     *
     * @param {String|RegExp} evt Name of the event to attach the listener to.
     * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addOnceListener = function addOnceListener(evt, listener) {
        return this.addListener(evt, {
            listener: listener,
            once: true
        });
    };

    /**
     * Alias of addOnceListener.
     */
    proto.once = alias('addOnceListener');

    /**
     * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
     * You need to tell it what event names should be matched by a regex.
     *
     * @param {String} evt Name of the event to create.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvent = function defineEvent(evt) {
        this.getListeners(evt);
        return this;
    };

    /**
     * Uses defineEvent to define multiple events.
     *
     * @param {String[]} evts An array of event names to define.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.defineEvents = function defineEvents(evts) {
        for (var i = 0; i < evts.length; i += 1) {
            this.defineEvent(evts[i]);
        }
        return this;
    };

    /**
     * Removes a listener function from the specified event.
     * When passed a regular expression as the event name, it will remove the listener from all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to remove the listener from.
     * @param {Function} listener Method to remove from the event.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListener = function removeListener(evt, listener) {
        var listeners = this.getListenersAsObject(evt);
        var index;
        var key;

        for (key in listeners) {
            if (listeners.hasOwnProperty(key)) {
                index = indexOfListener(listeners[key], listener);

                if (index !== -1) {
                    listeners[key].splice(index, 1);
                }
            }
        }

        return this;
    };

    /**
     * Alias of removeListener
     */
    proto.off = alias('removeListener');

    /**
     * Adds listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
     * You can also pass it a regular expression to add the array of listeners to all events that match it.
     * Yeah, this function does quite a bit. That's probably a bad thing.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.addListeners = function addListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(false, evt, listeners);
    };

    /**
     * Removes listeners in bulk using the manipulateListeners method.
     * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be removed.
     * You can also pass it a regular expression to remove the listeners from all events that match it.
     *
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeListeners = function removeListeners(evt, listeners) {
        // Pass through to manipulateListeners
        return this.manipulateListeners(true, evt, listeners);
    };

    /**
     * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
     * The first argument will determine if the listeners are removed (true) or added (false).
     * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
     * You can also pass it an event name and an array of listeners to be added/removed.
     * You can also pass it a regular expression to manipulate the listeners of all events that match it.
     *
     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
        var i;
        var value;
        var single = remove ? this.removeListener : this.addListener;
        var multiple = remove ? this.removeListeners : this.addListeners;

        // If evt is an object then pass each of its properties to this method
        if (typeof evt === 'object' && !(evt instanceof RegExp)) {
            for (i in evt) {
                if (evt.hasOwnProperty(i) && (value = evt[i])) {
                    // Pass the single listener straight through to the singular method
                    if (typeof value === 'function') {
                        single.call(this, i, value);
                    }
                    else {
                        // Otherwise pass back to the multiple function
                        multiple.call(this, i, value);
                    }
                }
            }
        }
        else {
            // So evt must be a string
            // And listeners must be an array of listeners
            // Loop over it and pass each one to the multiple method
            i = listeners.length;
            while (i--) {
                single.call(this, evt, listeners[i]);
            }
        }

        return this;
    };

    /**
     * Removes all listeners from a specified event.
     * If you do not specify an event then all listeners will be removed.
     * That means every event will be emptied.
     * You can also pass a regex to remove all events that match it.
     *
     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.removeEvent = function removeEvent(evt) {
        var type = typeof evt;
        var events = this._getEvents();
        var key;

        // Remove different things depending on the state of evt
        if (type === 'string') {
            // Remove all listeners for the specified event
            delete events[evt];
        }
        else if (evt instanceof RegExp) {
            // Remove all events matching the regex.
            for (key in events) {
                if (events.hasOwnProperty(key) && evt.test(key)) {
                    delete events[key];
                }
            }
        }
        else {
            // Remove all listeners in all events
            delete this._events;
        }

        return this;
    };

    /**
     * Alias of removeEvent.
     *
     * Added to mirror the node API.
     */
    proto.removeAllListeners = alias('removeEvent');

    /**
     * Emits an event of your choice.
     * When emitted, every listener attached to that event will be executed.
     * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
     * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
     * So they will not arrive within the array on the other side, they will be separate.
     * You can also pass a regular expression to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {Array} [args] Optional array of arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emitEvent = function emitEvent(evt, args) {
        var listenersMap = this.getListenersAsObject(evt);
        var listeners;
        var listener;
        var i;
        var key;
        var response;

        for (key in listenersMap) {
            if (listenersMap.hasOwnProperty(key)) {
                listeners = listenersMap[key].slice(0);
                i = listeners.length;

                while (i--) {
                    // If the listener returns true then it shall be removed from the event
                    // The function is executed either with a basic call or an apply if there is an args array
                    listener = listeners[i];

                    if (listener.once === true) {
                        this.removeListener(evt, listener.listener);
                    }

                    response = listener.listener.apply(this, args || []);

                    if (response === this._getOnceReturnValue()) {
                        this.removeListener(evt, listener.listener);
                    }
                }
            }
        }

        return this;
    };

    /**
     * Alias of emitEvent
     */
    proto.trigger = alias('emitEvent');

    /**
     * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
     * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
     *
     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
     * @param {...*} Optional additional arguments to be passed to each listener.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.emit = function emit(evt) {
        var args = Array.prototype.slice.call(arguments, 1);
        return this.emitEvent(evt, args);
    };

    /**
     * Sets the current value to check against when executing listeners. If a
     * listeners return value matches the one set here then it will be removed
     * after execution. This value defaults to true.
     *
     * @param {*} value The new value to check for when executing listeners.
     * @return {Object} Current instance of EventEmitter for chaining.
     */
    proto.setOnceReturnValue = function setOnceReturnValue(value) {
        this._onceReturnValue = value;
        return this;
    };

    /**
     * Fetches the current value to check against when executing listeners. If
     * the listeners return value matches this one then it should be removed
     * automatically. It will return true by default.
     *
     * @return {*|Boolean} The current value to check for or the default, true.
     * @api private
     */
    proto._getOnceReturnValue = function _getOnceReturnValue() {
        if (this.hasOwnProperty('_onceReturnValue')) {
            return this._onceReturnValue;
        }
        else {
            return true;
        }
    };

    /**
     * Fetches the events object and creates one if required.
     *
     * @return {Object} The events storage object.
     * @api private
     */
    proto._getEvents = function _getEvents() {
        return this._events || (this._events = {});
    };

    /**
     * Reverts the global {@link EventEmitter} to its previous value and returns a reference to this version.
     *
     * @return {Function} Non conflicting EventEmitter class.
     */
    EventEmitter.noConflict = function noConflict() {
        exports.EventEmitter = originalGlobalValue;
        return EventEmitter;
    };

    // Expose the class either via AMD, CommonJS or the global object
    if (typeof define === 'function' && define.amd) {
        define(function () {
            return EventEmitter;
        });
    }
    else if (typeof module === 'object' && module.exports){
        module.exports = EventEmitter;
    }
    else {
        exports.EventEmitter = EventEmitter;
    }
}.call(this));

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHNcXHNyY1xcc2NyaXB0c1xcYXNzZXRzXFxzcmNcXHNjcmlwdHNcXEZpeGVkTmF2YmFyLmNvZmZlZSIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcRml4ZWRTdWJOYXZiYXIuY29mZmVlIiwiYXNzZXRzXFxzcmNcXHNjcmlwdHNcXGFzc2V0c1xcc3JjXFxzY3JpcHRzXFxNYXNvbnJ5LmNvZmZlZSIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcTW9iaWxlTmF2aWdhdGlvbi5qcyIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcU2Nyb2xsQWN0aW9uLmNvZmZlZSIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcU2xpZGVNZW51LmpzIiwiYXNzZXRzXFxzcmNcXHNjcmlwdHNcXGFzc2V0c1xcc3JjXFxzY3JpcHRzXFxTdWJOYXZpZ2F0aW9uLmNvZmZlZSIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcU3Vic2NyaXB0aW9uUG9wdXAuanMiLCJhc3NldHNcXHNyY1xcc2NyaXB0c1xcYXNzZXRzXFxzcmNcXHNjcmlwdHNcXFN3aXBlclRodW1icy5qcyIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcVG9vbHRpcC5qcyIsImFzc2V0c1xcc3JjXFxzY3JpcHRzXFxhc3NldHNcXHNyY1xcc2NyaXB0c1xcYWxsLmNvZmZlZSIsImJvd2VyX2NvbXBvbmVudHNcXGpxdWVyeS1icmlkZ2V0XFxib3dlcl9jb21wb25lbnRzXFxqcXVlcnktYnJpZGdldFxcanF1ZXJ5LmJyaWRnZXQuanMiLCJub2RlX21vZHVsZXMvZGVzYW5kcm8tY2xhc3NpZS9jbGFzc2llLmpzIiwibm9kZV9tb2R1bGVzL2Rlc2FuZHJvLWdldC1zdHlsZS1wcm9wZXJ0eS9nZXQtc3R5bGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvZGVzYW5kcm8tbWF0Y2hlcy1zZWxlY3Rvci9tYXRjaGVzLXNlbGVjdG9yLmpzIiwibm9kZV9tb2R1bGVzL2RvYy1yZWFkeS9kb2MtcmVhZHkuanMiLCJub2RlX21vZHVsZXMvZXZlbnRpZS9ldmVudGllLmpzIiwibm9kZV9tb2R1bGVzL2Zpenp5LXVpLXV0aWxzL3V0aWxzLmpzIiwibm9kZV9tb2R1bGVzL2dldC1zaXplL2dldC1zaXplLmpzIiwibm9kZV9tb2R1bGVzL291dGxheWVyL2l0ZW0uanMiLCJub2RlX21vZHVsZXMvb3V0bGF5ZXIvb3V0bGF5ZXIuanMiLCJub2RlX21vZHVsZXMvcGFja2VyeS9qcy9pdGVtLmpzIiwibm9kZV9tb2R1bGVzL3BhY2tlcnkvanMvcGFja2VyLmpzIiwibm9kZV9tb2R1bGVzL3BhY2tlcnkvanMvcGFja2VyeS5qcyIsIm5vZGVfbW9kdWxlcy9wYWNrZXJ5L2pzL3JlY3QuanMiLCJub2RlX21vZHVsZXMvc3dpcGVyL2Rpc3QvanMvc3dpcGVyLmpzIiwibm9kZV9tb2R1bGVzL3dvbGZ5ODctZXZlbnRlbWl0dGVyL0V2ZW50RW1pdHRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQSxJQUFBLGNBQUE7RUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFDVCxxQkFBRSxjQUFGLEVBQWtCLFlBQWxCOzs7O0lBQ1YsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBLENBQUUsY0FBRjtJQUNYLElBQUMsQ0FBQSxLQUFELEdBQVMsQ0FBQSxDQUFFLFlBQUY7SUFDVCxJQUFDLENBQUEsRUFBRCxDQUFBO0lBQ0EsSUFBQyxDQUFBLElBQUQsQ0FBQTtFQUpVOzt3QkFPWixlQUFBLEdBQWlCLFNBQUE7V0FDZixJQUFDLENBQUEsT0FBTyxDQUFDLE1BQVQsQ0FBQTtFQURlOzt3QkFJakIsZUFBQSxHQUFpQixTQUFBO1dBQ2YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULENBQUEsQ0FBbUIsQ0FBQztFQURMOzt3QkFVakIsSUFBQSxHQUFNLFNBQUE7SUFDSixJQUFDLENBQUEsT0FBTyxDQUFDLFFBQVQsQ0FBa0IsVUFBbEI7V0FDQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBVztNQUFBLFVBQUEsRUFBWSxJQUFDLENBQUEsZUFBRCxDQUFBLENBQVo7S0FBWDtFQUZJOzt3QkFLTixFQUFBLEdBQUksU0FBQTtBQUNGLFFBQUE7SUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLE1BQUY7SUFDVixPQUFPLENBQUMsTUFBUixDQUFlLElBQUMsQ0FBQSxJQUFoQjtJQUVBLE9BQU8sQ0FBQyxFQUFSLENBQVcsWUFBWCxFQUF5QixJQUFDLENBQUEsV0FBMUI7V0FFQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLE9BQWIsRUFBc0IsR0FBdEIsRUFBMkIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEtBQUQsR0FBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBM0I7RUFORTs7Ozs7Ozs7Ozs7QUM1Qk4sSUFBQSxpQkFBQTtFQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixNQUFNLENBQUMsT0FBUCxHQUF1QjtFQUVULHdCQUFDLFFBQUQsRUFBVyxTQUFYLEVBQXNCLE1BQXRCOzs7OztJQUNWLElBQUMsQ0FBQSxNQUFELEdBQVU7SUFDVixJQUFDLENBQUEsUUFBRCxHQUFZO0lBQ1osSUFBQyxDQUFBLFNBQUQsR0FBYTtJQUNiLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQSxDQUFFLE1BQUY7SUFFWCxJQUFDLENBQUEsTUFBRCxDQUFBO0lBRUEsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksb0JBQVosRUFBa0MsSUFBQyxDQUFBLE1BQW5DO0VBUlU7OzJCQVVaLFFBQUEsR0FBUyxTQUFBO0lBRUwsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLElBQUMsQ0FBQSxTQUFwQjtXQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFrQixVQUFsQjtFQUhLOzsyQkFLVCxVQUFBLEdBQVcsU0FBQTtJQUVQLElBQUMsQ0FBQSxRQUFRLENBQUMsV0FBVixDQUFzQixJQUFDLENBQUEsU0FBdkI7V0FDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE9BQVYsQ0FBa0IsWUFBbEI7RUFITzs7MkJBS1gsU0FBQSxHQUFVLFNBQUE7V0FDUixRQUFBLENBQVMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQUEsQ0FBa0IsQ0FBQyxHQUE1QjtFQURROzsyQkFJVixNQUFBLEdBQU8sU0FBQTtJQUNMLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQUEsQ0FBQSxHQUF3QixJQUFDLENBQUEsU0FBRCxDQUFBLENBQUEsR0FBZSxRQUFBLENBQVMsSUFBQyxDQUFBLE1BQU0sQ0FBQyxlQUFSLENBQUEsQ0FBVCxDQUExQzthQUNFLElBQUMsQ0FBQSxVQUFELENBQUEsRUFERjtLQUFBLE1BQUE7YUFHRSxJQUFDLENBQUEsUUFBRCxDQUFBLEVBSEY7O0VBREs7Ozs7Ozs7Ozs7O0FDMUJULElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSOztBQUNKLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixPQUFBLENBQVEsZ0JBQVI7O0FBQ0EsQ0FBQyxDQUFDLE9BQUYsQ0FBVyxTQUFYLEVBQXNCLE9BQUEsQ0FBUSxTQUFSLENBQXRCOztBQUtBLE1BQU0sQ0FBQyxPQUFQLEdBQWlCLFNBQUMsTUFBRDtBQUdmLE1BQUE7RUFBQSxJQUFBLEdBQU87RUFFUCxTQUFBLEdBQVk7RUFFWixRQUFBLEdBQVcsQ0FBQSxDQUFFLGdCQUFGLENBQW1CLENBQUMsT0FBcEIsQ0FBNEI7SUFDckMsV0FBQSxFQUFrQixzQkFEbUI7SUFFckMsWUFBQSxFQUFrQixxQkFGbUI7SUFHckMsZUFBQSxFQUFrQixJQUhtQjtJQUlyQyxrQkFBQSxFQUFvQixDQUppQjtHQUE1QjtFQU9YLG9CQUFBLEdBQXVCLFNBQUE7QUFDckIsUUFBQTtJQUFBLFVBQUEsR0FBYSxDQUFBLENBQUUsZ0JBQUY7V0FDYixVQUFVLENBQUMsTUFBWCxDQUFBLENBQUEsR0FBc0IsVUFBVSxDQUFDLE1BQVgsQ0FBQSxDQUFtQixDQUFDLEdBQTFDLEdBQWdELENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxNQUFWLENBQUEsQ0FBQSxHQUFxQixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsU0FBVixDQUFBO0VBRmhEO0VBSXZCLHFCQUFBLEdBQXdCLFNBQUE7SUFDdEIsSUFBRyxvQkFBQSxDQUFBLENBQUg7YUFDRSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsT0FBVixDQUFrQixnQkFBbEIsRUFERjs7RUFEc0I7RUFNeEIsTUFBQSxHQUFTLFNBQUE7QUFFUCxRQUFBO0lBQUEsSUFBQSxDQUFPLFNBQVA7TUFDRSxJQUFHLElBQUEsR0FBTyxRQUFRLENBQUMsSUFBVCxDQUFjLGtCQUFkLENBQVY7UUFFRSxRQUFBLEdBQVcsSUFBQSxHQUFPO1FBQ2xCLFNBQUEsR0FBWTtRQUVaLFFBQVEsQ0FBQyxPQUFULENBQWlCLE1BQWpCLEVBQXlCLGdCQUF6QixFQUEyQyxTQUFBO1VBQ3pDLFNBQUEsR0FBWTtpQkFDWixJQUFBO1FBRnlDLENBQTNDO2VBSUEsQ0FBQyxDQUFDLElBQUYsQ0FDRTtVQUFBLEdBQUEsRUFBSyxvQkFBQSxHQUF1QixRQUE1QjtTQURGLENBR0EsQ0FBQyxJQUhELENBR08sU0FBRSxJQUFGO0FBQ0wsY0FBQTtVQUFBLElBQUEsR0FBUSxPQUFBLEdBQVUsSUFBVixHQUFpQjtVQUN6QixNQUFBLEdBQVMsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxxQkFBYjtVQUNULFFBQVEsQ0FBQyxNQUFULENBQWlCLE1BQWpCO2lCQUNBLFFBQVEsQ0FBQyxPQUFULENBQWtCLFVBQWxCLEVBQThCLE1BQTlCO1FBSkssQ0FIUCxFQVRGO09BREY7O0VBRk87RUF3QlQsUUFBUSxDQUFDLEVBQVQsQ0FBWTtJQUFBLGNBQUEsRUFBZ0IsU0FBQTtNQUMxQixPQUFPLENBQUMsR0FBUixDQUFhLCtCQUFiO01BQ0EsQ0FBQSxDQUFFLGlCQUFGLENBQW9CLENBQUMsR0FBckIsQ0FBeUIsU0FBekIsRUFBb0MsR0FBcEM7YUFDQSxPQUFPLENBQUMsR0FBUixDQUFhLCtCQUFiO0lBSDBCOztBQUs1Qjs7Ozs7OztPQUxZO0dBQVo7RUFjQSxhQUFBLEdBQWdCLENBQUEsQ0FBRSxvQkFBRjtFQUVoQixJQUFHLGFBQUg7SUFDRSxhQUFhLENBQUMsRUFBZCxDQUFpQixPQUFqQixFQUEwQixDQUFBLFNBQUEsS0FBQTthQUFBLFNBQUMsS0FBRDtRQUN4QixLQUFLLENBQUMsY0FBTixDQUFBO2VBQ0EsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxNQUFYLEVBQW1CLENBQW5CO01BRndCO0lBQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUExQixFQURGOztFQUtBLElBQUcsUUFBUSxDQUFDLE1BQVQsR0FBa0IsQ0FBckI7SUFDRSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsU0FBQTthQUNuQixRQUFRLENBQUMsT0FBVCxDQUFBO0lBRG1CLENBQXJCO0lBR0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLENBQUMsQ0FBQyxRQUFGLENBQVkscUJBQVosRUFBb0MsQ0FBcEMsQ0FBdkI7V0FDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLGdCQUFiLEVBQStCLE1BQS9CLEVBTEY7O0FBckVlOzs7Ozs7Ozs7Ozs7Ozs7QUNUakI7Ozs7Ozs7O0lBRXFCLGdCOzs7Ozs7OzJCQUVMOztBQUVaLFVBQUssa0JBQWtCLE1BQW5CLElBQThCLE9BQU8sYUFBUCxJQUF3QixvQkFBb0IsYUFBOUUsRUFBNkY7O0FBRTNGOztBQUVBLDhCQUFFLFFBQUYsRUFDRyxFQURILENBQ00sWUFETixFQUNvQix5QkFEcEIsRUFDK0MsVUFBUyxDQUFULEVBQVk7QUFDdkQsY0FBSSxFQUFFLE1BQUYsQ0FBUyxPQUFULElBQW9CLElBQXhCLEVBQThCO0FBQzVCLGtDQUFFLElBQUYsRUFBUSxXQUFSLENBQW9CLFFBQXBCO0FBQ0Q7QUFDRixTQUxIO0FBT0QsT0FYRCxNQVdPOztBQUVMLDhCQUFFLFFBQUYsRUFDRyxFQURILENBQ00sT0FETixFQUNlLHlCQURmLEVBQzBDLFVBQVMsQ0FBVCxFQUFZO0FBQ2xELGNBQUksRUFBRSxNQUFGLENBQVMsT0FBVCxJQUFvQixJQUF4QixFQUE4QjtBQUM1QixrQ0FBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixRQUFwQjtBQUNEO0FBQ0YsU0FMSDtBQU9EOztBQUVELDRCQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVc7QUFDMUIsOEJBQUUseUJBQUYsRUFBNkIsV0FBN0IsQ0FBeUMsUUFBekM7QUFDRCxPQUZEO0FBR0Q7Ozs7OztrQkE3QmtCLGdCOzs7Ozs7QUNGckIsSUFBQSxlQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUdKLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0VBRVQsc0JBQUMsUUFBRCxFQUFXLFNBQVg7Ozs7O0lBQ1YsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFDYixJQUFDLENBQUEsT0FBRCxHQUFXLENBQUEsQ0FBRSxNQUFGO0lBQ1gsSUFBQyxDQUFBLE9BQU8sQ0FBQyxFQUFULENBQVksb0JBQVosRUFBa0MsSUFBQyxDQUFBLE1BQW5DO0lBQ0EsSUFBQyxDQUFBLE1BQUQsQ0FBQTtFQUxVOzt5QkFPWixRQUFBLEdBQVMsU0FBQTtJQUNQLElBQUEsQ0FBTyxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVYsQ0FBbUIsSUFBQyxDQUFBLFNBQXBCLENBQVA7TUFDRSxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVYsQ0FBbUIsSUFBQyxDQUFBLFNBQXBCO2FBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLENBQWtCLFVBQWxCLEVBRkY7O0VBRE87O3lCQUtULFVBQUEsR0FBVyxTQUFBO0lBQ1QsSUFBRyxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVYsQ0FBbUIsSUFBQyxDQUFBLFNBQXBCLENBQUg7TUFDRSxJQUFDLENBQUEsUUFBUSxDQUFDLFdBQVYsQ0FBc0IsSUFBQyxDQUFBLFNBQXZCO2FBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLENBQWtCLFlBQWxCLEVBRkY7O0VBRFM7O3lCQUtYLFNBQUEsR0FBVSxTQUFBO0lBQ1IsSUFBRyxJQUFDLENBQUEsUUFBUSxDQUFDLEdBQVYsQ0FBYyxVQUFkLENBQUEsS0FBNkIsT0FBaEM7YUFDRSxRQUFBLENBQVMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQUEsQ0FBVCxDQUFBLEdBQStCLFFBQUEsQ0FBUyxJQUFDLENBQUEsUUFBUSxDQUFDLFFBQVYsQ0FBQSxDQUFvQixDQUFDLEdBQTlCLEVBRGpDO0tBQUEsTUFBQTthQUdFLFFBQUEsQ0FBUyxJQUFDLENBQUEsUUFBUSxDQUFDLE1BQVYsQ0FBQSxDQUFrQixDQUFDLEdBQTVCLEVBSEY7O0VBRFE7O3lCQU9WLE1BQUEsR0FBTyxTQUFBO0lBQ0wsSUFBRyxJQUFDLENBQUEsT0FBTyxDQUFDLFNBQVQsQ0FBQSxDQUFBLEdBQXVCLElBQUMsQ0FBQSxTQUFELENBQUEsQ0FBMUI7YUFDRSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBREY7S0FBQSxNQUFBO2FBR0UsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUhGOztFQURLOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0JUOzs7Ozs7OztJQUVxQixTO0FBRXBCLG9CQUFZLEdBQVosRUFBaUI7QUFBQTs7QUFDaEIsT0FBSyxHQUFMLEdBQVcsR0FBWDtBQUNBLE9BQUssS0FBTCxHQUFhLEtBQWI7QUFDQSxPQUFLLE9BQUwsR0FBZSxzQkFBRSxLQUFLLEdBQUwsQ0FBUyxJQUFULENBQWMsa0JBQWQsQ0FBRixDQUFmO0FBQ0EsT0FBSyxFQUFMO0FBQ0E7Ozs7dUJBRUk7QUFDSixRQUFLLEdBQUwsQ0FBUyxFQUFULENBQVksT0FBWixFQUFxQixLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQXJCO0FBQ0E7Ozt5QkFFTSxLLEVBQU87QUFDYixTQUFNLGNBQU47QUFDQSxRQUFLLEtBQUwsR0FBYSxDQUFDLEtBQUssS0FBbkI7QUFDQSxPQUFJLEtBQUssS0FBVCxFQUFnQjtBQUNmLFNBQUssSUFBTDtBQUNBLElBRkQsTUFFTztBQUNOLFNBQUssS0FBTDtBQUNBO0FBQ0Q7Ozt5QkFFTTtBQUNOLE9BQUksTUFBSjtBQUNBLFFBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0IsU0FBbEI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxRQUFiLENBQXNCLFNBQXRCO0FBQ0EsUUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixFQUFwQjtBQUNBLFlBQVMsS0FBSyxPQUFMLENBQWEsTUFBYixFQUFUO0FBQ0EsUUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixDQUFwQjtBQUNBLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsTUFBcEI7QUFDRSxPQUFJLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0Isa0JBQWxCLENBQUosRUFBMkM7QUFDekMsMEJBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsR0FBekIsQ0FBNkIsVUFBN0IsRUFBeUMsUUFBekM7QUFDRDtBQUNIOzs7MEJBRU87QUFDUCxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBcEI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLENBQXBCO0FBQ0EsUUFBSyxHQUFMLENBQVMsV0FBVCxDQUFxQixTQUFyQjtBQUNBLFFBQUssT0FBTCxDQUFhLFdBQWIsQ0FBeUIsU0FBekI7QUFDRSxPQUFJLEtBQUssR0FBTCxDQUFTLFFBQVQsQ0FBa0Isa0JBQWxCLENBQUosRUFBMkM7QUFDekMsMEJBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsTUFBakIsRUFBeUIsR0FBekIsQ0FBNkIsVUFBN0IsRUFBeUMsU0FBekM7QUFDRDtBQUNIOzs7eUJBRWE7QUFDYix5QkFBRSx5QkFBRixFQUE2QixJQUE3QixDQUFrQyxZQUFXO0FBQzVDLFdBQU8sSUFBSSxTQUFKLENBQWMsc0JBQUUsSUFBRixDQUFkLENBQVA7QUFDQSxJQUZEO0FBR0E7Ozs7OztrQkFsRG1CLFM7Ozs7OztBQ0ZyQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixDQUFBLEdBQUksT0FBQSxDQUFRLFlBQVI7O0FBQ0osTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFFUix1QkFBRSxRQUFGLEVBQVksZ0JBQVo7QUFFWCxRQUFBO0lBQUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxDQUFBLENBQUUsUUFBRjtJQUNaLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQSxDQUFFLGdCQUFGO0lBQ1osS0FBQSxHQUFRLElBQUMsQ0FBQSxNQUFELENBQUE7SUFFUixJQUFBLEdBQU87SUFDUCxJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBZSxTQUFBO0FBQ2IsVUFBQTtNQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRjtNQUNSLFFBQUEsR0FBVyxDQUFDLENBQUMsUUFBRixDQUFXLENBQUEsQ0FBRSxnQ0FBRixDQUFtQyxDQUFDLElBQXBDLENBQUEsQ0FBWDtNQUVYLElBQUcsUUFBSDtRQUNFLElBQUEsR0FBTyxDQUFDLENBQUMsR0FBRixDQUFNLEtBQU4sRUFBYSxTQUFDLElBQUQ7aUJBQVMsUUFBQSxDQUFTLElBQVQ7UUFBVCxDQUFiO2VBQ1AsS0FBSyxDQUFDLE1BQU4sQ0FBYSxJQUFiLEVBRkY7O0lBSmEsQ0FBZjtFQVBXOzswQkFlYixNQUFBLEdBQVEsU0FBQTtBQUNOLFFBQUE7SUFBQSxLQUFBLEdBQVE7SUFDUixJQUFDLENBQUEsUUFBUSxDQUFDLElBQVYsQ0FBZSxnQkFBZixDQUFnQyxDQUFDLElBQWpDLENBQXNDLFNBQUE7QUFDcEMsVUFBQTtNQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRjtNQUNSLEVBQUEsR0FBSyxLQUFLLENBQUMsSUFBTixDQUFXLElBQVg7TUFDTCxJQUFBLENBQXVDLEVBQXZDO1FBQUEsRUFBQSxHQUFLLEtBQUssQ0FBQyxJQUFOLENBQVcsR0FBWCxDQUFlLENBQUMsSUFBaEIsQ0FBcUIsSUFBckIsRUFBTDs7TUFDQSxJQUFHLEVBQUg7ZUFDRSxLQUFLLENBQUMsSUFBTixDQUFXO1VBQUUsRUFBQSxFQUFJLEVBQU47VUFBVSxJQUFBLEVBQU0sS0FBSyxDQUFDLElBQU4sQ0FBQSxDQUFoQjtTQUFYLEVBREY7O0lBSm9DLENBQXRDO1dBT0E7RUFUTTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ25CVjs7Ozs7Ozs7SUFFcUIsaUI7Ozs7Ozs7MkJBRUw7O0FBRVosVUFBSSxlQUFlLHNCQUFFLE1BQUYsRUFBVSxNQUFWLEVBQW5CO0FBQUEsVUFDSSxTQUFTLHNCQUFFLHFCQUFGLENBRGI7QUFBQSxVQUVJLHdCQUF3QixLQUY1Qjs7QUFJQSxVQUFJLE9BQU8sT0FBUCxLQUFvQixXQUF4QixFQUFxQztBQUNuQztBQUNBO0FBQ0E7QUFDQSxZQUFJLGVBQWUsa0JBQWYsSUFBcUMsU0FBekMsRUFBb0Q7QUFDbEQ7QUFDQSxrQ0FBd0IsSUFBeEI7QUFDRCxTQUhELE1BR087QUFDTDtBQUNBLGNBQUksZUFBZSxrQkFBZixJQUFxQyxLQUF6QyxFQUFnRDtBQUM5QyxvQ0FBd0IsS0FBeEI7QUFDRDtBQUNGO0FBQ0Y7O0FBRUQsNEJBQUUsTUFBRixFQUFVLE1BQVYsQ0FBaUIsWUFBVztBQUMxQixZQUFJLFlBQVksc0JBQUUsUUFBRixFQUFZLFNBQVosRUFBaEI7QUFDQSxZQUFJLFlBQVksWUFBWixJQUE0QixxQkFBaEMsRUFBdUQ7QUFDckQsaUJBQU8sUUFBUCxDQUFnQixjQUFoQjtBQUNELFNBRkQsTUFFTztBQUNMLGlCQUFPLFdBQVAsQ0FBbUIsY0FBbkI7QUFDRDtBQUNGLE9BUEQ7O0FBU0EsNEJBQUUsUUFBRixFQUNHLEVBREgsQ0FDTSxPQUROLEVBQ2Usa0NBRGYsRUFDbUQsWUFBVztBQUMxRCxlQUFPLElBQVA7QUFDQSx1QkFBZSxrQkFBZixHQUFvQyxLQUFwQztBQUNELE9BSkgsRUFLRyxFQUxILENBS00sT0FMTixFQUtlLHNCQUxmLEVBS3VDLFlBQVc7QUFDOUM7QUFDRCxPQVBILEVBUUcsRUFSSCxDQVFNLE9BUk4sRUFRZSx1QkFSZixFQVF3QyxVQUFTLENBQVQsRUFBWTtBQUNoRCxVQUFFLGNBQUY7QUFDQSxxQkFBYSxZQUFXO0FBQ3BCLHFCQUFXLFlBQVc7QUFDbEI7QUFDSCxXQUZELEVBRUcsR0FGSDtBQUdILFNBSkQ7QUFLRCxPQWZILEVBZ0JHLEVBaEJILENBZ0JNLE9BaEJOLEVBZ0JlLG9DQWhCZixFQWdCcUQsVUFBUyxDQUFULEVBQVk7QUFDN0QsOEJBQUUsdUJBQUYsRUFBMkIsV0FBM0IsQ0FBdUMsY0FBdkMsRUFBdUQsUUFBdkQsQ0FBZ0UsY0FBaEU7QUFDRCxPQWxCSDs7QUFvQkEsZUFBUyxZQUFULENBQXNCLFFBQXRCLEVBQWdDO0FBQzVCLDhCQUFFLHVCQUFGLEVBQTJCLFdBQTNCLENBQXVDLGNBQXZDO0FBQ0EsWUFBRyxPQUFPLFFBQVAsSUFBbUIsVUFBdEIsRUFBaUM7QUFDN0I7QUFDSDtBQUNKOztBQUVELGVBQVMsZUFBVCxHQUEyQjtBQUN2Qiw4QkFBRSx1QkFBRixFQUEyQixXQUEzQixDQUF1QyxjQUF2QztBQUNIO0FBQ0Y7Ozs7OztrQkE5RGtCLGlCOzs7Ozs7Ozs7Ozs7OztBQ0ZyQjs7Ozs7Ozs7SUFFcUIsWTs7Ozs7OzsrQkFFTDtBQUNaLGdCQUFJLFVBQUosRUFBZ0IsYUFBaEI7QUFDQSxnQkFBSSxhQUFhLElBQUksTUFBSixDQUFXLGNBQVgsRUFBMkI7QUFDeEMsNEJBQVkscUJBRDRCO0FBRXhDLDRCQUFZLHFCQUY0QjtBQUd4Qyw4QkFBYztBQUgwQixhQUEzQixDQUFqQjtBQUtBLGdCQUFJLGdCQUFnQixJQUFJLE1BQUosQ0FBVyxpQkFBWCxFQUE4QjtBQUM5Qyw4QkFBYyxDQURnQztBQUU5QyxnQ0FBZ0IsSUFGOEI7QUFHOUMsK0JBQWUsTUFIK0I7QUFJOUMsNEJBQVksR0FKa0M7QUFLOUMscUNBQXFCO0FBTHlCLGFBQTlCLENBQXBCO0FBT0EsdUJBQVcsTUFBWCxDQUFrQixPQUFsQixHQUE0QixhQUE1QjtBQUNBLDBCQUFjLE1BQWQsQ0FBcUIsT0FBckIsR0FBK0IsVUFBL0I7QUFDRDs7Ozs7O2tCQWxCa0IsWTs7Ozs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7O0lBRXFCLE87Ozs7Ozs7MkJBRUw7QUFDWiw0QkFBRSxpQkFBRixFQUFxQixNQUFyQjtBQUNBLDRCQUFFLFFBQUYsRUFDRyxFQURILENBQ00sT0FETixFQUNlLDZDQURmLEVBQzhELFlBQVc7QUFDckUsOEJBQUUsaUJBQUYsRUFBcUIsTUFBckI7QUFDRCxPQUhIO0FBSUQ7Ozs7OztrQkFSa0IsTzs7Ozs7O0FDRnJCLElBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLFNBQUEsR0FBWSxPQUFBLENBQVEsYUFBUixDQUFzQixFQUFDLE9BQUQ7O0FBQ2xDLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUixDQUFvQixFQUFDLE9BQUQ7O0FBQzlCLFlBQUEsR0FBZSxPQUFBLENBQVEsZ0JBQVIsQ0FBeUIsRUFBQyxPQUFEOztBQUN4QyxnQkFBQSxHQUFtQixPQUFBLENBQVEsb0JBQVIsQ0FBNkIsRUFBQyxPQUFEOztBQUNoRCxpQkFBQSxHQUFvQixPQUFBLENBQVEscUJBQVIsQ0FBOEIsRUFBQyxPQUFEOztBQUNsRCxXQUFBLEdBQWMsT0FBQSxDQUFRLGVBQVI7O0FBQ2QsWUFBQSxHQUFlLE9BQUEsQ0FBUSxnQkFBUjs7QUFDZixhQUFBLEdBQWdCLE9BQUEsQ0FBUSxpQkFBUjs7QUFDaEIsY0FBQSxHQUFpQixPQUFBLENBQVEsa0JBQVI7O0FBQ2pCLE9BQUEsR0FBVSxPQUFBLENBQVEsV0FBUjs7QUFDVixNQUFBLEdBQVMsT0FBQSxDQUFRLGtEQUFSOztBQUdULENBQUEsQ0FBRSxTQUFBO1NBS0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFNBQUE7V0FDbkIsQ0FBQSxDQUFFLGlDQUFGLENBQ0EsQ0FBQyxLQURELENBQ08sSUFEUCxDQUVBLENBQUMsS0FGRCxDQUVRLFNBQUE7YUFBTSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsUUFBUixDQUFpQiw2QkFBakIsQ0FBK0MsQ0FBQyxPQUFoRCxDQUFBO0lBQU4sQ0FGUjtFQURtQixDQUFyQjtBQUxBLENBQUY7O0FBK0NBLENBQUEsQ0FBRSxTQUFBO1NBQ0EsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLFdBQVosQ0FBd0IsU0FBQyxLQUFELEVBQVEsR0FBUixFQUFhLFFBQWI7QUFDdEIsUUFBQTtJQUFBLEdBQUEsR0FBTSxRQUFRLENBQUM7SUFDZixJQUFHLHdDQUFIO2FBQ0UsRUFBQSxDQUFHLE1BQUgsRUFBVyxVQUFYLEVBQXVCLEdBQUcsQ0FBQyxPQUFKLENBQVksUUFBUSxDQUFDLE1BQXJCLEVBQTZCLEVBQTdCLENBQXZCLEVBREY7O0VBRnNCLENBQXhCO0FBREEsQ0FBRjs7QUFNQSxDQUFBLENBQUUsU0FBQTtTQUNBLFNBQVMsQ0FBQyxJQUFWLENBQUE7QUFEQSxDQUFGOztBQUdBLENBQUEsQ0FBRSxTQUFBO1NBQ0EsT0FBTyxDQUFDLElBQVIsQ0FBQTtBQURBLENBQUY7O0FBR0EsQ0FBQSxDQUFFLFNBQUE7U0FDQSxZQUFZLENBQUMsSUFBYixDQUFBO0FBREEsQ0FBRjs7QUFHQSxDQUFBLENBQUUsU0FBQTtTQUNBLGdCQUFnQixDQUFDLElBQWpCLENBQUE7QUFEQSxDQUFGOztBQUdBLENBQUEsQ0FBRSxTQUFBO1NBQ0EsaUJBQWlCLENBQUMsSUFBbEIsQ0FBQTtBQURBLENBQUY7O0FBR0EsQ0FBQSxDQUFFLFNBQUE7U0FDQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLE1BQWIsRUFBcUIsU0FBQTtXQUNuQixDQUFBLENBQUUsb0JBQUYsQ0FBdUIsQ0FBQyxRQUF4QixDQUFpQyxlQUFqQztFQURtQixDQUFyQjtBQURBLENBQUY7O0FBSUEsQ0FBQSxDQUFFLFNBQUE7RUFDQSxJQUFBLENBQUEsQ0FBTyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsU0FBMUIsQ0FBRCxJQUEwQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsTUFBMUIsQ0FBM0MsSUFBaUYsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLFVBQTFCLENBQXpGLENBQUE7V0FDRSxDQUFBLENBQUUsT0FBRixDQUFVLENBQUMsSUFBWCxDQUFnQixVQUFoQixFQUEyQixVQUEzQixFQURGOztBQURBLENBQUY7O0FBTUEsQ0FBQSxDQUFFLFNBQUE7RUFNQSxDQUFBLENBQUUsZ0JBQUYsQ0FBbUIsQ0FBQyxLQUFwQixDQUEwQixTQUFBO0FBQ3hCLFFBQUE7SUFBQSxLQUFBLEdBQVE7SUFDUixDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsT0FBaEIsQ0FBd0I7TUFBQyxTQUFBLEVBQVUsQ0FBWDtLQUF4QixFQUF1QyxLQUF2QyxFQUE4QyxhQUE5QztBQUNBLFdBQU87RUFIaUIsQ0FBMUI7U0FVQSxDQUFBLENBQUUsU0FBQTtBQUVBLFFBQUE7SUFBQSxPQUFBLEdBQVUsU0FBQyxLQUFEO0FBRVIsVUFBQTtNQUFBLElBQUcsS0FBSDtRQUNFLEtBQUssQ0FBQyxjQUFOLENBQUEsRUFERjs7TUFFQSxJQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBZCxHQUF1QixDQUExQjtRQUNFLFNBQUEsR0FBWSxDQUFBLENBQUUsUUFBUSxDQUFDLElBQVgsQ0FBZ0IsQ0FBQyxNQUFqQixDQUFBLENBQXlCLENBQUM7UUFDdEMsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFNBQVYsQ0FBb0IsU0FBQSxHQUFZLEdBQWhDLEVBRkY7O2FBR0E7SUFQUTtJQVNWLE9BQUEsQ0FBQTtJQUVBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsWUFBYixFQUEyQixPQUEzQjtXQUdBLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLEVBQXZCLENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLEVBQXdDLFNBQUMsS0FBRDtBQUV0QyxVQUFBO01BQUEsSUFBQSxHQUFPLElBQUMsQ0FBQztNQUNULE9BQUEsR0FBVSxDQUFBLENBQUUsSUFBRjtNQUNWLElBQUcsT0FBTyxDQUFDLE1BQVg7UUFDRSxLQUFLLENBQUMsY0FBTixDQUFBO1FBQ0EsU0FBQSxHQUFZLE9BQU8sQ0FBQyxNQUFSLENBQUEsQ0FBZ0IsQ0FBQyxHQUFqQixHQUF1QjtlQUNuQyxDQUFBLENBQUUsWUFBRixDQUFlLENBQUMsT0FBaEIsQ0FBd0I7VUFBQyxTQUFBLEVBQVUsU0FBWDtTQUF4QixFQUErQyxHQUEvQyxFQUFvRCxhQUFwRCxDQUFrRSxDQUFDLE9BQW5FLENBQUEsQ0FBNEUsQ0FBQyxJQUE3RSxDQUFrRixTQUFBLEdBQUEsQ0FBbEYsRUFIRjs7SUFKc0MsQ0FBeEM7RUFoQkEsQ0FBRjtBQWhCQSxDQUFGOztBQThDQSxDQUFBLENBQUUsU0FBQTtBQUdBLE1BQUE7RUFBQSxlQUFBLEdBQWtCLENBQUEsQ0FBRSx3QkFBRjtFQUVsQixJQUFHLGVBQWUsQ0FBQyxNQUFuQjtJQUNNLElBQUEsT0FBQSxDQUFRO01BQ1YsU0FBQSxFQUFXLGdCQUREO01BRVYsS0FBQSxFQUFPLHNCQUZHO01BR1YsSUFBQSxFQUFNLHFCQUhJO0tBQVI7SUFPSixDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLFVBQWIsRUFBd0IsU0FBQyxLQUFEO2FBQ3RCLFdBQUEsQ0FBYSxRQUFRLENBQUMsSUFBdEI7SUFEc0IsQ0FBeEI7O0FBSUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQVpGOztTQWlDQSxXQUFBLEdBQWMsU0FBRSxJQUFGLEVBQVMsVUFBVDtBQUNaLFFBQUE7SUFBQSxNQUFBLEdBQVMsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFNBQVYsQ0FBQTtJQUVULE1BQUEsR0FBUyxRQUFRLENBQUMsYUFBVCxDQUF1QixHQUF2QjtJQUNULE1BQU0sQ0FBQyxJQUFQLEdBQWM7SUFFZCxPQUFPLENBQUMsR0FBUixDQUFZLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBaEIsQ0FBdUIsQ0FBdkIsQ0FBeUIsQ0FBQyxLQUExQixDQUFnQyxHQUFoQyxDQUFvQyxDQUFDLE1BQWpEO0lBRUEsSUFBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWhCLENBQXVCLENBQXZCLENBQXlCLENBQUMsS0FBMUIsQ0FBZ0MsR0FBaEMsQ0FBb0MsQ0FBQyxNQUFyQyxHQUE4QyxDQUFqRDthQUVFLENBQUMsQ0FBQyxJQUFGLENBQ0U7UUFBQSxHQUFBLEVBQUssSUFBTDtPQURGLENBR0EsQ0FBQyxJQUhELENBR08sQ0FBQSxTQUFBLEtBQUE7ZUFBQSxTQUFFLElBQUY7QUFDTCxjQUFBO1VBQUEsZUFBZSxDQUFDLEdBQWhCLENBQW9CLGVBQXBCLEVBQXFDLFNBQUE7WUFDbkMsSUFBRyxVQUFIO2NBQ0UsT0FBTyxDQUFDLFNBQVIsQ0FBa0I7Z0JBQUMsSUFBQSxFQUFNLElBQVA7ZUFBbEIsRUFBZ0MsRUFBaEMsRUFBb0MsSUFBcEMsRUFERjs7WUFFQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjO2NBQUEsUUFBQSxFQUFVLFFBQVY7YUFBZDttQkFFQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsR0FBVixDQUFjLFFBQWQsRUFBd0IsU0FBQTtxQkFDdEIsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFNBQVYsQ0FBb0IsTUFBcEI7WUFEc0IsQ0FBeEI7VUFMbUMsQ0FBckM7VUFVQSxJQUFBLEdBQVEsT0FBQSxHQUFVLElBQVYsR0FBaUI7VUFDekIsUUFBQSxHQUFXLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsc0JBQWI7VUFDWCxlQUFlLENBQUMsSUFBaEIsQ0FBcUIsUUFBckI7VUFDQSxlQUFlLENBQUMsUUFBaEIsQ0FBeUIsV0FBekI7aUJBQ0EsZUFBZSxDQUFDLEdBQWhCLENBQW9CO1lBQUEsVUFBQSxFQUFZLENBQUEsQ0FBRSxXQUFGLENBQWMsQ0FBQyxNQUFmLENBQUEsQ0FBWjtXQUFwQjtRQWZLO01BQUEsQ0FBQSxDQUFBLENBQUEsSUFBQSxDQUhQLEVBRkY7S0FBQSxNQUFBO01BMEJFLElBQUcsZUFBZSxDQUFDLE1BQW5CO1FBQ0UsZUFBZSxDQUFDLFdBQWhCLENBQTRCLFdBQTVCO1FBQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEdBQVYsQ0FBYztVQUFBLFFBQUEsRUFBVSxTQUFWO1NBQWQ7UUFDQSxJQUFHLFVBQUg7aUJBQ0UsT0FBTyxDQUFDLFNBQVIsQ0FBa0I7WUFBQyxJQUFBLEVBQU0sSUFBUDtXQUFsQixFQUFnQyxFQUFoQyxFQUFvQyxJQUFwQyxFQURGO1NBSEY7T0FBQSxNQUFBO1FBTUUsSUFBRyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQWxCLENBQTBCLGFBQTFCLENBQUEsR0FBMkMsQ0FBQyxDQUEvQztpQkFDRSxRQUFRLENBQUMsTUFBVCxDQUFBLEVBREY7U0FORjtPQTFCRjs7RUFSWTtBQXRDZCxDQUFGOztBQXVGQSxDQUFBLENBQUUsU0FBQTtBQUNBLE1BQUE7RUFBQSxNQUFBLEdBQWEsSUFBQSxNQUFBLENBQU8sY0FBUCxFQUF1QjtJQUNsQyxZQUFBLEVBQWMsQ0FEb0I7SUFHbEMsSUFBQSxFQUFNLEtBSDRCO0lBSWxDLEtBQUEsRUFBTyxHQUoyQjtJQUtsQyxRQUFBLEVBQVUsSUFMd0I7SUFNbEMsNEJBQUEsRUFBOEIsS0FOSTtJQU9sQyxVQUFBLEVBQVksMEJBUHNCO0lBUWxDLG1CQUFBLEVBQXFCLElBUmE7R0FBdkI7U0FZVCxJQUFBLE1BQUEsQ0FBTyxjQUFQLEVBQXVCO0lBQ3pCLFlBQUEsRUFBYyxDQURXO0lBRXpCLEtBQUEsRUFBTyxJQUZrQjtJQUd6QixRQUFBLEVBQVUsSUFIZTtJQUl6QixNQUFBLEVBQVEsTUFKaUI7SUFLekIsNEJBQUEsRUFBOEIsS0FMTDtHQUF2QjtBQWJKLENBQUY7OztBQXFCQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLElBQVYsQ0FBZSxTQUFBO1NBRWIsQ0FBQSxDQUFFLG1CQUFGLENBQXNCLENBQUMsSUFBdkIsQ0FBNEIsU0FBQTtJQUMxQixDQUFBLENBQUUsSUFBRixDQUFJLENBQUMsSUFBTCxDQUFVLGVBQVYsQ0FBMEIsQ0FBQyxRQUEzQixDQUFvQyxjQUFwQztJQUNBLENBQUEsQ0FBRSxJQUFGLENBQUksQ0FBQyxJQUFMLENBQVUsVUFBVixDQUFxQixDQUFDLFFBQXRCLENBQStCLGdCQUEvQjtXQUNJLElBQUEsTUFBQSxDQUFRLElBQVIsRUFBVztNQUNiLFlBQUEsRUFBYyxDQUREO01BRWIsS0FBQSxFQUFPLEdBRk07TUFHYixRQUFBLEVBQVUsSUFIRztNQUliLDRCQUFBLEVBQThCLEtBSmpCO0tBQVg7RUFIc0IsQ0FBNUI7QUFGYSxDQUFmOztBQXFCQSxDQUFBLENBQUUsU0FBQTtBQUNBLE1BQUE7RUFBQSxhQUFBLEdBQXFCLElBQUEsYUFBQSxDQUFjLHVCQUFkLEVBQXVDLGlCQUF2QztFQUNyQixhQUFhLENBQUMsUUFBUSxDQUFDLEtBQXZCLENBQTZCLElBQTdCLENBQWtDLENBQUMsUUFBbkMsQ0FBNEMsQ0FBQSxDQUFFLDZCQUFGLENBQTVDO0VBRUEsTUFBQSxHQUFhLElBQUEsV0FBQSxDQUFZLHFCQUFaLEVBQW1DLG1CQUFuQztTQUViLENBQUEsQ0FBRSxpQ0FBRixDQUFvQyxDQUFDLElBQXJDLENBQTBDLFNBQUE7V0FDeEMsYUFBQSxHQUFvQixJQUFBLGNBQUEsQ0FBZSxDQUFBLENBQUUsSUFBRixDQUFmLEVBQXFCLFdBQXJCLEVBQWtDLE1BQWxDO0VBRG9CLENBQTFDLENBR0EsQ0FBQyxFQUhELENBR0ksVUFISixFQUdnQixTQUFBO1dBQ2QsQ0FBQSxDQUFFLDJCQUFGLENBQThCLENBQUMsSUFBL0IsQ0FBQTtFQURjLENBSGhCLENBTUEsQ0FBQyxFQU5ELENBTUksWUFOSixFQU1rQixTQUFBO1dBQ2hCLENBQUEsQ0FBRSwyQkFBRixDQUE4QixDQUFDLElBQS9CLENBQUE7RUFEZ0IsQ0FObEI7QUFOQSxDQUFGOztBQXFCQSxDQUFBLENBQUUsU0FBQTtFQUNBLENBQUEsQ0FBRSx3QkFBRixDQUEyQixDQUFDLElBQTVCLENBQWlDLFNBQUE7QUFDL0IsUUFBQTtJQUFBLEtBQUEsR0FBUSxDQUFBLENBQUUsSUFBRjtXQUNKLElBQUEsWUFBQSxDQUFhLEtBQWIsRUFBb0IsS0FBSyxDQUFDLElBQU4sQ0FBVyxpQkFBWCxDQUFwQjtFQUYyQixDQUFqQztFQUtBLENBQUEsQ0FBRSxXQUFGLENBQ0EsQ0FBQyxFQURELENBQ0ksVUFESixFQUNnQixTQUFBO1dBQ2QsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsV0FBckMsQ0FBaUQsV0FBakQ7RUFEYyxDQURoQixDQUlBLENBQUMsRUFKRCxDQUlJLFlBSkosRUFJa0IsU0FBQTtXQUNoQixDQUFBLENBQUUsaUNBQUYsQ0FBb0MsQ0FBQyxRQUFyQyxDQUE4QyxXQUE5QztFQURnQixDQUpsQjtFQVFBLENBQUEsQ0FBRSwyQkFBRixDQUE4QixDQUFDLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFNBQUE7V0FDekMsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsV0FBckMsQ0FBaUQsV0FBakQ7RUFEeUMsQ0FBM0M7RUFJQSxJQUFHLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLE1BQXJCLEdBQThCLENBQWpDO1dBQ0UsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsV0FBckMsQ0FBaUQsV0FBakQsRUFERjtHQUFBLE1BQUE7V0FJRSxDQUFBLENBQUUsaUNBQUYsQ0FBb0MsQ0FBQyxRQUFyQyxDQUE4QyxXQUE5QyxFQUpGOztBQWxCQSxDQUFGOztBQTJCQSxDQUFBLENBQUUsU0FBQTtBQUVBLE1BQUE7RUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLE1BQUY7RUFDVixPQUFBLEdBQVUsQ0FBQSxDQUFFLFNBQUY7RUFDVixPQUFPLENBQUMsV0FBUixDQUFBO1NBR0EsQ0FBQSxDQUFFLHVCQUFGLENBQTBCLENBQUMsSUFBM0IsQ0FBZ0MsU0FBQTtBQUM5QixRQUFBO0lBQUEsS0FBQSxHQUFRLENBQUEsQ0FBRSxJQUFGO1dBQ1IsT0FBTyxDQUFDLEVBQVIsQ0FBVyxhQUFYLEVBQTBCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUN4QixZQUFBO1FBQUEsSUFBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsU0FBMUIsQ0FBRCxJQUEwQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsTUFBMUIsQ0FBM0MsSUFBaUYsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLFVBQTFCLENBQXJGO1VBQ0UsbUJBQUEsR0FBc0IsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFjLENBQUMsR0FBZixHQUFxQixPQUFPLENBQUMsTUFBUixDQUFBO1VBQzNDLElBQUcsbUJBQUEsR0FBc0IsT0FBTyxDQUFDLFNBQVIsQ0FBQSxDQUF0QixJQUE4QyxPQUFPLENBQUMsU0FBUixDQUFBLENBQUEsR0FBc0IsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFjLENBQUMsR0FBZixHQUFxQixLQUFLLENBQUMsTUFBTixDQUFBLENBQTVGO21CQUNFLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUFZLENBQUMsSUFBYixDQUFBLEVBREY7V0FBQSxNQUFBO21CQUdFLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUFZLENBQUMsS0FBYixDQUFBLEVBSEY7V0FGRjs7TUFEd0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFCO0VBRjhCLENBQWhDO0FBUEEsQ0FBRjs7Ozs7Ozs7Ozs7QUNyVkE7Ozs7OztBQU1BLENBQUUsVUFBVSxNQUFWLEVBQW1COztBQUVyQjs7QUFFQTs7QUFFQSxNQUFJLFFBQVEsTUFBTSxTQUFOLENBQWdCLEtBQTVCOztBQUVBLFdBQVMsSUFBVCxHQUFnQixDQUFFOztBQUVsQjs7QUFFQSxXQUFTLGFBQVQsQ0FBd0IsQ0FBeEIsRUFBNEI7O0FBRTVCO0FBQ0EsUUFBSyxDQUFDLENBQU4sRUFBVTtBQUNSO0FBQ0Q7O0FBRUQ7O0FBRUE7Ozs7QUFJQSxhQUFTLGVBQVQsQ0FBMEIsV0FBMUIsRUFBd0M7QUFDdEM7QUFDQSxVQUFLLFlBQVksU0FBWixDQUFzQixNQUEzQixFQUFvQztBQUNsQztBQUNEOztBQUVEO0FBQ0Esa0JBQVksU0FBWixDQUFzQixNQUF0QixHQUErQixVQUFVLElBQVYsRUFBaUI7QUFDOUM7QUFDQSxZQUFLLENBQUMsRUFBRSxhQUFGLENBQWlCLElBQWpCLENBQU4sRUFBK0I7QUFDN0I7QUFDRDtBQUNELGFBQUssT0FBTCxHQUFlLEVBQUUsTUFBRixDQUFVLElBQVYsRUFBZ0IsS0FBSyxPQUFyQixFQUE4QixJQUE5QixDQUFmO0FBQ0QsT0FORDtBQU9EOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxRQUFJLFdBQVcsT0FBTyxPQUFQLEtBQW1CLFdBQW5CLEdBQWlDLElBQWpDLEdBQ2IsVUFBVSxPQUFWLEVBQW9CO0FBQ2xCLGNBQVEsS0FBUixDQUFlLE9BQWY7QUFDRCxLQUhIOztBQUtBOzs7OztBQUtBLGFBQVMsTUFBVCxDQUFpQixTQUFqQixFQUE0QixXQUE1QixFQUEwQztBQUN4QztBQUNBLFFBQUUsRUFBRixDQUFNLFNBQU4sSUFBb0IsVUFBVSxPQUFWLEVBQW9CO0FBQ3RDLFlBQUssT0FBTyxPQUFQLEtBQW1CLFFBQXhCLEVBQW1DO0FBQ2pDO0FBQ0E7QUFDQSxjQUFJLE9BQU8sTUFBTSxJQUFOLENBQVksU0FBWixFQUF1QixDQUF2QixDQUFYOztBQUVBLGVBQU0sSUFBSSxJQUFFLENBQU4sRUFBUyxNQUFNLEtBQUssTUFBMUIsRUFBa0MsSUFBSSxHQUF0QyxFQUEyQyxHQUEzQyxFQUFpRDtBQUMvQyxnQkFBSSxPQUFPLEtBQUssQ0FBTCxDQUFYO0FBQ0EsZ0JBQUksV0FBVyxFQUFFLElBQUYsQ0FBUSxJQUFSLEVBQWMsU0FBZCxDQUFmO0FBQ0EsZ0JBQUssQ0FBQyxRQUFOLEVBQWlCO0FBQ2YsdUJBQVUsNEJBQTRCLFNBQTVCLEdBQXdDLDRCQUF4QyxHQUNSLHFCQURRLEdBQ2dCLE9BRGhCLEdBQzBCLEdBRHBDO0FBRUE7QUFDRDtBQUNELGdCQUFLLENBQUMsRUFBRSxVQUFGLENBQWMsU0FBUyxPQUFULENBQWQsQ0FBRCxJQUFzQyxRQUFRLE1BQVIsQ0FBZSxDQUFmLE1BQXNCLEdBQWpFLEVBQXVFO0FBQ3JFLHVCQUFVLHFCQUFxQixPQUFyQixHQUErQixRQUEvQixHQUEwQyxTQUExQyxHQUFzRCxXQUFoRTtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxnQkFBSSxjQUFjLFNBQVUsT0FBVixFQUFvQixLQUFwQixDQUEyQixRQUEzQixFQUFxQyxJQUFyQyxDQUFsQjs7QUFFQTtBQUNBLGdCQUFLLGdCQUFnQixTQUFyQixFQUFpQztBQUMvQixxQkFBTyxXQUFQO0FBQ0Q7QUFDRjtBQUNEO0FBQ0EsaUJBQU8sSUFBUDtBQUNELFNBNUJELE1BNEJPO0FBQ0wsaUJBQU8sS0FBSyxJQUFMLENBQVcsWUFBVztBQUMzQixnQkFBSSxXQUFXLEVBQUUsSUFBRixDQUFRLElBQVIsRUFBYyxTQUFkLENBQWY7QUFDQSxnQkFBSyxRQUFMLEVBQWdCO0FBQ2Q7QUFDQSx1QkFBUyxNQUFULENBQWlCLE9BQWpCO0FBQ0EsdUJBQVMsS0FBVDtBQUNELGFBSkQsTUFJTztBQUNMO0FBQ0EseUJBQVcsSUFBSSxXQUFKLENBQWlCLElBQWpCLEVBQXVCLE9BQXZCLENBQVg7QUFDQSxnQkFBRSxJQUFGLENBQVEsSUFBUixFQUFjLFNBQWQsRUFBeUIsUUFBekI7QUFDRDtBQUNGLFdBWE0sQ0FBUDtBQVlEO0FBQ0YsT0EzQ0Q7QUE2Q0Q7O0FBRUQ7O0FBRUE7Ozs7OztBQU1BLE1BQUUsT0FBRixHQUFZLFVBQVUsU0FBVixFQUFxQixXQUFyQixFQUFtQztBQUM3QyxzQkFBaUIsV0FBakI7QUFDQSxhQUFRLFNBQVIsRUFBbUIsV0FBbkI7QUFDRCxLQUhEOztBQUtBLFdBQU8sRUFBRSxPQUFUO0FBRUM7O0FBRUQ7QUFDQSxNQUFLLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTVDLEVBQWtEO0FBQ2hEO0FBQ0EsV0FBUSxDQUFFLFFBQUYsQ0FBUixFQUFzQixhQUF0QjtBQUNELEdBSEQsTUFHTyxJQUFLLFFBQU8sT0FBUCx5Q0FBTyxPQUFQLE9BQW1CLFFBQXhCLEVBQW1DO0FBQ3hDLGtCQUFlLFFBQVEsUUFBUixDQUFmO0FBQ0QsR0FGTSxNQUVBO0FBQ0w7QUFDQSxrQkFBZSxPQUFPLE1BQXRCO0FBQ0Q7QUFFQSxDQXBJRCxFQW9JSSxNQXBJSjs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3J0S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgRml4ZWROYXZiYXJcbiAgY29uc3RydWN0b3I6KCBuYXZiYXJTZWxlY3RvciwgYm9keVNlbGVjdG9yICkgLT5cbiAgICBAJG5hdmJhciA9ICQgbmF2YmFyU2VsZWN0b3JcbiAgICBAJGJvZHkgPSAkIGJvZHlTZWxlY3RvclxuICAgIEBvbigpXG4gICAgQGluaXQoKVxuXG5cbiAgZ2V0TmF2YmFySGVpZ2h0OiA9PlxuICAgIEAkbmF2YmFyLmhlaWdodCgpXG5cblxuICBnZXROYXZiYXJPZmZzZXQ6ID0+XG4gICAgQCRuYXZiYXIucG9zaXRpb24oKS50b3BcblxuXG4jICBzaGlmdFdpbmRvdzogPT5cbiMgICAgc2V0VGltZW91dCggKCkgPT5cbiMgICAgICB3aW5kb3cuc2Nyb2xsQnkgMCwgLTEgKiBAZ2V0TmF2YmFySGVpZ2h0KCkgLSBAZ2V0TmF2YmFyT2Zmc2V0KClcbiMgICAgLCAwIClcblxuXG4gIGluaXQ6ID0+XG4gICAgQCRuYXZiYXIuYWRkQ2xhc3MoJ2lzLWZpeGVkJylcbiAgICBAJGJvZHkuY3NzIHBhZGRpbmdUb3A6IEBnZXROYXZiYXJIZWlnaHQoKVxuXG5cbiAgb246IC0+XG4gICAgJHdpbmRvdyA9ICQod2luZG93KVxuICAgICR3aW5kb3cucmVzaXplIEBpbml0XG5cbiAgICAkd2luZG93Lm9uIFwiaGFzaGNoYW5nZVwiLCBAc2hpZnRXaW5kb3dcblxuICAgICQoXCJib2R5XCIpLm9uIFwiY2xpY2tcIiwgXCJhXCIsIChldmVudCkgPT5cblxuI1xuIyAgICAgIGlmICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcImhyZWZcIikubWF0Y2goL14jLisvKVxuIyAgICAgICAgQHNoaWZ0V2luZG93KClcbiMgICAgICAjdG9kb1xuIyAgICAgIGlmIGxvY2F0aW9uLmhhc2ggPT0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5hdHRyKFwiaHJlZlwiKVxuIyAgICAgICAgQHNoaWZ0V2luZG93KClcbiNcbiMgICAgJHdpbmRvdy5vbiAnbG9hZCcsID0+XG4jICAgICAgaWYgbG9jYXRpb24uaGFzaFxuIyAgICAgICAgQHNoaWZ0V2luZG93KClcbiIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEZpeGVkU3ViTmF2YmFyXG5cbiAgY29uc3RydWN0b3I6KCRlbGVtZW50LCBjbGFzc0RhdGEsIG5hdmJhciktPlxuICAgIEBuYXZiYXIgPSBuYXZiYXJcbiAgICBAJGVsZW1lbnQgPSAkZWxlbWVudFxuICAgIEBjbGFzc0RhdGEgPSBjbGFzc0RhdGFcbiAgICBAJHdpbmRvdyA9ICQgd2luZG93O1xuXG4gICAgQGFjdGlvbigpXG5cbiAgICBAJHdpbmRvdy5vbiBcImxvYWQgcmVzaXplIHNjcm9sbFwiLCBAYWN0aW9uXG5cbiAgc2V0Q2xhc3M6KCkgPT5cbiAgICAjdW5sZXNzIEAkZWxlbWVudC5oYXNDbGFzcyBAY2xhc3NEYXRhXG4gICAgICBAJGVsZW1lbnQuYWRkQ2xhc3MgQGNsYXNzRGF0YVxuICAgICAgQCRlbGVtZW50LnRyaWdnZXIgXCJzZXRDbGFzc1wiXG5cbiAgdW5zZXRDbGFzczooKSA9PlxuICAgICNpZiBAJGVsZW1lbnQuaGFzQ2xhc3MgQGNsYXNzRGF0YVxuICAgICAgQCRlbGVtZW50LnJlbW92ZUNsYXNzIEBjbGFzc0RhdGFcbiAgICAgIEAkZWxlbWVudC50cmlnZ2VyIFwidW5zZXRDbGFzc1wiXG5cbiAgZ2V0T2Zmc2V0OigpID0+XG4gICAgcGFyc2VJbnQoQCRlbGVtZW50Lm9mZnNldCgpLnRvcClcblxuXG4gIGFjdGlvbjooKSA9PlxuICAgIGlmIEAkd2luZG93LnNjcm9sbFRvcCgpIDwgIEBnZXRPZmZzZXQoKSAtIHBhcnNlSW50KEBuYXZiYXIuZ2V0TmF2YmFySGVpZ2h0KCkpXG4gICAgICBAdW5zZXRDbGFzcygpXG4gICAgZWxzZVxuICAgICAgQHNldENsYXNzKClcblxuIiwiXHJcbl8gPSByZXF1aXJlKCd1bmRlcnNjb3JlJylcclxuJCA9IHJlcXVpcmUoJ2pxdWVyeScpXHJcbnJlcXVpcmUoJ2pxdWVyeS1icmlkZ2V0JylcclxuJC5icmlkZ2V0KCAncGFja2VyeScsIHJlcXVpcmUoJ3BhY2tlcnknKSApXHJcblxyXG5cclxuXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChvcHRpb24pIC0+XHJcblxyXG5cclxuICBwYWdlID0gMVxyXG5cclxuICBpc0xvYWRpbmcgPSBmYWxzZVxyXG5cclxuICAkbWFzb25yeSA9ICQoJ1tkYXRhLW1hc29ucnldJykucGFja2VyeSh7XHJcbiAgICBjb2x1bW5XaWR0aDogICAgICAnW2RhdGEtbWFzb25yeS1zaXplcl0nXHJcbiAgICBpdGVtU2VsZWN0b3I6ICAgICAnW2RhdGEtbWFzb25yeS1pdGVtXSdcclxuICAgIHBlcmNlbnRQb3NpdGlvbjogIHRydWUsXHJcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IDBcclxuICB9KVxyXG5cclxuICBpc0NvbnRlbnRzT3ZlclNjcmVlbiA9IC0+XHJcbiAgICAkY29udGFpbmVyID0gJCgnW2RhdGEtbWFzb25yeV0nKVxyXG4gICAgJGNvbnRhaW5lci5oZWlnaHQoKSArICRjb250YWluZXIub2Zmc2V0KCkudG9wIDwgJCh3aW5kb3cpLmhlaWdodCgpICsgJCh3aW5kb3cpLnNjcm9sbFRvcCgpXHJcblxyXG4gIHRyaWdnZXJTY3JvbGxUb0JvdHRvbSA9IC0+XHJcbiAgICBpZiBpc0NvbnRlbnRzT3ZlclNjcmVlbigpXHJcbiAgICAgICQod2luZG93KS50cmlnZ2VyICdzY3JvbGxUb0JvdHRvbSdcclxuXHJcblxyXG5cclxuICBhcHBlbmQgPSAtPlxyXG5cclxuICAgIHVubGVzcyBpc0xvYWRpbmdcclxuICAgICAgaWYgcGFnZSA8ICRtYXNvbnJ5LmRhdGEoJ21hc29ucnktbWF4LXBhZ2UnKVxyXG5cclxuICAgICAgICBuZXh0UGFnZSA9IHBhZ2UgKyAxO1xyXG4gICAgICAgIGlzTG9hZGluZyA9IHRydWVcclxuXHJcbiAgICAgICAgJG1hc29ucnkucGFja2VyeSAnb25jZScsICdsYXlvdXRDb21wbGV0ZScsICgpIC0+XHJcbiAgICAgICAgICBpc0xvYWRpbmcgPSBmYWxzZVxyXG4gICAgICAgICAgcGFnZSsrXHJcblxyXG4gICAgICAgICQuYWpheChcclxuICAgICAgICAgIHVybDogJy9leHBlcmllbmNlcy9wYWdlLycgKyBuZXh0UGFnZVxyXG4gICAgICAgIClcclxuICAgICAgICAuZG9uZSggKCBkYXRhICkgLT5cclxuICAgICAgICAgIGh0bWwgPSAgJzxkaXY+JyArIGRhdGEgKyAnPC9kaXY+J1xyXG4gICAgICAgICAgJGl0ZW1zID0gJChodG1sKS5maW5kKCdbZGF0YS1tYXNvbnJ5LWl0ZW1dJylcclxuICAgICAgICAgICRtYXNvbnJ5LmFwcGVuZCggJGl0ZW1zIClcclxuICAgICAgICAgICRtYXNvbnJ5LnBhY2tlcnkoICdhcHBlbmRlZCcsICRpdGVtcyApXHJcbiAgICAgICAgKVxyXG5cclxuICAjYXBwZW5kKClcclxuXHJcbiAgJG1hc29ucnkub24gbGF5b3V0Q29tcGxldGU6IC0+XHJcbiAgICBjb25zb2xlLmxvZyggJ1BhY2tlcnkgbGF5b3V0IGNvbXBsZXRlZCBvbiAxJyApXHJcbiAgICAkKCcucC12b2ljZXNfX2l0ZW0nKS5jc3MoJ29wYWNpdHknLCAnMScpO1xyXG4gICAgY29uc29sZS5sb2coICdQYWNrZXJ5IGxheW91dCBjb21wbGV0ZWQgb24gMicgKVxyXG4gIFxyXG4gICMjI1xyXG4gICRncmlkLm9uKCAnbGF5b3V0Q29tcGxldGUnLFxyXG4gICAgZnVuY3Rpb24oIGV2ZW50LCBsYWlkT3V0SXRlbXMgKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCAnUGFja2VyeSBsYXlvdXQgY29tcGxldGVkIG9uICcgK1xyXG4gICAgICAgIGxhaWRPdXRJdGVtcy5sZW5ndGggKyAnIGl0ZW1zJyApO1xyXG4gICAgfVxyXG4gICk7XHJcbiAgIyMjXHJcblxyXG4gICRhcHBlbmRCdXR0b24gPSAkKCdbZGF0YS10aWxlLWFwcGVuZF0nKVxyXG5cclxuICBpZiAkYXBwZW5kQnV0dG9uXHJcbiAgICAkYXBwZW5kQnV0dG9uLm9uICdjbGljaycsIChldmVudCkgPT5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBfLnRocm90dGxlKGFwcGVuZCwgMClcclxuXHJcbiAgaWYgJG1hc29ucnkubGVuZ3RoID4gMFxyXG4gICAgJCh3aW5kb3cpLm9uICdsb2FkJywgKCkgLT5cclxuICAgICAgJG1hc29ucnkucGFja2VyeSgpXHJcblxyXG4gICAgJCh3aW5kb3cpLm9uICdzY3JvbGwnLCBfLnRocm90dGxlKCB0cmlnZ2VyU2Nyb2xsVG9Cb3R0b20gLCAwIClcclxuICAgICQod2luZG93KS5vbiAnc2Nyb2xsVG9Cb3R0b20nLCBhcHBlbmRcclxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYmlsZU5hdmlnYXRpb24ge1xyXG5cclxuICBzdGF0aWMgaW5pdCgpIHtcclxuICAgIFxyXG4gICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkgeyBcclxuICAgIFxyXG4gICAgICAvLyBUb3VjaCBldmVudHMgYXJlIHN1cHBvcnRlZFxyXG4gICAgICBcclxuICAgICAgJChkb2N1bWVudClcclxuICAgICAgICAub24oJ3RvdWNoc3RhcnQnLCAnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PSAnTEknKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgXHJcbiAgICAgICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLm9uKCdjbGljaycsICcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09ICdMSScpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSIsIiQgPSByZXF1aXJlICdqcXVlcnknXG5cblxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTY3JvbGxBY3Rpb25cblxuICBjb25zdHJ1Y3RvcjooJGVsZW1lbnQsIGNsYXNzRGF0YSktPlxuICAgIEAkZWxlbWVudCA9ICRlbGVtZW50XG4gICAgQGNsYXNzRGF0YSA9IGNsYXNzRGF0YVxuICAgIEAkd2luZG93ID0gJCB3aW5kb3c7XG4gICAgQCR3aW5kb3cub24gXCJsb2FkIHJlc2l6ZSBzY3JvbGxcIiwgQGFjdGlvblxuICAgIEBhY3Rpb24oKVxuXG4gIHNldENsYXNzOigpID0+XG4gICAgdW5sZXNzIEAkZWxlbWVudC5oYXNDbGFzcyBAY2xhc3NEYXRhXG4gICAgICBAJGVsZW1lbnQuYWRkQ2xhc3MgQGNsYXNzRGF0YVxuICAgICAgQCRlbGVtZW50LnRyaWdnZXIgXCJzZXRDbGFzc1wiXG5cbiAgdW5zZXRDbGFzczooKSA9PlxuICAgIGlmIEAkZWxlbWVudC5oYXNDbGFzcyBAY2xhc3NEYXRhXG4gICAgICBAJGVsZW1lbnQucmVtb3ZlQ2xhc3MgQGNsYXNzRGF0YVxuICAgICAgQCRlbGVtZW50LnRyaWdnZXIgXCJ1bnNldENsYXNzXCJcblxuICBnZXRPZmZzZXQ6KCkgPT5cbiAgICBpZiBAJGVsZW1lbnQuY3NzKCdwb3NpdGlvbicpID09IFwiZml4ZWRcIlxuICAgICAgcGFyc2VJbnQoQCRlbGVtZW50LmhlaWdodCgpKSArIHBhcnNlSW50KEAkZWxlbWVudC5wb3NpdGlvbigpLnRvcClcbiAgICBlbHNlXG4gICAgICBwYXJzZUludChAJGVsZW1lbnQub2Zmc2V0KCkudG9wKVxuXG5cbiAgYWN0aW9uOigpID0+XG4gICAgaWYgQCR3aW5kb3cuc2Nyb2xsVG9wKCkgPCBAZ2V0T2Zmc2V0KClcbiAgICAgIEB1bnNldENsYXNzKClcbiAgICBlbHNlXG4gICAgICBAc2V0Q2xhc3MoKVxuXG5cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZU1lbnUge1xyXG5cclxuXHRjb25zdHJ1Y3RvcigkZWwpIHtcclxuXHRcdHRoaXMuJGVsID0gJGVsO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kdGFyZ2V0ID0gJCh0aGlzLiRlbC5kYXRhKFwic2xpZGVtZW51LXRhcmdldFwiKSk7XHJcblx0XHR0aGlzLm9uKCk7XHJcblx0fVxyXG5cclxuXHRvbigpIHtcclxuXHRcdHRoaXMuJGVsLm9uKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0dG9nZ2xlKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9ICF0aGlzLnN0YXRlO1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUpIHtcclxuXHRcdFx0dGhpcy5vcGVuKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvcGVuKCkge1xyXG5cdFx0dmFyIGhlaWdodDtcclxuXHRcdHRoaXMuJGVsLmFkZENsYXNzKFwiaXMtb3BlblwiKTtcclxuXHRcdHRoaXMuJHRhcmdldC5hZGRDbGFzcyhcImlzLW9wZW5cIik7XHJcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KFwiXCIpO1xyXG5cdFx0aGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpO1xyXG5cdFx0dGhpcy4kdGFyZ2V0LmhlaWdodCgwKTtcclxuXHRcdHRoaXMuJHRhcmdldC5oZWlnaHQoaGVpZ2h0KTtcclxuICAgIGlmICh0aGlzLiRlbC5oYXNDbGFzcygncC1uYXZiYXJfX3RvZ2dsZScpKSB7XHJcbiAgICAgICQoJ2JvZHknKS5oZWlnaHQoaGVpZ2h0KS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgfVxyXG5cdH1cclxuXHJcblx0Y2xvc2UoKSB7XHJcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KHRoaXMuJHRhcmdldC5oZWlnaHQoKSk7XHJcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KDApO1xyXG5cdFx0dGhpcy4kZWwucmVtb3ZlQ2xhc3MoXCJpcy1vcGVuXCIpO1xyXG5cdFx0dGhpcy4kdGFyZ2V0LnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcclxuICAgIGlmICh0aGlzLiRlbC5oYXNDbGFzcygncC1uYXZiYXJfX3RvZ2dsZScpKSB7XHJcbiAgICAgICQoJ2JvZHknKS5oZWlnaHQoJ2F1dG8nKS5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuICAgIH1cclxuXHR9XHJcbiAgXHJcblx0c3RhdGljIGluaXQoKSB7XHJcblx0XHQkKFwiW2RhdGEtc2xpZGVtZW51LXRhcmdldF1cIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTbGlkZU1lbnUoJCh0aGlzKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG59IiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcbl8gPSByZXF1aXJlICd1bmRlcnNjb3JlJ1xubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTdWJOYXZpZ2F0aW9uXG5cbiAgY29uc3RydWN0b3I6ICggc2VsZWN0b3IsIGNvbnRlbnRzU2VsZWN0b3IgKSAtPlxuXG4gICAgQCRlbGVtZW50ID0gJCBzZWxlY3RvclxuICAgIEAkY29udGVudCA9ICQgY29udGVudHNTZWxlY3RvclxuICAgIGl0ZW1zID0gQGNyZWF0ZSgpXG5cbiAgICBzZWxmID0gQFxuICAgIEAkZWxlbWVudC5lYWNoICgpIC0+XG4gICAgICAkdGhpcyA9ICQoQClcbiAgICAgIHRlbXBsYXRlID0gXy50ZW1wbGF0ZSAkKCdbZGF0YS1zdWItbmF2aWdhdGlvbi10ZW1wbGF0ZV0nKS50ZXh0KClcblxuICAgICAgaWYgdGVtcGxhdGVcbiAgICAgICAgaHRtbCA9IF8ubWFwIGl0ZW1zLCAoaXRlbSktPiB0ZW1wbGF0ZSBpdGVtXG4gICAgICAgICR0aGlzLmFwcGVuZCBodG1sXG5cbiAgY3JlYXRlOiAtPlxuICAgIGl0ZW1zID0gW11cbiAgICBAJGNvbnRlbnQuZmluZCgnaDEsIGgyLCBoMywgaDQnKS5lYWNoICgpIC0+XG4gICAgICAkdGhpcyA9ICQgQFxuICAgICAgaWQgPSAkdGhpcy5hdHRyKCdpZCcpXG4gICAgICBpZCA9ICR0aGlzLmZpbmQoJ2EnKS5hdHRyKCdpZCcpIHVubGVzcyBpZFxuICAgICAgaWYgaWRcbiAgICAgICAgaXRlbXMucHVzaCB7IGlkOiBpZCwgdGV4dDogJHRoaXMudGV4dCgpIH1cblxuICAgIGl0ZW1zXG5cbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJzY3JpcHRpb25Qb3B1cCB7XHJcblxyXG4gIHN0YXRpYyBpbml0KCkge1xyXG4gICAgXHJcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgIHN1YlBvcCA9ICQoJy5zdWJzY3JpcHRpb24tcG9wdXAnKSxcclxuICAgICAgICBzaG93U3Vic2NyaXB0aW9uUG9wdXAgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgLy9sb2NhbFN0b3JhZ2Uuc3Vic2NyaXB0aW9uRW5hYmxlZCA9ICd5ZXMnO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5zdWJzY3JpcHRpb25FbmFibGVkKTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhzZXNzaW9uU3RvcmFnZS5zdWJzY3JpcHRpb25DbG9zZWQpO1xyXG4gICAgICBpZiAoc2Vzc2lvblN0b3JhZ2Uuc3Vic2NyaXB0aW9uQ2xvc2VkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Nlc3Npb25TdG9yYWdlLnN1YnNjcmlwdGlvbkNsb3NlZCBpcyB1bmRlZmluZWQnKTtcclxuICAgICAgICBzaG93U3Vic2NyaXB0aW9uUG9wdXAgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Nlc3Npb25TdG9yYWdlLnN1YnNjcmlwdGlvbkNsb3NlZCBpcyBwcmVzZW50Jyk7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLnN1YnNjcmlwdGlvbkNsb3NlZCA9PSAneWVzJykge1xyXG4gICAgICAgICAgc2hvd1N1YnNjcmlwdGlvblBvcHVwID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzY3JvbGxQb3MgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKHNjcm9sbFBvcyA+IHRhcmdldEhlaWdodCAmJiBzaG93U3Vic2NyaXB0aW9uUG9wdXApIHtcclxuICAgICAgICBzdWJQb3AuYWRkQ2xhc3MoJ3Nob3dlZC1wb3B1cCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1YlBvcC5yZW1vdmVDbGFzcygnc2hvd2VkLXBvcHVwJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KVxyXG4gICAgICAub24oJ2NsaWNrJywgJy5zdWJzY3JpcHRpb24tcG9wdXAgLmNsb3NlLXBvcHVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3ViUG9wLmhpZGUoKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zdWJzY3JpcHRpb25DbG9zZWQgPSAneWVzJztcclxuICAgICAgfSlcclxuICAgICAgLm9uKCdjbGljaycsICcucGFyZG90LWZvcm1zLXdpZGdldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5vbignY2xpY2snLCAnLmpzLXNob3ctdGVhc2VyLXBvcHVwJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBTaG93VGVhc2VyQkcoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBTaG93VGVhc2VyUG9wdXAoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLm9uKCdjbGljaycsICcudGVhc2VyLXBvcHVwLXdyYXBwZXIgLmNsb3NlLXBvcHVwJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJy50ZWFzZXItcG9wdXAtd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdzaG93ZWQtcG9wdXAnKS5hZGRDbGFzcygnY2xvc2VkLXBvcHVwJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBTaG93VGVhc2VyQkcoY2FsbGJhY2spIHtcclxuICAgICAgICAkKCcudGVhc2VyLXBvcHVwLXdyYXBwZXInKS50b2dnbGVDbGFzcygnY2xvc2VkLXBvcHVwJyk7XHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrID09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBTaG93VGVhc2VyUG9wdXAoKSB7XHJcbiAgICAgICAgJCgnLnRlYXNlci1wb3B1cC13cmFwcGVyJykudG9nZ2xlQ2xhc3MoJ3Nob3dlZC1wb3B1cCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVyVGh1bWJzIHtcclxuXHJcbiAgc3RhdGljIGluaXQoKSB7XHJcbiAgICB2YXIgZ2FsbGVyeVRvcCwgZ2FsbGVyeVRodW1icztcclxuICAgIHZhciBnYWxsZXJ5VG9wID0gbmV3IFN3aXBlcignLmdhbGxlcnktdG9wJywge1xyXG4gICAgICAgIG5leHRCdXR0b246ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICBwcmV2QnV0dG9uOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgfSk7XHJcbiAgICB2YXIgZ2FsbGVyeVRodW1icyA9IG5ldyBTd2lwZXIoJy5nYWxsZXJ5LXRodW1icycsIHtcclxuICAgICAgICBzcGFjZUJldHdlZW46IDAsXHJcbiAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAuMixcclxuICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBnYWxsZXJ5VG9wLnBhcmFtcy5jb250cm9sID0gZ2FsbGVyeVRodW1icztcclxuICAgIGdhbGxlcnlUaHVtYnMucGFyYW1zLmNvbnRyb2wgPSBnYWxsZXJ5VG9wO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9vbHRpcCB7XHJcblxyXG4gIHN0YXRpYyBpbml0KCkge1xyXG4gICAgJCgnI3N1cHBvcnRUb29sdGlwJykudG9nZ2xlKCk7XHJcbiAgICAkKGRvY3VtZW50KVxyXG4gICAgICAub24oJ2NsaWNrJywgJyNzaG93U3VwcG9ydFRvb2x0aXAsICNzdXBwb3J0VG9vbHRpcCAuY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjc3VwcG9ydFRvb2x0aXAnKS50b2dnbGUoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufSIsIiQgPSByZXF1aXJlICdqcXVlcnknXHJcblNsaWRlTWVudSA9IHJlcXVpcmUoJy4vU2xpZGVNZW51JykuZGVmYXVsdFxyXG5Ub29sdGlwID0gcmVxdWlyZSgnLi9Ub29sdGlwJykuZGVmYXVsdFxyXG5Td2lwZXJUaHVtYnMgPSByZXF1aXJlKCcuL1N3aXBlclRodW1icycpLmRlZmF1bHRcclxuTW9iaWxlTmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vTW9iaWxlTmF2aWdhdGlvbicpLmRlZmF1bHRcclxuU3Vic2NyaXB0aW9uUG9wdXAgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvblBvcHVwJykuZGVmYXVsdFxyXG5GaXhlZE5hdmJhciA9IHJlcXVpcmUgJy4vRml4ZWROYXZiYXInXHJcblNjcm9sbEFjdGlvbiA9IHJlcXVpcmUgJy4vU2Nyb2xsQWN0aW9uJ1xyXG5TdWJOYXZpZ2F0aW9uID0gcmVxdWlyZSAnLi9TdWJOYXZpZ2F0aW9uJ1xyXG5GaXhlZFN1Yk5hdmJhciA9IHJlcXVpcmUgJy4vRml4ZWRTdWJOYXZiYXInXHJcbk1hc29ucnkgPSByZXF1aXJlICcuL01hc29ucnknXHJcblN3aXBlciA9IHJlcXVpcmUgJy4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9kaXN0L2pzL3N3aXBlci5qcydcclxuXHJcblxyXG4kIC0+XHJcbiAgI1xyXG4gICMgTVbjga7jg5Xjgqfjg7zjg4njgqLjgqbjg4hcclxuICAjXHJcblxyXG4gICQod2luZG93KS5vbiAnbG9hZCcsICgpIC0+XHJcbiAgICAkKCcucC1tYWluLXZpc3VhbF9fb3ZlcmxheV9mYWRlb3V0JylcclxuICAgIC5kZWxheSg1MDAwKVxyXG4gICAgLnF1ZXVlKCAoKSAtPiAkKHRoaXMpLmFkZENsYXNzKFwicC1tYWluLXZpc3VhbF9fb3ZlcmxheV9oaWRlXCIpLmRlcXVldWUoKSApXHJcblxyXG5cclxuXHJcbiMkIC0+XHJcblxyXG4gICNcclxuICAjIFlvdHViZSBMaW5rIEJ0bi5cclxuICAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAjXHJcbiAgIyQoJ2FbaHJlZio9XCJ5b3V0dS5iZVwiXScpLmVhY2ggKCktPlxyXG4gICMgIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAjICBocmVmID0gaHJlZi5yZXBsYWNlKFwieW91dHUuYmUvXCIsIFwid3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9XCIpO1xyXG4gICMgICQodGhpcykuYXR0cignaHJlZicsIGhyZWYpO1xyXG5cclxuICAjeW91dHViZSA9ICQoICdhW2hyZWYqPVwieW91dHVcIl06aGFzKGltZyk6bm90KC5oZWFkZXIteW91dHViZSknKTtcclxuICAjeW91dHViZS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwLXRleHQtaW1hZ2UtYmxvY2tfX3BsYXktYnRuXCIvPicpXHJcbiAgI3lvdXR1YmUubWFnbmlmaWNQb3B1cCh7XHJcbiAgIyAgdHlwZTogJ2lmcmFtZScsXHJcbiAgIyAgbWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG4gICMgIHJlbW92YWxEZWxheTogMTYwLFxyXG4gICMgIHByZWxvYWRlcjogZmFsc2UsXHJcbiAgIyAgZml4ZWRDb250ZW50UG9zOiBmYWxzZVxyXG4gICN9KTtcclxuXHJcbiMkIC0+XHJcblxyXG5cclxuICAjJCggJ2EucC1tYWluLXZpc3VhbCcgKS5tYWduaWZpY1BvcHVwKHtcclxuICAjICB0eXBlOiAnaWZyYW1lJyxcclxuICAjICBtYWluQ2xhc3M6ICdtZnAtZmFkZScsXHJcbiAgIyAgcmVtb3ZhbERlbGF5OiAxNjAsXHJcbiAgIyAgcHJlbG9hZGVyOiBmYWxzZSxcclxuXHJcbiAgIyAgZml4ZWRDb250ZW50UG9zOiBmYWxzZVxyXG4gICN9KTtcclxuXHJcblxyXG5cclxuJCAtPlxyXG4gICQoZG9jdW1lbnQpLmFqYXhTdWNjZXNzIChldmVudCwgeGhyLCBzZXR0aW5ncykgLT5cclxuICAgIHVybCA9IHNldHRpbmdzLnVybFxyXG4gICAgaWYgZ2E/XHJcbiAgICAgIGdhICdzZW5kJywgJ3BhZ2V2aWV3JywgdXJsLnJlcGxhY2UgbG9jYXRpb24ub3JpZ2luLCBcIlwiXHJcblxyXG4kIC0+XHJcbiAgU2xpZGVNZW51LmluaXQoKVxyXG4gIFxyXG4kIC0+XHJcbiAgVG9vbHRpcC5pbml0KClcclxuXHJcbiQgLT5cclxuICBTd2lwZXJUaHVtYnMuaW5pdCgpXHJcbiAgXHJcbiQgLT5cclxuICBNb2JpbGVOYXZpZ2F0aW9uLmluaXQoKVxyXG5cclxuJCAtPlxyXG4gIFN1YnNjcmlwdGlvblBvcHVwLmluaXQoKVxyXG5cclxuJCAtPlxyXG4gICQod2luZG93KS5vbiAnbG9hZCcsICgpIC0+XHJcbiAgICAkKCcucC12b2ljZS1jb250YWluZXInKS5hZGRDbGFzcygnaXMtdHJhbnNpdGlvbicpO1xyXG5cclxuJCAtPlxyXG4gIHVubGVzcyAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTW9iaWxlL2kpIGFuZCAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaW9zL2kpIGFuZCAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvYW5kcm9pZC9pKVxyXG4gICAgJChcInZpZGVvXCIpLmF0dHIoXCJjb250cm9sc1wiLFwiY29udHJvbHNcIik7XHJcblxyXG5cclxuXHJcbiQgLT5cclxuXHJcbiAgI1xyXG4gICMgU2Nyb2xsIFRvcFxyXG4gICMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICNcclxuICAkKFwiW2RhdGEtcGFnZVRvcF1cIikuY2xpY2sgKCktPlxyXG4gICAgc3BlZWQgPSA4MDA7XHJcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6MH0sIHNwZWVkLCBcImVhc2VPdXRFeHBvXCIpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAjXHJcbiAgIyBpbiBwYWdlIHNjcm9sbC5cclxuICAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAjXHJcblxyXG4gICQgLT5cclxuXHJcbiAgICBmaXhIYXNoID0gKGV2ZW50KSAtPlxyXG5cclxuICAgICAgaWYgZXZlbnRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGlmIGxvY2F0aW9uLmhhc2gubGVuZ3RoID4gMVxyXG4gICAgICAgIG9mZnNldFRvcCA9ICQobG9jYXRpb24uaGFzaCkub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCBvZmZzZXRUb3AgLSAxMzBcclxuICAgICAgZmFsc2VcclxuXHJcbiAgICBmaXhIYXNoKClcclxuXHJcbiAgICAkKHdpbmRvdykub24gXCJoYXNoY2hhbmdlXCIsIGZpeEhhc2hcclxuXHJcblxyXG4gICAgJCgnLnAtc3ViLW5hdmlnYXRpb24nKS5vbiAnY2xpY2snLCAnYScsIChldmVudCkgLT5cclxuXHJcbiAgICAgIGhhc2ggPSBALmhhc2hcclxuICAgICAgJHRhcmdldCA9ICQoaGFzaClcclxuICAgICAgaWYgJHRhcmdldC5sZW5ndGhcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgb2Zmc2V0VG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3AgLSAxMzBcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6b2Zmc2V0VG9wfSwgNjAwLCBcImVhc2VPdXRFeHBvXCIpLnByb21pc2UoKS5kb25lICgpIC0+XHJcbiAgICAgICAgICAjbG9jYXRpb24uaGFzaCA9ICcnXHJcblxyXG5cclxuXHJcblxyXG5cclxuJCAtPlxyXG5cclxuXHJcbiAgJHZvaWNlQ29udGFpbmVyID0gJCgnW2RhdGEtdm9pY2UtY29udGFpbmVyXScpXHJcblxyXG4gIGlmICR2b2ljZUNvbnRhaW5lci5sZW5ndGhcclxuICAgIG5ldyBNYXNvbnJ5IHtcclxuICAgICAgY29udGFpbmVyOiAnW2RhdGEtbWFzb25yeV0nXHJcbiAgICAgIHNpemVyOiAnW2RhdGEtbWFzb25yeS1zaXplcl0nXHJcbiAgICAgIGl0ZW06ICdbZGF0YS1tYXNvbnJ5LWl0ZW1dJ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKHdpbmRvdykub24gXCJwb3BzdGF0ZVwiLChldmVudCkgLT5cclxuICAgICAgbG9hZENvbnRlbnQoIGxvY2F0aW9uLmhyZWYgKVxyXG5cclxuXHJcbiAgICAjIyNcclxuICAgICQoXCJbZGF0YS1tYXNvbnJ5XVwiKS5vbiAgJ2NsaWNrJywgJ1tkYXRhLW1hc29ucnktaXRlbV0nLCAoZXZlbnQpLT5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBsb2FkQ29udGVudCBALmhyZWYsIHRydWVcclxuICAgICAgJCggJ2EucC1tYWluLXZpc3VhbCcgKS5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgICB0eXBlOiAnaWZyYW1lJyxcclxuICAgICAgICBtYWluQ2xhc3M6ICdtZnAtZmFkZScsXHJcbiAgICAgICAgcmVtb3ZhbERlbGF5OiAxNjAsXHJcbiAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgZml4ZWRDb250ZW50UG9zOiBmYWxzZVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgJHZvaWNlQ29udGFpbmVyLm9uICdjbGljaycsICcucC12b2ljZS1jb250ZW50LWhlYWRlciAuYy1idG4nLCAoZXZlbnQpIC0+XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgbG9hZENvbnRlbnQoIEAuaHJlZiwgdHJ1ZSApXHJcbiAgICAjIyNcclxuXHJcblxyXG4gIGxvYWRDb250ZW50ID0gKCBocmVmICwgYWRkSGlzdG9yeSApLT5cclxuICAgIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSAjZm9yIGNocm9tZSBidWcgZml4LlxyXG5cclxuICAgIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxyXG4gICAgcGFyc2VyLmhyZWYgPSBocmVmXHJcblxyXG4gICAgY29uc29sZS5sb2cocGFyc2VyLnBhdGhuYW1lLnN1YnN0cigxKS5zcGxpdCgnLycpLmxlbmd0aCk7XHJcblxyXG4gICAgaWYgcGFyc2VyLnBhdGhuYW1lLnN1YnN0cigxKS5zcGxpdCgnLycpLmxlbmd0aCA+IDJcclxuXHJcbiAgICAgICQuYWpheChcclxuICAgICAgICB1cmw6IGhyZWZcclxuICAgICAgKVxyXG4gICAgICAuZG9uZSggKCBkYXRhICkgPT5cclxuICAgICAgICAkdm9pY2VDb250YWluZXIub25lICd0cmFuc2l0aW9uZW5kJywgKCkgLT5cclxuICAgICAgICAgIGlmIGFkZEhpc3RvcnlcclxuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe2hyZWY6IGhyZWZ9LCAnJywgaHJlZilcclxuICAgICAgICAgICQoJ2JvZHknKS5jc3Mgb3ZlcmZsb3c6ICdoaWRkZW4nXHJcblxyXG4gICAgICAgICAgJCh3aW5kb3cpLm9uZSAnc2Nyb2xsJywgKCktPlxyXG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKHNjcm9sbClcclxuXHJcblxyXG5cclxuICAgICAgICBodG1sID0gICc8ZGl2PicgKyBkYXRhICsgJzwvZGl2PidcclxuICAgICAgICAkY29udGVudCA9ICQoaHRtbCkuZmluZCgnW2RhdGEtdm9pY2UtY29udGVudF0nKVxyXG4gICAgICAgICR2b2ljZUNvbnRhaW5lci5odG1sKCRjb250ZW50KVxyXG4gICAgICAgICR2b2ljZUNvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgJHZvaWNlQ29udGFpbmVyLmNzcyBwYWRkaW5nVG9wOiAkKCcucC1uYXZiYXInKS5oZWlnaHQoKVxyXG5cclxuICAgICAgKVxyXG5cclxuICAgIGVsc2VcclxuXHJcbiAgICAgIGlmICR2b2ljZUNvbnRhaW5lci5sZW5ndGhcclxuICAgICAgICAkdm9pY2VDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgJCgnYm9keScpLmNzcyBvdmVyZmxvdzogJ3Zpc2libGUnXHJcbiAgICAgICAgaWYgYWRkSGlzdG9yeVxyXG4gICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe2hyZWY6IGhyZWZ9LCAnJywgaHJlZilcclxuICAgICAgZWxzZVxyXG4gICAgICAgIGlmIGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2V4cGVyaWVuY2VzJykgPiAtMVxyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcclxuXHJcbiNcclxuI1xyXG4jIGp1bWJvdHJvblxyXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuI1xyXG5cclxuJCAtPlxyXG4gIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5wLWp1bWJvdHJvbicsIHtcclxuICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICNsb29wOiB0cnVlLFxyXG4gICAgbG9vcDogZmFsc2UsXHJcbiAgICBzcGVlZDogOTAwLFxyXG4gICAgYXV0b3BsYXk6IDgwMDAsXHJcbiAgICBhdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgIHBhZ2luYXRpb246ICcucC1qdW1ib3Ryb25fX3BhZ2luYXRpb24nLFxyXG4gICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZVxyXG5cclxuICB9KTtcclxuXHJcbiAgbmV3IFN3aXBlcignLnAtc2xpZGVzaG93Jywge1xyXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgc3BlZWQ6IDEwMDAsXHJcbiAgICBhdXRvcGxheTogMzAwMCxcclxuICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2VcclxuICB9KVxyXG5cclxuIyMjXHJcbiQgLT5cclxuICAgIGdhbGxlcnlUb3AgPSBuZXcgU3dpcGVyKCcuZ2FsbGVyeS10b3AnLCB7XHJcbiAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgfSxcclxuICAgICAgY29udHJvbGxlcjoge1xyXG4gICAgICAgICAgY29udHJvbDogZ2FsbGVyeVRodW1icztcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuJCAtPlxyXG4gICAgZ2FsbGVyeVRodW1icyA9IG5ldyBTd2lwZXIoJy5nYWxsZXJ5LXRodW1icycsIHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgdG91Y2hSYXRpbzogMC4yLFxyXG4gICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG4gICAgICBjb250cm9sbGVyOiB7XHJcbiAgICAgICAgICBjb250cm9sOiBnYWxsZXJ5VG9wO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiMjI1xyXG5cclxuJCh3aW5kb3cpLmxvYWQgLT5cclxuXHJcbiAgJCgnLnAtc2xpZGVyLWdhbGxlcnknKS5lYWNoICgpIC0+XHJcbiAgICAkKEApLmZpbmQoXCIuZ2FsbGVyeS1pdGVtXCIpLmFkZENsYXNzKCdzd2lwZXItc2xpZGUnKVxyXG4gICAgJChAKS5maW5kKFwiLmdhbGxlcnlcIikuYWRkQ2xhc3MoJ3N3aXBlci13cmFwcGVyJylcclxuICAgIG5ldyBTd2lwZXIoIEAsIHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICBzcGVlZDogNTAwLFxyXG4gICAgICBhdXRvcGxheTogMjAwMCxcclxuICAgICAgYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2VcclxuICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4jXHJcbiNcclxuIyBOYXZiYXIgZml4ZWRcclxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiNcclxuXHJcbiQgLT5cclxuICBzdWJOYXZpZ2F0aW9uID0gIG5ldyBTdWJOYXZpZ2F0aW9uICdbZGF0YS1zdWItbmF2aWdhdGlvbl0nLCAnLnAtcGFnZS1jb250ZW50J1xyXG4gIHN1Yk5hdmlnYXRpb24uJGVsZW1lbnQuY2xvbmUodHJ1ZSkuYXBwZW5kVG8gJCAnW2RhdGEtc3ViLW5hdmlnYXRpb24tZml4ZWRdJ1xyXG5cclxuICBuYXZiYXIgPSBuZXcgRml4ZWROYXZiYXIoJ1tkYXRhLWZpeGVkLW5hdmJhcl0nLCAnW2RhdGEtZml4ZWQtYm9keV0nKVxyXG5cclxuICAkKFwiW2RhdGEtc3ViLW5hdmlnYXRpb24tY29udGFpbmVyXVwiKS5lYWNoICgpLT5cclxuICAgIHN1Yk5hdmlnYXRpb24gPSBuZXcgRml4ZWRTdWJOYXZiYXIoJChAKSwgJ2lzLWhpZGRlbicsIG5hdmJhcilcclxuXHJcbiAgLm9uIFwic2V0Q2xhc3NcIiwgKCkgLT5cclxuICAgICQoXCIucC1uYXZiYXJfX3N1Yi1uYXZpZ2F0aW9uXCIpLnNob3coKVxyXG5cclxuICAub24gXCJ1bnNldENsYXNzXCIsICgpIC0+XHJcbiAgICAkKFwiLnAtbmF2YmFyX19zdWItbmF2aWdhdGlvblwiKS5oaWRlKClcclxuXHJcblxyXG5cclxuI1xyXG4jIFNjcm9sbCBBZGQvcmVtb3ZlIENsYXNzLlxyXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuI1xyXG4kIC0+XHJcbiAgJChcIltkYXRhLXNjcm9sbC1hZGRjbGFzc11cIikuZWFjaCAoKS0+XHJcbiAgICAkdGhpcyA9ICQgQFxyXG4gICAgbmV3IFNjcm9sbEFjdGlvbiAkdGhpcywgJHRoaXMuZGF0YShcInNjcm9sbC1hZGRjbGFzc1wiKVxyXG5cclxuXHJcbiAgJCgnLnAtbmF2YmFyJylcclxuICAub24gXCJzZXRDbGFzc1wiLCAoKSAtPlxyXG4gICAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcblxyXG4gIC5vbiBcInVuc2V0Q2xhc3NcIiwgKCkgLT5cclxuICAgICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbC1jb250ZW50XCIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKVxyXG5cclxuXHJcbiAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsIGlcIikub24gJ2NsaWNrJywgKCkgLT5cclxuICAgICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbC1jb250ZW50XCIpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG5cclxuXHJcbiAgaWYgJChcIi5wLW5hdmJhcl9zbWFsbFwiKS5sZW5ndGggPiAwXHJcbiAgICAkKFwiLnAtbmF2aWdhdGlvbl9faXRlbV90ZWwtY29udGVudFwiKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcclxuXHJcbiAgZWxzZVxyXG4gICAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsLWNvbnRlbnRcIikuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcblxyXG5cclxuXHJcblxyXG4kIC0+XHJcblxyXG4gICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbiAgJHBsYXllciA9ICQoJy5wbGF5ZXInKVxyXG4gICRwbGF5ZXIubWJfWVRQbGF5ZXIoKTtcclxuXHJcblxyXG4gICQoXCIucC1wYWdlLWNvbnRlbnQgdmlkZW9cIikuZWFjaCAoKSAtPlxyXG4gICAgJHRoaXMgPSAkKEApXHJcbiAgICAkd2luZG93Lm9uICdsb2FkIHNjcm9sbCcsID0+XHJcbiAgICAgIGlmICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9Nb2JpbGUvaSkgYW5kICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pb3MvaSkgYW5kICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9hbmRyb2lkL2kpXHJcbiAgICAgICAgdHJpZ2dlck5vZGVQb3NpdGlvbiA9ICR0aGlzLm9mZnNldCgpLnRvcCAtICR3aW5kb3cuaGVpZ2h0KClcclxuICAgICAgICBpZiB0cmlnZ2VyTm9kZVBvc2l0aW9uIDwgJHdpbmRvdy5zY3JvbGxUb3AoKSBhbmQgJHdpbmRvdy5zY3JvbGxUb3AoKSA8ICR0aGlzLm9mZnNldCgpLnRvcCArICR0aGlzLmhlaWdodCgpXHJcbiAgICAgICAgICAkdGhpcy5nZXQoMCkucGxheSgpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgJHRoaXMuZ2V0KDApLnBhdXNlKClcclxuICAgICAgICAgICMkdGhpcy5nZXQoMCkuY3VycmVudFRpbWUgPSAwXHJcblxyXG5cclxuIyAgJChcIltkYXRhLXNjcm9sbC1jbGFzc11cIikuZWFjaCAoKS0+XHJcbiMgICAgJHRoaXMgPSAkKEApXHJcbiMgICAgY2xhc3NEYXRhID0gJHRoaXMuZGF0YShcInNjcm9sbC1jbGFzc1wiKTtcclxuI1xyXG4jICAgICRmaXJzdFZpZXcgPSB0cnVlO1xyXG4jICAgICR3aW5kb3cgPSAkIHdpbmRvdztcclxuI1xyXG4jXHJcbiNcclxuI1xyXG4jICAkKFwiW2RhdGEtc2NyLXJtY2xhc3NdXCIpLmVhY2ggKCktPlxyXG4jICAgICR0aGlzID0gJChAKVxyXG4jICAgIGNsYXNzRGF0YSA9ICR0aGlzLmRhdGEoXCJzY3Itcm1jbGFzc1wiKTtcclxuI1xyXG4jICAgICRmaXJzdFZpZXcgPSB0cnVlO1xyXG4jICAgICR3aW5kb3cgPSAkIHdpbmRvdztcclxuIyAgICAkd2luZG93Lm9uIFwibG9hZCByZXNpemUgc2Nyb2xsXCIsICgpLT5cclxuIyAgICAgIGlmICR3aW5kb3cuaGVpZ2h0KCkgPiAkd2luZG93LnNjcm9sbFRvcCgpICsgJHRoaXMuaGVpZ2h0KClcclxuIyAgICAgICAgdW5sZXNzICRmaXJzdFZpZXdcclxuIyAgICAgICAgICAkZmlyc3RWaWV3ID0gdHJ1ZVxyXG4jICAgICAgICAgICR0aGlzLmFkZENsYXNzKGNsYXNzRGF0YSlcclxuIyAgICAgIGVsc2VcclxuIyAgICAgICAgaWYgJGZpcnN0Vmlld1xyXG4jICAgICAgICAgICRmaXJzdFZpZXcgPSBmYWxzZVxyXG4jICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKGNsYXNzRGF0YSlcclxuIiwiLyoqXG4gKiBCcmlkZ2V0IG1ha2VzIGpRdWVyeSB3aWRnZXRzXG4gKiB2MS4xLjBcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93ICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlZmluaXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZGVmaW5lQnJpZGdldCggJCApIHtcblxuLy8gYmFpbCBpZiBubyBqUXVlcnlcbmlmICggISQgKSB7XG4gIHJldHVybjtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYWRkT3B0aW9uTWV0aG9kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogYWRkcyBvcHRpb24gbWV0aG9kIC0+ICQoKS5wbHVnaW4oJ29wdGlvbicsIHsuLi59KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gUGx1Z2luQ2xhc3MgLSBjb25zdHJ1Y3RvciBjbGFzc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25NZXRob2QoIFBsdWdpbkNsYXNzICkge1xuICAvLyBkb24ndCBvdmVyd3JpdGUgb3JpZ2luYWwgb3B0aW9uIG1ldGhvZFxuICBpZiAoIFBsdWdpbkNsYXNzLnByb3RvdHlwZS5vcHRpb24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gb3B0aW9uIHNldHRlclxuICBQbHVnaW5DbGFzcy5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gICAgLy8gYmFpbCBvdXQgaWYgbm90IGFuIG9iamVjdFxuICAgIGlmICggISQuaXNQbGFpbk9iamVjdCggb3B0cyApICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB0cnVlLCB0aGlzLm9wdGlvbnMsIG9wdHMgKTtcbiAgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGx1Z2luIGJyaWRnZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGxvZ2dpbmcgZXJyb3JzXG4vLyAkLmVycm9yIGJyZWFrcyBqUXVlcnkgY2hhaW5pbmdcbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8qKlxuICogalF1ZXJ5IHBsdWdpbiBicmlkZ2UsIGFjY2VzcyBtZXRob2RzIGxpa2UgJGVsZW0ucGx1Z2luKCdtZXRob2QnKVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIHBsdWdpbiBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBQbHVnaW5DbGFzcyAtIGNvbnN0cnVjdG9yIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIGJyaWRnZSggbmFtZXNwYWNlLCBQbHVnaW5DbGFzcyApIHtcbiAgLy8gYWRkIHRvIGpRdWVyeSBmbiBuYW1lc3BhY2VcbiAgJC5mblsgbmFtZXNwYWNlIF0gPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyApIHtcbiAgICAgIC8vIGNhbGwgcGx1Z2luIG1ldGhvZCB3aGVuIGZpcnN0IGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gICAgICAvLyBnZXQgYXJndW1lbnRzIGZvciBtZXRob2RcbiAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICk7XG5cbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgIHZhciBlbGVtID0gdGhpc1tpXTtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJC5kYXRhKCBlbGVtLCBuYW1lc3BhY2UgKTtcbiAgICAgICAgaWYgKCAhaW5zdGFuY2UgKSB7XG4gICAgICAgICAgbG9nRXJyb3IoIFwiY2Fubm90IGNhbGwgbWV0aG9kcyBvbiBcIiArIG5hbWVzcGFjZSArIFwiIHByaW9yIHRvIGluaXRpYWxpemF0aW9uOyBcIiArXG4gICAgICAgICAgICBcImF0dGVtcHRlZCB0byBjYWxsICdcIiArIG9wdGlvbnMgKyBcIidcIiApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggISQuaXNGdW5jdGlvbiggaW5zdGFuY2Vbb3B0aW9uc10gKSB8fCBvcHRpb25zLmNoYXJBdCgwKSA9PT0gJ18nICkge1xuICAgICAgICAgIGxvZ0Vycm9yKCBcIm5vIHN1Y2ggbWV0aG9kICdcIiArIG9wdGlvbnMgKyBcIicgZm9yIFwiICsgbmFtZXNwYWNlICsgXCIgaW5zdGFuY2VcIiApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJpZ2dlciBtZXRob2Qgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gaW5zdGFuY2VbIG9wdGlvbnMgXS5hcHBseSggaW5zdGFuY2UsIGFyZ3MgKTtcblxuICAgICAgICAvLyBicmVhayBsb29rIGFuZCByZXR1cm4gZmlyc3QgdmFsdWUgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKCByZXR1cm5WYWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHRoaXMgaWYgbm8gcmV0dXJuIHZhbHVlXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9ICQuZGF0YSggdGhpcywgbmFtZXNwYWNlICk7XG4gICAgICAgIGlmICggaW5zdGFuY2UgKSB7XG4gICAgICAgICAgLy8gYXBwbHkgb3B0aW9ucyAmIGluaXRcbiAgICAgICAgICBpbnN0YW5jZS5vcHRpb24oIG9wdGlvbnMgKTtcbiAgICAgICAgICBpbnN0YW5jZS5faW5pdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluaXRpYWxpemUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgaW5zdGFuY2UgPSBuZXcgUGx1Z2luQ2xhc3MoIHRoaXMsIG9wdGlvbnMgKTtcbiAgICAgICAgICAkLmRhdGEoIHRoaXMsIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGJyaWRnZXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBjb252ZXJ0cyBhIFByb3RvdHlwaWNhbCBjbGFzcyBpbnRvIGEgcHJvcGVyIGpRdWVyeSBwbHVnaW5cbiAqICAgdGhlIGNsYXNzIG11c3QgaGF2ZSBhIC5faW5pdCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgLSBwbHVnaW4gbmFtZSwgdXNlZCBpbiAkKCkucGx1Z2luTmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gUGx1Z2luQ2xhc3MgLSBjb25zdHJ1Y3RvciBjbGFzc1xuICovXG4kLmJyaWRnZXQgPSBmdW5jdGlvbiggbmFtZXNwYWNlLCBQbHVnaW5DbGFzcyApIHtcbiAgYWRkT3B0aW9uTWV0aG9kKCBQbHVnaW5DbGFzcyApO1xuICBicmlkZ2UoIG5hbWVzcGFjZSwgUGx1Z2luQ2xhc3MgKTtcbn07XG5cbnJldHVybiAkLmJyaWRnZXQ7XG5cbn1cblxuLy8gdHJhbnNwb3J0XG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgLy8gQU1EXG4gIGRlZmluZSggWyAnanF1ZXJ5JyBdLCBkZWZpbmVCcmlkZ2V0ICk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIGRlZmluZUJyaWRnZXQoIHJlcXVpcmUoJ2pxdWVyeScpICk7XG59IGVsc2Uge1xuICAvLyBnZXQganF1ZXJ5IGZyb20gYnJvd3NlciBnbG9iYWxcbiAgZGVmaW5lQnJpZGdldCggd2luZG93LmpRdWVyeSApO1xufVxuXG59KSggd2luZG93ICk7XG4iLCIvKiFcbiAqIGNsYXNzaWUgdjEuMC4xXG4gKiBjbGFzcyBoZWxwZXIgZnVuY3Rpb25zXG4gKiBmcm9tIGJvbnpvIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm9uem9cbiAqIE1JVCBsaWNlbnNlXG4gKiBcbiAqIGNsYXNzaWUuaGFzKCBlbGVtLCAnbXktY2xhc3MnICkgLT4gdHJ1ZS9mYWxzZVxuICogY2xhc3NpZS5hZGQoIGVsZW0sICdteS1uZXctY2xhc3MnIClcbiAqIGNsYXNzaWUucmVtb3ZlKCBlbGVtLCAnbXktdW53YW50ZWQtY2xhc3MnIClcbiAqIGNsYXNzaWUudG9nZ2xlKCBlbGVtLCAnbXktY2xhc3MnIClcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93ICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIGNsYXNzIGhlbHBlciBmdW5jdGlvbnMgZnJvbSBib256byBodHRwczovL2dpdGh1Yi5jb20vZGVkL2JvbnpvXG5cbmZ1bmN0aW9uIGNsYXNzUmVnKCBjbGFzc05hbWUgKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFwiKF58XFxcXHMrKVwiICsgY2xhc3NOYW1lICsgXCIoXFxcXHMrfCQpXCIpO1xufVxuXG4vLyBjbGFzc0xpc3Qgc3VwcG9ydCBmb3IgY2xhc3MgbWFuYWdlbWVudFxuLy8gYWx0aG8gdG8gYmUgZmFpciwgdGhlIGFwaSBzdWNrcyBiZWNhdXNlIGl0IHdvbid0IGFjY2VwdCBtdWx0aXBsZSBjbGFzc2VzIGF0IG9uY2VcbnZhciBoYXNDbGFzcywgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzO1xuXG5pZiAoICdjbGFzc0xpc3QnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCApIHtcbiAgaGFzQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICByZXR1cm4gZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoIGMgKTtcbiAgfTtcbiAgYWRkQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoIGMgKTtcbiAgfTtcbiAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoIGMgKTtcbiAgfTtcbn1cbmVsc2Uge1xuICBoYXNDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIHJldHVybiBjbGFzc1JlZyggYyApLnRlc3QoIGVsZW0uY2xhc3NOYW1lICk7XG4gIH07XG4gIGFkZENsYXNzID0gZnVuY3Rpb24oIGVsZW0sIGMgKSB7XG4gICAgaWYgKCAhaGFzQ2xhc3MoIGVsZW0sIGMgKSApIHtcbiAgICAgIGVsZW0uY2xhc3NOYW1lID0gZWxlbS5jbGFzc05hbWUgKyAnICcgKyBjO1xuICAgIH1cbiAgfTtcbiAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTmFtZSA9IGVsZW0uY2xhc3NOYW1lLnJlcGxhY2UoIGNsYXNzUmVnKCBjICksICcgJyApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyggZWxlbSwgYyApIHtcbiAgdmFyIGZuID0gaGFzQ2xhc3MoIGVsZW0sIGMgKSA/IHJlbW92ZUNsYXNzIDogYWRkQ2xhc3M7XG4gIGZuKCBlbGVtLCBjICk7XG59XG5cbnZhciBjbGFzc2llID0ge1xuICAvLyBmdWxsIG5hbWVzXG4gIGhhc0NsYXNzOiBoYXNDbGFzcyxcbiAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyxcbiAgLy8gc2hvcnQgbmFtZXNcbiAgaGFzOiBoYXNDbGFzcyxcbiAgYWRkOiBhZGRDbGFzcyxcbiAgcmVtb3ZlOiByZW1vdmVDbGFzcyxcbiAgdG9nZ2xlOiB0b2dnbGVDbGFzc1xufTtcblxuLy8gdHJhbnNwb3J0XG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgLy8gQU1EXG4gIGRlZmluZSggY2xhc3NpZSApO1xufSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuICAvLyBDb21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGNsYXNzaWU7XG59IGVsc2Uge1xuICAvLyBicm93c2VyIGdsb2JhbFxuICB3aW5kb3cuY2xhc3NpZSA9IGNsYXNzaWU7XG59XG5cbn0pKCB3aW5kb3cgKTtcbiIsIi8qIVxuICogZ2V0U3R5bGVQcm9wZXJ0eSB2MS4wLjRcbiAqIG9yaWdpbmFsIGJ5IGthbmdheFxuICogaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZmVhdHVyZS10ZXN0aW5nLWNzcy1wcm9wZXJ0aWVzL1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBleHBvcnRzOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByZWZpeGVzID0gJ1dlYmtpdCBNb3ogbXMgTXMgTycuc3BsaXQoJyAnKTtcbnZhciBkb2NFbGVtU3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbmZ1bmN0aW9uIGdldFN0eWxlUHJvcGVydHkoIHByb3BOYW1lICkge1xuICBpZiAoICFwcm9wTmFtZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB0ZXN0IHN0YW5kYXJkIHByb3BlcnR5IGZpcnN0XG4gIGlmICggdHlwZW9mIGRvY0VsZW1TdHlsZVsgcHJvcE5hbWUgXSA9PT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIHByb3BOYW1lO1xuICB9XG5cbiAgLy8gY2FwaXRhbGl6ZVxuICBwcm9wTmFtZSA9IHByb3BOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc2xpY2UoMSk7XG5cbiAgLy8gdGVzdCB2ZW5kb3Igc3BlY2lmaWMgcHJvcGVydGllc1xuICB2YXIgcHJlZml4ZWQ7XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHByZWZpeGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHByZWZpeGVkID0gcHJlZml4ZXNbaV0gKyBwcm9wTmFtZTtcbiAgICBpZiAoIHR5cGVvZiBkb2NFbGVtU3R5bGVbIHByZWZpeGVkIF0gPT09ICdzdHJpbmcnICkge1xuICAgICAgcmV0dXJuIHByZWZpeGVkO1xuICAgIH1cbiAgfVxufVxuXG4vLyB0cmFuc3BvcnRcbmlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAvLyBBTURcbiAgZGVmaW5lKCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2V0U3R5bGVQcm9wZXJ0eTtcbiAgfSk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIC8vIENvbW1vbkpTIGZvciBDb21wb25lbnRcbiAgbW9kdWxlLmV4cG9ydHMgPSBnZXRTdHlsZVByb3BlcnR5O1xufSBlbHNlIHtcbiAgLy8gYnJvd3NlciBnbG9iYWxcbiAgd2luZG93LmdldFN0eWxlUHJvcGVydHkgPSBnZXRTdHlsZVByb3BlcnR5O1xufVxuXG59KSggd2luZG93ICk7XG4iLCIvKipcbiAqIG1hdGNoZXNTZWxlY3RvciB2MS4wLjNcbiAqIG1hdGNoZXNTZWxlY3RvciggZWxlbWVudCwgJy5zZWxlY3RvcicgKVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggRWxlbVByb3RvICkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hlc01ldGhvZCA9ICggZnVuY3Rpb24oKSB7XG4gICAgLy8gY2hlY2sgZm9yIHRoZSBzdGFuZGFyZCBtZXRob2QgbmFtZSBmaXJzdFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXMgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXMnO1xuICAgIH1cbiAgICAvLyBjaGVjayB1bi1wcmVmaXhlZFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiAnbWF0Y2hlc1NlbGVjdG9yJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdmVuZG9yIHByZWZpeGVzXG4gICAgdmFyIHByZWZpeGVzID0gWyAnd2Via2l0JywgJ21veicsICdtcycsICdvJyBdO1xuXG4gICAgZm9yICggdmFyIGk9MCwgbGVuID0gcHJlZml4ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcHJlZml4ICsgJ01hdGNoZXNTZWxlY3Rvcic7XG4gICAgICBpZiAoIEVsZW1Qcm90b1sgbWV0aG9kIF0gKSB7XG4gICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vIC0tLS0tIG1hdGNoIC0tLS0tIC8vXG5cbiAgZnVuY3Rpb24gbWF0Y2goIGVsZW0sIHNlbGVjdG9yICkge1xuICAgIHJldHVybiBlbGVtWyBtYXRjaGVzTWV0aG9kIF0oIHNlbGVjdG9yICk7XG4gIH1cblxuICAvLyAtLS0tLSBhcHBlbmRUb0ZyYWdtZW50IC0tLS0tIC8vXG5cbiAgZnVuY3Rpb24gY2hlY2tQYXJlbnQoIGVsZW0gKSB7XG4gICAgLy8gbm90IG5lZWRlZCBpZiBhbHJlYWR5IGhhcyBwYXJlbnRcbiAgICBpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICk7XG4gIH1cblxuICAvLyAtLS0tLSBxdWVyeSAtLS0tLSAvL1xuXG4gIC8vIGZhbGwgYmFjayB0byB1c2luZyBRU0FcbiAgLy8gdGh4IEBqb25hdGhhbnRuZWFsIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzMwNjI5NTVcbiAgZnVuY3Rpb24gcXVlcnkoIGVsZW0sIHNlbGVjdG9yICkge1xuICAgIC8vIGFwcGVuZCB0byBmcmFnbWVudCBpZiBubyBwYXJlbnRcbiAgICBjaGVja1BhcmVudCggZWxlbSApO1xuXG4gICAgLy8gbWF0Y2ggZWxlbSB3aXRoIGFsbCBzZWxlY3RlZCBlbGVtcyBvZiBwYXJlbnRcbiAgICB2YXIgZWxlbXMgPSBlbGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKTtcbiAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIC8vIHJldHVybiB0cnVlIGlmIG1hdGNoXG4gICAgICBpZiAoIGVsZW1zW2ldID09PSBlbGVtICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIC0tLS0tIG1hdGNoQ2hpbGQgLS0tLS0gLy9cblxuICBmdW5jdGlvbiBtYXRjaENoaWxkKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgICBjaGVja1BhcmVudCggZWxlbSApO1xuICAgIHJldHVybiBtYXRjaCggZWxlbSwgc2VsZWN0b3IgKTtcbiAgfVxuXG4gIC8vIC0tLS0tIG1hdGNoZXNTZWxlY3RvciAtLS0tLSAvL1xuXG4gIHZhciBtYXRjaGVzU2VsZWN0b3I7XG5cbiAgaWYgKCBtYXRjaGVzTWV0aG9kICkge1xuICAgIC8vIElFOSBzdXBwb3J0cyBtYXRjaGVzU2VsZWN0b3IsIGJ1dCBkb2Vzbid0IHdvcmsgb24gb3JwaGFuZWQgZWxlbXNcbiAgICAvLyBjaGVjayBmb3IgdGhhdFxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3VwcG9ydHNPcnBoYW5zID0gbWF0Y2goIGRpdiwgJ2RpdicgKTtcbiAgICBtYXRjaGVzU2VsZWN0b3IgPSBzdXBwb3J0c09ycGhhbnMgPyBtYXRjaCA6IG1hdGNoQ2hpbGQ7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yID0gcXVlcnk7XG4gIH1cblxuICAvLyB0cmFuc3BvcnRcbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtYXRjaGVzU2VsZWN0b3I7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG1hdGNoZXNTZWxlY3RvcjtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3IgPSBtYXRjaGVzU2VsZWN0b3I7XG4gIH1cblxufSkoIEVsZW1lbnQucHJvdG90eXBlICk7XG4iLCIvKiFcbiAqIGRvY1JlYWR5IHYxLjAuNFxuICogQ3Jvc3MgYnJvd3NlciBET01Db250ZW50TG9hZGVkIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIHJlcXVpcmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4vLyBjb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0byBiZSB0cmlnZ2VyZWQgb24gcmVhZHlcbnZhciBxdWV1ZSA9IFtdO1xuXG5mdW5jdGlvbiBkb2NSZWFkeSggZm4gKSB7XG4gIC8vIHRocm93IG91dCBub24tZnVuY3Rpb25zXG4gIGlmICggdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICggZG9jUmVhZHkuaXNSZWFkeSApIHtcbiAgICAvLyByZWFkeSBub3csIGhpdCBpdFxuICAgIGZuKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcXVldWUgZnVuY3Rpb24gd2hlbiByZWFkeVxuICAgIHF1ZXVlLnB1c2goIGZuICk7XG4gIH1cbn1cblxuZG9jUmVhZHkuaXNSZWFkeSA9IGZhbHNlO1xuXG4vLyB0cmlnZ2VyZWQgb24gdmFyaW91cyBkb2MgcmVhZHkgZXZlbnRzXG5mdW5jdGlvbiBvblJlYWR5KCBldmVudCApIHtcbiAgLy8gYmFpbCBpZiBhbHJlYWR5IHRyaWdnZXJlZCBvciBJRTggZG9jdW1lbnQgaXMgbm90IHJlYWR5IGp1c3QgeWV0XG4gIHZhciBpc0lFOE5vdFJlYWR5ID0gZXZlbnQudHlwZSA9PT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZSc7XG4gIGlmICggZG9jUmVhZHkuaXNSZWFkeSB8fCBpc0lFOE5vdFJlYWR5ICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyaWdnZXIoKTtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlcigpIHtcbiAgZG9jUmVhZHkuaXNSZWFkeSA9IHRydWU7XG4gIC8vIHByb2Nlc3MgcXVldWVcbiAgZm9yICggdmFyIGk9MCwgbGVuID0gcXVldWUubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaV07XG4gICAgZm4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVEb2NSZWFkeSggZXZlbnRpZSApIHtcbiAgLy8gdHJpZ2dlciByZWFkeSBpZiBwYWdlIGlzIHJlYWR5XG4gIGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyApIHtcbiAgICB0cmlnZ2VyKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gbGlzdGVuIGZvciBldmVudHNcbiAgICBldmVudGllLmJpbmQoIGRvY3VtZW50LCAnRE9NQ29udGVudExvYWRlZCcsIG9uUmVhZHkgKTtcbiAgICBldmVudGllLmJpbmQoIGRvY3VtZW50LCAncmVhZHlzdGF0ZWNoYW5nZScsIG9uUmVhZHkgKTtcbiAgICBldmVudGllLmJpbmQoIHdpbmRvdywgJ2xvYWQnLCBvblJlYWR5ICk7XG4gIH1cblxuICByZXR1cm4gZG9jUmVhZHk7XG59XG5cbi8vIHRyYW5zcG9ydFxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gIC8vIEFNRFxuICBkZWZpbmUoIFsgJ2V2ZW50aWUvZXZlbnRpZScgXSwgZGVmaW5lRG9jUmVhZHkgKTtcbn0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVEb2NSZWFkeSggcmVxdWlyZSgnZXZlbnRpZScpICk7XG59IGVsc2Uge1xuICAvLyBicm93c2VyIGdsb2JhbFxuICB3aW5kb3cuZG9jUmVhZHkgPSBkZWZpbmVEb2NSZWFkeSggd2luZG93LmV2ZW50aWUgKTtcbn1cblxufSkoIHdpbmRvdyApO1xuIiwiLyohXG4gKiBldmVudGllIHYxLjAuNlxuICogZXZlbnQgYmluZGluZyBoZWxwZXJcbiAqICAgZXZlbnRpZS5iaW5kKCBlbGVtLCAnY2xpY2snLCBteUZuIClcbiAqICAgZXZlbnRpZS51bmJpbmQoIGVsZW0sICdjbGljaycsIG15Rm4gKVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxudmFyIGJpbmQgPSBmdW5jdGlvbigpIHt9O1xuXG5mdW5jdGlvbiBnZXRJRUV2ZW50KCBvYmogKSB7XG4gIHZhciBldmVudCA9IHdpbmRvdy5ldmVudDtcbiAgLy8gYWRkIGV2ZW50LnRhcmdldFxuICBldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBvYmo7XG4gIHJldHVybiBldmVudDtcbn1cblxuaWYgKCBkb2NFbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gIGJpbmQgPSBmdW5jdGlvbiggb2JqLCB0eXBlLCBmbiApIHtcbiAgICBvYmouYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZm4sIGZhbHNlICk7XG4gIH07XG59IGVsc2UgaWYgKCBkb2NFbGVtLmF0dGFjaEV2ZW50ICkge1xuICBiaW5kID0gZnVuY3Rpb24oIG9iaiwgdHlwZSwgZm4gKSB7XG4gICAgb2JqWyB0eXBlICsgZm4gXSA9IGZuLmhhbmRsZUV2ZW50ID9cbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBnZXRJRUV2ZW50KCBvYmogKTtcbiAgICAgICAgZm4uaGFuZGxlRXZlbnQuY2FsbCggZm4sIGV2ZW50ICk7XG4gICAgICB9IDpcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBnZXRJRUV2ZW50KCBvYmogKTtcbiAgICAgICAgZm4uY2FsbCggb2JqLCBldmVudCApO1xuICAgICAgfTtcbiAgICBvYmouYXR0YWNoRXZlbnQoIFwib25cIiArIHR5cGUsIG9ialsgdHlwZSArIGZuIF0gKTtcbiAgfTtcbn1cblxudmFyIHVuYmluZCA9IGZ1bmN0aW9uKCkge307XG5cbmlmICggZG9jRWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuICB1bmJpbmQgPSBmdW5jdGlvbiggb2JqLCB0eXBlLCBmbiApIHtcbiAgICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgZm4sIGZhbHNlICk7XG4gIH07XG59IGVsc2UgaWYgKCBkb2NFbGVtLmRldGFjaEV2ZW50ICkge1xuICB1bmJpbmQgPSBmdW5jdGlvbiggb2JqLCB0eXBlLCBmbiApIHtcbiAgICBvYmouZGV0YWNoRXZlbnQoIFwib25cIiArIHR5cGUsIG9ialsgdHlwZSArIGZuIF0gKTtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIG9ialsgdHlwZSArIGZuIF07XG4gICAgfSBjYXRjaCAoIGVyciApIHtcbiAgICAgIC8vIGNhbid0IGRlbGV0ZSB3aW5kb3cgb2JqZWN0IHByb3BlcnRpZXNcbiAgICAgIG9ialsgdHlwZSArIGZuIF0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9O1xufVxuXG52YXIgZXZlbnRpZSA9IHtcbiAgYmluZDogYmluZCxcbiAgdW5iaW5kOiB1bmJpbmRcbn07XG5cbi8vIC0tLS0tIG1vZHVsZSBkZWZpbml0aW9uIC0tLS0tIC8vXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAvLyBBTURcbiAgZGVmaW5lKCBldmVudGllICk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIC8vIENvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gZXZlbnRpZTtcbn0gZWxzZSB7XG4gIC8vIGJyb3dzZXIgZ2xvYmFsXG4gIHdpbmRvdy5ldmVudGllID0gZXZlbnRpZTtcbn1cblxufSkoIHdpbmRvdyApO1xuIiwiLyoqXG4gKiBGaXp6eSBVSSB1dGlscyB2MS4wLjFcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UgKi9cbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2RvYy1yZWFkeS9kb2MtcmVhZHknLFxuICAgICAgJ21hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvcidcbiAgICBdLCBmdW5jdGlvbiggZG9jUmVhZHksIG1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGRvY1JlYWR5LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdkb2MtcmVhZHknKSxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5kb2NSZWFkeSxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBkb2NSZWFkeSwgbWF0Y2hlc1NlbGVjdG9yICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHt9O1xuXG4vLyAtLS0tLSBleHRlbmQgLS0tLS0gLy9cblxuLy8gZXh0ZW5kcyBvYmplY3RzXG51dGlscy5leHRlbmQgPSBmdW5jdGlvbiggYSwgYiApIHtcbiAgZm9yICggdmFyIHByb3AgaW4gYiApIHtcbiAgICBhWyBwcm9wIF0gPSBiWyBwcm9wIF07XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuXG4vLyAtLS0tLSBtb2R1bG8gLS0tLS0gLy9cblxudXRpbHMubW9kdWxvID0gZnVuY3Rpb24oIG51bSwgZGl2ICkge1xuICByZXR1cm4gKCAoIG51bSAlIGRpdiApICsgZGl2ICkgJSBkaXY7XG59O1xuXG4vLyAtLS0tLSBpc0FycmF5IC0tLS0tIC8vXG4gIFxudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnV0aWxzLmlzQXJyYXkgPSBmdW5jdGlvbiggb2JqICkge1xuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCggb2JqICkgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxudXRpbHMubWFrZUFycmF5ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgdmFyIGFyeSA9IFtdO1xuICBpZiAoIHV0aWxzLmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICAgIGFyeSA9IG9iajtcbiAgfSBlbHNlIGlmICggb2JqICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInICkge1xuICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICBhcnkucHVzaCggb2JqW2ldICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGFycmF5IG9mIHNpbmdsZSBpbmRleFxuICAgIGFyeS5wdXNoKCBvYmogKTtcbiAgfVxuICByZXR1cm4gYXJ5O1xufTtcblxuLy8gLS0tLS0gaW5kZXhPZiAtLS0tLSAvL1xuXG4vLyBpbmRleCBvZiBoZWxwZXIgY2F1c2UgSUU4XG51dGlscy5pbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPyBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gICAgcmV0dXJuIGFyeS5pbmRleE9mKCBvYmogKTtcbiAgfSA6IGZ1bmN0aW9uKCBhcnksIG9iaiApIHtcbiAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBhcnkubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICBpZiAoIGFyeVtpXSA9PT0gb2JqICkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4vLyAtLS0tLSByZW1vdmVGcm9tIC0tLS0tIC8vXG5cbnV0aWxzLnJlbW92ZUZyb20gPSBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gIHZhciBpbmRleCA9IHV0aWxzLmluZGV4T2YoIGFyeSwgb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gaXNFbGVtZW50IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM4NDM4MC8xODIxODNcbnV0aWxzLmlzRWxlbWVudCA9ICggdHlwZW9mIEhUTUxFbGVtZW50ID09ICdmdW5jdGlvbicgfHwgdHlwZW9mIEhUTUxFbGVtZW50ID09ICdvYmplY3QnICkgP1xuICBmdW5jdGlvbiBpc0VsZW1lbnRET00yKCBvYmogKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICB9IDpcbiAgZnVuY3Rpb24gaXNFbGVtZW50UXVpcmt5KCBvYmogKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmXG4gICAgICBvYmoubm9kZVR5cGUgPT0gMSAmJiB0eXBlb2Ygb2JqLm5vZGVOYW1lID09ICdzdHJpbmcnO1xuICB9O1xuXG4vLyAtLS0tLSBzZXRUZXh0IC0tLS0tIC8vXG5cbnV0aWxzLnNldFRleHQgPSAoIGZ1bmN0aW9uKCkge1xuICB2YXIgc2V0VGV4dFByb3BlcnR5O1xuICBmdW5jdGlvbiBzZXRUZXh0KCBlbGVtLCB0ZXh0ICkge1xuICAgIC8vIG9ubHkgY2hlY2sgc2V0VGV4dFByb3BlcnR5IG9uY2VcbiAgICBzZXRUZXh0UHJvcGVydHkgPSBzZXRUZXh0UHJvcGVydHkgfHwgKCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQudGV4dENvbnRlbnQgIT09IHVuZGVmaW5lZCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JyApO1xuICAgIGVsZW1bIHNldFRleHRQcm9wZXJ0eSBdID0gdGV4dDtcbiAgfVxuICByZXR1cm4gc2V0VGV4dDtcbn0pKCk7XG5cbi8vIC0tLS0tIGdldFBhcmVudCAtLS0tLSAvL1xuXG51dGlscy5nZXRQYXJlbnQgPSBmdW5jdGlvbiggZWxlbSwgc2VsZWN0b3IgKSB7XG4gIHdoaWxlICggZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgIC8vIGNoZWNrIHRoYXQgZWxlbSBpcyBhbiBhY3R1YWwgZWxlbWVudFxuICAgIGlmICggIXV0aWxzLmlzRWxlbWVudCggZWxlbSApICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgaWYgKCBzZWxlY3RvciApIHtcbiAgICAgIC8vIGZpbHRlciBzaWJsaW5nc1xuICAgICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgICAgfVxuICAgICAgLy8gZmluZCBjaGlsZHJlblxuICAgICAgdmFyIGNoaWxkRWxlbXMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICk7XG4gICAgICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICAgICAgZm9yICggdmFyIGo9MCwgakxlbiA9IGNoaWxkRWxlbXMubGVuZ3RoOyBqIDwgakxlbjsgaisrICkge1xuICAgICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbal0gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZmRWxlbXM7XG59O1xuXG4vLyAtLS0tLSBkZWJvdW5jZU1ldGhvZCAtLS0tLSAvL1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCA9IGZ1bmN0aW9uKCBfY2xhc3MsIG1ldGhvZE5hbWUsIHRocmVzaG9sZCApIHtcbiAgLy8gb3JpZ2luYWwgbWV0aG9kXG4gIHZhciBtZXRob2QgPSBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF07XG4gIHZhciB0aW1lb3V0TmFtZSA9IG1ldGhvZE5hbWUgKyAnVGltZW91dCc7XG5cbiAgX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIGlmICggdGltZW91dCApIHtcbiAgICAgIGNsZWFyVGltZW91dCggdGltZW91dCApO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgbWV0aG9kLmFwcGx5KCBfdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIF90aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCB8fCAxMDAgKTtcbiAgfTtcbn07XG5cbi8vIC0tLS0tIGh0bWxJbml0IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9qYW1lc3JvYmVydHMubmFtZS9ibG9nLzIwMTAvMDIvMjIvc3RyaW5nLWZ1bmN0aW9ucy1mb3ItamF2YXNjcmlwdC10cmltLXRvLWNhbWVsLWNhc2UtdG8tZGFzaGVkLWFuZC10by11bmRlcnNjb3JlL1xudXRpbHMudG9EYXNoZWQgPSBmdW5jdGlvbiggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uKCBtYXRjaCwgJDEsICQyICkge1xuICAgIHJldHVybiAkMSArICctJyArICQyO1xuICB9KS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbi8qKlxuICogYWxsb3cgdXNlciB0byBpbml0aWFsaXplIGNsYXNzZXMgdmlhIC5qcy1uYW1lc3BhY2UgY2xhc3NcbiAqIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4gKiBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb24gYXR0cmlidXRlXG4gKi9cbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIGRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtJyArIGRhc2hlZE5hbWVzcGFjZSApO1xuICAgIHZhciBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2UgKyAnLW9wdGlvbnMnO1xuXG4gICAgZm9yICggdmFyIGk9MCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgICAgdmFyIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YUF0dHIgKTtcbiAgICAgIHZhciBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCAnRXJyb3IgcGFyc2luZyAnICsgZGF0YUF0dHIgKyAnIG9uICcgK1xuICAgICAgICAgICAgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICsgKCBlbGVtLmlkID8gJyMnICsgZWxlbS5pZCA6ICcnICkgKyAnOiAnICtcbiAgICAgICAgICAgIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBpbml0aWFsaXplXG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgV2lkZ2V0Q2xhc3MoIGVsZW0sIG9wdGlvbnMgKTtcbiAgICAgIC8vIG1ha2UgYXZhaWxhYmxlIHZpYSAkKCkuZGF0YSgnbGF5b3V0bmFtZScpXG4gICAgICB2YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbiAgICAgIGlmICggalF1ZXJ5ICkge1xuICAgICAgICBqUXVlcnkuZGF0YSggZWxlbSwgbmFtZXNwYWNlLCBpbnN0YW5jZSApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIHV0aWxzO1xuXG59KSk7XG4iLCIvKiFcbiAqIGdldFNpemUgdjEuMi4yXG4gKiBtZWFzdXJlIHNpemUgb2YgZWxlbWVudHNcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBleHBvcnRzOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UsIG1vZHVsZTogZmFsc2UsIGNvbnNvbGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgdW5kZWZpbmVkICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2V0IGEgbnVtYmVyIGZyb20gYSBzdHJpbmcsIG5vdCBhIHBlcmNlbnRhZ2VcbmZ1bmN0aW9uIGdldFN0eWxlU2l6ZSggdmFsdWUgKSB7XG4gIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAvLyBub3QgYSBwZXJjZW50IGxpa2UgJzEwMCUnLCBhbmQgYSBudW1iZXJcbiAgdmFyIGlzVmFsaWQgPSB2YWx1ZS5pbmRleE9mKCclJykgPT09IC0xICYmICFpc05hTiggbnVtICk7XG4gIHJldHVybiBpc1ZhbGlkICYmIG51bTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1lYXN1cmVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgbWVhc3VyZW1lbnRzID0gW1xuICAncGFkZGluZ0xlZnQnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdtYXJnaW5MZWZ0JyxcbiAgJ21hcmdpblJpZ2h0JyxcbiAgJ21hcmdpblRvcCcsXG4gICdtYXJnaW5Cb3R0b20nLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnXG5dO1xuXG5mdW5jdGlvbiBnZXRaZXJvU2l6ZSgpIHtcbiAgdmFyIHNpemUgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGlubmVyV2lkdGg6IDAsXG4gICAgaW5uZXJIZWlnaHQ6IDAsXG4gICAgb3V0ZXJXaWR0aDogMCxcbiAgICBvdXRlckhlaWdodDogMFxuICB9O1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBtZWFzdXJlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG5cblxuZnVuY3Rpb24gZGVmaW5lR2V0U2l6ZSggZ2V0U3R5bGVQcm9wZXJ0eSApIHtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGdldFN0eWxlLCBib3hTaXppbmdQcm9wLCBpc0JveFNpemVPdXRlcjtcblxuLyoqXG4gKiBzZXR1cCB2YXJzIGFuZCBmdW5jdGlvbnNcbiAqIGRvIGl0IG9uIGluaXRpYWwgZ2V0U2l6ZSgpLCByYXRoZXIgdGhhbiBvbiBzY3JpcHQgbG9hZFxuICogRm9yIEZpcmVmb3ggYnVnIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICovXG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgLy8gc2V0dXAgb25jZVxuICBpZiAoIGlzU2V0dXAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzU2V0dXAgPSB0cnVlO1xuXG4gIHZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG4gIGdldFN0eWxlID0gKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZ2V0U3R5bGVGbiA9IGdldENvbXB1dGVkU3R5bGUgP1xuICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKCBlbGVtLCBudWxsICk7XG4gICAgICB9IDpcbiAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGU7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0U3R5bGUoIGVsZW0gKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGdldFN0eWxlRm4oIGVsZW0gKTtcbiAgICAgICAgaWYgKCAhc3R5bGUgKSB7XG4gICAgICAgICAgbG9nRXJyb3IoICdTdHlsZSByZXR1cm5lZCAnICsgc3R5bGUgK1xuICAgICAgICAgICAgJy4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gJyArXG4gICAgICAgICAgICAnU2VlIGh0dHA6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzEnICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBib3ggc2l6aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgYm94U2l6aW5nUHJvcCA9IGdldFN0eWxlUHJvcGVydHkoJ2JveFNpemluZycpO1xuXG4gIC8qKlxuICAgKiBXZWJLaXQgbWVhc3VyZXMgdGhlIG91dGVyLXdpZHRoIG9uIHN0eWxlLndpZHRoIG9uIGJvcmRlci1ib3ggZWxlbXNcbiAgICogSUUgJiBGaXJlZm94IG1lYXN1cmVzIHRoZSBpbm5lci13aWR0aFxuICAgKi9cbiAgaWYgKCBib3hTaXppbmdQcm9wICkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICAgIGRpdi5zdHlsZS5wYWRkaW5nID0gJzFweCAycHggM3B4IDRweCc7XG4gICAgZGl2LnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgICBkaXYuc3R5bGUuYm9yZGVyV2lkdGggPSAnMXB4IDJweCAzcHggNHB4JztcbiAgICBkaXYuc3R5bGVbIGJveFNpemluZ1Byb3AgXSA9ICdib3JkZXItYm94JztcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZCggZGl2ICk7XG4gICAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGRpdiApO1xuXG4gICAgaXNCb3hTaXplT3V0ZXIgPSBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICkgPT09IDIwMDtcbiAgICBib2R5LnJlbW92ZUNoaWxkKCBkaXYgKTtcbiAgfVxuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2l6ZSggZWxlbSApIHtcbiAgc2V0dXAoKTtcblxuICAvLyB1c2UgcXVlcnlTZWxldG9yIGlmIGVsZW0gaXMgc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnICkge1xuICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cblxuICAvLyBkbyBub3QgcHJvY2VlZCBvbiBub24tb2JqZWN0c1xuICBpZiAoICFlbGVtIHx8IHR5cGVvZiBlbGVtICE9PSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZWxlbSApO1xuXG4gIC8vIGlmIGhpZGRlbiwgZXZlcnl0aGluZyBpcyAwXG4gIGlmICggc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnICkge1xuICAgIHJldHVybiBnZXRaZXJvU2l6ZSgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSB7fTtcbiAgc2l6ZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIGlzQm9yZGVyQm94ID0gc2l6ZS5pc0JvcmRlckJveCA9ICEhKCBib3hTaXppbmdQcm9wICYmXG4gICAgc3R5bGVbIGJveFNpemluZ1Byb3AgXSAmJiBzdHlsZVsgYm94U2l6aW5nUHJvcCBdID09PSAnYm9yZGVyLWJveCcgKTtcblxuICAvLyBnZXQgYWxsIG1lYXN1cmVtZW50c1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBtZWFzdXJlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlWyBtZWFzdXJlbWVudCBdO1xuICAgIHZhbHVlID0gbXVuZ2VOb25QaXhlbCggZWxlbSwgdmFsdWUgKTtcbiAgICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgICAvLyBhbnkgJ2F1dG8nLCAnbWVkaXVtJyB2YWx1ZSB3aWxsIGJlIDBcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gIWlzTmFOKCBudW0gKSA/IG51bSA6IDA7XG4gIH1cblxuICB2YXIgcGFkZGluZ1dpZHRoID0gc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUucGFkZGluZ1JpZ2h0O1xuICB2YXIgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgdmFyIG1hcmdpbldpZHRoID0gc2l6ZS5tYXJnaW5MZWZ0ICsgc2l6ZS5tYXJnaW5SaWdodDtcbiAgdmFyIG1hcmdpbkhlaWdodCA9IHNpemUubWFyZ2luVG9wICsgc2l6ZS5tYXJnaW5Cb3R0b207XG4gIHZhciBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICB2YXIgYm9yZGVySGVpZ2h0ID0gc2l6ZS5ib3JkZXJUb3BXaWR0aCArIHNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG5cbiAgdmFyIGlzQm9yZGVyQm94U2l6ZU91dGVyID0gaXNCb3JkZXJCb3ggJiYgaXNCb3hTaXplT3V0ZXI7XG5cbiAgLy8gb3ZlcndyaXRlIHdpZHRoIGFuZCBoZWlnaHQgaWYgd2UgY2FuIGdldCBpdCBmcm9tIHN0eWxlXG4gIHZhciBzdHlsZVdpZHRoID0gZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApO1xuICBpZiAoIHN0eWxlV2lkdGggIT09IGZhbHNlICkge1xuICAgIHNpemUud2lkdGggPSBzdHlsZVdpZHRoICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgfVxuXG4gIHZhciBzdHlsZUhlaWdodCA9IGdldFN0eWxlU2l6ZSggc3R5bGUuaGVpZ2h0ICk7XG4gIGlmICggc3R5bGVIZWlnaHQgIT09IGZhbHNlICkge1xuICAgIHNpemUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG4gIH1cblxuICBzaXplLmlubmVyV2lkdGggPSBzaXplLndpZHRoIC0gKCBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICBzaXplLmlubmVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgLSAoIHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcblxuICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gIHNpemUub3V0ZXJIZWlnaHQgPSBzaXplLmhlaWdodCArIG1hcmdpbkhlaWdodDtcblxuICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gSUU4IHJldHVybnMgcGVyY2VudCB2YWx1ZXMsIG5vdCBwaXhlbHNcbi8vIHRha2VuIGZyb20galF1ZXJ5J3MgY3VyQ1NTXG5mdW5jdGlvbiBtdW5nZU5vblBpeGVsKCBlbGVtLCB2YWx1ZSApIHtcbiAgLy8gSUU4IGFuZCBoYXMgcGVyY2VudCB2YWx1ZVxuICBpZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8IHZhbHVlLmluZGV4T2YoJyUnKSA9PT0gLTEgKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBzdHlsZSA9IGVsZW0uc3R5bGU7XG4gIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcbiAgdmFyIGxlZnQgPSBzdHlsZS5sZWZ0O1xuICB2YXIgcnMgPSBlbGVtLnJ1bnRpbWVTdHlsZTtcbiAgdmFyIHJzTGVmdCA9IHJzICYmIHJzLmxlZnQ7XG5cbiAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICBpZiAoIHJzTGVmdCApIHtcbiAgICBycy5sZWZ0ID0gZWxlbS5jdXJyZW50U3R5bGUubGVmdDtcbiAgfVxuICBzdHlsZS5sZWZ0ID0gdmFsdWU7XG4gIHZhbHVlID0gc3R5bGUucGl4ZWxMZWZ0O1xuXG4gIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgc3R5bGUubGVmdCA9IGxlZnQ7XG4gIGlmICggcnNMZWZ0ICkge1xuICAgIHJzLmxlZnQgPSByc0xlZnQ7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbnJldHVybiBnZXRTaXplO1xuXG59XG5cbi8vIHRyYW5zcG9ydFxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gIC8vIEFNRCBmb3IgUmVxdWlyZUpTXG4gIGRlZmluZSggWyAnZ2V0LXN0eWxlLXByb3BlcnR5L2dldC1zdHlsZS1wcm9wZXJ0eScgXSwgZGVmaW5lR2V0U2l6ZSApO1xufSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuICAvLyBDb21tb25KUyBmb3IgQ29tcG9uZW50XG4gIG1vZHVsZS5leHBvcnRzID0gZGVmaW5lR2V0U2l6ZSggcmVxdWlyZSgnZGVzYW5kcm8tZ2V0LXN0eWxlLXByb3BlcnR5JykgKTtcbn0gZWxzZSB7XG4gIC8vIGJyb3dzZXIgZ2xvYmFsXG4gIHdpbmRvdy5nZXRTaXplID0gZGVmaW5lR2V0U2l6ZSggd2luZG93LmdldFN0eWxlUHJvcGVydHkgKTtcbn1cblxufSkoIHdpbmRvdyApO1xuIiwiLyoqXG4gKiBPdXRsYXllciBJdGVtXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ2V2ZW50RW1pdHRlci9FdmVudEVtaXR0ZXInLFxuICAgICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnLFxuICAgICAgICAnZ2V0LXN0eWxlLXByb3BlcnR5L2dldC1zdHlsZS1wcm9wZXJ0eScsXG4gICAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICAgIF0sXG4gICAgICBmdW5jdGlvbiggRXZlbnRFbWl0dGVyLCBnZXRTaXplLCBnZXRTdHlsZVByb3BlcnR5LCB1dGlscyApIHtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZlbnRFbWl0dGVyLCBnZXRTaXplLCBnZXRTdHlsZVByb3BlcnR5LCB1dGlscyApO1xuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCd3b2xmeTg3LWV2ZW50ZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLWdldC1zdHlsZS1wcm9wZXJ0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuT3V0bGF5ZXIgPSB7fTtcbiAgICB3aW5kb3cuT3V0bGF5ZXIuSXRlbSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZlbnRFbWl0dGVyLFxuICAgICAgd2luZG93LmdldFNpemUsXG4gICAgICB3aW5kb3cuZ2V0U3R5bGVQcm9wZXJ0eSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdmVudEVtaXR0ZXIsIGdldFNpemUsIGdldFN0eWxlUHJvcGVydHksIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLSBoZWxwZXJzIC0tLS0tIC8vXG5cbnZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG52YXIgZ2V0U3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlID9cbiAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcbiAgfSA6XG4gIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBlbGVtLmN1cnJlbnRTdHlsZTtcbiAgfTtcblxuXG5mdW5jdGlvbiBpc0VtcHR5T2JqKCBvYmogKSB7XG4gIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHJvcCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDU1MzIHN1cHBvcnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zaXRpb24nKTtcbnZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xudmFyIHN1cHBvcnRzQ1NTMyA9IHRyYW5zaXRpb25Qcm9wZXJ0eSAmJiB0cmFuc2Zvcm1Qcm9wZXJ0eTtcbnZhciBpczNkID0gISFnZXRTdHlsZVByb3BlcnR5KCdwZXJzcGVjdGl2ZScpO1xuXG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0ge1xuICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgT1RyYW5zaXRpb246ICdvdHJhbnNpdGlvbmVuZCcsXG4gIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJ1xufVsgdHJhbnNpdGlvblByb3BlcnR5IF07XG5cbi8vIHByb3BlcnRpZXMgdGhhdCBjb3VsZCBoYXZlIHZlbmRvciBwcmVmaXhcbnZhciBwcmVmaXhhYmxlUHJvcGVydGllcyA9IFtcbiAgJ3RyYW5zZm9ybScsXG4gICd0cmFuc2l0aW9uJyxcbiAgJ3RyYW5zaXRpb25EdXJhdGlvbicsXG4gICd0cmFuc2l0aW9uUHJvcGVydHknXG5dO1xuXG4vLyBjYWNoZSBhbGwgdmVuZG9yIHByb3BlcnRpZXNcbnZhciB2ZW5kb3JQcm9wZXJ0aWVzID0gKCBmdW5jdGlvbigpIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHByZWZpeGFibGVQcm9wZXJ0aWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBwcm9wID0gcHJlZml4YWJsZVByb3BlcnRpZXNbaV07XG4gICAgdmFyIHN1cHBvcnRlZFByb3AgPSBnZXRTdHlsZVByb3BlcnR5KCBwcm9wICk7XG4gICAgaWYgKCBzdXBwb3J0ZWRQcm9wICYmIHN1cHBvcnRlZFByb3AgIT09IHByb3AgKSB7XG4gICAgICBjYWNoZVsgcHJvcCBdID0gc3VwcG9ydGVkUHJvcDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhY2hlO1xufSkoKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSXRlbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBJdGVtKCBlbGVtZW50LCBsYXlvdXQgKSB7XG4gIGlmICggIWVsZW1lbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgLy8gcGFyZW50IGxheW91dCBjbGFzcywgaS5lLiBNYXNvbnJ5LCBJc290b3BlLCBvciBQYWNrZXJ5XG4gIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICB0aGlzLnBvc2l0aW9uID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG4vLyBpbmhlcml0IEV2ZW50RW1pdHRlclxudXRpbHMuZXh0ZW5kKCBJdGVtLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5JdGVtLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHRyYW5zaXRpb24gb2JqZWN0c1xuICB0aGlzLl90cmFuc24gPSB7XG4gICAgaW5nUHJvcGVydGllczoge30sXG4gICAgY2xlYW46IHt9LFxuICAgIG9uRW5kOiB7fVxuICB9O1xuXG4gIHRoaXMuY3NzKHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICB9KTtcbn07XG5cbi8vIHRyaWdnZXIgc3BlY2lmaWVkIGhhbmRsZXIgZm9yIGV2ZW50IHR5cGVcbkl0ZW0ucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG4vKipcbiAqIGFwcGx5IENTUyBzdHlsZXMgdG8gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKi9cbkl0ZW0ucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKCBzdHlsZSApIHtcbiAgdmFyIGVsZW1TdHlsZSA9IHRoaXMuZWxlbWVudC5zdHlsZTtcblxuICBmb3IgKCB2YXIgcHJvcCBpbiBzdHlsZSApIHtcbiAgICAvLyB1c2UgdmVuZG9yIHByb3BlcnR5IGlmIGF2YWlsYWJsZVxuICAgIHZhciBzdXBwb3J0ZWRQcm9wID0gdmVuZG9yUHJvcGVydGllc1sgcHJvcCBdIHx8IHByb3A7XG4gICAgZWxlbVN0eWxlWyBzdXBwb3J0ZWRQcm9wIF0gPSBzdHlsZVsgcHJvcCBdO1xuICB9XG59O1xuXG4gLy8gbWVhc3VyZSBwb3NpdGlvbiwgYW5kIHNldHMgaXRcbkl0ZW0ucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCB0aGlzLmVsZW1lbnQgKTtcbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICB2YXIgaXNPcmlnaW5MZWZ0ID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpbkxlZnQ7XG4gIHZhciBpc09yaWdpblRvcCA9IGxheW91dE9wdGlvbnMuaXNPcmlnaW5Ub3A7XG4gIHZhciB4VmFsdWUgPSBzdHlsZVsgaXNPcmlnaW5MZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JyBdO1xuICB2YXIgeVZhbHVlID0gc3R5bGVbIGlzT3JpZ2luVG9wID8gJ3RvcCcgOiAnYm90dG9tJyBdO1xuICAvLyBjb252ZXJ0IHBlcmNlbnQgdG8gcGl4ZWxzXG4gIHZhciBsYXlvdXRTaXplID0gdGhpcy5sYXlvdXQuc2l6ZTtcbiAgdmFyIHggPSB4VmFsdWUuaW5kZXhPZignJScpICE9IC0xID9cbiAgICAoIHBhcnNlRmxvYXQoIHhWYWx1ZSApIC8gMTAwICkgKiBsYXlvdXRTaXplLndpZHRoIDogcGFyc2VJbnQoIHhWYWx1ZSwgMTAgKTtcbiAgdmFyIHkgPSB5VmFsdWUuaW5kZXhPZignJScpICE9IC0xID9cbiAgICAoIHBhcnNlRmxvYXQoIHlWYWx1ZSApIC8gMTAwICkgKiBsYXlvdXRTaXplLmhlaWdodCA6IHBhcnNlSW50KCB5VmFsdWUsIDEwICk7XG5cbiAgLy8gY2xlYW4gdXAgJ2F1dG8nIG9yIG90aGVyIG5vbi1pbnRlZ2VyIHZhbHVlc1xuICB4ID0gaXNOYU4oIHggKSA/IDAgOiB4O1xuICB5ID0gaXNOYU4oIHkgKSA/IDAgOiB5O1xuICAvLyByZW1vdmUgcGFkZGluZyBmcm9tIG1lYXN1cmVtZW50XG4gIHggLT0gaXNPcmlnaW5MZWZ0ID8gbGF5b3V0U2l6ZS5wYWRkaW5nTGVmdCA6IGxheW91dFNpemUucGFkZGluZ1JpZ2h0O1xuICB5IC09IGlzT3JpZ2luVG9wID8gbGF5b3V0U2l6ZS5wYWRkaW5nVG9wIDogbGF5b3V0U2l6ZS5wYWRkaW5nQm90dG9tO1xuXG4gIHRoaXMucG9zaXRpb24ueCA9IHg7XG4gIHRoaXMucG9zaXRpb24ueSA9IHk7XG59O1xuXG4vLyBzZXQgc2V0dGxlZCBwb3NpdGlvbiwgYXBwbHkgcGFkZGluZ1xuSXRlbS5wcm90b3R5cGUubGF5b3V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxheW91dFNpemUgPSB0aGlzLmxheW91dC5zaXplO1xuICB2YXIgbGF5b3V0T3B0aW9ucyA9IHRoaXMubGF5b3V0Lm9wdGlvbnM7XG4gIHZhciBzdHlsZSA9IHt9O1xuXG4gIC8vIHhcbiAgdmFyIHhQYWRkaW5nID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpbkxlZnQgPyAncGFkZGluZ0xlZnQnIDogJ3BhZGRpbmdSaWdodCc7XG4gIHZhciB4UHJvcGVydHkgPSBsYXlvdXRPcHRpb25zLmlzT3JpZ2luTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gIHZhciB4UmVzZXRQcm9wZXJ0eSA9IGxheW91dE9wdGlvbnMuaXNPcmlnaW5MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0JztcblxuICB2YXIgeCA9IHRoaXMucG9zaXRpb24ueCArIGxheW91dFNpemVbIHhQYWRkaW5nIF07XG4gIC8vIHNldCBpbiBwZXJjZW50YWdlIG9yIHBpeGVsc1xuICBzdHlsZVsgeFByb3BlcnR5IF0gPSB0aGlzLmdldFhWYWx1ZSggeCApO1xuICAvLyByZXNldCBvdGhlciBwcm9wZXJ0eVxuICBzdHlsZVsgeFJlc2V0UHJvcGVydHkgXSA9ICcnO1xuXG4gIC8vIHlcbiAgdmFyIHlQYWRkaW5nID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpblRvcCA/ICdwYWRkaW5nVG9wJyA6ICdwYWRkaW5nQm90dG9tJztcbiAgdmFyIHlQcm9wZXJ0eSA9IGxheW91dE9wdGlvbnMuaXNPcmlnaW5Ub3AgPyAndG9wJyA6ICdib3R0b20nO1xuICB2YXIgeVJlc2V0UHJvcGVydHkgPSBsYXlvdXRPcHRpb25zLmlzT3JpZ2luVG9wID8gJ2JvdHRvbScgOiAndG9wJztcblxuICB2YXIgeSA9IHRoaXMucG9zaXRpb24ueSArIGxheW91dFNpemVbIHlQYWRkaW5nIF07XG4gIC8vIHNldCBpbiBwZXJjZW50YWdlIG9yIHBpeGVsc1xuICBzdHlsZVsgeVByb3BlcnR5IF0gPSB0aGlzLmdldFlWYWx1ZSggeSApO1xuICAvLyByZXNldCBvdGhlciBwcm9wZXJ0eVxuICBzdHlsZVsgeVJlc2V0UHJvcGVydHkgXSA9ICcnO1xuXG4gIHRoaXMuY3NzKCBzdHlsZSApO1xuICB0aGlzLmVtaXRFdmVudCggJ2xheW91dCcsIFsgdGhpcyBdICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5nZXRYVmFsdWUgPSBmdW5jdGlvbiggeCApIHtcbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICByZXR1cm4gbGF5b3V0T3B0aW9ucy5wZXJjZW50UG9zaXRpb24gJiYgIWxheW91dE9wdGlvbnMuaXNIb3Jpem9udGFsID9cbiAgICAoICggeCAvIHRoaXMubGF5b3V0LnNpemUud2lkdGggKSAqIDEwMCApICsgJyUnIDogeCArICdweCc7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5nZXRZVmFsdWUgPSBmdW5jdGlvbiggeSApIHtcbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICByZXR1cm4gbGF5b3V0T3B0aW9ucy5wZXJjZW50UG9zaXRpb24gJiYgbGF5b3V0T3B0aW9ucy5pc0hvcml6b250YWwgP1xuICAgICggKCB5IC8gdGhpcy5sYXlvdXQuc2l6ZS5oZWlnaHQgKSAqIDEwMCApICsgJyUnIDogeSArICdweCc7XG59O1xuXG5cbkl0ZW0ucHJvdG90eXBlLl90cmFuc2l0aW9uVG8gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5nZXRQb3NpdGlvbigpO1xuICAvLyBnZXQgY3VycmVudCB4ICYgeSBmcm9tIHRvcC9sZWZ0XG4gIHZhciBjdXJYID0gdGhpcy5wb3NpdGlvbi54O1xuICB2YXIgY3VyWSA9IHRoaXMucG9zaXRpb24ueTtcblxuICB2YXIgY29tcGFyZVggPSBwYXJzZUludCggeCwgMTAgKTtcbiAgdmFyIGNvbXBhcmVZID0gcGFyc2VJbnQoIHksIDEwICk7XG4gIHZhciBkaWROb3RNb3ZlID0gY29tcGFyZVggPT09IHRoaXMucG9zaXRpb24ueCAmJiBjb21wYXJlWSA9PT0gdGhpcy5wb3NpdGlvbi55O1xuXG4gIC8vIHNhdmUgZW5kIHBvc2l0aW9uXG4gIHRoaXMuc2V0UG9zaXRpb24oIHgsIHkgKTtcblxuICAvLyBpZiBkaWQgbm90IG1vdmUgYW5kIG5vdCB0cmFuc2l0aW9uaW5nLCBqdXN0IGdvIHRvIGxheW91dFxuICBpZiAoIGRpZE5vdE1vdmUgJiYgIXRoaXMuaXNUcmFuc2l0aW9uaW5nICkge1xuICAgIHRoaXMubGF5b3V0UG9zaXRpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdHJhbnNYID0geCAtIGN1clg7XG4gIHZhciB0cmFuc1kgPSB5IC0gY3VyWTtcbiAgdmFyIHRyYW5zaXRpb25TdHlsZSA9IHt9O1xuICB0cmFuc2l0aW9uU3R5bGUudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2xhdGUoIHRyYW5zWCwgdHJhbnNZICk7XG5cbiAgdGhpcy50cmFuc2l0aW9uKHtcbiAgICB0bzogdHJhbnNpdGlvblN0eWxlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDoge1xuICAgICAgdHJhbnNmb3JtOiB0aGlzLmxheW91dFBvc2l0aW9uXG4gICAgfSxcbiAgICBpc0NsZWFuaW5nOiB0cnVlXG4gIH0pO1xufTtcblxuSXRlbS5wcm90b3R5cGUuZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIC8vIGZsaXAgY29vcmlkaW5hdGVzIGlmIG9yaWdpbiBvbiByaWdodCBvciBib3R0b21cbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICB4ID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpbkxlZnQgPyB4IDogLXg7XG4gIHkgPSBsYXlvdXRPcHRpb25zLmlzT3JpZ2luVG9wID8geSA6IC15O1xuXG4gIGlmICggaXMzZCApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICB9XG5cbiAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KSc7XG59O1xuXG4vLyBub24gdHJhbnNpdGlvbiArIHRyYW5zZm9ybSBzdXBwb3J0XG5JdGVtLnByb3RvdHlwZS5nb1RvID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIHRoaXMuc2V0UG9zaXRpb24oIHgsIHkgKTtcbiAgdGhpcy5sYXlvdXRQb3NpdGlvbigpO1xufTtcblxuLy8gdXNlIHRyYW5zaXRpb24gYW5kIHRyYW5zZm9ybXMgaWYgc3VwcG9ydGVkXG5JdGVtLnByb3RvdHlwZS5tb3ZlVG8gPSBzdXBwb3J0c0NTUzMgP1xuICBJdGVtLnByb3RvdHlwZS5fdHJhbnNpdGlvblRvIDogSXRlbS5wcm90b3R5cGUuZ29UbztcblxuSXRlbS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5wb3NpdGlvbi54ID0gcGFyc2VJbnQoIHgsIDEwICk7XG4gIHRoaXMucG9zaXRpb24ueSA9IHBhcnNlSW50KCB5LCAxMCApO1xufTtcblxuLy8gLS0tLS0gdHJhbnNpdGlvbiAtLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSAtIENTU1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25UcmFuc2l0aW9uRW5kXG4gKi9cblxuLy8gbm9uIHRyYW5zaXRpb24sIGp1c3QgdHJpZ2dlciBjYWxsYmFja1xuSXRlbS5wcm90b3R5cGUuX25vblRyYW5zaXRpb24gPSBmdW5jdGlvbiggYXJncyApIHtcbiAgdGhpcy5jc3MoIGFyZ3MudG8gKTtcbiAgaWYgKCBhcmdzLmlzQ2xlYW5pbmcgKSB7XG4gICAgdGhpcy5fcmVtb3ZlU3R5bGVzKCBhcmdzLnRvICk7XG4gIH1cbiAgZm9yICggdmFyIHByb3AgaW4gYXJncy5vblRyYW5zaXRpb25FbmQgKSB7XG4gICAgYXJncy5vblRyYW5zaXRpb25FbmRbIHByb3AgXS5jYWxsKCB0aGlzICk7XG4gIH1cbn07XG5cbi8qKlxuICogcHJvcGVyIHRyYW5zaXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIC0gYXJndW1lbnRzXG4gKiAgIEBwYXJhbSB7T2JqZWN0fSB0byAtIHN0eWxlIHRvIHRyYW5zaXRpb24gdG9cbiAqICAgQHBhcmFtIHtPYmplY3R9IGZyb20gLSBzdHlsZSB0byBzdGFydCB0cmFuc2l0aW9uIGZyb21cbiAqICAgQHBhcmFtIHtCb29sZWFufSBpc0NsZWFuaW5nIC0gcmVtb3ZlcyB0cmFuc2l0aW9uIHN0eWxlcyBhZnRlciB0cmFuc2l0aW9uXG4gKiAgIEBwYXJhbSB7RnVuY3Rpb259IG9uVHJhbnNpdGlvbkVuZCAtIGNhbGxiYWNrXG4gKi9cbkl0ZW0ucHJvdG90eXBlLl90cmFuc2l0aW9uID0gZnVuY3Rpb24oIGFyZ3MgKSB7XG4gIC8vIHJlZGlyZWN0IHRvIG5vblRyYW5zaXRpb24gaWYgbm8gdHJhbnNpdGlvbiBkdXJhdGlvblxuICBpZiAoICFwYXJzZUZsb2F0KCB0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbiApICkge1xuICAgIHRoaXMuX25vblRyYW5zaXRpb24oIGFyZ3MgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX3RyYW5zaXRpb24gPSB0aGlzLl90cmFuc247XG4gIC8vIGtlZXAgdHJhY2sgb2Ygb25UcmFuc2l0aW9uRW5kIGNhbGxiYWNrIGJ5IGNzcyBwcm9wZXJ0eVxuICBmb3IgKCB2YXIgcHJvcCBpbiBhcmdzLm9uVHJhbnNpdGlvbkVuZCApIHtcbiAgICBfdHJhbnNpdGlvbi5vbkVuZFsgcHJvcCBdID0gYXJncy5vblRyYW5zaXRpb25FbmRbIHByb3AgXTtcbiAgfVxuICAvLyBrZWVwIHRyYWNrIG9mIHByb3BlcnRpZXMgdGhhdCBhcmUgdHJhbnNpdGlvbmluZ1xuICBmb3IgKCBwcm9wIGluIGFyZ3MudG8gKSB7XG4gICAgX3RyYW5zaXRpb24uaW5nUHJvcGVydGllc1sgcHJvcCBdID0gdHJ1ZTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIHByb3BlcnRpZXMgdG8gY2xlYW4gdXAgd2hlbiB0cmFuc2l0aW9uIGlzIGRvbmVcbiAgICBpZiAoIGFyZ3MuaXNDbGVhbmluZyApIHtcbiAgICAgIF90cmFuc2l0aW9uLmNsZWFuWyBwcm9wIF0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBmcm9tIHN0eWxlc1xuICBpZiAoIGFyZ3MuZnJvbSApIHtcbiAgICB0aGlzLmNzcyggYXJncy5mcm9tICk7XG4gICAgLy8gZm9yY2UgcmVkcmF3LiBodHRwOi8vYmxvZy5hbGV4bWFjY2F3LmNvbS9jc3MtdHJhbnNpdGlvbnNcbiAgICB2YXIgaCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gaGFjayBmb3IgSlNIaW50IHRvIGh1c2ggYWJvdXQgdW51c2VkIHZhclxuICAgIGggPSBudWxsO1xuICB9XG4gIC8vIGVuYWJsZSB0cmFuc2l0aW9uXG4gIHRoaXMuZW5hYmxlVHJhbnNpdGlvbiggYXJncy50byApO1xuICAvLyBzZXQgc3R5bGVzIHRoYXQgYXJlIHRyYW5zaXRpb25pbmdcbiAgdGhpcy5jc3MoIGFyZ3MudG8gKTtcblxuICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbn07XG5cbi8vIGRhc2ggYmVmb3JlIGFsbCBjYXAgbGV0dGVycywgaW5jbHVkaW5nIGZpcnN0IGZvclxuLy8gV2Via2l0VHJhbnNmb3JtID0+IC13ZWJraXQtdHJhbnNmb3JtXG5mdW5jdGlvbiB0b0Rhc2hlZEFsbCggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oW0EtWl0pL2csIGZ1bmN0aW9uKCAkMSApIHtcbiAgICByZXR1cm4gJy0nICsgJDEudG9Mb3dlckNhc2UoKTtcbiAgfSk7XG59XG5cbnZhciB0cmFuc2l0aW9uUHJvcHMgPSAnb3BhY2l0eSwnICtcbiAgdG9EYXNoZWRBbGwoIHZlbmRvclByb3BlcnRpZXMudHJhbnNmb3JtIHx8ICd0cmFuc2Zvcm0nICk7XG5cbkl0ZW0ucHJvdG90eXBlLmVuYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbigvKiBzdHlsZSAqLykge1xuICAvLyBIQUNLIGNoYW5naW5nIHRyYW5zaXRpb25Qcm9wZXJ0eSBkdXJpbmcgYSB0cmFuc2l0aW9uXG4gIC8vIHdpbGwgY2F1c2UgdHJhbnNpdGlvbiB0byBqdW1wXG4gIGlmICggdGhpcy5pc1RyYW5zaXRpb25pbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gbWFrZSBgdHJhbnNpdGlvbjogZm9vLCBiYXIsIGJhemAgZnJvbSBzdHlsZSBvYmplY3RcbiAgLy8gSEFDSyB1bi1jb21tZW50IHRoaXMgd2hlbiBlbmFibGVUcmFuc2l0aW9uIGNhbiB3b3JrXG4gIC8vIHdoaWxlIGEgdHJhbnNpdGlvbiBpcyBoYXBwZW5pbmdcbiAgLy8gdmFyIHRyYW5zaXRpb25WYWx1ZXMgPSBbXTtcbiAgLy8gZm9yICggdmFyIHByb3AgaW4gc3R5bGUgKSB7XG4gIC8vICAgLy8gZGFzaC1pZnkgY2FtZWxDYXNlZCBwcm9wZXJ0aWVzIGxpa2UgV2Via2l0VHJhbnNpdGlvblxuICAvLyAgIHByb3AgPSB2ZW5kb3JQcm9wZXJ0aWVzWyBwcm9wIF0gfHwgcHJvcDtcbiAgLy8gICB0cmFuc2l0aW9uVmFsdWVzLnB1c2goIHRvRGFzaGVkQWxsKCBwcm9wICkgKTtcbiAgLy8gfVxuICAvLyBlbmFibGUgdHJhbnNpdGlvbiBzdHlsZXNcbiAgdGhpcy5jc3Moe1xuICAgIHRyYW5zaXRpb25Qcm9wZXJ0eTogdHJhbnNpdGlvblByb3BzLFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjogdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb25cbiAgfSk7XG4gIC8vIGxpc3RlbiBmb3IgdHJhbnNpdGlvbiBlbmQgZXZlbnRcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIHRyYW5zaXRpb25FbmRFdmVudCwgdGhpcywgZmFsc2UgKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnRyYW5zaXRpb24gPSBJdGVtLnByb3RvdHlwZVsgdHJhbnNpdGlvblByb3BlcnR5ID8gJ190cmFuc2l0aW9uJyA6ICdfbm9uVHJhbnNpdGlvbicgXTtcblxuLy8gLS0tLS0gZXZlbnRzIC0tLS0tIC8vXG5cbkl0ZW0ucHJvdG90eXBlLm9ud2Via2l0VHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5vbnRyYW5zaXRpb25lbmQoIGV2ZW50ICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5vbm90cmFuc2l0aW9uZW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLm9udHJhbnNpdGlvbmVuZCggZXZlbnQgKTtcbn07XG5cbi8vIHByb3BlcnRpZXMgdGhhdCBJIG11bmdlIHRvIG1ha2UgbXkgbGlmZSBlYXNpZXJcbnZhciBkYXNoZWRWZW5kb3JQcm9wZXJ0aWVzID0ge1xuICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNmb3JtJyxcbiAgJy1tb3otdHJhbnNmb3JtJzogJ3RyYW5zZm9ybScsXG4gICctby10cmFuc2Zvcm0nOiAndHJhbnNmb3JtJ1xufTtcblxuSXRlbS5wcm90b3R5cGUub250cmFuc2l0aW9uZW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBkaXNyZWdhcmQgYnViYmxlZCBldmVudHMgZnJvbSBjaGlsZHJlblxuICBpZiAoIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5lbGVtZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgX3RyYW5zaXRpb24gPSB0aGlzLl90cmFuc247XG4gIC8vIGdldCBwcm9wZXJ0eSBuYW1lIG9mIHRyYW5zaXRpb25lZCBwcm9wZXJ0eSwgY29udmVydCB0byBwcmVmaXgtZnJlZVxuICB2YXIgcHJvcGVydHlOYW1lID0gZGFzaGVkVmVuZG9yUHJvcGVydGllc1sgZXZlbnQucHJvcGVydHlOYW1lIF0gfHwgZXZlbnQucHJvcGVydHlOYW1lO1xuXG4gIC8vIHJlbW92ZSBwcm9wZXJ0eSB0aGF0IGhhcyBjb21wbGV0ZWQgdHJhbnNpdGlvbmluZ1xuICBkZWxldGUgX3RyYW5zaXRpb24uaW5nUHJvcGVydGllc1sgcHJvcGVydHlOYW1lIF07XG4gIC8vIGNoZWNrIGlmIGFueSBwcm9wZXJ0aWVzIGFyZSBzdGlsbCB0cmFuc2l0aW9uaW5nXG4gIGlmICggaXNFbXB0eU9iaiggX3RyYW5zaXRpb24uaW5nUHJvcGVydGllcyApICkge1xuICAgIC8vIGFsbCBwcm9wZXJ0aWVzIGhhdmUgY29tcGxldGVkIHRyYW5zaXRpb25pbmdcbiAgICB0aGlzLmRpc2FibGVUcmFuc2l0aW9uKCk7XG4gIH1cbiAgLy8gY2xlYW4gc3R5bGVcbiAgaWYgKCBwcm9wZXJ0eU5hbWUgaW4gX3RyYW5zaXRpb24uY2xlYW4gKSB7XG4gICAgLy8gY2xlYW4gdXAgc3R5bGVcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGVbIGV2ZW50LnByb3BlcnR5TmFtZSBdID0gJyc7XG4gICAgZGVsZXRlIF90cmFuc2l0aW9uLmNsZWFuWyBwcm9wZXJ0eU5hbWUgXTtcbiAgfVxuICAvLyB0cmlnZ2VyIG9uVHJhbnNpdGlvbkVuZCBjYWxsYmFja1xuICBpZiAoIHByb3BlcnR5TmFtZSBpbiBfdHJhbnNpdGlvbi5vbkVuZCApIHtcbiAgICB2YXIgb25UcmFuc2l0aW9uRW5kID0gX3RyYW5zaXRpb24ub25FbmRbIHByb3BlcnR5TmFtZSBdO1xuICAgIG9uVHJhbnNpdGlvbkVuZC5jYWxsKCB0aGlzICk7XG4gICAgZGVsZXRlIF90cmFuc2l0aW9uLm9uRW5kWyBwcm9wZXJ0eU5hbWUgXTtcbiAgfVxuXG4gIHRoaXMuZW1pdEV2ZW50KCAndHJhbnNpdGlvbkVuZCcsIFsgdGhpcyBdICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5kaXNhYmxlVHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlbW92ZVRyYW5zaXRpb25TdHlsZXMoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHRyYW5zaXRpb25FbmRFdmVudCwgdGhpcywgZmFsc2UgKTtcbiAgdGhpcy5pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogcmVtb3ZlcyBzdHlsZSBwcm9wZXJ0eSBmcm9tIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZVxuKiovXG5JdGVtLnByb3RvdHlwZS5fcmVtb3ZlU3R5bGVzID0gZnVuY3Rpb24oIHN0eWxlICkge1xuICAvLyBjbGVhbiB1cCB0cmFuc2l0aW9uIHN0eWxlc1xuICB2YXIgY2xlYW5TdHlsZSA9IHt9O1xuICBmb3IgKCB2YXIgcHJvcCBpbiBzdHlsZSApIHtcbiAgICBjbGVhblN0eWxlWyBwcm9wIF0gPSAnJztcbiAgfVxuICB0aGlzLmNzcyggY2xlYW5TdHlsZSApO1xufTtcblxudmFyIGNsZWFuVHJhbnNpdGlvblN0eWxlID0ge1xuICB0cmFuc2l0aW9uUHJvcGVydHk6ICcnLFxuICB0cmFuc2l0aW9uRHVyYXRpb246ICcnXG59O1xuXG5JdGVtLnByb3RvdHlwZS5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSB0cmFuc2l0aW9uXG4gIHRoaXMuY3NzKCBjbGVhblRyYW5zaXRpb25TdHlsZSApO1xufTtcblxuLy8gLS0tLS0gc2hvdy9oaWRlL3JlbW92ZSAtLS0tLSAvL1xuXG4vLyByZW1vdmUgZWxlbWVudCBmcm9tIERPTVxuSXRlbS5wcm90b3R5cGUucmVtb3ZlRWxlbSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG4gIC8vIHJlbW92ZSBkaXNwbGF5OiBub25lXG4gIHRoaXMuY3NzKHsgZGlzcGxheTogJycgfSk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncmVtb3ZlJywgWyB0aGlzIF0gKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBqdXN0IHJlbW92ZSBlbGVtZW50IGlmIG5vIHRyYW5zaXRpb24gc3VwcG9ydCBvciBubyB0cmFuc2l0aW9uXG4gIGlmICggIXRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAhcGFyc2VGbG9hdCggdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb24gKSApIHtcbiAgICB0aGlzLnJlbW92ZUVsZW0oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzdGFydCB0cmFuc2l0aW9uXG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHRoaXMub25jZSggJ3RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHtcbiAgICBfdGhpcy5yZW1vdmVFbGVtKCk7XG4gIH0pO1xuICB0aGlzLmhpZGUoKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnJldmVhbCA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5pc0hpZGRlbjtcbiAgLy8gcmVtb3ZlIGRpc3BsYXk6IG5vbmVcbiAgdGhpcy5jc3MoeyBkaXNwbGF5OiAnJyB9KTtcblxuICB2YXIgb3B0aW9ucyA9IHRoaXMubGF5b3V0Lm9wdGlvbnM7XG5cbiAgdmFyIG9uVHJhbnNpdGlvbkVuZCA9IHt9O1xuICB2YXIgdHJhbnNpdGlvbkVuZFByb3BlcnR5ID0gdGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KCd2aXNpYmxlU3R5bGUnKTtcbiAgb25UcmFuc2l0aW9uRW5kWyB0cmFuc2l0aW9uRW5kUHJvcGVydHkgXSA9IHRoaXMub25SZXZlYWxUcmFuc2l0aW9uRW5kO1xuXG4gIHRoaXMudHJhbnNpdGlvbih7XG4gICAgZnJvbTogb3B0aW9ucy5oaWRkZW5TdHlsZSxcbiAgICB0bzogb3B0aW9ucy52aXNpYmxlU3R5bGUsXG4gICAgaXNDbGVhbmluZzogdHJ1ZSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IG9uVHJhbnNpdGlvbkVuZFxuICB9KTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBpZiBzdGlsbCB2aXNpYmxlXG4gIC8vIGR1cmluZyB0cmFuc2l0aW9uLCBpdGVtIG1heSBoYXZlIGJlZW4gaGlkZGVuXG4gIGlmICggIXRoaXMuaXNIaWRkZW4gKSB7XG4gICAgdGhpcy5lbWl0RXZlbnQoJ3JldmVhbCcpO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCBzdHlsZSBwcm9wZXJ0eSB1c2UgZm9yIGhpZGUvcmV2ZWFsIHRyYW5zaXRpb24gZW5kXG4gKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVQcm9wZXJ0eSAtIGhpZGRlblN0eWxlL3Zpc2libGVTdHlsZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSXRlbS5wcm90b3R5cGUuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eSA9IGZ1bmN0aW9uKCBzdHlsZVByb3BlcnR5ICkge1xuICB2YXIgb3B0aW9uU3R5bGUgPSB0aGlzLmxheW91dC5vcHRpb25zWyBzdHlsZVByb3BlcnR5IF07XG4gIC8vIHVzZSBvcGFjaXR5XG4gIGlmICggb3B0aW9uU3R5bGUub3BhY2l0eSApIHtcbiAgICByZXR1cm4gJ29wYWNpdHknO1xuICB9XG4gIC8vIGdldCBmaXJzdCBwcm9wZXJ0eVxuICBmb3IgKCB2YXIgcHJvcCBpbiBvcHRpb25TdHlsZSApIHtcbiAgICByZXR1cm4gcHJvcDtcbiAgfVxufTtcblxuSXRlbS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBzZXQgZmxhZ1xuICB0aGlzLmlzSGlkZGVuID0gdHJ1ZTtcbiAgLy8gcmVtb3ZlIGRpc3BsYXk6IG5vbmVcbiAgdGhpcy5jc3MoeyBkaXNwbGF5OiAnJyB9KTtcblxuICB2YXIgb3B0aW9ucyA9IHRoaXMubGF5b3V0Lm9wdGlvbnM7XG5cbiAgdmFyIG9uVHJhbnNpdGlvbkVuZCA9IHt9O1xuICB2YXIgdHJhbnNpdGlvbkVuZFByb3BlcnR5ID0gdGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KCdoaWRkZW5TdHlsZScpO1xuICBvblRyYW5zaXRpb25FbmRbIHRyYW5zaXRpb25FbmRQcm9wZXJ0eSBdID0gdGhpcy5vbkhpZGVUcmFuc2l0aW9uRW5kO1xuXG4gIHRoaXMudHJhbnNpdGlvbih7XG4gICAgZnJvbTogb3B0aW9ucy52aXNpYmxlU3R5bGUsXG4gICAgdG86IG9wdGlvbnMuaGlkZGVuU3R5bGUsXG4gICAgLy8ga2VlcCBoaWRkZW4gc3R1ZmYgaGlkZGVuXG4gICAgaXNDbGVhbmluZzogdHJ1ZSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IG9uVHJhbnNpdGlvbkVuZFxuICB9KTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLm9uSGlkZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgaWYgc3RpbGwgaGlkZGVuXG4gIC8vIGR1cmluZyB0cmFuc2l0aW9uLCBpdGVtIG1heSBoYXZlIGJlZW4gdW4taGlkZGVuXG4gIGlmICggdGhpcy5pc0hpZGRlbiApIHtcbiAgICB0aGlzLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICB0aGlzLmVtaXRFdmVudCgnaGlkZScpO1xuICB9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3NzKHtcbiAgICBwb3NpdGlvbjogJycsXG4gICAgbGVmdDogJycsXG4gICAgcmlnaHQ6ICcnLFxuICAgIHRvcDogJycsXG4gICAgYm90dG9tOiAnJyxcbiAgICB0cmFuc2l0aW9uOiAnJyxcbiAgICB0cmFuc2Zvcm06ICcnXG4gIH0pO1xufTtcblxucmV0dXJuIEl0ZW07XG5cbn0pKTtcbiIsIi8qIVxuICogT3V0bGF5ZXIgdjEuNC4yXG4gKiB0aGUgYnJhaW5zIGFuZCBndXRzIG9mIGEgbGF5b3V0IGxpYnJhcnlcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAgICdldmVudGllL2V2ZW50aWUnLFxuICAgICAgICAnZXZlbnRFbWl0dGVyL0V2ZW50RW1pdHRlcicsXG4gICAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZScsXG4gICAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAgICcuL2l0ZW0nXG4gICAgICBdLFxuICAgICAgZnVuY3Rpb24oIGV2ZW50aWUsIEV2ZW50RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIEl0ZW0gKSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGV2ZW50aWUsIEV2ZW50RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIEl0ZW0pO1xuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXZlbnRpZScpLFxuICAgICAgcmVxdWlyZSgnd29sZnk4Ny1ldmVudGVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICAgcmVxdWlyZSgnLi9pdGVtJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93Lk91dGxheWVyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5ldmVudGllLFxuICAgICAgd2luZG93LkV2ZW50RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIHdpbmRvdy5PdXRsYXllci5JdGVtXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgZXZlbnRpZSwgRXZlbnRFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgSXRlbSApIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gdmFycyAtLS0tLSAvL1xuXG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG52YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE91dGxheWVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyc1xudmFyIEdVSUQgPSAwO1xuLy8gaW50ZXJuYWwgc3RvcmUgb2YgYWxsIE91dGxheWVyIGludGFuY2VzXG52YXIgaW5zdGFuY2VzID0ge307XG5cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQsIFN0cmluZ30gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBPdXRsYXllciggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgdmFyIHF1ZXJ5RWxlbWVudCA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuICBpZiAoICFxdWVyeUVsZW1lbnQgKSB7XG4gICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lc3BhY2UgK1xuICAgICAgICAnOiAnICsgKCBxdWVyeUVsZW1lbnQgfHwgZWxlbWVudCApICk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQgPSBxdWVyeUVsZW1lbnQ7XG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cblxuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCgge30sIHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHMgKTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcblxuICAvLyBhZGQgaWQgZm9yIE91dGxheWVyLmdldEZyb21FbGVtZW50XG4gIHZhciBpZCA9ICsrR1VJRDtcbiAgdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRCA9IGlkOyAvLyBleHBhbmRvXG4gIGluc3RhbmNlc1sgaWQgXSA9IHRoaXM7IC8vIGFzc29jaWF0ZSB2aWEgaWRcblxuICAvLyBraWNrIGl0IG9mZlxuICB0aGlzLl9jcmVhdGUoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5pc0luaXRMYXlvdXQgKSB7XG4gICAgdGhpcy5sYXlvdXQoKTtcbiAgfVxufVxuXG4vLyBzZXR0aW5ncyBhcmUgZm9yIGludGVybmFsIHVzZSBvbmx5XG5PdXRsYXllci5uYW1lc3BhY2UgPSAnb3V0bGF5ZXInO1xuT3V0bGF5ZXIuSXRlbSA9IEl0ZW07XG5cbi8vIGRlZmF1bHQgb3B0aW9uc1xuT3V0bGF5ZXIuZGVmYXVsdHMgPSB7XG4gIGNvbnRhaW5lclN0eWxlOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfSxcbiAgaXNJbml0TGF5b3V0OiB0cnVlLFxuICBpc09yaWdpbkxlZnQ6IHRydWUsXG4gIGlzT3JpZ2luVG9wOiB0cnVlLFxuICBpc1Jlc2l6ZUJvdW5kOiB0cnVlLFxuICBpc1Jlc2l6aW5nQ29udGFpbmVyOiB0cnVlLFxuICAvLyBpdGVtIG9wdGlvbnNcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiAnMC40cycsXG4gIGhpZGRlblN0eWxlOiB7XG4gICAgb3BhY2l0eTogMCxcbiAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjAwMSknXG4gIH0sXG4gIHZpc2libGVTdHlsZToge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknXG4gIH1cbn07XG5cbi8vIGluaGVyaXQgRXZlbnRFbWl0dGVyXG51dGlscy5leHRlbmQoIE91dGxheWVyLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vKipcbiAqIHNldCBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5PdXRsYXllci5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIHV0aWxzLmV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG5PdXRsYXllci5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBnZXQgaXRlbXMgZnJvbSBjaGlsZHJlblxuICB0aGlzLnJlbG9hZEl0ZW1zKCk7XG4gIC8vIGVsZW1lbnRzIHRoYXQgYWZmZWN0IGxheW91dCwgYnV0IGFyZSBub3QgbGFpZCBvdXRcbiAgdGhpcy5zdGFtcHMgPSBbXTtcbiAgdGhpcy5zdGFtcCggdGhpcy5vcHRpb25zLnN0YW1wICk7XG4gIC8vIHNldCBjb250YWluZXIgc3R5bGVcbiAgdXRpbHMuZXh0ZW5kKCB0aGlzLmVsZW1lbnQuc3R5bGUsIHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSApO1xuXG4gIC8vIGJpbmQgcmVzaXplIG1ldGhvZFxuICBpZiAoIHRoaXMub3B0aW9ucy5pc1Jlc2l6ZUJvdW5kICkge1xuICAgIHRoaXMuYmluZFJlc2l6ZSgpO1xuICB9XG59O1xuXG4vLyBnb2VzIHRocm91Z2ggYWxsIGNoaWxkcmVuIGFnYWluIGFuZCBnZXRzIGJyaWNrcyBpbiBwcm9wZXIgb3JkZXJcbk91dGxheWVyLnByb3RvdHlwZS5yZWxvYWRJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAgdGhpcy5pdGVtcyA9IHRoaXMuX2l0ZW1pemUoIHRoaXMuZWxlbWVudC5jaGlsZHJlbiApO1xufTtcblxuXG4vKipcbiAqIHR1cm4gZWxlbWVudHMgaW50byBPdXRsYXllci5JdGVtcyB0byBiZSB1c2VkIGluIGxheW91dFxuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBIVE1MRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBjb2xsZWN0aW9uIG9mIG5ldyBPdXRsYXllciBJdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2l0ZW1pemUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG5cbiAgdmFyIGl0ZW1FbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRJdGVtRWxlbWVudHMoIGVsZW1zICk7XG4gIHZhciBJdGVtID0gdGhpcy5jb25zdHJ1Y3Rvci5JdGVtO1xuXG4gIC8vIGNyZWF0ZSBuZXcgT3V0bGF5ZXIgSXRlbXMgZm9yIGNvbGxlY3Rpb25cbiAgdmFyIGl0ZW1zID0gW107XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IGl0ZW1FbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgZWxlbSA9IGl0ZW1FbGVtc1tpXTtcbiAgICB2YXIgaXRlbSA9IG5ldyBJdGVtKCBlbGVtLCB0aGlzICk7XG4gICAgaXRlbXMucHVzaCggaXRlbSApO1xuICB9XG5cbiAgcmV0dXJuIGl0ZW1zO1xufTtcblxuLyoqXG4gKiBnZXQgaXRlbSBlbGVtZW50cyB0byBiZSB1c2VkIGluIGxheW91dFxuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBIVE1MRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBpdGVtIGVsZW1lbnRzXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgcmV0dXJuIHV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyggZWxlbXMsIHRoaXMub3B0aW9ucy5pdGVtU2VsZWN0b3IgKTtcbn07XG5cbi8qKlxuICogZ2V0dGVyIG1ldGhvZCBmb3IgZ2V0dGluZyBpdGVtIGVsZW1lbnRzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGVsZW1zIC0gY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5nZXRJdGVtRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVsZW1zID0gW107XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgZWxlbXMucHVzaCggdGhpcy5pdGVtc1tpXS5lbGVtZW50ICk7XG4gIH1cbiAgcmV0dXJuIGVsZW1zO1xufTtcblxuLy8gLS0tLS0gaW5pdCAmIGxheW91dCAtLS0tLSAvL1xuXG4vKipcbiAqIGxheXMgb3V0IGFsbCBpdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3Jlc2V0TGF5b3V0KCk7XG4gIHRoaXMuX21hbmFnZVN0YW1wcygpO1xuXG4gIC8vIGRvbid0IGFuaW1hdGUgZmlyc3QgbGF5b3V0XG4gIHZhciBpc0luc3RhbnQgPSB0aGlzLm9wdGlvbnMuaXNMYXlvdXRJbnN0YW50ICE9PSB1bmRlZmluZWQgP1xuICAgIHRoaXMub3B0aW9ucy5pc0xheW91dEluc3RhbnQgOiAhdGhpcy5faXNMYXlvdXRJbml0ZWQ7XG4gIHRoaXMubGF5b3V0SXRlbXMoIHRoaXMuaXRlbXMsIGlzSW5zdGFudCApO1xuXG4gIC8vIGZsYWcgZm9yIGluaXRhbGl6ZWRcbiAgdGhpcy5faXNMYXlvdXRJbml0ZWQgPSB0cnVlO1xufTtcblxuLy8gX2luaXQgaXMgYWxpYXMgZm9yIGxheW91dFxuT3V0bGF5ZXIucHJvdG90eXBlLl9pbml0ID0gT3V0bGF5ZXIucHJvdG90eXBlLmxheW91dDtcblxuLyoqXG4gKiBsb2dpYyBiZWZvcmUgYW55IG5ldyBsYXlvdXRcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLl9yZXNldExheW91dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdldFNpemUoKTtcbn07XG5cblxuT3V0bGF5ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG4vKipcbiAqIGdldCBtZWFzdXJlbWVudCBmcm9tIG9wdGlvbiwgZm9yIGNvbHVtbldpZHRoLCByb3dIZWlnaHQsIGd1dHRlclxuICogaWYgb3B0aW9uIGlzIFN0cmluZyAtPiBnZXQgZWxlbWVudCBmcm9tIHNlbGVjdG9yIHN0cmluZywgJiBnZXQgc2l6ZSBvZiBlbGVtZW50XG4gKiBpZiBvcHRpb24gaXMgRWxlbWVudCAtPiBnZXQgc2l6ZSBvZiBlbGVtZW50XG4gKiBlbHNlIHVzZSBvcHRpb24gYXMgYSBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVhc3VyZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gd2lkdGggb3IgaGVpZ2h0XG4gKiBAcHJpdmF0ZVxuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2dldE1lYXN1cmVtZW50ID0gZnVuY3Rpb24oIG1lYXN1cmVtZW50LCBzaXplICkge1xuICB2YXIgb3B0aW9uID0gdGhpcy5vcHRpb25zWyBtZWFzdXJlbWVudCBdO1xuICB2YXIgZWxlbTtcbiAgaWYgKCAhb3B0aW9uICkge1xuICAgIC8vIGRlZmF1bHQgdG8gMFxuICAgIHRoaXNbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBvcHRpb24gYXMgYW4gZWxlbWVudFxuICAgIGlmICggdHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycgKSB7XG4gICAgICBlbGVtID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoIG9wdGlvbiApO1xuICAgIH0gZWxzZSBpZiAoIHV0aWxzLmlzRWxlbWVudCggb3B0aW9uICkgKSB7XG4gICAgICBlbGVtID0gb3B0aW9uO1xuICAgIH1cbiAgICAvLyB1c2Ugc2l6ZSBvZiBlbGVtZW50LCBpZiBlbGVtZW50XG4gICAgdGhpc1sgbWVhc3VyZW1lbnQgXSA9IGVsZW0gPyBnZXRTaXplKCBlbGVtIClbIHNpemUgXSA6IG9wdGlvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBsYXlvdXQgYSBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5sYXlvdXRJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcywgaXNJbnN0YW50ICkge1xuICBpdGVtcyA9IHRoaXMuX2dldEl0ZW1zRm9yTGF5b3V0KCBpdGVtcyApO1xuXG4gIHRoaXMuX2xheW91dEl0ZW1zKCBpdGVtcywgaXNJbnN0YW50ICk7XG5cbiAgdGhpcy5fcG9zdExheW91dCgpO1xufTtcblxuLyoqXG4gKiBnZXQgdGhlIGl0ZW1zIHRvIGJlIGxhaWQgb3V0XG4gKiB5b3UgbWF5IHdhbnQgdG8gc2tpcCBvdmVyIHNvbWUgaXRlbXNcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0SXRlbXNGb3JMYXlvdXQgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG4gIHZhciBsYXlvdXRJdGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIGlmICggIWl0ZW0uaXNJZ25vcmVkICkge1xuICAgICAgbGF5b3V0SXRlbXMucHVzaCggaXRlbSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGF5b3V0SXRlbXM7XG59O1xuXG4vKipcbiAqIGxheW91dCBpdGVtc1xuICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbnN0YW50XG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fbGF5b3V0SXRlbXMgPSBmdW5jdGlvbiggaXRlbXMsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5fZW1pdENvbXBsZXRlT25JdGVtcyggJ2xheW91dCcsIGl0ZW1zICk7XG5cbiAgaWYgKCAhaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCApIHtcbiAgICAvLyBubyBpdGVtcywgZW1pdCBldmVudCB3aXRoIGVtcHR5IGFycmF5XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHF1ZXVlID0gW107XG5cbiAgZm9yICggdmFyIGk9MCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAvLyBnZXQgeC95IG9iamVjdCBmcm9tIG1ldGhvZFxuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbiggaXRlbSApO1xuICAgIC8vIGVucXVldWVcbiAgICBwb3NpdGlvbi5pdGVtID0gaXRlbTtcbiAgICBwb3NpdGlvbi5pc0luc3RhbnQgPSBpc0luc3RhbnQgfHwgaXRlbS5pc0xheW91dEluc3RhbnQ7XG4gICAgcXVldWUucHVzaCggcG9zaXRpb24gKTtcbiAgfVxuXG4gIHRoaXMuX3Byb2Nlc3NMYXlvdXRRdWV1ZSggcXVldWUgKTtcbn07XG5cbi8qKlxuICogZ2V0IGl0ZW0gbGF5b3V0IHBvc2l0aW9uXG4gKiBAcGFyYW0ge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqIEByZXR1cm5zIHtPYmplY3R9IHggYW5kIHkgcG9zaXRpb25cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24gPSBmdW5jdGlvbiggLyogaXRlbSAqLyApIHtcbiAgcmV0dXJuIHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcbn07XG5cbi8qKlxuICogaXRlcmF0ZSBvdmVyIGFycmF5IGFuZCBwb3NpdGlvbiBlYWNoIGl0ZW1cbiAqIFJlYXNvbiBiZWluZyAtIHNlcGFyYXRpbmcgdGhpcyBsb2dpYyBwcmV2ZW50cyAnbGF5b3V0IGludmFsaWRhdGlvbidcbiAqIHRoeCBAcGF1bF9pcmlzaFxuICogQHBhcmFtIHtBcnJheX0gcXVldWVcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLl9wcm9jZXNzTGF5b3V0UXVldWUgPSBmdW5jdGlvbiggcXVldWUgKSB7XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHF1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBvYmogPSBxdWV1ZVtpXTtcbiAgICB0aGlzLl9wb3NpdGlvbkl0ZW0oIG9iai5pdGVtLCBvYmoueCwgb2JqLnksIG9iai5pc0luc3RhbnQgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHBvc2l0aW9uIG9mIGl0ZW0gaW4gRE9NXG4gKiBAcGFyYW0ge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHkgLSB2ZXJ0aWNhbCBwb3NpdGlvblxuICogQHBhcmFtIHtCb29sZWFufSBpc0luc3RhbnQgLSBkaXNhYmxlcyB0cmFuc2l0aW9uc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX3Bvc2l0aW9uSXRlbSA9IGZ1bmN0aW9uKCBpdGVtLCB4LCB5LCBpc0luc3RhbnQgKSB7XG4gIGlmICggaXNJbnN0YW50ICkge1xuICAgIC8vIGlmIG5vdCB0cmFuc2l0aW9uLCBqdXN0IHNldCBDU1NcbiAgICBpdGVtLmdvVG8oIHgsIHkgKTtcbiAgfSBlbHNlIHtcbiAgICBpdGVtLm1vdmVUbyggeCwgeSApO1xuICB9XG59O1xuXG4vKipcbiAqIEFueSBsb2dpYyB5b3Ugd2FudCB0byBkbyBhZnRlciBlYWNoIGxheW91dCxcbiAqIGkuZS4gc2l6ZSB0aGUgY29udGFpbmVyXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fcG9zdExheW91dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2l6ZUNvbnRhaW5lcigpO1xufTtcblxuT3V0bGF5ZXIucHJvdG90eXBlLnJlc2l6ZUNvbnRhaW5lciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuaXNSZXNpemluZ0NvbnRhaW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHNpemUgPSB0aGlzLl9nZXRDb250YWluZXJTaXplKCk7XG4gIGlmICggc2l6ZSApIHtcbiAgICB0aGlzLl9zZXRDb250YWluZXJNZWFzdXJlKCBzaXplLndpZHRoLCB0cnVlICk7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZSggc2l6ZS5oZWlnaHQsIGZhbHNlICk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0cyB3aWR0aCBvciBoZWlnaHQgb2YgY29udGFpbmVyIGlmIHJldHVybmVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBzaXplXG4gKiAgIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICogICBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyU2l6ZSA9IG5vb3A7XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1lYXN1cmUgLSBzaXplIG9mIHdpZHRoIG9yIGhlaWdodFxuICogQHBhcmFtIHtCb29sZWFufSBpc1dpZHRoXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fc2V0Q29udGFpbmVyTWVhc3VyZSA9IGZ1bmN0aW9uKCBtZWFzdXJlLCBpc1dpZHRoICkge1xuICBpZiAoIG1lYXN1cmUgPT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZWxlbVNpemUgPSB0aGlzLnNpemU7XG4gIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgd2lkdGggaWYgYm9yZGVyIGJveFxuICBpZiAoIGVsZW1TaXplLmlzQm9yZGVyQm94ICkge1xuICAgIG1lYXN1cmUgKz0gaXNXaWR0aCA/IGVsZW1TaXplLnBhZGRpbmdMZWZ0ICsgZWxlbVNpemUucGFkZGluZ1JpZ2h0ICtcbiAgICAgIGVsZW1TaXplLmJvcmRlckxlZnRXaWR0aCArIGVsZW1TaXplLmJvcmRlclJpZ2h0V2lkdGggOlxuICAgICAgZWxlbVNpemUucGFkZGluZ0JvdHRvbSArIGVsZW1TaXplLnBhZGRpbmdUb3AgK1xuICAgICAgZWxlbVNpemUuYm9yZGVyVG9wV2lkdGggKyBlbGVtU2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcbiAgfVxuXG4gIG1lYXN1cmUgPSBNYXRoLm1heCggbWVhc3VyZSwgMCApO1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIGlzV2lkdGggPyAnd2lkdGgnIDogJ2hlaWdodCcgXSA9IG1lYXN1cmUgKyAncHgnO1xufTtcblxuLyoqXG4gKiBlbWl0IGV2ZW50Q29tcGxldGUgb24gYSBjb2xsZWN0aW9uIG9mIGl0ZW1zIGV2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogQHBhcmFtIHtBcnJheX0gaXRlbXMgLSBPdXRsYXllci5JdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2VtaXRDb21wbGV0ZU9uSXRlbXMgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBpdGVtcyApIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcbiAgICBfdGhpcy5kaXNwYXRjaEV2ZW50KCBldmVudE5hbWUgKyAnQ29tcGxldGUnLCBudWxsLCBbIGl0ZW1zIF0gKTtcbiAgfVxuXG4gIHZhciBjb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgaWYgKCAhaXRlbXMgfHwgIWNvdW50ICkge1xuICAgIG9uQ29tcGxldGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZG9uZUNvdW50ID0gMDtcbiAgZnVuY3Rpb24gdGljaygpIHtcbiAgICBkb25lQ291bnQrKztcbiAgICBpZiAoIGRvbmVDb3VudCA9PT0gY291bnQgKSB7XG4gICAgICBvbkNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gYmluZCBjYWxsYmFja1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIGl0ZW0ub25jZSggZXZlbnROYW1lLCB0aWNrICk7XG4gIH1cbn07XG5cbi8qKlxuICogZW1pdHMgZXZlbnRzIHZpYSBldmVudEVtaXR0ZXIgYW5kIGpRdWVyeSBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gbmFtZSBvZiBldmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBvcmlnaW5hbCBldmVudFxuICogQHBhcmFtIHtBcnJheX0gYXJncyAtIGV4dHJhIGFyZ3VtZW50c1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgYXJncyApIHtcbiAgLy8gYWRkIG9yaWdpbmFsIGV2ZW50IHRvIGFyZ3VtZW50c1xuICB2YXIgZW1pdEFyZ3MgPSBldmVudCA/IFsgZXZlbnQgXS5jb25jYXQoIGFyZ3MgKSA6IGFyZ3M7XG4gIHRoaXMuZW1pdEV2ZW50KCB0eXBlLCBlbWl0QXJncyApO1xuXG4gIGlmICggalF1ZXJ5ICkge1xuICAgIC8vIHNldCB0aGlzLiRlbGVtZW50XG4gICAgdGhpcy4kZWxlbWVudCA9IHRoaXMuJGVsZW1lbnQgfHwgalF1ZXJ5KCB0aGlzLmVsZW1lbnQgKTtcbiAgICBpZiAoIGV2ZW50ICkge1xuICAgICAgLy8gY3JlYXRlIGpRdWVyeSBldmVudFxuICAgICAgdmFyICRldmVudCA9IGpRdWVyeS5FdmVudCggZXZlbnQgKTtcbiAgICAgICRldmVudC50eXBlID0gdHlwZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggJGV2ZW50LCBhcmdzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGp1c3QgdHJpZ2dlciB3aXRoIHR5cGUgaWYgbm8gZXZlbnQgYXZhaWxhYmxlXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoIHR5cGUsIGFyZ3MgKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGlnbm9yZSAmIHN0YW1wcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5cbi8qKlxuICoga2VlcCBpdGVtIGluIGNvbGxlY3Rpb24sIGJ1dCBkbyBub3QgbGF5IGl0IG91dFxuICogaWdub3JlZCBpdGVtcyBkbyBub3QgZ2V0IHNraXBwZWQgaW4gbGF5b3V0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLmlnbm9yZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSggZWxlbSApO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbS5pc0lnbm9yZWQgPSB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIHJldHVybiBpdGVtIHRvIGxheW91dCBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLnVuaWdub3JlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIGlmICggaXRlbSApIHtcbiAgICBkZWxldGUgaXRlbS5pc0lnbm9yZWQ7XG4gIH1cbn07XG5cbi8qKlxuICogYWRkcyBlbGVtZW50cyB0byBzdGFtcHNcbiAqIEBwYXJhbSB7Tm9kZUxpc3QsIEFycmF5LCBFbGVtZW50LCBvciBTdHJpbmd9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5zdGFtcCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB0aGlzLl9maW5kKCBlbGVtcyApO1xuICBpZiAoICFlbGVtcyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YW1wcyA9IHRoaXMuc3RhbXBzLmNvbmNhdCggZWxlbXMgKTtcbiAgLy8gaWdub3JlXG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBlbGVtID0gZWxlbXNbaV07XG4gICAgdGhpcy5pZ25vcmUoIGVsZW0gKTtcbiAgfVxufTtcblxuLyoqXG4gKiByZW1vdmVzIGVsZW1lbnRzIHRvIHN0YW1wc1xuICogQHBhcmFtIHtOb2RlTGlzdCwgQXJyYXksIG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS51bnN0YW1wID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBlbGVtcyA9IHRoaXMuX2ZpbmQoIGVsZW1zICk7XG4gIGlmICggIWVsZW1zICl7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICggdmFyIGk9MCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGVsZW0gPSBlbGVtc1tpXTtcbiAgICAvLyBmaWx0ZXIgb3V0IHJlbW92ZWQgc3RhbXAgZWxlbWVudHNcbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLnN0YW1wcywgZWxlbSApO1xuICAgIHRoaXMudW5pZ25vcmUoIGVsZW0gKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIGZpbmRzIGNoaWxkIGVsZW1lbnRzXG4gKiBAcGFyYW0ge05vZGVMaXN0LCBBcnJheSwgRWxlbWVudCwgb3IgU3RyaW5nfSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBlbGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2ZpbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGlmICggIWVsZW1zICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBpZiBzdHJpbmcsIHVzZSBhcmd1bWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbXMgPT09ICdzdHJpbmcnICkge1xuICAgIGVsZW1zID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGVsZW1zICk7XG4gIH1cbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHJldHVybiBlbGVtcztcbn07XG5cbk91dGxheWVyLnByb3RvdHlwZS5fbWFuYWdlU3RhbXBzID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuc3RhbXBzIHx8ICF0aGlzLnN0YW1wcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fZ2V0Qm91bmRpbmdSZWN0KCk7XG5cbiAgZm9yICggdmFyIGk9MCwgbGVuID0gdGhpcy5zdGFtcHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIHN0YW1wID0gdGhpcy5zdGFtcHNbaV07XG4gICAgdGhpcy5fbWFuYWdlU3RhbXAoIHN0YW1wICk7XG4gIH1cbn07XG5cbi8vIHVwZGF0ZSBib3VuZGluZ0xlZnQgLyBUb3Bcbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0Qm91bmRpbmdSZWN0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGdldCBib3VuZGluZyByZWN0IGZvciBjb250YWluZXIgZWxlbWVudFxuICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgdGhpcy5fYm91bmRpbmdSZWN0ID0ge1xuICAgIGxlZnQ6IGJvdW5kaW5nUmVjdC5sZWZ0ICsgc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUuYm9yZGVyTGVmdFdpZHRoLFxuICAgIHRvcDogYm91bmRpbmdSZWN0LnRvcCArIHNpemUucGFkZGluZ1RvcCArIHNpemUuYm9yZGVyVG9wV2lkdGgsXG4gICAgcmlnaHQ6IGJvdW5kaW5nUmVjdC5yaWdodCAtICggc2l6ZS5wYWRkaW5nUmlnaHQgKyBzaXplLmJvcmRlclJpZ2h0V2lkdGggKSxcbiAgICBib3R0b206IGJvdW5kaW5nUmVjdC5ib3R0b20gLSAoIHNpemUucGFkZGluZ0JvdHRvbSArIHNpemUuYm9yZGVyQm90dG9tV2lkdGggKVxuICB9O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHN0YW1wXG4qKi9cbk91dGxheWVyLnByb3RvdHlwZS5fbWFuYWdlU3RhbXAgPSBub29wO1xuXG4vKipcbiAqIGdldCB4L3kgcG9zaXRpb24gb2YgZWxlbWVudCByZWxhdGl2ZSB0byBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvZmZzZXQgLSBoYXMgbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0RWxlbWVudE9mZnNldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgYm91bmRpbmdSZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHRoaXNSZWN0ID0gdGhpcy5fYm91bmRpbmdSZWN0O1xuICB2YXIgc2l6ZSA9IGdldFNpemUoIGVsZW0gKTtcbiAgdmFyIG9mZnNldCA9IHtcbiAgICBsZWZ0OiBib3VuZGluZ1JlY3QubGVmdCAtIHRoaXNSZWN0LmxlZnQgLSBzaXplLm1hcmdpbkxlZnQsXG4gICAgdG9wOiBib3VuZGluZ1JlY3QudG9wIC0gdGhpc1JlY3QudG9wIC0gc2l6ZS5tYXJnaW5Ub3AsXG4gICAgcmlnaHQ6IHRoaXNSZWN0LnJpZ2h0IC0gYm91bmRpbmdSZWN0LnJpZ2h0IC0gc2l6ZS5tYXJnaW5SaWdodCxcbiAgICBib3R0b206IHRoaXNSZWN0LmJvdHRvbSAtIGJvdW5kaW5nUmVjdC5ib3R0b20gLSBzaXplLm1hcmdpbkJvdHRvbVxuICB9O1xuICByZXR1cm4gb2Zmc2V0O1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcmVzaXplIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGVuYWJsZSBldmVudCBoYW5kbGVycyBmb3IgbGlzdGVuZXJzXG4vLyBpLmUuIHJlc2l6ZSAtPiBvbnJlc2l6ZVxuT3V0bGF5ZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8qKlxuICogQmluZCBsYXlvdXQgdG8gd2luZG93IHJlc2l6aW5nXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5iaW5kUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIC8vIGJpbmQganVzdCBvbmUgbGlzdGVuZXJcbiAgaWYgKCB0aGlzLmlzUmVzaXplQm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50aWUuYmluZCggd2luZG93LCAncmVzaXplJywgdGhpcyApO1xuICB0aGlzLmlzUmVzaXplQm91bmQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBVbmJpbmQgbGF5b3V0IHRvIHdpbmRvdyByZXNpemluZ1xuICovXG5PdXRsYXllci5wcm90b3R5cGUudW5iaW5kUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc1Jlc2l6ZUJvdW5kICkge1xuICAgIGV2ZW50aWUudW5iaW5kKCB3aW5kb3csICdyZXNpemUnLCB0aGlzICk7XG4gIH1cbiAgdGhpcy5pc1Jlc2l6ZUJvdW5kID0gZmFsc2U7XG59O1xuXG4vLyBvcmlnaW5hbCBkZWJvdW5jZSBieSBKb2huIEhhbm5cbi8vIGh0dHA6Ly91bnNjcmlwdGFibGUuY29tL2luZGV4LnBocC8yMDA5LzAzLzIwL2RlYm91bmNpbmctamF2YXNjcmlwdC1tZXRob2RzL1xuXG4vLyB0aGlzIGZpcmVzIGV2ZXJ5IHJlc2l6ZVxuT3V0bGF5ZXIucHJvdG90eXBlLm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5yZXNpemVUaW1lb3V0ICkge1xuICAgIGNsZWFyVGltZW91dCggdGhpcy5yZXNpemVUaW1lb3V0ICk7XG4gIH1cblxuICB2YXIgX3RoaXMgPSB0aGlzO1xuICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgIF90aGlzLnJlc2l6ZSgpO1xuICAgIGRlbGV0ZSBfdGhpcy5yZXNpemVUaW1lb3V0O1xuICB9XG5cbiAgdGhpcy5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCggZGVsYXllZCwgMTAwICk7XG59O1xuXG4vLyBkZWJvdW5jZWQsIGxheW91dCBvbiByZXNpemVcbk91dGxheWVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG9uJ3QgdHJpZ2dlciBpZiBzaXplIGRpZCBub3QgY2hhbmdlXG4gIC8vIG9yIGlmIHJlc2l6ZSB3YXMgdW5ib3VuZC4gU2VlICM5XG4gIGlmICggIXRoaXMuaXNSZXNpemVCb3VuZCB8fCAhdGhpcy5uZWVkc1Jlc2l6ZUxheW91dCgpICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMubGF5b3V0KCk7XG59O1xuXG4vKipcbiAqIGNoZWNrIGlmIGxheW91dCBpcyBuZWVkZWQgcG9zdCBsYXlvdXRcbiAqIEByZXR1cm5zIEJvb2xlYW5cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLm5lZWRzUmVzaXplTGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNoZWNrIHRoYXQgdGhpcy5zaXplIGFuZCBzaXplIGFyZSB0aGVyZVxuICAvLyBJRTggdHJpZ2dlcnMgcmVzaXplIG9uIGJvZHkgc2l6ZSBjaGFuZ2UsIHNvIHRoZXkgbWlnaHQgbm90IGJlXG4gIHZhciBoYXNTaXplcyA9IHRoaXMuc2l6ZSAmJiBzaXplO1xuICByZXR1cm4gaGFzU2l6ZXMgJiYgc2l6ZS5pbm5lcldpZHRoICE9PSB0aGlzLnNpemUuaW5uZXJXaWR0aDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBhZGQgaXRlbXMgdG8gT3V0bGF5ZXIgaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBPdXRsYXllci5JdGVtc1xuKiovXG5PdXRsYXllci5wcm90b3R5cGUuYWRkSXRlbXMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBpdGVtcyA9IHRoaXMuX2l0ZW1pemUoIGVsZW1zICk7XG4gIC8vIGFkZCBpdGVtcyB0byBjb2xsZWN0aW9uXG4gIGlmICggaXRlbXMubGVuZ3RoICkge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmNvbmNhdCggaXRlbXMgKTtcbiAgfVxuICByZXR1cm4gaXRlbXM7XG59O1xuXG4vKipcbiAqIExheW91dCBuZXdseS1hcHBlbmRlZCBpdGVtIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5hcHBlbmRlZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5hZGRJdGVtcyggZWxlbXMgKTtcbiAgaWYgKCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBsYXlvdXQgYW5kIHJldmVhbCBqdXN0IHRoZSBuZXcgaXRlbXNcbiAgdGhpcy5sYXlvdXRJdGVtcyggaXRlbXMsIHRydWUgKTtcbiAgdGhpcy5yZXZlYWwoIGl0ZW1zICk7XG59O1xuXG4vKipcbiAqIExheW91dCBwcmVwZW5kZWQgZWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLnByZXBlbmRlZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5faXRlbWl6ZSggZWxlbXMgKTtcbiAgaWYgKCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhZGQgaXRlbXMgdG8gYmVnaW5uaW5nIG9mIGNvbGxlY3Rpb25cbiAgdmFyIHByZXZpb3VzSXRlbXMgPSB0aGlzLml0ZW1zLnNsaWNlKDApO1xuICB0aGlzLml0ZW1zID0gaXRlbXMuY29uY2F0KCBwcmV2aW91c0l0ZW1zICk7XG4gIC8vIHN0YXJ0IG5ldyBsYXlvdXRcbiAgdGhpcy5fcmVzZXRMYXlvdXQoKTtcbiAgdGhpcy5fbWFuYWdlU3RhbXBzKCk7XG4gIC8vIGxheW91dCBuZXcgc3R1ZmYgd2l0aG91dCB0cmFuc2l0aW9uXG4gIHRoaXMubGF5b3V0SXRlbXMoIGl0ZW1zLCB0cnVlICk7XG4gIHRoaXMucmV2ZWFsKCBpdGVtcyApO1xuICAvLyBsYXlvdXQgcHJldmlvdXMgaXRlbXNcbiAgdGhpcy5sYXlvdXRJdGVtcyggcHJldmlvdXNJdGVtcyApO1xufTtcblxuLyoqXG4gKiByZXZlYWwgYSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0ge0FycmF5IG9mIE91dGxheWVyLkl0ZW1zfSBpdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUucmV2ZWFsID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuICB0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKCAncmV2ZWFsJywgaXRlbXMgKTtcblxuICB2YXIgbGVuID0gaXRlbXMgJiYgaXRlbXMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT0wOyBsZW4gJiYgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgaXRlbS5yZXZlYWwoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBoaWRlIGEgY29sbGVjdGlvbiBvZiBpdGVtc1xuICogQHBhcmFtIHtBcnJheSBvZiBPdXRsYXllci5JdGVtc30gaXRlbXNcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG4gIHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoICdoaWRlJywgaXRlbXMgKTtcblxuICB2YXIgbGVuID0gaXRlbXMgJiYgaXRlbXMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT0wOyBsZW4gJiYgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgaXRlbS5oaWRlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogcmV2ZWFsIGl0ZW0gZWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXl9LCB7RWxlbWVudH0sIHtOb2RlTGlzdH0gaXRlbXNcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLnJldmVhbEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5nZXRJdGVtcyggZWxlbXMgKTtcbiAgdGhpcy5yZXZlYWwoIGl0ZW1zICk7XG59O1xuXG4vKipcbiAqIGhpZGUgaXRlbSBlbGVtZW50c1xuICogQHBhcmFtIHtBcnJheX0sIHtFbGVtZW50fSwge05vZGVMaXN0fSBpdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuaGlkZUl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5nZXRJdGVtcyggZWxlbXMgKTtcbiAgdGhpcy5oaWRlKCBpdGVtcyApO1xufTtcblxuLyoqXG4gKiBnZXQgT3V0bGF5ZXIuSXRlbSwgZ2l2ZW4gYW4gRWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gbG9vcCB0aHJvdWdoIGl0ZW1zIHRvIGdldCB0aGUgb25lIHRoYXQgbWF0Y2hlc1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICBpZiAoIGl0ZW0uZWxlbWVudCA9PT0gZWxlbSApIHtcbiAgICAgIC8vIHJldHVybiBpdGVtXG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IGNvbGxlY3Rpb24gb2YgT3V0bGF5ZXIuSXRlbXMsIGdpdmVuIEVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIE91dGxheWVyLkl0ZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5nZXRJdGVtcyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBpdGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gICAgaWYgKCBpdGVtICkge1xuICAgICAgaXRlbXMucHVzaCggaXRlbSApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn07XG5cbi8qKlxuICogcmVtb3ZlIGVsZW1lbnQocykgZnJvbSBpbnN0YW5jZSBhbmQgRE9NXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciByZW1vdmVJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoIGVsZW1zICk7XG5cbiAgdGhpcy5fZW1pdENvbXBsZXRlT25JdGVtcyggJ3JlbW92ZScsIHJlbW92ZUl0ZW1zICk7XG5cbiAgLy8gYmFpbCBpZiBubyBpdGVtcyB0byByZW1vdmVcbiAgaWYgKCAhcmVtb3ZlSXRlbXMgfHwgIXJlbW92ZUl0ZW1zLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSByZW1vdmVJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IHJlbW92ZUl0ZW1zW2ldO1xuICAgIGl0ZW0ucmVtb3ZlKCk7XG4gICAgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBjb2xsZWN0aW9uXG4gICAgdXRpbHMucmVtb3ZlRnJvbSggdGhpcy5pdGVtcywgaXRlbSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBkZXN0cm95IC0tLS0tIC8vXG5cbi8vIHJlbW92ZSBhbmQgZGlzYWJsZSBPdXRsYXllciBpbnN0YW5jZVxuT3V0bGF5ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2xlYW4gdXAgZHluYW1pYyBzdHlsZXNcbiAgdmFyIHN0eWxlID0gdGhpcy5lbGVtZW50LnN0eWxlO1xuICBzdHlsZS5oZWlnaHQgPSAnJztcbiAgc3R5bGUucG9zaXRpb24gPSAnJztcbiAgc3R5bGUud2lkdGggPSAnJztcbiAgLy8gZGVzdHJveSBpdGVtc1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICBpdGVtLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHRoaXMudW5iaW5kUmVzaXplKCk7XG5cbiAgdmFyIGlkID0gdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRDtcbiAgZGVsZXRlIGluc3RhbmNlc1sgaWQgXTsgLy8gcmVtb3ZlIHJlZmVyZW5jZSB0byBpbnN0YW5jZSBieSBpZFxuICBkZWxldGUgdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRDtcbiAgLy8gcmVtb3ZlIGRhdGEgZm9yIGpRdWVyeVxuICBpZiAoIGpRdWVyeSApIHtcbiAgICBqUXVlcnkucmVtb3ZlRGF0YSggdGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZSApO1xuICB9XG5cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRhdGEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgT3V0bGF5ZXIgaW5zdGFuY2UgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtPdXRsYXllcn1cbiAqL1xuT3V0bGF5ZXIuZGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBlbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtICk7XG4gIHZhciBpZCA9IGVsZW0gJiYgZWxlbS5vdXRsYXllckdVSUQ7XG4gIHJldHVybiBpZCAmJiBpbnN0YW5jZXNbIGlkIF07XG59O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNyZWF0ZSBPdXRsYXllciBjbGFzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGNyZWF0ZSBhIGxheW91dCBjbGFzc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICovXG5PdXRsYXllci5jcmVhdGUgPSBmdW5jdGlvbiggbmFtZXNwYWNlLCBvcHRpb25zICkge1xuICAvLyBzdWItY2xhc3MgT3V0bGF5ZXJcbiAgZnVuY3Rpb24gTGF5b3V0KCkge1xuICAgIE91dGxheWVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgfVxuICAvLyBpbmhlcml0IE91dGxheWVyIHByb3RvdHlwZSwgdXNlIE9iamVjdC5jcmVhdGUgaWYgdGhlcmVcbiAgaWYgKCBPYmplY3QuY3JlYXRlICkge1xuICAgIExheW91dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBPdXRsYXllci5wcm90b3R5cGUgKTtcbiAgfSBlbHNlIHtcbiAgICB1dGlscy5leHRlbmQoIExheW91dC5wcm90b3R5cGUsIE91dGxheWVyLnByb3RvdHlwZSApO1xuICB9XG4gIC8vIHNldCBjb250cnVjdG9yLCB1c2VkIGZvciBuYW1lc3BhY2UgYW5kIEl0ZW1cbiAgTGF5b3V0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExheW91dDtcblxuICBMYXlvdXQuZGVmYXVsdHMgPSB1dGlscy5leHRlbmQoIHt9LCBPdXRsYXllci5kZWZhdWx0cyApO1xuICAvLyBhcHBseSBuZXcgb3B0aW9uc1xuICB1dGlscy5leHRlbmQoIExheW91dC5kZWZhdWx0cywgb3B0aW9ucyApO1xuICAvLyBrZWVwIHByb3RvdHlwZS5zZXR0aW5ncyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgKFBhY2tlcnkgdjEuMi4wKVxuICBMYXlvdXQucHJvdG90eXBlLnNldHRpbmdzID0ge307XG5cbiAgTGF5b3V0Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblxuICBMYXlvdXQuZGF0YSA9IE91dGxheWVyLmRhdGE7XG5cbiAgLy8gc3ViLWNsYXNzIEl0ZW1cbiAgTGF5b3V0Lkl0ZW0gPSBmdW5jdGlvbiBMYXlvdXRJdGVtKCkge1xuICAgIEl0ZW0uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICB9O1xuXG4gIExheW91dC5JdGVtLnByb3RvdHlwZSA9IG5ldyBJdGVtKCk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGVjbGFyYXRpdmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICB1dGlscy5odG1sSW5pdCggTGF5b3V0LCBuYW1lc3BhY2UgKTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBqUXVlcnkgYnJpZGdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgLy8gbWFrZSBpbnRvIGpRdWVyeSBwbHVnaW5cbiAgaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gICAgalF1ZXJ5LmJyaWRnZXQoIG5hbWVzcGFjZSwgTGF5b3V0ICk7XG4gIH1cblxuICByZXR1cm4gTGF5b3V0O1xufTtcblxuLy8gLS0tLS0gZmluIC0tLS0tIC8vXG5cbi8vIGJhY2sgaW4gZ2xvYmFsXG5PdXRsYXllci5JdGVtID0gSXRlbTtcblxucmV0dXJuIE91dGxheWVyO1xuXG59KSk7XG5cbiIsIi8qKlxuICogUGFja2VyeSBJdGVtIEVsZW1lbnRcbioqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ2dldC1zdHlsZS1wcm9wZXJ0eS9nZXQtc3R5bGUtcHJvcGVydHknLFxuICAgICAgICAnb3V0bGF5ZXIvb3V0bGF5ZXInLFxuICAgICAgICAnLi9yZWN0J1xuICAgICAgXSxcbiAgICAgIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCdkZXNhbmRyby1nZXQtc3R5bGUtcHJvcGVydHknKSxcbiAgICAgIHJlcXVpcmUoJ291dGxheWVyJyksXG4gICAgICByZXF1aXJlKCcuL3JlY3QnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuUGFja2VyeS5JdGVtID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdy5nZXRTdHlsZVByb3BlcnR5LFxuICAgICAgd2luZG93Lk91dGxheWVyLFxuICAgICAgd2luZG93LlBhY2tlcnkuUmVjdFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBnZXRTdHlsZVByb3BlcnR5LCBPdXRsYXllciwgUmVjdCApIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSXRlbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgdHJhbnNmb3JtUHJvcGVydHkgPSBnZXRTdHlsZVByb3BlcnR5KCd0cmFuc2Zvcm0nKTtcblxuLy8gc3ViLWNsYXNzIEl0ZW1cbnZhciBJdGVtID0gZnVuY3Rpb24gUGFja2VyeUl0ZW0oKSB7XG4gIE91dGxheWVyLkl0ZW0uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xufTtcblxuSXRlbS5wcm90b3R5cGUgPSBuZXcgT3V0bGF5ZXIuSXRlbSgpO1xuXG52YXIgcHJvdG9DcmVhdGUgPSBJdGVtLnByb3RvdHlwZS5fY3JlYXRlO1xuSXRlbS5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjYWxsIGRlZmF1bHQgX2NyZWF0ZSBsb2dpY1xuICBwcm90b0NyZWF0ZS5jYWxsKCB0aGlzICk7XG4gIHRoaXMucmVjdCA9IG5ldyBSZWN0KCk7XG4gIC8vIHJlY3QgdXNlZCBmb3IgcGxhY2luZywgaW4gZHJhZyBvciBQYWNrZXJ5LmZpdCgpXG4gIHRoaXMucGxhY2VSZWN0ID0gbmV3IFJlY3QoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuSXRlbS5wcm90b3R5cGUuZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgdGhpcy5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzKCk7XG4gIC8vIHJlbW92ZSB0cmFuc2Zvcm0gcHJvcGVydHkgZnJvbSB0cmFuc2l0aW9uXG4gIGlmICggdGhpcy5pc1RyYW5zaXRpb25pbmcgJiYgdHJhbnNmb3JtUHJvcGVydHkgKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlWyB0cmFuc2Zvcm1Qcm9wZXJ0eSBdID0gJ25vbmUnO1xuICB9XG4gIHRoaXMuZ2V0U2l6ZSgpO1xuICAvLyBjcmVhdGUgcGxhY2UgcmVjdCwgdXNlZCBmb3IgcG9zaXRpb24gd2hlbiBkcmFnZ2VkIHRoZW4gZHJvcHBlZFxuICAvLyBvciB3aGVuIHBvc2l0aW9uaW5nXG4gIHRoaXMuaXNQbGFjaW5nID0gdHJ1ZTtcbiAgdGhpcy5uZWVkc1Bvc2l0aW9uaW5nID0gZmFsc2U7XG4gIHRoaXMucG9zaXRpb25QbGFjZVJlY3QoIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICk7XG4gIHRoaXMuaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gIHRoaXMuZGlkRHJhZyA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBoYW5kbGUgaXRlbSB3aGVuIGl0IGlzIGRyYWdnZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiBkcmFnZ2VkIGl0ZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gdmVydGljYWwgcG9zaXRpb24gb2YgZHJhZ2dlZCBpdGVtXG4gKi9cbkl0ZW0ucHJvdG90eXBlLmRyYWdNb3ZlID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIHRoaXMuZGlkRHJhZyA9IHRydWU7XG4gIHZhciBwYWNrZXJ5U2l6ZSA9IHRoaXMubGF5b3V0LnNpemU7XG4gIHggLT0gcGFja2VyeVNpemUucGFkZGluZ0xlZnQ7XG4gIHkgLT0gcGFja2VyeVNpemUucGFkZGluZ1RvcDtcbiAgdGhpcy5wb3NpdGlvblBsYWNlUmVjdCggeCwgeSApO1xufTtcblxuSXRlbS5wcm90b3R5cGUuZHJhZ1N0b3AgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nZXRQb3NpdGlvbigpO1xuICB2YXIgaXNEaWZmWCA9IHRoaXMucG9zaXRpb24ueCAhPSB0aGlzLnBsYWNlUmVjdC54O1xuICB2YXIgaXNEaWZmWSA9IHRoaXMucG9zaXRpb24ueSAhPSB0aGlzLnBsYWNlUmVjdC55O1xuICAvLyBzZXQgcG9zdC1kcmFnIHBvc2l0aW9uaW5nIGZsYWdcbiAgdGhpcy5uZWVkc1Bvc2l0aW9uaW5nID0gaXNEaWZmWCB8fCBpc0RpZmZZO1xuICAvLyByZXNldCBmbGFnXG4gIHRoaXMuZGlkRHJhZyA9IGZhbHNlO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGxhY2luZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIHBvc2l0aW9uIGEgcmVjdCB0aGF0IHdpbGwgb2NjdXB5IHNwYWNlIGluIHRoZSBwYWNrZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHBhcmFtIHtCb29sZWFufSBpc01heFlDb250YWluZWRcbiAqL1xuSXRlbS5wcm90b3R5cGUucG9zaXRpb25QbGFjZVJlY3QgPSBmdW5jdGlvbiggeCwgeSwgaXNNYXhZT3BlbiApIHtcbiAgdGhpcy5wbGFjZVJlY3QueCA9IHRoaXMuZ2V0UGxhY2VSZWN0Q29vcmQoIHgsIHRydWUgKTtcbiAgdGhpcy5wbGFjZVJlY3QueSA9IHRoaXMuZ2V0UGxhY2VSZWN0Q29vcmQoIHksIGZhbHNlLCBpc01heFlPcGVuICk7XG59O1xuXG4vKipcbiAqIGdldCB4L3kgY29vcmRpbmF0ZSBmb3IgcGxhY2UgcmVjdFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvb3JkIC0geCBvciB5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzWFxuICogQHBhcmFtIHtCb29sZWFufSBpc01heE9wZW4gLSBkb2VzIG5vdCBsaW1pdCB2YWx1ZSB0byBvdXRlciBib3VuZFxuICogQHJldHVybnMge051bWJlcn0gY29vcmQgLSBwcm9jZXNzZWQgeCBvciB5XG4gKi9cbkl0ZW0ucHJvdG90eXBlLmdldFBsYWNlUmVjdENvb3JkID0gZnVuY3Rpb24oIGNvb3JkLCBpc1gsIGlzTWF4T3BlbiApIHtcbiAgdmFyIG1lYXN1cmUgPSBpc1ggPyAnV2lkdGgnIDogJ0hlaWdodCc7XG4gIHZhciBzaXplID0gdGhpcy5zaXplWyAnb3V0ZXInICsgbWVhc3VyZSBdO1xuICB2YXIgc2VnbWVudCA9IHRoaXMubGF5b3V0WyBpc1ggPyAnY29sdW1uV2lkdGgnIDogJ3Jvd0hlaWdodCcgXTtcbiAgdmFyIHBhcmVudFNpemUgPSB0aGlzLmxheW91dC5zaXplWyAnaW5uZXInICsgbWVhc3VyZSBdO1xuXG4gIC8vIGFkZGl0aW9uYWwgcGFyZW50U2l6ZSBjYWxjdWxhdGlvbnMgZm9yIFlcbiAgaWYgKCAhaXNYICkge1xuICAgIHBhcmVudFNpemUgPSBNYXRoLm1heCggcGFyZW50U2l6ZSwgdGhpcy5sYXlvdXQubWF4WSApO1xuICAgIC8vIHByZXZlbnQgZ3V0dGVyIGZyb20gYnVtcGluZyB1cCBoZWlnaHQgd2hlbiBub24tdmVydGljYWwgZ3JpZFxuICAgIGlmICggIXRoaXMubGF5b3V0LnJvd0hlaWdodCApIHtcbiAgICAgIHBhcmVudFNpemUgLT0gdGhpcy5sYXlvdXQuZ3V0dGVyO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXg7XG5cbiAgaWYgKCBzZWdtZW50ICkge1xuICAgIHNlZ21lbnQgKz0gdGhpcy5sYXlvdXQuZ3V0dGVyO1xuICAgIC8vIGFsbG93IGZvciBsYXN0IGNvbHVtbiB0byByZWFjaCB0aGUgZWRnZVxuICAgIHBhcmVudFNpemUgKz0gaXNYID8gdGhpcy5sYXlvdXQuZ3V0dGVyIDogMDtcbiAgICAvLyBzbmFwIHRvIGNsb3Nlc3Qgc2VnbWVudFxuICAgIGNvb3JkID0gTWF0aC5yb3VuZCggY29vcmQgLyBzZWdtZW50ICk7XG4gICAgLy8gY29udGFpbiB0byBvdXRlciBib3VuZFxuICAgIC8vIGNvbnRhaW4gbm9uLWdyb3dpbmcgYm91bmQsIGFsbG93IGdyb3dpbmcgYm91bmQgdG8gZ3Jvd1xuICAgIHZhciBtYXRoTWV0aG9kO1xuICAgIGlmICggdGhpcy5sYXlvdXQub3B0aW9ucy5pc0hvcml6b250YWwgKSB7XG4gICAgICBtYXRoTWV0aG9kID0gIWlzWCA/ICdmbG9vcicgOiAnY2VpbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGhNZXRob2QgPSBpc1ggPyAnZmxvb3InIDogJ2NlaWwnO1xuICAgIH1cbiAgICB2YXIgbWF4U2VnbWVudHMgPSBNYXRoWyBtYXRoTWV0aG9kIF0oIHBhcmVudFNpemUgLyBzZWdtZW50ICk7XG4gICAgbWF4U2VnbWVudHMgLT0gTWF0aC5jZWlsKCBzaXplIC8gc2VnbWVudCApO1xuICAgIG1heCA9IG1heFNlZ21lbnRzO1xuICB9IGVsc2Uge1xuICAgIG1heCA9IHBhcmVudFNpemUgLSBzaXplO1xuICB9XG5cbiAgY29vcmQgPSBpc01heE9wZW4gPyBjb29yZCA6IE1hdGgubWluKCBjb29yZCwgbWF4ICk7XG4gIGNvb3JkICo9IHNlZ21lbnQgfHwgMTtcblxuICByZXR1cm4gTWF0aC5tYXgoIDAsIGNvb3JkICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5jb3B5UGxhY2VSZWN0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZWN0LnggPSB0aGlzLnBsYWNlUmVjdC54O1xuICB0aGlzLnJlY3QueSA9IHRoaXMucGxhY2VSZWN0Lnk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLy8gcmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbkl0ZW0ucHJvdG90eXBlLnJlbW92ZUVsZW0gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuICAvLyBhZGQgc3BhY2UgYmFjayB0byBwYWNrZXJcbiAgdGhpcy5sYXlvdXQucGFja2VyLmFkZFNwYWNlKCB0aGlzLnJlY3QgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdyZW1vdmUnLCBbIHRoaXMgXSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBJdGVtO1xuXG59KSk7XG4iLCIvKipcbiAqIFBhY2tlclxuICogYmluLXBhY2tpbmcgYWxnb3JpdGhtXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggWyAnLi9yZWN0JyBdLCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnLi9yZWN0JylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgdmFyIFBhY2tlcnkgPSB3aW5kb3cuUGFja2VyeSA9IHdpbmRvdy5QYWNrZXJ5IHx8IHt9O1xuICAgIFBhY2tlcnkuUGFja2VyID0gZmFjdG9yeSggUGFja2VyeS5SZWN0ICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBSZWN0ICkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWNrZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3J0RGlyZWN0aW9uXG4gKiAgIHRvcExlZnQgZm9yIHZlcnRpY2FsLCBsZWZ0VG9wIGZvciBob3Jpem9udGFsXG4gKi9cbmZ1bmN0aW9uIFBhY2tlciggd2lkdGgsIGhlaWdodCwgc29ydERpcmVjdGlvbiApIHtcbiAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XG4gIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XG4gIHRoaXMuc29ydERpcmVjdGlvbiA9IHNvcnREaXJlY3Rpb24gfHwgJ2Rvd253YXJkTGVmdFRvUmlnaHQnO1xuXG4gIHRoaXMucmVzZXQoKTtcbn1cblxuUGFja2VyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNwYWNlcyA9IFtdO1xuICB0aGlzLm5ld1NwYWNlcyA9IFtdO1xuXG4gIHZhciBpbml0aWFsU3BhY2UgPSBuZXcgUmVjdCh7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgIGhlaWdodDogdGhpcy5oZWlnaHRcbiAgfSk7XG5cbiAgdGhpcy5zcGFjZXMucHVzaCggaW5pdGlhbFNwYWNlICk7XG4gIC8vIHNldCBzb3J0ZXJcbiAgdGhpcy5zb3J0ZXIgPSBzb3J0ZXJzWyB0aGlzLnNvcnREaXJlY3Rpb24gXSB8fCBzb3J0ZXJzLmRvd253YXJkTGVmdFRvUmlnaHQ7XG59O1xuXG4vLyBjaGFuZ2UgeCBhbmQgeSBvZiByZWN0IHRvIGZpdCB3aXRoIGluIFBhY2tlcidzIGF2YWlsYWJsZSBzcGFjZXNcblBhY2tlci5wcm90b3R5cGUucGFjayA9IGZ1bmN0aW9uKCByZWN0ICkge1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLnNwYWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgc3BhY2UgPSB0aGlzLnNwYWNlc1tpXTtcbiAgICBpZiAoIHNwYWNlLmNhbkZpdCggcmVjdCApICkge1xuICAgICAgdGhpcy5wbGFjZUluU3BhY2UoIHJlY3QsIHNwYWNlICk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG5cblBhY2tlci5wcm90b3R5cGUucGxhY2VJblNwYWNlID0gZnVuY3Rpb24oIHJlY3QsIHNwYWNlICkge1xuICAvLyBwbGFjZSByZWN0IGluIHNwYWNlXG4gIHJlY3QueCA9IHNwYWNlLng7XG4gIHJlY3QueSA9IHNwYWNlLnk7XG5cbiAgdGhpcy5wbGFjZWQoIHJlY3QgKTtcbn07XG5cbi8vIHVwZGF0ZSBzcGFjZXMgd2l0aCBwbGFjZWQgcmVjdFxuUGFja2VyLnByb3RvdHlwZS5wbGFjZWQgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgLy8gdXBkYXRlIHNwYWNlc1xuICB2YXIgcmV2aXNlZFNwYWNlcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLnNwYWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgc3BhY2UgPSB0aGlzLnNwYWNlc1tpXTtcbiAgICB2YXIgbmV3U3BhY2VzID0gc3BhY2UuZ2V0TWF4aW1hbEZyZWVSZWN0cyggcmVjdCApO1xuICAgIC8vIGFkZCBlaXRoZXIgdGhlIG9yaWdpbmFsIHNwYWNlIG9yIHRoZSBuZXcgc3BhY2VzIHRvIHRoZSByZXZpc2VkIHNwYWNlc1xuICAgIGlmICggbmV3U3BhY2VzICkge1xuICAgICAgcmV2aXNlZFNwYWNlcy5wdXNoLmFwcGx5KCByZXZpc2VkU3BhY2VzLCBuZXdTcGFjZXMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV2aXNlZFNwYWNlcy5wdXNoKCBzcGFjZSApO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuc3BhY2VzID0gcmV2aXNlZFNwYWNlcztcblxuICB0aGlzLm1lcmdlU29ydFNwYWNlcygpO1xufTtcblxuUGFja2VyLnByb3RvdHlwZS5tZXJnZVNvcnRTcGFjZXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIHJlZHVuZGFudCBzcGFjZXNcbiAgUGFja2VyLm1lcmdlUmVjdHMoIHRoaXMuc3BhY2VzICk7XG4gIHRoaXMuc3BhY2VzLnNvcnQoIHRoaXMuc29ydGVyICk7XG59O1xuXG4vLyBhZGQgYSBzcGFjZSBiYWNrXG5QYWNrZXIucHJvdG90eXBlLmFkZFNwYWNlID0gZnVuY3Rpb24oIHJlY3QgKSB7XG4gIHRoaXMuc3BhY2VzLnB1c2goIHJlY3QgKTtcbiAgdGhpcy5tZXJnZVNvcnRTcGFjZXMoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxpdHkgZnVuY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogUmVtb3ZlIHJlZHVuZGFudCByZWN0YW5nbGUgZnJvbSBhcnJheSBvZiByZWN0YW5nbGVzXG4gKiBAcGFyYW0ge0FycmF5fSByZWN0czogYW4gYXJyYXkgb2YgUmVjdHNcbiAqIEByZXR1cm5zIHtBcnJheX0gcmVjdHM6IGFuIGFycmF5IG9mIFJlY3RzXG4qKi9cblBhY2tlci5tZXJnZVJlY3RzID0gZnVuY3Rpb24oIHJlY3RzICkge1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSByZWN0cy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgcmVjdCA9IHJlY3RzW2ldO1xuICAgIC8vIHNraXAgb3ZlciB0aGlzIHJlY3QgaWYgaXQgd2FzIGFscmVhZHkgcmVtb3ZlZFxuICAgIGlmICggIXJlY3QgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gY2xvbmUgcmVjdHMgd2UncmUgdGVzdGluZywgcmVtb3ZlIHRoaXMgcmVjdFxuICAgIHZhciBjb21wYXJlUmVjdHMgPSByZWN0cy5zbGljZSgwKTtcbiAgICAvLyBkbyBub3QgY29tcGFyZSB3aXRoIHNlbGZcbiAgICBjb21wYXJlUmVjdHMuc3BsaWNlKCBpLCAxICk7XG4gICAgLy8gY29tcGFyZSB0aGlzIHJlY3Qgd2l0aCBvdGhlcnNcbiAgICB2YXIgcmVtb3ZlZENvdW50ID0gMDtcbiAgICBmb3IgKCB2YXIgaj0wLCBqTGVuID0gY29tcGFyZVJlY3RzLmxlbmd0aDsgaiA8IGpMZW47IGorKyApIHtcbiAgICAgIHZhciBjb21wYXJlUmVjdCA9IGNvbXBhcmVSZWN0c1tqXTtcbiAgICAgIC8vIGlmIHRoaXMgcmVjdCBjb250YWlucyBhbm90aGVyLFxuICAgICAgLy8gcmVtb3ZlIHRoYXQgcmVjdCBmcm9tIHRlc3QgY29sbGVjdGlvblxuICAgICAgdmFyIGluZGV4QWRqdXN0ID0gaSA+IGogPyAwIDogMTtcbiAgICAgIGlmICggcmVjdC5jb250YWlucyggY29tcGFyZVJlY3QgKSApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coICdjdXJyZW50IHRlc3QgcmVjdHM6JyArIHRlc3RSZWN0cy5sZW5ndGgsIHRlc3RSZWN0cyApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyggaSwgaiwgaW5kZXhBZGp1c3QsIHJlY3QsIGNvbXBhcmVSZWN0ICk7XG4gICAgICAgIHJlY3RzLnNwbGljZSggaiArIGluZGV4QWRqdXN0IC0gcmVtb3ZlZENvdW50LCAxICk7XG4gICAgICAgIHJlbW92ZWRDb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZWN0cztcbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc29ydGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBmdW5jdGlvbnMgZm9yIHNvcnRpbmcgcmVjdHMgaW4gb3JkZXJcbnZhciBzb3J0ZXJzID0ge1xuICAvLyB0b3AgZG93biwgdGhlbiBsZWZ0IHRvIHJpZ2h0XG4gIGRvd253YXJkTGVmdFRvUmlnaHQ6IGZ1bmN0aW9uKCBhLCBiICkge1xuICAgIHJldHVybiBhLnkgLSBiLnkgfHwgYS54IC0gYi54O1xuICB9LFxuICAvLyBsZWZ0IHRvIHJpZ2h0LCB0aGVuIHRvcCBkb3duXG4gIHJpZ2h0d2FyZFRvcFRvQm90dG9tOiBmdW5jdGlvbiggYSwgYiApIHtcbiAgICByZXR1cm4gYS54IC0gYi54IHx8IGEueSAtIGIueTtcbiAgfVxufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIFBhY2tlcjtcblxufSkpOyIsIi8qIVxuICogUGFja2VyeSB2MS40LjNcbiAqIGJpbi1wYWNraW5nIGxheW91dCBsaWJyYXJ5XG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgRmxpY2tpdHkgQ29tbWVyY2lhbCBMaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZVxuICpcbiAqIGh0dHA6Ly9wYWNrZXJ5Lm1ldGFmaXp6eS5jb1xuICogQ29weXJpZ2h0IDIwMTUgTWV0YWZpenp5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgICAnY2xhc3NpZS9jbGFzc2llJyxcbiAgICAgICAgJ2dldC1zaXplL2dldC1zaXplJyxcbiAgICAgICAgJ291dGxheWVyL291dGxheWVyJyxcbiAgICAgICAgJy4vcmVjdCcsXG4gICAgICAgICcuL3BhY2tlcicsXG4gICAgICAgICcuL2l0ZW0nXG4gICAgICBdLFxuICAgICAgZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLWNsYXNzaWUnKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJyksXG4gICAgICByZXF1aXJlKCdvdXRsYXllcicpLFxuICAgICAgcmVxdWlyZSgnLi9yZWN0JyksXG4gICAgICByZXF1aXJlKCcuL3BhY2tlcicpLFxuICAgICAgcmVxdWlyZSgnLi9pdGVtJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlBhY2tlcnkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LmNsYXNzaWUsXG4gICAgICB3aW5kb3cuZ2V0U2l6ZSxcbiAgICAgIHdpbmRvdy5PdXRsYXllcixcbiAgICAgIHdpbmRvdy5QYWNrZXJ5LlJlY3QsXG4gICAgICB3aW5kb3cuUGFja2VyeS5QYWNrZXIsXG4gICAgICB3aW5kb3cuUGFja2VyeS5JdGVtXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIGNsYXNzaWUsIGdldFNpemUsIE91dGxheWVyLCBSZWN0LCBQYWNrZXIsIEl0ZW0gKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tIFJlY3QgLS0tLS0gLy9cblxuLy8gYWxsb3cgZm9yIHBpeGVsIHJvdW5kaW5nIGVycm9ycyBJRTgtSUUxMSAmIEZpcmVmb3g7ICMyMjdcblJlY3QucHJvdG90eXBlLmNhbkZpdCA9IGZ1bmN0aW9uKCByZWN0ICkge1xuICByZXR1cm4gdGhpcy53aWR0aCA+PSByZWN0LndpZHRoIC0gMSAmJiB0aGlzLmhlaWdodCA+PSByZWN0LmhlaWdodCAtIDE7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWNrZXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGNyZWF0ZSBhbiBPdXRsYXllciBsYXlvdXQgY2xhc3NcbnZhciBQYWNrZXJ5ID0gT3V0bGF5ZXIuY3JlYXRlKCdwYWNrZXJ5Jyk7XG5QYWNrZXJ5Lkl0ZW0gPSBJdGVtO1xuXG5QYWNrZXJ5LnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNhbGwgc3VwZXJcbiAgT3V0bGF5ZXIucHJvdG90eXBlLl9jcmVhdGUuY2FsbCggdGhpcyApO1xuXG4gIC8vIGluaXRpYWwgcHJvcGVydGllc1xuICB0aGlzLnBhY2tlciA9IG5ldyBQYWNrZXIoKTtcblxuICAvLyBMZWZ0IG92ZXIgZnJvbSB2MS4wXG4gIHRoaXMuc3RhbXAoIHRoaXMub3B0aW9ucy5zdGFtcGVkICk7XG5cbiAgLy8gY3JlYXRlIGRyYWcgaGFuZGxlcnNcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdGhpcy5oYW5kbGVEcmFnZ2FiaWxseSA9IHtcbiAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaXRlbURyYWdTdGFydCggdGhpcy5lbGVtZW50ICk7XG4gICAgfSxcbiAgICBkcmFnTW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5pdGVtRHJhZ01vdmUoIHRoaXMuZWxlbWVudCwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKTtcbiAgICB9LFxuICAgIGRyYWdFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaXRlbURyYWdFbmQoIHRoaXMuZWxlbWVudCApO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmhhbmRsZVVJRHJhZ2dhYmxlID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbiBoYW5kbGVVSURyYWdnYWJsZVN0YXJ0KCBldmVudCwgdWkgKSB7XG4gICAgICAvLyBIVE1MNSBtYXkgdHJpZ2dlciBkcmFnc3RhcnQsIGRpc21pc3MgSFRNTDUgZHJhZ2dpbmdcbiAgICAgIGlmICggIXVpICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBfdGhpcy5pdGVtRHJhZ1N0YXJ0KCBldmVudC5jdXJyZW50VGFyZ2V0ICk7XG4gICAgfSxcbiAgICBkcmFnOiBmdW5jdGlvbiBoYW5kbGVVSURyYWdnYWJsZURyYWcoIGV2ZW50LCB1aSApIHtcbiAgICAgIGlmICggIXVpICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBfdGhpcy5pdGVtRHJhZ01vdmUoIGV2ZW50LmN1cnJlbnRUYXJnZXQsIHVpLnBvc2l0aW9uLmxlZnQsIHVpLnBvc2l0aW9uLnRvcCApO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gaGFuZGxlVUlEcmFnZ2FibGVTdG9wKCBldmVudCwgdWkgKSB7XG4gICAgICBpZiAoICF1aSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgX3RoaXMuaXRlbURyYWdFbmQoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKTtcbiAgICB9XG4gIH07XG5cbn07XG5cblxuLy8gLS0tLS0gaW5pdCAmIGxheW91dCAtLS0tLSAvL1xuXG4vKipcbiAqIGxvZ2ljIGJlZm9yZSBhbnkgbmV3IGxheW91dFxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fcmVzZXRMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nZXRTaXplKCk7XG5cbiAgdGhpcy5fZ2V0TWVhc3VyZW1lbnRzKCk7XG5cbiAgLy8gcmVzZXQgcGFja2VyXG4gIHZhciBwYWNrZXIgPSB0aGlzLnBhY2tlcjtcbiAgLy8gcGFja2VyIHNldHRpbmdzLCBpZiBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIGlmICggdGhpcy5vcHRpb25zLmlzSG9yaXpvbnRhbCApIHtcbiAgICBwYWNrZXIud2lkdGggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgcGFja2VyLmhlaWdodCA9IHRoaXMuc2l6ZS5pbm5lckhlaWdodCArIHRoaXMuZ3V0dGVyO1xuICAgIHBhY2tlci5zb3J0RGlyZWN0aW9uID0gJ3JpZ2h0d2FyZFRvcFRvQm90dG9tJztcbiAgfSBlbHNlIHtcbiAgICBwYWNrZXIud2lkdGggPSB0aGlzLnNpemUuaW5uZXJXaWR0aCArIHRoaXMuZ3V0dGVyO1xuICAgIHBhY2tlci5oZWlnaHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgcGFja2VyLnNvcnREaXJlY3Rpb24gPSAnZG93bndhcmRMZWZ0VG9SaWdodCc7XG4gIH1cblxuICBwYWNrZXIucmVzZXQoKTtcblxuICAvLyBsYXlvdXRcbiAgdGhpcy5tYXhZID0gMDtcbiAgdGhpcy5tYXhYID0gMDtcbn07XG5cbi8qKlxuICogdXBkYXRlIGNvbHVtbldpZHRoLCByb3dIZWlnaHQsICYgZ3V0dGVyXG4gKiBAcHJpdmF0ZVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fZ2V0TWVhc3VyZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2dldE1lYXN1cmVtZW50KCAnY29sdW1uV2lkdGgnLCAnd2lkdGgnICk7XG4gIHRoaXMuX2dldE1lYXN1cmVtZW50KCAncm93SGVpZ2h0JywgJ2hlaWdodCcgKTtcbiAgdGhpcy5fZ2V0TWVhc3VyZW1lbnQoICdndXR0ZXInLCAnd2lkdGgnICk7XG59O1xuXG5QYWNrZXJ5LnByb3RvdHlwZS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG4gIHRoaXMuX3BhY2tJdGVtKCBpdGVtICk7XG4gIHJldHVybiBpdGVtLnJlY3Q7XG59O1xuXG5cbi8qKlxuICogbGF5b3V0IGl0ZW0gaW4gcGFja2VyXG4gKiBAcGFyYW0ge1BhY2tlcnkuSXRlbX0gaXRlbVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fcGFja0l0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcbiAgdGhpcy5fc2V0UmVjdFNpemUoIGl0ZW0uZWxlbWVudCwgaXRlbS5yZWN0ICk7XG4gIC8vIHBhY2sgdGhlIHJlY3QgaW4gdGhlIHBhY2tlclxuICB0aGlzLnBhY2tlci5wYWNrKCBpdGVtLnJlY3QgKTtcbiAgdGhpcy5fc2V0TWF4WFkoIGl0ZW0ucmVjdCApO1xufTtcblxuLyoqXG4gKiBzZXQgbWF4IFggYW5kIFkgdmFsdWUsIGZvciBzaXplIG9mIGNvbnRhaW5lclxuICogQHBhcmFtIHtQYWNrZXJ5LlJlY3R9IHJlY3RcbiAqIEBwcml2YXRlXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLl9zZXRNYXhYWSA9IGZ1bmN0aW9uKCByZWN0ICkge1xuICB0aGlzLm1heFggPSBNYXRoLm1heCggcmVjdC54ICsgcmVjdC53aWR0aCwgdGhpcy5tYXhYICk7XG4gIHRoaXMubWF4WSA9IE1hdGgubWF4KCByZWN0LnkgKyByZWN0LmhlaWdodCwgdGhpcy5tYXhZICk7XG59O1xuXG4vKipcbiAqIHNldCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiBhIHJlY3QsIGFwcGx5aW5nIGNvbHVtbldpZHRoIGFuZCByb3dIZWlnaHRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtQYWNrZXJ5LlJlY3R9IHJlY3RcbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuX3NldFJlY3RTaXplID0gZnVuY3Rpb24oIGVsZW0sIHJlY3QgKSB7XG4gIHZhciBzaXplID0gZ2V0U2l6ZSggZWxlbSApO1xuICB2YXIgdyA9IHNpemUub3V0ZXJXaWR0aDtcbiAgdmFyIGggPSBzaXplLm91dGVySGVpZ2h0O1xuICAvLyBzaXplIGZvciBjb2x1bW5XaWR0aCBhbmQgcm93SGVpZ2h0LCBpZiBhdmFpbGFibGVcbiAgLy8gb25seSBjaGVjayBpZiBzaXplIGlzIG5vbi16ZXJvLCAjMTc3XG4gIGlmICggdyB8fCBoICkge1xuICAgIHcgPSB0aGlzLl9hcHBseUdyaWRHdXR0ZXIoIHcsIHRoaXMuY29sdW1uV2lkdGggKTtcbiAgICBoID0gdGhpcy5fYXBwbHlHcmlkR3V0dGVyKCBoLCB0aGlzLnJvd0hlaWdodCApO1xuICB9XG4gIC8vIHJlY3QgbXVzdCBmaXQgaW4gcGFja2VyXG4gIHJlY3Qud2lkdGggPSBNYXRoLm1pbiggdywgdGhpcy5wYWNrZXIud2lkdGggKTtcbiAgcmVjdC5oZWlnaHQgPSBNYXRoLm1pbiggaCwgdGhpcy5wYWNrZXIuaGVpZ2h0ICk7XG59O1xuXG4vKipcbiAqIGZpdHMgaXRlbSB0byBjb2x1bW5XaWR0aC9yb3dIZWlnaHQgYW5kIGFkZHMgZ3V0dGVyXG4gKiBAcGFyYW0ge051bWJlcn0gbWVhc3VyZW1lbnQgLSBpdGVtIHdpZHRoIG9yIGhlaWdodFxuICogQHBhcmFtIHtOdW1iZXJ9IGdyaWRTaXplIC0gY29sdW1uV2lkdGggb3Igcm93SGVpZ2h0XG4gKiBAcmV0dXJucyBtZWFzdXJlbWVudFxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fYXBwbHlHcmlkR3V0dGVyID0gZnVuY3Rpb24oIG1lYXN1cmVtZW50LCBncmlkU2l6ZSApIHtcbiAgLy8ganVzdCBhZGQgZ3V0dGVyIGlmIG5vIGdyaWRTaXplXG4gIGlmICggIWdyaWRTaXplICkge1xuICAgIHJldHVybiBtZWFzdXJlbWVudCArIHRoaXMuZ3V0dGVyO1xuICB9XG4gIGdyaWRTaXplICs9IHRoaXMuZ3V0dGVyO1xuICAvLyBmaXQgaXRlbSB0byBjb2x1bW5XaWR0aC9yb3dIZWlnaHRcbiAgdmFyIHJlbWFpbmRlciA9IG1lYXN1cmVtZW50ICUgZ3JpZFNpemU7XG4gIHZhciBtYXRoTWV0aG9kID0gcmVtYWluZGVyICYmIHJlbWFpbmRlciA8IDEgPyAncm91bmQnIDogJ2NlaWwnO1xuICBtZWFzdXJlbWVudCA9IE1hdGhbIG1hdGhNZXRob2QgXSggbWVhc3VyZW1lbnQgLyBncmlkU2l6ZSApICogZ3JpZFNpemU7XG4gIHJldHVybiBtZWFzdXJlbWVudDtcbn07XG5cblBhY2tlcnkucHJvdG90eXBlLl9nZXRDb250YWluZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLmlzSG9yaXpvbnRhbCApIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMubWF4WCAtIHRoaXMuZ3V0dGVyXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiB0aGlzLm1heFkgLSB0aGlzLmd1dHRlclxuICAgIH07XG4gIH1cbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc3RhbXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBtYWtlcyBzcGFjZSBmb3IgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLl9tYW5hZ2VTdGFtcCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIHZhciByZWN0O1xuICBpZiAoIGl0ZW0gJiYgaXRlbS5pc1BsYWNpbmcgKSB7XG4gICAgcmVjdCA9IGl0ZW0ucGxhY2VSZWN0O1xuICB9IGVsc2Uge1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRFbGVtZW50T2Zmc2V0KCBlbGVtICk7XG4gICAgcmVjdCA9IG5ldyBSZWN0KHtcbiAgICAgIHg6IHRoaXMub3B0aW9ucy5pc09yaWdpbkxlZnQgPyBvZmZzZXQubGVmdCA6IG9mZnNldC5yaWdodCxcbiAgICAgIHk6IHRoaXMub3B0aW9ucy5pc09yaWdpblRvcCA/IG9mZnNldC50b3AgOiBvZmZzZXQuYm90dG9tXG4gICAgfSk7XG4gIH1cblxuICB0aGlzLl9zZXRSZWN0U2l6ZSggZWxlbSwgcmVjdCApO1xuICAvLyBzYXZlIGl0cyBzcGFjZSBpbiB0aGUgcGFja2VyXG4gIHRoaXMucGFja2VyLnBsYWNlZCggcmVjdCApO1xuICB0aGlzLl9zZXRNYXhYWSggcmVjdCApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiB2ZXJ0aWNhbFNvcnRlciggYSwgYiApIHtcbiAgcmV0dXJuIGEucG9zaXRpb24ueSAtIGIucG9zaXRpb24ueSB8fCBhLnBvc2l0aW9uLnggLSBiLnBvc2l0aW9uLng7XG59XG5cbmZ1bmN0aW9uIGhvcml6b250YWxTb3J0ZXIoIGEsIGIgKSB7XG4gIHJldHVybiBhLnBvc2l0aW9uLnggLSBiLnBvc2l0aW9uLnggfHwgYS5wb3NpdGlvbi55IC0gYi5wb3NpdGlvbi55O1xufVxuXG5QYWNrZXJ5LnByb3RvdHlwZS5zb3J0SXRlbXNCeVBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzb3J0ZXIgPSB0aGlzLm9wdGlvbnMuaXNIb3Jpem9udGFsID8gaG9yaXpvbnRhbFNvcnRlciA6IHZlcnRpY2FsU29ydGVyO1xuICB0aGlzLml0ZW1zLnNvcnQoIHNvcnRlciApO1xufTtcblxuLyoqXG4gKiBGaXQgaXRlbSBlbGVtZW50IGluIGl0cyBjdXJyZW50IHBvc2l0aW9uXG4gKiBQYWNrZXJ5IHdpbGwgcG9zaXRpb24gZWxlbWVudHMgYXJvdW5kIGl0XG4gKiB1c2VmdWwgZm9yIGV4cGFuZGluZyBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtOdW1iZXJ9IHggLSBob3Jpem9udGFsIGRlc3RpbmF0aW9uIHBvc2l0aW9uLCBvcHRpb25hbFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgLSB2ZXJ0aWNhbCBkZXN0aW5hdGlvbiBwb3NpdGlvbiwgb3B0aW9uYWxcbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuZml0ID0gZnVuY3Rpb24oIGVsZW0sIHgsIHkgKSB7XG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIGlmICggIWl0ZW0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gcHJlcGFyZSBpbnRlcm5hbCBwcm9wZXJ0aWVzXG4gIHRoaXMuX2dldE1lYXN1cmVtZW50cygpO1xuXG4gIC8vIHN0YW1wIGl0ZW0gdG8gZ2V0IGl0IG91dCBvZiBsYXlvdXRcbiAgdGhpcy5zdGFtcCggaXRlbS5lbGVtZW50ICk7XG4gIC8vIHJlcXVpcmVkIGZvciBwb3NpdGlvblBsYWNlUmVjdFxuICBpdGVtLmdldFNpemUoKTtcbiAgLy8gc2V0IHBsYWNpbmcgZmxhZ1xuICBpdGVtLmlzUGxhY2luZyA9IHRydWU7XG4gIC8vIGZhbGwgYmFjayB0byBjdXJyZW50IHBvc2l0aW9uIGZvciBmaXR0aW5nXG4gIHggPSB4ID09PSB1bmRlZmluZWQgPyBpdGVtLnJlY3QueDogeDtcbiAgeSA9IHkgPT09IHVuZGVmaW5lZCA/IGl0ZW0ucmVjdC55OiB5O1xuXG4gIC8vIHBvc2l0aW9uIGl0IGJlc3QgYXQgaXRzIGRlc3RpbmF0aW9uXG4gIGl0ZW0ucG9zaXRpb25QbGFjZVJlY3QoIHgsIHksIHRydWUgKTtcblxuICB0aGlzLl9iaW5kRml0RXZlbnRzKCBpdGVtICk7XG4gIGl0ZW0ubW92ZVRvKCBpdGVtLnBsYWNlUmVjdC54LCBpdGVtLnBsYWNlUmVjdC55ICk7XG4gIC8vIGxheW91dCBldmVyeXRoaW5nIGVsc2VcbiAgdGhpcy5sYXlvdXQoKTtcblxuICAvLyByZXR1cm4gYmFjayB0byByZWd1bGFybHkgc2NoZWR1bGVkIHByb2dyYW1taW5nXG4gIHRoaXMudW5zdGFtcCggaXRlbS5lbGVtZW50ICk7XG4gIHRoaXMuc29ydEl0ZW1zQnlQb3NpdGlvbigpO1xuICAvLyB1biBzZXQgcGxhY2luZyBmbGFnLCBiYWNrIHRvIG5vcm1hbFxuICBpdGVtLmlzUGxhY2luZyA9IGZhbHNlO1xuICAvLyBjb3B5IHBsYWNlIHJlY3QgcG9zaXRpb25cbiAgaXRlbS5jb3B5UGxhY2VSZWN0UG9zaXRpb24oKTtcbn07XG5cbi8qKlxuICogZW1pdCBldmVudCB3aGVuIGl0ZW0gaXMgZml0IGFuZCBvdGhlciBpdGVtcyBhcmUgbGFpZCBvdXRcbiAqIEBwYXJhbSB7UGFja2VyeS5JdGVtfSBpdGVtXG4gKiBAcHJpdmF0ZVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fYmluZEZpdEV2ZW50cyA9IGZ1bmN0aW9uKCBpdGVtICkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgdGlja3MgPSAwO1xuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIHRpY2tzKys7XG4gICAgaWYgKCB0aWNrcyAhPSAyICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfdGhpcy5kaXNwYXRjaEV2ZW50KCAnZml0Q29tcGxldGUnLCBudWxsLCBbIGl0ZW0gXSApO1xuICB9XG4gIC8vIHdoZW4gaXRlbSBpcyBsYWlkIG91dFxuICBpdGVtLm9uKCAnbGF5b3V0JywgZnVuY3Rpb24oKSB7XG4gICAgdGljaygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgLy8gd2hlbiBhbGwgaXRlbXMgYXJlIGxhaWQgb3V0XG4gIHRoaXMub24oICdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgIHRpY2soKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSByZXNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZGVib3VuY2VkLCBsYXlvdXQgb24gcmVzaXplXG5QYWNrZXJ5LnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG9uJ3QgdHJpZ2dlciBpZiBzaXplIGRpZCBub3QgY2hhbmdlXG4gIHZhciBzaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNoZWNrIHRoYXQgdGhpcy5zaXplIGFuZCBzaXplIGFyZSB0aGVyZVxuICAvLyBJRTggdHJpZ2dlcnMgcmVzaXplIG9uIGJvZHkgc2l6ZSBjaGFuZ2UsIHNvIHRoZXkgbWlnaHQgbm90IGJlXG4gIHZhciBoYXNTaXplcyA9IHRoaXMuc2l6ZSAmJiBzaXplO1xuICB2YXIgaW5uZXJTaXplID0gdGhpcy5vcHRpb25zLmlzSG9yaXpvbnRhbCA/ICdpbm5lckhlaWdodCcgOiAnaW5uZXJXaWR0aCc7XG4gIGlmICggaGFzU2l6ZXMgJiYgc2l6ZVsgaW5uZXJTaXplIF0gPT0gdGhpcy5zaXplWyBpbm5lclNpemUgXSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmxheW91dCgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGhhbmRsZSBhbiBpdGVtIGRyYWcgc3RhcnQgZXZlbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5pdGVtRHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuc3RhbXAoIGVsZW0gKTtcbiAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgaWYgKCBpdGVtICkge1xuICAgIGl0ZW0uZHJhZ1N0YXJ0KCk7XG4gIH1cbn07XG5cbi8qKlxuICogaGFuZGxlIGFuIGl0ZW0gZHJhZyBtb3ZlIGV2ZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBjaGFuZ2UgaW4gcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gdmVydGljYWwgY2hhbmdlIGluIHBvc2l0aW9uXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLml0ZW1EcmFnTW92ZSA9IGZ1bmN0aW9uKCBlbGVtLCB4LCB5ICkge1xuICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSggZWxlbSApO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbS5kcmFnTW92ZSggeCwgeSApO1xuICB9XG5cbiAgLy8gZGVib3VuY2VcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgLy8gZGVib3VuY2UgdHJpZ2dlcmluZyBsYXlvdXRcbiAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICBfdGhpcy5sYXlvdXQoKTtcbiAgICBkZWxldGUgX3RoaXMuZHJhZ1RpbWVvdXQ7XG4gIH1cblxuICB0aGlzLmNsZWFyRHJhZ1RpbWVvdXQoKTtcblxuICB0aGlzLmRyYWdUaW1lb3V0ID0gc2V0VGltZW91dCggZGVsYXllZCwgNDAgKTtcbn07XG5cblBhY2tlcnkucHJvdG90eXBlLmNsZWFyRHJhZ1RpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmRyYWdUaW1lb3V0ICkge1xuICAgIGNsZWFyVGltZW91dCggdGhpcy5kcmFnVGltZW91dCApO1xuICB9XG59O1xuXG4vKipcbiAqIGhhbmRsZSBhbiBpdGVtIGRyYWcgZW5kIGV2ZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuaXRlbURyYWdFbmQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgdmFyIGl0ZW1EaWREcmFnO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbURpZERyYWcgPSBpdGVtLmRpZERyYWc7XG4gICAgaXRlbS5kcmFnU3RvcCgpO1xuICB9XG4gIC8vIGlmIGVsZW0gZGlkbid0IG1vdmUsIG9yIGlmIGl0IGRvZXNuJ3QgbmVlZCBwb3NpdGlvbmluZ1xuICAvLyB1bmlnbm9yZSBhbmQgdW5zdGFtcCBhbmQgY2FsbCBpdCBhIGRheVxuICBpZiAoICFpdGVtIHx8ICggIWl0ZW1EaWREcmFnICYmICFpdGVtLm5lZWRzUG9zaXRpb25pbmcgKSApIHtcbiAgICB0aGlzLnVuc3RhbXAoIGVsZW0gKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gcHJvY2NlZCB3aXRoIGRyYWdnZWQgaXRlbVxuXG4gIGNsYXNzaWUuYWRkKCBpdGVtLmVsZW1lbnQsICdpcy1wb3NpdGlvbmluZy1wb3N0LWRyYWcnICk7XG5cbiAgLy8gc2F2ZSB0aGlzIHZhciwgYXMgaXQgY291bGQgZ2V0IHJlc2V0IGluIGRyYWdTdGFydFxuICB2YXIgb25MYXlvdXRDb21wbGV0ZSA9IHRoaXMuX2dldERyYWdFbmRMYXlvdXRDb21wbGV0ZSggZWxlbSwgaXRlbSApO1xuXG4gIGlmICggaXRlbS5uZWVkc1Bvc2l0aW9uaW5nICkge1xuICAgIGl0ZW0ub24oICdsYXlvdXQnLCBvbkxheW91dENvbXBsZXRlICk7XG4gICAgaXRlbS5tb3ZlVG8oIGl0ZW0ucGxhY2VSZWN0LngsIGl0ZW0ucGxhY2VSZWN0LnkgKTtcbiAgfSBlbHNlIGlmICggaXRlbSApIHtcbiAgICAvLyBpdGVtIGRpZG4ndCBuZWVkIHBsYWNlbWVudFxuICAgIGl0ZW0uY29weVBsYWNlUmVjdFBvc2l0aW9uKCk7XG4gIH1cblxuICB0aGlzLmNsZWFyRHJhZ1RpbWVvdXQoKTtcbiAgdGhpcy5vbiggJ2xheW91dENvbXBsZXRlJywgb25MYXlvdXRDb21wbGV0ZSApO1xuICB0aGlzLmxheW91dCgpO1xuXG59O1xuXG4vKipcbiAqIGdldCBkcmFnIGVuZCBjYWxsYmFja1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge1BhY2tlcnkuSXRlbX0gaXRlbVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBvbkxheW91dENvbXBsZXRlXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLl9nZXREcmFnRW5kTGF5b3V0Q29tcGxldGUgPSBmdW5jdGlvbiggZWxlbSwgaXRlbSApIHtcbiAgdmFyIGl0ZW1OZWVkc1Bvc2l0aW9uaW5nID0gaXRlbSAmJiBpdGVtLm5lZWRzUG9zaXRpb25pbmc7XG4gIHZhciBjb21wbGV0ZUNvdW50ID0gMDtcbiAgdmFyIGFzeW5jQ291bnQgPSBpdGVtTmVlZHNQb3NpdGlvbmluZyA/IDIgOiAxO1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBvbkxheW91dENvbXBsZXRlKCkge1xuICAgIGNvbXBsZXRlQ291bnQrKztcbiAgICAvLyBkb24ndCBwcm9jZWVkIGlmIG5vdCBjb21wbGV0ZVxuICAgIGlmICggY29tcGxldGVDb3VudCAhPSBhc3luY0NvdW50ICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIHJlc2V0IGl0ZW1cbiAgICBpZiAoIGl0ZW0gKSB7XG4gICAgICBjbGFzc2llLnJlbW92ZSggaXRlbS5lbGVtZW50LCAnaXMtcG9zaXRpb25pbmctcG9zdC1kcmFnJyApO1xuICAgICAgaXRlbS5pc1BsYWNpbmcgPSBmYWxzZTtcbiAgICAgIGl0ZW0uY29weVBsYWNlUmVjdFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgX3RoaXMudW5zdGFtcCggZWxlbSApO1xuICAgIC8vIG9ubHkgc29ydCB3aGVuIGl0ZW0gbW92ZWRcbiAgICBfdGhpcy5zb3J0SXRlbXNCeVBvc2l0aW9uKCk7XG5cbiAgICAvLyBlbWl0IGl0ZW0gZHJhZyBldmVudCBub3cgdGhhdCBldmVyeXRoaW5nIGlzIGRvbmVcbiAgICBpZiAoIGl0ZW1OZWVkc1Bvc2l0aW9uaW5nICkge1xuICAgICAgX3RoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdJdGVtUG9zaXRpb25lZCcsIG51bGwsIFsgaXRlbSBdICk7XG4gICAgfVxuICAgIC8vIGxpc3RlbiBvbmNlXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIGJpbmRzIERyYWdnYWJpbGx5IGV2ZW50c1xuICogQHBhcmFtIHtEcmFnZ2FiaWxseX0gZHJhZ2dpZVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5iaW5kRHJhZ2dhYmlsbHlFdmVudHMgPSBmdW5jdGlvbiggZHJhZ2dpZSApIHtcbiAgZHJhZ2dpZS5vbiggJ2RyYWdTdGFydCcsIHRoaXMuaGFuZGxlRHJhZ2dhYmlsbHkuZHJhZ1N0YXJ0ICk7XG4gIGRyYWdnaWUub24oICdkcmFnTW92ZScsIHRoaXMuaGFuZGxlRHJhZ2dhYmlsbHkuZHJhZ01vdmUgKTtcbiAgZHJhZ2dpZS5vbiggJ2RyYWdFbmQnLCB0aGlzLmhhbmRsZURyYWdnYWJpbGx5LmRyYWdFbmQgKTtcbn07XG5cbi8qKlxuICogYmluZHMgalF1ZXJ5IFVJIERyYWdnYWJsZSBldmVudHNcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbXNcbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuYmluZFVJRHJhZ2dhYmxlRXZlbnRzID0gZnVuY3Rpb24oICRlbGVtcyApIHtcbiAgJGVsZW1zXG4gICAgLm9uKCAnZHJhZ3N0YXJ0JywgdGhpcy5oYW5kbGVVSURyYWdnYWJsZS5zdGFydCApXG4gICAgLm9uKCAnZHJhZycsIHRoaXMuaGFuZGxlVUlEcmFnZ2FibGUuZHJhZyApXG4gICAgLm9uKCAnZHJhZ3N0b3AnLCB0aGlzLmhhbmRsZVVJRHJhZ2dhYmxlLnN0b3AgKTtcbn07XG5cblBhY2tlcnkuUmVjdCA9IFJlY3Q7XG5QYWNrZXJ5LlBhY2tlciA9IFBhY2tlcjtcblxucmV0dXJuIFBhY2tlcnk7XG5cbn0pKTtcbiIsIi8qKlxuICogUmVjdFxuICogbG93LWxldmVsIHV0aWxpdHkgY2xhc3MgZm9yIGJhc2ljIGdlb21ldHJ5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlBhY2tlcnkgPSB3aW5kb3cuUGFja2VyeSB8fCB7fTtcbiAgICB3aW5kb3cuUGFja2VyeS5SZWN0ID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGFja2VyeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnbG9iYWwgbmFtZXNwYWNlXG52YXIgUGFja2VyeSA9IHdpbmRvdy5QYWNrZXJ5ID0gZnVuY3Rpb24oKSB7fTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUmVjdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBSZWN0KCBwcm9wcyApIHtcbiAgLy8gZXh0ZW5kIHByb3BlcnRpZXMgZnJvbSBkZWZhdWx0c1xuICBmb3IgKCB2YXIgcHJvcCBpbiBSZWN0LmRlZmF1bHRzICkge1xuICAgIHRoaXNbIHByb3AgXSA9IFJlY3QuZGVmYXVsdHNbIHByb3AgXTtcbiAgfVxuXG4gIGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG4gICAgdGhpc1sgcHJvcCBdID0gcHJvcHNbIHByb3AgXTtcbiAgfVxuXG59XG5cbi8vIG1ha2UgYXZhaWxhYmxlXG5QYWNrZXJ5LlJlY3QgPSBSZWN0O1xuXG5SZWN0LmRlZmF1bHRzID0ge1xuICB4OiAwLFxuICB5OiAwLFxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwXG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhpcyByZWN0YW5nbGUgd2hvbGx5IGVuY2xvc2VzIGFub3RoZXIgcmVjdGFuZ2xlIG9yIHBvaW50LlxuICogQHBhcmFtIHtSZWN0fSByZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbioqL1xuUmVjdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgLy8gcG9pbnRzIGRvbid0IGhhdmUgd2lkdGggb3IgaGVpZ2h0XG4gIHZhciBvdGhlcldpZHRoID0gcmVjdC53aWR0aCB8fCAwO1xuICB2YXIgb3RoZXJIZWlnaHQgPSByZWN0LmhlaWdodCB8fCAwO1xuICByZXR1cm4gdGhpcy54IDw9IHJlY3QueCAmJlxuICAgIHRoaXMueSA8PSByZWN0LnkgJiZcbiAgICB0aGlzLnggKyB0aGlzLndpZHRoID49IHJlY3QueCArIG90aGVyV2lkdGggJiZcbiAgICB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSByZWN0LnkgKyBvdGhlckhlaWdodDtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgcmVjdGFuZ2xlIGludGVyc2VjdHMgd2l0aCBhbm90aGVyLlxuICogQHBhcmFtIHtSZWN0fSByZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbioqL1xuUmVjdC5wcm90b3R5cGUub3ZlcmxhcHMgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgdmFyIHRoaXNSaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIHZhciB0aGlzQm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gIHZhciByZWN0UmlnaHQgPSByZWN0LnggKyByZWN0LndpZHRoO1xuICB2YXIgcmVjdEJvdHRvbSA9IHJlY3QueSArIHJlY3QuaGVpZ2h0O1xuXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMwNjMzMlxuICByZXR1cm4gdGhpcy54IDwgcmVjdFJpZ2h0ICYmXG4gICAgdGhpc1JpZ2h0ID4gcmVjdC54ICYmXG4gICAgdGhpcy55IDwgcmVjdEJvdHRvbSAmJlxuICAgIHRoaXNCb3R0b20gPiByZWN0Lnk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7UmVjdH0gcmVjdCAtIHRoZSBvdmVybGFwcGluZyByZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9IGZyZWVSZWN0cyAtIHJlY3RzIHJlcHJlc2VudGluZyB0aGUgYXJlYSBhcm91bmQgdGhlIHJlY3RcbioqL1xuUmVjdC5wcm90b3R5cGUuZ2V0TWF4aW1hbEZyZWVSZWN0cyA9IGZ1bmN0aW9uKCByZWN0ICkge1xuXG4gIC8vIGlmIG5vIGludGVyc2VjdGlvbiwgcmV0dXJuIGZhbHNlXG4gIGlmICggIXRoaXMub3ZlcmxhcHMoIHJlY3QgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZnJlZVJlY3RzID0gW107XG4gIHZhciBmcmVlUmVjdDtcblxuICB2YXIgdGhpc1JpZ2h0ID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgdmFyIHRoaXNCb3R0b20gPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbiAgdmFyIHJlY3RSaWdodCA9IHJlY3QueCArIHJlY3Qud2lkdGg7XG4gIHZhciByZWN0Qm90dG9tID0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XG5cbiAgLy8gdG9wXG4gIGlmICggdGhpcy55IDwgcmVjdC55ICkge1xuICAgIGZyZWVSZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlY3QueSAtIHRoaXMueVxuICAgIH0pO1xuICAgIGZyZWVSZWN0cy5wdXNoKCBmcmVlUmVjdCApO1xuICB9XG5cbiAgLy8gcmlnaHRcbiAgaWYgKCB0aGlzUmlnaHQgPiByZWN0UmlnaHQgKSB7XG4gICAgZnJlZVJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiByZWN0UmlnaHQsXG4gICAgICB5OiB0aGlzLnksXG4gICAgICB3aWR0aDogdGhpc1JpZ2h0IC0gcmVjdFJpZ2h0LFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodFxuICAgIH0pO1xuICAgIGZyZWVSZWN0cy5wdXNoKCBmcmVlUmVjdCApO1xuICB9XG5cbiAgLy8gYm90dG9tXG4gIGlmICggdGhpc0JvdHRvbSA+IHJlY3RCb3R0b20gKSB7XG4gICAgZnJlZVJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiB0aGlzLngsXG4gICAgICB5OiByZWN0Qm90dG9tLFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXNCb3R0b20gLSByZWN0Qm90dG9tXG4gICAgfSk7XG4gICAgZnJlZVJlY3RzLnB1c2goIGZyZWVSZWN0ICk7XG4gIH1cblxuICAvLyBsZWZ0XG4gIGlmICggdGhpcy54IDwgcmVjdC54ICkge1xuICAgIGZyZWVSZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgd2lkdGg6IHJlY3QueCAtIHRoaXMueCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHRcbiAgICB9KTtcbiAgICBmcmVlUmVjdHMucHVzaCggZnJlZVJlY3QgKTtcbiAgfVxuXG4gIHJldHVybiBmcmVlUmVjdHM7XG59O1xuXG5SZWN0LnByb3RvdHlwZS5jYW5GaXQgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgcmV0dXJuIHRoaXMud2lkdGggPj0gcmVjdC53aWR0aCAmJiB0aGlzLmhlaWdodCA+PSByZWN0LmhlaWdodDtcbn07XG5cbnJldHVybiBSZWN0O1xuXG59KSk7XG4iLCIvKipcbiAqIFN3aXBlciAzLjQuMVxuICogTW9zdCBtb2Rlcm4gbW9iaWxlIHRvdWNoIHNsaWRlciBhbmQgZnJhbWV3b3JrIHdpdGggaGFyZHdhcmUgYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnNcbiAqIFxuICogaHR0cDovL3d3dy5pZGFuZ2Vyby51cy9zd2lwZXIvXG4gKiBcbiAqIENvcHlyaWdodCAyMDE2LCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICogVGhlIGlEYW5nZXJvLnVzXG4gKiBodHRwOi8vd3d3LmlkYW5nZXJvLnVzL1xuICogXG4gKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAqIFxuICogUmVsZWFzZWQgb246IERlY2VtYmVyIDEzLCAyMDE2XG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciAkO1xuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgU3dpcGVyXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICB2YXIgU3dpcGVyID0gZnVuY3Rpb24gKGNvbnRhaW5lciwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTd2lwZXIpKSByZXR1cm4gbmV3IFN3aXBlcihjb250YWluZXIsIHBhcmFtcyk7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRzID0ge1xuICAgICAgICAgICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldDogJ2NvbnRhaW5lcicsXG4gICAgICAgICAgICBpbml0aWFsU2xpZGU6IDAsXG4gICAgICAgICAgICBzcGVlZDogMzAwLFxuICAgICAgICAgICAgLy8gYXV0b3BsYXlcbiAgICAgICAgICAgIGF1dG9wbGF5OiBmYWxzZSxcbiAgICAgICAgICAgIGF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgICAgICBhdXRvcGxheVN0b3BPbkxhc3Q6IGZhbHNlLFxuICAgICAgICAgICAgLy8gVG8gc3VwcG9ydCBpT1MncyBzd2lwZS10by1nby1iYWNrIGdlc3R1cmUgKHdoZW4gYmVpbmcgdXNlZCBpbi1hcHAsIHdpdGggVUlXZWJWaWV3KS5cbiAgICAgICAgICAgIGlPU0VkZ2VTd2lwZURldGVjdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBpT1NFZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuICAgICAgICAgICAgLy8gRnJlZSBtb2RlXG4gICAgICAgICAgICBmcmVlTW9kZTogZmFsc2UsXG4gICAgICAgICAgICBmcmVlTW9kZU1vbWVudHVtOiB0cnVlLFxuICAgICAgICAgICAgZnJlZU1vZGVNb21lbnR1bVJhdGlvOiAxLFxuICAgICAgICAgICAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZTogdHJ1ZSxcbiAgICAgICAgICAgIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbzogMSxcbiAgICAgICAgICAgIGZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvOiAxLFxuICAgICAgICAgICAgZnJlZU1vZGVTdGlja3k6IGZhbHNlLFxuICAgICAgICAgICAgZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHk6IDAuMDIsXG4gICAgICAgICAgICAvLyBBdXRvaGVpZ2h0XG4gICAgICAgICAgICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gICAgICAgICAgICBzZXRXcmFwcGVyU2l6ZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxuICAgICAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBFZmZlY3RzXG4gICAgICAgICAgICBlZmZlY3Q6ICdzbGlkZScsIC8vICdzbGlkZScgb3IgJ2ZhZGUnIG9yICdjdWJlJyBvciAnY292ZXJmbG93JyBvciAnZmxpcCdcbiAgICAgICAgICAgIGNvdmVyZmxvdzoge1xuICAgICAgICAgICAgICAgIHJvdGF0ZTogNTAsXG4gICAgICAgICAgICAgICAgc3RyZXRjaDogMCxcbiAgICAgICAgICAgICAgICBkZXB0aDogMTAwLFxuICAgICAgICAgICAgICAgIG1vZGlmaWVyOiAxLFxuICAgICAgICAgICAgICAgIHNsaWRlU2hhZG93cyA6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmbGlwOiB7XG4gICAgICAgICAgICAgICAgc2xpZGVTaGFkb3dzIDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBsaW1pdFJvdGF0aW9uOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3ViZToge1xuICAgICAgICAgICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaGFkb3c6IHRydWUsXG4gICAgICAgICAgICAgICAgc2hhZG93T2Zmc2V0OiAyMCxcbiAgICAgICAgICAgICAgICBzaGFkb3dTY2FsZTogMC45NFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZhZGU6IHtcbiAgICAgICAgICAgICAgICBjcm9zc0ZhZGU6IGZhbHNlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gUGFyYWxsYXhcbiAgICAgICAgICAgIHBhcmFsbGF4OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFpvb21cbiAgICAgICAgICAgIHpvb206IGZhbHNlLFxuICAgICAgICAgICAgem9vbU1heDogMyxcbiAgICAgICAgICAgIHpvb21NaW46IDEsXG4gICAgICAgICAgICB6b29tVG9nZ2xlOiB0cnVlLFxuICAgICAgICAgICAgLy8gU2Nyb2xsYmFyXG4gICAgICAgICAgICBzY3JvbGxiYXI6IG51bGwsXG4gICAgICAgICAgICBzY3JvbGxiYXJIaWRlOiB0cnVlLFxuICAgICAgICAgICAgc2Nyb2xsYmFyRHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHNjcm9sbGJhclNuYXBPblJlbGVhc2U6IGZhbHNlLFxuICAgICAgICAgICAgLy8gS2V5Ym9hcmQgTW91c2V3aGVlbFxuICAgICAgICAgICAga2V5Ym9hcmRDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxDb250cm9sOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxSZWxlYXNlT25FZGdlczogZmFsc2UsXG4gICAgICAgICAgICBtb3VzZXdoZWVsSW52ZXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxGb3JjZVRvQXhpczogZmFsc2UsXG4gICAgICAgICAgICBtb3VzZXdoZWVsU2Vuc2l0aXZpdHk6IDEsXG4gICAgICAgICAgICBtb3VzZXdoZWVsRXZlbnRzVGFyZ2VkOiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgIC8vIEhhc2ggTmF2aWdhdGlvblxuICAgICAgICAgICAgaGFzaG5hdjogZmFsc2UsXG4gICAgICAgICAgICBoYXNobmF2V2F0Y2hTdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBIaXN0b3J5XG4gICAgICAgICAgICBoaXN0b3J5OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIENvbW1vbmcgTmF2IFN0YXRlXG4gICAgICAgICAgICByZXBsYWNlU3RhdGU6IGZhbHNlLFxuICAgICAgICAgICAgLy8gQnJlYWtwb2ludHNcbiAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAvLyBTbGlkZXMgZ3JpZFxuICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgICAgICAgIHNsaWRlc1BlckNvbHVtbjogMSxcbiAgICAgICAgICAgIHNsaWRlc1BlckNvbHVtbkZpbGw6ICdjb2x1bW4nLFxuICAgICAgICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgICAgICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsIC8vIGluIHB4XG4gICAgICAgICAgICBzbGlkZXNPZmZzZXRBZnRlcjogMCwgLy8gaW4gcHhcbiAgICAgICAgICAgIC8vIFJvdW5kIGxlbmd0aFxuICAgICAgICAgICAgcm91bmRMZW5ndGhzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFRvdWNoZXNcbiAgICAgICAgICAgIHRvdWNoUmF0aW86IDEsXG4gICAgICAgICAgICB0b3VjaEFuZ2xlOiA0NSxcbiAgICAgICAgICAgIHNpbXVsYXRlVG91Y2g6IHRydWUsXG4gICAgICAgICAgICBzaG9ydFN3aXBlczogdHJ1ZSxcbiAgICAgICAgICAgIGxvbmdTd2lwZXM6IHRydWUsXG4gICAgICAgICAgICBsb25nU3dpcGVzUmF0aW86IDAuNSxcbiAgICAgICAgICAgIGxvbmdTd2lwZXNNczogMzAwLFxuICAgICAgICAgICAgZm9sbG93RmluZ2VyOiB0cnVlLFxuICAgICAgICAgICAgb25seUV4dGVybmFsOiBmYWxzZSxcbiAgICAgICAgICAgIHRocmVzaG9sZDogMCxcbiAgICAgICAgICAgIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIHRvdWNoUmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gVW5pcXVlIE5hdmlnYXRpb24gRWxlbWVudHNcbiAgICAgICAgICAgIHVuaXF1ZU5hdkVsZW1lbnRzOiB0cnVlLFxuICAgICAgICAgICAgLy8gUGFnaW5hdGlvblxuICAgICAgICAgICAgcGFnaW5hdGlvbjogbnVsbCxcbiAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50OiAnc3BhbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ2xpY2thYmxlOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb25IaWRlOiBmYWxzZSxcbiAgICAgICAgICAgIHBhZ2luYXRpb25CdWxsZXRSZW5kZXI6IG51bGwsXG4gICAgICAgICAgICBwYWdpbmF0aW9uUHJvZ3Jlc3NSZW5kZXI6IG51bGwsXG4gICAgICAgICAgICBwYWdpbmF0aW9uRnJhY3Rpb25SZW5kZXI6IG51bGwsXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ3VzdG9tUmVuZGVyOiBudWxsLFxuICAgICAgICAgICAgcGFnaW5hdGlvblR5cGU6ICdidWxsZXRzJywgLy8gJ2J1bGxldHMnIG9yICdwcm9ncmVzcycgb3IgJ2ZyYWN0aW9uJyBvciAnY3VzdG9tJ1xuICAgICAgICAgICAgLy8gUmVzaXN0YW5jZVxuICAgICAgICAgICAgcmVzaXN0YW5jZTogdHJ1ZSxcbiAgICAgICAgICAgIHJlc2lzdGFuY2VSYXRpbzogMC44NSxcbiAgICAgICAgICAgIC8vIE5leHQvcHJldiBidXR0b25zXG4gICAgICAgICAgICBuZXh0QnV0dG9uOiBudWxsLFxuICAgICAgICAgICAgcHJldkJ1dHRvbjogbnVsbCxcbiAgICAgICAgICAgIC8vIFByb2dyZXNzXG4gICAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogZmFsc2UsXG4gICAgICAgICAgICAvLyBDdXJzb3JcbiAgICAgICAgICAgIGdyYWJDdXJzb3I6IGZhbHNlLFxuICAgICAgICAgICAgLy8gQ2xpY2tzXG4gICAgICAgICAgICBwcmV2ZW50Q2xpY2tzOiB0cnVlLFxuICAgICAgICAgICAgcHJldmVudENsaWNrc1Byb3BhZ2F0aW9uOiB0cnVlLFxuICAgICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBMYXp5IExvYWRpbmdcbiAgICAgICAgICAgIGxhenlMb2FkaW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGxhenlMb2FkaW5nSW5QcmV2TmV4dDogZmFsc2UsXG4gICAgICAgICAgICBsYXp5TG9hZGluZ0luUHJldk5leHRBbW91bnQ6IDEsXG4gICAgICAgICAgICBsYXp5TG9hZGluZ09uVHJhbnNpdGlvblN0YXJ0OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEltYWdlc1xuICAgICAgICAgICAgcHJlbG9hZEltYWdlczogdHJ1ZSxcbiAgICAgICAgICAgIHVwZGF0ZU9uSW1hZ2VzUmVhZHk6IHRydWUsXG4gICAgICAgICAgICAvLyBsb29wXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcbiAgICAgICAgICAgIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiAwLFxuICAgICAgICAgICAgbG9vcGVkU2xpZGVzOiBudWxsLFxuICAgICAgICAgICAgLy8gQ29udHJvbFxuICAgICAgICAgICAgY29udHJvbDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY29udHJvbEludmVyc2U6IGZhbHNlLFxuICAgICAgICAgICAgY29udHJvbEJ5OiAnc2xpZGUnLCAvL29yICdjb250YWluZXInXG4gICAgICAgICAgICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuICAgICAgICAgICAgLy8gU3dpcGluZy9ubyBzd2lwaW5nXG4gICAgICAgICAgICBhbGxvd1N3aXBlVG9QcmV2OiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dTd2lwZVRvTmV4dDogdHJ1ZSxcbiAgICAgICAgICAgIHN3aXBlSGFuZGxlcjogbnVsbCwgLy8nLnN3aXBlLWhhbmRsZXInLFxuICAgICAgICAgICAgbm9Td2lwaW5nOiB0cnVlLFxuICAgICAgICAgICAgbm9Td2lwaW5nQ2xhc3M6ICdzd2lwZXItbm8tc3dpcGluZycsXG4gICAgICAgICAgICAvLyBQYXNzaXZlIExpc3RlbmVyc1xuICAgICAgICAgICAgcGFzc2l2ZUxpc3RlbmVyczogdHJ1ZSxcbiAgICAgICAgICAgIC8vIE5TXG4gICAgICAgICAgICBjb250YWluZXJNb2RpZmllckNsYXNzOiAnc3dpcGVyLWNvbnRhaW5lci0nLCAvLyBORVdcbiAgICAgICAgICAgIHNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUnLFxuICAgICAgICAgICAgc2xpZGVBY3RpdmVDbGFzczogJ3N3aXBlci1zbGlkZS1hY3RpdmUnLFxuICAgICAgICAgICAgc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtYWN0aXZlJyxcbiAgICAgICAgICAgIHNsaWRlVmlzaWJsZUNsYXNzOiAnc3dpcGVyLXNsaWRlLXZpc2libGUnLFxuICAgICAgICAgICAgc2xpZGVEdXBsaWNhdGVDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUnLFxuICAgICAgICAgICAgc2xpZGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtbmV4dCcsXG4gICAgICAgICAgICBzbGlkZUR1cGxpY2F0ZU5leHRDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtbmV4dCcsXG4gICAgICAgICAgICBzbGlkZVByZXZDbGFzczogJ3N3aXBlci1zbGlkZS1wcmV2JyxcbiAgICAgICAgICAgIHNsaWRlRHVwbGljYXRlUHJldkNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1wcmV2JyxcbiAgICAgICAgICAgIHdyYXBwZXJDbGFzczogJ3N3aXBlci13cmFwcGVyJyxcbiAgICAgICAgICAgIGJ1bGxldENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0JyxcbiAgICAgICAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScsXG4gICAgICAgICAgICBidXR0b25EaXNhYmxlZENsYXNzOiAnc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCcsXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ3VycmVudENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVG90YWxDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLXRvdGFsJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25IaWRkZW5DbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWhpZGRlbicsXG4gICAgICAgICAgICBwYWdpbmF0aW9uUHJvZ3Jlc3NiYXJDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLXByb2dyZXNzYmFyJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25DbGlja2FibGVDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWNsaWNrYWJsZScsIC8vIE5FV1xuICAgICAgICAgICAgcGFnaW5hdGlvbk1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi0nLCAvLyBORVdcbiAgICAgICAgICAgIGxhenlMb2FkaW5nQ2xhc3M6ICdzd2lwZXItbGF6eScsXG4gICAgICAgICAgICBsYXp5U3RhdHVzTG9hZGluZ0NsYXNzOiAnc3dpcGVyLWxhenktbG9hZGluZycsXG4gICAgICAgICAgICBsYXp5U3RhdHVzTG9hZGVkQ2xhc3M6ICdzd2lwZXItbGF6eS1sb2FkZWQnLFxuICAgICAgICAgICAgbGF6eVByZWxvYWRlckNsYXNzOiAnc3dpcGVyLWxhenktcHJlbG9hZGVyJyxcbiAgICAgICAgICAgIG5vdGlmaWNhdGlvbkNsYXNzOiAnc3dpcGVyLW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICBwcmVsb2FkZXJDbGFzczogJ3ByZWxvYWRlcicsXG4gICAgICAgICAgICB6b29tQ29udGFpbmVyQ2xhc3M6ICdzd2lwZXItem9vbS1jb250YWluZXInLFxuICAgICAgICBcbiAgICAgICAgICAgIC8vIE9ic2VydmVyXG4gICAgICAgICAgICBvYnNlcnZlcjogZmFsc2UsXG4gICAgICAgICAgICBvYnNlcnZlUGFyZW50czogZmFsc2UsXG4gICAgICAgICAgICAvLyBBY2Nlc3NpYmlsaXR5XG4gICAgICAgICAgICBhMTF5OiBmYWxzZSxcbiAgICAgICAgICAgIHByZXZTbGlkZU1lc3NhZ2U6ICdQcmV2aW91cyBzbGlkZScsXG4gICAgICAgICAgICBuZXh0U2xpZGVNZXNzYWdlOiAnTmV4dCBzbGlkZScsXG4gICAgICAgICAgICBmaXJzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGZpcnN0IHNsaWRlJyxcbiAgICAgICAgICAgIGxhc3RTbGlkZU1lc3NhZ2U6ICdUaGlzIGlzIHRoZSBsYXN0IHNsaWRlJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25CdWxsZXRNZXNzYWdlOiAnR28gdG8gc2xpZGUge3tpbmRleH19JyxcbiAgICAgICAgICAgIC8vIENhbGxiYWNrc1xuICAgICAgICAgICAgcnVuQ2FsbGJhY2tzT25Jbml0OiB0cnVlXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgQ2FsbGJhY2tzOlxuICAgICAgICAgICAgb25Jbml0OiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25EZXN0cm95OiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25DbGljazogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uVGFwOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25Eb3VibGVUYXA6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblNsaWRlck1vdmU6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblNsaWRlQ2hhbmdlU3RhcnQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvblNsaWRlQ2hhbmdlRW5kOiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25UcmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvbkltYWdlc1JlYWR5OiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25Qcm9ncmVzczogZnVuY3Rpb24gKHN3aXBlciwgcHJvZ3Jlc3MpXG4gICAgICAgICAgICBvblRvdWNoU3RhcnQ6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblRvdWNoTW92ZTogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlT3Bwb3NpdGU6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblRvdWNoRW5kOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25SZWFjaEJlZ2lubmluZzogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uUmVhY2hFbmQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvblNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChzd2lwZXIsIGR1cmF0aW9uKVxuICAgICAgICAgICAgb25TZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIChzd2lwZXIsIHRyYW5zbGF0ZSlcbiAgICAgICAgICAgIG9uQXV0b3BsYXlTdGFydDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uQXV0b3BsYXlTdG9wOiBmdW5jdGlvbiAoc3dpcGVyKSxcbiAgICAgICAgICAgIG9uTGF6eUltYWdlTG9hZDogZnVuY3Rpb24gKHN3aXBlciwgc2xpZGUsIGltYWdlKVxuICAgICAgICAgICAgb25MYXp5SW1hZ2VSZWFkeTogZnVuY3Rpb24gKHN3aXBlciwgc2xpZGUsIGltYWdlKVxuICAgICAgICAgICAgKi9cbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHZhciBpbml0aWFsVmlydHVhbFRyYW5zbGF0ZSA9IHBhcmFtcyAmJiBwYXJhbXMudmlydHVhbFRyYW5zbGF0ZTtcbiAgICAgICAgXG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIG9yaWdpbmFsUGFyYW1zID0ge307XG4gICAgICAgIGZvciAodmFyIHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbcGFyYW1dID09PSAnb2JqZWN0JyAmJiBwYXJhbXNbcGFyYW1dICE9PSBudWxsICYmICEocGFyYW1zW3BhcmFtXS5ub2RlVHlwZSB8fCBwYXJhbXNbcGFyYW1dID09PSB3aW5kb3cgfHwgcGFyYW1zW3BhcmFtXSA9PT0gZG9jdW1lbnQgfHwgKHR5cGVvZiBEb203ICE9PSAndW5kZWZpbmVkJyAmJiBwYXJhbXNbcGFyYW1dIGluc3RhbmNlb2YgRG9tNykgfHwgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1twYXJhbV0gaW5zdGFuY2VvZiBqUXVlcnkpKSkge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFyYW1zW3BhcmFtXSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGRlZXBQYXJhbSBpbiBwYXJhbXNbcGFyYW1dKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFyYW1zW3BhcmFtXVtkZWVwUGFyYW1dID0gcGFyYW1zW3BhcmFtXVtkZWVwUGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFyYW1zW3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgZGVmIGluIGRlZmF1bHRzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1tkZWZdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcmFtc1tkZWZdID0gZGVmYXVsdHNbZGVmXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbZGVmXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBkZWVwRGVmIGluIGRlZmF1bHRzW2RlZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbZGVmXVtkZWVwRGVmXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tkZWZdW2RlZXBEZWZdID0gZGVmYXVsdHNbZGVmXVtkZWVwRGVmXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU3dpcGVyXG4gICAgICAgIHZhciBzID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIC8vIFBhcmFtc1xuICAgICAgICBzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgcy5vcmlnaW5hbFBhcmFtcyA9IG9yaWdpbmFsUGFyYW1zO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xhc3NuYW1lXG4gICAgICAgIHMuY2xhc3NOYW1lcyA9IFtdO1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBEb20gTGlicmFyeSBhbmQgcGx1Z2luc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGlmICh0eXBlb2YgJCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIERvbTcgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICQgPSBEb203O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgJCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRG9tNyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAkID0gd2luZG93LkRvbTcgfHwgd2luZG93LlplcHRvIHx8IHdpbmRvdy5qUXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkID0gRG9tNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghJCkgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4cG9ydCBpdCB0byBTd2lwZXIgaW5zdGFuY2VcbiAgICAgICAgcy4kID0gJDtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEJyZWFrcG9pbnRzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5jdXJyZW50QnJlYWtwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcy5nZXRBY3RpdmVCcmVha3BvaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9HZXQgYnJlYWtwb2ludCBmb3Igd2luZG93IHdpZHRoXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmJyZWFrcG9pbnRzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdLCBwb2ludDtcbiAgICAgICAgICAgIGZvciAoIHBvaW50IGluIHMucGFyYW1zLmJyZWFrcG9pbnRzICkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5icmVha3BvaW50cy5oYXNPd25Qcm9wZXJ0eShwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvaW50cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKSA+IHBhcnNlSW50KGIsIDEwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwb2ludCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQgPj0gd2luZG93LmlubmVyV2lkdGggJiYgIWJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBicmVha3BvaW50IHx8ICdtYXgnO1xuICAgICAgICB9O1xuICAgICAgICBzLnNldEJyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL1NldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGggYW5kIHVwZGF0ZSBwYXJhbWV0ZXJzXG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludCA9IHMuZ2V0QWN0aXZlQnJlYWtwb2ludCgpO1xuICAgICAgICAgICAgaWYgKGJyZWFrcG9pbnQgJiYgcy5jdXJyZW50QnJlYWtwb2ludCAhPT0gYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAgIHZhciBicmVha1BvaW50c1BhcmFtcyA9IGJyZWFrcG9pbnQgaW4gcy5wYXJhbXMuYnJlYWtwb2ludHMgPyBzLnBhcmFtcy5icmVha3BvaW50c1ticmVha3BvaW50XSA6IHMub3JpZ2luYWxQYXJhbXM7XG4gICAgICAgICAgICAgICAgdmFyIG5lZWRzUmVMb29wID0gcy5wYXJhbXMubG9vcCAmJiAoYnJlYWtQb2ludHNQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldyk7XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIHBhcmFtIGluIGJyZWFrUG9pbnRzUGFyYW1zICkge1xuICAgICAgICAgICAgICAgICAgICBzLnBhcmFtc1twYXJhbV0gPSBicmVha1BvaW50c1BhcmFtc1twYXJhbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuICAgICAgICAgICAgICAgIGlmKG5lZWRzUmVMb29wICYmIHMuZGVzdHJveUxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5yZUxvb3AodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBTZXQgYnJlYWtwb2ludCBvbiBsb2FkXG4gICAgICAgIGlmIChzLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgcy5zZXRCcmVha3BvaW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFByZXBhcmF0aW9uIC0gRGVmaW5lIENvbnRhaW5lciwgV3JhcHBlciBhbmQgUGFnaW5hdGlvblxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuY29udGFpbmVyID0gJChjb250YWluZXIpO1xuICAgICAgICBpZiAocy5jb250YWluZXIubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGlmIChzLmNvbnRhaW5lci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgc3dpcGVycyA9IFtdO1xuICAgICAgICAgICAgcy5jb250YWluZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgICAgICAgICAgc3dpcGVycy5wdXNoKG5ldyBTd2lwZXIodGhpcywgcGFyYW1zKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXJzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTYXZlIGluc3RhbmNlIGluIGNvbnRhaW5lciBIVE1MIEVsZW1lbnQgYW5kIGluIGRhdGFcbiAgICAgICAgcy5jb250YWluZXJbMF0uc3dpcGVyID0gcztcbiAgICAgICAgcy5jb250YWluZXIuZGF0YSgnc3dpcGVyJywgcyk7XG4gICAgICAgIFxuICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgcy5wYXJhbXMuZGlyZWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArICdmcmVlLW1vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXMuc3VwcG9ydC5mbGV4Ym94KSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ25vLWZsZXhib3gnKTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnYXV0b2hlaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuYWJsZSBzbGlkZXMgcHJvZ3Jlc3Mgd2hlbiByZXF1aXJlZFxuICAgICAgICBpZiAocy5wYXJhbXMucGFyYWxsYXggfHwgcy5wYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7XG4gICAgICAgICAgICBzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNYXggcmVzaXN0YW5jZSB3aGVuIHRvdWNoUmVsZWFzZU9uRWRnZXNcbiAgICAgICAgaWYgKHMucGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLnJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ292ZXJmbG93IC8gM0RcbiAgICAgICAgaWYgKFsnY3ViZScsICdjb3ZlcmZsb3cnLCAnZmxpcCddLmluZGV4T2Yocy5wYXJhbXMuZWZmZWN0KSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAocy5zdXBwb3J0LnRyYW5zZm9ybXMzZCkge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnM2QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zLmVmZmVjdCA9ICdzbGlkZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArIHMucGFyYW1zLmVmZmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCA9PT0gJ2N1YmUnKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5yZXNpc3RhbmNlUmF0aW8gPSAwO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNwYWNlQmV0d2VlbiA9IDA7XG4gICAgICAgICAgICBzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNldFdyYXBwZXJTaXplID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCA9PT0gJ2ZhZGUnIHx8IHMucGFyYW1zLmVmZmVjdCA9PT0gJ2ZsaXAnKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID0gMTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNwYWNlQmV0d2VlbiA9IDA7XG4gICAgICAgICAgICBzLnBhcmFtcy5zZXRXcmFwcGVyU2l6ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBpbml0aWFsVmlydHVhbFRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gR3JhYiBDdXJzb3JcbiAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IgJiYgcy5zdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5ncmFiQ3Vyc29yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIFdyYXBwZXJcbiAgICAgICAgcy53cmFwcGVyID0gcy5jb250YWluZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMud3JhcHBlckNsYXNzKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFBhZ2luYXRpb25cbiAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lciA9ICQocy5wYXJhbXMucGFnaW5hdGlvbik7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHMucGFyYW1zLnBhZ2luYXRpb24gPT09ICdzdHJpbmcnICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAxICYmIHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMucGFnaW5hdGlvbikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyID0gcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5wYWdpbmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdidWxsZXRzJyAmJiBzLnBhcmFtcy5wYWdpbmF0aW9uQ2xpY2thYmxlKSB7XG4gICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmFkZENsYXNzKHMucGFyYW1zLnBhZ2luYXRpb25Nb2RpZmllckNsYXNzICsgJ2NsaWNrYWJsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmFkZENsYXNzKHMucGFyYW1zLnBhZ2luYXRpb25Nb2RpZmllckNsYXNzICsgcy5wYXJhbXMucGFnaW5hdGlvblR5cGUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIE5leHQvUHJldiBCdXR0b25zXG4gICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uIHx8IHMucGFyYW1zLnByZXZCdXR0b24pIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcy5uZXh0QnV0dG9uID0gJChzLnBhcmFtcy5uZXh0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHMucGFyYW1zLm5leHRCdXR0b24gPT09ICdzdHJpbmcnICYmIHMubmV4dEJ1dHRvbi5sZW5ndGggPiAxICYmIHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMubmV4dEJ1dHRvbikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvbiA9IHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMubmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZCdXR0b24pIHtcbiAgICAgICAgICAgICAgICBzLnByZXZCdXR0b24gPSAkKHMucGFyYW1zLnByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2Ygcy5wYXJhbXMucHJldkJ1dHRvbiA9PT0gJ3N0cmluZycgJiYgcy5wcmV2QnV0dG9uLmxlbmd0aCA+IDEgJiYgcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5wcmV2QnV0dG9uKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5wcmV2QnV0dG9uID0gcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5wcmV2QnV0dG9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIElzIEhvcml6b250YWxcbiAgICAgICAgcy5pc0hvcml6b250YWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH07XG4gICAgICAgIC8vIHMuaXNIID0gaXNIO1xuICAgICAgICBcbiAgICAgICAgLy8gUlRMXG4gICAgICAgIHMucnRsID0gcy5pc0hvcml6b250YWwoKSAmJiAocy5jb250YWluZXJbMF0uZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8IHMuY29udGFpbmVyLmNzcygnZGlyZWN0aW9uJykgPT09ICdydGwnKTtcbiAgICAgICAgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ3J0bCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBXcm9uZyBSVEwgc3VwcG9ydFxuICAgICAgICBpZiAocy5ydGwpIHtcbiAgICAgICAgICAgIHMud3JvbmdSVEwgPSBzLndyYXBwZXIuY3NzKCdkaXNwbGF5JykgPT09ICctd2Via2l0LWJveCc7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIENvbHVtbnNcbiAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnbXVsdGlyb3cnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQ2hlY2sgZm9yIEFuZHJvaWRcbiAgICAgICAgaWYgKHMuZGV2aWNlLmFuZHJvaWQpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnYW5kcm9pZCcpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBBZGQgY2xhc3Nlc1xuICAgICAgICBzLmNvbnRhaW5lci5hZGRDbGFzcyhzLmNsYXNzTmFtZXMuam9pbignICcpKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFRyYW5zbGF0ZVxuICAgICAgICBzLnRyYW5zbGF0ZSA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBQcm9ncmVzc1xuICAgICAgICBzLnByb2dyZXNzID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8vIFZlbG9jaXR5XG4gICAgICAgIHMudmVsb2NpdHkgPSAwO1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgTG9ja3MsIHVubG9ja3NcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmxvY2tTd2lwZVRvTmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID09PSBmYWxzZSAmJiBzLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgcy51bnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy5sb2NrU3dpcGVUb1ByZXYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9PT0gZmFsc2UgJiYgcy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgICAgIHMudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMubG9ja1N3aXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZ3JhYkN1cnNvcikgcy51bnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy51bmxvY2tTd2lwZVRvTmV4dCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPT09IHRydWUgJiYgcy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgICAgIHMuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnVubG9ja1N3aXBlVG9QcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9IHRydWU7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9PT0gdHJ1ZSAmJiBzLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgICAgICAgcy5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMudW5sb2NrU3dpcGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9IHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IpIHMuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUm91bmQgaGVscGVyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZnVuY3Rpb24gcm91bmQoYSkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoYSk7XG4gICAgICAgIH1cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2V0IGdyYWIgY3Vyc29yXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5zZXRHcmFiQ3Vyc29yID0gZnVuY3Rpb24obW92aW5nKSB7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLXdlYmtpdC1ncmFiYmluZycgOiAnLXdlYmtpdC1ncmFiJztcbiAgICAgICAgICAgIHMuY29udGFpbmVyWzBdLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/ICctbW96LWdyYWJiaW4nIDogJy1tb3otZ3JhYic7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnZ3JhYmJpbmcnOiAnZ3JhYic7XG4gICAgICAgIH07XG4gICAgICAgIHMudW5zZXRHcmFiQ3Vyc29yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5jb250YWluZXJbMF0uc3R5bGUuY3Vyc29yID0gJyc7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICAgICAgICBzLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfVxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBVcGRhdGUgb24gSW1hZ2VzIFJlYWR5XG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5pbWFnZXNUb0xvYWQgPSBbXTtcbiAgICAgICAgcy5pbWFnZXNMb2FkZWQgPSAwO1xuICAgICAgICBcbiAgICAgICAgcy5sb2FkSW1hZ2UgPSBmdW5jdGlvbiAoaW1nRWxlbWVudCwgc3JjLCBzcmNzZXQsIHNpemVzLCBjaGVja0ZvckNvbXBsZXRlLCBjYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIGltYWdlO1xuICAgICAgICAgICAgZnVuY3Rpb24gb25SZWFkeSAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpbWdFbGVtZW50LmNvbXBsZXRlIHx8ICFjaGVja0ZvckNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZSA9IG5ldyB3aW5kb3cuSW1hZ2UoKTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gb25SZWFkeTtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2Uub25lcnJvciA9IG9uUmVhZHk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc2l6ZXMgPSBzaXplcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZS5zcmNzZXQgPSBzcmNzZXQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2Ugey8vaW1hZ2UgYWxyZWFkeSBsb2FkZWQuLi5cbiAgICAgICAgICAgICAgICBvblJlYWR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMucHJlbG9hZEltYWdlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuaW1hZ2VzVG9Mb2FkID0gcy5jb250YWluZXIuZmluZCgnaW1nJyk7XG4gICAgICAgICAgICBmdW5jdGlvbiBfb25SZWFkeSgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMgPT09ICd1bmRlZmluZWQnIHx8IHMgPT09IG51bGwgfHwgIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAocy5pbWFnZXNMb2FkZWQgIT09IHVuZGVmaW5lZCkgcy5pbWFnZXNMb2FkZWQrKztcbiAgICAgICAgICAgICAgICBpZiAocy5pbWFnZXNMb2FkZWQgPT09IHMuaW1hZ2VzVG9Mb2FkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudXBkYXRlT25JbWFnZXNSZWFkeSkgcy51cGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkltYWdlc1JlYWR5Jywgcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLmltYWdlc1RvTG9hZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMubG9hZEltYWdlKHMuaW1hZ2VzVG9Mb2FkW2ldLCAocy5pbWFnZXNUb0xvYWRbaV0uY3VycmVudFNyYyB8fCBzLmltYWdlc1RvTG9hZFtpXS5nZXRBdHRyaWJ1dGUoJ3NyYycpKSwgKHMuaW1hZ2VzVG9Mb2FkW2ldLnNyY3NldCB8fCBzLmltYWdlc1RvTG9hZFtpXS5nZXRBdHRyaWJ1dGUoJ3NyY3NldCcpKSwgcy5pbWFnZXNUb0xvYWRbaV0uc2l6ZXMgfHwgcy5pbWFnZXNUb0xvYWRbaV0uZ2V0QXR0cmlidXRlKCdzaXplcycpLCB0cnVlLCBfb25SZWFkeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBBdXRvcGxheVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuYXV0b3BsYXlUaW1lb3V0SWQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHMuYXV0b3BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgcy5hdXRvcGxheVBhdXNlZCA9IGZhbHNlO1xuICAgICAgICBmdW5jdGlvbiBhdXRvcGxheSgpIHtcbiAgICAgICAgICAgIHZhciBhdXRvcGxheURlbGF5ID0gcy5wYXJhbXMuYXV0b3BsYXk7XG4gICAgICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIGlmIChhY3RpdmVTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpKSB7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXlEZWxheSA9IGFjdGl2ZVNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JykgfHwgcy5wYXJhbXMuYXV0b3BsYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmF1dG9wbGF5VGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgICAgIHMuX3NsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uQXV0b3BsYXknLCBzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5fc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uQXV0b3BsYXknLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcGFyYW1zLmF1dG9wbGF5U3RvcE9uTGFzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuX3NsaWRlVG8oMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5Jywgcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgYXV0b3BsYXlEZWxheSk7XG4gICAgICAgIH1cbiAgICAgICAgcy5zdGFydEF1dG9wbGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLmF1dG9wbGF5VGltZW91dElkICE9PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5hdXRvcGxheSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgaWYgKHMuYXV0b3BsYXlpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHMuYXV0b3BsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5U3RhcnQnLCBzKTtcbiAgICAgICAgICAgIGF1dG9wbGF5KCk7XG4gICAgICAgIH07XG4gICAgICAgIHMuc3RvcEF1dG9wbGF5ID0gZnVuY3Rpb24gKGludGVybmFsKSB7XG4gICAgICAgICAgICBpZiAoIXMuYXV0b3BsYXlUaW1lb3V0SWQpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzLmF1dG9wbGF5VGltZW91dElkKSBjbGVhclRpbWVvdXQocy5hdXRvcGxheVRpbWVvdXRJZCk7XG4gICAgICAgICAgICBzLmF1dG9wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICBzLmF1dG9wbGF5VGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5U3RvcCcsIHMpO1xuICAgICAgICB9O1xuICAgICAgICBzLnBhdXNlQXV0b3BsYXkgPSBmdW5jdGlvbiAoc3BlZWQpIHtcbiAgICAgICAgICAgIGlmIChzLmF1dG9wbGF5UGF1c2VkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocy5hdXRvcGxheVRpbWVvdXRJZCkgY2xlYXJUaW1lb3V0KHMuYXV0b3BsYXlUaW1lb3V0SWQpO1xuICAgICAgICAgICAgcy5hdXRvcGxheVBhdXNlZCA9IHRydWU7XG4gICAgICAgICAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzLmF1dG9wbGF5UGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYXV0b3BsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHMuYXV0b3BsYXlQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzLmF1dG9wbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBNaW4vTWF4IFRyYW5zbGF0ZVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMubWluVHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICgtcy5zbmFwR3JpZFswXSk7XG4gICAgICAgIH07XG4gICAgICAgIHMubWF4VHJhbnNsYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICgtcy5zbmFwR3JpZFtzLnNuYXBHcmlkLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2xpZGVyL3NsaWRlcyBzaXplc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVTbGlkZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBuZXdIZWlnaHQgPSAwO1xuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRmluZCBzbGlkZXMgY3VycmVudGx5IGluIHZpZXdcbiAgICAgICAgICAgIGlmKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwocy5wYXJhbXMuc2xpZGVzUGVyVmlldyk7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBzLmFjdGl2ZUluZGV4ICsgaTtcbiAgICAgICAgICAgICAgICAgICAgaWYoaW5kZXggPiBzLnNsaWRlcy5sZW5ndGgpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChzLnNsaWRlcy5lcShpbmRleClbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2gocy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleClbMF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgbmV3IGhlaWdodCBmcm9tIGhlaWdoZXN0IHNsaWRlIGluIHZpZXdcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhlaWdodCA9IGFjdGl2ZVNsaWRlc1tpXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIEhlaWdodFxuICAgICAgICAgICAgaWYgKG5ld0hlaWdodCkgcy53cmFwcGVyLmNzcygnaGVpZ2h0JywgbmV3SGVpZ2h0ICsgJ3B4Jyk7XG4gICAgICAgIH07XG4gICAgICAgIHMudXBkYXRlQ29udGFpbmVyU2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCwgaGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnBhcmFtcy53aWR0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHMucGFyYW1zLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBzLmNvbnRhaW5lclswXS5jbGllbnRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5wYXJhbXMuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHMucGFyYW1zLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGhlaWdodCA9IHMuY29udGFpbmVyWzBdLmNsaWVudEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh3aWR0aCA9PT0gMCAmJiBzLmlzSG9yaXpvbnRhbCgpIHx8IGhlaWdodCA9PT0gMCAmJiAhcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvL1N1YnRyYWN0IHBhZGRpbmdzXG4gICAgICAgICAgICB3aWR0aCA9IHdpZHRoIC0gcGFyc2VJbnQocy5jb250YWluZXIuY3NzKCdwYWRkaW5nLWxlZnQnKSwgMTApIC0gcGFyc2VJbnQocy5jb250YWluZXIuY3NzKCdwYWRkaW5nLXJpZ2h0JyksIDEwKTtcbiAgICAgICAgICAgIGhlaWdodCA9IGhlaWdodCAtIHBhcnNlSW50KHMuY29udGFpbmVyLmNzcygncGFkZGluZy10b3AnKSwgMTApIC0gcGFyc2VJbnQocy5jb250YWluZXIuY3NzKCdwYWRkaW5nLWJvdHRvbScpLCAxMCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gU3RvcmUgdmFsdWVzXG4gICAgICAgICAgICBzLndpZHRoID0gd2lkdGg7XG4gICAgICAgICAgICBzLmhlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHMuc2l6ZSA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLndpZHRoIDogcy5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLnVwZGF0ZVNsaWRlc1NpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnNsaWRlcyA9IHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKTtcbiAgICAgICAgICAgIHMuc25hcEdyaWQgPSBbXTtcbiAgICAgICAgICAgIHMuc2xpZGVzR3JpZCA9IFtdO1xuICAgICAgICAgICAgcy5zbGlkZXNTaXplc0dyaWQgPSBbXTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3BhY2VCZXR3ZWVuID0gcy5wYXJhbXMuc3BhY2VCZXR3ZWVuLFxuICAgICAgICAgICAgICAgIHNsaWRlUG9zaXRpb24gPSAtcy5wYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlLFxuICAgICAgICAgICAgICAgIGksXG4gICAgICAgICAgICAgICAgcHJldlNsaWRlU2l6ZSA9IDAsXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnNpemUgPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZSgnJScsICcnKSkgLyAxMDAgKiBzLnNpemU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcy52aXJ0dWFsU2l6ZSA9IC1zcGFjZUJldHdlZW47XG4gICAgICAgICAgICAvLyByZXNldCBtYXJnaW5zXG4gICAgICAgICAgICBpZiAocy5ydGwpIHMuc2xpZGVzLmNzcyh7bWFyZ2luTGVmdDogJycsIG1hcmdpblRvcDogJyd9KTtcbiAgICAgICAgICAgIGVsc2Ugcy5zbGlkZXMuY3NzKHttYXJnaW5SaWdodDogJycsIG1hcmdpbkJvdHRvbTogJyd9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguZmxvb3Iocy5zbGlkZXMubGVuZ3RoIC8gcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSA9PT0gcy5zbGlkZXMubGVuZ3RoIC8gcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBzLnNsaWRlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gTWF0aC5jZWlsKHMuc2xpZGVzLmxlbmd0aCAvIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbikgKiBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uRmlsbCA9PT0gJ3JvdycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGgubWF4KHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MsIHMucGFyYW1zLnNsaWRlc1BlclZpZXcgKiBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBDYWxjIHNsaWRlc1xuICAgICAgICAgICAgdmFyIHNsaWRlU2l6ZTtcbiAgICAgICAgICAgIHZhciBzbGlkZXNQZXJDb2x1bW4gPSBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICB2YXIgc2xpZGVzUGVyUm93ID0gc2xpZGVzTnVtYmVyRXZlblRvUm93cyAvIHNsaWRlc1BlckNvbHVtbjtcbiAgICAgICAgICAgIHZhciBudW1GdWxsQ29sdW1ucyA9IHNsaWRlc1BlclJvdyAtIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gKiBzbGlkZXNQZXJSb3cgLSBzLnNsaWRlcy5sZW5ndGgpO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgc2xpZGVTaXplID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgc2xpZGVzIG9yZGVyXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdTbGlkZU9yZGVySW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW4sIHJvdztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBNYXRoLmZsb29yKGkgLyBzbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gaSAtIGNvbHVtbiAqIHNsaWRlc1BlckNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2x1bW4gPiBudW1GdWxsQ29sdW1ucyB8fCAoY29sdW1uID09PSBudW1GdWxsQ29sdW1ucyAmJiByb3cgPT09IHNsaWRlc1BlckNvbHVtbi0xKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgrK3JvdyA+PSBzbGlkZXNQZXJDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2xpZGVPcmRlckluZGV4ID0gY29sdW1uICsgcm93ICogc2xpZGVzTnVtYmVyRXZlblRvUm93cyAvIHNsaWRlc1BlckNvbHVtbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLW1vei1ib3gtb3JkaW5hbC1ncm91cCc6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1tcy1mbGV4LW9yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ29yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKGkgLyBzbGlkZXNQZXJSb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gaSAtIHJvdyAqIHNsaWRlc1BlclJvdztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNzcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbWFyZ2luLScgKyAocy5pc0hvcml6b250YWwoKSA/ICd0b3AnIDogJ2xlZnQnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocm93ICE9PSAwICYmIHMucGFyYW1zLnNwYWNlQmV0d2VlbikgJiYgKHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCcpXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAuYXR0cignZGF0YS1zd2lwZXItY29sdW1uJywgY29sdW1uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc3dpcGVyLXJvdycsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2xpZGUuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZVNpemUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUub3V0ZXJXaWR0aCh0cnVlKSA6IHNsaWRlLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSByb3VuZChzbGlkZVNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVTaXplID0gKHMuc2l6ZSAtIChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3IC0gMSkgKiBzcGFjZUJldHdlZW4pIC8gcy5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gcm91bmQoc2xpZGVTaXplKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1tpXS5zdHlsZS53aWR0aCA9IHNsaWRlU2l6ZSArICdweCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1tpXS5zdHlsZS5oZWlnaHQgPSBzbGlkZVNpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICAgICAgICAgICAgICBzLnNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgLyAyICsgcHJldlNsaWRlU2l6ZSAvIDIgKyBzcGFjZUJldHdlZW47XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIHMuc2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzbGlkZVBvc2l0aW9uKSA8IDEgLyAxMDAwKSBzbGlkZVBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbmRleCkgJSBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgcy5zbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgoaW5kZXgpICUgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHMuc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcy52aXJ0dWFsU2l6ZSArPSBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHByZXZTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGluZGV4ICsrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy52aXJ0dWFsU2l6ZSA9IE1hdGgubWF4KHMudmlydHVhbFNpemUsIHMuc2l6ZSkgKyBzLnBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlcjtcbiAgICAgICAgICAgIHZhciBuZXdTbGlkZXNHcmlkO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBzLnJ0bCAmJiBzLndyb25nUlRMICYmIChzLnBhcmFtcy5lZmZlY3QgPT09ICdzbGlkZScgfHwgcy5wYXJhbXMuZWZmZWN0ID09PSAnY292ZXJmbG93JykpIHtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIuY3NzKHt3aWR0aDogcy52aXJ0dWFsU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5zdXBwb3J0LmZsZXhib3ggfHwgcy5wYXJhbXMuc2V0V3JhcHBlclNpemUpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkgcy53cmFwcGVyLmNzcyh7d2lkdGg6IHMudmlydHVhbFNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICAgICAgZWxzZSBzLndyYXBwZXIuY3NzKHtoZWlnaHQ6IHMudmlydHVhbFNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgICAgICAgICAgICBzLnZpcnR1YWxTaXplID0gKHNsaWRlU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2VlbikgKiBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzO1xuICAgICAgICAgICAgICAgIHMudmlydHVhbFNpemUgPSBNYXRoLmNlaWwocy52aXJ0dWFsU2l6ZSAvIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbikgLSBzLnBhcmFtcy5zcGFjZUJldHdlZW47XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHMud3JhcHBlci5jc3Moe3dpZHRoOiBzLnZpcnR1YWxTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgIGVsc2Ugcy53cmFwcGVyLmNzcyh7aGVpZ2h0OiBzLnZpcnR1YWxTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgICAgICAgICAgICBuZXdTbGlkZXNHcmlkID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzLnNuYXBHcmlkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5zbmFwR3JpZFtpXSA8IHMudmlydHVhbFNpemUgKyBzLnNuYXBHcmlkWzBdKSBuZXdTbGlkZXNHcmlkLnB1c2gocy5zbmFwR3JpZFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy5zbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFJlbW92ZSBsYXN0IGdyaWQgZWxlbWVudHMgZGVwZW5kaW5nIG9uIHdpZHRoXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzLnNuYXBHcmlkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNuYXBHcmlkW2ldIDw9IHMudmlydHVhbFNpemUgLSBzLnNpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NsaWRlc0dyaWQucHVzaChzLnNuYXBHcmlkW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLnNuYXBHcmlkID0gbmV3U2xpZGVzR3JpZDtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5mbG9vcihzLnZpcnR1YWxTaXplIC0gcy5zaXplKSAtIE1hdGguZmxvb3Iocy5zbmFwR3JpZFtzLnNuYXBHcmlkLmxlbmd0aCAtIDFdKSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbmFwR3JpZC5wdXNoKHMudmlydHVhbFNpemUgLSBzLnNpemUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnNuYXBHcmlkLmxlbmd0aCA9PT0gMCkgcy5zbmFwR3JpZCA9IFswXTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc3BhY2VCZXR3ZWVuICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSBzLnNsaWRlcy5jc3Moe21hcmdpbkxlZnQ6IHNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzLnNsaWRlcy5jc3Moe21hcmdpblJpZ2h0OiBzcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Ugcy5zbGlkZXMuY3NzKHttYXJnaW5Cb3R0b206IHNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy51cGRhdGVTbGlkZXNPZmZzZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZXNbaV0uc3dpcGVyU2xpZGVPZmZzZXQgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy5zbGlkZXNbaV0ub2Zmc2V0TGVmdCA6IHMuc2xpZGVzW2ldLm9mZnNldFRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIER5bmFtaWMgU2xpZGVzIFBlciBWaWV3XG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5jdXJyZW50U2xpZGVzUGVyVmlldyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzcHYgPSAxLCBpLCBqO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNpemUgPSBzLnNsaWRlc1tzLmFjdGl2ZUluZGV4XS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICAgICAgdmFyIGJyZWFrTG9vcDtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSBzLmFjdGl2ZUluZGV4ICsgMTsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplICs9IHMuc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwdiArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplID4gcy5zaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAoaiA9IHMuYWN0aXZlSW5kZXggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbal0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZSArPSBzLnNsaWRlc1tqXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcHYgKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZSA+IHMuc2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IHMuYWN0aXZlSW5kZXggKyAxOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzR3JpZFtpXSAtIHMuc2xpZGVzR3JpZFtzLmFjdGl2ZUluZGV4XSA8IHMuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3B2Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3B2O1xuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBTbGlkZXIvc2xpZGVzIHByb2dyZXNzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy51cGRhdGVTbGlkZXNQcm9ncmVzcyA9IGZ1bmN0aW9uICh0cmFuc2xhdGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHJhbnNsYXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSA9IHMudHJhbnNsYXRlIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5zbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICBpZiAodHlwZW9mIHMuc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0ID09PSAndW5kZWZpbmVkJykgcy51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgb2Zmc2V0Q2VudGVyID0gLXRyYW5zbGF0ZTtcbiAgICAgICAgICAgIGlmIChzLnJ0bCkgb2Zmc2V0Q2VudGVyID0gdHJhbnNsYXRlO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFZpc2libGUgU2xpZGVzXG4gICAgICAgICAgICBzLnNsaWRlcy5yZW1vdmVDbGFzcyhzLnBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlUHJvZ3Jlc3MgPSAob2Zmc2V0Q2VudGVyICsgKHMucGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gcy5taW5UcmFuc2xhdGUoKSA6IDApIC0gc2xpZGUuc3dpcGVyU2xpZGVPZmZzZXQpIC8gKHNsaWRlLnN3aXBlclNsaWRlU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2Vlbik7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVCZWZvcmUgPSAtKG9mZnNldENlbnRlciAtIHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlQWZ0ZXIgPSBzbGlkZUJlZm9yZSArIHMuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaXNWaXNpYmxlID1cbiAgICAgICAgICAgICAgICAgICAgICAgIChzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDwgcy5zaXplKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHNsaWRlQWZ0ZXIgPiAwICYmIHNsaWRlQWZ0ZXIgPD0gcy5zaXplKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHNsaWRlQmVmb3JlIDw9IDAgJiYgc2xpZGVBZnRlciA+PSBzLnNpemUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy5lcShpKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2xpZGUucHJvZ3Jlc3MgPSBzLnJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy51cGRhdGVQcm9ncmVzcyA9IGZ1bmN0aW9uICh0cmFuc2xhdGUpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdHJhbnNsYXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHRyYW5zbGF0ZSA9IHMudHJhbnNsYXRlIHx8IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlc0RpZmYgPSBzLm1heFRyYW5zbGF0ZSgpIC0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIHZhciB3YXNCZWdpbm5pbmcgPSBzLmlzQmVnaW5uaW5nO1xuICAgICAgICAgICAgdmFyIHdhc0VuZCA9IHMuaXNFbmQ7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgICAgICAgICAgICBzLnByb2dyZXNzID0gMDtcbiAgICAgICAgICAgICAgICBzLmlzQmVnaW5uaW5nID0gcy5pc0VuZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLnByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHMubWluVHJhbnNsYXRlKCkpIC8gKHRyYW5zbGF0ZXNEaWZmKTtcbiAgICAgICAgICAgICAgICBzLmlzQmVnaW5uaW5nID0gcy5wcm9ncmVzcyA8PSAwO1xuICAgICAgICAgICAgICAgIHMuaXNFbmQgPSBzLnByb2dyZXNzID49IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5pc0JlZ2lubmluZyAmJiAhd2FzQmVnaW5uaW5nKSBzLmVtaXQoJ29uUmVhY2hCZWdpbm5pbmcnLCBzKTtcbiAgICAgICAgICAgIGlmIChzLmlzRW5kICYmICF3YXNFbmQpIHMuZW1pdCgnb25SZWFjaEVuZCcsIHMpO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSBzLnVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZSk7XG4gICAgICAgICAgICBzLmVtaXQoJ29uUHJvZ3Jlc3MnLCBzLCBzLnByb2dyZXNzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy51cGRhdGVBY3RpdmVJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSBzLnJ0bCA/IHMudHJhbnNsYXRlIDogLXMudHJhbnNsYXRlO1xuICAgICAgICAgICAgdmFyIG5ld0FjdGl2ZUluZGV4LCBpLCBzbmFwSW5kZXg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5zbGlkZXNHcmlkLmxlbmd0aDsgaSArKykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5zbGlkZXNHcmlkW2kgKyAxXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZSA+PSBzLnNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlIDwgcy5zbGlkZXNHcmlkW2kgKyAxXSAtIChzLnNsaWRlc0dyaWRbaSArIDFdIC0gcy5zbGlkZXNHcmlkW2ldKSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0cmFuc2xhdGUgPj0gcy5zbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHMuc2xpZGVzR3JpZFtpICsgMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gaSArIDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGUgPj0gcy5zbGlkZXNHcmlkW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuICAgICAgICAgICAgaWYocy5wYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCl7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0FjdGl2ZUluZGV4IDwgMCB8fCB0eXBlb2YgbmV3QWN0aXZlSW5kZXggPT09ICd1bmRlZmluZWQnKSBuZXdBY3RpdmVJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBmb3IgKGkgPSAwOyBpIDwgcy5zbGlkZXNHcmlkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgKC0gdHJhbnNsYXRlID49IHMuc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBuZXdBY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgc25hcEluZGV4ID0gTWF0aC5mbG9vcihuZXdBY3RpdmVJbmRleCAvIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgICAgIGlmIChzbmFwSW5kZXggPj0gcy5zbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHMuc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAobmV3QWN0aXZlSW5kZXggPT09IHMuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLnNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgICAgICAgIHMucHJldmlvdXNJbmRleCA9IHMuYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICBzLmFjdGl2ZUluZGV4ID0gbmV3QWN0aXZlSW5kZXg7XG4gICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgIHMudXBkYXRlUmVhbEluZGV4KCk7XG4gICAgICAgIH07XG4gICAgICAgIHMudXBkYXRlUmVhbEluZGV4ID0gZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHMucmVhbEluZGV4ID0gcGFyc2VJbnQocy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSB8fCBzLmFjdGl2ZUluZGV4LCAxMCk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBDbGFzc2VzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy51cGRhdGVDbGFzc2VzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5zbGlkZXMucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyArICcgJyArIHMucGFyYW1zLnNsaWRlTmV4dENsYXNzICsgJyAnICsgcy5wYXJhbXMuc2xpZGVQcmV2Q2xhc3MgKyAnICcgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzICsgJyAnICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MgKyAnICcgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgICAgICAgICB2YXIgYWN0aXZlU2xpZGUgPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIC8vIEFjdGl2ZSBjbGFzc2VzXG4gICAgICAgICAgICBhY3RpdmVTbGlkZS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgICAgICAgICAgICAgIGlmIChhY3RpdmVTbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICc6bm90KC4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICcpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHMucmVhbEluZGV4ICsgJ1wiXScpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBzLnJlYWxJbmRleCArICdcIl0nKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOZXh0IFNsaWRlXG4gICAgICAgICAgICB2YXIgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dCgnLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCAmJiBuZXh0U2xpZGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gcy5zbGlkZXMuZXEoMCk7XG4gICAgICAgICAgICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFByZXYgU2xpZGVcbiAgICAgICAgICAgIHZhciBwcmV2U2xpZGUgPSBhY3RpdmVTbGlkZS5wcmV2KCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wICYmIHByZXZTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGUgPSBzLnNsaWRlcy5lcSgtMSk7XG4gICAgICAgICAgICAgICAgcHJldlNsaWRlLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgICAgICAgICAgICAgIGlmIChuZXh0U2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnOm5vdCguJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBuZXh0U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSArICdcIl0nKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICcuJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIG5leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICsgJ1wiXScpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHByZXZTbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICc6bm90KC4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICcpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHByZXZTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICsgJ1wiXScpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcHJldlNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKyAnXCJdJykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBQYWdpbmF0aW9uXG4gICAgICAgICAgICBpZiAocy5wYWdpbmF0aW9uQ29udGFpbmVyICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gQ3VycmVudC9Ub3RhbFxuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50LFxuICAgICAgICAgICAgICAgICAgICB0b3RhbCA9IHMucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoKHMuc2xpZGVzLmxlbmd0aCAtIHMubG9vcGVkU2xpZGVzICogMikgLyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gTWF0aC5jZWlsKChzLmFjdGl2ZUluZGV4IC0gcy5sb29wZWRTbGlkZXMpL3MucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiBzLnNsaWRlcy5sZW5ndGggLSAxIC0gcy5sb29wZWRTbGlkZXMgKiAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gY3VycmVudCAtIChzLnNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcyAqIDIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50ID4gdG90YWwgLSAxKSBjdXJyZW50ID0gY3VycmVudCAtIHRvdGFsO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA8IDAgJiYgcy5wYXJhbXMucGFnaW5hdGlvblR5cGUgIT09ICdidWxsZXRzJykgY3VycmVudCA9IHRvdGFsICsgY3VycmVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5zbmFwSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gcy5zbmFwSW5kZXg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50ID0gcy5hY3RpdmVJbmRleCB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFR5cGVzXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAnYnVsbGV0cycgJiYgcy5idWxsZXRzICYmIHMuYnVsbGV0cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuYnVsbGV0cy5yZW1vdmVDbGFzcyhzLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhZ2luYXRpb25Db250YWluZXIubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5idWxsZXRzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHRoaXMpLmluZGV4KCkgPT09IGN1cnJlbnQpICQodGhpcykuYWRkQ2xhc3Mocy5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmJ1bGxldHMuZXEoY3VycmVudCkuYWRkQ2xhc3Mocy5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuZmluZCgnLicgKyBzLnBhcmFtcy5wYWdpbmF0aW9uQ3VycmVudENsYXNzKS50ZXh0KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmZpbmQoJy4nICsgcy5wYXJhbXMucGFnaW5hdGlvblRvdGFsQ2xhc3MpLnRleHQodG90YWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdwcm9ncmVzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjYWxlID0gKGN1cnJlbnQgKyAxKSAvIHRvdGFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVYID0gc2NhbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZVkgPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlWSA9IHNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVYID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuZmluZCgnLicgKyBzLnBhcmFtcy5wYWdpbmF0aW9uUHJvZ3Jlc3NiYXJDbGFzcykudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGVYKCcgKyBzY2FsZVggKyAnKSBzY2FsZVkoJyArIHNjYWxlWSArICcpJykudHJhbnNpdGlvbihzLnBhcmFtcy5zcGVlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ2N1c3RvbScgJiYgcy5wYXJhbXMucGFnaW5hdGlvbkN1c3RvbVJlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuaHRtbChzLnBhcmFtcy5wYWdpbmF0aW9uQ3VzdG9tUmVuZGVyKHMsIGN1cnJlbnQgKyAxLCB0b3RhbCkpO1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uUGFnaW5hdGlvblJlbmRlcmVkJywgcywgcy5wYWdpbmF0aW9uQ29udGFpbmVyWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTmV4dC9hY3RpdmUgYnV0dG9uc1xuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uICYmIHMucHJldkJ1dHRvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnByZXZCdXR0b24uYWRkQ2xhc3Mocy5wYXJhbXMuYnV0dG9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMuYTExeS5kaXNhYmxlKHMucHJldkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnByZXZCdXR0b24ucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuYnV0dG9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMuYTExeS5lbmFibGUocy5wcmV2QnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24gJiYgcy5uZXh0QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvbi5hZGRDbGFzcyhzLnBhcmFtcy5idXR0b25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5hMTF5LmRpc2FibGUocy5uZXh0QnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvbi5yZW1vdmVDbGFzcyhzLnBhcmFtcy5idXR0b25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5hMTF5LmVuYWJsZShzLm5leHRCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUGFnaW5hdGlvblxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMudXBkYXRlUGFnaW5hdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMucGFnaW5hdGlvbikgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHMucGFnaW5hdGlvbkNvbnRhaW5lciAmJiBzLnBhZ2luYXRpb25Db250YWluZXIubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHZhciBwYWdpbmF0aW9uSFRNTCA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ2J1bGxldHMnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBudW1iZXJPZkJ1bGxldHMgPSBzLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzLnNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcyAqIDIpIC8gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogcy5zbmFwR3JpZC5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtYmVyT2ZCdWxsZXRzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uQnVsbGV0UmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gcy5wYXJhbXMucGFnaW5hdGlvbkJ1bGxldFJlbmRlcihzLCBpLCBzLnBhcmFtcy5idWxsZXRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSAnPCcgKyBzLnBhcmFtcy5wYWdpbmF0aW9uRWxlbWVudCsnIGNsYXNzPVwiJyArIHMucGFyYW1zLmJ1bGxldENsYXNzICsgJ1wiPjwvJyArIHMucGFyYW1zLnBhZ2luYXRpb25FbGVtZW50ICsgJz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5odG1sKHBhZ2luYXRpb25IVE1MKTtcbiAgICAgICAgICAgICAgICAgICAgcy5idWxsZXRzID0gcy5wYWdpbmF0aW9uQ29udGFpbmVyLmZpbmQoJy4nICsgcy5wYXJhbXMuYnVsbGV0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSAmJiBzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmluaXRQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAnZnJhY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uRnJhY3Rpb25SZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcy5wYXJhbXMucGFnaW5hdGlvbkZyYWN0aW9uUmVuZGVyKHMsIHMucGFyYW1zLnBhZ2luYXRpb25DdXJyZW50Q2xhc3MsIHMucGFyYW1zLnBhZ2luYXRpb25Ub3RhbENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPHNwYW4gY2xhc3M9XCInICsgcy5wYXJhbXMucGFnaW5hdGlvbkN1cnJlbnRDbGFzcyArICdcIj48L3NwYW4+JyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyAvICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIicgKyBzLnBhcmFtcy5wYWdpbmF0aW9uVG90YWxDbGFzcysnXCI+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdwcm9ncmVzcycpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25Qcm9ncmVzc1JlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBzLnBhcmFtcy5wYWdpbmF0aW9uUHJvZ3Jlc3NSZW5kZXIocywgcy5wYXJhbXMucGFnaW5hdGlvblByb2dyZXNzYmFyQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSAnPHNwYW4gY2xhc3M9XCInICsgcy5wYXJhbXMucGFnaW5hdGlvblByb2dyZXNzYmFyQ2xhc3MgKyAnXCI+PC9zcGFuPic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgIT09ICdjdXN0b20nKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25QYWdpbmF0aW9uUmVuZGVyZWQnLCBzLCBzLnBhZ2luYXRpb25Db250YWluZXJbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQ29tbW9uIHVwZGF0ZSBtZXRob2RcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLnVwZGF0ZSA9IGZ1bmN0aW9uICh1cGRhdGVUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgcy51cGRhdGVDb250YWluZXJTaXplKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVNsaWRlc1NpemUoKTtcbiAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgICAgIHMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBmb3JjZVNldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gcy5ydGwgPyAtcy50cmFuc2xhdGUgOiBzLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heChzLnRyYW5zbGF0ZSwgcy5tYXhUcmFuc2xhdGUoKSksIHMubWluVHJhbnNsYXRlKCkpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cGRhdGVUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlZCwgbmV3VHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgIGlmIChzLmNvbnRyb2xsZXIgJiYgcy5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yY2VTZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgcy5pc0VuZCAmJiAhcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzLnNsaWRlVG8ocy5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlZCA9IHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmFuc2xhdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JjZVNldFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUmVzaXplIEhhbmRsZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLm9uUmVzaXplID0gZnVuY3Rpb24gKGZvcmNlVXBkYXRlUGFnaW5hdGlvbikge1xuICAgICAgICAgICAgLy9CcmVha3BvaW50c1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICAgICAgICAgICAgcy5zZXRCcmVha3BvaW50KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRGlzYWJsZSBsb2NrcyBvbiByZXNpemVcbiAgICAgICAgICAgIHZhciBhbGxvd1N3aXBlVG9QcmV2ID0gcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldjtcbiAgICAgICAgICAgIHZhciBhbGxvd1N3aXBlVG9OZXh0ID0gcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dDtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPSBzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgICAgICBzLnVwZGF0ZUNvbnRhaW5lclNpemUoKTtcbiAgICAgICAgICAgIHMudXBkYXRlU2xpZGVzU2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzLnBhcmFtcy5mcmVlTW9kZSB8fCBmb3JjZVVwZGF0ZVBhZ2luYXRpb24pIHMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLnNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuY29udHJvbGxlciAmJiBzLmNvbnRyb2xsZXIuc3BsaW5lKSB7XG4gICAgICAgICAgICAgICAgcy5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzbGlkZUNoYW5nZWRCeVNsaWRlVG8gPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heChzLnRyYW5zbGF0ZSwgcy5tYXhUcmFuc2xhdGUoKSksIHMubWluVHJhbnNsYXRlKCkpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgICAgICAgICAgaWYgKChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHMuaXNFbmQgJiYgIXMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlZEJ5U2xpZGVUbyA9IHMuc2xpZGVUbyhzLnNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZUNoYW5nZWRCeVNsaWRlVG8gPSBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZyAmJiAhc2xpZGVDaGFuZ2VkQnlTbGlkZVRvICYmIHMubGF6eSkge1xuICAgICAgICAgICAgICAgIHMubGF6eS5sb2FkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBSZXR1cm4gbG9ja3MgYWZ0ZXIgcmVzaXplXG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gYWxsb3dTd2lwZVRvUHJldjtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSBhbGxvd1N3aXBlVG9OZXh0O1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgRXZlbnRzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgXG4gICAgICAgIC8vRGVmaW5lIFRvdWNoIEV2ZW50c1xuICAgICAgICBzLnRvdWNoRXZlbnRzRGVza3RvcCA9IHtzdGFydDogJ21vdXNlZG93bicsIG1vdmU6ICdtb3VzZW1vdmUnLCBlbmQ6ICdtb3VzZXVwJ307XG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkKSBzLnRvdWNoRXZlbnRzRGVza3RvcCA9IHtzdGFydDogJ3BvaW50ZXJkb3duJywgbW92ZTogJ3BvaW50ZXJtb3ZlJywgZW5kOiAncG9pbnRlcnVwJ307XG4gICAgICAgIGVsc2UgaWYgKHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCkgcy50b3VjaEV2ZW50c0Rlc2t0b3AgPSB7c3RhcnQ6ICdNU1BvaW50ZXJEb3duJywgbW92ZTogJ01TUG9pbnRlck1vdmUnLCBlbmQ6ICdNU1BvaW50ZXJVcCd9O1xuICAgICAgICBzLnRvdWNoRXZlbnRzID0ge1xuICAgICAgICAgICAgc3RhcnQgOiBzLnN1cHBvcnQudG91Y2ggfHwgIXMucGFyYW1zLnNpbXVsYXRlVG91Y2ggID8gJ3RvdWNoc3RhcnQnIDogcy50b3VjaEV2ZW50c0Rlc2t0b3Auc3RhcnQsXG4gICAgICAgICAgICBtb3ZlIDogcy5zdXBwb3J0LnRvdWNoIHx8ICFzLnBhcmFtcy5zaW11bGF0ZVRvdWNoID8gJ3RvdWNobW92ZScgOiBzLnRvdWNoRXZlbnRzRGVza3RvcC5tb3ZlLFxuICAgICAgICAgICAgZW5kIDogcy5zdXBwb3J0LnRvdWNoIHx8ICFzLnBhcmFtcy5zaW11bGF0ZVRvdWNoID8gJ3RvdWNoZW5kJyA6IHMudG91Y2hFdmVudHNEZXNrdG9wLmVuZFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgIC8vIFdQOCBUb3VjaCBFdmVudHMgRml4XG4gICAgICAgIGlmICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkIHx8IHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCkge1xuICAgICAgICAgICAgKHMucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/IHMuY29udGFpbmVyIDogcy53cmFwcGVyKS5hZGRDbGFzcygnc3dpcGVyLXdwOC0nICsgcy5wYXJhbXMuZGlyZWN0aW9uKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQXR0YWNoL2RldGFjaCBldmVudHNcbiAgICAgICAgcy5pbml0RXZlbnRzID0gZnVuY3Rpb24gKGRldGFjaCkge1xuICAgICAgICAgICAgdmFyIGFjdGlvbkRvbSA9IGRldGFjaCA/ICdvZmYnIDogJ29uJztcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSBkZXRhY2ggPyAncmVtb3ZlRXZlbnRMaXN0ZW5lcicgOiAnYWRkRXZlbnRMaXN0ZW5lcic7XG4gICAgICAgICAgICB2YXIgdG91Y2hFdmVudHNUYXJnZXQgPSBzLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBzLmNvbnRhaW5lclswXSA6IHMud3JhcHBlclswXTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzLnN1cHBvcnQudG91Y2ggPyB0b3VjaEV2ZW50c1RhcmdldCA6IGRvY3VtZW50O1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBtb3ZlQ2FwdHVyZSA9IHMucGFyYW1zLm5lc3RlZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgICAgICAvL1RvdWNoIEV2ZW50c1xuICAgICAgICAgICAgaWYgKHMuYnJvd3Nlci5pZSkge1xuICAgICAgICAgICAgICAgIHRvdWNoRXZlbnRzVGFyZ2V0W2FjdGlvbl0ocy50b3VjaEV2ZW50cy5zdGFydCwgcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLm1vdmUsIHMub25Ub3VjaE1vdmUsIG1vdmVDYXB0dXJlKTtcbiAgICAgICAgICAgICAgICB0YXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLmVuZCwgcy5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAocy5zdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBzLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgcy5zdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBzLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge3Bhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlfSA6IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMuc3RhcnQsIHMub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMubW92ZSwgcy5vblRvdWNoTW92ZSwgbW92ZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMuZW5kLCBzLm9uVG91Y2hFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgocGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgIXMuZGV2aWNlLmlvcyAmJiAhcy5kZXZpY2UuYW5kcm9pZCkgfHwgKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFzLnN1cHBvcnQudG91Y2ggJiYgcy5kZXZpY2UuaW9zKSkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKCdtb3VzZWRvd24nLCBzLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFthY3Rpb25dKCdtb3VzZW1vdmUnLCBzLm9uVG91Y2hNb3ZlLCBtb3ZlQ2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50W2FjdGlvbl0oJ21vdXNldXAnLCBzLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3aW5kb3dbYWN0aW9uXSgncmVzaXplJywgcy5vblJlc2l6ZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTmV4dCwgUHJldiwgSW5kZXhcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uICYmIHMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvblthY3Rpb25Eb21dKCdjbGljaycsIHMub25DbGlja05leHQpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5uZXh0QnV0dG9uW2FjdGlvbkRvbV0oJ2tleWRvd24nLCBzLmExMXkub25FbnRlcktleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldkJ1dHRvbiAmJiBzLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzLnByZXZCdXR0b25bYWN0aW9uRG9tXSgnY2xpY2snLCBzLm9uQ2xpY2tQcmV2KTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMucHJldkJ1dHRvblthY3Rpb25Eb21dKCdrZXlkb3duJywgcy5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb24gJiYgcy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSkge1xuICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lclthY3Rpb25Eb21dKCdjbGljaycsICcuJyArIHMucGFyYW1zLmJ1bGxldENsYXNzLCBzLm9uQ2xpY2tJbmRleCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLnBhZ2luYXRpb25Db250YWluZXJbYWN0aW9uRG9tXSgna2V5ZG93bicsICcuJyArIHMucGFyYW1zLmJ1bGxldENsYXNzLCBzLmExMXkub25FbnRlcktleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gUHJldmVudCBMaW5rcyBDbGlja3NcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHMucGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikgdG91Y2hFdmVudHNUYXJnZXRbYWN0aW9uXSgnY2xpY2snLCBzLnByZXZlbnRDbGlja3MsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBzLmF0dGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuaW5pdEV2ZW50cygpO1xuICAgICAgICB9O1xuICAgICAgICBzLmRldGFjaEV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuaW5pdEV2ZW50cyh0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEhhbmRsZSBDbGlja3NcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICAvLyBQcmV2ZW50IENsaWNrc1xuICAgICAgICBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICBzLnByZXZlbnRDbGlja3MgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKCFzLmFsbG93Q2xpY2spIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldmVudENsaWNrcykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24gJiYgcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8vIENsaWNrc1xuICAgICAgICBzLm9uQ2xpY2tOZXh0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChzLmlzRW5kICYmICFzLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgICAgICAgICBzLnNsaWRlTmV4dCgpO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uQ2xpY2tQcmV2ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChzLmlzQmVnaW5uaW5nICYmICFzLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgICAgICAgICBzLnNsaWRlUHJldigpO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uQ2xpY2tJbmRleCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAkKHRoaXMpLmluZGV4KCkgKiBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSBpbmRleCA9IGluZGV4ICsgcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICBzLnNsaWRlVG8oaW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgSGFuZGxlIFRvdWNoZXNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBmdW5jdGlvbiBmaW5kRWxlbWVudEluRXZlbnQoZSwgc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHZhciBlbCA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgaWYgKCFlbC5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnBhcmVudHMoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxlY3Rvci5ub2RlVHlwZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQ7XG4gICAgICAgICAgICAgICAgICAgIGVsLnBhcmVudHMoKS5lYWNoKGZ1bmN0aW9uIChpbmRleCwgX2VsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoX2VsID09PSBzZWxlY3RvcikgZm91bmQgPSBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGVsWzBdO1xuICAgICAgICB9XG4gICAgICAgIHMudXBkYXRlQ2xpY2tlZFNsaWRlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZSA9IGZpbmRFbGVtZW50SW5FdmVudChlLCAnLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKTtcbiAgICAgICAgICAgIHZhciBzbGlkZUZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoc2xpZGUpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpXSA9PT0gc2xpZGUpIHNsaWRlRm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc2xpZGUgJiYgc2xpZGVGb3VuZCkge1xuICAgICAgICAgICAgICAgIHMuY2xpY2tlZFNsaWRlID0gc2xpZGU7XG4gICAgICAgICAgICAgICAgcy5jbGlja2VkSW5kZXggPSAkKHNsaWRlKS5pbmRleCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcy5jbGlja2VkU2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcy5jbGlja2VkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlVG9DbGlja2VkU2xpZGUgJiYgcy5jbGlja2VkSW5kZXggIT09IHVuZGVmaW5lZCAmJiBzLmNsaWNrZWRJbmRleCAhPT0gcy5hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZVRvSW5kZXggPSBzLmNsaWNrZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgcmVhbEluZGV4LFxuICAgICAgICAgICAgICAgICAgICBkdXBsaWNhdGVkU2xpZGVzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gcy5jdXJyZW50U2xpZGVzUGVyVmlldygpIDogcy5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5hbmltYXRpbmcpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoJChzLmNsaWNrZWRTbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoc2xpZGVUb0luZGV4IDwgcy5sb29wZWRTbGlkZXMgLSBzbGlkZXNQZXJWaWV3LzIpIHx8IChzbGlkZVRvSW5kZXggPiBzLnNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcyArIHNsaWRlc1BlclZpZXcvMikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVRvSW5kZXggPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcmVhbEluZGV4ICsgJ1wiXTpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJyknKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlVG9JbmRleCA+IHMuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVRvSW5kZXggPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcmVhbEluZGV4ICsgJ1wiXTpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJyknKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICB2YXIgaXNUb3VjaGVkLFxuICAgICAgICAgICAgaXNNb3ZlZCxcbiAgICAgICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3MsXG4gICAgICAgICAgICB0b3VjaFN0YXJ0VGltZSxcbiAgICAgICAgICAgIGlzU2Nyb2xsaW5nLFxuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSxcbiAgICAgICAgICAgIHN0YXJ0VHJhbnNsYXRlLFxuICAgICAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlLFxuICAgICAgICAgICAgLy8gRm9ybSBlbGVtZW50cyB0byBtYXRjaFxuICAgICAgICAgICAgZm9ybUVsZW1lbnRzID0gJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhLCBidXR0b24sIHZpZGVvJyxcbiAgICAgICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICAgICAgbGFzdENsaWNrVGltZSA9IERhdGUubm93KCksIGNsaWNrVGltZW91dCxcbiAgICAgICAgICAgIC8vVmVsb2NpdGllc1xuICAgICAgICAgICAgdmVsb2NpdGllcyA9IFtdLFxuICAgICAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZTtcbiAgICAgICAgXG4gICAgICAgIC8vIEFuaW1hdGluZyBGbGFnXG4gICAgICAgIHMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIFxuICAgICAgICAvLyBUb3VjaGVzIGluZm9ybWF0aW9uXG4gICAgICAgIHMudG91Y2hlcyA9IHtcbiAgICAgICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgICAgIHN0YXJ0WTogMCxcbiAgICAgICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICAgICAgY3VycmVudFk6IDAsXG4gICAgICAgICAgICBkaWZmOiAwXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyBUb3VjaCBoYW5kbGVyc1xuICAgICAgICB2YXIgaXNUb3VjaEV2ZW50LCBzdGFydE1vdmluZztcbiAgICAgICAgcy5vblRvdWNoU3RhcnQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGlzVG91Y2hFdmVudCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnO1xuICAgICAgICAgICAgaWYgKCFpc1RvdWNoRXZlbnQgJiYgJ3doaWNoJyBpbiBlICYmIGUud2hpY2ggPT09IDMpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5ub1N3aXBpbmcgJiYgZmluZEVsZW1lbnRJbkV2ZW50KGUsICcuJyArIHMucGFyYW1zLm5vU3dpcGluZ0NsYXNzKSkge1xuICAgICAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgICAgICAgICAgICAgIGlmICghZmluZEVsZW1lbnRJbkV2ZW50KGUsIHMucGFyYW1zLnN3aXBlSGFuZGxlcikpIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgc3RhcnRYID0gcy50b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgdmFyIHN0YXJ0WSA9IHMudG91Y2hlcy5jdXJyZW50WSA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEbyBOT1Qgc3RhcnQgaWYgaU9TIGVkZ2Ugc3dpcGUgaXMgZGV0ZWN0ZWQuIE90aGVyd2lzZSBpT1MgYXBwIChVSVdlYlZpZXcpIGNhbm5vdCBzd2lwZS10by1nby1iYWNrIGFueW1vcmVcbiAgICAgICAgICAgIGlmKHMuZGV2aWNlLmlvcyAmJiBzLnBhcmFtcy5pT1NFZGdlU3dpcGVEZXRlY3Rpb24gJiYgc3RhcnRYIDw9IHMucGFyYW1zLmlPU0VkZ2VTd2lwZVRocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrcyA9IHRydWU7XG4gICAgICAgICAgICBpc1Njcm9sbGluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHN0YXJ0TW92aW5nID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gICAgICAgICAgICB0b3VjaFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgcy51cGRhdGVDb250YWluZXJTaXplKCk7XG4gICAgICAgICAgICBzLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnRocmVzaG9sZCA+IDApIGFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAoJChlLnRhcmdldCkuaXMoZm9ybUVsZW1lbnRzKSkgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAkKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpLmlzKGZvcm1FbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChwcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5lbWl0KCdvblRvdWNoU3RhcnQnLCBzLCBlKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHMub25Ub3VjaE1vdmUgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGlmIChpc1RvdWNoRXZlbnQgJiYgZS50eXBlID09PSAnbW91c2Vtb3ZlJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIpIHtcbiAgICAgICAgICAgICAgICBzLnRvdWNoZXMuc3RhcnRYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vbmx5RXh0ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICAvLyBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNUb3VjaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFggPSBzLnRvdWNoZXMuY3VycmVudFggPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WSA9IHMudG91Y2hlcy5jdXJyZW50WSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1RvdWNoRXZlbnQgJiYgcy5wYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcyAmJiAhcy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBWZXJ0aWNhbFxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAocy50b3VjaGVzLmN1cnJlbnRZIDwgcy50b3VjaGVzLnN0YXJ0WSAmJiBzLnRyYW5zbGF0ZSA8PSBzLm1heFRyYW5zbGF0ZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHMudG91Y2hlcy5jdXJyZW50WSA+IHMudG91Y2hlcy5zdGFydFkgJiYgcy50cmFuc2xhdGUgPj0gcy5taW5UcmFuc2xhdGUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAocy50b3VjaGVzLmN1cnJlbnRYIDwgcy50b3VjaGVzLnN0YXJ0WCAmJiBzLnRyYW5zbGF0ZSA8PSBzLm1heFRyYW5zbGF0ZSgpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKHMudG91Y2hlcy5jdXJyZW50WCA+IHMudG91Y2hlcy5zdGFydFggJiYgcy50cmFuc2xhdGUgPj0gcy5taW5UcmFuc2xhdGUoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzVG91Y2hFdmVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmICQoZS50YXJnZXQpLmlzKGZvcm1FbGVtZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVG91Y2hNb3ZlJywgcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgcy50b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICBzLnRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodHlwZW9mIGlzU2Nyb2xsaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHZhciB0b3VjaEFuZ2xlO1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpICYmIHMudG91Y2hlcy5jdXJyZW50WSA9PT0gcy50b3VjaGVzLnN0YXJ0WSB8fCAhcy5pc0hvcml6b250YWwoKSAmJiBzLnRvdWNoZXMuY3VycmVudFggPT09IHMudG91Y2hlcy5zdGFydFgpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoQW5nbGUgPSBNYXRoLmF0YW4yKE1hdGguYWJzKHMudG91Y2hlcy5jdXJyZW50WSAtIHMudG91Y2hlcy5zdGFydFkpLCBNYXRoLmFicyhzLnRvdWNoZXMuY3VycmVudFggLSBzLnRvdWNoZXMuc3RhcnRYKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICAgICAgICAgICAgICBpc1Njcm9sbGluZyA9IHMuaXNIb3Jpem9udGFsKCkgPyB0b3VjaEFuZ2xlID4gcy5wYXJhbXMudG91Y2hBbmdsZSA6ICg5MCAtIHRvdWNoQW5nbGUgPiBzLnBhcmFtcy50b3VjaEFuZ2xlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVG91Y2hNb3ZlT3Bwb3NpdGUnLCBzLCBlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3RhcnRNb3ZpbmcgPT09ICd1bmRlZmluZWQnICYmIHMuYnJvd3Nlci5pZVRvdWNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMudG91Y2hlcy5jdXJyZW50WCAhPT0gcy50b3VjaGVzLnN0YXJ0WCB8fCBzLnRvdWNoZXMuY3VycmVudFkgIT09IHMudG91Y2hlcy5zdGFydFkpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRNb3ZpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoaXNTY3JvbGxpbmcpICB7XG4gICAgICAgICAgICAgICAgaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdGFydE1vdmluZyAmJiBzLmJyb3dzZXIuaWVUb3VjaCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlck1vdmUnLCBzLCBlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy50b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24gJiYgIXMucGFyYW1zLm5lc3RlZCkge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc01vdmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZml4TG9vcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzdGFydFRyYW5zbGF0ZSA9IHMuZ2V0V3JhcHBlclRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgaWYgKHMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmlnZ2VyKCd3ZWJraXRUcmFuc2l0aW9uRW5kIHRyYW5zaXRpb25lbmQgb1RyYW5zaXRpb25FbmQgTVNUcmFuc2l0aW9uRW5kIG1zVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXkgJiYgcy5hdXRvcGxheWluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMucGF1c2VBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAvL0dyYWIgQ3Vyc29yXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IgJiYgKHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPT09IHRydWUgfHwgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zZXRHcmFiQ3Vyc29yKHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBkaWZmID0gcy50b3VjaGVzLmRpZmYgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy50b3VjaGVzLmN1cnJlbnRYIC0gcy50b3VjaGVzLnN0YXJ0WCA6IHMudG91Y2hlcy5jdXJyZW50WSAtIHMudG91Y2hlcy5zdGFydFk7XG4gICAgICAgIFxuICAgICAgICAgICAgZGlmZiA9IGRpZmYgKiBzLnBhcmFtcy50b3VjaFJhdGlvO1xuICAgICAgICAgICAgaWYgKHMucnRsKSBkaWZmID0gLWRpZmY7XG4gICAgICAgIFxuICAgICAgICAgICAgcy5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xuICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBzdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gICAgICAgICAgICBpZiAoKGRpZmYgPiAwICYmIGN1cnJlbnRUcmFuc2xhdGUgPiBzLm1pblRyYW5zbGF0ZSgpKSkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucmVzaXN0YW5jZSkgY3VycmVudFRyYW5zbGF0ZSA9IHMubWluVHJhbnNsYXRlKCkgLSAxICsgTWF0aC5wb3coLXMubWluVHJhbnNsYXRlKCkgKyBzdGFydFRyYW5zbGF0ZSArIGRpZmYsIHMucGFyYW1zLnJlc2lzdGFuY2VSYXRpbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChkaWZmIDwgMCAmJiBjdXJyZW50VHJhbnNsYXRlIDwgcy5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucmVzaXN0YW5jZSkgY3VycmVudFRyYW5zbGF0ZSA9IHMubWF4VHJhbnNsYXRlKCkgKyAxIC0gTWF0aC5wb3cocy5tYXhUcmFuc2xhdGUoKSAtIHN0YXJ0VHJhbnNsYXRlIC0gZGlmZiwgcy5wYXJhbXMucmVzaXN0YW5jZVJhdGlvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xuICAgICAgICAgICAgICAgIGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCAmJiBzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgY3VycmVudFRyYW5zbGF0ZSA8IHN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ICYmIHMuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2JyAmJiBjdXJyZW50VHJhbnNsYXRlID4gc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFRocmVzaG9sZFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnRocmVzaG9sZCA+IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGlmZikgPiBzLnBhcmFtcy50aHJlc2hvbGQgfHwgYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WCA9IHMudG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFkgPSBzLnRvdWNoZXMuY3VycmVudFk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJhbnNsYXRlID0gc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnRvdWNoZXMuZGlmZiA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLnRvdWNoZXMuY3VycmVudFggLSBzLnRvdWNoZXMuc3RhcnRYIDogcy50b3VjaGVzLmN1cnJlbnRZIC0gcy50b3VjaGVzLnN0YXJ0WTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuZm9sbG93RmluZ2VyKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVXBkYXRlIGFjdGl2ZSBpbmRleCBpbiBmcmVlIG1vZGVcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSB8fCBzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgLy9WZWxvY2l0eVxuICAgICAgICAgICAgICAgIGlmICh2ZWxvY2l0aWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0aWVzLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHMudG91Y2hlc1tzLmlzSG9yaXpvbnRhbCgpID8gJ3N0YXJ0WCcgOiAnc3RhcnRZJ10sXG4gICAgICAgICAgICAgICAgICAgICAgICB0aW1lOiB0b3VjaFN0YXJ0VGltZVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246IHMudG91Y2hlc1tzLmlzSG9yaXpvbnRhbCgpID8gJ2N1cnJlbnRYJyA6ICdjdXJyZW50WSddLFxuICAgICAgICAgICAgICAgICAgICB0aW1lOiAobmV3IHdpbmRvdy5EYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVXBkYXRlIHByb2dyZXNzXG4gICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKGN1cnJlbnRUcmFuc2xhdGUpO1xuICAgICAgICAgICAgLy8gVXBkYXRlIHRyYW5zbGF0ZVxuICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKGN1cnJlbnRUcmFuc2xhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uVG91Y2hFbmQgPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgICAgICAgICAgIGlmIChhbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblRvdWNoRW5kJywgcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICAgICAgLy9SZXR1cm4gR3JhYiBDdXJzb3JcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yICYmIGlzTW92ZWQgJiYgaXNUb3VjaGVkICAmJiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9PT0gdHJ1ZSB8fCBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID09PSB0cnVlKSkge1xuICAgICAgICAgICAgICAgIHMuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVGltZSBkaWZmXG4gICAgICAgICAgICB2YXIgdG91Y2hFbmRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHZhciB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIHRvdWNoU3RhcnRUaW1lO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFRhcCwgZG91YmxlVGFwLCBDbGlja1xuICAgICAgICAgICAgaWYgKHMuYWxsb3dDbGljaykge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQ2xpY2tlZFNsaWRlKGUpO1xuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25UYXAnLCBzLCBlKTtcbiAgICAgICAgICAgICAgICBpZiAodGltZURpZmYgPCAzMDAgJiYgKHRvdWNoRW5kVGltZSAtIGxhc3RDbGlja1RpbWUpID4gMzAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjbGlja1RpbWVvdXQpIGNsZWFyVGltZW91dChjbGlja1RpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICBjbGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25IaWRlICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAwICYmICEkKGUudGFyZ2V0KS5oYXNDbGFzcyhzLnBhcmFtcy5idWxsZXRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIudG9nZ2xlQ2xhc3Mocy5wYXJhbXMucGFnaW5hdGlvbkhpZGRlbkNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25DbGljaycsIHMsIGUpO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVEaWZmIDwgMzAwICYmICh0b3VjaEVuZFRpbWUgLSBsYXN0Q2xpY2tUaW1lKSA8IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tUaW1lb3V0KSBjbGVhclRpbWVvdXQoY2xpY2tUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkRvdWJsZVRhcCcsIHMsIGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBsYXN0Q2xpY2tUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzKSBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFpc1RvdWNoZWQgfHwgIWlzTW92ZWQgfHwgIXMuc3dpcGVEaXJlY3Rpb24gfHwgcy50b3VjaGVzLmRpZmYgPT09IDAgfHwgY3VycmVudFRyYW5zbGF0ZSA9PT0gc3RhcnRUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICBpc1RvdWNoZWQgPSBpc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaXNUb3VjaGVkID0gaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZvbGxvd0Zpbmdlcikge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSBzLnJ0bCA/IHMudHJhbnNsYXRlIDogLXMudHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvcyA9IC1jdXJyZW50VHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3MgPCAtcy5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY3VycmVudFBvcyA+IC1zLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlcy5sZW5ndGggPCBzLnNuYXBHcmlkLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuc25hcEdyaWQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZlbG9jaXRpZXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RNb3ZlRXZlbnQgPSB2ZWxvY2l0aWVzLnBvcCgpLCB2ZWxvY2l0eUV2ZW50ID0gdmVsb2NpdGllcy5wb3AoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBsYXN0TW92ZUV2ZW50LnBvc2l0aW9uIC0gdmVsb2NpdHlFdmVudC5wb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0aW1lID0gbGFzdE1vdmVFdmVudC50aW1lIC0gdmVsb2NpdHlFdmVudC50aW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IGRpc3RhbmNlIC8gdGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSBzLnZlbG9jaXR5IC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzLnZlbG9jaXR5KSA8IHMucGFyYW1zLmZyZWVNb2RlTWluaW11bVZlbG9jaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIGltcGxpZXMgdGhhdCB0aGUgdXNlciBzdG9wcGVkIG1vdmluZyBhIGZpbmdlciB0aGVuIHJlbGVhc2VkLlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gVGhlcmUgd291bGQgYmUgbm8gZXZlbnRzIHdpdGggZGlzdGFuY2UgemVybywgc28gdGhlIGxhc3QgZXZlbnQgaXMgc3RhbGUuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGltZSA+IDE1MCB8fCAobmV3IHdpbmRvdy5EYXRlKCkuZ2V0VGltZSgpIC0gbGFzdE1vdmVFdmVudC50aW1lKSA+IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy52ZWxvY2l0eSA9IHMudmVsb2NpdHkgKiBzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtVmVsb2NpdHlSYXRpbztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZlbG9jaXRpZXMubGVuZ3RoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb24gPSAxMDAwICogcy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bVJhdGlvO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZSA9IHMudmVsb2NpdHkgKiBtb21lbnR1bUR1cmF0aW9uO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gcy50cmFuc2xhdGUgKyBtb21lbnR1bURpc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIG5ld1Bvc2l0aW9uID0gLSBuZXdQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvQm91bmNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhZnRlckJvdW5jZVBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm91bmNlQW1vdW50ID0gTWF0aC5hYnMocy52ZWxvY2l0eSkgKiAyMCAqIHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2VSYXRpbztcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIDwgcy5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3UG9zaXRpb24gKyBzLm1heFRyYW5zbGF0ZSgpIDwgLWJvdW5jZUFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMubWF4VHJhbnNsYXRlKCkgLSBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyQm91bmNlUG9zaXRpb24gPSBzLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gcy5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChuZXdQb3NpdGlvbiA+IHMubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtQm91bmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uIC0gcy5taW5UcmFuc2xhdGUoKSA+IGJvdW5jZUFtb3VudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMubWluVHJhbnNsYXRlKCkgKyBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyQm91bmNlUG9zaXRpb24gPSBzLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBzLnNuYXBHcmlkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc25hcEdyaWRbal0gPiAtbmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFNsaWRlID0gajtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhzLnNuYXBHcmlkW25leHRTbGlkZV0gLSBuZXdQb3NpdGlvbikgPCBNYXRoLmFicyhzLnNuYXBHcmlkW25leHRTbGlkZSAtIDFdIC0gbmV3UG9zaXRpb24pIHx8IHMuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gcy5zbmFwR3JpZFtuZXh0U2xpZGVdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMuc25hcEdyaWRbbmV4dFNsaWRlIC0gMV07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMucnRsKSBuZXdQb3NpdGlvbiA9IC0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy9GaXggZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaWYgKHMudmVsb2NpdHkgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLmFicygoLW5ld1Bvc2l0aW9uIC0gcy50cmFuc2xhdGUpIC8gcy52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uIC0gcy50cmFuc2xhdGUpIC8gcy52ZWxvY2l0eSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVSZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSAmJiBkb0JvdW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyhhZnRlckJvdW5jZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcyB8fCAhYWxsb3dNb21lbnR1bUJvdW5jZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25Nb21lbnR1bUJvdW5jZScsIHMpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKHMucGFyYW1zLnNwZWVkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHMudmVsb2NpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLm9uVHJhbnNpdGlvblN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyhuZXdQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtIHx8IHRpbWVEaWZmID49IHMucGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgY3VycmVudCBzbGlkZVxuICAgICAgICAgICAgdmFyIGksIHN0b3BJbmRleCA9IDAsIGdyb3VwU2l6ZSA9IHMuc2xpZGVzU2l6ZXNHcmlkWzBdO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHMuc2xpZGVzR3JpZFtpICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBvcyA+PSBzLnNsaWRlc0dyaWRbaV0gJiYgY3VycmVudFBvcyA8IHMuc2xpZGVzR3JpZFtpICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JvdXBTaXplID0gcy5zbGlkZXNHcmlkW2kgKyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cF0gLSBzLnNsaWRlc0dyaWRbaV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UG9zID49IHMuc2xpZGVzR3JpZFtpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU2l6ZSA9IHMuc2xpZGVzR3JpZFtzLnNsaWRlc0dyaWQubGVuZ3RoIC0gMV0gLSBzLnNsaWRlc0dyaWRbcy5zbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgY3VycmVudCBzbGlkZSBzaXplXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSAoY3VycmVudFBvcyAtIHMuc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodGltZURpZmYgPiBzLnBhcmFtcy5sb25nU3dpcGVzTXMpIHtcbiAgICAgICAgICAgICAgICAvLyBMb25nIHRvdWNoZXNcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLmxvbmdTd2lwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGlvID49IHMucGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgcy5zbGlkZVRvKHN0b3BJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJhdGlvID4gKDEgLSBzLnBhcmFtcy5sb25nU3dpcGVzUmF0aW8pKSBzLnNsaWRlVG8oc3RvcEluZGV4ICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHMuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFNob3J0IHN3aXBlc1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHN0b3BJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBUcmFuc2l0aW9uc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuX3NsaWRlVG8gPSBmdW5jdGlvbiAoc2xpZGVJbmRleCwgc3BlZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnNsaWRlVG8oc2xpZGVJbmRleCwgc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBzLnNsaWRlVG8gPSBmdW5jdGlvbiAoc2xpZGVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcnVuQ2FsbGJhY2tzID09PSAndW5kZWZpbmVkJykgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHNsaWRlSW5kZXggPSAwO1xuICAgICAgICAgICAgaWYgKHNsaWRlSW5kZXggPCAwKSBzbGlkZUluZGV4ID0gMDtcbiAgICAgICAgICAgIHMuc25hcEluZGV4ID0gTWF0aC5mbG9vcihzbGlkZUluZGV4IC8gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgICAgaWYgKHMuc25hcEluZGV4ID49IHMuc25hcEdyaWQubGVuZ3RoKSBzLnNuYXBJbmRleCA9IHMuc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gLSBzLnNuYXBHcmlkW3Muc25hcEluZGV4XTtcbiAgICAgICAgICAgIC8vIFN0b3AgYXV0b3BsYXlcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvcGxheSAmJiBzLmF1dG9wbGF5aW5nKSB7XG4gICAgICAgICAgICAgICAgaWYgKGludGVybmFsIHx8ICFzLnBhcmFtcy5hdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucGF1c2VBdXRvcGxheShzcGVlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gICAgICAgICAgICBpZihzLnBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KXtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzR3JpZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoLSBNYXRoLmZsb29yKHRyYW5zbGF0ZSAqIDEwMCkgPj0gTWF0aC5mbG9vcihzLnNsaWRlc0dyaWRbaV0gKiAxMDApKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgJiYgdHJhbnNsYXRlIDwgcy50cmFuc2xhdGUgJiYgdHJhbnNsYXRlIDwgcy5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiAmJiB0cmFuc2xhdGUgPiBzLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKChzLmFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4ICkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBJbmRleFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gJ3VuZGVmaW5lZCcpIHNwZWVkID0gcy5wYXJhbXMuc3BlZWQ7XG4gICAgICAgICAgICBzLnByZXZpb3VzSW5kZXggPSBzLmFjdGl2ZUluZGV4IHx8IDA7XG4gICAgICAgICAgICBzLmFjdGl2ZUluZGV4ID0gc2xpZGVJbmRleDtcbiAgICAgICAgICAgIHMudXBkYXRlUmVhbEluZGV4KCk7XG4gICAgICAgICAgICBpZiAoKHMucnRsICYmIC10cmFuc2xhdGUgPT09IHMudHJhbnNsYXRlKSB8fCAoIXMucnRsICYmIHRyYW5zbGF0ZSA9PT0gcy50cmFuc2xhdGUpKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIEhlaWdodFxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgIHMudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgIHMub25UcmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3BlZWQgPT09IDAgfHwgcy5icm93c2VyLmx0ZUlFOSkge1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oc3BlZWQpO1xuICAgICAgICAgICAgICAgIGlmICghcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLm9uVHJhbnNpdGlvblN0YXJ0ID0gZnVuY3Rpb24gKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBydW5DYWxsYmFja3MgPT09ICd1bmRlZmluZWQnKSBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLmxhenkpIHMubGF6eS5vblRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25UcmFuc2l0aW9uU3RhcnQnLCBzKTtcbiAgICAgICAgICAgICAgICBpZiAocy5hY3RpdmVJbmRleCAhPT0gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TbGlkZUNoYW5nZVN0YXJ0Jywgcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4ID4gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVOZXh0U3RhcnQnLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TbGlkZVByZXZTdGFydCcsIHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy5vblRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcnVuQ2FsbGJhY2tzID09PSAndW5kZWZpbmVkJykgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzLmxhenkpIHMubGF6eS5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVHJhbnNpdGlvbkVuZCcsIHMpO1xuICAgICAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4ICE9PSBzLnByZXZpb3VzSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlQ2hhbmdlRW5kJywgcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4ID4gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVOZXh0RW5kJywgcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVQcmV2RW5kJywgcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGlzdG9yeSAmJiBzLmhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICBzLmhpc3Rvcnkuc2V0SGlzdG9yeShzLnBhcmFtcy5oaXN0b3J5LCBzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2ICYmIHMuaGFzaG5hdikge1xuICAgICAgICAgICAgICAgIHMuaGFzaG5hdi5zZXRIYXNoKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBzLnNsaWRlTmV4dCA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MsIHNwZWVkLCBpbnRlcm5hbCkge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAocy5hbmltYXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50TGVmdCA9IHMuY29udGFpbmVyWzBdLmNsaWVudExlZnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4ICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4ICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5fc2xpZGVOZXh0ID0gZnVuY3Rpb24gKHNwZWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5zbGlkZU5leHQodHJ1ZSwgc3BlZWQsIHRydWUpO1xuICAgICAgICB9O1xuICAgICAgICBzLnNsaWRlUHJldiA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MsIHNwZWVkLCBpbnRlcm5hbCkge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAocy5hbmltYXRpbmcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICB2YXIgY2xpZW50TGVmdCA9IHMuY29udGFpbmVyWzBdLmNsaWVudExlZnQ7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4IC0gMSwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSByZXR1cm4gcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXggLSAxLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICAgIH07XG4gICAgICAgIHMuX3NsaWRlUHJldiA9IGZ1bmN0aW9uIChzcGVlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVQcmV2KHRydWUsIHNwZWVkLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5zbGlkZVJlc2V0ID0gZnVuY3Rpb24gKHJ1bkNhbGxiYWNrcywgc3BlZWQsIGludGVybmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy5kaXNhYmxlVG91Y2hDb250cm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMub25seUV4dGVybmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBzLmVuYWJsZVRvdWNoQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLm9ubHlFeHRlcm5hbCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBUcmFuc2xhdGUvdHJhbnNpdGlvbiBoZWxwZXJzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbiA9IGZ1bmN0aW9uIChkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnICYmIHMuZWZmZWN0c1tzLnBhcmFtcy5lZmZlY3RdKSB7XG4gICAgICAgICAgICAgICAgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0uc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucGFyYWxsYXggJiYgcy5wYXJhbGxheCkge1xuICAgICAgICAgICAgICAgIHMucGFyYWxsYXguc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuY29udHJvbCAmJiBzLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuZW1pdCgnb25TZXRUcmFuc2l0aW9uJywgcywgZHVyYXRpb24pO1xuICAgICAgICB9O1xuICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUgPSBmdW5jdGlvbiAodHJhbnNsYXRlLCB1cGRhdGVBY3RpdmVJbmRleCwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgICAgICB2YXIgeCA9IDAsIHkgPSAwLCB6ID0gMDtcbiAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgeCA9IHMucnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHkgPSB0cmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgICAgICAgICAgICAgIHggPSByb3VuZCh4KTtcbiAgICAgICAgICAgICAgICB5ID0gcm91bmQoeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50cmFuc2Zvcm1zM2QpIHMud3JhcHBlci50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgJyArIHogKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBzLndyYXBwZXIudHJhbnNmb3JtKCd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KScpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHMudHJhbnNsYXRlID0gcy5pc0hvcml6b250YWwoKSA/IHggOiB5O1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gdXBkYXRlIHByb2dyZXNzXG4gICAgICAgICAgICB2YXIgcHJvZ3Jlc3M7XG4gICAgICAgICAgICB2YXIgdHJhbnNsYXRlc0RpZmYgPSBzLm1heFRyYW5zbGF0ZSgpIC0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHMubWluVHJhbnNsYXRlKCkpIC8gKHRyYW5zbGF0ZXNEaWZmKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwcm9ncmVzcyAhPT0gcy5wcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAodXBkYXRlQWN0aXZlSW5kZXgpIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5lZmZlY3QgIT09ICdzbGlkZScgJiYgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0pIHtcbiAgICAgICAgICAgICAgICBzLmVmZmVjdHNbcy5wYXJhbXMuZWZmZWN0XS5zZXRUcmFuc2xhdGUocy50cmFuc2xhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhcmFsbGF4ICYmIHMucGFyYWxsYXgpIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFsbGF4LnNldFRyYW5zbGF0ZShzLnRyYW5zbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKHMudHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jb250cm9sICYmIHMuY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAgIHMuY29udHJvbGxlci5zZXRUcmFuc2xhdGUocy50cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmVtaXQoJ29uU2V0VHJhbnNsYXRlJywgcywgcy50cmFuc2xhdGUpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy5nZXRUcmFuc2xhdGUgPSBmdW5jdGlvbiAoZWwsIGF4aXMpIHtcbiAgICAgICAgICAgIHZhciBtYXRyaXgsIGN1clRyYW5zZm9ybSwgY3VyU3R5bGUsIHRyYW5zZm9ybU1hdHJpeDtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBhdXRvbWF0aWMgYXhpcyBkZXRlY3Rpb25cbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXhpcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBheGlzID0gJ3gnO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHMucnRsID8gLXMudHJhbnNsYXRlIDogcy50cmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgY3VyU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG4gICAgICAgICAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkge1xuICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgICAgICAgICAgICAgaWYgKGN1clRyYW5zZm9ybS5zcGxpdCgnLCcpLmxlbmd0aCA+IDYpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KCcsICcpLm1hcChmdW5jdGlvbihhKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhLnJlcGxhY2UoJywnLCcuJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJywgJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIFdlYmtpdCBjaG9rZSB3aGVuICdub25lJyBpcyBwYXNzZWQ7IHBhc3NcbiAgICAgICAgICAgICAgICAvLyBlbXB0eSBzdHJpbmcgaW5zdGVhZCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luZG93LldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtICB8fCBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykucmVwbGFjZSgndHJhbnNsYXRlKCcsICdtYXRyaXgoMSwgMCwgMCwgMSwnKTtcbiAgICAgICAgICAgICAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdCgnLCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChheGlzID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAvL0xhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpXG4gICAgICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7XG4gICAgICAgICAgICAgICAgLy9DcmF6eSBJRTEwIE1hdHJpeFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pO1xuICAgICAgICAgICAgICAgIC8vTm9ybWFsIEJyb3dzZXJzXG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgLy9MYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQyO1xuICAgICAgICAgICAgICAgIC8vQ3JhenkgSUUxMCBNYXRyaXhcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNilcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTNdKTtcbiAgICAgICAgICAgICAgICAvL05vcm1hbCBCcm93c2Vyc1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucnRsICYmIGN1clRyYW5zZm9ybSkgY3VyVHJhbnNmb3JtID0gLWN1clRyYW5zZm9ybTtcbiAgICAgICAgICAgIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcbiAgICAgICAgfTtcbiAgICAgICAgcy5nZXRXcmFwcGVyVHJhbnNsYXRlID0gZnVuY3Rpb24gKGF4aXMpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYXhpcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBheGlzID0gcy5pc0hvcml6b250YWwoKSA/ICd4JyA6ICd5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzLmdldFRyYW5zbGF0ZShzLndyYXBwZXJbMF0sIGF4aXMpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgT2JzZXJ2ZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICBmdW5jdGlvbiBpbml0T2JzZXJ2ZXIodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgICAgIC8vIGNyZWF0ZSBhbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgICAgICAgdmFyIE9ic2VydmVyRnVuYyA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJraXRNdXRhdGlvbk9ic2VydmVyO1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyID0gbmV3IE9ic2VydmVyRnVuYyhmdW5jdGlvbiAobXV0YXRpb25zKSB7XG4gICAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKG11dGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMub25SZXNpemUodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25PYnNlcnZlclVwZGF0ZScsIHMsIG11dGF0aW9uKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogdHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcyA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICAgIGNoaWxkTGlzdDogdHlwZW9mIG9wdGlvbnMuY2hpbGRMaXN0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoaWxkTGlzdCxcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgIHMub2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICAgICAgICB9XG4gICAgICAgIHMuaW5pdE9ic2VydmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vYnNlcnZlUGFyZW50cykge1xuICAgICAgICAgICAgICAgIHZhciBjb250YWluZXJQYXJlbnRzID0gcy5jb250YWluZXIucGFyZW50cygpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpbml0T2JzZXJ2ZXIoY29udGFpbmVyUGFyZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIE9ic2VydmUgY29udGFpbmVyXG4gICAgICAgICAgICBpbml0T2JzZXJ2ZXIocy5jb250YWluZXJbMF0sIHtjaGlsZExpc3Q6IGZhbHNlfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gT2JzZXJ2ZSB3cmFwcGVyXG4gICAgICAgICAgICBpbml0T2JzZXJ2ZXIocy53cmFwcGVyWzBdLCB7YXR0cmlidXRlczogZmFsc2V9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5kaXNjb25uZWN0T2JzZXJ2ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLm9ic2VydmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMub2JzZXJ2ZXJzW2ldLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMub2JzZXJ2ZXJzID0gW107XG4gICAgICAgIH07XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIExvb3BcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICAvLyBDcmVhdGUgbG9vcGVkIHNsaWRlc1xuICAgICAgICBzLmNyZWF0ZUxvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgZHVwbGljYXRlZCBzbGlkZXNcbiAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykucmVtb3ZlKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHNsaWRlcyA9IHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZihzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgIXMucGFyYW1zLmxvb3BlZFNsaWRlcykgcy5wYXJhbXMubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgXG4gICAgICAgICAgICBzLmxvb3BlZFNsaWRlcyA9IHBhcnNlSW50KHMucGFyYW1zLmxvb3BlZFNsaWRlcyB8fCBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCk7XG4gICAgICAgICAgICBzLmxvb3BlZFNsaWRlcyA9IHMubG9vcGVkU2xpZGVzICsgcy5wYXJhbXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG4gICAgICAgICAgICBpZiAocy5sb29wZWRTbGlkZXMgPiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcy5sb29wZWRTbGlkZXMgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHZhciBwcmVwZW5kU2xpZGVzID0gW10sIGFwcGVuZFNsaWRlcyA9IFtdLCBpO1xuICAgICAgICAgICAgc2xpZGVzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgcy5sb29wZWRTbGlkZXMpIGFwcGVuZFNsaWRlcy5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoICYmIGluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBzLmxvb3BlZFNsaWRlcykgcHJlcGVuZFNsaWRlcy5wdXNoKGVsKTtcbiAgICAgICAgICAgICAgICBzbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFwcGVuZFNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5hcHBlbmQoJChhcHBlbmRTbGlkZXNbaV0uY2xvbmVOb2RlKHRydWUpKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKGkgPSBwcmVwZW5kU2xpZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICAgICAgcy53cmFwcGVyLnByZXBlbmQoJChwcmVwZW5kU2xpZGVzW2ldLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLmRlc3Ryb3lMb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHMuc2xpZGVzLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgIH07XG4gICAgICAgIHMucmVMb29wID0gZnVuY3Rpb24gKHVwZGF0ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgb2xkSW5kZXggPSBzLmFjdGl2ZUluZGV4IC0gcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICBzLmNyZWF0ZUxvb3AoKTtcbiAgICAgICAgICAgIHMudXBkYXRlU2xpZGVzU2l6ZSgpO1xuICAgICAgICAgICAgaWYgKHVwZGF0ZVBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG9sZEluZGV4ICsgcy5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHMuZml4TG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBuZXdJbmRleDtcbiAgICAgICAgICAgIC8vRml4IEZvciBOZWdhdGl2ZSBPdmVyc2xpZGluZ1xuICAgICAgICAgICAgaWYgKHMuYWN0aXZlSW5kZXggPCBzLmxvb3BlZFNsaWRlcykge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gcy5zbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMgKiAzICsgcy5hY3RpdmVJbmRleDtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0luZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvL0ZpeCBGb3IgUG9zaXRpdmUgT3ZlcnNsaWRpbmdcbiAgICAgICAgICAgIGVsc2UgaWYgKChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgcy5hY3RpdmVJbmRleCA+PSBzLmxvb3BlZFNsaWRlcyAqIDIpIHx8IChzLmFjdGl2ZUluZGV4ID4gcy5zbGlkZXMubGVuZ3RoIC0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldyAqIDIpKSB7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSAtcy5zbGlkZXMubGVuZ3RoICsgcy5hY3RpdmVJbmRleCArIHMubG9vcGVkU2xpZGVzO1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBzLmxvb3BlZFNsaWRlcztcbiAgICAgICAgICAgICAgICBzLnNsaWRlVG8obmV3SW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQXBwZW5kL1ByZXBlbmQvUmVtb3ZlIFNsaWRlc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuYXBwZW5kU2xpZGUgPSBmdW5jdGlvbiAoc2xpZGVzKSB7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuZGVzdHJveUxvb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgcy53cmFwcGVyLmFwcGVuZChzbGlkZXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5hcHBlbmQoc2xpZGVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5jcmVhdGVMb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIShzLnBhcmFtcy5vYnNlcnZlciAmJiBzLnN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMucHJlcGVuZFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlcykge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBzLmFjdGl2ZUluZGV4ICsgMTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1tpXSkgcy53cmFwcGVyLnByZXBlbmQoc2xpZGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBzLmFjdGl2ZUluZGV4ICsgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5wcmVwZW5kKHNsaWRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuY3JlYXRlTG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEocy5wYXJhbXMub2JzZXJ2ZXIgJiYgcy5zdXBwb3J0Lm9ic2VydmVyKSkge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgICAgIH07XG4gICAgICAgIHMucmVtb3ZlU2xpZGUgPSBmdW5jdGlvbiAoc2xpZGVzSW5kZXhlcykge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICAgICAgcy5zbGlkZXMgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBzLmFjdGl2ZUluZGV4LFxuICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0luZGV4ZXMgPT09ICdvYmplY3QnICYmIHNsaWRlc0luZGV4ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNJbmRleGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHMuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXhUb1JlbW92ZSA8IG5ld0FjdGl2ZUluZGV4KSBuZXdBY3RpdmVJbmRleC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzO1xuICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgcy5zbGlkZXMuZXEoaW5kZXhUb1JlbW92ZSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXgtLTtcbiAgICAgICAgICAgICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuY3JlYXRlTG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghKHMucGFyYW1zLm9ic2VydmVyICYmIHMuc3VwcG9ydC5vYnNlcnZlcikpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4ICsgcy5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgcy5yZW1vdmVBbGxTbGlkZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2xpZGVzSW5kZXhlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMucmVtb3ZlU2xpZGUoc2xpZGVzSW5kZXhlcyk7XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEVmZmVjdHNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmVmZmVjdHMgPSB7XG4gICAgICAgICAgICBmYWRlOiB7XG4gICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IHNsaWRlWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4ID0gLW9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkgdHggPSB0eCAtIHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlT3BhY2l0eSA9IHMucGFyYW1zLmZhZGUuY3Jvc3NGYWRlID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMSAtIE1hdGguYWJzKHNsaWRlWzBdLnByb2dyZXNzKSwgMCkgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxICsgTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB0eCArICdweCwgJyArIHR5ICsgJ3B4LCAwcHgpJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSAmJiBkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJywgJ29UcmFuc2l0aW9uRW5kJywgJ01TVHJhbnNpdGlvbkVuZCcsICdtc1RyYW5zaXRpb25FbmQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmxpcDoge1xuICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IHNsaWRlWzBdLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZsaXAubGltaXRSb3RhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oc2xpZGVbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgb2Zmc2V0ID0gc2xpZGVbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRlID0gLTE4MCAqIHByb2dyZXNzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZVkgPSByb3RhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlWCA9IDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAtb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZVggPSAtcm90YXRlWTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVZID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlWSA9IC1yb3RhdGVZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHByb2dyZXNzKSkgKyBzLnNsaWRlcy5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZsaXAuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgc2hhZG93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dCZWZvcmUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIHR4ICsgJ3B4LCAnICsgdHkgKyAncHgsIDBweCkgcm90YXRlWCgnICsgcm90YXRlWCArICdkZWcpIHJvdGF0ZVkoJyArIHJvdGF0ZVkgKyAnZGVnKScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghJCh0aGlzKS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gWyd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ3RyYW5zaXRpb25lbmQnLCAnb1RyYW5zaXRpb25FbmQnLCAnTVNUcmFuc2l0aW9uRW5kJywgJ21zVHJhbnNpdGlvbkVuZCddO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHJpZ2dlckV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJpZ2dlcih0cmlnZ2VyRXZlbnRzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdWJlOiB7XG4gICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB3cmFwcGVyUm90YXRlID0gMCwgY3ViZVNoYWRvdztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmN1YmUuc2hhZG93KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVTaGFkb3cgPSBzLndyYXBwZXIuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdWJlU2hhZG93Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93ID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1jdWJlLXNoYWRvd1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuYXBwZW5kKGN1YmVTaGFkb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93LmNzcyh7aGVpZ2h0OiBzLndpZHRoICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdyA9IHMuY29udGFpbmVyLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3ViZVNoYWRvdy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdyA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5jb250YWluZXIuYXBwZW5kKGN1YmVTaGFkb3cpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUFuZ2xlID0gaSAqIDkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdW5kID0gTWF0aC5mbG9vcihzbGlkZUFuZ2xlIC8gMzYwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlQW5nbGUgPSAtc2xpZGVBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3VuZCA9IE1hdGguZmxvb3IoLXNsaWRlQW5nbGUgLyAzNjApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oc2xpZGVbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHggPSAwLCB0eSA9IDAsIHR6ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gLSByb3VuZCAqIDQgKiBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGkgLSAxKSAlIDQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSAtIHJvdW5kICogNCAqIHMuc2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChpIC0gMikgJSA0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSBzLnNpemUgKyByb3VuZCAqIDQgKiBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoaSAtIDMpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gLSBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHogPSAzICogcy5zaXplICsgcy5zaXplICogNCAqIHJvdW5kO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAtdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHkgPSB0eDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9ICdyb3RhdGVYKCcgKyAocy5pc0hvcml6b250YWwoKSA/IDAgOiAtc2xpZGVBbmdsZSkgKyAnZGVnKSByb3RhdGVZKCcgKyAocy5pc0hvcml6b250YWwoKSA/IHNsaWRlQW5nbGUgOiAwKSArICdkZWcpIHRyYW5zbGF0ZTNkKCcgKyB0eCArICdweCwgJyArIHR5ICsgJ3B4LCAnICsgdHogKyAncHgpJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcm9ncmVzcyA8PSAxICYmIHByb2dyZXNzID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3cmFwcGVyUm90YXRlID0gaSAqIDkwICsgcHJvZ3Jlc3MgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHdyYXBwZXJSb3RhdGUgPSAtaSAqIDkwIC0gcHJvZ3Jlc3MgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmN1YmUuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgc2hhZG93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dCZWZvcmUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtdHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlIC0nICsgKHMuc2l6ZSAvIDIpICsgJ3B4JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICctbW96LXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSAtJyArIChzLnNpemUgLyAyKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnLW1zLXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSAtJyArIChzLnNpemUgLyAyKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNmb3JtLW9yaWdpbic6ICc1MCUgNTAlIC0nICsgKHMuc2l6ZSAvIDIpICsgJ3B4J1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jdWJlLnNoYWRvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93LnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMHB4LCAnICsgKHMud2lkdGggLyAyICsgcy5wYXJhbXMuY3ViZS5zaGFkb3dPZmZzZXQpICsgJ3B4LCAnICsgKC1zLndpZHRoIC8gMikgKyAncHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoJyArIChzLnBhcmFtcy5jdWJlLnNoYWRvd1NjYWxlKSArICcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hhZG93QW5nbGUgPSBNYXRoLmFicyh3cmFwcGVyUm90YXRlKSAtIE1hdGguZmxvb3IoTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLyA5MCkgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IDEuNSAtIChNYXRoLnNpbihzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJIC8gMzYwKSAvIDIgKyBNYXRoLmNvcyhzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJIC8gMzYwKSAvIDIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzY2FsZTEgPSBzLnBhcmFtcy5jdWJlLnNoYWRvd1NjYWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2FsZTIgPSBzLnBhcmFtcy5jdWJlLnNoYWRvd1NjYWxlIC8gbXVsdGlwbGllcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0ID0gcy5wYXJhbXMuY3ViZS5zaGFkb3dPZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdy50cmFuc2Zvcm0oJ3NjYWxlM2QoJyArIHNjYWxlMSArICcsIDEsICcgKyBzY2FsZTIgKyAnKSB0cmFuc2xhdGUzZCgwcHgsICcgKyAocy5oZWlnaHQgLyAyICsgb2Zmc2V0KSArICdweCwgJyArICgtcy5oZWlnaHQgLyAyIC8gc2NhbGUyKSArICdweCkgcm90YXRlWCgtOTBkZWcpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHpGYWN0b3IgPSAocy5pc1NhZmFyaSB8fCBzLmlzVWlXZWJWaWV3KSA/ICgtcy5zaXplIC8gMikgOiAwO1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwcHgsMCwnICsgekZhY3RvciArICdweCkgcm90YXRlWCgnICsgKHMuaXNIb3Jpem9udGFsKCkgPyAwIDogd3JhcHBlclJvdGF0ZSkgKyAnZGVnKSByb3RhdGVZKCcgKyAocy5pc0hvcml6b250YWwoKSA/IC13cmFwcGVyUm90YXRlIDogMCkgKyAnZGVnKScpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY3ViZS5zaGFkb3cgJiYgIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuY29udGFpbmVyLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb3ZlcmZsb3c6IHtcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2VudGVyID0gcy5pc0hvcml6b250YWwoKSA/IC10cmFuc2Zvcm0gKyBzLndpZHRoIC8gMiA6IC10cmFuc2Zvcm0gKyBzLmhlaWdodCAvIDI7XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGUgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy5wYXJhbXMuY292ZXJmbG93LnJvdGF0ZTogLXMucGFyYW1zLmNvdmVyZmxvdy5yb3RhdGU7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGUgPSBzLnBhcmFtcy5jb3ZlcmZsb3cuZGVwdGg7XG4gICAgICAgICAgICAgICAgICAgIC8vRWFjaCBzbGlkZSBvZmZzZXQgZnJvbSBjZW50ZXJcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHMuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVNpemUgPSBzLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZU9mZnNldCA9IHNsaWRlWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldE11bHRpcGxpZXIgPSAoY2VudGVyIC0gc2xpZGVPZmZzZXQgLSBzbGlkZVNpemUgLyAyKSAvIHNsaWRlU2l6ZSAqIHMucGFyYW1zLmNvdmVyZmxvdy5tb2RpZmllcjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRlWSA9IHMuaXNIb3Jpem9udGFsKCkgPyByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3RhdGVYID0gcy5pc0hvcml6b250YWwoKSA/IDAgOiByb3RhdGUgKiBvZmZzZXRNdWx0aXBsaWVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdmFyIHJvdGF0ZVogPSAwXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlWiA9IC10cmFuc2xhdGUgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlWSA9IHMuaXNIb3Jpem9udGFsKCkgPyAwIDogcy5wYXJhbXMuY292ZXJmbG93LnN0cmV0Y2ggKiAob2Zmc2V0TXVsdGlwbGllcik7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlWCA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLnBhcmFtcy5jb3ZlcmZsb3cuc3RyZXRjaCAqIChvZmZzZXRNdWx0aXBsaWVyKSA6IDA7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgLy9GaXggZm9yIHVsdHJhIHNtYWxsIHZhbHVlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVgpIDwgMC4wMDEpIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVkpIDwgMC4wMDEpIHRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVopIDwgMC4wMDEpIHRyYW5zbGF0ZVogPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVkpIDwgMC4wMDEpIHJvdGF0ZVkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVgpIDwgMC4wMDEpIHJvdGF0ZVggPSAwO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZVRyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdHJhbnNsYXRlWCArICdweCwnICsgdHJhbnNsYXRlWSArICdweCwnICsgdHJhbnNsYXRlWiArICdweCkgIHJvdGF0ZVgoJyArIHJvdGF0ZVggKyAnZGVnKSByb3RhdGVZKCcgKyByb3RhdGVZICsgJ2RlZyknO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnRyYW5zZm9ybShzbGlkZVRyYW5zZm9ybSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChvZmZzZXRNdWx0aXBsaWVyKSkgKyAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNvdmVyZmxvdy5zbGlkZVNoYWRvd3MpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL1NldCBzaGFkb3dzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0JlZm9yZSA9IHMuaXNIb3Jpem9udGFsKCkgPyBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hhZG93QWZ0ZXIgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0JlZm9yZSA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LScgKyAocy5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0JlZm9yZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93QWZ0ZXIgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAncmlnaHQnIDogJ2JvdHRvbScpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5hcHBlbmQoc2hhZG93QWZ0ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCkgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBvZmZzZXRNdWx0aXBsaWVyID4gMCA/IG9mZnNldE11bHRpcGxpZXIgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGgpIHNoYWRvd0FmdGVyWzBdLnN0eWxlLm9wYWNpdHkgPSAoLW9mZnNldE11bHRpcGxpZXIpID4gMCA/IC1vZmZzZXRNdWx0aXBsaWVyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy9TZXQgY29ycmVjdCBwZXJzcGVjdGl2ZSBmb3IgSUUxMFxuICAgICAgICAgICAgICAgICAgICBpZiAocy5icm93c2VyLmllKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd3MgPSBzLndyYXBwZXJbMF0uc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB3cy5wZXJzcGVjdGl2ZU9yaWdpbiA9IGNlbnRlciArICdweCA1MCUnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMudHJhbnNpdGlvbihkdXJhdGlvbikuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEltYWdlcyBMYXp5IExvYWRpbmdcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmxhenkgPSB7XG4gICAgICAgICAgICBpbml0aWFsSW1hZ2VMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgICAgbG9hZEltYWdlSW5TbGlkZTogZnVuY3Rpb24gKGluZGV4LCBsb2FkSW5EdXBsaWNhdGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbG9hZEluRHVwbGljYXRlID09PSAndW5kZWZpbmVkJykgbG9hZEluRHVwbGljYXRlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKGluZGV4KTtcbiAgICAgICAgICAgICAgICB2YXIgaW1nID0gc2xpZGUuZmluZCgnLicgKyBzLnBhcmFtcy5sYXp5TG9hZGluZ0NsYXNzICsgJzpub3QoLicgKyBzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGVkQ2xhc3MgKyAnKTpub3QoLicgKyBzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGluZ0NsYXNzICsgJyknKTtcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMubGF6eUxvYWRpbmdDbGFzcykgJiYgIXNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLmxhenlTdGF0dXNMb2FkZWRDbGFzcykgJiYgIXNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLmxhenlTdGF0dXNMb2FkaW5nQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIGltZyA9IGltZy5hZGQoc2xpZGVbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaW1nLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpbWcuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfaW1nID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgX2ltZy5hZGRDbGFzcyhzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGluZ0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJhY2tncm91bmQgPSBfaW1nLmF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3JjID0gX2ltZy5hdHRyKCdkYXRhLXNyYycpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Jjc2V0ID0gX2ltZy5hdHRyKCdkYXRhLXNyY3NldCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZXMgPSBfaW1nLmF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgcy5sb2FkSW1hZ2UoX2ltZ1swXSwgKHNyYyB8fCBiYWNrZ3JvdW5kKSwgc3Jjc2V0LCBzaXplcywgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChiYWNrZ3JvdW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCAndXJsKFwiJyArIGJhY2tncm91bmQgKyAnXCIpJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5yZW1vdmVBdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmNzZXQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5hdHRyKCdzcmNzZXQnLCBzcmNzZXQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLnJlbW92ZUF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLmF0dHIoJ3NpemVzJywgc2l6ZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLnJlbW92ZUF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLmF0dHIoJ3NyYycsIHNyYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcucmVtb3ZlQXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcuYWRkQ2xhc3Mocy5wYXJhbXMubGF6eVN0YXR1c0xvYWRlZENsYXNzKS5yZW1vdmVDbGFzcyhzLnBhcmFtcy5sYXp5U3RhdHVzTG9hZGluZ0NsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmZpbmQoJy4nICsgcy5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzICsgJywgLicgKyBzLnBhcmFtcy5wcmVsb2FkZXJDbGFzcykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCAmJiBsb2FkSW5EdXBsaWNhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVPcmlnaW5hbEluZGV4ID0gc2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9yaWdpbmFsU2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBzbGlkZU9yaWdpbmFsSW5kZXggKyAnXCJdOm5vdCguJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZEltYWdlSW5TbGlkZShvcmlnaW5hbFNsaWRlLmluZGV4KCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkdXBsaWNhdGVkU2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgc2xpZGVPcmlnaW5hbEluZGV4ICsgJ1wiXScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZEltYWdlSW5TbGlkZShkdXBsaWNhdGVkU2xpZGUuaW5kZXgoKSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25MYXp5SW1hZ2VSZWFkeScsIHMsIHNsaWRlWzBdLCBfaW1nWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uTGF6eUltYWdlTG9hZCcsIHMsIHNsaWRlWzBdLCBfaW1nWzBdKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbG9hZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZXNQZXJWaWV3ID0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXcgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpIHMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKCQodGhpcykuaW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBzLmFjdGl2ZUluZGV4OyBpIDwgcy5hY3RpdmVJbmRleCArIHNsaWRlc1BlclZpZXcgOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaV0pIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxhenlMb2FkaW5nSW5QcmV2TmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVzUGVyVmlldyA+IDEgfHwgKHMucGFyYW1zLmxhenlMb2FkaW5nSW5QcmV2TmV4dEFtb3VudCAmJiBzLnBhcmFtcy5sYXp5TG9hZGluZ0luUHJldk5leHRBbW91bnQgPiAxKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGFtb3VudCA9IHMucGFyYW1zLmxhenlMb2FkaW5nSW5QcmV2TmV4dEFtb3VudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzcHYgPSBzbGlkZXNQZXJWaWV3O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heEluZGV4ID0gTWF0aC5taW4ocy5hY3RpdmVJbmRleCArIHNwdiArIE1hdGgubWF4KGFtb3VudCwgc3B2KSwgcy5zbGlkZXMubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtaW5JbmRleCA9IE1hdGgubWF4KHMuYWN0aXZlSW5kZXggLSBNYXRoLm1heChzcHYsIGFtb3VudCksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTmV4dCBTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IHMuYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpIDwgbWF4SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpXSkgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2IFNsaWRlc1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gbWluSW5kZXg7IGkgPCBzLmFjdGl2ZUluZGV4IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzW2ldKSBzLmxhenkubG9hZEltYWdlSW5TbGlkZShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuZXh0U2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZS5sZW5ndGggPiAwKSBzLmxhenkubG9hZEltYWdlSW5TbGlkZShuZXh0U2xpZGUuaW5kZXgoKSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZTbGlkZSA9IHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJldlNsaWRlLmxlbmd0aCA+IDApIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKHByZXZTbGlkZS5pbmRleCgpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRyYW5zaXRpb25TdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubGF6eUxvYWRpbmdPblRyYW5zaXRpb25TdGFydCB8fCAoIXMucGFyYW1zLmxhenlMb2FkaW5nT25UcmFuc2l0aW9uU3RhcnQgJiYgIXMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZyAmJiAhcy5wYXJhbXMubGF6eUxvYWRpbmdPblRyYW5zaXRpb25TdGFydCkge1xuICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgU2Nyb2xsYmFyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5zY3JvbGxiYXIgPSB7XG4gICAgICAgICAgICBpc1RvdWNoZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBzYiA9IHMuc2Nyb2xsYmFyO1xuICAgICAgICAgICAgICAgIHZhciB4ID0gMCwgeSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICB2YXIgcG9pbnRlclBvc2l0aW9uID0gcy5pc0hvcml6b250YWwoKSA/XG4gICAgICAgICAgICAgICAgICAgICgoZS50eXBlID09PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2htb3ZlJykgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYIHx8IGUuY2xpZW50WCkgOlxuICAgICAgICAgICAgICAgICAgICAoKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScpID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWSB8fCBlLmNsaWVudFkpIDtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSAocG9pbnRlclBvc2l0aW9uKSAtIHNiLnRyYWNrLm9mZnNldCgpW3MuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJ10gLSBzYi5kcmFnU2l6ZSAvIDI7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uTWluID0gLXMubWluVHJhbnNsYXRlKCkgKiBzYi5tb3ZlRGl2aWRlcjtcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb25NYXggPSAtcy5tYXhUcmFuc2xhdGUoKSAqIHNiLm1vdmVEaXZpZGVyO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8IHBvc2l0aW9uTWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25NaW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBvc2l0aW9uID4gcG9zaXRpb25NYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb24gPSBwb3NpdGlvbk1heDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSAtcG9zaXRpb24gLyBzYi5tb3ZlRGl2aWRlcjtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUocG9zaXRpb24sIHRydWUpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdTdGFydDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICBzYi5pc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBzYi5zZXREcmFnUG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNiLmRyYWdUaW1lb3V0KTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgc2IudHJhY2sudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFjay5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb24oMTAwKTtcbiAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zaXRpb24oMTAwKTtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsYmFyRHJhZ1N0YXJ0Jywgcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZ01vdmU6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgaWYgKCFzYi5pc1RvdWNoZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNiLnNldERyYWdQb3NpdGlvbihlKTtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBzYi50cmFjay50cmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsYmFyRHJhZ01vdmUnLCBzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnRW5kOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBzYiA9IHMuc2Nyb2xsYmFyO1xuICAgICAgICAgICAgICAgIGlmICghc2IuaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgc2IuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNiLmRyYWdUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrLmNzcygnb3BhY2l0eScsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2IudHJhY2sudHJhbnNpdGlvbig0MDApO1xuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TY3JvbGxiYXJEcmFnRW5kJywgcyk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhclNuYXBPblJlbGVhc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdnYWJsZUV2ZW50czogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoKHMucGFyYW1zLnNpbXVsYXRlVG91Y2ggPT09IGZhbHNlICYmICFzLnN1cHBvcnQudG91Y2gpKSByZXR1cm4gcy50b3VjaEV2ZW50c0Rlc2t0b3A7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gcy50b3VjaEV2ZW50cztcbiAgICAgICAgICAgIH0pKCksXG4gICAgICAgICAgICBlbmFibGVEcmFnZ2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5zdXBwb3J0LnRvdWNoID8gc2IudHJhY2sgOiBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAkKHNiLnRyYWNrKS5vbihzYi5kcmFnZ2FibGVFdmVudHMuc3RhcnQsIHNiLmRyYWdTdGFydCk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9uKHNiLmRyYWdnYWJsZUV2ZW50cy5tb3ZlLCBzYi5kcmFnTW92ZSk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9uKHNiLmRyYWdnYWJsZUV2ZW50cy5lbmQsIHNiLmRyYWdFbmQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2FibGVEcmFnZ2FibGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5zdXBwb3J0LnRvdWNoID8gc2IudHJhY2sgOiBkb2N1bWVudDtcbiAgICAgICAgICAgICAgICAkKHNiLnRyYWNrKS5vZmYocy5kcmFnZ2FibGVFdmVudHMuc3RhcnQsIHNiLmRyYWdTdGFydCk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9mZihzLmRyYWdnYWJsZUV2ZW50cy5tb3ZlLCBzYi5kcmFnTW92ZSk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9mZihzLmRyYWdnYWJsZUV2ZW50cy5lbmQsIHNiLmRyYWdFbmQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2Nyb2xsYmFyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgc2IudHJhY2sgPSAkKHMucGFyYW1zLnNjcm9sbGJhcik7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBzLnBhcmFtcy5zY3JvbGxiYXIgPT09ICdzdHJpbmcnICYmIHNiLnRyYWNrLmxlbmd0aCA+IDEgJiYgcy5jb250YWluZXIuZmluZChzLnBhcmFtcy5zY3JvbGxiYXIpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFjayA9IHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMuc2Nyb2xsYmFyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2IuZHJhZyA9IHNiLnRyYWNrLmZpbmQoJy5zd2lwZXItc2Nyb2xsYmFyLWRyYWcnKTtcbiAgICAgICAgICAgICAgICBpZiAoc2IuZHJhZy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZyA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItc2Nyb2xsYmFyLWRyYWdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2suYXBwZW5kKHNiLmRyYWcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzYi5kcmFnWzBdLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgICAgICAgICAgICBzYi50cmFja1NpemUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2IudHJhY2tbMF0ub2Zmc2V0V2lkdGggOiBzYi50cmFja1swXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHNiLmRpdmlkZXIgPSBzLnNpemUgLyBzLnZpcnR1YWxTaXplO1xuICAgICAgICAgICAgICAgIHNiLm1vdmVEaXZpZGVyID0gc2IuZGl2aWRlciAqIChzYi50cmFja1NpemUgLyBzLnNpemUpO1xuICAgICAgICAgICAgICAgIHNiLmRyYWdTaXplID0gc2IudHJhY2tTaXplICogc2IuZGl2aWRlcjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS53aWR0aCA9IHNiLmRyYWdTaXplICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNiLmRyYWdbMF0uc3R5bGUuaGVpZ2h0ID0gc2IuZHJhZ1NpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNiLmRpdmlkZXIgPj0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2tbMF0uc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5zY3JvbGxiYXIpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgZGlmZjtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gcy50cmFuc2xhdGUgfHwgMDtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgbmV3U2l6ZSA9IHNiLmRyYWdTaXplO1xuICAgICAgICAgICAgICAgIG5ld1BvcyA9IChzYi50cmFja1NpemUgLSBzYi5kcmFnU2l6ZSkgKiBzLnByb2dyZXNzO1xuICAgICAgICAgICAgICAgIGlmIChzLnJ0bCAmJiBzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1BvcyA9IC1uZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdQb3MgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gc2IuZHJhZ1NpemUgLSBuZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKC1uZXdQb3MgKyBzYi5kcmFnU2l6ZSA+IHNiLnRyYWNrU2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2l6ZSA9IHNiLnRyYWNrU2l6ZSArIG5ld1BvcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1BvcyA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBzYi5kcmFnU2l6ZSArIG5ld1BvcztcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3UG9zICsgc2IuZHJhZ1NpemUgPiBzYi50cmFja1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBzYi50cmFja1NpemUgLSBuZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgKG5ld1BvcykgKyAncHgsIDAsIDApJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zZm9ybSgndHJhbnNsYXRlWCgnICsgKG5ld1BvcykgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS53aWR0aCA9IG5ld1NpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50cmFuc2Zvcm1zM2QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwcHgsICcgKyAobmV3UG9zKSArICdweCwgMCknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLmRyYWcudHJhbnNmb3JtKCd0cmFuc2xhdGVZKCcgKyAobmV3UG9zKSArICdweCknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzYi5kcmFnWzBdLnN0eWxlLmhlaWdodCA9IG5ld1NpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFySGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQoc2IudGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrWzBdLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgICAgICAgICAgICAgICBzYi50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrLnRyYW5zaXRpb24oNDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2Nyb2xsYmFyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuZHJhZy50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBDb250cm9sbGVyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5jb250cm9sbGVyID0ge1xuICAgICAgICAgICAgTGluZWFyU3BsaW5lOiBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbmRleCA9IHgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAvLyBHaXZlbiBhbiB4IHZhbHVlICh4MiksIHJldHVybiB0aGUgZXhwZWN0ZWQgeTIgdmFsdWU6XG4gICAgICAgICAgICAgICAgLy8gKHgxLHkxKSBpcyB0aGUga25vd24gcG9pbnQgYmVmb3JlIGdpdmVuIHZhbHVlLFxuICAgICAgICAgICAgICAgIC8vICh4Myx5MykgaXMgdGhlIGtub3duIHBvaW50IGFmdGVyIGdpdmVuIHZhbHVlLlxuICAgICAgICAgICAgICAgIHZhciBpMSwgaTM7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSB0aGlzLngubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmludGVycG9sYXRlID0gZnVuY3Rpb24gKHgyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgheDIpIHJldHVybiAwO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleGVzIG9mIHgxIGFuZCB4MyAodGhlIGFycmF5IGluZGV4ZXMgYmVmb3JlIGFuZCBhZnRlciBnaXZlbiB4Mik6XG4gICAgICAgICAgICAgICAgICAgIGkzID0gYmluYXJ5U2VhcmNoKHRoaXMueCwgeDIpO1xuICAgICAgICAgICAgICAgICAgICBpMSA9IGkzIC0gMTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgb3VyIGluZGV4ZXMgaTEgJiBpMywgc28gd2UgY2FuIGNhbGN1bGF0ZSBhbHJlYWR5OlxuICAgICAgICAgICAgICAgICAgICAvLyB5MiA6PSAoKHgy4oiSeDEpIMOXICh5M+KIknkxKSkgw7cgKHgz4oiSeDEpICsgeTFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoeDIgLSB0aGlzLnhbaTFdKSAqICh0aGlzLnlbaTNdIC0gdGhpcy55W2kxXSkpIC8gKHRoaXMueFtpM10gLSB0aGlzLnhbaTFdKSArIHRoaXMueVtpMV07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIGJpbmFyeVNlYXJjaCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heEluZGV4LCBtaW5JbmRleCwgZ3Vlc3M7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5JbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SW5kZXggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobWF4SW5kZXggLSBtaW5JbmRleCA+IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5W2d1ZXNzID0gbWF4SW5kZXggKyBtaW5JbmRleCA+PiAxXSA8PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSW5kZXggPSBndWVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhJbmRleCA9IGd1ZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8veHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xuICAgICAgICAgICAgZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbjogZnVuY3Rpb24oYyl7XG4gICAgICAgICAgICAgICAgaWYoIXMuY29udHJvbGxlci5zcGxpbmUpIHMuY29udHJvbGxlci5zcGxpbmUgPSBzLnBhcmFtcy5sb29wID9cbiAgICAgICAgICAgICAgICAgICAgbmV3IHMuY29udHJvbGxlci5MaW5lYXJTcGxpbmUocy5zbGlkZXNHcmlkLCBjLnNsaWRlc0dyaWQpIDpcbiAgICAgICAgICAgICAgICAgICAgbmV3IHMuY29udHJvbGxlci5MaW5lYXJTcGxpbmUocy5zbmFwR3JpZCwgYy5zbmFwR3JpZCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgIHZhciBjb250cm9sbGVkID0gcy5wYXJhbXMuY29udHJvbDtcbiAgICAgICAgICAgICAgIHZhciBtdWx0aXBsaWVyLCBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHRoaXMgd2lsbCBjcmVhdGUgYW4gSW50ZXJwb2xhdGUgZnVuY3Rpb24gYmFzZWQgb24gdGhlIHNuYXBHcmlkc1xuICAgICAgICAgICAgICAgICAgICAvLyB4IGlzIHRoZSBHcmlkIG9mIHRoZSBzY3JvbGxlZCBzY3JvbGxlciBhbmQgeSB3aWxsIGJlIHRoZSBjb250cm9sbGVkIHNjcm9sbGVyXG4gICAgICAgICAgICAgICAgICAgIC8vIGl0IG1ha2VzIHNlbnNlIHRvIGNyZWF0ZSB0aGlzIG9ubHkgb25jZSBhbmQgcmVjYWxsIGl0IGZvciB0aGUgaW50ZXJwb2xhdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyB0aGUgZnVuY3Rpb24gZG9lcyBhIGxvdCBvZiB2YWx1ZSBjYWNoaW5nIGZvciBwZXJmb3JtYW5jZVxuICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGUgPSBjLnJ0bCAmJiBjLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/IC1zLnRyYW5zbGF0ZSA6IHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY29udHJvbEJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbihjKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGkgYW0gbm90IHN1cmUgd2h5IHRoZSB2YWx1ZXMgaGF2ZSB0byBiZSBtdWx0aXBsaWNhdGVkIHRoaXMgd2F5LCB0cmllZCB0byBpbnZlcnQgdGhlIHNuYXBHcmlkXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBidXQgaXQgZGlkIG5vdCB3b3JrIG91dFxuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IC1zLmNvbnRyb2xsZXIuc3BsaW5lLmludGVycG9sYXRlKC10cmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZighY29udHJvbGxlZFRyYW5zbGF0ZSB8fCBzLnBhcmFtcy5jb250cm9sQnkgPT09ICdjb250YWluZXInKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAoYy5tYXhUcmFuc2xhdGUoKSAtIGMubWluVHJhbnNsYXRlKCkpIC8gKHMubWF4VHJhbnNsYXRlKCkgLSBzLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSAodHJhbnNsYXRlIC0gcy5taW5UcmFuc2xhdGUoKSkgKiBtdWx0aXBsaWVyICsgYy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNvbnRyb2xJbnZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gYy5tYXhUcmFuc2xhdGUoKSAtIGNvbnRyb2xsZWRUcmFuc2xhdGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYy51cGRhdGVQcm9ncmVzcyhjb250cm9sbGVkVHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgYy5zZXRXcmFwcGVyVHJhbnNsYXRlKGNvbnRyb2xsZWRUcmFuc2xhdGUsIGZhbHNlLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgYy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgaWYgKHMuaXNBcnJheShjb250cm9sbGVkKSkge1xuICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udHJvbGxlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29udHJvbGxlZFtpXSAhPT0gYnlDb250cm9sbGVyICYmIGNvbnRyb2xsZWRbaV0gaW5zdGFuY2VvZiBTd2lwZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICBlbHNlIGlmIChjb250cm9sbGVkIGluc3RhbmNlb2YgU3dpcGVyICYmIGJ5Q29udHJvbGxlciAhPT0gY29udHJvbGxlZCkge1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNsYXRlKGNvbnRyb2xsZWQpO1xuICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRyb2xsZWQgPSBzLnBhcmFtcy5jb250cm9sO1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2l0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgYy5zZXRXcmFwcGVyVHJhbnNpdGlvbihkdXJhdGlvbiwgcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYy5vblRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYy53cmFwcGVyLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRyb2xsZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoYy5wYXJhbXMubG9vcCAmJiBzLnBhcmFtcy5jb250cm9sQnkgPT09ICdzbGlkZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGMub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNBcnJheShjb250cm9sbGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udHJvbGxlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEhhc2ggTmF2aWdhdGlvblxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuaGFzaG5hdiA9IHtcbiAgICAgICAgICAgIG9uSGFzaENhbmdlOiBmdW5jdGlvbiAoZSwgYSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdIYXNoID0gZG9jdW1lbnQubG9jYXRpb24uaGFzaC5yZXBsYWNlKCcjJywgJycpO1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVTbGlkZUhhc2ggPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKTtcbiAgICAgICAgICAgICAgICBpZiAobmV3SGFzaCAhPT0gYWN0aXZlU2xpZGVIYXNoKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICdbZGF0YS1oYXNoPVwiJyArIChuZXdIYXNoKSArICdcIl0nKS5pbmRleCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXR0YWNoRXZlbnRzOiBmdW5jdGlvbiAoZGV0YWNoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGRldGFjaCA/ICdvZmYnIDogJ29uJztcbiAgICAgICAgICAgICAgICAkKHdpbmRvdylbYWN0aW9uXSgnaGFzaGNoYW5nZScsIHMuaGFzaG5hdi5vbkhhc2hDYW5nZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5oYXNobmF2LmluaXRpYWxpemVkIHx8ICFzLnBhcmFtcy5oYXNobmF2KSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJlcGxhY2VTdGF0ZSAmJiB3aW5kb3cuaGlzdG9yeSAmJiB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIG51bGwsICgnIycgKyBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKSB8fCAnJykpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5sb2NhdGlvbi5oYXNoID0gaGFzaCB8fCAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuaGFzaG5hdiB8fCBzLnBhcmFtcy5oaXN0b3J5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgcy5oYXNobmF2LmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgaGFzaCA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgICAgICAgICBpZiAoIWhhc2gpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgc3BlZWQgPSAwO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBzLnNsaWRlcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlSGFzaCA9IHNsaWRlLmF0dHIoJ2RhdGEtaGFzaCcpIHx8IHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGVIYXNoID09PSBoYXNoICYmICFzbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhhc2huYXZXYXRjaFN0YXRlKSBzLmhhc2huYXYuYXR0YWNoRXZlbnRzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2V2F0Y2hTdGF0ZSkgcy5oYXNobmF2LmF0dGFjaEV2ZW50cyh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBIaXN0b3J5IEFwaSB3aXRoIGZhbGxiYWNrIHRvIEhhc2huYXZcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmhpc3RvcnkgPSB7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5oaXN0b3J5KSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cuaGlzdG9yeSB8fCAhd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucGFyYW1zLmhpc3RvcnkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcy5wYXJhbXMuaGFzaG5hdiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy5oaXN0b3J5LmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLnBhdGhzID0gdGhpcy5nZXRQYXRoVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnBhdGhzLmtleSAmJiAhdGhpcy5wYXRocy52YWx1ZSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMuc2Nyb2xsVG9TbGlkZSgwLCB0aGlzLnBhdGhzLnZhbHVlLCBzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHRoaXMuc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGlzdG9yeVBvcFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzLmhpc3RvcnkucGF0aHMgPSBzLmhpc3RvcnkuZ2V0UGF0aFZhbHVlcygpO1xuICAgICAgICAgICAgICAgIHMuaGlzdG9yeS5zY3JvbGxUb1NsaWRlKHMucGFyYW1zLnNwZWVkLCBzLmhpc3RvcnkucGF0aHMudmFsdWUsIGZhbHNlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXRQYXRoVmFsdWVzOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aEFycmF5ID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLnNsaWNlKDEpLnNwbGl0KCcvJyk7XG4gICAgICAgICAgICAgICAgdmFyIHRvdGFsID0gcGF0aEFycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gcGF0aEFycmF5W3RvdGFsIC0gMl07XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gcGF0aEFycmF5W3RvdGFsIC0gMV07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhpc3Rvcnk6IGZ1bmN0aW9uIChrZXksIGluZGV4KSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzLmhpc3RvcnkuaW5pdGlhbGl6ZWQgfHwgIXMucGFyYW1zLmhpc3RvcnkpIHJldHVybjtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpbmRleCk7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zbHVnaWZ5KHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpKTtcbiAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZS5pbmNsdWRlcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0ga2V5ICsgJy8nICsgdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKG51bGwsIG51bGwsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgbnVsbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzbHVnaWZ5OiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRleHQudG9TdHJpbmcoKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHMrL2csICctJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1teXFx3XFwtXSsvZywgJycpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXC1cXC0rL2csICctJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL14tKy8sICcnKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvLSskLywgJycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNjcm9sbFRvU2xpZGU6IGZ1bmN0aW9uKHNwZWVkLCB2YWx1ZSwgcnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBzLnNsaWRlcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVIaXN0b3J5ID0gdGhpcy5zbHVnaWZ5KHNsaWRlLmF0dHIoJ2RhdGEtaGlzdG9yeScpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZUhpc3RvcnkgPT09IHZhbHVlICYmICFzbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHNsaWRlLmluZGV4KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbygwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgS2V5Ym9hcmQgQ29udHJvbFxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUtleWJvYXJkKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7IC8vanF1ZXJ5IGZpeFxuICAgICAgICAgICAgdmFyIGtjID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG4gICAgICAgICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgJiYgKHMuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM5IHx8ICFzLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSA0MCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgJiYgKHMuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM3IHx8ICFzLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSAzOCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZSAmJiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSB8fCBrYyA9PT0gMzggfHwga2MgPT09IDQwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluVmlldyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vQ2hlY2sgdGhhdCBzd2lwZXIgc2hvdWxkIGJlIGluc2lkZSBvZiB2aXNpYmxlIGFyZWEgb2Ygd2luZG93XG4gICAgICAgICAgICAgICAgaWYgKHMuY29udGFpbmVyLnBhcmVudHMoJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcykubGVuZ3RoID4gMCAmJiBzLmNvbnRhaW5lci5wYXJlbnRzKCcuJyArIHMucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dTY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlck9mZnNldCA9IHMuY29udGFpbmVyLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkgc3dpcGVyT2Zmc2V0LmxlZnQgPSBzd2lwZXJPZmZzZXQubGVmdCAtIHMuY29udGFpbmVyWzBdLnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlckNvb3JkID0gW1xuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3BdLFxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSxcbiAgICAgICAgICAgICAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgcy5oZWlnaHRdLFxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wICsgcy5oZWlnaHRdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN3aXBlckNvb3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IHN3aXBlckNvb3JkW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFswXSA+PSB3aW5kb3dTY3JvbGwubGVmdCAmJiBwb2ludFswXSA8PSB3aW5kb3dTY3JvbGwubGVmdCArIHdpbmRvd1dpZHRoICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFsxXSA+PSB3aW5kb3dTY3JvbGwudG9wICYmIHBvaW50WzFdIDw9IHdpbmRvd1Njcm9sbC50b3AgKyB3aW5kb3dIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWluVmlldykgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChrYyA9PT0gMzkgJiYgIXMucnRsKSB8fCAoa2MgPT09IDM3ICYmIHMucnRsKSkgcy5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoKGtjID09PSAzNyAmJiAhcy5ydGwpIHx8IChrYyA9PT0gMzkgJiYgcy5ydGwpKSBzLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSAzOCB8fCBrYyA9PT0gNDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrYyA9PT0gNDApIHMuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSAzOCkgcy5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzLmRpc2FibGVLZXlib2FyZENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5rZXlib2FyZENvbnRyb2wgPSBmYWxzZTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bicsIGhhbmRsZUtleWJvYXJkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5lbmFibGVLZXlib2FyZENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5rZXlib2FyZENvbnRyb2wgPSB0cnVlO1xuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleWRvd24nLCBoYW5kbGVLZXlib2FyZCk7XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIE1vdXNld2hlZWwgQ29udHJvbFxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMubW91c2V3aGVlbCA9IHtcbiAgICAgICAgICAgIGV2ZW50OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lOiAobmV3IHdpbmRvdy5EYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICB9O1xuICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbENvbnRyb2wpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGJlc3QgY29tYmluYXRpb24gaWYgeW91IHByZWZlciBzcGluWCArIHNwaW5ZIG5vcm1hbGl6YXRpb24uICBJdCBmYXZvcnNcbiAgICAgICAgICAgICAqIHRoZSBvbGRlciBET01Nb3VzZVNjcm9sbCBmb3IgRmlyZWZveCwgYXMgRkYgZG9lcyBub3QgaW5jbHVkZSB3aGVlbERlbHRhIHdpdGhcbiAgICAgICAgICAgICAqICd3aGVlbCcgZXZlbnQsIG1ha2luZyBzcGluIHNwZWVkIGRldGVybWluYXRpb24gaW1wb3NzaWJsZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcy5tb3VzZXdoZWVsLmV2ZW50ID0gKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpID4gLTEpID9cbiAgICAgICAgICAgICAgICAnRE9NTW91c2VTY3JvbGwnIDpcbiAgICAgICAgICAgICAgICBpc0V2ZW50U3VwcG9ydGVkKCkgP1xuICAgICAgICAgICAgICAgICAgICAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBpc0V2ZW50U3VwcG9ydGVkKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9ICdvbndoZWVsJztcbiAgICAgICAgICAgIHZhciBpc1N1cHBvcnRlZCA9IGV2ZW50TmFtZSBpbiBkb2N1bWVudDtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShldmVudE5hbWUsICdyZXR1cm47Jyk7XG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZWxlbWVudFtldmVudE5hbWVdID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNTdXBwb3J0ZWQgJiZcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbiAmJlxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUgJiZcbiAgICAgICAgICAgICAgICAgICAgLy8gYWx3YXlzIHJldHVybnMgdHJ1ZSBpbiBuZXdlciBicm93c2VycyBhcyBwZXIgdGhlIHN0YW5kYXJkLlxuICAgICAgICAgICAgICAgICAgICAvLyBAc2VlIGh0dHA6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tZG9taW1wbGVtZW50YXRpb24taGFzZmVhdHVyZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJycsICcnKSAhPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBvbmx5IHdheSB0byB0ZXN0IHN1cHBvcnQgZm9yIHRoZSBgd2hlZWxgIGV2ZW50IGluIElFOSsuXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCdFdmVudHMud2hlZWwnLCAnMy4wJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGlzU3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVNb3VzZXdoZWVsKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7IC8vanF1ZXJ5IGZpeFxuICAgICAgICAgICAgdmFyIGRlbHRhID0gMDtcbiAgICAgICAgICAgIHZhciBydGxGYWN0b3IgPSBzLnJ0bCA/IC0xIDogMTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGF0YSA9IG5vcm1hbGl6ZVdoZWVsKCBlICk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxGb3JjZVRvQXhpcykge1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkpIGRlbHRhID0gZGF0YS5waXhlbFggKiBydGxGYWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxZKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxYKSkgZGVsdGEgPSBkYXRhLnBpeGVsWTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVsdGEgPSBNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkgPyAtIGRhdGEucGl4ZWxYICogcnRsRmFjdG9yIDogLSBkYXRhLnBpeGVsWTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoZGVsdGEgPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbEludmVydCkgZGVsdGEgPSAtZGVsdGE7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgICAgIGlmICgobmV3IHdpbmRvdy5EYXRlKCkpLmdldFRpbWUoKSAtIHMubW91c2V3aGVlbC5sYXN0U2Nyb2xsVGltZSA+IDYwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoIXMuaXNFbmQgfHwgcy5wYXJhbXMubG9vcCkgJiYgIXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsJywgcywgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsUmVsZWFzZU9uRWRnZXMpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCghcy5pc0JlZ2lubmluZyB8fCBzLnBhcmFtcy5sb29wKSAmJiAhcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TY3JvbGwnLCBzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxSZWxlYXNlT25FZGdlcykgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy5tb3VzZXdoZWVsLmxhc3RTY3JvbGxUaW1lID0gKG5ldyB3aW5kb3cuRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy9GcmVlbW9kZSBvciBzY3JvbGxDb250YWluZXI6XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gcy5nZXRXcmFwcGVyVHJhbnNsYXRlKCkgKyBkZWx0YSAqIHMucGFyYW1zLm1vdXNld2hlZWxTZW5zaXRpdml0eTtcbiAgICAgICAgICAgICAgICB2YXIgd2FzQmVnaW5uaW5nID0gcy5pc0JlZ2lubmluZyxcbiAgICAgICAgICAgICAgICAgICAgd2FzRW5kID0gcy5pc0VuZDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID49IHMubWluVHJhbnNsYXRlKCkpIHBvc2l0aW9uID0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPD0gcy5tYXhUcmFuc2xhdGUoKSkgcG9zaXRpb24gPSBzLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF3YXNCZWdpbm5pbmcgJiYgcy5pc0JlZ2lubmluZyB8fCAhd2FzRW5kICYmIHMuaXNFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHMubW91c2V3aGVlbC50aW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgcy5tb3VzZXdoZWVsLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVSZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICB9LCAzMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxhenlMb2FkaW5nICYmIHMubGF6eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBFbWl0IGV2ZW50XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblNjcm9sbCcsIHMsIGUpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBTdG9wIGF1dG9wbGF5XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9wbGF5ICYmIHMucGFyYW1zLmF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24pIHMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFJldHVybiBwYWdlIHNjcm9sbCBvbiBlZGdlIHBvc2l0aW9uc1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA9PT0gMCB8fCBwb3NpdGlvbiA9PT0gcy5tYXhUcmFuc2xhdGUoKSkgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBzLmRpc2FibGVNb3VzZXdoZWVsQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghcy5tb3VzZXdoZWVsLmV2ZW50KSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5jb250YWluZXI7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbEV2ZW50c1RhcmdlZCAhPT0gJ2NvbnRhaW5lcicpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXQgPSAkKHMucGFyYW1zLm1vdXNld2hlZWxFdmVudHNUYXJnZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFyZ2V0Lm9mZihzLm1vdXNld2hlZWwuZXZlbnQsIGhhbmRsZU1vdXNld2hlZWwpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLmVuYWJsZU1vdXNld2hlZWxDb250cm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzLm1vdXNld2hlZWwuZXZlbnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsRXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQocy5wYXJhbXMubW91c2V3aGVlbEV2ZW50c1RhcmdlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQub24ocy5tb3VzZXdoZWVsLmV2ZW50LCBoYW5kbGVNb3VzZXdoZWVsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyoqXG4gICAgICAgICAqIE1vdXNlIHdoZWVsIChhbmQgMi1maW5nZXIgdHJhY2twYWQpIHN1cHBvcnQgb24gdGhlIHdlYiBzdWNrcy4gIEl0IGlzXG4gICAgICAgICAqIGNvbXBsaWNhdGVkLCB0aHVzIHRoaXMgZG9jIGlzIGxvbmcgYW5kIChob3BlZnVsbHkpIGRldGFpbGVkIGVub3VnaCB0byBhbnN3ZXJcbiAgICAgICAgICogeW91ciBxdWVzdGlvbnMuXG4gICAgICAgICAqXG4gICAgICAgICAqIElmIHlvdSBuZWVkIHRvIHJlYWN0IHRvIHRoZSBtb3VzZSB3aGVlbCBpbiBhIHByZWRpY3RhYmxlIHdheSwgdGhpcyBjb2RlIGlzXG4gICAgICAgICAqIGxpa2UgeW91ciBiZXN0ZXN0IGZyaWVuZC4gKiBodWdzICpcbiAgICAgICAgICpcbiAgICAgICAgICogQXMgb2YgdG9kYXksIHRoZXJlIGFyZSA0IERPTSBldmVudCB0eXBlcyB5b3UgY2FuIGxpc3RlbiB0bzpcbiAgICAgICAgICpcbiAgICAgICAgICogICAnd2hlZWwnICAgICAgICAgICAgICAgIC0tIENocm9tZSgzMSspLCBGRigxNyspLCBJRSg5KylcbiAgICAgICAgICogICAnbW91c2V3aGVlbCcgICAgICAgICAgIC0tIENocm9tZSwgSUUoNispLCBPcGVyYSwgU2FmYXJpXG4gICAgICAgICAqICAgJ01vek1vdXNlUGl4ZWxTY3JvbGwnICAtLSBGRigzLjUgb25seSEpICgyMDEwLTIwMTMpIC0tIGRvbid0IGJvdGhlciFcbiAgICAgICAgICogICAnRE9NTW91c2VTY3JvbGwnICAgICAgIC0tIEZGKDAuOS43Kykgc2luY2UgMjAwM1xuICAgICAgICAgKlxuICAgICAgICAgKiBTbyB3aGF0IHRvIGRvPyAgVGhlIGlzIHRoZSBiZXN0OlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIG5vcm1hbGl6ZVdoZWVsLmdldEV2ZW50VHlwZSgpO1xuICAgICAgICAgKlxuICAgICAgICAgKiBJbiB5b3VyIGV2ZW50IGNhbGxiYWNrLCB1c2UgdGhpcyBjb2RlIHRvIGdldCBzYW5lIGludGVycHJldGF0aW9uIG9mIHRoZVxuICAgICAgICAgKiBkZWx0YXMuICBUaGlzIGNvZGUgd2lsbCByZXR1cm4gYW4gb2JqZWN0IHdpdGggcHJvcGVydGllczpcbiAgICAgICAgICpcbiAgICAgICAgICogICBzcGluWCAgIC0tIG5vcm1hbGl6ZWQgc3BpbiBzcGVlZCAodXNlIGZvciB6b29tKSAtIHggcGxhbmVcbiAgICAgICAgICogICBzcGluWSAgIC0tIFwiIC0geSBwbGFuZVxuICAgICAgICAgKiAgIHBpeGVsWCAgLS0gbm9ybWFsaXplZCBkaXN0YW5jZSAodG8gcGl4ZWxzKSAtIHggcGxhbmVcbiAgICAgICAgICogICBwaXhlbFkgIC0tIFwiIC0geSBwbGFuZVxuICAgICAgICAgKlxuICAgICAgICAgKiBXaGVlbCB2YWx1ZXMgYXJlIHByb3ZpZGVkIGJ5IHRoZSBicm93c2VyIGFzc3VtaW5nIHlvdSBhcmUgdXNpbmcgdGhlIHdoZWVsIHRvXG4gICAgICAgICAqIHNjcm9sbCBhIHdlYiBwYWdlIGJ5IGEgbnVtYmVyIG9mIGxpbmVzIG9yIHBpeGVscyAob3IgcGFnZXMpLiAgVmFsdWVzIGNhbiB2YXJ5XG4gICAgICAgICAqIHNpZ25pZmljYW50bHkgb24gZGlmZmVyZW50IHBsYXRmb3JtcyBhbmQgYnJvd3NlcnMsIGZvcmdldHRpbmcgdGhhdCB5b3UgY2FuXG4gICAgICAgICAqIHNjcm9sbCBhdCBkaWZmZXJlbnQgc3BlZWRzLiAgU29tZSBkZXZpY2VzIChsaWtlIHRyYWNrcGFkcykgZW1pdCBtb3JlIGV2ZW50c1xuICAgICAgICAgKiBhdCBzbWFsbGVyIGluY3JlbWVudHMgd2l0aCBmaW5lIGdyYW51bGFyaXR5LCBhbmQgc29tZSBlbWl0IG1hc3NpdmUganVtcHMgd2l0aFxuICAgICAgICAgKiBsaW5lYXIgc3BlZWQgb3IgYWNjZWxlcmF0aW9uLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGlzIGNvZGUgZG9lcyBpdHMgYmVzdCB0byBub3JtYWxpemUgdGhlIGRlbHRhcyBmb3IgeW91OlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIC0gc3BpbiBpcyB0cnlpbmcgdG8gbm9ybWFsaXplIGhvdyBmYXIgdGhlIHdoZWVsIHdhcyBzcHVuIChvciB0cmFja3BhZFxuICAgICAgICAgKiAgICAgZHJhZ2dlZCkuICBUaGlzIGlzIHN1cGVyIHVzZWZ1bCBmb3Igem9vbSBzdXBwb3J0IHdoZXJlIHlvdSB3YW50IHRvXG4gICAgICAgICAqICAgICB0aHJvdyBhd2F5IHRoZSBjaHVua3kgc2Nyb2xsIHN0ZXBzIG9uIHRoZSBQQyBhbmQgbWFrZSB0aG9zZSBlcXVhbCB0b1xuICAgICAgICAgKiAgICAgdGhlIHNsb3cgYW5kIHNtb290aCB0aW55IHN0ZXBzIG9uIHRoZSBNYWMuIEtleSBkYXRhOiBUaGlzIGNvZGUgdHJpZXMgdG9cbiAgICAgICAgICogICAgIHJlc29sdmUgYSBzaW5nbGUgc2xvdyBzdGVwIG9uIGEgd2hlZWwgdG8gMS5cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHBpeGVsIGlzIG5vcm1hbGl6aW5nIHRoZSBkZXNpcmVkIHNjcm9sbCBkZWx0YSBpbiBwaXhlbCB1bml0cy4gIFlvdSdsbFxuICAgICAgICAgKiAgICAgZ2V0IHRoZSBjcmF6eSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGJyb3dzZXJzLCBidXQgYXQgbGVhc3QgaXQnbGwgYmUgaW5cbiAgICAgICAgICogICAgIHBpeGVscyFcbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHBvc2l0aXZlIHZhbHVlIGluZGljYXRlcyBzY3JvbGxpbmcgRE9XTi9SSUdIVCwgbmVnYXRpdmUgVVAvTEVGVC4gIFRoaXNcbiAgICAgICAgICogICAgIHNob3VsZCB0cmFuc2xhdGUgdG8gcG9zaXRpdmUgdmFsdWUgem9vbWluZyBJTiwgbmVnYXRpdmUgem9vbWluZyBPVVQuXG4gICAgICAgICAqICAgICBUaGlzIG1hdGNoZXMgdGhlIG5ld2VyICd3aGVlbCcgZXZlbnQuXG4gICAgICAgICAqXG4gICAgICAgICAqIFdoeSBhcmUgdGhlcmUgc3BpblgsIHNwaW5ZIChvciBwaXhlbHMpP1xuICAgICAgICAgKlxuICAgICAgICAgKiAgIC0gc3BpblggaXMgYSAyLWZpbmdlciBzaWRlIGRyYWcgb24gdGhlIHRyYWNrcGFkLCBhbmQgYSBzaGlmdCArIHdoZWVsIHR1cm5cbiAgICAgICAgICogICAgIHdpdGggYSBtb3VzZS4gIEl0IHJlc3VsdHMgaW4gc2lkZS1zY3JvbGxpbmcgaW4gdGhlIGJyb3dzZXIgYnkgZGVmYXVsdC5cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHNwaW5ZIGlzIHdoYXQgeW91IGV4cGVjdCAtLSBpdCdzIHRoZSBjbGFzc2ljIGF4aXMgb2YgYSBtb3VzZSB3aGVlbC5cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIEkgZHJvcHBlZCBzcGluWi9waXhlbFouICBJdCBpcyBzdXBwb3J0ZWQgYnkgdGhlIERPTSAzICd3aGVlbCcgZXZlbnQgYW5kXG4gICAgICAgICAqICAgICBwcm9iYWJseSBpcyBieSBicm93c2VycyBpbiBjb25qdW5jdGlvbiB3aXRoIGZhbmN5IDNEIGNvbnRyb2xsZXJzIC4uIGJ1dFxuICAgICAgICAgKiAgICAgeW91IGtub3cuXG4gICAgICAgICAqXG4gICAgICAgICAqIEltcGxlbWVudGF0aW9uIGluZm86XG4gICAgICAgICAqXG4gICAgICAgICAqIEV4YW1wbGVzIG9mICd3aGVlbCcgZXZlbnQgaWYgeW91IHNjcm9sbCBzbG93bHkgKGRvd24pIGJ5IG9uZSBzdGVwIHdpdGggYW5cbiAgICAgICAgICogYXZlcmFnZSBtb3VzZTpcbiAgICAgICAgICpcbiAgICAgICAgICogICBPUyBYICsgQ2hyb21lICAobW91c2UpICAgICAtICAgIDQgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgLTEyMClcbiAgICAgICAgICogICBPUyBYICsgU2FmYXJpICAobW91c2UpICAgICAtICBOL0EgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgIC0xMilcbiAgICAgICAgICogICBPUyBYICsgRmlyZWZveCAobW91c2UpICAgICAtICAgIDAuMSBsaW5lICBkZWx0YSAgKHdoZWVsRGVsdGEgIE4vQSlcbiAgICAgICAgICogICBXaW44ICsgQ2hyb21lICAobW91c2UpICAgICAtICAxMDAgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgLTEyMClcbiAgICAgICAgICogICBXaW44ICsgRmlyZWZveCAobW91c2UpICAgICAtICAgIDMgICBsaW5lICBkZWx0YSAgKHdoZWVsRGVsdGEgLTEyMClcbiAgICAgICAgICpcbiAgICAgICAgICogT24gdGhlIHRyYWNrcGFkOlxuICAgICAgICAgKlxuICAgICAgICAgKiAgIE9TIFggKyBDaHJvbWUgICh0cmFja3BhZCkgIC0gICAgMiAgIHBpeGVsIGRlbHRhICAod2hlZWxEZWx0YSAgIC02KVxuICAgICAgICAgKiAgIE9TIFggKyBGaXJlZm94ICh0cmFja3BhZCkgIC0gICAgMSAgIHBpeGVsIGRlbHRhICAod2hlZWxEZWx0YSAgTi9BKVxuICAgICAgICAgKlxuICAgICAgICAgKiBPbiBvdGhlci9vbGRlciBicm93c2Vycy4uIGl0J3MgbW9yZSBjb21wbGljYXRlZCBhcyB0aGVyZSBjYW4gYmUgbXVsdGlwbGUgYW5kXG4gICAgICAgICAqIGFsc28gbWlzc2luZyBkZWx0YSB2YWx1ZXMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSAnd2hlZWwnIGV2ZW50IGlzIG1vcmUgc3RhbmRhcmQ6XG4gICAgICAgICAqXG4gICAgICAgICAqIGh0dHA6Ly93d3cudzMub3JnL1RSL0RPTS1MZXZlbC0zLUV2ZW50cy8jZXZlbnRzLXdoZWVsZXZlbnRzXG4gICAgICAgICAqXG4gICAgICAgICAqIFRoZSBiYXNpY3MgaXMgdGhhdCBpdCBpbmNsdWRlcyBhIHVuaXQsIGRlbHRhTW9kZSAocGl4ZWxzLCBsaW5lcywgcGFnZXMpLCBhbmRcbiAgICAgICAgICogZGVsdGFYLCBkZWx0YVkgYW5kIGRlbHRhWi4gIFNvbWUgYnJvd3NlcnMgcHJvdmlkZSBvdGhlciB2YWx1ZXMgdG8gbWFpbnRhaW5cbiAgICAgICAgICogYmFja3dhcmQgY29tcGF0aWJpbGl0eSB3aXRoIG9sZGVyIGV2ZW50cy4gIFRob3NlIG90aGVyIHZhbHVlcyBoZWxwIHVzXG4gICAgICAgICAqIGJldHRlciBub3JtYWxpemUgc3BpbiBzcGVlZC4gIEV4YW1wbGUgb2Ygd2hhdCB0aGUgYnJvd3NlcnMgcHJvdmlkZTpcbiAgICAgICAgICpcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIHwgZXZlbnQud2hlZWxEZWx0YSB8IGV2ZW50LmRldGFpbFxuICAgICAgICAgKiAgICAgICAgLS0tLS0tLS0tLS0tLS0tLS0tKy0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLVxuICAgICAgICAgKiAgICAgICAgICBTYWZhcmkgdjUvT1MgWCAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgICBTYWZhcmkgdjUvV2luNyAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgIENocm9tZSB2MTcvT1MgWCAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgIENocm9tZSB2MTcvV2luNyAgfCAgICAgICAtMTIwICAgICAgIHwgICAgICAgMFxuICAgICAgICAgKiAgICAgICAgICAgICAgICBJRTkvV2luNyAgfCAgICAgICAtMTIwICAgICAgIHwgICB1bmRlZmluZWRcbiAgICAgICAgICogICAgICAgICBGaXJlZm94IHY0L09TIFggIHwgICAgIHVuZGVmaW5lZCAgICB8ICAgICAgIDFcbiAgICAgICAgICogICAgICAgICBGaXJlZm94IHY0L1dpbjcgIHwgICAgIHVuZGVmaW5lZCAgICB8ICAgICAgIDNcbiAgICAgICAgICpcbiAgICAgICAgICovXG4gICAgICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZVdoZWVsKCAvKm9iamVjdCovIGV2ZW50ICkgLypvYmplY3QqLyB7XG4gICAgICAgICAgICAvLyBSZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgICAgICAgICB2YXIgUElYRUxfU1RFUCA9IDEwO1xuICAgICAgICAgICAgdmFyIExJTkVfSEVJR0hUID0gNDA7XG4gICAgICAgICAgICB2YXIgUEFHRV9IRUlHSFQgPSA4MDA7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHNYID0gMCwgc1kgPSAwLCAgICAgICAvLyBzcGluWCwgc3BpbllcbiAgICAgICAgICAgICAgICBwWCA9IDAsIHBZID0gMDsgICAgICAgLy8gcGl4ZWxYLCBwaXhlbFlcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBMZWdhY3lcbiAgICAgICAgICAgIGlmKCAnZGV0YWlsJyBpbiBldmVudCApIHtcbiAgICAgICAgICAgICAgICBzWSA9IGV2ZW50LmRldGFpbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCAnd2hlZWxEZWx0YScgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgc1kgPSAtZXZlbnQud2hlZWxEZWx0YSAvIDEyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCAnd2hlZWxEZWx0YVknIGluIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIHNZID0gLWV2ZW50LndoZWVsRGVsdGFZIC8gMTIwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoICd3aGVlbERlbHRhWCcgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgc1ggPSAtZXZlbnQud2hlZWxEZWx0YVggLyAxMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gc2lkZSBzY3JvbGxpbmcgb24gRkYgd2l0aCBET01Nb3VzZVNjcm9sbFxuICAgICAgICAgICAgaWYoICdheGlzJyBpbiBldmVudCAmJiBldmVudC5heGlzID09PSBldmVudC5IT1JJWk9OVEFMX0FYSVMgKSB7XG4gICAgICAgICAgICAgICAgc1ggPSBzWTtcbiAgICAgICAgICAgICAgICBzWSA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcFggPSBzWCAqIFBJWEVMX1NURVA7XG4gICAgICAgICAgICBwWSA9IHNZICogUElYRUxfU1RFUDtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiggJ2RlbHRhWScgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgcFkgPSBldmVudC5kZWx0YVk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggJ2RlbHRhWCcgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgcFggPSBldmVudC5kZWx0YVg7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYoIChwWCB8fCBwWSkgJiYgZXZlbnQuZGVsdGFNb2RlICkge1xuICAgICAgICAgICAgICAgIGlmKCBldmVudC5kZWx0YU1vZGUgPT09IDEgKSB7ICAgICAgICAgIC8vIGRlbHRhIGluIExJTkUgdW5pdHNcbiAgICAgICAgICAgICAgICAgICAgcFggKj0gTElORV9IRUlHSFQ7XG4gICAgICAgICAgICAgICAgICAgIHBZICo9IExJTkVfSEVJR0hUO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBkZWx0YSBpbiBQQUdFIHVuaXRzXG4gICAgICAgICAgICAgICAgICAgIHBYICo9IFBBR0VfSEVJR0hUO1xuICAgICAgICAgICAgICAgICAgICBwWSAqPSBQQUdFX0hFSUdIVDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRmFsbC1iYWNrIGlmIHNwaW4gY2Fubm90IGJlIGRldGVybWluZWRcbiAgICAgICAgICAgIGlmKCBwWCAmJiAhc1ggKSB7XG4gICAgICAgICAgICAgICAgc1ggPSAocFggPCAxKSA/IC0xIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCBwWSAmJiAhc1kgKSB7XG4gICAgICAgICAgICAgICAgc1kgPSAocFkgPCAxKSA/IC0xIDogMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHNwaW5YOiBzWCxcbiAgICAgICAgICAgICAgICBzcGluWTogc1ksXG4gICAgICAgICAgICAgICAgcGl4ZWxYOiBwWCxcbiAgICAgICAgICAgICAgICBwaXhlbFk6IHBZXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgUGFyYWxsYXhcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBmdW5jdGlvbiBzZXRQYXJhbGxheFRyYW5zZm9ybShlbCwgcHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIGVsID0gJChlbCk7XG4gICAgICAgICAgICB2YXIgcCwgcFgsIHBZO1xuICAgICAgICAgICAgdmFyIHJ0bEZhY3RvciA9IHMucnRsID8gLTEgOiAxO1xuICAgICAgICBcbiAgICAgICAgICAgIHAgPSBlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheCcpIHx8ICcwJztcbiAgICAgICAgICAgIHBYID0gZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgteCcpO1xuICAgICAgICAgICAgcFkgPSBlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC15Jyk7XG4gICAgICAgICAgICBpZiAocFggfHwgcFkpIHtcbiAgICAgICAgICAgICAgICBwWCA9IHBYIHx8ICcwJztcbiAgICAgICAgICAgICAgICBwWSA9IHBZIHx8ICcwJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHBYID0gcDtcbiAgICAgICAgICAgICAgICAgICAgcFkgPSAnMCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwWSA9IHA7XG4gICAgICAgICAgICAgICAgICAgIHBYID0gJzAnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoKHBYKS5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIHBYID0gcGFyc2VJbnQocFgsIDEwKSAqIHByb2dyZXNzICogcnRsRmFjdG9yICsgJyUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcFggPSBwWCAqIHByb2dyZXNzICogcnRsRmFjdG9yICsgJ3B4JyA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoKHBZKS5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIHBZID0gcGFyc2VJbnQocFksIDEwKSAqIHByb2dyZXNzICsgJyUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcFkgPSBwWSAqIHByb2dyZXNzICsgJ3B4JyA7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgZWwudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgcFggKyAnLCAnICsgcFkgKyAnLDBweCknKTtcbiAgICAgICAgfVxuICAgICAgICBzLnBhcmFsbGF4ID0ge1xuICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcy5jb250YWluZXIuY2hpbGRyZW4oJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICBzZXRQYXJhbGxheFRyYW5zZm9ybSh0aGlzLCBzLnByb2dyZXNzKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcy5zbGlkZXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLmZpbmQoJ1tkYXRhLXN3aXBlci1wYXJhbGxheF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC14XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXldJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChzbGlkZVswXS5wcm9ncmVzcywgLTEpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFBhcmFsbGF4VHJhbnNmb3JtKHRoaXMsIHByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkdXJhdGlvbiA9PT0gJ3VuZGVmaW5lZCcpIGR1cmF0aW9uID0gcy5wYXJhbXMuc3BlZWQ7XG4gICAgICAgICAgICAgICAgcy5jb250YWluZXIuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJhbGxheER1cmF0aW9uID0gcGFyc2VJbnQoZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgtZHVyYXRpb24nKSwgMTApIHx8IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHVyYXRpb24gPT09IDApIHBhcmFsbGF4RHVyYXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICBlbC50cmFuc2l0aW9uKHBhcmFsbGF4RHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBab29tXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy56b29tID0ge1xuICAgICAgICAgICAgLy8gXCJHbG9iYWxcIiBQcm9wc1xuICAgICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgICBjdXJyZW50U2NhbGU6IDEsXG4gICAgICAgICAgICBpc1NjYWxpbmc6IGZhbHNlLFxuICAgICAgICAgICAgZ2VzdHVyZToge1xuICAgICAgICAgICAgICAgIHNsaWRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc2xpZGVXaWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHNsaWRlSGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpbWFnZVdyYXA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB6b29tTWF4OiBzLnBhcmFtcy56b29tTWF4XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY3VycmVudFg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjdXJyZW50WTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1pblg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtaW5ZOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgbWF4WDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1heFk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXJ0WDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHN0YXJ0WTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHRvdWNoZXNTdGFydDoge30sXG4gICAgICAgICAgICAgICAgdG91Y2hlc0N1cnJlbnQ6IHt9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmVsb2NpdHk6IHtcbiAgICAgICAgICAgICAgICB4OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgeTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByZXZQb3NpdGlvblg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwcmV2UG9zaXRpb25ZOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJldlRpbWU6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIENhbGMgU2NhbGUgRnJvbSBNdWx0aS10b3VjaGVzXG4gICAgICAgICAgICBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikgcmV0dXJuIDE7XG4gICAgICAgICAgICAgICAgdmFyIHgxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYLFxuICAgICAgICAgICAgICAgICAgICB5MSA9IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSxcbiAgICAgICAgICAgICAgICAgICAgeDIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVgsXG4gICAgICAgICAgICAgICAgICAgIHkyID0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZO1xuICAgICAgICAgICAgICAgIHZhciBkaXN0YW5jZSA9IE1hdGguc3FydChNYXRoLnBvdyh4MiAtIHgxLCAyKSArIE1hdGgucG93KHkyIC0geTEsIDIpKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGlzdGFuY2U7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gRXZlbnRzXG4gICAgICAgICAgICBvbkdlc3R1cmVTdGFydDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXMuc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hzdGFydCcgfHwgZS50eXBlID09PSAndG91Y2hzdGFydCcgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2NhbGVTdGFydCA9IHouZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuc2xpZGUgfHwgIXouZ2VzdHVyZS5zbGlkZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNsaWRlID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHouZ2VzdHVyZS5zbGlkZS5sZW5ndGggPT09IDApIHouZ2VzdHVyZS5zbGlkZSA9IHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UgPSB6Lmdlc3R1cmUuc2xpZGUuZmluZCgnaW1nLCBzdmcsIGNhbnZhcycpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwID0gei5nZXN0dXJlLmltYWdlLnBhcmVudCgnLicgKyBzLnBhcmFtcy56b29tQ29udGFpbmVyQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuem9vbU1heCA9IHouZ2VzdHVyZS5pbWFnZVdyYXAuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHMucGFyYW1zLnpvb21NYXggO1xuICAgICAgICAgICAgICAgICAgICBpZiAoei5nZXN0dXJlLmltYWdlV3JhcC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICB6LmlzU2NhbGluZyA9IHRydWU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25HZXN0dXJlQ2hhbmdlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghcy5zdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaG1vdmUnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2NhbGVNb3ZlID0gei5nZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5pbWFnZSB8fCB6Lmdlc3R1cmUuaW1hZ2UubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gZS5zY2FsZSAqIHouY3VycmVudFNjYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9ICh6Lmdlc3R1cmUuc2NhbGVNb3ZlIC8gei5nZXN0dXJlLnNjYWxlU3RhcnQpICogei5jdXJyZW50U2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh6LnNjYWxlID4gei5nZXN0dXJlLnpvb21NYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9IHouZ2VzdHVyZS56b29tTWF4IC0gMSArIE1hdGgucG93KCh6LnNjYWxlIC0gei5nZXN0dXJlLnpvb21NYXggKyAxKSwgMC41KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHouc2NhbGUgPCBzLnBhcmFtcy56b29tTWluKSB7XG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSAgcy5wYXJhbXMuem9vbU1pbiArIDEgLSBNYXRoLnBvdygocy5wYXJhbXMuem9vbU1pbiAtIHouc2NhbGUgKyAxKSwgMC41KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKCcgKyB6LnNjYWxlICsgJyknKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkdlc3R1cmVFbmQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCFzLnN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoZW5kJyB8fCBlLnR5cGUgPT09ICd0b3VjaGVuZCcgJiYgZS5jaGFuZ2VkVG91Y2hlcy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuaW1hZ2UgfHwgei5nZXN0dXJlLmltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHouc2NhbGUgPSBNYXRoLm1heChNYXRoLm1pbih6LnNjYWxlLCB6Lmdlc3R1cmUuem9vbU1heCksIHMucGFyYW1zLnpvb21NaW4pO1xuICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZS50cmFuc2l0aW9uKHMucGFyYW1zLnNwZWVkKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgnICsgei5zY2FsZSArICcpJyk7XG4gICAgICAgICAgICAgICAgei5jdXJyZW50U2NhbGUgPSB6LnNjYWxlO1xuICAgICAgICAgICAgICAgIHouaXNTY2FsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHouc2NhbGUgPT09IDEpIHouZ2VzdHVyZS5zbGlkZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoU3RhcnQ6IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuaW1hZ2UgfHwgei5nZXN0dXJlLmltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICh6LmltYWdlLmlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChzLmRldmljZS5vcyA9PT0gJ2FuZHJvaWQnKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5pc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UudG91Y2hlc1N0YXJ0LnggPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgei5pbWFnZS50b3VjaGVzU3RhcnQueSA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoTW92ZTogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5pbWFnZSB8fCB6Lmdlc3R1cmUuaW1hZ2UubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgcy5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKCF6LmltYWdlLmlzVG91Y2hlZCB8fCAhei5nZXN0dXJlLnNsaWRlKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghei5pbWFnZS5pc01vdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2Uud2lkdGggPSB6Lmdlc3R1cmUuaW1hZ2VbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuaGVpZ2h0ID0gei5nZXN0dXJlLmltYWdlWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5zdGFydFggPSBzLmdldFRyYW5zbGF0ZSh6Lmdlc3R1cmUuaW1hZ2VXcmFwWzBdLCAneCcpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2Uuc3RhcnRZID0gcy5nZXRUcmFuc2xhdGUoei5nZXN0dXJlLmltYWdlV3JhcFswXSwgJ3knKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2xpZGVXaWR0aCA9IHouZ2VzdHVyZS5zbGlkZVswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNsaWRlSGVpZ2h0ID0gei5nZXN0dXJlLnNsaWRlWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcC50cmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHouaW1hZ2Uuc3RhcnRYID0gLXouaW1hZ2Uuc3RhcnRYO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHouaW1hZ2Uuc3RhcnRZID0gLXouaW1hZ2Uuc3RhcnRZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgaWYgd2UgbmVlZCBpbWFnZSBkcmFnXG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlZFdpZHRoID0gei5pbWFnZS53aWR0aCAqIHouc2NhbGU7XG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlZEhlaWdodCA9IHouaW1hZ2UuaGVpZ2h0ICogei5zY2FsZTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHNjYWxlZFdpZHRoIDwgei5nZXN0dXJlLnNsaWRlV2lkdGggJiYgc2NhbGVkSGVpZ2h0IDwgei5nZXN0dXJlLnNsaWRlSGVpZ2h0KSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHouaW1hZ2UubWluWCA9IE1hdGgubWluKCh6Lmdlc3R1cmUuc2xpZGVXaWR0aCAvIDIgLSBzY2FsZWRXaWR0aCAvIDIpLCAwKTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1heFggPSAtei5pbWFnZS5taW5YO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWluWSA9IE1hdGgubWluKCh6Lmdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyIC0gc2NhbGVkSGVpZ2h0IC8gMiksIDApO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWF4WSA9IC16LmltYWdlLm1pblk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXouaW1hZ2UuaXNNb3ZlZCAmJiAhei5pc1NjYWxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKHouaW1hZ2UubWluWCkgPT09IE1hdGguZmxvb3Ioei5pbWFnZS5zdGFydFgpICYmIHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA8IHouaW1hZ2UudG91Y2hlc1N0YXJ0LngpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5mbG9vcih6LmltYWdlLm1heFgpID09PSBNYXRoLmZsb29yKHouaW1hZ2Uuc3RhcnRYKSAmJiB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnggPiB6LmltYWdlLnRvdWNoZXNTdGFydC54KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCFzLmlzSG9yaXpvbnRhbCgpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5mbG9vcih6LmltYWdlLm1pblkpID09PSBNYXRoLmZsb29yKHouaW1hZ2Uuc3RhcnRZKSAmJiB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnkgPCB6LmltYWdlLnRvdWNoZXNTdGFydC55KSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGguZmxvb3Ioei5pbWFnZS5tYXhZKSA9PT0gTWF0aC5mbG9vcih6LmltYWdlLnN0YXJ0WSkgJiYgei5pbWFnZS50b3VjaGVzQ3VycmVudC55ID4gei5pbWFnZS50b3VjaGVzU3RhcnQueSlcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgei5pbWFnZS5pc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRYID0gei5pbWFnZS50b3VjaGVzQ3VycmVudC54IC0gei5pbWFnZS50b3VjaGVzU3RhcnQueCArIHouaW1hZ2Uuc3RhcnRYO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFkgPSB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB6LmltYWdlLnRvdWNoZXNTdGFydC55ICsgei5pbWFnZS5zdGFydFk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh6LmltYWdlLmN1cnJlbnRYIDwgei5pbWFnZS5taW5YKSB7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFggPSAgei5pbWFnZS5taW5YICsgMSAtIE1hdGgucG93KCh6LmltYWdlLm1pblggLSB6LmltYWdlLmN1cnJlbnRYICsgMSksIDAuOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh6LmltYWdlLmN1cnJlbnRYID4gei5pbWFnZS5tYXhYKSB7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFggPSB6LmltYWdlLm1heFggLSAxICsgTWF0aC5wb3coKHouaW1hZ2UuY3VycmVudFggLSB6LmltYWdlLm1heFggKyAxKSwgMC44KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh6LmltYWdlLmN1cnJlbnRZIDwgei5pbWFnZS5taW5ZKSB7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFkgPSAgei5pbWFnZS5taW5ZICsgMSAtIE1hdGgucG93KCh6LmltYWdlLm1pblkgLSB6LmltYWdlLmN1cnJlbnRZICsgMSksIDAuOCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh6LmltYWdlLmN1cnJlbnRZID4gei5pbWFnZS5tYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFkgPSB6LmltYWdlLm1heFkgLSAxICsgTWF0aC5wb3coKHouaW1hZ2UuY3VycmVudFkgLSB6LmltYWdlLm1heFkgKyAxKSwgMC44KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vVmVsb2NpdHlcbiAgICAgICAgICAgICAgICBpZiAoIXoudmVsb2NpdHkucHJldlBvc2l0aW9uWCkgei52ZWxvY2l0eS5wcmV2UG9zaXRpb25YID0gei5pbWFnZS50b3VjaGVzQ3VycmVudC54O1xuICAgICAgICAgICAgICAgIGlmICghei52ZWxvY2l0eS5wcmV2UG9zaXRpb25ZKSB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSB6LmltYWdlLnRvdWNoZXNDdXJyZW50Lnk7XG4gICAgICAgICAgICAgICAgaWYgKCF6LnZlbG9jaXR5LnByZXZUaW1lKSB6LnZlbG9jaXR5LnByZXZUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICB6LnZlbG9jaXR5LnggPSAoei5pbWFnZS50b3VjaGVzQ3VycmVudC54IC0gei52ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSAvIChEYXRlLm5vdygpIC0gei52ZWxvY2l0eS5wcmV2VGltZSkgLyAyO1xuICAgICAgICAgICAgICAgIHoudmVsb2NpdHkueSA9ICh6LmltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblkpIC8gKERhdGUubm93KCkgLSB6LnZlbG9jaXR5LnByZXZUaW1lKSAvIDI7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueCAtIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWCkgPCAyKSB6LnZlbG9jaXR5LnggPSAwO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh6LmltYWdlLnRvdWNoZXNDdXJyZW50LnkgLSB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblkpIDwgMikgei52ZWxvY2l0eS55ID0gMDtcbiAgICAgICAgICAgICAgICB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblggPSB6LmltYWdlLnRvdWNoZXNDdXJyZW50Lng7XG4gICAgICAgICAgICAgICAgei52ZWxvY2l0eS5wcmV2UG9zaXRpb25ZID0gei5pbWFnZS50b3VjaGVzQ3VycmVudC55O1xuICAgICAgICAgICAgICAgIHoudmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIHouaW1hZ2UuY3VycmVudFggKyAncHgsICcgKyB6LmltYWdlLmN1cnJlbnRZICsgJ3B4LDApJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25Ub3VjaEVuZDogZnVuY3Rpb24gKHMsIGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5pbWFnZSB8fCB6Lmdlc3R1cmUuaW1hZ2UubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCF6LmltYWdlLmlzVG91Y2hlZCB8fCAhei5pbWFnZS5pc01vdmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb25YID0gMzAwO1xuICAgICAgICAgICAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uWSA9IDMwMDtcbiAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZVggPSB6LnZlbG9jaXR5LnggKiBtb21lbnR1bUR1cmF0aW9uWDtcbiAgICAgICAgICAgICAgICB2YXIgbmV3UG9zaXRpb25YID0gei5pbWFnZS5jdXJyZW50WCArIG1vbWVudHVtRGlzdGFuY2VYO1xuICAgICAgICAgICAgICAgIHZhciBtb21lbnR1bURpc3RhbmNlWSA9IHoudmVsb2NpdHkueSAqIG1vbWVudHVtRHVyYXRpb25ZO1xuICAgICAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvblkgPSB6LmltYWdlLmN1cnJlbnRZICsgbW9tZW50dW1EaXN0YW5jZVk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vRml4IGR1cmF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHoudmVsb2NpdHkueCAhPT0gMCkgbW9tZW50dW1EdXJhdGlvblggPSBNYXRoLmFicygobmV3UG9zaXRpb25YIC0gei5pbWFnZS5jdXJyZW50WCkgLyB6LnZlbG9jaXR5LngpO1xuICAgICAgICAgICAgICAgIGlmICh6LnZlbG9jaXR5LnkgIT09IDApIG1vbWVudHVtRHVyYXRpb25ZID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uWSAtIHouaW1hZ2UuY3VycmVudFkpIC8gei52ZWxvY2l0eS55KTtcbiAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGgubWF4KG1vbWVudHVtRHVyYXRpb25YLCBtb21lbnR1bUR1cmF0aW9uWSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFggPSBuZXdQb3NpdGlvblg7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WSA9IG5ld1Bvc2l0aW9uWTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gRGVmaW5lIGlmIHdlIG5lZWQgaW1hZ2UgZHJhZ1xuICAgICAgICAgICAgICAgIHZhciBzY2FsZWRXaWR0aCA9IHouaW1hZ2Uud2lkdGggKiB6LnNjYWxlO1xuICAgICAgICAgICAgICAgIHZhciBzY2FsZWRIZWlnaHQgPSB6LmltYWdlLmhlaWdodCAqIHouc2NhbGU7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5taW5YID0gTWF0aC5taW4oKHouZ2VzdHVyZS5zbGlkZVdpZHRoIC8gMiAtIHNjYWxlZFdpZHRoIC8gMiksIDApO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWF4WCA9IC16LmltYWdlLm1pblg7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5taW5ZID0gTWF0aC5taW4oKHouZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIgLSBzY2FsZWRIZWlnaHQgLyAyKSwgMCk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5tYXhZID0gLXouaW1hZ2UubWluWTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRYID0gTWF0aC5tYXgoTWF0aC5taW4oei5pbWFnZS5jdXJyZW50WCwgei5pbWFnZS5tYXhYKSwgei5pbWFnZS5taW5YKTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRZID0gTWF0aC5tYXgoTWF0aC5taW4oei5pbWFnZS5jdXJyZW50WSwgei5pbWFnZS5tYXhZKSwgei5pbWFnZS5taW5ZKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcC50cmFuc2l0aW9uKG1vbWVudHVtRHVyYXRpb24pLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIHouaW1hZ2UuY3VycmVudFggKyAncHgsICcgKyB6LmltYWdlLmN1cnJlbnRZICsgJ3B4LDApJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25UcmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICh6Lmdlc3R1cmUuc2xpZGUgJiYgcy5wcmV2aW91c0luZGV4ICE9PSBzLmFjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgxKScpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zbGlkZSA9IHouZ2VzdHVyZS5pbWFnZSA9IHouZ2VzdHVyZS5pbWFnZVdyYXAgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSB6LmN1cnJlbnRTY2FsZSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBab29tXG4gICAgICAgICAgICB0b2dnbGVab29tOiBmdW5jdGlvbiAocywgZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLnNsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zbGlkZSA9IHMuY2xpY2tlZFNsaWRlID8gJChzLmNsaWNrZWRTbGlkZSkgOiBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlID0gei5nZXN0dXJlLnNsaWRlLmZpbmQoJ2ltZywgc3ZnLCBjYW52YXMnKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcCA9IHouZ2VzdHVyZS5pbWFnZS5wYXJlbnQoJy4nICsgcy5wYXJhbXMuem9vbUNvbnRhaW5lckNsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuaW1hZ2UgfHwgei5nZXN0dXJlLmltYWdlLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2hYLCB0b3VjaFksIG9mZnNldFgsIG9mZnNldFksIGRpZmZYLCBkaWZmWSwgdHJhbnNsYXRlWCwgdHJhbnNsYXRlWSwgaW1hZ2VXaWR0aCwgaW1hZ2VIZWlnaHQsIHNjYWxlZFdpZHRoLCBzY2FsZWRIZWlnaHQsIHRyYW5zbGF0ZU1pblgsIHRyYW5zbGF0ZU1pblksIHRyYW5zbGF0ZU1heFgsIHRyYW5zbGF0ZU1heFksIHNsaWRlV2lkdGgsIHNsaWRlSGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHouaW1hZ2UudG91Y2hlc1N0YXJ0LnggPT09ICd1bmRlZmluZWQnICYmIGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hYID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgIHRvdWNoWSA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyA/IGUuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hYID0gei5pbWFnZS50b3VjaGVzU3RhcnQueDtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hZID0gei5pbWFnZS50b3VjaGVzU3RhcnQueTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh6LnNjYWxlICYmIHouc2NhbGUgIT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gWm9vbSBPdXRcbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9IHouY3VycmVudFNjYWxlID0gMTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlV3JhcC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCknKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZSgxKScpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBab29tIEluXG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSB6LmN1cnJlbnRTY2FsZSA9IHouZ2VzdHVyZS5pbWFnZVdyYXAuYXR0cignZGF0YS1zd2lwZXItem9vbScpIHx8IHMucGFyYW1zLnpvb21NYXg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVdpZHRoID0gei5nZXN0dXJlLnNsaWRlWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVIZWlnaHQgPSB6Lmdlc3R1cmUuc2xpZGVbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WCA9IHouZ2VzdHVyZS5zbGlkZS5vZmZzZXQoKS5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0WSA9IHouZ2VzdHVyZS5zbGlkZS5vZmZzZXQoKS50b3A7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmWCA9IG9mZnNldFggKyBzbGlkZVdpZHRoLzIgLSB0b3VjaFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaWZmWSA9IG9mZnNldFkgKyBzbGlkZUhlaWdodC8yIC0gdG91Y2hZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlV2lkdGggPSB6Lmdlc3R1cmUuaW1hZ2VbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbWFnZUhlaWdodCA9IHouZ2VzdHVyZS5pbWFnZVswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZWRXaWR0aCA9IGltYWdlV2lkdGggKiB6LnNjYWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVkSGVpZ2h0ID0gaW1hZ2VIZWlnaHQgKiB6LnNjYWxlO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1pblggPSBNYXRoLm1pbigoc2xpZGVXaWR0aCAvIDIgLSBzY2FsZWRXaWR0aCAvIDIpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZU1pblkgPSBNYXRoLm1pbigoc2xpZGVIZWlnaHQgLyAyIC0gc2NhbGVkSGVpZ2h0IC8gMiksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlTWF4WCA9IC10cmFuc2xhdGVNaW5YO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlTWF4WSA9IC10cmFuc2xhdGVNaW5ZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSBkaWZmWCAqIHouc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gZGlmZlkgKiB6LnNjYWxlO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVYIDwgdHJhbnNsYXRlTWluWCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSAgdHJhbnNsYXRlTWluWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVYID4gdHJhbnNsYXRlTWF4WCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGVNYXhYO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVZIDwgdHJhbnNsYXRlTWluWSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSAgdHJhbnNsYXRlTWluWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0cmFuc2xhdGVZID4gdHJhbnNsYXRlTWF4WSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSB0cmFuc2xhdGVNYXhZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVZID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB0cmFuc2xhdGVYICsgJ3B4LCAnICsgdHJhbnNsYXRlWSArICdweCwwKScpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKCcgKyB6LnNjYWxlICsgJyknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQXR0YWNoL0RldGFjaCBFdmVudHNcbiAgICAgICAgICAgIGF0dGFjaEV2ZW50czogZnVuY3Rpb24gKGRldGFjaCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBkZXRhY2ggPyAnb2ZmJyA6ICdvbic7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy56b29tKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzLnNsaWRlcztcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhc3NpdmVMaXN0ZW5lciA9IHMudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0JyAmJiBzLnN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyICYmIHMucGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7cGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogZmFsc2V9IDogZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNjYWxlIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzW2FjdGlvbl0oJ2dlc3R1cmVzdGFydCcsIHMuem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzW2FjdGlvbl0oJ2dlc3R1cmVjaGFuZ2UnLCBzLnpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbYWN0aW9uXSgnZ2VzdHVyZWVuZCcsIHMuem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocy50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1thY3Rpb25dKHMudG91Y2hFdmVudHMuc3RhcnQsIHMuem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzW2FjdGlvbl0ocy50b3VjaEV2ZW50cy5tb3ZlLCBzLnpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbYWN0aW9uXShzLnRvdWNoRXZlbnRzLmVuZCwgcy56b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gTW92ZSBpbWFnZVxuICAgICAgICAgICAgICAgICAgICBzW2FjdGlvbl0oJ3RvdWNoU3RhcnQnLCBzLnpvb20ub25Ub3VjaFN0YXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIHNsaWRlKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHNsaWRlKS5maW5kKCcuJyArIHMucGFyYW1zLnpvb21Db250YWluZXJDbGFzcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoc2xpZGUpW2FjdGlvbl0ocy50b3VjaEV2ZW50cy5tb3ZlLCBzLnpvb20ub25Ub3VjaE1vdmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgc1thY3Rpb25dKCd0b3VjaEVuZCcsIHMuem9vbS5vblRvdWNoRW5kKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjYWxlIE91dFxuICAgICAgICAgICAgICAgICAgICBzW2FjdGlvbl0oJ3RyYW5zaXRpb25FbmQnLCBzLnpvb20ub25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnpvb21Ub2dnbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMub24oJ2RvdWJsZVRhcCcsIHMuem9vbS50b2dnbGVab29tKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcy56b29tLmF0dGFjaEV2ZW50cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzLnpvb20uYXR0YWNoRXZlbnRzKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFBsdWdpbnMgQVBJLiBDb2xsZWN0IGFsbCBhbmQgaW5pdCBhbGwgcGx1Z2luc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuX3BsdWdpbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgcGx1Z2luIGluIHMucGx1Z2lucykge1xuICAgICAgICAgICAgdmFyIHAgPSBzLnBsdWdpbnNbcGx1Z2luXShzLCBzLnBhcmFtc1twbHVnaW5dKTtcbiAgICAgICAgICAgIGlmIChwKSBzLl9wbHVnaW5zLnB1c2gocCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWV0aG9kIHRvIGNhbGwgYWxsIHBsdWdpbnMgZXZlbnQvbWV0aG9kXG4gICAgICAgIHMuY2FsbFBsdWdpbnMgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuX3BsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnROYW1lIGluIHMuX3BsdWdpbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcy5fcGx1Z2luc1tpXVtldmVudE5hbWVdKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSwgYXJndW1lbnRzWzVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgRXZlbnRzL0NhbGxiYWNrcy9QbHVnaW5zIEVtaXR0ZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVFdmVudE5hbWUgKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50TmFtZS5pbmRleE9mKCdvbicpICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50TmFtZVswXSAhPT0gZXZlbnROYW1lWzBdLnRvVXBwZXJDYXNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lID0gJ29uJyArIGV2ZW50TmFtZVswXS50b1VwcGVyQ2FzZSgpICsgZXZlbnROYW1lLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV2ZW50TmFtZTtcbiAgICAgICAgfVxuICAgICAgICBzLmVtaXR0ZXJFdmVudExpc3RlbmVycyA9IHtcbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHMuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIC8vIFRyaWdnZXIgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAocy5wYXJhbXNbZXZlbnROYW1lXSkge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zW2V2ZW50TmFtZV0oYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdLCBhcmd1bWVudHNbNV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50c1xuICAgICAgICAgICAgaWYgKHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdW2ldKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSwgYXJndW1lbnRzWzVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIHBsdWdpbnNcbiAgICAgICAgICAgIGlmIChzLmNhbGxQbHVnaW5zKSBzLmNhbGxQbHVnaW5zKGV2ZW50TmFtZSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdLCBhcmd1bWVudHNbNV0pO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgZXZlbnROYW1lID0gbm9ybWFsaXplRXZlbnROYW1lKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAoIXMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0pIHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgIHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0ucHVzaChoYW5kbGVyKTtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgICBzLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgZXZlbnROYW1lID0gbm9ybWFsaXplRXZlbnROYW1lKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBoYW5kbGVycyBmb3Igc3VjaCBldmVudFxuICAgICAgICAgICAgICAgIHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBbXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXSB8fCBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZihzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdW2ldID09PSBoYW5kbGVyKSBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgICBzLm9uY2UgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICBldmVudE5hbWUgPSBub3JtYWxpemVFdmVudE5hbWUoZXZlbnROYW1lKTtcbiAgICAgICAgICAgIHZhciBfaGFuZGxlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBoYW5kbGVyKGFyZ3VtZW50c1swXSwgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0sIGFyZ3VtZW50c1szXSwgYXJndW1lbnRzWzRdKTtcbiAgICAgICAgICAgICAgICBzLm9mZihldmVudE5hbWUsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBzLm9uKGV2ZW50TmFtZSwgX2hhbmRsZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gQWNjZXNzaWJpbGl0eSB0b29sc1xuICAgICAgICBzLmExMXkgPSB7XG4gICAgICAgICAgICBtYWtlRm9jdXNhYmxlOiBmdW5jdGlvbiAoJGVsKSB7XG4gICAgICAgICAgICAgICAgJGVsLmF0dHIoJ3RhYkluZGV4JywgJzAnKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJGVsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZFJvbGU6IGZ1bmN0aW9uICgkZWwsIHJvbGUpIHtcbiAgICAgICAgICAgICAgICAkZWwuYXR0cigncm9sZScsIHJvbGUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGFkZExhYmVsOiBmdW5jdGlvbiAoJGVsLCBsYWJlbCkge1xuICAgICAgICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWxhYmVsJywgbGFiZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGRpc2FibGU6IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgICAgICAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGVuYWJsZTogZnVuY3Rpb24gKCRlbCkge1xuICAgICAgICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIG9uRW50ZXJLZXk6IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudC5rZXlDb2RlICE9PSAxMykgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmICgkKGV2ZW50LnRhcmdldCkuaXMocy5wYXJhbXMubmV4dEJ1dHRvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5vbkNsaWNrTmV4dChldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzRW5kKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkubm90aWZ5KHMucGFyYW1zLmxhc3RTbGlkZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm5vdGlmeShzLnBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICgkKGV2ZW50LnRhcmdldCkuaXMocy5wYXJhbXMucHJldkJ1dHRvbikpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5vbkNsaWNrUHJldihldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkubm90aWZ5KHMucGFyYW1zLmZpcnN0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5ub3RpZnkocy5wYXJhbXMucHJldlNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcygnLicgKyBzLnBhcmFtcy5idWxsZXRDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgJChldmVudC50YXJnZXQpWzBdLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgXG4gICAgICAgICAgICBsaXZlUmVnaW9uOiAkKCc8c3BhbiBjbGFzcz1cIicgKyBzLnBhcmFtcy5ub3RpZmljYXRpb25DbGFzcyArICdcIiBhcmlhLWxpdmU9XCJhc3NlcnRpdmVcIiBhcmlhLWF0b21pYz1cInRydWVcIj48L3NwYW4+JyksXG4gICAgICAgIFxuICAgICAgICAgICAgbm90aWZ5OiBmdW5jdGlvbiAobWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHZhciBub3RpZmljYXRpb24gPSBzLmExMXkubGl2ZVJlZ2lvbjtcbiAgICAgICAgICAgICAgICBpZiAobm90aWZpY2F0aW9uLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5odG1sKCcnKTtcbiAgICAgICAgICAgICAgICBub3RpZmljYXRpb24uaHRtbChtZXNzYWdlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gU2V0dXAgYWNjZXNzaWJpbGl0eVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uICYmIHMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzLmExMXkubWFrZUZvY3VzYWJsZShzLm5leHRCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICBzLmExMXkuYWRkUm9sZShzLm5leHRCdXR0b24sICdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmFkZExhYmVsKHMubmV4dEJ1dHRvbiwgcy5wYXJhbXMubmV4dFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2QnV0dG9uICYmIHMucHJldkJ1dHRvbiAmJiBzLnByZXZCdXR0b24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzLmExMXkubWFrZUZvY3VzYWJsZShzLnByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICBzLmExMXkuYWRkUm9sZShzLnByZXZCdXR0b24sICdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmFkZExhYmVsKHMucHJldkJ1dHRvbiwgcy5wYXJhbXMucHJldlNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAkKHMuY29udGFpbmVyKS5hcHBlbmQocy5hMTF5LmxpdmVSZWdpb24pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXRQYWdpbmF0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb24gJiYgcy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSAmJiBzLmJ1bGxldHMgJiYgcy5idWxsZXRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzLmJ1bGxldHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYnVsbGV0ID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5tYWtlRm9jdXNhYmxlKGJ1bGxldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkuYWRkUm9sZShidWxsZXQsICdidXR0b24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5hZGRMYWJlbChidWxsZXQsIHMucGFyYW1zLnBhZ2luYXRpb25CdWxsZXRNZXNzYWdlLnJlcGxhY2UoL3t7aW5kZXh9fS8sIGJ1bGxldC5pbmRleCgpICsgMSkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLmExMXkubGl2ZVJlZ2lvbiAmJiBzLmExMXkubGl2ZVJlZ2lvbi5sZW5ndGggPiAwKSBzLmExMXkubGl2ZVJlZ2lvbi5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgSW5pdC9EZXN0cm95XG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHMuY3JlYXRlTG9vcCgpO1xuICAgICAgICAgICAgcy51cGRhdGVDb250YWluZXJTaXplKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVNsaWRlc1NpemUoKTtcbiAgICAgICAgICAgIHMudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLnNldCgpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXJEcmFnZ2FibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuZW5hYmxlRHJhZ2dhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJyAmJiBzLmVmZmVjdHNbcy5wYXJhbXMuZWZmZWN0XSkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMubG9vcCkgcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgIHMuZWZmZWN0c1tzLnBhcmFtcy5lZmZlY3RdLnNldFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy5wYXJhbXMuaW5pdGlhbFNsaWRlICsgcy5sb29wZWRTbGlkZXMsIDAsIHMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy5wYXJhbXMuaW5pdGlhbFNsaWRlLCAwLCBzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5pbml0aWFsU2xpZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYWxsYXggJiYgcy5wYXJhbXMucGFyYWxsYXgpIHMucGFyYWxsYXguc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLmxhenkgJiYgcy5wYXJhbXMubGF6eUxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubGF6eS5sb2FkKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuYXR0YWNoRXZlbnRzKCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMub2JzZXJ2ZXIgJiYgcy5zdXBwb3J0Lm9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgcy5pbml0T2JzZXJ2ZXJzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucHJlbG9hZEltYWdlcyAmJiAhcy5wYXJhbXMubGF6eUxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICBzLnByZWxvYWRJbWFnZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy56b29tICYmIHMuem9vbSkge1xuICAgICAgICAgICAgICAgIHMuem9vbS5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXkpIHtcbiAgICAgICAgICAgICAgICBzLnN0YXJ0QXV0b3BsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5rZXlib2FyZENvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5lbmFibGVLZXlib2FyZENvbnRyb2wpIHMuZW5hYmxlS2V5Ym9hcmRDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbENvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5lbmFibGVNb3VzZXdoZWVsQ29udHJvbCkgcy5lbmFibGVNb3VzZXdoZWVsQ29udHJvbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGVwcmVjYXRlZCBoYXNobmF2UmVwbGFjZVN0YXRlIGNoYW5nZWQgdG8gcmVwbGFjZVN0YXRlIGZvciB1c2UgaW4gaGFzaG5hdiBhbmQgaGlzdG9yeVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhhc2huYXZSZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFtcy5yZXBsYWNlU3RhdGUgPSBzLnBhcmFtcy5oYXNobmF2UmVwbGFjZVN0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5oaXN0b3J5KSBzLmhpc3RvcnkuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhhc2huYXYpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5oYXNobmF2KSBzLmhhc2huYXYuaW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLmExMXkuaW5pdCgpO1xuICAgICAgICAgICAgcy5lbWl0KCdvbkluaXQnLCBzKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vIENsZWFudXAgZHluYW1pYyBzdHlsZXNcbiAgICAgICAgcy5jbGVhbnVwU3R5bGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gQ29udGFpbmVyXG4gICAgICAgICAgICBzLmNvbnRhaW5lci5yZW1vdmVDbGFzcyhzLmNsYXNzTmFtZXMuam9pbignICcpKS5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFdyYXBwZXJcbiAgICAgICAgICAgIHMud3JhcHBlci5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFNsaWRlc1xuICAgICAgICAgICAgaWYgKHMuc2xpZGVzICYmIHMuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVzXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhbXG4gICAgICAgICAgICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MsXG4gICAgICAgICAgICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICBzLnBhcmFtcy5zbGlkZU5leHRDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICBzLnBhcmFtcy5zbGlkZVByZXZDbGFzc1xuICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKSlcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLWNvbHVtbicpXG4gICAgICAgICAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1yb3cnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBQYWdpbmF0aW9uL0J1bGxldHNcbiAgICAgICAgICAgIGlmIChzLnBhZ2luYXRpb25Db250YWluZXIgJiYgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5yZW1vdmVDbGFzcyhzLnBhcmFtcy5wYWdpbmF0aW9uSGlkZGVuQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuYnVsbGV0cyAmJiBzLmJ1bGxldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcy5idWxsZXRzLnJlbW92ZUNsYXNzKHMucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBCdXR0b25zXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldkJ1dHRvbikgJChzLnBhcmFtcy5wcmV2QnV0dG9uKS5yZW1vdmVDbGFzcyhzLnBhcmFtcy5idXR0b25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uKSAkKHMucGFyYW1zLm5leHRCdXR0b24pLnJlbW92ZUNsYXNzKHMucGFyYW1zLmJ1dHRvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFNjcm9sbGJhclxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIGlmIChzLnNjcm9sbGJhci50cmFjayAmJiBzLnNjcm9sbGJhci50cmFjay5sZW5ndGgpIHMuc2Nyb2xsYmFyLnRyYWNrLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgICAgICAgICAgaWYgKHMuc2Nyb2xsYmFyLmRyYWcgJiYgcy5zY3JvbGxiYXIuZHJhZy5sZW5ndGgpIHMuc2Nyb2xsYmFyLmRyYWcucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vIERlc3Ryb3lcbiAgICAgICAgcy5kZXN0cm95ID0gZnVuY3Rpb24gKGRlbGV0ZUluc3RhbmNlLCBjbGVhbnVwU3R5bGVzKSB7XG4gICAgICAgICAgICAvLyBEZXRhY2ggZXZlYnRzXG4gICAgICAgICAgICBzLmRldGFjaEV2ZW50cygpO1xuICAgICAgICAgICAgLy8gU3RvcCBhdXRvcGxheVxuICAgICAgICAgICAgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgIC8vIERpc2FibGUgZHJhZ2dhYmxlXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBzLnNjcm9sbGJhci5kaXNhYmxlRHJhZ2dhYmxlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGVzdHJveSBsb29wXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuZGVzdHJveUxvb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENsZWFudXAgc3R5bGVzXG4gICAgICAgICAgICBpZiAoY2xlYW51cFN0eWxlcykge1xuICAgICAgICAgICAgICAgIHMuY2xlYW51cFN0eWxlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzY29ubmVjdCBvYnNlcnZlclxuICAgICAgICAgICAgcy5kaXNjb25uZWN0T2JzZXJ2ZXJzKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRGVzdHJveSB6b29tXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuem9vbSAmJiBzLnpvb20pIHtcbiAgICAgICAgICAgICAgICBzLnpvb20uZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGlzYWJsZSBrZXlib2FyZC9tb3VzZXdoZWVsXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMua2V5Ym9hcmRDb250cm9sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuZGlzYWJsZUtleWJvYXJkQ29udHJvbCkgcy5kaXNhYmxlS2V5Ym9hcmRDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbENvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5kaXNhYmxlTW91c2V3aGVlbENvbnRyb2wpIHMuZGlzYWJsZU1vdXNld2hlZWxDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGExMXlcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5hMTF5LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBoaXN0b3J5IHBvcHN0YXRlXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGlzdG9yeSAmJiAhcy5wYXJhbXMucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgcy5oaXN0b3J5LnNldEhpc3RvcnlQb3BTdGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGFzaG5hdiAmJiBzLmhhc2huYXYpICB7XG4gICAgICAgICAgICAgICAgcy5oYXNobmF2LmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERlc3Ryb3kgY2FsbGJhY2tcbiAgICAgICAgICAgIHMuZW1pdCgnb25EZXN0cm95Jyk7XG4gICAgICAgICAgICAvLyBEZWxldGUgaW5zdGFuY2VcbiAgICAgICAgICAgIGlmIChkZWxldGVJbnN0YW5jZSAhPT0gZmFsc2UpIHMgPSBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy5pbml0KCk7XG4gICAgICAgIFxuXG4gICAgXG4gICAgICAgIC8vIFJldHVybiBzd2lwZXIgaW5zdGFuY2VcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfTtcbiAgICBcblxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgUHJvdG90eXBlXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgU3dpcGVyLnByb3RvdHlwZSA9IHtcbiAgICAgICAgaXNTYWZhcmk6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgcmV0dXJuICh1YS5pbmRleE9mKCdzYWZhcmknKSA+PSAwICYmIHVhLmluZGV4T2YoJ2Nocm9tZScpIDwgMCAmJiB1YS5pbmRleE9mKCdhbmRyb2lkJykgPCAwKTtcbiAgICAgICAgfSkoKSxcbiAgICAgICAgaXNVaVdlYlZpZXc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCksXG4gICAgICAgIGlzQXJyYXk6IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmFwcGx5KGFycikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gICAgICAgIH0sXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgQnJvd3NlclxuICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgYnJvd3Nlcjoge1xuICAgICAgICAgICAgaWU6IHdpbmRvdy5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgfHwgd2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkLFxuICAgICAgICAgICAgaWVUb3VjaDogKHdpbmRvdy5uYXZpZ2F0b3IubXNQb2ludGVyRW5hYmxlZCAmJiB3aW5kb3cubmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAxKSB8fCAod2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCAmJiB3aW5kb3cubmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMSksXG4gICAgICAgICAgICBsdGVJRTk6IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAvLyBjcmVhdGUgdGVtcG9yYXJ5IERJVlxuICAgICAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgY29udGVudCB0byB0bXAgRElWIHdoaWNoIGlzIHdyYXBwZWQgaW50byB0aGUgSUUgSFRNTCBjb25kaXRpb25hbCBzdGF0ZW1lbnRcbiAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHRlIElFIDldPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgICAgICAgICAgICAgIC8vIHJldHVybiB0cnVlIC8gZmFsc2UgdmFsdWUgYmFzZWQgb24gd2hhdCB3aWxsIGJyb3dzZXIgcmVuZGVyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRpdi5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaScpLmxlbmd0aCA9PT0gMTtcbiAgICAgICAgICAgIH0pKClcbiAgICAgICAgfSxcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBEZXZpY2VzXG4gICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBkZXZpY2U6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgICAgICAgICAgIHZhciBhbmRyb2lkID0gdWEubWF0Y2goLyhBbmRyb2lkKTs/W1xcc1xcL10rKFtcXGQuXSspPy8pO1xuICAgICAgICAgICAgdmFyIGlwYWQgPSB1YS5tYXRjaCgvKGlQYWQpLipPU1xccyhbXFxkX10rKS8pO1xuICAgICAgICAgICAgdmFyIGlwb2QgPSB1YS5tYXRjaCgvKGlQb2QpKC4qT1NcXHMoW1xcZF9dKykpPy8pO1xuICAgICAgICAgICAgdmFyIGlwaG9uZSA9ICFpcGFkICYmIHVhLm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBpb3M6IGlwYWQgfHwgaXBob25lIHx8IGlwb2QsXG4gICAgICAgICAgICAgICAgYW5kcm9pZDogYW5kcm9pZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSkoKSxcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBGZWF0dXJlIERldGVjdGlvblxuICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgc3VwcG9ydDoge1xuICAgICAgICAgICAgdG91Y2ggOiAod2luZG93Lk1vZGVybml6ciAmJiBNb2Rlcm5penIudG91Y2ggPT09IHRydWUpIHx8IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCk7XG4gICAgICAgICAgICB9KSgpLFxuICAgIFxuICAgICAgICAgICAgdHJhbnNmb3JtczNkIDogKHdpbmRvdy5Nb2Rlcm5penIgJiYgTW9kZXJuaXpyLmNzc3RyYW5zZm9ybXMzZCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuICgnd2Via2l0UGVyc3BlY3RpdmUnIGluIGRpdiB8fCAnTW96UGVyc3BlY3RpdmUnIGluIGRpdiB8fCAnT1BlcnNwZWN0aXZlJyBpbiBkaXYgfHwgJ01zUGVyc3BlY3RpdmUnIGluIGRpdiB8fCAncGVyc3BlY3RpdmUnIGluIGRpdik7XG4gICAgICAgICAgICB9KSgpLFxuICAgIFxuICAgICAgICAgICAgZmxleGJveDogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jykuc3R5bGU7XG4gICAgICAgICAgICAgICAgdmFyIHN0eWxlcyA9ICgnYWxpZ25JdGVtcyB3ZWJraXRBbGlnbkl0ZW1zIHdlYmtpdEJveEFsaWduIG1zRmxleEFsaWduIG1vekJveEFsaWduIHdlYmtpdEZsZXhEaXJlY3Rpb24gbXNGbGV4RGlyZWN0aW9uIG1vekJveERpcmVjdGlvbiBtb3pCb3hPcmllbnQgd2Via2l0Qm94RGlyZWN0aW9uIHdlYmtpdEJveE9yaWVudCcpLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0eWxlc1tpXSBpbiBkaXYpIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKCksXG4gICAgXG4gICAgICAgICAgICBvYnNlcnZlcjogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCdNdXRhdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cgfHwgJ1dlYmtpdE11dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdyk7XG4gICAgICAgICAgICB9KSgpLFxuICAgIFxuICAgICAgICAgICAgcGFzc2l2ZUxpc3RlbmVyOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzdXBwb3J0c1Bhc3NpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3B0cyA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3Bhc3NpdmUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1cHBvcnRzUGFzc2l2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdFBhc3NpdmVMaXN0ZW5lcicsIG51bGwsIG9wdHMpO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cHBvcnRzUGFzc2l2ZTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgXG4gICAgICAgICAgICBnZXN0dXJlczogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ29uZ2VzdHVyZXN0YXJ0JyBpbiB3aW5kb3c7XG4gICAgICAgICAgICB9KSgpXG4gICAgICAgIH0sXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgUGx1Z2luc1xuICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcGx1Z2luczoge31cbiAgICB9O1xuICAgIFxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBEb203IExpYnJhcnlcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIHZhciBEb203ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIERvbTcgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMgPSB0aGlzLCBpID0gMDtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhcnJheS1saWtlIG9iamVjdFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIF90aGlzW2ldID0gYXJyW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX3RoaXMubGVuZ3RoID0gYXJyLmxlbmd0aDtcbiAgICAgICAgICAgIC8vIFJldHVybiBjb2xsZWN0aW9uIHdpdGggbWV0aG9kc1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHZhciAkID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0KSB7XG4gICAgICAgICAgICB2YXIgYXJyID0gW10sIGkgPSAwO1xuICAgICAgICAgICAgaWYgKHNlbGVjdG9yICYmICFjb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVscywgdGVtcFBhcmVudCwgaHRtbCA9IHNlbGVjdG9yLnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPCcpID49IDAgJiYgaHRtbC5pbmRleE9mKCc+JykgPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRvQ3JlYXRlID0gJ2Rpdic7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8bGknKSA9PT0gMCkgdG9DcmVhdGUgPSAndWwnO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRyJykgPT09IDApIHRvQ3JlYXRlID0gJ3Rib2R5JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0ZCcpID09PSAwIHx8IGh0bWwuaW5kZXhPZignPHRoJykgPT09IDApIHRvQ3JlYXRlID0gJ3RyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0Ym9keScpID09PSAwKSB0b0NyZWF0ZSA9ICd0YWJsZSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8b3B0aW9uJykgPT09IDApIHRvQ3JlYXRlID0gJ3NlbGVjdCc7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wUGFyZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0b0NyZWF0ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wUGFyZW50LmlubmVySFRNTCA9IHNlbGVjdG9yO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRlbXBQYXJlbnQuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHRlbXBQYXJlbnQuY2hpbGROb2Rlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWNvbnRleHQgJiYgc2VsZWN0b3JbMF0gPT09ICcjJyAmJiAhc2VsZWN0b3IubWF0Y2goL1sgLjw+On5dLykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBQdXJlIElEIHNlbGVjdG9yXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzID0gW2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yLnNwbGl0KCcjJylbMV0pXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIE90aGVyIHNlbGVjdG9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVscyA9IChjb250ZXh0IHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBlbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWxzW2ldKSBhcnIucHVzaChlbHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIE5vZGUvZWxlbWVudFxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yID09PSB3aW5kb3cgfHwgc2VsZWN0b3IgPT09IGRvY3VtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGFyci5wdXNoKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy9BcnJheSBvZiBlbGVtZW50cyBvciBpbnN0YW5jZSBvZiBEb21cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChzZWxlY3Rvci5sZW5ndGggPiAwICYmIHNlbGVjdG9yWzBdLm5vZGVUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzZWxlY3Rvci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goc2VsZWN0b3JbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KGFycik7XG4gICAgICAgIH07XG4gICAgICAgIERvbTcucHJvdG90eXBlID0ge1xuICAgICAgICAgICAgLy8gQ2xhc3NlcyBhbmQgYXR0cml1dGVzXG4gICAgICAgICAgICBhZGRDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY2xhc3NOYW1lID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2pdLmNsYXNzTGlzdC5hZGQoY2xhc3Nlc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbal0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoYXNDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpc1swXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3M6IGZ1bmN0aW9uIChjbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbal0uY2xhc3NMaXN0LnRvZ2dsZShjbGFzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhdHRyOiBmdW5jdGlvbiAoYXR0cnMsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGF0dHJzID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgYXR0clxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXSkgcmV0dXJuIHRoaXNbMF0uZ2V0QXR0cmlidXRlKGF0dHJzKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IGF0dHJzXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBTdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLnNldEF0dHJpYnV0ZShhdHRycywgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgYXR0ck5hbWUgaW4gYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXVthdHRyTmFtZV0gPSBhdHRyc1thdHRyTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlQXR0cjogZnVuY3Rpb24gKGF0dHIpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5yZW1vdmVBdHRyaWJ1dGUoYXR0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YUtleSA9IHRoaXNbMF0uZ2V0QXR0cmlidXRlKCdkYXRhLScgKyBrZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXkpIHJldHVybiBkYXRhS2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpc1swXS5kb203RWxlbWVudERhdGFTdG9yYWdlICYmIChrZXkgaW4gdGhpc1swXS5kb203RWxlbWVudERhdGFTdG9yYWdlKSkgcmV0dXJuIHRoaXNbMF0uZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFNldCB2YWx1ZVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UpIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2Vba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBUcmFuc2Zvcm1zXG4gICAgICAgICAgICB0cmFuc2Zvcm0gOiBmdW5jdGlvbiAodHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgZWxTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBlbFN0eWxlLk1zVHJhbnNmb3JtID0gZWxTdHlsZS5tc1RyYW5zZm9ybSA9IGVsU3R5bGUuTW96VHJhbnNmb3JtID0gZWxTdHlsZS5PVHJhbnNmb3JtID0gZWxTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgZHVyYXRpb24gIT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uID0gZHVyYXRpb24gKyAnbXMnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsU3R5bGUgPSB0aGlzW2ldLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICBlbFN0eWxlLndlYmtpdFRyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUuTXNUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLm1zVHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5Nb3pUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLk9UcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL0V2ZW50c1xuICAgICAgICAgICAgb246IGZ1bmN0aW9uIChldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBsaXN0ZW5lciwgY2FwdHVyZSkge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGhhbmRsZUxpdmVFdmVudChlKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQodGFyZ2V0KS5pcyh0YXJnZXRTZWxlY3RvcikpIGxpc3RlbmVyLmNhbGwodGFyZ2V0LCBlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50cyA9ICQodGFyZ2V0KS5wYXJlbnRzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBhcmVudHMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoJChwYXJlbnRzW2tdKS5pcyh0YXJnZXRTZWxlY3RvcikpIGxpc3RlbmVyLmNhbGwocGFyZW50c1trXSwgZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIHZhciBpLCBqO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0U2VsZWN0b3IgPT09ICdmdW5jdGlvbicgfHwgdGFyZ2V0U2VsZWN0b3IgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBVc3VhbCBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0U2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlID0gYXJndW1lbnRzWzJdIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGV2ZW50cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbal0sIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vTGl2ZSBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXNbaV0uZG9tN0xpdmVMaXN0ZW5lcnMpIHRoaXNbaV0uZG9tN0xpdmVMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmRvbTdMaXZlTGlzdGVuZXJzLnB1c2goe2xpc3RlbmVyOiBsaXN0ZW5lciwgbGl2ZUxpc3RlbmVyOiBoYW5kbGVMaXZlRXZlbnR9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnRzW2pdLCBoYW5kbGVMaXZlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdGFyZ2V0U2VsZWN0b3IsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IGV2ZW50TmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJyB8fCB0YXJnZXRTZWxlY3RvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBVc3VhbCBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlID0gYXJndW1lbnRzWzJdIHx8IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2pdLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCBsaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBMaXZlIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbal0uZG9tN0xpdmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCB0aGlzW2pdLmRvbTdMaXZlTGlzdGVuZXJzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tqXS5kb203TGl2ZUxpc3RlbmVyc1trXS5saXN0ZW5lciA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2pdLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnRzW2ldLCB0aGlzW2pdLmRvbTdMaXZlTGlzdGVuZXJzW2tdLmxpdmVMaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25jZTogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdGFyZ2V0U2VsZWN0b3IsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTZWxlY3RvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICAgICAgICAgICAgY2FwdHVyZSA9IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcHJveHkoZSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcihlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9tLm9mZihldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBwcm94eSwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRvbS5vbihldmVudE5hbWUsIHRhcmdldFNlbGVjdG9yLCBwcm94eSwgY2FwdHVyZSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJpZ2dlcjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnREYXRhKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBldnQ7XG4gICAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KGV2ZW50TmFtZSwge2RldGFpbDogZXZlbnREYXRhLCBidWJibGVzOiB0cnVlLCBjYW5jZWxhYmxlOiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdFdmVudCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LmluaXRFdmVudChldmVudE5hbWUsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0LmRldGFpbCA9IGV2ZW50RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJywgJ29UcmFuc2l0aW9uRW5kJywgJ01TVHJhbnNpdGlvbkVuZCcsICdtc1RyYW5zaXRpb25FbmQnXSxcbiAgICAgICAgICAgICAgICAgICAgaSwgaiwgZG9tID0gdGhpcztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmaXJlQ2FsbEJhY2soZSkge1xuICAgICAgICAgICAgICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLm9mZihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5vbihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gU2l6aW5nL1N0eWxlc1xuICAgICAgICAgICAgd2lkdGg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1swXSA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KHRoaXMuY3NzKCd3aWR0aCcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dGVyV2lkdGg6IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KHRoaXMuY3NzKCdtYXJnaW4tcmlnaHQnKSkgKyBwYXJzZUZsb2F0KHRoaXMuY3NzKCdtYXJnaW4tbGVmdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0gPT09IHdpbmRvdykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5jc3MoJ2hlaWdodCcpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG91dGVySGVpZ2h0OiBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlTWFyZ2lucylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodCArIHBhcnNlRmxvYXQodGhpcy5jc3MoJ21hcmdpbi10b3AnKSkgKyBwYXJzZUZsb2F0KHRoaXMuY3NzKCdtYXJnaW4tYm90dG9tJykpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2Zmc2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNsaWVudFRvcCAgPSBlbC5jbGllbnRUb3AgIHx8IGJvZHkuY2xpZW50VG9wICB8fCAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50TGVmdCA9IGVsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGVsLnNjcm9sbFRvcDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZWwuc2Nyb2xsTGVmdDtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcDogYm94LnRvcCAgKyBzY3JvbGxUb3AgIC0gY2xpZW50VG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdFxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNzczogZnVuY3Rpb24gKHByb3BzLCB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXSkgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXNbMF0sIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBwcm9wIGluIHByb3BzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uc3R5bGVbcHJvcF0gPSBwcm9wc1twcm9wXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLnN0eWxlW3Byb3BzXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgXG4gICAgICAgICAgICAvL0RvbSBtYW5pcHVsYXRpb25cbiAgICAgICAgICAgIGVhY2g6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNbaV0sIGksIHRoaXNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBodG1sOiBmdW5jdGlvbiAoaHRtbCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaHRtbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0gPyB0aGlzWzBdLmlubmVySFRNTCA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5pbm5lckhUTUwgPSBodG1sO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0ZXh0OiBmdW5jdGlvbiAodGV4dCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGV4dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLnRleHRDb250ZW50LnRyaW0oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaXM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGlmICghdGhpc1swXSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHZhciBjb21wYXJlV2l0aCwgaTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwgPT09IGRvY3VtZW50KSByZXR1cm4gc2VsZWN0b3IgPT09IGRvY3VtZW50O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWwgPT09IHdpbmRvdykgcmV0dXJuIHNlbGVjdG9yID09PSB3aW5kb3c7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5tYXRjaGVzKSByZXR1cm4gZWwubWF0Y2hlcyhzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsLm1vek1hdGNoZXNTZWxlY3RvcikgcmV0dXJuIGVsLm1vek1hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGVsLm1zTWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWwubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmVXaXRoID0gJChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcGFyZVdpdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZVdpdGhbaV0gPT09IHRoaXNbMF0pIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yID09PSBkb2N1bWVudCkgcmV0dXJuIHRoaXNbMF0gPT09IGRvY3VtZW50O1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yID09PSB3aW5kb3cpIHJldHVybiB0aGlzWzBdID09PSB3aW5kb3c7XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmVXaXRoID0gc2VsZWN0b3Iubm9kZVR5cGUgPyBbc2VsZWN0b3JdIDogc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcGFyZVdpdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tcGFyZVdpdGhbaV0gPT09IHRoaXNbMF0pIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5kZXg6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1swXSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2hpbGQgPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICgoY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmcpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIGkrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVxOiBmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciByZXR1cm5JbmRleDtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuSW5kZXggPSBsZW5ndGggKyBpbmRleDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJldHVybkluZGV4IDwgMCkgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW3RoaXNbcmV0dXJuSW5kZXhdXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhbdGhpc1tpbmRleF1dKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcHBlbmQ6IGZ1bmN0aW9uIChuZXdDaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBqO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICh0ZW1wRGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKHRlbXBEaXYuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3Q2hpbGQgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbmV3Q2hpbGQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKG5ld0NoaWxkW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXBlbmQ6IGZ1bmN0aW9uIChuZXdDaGlsZCkge1xuICAgICAgICAgICAgICAgIHZhciBpLCBqO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGVtcERpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IHRlbXBEaXYuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBqID49IDA7IGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKHRlbXBEaXYuY2hpbGROb2Rlc1tqXSwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoaXNbaV0uaW5zZXJ0QWRqYWNlbnRIVE1MKCdhZnRlcmJlZ2luJywgbmV3Q2hpbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUobmV3Q2hpbGRbal0sIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmluc2VydEJlZm9yZShuZXdDaGlsZCwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBiZWZvcmUgPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlZm9yZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVswXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLCBiZWZvcmVbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGJlZm9yZS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGJlZm9yZS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlZm9yZVtqXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLmNsb25lTm9kZSh0cnVlKSwgYmVmb3JlW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbnNlcnRBZnRlcjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFmdGVyID0gJChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZnRlci5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFmdGVyWzBdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXNbaV0sIGFmdGVyWzBdLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChhZnRlci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGFmdGVyLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXJbal0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpc1tpXS5jbG9uZU5vZGUodHJ1ZSksIGFmdGVyW2pdLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBuZXh0OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nICYmICQodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLm5leHRFbGVtZW50U2libGluZ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKSByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHRBbGw6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0RWxzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgICAgICAgICAgICBpZiAoIWVsKSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJChuZXh0KS5pcyhzZWxlY3RvcikpIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBuZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IERvbTcobmV4dEVscyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJldjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgJiYgJCh0aGlzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHJldHVybiBuZXcgRG9tNyhbdGhpc1swXS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXZBbGw6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2RWxzID0gW107XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgICAgICAgICAgICBpZiAoIWVsKSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgIHdoaWxlIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKHByZXYpLmlzKHNlbGVjdG9yKSkgcHJldkVscy5wdXNoKHByZXYpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcHJldkVscy5wdXNoKHByZXYpO1xuICAgICAgICAgICAgICAgICAgICBlbCA9IHByZXY7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhwcmV2RWxzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXJlbnQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpc1tpXS5wYXJlbnROb2RlKS5pcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKHRoaXNbaV0ucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC51bmlxdWUocGFyZW50cykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmVudHM6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnQgPSB0aGlzW2ldLnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHBhcmVudCkuaXMoc2VsZWN0b3IpKSBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50ID0gcGFyZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuICQoJC51bmlxdWUocGFyZW50cykpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpbmQgOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgZm91bmRFbGVtZW50cyA9IFtdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZm91bmQgPSB0aGlzW2ldLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZvdW5kLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3VuZEVsZW1lbnRzLnB1c2goZm91bmRbal0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhmb3VuZEVsZW1lbnRzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjaGlsZHJlbjogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZE5vZGVzID0gdGhpc1tpXS5jaGlsZE5vZGVzO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNoaWxkTm9kZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGROb2Rlc1tqXS5ub2RlVHlwZSA9PT0gMSkgY2hpbGRyZW4ucHVzaChjaGlsZE5vZGVzW2pdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGVzW2pdLm5vZGVUeXBlID09PSAxICYmICQoY2hpbGROb2Rlc1tqXSkuaXMoc2VsZWN0b3IpKSBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNygkLnVuaXF1ZShjaGlsZHJlbikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW92ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tpXS5wYXJlbnROb2RlKSB0aGlzW2ldLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFkZDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkb20gPSB0aGlzO1xuICAgICAgICAgICAgICAgIHZhciBpLCBqO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRvQWRkID0gJChhcmd1bWVudHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgdG9BZGQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbVtkb20ubGVuZ3RoXSA9IHRvQWRkW2pdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLmxlbmd0aCsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBkb207XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgICQuZm4gPSBEb203LnByb3RvdHlwZTtcbiAgICAgICAgJC51bmlxdWUgPSBmdW5jdGlvbiAoYXJyKSB7XG4gICAgICAgICAgICB2YXIgdW5pcXVlID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh1bmlxdWUuaW5kZXhPZihhcnJbaV0pID09PSAtMSkgdW5pcXVlLnB1c2goYXJyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB1bmlxdWU7XG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHJldHVybiAkO1xuICAgIH0pKCk7XG4gICAgXG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICBHZXQgRG9tIGxpYnJhcmllc1xuICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIHZhciBzd2lwZXJEb21QbHVnaW5zID0gWydqUXVlcnknLCAnWmVwdG8nLCAnRG9tNyddO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3dpcGVyRG9tUGx1Z2lucy5sZW5ndGg7IGkrKykge1xuICAgIFx0aWYgKHdpbmRvd1tzd2lwZXJEb21QbHVnaW5zW2ldXSkge1xuICAgIFx0XHRhZGRMaWJyYXJ5UGx1Z2luKHdpbmRvd1tzd2lwZXJEb21QbHVnaW5zW2ldXSk7XG4gICAgXHR9XG4gICAgfVxuICAgIC8vIFJlcXVpcmVkIERPTSBQbHVnaW5zXG4gICAgdmFyIGRvbUxpYjtcbiAgICBpZiAodHlwZW9mIERvbTcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgXHRkb21MaWIgPSB3aW5kb3cuRG9tNyB8fCB3aW5kb3cuWmVwdG8gfHwgd2luZG93LmpRdWVyeTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgXHRkb21MaWIgPSBEb203O1xuICAgIH1cblxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgQWRkIC5zd2lwZXIgcGx1Z2luIGZyb20gRG9tIGxpYnJhcmllc1xuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgZnVuY3Rpb24gYWRkTGlicmFyeVBsdWdpbihsaWIpIHtcbiAgICAgICAgbGliLmZuLnN3aXBlciA9IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgICAgICAgIHZhciBmaXJzdEluc3RhbmNlO1xuICAgICAgICAgICAgbGliKHRoaXMpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBzID0gbmV3IFN3aXBlcih0aGlzLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgIGlmICghZmlyc3RJbnN0YW5jZSkgZmlyc3RJbnN0YW5jZSA9IHM7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmaXJzdEluc3RhbmNlO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBpZiAoZG9tTGliKSB7XG4gICAgICAgIGlmICghKCd0cmFuc2l0aW9uRW5kJyBpbiBkb21MaWIuZm4pKSB7XG4gICAgICAgICAgICBkb21MaWIuZm4udHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgIHZhciBldmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCcsICdvVHJhbnNpdGlvbkVuZCcsICdNU1RyYW5zaXRpb25FbmQnLCAnbXNUcmFuc2l0aW9uRW5kJ10sXG4gICAgICAgICAgICAgICAgICAgIGksIGosIGRvbSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZmlyZUNhbGxCYWNrKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgLypqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5vZmYoZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20ub24oZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISgndHJhbnNmb3JtJyBpbiBkb21MaWIuZm4pKSB7XG4gICAgICAgICAgICBkb21MaWIuZm4udHJhbnNmb3JtID0gZnVuY3Rpb24gKHRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxTdHlsZSA9IHRoaXNbaV0uc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNmb3JtID0gZWxTdHlsZS5Nc1RyYW5zZm9ybSA9IGVsU3R5bGUubXNUcmFuc2Zvcm0gPSBlbFN0eWxlLk1velRyYW5zZm9ybSA9IGVsU3R5bGUuT1RyYW5zZm9ybSA9IGVsU3R5bGUudHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoJ3RyYW5zaXRpb24nIGluIGRvbUxpYi5mbikpIHtcbiAgICAgICAgICAgIGRvbUxpYi5mbi50cmFuc2l0aW9uID0gZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkdXJhdGlvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxTdHlsZSA9IHRoaXNbaV0uc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5Nc1RyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUubXNUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLk1velRyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUuT1RyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISgnb3V0ZXJXaWR0aCcgaW4gZG9tTGliLmZuKSkge1xuICAgICAgICAgICAgZG9tTGliLmZuLm91dGVyV2lkdGggPSBmdW5jdGlvbiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmNsdWRlTWFyZ2lucylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdCh0aGlzLmNzcygnbWFyZ2luLXJpZ2h0JykpICsgcGFyc2VGbG9hdCh0aGlzLmNzcygnbWFyZ2luLWxlZnQnKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHdpbmRvdy5Td2lwZXIgPSBTd2lwZXI7XG59KSgpO1xuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cblN3aXBlciBBTUQgRXhwb3J0XG49PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuaWYgKHR5cGVvZihtb2R1bGUpICE9PSAndW5kZWZpbmVkJylcbntcbiAgICBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5Td2lwZXI7XG59XG5lbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnO1xuICAgICAgICByZXR1cm4gd2luZG93LlN3aXBlcjtcbiAgICB9KTtcbn1cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvc3dpcGVyLmpzLm1hcFxuIiwiLyohXG4gKiBFdmVudEVtaXR0ZXIgdjQuMi4xMSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwOi8vb2xpLm1lLnVrL1xuICogQHByZXNlcnZlXG4gKi9cblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogQ2xhc3MgZm9yIG1hbmFnaW5nIGV2ZW50cy5cbiAgICAgKiBDYW4gYmUgZXh0ZW5kZWQgdG8gcHJvdmlkZSBldmVudCBmdW5jdGlvbmFsaXR5IGluIG90aGVyIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnRFbWl0dGVyIE1hbmFnZXMgZXZlbnQgcmVnaXN0ZXJpbmcgYW5kIGVtaXR0aW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHt9XG5cbiAgICAvLyBTaG9ydGN1dHMgdG8gaW1wcm92ZSBzcGVlZCBhbmQgc2l6ZVxuICAgIHZhciBwcm90byA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGU7XG4gICAgdmFyIGV4cG9ydHMgPSB0aGlzO1xuICAgIHZhciBvcmlnaW5hbEdsb2JhbFZhbHVlID0gZXhwb3J0cy5FdmVudEVtaXR0ZXI7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIGxpc3RlbmVyIGZvciB0aGUgZXZlbnQgaW4gaXRzIHN0b3JhZ2UgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGxpc3RlbmVycyBBcnJheSBvZiBsaXN0ZW5lcnMgdG8gc2VhcmNoIHRocm91Z2guXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGxvb2sgZm9yLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gSW5kZXggb2YgdGhlIHNwZWNpZmllZCBsaXN0ZW5lciwgLTEgaWYgbm90IGZvdW5kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVycywgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGEgbWV0aG9kIHdoaWxlIGtlZXBpbmcgdGhlIGNvbnRleHQgY29ycmVjdCwgdG8gYWxsb3cgZm9yIG92ZXJ3cml0aW5nIG9mIHRhcmdldCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGFsaWFzZWQgbWV0aG9kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWxpYXMobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWxpYXNDbG9zdXJlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0ZW5lciBhcnJheSBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaWxsIGluaXRpYWxpc2UgdGhlIGV2ZW50IG9iamVjdCBhbmQgbGlzdGVuZXIgYXJyYXlzIGlmIHJlcXVpcmVkLlxuICAgICAqIFdpbGwgcmV0dXJuIGFuIG9iamVjdCBpZiB5b3UgdXNlIGEgcmVnZXggc2VhcmNoLiBUaGUgb2JqZWN0IGNvbnRhaW5zIGtleXMgZm9yIGVhY2ggbWF0Y2hlZCBldmVudC4gU28gL2JhW3J6XS8gbWlnaHQgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nIGJhciBhbmQgYmF6LiBCdXQgb25seSBpZiB5b3UgaGF2ZSBlaXRoZXIgZGVmaW5lZCB0aGVtIHdpdGggZGVmaW5lRXZlbnQgb3IgYWRkZWQgc29tZSBsaXN0ZW5lcnMgdG8gdGhlbS5cbiAgICAgKiBFYWNoIHByb3BlcnR5IGluIHRoZSBvYmplY3QgcmVzcG9uc2UgaXMgYW4gYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfE9iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgdGhlIGV2ZW50LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldExpc3RlbmVycyhldnQpIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGEgY29uY2F0ZW5hdGVkIGFycmF5IG9mIGFsbCBtYXRjaGluZyBldmVudHMgaWZcbiAgICAgICAgLy8gdGhlIHNlbGVjdG9yIGlzIGEgcmVndWxhciBleHByZXNzaW9uLlxuICAgICAgICBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Vba2V5XSA9IGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gZXZlbnRzW2V2dF0gfHwgKGV2ZW50c1tldnRdID0gW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGxpc3Qgb2YgbGlzdGVuZXIgb2JqZWN0cyBhbmQgZmxhdHRlbnMgaXQgaW50byBhIGxpc3Qgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gbGlzdGVuZXJzIFJhdyBsaXN0ZW5lciBvYmplY3RzLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW119IEp1c3QgdGhlIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90by5mbGF0dGVuTGlzdGVuZXJzID0gZnVuY3Rpb24gZmxhdHRlbkxpc3RlbmVycyhsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGZsYXRMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZmxhdExpc3RlbmVycy5wdXNoKGxpc3RlbmVyc1tpXS5saXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmxhdExpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgcmVxdWVzdGVkIGxpc3RlbmVycyB2aWEgZ2V0TGlzdGVuZXJzIGJ1dCB3aWxsIGFsd2F5cyByZXR1cm4gdGhlIHJlc3VsdHMgaW5zaWRlIGFuIG9iamVjdC4gVGhpcyBpcyBtYWlubHkgZm9yIGludGVybmFsIHVzZSBidXQgb3RoZXJzIG1heSBmaW5kIGl0IHVzZWZ1bC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBpbiBhbiBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzQXNPYmplY3QgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnNBc09iamVjdChldnQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICByZXNwb25zZVtldnRdID0gbGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8IGxpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogVGhlIGxpc3RlbmVyIHdpbGwgbm90IGJlIGFkZGVkIGlmIGl0IGlzIGEgZHVwbGljYXRlLlxuICAgICAqIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIElmIHlvdSBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lIHRoZW4gdGhlIGxpc3RlbmVyIHdpbGwgYmUgYWRkZWQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy4gWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIGFkZCB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKiBZZWFoLCB0aGlzIGZ1bmN0aW9uIGRvZXMgcXVpdGUgYSBiaXQuIFRoYXQncyBwcm9iYWJseSBhIGJhZCB0aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKGZhbHNlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVycyBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnModHJ1ZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyBsaXN0ZW5lcnMgaW4gYnVsay4gVGhlIGFkZExpc3RlbmVycyBhbmQgcmVtb3ZlTGlzdGVuZXJzIG1ldGhvZHMgYm90aCB1c2UgdGhpcyB0byBkbyB0aGVpciBqb2IuIFlvdSBzaG91bGQgcmVhbGx5IHVzZSB0aG9zZSBpbnN0ZWFkLCB0aGlzIGlzIGEgbGl0dGxlIGxvd2VyIGxldmVsLlxuICAgICAqIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGRldGVybWluZSBpZiB0aGUgbGlzdGVuZXJzIGFyZSByZW1vdmVkICh0cnVlKSBvciBhZGRlZCAoZmFsc2UpLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkL3JlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWFuaXB1bGF0ZSB0aGUgbGlzdGVuZXJzIG9mIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlIFRydWUgaWYgeW91IHdhbnQgdG8gcmVtb3ZlIGxpc3RlbmVycywgZmFsc2UgaWYgeW91IHdhbnQgdG8gYWRkLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkL3JlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5tYW5pcHVsYXRlTGlzdGVuZXJzID0gZnVuY3Rpb24gbWFuaXB1bGF0ZUxpc3RlbmVycyhyZW1vdmUsIGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBzaW5nbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVyIDogdGhpcy5hZGRMaXN0ZW5lcjtcbiAgICAgICAgdmFyIG11bHRpcGxlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lcnMgOiB0aGlzLmFkZExpc3RlbmVycztcblxuICAgICAgICAvLyBJZiBldnQgaXMgYW4gb2JqZWN0IHRoZW4gcGFzcyBlYWNoIG9mIGl0cyBwcm9wZXJ0aWVzIHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIGlmICh0eXBlb2YgZXZ0ID09PSAnb2JqZWN0JyAmJiAhKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0Lmhhc093blByb3BlcnR5KGkpICYmICh2YWx1ZSA9IGV2dFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgc2luZ2xlIGxpc3RlbmVyIHN0cmFpZ2h0IHRocm91Z2ggdG8gdGhlIHNpbmd1bGFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgcGFzcyBiYWNrIHRvIHRoZSBtdWx0aXBsZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBTbyBldnQgbXVzdCBiZSBhIHN0cmluZ1xuICAgICAgICAgICAgLy8gQW5kIGxpc3RlbmVycyBtdXN0IGJlIGFuIGFycmF5IG9mIGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gTG9vcCBvdmVyIGl0IGFuZCBwYXNzIGVhY2ggb25lIHRvIHRoZSBtdWx0aXBsZSBtZXRob2RcbiAgICAgICAgICAgIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGV2dCwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSBhIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBJZiB5b3UgZG8gbm90IHNwZWNpZnkgYW4gZXZlbnQgdGhlbiBhbGwgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBUaGF0IG1lYW5zIGV2ZXJ5IGV2ZW50IHdpbGwgYmUgZW1wdGllZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ2V4IHRvIHJlbW92ZSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IFtldnRdIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci4gV2lsbCByZW1vdmUgZnJvbSBldmVyeSBldmVudCBpZiBub3QgcGFzc2VkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZXZ0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGV2dDtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJlbW92ZSBkaWZmZXJlbnQgdGhpbmdzIGRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgZXZ0XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbZXZ0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnRzIG1hdGNoaW5nIHRoZSByZWdleC5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBpbiBhbGwgZXZlbnRzXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUV2ZW50LlxuICAgICAqXG4gICAgICogQWRkZWQgdG8gbWlycm9yIHRoZSBub2RlIEFQSS5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBhbGlhcygncmVtb3ZlRXZlbnQnKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFuIGV2ZW50IG9mIHlvdXIgY2hvaWNlLlxuICAgICAqIFdoZW4gZW1pdHRlZCwgZXZlcnkgbGlzdGVuZXIgYXR0YWNoZWQgdG8gdGhhdCBldmVudCB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgICAqIElmIHlvdSBwYXNzIHRoZSBvcHRpb25hbCBhcmd1bWVudCBhcnJheSB0aGVuIHRob3NlIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCB0byBldmVyeSBsaXN0ZW5lciB1cG9uIGV4ZWN1dGlvbi5cbiAgICAgKiBCZWNhdXNlIGl0IHVzZXMgYGFwcGx5YCwgeW91ciBhcnJheSBvZiBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgYXMgaWYgeW91IHdyb3RlIHRoZW0gb3V0IHNlcGFyYXRlbHkuXG4gICAgICogU28gdGhleSB3aWxsIG5vdCBhcnJpdmUgd2l0aGluIHRoZSBhcnJheSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhleSB3aWxsIGJlIHNlcGFyYXRlLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBPcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24gZW1pdEV2ZW50KGV2dCwgYXJncykge1xuICAgICAgICB2YXIgbGlzdGVuZXJzTWFwID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXJzO1xuICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzTWFwKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzTWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNNYXBba2V5XS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHNoYWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGVpdGhlciB3aXRoIGEgYmFzaWMgY2FsbCBvciBhbiBhcHBseSBpZiB0aGVyZSBpcyBhbiBhcmdzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBsaXN0ZW5lci5saXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IHRoaXMuX2dldE9uY2VSZXR1cm5WYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGVtaXRFdmVudFxuICAgICAqL1xuICAgIHByb3RvLnRyaWdnZXIgPSBhbGlhcygnZW1pdEV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0bHkgZGlmZmVyZW50IGZyb20gZW1pdEV2ZW50IGluIHRoYXQgaXQgd2lsbCBwYXNzIGl0cyBhcmd1bWVudHMgb24gdG8gdGhlIGxpc3RlbmVycywgYXMgb3Bwb3NlZCB0byB0YWtpbmcgYSBzaW5nbGUgYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3Mgb24uXG4gICAgICogQXMgd2l0aCBlbWl0RXZlbnQsIHlvdSBjYW4gcGFzcyBhIHJlZ2V4IGluIHBsYWNlIG9mIHRoZSBldmVudCBuYW1lIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gT3B0aW9uYWwgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdEV2ZW50KGV2dCwgYXJncyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmIGFcbiAgICAgKiBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhlIG9uZSBzZXQgaGVyZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIGFmdGVyIGV4ZWN1dGlvbi4gVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIHRvIGNoZWNrIGZvciB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uc2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gc2V0T25jZVJldHVyblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX29uY2VSZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWZcbiAgICAgKiB0aGUgbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoaXMgb25lIHRoZW4gaXQgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBhdXRvbWF0aWNhbGx5LiBJdCB3aWxsIHJldHVybiB0cnVlIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHsqfEJvb2xlYW59IFRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGZvciBvciB0aGUgZGVmYXVsdCwgdHJ1ZS5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gX2dldE9uY2VSZXR1cm5WYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ19vbmNlUmV0dXJuVmFsdWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGV2ZW50cyBvYmplY3QgYW5kIGNyZWF0ZXMgb25lIGlmIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXZlbnRzIHN0b3JhZ2Ugb2JqZWN0LlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRFdmVudHMgPSBmdW5jdGlvbiBfZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldmVydHMgdGhlIGdsb2JhbCB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0byBpdHMgcHJldmlvdXMgdmFsdWUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhpcyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IE5vbiBjb25mbGljdGluZyBFdmVudEVtaXR0ZXIgY2xhc3MuXG4gICAgICovXG4gICAgRXZlbnRFbWl0dGVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IG9yaWdpbmFsR2xvYmFsVmFsdWU7XG4gICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfTtcblxuICAgIC8vIEV4cG9zZSB0aGUgY2xhc3MgZWl0aGVyIHZpYSBBTUQsIENvbW1vbkpTIG9yIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG59LmNhbGwodGhpcykpO1xuIl19
