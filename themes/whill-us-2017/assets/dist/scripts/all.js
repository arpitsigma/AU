(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
  $(document).on("click", ".js-select-category", function() {
    var masonryItemSelector;
    $(this).parent().siblings().find('a').removeClass('selected');
    $(this).toggleClass('selected');
    if ($(this).hasClass('selected')) {
      $('.p-voices__item').hide();
      masonryItemSelector = '.'.concat($(this).data('tile-target'));
      $(masonryItemSelector).show();
      return $masonry = $('[data-masonry]').packery({
        columnWidth: '[data-masonry-sizer]',
        itemSelector: masonryItemSelector,
        percentPosition: true,
        transitionDuration: 0
      });
    } else {
      $('.p-voices__item').show();
      return $masonry = $('[data-masonry]').packery({
        columnWidth: '[data-masonry-sizer]',
        itemSelector: '[data-masonry-item]',
        percentPosition: true,
        transitionDuration: 0
      });
    }
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
  return $('a.p-main-visual').magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
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

$(function () {
	// Initial state
	var scrollPos = 0;
	// adding scroll event
	window.addEventListener('scroll', function(){
	  // detects new state and compares it with the new one
	  if ((document.body.getBoundingClientRect()).top > scrollPos){
			//document.getElementById('info-box').setAttribute('data-scroll-direction', 'UP');
		$('header.p-navbar').removeClass('scrdown-nav-hide');
		$('header.p-navbar').addClass('scrup-nav-hide');
	  } else {
			//document.getElementById('info-box').setAttribute('data-scroll-direction', 'DOWN');
		$('header.p-navbar').removeClass('scrup-nav-hide');
		$('header.p-navbar').addClass('scrdown-nav-hide');
	  }
		// saves the new position for iteration.
		scrollPos = (document.body.getBoundingClientRect()).top;
	});
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
 * Swiper 3.4.2
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * 
 * http://www.idangero.us/swiper/
 * 
 * Copyright 2017, Vladimir Kharlampidi
 * The iDangero.us
 * http://www.idangero.us/
 * 
 * Licensed under MIT
 * 
 * Released on: March 10, 2017
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
            onBeforeResize: function (swiper)
            onAfterResize: function (swiper)
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
            onKeyPress: function (swiper, keyCode)
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
        }
        if (s.params.effect === 'fade' || s.params.effect === 'flip') {
            s.params.slidesPerView = 1;
            s.params.slidesPerColumn = 1;
            s.params.slidesPerGroup = 1;
            s.params.watchSlidesProgress = true;
            s.params.spaceBetween = 0;
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
                    if(prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - s.size / 2 - spaceBetween;
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
            var newTranslate;
            function forceSetTranslate() {
                var translate = s.rtl ? -s.translate : s.translate;
                newTranslate = Math.min(Math.max(s.translate, s.maxTranslate()), s.minTranslate());
                s.setWrapperTranslate(newTranslate);
                s.updateActiveIndex();
                s.updateClasses();
            }
            if (updateTranslate) {
                var translated;
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
            if (s.params.onBeforeResize) s.params.onBeforeResize(s);
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
            if (s.params.onAfterResize) s.params.onAfterResize(s);
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
            if (typeof startMoving === 'undefined') {
                if (s.touches.currentX !== s.touches.startX || s.touches.currentY !== s.touches.startY) {
                    startMoving = true;
                }
            }
            if (!isTouched) return;
            if (isScrolling)  {
                isTouched = false;
                return;
            }
            if (!startMoving) {
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
                        if (typeof s === 'undefined' || s === null || !s) return;
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
                $(sb.track).off(sb.draggableEvents.start, sb.dragStart);
                $(target).off(sb.draggableEvents.move, sb.dragMove);
                $(target).off(sb.draggableEvents.end, sb.dragEnd);
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
               if (Array.isArray(controlled)) {
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
                if (Array.isArray(controlled)) {
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
                if (hash) {
                    var speed = 0;
                    for (var i = 0, length = s.slides.length; i < length; i++) {
                        var slide = s.slides.eq(i);
                        var slideHash = slide.attr('data-hash') || slide.attr('data-history');
                        if (slideHash === hash && !slide.hasClass(s.params.slideDuplicateClass)) {
                            var index = slide.index();
                            s.slideTo(index, speed, s.params.runCallbacksOnInit, true);
                        }
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
            s.emit('onKeyPress', s, kc);
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
            s.params.mousewheelControl = false;
            return true;
        };
        
        s.enableMousewheelControl = function () {
            if (!s.mousewheel.event) return false;
            var target = s.container;
            if (s.params.mousewheelEventsTarged !== 'container') {
                target = $(s.params.mousewheelEventsTarged);
            }
            target.on(s.mousewheel.event, handleMousewheel);
            s.params.mousewheelControl = true;
            return true;
        };
        

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhc3NldHMvc3JjL3NjcmlwdHMvRml4ZWROYXZiYXIuY29mZmVlIiwiYXNzZXRzL3NyYy9zY3JpcHRzL0ZpeGVkU3ViTmF2YmFyLmNvZmZlZSIsImFzc2V0cy9zcmMvc2NyaXB0cy9NYXNvbnJ5LmNvZmZlZSIsImFzc2V0cy9zcmMvc2NyaXB0cy9Nb2JpbGVOYXZpZ2F0aW9uLmpzIiwiYXNzZXRzL3NyYy9zY3JpcHRzL1Njcm9sbEFjdGlvbi5jb2ZmZWUiLCJhc3NldHMvc3JjL3NjcmlwdHMvU2xpZGVNZW51LmpzIiwiYXNzZXRzL3NyYy9zY3JpcHRzL1N1Yk5hdmlnYXRpb24uY29mZmVlIiwiYXNzZXRzL3NyYy9zY3JpcHRzL1N1YnNjcmlwdGlvblBvcHVwLmpzIiwiYXNzZXRzL3NyYy9zY3JpcHRzL1N3aXBlclRodW1icy5qcyIsImFzc2V0cy9zcmMvc2NyaXB0cy9Ub29sdGlwLmpzIiwiYXNzZXRzL3NyYy9zY3JpcHRzL2FsbC5jb2ZmZWUiLCJib3dlcl9jb21wb25lbnRzL2pxdWVyeS1icmlkZ2V0L2pxdWVyeS5icmlkZ2V0LmpzIiwibm9kZV9tb2R1bGVzL2Rlc2FuZHJvLWNsYXNzaWUvY2xhc3NpZS5qcyIsIm5vZGVfbW9kdWxlcy9kZXNhbmRyby1nZXQtc3R5bGUtcHJvcGVydHkvZ2V0LXN0eWxlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3Rvci5qcyIsIm5vZGVfbW9kdWxlcy9kb2MtcmVhZHkvZG9jLXJlYWR5LmpzIiwibm9kZV9tb2R1bGVzL2V2ZW50aWUvZXZlbnRpZS5qcyIsIm5vZGVfbW9kdWxlcy9maXp6eS11aS11dGlscy91dGlscy5qcyIsIm5vZGVfbW9kdWxlcy9nZXQtc2l6ZS9nZXQtc2l6ZS5qcyIsIm5vZGVfbW9kdWxlcy9vdXRsYXllci9pdGVtLmpzIiwibm9kZV9tb2R1bGVzL291dGxheWVyL291dGxheWVyLmpzIiwibm9kZV9tb2R1bGVzL3BhY2tlcnkvanMvaXRlbS5qcyIsIm5vZGVfbW9kdWxlcy9wYWNrZXJ5L2pzL3BhY2tlci5qcyIsIm5vZGVfbW9kdWxlcy9wYWNrZXJ5L2pzL3BhY2tlcnkuanMiLCJub2RlX21vZHVsZXMvcGFja2VyeS9qcy9yZWN0LmpzIiwibm9kZV9tb2R1bGVzL3N3aXBlci9kaXN0L2pzL3N3aXBlci5qcyIsIm5vZGVfbW9kdWxlcy93b2xmeTg3LWV2ZW50ZW1pdHRlci9FdmVudEVtaXR0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUEsSUFBQSxjQUFBO0VBQUE7O0FBQUEsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxRQUFSOztBQUNKLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0VBQ1QscUJBQUUsY0FBRixFQUFrQixZQUFsQjs7OztJQUNWLElBQUMsQ0FBQSxPQUFELEdBQVcsQ0FBQSxDQUFFLGNBQUY7SUFDWCxJQUFDLENBQUEsS0FBRCxHQUFTLENBQUEsQ0FBRSxZQUFGO0lBQ1QsSUFBQyxDQUFBLEVBQUQsQ0FBQTtJQUNBLElBQUMsQ0FBQSxJQUFELENBQUE7RUFKVTs7d0JBT1osZUFBQSxHQUFpQixTQUFBO1dBQ2YsSUFBQyxDQUFBLE9BQU8sQ0FBQyxNQUFULENBQUE7RUFEZTs7d0JBSWpCLGVBQUEsR0FBaUIsU0FBQTtXQUNmLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBVCxDQUFBLENBQW1CLENBQUM7RUFETDs7d0JBVWpCLElBQUEsR0FBTSxTQUFBO0lBQ0osSUFBQyxDQUFBLE9BQU8sQ0FBQyxRQUFULENBQWtCLFVBQWxCO1dBQ0EsSUFBQyxDQUFBLEtBQUssQ0FBQyxHQUFQLENBQVc7TUFBQSxVQUFBLEVBQVksSUFBQyxDQUFBLGVBQUQsQ0FBQSxDQUFaO0tBQVg7RUFGSTs7d0JBS04sRUFBQSxHQUFJLFNBQUE7QUFDRixRQUFBO0lBQUEsT0FBQSxHQUFVLENBQUEsQ0FBRSxNQUFGO0lBQ1YsT0FBTyxDQUFDLE1BQVIsQ0FBZSxJQUFDLENBQUEsSUFBaEI7SUFFQSxPQUFPLENBQUMsRUFBUixDQUFXLFlBQVgsRUFBeUIsSUFBQyxDQUFBLFdBQTFCO1dBRUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxPQUFiLEVBQXNCLEdBQXRCLEVBQTJCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQyxLQUFELEdBQUE7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTNCO0VBTkU7Ozs7Ozs7Ozs7O0FDNUJOLElBQUEsaUJBQUE7RUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osTUFBTSxDQUFDLE9BQVAsR0FBdUI7RUFFVCx3QkFBQyxRQUFELEVBQVcsU0FBWCxFQUFzQixNQUF0Qjs7Ozs7SUFDVixJQUFDLENBQUEsTUFBRCxHQUFVO0lBQ1YsSUFBQyxDQUFBLFFBQUQsR0FBWTtJQUNaLElBQUMsQ0FBQSxTQUFELEdBQWE7SUFDYixJQUFDLENBQUEsT0FBRCxHQUFXLENBQUEsQ0FBRSxNQUFGO0lBRVgsSUFBQyxDQUFBLE1BQUQsQ0FBQTtJQUVBLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLG9CQUFaLEVBQWtDLElBQUMsQ0FBQSxNQUFuQztFQVJVOzsyQkFVWixRQUFBLEdBQVMsU0FBQTtJQUVMLElBQUMsQ0FBQSxRQUFRLENBQUMsUUFBVixDQUFtQixJQUFDLENBQUEsU0FBcEI7V0FDQSxJQUFDLENBQUEsUUFBUSxDQUFDLE9BQVYsQ0FBa0IsVUFBbEI7RUFISzs7MkJBS1QsVUFBQSxHQUFXLFNBQUE7SUFFUCxJQUFDLENBQUEsUUFBUSxDQUFDLFdBQVYsQ0FBc0IsSUFBQyxDQUFBLFNBQXZCO1dBQ0EsSUFBQyxDQUFBLFFBQVEsQ0FBQyxPQUFWLENBQWtCLFlBQWxCO0VBSE87OzJCQUtYLFNBQUEsR0FBVSxTQUFBO1dBQ1IsUUFBQSxDQUFTLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFBLENBQWtCLENBQUMsR0FBNUI7RUFEUTs7MkJBSVYsTUFBQSxHQUFPLFNBQUE7SUFDTCxJQUFHLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBVCxDQUFBLENBQUEsR0FBd0IsSUFBQyxDQUFBLFNBQUQsQ0FBQSxDQUFBLEdBQWUsUUFBQSxDQUFTLElBQUMsQ0FBQSxNQUFNLENBQUMsZUFBUixDQUFBLENBQVQsQ0FBMUM7YUFDRSxJQUFDLENBQUEsVUFBRCxDQUFBLEVBREY7S0FBQSxNQUFBO2FBR0UsSUFBQyxDQUFBLFFBQUQsQ0FBQSxFQUhGOztFQURLOzs7Ozs7Ozs7OztBQzFCVCxJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsWUFBUjs7QUFDSixDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osT0FBQSxDQUFRLGdCQUFSOztBQUNBLENBQUMsQ0FBQyxPQUFGLENBQVcsU0FBWCxFQUFzQixPQUFBLENBQVEsU0FBUixDQUF0Qjs7QUFLQSxNQUFNLENBQUMsT0FBUCxHQUFpQixTQUFDLE1BQUQ7QUFHZixNQUFBO0VBQUEsSUFBQSxHQUFPO0VBRVAsU0FBQSxHQUFZO0VBRVosUUFBQSxHQUFXLENBQUEsQ0FBRSxnQkFBRixDQUFtQixDQUFDLE9BQXBCLENBQTRCO0lBQ3JDLFdBQUEsRUFBa0Isc0JBRG1CO0lBRXJDLFlBQUEsRUFBa0IscUJBRm1CO0lBR3JDLGVBQUEsRUFBa0IsSUFIbUI7SUFJckMsa0JBQUEsRUFBb0IsQ0FKaUI7R0FBNUI7RUFPWCxvQkFBQSxHQUF1QixTQUFBO0FBQ3JCLFFBQUE7SUFBQSxVQUFBLEdBQWEsQ0FBQSxDQUFFLGdCQUFGO1dBQ2IsVUFBVSxDQUFDLE1BQVgsQ0FBQSxDQUFBLEdBQXNCLFVBQVUsQ0FBQyxNQUFYLENBQUEsQ0FBbUIsQ0FBQyxHQUExQyxHQUFnRCxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsTUFBVixDQUFBLENBQUEsR0FBcUIsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLFNBQVYsQ0FBQTtFQUZoRDtFQUl2QixxQkFBQSxHQUF3QixTQUFBO0lBQ3RCLElBQUcsb0JBQUEsQ0FBQSxDQUFIO2FBQ0UsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLE9BQVYsQ0FBa0IsZ0JBQWxCLEVBREY7O0VBRHNCO0VBTXhCLE1BQUEsR0FBUyxTQUFBO0FBRVAsUUFBQTtJQUFBLElBQUEsQ0FBTyxTQUFQO01BQ0UsSUFBRyxJQUFBLEdBQU8sUUFBUSxDQUFDLElBQVQsQ0FBYyxrQkFBZCxDQUFWO1FBRUUsUUFBQSxHQUFXLElBQUEsR0FBTztRQUNsQixTQUFBLEdBQVk7UUFFWixRQUFRLENBQUMsT0FBVCxDQUFpQixNQUFqQixFQUF5QixnQkFBekIsRUFBMkMsU0FBQTtVQUN6QyxTQUFBLEdBQVk7aUJBQ1osSUFBQTtRQUZ5QyxDQUEzQztlQUlBLENBQUMsQ0FBQyxJQUFGLENBQ0U7VUFBQSxHQUFBLEVBQUssb0JBQUEsR0FBdUIsUUFBNUI7U0FERixDQUdBLENBQUMsSUFIRCxDQUdPLFNBQUUsSUFBRjtBQUNMLGNBQUE7VUFBQSxJQUFBLEdBQVEsT0FBQSxHQUFVLElBQVYsR0FBaUI7VUFDekIsTUFBQSxHQUFTLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEscUJBQWI7VUFDVCxRQUFRLENBQUMsTUFBVCxDQUFpQixNQUFqQjtpQkFDQSxRQUFRLENBQUMsT0FBVCxDQUFrQixVQUFsQixFQUE4QixNQUE5QjtRQUpLLENBSFAsRUFURjtPQURGOztFQUZPO0VBd0JULFFBQVEsQ0FBQyxFQUFULENBQVk7SUFBQSxjQUFBLEVBQWdCLFNBQUE7TUFDMUIsT0FBTyxDQUFDLEdBQVIsQ0FBYSwrQkFBYjtNQUNBLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLEdBQXJCLENBQXlCLFNBQXpCLEVBQW9DLEdBQXBDO2FBQ0EsT0FBTyxDQUFDLEdBQVIsQ0FBYSwrQkFBYjtJQUgwQjs7QUFLNUI7Ozs7Ozs7T0FMWTtHQUFaO0VBY0EsQ0FBQSxDQUFFLFFBQUYsQ0FBVyxDQUFDLEVBQVosQ0FBZSxPQUFmLEVBQXdCLHFCQUF4QixFQUErQyxTQUFBO0FBQzdDLFFBQUE7SUFBQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsTUFBUixDQUFBLENBQWdCLENBQUMsUUFBakIsQ0FBQSxDQUEyQixDQUFDLElBQTVCLENBQWlDLEdBQWpDLENBQXFDLENBQUMsV0FBdEMsQ0FBa0QsVUFBbEQ7SUFDQSxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsV0FBUixDQUFvQixVQUFwQjtJQUNBLElBQUcsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsVUFBakIsQ0FBSDtNQUNJLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLElBQXJCLENBQUE7TUFDQSxtQkFBQSxHQUFzQixHQUFHLENBQUMsTUFBSixDQUFXLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsYUFBYixDQUFYO01BQ3RCLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLElBQXZCLENBQUE7YUFDQSxRQUFBLEdBQVcsQ0FBQSxDQUFFLGdCQUFGLENBQW1CLENBQUMsT0FBcEIsQ0FBNEI7UUFDbkMsV0FBQSxFQUFrQixzQkFEaUI7UUFFbkMsWUFBQSxFQUFrQixtQkFGaUI7UUFHbkMsZUFBQSxFQUFrQixJQUhpQjtRQUluQyxrQkFBQSxFQUFvQixDQUplO09BQTVCLEVBSmY7S0FBQSxNQUFBO01BV0ksQ0FBQSxDQUFFLGlCQUFGLENBQW9CLENBQUMsSUFBckIsQ0FBQTthQUNBLFFBQUEsR0FBVyxDQUFBLENBQUUsZ0JBQUYsQ0FBbUIsQ0FBQyxPQUFwQixDQUE0QjtRQUNuQyxXQUFBLEVBQWtCLHNCQURpQjtRQUVuQyxZQUFBLEVBQWtCLHFCQUZpQjtRQUduQyxlQUFBLEVBQWtCLElBSGlCO1FBSW5DLGtCQUFBLEVBQW9CLENBSmU7T0FBNUIsRUFaZjs7RUFINkMsQ0FBL0M7RUFzQkEsYUFBQSxHQUFnQixDQUFBLENBQUUsb0JBQUY7RUFFaEIsSUFBRyxhQUFIO0lBQ0UsYUFBYSxDQUFDLEVBQWQsQ0FBaUIsT0FBakIsRUFBMEIsQ0FBQSxTQUFBLEtBQUE7YUFBQSxTQUFDLEtBQUQ7UUFDeEIsS0FBSyxDQUFDLGNBQU4sQ0FBQTtlQUNBLENBQUMsQ0FBQyxRQUFGLENBQVcsTUFBWCxFQUFtQixDQUFuQjtNQUZ3QjtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBMUIsRUFERjs7RUFLQSxJQUFHLFFBQVEsQ0FBQyxNQUFULEdBQWtCLENBQXJCO0lBQ0UsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFNBQUE7YUFDbkIsUUFBUSxDQUFDLE9BQVQsQ0FBQTtJQURtQixDQUFyQjtJQUdBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsUUFBYixFQUF1QixDQUFDLENBQUMsUUFBRixDQUFZLHFCQUFaLEVBQW9DLENBQXBDLENBQXZCO1dBQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxnQkFBYixFQUErQixNQUEvQixFQUxGOztBQTNGZTs7Ozs7Ozs7Ozs7Ozs7O0FDVGpCOzs7Ozs7OztJQUVxQixnQjs7Ozs7OzsyQkFFTDs7QUFFWixVQUFLLGtCQUFrQixNQUFuQixJQUE4QixPQUFPLGFBQVAsSUFBd0Isb0JBQW9CLGFBQTlFLEVBQTZGOztBQUUzRjs7QUFFQSw4QkFBRSxRQUFGLEVBQ0csRUFESCxDQUNNLFlBRE4sRUFDb0IseUJBRHBCLEVBQytDLFVBQVMsQ0FBVCxFQUFZO0FBQ3ZELGNBQUksRUFBRSxNQUFGLENBQVMsT0FBVCxJQUFvQixJQUF4QixFQUE4QjtBQUM1QixrQ0FBRSxJQUFGLEVBQVEsV0FBUixDQUFvQixRQUFwQjtBQUNEO0FBQ0YsU0FMSDtBQU9ELE9BWEQsTUFXTzs7QUFFTCw4QkFBRSxRQUFGLEVBQ0csRUFESCxDQUNNLE9BRE4sRUFDZSx5QkFEZixFQUMwQyxVQUFTLENBQVQsRUFBWTtBQUNsRCxjQUFJLEVBQUUsTUFBRixDQUFTLE9BQVQsSUFBb0IsSUFBeEIsRUFBOEI7QUFDNUIsa0NBQUUsSUFBRixFQUFRLFdBQVIsQ0FBb0IsUUFBcEI7QUFDRDtBQUNGLFNBTEg7QUFPRDs7QUFFRCw0QkFBRSxNQUFGLEVBQVUsTUFBVixDQUFpQixZQUFXO0FBQzFCLDhCQUFFLHlCQUFGLEVBQTZCLFdBQTdCLENBQXlDLFFBQXpDO0FBQ0QsT0FGRDtBQUdEOzs7Ozs7a0JBN0JrQixnQjs7Ozs7O0FDRnJCLElBQUEsZUFBQTtFQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFHSixNQUFNLENBQUMsT0FBUCxHQUF1QjtFQUVULHNCQUFDLFFBQUQsRUFBVyxTQUFYOzs7OztJQUNWLElBQUMsQ0FBQSxRQUFELEdBQVk7SUFDWixJQUFDLENBQUEsU0FBRCxHQUFhO0lBQ2IsSUFBQyxDQUFBLE9BQUQsR0FBVyxDQUFBLENBQUUsTUFBRjtJQUNYLElBQUMsQ0FBQSxPQUFPLENBQUMsRUFBVCxDQUFZLG9CQUFaLEVBQWtDLElBQUMsQ0FBQSxNQUFuQztJQUNBLElBQUMsQ0FBQSxNQUFELENBQUE7RUFMVTs7eUJBT1osUUFBQSxHQUFTLFNBQUE7SUFDUCxJQUFBLENBQU8sSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLElBQUMsQ0FBQSxTQUFwQixDQUFQO01BQ0UsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLElBQUMsQ0FBQSxTQUFwQjthQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFrQixVQUFsQixFQUZGOztFQURPOzt5QkFLVCxVQUFBLEdBQVcsU0FBQTtJQUNULElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQW1CLElBQUMsQ0FBQSxTQUFwQixDQUFIO01BQ0UsSUFBQyxDQUFBLFFBQVEsQ0FBQyxXQUFWLENBQXNCLElBQUMsQ0FBQSxTQUF2QjthQUNBLElBQUMsQ0FBQSxRQUFRLENBQUMsT0FBVixDQUFrQixZQUFsQixFQUZGOztFQURTOzt5QkFLWCxTQUFBLEdBQVUsU0FBQTtJQUNSLElBQUcsSUFBQyxDQUFBLFFBQVEsQ0FBQyxHQUFWLENBQWMsVUFBZCxDQUFBLEtBQTZCLE9BQWhDO2FBQ0UsUUFBQSxDQUFTLElBQUMsQ0FBQSxRQUFRLENBQUMsTUFBVixDQUFBLENBQVQsQ0FBQSxHQUErQixRQUFBLENBQVMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxRQUFWLENBQUEsQ0FBb0IsQ0FBQyxHQUE5QixFQURqQztLQUFBLE1BQUE7YUFHRSxRQUFBLENBQVMsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQUEsQ0FBa0IsQ0FBQyxHQUE1QixFQUhGOztFQURROzt5QkFPVixNQUFBLEdBQU8sU0FBQTtJQUNMLElBQUcsSUFBQyxDQUFBLE9BQU8sQ0FBQyxTQUFULENBQUEsQ0FBQSxHQUF1QixJQUFDLENBQUEsU0FBRCxDQUFBLENBQTFCO2FBQ0UsSUFBQyxDQUFBLFVBQUQsQ0FBQSxFQURGO0tBQUEsTUFBQTthQUdFLElBQUMsQ0FBQSxRQUFELENBQUEsRUFIRjs7RUFESzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCVDs7Ozs7Ozs7SUFFcUIsUztBQUVwQixvQkFBWSxHQUFaLEVBQWlCO0FBQUE7O0FBQ2hCLE9BQUssR0FBTCxHQUFXLEdBQVg7QUFDQSxPQUFLLEtBQUwsR0FBYSxLQUFiO0FBQ0EsT0FBSyxPQUFMLEdBQWUsc0JBQUUsS0FBSyxHQUFMLENBQVMsSUFBVCxDQUFjLGtCQUFkLENBQUYsQ0FBZjtBQUNBLE9BQUssRUFBTDtBQUNBOzs7O3VCQUVJO0FBQ0osUUFBSyxHQUFMLENBQVMsRUFBVCxDQUFZLE9BQVosRUFBcUIsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFyQjtBQUNBOzs7eUJBRU0sSyxFQUFPO0FBQ2IsU0FBTSxjQUFOO0FBQ0EsUUFBSyxLQUFMLEdBQWEsQ0FBQyxLQUFLLEtBQW5CO0FBQ0EsT0FBSSxLQUFLLEtBQVQsRUFBZ0I7QUFDZixTQUFLLElBQUw7QUFDQSxJQUZELE1BRU87QUFDTixTQUFLLEtBQUw7QUFDQTtBQUNEOzs7eUJBRU07QUFDTixPQUFJLE1BQUo7QUFDQSxRQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLFNBQWxCO0FBQ0EsUUFBSyxPQUFMLENBQWEsUUFBYixDQUFzQixTQUF0QjtBQUNBLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsRUFBcEI7QUFDQSxZQUFTLEtBQUssT0FBTCxDQUFhLE1BQWIsRUFBVDtBQUNBLFFBQUssT0FBTCxDQUFhLE1BQWIsQ0FBb0IsQ0FBcEI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxNQUFiLENBQW9CLE1BQXBCO0FBQ0UsT0FBSSxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLGtCQUFsQixDQUFKLEVBQTJDO0FBQ3pDLDBCQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLEdBQXpCLENBQTZCLFVBQTdCLEVBQXlDLFFBQXpDO0FBQ0Q7QUFDSDs7OzBCQUVPO0FBQ1AsUUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXBCO0FBQ0EsUUFBSyxPQUFMLENBQWEsTUFBYixDQUFvQixDQUFwQjtBQUNBLFFBQUssR0FBTCxDQUFTLFdBQVQsQ0FBcUIsU0FBckI7QUFDQSxRQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLFNBQXpCO0FBQ0UsT0FBSSxLQUFLLEdBQUwsQ0FBUyxRQUFULENBQWtCLGtCQUFsQixDQUFKLEVBQTJDO0FBQ3pDLDBCQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLE1BQWpCLEVBQXlCLEdBQXpCLENBQTZCLFVBQTdCLEVBQXlDLFNBQXpDO0FBQ0Q7QUFDSDs7O3lCQUVhO0FBQ2IseUJBQUUseUJBQUYsRUFBNkIsSUFBN0IsQ0FBa0MsWUFBVztBQUM1QyxXQUFPLElBQUksU0FBSixDQUFjLHNCQUFFLElBQUYsQ0FBZCxDQUFQO0FBQ0EsSUFGRDtBQUdBOzs7Ozs7a0JBbERtQixTOzs7Ozs7QUNGckIsSUFBQTs7QUFBQSxDQUFBLEdBQUksT0FBQSxDQUFRLFFBQVI7O0FBQ0osQ0FBQSxHQUFJLE9BQUEsQ0FBUSxZQUFSOztBQUNKLE1BQU0sQ0FBQyxPQUFQLEdBQXVCO0VBRVIsdUJBQUUsUUFBRixFQUFZLGdCQUFaO0FBRVgsUUFBQTtJQUFBLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FBQSxDQUFFLFFBQUY7SUFDWixJQUFDLENBQUEsUUFBRCxHQUFZLENBQUEsQ0FBRSxnQkFBRjtJQUNaLEtBQUEsR0FBUSxJQUFDLENBQUEsTUFBRCxDQUFBO0lBRVIsSUFBQSxHQUFPO0lBQ1AsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsU0FBQTtBQUNiLFVBQUE7TUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLElBQUY7TUFDUixRQUFBLEdBQVcsQ0FBQyxDQUFDLFFBQUYsQ0FBVyxDQUFBLENBQUUsZ0NBQUYsQ0FBbUMsQ0FBQyxJQUFwQyxDQUFBLENBQVg7TUFFWCxJQUFHLFFBQUg7UUFDRSxJQUFBLEdBQU8sQ0FBQyxDQUFDLEdBQUYsQ0FBTSxLQUFOLEVBQWEsU0FBQyxJQUFEO2lCQUFTLFFBQUEsQ0FBUyxJQUFUO1FBQVQsQ0FBYjtlQUNQLEtBQUssQ0FBQyxNQUFOLENBQWEsSUFBYixFQUZGOztJQUphLENBQWY7RUFQVzs7MEJBZWIsTUFBQSxHQUFRLFNBQUE7QUFDTixRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsSUFBQyxDQUFBLFFBQVEsQ0FBQyxJQUFWLENBQWUsZ0JBQWYsQ0FBZ0MsQ0FBQyxJQUFqQyxDQUFzQyxTQUFBO0FBQ3BDLFVBQUE7TUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLElBQUY7TUFDUixFQUFBLEdBQUssS0FBSyxDQUFDLElBQU4sQ0FBVyxJQUFYO01BQ0wsSUFBQSxDQUF1QyxFQUF2QztRQUFBLEVBQUEsR0FBSyxLQUFLLENBQUMsSUFBTixDQUFXLEdBQVgsQ0FBZSxDQUFDLElBQWhCLENBQXFCLElBQXJCLEVBQUw7O01BQ0EsSUFBRyxFQUFIO2VBQ0UsS0FBSyxDQUFDLElBQU4sQ0FBVztVQUFFLEVBQUEsRUFBSSxFQUFOO1VBQVUsSUFBQSxFQUFNLEtBQUssQ0FBQyxJQUFOLENBQUEsQ0FBaEI7U0FBWCxFQURGOztJQUpvQyxDQUF0QztXQU9BO0VBVE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuQlY7Ozs7Ozs7O0lBRXFCLGlCOzs7Ozs7OzJCQUVMOztBQUVaLFVBQUksZUFBZSxzQkFBRSxNQUFGLEVBQVUsTUFBVixFQUFuQjtBQUFBLFVBQ0ksU0FBUyxzQkFBRSxxQkFBRixDQURiO0FBQUEsVUFFSSx3QkFBd0IsS0FGNUI7O0FBSUEsVUFBSSxPQUFPLE9BQVAsS0FBb0IsV0FBeEIsRUFBcUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsWUFBSSxlQUFlLGtCQUFmLElBQXFDLFNBQXpDLEVBQW9EO0FBQ2xEO0FBQ0Esa0NBQXdCLElBQXhCO0FBQ0QsU0FIRCxNQUdPO0FBQ0w7QUFDQSxjQUFJLGVBQWUsa0JBQWYsSUFBcUMsS0FBekMsRUFBZ0Q7QUFDOUMsb0NBQXdCLEtBQXhCO0FBQ0Q7QUFDRjtBQUNGOztBQUVELDRCQUFFLE1BQUYsRUFBVSxNQUFWLENBQWlCLFlBQVc7QUFDMUIsWUFBSSxZQUFZLHNCQUFFLFFBQUYsRUFBWSxTQUFaLEVBQWhCO0FBQ0EsWUFBSSxZQUFZLFlBQVosSUFBNEIscUJBQWhDLEVBQXVEO0FBQ3JELGlCQUFPLFFBQVAsQ0FBZ0IsY0FBaEI7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxXQUFQLENBQW1CLGNBQW5CO0FBQ0Q7QUFDRixPQVBEOztBQVNBLDRCQUFFLFFBQUYsRUFDRyxFQURILENBQ00sT0FETixFQUNlLGtDQURmLEVBQ21ELFlBQVc7QUFDMUQsZUFBTyxJQUFQO0FBQ0EsdUJBQWUsa0JBQWYsR0FBb0MsS0FBcEM7QUFDRCxPQUpILEVBS0csRUFMSCxDQUtNLE9BTE4sRUFLZSxzQkFMZixFQUt1QyxZQUFXO0FBQzlDO0FBQ0QsT0FQSCxFQVFHLEVBUkgsQ0FRTSxPQVJOLEVBUWUsdUJBUmYsRUFRd0MsVUFBUyxDQUFULEVBQVk7QUFDaEQsVUFBRSxjQUFGO0FBQ0EscUJBQWEsWUFBVztBQUNwQixxQkFBVyxZQUFXO0FBQ2xCO0FBQ0gsV0FGRCxFQUVHLEdBRkg7QUFHSCxTQUpEO0FBS0QsT0FmSCxFQWdCRyxFQWhCSCxDQWdCTSxPQWhCTixFQWdCZSxvQ0FoQmYsRUFnQnFELFVBQVMsQ0FBVCxFQUFZO0FBQzdELDhCQUFFLHVCQUFGLEVBQTJCLFdBQTNCLENBQXVDLGNBQXZDLEVBQXVELFFBQXZELENBQWdFLGNBQWhFO0FBQ0QsT0FsQkg7O0FBb0JBLGVBQVMsWUFBVCxDQUFzQixRQUF0QixFQUFnQztBQUM1Qiw4QkFBRSx1QkFBRixFQUEyQixXQUEzQixDQUF1QyxjQUF2QztBQUNBLFlBQUcsT0FBTyxRQUFQLElBQW1CLFVBQXRCLEVBQWlDO0FBQzdCO0FBQ0g7QUFDSjs7QUFFRCxlQUFTLGVBQVQsR0FBMkI7QUFDdkIsOEJBQUUsdUJBQUYsRUFBMkIsV0FBM0IsQ0FBdUMsY0FBdkM7QUFDSDtBQUNGOzs7Ozs7a0JBOURrQixpQjs7Ozs7Ozs7Ozs7Ozs7QUNGckI7Ozs7Ozs7O0lBRXFCLFk7Ozs7Ozs7K0JBRUw7QUFDWixnQkFBSSxVQUFKLEVBQWdCLGFBQWhCO0FBQ0EsZ0JBQUksYUFBYSxJQUFJLE1BQUosQ0FBVyxjQUFYLEVBQTJCO0FBQ3hDLDRCQUFZLHFCQUQ0QjtBQUV4Qyw0QkFBWSxxQkFGNEI7QUFHeEMsOEJBQWM7QUFIMEIsYUFBM0IsQ0FBakI7QUFLQSxnQkFBSSxnQkFBZ0IsSUFBSSxNQUFKLENBQVcsaUJBQVgsRUFBOEI7QUFDOUMsOEJBQWMsQ0FEZ0M7QUFFOUMsZ0NBQWdCLElBRjhCO0FBRzlDLCtCQUFlLE1BSCtCO0FBSTlDLDRCQUFZLEdBSmtDO0FBSzlDLHFDQUFxQjtBQUx5QixhQUE5QixDQUFwQjtBQU9BLHVCQUFXLE1BQVgsQ0FBa0IsT0FBbEIsR0FBNEIsYUFBNUI7QUFDQSwwQkFBYyxNQUFkLENBQXFCLE9BQXJCLEdBQStCLFVBQS9CO0FBQ0Q7Ozs7OztrQkFsQmtCLFk7Ozs7Ozs7Ozs7Ozs7O0FDRnJCOzs7Ozs7OztJQUVxQixPOzs7Ozs7OzJCQUVMO0FBQ1osNEJBQUUsaUJBQUYsRUFBcUIsTUFBckI7QUFDQSw0QkFBRSxRQUFGLEVBQ0csRUFESCxDQUNNLE9BRE4sRUFDZSw2Q0FEZixFQUM4RCxZQUFXO0FBQ3JFLDhCQUFFLGlCQUFGLEVBQXFCLE1BQXJCO0FBQ0QsT0FISDtBQUlEOzs7Ozs7a0JBUmtCLE87Ozs7OztBQ0ZyQixJQUFBOztBQUFBLENBQUEsR0FBSSxPQUFBLENBQVEsUUFBUjs7QUFDSixTQUFBLEdBQVksT0FBQSxDQUFRLGFBQVIsQ0FBc0IsRUFBQyxPQUFEOztBQUNsQyxPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVIsQ0FBb0IsRUFBQyxPQUFEOztBQUM5QixZQUFBLEdBQWUsT0FBQSxDQUFRLGdCQUFSLENBQXlCLEVBQUMsT0FBRDs7QUFDeEMsZ0JBQUEsR0FBbUIsT0FBQSxDQUFRLG9CQUFSLENBQTZCLEVBQUMsT0FBRDs7QUFDaEQsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLHFCQUFSLENBQThCLEVBQUMsT0FBRDs7QUFDbEQsV0FBQSxHQUFjLE9BQUEsQ0FBUSxlQUFSOztBQUNkLFlBQUEsR0FBZSxPQUFBLENBQVEsZ0JBQVI7O0FBQ2YsYUFBQSxHQUFnQixPQUFBLENBQVEsaUJBQVI7O0FBQ2hCLGNBQUEsR0FBaUIsT0FBQSxDQUFRLGtCQUFSOztBQUNqQixPQUFBLEdBQVUsT0FBQSxDQUFRLFdBQVI7O0FBQ1YsTUFBQSxHQUFTLE9BQUEsQ0FBUSxrREFBUjs7QUFHVCxDQUFBLENBQUUsU0FBQTtTQUtBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxFQUFWLENBQWEsTUFBYixFQUFxQixTQUFBO1dBQ25CLENBQUEsQ0FBRSxpQ0FBRixDQUNBLENBQUMsS0FERCxDQUNPLElBRFAsQ0FFQSxDQUFDLEtBRkQsQ0FFUSxTQUFBO2FBQU0sQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsNkJBQWpCLENBQStDLENBQUMsT0FBaEQsQ0FBQTtJQUFOLENBRlI7RUFEbUIsQ0FBckI7QUFMQSxDQUFGOztBQWlDQSxDQUFBLENBQUUsU0FBQTtTQUVBLENBQUEsQ0FBRyxpQkFBSCxDQUFzQixDQUFDLGFBQXZCLENBQXFDO0lBQ25DLElBQUEsRUFBTSxRQUQ2QjtJQUVuQyxTQUFBLEVBQVcsVUFGd0I7SUFHbkMsWUFBQSxFQUFjLEdBSHFCO0lBSW5DLFNBQUEsRUFBVyxLQUp3QjtJQU1uQyxlQUFBLEVBQWlCLEtBTmtCO0dBQXJDO0FBRkEsQ0FBRjs7QUFhQSxDQUFBLENBQUUsU0FBQTtTQUNBLENBQUEsQ0FBRSxRQUFGLENBQVcsQ0FBQyxXQUFaLENBQXdCLFNBQUMsS0FBRCxFQUFRLEdBQVIsRUFBYSxRQUFiO0FBQ3RCLFFBQUE7SUFBQSxHQUFBLEdBQU0sUUFBUSxDQUFDO0lBQ2YsSUFBRyx3Q0FBSDthQUNFLEVBQUEsQ0FBRyxNQUFILEVBQVcsVUFBWCxFQUF1QixHQUFHLENBQUMsT0FBSixDQUFZLFFBQVEsQ0FBQyxNQUFyQixFQUE2QixFQUE3QixDQUF2QixFQURGOztFQUZzQixDQUF4QjtBQURBLENBQUY7O0FBTUEsQ0FBQSxDQUFFLFNBQUE7U0FDQSxTQUFTLENBQUMsSUFBVixDQUFBO0FBREEsQ0FBRjs7QUFHQSxDQUFBLENBQUUsU0FBQTtTQUNBLE9BQU8sQ0FBQyxJQUFSLENBQUE7QUFEQSxDQUFGOztBQUdBLENBQUEsQ0FBRSxTQUFBO1NBQ0EsWUFBWSxDQUFDLElBQWIsQ0FBQTtBQURBLENBQUY7O0FBR0EsQ0FBQSxDQUFFLFNBQUE7U0FDQSxnQkFBZ0IsQ0FBQyxJQUFqQixDQUFBO0FBREEsQ0FBRjs7QUFHQSxDQUFBLENBQUUsU0FBQTtTQUNBLGlCQUFpQixDQUFDLElBQWxCLENBQUE7QUFEQSxDQUFGOztBQUdBLENBQUEsQ0FBRSxTQUFBO1NBQ0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxNQUFiLEVBQXFCLFNBQUE7V0FDbkIsQ0FBQSxDQUFFLG9CQUFGLENBQXVCLENBQUMsUUFBeEIsQ0FBaUMsZUFBakM7RUFEbUIsQ0FBckI7QUFEQSxDQUFGOztBQUlBLENBQUEsQ0FBRSxTQUFBO0VBQ0EsSUFBQSxDQUFBLENBQU8sQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLFNBQTFCLENBQUQsSUFBMEMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLE1BQTFCLENBQTNDLElBQWlGLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxLQUFwQixDQUEwQixVQUExQixDQUF6RixDQUFBO1dBQ0UsQ0FBQSxDQUFFLE9BQUYsQ0FBVSxDQUFDLElBQVgsQ0FBZ0IsVUFBaEIsRUFBMkIsVUFBM0IsRUFERjs7QUFEQSxDQUFGOztBQU1BLENBQUEsQ0FBRSxTQUFBO0VBTUEsQ0FBQSxDQUFFLGdCQUFGLENBQW1CLENBQUMsS0FBcEIsQ0FBMEIsU0FBQTtBQUN4QixRQUFBO0lBQUEsS0FBQSxHQUFRO0lBQ1IsQ0FBQSxDQUFFLFlBQUYsQ0FBZSxDQUFDLE9BQWhCLENBQXdCO01BQUMsU0FBQSxFQUFVLENBQVg7S0FBeEIsRUFBdUMsS0FBdkMsRUFBOEMsYUFBOUM7QUFDQSxXQUFPO0VBSGlCLENBQTFCO1NBVUEsQ0FBQSxDQUFFLFNBQUE7QUFFQSxRQUFBO0lBQUEsT0FBQSxHQUFVLFNBQUMsS0FBRDtBQUVSLFVBQUE7TUFBQSxJQUFHLEtBQUg7UUFDRSxLQUFLLENBQUMsY0FBTixDQUFBLEVBREY7O01BRUEsSUFBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQWQsR0FBdUIsQ0FBMUI7UUFDRSxTQUFBLEdBQVksQ0FBQSxDQUFFLFFBQVEsQ0FBQyxJQUFYLENBQWdCLENBQUMsTUFBakIsQ0FBQSxDQUF5QixDQUFDO1FBQ3RDLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxTQUFWLENBQW9CLFNBQUEsR0FBWSxHQUFoQyxFQUZGOzthQUdBO0lBUFE7SUFTVixPQUFBLENBQUE7SUFFQSxDQUFBLENBQUUsTUFBRixDQUFTLENBQUMsRUFBVixDQUFhLFlBQWIsRUFBMkIsT0FBM0I7V0FHQSxDQUFBLENBQUUsbUJBQUYsQ0FBc0IsQ0FBQyxFQUF2QixDQUEwQixPQUExQixFQUFtQyxHQUFuQyxFQUF3QyxTQUFDLEtBQUQ7QUFFdEMsVUFBQTtNQUFBLElBQUEsR0FBTyxJQUFDLENBQUM7TUFDVCxPQUFBLEdBQVUsQ0FBQSxDQUFFLElBQUY7TUFDVixJQUFHLE9BQU8sQ0FBQyxNQUFYO1FBQ0UsS0FBSyxDQUFDLGNBQU4sQ0FBQTtRQUNBLFNBQUEsR0FBWSxPQUFPLENBQUMsTUFBUixDQUFBLENBQWdCLENBQUMsR0FBakIsR0FBdUI7ZUFDbkMsQ0FBQSxDQUFFLFlBQUYsQ0FBZSxDQUFDLE9BQWhCLENBQXdCO1VBQUMsU0FBQSxFQUFVLFNBQVg7U0FBeEIsRUFBK0MsR0FBL0MsRUFBb0QsYUFBcEQsQ0FBa0UsQ0FBQyxPQUFuRSxDQUFBLENBQTRFLENBQUMsSUFBN0UsQ0FBa0YsU0FBQSxHQUFBLENBQWxGLEVBSEY7O0lBSnNDLENBQXhDO0VBaEJBLENBQUY7QUFoQkEsQ0FBRjs7QUE4Q0EsQ0FBQSxDQUFFLFNBQUE7QUFHQSxNQUFBO0VBQUEsZUFBQSxHQUFrQixDQUFBLENBQUUsd0JBQUY7RUFFbEIsSUFBRyxlQUFlLENBQUMsTUFBbkI7SUFDRSxJQUFJLE9BQUosQ0FBWTtNQUNWLFNBQUEsRUFBVyxnQkFERDtNQUVWLEtBQUEsRUFBTyxzQkFGRztNQUdWLElBQUEsRUFBTSxxQkFISTtLQUFaO0lBT0EsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEVBQVYsQ0FBYSxVQUFiLEVBQXdCLFNBQUMsS0FBRDthQUN0QixXQUFBLENBQWEsUUFBUSxDQUFDLElBQXRCO0lBRHNCLENBQXhCOztBQUlBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FaRjs7U0FpQ0EsV0FBQSxHQUFjLFNBQUUsSUFBRixFQUFTLFVBQVQ7QUFDWixRQUFBO0lBQUEsTUFBQSxHQUFTLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxTQUFWLENBQUE7SUFFVCxNQUFBLEdBQVMsUUFBUSxDQUFDLGFBQVQsQ0FBdUIsR0FBdkI7SUFDVCxNQUFNLENBQUMsSUFBUCxHQUFjO0lBRWQsT0FBTyxDQUFDLEdBQVIsQ0FBWSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQWhCLENBQXVCLENBQXZCLENBQXlCLENBQUMsS0FBMUIsQ0FBZ0MsR0FBaEMsQ0FBb0MsQ0FBQyxNQUFqRDtJQUVBLElBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFoQixDQUF1QixDQUF2QixDQUF5QixDQUFDLEtBQTFCLENBQWdDLEdBQWhDLENBQW9DLENBQUMsTUFBckMsR0FBOEMsQ0FBakQ7YUFFRSxDQUFDLENBQUMsSUFBRixDQUNFO1FBQUEsR0FBQSxFQUFLLElBQUw7T0FERixDQUdBLENBQUMsSUFIRCxDQUdPLENBQUEsU0FBQSxLQUFBO2VBQUEsU0FBRSxJQUFGO0FBQ0wsY0FBQTtVQUFBLGVBQWUsQ0FBQyxHQUFoQixDQUFvQixlQUFwQixFQUFxQyxTQUFBO1lBQ25DLElBQUcsVUFBSDtjQUNFLE9BQU8sQ0FBQyxTQUFSLENBQWtCO2dCQUFDLElBQUEsRUFBTSxJQUFQO2VBQWxCLEVBQWdDLEVBQWhDLEVBQW9DLElBQXBDLEVBREY7O1lBRUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEdBQVYsQ0FBYztjQUFBLFFBQUEsRUFBVSxRQUFWO2FBQWQ7bUJBRUEsQ0FBQSxDQUFFLE1BQUYsQ0FBUyxDQUFDLEdBQVYsQ0FBYyxRQUFkLEVBQXdCLFNBQUE7cUJBQ3RCLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxTQUFWLENBQW9CLE1BQXBCO1lBRHNCLENBQXhCO1VBTG1DLENBQXJDO1VBVUEsSUFBQSxHQUFRLE9BQUEsR0FBVSxJQUFWLEdBQWlCO1VBQ3pCLFFBQUEsR0FBVyxDQUFBLENBQUUsSUFBRixDQUFPLENBQUMsSUFBUixDQUFhLHNCQUFiO1VBQ1gsZUFBZSxDQUFDLElBQWhCLENBQXFCLFFBQXJCO1VBQ0EsZUFBZSxDQUFDLFFBQWhCLENBQXlCLFdBQXpCO2lCQUNBLGVBQWUsQ0FBQyxHQUFoQixDQUFvQjtZQUFBLFVBQUEsRUFBWSxDQUFBLENBQUUsV0FBRixDQUFjLENBQUMsTUFBZixDQUFBLENBQVo7V0FBcEI7UUFmSztNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FIUCxFQUZGO0tBQUEsTUFBQTtNQTBCRSxJQUFHLGVBQWUsQ0FBQyxNQUFuQjtRQUNFLGVBQWUsQ0FBQyxXQUFoQixDQUE0QixXQUE1QjtRQUNBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxHQUFWLENBQWM7VUFBQSxRQUFBLEVBQVUsU0FBVjtTQUFkO1FBQ0EsSUFBRyxVQUFIO2lCQUNFLE9BQU8sQ0FBQyxTQUFSLENBQWtCO1lBQUMsSUFBQSxFQUFNLElBQVA7V0FBbEIsRUFBZ0MsRUFBaEMsRUFBb0MsSUFBcEMsRUFERjtTQUhGO09BQUEsTUFBQTtRQU1FLElBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFsQixDQUEwQixhQUExQixDQUFBLEdBQTJDLENBQUMsQ0FBL0M7aUJBQ0UsUUFBUSxDQUFDLE1BQVQsQ0FBQSxFQURGO1NBTkY7T0ExQkY7O0VBUlk7QUF0Q2QsQ0FBRjs7QUF1RkEsQ0FBQSxDQUFFLFNBQUE7QUFDQSxNQUFBO0VBQUEsTUFBQSxHQUFTLElBQUksTUFBSixDQUFXLGNBQVgsRUFBMkI7SUFDbEMsWUFBQSxFQUFjLENBRG9CO0lBR2xDLElBQUEsRUFBTSxLQUg0QjtJQUlsQyxLQUFBLEVBQU8sR0FKMkI7SUFLbEMsUUFBQSxFQUFVLElBTHdCO0lBTWxDLDRCQUFBLEVBQThCLEtBTkk7SUFPbEMsVUFBQSxFQUFZLDBCQVBzQjtJQVFsQyxtQkFBQSxFQUFxQixJQVJhO0dBQTNCO1NBWVQsSUFBSSxNQUFKLENBQVcsY0FBWCxFQUEyQjtJQUN6QixZQUFBLEVBQWMsQ0FEVztJQUV6QixLQUFBLEVBQU8sSUFGa0I7SUFHekIsUUFBQSxFQUFVLElBSGU7SUFJekIsTUFBQSxFQUFRLE1BSmlCO0lBS3pCLDRCQUFBLEVBQThCLEtBTEw7R0FBM0I7QUFiQSxDQUFGOzs7QUFxQkE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMEJBLENBQUEsQ0FBRSxNQUFGLENBQVMsQ0FBQyxJQUFWLENBQWUsU0FBQTtTQUViLENBQUEsQ0FBRSxtQkFBRixDQUFzQixDQUFDLElBQXZCLENBQTRCLFNBQUE7SUFDMUIsQ0FBQSxDQUFFLElBQUYsQ0FBSSxDQUFDLElBQUwsQ0FBVSxlQUFWLENBQTBCLENBQUMsUUFBM0IsQ0FBb0MsY0FBcEM7SUFDQSxDQUFBLENBQUUsSUFBRixDQUFJLENBQUMsSUFBTCxDQUFVLFVBQVYsQ0FBcUIsQ0FBQyxRQUF0QixDQUErQixnQkFBL0I7V0FDQSxJQUFJLE1BQUosQ0FBWSxJQUFaLEVBQWU7TUFDYixZQUFBLEVBQWMsQ0FERDtNQUViLEtBQUEsRUFBTyxHQUZNO01BR2IsUUFBQSxFQUFVLElBSEc7TUFJYiw0QkFBQSxFQUE4QixLQUpqQjtLQUFmO0VBSDBCLENBQTVCO0FBRmEsQ0FBZjs7QUFxQkEsQ0FBQSxDQUFFLFNBQUE7QUFDQSxNQUFBO0VBQUEsYUFBQSxHQUFpQixJQUFJLGFBQUosQ0FBa0IsdUJBQWxCLEVBQTJDLGlCQUEzQztFQUNqQixhQUFhLENBQUMsUUFBUSxDQUFDLEtBQXZCLENBQTZCLElBQTdCLENBQWtDLENBQUMsUUFBbkMsQ0FBNEMsQ0FBQSxDQUFFLDZCQUFGLENBQTVDO0VBRUEsTUFBQSxHQUFTLElBQUksV0FBSixDQUFnQixxQkFBaEIsRUFBdUMsbUJBQXZDO1NBRVQsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsSUFBckMsQ0FBMEMsU0FBQTtXQUN4QyxhQUFBLEdBQWdCLElBQUksY0FBSixDQUFtQixDQUFBLENBQUUsSUFBRixDQUFuQixFQUF5QixXQUF6QixFQUFzQyxNQUF0QztFQUR3QixDQUExQyxDQUdBLENBQUMsRUFIRCxDQUdJLFVBSEosRUFHZ0IsU0FBQTtXQUNkLENBQUEsQ0FBRSwyQkFBRixDQUE4QixDQUFDLElBQS9CLENBQUE7RUFEYyxDQUhoQixDQU1BLENBQUMsRUFORCxDQU1JLFlBTkosRUFNa0IsU0FBQTtXQUNoQixDQUFBLENBQUUsMkJBQUYsQ0FBOEIsQ0FBQyxJQUEvQixDQUFBO0VBRGdCLENBTmxCO0FBTkEsQ0FBRjs7QUFxQkEsQ0FBQSxDQUFFLFNBQUE7RUFDQSxDQUFBLENBQUUsd0JBQUYsQ0FBMkIsQ0FBQyxJQUE1QixDQUFpQyxTQUFBO0FBQy9CLFFBQUE7SUFBQSxLQUFBLEdBQVEsQ0FBQSxDQUFFLElBQUY7V0FDUixJQUFJLFlBQUosQ0FBaUIsS0FBakIsRUFBd0IsS0FBSyxDQUFDLElBQU4sQ0FBVyxpQkFBWCxDQUF4QjtFQUYrQixDQUFqQztFQUtBLENBQUEsQ0FBRSxXQUFGLENBQ0EsQ0FBQyxFQURELENBQ0ksVUFESixFQUNnQixTQUFBO1dBQ2QsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsV0FBckMsQ0FBaUQsV0FBakQ7RUFEYyxDQURoQixDQUlBLENBQUMsRUFKRCxDQUlJLFlBSkosRUFJa0IsU0FBQTtXQUNoQixDQUFBLENBQUUsaUNBQUYsQ0FBb0MsQ0FBQyxRQUFyQyxDQUE4QyxXQUE5QztFQURnQixDQUpsQjtFQVFBLENBQUEsQ0FBRSwyQkFBRixDQUE4QixDQUFDLEVBQS9CLENBQWtDLE9BQWxDLEVBQTJDLFNBQUE7V0FDekMsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsV0FBckMsQ0FBaUQsV0FBakQ7RUFEeUMsQ0FBM0M7RUFJQSxJQUFHLENBQUEsQ0FBRSxpQkFBRixDQUFvQixDQUFDLE1BQXJCLEdBQThCLENBQWpDO1dBQ0UsQ0FBQSxDQUFFLGlDQUFGLENBQW9DLENBQUMsV0FBckMsQ0FBaUQsV0FBakQsRUFERjtHQUFBLE1BQUE7V0FJRSxDQUFBLENBQUUsaUNBQUYsQ0FBb0MsQ0FBQyxRQUFyQyxDQUE4QyxXQUE5QyxFQUpGOztBQWxCQSxDQUFGOztBQTJCQSxDQUFBLENBQUUsU0FBQTtBQUVBLE1BQUE7RUFBQSxPQUFBLEdBQVUsQ0FBQSxDQUFFLE1BQUY7RUFDVixPQUFBLEdBQVUsQ0FBQSxDQUFFLFNBQUY7RUFDVixPQUFPLENBQUMsV0FBUixDQUFBO1NBR0EsQ0FBQSxDQUFFLHVCQUFGLENBQTBCLENBQUMsSUFBM0IsQ0FBZ0MsU0FBQTtBQUM5QixRQUFBO0lBQUEsS0FBQSxHQUFRLENBQUEsQ0FBRSxJQUFGO1dBQ1IsT0FBTyxDQUFDLEVBQVIsQ0FBVyxhQUFYLEVBQTBCLENBQUEsU0FBQSxLQUFBO2FBQUEsU0FBQTtBQUN4QixZQUFBO1FBQUEsSUFBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsU0FBMUIsQ0FBRCxJQUEwQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBcEIsQ0FBMEIsTUFBMUIsQ0FBM0MsSUFBaUYsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEtBQXBCLENBQTBCLFVBQTFCLENBQXJGO1VBQ0UsbUJBQUEsR0FBc0IsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFjLENBQUMsR0FBZixHQUFxQixPQUFPLENBQUMsTUFBUixDQUFBO1VBQzNDLElBQUcsbUJBQUEsR0FBc0IsT0FBTyxDQUFDLFNBQVIsQ0FBQSxDQUF0QixJQUE4QyxPQUFPLENBQUMsU0FBUixDQUFBLENBQUEsR0FBc0IsS0FBSyxDQUFDLE1BQU4sQ0FBQSxDQUFjLENBQUMsR0FBZixHQUFxQixLQUFLLENBQUMsTUFBTixDQUFBLENBQTVGO21CQUNFLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUFZLENBQUMsSUFBYixDQUFBLEVBREY7V0FBQSxNQUFBO21CQUdFLEtBQUssQ0FBQyxHQUFOLENBQVUsQ0FBVixDQUFZLENBQUMsS0FBYixDQUFBLEVBSEY7V0FGRjs7TUFEd0I7SUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBQTFCO0VBRjhCLENBQWhDO0FBUEEsQ0FBRjs7Ozs7Ozs7Ozs7QUNwVkE7Ozs7OztBQU1BLENBQUUsVUFBVSxNQUFWLEVBQW1COztBQUVyQjs7QUFFQTs7QUFFQSxNQUFJLFFBQVEsTUFBTSxTQUFOLENBQWdCLEtBQTVCOztBQUVBLFdBQVMsSUFBVCxHQUFnQixDQUFFOztBQUVsQjs7QUFFQSxXQUFTLGFBQVQsQ0FBd0IsQ0FBeEIsRUFBNEI7O0FBRTVCO0FBQ0EsUUFBSyxDQUFDLENBQU4sRUFBVTtBQUNSO0FBQ0Q7O0FBRUQ7O0FBRUE7Ozs7QUFJQSxhQUFTLGVBQVQsQ0FBMEIsV0FBMUIsRUFBd0M7QUFDdEM7QUFDQSxVQUFLLFlBQVksU0FBWixDQUFzQixNQUEzQixFQUFvQztBQUNsQztBQUNEOztBQUVEO0FBQ0Esa0JBQVksU0FBWixDQUFzQixNQUF0QixHQUErQixVQUFVLElBQVYsRUFBaUI7QUFDOUM7QUFDQSxZQUFLLENBQUMsRUFBRSxhQUFGLENBQWlCLElBQWpCLENBQU4sRUFBK0I7QUFDN0I7QUFDRDtBQUNELGFBQUssT0FBTCxHQUFlLEVBQUUsTUFBRixDQUFVLElBQVYsRUFBZ0IsS0FBSyxPQUFyQixFQUE4QixJQUE5QixDQUFmO0FBQ0QsT0FORDtBQU9EOztBQUVEOztBQUVBO0FBQ0E7QUFDQSxRQUFJLFdBQVcsT0FBTyxPQUFQLEtBQW1CLFdBQW5CLEdBQWlDLElBQWpDLEdBQ2IsVUFBVSxPQUFWLEVBQW9CO0FBQ2xCLGNBQVEsS0FBUixDQUFlLE9BQWY7QUFDRCxLQUhIOztBQUtBOzs7OztBQUtBLGFBQVMsTUFBVCxDQUFpQixTQUFqQixFQUE0QixXQUE1QixFQUEwQztBQUN4QztBQUNBLFFBQUUsRUFBRixDQUFNLFNBQU4sSUFBb0IsVUFBVSxPQUFWLEVBQW9CO0FBQ3RDLFlBQUssT0FBTyxPQUFQLEtBQW1CLFFBQXhCLEVBQW1DO0FBQ2pDO0FBQ0E7QUFDQSxjQUFJLE9BQU8sTUFBTSxJQUFOLENBQVksU0FBWixFQUF1QixDQUF2QixDQUFYOztBQUVBLGVBQU0sSUFBSSxJQUFFLENBQU4sRUFBUyxNQUFNLEtBQUssTUFBMUIsRUFBa0MsSUFBSSxHQUF0QyxFQUEyQyxHQUEzQyxFQUFpRDtBQUMvQyxnQkFBSSxPQUFPLEtBQUssQ0FBTCxDQUFYO0FBQ0EsZ0JBQUksV0FBVyxFQUFFLElBQUYsQ0FBUSxJQUFSLEVBQWMsU0FBZCxDQUFmO0FBQ0EsZ0JBQUssQ0FBQyxRQUFOLEVBQWlCO0FBQ2YsdUJBQVUsNEJBQTRCLFNBQTVCLEdBQXdDLDRCQUF4QyxHQUNSLHFCQURRLEdBQ2dCLE9BRGhCLEdBQzBCLEdBRHBDO0FBRUE7QUFDRDtBQUNELGdCQUFLLENBQUMsRUFBRSxVQUFGLENBQWMsU0FBUyxPQUFULENBQWQsQ0FBRCxJQUFzQyxRQUFRLE1BQVIsQ0FBZSxDQUFmLE1BQXNCLEdBQWpFLEVBQXVFO0FBQ3JFLHVCQUFVLHFCQUFxQixPQUFyQixHQUErQixRQUEvQixHQUEwQyxTQUExQyxHQUFzRCxXQUFoRTtBQUNBO0FBQ0Q7O0FBRUQ7QUFDQSxnQkFBSSxjQUFjLFNBQVUsT0FBVixFQUFvQixLQUFwQixDQUEyQixRQUEzQixFQUFxQyxJQUFyQyxDQUFsQjs7QUFFQTtBQUNBLGdCQUFLLGdCQUFnQixTQUFyQixFQUFpQztBQUMvQixxQkFBTyxXQUFQO0FBQ0Q7QUFDRjtBQUNEO0FBQ0EsaUJBQU8sSUFBUDtBQUNELFNBNUJELE1BNEJPO0FBQ0wsaUJBQU8sS0FBSyxJQUFMLENBQVcsWUFBVztBQUMzQixnQkFBSSxXQUFXLEVBQUUsSUFBRixDQUFRLElBQVIsRUFBYyxTQUFkLENBQWY7QUFDQSxnQkFBSyxRQUFMLEVBQWdCO0FBQ2Q7QUFDQSx1QkFBUyxNQUFULENBQWlCLE9BQWpCO0FBQ0EsdUJBQVMsS0FBVDtBQUNELGFBSkQsTUFJTztBQUNMO0FBQ0EseUJBQVcsSUFBSSxXQUFKLENBQWlCLElBQWpCLEVBQXVCLE9BQXZCLENBQVg7QUFDQSxnQkFBRSxJQUFGLENBQVEsSUFBUixFQUFjLFNBQWQsRUFBeUIsUUFBekI7QUFDRDtBQUNGLFdBWE0sQ0FBUDtBQVlEO0FBQ0YsT0EzQ0Q7QUE2Q0Q7O0FBRUQ7O0FBRUE7Ozs7OztBQU1BLE1BQUUsT0FBRixHQUFZLFVBQVUsU0FBVixFQUFxQixXQUFyQixFQUFtQztBQUM3QyxzQkFBaUIsV0FBakI7QUFDQSxhQUFRLFNBQVIsRUFBbUIsV0FBbkI7QUFDRCxLQUhEOztBQUtBLFdBQU8sRUFBRSxPQUFUO0FBRUM7O0FBRUQ7QUFDQSxNQUFLLE9BQU8sTUFBUCxLQUFrQixVQUFsQixJQUFnQyxPQUFPLEdBQTVDLEVBQWtEO0FBQ2hEO0FBQ0EsV0FBUSxDQUFFLFFBQUYsQ0FBUixFQUFzQixhQUF0QjtBQUNELEdBSEQsTUFHTyxJQUFLLFFBQU8sT0FBUCx5Q0FBTyxPQUFQLE9BQW1CLFFBQXhCLEVBQW1DO0FBQ3hDLGtCQUFlLFFBQVEsUUFBUixDQUFmO0FBQ0QsR0FGTSxNQUVBO0FBQ0w7QUFDQSxrQkFBZSxPQUFPLE1BQXRCO0FBQ0Q7QUFFQSxDQXBJRCxFQW9JSSxNQXBJSjs7Ozs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVBBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4a0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5NUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5SkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzF1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEZpeGVkTmF2YmFyXHJcbiAgY29uc3RydWN0b3I6KCBuYXZiYXJTZWxlY3RvciwgYm9keVNlbGVjdG9yICkgLT5cclxuICAgIEAkbmF2YmFyID0gJCBuYXZiYXJTZWxlY3RvclxyXG4gICAgQCRib2R5ID0gJCBib2R5U2VsZWN0b3JcclxuICAgIEBvbigpXHJcbiAgICBAaW5pdCgpXHJcblxyXG5cclxuICBnZXROYXZiYXJIZWlnaHQ6ID0+XHJcbiAgICBAJG5hdmJhci5oZWlnaHQoKVxyXG5cclxuXHJcbiAgZ2V0TmF2YmFyT2Zmc2V0OiA9PlxyXG4gICAgQCRuYXZiYXIucG9zaXRpb24oKS50b3BcclxuXHJcblxyXG4jICBzaGlmdFdpbmRvdzogPT5cclxuIyAgICBzZXRUaW1lb3V0KCAoKSA9PlxyXG4jICAgICAgd2luZG93LnNjcm9sbEJ5IDAsIC0xICogQGdldE5hdmJhckhlaWdodCgpIC0gQGdldE5hdmJhck9mZnNldCgpXHJcbiMgICAgLCAwIClcclxuXHJcblxyXG4gIGluaXQ6ID0+XHJcbiAgICBAJG5hdmJhci5hZGRDbGFzcygnaXMtZml4ZWQnKVxyXG4gICAgQCRib2R5LmNzcyBwYWRkaW5nVG9wOiBAZ2V0TmF2YmFySGVpZ2h0KClcclxuXHJcblxyXG4gIG9uOiAtPlxyXG4gICAgJHdpbmRvdyA9ICQod2luZG93KVxyXG4gICAgJHdpbmRvdy5yZXNpemUgQGluaXRcclxuXHJcbiAgICAkd2luZG93Lm9uIFwiaGFzaGNoYW5nZVwiLCBAc2hpZnRXaW5kb3dcclxuXHJcbiAgICAkKFwiYm9keVwiKS5vbiBcImNsaWNrXCIsIFwiYVwiLCAoZXZlbnQpID0+XHJcblxyXG4jXHJcbiMgICAgICBpZiAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLmF0dHIoXCJocmVmXCIpLm1hdGNoKC9eIy4rLylcclxuIyAgICAgICAgQHNoaWZ0V2luZG93KClcclxuIyAgICAgICN0b2RvXHJcbiMgICAgICBpZiBsb2NhdGlvbi5oYXNoID09ICQoZXZlbnQuY3VycmVudFRhcmdldCkuYXR0cihcImhyZWZcIilcclxuIyAgICAgICAgQHNoaWZ0V2luZG93KClcclxuI1xyXG4jICAgICR3aW5kb3cub24gJ2xvYWQnLCA9PlxyXG4jICAgICAgaWYgbG9jYXRpb24uaGFzaFxyXG4jICAgICAgICBAc2hpZnRXaW5kb3coKVxyXG4iLCIkID0gcmVxdWlyZSAnanF1ZXJ5J1xyXG5tb2R1bGUuZXhwb3J0cyA9IGNsYXNzIEZpeGVkU3ViTmF2YmFyXHJcblxyXG4gIGNvbnN0cnVjdG9yOigkZWxlbWVudCwgY2xhc3NEYXRhLCBuYXZiYXIpLT5cclxuICAgIEBuYXZiYXIgPSBuYXZiYXJcclxuICAgIEAkZWxlbWVudCA9ICRlbGVtZW50XHJcbiAgICBAY2xhc3NEYXRhID0gY2xhc3NEYXRhXHJcbiAgICBAJHdpbmRvdyA9ICQgd2luZG93O1xyXG5cclxuICAgIEBhY3Rpb24oKVxyXG5cclxuICAgIEAkd2luZG93Lm9uIFwibG9hZCByZXNpemUgc2Nyb2xsXCIsIEBhY3Rpb25cclxuXHJcbiAgc2V0Q2xhc3M6KCkgPT5cclxuICAgICN1bmxlc3MgQCRlbGVtZW50Lmhhc0NsYXNzIEBjbGFzc0RhdGFcclxuICAgICAgQCRlbGVtZW50LmFkZENsYXNzIEBjbGFzc0RhdGFcclxuICAgICAgQCRlbGVtZW50LnRyaWdnZXIgXCJzZXRDbGFzc1wiXHJcblxyXG4gIHVuc2V0Q2xhc3M6KCkgPT5cclxuICAgICNpZiBAJGVsZW1lbnQuaGFzQ2xhc3MgQGNsYXNzRGF0YVxyXG4gICAgICBAJGVsZW1lbnQucmVtb3ZlQ2xhc3MgQGNsYXNzRGF0YVxyXG4gICAgICBAJGVsZW1lbnQudHJpZ2dlciBcInVuc2V0Q2xhc3NcIlxyXG5cclxuICBnZXRPZmZzZXQ6KCkgPT5cclxuICAgIHBhcnNlSW50KEAkZWxlbWVudC5vZmZzZXQoKS50b3ApXHJcblxyXG5cclxuICBhY3Rpb246KCkgPT5cclxuICAgIGlmIEAkd2luZG93LnNjcm9sbFRvcCgpIDwgIEBnZXRPZmZzZXQoKSAtIHBhcnNlSW50KEBuYXZiYXIuZ2V0TmF2YmFySGVpZ2h0KCkpXHJcbiAgICAgIEB1bnNldENsYXNzKClcclxuICAgIGVsc2VcclxuICAgICAgQHNldENsYXNzKClcclxuXHJcbiIsIlxyXG5fID0gcmVxdWlyZSgndW5kZXJzY29yZScpXHJcbiQgPSByZXF1aXJlKCdqcXVlcnknKVxyXG5yZXF1aXJlKCdqcXVlcnktYnJpZGdldCcpXHJcbiQuYnJpZGdldCggJ3BhY2tlcnknLCByZXF1aXJlKCdwYWNrZXJ5JykgKVxyXG5cclxuXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAob3B0aW9uKSAtPlxyXG5cclxuXHJcbiAgcGFnZSA9IDFcclxuXHJcbiAgaXNMb2FkaW5nID0gZmFsc2VcclxuXHJcbiAgJG1hc29ucnkgPSAkKCdbZGF0YS1tYXNvbnJ5XScpLnBhY2tlcnkoe1xyXG4gICAgY29sdW1uV2lkdGg6ICAgICAgJ1tkYXRhLW1hc29ucnktc2l6ZXJdJ1xyXG4gICAgaXRlbVNlbGVjdG9yOiAgICAgJ1tkYXRhLW1hc29ucnktaXRlbV0nXHJcbiAgICBwZXJjZW50UG9zaXRpb246ICB0cnVlLFxyXG4gICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAwXHJcbiAgfSlcclxuXHJcbiAgaXNDb250ZW50c092ZXJTY3JlZW4gPSAtPlxyXG4gICAgJGNvbnRhaW5lciA9ICQoJ1tkYXRhLW1hc29ucnldJylcclxuICAgICRjb250YWluZXIuaGVpZ2h0KCkgKyAkY29udGFpbmVyLm9mZnNldCgpLnRvcCA8ICQod2luZG93KS5oZWlnaHQoKSArICQod2luZG93KS5zY3JvbGxUb3AoKVxyXG5cclxuICB0cmlnZ2VyU2Nyb2xsVG9Cb3R0b20gPSAtPlxyXG4gICAgaWYgaXNDb250ZW50c092ZXJTY3JlZW4oKVxyXG4gICAgICAkKHdpbmRvdykudHJpZ2dlciAnc2Nyb2xsVG9Cb3R0b20nXHJcblxyXG5cclxuXHJcbiAgYXBwZW5kID0gLT5cclxuXHJcbiAgICB1bmxlc3MgaXNMb2FkaW5nXHJcbiAgICAgIGlmIHBhZ2UgPCAkbWFzb25yeS5kYXRhKCdtYXNvbnJ5LW1heC1wYWdlJylcclxuXHJcbiAgICAgICAgbmV4dFBhZ2UgPSBwYWdlICsgMTtcclxuICAgICAgICBpc0xvYWRpbmcgPSB0cnVlXHJcblxyXG4gICAgICAgICRtYXNvbnJ5LnBhY2tlcnkgJ29uY2UnLCAnbGF5b3V0Q29tcGxldGUnLCAoKSAtPlxyXG4gICAgICAgICAgaXNMb2FkaW5nID0gZmFsc2VcclxuICAgICAgICAgIHBhZ2UrK1xyXG5cclxuICAgICAgICAkLmFqYXgoXHJcbiAgICAgICAgICB1cmw6ICcvZXhwZXJpZW5jZXMvcGFnZS8nICsgbmV4dFBhZ2VcclxuICAgICAgICApXHJcbiAgICAgICAgLmRvbmUoICggZGF0YSApIC0+XHJcbiAgICAgICAgICBodG1sID0gICc8ZGl2PicgKyBkYXRhICsgJzwvZGl2PidcclxuICAgICAgICAgICRpdGVtcyA9ICQoaHRtbCkuZmluZCgnW2RhdGEtbWFzb25yeS1pdGVtXScpXHJcbiAgICAgICAgICAkbWFzb25yeS5hcHBlbmQoICRpdGVtcyApXHJcbiAgICAgICAgICAkbWFzb25yeS5wYWNrZXJ5KCAnYXBwZW5kZWQnLCAkaXRlbXMgKVxyXG4gICAgICAgIClcclxuXHJcbiAgI2FwcGVuZCgpXHJcblxyXG4gICRtYXNvbnJ5Lm9uIGxheW91dENvbXBsZXRlOiAtPlxyXG4gICAgY29uc29sZS5sb2coICdQYWNrZXJ5IGxheW91dCBjb21wbGV0ZWQgb24gMScgKVxyXG4gICAgJCgnLnAtdm9pY2VzX19pdGVtJykuY3NzKCdvcGFjaXR5JywgJzEnKTtcclxuICAgIGNvbnNvbGUubG9nKCAnUGFja2VyeSBsYXlvdXQgY29tcGxldGVkIG9uIDInIClcclxuICBcclxuICAjIyNcclxuICAkZ3JpZC5vbiggJ2xheW91dENvbXBsZXRlJyxcclxuICAgIGZ1bmN0aW9uKCBldmVudCwgbGFpZE91dEl0ZW1zICkge1xyXG4gICAgICBjb25zb2xlLmxvZyggJ1BhY2tlcnkgbGF5b3V0IGNvbXBsZXRlZCBvbiAnICtcclxuICAgICAgICBsYWlkT3V0SXRlbXMubGVuZ3RoICsgJyBpdGVtcycgKTtcclxuICAgIH1cclxuICApO1xyXG4gICMjI1xyXG4gIFxyXG4gICQoZG9jdW1lbnQpLm9uIFwiY2xpY2tcIiwgXCIuanMtc2VsZWN0LWNhdGVnb3J5XCIsIC0+XHJcbiAgICAkKHRoaXMpLnBhcmVudCgpLnNpYmxpbmdzKCkuZmluZCgnYScpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpXHJcbiAgICAkKHRoaXMpLnRvZ2dsZUNsYXNzKCdzZWxlY3RlZCcpXHJcbiAgICBpZiAkKHRoaXMpLmhhc0NsYXNzKCdzZWxlY3RlZCcpXHJcbiAgICAgICAgJCgnLnAtdm9pY2VzX19pdGVtJykuaGlkZSgpXHJcbiAgICAgICAgbWFzb25yeUl0ZW1TZWxlY3RvciA9ICcuJy5jb25jYXQgJCh0aGlzKS5kYXRhKCd0aWxlLXRhcmdldCcpXHJcbiAgICAgICAgJChtYXNvbnJ5SXRlbVNlbGVjdG9yKS5zaG93KCk7XHJcbiAgICAgICAgJG1hc29ucnkgPSAkKCdbZGF0YS1tYXNvbnJ5XScpLnBhY2tlcnkoe1xyXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogICAgICAnW2RhdGEtbWFzb25yeS1zaXplcl0nXHJcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogICAgIG1hc29ucnlJdGVtU2VsZWN0b3JcclxuICAgICAgICAgICAgcGVyY2VudFBvc2l0aW9uOiAgdHJ1ZSxcclxuICAgICAgICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAwXHJcbiAgICAgICAgfSlcclxuICAgIGVsc2VcclxuICAgICAgICAkKCcucC12b2ljZXNfX2l0ZW0nKS5zaG93KClcclxuICAgICAgICAkbWFzb25yeSA9ICQoJ1tkYXRhLW1hc29ucnldJykucGFja2VyeSh7XHJcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiAgICAgICdbZGF0YS1tYXNvbnJ5LXNpemVyXSdcclxuICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAgICAgJ1tkYXRhLW1hc29ucnktaXRlbV0nXHJcbiAgICAgICAgICAgIHBlcmNlbnRQb3NpdGlvbjogIHRydWUsXHJcbiAgICAgICAgICAgIHRyYW5zaXRpb25EdXJhdGlvbjogMFxyXG4gICAgICAgIH0pXHJcblxyXG4gICRhcHBlbmRCdXR0b24gPSAkKCdbZGF0YS10aWxlLWFwcGVuZF0nKVxyXG5cclxuICBpZiAkYXBwZW5kQnV0dG9uXHJcbiAgICAkYXBwZW5kQnV0dG9uLm9uICdjbGljaycsIChldmVudCkgPT5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBfLnRocm90dGxlKGFwcGVuZCwgMClcclxuXHJcbiAgaWYgJG1hc29ucnkubGVuZ3RoID4gMFxyXG4gICAgJCh3aW5kb3cpLm9uICdsb2FkJywgKCkgLT5cclxuICAgICAgJG1hc29ucnkucGFja2VyeSgpXHJcblxyXG4gICAgJCh3aW5kb3cpLm9uICdzY3JvbGwnLCBfLnRocm90dGxlKCB0cmlnZ2VyU2Nyb2xsVG9Cb3R0b20gLCAwIClcclxuICAgICQod2luZG93KS5vbiAnc2Nyb2xsVG9Cb3R0b20nLCBhcHBlbmRcclxuIiwiaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1vYmlsZU5hdmlnYXRpb24ge1xyXG5cclxuICBzdGF0aWMgaW5pdCgpIHtcclxuICAgIFxyXG4gICAgaWYgKCgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cpIHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2YgRG9jdW1lbnRUb3VjaCkgeyBcclxuICAgIFxyXG4gICAgICAvLyBUb3VjaCBldmVudHMgYXJlIHN1cHBvcnRlZFxyXG4gICAgICBcclxuICAgICAgJChkb2N1bWVudClcclxuICAgICAgICAub24oJ3RvdWNoc3RhcnQnLCAnLm1lbnUtaXRlbS1oYXMtY2hpbGRyZW4nLCBmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgICBpZiAoZS50YXJnZXQudGFnTmFtZSA9PSAnTEknKSB7XHJcbiAgICAgICAgICAgICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgXHJcbiAgICAgICQoZG9jdW1lbnQpXHJcbiAgICAgICAgLm9uKCdjbGljaycsICcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgIGlmIChlLnRhcmdldC50YWdOYW1lID09ICdMSScpIHtcclxuICAgICAgICAgICAgJCh0aGlzKS50b2dnbGVDbGFzcygnYWN0aXZlJyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcbiAgICBcclxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XHJcbiAgICAgICQoJy5tZW51LWl0ZW0taGFzLWNoaWxkcmVuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxufSIsIiQgPSByZXF1aXJlICdqcXVlcnknXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBjbGFzcyBTY3JvbGxBY3Rpb25cclxuXHJcbiAgY29uc3RydWN0b3I6KCRlbGVtZW50LCBjbGFzc0RhdGEpLT5cclxuICAgIEAkZWxlbWVudCA9ICRlbGVtZW50XHJcbiAgICBAY2xhc3NEYXRhID0gY2xhc3NEYXRhXHJcbiAgICBAJHdpbmRvdyA9ICQgd2luZG93O1xyXG4gICAgQCR3aW5kb3cub24gXCJsb2FkIHJlc2l6ZSBzY3JvbGxcIiwgQGFjdGlvblxyXG4gICAgQGFjdGlvbigpXHJcblxyXG4gIHNldENsYXNzOigpID0+XHJcbiAgICB1bmxlc3MgQCRlbGVtZW50Lmhhc0NsYXNzIEBjbGFzc0RhdGFcclxuICAgICAgQCRlbGVtZW50LmFkZENsYXNzIEBjbGFzc0RhdGFcclxuICAgICAgQCRlbGVtZW50LnRyaWdnZXIgXCJzZXRDbGFzc1wiXHJcblxyXG4gIHVuc2V0Q2xhc3M6KCkgPT5cclxuICAgIGlmIEAkZWxlbWVudC5oYXNDbGFzcyBAY2xhc3NEYXRhXHJcbiAgICAgIEAkZWxlbWVudC5yZW1vdmVDbGFzcyBAY2xhc3NEYXRhXHJcbiAgICAgIEAkZWxlbWVudC50cmlnZ2VyIFwidW5zZXRDbGFzc1wiXHJcblxyXG4gIGdldE9mZnNldDooKSA9PlxyXG4gICAgaWYgQCRlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PSBcImZpeGVkXCJcclxuICAgICAgcGFyc2VJbnQoQCRlbGVtZW50LmhlaWdodCgpKSArIHBhcnNlSW50KEAkZWxlbWVudC5wb3NpdGlvbigpLnRvcClcclxuICAgIGVsc2VcclxuICAgICAgcGFyc2VJbnQoQCRlbGVtZW50Lm9mZnNldCgpLnRvcClcclxuXHJcblxyXG4gIGFjdGlvbjooKSA9PlxyXG4gICAgaWYgQCR3aW5kb3cuc2Nyb2xsVG9wKCkgPCBAZ2V0T2Zmc2V0KClcclxuICAgICAgQHVuc2V0Q2xhc3MoKVxyXG4gICAgZWxzZVxyXG4gICAgICBAc2V0Q2xhc3MoKVxyXG5cclxuXHJcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZU1lbnUge1xyXG5cclxuXHRjb25zdHJ1Y3RvcigkZWwpIHtcclxuXHRcdHRoaXMuJGVsID0gJGVsO1xyXG5cdFx0dGhpcy5zdGF0ZSA9IGZhbHNlO1xyXG5cdFx0dGhpcy4kdGFyZ2V0ID0gJCh0aGlzLiRlbC5kYXRhKFwic2xpZGVtZW51LXRhcmdldFwiKSk7XHJcblx0XHR0aGlzLm9uKCk7XHJcblx0fVxyXG5cclxuXHRvbigpIHtcclxuXHRcdHRoaXMuJGVsLm9uKCdjbGljaycsIHRoaXMudG9nZ2xlLmJpbmQodGhpcykpO1xyXG5cdH1cclxuXHJcblx0dG9nZ2xlKGV2ZW50KSB7XHJcblx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cdFx0dGhpcy5zdGF0ZSA9ICF0aGlzLnN0YXRlO1xyXG5cdFx0aWYgKHRoaXMuc3RhdGUpIHtcclxuXHRcdFx0dGhpcy5vcGVuKCk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLmNsb3NlKCk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRvcGVuKCkge1xyXG5cdFx0dmFyIGhlaWdodDtcclxuXHRcdHRoaXMuJGVsLmFkZENsYXNzKFwiaXMtb3BlblwiKTtcclxuXHRcdHRoaXMuJHRhcmdldC5hZGRDbGFzcyhcImlzLW9wZW5cIik7XHJcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KFwiXCIpO1xyXG5cdFx0aGVpZ2h0ID0gdGhpcy4kdGFyZ2V0LmhlaWdodCgpO1xyXG5cdFx0dGhpcy4kdGFyZ2V0LmhlaWdodCgwKTtcclxuXHRcdHRoaXMuJHRhcmdldC5oZWlnaHQoaGVpZ2h0KTtcclxuICAgIGlmICh0aGlzLiRlbC5oYXNDbGFzcygncC1uYXZiYXJfX3RvZ2dsZScpKSB7XHJcbiAgICAgICQoJ2JvZHknKS5oZWlnaHQoaGVpZ2h0KS5jc3MoJ292ZXJmbG93JywgJ2hpZGRlbicpO1xyXG4gICAgfVxyXG5cdH1cclxuXHJcblx0Y2xvc2UoKSB7XHJcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KHRoaXMuJHRhcmdldC5oZWlnaHQoKSk7XHJcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KDApO1xyXG5cdFx0dGhpcy4kZWwucmVtb3ZlQ2xhc3MoXCJpcy1vcGVuXCIpO1xyXG5cdFx0dGhpcy4kdGFyZ2V0LnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcclxuICAgIGlmICh0aGlzLiRlbC5oYXNDbGFzcygncC1uYXZiYXJfX3RvZ2dsZScpKSB7XHJcbiAgICAgICQoJ2JvZHknKS5oZWlnaHQoJ2F1dG8nKS5jc3MoJ292ZXJmbG93JywgJ3Zpc2libGUnKTtcclxuICAgIH1cclxuXHR9XHJcbiAgXHJcblx0c3RhdGljIGluaXQoKSB7XHJcblx0XHQkKFwiW2RhdGEtc2xpZGVtZW51LXRhcmdldF1cIikuZWFjaChmdW5jdGlvbigpIHtcclxuXHRcdFx0cmV0dXJuIG5ldyBTbGlkZU1lbnUoJCh0aGlzKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG59IiwiJCA9IHJlcXVpcmUgJ2pxdWVyeSdcclxuXyA9IHJlcXVpcmUgJ3VuZGVyc2NvcmUnXHJcbm1vZHVsZS5leHBvcnRzID0gY2xhc3MgU3ViTmF2aWdhdGlvblxyXG5cclxuICBjb25zdHJ1Y3RvcjogKCBzZWxlY3RvciwgY29udGVudHNTZWxlY3RvciApIC0+XHJcblxyXG4gICAgQCRlbGVtZW50ID0gJCBzZWxlY3RvclxyXG4gICAgQCRjb250ZW50ID0gJCBjb250ZW50c1NlbGVjdG9yXHJcbiAgICBpdGVtcyA9IEBjcmVhdGUoKVxyXG5cclxuICAgIHNlbGYgPSBAXHJcbiAgICBAJGVsZW1lbnQuZWFjaCAoKSAtPlxyXG4gICAgICAkdGhpcyA9ICQoQClcclxuICAgICAgdGVtcGxhdGUgPSBfLnRlbXBsYXRlICQoJ1tkYXRhLXN1Yi1uYXZpZ2F0aW9uLXRlbXBsYXRlXScpLnRleHQoKVxyXG5cclxuICAgICAgaWYgdGVtcGxhdGVcclxuICAgICAgICBodG1sID0gXy5tYXAgaXRlbXMsIChpdGVtKS0+IHRlbXBsYXRlIGl0ZW1cclxuICAgICAgICAkdGhpcy5hcHBlbmQgaHRtbFxyXG5cclxuICBjcmVhdGU6IC0+XHJcbiAgICBpdGVtcyA9IFtdXHJcbiAgICBAJGNvbnRlbnQuZmluZCgnaDEsIGgyLCBoMywgaDQnKS5lYWNoICgpIC0+XHJcbiAgICAgICR0aGlzID0gJCBAXHJcbiAgICAgIGlkID0gJHRoaXMuYXR0cignaWQnKVxyXG4gICAgICBpZCA9ICR0aGlzLmZpbmQoJ2EnKS5hdHRyKCdpZCcpIHVubGVzcyBpZFxyXG4gICAgICBpZiBpZFxyXG4gICAgICAgIGl0ZW1zLnB1c2ggeyBpZDogaWQsIHRleHQ6ICR0aGlzLnRleHQoKSB9XHJcblxyXG4gICAgaXRlbXNcclxuXHJcbiIsImltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJzY3JpcHRpb25Qb3B1cCB7XHJcblxyXG4gIHN0YXRpYyBpbml0KCkge1xyXG4gICAgXHJcbiAgICB2YXIgdGFyZ2V0SGVpZ2h0ID0gJCh3aW5kb3cpLmhlaWdodCgpLFxyXG4gICAgICAgIHN1YlBvcCA9ICQoJy5zdWJzY3JpcHRpb24tcG9wdXAnKSxcclxuICAgICAgICBzaG93U3Vic2NyaXB0aW9uUG9wdXAgPSBmYWxzZTtcclxuICAgIFxyXG4gICAgaWYgKHR5cGVvZihTdG9yYWdlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgLy9sb2NhbFN0b3JhZ2Uuc3Vic2NyaXB0aW9uRW5hYmxlZCA9ICd5ZXMnO1xyXG4gICAgICAvL2NvbnNvbGUubG9nKGxvY2FsU3RvcmFnZS5zdWJzY3JpcHRpb25FbmFibGVkKTtcclxuICAgICAgLy9jb25zb2xlLmxvZyhzZXNzaW9uU3RvcmFnZS5zdWJzY3JpcHRpb25DbG9zZWQpO1xyXG4gICAgICBpZiAoc2Vzc2lvblN0b3JhZ2Uuc3Vic2NyaXB0aW9uQ2xvc2VkID09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Nlc3Npb25TdG9yYWdlLnN1YnNjcmlwdGlvbkNsb3NlZCBpcyB1bmRlZmluZWQnKTtcclxuICAgICAgICBzaG93U3Vic2NyaXB0aW9uUG9wdXAgPSB0cnVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ3Nlc3Npb25TdG9yYWdlLnN1YnNjcmlwdGlvbkNsb3NlZCBpcyBwcmVzZW50Jyk7XHJcbiAgICAgICAgaWYgKHNlc3Npb25TdG9yYWdlLnN1YnNjcmlwdGlvbkNsb3NlZCA9PSAneWVzJykge1xyXG4gICAgICAgICAgc2hvd1N1YnNjcmlwdGlvblBvcHVwID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBcclxuICAgICQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIHZhciBzY3JvbGxQb3MgPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgaWYgKHNjcm9sbFBvcyA+IHRhcmdldEhlaWdodCAmJiBzaG93U3Vic2NyaXB0aW9uUG9wdXApIHtcclxuICAgICAgICBzdWJQb3AuYWRkQ2xhc3MoJ3Nob3dlZC1wb3B1cCcpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN1YlBvcC5yZW1vdmVDbGFzcygnc2hvd2VkLXBvcHVwJyk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAkKGRvY3VtZW50KVxyXG4gICAgICAub24oJ2NsaWNrJywgJy5zdWJzY3JpcHRpb24tcG9wdXAgLmNsb3NlLXBvcHVwJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgc3ViUG9wLmhpZGUoKTtcclxuICAgICAgICBzZXNzaW9uU3RvcmFnZS5zdWJzY3JpcHRpb25DbG9zZWQgPSAneWVzJztcclxuICAgICAgfSlcclxuICAgICAgLm9uKCdjbGljaycsICcucGFyZG90LWZvcm1zLXdpZGdldCcsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIC8vY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5vbignY2xpY2snLCAnLmpzLXNob3ctdGVhc2VyLXBvcHVwJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBTaG93VGVhc2VyQkcoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBTaG93VGVhc2VyUG9wdXAoKTtcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuICAgICAgLm9uKCdjbGljaycsICcudGVhc2VyLXBvcHVwLXdyYXBwZXIgLmNsb3NlLXBvcHVwJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICQoJy50ZWFzZXItcG9wdXAtd3JhcHBlcicpLnJlbW92ZUNsYXNzKCdzaG93ZWQtcG9wdXAnKS5hZGRDbGFzcygnY2xvc2VkLXBvcHVwJyk7XHJcbiAgICAgIH0pO1xyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBTaG93VGVhc2VyQkcoY2FsbGJhY2spIHtcclxuICAgICAgICAkKCcudGVhc2VyLXBvcHVwLXdyYXBwZXInKS50b2dnbGVDbGFzcygnY2xvc2VkLXBvcHVwJyk7XHJcbiAgICAgICAgaWYodHlwZW9mIGNhbGxiYWNrID09IFwiZnVuY3Rpb25cIil7XHJcbiAgICAgICAgICAgIGNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBTaG93VGVhc2VyUG9wdXAoKSB7XHJcbiAgICAgICAgJCgnLnRlYXNlci1wb3B1cC13cmFwcGVyJykudG9nZ2xlQ2xhc3MoJ3Nob3dlZC1wb3B1cCcpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3dpcGVyVGh1bWJzIHtcclxuXHJcbiAgc3RhdGljIGluaXQoKSB7XHJcbiAgICB2YXIgZ2FsbGVyeVRvcCwgZ2FsbGVyeVRodW1icztcclxuICAgIHZhciBnYWxsZXJ5VG9wID0gbmV3IFN3aXBlcignLmdhbGxlcnktdG9wJywge1xyXG4gICAgICAgIG5leHRCdXR0b246ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICBwcmV2QnV0dG9uOiAnLnN3aXBlci1idXR0b24tcHJldicsXHJcbiAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgfSk7XHJcbiAgICB2YXIgZ2FsbGVyeVRodW1icyA9IG5ldyBTd2lwZXIoJy5nYWxsZXJ5LXRodW1icycsIHtcclxuICAgICAgICBzcGFjZUJldHdlZW46IDAsXHJcbiAgICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgIHRvdWNoUmF0aW86IDAuMixcclxuICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgICBnYWxsZXJ5VG9wLnBhcmFtcy5jb250cm9sID0gZ2FsbGVyeVRodW1icztcclxuICAgIGdhbGxlcnlUaHVtYnMucGFyYW1zLmNvbnRyb2wgPSBnYWxsZXJ5VG9wO1xyXG4gIH1cclxuXHJcbn0iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG9vbHRpcCB7XHJcblxyXG4gIHN0YXRpYyBpbml0KCkge1xyXG4gICAgJCgnI3N1cHBvcnRUb29sdGlwJykudG9nZ2xlKCk7XHJcbiAgICAkKGRvY3VtZW50KVxyXG4gICAgICAub24oJ2NsaWNrJywgJyNzaG93U3VwcG9ydFRvb2x0aXAsICNzdXBwb3J0VG9vbHRpcCAuY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcjc3VwcG9ydFRvb2x0aXAnKS50b2dnbGUoKTtcclxuICAgICAgfSk7XHJcbiAgfVxyXG5cclxufSIsIiQgPSByZXF1aXJlICdqcXVlcnknXHJcblNsaWRlTWVudSA9IHJlcXVpcmUoJy4vU2xpZGVNZW51JykuZGVmYXVsdFxyXG5Ub29sdGlwID0gcmVxdWlyZSgnLi9Ub29sdGlwJykuZGVmYXVsdFxyXG5Td2lwZXJUaHVtYnMgPSByZXF1aXJlKCcuL1N3aXBlclRodW1icycpLmRlZmF1bHRcclxuTW9iaWxlTmF2aWdhdGlvbiA9IHJlcXVpcmUoJy4vTW9iaWxlTmF2aWdhdGlvbicpLmRlZmF1bHRcclxuU3Vic2NyaXB0aW9uUG9wdXAgPSByZXF1aXJlKCcuL1N1YnNjcmlwdGlvblBvcHVwJykuZGVmYXVsdFxyXG5GaXhlZE5hdmJhciA9IHJlcXVpcmUgJy4vRml4ZWROYXZiYXInXHJcblNjcm9sbEFjdGlvbiA9IHJlcXVpcmUgJy4vU2Nyb2xsQWN0aW9uJ1xyXG5TdWJOYXZpZ2F0aW9uID0gcmVxdWlyZSAnLi9TdWJOYXZpZ2F0aW9uJ1xyXG5GaXhlZFN1Yk5hdmJhciA9IHJlcXVpcmUgJy4vRml4ZWRTdWJOYXZiYXInXHJcbk1hc29ucnkgPSByZXF1aXJlICcuL01hc29ucnknXHJcblN3aXBlciA9IHJlcXVpcmUgJy4vLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9kaXN0L2pzL3N3aXBlci5qcydcclxuXHJcblxyXG4kIC0+XHJcbiAgI1xyXG4gICMgTVbjga7jg5Xjgqfjg7zjg4njgqLjgqbjg4hcclxuICAjXHJcblxyXG4gICQod2luZG93KS5vbiAnbG9hZCcsICgpIC0+XHJcbiAgICAkKCcucC1tYWluLXZpc3VhbF9fb3ZlcmxheV9mYWRlb3V0JylcclxuICAgIC5kZWxheSg1MDAwKVxyXG4gICAgLnF1ZXVlKCAoKSAtPiAkKHRoaXMpLmFkZENsYXNzKFwicC1tYWluLXZpc3VhbF9fb3ZlcmxheV9oaWRlXCIpLmRlcXVldWUoKSApXHJcblxyXG5cclxuXHJcbiMkIC0+XHJcblxyXG4gICNcclxuICAjIFlvdHViZSBMaW5rIEJ0bi5cclxuICAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAjXHJcbiAgIyQoJ2FbaHJlZio9XCJ5b3V0dS5iZVwiXScpLmVhY2ggKCktPlxyXG4gICMgIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAjICBocmVmID0gaHJlZi5yZXBsYWNlKFwieW91dHUuYmUvXCIsIFwid3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9XCIpO1xyXG4gICMgICQodGhpcykuYXR0cignaHJlZicsIGhyZWYpO1xyXG5cclxuICAjeW91dHViZSA9ICQoICdhW2hyZWYqPVwieW91dHVcIl06aGFzKGltZyk6bm90KC5oZWFkZXIteW91dHViZSknKTtcclxuICAjeW91dHViZS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwLXRleHQtaW1hZ2UtYmxvY2tfX3BsYXktYnRuXCIvPicpXHJcbiAgI3lvdXR1YmUubWFnbmlmaWNQb3B1cCh7XHJcbiAgIyAgdHlwZTogJ2lmcmFtZScsXHJcbiAgIyAgbWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG4gICMgIHJlbW92YWxEZWxheTogMTYwLFxyXG4gICMgIHByZWxvYWRlcjogZmFsc2UsXHJcbiAgIyAgZml4ZWRDb250ZW50UG9zOiBmYWxzZVxyXG4gICN9KTtcclxuXHJcbiQgLT5cclxuXHJcbiAgJCggJ2EucC1tYWluLXZpc3VhbCcgKS5tYWduaWZpY1BvcHVwKHtcclxuICAgIHR5cGU6ICdpZnJhbWUnLFxyXG4gICAgbWFpbkNsYXNzOiAnbWZwLWZhZGUnLFxyXG4gICAgcmVtb3ZhbERlbGF5OiAxNjAsXHJcbiAgICBwcmVsb2FkZXI6IGZhbHNlLFxyXG5cclxuICAgIGZpeGVkQ29udGVudFBvczogZmFsc2VcclxuICB9KTtcclxuXHJcblxyXG5cclxuJCAtPlxyXG4gICQoZG9jdW1lbnQpLmFqYXhTdWNjZXNzIChldmVudCwgeGhyLCBzZXR0aW5ncykgLT5cclxuICAgIHVybCA9IHNldHRpbmdzLnVybFxyXG4gICAgaWYgZ2E/XHJcbiAgICAgIGdhICdzZW5kJywgJ3BhZ2V2aWV3JywgdXJsLnJlcGxhY2UgbG9jYXRpb24ub3JpZ2luLCBcIlwiXHJcblxyXG4kIC0+XHJcbiAgU2xpZGVNZW51LmluaXQoKVxyXG4gIFxyXG4kIC0+XHJcbiAgVG9vbHRpcC5pbml0KClcclxuXHJcbiQgLT5cclxuICBTd2lwZXJUaHVtYnMuaW5pdCgpXHJcbiAgXHJcbiQgLT5cclxuICBNb2JpbGVOYXZpZ2F0aW9uLmluaXQoKVxyXG5cclxuJCAtPlxyXG4gIFN1YnNjcmlwdGlvblBvcHVwLmluaXQoKVxyXG5cclxuJCAtPlxyXG4gICQod2luZG93KS5vbiAnbG9hZCcsICgpIC0+XHJcbiAgICAkKCcucC12b2ljZS1jb250YWluZXInKS5hZGRDbGFzcygnaXMtdHJhbnNpdGlvbicpO1xyXG5cclxuJCAtPlxyXG4gIHVubGVzcyAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTW9iaWxlL2kpIGFuZCAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaW9zL2kpIGFuZCAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvYW5kcm9pZC9pKVxyXG4gICAgJChcInZpZGVvXCIpLmF0dHIoXCJjb250cm9sc1wiLFwiY29udHJvbHNcIik7XHJcblxyXG5cclxuXHJcbiQgLT5cclxuXHJcbiAgI1xyXG4gICMgU2Nyb2xsIFRvcFxyXG4gICMgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICNcclxuICAkKFwiW2RhdGEtcGFnZVRvcF1cIikuY2xpY2sgKCktPlxyXG4gICAgc3BlZWQgPSA4MDA7XHJcbiAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6MH0sIHNwZWVkLCBcImVhc2VPdXRFeHBvXCIpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG5cclxuICAjXHJcbiAgIyBpbiBwYWdlIHNjcm9sbC5cclxuICAjID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAjXHJcblxyXG4gICQgLT5cclxuXHJcbiAgICBmaXhIYXNoID0gKGV2ZW50KSAtPlxyXG5cclxuICAgICAgaWYgZXZlbnRcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgIGlmIGxvY2F0aW9uLmhhc2gubGVuZ3RoID4gMVxyXG4gICAgICAgIG9mZnNldFRvcCA9ICQobG9jYXRpb24uaGFzaCkub2Zmc2V0KCkudG9wXHJcbiAgICAgICAgJCh3aW5kb3cpLnNjcm9sbFRvcCBvZmZzZXRUb3AgLSAxMzBcclxuICAgICAgZmFsc2VcclxuXHJcbiAgICBmaXhIYXNoKClcclxuXHJcbiAgICAkKHdpbmRvdykub24gXCJoYXNoY2hhbmdlXCIsIGZpeEhhc2hcclxuXHJcblxyXG4gICAgJCgnLnAtc3ViLW5hdmlnYXRpb24nKS5vbiAnY2xpY2snLCAnYScsIChldmVudCkgLT5cclxuXHJcbiAgICAgIGhhc2ggPSBALmhhc2hcclxuICAgICAgJHRhcmdldCA9ICQoaGFzaClcclxuICAgICAgaWYgJHRhcmdldC5sZW5ndGhcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICAgICAgb2Zmc2V0VG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3AgLSAxMzBcclxuICAgICAgICAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6b2Zmc2V0VG9wfSwgNjAwLCBcImVhc2VPdXRFeHBvXCIpLnByb21pc2UoKS5kb25lICgpIC0+XHJcbiAgICAgICAgICAjbG9jYXRpb24uaGFzaCA9ICcnXHJcblxyXG5cclxuXHJcblxyXG5cclxuJCAtPlxyXG5cclxuXHJcbiAgJHZvaWNlQ29udGFpbmVyID0gJCgnW2RhdGEtdm9pY2UtY29udGFpbmVyXScpXHJcblxyXG4gIGlmICR2b2ljZUNvbnRhaW5lci5sZW5ndGhcclxuICAgIG5ldyBNYXNvbnJ5IHtcclxuICAgICAgY29udGFpbmVyOiAnW2RhdGEtbWFzb25yeV0nXHJcbiAgICAgIHNpemVyOiAnW2RhdGEtbWFzb25yeS1zaXplcl0nXHJcbiAgICAgIGl0ZW06ICdbZGF0YS1tYXNvbnJ5LWl0ZW1dJ1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKHdpbmRvdykub24gXCJwb3BzdGF0ZVwiLChldmVudCkgLT5cclxuICAgICAgbG9hZENvbnRlbnQoIGxvY2F0aW9uLmhyZWYgKVxyXG5cclxuXHJcbiAgICAjIyNcclxuICAgICQoXCJbZGF0YS1tYXNvbnJ5XVwiKS5vbiAgJ2NsaWNrJywgJ1tkYXRhLW1hc29ucnktaXRlbV0nLCAoZXZlbnQpLT5cclxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxyXG4gICAgICBsb2FkQ29udGVudCBALmhyZWYsIHRydWVcclxuICAgICAgJCggJ2EucC1tYWluLXZpc3VhbCcgKS5tYWduaWZpY1BvcHVwKHtcclxuICAgICAgICB0eXBlOiAnaWZyYW1lJyxcclxuICAgICAgICBtYWluQ2xhc3M6ICdtZnAtZmFkZScsXHJcbiAgICAgICAgcmVtb3ZhbERlbGF5OiAxNjAsXHJcbiAgICAgICAgcHJlbG9hZGVyOiBmYWxzZSxcclxuXHJcbiAgICAgICAgZml4ZWRDb250ZW50UG9zOiBmYWxzZVxyXG4gICAgICB9KVxyXG5cclxuICAgICAgcmV0dXJuIGZhbHNlXHJcblxyXG4gICAgJHZvaWNlQ29udGFpbmVyLm9uICdjbGljaycsICcucC12b2ljZS1jb250ZW50LWhlYWRlciAuYy1idG4nLCAoZXZlbnQpIC0+XHJcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgICAgbG9hZENvbnRlbnQoIEAuaHJlZiwgdHJ1ZSApXHJcbiAgICAjIyNcclxuXHJcblxyXG4gIGxvYWRDb250ZW50ID0gKCBocmVmICwgYWRkSGlzdG9yeSApLT5cclxuICAgIHNjcm9sbCA9ICQod2luZG93KS5zY3JvbGxUb3AoKSAjZm9yIGNocm9tZSBidWcgZml4LlxyXG5cclxuICAgIHBhcnNlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKVxyXG4gICAgcGFyc2VyLmhyZWYgPSBocmVmXHJcblxyXG4gICAgY29uc29sZS5sb2cocGFyc2VyLnBhdGhuYW1lLnN1YnN0cigxKS5zcGxpdCgnLycpLmxlbmd0aCk7XHJcblxyXG4gICAgaWYgcGFyc2VyLnBhdGhuYW1lLnN1YnN0cigxKS5zcGxpdCgnLycpLmxlbmd0aCA+IDJcclxuXHJcbiAgICAgICQuYWpheChcclxuICAgICAgICB1cmw6IGhyZWZcclxuICAgICAgKVxyXG4gICAgICAuZG9uZSggKCBkYXRhICkgPT5cclxuICAgICAgICAkdm9pY2VDb250YWluZXIub25lICd0cmFuc2l0aW9uZW5kJywgKCkgLT5cclxuICAgICAgICAgIGlmIGFkZEhpc3RvcnlcclxuICAgICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe2hyZWY6IGhyZWZ9LCAnJywgaHJlZilcclxuICAgICAgICAgICQoJ2JvZHknKS5jc3Mgb3ZlcmZsb3c6ICdoaWRkZW4nXHJcblxyXG4gICAgICAgICAgJCh3aW5kb3cpLm9uZSAnc2Nyb2xsJywgKCktPlxyXG4gICAgICAgICAgICAkKHdpbmRvdykuc2Nyb2xsVG9wKHNjcm9sbClcclxuXHJcblxyXG5cclxuICAgICAgICBodG1sID0gICc8ZGl2PicgKyBkYXRhICsgJzwvZGl2PidcclxuICAgICAgICAkY29udGVudCA9ICQoaHRtbCkuZmluZCgnW2RhdGEtdm9pY2UtY29udGVudF0nKVxyXG4gICAgICAgICR2b2ljZUNvbnRhaW5lci5odG1sKCRjb250ZW50KVxyXG4gICAgICAgICR2b2ljZUNvbnRhaW5lci5hZGRDbGFzcygnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgJHZvaWNlQ29udGFpbmVyLmNzcyBwYWRkaW5nVG9wOiAkKCcucC1uYXZiYXInKS5oZWlnaHQoKVxyXG5cclxuICAgICAgKVxyXG5cclxuICAgIGVsc2VcclxuXHJcbiAgICAgIGlmICR2b2ljZUNvbnRhaW5lci5sZW5ndGhcclxuICAgICAgICAkdm9pY2VDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcbiAgICAgICAgJCgnYm9keScpLmNzcyBvdmVyZmxvdzogJ3Zpc2libGUnXHJcbiAgICAgICAgaWYgYWRkSGlzdG9yeVxyXG4gICAgICAgICAgaGlzdG9yeS5wdXNoU3RhdGUoe2hyZWY6IGhyZWZ9LCAnJywgaHJlZilcclxuICAgICAgZWxzZVxyXG4gICAgICAgIGlmIGxvY2F0aW9uLnBhdGhuYW1lLmluZGV4T2YoJ2V4cGVyaWVuY2VzJykgPiAtMVxyXG4gICAgICAgICAgbG9jYXRpb24ucmVsb2FkKClcclxuXHJcbiNcclxuI1xyXG4jIGp1bWJvdHJvblxyXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuI1xyXG5cclxuJCAtPlxyXG4gIHN3aXBlciA9IG5ldyBTd2lwZXIoJy5wLWp1bWJvdHJvbicsIHtcclxuICAgIHNwYWNlQmV0d2VlbjogMCxcclxuICAgICNsb29wOiB0cnVlLFxyXG4gICAgbG9vcDogZmFsc2UsXHJcbiAgICBzcGVlZDogOTAwLFxyXG4gICAgYXV0b3BsYXk6IDgwMDAsXHJcbiAgICBhdXRvcGxheURpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcclxuICAgIHBhZ2luYXRpb246ICcucC1qdW1ib3Ryb25fX3BhZ2luYXRpb24nLFxyXG4gICAgcGFnaW5hdGlvbkNsaWNrYWJsZTogdHJ1ZVxyXG5cclxuICB9KTtcclxuXHJcbiAgbmV3IFN3aXBlcignLnAtc2xpZGVzaG93Jywge1xyXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgc3BlZWQ6IDEwMDAsXHJcbiAgICBhdXRvcGxheTogMzAwMCxcclxuICAgIGVmZmVjdDogJ2ZhZGUnLFxyXG4gICAgYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2VcclxuICB9KVxyXG5cclxuIyMjXHJcbiQgLT5cclxuICAgIGdhbGxlcnlUb3AgPSBuZXcgU3dpcGVyKCcuZ2FsbGVyeS10b3AnLCB7XHJcbiAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICBuZXh0RWw6ICcuc3dpcGVyLWJ1dHRvbi1uZXh0JyxcclxuICAgICAgICBwcmV2RWw6ICcuc3dpcGVyLWJ1dHRvbi1wcmV2JyxcclxuICAgICAgfSxcclxuICAgICAgY29udHJvbGxlcjoge1xyXG4gICAgICAgICAgY29udHJvbDogZ2FsbGVyeVRodW1icztcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuJCAtPlxyXG4gICAgZ2FsbGVyeVRodW1icyA9IG5ldyBTd2lwZXIoJy5nYWxsZXJ5LXRodW1icycsIHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAxMCxcclxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXHJcbiAgICAgIHNsaWRlc1BlclZpZXc6ICdhdXRvJyxcclxuICAgICAgdG91Y2hSYXRpbzogMC4yLFxyXG4gICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiB0cnVlLFxyXG4gICAgICBjb250cm9sbGVyOiB7XHJcbiAgICAgICAgICBjb250cm9sOiBnYWxsZXJ5VG9wO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiMjI1xyXG5cclxuJCh3aW5kb3cpLmxvYWQgLT5cclxuXHJcbiAgJCgnLnAtc2xpZGVyLWdhbGxlcnknKS5lYWNoICgpIC0+XHJcbiAgICAkKEApLmZpbmQoXCIuZ2FsbGVyeS1pdGVtXCIpLmFkZENsYXNzKCdzd2lwZXItc2xpZGUnKVxyXG4gICAgJChAKS5maW5kKFwiLmdhbGxlcnlcIikuYWRkQ2xhc3MoJ3N3aXBlci13cmFwcGVyJylcclxuICAgIG5ldyBTd2lwZXIoIEAsIHtcclxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxyXG4gICAgICBzcGVlZDogNTAwLFxyXG4gICAgICBhdXRvcGxheTogMjAwMCxcclxuICAgICAgYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2VcclxuICAgIH0pXHJcblxyXG5cclxuXHJcblxyXG4jXHJcbiNcclxuIyBOYXZiYXIgZml4ZWRcclxuIyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiNcclxuXHJcbiQgLT5cclxuICBzdWJOYXZpZ2F0aW9uID0gIG5ldyBTdWJOYXZpZ2F0aW9uICdbZGF0YS1zdWItbmF2aWdhdGlvbl0nLCAnLnAtcGFnZS1jb250ZW50J1xyXG4gIHN1Yk5hdmlnYXRpb24uJGVsZW1lbnQuY2xvbmUodHJ1ZSkuYXBwZW5kVG8gJCAnW2RhdGEtc3ViLW5hdmlnYXRpb24tZml4ZWRdJ1xyXG5cclxuICBuYXZiYXIgPSBuZXcgRml4ZWROYXZiYXIoJ1tkYXRhLWZpeGVkLW5hdmJhcl0nLCAnW2RhdGEtZml4ZWQtYm9keV0nKVxyXG5cclxuICAkKFwiW2RhdGEtc3ViLW5hdmlnYXRpb24tY29udGFpbmVyXVwiKS5lYWNoICgpLT5cclxuICAgIHN1Yk5hdmlnYXRpb24gPSBuZXcgRml4ZWRTdWJOYXZiYXIoJChAKSwgJ2lzLWhpZGRlbicsIG5hdmJhcilcclxuXHJcbiAgLm9uIFwic2V0Q2xhc3NcIiwgKCkgLT5cclxuICAgICQoXCIucC1uYXZiYXJfX3N1Yi1uYXZpZ2F0aW9uXCIpLnNob3coKVxyXG5cclxuICAub24gXCJ1bnNldENsYXNzXCIsICgpIC0+XHJcbiAgICAkKFwiLnAtbmF2YmFyX19zdWItbmF2aWdhdGlvblwiKS5oaWRlKClcclxuXHJcblxyXG5cclxuI1xyXG4jIFNjcm9sbCBBZGQvcmVtb3ZlIENsYXNzLlxyXG4jID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuI1xyXG4kIC0+XHJcbiAgJChcIltkYXRhLXNjcm9sbC1hZGRjbGFzc11cIikuZWFjaCAoKS0+XHJcbiAgICAkdGhpcyA9ICQgQFxyXG4gICAgbmV3IFNjcm9sbEFjdGlvbiAkdGhpcywgJHRoaXMuZGF0YShcInNjcm9sbC1hZGRjbGFzc1wiKVxyXG5cclxuXHJcbiAgJCgnLnAtbmF2YmFyJylcclxuICAub24gXCJzZXRDbGFzc1wiLCAoKSAtPlxyXG4gICAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcblxyXG4gIC5vbiBcInVuc2V0Q2xhc3NcIiwgKCkgLT5cclxuICAgICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbC1jb250ZW50XCIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKVxyXG5cclxuXHJcbiAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsIGlcIikub24gJ2NsaWNrJywgKCkgLT5cclxuICAgICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbC1jb250ZW50XCIpLnRvZ2dsZUNsYXNzKCdpcy1hY3RpdmUnKVxyXG5cclxuXHJcbiAgaWYgJChcIi5wLW5hdmJhcl9zbWFsbFwiKS5sZW5ndGggPiAwXHJcbiAgICAkKFwiLnAtbmF2aWdhdGlvbl9faXRlbV90ZWwtY29udGVudFwiKS5yZW1vdmVDbGFzcygnaXMtYWN0aXZlJylcclxuXHJcbiAgZWxzZVxyXG4gICAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsLWNvbnRlbnRcIikuYWRkQ2xhc3MoJ2lzLWFjdGl2ZScpXHJcblxyXG5cclxuXHJcblxyXG4kIC0+XHJcblxyXG4gICR3aW5kb3cgPSAkKHdpbmRvdyk7XHJcbiAgJHBsYXllciA9ICQoJy5wbGF5ZXInKVxyXG4gICRwbGF5ZXIubWJfWVRQbGF5ZXIoKTtcclxuXHJcblxyXG4gICQoXCIucC1wYWdlLWNvbnRlbnQgdmlkZW9cIikuZWFjaCAoKSAtPlxyXG4gICAgJHRoaXMgPSAkKEApXHJcbiAgICAkd2luZG93Lm9uICdsb2FkIHNjcm9sbCcsID0+XHJcbiAgICAgIGlmICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9Nb2JpbGUvaSkgYW5kICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pb3MvaSkgYW5kICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9hbmRyb2lkL2kpXHJcbiAgICAgICAgdHJpZ2dlck5vZGVQb3NpdGlvbiA9ICR0aGlzLm9mZnNldCgpLnRvcCAtICR3aW5kb3cuaGVpZ2h0KClcclxuICAgICAgICBpZiB0cmlnZ2VyTm9kZVBvc2l0aW9uIDwgJHdpbmRvdy5zY3JvbGxUb3AoKSBhbmQgJHdpbmRvdy5zY3JvbGxUb3AoKSA8ICR0aGlzLm9mZnNldCgpLnRvcCArICR0aGlzLmhlaWdodCgpXHJcbiAgICAgICAgICAkdGhpcy5nZXQoMCkucGxheSgpXHJcbiAgICAgICAgZWxzZVxyXG4gICAgICAgICAgJHRoaXMuZ2V0KDApLnBhdXNlKClcclxuICAgICAgICAgICMkdGhpcy5nZXQoMCkuY3VycmVudFRpbWUgPSAwXHJcblxyXG5cclxuIyAgJChcIltkYXRhLXNjcm9sbC1jbGFzc11cIikuZWFjaCAoKS0+XHJcbiMgICAgJHRoaXMgPSAkKEApXHJcbiMgICAgY2xhc3NEYXRhID0gJHRoaXMuZGF0YShcInNjcm9sbC1jbGFzc1wiKTtcclxuI1xyXG4jICAgICRmaXJzdFZpZXcgPSB0cnVlO1xyXG4jICAgICR3aW5kb3cgPSAkIHdpbmRvdztcclxuI1xyXG4jXHJcbiNcclxuI1xyXG4jICAkKFwiW2RhdGEtc2NyLXJtY2xhc3NdXCIpLmVhY2ggKCktPlxyXG4jICAgICR0aGlzID0gJChAKVxyXG4jICAgIGNsYXNzRGF0YSA9ICR0aGlzLmRhdGEoXCJzY3Itcm1jbGFzc1wiKTtcclxuI1xyXG4jICAgICRmaXJzdFZpZXcgPSB0cnVlO1xyXG4jICAgICR3aW5kb3cgPSAkIHdpbmRvdztcclxuIyAgICAkd2luZG93Lm9uIFwibG9hZCByZXNpemUgc2Nyb2xsXCIsICgpLT5cclxuIyAgICAgIGlmICR3aW5kb3cuaGVpZ2h0KCkgPiAkd2luZG93LnNjcm9sbFRvcCgpICsgJHRoaXMuaGVpZ2h0KClcclxuIyAgICAgICAgdW5sZXNzICRmaXJzdFZpZXdcclxuIyAgICAgICAgICAkZmlyc3RWaWV3ID0gdHJ1ZVxyXG4jICAgICAgICAgICR0aGlzLmFkZENsYXNzKGNsYXNzRGF0YSlcclxuIyAgICAgIGVsc2VcclxuIyAgICAgICAgaWYgJGZpcnN0Vmlld1xyXG4jICAgICAgICAgICRmaXJzdFZpZXcgPSBmYWxzZVxyXG4jICAgICAgICAgICR0aGlzLnJlbW92ZUNsYXNzKGNsYXNzRGF0YSlcclxuIiwiLyoqXG4gKiBCcmlkZ2V0IG1ha2VzIGpRdWVyeSB3aWRnZXRzXG4gKiB2MS4xLjBcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93ICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRlZmluaXRpb24gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZGVmaW5lQnJpZGdldCggJCApIHtcblxuLy8gYmFpbCBpZiBubyBqUXVlcnlcbmlmICggISQgKSB7XG4gIHJldHVybjtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gYWRkT3B0aW9uTWV0aG9kIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogYWRkcyBvcHRpb24gbWV0aG9kIC0+ICQoKS5wbHVnaW4oJ29wdGlvbicsIHsuLi59KVxuICogQHBhcmFtIHtGdW5jdGlvbn0gUGx1Z2luQ2xhc3MgLSBjb25zdHJ1Y3RvciBjbGFzc1xuICovXG5mdW5jdGlvbiBhZGRPcHRpb25NZXRob2QoIFBsdWdpbkNsYXNzICkge1xuICAvLyBkb24ndCBvdmVyd3JpdGUgb3JpZ2luYWwgb3B0aW9uIG1ldGhvZFxuICBpZiAoIFBsdWdpbkNsYXNzLnByb3RvdHlwZS5vcHRpb24gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gb3B0aW9uIHNldHRlclxuICBQbHVnaW5DbGFzcy5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gICAgLy8gYmFpbCBvdXQgaWYgbm90IGFuIG9iamVjdFxuICAgIGlmICggISQuaXNQbGFpbk9iamVjdCggb3B0cyApICl7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB0cnVlLCB0aGlzLm9wdGlvbnMsIG9wdHMgKTtcbiAgfTtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGx1Z2luIGJyaWRnZSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBoZWxwZXIgZnVuY3Rpb24gZm9yIGxvZ2dpbmcgZXJyb3JzXG4vLyAkLmVycm9yIGJyZWFrcyBqUXVlcnkgY2hhaW5pbmdcbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8qKlxuICogalF1ZXJ5IHBsdWdpbiBicmlkZ2UsIGFjY2VzcyBtZXRob2RzIGxpa2UgJGVsZW0ucGx1Z2luKCdtZXRob2QnKVxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSAtIHBsdWdpbiBuYW1lXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBQbHVnaW5DbGFzcyAtIGNvbnN0cnVjdG9yIGNsYXNzXG4gKi9cbmZ1bmN0aW9uIGJyaWRnZSggbmFtZXNwYWNlLCBQbHVnaW5DbGFzcyApIHtcbiAgLy8gYWRkIHRvIGpRdWVyeSBmbiBuYW1lc3BhY2VcbiAgJC5mblsgbmFtZXNwYWNlIF0gPSBmdW5jdGlvbiggb3B0aW9ucyApIHtcbiAgICBpZiAoIHR5cGVvZiBvcHRpb25zID09PSAnc3RyaW5nJyApIHtcbiAgICAgIC8vIGNhbGwgcGx1Z2luIG1ldGhvZCB3aGVuIGZpcnN0IGFyZ3VtZW50IGlzIGEgc3RyaW5nXG4gICAgICAvLyBnZXQgYXJndW1lbnRzIGZvciBtZXRob2RcbiAgICAgIHZhciBhcmdzID0gc2xpY2UuY2FsbCggYXJndW1lbnRzLCAxICk7XG5cbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbiA9IHRoaXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICAgIHZhciBlbGVtID0gdGhpc1tpXTtcbiAgICAgICAgdmFyIGluc3RhbmNlID0gJC5kYXRhKCBlbGVtLCBuYW1lc3BhY2UgKTtcbiAgICAgICAgaWYgKCAhaW5zdGFuY2UgKSB7XG4gICAgICAgICAgbG9nRXJyb3IoIFwiY2Fubm90IGNhbGwgbWV0aG9kcyBvbiBcIiArIG5hbWVzcGFjZSArIFwiIHByaW9yIHRvIGluaXRpYWxpemF0aW9uOyBcIiArXG4gICAgICAgICAgICBcImF0dGVtcHRlZCB0byBjYWxsICdcIiArIG9wdGlvbnMgKyBcIidcIiApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggISQuaXNGdW5jdGlvbiggaW5zdGFuY2Vbb3B0aW9uc10gKSB8fCBvcHRpb25zLmNoYXJBdCgwKSA9PT0gJ18nICkge1xuICAgICAgICAgIGxvZ0Vycm9yKCBcIm5vIHN1Y2ggbWV0aG9kICdcIiArIG9wdGlvbnMgKyBcIicgZm9yIFwiICsgbmFtZXNwYWNlICsgXCIgaW5zdGFuY2VcIiApO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJpZ2dlciBtZXRob2Qgd2l0aCBhcmd1bWVudHNcbiAgICAgICAgdmFyIHJldHVyblZhbHVlID0gaW5zdGFuY2VbIG9wdGlvbnMgXS5hcHBseSggaW5zdGFuY2UsIGFyZ3MgKTtcblxuICAgICAgICAvLyBicmVhayBsb29rIGFuZCByZXR1cm4gZmlyc3QgdmFsdWUgaWYgcHJvdmlkZWRcbiAgICAgICAgaWYgKCByZXR1cm5WYWx1ZSAhPT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgIHJldHVybiByZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gcmV0dXJuIHRoaXMgaWYgbm8gcmV0dXJuIHZhbHVlXG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuZWFjaCggZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBpbnN0YW5jZSA9ICQuZGF0YSggdGhpcywgbmFtZXNwYWNlICk7XG4gICAgICAgIGlmICggaW5zdGFuY2UgKSB7XG4gICAgICAgICAgLy8gYXBwbHkgb3B0aW9ucyAmIGluaXRcbiAgICAgICAgICBpbnN0YW5jZS5vcHRpb24oIG9wdGlvbnMgKTtcbiAgICAgICAgICBpbnN0YW5jZS5faW5pdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGluaXRpYWxpemUgbmV3IGluc3RhbmNlXG4gICAgICAgICAgaW5zdGFuY2UgPSBuZXcgUGx1Z2luQ2xhc3MoIHRoaXMsIG9wdGlvbnMgKTtcbiAgICAgICAgICAkLmRhdGEoIHRoaXMsIG5hbWVzcGFjZSwgaW5zdGFuY2UgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGJyaWRnZXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBjb252ZXJ0cyBhIFByb3RvdHlwaWNhbCBjbGFzcyBpbnRvIGEgcHJvcGVyIGpRdWVyeSBwbHVnaW5cbiAqICAgdGhlIGNsYXNzIG11c3QgaGF2ZSBhIC5faW5pdCBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgLSBwbHVnaW4gbmFtZSwgdXNlZCBpbiAkKCkucGx1Z2luTmFtZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gUGx1Z2luQ2xhc3MgLSBjb25zdHJ1Y3RvciBjbGFzc1xuICovXG4kLmJyaWRnZXQgPSBmdW5jdGlvbiggbmFtZXNwYWNlLCBQbHVnaW5DbGFzcyApIHtcbiAgYWRkT3B0aW9uTWV0aG9kKCBQbHVnaW5DbGFzcyApO1xuICBicmlkZ2UoIG5hbWVzcGFjZSwgUGx1Z2luQ2xhc3MgKTtcbn07XG5cbnJldHVybiAkLmJyaWRnZXQ7XG5cbn1cblxuLy8gdHJhbnNwb3J0XG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgLy8gQU1EXG4gIGRlZmluZSggWyAnanF1ZXJ5JyBdLCBkZWZpbmVCcmlkZ2V0ICk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIGRlZmluZUJyaWRnZXQoIHJlcXVpcmUoJ2pxdWVyeScpICk7XG59IGVsc2Uge1xuICAvLyBnZXQganF1ZXJ5IGZyb20gYnJvd3NlciBnbG9iYWxcbiAgZGVmaW5lQnJpZGdldCggd2luZG93LmpRdWVyeSApO1xufVxuXG59KSggd2luZG93ICk7XG4iLCIvKiFcbiAqIGNsYXNzaWUgdjEuMC4xXG4gKiBjbGFzcyBoZWxwZXIgZnVuY3Rpb25zXG4gKiBmcm9tIGJvbnpvIGh0dHBzOi8vZ2l0aHViLmNvbS9kZWQvYm9uem9cbiAqIE1JVCBsaWNlbnNlXG4gKiBcbiAqIGNsYXNzaWUuaGFzKCBlbGVtLCAnbXktY2xhc3MnICkgLT4gdHJ1ZS9mYWxzZVxuICogY2xhc3NpZS5hZGQoIGVsZW0sICdteS1uZXctY2xhc3MnIClcbiAqIGNsYXNzaWUucmVtb3ZlKCBlbGVtLCAnbXktdW53YW50ZWQtY2xhc3MnIClcbiAqIGNsYXNzaWUudG9nZ2xlKCBlbGVtLCAnbXktY2xhc3MnIClcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggd2luZG93ICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIGNsYXNzIGhlbHBlciBmdW5jdGlvbnMgZnJvbSBib256byBodHRwczovL2dpdGh1Yi5jb20vZGVkL2JvbnpvXG5cbmZ1bmN0aW9uIGNsYXNzUmVnKCBjbGFzc05hbWUgKSB7XG4gIHJldHVybiBuZXcgUmVnRXhwKFwiKF58XFxcXHMrKVwiICsgY2xhc3NOYW1lICsgXCIoXFxcXHMrfCQpXCIpO1xufVxuXG4vLyBjbGFzc0xpc3Qgc3VwcG9ydCBmb3IgY2xhc3MgbWFuYWdlbWVudFxuLy8gYWx0aG8gdG8gYmUgZmFpciwgdGhlIGFwaSBzdWNrcyBiZWNhdXNlIGl0IHdvbid0IGFjY2VwdCBtdWx0aXBsZSBjbGFzc2VzIGF0IG9uY2VcbnZhciBoYXNDbGFzcywgYWRkQ2xhc3MsIHJlbW92ZUNsYXNzO1xuXG5pZiAoICdjbGFzc0xpc3QnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCApIHtcbiAgaGFzQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICByZXR1cm4gZWxlbS5jbGFzc0xpc3QuY29udGFpbnMoIGMgKTtcbiAgfTtcbiAgYWRkQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5hZGQoIGMgKTtcbiAgfTtcbiAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTGlzdC5yZW1vdmUoIGMgKTtcbiAgfTtcbn1cbmVsc2Uge1xuICBoYXNDbGFzcyA9IGZ1bmN0aW9uKCBlbGVtLCBjICkge1xuICAgIHJldHVybiBjbGFzc1JlZyggYyApLnRlc3QoIGVsZW0uY2xhc3NOYW1lICk7XG4gIH07XG4gIGFkZENsYXNzID0gZnVuY3Rpb24oIGVsZW0sIGMgKSB7XG4gICAgaWYgKCAhaGFzQ2xhc3MoIGVsZW0sIGMgKSApIHtcbiAgICAgIGVsZW0uY2xhc3NOYW1lID0gZWxlbS5jbGFzc05hbWUgKyAnICcgKyBjO1xuICAgIH1cbiAgfTtcbiAgcmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbiggZWxlbSwgYyApIHtcbiAgICBlbGVtLmNsYXNzTmFtZSA9IGVsZW0uY2xhc3NOYW1lLnJlcGxhY2UoIGNsYXNzUmVnKCBjICksICcgJyApO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDbGFzcyggZWxlbSwgYyApIHtcbiAgdmFyIGZuID0gaGFzQ2xhc3MoIGVsZW0sIGMgKSA/IHJlbW92ZUNsYXNzIDogYWRkQ2xhc3M7XG4gIGZuKCBlbGVtLCBjICk7XG59XG5cbnZhciBjbGFzc2llID0ge1xuICAvLyBmdWxsIG5hbWVzXG4gIGhhc0NsYXNzOiBoYXNDbGFzcyxcbiAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICByZW1vdmVDbGFzczogcmVtb3ZlQ2xhc3MsXG4gIHRvZ2dsZUNsYXNzOiB0b2dnbGVDbGFzcyxcbiAgLy8gc2hvcnQgbmFtZXNcbiAgaGFzOiBoYXNDbGFzcyxcbiAgYWRkOiBhZGRDbGFzcyxcbiAgcmVtb3ZlOiByZW1vdmVDbGFzcyxcbiAgdG9nZ2xlOiB0b2dnbGVDbGFzc1xufTtcblxuLy8gdHJhbnNwb3J0XG5pZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgLy8gQU1EXG4gIGRlZmluZSggY2xhc3NpZSApO1xufSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuICAvLyBDb21tb25KU1xuICBtb2R1bGUuZXhwb3J0cyA9IGNsYXNzaWU7XG59IGVsc2Uge1xuICAvLyBicm93c2VyIGdsb2JhbFxuICB3aW5kb3cuY2xhc3NpZSA9IGNsYXNzaWU7XG59XG5cbn0pKCB3aW5kb3cgKTtcbiIsIi8qIVxuICogZ2V0U3R5bGVQcm9wZXJ0eSB2MS4wLjRcbiAqIG9yaWdpbmFsIGJ5IGthbmdheFxuICogaHR0cDovL3BlcmZlY3Rpb25raWxscy5jb20vZmVhdHVyZS10ZXN0aW5nLWNzcy1wcm9wZXJ0aWVzL1xuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBleHBvcnRzOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSAqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3cgKSB7XG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHByZWZpeGVzID0gJ1dlYmtpdCBNb3ogbXMgTXMgTycuc3BsaXQoJyAnKTtcbnZhciBkb2NFbGVtU3R5bGUgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGU7XG5cbmZ1bmN0aW9uIGdldFN0eWxlUHJvcGVydHkoIHByb3BOYW1lICkge1xuICBpZiAoICFwcm9wTmFtZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyB0ZXN0IHN0YW5kYXJkIHByb3BlcnR5IGZpcnN0XG4gIGlmICggdHlwZW9mIGRvY0VsZW1TdHlsZVsgcHJvcE5hbWUgXSA9PT0gJ3N0cmluZycgKSB7XG4gICAgcmV0dXJuIHByb3BOYW1lO1xuICB9XG5cbiAgLy8gY2FwaXRhbGl6ZVxuICBwcm9wTmFtZSA9IHByb3BOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcHJvcE5hbWUuc2xpY2UoMSk7XG5cbiAgLy8gdGVzdCB2ZW5kb3Igc3BlY2lmaWMgcHJvcGVydGllc1xuICB2YXIgcHJlZml4ZWQ7XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHByZWZpeGVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHByZWZpeGVkID0gcHJlZml4ZXNbaV0gKyBwcm9wTmFtZTtcbiAgICBpZiAoIHR5cGVvZiBkb2NFbGVtU3R5bGVbIHByZWZpeGVkIF0gPT09ICdzdHJpbmcnICkge1xuICAgICAgcmV0dXJuIHByZWZpeGVkO1xuICAgIH1cbiAgfVxufVxuXG4vLyB0cmFuc3BvcnRcbmlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAvLyBBTURcbiAgZGVmaW5lKCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZ2V0U3R5bGVQcm9wZXJ0eTtcbiAgfSk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIC8vIENvbW1vbkpTIGZvciBDb21wb25lbnRcbiAgbW9kdWxlLmV4cG9ydHMgPSBnZXRTdHlsZVByb3BlcnR5O1xufSBlbHNlIHtcbiAgLy8gYnJvd3NlciBnbG9iYWxcbiAgd2luZG93LmdldFN0eWxlUHJvcGVydHkgPSBnZXRTdHlsZVByb3BlcnR5O1xufVxuXG59KSggd2luZG93ICk7XG4iLCIvKipcbiAqIG1hdGNoZXNTZWxlY3RvciB2MS4wLjNcbiAqIG1hdGNoZXNTZWxlY3RvciggZWxlbWVudCwgJy5zZWxlY3RvcicgKVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCBzdHJpY3Q6IHRydWUsIHVuZGVmOiB0cnVlLCB1bnVzZWQ6IHRydWUgKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIG1vZHVsZTogZmFsc2UgKi9cblxuKCBmdW5jdGlvbiggRWxlbVByb3RvICkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgbWF0Y2hlc01ldGhvZCA9ICggZnVuY3Rpb24oKSB7XG4gICAgLy8gY2hlY2sgZm9yIHRoZSBzdGFuZGFyZCBtZXRob2QgbmFtZSBmaXJzdFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXMgKSB7XG4gICAgICByZXR1cm4gJ21hdGNoZXMnO1xuICAgIH1cbiAgICAvLyBjaGVjayB1bi1wcmVmaXhlZFxuICAgIGlmICggRWxlbVByb3RvLm1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiAnbWF0Y2hlc1NlbGVjdG9yJztcbiAgICB9XG4gICAgLy8gY2hlY2sgdmVuZG9yIHByZWZpeGVzXG4gICAgdmFyIHByZWZpeGVzID0gWyAnd2Via2l0JywgJ21veicsICdtcycsICdvJyBdO1xuXG4gICAgZm9yICggdmFyIGk9MCwgbGVuID0gcHJlZml4ZXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICB2YXIgcHJlZml4ID0gcHJlZml4ZXNbaV07XG4gICAgICB2YXIgbWV0aG9kID0gcHJlZml4ICsgJ01hdGNoZXNTZWxlY3Rvcic7XG4gICAgICBpZiAoIEVsZW1Qcm90b1sgbWV0aG9kIF0gKSB7XG4gICAgICAgIHJldHVybiBtZXRob2Q7XG4gICAgICB9XG4gICAgfVxuICB9KSgpO1xuXG4gIC8vIC0tLS0tIG1hdGNoIC0tLS0tIC8vXG5cbiAgZnVuY3Rpb24gbWF0Y2goIGVsZW0sIHNlbGVjdG9yICkge1xuICAgIHJldHVybiBlbGVtWyBtYXRjaGVzTWV0aG9kIF0oIHNlbGVjdG9yICk7XG4gIH1cblxuICAvLyAtLS0tLSBhcHBlbmRUb0ZyYWdtZW50IC0tLS0tIC8vXG5cbiAgZnVuY3Rpb24gY2hlY2tQYXJlbnQoIGVsZW0gKSB7XG4gICAgLy8gbm90IG5lZWRlZCBpZiBhbHJlYWR5IGhhcyBwYXJlbnRcbiAgICBpZiAoIGVsZW0ucGFyZW50Tm9kZSApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xuICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBlbGVtICk7XG4gIH1cblxuICAvLyAtLS0tLSBxdWVyeSAtLS0tLSAvL1xuXG4gIC8vIGZhbGwgYmFjayB0byB1c2luZyBRU0FcbiAgLy8gdGh4IEBqb25hdGhhbnRuZWFsIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tLzMwNjI5NTVcbiAgZnVuY3Rpb24gcXVlcnkoIGVsZW0sIHNlbGVjdG9yICkge1xuICAgIC8vIGFwcGVuZCB0byBmcmFnbWVudCBpZiBubyBwYXJlbnRcbiAgICBjaGVja1BhcmVudCggZWxlbSApO1xuXG4gICAgLy8gbWF0Y2ggZWxlbSB3aXRoIGFsbCBzZWxlY3RlZCBlbGVtcyBvZiBwYXJlbnRcbiAgICB2YXIgZWxlbXMgPSBlbGVtLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbCggc2VsZWN0b3IgKTtcbiAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICAgIC8vIHJldHVybiB0cnVlIGlmIG1hdGNoXG4gICAgICBpZiAoIGVsZW1zW2ldID09PSBlbGVtICkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gb3RoZXJ3aXNlIHJldHVybiBmYWxzZVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIC0tLS0tIG1hdGNoQ2hpbGQgLS0tLS0gLy9cblxuICBmdW5jdGlvbiBtYXRjaENoaWxkKCBlbGVtLCBzZWxlY3RvciApIHtcbiAgICBjaGVja1BhcmVudCggZWxlbSApO1xuICAgIHJldHVybiBtYXRjaCggZWxlbSwgc2VsZWN0b3IgKTtcbiAgfVxuXG4gIC8vIC0tLS0tIG1hdGNoZXNTZWxlY3RvciAtLS0tLSAvL1xuXG4gIHZhciBtYXRjaGVzU2VsZWN0b3I7XG5cbiAgaWYgKCBtYXRjaGVzTWV0aG9kICkge1xuICAgIC8vIElFOSBzdXBwb3J0cyBtYXRjaGVzU2VsZWN0b3IsIGJ1dCBkb2Vzbid0IHdvcmsgb24gb3JwaGFuZWQgZWxlbXNcbiAgICAvLyBjaGVjayBmb3IgdGhhdFxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgc3VwcG9ydHNPcnBoYW5zID0gbWF0Y2goIGRpdiwgJ2RpdicgKTtcbiAgICBtYXRjaGVzU2VsZWN0b3IgPSBzdXBwb3J0c09ycGhhbnMgPyBtYXRjaCA6IG1hdGNoQ2hpbGQ7XG4gIH0gZWxzZSB7XG4gICAgbWF0Y2hlc1NlbGVjdG9yID0gcXVlcnk7XG4gIH1cblxuICAvLyB0cmFuc3BvcnRcbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBtYXRjaGVzU2VsZWN0b3I7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IG1hdGNoZXNTZWxlY3RvcjtcbiAgfVxuICBlbHNlIHtcbiAgICAvLyBicm93c2VyIGdsb2JhbFxuICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3IgPSBtYXRjaGVzU2VsZWN0b3I7XG4gIH1cblxufSkoIEVsZW1lbnQucHJvdG90eXBlICk7XG4iLCIvKiFcbiAqIGRvY1JlYWR5IHYxLjAuNFxuICogQ3Jvc3MgYnJvd3NlciBET01Db250ZW50TG9hZGVkIGV2ZW50IGVtaXR0ZXJcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZTogZmFsc2UsIHJlcXVpcmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jdW1lbnQgPSB3aW5kb3cuZG9jdW1lbnQ7XG4vLyBjb2xsZWN0aW9uIG9mIGZ1bmN0aW9ucyB0byBiZSB0cmlnZ2VyZWQgb24gcmVhZHlcbnZhciBxdWV1ZSA9IFtdO1xuXG5mdW5jdGlvbiBkb2NSZWFkeSggZm4gKSB7XG4gIC8vIHRocm93IG91dCBub24tZnVuY3Rpb25zXG4gIGlmICggdHlwZW9mIGZuICE9PSAnZnVuY3Rpb24nICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICggZG9jUmVhZHkuaXNSZWFkeSApIHtcbiAgICAvLyByZWFkeSBub3csIGhpdCBpdFxuICAgIGZuKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gcXVldWUgZnVuY3Rpb24gd2hlbiByZWFkeVxuICAgIHF1ZXVlLnB1c2goIGZuICk7XG4gIH1cbn1cblxuZG9jUmVhZHkuaXNSZWFkeSA9IGZhbHNlO1xuXG4vLyB0cmlnZ2VyZWQgb24gdmFyaW91cyBkb2MgcmVhZHkgZXZlbnRzXG5mdW5jdGlvbiBvblJlYWR5KCBldmVudCApIHtcbiAgLy8gYmFpbCBpZiBhbHJlYWR5IHRyaWdnZXJlZCBvciBJRTggZG9jdW1lbnQgaXMgbm90IHJlYWR5IGp1c3QgeWV0XG4gIHZhciBpc0lFOE5vdFJlYWR5ID0gZXZlbnQudHlwZSA9PT0gJ3JlYWR5c3RhdGVjaGFuZ2UnICYmIGRvY3VtZW50LnJlYWR5U3RhdGUgIT09ICdjb21wbGV0ZSc7XG4gIGlmICggZG9jUmVhZHkuaXNSZWFkeSB8fCBpc0lFOE5vdFJlYWR5ICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyaWdnZXIoKTtcbn1cblxuZnVuY3Rpb24gdHJpZ2dlcigpIHtcbiAgZG9jUmVhZHkuaXNSZWFkeSA9IHRydWU7XG4gIC8vIHByb2Nlc3MgcXVldWVcbiAgZm9yICggdmFyIGk9MCwgbGVuID0gcXVldWUubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGZuID0gcXVldWVbaV07XG4gICAgZm4oKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZpbmVEb2NSZWFkeSggZXZlbnRpZSApIHtcbiAgLy8gdHJpZ2dlciByZWFkeSBpZiBwYWdlIGlzIHJlYWR5XG4gIGlmICggZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2NvbXBsZXRlJyApIHtcbiAgICB0cmlnZ2VyKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gbGlzdGVuIGZvciBldmVudHNcbiAgICBldmVudGllLmJpbmQoIGRvY3VtZW50LCAnRE9NQ29udGVudExvYWRlZCcsIG9uUmVhZHkgKTtcbiAgICBldmVudGllLmJpbmQoIGRvY3VtZW50LCAncmVhZHlzdGF0ZWNoYW5nZScsIG9uUmVhZHkgKTtcbiAgICBldmVudGllLmJpbmQoIHdpbmRvdywgJ2xvYWQnLCBvblJlYWR5ICk7XG4gIH1cblxuICByZXR1cm4gZG9jUmVhZHk7XG59XG5cbi8vIHRyYW5zcG9ydFxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gIC8vIEFNRFxuICBkZWZpbmUoIFsgJ2V2ZW50aWUvZXZlbnRpZScgXSwgZGVmaW5lRG9jUmVhZHkgKTtcbn0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyApIHtcbiAgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVEb2NSZWFkeSggcmVxdWlyZSgnZXZlbnRpZScpICk7XG59IGVsc2Uge1xuICAvLyBicm93c2VyIGdsb2JhbFxuICB3aW5kb3cuZG9jUmVhZHkgPSBkZWZpbmVEb2NSZWFkeSggd2luZG93LmV2ZW50aWUgKTtcbn1cblxufSkoIHdpbmRvdyApO1xuIiwiLyohXG4gKiBldmVudGllIHYxLjAuNlxuICogZXZlbnQgYmluZGluZyBoZWxwZXJcbiAqICAgZXZlbnRpZS5iaW5kKCBlbGVtLCAnY2xpY2snLCBteUZuIClcbiAqICAgZXZlbnRpZS51bmJpbmQoIGVsZW0sICdjbGljaycsIG15Rm4gKVxuICogTUlUIGxpY2Vuc2VcbiAqL1xuXG4vKmpzaGludCBicm93c2VyOiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBtb2R1bGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdyApIHtcblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZG9jRWxlbSA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcblxudmFyIGJpbmQgPSBmdW5jdGlvbigpIHt9O1xuXG5mdW5jdGlvbiBnZXRJRUV2ZW50KCBvYmogKSB7XG4gIHZhciBldmVudCA9IHdpbmRvdy5ldmVudDtcbiAgLy8gYWRkIGV2ZW50LnRhcmdldFxuICBldmVudC50YXJnZXQgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudCB8fCBvYmo7XG4gIHJldHVybiBldmVudDtcbn1cblxuaWYgKCBkb2NFbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG4gIGJpbmQgPSBmdW5jdGlvbiggb2JqLCB0eXBlLCBmbiApIHtcbiAgICBvYmouYWRkRXZlbnRMaXN0ZW5lciggdHlwZSwgZm4sIGZhbHNlICk7XG4gIH07XG59IGVsc2UgaWYgKCBkb2NFbGVtLmF0dGFjaEV2ZW50ICkge1xuICBiaW5kID0gZnVuY3Rpb24oIG9iaiwgdHlwZSwgZm4gKSB7XG4gICAgb2JqWyB0eXBlICsgZm4gXSA9IGZuLmhhbmRsZUV2ZW50ID9cbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBnZXRJRUV2ZW50KCBvYmogKTtcbiAgICAgICAgZm4uaGFuZGxlRXZlbnQuY2FsbCggZm4sIGV2ZW50ICk7XG4gICAgICB9IDpcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXZlbnQgPSBnZXRJRUV2ZW50KCBvYmogKTtcbiAgICAgICAgZm4uY2FsbCggb2JqLCBldmVudCApO1xuICAgICAgfTtcbiAgICBvYmouYXR0YWNoRXZlbnQoIFwib25cIiArIHR5cGUsIG9ialsgdHlwZSArIGZuIF0gKTtcbiAgfTtcbn1cblxudmFyIHVuYmluZCA9IGZ1bmN0aW9uKCkge307XG5cbmlmICggZG9jRWxlbS5yZW1vdmVFdmVudExpc3RlbmVyICkge1xuICB1bmJpbmQgPSBmdW5jdGlvbiggb2JqLCB0eXBlLCBmbiApIHtcbiAgICBvYmoucmVtb3ZlRXZlbnRMaXN0ZW5lciggdHlwZSwgZm4sIGZhbHNlICk7XG4gIH07XG59IGVsc2UgaWYgKCBkb2NFbGVtLmRldGFjaEV2ZW50ICkge1xuICB1bmJpbmQgPSBmdW5jdGlvbiggb2JqLCB0eXBlLCBmbiApIHtcbiAgICBvYmouZGV0YWNoRXZlbnQoIFwib25cIiArIHR5cGUsIG9ialsgdHlwZSArIGZuIF0gKTtcbiAgICB0cnkge1xuICAgICAgZGVsZXRlIG9ialsgdHlwZSArIGZuIF07XG4gICAgfSBjYXRjaCAoIGVyciApIHtcbiAgICAgIC8vIGNhbid0IGRlbGV0ZSB3aW5kb3cgb2JqZWN0IHByb3BlcnRpZXNcbiAgICAgIG9ialsgdHlwZSArIGZuIF0gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9O1xufVxuXG52YXIgZXZlbnRpZSA9IHtcbiAgYmluZDogYmluZCxcbiAgdW5iaW5kOiB1bmJpbmRcbn07XG5cbi8vIC0tLS0tIG1vZHVsZSBkZWZpbml0aW9uIC0tLS0tIC8vXG5cbmlmICggdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAvLyBBTURcbiAgZGVmaW5lKCBldmVudGllICk7XG59IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgKSB7XG4gIC8vIENvbW1vbkpTXG4gIG1vZHVsZS5leHBvcnRzID0gZXZlbnRpZTtcbn0gZWxzZSB7XG4gIC8vIGJyb3dzZXIgZ2xvYmFsXG4gIHdpbmRvdy5ldmVudGllID0gZXZlbnRpZTtcbn1cblxufSkoIHdpbmRvdyApO1xuIiwiLyoqXG4gKiBGaXp6eSBVSSB1dGlscyB2MS4wLjFcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgdW5kZWY6IHRydWUsIHVudXNlZDogdHJ1ZSwgc3RyaWN0OiB0cnVlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgZmFjdG9yeSApIHtcbiAgLypnbG9iYWwgZGVmaW5lOiBmYWxzZSwgbW9kdWxlOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UgKi9cbiAgJ3VzZSBzdHJpY3QnO1xuICAvLyB1bml2ZXJzYWwgbW9kdWxlIGRlZmluaXRpb25cblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgJ2RvYy1yZWFkeS9kb2MtcmVhZHknLFxuICAgICAgJ21hdGNoZXMtc2VsZWN0b3IvbWF0Y2hlcy1zZWxlY3RvcidcbiAgICBdLCBmdW5jdGlvbiggZG9jUmVhZHksIG1hdGNoZXNTZWxlY3RvciApIHtcbiAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGRvY1JlYWR5LCBtYXRjaGVzU2VsZWN0b3IgKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCdkb2MtcmVhZHknKSxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLW1hdGNoZXMtc2VsZWN0b3InKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuZml6enlVSVV0aWxzID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5kb2NSZWFkeSxcbiAgICAgIHdpbmRvdy5tYXRjaGVzU2VsZWN0b3JcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBkb2NSZWFkeSwgbWF0Y2hlc1NlbGVjdG9yICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHt9O1xuXG4vLyAtLS0tLSBleHRlbmQgLS0tLS0gLy9cblxuLy8gZXh0ZW5kcyBvYmplY3RzXG51dGlscy5leHRlbmQgPSBmdW5jdGlvbiggYSwgYiApIHtcbiAgZm9yICggdmFyIHByb3AgaW4gYiApIHtcbiAgICBhWyBwcm9wIF0gPSBiWyBwcm9wIF07XG4gIH1cbiAgcmV0dXJuIGE7XG59O1xuXG4vLyAtLS0tLSBtb2R1bG8gLS0tLS0gLy9cblxudXRpbHMubW9kdWxvID0gZnVuY3Rpb24oIG51bSwgZGl2ICkge1xuICByZXR1cm4gKCAoIG51bSAlIGRpdiApICsgZGl2ICkgJSBkaXY7XG59O1xuXG4vLyAtLS0tLSBpc0FycmF5IC0tLS0tIC8vXG4gIFxudmFyIG9ialRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbnV0aWxzLmlzQXJyYXkgPSBmdW5jdGlvbiggb2JqICkge1xuICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCggb2JqICkgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cbi8vIC0tLS0tIG1ha2VBcnJheSAtLS0tLSAvL1xuXG4vLyB0dXJuIGVsZW1lbnQgb3Igbm9kZUxpc3QgaW50byBhbiBhcnJheVxudXRpbHMubWFrZUFycmF5ID0gZnVuY3Rpb24oIG9iaiApIHtcbiAgdmFyIGFyeSA9IFtdO1xuICBpZiAoIHV0aWxzLmlzQXJyYXkoIG9iaiApICkge1xuICAgIC8vIHVzZSBvYmplY3QgaWYgYWxyZWFkeSBhbiBhcnJheVxuICAgIGFyeSA9IG9iajtcbiAgfSBlbHNlIGlmICggb2JqICYmIHR5cGVvZiBvYmoubGVuZ3RoID09ICdudW1iZXInICkge1xuICAgIC8vIGNvbnZlcnQgbm9kZUxpc3QgdG8gYXJyYXlcbiAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBvYmoubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICBhcnkucHVzaCggb2JqW2ldICk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGFycmF5IG9mIHNpbmdsZSBpbmRleFxuICAgIGFyeS5wdXNoKCBvYmogKTtcbiAgfVxuICByZXR1cm4gYXJ5O1xufTtcblxuLy8gLS0tLS0gaW5kZXhPZiAtLS0tLSAvL1xuXG4vLyBpbmRleCBvZiBoZWxwZXIgY2F1c2UgSUU4XG51dGlscy5pbmRleE9mID0gQXJyYXkucHJvdG90eXBlLmluZGV4T2YgPyBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gICAgcmV0dXJuIGFyeS5pbmRleE9mKCBvYmogKTtcbiAgfSA6IGZ1bmN0aW9uKCBhcnksIG9iaiApIHtcbiAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBhcnkubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICBpZiAoIGFyeVtpXSA9PT0gb2JqICkge1xuICAgICAgICByZXR1cm4gaTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIC0xO1xuICB9O1xuXG4vLyAtLS0tLSByZW1vdmVGcm9tIC0tLS0tIC8vXG5cbnV0aWxzLnJlbW92ZUZyb20gPSBmdW5jdGlvbiggYXJ5LCBvYmogKSB7XG4gIHZhciBpbmRleCA9IHV0aWxzLmluZGV4T2YoIGFyeSwgb2JqICk7XG4gIGlmICggaW5kZXggIT0gLTEgKSB7XG4gICAgYXJ5LnNwbGljZSggaW5kZXgsIDEgKTtcbiAgfVxufTtcblxuLy8gLS0tLS0gaXNFbGVtZW50IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM4NDM4MC8xODIxODNcbnV0aWxzLmlzRWxlbWVudCA9ICggdHlwZW9mIEhUTUxFbGVtZW50ID09ICdmdW5jdGlvbicgfHwgdHlwZW9mIEhUTUxFbGVtZW50ID09ICdvYmplY3QnICkgP1xuICBmdW5jdGlvbiBpc0VsZW1lbnRET00yKCBvYmogKSB7XG4gICAgcmV0dXJuIG9iaiBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICB9IDpcbiAgZnVuY3Rpb24gaXNFbGVtZW50UXVpcmt5KCBvYmogKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09ICdvYmplY3QnICYmXG4gICAgICBvYmoubm9kZVR5cGUgPT0gMSAmJiB0eXBlb2Ygb2JqLm5vZGVOYW1lID09ICdzdHJpbmcnO1xuICB9O1xuXG4vLyAtLS0tLSBzZXRUZXh0IC0tLS0tIC8vXG5cbnV0aWxzLnNldFRleHQgPSAoIGZ1bmN0aW9uKCkge1xuICB2YXIgc2V0VGV4dFByb3BlcnR5O1xuICBmdW5jdGlvbiBzZXRUZXh0KCBlbGVtLCB0ZXh0ICkge1xuICAgIC8vIG9ubHkgY2hlY2sgc2V0VGV4dFByb3BlcnR5IG9uY2VcbiAgICBzZXRUZXh0UHJvcGVydHkgPSBzZXRUZXh0UHJvcGVydHkgfHwgKCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQudGV4dENvbnRlbnQgIT09IHVuZGVmaW5lZCA/ICd0ZXh0Q29udGVudCcgOiAnaW5uZXJUZXh0JyApO1xuICAgIGVsZW1bIHNldFRleHRQcm9wZXJ0eSBdID0gdGV4dDtcbiAgfVxuICByZXR1cm4gc2V0VGV4dDtcbn0pKCk7XG5cbi8vIC0tLS0tIGdldFBhcmVudCAtLS0tLSAvL1xuXG51dGlscy5nZXRQYXJlbnQgPSBmdW5jdGlvbiggZWxlbSwgc2VsZWN0b3IgKSB7XG4gIHdoaWxlICggZWxlbSAhPSBkb2N1bWVudC5ib2R5ICkge1xuICAgIGVsZW0gPSBlbGVtLnBhcmVudE5vZGU7XG4gICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICByZXR1cm4gZWxlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tIGdldFF1ZXJ5RWxlbWVudCAtLS0tLSAvL1xuXG4vLyB1c2UgZWxlbWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbnV0aWxzLmdldFF1ZXJ5RWxlbWVudCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBpZiAoIHR5cGVvZiBlbGVtID09ICdzdHJpbmcnICkge1xuICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cbiAgcmV0dXJuIGVsZW07XG59O1xuXG4vLyAtLS0tLSBoYW5kbGVFdmVudCAtLS0tLSAvL1xuXG4vLyBlbmFibGUgLm9udHlwZSB0byB0cmlnZ2VyIGZyb20gLmFkZEV2ZW50TGlzdGVuZXIoIGVsZW0sICd0eXBlJyApXG51dGlscy5oYW5kbGVFdmVudCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdmFyIG1ldGhvZCA9ICdvbicgKyBldmVudC50eXBlO1xuICBpZiAoIHRoaXNbIG1ldGhvZCBdICkge1xuICAgIHRoaXNbIG1ldGhvZCBdKCBldmVudCApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBmaWx0ZXJGaW5kRWxlbWVudHMgLS0tLS0gLy9cblxudXRpbHMuZmlsdGVyRmluZEVsZW1lbnRzID0gZnVuY3Rpb24oIGVsZW1zLCBzZWxlY3RvciApIHtcbiAgLy8gbWFrZSBhcnJheSBvZiBlbGVtc1xuICBlbGVtcyA9IHV0aWxzLm1ha2VBcnJheSggZWxlbXMgKTtcbiAgdmFyIGZmRWxlbXMgPSBbXTtcblxuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgIC8vIGNoZWNrIHRoYXQgZWxlbSBpcyBhbiBhY3R1YWwgZWxlbWVudFxuICAgIGlmICggIXV0aWxzLmlzRWxlbWVudCggZWxlbSApICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIC8vIGZpbHRlciAmIGZpbmQgaXRlbXMgaWYgd2UgaGF2ZSBhIHNlbGVjdG9yXG4gICAgaWYgKCBzZWxlY3RvciApIHtcbiAgICAgIC8vIGZpbHRlciBzaWJsaW5nc1xuICAgICAgaWYgKCBtYXRjaGVzU2VsZWN0b3IoIGVsZW0sIHNlbGVjdG9yICkgKSB7XG4gICAgICAgIGZmRWxlbXMucHVzaCggZWxlbSApO1xuICAgICAgfVxuICAgICAgLy8gZmluZCBjaGlsZHJlblxuICAgICAgdmFyIGNoaWxkRWxlbXMgPSBlbGVtLnF1ZXJ5U2VsZWN0b3JBbGwoIHNlbGVjdG9yICk7XG4gICAgICAvLyBjb25jYXQgY2hpbGRFbGVtcyB0byBmaWx0ZXJGb3VuZCBhcnJheVxuICAgICAgZm9yICggdmFyIGo9MCwgakxlbiA9IGNoaWxkRWxlbXMubGVuZ3RoOyBqIDwgakxlbjsgaisrICkge1xuICAgICAgICBmZkVsZW1zLnB1c2goIGNoaWxkRWxlbXNbal0gKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZmZFbGVtcy5wdXNoKCBlbGVtICk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZmRWxlbXM7XG59O1xuXG4vLyAtLS0tLSBkZWJvdW5jZU1ldGhvZCAtLS0tLSAvL1xuXG51dGlscy5kZWJvdW5jZU1ldGhvZCA9IGZ1bmN0aW9uKCBfY2xhc3MsIG1ldGhvZE5hbWUsIHRocmVzaG9sZCApIHtcbiAgLy8gb3JpZ2luYWwgbWV0aG9kXG4gIHZhciBtZXRob2QgPSBfY2xhc3MucHJvdG90eXBlWyBtZXRob2ROYW1lIF07XG4gIHZhciB0aW1lb3V0TmFtZSA9IG1ldGhvZE5hbWUgKyAnVGltZW91dCc7XG5cbiAgX2NsYXNzLnByb3RvdHlwZVsgbWV0aG9kTmFtZSBdID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHRpbWVvdXQgPSB0aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIGlmICggdGltZW91dCApIHtcbiAgICAgIGNsZWFyVGltZW91dCggdGltZW91dCApO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdGhpc1sgdGltZW91dE5hbWUgXSA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCkge1xuICAgICAgbWV0aG9kLmFwcGx5KCBfdGhpcywgYXJncyApO1xuICAgICAgZGVsZXRlIF90aGlzWyB0aW1lb3V0TmFtZSBdO1xuICAgIH0sIHRocmVzaG9sZCB8fCAxMDAgKTtcbiAgfTtcbn07XG5cbi8vIC0tLS0tIGh0bWxJbml0IC0tLS0tIC8vXG5cbi8vIGh0dHA6Ly9qYW1lc3JvYmVydHMubmFtZS9ibG9nLzIwMTAvMDIvMjIvc3RyaW5nLWZ1bmN0aW9ucy1mb3ItamF2YXNjcmlwdC10cmltLXRvLWNhbWVsLWNhc2UtdG8tZGFzaGVkLWFuZC10by11bmRlcnNjb3JlL1xudXRpbHMudG9EYXNoZWQgPSBmdW5jdGlvbiggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oLikoW0EtWl0pL2csIGZ1bmN0aW9uKCBtYXRjaCwgJDEsICQyICkge1xuICAgIHJldHVybiAkMSArICctJyArICQyO1xuICB9KS50b0xvd2VyQ2FzZSgpO1xufTtcblxudmFyIGNvbnNvbGUgPSB3aW5kb3cuY29uc29sZTtcbi8qKlxuICogYWxsb3cgdXNlciB0byBpbml0aWFsaXplIGNsYXNzZXMgdmlhIC5qcy1uYW1lc3BhY2UgY2xhc3NcbiAqIGh0bWxJbml0KCBXaWRnZXQsICd3aWRnZXROYW1lJyApXG4gKiBvcHRpb25zIGFyZSBwYXJzZWQgZnJvbSBkYXRhLW5hbWVzcGFjZS1vcHRpb24gYXR0cmlidXRlXG4gKi9cbnV0aWxzLmh0bWxJbml0ID0gZnVuY3Rpb24oIFdpZGdldENsYXNzLCBuYW1lc3BhY2UgKSB7XG4gIGRvY1JlYWR5KCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZGFzaGVkTmFtZXNwYWNlID0gdXRpbHMudG9EYXNoZWQoIG5hbWVzcGFjZSApO1xuICAgIHZhciBlbGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoICcuanMtJyArIGRhc2hlZE5hbWVzcGFjZSApO1xuICAgIHZhciBkYXRhQXR0ciA9ICdkYXRhLScgKyBkYXNoZWROYW1lc3BhY2UgKyAnLW9wdGlvbnMnO1xuXG4gICAgZm9yICggdmFyIGk9MCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgICAgdmFyIGF0dHIgPSBlbGVtLmdldEF0dHJpYnV0ZSggZGF0YUF0dHIgKTtcbiAgICAgIHZhciBvcHRpb25zO1xuICAgICAgdHJ5IHtcbiAgICAgICAgb3B0aW9ucyA9IGF0dHIgJiYgSlNPTi5wYXJzZSggYXR0ciApO1xuICAgICAgfSBjYXRjaCAoIGVycm9yICkge1xuICAgICAgICAvLyBsb2cgZXJyb3IsIGRvIG5vdCBpbml0aWFsaXplXG4gICAgICAgIGlmICggY29uc29sZSApIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCAnRXJyb3IgcGFyc2luZyAnICsgZGF0YUF0dHIgKyAnIG9uICcgK1xuICAgICAgICAgICAgZWxlbS5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpICsgKCBlbGVtLmlkID8gJyMnICsgZWxlbS5pZCA6ICcnICkgKyAnOiAnICtcbiAgICAgICAgICAgIGVycm9yICk7XG4gICAgICAgIH1cbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBpbml0aWFsaXplXG4gICAgICB2YXIgaW5zdGFuY2UgPSBuZXcgV2lkZ2V0Q2xhc3MoIGVsZW0sIG9wdGlvbnMgKTtcbiAgICAgIC8vIG1ha2UgYXZhaWxhYmxlIHZpYSAkKCkuZGF0YSgnbGF5b3V0bmFtZScpXG4gICAgICB2YXIgalF1ZXJ5ID0gd2luZG93LmpRdWVyeTtcbiAgICAgIGlmICggalF1ZXJ5ICkge1xuICAgICAgICBqUXVlcnkuZGF0YSggZWxlbSwgbmFtZXNwYWNlLCBpbnN0YW5jZSApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxucmV0dXJuIHV0aWxzO1xuXG59KSk7XG4iLCIvKiFcbiAqIGdldFNpemUgdjEuMi4yXG4gKiBtZWFzdXJlIHNpemUgb2YgZWxlbWVudHNcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuLypqc2hpbnQgYnJvd3NlcjogdHJ1ZSwgc3RyaWN0OiB0cnVlLCB1bmRlZjogdHJ1ZSwgdW51c2VkOiB0cnVlICovXG4vKmdsb2JhbCBkZWZpbmU6IGZhbHNlLCBleHBvcnRzOiBmYWxzZSwgcmVxdWlyZTogZmFsc2UsIG1vZHVsZTogZmFsc2UsIGNvbnNvbGU6IGZhbHNlICovXG5cbiggZnVuY3Rpb24oIHdpbmRvdywgdW5kZWZpbmVkICkge1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGhlbHBlcnMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZ2V0IGEgbnVtYmVyIGZyb20gYSBzdHJpbmcsIG5vdCBhIHBlcmNlbnRhZ2VcbmZ1bmN0aW9uIGdldFN0eWxlU2l6ZSggdmFsdWUgKSB7XG4gIHZhciBudW0gPSBwYXJzZUZsb2F0KCB2YWx1ZSApO1xuICAvLyBub3QgYSBwZXJjZW50IGxpa2UgJzEwMCUnLCBhbmQgYSBudW1iZXJcbiAgdmFyIGlzVmFsaWQgPSB2YWx1ZS5pbmRleE9mKCclJykgPT09IC0xICYmICFpc05hTiggbnVtICk7XG4gIHJldHVybiBpc1ZhbGlkICYmIG51bTtcbn1cblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnZhciBsb2dFcnJvciA9IHR5cGVvZiBjb25zb2xlID09PSAndW5kZWZpbmVkJyA/IG5vb3AgOlxuICBmdW5jdGlvbiggbWVzc2FnZSApIHtcbiAgICBjb25zb2xlLmVycm9yKCBtZXNzYWdlICk7XG4gIH07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1lYXN1cmVtZW50cyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgbWVhc3VyZW1lbnRzID0gW1xuICAncGFkZGluZ0xlZnQnLFxuICAncGFkZGluZ1JpZ2h0JyxcbiAgJ3BhZGRpbmdUb3AnLFxuICAncGFkZGluZ0JvdHRvbScsXG4gICdtYXJnaW5MZWZ0JyxcbiAgJ21hcmdpblJpZ2h0JyxcbiAgJ21hcmdpblRvcCcsXG4gICdtYXJnaW5Cb3R0b20nLFxuICAnYm9yZGVyTGVmdFdpZHRoJyxcbiAgJ2JvcmRlclJpZ2h0V2lkdGgnLFxuICAnYm9yZGVyVG9wV2lkdGgnLFxuICAnYm9yZGVyQm90dG9tV2lkdGgnXG5dO1xuXG5mdW5jdGlvbiBnZXRaZXJvU2l6ZSgpIHtcbiAgdmFyIHNpemUgPSB7XG4gICAgd2lkdGg6IDAsXG4gICAgaGVpZ2h0OiAwLFxuICAgIGlubmVyV2lkdGg6IDAsXG4gICAgaW5uZXJIZWlnaHQ6IDAsXG4gICAgb3V0ZXJXaWR0aDogMCxcbiAgICBvdXRlckhlaWdodDogMFxuICB9O1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBtZWFzdXJlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHNpemVbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9XG4gIHJldHVybiBzaXplO1xufVxuXG5cblxuZnVuY3Rpb24gZGVmaW5lR2V0U2l6ZSggZ2V0U3R5bGVQcm9wZXJ0eSApIHtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc2V0dXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIGlzU2V0dXAgPSBmYWxzZTtcblxudmFyIGdldFN0eWxlLCBib3hTaXppbmdQcm9wLCBpc0JveFNpemVPdXRlcjtcblxuLyoqXG4gKiBzZXR1cCB2YXJzIGFuZCBmdW5jdGlvbnNcbiAqIGRvIGl0IG9uIGluaXRpYWwgZ2V0U2l6ZSgpLCByYXRoZXIgdGhhbiBvbiBzY3JpcHQgbG9hZFxuICogRm9yIEZpcmVmb3ggYnVnIGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTU0ODM5N1xuICovXG5mdW5jdGlvbiBzZXR1cCgpIHtcbiAgLy8gc2V0dXAgb25jZVxuICBpZiAoIGlzU2V0dXAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlzU2V0dXAgPSB0cnVlO1xuXG4gIHZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG4gIGdldFN0eWxlID0gKCBmdW5jdGlvbigpIHtcbiAgICB2YXIgZ2V0U3R5bGVGbiA9IGdldENvbXB1dGVkU3R5bGUgP1xuICAgICAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgICAgIHJldHVybiBnZXRDb21wdXRlZFN0eWxlKCBlbGVtLCBudWxsICk7XG4gICAgICB9IDpcbiAgICAgIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgICAgICByZXR1cm4gZWxlbS5jdXJyZW50U3R5bGU7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0U3R5bGUoIGVsZW0gKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGdldFN0eWxlRm4oIGVsZW0gKTtcbiAgICAgICAgaWYgKCAhc3R5bGUgKSB7XG4gICAgICAgICAgbG9nRXJyb3IoICdTdHlsZSByZXR1cm5lZCAnICsgc3R5bGUgK1xuICAgICAgICAgICAgJy4gQXJlIHlvdSBydW5uaW5nIHRoaXMgY29kZSBpbiBhIGhpZGRlbiBpZnJhbWUgb24gRmlyZWZveD8gJyArXG4gICAgICAgICAgICAnU2VlIGh0dHA6Ly9iaXQubHkvZ2V0c2l6ZWJ1ZzEnICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlO1xuICAgICAgfTtcbiAgfSkoKTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBib3ggc2l6aW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgYm94U2l6aW5nUHJvcCA9IGdldFN0eWxlUHJvcGVydHkoJ2JveFNpemluZycpO1xuXG4gIC8qKlxuICAgKiBXZWJLaXQgbWVhc3VyZXMgdGhlIG91dGVyLXdpZHRoIG9uIHN0eWxlLndpZHRoIG9uIGJvcmRlci1ib3ggZWxlbXNcbiAgICogSUUgJiBGaXJlZm94IG1lYXN1cmVzIHRoZSBpbm5lci13aWR0aFxuICAgKi9cbiAgaWYgKCBib3hTaXppbmdQcm9wICkge1xuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuc3R5bGUud2lkdGggPSAnMjAwcHgnO1xuICAgIGRpdi5zdHlsZS5wYWRkaW5nID0gJzFweCAycHggM3B4IDRweCc7XG4gICAgZGl2LnN0eWxlLmJvcmRlclN0eWxlID0gJ3NvbGlkJztcbiAgICBkaXYuc3R5bGUuYm9yZGVyV2lkdGggPSAnMXB4IDJweCAzcHggNHB4JztcbiAgICBkaXYuc3R5bGVbIGJveFNpemluZ1Byb3AgXSA9ICdib3JkZXItYm94JztcblxuICAgIHZhciBib2R5ID0gZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgYm9keS5hcHBlbmRDaGlsZCggZGl2ICk7XG4gICAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoIGRpdiApO1xuXG4gICAgaXNCb3hTaXplT3V0ZXIgPSBnZXRTdHlsZVNpemUoIHN0eWxlLndpZHRoICkgPT09IDIwMDtcbiAgICBib2R5LnJlbW92ZUNoaWxkKCBkaXYgKTtcbiAgfVxuXG59XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGdldFNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuZnVuY3Rpb24gZ2V0U2l6ZSggZWxlbSApIHtcbiAgc2V0dXAoKTtcblxuICAvLyB1c2UgcXVlcnlTZWxldG9yIGlmIGVsZW0gaXMgc3RyaW5nXG4gIGlmICggdHlwZW9mIGVsZW0gPT09ICdzdHJpbmcnICkge1xuICAgIGVsZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCBlbGVtICk7XG4gIH1cblxuICAvLyBkbyBub3QgcHJvY2VlZCBvbiBub24tb2JqZWN0c1xuICBpZiAoICFlbGVtIHx8IHR5cGVvZiBlbGVtICE9PSAnb2JqZWN0JyB8fCAhZWxlbS5ub2RlVHlwZSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgc3R5bGUgPSBnZXRTdHlsZSggZWxlbSApO1xuXG4gIC8vIGlmIGhpZGRlbiwgZXZlcnl0aGluZyBpcyAwXG4gIGlmICggc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnICkge1xuICAgIHJldHVybiBnZXRaZXJvU2l6ZSgpO1xuICB9XG5cbiAgdmFyIHNpemUgPSB7fTtcbiAgc2l6ZS53aWR0aCA9IGVsZW0ub2Zmc2V0V2lkdGg7XG4gIHNpemUuaGVpZ2h0ID0gZWxlbS5vZmZzZXRIZWlnaHQ7XG5cbiAgdmFyIGlzQm9yZGVyQm94ID0gc2l6ZS5pc0JvcmRlckJveCA9ICEhKCBib3hTaXppbmdQcm9wICYmXG4gICAgc3R5bGVbIGJveFNpemluZ1Byb3AgXSAmJiBzdHlsZVsgYm94U2l6aW5nUHJvcCBdID09PSAnYm9yZGVyLWJveCcgKTtcblxuICAvLyBnZXQgYWxsIG1lYXN1cmVtZW50c1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBtZWFzdXJlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIG1lYXN1cmVtZW50ID0gbWVhc3VyZW1lbnRzW2ldO1xuICAgIHZhciB2YWx1ZSA9IHN0eWxlWyBtZWFzdXJlbWVudCBdO1xuICAgIHZhbHVlID0gbXVuZ2VOb25QaXhlbCggZWxlbSwgdmFsdWUgKTtcbiAgICB2YXIgbnVtID0gcGFyc2VGbG9hdCggdmFsdWUgKTtcbiAgICAvLyBhbnkgJ2F1dG8nLCAnbWVkaXVtJyB2YWx1ZSB3aWxsIGJlIDBcbiAgICBzaXplWyBtZWFzdXJlbWVudCBdID0gIWlzTmFOKCBudW0gKSA/IG51bSA6IDA7XG4gIH1cblxuICB2YXIgcGFkZGluZ1dpZHRoID0gc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUucGFkZGluZ1JpZ2h0O1xuICB2YXIgcGFkZGluZ0hlaWdodCA9IHNpemUucGFkZGluZ1RvcCArIHNpemUucGFkZGluZ0JvdHRvbTtcbiAgdmFyIG1hcmdpbldpZHRoID0gc2l6ZS5tYXJnaW5MZWZ0ICsgc2l6ZS5tYXJnaW5SaWdodDtcbiAgdmFyIG1hcmdpbkhlaWdodCA9IHNpemUubWFyZ2luVG9wICsgc2l6ZS5tYXJnaW5Cb3R0b207XG4gIHZhciBib3JkZXJXaWR0aCA9IHNpemUuYm9yZGVyTGVmdFdpZHRoICsgc2l6ZS5ib3JkZXJSaWdodFdpZHRoO1xuICB2YXIgYm9yZGVySGVpZ2h0ID0gc2l6ZS5ib3JkZXJUb3BXaWR0aCArIHNpemUuYm9yZGVyQm90dG9tV2lkdGg7XG5cbiAgdmFyIGlzQm9yZGVyQm94U2l6ZU91dGVyID0gaXNCb3JkZXJCb3ggJiYgaXNCb3hTaXplT3V0ZXI7XG5cbiAgLy8gb3ZlcndyaXRlIHdpZHRoIGFuZCBoZWlnaHQgaWYgd2UgY2FuIGdldCBpdCBmcm9tIHN0eWxlXG4gIHZhciBzdHlsZVdpZHRoID0gZ2V0U3R5bGVTaXplKCBzdHlsZS53aWR0aCApO1xuICBpZiAoIHN0eWxlV2lkdGggIT09IGZhbHNlICkge1xuICAgIHNpemUud2lkdGggPSBzdHlsZVdpZHRoICtcbiAgICAgIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgdW5sZXNzIGl0J3MgYWxyZWFkeSBpbmNsdWRpbmcgaXRcbiAgICAgICggaXNCb3JkZXJCb3hTaXplT3V0ZXIgPyAwIDogcGFkZGluZ1dpZHRoICsgYm9yZGVyV2lkdGggKTtcbiAgfVxuXG4gIHZhciBzdHlsZUhlaWdodCA9IGdldFN0eWxlU2l6ZSggc3R5bGUuaGVpZ2h0ICk7XG4gIGlmICggc3R5bGVIZWlnaHQgIT09IGZhbHNlICkge1xuICAgIHNpemUuaGVpZ2h0ID0gc3R5bGVIZWlnaHQgK1xuICAgICAgLy8gYWRkIHBhZGRpbmcgYW5kIGJvcmRlciB1bmxlc3MgaXQncyBhbHJlYWR5IGluY2x1ZGluZyBpdFxuICAgICAgKCBpc0JvcmRlckJveFNpemVPdXRlciA/IDAgOiBwYWRkaW5nSGVpZ2h0ICsgYm9yZGVySGVpZ2h0ICk7XG4gIH1cblxuICBzaXplLmlubmVyV2lkdGggPSBzaXplLndpZHRoIC0gKCBwYWRkaW5nV2lkdGggKyBib3JkZXJXaWR0aCApO1xuICBzaXplLmlubmVySGVpZ2h0ID0gc2l6ZS5oZWlnaHQgLSAoIHBhZGRpbmdIZWlnaHQgKyBib3JkZXJIZWlnaHQgKTtcblxuICBzaXplLm91dGVyV2lkdGggPSBzaXplLndpZHRoICsgbWFyZ2luV2lkdGg7XG4gIHNpemUub3V0ZXJIZWlnaHQgPSBzaXplLmhlaWdodCArIG1hcmdpbkhlaWdodDtcblxuICByZXR1cm4gc2l6ZTtcbn1cblxuLy8gSUU4IHJldHVybnMgcGVyY2VudCB2YWx1ZXMsIG5vdCBwaXhlbHNcbi8vIHRha2VuIGZyb20galF1ZXJ5J3MgY3VyQ1NTXG5mdW5jdGlvbiBtdW5nZU5vblBpeGVsKCBlbGVtLCB2YWx1ZSApIHtcbiAgLy8gSUU4IGFuZCBoYXMgcGVyY2VudCB2YWx1ZVxuICBpZiAoIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlIHx8IHZhbHVlLmluZGV4T2YoJyUnKSA9PT0gLTEgKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBzdHlsZSA9IGVsZW0uc3R5bGU7XG4gIC8vIFJlbWVtYmVyIHRoZSBvcmlnaW5hbCB2YWx1ZXNcbiAgdmFyIGxlZnQgPSBzdHlsZS5sZWZ0O1xuICB2YXIgcnMgPSBlbGVtLnJ1bnRpbWVTdHlsZTtcbiAgdmFyIHJzTGVmdCA9IHJzICYmIHJzLmxlZnQ7XG5cbiAgLy8gUHV0IGluIHRoZSBuZXcgdmFsdWVzIHRvIGdldCBhIGNvbXB1dGVkIHZhbHVlIG91dFxuICBpZiAoIHJzTGVmdCApIHtcbiAgICBycy5sZWZ0ID0gZWxlbS5jdXJyZW50U3R5bGUubGVmdDtcbiAgfVxuICBzdHlsZS5sZWZ0ID0gdmFsdWU7XG4gIHZhbHVlID0gc3R5bGUucGl4ZWxMZWZ0O1xuXG4gIC8vIFJldmVydCB0aGUgY2hhbmdlZCB2YWx1ZXNcbiAgc3R5bGUubGVmdCA9IGxlZnQ7XG4gIGlmICggcnNMZWZ0ICkge1xuICAgIHJzLmxlZnQgPSByc0xlZnQ7XG4gIH1cblxuICByZXR1cm4gdmFsdWU7XG59XG5cbnJldHVybiBnZXRTaXplO1xuXG59XG5cbi8vIHRyYW5zcG9ydFxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gIC8vIEFNRCBmb3IgUmVxdWlyZUpTXG4gIGRlZmluZSggWyAnZ2V0LXN0eWxlLXByb3BlcnR5L2dldC1zdHlsZS1wcm9wZXJ0eScgXSwgZGVmaW5lR2V0U2l6ZSApO1xufSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICkge1xuICAvLyBDb21tb25KUyBmb3IgQ29tcG9uZW50XG4gIG1vZHVsZS5leHBvcnRzID0gZGVmaW5lR2V0U2l6ZSggcmVxdWlyZSgnZGVzYW5kcm8tZ2V0LXN0eWxlLXByb3BlcnR5JykgKTtcbn0gZWxzZSB7XG4gIC8vIGJyb3dzZXIgZ2xvYmFsXG4gIHdpbmRvdy5nZXRTaXplID0gZGVmaW5lR2V0U2l6ZSggd2luZG93LmdldFN0eWxlUHJvcGVydHkgKTtcbn1cblxufSkoIHdpbmRvdyApO1xuIiwiLyoqXG4gKiBPdXRsYXllciBJdGVtXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ2V2ZW50RW1pdHRlci9FdmVudEVtaXR0ZXInLFxuICAgICAgICAnZ2V0LXNpemUvZ2V0LXNpemUnLFxuICAgICAgICAnZ2V0LXN0eWxlLXByb3BlcnR5L2dldC1zdHlsZS1wcm9wZXJ0eScsXG4gICAgICAgICdmaXp6eS11aS11dGlscy91dGlscydcbiAgICAgIF0sXG4gICAgICBmdW5jdGlvbiggRXZlbnRFbWl0dGVyLCBnZXRTaXplLCBnZXRTdHlsZVByb3BlcnR5LCB1dGlscyApIHtcbiAgICAgICAgcmV0dXJuIGZhY3RvcnkoIHdpbmRvdywgRXZlbnRFbWl0dGVyLCBnZXRTaXplLCBnZXRTdHlsZVByb3BlcnR5LCB1dGlscyApO1xuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICByZXF1aXJlKCd3b2xmeTg3LWV2ZW50ZW1pdHRlcicpLFxuICAgICAgcmVxdWlyZSgnZ2V0LXNpemUnKSxcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLWdldC1zdHlsZS1wcm9wZXJ0eScpLFxuICAgICAgcmVxdWlyZSgnZml6enktdWktdXRpbHMnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuT3V0bGF5ZXIgPSB7fTtcbiAgICB3aW5kb3cuT3V0bGF5ZXIuSXRlbSA9IGZhY3RvcnkoXG4gICAgICB3aW5kb3csXG4gICAgICB3aW5kb3cuRXZlbnRFbWl0dGVyLFxuICAgICAgd2luZG93LmdldFNpemUsXG4gICAgICB3aW5kb3cuZ2V0U3R5bGVQcm9wZXJ0eSxcbiAgICAgIHdpbmRvdy5maXp6eVVJVXRpbHNcbiAgICApO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSggd2luZG93LCBFdmVudEVtaXR0ZXIsIGdldFNpemUsIGdldFN0eWxlUHJvcGVydHksIHV0aWxzICkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLSBoZWxwZXJzIC0tLS0tIC8vXG5cbnZhciBnZXRDb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGU7XG52YXIgZ2V0U3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlID9cbiAgZnVuY3Rpb24oIGVsZW0gKSB7XG4gICAgcmV0dXJuIGdldENvbXB1dGVkU3R5bGUoIGVsZW0sIG51bGwgKTtcbiAgfSA6XG4gIGZ1bmN0aW9uKCBlbGVtICkge1xuICAgIHJldHVybiBlbGVtLmN1cnJlbnRTdHlsZTtcbiAgfTtcblxuXG5mdW5jdGlvbiBpc0VtcHR5T2JqKCBvYmogKSB7XG4gIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcHJvcCA9IG51bGw7XG4gIHJldHVybiB0cnVlO1xufVxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBDU1MzIHN1cHBvcnQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxudmFyIHRyYW5zaXRpb25Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zaXRpb24nKTtcbnZhciB0cmFuc2Zvcm1Qcm9wZXJ0eSA9IGdldFN0eWxlUHJvcGVydHkoJ3RyYW5zZm9ybScpO1xudmFyIHN1cHBvcnRzQ1NTMyA9IHRyYW5zaXRpb25Qcm9wZXJ0eSAmJiB0cmFuc2Zvcm1Qcm9wZXJ0eTtcbnZhciBpczNkID0gISFnZXRTdHlsZVByb3BlcnR5KCdwZXJzcGVjdGl2ZScpO1xuXG52YXIgdHJhbnNpdGlvbkVuZEV2ZW50ID0ge1xuICBXZWJraXRUcmFuc2l0aW9uOiAnd2Via2l0VHJhbnNpdGlvbkVuZCcsXG4gIE1velRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJyxcbiAgT1RyYW5zaXRpb246ICdvdHJhbnNpdGlvbmVuZCcsXG4gIHRyYW5zaXRpb246ICd0cmFuc2l0aW9uZW5kJ1xufVsgdHJhbnNpdGlvblByb3BlcnR5IF07XG5cbi8vIHByb3BlcnRpZXMgdGhhdCBjb3VsZCBoYXZlIHZlbmRvciBwcmVmaXhcbnZhciBwcmVmaXhhYmxlUHJvcGVydGllcyA9IFtcbiAgJ3RyYW5zZm9ybScsXG4gICd0cmFuc2l0aW9uJyxcbiAgJ3RyYW5zaXRpb25EdXJhdGlvbicsXG4gICd0cmFuc2l0aW9uUHJvcGVydHknXG5dO1xuXG4vLyBjYWNoZSBhbGwgdmVuZG9yIHByb3BlcnRpZXNcbnZhciB2ZW5kb3JQcm9wZXJ0aWVzID0gKCBmdW5jdGlvbigpIHtcbiAgdmFyIGNhY2hlID0ge307XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHByZWZpeGFibGVQcm9wZXJ0aWVzLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBwcm9wID0gcHJlZml4YWJsZVByb3BlcnRpZXNbaV07XG4gICAgdmFyIHN1cHBvcnRlZFByb3AgPSBnZXRTdHlsZVByb3BlcnR5KCBwcm9wICk7XG4gICAgaWYgKCBzdXBwb3J0ZWRQcm9wICYmIHN1cHBvcnRlZFByb3AgIT09IHByb3AgKSB7XG4gICAgICBjYWNoZVsgcHJvcCBdID0gc3VwcG9ydGVkUHJvcDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhY2hlO1xufSkoKTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSXRlbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBJdGVtKCBlbGVtZW50LCBsYXlvdXQgKSB7XG4gIGlmICggIWVsZW1lbnQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcbiAgLy8gcGFyZW50IGxheW91dCBjbGFzcywgaS5lLiBNYXNvbnJ5LCBJc290b3BlLCBvciBQYWNrZXJ5XG4gIHRoaXMubGF5b3V0ID0gbGF5b3V0O1xuICB0aGlzLnBvc2l0aW9uID0ge1xuICAgIHg6IDAsXG4gICAgeTogMFxuICB9O1xuXG4gIHRoaXMuX2NyZWF0ZSgpO1xufVxuXG4vLyBpbmhlcml0IEV2ZW50RW1pdHRlclxudXRpbHMuZXh0ZW5kKCBJdGVtLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSApO1xuXG5JdGVtLnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIHRyYW5zaXRpb24gb2JqZWN0c1xuICB0aGlzLl90cmFuc24gPSB7XG4gICAgaW5nUHJvcGVydGllczoge30sXG4gICAgY2xlYW46IHt9LFxuICAgIG9uRW5kOiB7fVxuICB9O1xuXG4gIHRoaXMuY3NzKHtcbiAgICBwb3NpdGlvbjogJ2Fic29sdXRlJ1xuICB9KTtcbn07XG5cbi8vIHRyaWdnZXIgc3BlY2lmaWVkIGhhbmRsZXIgZm9yIGV2ZW50IHR5cGVcbkl0ZW0ucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbkl0ZW0ucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG4vKipcbiAqIGFwcGx5IENTUyBzdHlsZXMgdG8gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IHN0eWxlXG4gKi9cbkl0ZW0ucHJvdG90eXBlLmNzcyA9IGZ1bmN0aW9uKCBzdHlsZSApIHtcbiAgdmFyIGVsZW1TdHlsZSA9IHRoaXMuZWxlbWVudC5zdHlsZTtcblxuICBmb3IgKCB2YXIgcHJvcCBpbiBzdHlsZSApIHtcbiAgICAvLyB1c2UgdmVuZG9yIHByb3BlcnR5IGlmIGF2YWlsYWJsZVxuICAgIHZhciBzdXBwb3J0ZWRQcm9wID0gdmVuZG9yUHJvcGVydGllc1sgcHJvcCBdIHx8IHByb3A7XG4gICAgZWxlbVN0eWxlWyBzdXBwb3J0ZWRQcm9wIF0gPSBzdHlsZVsgcHJvcCBdO1xuICB9XG59O1xuXG4gLy8gbWVhc3VyZSBwb3NpdGlvbiwgYW5kIHNldHMgaXRcbkl0ZW0ucHJvdG90eXBlLmdldFBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzdHlsZSA9IGdldFN0eWxlKCB0aGlzLmVsZW1lbnQgKTtcbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICB2YXIgaXNPcmlnaW5MZWZ0ID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpbkxlZnQ7XG4gIHZhciBpc09yaWdpblRvcCA9IGxheW91dE9wdGlvbnMuaXNPcmlnaW5Ub3A7XG4gIHZhciB4VmFsdWUgPSBzdHlsZVsgaXNPcmlnaW5MZWZ0ID8gJ2xlZnQnIDogJ3JpZ2h0JyBdO1xuICB2YXIgeVZhbHVlID0gc3R5bGVbIGlzT3JpZ2luVG9wID8gJ3RvcCcgOiAnYm90dG9tJyBdO1xuICAvLyBjb252ZXJ0IHBlcmNlbnQgdG8gcGl4ZWxzXG4gIHZhciBsYXlvdXRTaXplID0gdGhpcy5sYXlvdXQuc2l6ZTtcbiAgdmFyIHggPSB4VmFsdWUuaW5kZXhPZignJScpICE9IC0xID9cbiAgICAoIHBhcnNlRmxvYXQoIHhWYWx1ZSApIC8gMTAwICkgKiBsYXlvdXRTaXplLndpZHRoIDogcGFyc2VJbnQoIHhWYWx1ZSwgMTAgKTtcbiAgdmFyIHkgPSB5VmFsdWUuaW5kZXhPZignJScpICE9IC0xID9cbiAgICAoIHBhcnNlRmxvYXQoIHlWYWx1ZSApIC8gMTAwICkgKiBsYXlvdXRTaXplLmhlaWdodCA6IHBhcnNlSW50KCB5VmFsdWUsIDEwICk7XG5cbiAgLy8gY2xlYW4gdXAgJ2F1dG8nIG9yIG90aGVyIG5vbi1pbnRlZ2VyIHZhbHVlc1xuICB4ID0gaXNOYU4oIHggKSA/IDAgOiB4O1xuICB5ID0gaXNOYU4oIHkgKSA/IDAgOiB5O1xuICAvLyByZW1vdmUgcGFkZGluZyBmcm9tIG1lYXN1cmVtZW50XG4gIHggLT0gaXNPcmlnaW5MZWZ0ID8gbGF5b3V0U2l6ZS5wYWRkaW5nTGVmdCA6IGxheW91dFNpemUucGFkZGluZ1JpZ2h0O1xuICB5IC09IGlzT3JpZ2luVG9wID8gbGF5b3V0U2l6ZS5wYWRkaW5nVG9wIDogbGF5b3V0U2l6ZS5wYWRkaW5nQm90dG9tO1xuXG4gIHRoaXMucG9zaXRpb24ueCA9IHg7XG4gIHRoaXMucG9zaXRpb24ueSA9IHk7XG59O1xuXG4vLyBzZXQgc2V0dGxlZCBwb3NpdGlvbiwgYXBwbHkgcGFkZGluZ1xuSXRlbS5wcm90b3R5cGUubGF5b3V0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdmFyIGxheW91dFNpemUgPSB0aGlzLmxheW91dC5zaXplO1xuICB2YXIgbGF5b3V0T3B0aW9ucyA9IHRoaXMubGF5b3V0Lm9wdGlvbnM7XG4gIHZhciBzdHlsZSA9IHt9O1xuXG4gIC8vIHhcbiAgdmFyIHhQYWRkaW5nID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpbkxlZnQgPyAncGFkZGluZ0xlZnQnIDogJ3BhZGRpbmdSaWdodCc7XG4gIHZhciB4UHJvcGVydHkgPSBsYXlvdXRPcHRpb25zLmlzT3JpZ2luTGVmdCA/ICdsZWZ0JyA6ICdyaWdodCc7XG4gIHZhciB4UmVzZXRQcm9wZXJ0eSA9IGxheW91dE9wdGlvbnMuaXNPcmlnaW5MZWZ0ID8gJ3JpZ2h0JyA6ICdsZWZ0JztcblxuICB2YXIgeCA9IHRoaXMucG9zaXRpb24ueCArIGxheW91dFNpemVbIHhQYWRkaW5nIF07XG4gIC8vIHNldCBpbiBwZXJjZW50YWdlIG9yIHBpeGVsc1xuICBzdHlsZVsgeFByb3BlcnR5IF0gPSB0aGlzLmdldFhWYWx1ZSggeCApO1xuICAvLyByZXNldCBvdGhlciBwcm9wZXJ0eVxuICBzdHlsZVsgeFJlc2V0UHJvcGVydHkgXSA9ICcnO1xuXG4gIC8vIHlcbiAgdmFyIHlQYWRkaW5nID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpblRvcCA/ICdwYWRkaW5nVG9wJyA6ICdwYWRkaW5nQm90dG9tJztcbiAgdmFyIHlQcm9wZXJ0eSA9IGxheW91dE9wdGlvbnMuaXNPcmlnaW5Ub3AgPyAndG9wJyA6ICdib3R0b20nO1xuICB2YXIgeVJlc2V0UHJvcGVydHkgPSBsYXlvdXRPcHRpb25zLmlzT3JpZ2luVG9wID8gJ2JvdHRvbScgOiAndG9wJztcblxuICB2YXIgeSA9IHRoaXMucG9zaXRpb24ueSArIGxheW91dFNpemVbIHlQYWRkaW5nIF07XG4gIC8vIHNldCBpbiBwZXJjZW50YWdlIG9yIHBpeGVsc1xuICBzdHlsZVsgeVByb3BlcnR5IF0gPSB0aGlzLmdldFlWYWx1ZSggeSApO1xuICAvLyByZXNldCBvdGhlciBwcm9wZXJ0eVxuICBzdHlsZVsgeVJlc2V0UHJvcGVydHkgXSA9ICcnO1xuXG4gIHRoaXMuY3NzKCBzdHlsZSApO1xuICB0aGlzLmVtaXRFdmVudCggJ2xheW91dCcsIFsgdGhpcyBdICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5nZXRYVmFsdWUgPSBmdW5jdGlvbiggeCApIHtcbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICByZXR1cm4gbGF5b3V0T3B0aW9ucy5wZXJjZW50UG9zaXRpb24gJiYgIWxheW91dE9wdGlvbnMuaXNIb3Jpem9udGFsID9cbiAgICAoICggeCAvIHRoaXMubGF5b3V0LnNpemUud2lkdGggKSAqIDEwMCApICsgJyUnIDogeCArICdweCc7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5nZXRZVmFsdWUgPSBmdW5jdGlvbiggeSApIHtcbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICByZXR1cm4gbGF5b3V0T3B0aW9ucy5wZXJjZW50UG9zaXRpb24gJiYgbGF5b3V0T3B0aW9ucy5pc0hvcml6b250YWwgP1xuICAgICggKCB5IC8gdGhpcy5sYXlvdXQuc2l6ZS5oZWlnaHQgKSAqIDEwMCApICsgJyUnIDogeSArICdweCc7XG59O1xuXG5cbkl0ZW0ucHJvdG90eXBlLl90cmFuc2l0aW9uVG8gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5nZXRQb3NpdGlvbigpO1xuICAvLyBnZXQgY3VycmVudCB4ICYgeSBmcm9tIHRvcC9sZWZ0XG4gIHZhciBjdXJYID0gdGhpcy5wb3NpdGlvbi54O1xuICB2YXIgY3VyWSA9IHRoaXMucG9zaXRpb24ueTtcblxuICB2YXIgY29tcGFyZVggPSBwYXJzZUludCggeCwgMTAgKTtcbiAgdmFyIGNvbXBhcmVZID0gcGFyc2VJbnQoIHksIDEwICk7XG4gIHZhciBkaWROb3RNb3ZlID0gY29tcGFyZVggPT09IHRoaXMucG9zaXRpb24ueCAmJiBjb21wYXJlWSA9PT0gdGhpcy5wb3NpdGlvbi55O1xuXG4gIC8vIHNhdmUgZW5kIHBvc2l0aW9uXG4gIHRoaXMuc2V0UG9zaXRpb24oIHgsIHkgKTtcblxuICAvLyBpZiBkaWQgbm90IG1vdmUgYW5kIG5vdCB0cmFuc2l0aW9uaW5nLCBqdXN0IGdvIHRvIGxheW91dFxuICBpZiAoIGRpZE5vdE1vdmUgJiYgIXRoaXMuaXNUcmFuc2l0aW9uaW5nICkge1xuICAgIHRoaXMubGF5b3V0UG9zaXRpb24oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgdHJhbnNYID0geCAtIGN1clg7XG4gIHZhciB0cmFuc1kgPSB5IC0gY3VyWTtcbiAgdmFyIHRyYW5zaXRpb25TdHlsZSA9IHt9O1xuICB0cmFuc2l0aW9uU3R5bGUudHJhbnNmb3JtID0gdGhpcy5nZXRUcmFuc2xhdGUoIHRyYW5zWCwgdHJhbnNZICk7XG5cbiAgdGhpcy50cmFuc2l0aW9uKHtcbiAgICB0bzogdHJhbnNpdGlvblN0eWxlLFxuICAgIG9uVHJhbnNpdGlvbkVuZDoge1xuICAgICAgdHJhbnNmb3JtOiB0aGlzLmxheW91dFBvc2l0aW9uXG4gICAgfSxcbiAgICBpc0NsZWFuaW5nOiB0cnVlXG4gIH0pO1xufTtcblxuSXRlbS5wcm90b3R5cGUuZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIC8vIGZsaXAgY29vcmlkaW5hdGVzIGlmIG9yaWdpbiBvbiByaWdodCBvciBib3R0b21cbiAgdmFyIGxheW91dE9wdGlvbnMgPSB0aGlzLmxheW91dC5vcHRpb25zO1xuICB4ID0gbGF5b3V0T3B0aW9ucy5pc09yaWdpbkxlZnQgPyB4IDogLXg7XG4gIHkgPSBsYXlvdXRPcHRpb25zLmlzT3JpZ2luVG9wID8geSA6IC15O1xuXG4gIGlmICggaXMzZCApIHtcbiAgICByZXR1cm4gJ3RyYW5zbGF0ZTNkKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCwgMCknO1xuICB9XG5cbiAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHggKyAncHgsICcgKyB5ICsgJ3B4KSc7XG59O1xuXG4vLyBub24gdHJhbnNpdGlvbiArIHRyYW5zZm9ybSBzdXBwb3J0XG5JdGVtLnByb3RvdHlwZS5nb1RvID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIHRoaXMuc2V0UG9zaXRpb24oIHgsIHkgKTtcbiAgdGhpcy5sYXlvdXRQb3NpdGlvbigpO1xufTtcblxuLy8gdXNlIHRyYW5zaXRpb24gYW5kIHRyYW5zZm9ybXMgaWYgc3VwcG9ydGVkXG5JdGVtLnByb3RvdHlwZS5tb3ZlVG8gPSBzdXBwb3J0c0NTUzMgP1xuICBJdGVtLnByb3RvdHlwZS5fdHJhbnNpdGlvblRvIDogSXRlbS5wcm90b3R5cGUuZ29UbztcblxuSXRlbS5wcm90b3R5cGUuc2V0UG9zaXRpb24gPSBmdW5jdGlvbiggeCwgeSApIHtcbiAgdGhpcy5wb3NpdGlvbi54ID0gcGFyc2VJbnQoIHgsIDEwICk7XG4gIHRoaXMucG9zaXRpb24ueSA9IHBhcnNlSW50KCB5LCAxMCApO1xufTtcblxuLy8gLS0tLS0gdHJhbnNpdGlvbiAtLS0tLSAvL1xuXG4vKipcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZSAtIENTU1xuICogQHBhcmFtIHtGdW5jdGlvbn0gb25UcmFuc2l0aW9uRW5kXG4gKi9cblxuLy8gbm9uIHRyYW5zaXRpb24sIGp1c3QgdHJpZ2dlciBjYWxsYmFja1xuSXRlbS5wcm90b3R5cGUuX25vblRyYW5zaXRpb24gPSBmdW5jdGlvbiggYXJncyApIHtcbiAgdGhpcy5jc3MoIGFyZ3MudG8gKTtcbiAgaWYgKCBhcmdzLmlzQ2xlYW5pbmcgKSB7XG4gICAgdGhpcy5fcmVtb3ZlU3R5bGVzKCBhcmdzLnRvICk7XG4gIH1cbiAgZm9yICggdmFyIHByb3AgaW4gYXJncy5vblRyYW5zaXRpb25FbmQgKSB7XG4gICAgYXJncy5vblRyYW5zaXRpb25FbmRbIHByb3AgXS5jYWxsKCB0aGlzICk7XG4gIH1cbn07XG5cbi8qKlxuICogcHJvcGVyIHRyYW5zaXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBhcmdzIC0gYXJndW1lbnRzXG4gKiAgIEBwYXJhbSB7T2JqZWN0fSB0byAtIHN0eWxlIHRvIHRyYW5zaXRpb24gdG9cbiAqICAgQHBhcmFtIHtPYmplY3R9IGZyb20gLSBzdHlsZSB0byBzdGFydCB0cmFuc2l0aW9uIGZyb21cbiAqICAgQHBhcmFtIHtCb29sZWFufSBpc0NsZWFuaW5nIC0gcmVtb3ZlcyB0cmFuc2l0aW9uIHN0eWxlcyBhZnRlciB0cmFuc2l0aW9uXG4gKiAgIEBwYXJhbSB7RnVuY3Rpb259IG9uVHJhbnNpdGlvbkVuZCAtIGNhbGxiYWNrXG4gKi9cbkl0ZW0ucHJvdG90eXBlLl90cmFuc2l0aW9uID0gZnVuY3Rpb24oIGFyZ3MgKSB7XG4gIC8vIHJlZGlyZWN0IHRvIG5vblRyYW5zaXRpb24gaWYgbm8gdHJhbnNpdGlvbiBkdXJhdGlvblxuICBpZiAoICFwYXJzZUZsb2F0KCB0aGlzLmxheW91dC5vcHRpb25zLnRyYW5zaXRpb25EdXJhdGlvbiApICkge1xuICAgIHRoaXMuX25vblRyYW5zaXRpb24oIGFyZ3MgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgX3RyYW5zaXRpb24gPSB0aGlzLl90cmFuc247XG4gIC8vIGtlZXAgdHJhY2sgb2Ygb25UcmFuc2l0aW9uRW5kIGNhbGxiYWNrIGJ5IGNzcyBwcm9wZXJ0eVxuICBmb3IgKCB2YXIgcHJvcCBpbiBhcmdzLm9uVHJhbnNpdGlvbkVuZCApIHtcbiAgICBfdHJhbnNpdGlvbi5vbkVuZFsgcHJvcCBdID0gYXJncy5vblRyYW5zaXRpb25FbmRbIHByb3AgXTtcbiAgfVxuICAvLyBrZWVwIHRyYWNrIG9mIHByb3BlcnRpZXMgdGhhdCBhcmUgdHJhbnNpdGlvbmluZ1xuICBmb3IgKCBwcm9wIGluIGFyZ3MudG8gKSB7XG4gICAgX3RyYW5zaXRpb24uaW5nUHJvcGVydGllc1sgcHJvcCBdID0gdHJ1ZTtcbiAgICAvLyBrZWVwIHRyYWNrIG9mIHByb3BlcnRpZXMgdG8gY2xlYW4gdXAgd2hlbiB0cmFuc2l0aW9uIGlzIGRvbmVcbiAgICBpZiAoIGFyZ3MuaXNDbGVhbmluZyApIHtcbiAgICAgIF90cmFuc2l0aW9uLmNsZWFuWyBwcm9wIF0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIC8vIHNldCBmcm9tIHN0eWxlc1xuICBpZiAoIGFyZ3MuZnJvbSApIHtcbiAgICB0aGlzLmNzcyggYXJncy5mcm9tICk7XG4gICAgLy8gZm9yY2UgcmVkcmF3LiBodHRwOi8vYmxvZy5hbGV4bWFjY2F3LmNvbS9jc3MtdHJhbnNpdGlvbnNcbiAgICB2YXIgaCA9IHRoaXMuZWxlbWVudC5vZmZzZXRIZWlnaHQ7XG4gICAgLy8gaGFjayBmb3IgSlNIaW50IHRvIGh1c2ggYWJvdXQgdW51c2VkIHZhclxuICAgIGggPSBudWxsO1xuICB9XG4gIC8vIGVuYWJsZSB0cmFuc2l0aW9uXG4gIHRoaXMuZW5hYmxlVHJhbnNpdGlvbiggYXJncy50byApO1xuICAvLyBzZXQgc3R5bGVzIHRoYXQgYXJlIHRyYW5zaXRpb25pbmdcbiAgdGhpcy5jc3MoIGFyZ3MudG8gKTtcblxuICB0aGlzLmlzVHJhbnNpdGlvbmluZyA9IHRydWU7XG5cbn07XG5cbi8vIGRhc2ggYmVmb3JlIGFsbCBjYXAgbGV0dGVycywgaW5jbHVkaW5nIGZpcnN0IGZvclxuLy8gV2Via2l0VHJhbnNmb3JtID0+IC13ZWJraXQtdHJhbnNmb3JtXG5mdW5jdGlvbiB0b0Rhc2hlZEFsbCggc3RyICkge1xuICByZXR1cm4gc3RyLnJlcGxhY2UoIC8oW0EtWl0pL2csIGZ1bmN0aW9uKCAkMSApIHtcbiAgICByZXR1cm4gJy0nICsgJDEudG9Mb3dlckNhc2UoKTtcbiAgfSk7XG59XG5cbnZhciB0cmFuc2l0aW9uUHJvcHMgPSAnb3BhY2l0eSwnICtcbiAgdG9EYXNoZWRBbGwoIHZlbmRvclByb3BlcnRpZXMudHJhbnNmb3JtIHx8ICd0cmFuc2Zvcm0nICk7XG5cbkl0ZW0ucHJvdG90eXBlLmVuYWJsZVRyYW5zaXRpb24gPSBmdW5jdGlvbigvKiBzdHlsZSAqLykge1xuICAvLyBIQUNLIGNoYW5naW5nIHRyYW5zaXRpb25Qcm9wZXJ0eSBkdXJpbmcgYSB0cmFuc2l0aW9uXG4gIC8vIHdpbGwgY2F1c2UgdHJhbnNpdGlvbiB0byBqdW1wXG4gIGlmICggdGhpcy5pc1RyYW5zaXRpb25pbmcgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gbWFrZSBgdHJhbnNpdGlvbjogZm9vLCBiYXIsIGJhemAgZnJvbSBzdHlsZSBvYmplY3RcbiAgLy8gSEFDSyB1bi1jb21tZW50IHRoaXMgd2hlbiBlbmFibGVUcmFuc2l0aW9uIGNhbiB3b3JrXG4gIC8vIHdoaWxlIGEgdHJhbnNpdGlvbiBpcyBoYXBwZW5pbmdcbiAgLy8gdmFyIHRyYW5zaXRpb25WYWx1ZXMgPSBbXTtcbiAgLy8gZm9yICggdmFyIHByb3AgaW4gc3R5bGUgKSB7XG4gIC8vICAgLy8gZGFzaC1pZnkgY2FtZWxDYXNlZCBwcm9wZXJ0aWVzIGxpa2UgV2Via2l0VHJhbnNpdGlvblxuICAvLyAgIHByb3AgPSB2ZW5kb3JQcm9wZXJ0aWVzWyBwcm9wIF0gfHwgcHJvcDtcbiAgLy8gICB0cmFuc2l0aW9uVmFsdWVzLnB1c2goIHRvRGFzaGVkQWxsKCBwcm9wICkgKTtcbiAgLy8gfVxuICAvLyBlbmFibGUgdHJhbnNpdGlvbiBzdHlsZXNcbiAgdGhpcy5jc3Moe1xuICAgIHRyYW5zaXRpb25Qcm9wZXJ0eTogdHJhbnNpdGlvblByb3BzLFxuICAgIHRyYW5zaXRpb25EdXJhdGlvbjogdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb25cbiAgfSk7XG4gIC8vIGxpc3RlbiBmb3IgdHJhbnNpdGlvbiBlbmQgZXZlbnRcbiAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoIHRyYW5zaXRpb25FbmRFdmVudCwgdGhpcywgZmFsc2UgKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnRyYW5zaXRpb24gPSBJdGVtLnByb3RvdHlwZVsgdHJhbnNpdGlvblByb3BlcnR5ID8gJ190cmFuc2l0aW9uJyA6ICdfbm9uVHJhbnNpdGlvbicgXTtcblxuLy8gLS0tLS0gZXZlbnRzIC0tLS0tIC8vXG5cbkl0ZW0ucHJvdG90eXBlLm9ud2Via2l0VHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCBldmVudCApIHtcbiAgdGhpcy5vbnRyYW5zaXRpb25lbmQoIGV2ZW50ICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5vbm90cmFuc2l0aW9uZW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB0aGlzLm9udHJhbnNpdGlvbmVuZCggZXZlbnQgKTtcbn07XG5cbi8vIHByb3BlcnRpZXMgdGhhdCBJIG11bmdlIHRvIG1ha2UgbXkgbGlmZSBlYXNpZXJcbnZhciBkYXNoZWRWZW5kb3JQcm9wZXJ0aWVzID0ge1xuICAnLXdlYmtpdC10cmFuc2Zvcm0nOiAndHJhbnNmb3JtJyxcbiAgJy1tb3otdHJhbnNmb3JtJzogJ3RyYW5zZm9ybScsXG4gICctby10cmFuc2Zvcm0nOiAndHJhbnNmb3JtJ1xufTtcblxuSXRlbS5wcm90b3R5cGUub250cmFuc2l0aW9uZW5kID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICAvLyBkaXNyZWdhcmQgYnViYmxlZCBldmVudHMgZnJvbSBjaGlsZHJlblxuICBpZiAoIGV2ZW50LnRhcmdldCAhPT0gdGhpcy5lbGVtZW50ICkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgX3RyYW5zaXRpb24gPSB0aGlzLl90cmFuc247XG4gIC8vIGdldCBwcm9wZXJ0eSBuYW1lIG9mIHRyYW5zaXRpb25lZCBwcm9wZXJ0eSwgY29udmVydCB0byBwcmVmaXgtZnJlZVxuICB2YXIgcHJvcGVydHlOYW1lID0gZGFzaGVkVmVuZG9yUHJvcGVydGllc1sgZXZlbnQucHJvcGVydHlOYW1lIF0gfHwgZXZlbnQucHJvcGVydHlOYW1lO1xuXG4gIC8vIHJlbW92ZSBwcm9wZXJ0eSB0aGF0IGhhcyBjb21wbGV0ZWQgdHJhbnNpdGlvbmluZ1xuICBkZWxldGUgX3RyYW5zaXRpb24uaW5nUHJvcGVydGllc1sgcHJvcGVydHlOYW1lIF07XG4gIC8vIGNoZWNrIGlmIGFueSBwcm9wZXJ0aWVzIGFyZSBzdGlsbCB0cmFuc2l0aW9uaW5nXG4gIGlmICggaXNFbXB0eU9iaiggX3RyYW5zaXRpb24uaW5nUHJvcGVydGllcyApICkge1xuICAgIC8vIGFsbCBwcm9wZXJ0aWVzIGhhdmUgY29tcGxldGVkIHRyYW5zaXRpb25pbmdcbiAgICB0aGlzLmRpc2FibGVUcmFuc2l0aW9uKCk7XG4gIH1cbiAgLy8gY2xlYW4gc3R5bGVcbiAgaWYgKCBwcm9wZXJ0eU5hbWUgaW4gX3RyYW5zaXRpb24uY2xlYW4gKSB7XG4gICAgLy8gY2xlYW4gdXAgc3R5bGVcbiAgICB0aGlzLmVsZW1lbnQuc3R5bGVbIGV2ZW50LnByb3BlcnR5TmFtZSBdID0gJyc7XG4gICAgZGVsZXRlIF90cmFuc2l0aW9uLmNsZWFuWyBwcm9wZXJ0eU5hbWUgXTtcbiAgfVxuICAvLyB0cmlnZ2VyIG9uVHJhbnNpdGlvbkVuZCBjYWxsYmFja1xuICBpZiAoIHByb3BlcnR5TmFtZSBpbiBfdHJhbnNpdGlvbi5vbkVuZCApIHtcbiAgICB2YXIgb25UcmFuc2l0aW9uRW5kID0gX3RyYW5zaXRpb24ub25FbmRbIHByb3BlcnR5TmFtZSBdO1xuICAgIG9uVHJhbnNpdGlvbkVuZC5jYWxsKCB0aGlzICk7XG4gICAgZGVsZXRlIF90cmFuc2l0aW9uLm9uRW5kWyBwcm9wZXJ0eU5hbWUgXTtcbiAgfVxuXG4gIHRoaXMuZW1pdEV2ZW50KCAndHJhbnNpdGlvbkVuZCcsIFsgdGhpcyBdICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5kaXNhYmxlVHJhbnNpdGlvbiA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlbW92ZVRyYW5zaXRpb25TdHlsZXMoKTtcbiAgdGhpcy5lbGVtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoIHRyYW5zaXRpb25FbmRFdmVudCwgdGhpcywgZmFsc2UgKTtcbiAgdGhpcy5pc1RyYW5zaXRpb25pbmcgPSBmYWxzZTtcbn07XG5cbi8qKlxuICogcmVtb3ZlcyBzdHlsZSBwcm9wZXJ0eSBmcm9tIGVsZW1lbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZVxuKiovXG5JdGVtLnByb3RvdHlwZS5fcmVtb3ZlU3R5bGVzID0gZnVuY3Rpb24oIHN0eWxlICkge1xuICAvLyBjbGVhbiB1cCB0cmFuc2l0aW9uIHN0eWxlc1xuICB2YXIgY2xlYW5TdHlsZSA9IHt9O1xuICBmb3IgKCB2YXIgcHJvcCBpbiBzdHlsZSApIHtcbiAgICBjbGVhblN0eWxlWyBwcm9wIF0gPSAnJztcbiAgfVxuICB0aGlzLmNzcyggY2xlYW5TdHlsZSApO1xufTtcblxudmFyIGNsZWFuVHJhbnNpdGlvblN0eWxlID0ge1xuICB0cmFuc2l0aW9uUHJvcGVydHk6ICcnLFxuICB0cmFuc2l0aW9uRHVyYXRpb246ICcnXG59O1xuXG5JdGVtLnByb3RvdHlwZS5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzID0gZnVuY3Rpb24oKSB7XG4gIC8vIHJlbW92ZSB0cmFuc2l0aW9uXG4gIHRoaXMuY3NzKCBjbGVhblRyYW5zaXRpb25TdHlsZSApO1xufTtcblxuLy8gLS0tLS0gc2hvdy9oaWRlL3JlbW92ZSAtLS0tLSAvL1xuXG4vLyByZW1vdmUgZWxlbWVudCBmcm9tIERPTVxuSXRlbS5wcm90b3R5cGUucmVtb3ZlRWxlbSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggdGhpcy5lbGVtZW50ICk7XG4gIC8vIHJlbW92ZSBkaXNwbGF5OiBub25lXG4gIHRoaXMuY3NzKHsgZGlzcGxheTogJycgfSk7XG4gIHRoaXMuZW1pdEV2ZW50KCAncmVtb3ZlJywgWyB0aGlzIF0gKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBqdXN0IHJlbW92ZSBlbGVtZW50IGlmIG5vIHRyYW5zaXRpb24gc3VwcG9ydCBvciBubyB0cmFuc2l0aW9uXG4gIGlmICggIXRyYW5zaXRpb25Qcm9wZXJ0eSB8fCAhcGFyc2VGbG9hdCggdGhpcy5sYXlvdXQub3B0aW9ucy50cmFuc2l0aW9uRHVyYXRpb24gKSApIHtcbiAgICB0aGlzLnJlbW92ZUVsZW0oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBzdGFydCB0cmFuc2l0aW9uXG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHRoaXMub25jZSggJ3RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbigpIHtcbiAgICBfdGhpcy5yZW1vdmVFbGVtKCk7XG4gIH0pO1xuICB0aGlzLmhpZGUoKTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLnJldmVhbCA9IGZ1bmN0aW9uKCkge1xuICBkZWxldGUgdGhpcy5pc0hpZGRlbjtcbiAgLy8gcmVtb3ZlIGRpc3BsYXk6IG5vbmVcbiAgdGhpcy5jc3MoeyBkaXNwbGF5OiAnJyB9KTtcblxuICB2YXIgb3B0aW9ucyA9IHRoaXMubGF5b3V0Lm9wdGlvbnM7XG5cbiAgdmFyIG9uVHJhbnNpdGlvbkVuZCA9IHt9O1xuICB2YXIgdHJhbnNpdGlvbkVuZFByb3BlcnR5ID0gdGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KCd2aXNpYmxlU3R5bGUnKTtcbiAgb25UcmFuc2l0aW9uRW5kWyB0cmFuc2l0aW9uRW5kUHJvcGVydHkgXSA9IHRoaXMub25SZXZlYWxUcmFuc2l0aW9uRW5kO1xuXG4gIHRoaXMudHJhbnNpdGlvbih7XG4gICAgZnJvbTogb3B0aW9ucy5oaWRkZW5TdHlsZSxcbiAgICB0bzogb3B0aW9ucy52aXNpYmxlU3R5bGUsXG4gICAgaXNDbGVhbmluZzogdHJ1ZSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IG9uVHJhbnNpdGlvbkVuZFxuICB9KTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLm9uUmV2ZWFsVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAvLyBjaGVjayBpZiBzdGlsbCB2aXNpYmxlXG4gIC8vIGR1cmluZyB0cmFuc2l0aW9uLCBpdGVtIG1heSBoYXZlIGJlZW4gaGlkZGVuXG4gIGlmICggIXRoaXMuaXNIaWRkZW4gKSB7XG4gICAgdGhpcy5lbWl0RXZlbnQoJ3JldmVhbCcpO1xuICB9XG59O1xuXG4vKipcbiAqIGdldCBzdHlsZSBwcm9wZXJ0eSB1c2UgZm9yIGhpZGUvcmV2ZWFsIHRyYW5zaXRpb24gZW5kXG4gKiBAcGFyYW0ge1N0cmluZ30gc3R5bGVQcm9wZXJ0eSAtIGhpZGRlblN0eWxlL3Zpc2libGVTdHlsZVxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuSXRlbS5wcm90b3R5cGUuZ2V0SGlkZVJldmVhbFRyYW5zaXRpb25FbmRQcm9wZXJ0eSA9IGZ1bmN0aW9uKCBzdHlsZVByb3BlcnR5ICkge1xuICB2YXIgb3B0aW9uU3R5bGUgPSB0aGlzLmxheW91dC5vcHRpb25zWyBzdHlsZVByb3BlcnR5IF07XG4gIC8vIHVzZSBvcGFjaXR5XG4gIGlmICggb3B0aW9uU3R5bGUub3BhY2l0eSApIHtcbiAgICByZXR1cm4gJ29wYWNpdHknO1xuICB9XG4gIC8vIGdldCBmaXJzdCBwcm9wZXJ0eVxuICBmb3IgKCB2YXIgcHJvcCBpbiBvcHRpb25TdHlsZSApIHtcbiAgICByZXR1cm4gcHJvcDtcbiAgfVxufTtcblxuSXRlbS5wcm90b3R5cGUuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBzZXQgZmxhZ1xuICB0aGlzLmlzSGlkZGVuID0gdHJ1ZTtcbiAgLy8gcmVtb3ZlIGRpc3BsYXk6IG5vbmVcbiAgdGhpcy5jc3MoeyBkaXNwbGF5OiAnJyB9KTtcblxuICB2YXIgb3B0aW9ucyA9IHRoaXMubGF5b3V0Lm9wdGlvbnM7XG5cbiAgdmFyIG9uVHJhbnNpdGlvbkVuZCA9IHt9O1xuICB2YXIgdHJhbnNpdGlvbkVuZFByb3BlcnR5ID0gdGhpcy5nZXRIaWRlUmV2ZWFsVHJhbnNpdGlvbkVuZFByb3BlcnR5KCdoaWRkZW5TdHlsZScpO1xuICBvblRyYW5zaXRpb25FbmRbIHRyYW5zaXRpb25FbmRQcm9wZXJ0eSBdID0gdGhpcy5vbkhpZGVUcmFuc2l0aW9uRW5kO1xuXG4gIHRoaXMudHJhbnNpdGlvbih7XG4gICAgZnJvbTogb3B0aW9ucy52aXNpYmxlU3R5bGUsXG4gICAgdG86IG9wdGlvbnMuaGlkZGVuU3R5bGUsXG4gICAgLy8ga2VlcCBoaWRkZW4gc3R1ZmYgaGlkZGVuXG4gICAgaXNDbGVhbmluZzogdHJ1ZSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IG9uVHJhbnNpdGlvbkVuZFxuICB9KTtcbn07XG5cbkl0ZW0ucHJvdG90eXBlLm9uSGlkZVRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2hlY2sgaWYgc3RpbGwgaGlkZGVuXG4gIC8vIGR1cmluZyB0cmFuc2l0aW9uLCBpdGVtIG1heSBoYXZlIGJlZW4gdW4taGlkZGVuXG4gIGlmICggdGhpcy5pc0hpZGRlbiApIHtcbiAgICB0aGlzLmNzcyh7IGRpc3BsYXk6ICdub25lJyB9KTtcbiAgICB0aGlzLmVtaXRFdmVudCgnaGlkZScpO1xuICB9XG59O1xuXG5JdGVtLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuY3NzKHtcbiAgICBwb3NpdGlvbjogJycsXG4gICAgbGVmdDogJycsXG4gICAgcmlnaHQ6ICcnLFxuICAgIHRvcDogJycsXG4gICAgYm90dG9tOiAnJyxcbiAgICB0cmFuc2l0aW9uOiAnJyxcbiAgICB0cmFuc2Zvcm06ICcnXG4gIH0pO1xufTtcblxucmV0dXJuIEl0ZW07XG5cbn0pKTtcbiIsIi8qIVxuICogT3V0bGF5ZXIgdjEuNC4yXG4gKiB0aGUgYnJhaW5zIGFuZCBndXRzIG9mIGEgbGF5b3V0IGxpYnJhcnlcbiAqIE1JVCBsaWNlbnNlXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuXG4gIGlmICggdHlwZW9mIGRlZmluZSA9PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQgKSB7XG4gICAgLy8gQU1EXG4gICAgZGVmaW5lKCBbXG4gICAgICAgICdldmVudGllL2V2ZW50aWUnLFxuICAgICAgICAnZXZlbnRFbWl0dGVyL0V2ZW50RW1pdHRlcicsXG4gICAgICAgICdnZXQtc2l6ZS9nZXQtc2l6ZScsXG4gICAgICAgICdmaXp6eS11aS11dGlscy91dGlscycsXG4gICAgICAgICcuL2l0ZW0nXG4gICAgICBdLFxuICAgICAgZnVuY3Rpb24oIGV2ZW50aWUsIEV2ZW50RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIEl0ZW0gKSB7XG4gICAgICAgIHJldHVybiBmYWN0b3J5KCB3aW5kb3csIGV2ZW50aWUsIEV2ZW50RW1pdHRlciwgZ2V0U2l6ZSwgdXRpbHMsIEl0ZW0pO1xuICAgICAgfVxuICAgICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LFxuICAgICAgcmVxdWlyZSgnZXZlbnRpZScpLFxuICAgICAgcmVxdWlyZSgnd29sZnk4Ny1ldmVudGVtaXR0ZXInKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJyksXG4gICAgICByZXF1aXJlKCdmaXp6eS11aS11dGlscycpLFxuICAgICAgcmVxdWlyZSgnLi9pdGVtJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93Lk91dGxheWVyID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdyxcbiAgICAgIHdpbmRvdy5ldmVudGllLFxuICAgICAgd2luZG93LkV2ZW50RW1pdHRlcixcbiAgICAgIHdpbmRvdy5nZXRTaXplLFxuICAgICAgd2luZG93LmZpenp5VUlVdGlscyxcbiAgICAgIHdpbmRvdy5PdXRsYXllci5JdGVtXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIHdpbmRvdywgZXZlbnRpZSwgRXZlbnRFbWl0dGVyLCBnZXRTaXplLCB1dGlscywgSXRlbSApIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0gdmFycyAtLS0tLSAvL1xuXG52YXIgY29uc29sZSA9IHdpbmRvdy5jb25zb2xlO1xudmFyIGpRdWVyeSA9IHdpbmRvdy5qUXVlcnk7XG52YXIgbm9vcCA9IGZ1bmN0aW9uKCkge307XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIE91dGxheWVyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGdsb2JhbGx5IHVuaXF1ZSBpZGVudGlmaWVyc1xudmFyIEdVSUQgPSAwO1xuLy8gaW50ZXJuYWwgc3RvcmUgb2YgYWxsIE91dGxheWVyIGludGFuY2VzXG52YXIgaW5zdGFuY2VzID0ge307XG5cblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnQsIFN0cmluZ30gZWxlbWVudFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBPdXRsYXllciggZWxlbWVudCwgb3B0aW9ucyApIHtcbiAgdmFyIHF1ZXJ5RWxlbWVudCA9IHV0aWxzLmdldFF1ZXJ5RWxlbWVudCggZWxlbWVudCApO1xuICBpZiAoICFxdWVyeUVsZW1lbnQgKSB7XG4gICAgaWYgKCBjb25zb2xlICkge1xuICAgICAgY29uc29sZS5lcnJvciggJ0JhZCBlbGVtZW50IGZvciAnICsgdGhpcy5jb25zdHJ1Y3Rvci5uYW1lc3BhY2UgK1xuICAgICAgICAnOiAnICsgKCBxdWVyeUVsZW1lbnQgfHwgZWxlbWVudCApICk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICB0aGlzLmVsZW1lbnQgPSBxdWVyeUVsZW1lbnQ7XG4gIC8vIGFkZCBqUXVlcnlcbiAgaWYgKCBqUXVlcnkgKSB7XG4gICAgdGhpcy4kZWxlbWVudCA9IGpRdWVyeSggdGhpcy5lbGVtZW50ICk7XG4gIH1cblxuICAvLyBvcHRpb25zXG4gIHRoaXMub3B0aW9ucyA9IHV0aWxzLmV4dGVuZCgge30sIHRoaXMuY29uc3RydWN0b3IuZGVmYXVsdHMgKTtcbiAgdGhpcy5vcHRpb24oIG9wdGlvbnMgKTtcblxuICAvLyBhZGQgaWQgZm9yIE91dGxheWVyLmdldEZyb21FbGVtZW50XG4gIHZhciBpZCA9ICsrR1VJRDtcbiAgdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRCA9IGlkOyAvLyBleHBhbmRvXG4gIGluc3RhbmNlc1sgaWQgXSA9IHRoaXM7IC8vIGFzc29jaWF0ZSB2aWEgaWRcblxuICAvLyBraWNrIGl0IG9mZlxuICB0aGlzLl9jcmVhdGUoKTtcblxuICBpZiAoIHRoaXMub3B0aW9ucy5pc0luaXRMYXlvdXQgKSB7XG4gICAgdGhpcy5sYXlvdXQoKTtcbiAgfVxufVxuXG4vLyBzZXR0aW5ncyBhcmUgZm9yIGludGVybmFsIHVzZSBvbmx5XG5PdXRsYXllci5uYW1lc3BhY2UgPSAnb3V0bGF5ZXInO1xuT3V0bGF5ZXIuSXRlbSA9IEl0ZW07XG5cbi8vIGRlZmF1bHQgb3B0aW9uc1xuT3V0bGF5ZXIuZGVmYXVsdHMgPSB7XG4gIGNvbnRhaW5lclN0eWxlOiB7XG4gICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgfSxcbiAgaXNJbml0TGF5b3V0OiB0cnVlLFxuICBpc09yaWdpbkxlZnQ6IHRydWUsXG4gIGlzT3JpZ2luVG9wOiB0cnVlLFxuICBpc1Jlc2l6ZUJvdW5kOiB0cnVlLFxuICBpc1Jlc2l6aW5nQ29udGFpbmVyOiB0cnVlLFxuICAvLyBpdGVtIG9wdGlvbnNcbiAgdHJhbnNpdGlvbkR1cmF0aW9uOiAnMC40cycsXG4gIGhpZGRlblN0eWxlOiB7XG4gICAgb3BhY2l0eTogMCxcbiAgICB0cmFuc2Zvcm06ICdzY2FsZSgwLjAwMSknXG4gIH0sXG4gIHZpc2libGVTdHlsZToge1xuICAgIG9wYWNpdHk6IDEsXG4gICAgdHJhbnNmb3JtOiAnc2NhbGUoMSknXG4gIH1cbn07XG5cbi8vIGluaGVyaXQgRXZlbnRFbWl0dGVyXG51dGlscy5leHRlbmQoIE91dGxheWVyLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyLnByb3RvdHlwZSApO1xuXG4vKipcbiAqIHNldCBvcHRpb25zXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0c1xuICovXG5PdXRsYXllci5wcm90b3R5cGUub3B0aW9uID0gZnVuY3Rpb24oIG9wdHMgKSB7XG4gIHV0aWxzLmV4dGVuZCggdGhpcy5vcHRpb25zLCBvcHRzICk7XG59O1xuXG5PdXRsYXllci5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBnZXQgaXRlbXMgZnJvbSBjaGlsZHJlblxuICB0aGlzLnJlbG9hZEl0ZW1zKCk7XG4gIC8vIGVsZW1lbnRzIHRoYXQgYWZmZWN0IGxheW91dCwgYnV0IGFyZSBub3QgbGFpZCBvdXRcbiAgdGhpcy5zdGFtcHMgPSBbXTtcbiAgdGhpcy5zdGFtcCggdGhpcy5vcHRpb25zLnN0YW1wICk7XG4gIC8vIHNldCBjb250YWluZXIgc3R5bGVcbiAgdXRpbHMuZXh0ZW5kKCB0aGlzLmVsZW1lbnQuc3R5bGUsIHRoaXMub3B0aW9ucy5jb250YWluZXJTdHlsZSApO1xuXG4gIC8vIGJpbmQgcmVzaXplIG1ldGhvZFxuICBpZiAoIHRoaXMub3B0aW9ucy5pc1Jlc2l6ZUJvdW5kICkge1xuICAgIHRoaXMuYmluZFJlc2l6ZSgpO1xuICB9XG59O1xuXG4vLyBnb2VzIHRocm91Z2ggYWxsIGNoaWxkcmVuIGFnYWluIGFuZCBnZXRzIGJyaWNrcyBpbiBwcm9wZXIgb3JkZXJcbk91dGxheWVyLnByb3RvdHlwZS5yZWxvYWRJdGVtcyA9IGZ1bmN0aW9uKCkge1xuICAvLyBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAgdGhpcy5pdGVtcyA9IHRoaXMuX2l0ZW1pemUoIHRoaXMuZWxlbWVudC5jaGlsZHJlbiApO1xufTtcblxuXG4vKipcbiAqIHR1cm4gZWxlbWVudHMgaW50byBPdXRsYXllci5JdGVtcyB0byBiZSB1c2VkIGluIGxheW91dFxuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBIVE1MRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBjb2xsZWN0aW9uIG9mIG5ldyBPdXRsYXllciBJdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2l0ZW1pemUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG5cbiAgdmFyIGl0ZW1FbGVtcyA9IHRoaXMuX2ZpbHRlckZpbmRJdGVtRWxlbWVudHMoIGVsZW1zICk7XG4gIHZhciBJdGVtID0gdGhpcy5jb25zdHJ1Y3Rvci5JdGVtO1xuXG4gIC8vIGNyZWF0ZSBuZXcgT3V0bGF5ZXIgSXRlbXMgZm9yIGNvbGxlY3Rpb25cbiAgdmFyIGl0ZW1zID0gW107XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IGl0ZW1FbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgZWxlbSA9IGl0ZW1FbGVtc1tpXTtcbiAgICB2YXIgaXRlbSA9IG5ldyBJdGVtKCBlbGVtLCB0aGlzICk7XG4gICAgaXRlbXMucHVzaCggaXRlbSApO1xuICB9XG5cbiAgcmV0dXJuIGl0ZW1zO1xufTtcblxuLyoqXG4gKiBnZXQgaXRlbSBlbGVtZW50cyB0byBiZSB1c2VkIGluIGxheW91dFxuICogQHBhcmFtIHtBcnJheSBvciBOb2RlTGlzdCBvciBIVE1MRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBpdGVtIGVsZW1lbnRzXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZmlsdGVyRmluZEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgcmV0dXJuIHV0aWxzLmZpbHRlckZpbmRFbGVtZW50cyggZWxlbXMsIHRoaXMub3B0aW9ucy5pdGVtU2VsZWN0b3IgKTtcbn07XG5cbi8qKlxuICogZ2V0dGVyIG1ldGhvZCBmb3IgZ2V0dGluZyBpdGVtIGVsZW1lbnRzXG4gKiBAcmV0dXJucyB7QXJyYXl9IGVsZW1zIC0gY29sbGVjdGlvbiBvZiBpdGVtIGVsZW1lbnRzXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5nZXRJdGVtRWxlbWVudHMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGVsZW1zID0gW107XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHRoaXMuaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgZWxlbXMucHVzaCggdGhpcy5pdGVtc1tpXS5lbGVtZW50ICk7XG4gIH1cbiAgcmV0dXJuIGVsZW1zO1xufTtcblxuLy8gLS0tLS0gaW5pdCAmIGxheW91dCAtLS0tLSAvL1xuXG4vKipcbiAqIGxheXMgb3V0IGFsbCBpdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUubGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3Jlc2V0TGF5b3V0KCk7XG4gIHRoaXMuX21hbmFnZVN0YW1wcygpO1xuXG4gIC8vIGRvbid0IGFuaW1hdGUgZmlyc3QgbGF5b3V0XG4gIHZhciBpc0luc3RhbnQgPSB0aGlzLm9wdGlvbnMuaXNMYXlvdXRJbnN0YW50ICE9PSB1bmRlZmluZWQgP1xuICAgIHRoaXMub3B0aW9ucy5pc0xheW91dEluc3RhbnQgOiAhdGhpcy5faXNMYXlvdXRJbml0ZWQ7XG4gIHRoaXMubGF5b3V0SXRlbXMoIHRoaXMuaXRlbXMsIGlzSW5zdGFudCApO1xuXG4gIC8vIGZsYWcgZm9yIGluaXRhbGl6ZWRcbiAgdGhpcy5faXNMYXlvdXRJbml0ZWQgPSB0cnVlO1xufTtcblxuLy8gX2luaXQgaXMgYWxpYXMgZm9yIGxheW91dFxuT3V0bGF5ZXIucHJvdG90eXBlLl9pbml0ID0gT3V0bGF5ZXIucHJvdG90eXBlLmxheW91dDtcblxuLyoqXG4gKiBsb2dpYyBiZWZvcmUgYW55IG5ldyBsYXlvdXRcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLl9yZXNldExheW91dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdldFNpemUoKTtcbn07XG5cblxuT3V0bGF5ZXIucHJvdG90eXBlLmdldFNpemUgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG59O1xuXG4vKipcbiAqIGdldCBtZWFzdXJlbWVudCBmcm9tIG9wdGlvbiwgZm9yIGNvbHVtbldpZHRoLCByb3dIZWlnaHQsIGd1dHRlclxuICogaWYgb3B0aW9uIGlzIFN0cmluZyAtPiBnZXQgZWxlbWVudCBmcm9tIHNlbGVjdG9yIHN0cmluZywgJiBnZXQgc2l6ZSBvZiBlbGVtZW50XG4gKiBpZiBvcHRpb24gaXMgRWxlbWVudCAtPiBnZXQgc2l6ZSBvZiBlbGVtZW50XG4gKiBlbHNlIHVzZSBvcHRpb24gYXMgYSBudW1iZXJcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVhc3VyZW1lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzaXplIC0gd2lkdGggb3IgaGVpZ2h0XG4gKiBAcHJpdmF0ZVxuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2dldE1lYXN1cmVtZW50ID0gZnVuY3Rpb24oIG1lYXN1cmVtZW50LCBzaXplICkge1xuICB2YXIgb3B0aW9uID0gdGhpcy5vcHRpb25zWyBtZWFzdXJlbWVudCBdO1xuICB2YXIgZWxlbTtcbiAgaWYgKCAhb3B0aW9uICkge1xuICAgIC8vIGRlZmF1bHQgdG8gMFxuICAgIHRoaXNbIG1lYXN1cmVtZW50IF0gPSAwO1xuICB9IGVsc2Uge1xuICAgIC8vIHVzZSBvcHRpb24gYXMgYW4gZWxlbWVudFxuICAgIGlmICggdHlwZW9mIG9wdGlvbiA9PT0gJ3N0cmluZycgKSB7XG4gICAgICBlbGVtID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoIG9wdGlvbiApO1xuICAgIH0gZWxzZSBpZiAoIHV0aWxzLmlzRWxlbWVudCggb3B0aW9uICkgKSB7XG4gICAgICBlbGVtID0gb3B0aW9uO1xuICAgIH1cbiAgICAvLyB1c2Ugc2l6ZSBvZiBlbGVtZW50LCBpZiBlbGVtZW50XG4gICAgdGhpc1sgbWVhc3VyZW1lbnQgXSA9IGVsZW0gPyBnZXRTaXplKCBlbGVtIClbIHNpemUgXSA6IG9wdGlvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBsYXlvdXQgYSBjb2xsZWN0aW9uIG9mIGl0ZW0gZWxlbWVudHNcbiAqIEBhcGkgcHVibGljXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5sYXlvdXRJdGVtcyA9IGZ1bmN0aW9uKCBpdGVtcywgaXNJbnN0YW50ICkge1xuICBpdGVtcyA9IHRoaXMuX2dldEl0ZW1zRm9yTGF5b3V0KCBpdGVtcyApO1xuXG4gIHRoaXMuX2xheW91dEl0ZW1zKCBpdGVtcywgaXNJbnN0YW50ICk7XG5cbiAgdGhpcy5fcG9zdExheW91dCgpO1xufTtcblxuLyoqXG4gKiBnZXQgdGhlIGl0ZW1zIHRvIGJlIGxhaWQgb3V0XG4gKiB5b3UgbWF5IHdhbnQgdG8gc2tpcCBvdmVyIHNvbWUgaXRlbXNcbiAqIEBwYXJhbSB7QXJyYXl9IGl0ZW1zXG4gKiBAcmV0dXJucyB7QXJyYXl9IGl0ZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0SXRlbXNGb3JMYXlvdXQgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG4gIHZhciBsYXlvdXRJdGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIGlmICggIWl0ZW0uaXNJZ25vcmVkICkge1xuICAgICAgbGF5b3V0SXRlbXMucHVzaCggaXRlbSApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbGF5b3V0SXRlbXM7XG59O1xuXG4vKipcbiAqIGxheW91dCBpdGVtc1xuICogQHBhcmFtIHtBcnJheX0gaXRlbXNcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNJbnN0YW50XG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fbGF5b3V0SXRlbXMgPSBmdW5jdGlvbiggaXRlbXMsIGlzSW5zdGFudCApIHtcbiAgdGhpcy5fZW1pdENvbXBsZXRlT25JdGVtcyggJ2xheW91dCcsIGl0ZW1zICk7XG5cbiAgaWYgKCAhaXRlbXMgfHwgIWl0ZW1zLmxlbmd0aCApIHtcbiAgICAvLyBubyBpdGVtcywgZW1pdCBldmVudCB3aXRoIGVtcHR5IGFycmF5XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdmFyIHF1ZXVlID0gW107XG5cbiAgZm9yICggdmFyIGk9MCwgbGVuID0gaXRlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcbiAgICAvLyBnZXQgeC95IG9iamVjdCBmcm9tIG1ldGhvZFxuICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuX2dldEl0ZW1MYXlvdXRQb3NpdGlvbiggaXRlbSApO1xuICAgIC8vIGVucXVldWVcbiAgICBwb3NpdGlvbi5pdGVtID0gaXRlbTtcbiAgICBwb3NpdGlvbi5pc0luc3RhbnQgPSBpc0luc3RhbnQgfHwgaXRlbS5pc0xheW91dEluc3RhbnQ7XG4gICAgcXVldWUucHVzaCggcG9zaXRpb24gKTtcbiAgfVxuXG4gIHRoaXMuX3Byb2Nlc3NMYXlvdXRRdWV1ZSggcXVldWUgKTtcbn07XG5cbi8qKlxuICogZ2V0IGl0ZW0gbGF5b3V0IHBvc2l0aW9uXG4gKiBAcGFyYW0ge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqIEByZXR1cm5zIHtPYmplY3R9IHggYW5kIHkgcG9zaXRpb25cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLl9nZXRJdGVtTGF5b3V0UG9zaXRpb24gPSBmdW5jdGlvbiggLyogaXRlbSAqLyApIHtcbiAgcmV0dXJuIHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbiAgfTtcbn07XG5cbi8qKlxuICogaXRlcmF0ZSBvdmVyIGFycmF5IGFuZCBwb3NpdGlvbiBlYWNoIGl0ZW1cbiAqIFJlYXNvbiBiZWluZyAtIHNlcGFyYXRpbmcgdGhpcyBsb2dpYyBwcmV2ZW50cyAnbGF5b3V0IGludmFsaWRhdGlvbidcbiAqIHRoeCBAcGF1bF9pcmlzaFxuICogQHBhcmFtIHtBcnJheX0gcXVldWVcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLl9wcm9jZXNzTGF5b3V0UXVldWUgPSBmdW5jdGlvbiggcXVldWUgKSB7XG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IHF1ZXVlLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBvYmogPSBxdWV1ZVtpXTtcbiAgICB0aGlzLl9wb3NpdGlvbkl0ZW0oIG9iai5pdGVtLCBvYmoueCwgb2JqLnksIG9iai5pc0luc3RhbnQgKTtcbiAgfVxufTtcblxuLyoqXG4gKiBTZXRzIHBvc2l0aW9uIG9mIGl0ZW0gaW4gRE9NXG4gKiBAcGFyYW0ge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBwb3NpdGlvblxuICogQHBhcmFtIHtOdW1iZXJ9IHkgLSB2ZXJ0aWNhbCBwb3NpdGlvblxuICogQHBhcmFtIHtCb29sZWFufSBpc0luc3RhbnQgLSBkaXNhYmxlcyB0cmFuc2l0aW9uc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX3Bvc2l0aW9uSXRlbSA9IGZ1bmN0aW9uKCBpdGVtLCB4LCB5LCBpc0luc3RhbnQgKSB7XG4gIGlmICggaXNJbnN0YW50ICkge1xuICAgIC8vIGlmIG5vdCB0cmFuc2l0aW9uLCBqdXN0IHNldCBDU1NcbiAgICBpdGVtLmdvVG8oIHgsIHkgKTtcbiAgfSBlbHNlIHtcbiAgICBpdGVtLm1vdmVUbyggeCwgeSApO1xuICB9XG59O1xuXG4vKipcbiAqIEFueSBsb2dpYyB5b3Ugd2FudCB0byBkbyBhZnRlciBlYWNoIGxheW91dCxcbiAqIGkuZS4gc2l6ZSB0aGUgY29udGFpbmVyXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fcG9zdExheW91dCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnJlc2l6ZUNvbnRhaW5lcigpO1xufTtcblxuT3V0bGF5ZXIucHJvdG90eXBlLnJlc2l6ZUNvbnRhaW5lciA9IGZ1bmN0aW9uKCkge1xuICBpZiAoICF0aGlzLm9wdGlvbnMuaXNSZXNpemluZ0NvbnRhaW5lciApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIHNpemUgPSB0aGlzLl9nZXRDb250YWluZXJTaXplKCk7XG4gIGlmICggc2l6ZSApIHtcbiAgICB0aGlzLl9zZXRDb250YWluZXJNZWFzdXJlKCBzaXplLndpZHRoLCB0cnVlICk7XG4gICAgdGhpcy5fc2V0Q29udGFpbmVyTWVhc3VyZSggc2l6ZS5oZWlnaHQsIGZhbHNlICk7XG4gIH1cbn07XG5cbi8qKlxuICogU2V0cyB3aWR0aCBvciBoZWlnaHQgb2YgY29udGFpbmVyIGlmIHJldHVybmVkXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBzaXplXG4gKiAgIEBwYXJhbSB7TnVtYmVyfSB3aWR0aFxuICogICBAcGFyYW0ge051bWJlcn0gaGVpZ2h0XG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0Q29udGFpbmVyU2l6ZSA9IG5vb3A7XG5cbi8qKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1lYXN1cmUgLSBzaXplIG9mIHdpZHRoIG9yIGhlaWdodFxuICogQHBhcmFtIHtCb29sZWFufSBpc1dpZHRoXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fc2V0Q29udGFpbmVyTWVhc3VyZSA9IGZ1bmN0aW9uKCBtZWFzdXJlLCBpc1dpZHRoICkge1xuICBpZiAoIG1lYXN1cmUgPT09IHVuZGVmaW5lZCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZWxlbVNpemUgPSB0aGlzLnNpemU7XG4gIC8vIGFkZCBwYWRkaW5nIGFuZCBib3JkZXIgd2lkdGggaWYgYm9yZGVyIGJveFxuICBpZiAoIGVsZW1TaXplLmlzQm9yZGVyQm94ICkge1xuICAgIG1lYXN1cmUgKz0gaXNXaWR0aCA/IGVsZW1TaXplLnBhZGRpbmdMZWZ0ICsgZWxlbVNpemUucGFkZGluZ1JpZ2h0ICtcbiAgICAgIGVsZW1TaXplLmJvcmRlckxlZnRXaWR0aCArIGVsZW1TaXplLmJvcmRlclJpZ2h0V2lkdGggOlxuICAgICAgZWxlbVNpemUucGFkZGluZ0JvdHRvbSArIGVsZW1TaXplLnBhZGRpbmdUb3AgK1xuICAgICAgZWxlbVNpemUuYm9yZGVyVG9wV2lkdGggKyBlbGVtU2l6ZS5ib3JkZXJCb3R0b21XaWR0aDtcbiAgfVxuXG4gIG1lYXN1cmUgPSBNYXRoLm1heCggbWVhc3VyZSwgMCApO1xuICB0aGlzLmVsZW1lbnQuc3R5bGVbIGlzV2lkdGggPyAnd2lkdGgnIDogJ2hlaWdodCcgXSA9IG1lYXN1cmUgKyAncHgnO1xufTtcblxuLyoqXG4gKiBlbWl0IGV2ZW50Q29tcGxldGUgb24gYSBjb2xsZWN0aW9uIG9mIGl0ZW1zIGV2ZW50c1xuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICogQHBhcmFtIHtBcnJheX0gaXRlbXMgLSBPdXRsYXllci5JdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2VtaXRDb21wbGV0ZU9uSXRlbXMgPSBmdW5jdGlvbiggZXZlbnROYW1lLCBpdGVtcyApIHtcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgZnVuY3Rpb24gb25Db21wbGV0ZSgpIHtcbiAgICBfdGhpcy5kaXNwYXRjaEV2ZW50KCBldmVudE5hbWUgKyAnQ29tcGxldGUnLCBudWxsLCBbIGl0ZW1zIF0gKTtcbiAgfVxuXG4gIHZhciBjb3VudCA9IGl0ZW1zLmxlbmd0aDtcbiAgaWYgKCAhaXRlbXMgfHwgIWNvdW50ICkge1xuICAgIG9uQ29tcGxldGUoKTtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgZG9uZUNvdW50ID0gMDtcbiAgZnVuY3Rpb24gdGljaygpIHtcbiAgICBkb25lQ291bnQrKztcbiAgICBpZiAoIGRvbmVDb3VudCA9PT0gY291bnQgKSB7XG4gICAgICBvbkNvbXBsZXRlKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gYmluZCBjYWxsYmFja1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBpdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xuICAgIGl0ZW0ub25jZSggZXZlbnROYW1lLCB0aWNrICk7XG4gIH1cbn07XG5cbi8qKlxuICogZW1pdHMgZXZlbnRzIHZpYSBldmVudEVtaXR0ZXIgYW5kIGpRdWVyeSBldmVudHNcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlIC0gbmFtZSBvZiBldmVudFxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBvcmlnaW5hbCBldmVudFxuICogQHBhcmFtIHtBcnJheX0gYXJncyAtIGV4dHJhIGFyZ3VtZW50c1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuZGlzcGF0Y2hFdmVudCA9IGZ1bmN0aW9uKCB0eXBlLCBldmVudCwgYXJncyApIHtcbiAgLy8gYWRkIG9yaWdpbmFsIGV2ZW50IHRvIGFyZ3VtZW50c1xuICB2YXIgZW1pdEFyZ3MgPSBldmVudCA/IFsgZXZlbnQgXS5jb25jYXQoIGFyZ3MgKSA6IGFyZ3M7XG4gIHRoaXMuZW1pdEV2ZW50KCB0eXBlLCBlbWl0QXJncyApO1xuXG4gIGlmICggalF1ZXJ5ICkge1xuICAgIC8vIHNldCB0aGlzLiRlbGVtZW50XG4gICAgdGhpcy4kZWxlbWVudCA9IHRoaXMuJGVsZW1lbnQgfHwgalF1ZXJ5KCB0aGlzLmVsZW1lbnQgKTtcbiAgICBpZiAoIGV2ZW50ICkge1xuICAgICAgLy8gY3JlYXRlIGpRdWVyeSBldmVudFxuICAgICAgdmFyICRldmVudCA9IGpRdWVyeS5FdmVudCggZXZlbnQgKTtcbiAgICAgICRldmVudC50eXBlID0gdHlwZTtcbiAgICAgIHRoaXMuJGVsZW1lbnQudHJpZ2dlciggJGV2ZW50LCBhcmdzICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGp1c3QgdHJpZ2dlciB3aXRoIHR5cGUgaWYgbm8gZXZlbnQgYXZhaWxhYmxlXG4gICAgICB0aGlzLiRlbGVtZW50LnRyaWdnZXIoIHR5cGUsIGFyZ3MgKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGlnbm9yZSAmIHN0YW1wcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5cbi8qKlxuICoga2VlcCBpdGVtIGluIGNvbGxlY3Rpb24sIGJ1dCBkbyBub3QgbGF5IGl0IG91dFxuICogaWdub3JlZCBpdGVtcyBkbyBub3QgZ2V0IHNraXBwZWQgaW4gbGF5b3V0XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLmlnbm9yZSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSggZWxlbSApO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbS5pc0lnbm9yZWQgPSB0cnVlO1xuICB9XG59O1xuXG4vKipcbiAqIHJldHVybiBpdGVtIHRvIGxheW91dCBjb2xsZWN0aW9uXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLnVuaWdub3JlID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIGlmICggaXRlbSApIHtcbiAgICBkZWxldGUgaXRlbS5pc0lnbm9yZWQ7XG4gIH1cbn07XG5cbi8qKlxuICogYWRkcyBlbGVtZW50cyB0byBzdGFtcHNcbiAqIEBwYXJhbSB7Tm9kZUxpc3QsIEFycmF5LCBFbGVtZW50LCBvciBTdHJpbmd9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5zdGFtcCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB0aGlzLl9maW5kKCBlbGVtcyApO1xuICBpZiAoICFlbGVtcyApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLnN0YW1wcyA9IHRoaXMuc3RhbXBzLmNvbmNhdCggZWxlbXMgKTtcbiAgLy8gaWdub3JlXG4gIGZvciAoIHZhciBpPTAsIGxlbiA9IGVsZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBlbGVtID0gZWxlbXNbaV07XG4gICAgdGhpcy5pZ25vcmUoIGVsZW0gKTtcbiAgfVxufTtcblxuLyoqXG4gKiByZW1vdmVzIGVsZW1lbnRzIHRvIHN0YW1wc1xuICogQHBhcmFtIHtOb2RlTGlzdCwgQXJyYXksIG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS51bnN0YW1wID0gZnVuY3Rpb24oIGVsZW1zICkge1xuICBlbGVtcyA9IHRoaXMuX2ZpbmQoIGVsZW1zICk7XG4gIGlmICggIWVsZW1zICl7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZm9yICggdmFyIGk9MCwgbGVuID0gZWxlbXMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIGVsZW0gPSBlbGVtc1tpXTtcbiAgICAvLyBmaWx0ZXIgb3V0IHJlbW92ZWQgc3RhbXAgZWxlbWVudHNcbiAgICB1dGlscy5yZW1vdmVGcm9tKCB0aGlzLnN0YW1wcywgZWxlbSApO1xuICAgIHRoaXMudW5pZ25vcmUoIGVsZW0gKTtcbiAgfVxuXG59O1xuXG4vKipcbiAqIGZpbmRzIGNoaWxkIGVsZW1lbnRzXG4gKiBAcGFyYW0ge05vZGVMaXN0LCBBcnJheSwgRWxlbWVudCwgb3IgU3RyaW5nfSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBlbGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuX2ZpbmQgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIGlmICggIWVsZW1zICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBpZiBzdHJpbmcsIHVzZSBhcmd1bWVudCBhcyBzZWxlY3RvciBzdHJpbmdcbiAgaWYgKCB0eXBlb2YgZWxlbXMgPT09ICdzdHJpbmcnICkge1xuICAgIGVsZW1zID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoIGVsZW1zICk7XG4gIH1cbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHJldHVybiBlbGVtcztcbn07XG5cbk91dGxheWVyLnByb3RvdHlwZS5fbWFuYWdlU3RhbXBzID0gZnVuY3Rpb24oKSB7XG4gIGlmICggIXRoaXMuc3RhbXBzIHx8ICF0aGlzLnN0YW1wcy5sZW5ndGggKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fZ2V0Qm91bmRpbmdSZWN0KCk7XG5cbiAgZm9yICggdmFyIGk9MCwgbGVuID0gdGhpcy5zdGFtcHMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG4gICAgdmFyIHN0YW1wID0gdGhpcy5zdGFtcHNbaV07XG4gICAgdGhpcy5fbWFuYWdlU3RhbXAoIHN0YW1wICk7XG4gIH1cbn07XG5cbi8vIHVwZGF0ZSBib3VuZGluZ0xlZnQgLyBUb3Bcbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0Qm91bmRpbmdSZWN0ID0gZnVuY3Rpb24oKSB7XG4gIC8vIGdldCBib3VuZGluZyByZWN0IGZvciBjb250YWluZXIgZWxlbWVudFxuICB2YXIgYm91bmRpbmdSZWN0ID0gdGhpcy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICB2YXIgc2l6ZSA9IHRoaXMuc2l6ZTtcbiAgdGhpcy5fYm91bmRpbmdSZWN0ID0ge1xuICAgIGxlZnQ6IGJvdW5kaW5nUmVjdC5sZWZ0ICsgc2l6ZS5wYWRkaW5nTGVmdCArIHNpemUuYm9yZGVyTGVmdFdpZHRoLFxuICAgIHRvcDogYm91bmRpbmdSZWN0LnRvcCArIHNpemUucGFkZGluZ1RvcCArIHNpemUuYm9yZGVyVG9wV2lkdGgsXG4gICAgcmlnaHQ6IGJvdW5kaW5nUmVjdC5yaWdodCAtICggc2l6ZS5wYWRkaW5nUmlnaHQgKyBzaXplLmJvcmRlclJpZ2h0V2lkdGggKSxcbiAgICBib3R0b206IGJvdW5kaW5nUmVjdC5ib3R0b20gLSAoIHNpemUucGFkZGluZ0JvdHRvbSArIHNpemUuYm9yZGVyQm90dG9tV2lkdGggKVxuICB9O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IHN0YW1wXG4qKi9cbk91dGxheWVyLnByb3RvdHlwZS5fbWFuYWdlU3RhbXAgPSBub29wO1xuXG4vKipcbiAqIGdldCB4L3kgcG9zaXRpb24gb2YgZWxlbWVudCByZWxhdGl2ZSB0byBjb250YWluZXIgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBvZmZzZXQgLSBoYXMgbGVmdCwgdG9wLCByaWdodCwgYm90dG9tXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5fZ2V0RWxlbWVudE9mZnNldCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICB2YXIgYm91bmRpbmdSZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgdmFyIHRoaXNSZWN0ID0gdGhpcy5fYm91bmRpbmdSZWN0O1xuICB2YXIgc2l6ZSA9IGdldFNpemUoIGVsZW0gKTtcbiAgdmFyIG9mZnNldCA9IHtcbiAgICBsZWZ0OiBib3VuZGluZ1JlY3QubGVmdCAtIHRoaXNSZWN0LmxlZnQgLSBzaXplLm1hcmdpbkxlZnQsXG4gICAgdG9wOiBib3VuZGluZ1JlY3QudG9wIC0gdGhpc1JlY3QudG9wIC0gc2l6ZS5tYXJnaW5Ub3AsXG4gICAgcmlnaHQ6IHRoaXNSZWN0LnJpZ2h0IC0gYm91bmRpbmdSZWN0LnJpZ2h0IC0gc2l6ZS5tYXJnaW5SaWdodCxcbiAgICBib3R0b206IHRoaXNSZWN0LmJvdHRvbSAtIGJvdW5kaW5nUmVjdC5ib3R0b20gLSBzaXplLm1hcmdpbkJvdHRvbVxuICB9O1xuICByZXR1cm4gb2Zmc2V0O1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcmVzaXplIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGVuYWJsZSBldmVudCBoYW5kbGVycyBmb3IgbGlzdGVuZXJzXG4vLyBpLmUuIHJlc2l6ZSAtPiBvbnJlc2l6ZVxuT3V0bGF5ZXIucHJvdG90eXBlLmhhbmRsZUV2ZW50ID0gZnVuY3Rpb24oIGV2ZW50ICkge1xuICB2YXIgbWV0aG9kID0gJ29uJyArIGV2ZW50LnR5cGU7XG4gIGlmICggdGhpc1sgbWV0aG9kIF0gKSB7XG4gICAgdGhpc1sgbWV0aG9kIF0oIGV2ZW50ICk7XG4gIH1cbn07XG5cbi8qKlxuICogQmluZCBsYXlvdXQgdG8gd2luZG93IHJlc2l6aW5nXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5iaW5kUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIC8vIGJpbmQganVzdCBvbmUgbGlzdGVuZXJcbiAgaWYgKCB0aGlzLmlzUmVzaXplQm91bmQgKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50aWUuYmluZCggd2luZG93LCAncmVzaXplJywgdGhpcyApO1xuICB0aGlzLmlzUmVzaXplQm91bmQgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBVbmJpbmQgbGF5b3V0IHRvIHdpbmRvdyByZXNpemluZ1xuICovXG5PdXRsYXllci5wcm90b3R5cGUudW5iaW5kUmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5pc1Jlc2l6ZUJvdW5kICkge1xuICAgIGV2ZW50aWUudW5iaW5kKCB3aW5kb3csICdyZXNpemUnLCB0aGlzICk7XG4gIH1cbiAgdGhpcy5pc1Jlc2l6ZUJvdW5kID0gZmFsc2U7XG59O1xuXG4vLyBvcmlnaW5hbCBkZWJvdW5jZSBieSBKb2huIEhhbm5cbi8vIGh0dHA6Ly91bnNjcmlwdGFibGUuY29tL2luZGV4LnBocC8yMDA5LzAzLzIwL2RlYm91bmNpbmctamF2YXNjcmlwdC1tZXRob2RzL1xuXG4vLyB0aGlzIGZpcmVzIGV2ZXJ5IHJlc2l6ZVxuT3V0bGF5ZXIucHJvdG90eXBlLm9ucmVzaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5yZXNpemVUaW1lb3V0ICkge1xuICAgIGNsZWFyVGltZW91dCggdGhpcy5yZXNpemVUaW1lb3V0ICk7XG4gIH1cblxuICB2YXIgX3RoaXMgPSB0aGlzO1xuICBmdW5jdGlvbiBkZWxheWVkKCkge1xuICAgIF90aGlzLnJlc2l6ZSgpO1xuICAgIGRlbGV0ZSBfdGhpcy5yZXNpemVUaW1lb3V0O1xuICB9XG5cbiAgdGhpcy5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCggZGVsYXllZCwgMTAwICk7XG59O1xuXG4vLyBkZWJvdW5jZWQsIGxheW91dCBvbiByZXNpemVcbk91dGxheWVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG9uJ3QgdHJpZ2dlciBpZiBzaXplIGRpZCBub3QgY2hhbmdlXG4gIC8vIG9yIGlmIHJlc2l6ZSB3YXMgdW5ib3VuZC4gU2VlICM5XG4gIGlmICggIXRoaXMuaXNSZXNpemVCb3VuZCB8fCAhdGhpcy5uZWVkc1Jlc2l6ZUxheW91dCgpICkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRoaXMubGF5b3V0KCk7XG59O1xuXG4vKipcbiAqIGNoZWNrIGlmIGxheW91dCBpcyBuZWVkZWQgcG9zdCBsYXlvdXRcbiAqIEByZXR1cm5zIEJvb2xlYW5cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLm5lZWRzUmVzaXplTGF5b3V0ID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNoZWNrIHRoYXQgdGhpcy5zaXplIGFuZCBzaXplIGFyZSB0aGVyZVxuICAvLyBJRTggdHJpZ2dlcnMgcmVzaXplIG9uIGJvZHkgc2l6ZSBjaGFuZ2UsIHNvIHRoZXkgbWlnaHQgbm90IGJlXG4gIHZhciBoYXNTaXplcyA9IHRoaXMuc2l6ZSAmJiBzaXplO1xuICByZXR1cm4gaGFzU2l6ZXMgJiYgc2l6ZS5pbm5lcldpZHRoICE9PSB0aGlzLnNpemUuaW5uZXJXaWR0aDtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIG1ldGhvZHMgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBhZGQgaXRlbXMgdG8gT3V0bGF5ZXIgaW5zdGFuY2VcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqIEByZXR1cm5zIHtBcnJheX0gaXRlbXMgLSBPdXRsYXllci5JdGVtc1xuKiovXG5PdXRsYXllci5wcm90b3R5cGUuYWRkSXRlbXMgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciBpdGVtcyA9IHRoaXMuX2l0ZW1pemUoIGVsZW1zICk7XG4gIC8vIGFkZCBpdGVtcyB0byBjb2xsZWN0aW9uXG4gIGlmICggaXRlbXMubGVuZ3RoICkge1xuICAgIHRoaXMuaXRlbXMgPSB0aGlzLml0ZW1zLmNvbmNhdCggaXRlbXMgKTtcbiAgfVxuICByZXR1cm4gaXRlbXM7XG59O1xuXG4vKipcbiAqIExheW91dCBuZXdseS1hcHBlbmRlZCBpdGVtIGVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5hcHBlbmRlZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5hZGRJdGVtcyggZWxlbXMgKTtcbiAgaWYgKCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBsYXlvdXQgYW5kIHJldmVhbCBqdXN0IHRoZSBuZXcgaXRlbXNcbiAgdGhpcy5sYXlvdXRJdGVtcyggaXRlbXMsIHRydWUgKTtcbiAgdGhpcy5yZXZlYWwoIGl0ZW1zICk7XG59O1xuXG4vKipcbiAqIExheW91dCBwcmVwZW5kZWQgZWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXkgb3IgTm9kZUxpc3Qgb3IgRWxlbWVudH0gZWxlbXNcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLnByZXBlbmRlZCA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5faXRlbWl6ZSggZWxlbXMgKTtcbiAgaWYgKCAhaXRlbXMubGVuZ3RoICkge1xuICAgIHJldHVybjtcbiAgfVxuICAvLyBhZGQgaXRlbXMgdG8gYmVnaW5uaW5nIG9mIGNvbGxlY3Rpb25cbiAgdmFyIHByZXZpb3VzSXRlbXMgPSB0aGlzLml0ZW1zLnNsaWNlKDApO1xuICB0aGlzLml0ZW1zID0gaXRlbXMuY29uY2F0KCBwcmV2aW91c0l0ZW1zICk7XG4gIC8vIHN0YXJ0IG5ldyBsYXlvdXRcbiAgdGhpcy5fcmVzZXRMYXlvdXQoKTtcbiAgdGhpcy5fbWFuYWdlU3RhbXBzKCk7XG4gIC8vIGxheW91dCBuZXcgc3R1ZmYgd2l0aG91dCB0cmFuc2l0aW9uXG4gIHRoaXMubGF5b3V0SXRlbXMoIGl0ZW1zLCB0cnVlICk7XG4gIHRoaXMucmV2ZWFsKCBpdGVtcyApO1xuICAvLyBsYXlvdXQgcHJldmlvdXMgaXRlbXNcbiAgdGhpcy5sYXlvdXRJdGVtcyggcHJldmlvdXNJdGVtcyApO1xufTtcblxuLyoqXG4gKiByZXZlYWwgYSBjb2xsZWN0aW9uIG9mIGl0ZW1zXG4gKiBAcGFyYW0ge0FycmF5IG9mIE91dGxheWVyLkl0ZW1zfSBpdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUucmV2ZWFsID0gZnVuY3Rpb24oIGl0ZW1zICkge1xuICB0aGlzLl9lbWl0Q29tcGxldGVPbkl0ZW1zKCAncmV2ZWFsJywgaXRlbXMgKTtcblxuICB2YXIgbGVuID0gaXRlbXMgJiYgaXRlbXMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT0wOyBsZW4gJiYgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgaXRlbS5yZXZlYWwoKTtcbiAgfVxufTtcblxuLyoqXG4gKiBoaWRlIGEgY29sbGVjdGlvbiBvZiBpdGVtc1xuICogQHBhcmFtIHtBcnJheSBvZiBPdXRsYXllci5JdGVtc30gaXRlbXNcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiggaXRlbXMgKSB7XG4gIHRoaXMuX2VtaXRDb21wbGV0ZU9uSXRlbXMoICdoaWRlJywgaXRlbXMgKTtcblxuICB2YXIgbGVuID0gaXRlbXMgJiYgaXRlbXMubGVuZ3RoO1xuICBmb3IgKCB2YXIgaT0wOyBsZW4gJiYgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gaXRlbXNbaV07XG4gICAgaXRlbS5oaWRlKCk7XG4gIH1cbn07XG5cbi8qKlxuICogcmV2ZWFsIGl0ZW0gZWxlbWVudHNcbiAqIEBwYXJhbSB7QXJyYXl9LCB7RWxlbWVudH0sIHtOb2RlTGlzdH0gaXRlbXNcbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLnJldmVhbEl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5nZXRJdGVtcyggZWxlbXMgKTtcbiAgdGhpcy5yZXZlYWwoIGl0ZW1zICk7XG59O1xuXG4vKipcbiAqIGhpZGUgaXRlbSBlbGVtZW50c1xuICogQHBhcmFtIHtBcnJheX0sIHtFbGVtZW50fSwge05vZGVMaXN0fSBpdGVtc1xuICovXG5PdXRsYXllci5wcm90b3R5cGUuaGlkZUl0ZW1FbGVtZW50cyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgdmFyIGl0ZW1zID0gdGhpcy5nZXRJdGVtcyggZWxlbXMgKTtcbiAgdGhpcy5oaWRlKCBpdGVtcyApO1xufTtcblxuLyoqXG4gKiBnZXQgT3V0bGF5ZXIuSXRlbSwgZ2l2ZW4gYW4gRWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFja1xuICogQHJldHVybnMge091dGxheWVyLkl0ZW19IGl0ZW1cbiAqL1xuT3V0bGF5ZXIucHJvdG90eXBlLmdldEl0ZW0gPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgLy8gbG9vcCB0aHJvdWdoIGl0ZW1zIHRvIGdldCB0aGUgb25lIHRoYXQgbWF0Y2hlc1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICBpZiAoIGl0ZW0uZWxlbWVudCA9PT0gZWxlbSApIHtcbiAgICAgIC8vIHJldHVybiBpdGVtXG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG4gIH1cbn07XG5cbi8qKlxuICogZ2V0IGNvbGxlY3Rpb24gb2YgT3V0bGF5ZXIuSXRlbXMsIGdpdmVuIEVsZW1lbnRzXG4gKiBAcGFyYW0ge0FycmF5fSBlbGVtc1xuICogQHJldHVybnMge0FycmF5fSBpdGVtcyAtIE91dGxheWVyLkl0ZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5nZXRJdGVtcyA9IGZ1bmN0aW9uKCBlbGVtcyApIHtcbiAgZWxlbXMgPSB1dGlscy5tYWtlQXJyYXkoIGVsZW1zICk7XG4gIHZhciBpdGVtcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBlbGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgZWxlbSA9IGVsZW1zW2ldO1xuICAgIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gICAgaWYgKCBpdGVtICkge1xuICAgICAgaXRlbXMucHVzaCggaXRlbSApO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpdGVtcztcbn07XG5cbi8qKlxuICogcmVtb3ZlIGVsZW1lbnQocykgZnJvbSBpbnN0YW5jZSBhbmQgRE9NXG4gKiBAcGFyYW0ge0FycmF5IG9yIE5vZGVMaXN0IG9yIEVsZW1lbnR9IGVsZW1zXG4gKi9cbk91dGxheWVyLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiggZWxlbXMgKSB7XG4gIHZhciByZW1vdmVJdGVtcyA9IHRoaXMuZ2V0SXRlbXMoIGVsZW1zICk7XG5cbiAgdGhpcy5fZW1pdENvbXBsZXRlT25JdGVtcyggJ3JlbW92ZScsIHJlbW92ZUl0ZW1zICk7XG5cbiAgLy8gYmFpbCBpZiBubyBpdGVtcyB0byByZW1vdmVcbiAgaWYgKCAhcmVtb3ZlSXRlbXMgfHwgIXJlbW92ZUl0ZW1zLmxlbmd0aCApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSByZW1vdmVJdGVtcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgaXRlbSA9IHJlbW92ZUl0ZW1zW2ldO1xuICAgIGl0ZW0ucmVtb3ZlKCk7XG4gICAgLy8gcmVtb3ZlIGl0ZW0gZnJvbSBjb2xsZWN0aW9uXG4gICAgdXRpbHMucmVtb3ZlRnJvbSggdGhpcy5pdGVtcywgaXRlbSApO1xuICB9XG59O1xuXG4vLyAtLS0tLSBkZXN0cm95IC0tLS0tIC8vXG5cbi8vIHJlbW92ZSBhbmQgZGlzYWJsZSBPdXRsYXllciBpbnN0YW5jZVxuT3V0bGF5ZXIucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgLy8gY2xlYW4gdXAgZHluYW1pYyBzdHlsZXNcbiAgdmFyIHN0eWxlID0gdGhpcy5lbGVtZW50LnN0eWxlO1xuICBzdHlsZS5oZWlnaHQgPSAnJztcbiAgc3R5bGUucG9zaXRpb24gPSAnJztcbiAgc3R5bGUud2lkdGggPSAnJztcbiAgLy8gZGVzdHJveSBpdGVtc1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLml0ZW1zLmxlbmd0aDsgaSA8IGxlbjsgaSsrICkge1xuICAgIHZhciBpdGVtID0gdGhpcy5pdGVtc1tpXTtcbiAgICBpdGVtLmRlc3Ryb3koKTtcbiAgfVxuXG4gIHRoaXMudW5iaW5kUmVzaXplKCk7XG5cbiAgdmFyIGlkID0gdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRDtcbiAgZGVsZXRlIGluc3RhbmNlc1sgaWQgXTsgLy8gcmVtb3ZlIHJlZmVyZW5jZSB0byBpbnN0YW5jZSBieSBpZFxuICBkZWxldGUgdGhpcy5lbGVtZW50Lm91dGxheWVyR1VJRDtcbiAgLy8gcmVtb3ZlIGRhdGEgZm9yIGpRdWVyeVxuICBpZiAoIGpRdWVyeSApIHtcbiAgICBqUXVlcnkucmVtb3ZlRGF0YSggdGhpcy5lbGVtZW50LCB0aGlzLmNvbnN0cnVjdG9yLm5hbWVzcGFjZSApO1xuICB9XG5cbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRhdGEgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBnZXQgT3V0bGF5ZXIgaW5zdGFuY2UgZnJvbSBlbGVtZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEByZXR1cm5zIHtPdXRsYXllcn1cbiAqL1xuT3V0bGF5ZXIuZGF0YSA9IGZ1bmN0aW9uKCBlbGVtICkge1xuICBlbGVtID0gdXRpbHMuZ2V0UXVlcnlFbGVtZW50KCBlbGVtICk7XG4gIHZhciBpZCA9IGVsZW0gJiYgZWxlbS5vdXRsYXllckdVSUQ7XG4gIHJldHVybiBpZCAmJiBpbnN0YW5jZXNbIGlkIF07XG59O1xuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGNyZWF0ZSBPdXRsYXllciBjbGFzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGNyZWF0ZSBhIGxheW91dCBjbGFzc1xuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZVxuICovXG5PdXRsYXllci5jcmVhdGUgPSBmdW5jdGlvbiggbmFtZXNwYWNlLCBvcHRpb25zICkge1xuICAvLyBzdWItY2xhc3MgT3V0bGF5ZXJcbiAgZnVuY3Rpb24gTGF5b3V0KCkge1xuICAgIE91dGxheWVyLmFwcGx5KCB0aGlzLCBhcmd1bWVudHMgKTtcbiAgfVxuICAvLyBpbmhlcml0IE91dGxheWVyIHByb3RvdHlwZSwgdXNlIE9iamVjdC5jcmVhdGUgaWYgdGhlcmVcbiAgaWYgKCBPYmplY3QuY3JlYXRlICkge1xuICAgIExheW91dC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKCBPdXRsYXllci5wcm90b3R5cGUgKTtcbiAgfSBlbHNlIHtcbiAgICB1dGlscy5leHRlbmQoIExheW91dC5wcm90b3R5cGUsIE91dGxheWVyLnByb3RvdHlwZSApO1xuICB9XG4gIC8vIHNldCBjb250cnVjdG9yLCB1c2VkIGZvciBuYW1lc3BhY2UgYW5kIEl0ZW1cbiAgTGF5b3V0LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IExheW91dDtcblxuICBMYXlvdXQuZGVmYXVsdHMgPSB1dGlscy5leHRlbmQoIHt9LCBPdXRsYXllci5kZWZhdWx0cyApO1xuICAvLyBhcHBseSBuZXcgb3B0aW9uc1xuICB1dGlscy5leHRlbmQoIExheW91dC5kZWZhdWx0cywgb3B0aW9ucyApO1xuICAvLyBrZWVwIHByb3RvdHlwZS5zZXR0aW5ncyBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgKFBhY2tlcnkgdjEuMi4wKVxuICBMYXlvdXQucHJvdG90eXBlLnNldHRpbmdzID0ge307XG5cbiAgTGF5b3V0Lm5hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblxuICBMYXlvdXQuZGF0YSA9IE91dGxheWVyLmRhdGE7XG5cbiAgLy8gc3ViLWNsYXNzIEl0ZW1cbiAgTGF5b3V0Lkl0ZW0gPSBmdW5jdGlvbiBMYXlvdXRJdGVtKCkge1xuICAgIEl0ZW0uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xuICB9O1xuXG4gIExheW91dC5JdGVtLnByb3RvdHlwZSA9IG5ldyBJdGVtKCk7XG5cbiAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZGVjbGFyYXRpdmUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuICB1dGlscy5odG1sSW5pdCggTGF5b3V0LCBuYW1lc3BhY2UgKTtcblxuICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBqUXVlcnkgYnJpZGdlIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbiAgLy8gbWFrZSBpbnRvIGpRdWVyeSBwbHVnaW5cbiAgaWYgKCBqUXVlcnkgJiYgalF1ZXJ5LmJyaWRnZXQgKSB7XG4gICAgalF1ZXJ5LmJyaWRnZXQoIG5hbWVzcGFjZSwgTGF5b3V0ICk7XG4gIH1cblxuICByZXR1cm4gTGF5b3V0O1xufTtcblxuLy8gLS0tLS0gZmluIC0tLS0tIC8vXG5cbi8vIGJhY2sgaW4gZ2xvYmFsXG5PdXRsYXllci5JdGVtID0gSXRlbTtcblxucmV0dXJuIE91dGxheWVyO1xuXG59KSk7XG5cbiIsIi8qKlxuICogUGFja2VyeSBJdGVtIEVsZW1lbnRcbioqL1xuXG4oIGZ1bmN0aW9uKCB3aW5kb3csIGZhY3RvcnkgKSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgLy8gdW5pdmVyc2FsIG1vZHVsZSBkZWZpbml0aW9uXG5cbiAgaWYgKCB0eXBlb2YgZGVmaW5lID09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCApIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoIFtcbiAgICAgICAgJ2dldC1zdHlsZS1wcm9wZXJ0eS9nZXQtc3R5bGUtcHJvcGVydHknLFxuICAgICAgICAnb3V0bGF5ZXIvb3V0bGF5ZXInLFxuICAgICAgICAnLi9yZWN0J1xuICAgICAgXSxcbiAgICAgIGZhY3RvcnkgKTtcbiAgfSBlbHNlIGlmICggdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoXG4gICAgICByZXF1aXJlKCdkZXNhbmRyby1nZXQtc3R5bGUtcHJvcGVydHknKSxcbiAgICAgIHJlcXVpcmUoJ291dGxheWVyJyksXG4gICAgICByZXF1aXJlKCcuL3JlY3QnKVxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgLy8gYnJvd3NlciBnbG9iYWxcbiAgICB3aW5kb3cuUGFja2VyeS5JdGVtID0gZmFjdG9yeShcbiAgICAgIHdpbmRvdy5nZXRTdHlsZVByb3BlcnR5LFxuICAgICAgd2luZG93Lk91dGxheWVyLFxuICAgICAgd2luZG93LlBhY2tlcnkuUmVjdFxuICAgICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBnZXRTdHlsZVByb3BlcnR5LCBPdXRsYXllciwgUmVjdCApIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gSXRlbSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG52YXIgdHJhbnNmb3JtUHJvcGVydHkgPSBnZXRTdHlsZVByb3BlcnR5KCd0cmFuc2Zvcm0nKTtcblxuLy8gc3ViLWNsYXNzIEl0ZW1cbnZhciBJdGVtID0gZnVuY3Rpb24gUGFja2VyeUl0ZW0oKSB7XG4gIE91dGxheWVyLkl0ZW0uYXBwbHkoIHRoaXMsIGFyZ3VtZW50cyApO1xufTtcblxuSXRlbS5wcm90b3R5cGUgPSBuZXcgT3V0bGF5ZXIuSXRlbSgpO1xuXG52YXIgcHJvdG9DcmVhdGUgPSBJdGVtLnByb3RvdHlwZS5fY3JlYXRlO1xuSXRlbS5wcm90b3R5cGUuX2NyZWF0ZSA9IGZ1bmN0aW9uKCkge1xuICAvLyBjYWxsIGRlZmF1bHQgX2NyZWF0ZSBsb2dpY1xuICBwcm90b0NyZWF0ZS5jYWxsKCB0aGlzICk7XG4gIHRoaXMucmVjdCA9IG5ldyBSZWN0KCk7XG4gIC8vIHJlY3QgdXNlZCBmb3IgcGxhY2luZywgaW4gZHJhZyBvciBQYWNrZXJ5LmZpdCgpXG4gIHRoaXMucGxhY2VSZWN0ID0gbmV3IFJlY3QoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIGRyYWcgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuSXRlbS5wcm90b3R5cGUuZHJhZ1N0YXJ0ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2V0UG9zaXRpb24oKTtcbiAgdGhpcy5yZW1vdmVUcmFuc2l0aW9uU3R5bGVzKCk7XG4gIC8vIHJlbW92ZSB0cmFuc2Zvcm0gcHJvcGVydHkgZnJvbSB0cmFuc2l0aW9uXG4gIGlmICggdGhpcy5pc1RyYW5zaXRpb25pbmcgJiYgdHJhbnNmb3JtUHJvcGVydHkgKSB7XG4gICAgdGhpcy5lbGVtZW50LnN0eWxlWyB0cmFuc2Zvcm1Qcm9wZXJ0eSBdID0gJ25vbmUnO1xuICB9XG4gIHRoaXMuZ2V0U2l6ZSgpO1xuICAvLyBjcmVhdGUgcGxhY2UgcmVjdCwgdXNlZCBmb3IgcG9zaXRpb24gd2hlbiBkcmFnZ2VkIHRoZW4gZHJvcHBlZFxuICAvLyBvciB3aGVuIHBvc2l0aW9uaW5nXG4gIHRoaXMuaXNQbGFjaW5nID0gdHJ1ZTtcbiAgdGhpcy5uZWVkc1Bvc2l0aW9uaW5nID0gZmFsc2U7XG4gIHRoaXMucG9zaXRpb25QbGFjZVJlY3QoIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICk7XG4gIHRoaXMuaXNUcmFuc2l0aW9uaW5nID0gZmFsc2U7XG4gIHRoaXMuZGlkRHJhZyA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBoYW5kbGUgaXRlbSB3aGVuIGl0IGlzIGRyYWdnZWRcbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBwb3NpdGlvbiBvZiBkcmFnZ2VkIGl0ZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gdmVydGljYWwgcG9zaXRpb24gb2YgZHJhZ2dlZCBpdGVtXG4gKi9cbkl0ZW0ucHJvdG90eXBlLmRyYWdNb3ZlID0gZnVuY3Rpb24oIHgsIHkgKSB7XG4gIHRoaXMuZGlkRHJhZyA9IHRydWU7XG4gIHZhciBwYWNrZXJ5U2l6ZSA9IHRoaXMubGF5b3V0LnNpemU7XG4gIHggLT0gcGFja2VyeVNpemUucGFkZGluZ0xlZnQ7XG4gIHkgLT0gcGFja2VyeVNpemUucGFkZGluZ1RvcDtcbiAgdGhpcy5wb3NpdGlvblBsYWNlUmVjdCggeCwgeSApO1xufTtcblxuSXRlbS5wcm90b3R5cGUuZHJhZ1N0b3AgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nZXRQb3NpdGlvbigpO1xuICB2YXIgaXNEaWZmWCA9IHRoaXMucG9zaXRpb24ueCAhPSB0aGlzLnBsYWNlUmVjdC54O1xuICB2YXIgaXNEaWZmWSA9IHRoaXMucG9zaXRpb24ueSAhPSB0aGlzLnBsYWNlUmVjdC55O1xuICAvLyBzZXQgcG9zdC1kcmFnIHBvc2l0aW9uaW5nIGZsYWdcbiAgdGhpcy5uZWVkc1Bvc2l0aW9uaW5nID0gaXNEaWZmWCB8fCBpc0RpZmZZO1xuICAvLyByZXNldCBmbGFnXG4gIHRoaXMuZGlkRHJhZyA9IGZhbHNlO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gcGxhY2luZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIHBvc2l0aW9uIGEgcmVjdCB0aGF0IHdpbGwgb2NjdXB5IHNwYWNlIGluIHRoZSBwYWNrZXJcbiAqIEBwYXJhbSB7TnVtYmVyfSB4XG4gKiBAcGFyYW0ge051bWJlcn0geVxuICogQHBhcmFtIHtCb29sZWFufSBpc01heFlDb250YWluZWRcbiAqL1xuSXRlbS5wcm90b3R5cGUucG9zaXRpb25QbGFjZVJlY3QgPSBmdW5jdGlvbiggeCwgeSwgaXNNYXhZT3BlbiApIHtcbiAgdGhpcy5wbGFjZVJlY3QueCA9IHRoaXMuZ2V0UGxhY2VSZWN0Q29vcmQoIHgsIHRydWUgKTtcbiAgdGhpcy5wbGFjZVJlY3QueSA9IHRoaXMuZ2V0UGxhY2VSZWN0Q29vcmQoIHksIGZhbHNlLCBpc01heFlPcGVuICk7XG59O1xuXG4vKipcbiAqIGdldCB4L3kgY29vcmRpbmF0ZSBmb3IgcGxhY2UgcmVjdFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvb3JkIC0geCBvciB5XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGlzWFxuICogQHBhcmFtIHtCb29sZWFufSBpc01heE9wZW4gLSBkb2VzIG5vdCBsaW1pdCB2YWx1ZSB0byBvdXRlciBib3VuZFxuICogQHJldHVybnMge051bWJlcn0gY29vcmQgLSBwcm9jZXNzZWQgeCBvciB5XG4gKi9cbkl0ZW0ucHJvdG90eXBlLmdldFBsYWNlUmVjdENvb3JkID0gZnVuY3Rpb24oIGNvb3JkLCBpc1gsIGlzTWF4T3BlbiApIHtcbiAgdmFyIG1lYXN1cmUgPSBpc1ggPyAnV2lkdGgnIDogJ0hlaWdodCc7XG4gIHZhciBzaXplID0gdGhpcy5zaXplWyAnb3V0ZXInICsgbWVhc3VyZSBdO1xuICB2YXIgc2VnbWVudCA9IHRoaXMubGF5b3V0WyBpc1ggPyAnY29sdW1uV2lkdGgnIDogJ3Jvd0hlaWdodCcgXTtcbiAgdmFyIHBhcmVudFNpemUgPSB0aGlzLmxheW91dC5zaXplWyAnaW5uZXInICsgbWVhc3VyZSBdO1xuXG4gIC8vIGFkZGl0aW9uYWwgcGFyZW50U2l6ZSBjYWxjdWxhdGlvbnMgZm9yIFlcbiAgaWYgKCAhaXNYICkge1xuICAgIHBhcmVudFNpemUgPSBNYXRoLm1heCggcGFyZW50U2l6ZSwgdGhpcy5sYXlvdXQubWF4WSApO1xuICAgIC8vIHByZXZlbnQgZ3V0dGVyIGZyb20gYnVtcGluZyB1cCBoZWlnaHQgd2hlbiBub24tdmVydGljYWwgZ3JpZFxuICAgIGlmICggIXRoaXMubGF5b3V0LnJvd0hlaWdodCApIHtcbiAgICAgIHBhcmVudFNpemUgLT0gdGhpcy5sYXlvdXQuZ3V0dGVyO1xuICAgIH1cbiAgfVxuXG4gIHZhciBtYXg7XG5cbiAgaWYgKCBzZWdtZW50ICkge1xuICAgIHNlZ21lbnQgKz0gdGhpcy5sYXlvdXQuZ3V0dGVyO1xuICAgIC8vIGFsbG93IGZvciBsYXN0IGNvbHVtbiB0byByZWFjaCB0aGUgZWRnZVxuICAgIHBhcmVudFNpemUgKz0gaXNYID8gdGhpcy5sYXlvdXQuZ3V0dGVyIDogMDtcbiAgICAvLyBzbmFwIHRvIGNsb3Nlc3Qgc2VnbWVudFxuICAgIGNvb3JkID0gTWF0aC5yb3VuZCggY29vcmQgLyBzZWdtZW50ICk7XG4gICAgLy8gY29udGFpbiB0byBvdXRlciBib3VuZFxuICAgIC8vIGNvbnRhaW4gbm9uLWdyb3dpbmcgYm91bmQsIGFsbG93IGdyb3dpbmcgYm91bmQgdG8gZ3Jvd1xuICAgIHZhciBtYXRoTWV0aG9kO1xuICAgIGlmICggdGhpcy5sYXlvdXQub3B0aW9ucy5pc0hvcml6b250YWwgKSB7XG4gICAgICBtYXRoTWV0aG9kID0gIWlzWCA/ICdmbG9vcicgOiAnY2VpbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG1hdGhNZXRob2QgPSBpc1ggPyAnZmxvb3InIDogJ2NlaWwnO1xuICAgIH1cbiAgICB2YXIgbWF4U2VnbWVudHMgPSBNYXRoWyBtYXRoTWV0aG9kIF0oIHBhcmVudFNpemUgLyBzZWdtZW50ICk7XG4gICAgbWF4U2VnbWVudHMgLT0gTWF0aC5jZWlsKCBzaXplIC8gc2VnbWVudCApO1xuICAgIG1heCA9IG1heFNlZ21lbnRzO1xuICB9IGVsc2Uge1xuICAgIG1heCA9IHBhcmVudFNpemUgLSBzaXplO1xuICB9XG5cbiAgY29vcmQgPSBpc01heE9wZW4gPyBjb29yZCA6IE1hdGgubWluKCBjb29yZCwgbWF4ICk7XG4gIGNvb3JkICo9IHNlZ21lbnQgfHwgMTtcblxuICByZXR1cm4gTWF0aC5tYXgoIDAsIGNvb3JkICk7XG59O1xuXG5JdGVtLnByb3RvdHlwZS5jb3B5UGxhY2VSZWN0UG9zaXRpb24gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5yZWN0LnggPSB0aGlzLnBsYWNlUmVjdC54O1xuICB0aGlzLnJlY3QueSA9IHRoaXMucGxhY2VSZWN0Lnk7XG59O1xuXG4vLyAtLS0tLSAgLS0tLS0gLy9cblxuLy8gcmVtb3ZlIGVsZW1lbnQgZnJvbSBET01cbkl0ZW0ucHJvdG90eXBlLnJlbW92ZUVsZW0gPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5lbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoIHRoaXMuZWxlbWVudCApO1xuICAvLyBhZGQgc3BhY2UgYmFjayB0byBwYWNrZXJcbiAgdGhpcy5sYXlvdXQucGFja2VyLmFkZFNwYWNlKCB0aGlzLnJlY3QgKTtcbiAgdGhpcy5lbWl0RXZlbnQoICdyZW1vdmUnLCBbIHRoaXMgXSApO1xufTtcblxuLy8gLS0tLS0gIC0tLS0tIC8vXG5cbnJldHVybiBJdGVtO1xuXG59KSk7XG4iLCIvKipcbiAqIFBhY2tlclxuICogYmluLXBhY2tpbmcgYWxnb3JpdGhtXG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggWyAnLi9yZWN0JyBdLCBmYWN0b3J5ICk7XG4gIH0gZWxzZSBpZiAoIHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICkge1xuICAgIC8vIENvbW1vbkpTXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KFxuICAgICAgcmVxdWlyZSgnLi9yZWN0JylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgdmFyIFBhY2tlcnkgPSB3aW5kb3cuUGFja2VyeSA9IHdpbmRvdy5QYWNrZXJ5IHx8IHt9O1xuICAgIFBhY2tlcnkuUGFja2VyID0gZmFjdG9yeSggUGFja2VyeS5SZWN0ICk7XG4gIH1cblxufSggd2luZG93LCBmdW5jdGlvbiBmYWN0b3J5KCBSZWN0ICkge1xuJ3VzZSBzdHJpY3QnO1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWNrZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBAcGFyYW0ge051bWJlcn0gd2lkdGhcbiAqIEBwYXJhbSB7TnVtYmVyfSBoZWlnaHRcbiAqIEBwYXJhbSB7U3RyaW5nfSBzb3J0RGlyZWN0aW9uXG4gKiAgIHRvcExlZnQgZm9yIHZlcnRpY2FsLCBsZWZ0VG9wIGZvciBob3Jpem9udGFsXG4gKi9cbmZ1bmN0aW9uIFBhY2tlciggd2lkdGgsIGhlaWdodCwgc29ydERpcmVjdGlvbiApIHtcbiAgdGhpcy53aWR0aCA9IHdpZHRoIHx8IDA7XG4gIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0IHx8IDA7XG4gIHRoaXMuc29ydERpcmVjdGlvbiA9IHNvcnREaXJlY3Rpb24gfHwgJ2Rvd253YXJkTGVmdFRvUmlnaHQnO1xuXG4gIHRoaXMucmVzZXQoKTtcbn1cblxuUGFja2VyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNwYWNlcyA9IFtdO1xuICB0aGlzLm5ld1NwYWNlcyA9IFtdO1xuXG4gIHZhciBpbml0aWFsU3BhY2UgPSBuZXcgUmVjdCh7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHdpZHRoOiB0aGlzLndpZHRoLFxuICAgIGhlaWdodDogdGhpcy5oZWlnaHRcbiAgfSk7XG5cbiAgdGhpcy5zcGFjZXMucHVzaCggaW5pdGlhbFNwYWNlICk7XG4gIC8vIHNldCBzb3J0ZXJcbiAgdGhpcy5zb3J0ZXIgPSBzb3J0ZXJzWyB0aGlzLnNvcnREaXJlY3Rpb24gXSB8fCBzb3J0ZXJzLmRvd253YXJkTGVmdFRvUmlnaHQ7XG59O1xuXG4vLyBjaGFuZ2UgeCBhbmQgeSBvZiByZWN0IHRvIGZpdCB3aXRoIGluIFBhY2tlcidzIGF2YWlsYWJsZSBzcGFjZXNcblBhY2tlci5wcm90b3R5cGUucGFjayA9IGZ1bmN0aW9uKCByZWN0ICkge1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLnNwYWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgc3BhY2UgPSB0aGlzLnNwYWNlc1tpXTtcbiAgICBpZiAoIHNwYWNlLmNhbkZpdCggcmVjdCApICkge1xuICAgICAgdGhpcy5wbGFjZUluU3BhY2UoIHJlY3QsIHNwYWNlICk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbn07XG5cblBhY2tlci5wcm90b3R5cGUucGxhY2VJblNwYWNlID0gZnVuY3Rpb24oIHJlY3QsIHNwYWNlICkge1xuICAvLyBwbGFjZSByZWN0IGluIHNwYWNlXG4gIHJlY3QueCA9IHNwYWNlLng7XG4gIHJlY3QueSA9IHNwYWNlLnk7XG5cbiAgdGhpcy5wbGFjZWQoIHJlY3QgKTtcbn07XG5cbi8vIHVwZGF0ZSBzcGFjZXMgd2l0aCBwbGFjZWQgcmVjdFxuUGFja2VyLnByb3RvdHlwZS5wbGFjZWQgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgLy8gdXBkYXRlIHNwYWNlc1xuICB2YXIgcmV2aXNlZFNwYWNlcyA9IFtdO1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSB0aGlzLnNwYWNlcy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgc3BhY2UgPSB0aGlzLnNwYWNlc1tpXTtcbiAgICB2YXIgbmV3U3BhY2VzID0gc3BhY2UuZ2V0TWF4aW1hbEZyZWVSZWN0cyggcmVjdCApO1xuICAgIC8vIGFkZCBlaXRoZXIgdGhlIG9yaWdpbmFsIHNwYWNlIG9yIHRoZSBuZXcgc3BhY2VzIHRvIHRoZSByZXZpc2VkIHNwYWNlc1xuICAgIGlmICggbmV3U3BhY2VzICkge1xuICAgICAgcmV2aXNlZFNwYWNlcy5wdXNoLmFwcGx5KCByZXZpc2VkU3BhY2VzLCBuZXdTcGFjZXMgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV2aXNlZFNwYWNlcy5wdXNoKCBzcGFjZSApO1xuICAgIH1cbiAgfVxuXG4gIHRoaXMuc3BhY2VzID0gcmV2aXNlZFNwYWNlcztcblxuICB0aGlzLm1lcmdlU29ydFNwYWNlcygpO1xufTtcblxuUGFja2VyLnByb3RvdHlwZS5tZXJnZVNvcnRTcGFjZXMgPSBmdW5jdGlvbigpIHtcbiAgLy8gcmVtb3ZlIHJlZHVuZGFudCBzcGFjZXNcbiAgUGFja2VyLm1lcmdlUmVjdHMoIHRoaXMuc3BhY2VzICk7XG4gIHRoaXMuc3BhY2VzLnNvcnQoIHRoaXMuc29ydGVyICk7XG59O1xuXG4vLyBhZGQgYSBzcGFjZSBiYWNrXG5QYWNrZXIucHJvdG90eXBlLmFkZFNwYWNlID0gZnVuY3Rpb24oIHJlY3QgKSB7XG4gIHRoaXMuc3BhY2VzLnB1c2goIHJlY3QgKTtcbiAgdGhpcy5tZXJnZVNvcnRTcGFjZXMoKTtcbn07XG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIHV0aWxpdHkgZnVuY3Rpb25zIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8qKlxuICogUmVtb3ZlIHJlZHVuZGFudCByZWN0YW5nbGUgZnJvbSBhcnJheSBvZiByZWN0YW5nbGVzXG4gKiBAcGFyYW0ge0FycmF5fSByZWN0czogYW4gYXJyYXkgb2YgUmVjdHNcbiAqIEByZXR1cm5zIHtBcnJheX0gcmVjdHM6IGFuIGFycmF5IG9mIFJlY3RzXG4qKi9cblBhY2tlci5tZXJnZVJlY3RzID0gZnVuY3Rpb24oIHJlY3RzICkge1xuICBmb3IgKCB2YXIgaT0wLCBsZW4gPSByZWN0cy5sZW5ndGg7IGkgPCBsZW47IGkrKyApIHtcbiAgICB2YXIgcmVjdCA9IHJlY3RzW2ldO1xuICAgIC8vIHNraXAgb3ZlciB0aGlzIHJlY3QgaWYgaXQgd2FzIGFscmVhZHkgcmVtb3ZlZFxuICAgIGlmICggIXJlY3QgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgLy8gY2xvbmUgcmVjdHMgd2UncmUgdGVzdGluZywgcmVtb3ZlIHRoaXMgcmVjdFxuICAgIHZhciBjb21wYXJlUmVjdHMgPSByZWN0cy5zbGljZSgwKTtcbiAgICAvLyBkbyBub3QgY29tcGFyZSB3aXRoIHNlbGZcbiAgICBjb21wYXJlUmVjdHMuc3BsaWNlKCBpLCAxICk7XG4gICAgLy8gY29tcGFyZSB0aGlzIHJlY3Qgd2l0aCBvdGhlcnNcbiAgICB2YXIgcmVtb3ZlZENvdW50ID0gMDtcbiAgICBmb3IgKCB2YXIgaj0wLCBqTGVuID0gY29tcGFyZVJlY3RzLmxlbmd0aDsgaiA8IGpMZW47IGorKyApIHtcbiAgICAgIHZhciBjb21wYXJlUmVjdCA9IGNvbXBhcmVSZWN0c1tqXTtcbiAgICAgIC8vIGlmIHRoaXMgcmVjdCBjb250YWlucyBhbm90aGVyLFxuICAgICAgLy8gcmVtb3ZlIHRoYXQgcmVjdCBmcm9tIHRlc3QgY29sbGVjdGlvblxuICAgICAgdmFyIGluZGV4QWRqdXN0ID0gaSA+IGogPyAwIDogMTtcbiAgICAgIGlmICggcmVjdC5jb250YWlucyggY29tcGFyZVJlY3QgKSApIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coICdjdXJyZW50IHRlc3QgcmVjdHM6JyArIHRlc3RSZWN0cy5sZW5ndGgsIHRlc3RSZWN0cyApO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyggaSwgaiwgaW5kZXhBZGp1c3QsIHJlY3QsIGNvbXBhcmVSZWN0ICk7XG4gICAgICAgIHJlY3RzLnNwbGljZSggaiArIGluZGV4QWRqdXN0IC0gcmVtb3ZlZENvdW50LCAxICk7XG4gICAgICAgIHJlbW92ZWRDb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZWN0cztcbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc29ydGVycyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBmdW5jdGlvbnMgZm9yIHNvcnRpbmcgcmVjdHMgaW4gb3JkZXJcbnZhciBzb3J0ZXJzID0ge1xuICAvLyB0b3AgZG93biwgdGhlbiBsZWZ0IHRvIHJpZ2h0XG4gIGRvd253YXJkTGVmdFRvUmlnaHQ6IGZ1bmN0aW9uKCBhLCBiICkge1xuICAgIHJldHVybiBhLnkgLSBiLnkgfHwgYS54IC0gYi54O1xuICB9LFxuICAvLyBsZWZ0IHRvIHJpZ2h0LCB0aGVuIHRvcCBkb3duXG4gIHJpZ2h0d2FyZFRvcFRvQm90dG9tOiBmdW5jdGlvbiggYSwgYiApIHtcbiAgICByZXR1cm4gYS54IC0gYi54IHx8IGEueSAtIGIueTtcbiAgfVxufTtcblxuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxucmV0dXJuIFBhY2tlcjtcblxufSkpOyIsIi8qIVxuICogUGFja2VyeSB2MS40LjNcbiAqIGJpbi1wYWNraW5nIGxheW91dCBsaWJyYXJ5XG4gKlxuICogTGljZW5zZWQgR1BMdjMgZm9yIG9wZW4gc291cmNlIHVzZVxuICogb3IgRmxpY2tpdHkgQ29tbWVyY2lhbCBMaWNlbnNlIGZvciBjb21tZXJjaWFsIHVzZVxuICpcbiAqIGh0dHA6Ly9wYWNrZXJ5Lm1ldGFmaXp6eS5jb1xuICogQ29weXJpZ2h0IDIwMTUgTWV0YWZpenp5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggW1xuICAgICAgICAnY2xhc3NpZS9jbGFzc2llJyxcbiAgICAgICAgJ2dldC1zaXplL2dldC1zaXplJyxcbiAgICAgICAgJ291dGxheWVyL291dGxheWVyJyxcbiAgICAgICAgJy4vcmVjdCcsXG4gICAgICAgICcuL3BhY2tlcicsXG4gICAgICAgICcuL2l0ZW0nXG4gICAgICBdLFxuICAgICAgZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShcbiAgICAgIHJlcXVpcmUoJ2Rlc2FuZHJvLWNsYXNzaWUnKSxcbiAgICAgIHJlcXVpcmUoJ2dldC1zaXplJyksXG4gICAgICByZXF1aXJlKCdvdXRsYXllcicpLFxuICAgICAgcmVxdWlyZSgnLi9yZWN0JyksXG4gICAgICByZXF1aXJlKCcuL3BhY2tlcicpLFxuICAgICAgcmVxdWlyZSgnLi9pdGVtJylcbiAgICApO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlBhY2tlcnkgPSBmYWN0b3J5KFxuICAgICAgd2luZG93LmNsYXNzaWUsXG4gICAgICB3aW5kb3cuZ2V0U2l6ZSxcbiAgICAgIHdpbmRvdy5PdXRsYXllcixcbiAgICAgIHdpbmRvdy5QYWNrZXJ5LlJlY3QsXG4gICAgICB3aW5kb3cuUGFja2VyeS5QYWNrZXIsXG4gICAgICB3aW5kb3cuUGFja2VyeS5JdGVtXG4gICAgKTtcbiAgfVxuXG59KCB3aW5kb3csIGZ1bmN0aW9uIGZhY3RvcnkoIGNsYXNzaWUsIGdldFNpemUsIE91dGxheWVyLCBSZWN0LCBQYWNrZXIsIEl0ZW0gKSB7XG4ndXNlIHN0cmljdCc7XG5cbi8vIC0tLS0tIFJlY3QgLS0tLS0gLy9cblxuLy8gYWxsb3cgZm9yIHBpeGVsIHJvdW5kaW5nIGVycm9ycyBJRTgtSUUxMSAmIEZpcmVmb3g7ICMyMjdcblJlY3QucHJvdG90eXBlLmNhbkZpdCA9IGZ1bmN0aW9uKCByZWN0ICkge1xuICByZXR1cm4gdGhpcy53aWR0aCA+PSByZWN0LndpZHRoIC0gMSAmJiB0aGlzLmhlaWdodCA+PSByZWN0LmhlaWdodCAtIDE7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBQYWNrZXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIC8vXG5cbi8vIGNyZWF0ZSBhbiBPdXRsYXllciBsYXlvdXQgY2xhc3NcbnZhciBQYWNrZXJ5ID0gT3V0bGF5ZXIuY3JlYXRlKCdwYWNrZXJ5Jyk7XG5QYWNrZXJ5Lkl0ZW0gPSBJdGVtO1xuXG5QYWNrZXJ5LnByb3RvdHlwZS5fY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gIC8vIGNhbGwgc3VwZXJcbiAgT3V0bGF5ZXIucHJvdG90eXBlLl9jcmVhdGUuY2FsbCggdGhpcyApO1xuXG4gIC8vIGluaXRpYWwgcHJvcGVydGllc1xuICB0aGlzLnBhY2tlciA9IG5ldyBQYWNrZXIoKTtcblxuICAvLyBMZWZ0IG92ZXIgZnJvbSB2MS4wXG4gIHRoaXMuc3RhbXAoIHRoaXMub3B0aW9ucy5zdGFtcGVkICk7XG5cbiAgLy8gY3JlYXRlIGRyYWcgaGFuZGxlcnNcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgdGhpcy5oYW5kbGVEcmFnZ2FiaWxseSA9IHtcbiAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaXRlbURyYWdTdGFydCggdGhpcy5lbGVtZW50ICk7XG4gICAgfSxcbiAgICBkcmFnTW92ZTogZnVuY3Rpb24oKSB7XG4gICAgICBfdGhpcy5pdGVtRHJhZ01vdmUoIHRoaXMuZWxlbWVudCwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKTtcbiAgICB9LFxuICAgIGRyYWdFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgX3RoaXMuaXRlbURyYWdFbmQoIHRoaXMuZWxlbWVudCApO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLmhhbmRsZVVJRHJhZ2dhYmxlID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbiBoYW5kbGVVSURyYWdnYWJsZVN0YXJ0KCBldmVudCwgdWkgKSB7XG4gICAgICAvLyBIVE1MNSBtYXkgdHJpZ2dlciBkcmFnc3RhcnQsIGRpc21pc3MgSFRNTDUgZHJhZ2dpbmdcbiAgICAgIGlmICggIXVpICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBfdGhpcy5pdGVtRHJhZ1N0YXJ0KCBldmVudC5jdXJyZW50VGFyZ2V0ICk7XG4gICAgfSxcbiAgICBkcmFnOiBmdW5jdGlvbiBoYW5kbGVVSURyYWdnYWJsZURyYWcoIGV2ZW50LCB1aSApIHtcbiAgICAgIGlmICggIXVpICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBfdGhpcy5pdGVtRHJhZ01vdmUoIGV2ZW50LmN1cnJlbnRUYXJnZXQsIHVpLnBvc2l0aW9uLmxlZnQsIHVpLnBvc2l0aW9uLnRvcCApO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gaGFuZGxlVUlEcmFnZ2FibGVTdG9wKCBldmVudCwgdWkgKSB7XG4gICAgICBpZiAoICF1aSApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgX3RoaXMuaXRlbURyYWdFbmQoIGV2ZW50LmN1cnJlbnRUYXJnZXQgKTtcbiAgICB9XG4gIH07XG5cbn07XG5cblxuLy8gLS0tLS0gaW5pdCAmIGxheW91dCAtLS0tLSAvL1xuXG4vKipcbiAqIGxvZ2ljIGJlZm9yZSBhbnkgbmV3IGxheW91dFxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fcmVzZXRMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nZXRTaXplKCk7XG5cbiAgdGhpcy5fZ2V0TWVhc3VyZW1lbnRzKCk7XG5cbiAgLy8gcmVzZXQgcGFja2VyXG4gIHZhciBwYWNrZXIgPSB0aGlzLnBhY2tlcjtcbiAgLy8gcGFja2VyIHNldHRpbmdzLCBpZiBob3Jpem9udGFsIG9yIHZlcnRpY2FsXG4gIGlmICggdGhpcy5vcHRpb25zLmlzSG9yaXpvbnRhbCApIHtcbiAgICBwYWNrZXIud2lkdGggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgcGFja2VyLmhlaWdodCA9IHRoaXMuc2l6ZS5pbm5lckhlaWdodCArIHRoaXMuZ3V0dGVyO1xuICAgIHBhY2tlci5zb3J0RGlyZWN0aW9uID0gJ3JpZ2h0d2FyZFRvcFRvQm90dG9tJztcbiAgfSBlbHNlIHtcbiAgICBwYWNrZXIud2lkdGggPSB0aGlzLnNpemUuaW5uZXJXaWR0aCArIHRoaXMuZ3V0dGVyO1xuICAgIHBhY2tlci5oZWlnaHQgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gICAgcGFja2VyLnNvcnREaXJlY3Rpb24gPSAnZG93bndhcmRMZWZ0VG9SaWdodCc7XG4gIH1cblxuICBwYWNrZXIucmVzZXQoKTtcblxuICAvLyBsYXlvdXRcbiAgdGhpcy5tYXhZID0gMDtcbiAgdGhpcy5tYXhYID0gMDtcbn07XG5cbi8qKlxuICogdXBkYXRlIGNvbHVtbldpZHRoLCByb3dIZWlnaHQsICYgZ3V0dGVyXG4gKiBAcHJpdmF0ZVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fZ2V0TWVhc3VyZW1lbnRzID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2dldE1lYXN1cmVtZW50KCAnY29sdW1uV2lkdGgnLCAnd2lkdGgnICk7XG4gIHRoaXMuX2dldE1lYXN1cmVtZW50KCAncm93SGVpZ2h0JywgJ2hlaWdodCcgKTtcbiAgdGhpcy5fZ2V0TWVhc3VyZW1lbnQoICdndXR0ZXInLCAnd2lkdGgnICk7XG59O1xuXG5QYWNrZXJ5LnByb3RvdHlwZS5fZ2V0SXRlbUxheW91dFBvc2l0aW9uID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG4gIHRoaXMuX3BhY2tJdGVtKCBpdGVtICk7XG4gIHJldHVybiBpdGVtLnJlY3Q7XG59O1xuXG5cbi8qKlxuICogbGF5b3V0IGl0ZW0gaW4gcGFja2VyXG4gKiBAcGFyYW0ge1BhY2tlcnkuSXRlbX0gaXRlbVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fcGFja0l0ZW0gPSBmdW5jdGlvbiggaXRlbSApIHtcbiAgdGhpcy5fc2V0UmVjdFNpemUoIGl0ZW0uZWxlbWVudCwgaXRlbS5yZWN0ICk7XG4gIC8vIHBhY2sgdGhlIHJlY3QgaW4gdGhlIHBhY2tlclxuICB0aGlzLnBhY2tlci5wYWNrKCBpdGVtLnJlY3QgKTtcbiAgdGhpcy5fc2V0TWF4WFkoIGl0ZW0ucmVjdCApO1xufTtcblxuLyoqXG4gKiBzZXQgbWF4IFggYW5kIFkgdmFsdWUsIGZvciBzaXplIG9mIGNvbnRhaW5lclxuICogQHBhcmFtIHtQYWNrZXJ5LlJlY3R9IHJlY3RcbiAqIEBwcml2YXRlXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLl9zZXRNYXhYWSA9IGZ1bmN0aW9uKCByZWN0ICkge1xuICB0aGlzLm1heFggPSBNYXRoLm1heCggcmVjdC54ICsgcmVjdC53aWR0aCwgdGhpcy5tYXhYICk7XG4gIHRoaXMubWF4WSA9IE1hdGgubWF4KCByZWN0LnkgKyByZWN0LmhlaWdodCwgdGhpcy5tYXhZICk7XG59O1xuXG4vKipcbiAqIHNldCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiBhIHJlY3QsIGFwcGx5aW5nIGNvbHVtbldpZHRoIGFuZCByb3dIZWlnaHRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtQYWNrZXJ5LlJlY3R9IHJlY3RcbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuX3NldFJlY3RTaXplID0gZnVuY3Rpb24oIGVsZW0sIHJlY3QgKSB7XG4gIHZhciBzaXplID0gZ2V0U2l6ZSggZWxlbSApO1xuICB2YXIgdyA9IHNpemUub3V0ZXJXaWR0aDtcbiAgdmFyIGggPSBzaXplLm91dGVySGVpZ2h0O1xuICAvLyBzaXplIGZvciBjb2x1bW5XaWR0aCBhbmQgcm93SGVpZ2h0LCBpZiBhdmFpbGFibGVcbiAgLy8gb25seSBjaGVjayBpZiBzaXplIGlzIG5vbi16ZXJvLCAjMTc3XG4gIGlmICggdyB8fCBoICkge1xuICAgIHcgPSB0aGlzLl9hcHBseUdyaWRHdXR0ZXIoIHcsIHRoaXMuY29sdW1uV2lkdGggKTtcbiAgICBoID0gdGhpcy5fYXBwbHlHcmlkR3V0dGVyKCBoLCB0aGlzLnJvd0hlaWdodCApO1xuICB9XG4gIC8vIHJlY3QgbXVzdCBmaXQgaW4gcGFja2VyXG4gIHJlY3Qud2lkdGggPSBNYXRoLm1pbiggdywgdGhpcy5wYWNrZXIud2lkdGggKTtcbiAgcmVjdC5oZWlnaHQgPSBNYXRoLm1pbiggaCwgdGhpcy5wYWNrZXIuaGVpZ2h0ICk7XG59O1xuXG4vKipcbiAqIGZpdHMgaXRlbSB0byBjb2x1bW5XaWR0aC9yb3dIZWlnaHQgYW5kIGFkZHMgZ3V0dGVyXG4gKiBAcGFyYW0ge051bWJlcn0gbWVhc3VyZW1lbnQgLSBpdGVtIHdpZHRoIG9yIGhlaWdodFxuICogQHBhcmFtIHtOdW1iZXJ9IGdyaWRTaXplIC0gY29sdW1uV2lkdGggb3Igcm93SGVpZ2h0XG4gKiBAcmV0dXJucyBtZWFzdXJlbWVudFxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fYXBwbHlHcmlkR3V0dGVyID0gZnVuY3Rpb24oIG1lYXN1cmVtZW50LCBncmlkU2l6ZSApIHtcbiAgLy8ganVzdCBhZGQgZ3V0dGVyIGlmIG5vIGdyaWRTaXplXG4gIGlmICggIWdyaWRTaXplICkge1xuICAgIHJldHVybiBtZWFzdXJlbWVudCArIHRoaXMuZ3V0dGVyO1xuICB9XG4gIGdyaWRTaXplICs9IHRoaXMuZ3V0dGVyO1xuICAvLyBmaXQgaXRlbSB0byBjb2x1bW5XaWR0aC9yb3dIZWlnaHRcbiAgdmFyIHJlbWFpbmRlciA9IG1lYXN1cmVtZW50ICUgZ3JpZFNpemU7XG4gIHZhciBtYXRoTWV0aG9kID0gcmVtYWluZGVyICYmIHJlbWFpbmRlciA8IDEgPyAncm91bmQnIDogJ2NlaWwnO1xuICBtZWFzdXJlbWVudCA9IE1hdGhbIG1hdGhNZXRob2QgXSggbWVhc3VyZW1lbnQgLyBncmlkU2l6ZSApICogZ3JpZFNpemU7XG4gIHJldHVybiBtZWFzdXJlbWVudDtcbn07XG5cblBhY2tlcnkucHJvdG90eXBlLl9nZXRDb250YWluZXJTaXplID0gZnVuY3Rpb24oKSB7XG4gIGlmICggdGhpcy5vcHRpb25zLmlzSG9yaXpvbnRhbCApIHtcbiAgICByZXR1cm4ge1xuICAgICAgd2lkdGg6IHRoaXMubWF4WCAtIHRoaXMuZ3V0dGVyXG4gICAgfTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgaGVpZ2h0OiB0aGlzLm1heFkgLSB0aGlzLmd1dHRlclxuICAgIH07XG4gIH1cbn07XG5cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gc3RhbXAgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLyoqXG4gKiBtYWtlcyBzcGFjZSBmb3IgZWxlbWVudFxuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLl9tYW5hZ2VTdGFtcCA9IGZ1bmN0aW9uKCBlbGVtICkge1xuXG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIHZhciByZWN0O1xuICBpZiAoIGl0ZW0gJiYgaXRlbS5pc1BsYWNpbmcgKSB7XG4gICAgcmVjdCA9IGl0ZW0ucGxhY2VSZWN0O1xuICB9IGVsc2Uge1xuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRFbGVtZW50T2Zmc2V0KCBlbGVtICk7XG4gICAgcmVjdCA9IG5ldyBSZWN0KHtcbiAgICAgIHg6IHRoaXMub3B0aW9ucy5pc09yaWdpbkxlZnQgPyBvZmZzZXQubGVmdCA6IG9mZnNldC5yaWdodCxcbiAgICAgIHk6IHRoaXMub3B0aW9ucy5pc09yaWdpblRvcCA/IG9mZnNldC50b3AgOiBvZmZzZXQuYm90dG9tXG4gICAgfSk7XG4gIH1cblxuICB0aGlzLl9zZXRSZWN0U2l6ZSggZWxlbSwgcmVjdCApO1xuICAvLyBzYXZlIGl0cyBzcGFjZSBpbiB0aGUgcGFja2VyXG4gIHRoaXMucGFja2VyLnBsYWNlZCggcmVjdCApO1xuICB0aGlzLl9zZXRNYXhYWSggcmVjdCApO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gbWV0aG9kcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiB2ZXJ0aWNhbFNvcnRlciggYSwgYiApIHtcbiAgcmV0dXJuIGEucG9zaXRpb24ueSAtIGIucG9zaXRpb24ueSB8fCBhLnBvc2l0aW9uLnggLSBiLnBvc2l0aW9uLng7XG59XG5cbmZ1bmN0aW9uIGhvcml6b250YWxTb3J0ZXIoIGEsIGIgKSB7XG4gIHJldHVybiBhLnBvc2l0aW9uLnggLSBiLnBvc2l0aW9uLnggfHwgYS5wb3NpdGlvbi55IC0gYi5wb3NpdGlvbi55O1xufVxuXG5QYWNrZXJ5LnByb3RvdHlwZS5zb3J0SXRlbXNCeVBvc2l0aW9uID0gZnVuY3Rpb24oKSB7XG4gIHZhciBzb3J0ZXIgPSB0aGlzLm9wdGlvbnMuaXNIb3Jpem9udGFsID8gaG9yaXpvbnRhbFNvcnRlciA6IHZlcnRpY2FsU29ydGVyO1xuICB0aGlzLml0ZW1zLnNvcnQoIHNvcnRlciApO1xufTtcblxuLyoqXG4gKiBGaXQgaXRlbSBlbGVtZW50IGluIGl0cyBjdXJyZW50IHBvc2l0aW9uXG4gKiBQYWNrZXJ5IHdpbGwgcG9zaXRpb24gZWxlbWVudHMgYXJvdW5kIGl0XG4gKiB1c2VmdWwgZm9yIGV4cGFuZGluZyBlbGVtZW50c1xuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtOdW1iZXJ9IHggLSBob3Jpem9udGFsIGRlc3RpbmF0aW9uIHBvc2l0aW9uLCBvcHRpb25hbFxuICogQHBhcmFtIHtOdW1iZXJ9IHkgLSB2ZXJ0aWNhbCBkZXN0aW5hdGlvbiBwb3NpdGlvbiwgb3B0aW9uYWxcbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuZml0ID0gZnVuY3Rpb24oIGVsZW0sIHgsIHkgKSB7XG4gIHZhciBpdGVtID0gdGhpcy5nZXRJdGVtKCBlbGVtICk7XG4gIGlmICggIWl0ZW0gKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gcHJlcGFyZSBpbnRlcm5hbCBwcm9wZXJ0aWVzXG4gIHRoaXMuX2dldE1lYXN1cmVtZW50cygpO1xuXG4gIC8vIHN0YW1wIGl0ZW0gdG8gZ2V0IGl0IG91dCBvZiBsYXlvdXRcbiAgdGhpcy5zdGFtcCggaXRlbS5lbGVtZW50ICk7XG4gIC8vIHJlcXVpcmVkIGZvciBwb3NpdGlvblBsYWNlUmVjdFxuICBpdGVtLmdldFNpemUoKTtcbiAgLy8gc2V0IHBsYWNpbmcgZmxhZ1xuICBpdGVtLmlzUGxhY2luZyA9IHRydWU7XG4gIC8vIGZhbGwgYmFjayB0byBjdXJyZW50IHBvc2l0aW9uIGZvciBmaXR0aW5nXG4gIHggPSB4ID09PSB1bmRlZmluZWQgPyBpdGVtLnJlY3QueDogeDtcbiAgeSA9IHkgPT09IHVuZGVmaW5lZCA/IGl0ZW0ucmVjdC55OiB5O1xuXG4gIC8vIHBvc2l0aW9uIGl0IGJlc3QgYXQgaXRzIGRlc3RpbmF0aW9uXG4gIGl0ZW0ucG9zaXRpb25QbGFjZVJlY3QoIHgsIHksIHRydWUgKTtcblxuICB0aGlzLl9iaW5kRml0RXZlbnRzKCBpdGVtICk7XG4gIGl0ZW0ubW92ZVRvKCBpdGVtLnBsYWNlUmVjdC54LCBpdGVtLnBsYWNlUmVjdC55ICk7XG4gIC8vIGxheW91dCBldmVyeXRoaW5nIGVsc2VcbiAgdGhpcy5sYXlvdXQoKTtcblxuICAvLyByZXR1cm4gYmFjayB0byByZWd1bGFybHkgc2NoZWR1bGVkIHByb2dyYW1taW5nXG4gIHRoaXMudW5zdGFtcCggaXRlbS5lbGVtZW50ICk7XG4gIHRoaXMuc29ydEl0ZW1zQnlQb3NpdGlvbigpO1xuICAvLyB1biBzZXQgcGxhY2luZyBmbGFnLCBiYWNrIHRvIG5vcm1hbFxuICBpdGVtLmlzUGxhY2luZyA9IGZhbHNlO1xuICAvLyBjb3B5IHBsYWNlIHJlY3QgcG9zaXRpb25cbiAgaXRlbS5jb3B5UGxhY2VSZWN0UG9zaXRpb24oKTtcbn07XG5cbi8qKlxuICogZW1pdCBldmVudCB3aGVuIGl0ZW0gaXMgZml0IGFuZCBvdGhlciBpdGVtcyBhcmUgbGFpZCBvdXRcbiAqIEBwYXJhbSB7UGFja2VyeS5JdGVtfSBpdGVtXG4gKiBAcHJpdmF0ZVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5fYmluZEZpdEV2ZW50cyA9IGZ1bmN0aW9uKCBpdGVtICkge1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuICB2YXIgdGlja3MgPSAwO1xuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIHRpY2tzKys7XG4gICAgaWYgKCB0aWNrcyAhPSAyICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBfdGhpcy5kaXNwYXRjaEV2ZW50KCAnZml0Q29tcGxldGUnLCBudWxsLCBbIGl0ZW0gXSApO1xuICB9XG4gIC8vIHdoZW4gaXRlbSBpcyBsYWlkIG91dFxuICBpdGVtLm9uKCAnbGF5b3V0JywgZnVuY3Rpb24oKSB7XG4gICAgdGljaygpO1xuICAgIHJldHVybiB0cnVlO1xuICB9KTtcbiAgLy8gd2hlbiBhbGwgaXRlbXMgYXJlIGxhaWQgb3V0XG4gIHRoaXMub24oICdsYXlvdXRDb21wbGV0ZScsIGZ1bmN0aW9uKCkge1xuICAgIHRpY2soKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSk7XG59O1xuXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSByZXNpemUgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gLy9cblxuLy8gZGVib3VuY2VkLCBsYXlvdXQgb24gcmVzaXplXG5QYWNrZXJ5LnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZG9uJ3QgdHJpZ2dlciBpZiBzaXplIGRpZCBub3QgY2hhbmdlXG4gIHZhciBzaXplID0gZ2V0U2l6ZSggdGhpcy5lbGVtZW50ICk7XG4gIC8vIGNoZWNrIHRoYXQgdGhpcy5zaXplIGFuZCBzaXplIGFyZSB0aGVyZVxuICAvLyBJRTggdHJpZ2dlcnMgcmVzaXplIG9uIGJvZHkgc2l6ZSBjaGFuZ2UsIHNvIHRoZXkgbWlnaHQgbm90IGJlXG4gIHZhciBoYXNTaXplcyA9IHRoaXMuc2l6ZSAmJiBzaXplO1xuICB2YXIgaW5uZXJTaXplID0gdGhpcy5vcHRpb25zLmlzSG9yaXpvbnRhbCA/ICdpbm5lckhlaWdodCcgOiAnaW5uZXJXaWR0aCc7XG4gIGlmICggaGFzU2l6ZXMgJiYgc2l6ZVsgaW5uZXJTaXplIF0gPT0gdGhpcy5zaXplWyBpbm5lclNpemUgXSApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB0aGlzLmxheW91dCgpO1xufTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gZHJhZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vKipcbiAqIGhhbmRsZSBhbiBpdGVtIGRyYWcgc3RhcnQgZXZlbnRcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxlbVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5pdGVtRHJhZ1N0YXJ0ID0gZnVuY3Rpb24oIGVsZW0gKSB7XG4gIHRoaXMuc3RhbXAoIGVsZW0gKTtcbiAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgaWYgKCBpdGVtICkge1xuICAgIGl0ZW0uZHJhZ1N0YXJ0KCk7XG4gIH1cbn07XG5cbi8qKlxuICogaGFuZGxlIGFuIGl0ZW0gZHJhZyBtb3ZlIGV2ZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqIEBwYXJhbSB7TnVtYmVyfSB4IC0gaG9yaXpvbnRhbCBjaGFuZ2UgaW4gcG9zaXRpb25cbiAqIEBwYXJhbSB7TnVtYmVyfSB5IC0gdmVydGljYWwgY2hhbmdlIGluIHBvc2l0aW9uXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLml0ZW1EcmFnTW92ZSA9IGZ1bmN0aW9uKCBlbGVtLCB4LCB5ICkge1xuICB2YXIgaXRlbSA9IHRoaXMuZ2V0SXRlbSggZWxlbSApO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbS5kcmFnTW92ZSggeCwgeSApO1xuICB9XG5cbiAgLy8gZGVib3VuY2VcbiAgdmFyIF90aGlzID0gdGhpcztcbiAgLy8gZGVib3VuY2UgdHJpZ2dlcmluZyBsYXlvdXRcbiAgZnVuY3Rpb24gZGVsYXllZCgpIHtcbiAgICBfdGhpcy5sYXlvdXQoKTtcbiAgICBkZWxldGUgX3RoaXMuZHJhZ1RpbWVvdXQ7XG4gIH1cblxuICB0aGlzLmNsZWFyRHJhZ1RpbWVvdXQoKTtcblxuICB0aGlzLmRyYWdUaW1lb3V0ID0gc2V0VGltZW91dCggZGVsYXllZCwgNDAgKTtcbn07XG5cblBhY2tlcnkucHJvdG90eXBlLmNsZWFyRHJhZ1RpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCB0aGlzLmRyYWdUaW1lb3V0ICkge1xuICAgIGNsZWFyVGltZW91dCggdGhpcy5kcmFnVGltZW91dCApO1xuICB9XG59O1xuXG4vKipcbiAqIGhhbmRsZSBhbiBpdGVtIGRyYWcgZW5kIGV2ZW50XG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsZW1cbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuaXRlbURyYWdFbmQgPSBmdW5jdGlvbiggZWxlbSApIHtcbiAgdmFyIGl0ZW0gPSB0aGlzLmdldEl0ZW0oIGVsZW0gKTtcbiAgdmFyIGl0ZW1EaWREcmFnO1xuICBpZiAoIGl0ZW0gKSB7XG4gICAgaXRlbURpZERyYWcgPSBpdGVtLmRpZERyYWc7XG4gICAgaXRlbS5kcmFnU3RvcCgpO1xuICB9XG4gIC8vIGlmIGVsZW0gZGlkbid0IG1vdmUsIG9yIGlmIGl0IGRvZXNuJ3QgbmVlZCBwb3NpdGlvbmluZ1xuICAvLyB1bmlnbm9yZSBhbmQgdW5zdGFtcCBhbmQgY2FsbCBpdCBhIGRheVxuICBpZiAoICFpdGVtIHx8ICggIWl0ZW1EaWREcmFnICYmICFpdGVtLm5lZWRzUG9zaXRpb25pbmcgKSApIHtcbiAgICB0aGlzLnVuc3RhbXAoIGVsZW0gKTtcbiAgICByZXR1cm47XG4gIH1cbiAgLy8gcHJvY2NlZCB3aXRoIGRyYWdnZWQgaXRlbVxuXG4gIGNsYXNzaWUuYWRkKCBpdGVtLmVsZW1lbnQsICdpcy1wb3NpdGlvbmluZy1wb3N0LWRyYWcnICk7XG5cbiAgLy8gc2F2ZSB0aGlzIHZhciwgYXMgaXQgY291bGQgZ2V0IHJlc2V0IGluIGRyYWdTdGFydFxuICB2YXIgb25MYXlvdXRDb21wbGV0ZSA9IHRoaXMuX2dldERyYWdFbmRMYXlvdXRDb21wbGV0ZSggZWxlbSwgaXRlbSApO1xuXG4gIGlmICggaXRlbS5uZWVkc1Bvc2l0aW9uaW5nICkge1xuICAgIGl0ZW0ub24oICdsYXlvdXQnLCBvbkxheW91dENvbXBsZXRlICk7XG4gICAgaXRlbS5tb3ZlVG8oIGl0ZW0ucGxhY2VSZWN0LngsIGl0ZW0ucGxhY2VSZWN0LnkgKTtcbiAgfSBlbHNlIGlmICggaXRlbSApIHtcbiAgICAvLyBpdGVtIGRpZG4ndCBuZWVkIHBsYWNlbWVudFxuICAgIGl0ZW0uY29weVBsYWNlUmVjdFBvc2l0aW9uKCk7XG4gIH1cblxuICB0aGlzLmNsZWFyRHJhZ1RpbWVvdXQoKTtcbiAgdGhpcy5vbiggJ2xheW91dENvbXBsZXRlJywgb25MYXlvdXRDb21wbGV0ZSApO1xuICB0aGlzLmxheW91dCgpO1xuXG59O1xuXG4vKipcbiAqIGdldCBkcmFnIGVuZCBjYWxsYmFja1xuICogQHBhcmFtIHtFbGVtZW50fSBlbGVtXG4gKiBAcGFyYW0ge1BhY2tlcnkuSXRlbX0gaXRlbVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBvbkxheW91dENvbXBsZXRlXG4gKi9cblBhY2tlcnkucHJvdG90eXBlLl9nZXREcmFnRW5kTGF5b3V0Q29tcGxldGUgPSBmdW5jdGlvbiggZWxlbSwgaXRlbSApIHtcbiAgdmFyIGl0ZW1OZWVkc1Bvc2l0aW9uaW5nID0gaXRlbSAmJiBpdGVtLm5lZWRzUG9zaXRpb25pbmc7XG4gIHZhciBjb21wbGV0ZUNvdW50ID0gMDtcbiAgdmFyIGFzeW5jQ291bnQgPSBpdGVtTmVlZHNQb3NpdGlvbmluZyA/IDIgOiAxO1xuICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gIHJldHVybiBmdW5jdGlvbiBvbkxheW91dENvbXBsZXRlKCkge1xuICAgIGNvbXBsZXRlQ291bnQrKztcbiAgICAvLyBkb24ndCBwcm9jZWVkIGlmIG5vdCBjb21wbGV0ZVxuICAgIGlmICggY29tcGxldGVDb3VudCAhPSBhc3luY0NvdW50ICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIC8vIHJlc2V0IGl0ZW1cbiAgICBpZiAoIGl0ZW0gKSB7XG4gICAgICBjbGFzc2llLnJlbW92ZSggaXRlbS5lbGVtZW50LCAnaXMtcG9zaXRpb25pbmctcG9zdC1kcmFnJyApO1xuICAgICAgaXRlbS5pc1BsYWNpbmcgPSBmYWxzZTtcbiAgICAgIGl0ZW0uY29weVBsYWNlUmVjdFBvc2l0aW9uKCk7XG4gICAgfVxuXG4gICAgX3RoaXMudW5zdGFtcCggZWxlbSApO1xuICAgIC8vIG9ubHkgc29ydCB3aGVuIGl0ZW0gbW92ZWRcbiAgICBfdGhpcy5zb3J0SXRlbXNCeVBvc2l0aW9uKCk7XG5cbiAgICAvLyBlbWl0IGl0ZW0gZHJhZyBldmVudCBub3cgdGhhdCBldmVyeXRoaW5nIGlzIGRvbmVcbiAgICBpZiAoIGl0ZW1OZWVkc1Bvc2l0aW9uaW5nICkge1xuICAgICAgX3RoaXMuZGlzcGF0Y2hFdmVudCggJ2RyYWdJdGVtUG9zaXRpb25lZCcsIG51bGwsIFsgaXRlbSBdICk7XG4gICAgfVxuICAgIC8vIGxpc3RlbiBvbmNlXG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59O1xuXG4vKipcbiAqIGJpbmRzIERyYWdnYWJpbGx5IGV2ZW50c1xuICogQHBhcmFtIHtEcmFnZ2FiaWxseX0gZHJhZ2dpZVxuICovXG5QYWNrZXJ5LnByb3RvdHlwZS5iaW5kRHJhZ2dhYmlsbHlFdmVudHMgPSBmdW5jdGlvbiggZHJhZ2dpZSApIHtcbiAgZHJhZ2dpZS5vbiggJ2RyYWdTdGFydCcsIHRoaXMuaGFuZGxlRHJhZ2dhYmlsbHkuZHJhZ1N0YXJ0ICk7XG4gIGRyYWdnaWUub24oICdkcmFnTW92ZScsIHRoaXMuaGFuZGxlRHJhZ2dhYmlsbHkuZHJhZ01vdmUgKTtcbiAgZHJhZ2dpZS5vbiggJ2RyYWdFbmQnLCB0aGlzLmhhbmRsZURyYWdnYWJpbGx5LmRyYWdFbmQgKTtcbn07XG5cbi8qKlxuICogYmluZHMgalF1ZXJ5IFVJIERyYWdnYWJsZSBldmVudHNcbiAqIEBwYXJhbSB7alF1ZXJ5fSAkZWxlbXNcbiAqL1xuUGFja2VyeS5wcm90b3R5cGUuYmluZFVJRHJhZ2dhYmxlRXZlbnRzID0gZnVuY3Rpb24oICRlbGVtcyApIHtcbiAgJGVsZW1zXG4gICAgLm9uKCAnZHJhZ3N0YXJ0JywgdGhpcy5oYW5kbGVVSURyYWdnYWJsZS5zdGFydCApXG4gICAgLm9uKCAnZHJhZycsIHRoaXMuaGFuZGxlVUlEcmFnZ2FibGUuZHJhZyApXG4gICAgLm9uKCAnZHJhZ3N0b3AnLCB0aGlzLmhhbmRsZVVJRHJhZ2dhYmxlLnN0b3AgKTtcbn07XG5cblBhY2tlcnkuUmVjdCA9IFJlY3Q7XG5QYWNrZXJ5LlBhY2tlciA9IFBhY2tlcjtcblxucmV0dXJuIFBhY2tlcnk7XG5cbn0pKTtcbiIsIi8qKlxuICogUmVjdFxuICogbG93LWxldmVsIHV0aWxpdHkgY2xhc3MgZm9yIGJhc2ljIGdlb21ldHJ5XG4gKi9cblxuKCBmdW5jdGlvbiggd2luZG93LCBmYWN0b3J5ICkge1xuICAndXNlIHN0cmljdCc7XG4gIC8vIHVuaXZlcnNhbCBtb2R1bGUgZGVmaW5pdGlvblxuICBpZiAoIHR5cGVvZiBkZWZpbmUgPT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kICkge1xuICAgIC8vIEFNRFxuICAgIGRlZmluZSggZmFjdG9yeSApO1xuICB9IGVsc2UgaWYgKCB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyApIHtcbiAgICAvLyBDb21tb25KU1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIGJyb3dzZXIgZ2xvYmFsXG4gICAgd2luZG93LlBhY2tlcnkgPSB3aW5kb3cuUGFja2VyeSB8fCB7fTtcbiAgICB3aW5kb3cuUGFja2VyeS5SZWN0ID0gZmFjdG9yeSgpO1xuICB9XG5cbn0oIHdpbmRvdywgZnVuY3Rpb24gZmFjdG9yeSgpIHtcbid1c2Ugc3RyaWN0JztcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUGFja2VyeSAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG4vLyBnbG9iYWwgbmFtZXNwYWNlXG52YXIgUGFja2VyeSA9IHdpbmRvdy5QYWNrZXJ5ID0gZnVuY3Rpb24oKSB7fTtcblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gUmVjdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAvL1xuXG5mdW5jdGlvbiBSZWN0KCBwcm9wcyApIHtcbiAgLy8gZXh0ZW5kIHByb3BlcnRpZXMgZnJvbSBkZWZhdWx0c1xuICBmb3IgKCB2YXIgcHJvcCBpbiBSZWN0LmRlZmF1bHRzICkge1xuICAgIHRoaXNbIHByb3AgXSA9IFJlY3QuZGVmYXVsdHNbIHByb3AgXTtcbiAgfVxuXG4gIGZvciAoIHByb3AgaW4gcHJvcHMgKSB7XG4gICAgdGhpc1sgcHJvcCBdID0gcHJvcHNbIHByb3AgXTtcbiAgfVxuXG59XG5cbi8vIG1ha2UgYXZhaWxhYmxlXG5QYWNrZXJ5LlJlY3QgPSBSZWN0O1xuXG5SZWN0LmRlZmF1bHRzID0ge1xuICB4OiAwLFxuICB5OiAwLFxuICB3aWR0aDogMCxcbiAgaGVpZ2h0OiAwXG59O1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciBvciBub3QgdGhpcyByZWN0YW5nbGUgd2hvbGx5IGVuY2xvc2VzIGFub3RoZXIgcmVjdGFuZ2xlIG9yIHBvaW50LlxuICogQHBhcmFtIHtSZWN0fSByZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbioqL1xuUmVjdC5wcm90b3R5cGUuY29udGFpbnMgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgLy8gcG9pbnRzIGRvbid0IGhhdmUgd2lkdGggb3IgaGVpZ2h0XG4gIHZhciBvdGhlcldpZHRoID0gcmVjdC53aWR0aCB8fCAwO1xuICB2YXIgb3RoZXJIZWlnaHQgPSByZWN0LmhlaWdodCB8fCAwO1xuICByZXR1cm4gdGhpcy54IDw9IHJlY3QueCAmJlxuICAgIHRoaXMueSA8PSByZWN0LnkgJiZcbiAgICB0aGlzLnggKyB0aGlzLndpZHRoID49IHJlY3QueCArIG90aGVyV2lkdGggJiZcbiAgICB0aGlzLnkgKyB0aGlzLmhlaWdodCA+PSByZWN0LnkgKyBvdGhlckhlaWdodDtcbn07XG5cbi8qKlxuICogRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgcmVjdGFuZ2xlIGludGVyc2VjdHMgd2l0aCBhbm90aGVyLlxuICogQHBhcmFtIHtSZWN0fSByZWN0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbioqL1xuUmVjdC5wcm90b3R5cGUub3ZlcmxhcHMgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgdmFyIHRoaXNSaWdodCA9IHRoaXMueCArIHRoaXMud2lkdGg7XG4gIHZhciB0aGlzQm90dG9tID0gdGhpcy55ICsgdGhpcy5oZWlnaHQ7XG4gIHZhciByZWN0UmlnaHQgPSByZWN0LnggKyByZWN0LndpZHRoO1xuICB2YXIgcmVjdEJvdHRvbSA9IHJlY3QueSArIHJlY3QuaGVpZ2h0O1xuXG4gIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzMwNjMzMlxuICByZXR1cm4gdGhpcy54IDwgcmVjdFJpZ2h0ICYmXG4gICAgdGhpc1JpZ2h0ID4gcmVjdC54ICYmXG4gICAgdGhpcy55IDwgcmVjdEJvdHRvbSAmJlxuICAgIHRoaXNCb3R0b20gPiByZWN0Lnk7XG59O1xuXG4vKipcbiAqIEBwYXJhbSB7UmVjdH0gcmVjdCAtIHRoZSBvdmVybGFwcGluZyByZWN0XG4gKiBAcmV0dXJucyB7QXJyYXl9IGZyZWVSZWN0cyAtIHJlY3RzIHJlcHJlc2VudGluZyB0aGUgYXJlYSBhcm91bmQgdGhlIHJlY3RcbioqL1xuUmVjdC5wcm90b3R5cGUuZ2V0TWF4aW1hbEZyZWVSZWN0cyA9IGZ1bmN0aW9uKCByZWN0ICkge1xuXG4gIC8vIGlmIG5vIGludGVyc2VjdGlvbiwgcmV0dXJuIGZhbHNlXG4gIGlmICggIXRoaXMub3ZlcmxhcHMoIHJlY3QgKSApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICB2YXIgZnJlZVJlY3RzID0gW107XG4gIHZhciBmcmVlUmVjdDtcblxuICB2YXIgdGhpc1JpZ2h0ID0gdGhpcy54ICsgdGhpcy53aWR0aDtcbiAgdmFyIHRoaXNCb3R0b20gPSB0aGlzLnkgKyB0aGlzLmhlaWdodDtcbiAgdmFyIHJlY3RSaWdodCA9IHJlY3QueCArIHJlY3Qud2lkdGg7XG4gIHZhciByZWN0Qm90dG9tID0gcmVjdC55ICsgcmVjdC5oZWlnaHQ7XG5cbiAgLy8gdG9wXG4gIGlmICggdGhpcy55IDwgcmVjdC55ICkge1xuICAgIGZyZWVSZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHJlY3QueSAtIHRoaXMueVxuICAgIH0pO1xuICAgIGZyZWVSZWN0cy5wdXNoKCBmcmVlUmVjdCApO1xuICB9XG5cbiAgLy8gcmlnaHRcbiAgaWYgKCB0aGlzUmlnaHQgPiByZWN0UmlnaHQgKSB7XG4gICAgZnJlZVJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiByZWN0UmlnaHQsXG4gICAgICB5OiB0aGlzLnksXG4gICAgICB3aWR0aDogdGhpc1JpZ2h0IC0gcmVjdFJpZ2h0LFxuICAgICAgaGVpZ2h0OiB0aGlzLmhlaWdodFxuICAgIH0pO1xuICAgIGZyZWVSZWN0cy5wdXNoKCBmcmVlUmVjdCApO1xuICB9XG5cbiAgLy8gYm90dG9tXG4gIGlmICggdGhpc0JvdHRvbSA+IHJlY3RCb3R0b20gKSB7XG4gICAgZnJlZVJlY3QgPSBuZXcgUmVjdCh7XG4gICAgICB4OiB0aGlzLngsXG4gICAgICB5OiByZWN0Qm90dG9tLFxuICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXNCb3R0b20gLSByZWN0Qm90dG9tXG4gICAgfSk7XG4gICAgZnJlZVJlY3RzLnB1c2goIGZyZWVSZWN0ICk7XG4gIH1cblxuICAvLyBsZWZ0XG4gIGlmICggdGhpcy54IDwgcmVjdC54ICkge1xuICAgIGZyZWVSZWN0ID0gbmV3IFJlY3Qoe1xuICAgICAgeDogdGhpcy54LFxuICAgICAgeTogdGhpcy55LFxuICAgICAgd2lkdGg6IHJlY3QueCAtIHRoaXMueCxcbiAgICAgIGhlaWdodDogdGhpcy5oZWlnaHRcbiAgICB9KTtcbiAgICBmcmVlUmVjdHMucHVzaCggZnJlZVJlY3QgKTtcbiAgfVxuXG4gIHJldHVybiBmcmVlUmVjdHM7XG59O1xuXG5SZWN0LnByb3RvdHlwZS5jYW5GaXQgPSBmdW5jdGlvbiggcmVjdCApIHtcbiAgcmV0dXJuIHRoaXMud2lkdGggPj0gcmVjdC53aWR0aCAmJiB0aGlzLmhlaWdodCA+PSByZWN0LmhlaWdodDtcbn07XG5cbnJldHVybiBSZWN0O1xuXG59KSk7XG4iLCIvKipcbiAqIFN3aXBlciAzLjQuMlxuICogTW9zdCBtb2Rlcm4gbW9iaWxlIHRvdWNoIHNsaWRlciBhbmQgZnJhbWV3b3JrIHdpdGggaGFyZHdhcmUgYWNjZWxlcmF0ZWQgdHJhbnNpdGlvbnNcbiAqIFxuICogaHR0cDovL3d3dy5pZGFuZ2Vyby51cy9zd2lwZXIvXG4gKiBcbiAqIENvcHlyaWdodCAyMDE3LCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICogVGhlIGlEYW5nZXJvLnVzXG4gKiBodHRwOi8vd3d3LmlkYW5nZXJvLnVzL1xuICogXG4gKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAqIFxuICogUmVsZWFzZWQgb246IE1hcmNoIDEwLCAyMDE3XG4gKi9cbihmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuICAgIHZhciAkO1xuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBTd2lwZXJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgIHZhciBTd2lwZXIgPSBmdW5jdGlvbiAoY29udGFpbmVyLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFN3aXBlcikpIHJldHVybiBuZXcgU3dpcGVyKGNvbnRhaW5lciwgcGFyYW1zKTtcbiAgICBcblxuICAgICAgICB2YXIgZGVmYXVsdHMgPSB7XG4gICAgICAgICAgICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgIHRvdWNoRXZlbnRzVGFyZ2V0OiAnY29udGFpbmVyJyxcbiAgICAgICAgICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICAgICAgICAgIHNwZWVkOiAzMDAsXG4gICAgICAgICAgICAvLyBhdXRvcGxheVxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlLFxuICAgICAgICAgICAgYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9wbGF5U3RvcE9uTGFzdDogZmFsc2UsXG4gICAgICAgICAgICAvLyBUbyBzdXBwb3J0IGlPUydzIHN3aXBlLXRvLWdvLWJhY2sgZ2VzdHVyZSAod2hlbiBiZWluZyB1c2VkIGluLWFwcCwgd2l0aCBVSVdlYlZpZXcpLlxuICAgICAgICAgICAgaU9TRWRnZVN3aXBlRGV0ZWN0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIGlPU0VkZ2VTd2lwZVRocmVzaG9sZDogMjAsXG4gICAgICAgICAgICAvLyBGcmVlIG1vZGVcbiAgICAgICAgICAgIGZyZWVNb2RlOiBmYWxzZSxcbiAgICAgICAgICAgIGZyZWVNb2RlTW9tZW50dW06IHRydWUsXG4gICAgICAgICAgICBmcmVlTW9kZU1vbWVudHVtUmF0aW86IDEsXG4gICAgICAgICAgICBmcmVlTW9kZU1vbWVudHVtQm91bmNlOiB0cnVlLFxuICAgICAgICAgICAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiAxLFxuICAgICAgICAgICAgZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW86IDEsXG4gICAgICAgICAgICBmcmVlTW9kZVN0aWNreTogZmFsc2UsXG4gICAgICAgICAgICBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogMC4wMixcbiAgICAgICAgICAgIC8vIEF1dG9oZWlnaHRcbiAgICAgICAgICAgIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gU2V0IHdyYXBwZXIgd2lkdGhcbiAgICAgICAgICAgIHNldFdyYXBwZXJTaXplOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIFZpcnR1YWwgVHJhbnNsYXRlXG4gICAgICAgICAgICB2aXJ0dWFsVHJhbnNsYXRlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEVmZmVjdHNcbiAgICAgICAgICAgIGVmZmVjdDogJ3NsaWRlJywgLy8gJ3NsaWRlJyBvciAnZmFkZScgb3IgJ2N1YmUnIG9yICdjb3ZlcmZsb3cnIG9yICdmbGlwJ1xuICAgICAgICAgICAgY292ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgcm90YXRlOiA1MCxcbiAgICAgICAgICAgICAgICBzdHJldGNoOiAwLFxuICAgICAgICAgICAgICAgIGRlcHRoOiAxMDAsXG4gICAgICAgICAgICAgICAgbW9kaWZpZXI6IDEsXG4gICAgICAgICAgICAgICAgc2xpZGVTaGFkb3dzIDogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgICBzbGlkZVNoYWRvd3MgOiB0cnVlLFxuICAgICAgICAgICAgICAgIGxpbWl0Um90YXRpb246IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjdWJlOiB7XG4gICAgICAgICAgICAgICAgc2xpZGVTaGFkb3dzOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNoYWRvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBzaGFkb3dPZmZzZXQ6IDIwLFxuICAgICAgICAgICAgICAgIHNoYWRvd1NjYWxlOiAwLjk0XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmFkZToge1xuICAgICAgICAgICAgICAgIGNyb3NzRmFkZTogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBQYXJhbGxheFxuICAgICAgICAgICAgcGFyYWxsYXg6IGZhbHNlLFxuICAgICAgICAgICAgLy8gWm9vbVxuICAgICAgICAgICAgem9vbTogZmFsc2UsXG4gICAgICAgICAgICB6b29tTWF4OiAzLFxuICAgICAgICAgICAgem9vbU1pbjogMSxcbiAgICAgICAgICAgIHpvb21Ub2dnbGU6IHRydWUsXG4gICAgICAgICAgICAvLyBTY3JvbGxiYXJcbiAgICAgICAgICAgIHNjcm9sbGJhcjogbnVsbCxcbiAgICAgICAgICAgIHNjcm9sbGJhckhpZGU6IHRydWUsXG4gICAgICAgICAgICBzY3JvbGxiYXJEcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgc2Nyb2xsYmFyU25hcE9uUmVsZWFzZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBLZXlib2FyZCBNb3VzZXdoZWVsXG4gICAgICAgICAgICBrZXlib2FyZENvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2V3aGVlbENvbnRyb2w6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2V3aGVlbFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxJbnZlcnQ6IGZhbHNlLFxuICAgICAgICAgICAgbW91c2V3aGVlbEZvcmNlVG9BeGlzOiBmYWxzZSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxTZW5zaXRpdml0eTogMSxcbiAgICAgICAgICAgIG1vdXNld2hlZWxFdmVudHNUYXJnZWQ6ICdjb250YWluZXInLFxuICAgICAgICAgICAgLy8gSGFzaCBOYXZpZ2F0aW9uXG4gICAgICAgICAgICBoYXNobmF2OiBmYWxzZSxcbiAgICAgICAgICAgIGhhc2huYXZXYXRjaFN0YXRlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEhpc3RvcnlcbiAgICAgICAgICAgIGhpc3Rvcnk6IGZhbHNlLFxuICAgICAgICAgICAgLy8gQ29tbW9uZyBOYXYgU3RhdGVcbiAgICAgICAgICAgIHJlcGxhY2VTdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICAvLyBCcmVha3BvaW50c1xuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIC8vIFNsaWRlcyBncmlkXG4gICAgICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICAgICAgc2xpZGVzUGVyQ29sdW1uRmlsbDogJ2NvbHVtbicsXG4gICAgICAgICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgICAgICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICAgICAgICAgIHNsaWRlc09mZnNldEJlZm9yZTogMCwgLy8gaW4gcHhcbiAgICAgICAgICAgIHNsaWRlc09mZnNldEFmdGVyOiAwLCAvLyBpbiBweFxuICAgICAgICAgICAgLy8gUm91bmQgbGVuZ3RoXG4gICAgICAgICAgICByb3VuZExlbmd0aHM6IGZhbHNlLFxuICAgICAgICAgICAgLy8gVG91Y2hlc1xuICAgICAgICAgICAgdG91Y2hSYXRpbzogMSxcbiAgICAgICAgICAgIHRvdWNoQW5nbGU6IDQ1LFxuICAgICAgICAgICAgc2ltdWxhdGVUb3VjaDogdHJ1ZSxcbiAgICAgICAgICAgIHNob3J0U3dpcGVzOiB0cnVlLFxuICAgICAgICAgICAgbG9uZ1N3aXBlczogdHJ1ZSxcbiAgICAgICAgICAgIGxvbmdTd2lwZXNSYXRpbzogMC41LFxuICAgICAgICAgICAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gICAgICAgICAgICBmb2xsb3dGaW5nZXI6IHRydWUsXG4gICAgICAgICAgICBvbmx5RXh0ZXJuYWw6IGZhbHNlLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAwLFxuICAgICAgICAgICAgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiB0cnVlLFxuICAgICAgICAgICAgdG91Y2hSZWxlYXNlT25FZGdlczogZmFsc2UsXG4gICAgICAgICAgICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICAgICAgICAgICAgdW5pcXVlTmF2RWxlbWVudHM6IHRydWUsXG4gICAgICAgICAgICAvLyBQYWdpbmF0aW9uXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiBudWxsLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25DbGlja2FibGU6IGZhbHNlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkhpZGU6IGZhbHNlLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkJ1bGxldFJlbmRlcjogbnVsbCxcbiAgICAgICAgICAgIHBhZ2luYXRpb25Qcm9ncmVzc1JlbmRlcjogbnVsbCxcbiAgICAgICAgICAgIHBhZ2luYXRpb25GcmFjdGlvblJlbmRlcjogbnVsbCxcbiAgICAgICAgICAgIHBhZ2luYXRpb25DdXN0b21SZW5kZXI6IG51bGwsXG4gICAgICAgICAgICBwYWdpbmF0aW9uVHlwZTogJ2J1bGxldHMnLCAvLyAnYnVsbGV0cycgb3IgJ3Byb2dyZXNzJyBvciAnZnJhY3Rpb24nIG9yICdjdXN0b20nXG4gICAgICAgICAgICAvLyBSZXNpc3RhbmNlXG4gICAgICAgICAgICByZXNpc3RhbmNlOiB0cnVlLFxuICAgICAgICAgICAgcmVzaXN0YW5jZVJhdGlvOiAwLjg1LFxuICAgICAgICAgICAgLy8gTmV4dC9wcmV2IGJ1dHRvbnNcbiAgICAgICAgICAgIG5leHRCdXR0b246IG51bGwsXG4gICAgICAgICAgICBwcmV2QnV0dG9uOiBudWxsLFxuICAgICAgICAgICAgLy8gUHJvZ3Jlc3NcbiAgICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IGZhbHNlLFxuICAgICAgICAgICAgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEN1cnNvclxuICAgICAgICAgICAgZ3JhYkN1cnNvcjogZmFsc2UsXG4gICAgICAgICAgICAvLyBDbGlja3NcbiAgICAgICAgICAgIHByZXZlbnRDbGlja3M6IHRydWUsXG4gICAgICAgICAgICBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IHRydWUsXG4gICAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIExhenkgTG9hZGluZ1xuICAgICAgICAgICAgbGF6eUxvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgICAgbGF6eUxvYWRpbmdJblByZXZOZXh0OiBmYWxzZSxcbiAgICAgICAgICAgIGxhenlMb2FkaW5nSW5QcmV2TmV4dEFtb3VudDogMSxcbiAgICAgICAgICAgIGxhenlMb2FkaW5nT25UcmFuc2l0aW9uU3RhcnQ6IGZhbHNlLFxuICAgICAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgICAgICBwcmVsb2FkSW1hZ2VzOiB0cnVlLFxuICAgICAgICAgICAgdXBkYXRlT25JbWFnZXNSZWFkeTogdHJ1ZSxcbiAgICAgICAgICAgIC8vIGxvb3BcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgICAgICAgICAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDAsXG4gICAgICAgICAgICBsb29wZWRTbGlkZXM6IG51bGwsXG4gICAgICAgICAgICAvLyBDb250cm9sXG4gICAgICAgICAgICBjb250cm9sOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBjb250cm9sSW52ZXJzZTogZmFsc2UsXG4gICAgICAgICAgICBjb250cm9sQnk6ICdzbGlkZScsIC8vb3IgJ2NvbnRhaW5lcidcbiAgICAgICAgICAgIG5vcm1hbGl6ZVNsaWRlSW5kZXg6IHRydWUsXG4gICAgICAgICAgICAvLyBTd2lwaW5nL25vIHN3aXBpbmdcbiAgICAgICAgICAgIGFsbG93U3dpcGVUb1ByZXY6IHRydWUsXG4gICAgICAgICAgICBhbGxvd1N3aXBlVG9OZXh0OiB0cnVlLFxuICAgICAgICAgICAgc3dpcGVIYW5kbGVyOiBudWxsLCAvLycuc3dpcGUtaGFuZGxlcicsXG4gICAgICAgICAgICBub1N3aXBpbmc6IHRydWUsXG4gICAgICAgICAgICBub1N3aXBpbmdDbGFzczogJ3N3aXBlci1uby1zd2lwaW5nJyxcbiAgICAgICAgICAgIC8vIFBhc3NpdmUgTGlzdGVuZXJzXG4gICAgICAgICAgICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuICAgICAgICAgICAgLy8gTlNcbiAgICAgICAgICAgIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItY29udGFpbmVyLScsIC8vIE5FV1xuICAgICAgICAgICAgc2xpZGVDbGFzczogJ3N3aXBlci1zbGlkZScsXG4gICAgICAgICAgICBzbGlkZUFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWFjdGl2ZScsXG4gICAgICAgICAgICBzbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1hY3RpdmUnLFxuICAgICAgICAgICAgc2xpZGVWaXNpYmxlQ2xhc3M6ICdzd2lwZXItc2xpZGUtdmlzaWJsZScsXG4gICAgICAgICAgICBzbGlkZUR1cGxpY2F0ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZScsXG4gICAgICAgICAgICBzbGlkZU5leHRDbGFzczogJ3N3aXBlci1zbGlkZS1uZXh0JyxcbiAgICAgICAgICAgIHNsaWRlRHVwbGljYXRlTmV4dENsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1uZXh0JyxcbiAgICAgICAgICAgIHNsaWRlUHJldkNsYXNzOiAnc3dpcGVyLXNsaWRlLXByZXYnLFxuICAgICAgICAgICAgc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLXByZXYnLFxuICAgICAgICAgICAgd3JhcHBlckNsYXNzOiAnc3dpcGVyLXdyYXBwZXInLFxuICAgICAgICAgICAgYnVsbGV0Q2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQnLFxuICAgICAgICAgICAgYnVsbGV0QWN0aXZlQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1idWxsZXQtYWN0aXZlJyxcbiAgICAgICAgICAgIGJ1dHRvbkRpc2FibGVkQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWRpc2FibGVkJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25DdXJyZW50Q2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1jdXJyZW50JyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25Ub3RhbENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tdG90YWwnLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkhpZGRlbkNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24taGlkZGVuJyxcbiAgICAgICAgICAgIHBhZ2luYXRpb25Qcm9ncmVzc2JhckNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXInLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkNsaWNrYWJsZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tY2xpY2thYmxlJywgLy8gTkVXXG4gICAgICAgICAgICBwYWdpbmF0aW9uTW9kaWZpZXJDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLScsIC8vIE5FV1xuICAgICAgICAgICAgbGF6eUxvYWRpbmdDbGFzczogJ3N3aXBlci1sYXp5JyxcbiAgICAgICAgICAgIGxhenlTdGF0dXNMb2FkaW5nQ2xhc3M6ICdzd2lwZXItbGF6eS1sb2FkaW5nJyxcbiAgICAgICAgICAgIGxhenlTdGF0dXNMb2FkZWRDbGFzczogJ3N3aXBlci1sYXp5LWxvYWRlZCcsXG4gICAgICAgICAgICBsYXp5UHJlbG9hZGVyQ2xhc3M6ICdzd2lwZXItbGF6eS1wcmVsb2FkZXInLFxuICAgICAgICAgICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdzd2lwZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgIHByZWxvYWRlckNsYXNzOiAncHJlbG9hZGVyJyxcbiAgICAgICAgICAgIHpvb21Db250YWluZXJDbGFzczogJ3N3aXBlci16b29tLWNvbnRhaW5lcicsXG4gICAgICAgIFxuICAgICAgICAgICAgLy8gT2JzZXJ2ZXJcbiAgICAgICAgICAgIG9ic2VydmVyOiBmYWxzZSxcbiAgICAgICAgICAgIG9ic2VydmVQYXJlbnRzOiBmYWxzZSxcbiAgICAgICAgICAgIC8vIEFjY2Vzc2liaWxpdHlcbiAgICAgICAgICAgIGExMXk6IGZhbHNlLFxuICAgICAgICAgICAgcHJldlNsaWRlTWVzc2FnZTogJ1ByZXZpb3VzIHNsaWRlJyxcbiAgICAgICAgICAgIG5leHRTbGlkZU1lc3NhZ2U6ICdOZXh0IHNsaWRlJyxcbiAgICAgICAgICAgIGZpcnN0U2xpZGVNZXNzYWdlOiAnVGhpcyBpcyB0aGUgZmlyc3Qgc2xpZGUnLFxuICAgICAgICAgICAgbGFzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGxhc3Qgc2xpZGUnLFxuICAgICAgICAgICAgcGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2U6ICdHbyB0byBzbGlkZSB7e2luZGV4fX0nLFxuICAgICAgICAgICAgLy8gQ2FsbGJhY2tzXG4gICAgICAgICAgICBydW5DYWxsYmFja3NPbkluaXQ6IHRydWVcbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICBDYWxsYmFja3M6XG4gICAgICAgICAgICBvbkluaXQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvbkRlc3Ryb3k6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvbkJlZm9yZVJlc2l6ZTogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uQWZ0ZXJSZXNpemU6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvbkNsaWNrOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25UYXA6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvbkRvdWJsZVRhcDogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uU2xpZGVyTW92ZTogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uU2xpZGVDaGFuZ2VTdGFydDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uU2xpZGVDaGFuZ2VFbmQ6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvblRyYW5zaXRpb25TdGFydDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uVHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uSW1hZ2VzUmVhZHk6IGZ1bmN0aW9uIChzd2lwZXIpXG4gICAgICAgICAgICBvblByb2dyZXNzOiBmdW5jdGlvbiAoc3dpcGVyLCBwcm9ncmVzcylcbiAgICAgICAgICAgIG9uVG91Y2hTdGFydDogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbiAoc3dpcGVyLCBlKVxuICAgICAgICAgICAgb25Ub3VjaE1vdmVPcHBvc2l0ZTogZnVuY3Rpb24gKHN3aXBlciwgZSlcbiAgICAgICAgICAgIG9uVG91Y2hFbmQ6IGZ1bmN0aW9uIChzd2lwZXIsIGUpXG4gICAgICAgICAgICBvblJlYWNoQmVnaW5uaW5nOiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25SZWFjaEVuZDogZnVuY3Rpb24gKHN3aXBlcilcbiAgICAgICAgICAgIG9uU2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKHN3aXBlciwgZHVyYXRpb24pXG4gICAgICAgICAgICBvblNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKHN3aXBlciwgdHJhbnNsYXRlKVxuICAgICAgICAgICAgb25BdXRvcGxheVN0YXJ0OiBmdW5jdGlvbiAoc3dpcGVyKVxuICAgICAgICAgICAgb25BdXRvcGxheVN0b3A6IGZ1bmN0aW9uIChzd2lwZXIpLFxuICAgICAgICAgICAgb25MYXp5SW1hZ2VMb2FkOiBmdW5jdGlvbiAoc3dpcGVyLCBzbGlkZSwgaW1hZ2UpXG4gICAgICAgICAgICBvbkxhenlJbWFnZVJlYWR5OiBmdW5jdGlvbiAoc3dpcGVyLCBzbGlkZSwgaW1hZ2UpXG4gICAgICAgICAgICBvbktleVByZXNzOiBmdW5jdGlvbiAoc3dpcGVyLCBrZXlDb2RlKVxuICAgICAgICAgICAgKi9cbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHZhciBpbml0aWFsVmlydHVhbFRyYW5zbGF0ZSA9IHBhcmFtcyAmJiBwYXJhbXMudmlydHVhbFRyYW5zbGF0ZTtcbiAgICAgICAgXG4gICAgICAgIHBhcmFtcyA9IHBhcmFtcyB8fCB7fTtcbiAgICAgICAgdmFyIG9yaWdpbmFsUGFyYW1zID0ge307XG4gICAgICAgIGZvciAodmFyIHBhcmFtIGluIHBhcmFtcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbcGFyYW1dID09PSAnb2JqZWN0JyAmJiBwYXJhbXNbcGFyYW1dICE9PSBudWxsICYmICEocGFyYW1zW3BhcmFtXS5ub2RlVHlwZSB8fCBwYXJhbXNbcGFyYW1dID09PSB3aW5kb3cgfHwgcGFyYW1zW3BhcmFtXSA9PT0gZG9jdW1lbnQgfHwgKHR5cGVvZiBEb203ICE9PSAndW5kZWZpbmVkJyAmJiBwYXJhbXNbcGFyYW1dIGluc3RhbmNlb2YgRG9tNykgfHwgKHR5cGVvZiBqUXVlcnkgIT09ICd1bmRlZmluZWQnICYmIHBhcmFtc1twYXJhbV0gaW5zdGFuY2VvZiBqUXVlcnkpKSkge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFyYW1zW3BhcmFtXSA9IHt9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGRlZXBQYXJhbSBpbiBwYXJhbXNbcGFyYW1dKSB7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFyYW1zW3BhcmFtXVtkZWVwUGFyYW1dID0gcGFyYW1zW3BhcmFtXVtkZWVwUGFyYW1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsUGFyYW1zW3BhcmFtXSA9IHBhcmFtc1twYXJhbV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgZGVmIGluIGRlZmF1bHRzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtc1tkZWZdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHBhcmFtc1tkZWZdID0gZGVmYXVsdHNbZGVmXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBwYXJhbXNbZGVmXSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBkZWVwRGVmIGluIGRlZmF1bHRzW2RlZl0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJhbXNbZGVmXVtkZWVwRGVmXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtc1tkZWZdW2RlZXBEZWZdID0gZGVmYXVsdHNbZGVmXVtkZWVwRGVmXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gU3dpcGVyXG4gICAgICAgIHZhciBzID0gdGhpcztcbiAgICAgICAgXG4gICAgICAgIC8vIFBhcmFtc1xuICAgICAgICBzLnBhcmFtcyA9IHBhcmFtcztcbiAgICAgICAgcy5vcmlnaW5hbFBhcmFtcyA9IG9yaWdpbmFsUGFyYW1zO1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xhc3NuYW1lXG4gICAgICAgIHMuY2xhc3NOYW1lcyA9IFtdO1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBEb20gTGlicmFyeSBhbmQgcGx1Z2luc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGlmICh0eXBlb2YgJCAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIERvbTcgIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICQgPSBEb203O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgJCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRG9tNyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAkID0gd2luZG93LkRvbTcgfHwgd2luZG93LlplcHRvIHx8IHdpbmRvdy5qUXVlcnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAkID0gRG9tNztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghJCkgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIEV4cG9ydCBpdCB0byBTd2lwZXIgaW5zdGFuY2VcbiAgICAgICAgcy4kID0gJDtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEJyZWFrcG9pbnRzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5jdXJyZW50QnJlYWtwb2ludCA9IHVuZGVmaW5lZDtcbiAgICAgICAgcy5nZXRBY3RpdmVCcmVha3BvaW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy9HZXQgYnJlYWtwb2ludCBmb3Igd2luZG93IHdpZHRoXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmJyZWFrcG9pbnRzKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludCA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHBvaW50cyA9IFtdLCBwb2ludDtcbiAgICAgICAgICAgIGZvciAoIHBvaW50IGluIHMucGFyYW1zLmJyZWFrcG9pbnRzICkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5icmVha3BvaW50cy5oYXNPd25Qcm9wZXJ0eShwb2ludCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcG9pbnRzLnB1c2gocG9pbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBvaW50cy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KGEsIDEwKSA+IHBhcnNlSW50KGIsIDEwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwb2ludCA9IHBvaW50c1tpXTtcbiAgICAgICAgICAgICAgICBpZiAocG9pbnQgPj0gd2luZG93LmlubmVyV2lkdGggJiYgIWJyZWFrcG9pbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBicmVha3BvaW50IHx8ICdtYXgnO1xuICAgICAgICB9O1xuICAgICAgICBzLnNldEJyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvL1NldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGggYW5kIHVwZGF0ZSBwYXJhbWV0ZXJzXG4gICAgICAgICAgICB2YXIgYnJlYWtwb2ludCA9IHMuZ2V0QWN0aXZlQnJlYWtwb2ludCgpO1xuICAgICAgICAgICAgaWYgKGJyZWFrcG9pbnQgJiYgcy5jdXJyZW50QnJlYWtwb2ludCAhPT0gYnJlYWtwb2ludCkge1xuICAgICAgICAgICAgICAgIHZhciBicmVha1BvaW50c1BhcmFtcyA9IGJyZWFrcG9pbnQgaW4gcy5wYXJhbXMuYnJlYWtwb2ludHMgPyBzLnBhcmFtcy5icmVha3BvaW50c1ticmVha3BvaW50XSA6IHMub3JpZ2luYWxQYXJhbXM7XG4gICAgICAgICAgICAgICAgdmFyIG5lZWRzUmVMb29wID0gcy5wYXJhbXMubG9vcCAmJiAoYnJlYWtQb2ludHNQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcy5wYXJhbXMuc2xpZGVzUGVyVmlldyk7XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIHBhcmFtIGluIGJyZWFrUG9pbnRzUGFyYW1zICkge1xuICAgICAgICAgICAgICAgICAgICBzLnBhcmFtc1twYXJhbV0gPSBicmVha1BvaW50c1BhcmFtc1twYXJhbV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuICAgICAgICAgICAgICAgIGlmKG5lZWRzUmVMb29wICYmIHMuZGVzdHJveUxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5yZUxvb3AodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBTZXQgYnJlYWtwb2ludCBvbiBsb2FkXG4gICAgICAgIGlmIChzLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICAgICAgcy5zZXRCcmVha3BvaW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFByZXBhcmF0aW9uIC0gRGVmaW5lIENvbnRhaW5lciwgV3JhcHBlciBhbmQgUGFnaW5hdGlvblxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuY29udGFpbmVyID0gJChjb250YWluZXIpO1xuICAgICAgICBpZiAocy5jb250YWluZXIubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIGlmIChzLmNvbnRhaW5lci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICB2YXIgc3dpcGVycyA9IFtdO1xuICAgICAgICAgICAgcy5jb250YWluZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbnRhaW5lciA9IHRoaXM7XG4gICAgICAgICAgICAgICAgc3dpcGVycy5wdXNoKG5ldyBTd2lwZXIodGhpcywgcGFyYW1zKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBzd2lwZXJzO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBTYXZlIGluc3RhbmNlIGluIGNvbnRhaW5lciBIVE1MIEVsZW1lbnQgYW5kIGluIGRhdGFcbiAgICAgICAgcy5jb250YWluZXJbMF0uc3dpcGVyID0gcztcbiAgICAgICAgcy5jb250YWluZXIuZGF0YSgnc3dpcGVyJywgcyk7XG4gICAgICAgIFxuICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgcy5wYXJhbXMuZGlyZWN0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArICdmcmVlLW1vZGUnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXMuc3VwcG9ydC5mbGV4Ym94KSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ25vLWZsZXhib3gnKTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnYXV0b2hlaWdodCcpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEVuYWJsZSBzbGlkZXMgcHJvZ3Jlc3Mgd2hlbiByZXF1aXJlZFxuICAgICAgICBpZiAocy5wYXJhbXMucGFyYWxsYXggfHwgcy5wYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7XG4gICAgICAgICAgICBzLnBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBNYXggcmVzaXN0YW5jZSB3aGVuIHRvdWNoUmVsZWFzZU9uRWRnZXNcbiAgICAgICAgaWYgKHMucGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLnJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ292ZXJmbG93IC8gM0RcbiAgICAgICAgaWYgKFsnY3ViZScsICdjb3ZlcmZsb3cnLCAnZmxpcCddLmluZGV4T2Yocy5wYXJhbXMuZWZmZWN0KSA+PSAwKSB7XG4gICAgICAgICAgICBpZiAocy5zdXBwb3J0LnRyYW5zZm9ybXMzZCkge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHMuY2xhc3NOYW1lcy5wdXNoKHMucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyAnM2QnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zLmVmZmVjdCA9ICdzbGlkZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArIHMucGFyYW1zLmVmZmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCA9PT0gJ2N1YmUnKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5yZXNpc3RhbmNlUmF0aW8gPSAwO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9IDE7XG4gICAgICAgICAgICBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNwYWNlQmV0d2VlbiA9IDA7XG4gICAgICAgICAgICBzLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ID09PSAnZmFkZScgfHwgcy5wYXJhbXMuZWZmZWN0ID09PSAnZmxpcCcpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPSAxO1xuICAgICAgICAgICAgcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uID0gMTtcbiAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwID0gMTtcbiAgICAgICAgICAgIHMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICAgICAgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaW5pdGlhbFZpcnR1YWxUcmFuc2xhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEdyYWIgQ3Vyc29yXG4gICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yICYmIHMuc3VwcG9ydC50b3VjaCkge1xuICAgICAgICAgICAgcy5wYXJhbXMuZ3JhYkN1cnNvciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBXcmFwcGVyXG4gICAgICAgIHMud3JhcHBlciA9IHMuY29udGFpbmVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLndyYXBwZXJDbGFzcyk7XG4gICAgICAgIFxuICAgICAgICAvLyBQYWdpbmF0aW9uXG4gICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uKSB7XG4gICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIgPSAkKHMucGFyYW1zLnBhZ2luYXRpb24pO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBzLnBhcmFtcy5wYWdpbmF0aW9uID09PSAnc3RyaW5nJyAmJiBzLnBhZ2luYXRpb25Db250YWluZXIubGVuZ3RoID4gMSAmJiBzLmNvbnRhaW5lci5maW5kKHMucGFyYW1zLnBhZ2luYXRpb24pLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lciA9IHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMucGFnaW5hdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAnYnVsbGV0cycgJiYgcy5wYXJhbXMucGFnaW5hdGlvbkNsaWNrYWJsZSkge1xuICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5hZGRDbGFzcyhzLnBhcmFtcy5wYWdpbmF0aW9uTW9kaWZpZXJDbGFzcyArICdjbGlja2FibGUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zLnBhZ2luYXRpb25DbGlja2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5hZGRDbGFzcyhzLnBhcmFtcy5wYWdpbmF0aW9uTW9kaWZpZXJDbGFzcyArIHMucGFyYW1zLnBhZ2luYXRpb25UeXBlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBOZXh0L1ByZXYgQnV0dG9uc1xuICAgICAgICBpZiAocy5wYXJhbXMubmV4dEJ1dHRvbiB8fCBzLnBhcmFtcy5wcmV2QnV0dG9uKSB7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubmV4dEJ1dHRvbikge1xuICAgICAgICAgICAgICAgIHMubmV4dEJ1dHRvbiA9ICQocy5wYXJhbXMubmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBzLnBhcmFtcy5uZXh0QnV0dG9uID09PSAnc3RyaW5nJyAmJiBzLm5leHRCdXR0b24ubGVuZ3RoID4gMSAmJiBzLmNvbnRhaW5lci5maW5kKHMucGFyYW1zLm5leHRCdXR0b24pLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBzLm5leHRCdXR0b24gPSBzLmNvbnRhaW5lci5maW5kKHMucGFyYW1zLm5leHRCdXR0b24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2QnV0dG9uKSB7XG4gICAgICAgICAgICAgICAgcy5wcmV2QnV0dG9uID0gJChzLnBhcmFtcy5wcmV2QnV0dG9uKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHMucGFyYW1zLnByZXZCdXR0b24gPT09ICdzdHJpbmcnICYmIHMucHJldkJ1dHRvbi5sZW5ndGggPiAxICYmIHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMucHJldkJ1dHRvbikubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucHJldkJ1dHRvbiA9IHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMucHJldkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBJcyBIb3Jpem9udGFsXG4gICAgICAgIHMuaXNIb3Jpem9udGFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHMucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgICB9O1xuICAgICAgICAvLyBzLmlzSCA9IGlzSDtcbiAgICAgICAgXG4gICAgICAgIC8vIFJUTFxuICAgICAgICBzLnJ0bCA9IHMuaXNIb3Jpem9udGFsKCkgJiYgKHMuY29udGFpbmVyWzBdLmRpci50b0xvd2VyQ2FzZSgpID09PSAncnRsJyB8fCBzLmNvbnRhaW5lci5jc3MoJ2RpcmVjdGlvbicpID09PSAncnRsJyk7XG4gICAgICAgIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgcy5jbGFzc05hbWVzLnB1c2gocy5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyArICdydGwnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gV3JvbmcgUlRMIHN1cHBvcnRcbiAgICAgICAgaWYgKHMucnRsKSB7XG4gICAgICAgICAgICBzLndyb25nUlRMID0gcy53cmFwcGVyLmNzcygnZGlzcGxheScpID09PSAnLXdlYmtpdC1ib3gnO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAvLyBDb2x1bW5zXG4gICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ211bHRpcm93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIENoZWNrIGZvciBBbmRyb2lkXG4gICAgICAgIGlmIChzLmRldmljZS5hbmRyb2lkKSB7XG4gICAgICAgICAgICBzLmNsYXNzTmFtZXMucHVzaChzLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzICsgJ2FuZHJvaWQnKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgLy8gQWRkIGNsYXNzZXNcbiAgICAgICAgcy5jb250YWluZXIuYWRkQ2xhc3Mocy5jbGFzc05hbWVzLmpvaW4oJyAnKSk7XG4gICAgICAgIFxuICAgICAgICAvLyBUcmFuc2xhdGVcbiAgICAgICAgcy50cmFuc2xhdGUgPSAwO1xuICAgICAgICBcbiAgICAgICAgLy8gUHJvZ3Jlc3NcbiAgICAgICAgcy5wcm9ncmVzcyA9IDA7XG4gICAgICAgIFxuICAgICAgICAvLyBWZWxvY2l0eVxuICAgICAgICBzLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIExvY2tzLCB1bmxvY2tzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5sb2NrU3dpcGVUb05leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9PT0gZmFsc2UgJiYgcy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgICAgIHMudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMubG9ja1N3aXBlVG9QcmV2ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPT09IGZhbHNlICYmIHMucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBzLnVuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLmxvY2tTd2lwZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ID0gcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmdyYWJDdXJzb3IpIHMudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH07XG4gICAgICAgIHMudW5sb2NrU3dpcGVUb05leHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID09PSB0cnVlICYmIHMucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgICAgICAgICBzLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy51bmxvY2tTd2lwZVRvUHJldiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPT09IHRydWUgJiYgcy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgICAgIHMuc2V0R3JhYkN1cnNvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnVubG9ja1N3aXBlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yKSBzLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFJvdW5kIGhlbHBlclxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGZ1bmN0aW9uIHJvdW5kKGEpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKGEpO1xuICAgICAgICB9XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFNldCBncmFiIGN1cnNvclxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuc2V0R3JhYkN1cnNvciA9IGZ1bmN0aW9uKG1vdmluZykge1xuICAgICAgICAgICAgcy5jb250YWluZXJbMF0uc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICAgICAgICAgICAgcy5jb250YWluZXJbMF0uc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJy13ZWJraXQtZ3JhYmJpbmcnIDogJy13ZWJraXQtZ3JhYic7XG4gICAgICAgICAgICBzLmNvbnRhaW5lclswXS5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLW1vei1ncmFiYmluJyA6ICctbW96LWdyYWInO1xuICAgICAgICAgICAgcy5jb250YWluZXJbMF0uc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJ2dyYWJiaW5nJzogJ2dyYWInO1xuICAgICAgICB9O1xuICAgICAgICBzLnVuc2V0R3JhYkN1cnNvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMuY29udGFpbmVyWzBdLnN0eWxlLmN1cnNvciA9ICcnO1xuICAgICAgICB9O1xuICAgICAgICBpZiAocy5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICAgICAgcy5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgICAgIH1cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgVXBkYXRlIG9uIEltYWdlcyBSZWFkeVxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuaW1hZ2VzVG9Mb2FkID0gW107XG4gICAgICAgIHMuaW1hZ2VzTG9hZGVkID0gMDtcbiAgICAgICAgXG4gICAgICAgIHMubG9hZEltYWdlID0gZnVuY3Rpb24gKGltZ0VsZW1lbnQsIHNyYywgc3Jjc2V0LCBzaXplcywgY2hlY2tGb3JDb21wbGV0ZSwgY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBpbWFnZTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIG9uUmVhZHkgKCkge1xuICAgICAgICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghaW1nRWxlbWVudC5jb21wbGV0ZSB8fCAhY2hlY2tGb3JDb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1hZ2UgPSBuZXcgd2luZG93LkltYWdlKCk7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLm9ubG9hZCA9IG9uUmVhZHk7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlLm9uZXJyb3IgPSBvblJlYWR5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLnNpemVzID0gc2l6ZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2Uuc3Jjc2V0ID0gc3Jjc2V0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlLnNyYyA9IHNyYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9uUmVhZHkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIHsvL2ltYWdlIGFscmVhZHkgbG9hZGVkLi4uXG4gICAgICAgICAgICAgICAgb25SZWFkeSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnByZWxvYWRJbWFnZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLmltYWdlc1RvTG9hZCA9IHMuY29udGFpbmVyLmZpbmQoJ2ltZycpO1xuICAgICAgICAgICAgZnVuY3Rpb24gX29uUmVhZHkoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09PSAndW5kZWZpbmVkJyB8fCBzID09PSBudWxsIHx8ICFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHMuaW1hZ2VzTG9hZGVkICE9PSB1bmRlZmluZWQpIHMuaW1hZ2VzTG9hZGVkKys7XG4gICAgICAgICAgICAgICAgaWYgKHMuaW1hZ2VzTG9hZGVkID09PSBzLmltYWdlc1RvTG9hZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnVwZGF0ZU9uSW1hZ2VzUmVhZHkpIHMudXBkYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25JbWFnZXNSZWFkeScsIHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5pbWFnZXNUb0xvYWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzLmxvYWRJbWFnZShzLmltYWdlc1RvTG9hZFtpXSwgKHMuaW1hZ2VzVG9Mb2FkW2ldLmN1cnJlbnRTcmMgfHwgcy5pbWFnZXNUb0xvYWRbaV0uZ2V0QXR0cmlidXRlKCdzcmMnKSksIChzLmltYWdlc1RvTG9hZFtpXS5zcmNzZXQgfHwgcy5pbWFnZXNUb0xvYWRbaV0uZ2V0QXR0cmlidXRlKCdzcmNzZXQnKSksIHMuaW1hZ2VzVG9Mb2FkW2ldLnNpemVzIHx8IHMuaW1hZ2VzVG9Mb2FkW2ldLmdldEF0dHJpYnV0ZSgnc2l6ZXMnKSwgdHJ1ZSwgX29uUmVhZHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgQXV0b3BsYXlcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmF1dG9wbGF5VGltZW91dElkID0gdW5kZWZpbmVkO1xuICAgICAgICBzLmF1dG9wbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHMuYXV0b3BsYXlQYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgZnVuY3Rpb24gYXV0b3BsYXkoKSB7XG4gICAgICAgICAgICB2YXIgYXV0b3BsYXlEZWxheSA9IHMucGFyYW1zLmF1dG9wbGF5O1xuICAgICAgICAgICAgdmFyIGFjdGl2ZVNsaWRlID0gcy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICBpZiAoYWN0aXZlU2xpZGUuYXR0cignZGF0YS1zd2lwZXItYXV0b3BsYXknKSkge1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5RGVsYXkgPSBhY3RpdmVTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpIHx8IHMucGFyYW1zLmF1dG9wbGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5hdXRvcGxheVRpbWVvdXRJZCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZml4TG9vcCgpO1xuICAgICAgICAgICAgICAgICAgICBzLl9zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5Jywgcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXMuaXNFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuX3NsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkF1dG9wbGF5Jywgcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXBhcmFtcy5hdXRvcGxheVN0b3BPbkxhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLl9zbGlkZVRvKDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25BdXRvcGxheScsIHMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGF1dG9wbGF5RGVsYXkpO1xuICAgICAgICB9XG4gICAgICAgIHMuc3RhcnRBdXRvcGxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5hdXRvcGxheVRpbWVvdXRJZCAhPT0gJ3VuZGVmaW5lZCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYXV0b3BsYXkpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGlmIChzLmF1dG9wbGF5aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBzLmF1dG9wbGF5aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHMuZW1pdCgnb25BdXRvcGxheVN0YXJ0Jywgcyk7XG4gICAgICAgICAgICBhdXRvcGxheSgpO1xuICAgICAgICB9O1xuICAgICAgICBzLnN0b3BBdXRvcGxheSA9IGZ1bmN0aW9uIChpbnRlcm5hbCkge1xuICAgICAgICAgICAgaWYgKCFzLmF1dG9wbGF5VGltZW91dElkKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocy5hdXRvcGxheVRpbWVvdXRJZCkgY2xlYXJUaW1lb3V0KHMuYXV0b3BsYXlUaW1lb3V0SWQpO1xuICAgICAgICAgICAgcy5hdXRvcGxheWluZyA9IGZhbHNlO1xuICAgICAgICAgICAgcy5hdXRvcGxheVRpbWVvdXRJZCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHMuZW1pdCgnb25BdXRvcGxheVN0b3AnLCBzKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5wYXVzZUF1dG9wbGF5ID0gZnVuY3Rpb24gKHNwZWVkKSB7XG4gICAgICAgICAgICBpZiAocy5hdXRvcGxheVBhdXNlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHMuYXV0b3BsYXlUaW1lb3V0SWQpIGNsZWFyVGltZW91dChzLmF1dG9wbGF5VGltZW91dElkKTtcbiAgICAgICAgICAgIHMuYXV0b3BsYXlQYXVzZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcy5hdXRvcGxheVBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGF1dG9wbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBzLmF1dG9wbGF5UGF1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcy5hdXRvcGxheWluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgTWluL01heCBUcmFuc2xhdGVcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLm1pblRyYW5zbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoLXMuc25hcEdyaWRbMF0pO1xuICAgICAgICB9O1xuICAgICAgICBzLm1heFRyYW5zbGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoLXMuc25hcEdyaWRbcy5zbmFwR3JpZC5sZW5ndGggLSAxXSk7XG4gICAgICAgIH07XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFNsaWRlci9zbGlkZXMgc2l6ZXNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYWN0aXZlU2xpZGVzID0gW107XG4gICAgICAgICAgICB2YXIgbmV3SGVpZ2h0ID0gMDtcbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZpbmQgc2xpZGVzIGN1cnJlbnRseSBpbiB2aWV3XG4gICAgICAgICAgICBpZihzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHMucGFyYW1zLnNsaWRlc1BlclZpZXcpOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcy5hY3RpdmVJbmRleCArIGk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID4gcy5zbGlkZXMubGVuZ3RoKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2gocy5zbGlkZXMuZXEoaW5kZXgpWzBdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpWzBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBGaW5kIG5ldyBoZWlnaHQgZnJvbSBoZWlnaGVzdCBzbGlkZSBpbiB2aWV3XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZXNbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBhY3RpdmVTbGlkZXNbaV0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICBuZXdIZWlnaHQgPSBoZWlnaHQgPiBuZXdIZWlnaHQgPyBoZWlnaHQgOiBuZXdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBIZWlnaHRcbiAgICAgICAgICAgIGlmIChuZXdIZWlnaHQpIHMud3JhcHBlci5jc3MoJ2hlaWdodCcsIG5ld0hlaWdodCArICdweCcpO1xuICAgICAgICB9O1xuICAgICAgICBzLnVwZGF0ZUNvbnRhaW5lclNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgd2lkdGgsIGhlaWdodDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5wYXJhbXMud2lkdGggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBzLnBhcmFtcy53aWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHdpZHRoID0gcy5jb250YWluZXJbMF0uY2xpZW50V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHMucGFyYW1zLmhlaWdodCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBzLnBhcmFtcy5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBzLmNvbnRhaW5lclswXS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAod2lkdGggPT09IDAgJiYgcy5pc0hvcml6b250YWwoKSB8fCBoZWlnaHQgPT09IDAgJiYgIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy9TdWJ0cmFjdCBwYWRkaW5nc1xuICAgICAgICAgICAgd2lkdGggPSB3aWR0aCAtIHBhcnNlSW50KHMuY29udGFpbmVyLmNzcygncGFkZGluZy1sZWZ0JyksIDEwKSAtIHBhcnNlSW50KHMuY29udGFpbmVyLmNzcygncGFkZGluZy1yaWdodCcpLCAxMCk7XG4gICAgICAgICAgICBoZWlnaHQgPSBoZWlnaHQgLSBwYXJzZUludChzLmNvbnRhaW5lci5jc3MoJ3BhZGRpbmctdG9wJyksIDEwKSAtIHBhcnNlSW50KHMuY29udGFpbmVyLmNzcygncGFkZGluZy1ib3R0b20nKSwgMTApO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFN0b3JlIHZhbHVlc1xuICAgICAgICAgICAgcy53aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgICAgICBzLnNpemUgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy53aWR0aCA6IHMuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy51cGRhdGVTbGlkZXNTaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcy5zbGlkZXMgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyk7XG4gICAgICAgICAgICBzLnNuYXBHcmlkID0gW107XG4gICAgICAgICAgICBzLnNsaWRlc0dyaWQgPSBbXTtcbiAgICAgICAgICAgIHMuc2xpZGVzU2l6ZXNHcmlkID0gW107XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHNwYWNlQmV0d2VlbiA9IHMucGFyYW1zLnNwYWNlQmV0d2VlbixcbiAgICAgICAgICAgICAgICBzbGlkZVBvc2l0aW9uID0gLXMucGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZSxcbiAgICAgICAgICAgICAgICBpLFxuICAgICAgICAgICAgICAgIHByZXZTbGlkZVNpemUgPSAwLFxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5zaXplID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwICogcy5zaXplO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHMudmlydHVhbFNpemUgPSAtc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgICAgLy8gcmVzZXQgbWFyZ2luc1xuICAgICAgICAgICAgaWYgKHMucnRsKSBzLnNsaWRlcy5jc3Moe21hcmdpbkxlZnQ6ICcnLCBtYXJnaW5Ub3A6ICcnfSk7XG4gICAgICAgICAgICBlbHNlIHMuc2xpZGVzLmNzcyh7bWFyZ2luUmlnaHQ6ICcnLCBtYXJnaW5Cb3R0b206ICcnfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uID4gMSkge1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHMuc2xpZGVzLmxlbmd0aCAvIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbikgPT09IHMuc2xpZGVzLmxlbmd0aCAvIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbikge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gcy5zbGlkZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGguY2VpbChzLnNsaWRlcy5sZW5ndGggLyBzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pICogcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nICYmIHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdyb3cnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgPSBNYXRoLm1heChzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzLCBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICogcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gQ2FsYyBzbGlkZXNcbiAgICAgICAgICAgIHZhciBzbGlkZVNpemU7XG4gICAgICAgICAgICB2YXIgc2xpZGVzUGVyQ29sdW1uID0gcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uO1xuICAgICAgICAgICAgdmFyIHNsaWRlc1BlclJvdyA9IHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgLyBzbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICB2YXIgbnVtRnVsbENvbHVtbnMgPSBzbGlkZXNQZXJSb3cgLSAocy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uICogc2xpZGVzUGVyUm93IC0gcy5zbGlkZXMubGVuZ3RoKTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHNsaWRlU2l6ZSA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHNsaWRlcyBvcmRlclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3U2xpZGVPcmRlckluZGV4O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1uLCByb3c7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJDb2x1bW5GaWxsID09PSAnY29sdW1uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gTWF0aC5mbG9vcihpIC8gc2xpZGVzUGVyQ29sdW1uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IGkgLSBjb2x1bW4gKiBzbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29sdW1uID4gbnVtRnVsbENvbHVtbnMgfHwgKGNvbHVtbiA9PT0gbnVtRnVsbENvbHVtbnMgJiYgcm93ID09PSBzbGlkZXNQZXJDb2x1bW4tMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKytyb3cgPj0gc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NsaWRlT3JkZXJJbmRleCA9IGNvbHVtbiArIHJvdyAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MgLyBzbGlkZXNQZXJDb2x1bW47XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jc3Moe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLXdlYmtpdC1ib3gtb3JkaW5hbC1ncm91cCc6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy1tb3otYm94LW9yZGluYWwtZ3JvdXAnOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICctbXMtZmxleC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJy13ZWJraXQtb3JkZXInOiBuZXdTbGlkZU9yZGVySW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdvcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gTWF0aC5mbG9vcihpIC8gc2xpZGVzUGVyUm93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IGkgLSByb3cgKiBzbGlkZXNQZXJSb3c7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jc3MoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ21hcmdpbi0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAndG9wJyA6ICdsZWZ0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHJvdyAhPT0gMCAmJiBzLnBhcmFtcy5zcGFjZUJldHdlZW4pICYmIChzLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAncHgnKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ2RhdGEtc3dpcGVyLWNvbHVtbicsIGNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgICAgIC5hdHRyKCdkYXRhLXN3aXBlci1yb3cnLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlLmNzcygnZGlzcGxheScpID09PSAnbm9uZScpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVTaXplID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLm91dGVyV2lkdGgodHJ1ZSkgOiBzbGlkZS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gcm91bmQoc2xpZGVTaXplKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlU2l6ZSA9IChzLnNpemUgLSAocy5wYXJhbXMuc2xpZGVzUGVyVmlldyAtIDEpICogc3BhY2VCZXR3ZWVuKSAvIHMucGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IHJvdW5kKHNsaWRlU2l6ZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbaV0uc3R5bGUud2lkdGggPSBzbGlkZVNpemUgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbaV0uc3R5bGUuaGVpZ2h0ID0gc2xpZGVTaXplICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLnNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgICAgICAgICAgICAgcy5zbGlkZXNTaXplc0dyaWQucHVzaChzbGlkZVNpemUpO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplIC8gMiArIHByZXZTbGlkZVNpemUgLyAyICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgICAgICAgICAgICAgICBpZihwcmV2U2xpZGVTaXplID09PSAwICYmIGkgIT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gcy5zaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gcy5zaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHNsaWRlUG9zaXRpb24pIDwgMSAvIDEwMDApIHNsaWRlUG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoKGluZGV4KSAlIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzLnNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpbmRleCkgJSBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgcy5zbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICBzLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgcHJldlNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaW5kZXggKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLnZpcnR1YWxTaXplID0gTWF0aC5tYXgocy52aXJ0dWFsU2l6ZSwgcy5zaXplKSArIHMucGFyYW1zLnNsaWRlc09mZnNldEFmdGVyO1xuICAgICAgICAgICAgdmFyIG5ld1NsaWRlc0dyaWQ7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHMucnRsICYmIHMud3JvbmdSVEwgJiYgKHMucGFyYW1zLmVmZmVjdCA9PT0gJ3NsaWRlJyB8fCBzLnBhcmFtcy5lZmZlY3QgPT09ICdjb3ZlcmZsb3cnKSkge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5jc3Moe3dpZHRoOiBzLnZpcnR1YWxTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzLnN1cHBvcnQuZmxleGJveCB8fCBzLnBhcmFtcy5zZXRXcmFwcGVyU2l6ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSBzLndyYXBwZXIuY3NzKHt3aWR0aDogcy52aXJ0dWFsU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgICAgICBlbHNlIHMud3JhcHBlci5jc3Moe2hlaWdodDogcy52aXJ0dWFsU2l6ZSArIHMucGFyYW1zLnNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uID4gMSkge1xuICAgICAgICAgICAgICAgIHMudmlydHVhbFNpemUgPSAoc2xpZGVTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuKSAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XG4gICAgICAgICAgICAgICAgcy52aXJ0dWFsU2l6ZSA9IE1hdGguY2VpbChzLnZpcnR1YWxTaXplIC8gcy5wYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSAtIHMucGFyYW1zLnNwYWNlQmV0d2VlbjtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkgcy53cmFwcGVyLmNzcyh7d2lkdGg6IHMudmlydHVhbFNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICAgICAgZWxzZSBzLndyYXBwZXIuY3NzKHtoZWlnaHQ6IHMudmlydHVhbFNpemUgKyBzLnBhcmFtcy5zcGFjZUJldHdlZW4gKyAncHgnfSk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1NsaWRlc0dyaWQgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc25hcEdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNuYXBHcmlkW2ldIDwgcy52aXJ0dWFsU2l6ZSArIHMuc25hcEdyaWRbMF0pIG5ld1NsaWRlc0dyaWQucHVzaChzLnNuYXBHcmlkW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzLnNuYXBHcmlkID0gbmV3U2xpZGVzR3JpZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gUmVtb3ZlIGxhc3QgZ3JpZCBlbGVtZW50cyBkZXBlbmRpbmcgb24gd2lkdGhcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICBuZXdTbGlkZXNHcmlkID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuc25hcEdyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc25hcEdyaWRbaV0gPD0gcy52aXJ0dWFsU2l6ZSAtIHMuc2l6ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2xpZGVzR3JpZC5wdXNoKHMuc25hcEdyaWRbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMuc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuICAgICAgICAgICAgICAgIGlmIChNYXRoLmZsb29yKHMudmlydHVhbFNpemUgLSBzLnNpemUpIC0gTWF0aC5mbG9vcihzLnNuYXBHcmlkW3Muc25hcEdyaWQubGVuZ3RoIC0gMV0pID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBzLnNuYXBHcmlkLnB1c2gocy52aXJ0dWFsU2l6ZSAtIHMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuc25hcEdyaWQubGVuZ3RoID09PSAwKSBzLnNuYXBHcmlkID0gWzBdO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zcGFjZUJldHdlZW4gIT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHMuc2xpZGVzLmNzcyh7bWFyZ2luTGVmdDogc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHMuc2xpZGVzLmNzcyh7bWFyZ2luUmlnaHQ6IHNwYWNlQmV0d2VlbiArICdweCd9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBzLnNsaWRlcy5jc3Moe21hcmdpbkJvdHRvbTogc3BhY2VCZXR3ZWVuICsgJ3B4J30pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnVwZGF0ZVNsaWRlc09mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzLnNsaWRlc1tpXS5zd2lwZXJTbGlkZU9mZnNldCA9IHMuaXNIb3Jpem9udGFsKCkgPyBzLnNsaWRlc1tpXS5vZmZzZXRMZWZ0IDogcy5zbGlkZXNbaV0ub2Zmc2V0VG9wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgRHluYW1pYyBTbGlkZXMgUGVyIFZpZXdcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmN1cnJlbnRTbGlkZXNQZXJWaWV3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNwdiA9IDEsIGksIGo7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2l6ZSA9IHMuc2xpZGVzW3MuYWN0aXZlSW5kZXhdLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICAgICAgICB2YXIgYnJlYWtMb29wO1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IHMuYWN0aXZlSW5kZXggKyAxOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpemUgKz0gcy5zbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3B2ICsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNpemUgPiBzLnNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChqID0gcy5hY3RpdmVJbmRleCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tqXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplICs9IHMuc2xpZGVzW2pdLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwdiArKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaXplID4gcy5zaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gcy5hY3RpdmVJbmRleCArIDE7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNHcmlkW2ldIC0gcy5zbGlkZXNHcmlkW3MuYWN0aXZlSW5kZXhdIDwgcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcHYrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzcHY7XG4gICAgICAgIH07XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFNsaWRlci9zbGlkZXMgcHJvZ3Jlc3NcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLnVwZGF0ZVNsaWRlc1Byb2dyZXNzID0gZnVuY3Rpb24gKHRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmFuc2xhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlID0gcy50cmFuc2xhdGUgfHwgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnNsaWRlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygcy5zbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQgPT09ICd1bmRlZmluZWQnKSBzLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlO1xuICAgICAgICAgICAgaWYgKHMucnRsKSBvZmZzZXRDZW50ZXIgPSB0cmFuc2xhdGU7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gVmlzaWJsZSBTbGlkZXNcbiAgICAgICAgICAgIHMuc2xpZGVzLnJlbW92ZUNsYXNzKHMucGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgKyAocy5wYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzLm1pblRyYW5zbGF0ZSgpIDogMCkgLSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldCkgLyAoc2xpZGUuc3dpcGVyU2xpZGVTaXplICsgcy5wYXJhbXMuc3BhY2VCZXR3ZWVuKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUJlZm9yZSA9IC0ob2Zmc2V0Q2VudGVyIC0gc2xpZGUuc3dpcGVyU2xpZGVPZmZzZXQpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVBZnRlciA9IHNsaWRlQmVmb3JlICsgcy5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc1Zpc2libGUgPVxuICAgICAgICAgICAgICAgICAgICAgICAgKHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPCBzLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVBZnRlciA+IDAgJiYgc2xpZGVBZnRlciA8PSBzLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoc2xpZGVCZWZvcmUgPD0gMCAmJiBzbGlkZUFmdGVyID49IHMuc2l6ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLmVxKGkpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzbGlkZS5wcm9ncmVzcyA9IHMucnRsID8gLXNsaWRlUHJvZ3Jlc3MgOiBzbGlkZVByb2dyZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnVwZGF0ZVByb2dyZXNzID0gZnVuY3Rpb24gKHRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0cmFuc2xhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlID0gcy50cmFuc2xhdGUgfHwgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0cmFuc2xhdGVzRGlmZiA9IHMubWF4VHJhbnNsYXRlKCkgLSBzLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgdmFyIHdhc0JlZ2lubmluZyA9IHMuaXNCZWdpbm5pbmc7XG4gICAgICAgICAgICB2YXIgd2FzRW5kID0gcy5pc0VuZDtcbiAgICAgICAgICAgIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHMucHJvZ3Jlc3MgPSAwO1xuICAgICAgICAgICAgICAgIHMuaXNCZWdpbm5pbmcgPSBzLmlzRW5kID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMucHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gcy5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xuICAgICAgICAgICAgICAgIHMuaXNCZWdpbm5pbmcgPSBzLnByb2dyZXNzIDw9IDA7XG4gICAgICAgICAgICAgICAgcy5pc0VuZCA9IHMucHJvZ3Jlc3MgPj0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLmlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHMuZW1pdCgnb25SZWFjaEJlZ2lubmluZycsIHMpO1xuICAgICAgICAgICAgaWYgKHMuaXNFbmQgJiYgIXdhc0VuZCkgcy5lbWl0KCdvblJlYWNoRW5kJywgcyk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHMudXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgICAgICAgICAgIHMuZW1pdCgnb25Qcm9ncmVzcycsIHMsIHMucHJvZ3Jlc3MpO1xuICAgICAgICB9O1xuICAgICAgICBzLnVwZGF0ZUFjdGl2ZUluZGV4ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHMucnRsID8gcy50cmFuc2xhdGUgOiAtcy50cmFuc2xhdGU7XG4gICAgICAgICAgICB2YXIgbmV3QWN0aXZlSW5kZXgsIGksIHNuYXBJbmRleDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzLnNsaWRlc0dyaWQubGVuZ3RoOyBpICsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHJhbnNsYXRlID49IHMuc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzLnNsaWRlc0dyaWRbaSArIDFdIC0gKHMuc2xpZGVzR3JpZFtpICsgMV0gLSBzLnNsaWRlc0dyaWRbaV0pIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzLnNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlIDwgcy5zbGlkZXNHcmlkW2kgKyAxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZSA+PSBzLnNsaWRlc0dyaWRbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gICAgICAgICAgICBpZihzLnBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KXtcbiAgICAgICAgICAgICAgICBpZiAobmV3QWN0aXZlSW5kZXggPCAwIHx8IHR5cGVvZiBuZXdBY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIG5ld0FjdGl2ZUluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGZvciAoaSA9IDA7IGkgPCBzLnNsaWRlc0dyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAoLSB0cmFuc2xhdGUgPj0gcy5zbGlkZXNHcmlkW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG5ld0FjdGl2ZUluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICBzbmFwSW5kZXggPSBNYXRoLmZsb29yKG5ld0FjdGl2ZUluZGV4IC8gcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgICAgaWYgKHNuYXBJbmRleCA+PSBzLnNuYXBHcmlkLmxlbmd0aCkgc25hcEluZGV4ID0gcy5zbmFwR3JpZC5sZW5ndGggLSAxO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChuZXdBY3RpdmVJbmRleCA9PT0gcy5hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuc25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgICAgICAgcy5wcmV2aW91c0luZGV4ID0gcy5hY3RpdmVJbmRleDtcbiAgICAgICAgICAgIHMuYWN0aXZlSW5kZXggPSBuZXdBY3RpdmVJbmRleDtcbiAgICAgICAgICAgIHMudXBkYXRlQ2xhc3NlcygpO1xuICAgICAgICAgICAgcy51cGRhdGVSZWFsSW5kZXgoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy51cGRhdGVSZWFsSW5kZXggPSBmdW5jdGlvbigpe1xuICAgICAgICAgICAgcy5yZWFsSW5kZXggPSBwYXJzZUludChzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpIHx8IHMuYWN0aXZlSW5kZXgsIDEwKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIENsYXNzZXNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLnVwZGF0ZUNsYXNzZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnNsaWRlcy5yZW1vdmVDbGFzcyhzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzICsgJyAnICsgcy5wYXJhbXMuc2xpZGVOZXh0Q2xhc3MgKyAnICcgKyBzLnBhcmFtcy5zbGlkZVByZXZDbGFzcyArICcgJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MgKyAnICcgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyArICcgJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlUHJldkNsYXNzKTtcbiAgICAgICAgICAgIHZhciBhY3RpdmVTbGlkZSA9IHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgLy8gQWN0aXZlIGNsYXNzZXNcbiAgICAgICAgICAgIGFjdGl2ZVNsaWRlLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgLy8gRHVwbGljYXRlIHRvIGFsbCBsb29wZWQgc2xpZGVzXG4gICAgICAgICAgICAgICAgaWYgKGFjdGl2ZVNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJzpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJylbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcy5yZWFsSW5kZXggKyAnXCJdJykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICcuJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHMucmVhbEluZGV4ICsgJ1wiXScpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5leHQgU2xpZGVcbiAgICAgICAgICAgIHZhciBuZXh0U2xpZGUgPSBhY3RpdmVTbGlkZS5uZXh0KCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wICYmIG5leHRTbGlkZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUgPSBzLnNsaWRlcy5lcSgwKTtcbiAgICAgICAgICAgICAgICBuZXh0U2xpZGUuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gUHJldiBTbGlkZVxuICAgICAgICAgICAgdmFyIHByZXZTbGlkZSA9IGFjdGl2ZVNsaWRlLnByZXYoJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3AgJiYgcHJldlNsaWRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHByZXZTbGlkZSA9IHMuc2xpZGVzLmVxKC0xKTtcbiAgICAgICAgICAgICAgICBwcmV2U2xpZGUuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgLy8gRHVwbGljYXRlIHRvIGFsbCBsb29wZWQgc2xpZGVzXG4gICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICc6bm90KC4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICcpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIG5leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICsgJ1wiXScpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgbmV4dFNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKyAnXCJdJykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJldlNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJzpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJylbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgcHJldlNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKyAnXCJdJykuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJ1tkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIicgKyBwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSArICdcIl0nKS5hZGRDbGFzcyhzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFBhZ2luYXRpb25cbiAgICAgICAgICAgIGlmIChzLnBhZ2luYXRpb25Db250YWluZXIgJiYgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBDdXJyZW50L1RvdGFsXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHRvdGFsID0gcy5wYXJhbXMubG9vcCA/IE1hdGguY2VpbCgocy5zbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMgKiAyKSAvIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHMuc25hcEdyaWQubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBNYXRoLmNlaWwoKHMuYWN0aXZlSW5kZXggLSBzLmxvb3BlZFNsaWRlcykvcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA+IHMuc2xpZGVzLmxlbmd0aCAtIDEgLSBzLmxvb3BlZFNsaWRlcyAqIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBjdXJyZW50IC0gKHMuc2xpZGVzLmxlbmd0aCAtIHMubG9vcGVkU2xpZGVzICogMik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnQgPiB0b3RhbCAtIDEpIGN1cnJlbnQgPSBjdXJyZW50IC0gdG90YWw7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50IDwgMCAmJiBzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSAhPT0gJ2J1bGxldHMnKSBjdXJyZW50ID0gdG90YWwgKyBjdXJyZW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnNuYXBJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzLnNuYXBJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnQgPSBzLmFjdGl2ZUluZGV4IHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gVHlwZXNcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdidWxsZXRzJyAmJiBzLmJ1bGxldHMgJiYgcy5idWxsZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcy5idWxsZXRzLnJlbW92ZUNsYXNzKHMucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmJ1bGxldHMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQodGhpcykuaW5kZXgoKSA9PT0gY3VycmVudCkgJCh0aGlzKS5hZGRDbGFzcyhzLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYnVsbGV0cy5lcShjdXJyZW50KS5hZGRDbGFzcyhzLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAnZnJhY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5maW5kKCcuJyArIHMucGFyYW1zLnBhZ2luYXRpb25DdXJyZW50Q2xhc3MpLnRleHQoY3VycmVudCArIDEpO1xuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuZmluZCgnLicgKyBzLnBhcmFtcy5wYWdpbmF0aW9uVG90YWxDbGFzcykudGV4dCh0b3RhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ3Byb2dyZXNzJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NhbGUgPSAoY3VycmVudCArIDEpIC8gdG90YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZVggPSBzY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlWSA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGVZID0gc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZVggPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5maW5kKCcuJyArIHMucGFyYW1zLnBhZ2luYXRpb25Qcm9ncmVzc2JhckNsYXNzKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZVgoJyArIHNjYWxlWCArICcpIHNjYWxlWSgnICsgc2NhbGVZICsgJyknKS50cmFuc2l0aW9uKHMucGFyYW1zLnNwZWVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAnY3VzdG9tJyAmJiBzLnBhcmFtcy5wYWdpbmF0aW9uQ3VzdG9tUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHMucGFnaW5hdGlvbkNvbnRhaW5lci5odG1sKHMucGFyYW1zLnBhZ2luYXRpb25DdXN0b21SZW5kZXIocywgY3VycmVudCArIDEsIHRvdGFsKSk7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25QYWdpbmF0aW9uUmVuZGVyZWQnLCBzLCBzLnBhZ2luYXRpb25Db250YWluZXJbMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBOZXh0L2FjdGl2ZSBidXR0b25zXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldkJ1dHRvbiAmJiBzLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMucHJldkJ1dHRvbi5hZGRDbGFzcyhzLnBhcmFtcy5idXR0b25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5hMTF5LmRpc2FibGUocy5wcmV2QnV0dG9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMucHJldkJ1dHRvbi5yZW1vdmVDbGFzcyhzLnBhcmFtcy5idXR0b25EaXNhYmxlZENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5hMTF5LmVuYWJsZShzLnByZXZCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5uZXh0QnV0dG9uICYmIHMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5uZXh0QnV0dG9uLmFkZENsYXNzKHMucGFyYW1zLmJ1dHRvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLmExMXkuZGlzYWJsZShzLm5leHRCdXR0b24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5uZXh0QnV0dG9uLnJlbW92ZUNsYXNzKHMucGFyYW1zLmJ1dHRvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLmExMXkuZW5hYmxlKHMubmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBQYWdpbmF0aW9uXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy51cGRhdGVQYWdpbmF0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5wYWdpbmF0aW9uKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocy5wYWdpbmF0aW9uQ29udGFpbmVyICYmIHMucGFnaW5hdGlvbkNvbnRhaW5lci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhZ2luYXRpb25IVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25UeXBlID09PSAnYnVsbGV0cycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlck9mQnVsbGV0cyA9IHMucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoKHMuc2xpZGVzLmxlbmd0aCAtIHMubG9vcGVkU2xpZGVzICogMikgLyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZkJ1bGxldHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25CdWxsZXRSZW5kZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBzLnBhcmFtcy5wYWdpbmF0aW9uQnVsbGV0UmVuZGVyKHMsIGksIHMucGFyYW1zLmJ1bGxldENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9ICc8JyArIHMucGFyYW1zLnBhZ2luYXRpb25FbGVtZW50KycgY2xhc3M9XCInICsgcy5wYXJhbXMuYnVsbGV0Q2xhc3MgKyAnXCI+PC8nICsgcy5wYXJhbXMucGFnaW5hdGlvbkVsZW1lbnQgKyAnPic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgICAgICAgICAgICAgICAgICBzLmJ1bGxldHMgPSBzLnBhZ2luYXRpb25Db250YWluZXIuZmluZCgnLicgKyBzLnBhcmFtcy5idWxsZXRDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uQ2xpY2thYmxlICYmIHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkuaW5pdFBhZ2luYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhZ2luYXRpb25GcmFjdGlvblJlbmRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBzLnBhcmFtcy5wYWdpbmF0aW9uRnJhY3Rpb25SZW5kZXIocywgcy5wYXJhbXMucGFnaW5hdGlvbkN1cnJlbnRDbGFzcywgcy5wYXJhbXMucGFnaW5hdGlvblRvdGFsQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbkhUTUwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8c3BhbiBjbGFzcz1cIicgKyBzLnBhcmFtcy5wYWdpbmF0aW9uQ3VycmVudENsYXNzICsgJ1wiPjwvc3Bhbj4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIC8gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJzxzcGFuIGNsYXNzPVwiJyArIHMucGFyYW1zLnBhZ2luYXRpb25Ub3RhbENsYXNzKydcIj48L3NwYW4+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSA9PT0gJ3Byb2dyZXNzJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvblByb2dyZXNzUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHMucGFyYW1zLnBhZ2luYXRpb25Qcm9ncmVzc1JlbmRlcihzLCBzLnBhcmFtcy5wYWdpbmF0aW9uUHJvZ3Jlc3NiYXJDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9ICc8c3BhbiBjbGFzcz1cIicgKyBzLnBhcmFtcy5wYWdpbmF0aW9uUHJvZ3Jlc3NiYXJDbGFzcyArICdcIj48L3NwYW4+JztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXIuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uVHlwZSAhPT0gJ2N1c3RvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblBhZ2luYXRpb25SZW5kZXJlZCcsIHMsIHMucGFnaW5hdGlvbkNvbnRhaW5lclswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBDb21tb24gdXBkYXRlIG1ldGhvZFxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMudXBkYXRlID0gZnVuY3Rpb24gKHVwZGF0ZVRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICBzLnVwZGF0ZUNvbnRhaW5lclNpemUoKTtcbiAgICAgICAgICAgIHMudXBkYXRlU2xpZGVzU2l6ZSgpO1xuICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXIgJiYgcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgICAgICAgICBzLnNjcm9sbGJhci5zZXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBuZXdUcmFuc2xhdGU7XG4gICAgICAgICAgICBmdW5jdGlvbiBmb3JjZVNldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gcy5ydGwgPyAtcy50cmFuc2xhdGUgOiBzLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heChzLnRyYW5zbGF0ZSwgcy5tYXhUcmFuc2xhdGUoKSksIHMubWluVHJhbnNsYXRlKCkpO1xuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh1cGRhdGVUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlZDtcbiAgICAgICAgICAgICAgICBpZiAocy5jb250cm9sbGVyICYmIHMuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcmNlU2V0VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKChzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgcy5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHMuaXNFbmQgJiYgIXMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVkID0gcy5zbGlkZVRvKHMuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHJhbnNsYXRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yY2VTZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFJlc2l6ZSBIYW5kbGVyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5vblJlc2l6ZSA9IGZ1bmN0aW9uIChmb3JjZVVwZGF0ZVBhZ2luYXRpb24pIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vbkJlZm9yZVJlc2l6ZSkgcy5wYXJhbXMub25CZWZvcmVSZXNpemUocyk7XG4gICAgICAgICAgICAvL0JyZWFrcG9pbnRzXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgICAgICAgICBzLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGxvY2tzIG9uIHJlc2l6ZVxuICAgICAgICAgICAgdmFyIGFsbG93U3dpcGVUb1ByZXYgPSBzLnBhcmFtcy5hbGxvd1N3aXBlVG9QcmV2O1xuICAgICAgICAgICAgdmFyIGFsbG93U3dpcGVUb05leHQgPSBzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0O1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9IHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPSB0cnVlO1xuICAgICAgICBcbiAgICAgICAgICAgIHMudXBkYXRlQ29udGFpbmVyU2l6ZSgpO1xuICAgICAgICAgICAgcy51cGRhdGVTbGlkZXNTaXplKCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHMucGFyYW1zLmZyZWVNb2RlIHx8IGZvcmNlVXBkYXRlUGFnaW5hdGlvbikgcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5jb250cm9sbGVyICYmIHMuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuc3BsaW5lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHNsaWRlQ2hhbmdlZEJ5U2xpZGVUbyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHMudHJhbnNsYXRlLCBzLm1heFRyYW5zbGF0ZSgpKSwgcy5taW5UcmFuc2xhdGUoKSk7XG4gICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQ2xhc3NlcygpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoKHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBzLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgcy5pc0VuZCAmJiAhcy5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVDaGFuZ2VkQnlTbGlkZVRvID0gcy5zbGlkZVRvKHMuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlQ2hhbmdlZEJ5U2xpZGVUbyA9IHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxhenlMb2FkaW5nICYmICFzbGlkZUNoYW5nZWRCeVNsaWRlVG8gJiYgcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgcy5sYXp5LmxvYWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFJldHVybiBsb2NrcyBhZnRlciByZXNpemVcbiAgICAgICAgICAgIHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPSBhbGxvd1N3aXBlVG9QcmV2O1xuICAgICAgICAgICAgcy5wYXJhbXMuYWxsb3dTd2lwZVRvTmV4dCA9IGFsbG93U3dpcGVUb05leHQ7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMub25BZnRlclJlc2l6ZSkgcy5wYXJhbXMub25BZnRlclJlc2l6ZShzKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEV2ZW50c1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIFxuICAgICAgICAvL0RlZmluZSBUb3VjaCBFdmVudHNcbiAgICAgICAgcy50b3VjaEV2ZW50c0Rlc2t0b3AgPSB7c3RhcnQ6ICdtb3VzZWRvd24nLCBtb3ZlOiAnbW91c2Vtb3ZlJywgZW5kOiAnbW91c2V1cCd9O1xuICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCkgcy50b3VjaEV2ZW50c0Rlc2t0b3AgPSB7c3RhcnQ6ICdwb2ludGVyZG93bicsIG1vdmU6ICdwb2ludGVybW92ZScsIGVuZDogJ3BvaW50ZXJ1cCd9O1xuICAgICAgICBlbHNlIGlmICh3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHMudG91Y2hFdmVudHNEZXNrdG9wID0ge3N0YXJ0OiAnTVNQb2ludGVyRG93bicsIG1vdmU6ICdNU1BvaW50ZXJNb3ZlJywgZW5kOiAnTVNQb2ludGVyVXAnfTtcbiAgICAgICAgcy50b3VjaEV2ZW50cyA9IHtcbiAgICAgICAgICAgIHN0YXJ0IDogcy5zdXBwb3J0LnRvdWNoIHx8ICFzLnBhcmFtcy5zaW11bGF0ZVRvdWNoICA/ICd0b3VjaHN0YXJ0JyA6IHMudG91Y2hFdmVudHNEZXNrdG9wLnN0YXJ0LFxuICAgICAgICAgICAgbW92ZSA6IHMuc3VwcG9ydC50b3VjaCB8fCAhcy5wYXJhbXMuc2ltdWxhdGVUb3VjaCA/ICd0b3VjaG1vdmUnIDogcy50b3VjaEV2ZW50c0Rlc2t0b3AubW92ZSxcbiAgICAgICAgICAgIGVuZCA6IHMuc3VwcG9ydC50b3VjaCB8fCAhcy5wYXJhbXMuc2ltdWxhdGVUb3VjaCA/ICd0b3VjaGVuZCcgOiBzLnRvdWNoRXZlbnRzRGVza3RvcC5lbmRcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIFxuICAgICAgICAvLyBXUDggVG91Y2ggRXZlbnRzIEZpeFxuICAgICAgICBpZiAod2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB8fCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQpIHtcbiAgICAgICAgICAgIChzLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBzLmNvbnRhaW5lciA6IHMud3JhcHBlcikuYWRkQ2xhc3MoJ3N3aXBlci13cDgtJyArIHMucGFyYW1zLmRpcmVjdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIC8vIEF0dGFjaC9kZXRhY2ggZXZlbnRzXG4gICAgICAgIHMuaW5pdEV2ZW50cyA9IGZ1bmN0aW9uIChkZXRhY2gpIHtcbiAgICAgICAgICAgIHZhciBhY3Rpb25Eb20gPSBkZXRhY2ggPyAnb2ZmJyA6ICdvbic7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gZGV0YWNoID8gJ3JlbW92ZUV2ZW50TGlzdGVuZXInIDogJ2FkZEV2ZW50TGlzdGVuZXInO1xuICAgICAgICAgICAgdmFyIHRvdWNoRXZlbnRzVGFyZ2V0ID0gcy5wYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICdjb250YWluZXInID8gcy5jb250YWluZXJbMF0gOiBzLndyYXBwZXJbMF07XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gcy5zdXBwb3J0LnRvdWNoID8gdG91Y2hFdmVudHNUYXJnZXQgOiBkb2N1bWVudDtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgbW92ZUNhcHR1cmUgPSBzLnBhcmFtcy5uZXN0ZWQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIFxuICAgICAgICAgICAgLy9Ub3VjaCBFdmVudHNcbiAgICAgICAgICAgIGlmIChzLmJyb3dzZXIuaWUpIHtcbiAgICAgICAgICAgICAgICB0b3VjaEV2ZW50c1RhcmdldFthY3Rpb25dKHMudG91Y2hFdmVudHMuc3RhcnQsIHMub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2FjdGlvbl0ocy50b3VjaEV2ZW50cy5tb3ZlLCBzLm9uVG91Y2hNb3ZlLCBtb3ZlQ2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2FjdGlvbl0ocy50b3VjaEV2ZW50cy5lbmQsIHMub25Ub3VjaEVuZCwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC50b3VjaCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFzc2l2ZUxpc3RlbmVyID0gcy50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnICYmIHMuc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcy5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZX0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudHNUYXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLnN0YXJ0LCBzLm9uVG91Y2hTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudHNUYXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLm1vdmUsIHMub25Ub3VjaE1vdmUsIG1vdmVDYXB0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudHNUYXJnZXRbYWN0aW9uXShzLnRvdWNoRXZlbnRzLmVuZCwgcy5vblRvdWNoRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoKHBhcmFtcy5zaW11bGF0ZVRvdWNoICYmICFzLmRldmljZS5pb3MgJiYgIXMuZGV2aWNlLmFuZHJvaWQpIHx8IChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhcy5zdXBwb3J0LnRvdWNoICYmIHMuZGV2aWNlLmlvcykpIHtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hFdmVudHNUYXJnZXRbYWN0aW9uXSgnbW91c2Vkb3duJywgcy5vblRvdWNoU3RhcnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRbYWN0aW9uXSgnbW91c2Vtb3ZlJywgcy5vblRvdWNoTW92ZSwgbW92ZUNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFthY3Rpb25dKCdtb3VzZXVwJywgcy5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2luZG93W2FjdGlvbl0oJ3Jlc2l6ZScsIHMub25SZXNpemUpO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE5leHQsIFByZXYsIEluZGV4XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubmV4dEJ1dHRvbiAmJiBzLm5leHRCdXR0b24gJiYgcy5uZXh0QnV0dG9uLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBzLm5leHRCdXR0b25bYWN0aW9uRG9tXSgnY2xpY2snLCBzLm9uQ2xpY2tOZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMubmV4dEJ1dHRvblthY3Rpb25Eb21dKCdrZXlkb3duJywgcy5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uICYmIHMucHJldkJ1dHRvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgcy5wcmV2QnV0dG9uW2FjdGlvbkRvbV0oJ2NsaWNrJywgcy5vbkNsaWNrUHJldik7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLnByZXZCdXR0b25bYWN0aW9uRG9tXSgna2V5ZG93bicsIHMuYTExeS5vbkVudGVyS2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uICYmIHMucGFyYW1zLnBhZ2luYXRpb25DbGlja2FibGUpIHtcbiAgICAgICAgICAgICAgICBzLnBhZ2luYXRpb25Db250YWluZXJbYWN0aW9uRG9tXSgnY2xpY2snLCAnLicgKyBzLnBhcmFtcy5idWxsZXRDbGFzcywgcy5vbkNsaWNrSW5kZXgpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hMTF5ICYmIHMuYTExeSkgcy5wYWdpbmF0aW9uQ29udGFpbmVyW2FjdGlvbkRvbV0oJ2tleWRvd24nLCAnLicgKyBzLnBhcmFtcy5idWxsZXRDbGFzcywgcy5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldmVudENsaWNrcyB8fCBzLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHRvdWNoRXZlbnRzVGFyZ2V0W2FjdGlvbl0oJ2NsaWNrJywgcy5wcmV2ZW50Q2xpY2tzLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5hdHRhY2hFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLmluaXRFdmVudHMoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5kZXRhY2hFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLmluaXRFdmVudHModHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBIYW5kbGUgQ2xpY2tzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgLy8gUHJldmVudCBDbGlja3NcbiAgICAgICAgcy5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgcy5wcmV2ZW50Q2xpY2tzID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmICghcy5hbGxvd0NsaWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZlbnRDbGlja3MpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uICYmIHMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICAvLyBDbGlja3NcbiAgICAgICAgcy5vbkNsaWNrTmV4dCA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAocy5pc0VuZCAmJiAhcy5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICAgICAgICAgICAgcy5zbGlkZU5leHQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5vbkNsaWNrUHJldiA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAocy5pc0JlZ2lubmluZyAmJiAhcy5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICAgICAgICAgICAgcy5zbGlkZVByZXYoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5vbkNsaWNrSW5kZXggPSBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gJCh0aGlzKS5pbmRleCgpICogcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkgaW5kZXggPSBpbmRleCArIHMubG9vcGVkU2xpZGVzO1xuICAgICAgICAgICAgcy5zbGlkZVRvKGluZGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEhhbmRsZSBUb3VjaGVzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZnVuY3Rpb24gZmluZEVsZW1lbnRJbkV2ZW50KGUsIHNlbGVjdG9yKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSAkKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmICghZWwuaXMoc2VsZWN0b3IpKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5wYXJlbnRzKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3Iubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZvdW5kO1xuICAgICAgICAgICAgICAgICAgICBlbC5wYXJlbnRzKCkuZWFjaChmdW5jdGlvbiAoaW5kZXgsIF9lbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF9lbCA9PT0gc2VsZWN0b3IpIGZvdW5kID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBlbFswXTtcbiAgICAgICAgfVxuICAgICAgICBzLnVwZGF0ZUNsaWNrZWRTbGlkZSA9IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB2YXIgc2xpZGUgPSBmaW5kRWxlbWVudEluRXZlbnQoZSwgJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyk7XG4gICAgICAgICAgICB2YXIgc2xpZGVGb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHNsaWRlKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaV0gPT09IHNsaWRlKSBzbGlkZUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHNsaWRlICYmIHNsaWRlRm91bmQpIHtcbiAgICAgICAgICAgICAgICBzLmNsaWNrZWRTbGlkZSA9IHNsaWRlO1xuICAgICAgICAgICAgICAgIHMuY2xpY2tlZEluZGV4ID0gJChzbGlkZSkuaW5kZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMuY2xpY2tlZFNsaWRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHMuY2xpY2tlZEluZGV4ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zbGlkZVRvQ2xpY2tlZFNsaWRlICYmIHMuY2xpY2tlZEluZGV4ICE9PSB1bmRlZmluZWQgJiYgcy5jbGlja2VkSW5kZXggIT09IHMuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVUb0luZGV4ID0gcy5jbGlja2VkSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHJlYWxJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZHVwbGljYXRlZFNsaWRlcyxcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldyA9IHMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHMuY3VycmVudFNsaWRlc1BlclZpZXcoKSA6IHMucGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuYW5pbWF0aW5nKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KCQocy5jbGlja2VkU2xpZGUpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKHNsaWRlVG9JbmRleCA8IHMubG9vcGVkU2xpZGVzIC0gc2xpZGVzUGVyVmlldy8yKSB8fCAoc2xpZGVUb0luZGV4ID4gcy5zbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMgKyBzbGlkZXNQZXJWaWV3LzIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVUb0luZGV4ID0gcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHJlYWxJbmRleCArICdcIl06bm90KC4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICcpJykuZXEoMCkuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZVRvSW5kZXggPiBzLnNsaWRlcy5sZW5ndGggLSBzbGlkZXNQZXJWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVUb0luZGV4ID0gcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHJlYWxJbmRleCArICdcIl06bm90KC4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcyArICcpJykuZXEoMCkuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgdmFyIGlzVG91Y2hlZCxcbiAgICAgICAgICAgIGlzTW92ZWQsXG4gICAgICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzLFxuICAgICAgICAgICAgdG91Y2hTdGFydFRpbWUsXG4gICAgICAgICAgICBpc1Njcm9sbGluZyxcbiAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGUsXG4gICAgICAgICAgICBzdGFydFRyYW5zbGF0ZSxcbiAgICAgICAgICAgIGFsbG93VGhyZXNob2xkTW92ZSxcbiAgICAgICAgICAgIC8vIEZvcm0gZWxlbWVudHMgdG8gbWF0Y2hcbiAgICAgICAgICAgIGZvcm1FbGVtZW50cyA9ICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSwgYnV0dG9uLCB2aWRlbycsXG4gICAgICAgICAgICAvLyBMYXN0IGNsaWNrIHRpbWVcbiAgICAgICAgICAgIGxhc3RDbGlja1RpbWUgPSBEYXRlLm5vdygpLCBjbGlja1RpbWVvdXQsXG4gICAgICAgICAgICAvL1ZlbG9jaXRpZXNcbiAgICAgICAgICAgIHZlbG9jaXRpZXMgPSBbXSxcbiAgICAgICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2U7XG4gICAgICAgIFxuICAgICAgICAvLyBBbmltYXRpbmcgRmxhZ1xuICAgICAgICBzLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICBcbiAgICAgICAgLy8gVG91Y2hlcyBpbmZvcm1hdGlvblxuICAgICAgICBzLnRvdWNoZXMgPSB7XG4gICAgICAgICAgICBzdGFydFg6IDAsXG4gICAgICAgICAgICBzdGFydFk6IDAsXG4gICAgICAgICAgICBjdXJyZW50WDogMCxcbiAgICAgICAgICAgIGN1cnJlbnRZOiAwLFxuICAgICAgICAgICAgZGlmZjogMFxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gVG91Y2ggaGFuZGxlcnNcbiAgICAgICAgdmFyIGlzVG91Y2hFdmVudCwgc3RhcnRNb3Zpbmc7XG4gICAgICAgIHMub25Ub3VjaFN0YXJ0ID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBpc1RvdWNoRXZlbnQgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JztcbiAgICAgICAgICAgIGlmICghaXNUb3VjaEV2ZW50ICYmICd3aGljaCcgaW4gZSAmJiBlLndoaWNoID09PSAzKSByZXR1cm47XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubm9Td2lwaW5nICYmIGZpbmRFbGVtZW50SW5FdmVudChlLCAnLicgKyBzLnBhcmFtcy5ub1N3aXBpbmdDbGFzcykpIHtcbiAgICAgICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zd2lwZUhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWZpbmRFbGVtZW50SW5FdmVudChlLCBzLnBhcmFtcy5zd2lwZUhhbmRsZXIpKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHN0YXJ0WCA9IHMudG91Y2hlcy5jdXJyZW50WCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgICAgIHZhciBzdGFydFkgPSBzLnRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRG8gTk9UIHN0YXJ0IGlmIGlPUyBlZGdlIHN3aXBlIGlzIGRldGVjdGVkLiBPdGhlcndpc2UgaU9TIGFwcCAoVUlXZWJWaWV3KSBjYW5ub3Qgc3dpcGUtdG8tZ28tYmFjayBhbnltb3JlXG4gICAgICAgICAgICBpZihzLmRldmljZS5pb3MgJiYgcy5wYXJhbXMuaU9TRWRnZVN3aXBlRGV0ZWN0aW9uICYmIHN0YXJ0WCA8PSBzLnBhcmFtcy5pT1NFZGdlU3dpcGVUaHJlc2hvbGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3MgPSB0cnVlO1xuICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBzdGFydE1vdmluZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFggPSBzdGFydFg7XG4gICAgICAgICAgICBzLnRvdWNoZXMuc3RhcnRZID0gc3RhcnRZO1xuICAgICAgICAgICAgdG91Y2hTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgcy5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIHMudXBkYXRlQ29udGFpbmVyU2l6ZSgpO1xuICAgICAgICAgICAgcy5zd2lwZURpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy50aHJlc2hvbGQgPiAwKSBhbGxvd1RocmVzaG9sZE1vdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgaWYgKCQoZS50YXJnZXQpLmlzKGZvcm1FbGVtZW50cykpIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgJChkb2N1bWVudC5hY3RpdmVFbGVtZW50KS5pcyhmb3JtRWxlbWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocHJldmVudERlZmF1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuZW1pdCgnb25Ub3VjaFN0YXJ0JywgcywgZSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLm9uVG91Y2hNb3ZlID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBpZiAoaXNUb3VjaEV2ZW50ICYmIGUudHlwZSA9PT0gJ21vdXNlbW92ZScpIHJldHVybjtcbiAgICAgICAgICAgIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgICAgICAgICAgICAgcy50b3VjaGVzLnN0YXJ0WCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMub25seUV4dGVybmFsKSB7XG4gICAgICAgICAgICAgICAgLy8gaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcy5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKGlzVG91Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBzLnRvdWNoZXMuc3RhcnRYID0gcy50b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFkgPSBzLnRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaG1vdmUnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNUb3VjaEV2ZW50ICYmIHMucGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMgJiYgIXMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVmVydGljYWxcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHMudG91Y2hlcy5jdXJyZW50WSA8IHMudG91Y2hlcy5zdGFydFkgJiYgcy50cmFuc2xhdGUgPD0gcy5tYXhUcmFuc2xhdGUoKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChzLnRvdWNoZXMuY3VycmVudFkgPiBzLnRvdWNoZXMuc3RhcnRZICYmIHMudHJhbnNsYXRlID49IHMubWluVHJhbnNsYXRlKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgKHMudG91Y2hlcy5jdXJyZW50WCA8IHMudG91Y2hlcy5zdGFydFggJiYgcy50cmFuc2xhdGUgPD0gcy5tYXhUcmFuc2xhdGUoKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChzLnRvdWNoZXMuY3VycmVudFggPiBzLnRvdWNoZXMuc3RhcnRYICYmIHMudHJhbnNsYXRlID49IHMubWluVHJhbnNsYXRlKCkpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc1RvdWNoRXZlbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiAkKGUudGFyZ2V0KS5pcyhmb3JtRWxlbWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChhbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblRvdWNoTW92ZScsIHMsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID4gMSkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgIHMudG91Y2hlcy5jdXJyZW50WCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgICAgICAgICAgcy50b3VjaGVzLmN1cnJlbnRZID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHR5cGVvZiBpc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG91Y2hBbmdsZTtcbiAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSAmJiBzLnRvdWNoZXMuY3VycmVudFkgPT09IHMudG91Y2hlcy5zdGFydFkgfHwgIXMuaXNIb3Jpem9udGFsKCkgJiYgcy50b3VjaGVzLmN1cnJlbnRYID09PSBzLnRvdWNoZXMuc3RhcnRYKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaEFuZ2xlID0gTWF0aC5hdGFuMihNYXRoLmFicyhzLnRvdWNoZXMuY3VycmVudFkgLSBzLnRvdWNoZXMuc3RhcnRZKSwgTWF0aC5hYnMocy50b3VjaGVzLmN1cnJlbnRYIC0gcy50b3VjaGVzLnN0YXJ0WCkpICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgICAgICAgICAgICAgaXNTY3JvbGxpbmcgPSBzLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hBbmdsZSA+IHMucGFyYW1zLnRvdWNoQW5nbGUgOiAoOTAgLSB0b3VjaEFuZ2xlID4gcy5wYXJhbXMudG91Y2hBbmdsZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGlzU2Nyb2xsaW5nKSB7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblRvdWNoTW92ZU9wcG9zaXRlJywgcywgZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHN0YXJ0TW92aW5nID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmIChzLnRvdWNoZXMuY3VycmVudFggIT09IHMudG91Y2hlcy5zdGFydFggfHwgcy50b3VjaGVzLmN1cnJlbnRZICE9PSBzLnRvdWNoZXMuc3RhcnRZKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0TW92aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzU2Nyb2xsaW5nKSAge1xuICAgICAgICAgICAgICAgIGlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RhcnRNb3ZpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHMuZW1pdCgnb25TbGlkZXJNb3ZlJywgcywgZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uICYmICFzLnBhcmFtcy5uZXN0ZWQpIHtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNNb3ZlZCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgICAgICBzLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3RhcnRUcmFuc2xhdGUgPSBzLmdldFdyYXBwZXJUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgIGlmIChzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJpZ2dlcignd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kIG9UcmFuc2l0aW9uRW5kIE1TVHJhbnNpdGlvbkVuZCBtc1RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9wbGF5ICYmIHMuYXV0b3BsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmF1dG9wbGF5RGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc3RvcEF1dG9wbGF5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnBhdXNlQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgLy9HcmFiIEN1cnNvclxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5ncmFiQ3Vyc29yICYmIChzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ID09PSB0cnVlIHx8IHMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgPT09IHRydWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2V0R3JhYkN1cnNvcih0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpc01vdmVkID0gdHJ1ZTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgZGlmZiA9IHMudG91Y2hlcy5kaWZmID0gcy5pc0hvcml6b250YWwoKSA/IHMudG91Y2hlcy5jdXJyZW50WCAtIHMudG91Y2hlcy5zdGFydFggOiBzLnRvdWNoZXMuY3VycmVudFkgLSBzLnRvdWNoZXMuc3RhcnRZO1xuICAgICAgICBcbiAgICAgICAgICAgIGRpZmYgPSBkaWZmICogcy5wYXJhbXMudG91Y2hSYXRpbztcbiAgICAgICAgICAgIGlmIChzLnJ0bCkgZGlmZiA9IC1kaWZmO1xuICAgICAgICBcbiAgICAgICAgICAgIHMuc3dpcGVEaXJlY3Rpb24gPSBkaWZmID4gMCA/ICdwcmV2JyA6ICduZXh0JztcbiAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGUgPSBkaWZmICsgc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIGRpc2FibGVQYXJlbnRTd2lwZXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKChkaWZmID4gMCAmJiBjdXJyZW50VHJhbnNsYXRlID4gcy5taW5UcmFuc2xhdGUoKSkpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJlc2lzdGFuY2UpIGN1cnJlbnRUcmFuc2xhdGUgPSBzLm1pblRyYW5zbGF0ZSgpIC0gMSArIE1hdGgucG93KC1zLm1pblRyYW5zbGF0ZSgpICsgc3RhcnRUcmFuc2xhdGUgKyBkaWZmLCBzLnBhcmFtcy5yZXNpc3RhbmNlUmF0aW8pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGlmZiA8IDAgJiYgY3VycmVudFRyYW5zbGF0ZSA8IHMubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJlc2lzdGFuY2UpIGN1cnJlbnRUcmFuc2xhdGUgPSBzLm1heFRyYW5zbGF0ZSgpICsgMSAtIE1hdGgucG93KHMubWF4VHJhbnNsYXRlKCkgLSBzdGFydFRyYW5zbGF0ZSAtIGRpZmYsIHMucGFyYW1zLnJlc2lzdGFuY2VSYXRpbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGRpc2FibGVQYXJlbnRTd2lwZXIpIHtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgJiYgcy5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGN1cnJlbnRUcmFuc2xhdGUgPCBzdGFydFRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGUgPSBzdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiAmJiBzLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicgJiYgY3VycmVudFRyYW5zbGF0ZSA+IHN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBUaHJlc2hvbGRcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy50aHJlc2hvbGQgPiAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcy5wYXJhbXMudGhyZXNob2xkIHx8IGFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudG91Y2hlcy5zdGFydFggPSBzLnRvdWNoZXMuY3VycmVudFg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnRvdWNoZXMuc3RhcnRZID0gcy50b3VjaGVzLmN1cnJlbnRZO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyYW5zbGF0ZSA9IHN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy50b3VjaGVzLmRpZmYgPSBzLmlzSG9yaXpvbnRhbCgpID8gcy50b3VjaGVzLmN1cnJlbnRYIC0gcy50b3VjaGVzLnN0YXJ0WCA6IHMudG91Y2hlcy5jdXJyZW50WSAtIHMudG91Y2hlcy5zdGFydFk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmFuc2xhdGUgPSBzdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmZvbGxvd0ZpbmdlcikgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIFVwZGF0ZSBhY3RpdmUgaW5kZXggaW4gZnJlZSBtb2RlXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGUgfHwgcy5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgICAgIC8vVmVsb2NpdHlcbiAgICAgICAgICAgICAgICBpZiAodmVsb2NpdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBzLnRvdWNoZXNbcy5pc0hvcml6b250YWwoKSA/ICdzdGFydFgnIDogJ3N0YXJ0WSddLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGltZTogdG91Y2hTdGFydFRpbWVcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZlbG9jaXRpZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiBzLnRvdWNoZXNbcy5pc0hvcml6b250YWwoKSA/ICdjdXJyZW50WCcgOiAnY3VycmVudFknXSxcbiAgICAgICAgICAgICAgICAgICAgdGltZTogKG5ldyB3aW5kb3cuRGF0ZSgpKS5nZXRUaW1lKClcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyhjdXJyZW50VHJhbnNsYXRlKTtcbiAgICAgICAgICAgIC8vIFVwZGF0ZSB0cmFuc2xhdGVcbiAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zbGF0ZShjdXJyZW50VHJhbnNsYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5vblRvdWNoRW5kID0gZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAgICAgICBpZiAoYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgICAgICAgICAgICAgIHMuZW1pdCgnb25Ub3VjaEVuZCcsIHMsIGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrcyA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCFpc1RvdWNoZWQpIHJldHVybjtcbiAgICAgICAgICAgIC8vUmV0dXJuIEdyYWIgQ3Vyc29yXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZ3JhYkN1cnNvciAmJiBpc01vdmVkICYmIGlzVG91Y2hlZCAgJiYgKHMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgPT09IHRydWUgfHwgcy5wYXJhbXMuYWxsb3dTd2lwZVRvUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgICAgICAgICAgICBzLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFRpbWUgZGlmZlxuICAgICAgICAgICAgdmFyIHRvdWNoRW5kVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB2YXIgdGltZURpZmYgPSB0b3VjaEVuZFRpbWUgLSB0b3VjaFN0YXJ0VGltZTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBUYXAsIGRvdWJsZVRhcCwgQ2xpY2tcbiAgICAgICAgICAgIGlmIChzLmFsbG93Q2xpY2spIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsaWNrZWRTbGlkZShlKTtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVGFwJywgcywgZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRpbWVEaWZmIDwgMzAwICYmICh0b3VjaEVuZFRpbWUgLSBsYXN0Q2xpY2tUaW1lKSA+IDMwMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2xpY2tUaW1lb3V0KSBjbGVhclRpbWVvdXQoY2xpY2tUaW1lb3V0KTtcbiAgICAgICAgICAgICAgICAgICAgY2xpY2tUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYWdpbmF0aW9uSGlkZSAmJiBzLnBhZ2luYXRpb25Db250YWluZXIubGVuZ3RoID4gMCAmJiAhJChlLnRhcmdldCkuaGFzQ2xhc3Mocy5wYXJhbXMuYnVsbGV0Q2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLnRvZ2dsZUNsYXNzKHMucGFyYW1zLnBhZ2luYXRpb25IaWRkZW5DbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uQ2xpY2snLCBzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gbGFzdENsaWNrVGltZSkgPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaWNrVGltZW91dCkgY2xlYXJUaW1lb3V0KGNsaWNrVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25Eb3VibGVUYXAnLCBzLCBlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgbGFzdENsaWNrVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocykgcy5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNUb3VjaGVkIHx8ICFpc01vdmVkIHx8ICFzLnN3aXBlRGlyZWN0aW9uIHx8IHMudG91Y2hlcy5kaWZmID09PSAwIHx8IGN1cnJlbnRUcmFuc2xhdGUgPT09IHN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICAgICAgaXNUb3VjaGVkID0gaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlzVG91Y2hlZCA9IGlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgY3VycmVudFBvcztcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mb2xsb3dGaW5nZXIpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zID0gcy5ydGwgPyBzLnRyYW5zbGF0ZSA6IC1zLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3MgPSAtY3VycmVudFRyYW5zbGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50UG9zIDwgLXMubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGN1cnJlbnRQb3MgPiAtcy5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXMubGVuZ3RoIDwgcy5zbmFwR3JpZC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLnNuYXBHcmlkLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKHMuc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2ZWxvY2l0aWVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsYXN0TW92ZUV2ZW50ID0gdmVsb2NpdGllcy5wb3AoKSwgdmVsb2NpdHlFdmVudCA9IHZlbG9jaXRpZXMucG9wKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gbGFzdE1vdmVFdmVudC5wb3NpdGlvbiAtIHZlbG9jaXR5RXZlbnQucG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdGltZSA9IGxhc3RNb3ZlRXZlbnQudGltZSAtIHZlbG9jaXR5RXZlbnQudGltZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSBkaXN0YW5jZSAvIHRpbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnZlbG9jaXR5ID0gcy52ZWxvY2l0eSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocy52ZWxvY2l0eSkgPCBzLnBhcmFtcy5mcmVlTW9kZU1pbmltdW1WZWxvY2l0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBpbXBsaWVzIHRoYXQgdGhlIHVzZXIgc3RvcHBlZCBtb3ZpbmcgYSBmaW5nZXIgdGhlbiByZWxlYXNlZC5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZXJlIHdvdWxkIGJlIG5vIGV2ZW50cyB3aXRoIGRpc3RhbmNlIHplcm8sIHNvIHRoZSBsYXN0IGV2ZW50IGlzIHN0YWxlLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRpbWUgPiAxNTAgfHwgKG5ldyB3aW5kb3cuRGF0ZSgpLmdldFRpbWUoKSAtIGxhc3RNb3ZlRXZlbnQudGltZSkgPiAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHMudmVsb2NpdHkgPSBzLnZlbG9jaXR5ICogcy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bVZlbG9jaXR5UmF0aW87XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICB2ZWxvY2l0aWVzLmxlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uID0gMTAwMCAqIHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW1SYXRpbztcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRGlzdGFuY2UgPSBzLnZlbG9jaXR5ICogbW9tZW50dW1EdXJhdGlvbjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHMudHJhbnNsYXRlICsgbW9tZW50dW1EaXN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSBuZXdQb3NpdGlvbiA9IC0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIHZhciBkb0JvdW5jZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWZ0ZXJCb3VuY2VQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvdW5jZUFtb3VudCA9IE1hdGguYWJzKHMudmVsb2NpdHkpICogMjAgKiBzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtQm91bmNlUmF0aW87XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiA8IHMubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZU1vbWVudHVtQm91bmNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5ld1Bvc2l0aW9uICsgcy5tYXhUcmFuc2xhdGUoKSA8IC1ib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzLm1heFRyYW5zbGF0ZSgpIC0gYm91bmNlQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gcy5tYXhUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb0JvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3UG9zaXRpb24gPiBzLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiAtIHMubWluVHJhbnNsYXRlKCkgPiBib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzLm1pblRyYW5zbGF0ZSgpICsgYm91bmNlQW1vdW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gcy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb0JvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBqID0gMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0U2xpZGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgcy5zbmFwR3JpZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNuYXBHcmlkW2pdID4gLW5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHRTbGlkZSA9IGo7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocy5zbmFwR3JpZFtuZXh0U2xpZGVdIC0gbmV3UG9zaXRpb24pIDwgTWF0aC5hYnMocy5zbmFwR3JpZFtuZXh0U2xpZGUgLSAxXSAtIG5ld1Bvc2l0aW9uKSB8fCBzLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3NpdGlvbiA9IHMuc25hcEdyaWRbbmV4dFNsaWRlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzLnNuYXBHcmlkW25leHRTbGlkZSAtIDFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzLnJ0bCkgbmV3UG9zaXRpb24gPSAtIG5ld1Bvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIC8vRml4IGR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnZlbG9jaXR5ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKC1uZXdQb3NpdGlvbiAtIHMudHJhbnNsYXRlKSAvIHMudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9tZW50dW1EdXJhdGlvbiA9IE1hdGguYWJzKChuZXdQb3NpdGlvbiAtIHMudHJhbnNsYXRlKSAvIHMudmVsb2NpdHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucGFyYW1zLmZyZWVNb2RlU3RpY2t5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlUmVzZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UgJiYgZG9Cb3VuY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKG1vbWVudHVtRHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uU3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMgfHwgIWFsbG93TW9tZW50dW1Cb3VuY2UpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uTW9tZW50dW1Cb3VuY2UnLCBzKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNpdGlvbihzLnBhcmFtcy5zcGVlZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKGFmdGVyQm91bmNlUG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzLnZlbG9jaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5vblRyYW5zaXRpb25TdGFydCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLm9uVHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3MobmV3UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuZnJlZU1vZGVNb21lbnR1bSB8fCB0aW1lRGlmZiA+PSBzLnBhcmFtcy5sb25nU3dpcGVzTXMpIHtcbiAgICAgICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBGaW5kIGN1cnJlbnQgc2xpZGVcbiAgICAgICAgICAgIHZhciBpLCBzdG9wSW5kZXggPSAwLCBncm91cFNpemUgPSBzLnNsaWRlc1NpemVzR3JpZFswXTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzLnNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzLnNsaWRlc0dyaWRbaSArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRQb3MgPj0gcy5zbGlkZXNHcmlkW2ldICYmIGN1cnJlbnRQb3MgPCBzLnNsaWRlc0dyaWRbaSArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdyb3VwU2l6ZSA9IHMuc2xpZGVzR3JpZFtpICsgcy5wYXJhbXMuc2xpZGVzUGVyR3JvdXBdIC0gcy5zbGlkZXNHcmlkW2ldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFBvcyA+PSBzLnNsaWRlc0dyaWRbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBncm91cFNpemUgPSBzLnNsaWRlc0dyaWRbcy5zbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gcy5zbGlkZXNHcmlkW3Muc2xpZGVzR3JpZC5sZW5ndGggLSAyXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBGaW5kIGN1cnJlbnQgc2xpZGUgc2l6ZVxuICAgICAgICAgICAgdmFyIHJhdGlvID0gKGN1cnJlbnRQb3MgLSBzLnNsaWRlc0dyaWRbc3RvcEluZGV4XSkgLyBncm91cFNpemU7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHRpbWVEaWZmID4gcy5wYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgICAgICAgICAgICAgLy8gTG9uZyB0b3VjaGVzXG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5sb25nU3dpcGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXRpbyA+PSBzLnBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHMuc2xpZGVUbyhzdG9wSW5kZXggKyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Ugcy5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyYXRpbyA+ICgxIC0gcy5wYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSkgcy5zbGlkZVRvKHN0b3BJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBzLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTaG9ydCBzd2lwZXNcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLnNob3J0U3dpcGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzdG9wSW5kZXggKyBzLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocy5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgVHJhbnNpdGlvbnNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLl9zbGlkZVRvID0gZnVuY3Rpb24gKHNsaWRlSW5kZXgsIHNwZWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gcy5zbGlkZVRvKHNsaWRlSW5kZXgsIHNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5zbGlkZVRvID0gZnVuY3Rpb24gKHNsaWRlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJ1bkNhbGxiYWNrcyA9PT0gJ3VuZGVmaW5lZCcpIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlSW5kZXggPT09ICd1bmRlZmluZWQnKSBzbGlkZUluZGV4ID0gMDtcbiAgICAgICAgICAgIGlmIChzbGlkZUluZGV4IDwgMCkgc2xpZGVJbmRleCA9IDA7XG4gICAgICAgICAgICBzLnNuYXBJbmRleCA9IE1hdGguZmxvb3Ioc2xpZGVJbmRleCAvIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgICAgIGlmIChzLnNuYXBJbmRleCA+PSBzLnNuYXBHcmlkLmxlbmd0aCkgcy5zbmFwSW5kZXggPSBzLnNuYXBHcmlkLmxlbmd0aCAtIDE7XG4gICAgICAgIFxuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IC0gcy5zbmFwR3JpZFtzLnNuYXBJbmRleF07XG4gICAgICAgICAgICAvLyBTdG9wIGF1dG9wbGF5XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXkgJiYgcy5hdXRvcGxheWluZykge1xuICAgICAgICAgICAgICAgIGlmIChpbnRlcm5hbCB8fCAhcy5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzLnBhdXNlQXV0b3BsYXkoc3BlZWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgICAgICAgICAgIHMudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuICAgICAgICAgICAgaWYocy5wYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCl7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlc0dyaWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC0gTWF0aC5mbG9vcih0cmFuc2xhdGUgKiAxMDApID49IE1hdGguZmxvb3Iocy5zbGlkZXNHcmlkW2ldICogMTAwKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gRGlyZWN0aW9ucyBsb2Nrc1xuICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5hbGxvd1N3aXBlVG9OZXh0ICYmIHRyYW5zbGF0ZSA8IHMudHJhbnNsYXRlICYmIHRyYW5zbGF0ZSA8IHMubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgJiYgdHJhbnNsYXRlID4gcy50cmFuc2xhdGUgJiYgdHJhbnNsYXRlID4gcy5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgICAgICAgICAgIGlmICgocy5hY3RpdmVJbmRleCB8fCAwKSAhPT0gc2xpZGVJbmRleCApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBVcGRhdGUgSW5kZXhcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3BlZWQgPT09ICd1bmRlZmluZWQnKSBzcGVlZCA9IHMucGFyYW1zLnNwZWVkO1xuICAgICAgICAgICAgcy5wcmV2aW91c0luZGV4ID0gcy5hY3RpdmVJbmRleCB8fCAwO1xuICAgICAgICAgICAgcy5hY3RpdmVJbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgICAgICAgICBzLnVwZGF0ZVJlYWxJbmRleCgpO1xuICAgICAgICAgICAgaWYgKChzLnJ0bCAmJiAtdHJhbnNsYXRlID09PSBzLnRyYW5zbGF0ZSkgfHwgKCFzLnJ0bCAmJiB0cmFuc2xhdGUgPT09IHMudHJhbnNsYXRlKSkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSBIZWlnaHRcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy51cGRhdGVDbGFzc2VzKCk7XG4gICAgICAgICAgICBzLm9uVHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHNwZWVkID09PSAwIHx8IHMuYnJvd3Nlci5sdGVJRTkpIHtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgIHMub25UcmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICBzLnNldFdyYXBwZXJUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICAgICAgICAgICAgICBpZiAoIXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBzLm9uVHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcy5vblRyYW5zaXRpb25TdGFydCA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcnVuQ2FsbGJhY2tzID09PSAndW5kZWZpbmVkJykgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5sYXp5KSBzLmxhenkub25UcmFuc2l0aW9uU3RhcnQoKTtcbiAgICAgICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uVHJhbnNpdGlvblN0YXJ0Jywgcyk7XG4gICAgICAgICAgICAgICAgaWYgKHMuYWN0aXZlSW5kZXggIT09IHMucHJldmlvdXNJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVDaGFuZ2VTdGFydCcsIHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5hY3RpdmVJbmRleCA+IHMucHJldmlvdXNJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlTmV4dFN0YXJ0Jywgcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2xpZGVQcmV2U3RhcnQnLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHMub25UcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHJ1bkNhbGxiYWNrcyA9PT0gJ3VuZGVmaW5lZCcpIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gICAgICAgICAgICBpZiAocy5sYXp5KSBzLmxhenkub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblRyYW5zaXRpb25FbmQnLCBzKTtcbiAgICAgICAgICAgICAgICBpZiAocy5hY3RpdmVJbmRleCAhPT0gcy5wcmV2aW91c0luZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TbGlkZUNoYW5nZUVuZCcsIHMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5hY3RpdmVJbmRleCA+IHMucHJldmlvdXNJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlTmV4dEVuZCcsIHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNsaWRlUHJldkVuZCcsIHMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmhpc3RvcnkgJiYgcy5oaXN0b3J5KSB7XG4gICAgICAgICAgICAgICAgcy5oaXN0b3J5LnNldEhpc3Rvcnkocy5wYXJhbXMuaGlzdG9yeSwgcy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGFzaG5hdiAmJiBzLmhhc2huYXYpIHtcbiAgICAgICAgICAgICAgICBzLmhhc2huYXYuc2V0SGFzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgfTtcbiAgICAgICAgcy5zbGlkZU5leHQgPSBmdW5jdGlvbiAocnVuQ2FsbGJhY2tzLCBzcGVlZCwgaW50ZXJuYWwpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuYW5pbWF0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgcy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWVudExlZnQgPSBzLmNvbnRhaW5lclswXS5jbGllbnRMZWZ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJldHVybiBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCArIHMucGFyYW1zLnNsaWRlc1Blckdyb3VwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICAgIH07XG4gICAgICAgIHMuX3NsaWRlTmV4dCA9IGZ1bmN0aW9uIChzcGVlZCkge1xuICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVOZXh0KHRydWUsIHNwZWVkLCB0cnVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5zbGlkZVByZXYgPSBmdW5jdGlvbiAocnVuQ2FsbGJhY2tzLCBzcGVlZCwgaW50ZXJuYWwpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuYW5pbWF0aW5nKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgcy5maXhMb29wKCk7XG4gICAgICAgICAgICAgICAgdmFyIGNsaWVudExlZnQgPSBzLmNvbnRhaW5lclswXS5jbGllbnRMZWZ0O1xuICAgICAgICAgICAgICAgIHJldHVybiBzLnNsaWRlVG8ocy5hY3RpdmVJbmRleCAtIDEsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4IC0gMSwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgICAgICB9O1xuICAgICAgICBzLl9zbGlkZVByZXYgPSBmdW5jdGlvbiAoc3BlZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBzLnNsaWRlUHJldih0cnVlLCBzcGVlZCwgdHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHMuc2xpZGVSZXNldCA9IGZ1bmN0aW9uIChydW5DYWxsYmFja3MsIHNwZWVkLCBpbnRlcm5hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHMuc2xpZGVUbyhzLmFjdGl2ZUluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHMuZGlzYWJsZVRvdWNoQ29udHJvbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMucGFyYW1zLm9ubHlFeHRlcm5hbCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5lbmFibGVUb3VjaENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5vbmx5RXh0ZXJuYWwgPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgVHJhbnNsYXRlL3RyYW5zaXRpb24gaGVscGVyc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24gPSBmdW5jdGlvbiAoZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xuICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJyAmJiBzLmVmZmVjdHNbcy5wYXJhbXMuZWZmZWN0XSkge1xuICAgICAgICAgICAgICAgIHMuZWZmZWN0c1tzLnBhcmFtcy5lZmZlY3RdLnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnBhcmFsbGF4ICYmIHMucGFyYWxsYXgpIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFsbGF4LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNvbnRyb2wgJiYgcy5jb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICAgcy5jb250cm9sbGVyLnNldFRyYW5zaXRpb24oZHVyYXRpb24sIGJ5Q29udHJvbGxlcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLmVtaXQoJ29uU2V0VHJhbnNpdGlvbicsIHMsIGR1cmF0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlID0gZnVuY3Rpb24gKHRyYW5zbGF0ZSwgdXBkYXRlQWN0aXZlSW5kZXgsIGJ5Q29udHJvbGxlcikge1xuICAgICAgICAgICAgdmFyIHggPSAwLCB5ID0gMCwgeiA9IDA7XG4gICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgIHggPSBzLnJ0bCA/IC10cmFuc2xhdGUgOiB0cmFuc2xhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB5ID0gdHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICAgICAgICAgICAgICB4ID0gcm91bmQoeCk7XG4gICAgICAgICAgICAgICAgeSA9IHJvdW5kKHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghcy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICAgIGlmIChzLnN1cHBvcnQudHJhbnNmb3JtczNkKSBzLndyYXBwZXIudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgeCArICdweCwgJyArIHkgKyAncHgsICcgKyB6ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIGVsc2Ugcy53cmFwcGVyLnRyYW5zZm9ybSgndHJhbnNsYXRlKCcgKyB4ICsgJ3B4LCAnICsgeSArICdweCknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBzLnRyYW5zbGF0ZSA9IHMuaXNIb3Jpem9udGFsKCkgPyB4IDogeTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSBwcm9ncmVzc1xuICAgICAgICAgICAgdmFyIHByb2dyZXNzO1xuICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZXNEaWZmID0gcy5tYXhUcmFuc2xhdGUoKSAtIHMubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9ICh0cmFuc2xhdGUgLSBzLm1pblRyYW5zbGF0ZSgpKSAvICh0cmFuc2xhdGVzRGlmZik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocHJvZ3Jlc3MgIT09IHMucHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHVwZGF0ZUFjdGl2ZUluZGV4KSBzLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnICYmIHMuZWZmZWN0c1tzLnBhcmFtcy5lZmZlY3RdKSB7XG4gICAgICAgICAgICAgICAgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0uc2V0VHJhbnNsYXRlKHMudHJhbnNsYXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wYXJhbGxheCAmJiBzLnBhcmFsbGF4KSB7XG4gICAgICAgICAgICAgICAgcy5wYXJhbGxheC5zZXRUcmFuc2xhdGUocy50cmFuc2xhdGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhciAmJiBzLnNjcm9sbGJhcikge1xuICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLnNldFRyYW5zbGF0ZShzLnRyYW5zbGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuY29udHJvbCAmJiBzLmNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICBzLmNvbnRyb2xsZXIuc2V0VHJhbnNsYXRlKHMudHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5lbWl0KCdvblNldFRyYW5zbGF0ZScsIHMsIHMudHJhbnNsYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHMuZ2V0VHJhbnNsYXRlID0gZnVuY3Rpb24gKGVsLCBheGlzKSB7XG4gICAgICAgICAgICB2YXIgbWF0cml4LCBjdXJUcmFuc2Zvcm0sIGN1clN0eWxlLCB0cmFuc2Zvcm1NYXRyaXg7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gYXV0b21hdGljIGF4aXMgZGV0ZWN0aW9uXG4gICAgICAgICAgICBpZiAodHlwZW9mIGF4aXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgYXhpcyA9ICd4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzLnJ0bCA/IC1zLnRyYW5zbGF0ZSA6IHMudHJhbnNsYXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGN1clN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xuICAgICAgICAgICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIHtcbiAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgICAgICAgICAgICAgIGlmIChjdXJUcmFuc2Zvcm0uc3BsaXQoJywnKS5sZW5ndGggPiA2KSB7XG4gICAgICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IGN1clRyYW5zZm9ybS5zcGxpdCgnLCAnKS5tYXAoZnVuY3Rpb24oYSl7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYS5yZXBsYWNlKCcsJywnLicpO1xuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcsICcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBTb21lIG9sZCB2ZXJzaW9ucyBvZiBXZWJraXQgY2hva2Ugd2hlbiAnbm9uZScgaXMgcGFzc2VkOyBwYXNzXG4gICAgICAgICAgICAgICAgLy8gZW1wdHkgc3RyaW5nIGluc3RlYWQgaW4gdGhpcyBjYXNlXG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtTWF0cml4ID0gbmV3IHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgoY3VyVHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IGN1clRyYW5zZm9ybSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm1NYXRyaXggPSBjdXJTdHlsZS5Nb3pUcmFuc2Zvcm0gfHwgY3VyU3R5bGUuT1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5Nc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5tc1RyYW5zZm9ybSAgfHwgY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpLnJlcGxhY2UoJ3RyYW5zbGF0ZSgnLCAnbWF0cml4KDEsIDAsIDAsIDEsJyk7XG4gICAgICAgICAgICAgICAgbWF0cml4ID0gdHJhbnNmb3JtTWF0cml4LnRvU3RyaW5nKCkuc3BsaXQoJywnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgLy9MYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KVxuICAgICAgICAgICAgICAgICAgICBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQxO1xuICAgICAgICAgICAgICAgIC8vQ3JhenkgSUUxMCBNYXRyaXhcbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNilcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTJdKTtcbiAgICAgICAgICAgICAgICAvL05vcm1hbCBCcm93c2Vyc1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgIC8vTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeClcbiAgICAgICAgICAgICAgICAgICAgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MjtcbiAgICAgICAgICAgICAgICAvL0NyYXp5IElFMTAgTWF0cml4XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpXG4gICAgICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEzXSk7XG4gICAgICAgICAgICAgICAgLy9Ob3JtYWwgQnJvd3NlcnNcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnJ0bCAmJiBjdXJUcmFuc2Zvcm0pIGN1clRyYW5zZm9ybSA9IC1jdXJUcmFuc2Zvcm07XG4gICAgICAgICAgICByZXR1cm4gY3VyVHJhbnNmb3JtIHx8IDA7XG4gICAgICAgIH07XG4gICAgICAgIHMuZ2V0V3JhcHBlclRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChheGlzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGF4aXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgYXhpcyA9IHMuaXNIb3Jpem9udGFsKCkgPyAneCcgOiAneSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcy5nZXRUcmFuc2xhdGUocy53cmFwcGVyWzBdLCBheGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIE9ic2VydmVyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5vYnNlcnZlcnMgPSBbXTtcbiAgICAgICAgZnVuY3Rpb24gaW5pdE9ic2VydmVyKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgICAgICAvLyBjcmVhdGUgYW4gb2JzZXJ2ZXIgaW5zdGFuY2VcbiAgICAgICAgICAgIHZhciBPYnNlcnZlckZ1bmMgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciB8fCB3aW5kb3cuV2Via2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBPYnNlcnZlckZ1bmMoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChtdXRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzLm9uUmVzaXplKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uT2JzZXJ2ZXJVcGRhdGUnLCBzLCBtdXRhdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwge1xuICAgICAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBjaGlsZExpc3Q6IHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGlsZExpc3QsXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyRGF0YTogdHlwZW9mIG9wdGlvbnMuY2hhcmFjdGVyRGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGFyYWN0ZXJEYXRhXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgXG4gICAgICAgICAgICBzLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICAgICAgfVxuICAgICAgICBzLmluaXRPYnNlcnZlcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMub2JzZXJ2ZVBhcmVudHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udGFpbmVyUGFyZW50cyA9IHMuY29udGFpbmVyLnBhcmVudHMoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lclBhcmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdE9ic2VydmVyKGNvbnRhaW5lclBhcmVudHNbaV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAvLyBPYnNlcnZlIGNvbnRhaW5lclxuICAgICAgICAgICAgaW5pdE9ic2VydmVyKHMuY29udGFpbmVyWzBdLCB7Y2hpbGRMaXN0OiBmYWxzZX0pO1xuICAgICAgICBcbiAgICAgICAgICAgIC8vIE9ic2VydmUgd3JhcHBlclxuICAgICAgICAgICAgaW5pdE9ic2VydmVyKHMud3JhcHBlclswXSwge2F0dHJpYnV0ZXM6IGZhbHNlfSk7XG4gICAgICAgIH07XG4gICAgICAgIHMuZGlzY29ubmVjdE9ic2VydmVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5vYnNlcnZlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzLm9ic2VydmVyc1tpXS5kaXNjb25uZWN0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLm9ic2VydmVycyA9IFtdO1xuICAgICAgICB9O1xuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBMb29wXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgLy8gQ3JlYXRlIGxvb3BlZCBzbGlkZXNcbiAgICAgICAgcy5jcmVhdGVMb29wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZWQgc2xpZGVzXG4gICAgICAgICAgICBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyArICcuJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpLnJlbW92ZSgpO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBzbGlkZXMgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcyk7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYocy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmICFzLnBhcmFtcy5sb29wZWRTbGlkZXMpIHMucGFyYW1zLmxvb3BlZFNsaWRlcyA9IHNsaWRlcy5sZW5ndGg7XG4gICAgICAgIFxuICAgICAgICAgICAgcy5sb29wZWRTbGlkZXMgPSBwYXJzZUludChzLnBhcmFtcy5sb29wZWRTbGlkZXMgfHwgcy5wYXJhbXMuc2xpZGVzUGVyVmlldywgMTApO1xuICAgICAgICAgICAgcy5sb29wZWRTbGlkZXMgPSBzLmxvb3BlZFNsaWRlcyArIHMucGFyYW1zLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuICAgICAgICAgICAgaWYgKHMubG9vcGVkU2xpZGVzID4gc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHMubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICB2YXIgcHJlcGVuZFNsaWRlcyA9IFtdLCBhcHBlbmRTbGlkZXMgPSBbXSwgaTtcbiAgICAgICAgICAgIHNsaWRlcy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IHMubG9vcGVkU2xpZGVzKSBhcHBlbmRTbGlkZXMucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgc2xpZGVzLmxlbmd0aCAmJiBpbmRleCA+PSBzbGlkZXMubGVuZ3RoIC0gcy5sb29wZWRTbGlkZXMpIHByZXBlbmRTbGlkZXMucHVzaChlbCk7XG4gICAgICAgICAgICAgICAgc2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnLCBpbmRleCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBhcHBlbmRTbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIuYXBwZW5kKCQoYXBwZW5kU2xpZGVzW2ldLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3Mocy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yIChpID0gcHJlcGVuZFNsaWRlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgICAgIHMud3JhcHBlci5wcmVwZW5kKCQocHJlcGVuZFNsaWRlc1tpXS5jbG9uZU5vZGUodHJ1ZSkpLmFkZENsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcy5kZXN0cm95TG9vcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZUNsYXNzICsgJy4nICsgcy5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykucmVtb3ZlKCk7XG4gICAgICAgICAgICBzLnNsaWRlcy5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICB9O1xuICAgICAgICBzLnJlTG9vcCA9IGZ1bmN0aW9uICh1cGRhdGVQb3NpdGlvbikge1xuICAgICAgICAgICAgdmFyIG9sZEluZGV4ID0gcy5hY3RpdmVJbmRleCAtIHMubG9vcGVkU2xpZGVzO1xuICAgICAgICAgICAgcy5kZXN0cm95TG9vcCgpO1xuICAgICAgICAgICAgcy5jcmVhdGVMb29wKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZVNsaWRlc1NpemUoKTtcbiAgICAgICAgICAgIGlmICh1cGRhdGVQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhvbGRJbmRleCArIHMubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBzLmZpeExvb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbmV3SW5kZXg7XG4gICAgICAgICAgICAvL0ZpeCBGb3IgTmVnYXRpdmUgT3ZlcnNsaWRpbmdcbiAgICAgICAgICAgIGlmIChzLmFjdGl2ZUluZGV4IDwgcy5sb29wZWRTbGlkZXMpIHtcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IHMuc2xpZGVzLmxlbmd0aCAtIHMubG9vcGVkU2xpZGVzICogMyArIHMuYWN0aXZlSW5kZXg7XG4gICAgICAgICAgICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCArIHMubG9vcGVkU2xpZGVzO1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhuZXdJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy9GaXggRm9yIFBvc2l0aXZlIE92ZXJzbGlkaW5nXG4gICAgICAgICAgICBlbHNlIGlmICgocy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIHMuYWN0aXZlSW5kZXggPj0gcy5sb29wZWRTbGlkZXMgKiAyKSB8fCAocy5hY3RpdmVJbmRleCA+IHMuc2xpZGVzLmxlbmd0aCAtIHMucGFyYW1zLnNsaWRlc1BlclZpZXcgKiAyKSkge1xuICAgICAgICAgICAgICAgIG5ld0luZGV4ID0gLXMuc2xpZGVzLmxlbmd0aCArIHMuYWN0aXZlSW5kZXggKyBzLmxvb3BlZFNsaWRlcztcbiAgICAgICAgICAgICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgcy5sb29wZWRTbGlkZXM7XG4gICAgICAgICAgICAgICAgcy5zbGlkZVRvKG5ld0luZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEFwcGVuZC9QcmVwZW5kL1JlbW92ZSBTbGlkZXNcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmFwcGVuZFNsaWRlID0gZnVuY3Rpb24gKHNsaWRlcykge1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmRlc3Ryb3lMb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHMud3JhcHBlci5hcHBlbmQoc2xpZGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIuYXBwZW5kKHNsaWRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuY3JlYXRlTG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCEocy5wYXJhbXMub2JzZXJ2ZXIgJiYgcy5zdXBwb3J0Lm9ic2VydmVyKSkge1xuICAgICAgICAgICAgICAgIHMudXBkYXRlKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBzLnByZXBlbmRTbGlkZSA9IGZ1bmN0aW9uIChzbGlkZXMpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5kZXN0cm95TG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0FjdGl2ZUluZGV4ID0gcy5hY3RpdmVJbmRleCArIDE7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHMud3JhcHBlci5wcmVwZW5kKHNsaWRlc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld0FjdGl2ZUluZGV4ID0gcy5hY3RpdmVJbmRleCArIHNsaWRlcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLndyYXBwZXIucHJlcGVuZChzbGlkZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmNyZWF0ZUxvb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghKHMucGFyYW1zLm9ic2VydmVyICYmIHMuc3VwcG9ydC5vYnNlcnZlcikpIHtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZSh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCwgMCwgZmFsc2UpO1xuICAgICAgICB9O1xuICAgICAgICBzLnJlbW92ZVNsaWRlID0gZnVuY3Rpb24gKHNsaWRlc0luZGV4ZXMpIHtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5kZXN0cm95TG9vcCgpO1xuICAgICAgICAgICAgICAgIHMuc2xpZGVzID0gcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG5ld0FjdGl2ZUluZGV4ID0gcy5hY3RpdmVJbmRleCxcbiAgICAgICAgICAgICAgICBpbmRleFRvUmVtb3ZlO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzbGlkZXNJbmRleGVzID09PSAnb2JqZWN0JyAmJiBzbGlkZXNJbmRleGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzSW5kZXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpbmRleFRvUmVtb3ZlID0gc2xpZGVzSW5kZXhlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzW2luZGV4VG9SZW1vdmVdKSBzLnNsaWRlcy5lcShpbmRleFRvUmVtb3ZlKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgbmV3QWN0aXZlSW5kZXgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpbmRleFRvUmVtb3ZlID0gc2xpZGVzSW5kZXhlcztcbiAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHMuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChpbmRleFRvUmVtb3ZlIDwgbmV3QWN0aXZlSW5kZXgpIG5ld0FjdGl2ZUluZGV4LS07XG4gICAgICAgICAgICAgICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICAgICAgICBzLmNyZWF0ZUxvb3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoIShzLnBhcmFtcy5vYnNlcnZlciAmJiBzLnN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgICAgICAgICAgICAgcy51cGRhdGUodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhuZXdBY3RpdmVJbmRleCArIHMubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIHMucmVtb3ZlQWxsU2xpZGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcy5zbGlkZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzLnJlbW92ZVNsaWRlKHNsaWRlc0luZGV4ZXMpO1xuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBFZmZlY3RzXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgcy5lZmZlY3RzID0ge1xuICAgICAgICAgICAgZmFkZToge1xuICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuc2xpZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBzbGlkZVswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eCA9IC1vZmZzZXQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHR4ID0gdHggLSBzLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eSA9IHR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZU9wYWNpdHkgPSBzLnBhcmFtcy5mYWRlLmNyb3NzRmFkZSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDEgLSBNYXRoLmFicyhzbGlkZVswXS5wcm9ncmVzcyksIDApIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSArIE1hdGgubWluKE1hdGgubWF4KHNsaWRlWzBdLnByb2dyZXNzLCAtMSksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogc2xpZGVPcGFjaXR5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgdHggKyAncHgsICcgKyB0eSArICdweCwgMHB4KScpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgJiYgZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBldmVudFRyaWdnZXJlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXMudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50VHJpZ2dlcmVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyaWdnZXJFdmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCcsICdvVHJhbnNpdGlvbkVuZCcsICdNU1RyYW5zaXRpb25FbmQnLCAnbXNUcmFuc2l0aW9uRW5kJ107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmlnZ2VyRXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmlnZ2VyKHRyaWdnZXJFdmVudHNbaV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvZ3Jlc3MgPSBzbGlkZVswXS5wcm9ncmVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mbGlwLmxpbWl0Um90YXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKHNsaWRlWzBdLnByb2dyZXNzLCAxKSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IHNsaWRlWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdGF0ZSA9IC0xODAgKiBwcm9ncmVzcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVZID0gcm90YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZVggPSAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gLW9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eSA9IHR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3RhdGVYID0gLXJvdGF0ZVk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRlWSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0ZVkgPSAtcm90YXRlWTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChwcm9ncmVzcykpICsgcy5zbGlkZXMubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mbGlwLnNsaWRlU2hhZG93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IHNoYWRvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hhZG93QmVmb3JlID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dBZnRlciA9IHMuaXNIb3Jpem9udGFsKCkgPyBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93QmVmb3JlID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCcpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5hcHBlbmQoc2hhZG93QmVmb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dBZnRlciA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LScgKyAocy5pc0hvcml6b250YWwoKSA/ICdyaWdodCcgOiAnYm90dG9tJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dBZnRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoKSBzaGFkb3dCZWZvcmVbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KC1wcm9ncmVzcywgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgc2hhZG93QWZ0ZXJbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KHByb2dyZXNzLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyB0eCArICdweCwgJyArIHR5ICsgJ3B4LCAwcHgpIHJvdGF0ZVgoJyArIHJvdGF0ZVggKyAnZGVnKSByb3RhdGVZKCcgKyByb3RhdGVZICsgJ2RlZyknKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSAmJiBkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KS50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoISQodGhpcykuaGFzQ2xhc3Mocy5wYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJywgJ29UcmFuc2l0aW9uRW5kJywgJ01TVHJhbnNpdGlvbkVuZCcsICdtc1RyYW5zaXRpb25FbmQnXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3ViZToge1xuICAgICAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgd3JhcHBlclJvdGF0ZSA9IDAsIGN1YmVTaGFkb3c7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jdWJlLnNoYWRvdykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJlU2hhZG93ID0gcy53cmFwcGVyLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3ViZVNoYWRvdy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdyA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLmFwcGVuZChjdWJlU2hhZG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdy5jc3Moe2hlaWdodDogcy53aWR0aCArICdweCd9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVTaGFkb3cgPSBzLmNvbnRhaW5lci5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1YmVTaGFkb3cubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVTaGFkb3cgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWN1YmUtc2hhZG93XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuY29udGFpbmVyLmFwcGVuZChjdWJlU2hhZG93KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzLnNsaWRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVBbmdsZSA9IGkgKiA5MDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByb3VuZCA9IE1hdGguZmxvb3Ioc2xpZGVBbmdsZSAvIDM2MCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5ydGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUFuZ2xlID0gLXNsaWRlQW5nbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm91bmQgPSBNYXRoLmZsb29yKC1zbGlkZUFuZ2xlIC8gMzYwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKHNsaWRlWzBdLnByb2dyZXNzLCAxKSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHR4ID0gMCwgdHkgPSAwLCB0eiA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSAlIDQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IC0gcm91bmQgKiA0ICogcy5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR6ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChpIC0gMSkgJSA0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR6ID0gLSByb3VuZCAqIDQgKiBzLnNpemU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoaSAtIDIpICUgNCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gcy5zaXplICsgcm91bmQgKiA0ICogcy5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR6ID0gcy5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGkgLSAzKSAlIDQgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eCA9IC0gcy5zaXplO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR6ID0gMyAqIHMuc2l6ZSArIHMuc2l6ZSAqIDQgKiByb3VuZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR4ID0gLXR4O1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5ID0gdHg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHggPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSAncm90YXRlWCgnICsgKHMuaXNIb3Jpem9udGFsKCkgPyAwIDogLXNsaWRlQW5nbGUpICsgJ2RlZykgcm90YXRlWSgnICsgKHMuaXNIb3Jpem9udGFsKCkgPyBzbGlkZUFuZ2xlIDogMCkgKyAnZGVnKSB0cmFuc2xhdGUzZCgnICsgdHggKyAncHgsICcgKyB0eSArICdweCwgJyArIHR6ICsgJ3B4KSc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSAmJiBwcm9ncmVzcyA+IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd3JhcHBlclJvdGF0ZSA9IGkgKiA5MCArIHByb2dyZXNzICogOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucnRsKSB3cmFwcGVyUm90YXRlID0gLWkgKiA5MCAtIHByb2dyZXNzICogOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS50cmFuc2Zvcm0odHJhbnNmb3JtKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jdWJlLnNsaWRlU2hhZG93cykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vU2V0IHNoYWRvd3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2hhZG93QmVmb3JlID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dBZnRlciA9IHMuaXNIb3Jpem9udGFsKCkgPyBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2hhZG93QmVmb3JlID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCcpICsgJ1wiPjwvZGl2PicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5hcHBlbmQoc2hhZG93QmVmb3JlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dBZnRlciA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItc2xpZGUtc2hhZG93LScgKyAocy5pc0hvcml6b250YWwoKSA/ICdyaWdodCcgOiAnYm90dG9tJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dBZnRlcik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoKSBzaGFkb3dCZWZvcmVbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KC1wcm9ncmVzcywgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgc2hhZG93QWZ0ZXJbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KHByb2dyZXNzLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzLndyYXBwZXIuY3NzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSAtJyArIChzLnNpemUgLyAyKSArICdweCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnLW1vei10cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUgLScgKyAocy5zaXplIC8gMikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJy1tcy10cmFuc2Zvcm0tb3JpZ2luJzogJzUwJSA1MCUgLScgKyAocy5zaXplIC8gMikgKyAncHgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zZm9ybS1vcmlnaW4nOiAnNTAlIDUwJSAtJyArIChzLnNpemUgLyAyKSArICdweCdcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuY3ViZS5zaGFkb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3ViZVNoYWRvdy50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDBweCwgJyArIChzLndpZHRoIC8gMiArIHMucGFyYW1zLmN1YmUuc2hhZG93T2Zmc2V0KSArICdweCwgJyArICgtcy53aWR0aCAvIDIpICsgJ3B4KSByb3RhdGVYKDkwZGVnKSByb3RhdGVaKDBkZWcpIHNjYWxlKCcgKyAocy5wYXJhbXMuY3ViZS5zaGFkb3dTY2FsZSkgKyAnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0FuZ2xlID0gTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLSBNYXRoLmZsb29yKE1hdGguYWJzKHdyYXBwZXJSb3RhdGUpIC8gOTApICogOTA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG11bHRpcGxpZXIgPSAxLjUgLSAoTWF0aC5zaW4oc2hhZG93QW5nbGUgKiAyICogTWF0aC5QSSAvIDM2MCkgLyAyICsgTWF0aC5jb3Moc2hhZG93QW5nbGUgKiAyICogTWF0aC5QSSAvIDM2MCkgLyAyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2NhbGUxID0gcy5wYXJhbXMuY3ViZS5zaGFkb3dTY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NhbGUyID0gcy5wYXJhbXMuY3ViZS5zaGFkb3dTY2FsZSAvIG11bHRpcGxpZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IHMucGFyYW1zLmN1YmUuc2hhZG93T2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmVTaGFkb3cudHJhbnNmb3JtKCdzY2FsZTNkKCcgKyBzY2FsZTEgKyAnLCAxLCAnICsgc2NhbGUyICsgJykgdHJhbnNsYXRlM2QoMHB4LCAnICsgKHMuaGVpZ2h0IC8gMiArIG9mZnNldCkgKyAncHgsICcgKyAoLXMuaGVpZ2h0IC8gMiAvIHNjYWxlMikgKyAncHgpIHJvdGF0ZVgoLTkwZGVnKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciB6RmFjdG9yID0gKHMuaXNTYWZhcmkgfHwgcy5pc1VpV2ViVmlldykgPyAoLXMuc2l6ZSAvIDIpIDogMDtcbiAgICAgICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMHB4LDAsJyArIHpGYWN0b3IgKyAncHgpIHJvdGF0ZVgoJyArIChzLmlzSG9yaXpvbnRhbCgpID8gMCA6IHdyYXBwZXJSb3RhdGUpICsgJ2RlZykgcm90YXRlWSgnICsgKHMuaXNIb3Jpem9udGFsKCkgPyAtd3JhcHBlclJvdGF0ZSA6IDApICsgJ2RlZyknKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIChkdXJhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy50cmFuc2l0aW9uKGR1cmF0aW9uKS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmN1YmUuc2hhZG93ICYmICFzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmNvbnRhaW5lci5maW5kKCcuc3dpcGVyLWN1YmUtc2hhZG93JykudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY292ZXJmbG93OiB7XG4gICAgICAgICAgICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFuc2Zvcm0gPSBzLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNlbnRlciA9IHMuaXNIb3Jpem9udGFsKCkgPyAtdHJhbnNmb3JtICsgcy53aWR0aCAvIDIgOiAtdHJhbnNmb3JtICsgcy5oZWlnaHQgLyAyO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRlID0gcy5pc0hvcml6b250YWwoKSA/IHMucGFyYW1zLmNvdmVyZmxvdy5yb3RhdGU6IC1zLnBhcmFtcy5jb3ZlcmZsb3cucm90YXRlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlID0gcy5wYXJhbXMuY292ZXJmbG93LmRlcHRoO1xuICAgICAgICAgICAgICAgICAgICAvL0VhY2ggc2xpZGUgb2Zmc2V0IGZyb20gY2VudGVyXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBzLnNsaWRlcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVTaXplID0gcy5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVPZmZzZXQgPSBzbGlkZVswXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXRNdWx0aXBsaWVyID0gKGNlbnRlciAtIHNsaWRlT2Zmc2V0IC0gc2xpZGVTaXplIC8gMikgLyBzbGlkZVNpemUgKiBzLnBhcmFtcy5jb3ZlcmZsb3cubW9kaWZpZXI7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJvdGF0ZVkgPSBzLmlzSG9yaXpvbnRhbCgpID8gcm90YXRlICogb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcm90YXRlWCA9IHMuaXNIb3Jpem9udGFsKCkgPyAwIDogcm90YXRlICogb2Zmc2V0TXVsdGlwbGllcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZhciByb3RhdGVaID0gMFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVogPSAtdHJhbnNsYXRlICogTWF0aC5hYnMob2Zmc2V0TXVsdGlwbGllcik7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVkgPSBzLmlzSG9yaXpvbnRhbCgpID8gMCA6IHMucGFyYW1zLmNvdmVyZmxvdy5zdHJldGNoICogKG9mZnNldE11bHRpcGxpZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZVggPSBzLmlzSG9yaXpvbnRhbCgpID8gcy5wYXJhbXMuY292ZXJmbG93LnN0cmV0Y2ggKiAob2Zmc2V0TXVsdGlwbGllcikgOiAwO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vRml4IGZvciB1bHRyYSBzbWFsbCB2YWx1ZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVYKSA8IDAuMDAxKSB0cmFuc2xhdGVYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVZKSA8IDAuMDAxKSB0cmFuc2xhdGVZID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyh0cmFuc2xhdGVaKSA8IDAuMDAxKSB0cmFuc2xhdGVaID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVZKSA8IDAuMDAxKSByb3RhdGVZID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhyb3RhdGVYKSA8IDAuMDAxKSByb3RhdGVYID0gMDtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGVUcmFuc2Zvcm0gPSAndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAncHgsJyArIHRyYW5zbGF0ZVkgKyAncHgsJyArIHRyYW5zbGF0ZVogKyAncHgpICByb3RhdGVYKCcgKyByb3RhdGVYICsgJ2RlZykgcm90YXRlWSgnICsgcm90YXRlWSArICdkZWcpJztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS50cmFuc2Zvcm0oc2xpZGVUcmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVbMF0uc3R5bGUuekluZGV4ID0gLU1hdGguYWJzKE1hdGgucm91bmQob2Zmc2V0TXVsdGlwbGllcikpICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jb3ZlcmZsb3cuc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9TZXQgc2hhZG93c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzaGFkb3dCZWZvcmUgPSBzLmlzSG9yaXpvbnRhbCgpID8gc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogc2xpZGUuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gcy5pc0hvcml6b250YWwoKSA/IHNsaWRlLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiBzbGlkZS5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNsaWRlLXNoYWRvdy0nICsgKHMuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJykgKyAnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLmFwcGVuZChzaGFkb3dCZWZvcmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgnPGRpdiBjbGFzcz1cInN3aXBlci1zbGlkZS1zaGFkb3ctJyArIChzLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArICdcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGUuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0TXVsdGlwbGllciA+IDAgPyBvZmZzZXRNdWx0aXBsaWVyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93QWZ0ZXIubGVuZ3RoKSBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gKC1vZmZzZXRNdWx0aXBsaWVyKSA+IDAgPyAtb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vU2V0IGNvcnJlY3QgcGVyc3BlY3RpdmUgZm9yIElFMTBcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuYnJvd3Nlci5pZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHdzID0gcy53cmFwcGVyWzBdLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgd3MucGVyc3BlY3RpdmVPcmlnaW4gPSBjZW50ZXIgKyAncHggNTAlJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzLnRyYW5zaXRpb24oZHVyYXRpb24pLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgSW1hZ2VzIExhenkgTG9hZGluZ1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMubGF6eSA9IHtcbiAgICAgICAgICAgIGluaXRpYWxJbWFnZUxvYWRlZDogZmFsc2UsXG4gICAgICAgICAgICBsb2FkSW1hZ2VJblNsaWRlOiBmdW5jdGlvbiAoaW5kZXgsIGxvYWRJbkR1cGxpY2F0ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBsb2FkSW5EdXBsaWNhdGUgPT09ICd1bmRlZmluZWQnKSBsb2FkSW5EdXBsaWNhdGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gcy5zbGlkZXMuZXEoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHZhciBpbWcgPSBzbGlkZS5maW5kKCcuJyArIHMucGFyYW1zLmxhenlMb2FkaW5nQ2xhc3MgKyAnOm5vdCguJyArIHMucGFyYW1zLmxhenlTdGF0dXNMb2FkZWRDbGFzcyArICcpOm5vdCguJyArIHMucGFyYW1zLmxhenlTdGF0dXNMb2FkaW5nQ2xhc3MgKyAnKScpO1xuICAgICAgICAgICAgICAgIGlmIChzbGlkZS5oYXNDbGFzcyhzLnBhcmFtcy5sYXp5TG9hZGluZ0NsYXNzKSAmJiAhc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMubGF6eVN0YXR1c0xvYWRlZENsYXNzKSAmJiAhc2xpZGUuaGFzQ2xhc3Mocy5wYXJhbXMubGF6eVN0YXR1c0xvYWRpbmdDbGFzcykpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nID0gaW1nLmFkZChzbGlkZVswXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbWcubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGltZy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIF9pbWcgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBfaW1nLmFkZENsYXNzKHMucGFyYW1zLmxhenlTdGF0dXNMb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmFja2dyb3VuZCA9IF9pbWcuYXR0cignZGF0YS1iYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzcmMgPSBfaW1nLmF0dHIoJ2RhdGEtc3JjJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzcmNzZXQgPSBfaW1nLmF0dHIoJ2RhdGEtc3Jjc2V0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzaXplcyA9IF9pbWcuYXR0cignZGF0YS1zaXplcycpO1xuICAgICAgICAgICAgICAgICAgICBzLmxvYWRJbWFnZShfaW1nWzBdLCAoc3JjIHx8IGJhY2tncm91bmQpLCBzcmNzZXQsIHNpemVzLCBmYWxzZSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzID09PSAndW5kZWZpbmVkJyB8fCBzID09PSBudWxsIHx8ICFzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgJ3VybChcIicgKyBiYWNrZ3JvdW5kICsgJ1wiKScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcucmVtb3ZlQXR0cignZGF0YS1iYWNrZ3JvdW5kJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIF9pbWcuYXR0cignc3Jjc2V0Jywgc3Jjc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5yZW1vdmVBdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2l6ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5hdHRyKCdzaXplcycsIHNpemVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5yZW1vdmVBdHRyKCdkYXRhLXNpemVzJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX2ltZy5hdHRyKCdzcmMnLCBzcmMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfaW1nLnJlbW92ZUF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICBfaW1nLmFkZENsYXNzKHMucGFyYW1zLmxhenlTdGF0dXNMb2FkZWRDbGFzcykucmVtb3ZlQ2xhc3Mocy5wYXJhbXMubGF6eVN0YXR1c0xvYWRpbmdDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZS5maW5kKCcuJyArIHMucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzcyArICcsIC4nICsgcy5wYXJhbXMucHJlbG9hZGVyQ2xhc3MpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxvb3AgJiYgbG9hZEluRHVwbGljYXRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlT3JpZ2luYWxJbmRleCA9IHNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvcmlnaW5hbFNsaWRlID0gcy53cmFwcGVyLmNoaWxkcmVuKCdbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCInICsgc2xpZGVPcmlnaW5hbEluZGV4ICsgJ1wiXTpub3QoLicgKyBzLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzICsgJyknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUob3JpZ2luYWxTbGlkZS5pbmRleCgpLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgZHVwbGljYXRlZFNsaWRlID0gcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MgKyAnW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJyArIHNsaWRlT3JpZ2luYWxJbmRleCArICdcIl0nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUoZHVwbGljYXRlZFNsaWRlLmluZGV4KCksIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmVtaXQoJ29uTGF6eUltYWdlUmVhZHknLCBzLCBzbGlkZVswXSwgX2ltZ1swXSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvbkxhenlJbWFnZUxvYWQnLCBzLCBzbGlkZVswXSwgX2ltZ1swXSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxvYWQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgICAgICB2YXIgc2xpZGVzUGVyVmlldyA9IHMucGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICAgICAgICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFzLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSBzLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMud2F0Y2hTbGlkZXNWaXNpYmlsaXR5KSB7XG4gICAgICAgICAgICAgICAgICAgIHMud3JhcHBlci5jaGlsZHJlbignLicgKyBzLnBhcmFtcy5zbGlkZVZpc2libGVDbGFzcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZEltYWdlSW5TbGlkZSgkKHRoaXMpLmluZGV4KCkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gcy5hY3RpdmVJbmRleDsgaSA8IHMuYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3IDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMuc2xpZGVzW2ldKSBzLmxhenkubG9hZEltYWdlSW5TbGlkZShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sYXp5TG9hZGluZ0luUHJldk5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPiAxIHx8IChzLnBhcmFtcy5sYXp5TG9hZGluZ0luUHJldk5leHRBbW91bnQgJiYgcy5wYXJhbXMubGF6eUxvYWRpbmdJblByZXZOZXh0QW1vdW50ID4gMSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBhbW91bnQgPSBzLnBhcmFtcy5sYXp5TG9hZGluZ0luUHJldk5leHRBbW91bnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc3B2ID0gc2xpZGVzUGVyVmlldztcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBtYXhJbmRleCA9IE1hdGgubWluKHMuYWN0aXZlSW5kZXggKyBzcHYgKyBNYXRoLm1heChhbW91bnQsIHNwdiksIHMuc2xpZGVzLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWluSW5kZXggPSBNYXRoLm1heChzLmFjdGl2ZUluZGV4IC0gTWF0aC5tYXgoc3B2LCBhbW91bnQpLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5leHQgU2xpZGVzXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSBzLmFjdGl2ZUluZGV4ICsgc2xpZGVzUGVyVmlldzsgaSA8IG1heEluZGV4OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocy5zbGlkZXNbaV0pIHMubGF6eS5sb2FkSW1hZ2VJblNsaWRlKGkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUHJldiBTbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IG1pbkluZGV4OyBpIDwgcy5hY3RpdmVJbmRleCA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzLnNsaWRlc1tpXSkgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUoaSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFNsaWRlID0gcy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2xpZGUubGVuZ3RoID4gMCkgcy5sYXp5LmxvYWRJbWFnZUluU2xpZGUobmV4dFNsaWRlLmluZGV4KCkpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcmV2U2xpZGUgPSBzLndyYXBwZXIuY2hpbGRyZW4oJy4nICsgcy5wYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHByZXZTbGlkZS5sZW5ndGggPiAwKSBzLmxhenkubG9hZEltYWdlSW5TbGlkZShwcmV2U2xpZGUuaW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25UcmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubGF6eUxvYWRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmxhenlMb2FkaW5nT25UcmFuc2l0aW9uU3RhcnQgfHwgKCFzLnBhcmFtcy5sYXp5TG9hZGluZ09uVHJhbnNpdGlvblN0YXJ0ICYmICFzLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubGF6eUxvYWRpbmcgJiYgIXMucGFyYW1zLmxhenlMb2FkaW5nT25UcmFuc2l0aW9uU3RhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFNjcm9sbGJhclxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuc2Nyb2xsYmFyID0ge1xuICAgICAgICAgICAgaXNUb3VjaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIHNldERyYWdQb3NpdGlvbjogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IDAsIHkgPSAwO1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGU7XG4gICAgICAgICAgICAgICAgdmFyIHBvaW50ZXJQb3NpdGlvbiA9IHMuaXNIb3Jpem9udGFsKCkgP1xuICAgICAgICAgICAgICAgICAgICAoKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScpID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWCB8fCBlLmNsaWVudFgpIDpcbiAgICAgICAgICAgICAgICAgICAgKChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVkgfHwgZS5jbGllbnRZKSA7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gKHBvaW50ZXJQb3NpdGlvbikgLSBzYi50cmFjay5vZmZzZXQoKVtzLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCddIC0gc2IuZHJhZ1NpemUgLyAyO1xuICAgICAgICAgICAgICAgIHZhciBwb3NpdGlvbk1pbiA9IC1zLm1pblRyYW5zbGF0ZSgpICogc2IubW92ZURpdmlkZXI7XG4gICAgICAgICAgICAgICAgdmFyIHBvc2l0aW9uTWF4ID0gLXMubWF4VHJhbnNsYXRlKCkgKiBzYi5tb3ZlRGl2aWRlcjtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPCBwb3NpdGlvbk1pbikge1xuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbiA9IHBvc2l0aW9uTWluO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwb3NpdGlvbiA+IHBvc2l0aW9uTWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gcG9zaXRpb25NYXg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvc2l0aW9uID0gLXBvc2l0aW9uIC8gc2IubW92ZURpdmlkZXI7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVQcm9ncmVzcyhwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKHBvc2l0aW9uLCB0cnVlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnU3RhcnQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgc2IuaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgc2Iuc2V0RHJhZ1Bvc2l0aW9uKGUpO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzYi5kcmFnVGltZW91dCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHNiLnRyYWNrLnRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2suY3NzKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHMud3JhcHBlci50cmFuc2l0aW9uKDEwMCk7XG4gICAgICAgICAgICAgICAgc2IuZHJhZy50cmFuc2l0aW9uKDEwMCk7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblNjcm9sbGJhckRyYWdTdGFydCcsIHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYWdNb3ZlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciBzYiA9IHMuc2Nyb2xsYmFyO1xuICAgICAgICAgICAgICAgIGlmICghc2IuaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzYi5zZXREcmFnUG9zaXRpb24oZSk7XG4gICAgICAgICAgICAgICAgcy53cmFwcGVyLnRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgc2IudHJhY2sudHJhbnNpdGlvbigwKTtcbiAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgcy5lbWl0KCdvblNjcm9sbGJhckRyYWdNb3ZlJywgcyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhZ0VuZDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2IgPSBzLnNjcm9sbGJhcjtcbiAgICAgICAgICAgICAgICBpZiAoIXNiLmlzVG91Y2hlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHNiLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXJIaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dChzYi5kcmFnVGltZW91dCk7XG4gICAgICAgICAgICAgICAgICAgIHNiLmRyYWdUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi50cmFjay5jc3MoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrLnRyYW5zaXRpb24oNDAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwMCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsYmFyRHJhZ0VuZCcsIHMpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXJTbmFwT25SZWxlYXNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2xpZGVSZXNldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmFnZ2FibGVFdmVudHM6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKChzLnBhcmFtcy5zaW11bGF0ZVRvdWNoID09PSBmYWxzZSAmJiAhcy5zdXBwb3J0LnRvdWNoKSkgcmV0dXJuIHMudG91Y2hFdmVudHNEZXNrdG9wO1xuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIHMudG91Y2hFdmVudHM7XG4gICAgICAgICAgICB9KSgpLFxuICAgICAgICAgICAgZW5hYmxlRHJhZ2dhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHMuc3VwcG9ydC50b3VjaCA/IHNiLnRyYWNrIDogZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgJChzYi50cmFjaykub24oc2IuZHJhZ2dhYmxlRXZlbnRzLnN0YXJ0LCBzYi5kcmFnU3RhcnQpO1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5vbihzYi5kcmFnZ2FibGVFdmVudHMubW92ZSwgc2IuZHJhZ01vdmUpO1xuICAgICAgICAgICAgICAgICQodGFyZ2V0KS5vbihzYi5kcmFnZ2FibGVFdmVudHMuZW5kLCBzYi5kcmFnRW5kKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXNhYmxlRHJhZ2dhYmxlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHMuc3VwcG9ydC50b3VjaCA/IHNiLnRyYWNrIDogZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgJChzYi50cmFjaykub2ZmKHNiLmRyYWdnYWJsZUV2ZW50cy5zdGFydCwgc2IuZHJhZ1N0YXJ0KTtcbiAgICAgICAgICAgICAgICAkKHRhcmdldCkub2ZmKHNiLmRyYWdnYWJsZUV2ZW50cy5tb3ZlLCBzYi5kcmFnTW92ZSk7XG4gICAgICAgICAgICAgICAgJCh0YXJnZXQpLm9mZihzYi5kcmFnZ2FibGVFdmVudHMuZW5kLCBzYi5kcmFnRW5kKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLnNjcm9sbGJhcikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBzYiA9IHMuc2Nyb2xsYmFyO1xuICAgICAgICAgICAgICAgIHNiLnRyYWNrID0gJChzLnBhcmFtcy5zY3JvbGxiYXIpO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2Ygcy5wYXJhbXMuc2Nyb2xsYmFyID09PSAnc3RyaW5nJyAmJiBzYi50cmFjay5sZW5ndGggPiAxICYmIHMuY29udGFpbmVyLmZpbmQocy5wYXJhbXMuc2Nyb2xsYmFyKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2sgPSBzLmNvbnRhaW5lci5maW5kKHMucGFyYW1zLnNjcm9sbGJhcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNiLmRyYWcgPSBzYi50cmFjay5maW5kKCcuc3dpcGVyLXNjcm9sbGJhci1kcmFnJyk7XG4gICAgICAgICAgICAgICAgaWYgKHNiLmRyYWcubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNiLmRyYWcgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLXNjcm9sbGJhci1kcmFnXCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrLmFwcGVuZChzYi5kcmFnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICAgICAgICAgIHNiLmRyYWdbMF0uc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgICAgICAgICAgc2IudHJhY2tTaXplID0gcy5pc0hvcml6b250YWwoKSA/IHNiLnRyYWNrWzBdLm9mZnNldFdpZHRoIDogc2IudHJhY2tbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBzYi5kaXZpZGVyID0gcy5zaXplIC8gcy52aXJ0dWFsU2l6ZTtcbiAgICAgICAgICAgICAgICBzYi5tb3ZlRGl2aWRlciA9IHNiLmRpdmlkZXIgKiAoc2IudHJhY2tTaXplIC8gcy5zaXplKTtcbiAgICAgICAgICAgICAgICBzYi5kcmFnU2l6ZSA9IHNiLnRyYWNrU2l6ZSAqIHNiLmRpdmlkZXI7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHNiLmRyYWdbMF0uc3R5bGUud2lkdGggPSBzYi5kcmFnU2l6ZSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzYi5kcmFnWzBdLnN0eWxlLmhlaWdodCA9IHNiLmRyYWdTaXplICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzYi5kaXZpZGVyID49IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2tbMF0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNiLnRyYWNrWzBdLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2IudHJhY2tbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghcy5wYXJhbXMuc2Nyb2xsYmFyKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdmFyIGRpZmY7XG4gICAgICAgICAgICAgICAgdmFyIHNiID0gcy5zY3JvbGxiYXI7XG4gICAgICAgICAgICAgICAgdmFyIHRyYW5zbGF0ZSA9IHMudHJhbnNsYXRlIHx8IDA7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1BvcztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgdmFyIG5ld1NpemUgPSBzYi5kcmFnU2l6ZTtcbiAgICAgICAgICAgICAgICBuZXdQb3MgPSAoc2IudHJhY2tTaXplIC0gc2IuZHJhZ1NpemUpICogcy5wcm9ncmVzcztcbiAgICAgICAgICAgICAgICBpZiAocy5ydGwgJiYgcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdQb3MgPSAtbmV3UG9zO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV3UG9zID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3U2l6ZSA9IHNiLmRyYWdTaXplIC0gbmV3UG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3UG9zID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgtbmV3UG9zICsgc2IuZHJhZ1NpemUgPiBzYi50cmFja1NpemUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1NpemUgPSBzYi50cmFja1NpemUgKyBuZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChuZXdQb3MgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gc2IuZHJhZ1NpemUgKyBuZXdQb3M7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdQb3MgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKG5ld1BvcyArIHNiLmRyYWdTaXplID4gc2IudHJhY2tTaXplKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdTaXplID0gc2IudHJhY2tTaXplIC0gbmV3UG9zO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnN1cHBvcnQudHJhbnNmb3JtczNkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIChuZXdQb3MpICsgJ3B4LCAwLCAwKScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2IuZHJhZy50cmFuc2Zvcm0oJ3RyYW5zbGF0ZVgoJyArIChuZXdQb3MpICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNiLmRyYWdbMF0uc3R5bGUud2lkdGggPSBuZXdTaXplICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnN1cHBvcnQudHJhbnNmb3JtczNkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMHB4LCAnICsgKG5ld1BvcykgKyAncHgsIDApJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi5kcmFnLnRyYW5zZm9ybSgndHJhbnNsYXRlWSgnICsgKG5ld1BvcykgKyAncHgpJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2IuZHJhZ1swXS5zdHlsZS5oZWlnaHQgPSBuZXdTaXplICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckhpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNiLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICBzYi50cmFja1swXS5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgc2IudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2IudHJhY2tbMF0uc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYi50cmFjay50cmFuc2l0aW9uKDQwMCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLnNjcm9sbGJhcikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLmRyYWcudHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIENvbnRyb2xsZXJcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmNvbnRyb2xsZXIgPSB7XG4gICAgICAgICAgICBMaW5lYXJTcGxpbmU6IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgICAgICAgICAgdmFyIGJpbmFyeVNlYXJjaCA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1heEluZGV4LCBtaW5JbmRleCwgZ3Vlc3M7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbihhcnJheSwgdmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5JbmRleCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF4SW5kZXggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAobWF4SW5kZXggLSBtaW5JbmRleCA+IDEpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5W2d1ZXNzID0gbWF4SW5kZXggKyBtaW5JbmRleCA+PiAxXSA8PSB2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluSW5kZXggPSBndWVzcztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhJbmRleCA9IGd1ZXNzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXhJbmRleDtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RJbmRleCA9IHgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAvLyBHaXZlbiBhbiB4IHZhbHVlICh4MiksIHJldHVybiB0aGUgZXhwZWN0ZWQgeTIgdmFsdWU6XG4gICAgICAgICAgICAgICAgLy8gKHgxLHkxKSBpcyB0aGUga25vd24gcG9pbnQgYmVmb3JlIGdpdmVuIHZhbHVlLFxuICAgICAgICAgICAgICAgIC8vICh4Myx5MykgaXMgdGhlIGtub3duIHBvaW50IGFmdGVyIGdpdmVuIHZhbHVlLlxuICAgICAgICAgICAgICAgIHZhciBpMSwgaTM7XG4gICAgICAgICAgICAgICAgdmFyIGwgPSB0aGlzLngubGVuZ3RoO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB0aGlzLmludGVycG9sYXRlID0gZnVuY3Rpb24gKHgyKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgheDIpIHJldHVybiAwO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IHRoZSBpbmRleGVzIG9mIHgxIGFuZCB4MyAodGhlIGFycmF5IGluZGV4ZXMgYmVmb3JlIGFuZCBhZnRlciBnaXZlbiB4Mik6XG4gICAgICAgICAgICAgICAgICAgIGkzID0gYmluYXJ5U2VhcmNoKHRoaXMueCwgeDIpO1xuICAgICAgICAgICAgICAgICAgICBpMSA9IGkzIC0gMTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGhhdmUgb3VyIGluZGV4ZXMgaTEgJiBpMywgc28gd2UgY2FuIGNhbGN1bGF0ZSBhbHJlYWR5OlxuICAgICAgICAgICAgICAgICAgICAvLyB5MiA6PSAoKHgy4oiSeDEpIMOXICh5M+KIknkxKSkgw7cgKHgz4oiSeDEpICsgeTFcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgoeDIgLSB0aGlzLnhbaTFdKSAqICh0aGlzLnlbaTNdIC0gdGhpcy55W2kxXSkpIC8gKHRoaXMueFtpM10gLSB0aGlzLnhbaTFdKSArIHRoaXMueVtpMV07XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvL3h4eDogZm9yIG5vdyBpIHdpbGwganVzdCBzYXZlIG9uZSBzcGxpbmUgZnVuY3Rpb24gdG8gdG9cbiAgICAgICAgICAgIGdldEludGVycG9sYXRlRnVuY3Rpb246IGZ1bmN0aW9uKGMpe1xuICAgICAgICAgICAgICAgIGlmKCFzLmNvbnRyb2xsZXIuc3BsaW5lKSBzLmNvbnRyb2xsZXIuc3BsaW5lID0gcy5wYXJhbXMubG9vcCA/XG4gICAgICAgICAgICAgICAgICAgIG5ldyBzLmNvbnRyb2xsZXIuTGluZWFyU3BsaW5lKHMuc2xpZGVzR3JpZCwgYy5zbGlkZXNHcmlkKSA6XG4gICAgICAgICAgICAgICAgICAgIG5ldyBzLmNvbnRyb2xsZXIuTGluZWFyU3BsaW5lKHMuc25hcEdyaWQsIGMuc25hcEdyaWQpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gKHRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICB2YXIgY29udHJvbGxlZCA9IHMucGFyYW1zLmNvbnRyb2w7XG4gICAgICAgICAgICAgICB2YXIgbXVsdGlwbGllciwgY29udHJvbGxlZFRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgIGZ1bmN0aW9uIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoYykge1xuICAgICAgICAgICAgICAgICAgICAvLyB0aGlzIHdpbGwgY3JlYXRlIGFuIEludGVycG9sYXRlIGZ1bmN0aW9uIGJhc2VkIG9uIHRoZSBzbmFwR3JpZHNcbiAgICAgICAgICAgICAgICAgICAgLy8geCBpcyB0aGUgR3JpZCBvZiB0aGUgc2Nyb2xsZWQgc2Nyb2xsZXIgYW5kIHkgd2lsbCBiZSB0aGUgY29udHJvbGxlZCBzY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAvLyBpdCBtYWtlcyBzZW5zZSB0byBjcmVhdGUgdGhpcyBvbmx5IG9uY2UgYW5kIHJlY2FsbCBpdCBmb3IgdGhlIGludGVycG9sYXRpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGZ1bmN0aW9uIGRvZXMgYSBsb3Qgb2YgdmFsdWUgY2FjaGluZyBmb3IgcGVyZm9ybWFuY2VcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlID0gYy5ydGwgJiYgYy5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAtcy50cmFuc2xhdGUgOiBzLnRyYW5zbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmNvbnRyb2xCeSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5jb250cm9sbGVyLmdldEludGVycG9sYXRlRnVuY3Rpb24oYyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpIGFtIG5vdCBzdXJlIHdoeSB0aGUgdmFsdWVzIGhhdmUgdG8gYmUgbXVsdGlwbGljYXRlZCB0aGlzIHdheSwgdHJpZWQgdG8gaW52ZXJ0IHRoZSBzbmFwR3JpZFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGl0IGRpZCBub3Qgd29yayBvdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSAtcy5jb250cm9sbGVyLnNwbGluZS5pbnRlcnBvbGF0ZSgtdHJhbnNsYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYoIWNvbnRyb2xsZWRUcmFuc2xhdGUgfHwgcy5wYXJhbXMuY29udHJvbEJ5ID09PSAnY29udGFpbmVyJyl7XG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gKGMubWF4VHJhbnNsYXRlKCkgLSBjLm1pblRyYW5zbGF0ZSgpKSAvIChzLm1heFRyYW5zbGF0ZSgpIC0gcy5taW5UcmFuc2xhdGUoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250cm9sbGVkVHJhbnNsYXRlID0gKHRyYW5zbGF0ZSAtIHMubWluVHJhbnNsYXRlKCkpICogbXVsdGlwbGllciArIGMubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5jb250cm9sSW52ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IGMubWF4VHJhbnNsYXRlKCkgLSBjb250cm9sbGVkVHJhbnNsYXRlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGMudXBkYXRlUHJvZ3Jlc3MoY29udHJvbGxlZFRyYW5zbGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIGMuc2V0V3JhcHBlclRyYW5zbGF0ZShjb250cm9sbGVkVHJhbnNsYXRlLCBmYWxzZSwgcyk7XG4gICAgICAgICAgICAgICAgICAgIGMudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xsZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250cm9sbGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250cm9sbGVkW2ldICE9PSBieUNvbnRyb2xsZXIgJiYgY29udHJvbGxlZFtpXSBpbnN0YW5jZW9mIFN3aXBlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zbGF0ZShjb250cm9sbGVkW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgIGVsc2UgaWYgKGNvbnRyb2xsZWQgaW5zdGFuY2VvZiBTd2lwZXIgJiYgYnlDb250cm9sbGVyICE9PSBjb250cm9sbGVkKSB7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgIHNldENvbnRyb2xsZWRUcmFuc2xhdGUoY29udHJvbGxlZCk7XG4gICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgY29udHJvbGxlZCA9IHMucGFyYW1zLmNvbnRyb2w7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oYykge1xuICAgICAgICAgICAgICAgICAgICBjLnNldFdyYXBwZXJUcmFuc2l0aW9uKGR1cmF0aW9uLCBzKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGR1cmF0aW9uICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLm9uVHJhbnNpdGlvblN0YXJ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjLndyYXBwZXIudHJhbnNpdGlvbkVuZChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udHJvbGxlZCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjLnBhcmFtcy5sb29wICYmIHMucGFyYW1zLmNvbnRyb2xCeSA9PT0gJ3NsaWRlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjLmZpeExvb3AoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYy5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb250cm9sbGVkKSkge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY29udHJvbGxlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZFtpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBIYXNoIE5hdmlnYXRpb25cbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmhhc2huYXYgPSB7XG4gICAgICAgICAgICBvbkhhc2hDYW5nZTogZnVuY3Rpb24gKGUsIGEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3SGFzaCA9IGRvY3VtZW50LmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlU2xpZGVIYXNoID0gcy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCkuYXR0cignZGF0YS1oYXNoJyk7XG4gICAgICAgICAgICAgICAgaWYgKG5ld0hhc2ggIT09IGFjdGl2ZVNsaWRlSGFzaCkge1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8ocy53cmFwcGVyLmNoaWxkcmVuKCcuJyArIHMucGFyYW1zLnNsaWRlQ2xhc3MgKyAnW2RhdGEtaGFzaD1cIicgKyAobmV3SGFzaCkgKyAnXCJdJykuaW5kZXgoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF0dGFjaEV2ZW50czogZnVuY3Rpb24gKGRldGFjaCkge1xuICAgICAgICAgICAgICAgIHZhciBhY3Rpb24gPSBkZXRhY2ggPyAnb2ZmJyA6ICdvbic7XG4gICAgICAgICAgICAgICAgJCh3aW5kb3cpW2FjdGlvbl0oJ2hhc2hjaGFuZ2UnLCBzLmhhc2huYXYub25IYXNoQ2FuZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldEhhc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMuaGFzaG5hdi5pbml0aWFsaXplZCB8fCAhcy5wYXJhbXMuaGFzaG5hdikgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5yZXBsYWNlU3RhdGUgJiYgd2luZG93Lmhpc3RvcnkgJiYgd2luZG93Lmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCAoJyMnICsgcy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCkuYXR0cignZGF0YS1oYXNoJykgfHwgJycpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShzLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGhhc2ggPSBzbGlkZS5hdHRyKCdkYXRhLWhhc2gnKSB8fCBzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKTtcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaGFzaCA9IGhhc2ggfHwgJyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLmhhc2huYXYgfHwgcy5wYXJhbXMuaGlzdG9yeSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHMuaGFzaG5hdi5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdmFyIGhhc2ggPSBkb2N1bWVudC5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICAgICAgICAgICAgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNwZWVkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHMuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUhhc2ggPSBzbGlkZS5hdHRyKCdkYXRhLWhhc2gnKSB8fCBzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZUhhc2ggPT09IGhhc2ggJiYgIXNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBzLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2V2F0Y2hTdGF0ZSkgcy5oYXNobmF2LmF0dGFjaEV2ZW50cygpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuaGFzaG5hdldhdGNoU3RhdGUpIHMuaGFzaG5hdi5hdHRhY2hFdmVudHModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEhpc3RvcnkgQXBpIHdpdGggZmFsbGJhY2sgdG8gSGFzaG5hdlxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuaGlzdG9yeSA9IHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMucGFyYW1zLmhpc3RvcnkpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5oaXN0b3J5IHx8ICF3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcy5wYXJhbXMuaGlzdG9yeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBzLnBhcmFtcy5oYXNobmF2ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLmhpc3RvcnkuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aHMgPSB0aGlzLmdldFBhdGhWYWx1ZXMoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMucGF0aHMua2V5ICYmICF0aGlzLnBhdGhzLnZhbHVlKSByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxUb1NsaWRlKDAsIHRoaXMucGF0aHMudmFsdWUsIHMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgdGhpcy5zZXRIaXN0b3J5UG9wU3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRIaXN0b3J5UG9wU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHMuaGlzdG9yeS5wYXRocyA9IHMuaGlzdG9yeS5nZXRQYXRoVmFsdWVzKCk7XG4gICAgICAgICAgICAgICAgcy5oaXN0b3J5LnNjcm9sbFRvU2xpZGUocy5wYXJhbXMuc3BlZWQsIHMuaGlzdG9yeS5wYXRocy52YWx1ZSwgZmFsc2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdldFBhdGhWYWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoQXJyYXkgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUuc2xpY2UoMSkuc3BsaXQoJy8nKTtcbiAgICAgICAgICAgICAgICB2YXIgdG90YWwgPSBwYXRoQXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbdG90YWwgLSAyXTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBwYXRoQXJyYXlbdG90YWwgLSAxXTtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBrZXk6IGtleSwgdmFsdWU6IHZhbHVlIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0SGlzdG9yeTogZnVuY3Rpb24gKGtleSwgaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXMuaGlzdG9yeS5pbml0aWFsaXplZCB8fCAhcy5wYXJhbXMuaGlzdG9yeSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBzbGlkZSA9IHMuc2xpZGVzLmVxKGluZGV4KTtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xuICAgICAgICAgICAgICAgIGlmICghd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLmluY2x1ZGVzKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBrZXkgKyAnLycgKyB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5yZXBsYWNlU3RhdGUobnVsbCwgbnVsbCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShudWxsLCBudWxsLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNsdWdpZnk6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dC50b1N0cmluZygpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvW15cXHdcXC1dKy9nLCAnJylcbiAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1xcLVxcLSsvZywgJy0nKVxuICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvXi0rLywgJycpXG4gICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8tKyQvLCAnJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Nyb2xsVG9TbGlkZTogZnVuY3Rpb24oc3BlZWQsIHZhbHVlLCBydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IHMuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgc2xpZGUgPSBzLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzbGlkZUhpc3RvcnkgPSB0aGlzLnNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlSGlzdG9yeSA9PT0gdmFsdWUgJiYgIXNsaWRlLmhhc0NsYXNzKHMucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVRvKDAsIHNwZWVkLCBydW5DYWxsYmFja3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgXG5cbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgICAgS2V5Ym9hcmQgQ29udHJvbFxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUtleWJvYXJkKGUpIHtcbiAgICAgICAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7IC8vanF1ZXJ5IGZpeFxuICAgICAgICAgICAgdmFyIGtjID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG4gICAgICAgICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb05leHQgJiYgKHMuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM5IHx8ICFzLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSA0MCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmFsbG93U3dpcGVUb1ByZXYgJiYgKHMuaXNIb3Jpem9udGFsKCkgJiYga2MgPT09IDM3IHx8ICFzLmlzSG9yaXpvbnRhbCgpICYmIGtjID09PSAzOCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZSAmJiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnaW5wdXQnIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSB8fCBrYyA9PT0gMzggfHwga2MgPT09IDQwKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluVmlldyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIC8vQ2hlY2sgdGhhdCBzd2lwZXIgc2hvdWxkIGJlIGluc2lkZSBvZiB2aXNpYmxlIGFyZWEgb2Ygd2luZG93XG4gICAgICAgICAgICAgICAgaWYgKHMuY29udGFpbmVyLnBhcmVudHMoJy4nICsgcy5wYXJhbXMuc2xpZGVDbGFzcykubGVuZ3RoID4gMCAmJiBzLmNvbnRhaW5lci5wYXJlbnRzKCcuJyArIHMucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dTY3JvbGwgPSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgdG9wOiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgICAgIHZhciB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlck9mZnNldCA9IHMuY29udGFpbmVyLm9mZnNldCgpO1xuICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkgc3dpcGVyT2Zmc2V0LmxlZnQgPSBzd2lwZXJPZmZzZXQubGVmdCAtIHMuY29udGFpbmVyWzBdLnNjcm9sbExlZnQ7XG4gICAgICAgICAgICAgICAgdmFyIHN3aXBlckNvb3JkID0gW1xuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3BdLFxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wXSxcbiAgICAgICAgICAgICAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgcy5oZWlnaHRdLFxuICAgICAgICAgICAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQgKyBzLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wICsgcy5oZWlnaHRdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN3aXBlckNvb3JkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwb2ludCA9IHN3aXBlckNvb3JkW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFswXSA+PSB3aW5kb3dTY3JvbGwubGVmdCAmJiBwb2ludFswXSA8PSB3aW5kb3dTY3JvbGwubGVmdCArIHdpbmRvd1dpZHRoICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBwb2ludFsxXSA+PSB3aW5kb3dTY3JvbGwudG9wICYmIHBvaW50WzFdIDw9IHdpbmRvd1Njcm9sbC50b3AgKyB3aW5kb3dIZWlnaHRcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpblZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWluVmlldykgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2MgPT09IDM3IHx8IGtjID09PSAzOSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKChrYyA9PT0gMzkgJiYgIXMucnRsKSB8fCAoa2MgPT09IDM3ICYmIHMucnRsKSkgcy5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgICBpZiAoKGtjID09PSAzNyAmJiAhcy5ydGwpIHx8IChrYyA9PT0gMzkgJiYgcy5ydGwpKSBzLnNsaWRlUHJldigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSAzOCB8fCBrYyA9PT0gNDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChrYyA9PT0gNDApIHMuc2xpZGVOZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKGtjID09PSAzOCkgcy5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHMuZW1pdCgnb25LZXlQcmVzcycsIHMsIGtjKTtcbiAgICAgICAgfVxuICAgICAgICBzLmRpc2FibGVLZXlib2FyZENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5rZXlib2FyZENvbnRyb2wgPSBmYWxzZTtcbiAgICAgICAgICAgICQoZG9jdW1lbnQpLm9mZigna2V5ZG93bicsIGhhbmRsZUtleWJvYXJkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5lbmFibGVLZXlib2FyZENvbnRyb2wgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzLnBhcmFtcy5rZXlib2FyZENvbnRyb2wgPSB0cnVlO1xuICAgICAgICAgICAgJChkb2N1bWVudCkub24oJ2tleWRvd24nLCBoYW5kbGVLZXlib2FyZCk7XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIE1vdXNld2hlZWwgQ29udHJvbFxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMubW91c2V3aGVlbCA9IHtcbiAgICAgICAgICAgIGV2ZW50OiBmYWxzZSxcbiAgICAgICAgICAgIGxhc3RTY3JvbGxUaW1lOiAobmV3IHdpbmRvdy5EYXRlKCkpLmdldFRpbWUoKVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBpc0V2ZW50U3VwcG9ydGVkKCkge1xuICAgICAgICAgICAgdmFyIGV2ZW50TmFtZSA9ICdvbndoZWVsJztcbiAgICAgICAgICAgIHZhciBpc1N1cHBvcnRlZCA9IGV2ZW50TmFtZSBpbiBkb2N1bWVudDtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShldmVudE5hbWUsICdyZXR1cm47Jyk7XG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSB0eXBlb2YgZWxlbWVudFtldmVudE5hbWVdID09PSAnZnVuY3Rpb24nO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICghaXNTdXBwb3J0ZWQgJiZcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbiAmJlxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUgJiZcbiAgICAgICAgICAgICAgICAgICAgLy8gYWx3YXlzIHJldHVybnMgdHJ1ZSBpbiBuZXdlciBicm93c2VycyBhcyBwZXIgdGhlIHN0YW5kYXJkLlxuICAgICAgICAgICAgICAgICAgICAvLyBAc2VlIGh0dHA6Ly9kb20uc3BlYy53aGF0d2cub3JnLyNkb20tZG9taW1wbGVtZW50YXRpb24taGFzZmVhdHVyZVxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJycsICcnKSAhPT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIHRoZSBvbmx5IHdheSB0byB0ZXN0IHN1cHBvcnQgZm9yIHRoZSBgd2hlZWxgIGV2ZW50IGluIElFOSsuXG4gICAgICAgICAgICAgICAgaXNTdXBwb3J0ZWQgPSBkb2N1bWVudC5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCdFdmVudHMud2hlZWwnLCAnMy4wJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIGlzU3VwcG9ydGVkO1xuICAgICAgICB9XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBNb3VzZSB3aGVlbCAoYW5kIDItZmluZ2VyIHRyYWNrcGFkKSBzdXBwb3J0IG9uIHRoZSB3ZWIgc3Vja3MuICBJdCBpc1xuICAgICAgICAgKiBjb21wbGljYXRlZCwgdGh1cyB0aGlzIGRvYyBpcyBsb25nIGFuZCAoaG9wZWZ1bGx5KSBkZXRhaWxlZCBlbm91Z2ggdG8gYW5zd2VyXG4gICAgICAgICAqIHlvdXIgcXVlc3Rpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBJZiB5b3UgbmVlZCB0byByZWFjdCB0byB0aGUgbW91c2Ugd2hlZWwgaW4gYSBwcmVkaWN0YWJsZSB3YXksIHRoaXMgY29kZSBpc1xuICAgICAgICAgKiBsaWtlIHlvdXIgYmVzdGVzdCBmcmllbmQuICogaHVncyAqXG4gICAgICAgICAqXG4gICAgICAgICAqIEFzIG9mIHRvZGF5LCB0aGVyZSBhcmUgNCBET00gZXZlbnQgdHlwZXMgeW91IGNhbiBsaXN0ZW4gdG86XG4gICAgICAgICAqXG4gICAgICAgICAqICAgJ3doZWVsJyAgICAgICAgICAgICAgICAtLSBDaHJvbWUoMzErKSwgRkYoMTcrKSwgSUUoOSspXG4gICAgICAgICAqICAgJ21vdXNld2hlZWwnICAgICAgICAgICAtLSBDaHJvbWUsIElFKDYrKSwgT3BlcmEsIFNhZmFyaVxuICAgICAgICAgKiAgICdNb3pNb3VzZVBpeGVsU2Nyb2xsJyAgLS0gRkYoMy41IG9ubHkhKSAoMjAxMC0yMDEzKSAtLSBkb24ndCBib3RoZXIhXG4gICAgICAgICAqICAgJ0RPTU1vdXNlU2Nyb2xsJyAgICAgICAtLSBGRigwLjkuNyspIHNpbmNlIDIwMDNcbiAgICAgICAgICpcbiAgICAgICAgICogU28gd2hhdCB0byBkbz8gIFRoZSBpcyB0aGUgYmVzdDpcbiAgICAgICAgICpcbiAgICAgICAgICogICBub3JtYWxpemVXaGVlbC5nZXRFdmVudFR5cGUoKTtcbiAgICAgICAgICpcbiAgICAgICAgICogSW4geW91ciBldmVudCBjYWxsYmFjaywgdXNlIHRoaXMgY29kZSB0byBnZXQgc2FuZSBpbnRlcnByZXRhdGlvbiBvZiB0aGVcbiAgICAgICAgICogZGVsdGFzLiAgVGhpcyBjb2RlIHdpbGwgcmV0dXJuIGFuIG9iamVjdCB3aXRoIHByb3BlcnRpZXM6XG4gICAgICAgICAqXG4gICAgICAgICAqICAgc3BpblggICAtLSBub3JtYWxpemVkIHNwaW4gc3BlZWQgKHVzZSBmb3Igem9vbSkgLSB4IHBsYW5lXG4gICAgICAgICAqICAgc3BpblkgICAtLSBcIiAtIHkgcGxhbmVcbiAgICAgICAgICogICBwaXhlbFggIC0tIG5vcm1hbGl6ZWQgZGlzdGFuY2UgKHRvIHBpeGVscykgLSB4IHBsYW5lXG4gICAgICAgICAqICAgcGl4ZWxZICAtLSBcIiAtIHkgcGxhbmVcbiAgICAgICAgICpcbiAgICAgICAgICogV2hlZWwgdmFsdWVzIGFyZSBwcm92aWRlZCBieSB0aGUgYnJvd3NlciBhc3N1bWluZyB5b3UgYXJlIHVzaW5nIHRoZSB3aGVlbCB0b1xuICAgICAgICAgKiBzY3JvbGwgYSB3ZWIgcGFnZSBieSBhIG51bWJlciBvZiBsaW5lcyBvciBwaXhlbHMgKG9yIHBhZ2VzKS4gIFZhbHVlcyBjYW4gdmFyeVxuICAgICAgICAgKiBzaWduaWZpY2FudGx5IG9uIGRpZmZlcmVudCBwbGF0Zm9ybXMgYW5kIGJyb3dzZXJzLCBmb3JnZXR0aW5nIHRoYXQgeW91IGNhblxuICAgICAgICAgKiBzY3JvbGwgYXQgZGlmZmVyZW50IHNwZWVkcy4gIFNvbWUgZGV2aWNlcyAobGlrZSB0cmFja3BhZHMpIGVtaXQgbW9yZSBldmVudHNcbiAgICAgICAgICogYXQgc21hbGxlciBpbmNyZW1lbnRzIHdpdGggZmluZSBncmFudWxhcml0eSwgYW5kIHNvbWUgZW1pdCBtYXNzaXZlIGp1bXBzIHdpdGhcbiAgICAgICAgICogbGluZWFyIHNwZWVkIG9yIGFjY2VsZXJhdGlvbi5cbiAgICAgICAgICpcbiAgICAgICAgICogVGhpcyBjb2RlIGRvZXMgaXRzIGJlc3QgdG8gbm9ybWFsaXplIHRoZSBkZWx0YXMgZm9yIHlvdTpcbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHNwaW4gaXMgdHJ5aW5nIHRvIG5vcm1hbGl6ZSBob3cgZmFyIHRoZSB3aGVlbCB3YXMgc3B1biAob3IgdHJhY2twYWRcbiAgICAgICAgICogICAgIGRyYWdnZWQpLiAgVGhpcyBpcyBzdXBlciB1c2VmdWwgZm9yIHpvb20gc3VwcG9ydCB3aGVyZSB5b3Ugd2FudCB0b1xuICAgICAgICAgKiAgICAgdGhyb3cgYXdheSB0aGUgY2h1bmt5IHNjcm9sbCBzdGVwcyBvbiB0aGUgUEMgYW5kIG1ha2UgdGhvc2UgZXF1YWwgdG9cbiAgICAgICAgICogICAgIHRoZSBzbG93IGFuZCBzbW9vdGggdGlueSBzdGVwcyBvbiB0aGUgTWFjLiBLZXkgZGF0YTogVGhpcyBjb2RlIHRyaWVzIHRvXG4gICAgICAgICAqICAgICByZXNvbHZlIGEgc2luZ2xlIHNsb3cgc3RlcCBvbiBhIHdoZWVsIHRvIDEuXG4gICAgICAgICAqXG4gICAgICAgICAqICAgLSBwaXhlbCBpcyBub3JtYWxpemluZyB0aGUgZGVzaXJlZCBzY3JvbGwgZGVsdGEgaW4gcGl4ZWwgdW5pdHMuICBZb3UnbGxcbiAgICAgICAgICogICAgIGdldCB0aGUgY3JhenkgZGlmZmVyZW5jZXMgYmV0d2VlbiBicm93c2VycywgYnV0IGF0IGxlYXN0IGl0J2xsIGJlIGluXG4gICAgICAgICAqICAgICBwaXhlbHMhXG4gICAgICAgICAqXG4gICAgICAgICAqICAgLSBwb3NpdGl2ZSB2YWx1ZSBpbmRpY2F0ZXMgc2Nyb2xsaW5nIERPV04vUklHSFQsIG5lZ2F0aXZlIFVQL0xFRlQuICBUaGlzXG4gICAgICAgICAqICAgICBzaG91bGQgdHJhbnNsYXRlIHRvIHBvc2l0aXZlIHZhbHVlIHpvb21pbmcgSU4sIG5lZ2F0aXZlIHpvb21pbmcgT1VULlxuICAgICAgICAgKiAgICAgVGhpcyBtYXRjaGVzIHRoZSBuZXdlciAnd2hlZWwnIGV2ZW50LlxuICAgICAgICAgKlxuICAgICAgICAgKiBXaHkgYXJlIHRoZXJlIHNwaW5YLCBzcGluWSAob3IgcGl4ZWxzKT9cbiAgICAgICAgICpcbiAgICAgICAgICogICAtIHNwaW5YIGlzIGEgMi1maW5nZXIgc2lkZSBkcmFnIG9uIHRoZSB0cmFja3BhZCwgYW5kIGEgc2hpZnQgKyB3aGVlbCB0dXJuXG4gICAgICAgICAqICAgICB3aXRoIGEgbW91c2UuICBJdCByZXN1bHRzIGluIHNpZGUtc2Nyb2xsaW5nIGluIHRoZSBicm93c2VyIGJ5IGRlZmF1bHQuXG4gICAgICAgICAqXG4gICAgICAgICAqICAgLSBzcGluWSBpcyB3aGF0IHlvdSBleHBlY3QgLS0gaXQncyB0aGUgY2xhc3NpYyBheGlzIG9mIGEgbW91c2Ugd2hlZWwuXG4gICAgICAgICAqXG4gICAgICAgICAqICAgLSBJIGRyb3BwZWQgc3BpblovcGl4ZWxaLiAgSXQgaXMgc3VwcG9ydGVkIGJ5IHRoZSBET00gMyAnd2hlZWwnIGV2ZW50IGFuZFxuICAgICAgICAgKiAgICAgcHJvYmFibHkgaXMgYnkgYnJvd3NlcnMgaW4gY29uanVuY3Rpb24gd2l0aCBmYW5jeSAzRCBjb250cm9sbGVycyAuLiBidXRcbiAgICAgICAgICogICAgIHlvdSBrbm93LlxuICAgICAgICAgKlxuICAgICAgICAgKiBJbXBsZW1lbnRhdGlvbiBpbmZvOlxuICAgICAgICAgKlxuICAgICAgICAgKiBFeGFtcGxlcyBvZiAnd2hlZWwnIGV2ZW50IGlmIHlvdSBzY3JvbGwgc2xvd2x5IChkb3duKSBieSBvbmUgc3RlcCB3aXRoIGFuXG4gICAgICAgICAqIGF2ZXJhZ2UgbW91c2U6XG4gICAgICAgICAqXG4gICAgICAgICAqICAgT1MgWCArIENocm9tZSAgKG1vdXNlKSAgICAgLSAgICA0ICAgcGl4ZWwgZGVsdGEgICh3aGVlbERlbHRhIC0xMjApXG4gICAgICAgICAqICAgT1MgWCArIFNhZmFyaSAgKG1vdXNlKSAgICAgLSAgTi9BICAgcGl4ZWwgZGVsdGEgICh3aGVlbERlbHRhICAtMTIpXG4gICAgICAgICAqICAgT1MgWCArIEZpcmVmb3ggKG1vdXNlKSAgICAgLSAgICAwLjEgbGluZSAgZGVsdGEgICh3aGVlbERlbHRhICBOL0EpXG4gICAgICAgICAqICAgV2luOCArIENocm9tZSAgKG1vdXNlKSAgICAgLSAgMTAwICAgcGl4ZWwgZGVsdGEgICh3aGVlbERlbHRhIC0xMjApXG4gICAgICAgICAqICAgV2luOCArIEZpcmVmb3ggKG1vdXNlKSAgICAgLSAgICAzICAgbGluZSAgZGVsdGEgICh3aGVlbERlbHRhIC0xMjApXG4gICAgICAgICAqXG4gICAgICAgICAqIE9uIHRoZSB0cmFja3BhZDpcbiAgICAgICAgICpcbiAgICAgICAgICogICBPUyBYICsgQ2hyb21lICAodHJhY2twYWQpICAtICAgIDIgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgICAtNilcbiAgICAgICAgICogICBPUyBYICsgRmlyZWZveCAodHJhY2twYWQpICAtICAgIDEgICBwaXhlbCBkZWx0YSAgKHdoZWVsRGVsdGEgIE4vQSlcbiAgICAgICAgICpcbiAgICAgICAgICogT24gb3RoZXIvb2xkZXIgYnJvd3NlcnMuLiBpdCdzIG1vcmUgY29tcGxpY2F0ZWQgYXMgdGhlcmUgY2FuIGJlIG11bHRpcGxlIGFuZFxuICAgICAgICAgKiBhbHNvIG1pc3NpbmcgZGVsdGEgdmFsdWVzLlxuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgJ3doZWVsJyBldmVudCBpcyBtb3JlIHN0YW5kYXJkOlxuICAgICAgICAgKlxuICAgICAgICAgKiBodHRwOi8vd3d3LnczLm9yZy9UUi9ET00tTGV2ZWwtMy1FdmVudHMvI2V2ZW50cy13aGVlbGV2ZW50c1xuICAgICAgICAgKlxuICAgICAgICAgKiBUaGUgYmFzaWNzIGlzIHRoYXQgaXQgaW5jbHVkZXMgYSB1bml0LCBkZWx0YU1vZGUgKHBpeGVscywgbGluZXMsIHBhZ2VzKSwgYW5kXG4gICAgICAgICAqIGRlbHRhWCwgZGVsdGFZIGFuZCBkZWx0YVouICBTb21lIGJyb3dzZXJzIHByb3ZpZGUgb3RoZXIgdmFsdWVzIHRvIG1haW50YWluXG4gICAgICAgICAqIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgd2l0aCBvbGRlciBldmVudHMuICBUaG9zZSBvdGhlciB2YWx1ZXMgaGVscCB1c1xuICAgICAgICAgKiBiZXR0ZXIgbm9ybWFsaXplIHNwaW4gc3BlZWQuICBFeGFtcGxlIG9mIHdoYXQgdGhlIGJyb3dzZXJzIHByb3ZpZGU6XG4gICAgICAgICAqXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICB8IGV2ZW50LndoZWVsRGVsdGEgfCBldmVudC5kZXRhaWxcbiAgICAgICAgICogICAgICAgIC0tLS0tLS0tLS0tLS0tLS0tLSstLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLS0tLS1cbiAgICAgICAgICogICAgICAgICAgU2FmYXJpIHY1L09TIFggIHwgICAgICAgLTEyMCAgICAgICB8ICAgICAgIDBcbiAgICAgICAgICogICAgICAgICAgU2FmYXJpIHY1L1dpbjcgIHwgICAgICAgLTEyMCAgICAgICB8ICAgICAgIDBcbiAgICAgICAgICogICAgICAgICBDaHJvbWUgdjE3L09TIFggIHwgICAgICAgLTEyMCAgICAgICB8ICAgICAgIDBcbiAgICAgICAgICogICAgICAgICBDaHJvbWUgdjE3L1dpbjcgIHwgICAgICAgLTEyMCAgICAgICB8ICAgICAgIDBcbiAgICAgICAgICogICAgICAgICAgICAgICAgSUU5L1dpbjcgIHwgICAgICAgLTEyMCAgICAgICB8ICAgdW5kZWZpbmVkXG4gICAgICAgICAqICAgICAgICAgRmlyZWZveCB2NC9PUyBYICB8ICAgICB1bmRlZmluZWQgICAgfCAgICAgICAxXG4gICAgICAgICAqICAgICAgICAgRmlyZWZveCB2NC9XaW43ICB8ICAgICB1bmRlZmluZWQgICAgfCAgICAgICAzXG4gICAgICAgICAqXG4gICAgICAgICAqL1xuICAgICAgICBmdW5jdGlvbiBub3JtYWxpemVXaGVlbCggLypvYmplY3QqLyBldmVudCApIC8qb2JqZWN0Ki8ge1xuICAgICAgICAgICAgLy8gUmVhc29uYWJsZSBkZWZhdWx0c1xuICAgICAgICAgICAgdmFyIFBJWEVMX1NURVAgPSAxMDtcbiAgICAgICAgICAgIHZhciBMSU5FX0hFSUdIVCA9IDQwO1xuICAgICAgICAgICAgdmFyIFBBR0VfSEVJR0hUID0gODAwO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBzWCA9IDAsIHNZID0gMCwgICAgICAgLy8gc3BpblgsIHNwaW5ZXG4gICAgICAgICAgICAgICAgcFggPSAwLCBwWSA9IDA7ICAgICAgIC8vIHBpeGVsWCwgcGl4ZWxZXG4gICAgICAgIFxuICAgICAgICAgICAgLy8gTGVnYWN5XG4gICAgICAgICAgICBpZiggJ2RldGFpbCcgaW4gZXZlbnQgKSB7XG4gICAgICAgICAgICAgICAgc1kgPSBldmVudC5kZXRhaWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggJ3doZWVsRGVsdGEnIGluIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIHNZID0gLWV2ZW50LndoZWVsRGVsdGEgLyAxMjA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggJ3doZWVsRGVsdGFZJyBpbiBldmVudCApIHtcbiAgICAgICAgICAgICAgICBzWSA9IC1ldmVudC53aGVlbERlbHRhWSAvIDEyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKCAnd2hlZWxEZWx0YVgnIGluIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIHNYID0gLWV2ZW50LndoZWVsRGVsdGFYIC8gMTIwO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIHNpZGUgc2Nyb2xsaW5nIG9uIEZGIHdpdGggRE9NTW91c2VTY3JvbGxcbiAgICAgICAgICAgIGlmKCAnYXhpcycgaW4gZXZlbnQgJiYgZXZlbnQuYXhpcyA9PT0gZXZlbnQuSE9SSVpPTlRBTF9BWElTICkge1xuICAgICAgICAgICAgICAgIHNYID0gc1k7XG4gICAgICAgICAgICAgICAgc1kgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIHBYID0gc1ggKiBQSVhFTF9TVEVQO1xuICAgICAgICAgICAgcFkgPSBzWSAqIFBJWEVMX1NURVA7XG4gICAgICAgIFxuICAgICAgICAgICAgaWYoICdkZWx0YVknIGluIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIHBZID0gZXZlbnQuZGVsdGFZO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoICdkZWx0YVgnIGluIGV2ZW50ICkge1xuICAgICAgICAgICAgICAgIHBYID0gZXZlbnQuZGVsdGFYO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmKCAocFggfHwgcFkpICYmIGV2ZW50LmRlbHRhTW9kZSApIHtcbiAgICAgICAgICAgICAgICBpZiggZXZlbnQuZGVsdGFNb2RlID09PSAxICkgeyAgICAgICAgICAvLyBkZWx0YSBpbiBMSU5FIHVuaXRzXG4gICAgICAgICAgICAgICAgICAgIHBYICo9IExJTkVfSEVJR0hUO1xuICAgICAgICAgICAgICAgICAgICBwWSAqPSBMSU5FX0hFSUdIVDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGVsdGEgaW4gUEFHRSB1bml0c1xuICAgICAgICAgICAgICAgICAgICBwWCAqPSBQQUdFX0hFSUdIVDtcbiAgICAgICAgICAgICAgICAgICAgcFkgKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEZhbGwtYmFjayBpZiBzcGluIGNhbm5vdCBiZSBkZXRlcm1pbmVkXG4gICAgICAgICAgICBpZiggcFggJiYgIXNYICkge1xuICAgICAgICAgICAgICAgIHNYID0gKHBYIDwgMSkgPyAtMSA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiggcFkgJiYgIXNZICkge1xuICAgICAgICAgICAgICAgIHNZID0gKHBZIDwgMSkgPyAtMSA6IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzcGluWDogc1gsXG4gICAgICAgICAgICAgICAgc3Bpblk6IHNZLFxuICAgICAgICAgICAgICAgIHBpeGVsWDogcFgsXG4gICAgICAgICAgICAgICAgcGl4ZWxZOiBwWVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbENvbnRyb2wpIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogVGhlIGJlc3QgY29tYmluYXRpb24gaWYgeW91IHByZWZlciBzcGluWCArIHNwaW5ZIG5vcm1hbGl6YXRpb24uICBJdCBmYXZvcnNcbiAgICAgICAgICAgICAqIHRoZSBvbGRlciBET01Nb3VzZVNjcm9sbCBmb3IgRmlyZWZveCwgYXMgRkYgZG9lcyBub3QgaW5jbHVkZSB3aGVlbERlbHRhIHdpdGhcbiAgICAgICAgICAgICAqICd3aGVlbCcgZXZlbnQsIG1ha2luZyBzcGluIHNwZWVkIGRldGVybWluYXRpb24gaW1wb3NzaWJsZS5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgcy5tb3VzZXdoZWVsLmV2ZW50ID0gKG5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignZmlyZWZveCcpID4gLTEpID9cbiAgICAgICAgICAgICAgICAnRE9NTW91c2VTY3JvbGwnIDpcbiAgICAgICAgICAgICAgICBpc0V2ZW50U3VwcG9ydGVkKCkgP1xuICAgICAgICAgICAgICAgICAgICAnd2hlZWwnIDogJ21vdXNld2hlZWwnO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZU1vdXNld2hlZWwoZSkge1xuICAgICAgICAgICAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDsgLy9qcXVlcnkgZml4XG4gICAgICAgICAgICB2YXIgZGVsdGEgPSAwO1xuICAgICAgICAgICAgdmFyIHJ0bEZhY3RvciA9IHMucnRsID8gLTEgOiAxO1xuICAgICAgICBcbiAgICAgICAgICAgIHZhciBkYXRhID0gbm9ybWFsaXplV2hlZWwoIGUgKTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubW91c2V3aGVlbEZvcmNlVG9BeGlzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSkgZGVsdGEgPSBkYXRhLnBpeGVsWCAqIHJ0bEZhY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoZGF0YS5waXhlbFkpID4gTWF0aC5hYnMoZGF0YS5waXhlbFgpKSBkZWx0YSA9IGRhdGEucGl4ZWxZO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZWx0YSA9IE1hdGguYWJzKGRhdGEucGl4ZWxYKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxZKSA/IC0gZGF0YS5waXhlbFggKiBydGxGYWN0b3IgOiAtIGRhdGEucGl4ZWxZO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmIChkZWx0YSA9PT0gMCkgcmV0dXJuO1xuICAgICAgICBcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsSW52ZXJ0KSBkZWx0YSA9IC1kZWx0YTtcbiAgICAgICAgXG4gICAgICAgICAgICBpZiAoIXMucGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICAgICAgICAgICAgaWYgKChuZXcgd2luZG93LkRhdGUoKSkuZ2V0VGltZSgpIC0gcy5tb3VzZXdoZWVsLmxhc3RTY3JvbGxUaW1lID4gNjApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRlbHRhIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCghcy5pc0VuZCB8fCBzLnBhcmFtcy5sb29wKSAmJiAhcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuZW1pdCgnb25TY3JvbGwnLCBzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHMucGFyYW1zLm1vdXNld2hlZWxSZWxlYXNlT25FZGdlcykgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoKCFzLmlzQmVnaW5uaW5nIHx8IHMucGFyYW1zLmxvb3ApICYmICFzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVQcmV2KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy5lbWl0KCdvblNjcm9sbCcsIHMsIGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAocy5wYXJhbXMubW91c2V3aGVlbFJlbGVhc2VPbkVkZ2VzKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWUgPSAobmV3IHdpbmRvdy5EYXRlKCkpLmdldFRpbWUoKTtcbiAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL0ZyZWVtb2RlIG9yIHNjcm9sbENvbnRhaW5lcjpcbiAgICAgICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBzLmdldFdyYXBwZXJUcmFuc2xhdGUoKSArIGRlbHRhICogcy5wYXJhbXMubW91c2V3aGVlbFNlbnNpdGl2aXR5O1xuICAgICAgICAgICAgICAgIHZhciB3YXNCZWdpbm5pbmcgPSBzLmlzQmVnaW5uaW5nLFxuICAgICAgICAgICAgICAgICAgICB3YXNFbmQgPSBzLmlzRW5kO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24gPj0gcy5taW5UcmFuc2xhdGUoKSkgcG9zaXRpb24gPSBzLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbiA8PSBzLm1heFRyYW5zbGF0ZSgpKSBwb3NpdGlvbiA9IHMubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHMuc2V0V3JhcHBlclRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgcy5zZXRXcmFwcGVyVHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICBzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgcy51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoIXdhc0JlZ2lubmluZyAmJiBzLmlzQmVnaW5uaW5nIHx8ICF3YXNFbmQgJiYgcy5pc0VuZCkge1xuICAgICAgICAgICAgICAgICAgICBzLnVwZGF0ZUNsYXNzZXMoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChzLnBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQocy5tb3VzZXdoZWVsLnRpbWVvdXQpO1xuICAgICAgICAgICAgICAgICAgICBzLm1vdXNld2hlZWwudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZVJlc2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMubGF6eUxvYWRpbmcgJiYgcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmxhenkubG9hZCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIEVtaXQgZXZlbnRcbiAgICAgICAgICAgICAgICBzLmVtaXQoJ29uU2Nyb2xsJywgcywgZSk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIC8vIFN0b3AgYXV0b3BsYXlcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuYXV0b3BsYXkgJiYgcy5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikgcy5zdG9wQXV0b3BsYXkoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy8gUmV0dXJuIHBhZ2Ugc2Nyb2xsIG9uIGVkZ2UgcG9zaXRpb25zXG4gICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uID09PSAwIHx8IHBvc2l0aW9uID09PSBzLm1heFRyYW5zbGF0ZSgpKSByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGVsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHMuZGlzYWJsZU1vdXNld2hlZWxDb250cm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzLm1vdXNld2hlZWwuZXZlbnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsRXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQocy5wYXJhbXMubW91c2V3aGVlbEV2ZW50c1RhcmdlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQub2ZmKHMubW91c2V3aGVlbC5ldmVudCwgaGFuZGxlTW91c2V3aGVlbCk7XG4gICAgICAgICAgICBzLnBhcmFtcy5tb3VzZXdoZWVsQ29udHJvbCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLmVuYWJsZU1vdXNld2hlZWxDb250cm9sID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFzLm1vdXNld2hlZWwuZXZlbnQpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsRXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xuICAgICAgICAgICAgICAgIHRhcmdldCA9ICQocy5wYXJhbXMubW91c2V3aGVlbEV2ZW50c1RhcmdlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXQub24ocy5tb3VzZXdoZWVsLmV2ZW50LCBoYW5kbGVNb3VzZXdoZWVsKTtcbiAgICAgICAgICAgIHMucGFyYW1zLm1vdXNld2hlZWxDb250cm9sID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBQYXJhbGxheFxuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGZ1bmN0aW9uIHNldFBhcmFsbGF4VHJhbnNmb3JtKGVsLCBwcm9ncmVzcykge1xuICAgICAgICAgICAgZWwgPSAkKGVsKTtcbiAgICAgICAgICAgIHZhciBwLCBwWCwgcFk7XG4gICAgICAgICAgICB2YXIgcnRsRmFjdG9yID0gcy5ydGwgPyAtMSA6IDE7XG4gICAgICAgIFxuICAgICAgICAgICAgcCA9IGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4JykgfHwgJzAnO1xuICAgICAgICAgICAgcFggPSBlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC14Jyk7XG4gICAgICAgICAgICBwWSA9IGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXknKTtcbiAgICAgICAgICAgIGlmIChwWCB8fCBwWSkge1xuICAgICAgICAgICAgICAgIHBYID0gcFggfHwgJzAnO1xuICAgICAgICAgICAgICAgIHBZID0gcFkgfHwgJzAnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcFggPSBwO1xuICAgICAgICAgICAgICAgICAgICBwWSA9ICcwJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBZID0gcDtcbiAgICAgICAgICAgICAgICAgICAgcFggPSAnMCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIGlmICgocFgpLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcFggPSBwYXJzZUludChwWCwgMTApICogcHJvZ3Jlc3MgKiBydGxGYWN0b3IgKyAnJSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwWCA9IHBYICogcHJvZ3Jlc3MgKiBydGxGYWN0b3IgKyAncHgnIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgocFkpLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgcFkgPSBwYXJzZUludChwWSwgMTApICogcHJvZ3Jlc3MgKyAnJSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBwWSA9IHBZICogcHJvZ3Jlc3MgKyAncHgnIDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICBlbC50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKCcgKyBwWCArICcsICcgKyBwWSArICcsMHB4KScpO1xuICAgICAgICB9XG4gICAgICAgIHMucGFyYWxsYXggPSB7XG4gICAgICAgICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzLmNvbnRhaW5lci5jaGlsZHJlbignW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgIHNldFBhcmFsbGF4VHJhbnNmb3JtKHRoaXMsIHMucHJvZ3Jlc3MpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBzLnNsaWRlcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNsaWRlID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGUuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHNsaWRlWzBdLnByb2dyZXNzLCAtMSksIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgc2V0UGFyYWxsYXhUcmFuc2Zvcm0odGhpcywgcHJvZ3Jlc3MpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGR1cmF0aW9uID09PSAndW5kZWZpbmVkJykgZHVyYXRpb24gPSBzLnBhcmFtcy5zcGVlZDtcbiAgICAgICAgICAgICAgICBzLmNvbnRhaW5lci5maW5kKCdbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gJCh0aGlzKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmFsbGF4RHVyYXRpb24gPSBwYXJzZUludChlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1kdXJhdGlvbicpLCAxMCkgfHwgZHVyYXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmIChkdXJhdGlvbiA9PT0gMCkgcGFyYWxsYXhEdXJhdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGVsLnRyYW5zaXRpb24ocGFyYWxsYXhEdXJhdGlvbik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFpvb21cbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLnpvb20gPSB7XG4gICAgICAgICAgICAvLyBcIkdsb2JhbFwiIFByb3BzXG4gICAgICAgICAgICBzY2FsZTogMSxcbiAgICAgICAgICAgIGN1cnJlbnRTY2FsZTogMSxcbiAgICAgICAgICAgIGlzU2NhbGluZzogZmFsc2UsXG4gICAgICAgICAgICBnZXN0dXJlOiB7XG4gICAgICAgICAgICAgICAgc2xpZGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBzbGlkZVdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc2xpZGVIZWlnaHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBpbWFnZTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGltYWdlV3JhcDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHpvb21NYXg6IHMucGFyYW1zLnpvb21NYXhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgICAgIGlzVG91Y2hlZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGlzTW92ZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBjdXJyZW50WDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRZOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgbWluWDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIG1pblk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBtYXhYOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgbWF4WTogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHdpZHRoOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc3RhcnRYOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgc3RhcnRZOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdG91Y2hlc1N0YXJ0OiB7fSxcbiAgICAgICAgICAgICAgICB0b3VjaGVzQ3VycmVudDoge31cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2ZWxvY2l0eToge1xuICAgICAgICAgICAgICAgIHg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB5OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgcHJldlBvc2l0aW9uWDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByZXZQb3NpdGlvblk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBwcmV2VGltZTogdW5kZWZpbmVkXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gQ2FsYyBTY2FsZSBGcm9tIE11bHRpLXRvdWNoZXNcbiAgICAgICAgICAgIGdldERpc3RhbmNlQmV0d2VlblRvdWNoZXM6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICB2YXIgeDEgPSBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVgsXG4gICAgICAgICAgICAgICAgICAgIHkxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZLFxuICAgICAgICAgICAgICAgICAgICB4MiA9IGUudGFyZ2V0VG91Y2hlc1sxXS5wYWdlWCxcbiAgICAgICAgICAgICAgICAgICAgeTIgPSBlLnRhcmdldFRvdWNoZXNbMV0ucGFnZVk7XG4gICAgICAgICAgICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KE1hdGgucG93KHgyIC0geDEsIDIpICsgTWF0aC5wb3coeTIgLSB5MSwgMikpO1xuICAgICAgICAgICAgICAgIHJldHVybiBkaXN0YW5jZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBFdmVudHNcbiAgICAgICAgICAgIG9uR2VzdHVyZVN0YXJ0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghcy5zdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zY2FsZVN0YXJ0ID0gei5nZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5zbGlkZSB8fCAhei5nZXN0dXJlLnNsaWRlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2xpZGUgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoei5nZXN0dXJlLnNsaWRlLmxlbmd0aCA9PT0gMCkgei5nZXN0dXJlLnNsaWRlID0gcy5zbGlkZXMuZXEocy5hY3RpdmVJbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZSA9IHouZ2VzdHVyZS5zbGlkZS5maW5kKCdpbWcsIHN2ZywgY2FudmFzJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAgPSB6Lmdlc3R1cmUuaW1hZ2UucGFyZW50KCcuJyArIHMucGFyYW1zLnpvb21Db250YWluZXJDbGFzcyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS56b29tTWF4ID0gei5nZXN0dXJlLmltYWdlV3JhcC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcy5wYXJhbXMuem9vbU1heCA7XG4gICAgICAgICAgICAgICAgICAgIGlmICh6Lmdlc3R1cmUuaW1hZ2VXcmFwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZS50cmFuc2l0aW9uKDApO1xuICAgICAgICAgICAgICAgIHouaXNTY2FsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkdlc3R1cmVDaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCFzLnN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNobW92ZScgfHwgZS50eXBlID09PSAndG91Y2htb3ZlJyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zY2FsZU1vdmUgPSB6LmdldERpc3RhbmNlQmV0d2VlblRvdWNoZXMoZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLmltYWdlIHx8IHouZ2VzdHVyZS5pbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAocy5zdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHouc2NhbGUgPSBlLnNjYWxlICogei5jdXJyZW50U2NhbGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gKHouZ2VzdHVyZS5zY2FsZU1vdmUgLyB6Lmdlc3R1cmUuc2NhbGVTdGFydCkgKiB6LmN1cnJlbnRTY2FsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHouc2NhbGUgPiB6Lmdlc3R1cmUuem9vbU1heCkge1xuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gei5nZXN0dXJlLnpvb21NYXggLSAxICsgTWF0aC5wb3coKHouc2NhbGUgLSB6Lmdlc3R1cmUuem9vbU1heCArIDEpLCAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoei5zY2FsZSA8IHMucGFyYW1zLnpvb21NaW4pIHtcbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9ICBzLnBhcmFtcy56b29tTWluICsgMSAtIE1hdGgucG93KChzLnBhcmFtcy56b29tTWluIC0gei5zY2FsZSArIDEpLCAwLjUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJyArIHouc2NhbGUgKyAnKScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uR2VzdHVyZUVuZDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXMuc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hlbmQnIHx8IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyAmJiBlLmNoYW5nZWRUb3VjaGVzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5pbWFnZSB8fCB6Lmdlc3R1cmUuaW1hZ2UubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgei5zY2FsZSA9IE1hdGgubWF4KE1hdGgubWluKHouc2NhbGUsIHouZ2VzdHVyZS56b29tTWF4KSwgcy5wYXJhbXMuem9vbU1pbik7XG4gICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlLnRyYW5zaXRpb24ocy5wYXJhbXMuc3BlZWQpLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKCcgKyB6LnNjYWxlICsgJyknKTtcbiAgICAgICAgICAgICAgICB6LmN1cnJlbnRTY2FsZSA9IHouc2NhbGU7XG4gICAgICAgICAgICAgICAgei5pc1NjYWxpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoei5zY2FsZSA9PT0gMSkgei5nZXN0dXJlLnNsaWRlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hTdGFydDogZnVuY3Rpb24gKHMsIGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgeiA9IHMuem9vbTtcbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5pbWFnZSB8fCB6Lmdlc3R1cmUuaW1hZ2UubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHouaW1hZ2UuaXNUb3VjaGVkKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKHMuZGV2aWNlLm9zID09PSAnYW5kcm9pZCcpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgei5pbWFnZS50b3VjaGVzU3RhcnQueCA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgICB6LmltYWdlLnRvdWNoZXNTdGFydC55ID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLmltYWdlIHx8IHouZ2VzdHVyZS5pbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBzLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoIXouaW1hZ2UuaXNUb3VjaGVkIHx8ICF6Lmdlc3R1cmUuc2xpZGUpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCF6LmltYWdlLmlzTW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS53aWR0aCA9IHouZ2VzdHVyZS5pbWFnZVswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5oZWlnaHQgPSB6Lmdlc3R1cmUuaW1hZ2VbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB6LmltYWdlLnN0YXJ0WCA9IHMuZ2V0VHJhbnNsYXRlKHouZ2VzdHVyZS5pbWFnZVdyYXBbMF0sICd4JykgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5zdGFydFkgPSBzLmdldFRyYW5zbGF0ZSh6Lmdlc3R1cmUuaW1hZ2VXcmFwWzBdLCAneScpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zbGlkZVdpZHRoID0gei5nZXN0dXJlLnNsaWRlWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuc2xpZGVIZWlnaHQgPSB6Lmdlc3R1cmUuc2xpZGVbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwLnRyYW5zaXRpb24oMCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkgei5pbWFnZS5zdGFydFggPSAtei5pbWFnZS5zdGFydFg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzLnJ0bCkgei5pbWFnZS5zdGFydFkgPSAtei5pbWFnZS5zdGFydFk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIERlZmluZSBpZiB3ZSBuZWVkIGltYWdlIGRyYWdcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGVkV2lkdGggPSB6LmltYWdlLndpZHRoICogei5zY2FsZTtcbiAgICAgICAgICAgICAgICB2YXIgc2NhbGVkSGVpZ2h0ID0gei5pbWFnZS5oZWlnaHQgKiB6LnNjYWxlO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAoc2NhbGVkV2lkdGggPCB6Lmdlc3R1cmUuc2xpZGVXaWR0aCAmJiBzY2FsZWRIZWlnaHQgPCB6Lmdlc3R1cmUuc2xpZGVIZWlnaHQpIHJldHVybjtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgei5pbWFnZS5taW5YID0gTWF0aC5taW4oKHouZ2VzdHVyZS5zbGlkZVdpZHRoIC8gMiAtIHNjYWxlZFdpZHRoIC8gMiksIDApO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UubWF4WCA9IC16LmltYWdlLm1pblg7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5taW5ZID0gTWF0aC5taW4oKHouZ2VzdHVyZS5zbGlkZUhlaWdodCAvIDIgLSBzY2FsZWRIZWlnaHQgLyAyKSwgMCk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5tYXhZID0gLXouaW1hZ2UubWluWTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgei5pbWFnZS50b3VjaGVzQ3VycmVudC54ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICAgICAgICAgICAgei5pbWFnZS50b3VjaGVzQ3VycmVudC55ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICghei5pbWFnZS5pc01vdmVkICYmICF6LmlzU2NhbGluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5pc0hvcml6b250YWwoKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKE1hdGguZmxvb3Ioei5pbWFnZS5taW5YKSA9PT0gTWF0aC5mbG9vcih6LmltYWdlLnN0YXJ0WCkgJiYgei5pbWFnZS50b3VjaGVzQ3VycmVudC54IDwgei5pbWFnZS50b3VjaGVzU3RhcnQueCkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKHouaW1hZ2UubWF4WCkgPT09IE1hdGguZmxvb3Ioei5pbWFnZS5zdGFydFgpICYmIHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA+IHouaW1hZ2UudG91Y2hlc1N0YXJ0LngpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHouaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoIXMuaXNIb3Jpem9udGFsKCkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgIChNYXRoLmZsb29yKHouaW1hZ2UubWluWSkgPT09IE1hdGguZmxvb3Ioei5pbWFnZS5zdGFydFkpICYmIHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA8IHouaW1hZ2UudG91Y2hlc1N0YXJ0LnkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoTWF0aC5mbG9vcih6LmltYWdlLm1heFkpID09PSBNYXRoLmZsb29yKHouaW1hZ2Uuc3RhcnRZKSAmJiB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnkgPiB6LmltYWdlLnRvdWNoZXNTdGFydC55KVxuICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB6LmltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB6LmltYWdlLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFggPSB6LmltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB6LmltYWdlLnRvdWNoZXNTdGFydC54ICsgei5pbWFnZS5zdGFydFg7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WSA9IHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIHouaW1hZ2UudG91Y2hlc1N0YXJ0LnkgKyB6LmltYWdlLnN0YXJ0WTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHouaW1hZ2UuY3VycmVudFggPCB6LmltYWdlLm1pblgpIHtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WCA9ICB6LmltYWdlLm1pblggKyAxIC0gTWF0aC5wb3coKHouaW1hZ2UubWluWCAtIHouaW1hZ2UuY3VycmVudFggKyAxKSwgMC44KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHouaW1hZ2UuY3VycmVudFggPiB6LmltYWdlLm1heFgpIHtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WCA9IHouaW1hZ2UubWF4WCAtIDEgKyBNYXRoLnBvdygoei5pbWFnZS5jdXJyZW50WCAtIHouaW1hZ2UubWF4WCArIDEpLCAwLjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHouaW1hZ2UuY3VycmVudFkgPCB6LmltYWdlLm1pblkpIHtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WSA9ICB6LmltYWdlLm1pblkgKyAxIC0gTWF0aC5wb3coKHouaW1hZ2UubWluWSAtIHouaW1hZ2UuY3VycmVudFkgKyAxKSwgMC44KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHouaW1hZ2UuY3VycmVudFkgPiB6LmltYWdlLm1heFkpIHtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WSA9IHouaW1hZ2UubWF4WSAtIDEgKyBNYXRoLnBvdygoei5pbWFnZS5jdXJyZW50WSAtIHouaW1hZ2UubWF4WSArIDEpLCAwLjgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9WZWxvY2l0eVxuICAgICAgICAgICAgICAgIGlmICghei52ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblggPSB6LmltYWdlLnRvdWNoZXNDdXJyZW50Lng7XG4gICAgICAgICAgICAgICAgaWYgKCF6LnZlbG9jaXR5LnByZXZQb3NpdGlvblkpIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWSA9IHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueTtcbiAgICAgICAgICAgICAgICBpZiAoIXoudmVsb2NpdHkucHJldlRpbWUpIHoudmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgIHoudmVsb2NpdHkueCA9ICh6LmltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblgpIC8gKERhdGUubm93KCkgLSB6LnZlbG9jaXR5LnByZXZUaW1lKSAvIDI7XG4gICAgICAgICAgICAgICAgei52ZWxvY2l0eS55ID0gKHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWSkgLyAoRGF0ZS5ub3coKSAtIHoudmVsb2NpdHkucHJldlRpbWUpIC8gMjtcbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMoei5pbWFnZS50b3VjaGVzQ3VycmVudC54IC0gei52ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSA8IDIpIHoudmVsb2NpdHkueCA9IDA7XG4gICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWSkgPCAyKSB6LnZlbG9jaXR5LnkgPSAwO1xuICAgICAgICAgICAgICAgIHoudmVsb2NpdHkucHJldlBvc2l0aW9uWCA9IHouaW1hZ2UudG91Y2hlc0N1cnJlbnQueDtcbiAgICAgICAgICAgICAgICB6LnZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSB6LmltYWdlLnRvdWNoZXNDdXJyZW50Lnk7XG4gICAgICAgICAgICAgICAgei52ZWxvY2l0eS5wcmV2VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgei5pbWFnZS5jdXJyZW50WCArICdweCwgJyArIHouaW1hZ2UuY3VycmVudFkgKyAncHgsMCknKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRvdWNoRW5kOiBmdW5jdGlvbiAocywgZSkge1xuICAgICAgICAgICAgICAgIHZhciB6ID0gcy56b29tO1xuICAgICAgICAgICAgICAgIGlmICghei5nZXN0dXJlLmltYWdlIHx8IHouZ2VzdHVyZS5pbWFnZS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAoIXouaW1hZ2UuaXNUb3VjaGVkIHx8ICF6LmltYWdlLmlzTW92ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgei5pbWFnZS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgei5pbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbW9tZW50dW1EdXJhdGlvblggPSAzMDA7XG4gICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb25ZID0gMzAwO1xuICAgICAgICAgICAgICAgIHZhciBtb21lbnR1bURpc3RhbmNlWCA9IHoudmVsb2NpdHkueCAqIG1vbWVudHVtRHVyYXRpb25YO1xuICAgICAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvblggPSB6LmltYWdlLmN1cnJlbnRYICsgbW9tZW50dW1EaXN0YW5jZVg7XG4gICAgICAgICAgICAgICAgdmFyIG1vbWVudHVtRGlzdGFuY2VZID0gei52ZWxvY2l0eS55ICogbW9tZW50dW1EdXJhdGlvblk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uWSA9IHouaW1hZ2UuY3VycmVudFkgKyBtb21lbnR1bURpc3RhbmNlWTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgLy9GaXggZHVyYXRpb25cbiAgICAgICAgICAgICAgICBpZiAoei52ZWxvY2l0eS54ICE9PSAwKSBtb21lbnR1bUR1cmF0aW9uWCA9IE1hdGguYWJzKChuZXdQb3NpdGlvblggLSB6LmltYWdlLmN1cnJlbnRYKSAvIHoudmVsb2NpdHkueCk7XG4gICAgICAgICAgICAgICAgaWYgKHoudmVsb2NpdHkueSAhPT0gMCkgbW9tZW50dW1EdXJhdGlvblkgPSBNYXRoLmFicygobmV3UG9zaXRpb25ZIC0gei5pbWFnZS5jdXJyZW50WSkgLyB6LnZlbG9jaXR5LnkpO1xuICAgICAgICAgICAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5tYXgobW9tZW50dW1EdXJhdGlvblgsIG1vbWVudHVtRHVyYXRpb25ZKTtcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgei5pbWFnZS5jdXJyZW50WCA9IG5ld1Bvc2l0aW9uWDtcbiAgICAgICAgICAgICAgICB6LmltYWdlLmN1cnJlbnRZID0gbmV3UG9zaXRpb25ZO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAvLyBEZWZpbmUgaWYgd2UgbmVlZCBpbWFnZSBkcmFnXG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlZFdpZHRoID0gei5pbWFnZS53aWR0aCAqIHouc2NhbGU7XG4gICAgICAgICAgICAgICAgdmFyIHNjYWxlZEhlaWdodCA9IHouaW1hZ2UuaGVpZ2h0ICogei5zY2FsZTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1pblggPSBNYXRoLm1pbigoei5nZXN0dXJlLnNsaWRlV2lkdGggLyAyIC0gc2NhbGVkV2lkdGggLyAyKSwgMCk7XG4gICAgICAgICAgICAgICAgei5pbWFnZS5tYXhYID0gLXouaW1hZ2UubWluWDtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1pblkgPSBNYXRoLm1pbigoei5nZXN0dXJlLnNsaWRlSGVpZ2h0IC8gMiAtIHNjYWxlZEhlaWdodCAvIDIpLCAwKTtcbiAgICAgICAgICAgICAgICB6LmltYWdlLm1heFkgPSAtei5pbWFnZS5taW5ZO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFggPSBNYXRoLm1heChNYXRoLm1pbih6LmltYWdlLmN1cnJlbnRYLCB6LmltYWdlLm1heFgpLCB6LmltYWdlLm1pblgpO1xuICAgICAgICAgICAgICAgIHouaW1hZ2UuY3VycmVudFkgPSBNYXRoLm1heChNYXRoLm1pbih6LmltYWdlLmN1cnJlbnRZLCB6LmltYWdlLm1heFkpLCB6LmltYWdlLm1pblkpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwLnRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbikudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgnICsgei5pbWFnZS5jdXJyZW50WCArICdweCwgJyArIHouaW1hZ2UuY3VycmVudFkgKyAncHgsMCknKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIChzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKHouZ2VzdHVyZS5zbGlkZSAmJiBzLnByZXZpb3VzSW5kZXggIT09IHMuYWN0aXZlSW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLmltYWdlLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCknKTtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNsaWRlID0gei5nZXN0dXJlLmltYWdlID0gei5nZXN0dXJlLmltYWdlV3JhcCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9IHouY3VycmVudFNjYWxlID0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gVG9nZ2xlIFpvb21cbiAgICAgICAgICAgIHRvZ2dsZVpvb206IGZ1bmN0aW9uIChzLCBlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHogPSBzLnpvb207XG4gICAgICAgICAgICAgICAgaWYgKCF6Lmdlc3R1cmUuc2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgei5nZXN0dXJlLnNsaWRlID0gcy5jbGlja2VkU2xpZGUgPyAkKHMuY2xpY2tlZFNsaWRlKSA6IHMuc2xpZGVzLmVxKHMuYWN0aXZlSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UgPSB6Lmdlc3R1cmUuc2xpZGUuZmluZCgnaW1nLCBzdmcsIGNhbnZhcycpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwID0gei5nZXN0dXJlLmltYWdlLnBhcmVudCgnLicgKyBzLnBhcmFtcy56b29tQ29udGFpbmVyQ2xhc3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXouZ2VzdHVyZS5pbWFnZSB8fCB6Lmdlc3R1cmUuaW1hZ2UubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIHZhciB0b3VjaFgsIHRvdWNoWSwgb2Zmc2V0WCwgb2Zmc2V0WSwgZGlmZlgsIGRpZmZZLCB0cmFuc2xhdGVYLCB0cmFuc2xhdGVZLCBpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCwgc2NhbGVkV2lkdGgsIHNjYWxlZEhlaWdodCwgdHJhbnNsYXRlTWluWCwgdHJhbnNsYXRlTWluWSwgdHJhbnNsYXRlTWF4WCwgdHJhbnNsYXRlTWF4WSwgc2xpZGVXaWR0aCwgc2xpZGVIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygei5pbWFnZS50b3VjaGVzU3RhcnQueCA9PT0gJ3VuZGVmaW5lZCcgJiYgZSkge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFggPSBlLnR5cGUgPT09ICd0b3VjaGVuZCcgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgICAgICAgICAgICAgdG91Y2hZID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFggPSB6LmltYWdlLnRvdWNoZXNTdGFydC54O1xuICAgICAgICAgICAgICAgICAgICB0b3VjaFkgPSB6LmltYWdlLnRvdWNoZXNTdGFydC55O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHouc2NhbGUgJiYgei5zY2FsZSAhPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBab29tIE91dFxuICAgICAgICAgICAgICAgICAgICB6LnNjYWxlID0gei5jdXJyZW50U2NhbGUgPSAxO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2VXcmFwLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgICAgICAgICAgICAgICB6Lmdlc3R1cmUuaW1hZ2UudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5zbGlkZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFpvb20gSW5cbiAgICAgICAgICAgICAgICAgICAgei5zY2FsZSA9IHouY3VycmVudFNjYWxlID0gei5nZXN0dXJlLmltYWdlV3JhcC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcy5wYXJhbXMuem9vbU1heDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlV2lkdGggPSB6Lmdlc3R1cmUuc2xpZGVbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICBzbGlkZUhlaWdodCA9IHouZ2VzdHVyZS5zbGlkZVswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRYID0gei5nZXN0dXJlLnNsaWRlLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXRZID0gei5nZXN0dXJlLnNsaWRlLm9mZnNldCgpLnRvcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZYID0gb2Zmc2V0WCArIHNsaWRlV2lkdGgvMiAtIHRvdWNoWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpZmZZID0gb2Zmc2V0WSArIHNsaWRlSGVpZ2h0LzIgLSB0b3VjaFk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VXaWR0aCA9IHouZ2VzdHVyZS5pbWFnZVswXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0ID0gei5nZXN0dXJlLmltYWdlWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjYWxlZFdpZHRoID0gaW1hZ2VXaWR0aCAqIHouc2NhbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZWRIZWlnaHQgPSBpbWFnZUhlaWdodCAqIHouc2NhbGU7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlTWluWCA9IE1hdGgubWluKChzbGlkZVdpZHRoIC8gMiAtIHNjYWxlZFdpZHRoIC8gMiksIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlTWluWSA9IE1hdGgubWluKChzbGlkZUhlaWdodCAvIDIgLSBzY2FsZWRIZWlnaHQgLyAyKSwgMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVNYXhYID0gLXRyYW5zbGF0ZU1pblg7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVNYXhZID0gLXRyYW5zbGF0ZU1pblk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IGRpZmZYICogei5zY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSBkaWZmWSAqIHouc2NhbGU7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZVggPCB0cmFuc2xhdGVNaW5YKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9ICB0cmFuc2xhdGVNaW5YO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZVggPiB0cmFuc2xhdGVNYXhYKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWCA9IHRyYW5zbGF0ZU1heFg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZVkgPCB0cmFuc2xhdGVNaW5ZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWSA9ICB0cmFuc2xhdGVNaW5ZO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRyYW5zbGF0ZVkgPiB0cmFuc2xhdGVNYXhZKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlWSA9IHRyYW5zbGF0ZU1heFk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2xhdGVYID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZVkgPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZVdyYXAudHJhbnNpdGlvbigzMDApLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoJyArIHRyYW5zbGF0ZVggKyAncHgsICcgKyB0cmFuc2xhdGVZICsgJ3B4LDApJyk7XG4gICAgICAgICAgICAgICAgICAgIHouZ2VzdHVyZS5pbWFnZS50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoJyArIHouc2NhbGUgKyAnKScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBBdHRhY2gvRGV0YWNoIEV2ZW50c1xuICAgICAgICAgICAgYXR0YWNoRXZlbnRzOiBmdW5jdGlvbiAoZGV0YWNoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFjdGlvbiA9IGRldGFjaCA/ICdvZmYnIDogJ29uJztcbiAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnpvb20pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHMuc2xpZGVzO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFzc2l2ZUxpc3RlbmVyID0gcy50b3VjaEV2ZW50cy5zdGFydCA9PT0gJ3RvdWNoc3RhcnQnICYmIHMuc3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcy5wYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZX0gOiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2NhbGUgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuc3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbYWN0aW9uXSgnZ2VzdHVyZXN0YXJ0Jywgcy56b29tLm9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbYWN0aW9uXSgnZ2VzdHVyZWNoYW5nZScsIHMuem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1thY3Rpb25dKCdnZXN0dXJlZW5kJywgcy56b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChzLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuc2xpZGVzW2FjdGlvbl0ocy50b3VjaEV2ZW50cy5zdGFydCwgcy56b29tLm9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5zbGlkZXNbYWN0aW9uXShzLnRvdWNoRXZlbnRzLm1vdmUsIHMuem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnNsaWRlc1thY3Rpb25dKHMudG91Y2hFdmVudHMuZW5kLCBzLnpvb20ub25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAvLyBNb3ZlIGltYWdlXG4gICAgICAgICAgICAgICAgICAgIHNbYWN0aW9uXSgndG91Y2hTdGFydCcsIHMuem9vbS5vblRvdWNoU3RhcnQpO1xuICAgICAgICAgICAgICAgICAgICBzLnNsaWRlcy5lYWNoKGZ1bmN0aW9uIChpbmRleCwgc2xpZGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoc2xpZGUpLmZpbmQoJy4nICsgcy5wYXJhbXMuem9vbUNvbnRhaW5lckNsYXNzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJChzbGlkZSlbYWN0aW9uXShzLnRvdWNoRXZlbnRzLm1vdmUsIHMuem9vbS5vblRvdWNoTW92ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBzW2FjdGlvbl0oJ3RvdWNoRW5kJywgcy56b29tLm9uVG91Y2hFbmQpO1xuICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgLy8gU2NhbGUgT3V0XG4gICAgICAgICAgICAgICAgICAgIHNbYWN0aW9uXSgndHJhbnNpdGlvbkVuZCcsIHMuem9vbS5vblRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuem9vbVRvZ2dsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5vbignZG91YmxlVGFwJywgcy56b29tLnRvZ2dsZVpvb20pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzLnpvb20uYXR0YWNoRXZlbnRzKCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVzdHJveTogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHMuem9vbS5hdHRhY2hFdmVudHModHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIFBsdWdpbnMgQVBJLiBDb2xsZWN0IGFsbCBhbmQgaW5pdCBhbGwgcGx1Z2luc1xuICAgICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIHMuX3BsdWdpbnMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgcGx1Z2luIGluIHMucGx1Z2lucykge1xuICAgICAgICAgICAgdmFyIHAgPSBzLnBsdWdpbnNbcGx1Z2luXShzLCBzLnBhcmFtc1twbHVnaW5dKTtcbiAgICAgICAgICAgIGlmIChwKSBzLl9wbHVnaW5zLnB1c2gocCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gTWV0aG9kIHRvIGNhbGwgYWxsIHBsdWdpbnMgZXZlbnQvbWV0aG9kXG4gICAgICAgIHMuY2FsbFBsdWdpbnMgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHMuX3BsdWdpbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnROYW1lIGluIHMuX3BsdWdpbnNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcy5fcGx1Z2luc1tpXVtldmVudE5hbWVdKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSwgYXJndW1lbnRzWzVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIFxuXG4gICAgICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICAgIEV2ZW50cy9DYWxsYmFja3MvUGx1Z2lucyBFbWl0dGVyXG4gICAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICAgICAgZnVuY3Rpb24gbm9ybWFsaXplRXZlbnROYW1lIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIGlmIChldmVudE5hbWUuaW5kZXhPZignb24nKSAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChldmVudE5hbWVbMF0gIT09IGV2ZW50TmFtZVswXS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZSA9ICdvbicgKyBldmVudE5hbWVbMF0udG9VcHBlckNhc2UoKSArIGV2ZW50TmFtZS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWUgPSAnb24nICsgZXZlbnROYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBldmVudE5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnMgPSB7XG4gICAgICAgIFxuICAgICAgICB9O1xuICAgICAgICBzLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICAvLyBUcmlnZ2VyIGNhbGxiYWNrc1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zW2V2ZW50TmFtZV0pIHtcbiAgICAgICAgICAgICAgICBzLnBhcmFtc1tldmVudE5hbWVdKGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSwgYXJndW1lbnRzWzVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpO1xuICAgICAgICAgICAgLy8gVHJpZ2dlciBldmVudHNcbiAgICAgICAgICAgIGlmIChzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdKSB7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXVtpXShhcmd1bWVudHNbMV0sIGFyZ3VtZW50c1syXSwgYXJndW1lbnRzWzNdLCBhcmd1bWVudHNbNF0sIGFyZ3VtZW50c1s1XSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gVHJpZ2dlciBwbHVnaW5zXG4gICAgICAgICAgICBpZiAocy5jYWxsUGx1Z2lucykgcy5jYWxsUGx1Z2lucyhldmVudE5hbWUsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSwgYXJndW1lbnRzWzVdKTtcbiAgICAgICAgfTtcbiAgICAgICAgcy5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGhhbmRsZXIpIHtcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IG5vcm1hbGl6ZUV2ZW50TmFtZShldmVudE5hbWUpO1xuICAgICAgICAgICAgaWYgKCFzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdKSBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcik7XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcbiAgICAgICAgcy5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIGV2ZW50TmFtZSA9IG5vcm1hbGl6ZUV2ZW50TmFtZShldmVudE5hbWUpO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgaGFuZGxlcnMgZm9yIHN1Y2ggZXZlbnRcbiAgICAgICAgICAgICAgICBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdID0gW107XG4gICAgICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXMuZW1pdHRlckV2ZW50TGlzdGVuZXJzW2V2ZW50TmFtZV0gfHwgcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBzLmVtaXR0ZXJFdmVudExpc3RlbmVyc1tldmVudE5hbWVdLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYocy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXVtpXSA9PT0gaGFuZGxlcikgcy5lbWl0dGVyRXZlbnRMaXN0ZW5lcnNbZXZlbnROYW1lXS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfTtcbiAgICAgICAgcy5vbmNlID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgaGFuZGxlcikge1xuICAgICAgICAgICAgZXZlbnROYW1lID0gbm9ybWFsaXplRXZlbnROYW1lKGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB2YXIgX2hhbmRsZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlcihhcmd1bWVudHNbMF0sIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdLCBhcmd1bWVudHNbM10sIGFyZ3VtZW50c1s0XSk7XG4gICAgICAgICAgICAgICAgcy5vZmYoZXZlbnROYW1lLCBfaGFuZGxlcik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcy5vbihldmVudE5hbWUsIF9oYW5kbGVyKTtcbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvLyBBY2Nlc3NpYmlsaXR5IHRvb2xzXG4gICAgICAgIHMuYTExeSA9IHtcbiAgICAgICAgICAgIG1ha2VGb2N1c2FibGU6IGZ1bmN0aW9uICgkZWwpIHtcbiAgICAgICAgICAgICAgICAkZWwuYXR0cigndGFiSW5kZXgnLCAnMCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiAkZWw7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkUm9sZTogZnVuY3Rpb24gKCRlbCwgcm9sZSkge1xuICAgICAgICAgICAgICAgICRlbC5hdHRyKCdyb2xlJywgcm9sZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgYWRkTGFiZWw6IGZ1bmN0aW9uICgkZWwsIGxhYmVsKSB7XG4gICAgICAgICAgICAgICAgJGVsLmF0dHIoJ2FyaWEtbGFiZWwnLCBsYWJlbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgZGlzYWJsZTogZnVuY3Rpb24gKCRlbCkge1xuICAgICAgICAgICAgICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgZW5hYmxlOiBmdW5jdGlvbiAoJGVsKSB7XG4gICAgICAgICAgICAgICAgJGVsLmF0dHIoJ2FyaWEtZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRlbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIFxuICAgICAgICAgICAgb25FbnRlcktleTogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUgIT09IDEzKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcyhzLnBhcmFtcy5uZXh0QnV0dG9uKSkge1xuICAgICAgICAgICAgICAgICAgICBzLm9uQ2xpY2tOZXh0KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNFbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5ub3RpZnkocy5wYXJhbXMubGFzdFNsaWRlTWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLmExMXkubm90aWZ5KHMucGFyYW1zLm5leHRTbGlkZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKCQoZXZlbnQudGFyZ2V0KS5pcyhzLnBhcmFtcy5wcmV2QnV0dG9uKSkge1xuICAgICAgICAgICAgICAgICAgICBzLm9uQ2xpY2tQcmV2KGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMuaXNCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5ub3RpZnkocy5wYXJhbXMuZmlyc3RTbGlkZU1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm5vdGlmeShzLnBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJChldmVudC50YXJnZXQpLmlzKCcuJyArIHMucGFyYW1zLmJ1bGxldENsYXNzKSkge1xuICAgICAgICAgICAgICAgICAgICAkKGV2ZW50LnRhcmdldClbMF0uY2xpY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICBcbiAgICAgICAgICAgIGxpdmVSZWdpb246ICQoJzxzcGFuIGNsYXNzPVwiJyArIHMucGFyYW1zLm5vdGlmaWNhdGlvbkNsYXNzICsgJ1wiIGFyaWEtbGl2ZT1cImFzc2VydGl2ZVwiIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvc3Bhbj4nKSxcbiAgICAgICAgXG4gICAgICAgICAgICBub3RpZnk6IGZ1bmN0aW9uIChtZXNzYWdlKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IHMuYTExeS5saXZlUmVnaW9uO1xuICAgICAgICAgICAgICAgIGlmIChub3RpZmljYXRpb24ubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgICAgICAgICAgICAgbm90aWZpY2F0aW9uLmh0bWwoJycpO1xuICAgICAgICAgICAgICAgIG5vdGlmaWNhdGlvbi5odG1sKG1lc3NhZ2UpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBTZXR1cCBhY2Nlc3NpYmlsaXR5XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLm5leHRCdXR0b24gJiYgcy5uZXh0QnV0dG9uICYmIHMubmV4dEJ1dHRvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuYTExeS5tYWtlRm9jdXNhYmxlKHMubmV4dEJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIHMuYTExeS5hZGRSb2xlKHMubmV4dEJ1dHRvbiwgJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICBzLmExMXkuYWRkTGFiZWwocy5uZXh0QnV0dG9uLCBzLnBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnByZXZCdXR0b24gJiYgcy5wcmV2QnV0dG9uICYmIHMucHJldkJ1dHRvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuYTExeS5tYWtlRm9jdXNhYmxlKHMucHJldkJ1dHRvbik7XG4gICAgICAgICAgICAgICAgICAgIHMuYTExeS5hZGRSb2xlKHMucHJldkJ1dHRvbiwgJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICBzLmExMXkuYWRkTGFiZWwocy5wcmV2QnV0dG9uLCBzLnBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICAgICAgICAgICQocy5jb250YWluZXIpLmFwcGVuZChzLmExMXkubGl2ZVJlZ2lvbik7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5pdFBhZ2luYXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMucGFnaW5hdGlvbiAmJiBzLnBhcmFtcy5wYWdpbmF0aW9uQ2xpY2thYmxlICYmIHMuYnVsbGV0cyAmJiBzLmJ1bGxldHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuYnVsbGV0cy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBidWxsZXQgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5Lm1ha2VGb2N1c2FibGUoYnVsbGV0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMuYTExeS5hZGRSb2xlKGJ1bGxldCwgJ2J1dHRvbicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5hMTF5LmFkZExhYmVsKGJ1bGxldCwgcy5wYXJhbXMucGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2UucmVwbGFjZSgve3tpbmRleH19LywgYnVsbGV0LmluZGV4KCkgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuYTExeS5saXZlUmVnaW9uICYmIHMuYTExeS5saXZlUmVnaW9uLmxlbmd0aCA+IDApIHMuYTExeS5saXZlUmVnaW9uLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcblxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICAgICAgICBJbml0L0Rlc3Ryb3lcbiAgICAgICAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkgcy5jcmVhdGVMb29wKCk7XG4gICAgICAgICAgICBzLnVwZGF0ZUNvbnRhaW5lclNpemUoKTtcbiAgICAgICAgICAgIHMudXBkYXRlU2xpZGVzU2l6ZSgpO1xuICAgICAgICAgICAgcy51cGRhdGVQYWdpbmF0aW9uKCk7XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgcy5zY3JvbGxiYXIuc2V0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLnNjcm9sbGJhckRyYWdnYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBzLnNjcm9sbGJhci5lbmFibGVEcmFnZ2FibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnICYmIHMuZWZmZWN0c1tzLnBhcmFtcy5lZmZlY3RdKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFzLnBhcmFtcy5sb29wKSBzLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgICAgICAgICAgcy5lZmZlY3RzW3MucGFyYW1zLmVmZmVjdF0uc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLnBhcmFtcy5pbml0aWFsU2xpZGUgKyBzLmxvb3BlZFNsaWRlcywgMCwgcy5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHMuc2xpZGVUbyhzLnBhcmFtcy5pbml0aWFsU2xpZGUsIDAsIHMucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgICAgICAgICAgICAgaWYgKHMucGFyYW1zLmluaXRpYWxTbGlkZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAocy5wYXJhbGxheCAmJiBzLnBhcmFtcy5wYXJhbGxheCkgcy5wYXJhbGxheC5zZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHMubGF6eSAmJiBzLnBhcmFtcy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy5sYXp5LmxvYWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcy5hdHRhY2hFdmVudHMoKTtcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5vYnNlcnZlciAmJiBzLnN1cHBvcnQub2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBzLmluaXRPYnNlcnZlcnMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmVsb2FkSW1hZ2VzICYmICFzLnBhcmFtcy5sYXp5TG9hZGluZykge1xuICAgICAgICAgICAgICAgIHMucHJlbG9hZEltYWdlcygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLnpvb20gJiYgcy56b29tKSB7XG4gICAgICAgICAgICAgICAgcy56b29tLmluaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5hdXRvcGxheSkge1xuICAgICAgICAgICAgICAgIHMuc3RhcnRBdXRvcGxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmtleWJvYXJkQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIGlmIChzLmVuYWJsZUtleWJvYXJkQ29udHJvbCkgcy5lbmFibGVLZXlib2FyZENvbnRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIGlmIChzLmVuYWJsZU1vdXNld2hlZWxDb250cm9sKSBzLmVuYWJsZU1vdXNld2hlZWxDb250cm9sKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZXByZWNhdGVkIGhhc2huYXZSZXBsYWNlU3RhdGUgY2hhbmdlZCB0byByZXBsYWNlU3RhdGUgZm9yIHVzZSBpbiBoYXNobmF2IGFuZCBoaXN0b3J5XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGFzaG5hdlJlcGxhY2VTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHMucGFyYW1zLnJlcGxhY2VTdGF0ZSA9IHMucGFyYW1zLmhhc2huYXZSZXBsYWNlU3RhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGlzdG9yeSkge1xuICAgICAgICAgICAgICAgIGlmIChzLmhpc3RvcnkpIHMuaGlzdG9yeS5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuaGFzaG5hdikge1xuICAgICAgICAgICAgICAgIGlmIChzLmhhc2huYXYpIHMuaGFzaG5hdi5pbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuYTExeSAmJiBzLmExMXkpIHMuYTExeS5pbml0KCk7XG4gICAgICAgICAgICBzLmVtaXQoJ29uSW5pdCcsIHMpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gQ2xlYW51cCBkeW5hbWljIHN0eWxlc1xuICAgICAgICBzLmNsZWFudXBTdHlsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBDb250YWluZXJcbiAgICAgICAgICAgIHMuY29udGFpbmVyLnJlbW92ZUNsYXNzKHMuY2xhc3NOYW1lcy5qb2luKCcgJykpLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gV3JhcHBlclxuICAgICAgICAgICAgcy53cmFwcGVyLnJlbW92ZUF0dHIoJ3N0eWxlJyk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gU2xpZGVzXG4gICAgICAgICAgICBpZiAocy5zbGlkZXMgJiYgcy5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcy5zbGlkZXNcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUNsYXNzKFtcbiAgICAgICAgICAgICAgICAgICAgICBzLnBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyxcbiAgICAgICAgICAgICAgICAgICAgICBzLnBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlTmV4dENsYXNzLFxuICAgICAgICAgICAgICAgICAgICAgIHMucGFyYW1zLnNsaWRlUHJldkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignICcpKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignc3R5bGUnKVxuICAgICAgICAgICAgICAgICAgICAucmVtb3ZlQXR0cignZGF0YS1zd2lwZXItY29sdW1uJylcbiAgICAgICAgICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ2RhdGEtc3dpcGVyLXJvdycpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIFBhZ2luYXRpb24vQnVsbGV0c1xuICAgICAgICAgICAgaWYgKHMucGFnaW5hdGlvbkNvbnRhaW5lciAmJiBzLnBhZ2luYXRpb25Db250YWluZXIubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcy5wYWdpbmF0aW9uQ29udGFpbmVyLnJlbW92ZUNsYXNzKHMucGFyYW1zLnBhZ2luYXRpb25IaWRkZW5DbGFzcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocy5idWxsZXRzICYmIHMuYnVsbGV0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBzLmJ1bGxldHMucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgICAgIC8vIEJ1dHRvbnNcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5wcmV2QnV0dG9uKSAkKHMucGFyYW1zLnByZXZCdXR0b24pLnJlbW92ZUNsYXNzKHMucGFyYW1zLmJ1dHRvbkRpc2FibGVkQ2xhc3MpO1xuICAgICAgICAgICAgaWYgKHMucGFyYW1zLm5leHRCdXR0b24pICQocy5wYXJhbXMubmV4dEJ1dHRvbikucmVtb3ZlQ2xhc3Mocy5wYXJhbXMuYnV0dG9uRGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIFxuICAgICAgICAgICAgLy8gU2Nyb2xsYmFyXG4gICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyICYmIHMuc2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHMuc2Nyb2xsYmFyLnRyYWNrICYmIHMuc2Nyb2xsYmFyLnRyYWNrLmxlbmd0aCkgcy5zY3JvbGxiYXIudHJhY2sucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgICAgICAgICBpZiAocy5zY3JvbGxiYXIuZHJhZyAmJiBzLnNjcm9sbGJhci5kcmFnLmxlbmd0aCkgcy5zY3JvbGxiYXIuZHJhZy5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gRGVzdHJveVxuICAgICAgICBzLmRlc3Ryb3kgPSBmdW5jdGlvbiAoZGVsZXRlSW5zdGFuY2UsIGNsZWFudXBTdHlsZXMpIHtcbiAgICAgICAgICAgIC8vIERldGFjaCBldmVidHNcbiAgICAgICAgICAgIHMuZGV0YWNoRXZlbnRzKCk7XG4gICAgICAgICAgICAvLyBTdG9wIGF1dG9wbGF5XG4gICAgICAgICAgICBzLnN0b3BBdXRvcGxheSgpO1xuICAgICAgICAgICAgLy8gRGlzYWJsZSBkcmFnZ2FibGVcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5zY3JvbGxiYXIgJiYgcy5zY3JvbGxiYXIpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5wYXJhbXMuc2Nyb2xsYmFyRHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHMuc2Nyb2xsYmFyLmRpc2FibGVEcmFnZ2FibGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEZXN0cm95IGxvb3BcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICAgICAgcy5kZXN0cm95TG9vcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gQ2xlYW51cCBzdHlsZXNcbiAgICAgICAgICAgIGlmIChjbGVhbnVwU3R5bGVzKSB7XG4gICAgICAgICAgICAgICAgcy5jbGVhbnVwU3R5bGVzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEaXNjb25uZWN0IG9ic2VydmVyXG4gICAgICAgICAgICBzLmRpc2Nvbm5lY3RPYnNlcnZlcnMoKTtcbiAgICAgICAgXG4gICAgICAgICAgICAvLyBEZXN0cm95IHpvb21cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy56b29tICYmIHMuem9vbSkge1xuICAgICAgICAgICAgICAgIHMuem9vbS5kZXN0cm95KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBEaXNhYmxlIGtleWJvYXJkL21vdXNld2hlZWxcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5rZXlib2FyZENvbnRyb2wpIHtcbiAgICAgICAgICAgICAgICBpZiAocy5kaXNhYmxlS2V5Ym9hcmRDb250cm9sKSBzLmRpc2FibGVLZXlib2FyZENvbnRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5tb3VzZXdoZWVsQ29udHJvbCkge1xuICAgICAgICAgICAgICAgIGlmIChzLmRpc2FibGVNb3VzZXdoZWVsQ29udHJvbCkgcy5kaXNhYmxlTW91c2V3aGVlbENvbnRyb2woKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERpc2FibGUgYTExeVxuICAgICAgICAgICAgaWYgKHMucGFyYW1zLmExMXkgJiYgcy5hMTF5KSBzLmExMXkuZGVzdHJveSgpO1xuICAgICAgICAgICAgLy8gRGVsZXRlIGhpc3RvcnkgcG9wc3RhdGVcbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oaXN0b3J5ICYmICFzLnBhcmFtcy5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBzLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzLnBhcmFtcy5oYXNobmF2ICYmIHMuaGFzaG5hdikgIHtcbiAgICAgICAgICAgICAgICBzLmhhc2huYXYuZGVzdHJveSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gRGVzdHJveSBjYWxsYmFja1xuICAgICAgICAgICAgcy5lbWl0KCdvbkRlc3Ryb3knKTtcbiAgICAgICAgICAgIC8vIERlbGV0ZSBpbnN0YW5jZVxuICAgICAgICAgICAgaWYgKGRlbGV0ZUluc3RhbmNlICE9PSBmYWxzZSkgcyA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICBzLmluaXQoKTtcbiAgICAgICAgXG5cbiAgICBcbiAgICAgICAgLy8gUmV0dXJuIHN3aXBlciBpbnN0YW5jZVxuICAgICAgICByZXR1cm4gcztcbiAgICB9O1xuICAgIFxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBQcm90b3R5cGVcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICBTd2lwZXIucHJvdG90eXBlID0ge1xuICAgICAgICBpc1NhZmFyaTogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICByZXR1cm4gKHVhLmluZGV4T2YoJ3NhZmFyaScpID49IDAgJiYgdWEuaW5kZXhPZignY2hyb21lJykgPCAwICYmIHVhLmluZGV4T2YoJ2FuZHJvaWQnKSA8IDApO1xuICAgICAgICB9KSgpLFxuICAgICAgICBpc1VpV2ViVmlldzogLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSxcbiAgICAgICAgaXNBcnJheTogZnVuY3Rpb24gKGFycikge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuYXBwbHkoYXJyKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICAgICAgfSxcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBCcm93c2VyXG4gICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBicm93c2VyOiB7XG4gICAgICAgICAgICBpZTogd2luZG93Lm5hdmlnYXRvci5wb2ludGVyRW5hYmxlZCB8fCB3aW5kb3cubmF2aWdhdG9yLm1zUG9pbnRlckVuYWJsZWQsXG4gICAgICAgICAgICBpZVRvdWNoOiAod2luZG93Lm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkICYmIHdpbmRvdy5uYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDEpIHx8ICh3aW5kb3cubmF2aWdhdG9yLnBvaW50ZXJFbmFibGVkICYmIHdpbmRvdy5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAxKSxcbiAgICAgICAgICAgIGx0ZUlFOTogKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSB0ZW1wb3JhcnkgRElWXG4gICAgICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCBjb250ZW50IHRvIHRtcCBESVYgd2hpY2ggaXMgd3JhcHBlZCBpbnRvIHRoZSBJRSBIVE1MIGNvbmRpdGlvbmFsIHN0YXRlbWVudFxuICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSAnPCEtLVtpZiBsdGUgSUUgOV0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgICAgICAgICAgICAgLy8gcmV0dXJuIHRydWUgLyBmYWxzZSB2YWx1ZSBiYXNlZCBvbiB3aGF0IHdpbGwgYnJvd3NlciByZW5kZXJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxO1xuICAgICAgICAgICAgfSkoKVxuICAgICAgICB9LFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIERldmljZXNcbiAgICAgICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgICAgIGRldmljZTogKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICAgICAgICAgICAgdmFyIGFuZHJvaWQgPSB1YS5tYXRjaCgvKEFuZHJvaWQpOz9bXFxzXFwvXSsoW1xcZC5dKyk/Lyk7XG4gICAgICAgICAgICB2YXIgaXBhZCA9IHVhLm1hdGNoKC8oaVBhZCkuKk9TXFxzKFtcXGRfXSspLyk7XG4gICAgICAgICAgICB2YXIgaXBvZCA9IHVhLm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/Lyk7XG4gICAgICAgICAgICB2YXIgaXBob25lID0gIWlwYWQgJiYgdWEubWF0Y2goLyhpUGhvbmVcXHNPU3xpT1MpXFxzKFtcXGRfXSspLyk7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlvczogaXBhZCB8fCBpcGhvbmUgfHwgaXBvZCxcbiAgICAgICAgICAgICAgICBhbmRyb2lkOiBhbmRyb2lkXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KSgpLFxuICAgICAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgICAgIEZlYXR1cmUgRGV0ZWN0aW9uXG4gICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBzdXBwb3J0OiB7XG4gICAgICAgICAgICB0b3VjaCA6ICh3aW5kb3cuTW9kZXJuaXpyICYmIE1vZGVybml6ci50b3VjaCA9PT0gdHJ1ZSkgfHwgKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISEoKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdykgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiBEb2N1bWVudFRvdWNoKTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgXG4gICAgICAgICAgICB0cmFuc2Zvcm1zM2QgOiAod2luZG93Lk1vZGVybml6ciAmJiBNb2Rlcm5penIuY3NzdHJhbnNmb3JtczNkID09PSB0cnVlKSB8fCAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCd3ZWJraXRQZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdNb3pQZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdPUGVyc3BlY3RpdmUnIGluIGRpdiB8fCAnTXNQZXJzcGVjdGl2ZScgaW4gZGl2IHx8ICdwZXJzcGVjdGl2ZScgaW4gZGl2KTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgXG4gICAgICAgICAgICBmbGV4Ym94OiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKS5zdHlsZTtcbiAgICAgICAgICAgICAgICB2YXIgc3R5bGVzID0gKCdhbGlnbkl0ZW1zIHdlYmtpdEFsaWduSXRlbXMgd2Via2l0Qm94QWxpZ24gbXNGbGV4QWxpZ24gbW96Qm94QWxpZ24gd2Via2l0RmxleERpcmVjdGlvbiBtc0ZsZXhEaXJlY3Rpb24gbW96Qm94RGlyZWN0aW9uIG1vekJveE9yaWVudCB3ZWJraXRCb3hEaXJlY3Rpb24gd2Via2l0Qm94T3JpZW50Jykuc3BsaXQoJyAnKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3R5bGVzW2ldIGluIGRpdikgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkoKSxcbiAgICBcbiAgICAgICAgICAgIG9ic2VydmVyOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdyB8fCAnV2Via2l0TXV0YXRpb25PYnNlcnZlcicgaW4gd2luZG93KTtcbiAgICAgICAgICAgIH0pKCksXG4gICAgXG4gICAgICAgICAgICBwYXNzaXZlTGlzdGVuZXI6IChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN1cHBvcnRzUGFzc2l2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvcHRzID0gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAncGFzc2l2ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCd0ZXN0UGFzc2l2ZUxpc3RlbmVyJywgbnVsbCwgb3B0cyk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlO1xuICAgICAgICAgICAgfSkoKSxcbiAgICBcbiAgICAgICAgICAgIGdlc3R1cmVzOiAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnb25nZXN0dXJlc3RhcnQnIGluIHdpbmRvdztcbiAgICAgICAgICAgIH0pKClcbiAgICAgICAgfSxcbiAgICAgICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgICAgICBQbHVnaW5zXG4gICAgICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xuICAgICAgICBwbHVnaW5zOiB7fVxuICAgIH07XG4gICAgXG5cbiAgICAvKj09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIERvbTcgTGlicmFyeVxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgdmFyIERvbTcgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgRG9tNyA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICAgIHZhciBfdGhpcyA9IHRoaXMsIGkgPSAwO1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGFycmF5LWxpa2Ugb2JqZWN0XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgX3RoaXNbaV0gPSBhcnJbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5sZW5ndGggPSBhcnIubGVuZ3RoO1xuICAgICAgICAgICAgLy8gUmV0dXJuIGNvbGxlY3Rpb24gd2l0aCBtZXRob2RzXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgdmFyICQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBbXSwgaSA9IDA7XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IgJiYgIWNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAvLyBTdHJpbmdcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNlbGVjdG9yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxzLCB0ZW1wUGFyZW50LCBodG1sID0gc2VsZWN0b3IudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8JykgPj0gMCAmJiBodG1sLmluZGV4T2YoJz4nKSA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgdG9DcmVhdGUgPSAnZGl2JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxsaScpID09PSAwKSB0b0NyZWF0ZSA9ICd1bCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaHRtbC5pbmRleE9mKCc8dHInKSA9PT0gMCkgdG9DcmVhdGUgPSAndGJvZHknO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRkJykgPT09IDAgfHwgaHRtbC5pbmRleE9mKCc8dGgnKSA9PT0gMCkgdG9DcmVhdGUgPSAndHInO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRib2R5JykgPT09IDApIHRvQ3JlYXRlID0gJ3RhYmxlJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxvcHRpb24nKSA9PT0gMCkgdG9DcmVhdGUgPSAnc2VsZWN0JztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBQYXJlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRvQ3JlYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBQYXJlbnQuaW5uZXJIVE1MID0gc2VsZWN0b3I7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGVtcFBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2godGVtcFBhcmVudC5jaGlsZE5vZGVzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY29udGV4dCAmJiBzZWxlY3RvclswXSA9PT0gJyMnICYmICFzZWxlY3Rvci5tYXRjaCgvWyAuPD46fl0vKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFB1cmUgSUQgc2VsZWN0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHMgPSBbZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3Iuc3BsaXQoJyMnKVsxXSldO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXIgc2VsZWN0b3JzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzID0gKGNvbnRleHQgfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbHNbaV0pIGFyci5wdXNoKGVsc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gTm9kZS9lbGVtZW50XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3Iubm9kZVR5cGUgfHwgc2VsZWN0b3IgPT09IHdpbmRvdyB8fCBzZWxlY3RvciA9PT0gZG9jdW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXJyLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvL0FycmF5IG9mIGVsZW1lbnRzIG9yIGluc3RhbmNlIG9mIERvbVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHNlbGVjdG9yLmxlbmd0aCA+IDAgJiYgc2VsZWN0b3JbMF0ubm9kZVR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHNlbGVjdG9yLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcnIucHVzaChzZWxlY3RvcltpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gbmV3IERvbTcoYXJyKTtcbiAgICAgICAgfTtcbiAgICAgICAgRG9tNy5wcm90b3R5cGUgPSB7XG4gICAgICAgICAgICAvLyBDbGFzc2VzIGFuZCBhdHRyaXV0ZXNcbiAgICAgICAgICAgIGFkZENsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY2xhc3NlcyA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xhc3Nlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbal0uY2xhc3NMaXN0LmFkZChjbGFzc2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tqXS5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhhc0NsYXNzOiBmdW5jdGlvbiAoY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzWzBdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpc1swXS5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0b2dnbGVDbGFzczogZnVuY3Rpb24gKGNsYXNzTmFtZSkge1xuICAgICAgICAgICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tqXS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXNbaV0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGF0dHI6IGZ1bmN0aW9uIChhdHRycywgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSAmJiB0eXBlb2YgYXR0cnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBhdHRyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdKSByZXR1cm4gdGhpc1swXS5nZXRBdHRyaWJ1dGUoYXR0cnMpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBTZXQgYXR0cnNcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN0cmluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uc2V0QXR0cmlidXRlKGF0dHJzLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBPYmplY3RcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBhdHRycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldW2F0dHJOYW1lXSA9IGF0dHJzW2F0dHJOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5zZXRBdHRyaWJ1dGUoYXR0ck5hbWUsIGF0dHJzW2F0dHJOYW1lXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdmVBdHRyOiBmdW5jdGlvbiAoYXR0cikge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLnJlbW92ZUF0dHJpYnV0ZShhdHRyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGF0YTogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkYXRhS2V5ID0gdGhpc1swXS5nZXRBdHRyaWJ1dGUoJ2RhdGEtJyArIGtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleSkgcmV0dXJuIGRhdGFLZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzWzBdLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UgJiYgKGtleSBpbiB0aGlzWzBdLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UpKSByZXR1cm4gdGhpc1swXS5kb203RWxlbWVudERhdGFTdG9yYWdlW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2V0IHZhbHVlXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGVsID0gdGhpc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSkgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vIFRyYW5zZm9ybXNcbiAgICAgICAgICAgIHRyYW5zZm9ybSA6IGZ1bmN0aW9uICh0cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVsU3R5bGUgPSB0aGlzW2ldLnN0eWxlO1xuICAgICAgICAgICAgICAgICAgICBlbFN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGVsU3R5bGUuTXNUcmFuc2Zvcm0gPSBlbFN0eWxlLm1zVHJhbnNmb3JtID0gZWxTdHlsZS5Nb3pUcmFuc2Zvcm0gPSBlbFN0eWxlLk9UcmFuc2Zvcm0gPSBlbFN0eWxlLnRyYW5zZm9ybSA9IHRyYW5zZm9ybTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHJhbnNpdGlvbjogZnVuY3Rpb24gKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBkdXJhdGlvbiAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiArICdtcyc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZWxTdHlsZSA9IHRoaXNbaV0uc3R5bGU7XG4gICAgICAgICAgICAgICAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5Nc1RyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUubXNUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLk1velRyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUuT1RyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8vRXZlbnRzXG4gICAgICAgICAgICBvbjogZnVuY3Rpb24gKGV2ZW50TmFtZSwgdGFyZ2V0U2VsZWN0b3IsIGxpc3RlbmVyLCBjYXB0dXJlKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gaGFuZGxlTGl2ZUV2ZW50KGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgICAgICAgICAgICAgICBpZiAoJCh0YXJnZXQpLmlzKHRhcmdldFNlbGVjdG9yKSkgbGlzdGVuZXIuY2FsbCh0YXJnZXQsIGUpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRzID0gJCh0YXJnZXQpLnBhcmVudHMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgcGFyZW50cy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKHBhcmVudHNba10pLmlzKHRhcmdldFNlbGVjdG9yKSkgbGlzdGVuZXIuY2FsbChwYXJlbnRzW2tdLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gZXZlbnROYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgdmFyIGksIGo7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJyB8fCB0YXJnZXRTZWxlY3RvciA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzdWFsIGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXRTZWxlY3RvciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmUgPSBhcmd1bWVudHNbMl0gfHwgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgZXZlbnRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5hZGRFdmVudExpc3RlbmVyKGV2ZW50c1tqXSwgbGlzdGVuZXIsIGNhcHR1cmUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9MaXZlIGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGV2ZW50cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghdGhpc1tpXS5kb203TGl2ZUxpc3RlbmVycykgdGhpc1tpXS5kb203TGl2ZUxpc3RlbmVycyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uZG9tN0xpdmVMaXN0ZW5lcnMucHVzaCh7bGlzdGVuZXI6IGxpc3RlbmVyLCBsaXZlTGlzdGVuZXI6IGhhbmRsZUxpdmVFdmVudH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uYWRkRXZlbnRMaXN0ZW5lcihldmVudHNbal0sIGhhbmRsZUxpdmVFdmVudCwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb2ZmOiBmdW5jdGlvbiAoZXZlbnROYW1lLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gZXZlbnROYW1lLnNwbGl0KCcgJyk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nIHx8IHRhcmdldFNlbGVjdG9yID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFVzdWFsIGV2ZW50c1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0U2VsZWN0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhcHR1cmUgPSBhcmd1bWVudHNbMl0gfHwgZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbal0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIExpdmUgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1tqXS5kb203TGl2ZUxpc3RlbmVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXNbal0uZG9tN0xpdmVMaXN0ZW5lcnMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2pdLmRvbTdMaXZlTGlzdGVuZXJzW2tdLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbal0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudHNbaV0sIHRoaXNbal0uZG9tN0xpdmVMaXN0ZW5lcnNba10ubGl2ZUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbmNlOiBmdW5jdGlvbiAoZXZlbnROYW1lLCB0YXJnZXRTZWxlY3RvciwgbGlzdGVuZXIsIGNhcHR1cmUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tID0gdGhpcztcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNlbGVjdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNlbGVjdG9yID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlID0gYXJndW1lbnRzWzJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBwcm94eShlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyKGUpO1xuICAgICAgICAgICAgICAgICAgICBkb20ub2ZmKGV2ZW50TmFtZSwgdGFyZ2V0U2VsZWN0b3IsIHByb3h5LCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZG9tLm9uKGV2ZW50TmFtZSwgdGFyZ2V0U2VsZWN0b3IsIHByb3h5LCBjYXB0dXJlKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmlnZ2VyOiBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudERhdGEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2dDtcbiAgICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2dCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoZXZlbnROYW1lLCB7ZGV0YWlsOiBldmVudERhdGEsIGJ1YmJsZXM6IHRydWUsIGNhbmNlbGFibGU6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0V2ZW50Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50TmFtZSwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBldnQuZGV0YWlsID0gZXZlbnREYXRhO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0cmFuc2l0aW9uRW5kOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB2YXIgZXZlbnRzID0gWyd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ3RyYW5zaXRpb25lbmQnLCAnb1RyYW5zaXRpb25FbmQnLCAnTVNUcmFuc2l0aW9uRW5kJywgJ21zVHJhbnNpdGlvbkVuZCddLFxuICAgICAgICAgICAgICAgICAgICBpLCBqLCBkb20gPSB0aGlzO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgICAgICAgICAgICAgICAgIC8qanNoaW50IHZhbGlkdGhpczp0cnVlICovXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXMsIGUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20ub2ZmKGV2ZW50c1tpXSwgZmlyZUNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLm9uKGV2ZW50c1tpXSwgZmlyZUNhbGxCYWNrKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBTaXppbmcvU3R5bGVzXG4gICAgICAgICAgICB3aWR0aDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdID09PSB3aW5kb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5jc3MoJ3dpZHRoJykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0ZXJXaWR0aDogZnVuY3Rpb24gKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5jbHVkZU1hcmdpbnMpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aCArIHBhcnNlRmxvYXQodGhpcy5jc3MoJ21hcmdpbi1yaWdodCcpKSArIHBhcnNlRmxvYXQodGhpcy5jc3MoJ21hcmdpbi1sZWZ0JykpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1swXSA9PT0gd2luZG93KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmNzcygnaGVpZ2h0JykpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3V0ZXJIZWlnaHQ6IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdCh0aGlzLmNzcygnbWFyZ2luLXRvcCcpKSArIHBhcnNlRmxvYXQodGhpcy5jc3MoJ21hcmdpbi1ib3R0b20nKSk7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvZmZzZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xpZW50VG9wICA9IGVsLmNsaWVudFRvcCAgfHwgYm9keS5jbGllbnRUb3AgIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbGllbnRMZWZ0ID0gZWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCAgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZWwuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBlbC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wOiBib3gudG9wICArIHNjcm9sbFRvcCAgLSBjbGllbnRUb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY3NzOiBmdW5jdGlvbiAocHJvcHMsIHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGk7XG4gICAgICAgICAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdKSByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIHByb3AgaW4gcHJvcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAyICYmIHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uc3R5bGVbcHJvcHNdID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICBcbiAgICAgICAgICAgIC8vRG9tIG1hbmlwdWxhdGlvblxuICAgICAgICAgICAgZWFjaDogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwodGhpc1tpXSwgaSwgdGhpc1tpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGh0bWw6IGZ1bmN0aW9uIChodG1sKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBodG1sID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpc1swXSA/IHRoaXNbMF0uaW5uZXJIVE1MIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmlubmVySFRNTCA9IGh0bWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRleHQ6IGZ1bmN0aW9uICh0ZXh0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0udGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpczogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzWzBdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXBhcmVXaXRoLCBpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbCA9PT0gZG9jdW1lbnQpIHJldHVybiBzZWxlY3RvciA9PT0gZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbCA9PT0gd2luZG93KSByZXR1cm4gc2VsZWN0b3IgPT09IHdpbmRvdztcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLm1hdGNoZXMpIHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWwubW96TWF0Y2hlc1NlbGVjdG9yKSByZXR1cm4gZWwubW96TWF0Y2hlc1NlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoZWwubXNNYXRjaGVzU2VsZWN0b3IpIHJldHVybiBlbC5tc01hdGNoZXNTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZVdpdGggPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlV2l0aFtpXSA9PT0gdGhpc1swXSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IgPT09IGRvY3VtZW50KSByZXR1cm4gdGhpc1swXSA9PT0gZG9jdW1lbnQ7XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoc2VsZWN0b3IgPT09IHdpbmRvdykgcmV0dXJuIHRoaXNbMF0gPT09IHdpbmRvdztcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyZVdpdGggPSBzZWxlY3Rvci5ub2RlVHlwZSA/IFtzZWxlY3Rvcl0gOiBzZWxlY3RvcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb21wYXJlV2l0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21wYXJlV2l0aFtpXSA9PT0gdGhpc1swXSkgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbmRleDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZCA9IHRoaXNbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChjaGlsZCA9IGNoaWxkLnByZXZpb3VzU2libGluZykgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMSkgaSsrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXE6IGZ1bmN0aW9uIChpbmRleCkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaW5kZXggPT09ICd1bmRlZmluZWQnKSByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHJldHVybkluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5JbmRleCA9IGxlbmd0aCArIGluZGV4O1xuICAgICAgICAgICAgICAgICAgICBpZiAocmV0dXJuSW5kZXggPCAwKSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbdGhpc1tyZXR1cm5JbmRleF1dKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KFt0aGlzW2luZGV4XV0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFwcGVuZDogZnVuY3Rpb24gKG5ld0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGo7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld0NoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHRlbXBEaXYuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQodGVtcERpdi5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBuZXdDaGlsZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGRbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5hcHBlbmRDaGlsZChuZXdDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJlcGVuZDogZnVuY3Rpb24gKG5ld0NoaWxkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGksIGo7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ZW1wRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wRGl2LmlubmVySFRNTCA9IG5ld0NoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gdGVtcERpdi5jaGlsZE5vZGVzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUodGVtcERpdi5jaGlsZE5vZGVzW2pdLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpc1tpXS5pbnNlcnRBZGphY2VudEhUTUwoJ2FmdGVyYmVnaW4nLCBuZXdDaGlsZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAobmV3Q2hpbGQgaW5zdGFuY2VvZiBEb203KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGogPSAwOyBqIDwgbmV3Q2hpbGQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzW2ldLmluc2VydEJlZm9yZShuZXdDaGlsZFtqXSwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluc2VydEJlZm9yZTogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIGJlZm9yZSA9ICQoc2VsZWN0b3IpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYmVmb3JlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlWzBdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXNbaV0sIGJlZm9yZVswXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoYmVmb3JlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYmVmb3JlLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVmb3JlW2pdLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXNbaV0uY2xvbmVOb2RlKHRydWUpLCBiZWZvcmVbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluc2VydEFmdGVyOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgYWZ0ZXIgPSAkKHNlbGVjdG9yKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFmdGVyLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYWZ0ZXJbMF0ucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUodGhpc1tpXSwgYWZ0ZXJbMF0ubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFmdGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgYWZ0ZXIubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZnRlcltqXS5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzW2ldLmNsb25lTm9kZSh0cnVlKSwgYWZ0ZXJbal0ubmV4dFNpYmxpbmcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcgJiYgJCh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZykuaXMoc2VsZWN0b3IpKSByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmcpIHJldHVybiBuZXcgRG9tNyhbdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dEFsbDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHRFbHMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgIGlmICghZWwpIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZigkKG5leHQpLmlzKHNlbGVjdG9yKSkgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgICAgICAgICAgICAgICAgICBlbCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhuZXh0RWxzKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcmV2OiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZyAmJiAkKHRoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZykuaXMoc2VsZWN0b3IpKSByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZ10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbMF0ucHJldmlvdXNFbGVtZW50U2libGluZykgcmV0dXJuIG5ldyBEb203KFt0aGlzWzBdLnByZXZpb3VzRWxlbWVudFNpYmxpbmddKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJldkFsbDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZFbHMgPSBbXTtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSB0aGlzWzBdO1xuICAgICAgICAgICAgICAgIGlmICghZWwpIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCQocHJldikuaXMoc2VsZWN0b3IpKSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgICAgICAgICAgICAgICAgIGVsID0gcHJldjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KHByZXZFbHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhcmVudDogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoJCh0aGlzW2ldLnBhcmVudE5vZGUpLmlzKHNlbGVjdG9yKSkgcGFyZW50cy5wdXNoKHRoaXNbaV0ucGFyZW50Tm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRzLnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnVuaXF1ZShwYXJlbnRzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGFyZW50czogZnVuY3Rpb24gKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcmVudHMgPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXNbaV0ucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKHBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQocGFyZW50KS5pcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gJCgkLnVuaXF1ZShwYXJlbnRzKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZmluZCA6IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgIHZhciBmb3VuZEVsZW1lbnRzID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBmb3VuZCA9IHRoaXNbaV0ucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgZm91bmQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChmb3VuZFtqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KGZvdW5kRWxlbWVudHMpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoaWxkTm9kZXMgPSB0aGlzW2ldLmNoaWxkTm9kZXM7XG4gICAgXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2hpbGROb2Rlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWxlY3Rvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjaGlsZE5vZGVzW2pdLm5vZGVUeXBlID09PSAxKSBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZXNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNoaWxkTm9kZXNbal0ubm9kZVR5cGUgPT09IDEgJiYgJChjaGlsZE5vZGVzW2pdKS5pcyhzZWxlY3RvcikpIGNoaWxkcmVuLnB1c2goY2hpbGROb2Rlc1tqXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEb203KCQudW5pcXVlKGNoaWxkcmVuKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3ZlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW2ldLnBhcmVudE5vZGUpIHRoaXNbaV0ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCh0aGlzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYWRkOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbSA9IHRoaXM7XG4gICAgICAgICAgICAgICAgdmFyIGksIGo7XG4gICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9BZGQgPSAkKGFyZ3VtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCB0b0FkZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tW2RvbS5sZW5ndGhdID0gdG9BZGRbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBkb20ubGVuZ3RoKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgJC5mbiA9IERvbTcucHJvdG90eXBlO1xuICAgICAgICAkLnVuaXF1ZSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgICAgIHZhciB1bmlxdWUgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHVuaXF1ZS5pbmRleE9mKGFycltpXSkgPT09IC0xKSB1bmlxdWUucHVzaChhcnJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHVuaXF1ZTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgcmV0dXJuICQ7XG4gICAgfSkoKTtcbiAgICBcblxuICAgIC8qPT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgIEdldCBEb20gbGlicmFyaWVzXG4gICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PSovXG4gICAgdmFyIHN3aXBlckRvbVBsdWdpbnMgPSBbJ2pRdWVyeScsICdaZXB0bycsICdEb203J107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXJEb21QbHVnaW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgXHRpZiAod2luZG93W3N3aXBlckRvbVBsdWdpbnNbaV1dKSB7XG4gICAgXHRcdGFkZExpYnJhcnlQbHVnaW4od2luZG93W3N3aXBlckRvbVBsdWdpbnNbaV1dKTtcbiAgICBcdH1cbiAgICB9XG4gICAgLy8gUmVxdWlyZWQgRE9NIFBsdWdpbnNcbiAgICB2YXIgZG9tTGliO1xuICAgIGlmICh0eXBlb2YgRG9tNyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBcdGRvbUxpYiA9IHdpbmRvdy5Eb203IHx8IHdpbmRvdy5aZXB0byB8fCB3aW5kb3cualF1ZXJ5O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICBcdGRvbUxpYiA9IERvbTc7XG4gICAgfVxuICAgIFxuXG4gICAgLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT1cbiAgICBBZGQgLnN3aXBlciBwbHVnaW4gZnJvbSBEb20gbGlicmFyaWVzXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbiAgICBmdW5jdGlvbiBhZGRMaWJyYXJ5UGx1Z2luKGxpYikge1xuICAgICAgICBsaWIuZm4uc3dpcGVyID0gZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgICAgICAgdmFyIGZpcnN0SW5zdGFuY2U7XG4gICAgICAgICAgICBsaWIodGhpcykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHMgPSBuZXcgU3dpcGVyKHRoaXMsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdEluc3RhbmNlKSBmaXJzdEluc3RhbmNlID0gcztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGZpcnN0SW5zdGFuY2U7XG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGlmIChkb21MaWIpIHtcbiAgICAgICAgaWYgKCEoJ3RyYW5zaXRpb25FbmQnIGluIGRvbUxpYi5mbikpIHtcbiAgICAgICAgICAgIGRvbUxpYi5mbi50cmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJywgJ29UcmFuc2l0aW9uRW5kJywgJ01TVHJhbnNpdGlvbkVuZCcsICdtc1RyYW5zaXRpb25FbmQnXSxcbiAgICAgICAgICAgICAgICAgICAgaSwgaiwgZG9tID0gdGhpcztcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBmaXJlQ2FsbEJhY2soZSkge1xuICAgICAgICAgICAgICAgICAgICAvKmpzaGludCB2YWxpZHRoaXM6dHJ1ZSAqL1xuICAgICAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzLCBlKTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGV2ZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tLm9mZihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbS5vbihldmVudHNbaV0sIGZpcmVDYWxsQmFjayk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKCd0cmFuc2Zvcm0nIGluIGRvbUxpYi5mbikpIHtcbiAgICAgICAgICAgIGRvbUxpYi5mbi50cmFuc2Zvcm0gPSBmdW5jdGlvbiAodHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgZWxTdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBlbFN0eWxlLk1zVHJhbnNmb3JtID0gZWxTdHlsZS5tc1RyYW5zZm9ybSA9IGVsU3R5bGUuTW96VHJhbnNmb3JtID0gZWxTdHlsZS5PVHJhbnNmb3JtID0gZWxTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoISgndHJhbnNpdGlvbicgaW4gZG9tTGliLmZuKSkge1xuICAgICAgICAgICAgZG9tTGliLmZuLnRyYW5zaXRpb24gPSBmdW5jdGlvbiAoZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGR1cmF0aW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiA9IGR1cmF0aW9uICsgJ21zJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgICAgICAgICAgICAgICAgZWxTdHlsZS53ZWJraXRUcmFuc2l0aW9uRHVyYXRpb24gPSBlbFN0eWxlLk1zVHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5tc1RyYW5zaXRpb25EdXJhdGlvbiA9IGVsU3R5bGUuTW96VHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS5PVHJhbnNpdGlvbkR1cmF0aW9uID0gZWxTdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBkdXJhdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmICghKCdvdXRlcldpZHRoJyBpbiBkb21MaWIuZm4pKSB7XG4gICAgICAgICAgICBkb21MaWIuZm4ub3V0ZXJXaWR0aCA9IGZ1bmN0aW9uIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluY2x1ZGVNYXJnaW5zKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KHRoaXMuY3NzKCdtYXJnaW4tcmlnaHQnKSkgKyBwYXJzZUZsb2F0KHRoaXMuY3NzKCdtYXJnaW4tbGVmdCcpKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuXG4gICAgd2luZG93LlN3aXBlciA9IFN3aXBlcjtcbn0pKCk7XG5cbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09XG5Td2lwZXIgQU1EIEV4cG9ydFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cbmlmICh0eXBlb2YobW9kdWxlKSAhPT0gJ3VuZGVmaW5lZCcpXG57XG4gICAgbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuU3dpcGVyO1xufVxuZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JztcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5Td2lwZXI7XG4gICAgfSk7XG59XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPW1hcHMvc3dpcGVyLmpzLm1hcFxuIiwiLyohXG4gKiBFdmVudEVtaXR0ZXIgdjQuMi4xMSAtIGdpdC5pby9lZVxuICogVW5saWNlbnNlIC0gaHR0cDovL3VubGljZW5zZS5vcmcvXG4gKiBPbGl2ZXIgQ2FsZHdlbGwgLSBodHRwOi8vb2xpLm1lLnVrL1xuICogQHByZXNlcnZlXG4gKi9cblxuOyhmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLyoqXG4gICAgICogQ2xhc3MgZm9yIG1hbmFnaW5nIGV2ZW50cy5cbiAgICAgKiBDYW4gYmUgZXh0ZW5kZWQgdG8gcHJvdmlkZSBldmVudCBmdW5jdGlvbmFsaXR5IGluIG90aGVyIGNsYXNzZXMuXG4gICAgICpcbiAgICAgKiBAY2xhc3MgRXZlbnRFbWl0dGVyIE1hbmFnZXMgZXZlbnQgcmVnaXN0ZXJpbmcgYW5kIGVtaXR0aW5nLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHt9XG5cbiAgICAvLyBTaG9ydGN1dHMgdG8gaW1wcm92ZSBzcGVlZCBhbmQgc2l6ZVxuICAgIHZhciBwcm90byA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGU7XG4gICAgdmFyIGV4cG9ydHMgPSB0aGlzO1xuICAgIHZhciBvcmlnaW5hbEdsb2JhbFZhbHVlID0gZXhwb3J0cy5FdmVudEVtaXR0ZXI7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgaW5kZXggb2YgdGhlIGxpc3RlbmVyIGZvciB0aGUgZXZlbnQgaW4gaXRzIHN0b3JhZ2UgYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IGxpc3RlbmVycyBBcnJheSBvZiBsaXN0ZW5lcnMgdG8gc2VhcmNoIHRocm91Z2guXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgTWV0aG9kIHRvIGxvb2sgZm9yLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gSW5kZXggb2YgdGhlIHNwZWNpZmllZCBsaXN0ZW5lciwgLTEgaWYgbm90IGZvdW5kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gaW5kZXhPZkxpc3RlbmVyKGxpc3RlbmVycywgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaS0tKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzW2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikge1xuICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGEgbWV0aG9kIHdoaWxlIGtlZXBpbmcgdGhlIGNvbnRleHQgY29ycmVjdCwgdG8gYWxsb3cgZm9yIG92ZXJ3cml0aW5nIG9mIHRhcmdldCBtZXRob2QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgdGFyZ2V0IG1ldGhvZC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGFsaWFzZWQgbWV0aG9kXG4gICAgICogQGFwaSBwcml2YXRlXG4gICAgICovXG4gICAgZnVuY3Rpb24gYWxpYXMobmFtZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gYWxpYXNDbG9zdXJlKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXNbbmFtZV0uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBsaXN0ZW5lciBhcnJheSBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBXaWxsIGluaXRpYWxpc2UgdGhlIGV2ZW50IG9iamVjdCBhbmQgbGlzdGVuZXIgYXJyYXlzIGlmIHJlcXVpcmVkLlxuICAgICAqIFdpbGwgcmV0dXJuIGFuIG9iamVjdCBpZiB5b3UgdXNlIGEgcmVnZXggc2VhcmNoLiBUaGUgb2JqZWN0IGNvbnRhaW5zIGtleXMgZm9yIGVhY2ggbWF0Y2hlZCBldmVudC4gU28gL2JhW3J6XS8gbWlnaHQgcmV0dXJuIGFuIG9iamVjdCBjb250YWluaW5nIGJhciBhbmQgYmF6LiBCdXQgb25seSBpZiB5b3UgaGF2ZSBlaXRoZXIgZGVmaW5lZCB0aGVtIHdpdGggZGVmaW5lRXZlbnQgb3IgYWRkZWQgc29tZSBsaXN0ZW5lcnMgdG8gdGhlbS5cbiAgICAgKiBFYWNoIHByb3BlcnR5IGluIHRoZSBvYmplY3QgcmVzcG9uc2UgaXMgYW4gYXJyYXkgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gcmV0dXJuIHRoZSBsaXN0ZW5lcnMgZnJvbS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbltdfE9iamVjdH0gQWxsIGxpc3RlbmVyIGZ1bmN0aW9ucyBmb3IgdGhlIGV2ZW50LlxuICAgICAqL1xuICAgIHByb3RvLmdldExpc3RlbmVycyA9IGZ1bmN0aW9uIGdldExpc3RlbmVycyhldnQpIHtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgLy8gUmV0dXJuIGEgY29uY2F0ZW5hdGVkIGFycmF5IG9mIGFsbCBtYXRjaGluZyBldmVudHMgaWZcbiAgICAgICAgLy8gdGhlIHNlbGVjdG9yIGlzIGEgcmVndWxhciBleHByZXNzaW9uLlxuICAgICAgICBpZiAoZXZ0IGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgICByZXNwb25zZSA9IHt9O1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gZXZlbnRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50cy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGV2dC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2Vba2V5XSA9IGV2ZW50c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0gZXZlbnRzW2V2dF0gfHwgKGV2ZW50c1tldnRdID0gW10pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGxpc3Qgb2YgbGlzdGVuZXIgb2JqZWN0cyBhbmQgZmxhdHRlbnMgaXQgaW50byBhIGxpc3Qgb2YgbGlzdGVuZXIgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3RbXX0gbGlzdGVuZXJzIFJhdyBsaXN0ZW5lciBvYmplY3RzLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9uW119IEp1c3QgdGhlIGxpc3RlbmVyIGZ1bmN0aW9ucy5cbiAgICAgKi9cbiAgICBwcm90by5mbGF0dGVuTGlzdGVuZXJzID0gZnVuY3Rpb24gZmxhdHRlbkxpc3RlbmVycyhsaXN0ZW5lcnMpIHtcbiAgICAgICAgdmFyIGZsYXRMaXN0ZW5lcnMgPSBbXTtcbiAgICAgICAgdmFyIGk7XG5cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgZmxhdExpc3RlbmVycy5wdXNoKGxpc3RlbmVyc1tpXS5saXN0ZW5lcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmxhdExpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgcmVxdWVzdGVkIGxpc3RlbmVycyB2aWEgZ2V0TGlzdGVuZXJzIGJ1dCB3aWxsIGFsd2F5cyByZXR1cm4gdGhlIHJlc3VsdHMgaW5zaWRlIGFuIG9iamVjdC4gVGhpcyBpcyBtYWlubHkgZm9yIGludGVybmFsIHVzZSBidXQgb3RoZXJzIG1heSBmaW5kIGl0IHVzZWZ1bC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJldHVybiB0aGUgbGlzdGVuZXJzIGZyb20uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbGwgbGlzdGVuZXIgZnVuY3Rpb25zIGZvciBhbiBldmVudCBpbiBhbiBvYmplY3QuXG4gICAgICovXG4gICAgcHJvdG8uZ2V0TGlzdGVuZXJzQXNPYmplY3QgPSBmdW5jdGlvbiBnZXRMaXN0ZW5lcnNBc09iamVjdChldnQpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHZhciByZXNwb25zZTtcblxuICAgICAgICBpZiAobGlzdGVuZXJzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHJlc3BvbnNlID0ge307XG4gICAgICAgICAgICByZXNwb25zZVtldnRdID0gbGlzdGVuZXJzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlIHx8IGxpc3RlbmVycztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGxpc3RlbmVyIGZ1bmN0aW9uIHRvIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogVGhlIGxpc3RlbmVyIHdpbGwgbm90IGJlIGFkZGVkIGlmIGl0IGlzIGEgZHVwbGljYXRlLlxuICAgICAqIElmIHRoZSBsaXN0ZW5lciByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgaXQgaXMgY2FsbGVkLlxuICAgICAqIElmIHlvdSBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIGFzIHRoZSBldmVudCBuYW1lIHRoZW4gdGhlIGxpc3RlbmVyIHdpbGwgYmUgYWRkZWQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uIGFkZExpc3RlbmVyKGV2dCwgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGxpc3RlbmVycyA9IHRoaXMuZ2V0TGlzdGVuZXJzQXNPYmplY3QoZXZ0KTtcbiAgICAgICAgdmFyIGxpc3RlbmVySXNXcmFwcGVkID0gdHlwZW9mIGxpc3RlbmVyID09PSAnb2JqZWN0JztcbiAgICAgICAgdmFyIGtleTtcblxuICAgICAgICBmb3IgKGtleSBpbiBsaXN0ZW5lcnMpIHtcbiAgICAgICAgICAgIGlmIChsaXN0ZW5lcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBpbmRleE9mTGlzdGVuZXIobGlzdGVuZXJzW2tleV0sIGxpc3RlbmVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5wdXNoKGxpc3RlbmVySXNXcmFwcGVkID8gbGlzdGVuZXIgOiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgICAgICAgICAgb25jZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiBhZGRMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9uID0gYWxpYXMoJ2FkZExpc3RlbmVyJyk7XG5cbiAgICAvKipcbiAgICAgKiBTZW1pLWFsaWFzIG9mIGFkZExpc3RlbmVyLiBJdCB3aWxsIGFkZCBhIGxpc3RlbmVyIHRoYXQgd2lsbCBiZVxuICAgICAqIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZCBhZnRlciBpdHMgZmlyc3QgZXhlY3V0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gYXR0YWNoIHRoZSBsaXN0ZW5lciB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIGV2ZW50IGlzIGVtaXR0ZWQuIElmIHRoZSBmdW5jdGlvbiByZXR1cm5zIHRydWUgdGhlbiBpdCB3aWxsIGJlIHJlbW92ZWQgYWZ0ZXIgY2FsbGluZy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5hZGRPbmNlTGlzdGVuZXIgPSBmdW5jdGlvbiBhZGRPbmNlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICByZXR1cm4gdGhpcy5hZGRMaXN0ZW5lcihldnQsIHtcbiAgICAgICAgICAgIGxpc3RlbmVyOiBsaXN0ZW5lcixcbiAgICAgICAgICAgIG9uY2U6IHRydWVcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGFkZE9uY2VMaXN0ZW5lci5cbiAgICAgKi9cbiAgICBwcm90by5vbmNlID0gYWxpYXMoJ2FkZE9uY2VMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBhbiBldmVudCBuYW1lLiBUaGlzIGlzIHJlcXVpcmVkIGlmIHlvdSB3YW50IHRvIHVzZSBhIHJlZ2V4IHRvIGFkZCBhIGxpc3RlbmVyIHRvIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBJZiB5b3UgZG9uJ3QgZG8gdGhpcyB0aGVuIGhvdyBkbyB5b3UgZXhwZWN0IGl0IHRvIGtub3cgd2hhdCBldmVudCB0byBhZGQgdG8/IFNob3VsZCBpdCBqdXN0IGFkZCB0byBldmVyeSBwb3NzaWJsZSBtYXRjaCBmb3IgYSByZWdleD8gTm8uIFRoYXQgaXMgc2NhcnkgYW5kIGJhZC5cbiAgICAgKiBZb3UgbmVlZCB0byB0ZWxsIGl0IHdoYXQgZXZlbnQgbmFtZXMgc2hvdWxkIGJlIG1hdGNoZWQgYnkgYSByZWdleC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gY3JlYXRlLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmRlZmluZUV2ZW50ID0gZnVuY3Rpb24gZGVmaW5lRXZlbnQoZXZ0KSB7XG4gICAgICAgIHRoaXMuZ2V0TGlzdGVuZXJzKGV2dCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBVc2VzIGRlZmluZUV2ZW50IHRvIGRlZmluZSBtdWx0aXBsZSBldmVudHMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ1tdfSBldnRzIEFuIGFycmF5IG9mIGV2ZW50IG5hbWVzIHRvIGRlZmluZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5kZWZpbmVFdmVudHMgPSBmdW5jdGlvbiBkZWZpbmVFdmVudHMoZXZ0cykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2dHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lRXZlbnQoZXZ0c1tpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgYSBsaXN0ZW5lciBmdW5jdGlvbiBmcm9tIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gICAgICogV2hlbiBwYXNzZWQgYSByZWd1bGFyIGV4cHJlc3Npb24gYXMgdGhlIGV2ZW50IG5hbWUsIGl0IHdpbGwgcmVtb3ZlIHRoZSBsaXN0ZW5lciBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gZXZ0IE5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSB0aGUgbGlzdGVuZXIgZnJvbS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBNZXRob2QgdG8gcmVtb3ZlIGZyb20gdGhlIGV2ZW50LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXIoZXZ0LCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgbGlzdGVuZXJzID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgaW5kZXg7XG4gICAgICAgIHZhciBrZXk7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGluZGV4T2ZMaXN0ZW5lcihsaXN0ZW5lcnNba2V5XSwgbGlzdGVuZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBsaXN0ZW5lcnNba2V5XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbGlhcyBvZiByZW1vdmVMaXN0ZW5lclxuICAgICAqL1xuICAgIHByb3RvLm9mZiA9IGFsaWFzKCdyZW1vdmVMaXN0ZW5lcicpO1xuXG4gICAgLyoqXG4gICAgICogQWRkcyBsaXN0ZW5lcnMgaW4gYnVsayB1c2luZyB0aGUgbWFuaXB1bGF0ZUxpc3RlbmVycyBtZXRob2QuXG4gICAgICogSWYgeW91IHBhc3MgYW4gb2JqZWN0IGFzIHRoZSBzZWNvbmQgYXJndW1lbnQgeW91IGNhbiBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy4gWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGl0IGEgcmVndWxhciBleHByZXNzaW9uIHRvIGFkZCB0aGUgYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKiBZZWFoLCB0aGlzIGZ1bmN0aW9uIGRvZXMgcXVpdGUgYSBiaXQuIFRoYXQncyBwcm9iYWJseSBhIGJhZCB0aGluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQgdG8gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLmFkZExpc3RlbmVycyA9IGZ1bmN0aW9uIGFkZExpc3RlbmVycyhldnQsIGxpc3RlbmVycykge1xuICAgICAgICAvLyBQYXNzIHRocm91Z2ggdG8gbWFuaXB1bGF0ZUxpc3RlbmVyc1xuICAgICAgICByZXR1cm4gdGhpcy5tYW5pcHVsYXRlTGlzdGVuZXJzKGZhbHNlLCBldnQsIGxpc3RlbmVycyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbGlzdGVuZXJzIGluIGJ1bGsgdXNpbmcgdGhlIG1hbmlwdWxhdGVMaXN0ZW5lcnMgbWV0aG9kLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuIFRoZSBvYmplY3Qgc2hvdWxkIGNvbnRhaW4ga2V5IHZhbHVlIHBhaXJzIG9mIGV2ZW50cyBhbmQgbGlzdGVuZXJzIG9yIGxpc3RlbmVyIGFycmF5cy5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhbiBldmVudCBuYW1lIGFuZCBhbiBhcnJheSBvZiBsaXN0ZW5lcnMgdG8gYmUgcmVtb3ZlZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBpdCBhIHJlZ3VsYXIgZXhwcmVzc2lvbiB0byByZW1vdmUgdGhlIGxpc3RlbmVycyBmcm9tIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byByZW1vdmUgZnJvbSBtdWx0aXBsZSBldmVudHMgYXQgb25jZS5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9uW119IFtsaXN0ZW5lcnNdIEFuIG9wdGlvbmFsIGFycmF5IG9mIGxpc3RlbmVyIGZ1bmN0aW9ucyB0byByZW1vdmUuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8ucmVtb3ZlTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlTGlzdGVuZXJzKGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIC8vIFBhc3MgdGhyb3VnaCB0byBtYW5pcHVsYXRlTGlzdGVuZXJzXG4gICAgICAgIHJldHVybiB0aGlzLm1hbmlwdWxhdGVMaXN0ZW5lcnModHJ1ZSwgZXZ0LCBsaXN0ZW5lcnMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFZGl0cyBsaXN0ZW5lcnMgaW4gYnVsay4gVGhlIGFkZExpc3RlbmVycyBhbmQgcmVtb3ZlTGlzdGVuZXJzIG1ldGhvZHMgYm90aCB1c2UgdGhpcyB0byBkbyB0aGVpciBqb2IuIFlvdSBzaG91bGQgcmVhbGx5IHVzZSB0aG9zZSBpbnN0ZWFkLCB0aGlzIGlzIGEgbGl0dGxlIGxvd2VyIGxldmVsLlxuICAgICAqIFRoZSBmaXJzdCBhcmd1bWVudCB3aWxsIGRldGVybWluZSBpZiB0aGUgbGlzdGVuZXJzIGFyZSByZW1vdmVkICh0cnVlKSBvciBhZGRlZCAoZmFsc2UpLlxuICAgICAqIElmIHlvdSBwYXNzIGFuIG9iamVjdCBhcyB0aGUgc2Vjb25kIGFyZ3VtZW50IHlvdSBjYW4gYWRkL3JlbW92ZSBmcm9tIG11bHRpcGxlIGV2ZW50cyBhdCBvbmNlLiBUaGUgb2JqZWN0IHNob3VsZCBjb250YWluIGtleSB2YWx1ZSBwYWlycyBvZiBldmVudHMgYW5kIGxpc3RlbmVycyBvciBsaXN0ZW5lciBhcnJheXMuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYW4gZXZlbnQgbmFtZSBhbmQgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIHRvIGJlIGFkZGVkL3JlbW92ZWQuXG4gICAgICogWW91IGNhbiBhbHNvIHBhc3MgaXQgYSByZWd1bGFyIGV4cHJlc3Npb24gdG8gbWFuaXB1bGF0ZSB0aGUgbGlzdGVuZXJzIG9mIGFsbCBldmVudHMgdGhhdCBtYXRjaCBpdC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gcmVtb3ZlIFRydWUgaWYgeW91IHdhbnQgdG8gcmVtb3ZlIGxpc3RlbmVycywgZmFsc2UgaWYgeW91IHdhbnQgdG8gYWRkLlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdHxSZWdFeHB9IGV2dCBBbiBldmVudCBuYW1lIGlmIHlvdSB3aWxsIHBhc3MgYW4gYXJyYXkgb2YgbGlzdGVuZXJzIG5leHQuIEFuIG9iamVjdCBpZiB5b3Ugd2lzaCB0byBhZGQvcmVtb3ZlIGZyb20gbXVsdGlwbGUgZXZlbnRzIGF0IG9uY2UuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbltdfSBbbGlzdGVuZXJzXSBBbiBvcHRpb25hbCBhcnJheSBvZiBsaXN0ZW5lciBmdW5jdGlvbnMgdG8gYWRkL3JlbW92ZS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEN1cnJlbnQgaW5zdGFuY2Ugb2YgRXZlbnRFbWl0dGVyIGZvciBjaGFpbmluZy5cbiAgICAgKi9cbiAgICBwcm90by5tYW5pcHVsYXRlTGlzdGVuZXJzID0gZnVuY3Rpb24gbWFuaXB1bGF0ZUxpc3RlbmVycyhyZW1vdmUsIGV2dCwgbGlzdGVuZXJzKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIgdmFsdWU7XG4gICAgICAgIHZhciBzaW5nbGUgPSByZW1vdmUgPyB0aGlzLnJlbW92ZUxpc3RlbmVyIDogdGhpcy5hZGRMaXN0ZW5lcjtcbiAgICAgICAgdmFyIG11bHRpcGxlID0gcmVtb3ZlID8gdGhpcy5yZW1vdmVMaXN0ZW5lcnMgOiB0aGlzLmFkZExpc3RlbmVycztcblxuICAgICAgICAvLyBJZiBldnQgaXMgYW4gb2JqZWN0IHRoZW4gcGFzcyBlYWNoIG9mIGl0cyBwcm9wZXJ0aWVzIHRvIHRoaXMgbWV0aG9kXG4gICAgICAgIGlmICh0eXBlb2YgZXZ0ID09PSAnb2JqZWN0JyAmJiAhKGV2dCBpbnN0YW5jZW9mIFJlZ0V4cCkpIHtcbiAgICAgICAgICAgIGZvciAoaSBpbiBldnQpIHtcbiAgICAgICAgICAgICAgICBpZiAoZXZ0Lmhhc093blByb3BlcnR5KGkpICYmICh2YWx1ZSA9IGV2dFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGFzcyB0aGUgc2luZ2xlIGxpc3RlbmVyIHN0cmFpZ2h0IHRocm91Z2ggdG8gdGhlIHNpbmd1bGFyIG1ldGhvZFxuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgcGFzcyBiYWNrIHRvIHRoZSBtdWx0aXBsZSBmdW5jdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGUuY2FsbCh0aGlzLCBpLCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBTbyBldnQgbXVzdCBiZSBhIHN0cmluZ1xuICAgICAgICAgICAgLy8gQW5kIGxpc3RlbmVycyBtdXN0IGJlIGFuIGFycmF5IG9mIGxpc3RlbmVyc1xuICAgICAgICAgICAgLy8gTG9vcCBvdmVyIGl0IGFuZCBwYXNzIGVhY2ggb25lIHRvIHRoZSBtdWx0aXBsZSBtZXRob2RcbiAgICAgICAgICAgIGkgPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgICAgICAgICAgd2hpbGUgKGktLSkge1xuICAgICAgICAgICAgICAgIHNpbmdsZS5jYWxsKHRoaXMsIGV2dCwgbGlzdGVuZXJzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBsaXN0ZW5lcnMgZnJvbSBhIHNwZWNpZmllZCBldmVudC5cbiAgICAgKiBJZiB5b3UgZG8gbm90IHNwZWNpZnkgYW4gZXZlbnQgdGhlbiBhbGwgbGlzdGVuZXJzIHdpbGwgYmUgcmVtb3ZlZC5cbiAgICAgKiBUaGF0IG1lYW5zIGV2ZXJ5IGV2ZW50IHdpbGwgYmUgZW1wdGllZC5cbiAgICAgKiBZb3UgY2FuIGFsc28gcGFzcyBhIHJlZ2V4IHRvIHJlbW92ZSBhbGwgZXZlbnRzIHRoYXQgbWF0Y2ggaXQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IFtldnRdIE9wdGlvbmFsIG5hbWUgb2YgdGhlIGV2ZW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci4gV2lsbCByZW1vdmUgZnJvbSBldmVyeSBldmVudCBpZiBub3QgcGFzc2VkLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQ3VycmVudCBpbnN0YW5jZSBvZiBFdmVudEVtaXR0ZXIgZm9yIGNoYWluaW5nLlxuICAgICAqL1xuICAgIHByb3RvLnJlbW92ZUV2ZW50ID0gZnVuY3Rpb24gcmVtb3ZlRXZlbnQoZXZ0KSB7XG4gICAgICAgIHZhciB0eXBlID0gdHlwZW9mIGV2dDtcbiAgICAgICAgdmFyIGV2ZW50cyA9IHRoaXMuX2dldEV2ZW50cygpO1xuICAgICAgICB2YXIga2V5O1xuXG4gICAgICAgIC8vIFJlbW92ZSBkaWZmZXJlbnQgdGhpbmdzIGRlcGVuZGluZyBvbiB0aGUgc3RhdGUgb2YgZXZ0XG4gICAgICAgIGlmICh0eXBlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgLy8gUmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnRcbiAgICAgICAgICAgIGRlbGV0ZSBldmVudHNbZXZ0XTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChldnQgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbGwgZXZlbnRzIG1hdGNoaW5nIHRoZSByZWdleC5cbiAgICAgICAgICAgIGZvciAoa2V5IGluIGV2ZW50cykge1xuICAgICAgICAgICAgICAgIGlmIChldmVudHMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiBldnQudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBldmVudHNba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBSZW1vdmUgYWxsIGxpc3RlbmVycyBpbiBhbGwgZXZlbnRzXG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fZXZlbnRzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIHJlbW92ZUV2ZW50LlxuICAgICAqXG4gICAgICogQWRkZWQgdG8gbWlycm9yIHRoZSBub2RlIEFQSS5cbiAgICAgKi9cbiAgICBwcm90by5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBhbGlhcygncmVtb3ZlRXZlbnQnKTtcblxuICAgIC8qKlxuICAgICAqIEVtaXRzIGFuIGV2ZW50IG9mIHlvdXIgY2hvaWNlLlxuICAgICAqIFdoZW4gZW1pdHRlZCwgZXZlcnkgbGlzdGVuZXIgYXR0YWNoZWQgdG8gdGhhdCBldmVudCB3aWxsIGJlIGV4ZWN1dGVkLlxuICAgICAqIElmIHlvdSBwYXNzIHRoZSBvcHRpb25hbCBhcmd1bWVudCBhcnJheSB0aGVuIHRob3NlIGFyZ3VtZW50cyB3aWxsIGJlIHBhc3NlZCB0byBldmVyeSBsaXN0ZW5lciB1cG9uIGV4ZWN1dGlvbi5cbiAgICAgKiBCZWNhdXNlIGl0IHVzZXMgYGFwcGx5YCwgeW91ciBhcnJheSBvZiBhcmd1bWVudHMgd2lsbCBiZSBwYXNzZWQgYXMgaWYgeW91IHdyb3RlIHRoZW0gb3V0IHNlcGFyYXRlbHkuXG4gICAgICogU28gdGhleSB3aWxsIG5vdCBhcnJpdmUgd2l0aGluIHRoZSBhcnJheSBvbiB0aGUgb3RoZXIgc2lkZSwgdGhleSB3aWxsIGJlIHNlcGFyYXRlLlxuICAgICAqIFlvdSBjYW4gYWxzbyBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IFthcmdzXSBPcHRpb25hbCBhcnJheSBvZiBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdEV2ZW50ID0gZnVuY3Rpb24gZW1pdEV2ZW50KGV2dCwgYXJncykge1xuICAgICAgICB2YXIgbGlzdGVuZXJzTWFwID0gdGhpcy5nZXRMaXN0ZW5lcnNBc09iamVjdChldnQpO1xuICAgICAgICB2YXIgbGlzdGVuZXJzO1xuICAgICAgICB2YXIgbGlzdGVuZXI7XG4gICAgICAgIHZhciBpO1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB2YXIgcmVzcG9uc2U7XG5cbiAgICAgICAgZm9yIChrZXkgaW4gbGlzdGVuZXJzTWFwKSB7XG4gICAgICAgICAgICBpZiAobGlzdGVuZXJzTWFwLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnNNYXBba2V5XS5zbGljZSgwKTtcbiAgICAgICAgICAgICAgICBpID0gbGlzdGVuZXJzLmxlbmd0aDtcblxuICAgICAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgdGhlIGxpc3RlbmVyIHJldHVybnMgdHJ1ZSB0aGVuIGl0IHNoYWxsIGJlIHJlbW92ZWQgZnJvbSB0aGUgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgLy8gVGhlIGZ1bmN0aW9uIGlzIGV4ZWN1dGVkIGVpdGhlciB3aXRoIGEgYmFzaWMgY2FsbCBvciBhbiBhcHBseSBpZiB0aGVyZSBpcyBhbiBhcmdzIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyID0gbGlzdGVuZXJzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lci5vbmNlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBsaXN0ZW5lci5saXN0ZW5lci5hcHBseSh0aGlzLCBhcmdzIHx8IFtdKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UgPT09IHRoaXMuX2dldE9uY2VSZXR1cm5WYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2dCwgbGlzdGVuZXIubGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFsaWFzIG9mIGVtaXRFdmVudFxuICAgICAqL1xuICAgIHByb3RvLnRyaWdnZXIgPSBhbGlhcygnZW1pdEV2ZW50Jyk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0bHkgZGlmZmVyZW50IGZyb20gZW1pdEV2ZW50IGluIHRoYXQgaXQgd2lsbCBwYXNzIGl0cyBhcmd1bWVudHMgb24gdG8gdGhlIGxpc3RlbmVycywgYXMgb3Bwb3NlZCB0byB0YWtpbmcgYSBzaW5nbGUgYXJyYXkgb2YgYXJndW1lbnRzIHRvIHBhc3Mgb24uXG4gICAgICogQXMgd2l0aCBlbWl0RXZlbnQsIHlvdSBjYW4gcGFzcyBhIHJlZ2V4IGluIHBsYWNlIG9mIHRoZSBldmVudCBuYW1lIHRvIGVtaXQgdG8gYWxsIGV2ZW50cyB0aGF0IG1hdGNoIGl0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd8UmVnRXhwfSBldnQgTmFtZSBvZiB0aGUgZXZlbnQgdG8gZW1pdCBhbmQgZXhlY3V0ZSBsaXN0ZW5lcnMgZm9yLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gT3B0aW9uYWwgYWRkaXRpb25hbCBhcmd1bWVudHMgdG8gYmUgcGFzc2VkIHRvIGVhY2ggbGlzdGVuZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZ0KSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZW1pdEV2ZW50KGV2dCwgYXJncyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGN1cnJlbnQgdmFsdWUgdG8gY2hlY2sgYWdhaW5zdCB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuIElmIGFcbiAgICAgKiBsaXN0ZW5lcnMgcmV0dXJuIHZhbHVlIG1hdGNoZXMgdGhlIG9uZSBzZXQgaGVyZSB0aGVuIGl0IHdpbGwgYmUgcmVtb3ZlZFxuICAgICAqIGFmdGVyIGV4ZWN1dGlvbi4gVGhpcyB2YWx1ZSBkZWZhdWx0cyB0byB0cnVlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgbmV3IHZhbHVlIHRvIGNoZWNrIGZvciB3aGVuIGV4ZWN1dGluZyBsaXN0ZW5lcnMuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBDdXJyZW50IGluc3RhbmNlIG9mIEV2ZW50RW1pdHRlciBmb3IgY2hhaW5pbmcuXG4gICAgICovXG4gICAgcHJvdG8uc2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gc2V0T25jZVJldHVyblZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX29uY2VSZXR1cm5WYWx1ZSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRmV0Y2hlcyB0aGUgY3VycmVudCB2YWx1ZSB0byBjaGVjayBhZ2FpbnN0IHdoZW4gZXhlY3V0aW5nIGxpc3RlbmVycy4gSWZcbiAgICAgKiB0aGUgbGlzdGVuZXJzIHJldHVybiB2YWx1ZSBtYXRjaGVzIHRoaXMgb25lIHRoZW4gaXQgc2hvdWxkIGJlIHJlbW92ZWRcbiAgICAgKiBhdXRvbWF0aWNhbGx5LiBJdCB3aWxsIHJldHVybiB0cnVlIGJ5IGRlZmF1bHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHsqfEJvb2xlYW59IFRoZSBjdXJyZW50IHZhbHVlIHRvIGNoZWNrIGZvciBvciB0aGUgZGVmYXVsdCwgdHJ1ZS5cbiAgICAgKiBAYXBpIHByaXZhdGVcbiAgICAgKi9cbiAgICBwcm90by5fZ2V0T25jZVJldHVyblZhbHVlID0gZnVuY3Rpb24gX2dldE9uY2VSZXR1cm5WYWx1ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzT3duUHJvcGVydHkoJ19vbmNlUmV0dXJuVmFsdWUnKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX29uY2VSZXR1cm5WYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEZldGNoZXMgdGhlIGV2ZW50cyBvYmplY3QgYW5kIGNyZWF0ZXMgb25lIGlmIHJlcXVpcmVkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZXZlbnRzIHN0b3JhZ2Ugb2JqZWN0LlxuICAgICAqIEBhcGkgcHJpdmF0ZVxuICAgICAqL1xuICAgIHByb3RvLl9nZXRFdmVudHMgPSBmdW5jdGlvbiBfZ2V0RXZlbnRzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZXZlbnRzIHx8ICh0aGlzLl9ldmVudHMgPSB7fSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFJldmVydHMgdGhlIGdsb2JhbCB7QGxpbmsgRXZlbnRFbWl0dGVyfSB0byBpdHMgcHJldmlvdXMgdmFsdWUgYW5kIHJldHVybnMgYSByZWZlcmVuY2UgdG8gdGhpcyB2ZXJzaW9uLlxuICAgICAqXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IE5vbiBjb25mbGljdGluZyBFdmVudEVtaXR0ZXIgY2xhc3MuXG4gICAgICovXG4gICAgRXZlbnRFbWl0dGVyLm5vQ29uZmxpY3QgPSBmdW5jdGlvbiBub0NvbmZsaWN0KCkge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IG9yaWdpbmFsR2xvYmFsVmFsdWU7XG4gICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfTtcblxuICAgIC8vIEV4cG9zZSB0aGUgY2xhc3MgZWl0aGVyIHZpYSBBTUQsIENvbW1vbkpTIG9yIHRoZSBnbG9iYWwgb2JqZWN0XG4gICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgICAgICBkZWZpbmUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIG1vZHVsZS5leHBvcnRzKXtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiAgICB9XG59LmNhbGwodGhpcykpO1xuIl19
