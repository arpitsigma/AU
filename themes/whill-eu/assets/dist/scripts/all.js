(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Jump = factory());
}(this, (function () { 'use strict';

// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false;

    // cache starting position
    start = location();

    // resolve target
    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

return singleton;

})));

},{}],2:[function(require,module,exports){
/**
 * Swiper 5.0.3
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * http://swiperjs.com
 *
 * Copyright 2014-2019 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: September 19, 2019
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Swiper = factory());
}(this, function () { 'use strict';

  /**
   * SSR Window 1.0.1
   * Better handling for window object in SSR environment
   * https://github.com/nolimits4web/ssr-window
   *
   * Copyright 2018, Vladimir Kharlampidi
   *
   * Licensed under MIT
   *
   * Released on: July 18, 2018
   */
  var doc = (typeof document === 'undefined') ? {
    body: {},
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    activeElement: {
      blur: function blur() {},
      nodeName: '',
    },
    querySelector: function querySelector() {
      return null;
    },
    querySelectorAll: function querySelectorAll() {
      return [];
    },
    getElementById: function getElementById() {
      return null;
    },
    createEvent: function createEvent() {
      return {
        initEvent: function initEvent() {},
      };
    },
    createElement: function createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute: function setAttribute() {},
        getElementsByTagName: function getElementsByTagName() {
          return [];
        },
      };
    },
    location: { hash: '' },
  } : document; // eslint-disable-line

  var win = (typeof window === 'undefined') ? {
    document: doc,
    navigator: {
      userAgent: '',
    },
    location: {},
    history: {},
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener: function addEventListener() {},
    removeEventListener: function removeEventListener() {},
    getComputedStyle: function getComputedStyle() {
      return {
        getPropertyValue: function getPropertyValue() {
          return '';
        },
      };
    },
    Image: function Image() {},
    Date: function Date() {},
    screen: {},
    setTimeout: function setTimeout() {},
    clearTimeout: function clearTimeout() {},
  } : window; // eslint-disable-line

  /**
   * Dom7 2.1.3
   * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
   * http://framework7.io/docs/dom.html
   *
   * Copyright 2019, Vladimir Kharlampidi
   * The iDangero.us
   * http://www.idangero.us/
   *
   * Licensed under MIT
   *
   * Released on: February 11, 2019
   */

  var Dom7 = function Dom7(arr) {
    var self = this;
    // Create array-like object
    for (var i = 0; i < arr.length; i += 1) {
      self[i] = arr[i];
    }
    self.length = arr.length;
    // Return collection with methods
    return this;
  };

  function $(selector, context) {
    var arr = [];
    var i = 0;
    if (selector && !context) {
      if (selector instanceof Dom7) {
        return selector;
      }
    }
    if (selector) {
        // String
      if (typeof selector === 'string') {
        var els;
        var tempParent;
        var html = selector.trim();
        if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
          var toCreate = 'div';
          if (html.indexOf('<li') === 0) { toCreate = 'ul'; }
          if (html.indexOf('<tr') === 0) { toCreate = 'tbody'; }
          if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) { toCreate = 'tr'; }
          if (html.indexOf('<tbody') === 0) { toCreate = 'table'; }
          if (html.indexOf('<option') === 0) { toCreate = 'select'; }
          tempParent = doc.createElement(toCreate);
          tempParent.innerHTML = html;
          for (i = 0; i < tempParent.childNodes.length; i += 1) {
            arr.push(tempParent.childNodes[i]);
          }
        } else {
          if (!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)) {
            // Pure ID selector
            els = [doc.getElementById(selector.trim().split('#')[1])];
          } else {
            // Other selectors
            els = (context || doc).querySelectorAll(selector.trim());
          }
          for (i = 0; i < els.length; i += 1) {
            if (els[i]) { arr.push(els[i]); }
          }
        }
      } else if (selector.nodeType || selector === win || selector === doc) {
        // Node/element
        arr.push(selector);
      } else if (selector.length > 0 && selector[0].nodeType) {
        // Array of elements or instance of Dom
        for (i = 0; i < selector.length; i += 1) {
          arr.push(selector[i]);
        }
      }
    }
    return new Dom7(arr);
  }

  $.fn = Dom7.prototype;
  $.Class = Dom7;
  $.Dom7 = Dom7;

  function unique(arr) {
    var uniqueArray = [];
    for (var i = 0; i < arr.length; i += 1) {
      if (uniqueArray.indexOf(arr[i]) === -1) { uniqueArray.push(arr[i]); }
    }
    return uniqueArray;
  }

  // Classes and attributes
  function addClass(className) {
    if (typeof className === 'undefined') {
      return this;
    }
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.add(classes[i]); }
      }
    }
    return this;
  }
  function removeClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.remove(classes[i]); }
      }
    }
    return this;
  }
  function hasClass(className) {
    if (!this[0]) { return false; }
    return this[0].classList.contains(className);
  }
  function toggleClass(className) {
    var classes = className.split(' ');
    for (var i = 0; i < classes.length; i += 1) {
      for (var j = 0; j < this.length; j += 1) {
        if (typeof this[j] !== 'undefined' && typeof this[j].classList !== 'undefined') { this[j].classList.toggle(classes[i]); }
      }
    }
    return this;
  }
  function attr(attrs, value) {
    var arguments$1 = arguments;

    if (arguments.length === 1 && typeof attrs === 'string') {
      // Get attr
      if (this[0]) { return this[0].getAttribute(attrs); }
      return undefined;
    }

    // Set attrs
    for (var i = 0; i < this.length; i += 1) {
      if (arguments$1.length === 2) {
        // String
        this[i].setAttribute(attrs, value);
      } else {
        // Object
        // eslint-disable-next-line
        for (var attrName in attrs) {
          this[i][attrName] = attrs[attrName];
          this[i].setAttribute(attrName, attrs[attrName]);
        }
      }
    }
    return this;
  }
  // eslint-disable-next-line
  function removeAttr(attr) {
    for (var i = 0; i < this.length; i += 1) {
      this[i].removeAttribute(attr);
    }
    return this;
  }
  function data(key, value) {
    var el;
    if (typeof value === 'undefined') {
      el = this[0];
      // Get value
      if (el) {
        if (el.dom7ElementDataStorage && (key in el.dom7ElementDataStorage)) {
          return el.dom7ElementDataStorage[key];
        }

        var dataKey = el.getAttribute(("data-" + key));
        if (dataKey) {
          return dataKey;
        }
        return undefined;
      }
      return undefined;
    }

    // Set value
    for (var i = 0; i < this.length; i += 1) {
      el = this[i];
      if (!el.dom7ElementDataStorage) { el.dom7ElementDataStorage = {}; }
      el.dom7ElementDataStorage[key] = value;
    }
    return this;
  }
  // Transforms
  // eslint-disable-next-line
  function transform(transform) {
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransform = transform;
      elStyle.transform = transform;
    }
    return this;
  }
  function transition(duration) {
    if (typeof duration !== 'string') {
      duration = duration + "ms"; // eslint-disable-line
    }
    for (var i = 0; i < this.length; i += 1) {
      var elStyle = this[i].style;
      elStyle.webkitTransitionDuration = duration;
      elStyle.transitionDuration = duration;
    }
    return this;
  }
  // Events
  function on() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    function handleLiveEvent(e) {
      var target = e.target;
      if (!target) { return; }
      var eventData = e.target.dom7EventData || [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      if ($(target).is(targetSelector)) { listener.apply(target, eventData); }
      else {
        var parents = $(target).parents(); // eslint-disable-line
        for (var k = 0; k < parents.length; k += 1) {
          if ($(parents[k]).is(targetSelector)) { listener.apply(parents[k], eventData); }
        }
      }
    }
    function handleEvent(e) {
      var eventData = e && e.target ? e.target.dom7EventData || [] : [];
      if (eventData.indexOf(e) < 0) {
        eventData.unshift(e);
      }
      listener.apply(this, eventData);
    }
    var events = eventType.split(' ');
    var j;
    for (var i = 0; i < this.length; i += 1) {
      var el = this[i];
      if (!targetSelector) {
        for (j = 0; j < events.length; j += 1) {
          var event = events[j];
          if (!el.dom7Listeners) { el.dom7Listeners = {}; }
          if (!el.dom7Listeners[event]) { el.dom7Listeners[event] = []; }
          el.dom7Listeners[event].push({
            listener: listener,
            proxyListener: handleEvent,
          });
          el.addEventListener(event, handleEvent, capture);
        }
      } else {
        // Live events
        for (j = 0; j < events.length; j += 1) {
          var event$1 = events[j];
          if (!el.dom7LiveListeners) { el.dom7LiveListeners = {}; }
          if (!el.dom7LiveListeners[event$1]) { el.dom7LiveListeners[event$1] = []; }
          el.dom7LiveListeners[event$1].push({
            listener: listener,
            proxyListener: handleLiveEvent,
          });
          el.addEventListener(event$1, handleLiveEvent, capture);
        }
      }
    }
    return this;
  }
  function off() {
    var assign;

    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];
    var eventType = args[0];
    var targetSelector = args[1];
    var listener = args[2];
    var capture = args[3];
    if (typeof args[1] === 'function') {
      (assign = args, eventType = assign[0], listener = assign[1], capture = assign[2]);
      targetSelector = undefined;
    }
    if (!capture) { capture = false; }

    var events = eventType.split(' ');
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var handlers = (void 0);
        if (!targetSelector && el.dom7Listeners) {
          handlers = el.dom7Listeners[event];
        } else if (targetSelector && el.dom7LiveListeners) {
          handlers = el.dom7LiveListeners[event];
        }
        if (handlers && handlers.length) {
          for (var k = handlers.length - 1; k >= 0; k -= 1) {
            var handler = handlers[k];
            if (listener && handler.listener === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (listener && handler.listener && handler.listener.dom7proxy && handler.listener.dom7proxy === listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            } else if (!listener) {
              el.removeEventListener(event, handler.proxyListener, capture);
              handlers.splice(k, 1);
            }
          }
        }
      }
    }
    return this;
  }
  function trigger() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var events = args[0].split(' ');
    var eventData = args[1];
    for (var i = 0; i < events.length; i += 1) {
      var event = events[i];
      for (var j = 0; j < this.length; j += 1) {
        var el = this[j];
        var evt = (void 0);
        try {
          evt = new win.CustomEvent(event, {
            detail: eventData,
            bubbles: true,
            cancelable: true,
          });
        } catch (e) {
          evt = doc.createEvent('Event');
          evt.initEvent(event, true, true);
          evt.detail = eventData;
        }
        // eslint-disable-next-line
        el.dom7EventData = args.filter(function (data, dataIndex) { return dataIndex > 0; });
        el.dispatchEvent(evt);
        el.dom7EventData = [];
        delete el.dom7EventData;
      }
    }
    return this;
  }
  function transitionEnd(callback) {
    var events = ['webkitTransitionEnd', 'transitionend'];
    var dom = this;
    var i;
    function fireCallBack(e) {
      /* jshint validthis:true */
      if (e.target !== this) { return; }
      callback.call(this, e);
      for (i = 0; i < events.length; i += 1) {
        dom.off(events[i], fireCallBack);
      }
    }
    if (callback) {
      for (i = 0; i < events.length; i += 1) {
        dom.on(events[i], fireCallBack);
      }
    }
    return this;
  }
  function outerWidth(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
      }
      return this[0].offsetWidth;
    }
    return null;
  }
  function outerHeight(includeMargins) {
    if (this.length > 0) {
      if (includeMargins) {
        // eslint-disable-next-line
        var styles = this.styles();
        return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));
      }
      return this[0].offsetHeight;
    }
    return null;
  }
  function offset() {
    if (this.length > 0) {
      var el = this[0];
      var box = el.getBoundingClientRect();
      var body = doc.body;
      var clientTop = el.clientTop || body.clientTop || 0;
      var clientLeft = el.clientLeft || body.clientLeft || 0;
      var scrollTop = el === win ? win.scrollY : el.scrollTop;
      var scrollLeft = el === win ? win.scrollX : el.scrollLeft;
      return {
        top: (box.top + scrollTop) - clientTop,
        left: (box.left + scrollLeft) - clientLeft,
      };
    }

    return null;
  }
  function styles() {
    if (this[0]) { return win.getComputedStyle(this[0], null); }
    return {};
  }
  function css(props, value) {
    var i;
    if (arguments.length === 1) {
      if (typeof props === 'string') {
        if (this[0]) { return win.getComputedStyle(this[0], null).getPropertyValue(props); }
      } else {
        for (i = 0; i < this.length; i += 1) {
          // eslint-disable-next-line
          for (var prop in props) {
            this[i].style[prop] = props[prop];
          }
        }
        return this;
      }
    }
    if (arguments.length === 2 && typeof props === 'string') {
      for (i = 0; i < this.length; i += 1) {
        this[i].style[props] = value;
      }
      return this;
    }
    return this;
  }
  // Iterate over the collection passing elements to `callback`
  function each(callback) {
    // Don't bother continuing without a callback
    if (!callback) { return this; }
    // Iterate over the current collection
    for (var i = 0; i < this.length; i += 1) {
      // If the callback returns false
      if (callback.call(this[i], i, this[i]) === false) {
        // End the loop early
        return this;
      }
    }
    // Return `this` to allow chained DOM operations
    return this;
  }
  function filter(callback) {
    var matchedItems = [];
    var dom = this;
    for (var i = 0; i < dom.length; i += 1) {
      if (callback.call(dom[i], i, dom[i])) { matchedItems.push(dom[i]); }
    }
    return new Dom7(matchedItems);
  }
  // eslint-disable-next-line
  function html(html) {
    if (typeof html === 'undefined') {
      return this[0] ? this[0].innerHTML : undefined;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].innerHTML = html;
    }
    return this;
  }
  // eslint-disable-next-line
  function text(text) {
    if (typeof text === 'undefined') {
      if (this[0]) {
        return this[0].textContent.trim();
      }
      return null;
    }

    for (var i = 0; i < this.length; i += 1) {
      this[i].textContent = text;
    }
    return this;
  }
  function is(selector) {
    var el = this[0];
    var compareWith;
    var i;
    if (!el || typeof selector === 'undefined') { return false; }
    if (typeof selector === 'string') {
      if (el.matches) { return el.matches(selector); }
      else if (el.webkitMatchesSelector) { return el.webkitMatchesSelector(selector); }
      else if (el.msMatchesSelector) { return el.msMatchesSelector(selector); }

      compareWith = $(selector);
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    } else if (selector === doc) { return el === doc; }
    else if (selector === win) { return el === win; }

    if (selector.nodeType || selector instanceof Dom7) {
      compareWith = selector.nodeType ? [selector] : selector;
      for (i = 0; i < compareWith.length; i += 1) {
        if (compareWith[i] === el) { return true; }
      }
      return false;
    }
    return false;
  }
  function index() {
    var child = this[0];
    var i;
    if (child) {
      i = 0;
      // eslint-disable-next-line
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1) { i += 1; }
      }
      return i;
    }
    return undefined;
  }
  // eslint-disable-next-line
  function eq(index) {
    if (typeof index === 'undefined') { return this; }
    var length = this.length;
    var returnIndex;
    if (index > length - 1) {
      return new Dom7([]);
    }
    if (index < 0) {
      returnIndex = length + index;
      if (returnIndex < 0) { return new Dom7([]); }
      return new Dom7([this[returnIndex]]);
    }
    return new Dom7([this[index]]);
  }
  function append() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var newChild;

    for (var k = 0; k < args.length; k += 1) {
      newChild = args[k];
      for (var i = 0; i < this.length; i += 1) {
        if (typeof newChild === 'string') {
          var tempDiv = doc.createElement('div');
          tempDiv.innerHTML = newChild;
          while (tempDiv.firstChild) {
            this[i].appendChild(tempDiv.firstChild);
          }
        } else if (newChild instanceof Dom7) {
          for (var j = 0; j < newChild.length; j += 1) {
            this[i].appendChild(newChild[j]);
          }
        } else {
          this[i].appendChild(newChild);
        }
      }
    }

    return this;
  }
  function prepend(newChild) {
    var i;
    var j;
    for (i = 0; i < this.length; i += 1) {
      if (typeof newChild === 'string') {
        var tempDiv = doc.createElement('div');
        tempDiv.innerHTML = newChild;
        for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
          this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
        }
      } else if (newChild instanceof Dom7) {
        for (j = 0; j < newChild.length; j += 1) {
          this[i].insertBefore(newChild[j], this[i].childNodes[0]);
        }
      } else {
        this[i].insertBefore(newChild, this[i].childNodes[0]);
      }
    }
    return this;
  }
  function next(selector) {
    if (this.length > 0) {
      if (selector) {
        if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
          return new Dom7([this[0].nextElementSibling]);
        }
        return new Dom7([]);
      }

      if (this[0].nextElementSibling) { return new Dom7([this[0].nextElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function nextAll(selector) {
    var nextEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.nextElementSibling) {
      var next = el.nextElementSibling; // eslint-disable-line
      if (selector) {
        if ($(next).is(selector)) { nextEls.push(next); }
      } else { nextEls.push(next); }
      el = next;
    }
    return new Dom7(nextEls);
  }
  function prev(selector) {
    if (this.length > 0) {
      var el = this[0];
      if (selector) {
        if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
          return new Dom7([el.previousElementSibling]);
        }
        return new Dom7([]);
      }

      if (el.previousElementSibling) { return new Dom7([el.previousElementSibling]); }
      return new Dom7([]);
    }
    return new Dom7([]);
  }
  function prevAll(selector) {
    var prevEls = [];
    var el = this[0];
    if (!el) { return new Dom7([]); }
    while (el.previousElementSibling) {
      var prev = el.previousElementSibling; // eslint-disable-line
      if (selector) {
        if ($(prev).is(selector)) { prevEls.push(prev); }
      } else { prevEls.push(prev); }
      el = prev;
    }
    return new Dom7(prevEls);
  }
  function parent(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode !== null) {
        if (selector) {
          if ($(this[i].parentNode).is(selector)) { parents.push(this[i].parentNode); }
        } else {
          parents.push(this[i].parentNode);
        }
      }
    }
    return $(unique(parents));
  }
  function parents(selector) {
    var parents = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var parent = this[i].parentNode; // eslint-disable-line
      while (parent) {
        if (selector) {
          if ($(parent).is(selector)) { parents.push(parent); }
        } else {
          parents.push(parent);
        }
        parent = parent.parentNode;
      }
    }
    return $(unique(parents));
  }
  function closest(selector) {
    var closest = this; // eslint-disable-line
    if (typeof selector === 'undefined') {
      return new Dom7([]);
    }
    if (!closest.is(selector)) {
      closest = closest.parents(selector).eq(0);
    }
    return closest;
  }
  function find(selector) {
    var foundElements = [];
    for (var i = 0; i < this.length; i += 1) {
      var found = this[i].querySelectorAll(selector);
      for (var j = 0; j < found.length; j += 1) {
        foundElements.push(found[j]);
      }
    }
    return new Dom7(foundElements);
  }
  function children(selector) {
    var children = []; // eslint-disable-line
    for (var i = 0; i < this.length; i += 1) {
      var childNodes = this[i].childNodes;

      for (var j = 0; j < childNodes.length; j += 1) {
        if (!selector) {
          if (childNodes[j].nodeType === 1) { children.push(childNodes[j]); }
        } else if (childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) {
          children.push(childNodes[j]);
        }
      }
    }
    return new Dom7(unique(children));
  }
  function remove() {
    for (var i = 0; i < this.length; i += 1) {
      if (this[i].parentNode) { this[i].parentNode.removeChild(this[i]); }
    }
    return this;
  }
  function add() {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var dom = this;
    var i;
    var j;
    for (i = 0; i < args.length; i += 1) {
      var toAdd = $(args[i]);
      for (j = 0; j < toAdd.length; j += 1) {
        dom[dom.length] = toAdd[j];
        dom.length += 1;
      }
    }
    return dom;
  }

  var Methods = {
    addClass: addClass,
    removeClass: removeClass,
    hasClass: hasClass,
    toggleClass: toggleClass,
    attr: attr,
    removeAttr: removeAttr,
    data: data,
    transform: transform,
    transition: transition,
    on: on,
    off: off,
    trigger: trigger,
    transitionEnd: transitionEnd,
    outerWidth: outerWidth,
    outerHeight: outerHeight,
    offset: offset,
    css: css,
    each: each,
    html: html,
    text: text,
    is: is,
    index: index,
    eq: eq,
    append: append,
    prepend: prepend,
    next: next,
    nextAll: nextAll,
    prev: prev,
    prevAll: prevAll,
    parent: parent,
    parents: parents,
    closest: closest,
    find: find,
    children: children,
    filter: filter,
    remove: remove,
    add: add,
    styles: styles,
  };

  Object.keys(Methods).forEach(function (methodName) {
    $.fn[methodName] = $.fn[methodName] || Methods[methodName];
  });

  var Utils = {
    deleteProps: function deleteProps(obj) {
      var object = obj;
      Object.keys(object).forEach(function (key) {
        try {
          object[key] = null;
        } catch (e) {
          // no getter for object
        }
        try {
          delete object[key];
        } catch (e) {
          // something got wrong
        }
      });
    },
    nextTick: function nextTick(callback, delay) {
      if ( delay === void 0 ) delay = 0;

      return setTimeout(callback, delay);
    },
    now: function now() {
      return Date.now();
    },
    getTranslate: function getTranslate(el, axis) {
      if ( axis === void 0 ) axis = 'x';

      var matrix;
      var curTransform;
      var transformMatrix;

      var curStyle = win.getComputedStyle(el, null);

      if (win.WebKitCSSMatrix) {
        curTransform = curStyle.transform || curStyle.webkitTransform;
        if (curTransform.split(',').length > 6) {
          curTransform = curTransform.split(', ').map(function (a) { return a.replace(',', '.'); }).join(', ');
        }
        // Some old versions of Webkit choke when 'none' is passed; pass
        // empty string instead in this case
        transformMatrix = new win.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
      } else {
        transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
        matrix = transformMatrix.toString().split(',');
      }

      if (axis === 'x') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m41; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[12]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[4]); }
      }
      if (axis === 'y') {
        // Latest Chrome and webkits Fix
        if (win.WebKitCSSMatrix) { curTransform = transformMatrix.m42; }
        // Crazy IE10 Matrix
        else if (matrix.length === 16) { curTransform = parseFloat(matrix[13]); }
        // Normal Browsers
        else { curTransform = parseFloat(matrix[5]); }
      }
      return curTransform || 0;
    },
    parseUrlQuery: function parseUrlQuery(url) {
      var query = {};
      var urlToParse = url || win.location.href;
      var i;
      var params;
      var param;
      var length;
      if (typeof urlToParse === 'string' && urlToParse.length) {
        urlToParse = urlToParse.indexOf('?') > -1 ? urlToParse.replace(/\S*\?/, '') : '';
        params = urlToParse.split('&').filter(function (paramsPart) { return paramsPart !== ''; });
        length = params.length;

        for (i = 0; i < length; i += 1) {
          param = params[i].replace(/#\S+/g, '').split('=');
          query[decodeURIComponent(param[0])] = typeof param[1] === 'undefined' ? undefined : decodeURIComponent(param[1]) || '';
        }
      }
      return query;
    },
    isObject: function isObject(o) {
      return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    extend: function extend() {
      var args = [], len$1 = arguments.length;
      while ( len$1-- ) args[ len$1 ] = arguments[ len$1 ];

      var to = Object(args[0]);
      for (var i = 1; i < args.length; i += 1) {
        var nextSource = args[i];
        if (nextSource !== undefined && nextSource !== null) {
          var keysArray = Object.keys(Object(nextSource));
          for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            var nextKey = keysArray[nextIndex];
            var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
            if (desc !== undefined && desc.enumerable) {
              if (Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else if (!Utils.isObject(to[nextKey]) && Utils.isObject(nextSource[nextKey])) {
                to[nextKey] = {};
                Utils.extend(to[nextKey], nextSource[nextKey]);
              } else {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }
      }
      return to;
    },
  };

  var Support = (function Support() {
    return {
      touch: (win.Modernizr && win.Modernizr.touch === true) || (function checkTouch() {
        return !!((win.navigator.maxTouchPoints > 0) || ('ontouchstart' in win) || (win.DocumentTouch && doc instanceof win.DocumentTouch));
      }()),

      pointerEvents: !!(win.navigator.pointerEnabled || win.PointerEvent || ('maxTouchPoints' in win.navigator && win.navigator.maxTouchPoints > 0)),
      prefixedPointerEvents: !!win.navigator.msPointerEnabled,

      observer: (function checkObserver() {
        return ('MutationObserver' in win || 'WebkitMutationObserver' in win);
      }()),

      passiveListener: (function checkPassiveListener() {
        var supportsPassive = false;
        try {
          var opts = Object.defineProperty({}, 'passive', {
            // eslint-disable-next-line
            get: function get() {
              supportsPassive = true;
            },
          });
          win.addEventListener('testPassiveListener', null, opts);
        } catch (e) {
          // No support
        }
        return supportsPassive;
      }()),

      gestures: (function checkGestures() {
        return 'ongesturestart' in win;
      }()),
    };
  }());

  var SwiperClass = function SwiperClass(params) {
    if ( params === void 0 ) params = {};

    var self = this;
    self.params = params;

    // Events
    self.eventsListeners = {};

    if (self.params && self.params.on) {
      Object.keys(self.params.on).forEach(function (eventName) {
        self.on(eventName, self.params.on[eventName]);
      });
    }
  };

  var staticAccessors = { components: { configurable: true } };

  SwiperClass.prototype.on = function on (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    var method = priority ? 'unshift' : 'push';
    events.split(' ').forEach(function (event) {
      if (!self.eventsListeners[event]) { self.eventsListeners[event] = []; }
      self.eventsListeners[event][method](handler);
    });
    return self;
  };

  SwiperClass.prototype.once = function once (events, handler, priority) {
    var self = this;
    if (typeof handler !== 'function') { return self; }
    function onceHandler() {
        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];

      handler.apply(self, args);
      self.off(events, onceHandler);
      if (onceHandler.f7proxy) {
        delete onceHandler.f7proxy;
      }
    }
    onceHandler.f7proxy = handler;
    return self.on(events, onceHandler, priority);
  };

  SwiperClass.prototype.off = function off (events, handler) {
    var self = this;
    if (!self.eventsListeners) { return self; }
    events.split(' ').forEach(function (event) {
      if (typeof handler === 'undefined') {
        self.eventsListeners[event] = [];
      } else if (self.eventsListeners[event] && self.eventsListeners[event].length) {
        self.eventsListeners[event].forEach(function (eventHandler, index) {
          if (eventHandler === handler || (eventHandler.f7proxy && eventHandler.f7proxy === handler)) {
            self.eventsListeners[event].splice(index, 1);
          }
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.emit = function emit () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

    var self = this;
    if (!self.eventsListeners) { return self; }
    var events;
    var data;
    var context;
    if (typeof args[0] === 'string' || Array.isArray(args[0])) {
      events = args[0];
      data = args.slice(1, args.length);
      context = self;
    } else {
      events = args[0].events;
      data = args[0].data;
      context = args[0].context || self;
    }
    var eventsArray = Array.isArray(events) ? events : events.split(' ');
    eventsArray.forEach(function (event) {
      if (self.eventsListeners && self.eventsListeners[event]) {
        var handlers = [];
        self.eventsListeners[event].forEach(function (eventHandler) {
          handlers.push(eventHandler);
        });
        handlers.forEach(function (eventHandler) {
          eventHandler.apply(context, data);
        });
      }
    });
    return self;
  };

  SwiperClass.prototype.useModulesParams = function useModulesParams (instanceParams) {
    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      // Extend params
      if (module.params) {
        Utils.extend(instanceParams, module.params);
      }
    });
  };

  SwiperClass.prototype.useModules = function useModules (modulesParams) {
      if ( modulesParams === void 0 ) modulesParams = {};

    var instance = this;
    if (!instance.modules) { return; }
    Object.keys(instance.modules).forEach(function (moduleName) {
      var module = instance.modules[moduleName];
      var moduleParams = modulesParams[moduleName] || {};
      // Extend instance methods and props
      if (module.instance) {
        Object.keys(module.instance).forEach(function (modulePropName) {
          var moduleProp = module.instance[modulePropName];
          if (typeof moduleProp === 'function') {
            instance[modulePropName] = moduleProp.bind(instance);
          } else {
            instance[modulePropName] = moduleProp;
          }
        });
      }
      // Add event listeners
      if (module.on && instance.on) {
        Object.keys(module.on).forEach(function (moduleEventName) {
          instance.on(moduleEventName, module.on[moduleEventName]);
        });
      }

      // Module create callback
      if (module.create) {
        module.create.bind(instance)(moduleParams);
      }
    });
  };

  staticAccessors.components.set = function (components) {
    var Class = this;
    if (!Class.use) { return; }
    Class.use(components);
  };

  SwiperClass.installModule = function installModule (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (!Class.prototype.modules) { Class.prototype.modules = {}; }
    var name = module.name || (((Object.keys(Class.prototype.modules).length) + "_" + (Utils.now())));
    Class.prototype.modules[name] = module;
    // Prototype
    if (module.proto) {
      Object.keys(module.proto).forEach(function (key) {
        Class.prototype[key] = module.proto[key];
      });
    }
    // Class
    if (module.static) {
      Object.keys(module.static).forEach(function (key) {
        Class[key] = module.static[key];
      });
    }
    // Callback
    if (module.install) {
      module.install.apply(Class, params);
    }
    return Class;
  };

  SwiperClass.use = function use (module) {
      var params = [], len = arguments.length - 1;
      while ( len-- > 0 ) params[ len ] = arguments[ len + 1 ];

    var Class = this;
    if (Array.isArray(module)) {
      module.forEach(function (m) { return Class.installModule(m); });
      return Class;
    }
    return Class.installModule.apply(Class, [ module ].concat( params ));
  };

  Object.defineProperties( SwiperClass, staticAccessors );

  function updateSize () {
    var swiper = this;
    var width;
    var height;
    var $el = swiper.$el;
    if (typeof swiper.params.width !== 'undefined') {
      width = swiper.params.width;
    } else {
      width = $el[0].clientWidth;
    }
    if (typeof swiper.params.height !== 'undefined') {
      height = swiper.params.height;
    } else {
      height = $el[0].clientHeight;
    }
    if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
      return;
    }

    // Subtract paddings
    width = width - parseInt($el.css('padding-left'), 10) - parseInt($el.css('padding-right'), 10);
    height = height - parseInt($el.css('padding-top'), 10) - parseInt($el.css('padding-bottom'), 10);

    Utils.extend(swiper, {
      width: width,
      height: height,
      size: swiper.isHorizontal() ? width : height,
    });
  }

  function updateSlides () {
    var swiper = this;
    var params = swiper.params;

    var $wrapperEl = swiper.$wrapperEl;
    var swiperSize = swiper.size;
    var rtl = swiper.rtlTranslate;
    var wrongRTL = swiper.wrongRTL;
    var isVirtual = swiper.virtual && params.virtual.enabled;
    var previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
    var slides = $wrapperEl.children(("." + (swiper.params.slideClass)));
    var slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
    var snapGrid = [];
    var slidesGrid = [];
    var slidesSizesGrid = [];

    function slidesForMargin(slideIndex) {
      if (!params.cssMode) { return true; }
      if (slideIndex === slides.length - 1) {
        return false;
      }
      return true;
    }

    var offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === 'function') {
      offsetBefore = params.slidesOffsetBefore.call(swiper);
    }

    var offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === 'function') {
      offsetAfter = params.slidesOffsetAfter.call(swiper);
    }

    var previousSnapGridLength = swiper.snapGrid.length;
    var previousSlidesGridLength = swiper.snapGrid.length;

    var spaceBetween = params.spaceBetween;
    var slidePosition = -offsetBefore;
    var prevSlideSize = 0;
    var index = 0;
    if (typeof swiperSize === 'undefined') {
      return;
    }
    if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
      spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
    }

    swiper.virtualSize = -spaceBetween;

    // reset margins
    if (rtl) { slides.css({ marginLeft: '', marginTop: '' }); }
    else { slides.css({ marginRight: '', marginBottom: '' }); }

    var slidesNumberEvenToRows;
    if (params.slidesPerColumn > 1) {
      if (Math.floor(slidesLength / params.slidesPerColumn) === slidesLength / swiper.params.slidesPerColumn) {
        slidesNumberEvenToRows = slidesLength;
      } else {
        slidesNumberEvenToRows = Math.ceil(slidesLength / params.slidesPerColumn) * params.slidesPerColumn;
      }
      if (params.slidesPerView !== 'auto' && params.slidesPerColumnFill === 'row') {
        slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, params.slidesPerView * params.slidesPerColumn);
      }
    }

    // Calc slides
    var slideSize;
    var slidesPerColumn = params.slidesPerColumn;
    var slidesPerRow = slidesNumberEvenToRows / slidesPerColumn;
    var numFullColumns = Math.floor(slidesLength / params.slidesPerColumn);
    for (var i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      var slide = slides.eq(i);
      if (params.slidesPerColumn > 1) {
        // Set slides order
        var newSlideOrderIndex = (void 0);
        var column = (void 0);
        var row = (void 0);
        if (params.slidesPerColumnFill === 'row' && params.slidesPerGroup > 1) {
          var groupIndex = Math.floor(i / (params.slidesPerGroup * params.slidesPerColumn));
          var slideIndexInGroup = i - params.slidesPerColumn * params.slidesPerGroup * groupIndex;

          row = Math.floor(slideIndexInGroup / params.slidesPerColumn);
          column = (slideIndexInGroup - row * params.slidesPerGroup) + groupIndex * params.slidesPerGroup;

          newSlideOrderIndex = column + ((row * slidesNumberEvenToRows) / slidesPerColumn);
          slide
            .css({
              '-webkit-box-ordinal-group': newSlideOrderIndex,
              '-moz-box-ordinal-group': newSlideOrderIndex,
              '-ms-flex-order': newSlideOrderIndex,
              '-webkit-order': newSlideOrderIndex,
              order: newSlideOrderIndex,
            });
        } else if (params.slidesPerColumnFill === 'column') {
          column = Math.floor(i / slidesPerColumn);
          row = i - (column * slidesPerColumn);
          if (column > numFullColumns || (column === numFullColumns && row === slidesPerColumn - 1)) {
            row += 1;
            if (row >= slidesPerColumn) {
              row = 0;
              column += 1;
            }
          }
        } else {
          row = Math.floor(i / slidesPerRow);
          column = i - (row * slidesPerRow);
        }
        slide.css(
          ("margin-" + (swiper.isHorizontal() ? 'top' : 'left')),
          (row !== 0 && params.spaceBetween) && (((params.spaceBetween) + "px"))
        );
      }
      if (slide.css('display') === 'none') { continue; } // eslint-disable-line

      if (params.slidesPerView === 'auto') {
        var slideStyles = win.getComputedStyle(slide[0], null);
        var currentTransform = slide[0].style.transform;
        var currentWebKitTransform = slide[0].style.webkitTransform;
        if (currentTransform) {
          slide[0].style.transform = 'none';
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = 'none';
        }
        if (params.roundLengths) {
          slideSize = swiper.isHorizontal()
            ? slide.outerWidth(true)
            : slide.outerHeight(true);
        } else {
          // eslint-disable-next-line
          if (swiper.isHorizontal()) {
            var width = parseFloat(slideStyles.getPropertyValue('width'));
            var paddingLeft = parseFloat(slideStyles.getPropertyValue('padding-left'));
            var paddingRight = parseFloat(slideStyles.getPropertyValue('padding-right'));
            var marginLeft = parseFloat(slideStyles.getPropertyValue('margin-left'));
            var marginRight = parseFloat(slideStyles.getPropertyValue('margin-right'));
            var boxSizing = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing && boxSizing === 'border-box') {
              slideSize = width + marginLeft + marginRight;
            } else {
              slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight;
            }
          } else {
            var height = parseFloat(slideStyles.getPropertyValue('height'));
            var paddingTop = parseFloat(slideStyles.getPropertyValue('padding-top'));
            var paddingBottom = parseFloat(slideStyles.getPropertyValue('padding-bottom'));
            var marginTop = parseFloat(slideStyles.getPropertyValue('margin-top'));
            var marginBottom = parseFloat(slideStyles.getPropertyValue('margin-bottom'));
            var boxSizing$1 = slideStyles.getPropertyValue('box-sizing');
            if (boxSizing$1 && boxSizing$1 === 'border-box') {
              slideSize = height + marginTop + marginBottom;
            } else {
              slideSize = height + paddingTop + paddingBottom + marginTop + marginBottom;
            }
          }
        }
        if (currentTransform) {
          slide[0].style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide[0].style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }
      } else {
        slideSize = (swiperSize - ((params.slidesPerView - 1) * spaceBetween)) / params.slidesPerView;
        if (params.roundLengths) { slideSize = Math.floor(slideSize); }

        if (slides[i]) {
          if (swiper.isHorizontal()) {
            slides[i].style.width = slideSize + "px";
          } else {
            slides[i].style.height = slideSize + "px";
          }
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);


      if (params.centeredSlides) {
        slidePosition = slidePosition + (slideSize / 2) + (prevSlideSize / 2) + spaceBetween;
        if (prevSlideSize === 0 && i !== 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (i === 0) { slidePosition = slidePosition - (swiperSize / 2) - spaceBetween; }
        if (Math.abs(slidePosition) < 1 / 1000) { slidePosition = 0; }
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths) { slidePosition = Math.floor(slidePosition); }
        if ((index) % params.slidesPerGroup === 0) { snapGrid.push(slidePosition); }
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }

      swiper.virtualSize += slideSize + spaceBetween;

      prevSlideSize = slideSize;

      index += 1;
    }
    swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;
    var newSlidesGrid;

    if (
      rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
      $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") });
    }
    if (params.setWrapperSize) {
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
    }

    if (params.slidesPerColumn > 1) {
      swiper.virtualSize = (slideSize + params.spaceBetween) * slidesNumberEvenToRows;
      swiper.virtualSize = Math.ceil(swiper.virtualSize / params.slidesPerColumn) - params.spaceBetween;
      if (swiper.isHorizontal()) { $wrapperEl.css({ width: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      else { $wrapperEl.css({ height: ((swiper.virtualSize + params.spaceBetween) + "px") }); }
      if (params.centeredSlides) {
        newSlidesGrid = [];
        for (var i$1 = 0; i$1 < snapGrid.length; i$1 += 1) {
          var slidesGridItem = snapGrid[i$1];
          if (params.roundLengths) { slidesGridItem = Math.floor(slidesGridItem); }
          if (snapGrid[i$1] < swiper.virtualSize + snapGrid[0]) { newSlidesGrid.push(slidesGridItem); }
        }
        snapGrid = newSlidesGrid;
      }
    }

    // Remove last grid elements depending on width
    if (!params.centeredSlides) {
      newSlidesGrid = [];
      for (var i$2 = 0; i$2 < snapGrid.length; i$2 += 1) {
        var slidesGridItem$1 = snapGrid[i$2];
        if (params.roundLengths) { slidesGridItem$1 = Math.floor(slidesGridItem$1); }
        if (snapGrid[i$2] <= swiper.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem$1);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper.virtualSize - swiperSize);
      }
    }
    if (snapGrid.length === 0) { snapGrid = [0]; }

    if (params.spaceBetween !== 0) {
      if (swiper.isHorizontal()) {
        if (rtl) { slides.filter(slidesForMargin).css({ marginLeft: (spaceBetween + "px") }); }
        else { slides.filter(slidesForMargin).css({ marginRight: (spaceBetween + "px") }); }
      } else { slides.filter(slidesForMargin).css({ marginBottom: (spaceBetween + "px") }); }
    }

    if (params.centerInsufficientSlides) {
      var allSlidesSize = 0;
      slidesSizesGrid.forEach(function (slideSizeValue) {
        allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
      });
      allSlidesSize -= params.spaceBetween;
      if (allSlidesSize < swiperSize) {
        var allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach(function (snap, snapIndex) {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach(function (snap, snapIndex) {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }

    Utils.extend(swiper, {
      slides: slides,
      snapGrid: snapGrid,
      slidesGrid: slidesGrid,
      slidesSizesGrid: slidesSizesGrid,
    });

    if (slidesLength !== previousSlidesLength) {
      swiper.emit('slidesLengthChange');
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper.params.watchOverflow) { swiper.checkOverflow(); }
      swiper.emit('snapGridLengthChange');
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper.emit('slidesGridLengthChange');
    }

    if (params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateSlidesOffset();
    }
  }

  function updateAutoHeight (speed) {
    var swiper = this;
    var activeSlides = [];
    var newHeight = 0;
    var i;
    if (typeof speed === 'number') {
      swiper.setTransition(speed);
    } else if (speed === true) {
      swiper.setTransition(swiper.params.speed);
    }
    // Find slides currently in view
    if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
      for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
        var index = swiper.activeIndex + i;
        if (index > swiper.slides.length) { break; }
        activeSlides.push(swiper.slides.eq(index)[0]);
      }
    } else {
      activeSlides.push(swiper.slides.eq(swiper.activeIndex)[0]);
    }

    // Find new height from highest slide in view
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== 'undefined') {
        var height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }

    // Update Height
    if (newHeight) { swiper.$wrapperEl.css('height', (newHeight + "px")); }
  }

  function updateSlidesOffset () {
    var swiper = this;
    var slides = swiper.slides;
    for (var i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
    }
  }

  function updateSlidesProgress (translate) {
    if ( translate === void 0 ) translate = (this && this.translate) || 0;

    var swiper = this;
    var params = swiper.params;

    var slides = swiper.slides;
    var rtl = swiper.rtlTranslate;

    if (slides.length === 0) { return; }
    if (typeof slides[0].swiperSlideOffset === 'undefined') { swiper.updateSlidesOffset(); }

    var offsetCenter = -translate;
    if (rtl) { offsetCenter = translate; }

    // Visible Slides
    slides.removeClass(params.slideVisibleClass);

    swiper.visibleSlidesIndexes = [];
    swiper.visibleSlides = [];

    for (var i = 0; i < slides.length; i += 1) {
      var slide = slides[i];
      var slideProgress = (
        (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0)) - slide.swiperSlideOffset
      ) / (slide.swiperSlideSize + params.spaceBetween);
      if (params.watchSlidesVisibility) {
        var slideBefore = -(offsetCenter - slide.swiperSlideOffset);
        var slideAfter = slideBefore + swiper.slidesSizesGrid[i];
        var isVisible = (slideBefore >= 0 && slideBefore < swiper.size - 1)
                  || (slideAfter > 1 && slideAfter <= swiper.size)
                  || (slideBefore <= 0 && slideAfter >= swiper.size);
        if (isVisible) {
          swiper.visibleSlides.push(slide);
          swiper.visibleSlidesIndexes.push(i);
          slides.eq(i).addClass(params.slideVisibleClass);
        }
      }
      slide.progress = rtl ? -slideProgress : slideProgress;
    }
    swiper.visibleSlides = $(swiper.visibleSlides);
  }

  function updateProgress (translate) {
    var swiper = this;
    if (typeof translate === 'undefined') {
      var multiplier = swiper.rtlTranslate ? -1 : 1;
      // eslint-disable-next-line
      translate = (swiper && swiper.translate && (swiper.translate * multiplier)) || 0;
    }
    var params = swiper.params;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    var progress = swiper.progress;
    var isBeginning = swiper.isBeginning;
    var isEnd = swiper.isEnd;
    var wasBeginning = isBeginning;
    var wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate - swiper.minTranslate()) / (translatesDiff);
      isBeginning = progress <= 0;
      isEnd = progress >= 1;
    }
    Utils.extend(swiper, {
      progress: progress,
      isBeginning: isBeginning,
      isEnd: isEnd,
    });

    if (params.watchSlidesProgress || params.watchSlidesVisibility) { swiper.updateSlidesProgress(translate); }

    if (isBeginning && !wasBeginning) {
      swiper.emit('reachBeginning toEdge');
    }
    if (isEnd && !wasEnd) {
      swiper.emit('reachEnd toEdge');
    }
    if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
      swiper.emit('fromEdge');
    }

    swiper.emit('progress', progress);
  }

  function updateSlidesClasses () {
    var swiper = this;

    var slides = swiper.slides;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;
    var realIndex = swiper.realIndex;
    var isVirtual = swiper.virtual && params.virtual.enabled;

    slides.removeClass(((params.slideActiveClass) + " " + (params.slideNextClass) + " " + (params.slidePrevClass) + " " + (params.slideDuplicateActiveClass) + " " + (params.slideDuplicateNextClass) + " " + (params.slideDuplicatePrevClass)));

    var activeSlide;
    if (isVirtual) {
      activeSlide = swiper.$wrapperEl.find(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + activeIndex + "\"]"));
    } else {
      activeSlide = slides.eq(activeIndex);
    }

    // Active classes
    activeSlide.addClass(params.slideActiveClass);

    if (params.loop) {
      // Duplicate to all looped slides
      if (activeSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]"))
          .addClass(params.slideDuplicateActiveClass);
      }
    }
    // Next Slide
    var nextSlide = activeSlide.nextAll(("." + (params.slideClass))).eq(0).addClass(params.slideNextClass);
    if (params.loop && nextSlide.length === 0) {
      nextSlide = slides.eq(0);
      nextSlide.addClass(params.slideNextClass);
    }
    // Prev Slide
    var prevSlide = activeSlide.prevAll(("." + (params.slideClass))).eq(0).addClass(params.slidePrevClass);
    if (params.loop && prevSlide.length === 0) {
      prevSlide = slides.eq(-1);
      prevSlide.addClass(params.slidePrevClass);
    }
    if (params.loop) {
      // Duplicate to all looped slides
      if (nextSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (nextSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicateNextClass);
      }
      if (prevSlide.hasClass(params.slideDuplicateClass)) {
        $wrapperEl
          .children(("." + (params.slideClass) + ":not(." + (params.slideDuplicateClass) + ")[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      } else {
        $wrapperEl
          .children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + (prevSlide.attr('data-swiper-slide-index')) + "\"]"))
          .addClass(params.slideDuplicatePrevClass);
      }
    }
  }

  function updateActiveIndex (newActiveIndex) {
    var swiper = this;
    var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var params = swiper.params;
    var previousIndex = swiper.activeIndex;
    var previousRealIndex = swiper.realIndex;
    var previousSnapIndex = swiper.snapIndex;
    var activeIndex = newActiveIndex;
    var snapIndex;
    if (typeof activeIndex === 'undefined') {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (typeof slidesGrid[i + 1] !== 'undefined') {
          if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - ((slidesGrid[i + 1] - slidesGrid[i]) / 2)) {
            activeIndex = i;
          } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
            activeIndex = i + 1;
          }
        } else if (translate >= slidesGrid[i]) {
          activeIndex = i;
        }
      }
      // Normalize slideIndex
      if (params.normalizeSlideIndex) {
        if (activeIndex < 0 || typeof activeIndex === 'undefined') { activeIndex = 0; }
      }
    }
    if (snapGrid.indexOf(translate) >= 0) {
      snapIndex = snapGrid.indexOf(translate);
    } else {
      snapIndex = Math.floor(activeIndex / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }
    if (activeIndex === previousIndex) {
      if (snapIndex !== previousSnapIndex) {
        swiper.snapIndex = snapIndex;
        swiper.emit('snapIndexChange');
      }
      return;
    }

    // Get real index
    var realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);

    Utils.extend(swiper, {
      snapIndex: snapIndex,
      realIndex: realIndex,
      previousIndex: previousIndex,
      activeIndex: activeIndex,
    });
    swiper.emit('activeIndexChange');
    swiper.emit('snapIndexChange');
    if (previousRealIndex !== realIndex) {
      swiper.emit('realIndexChange');
    }
    if (swiper.initialized || swiper.runCallbacksOnInit) {
      swiper.emit('slideChange');
    }
  }

  function updateClickedSlide (e) {
    var swiper = this;
    var params = swiper.params;
    var slide = $(e.target).closest(("." + (params.slideClass)))[0];
    var slideFound = false;
    if (slide) {
      for (var i = 0; i < swiper.slides.length; i += 1) {
        if (swiper.slides[i] === slide) { slideFound = true; }
      }
    }

    if (slide && slideFound) {
      swiper.clickedSlide = slide;
      if (swiper.virtual && swiper.params.virtual.enabled) {
        swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
      } else {
        swiper.clickedIndex = $(slide).index();
      }
    } else {
      swiper.clickedSlide = undefined;
      swiper.clickedIndex = undefined;
      return;
    }
    if (params.slideToClickedSlide && swiper.clickedIndex !== undefined && swiper.clickedIndex !== swiper.activeIndex) {
      swiper.slideToClickedSlide();
    }
  }

  var update = {
    updateSize: updateSize,
    updateSlides: updateSlides,
    updateAutoHeight: updateAutoHeight,
    updateSlidesOffset: updateSlidesOffset,
    updateSlidesProgress: updateSlidesProgress,
    updateProgress: updateProgress,
    updateSlidesClasses: updateSlidesClasses,
    updateActiveIndex: updateActiveIndex,
    updateClickedSlide: updateClickedSlide,
  };

  function getTranslate (axis) {
    if ( axis === void 0 ) axis = this.isHorizontal() ? 'x' : 'y';

    var swiper = this;

    var params = swiper.params;
    var rtl = swiper.rtlTranslate;
    var translate = swiper.translate;
    var $wrapperEl = swiper.$wrapperEl;

    if (params.virtualTranslate) {
      return rtl ? -translate : translate;
    }
    if (params.cssMode) {
      return translate;
    }

    var currentTranslate = Utils.getTranslate($wrapperEl[0], axis);
    if (rtl) { currentTranslate = -currentTranslate; }

    return currentTranslate || 0;
  }

  function setTranslate (translate, byController) {
    var swiper = this;
    var rtl = swiper.rtlTranslate;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var wrapperEl = swiper.wrapperEl;
    var progress = swiper.progress;
    var x = 0;
    var y = 0;
    var z = 0;

    if (swiper.isHorizontal()) {
      x = rtl ? -translate : translate;
    } else {
      y = translate;
    }

    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }

    if (params.cssMode) {
      wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      $wrapperEl.transform(("translate3d(" + x + "px, " + y + "px, " + z + "px)"));
    }
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? x : y;

    // Check if we need to update progress
    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== progress) {
      swiper.updateProgress(translate);
    }

    swiper.emit('setTranslate', swiper.translate, byController);
  }

  function minTranslate () {
    return (-this.snapGrid[0]);
  }

  function maxTranslate () {
    return (-this.snapGrid[this.snapGrid.length - 1]);
  }

  var translate = {
    getTranslate: getTranslate,
    setTranslate: setTranslate,
    minTranslate: minTranslate,
    maxTranslate: maxTranslate,
  };

  function setTransition (duration, byController) {
    var swiper = this;

    if (!swiper.params.cssMode) {
      swiper.$wrapperEl.transition(duration);
    }

    swiper.emit('setTransition', duration, byController);
  }

  function transitionStart (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var params = swiper.params;
    var previousIndex = swiper.previousIndex;
    if (params.cssMode) { return; }
    if (params.autoHeight) {
      swiper.updateAutoHeight();
    }

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionStart');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionStart');
        return;
      }
      swiper.emit('slideChangeTransitionStart');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionStart');
      } else {
        swiper.emit('slidePrevTransitionStart');
      }
    }
  }

  function transitionEnd$1 (runCallbacks, direction) {
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var previousIndex = swiper.previousIndex;
    var params = swiper.params;
    swiper.animating = false;
    if (params.cssMode) { return; }
    swiper.setTransition(0);

    var dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex) { dir = 'next'; }
      else if (activeIndex < previousIndex) { dir = 'prev'; }
      else { dir = 'reset'; }
    }

    swiper.emit('transitionEnd');

    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === 'reset') {
        swiper.emit('slideResetTransitionEnd');
        return;
      }
      swiper.emit('slideChangeTransitionEnd');
      if (dir === 'next') {
        swiper.emit('slideNextTransitionEnd');
      } else {
        swiper.emit('slidePrevTransitionEnd');
      }
    }
  }

  var transition$1 = {
    setTransition: setTransition,
    transitionStart: transitionStart,
    transitionEnd: transitionEnd$1,
  };

  function slideTo (index, speed, runCallbacks, internal) {
    var obj;

    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;
    var swiper = this;
    var slideIndex = index;
    if (slideIndex < 0) { slideIndex = 0; }

    var params = swiper.params;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var previousIndex = swiper.previousIndex;
    var activeIndex = swiper.activeIndex;
    var rtl = swiper.rtlTranslate;
    var wrapperEl = swiper.wrapperEl;
    if (swiper.animating && params.preventInteractionOnTransition) {
      return false;
    }

    var snapIndex = Math.floor(slideIndex / params.slidesPerGroup);
    if (snapIndex >= snapGrid.length) { snapIndex = snapGrid.length - 1; }

    if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
      swiper.emit('beforeSlideChangeStart');
    }

    var translate = -snapGrid[snapIndex];

    // Update progress
    swiper.updateProgress(translate);

    // Normalize slideIndex
    if (params.normalizeSlideIndex) {
      for (var i = 0; i < slidesGrid.length; i += 1) {
        if (-Math.floor(translate * 100) >= Math.floor(slidesGrid[i] * 100)) {
          slideIndex = i;
        }
      }
    }
    // Directions locks
    if (swiper.initialized && slideIndex !== activeIndex) {
      if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
        return false;
      }
      if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) { return false; }
      }
    }

    var direction;
    if (slideIndex > activeIndex) { direction = 'next'; }
    else if (slideIndex < activeIndex) { direction = 'prev'; }
    else { direction = 'reset'; }


    // Update Index
    if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
      swiper.updateActiveIndex(slideIndex);
      // Update Height
      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
      swiper.updateSlidesClasses();
      if (params.effect !== 'slide') {
        swiper.setTranslate(translate);
      }
      if (direction !== 'reset') {
        swiper.transitionStart(runCallbacks, direction);
        swiper.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      var isH = swiper.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -translate;
      } else {
        // eslint-disable-next-line
        if (wrapperEl.scrollTo) {
          wrapperEl.scrollTo(( obj = {}, obj[isH ? 'left' : 'top'] = -translate, obj.behavior = 'smooth', obj ));
        } else {
          wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -translate;
        }
      }
      return true;
    }

    if (speed === 0) {
      swiper.setTransition(0);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      swiper.transitionEnd(runCallbacks, direction);
    } else {
      swiper.setTransition(speed);
      swiper.setTranslate(translate);
      swiper.updateActiveIndex(slideIndex);
      swiper.updateSlidesClasses();
      swiper.emit('beforeTransitionStart', speed, internal);
      swiper.transitionStart(runCallbacks, direction);
      if (!swiper.animating) {
        swiper.animating = true;
        if (!swiper.onSlideToWrapperTransitionEnd) {
          swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
            if (!swiper || swiper.destroyed) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
            swiper.onSlideToWrapperTransitionEnd = null;
            delete swiper.onSlideToWrapperTransitionEnd;
            swiper.transitionEnd(runCallbacks, direction);
          };
        }
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
      }
    }

    return true;
  }

  function slideToLoop (index, speed, runCallbacks, internal) {
    if ( index === void 0 ) index = 0;
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var newIndex = index;
    if (swiper.params.loop) {
      newIndex += swiper.loopedSlides;
    }

    return swiper.slideTo(newIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideNext (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
      return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
    }
    return swiper.slideTo(swiper.activeIndex + params.slidesPerGroup, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slidePrev (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var params = swiper.params;
    var animating = swiper.animating;
    var snapGrid = swiper.snapGrid;
    var slidesGrid = swiper.slidesGrid;
    var rtlTranslate = swiper.rtlTranslate;

    if (params.loop) {
      if (animating) { return false; }
      swiper.loopFix();
      // eslint-disable-next-line
      swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
    }
    var translate = rtlTranslate ? swiper.translate : -swiper.translate;
    function normalize(val) {
      if (val < 0) { return -Math.floor(Math.abs(val)); }
      return Math.floor(val);
    }
    var normalizedTranslate = normalize(translate);
    var normalizedSnapGrid = snapGrid.map(function (val) { return normalize(val); });
    var normalizedSlidesGrid = slidesGrid.map(function (val) { return normalize(val); });

    var currentSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate)];
    var prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === 'undefined' && params.cssMode) {
      snapGrid.forEach(function (snap) {
        if (!prevSnap && normalizedTranslate >= snap) { prevSnap = snap; }
      });
    }
    var prevIndex;
    if (typeof prevSnap !== 'undefined') {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0) { prevIndex = swiper.activeIndex - 1; }
    }
    return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideReset (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
  }

  /* eslint no-unused-vars: "off" */
  function slideToClosest (speed, runCallbacks, internal) {
    if ( speed === void 0 ) speed = this.params.speed;
    if ( runCallbacks === void 0 ) runCallbacks = true;

    var swiper = this;
    var index = swiper.activeIndex;
    var snapIndex = Math.floor(index / swiper.params.slidesPerGroup);

    if (snapIndex < swiper.snapGrid.length - 1) {
      var translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

      var currentSnap = swiper.snapGrid[snapIndex];
      var nextSnap = swiper.snapGrid[snapIndex + 1];

      if ((translate - currentSnap) > (nextSnap - currentSnap) / 2) {
        index = swiper.params.slidesPerGroup;
      }
    }

    return swiper.slideTo(index, speed, runCallbacks, internal);
  }

  function slideToClickedSlide () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;

    var slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
    var slideToIndex = swiper.clickedIndex;
    var realIndex;
    if (params.loop) {
      if (swiper.animating) { return; }
      realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      if (params.centeredSlides) {
        if (
          (slideToIndex < swiper.loopedSlides - (slidesPerView / 2))
          || (slideToIndex > (swiper.slides.length - swiper.loopedSlides) + (slidesPerView / 2))
        ) {
          swiper.loopFix();
          slideToIndex = $wrapperEl
            .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
            .eq(0)
            .index();

          Utils.nextTick(function () {
            swiper.slideTo(slideToIndex);
          });
        } else {
          swiper.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper.slides.length - slidesPerView) {
        swiper.loopFix();
        slideToIndex = $wrapperEl
          .children(("." + (params.slideClass) + "[data-swiper-slide-index=\"" + realIndex + "\"]:not(." + (params.slideDuplicateClass) + ")"))
          .eq(0)
          .index();

        Utils.nextTick(function () {
          swiper.slideTo(slideToIndex);
        });
      } else {
        swiper.slideTo(slideToIndex);
      }
    } else {
      swiper.slideTo(slideToIndex);
    }
  }

  var slide = {
    slideTo: slideTo,
    slideToLoop: slideToLoop,
    slideNext: slideNext,
    slidePrev: slidePrev,
    slideReset: slideReset,
    slideToClosest: slideToClosest,
    slideToClickedSlide: slideToClickedSlide,
  };

  function loopCreate () {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    // Remove duplicated slides
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass))).remove();

    var slides = $wrapperEl.children(("." + (params.slideClass)));

    if (params.loopFillGroupWithBlank) {
      var blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);
      if (blankSlidesNum !== params.slidesPerGroup) {
        for (var i = 0; i < blankSlidesNum; i += 1) {
          var blankNode = $(doc.createElement('div')).addClass(((params.slideClass) + " " + (params.slideBlankClass)));
          $wrapperEl.append(blankNode);
        }
        slides = $wrapperEl.children(("." + (params.slideClass)));
      }
    }

    if (params.slidesPerView === 'auto' && !params.loopedSlides) { params.loopedSlides = slides.length; }

    swiper.loopedSlides = parseInt(params.loopedSlides || params.slidesPerView, 10);
    swiper.loopedSlides += params.loopAdditionalSlides;
    if (swiper.loopedSlides > slides.length) {
      swiper.loopedSlides = slides.length;
    }

    var prependSlides = [];
    var appendSlides = [];
    slides.each(function (index, el) {
      var slide = $(el);
      if (index < swiper.loopedSlides) { appendSlides.push(el); }
      if (index < slides.length && index >= slides.length - swiper.loopedSlides) { prependSlides.push(el); }
      slide.attr('data-swiper-slide-index', index);
    });
    for (var i$1 = 0; i$1 < appendSlides.length; i$1 += 1) {
      $wrapperEl.append($(appendSlides[i$1].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
    for (var i$2 = prependSlides.length - 1; i$2 >= 0; i$2 -= 1) {
      $wrapperEl.prepend($(prependSlides[i$2].cloneNode(true)).addClass(params.slideDuplicateClass));
    }
  }

  function loopFix () {
    var swiper = this;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var slides = swiper.slides;
    var loopedSlides = swiper.loopedSlides;
    var allowSlidePrev = swiper.allowSlidePrev;
    var allowSlideNext = swiper.allowSlideNext;
    var snapGrid = swiper.snapGrid;
    var rtl = swiper.rtlTranslate;
    var newIndex;
    swiper.allowSlidePrev = true;
    swiper.allowSlideNext = true;

    var snapTranslate = -snapGrid[activeIndex];
    var diff = snapTranslate - swiper.getTranslate();


    // Fix For Negative Oversliding
    if (activeIndex < loopedSlides) {
      newIndex = (slides.length - (loopedSlides * 3)) + activeIndex;
      newIndex += loopedSlides;
      var slideChanged = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    } else if ((params.slidesPerView === 'auto' && activeIndex >= loopedSlides * 2) || (activeIndex >= slides.length - loopedSlides)) {
      // Fix For Positive Oversliding
      newIndex = -slides.length + activeIndex + loopedSlides;
      newIndex += loopedSlides;
      var slideChanged$1 = swiper.slideTo(newIndex, 0, false, true);
      if (slideChanged$1 && diff !== 0) {
        swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
      }
    }
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;
  }

  function loopDestroy () {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var slides = swiper.slides;
    $wrapperEl.children(("." + (params.slideClass) + "." + (params.slideDuplicateClass) + ",." + (params.slideClass) + "." + (params.slideBlankClass))).remove();
    slides.removeAttr('data-swiper-slide-index');
  }

  var loop = {
    loopCreate: loopCreate,
    loopFix: loopFix,
    loopDestroy: loopDestroy,
  };

  function setGrabCursor (moving) {
    var swiper = this;
    if (Support.touch || !swiper.params.simulateTouch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
    var el = swiper.el;
    el.style.cursor = 'move';
    el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
    el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
    el.style.cursor = moving ? 'grabbing' : 'grab';
  }

  function unsetGrabCursor () {
    var swiper = this;
    if (Support.touch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) { return; }
    swiper.el.style.cursor = '';
  }

  var grabCursor = {
    setGrabCursor: setGrabCursor,
    unsetGrabCursor: unsetGrabCursor,
  };

  function appendSlide (slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    if (params.loop) {
      swiper.loopDestroy();
    }
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.append(slides[i]); }
      }
    } else {
      $wrapperEl.append(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
  }

  function prependSlide (slides) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    if (params.loop) {
      swiper.loopDestroy();
    }
    var newActiveIndex = activeIndex + 1;
    if (typeof slides === 'object' && 'length' in slides) {
      for (var i = 0; i < slides.length; i += 1) {
        if (slides[i]) { $wrapperEl.prepend(slides[i]); }
      }
      newActiveIndex = activeIndex + slides.length;
    } else {
      $wrapperEl.prepend(slides);
    }
    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    swiper.slideTo(newActiveIndex, 0, false);
  }

  function addSlide (index, slides) {
    var swiper = this;
    var $wrapperEl = swiper.$wrapperEl;
    var params = swiper.params;
    var activeIndex = swiper.activeIndex;
    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var baseLength = swiper.slides.length;
    if (index <= 0) {
      swiper.prependSlide(slides);
      return;
    }
    if (index >= baseLength) {
      swiper.appendSlide(slides);
      return;
    }
    var newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;

    var slidesBuffer = [];
    for (var i = baseLength - 1; i >= index; i -= 1) {
      var currentSlide = swiper.slides.eq(i);
      currentSlide.remove();
      slidesBuffer.unshift(currentSlide);
    }

    if (typeof slides === 'object' && 'length' in slides) {
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (slides[i$1]) { $wrapperEl.append(slides[i$1]); }
      }
      newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
    } else {
      $wrapperEl.append(slides);
    }

    for (var i$2 = 0; i$2 < slidesBuffer.length; i$2 += 1) {
      $wrapperEl.append(slidesBuffer[i$2]);
    }

    if (params.loop) {
      swiper.loopCreate();
    }
    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeSlide (slidesIndexes) {
    var swiper = this;
    var params = swiper.params;
    var $wrapperEl = swiper.$wrapperEl;
    var activeIndex = swiper.activeIndex;

    var activeIndexBuffer = activeIndex;
    if (params.loop) {
      activeIndexBuffer -= swiper.loopedSlides;
      swiper.loopDestroy();
      swiper.slides = $wrapperEl.children(("." + (params.slideClass)));
    }
    var newActiveIndex = activeIndexBuffer;
    var indexToRemove;

    if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
      for (var i = 0; i < slidesIndexes.length; i += 1) {
        indexToRemove = slidesIndexes[i];
        if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
        if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      }
      newActiveIndex = Math.max(newActiveIndex, 0);
    } else {
      indexToRemove = slidesIndexes;
      if (swiper.slides[indexToRemove]) { swiper.slides.eq(indexToRemove).remove(); }
      if (indexToRemove < newActiveIndex) { newActiveIndex -= 1; }
      newActiveIndex = Math.max(newActiveIndex, 0);
    }

    if (params.loop) {
      swiper.loopCreate();
    }

    if (!(params.observer && Support.observer)) {
      swiper.update();
    }
    if (params.loop) {
      swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
    } else {
      swiper.slideTo(newActiveIndex, 0, false);
    }
  }

  function removeAllSlides () {
    var swiper = this;

    var slidesIndexes = [];
    for (var i = 0; i < swiper.slides.length; i += 1) {
      slidesIndexes.push(i);
    }
    swiper.removeSlide(slidesIndexes);
  }

  var manipulation = {
    appendSlide: appendSlide,
    prependSlide: prependSlide,
    addSlide: addSlide,
    removeSlide: removeSlide,
    removeAllSlides: removeAllSlides,
  };

  var Device = (function Device() {
    var ua = win.navigator.userAgent;

    var device = {
      ios: false,
      android: false,
      androidChrome: false,
      desktop: false,
      windows: false,
      iphone: false,
      ipod: false,
      ipad: false,
      cordova: win.cordova || win.phonegap,
      phonegap: win.cordova || win.phonegap,
    };

    var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line
    var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);


    // Windows
    if (windows) {
      device.os = 'windows';
      device.osVersion = windows[2];
      device.windows = true;
    }
    // Android
    if (android && !windows) {
      device.os = 'android';
      device.osVersion = android[2];
      device.android = true;
      device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
    }
    if (ipad || iphone || ipod) {
      device.os = 'ios';
      device.ios = true;
    }
    // iOS
    if (iphone && !ipod) {
      device.osVersion = iphone[2].replace(/_/g, '.');
      device.iphone = true;
    }
    if (ipad) {
      device.osVersion = ipad[2].replace(/_/g, '.');
      device.ipad = true;
    }
    if (ipod) {
      device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
      device.iphone = true;
    }
    // iOS 8+ changed UA
    if (device.ios && device.osVersion && ua.indexOf('Version/') >= 0) {
      if (device.osVersion.split('.')[0] === '10') {
        device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
      }
    }

    // Desktop
    device.desktop = !(device.os || device.android || device.webView);

    // Webview
    device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);

    // Minimal UI
    if (device.os && device.os === 'ios') {
      var osVersionArr = device.osVersion.split('.');
      var metaViewport = doc.querySelector('meta[name="viewport"]');
      device.minimalUi = !device.webView
        && (ipod || iphone)
        && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7)
        && metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
    }

    // Pixel Ratio
    device.pixelRatio = win.devicePixelRatio || 1;

    // Export object
    return device;
  }());

  function onTouchStart (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;

    if (swiper.animating && params.preventInteractionOnTransition) {
      return;
    }
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    var $targetEl = $(e.target);

    if (params.touchEventsTarget === 'wrapper') {
      if (!$targetEl.closest(swiper.wrapperEl).length) { return; }
    }
    data.isTouchEvent = e.type === 'touchstart';
    if (!data.isTouchEvent && 'which' in e && e.which === 3) { return; }
    if (!data.isTouchEvent && 'button' in e && e.button > 0) { return; }
    if (data.isTouched && data.isMoved) { return; }
    if (params.noSwiping && $targetEl.closest(params.noSwipingSelector ? params.noSwipingSelector : ("." + (params.noSwipingClass)))[0]) {
      swiper.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!$targetEl.closest(params.swipeHandler)[0]) { return; }
    }

    touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
    touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    var startX = touches.currentX;
    var startY = touches.currentY;

    // Do NOT start if iOS edge swipe is detected. Otherwise iOS app (UIWebView) cannot swipe-to-go-back anymore

    var edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
    var edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;
    if (
      edgeSwipeDetection
      && ((startX <= edgeSwipeThreshold)
      || (startX >= win.screen.width - edgeSwipeThreshold))
    ) {
      return;
    }

    Utils.extend(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: undefined,
      startMoving: undefined,
    });

    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = Utils.now();
    swiper.allowClick = true;
    swiper.updateSize();
    swiper.swipeDirection = undefined;
    if (params.threshold > 0) { data.allowThresholdMove = false; }
    if (e.type !== 'touchstart') {
      var preventDefault = true;
      if ($targetEl.is(data.formElements)) { preventDefault = false; }
      if (
        doc.activeElement
        && $(doc.activeElement).is(data.formElements)
        && doc.activeElement !== $targetEl[0]
      ) {
        doc.activeElement.blur();
      }

      var shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;
      if (params.touchStartForcePreventDefault || shouldPreventDefault) {
        e.preventDefault();
      }
    }
    swiper.emit('touchStart', e);
  }

  function onTouchMove (event) {
    var swiper = this;
    var data = swiper.touchEventsData;
    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper.emit('touchMoveOpposite', e);
      }
      return;
    }
    if (data.isTouchEvent && e.type === 'mousemove') { return; }
    var pageX = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
    var pageY = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper.allowTouchMove) {
      // isMoved = true;
      swiper.allowClick = false;
      if (data.isTouched) {
        Utils.extend(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY,
        });
        data.touchStartTime = Utils.now();
      }
      return;
    }
    if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
      if (swiper.isVertical()) {
        // Vertical
        if (
          (pageY < touches.startY && swiper.translate <= swiper.maxTranslate())
          || (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
        ) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (
        (pageX < touches.startX && swiper.translate <= swiper.maxTranslate())
        || (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
      ) {
        return;
      }
    }
    if (data.isTouchEvent && doc.activeElement) {
      if (e.target === doc.activeElement && $(e.target).is(data.formElements)) {
        data.isMoved = true;
        swiper.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchMove', e);
    }
    if (e.targetTouches && e.targetTouches.length > 1) { return; }

    touches.currentX = pageX;
    touches.currentY = pageY;

    var diffX = touches.currentX - touches.startX;
    var diffY = touches.currentY - touches.startY;
    if (swiper.params.threshold && Math.sqrt((Math.pow( diffX, 2 )) + (Math.pow( diffY, 2 ))) < swiper.params.threshold) { return; }

    if (typeof data.isScrolling === 'undefined') {
      var touchAngle;
      if ((swiper.isHorizontal() && touches.currentY === touches.startY) || (swiper.isVertical() && touches.currentX === touches.startX)) {
        data.isScrolling = false;
      } else {
        // eslint-disable-next-line
        if ((diffX * diffX) + (diffY * diffY) >= 25) {
          touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
          data.isScrolling = swiper.isHorizontal() ? touchAngle > params.touchAngle : (90 - touchAngle > params.touchAngle);
        }
      }
    }
    if (data.isScrolling) {
      swiper.emit('touchMoveOpposite', e);
    }
    if (typeof data.startMoving === 'undefined') {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper.allowClick = false;
    if (!params.cssMode) {
      e.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }

    if (!data.isMoved) {
      if (params.loop) {
        swiper.loopFix();
      }
      data.startTranslate = swiper.getTranslate();
      swiper.setTransition(0);
      if (swiper.animating) {
        swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
      }
      data.allowMomentumBounce = false;
      // Grab Cursor
      if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
        swiper.setGrabCursor(true);
      }
      swiper.emit('sliderFirstMove', e);
    }
    swiper.emit('sliderMove', e);
    data.isMoved = true;

    var diff = swiper.isHorizontal() ? diffX : diffY;
    touches.diff = diff;

    diff *= params.touchRatio;
    if (rtl) { diff = -diff; }

    swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
    data.currentTranslate = diff + data.startTranslate;

    var disableParentSwiper = true;
    var resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if ((diff > 0 && data.currentTranslate > swiper.minTranslate())) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.minTranslate() - 1) + (Math.pow( (-swiper.minTranslate() + data.startTranslate + diff), resistanceRatio )); }
    } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
      disableParentSwiper = false;
      if (params.resistance) { data.currentTranslate = (swiper.maxTranslate() + 1) - (Math.pow( (swiper.maxTranslate() - data.startTranslate - diff), resistanceRatio )); }
    }

    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }

    // Directions locks
    if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }


    // Threshold
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }

    if (!params.followFinger || params.cssMode) { return; }

    // Update active index in free mode
    if (params.freeMode || params.watchSlidesProgress || params.watchSlidesVisibility) {
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    }
    if (params.freeMode) {
      // Velocity
      if (data.velocities.length === 0) {
        data.velocities.push({
          position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
          time: data.touchStartTime,
        });
      }
      data.velocities.push({
        position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
        time: Utils.now(),
      });
    }
    // Update progress
    swiper.updateProgress(data.currentTranslate);
    // Update translate
    swiper.setTranslate(data.currentTranslate);
  }

  function onTouchEnd (event) {
    var swiper = this;
    var data = swiper.touchEventsData;

    var params = swiper.params;
    var touches = swiper.touches;
    var rtl = swiper.rtlTranslate;
    var $wrapperEl = swiper.$wrapperEl;
    var slidesGrid = swiper.slidesGrid;
    var snapGrid = swiper.snapGrid;
    var e = event;
    if (e.originalEvent) { e = e.originalEvent; }
    if (data.allowTouchCallbacks) {
      swiper.emit('touchEnd', e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    // Return Grab Cursor
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
      swiper.setGrabCursor(false);
    }

    // Time diff
    var touchEndTime = Utils.now();
    var timeDiff = touchEndTime - data.touchStartTime;

    // Tap, doubleTap, Click
    if (swiper.allowClick) {
      swiper.updateClickedSlide(e);
      swiper.emit('tap click', e);
      if (timeDiff < 300 && (touchEndTime - data.lastClickTime) < 300) {
        swiper.emit('doubleTap doubleClick', e);
      }
    }

    data.lastClickTime = Utils.now();
    Utils.nextTick(function () {
      if (!swiper.destroyed) { swiper.allowClick = true; }
    });

    if (!data.isTouched || !data.isMoved || !swiper.swipeDirection || touches.diff === 0 || data.currentTranslate === data.startTranslate) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;

    var currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper.translate : -swiper.translate;
    } else {
      currentPos = -data.currentTranslate;
    }

    if (params.cssMode) {
      return;
    }

    if (params.freeMode) {
      if (currentPos < -swiper.minTranslate()) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (currentPos > -swiper.maxTranslate()) {
        if (swiper.slides.length < snapGrid.length) {
          swiper.slideTo(snapGrid.length - 1);
        } else {
          swiper.slideTo(swiper.slides.length - 1);
        }
        return;
      }

      if (params.freeModeMomentum) {
        if (data.velocities.length > 1) {
          var lastMoveEvent = data.velocities.pop();
          var velocityEvent = data.velocities.pop();

          var distance = lastMoveEvent.position - velocityEvent.position;
          var time = lastMoveEvent.time - velocityEvent.time;
          swiper.velocity = distance / time;
          swiper.velocity /= 2;
          if (Math.abs(swiper.velocity) < params.freeModeMinimumVelocity) {
            swiper.velocity = 0;
          }
          // this implies that the user stopped moving a finger then released.
          // There would be no events with distance zero, so the last event is stale.
          if (time > 150 || (Utils.now() - lastMoveEvent.time) > 300) {
            swiper.velocity = 0;
          }
        } else {
          swiper.velocity = 0;
        }
        swiper.velocity *= params.freeModeMomentumVelocityRatio;

        data.velocities.length = 0;
        var momentumDuration = 1000 * params.freeModeMomentumRatio;
        var momentumDistance = swiper.velocity * momentumDuration;

        var newPosition = swiper.translate + momentumDistance;
        if (rtl) { newPosition = -newPosition; }

        var doBounce = false;
        var afterBouncePosition;
        var bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeModeMomentumBounceRatio;
        var needsLoopFix;
        if (newPosition < swiper.maxTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition + swiper.maxTranslate() < -bounceAmount) {
              newPosition = swiper.maxTranslate() - bounceAmount;
            }
            afterBouncePosition = swiper.maxTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.maxTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (newPosition > swiper.minTranslate()) {
          if (params.freeModeMomentumBounce) {
            if (newPosition - swiper.minTranslate() > bounceAmount) {
              newPosition = swiper.minTranslate() + bounceAmount;
            }
            afterBouncePosition = swiper.minTranslate();
            doBounce = true;
            data.allowMomentumBounce = true;
          } else {
            newPosition = swiper.minTranslate();
          }
          if (params.loop && params.centeredSlides) { needsLoopFix = true; }
        } else if (params.freeModeSticky) {
          var nextSlide;
          for (var j = 0; j < snapGrid.length; j += 1) {
            if (snapGrid[j] > -newPosition) {
              nextSlide = j;
              break;
            }
          }

          if (Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) || swiper.swipeDirection === 'next') {
            newPosition = snapGrid[nextSlide];
          } else {
            newPosition = snapGrid[nextSlide - 1];
          }
          newPosition = -newPosition;
        }
        if (needsLoopFix) {
          swiper.once('transitionEnd', function () {
            swiper.loopFix();
          });
        }
        // Fix duration
        if (swiper.velocity !== 0) {
          if (rtl) {
            momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
          } else {
            momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
          }
        } else if (params.freeModeSticky) {
          swiper.slideToClosest();
          return;
        }

        if (params.freeModeMomentumBounce && doBounce) {
          swiper.updateProgress(afterBouncePosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          swiper.animating = true;
          $wrapperEl.transitionEnd(function () {
            if (!swiper || swiper.destroyed || !data.allowMomentumBounce) { return; }
            swiper.emit('momentumBounce');

            swiper.setTransition(params.speed);
            swiper.setTranslate(afterBouncePosition);
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          });
        } else if (swiper.velocity) {
          swiper.updateProgress(newPosition);
          swiper.setTransition(momentumDuration);
          swiper.setTranslate(newPosition);
          swiper.transitionStart(true, swiper.swipeDirection);
          if (!swiper.animating) {
            swiper.animating = true;
            $wrapperEl.transitionEnd(function () {
              if (!swiper || swiper.destroyed) { return; }
              swiper.transitionEnd();
            });
          }
        } else {
          swiper.updateProgress(newPosition);
        }

        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      } else if (params.freeModeSticky) {
        swiper.slideToClosest();
        return;
      }

      if (!params.freeModeMomentum || timeDiff >= params.longSwipesMs) {
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      return;
    }

    // Find current slide
    var stopIndex = 0;
    var groupSize = swiper.slidesSizesGrid[0];
    for (var i = 0; i < slidesGrid.length; i += params.slidesPerGroup) {
      if (typeof slidesGrid[i + params.slidesPerGroup] !== 'undefined') {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + params.slidesPerGroup]) {
          stopIndex = i;
          groupSize = slidesGrid[i + params.slidesPerGroup] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }

    // Find current slide size
    var ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;

    if (timeDiff > params.longSwipesMs) {
      // Long touches
      if (!params.longSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        if (ratio >= params.longSwipesRatio) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
      if (swiper.swipeDirection === 'prev') {
        if (ratio > (1 - params.longSwipesRatio)) { swiper.slideTo(stopIndex + params.slidesPerGroup); }
        else { swiper.slideTo(stopIndex); }
      }
    } else {
      // Short swipes
      if (!params.shortSwipes) {
        swiper.slideTo(swiper.activeIndex);
        return;
      }
      if (swiper.swipeDirection === 'next') {
        swiper.slideTo(stopIndex + params.slidesPerGroup);
      }
      if (swiper.swipeDirection === 'prev') {
        swiper.slideTo(stopIndex);
      }
    }
  }

  function onResize () {
    var swiper = this;

    var params = swiper.params;
    var el = swiper.el;

    if (el && el.offsetWidth === 0) { return; }

    // Breakpoints
    if (params.breakpoints) {
      swiper.setBreakpoint();
    }

    // Save locks
    var allowSlideNext = swiper.allowSlideNext;
    var allowSlidePrev = swiper.allowSlidePrev;
    var snapGrid = swiper.snapGrid;

    // Disable locks on resize
    swiper.allowSlideNext = true;
    swiper.allowSlidePrev = true;

    swiper.updateSize();
    swiper.updateSlides();

    if (params.freeMode) {
      var newTranslate = Math.min(Math.max(swiper.translate, swiper.maxTranslate()), swiper.minTranslate());
      swiper.setTranslate(newTranslate);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();

      if (params.autoHeight) {
        swiper.updateAutoHeight();
      }
    } else {
      swiper.updateSlidesClasses();
      if ((params.slidesPerView === 'auto' || params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
        swiper.slideTo(swiper.slides.length - 1, 0, false, true);
      } else {
        swiper.slideTo(swiper.activeIndex, 0, false, true);
      }
    }
    if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
      swiper.autoplay.run();
    }
    // Return locks after resize
    swiper.allowSlidePrev = allowSlidePrev;
    swiper.allowSlideNext = allowSlideNext;

    if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
      swiper.checkOverflow();
    }
  }

  function onClick (e) {
    var swiper = this;
    if (!swiper.allowClick) {
      if (swiper.params.preventClicks) { e.preventDefault(); }
      if (swiper.params.preventClicksPropagation && swiper.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }

  function onScroll () {
    var swiper = this;
    var wrapperEl = swiper.wrapperEl;
    swiper.previousTranslate = swiper.translate;
    swiper.translate = swiper.isHorizontal() ? -wrapperEl.scrollLeft : -wrapperEl.scrollTop;
    // eslint-disable-next-line
    if (swiper.translate === -0) { swiper.translate = 0; }

    swiper.updateActiveIndex();
    swiper.updateSlidesClasses();

    var newProgress;
    var translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper.translate - swiper.minTranslate()) / (translatesDiff);
    }
    if (newProgress !== swiper.progress) {
      swiper.updateProgress(swiper.translate);
    }

    swiper.emit('setTranslate', swiper.translate, false);
  }

  function attachEvents() {
    var swiper = this;
    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    swiper.onTouchStart = onTouchStart.bind(swiper);
    swiper.onTouchMove = onTouchMove.bind(swiper);
    swiper.onTouchEnd = onTouchEnd.bind(swiper);
    if (params.cssMode) {
      swiper.onScroll = onScroll.bind(swiper);
    }

    swiper.onClick = onClick.bind(swiper);

    var capture = !!params.nested;

    // Touch Events
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      el.addEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.addEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.addEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'touchstart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        el.addEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.addEventListener(touchEvents.move, swiper.onTouchMove, Support.passiveListener ? { passive: false, capture: capture } : capture);
        el.addEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        if (touchEvents.cancel) {
          el.addEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        el.addEventListener('mousedown', swiper.onTouchStart, false);
        doc.addEventListener('mousemove', swiper.onTouchMove, capture);
        doc.addEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      el.addEventListener('click', swiper.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl.addEventListener('scroll', swiper.onScroll);
    }

    // Resize handler
    swiper.on((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize, true);
  }

  function detachEvents() {
    var swiper = this;

    var params = swiper.params;
    var touchEvents = swiper.touchEvents;
    var el = swiper.el;
    var wrapperEl = swiper.wrapperEl;

    var capture = !!params.nested;

    // Touch Events
    if (!Support.touch && (Support.pointerEvents || Support.prefixedPointerEvents)) {
      el.removeEventListener(touchEvents.start, swiper.onTouchStart, false);
      doc.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
      doc.removeEventListener(touchEvents.end, swiper.onTouchEnd, false);
    } else {
      if (Support.touch) {
        var passiveListener = touchEvents.start === 'onTouchStart' && Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
        el.removeEventListener(touchEvents.start, swiper.onTouchStart, passiveListener);
        el.removeEventListener(touchEvents.move, swiper.onTouchMove, capture);
        el.removeEventListener(touchEvents.end, swiper.onTouchEnd, passiveListener);
        if (touchEvents.cancel) {
          el.removeEventListener(touchEvents.cancel, swiper.onTouchEnd, passiveListener);
        }
      }
      if ((params.simulateTouch && !Device.ios && !Device.android) || (params.simulateTouch && !Support.touch && Device.ios)) {
        el.removeEventListener('mousedown', swiper.onTouchStart, false);
        doc.removeEventListener('mousemove', swiper.onTouchMove, capture);
        doc.removeEventListener('mouseup', swiper.onTouchEnd, false);
      }
    }
    // Prevent Links Clicks
    if (params.preventClicks || params.preventClicksPropagation) {
      el.removeEventListener('click', swiper.onClick, true);
    }

    if (params.cssMode) {
      wrapperEl.removeEventListener('scroll', swiper.onScroll);
    }

    // Resize handler
    swiper.off((Device.ios || Device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate'), onResize);
  }

  var events = {
    attachEvents: attachEvents,
    detachEvents: detachEvents,
  };

  function setBreakpoint () {
    var swiper = this;
    var activeIndex = swiper.activeIndex;
    var initialized = swiper.initialized;
    var loopedSlides = swiper.loopedSlides; if ( loopedSlides === void 0 ) loopedSlides = 0;
    var params = swiper.params;
    var $el = swiper.$el;
    var breakpoints = params.breakpoints;
    if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) { return; }

    // Get breakpoint for window width and update parameters
    var breakpoint = swiper.getBreakpoint(breakpoints);

    if (breakpoint && swiper.currentBreakpoint !== breakpoint) {
      var breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
      if (breakpointOnlyParams) {
        ['slidesPerView', 'spaceBetween', 'slidesPerGroup', 'slidesPerColumn'].forEach(function (param) {
          var paramValue = breakpointOnlyParams[param];
          if (typeof paramValue === 'undefined') { return; }
          if (param === 'slidesPerView' && (paramValue === 'AUTO' || paramValue === 'auto')) {
            breakpointOnlyParams[param] = 'auto';
          } else if (param === 'slidesPerView') {
            breakpointOnlyParams[param] = parseFloat(paramValue);
          } else {
            breakpointOnlyParams[param] = parseInt(paramValue, 10);
          }
        });
      }

      var breakpointParams = breakpointOnlyParams || swiper.originalParams;
      var wasMultiRow = params.slidesPerColumn > 1;
      var isMultiRow = breakpointParams.slidesPerColumn > 1;
      if (wasMultiRow && !isMultiRow) {
        $el.removeClass(((params.containerModifierClass) + "multirow " + (params.containerModifierClass) + "multirow-column"));
      } else if (!wasMultiRow && isMultiRow) {
        $el.addClass(((params.containerModifierClass) + "multirow"));
        if (breakpointParams.slidesPerColumnFill === 'column') {
          $el.addClass(((params.containerModifierClass) + "multirow-column"));
        }
      }

      var directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
      var needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

      if (directionChanged && initialized) {
        swiper.changeDirection();
      }

      Utils.extend(swiper.params, breakpointParams);

      Utils.extend(swiper, {
        allowTouchMove: swiper.params.allowTouchMove,
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,
      });

      swiper.currentBreakpoint = breakpoint;

      if (needsReLoop && initialized) {
        swiper.loopDestroy();
        swiper.loopCreate();
        swiper.updateSlides();
        swiper.slideTo((activeIndex - loopedSlides) + swiper.loopedSlides, 0, false);
      }

      swiper.emit('breakpoint', breakpointParams);
    }
  }

  function getBreakpoint (breakpoints) {
    // Get breakpoint for window width
    if (!breakpoints) { return undefined; }
    var breakpoint = false;
    var points = [];
    Object.keys(breakpoints).forEach(function (point) {
      points.push(point);
    });
    points.sort(function (a, b) { return parseInt(a, 10) - parseInt(b, 10); });
    for (var i = 0; i < points.length; i += 1) {
      var point = points[i];
      if (point <= win.innerWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || 'max';
  }

  var breakpoints = { setBreakpoint: setBreakpoint, getBreakpoint: getBreakpoint };

  function addClasses () {
    var swiper = this;
    var classNames = swiper.classNames;
    var params = swiper.params;
    var rtl = swiper.rtl;
    var $el = swiper.$el;
    var suffixes = [];

    suffixes.push('initialized');
    suffixes.push(params.direction);

    if (params.freeMode) {
      suffixes.push('free-mode');
    }
    if (params.autoHeight) {
      suffixes.push('autoheight');
    }
    if (rtl) {
      suffixes.push('rtl');
    }
    if (params.slidesPerColumn > 1) {
      suffixes.push('multirow');
      if (params.slidesPerColumnFill === 'column') {
        suffixes.push('multirow-column');
      }
    }
    if (Device.android) {
      suffixes.push('android');
    }
    if (Device.ios) {
      suffixes.push('ios');
    }

    if (params.cssMode) {
      suffixes.push('css-mode');
    }

    suffixes.forEach(function (suffix) {
      classNames.push(params.containerModifierClass + suffix);
    });

    $el.addClass(classNames.join(' '));
  }

  function removeClasses () {
    var swiper = this;
    var $el = swiper.$el;
    var classNames = swiper.classNames;

    $el.removeClass(classNames.join(' '));
  }

  var classes = { addClasses: addClasses, removeClasses: removeClasses };

  function loadImage (imageEl, src, srcset, sizes, checkForComplete, callback) {
    var image;
    function onReady() {
      if (callback) { callback(); }
    }
    if (!imageEl.complete || !checkForComplete) {
      if (src) {
        image = new win.Image();
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
    } else {
      // image already loaded...
      onReady();
    }
  }

  function preloadImages () {
    var swiper = this;
    swiper.imagesToLoad = swiper.$el.find('img');
    function onReady() {
      if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) { return; }
      if (swiper.imagesLoaded !== undefined) { swiper.imagesLoaded += 1; }
      if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
        if (swiper.params.updateOnImagesReady) { swiper.update(); }
        swiper.emit('imagesReady');
      }
    }
    for (var i = 0; i < swiper.imagesToLoad.length; i += 1) {
      var imageEl = swiper.imagesToLoad[i];
      swiper.loadImage(
        imageEl,
        imageEl.currentSrc || imageEl.getAttribute('src'),
        imageEl.srcset || imageEl.getAttribute('srcset'),
        imageEl.sizes || imageEl.getAttribute('sizes'),
        true,
        onReady
      );
    }
  }

  var images = {
    loadImage: loadImage,
    preloadImages: preloadImages,
  };

  function checkOverflow() {
    var swiper = this;
    var wasLocked = swiper.isLocked;

    swiper.isLocked = swiper.snapGrid.length === 1;
    swiper.allowSlideNext = !swiper.isLocked;
    swiper.allowSlidePrev = !swiper.isLocked;

    // events
    if (wasLocked !== swiper.isLocked) { swiper.emit(swiper.isLocked ? 'lock' : 'unlock'); }

    if (wasLocked && wasLocked !== swiper.isLocked) {
      swiper.isEnd = false;
      swiper.navigation.update();
    }
  }

  var checkOverflow$1 = { checkOverflow: checkOverflow };

  var defaults = {
    init: true,
    direction: 'horizontal',
    touchEventsTarget: 'container',
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    //
    preventInteractionOnTransition: false,

    // To support iOS's swipe-to-go-back gesture (when being used in-app, with UIWebView).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,

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
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,

    // Disable swiper and hide navigation when container not overflow
    watchOverflow: false,

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
    allowTouchMove: true,
    threshold: 0,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,

    // Unique Navigation Elements
    uniqueNavElements: true,

    // Resistance
    resistance: true,
    resistanceRatio: 0.85,

    // Progress
    watchSlidesProgress: false,
    watchSlidesVisibility: false,

    // Cursor
    grabCursor: false,

    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,

    // Images
    preloadImages: true,
    updateOnImagesReady: true,

    // loop
    loop: false,
    loopAdditionalSlides: 0,
    loopedSlides: null,
    loopFillGroupWithBlank: false,

    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null, // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: 'swiper-no-swiping',
    noSwipingSelector: null,

    // Passive Listeners
    passiveListeners: true,

    // NS
    containerModifierClass: 'swiper-container-', // NEW
    slideClass: 'swiper-slide',
    slideBlankClass: 'swiper-slide-invisible-blank',
    slideActiveClass: 'swiper-slide-active',
    slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
    slideVisibleClass: 'swiper-slide-visible',
    slideDuplicateClass: 'swiper-slide-duplicate',
    slideNextClass: 'swiper-slide-next',
    slideDuplicateNextClass: 'swiper-slide-duplicate-next',
    slidePrevClass: 'swiper-slide-prev',
    slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
    wrapperClass: 'swiper-wrapper',

    // Callbacks
    runCallbacksOnInit: true,
  };

  /* eslint no-param-reassign: "off" */

  var prototypes = {
    update: update,
    translate: translate,
    transition: transition$1,
    slide: slide,
    loop: loop,
    grabCursor: grabCursor,
    manipulation: manipulation,
    events: events,
    breakpoints: breakpoints,
    checkOverflow: checkOverflow$1,
    classes: classes,
    images: images,
  };

  var extendedDefaults = {};

  var Swiper = /*@__PURE__*/(function (SwiperClass) {
    function Swiper() {
      var assign;

      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];
      var el;
      var params;
      if (args.length === 1 && args[0].constructor && args[0].constructor === Object) {
        params = args[0];
      } else {
        (assign = args, el = assign[0], params = assign[1]);
      }
      if (!params) { params = {}; }

      params = Utils.extend({}, params);
      if (el && !params.el) { params.el = el; }

      SwiperClass.call(this, params);

      Object.keys(prototypes).forEach(function (prototypeGroup) {
        Object.keys(prototypes[prototypeGroup]).forEach(function (protoMethod) {
          if (!Swiper.prototype[protoMethod]) {
            Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
          }
        });
      });

      // Swiper Instance
      var swiper = this;
      if (typeof swiper.modules === 'undefined') {
        swiper.modules = {};
      }
      Object.keys(swiper.modules).forEach(function (moduleName) {
        var module = swiper.modules[moduleName];
        if (module.params) {
          var moduleParamName = Object.keys(module.params)[0];
          var moduleParams = module.params[moduleParamName];
          if (typeof moduleParams !== 'object' || moduleParams === null) { return; }
          if (!(moduleParamName in params && 'enabled' in moduleParams)) { return; }
          if (params[moduleParamName] === true) {
            params[moduleParamName] = { enabled: true };
          }
          if (
            typeof params[moduleParamName] === 'object'
            && !('enabled' in params[moduleParamName])
          ) {
            params[moduleParamName].enabled = true;
          }
          if (!params[moduleParamName]) { params[moduleParamName] = { enabled: false }; }
        }
      });

      // Extend defaults with modules params
      var swiperParams = Utils.extend({}, defaults);
      swiper.useModulesParams(swiperParams);

      // Extend defaults with passed params
      swiper.params = Utils.extend({}, swiperParams, extendedDefaults, params);
      swiper.originalParams = Utils.extend({}, swiper.params);
      swiper.passedParams = Utils.extend({}, params);

      // Save Dom lib
      swiper.$ = $;

      // Find el
      var $el = $(swiper.params.el);
      el = $el[0];

      if (!el) {
        return undefined;
      }

      if ($el.length > 1) {
        var swipers = [];
        $el.each(function (index, containerEl) {
          var newParams = Utils.extend({}, params, { el: containerEl });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }

      el.swiper = swiper;
      $el.data('swiper', swiper);

      // Find Wrapper
      var $wrapperEl;
      if (el && el.shadowRoot && el.shadowRoot.querySelector) {
        $wrapperEl = $(el.shadowRoot.querySelector(("." + (swiper.params.wrapperClass))));
        // Children needs to return slot items
        $wrapperEl.children = function (options) { return $el.children(options); };
      } else {
        $wrapperEl = $el.children(("." + (swiper.params.wrapperClass)));
      }
      // Extend Swiper
      Utils.extend(swiper, {
        $el: $el,
        el: el,
        $wrapperEl: $wrapperEl,
        wrapperEl: $wrapperEl[0],

        // Classes
        classNames: [],

        // Slides
        slides: $(),
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],

        // isDirection
        isHorizontal: function isHorizontal() {
          return swiper.params.direction === 'horizontal';
        },
        isVertical: function isVertical() {
          return swiper.params.direction === 'vertical';
        },
        // RTL
        rtl: (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        rtlTranslate: swiper.params.direction === 'horizontal' && (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
        wrongRTL: $wrapperEl.css('display') === '-webkit-box',

        // Indexes
        activeIndex: 0,
        realIndex: 0,

        //
        isBeginning: true,
        isEnd: false,

        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,

        // Locks
        allowSlideNext: swiper.params.allowSlideNext,
        allowSlidePrev: swiper.params.allowSlidePrev,

        // Touch Events
        touchEvents: (function touchEvents() {
          var touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
          var desktop = ['mousedown', 'mousemove', 'mouseup'];
          if (Support.pointerEvents) {
            desktop = ['pointerdown', 'pointermove', 'pointerup'];
          } else if (Support.prefixedPointerEvents) {
            desktop = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
          }
          swiper.touchEventsTouch = {
            start: touch[0],
            move: touch[1],
            end: touch[2],
            cancel: touch[3],
          };
          swiper.touchEventsDesktop = {
            start: desktop[0],
            move: desktop[1],
            end: desktop[2],
          };
          return Support.touch || !swiper.params.simulateTouch ? swiper.touchEventsTouch : swiper.touchEventsDesktop;
        }()),
        touchEventsData: {
          isTouched: undefined,
          isMoved: undefined,
          allowTouchCallbacks: undefined,
          touchStartTime: undefined,
          isScrolling: undefined,
          currentTranslate: undefined,
          startTranslate: undefined,
          allowThresholdMove: undefined,
          // Form elements to match
          formElements: 'input, select, option, textarea, button, video',
          // Last click time
          lastClickTime: Utils.now(),
          clickTimeout: undefined,
          // Velocities
          velocities: [],
          allowMomentumBounce: undefined,
          isTouchEvent: undefined,
          startMoving: undefined,
        },

        // Clicks
        allowClick: true,

        // Touches
        allowTouchMove: swiper.params.allowTouchMove,

        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0,
        },

        // Images
        imagesToLoad: [],
        imagesLoaded: 0,

      });

      // Install Modules
      swiper.useModules();

      // Init
      if (swiper.params.init) {
        swiper.init();
      }

      // Return app instance
      return swiper;
    }

    if ( SwiperClass ) Swiper.__proto__ = SwiperClass;
    Swiper.prototype = Object.create( SwiperClass && SwiperClass.prototype );
    Swiper.prototype.constructor = Swiper;

    var staticAccessors = { extendedDefaults: { configurable: true },defaults: { configurable: true },Class: { configurable: true },$: { configurable: true } };

    Swiper.prototype.slidesPerViewDynamic = function slidesPerViewDynamic () {
      var swiper = this;
      var params = swiper.params;
      var slides = swiper.slides;
      var slidesGrid = swiper.slidesGrid;
      var swiperSize = swiper.size;
      var activeIndex = swiper.activeIndex;
      var spv = 1;
      if (params.centeredSlides) {
        var slideSize = slides[activeIndex].swiperSlideSize;
        var breakLoop;
        for (var i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
        for (var i$1 = activeIndex - 1; i$1 >= 0; i$1 -= 1) {
          if (slides[i$1] && !breakLoop) {
            slideSize += slides[i$1].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize) { breakLoop = true; }
          }
        }
      } else {
        for (var i$2 = activeIndex + 1; i$2 < slides.length; i$2 += 1) {
          if (slidesGrid[i$2] - slidesGrid[activeIndex] < swiperSize) {
            spv += 1;
          }
        }
      }
      return spv;
    };

    Swiper.prototype.update = function update () {
      var swiper = this;
      if (!swiper || swiper.destroyed) { return; }
      var snapGrid = swiper.snapGrid;
      var params = swiper.params;
      // Breakpoints
      if (params.breakpoints) {
        swiper.setBreakpoint();
      }
      swiper.updateSize();
      swiper.updateSlides();
      swiper.updateProgress();
      swiper.updateSlidesClasses();

      function setTranslate() {
        var translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
        var newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
        swiper.setTranslate(newTranslate);
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();
      }
      var translated;
      if (swiper.params.freeMode) {
        setTranslate();
        if (swiper.params.autoHeight) {
          swiper.updateAutoHeight();
        }
      } else {
        if ((swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) && swiper.isEnd && !swiper.params.centeredSlides) {
          translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
        } else {
          translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
        swiper.checkOverflow();
      }
      swiper.emit('update');
    };

    Swiper.prototype.changeDirection = function changeDirection (newDirection, needUpdate) {
      if ( needUpdate === void 0 ) needUpdate = true;

      var swiper = this;
      var currentDirection = swiper.params.direction;
      if (!newDirection) {
        // eslint-disable-next-line
        newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
      }
      if ((newDirection === currentDirection) || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
        return swiper;
      }

      swiper.$el
        .removeClass(("" + (swiper.params.containerModifierClass) + currentDirection))
        .addClass(("" + (swiper.params.containerModifierClass) + newDirection));

      swiper.params.direction = newDirection;

      swiper.slides.each(function (slideIndex, slideEl) {
        if (newDirection === 'vertical') {
          slideEl.style.width = '';
        } else {
          slideEl.style.height = '';
        }
      });

      swiper.emit('changeDirection');
      if (needUpdate) { swiper.update(); }

      return swiper;
    };

    Swiper.prototype.init = function init () {
      var swiper = this;
      if (swiper.initialized) { return; }

      swiper.emit('beforeInit');

      // Set breakpoint
      if (swiper.params.breakpoints) {
        swiper.setBreakpoint();
      }

      // Add Classes
      swiper.addClasses();

      // Create loop
      if (swiper.params.loop) {
        swiper.loopCreate();
      }

      // Update size
      swiper.updateSize();

      // Update slides
      swiper.updateSlides();

      if (swiper.params.watchOverflow) {
        swiper.checkOverflow();
      }

      // Set Grab Cursor
      if (swiper.params.grabCursor) {
        swiper.setGrabCursor();
      }

      if (swiper.params.preloadImages) {
        swiper.preloadImages();
      }

      // Slide To Initial Slide
      if (swiper.params.loop) {
        swiper.slideTo(swiper.params.initialSlide + swiper.loopedSlides, 0, swiper.params.runCallbacksOnInit);
      } else {
        swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit);
      }

      // Attach events
      swiper.attachEvents();

      // Init Flag
      swiper.initialized = true;

      // Emit
      swiper.emit('init');
    };

    Swiper.prototype.destroy = function destroy (deleteInstance, cleanStyles) {
      if ( deleteInstance === void 0 ) deleteInstance = true;
      if ( cleanStyles === void 0 ) cleanStyles = true;

      var swiper = this;
      var params = swiper.params;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;

      if (typeof swiper.params === 'undefined' || swiper.destroyed) {
        return null;
      }

      swiper.emit('beforeDestroy');

      // Init Flag
      swiper.initialized = false;

      // Detach events
      swiper.detachEvents();

      // Destroy loop
      if (params.loop) {
        swiper.loopDestroy();
      }

      // Cleanup styles
      if (cleanStyles) {
        swiper.removeClasses();
        $el.removeAttr('style');
        $wrapperEl.removeAttr('style');
        if (slides && slides.length) {
          slides
            .removeClass([
              params.slideVisibleClass,
              params.slideActiveClass,
              params.slideNextClass,
              params.slidePrevClass ].join(' '))
            .removeAttr('style')
            .removeAttr('data-swiper-slide-index');
        }
      }

      swiper.emit('destroy');

      // Detach emitter events
      Object.keys(swiper.eventsListeners).forEach(function (eventName) {
        swiper.off(eventName);
      });

      if (deleteInstance !== false) {
        swiper.$el[0].swiper = null;
        swiper.$el.data('swiper', null);
        Utils.deleteProps(swiper);
      }
      swiper.destroyed = true;

      return null;
    };

    Swiper.extendDefaults = function extendDefaults (newDefaults) {
      Utils.extend(extendedDefaults, newDefaults);
    };

    staticAccessors.extendedDefaults.get = function () {
      return extendedDefaults;
    };

    staticAccessors.defaults.get = function () {
      return defaults;
    };

    staticAccessors.Class.get = function () {
      return SwiperClass;
    };

    staticAccessors.$.get = function () {
      return $;
    };

    Object.defineProperties( Swiper, staticAccessors );

    return Swiper;
  }(SwiperClass));

  var Device$1 = {
    name: 'device',
    proto: {
      device: Device,
    },
    static: {
      device: Device,
    },
  };

  var Support$1 = {
    name: 'support',
    proto: {
      support: Support,
    },
    static: {
      support: Support,
    },
  };

  var Browser = (function Browser() {
    function isSafari() {
      var ua = win.navigator.userAgent.toLowerCase();
      return (ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0);
    }
    return {
      isEdge: !!win.navigator.userAgent.match(/Edge/g),
      isSafari: isSafari(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(win.navigator.userAgent),
    };
  }());

  var Browser$1 = {
    name: 'browser',
    proto: {
      browser: Browser,
    },
    static: {
      browser: Browser,
    },
  };

  var Resize = {
    name: 'resize',
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        resize: {
          resizeHandler: function resizeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('beforeResize');
            swiper.emit('resize');
          },
          orientationChangeHandler: function orientationChangeHandler() {
            if (!swiper || swiper.destroyed || !swiper.initialized) { return; }
            swiper.emit('orientationchange');
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        // Emit resize
        win.addEventListener('resize', swiper.resize.resizeHandler);

        // Emit orientationchange
        win.addEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
      destroy: function destroy() {
        var swiper = this;
        win.removeEventListener('resize', swiper.resize.resizeHandler);
        win.removeEventListener('orientationchange', swiper.resize.orientationChangeHandler);
      },
    },
  };

  var Observer = {
    func: win.MutationObserver || win.WebkitMutationObserver,
    attach: function attach(target, options) {
      if ( options === void 0 ) options = {};

      var swiper = this;

      var ObserverFunc = Observer.func;
      var observer = new ObserverFunc(function (mutations) {
        // The observerUpdate event should only be triggered
        // once despite the number of mutations.  Additional
        // triggers are redundant and are very costly
        if (mutations.length === 1) {
          swiper.emit('observerUpdate', mutations[0]);
          return;
        }
        var observerUpdate = function observerUpdate() {
          swiper.emit('observerUpdate', mutations[0]);
        };

        if (win.requestAnimationFrame) {
          win.requestAnimationFrame(observerUpdate);
        } else {
          win.setTimeout(observerUpdate, 0);
        }
      });

      observer.observe(target, {
        attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
        childList: typeof options.childList === 'undefined' ? true : options.childList,
        characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
      });

      swiper.observer.observers.push(observer);
    },
    init: function init() {
      var swiper = this;
      if (!Support.observer || !swiper.params.observer) { return; }
      if (swiper.params.observeParents) {
        var containerParents = swiper.$el.parents();
        for (var i = 0; i < containerParents.length; i += 1) {
          swiper.observer.attach(containerParents[i]);
        }
      }
      // Observe container
      swiper.observer.attach(swiper.$el[0], { childList: swiper.params.observeSlideChildren });

      // Observe wrapper
      swiper.observer.attach(swiper.$wrapperEl[0], { attributes: false });
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.observer.observers.forEach(function (observer) {
        observer.disconnect();
      });
      swiper.observer.observers = [];
    },
  };

  var Observer$1 = {
    name: 'observer',
    params: {
      observer: false,
      observeParents: false,
      observeSlideChildren: false,
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        observer: {
          init: Observer.init.bind(swiper),
          attach: Observer.attach.bind(swiper),
          destroy: Observer.destroy.bind(swiper),
          observers: [],
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.observer.init();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.observer.destroy();
      },
    },
  };

  var Virtual = {
    update: function update(force) {
      var swiper = this;
      var ref = swiper.params;
      var slidesPerView = ref.slidesPerView;
      var slidesPerGroup = ref.slidesPerGroup;
      var centeredSlides = ref.centeredSlides;
      var ref$1 = swiper.params.virtual;
      var addSlidesBefore = ref$1.addSlidesBefore;
      var addSlidesAfter = ref$1.addSlidesAfter;
      var ref$2 = swiper.virtual;
      var previousFrom = ref$2.from;
      var previousTo = ref$2.to;
      var slides = ref$2.slides;
      var previousSlidesGrid = ref$2.slidesGrid;
      var renderSlide = ref$2.renderSlide;
      var previousOffset = ref$2.offset;
      swiper.updateActiveIndex();
      var activeIndex = swiper.activeIndex || 0;

      var offsetProp;
      if (swiper.rtlTranslate) { offsetProp = 'right'; }
      else { offsetProp = swiper.isHorizontal() ? 'left' : 'top'; }

      var slidesAfter;
      var slidesBefore;
      if (centeredSlides) {
        slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
        slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
      } else {
        slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesBefore;
        slidesBefore = slidesPerGroup + addSlidesAfter;
      }
      var from = Math.max((activeIndex || 0) - slidesBefore, 0);
      var to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
      var offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);

      Utils.extend(swiper.virtual, {
        from: from,
        to: to,
        offset: offset,
        slidesGrid: swiper.slidesGrid,
      });

      function onRendered() {
        swiper.updateSlides();
        swiper.updateProgress();
        swiper.updateSlidesClasses();
        if (swiper.lazy && swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      }

      if (previousFrom === from && previousTo === to && !force) {
        if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
          swiper.slides.css(offsetProp, (offset + "px"));
        }
        swiper.updateProgress();
        return;
      }
      if (swiper.params.virtual.renderExternal) {
        swiper.params.virtual.renderExternal.call(swiper, {
          offset: offset,
          from: from,
          to: to,
          slides: (function getSlides() {
            var slidesToRender = [];
            for (var i = from; i <= to; i += 1) {
              slidesToRender.push(slides[i]);
            }
            return slidesToRender;
          }()),
        });
        onRendered();
        return;
      }
      var prependIndexes = [];
      var appendIndexes = [];
      if (force) {
        swiper.$wrapperEl.find(("." + (swiper.params.slideClass))).remove();
      } else {
        for (var i = previousFrom; i <= previousTo; i += 1) {
          if (i < from || i > to) {
            swiper.$wrapperEl.find(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + i + "\"]")).remove();
          }
        }
      }
      for (var i$1 = 0; i$1 < slides.length; i$1 += 1) {
        if (i$1 >= from && i$1 <= to) {
          if (typeof previousTo === 'undefined' || force) {
            appendIndexes.push(i$1);
          } else {
            if (i$1 > previousTo) { appendIndexes.push(i$1); }
            if (i$1 < previousFrom) { prependIndexes.push(i$1); }
          }
        }
      }
      appendIndexes.forEach(function (index) {
        swiper.$wrapperEl.append(renderSlide(slides[index], index));
      });
      prependIndexes.sort(function (a, b) { return b - a; }).forEach(function (index) {
        swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
      });
      swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, (offset + "px"));
      onRendered();
    },
    renderSlide: function renderSlide(slide, index) {
      var swiper = this;
      var params = swiper.params.virtual;
      if (params.cache && swiper.virtual.cache[index]) {
        return swiper.virtual.cache[index];
      }
      var $slideEl = params.renderSlide
        ? $(params.renderSlide.call(swiper, slide, index))
        : $(("<div class=\"" + (swiper.params.slideClass) + "\" data-swiper-slide-index=\"" + index + "\">" + slide + "</div>"));
      if (!$slideEl.attr('data-swiper-slide-index')) { $slideEl.attr('data-swiper-slide-index', index); }
      if (params.cache) { swiper.virtual.cache[index] = $slideEl; }
      return $slideEl;
    },
    appendSlide: function appendSlide(slides) {
      var swiper = this;
      if (typeof slides === 'object' && 'length' in slides) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.push(slides[i]); }
        }
      } else {
        swiper.virtual.slides.push(slides);
      }
      swiper.virtual.update(true);
    },
    prependSlide: function prependSlide(slides) {
      var swiper = this;
      var activeIndex = swiper.activeIndex;
      var newActiveIndex = activeIndex + 1;
      var numberOfNewSlides = 1;

      if (Array.isArray(slides)) {
        for (var i = 0; i < slides.length; i += 1) {
          if (slides[i]) { swiper.virtual.slides.unshift(slides[i]); }
        }
        newActiveIndex = activeIndex + slides.length;
        numberOfNewSlides = slides.length;
      } else {
        swiper.virtual.slides.unshift(slides);
      }
      if (swiper.params.virtual.cache) {
        var cache = swiper.virtual.cache;
        var newCache = {};
        Object.keys(cache).forEach(function (cachedIndex) {
          var $cachedEl = cache[cachedIndex];
          var cachedElIndex = $cachedEl.attr('data-swiper-slide-index');
          if (cachedElIndex) {
            $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + 1);
          }
          newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
        });
        swiper.virtual.cache = newCache;
      }
      swiper.virtual.update(true);
      swiper.slideTo(newActiveIndex, 0);
    },
    removeSlide: function removeSlide(slidesIndexes) {
      var swiper = this;
      if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) { return; }
      var activeIndex = swiper.activeIndex;
      if (Array.isArray(slidesIndexes)) {
        for (var i = slidesIndexes.length - 1; i >= 0; i -= 1) {
          swiper.virtual.slides.splice(slidesIndexes[i], 1);
          if (swiper.params.virtual.cache) {
            delete swiper.virtual.cache[slidesIndexes[i]];
          }
          if (slidesIndexes[i] < activeIndex) { activeIndex -= 1; }
          activeIndex = Math.max(activeIndex, 0);
        }
      } else {
        swiper.virtual.slides.splice(slidesIndexes, 1);
        if (swiper.params.virtual.cache) {
          delete swiper.virtual.cache[slidesIndexes];
        }
        if (slidesIndexes < activeIndex) { activeIndex -= 1; }
        activeIndex = Math.max(activeIndex, 0);
      }
      swiper.virtual.update(true);
      swiper.slideTo(activeIndex, 0);
    },
    removeAllSlides: function removeAllSlides() {
      var swiper = this;
      swiper.virtual.slides = [];
      if (swiper.params.virtual.cache) {
        swiper.virtual.cache = {};
      }
      swiper.virtual.update(true);
      swiper.slideTo(0, 0);
    },
  };

  var Virtual$1 = {
    name: 'virtual',
    params: {
      virtual: {
        enabled: false,
        slides: [],
        cache: true,
        renderSlide: null,
        renderExternal: null,
        addSlidesBefore: 0,
        addSlidesAfter: 0,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        virtual: {
          update: Virtual.update.bind(swiper),
          appendSlide: Virtual.appendSlide.bind(swiper),
          prependSlide: Virtual.prependSlide.bind(swiper),
          removeSlide: Virtual.removeSlide.bind(swiper),
          removeAllSlides: Virtual.removeAllSlides.bind(swiper),
          renderSlide: Virtual.renderSlide.bind(swiper),
          slides: swiper.params.virtual.slides,
          cache: {},
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "virtual"));
        var overwriteParams = {
          watchSlidesProgress: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);

        if (!swiper.params.initialSlide) {
          swiper.virtual.update();
        }
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.virtual.enabled) { return; }
        swiper.virtual.update();
      },
    },
  };

  var Keyboard = {
    handle: function handle(event) {
      var swiper = this;
      var rtl = swiper.rtlTranslate;
      var e = event;
      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var kc = e.keyCode || e.charCode;
      // Directions locks
      if (!swiper.allowSlideNext && ((swiper.isHorizontal() && kc === 39) || (swiper.isVertical() && kc === 40) || kc === 34)) {
        return false;
      }
      if (!swiper.allowSlidePrev && ((swiper.isHorizontal() && kc === 37) || (swiper.isVertical() && kc === 38) || kc === 33)) {
        return false;
      }
      if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
        return undefined;
      }
      if (doc.activeElement && doc.activeElement.nodeName && (doc.activeElement.nodeName.toLowerCase() === 'input' || doc.activeElement.nodeName.toLowerCase() === 'textarea')) {
        return undefined;
      }
      if (swiper.params.keyboard.onlyInViewport && (kc === 33 || kc === 34 || kc === 37 || kc === 39 || kc === 38 || kc === 40)) {
        var inView = false;
        // Check that swiper should be inside of visible area of window
        if (swiper.$el.parents(("." + (swiper.params.slideClass))).length > 0 && swiper.$el.parents(("." + (swiper.params.slideActiveClass))).length === 0) {
          return undefined;
        }
        var windowWidth = win.innerWidth;
        var windowHeight = win.innerHeight;
        var swiperOffset = swiper.$el.offset();
        if (rtl) { swiperOffset.left -= swiper.$el[0].scrollLeft; }
        var swiperCoord = [
          [swiperOffset.left, swiperOffset.top],
          [swiperOffset.left + swiper.width, swiperOffset.top],
          [swiperOffset.left, swiperOffset.top + swiper.height],
          [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height] ];
        for (var i = 0; i < swiperCoord.length; i += 1) {
          var point = swiperCoord[i];
          if (
            point[0] >= 0 && point[0] <= windowWidth
            && point[1] >= 0 && point[1] <= windowHeight
          ) {
            inView = true;
          }
        }
        if (!inView) { return undefined; }
      }
      if (swiper.isHorizontal()) {
        if (kc === 33 || kc === 34 || kc === 37 || kc === 39) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (((kc === 34 || kc === 39) && !rtl) || ((kc === 33 || kc === 37) && rtl)) { swiper.slideNext(); }
        if (((kc === 33 || kc === 37) && !rtl) || ((kc === 34 || kc === 39) && rtl)) { swiper.slidePrev(); }
      } else {
        if (kc === 33 || kc === 34 || kc === 38 || kc === 40) {
          if (e.preventDefault) { e.preventDefault(); }
          else { e.returnValue = false; }
        }
        if (kc === 34 || kc === 40) { swiper.slideNext(); }
        if (kc === 33 || kc === 38) { swiper.slidePrev(); }
      }
      swiper.emit('keyPress', kc);
      return undefined;
    },
    enable: function enable() {
      var swiper = this;
      if (swiper.keyboard.enabled) { return; }
      $(doc).on('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = true;
    },
    disable: function disable() {
      var swiper = this;
      if (!swiper.keyboard.enabled) { return; }
      $(doc).off('keydown', swiper.keyboard.handle);
      swiper.keyboard.enabled = false;
    },
  };

  var Keyboard$1 = {
    name: 'keyboard',
    params: {
      keyboard: {
        enabled: false,
        onlyInViewport: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        keyboard: {
          enabled: false,
          enable: Keyboard.enable.bind(swiper),
          disable: Keyboard.disable.bind(swiper),
          handle: Keyboard.handle.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.keyboard.enabled) {
          swiper.keyboard.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.keyboard.enabled) {
          swiper.keyboard.disable();
        }
      },
    },
  };

  function isEventSupported() {
    var eventName = 'onwheel';
    var isSupported = eventName in doc;

    if (!isSupported) {
      var element = doc.createElement('div');
      element.setAttribute(eventName, 'return;');
      isSupported = typeof element[eventName] === 'function';
    }

    if (!isSupported
      && doc.implementation
      && doc.implementation.hasFeature
      // always returns true in newer browsers as per the standard.
      // @see http://dom.spec.whatwg.org/#dom-domimplementation-hasfeature
      && doc.implementation.hasFeature('', '') !== true
    ) {
      // This is the only way to test support for the `wheel` event in IE9+.
      isSupported = doc.implementation.hasFeature('Events.wheel', '3.0');
    }

    return isSupported;
  }
  var Mousewheel = {
    lastScrollTime: Utils.now(),
    event: function event() {
      if (win.navigator.userAgent.indexOf('firefox') > -1) { return 'DOMMouseScroll'; }
      return isEventSupported() ? 'wheel' : 'mousewheel';
    },
    normalize: function normalize(e) {
      // Reasonable defaults
      var PIXEL_STEP = 10;
      var LINE_HEIGHT = 40;
      var PAGE_HEIGHT = 800;

      var sX = 0;
      var sY = 0; // spinX, spinY
      var pX = 0;
      var pY = 0; // pixelX, pixelY

      // Legacy
      if ('detail' in e) {
        sY = e.detail;
      }
      if ('wheelDelta' in e) {
        sY = -e.wheelDelta / 120;
      }
      if ('wheelDeltaY' in e) {
        sY = -e.wheelDeltaY / 120;
      }
      if ('wheelDeltaX' in e) {
        sX = -e.wheelDeltaX / 120;
      }

      // side scrolling on FF with DOMMouseScroll
      if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
        sX = sY;
        sY = 0;
      }

      pX = sX * PIXEL_STEP;
      pY = sY * PIXEL_STEP;

      if ('deltaY' in e) {
        pY = e.deltaY;
      }
      if ('deltaX' in e) {
        pX = e.deltaX;
      }

      if ((pX || pY) && e.deltaMode) {
        if (e.deltaMode === 1) { // delta in LINE units
          pX *= LINE_HEIGHT;
          pY *= LINE_HEIGHT;
        } else { // delta in PAGE units
          pX *= PAGE_HEIGHT;
          pY *= PAGE_HEIGHT;
        }
      }

      // Fall-back if spin cannot be determined
      if (pX && !sX) {
        sX = (pX < 1) ? -1 : 1;
      }
      if (pY && !sY) {
        sY = (pY < 1) ? -1 : 1;
      }

      return {
        spinX: sX,
        spinY: sY,
        pixelX: pX,
        pixelY: pY,
      };
    },
    handleMouseEnter: function handleMouseEnter() {
      var swiper = this;
      swiper.mouseEntered = true;
    },
    handleMouseLeave: function handleMouseLeave() {
      var swiper = this;
      swiper.mouseEntered = false;
    },
    handle: function handle(event) {
      var e = event;
      var swiper = this;
      var params = swiper.params.mousewheel;

      if (swiper.params.cssMode) {
        e.preventDefault();
      }

      if (!swiper.mouseEntered && !params.releaseOnEdges) { return true; }

      if (e.originalEvent) { e = e.originalEvent; } // jquery fix
      var delta = 0;
      var rtlFactor = swiper.rtlTranslate ? -1 : 1;

      var data = Mousewheel.normalize(e);

      if (params.forceToAxis) {
        if (swiper.isHorizontal()) {
          if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) { delta = data.pixelX * rtlFactor; }
          else { return true; }
        } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) { delta = data.pixelY; }
        else { return true; }
      } else {
        delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
      }

      if (delta === 0) { return true; }

      if (params.invert) { delta = -delta; }

      if (!swiper.params.freeMode) {
        if (Utils.now() - swiper.mousewheel.lastScrollTime > 60) {
          if (delta < 0) {
            if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
              swiper.slideNext();
              swiper.emit('scroll', e);
            } else if (params.releaseOnEdges) { return true; }
          } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
            swiper.slidePrev();
            swiper.emit('scroll', e);
          } else if (params.releaseOnEdges) { return true; }
        }
        swiper.mousewheel.lastScrollTime = (new win.Date()).getTime();
      } else {
        // Freemode or scrollContainer:
        if (swiper.params.loop) {
          swiper.loopFix();
        }
        var position = swiper.getTranslate() + (delta * params.sensitivity);
        var wasBeginning = swiper.isBeginning;
        var wasEnd = swiper.isEnd;

        if (position >= swiper.minTranslate()) { position = swiper.minTranslate(); }
        if (position <= swiper.maxTranslate()) { position = swiper.maxTranslate(); }

        swiper.setTransition(0);
        swiper.setTranslate(position);
        swiper.updateProgress();
        swiper.updateActiveIndex();
        swiper.updateSlidesClasses();

        if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
          swiper.updateSlidesClasses();
        }

        if (swiper.params.freeModeSticky) {
          clearTimeout(swiper.mousewheel.timeout);
          swiper.mousewheel.timeout = Utils.nextTick(function () {
            swiper.slideToClosest();
          }, 300);
        }
        // Emit event
        swiper.emit('scroll', e);

        // Stop autoplay
        if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) { swiper.autoplay.stop(); }
        // Return page scroll on edge positions
        if (position === swiper.minTranslate() || position === swiper.maxTranslate()) { return true; }
      }

      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      return false;
    },
    enable: function enable() {
      var swiper = this;
      var event = Mousewheel.event();
      if (swiper.params.cssMode) {
        swiper.wrapperEl.removeEventListener(event, swiper.mousewheel.handle);
        return true;
      }
      if (!event) { return false; }
      if (swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.on('mouseenter', swiper.mousewheel.handleMouseEnter);
      target.on('mouseleave', swiper.mousewheel.handleMouseLeave);
      target.on(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = true;
      return true;
    },
    disable: function disable() {
      var swiper = this;
      var event = Mousewheel.event();
      if (swiper.params.cssMode) {
        swiper.wrapperEl.addEventListener(event, swiper.mousewheel.handle);
        return true;
      }
      if (!event) { return false; }
      if (!swiper.mousewheel.enabled) { return false; }
      var target = swiper.$el;
      if (swiper.params.mousewheel.eventsTarged !== 'container') {
        target = $(swiper.params.mousewheel.eventsTarged);
      }
      target.off(event, swiper.mousewheel.handle);
      swiper.mousewheel.enabled = false;
      return true;
    },
  };

  var Mousewheel$1 = {
    name: 'mousewheel',
    params: {
      mousewheel: {
        enabled: false,
        releaseOnEdges: false,
        invert: false,
        forceToAxis: false,
        sensitivity: 1,
        eventsTarged: 'container',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        mousewheel: {
          enabled: false,
          enable: Mousewheel.enable.bind(swiper),
          disable: Mousewheel.disable.bind(swiper),
          handle: Mousewheel.handle.bind(swiper),
          handleMouseEnter: Mousewheel.handleMouseEnter.bind(swiper),
          handleMouseLeave: Mousewheel.handleMouseLeave.bind(swiper),
          lastScrollTime: Utils.now(),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
          swiper.mousewheel.disable();
        }
        if (swiper.params.mousewheel.enabled) { swiper.mousewheel.enable(); }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.cssMode) {
          swiper.mousewheel.enable();
        }
        if (swiper.mousewheel.enabled) { swiper.mousewheel.disable(); }
      },
    },
  };

  var Navigation = {
    update: function update() {
      // Update Navigation Buttons
      var swiper = this;
      var params = swiper.params.navigation;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          $prevEl.addClass(params.disabledClass);
        } else {
          $prevEl.removeClass(params.disabledClass);
        }
        $prevEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          $nextEl.addClass(params.disabledClass);
        } else {
          $nextEl.removeClass(params.disabledClass);
        }
        $nextEl[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
      }
    },
    onPrevClick: function onPrevClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isBeginning && !swiper.params.loop) { return; }
      swiper.slidePrev();
    },
    onNextClick: function onNextClick(e) {
      var swiper = this;
      e.preventDefault();
      if (swiper.isEnd && !swiper.params.loop) { return; }
      swiper.slideNext();
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.navigation;
      if (!(params.nextEl || params.prevEl)) { return; }

      var $nextEl;
      var $prevEl;
      if (params.nextEl) {
        $nextEl = $(params.nextEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.nextEl === 'string'
          && $nextEl.length > 1
          && swiper.$el.find(params.nextEl).length === 1
        ) {
          $nextEl = swiper.$el.find(params.nextEl);
        }
      }
      if (params.prevEl) {
        $prevEl = $(params.prevEl);
        if (
          swiper.params.uniqueNavElements
          && typeof params.prevEl === 'string'
          && $prevEl.length > 1
          && swiper.$el.find(params.prevEl).length === 1
        ) {
          $prevEl = swiper.$el.find(params.prevEl);
        }
      }

      if ($nextEl && $nextEl.length > 0) {
        $nextEl.on('click', swiper.navigation.onNextClick);
      }
      if ($prevEl && $prevEl.length > 0) {
        $prevEl.on('click', swiper.navigation.onPrevClick);
      }

      Utils.extend(swiper.navigation, {
        $nextEl: $nextEl,
        nextEl: $nextEl && $nextEl[0],
        $prevEl: $prevEl,
        prevEl: $prevEl && $prevEl[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;
      if ($nextEl && $nextEl.length) {
        $nextEl.off('click', swiper.navigation.onNextClick);
        $nextEl.removeClass(swiper.params.navigation.disabledClass);
      }
      if ($prevEl && $prevEl.length) {
        $prevEl.off('click', swiper.navigation.onPrevClick);
        $prevEl.removeClass(swiper.params.navigation.disabledClass);
      }
    },
  };

  var Navigation$1 = {
    name: 'navigation',
    params: {
      navigation: {
        nextEl: null,
        prevEl: null,

        hideOnClick: false,
        disabledClass: 'swiper-button-disabled',
        hiddenClass: 'swiper-button-hidden',
        lockClass: 'swiper-button-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        navigation: {
          init: Navigation.init.bind(swiper),
          update: Navigation.update.bind(swiper),
          destroy: Navigation.destroy.bind(swiper),
          onNextClick: Navigation.onNextClick.bind(swiper),
          onPrevClick: Navigation.onPrevClick.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.navigation.init();
        swiper.navigation.update();
      },
      toEdge: function toEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        swiper.navigation.update();
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.navigation.destroy();
      },
      click: function click(e) {
        var swiper = this;
        var ref = swiper.navigation;
        var $nextEl = ref.$nextEl;
        var $prevEl = ref.$prevEl;
        if (
          swiper.params.navigation.hideOnClick
          && !$(e.target).is($prevEl)
          && !$(e.target).is($nextEl)
        ) {
          var isHidden;
          if ($nextEl) {
            isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
          } else if ($prevEl) {
            isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
          }
          if (isHidden === true) {
            swiper.emit('navigationShow', swiper);
          } else {
            swiper.emit('navigationHide', swiper);
          }
          if ($nextEl) {
            $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
          if ($prevEl) {
            $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
          }
        }
      },
    },
  };

  var Pagination = {
    update: function update() {
      // Render || Update Pagination bullets/items
      var swiper = this;
      var rtl = swiper.rtl;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
      var $el = swiper.pagination.$el;
      // Current/Total
      var current;
      var total = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
      if (swiper.params.loop) {
        current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);
        if (current > slidesLength - 1 - (swiper.loopedSlides * 2)) {
          current -= (slidesLength - (swiper.loopedSlides * 2));
        }
        if (current > total - 1) { current -= total; }
        if (current < 0 && swiper.params.paginationType !== 'bullets') { current = total + current; }
      } else if (typeof swiper.snapIndex !== 'undefined') {
        current = swiper.snapIndex;
      } else {
        current = swiper.activeIndex || 0;
      }
      // Types
      if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
        var bullets = swiper.pagination.bullets;
        var firstIndex;
        var lastIndex;
        var midIndex;
        if (params.dynamicBullets) {
          swiper.pagination.bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
          $el.css(swiper.isHorizontal() ? 'width' : 'height', ((swiper.pagination.bulletSize * (params.dynamicMainBullets + 4)) + "px"));
          if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
            swiper.pagination.dynamicBulletIndex += (current - swiper.previousIndex);
            if (swiper.pagination.dynamicBulletIndex > (params.dynamicMainBullets - 1)) {
              swiper.pagination.dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (swiper.pagination.dynamicBulletIndex < 0) {
              swiper.pagination.dynamicBulletIndex = 0;
            }
          }
          firstIndex = current - swiper.pagination.dynamicBulletIndex;
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.removeClass(((params.bulletActiveClass) + " " + (params.bulletActiveClass) + "-next " + (params.bulletActiveClass) + "-next-next " + (params.bulletActiveClass) + "-prev " + (params.bulletActiveClass) + "-prev-prev " + (params.bulletActiveClass) + "-main"));
        if ($el.length > 1) {
          bullets.each(function (index, bullet) {
            var $bullet = $(bullet);
            var bulletIndex = $bullet.index();
            if (bulletIndex === current) {
              $bullet.addClass(params.bulletActiveClass);
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                $bullet.addClass(((params.bulletActiveClass) + "-main"));
              }
              if (bulletIndex === firstIndex) {
                $bullet
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev"))
                  .prev()
                  .addClass(((params.bulletActiveClass) + "-prev-prev"));
              }
              if (bulletIndex === lastIndex) {
                $bullet
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next"))
                  .next()
                  .addClass(((params.bulletActiveClass) + "-next-next"));
              }
            }
          });
        } else {
          var $bullet = bullets.eq(current);
          $bullet.addClass(params.bulletActiveClass);
          if (params.dynamicBullets) {
            var $firstDisplayedBullet = bullets.eq(firstIndex);
            var $lastDisplayedBullet = bullets.eq(lastIndex);
            for (var i = firstIndex; i <= lastIndex; i += 1) {
              bullets.eq(i).addClass(((params.bulletActiveClass) + "-main"));
            }
            $firstDisplayedBullet
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev"))
              .prev()
              .addClass(((params.bulletActiveClass) + "-prev-prev"));
            $lastDisplayedBullet
              .next()
              .addClass(((params.bulletActiveClass) + "-next"))
              .next()
              .addClass(((params.bulletActiveClass) + "-next-next"));
          }
        }
        if (params.dynamicBullets) {
          var dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          var bulletsOffset = (((swiper.pagination.bulletSize * dynamicBulletsLength) - (swiper.pagination.bulletSize)) / 2) - (midIndex * swiper.pagination.bulletSize);
          var offsetProp = rtl ? 'right' : 'left';
          bullets.css(swiper.isHorizontal() ? offsetProp : 'top', (bulletsOffset + "px"));
        }
      }
      if (params.type === 'fraction') {
        $el.find(("." + (params.currentClass))).text(params.formatFractionCurrent(current + 1));
        $el.find(("." + (params.totalClass))).text(params.formatFractionTotal(total));
      }
      if (params.type === 'progressbar') {
        var progressbarDirection;
        if (params.progressbarOpposite) {
          progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
        } else {
          progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
        }
        var scale = (current + 1) / total;
        var scaleX = 1;
        var scaleY = 1;
        if (progressbarDirection === 'horizontal') {
          scaleX = scale;
        } else {
          scaleY = scale;
        }
        $el.find(("." + (params.progressbarFillClass))).transform(("translate3d(0,0,0) scaleX(" + scaleX + ") scaleY(" + scaleY + ")")).transition(swiper.params.speed);
      }
      if (params.type === 'custom' && params.renderCustom) {
        $el.html(params.renderCustom(swiper, current + 1, total));
        swiper.emit('paginationRender', swiper, $el[0]);
      } else {
        swiper.emit('paginationUpdate', swiper, $el[0]);
      }
      $el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
    },
    render: function render() {
      // Render Container
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var slidesLength = swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;

      var $el = swiper.pagination.$el;
      var paginationHTML = '';
      if (params.type === 'bullets') {
        var numberOfBullets = swiper.params.loop ? Math.ceil((slidesLength - (swiper.loopedSlides * 2)) / swiper.params.slidesPerGroup) : swiper.snapGrid.length;
        for (var i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
          } else {
            paginationHTML += "<" + (params.bulletElement) + " class=\"" + (params.bulletClass) + "\"></" + (params.bulletElement) + ">";
          }
        }
        $el.html(paginationHTML);
        swiper.pagination.bullets = $el.find(("." + (params.bulletClass)));
      }
      if (params.type === 'fraction') {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
        } else {
          paginationHTML = "<span class=\"" + (params.currentClass) + "\"></span>"
          + ' / '
          + "<span class=\"" + (params.totalClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type === 'progressbar') {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
        } else {
          paginationHTML = "<span class=\"" + (params.progressbarFillClass) + "\"></span>";
        }
        $el.html(paginationHTML);
      }
      if (params.type !== 'custom') {
        swiper.emit('paginationRender', swiper.pagination.$el[0]);
      }
    },
    init: function init() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el) { return; }

      var $el = $(params.el);
      if ($el.length === 0) { return; }

      if (
        swiper.params.uniqueNavElements
        && typeof params.el === 'string'
        && $el.length > 1
        && swiper.$el.find(params.el).length === 1
      ) {
        $el = swiper.$el.find(params.el);
      }

      if (params.type === 'bullets' && params.clickable) {
        $el.addClass(params.clickableClass);
      }

      $el.addClass(params.modifierClass + params.type);

      if (params.type === 'bullets' && params.dynamicBullets) {
        $el.addClass(("" + (params.modifierClass) + (params.type) + "-dynamic"));
        swiper.pagination.dynamicBulletIndex = 0;
        if (params.dynamicMainBullets < 1) {
          params.dynamicMainBullets = 1;
        }
      }
      if (params.type === 'progressbar' && params.progressbarOpposite) {
        $el.addClass(params.progressbarOppositeClass);
      }

      if (params.clickable) {
        $el.on('click', ("." + (params.bulletClass)), function onClick(e) {
          e.preventDefault();
          var index = $(this).index() * swiper.params.slidesPerGroup;
          if (swiper.params.loop) { index += swiper.loopedSlides; }
          swiper.slideTo(index);
        });
      }

      Utils.extend(swiper.pagination, {
        $el: $el,
        el: $el[0],
      });
    },
    destroy: function destroy() {
      var swiper = this;
      var params = swiper.params.pagination;
      if (!params.el || !swiper.pagination.el || !swiper.pagination.$el || swiper.pagination.$el.length === 0) { return; }
      var $el = swiper.pagination.$el;

      $el.removeClass(params.hiddenClass);
      $el.removeClass(params.modifierClass + params.type);
      if (swiper.pagination.bullets) { swiper.pagination.bullets.removeClass(params.bulletActiveClass); }
      if (params.clickable) {
        $el.off('click', ("." + (params.bulletClass)));
      }
    },
  };

  var Pagination$1 = {
    name: 'pagination',
    params: {
      pagination: {
        el: null,
        bulletElement: 'span',
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: 'bullets', // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: function (number) { return number; },
        formatFractionTotal: function (number) { return number; },
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        modifierClass: 'swiper-pagination-', // NEW
        currentClass: 'swiper-pagination-current',
        totalClass: 'swiper-pagination-total',
        hiddenClass: 'swiper-pagination-hidden',
        progressbarFillClass: 'swiper-pagination-progressbar-fill',
        progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
        clickableClass: 'swiper-pagination-clickable', // NEW
        lockClass: 'swiper-pagination-lock',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        pagination: {
          init: Pagination.init.bind(swiper),
          render: Pagination.render.bind(swiper),
          update: Pagination.update.bind(swiper),
          destroy: Pagination.destroy.bind(swiper),
          dynamicBulletIndex: 0,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();
      },
      activeIndexChange: function activeIndexChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.update();
        } else if (typeof swiper.snapIndex === 'undefined') {
          swiper.pagination.update();
        }
      },
      snapIndexChange: function snapIndexChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.update();
        }
      },
      slidesLengthChange: function slidesLengthChange() {
        var swiper = this;
        if (swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      snapGridLengthChange: function snapGridLengthChange() {
        var swiper = this;
        if (!swiper.params.loop) {
          swiper.pagination.render();
          swiper.pagination.update();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.pagination.destroy();
      },
      click: function click(e) {
        var swiper = this;
        if (
          swiper.params.pagination.el
          && swiper.params.pagination.hideOnClick
          && swiper.pagination.$el.length > 0
          && !$(e.target).hasClass(swiper.params.pagination.bulletClass)
        ) {
          var isHidden = swiper.pagination.$el.hasClass(swiper.params.pagination.hiddenClass);
          if (isHidden === true) {
            swiper.emit('paginationShow', swiper);
          } else {
            swiper.emit('paginationHide', swiper);
          }
          swiper.pagination.$el.toggleClass(swiper.params.pagination.hiddenClass);
        }
      },
    },
  };

  var Scrollbar = {
    setTranslate: function setTranslate() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var progress = swiper.progress;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;
      var params = swiper.params.scrollbar;

      var newSize = dragSize;
      var newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper.isHorizontal()) {
        $dragEl.transform(("translate3d(" + newPos + "px, 0, 0)"));
        $dragEl[0].style.width = newSize + "px";
      } else {
        $dragEl.transform(("translate3d(0px, " + newPos + "px, 0)"));
        $dragEl[0].style.height = newSize + "px";
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.timeout);
        $el[0].style.opacity = 1;
        swiper.scrollbar.timeout = setTimeout(function () {
          $el[0].style.opacity = 0;
          $el.transition(400);
        }, 1000);
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }
      swiper.scrollbar.$dragEl.transition(duration);
    },
    updateSize: function updateSize() {
      var swiper = this;
      if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) { return; }

      var scrollbar = swiper.scrollbar;
      var $dragEl = scrollbar.$dragEl;
      var $el = scrollbar.$el;

      $dragEl[0].style.width = '';
      $dragEl[0].style.height = '';
      var trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;

      var divider = swiper.size / swiper.virtualSize;
      var moveDivider = divider * (trackSize / swiper.size);
      var dragSize;
      if (swiper.params.scrollbar.dragSize === 'auto') {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
      }

      if (swiper.isHorizontal()) {
        $dragEl[0].style.width = dragSize + "px";
      } else {
        $dragEl[0].style.height = dragSize + "px";
      }

      if (divider >= 1) {
        $el[0].style.display = 'none';
      } else {
        $el[0].style.display = '';
      }
      if (swiper.params.scrollbar.hide) {
        $el[0].style.opacity = 0;
      }
      Utils.extend(scrollbar, {
        trackSize: trackSize,
        divider: divider,
        moveDivider: moveDivider,
        dragSize: dragSize,
      });
      scrollbar.$el[swiper.params.watchOverflow && swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
    },
    getPointerPosition: function getPointerPosition(e) {
      var swiper = this;
      if (swiper.isHorizontal()) {
        return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageX : e.pageX || e.clientX);
      }
      return ((e.type === 'touchstart' || e.type === 'touchmove') ? e.targetTouches[0].pageY : e.pageY || e.clientY);
    },
    setDragPosition: function setDragPosition(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var rtl = swiper.rtlTranslate;
      var $el = scrollbar.$el;
      var dragSize = scrollbar.dragSize;
      var trackSize = scrollbar.trackSize;
      var dragStartPos = scrollbar.dragStartPos;

      var positionRatio;
      positionRatio = ((scrollbar.getPointerPosition(e)) - $el.offset()[swiper.isHorizontal() ? 'left' : 'top']
        - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }

      var position = swiper.minTranslate() + ((swiper.maxTranslate() - swiper.minTranslate()) * positionRatio);

      swiper.updateProgress(position);
      swiper.setTranslate(position);
      swiper.updateActiveIndex();
      swiper.updateSlidesClasses();
    },
    onDragStart: function onDragStart(e) {
      var swiper = this;
      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;
      swiper.scrollbar.isTouched = true;
      swiper.scrollbar.dragStartPos = (e.target === $dragEl[0] || e.target === $dragEl)
        ? scrollbar.getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top'] : null;
      e.preventDefault();
      e.stopPropagation();

      $wrapperEl.transition(100);
      $dragEl.transition(100);
      scrollbar.setDragPosition(e);

      clearTimeout(swiper.scrollbar.dragTimeout);

      $el.transition(0);
      if (params.hide) {
        $el.css('opacity', 1);
      }
      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', 'none');
      }
      swiper.emit('scrollbarDragStart', e);
    },
    onDragMove: function onDragMove(e) {
      var swiper = this;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;
      var $dragEl = scrollbar.$dragEl;

      if (!swiper.scrollbar.isTouched) { return; }
      if (e.preventDefault) { e.preventDefault(); }
      else { e.returnValue = false; }
      scrollbar.setDragPosition(e);
      $wrapperEl.transition(0);
      $el.transition(0);
      $dragEl.transition(0);
      swiper.emit('scrollbarDragMove', e);
    },
    onDragEnd: function onDragEnd(e) {
      var swiper = this;

      var params = swiper.params.scrollbar;
      var scrollbar = swiper.scrollbar;
      var $wrapperEl = swiper.$wrapperEl;
      var $el = scrollbar.$el;

      if (!swiper.scrollbar.isTouched) { return; }
      swiper.scrollbar.isTouched = false;
      if (swiper.params.cssMode) {
        swiper.$wrapperEl.css('scroll-snap-type', '');
        $wrapperEl.transition('');
      }
      if (params.hide) {
        clearTimeout(swiper.scrollbar.dragTimeout);
        swiper.scrollbar.dragTimeout = Utils.nextTick(function () {
          $el.css('opacity', 0);
          $el.transition(400);
        }, 1000);
      }
      swiper.emit('scrollbarDragEnd', e);
      if (params.snapOnRelease) {
        swiper.slideToClosest();
      }
    },
    enableDraggable: function enableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.addEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.addEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.addEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.addEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.addEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.addEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    disableDraggable: function disableDraggable() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var touchEventsTouch = swiper.touchEventsTouch;
      var touchEventsDesktop = swiper.touchEventsDesktop;
      var params = swiper.params;
      var $el = scrollbar.$el;
      var target = $el[0];
      var activeListener = Support.passiveListener && params.passiveListeners ? { passive: false, capture: false } : false;
      var passiveListener = Support.passiveListener && params.passiveListeners ? { passive: true, capture: false } : false;
      if (!Support.touch) {
        target.removeEventListener(touchEventsDesktop.start, swiper.scrollbar.onDragStart, activeListener);
        doc.removeEventListener(touchEventsDesktop.move, swiper.scrollbar.onDragMove, activeListener);
        doc.removeEventListener(touchEventsDesktop.end, swiper.scrollbar.onDragEnd, passiveListener);
      } else {
        target.removeEventListener(touchEventsTouch.start, swiper.scrollbar.onDragStart, activeListener);
        target.removeEventListener(touchEventsTouch.move, swiper.scrollbar.onDragMove, activeListener);
        target.removeEventListener(touchEventsTouch.end, swiper.scrollbar.onDragEnd, passiveListener);
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.scrollbar.el) { return; }
      var scrollbar = swiper.scrollbar;
      var $swiperEl = swiper.$el;
      var params = swiper.params.scrollbar;

      var $el = $(params.el);
      if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1 && $swiperEl.find(params.el).length === 1) {
        $el = $swiperEl.find(params.el);
      }

      var $dragEl = $el.find(("." + (swiper.params.scrollbar.dragClass)));
      if ($dragEl.length === 0) {
        $dragEl = $(("<div class=\"" + (swiper.params.scrollbar.dragClass) + "\"></div>"));
        $el.append($dragEl);
      }

      Utils.extend(scrollbar, {
        $el: $el,
        el: $el[0],
        $dragEl: $dragEl,
        dragEl: $dragEl[0],
      });

      if (params.draggable) {
        scrollbar.enableDraggable();
      }
    },
    destroy: function destroy() {
      var swiper = this;
      swiper.scrollbar.disableDraggable();
    },
  };

  var Scrollbar$1 = {
    name: 'scrollbar',
    params: {
      scrollbar: {
        el: null,
        dragSize: 'auto',
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: 'swiper-scrollbar-lock',
        dragClass: 'swiper-scrollbar-drag',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        scrollbar: {
          init: Scrollbar.init.bind(swiper),
          destroy: Scrollbar.destroy.bind(swiper),
          updateSize: Scrollbar.updateSize.bind(swiper),
          setTranslate: Scrollbar.setTranslate.bind(swiper),
          setTransition: Scrollbar.setTransition.bind(swiper),
          enableDraggable: Scrollbar.enableDraggable.bind(swiper),
          disableDraggable: Scrollbar.disableDraggable.bind(swiper),
          setDragPosition: Scrollbar.setDragPosition.bind(swiper),
          getPointerPosition: Scrollbar.getPointerPosition.bind(swiper),
          onDragStart: Scrollbar.onDragStart.bind(swiper),
          onDragMove: Scrollbar.onDragMove.bind(swiper),
          onDragEnd: Scrollbar.onDragEnd.bind(swiper),
          isTouched: false,
          timeout: null,
          dragTimeout: null,
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        swiper.scrollbar.init();
        swiper.scrollbar.updateSize();
        swiper.scrollbar.setTranslate();
      },
      update: function update() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      resize: function resize() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        swiper.scrollbar.updateSize();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        swiper.scrollbar.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        swiper.scrollbar.setTransition(duration);
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.scrollbar.destroy();
      },
    },
  };

  var Parallax = {
    setTransform: function setTransform(el, progress) {
      var swiper = this;
      var rtl = swiper.rtl;

      var $el = $(el);
      var rtlFactor = rtl ? -1 : 1;

      var p = $el.attr('data-swiper-parallax') || '0';
      var x = $el.attr('data-swiper-parallax-x');
      var y = $el.attr('data-swiper-parallax-y');
      var scale = $el.attr('data-swiper-parallax-scale');
      var opacity = $el.attr('data-swiper-parallax-opacity');

      if (x || y) {
        x = x || '0';
        y = y || '0';
      } else if (swiper.isHorizontal()) {
        x = p;
        y = '0';
      } else {
        y = p;
        x = '0';
      }

      if ((x).indexOf('%') >= 0) {
        x = (parseInt(x, 10) * progress * rtlFactor) + "%";
      } else {
        x = (x * progress * rtlFactor) + "px";
      }
      if ((y).indexOf('%') >= 0) {
        y = (parseInt(y, 10) * progress) + "%";
      } else {
        y = (y * progress) + "px";
      }

      if (typeof opacity !== 'undefined' && opacity !== null) {
        var currentOpacity = opacity - ((opacity - 1) * (1 - Math.abs(progress)));
        $el[0].style.opacity = currentOpacity;
      }
      if (typeof scale === 'undefined' || scale === null) {
        $el.transform(("translate3d(" + x + ", " + y + ", 0px)"));
      } else {
        var currentScale = scale - ((scale - 1) * (1 - Math.abs(progress)));
        $el.transform(("translate3d(" + x + ", " + y + ", 0px) scale(" + currentScale + ")"));
      }
    },
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      var progress = swiper.progress;
      var snapGrid = swiper.snapGrid;
      $el.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
        .each(function (index, el) {
          swiper.parallax.setTransform(el, progress);
        });
      slides.each(function (slideIndex, slideEl) {
        var slideProgress = slideEl.progress;
        if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
          slideProgress += Math.ceil(slideIndex / 2) - (progress * (snapGrid.length - 1));
        }
        slideProgress = Math.min(Math.max(slideProgress, -1), 1);
        $(slideEl).find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
          .each(function (index, el) {
            swiper.parallax.setTransform(el, slideProgress);
          });
      });
    },
    setTransition: function setTransition(duration) {
      if ( duration === void 0 ) duration = this.params.speed;

      var swiper = this;
      var $el = swiper.$el;
      $el.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]')
        .each(function (index, parallaxEl) {
          var $parallaxEl = $(parallaxEl);
          var parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
          if (duration === 0) { parallaxDuration = 0; }
          $parallaxEl.transition(parallaxDuration);
        });
    },
  };

  var Parallax$1 = {
    name: 'parallax',
    params: {
      parallax: {
        enabled: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        parallax: {
          setTransform: Parallax.setTransform.bind(swiper),
          setTranslate: Parallax.setTranslate.bind(swiper),
          setTransition: Parallax.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      init: function init() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (!swiper.params.parallax.enabled) { return; }
        swiper.parallax.setTransition(duration);
      },
    },
  };

  var Zoom = {
    // Calc Scale From Multi-touches
    getDistanceBetweenTouches: function getDistanceBetweenTouches(e) {
      if (e.targetTouches.length < 2) { return 1; }
      var x1 = e.targetTouches[0].pageX;
      var y1 = e.targetTouches[0].pageY;
      var x2 = e.targetTouches[1].pageX;
      var y2 = e.targetTouches[1].pageY;
      var distance = Math.sqrt((Math.pow( (x2 - x1), 2 )) + (Math.pow( (y2 - y1), 2 )));
      return distance;
    },
    // Events
    onGestureStart: function onGestureStart(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      zoom.fakeGestureTouched = false;
      zoom.fakeGestureMoved = false;
      if (!Support.gestures) {
        if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureTouched = true;
        gesture.scaleStart = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$slideEl || !gesture.$slideEl.length) {
        gesture.$slideEl = $(e.target).closest('.swiper-slide');
        if (gesture.$slideEl.length === 0) { gesture.$slideEl = swiper.slides.eq(swiper.activeIndex); }
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
        gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
        if (gesture.$imageWrapEl.length === 0) {
          gesture.$imageEl = undefined;
          return;
        }
      }
      gesture.$imageEl.transition(0);
      swiper.zoom.isScaling = true;
    },
    onGestureChange: function onGestureChange(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
          return;
        }
        zoom.fakeGestureMoved = true;
        gesture.scaleMove = Zoom.getDistanceBetweenTouches(e);
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (Support.gestures) {
        zoom.scale = e.scale * zoom.currentScale;
      } else {
        zoom.scale = (gesture.scaleMove / gesture.scaleStart) * zoom.currentScale;
      }
      if (zoom.scale > gesture.maxRatio) {
        zoom.scale = (gesture.maxRatio - 1) + (Math.pow( ((zoom.scale - gesture.maxRatio) + 1), 0.5 ));
      }
      if (zoom.scale < params.minRatio) {
        zoom.scale = (params.minRatio + 1) - (Math.pow( ((params.minRatio - zoom.scale) + 1), 0.5 ));
      }
      gesture.$imageEl.transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    onGestureEnd: function onGestureEnd(e) {
      var swiper = this;
      var params = swiper.params.zoom;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (!Support.gestures) {
        if (!zoom.fakeGestureTouched || !zoom.fakeGestureMoved) {
          return;
        }
        if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !Device.android)) {
          return;
        }
        zoom.fakeGestureTouched = false;
        zoom.fakeGestureMoved = false;
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
      gesture.$imageEl.transition(swiper.params.speed).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
      zoom.currentScale = zoom.scale;
      zoom.isScaling = false;
      if (zoom.scale === 1) { gesture.$slideEl = undefined; }
    },
    onTouchStart: function onTouchStart(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (image.isTouched) { return; }
      if (Device.android) { e.preventDefault(); }
      image.isTouched = true;
      image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
    },
    onTouchMove: function onTouchMove(e) {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      swiper.allowClick = false;
      if (!image.isTouched || !gesture.$slideEl) { return; }

      if (!image.isMoved) {
        image.width = gesture.$imageEl[0].offsetWidth;
        image.height = gesture.$imageEl[0].offsetHeight;
        image.startX = Utils.getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
        image.startY = Utils.getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
        gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
        gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
        gesture.$imageWrapEl.transition(0);
        if (swiper.rtl) {
          image.startX = -image.startX;
          image.startY = -image.startY;
        }
      }
      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;

      if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) { return; }

      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;

      image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
      image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

      if (!image.isMoved && !zoom.isScaling) {
        if (
          swiper.isHorizontal()
          && (
            (Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x)
            || (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x)
          )
        ) {
          image.isTouched = false;
          return;
        } if (
          !swiper.isHorizontal()
          && (
            (Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y)
            || (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y)
          )
        ) {
          image.isTouched = false;
          return;
        }
      }
      e.preventDefault();
      e.stopPropagation();

      image.isMoved = true;
      image.currentX = (image.touchesCurrent.x - image.touchesStart.x) + image.startX;
      image.currentY = (image.touchesCurrent.y - image.touchesStart.y) + image.startY;

      if (image.currentX < image.minX) {
        image.currentX = (image.minX + 1) - (Math.pow( ((image.minX - image.currentX) + 1), 0.8 ));
      }
      if (image.currentX > image.maxX) {
        image.currentX = (image.maxX - 1) + (Math.pow( ((image.currentX - image.maxX) + 1), 0.8 ));
      }

      if (image.currentY < image.minY) {
        image.currentY = (image.minY + 1) - (Math.pow( ((image.minY - image.currentY) + 1), 0.8 ));
      }
      if (image.currentY > image.maxY) {
        image.currentY = (image.maxY - 1) + (Math.pow( ((image.currentY - image.maxY) + 1), 0.8 ));
      }

      // Velocity
      if (!velocity.prevPositionX) { velocity.prevPositionX = image.touchesCurrent.x; }
      if (!velocity.prevPositionY) { velocity.prevPositionY = image.touchesCurrent.y; }
      if (!velocity.prevTime) { velocity.prevTime = Date.now(); }
      velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
      velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
      if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) { velocity.x = 0; }
      if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) { velocity.y = 0; }
      velocity.prevPositionX = image.touchesCurrent.x;
      velocity.prevPositionY = image.touchesCurrent.y;
      velocity.prevTime = Date.now();

      gesture.$imageWrapEl.transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTouchEnd: function onTouchEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;
      var velocity = zoom.velocity;
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }
      if (!image.isTouched || !image.isMoved) {
        image.isTouched = false;
        image.isMoved = false;
        return;
      }
      image.isTouched = false;
      image.isMoved = false;
      var momentumDurationX = 300;
      var momentumDurationY = 300;
      var momentumDistanceX = velocity.x * momentumDurationX;
      var newPositionX = image.currentX + momentumDistanceX;
      var momentumDistanceY = velocity.y * momentumDurationY;
      var newPositionY = image.currentY + momentumDistanceY;

      // Fix duration
      if (velocity.x !== 0) { momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x); }
      if (velocity.y !== 0) { momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y); }
      var momentumDuration = Math.max(momentumDurationX, momentumDurationY);

      image.currentX = newPositionX;
      image.currentY = newPositionY;

      // Define if we need image drag
      var scaledWidth = image.width * zoom.scale;
      var scaledHeight = image.height * zoom.scale;
      image.minX = Math.min(((gesture.slideWidth / 2) - (scaledWidth / 2)), 0);
      image.maxX = -image.minX;
      image.minY = Math.min(((gesture.slideHeight / 2) - (scaledHeight / 2)), 0);
      image.maxY = -image.minY;
      image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
      image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);

      gesture.$imageWrapEl.transition(momentumDuration).transform(("translate3d(" + (image.currentX) + "px, " + (image.currentY) + "px,0)"));
    },
    onTransitionEnd: function onTransitionEnd() {
      var swiper = this;
      var zoom = swiper.zoom;
      var gesture = zoom.gesture;
      if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
        gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
        gesture.$imageWrapEl.transform('translate3d(0,0,0)');

        zoom.scale = 1;
        zoom.currentScale = 1;

        gesture.$slideEl = undefined;
        gesture.$imageEl = undefined;
        gesture.$imageWrapEl = undefined;
      }
    },
    // Toggle Zoom
    toggle: function toggle(e) {
      var swiper = this;
      var zoom = swiper.zoom;

      if (zoom.scale && zoom.scale !== 1) {
        // Zoom Out
        zoom.out();
      } else {
        // Zoom In
        zoom.in(e);
      }
    },
    in: function in$1(e) {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;
      var image = zoom.image;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      gesture.$slideEl.addClass(("" + (params.zoomedSlideClass)));

      var touchX;
      var touchY;
      var offsetX;
      var offsetY;
      var diffX;
      var diffY;
      var translateX;
      var translateY;
      var imageWidth;
      var imageHeight;
      var scaledWidth;
      var scaledHeight;
      var translateMinX;
      var translateMinY;
      var translateMaxX;
      var translateMaxY;
      var slideWidth;
      var slideHeight;

      if (typeof image.touchesStart.x === 'undefined' && e) {
        touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
        touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
      } else {
        touchX = image.touchesStart.x;
        touchY = image.touchesStart.y;
      }

      zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      zoom.currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
      if (e) {
        slideWidth = gesture.$slideEl[0].offsetWidth;
        slideHeight = gesture.$slideEl[0].offsetHeight;
        offsetX = gesture.$slideEl.offset().left;
        offsetY = gesture.$slideEl.offset().top;
        diffX = (offsetX + (slideWidth / 2)) - touchX;
        diffY = (offsetY + (slideHeight / 2)) - touchY;

        imageWidth = gesture.$imageEl[0].offsetWidth;
        imageHeight = gesture.$imageEl[0].offsetHeight;
        scaledWidth = imageWidth * zoom.scale;
        scaledHeight = imageHeight * zoom.scale;

        translateMinX = Math.min(((slideWidth / 2) - (scaledWidth / 2)), 0);
        translateMinY = Math.min(((slideHeight / 2) - (scaledHeight / 2)), 0);
        translateMaxX = -translateMinX;
        translateMaxY = -translateMinY;

        translateX = diffX * zoom.scale;
        translateY = diffY * zoom.scale;

        if (translateX < translateMinX) {
          translateX = translateMinX;
        }
        if (translateX > translateMaxX) {
          translateX = translateMaxX;
        }

        if (translateY < translateMinY) {
          translateY = translateMinY;
        }
        if (translateY > translateMaxY) {
          translateY = translateMaxY;
        }
      } else {
        translateX = 0;
        translateY = 0;
      }
      gesture.$imageWrapEl.transition(300).transform(("translate3d(" + translateX + "px, " + translateY + "px,0)"));
      gesture.$imageEl.transition(300).transform(("translate3d(0,0,0) scale(" + (zoom.scale) + ")"));
    },
    out: function out() {
      var swiper = this;

      var zoom = swiper.zoom;
      var params = swiper.params.zoom;
      var gesture = zoom.gesture;

      if (!gesture.$slideEl) {
        gesture.$slideEl = swiper.clickedSlide ? $(swiper.clickedSlide) : swiper.slides.eq(swiper.activeIndex);
        gesture.$imageEl = gesture.$slideEl.find('img, svg, canvas');
        gesture.$imageWrapEl = gesture.$imageEl.parent(("." + (params.containerClass)));
      }
      if (!gesture.$imageEl || gesture.$imageEl.length === 0) { return; }

      zoom.scale = 1;
      zoom.currentScale = 1;
      gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
      gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
      gesture.$slideEl.removeClass(("" + (params.zoomedSlideClass)));
      gesture.$slideEl = undefined;
    },
    // Attach/Detach Events
    enable: function enable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (zoom.enabled) { return; }
      zoom.enabled = true;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
      var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.on('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.on(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.on(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.on(swiper.touchEvents.cancel, '.swiper-slide', zoom.onGestureEnd, passiveListener);
        }
      }

      // Move image
      swiper.$wrapperEl.on(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
    },
    disable: function disable() {
      var swiper = this;
      var zoom = swiper.zoom;
      if (!zoom.enabled) { return; }

      swiper.zoom.enabled = false;

      var passiveListener = swiper.touchEvents.start === 'touchstart' && Support.passiveListener && swiper.params.passiveListeners ? { passive: true, capture: false } : false;
      var activeListenerWithCapture = Support.passiveListener ? { passive: false, capture: true } : true;

      // Scale image
      if (Support.gestures) {
        swiper.$wrapperEl.off('gesturestart', '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off('gesturechange', '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off('gestureend', '.swiper-slide', zoom.onGestureEnd, passiveListener);
      } else if (swiper.touchEvents.start === 'touchstart') {
        swiper.$wrapperEl.off(swiper.touchEvents.start, '.swiper-slide', zoom.onGestureStart, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.move, '.swiper-slide', zoom.onGestureChange, passiveListener);
        swiper.$wrapperEl.off(swiper.touchEvents.end, '.swiper-slide', zoom.onGestureEnd, passiveListener);
        if (swiper.touchEvents.cancel) {
          swiper.$wrapperEl.off(swiper.touchEvents.cancel, '.swiper-slide', zoom.onGestureEnd, passiveListener);
        }
      }

      // Move image
      swiper.$wrapperEl.off(swiper.touchEvents.move, ("." + (swiper.params.zoom.containerClass)), zoom.onTouchMove, activeListenerWithCapture);
    },
  };

  var Zoom$1 = {
    name: 'zoom',
    params: {
      zoom: {
        enabled: false,
        maxRatio: 3,
        minRatio: 1,
        toggle: true,
        containerClass: 'swiper-zoom-container',
        zoomedSlideClass: 'swiper-slide-zoomed',
      },
    },
    create: function create() {
      var swiper = this;
      var zoom = {
        enabled: false,
        scale: 1,
        currentScale: 1,
        isScaling: false,
        gesture: {
          $slideEl: undefined,
          slideWidth: undefined,
          slideHeight: undefined,
          $imageEl: undefined,
          $imageWrapEl: undefined,
          maxRatio: 3,
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
          touchesCurrent: {},
        },
        velocity: {
          x: undefined,
          y: undefined,
          prevPositionX: undefined,
          prevPositionY: undefined,
          prevTime: undefined,
        },
      };

      ('onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out').split(' ').forEach(function (methodName) {
        zoom[methodName] = Zoom[methodName].bind(swiper);
      });
      Utils.extend(swiper, {
        zoom: zoom,
      });

      var scale = 1;
      Object.defineProperty(swiper.zoom, 'scale', {
        get: function get() {
          return scale;
        },
        set: function set(value) {
          if (scale !== value) {
            var imageEl = swiper.zoom.gesture.$imageEl ? swiper.zoom.gesture.$imageEl[0] : undefined;
            var slideEl = swiper.zoom.gesture.$slideEl ? swiper.zoom.gesture.$slideEl[0] : undefined;
            swiper.emit('zoomChange', value, imageEl, slideEl);
          }
          scale = value;
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.zoom.enabled) {
          swiper.zoom.enable();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        swiper.zoom.disable();
      },
      touchStart: function touchStart(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchStart(e);
      },
      touchEnd: function touchEnd(e) {
        var swiper = this;
        if (!swiper.zoom.enabled) { return; }
        swiper.zoom.onTouchEnd(e);
      },
      doubleTap: function doubleTap(e) {
        var swiper = this;
        if (swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
          swiper.zoom.toggle(e);
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
          swiper.zoom.onTransitionEnd();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
          swiper.zoom.onTransitionEnd();
        }
      },
    },
  };

  var Lazy = {
    loadInSlide: function loadInSlide(index, loadInDuplicate) {
      if ( loadInDuplicate === void 0 ) loadInDuplicate = true;

      var swiper = this;
      var params = swiper.params.lazy;
      if (typeof index === 'undefined') { return; }
      if (swiper.slides.length === 0) { return; }
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;

      var $slideEl = isVirtual
        ? swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]"))
        : swiper.slides.eq(index);

      var $images = $slideEl.find(("." + (params.elementClass) + ":not(." + (params.loadedClass) + "):not(." + (params.loadingClass) + ")"));
      if ($slideEl.hasClass(params.elementClass) && !$slideEl.hasClass(params.loadedClass) && !$slideEl.hasClass(params.loadingClass)) {
        $images = $images.add($slideEl[0]);
      }
      if ($images.length === 0) { return; }

      $images.each(function (imageIndex, imageEl) {
        var $imageEl = $(imageEl);
        $imageEl.addClass(params.loadingClass);

        var background = $imageEl.attr('data-background');
        var src = $imageEl.attr('data-src');
        var srcset = $imageEl.attr('data-srcset');
        var sizes = $imageEl.attr('data-sizes');

        swiper.loadImage($imageEl[0], (src || background), srcset, sizes, false, function () {
          if (typeof swiper === 'undefined' || swiper === null || !swiper || (swiper && !swiper.params) || swiper.destroyed) { return; }
          if (background) {
            $imageEl.css('background-image', ("url(\"" + background + "\")"));
            $imageEl.removeAttr('data-background');
          } else {
            if (srcset) {
              $imageEl.attr('srcset', srcset);
              $imageEl.removeAttr('data-srcset');
            }
            if (sizes) {
              $imageEl.attr('sizes', sizes);
              $imageEl.removeAttr('data-sizes');
            }
            if (src) {
              $imageEl.attr('src', src);
              $imageEl.removeAttr('data-src');
            }
          }

          $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
          $slideEl.find(("." + (params.preloaderClass))).remove();
          if (swiper.params.loop && loadInDuplicate) {
            var slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');
            if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
              var originalSlide = swiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]:not(." + (swiper.params.slideDuplicateClass) + ")"));
              swiper.lazy.loadInSlide(originalSlide.index(), false);
            } else {
              var duplicatedSlide = swiper.$wrapperEl.children(("." + (swiper.params.slideDuplicateClass) + "[data-swiper-slide-index=\"" + slideOriginalIndex + "\"]"));
              swiper.lazy.loadInSlide(duplicatedSlide.index(), false);
            }
          }
          swiper.emit('lazyImageReady', $slideEl[0], $imageEl[0]);
        });

        swiper.emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
      });
    },
    load: function load() {
      var swiper = this;
      var $wrapperEl = swiper.$wrapperEl;
      var swiperParams = swiper.params;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var isVirtual = swiper.virtual && swiperParams.virtual.enabled;
      var params = swiperParams.lazy;

      var slidesPerView = swiperParams.slidesPerView;
      if (slidesPerView === 'auto') {
        slidesPerView = 0;
      }

      function slideExist(index) {
        if (isVirtual) {
          if ($wrapperEl.children(("." + (swiperParams.slideClass) + "[data-swiper-slide-index=\"" + index + "\"]")).length) {
            return true;
          }
        } else if (slides[index]) { return true; }
        return false;
      }
      function slideIndex(slideEl) {
        if (isVirtual) {
          return $(slideEl).attr('data-swiper-slide-index');
        }
        return $(slideEl).index();
      }

      if (!swiper.lazy.initialImageLoaded) { swiper.lazy.initialImageLoaded = true; }
      if (swiper.params.watchSlidesVisibility) {
        $wrapperEl.children(("." + (swiperParams.slideVisibleClass))).each(function (elIndex, slideEl) {
          var index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
          swiper.lazy.loadInSlide(index);
        });
      } else if (slidesPerView > 1) {
        for (var i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
          if (slideExist(i)) { swiper.lazy.loadInSlide(i); }
        }
      } else {
        swiper.lazy.loadInSlide(activeIndex);
      }
      if (params.loadPrevNext) {
        if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
          var amount = params.loadPrevNextAmount;
          var spv = slidesPerView;
          var maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
          var minIndex = Math.max(activeIndex - Math.max(spv, amount), 0);
          // Next Slides
          for (var i$1 = activeIndex + slidesPerView; i$1 < maxIndex; i$1 += 1) {
            if (slideExist(i$1)) { swiper.lazy.loadInSlide(i$1); }
          }
          // Prev Slides
          for (var i$2 = minIndex; i$2 < activeIndex; i$2 += 1) {
            if (slideExist(i$2)) { swiper.lazy.loadInSlide(i$2); }
          }
        } else {
          var nextSlide = $wrapperEl.children(("." + (swiperParams.slideNextClass)));
          if (nextSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(nextSlide)); }

          var prevSlide = $wrapperEl.children(("." + (swiperParams.slidePrevClass)));
          if (prevSlide.length > 0) { swiper.lazy.loadInSlide(slideIndex(prevSlide)); }
        }
      }
    },
  };

  var Lazy$1 = {
    name: 'lazy',
    params: {
      lazy: {
        enabled: false,
        loadPrevNext: false,
        loadPrevNextAmount: 1,
        loadOnTransitionStart: false,

        elementClass: 'swiper-lazy',
        loadingClass: 'swiper-lazy-loading',
        loadedClass: 'swiper-lazy-loaded',
        preloaderClass: 'swiper-lazy-preloader',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        lazy: {
          initialImageLoaded: false,
          load: Lazy.load.bind(swiper),
          loadInSlide: Lazy.loadInSlide.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
          swiper.params.preloadImages = false;
        }
      },
      init: function init() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.loop && swiper.params.initialSlide === 0) {
          swiper.lazy.load();
        }
      },
      scroll: function scroll() {
        var swiper = this;
        if (swiper.params.freeMode && !swiper.params.freeModeSticky) {
          swiper.lazy.load();
        }
      },
      resize: function resize() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      scrollbarDragMove: function scrollbarDragMove() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          swiper.lazy.load();
        }
      },
      transitionStart: function transitionStart() {
        var swiper = this;
        if (swiper.params.lazy.enabled) {
          if (swiper.params.lazy.loadOnTransitionStart || (!swiper.params.lazy.loadOnTransitionStart && !swiper.lazy.initialImageLoaded)) {
            swiper.lazy.load();
          }
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
          swiper.lazy.load();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.params.lazy.enabled && swiper.params.cssMode) {
          swiper.lazy.load();
        }
      },
    },
  };

  /* eslint no-bitwise: ["error", { "allow": [">>"] }] */

  var Controller = {
    LinearSpline: function LinearSpline(x, y) {
      var binarySearch = (function search() {
        var maxIndex;
        var minIndex;
        var guess;
        return function (array, val) {
          minIndex = -1;
          maxIndex = array.length;
          while (maxIndex - minIndex > 1) {
            guess = maxIndex + minIndex >> 1;
            if (array[guess] <= val) {
              minIndex = guess;
            } else {
              maxIndex = guess;
            }
          }
          return maxIndex;
        };
      }());
      this.x = x;
      this.y = y;
      this.lastIndex = x.length - 1;
      // Given an x value (x2), return the expected y2 value:
      // (x1,y1) is the known point before given value,
      // (x3,y3) is the known point after given value.
      var i1;
      var i3;

      this.interpolate = function interpolate(x2) {
        if (!x2) { return 0; }

        // Get the indexes of x1 and x3 (the array indexes before and after given x2):
        i3 = binarySearch(this.x, x2);
        i1 = i3 - 1;

        // We have our indexes i1 & i3, so we can calculate already:
        // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1
        return (((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1])) + this.y[i1];
      };
      return this;
    },
    // xxx: for now i will just save one spline function to to
    getInterpolateFunction: function getInterpolateFunction(c) {
      var swiper = this;
      if (!swiper.controller.spline) {
        swiper.controller.spline = swiper.params.loop
          ? new Controller.LinearSpline(swiper.slidesGrid, c.slidesGrid)
          : new Controller.LinearSpline(swiper.snapGrid, c.snapGrid);
      }
    },
    setTranslate: function setTranslate(setTranslate$1, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var multiplier;
      var controlledTranslate;
      function setControlledTranslate(c) {
        // this will create an Interpolate function based on the snapGrids
        // x is the Grid of the scrolled scroller and y will be the controlled scroller
        // it makes sense to create this only once and recall it for the interpolation
        // the function does a lot of value caching for performance
        var translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;
        if (swiper.params.controller.by === 'slide') {
          swiper.controller.getInterpolateFunction(c);
          // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
          // but it did not work out
          controlledTranslate = -swiper.controller.spline.interpolate(-translate);
        }

        if (!controlledTranslate || swiper.params.controller.by === 'container') {
          multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
          controlledTranslate = ((translate - swiper.minTranslate()) * multiplier) + c.minTranslate();
        }

        if (swiper.params.controller.inverse) {
          controlledTranslate = c.maxTranslate() - controlledTranslate;
        }
        c.updateProgress(controlledTranslate);
        c.setTranslate(controlledTranslate, swiper);
        c.updateActiveIndex();
        c.updateSlidesClasses();
      }
      if (Array.isArray(controlled)) {
        for (var i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTranslate(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTranslate(controlled);
      }
    },
    setTransition: function setTransition(duration, byController) {
      var swiper = this;
      var controlled = swiper.controller.control;
      var i;
      function setControlledTransition(c) {
        c.setTransition(duration, swiper);
        if (duration !== 0) {
          c.transitionStart();
          if (c.params.autoHeight) {
            Utils.nextTick(function () {
              c.updateAutoHeight();
            });
          }
          c.$wrapperEl.transitionEnd(function () {
            if (!controlled) { return; }
            if (c.params.loop && swiper.params.controller.by === 'slide') {
              c.loopFix();
            }
            c.transitionEnd();
          });
        }
      }
      if (Array.isArray(controlled)) {
        for (i = 0; i < controlled.length; i += 1) {
          if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
            setControlledTransition(controlled[i]);
          }
        }
      } else if (controlled instanceof Swiper && byController !== controlled) {
        setControlledTransition(controlled);
      }
    },
  };
  var Controller$1 = {
    name: 'controller',
    params: {
      controller: {
        control: undefined,
        inverse: false,
        by: 'slide', // or 'container'
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        controller: {
          control: swiper.params.controller.control,
          getInterpolateFunction: Controller.getInterpolateFunction.bind(swiper),
          setTranslate: Controller.setTranslate.bind(swiper),
          setTransition: Controller.setTransition.bind(swiper),
        },
      });
    },
    on: {
      update: function update() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        if (swiper.controller.spline) {
          swiper.controller.spline = undefined;
          delete swiper.controller.spline;
        }
      },
      setTranslate: function setTranslate(translate, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTranslate(translate, byController);
      },
      setTransition: function setTransition(duration, byController) {
        var swiper = this;
        if (!swiper.controller.control) { return; }
        swiper.controller.setTransition(duration, byController);
      },
    },
  };

  var a11y = {
    makeElFocusable: function makeElFocusable($el) {
      $el.attr('tabIndex', '0');
      return $el;
    },
    addElRole: function addElRole($el, role) {
      $el.attr('role', role);
      return $el;
    },
    addElLabel: function addElLabel($el, label) {
      $el.attr('aria-label', label);
      return $el;
    },
    disableEl: function disableEl($el) {
      $el.attr('aria-disabled', true);
      return $el;
    },
    enableEl: function enableEl($el) {
      $el.attr('aria-disabled', false);
      return $el;
    },
    onEnterKey: function onEnterKey(e) {
      var swiper = this;
      var params = swiper.params.a11y;
      if (e.keyCode !== 13) { return; }
      var $targetEl = $(e.target);
      if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
        if (!(swiper.isEnd && !swiper.params.loop)) {
          swiper.slideNext();
        }
        if (swiper.isEnd) {
          swiper.a11y.notify(params.lastSlideMessage);
        } else {
          swiper.a11y.notify(params.nextSlideMessage);
        }
      }
      if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
        if (!(swiper.isBeginning && !swiper.params.loop)) {
          swiper.slidePrev();
        }
        if (swiper.isBeginning) {
          swiper.a11y.notify(params.firstSlideMessage);
        } else {
          swiper.a11y.notify(params.prevSlideMessage);
        }
      }
      if (swiper.pagination && $targetEl.is(("." + (swiper.params.pagination.bulletClass)))) {
        $targetEl[0].click();
      }
    },
    notify: function notify(message) {
      var swiper = this;
      var notification = swiper.a11y.liveRegion;
      if (notification.length === 0) { return; }
      notification.html('');
      notification.html(message);
    },
    updateNavigation: function updateNavigation() {
      var swiper = this;

      if (swiper.params.loop) { return; }
      var ref = swiper.navigation;
      var $nextEl = ref.$nextEl;
      var $prevEl = ref.$prevEl;

      if ($prevEl && $prevEl.length > 0) {
        if (swiper.isBeginning) {
          swiper.a11y.disableEl($prevEl);
        } else {
          swiper.a11y.enableEl($prevEl);
        }
      }
      if ($nextEl && $nextEl.length > 0) {
        if (swiper.isEnd) {
          swiper.a11y.disableEl($nextEl);
        } else {
          swiper.a11y.enableEl($nextEl);
        }
      }
    },
    updatePagination: function updatePagination() {
      var swiper = this;
      var params = swiper.params.a11y;
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.bullets.each(function (bulletIndex, bulletEl) {
          var $bulletEl = $(bulletEl);
          swiper.a11y.makeElFocusable($bulletEl);
          swiper.a11y.addElRole($bulletEl, 'button');
          swiper.a11y.addElLabel($bulletEl, params.paginationBulletMessage.replace(/{{index}}/, $bulletEl.index() + 1));
        });
      }
    },
    init: function init() {
      var swiper = this;

      swiper.$el.append(swiper.a11y.liveRegion);

      // Navigation
      var params = swiper.params.a11y;
      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        swiper.a11y.makeElFocusable($nextEl);
        swiper.a11y.addElRole($nextEl, 'button');
        swiper.a11y.addElLabel($nextEl, params.nextSlideMessage);
        $nextEl.on('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        swiper.a11y.makeElFocusable($prevEl);
        swiper.a11y.addElRole($prevEl, 'button');
        swiper.a11y.addElLabel($prevEl, params.prevSlideMessage);
        $prevEl.on('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.on('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.a11y.liveRegion && swiper.a11y.liveRegion.length > 0) { swiper.a11y.liveRegion.remove(); }

      var $nextEl;
      var $prevEl;
      if (swiper.navigation && swiper.navigation.$nextEl) {
        $nextEl = swiper.navigation.$nextEl;
      }
      if (swiper.navigation && swiper.navigation.$prevEl) {
        $prevEl = swiper.navigation.$prevEl;
      }
      if ($nextEl) {
        $nextEl.off('keydown', swiper.a11y.onEnterKey);
      }
      if ($prevEl) {
        $prevEl.off('keydown', swiper.a11y.onEnterKey);
      }

      // Pagination
      if (swiper.pagination && swiper.params.pagination.clickable && swiper.pagination.bullets && swiper.pagination.bullets.length) {
        swiper.pagination.$el.off('keydown', ("." + (swiper.params.pagination.bulletClass)), swiper.a11y.onEnterKey);
      }
    },
  };
  var A11y = {
    name: 'a11y',
    params: {
      a11y: {
        enabled: true,
        notificationClass: 'swiper-notification',
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        a11y: {
          liveRegion: $(("<span class=\"" + (swiper.params.a11y.notificationClass) + "\" aria-live=\"assertive\" aria-atomic=\"true\"></span>")),
        },
      });
      Object.keys(a11y).forEach(function (methodName) {
        swiper.a11y[methodName] = a11y[methodName].bind(swiper);
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.init();
        swiper.a11y.updateNavigation();
      },
      toEdge: function toEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      fromEdge: function fromEdge() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updateNavigation();
      },
      paginationUpdate: function paginationUpdate() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.updatePagination();
      },
      destroy: function destroy() {
        var swiper = this;
        if (!swiper.params.a11y.enabled) { return; }
        swiper.a11y.destroy();
      },
    },
  };

  var History = {
    init: function init() {
      var swiper = this;
      if (!swiper.params.history) { return; }
      if (!win.history || !win.history.pushState) {
        swiper.params.history.enabled = false;
        swiper.params.hashNavigation.enabled = true;
        return;
      }
      var history = swiper.history;
      history.initialized = true;
      history.paths = History.getPathValues();
      if (!history.paths.key && !history.paths.value) { return; }
      history.scrollToSlide(0, history.paths.value, swiper.params.runCallbacksOnInit);
      if (!swiper.params.history.replaceState) {
        win.addEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (!swiper.params.history.replaceState) {
        win.removeEventListener('popstate', swiper.history.setHistoryPopState);
      }
    },
    setHistoryPopState: function setHistoryPopState() {
      var swiper = this;
      swiper.history.paths = History.getPathValues();
      swiper.history.scrollToSlide(swiper.params.speed, swiper.history.paths.value, false);
    },
    getPathValues: function getPathValues() {
      var pathArray = win.location.pathname.slice(1).split('/').filter(function (part) { return part !== ''; });
      var total = pathArray.length;
      var key = pathArray[total - 2];
      var value = pathArray[total - 1];
      return { key: key, value: value };
    },
    setHistory: function setHistory(key, index) {
      var swiper = this;
      if (!swiper.history.initialized || !swiper.params.history.enabled) { return; }
      var slide = swiper.slides.eq(index);
      var value = History.slugify(slide.attr('data-history'));
      if (!win.location.pathname.includes(key)) {
        value = key + "/" + value;
      }
      var currentState = win.history.state;
      if (currentState && currentState.value === value) {
        return;
      }
      if (swiper.params.history.replaceState) {
        win.history.replaceState({ value: value }, null, value);
      } else {
        win.history.pushState({ value: value }, null, value);
      }
    },
    slugify: function slugify(text) {
      return text.toString()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
    },
    scrollToSlide: function scrollToSlide(speed, value, runCallbacks) {
      var swiper = this;
      if (value) {
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHistory = History.slugify(slide.attr('data-history'));
          if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, runCallbacks);
          }
        }
      } else {
        swiper.slideTo(0, speed, runCallbacks);
      }
    },
  };

  var History$1 = {
    name: 'history',
    params: {
      history: {
        enabled: false,
        replaceState: false,
        key: 'slides',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        history: {
          init: History.init.bind(swiper),
          setHistory: History.setHistory.bind(swiper),
          setHistoryPopState: History.setHistoryPopState.bind(swiper),
          scrollToSlide: History.scrollToSlide.bind(swiper),
          destroy: History.destroy.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.history.enabled) {
          swiper.history.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.history.initialized) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.history.initialized && swiper.params.cssMode) {
          swiper.history.setHistory(swiper.params.history.key, swiper.activeIndex);
        }
      },
    },
  };

  var HashNavigation = {
    onHashCange: function onHashCange() {
      var swiper = this;
      var newHash = doc.location.hash.replace('#', '');
      var activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');
      if (newHash !== activeSlideHash) {
        var newIndex = swiper.$wrapperEl.children(("." + (swiper.params.slideClass) + "[data-hash=\"" + newHash + "\"]")).index();
        if (typeof newIndex === 'undefined') { return; }
        swiper.slideTo(newIndex);
      }
    },
    setHash: function setHash() {
      var swiper = this;
      if (!swiper.hashNavigation.initialized || !swiper.params.hashNavigation.enabled) { return; }
      if (swiper.params.hashNavigation.replaceState && win.history && win.history.replaceState) {
        win.history.replaceState(null, null, (("#" + (swiper.slides.eq(swiper.activeIndex).attr('data-hash'))) || ''));
      } else {
        var slide = swiper.slides.eq(swiper.activeIndex);
        var hash = slide.attr('data-hash') || slide.attr('data-history');
        doc.location.hash = hash || '';
      }
    },
    init: function init() {
      var swiper = this;
      if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) { return; }
      swiper.hashNavigation.initialized = true;
      var hash = doc.location.hash.replace('#', '');
      if (hash) {
        var speed = 0;
        for (var i = 0, length = swiper.slides.length; i < length; i += 1) {
          var slide = swiper.slides.eq(i);
          var slideHash = slide.attr('data-hash') || slide.attr('data-history');
          if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
            var index = slide.index();
            swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
          }
        }
      }
      if (swiper.params.hashNavigation.watchState) {
        $(win).on('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
    destroy: function destroy() {
      var swiper = this;
      if (swiper.params.hashNavigation.watchState) {
        $(win).off('hashchange', swiper.hashNavigation.onHashCange);
      }
    },
  };
  var HashNavigation$1 = {
    name: 'hash-navigation',
    params: {
      hashNavigation: {
        enabled: false,
        replaceState: false,
        watchState: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        hashNavigation: {
          initialized: false,
          init: HashNavigation.init.bind(swiper),
          destroy: HashNavigation.destroy.bind(swiper),
          setHash: HashNavigation.setHash.bind(swiper),
          onHashCange: HashNavigation.onHashCange.bind(swiper),
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.init();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.params.hashNavigation.enabled) {
          swiper.hashNavigation.destroy();
        }
      },
      transitionEnd: function transitionEnd() {
        var swiper = this;
        if (swiper.hashNavigation.initialized) {
          swiper.hashNavigation.setHash();
        }
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (swiper.hashNavigation.initialized && swiper.params.cssMode) {
          swiper.hashNavigation.setHash();
        }
      },
    },
  };

  /* eslint no-underscore-dangle: "off" */

  var Autoplay = {
    run: function run() {
      var swiper = this;
      var $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
      var delay = swiper.params.autoplay.delay;
      if ($activeSlideEl.attr('data-swiper-autoplay')) {
        delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
      }
      clearTimeout(swiper.autoplay.timeout);
      swiper.autoplay.timeout = Utils.nextTick(function () {
        if (swiper.params.autoplay.reverseDirection) {
          if (swiper.params.loop) {
            swiper.loopFix();
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.isBeginning) {
            swiper.slidePrev(swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else if (!swiper.params.autoplay.stopOnLastSlide) {
            swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
            swiper.emit('autoplay');
          } else {
            swiper.autoplay.stop();
          }
        } else if (swiper.params.loop) {
          swiper.loopFix();
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.isEnd) {
          swiper.slideNext(swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          swiper.slideTo(0, swiper.params.speed, true, true);
          swiper.emit('autoplay');
        } else {
          swiper.autoplay.stop();
        }
        if (swiper.params.cssMode && swiper.autoplay.running) { swiper.autoplay.run(); }
      }, delay);
    },
    start: function start() {
      var swiper = this;
      if (typeof swiper.autoplay.timeout !== 'undefined') { return false; }
      if (swiper.autoplay.running) { return false; }
      swiper.autoplay.running = true;
      swiper.emit('autoplayStart');
      swiper.autoplay.run();
      return true;
    },
    stop: function stop() {
      var swiper = this;
      if (!swiper.autoplay.running) { return false; }
      if (typeof swiper.autoplay.timeout === 'undefined') { return false; }

      if (swiper.autoplay.timeout) {
        clearTimeout(swiper.autoplay.timeout);
        swiper.autoplay.timeout = undefined;
      }
      swiper.autoplay.running = false;
      swiper.emit('autoplayStop');
      return true;
    },
    pause: function pause(speed) {
      var swiper = this;
      if (!swiper.autoplay.running) { return; }
      if (swiper.autoplay.paused) { return; }
      if (swiper.autoplay.timeout) { clearTimeout(swiper.autoplay.timeout); }
      swiper.autoplay.paused = true;
      if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
        swiper.autoplay.paused = false;
        swiper.autoplay.run();
      } else {
        swiper.$wrapperEl[0].addEventListener('transitionend', swiper.autoplay.onTransitionEnd);
        swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
      }
    },
  };

  var Autoplay$1 = {
    name: 'autoplay',
    params: {
      autoplay: {
        enabled: false,
        delay: 3000,
        waitForTransition: true,
        disableOnInteraction: true,
        stopOnLastSlide: false,
        reverseDirection: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        autoplay: {
          running: false,
          paused: false,
          run: Autoplay.run.bind(swiper),
          start: Autoplay.start.bind(swiper),
          stop: Autoplay.stop.bind(swiper),
          pause: Autoplay.pause.bind(swiper),
          onVisibilityChange: function onVisibilityChange() {
            if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
              swiper.autoplay.pause();
            }
            if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
              swiper.autoplay.run();
            }
          },
          onTransitionEnd: function onTransitionEnd(e) {
            if (!swiper || swiper.destroyed || !swiper.$wrapperEl) { return; }
            if (e.target !== this) { return; }
            swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.autoplay.onTransitionEnd);
            swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.autoplay.onTransitionEnd);
            swiper.autoplay.paused = false;
            if (!swiper.autoplay.running) {
              swiper.autoplay.stop();
            } else {
              swiper.autoplay.run();
            }
          },
        },
      });
    },
    on: {
      init: function init() {
        var swiper = this;
        if (swiper.params.autoplay.enabled) {
          swiper.autoplay.start();
          document.addEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
        }
      },
      beforeTransitionStart: function beforeTransitionStart(speed, internal) {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (internal || !swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.pause(speed);
          } else {
            swiper.autoplay.stop();
          }
        }
      },
      sliderFirstMove: function sliderFirstMove() {
        var swiper = this;
        if (swiper.autoplay.running) {
          if (swiper.params.autoplay.disableOnInteraction) {
            swiper.autoplay.stop();
          } else {
            swiper.autoplay.pause();
          }
        }
      },
      touchEnd: function touchEnd() {
        var swiper = this;
        if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
          swiper.autoplay.run();
        }
      },
      destroy: function destroy() {
        var swiper = this;
        if (swiper.autoplay.running) {
          swiper.autoplay.stop();
        }
        document.removeEventListener('visibilitychange', swiper.autoplay.onVisibilityChange);
      },
    },
  };

  var Fade = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = swiper.slides.eq(i);
        var offset = $slideEl[0].swiperSlideOffset;
        var tx = -offset;
        if (!swiper.params.virtualTranslate) { tx -= swiper.translate; }
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        var slideOpacity = swiper.params.fadeEffect.crossFade
          ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
          : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
        $slideEl
          .css({
            opacity: slideOpacity,
          })
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      slides.transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        slides.transitionEnd(function () {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFade = {
    name: 'effect-fade',
    params: {
      fadeEffect: {
        crossFade: false,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        fadeEffect: {
          setTranslate: Fade.setTranslate.bind(swiper),
          setTransition: Fade.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "fade"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'fade') { return; }
        swiper.fadeEffect.setTransition(duration);
      },
    },
  };

  var Cube = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var $el = swiper.$el;
      var $wrapperEl = swiper.$wrapperEl;
      var slides = swiper.slides;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var rtl = swiper.rtlTranslate;
      var swiperSize = swiper.size;
      var params = swiper.params.cubeEffect;
      var isHorizontal = swiper.isHorizontal();
      var isVirtual = swiper.virtual && swiper.params.virtual.enabled;
      var wrapperRotate = 0;
      var $cubeShadowEl;
      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $wrapperEl.append($cubeShadowEl);
          }
          $cubeShadowEl.css({ height: (swiperWidth + "px") });
        } else {
          $cubeShadowEl = $el.find('.swiper-cube-shadow');
          if ($cubeShadowEl.length === 0) {
            $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
            $el.append($cubeShadowEl);
          }
        }
      }
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideIndex = i;
        if (isVirtual) {
          slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
        }
        var slideAngle = slideIndex * 90;
        var round = Math.floor(slideAngle / 360);
        if (rtl) {
          slideAngle = -slideAngle;
          round = Math.floor(-slideAngle / 360);
        }
        var progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        var tx = 0;
        var ty = 0;
        var tz = 0;
        if (slideIndex % 4 === 0) {
          tx = -round * 4 * swiperSize;
          tz = 0;
        } else if ((slideIndex - 1) % 4 === 0) {
          tx = 0;
          tz = -round * 4 * swiperSize;
        } else if ((slideIndex - 2) % 4 === 0) {
          tx = swiperSize + (round * 4 * swiperSize);
          tz = swiperSize;
        } else if ((slideIndex - 3) % 4 === 0) {
          tx = -swiperSize;
          tz = (3 * swiperSize) + (swiperSize * 4 * round);
        }
        if (rtl) {
          tx = -tx;
        }

        if (!isHorizontal) {
          ty = tx;
          tx = 0;
        }

        var transform = "rotateX(" + (isHorizontal ? 0 : -slideAngle) + "deg) rotateY(" + (isHorizontal ? slideAngle : 0) + "deg) translate3d(" + tx + "px, " + ty + "px, " + tz + "px)";
        if (progress <= 1 && progress > -1) {
          wrapperRotate = (slideIndex * 90) + (progress * 90);
          if (rtl) { wrapperRotate = (-slideIndex * 90) - (progress * 90); }
        }
        $slideEl.transform(transform);
        if (params.slideShadows) {
          // Set shadows
          var shadowBefore = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
      }
      $wrapperEl.css({
        '-webkit-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-moz-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        '-ms-transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
        'transform-origin': ("50% 50% -" + (swiperSize / 2) + "px"),
      });

      if (params.shadow) {
        if (isHorizontal) {
          $cubeShadowEl.transform(("translate3d(0px, " + ((swiperWidth / 2) + params.shadowOffset) + "px, " + (-swiperWidth / 2) + "px) rotateX(90deg) rotateZ(0deg) scale(" + (params.shadowScale) + ")"));
        } else {
          var shadowAngle = Math.abs(wrapperRotate) - (Math.floor(Math.abs(wrapperRotate) / 90) * 90);
          var multiplier = 1.5 - (
            (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2)
            + (Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2)
          );
          var scale1 = params.shadowScale;
          var scale2 = params.shadowScale / multiplier;
          var offset = params.shadowOffset;
          $cubeShadowEl.transform(("scale3d(" + scale1 + ", 1, " + scale2 + ") translate3d(0px, " + ((swiperHeight / 2) + offset) + "px, " + (-swiperHeight / 2 / scale2) + "px) rotateX(-90deg)"));
        }
      }
      var zFactor = (Browser.isSafari || Browser.isUiWebView) ? (-swiperSize / 2) : 0;
      $wrapperEl
        .transform(("translate3d(0px,0," + zFactor + "px) rotateX(" + (swiper.isHorizontal() ? 0 : wrapperRotate) + "deg) rotateY(" + (swiper.isHorizontal() ? -wrapperRotate : 0) + "deg)"));
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var $el = swiper.$el;
      var slides = swiper.slides;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
        $el.find('.swiper-cube-shadow').transition(duration);
      }
    },
  };

  var EffectCube = {
    name: 'effect-cube',
    params: {
      cubeEffect: {
        slideShadows: true,
        shadow: true,
        shadowOffset: 20,
        shadowScale: 0.94,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        cubeEffect: {
          setTranslate: Cube.setTranslate.bind(swiper),
          setTransition: Cube.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "cube"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          resistanceRatio: 0,
          spaceBetween: 0,
          centeredSlides: false,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'cube') { return; }
        swiper.cubeEffect.setTransition(duration);
      },
    },
  };

  var Flip = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var slides = swiper.slides;
      var rtl = swiper.rtlTranslate;
      for (var i = 0; i < slides.length; i += 1) {
        var $slideEl = slides.eq(i);
        var progress = $slideEl[0].progress;
        if (swiper.params.flipEffect.limitRotation) {
          progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
        }
        var offset = $slideEl[0].swiperSlideOffset;
        var rotate = -180 * progress;
        var rotateY = rotate;
        var rotateX = 0;
        var tx = -offset;
        var ty = 0;
        if (!swiper.isHorizontal()) {
          ty = tx;
          tx = 0;
          rotateX = -rotateY;
          rotateY = 0;
        } else if (rtl) {
          rotateY = -rotateY;
        }

        $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

        if (swiper.params.flipEffect.slideShadows) {
          // Set shadows
          var shadowBefore = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var shadowAfter = swiper.isHorizontal() ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if (shadowBefore.length === 0) {
            shadowBefore = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'left' : 'top') + "\"></div>"));
            $slideEl.append(shadowBefore);
          }
          if (shadowAfter.length === 0) {
            shadowAfter = $(("<div class=\"swiper-slide-shadow-" + (swiper.isHorizontal() ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append(shadowAfter);
          }
          if (shadowBefore.length) { shadowBefore[0].style.opacity = Math.max(-progress, 0); }
          if (shadowAfter.length) { shadowAfter[0].style.opacity = Math.max(progress, 0); }
        }
        $slideEl
          .transform(("translate3d(" + tx + "px, " + ty + "px, 0px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)"));
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      var slides = swiper.slides;
      var activeIndex = swiper.activeIndex;
      var $wrapperEl = swiper.$wrapperEl;
      slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
      if (swiper.params.virtualTranslate && duration !== 0) {
        var eventTriggered = false;
        // eslint-disable-next-line
        slides.eq(activeIndex).transitionEnd(function onTransitionEnd() {
          if (eventTriggered) { return; }
          if (!swiper || swiper.destroyed) { return; }
          // if (!$(this).hasClass(swiper.params.slideActiveClass)) return;
          eventTriggered = true;
          swiper.animating = false;
          var triggerEvents = ['webkitTransitionEnd', 'transitionend'];
          for (var i = 0; i < triggerEvents.length; i += 1) {
            $wrapperEl.trigger(triggerEvents[i]);
          }
        });
      }
    },
  };

  var EffectFlip = {
    name: 'effect-flip',
    params: {
      flipEffect: {
        slideShadows: true,
        limitRotation: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        flipEffect: {
          setTranslate: Flip.setTranslate.bind(swiper),
          setTransition: Flip.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.classNames.push(((swiper.params.containerModifierClass) + "flip"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));
        var overwriteParams = {
          slidesPerView: 1,
          slidesPerColumn: 1,
          slidesPerGroup: 1,
          watchSlidesProgress: true,
          spaceBetween: 0,
          virtualTranslate: true,
        };
        Utils.extend(swiper.params, overwriteParams);
        Utils.extend(swiper.originalParams, overwriteParams);
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'flip') { return; }
        swiper.flipEffect.setTransition(duration);
      },
    },
  };

  var Coverflow = {
    setTranslate: function setTranslate() {
      var swiper = this;
      var swiperWidth = swiper.width;
      var swiperHeight = swiper.height;
      var slides = swiper.slides;
      var $wrapperEl = swiper.$wrapperEl;
      var slidesSizesGrid = swiper.slidesSizesGrid;
      var params = swiper.params.coverflowEffect;
      var isHorizontal = swiper.isHorizontal();
      var transform = swiper.translate;
      var center = isHorizontal ? -transform + (swiperWidth / 2) : -transform + (swiperHeight / 2);
      var rotate = isHorizontal ? params.rotate : -params.rotate;
      var translate = params.depth;
      // Each slide offset from center
      for (var i = 0, length = slides.length; i < length; i += 1) {
        var $slideEl = slides.eq(i);
        var slideSize = slidesSizesGrid[i];
        var slideOffset = $slideEl[0].swiperSlideOffset;
        var offsetMultiplier = ((center - slideOffset - (slideSize / 2)) / slideSize) * params.modifier;

        var rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
        var rotateX = isHorizontal ? 0 : rotate * offsetMultiplier;
        // var rotateZ = 0
        var translateZ = -translate * Math.abs(offsetMultiplier);

        var translateY = isHorizontal ? 0 : params.stretch * (offsetMultiplier);
        var translateX = isHorizontal ? params.stretch * (offsetMultiplier) : 0;

        // Fix for ultra small values
        if (Math.abs(translateX) < 0.001) { translateX = 0; }
        if (Math.abs(translateY) < 0.001) { translateY = 0; }
        if (Math.abs(translateZ) < 0.001) { translateZ = 0; }
        if (Math.abs(rotateY) < 0.001) { rotateY = 0; }
        if (Math.abs(rotateX) < 0.001) { rotateX = 0; }

        var slideTransform = "translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)  rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg)";

        $slideEl.transform(slideTransform);
        $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;
        if (params.slideShadows) {
          // Set shadows
          var $shadowBeforeEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-left') : $slideEl.find('.swiper-slide-shadow-top');
          var $shadowAfterEl = isHorizontal ? $slideEl.find('.swiper-slide-shadow-right') : $slideEl.find('.swiper-slide-shadow-bottom');
          if ($shadowBeforeEl.length === 0) {
            $shadowBeforeEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'left' : 'top') + "\"></div>"));
            $slideEl.append($shadowBeforeEl);
          }
          if ($shadowAfterEl.length === 0) {
            $shadowAfterEl = $(("<div class=\"swiper-slide-shadow-" + (isHorizontal ? 'right' : 'bottom') + "\"></div>"));
            $slideEl.append($shadowAfterEl);
          }
          if ($shadowBeforeEl.length) { $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0; }
          if ($shadowAfterEl.length) { $shadowAfterEl[0].style.opacity = (-offsetMultiplier) > 0 ? -offsetMultiplier : 0; }
        }
      }

      // Set correct perspective for IE10
      if (Support.pointerEvents || Support.prefixedPointerEvents) {
        var ws = $wrapperEl[0].style;
        ws.perspectiveOrigin = center + "px 50%";
      }
    },
    setTransition: function setTransition(duration) {
      var swiper = this;
      swiper.slides
        .transition(duration)
        .find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left')
        .transition(duration);
    },
  };

  var EffectCoverflow = {
    name: 'effect-coverflow',
    params: {
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        coverflowEffect: {
          setTranslate: Coverflow.setTranslate.bind(swiper),
          setTransition: Coverflow.setTransition.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }

        swiper.classNames.push(((swiper.params.containerModifierClass) + "coverflow"));
        swiper.classNames.push(((swiper.params.containerModifierClass) + "3d"));

        swiper.params.watchSlidesProgress = true;
        swiper.originalParams.watchSlidesProgress = true;
      },
      setTranslate: function setTranslate() {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTranslate();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        if (swiper.params.effect !== 'coverflow') { return; }
        swiper.coverflowEffect.setTransition(duration);
      },
    },
  };

  var Thumbs = {
    init: function init() {
      var swiper = this;
      var ref = swiper.params;
      var thumbsParams = ref.thumbs;
      var SwiperClass = swiper.constructor;
      if (thumbsParams.swiper instanceof SwiperClass) {
        swiper.thumbs.swiper = thumbsParams.swiper;
        Utils.extend(swiper.thumbs.swiper.originalParams, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
        Utils.extend(swiper.thumbs.swiper.params, {
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        });
      } else if (Utils.isObject(thumbsParams.swiper)) {
        swiper.thumbs.swiper = new SwiperClass(Utils.extend({}, thumbsParams.swiper, {
          watchSlidesVisibility: true,
          watchSlidesProgress: true,
          slideToClickedSlide: false,
        }));
        swiper.thumbs.swiperCreated = true;
      }
      swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
      swiper.thumbs.swiper.on('tap', swiper.thumbs.onThumbClick);
    },
    onThumbClick: function onThumbClick() {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }
      var clickedIndex = thumbsSwiper.clickedIndex;
      var clickedSlide = thumbsSwiper.clickedSlide;
      if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) { return; }
      if (typeof clickedIndex === 'undefined' || clickedIndex === null) { return; }
      var slideToIndex;
      if (thumbsSwiper.params.loop) {
        slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
      } else {
        slideToIndex = clickedIndex;
      }
      if (swiper.params.loop) {
        var currentIndex = swiper.activeIndex;
        if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
          swiper.loopFix();
          // eslint-disable-next-line
          swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
          currentIndex = swiper.activeIndex;
        }
        var prevIndex = swiper.slides.eq(currentIndex).prevAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        var nextIndex = swiper.slides.eq(currentIndex).nextAll(("[data-swiper-slide-index=\"" + slideToIndex + "\"]")).eq(0).index();
        if (typeof prevIndex === 'undefined') { slideToIndex = nextIndex; }
        else if (typeof nextIndex === 'undefined') { slideToIndex = prevIndex; }
        else if (nextIndex - currentIndex < currentIndex - prevIndex) { slideToIndex = nextIndex; }
        else { slideToIndex = prevIndex; }
      }
      swiper.slideTo(slideToIndex);
    },
    update: function update(initial) {
      var swiper = this;
      var thumbsSwiper = swiper.thumbs.swiper;
      if (!thumbsSwiper) { return; }

      var slidesPerView = thumbsSwiper.params.slidesPerView === 'auto'
        ? thumbsSwiper.slidesPerViewDynamic()
        : thumbsSwiper.params.slidesPerView;

      if (swiper.realIndex !== thumbsSwiper.realIndex) {
        var currentThumbsIndex = thumbsSwiper.activeIndex;
        var newThumbsIndex;
        if (thumbsSwiper.params.loop) {
          if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
            thumbsSwiper.loopFix();
            // eslint-disable-next-line
            thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
            currentThumbsIndex = thumbsSwiper.activeIndex;
          }
          // Find actual thumbs index to slide to
          var prevThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).prevAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          var nextThumbsIndex = thumbsSwiper.slides.eq(currentThumbsIndex).nextAll(("[data-swiper-slide-index=\"" + (swiper.realIndex) + "\"]")).eq(0).index();
          if (typeof prevThumbsIndex === 'undefined') { newThumbsIndex = nextThumbsIndex; }
          else if (typeof nextThumbsIndex === 'undefined') { newThumbsIndex = prevThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = currentThumbsIndex; }
          else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) { newThumbsIndex = nextThumbsIndex; }
          else { newThumbsIndex = prevThumbsIndex; }
        } else {
          newThumbsIndex = swiper.realIndex;
        }
        if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
          if (thumbsSwiper.params.centeredSlides) {
            if (newThumbsIndex > currentThumbsIndex) {
              newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
            } else {
              newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
            }
          } else if (newThumbsIndex > currentThumbsIndex) {
            newThumbsIndex = newThumbsIndex - slidesPerView + 1;
          }
          thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
        }
      }

      // Activate thumbs
      var thumbsToActivate = 1;
      var thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

      if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
        thumbsToActivate = swiper.params.slidesPerView;
      }

      thumbsSwiper.slides.removeClass(thumbActiveClass);
      if (thumbsSwiper.params.loop || (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)) {
        for (var i = 0; i < thumbsToActivate; i += 1) {
          thumbsSwiper.$wrapperEl.children(("[data-swiper-slide-index=\"" + (swiper.realIndex + i) + "\"]")).addClass(thumbActiveClass);
        }
      } else {
        for (var i$1 = 0; i$1 < thumbsToActivate; i$1 += 1) {
          thumbsSwiper.slides.eq(swiper.realIndex + i$1).addClass(thumbActiveClass);
        }
      }
    },
  };
  var Thumbs$1 = {
    name: 'thumbs',
    params: {
      thumbs: {
        swiper: null,
        slideThumbActiveClass: 'swiper-slide-thumb-active',
        thumbsContainerClass: 'swiper-container-thumbs',
      },
    },
    create: function create() {
      var swiper = this;
      Utils.extend(swiper, {
        thumbs: {
          swiper: null,
          init: Thumbs.init.bind(swiper),
          update: Thumbs.update.bind(swiper),
          onThumbClick: Thumbs.onThumbClick.bind(swiper),
        },
      });
    },
    on: {
      beforeInit: function beforeInit() {
        var swiper = this;
        var ref = swiper.params;
        var thumbs = ref.thumbs;
        if (!thumbs || !thumbs.swiper) { return; }
        swiper.thumbs.init();
        swiper.thumbs.update(true);
      },
      slideChange: function slideChange() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      update: function update() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      resize: function resize() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      observerUpdate: function observerUpdate() {
        var swiper = this;
        if (!swiper.thumbs.swiper) { return; }
        swiper.thumbs.update();
      },
      setTransition: function setTransition(duration) {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        thumbsSwiper.setTransition(duration);
      },
      beforeDestroy: function beforeDestroy() {
        var swiper = this;
        var thumbsSwiper = swiper.thumbs.swiper;
        if (!thumbsSwiper) { return; }
        if (swiper.thumbs.swiperCreated && thumbsSwiper) {
          thumbsSwiper.destroy();
        }
      },
    },
  };

  // Swiper Class

  var components = [
    Device$1,
    Support$1,
    Browser$1,
    Resize,
    Observer$1,
    Virtual$1,
    Keyboard$1,
    Mousewheel$1,
    Navigation$1,
    Pagination$1,
    Scrollbar$1,
    Parallax$1,
    Zoom$1,
    Lazy$1,
    Controller$1,
    A11y,
    History$1,
    HashNavigation$1,
    Autoplay$1,
    EffectFade,
    EffectCube,
    EffectFlip,
    EffectCoverflow,
    Thumbs$1
  ];

  if (typeof Swiper.use === 'undefined') {
    Swiper.use = Swiper.Class.use;
    Swiper.installModule = Swiper.Class.installModule;
  }

  Swiper.use(components);

  return Swiper;

}));

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _swiper = require("swiper");

var _swiper2 = _interopRequireDefault(_swiper);

var FronPageMainVisual = (function () {
  _createClass(FronPageMainVisual, null, [{
    key: "init",

    // 初期化
    value: function init() {
      var root = document.querySelector("[data-page=\"front-page\"] .main-visual");
      var figures = document.querySelectorAll("[data-page=\"front-page\"] .figures > figure");

      if (root && figures.length > 0) {
        // YouTube IFrame Player APIを読込み
        var script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        document.body.appendChild(script);

        // APIの準備完了後に初期化
        window.onYouTubeIframeAPIReady = function () {
          new FronPageMainVisual(root, figures);
        };
      }
    }

    // コンストラクタ
  }]);

  function FronPageMainVisual(root, figures) {
    var _this = this;

    _classCallCheck(this, FronPageMainVisual);

    this.root = root;
    this.single = figures.length === 1;
    this.swiper = null;
    this.swiperTouching = false;
    this.swiperAutoplay = {};
    this.videoPlayer = {};
    this.modalVideoPlayer = null;

    this.resizeVideoPlayers = this.resizeVideoPlayers.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    var container = this.root.querySelector(".swiper-wrapper");

    Array.from(figures).forEach(function (figure, index) {
      var slide = document.createElement("div");
      slide.classList.add("swiper-slide");
      slide.appendChild(_this.createLoader());
      slide.appendChild(_this.createCaption(figure));

      // 動画スライドを設定
      if (figure.classList.contains("wp-block-embed-youtube")) {
        var iframe = figure.querySelector("iframe");
        var videoId = iframe.src.match(/\/embed\/([^?]+)/)[1];
        slide.dataset.videoId = videoId;
        slide.style.backgroundImage = "url(https://img.youtube.com/vi/" + videoId + "/hqdefault.jpg)";
        // `url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg)`;
      }
      // 静止画スライドを設定
      else {
          var img = figure.querySelector("img");
          slide.style.backgroundImage = "url(" + img.src + ")";
        }

      figure.parentNode.removeChild(figure);
      container.appendChild(slide);
    });

    this.initSwiper();

    // Swiperの初期表示位置が下にずれる問題対策
    window.addEventListener("load", function () {
      window.dispatchEvent(new Event("resize"));
    });

    window.addEventListener("resize", this.resizeVideoPlayers);
  }

  // ローダー要素を生成

  _createClass(FronPageMainVisual, [{
    key: "createLoader",
    value: function createLoader() {
      var container = document.createElement("div");
      container.classList.add("loader");
      container.dataset.swiperParallax = -500;

      return container;
    }

    // キャプション要素を生成
  }, {
    key: "createCaption",
    value: function createCaption(figure) {
      var container = document.createElement("div");
      container.classList.add("caption");
      container.dataset.swiperParallax = -500;

      var title = figure.querySelector("figcaption strong");
      if (title) {
        title.classList.add("title");
        container.appendChild(title);
      }

      var link = figure.querySelector("figcaption a");
      if (link) {
        link.classList.add("link");
        container.appendChild(link);
      }

      return container;
    }

    // Swiper初期化
  }, {
    key: "initSwiper",
    value: function initSwiper() {
      var _this2 = this;

      this.swiper = new _swiper2["default"](this.root.querySelector(".swiper-container"), {
        init: false,
        loop: !this.single,
        allowTouchMove: !this.single,
        parallax: true,
        pagination: {
          el: this.single ? null : this.root.querySelector(".swiper-pagination")
        },
        on: {
          init: function init() {
            _this2.play(_this2.swiper.activeIndex);
          },
          slideChange: function slideChange() {
            _this2.play(_this2.swiper.activeIndex);
          },
          transitionEnd: function transitionEnd() {
            Array.from(_this2.swiper.slides).forEach(function (slide, index) {
              // スワイプ中にドラッグを維持していて
              // アクティブなスライドが再生終了した場合は最初から再生
              if (index === _this2.swiper.activeIndex) {
                if (slide.classList.contains("ended")) {
                  _this2.clear(index);
                  _this2.play(index);
                }
              }
              // 非アクティブなスライドをクリア
              else {
                  _this2.clear(index);
                }
            });
          },
          touchStart: function touchStart() {
            _this2.swiperTouching = true;
          },
          touchEnd: function touchEnd() {
            _this2.swiperTouching = false;
          }
        }
      });
      this.swiper.init();
    }

    // スライドを再生
  }, {
    key: "play",
    value: function play(index) {
      var _this3 = this;

      var slide = this.swiper.slides[index];
      if (slide.dataset.videoId) {
        // リンク先がYouTubeの場合はモーダル動画プレイヤーを生成
        var link = slide.querySelector(".caption .link");
        var linkMatches = link ? link.href.match(/www.youtube.com\/watch\?v=(.+)/) : null;
        if (linkMatches) {
          this.modalVideoPlayer = this.createModalVideoPlayer(linkMatches[1]);
          link.classList.add("play");
          link.addEventListener("click", this.openModal);
        }

        this.videoPlayer[index] = this.createVideoPlayer(index);
        this.resizeVideoPlayers();
      } else {
        slide.classList.add("playing");
        slide.classList.remove("ended");

        // スライドがひとつの場合は何もしない
        if (this.single) {
          return;
        }

        // 5秒で自動的に次へ
        this.swiperAutoplay[index] = setTimeout(function () {
          _this3.playNext(index);
        }, 1000 * 5);
      }
    }

    // 次のスライドを再生
  }, {
    key: "playNext",
    value: function playNext(index) {
      var slide = this.swiper.slides[index];
      slide.classList.remove("playing");
      slide.classList.add("ended");

      if (!this.swiperTouching && index === this.swiper.activeIndex) {
        this.swiper.slideNext(1000);
      }
    }

    // スライドをクリア
  }, {
    key: "clear",
    value: function clear(index) {
      var slide = this.swiper.slides[index];
      slide.classList.remove("loading", "playing", "ended");

      if (slide.dataset.videoId) {
        var container = slide.querySelector(".video-container");
        if (container) {
          container.parentNode.removeChild(container);
        }
        clearInterval(this.swiperAutoplay[index]);
      } else {
        clearTimeout(this.swiperAutoplay[index]);
      }
    }

    // 動画プレイヤーを生成
  }, {
    key: "createVideoPlayer",
    value: function createVideoPlayer(index) {
      var _this4 = this;

      var slide = this.swiper.slides[index];
      if (slide.querySelector(".video-container")) {
        return this.videoPlayer[index];
      }

      // 配置用コンテナを作成
      var container = document.createElement("div");
      container.classList.add("video-container");
      container.appendChild(document.createElement("div"));
      slide.appendChild(container);
      slide.classList.add("loading");

      return new YT.Player(container.firstChild, {
        videoId: slide.dataset.videoId,
        playerVars: {
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          rel: 0,
          mute: 1,
          playsinline: 1
        },
        events: {
          onReady: function onReady(e) {
            var videoPlayer = e.target;
            videoPlayer.playVideo();
          },
          onStateChange: function onStateChange(e) {
            var videoPlayer = e.target;
            switch (e.data) {
              case YT.PlayerState.PLAYING:
                slide.classList.remove("loading");
                slide.classList.add("playing");
                slide.classList.remove("ended");

                // スライドがひとつの場合は何もしない
                if (_this4.single) {
                  return;
                }

                // 動画の再生終了時間の1秒前に自動的に次へ
                var duration = videoPlayer.getDuration();
                _this4.swiperAutoplay[index] = setInterval(function () {
                  if (duration - videoPlayer.getCurrentTime() < 1) {
                    _this4.playNext(index);
                    clearInterval(_this4.swiperAutoplay[index]);
                  }
                }, 100);
                break;
              case YT.PlayerState.ENDED:
                // スライドがひとつの場合はループ再生
                if (_this4.single) {
                  videoPlayer.seekTo(0);
                  videoPlayer.playVideo();
                  return;
                }

                // 動画の再生終了後の関連動画表示前に停止
                videoPlayer.stopVideo();
                videoPlayer.destroy();
                break;
            }
          }
        }
      });
    }

    // モーダル動画プレイヤーを生成
  }, {
    key: "createModalVideoPlayer",
    value: function createModalVideoPlayer(videoId) {
      var modal = this.root.querySelector(".modal");

      // 配置用コンテナをクリア
      var container = modal.querySelector(".video-container");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      container.appendChild(document.createElement("div"));

      return new YT.Player(container.firstChild, {
        videoId: videoId,
        playerVars: {
          controls: 1,
          disablekb: 1,
          fs: 0,
          modestbranding: 0,
          iv_load_policy: 3,
          rel: 0,
          mute: 0,
          playsinline: 1
        },
        events: {
          onStateChange: function onStateChange(e) {
            var videoPlayer = e.target;
            switch (e.data) {
              case YT.PlayerState.ENDED:
                // 動画の再生終了後の関連動画表示前に停止
                videoPlayer.stopVideo();
                break;
            }
          }
        }
      });
    }

    // 動画プレイヤーのサイズを調整
  }, {
    key: "resizeVideoPlayers",
    value: function resizeVideoPlayers() {
      var width = window.innerWidth;
      var height = width * (9 / 16);
      var x = 0;
      var y = 0;

      // 基準の高さ
      var baseHeight = 375;
      if (width >= 1000) {
        baseHeight = 600;
      } else if (width >= 768) {
        baseHeight = 480;
      }

      // 縦位置を調整
      if (height > baseHeight) {
        y = (height - baseHeight) / -2;
      }
      // 高さが基準に満たない場合に幅と横位置を調整
      else {
          height = baseHeight;
          width = height * (16 / 9);
          x = (width - window.innerWidth) / -2;
        }

      Array.from(this.swiper.slides).forEach(function (slide) {
        var container = slide.querySelector(".video-container");
        if (container) {
          container.style.width = width + "px";
          container.style.height = height + "px";
          container.style.transform = "translate(" + x + "px, " + y + "px)";
        }
      });
    }

    // モーダルを開く
  }, {
    key: "openModal",
    value: function openModal(e) {
      e.preventDefault();

      var index = this.swiper.activeIndex;

      // スライドの動画を一時停止
      this.videoPlayer[index].pauseVideo();
      clearInterval(this.swiperAutoplay[index]);

      // モーダルの動画を再生
      this.modalVideoPlayer.playVideo();

      var modal = this.root.querySelector(".modal");
      modal.classList.add("active");
      modal.addEventListener("click", this.closeModal);
    }

    // モーダルを閉じる
  }, {
    key: "closeModal",
    value: function closeModal(e) {
      e.preventDefault();

      var index = this.swiper.activeIndex;

      // スライドの動画を再生
      this.videoPlayer[index].playVideo();

      // モーダルの動画を停止
      this.modalVideoPlayer.stopVideo();

      // 再帰的にモーダル要素を取得
      var modal = e.target;
      while (!modal.classList.contains("modal")) {
        modal = modal.parentNode;
      }
      modal.classList.remove("active");
    }
  }]);

  return FronPageMainVisual;
})();

exports["default"] = FronPageMainVisual;
module.exports = exports["default"];

},{"swiper":2}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _jumpJs = require("jump.js");

var _jumpJs2 = _interopRequireDefault(_jumpJs);

var Pagetop = (function () {
  _createClass(Pagetop, null, [{
    key: "init",
    value: function init() {
      var links = document.querySelectorAll("[data-component=\"pagetop\"]");
      if (links) {
        return new Pagetop(links);
      }
    }
  }]);

  function Pagetop(links) {
    _classCallCheck(this, Pagetop);

    Array.from(links).forEach(function (link) {
      link.addEventListener("click", function () {
        (0, _jumpJs2["default"])("body", { duration: 600 });
      });
    });
  }

  return Pagetop;
})();

exports["default"] = Pagetop;
module.exports = exports["default"];

},{"jump.js":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _swiper = require("swiper");

var _swiper2 = _interopRequireDefault(_swiper);

var Screenshots = (function () {
  _createClass(Screenshots, null, [{
    key: "init",

    // 初期化
    value: function init() {
      var root = document.querySelector("[data-component=\"screenshots\"]");
      if (root) {
        return new Screenshots(root);
      }
    }

    // コンストラクタ
  }]);

  function Screenshots(root) {
    _classCallCheck(this, Screenshots);

    this.root = root;
    this.swiper = null;

    this.initSwiper();
  }

  // Swiper初期化

  _createClass(Screenshots, [{
    key: "initSwiper",
    value: function initSwiper() {
      var _this = this;

      this.swiper = new _swiper2["default"](this.root.querySelector(".swiper-container"), {
        init: false,
        initialSlide: 1,
        centeredSlides: true,
        loop: true,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 30,
            allowTouchMove: true
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 30,
            allowTouchMove: true
          },
          1000: {
            slidesPerView: 3,
            allowTouchMove: false
          }
        },
        on: {
          init: function init() {
            setTimeout(function () {
              _this.swiperResize();
            }, 0);
          },
          resize: function resize() {
            _this.swiperResize();
          }
        }
      });
      this.swiper.init();
    }

    // リサイズ時に自動再生を切替え
  }, {
    key: "swiperResize",
    value: function swiperResize() {
      if (this.swiper.params.allowTouchMove) {
        this.swiper.autoplay.start();
      } else {
        this.swiper.autoplay.stop();
      }
    }
  }]);

  return Screenshots;
})();

exports["default"] = Screenshots;
module.exports = exports["default"];

},{"swiper":2}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _jquery = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

var _jquery2 = _interopRequireDefault(_jquery);

var SlideMenu = (function () {
	function SlideMenu($el) {
		_classCallCheck(this, SlideMenu);

		this.$el = $el;
		this.state = false;
		this.$target = (0, _jquery2['default'])(this.$el.data("slidemenu-target"));
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
		}
	}, {
		key: 'close',
		value: function close() {
			this.$target.height(this.$target.height());
			this.$target.height(0);
			this.$el.removeClass("is-open");
			this.$target.removeClass("is-open");
		}
	}], [{
		key: 'init',
		value: function init() {
			(0, _jquery2['default'])("[data-slidemenu-target]").each(function () {
				return new SlideMenu((0, _jquery2['default'])(this));
			});
		}
	}]);

	return SlideMenu;
})();

exports['default'] = SlideMenu;
module.exports = exports['default'];

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
(function (global){
var $, FixedNavbar, FixedSubNavbar, FronPageMainVisual, Pagetop, Screenshots, ScrollAction, SlideMenu, SubNavigation;

$ = (typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null);

FronPageMainVisual = require('./FronPageMainVisual');

Pagetop = require('./Pagetop');

Screenshots = require('./Screenshots');

SlideMenu = require('./SlideMenu');

FixedNavbar = require('./FixedNavbar');

ScrollAction = require('./ScrollAction');

SubNavigation = require('./SubNavigation');

FixedSubNavbar = require('./FixedSubNavbar');

$(function() {
  FronPageMainVisual.init();
  Pagetop.init();
  return Screenshots.init();
});

$(function() {
  return $('.menu-item-has-children').after().on('click', function(event) {
    if (!(!$(event.target).is('li'))) {
      return $(this).toggleClass('active');
    }
  });
});

$(function() {
  return $(window).on('load', function() {
    return $('.p-main-visual__overlay_fadeout').delay(5000).queue(function() {
      return $(this).addClass("p-main-visual__overlay_hide").dequeue();
    });
  });
});

$(function() {
  var youtube;
  $('a[href*="youtu.be"]').each(function() {
    var href;
    href = $(this).attr('href');
    href = href.replace("youtu.be/", "www.youtube.com/watch?v=");
    return $(this).attr('href', href);
  });
  youtube = $('a[href*="youtu"]:has(img):not(.header-youtube)');
  youtube.append('<div class="p-text-image-block__play-btn"/>');
  return youtube.magnificPopup({
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,
    fixedContentPos: false
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
    $(".p-navigation__item_tel-content").removeClass('is-active');
  } else {
    $(".p-navigation__item_tel-content").addClass('is-active');
  }
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

},{"./FixedNavbar":3,"./FixedSubNavbar":4,"./FronPageMainVisual":5,"./Pagetop":6,"./Screenshots":7,"./ScrollAction":8,"./SlideMenu":9,"./SubNavigation":10}]},{},[11])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvanVtcC5qcy9kaXN0L2p1bXAuanMiLCJub2RlX21vZHVsZXMvc3dpcGVyL2pzL3N3aXBlci5qcyIsInNjcmlwdHMvRml4ZWROYXZiYXIuY29mZmVlIiwic2NyaXB0cy9GaXhlZFN1Yk5hdmJhci5jb2ZmZWUiLCIvVXNlcnMvaW5hbW9yaS1uLXdvcmtzL0RvY3VtZW50cy93aGlsbC1ldXJvcGUuY29tL3dwLXRoZW1lLWFzc2V0cy9zY3JpcHRzL0Zyb25QYWdlTWFpblZpc3VhbC5qcyIsIi9Vc2Vycy9pbmFtb3JpLW4td29ya3MvRG9jdW1lbnRzL3doaWxsLWV1cm9wZS5jb20vd3AtdGhlbWUtYXNzZXRzL3NjcmlwdHMvUGFnZXRvcC5qcyIsIi9Vc2Vycy9pbmFtb3JpLW4td29ya3MvRG9jdW1lbnRzL3doaWxsLWV1cm9wZS5jb20vd3AtdGhlbWUtYXNzZXRzL3NjcmlwdHMvU2NyZWVuc2hvdHMuanMiLCJzY3JpcHRzL1Njcm9sbEFjdGlvbi5jb2ZmZWUiLCIvVXNlcnMvaW5hbW9yaS1uLXdvcmtzL0RvY3VtZW50cy93aGlsbC1ldXJvcGUuY29tL3dwLXRoZW1lLWFzc2V0cy9zY3JpcHRzL1NsaWRlTWVudS5qcyIsInNjcmlwdHMvU3ViTmF2aWdhdGlvbi5jb2ZmZWUiLCJzY3JpcHRzL2FsbC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN0bFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O3NCQzlDbUIsUUFBUTs7OztJQUVOLGtCQUFrQjtlQUFsQixrQkFBa0I7Ozs7V0FFMUIsZ0JBQUc7QUFDWixVQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLHlDQUF5QyxDQUFDLENBQUM7QUFDL0UsVUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDhDQUE4QyxDQUFDLENBQUM7O0FBRTFGLFVBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztBQUU5QixZQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2hELGNBQU0sQ0FBQyxHQUFHLEdBQUcsb0NBQW9DLENBQUM7QUFDbEQsZ0JBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7QUFHbEMsY0FBTSxDQUFDLHVCQUF1QixHQUFHLFlBQU07QUFDckMsY0FBSSxrQkFBa0IsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDdkMsQ0FBQztPQUNIO0tBQ0Y7Ozs7O0FBR1UsV0FwQlEsa0JBQWtCLENBb0J6QixJQUFJLEVBQUUsT0FBTyxFQUFFOzs7MEJBcEJSLGtCQUFrQjs7QUFxQm5DLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUM7QUFDbkMsUUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7QUFDbkIsUUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUM7QUFDNUIsUUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7QUFDekIsUUFBSSxDQUFDLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdEIsUUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQzs7QUFFN0IsUUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDN0QsUUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUMzQyxRQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOztBQUU3QyxRQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDOztBQUU3RCxTQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUs7QUFDN0MsVUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUM1QyxXQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwQyxXQUFLLENBQUMsV0FBVyxDQUFDLE1BQUssWUFBWSxFQUFFLENBQUMsQ0FBQztBQUN2QyxXQUFLLENBQUMsV0FBVyxDQUFDLE1BQUssYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztBQUc5QyxVQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7QUFDdkQsWUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QyxZQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hELGFBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztBQUNoQyxhQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsdUNBQ1MsT0FBTyxvQkFBaUIsQ0FBQzs7T0FFOUQ7O1dBRUk7QUFDSCxjQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLGVBQUssQ0FBQyxLQUFLLENBQUMsZUFBZSxZQUFVLEdBQUcsQ0FBQyxHQUFHLE1BQUcsQ0FBQztTQUNqRDs7QUFFRCxZQUFNLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxlQUFTLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQzlCLENBQUMsQ0FBQzs7QUFFSCxRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7OztBQUdsQixVQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLFlBQU07QUFDcEMsWUFBTSxDQUFDLGFBQWEsQ0FBQyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0tBQzNDLENBQUMsQ0FBQzs7QUFFSCxVQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0dBQzVEOzs7O2VBcEVrQixrQkFBa0I7O1dBdUV6Qix3QkFBRztBQUNiLFVBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsZUFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDbEMsZUFBUyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEdBQUcsQ0FBQyxHQUFHLENBQUM7O0FBRXhDLGFBQU8sU0FBUyxDQUFDO0tBQ2xCOzs7OztXQUdZLHVCQUFDLE1BQU0sRUFBRTtBQUNwQixVQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ2hELGVBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLGVBQVMsQ0FBQyxPQUFPLENBQUMsY0FBYyxHQUFHLENBQUMsR0FBRyxDQUFDOztBQUV4QyxVQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLENBQUM7QUFDeEQsVUFBSSxLQUFLLEVBQUU7QUFDVCxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUM3QixpQkFBUyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztPQUM5Qjs7QUFFRCxVQUFNLElBQUksR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0FBQ2xELFVBQUksSUFBSSxFQUFFO0FBQ1IsWUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDM0IsaUJBQVMsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDN0I7O0FBRUQsYUFBTyxTQUFTLENBQUM7S0FDbEI7Ozs7O1dBR1Msc0JBQUc7OztBQUNYLFVBQUksQ0FBQyxNQUFNLEdBQUcsd0JBQVcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsbUJBQW1CLENBQUMsRUFBRTtBQUNyRSxZQUFJLEVBQUUsS0FBSztBQUNYLFlBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNO0FBQ2xCLHNCQUFjLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTTtBQUM1QixnQkFBUSxFQUFFLElBQUk7QUFDZCxrQkFBVSxFQUFFO0FBQ1YsWUFBRSxFQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG9CQUFvQixDQUFDO1NBQ3ZFO0FBQ0QsVUFBRSxFQUFFO0FBQ0YsY0FBSSxFQUFFLGdCQUFNO0FBQ1YsbUJBQUssSUFBSSxDQUFDLE9BQUssTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1dBQ3BDO0FBQ0QscUJBQVcsRUFBRSx1QkFBTTtBQUNqQixtQkFBSyxJQUFJLENBQUMsT0FBSyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7V0FDcEM7QUFDRCx1QkFBYSxFQUFFLHlCQUFNO0FBQ25CLGlCQUFLLENBQUMsSUFBSSxDQUFDLE9BQUssTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQUssRUFBRSxLQUFLLEVBQUs7OztBQUd2RCxrQkFBSSxLQUFLLEtBQUssT0FBSyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQ3JDLG9CQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO0FBQ3JDLHlCQUFLLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNsQix5QkFBSyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ2xCO2VBQ0Y7O21CQUVJO0FBQ0gseUJBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNuQjthQUNGLENBQUMsQ0FBQztXQUNKO0FBQ0Qsb0JBQVUsRUFBRSxzQkFBTTtBQUNoQixtQkFBSyxjQUFjLEdBQUcsSUFBSSxDQUFDO1dBQzVCO0FBQ0Qsa0JBQVEsRUFBRSxvQkFBTTtBQUNkLG1CQUFLLGNBQWMsR0FBRyxLQUFLLENBQUM7V0FDN0I7U0FDRjtPQUNGLENBQUMsQ0FBQztBQUNILFVBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDcEI7Ozs7O1dBR0csY0FBQyxLQUFLLEVBQUU7OztBQUNWLFVBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hDLFVBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7O0FBRXpCLFlBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNuRCxZQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsR0FBRyxJQUFJLENBQUM7QUFDcEYsWUFBSSxXQUFXLEVBQUU7QUFDZixjQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BFLGNBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzNCLGNBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ2hEOztBQUVELFlBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3hELFlBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO09BQzNCLE1BQ0k7QUFDSCxhQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUMvQixhQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBR2hDLFlBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtBQUNmLGlCQUFPO1NBQ1I7OztBQUdELFlBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxDQUFDLFlBQU07QUFDNUMsaUJBQUssUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO09BQ2Q7S0FDRjs7Ozs7V0FHTyxrQkFBQyxLQUFLLEVBQUU7QUFDZCxVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxXQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzs7QUFFN0IsVUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFO0FBQzdELFlBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDO09BQzdCO0tBQ0Y7Ozs7O1dBR0ksZUFBQyxLQUFLLEVBQUU7QUFDWCxVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxXQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLE9BQU8sQ0FBQyxDQUFDOztBQUV0RCxVQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFO0FBQ3pCLFlBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMxRCxZQUFJLFNBQVMsRUFBRTtBQUNiLG1CQUFTLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUM3QztBQUNELHFCQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO09BQzNDLE1BQ0k7QUFDSCxvQkFBWSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztPQUMxQztLQUNGOzs7OztXQUdnQiwyQkFBQyxLQUFLLEVBQUU7OztBQUN2QixVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxVQUFJLEtBQUssQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsRUFBRTtBQUMzQyxlQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7T0FDaEM7OztBQUdELFVBQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDaEQsZUFBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUMsQ0FBQztBQUMzQyxlQUFTLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztBQUNyRCxXQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdCLFdBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDOztBQUUvQixhQUFPLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO0FBQ3pDLGVBQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU87QUFDOUIsa0JBQVUsRUFBRTtBQUNWLGtCQUFRLEVBQUUsQ0FBQztBQUNYLG1CQUFTLEVBQUUsQ0FBQztBQUNaLFlBQUUsRUFBRSxDQUFDO0FBQ0wsd0JBQWMsRUFBRSxDQUFDO0FBQ2pCLHdCQUFjLEVBQUUsQ0FBQztBQUNqQixhQUFHLEVBQUUsQ0FBQztBQUNOLGNBQUksRUFBRSxDQUFDO0FBQ1AscUJBQVcsRUFBRSxDQUFDO1NBQ2Y7QUFDRCxjQUFNLEVBQUU7QUFDTixpQkFBTyxFQUFFLGlCQUFBLENBQUMsRUFBSTtBQUNaLGdCQUFNLFdBQVcsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0FBQzdCLHVCQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7V0FDekI7QUFDRCx1QkFBYSxFQUFFLHVCQUFBLENBQUMsRUFBSTtBQUNsQixnQkFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUM3QixvQkFBUSxDQUFDLENBQUMsSUFBSTtBQUNaLG1CQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTztBQUN6QixxQkFBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMscUJBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLHFCQUFLLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQzs7O0FBR2hDLG9CQUFJLE9BQUssTUFBTSxFQUFFO0FBQ2YseUJBQU87aUJBQ1I7OztBQUdELG9CQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0MsdUJBQUssY0FBYyxDQUFDLEtBQUssQ0FBQyxHQUFHLFdBQVcsQ0FBQyxZQUFNO0FBQzdDLHNCQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsY0FBYyxFQUFFLEdBQUcsQ0FBQyxFQUFFO0FBQy9DLDJCQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUNyQixpQ0FBYSxDQUFDLE9BQUssY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7bUJBQzNDO2lCQUNGLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDUixzQkFBTTtBQUFBLEFBQ1IsbUJBQUssRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLOztBQUV2QixvQkFBSSxPQUFLLE1BQU0sRUFBRTtBQUNmLDZCQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3RCLDZCQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEIseUJBQU87aUJBQ1I7OztBQUdELDJCQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDeEIsMkJBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUN0QixzQkFBTTtBQUFBLGFBQ1Q7V0FDRjtTQUNGO09BQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O1dBR3FCLGdDQUFDLE9BQU8sRUFBRTtBQUM5QixVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQzs7O0FBR2hELFVBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMxRCxhQUFPLFNBQVMsQ0FBQyxVQUFVLEVBQUU7QUFDM0IsaUJBQVMsQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDO09BQzdDO0FBQ0QsZUFBUyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7O0FBRXJELGFBQU8sSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUU7QUFDekMsZUFBTyxFQUFFLE9BQU87QUFDaEIsa0JBQVUsRUFBRTtBQUNWLGtCQUFRLEVBQUUsQ0FBQztBQUNYLG1CQUFTLEVBQUUsQ0FBQztBQUNaLFlBQUUsRUFBRSxDQUFDO0FBQ0wsd0JBQWMsRUFBRSxDQUFDO0FBQ2pCLHdCQUFjLEVBQUUsQ0FBQztBQUNqQixhQUFHLEVBQUUsQ0FBQztBQUNOLGNBQUksRUFBRSxDQUFDO0FBQ1AscUJBQVcsRUFBRSxDQUFDO1NBQ2Y7QUFDRCxjQUFNLEVBQUU7QUFDTix1QkFBYSxFQUFFLHVCQUFBLENBQUMsRUFBSTtBQUNsQixnQkFBTSxXQUFXLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUM3QixvQkFBUSxDQUFDLENBQUMsSUFBSTtBQUNaLG1CQUFLLEVBQUUsQ0FBQyxXQUFXLENBQUMsS0FBSzs7QUFFdkIsMkJBQVcsQ0FBQyxTQUFTLEVBQUUsQ0FBQztBQUN4QixzQkFBTTtBQUFBLGFBQ1Q7V0FDRjtTQUNGO09BQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O1dBR2lCLDhCQUFHO0FBQ25CLFVBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7QUFDOUIsVUFBSSxNQUFNLEdBQUcsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUEsQUFBQyxDQUFDO0FBQzlCLFVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNWLFVBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzs7O0FBR1YsVUFBSSxVQUFVLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLFVBQUksS0FBSyxJQUFJLElBQUksRUFBRTtBQUNqQixrQkFBVSxHQUFHLEdBQUcsQ0FBQztPQUNsQixNQUNJLElBQUksS0FBSyxJQUFJLEdBQUcsRUFBRTtBQUNyQixrQkFBVSxHQUFHLEdBQUcsQ0FBQztPQUNsQjs7O0FBR0QsVUFBSSxNQUFNLEdBQUcsVUFBVSxFQUFFO0FBQ3ZCLFNBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxVQUFVLENBQUEsR0FBSSxDQUFDLENBQUMsQ0FBQztPQUNoQzs7V0FFSTtBQUNILGdCQUFNLEdBQUcsVUFBVSxDQUFDO0FBQ3BCLGVBQUssR0FBRyxNQUFNLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQSxBQUFDLENBQUM7QUFDMUIsV0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUEsR0FBSSxDQUFDLENBQUMsQ0FBQztTQUN0Qzs7QUFFRCxXQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUEsS0FBSyxFQUFJO0FBQzlDLFlBQU0sU0FBUyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQztBQUMxRCxZQUFJLFNBQVMsRUFBRTtBQUNiLG1CQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0FBQ3JDLG1CQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQ3ZDLG1CQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsa0JBQWdCLENBQUMsWUFBTyxDQUFDLFFBQUssQ0FBQztTQUN6RDtPQUNGLENBQUMsQ0FBQztLQUNKOzs7OztXQUdRLG1CQUFDLENBQUMsRUFBRTtBQUNYLE9BQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQzs7QUFFbkIsVUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7OztBQUd0QyxVQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ3JDLG1CQUFhLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDOzs7QUFHMUMsVUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxDQUFDOztBQUVsQyxVQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNoRCxXQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUM5QixXQUFLLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztLQUNsRDs7Ozs7V0FHUyxvQkFBQyxDQUFDLEVBQUU7QUFDWixPQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7O0FBRW5CLFVBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDOzs7QUFHdEMsVUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7O0FBR3BDLFVBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7O0FBR2xDLFVBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7QUFDckIsYUFBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFDO0FBQ3hDLGFBQUssR0FBRyxLQUFLLENBQUMsVUFBVSxDQUFBO09BQ3pCO0FBQ0QsV0FBSyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbEM7OztTQWpZa0Isa0JBQWtCOzs7cUJBQWxCLGtCQUFrQjs7Ozs7Ozs7Ozs7Ozs7OztzQkNGdEIsU0FBUzs7OztJQUVMLE9BQU87ZUFBUCxPQUFPOztXQUNmLGdCQUFHO0FBQ1osVUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDeEUsVUFBSSxLQUFLLEVBQUU7QUFDVCxlQUFPLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO09BQzNCO0tBQ0Y7OztBQUVVLFdBUlEsT0FBTyxDQVFkLEtBQUssRUFBRTswQkFSQSxPQUFPOztBQVN4QixTQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLElBQUksRUFBSTtBQUNoQyxVQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07QUFDbkMsaUNBQUssTUFBTSxFQUFFLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7T0FDakMsQ0FBQyxDQUFDO0tBQ0osQ0FBQyxDQUFDO0dBQ0o7O1NBZGtCLE9BQU87OztxQkFBUCxPQUFPOzs7Ozs7Ozs7Ozs7Ozs7O3NCQ0ZULFFBQVE7Ozs7SUFFTixXQUFXO2VBQVgsV0FBVzs7OztXQUVuQixnQkFBRztBQUNaLFVBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUN4RSxVQUFJLElBQUksRUFBRTtBQUNSLGVBQU8sSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7T0FDOUI7S0FDRjs7Ozs7QUFHVSxXQVZRLFdBQVcsQ0FVbEIsSUFBSSxFQUFFOzBCQVZDLFdBQVc7O0FBVzVCLFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDOztBQUVuQixRQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7R0FDbkI7Ozs7ZUFma0IsV0FBVzs7V0FrQnBCLHNCQUFHOzs7QUFDWCxVQUFJLENBQUMsTUFBTSxHQUFHLHdCQUFXLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLG1CQUFtQixDQUFDLEVBQUU7QUFDckUsWUFBSSxFQUFFLEtBQUs7QUFDWCxvQkFBWSxFQUFFLENBQUM7QUFDZixzQkFBYyxFQUFFLElBQUk7QUFDcEIsWUFBSSxFQUFFLElBQUk7QUFDVixnQkFBUSxFQUFFO0FBQ1IsZUFBSyxFQUFFLElBQUk7QUFDWCw4QkFBb0IsRUFBRSxLQUFLO1NBQzVCO0FBQ0QsbUJBQVcsRUFBRTtBQUNYLFdBQUMsRUFBRTtBQUNELHlCQUFhLEVBQUUsQ0FBQztBQUNoQix3QkFBWSxFQUFFLEVBQUU7QUFDaEIsMEJBQWMsRUFBRSxJQUFJO1dBQ3JCO0FBQ0QsYUFBRyxFQUFFO0FBQ0gseUJBQWEsRUFBRSxHQUFHO0FBQ2xCLHdCQUFZLEVBQUUsRUFBRTtBQUNoQiwwQkFBYyxFQUFFLElBQUk7V0FDckI7QUFDRCxjQUFJLEVBQUU7QUFDSix5QkFBYSxFQUFFLENBQUM7QUFDaEIsMEJBQWMsRUFBRSxLQUFLO1dBQ3RCO1NBQ0Y7QUFDRCxVQUFFLEVBQUU7QUFDRixjQUFJLEVBQUUsZ0JBQU07QUFDVixzQkFBVSxDQUFDLFlBQU07QUFDZixvQkFBSyxZQUFZLEVBQUUsQ0FBQzthQUNyQixFQUFFLENBQUMsQ0FBQyxDQUFDO1dBQ1A7QUFDRCxnQkFBTSxFQUFFLGtCQUFNO0FBQ1osa0JBQUssWUFBWSxFQUFFLENBQUM7V0FDckI7U0FDRjtPQUNGLENBQUMsQ0FBQztBQUNILFVBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDcEI7Ozs7O1dBR1csd0JBQUc7QUFDYixVQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtBQUNyQyxZQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztPQUM5QixNQUNJO0FBQ0gsWUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7T0FDN0I7S0FDRjs7O1NBbEVrQixXQUFXOzs7cUJBQVgsV0FBVzs7Ozs7QUNGaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O3NCQ3JEYyxRQUFROzs7O0lBRUQsU0FBUztBQUVsQixVQUZTLFNBQVMsQ0FFakIsR0FBRyxFQUFFO3dCQUZHLFNBQVM7O0FBRzVCLE1BQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0FBQ2YsTUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBSSxDQUFDLE9BQU8sR0FBRyx5QkFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7QUFDcEQsTUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO0VBQ1Y7O2NBUG1CLFNBQVM7O1NBUzNCLGNBQUc7QUFDSixPQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztHQUM3Qzs7O1NBRUssZ0JBQUMsS0FBSyxFQUFFO0FBQ2IsUUFBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ3ZCLE9BQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0FBQ3pCLE9BQUksSUFBSSxDQUFDLEtBQUssRUFBRTtBQUNmLFFBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNaLE1BQU07QUFDTixRQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDYjtHQUNEOzs7U0FFRyxnQkFBRztBQUNOLE9BQUksTUFBTSxDQUFDO0FBQ1gsT0FBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDN0IsT0FBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsT0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDeEIsU0FBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDL0IsT0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDdkIsT0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7R0FDNUI7OztTQUVJLGlCQUFHO0FBQ1AsT0FBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQzNDLE9BQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3ZCLE9BQUksQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hDLE9BQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0dBQ3BDOzs7U0FHVSxnQkFBRztBQUNiLDRCQUFFLHlCQUF5QixDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVc7QUFDNUMsV0FBTyxJQUFJLFNBQVMsQ0FBQyx5QkFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUMsQ0FBQztHQUNIOzs7UUE3Q21CLFNBQVM7OztxQkFBVCxTQUFTOzs7Ozs7O0FDRjlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDbkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsLCBmYWN0b3J5KSB7XG4gIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyA/IG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpIDpcbiAgdHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kID8gZGVmaW5lKGZhY3RvcnkpIDpcbiAgKGdsb2JhbC5KdW1wID0gZmFjdG9yeSgpKTtcbn0odGhpcywgKGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4vLyBSb2JlcnQgUGVubmVyJ3MgZWFzZUluT3V0UXVhZFxuXG4vLyBmaW5kIHRoZSByZXN0IG9mIGhpcyBlYXNpbmcgZnVuY3Rpb25zIGhlcmU6IGh0dHA6Ly9yb2JlcnRwZW5uZXIuY29tL2Vhc2luZy9cbi8vIGZpbmQgdGhlbSBleHBvcnRlZCBmb3IgRVM2IGNvbnN1bXB0aW9uIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qYXhnZWxsZXIvZXouanNcblxudmFyIGVhc2VJbk91dFF1YWQgPSBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgdCAvPSBkIC8gMjtcbiAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gIHQtLTtcbiAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYjtcbn07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIganVtcGVyID0gZnVuY3Rpb24ganVtcGVyKCkge1xuICAvLyBwcml2YXRlIHZhcmlhYmxlIGNhY2hlXG4gIC8vIG5vIHZhcmlhYmxlcyBhcmUgY3JlYXRlZCBkdXJpbmcgYSBqdW1wLCBwcmV2ZW50aW5nIG1lbW9yeSBsZWFrc1xuXG4gIHZhciBlbGVtZW50ID0gdm9pZCAwOyAvLyBlbGVtZW50IHRvIHNjcm9sbCB0byAgICAgICAgICAgICAgICAgICAobm9kZSlcblxuICB2YXIgc3RhcnQgPSB2b2lkIDA7IC8vIHdoZXJlIHNjcm9sbCBzdGFydHMgICAgICAgICAgICAgICAgICAgIChweClcbiAgdmFyIHN0b3AgPSB2b2lkIDA7IC8vIHdoZXJlIHNjcm9sbCBzdG9wcyAgICAgICAgICAgICAgICAgICAgIChweClcblxuICB2YXIgb2Zmc2V0ID0gdm9pZCAwOyAvLyBhZGp1c3RtZW50IGZyb20gdGhlIHN0b3AgcG9zaXRpb24gICAgICAocHgpXG4gIHZhciBlYXNpbmcgPSB2b2lkIDA7IC8vIGVhc2luZyBmdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbilcbiAgdmFyIGExMXkgPSB2b2lkIDA7IC8vIGFjY2Vzc2liaWxpdHkgc3VwcG9ydCBmbGFnICAgICAgICAgICAgIChib29sZWFuKVxuXG4gIHZhciBkaXN0YW5jZSA9IHZvaWQgMDsgLy8gZGlzdGFuY2Ugb2Ygc2Nyb2xsICAgICAgICAgICAgICAgICAgICAgKHB4KVxuICB2YXIgZHVyYXRpb24gPSB2b2lkIDA7IC8vIHNjcm9sbCBkdXJhdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChtcylcblxuICB2YXIgdGltZVN0YXJ0ID0gdm9pZCAwOyAvLyB0aW1lIHNjcm9sbCBzdGFydGVkICAgICAgICAgICAgICAgICAgICAobXMpXG4gIHZhciB0aW1lRWxhcHNlZCA9IHZvaWQgMDsgLy8gdGltZSBzcGVudCBzY3JvbGxpbmcgdGh1cyBmYXIgICAgICAgICAgKG1zKVxuXG4gIHZhciBuZXh0ID0gdm9pZCAwOyAvLyBuZXh0IHNjcm9sbCBwb3NpdGlvbiAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgdmFyIGNhbGxiYWNrID0gdm9pZCAwOyAvLyB0byBjYWxsIHdoZW4gZG9uZSBzY3JvbGxpbmcgICAgICAgICAgICAoZnVuY3Rpb24pXG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvY2F0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIH1cblxuICAvLyBlbGVtZW50IG9mZnNldCBoZWxwZXJcblxuICBmdW5jdGlvbiB0b3AoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHN0YXJ0O1xuICB9XG5cbiAgLy8gckFGIGxvb3AgaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9vcCh0aW1lQ3VycmVudCkge1xuICAgIC8vIHN0b3JlIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQsIGlmIG5vdCBzdGFydGVkIGFscmVhZHlcbiAgICBpZiAoIXRpbWVTdGFydCkge1xuICAgICAgdGltZVN0YXJ0ID0gdGltZUN1cnJlbnQ7XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHRpbWUgc3BlbnQgc2Nyb2xsaW5nIHNvIGZhclxuICAgIHRpbWVFbGFwc2VkID0gdGltZUN1cnJlbnQgLSB0aW1lU3RhcnQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgbmV4dCBzY3JvbGwgcG9zaXRpb25cbiAgICBuZXh0ID0gZWFzaW5nKHRpbWVFbGFwc2VkLCBzdGFydCwgZGlzdGFuY2UsIGR1cmF0aW9uKTtcblxuICAgIC8vIHNjcm9sbCB0byBpdFxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXh0KTtcblxuICAgIC8vIGNoZWNrIHByb2dyZXNzXG4gICAgdGltZUVsYXBzZWQgPCBkdXJhdGlvbiA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCkgLy8gY29udGludWUgc2Nyb2xsIGxvb3BcbiAgICA6IGRvbmUoKTsgLy8gc2Nyb2xsaW5nIGlzIGRvbmVcbiAgfVxuXG4gIC8vIHNjcm9sbCBmaW5pc2hlZCBoZWxwZXJcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIC8vIGFjY291bnQgZm9yIHJBRiB0aW1lIHJvdW5kaW5nIGluYWNjdXJhY2llc1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdGFydCArIGRpc3RhbmNlKTtcblxuICAgIC8vIGlmIHNjcm9sbGluZyB0byBhbiBlbGVtZW50LCBhbmQgYWNjZXNzaWJpbGl0eSBpcyBlbmFibGVkXG4gICAgaWYgKGVsZW1lbnQgJiYgYTExeSkge1xuICAgICAgLy8gYWRkIHRhYmluZGV4IGluZGljYXRpbmcgcHJvZ3JhbW1hdGljIGZvY3VzXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcblxuICAgICAgLy8gZm9jdXMgdGhlIGVsZW1lbnRcbiAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpdCBleGlzdHMsIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvLyByZXNldCB0aW1lIGZvciBuZXh0IGp1bXBcbiAgICB0aW1lU3RhcnQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIGZ1bmN0aW9uIGp1bXAodGFyZ2V0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgLy8gcmVzb2x2ZSBvcHRpb25zLCBvciB1c2UgZGVmYXVsdHNcbiAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMDtcbiAgICBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCB8fCAwO1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjazsgLy8gXCJ1bmRlZmluZWRcIiBpcyBhIHN1aXRhYmxlIGRlZmF1bHQsIGFuZCB3b24ndCBiZSBjYWxsZWRcbiAgICBlYXNpbmcgPSBvcHRpb25zLmVhc2luZyB8fCBlYXNlSW5PdXRRdWFkO1xuICAgIGExMXkgPSBvcHRpb25zLmExMXkgfHwgZmFsc2U7XG5cbiAgICAvLyBjYWNoZSBzdGFydGluZyBwb3NpdGlvblxuICAgIHN0YXJ0ID0gbG9jYXRpb24oKTtcblxuICAgIC8vIHJlc29sdmUgdGFyZ2V0XG4gICAgc3dpdGNoICh0eXBlb2YgdGFyZ2V0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0YXJnZXQpKSB7XG4gICAgICAvLyBzY3JvbGwgZnJvbSBjdXJyZW50IHBvc2l0aW9uXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBlbGVtZW50ID0gdW5kZWZpbmVkOyAvLyBubyBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgICAgICBhMTF5ID0gZmFsc2U7IC8vIG1ha2Ugc3VyZSBhY2Nlc3NpYmlsaXR5IGlzIG9mZlxuICAgICAgICBzdG9wID0gc3RhcnQgKyB0YXJnZXQ7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAobm9kZSlcbiAgICAgIC8vIGJvdW5kaW5nIHJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBlbGVtZW50ID0gdGFyZ2V0O1xuICAgICAgICBzdG9wID0gdG9wKGVsZW1lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQgKHNlbGVjdG9yKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgc2Nyb2xsIGRpc3RhbmNlLCBhY2NvdW50aW5nIGZvciBvZmZzZXRcbiAgICBkaXN0YW5jZSA9IHN0b3AgLSBzdGFydCArIG9mZnNldDtcblxuICAgIC8vIHJlc29sdmUgZHVyYXRpb25cbiAgICBzd2l0Y2ggKF90eXBlb2Yob3B0aW9ucy5kdXJhdGlvbikpIHtcbiAgICAgIC8vIG51bWJlciBpbiBtc1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gZnVuY3Rpb24gcGFzc2VkIHRoZSBkaXN0YW5jZSBvZiB0aGUgc2Nyb2xsXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbihkaXN0YW5jZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IHRoZSBsb29wXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgfVxuXG4gIC8vIGV4cG9zZSBvbmx5IHRoZSBqdW1wIG1ldGhvZFxuICByZXR1cm4ganVtcDtcbn07XG5cbi8vIGV4cG9ydCBzaW5nbGV0b25cblxudmFyIHNpbmdsZXRvbiA9IGp1bXBlcigpO1xuXG5yZXR1cm4gc2luZ2xldG9uO1xuXG59KSkpO1xuIiwiLyoqXG4gKiBTd2lwZXIgNS4wLjNcbiAqIE1vc3QgbW9kZXJuIG1vYmlsZSB0b3VjaCBzbGlkZXIgYW5kIGZyYW1ld29yayB3aXRoIGhhcmR3YXJlIGFjY2VsZXJhdGVkIHRyYW5zaXRpb25zXG4gKiBodHRwOi8vc3dpcGVyanMuY29tXG4gKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxOSBWbGFkaW1pciBLaGFybGFtcGlkaVxuICpcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZVxuICpcbiAqIFJlbGVhc2VkIG9uOiBTZXB0ZW1iZXIgMTksIDIwMTlcbiAqL1xuXG4oZnVuY3Rpb24gKGdsb2JhbCwgZmFjdG9yeSkge1xuICB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgPyBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKSA6XG4gIHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCA/IGRlZmluZShmYWN0b3J5KSA6XG4gIChnbG9iYWwgPSBnbG9iYWwgfHwgc2VsZiwgZ2xvYmFsLlN3aXBlciA9IGZhY3RvcnkoKSk7XG59KHRoaXMsIGZ1bmN0aW9uICgpIHsgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgKiBTU1IgV2luZG93IDEuMC4xXG4gICAqIEJldHRlciBoYW5kbGluZyBmb3Igd2luZG93IG9iamVjdCBpbiBTU1IgZW52aXJvbm1lbnRcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL25vbGltaXRzNHdlYi9zc3Itd2luZG93XG4gICAqXG4gICAqIENvcHlyaWdodCAyMDE4LCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICAgKlxuICAgKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAgICpcbiAgICogUmVsZWFzZWQgb246IEp1bHkgMTgsIDIwMThcbiAgICovXG4gIHZhciBkb2MgPSAodHlwZW9mIGRvY3VtZW50ID09PSAndW5kZWZpbmVkJykgPyB7XG4gICAgYm9keToge30sXG4gICAgYWRkRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gYWRkRXZlbnRMaXN0ZW5lcigpIHt9LFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgICBhY3RpdmVFbGVtZW50OiB7XG4gICAgICBibHVyOiBmdW5jdGlvbiBibHVyKCkge30sXG4gICAgICBub2RlTmFtZTogJycsXG4gICAgfSxcbiAgICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbiBxdWVyeVNlbGVjdG9yQWxsKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgZ2V0RWxlbWVudEJ5SWQ6IGZ1bmN0aW9uIGdldEVsZW1lbnRCeUlkKCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcbiAgICBjcmVhdGVFdmVudDogZnVuY3Rpb24gY3JlYXRlRXZlbnQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBpbml0RXZlbnQ6IGZ1bmN0aW9uIGluaXRFdmVudCgpIHt9LFxuICAgICAgfTtcbiAgICB9LFxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjaGlsZHJlbjogW10sXG4gICAgICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgICAgICBzdHlsZToge30sXG4gICAgICAgIHNldEF0dHJpYnV0ZTogZnVuY3Rpb24gc2V0QXR0cmlidXRlKCkge30sXG4gICAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lOiBmdW5jdGlvbiBnZXRFbGVtZW50c0J5VGFnTmFtZSgpIHtcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH0sXG4gICAgbG9jYXRpb246IHsgaGFzaDogJycgfSxcbiAgfSA6IGRvY3VtZW50OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgdmFyIHdpbiA9ICh0eXBlb2Ygd2luZG93ID09PSAndW5kZWZpbmVkJykgPyB7XG4gICAgZG9jdW1lbnQ6IGRvYyxcbiAgICBuYXZpZ2F0b3I6IHtcbiAgICAgIHVzZXJBZ2VudDogJycsXG4gICAgfSxcbiAgICBsb2NhdGlvbjoge30sXG4gICAgaGlzdG9yeToge30sXG4gICAgQ3VzdG9tRXZlbnQ6IGZ1bmN0aW9uIEN1c3RvbUV2ZW50KCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICBhZGRFdmVudExpc3RlbmVyOiBmdW5jdGlvbiBhZGRFdmVudExpc3RlbmVyKCkge30sXG4gICAgcmVtb3ZlRXZlbnRMaXN0ZW5lcjogZnVuY3Rpb24gcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9LFxuICAgIGdldENvbXB1dGVkU3R5bGU6IGZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBnZXRQcm9wZXJ0eVZhbHVlOiBmdW5jdGlvbiBnZXRQcm9wZXJ0eVZhbHVlKCkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBJbWFnZTogZnVuY3Rpb24gSW1hZ2UoKSB7fSxcbiAgICBEYXRlOiBmdW5jdGlvbiBEYXRlKCkge30sXG4gICAgc2NyZWVuOiB7fSxcbiAgICBzZXRUaW1lb3V0OiBmdW5jdGlvbiBzZXRUaW1lb3V0KCkge30sXG4gICAgY2xlYXJUaW1lb3V0OiBmdW5jdGlvbiBjbGVhclRpbWVvdXQoKSB7fSxcbiAgfSA6IHdpbmRvdzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gIC8qKlxuICAgKiBEb203IDIuMS4zXG4gICAqIE1pbmltYWxpc3RpYyBKYXZhU2NyaXB0IGxpYnJhcnkgZm9yIERPTSBtYW5pcHVsYXRpb24sIHdpdGggYSBqUXVlcnktY29tcGF0aWJsZSBBUElcbiAgICogaHR0cDovL2ZyYW1ld29yazcuaW8vZG9jcy9kb20uaHRtbFxuICAgKlxuICAgKiBDb3B5cmlnaHQgMjAxOSwgVmxhZGltaXIgS2hhcmxhbXBpZGlcbiAgICogVGhlIGlEYW5nZXJvLnVzXG4gICAqIGh0dHA6Ly93d3cuaWRhbmdlcm8udXMvXG4gICAqXG4gICAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICAgKlxuICAgKiBSZWxlYXNlZCBvbjogRmVicnVhcnkgMTEsIDIwMTlcbiAgICovXG5cbiAgdmFyIERvbTcgPSBmdW5jdGlvbiBEb203KGFycikge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAvLyBDcmVhdGUgYXJyYXktbGlrZSBvYmplY3RcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgc2VsZltpXSA9IGFycltpXTtcbiAgICB9XG4gICAgc2VsZi5sZW5ndGggPSBhcnIubGVuZ3RoO1xuICAgIC8vIFJldHVybiBjb2xsZWN0aW9uIHdpdGggbWV0aG9kc1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIGZ1bmN0aW9uICQoc2VsZWN0b3IsIGNvbnRleHQpIHtcbiAgICB2YXIgYXJyID0gW107XG4gICAgdmFyIGkgPSAwO1xuICAgIGlmIChzZWxlY3RvciAmJiAhY29udGV4dCkge1xuICAgICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICAvLyBTdHJpbmdcbiAgICAgIGlmICh0eXBlb2Ygc2VsZWN0b3IgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBlbHM7XG4gICAgICAgIHZhciB0ZW1wUGFyZW50O1xuICAgICAgICB2YXIgaHRtbCA9IHNlbGVjdG9yLnRyaW0oKTtcbiAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPCcpID49IDAgJiYgaHRtbC5pbmRleE9mKCc+JykgPj0gMCkge1xuICAgICAgICAgIHZhciB0b0NyZWF0ZSA9ICdkaXYnO1xuICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzxsaScpID09PSAwKSB7IHRvQ3JlYXRlID0gJ3VsJzsgfVxuICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0cicpID09PSAwKSB7IHRvQ3JlYXRlID0gJ3Rib2R5JzsgfVxuICAgICAgICAgIGlmIChodG1sLmluZGV4T2YoJzx0ZCcpID09PSAwIHx8IGh0bWwuaW5kZXhPZignPHRoJykgPT09IDApIHsgdG9DcmVhdGUgPSAndHInOyB9XG4gICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPHRib2R5JykgPT09IDApIHsgdG9DcmVhdGUgPSAndGFibGUnOyB9XG4gICAgICAgICAgaWYgKGh0bWwuaW5kZXhPZignPG9wdGlvbicpID09PSAwKSB7IHRvQ3JlYXRlID0gJ3NlbGVjdCc7IH1cbiAgICAgICAgICB0ZW1wUGFyZW50ID0gZG9jLmNyZWF0ZUVsZW1lbnQodG9DcmVhdGUpO1xuICAgICAgICAgIHRlbXBQYXJlbnQuaW5uZXJIVE1MID0gaHRtbDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdGVtcFBhcmVudC5jaGlsZE5vZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBhcnIucHVzaCh0ZW1wUGFyZW50LmNoaWxkTm9kZXNbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoIWNvbnRleHQgJiYgc2VsZWN0b3JbMF0gPT09ICcjJyAmJiAhc2VsZWN0b3IubWF0Y2goL1sgLjw+On5dLykpIHtcbiAgICAgICAgICAgIC8vIFB1cmUgSUQgc2VsZWN0b3JcbiAgICAgICAgICAgIGVscyA9IFtkb2MuZ2V0RWxlbWVudEJ5SWQoc2VsZWN0b3IudHJpbSgpLnNwbGl0KCcjJylbMV0pXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gT3RoZXIgc2VsZWN0b3JzXG4gICAgICAgICAgICBlbHMgPSAoY29udGV4dCB8fCBkb2MpLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IudHJpbSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yIChpID0gMDsgaSA8IGVscy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGVsc1tpXSkgeyBhcnIucHVzaChlbHNbaV0pOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHNlbGVjdG9yLm5vZGVUeXBlIHx8IHNlbGVjdG9yID09PSB3aW4gfHwgc2VsZWN0b3IgPT09IGRvYykge1xuICAgICAgICAvLyBOb2RlL2VsZW1lbnRcbiAgICAgICAgYXJyLnB1c2goc2VsZWN0b3IpO1xuICAgICAgfSBlbHNlIGlmIChzZWxlY3Rvci5sZW5ndGggPiAwICYmIHNlbGVjdG9yWzBdLm5vZGVUeXBlKSB7XG4gICAgICAgIC8vIEFycmF5IG9mIGVsZW1lbnRzIG9yIGluc3RhbmNlIG9mIERvbVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgc2VsZWN0b3IubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBhcnIucHVzaChzZWxlY3RvcltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEb203KGFycik7XG4gIH1cblxuICAkLmZuID0gRG9tNy5wcm90b3R5cGU7XG4gICQuQ2xhc3MgPSBEb203O1xuICAkLkRvbTcgPSBEb203O1xuXG4gIGZ1bmN0aW9uIHVuaXF1ZShhcnIpIHtcbiAgICB2YXIgdW5pcXVlQXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHVuaXF1ZUFycmF5LmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHsgdW5pcXVlQXJyYXkucHVzaChhcnJbaV0pOyB9XG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVBcnJheTtcbiAgfVxuXG4gIC8vIENsYXNzZXMgYW5kIGF0dHJpYnV0ZXNcbiAgZnVuY3Rpb24gYWRkQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjbGFzc05hbWUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNbal0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0aGlzW2pdLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgdGhpc1tqXS5jbGFzc0xpc3QuYWRkKGNsYXNzZXNbaV0pOyB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGNsYXNzTmFtZSkge1xuICAgIHZhciBjbGFzc2VzID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGFzc2VzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzW2pdICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgdGhpc1tqXS5jbGFzc0xpc3QgIT09ICd1bmRlZmluZWQnKSB7IHRoaXNbal0uY2xhc3NMaXN0LnJlbW92ZShjbGFzc2VzW2ldKTsgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBoYXNDbGFzcyhjbGFzc05hbWUpIHtcbiAgICBpZiAoIXRoaXNbMF0pIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgcmV0dXJuIHRoaXNbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoY2xhc3NOYW1lKSB7XG4gICAgdmFyIGNsYXNzZXMgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsYXNzZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHRoaXNbal0gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB0aGlzW2pdLmNsYXNzTGlzdCAhPT0gJ3VuZGVmaW5lZCcpIHsgdGhpc1tqXS5jbGFzc0xpc3QudG9nZ2xlKGNsYXNzZXNbaV0pOyB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIGF0dHIoYXR0cnMsIHZhbHVlKSB7XG4gICAgdmFyIGFyZ3VtZW50cyQxID0gYXJndW1lbnRzO1xuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEgJiYgdHlwZW9mIGF0dHJzID09PSAnc3RyaW5nJykge1xuICAgICAgLy8gR2V0IGF0dHJcbiAgICAgIGlmICh0aGlzWzBdKSB7IHJldHVybiB0aGlzWzBdLmdldEF0dHJpYnV0ZShhdHRycyk7IH1cbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgLy8gU2V0IGF0dHJzXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoYXJndW1lbnRzJDEubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIC8vIFN0cmluZ1xuICAgICAgICB0aGlzW2ldLnNldEF0dHJpYnV0ZShhdHRycywgdmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBhdHRycykge1xuICAgICAgICAgIHRoaXNbaV1bYXR0ck5hbWVdID0gYXR0cnNbYXR0ck5hbWVdO1xuICAgICAgICAgIHRoaXNbaV0uc2V0QXR0cmlidXRlKGF0dHJOYW1lLCBhdHRyc1thdHRyTmFtZV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBmdW5jdGlvbiByZW1vdmVBdHRyKGF0dHIpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHRoaXNbaV0ucmVtb3ZlQXR0cmlidXRlKGF0dHIpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBkYXRhKGtleSwgdmFsdWUpIHtcbiAgICB2YXIgZWw7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGVsID0gdGhpc1swXTtcbiAgICAgIC8vIEdldCB2YWx1ZVxuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGlmIChlbC5kb203RWxlbWVudERhdGFTdG9yYWdlICYmIChrZXkgaW4gZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZSkpIHtcbiAgICAgICAgICByZXR1cm4gZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRhdGFLZXkgPSBlbC5nZXRBdHRyaWJ1dGUoKFwiZGF0YS1cIiArIGtleSkpO1xuICAgICAgICBpZiAoZGF0YUtleSkge1xuICAgICAgICAgIHJldHVybiBkYXRhS2V5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8vIFNldCB2YWx1ZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgZWwgPSB0aGlzW2ldO1xuICAgICAgaWYgKCFlbC5kb203RWxlbWVudERhdGFTdG9yYWdlKSB7IGVsLmRvbTdFbGVtZW50RGF0YVN0b3JhZ2UgPSB7fTsgfVxuICAgICAgZWwuZG9tN0VsZW1lbnREYXRhU3RvcmFnZVtrZXldID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIC8vIFRyYW5zZm9ybXNcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybSh0cmFuc2Zvcm0pIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNmb3JtID0gdHJhbnNmb3JtO1xuICAgICAgZWxTdHlsZS50cmFuc2Zvcm0gPSB0cmFuc2Zvcm07XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICBpZiAodHlwZW9mIGR1cmF0aW9uICE9PSAnc3RyaW5nJykge1xuICAgICAgZHVyYXRpb24gPSBkdXJhdGlvbiArIFwibXNcIjsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbFN0eWxlID0gdGhpc1tpXS5zdHlsZTtcbiAgICAgIGVsU3R5bGUud2Via2l0VHJhbnNpdGlvbkR1cmF0aW9uID0gZHVyYXRpb247XG4gICAgICBlbFN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGR1cmF0aW9uO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyBFdmVudHNcbiAgZnVuY3Rpb24gb24oKSB7XG4gICAgdmFyIGFzc2lnbjtcblxuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcbiAgICB2YXIgZXZlbnRUeXBlID0gYXJnc1swXTtcbiAgICB2YXIgdGFyZ2V0U2VsZWN0b3IgPSBhcmdzWzFdO1xuICAgIHZhciBsaXN0ZW5lciA9IGFyZ3NbMl07XG4gICAgdmFyIGNhcHR1cmUgPSBhcmdzWzNdO1xuICAgIGlmICh0eXBlb2YgYXJnc1sxXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgKGFzc2lnbiA9IGFyZ3MsIGV2ZW50VHlwZSA9IGFzc2lnblswXSwgbGlzdGVuZXIgPSBhc3NpZ25bMV0sIGNhcHR1cmUgPSBhc3NpZ25bMl0pO1xuICAgICAgdGFyZ2V0U2VsZWN0b3IgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmICghY2FwdHVyZSkgeyBjYXB0dXJlID0gZmFsc2U7IH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZUxpdmVFdmVudChlKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICBpZiAoIXRhcmdldCkgeyByZXR1cm47IH1cbiAgICAgIHZhciBldmVudERhdGEgPSBlLnRhcmdldC5kb203RXZlbnREYXRhIHx8IFtdO1xuICAgICAgaWYgKGV2ZW50RGF0YS5pbmRleE9mKGUpIDwgMCkge1xuICAgICAgICBldmVudERhdGEudW5zaGlmdChlKTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRhcmdldCkuaXModGFyZ2V0U2VsZWN0b3IpKSB7IGxpc3RlbmVyLmFwcGx5KHRhcmdldCwgZXZlbnREYXRhKTsgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBwYXJlbnRzID0gJCh0YXJnZXQpLnBhcmVudHMoKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgICBmb3IgKHZhciBrID0gMDsgayA8IHBhcmVudHMubGVuZ3RoOyBrICs9IDEpIHtcbiAgICAgICAgICBpZiAoJChwYXJlbnRzW2tdKS5pcyh0YXJnZXRTZWxlY3RvcikpIHsgbGlzdGVuZXIuYXBwbHkocGFyZW50c1trXSwgZXZlbnREYXRhKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUV2ZW50KGUpIHtcbiAgICAgIHZhciBldmVudERhdGEgPSBlICYmIGUudGFyZ2V0ID8gZS50YXJnZXQuZG9tN0V2ZW50RGF0YSB8fCBbXSA6IFtdO1xuICAgICAgaWYgKGV2ZW50RGF0YS5pbmRleE9mKGUpIDwgMCkge1xuICAgICAgICBldmVudERhdGEudW5zaGlmdChlKTtcbiAgICAgIH1cbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGV2ZW50RGF0YSk7XG4gICAgfVxuICAgIHZhciBldmVudHMgPSBldmVudFR5cGUuc3BsaXQoJyAnKTtcbiAgICB2YXIgajtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBlbCA9IHRoaXNbaV07XG4gICAgICBpZiAoIXRhcmdldFNlbGVjdG9yKSB7XG4gICAgICAgIGZvciAoaiA9IDA7IGogPCBldmVudHMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICB2YXIgZXZlbnQgPSBldmVudHNbal07XG4gICAgICAgICAgaWYgKCFlbC5kb203TGlzdGVuZXJzKSB7IGVsLmRvbTdMaXN0ZW5lcnMgPSB7fTsgfVxuICAgICAgICAgIGlmICghZWwuZG9tN0xpc3RlbmVyc1tldmVudF0pIHsgZWwuZG9tN0xpc3RlbmVyc1tldmVudF0gPSBbXTsgfVxuICAgICAgICAgIGVsLmRvbTdMaXN0ZW5lcnNbZXZlbnRdLnB1c2goe1xuICAgICAgICAgICAgbGlzdGVuZXI6IGxpc3RlbmVyLFxuICAgICAgICAgICAgcHJveHlMaXN0ZW5lcjogaGFuZGxlRXZlbnQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMaXZlIGV2ZW50c1xuICAgICAgICBmb3IgKGogPSAwOyBqIDwgZXZlbnRzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgdmFyIGV2ZW50JDEgPSBldmVudHNbal07XG4gICAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVycykgeyBlbC5kb203TGl2ZUxpc3RlbmVycyA9IHt9OyB9XG4gICAgICAgICAgaWYgKCFlbC5kb203TGl2ZUxpc3RlbmVyc1tldmVudCQxXSkgeyBlbC5kb203TGl2ZUxpc3RlbmVyc1tldmVudCQxXSA9IFtdOyB9XG4gICAgICAgICAgZWwuZG9tN0xpdmVMaXN0ZW5lcnNbZXZlbnQkMV0ucHVzaCh7XG4gICAgICAgICAgICBsaXN0ZW5lcjogbGlzdGVuZXIsXG4gICAgICAgICAgICBwcm94eUxpc3RlbmVyOiBoYW5kbGVMaXZlRXZlbnQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihldmVudCQxLCBoYW5kbGVMaXZlRXZlbnQsIGNhcHR1cmUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIG9mZigpIHtcbiAgICB2YXIgYXNzaWduO1xuXG4gICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB3aGlsZSAoIGxlbi0tICkgYXJnc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiBdO1xuICAgIHZhciBldmVudFR5cGUgPSBhcmdzWzBdO1xuICAgIHZhciB0YXJnZXRTZWxlY3RvciA9IGFyZ3NbMV07XG4gICAgdmFyIGxpc3RlbmVyID0gYXJnc1syXTtcbiAgICB2YXIgY2FwdHVyZSA9IGFyZ3NbM107XG4gICAgaWYgKHR5cGVvZiBhcmdzWzFdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAoYXNzaWduID0gYXJncywgZXZlbnRUeXBlID0gYXNzaWduWzBdLCBsaXN0ZW5lciA9IGFzc2lnblsxXSwgY2FwdHVyZSA9IGFzc2lnblsyXSk7XG4gICAgICB0YXJnZXRTZWxlY3RvciA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKCFjYXB0dXJlKSB7IGNhcHR1cmUgPSBmYWxzZTsgfVxuXG4gICAgdmFyIGV2ZW50cyA9IGV2ZW50VHlwZS5zcGxpdCgnICcpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgZXZlbnQgPSBldmVudHNbaV07XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpc1tqXTtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gKHZvaWQgMCk7XG4gICAgICAgIGlmICghdGFyZ2V0U2VsZWN0b3IgJiYgZWwuZG9tN0xpc3RlbmVycykge1xuICAgICAgICAgIGhhbmRsZXJzID0gZWwuZG9tN0xpc3RlbmVyc1tldmVudF07XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0U2VsZWN0b3IgJiYgZWwuZG9tN0xpdmVMaXN0ZW5lcnMpIHtcbiAgICAgICAgICBoYW5kbGVycyA9IGVsLmRvbTdMaXZlTGlzdGVuZXJzW2V2ZW50XTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFuZGxlcnMgJiYgaGFuZGxlcnMubGVuZ3RoKSB7XG4gICAgICAgICAgZm9yICh2YXIgayA9IGhhbmRsZXJzLmxlbmd0aCAtIDE7IGsgPj0gMDsgayAtPSAxKSB7XG4gICAgICAgICAgICB2YXIgaGFuZGxlciA9IGhhbmRsZXJzW2tdO1xuICAgICAgICAgICAgaWYgKGxpc3RlbmVyICYmIGhhbmRsZXIubGlzdGVuZXIgPT09IGxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoZXZlbnQsIGhhbmRsZXIucHJveHlMaXN0ZW5lciwgY2FwdHVyZSk7XG4gICAgICAgICAgICAgIGhhbmRsZXJzLnNwbGljZShrLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGlzdGVuZXIgJiYgaGFuZGxlci5saXN0ZW5lciAmJiBoYW5kbGVyLmxpc3RlbmVyLmRvbTdwcm94eSAmJiBoYW5kbGVyLmxpc3RlbmVyLmRvbTdwcm94eSA9PT0gbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlci5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghbGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcihldmVudCwgaGFuZGxlci5wcm94eUxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICAgICAgICAgICAgaGFuZGxlcnMuc3BsaWNlKGssIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiB0cmlnZ2VyKCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIHZhciBldmVudHMgPSBhcmdzWzBdLnNwbGl0KCcgJyk7XG4gICAgdmFyIGV2ZW50RGF0YSA9IGFyZ3NbMV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBldmVudCA9IGV2ZW50c1tpXTtcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICB2YXIgZWwgPSB0aGlzW2pdO1xuICAgICAgICB2YXIgZXZ0ID0gKHZvaWQgMCk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXZ0ID0gbmV3IHdpbi5DdXN0b21FdmVudChldmVudCwge1xuICAgICAgICAgICAgZGV0YWlsOiBldmVudERhdGEsXG4gICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIGV2dCA9IGRvYy5jcmVhdGVFdmVudCgnRXZlbnQnKTtcbiAgICAgICAgICBldnQuaW5pdEV2ZW50KGV2ZW50LCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBldnQuZGV0YWlsID0gZXZlbnREYXRhO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBlbC5kb203RXZlbnREYXRhID0gYXJncy5maWx0ZXIoZnVuY3Rpb24gKGRhdGEsIGRhdGFJbmRleCkgeyByZXR1cm4gZGF0YUluZGV4ID4gMDsgfSk7XG4gICAgICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgICAgZWwuZG9tN0V2ZW50RGF0YSA9IFtdO1xuICAgICAgICBkZWxldGUgZWwuZG9tN0V2ZW50RGF0YTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChjYWxsYmFjaykge1xuICAgIHZhciBldmVudHMgPSBbJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCAndHJhbnNpdGlvbmVuZCddO1xuICAgIHZhciBkb20gPSB0aGlzO1xuICAgIHZhciBpO1xuICAgIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgICAvKiBqc2hpbnQgdmFsaWR0aGlzOnRydWUgKi9cbiAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgeyByZXR1cm47IH1cbiAgICAgIGNhbGxiYWNrLmNhbGwodGhpcywgZSk7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgZXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGRvbS5vZmYoZXZlbnRzW2ldLCBmaXJlQ2FsbEJhY2spO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBldmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgZG9tLm9uKGV2ZW50c1tpXSwgZmlyZUNhbGxCYWNrKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gb3V0ZXJXaWR0aChpbmNsdWRlTWFyZ2lucykge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChpbmNsdWRlTWFyZ2lucykge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgdmFyIHN0eWxlcyA9IHRoaXMuc3R5bGVzKCk7XG4gICAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldFdpZHRoICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXJpZ2h0JykpICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRXaWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZnVuY3Rpb24gb3V0ZXJIZWlnaHQoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIHZhciBzdHlsZXMgPSB0aGlzLnN0eWxlcygpO1xuICAgICAgICByZXR1cm4gdGhpc1swXS5vZmZzZXRIZWlnaHQgKyBwYXJzZUZsb2F0KHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tdG9wJykpICsgcGFyc2VGbG9hdChzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWJvdHRvbScpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzWzBdLm9mZnNldEhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgZnVuY3Rpb24gb2Zmc2V0KCkge1xuICAgIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgICB2YXIgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICB2YXIgYm9keSA9IGRvYy5ib2R5O1xuICAgICAgdmFyIGNsaWVudFRvcCA9IGVsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICAgICAgdmFyIGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICAgICAgdmFyIHNjcm9sbFRvcCA9IGVsID09PSB3aW4gPyB3aW4uc2Nyb2xsWSA6IGVsLnNjcm9sbFRvcDtcbiAgICAgIHZhciBzY3JvbGxMZWZ0ID0gZWwgPT09IHdpbiA/IHdpbi5zY3JvbGxYIDogZWwuc2Nyb2xsTGVmdDtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogKGJveC50b3AgKyBzY3JvbGxUb3ApIC0gY2xpZW50VG9wLFxuICAgICAgICBsZWZ0OiAoYm94LmxlZnQgKyBzY3JvbGxMZWZ0KSAtIGNsaWVudExlZnQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGZ1bmN0aW9uIHN0eWxlcygpIHtcbiAgICBpZiAodGhpc1swXSkgeyByZXR1cm4gd2luLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCk7IH1cbiAgICByZXR1cm4ge307XG4gIH1cbiAgZnVuY3Rpb24gY3NzKHByb3BzLCB2YWx1ZSkge1xuICAgIHZhciBpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodGhpc1swXSkgeyByZXR1cm4gd2luLmdldENvbXB1dGVkU3R5bGUodGhpc1swXSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wcyk7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBwcm9wcykge1xuICAgICAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wXSA9IHByb3BzW3Byb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDIgJiYgdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJykge1xuICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdGhpc1tpXS5zdHlsZVtwcm9wc10gPSB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyBJdGVyYXRlIG92ZXIgdGhlIGNvbGxlY3Rpb24gcGFzc2luZyBlbGVtZW50cyB0byBgY2FsbGJhY2tgXG4gIGZ1bmN0aW9uIGVhY2goY2FsbGJhY2spIHtcbiAgICAvLyBEb24ndCBib3RoZXIgY29udGludWluZyB3aXRob3V0IGEgY2FsbGJhY2tcbiAgICBpZiAoIWNhbGxiYWNrKSB7IHJldHVybiB0aGlzOyB9XG4gICAgLy8gSXRlcmF0ZSBvdmVyIHRoZSBjdXJyZW50IGNvbGxlY3Rpb25cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIC8vIElmIHRoZSBjYWxsYmFjayByZXR1cm5zIGZhbHNlXG4gICAgICBpZiAoY2FsbGJhY2suY2FsbCh0aGlzW2ldLCBpLCB0aGlzW2ldKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gRW5kIHRoZSBsb29wIGVhcmx5XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gYHRoaXNgIHRvIGFsbG93IGNoYWluZWQgRE9NIG9wZXJhdGlvbnNcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBmaWx0ZXIoY2FsbGJhY2spIHtcbiAgICB2YXIgbWF0Y2hlZEl0ZW1zID0gW107XG4gICAgdmFyIGRvbSA9IHRoaXM7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkb20ubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChjYWxsYmFjay5jYWxsKGRvbVtpXSwgaSwgZG9tW2ldKSkgeyBtYXRjaGVkSXRlbXMucHVzaChkb21baV0pOyB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgRG9tNyhtYXRjaGVkSXRlbXMpO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBmdW5jdGlvbiBodG1sKGh0bWwpIHtcbiAgICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpc1swXSA/IHRoaXNbMF0uaW5uZXJIVE1MIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdGhpc1tpXS5pbm5lckhUTUwgPSBodG1sO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgZnVuY3Rpb24gdGV4dCh0ZXh0KSB7XG4gICAgaWYgKHR5cGVvZiB0ZXh0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHRoaXNbMF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXNbMF0udGV4dENvbnRlbnQudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB0aGlzW2ldLnRleHRDb250ZW50ID0gdGV4dDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gaXMoc2VsZWN0b3IpIHtcbiAgICB2YXIgZWwgPSB0aGlzWzBdO1xuICAgIHZhciBjb21wYXJlV2l0aDtcbiAgICB2YXIgaTtcbiAgICBpZiAoIWVsIHx8IHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKSB7IHJldHVybiBlbC5tYXRjaGVzKHNlbGVjdG9yKTsgfVxuICAgICAgZWxzZSBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKSB7IHJldHVybiBlbC53ZWJraXRNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpOyB9XG4gICAgICBlbHNlIGlmIChlbC5tc01hdGNoZXNTZWxlY3RvcikgeyByZXR1cm4gZWwubXNNYXRjaGVzU2VsZWN0b3Ioc2VsZWN0b3IpOyB9XG5cbiAgICAgIGNvbXBhcmVXaXRoID0gJChzZWxlY3Rvcik7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcGFyZVdpdGgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoc2VsZWN0b3IgPT09IGRvYykgeyByZXR1cm4gZWwgPT09IGRvYzsgfVxuICAgIGVsc2UgaWYgKHNlbGVjdG9yID09PSB3aW4pIHsgcmV0dXJuIGVsID09PSB3aW47IH1cblxuICAgIGlmIChzZWxlY3Rvci5ub2RlVHlwZSB8fCBzZWxlY3RvciBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgIGNvbXBhcmVXaXRoID0gc2VsZWN0b3Iubm9kZVR5cGUgPyBbc2VsZWN0b3JdIDogc2VsZWN0b3I7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgY29tcGFyZVdpdGgubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGNvbXBhcmVXaXRoW2ldID09PSBlbCkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgZnVuY3Rpb24gaW5kZXgoKSB7XG4gICAgdmFyIGNoaWxkID0gdGhpc1swXTtcbiAgICB2YXIgaTtcbiAgICBpZiAoY2hpbGQpIHtcbiAgICAgIGkgPSAwO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB3aGlsZSAoKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIHsgaSArPSAxOyB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaTtcbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgZnVuY3Rpb24gZXEoaW5kZXgpIHtcbiAgICBpZiAodHlwZW9mIGluZGV4ID09PSAndW5kZWZpbmVkJykgeyByZXR1cm4gdGhpczsgfVxuICAgIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aDtcbiAgICB2YXIgcmV0dXJuSW5kZXg7XG4gICAgaWYgKGluZGV4ID4gbGVuZ3RoIC0gMSkge1xuICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICB9XG4gICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgcmV0dXJuSW5kZXggPSBsZW5ndGggKyBpbmRleDtcbiAgICAgIGlmIChyZXR1cm5JbmRleCA8IDApIHsgcmV0dXJuIG5ldyBEb203KFtdKTsgfVxuICAgICAgcmV0dXJuIG5ldyBEb203KFt0aGlzW3JldHVybkluZGV4XV0pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbaW5kZXhdXSk7XG4gIH1cbiAgZnVuY3Rpb24gYXBwZW5kKCkge1xuICAgIHZhciBhcmdzID0gW10sIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgIHZhciBuZXdDaGlsZDtcblxuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXJncy5sZW5ndGg7IGsgKz0gMSkge1xuICAgICAgbmV3Q2hpbGQgPSBhcmdzW2tdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3Q2hpbGQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgdmFyIHRlbXBEaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgdGVtcERpdi5pbm5lckhUTUwgPSBuZXdDaGlsZDtcbiAgICAgICAgICB3aGlsZSAodGVtcERpdi5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKHRlbXBEaXYuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG5ld0NoaWxkIGluc3RhbmNlb2YgRG9tNykge1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbmV3Q2hpbGQubGVuZ3RoOyBqICs9IDEpIHtcbiAgICAgICAgICAgIHRoaXNbaV0uYXBwZW5kQ2hpbGQobmV3Q2hpbGRbal0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzW2ldLmFwcGVuZENoaWxkKG5ld0NoaWxkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIHByZXBlbmQobmV3Q2hpbGQpIHtcbiAgICB2YXIgaTtcbiAgICB2YXIgajtcbiAgICBmb3IgKGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHR5cGVvZiBuZXdDaGlsZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIHRlbXBEaXYgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRlbXBEaXYuaW5uZXJIVE1MID0gbmV3Q2hpbGQ7XG4gICAgICAgIGZvciAoaiA9IHRlbXBEaXYuY2hpbGROb2Rlcy5sZW5ndGggLSAxOyBqID49IDA7IGogLT0gMSkge1xuICAgICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKHRlbXBEaXYuY2hpbGROb2Rlc1tqXSwgdGhpc1tpXS5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdDaGlsZCBpbnN0YW5jZW9mIERvbTcpIHtcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IG5ld0NoaWxkLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgICAgdGhpc1tpXS5pbnNlcnRCZWZvcmUobmV3Q2hpbGRbal0sIHRoaXNbaV0uY2hpbGROb2Rlc1swXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNbaV0uaW5zZXJ0QmVmb3JlKG5ld0NoaWxkLCB0aGlzW2ldLmNoaWxkTm9kZXNbMF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBuZXh0KHNlbGVjdG9yKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICh0aGlzWzBdLm5leHRFbGVtZW50U2libGluZyAmJiAkKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKS5pcyhzZWxlY3RvcikpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IERvbTcoW3RoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXNbMF0ubmV4dEVsZW1lbnRTaWJsaW5nKSB7IHJldHVybiBuZXcgRG9tNyhbdGhpc1swXS5uZXh0RWxlbWVudFNpYmxpbmddKTsgfVxuICAgICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEb203KFtdKTtcbiAgfVxuICBmdW5jdGlvbiBuZXh0QWxsKHNlbGVjdG9yKSB7XG4gICAgdmFyIG5leHRFbHMgPSBbXTtcbiAgICB2YXIgZWwgPSB0aGlzWzBdO1xuICAgIGlmICghZWwpIHsgcmV0dXJuIG5ldyBEb203KFtdKTsgfVxuICAgIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHZhciBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgaWYgKCQobmV4dCkuaXMoc2VsZWN0b3IpKSB7IG5leHRFbHMucHVzaChuZXh0KTsgfVxuICAgICAgfSBlbHNlIHsgbmV4dEVscy5wdXNoKG5leHQpOyB9XG4gICAgICBlbCA9IG5leHQ7XG4gICAgfVxuICAgIHJldHVybiBuZXcgRG9tNyhuZXh0RWxzKTtcbiAgfVxuICBmdW5jdGlvbiBwcmV2KHNlbGVjdG9yKSB7XG4gICAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgICAgdmFyIGVsID0gdGhpc1swXTtcbiAgICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBpZiAoZWwucHJldmlvdXNFbGVtZW50U2libGluZyAmJiAkKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIHJldHVybiBuZXcgRG9tNyhbZWwucHJldmlvdXNFbGVtZW50U2libGluZ10pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7IHJldHVybiBuZXcgRG9tNyhbZWwucHJldmlvdXNFbGVtZW50U2libGluZ10pOyB9XG4gICAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcoW10pO1xuICB9XG4gIGZ1bmN0aW9uIHByZXZBbGwoc2VsZWN0b3IpIHtcbiAgICB2YXIgcHJldkVscyA9IFtdO1xuICAgIHZhciBlbCA9IHRoaXNbMF07XG4gICAgaWYgKCFlbCkgeyByZXR1cm4gbmV3IERvbTcoW10pOyB9XG4gICAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgIHZhciBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGlmICgkKHByZXYpLmlzKHNlbGVjdG9yKSkgeyBwcmV2RWxzLnB1c2gocHJldik7IH1cbiAgICAgIH0gZWxzZSB7IHByZXZFbHMucHVzaChwcmV2KTsgfVxuICAgICAgZWwgPSBwcmV2O1xuICAgIH1cbiAgICByZXR1cm4gbmV3IERvbTcocHJldkVscyk7XG4gIH1cbiAgZnVuY3Rpb24gcGFyZW50KHNlbGVjdG9yKSB7XG4gICAgdmFyIHBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHRoaXNbaV0ucGFyZW50Tm9kZSAhPT0gbnVsbCkge1xuICAgICAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzW2ldLnBhcmVudE5vZGUpLmlzKHNlbGVjdG9yKSkgeyBwYXJlbnRzLnB1c2godGhpc1tpXS5wYXJlbnROb2RlKTsgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhcmVudHMucHVzaCh0aGlzW2ldLnBhcmVudE5vZGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkKHVuaXF1ZShwYXJlbnRzKSk7XG4gIH1cbiAgZnVuY3Rpb24gcGFyZW50cyhzZWxlY3Rvcikge1xuICAgIHZhciBwYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBwYXJlbnQgPSB0aGlzW2ldLnBhcmVudE5vZGU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICAgIHdoaWxlIChwYXJlbnQpIHtcbiAgICAgICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgICAgaWYgKCQocGFyZW50KS5pcyhzZWxlY3RvcikpIHsgcGFyZW50cy5wdXNoKHBhcmVudCk7IH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50Tm9kZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuICQodW5pcXVlKHBhcmVudHMpKTtcbiAgfVxuICBmdW5jdGlvbiBjbG9zZXN0KHNlbGVjdG9yKSB7XG4gICAgdmFyIGNsb3Nlc3QgPSB0aGlzOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiBuZXcgRG9tNyhbXSk7XG4gICAgfVxuICAgIGlmICghY2xvc2VzdC5pcyhzZWxlY3RvcikpIHtcbiAgICAgIGNsb3Nlc3QgPSBjbG9zZXN0LnBhcmVudHMoc2VsZWN0b3IpLmVxKDApO1xuICAgIH1cbiAgICByZXR1cm4gY2xvc2VzdDtcbiAgfVxuICBmdW5jdGlvbiBmaW5kKHNlbGVjdG9yKSB7XG4gICAgdmFyIGZvdW5kRWxlbWVudHMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBmb3VuZCA9IHRoaXNbaV0ucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGZvdW5kLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGZvdW5kRWxlbWVudHMucHVzaChmb3VuZFtqXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuZXcgRG9tNyhmb3VuZEVsZW1lbnRzKTtcbiAgfVxuICBmdW5jdGlvbiBjaGlsZHJlbihzZWxlY3Rvcikge1xuICAgIHZhciBjaGlsZHJlbiA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgY2hpbGROb2RlcyA9IHRoaXNbaV0uY2hpbGROb2RlcztcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGlsZE5vZGVzLmxlbmd0aDsgaiArPSAxKSB7XG4gICAgICAgIGlmICghc2VsZWN0b3IpIHtcbiAgICAgICAgICBpZiAoY2hpbGROb2Rlc1tqXS5ub2RlVHlwZSA9PT0gMSkgeyBjaGlsZHJlbi5wdXNoKGNoaWxkTm9kZXNbal0pOyB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hpbGROb2Rlc1tqXS5ub2RlVHlwZSA9PT0gMSAmJiAkKGNoaWxkTm9kZXNbal0pLmlzKHNlbGVjdG9yKSkge1xuICAgICAgICAgIGNoaWxkcmVuLnB1c2goY2hpbGROb2Rlc1tqXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5ldyBEb203KHVuaXF1ZShjaGlsZHJlbikpO1xuICB9XG4gIGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmICh0aGlzW2ldLnBhcmVudE5vZGUpIHsgdGhpc1tpXS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXNbaV0pOyB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIGFkZCgpIHtcbiAgICB2YXIgYXJncyA9IFtdLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICB2YXIgZG9tID0gdGhpcztcbiAgICB2YXIgaTtcbiAgICB2YXIgajtcbiAgICBmb3IgKGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIHRvQWRkID0gJChhcmdzW2ldKTtcbiAgICAgIGZvciAoaiA9IDA7IGogPCB0b0FkZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBkb21bZG9tLmxlbmd0aF0gPSB0b0FkZFtqXTtcbiAgICAgICAgZG9tLmxlbmd0aCArPSAxO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZG9tO1xuICB9XG5cbiAgdmFyIE1ldGhvZHMgPSB7XG4gICAgYWRkQ2xhc3M6IGFkZENsYXNzLFxuICAgIHJlbW92ZUNsYXNzOiByZW1vdmVDbGFzcyxcbiAgICBoYXNDbGFzczogaGFzQ2xhc3MsXG4gICAgdG9nZ2xlQ2xhc3M6IHRvZ2dsZUNsYXNzLFxuICAgIGF0dHI6IGF0dHIsXG4gICAgcmVtb3ZlQXR0cjogcmVtb3ZlQXR0cixcbiAgICBkYXRhOiBkYXRhLFxuICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24sXG4gICAgb246IG9uLFxuICAgIG9mZjogb2ZmLFxuICAgIHRyaWdnZXI6IHRyaWdnZXIsXG4gICAgdHJhbnNpdGlvbkVuZDogdHJhbnNpdGlvbkVuZCxcbiAgICBvdXRlcldpZHRoOiBvdXRlcldpZHRoLFxuICAgIG91dGVySGVpZ2h0OiBvdXRlckhlaWdodCxcbiAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICBjc3M6IGNzcyxcbiAgICBlYWNoOiBlYWNoLFxuICAgIGh0bWw6IGh0bWwsXG4gICAgdGV4dDogdGV4dCxcbiAgICBpczogaXMsXG4gICAgaW5kZXg6IGluZGV4LFxuICAgIGVxOiBlcSxcbiAgICBhcHBlbmQ6IGFwcGVuZCxcbiAgICBwcmVwZW5kOiBwcmVwZW5kLFxuICAgIG5leHQ6IG5leHQsXG4gICAgbmV4dEFsbDogbmV4dEFsbCxcbiAgICBwcmV2OiBwcmV2LFxuICAgIHByZXZBbGw6IHByZXZBbGwsXG4gICAgcGFyZW50OiBwYXJlbnQsXG4gICAgcGFyZW50czogcGFyZW50cyxcbiAgICBjbG9zZXN0OiBjbG9zZXN0LFxuICAgIGZpbmQ6IGZpbmQsXG4gICAgY2hpbGRyZW46IGNoaWxkcmVuLFxuICAgIGZpbHRlcjogZmlsdGVyLFxuICAgIHJlbW92ZTogcmVtb3ZlLFxuICAgIGFkZDogYWRkLFxuICAgIHN0eWxlczogc3R5bGVzLFxuICB9O1xuXG4gIE9iamVjdC5rZXlzKE1ldGhvZHMpLmZvckVhY2goZnVuY3Rpb24gKG1ldGhvZE5hbWUpIHtcbiAgICAkLmZuW21ldGhvZE5hbWVdID0gJC5mblttZXRob2ROYW1lXSB8fCBNZXRob2RzW21ldGhvZE5hbWVdO1xuICB9KTtcblxuICB2YXIgVXRpbHMgPSB7XG4gICAgZGVsZXRlUHJvcHM6IGZ1bmN0aW9uIGRlbGV0ZVByb3BzKG9iaikge1xuICAgICAgdmFyIG9iamVjdCA9IG9iajtcbiAgICAgIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgb2JqZWN0W2tleV0gPSBudWxsO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgLy8gbm8gZ2V0dGVyIGZvciBvYmplY3RcbiAgICAgICAgfVxuICAgICAgICB0cnkge1xuICAgICAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIHNvbWV0aGluZyBnb3Qgd3JvbmdcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSxcbiAgICBuZXh0VGljazogZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2ssIGRlbGF5KSB7XG4gICAgICBpZiAoIGRlbGF5ID09PSB2b2lkIDAgKSBkZWxheSA9IDA7XG5cbiAgICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSk7XG4gICAgfSxcbiAgICBub3c6IGZ1bmN0aW9uIG5vdygpIHtcbiAgICAgIHJldHVybiBEYXRlLm5vdygpO1xuICAgIH0sXG4gICAgZ2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBnZXRUcmFuc2xhdGUoZWwsIGF4aXMpIHtcbiAgICAgIGlmICggYXhpcyA9PT0gdm9pZCAwICkgYXhpcyA9ICd4JztcblxuICAgICAgdmFyIG1hdHJpeDtcbiAgICAgIHZhciBjdXJUcmFuc2Zvcm07XG4gICAgICB2YXIgdHJhbnNmb3JtTWF0cml4O1xuXG4gICAgICB2YXIgY3VyU3R5bGUgPSB3aW4uZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG5cbiAgICAgIGlmICh3aW4uV2ViS2l0Q1NTTWF0cml4KSB7XG4gICAgICAgIGN1clRyYW5zZm9ybSA9IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgICAgIGlmIChjdXJUcmFuc2Zvcm0uc3BsaXQoJywnKS5sZW5ndGggPiA2KSB7XG4gICAgICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KCcsICcpLm1hcChmdW5jdGlvbiAoYSkgeyByZXR1cm4gYS5yZXBsYWNlKCcsJywgJy4nKTsgfSkuam9pbignLCAnKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTb21lIG9sZCB2ZXJzaW9ucyBvZiBXZWJraXQgY2hva2Ugd2hlbiAnbm9uZScgaXMgcGFzc2VkOyBwYXNzXG4gICAgICAgIC8vIGVtcHR5IHN0cmluZyBpbnN0ZWFkIGluIHRoaXMgY2FzZVxuICAgICAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luLldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKS5yZXBsYWNlKCd0cmFuc2xhdGUoJywgJ21hdHJpeCgxLCAwLCAwLCAxLCcpO1xuICAgICAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdCgnLCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgICAgIGlmICh3aW4uV2ViS2l0Q1NTTWF0cml4KSB7IGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7IH1cbiAgICAgICAgLy8gQ3JhenkgSUUxMCBNYXRyaXhcbiAgICAgICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIHsgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTJdKTsgfVxuICAgICAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICAgICAgZWxzZSB7IGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzRdKTsgfVxuICAgICAgfVxuICAgICAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgICAgICAvLyBMYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgICAgICBpZiAod2luLldlYktpdENTU01hdHJpeCkgeyBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQyOyB9XG4gICAgICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSB7IGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEzXSk7IH1cbiAgICAgICAgLy8gTm9ybWFsIEJyb3dzZXJzXG4gICAgICAgIGVsc2UgeyBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs1XSk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcbiAgICB9LFxuICAgIHBhcnNlVXJsUXVlcnk6IGZ1bmN0aW9uIHBhcnNlVXJsUXVlcnkodXJsKSB7XG4gICAgICB2YXIgcXVlcnkgPSB7fTtcbiAgICAgIHZhciB1cmxUb1BhcnNlID0gdXJsIHx8IHdpbi5sb2NhdGlvbi5ocmVmO1xuICAgICAgdmFyIGk7XG4gICAgICB2YXIgcGFyYW1zO1xuICAgICAgdmFyIHBhcmFtO1xuICAgICAgdmFyIGxlbmd0aDtcbiAgICAgIGlmICh0eXBlb2YgdXJsVG9QYXJzZSA9PT0gJ3N0cmluZycgJiYgdXJsVG9QYXJzZS5sZW5ndGgpIHtcbiAgICAgICAgdXJsVG9QYXJzZSA9IHVybFRvUGFyc2UuaW5kZXhPZignPycpID4gLTEgPyB1cmxUb1BhcnNlLnJlcGxhY2UoL1xcUypcXD8vLCAnJykgOiAnJztcbiAgICAgICAgcGFyYW1zID0gdXJsVG9QYXJzZS5zcGxpdCgnJicpLmZpbHRlcihmdW5jdGlvbiAocGFyYW1zUGFydCkgeyByZXR1cm4gcGFyYW1zUGFydCAhPT0gJyc7IH0pO1xuICAgICAgICBsZW5ndGggPSBwYXJhbXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIHBhcmFtID0gcGFyYW1zW2ldLnJlcGxhY2UoLyNcXFMrL2csICcnKS5zcGxpdCgnPScpO1xuICAgICAgICAgIHF1ZXJ5W2RlY29kZVVSSUNvbXBvbmVudChwYXJhbVswXSldID0gdHlwZW9mIHBhcmFtWzFdID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IGRlY29kZVVSSUNvbXBvbmVudChwYXJhbVsxXSkgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9LFxuICAgIGlzT2JqZWN0OiBmdW5jdGlvbiBpc09iamVjdChvKSB7XG4gICAgICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8gIT09IG51bGwgJiYgby5jb25zdHJ1Y3RvciAmJiBvLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgfSxcbiAgICBleHRlbmQ6IGZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgICAgIHZhciBhcmdzID0gW10sIGxlbiQxID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggbGVuJDEtLSApIGFyZ3NbIGxlbiQxIF0gPSBhcmd1bWVudHNbIGxlbiQxIF07XG5cbiAgICAgIHZhciB0byA9IE9iamVjdChhcmdzWzBdKTtcbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJncy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YXIgbmV4dFNvdXJjZSA9IGFyZ3NbaV07XG4gICAgICAgIGlmIChuZXh0U291cmNlICE9PSB1bmRlZmluZWQgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCkge1xuICAgICAgICAgIHZhciBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpO1xuICAgICAgICAgIGZvciAodmFyIG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcbiAgICAgICAgICAgIHZhciBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICAgICAgICB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgICAgICBpZiAoVXRpbHMuaXNPYmplY3QodG9bbmV4dEtleV0pICYmIFV0aWxzLmlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICAgICAgVXRpbHMuZXh0ZW5kKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICghVXRpbHMuaXNPYmplY3QodG9bbmV4dEtleV0pICYmIFV0aWxzLmlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSB7fTtcbiAgICAgICAgICAgICAgICBVdGlscy5leHRlbmQodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIFN1cHBvcnQgPSAoZnVuY3Rpb24gU3VwcG9ydCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdG91Y2g6ICh3aW4uTW9kZXJuaXpyICYmIHdpbi5Nb2Rlcm5penIudG91Y2ggPT09IHRydWUpIHx8IChmdW5jdGlvbiBjaGVja1RvdWNoKCkge1xuICAgICAgICByZXR1cm4gISEoKHdpbi5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSB8fCAoJ29udG91Y2hzdGFydCcgaW4gd2luKSB8fCAod2luLkRvY3VtZW50VG91Y2ggJiYgZG9jIGluc3RhbmNlb2Ygd2luLkRvY3VtZW50VG91Y2gpKTtcbiAgICAgIH0oKSksXG5cbiAgICAgIHBvaW50ZXJFdmVudHM6ICEhKHdpbi5uYXZpZ2F0b3IucG9pbnRlckVuYWJsZWQgfHwgd2luLlBvaW50ZXJFdmVudCB8fCAoJ21heFRvdWNoUG9pbnRzJyBpbiB3aW4ubmF2aWdhdG9yICYmIHdpbi5uYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwKSksXG4gICAgICBwcmVmaXhlZFBvaW50ZXJFdmVudHM6ICEhd2luLm5hdmlnYXRvci5tc1BvaW50ZXJFbmFibGVkLFxuXG4gICAgICBvYnNlcnZlcjogKGZ1bmN0aW9uIGNoZWNrT2JzZXJ2ZXIoKSB7XG4gICAgICAgIHJldHVybiAoJ011dGF0aW9uT2JzZXJ2ZXInIGluIHdpbiB8fCAnV2Via2l0TXV0YXRpb25PYnNlcnZlcicgaW4gd2luKTtcbiAgICAgIH0oKSksXG5cbiAgICAgIHBhc3NpdmVMaXN0ZW5lcjogKGZ1bmN0aW9uIGNoZWNrUGFzc2l2ZUxpc3RlbmVyKCkge1xuICAgICAgICB2YXIgc3VwcG9ydHNQYXNzaXZlID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFyIG9wdHMgPSBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdwYXNzaXZlJywge1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgICAgc3VwcG9ydHNQYXNzaXZlID0gdHJ1ZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Rlc3RQYXNzaXZlTGlzdGVuZXInLCBudWxsLCBvcHRzKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIC8vIE5vIHN1cHBvcnRcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VwcG9ydHNQYXNzaXZlO1xuICAgICAgfSgpKSxcblxuICAgICAgZ2VzdHVyZXM6IChmdW5jdGlvbiBjaGVja0dlc3R1cmVzKCkge1xuICAgICAgICByZXR1cm4gJ29uZ2VzdHVyZXN0YXJ0JyBpbiB3aW47XG4gICAgICB9KCkpLFxuICAgIH07XG4gIH0oKSk7XG5cbiAgdmFyIFN3aXBlckNsYXNzID0gZnVuY3Rpb24gU3dpcGVyQ2xhc3MocGFyYW1zKSB7XG4gICAgaWYgKCBwYXJhbXMgPT09IHZvaWQgMCApIHBhcmFtcyA9IHt9O1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHNlbGYucGFyYW1zID0gcGFyYW1zO1xuXG4gICAgLy8gRXZlbnRzXG4gICAgc2VsZi5ldmVudHNMaXN0ZW5lcnMgPSB7fTtcblxuICAgIGlmIChzZWxmLnBhcmFtcyAmJiBzZWxmLnBhcmFtcy5vbikge1xuICAgICAgT2JqZWN0LmtleXMoc2VsZi5wYXJhbXMub24pLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICBzZWxmLm9uKGV2ZW50TmFtZSwgc2VsZi5wYXJhbXMub25bZXZlbnROYW1lXSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHN0YXRpY0FjY2Vzc29ycyA9IHsgY29tcG9uZW50czogeyBjb25maWd1cmFibGU6IHRydWUgfSB9O1xuXG4gIFN3aXBlckNsYXNzLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uIChldmVudHMsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gc2VsZjsgfVxuICAgIHZhciBtZXRob2QgPSBwcmlvcml0eSA/ICd1bnNoaWZ0JyA6ICdwdXNoJztcbiAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHsgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107IH1cbiAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XVttZXRob2RdKGhhbmRsZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIFN3aXBlckNsYXNzLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZSAoZXZlbnRzLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIHNlbGY7IH1cbiAgICBmdW5jdGlvbiBvbmNlSGFuZGxlcigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKCBsZW4tLSApIGFyZ3NbIGxlbiBdID0gYXJndW1lbnRzWyBsZW4gXTtcblxuICAgICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgICAgIHNlbGYub2ZmKGV2ZW50cywgb25jZUhhbmRsZXIpO1xuICAgICAgaWYgKG9uY2VIYW5kbGVyLmY3cHJveHkpIHtcbiAgICAgICAgZGVsZXRlIG9uY2VIYW5kbGVyLmY3cHJveHk7XG4gICAgICB9XG4gICAgfVxuICAgIG9uY2VIYW5kbGVyLmY3cHJveHkgPSBoYW5kbGVyO1xuICAgIHJldHVybiBzZWxmLm9uKGV2ZW50cywgb25jZUhhbmRsZXIsIHByaW9yaXR5KTtcbiAgfTtcblxuICBTd2lwZXJDbGFzcy5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gb2ZmIChldmVudHMsIGhhbmRsZXIpIHtcbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgeyByZXR1cm4gc2VsZjsgfVxuICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0gJiYgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLmxlbmd0aCkge1xuICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaChmdW5jdGlvbiAoZXZlbnRIYW5kbGVyLCBpbmRleCkge1xuICAgICAgICAgIGlmIChldmVudEhhbmRsZXIgPT09IGhhbmRsZXIgfHwgKGV2ZW50SGFuZGxlci5mN3Byb3h5ICYmIGV2ZW50SGFuZGxlci5mN3Byb3h5ID09PSBoYW5kbGVyKSkge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICBTd2lwZXJDbGFzcy5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQgKCkge1xuICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgeyByZXR1cm4gc2VsZjsgfVxuICAgIHZhciBldmVudHM7XG4gICAgdmFyIGRhdGE7XG4gICAgdmFyIGNvbnRleHQ7XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICBldmVudHMgPSBhcmdzWzBdO1xuICAgICAgZGF0YSA9IGFyZ3Muc2xpY2UoMSwgYXJncy5sZW5ndGgpO1xuICAgICAgY29udGV4dCA9IHNlbGY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50cyA9IGFyZ3NbMF0uZXZlbnRzO1xuICAgICAgZGF0YSA9IGFyZ3NbMF0uZGF0YTtcbiAgICAgIGNvbnRleHQgPSBhcmdzWzBdLmNvbnRleHQgfHwgc2VsZjtcbiAgICB9XG4gICAgdmFyIGV2ZW50c0FycmF5ID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogZXZlbnRzLnNwbGl0KCcgJyk7XG4gICAgZXZlbnRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgdmFyIGhhbmRsZXJzID0gW107XG4gICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICBoYW5kbGVycy5wdXNoKGV2ZW50SGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgICBoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudEhhbmRsZXIpIHtcbiAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIFN3aXBlckNsYXNzLnByb3RvdHlwZS51c2VNb2R1bGVzUGFyYW1zID0gZnVuY3Rpb24gdXNlTW9kdWxlc1BhcmFtcyAoaW5zdGFuY2VQYXJhbXMpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSB0aGlzO1xuICAgIGlmICghaW5zdGFuY2UubW9kdWxlcykgeyByZXR1cm47IH1cbiAgICBPYmplY3Qua2V5cyhpbnN0YW5jZS5tb2R1bGVzKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVOYW1lKSB7XG4gICAgICB2YXIgbW9kdWxlID0gaW5zdGFuY2UubW9kdWxlc1ttb2R1bGVOYW1lXTtcbiAgICAgIC8vIEV4dGVuZCBwYXJhbXNcbiAgICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XG4gICAgICAgIFV0aWxzLmV4dGVuZChpbnN0YW5jZVBhcmFtcywgbW9kdWxlLnBhcmFtcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbiAgU3dpcGVyQ2xhc3MucHJvdG90eXBlLnVzZU1vZHVsZXMgPSBmdW5jdGlvbiB1c2VNb2R1bGVzIChtb2R1bGVzUGFyYW1zKSB7XG4gICAgICBpZiAoIG1vZHVsZXNQYXJhbXMgPT09IHZvaWQgMCApIG1vZHVsZXNQYXJhbXMgPSB7fTtcblxuICAgIHZhciBpbnN0YW5jZSA9IHRoaXM7XG4gICAgaWYgKCFpbnN0YW5jZS5tb2R1bGVzKSB7IHJldHVybjsgfVxuICAgIE9iamVjdC5rZXlzKGluc3RhbmNlLm1vZHVsZXMpLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZU5hbWUpIHtcbiAgICAgIHZhciBtb2R1bGUgPSBpbnN0YW5jZS5tb2R1bGVzW21vZHVsZU5hbWVdO1xuICAgICAgdmFyIG1vZHVsZVBhcmFtcyA9IG1vZHVsZXNQYXJhbXNbbW9kdWxlTmFtZV0gfHwge307XG4gICAgICAvLyBFeHRlbmQgaW5zdGFuY2UgbWV0aG9kcyBhbmQgcHJvcHNcbiAgICAgIGlmIChtb2R1bGUuaW5zdGFuY2UpIHtcbiAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlLmluc3RhbmNlKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVQcm9wTmFtZSkge1xuICAgICAgICAgIHZhciBtb2R1bGVQcm9wID0gbW9kdWxlLmluc3RhbmNlW21vZHVsZVByb3BOYW1lXTtcbiAgICAgICAgICBpZiAodHlwZW9mIG1vZHVsZVByb3AgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGluc3RhbmNlW21vZHVsZVByb3BOYW1lXSA9IG1vZHVsZVByb3AuYmluZChpbnN0YW5jZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGluc3RhbmNlW21vZHVsZVByb3BOYW1lXSA9IG1vZHVsZVByb3A7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICAgIGlmIChtb2R1bGUub24gJiYgaW5zdGFuY2Uub24pIHtcbiAgICAgICAgT2JqZWN0LmtleXMobW9kdWxlLm9uKS5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVFdmVudE5hbWUpIHtcbiAgICAgICAgICBpbnN0YW5jZS5vbihtb2R1bGVFdmVudE5hbWUsIG1vZHVsZS5vblttb2R1bGVFdmVudE5hbWVdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE1vZHVsZSBjcmVhdGUgY2FsbGJhY2tcbiAgICAgIGlmIChtb2R1bGUuY3JlYXRlKSB7XG4gICAgICAgIG1vZHVsZS5jcmVhdGUuYmluZChpbnN0YW5jZSkobW9kdWxlUGFyYW1zKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxuICBzdGF0aWNBY2Nlc3NvcnMuY29tcG9uZW50cy5zZXQgPSBmdW5jdGlvbiAoY29tcG9uZW50cykge1xuICAgIHZhciBDbGFzcyA9IHRoaXM7XG4gICAgaWYgKCFDbGFzcy51c2UpIHsgcmV0dXJuOyB9XG4gICAgQ2xhc3MudXNlKGNvbXBvbmVudHMpO1xuICB9O1xuXG4gIFN3aXBlckNsYXNzLmluc3RhbGxNb2R1bGUgPSBmdW5jdGlvbiBpbnN0YWxsTW9kdWxlIChtb2R1bGUpIHtcbiAgICAgIHZhciBwYXJhbXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAoIGxlbi0tID4gMCApIHBhcmFtc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIHZhciBDbGFzcyA9IHRoaXM7XG4gICAgaWYgKCFDbGFzcy5wcm90b3R5cGUubW9kdWxlcykgeyBDbGFzcy5wcm90b3R5cGUubW9kdWxlcyA9IHt9OyB9XG4gICAgdmFyIG5hbWUgPSBtb2R1bGUubmFtZSB8fCAoKChPYmplY3Qua2V5cyhDbGFzcy5wcm90b3R5cGUubW9kdWxlcykubGVuZ3RoKSArIFwiX1wiICsgKFV0aWxzLm5vdygpKSkpO1xuICAgIENsYXNzLnByb3RvdHlwZS5tb2R1bGVzW25hbWVdID0gbW9kdWxlO1xuICAgIC8vIFByb3RvdHlwZVxuICAgIGlmIChtb2R1bGUucHJvdG8pIHtcbiAgICAgIE9iamVjdC5rZXlzKG1vZHVsZS5wcm90bykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIENsYXNzLnByb3RvdHlwZVtrZXldID0gbW9kdWxlLnByb3RvW2tleV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2xhc3NcbiAgICBpZiAobW9kdWxlLnN0YXRpYykge1xuICAgICAgT2JqZWN0LmtleXMobW9kdWxlLnN0YXRpYykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIENsYXNzW2tleV0gPSBtb2R1bGUuc3RhdGljW2tleV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgLy8gQ2FsbGJhY2tcbiAgICBpZiAobW9kdWxlLmluc3RhbGwpIHtcbiAgICAgIG1vZHVsZS5pbnN0YWxsLmFwcGx5KENsYXNzLCBwYXJhbXMpO1xuICAgIH1cbiAgICByZXR1cm4gQ2xhc3M7XG4gIH07XG5cbiAgU3dpcGVyQ2xhc3MudXNlID0gZnVuY3Rpb24gdXNlIChtb2R1bGUpIHtcbiAgICAgIHZhciBwYXJhbXMgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG4gICAgICB3aGlsZSAoIGxlbi0tID4gMCApIHBhcmFtc1sgbGVuIF0gPSBhcmd1bWVudHNbIGxlbiArIDEgXTtcblxuICAgIHZhciBDbGFzcyA9IHRoaXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobW9kdWxlKSkge1xuICAgICAgbW9kdWxlLmZvckVhY2goZnVuY3Rpb24gKG0pIHsgcmV0dXJuIENsYXNzLmluc3RhbGxNb2R1bGUobSk7IH0pO1xuICAgICAgcmV0dXJuIENsYXNzO1xuICAgIH1cbiAgICByZXR1cm4gQ2xhc3MuaW5zdGFsbE1vZHVsZS5hcHBseShDbGFzcywgWyBtb2R1bGUgXS5jb25jYXQoIHBhcmFtcyApKTtcbiAgfTtcblxuICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyggU3dpcGVyQ2xhc3MsIHN0YXRpY0FjY2Vzc29ycyApO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNpemUgKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciB3aWR0aDtcbiAgICB2YXIgaGVpZ2h0O1xuICAgIHZhciAkZWwgPSBzd2lwZXIuJGVsO1xuICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy53aWR0aCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHdpZHRoID0gc3dpcGVyLnBhcmFtcy53aWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgd2lkdGggPSAkZWxbMF0uY2xpZW50V2lkdGg7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBoZWlnaHQgPSBzd2lwZXIucGFyYW1zLmhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgaGVpZ2h0ID0gJGVsWzBdLmNsaWVudEhlaWdodDtcbiAgICB9XG4gICAgaWYgKCh3aWR0aCA9PT0gMCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHx8IChoZWlnaHQgPT09IDAgJiYgc3dpcGVyLmlzVmVydGljYWwoKSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBTdWJ0cmFjdCBwYWRkaW5nc1xuICAgIHdpZHRoID0gd2lkdGggLSBwYXJzZUludCgkZWwuY3NzKCdwYWRkaW5nLWxlZnQnKSwgMTApIC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy1yaWdodCcpLCAxMCk7XG4gICAgaGVpZ2h0ID0gaGVpZ2h0IC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy10b3AnKSwgMTApIC0gcGFyc2VJbnQoJGVsLmNzcygncGFkZGluZy1ib3R0b20nKSwgMTApO1xuXG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgd2lkdGg6IHdpZHRoLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICBzaXplOiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB3aWR0aCA6IGhlaWdodCxcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlcyAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG5cbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHZhciBzd2lwZXJTaXplID0gc3dpcGVyLnNpemU7XG4gICAgdmFyIHJ0bCA9IHN3aXBlci5ydGxUcmFuc2xhdGU7XG4gICAgdmFyIHdyb25nUlRMID0gc3dpcGVyLndyb25nUlRMO1xuICAgIHZhciBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgIHZhciBwcmV2aW91c1NsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICB2YXIgc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSkpO1xuICAgIHZhciBzbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc2xpZGVzLmxlbmd0aDtcbiAgICB2YXIgc25hcEdyaWQgPSBbXTtcbiAgICB2YXIgc2xpZGVzR3JpZCA9IFtdO1xuICAgIHZhciBzbGlkZXNTaXplc0dyaWQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHNsaWRlc0Zvck1hcmdpbihzbGlkZUluZGV4KSB7XG4gICAgICBpZiAoIXBhcmFtcy5jc3NNb2RlKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICBpZiAoc2xpZGVJbmRleCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmU7XG4gICAgaWYgKHR5cGVvZiBvZmZzZXRCZWZvcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUuY2FsbChzd2lwZXIpO1xuICAgIH1cblxuICAgIHZhciBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlcjtcbiAgICBpZiAodHlwZW9mIG9mZnNldEFmdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlci5jYWxsKHN3aXBlcik7XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzU25hcEdyaWRMZW5ndGggPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICAgIHZhciBwcmV2aW91c1NsaWRlc0dyaWRMZW5ndGggPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuXG4gICAgdmFyIHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gICAgdmFyIHNsaWRlUG9zaXRpb24gPSAtb2Zmc2V0QmVmb3JlO1xuICAgIHZhciBwcmV2U2xpZGVTaXplID0gMDtcbiAgICB2YXIgaW5kZXggPSAwO1xuICAgIGlmICh0eXBlb2Ygc3dpcGVyU2l6ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgc3BhY2VCZXR3ZWVuID0gKHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwKSAqIHN3aXBlclNpemU7XG4gICAgfVxuXG4gICAgc3dpcGVyLnZpcnR1YWxTaXplID0gLXNwYWNlQmV0d2VlbjtcblxuICAgIC8vIHJlc2V0IG1hcmdpbnNcbiAgICBpZiAocnRsKSB7IHNsaWRlcy5jc3MoeyBtYXJnaW5MZWZ0OiAnJywgbWFyZ2luVG9wOiAnJyB9KTsgfVxuICAgIGVsc2UgeyBzbGlkZXMuY3NzKHsgbWFyZ2luUmlnaHQ6ICcnLCBtYXJnaW5Cb3R0b206ICcnIH0pOyB9XG5cbiAgICB2YXIgc2xpZGVzTnVtYmVyRXZlblRvUm93cztcbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgIGlmIChNYXRoLmZsb29yKHNsaWRlc0xlbmd0aCAvIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pID09PSBzbGlkZXNMZW5ndGggLyBzd2lwZXIucGFyYW1zLnNsaWRlc1BlckNvbHVtbikge1xuICAgICAgICBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzID0gc2xpZGVzTGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGguY2VpbChzbGlkZXNMZW5ndGggLyBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uKSAqIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW47XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uRmlsbCA9PT0gJ3JvdycpIHtcbiAgICAgICAgc2xpZGVzTnVtYmVyRXZlblRvUm93cyA9IE1hdGgubWF4KHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MsIHBhcmFtcy5zbGlkZXNQZXJWaWV3ICogcGFyYW1zLnNsaWRlc1BlckNvbHVtbik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2FsYyBzbGlkZXNcbiAgICB2YXIgc2xpZGVTaXplO1xuICAgIHZhciBzbGlkZXNQZXJDb2x1bW4gPSBwYXJhbXMuc2xpZGVzUGVyQ29sdW1uO1xuICAgIHZhciBzbGlkZXNQZXJSb3cgPSBzbGlkZXNOdW1iZXJFdmVuVG9Sb3dzIC8gc2xpZGVzUGVyQ29sdW1uO1xuICAgIHZhciBudW1GdWxsQ29sdW1ucyA9IE1hdGguZmxvb3Ioc2xpZGVzTGVuZ3RoIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNMZW5ndGg7IGkgKz0gMSkge1xuICAgICAgc2xpZGVTaXplID0gMDtcbiAgICAgIHZhciBzbGlkZSA9IHNsaWRlcy5lcShpKTtcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyQ29sdW1uID4gMSkge1xuICAgICAgICAvLyBTZXQgc2xpZGVzIG9yZGVyXG4gICAgICAgIHZhciBuZXdTbGlkZU9yZGVySW5kZXggPSAodm9pZCAwKTtcbiAgICAgICAgdmFyIGNvbHVtbiA9ICh2b2lkIDApO1xuICAgICAgICB2YXIgcm93ID0gKHZvaWQgMCk7XG4gICAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyQ29sdW1uRmlsbCA9PT0gJ3JvdycgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSkge1xuICAgICAgICAgIHZhciBncm91cEluZGV4ID0gTWF0aC5mbG9vcihpIC8gKHBhcmFtcy5zbGlkZXNQZXJHcm91cCAqIHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4pKTtcbiAgICAgICAgICB2YXIgc2xpZGVJbmRleEluR3JvdXAgPSBpIC0gcGFyYW1zLnNsaWRlc1BlckNvbHVtbiAqIHBhcmFtcy5zbGlkZXNQZXJHcm91cCAqIGdyb3VwSW5kZXg7XG5cbiAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKHNsaWRlSW5kZXhJbkdyb3VwIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbik7XG4gICAgICAgICAgY29sdW1uID0gKHNsaWRlSW5kZXhJbkdyb3VwIC0gcm93ICogcGFyYW1zLnNsaWRlc1Blckdyb3VwKSArIGdyb3VwSW5kZXggKiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG5cbiAgICAgICAgICBuZXdTbGlkZU9yZGVySW5kZXggPSBjb2x1bW4gKyAoKHJvdyAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3MpIC8gc2xpZGVzUGVyQ29sdW1uKTtcbiAgICAgICAgICBzbGlkZVxuICAgICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICAgICctd2Via2l0LWJveC1vcmRpbmFsLWdyb3VwJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgICAnLW1vei1ib3gtb3JkaW5hbC1ncm91cCc6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgJy1tcy1mbGV4LW9yZGVyJzogbmV3U2xpZGVPcmRlckluZGV4LFxuICAgICAgICAgICAgICAnLXdlYmtpdC1vcmRlcic6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgICAgb3JkZXI6IG5ld1NsaWRlT3JkZXJJbmRleCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW5GaWxsID09PSAnY29sdW1uJykge1xuICAgICAgICAgIGNvbHVtbiA9IE1hdGguZmxvb3IoaSAvIHNsaWRlc1BlckNvbHVtbik7XG4gICAgICAgICAgcm93ID0gaSAtIChjb2x1bW4gKiBzbGlkZXNQZXJDb2x1bW4pO1xuICAgICAgICAgIGlmIChjb2x1bW4gPiBudW1GdWxsQ29sdW1ucyB8fCAoY29sdW1uID09PSBudW1GdWxsQ29sdW1ucyAmJiByb3cgPT09IHNsaWRlc1BlckNvbHVtbiAtIDEpKSB7XG4gICAgICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgICAgIGlmIChyb3cgPj0gc2xpZGVzUGVyQ29sdW1uKSB7XG4gICAgICAgICAgICAgIHJvdyA9IDA7XG4gICAgICAgICAgICAgIGNvbHVtbiArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByb3cgPSBNYXRoLmZsb29yKGkgLyBzbGlkZXNQZXJSb3cpO1xuICAgICAgICAgIGNvbHVtbiA9IGkgLSAocm93ICogc2xpZGVzUGVyUm93KTtcbiAgICAgICAgfVxuICAgICAgICBzbGlkZS5jc3MoXG4gICAgICAgICAgKFwibWFyZ2luLVwiICsgKHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd0b3AnIDogJ2xlZnQnKSksXG4gICAgICAgICAgKHJvdyAhPT0gMCAmJiBwYXJhbXMuc3BhY2VCZXR3ZWVuKSAmJiAoKChwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoc2xpZGUuY3NzKCdkaXNwbGF5JykgPT09ICdub25lJykgeyBjb250aW51ZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHZhciBzbGlkZVN0eWxlcyA9IHdpbi5nZXRDb21wdXRlZFN0eWxlKHNsaWRlWzBdLCBudWxsKTtcbiAgICAgICAgdmFyIGN1cnJlbnRUcmFuc2Zvcm0gPSBzbGlkZVswXS5zdHlsZS50cmFuc2Zvcm07XG4gICAgICAgIHZhciBjdXJyZW50V2ViS2l0VHJhbnNmb3JtID0gc2xpZGVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgICAgICBpZiAoY3VycmVudFRyYW5zZm9ybSkge1xuICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICAgIHNsaWRlWzBdLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgICAgICAgIHNsaWRlU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKVxuICAgICAgICAgICAgPyBzbGlkZS5vdXRlcldpZHRoKHRydWUpXG4gICAgICAgICAgICA6IHNsaWRlLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHBhcnNlRmxvYXQoc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSk7XG4gICAgICAgICAgICB2YXIgcGFkZGluZ0xlZnQgPSBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctbGVmdCcpKTtcbiAgICAgICAgICAgIHZhciBwYWRkaW5nUmlnaHQgPSBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctcmlnaHQnKSk7XG4gICAgICAgICAgICB2YXIgbWFyZ2luTGVmdCA9IHBhcnNlRmxvYXQoc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSk7XG4gICAgICAgICAgICB2YXIgbWFyZ2luUmlnaHQgPSBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1yaWdodCcpKTtcbiAgICAgICAgICAgIHZhciBib3hTaXppbmcgPSBzbGlkZVN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJyk7XG4gICAgICAgICAgICBpZiAoYm94U2l6aW5nICYmIGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XG4gICAgICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2xpZGVTaXplID0gd2lkdGggKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGhlaWdodCA9IHBhcnNlRmxvYXQoc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JykpO1xuICAgICAgICAgICAgdmFyIHBhZGRpbmdUb3AgPSBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctdG9wJykpO1xuICAgICAgICAgICAgdmFyIHBhZGRpbmdCb3R0b20gPSBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ3BhZGRpbmctYm90dG9tJykpO1xuICAgICAgICAgICAgdmFyIG1hcmdpblRvcCA9IHBhcnNlRmxvYXQoc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKTtcbiAgICAgICAgICAgIHZhciBtYXJnaW5Cb3R0b20gPSBwYXJzZUZsb2F0KHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSk7XG4gICAgICAgICAgICB2YXIgYm94U2l6aW5nJDEgPSBzbGlkZVN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJyk7XG4gICAgICAgICAgICBpZiAoYm94U2l6aW5nJDEgJiYgYm94U2l6aW5nJDEgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICAgICAgICBzbGlkZVNpemUgPSBoZWlnaHQgKyBtYXJnaW5Ub3AgKyBtYXJnaW5Cb3R0b207XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzbGlkZVNpemUgPSBoZWlnaHQgKyBwYWRkaW5nVG9wICsgcGFkZGluZ0JvdHRvbSArIG1hcmdpblRvcCArIG1hcmdpbkJvdHRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgICBzbGlkZVswXS5zdHlsZS50cmFuc2Zvcm0gPSBjdXJyZW50VHJhbnNmb3JtO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50V2ViS2l0VHJhbnNmb3JtKSB7XG4gICAgICAgICAgc2xpZGVbMF0uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gY3VycmVudFdlYktpdFRyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3RocykgeyBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7IH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlU2l6ZSA9IChzd2lwZXJTaXplIC0gKChwYXJhbXMuc2xpZGVzUGVyVmlldyAtIDEpICogc3BhY2VCZXR3ZWVuKSkgLyBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHsgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpOyB9XG5cbiAgICAgICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgICAgIHNsaWRlc1tpXS5zdHlsZS53aWR0aCA9IHNsaWRlU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpZGVzW2ldLnN0eWxlLmhlaWdodCA9IHNsaWRlU2l6ZSArIFwicHhcIjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICAgIH1cbiAgICAgIHNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG5cblxuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIChzbGlkZVNpemUgLyAyKSArIChwcmV2U2xpZGVTaXplIC8gMikgKyBzcGFjZUJldHdlZW47XG4gICAgICAgIGlmIChwcmV2U2xpZGVTaXplID09PSAwICYmIGkgIT09IDApIHsgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSAoc3dpcGVyU2l6ZSAvIDIpIC0gc3BhY2VCZXR3ZWVuOyB9XG4gICAgICAgIGlmIChpID09PSAwKSB7IHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gKHN3aXBlclNpemUgLyAyKSAtIHNwYWNlQmV0d2VlbjsgfVxuICAgICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMTAwMCkgeyBzbGlkZVBvc2l0aW9uID0gMDsgfVxuICAgICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3RocykgeyBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTsgfVxuICAgICAgICBpZiAoKGluZGV4KSAlIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgeyBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pOyB9XG4gICAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7IHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pOyB9XG4gICAgICAgIGlmICgoaW5kZXgpICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSB7IHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7IH1cbiAgICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcblxuICAgICAgcHJldlNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcblxuICAgICAgaW5kZXggKz0gMTtcbiAgICB9XG4gICAgc3dpcGVyLnZpcnR1YWxTaXplID0gTWF0aC5tYXgoc3dpcGVyLnZpcnR1YWxTaXplLCBzd2lwZXJTaXplKSArIG9mZnNldEFmdGVyO1xuICAgIHZhciBuZXdTbGlkZXNHcmlkO1xuXG4gICAgaWYgKFxuICAgICAgcnRsICYmIHdyb25nUlRMICYmIChwYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHBhcmFtcy5lZmZlY3QgPT09ICdjb3ZlcmZsb3cnKSkge1xuICAgICAgJHdyYXBwZXJFbC5jc3MoeyB3aWR0aDogKChzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikgfSk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuc2V0V3JhcHBlclNpemUpIHtcbiAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHsgJHdyYXBwZXJFbC5jc3MoeyB3aWR0aDogKChzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikgfSk7IH1cbiAgICAgIGVsc2UgeyAkd3JhcHBlckVsLmNzcyh7IGhlaWdodDogKChzd2lwZXIudmlydHVhbFNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSArIFwicHhcIikgfSk7IH1cbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDEpIHtcbiAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSA9IChzbGlkZVNpemUgKyBwYXJhbXMuc3BhY2VCZXR3ZWVuKSAqIHNsaWRlc051bWJlckV2ZW5Ub1Jvd3M7XG4gICAgICBzd2lwZXIudmlydHVhbFNpemUgPSBNYXRoLmNlaWwoc3dpcGVyLnZpcnR1YWxTaXplIC8gcGFyYW1zLnNsaWRlc1BlckNvbHVtbikgLSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkgeyAkd3JhcHBlckVsLmNzcyh7IHdpZHRoOiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTsgfVxuICAgICAgZWxzZSB7ICR3cmFwcGVyRWwuY3NzKHsgaGVpZ2h0OiAoKHN3aXBlci52aXJ0dWFsU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pICsgXCJweFwiKSB9KTsgfVxuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBuZXdTbGlkZXNHcmlkID0gW107XG4gICAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHNuYXBHcmlkLmxlbmd0aDsgaSQxICs9IDEpIHtcbiAgICAgICAgICB2YXIgc2xpZGVzR3JpZEl0ZW0gPSBzbmFwR3JpZFtpJDFdO1xuICAgICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7IHNsaWRlc0dyaWRJdGVtID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkSXRlbSk7IH1cbiAgICAgICAgICBpZiAoc25hcEdyaWRbaSQxXSA8IHN3aXBlci52aXJ0dWFsU2l6ZSArIHNuYXBHcmlkWzBdKSB7IG5ld1NsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkSXRlbSk7IH1cbiAgICAgICAgfVxuICAgICAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGxhc3QgZ3JpZCBlbGVtZW50cyBkZXBlbmRpbmcgb24gd2lkdGhcbiAgICBpZiAoIXBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSQyID0gMDsgaSQyIDwgc25hcEdyaWQubGVuZ3RoOyBpJDIgKz0gMSkge1xuICAgICAgICB2YXIgc2xpZGVzR3JpZEl0ZW0kMSA9IHNuYXBHcmlkW2kkMl07XG4gICAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7IHNsaWRlc0dyaWRJdGVtJDEgPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRJdGVtJDEpOyB9XG4gICAgICAgIGlmIChzbmFwR3JpZFtpJDJdIDw9IHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIHtcbiAgICAgICAgICBuZXdTbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZEl0ZW0kMSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNuYXBHcmlkID0gbmV3U2xpZGVzR3JpZDtcbiAgICAgIGlmIChNYXRoLmZsb29yKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIC0gTWF0aC5mbG9vcihzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XG4gICAgICAgIHNuYXBHcmlkLnB1c2goc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzbmFwR3JpZC5sZW5ndGggPT09IDApIHsgc25hcEdyaWQgPSBbMF07IH1cblxuICAgIGlmIChwYXJhbXMuc3BhY2VCZXR3ZWVuICE9PSAwKSB7XG4gICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIGlmIChydGwpIHsgc2xpZGVzLmZpbHRlcihzbGlkZXNGb3JNYXJnaW4pLmNzcyh7IG1hcmdpbkxlZnQ6IChzcGFjZUJldHdlZW4gKyBcInB4XCIpIH0pOyB9XG4gICAgICAgIGVsc2UgeyBzbGlkZXMuZmlsdGVyKHNsaWRlc0Zvck1hcmdpbikuY3NzKHsgbWFyZ2luUmlnaHQ6IChzcGFjZUJldHdlZW4gKyBcInB4XCIpIH0pOyB9XG4gICAgICB9IGVsc2UgeyBzbGlkZXMuZmlsdGVyKHNsaWRlc0Zvck1hcmdpbikuY3NzKHsgbWFyZ2luQm90dG9tOiAoc3BhY2VCZXR3ZWVuICsgXCJweFwiKSB9KTsgfVxuICAgIH1cblxuICAgIGlmIChwYXJhbXMuY2VudGVySW5zdWZmaWNpZW50U2xpZGVzKSB7XG4gICAgICB2YXIgYWxsU2xpZGVzU2l6ZSA9IDA7XG4gICAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaChmdW5jdGlvbiAoc2xpZGVTaXplVmFsdWUpIHtcbiAgICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChwYXJhbXMuc3BhY2VCZXR3ZWVuID8gcGFyYW1zLnNwYWNlQmV0d2VlbiA6IDApO1xuICAgICAgfSk7XG4gICAgICBhbGxTbGlkZXNTaXplIC09IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gICAgICBpZiAoYWxsU2xpZGVzU2l6ZSA8IHN3aXBlclNpemUpIHtcbiAgICAgICAgdmFyIGFsbFNsaWRlc09mZnNldCA9IChzd2lwZXJTaXplIC0gYWxsU2xpZGVzU2l6ZSkgLyAyO1xuICAgICAgICBzbmFwR3JpZC5mb3JFYWNoKGZ1bmN0aW9uIChzbmFwLCBzbmFwSW5kZXgpIHtcbiAgICAgICAgICBzbmFwR3JpZFtzbmFwSW5kZXhdID0gc25hcCAtIGFsbFNsaWRlc09mZnNldDtcbiAgICAgICAgfSk7XG4gICAgICAgIHNsaWRlc0dyaWQuZm9yRWFjaChmdW5jdGlvbiAoc25hcCwgc25hcEluZGV4KSB7XG4gICAgICAgICAgc2xpZGVzR3JpZFtzbmFwSW5kZXhdID0gc25hcCArIGFsbFNsaWRlc09mZnNldDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgc2xpZGVzOiBzbGlkZXMsXG4gICAgICBzbmFwR3JpZDogc25hcEdyaWQsXG4gICAgICBzbGlkZXNHcmlkOiBzbGlkZXNHcmlkLFxuICAgICAgc2xpZGVzU2l6ZXNHcmlkOiBzbGlkZXNTaXplc0dyaWQsXG4gICAgfSk7XG5cbiAgICBpZiAoc2xpZGVzTGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0xlbmd0aCkge1xuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlc0xlbmd0aENoYW5nZScpO1xuICAgIH1cbiAgICBpZiAoc25hcEdyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoKSB7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSB7IHN3aXBlci5jaGVja092ZXJmbG93KCk7IH1cbiAgICAgIHN3aXBlci5lbWl0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpO1xuICAgIH1cbiAgICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZUF1dG9IZWlnaHQgKHNwZWVkKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIGFjdGl2ZVNsaWRlcyA9IFtdO1xuICAgIHZhciBuZXdIZWlnaHQgPSAwO1xuICAgIHZhciBpO1xuICAgIGlmICh0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInKSB7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gICAgfSBlbHNlIGlmIChzcGVlZCA9PT0gdHJ1ZSkge1xuICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XG4gICAgfVxuICAgIC8vIEZpbmQgc2xpZGVzIGN1cnJlbnRseSBpbiB2aWV3XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nICYmIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTsgaSArPSAxKSB7XG4gICAgICAgIHZhciBpbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCArIGk7XG4gICAgICAgIGlmIChpbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoKSB7IGJyZWFrOyB9XG4gICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpWzBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlU2xpZGVzLnB1c2goc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpWzBdKTtcbiAgICB9XG5cbiAgICAvLyBGaW5kIG5ldyBoZWlnaHQgZnJvbSBoaWdoZXN0IHNsaWRlIGluIHZpZXdcbiAgICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9IGFjdGl2ZVNsaWRlc1tpXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgSGVpZ2h0XG4gICAgaWYgKG5ld0hlaWdodCkgeyBzd2lwZXIuJHdyYXBwZXJFbC5jc3MoJ2hlaWdodCcsIChuZXdIZWlnaHQgKyBcInB4XCIpKTsgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlU2xpZGVzT2Zmc2V0ICgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlT2Zmc2V0ID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gc2xpZGVzW2ldLm9mZnNldExlZnQgOiBzbGlkZXNbaV0ub2Zmc2V0VG9wO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlc1Byb2dyZXNzICh0cmFuc2xhdGUpIHtcbiAgICBpZiAoIHRyYW5zbGF0ZSA9PT0gdm9pZCAwICkgdHJhbnNsYXRlID0gKHRoaXMgJiYgdGhpcy50cmFuc2xhdGUpIHx8IDA7XG5cbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcblxuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuXG4gICAgaWYgKHNsaWRlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgaWYgKHR5cGVvZiBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQgPT09ICd1bmRlZmluZWQnKSB7IHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTsgfVxuXG4gICAgdmFyIG9mZnNldENlbnRlciA9IC10cmFuc2xhdGU7XG4gICAgaWYgKHJ0bCkgeyBvZmZzZXRDZW50ZXIgPSB0cmFuc2xhdGU7IH1cblxuICAgIC8vIFZpc2libGUgU2xpZGVzXG4gICAgc2xpZGVzLnJlbW92ZUNsYXNzKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG5cbiAgICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgICBzd2lwZXIudmlzaWJsZVNsaWRlcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIHZhciBzbGlkZSA9IHNsaWRlc1tpXTtcbiAgICAgIHZhciBzbGlkZVByb2dyZXNzID0gKFxuICAgICAgICAob2Zmc2V0Q2VudGVyICsgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IDApKSAtIHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0XG4gICAgICApIC8gKHNsaWRlLnN3aXBlclNsaWRlU2l6ZSArIHBhcmFtcy5zcGFjZUJldHdlZW4pO1xuICAgICAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgICAgdmFyIHNsaWRlQmVmb3JlID0gLShvZmZzZXRDZW50ZXIgLSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldCk7XG4gICAgICAgIHZhciBzbGlkZUFmdGVyID0gc2xpZGVCZWZvcmUgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgICAgICB2YXIgaXNWaXNpYmxlID0gKHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPCBzd2lwZXIuc2l6ZSAtIDEpXG4gICAgICAgICAgICAgICAgICB8fCAoc2xpZGVBZnRlciA+IDEgJiYgc2xpZGVBZnRlciA8PSBzd2lwZXIuc2l6ZSlcbiAgICAgICAgICAgICAgICAgIHx8IChzbGlkZUJlZm9yZSA8PSAwICYmIHNsaWRlQWZ0ZXIgPj0gc3dpcGVyLnNpemUpO1xuICAgICAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXMucHVzaChzbGlkZSk7XG4gICAgICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgICAgICAgc2xpZGVzLmVxKGkpLmFkZENsYXNzKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHNsaWRlLnByb2dyZXNzID0gcnRsID8gLXNsaWRlUHJvZ3Jlc3MgOiBzbGlkZVByb2dyZXNzO1xuICAgIH1cbiAgICBzd2lwZXIudmlzaWJsZVNsaWRlcyA9ICQoc3dpcGVyLnZpc2libGVTbGlkZXMpO1xuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3MgKHRyYW5zbGF0ZSkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICh0eXBlb2YgdHJhbnNsYXRlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdmFyIG11bHRpcGxpZXIgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gLTEgOiAxO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICB0cmFuc2xhdGUgPSAoc3dpcGVyICYmIHN3aXBlci50cmFuc2xhdGUgJiYgKHN3aXBlci50cmFuc2xhdGUgKiBtdWx0aXBsaWVyKSkgfHwgMDtcbiAgICB9XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgIHZhciBwcm9ncmVzcyA9IHN3aXBlci5wcm9ncmVzcztcbiAgICB2YXIgaXNCZWdpbm5pbmcgPSBzd2lwZXIuaXNCZWdpbm5pbmc7XG4gICAgdmFyIGlzRW5kID0gc3dpcGVyLmlzRW5kO1xuICAgIHZhciB3YXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZztcbiAgICB2YXIgd2FzRW5kID0gaXNFbmQ7XG4gICAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgICBwcm9ncmVzcyA9IDA7XG4gICAgICBpc0JlZ2lubmluZyA9IHRydWU7XG4gICAgICBpc0VuZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xuICAgICAgaXNCZWdpbm5pbmcgPSBwcm9ncmVzcyA8PSAwO1xuICAgICAgaXNFbmQgPSBwcm9ncmVzcyA+PSAxO1xuICAgIH1cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBwcm9ncmVzczogcHJvZ3Jlc3MsXG4gICAgICBpc0JlZ2lubmluZzogaXNCZWdpbm5pbmcsXG4gICAgICBpc0VuZDogaXNFbmQsXG4gICAgfSk7XG5cbiAgICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkgeyBzd2lwZXIudXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKTsgfVxuXG4gICAgaWYgKGlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdyZWFjaEJlZ2lubmluZyB0b0VkZ2UnKTtcbiAgICB9XG4gICAgaWYgKGlzRW5kICYmICF3YXNFbmQpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdyZWFjaEVuZCB0b0VkZ2UnKTtcbiAgICB9XG4gICAgaWYgKCh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nKSB8fCAod2FzRW5kICYmICFpc0VuZCkpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdmcm9tRWRnZScpO1xuICAgIH1cblxuICAgIHN3aXBlci5lbWl0KCdwcm9ncmVzcycsIHByb2dyZXNzKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNsaWRlc0NsYXNzZXMgKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgdmFyIHJlYWxJbmRleCA9IHN3aXBlci5yZWFsSW5kZXg7XG4gICAgdmFyIGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG5cbiAgICBzbGlkZXMucmVtb3ZlQ2xhc3MoKChwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykgKyBcIiBcIiArIChwYXJhbXMuc2xpZGVOZXh0Q2xhc3MpICsgXCIgXCIgKyAocGFyYW1zLnNsaWRlUHJldkNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUFjdGl2ZUNsYXNzKSArIFwiIFwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcykgKyBcIiBcIiArIChwYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpKSk7XG5cbiAgICB2YXIgYWN0aXZlU2xpZGU7XG4gICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgYWN0aXZlU2xpZGUgPSBzd2lwZXIuJHdyYXBwZXJFbC5maW5kKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBhY3RpdmVJbmRleCArIFwiXFxcIl1cIikpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5lcShhY3RpdmVJbmRleCk7XG4gICAgfVxuXG4gICAgLy8gQWN0aXZlIGNsYXNzZXNcbiAgICBhY3RpdmVTbGlkZS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyk7XG5cbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgICAgaWYgKGFjdGl2ZVNsaWRlLmhhc0NsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAkd3JhcHBlckVsXG4gICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIjpub3QoLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdXCIpKVxuICAgICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkd3JhcHBlckVsXG4gICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIi5cIiArIChwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdXCIpKVxuICAgICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE5leHQgU2xpZGVcbiAgICB2YXIgbmV4dFNsaWRlID0gYWN0aXZlU2xpZGUubmV4dEFsbCgoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICBpZiAocGFyYW1zLmxvb3AgJiYgbmV4dFNsaWRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgbmV4dFNsaWRlID0gc2xpZGVzLmVxKDApO1xuICAgICAgbmV4dFNsaWRlLmFkZENsYXNzKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgfVxuICAgIC8vIFByZXYgU2xpZGVcbiAgICB2YXIgcHJldlNsaWRlID0gYWN0aXZlU2xpZGUucHJldkFsbCgoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSkuZXEoMCkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICBpZiAocGFyYW1zLmxvb3AgJiYgcHJldlNsaWRlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcHJldlNsaWRlID0gc2xpZGVzLmVxKC0xKTtcbiAgICAgIHByZXZTbGlkZS5hZGRDbGFzcyhwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIC8vIER1cGxpY2F0ZSB0byBhbGwgbG9vcGVkIHNsaWRlc1xuICAgICAgaWYgKG5leHRTbGlkZS5oYXNDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCI6bm90KC5cIiArIChwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykgKyBcIilbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgKG5leHRTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSArIFwiXFxcIl1cIikpXG4gICAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZU5leHRDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkd3JhcHBlckVsXG4gICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIi5cIiArIChwYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyAobmV4dFNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykpICsgXCJcXFwiXVwiKSlcbiAgICAgICAgICAuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlTmV4dENsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2U2xpZGUuaGFzQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICR3cmFwcGVyRWxcbiAgICAgICAgICAuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIChwcmV2U2xpZGUuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSkgKyBcIlxcXCJdXCIpKVxuICAgICAgICAgIC5hZGRDbGFzcyhwYXJhbXMuc2xpZGVEdXBsaWNhdGVQcmV2Q2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHdyYXBwZXJFbFxuICAgICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCIuXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgKHByZXZTbGlkZS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpKSArIFwiXFxcIl1cIikpXG4gICAgICAgICAgLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZVByZXZDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gdXBkYXRlQWN0aXZlSW5kZXggKG5ld0FjdGl2ZUluZGV4KSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gICAgdmFyIHNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZDtcbiAgICB2YXIgc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQ7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgdmFyIHByZXZpb3VzUmVhbEluZGV4ID0gc3dpcGVyLnJlYWxJbmRleDtcbiAgICB2YXIgcHJldmlvdXNTbmFwSW5kZXggPSBzd2lwZXIuc25hcEluZGV4O1xuICAgIHZhciBhY3RpdmVJbmRleCA9IG5ld0FjdGl2ZUluZGV4O1xuICAgIHZhciBzbmFwSW5kZXg7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSAtICgoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpKSB7XG4gICAgICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSkge1xuICAgICAgICAgICAgYWN0aXZlSW5kZXggPSBpICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gICAgICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcbiAgICAgICAgaWYgKGFjdGl2ZUluZGV4IDwgMCB8fCB0eXBlb2YgYWN0aXZlSW5kZXggPT09ICd1bmRlZmluZWQnKSB7IGFjdGl2ZUluZGV4ID0gMDsgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUpID49IDApIHtcbiAgICAgIHNuYXBJbmRleCA9IHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc25hcEluZGV4ID0gTWF0aC5mbG9vcihhY3RpdmVJbmRleCAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgfVxuICAgIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSB7IHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7IH1cbiAgICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICAgIGlmIChzbmFwSW5kZXggIT09IHByZXZpb3VzU25hcEluZGV4KSB7XG4gICAgICAgIHN3aXBlci5zbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICAgIHN3aXBlci5lbWl0KCdzbmFwSW5kZXhDaGFuZ2UnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBHZXQgcmVhbCBpbmRleFxuICAgIHZhciByZWFsSW5kZXggPSBwYXJzZUludChzd2lwZXIuc2xpZGVzLmVxKGFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpIHx8IGFjdGl2ZUluZGV4LCAxMCk7XG5cbiAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICBzbmFwSW5kZXg6IHNuYXBJbmRleCxcbiAgICAgIHJlYWxJbmRleDogcmVhbEluZGV4LFxuICAgICAgcHJldmlvdXNJbmRleDogcHJldmlvdXNJbmRleCxcbiAgICAgIGFjdGl2ZUluZGV4OiBhY3RpdmVJbmRleCxcbiAgICB9KTtcbiAgICBzd2lwZXIuZW1pdCgnYWN0aXZlSW5kZXhDaGFuZ2UnKTtcbiAgICBzd2lwZXIuZW1pdCgnc25hcEluZGV4Q2hhbmdlJyk7XG4gICAgaWYgKHByZXZpb3VzUmVhbEluZGV4ICE9PSByZWFsSW5kZXgpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdyZWFsSW5kZXhDaGFuZ2UnKTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCB8fCBzd2lwZXIucnVuQ2FsbGJhY2tzT25Jbml0KSB7XG4gICAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2UnKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVDbGlja2VkU2xpZGUgKGUpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgc2xpZGUgPSAkKGUudGFyZ2V0KS5jbG9zZXN0KChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykpKVswXTtcbiAgICB2YXIgc2xpZGVGb3VuZCA9IGZhbHNlO1xuICAgIGlmIChzbGlkZSkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2ldID09PSBzbGlkZSkgeyBzbGlkZUZvdW5kID0gdHJ1ZTsgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzbGlkZSAmJiBzbGlkZUZvdW5kKSB7XG4gICAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gc2xpZGU7XG4gICAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHBhcnNlSW50KCQoc2xpZGUpLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSAkKHNsaWRlKS5pbmRleCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gdW5kZWZpbmVkO1xuICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHVuZGVmaW5lZDtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zbGlkZVRvQ2xpY2tlZFNsaWRlICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHVuZGVmaW5lZCAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvQ2xpY2tlZFNsaWRlKCk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHVwZGF0ZSA9IHtcbiAgICB1cGRhdGVTaXplOiB1cGRhdGVTaXplLFxuICAgIHVwZGF0ZVNsaWRlczogdXBkYXRlU2xpZGVzLFxuICAgIHVwZGF0ZUF1dG9IZWlnaHQ6IHVwZGF0ZUF1dG9IZWlnaHQsXG4gICAgdXBkYXRlU2xpZGVzT2Zmc2V0OiB1cGRhdGVTbGlkZXNPZmZzZXQsXG4gICAgdXBkYXRlU2xpZGVzUHJvZ3Jlc3M6IHVwZGF0ZVNsaWRlc1Byb2dyZXNzLFxuICAgIHVwZGF0ZVByb2dyZXNzOiB1cGRhdGVQcm9ncmVzcyxcbiAgICB1cGRhdGVTbGlkZXNDbGFzc2VzOiB1cGRhdGVTbGlkZXNDbGFzc2VzLFxuICAgIHVwZGF0ZUFjdGl2ZUluZGV4OiB1cGRhdGVBY3RpdmVJbmRleCxcbiAgICB1cGRhdGVDbGlja2VkU2xpZGU6IHVwZGF0ZUNsaWNrZWRTbGlkZSxcbiAgfTtcblxuICBmdW5jdGlvbiBnZXRUcmFuc2xhdGUgKGF4aXMpIHtcbiAgICBpZiAoIGF4aXMgPT09IHZvaWQgMCApIGF4aXMgPSB0aGlzLmlzSG9yaXpvbnRhbCgpID8gJ3gnIDogJ3knO1xuXG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG5cbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcbiAgICB2YXIgdHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuXG4gICAgaWYgKHBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgICByZXR1cm4gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRlO1xuICAgIH1cblxuICAgIHZhciBjdXJyZW50VHJhbnNsYXRlID0gVXRpbHMuZ2V0VHJhbnNsYXRlKCR3cmFwcGVyRWxbMF0sIGF4aXMpO1xuICAgIGlmIChydGwpIHsgY3VycmVudFRyYW5zbGF0ZSA9IC1jdXJyZW50VHJhbnNsYXRlOyB9XG5cbiAgICByZXR1cm4gY3VycmVudFRyYW5zbGF0ZSB8fCAwO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlICh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcikge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgdmFyIHdyYXBwZXJFbCA9IHN3aXBlci53cmFwcGVyRWw7XG4gICAgdmFyIHByb2dyZXNzID0gc3dpcGVyLnByb2dyZXNzO1xuICAgIHZhciB4ID0gMDtcbiAgICB2YXIgeSA9IDA7XG4gICAgdmFyIHogPSAwO1xuXG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgeCA9IHJ0bCA/IC10cmFuc2xhdGUgOiB0cmFuc2xhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHkgPSB0cmFuc2xhdGU7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICB3cmFwcGVyRWxbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3Njcm9sbExlZnQnIDogJ3Njcm9sbFRvcCddID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gLXggOiAteTtcbiAgICB9IGVsc2UgaWYgKCFwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgICAgJHdyYXBwZXJFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCJweCwgXCIgKyB5ICsgXCJweCwgXCIgKyB6ICsgXCJweClcIikpO1xuICAgIH1cbiAgICBzd2lwZXIucHJldmlvdXNUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgIHN3aXBlci50cmFuc2xhdGUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB4IDogeTtcblxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gdXBkYXRlIHByb2dyZXNzXG4gICAgdmFyIG5ld1Byb2dyZXNzO1xuICAgIHZhciB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvICh0cmFuc2xhdGVzRGlmZik7XG4gICAgfVxuICAgIGlmIChuZXdQcm9ncmVzcyAhPT0gcHJvZ3Jlc3MpIHtcbiAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICAgIH1cblxuICAgIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xuICB9XG5cbiAgZnVuY3Rpb24gbWluVHJhbnNsYXRlICgpIHtcbiAgICByZXR1cm4gKC10aGlzLnNuYXBHcmlkWzBdKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIG1heFRyYW5zbGF0ZSAoKSB7XG4gICAgcmV0dXJuICgtdGhpcy5zbmFwR3JpZFt0aGlzLnNuYXBHcmlkLmxlbmd0aCAtIDFdKTtcbiAgfVxuXG4gIHZhciB0cmFuc2xhdGUgPSB7XG4gICAgZ2V0VHJhbnNsYXRlOiBnZXRUcmFuc2xhdGUsXG4gICAgc2V0VHJhbnNsYXRlOiBzZXRUcmFuc2xhdGUsXG4gICAgbWluVHJhbnNsYXRlOiBtaW5UcmFuc2xhdGUsXG4gICAgbWF4VHJhbnNsYXRlOiBtYXhUcmFuc2xhdGUsXG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbiAoZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHN3aXBlci4kd3JhcHBlckVsLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH1cblxuICAgIHN3aXBlci5lbWl0KCdzZXRUcmFuc2l0aW9uJywgZHVyYXRpb24sIGJ5Q29udHJvbGxlcik7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2l0aW9uU3RhcnQgKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XG4gICAgaWYgKCBydW5DYWxsYmFja3MgPT09IHZvaWQgMCApIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG5cbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleDtcbiAgICBpZiAocGFyYW1zLmNzc01vZGUpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgIH1cblxuICAgIHZhciBkaXIgPSBkaXJlY3Rpb247XG4gICAgaWYgKCFkaXIpIHtcbiAgICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIHsgZGlyID0gJ25leHQnOyB9XG4gICAgICBlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIHsgZGlyID0gJ3ByZXYnOyB9XG4gICAgICBlbHNlIHsgZGlyID0gJ3Jlc2V0JzsgfVxuICAgIH1cblxuICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uU3RhcnQnKTtcblxuICAgIGlmIChydW5DYWxsYmFja3MgJiYgYWN0aXZlSW5kZXggIT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICAgIGlmIChkaXIgPT09ICdyZXNldCcpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlUmVzZXRUcmFuc2l0aW9uU3RhcnQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvblN0YXJ0Jyk7XG4gICAgICBpZiAoZGlyID09PSAnbmV4dCcpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlTmV4dFRyYW5zaXRpb25TdGFydCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlUHJldlRyYW5zaXRpb25TdGFydCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQkMSAocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcbiAgICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICB2YXIgcHJldmlvdXNJbmRleCA9IHN3aXBlci5wcmV2aW91c0luZGV4O1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICBpZiAocGFyYW1zLmNzc01vZGUpIHsgcmV0dXJuOyB9XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG5cbiAgICB2YXIgZGlyID0gZGlyZWN0aW9uO1xuICAgIGlmICghZGlyKSB7XG4gICAgICBpZiAoYWN0aXZlSW5kZXggPiBwcmV2aW91c0luZGV4KSB7IGRpciA9ICduZXh0JzsgfVxuICAgICAgZWxzZSBpZiAoYWN0aXZlSW5kZXggPCBwcmV2aW91c0luZGV4KSB7IGRpciA9ICdwcmV2JzsgfVxuICAgICAgZWxzZSB7IGRpciA9ICdyZXNldCc7IH1cbiAgICB9XG5cbiAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvbkVuZCcpO1xuXG4gICAgaWYgKHJ1bkNhbGxiYWNrcyAmJiBhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xuICAgICAgaWYgKGRpciA9PT0gJ3Jlc2V0Jykge1xuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVSZXNldFRyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlQ2hhbmdlVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgaWYgKGRpciA9PT0gJ25leHQnKSB7XG4gICAgICAgIHN3aXBlci5lbWl0KCdzbGlkZU5leHRUcmFuc2l0aW9uRW5kJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuZW1pdCgnc2xpZGVQcmV2VHJhbnNpdGlvbkVuZCcpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciB0cmFuc2l0aW9uJDEgPSB7XG4gICAgc2V0VHJhbnNpdGlvbjogc2V0VHJhbnNpdGlvbixcbiAgICB0cmFuc2l0aW9uU3RhcnQ6IHRyYW5zaXRpb25TdGFydCxcbiAgICB0cmFuc2l0aW9uRW5kOiB0cmFuc2l0aW9uRW5kJDEsXG4gIH07XG5cbiAgZnVuY3Rpb24gc2xpZGVUbyAoaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgdmFyIG9iajtcblxuICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gMDtcbiAgICBpZiAoIHNwZWVkID09PSB2b2lkIDAgKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgIGlmICggcnVuQ2FsbGJhY2tzID09PSB2b2lkIDAgKSBydW5DYWxsYmFja3MgPSB0cnVlO1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBzbGlkZUluZGV4ID0gaW5kZXg7XG4gICAgaWYgKHNsaWRlSW5kZXggPCAwKSB7IHNsaWRlSW5kZXggPSAwOyB9XG5cbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQ7XG4gICAgdmFyIHNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZDtcbiAgICB2YXIgcHJldmlvdXNJbmRleCA9IHN3aXBlci5wcmV2aW91c0luZGV4O1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcbiAgICB2YXIgd3JhcHBlckVsID0gc3dpcGVyLndyYXBwZXJFbDtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHNuYXBJbmRleCA9IE1hdGguZmxvb3Ioc2xpZGVJbmRleCAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHsgc25hcEluZGV4ID0gc25hcEdyaWQubGVuZ3RoIC0gMTsgfVxuXG4gICAgaWYgKChhY3RpdmVJbmRleCB8fCBwYXJhbXMuaW5pdGlhbFNsaWRlIHx8IDApID09PSAocHJldmlvdXNJbmRleCB8fCAwKSAmJiBydW5DYWxsYmFja3MpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jyk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zbGF0ZSA9IC1zbmFwR3JpZFtzbmFwSW5kZXhdO1xuXG4gICAgLy8gVXBkYXRlIHByb2dyZXNzXG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7XG5cbiAgICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuICAgIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmICgtTWF0aC5mbG9vcih0cmFuc2xhdGUgKiAxMDApID49IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCkpIHtcbiAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCAmJiBzbGlkZUluZGV4ICE9PSBhY3RpdmVJbmRleCkge1xuICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgdHJhbnNsYXRlIDwgc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPCBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgdHJhbnNsYXRlID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgaWYgKChhY3RpdmVJbmRleCB8fCAwKSAhPT0gc2xpZGVJbmRleCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgZGlyZWN0aW9uO1xuICAgIGlmIChzbGlkZUluZGV4ID4gYWN0aXZlSW5kZXgpIHsgZGlyZWN0aW9uID0gJ25leHQnOyB9XG4gICAgZWxzZSBpZiAoc2xpZGVJbmRleCA8IGFjdGl2ZUluZGV4KSB7IGRpcmVjdGlvbiA9ICdwcmV2JzsgfVxuICAgIGVsc2UgeyBkaXJlY3Rpb24gPSAncmVzZXQnOyB9XG5cblxuICAgIC8vIFVwZGF0ZSBJbmRleFxuICAgIGlmICgocnRsICYmIC10cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUpIHx8ICghcnRsICYmIHRyYW5zbGF0ZSA9PT0gc3dpcGVyLnRyYW5zbGF0ZSkpIHtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcbiAgICAgIC8vIFVwZGF0ZSBIZWlnaHRcbiAgICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgfVxuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmIChwYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnKSB7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICAgIH1cbiAgICAgIGlmIChkaXJlY3Rpb24gIT09ICdyZXNldCcpIHtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICB2YXIgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICAgIHdyYXBwZXJFbFtpc0ggPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSAtdHJhbnNsYXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGlmICh3cmFwcGVyRWwuc2Nyb2xsVG8pIHtcbiAgICAgICAgICB3cmFwcGVyRWwuc2Nyb2xsVG8oKCBvYmogPSB7fSwgb2JqW2lzSCA/ICdsZWZ0JyA6ICd0b3AnXSA9IC10cmFuc2xhdGUsIG9iai5iZWhhdmlvciA9ICdzbW9vdGgnLCBvYmogKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd3JhcHBlckVsW2lzSCA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IC10cmFuc2xhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChzcGVlZCA9PT0gMCkge1xuICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICAgIGlmICghc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XG4gICAgICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5yZW1vdmVFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgICAgICBkZWxldGUgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuICAgICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2xpZGVUb0xvb3AgKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICAgIGlmICggaW5kZXggPT09IHZvaWQgMCApIGluZGV4ID0gMDtcbiAgICBpZiAoIHNwZWVkID09PSB2b2lkIDAgKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgIGlmICggcnVuQ2FsbGJhY2tzID09PSB2b2lkIDAgKSBydW5DYWxsYmFja3MgPSB0cnVlO1xuXG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIG5ld0luZGV4ID0gaW5kZXg7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgbmV3SW5kZXggKz0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICB9XG5cbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuXG4gIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuICBmdW5jdGlvbiBzbGlkZU5leHQgKHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgaWYgKCBzcGVlZCA9PT0gdm9pZCAwICkgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciBhbmltYXRpbmcgPSBzd2lwZXIuYW5pbWF0aW5nO1xuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgaWYgKGFuaW1hdGluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci4kd3JhcHBlckVsWzBdLmNsaWVudExlZnQ7XG4gICAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgcGFyYW1zLnNsaWRlc1Blckdyb3VwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgfVxuICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuXG4gIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuICBmdW5jdGlvbiBzbGlkZVByZXYgKHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgaWYgKCBzcGVlZCA9PT0gdm9pZCAwICkgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciBhbmltYXRpbmcgPSBzd2lwZXIuYW5pbWF0aW5nO1xuICAgIHZhciBzbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZDtcbiAgICB2YXIgc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkO1xuICAgIHZhciBydGxUcmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuXG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBpZiAoYW5pbWF0aW5nKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcbiAgICB9XG4gICAgdmFyIHRyYW5zbGF0ZSA9IHJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICBmdW5jdGlvbiBub3JtYWxpemUodmFsKSB7XG4gICAgICBpZiAodmFsIDwgMCkgeyByZXR1cm4gLU1hdGguZmxvb3IoTWF0aC5hYnModmFsKSk7IH1cbiAgICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCk7XG4gICAgfVxuICAgIHZhciBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplKHRyYW5zbGF0ZSk7XG4gICAgdmFyIG5vcm1hbGl6ZWRTbmFwR3JpZCA9IHNuYXBHcmlkLm1hcChmdW5jdGlvbiAodmFsKSB7IHJldHVybiBub3JtYWxpemUodmFsKTsgfSk7XG4gICAgdmFyIG5vcm1hbGl6ZWRTbGlkZXNHcmlkID0gc2xpZGVzR3JpZC5tYXAoZnVuY3Rpb24gKHZhbCkgeyByZXR1cm4gbm9ybWFsaXplKHZhbCk7IH0pO1xuXG4gICAgdmFyIGN1cnJlbnRTbmFwID0gc25hcEdyaWRbbm9ybWFsaXplZFNuYXBHcmlkLmluZGV4T2Yobm9ybWFsaXplZFRyYW5zbGF0ZSldO1xuICAgIHZhciBwcmV2U25hcCA9IHNuYXBHcmlkW25vcm1hbGl6ZWRTbmFwR3JpZC5pbmRleE9mKG5vcm1hbGl6ZWRUcmFuc2xhdGUpIC0gMV07XG4gICAgaWYgKHR5cGVvZiBwcmV2U25hcCA9PT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHNuYXBHcmlkLmZvckVhY2goZnVuY3Rpb24gKHNuYXApIHtcbiAgICAgICAgaWYgKCFwcmV2U25hcCAmJiBub3JtYWxpemVkVHJhbnNsYXRlID49IHNuYXApIHsgcHJldlNuYXAgPSBzbmFwOyB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIHByZXZJbmRleDtcbiAgICBpZiAodHlwZW9mIHByZXZTbmFwICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJldkluZGV4ID0gc2xpZGVzR3JpZC5pbmRleE9mKHByZXZTbmFwKTtcbiAgICAgIGlmIChwcmV2SW5kZXggPCAwKSB7IHByZXZJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCAtIDE7IH1cbiAgICB9XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHByZXZJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9XG5cbiAgLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG4gIGZ1bmN0aW9uIHNsaWRlUmVzZXQgKHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gICAgaWYgKCBzcGVlZCA9PT0gdm9pZCAwICkgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgICBpZiAoIHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwICkgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcblxuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuXG4gIC8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuICBmdW5jdGlvbiBzbGlkZVRvQ2xvc2VzdCAoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgICBpZiAoIHNwZWVkID09PSB2b2lkIDAgKSBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICAgIGlmICggcnVuQ2FsbGJhY2tzID09PSB2b2lkIDAgKSBydW5DYWxsYmFja3MgPSB0cnVlO1xuXG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgIHZhciBzbmFwSW5kZXggPSBNYXRoLmZsb29yKGluZGV4IC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG5cbiAgICBpZiAoc25hcEluZGV4IDwgc3dpcGVyLnNuYXBHcmlkLmxlbmd0aCAtIDEpIHtcbiAgICAgIHZhciB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuXG4gICAgICB2YXIgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcbiAgICAgIHZhciBuZXh0U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggKyAxXTtcblxuICAgICAgaWYgKCh0cmFuc2xhdGUgLSBjdXJyZW50U25hcCkgPiAobmV4dFNuYXAgLSBjdXJyZW50U25hcCkgLyAyKSB7XG4gICAgICAgIGluZGV4ID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNsaWRlVG9DbGlja2VkU2xpZGUgKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG5cbiAgICB2YXIgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgIHZhciBzbGlkZVRvSW5kZXggPSBzd2lwZXIuY2xpY2tlZEluZGV4O1xuICAgIHZhciByZWFsSW5kZXg7XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykgeyByZXR1cm47IH1cbiAgICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KCQoc3dpcGVyLmNsaWNrZWRTbGlkZSkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKHNsaWRlVG9JbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMgLSAoc2xpZGVzUGVyVmlldyAvIDIpKVxuICAgICAgICAgIHx8IChzbGlkZVRvSW5kZXggPiAoc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzKSArIChzbGlkZXNQZXJWaWV3IC8gMikpXG4gICAgICAgICkge1xuICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgc2xpZGVUb0luZGV4ID0gJHdyYXBwZXJFbFxuICAgICAgICAgICAgLmNoaWxkcmVuKChcIi5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyByZWFsSW5kZXggKyBcIlxcXCJdOm5vdCguXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCIpXCIpKVxuICAgICAgICAgICAgLmVxKDApXG4gICAgICAgICAgICAuaW5kZXgoKTtcblxuICAgICAgICAgIFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgc2xpZGVUb0luZGV4ID0gJHdyYXBwZXJFbFxuICAgICAgICAgIC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgcmVhbEluZGV4ICsgXCJcXFwiXTpub3QoLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVwiKSlcbiAgICAgICAgICAuZXEoMClcbiAgICAgICAgICAuaW5kZXgoKTtcblxuICAgICAgICBVdGlscy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBzbGlkZSA9IHtcbiAgICBzbGlkZVRvOiBzbGlkZVRvLFxuICAgIHNsaWRlVG9Mb29wOiBzbGlkZVRvTG9vcCxcbiAgICBzbGlkZU5leHQ6IHNsaWRlTmV4dCxcbiAgICBzbGlkZVByZXY6IHNsaWRlUHJldixcbiAgICBzbGlkZVJlc2V0OiBzbGlkZVJlc2V0LFxuICAgIHNsaWRlVG9DbG9zZXN0OiBzbGlkZVRvQ2xvc2VzdCxcbiAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBzbGlkZVRvQ2xpY2tlZFNsaWRlLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGxvb3BDcmVhdGUgKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgLy8gUmVtb3ZlIGR1cGxpY2F0ZWQgc2xpZGVzXG4gICAgJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpICsgXCIuXCIgKyAocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSkucmVtb3ZlKCk7XG5cbiAgICB2YXIgc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSk7XG5cbiAgICBpZiAocGFyYW1zLmxvb3BGaWxsR3JvdXBXaXRoQmxhbmspIHtcbiAgICAgIHZhciBibGFua1NsaWRlc051bSA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cCAtIChzbGlkZXMubGVuZ3RoICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGlmIChibGFua1NsaWRlc051bSAhPT0gcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYmxhbmtTbGlkZXNOdW07IGkgKz0gMSkge1xuICAgICAgICAgIHZhciBibGFua05vZGUgPSAkKGRvYy5jcmVhdGVFbGVtZW50KCdkaXYnKSkuYWRkQ2xhc3MoKChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIiBcIiArIChwYXJhbXMuc2xpZGVCbGFua0NsYXNzKSkpO1xuICAgICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKGJsYW5rTm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgIXBhcmFtcy5sb29wZWRTbGlkZXMpIHsgcGFyYW1zLmxvb3BlZFNsaWRlcyA9IHNsaWRlcy5sZW5ndGg7IH1cblxuICAgIHN3aXBlci5sb29wZWRTbGlkZXMgPSBwYXJzZUludChwYXJhbXMubG9vcGVkU2xpZGVzIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCk7XG4gICAgc3dpcGVyLmxvb3BlZFNsaWRlcyArPSBwYXJhbXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG4gICAgaWYgKHN3aXBlci5sb29wZWRTbGlkZXMgPiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICBzd2lwZXIubG9vcGVkU2xpZGVzID0gc2xpZGVzLmxlbmd0aDtcbiAgICB9XG5cbiAgICB2YXIgcHJlcGVuZFNsaWRlcyA9IFtdO1xuICAgIHZhciBhcHBlbmRTbGlkZXMgPSBbXTtcbiAgICBzbGlkZXMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgICB2YXIgc2xpZGUgPSAkKGVsKTtcbiAgICAgIGlmIChpbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMpIHsgYXBwZW5kU2xpZGVzLnB1c2goZWwpOyB9XG4gICAgICBpZiAoaW5kZXggPCBzbGlkZXMubGVuZ3RoICYmIGluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzKSB7IHByZXBlbmRTbGlkZXMucHVzaChlbCk7IH1cbiAgICAgIHNsaWRlLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JywgaW5kZXgpO1xuICAgIH0pO1xuICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IGFwcGVuZFNsaWRlcy5sZW5ndGg7IGkkMSArPSAxKSB7XG4gICAgICAkd3JhcHBlckVsLmFwcGVuZCgkKGFwcGVuZFNsaWRlc1tpJDFdLmNsb25lTm9kZSh0cnVlKSkuYWRkQ2xhc3MocGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSQyID0gcHJlcGVuZFNsaWRlcy5sZW5ndGggLSAxOyBpJDIgPj0gMDsgaSQyIC09IDEpIHtcbiAgICAgICR3cmFwcGVyRWwucHJlcGVuZCgkKHByZXBlbmRTbGlkZXNbaSQyXS5jbG9uZU5vZGUodHJ1ZSkpLmFkZENsYXNzKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gbG9vcEZpeCAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgIHZhciBsb29wZWRTbGlkZXMgPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgIHZhciBhbGxvd1NsaWRlUHJldiA9IHN3aXBlci5hbGxvd1NsaWRlUHJldjtcbiAgICB2YXIgYWxsb3dTbGlkZU5leHQgPSBzd2lwZXIuYWxsb3dTbGlkZU5leHQ7XG4gICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xuICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuICAgIHZhciBuZXdJbmRleDtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG5cbiAgICB2YXIgc25hcFRyYW5zbGF0ZSA9IC1zbmFwR3JpZFthY3RpdmVJbmRleF07XG4gICAgdmFyIGRpZmYgPSBzbmFwVHJhbnNsYXRlIC0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpO1xuXG5cbiAgICAvLyBGaXggRm9yIE5lZ2F0aXZlIE92ZXJzbGlkaW5nXG4gICAgaWYgKGFjdGl2ZUluZGV4IDwgbG9vcGVkU2xpZGVzKSB7XG4gICAgICBuZXdJbmRleCA9IChzbGlkZXMubGVuZ3RoIC0gKGxvb3BlZFNsaWRlcyAqIDMpKSArIGFjdGl2ZUluZGV4O1xuICAgICAgbmV3SW5kZXggKz0gbG9vcGVkU2xpZGVzO1xuICAgICAgdmFyIHNsaWRlQ2hhbmdlZCA9IHN3aXBlci5zbGlkZVRvKG5ld0luZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICBpZiAoc2xpZGVDaGFuZ2VkICYmIGRpZmYgIT09IDApIHtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSgocnRsID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKSAtIGRpZmYpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgYWN0aXZlSW5kZXggPj0gbG9vcGVkU2xpZGVzICogMikgfHwgKGFjdGl2ZUluZGV4ID49IHNsaWRlcy5sZW5ndGggLSBsb29wZWRTbGlkZXMpKSB7XG4gICAgICAvLyBGaXggRm9yIFBvc2l0aXZlIE92ZXJzbGlkaW5nXG4gICAgICBuZXdJbmRleCA9IC1zbGlkZXMubGVuZ3RoICsgYWN0aXZlSW5kZXggKyBsb29wZWRTbGlkZXM7XG4gICAgICBuZXdJbmRleCArPSBsb29wZWRTbGlkZXM7XG4gICAgICB2YXIgc2xpZGVDaGFuZ2VkJDEgPSBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgaWYgKHNsaWRlQ2hhbmdlZCQxICYmIGRpZmYgIT09IDApIHtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSgocnRsID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKSAtIGRpZmYpO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxvb3BEZXN0cm95ICgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSArIFwiLlwiICsgKHBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiLC5cIiArIChwYXJhbXMuc2xpZGVDbGFzcykgKyBcIi5cIiArIChwYXJhbXMuc2xpZGVCbGFua0NsYXNzKSkpLnJlbW92ZSgpO1xuICAgIHNsaWRlcy5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICB9XG5cbiAgdmFyIGxvb3AgPSB7XG4gICAgbG9vcENyZWF0ZTogbG9vcENyZWF0ZSxcbiAgICBsb29wRml4OiBsb29wRml4LFxuICAgIGxvb3BEZXN0cm95OiBsb29wRGVzdHJveSxcbiAgfTtcblxuICBmdW5jdGlvbiBzZXRHcmFiQ3Vyc29yIChtb3ZpbmcpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoU3VwcG9ydC50b3VjaCB8fCAhc3dpcGVyLnBhcmFtcy5zaW11bGF0ZVRvdWNoIHx8IChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkKSB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHsgcmV0dXJuOyB9XG4gICAgdmFyIGVsID0gc3dpcGVyLmVsO1xuICAgIGVsLnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLXdlYmtpdC1ncmFiYmluZycgOiAnLXdlYmtpdC1ncmFiJztcbiAgICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnLW1vei1ncmFiYmluJyA6ICctbW96LWdyYWInO1xuICAgIGVsLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/ICdncmFiYmluZycgOiAnZ3JhYic7XG4gIH1cblxuICBmdW5jdGlvbiB1bnNldEdyYWJDdXJzb3IgKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChTdXBwb3J0LnRvdWNoIHx8IChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkKSB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHsgcmV0dXJuOyB9XG4gICAgc3dpcGVyLmVsLnN0eWxlLmN1cnNvciA9ICcnO1xuICB9XG5cbiAgdmFyIGdyYWJDdXJzb3IgPSB7XG4gICAgc2V0R3JhYkN1cnNvcjogc2V0R3JhYkN1cnNvcixcbiAgICB1bnNldEdyYWJDdXJzb3I6IHVuc2V0R3JhYkN1cnNvcixcbiAgfTtcblxuICBmdW5jdGlvbiBhcHBlbmRTbGlkZSAoc2xpZGVzKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoc2xpZGVzW2ldKSB7ICR3cmFwcGVyRWwuYXBwZW5kKHNsaWRlc1tpXSk7IH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgIH1cbiAgICBpZiAoIShwYXJhbXMub2JzZXJ2ZXIgJiYgU3VwcG9ydC5vYnNlcnZlcikpIHtcbiAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcmVwZW5kU2xpZGUgKHNsaWRlcykge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuXG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICB9XG4gICAgdmFyIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyAxO1xuICAgIGlmICh0eXBlb2Ygc2xpZGVzID09PSAnb2JqZWN0JyAmJiAnbGVuZ3RoJyBpbiBzbGlkZXMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNbaV0pIHsgJHdyYXBwZXJFbC5wcmVwZW5kKHNsaWRlc1tpXSk7IH1cbiAgICAgIH1cbiAgICAgIG5ld0FjdGl2ZUluZGV4ID0gYWN0aXZlSW5kZXggKyBzbGlkZXMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAkd3JhcHBlckVsLnByZXBlbmQoc2xpZGVzKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgIH1cbiAgICBpZiAoIShwYXJhbXMub2JzZXJ2ZXIgJiYgU3VwcG9ydC5vYnNlcnZlcikpIHtcbiAgICAgIHN3aXBlci51cGRhdGUoKTtcbiAgICB9XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXgsIDAsIGZhbHNlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZFNsaWRlIChpbmRleCwgc2xpZGVzKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgdmFyIGFjdGl2ZUluZGV4QnVmZmVyID0gYWN0aXZlSW5kZXg7XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBhY3RpdmVJbmRleEJ1ZmZlciAtPSBzd2lwZXIubG9vcGVkU2xpZGVzO1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICBzd2lwZXIuc2xpZGVzID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAocGFyYW1zLnNsaWRlQ2xhc3MpKSk7XG4gICAgfVxuICAgIHZhciBiYXNlTGVuZ3RoID0gc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgaWYgKGluZGV4IDw9IDApIHtcbiAgICAgIHN3aXBlci5wcmVwZW5kU2xpZGUoc2xpZGVzKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGluZGV4ID49IGJhc2VMZW5ndGgpIHtcbiAgICAgIHN3aXBlci5hcHBlbmRTbGlkZShzbGlkZXMpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlciA+IGluZGV4ID8gYWN0aXZlSW5kZXhCdWZmZXIgKyAxIDogYWN0aXZlSW5kZXhCdWZmZXI7XG5cbiAgICB2YXIgc2xpZGVzQnVmZmVyID0gW107XG4gICAgZm9yICh2YXIgaSA9IGJhc2VMZW5ndGggLSAxOyBpID49IGluZGV4OyBpIC09IDEpIHtcbiAgICAgIHZhciBjdXJyZW50U2xpZGUgPSBzd2lwZXIuc2xpZGVzLmVxKGkpO1xuICAgICAgY3VycmVudFNsaWRlLnJlbW92ZSgpO1xuICAgICAgc2xpZGVzQnVmZmVyLnVuc2hpZnQoY3VycmVudFNsaWRlKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNsaWRlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzKSB7XG4gICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCBzbGlkZXMubGVuZ3RoOyBpJDEgKz0gMSkge1xuICAgICAgICBpZiAoc2xpZGVzW2kkMV0pIHsgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzW2kkMV0pOyB9XG4gICAgICB9XG4gICAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4QnVmZmVyID4gaW5kZXggPyBhY3RpdmVJbmRleEJ1ZmZlciArIHNsaWRlcy5sZW5ndGggOiBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpJDIgPSAwOyBpJDIgPCBzbGlkZXNCdWZmZXIubGVuZ3RoOyBpJDIgKz0gMSkge1xuICAgICAgJHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVzQnVmZmVyW2kkMl0pO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgICB9XG4gICAgaWYgKCEocGFyYW1zLm9ic2VydmVyICYmIFN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXggKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlU2xpZGUgKHNsaWRlc0luZGV4ZXMpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcblxuICAgIHZhciBhY3RpdmVJbmRleEJ1ZmZlciA9IGFjdGl2ZUluZGV4O1xuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgYWN0aXZlSW5kZXhCdWZmZXIgLT0gc3dpcGVyLmxvb3BlZFNsaWRlcztcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgc3dpcGVyLnNsaWRlcyA9ICR3cmFwcGVyRWwuY2hpbGRyZW4oKFwiLlwiICsgKHBhcmFtcy5zbGlkZUNsYXNzKSkpO1xuICAgIH1cbiAgICB2YXIgbmV3QWN0aXZlSW5kZXggPSBhY3RpdmVJbmRleEJ1ZmZlcjtcbiAgICB2YXIgaW5kZXhUb1JlbW92ZTtcblxuICAgIGlmICh0eXBlb2Ygc2xpZGVzSW5kZXhlcyA9PT0gJ29iamVjdCcgJiYgJ2xlbmd0aCcgaW4gc2xpZGVzSW5kZXhlcykge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXNJbmRleGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzW2ldO1xuICAgICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpbmRleFRvUmVtb3ZlXSkgeyBzd2lwZXIuc2xpZGVzLmVxKGluZGV4VG9SZW1vdmUpLnJlbW92ZSgpOyB9XG4gICAgICAgIGlmIChpbmRleFRvUmVtb3ZlIDwgbmV3QWN0aXZlSW5kZXgpIHsgbmV3QWN0aXZlSW5kZXggLT0gMTsgfVxuICAgICAgfVxuICAgICAgbmV3QWN0aXZlSW5kZXggPSBNYXRoLm1heChuZXdBY3RpdmVJbmRleCwgMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluZGV4VG9SZW1vdmUgPSBzbGlkZXNJbmRleGVzO1xuICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaW5kZXhUb1JlbW92ZV0pIHsgc3dpcGVyLnNsaWRlcy5lcShpbmRleFRvUmVtb3ZlKS5yZW1vdmUoKTsgfVxuICAgICAgaWYgKGluZGV4VG9SZW1vdmUgPCBuZXdBY3RpdmVJbmRleCkgeyBuZXdBY3RpdmVJbmRleCAtPSAxOyB9XG4gICAgICBuZXdBY3RpdmVJbmRleCA9IE1hdGgubWF4KG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgfVxuXG4gICAgaWYgKCEocGFyYW1zLm9ic2VydmVyICYmIFN1cHBvcnQub2JzZXJ2ZXIpKSB7XG4gICAgICBzd2lwZXIudXBkYXRlKCk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8obmV3QWN0aXZlSW5kZXggKyBzd2lwZXIubG9vcGVkU2xpZGVzLCAwLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwLCBmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlQWxsU2xpZGVzICgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcblxuICAgIHZhciBzbGlkZXNJbmRleGVzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBzbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgfVxuICAgIHN3aXBlci5yZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKTtcbiAgfVxuXG4gIHZhciBtYW5pcHVsYXRpb24gPSB7XG4gICAgYXBwZW5kU2xpZGU6IGFwcGVuZFNsaWRlLFxuICAgIHByZXBlbmRTbGlkZTogcHJlcGVuZFNsaWRlLFxuICAgIGFkZFNsaWRlOiBhZGRTbGlkZSxcbiAgICByZW1vdmVTbGlkZTogcmVtb3ZlU2xpZGUsXG4gICAgcmVtb3ZlQWxsU2xpZGVzOiByZW1vdmVBbGxTbGlkZXMsXG4gIH07XG5cbiAgdmFyIERldmljZSA9IChmdW5jdGlvbiBEZXZpY2UoKSB7XG4gICAgdmFyIHVhID0gd2luLm5hdmlnYXRvci51c2VyQWdlbnQ7XG5cbiAgICB2YXIgZGV2aWNlID0ge1xuICAgICAgaW9zOiBmYWxzZSxcbiAgICAgIGFuZHJvaWQ6IGZhbHNlLFxuICAgICAgYW5kcm9pZENocm9tZTogZmFsc2UsXG4gICAgICBkZXNrdG9wOiBmYWxzZSxcbiAgICAgIHdpbmRvd3M6IGZhbHNlLFxuICAgICAgaXBob25lOiBmYWxzZSxcbiAgICAgIGlwb2Q6IGZhbHNlLFxuICAgICAgaXBhZDogZmFsc2UsXG4gICAgICBjb3Jkb3ZhOiB3aW4uY29yZG92YSB8fCB3aW4ucGhvbmVnYXAsXG4gICAgICBwaG9uZWdhcDogd2luLmNvcmRvdmEgfHwgd2luLnBob25lZ2FwLFxuICAgIH07XG5cbiAgICB2YXIgd2luZG93cyA9IHVhLm1hdGNoKC8oV2luZG93cyBQaG9uZSk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHZhciBhbmRyb2lkID0gdWEubWF0Y2goLyhBbmRyb2lkKTs/W1xcc1xcL10rKFtcXGQuXSspPy8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgdmFyIGlwYWQgPSB1YS5tYXRjaCgvKGlQYWQpLipPU1xccyhbXFxkX10rKS8pO1xuICAgIHZhciBpcG9kID0gdWEubWF0Y2goLyhpUG9kKSguKk9TXFxzKFtcXGRfXSspKT8vKTtcbiAgICB2YXIgaXBob25lID0gIWlwYWQgJiYgdWEubWF0Y2goLyhpUGhvbmVcXHNPU3xpT1MpXFxzKFtcXGRfXSspLyk7XG5cblxuICAgIC8vIFdpbmRvd3NcbiAgICBpZiAod2luZG93cykge1xuICAgICAgZGV2aWNlLm9zID0gJ3dpbmRvd3MnO1xuICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IHdpbmRvd3NbMl07XG4gICAgICBkZXZpY2Uud2luZG93cyA9IHRydWU7XG4gICAgfVxuICAgIC8vIEFuZHJvaWRcbiAgICBpZiAoYW5kcm9pZCAmJiAhd2luZG93cykge1xuICAgICAgZGV2aWNlLm9zID0gJ2FuZHJvaWQnO1xuICAgICAgZGV2aWNlLm9zVmVyc2lvbiA9IGFuZHJvaWRbMl07XG4gICAgICBkZXZpY2UuYW5kcm9pZCA9IHRydWU7XG4gICAgICBkZXZpY2UuYW5kcm9pZENocm9tZSA9IHVhLnRvTG93ZXJDYXNlKCkuaW5kZXhPZignY2hyb21lJykgPj0gMDtcbiAgICB9XG4gICAgaWYgKGlwYWQgfHwgaXBob25lIHx8IGlwb2QpIHtcbiAgICAgIGRldmljZS5vcyA9ICdpb3MnO1xuICAgICAgZGV2aWNlLmlvcyA9IHRydWU7XG4gICAgfVxuICAgIC8vIGlPU1xuICAgIGlmIChpcGhvbmUgJiYgIWlwb2QpIHtcbiAgICAgIGRldmljZS5vc1ZlcnNpb24gPSBpcGhvbmVbMl0ucmVwbGFjZSgvXy9nLCAnLicpO1xuICAgICAgZGV2aWNlLmlwaG9uZSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpcGFkKSB7XG4gICAgICBkZXZpY2Uub3NWZXJzaW9uID0gaXBhZFsyXS5yZXBsYWNlKC9fL2csICcuJyk7XG4gICAgICBkZXZpY2UuaXBhZCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChpcG9kKSB7XG4gICAgICBkZXZpY2Uub3NWZXJzaW9uID0gaXBvZFszXSA/IGlwb2RbM10ucmVwbGFjZSgvXy9nLCAnLicpIDogbnVsbDtcbiAgICAgIGRldmljZS5pcGhvbmUgPSB0cnVlO1xuICAgIH1cbiAgICAvLyBpT1MgOCsgY2hhbmdlZCBVQVxuICAgIGlmIChkZXZpY2UuaW9zICYmIGRldmljZS5vc1ZlcnNpb24gJiYgdWEuaW5kZXhPZignVmVyc2lvbi8nKSA+PSAwKSB7XG4gICAgICBpZiAoZGV2aWNlLm9zVmVyc2lvbi5zcGxpdCgnLicpWzBdID09PSAnMTAnKSB7XG4gICAgICAgIGRldmljZS5vc1ZlcnNpb24gPSB1YS50b0xvd2VyQ2FzZSgpLnNwbGl0KCd2ZXJzaW9uLycpWzFdLnNwbGl0KCcgJylbMF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVza3RvcFxuICAgIGRldmljZS5kZXNrdG9wID0gIShkZXZpY2Uub3MgfHwgZGV2aWNlLmFuZHJvaWQgfHwgZGV2aWNlLndlYlZpZXcpO1xuXG4gICAgLy8gV2Vidmlld1xuICAgIGRldmljZS53ZWJWaWV3ID0gKGlwaG9uZSB8fCBpcGFkIHx8IGlwb2QpICYmIHVhLm1hdGNoKC8uKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kpO1xuXG4gICAgLy8gTWluaW1hbCBVSVxuICAgIGlmIChkZXZpY2Uub3MgJiYgZGV2aWNlLm9zID09PSAnaW9zJykge1xuICAgICAgdmFyIG9zVmVyc2lvbkFyciA9IGRldmljZS5vc1ZlcnNpb24uc3BsaXQoJy4nKTtcbiAgICAgIHZhciBtZXRhVmlld3BvcnQgPSBkb2MucXVlcnlTZWxlY3RvcignbWV0YVtuYW1lPVwidmlld3BvcnRcIl0nKTtcbiAgICAgIGRldmljZS5taW5pbWFsVWkgPSAhZGV2aWNlLndlYlZpZXdcbiAgICAgICAgJiYgKGlwb2QgfHwgaXBob25lKVxuICAgICAgICAmJiAob3NWZXJzaW9uQXJyWzBdICogMSA9PT0gNyA/IG9zVmVyc2lvbkFyclsxXSAqIDEgPj0gMSA6IG9zVmVyc2lvbkFyclswXSAqIDEgPiA3KVxuICAgICAgICAmJiBtZXRhVmlld3BvcnQgJiYgbWV0YVZpZXdwb3J0LmdldEF0dHJpYnV0ZSgnY29udGVudCcpLmluZGV4T2YoJ21pbmltYWwtdWknKSA+PSAwO1xuICAgIH1cblxuICAgIC8vIFBpeGVsIFJhdGlvXG4gICAgZGV2aWNlLnBpeGVsUmF0aW8gPSB3aW4uZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXG4gICAgLy8gRXhwb3J0IG9iamVjdFxuICAgIHJldHVybiBkZXZpY2U7XG4gIH0oKSk7XG5cbiAgZnVuY3Rpb24gb25Ub3VjaFN0YXJ0IChldmVudCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgdG91Y2hlcyA9IHN3aXBlci50b3VjaGVzO1xuXG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgZSA9IGV2ZW50O1xuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxuICAgIHZhciAkdGFyZ2V0RWwgPSAkKGUudGFyZ2V0KTtcblxuICAgIGlmIChwYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICd3cmFwcGVyJykge1xuICAgICAgaWYgKCEkdGFyZ2V0RWwuY2xvc2VzdChzd2lwZXIud3JhcHBlckVsKS5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgfVxuICAgIGRhdGEuaXNUb3VjaEV2ZW50ID0gZS50eXBlID09PSAndG91Y2hzdGFydCc7XG4gICAgaWYgKCFkYXRhLmlzVG91Y2hFdmVudCAmJiAnd2hpY2gnIGluIGUgJiYgZS53aGljaCA9PT0gMykgeyByZXR1cm47IH1cbiAgICBpZiAoIWRhdGEuaXNUb3VjaEV2ZW50ICYmICdidXR0b24nIGluIGUgJiYgZS5idXR0b24gPiAwKSB7IHJldHVybjsgfVxuICAgIGlmIChkYXRhLmlzVG91Y2hlZCAmJiBkYXRhLmlzTW92ZWQpIHsgcmV0dXJuOyB9XG4gICAgaWYgKHBhcmFtcy5ub1N3aXBpbmcgJiYgJHRhcmdldEVsLmNsb3Nlc3QocGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yID8gcGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yIDogKFwiLlwiICsgKHBhcmFtcy5ub1N3aXBpbmdDbGFzcykpKVswXSkge1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgICAgaWYgKCEkdGFyZ2V0RWwuY2xvc2VzdChwYXJhbXMuc3dpcGVIYW5kbGVyKVswXSkgeyByZXR1cm47IH1cbiAgICB9XG5cbiAgICB0b3VjaGVzLmN1cnJlbnRYID0gZS50eXBlID09PSAndG91Y2hzdGFydCcgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgIHRvdWNoZXMuY3VycmVudFkgPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgdmFyIHN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XG4gICAgdmFyIHN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG5cbiAgICAvLyBEbyBOT1Qgc3RhcnQgaWYgaU9TIGVkZ2Ugc3dpcGUgaXMgZGV0ZWN0ZWQuIE90aGVyd2lzZSBpT1MgYXBwIChVSVdlYlZpZXcpIGNhbm5vdCBzd2lwZS10by1nby1iYWNrIGFueW1vcmVcblxuICAgIHZhciBlZGdlU3dpcGVEZXRlY3Rpb24gPSBwYXJhbXMuZWRnZVN3aXBlRGV0ZWN0aW9uIHx8IHBhcmFtcy5pT1NFZGdlU3dpcGVEZXRlY3Rpb247XG4gICAgdmFyIGVkZ2VTd2lwZVRocmVzaG9sZCA9IHBhcmFtcy5lZGdlU3dpcGVUaHJlc2hvbGQgfHwgcGFyYW1zLmlPU0VkZ2VTd2lwZVRocmVzaG9sZDtcbiAgICBpZiAoXG4gICAgICBlZGdlU3dpcGVEZXRlY3Rpb25cbiAgICAgICYmICgoc3RhcnRYIDw9IGVkZ2VTd2lwZVRocmVzaG9sZClcbiAgICAgIHx8IChzdGFydFggPj0gd2luLnNjcmVlbi53aWR0aCAtIGVkZ2VTd2lwZVRocmVzaG9sZCkpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgVXRpbHMuZXh0ZW5kKGRhdGEsIHtcbiAgICAgIGlzVG91Y2hlZDogdHJ1ZSxcbiAgICAgIGlzTW92ZWQ6IGZhbHNlLFxuICAgICAgYWxsb3dUb3VjaENhbGxiYWNrczogdHJ1ZSxcbiAgICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkLFxuICAgIH0pO1xuXG4gICAgdG91Y2hlcy5zdGFydFggPSBzdGFydFg7XG4gICAgdG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IFV0aWxzLm5vdygpO1xuICAgIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIHsgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSBmYWxzZTsgfVxuICAgIGlmIChlLnR5cGUgIT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgdmFyIHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgICAgIGlmICgkdGFyZ2V0RWwuaXMoZGF0YS5mb3JtRWxlbWVudHMpKSB7IHByZXZlbnREZWZhdWx0ID0gZmFsc2U7IH1cbiAgICAgIGlmIChcbiAgICAgICAgZG9jLmFjdGl2ZUVsZW1lbnRcbiAgICAgICAgJiYgJChkb2MuYWN0aXZlRWxlbWVudCkuaXMoZGF0YS5mb3JtRWxlbWVudHMpXG4gICAgICAgICYmIGRvYy5hY3RpdmVFbGVtZW50ICE9PSAkdGFyZ2V0RWxbMF1cbiAgICAgICkge1xuICAgICAgICBkb2MuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzaG91bGRQcmV2ZW50RGVmYXVsdCA9IHByZXZlbnREZWZhdWx0ICYmIHN3aXBlci5hbGxvd1RvdWNoTW92ZSAmJiBwYXJhbXMudG91Y2hTdGFydFByZXZlbnREZWZhdWx0O1xuICAgICAgaWYgKHBhcmFtcy50b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCB8fCBzaG91bGRQcmV2ZW50RGVmYXVsdCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCd0b3VjaFN0YXJ0JywgZSk7XG4gIH1cblxuICBmdW5jdGlvbiBvblRvdWNoTW92ZSAoZXZlbnQpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIHRvdWNoZXMgPSBzd2lwZXIudG91Y2hlcztcbiAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcbiAgICB2YXIgZSA9IGV2ZW50O1xuICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfVxuICAgIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcbiAgICAgIGlmIChkYXRhLnN0YXJ0TW92aW5nICYmIGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChkYXRhLmlzVG91Y2hFdmVudCAmJiBlLnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7IHJldHVybjsgfVxuICAgIHZhciBwYWdlWCA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVggOiBlLnBhZ2VYO1xuICAgIHZhciBwYWdlWSA9IGUudHlwZSA9PT0gJ3RvdWNobW92ZScgPyBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVkgOiBlLnBhZ2VZO1xuICAgIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgICB0b3VjaGVzLnN0YXJ0WCA9IHBhZ2VYO1xuICAgICAgdG91Y2hlcy5zdGFydFkgPSBwYWdlWTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dUb3VjaE1vdmUpIHtcbiAgICAgIC8vIGlzTW92ZWQgPSB0cnVlO1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgIGlmIChkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgICBVdGlscy5leHRlbmQodG91Y2hlcywge1xuICAgICAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICAgICAgc3RhcnRZOiBwYWdlWSxcbiAgICAgICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICAgICAgY3VycmVudFk6IHBhZ2VZLFxuICAgICAgICB9KTtcbiAgICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IFV0aWxzLm5vdygpO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoZGF0YS5pc1RvdWNoRXZlbnQgJiYgcGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMgJiYgIXBhcmFtcy5sb29wKSB7XG4gICAgICBpZiAoc3dpcGVyLmlzVmVydGljYWwoKSkge1xuICAgICAgICAvLyBWZXJ0aWNhbFxuICAgICAgICBpZiAoXG4gICAgICAgICAgKHBhZ2VZIDwgdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpXG4gICAgICAgICAgfHwgKHBhZ2VZID4gdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpXG4gICAgICAgICkge1xuICAgICAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAocGFnZVggPCB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSlcbiAgICAgICAgfHwgKHBhZ2VYID4gdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YS5pc1RvdWNoRXZlbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQpIHtcbiAgICAgIGlmIChlLnRhcmdldCA9PT0gZG9jLmFjdGl2ZUVsZW1lbnQgJiYgJChlLnRhcmdldCkuaXMoZGF0YS5mb3JtRWxlbWVudHMpKSB7XG4gICAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gICAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZScsIGUpO1xuICAgIH1cbiAgICBpZiAoZS50YXJnZXRUb3VjaGVzICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPiAxKSB7IHJldHVybjsgfVxuXG4gICAgdG91Y2hlcy5jdXJyZW50WCA9IHBhZ2VYO1xuICAgIHRvdWNoZXMuY3VycmVudFkgPSBwYWdlWTtcblxuICAgIHZhciBkaWZmWCA9IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WDtcbiAgICB2YXIgZGlmZlkgPSB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMudGhyZXNob2xkICYmIE1hdGguc3FydCgoTWF0aC5wb3coIGRpZmZYLCAyICkpICsgKE1hdGgucG93KCBkaWZmWSwgMiApKSkgPCBzd2lwZXIucGFyYW1zLnRocmVzaG9sZCkgeyByZXR1cm47IH1cblxuICAgIGlmICh0eXBlb2YgZGF0YS5pc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHZhciB0b3VjaEFuZ2xlO1xuICAgICAgaWYgKChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgdG91Y2hlcy5jdXJyZW50WSA9PT0gdG91Y2hlcy5zdGFydFkpIHx8IChzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIHRvdWNoZXMuY3VycmVudFggPT09IHRvdWNoZXMuc3RhcnRYKSkge1xuICAgICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgaWYgKChkaWZmWCAqIGRpZmZYKSArIChkaWZmWSAqIGRpZmZZKSA+PSAyNSkge1xuICAgICAgICAgIHRvdWNoQW5nbGUgPSAoTWF0aC5hdGFuMihNYXRoLmFicyhkaWZmWSksIE1hdGguYWJzKGRpZmZYKSkgKiAxODApIC8gTWF0aC5QSTtcbiAgICAgICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlIDogKDkwIC0gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xuICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0YS5zdGFydE1vdmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICh0b3VjaGVzLmN1cnJlbnRYICE9PSB0b3VjaGVzLnN0YXJ0WCB8fCB0b3VjaGVzLmN1cnJlbnRZICE9PSB0b3VjaGVzLnN0YXJ0WSkge1xuICAgICAgICBkYXRhLnN0YXJ0TW92aW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghZGF0YS5zdGFydE1vdmluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgIGlmICghcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy50b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24gJiYgIXBhcmFtcy5uZXN0ZWQpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKCFkYXRhLmlzTW92ZWQpIHtcbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgfVxuICAgICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwudHJpZ2dlcignd2Via2l0VHJhbnNpdGlvbkVuZCB0cmFuc2l0aW9uZW5kJyk7XG4gICAgICB9XG4gICAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTtcbiAgICAgIC8vIEdyYWIgQ3Vyc29yXG4gICAgICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKHRydWUpO1xuICAgICAgfVxuICAgICAgc3dpcGVyLmVtaXQoJ3NsaWRlckZpcnN0TW92ZScsIGUpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnc2xpZGVyTW92ZScsIGUpO1xuICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG5cbiAgICB2YXIgZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGRpZmZYIDogZGlmZlk7XG4gICAgdG91Y2hlcy5kaWZmID0gZGlmZjtcblxuICAgIGRpZmYgKj0gcGFyYW1zLnRvdWNoUmF0aW87XG4gICAgaWYgKHJ0bCkgeyBkaWZmID0gLWRpZmY7IH1cblxuICAgIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuXG4gICAgdmFyIGRpc2FibGVQYXJlbnRTd2lwZXIgPSB0cnVlO1xuICAgIHZhciByZXNpc3RhbmNlUmF0aW8gPSBwYXJhbXMucmVzaXN0YW5jZVJhdGlvO1xuICAgIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgICAgcmVzaXN0YW5jZVJhdGlvID0gMDtcbiAgICB9XG4gICAgaWYgKChkaWZmID4gMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIHsgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gKHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIDEpICsgKE1hdGgucG93KCAoLXN3aXBlci5taW5UcmFuc2xhdGUoKSArIGRhdGEuc3RhcnRUcmFuc2xhdGUgKyBkaWZmKSwgcmVzaXN0YW5jZVJhdGlvICkpOyB9XG4gICAgfSBlbHNlIGlmIChkaWZmIDwgMCAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkgeyBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpICsgMSkgLSAoTWF0aC5wb3coIChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBkYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZiksIHJlc2lzdGFuY2VSYXRpbyApKTsgfVxuICAgIH1cblxuICAgIGlmIChkaXNhYmxlUGFyZW50U3dpcGVyKSB7XG4gICAgICBlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICB9XG5cblxuICAgIC8vIFRocmVzaG9sZFxuICAgIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkge1xuICAgICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcGFyYW1zLnRocmVzaG9sZCB8fCBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICBpZiAoIWRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgICAgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICAgIHRvdWNoZXMuc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgICB0b3VjaGVzLnN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG4gICAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgICB0b3VjaGVzLmRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFwYXJhbXMuZm9sbG93RmluZ2VyIHx8IHBhcmFtcy5jc3NNb2RlKSB7IHJldHVybjsgfVxuXG4gICAgLy8gVXBkYXRlIGFjdGl2ZSBpbmRleCBpbiBmcmVlIG1vZGVcbiAgICBpZiAocGFyYW1zLmZyZWVNb2RlIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Zpc2liaWxpdHkpIHtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgLy8gVmVsb2NpdHlcbiAgICAgIGlmIChkYXRhLnZlbG9jaXRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGRhdGEudmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgICBwb3NpdGlvbjogdG91Y2hlc1tzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnc3RhcnRYJyA6ICdzdGFydFknXSxcbiAgICAgICAgICB0aW1lOiBkYXRhLnRvdWNoU3RhcnRUaW1lLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGRhdGEudmVsb2NpdGllcy5wdXNoKHtcbiAgICAgICAgcG9zaXRpb246IHRvdWNoZXNbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2N1cnJlbnRYJyA6ICdjdXJyZW50WSddLFxuICAgICAgICB0aW1lOiBVdGlscy5ub3coKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbiAgICAvLyBVcGRhdGUgdHJhbnNsYXRlXG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gb25Ub3VjaEVuZCAoZXZlbnQpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG5cbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgdG91Y2hlcyA9IHN3aXBlci50b3VjaGVzO1xuICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgdmFyIHNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZDtcbiAgICB2YXIgc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQ7XG4gICAgdmFyIGUgPSBldmVudDtcbiAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSB7IGUgPSBlLm9yaWdpbmFsRXZlbnQ7IH1cbiAgICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgICBzd2lwZXIuZW1pdCgndG91Y2hFbmQnLCBlKTtcbiAgICB9XG4gICAgZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG4gICAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBwYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gICAgICB9XG4gICAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gUmV0dXJuIEdyYWIgQ3Vyc29yXG4gICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmlzVG91Y2hlZCAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgICB9XG5cbiAgICAvLyBUaW1lIGRpZmZcbiAgICB2YXIgdG91Y2hFbmRUaW1lID0gVXRpbHMubm93KCk7XG4gICAgdmFyIHRpbWVEaWZmID0gdG91Y2hFbmRUaW1lIC0gZGF0YS50b3VjaFN0YXJ0VGltZTtcblxuICAgIC8vIFRhcCwgZG91YmxlVGFwLCBDbGlja1xuICAgIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xuICAgICAgc3dpcGVyLnVwZGF0ZUNsaWNrZWRTbGlkZShlKTtcbiAgICAgIHN3aXBlci5lbWl0KCd0YXAgY2xpY2snLCBlKTtcbiAgICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiAodG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lKSA8IDMwMCkge1xuICAgICAgICBzd2lwZXIuZW1pdCgnZG91YmxlVGFwIGRvdWJsZUNsaWNrJywgZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGF0YS5sYXN0Q2xpY2tUaW1lID0gVXRpbHMubm93KCk7XG4gICAgVXRpbHMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCFzd2lwZXIuZGVzdHJveWVkKSB7IHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTsgfVxuICAgIH0pO1xuXG4gICAgaWYgKCFkYXRhLmlzVG91Y2hlZCB8fCAhZGF0YS5pc01vdmVkIHx8ICFzd2lwZXIuc3dpcGVEaXJlY3Rpb24gfHwgdG91Y2hlcy5kaWZmID09PSAwIHx8IGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9PT0gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcblxuICAgIHZhciBjdXJyZW50UG9zO1xuICAgIGlmIChwYXJhbXMuZm9sbG93RmluZ2VyKSB7XG4gICAgICBjdXJyZW50UG9zID0gcnRsID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJyZW50UG9zID0gLWRhdGEuY3VycmVudFRyYW5zbGF0ZTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmZyZWVNb2RlKSB7XG4gICAgICBpZiAoY3VycmVudFBvcyA8IC1zd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRQb3MgPiAtc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICAgIGlmIChzd2lwZXIuc2xpZGVzLmxlbmd0aCA8IHNuYXBHcmlkLmxlbmd0aCkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNuYXBHcmlkLmxlbmd0aCAtIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW0pIHtcbiAgICAgICAgaWYgKGRhdGEudmVsb2NpdGllcy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgdmFyIGxhc3RNb3ZlRXZlbnQgPSBkYXRhLnZlbG9jaXRpZXMucG9wKCk7XG4gICAgICAgICAgdmFyIHZlbG9jaXR5RXZlbnQgPSBkYXRhLnZlbG9jaXRpZXMucG9wKCk7XG5cbiAgICAgICAgICB2YXIgZGlzdGFuY2UgPSBsYXN0TW92ZUV2ZW50LnBvc2l0aW9uIC0gdmVsb2NpdHlFdmVudC5wb3NpdGlvbjtcbiAgICAgICAgICB2YXIgdGltZSA9IGxhc3RNb3ZlRXZlbnQudGltZSAtIHZlbG9jaXR5RXZlbnQudGltZTtcbiAgICAgICAgICBzd2lwZXIudmVsb2NpdHkgPSBkaXN0YW5jZSAvIHRpbWU7XG4gICAgICAgICAgc3dpcGVyLnZlbG9jaXR5IC89IDI7XG4gICAgICAgICAgaWYgKE1hdGguYWJzKHN3aXBlci52ZWxvY2l0eSkgPCBwYXJhbXMuZnJlZU1vZGVNaW5pbXVtVmVsb2NpdHkpIHtcbiAgICAgICAgICAgIHN3aXBlci52ZWxvY2l0eSA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHRoaXMgaW1wbGllcyB0aGF0IHRoZSB1c2VyIHN0b3BwZWQgbW92aW5nIGEgZmluZ2VyIHRoZW4gcmVsZWFzZWQuXG4gICAgICAgICAgLy8gVGhlcmUgd291bGQgYmUgbm8gZXZlbnRzIHdpdGggZGlzdGFuY2UgemVybywgc28gdGhlIGxhc3QgZXZlbnQgaXMgc3RhbGUuXG4gICAgICAgICAgaWYgKHRpbWUgPiAxNTAgfHwgKFV0aWxzLm5vdygpIC0gbGFzdE1vdmVFdmVudC50aW1lKSA+IDMwMCkge1xuICAgICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnZlbG9jaXR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBzd2lwZXIudmVsb2NpdHkgKj0gcGFyYW1zLmZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvO1xuXG4gICAgICAgIGRhdGEudmVsb2NpdGllcy5sZW5ndGggPSAwO1xuICAgICAgICB2YXIgbW9tZW50dW1EdXJhdGlvbiA9IDEwMDAgKiBwYXJhbXMuZnJlZU1vZGVNb21lbnR1bVJhdGlvO1xuICAgICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZSA9IHN3aXBlci52ZWxvY2l0eSAqIG1vbWVudHVtRHVyYXRpb247XG5cbiAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gc3dpcGVyLnRyYW5zbGF0ZSArIG1vbWVudHVtRGlzdGFuY2U7XG4gICAgICAgIGlmIChydGwpIHsgbmV3UG9zaXRpb24gPSAtbmV3UG9zaXRpb247IH1cblxuICAgICAgICB2YXIgZG9Cb3VuY2UgPSBmYWxzZTtcbiAgICAgICAgdmFyIGFmdGVyQm91bmNlUG9zaXRpb247XG4gICAgICAgIHZhciBib3VuY2VBbW91bnQgPSBNYXRoLmFicyhzd2lwZXIudmVsb2NpdHkpICogMjAgKiBwYXJhbXMuZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvO1xuICAgICAgICB2YXIgbmVlZHNMb29wRml4O1xuICAgICAgICBpZiAobmV3UG9zaXRpb24gPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UpIHtcbiAgICAgICAgICAgIGlmIChuZXdQb3NpdGlvbiArIHN3aXBlci5tYXhUcmFuc2xhdGUoKSA8IC1ib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgZG9Cb3VuY2UgPSB0cnVlO1xuICAgICAgICAgICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJhbXMubG9vcCAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHsgbmVlZHNMb29wRml4ID0gdHJ1ZTsgfVxuICAgICAgICB9IGVsc2UgaWYgKG5ld1Bvc2l0aW9uID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5mcmVlTW9kZU1vbWVudHVtQm91bmNlKSB7XG4gICAgICAgICAgICBpZiAobmV3UG9zaXRpb24gLSBzd2lwZXIubWluVHJhbnNsYXRlKCkgPiBib3VuY2VBbW91bnQpIHtcbiAgICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgKyBib3VuY2VBbW91bnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhZnRlckJvdW5jZVBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgICAgICAgICAgZG9Cb3VuY2UgPSB0cnVlO1xuICAgICAgICAgICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJhbXMubG9vcCAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHsgbmVlZHNMb29wRml4ID0gdHJ1ZTsgfVxuICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICAgIHZhciBuZXh0U2xpZGU7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBzbmFwR3JpZC5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgaWYgKHNuYXBHcmlkW2pdID4gLW5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIG5leHRTbGlkZSA9IGo7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChNYXRoLmFicyhzbmFwR3JpZFtuZXh0U2xpZGVdIC0gbmV3UG9zaXRpb24pIDwgTWF0aC5hYnMoc25hcEdyaWRbbmV4dFNsaWRlIC0gMV0gLSBuZXdQb3NpdGlvbikgfHwgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgICAgIG5ld1Bvc2l0aW9uID0gc25hcEdyaWRbbmV4dFNsaWRlXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3UG9zaXRpb24gPSBzbmFwR3JpZFtuZXh0U2xpZGUgLSAxXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbmV3UG9zaXRpb24gPSAtbmV3UG9zaXRpb247XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG5lZWRzTG9vcEZpeCkge1xuICAgICAgICAgIHN3aXBlci5vbmNlKCd0cmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBGaXggZHVyYXRpb25cbiAgICAgICAgaWYgKHN3aXBlci52ZWxvY2l0eSAhPT0gMCkge1xuICAgICAgICAgIGlmIChydGwpIHtcbiAgICAgICAgICAgIG1vbWVudHVtRHVyYXRpb24gPSBNYXRoLmFicygoLW5ld1Bvc2l0aW9uIC0gc3dpcGVyLnRyYW5zbGF0ZSkgLyBzd2lwZXIudmVsb2NpdHkpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5hYnMoKG5ld1Bvc2l0aW9uIC0gc3dpcGVyLnRyYW5zbGF0ZSkgLyBzd2lwZXIudmVsb2NpdHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3QoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyYW1zLmZyZWVNb2RlTW9tZW50dW1Cb3VuY2UgJiYgZG9Cb3VuY2UpIHtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24obW9tZW50dW1EdXJhdGlvbik7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdQb3NpdGlvbik7XG4gICAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydCh0cnVlLCBzd2lwZXIuc3dpcGVEaXJlY3Rpb24pO1xuICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnbW9tZW50dW1Cb3VuY2UnKTtcblxuICAgICAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24ocGFyYW1zLnNwZWVkKTtcbiAgICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoYWZ0ZXJCb3VuY2VQb3NpdGlvbik7XG4gICAgICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnZlbG9jaXR5KSB7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKTtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHRydWUsIHN3aXBlci5zd2lwZURpcmVjdGlvbik7XG4gICAgICAgICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbkVuZChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1Bvc2l0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbXMuZnJlZU1vZGVNb21lbnR1bSB8fCB0aW1lRGlmZiA+PSBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIGN1cnJlbnQgc2xpZGVcbiAgICB2YXIgc3RvcEluZGV4ID0gMDtcbiAgICB2YXIgZ3JvdXBTaXplID0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFswXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IHBhcmFtcy5zbGlkZXNQZXJHcm91cCkge1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldICYmIGN1cnJlbnRQb3MgPCBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdKSB7XG4gICAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW2kgKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXBdIC0gc2xpZGVzR3JpZFtpXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjdXJyZW50UG9zID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEZpbmQgY3VycmVudCBzbGlkZSBzaXplXG4gICAgdmFyIHJhdGlvID0gKGN1cnJlbnRQb3MgLSBzbGlkZXNHcmlkW3N0b3BJbmRleF0pIC8gZ3JvdXBTaXplO1xuXG4gICAgaWYgKHRpbWVEaWZmID4gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgICAgLy8gTG9uZyB0b3VjaGVzXG4gICAgICBpZiAoIXBhcmFtcy5sb25nU3dpcGVzKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICBpZiAocmF0aW8gPj0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApOyB9XG4gICAgICAgIGVsc2UgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpOyB9XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgaWYgKHJhdGlvID4gKDEgLSBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSkgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApOyB9XG4gICAgICAgIGVsc2UgeyBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpOyB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNob3J0IHN3aXBlc1xuICAgICAgaWYgKCFwYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblJlc2l6ZSAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG5cbiAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgICB2YXIgZWwgPSBzd2lwZXIuZWw7XG5cbiAgICBpZiAoZWwgJiYgZWwub2Zmc2V0V2lkdGggPT09IDApIHsgcmV0dXJuOyB9XG5cbiAgICAvLyBCcmVha3BvaW50c1xuICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuXG4gICAgLy8gU2F2ZSBsb2Nrc1xuICAgIHZhciBhbGxvd1NsaWRlTmV4dCA9IHN3aXBlci5hbGxvd1NsaWRlTmV4dDtcbiAgICB2YXIgYWxsb3dTbGlkZVByZXYgPSBzd2lwZXIuYWxsb3dTbGlkZVByZXY7XG4gICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xuXG4gICAgLy8gRGlzYWJsZSBsb2NrcyBvbiByZXNpemVcbiAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG5cbiAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcblxuICAgIGlmIChwYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgIHZhciBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heChzd2lwZXIudHJhbnNsYXRlLCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpLCBzd2lwZXIubWluVHJhbnNsYXRlKCkpO1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuXG4gICAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5ICYmIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nICYmIHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcbiAgICB9XG4gICAgLy8gUmV0dXJuIGxvY2tzIGFmdGVyIHJlc2l6ZVxuICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuXG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XG4gICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG9uQ2xpY2sgKGUpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5hbGxvd0NsaWNrKSB7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzKSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uICYmIHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBvblNjcm9sbCAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHdyYXBwZXJFbCA9IHN3aXBlci53cmFwcGVyRWw7XG4gICAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICBzd2lwZXIudHJhbnNsYXRlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gLXdyYXBwZXJFbC5zY3JvbGxMZWZ0IDogLXdyYXBwZXJFbC5zY3JvbGxUb3A7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgaWYgKHN3aXBlci50cmFuc2xhdGUgPT09IC0wKSB7IHN3aXBlci50cmFuc2xhdGUgPSAwOyB9XG5cbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuXG4gICAgdmFyIG5ld1Byb2dyZXNzO1xuICAgIHZhciB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UHJvZ3Jlc3MgPSAoc3dpcGVyLnRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyAodHJhbnNsYXRlc0RpZmYpO1xuICAgIH1cbiAgICBpZiAobmV3UHJvZ3Jlc3MgIT09IHN3aXBlci5wcm9ncmVzcykge1xuICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHN3aXBlci50cmFuc2xhdGUpO1xuICAgIH1cblxuICAgIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBmYWxzZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhdHRhY2hFdmVudHMoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyIHRvdWNoRXZlbnRzID0gc3dpcGVyLnRvdWNoRXZlbnRzO1xuICAgIHZhciBlbCA9IHN3aXBlci5lbDtcbiAgICB2YXIgd3JhcHBlckVsID0gc3dpcGVyLndyYXBwZXJFbDtcblxuICAgIHN3aXBlci5vblRvdWNoU3RhcnQgPSBvblRvdWNoU3RhcnQuYmluZChzd2lwZXIpO1xuICAgIHN3aXBlci5vblRvdWNoTW92ZSA9IG9uVG91Y2hNb3ZlLmJpbmQoc3dpcGVyKTtcbiAgICBzd2lwZXIub25Ub3VjaEVuZCA9IG9uVG91Y2hFbmQuYmluZChzd2lwZXIpO1xuICAgIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgc3dpcGVyLm9uU2Nyb2xsID0gb25TY3JvbGwuYmluZChzd2lwZXIpO1xuICAgIH1cblxuICAgIHN3aXBlci5vbkNsaWNrID0gb25DbGljay5iaW5kKHN3aXBlcik7XG5cbiAgICB2YXIgY2FwdHVyZSA9ICEhcGFyYW1zLm5lc3RlZDtcblxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgIGlmICghU3VwcG9ydC50b3VjaCAmJiAoU3VwcG9ydC5wb2ludGVyRXZlbnRzIHx8IFN1cHBvcnQucHJlZml4ZWRQb2ludGVyRXZlbnRzKSkge1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFN1cHBvcnQudG91Y2gpIHtcbiAgICAgICAgdmFyIHBhc3NpdmVMaXN0ZW5lciA9IHRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5tb3ZlLCBzd2lwZXIub25Ub3VjaE1vdmUsIFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogY2FwdHVyZSB9IDogY2FwdHVyZSk7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRvdWNoRXZlbnRzLmNhbmNlbCkge1xuICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuY2FuY2VsLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhRGV2aWNlLmlvcyAmJiAhRGV2aWNlLmFuZHJvaWQpIHx8IChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhU3VwcG9ydC50b3VjaCAmJiBEZXZpY2UuaW9zKSkge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG4gICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpcGVyLm9uQ2xpY2ssIHRydWUpO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHdyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBzd2lwZXIub25TY3JvbGwpO1xuICAgIH1cblxuICAgIC8vIFJlc2l6ZSBoYW5kbGVyXG4gICAgc3dpcGVyLm9uKChEZXZpY2UuaW9zIHx8IERldmljZS5hbmRyb2lkID8gJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBvYnNlcnZlclVwZGF0ZScgOiAncmVzaXplIG9ic2VydmVyVXBkYXRlJyksIG9uUmVzaXplLCB0cnVlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRldGFjaEV2ZW50cygpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcblxuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciB0b3VjaEV2ZW50cyA9IHN3aXBlci50b3VjaEV2ZW50cztcbiAgICB2YXIgZWwgPSBzd2lwZXIuZWw7XG4gICAgdmFyIHdyYXBwZXJFbCA9IHN3aXBlci53cmFwcGVyRWw7XG5cbiAgICB2YXIgY2FwdHVyZSA9ICEhcGFyYW1zLm5lc3RlZDtcblxuICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgIGlmICghU3VwcG9ydC50b3VjaCAmJiAoU3VwcG9ydC5wb2ludGVyRXZlbnRzIHx8IFN1cHBvcnQucHJlZml4ZWRQb2ludGVyRXZlbnRzKSkge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50cy5zdGFydCwgc3dpcGVyLm9uVG91Y2hTdGFydCwgZmFsc2UpO1xuICAgICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMubW92ZSwgc3dpcGVyLm9uVG91Y2hNb3ZlLCBjYXB0dXJlKTtcbiAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLmVuZCwgc3dpcGVyLm9uVG91Y2hFbmQsIGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFN1cHBvcnQudG91Y2gpIHtcbiAgICAgICAgdmFyIHBhc3NpdmVMaXN0ZW5lciA9IHRvdWNoRXZlbnRzLnN0YXJ0ID09PSAnb25Ub3VjaFN0YXJ0JyAmJiBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogZmFsc2UgfSA6IGZhbHNlO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLnN0YXJ0LCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzLm1vdmUsIHN3aXBlci5vblRvdWNoTW92ZSwgY2FwdHVyZSk7XG4gICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuZW5kLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgaWYgKHRvdWNoRXZlbnRzLmNhbmNlbCkge1xuICAgICAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHMuY2FuY2VsLCBzd2lwZXIub25Ub3VjaEVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhRGV2aWNlLmlvcyAmJiAhRGV2aWNlLmFuZHJvaWQpIHx8IChwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiAhU3VwcG9ydC50b3VjaCAmJiBEZXZpY2UuaW9zKSkge1xuICAgICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCBmYWxzZSk7XG4gICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIGNhcHR1cmUpO1xuICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHN3aXBlci5vblRvdWNoRW5kLCBmYWxzZSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG4gICAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3dpcGVyLm9uQ2xpY2ssIHRydWUpO1xuICAgIH1cblxuICAgIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgd3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHN3aXBlci5vblNjcm9sbCk7XG4gICAgfVxuXG4gICAgLy8gUmVzaXplIGhhbmRsZXJcbiAgICBzd2lwZXIub2ZmKChEZXZpY2UuaW9zIHx8IERldmljZS5hbmRyb2lkID8gJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBvYnNlcnZlclVwZGF0ZScgOiAncmVzaXplIG9ic2VydmVyVXBkYXRlJyksIG9uUmVzaXplKTtcbiAgfVxuXG4gIHZhciBldmVudHMgPSB7XG4gICAgYXR0YWNoRXZlbnRzOiBhdHRhY2hFdmVudHMsXG4gICAgZGV0YWNoRXZlbnRzOiBkZXRhY2hFdmVudHMsXG4gIH07XG5cbiAgZnVuY3Rpb24gc2V0QnJlYWtwb2ludCAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgIHZhciBpbml0aWFsaXplZCA9IHN3aXBlci5pbml0aWFsaXplZDtcbiAgICB2YXIgbG9vcGVkU2xpZGVzID0gc3dpcGVyLmxvb3BlZFNsaWRlczsgaWYgKCBsb29wZWRTbGlkZXMgPT09IHZvaWQgMCApIGxvb3BlZFNsaWRlcyA9IDA7XG4gICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgdmFyIGJyZWFrcG9pbnRzID0gcGFyYW1zLmJyZWFrcG9pbnRzO1xuICAgIGlmICghYnJlYWtwb2ludHMgfHwgKGJyZWFrcG9pbnRzICYmIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5sZW5ndGggPT09IDApKSB7IHJldHVybjsgfVxuXG4gICAgLy8gR2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aCBhbmQgdXBkYXRlIHBhcmFtZXRlcnNcbiAgICB2YXIgYnJlYWtwb2ludCA9IHN3aXBlci5nZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzKTtcblxuICAgIGlmIChicmVha3BvaW50ICYmIHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCAhPT0gYnJlYWtwb2ludCkge1xuICAgICAgdmFyIGJyZWFrcG9pbnRPbmx5UGFyYW1zID0gYnJlYWtwb2ludCBpbiBicmVha3BvaW50cyA/IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogdW5kZWZpbmVkO1xuICAgICAgaWYgKGJyZWFrcG9pbnRPbmx5UGFyYW1zKSB7XG4gICAgICAgIFsnc2xpZGVzUGVyVmlldycsICdzcGFjZUJldHdlZW4nLCAnc2xpZGVzUGVyR3JvdXAnLCAnc2xpZGVzUGVyQ29sdW1uJ10uZm9yRWFjaChmdW5jdGlvbiAocGFyYW0pIHtcbiAgICAgICAgICB2YXIgcGFyYW1WYWx1ZSA9IGJyZWFrcG9pbnRPbmx5UGFyYW1zW3BhcmFtXTtcbiAgICAgICAgICBpZiAodHlwZW9mIHBhcmFtVmFsdWUgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybjsgfVxuICAgICAgICAgIGlmIChwYXJhbSA9PT0gJ3NsaWRlc1BlclZpZXcnICYmIChwYXJhbVZhbHVlID09PSAnQVVUTycgfHwgcGFyYW1WYWx1ZSA9PT0gJ2F1dG8nKSkge1xuICAgICAgICAgICAgYnJlYWtwb2ludE9ubHlQYXJhbXNbcGFyYW1dID0gJ2F1dG8nO1xuICAgICAgICAgIH0gZWxzZSBpZiAocGFyYW0gPT09ICdzbGlkZXNQZXJWaWV3Jykge1xuICAgICAgICAgICAgYnJlYWtwb2ludE9ubHlQYXJhbXNbcGFyYW1dID0gcGFyc2VGbG9hdChwYXJhbVZhbHVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnJlYWtwb2ludE9ubHlQYXJhbXNbcGFyYW1dID0gcGFyc2VJbnQocGFyYW1WYWx1ZSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBicmVha3BvaW50UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMgfHwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zO1xuICAgICAgdmFyIHdhc011bHRpUm93ID0gcGFyYW1zLnNsaWRlc1BlckNvbHVtbiA+IDE7XG4gICAgICB2YXIgaXNNdWx0aVJvdyA9IGJyZWFrcG9pbnRQYXJhbXMuc2xpZGVzUGVyQ29sdW1uID4gMTtcbiAgICAgIGlmICh3YXNNdWx0aVJvdyAmJiAhaXNNdWx0aVJvdykge1xuICAgICAgICAkZWwucmVtb3ZlQ2xhc3MoKChwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcIm11bHRpcm93IFwiICsgKHBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwibXVsdGlyb3ctY29sdW1uXCIpKTtcbiAgICAgIH0gZWxzZSBpZiAoIXdhc011bHRpUm93ICYmIGlzTXVsdGlSb3cpIHtcbiAgICAgICAgJGVsLmFkZENsYXNzKCgocGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpICsgXCJtdWx0aXJvd1wiKSk7XG4gICAgICAgIGlmIChicmVha3BvaW50UGFyYW1zLnNsaWRlc1BlckNvbHVtbkZpbGwgPT09ICdjb2x1bW4nKSB7XG4gICAgICAgICAgJGVsLmFkZENsYXNzKCgocGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpICsgXCJtdWx0aXJvdy1jb2x1bW5cIikpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciBkaXJlY3Rpb25DaGFuZ2VkID0gYnJlYWtwb2ludFBhcmFtcy5kaXJlY3Rpb24gJiYgYnJlYWtwb2ludFBhcmFtcy5kaXJlY3Rpb24gIT09IHBhcmFtcy5kaXJlY3Rpb247XG4gICAgICB2YXIgbmVlZHNSZUxvb3AgPSBwYXJhbXMubG9vcCAmJiAoYnJlYWtwb2ludFBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBwYXJhbXMuc2xpZGVzUGVyVmlldyB8fCBkaXJlY3Rpb25DaGFuZ2VkKTtcblxuICAgICAgaWYgKGRpcmVjdGlvbkNoYW5nZWQgJiYgaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgc3dpcGVyLmNoYW5nZURpcmVjdGlvbigpO1xuICAgICAgfVxuXG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhcmFtcywgYnJlYWtwb2ludFBhcmFtcyk7XG5cbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG4gICAgICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcbiAgICAgIH0pO1xuXG4gICAgICBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuXG4gICAgICBpZiAobmVlZHNSZUxvb3AgJiYgaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oKGFjdGl2ZUluZGV4IC0gbG9vcGVkU2xpZGVzKSArIHN3aXBlci5sb29wZWRTbGlkZXMsIDAsIGZhbHNlKTtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXQoJ2JyZWFrcG9pbnQnLCBicmVha3BvaW50UGFyYW1zKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRCcmVha3BvaW50IChicmVha3BvaW50cykge1xuICAgIC8vIEdldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGhcbiAgICBpZiAoIWJyZWFrcG9pbnRzKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cbiAgICB2YXIgYnJlYWtwb2ludCA9IGZhbHNlO1xuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICBPYmplY3Qua2V5cyhicmVha3BvaW50cykuZm9yRWFjaChmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgIHBvaW50cy5wdXNoKHBvaW50KTtcbiAgICB9KTtcbiAgICBwb2ludHMuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gcGFyc2VJbnQoYSwgMTApIC0gcGFyc2VJbnQoYiwgMTApOyB9KTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgdmFyIHBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgaWYgKHBvaW50IDw9IHdpbi5pbm5lcldpZHRoKSB7XG4gICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGJyZWFrcG9pbnQgfHwgJ21heCc7XG4gIH1cblxuICB2YXIgYnJlYWtwb2ludHMgPSB7IHNldEJyZWFrcG9pbnQ6IHNldEJyZWFrcG9pbnQsIGdldEJyZWFrcG9pbnQ6IGdldEJyZWFrcG9pbnQgfTtcblxuICBmdW5jdGlvbiBhZGRDbGFzc2VzICgpIHtcbiAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICB2YXIgY2xhc3NOYW1lcyA9IHN3aXBlci5jbGFzc05hbWVzO1xuICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgIHZhciBydGwgPSBzd2lwZXIucnRsO1xuICAgIHZhciAkZWwgPSBzd2lwZXIuJGVsO1xuICAgIHZhciBzdWZmaXhlcyA9IFtdO1xuXG4gICAgc3VmZml4ZXMucHVzaCgnaW5pdGlhbGl6ZWQnKTtcbiAgICBzdWZmaXhlcy5wdXNoKHBhcmFtcy5kaXJlY3Rpb24pO1xuXG4gICAgaWYgKHBhcmFtcy5mcmVlTW9kZSkge1xuICAgICAgc3VmZml4ZXMucHVzaCgnZnJlZS1tb2RlJyk7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgc3VmZml4ZXMucHVzaCgnYXV0b2hlaWdodCcpO1xuICAgIH1cbiAgICBpZiAocnRsKSB7XG4gICAgICBzdWZmaXhlcy5wdXNoKCdydGwnKTtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW4gPiAxKSB7XG4gICAgICBzdWZmaXhlcy5wdXNoKCdtdWx0aXJvdycpO1xuICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJDb2x1bW5GaWxsID09PSAnY29sdW1uJykge1xuICAgICAgICBzdWZmaXhlcy5wdXNoKCdtdWx0aXJvdy1jb2x1bW4nKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKERldmljZS5hbmRyb2lkKSB7XG4gICAgICBzdWZmaXhlcy5wdXNoKCdhbmRyb2lkJyk7XG4gICAgfVxuICAgIGlmIChEZXZpY2UuaW9zKSB7XG4gICAgICBzdWZmaXhlcy5wdXNoKCdpb3MnKTtcbiAgICB9XG5cbiAgICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHN1ZmZpeGVzLnB1c2goJ2Nzcy1tb2RlJyk7XG4gICAgfVxuXG4gICAgc3VmZml4ZXMuZm9yRWFjaChmdW5jdGlvbiAoc3VmZml4KSB7XG4gICAgICBjbGFzc05hbWVzLnB1c2gocGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MgKyBzdWZmaXgpO1xuICAgIH0pO1xuXG4gICAgJGVsLmFkZENsYXNzKGNsYXNzTmFtZXMuam9pbignICcpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMgKCkge1xuICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgIHZhciAkZWwgPSBzd2lwZXIuJGVsO1xuICAgIHZhciBjbGFzc05hbWVzID0gc3dpcGVyLmNsYXNzTmFtZXM7XG5cbiAgICAkZWwucmVtb3ZlQ2xhc3MoY2xhc3NOYW1lcy5qb2luKCcgJykpO1xuICB9XG5cbiAgdmFyIGNsYXNzZXMgPSB7IGFkZENsYXNzZXM6IGFkZENsYXNzZXMsIHJlbW92ZUNsYXNzZXM6IHJlbW92ZUNsYXNzZXMgfTtcblxuICBmdW5jdGlvbiBsb2FkSW1hZ2UgKGltYWdlRWwsIHNyYywgc3Jjc2V0LCBzaXplcywgY2hlY2tGb3JDb21wbGV0ZSwgY2FsbGJhY2spIHtcbiAgICB2YXIgaW1hZ2U7XG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjaygpOyB9XG4gICAgfVxuICAgIGlmICghaW1hZ2VFbC5jb21wbGV0ZSB8fCAhY2hlY2tGb3JDb21wbGV0ZSkge1xuICAgICAgaWYgKHNyYykge1xuICAgICAgICBpbWFnZSA9IG5ldyB3aW4uSW1hZ2UoKTtcbiAgICAgICAgaW1hZ2Uub25sb2FkID0gb25SZWFkeTtcbiAgICAgICAgaW1hZ2Uub25lcnJvciA9IG9uUmVhZHk7XG4gICAgICAgIGlmIChzaXplcykge1xuICAgICAgICAgIGltYWdlLnNpemVzID0gc2l6ZXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNyY3NldCkge1xuICAgICAgICAgIGltYWdlLnNyY3NldCA9IHNyY3NldDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3JjKSB7XG4gICAgICAgICAgaW1hZ2Uuc3JjID0gc3JjO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvblJlYWR5KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGltYWdlIGFscmVhZHkgbG9hZGVkLi4uXG4gICAgICBvblJlYWR5KCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJlbG9hZEltYWdlcyAoKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgc3dpcGVyLmltYWdlc1RvTG9hZCA9IHN3aXBlci4kZWwuZmluZCgnaW1nJyk7XG4gICAgZnVuY3Rpb24gb25SZWFkeSgpIHtcbiAgICAgIGlmICh0eXBlb2Ygc3dpcGVyID09PSAndW5kZWZpbmVkJyB8fCBzd2lwZXIgPT09IG51bGwgfHwgIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgaWYgKHN3aXBlci5pbWFnZXNMb2FkZWQgIT09IHVuZGVmaW5lZCkgeyBzd2lwZXIuaW1hZ2VzTG9hZGVkICs9IDE7IH1cbiAgICAgIGlmIChzd2lwZXIuaW1hZ2VzTG9hZGVkID09PSBzd2lwZXIuaW1hZ2VzVG9Mb2FkLmxlbmd0aCkge1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy51cGRhdGVPbkltYWdlc1JlYWR5KSB7IHN3aXBlci51cGRhdGUoKTsgfVxuICAgICAgICBzd2lwZXIuZW1pdCgnaW1hZ2VzUmVhZHknKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXIuaW1hZ2VzVG9Mb2FkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICB2YXIgaW1hZ2VFbCA9IHN3aXBlci5pbWFnZXNUb0xvYWRbaV07XG4gICAgICBzd2lwZXIubG9hZEltYWdlKFxuICAgICAgICBpbWFnZUVsLFxuICAgICAgICBpbWFnZUVsLmN1cnJlbnRTcmMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NyYycpLFxuICAgICAgICBpbWFnZUVsLnNyY3NldCB8fCBpbWFnZUVsLmdldEF0dHJpYnV0ZSgnc3Jjc2V0JyksXG4gICAgICAgIGltYWdlRWwuc2l6ZXMgfHwgaW1hZ2VFbC5nZXRBdHRyaWJ1dGUoJ3NpemVzJyksXG4gICAgICAgIHRydWUsXG4gICAgICAgIG9uUmVhZHlcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGltYWdlcyA9IHtcbiAgICBsb2FkSW1hZ2U6IGxvYWRJbWFnZSxcbiAgICBwcmVsb2FkSW1hZ2VzOiBwcmVsb2FkSW1hZ2VzLFxuICB9O1xuXG4gIGZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3coKSB7XG4gICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgdmFyIHdhc0xvY2tlZCA9IHN3aXBlci5pc0xvY2tlZDtcblxuICAgIHN3aXBlci5pc0xvY2tlZCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggPT09IDE7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSAhc3dpcGVyLmlzTG9ja2VkO1xuXG4gICAgLy8gZXZlbnRzXG4gICAgaWYgKHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7IHN3aXBlci5lbWl0KHN3aXBlci5pc0xvY2tlZCA/ICdsb2NrJyA6ICd1bmxvY2snKTsgfVxuXG4gICAgaWYgKHdhc0xvY2tlZCAmJiB3YXNMb2NrZWQgIT09IHN3aXBlci5pc0xvY2tlZCkge1xuICAgICAgc3dpcGVyLmlzRW5kID0gZmFsc2U7XG4gICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hlY2tPdmVyZmxvdyQxID0geyBjaGVja092ZXJmbG93OiBjaGVja092ZXJmbG93IH07XG5cbiAgdmFyIGRlZmF1bHRzID0ge1xuICAgIGluaXQ6IHRydWUsXG4gICAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gICAgdG91Y2hFdmVudHNUYXJnZXQ6ICdjb250YWluZXInLFxuICAgIGluaXRpYWxTbGlkZTogMCxcbiAgICBzcGVlZDogMzAwLFxuICAgIGNzc01vZGU6IGZhbHNlLFxuICAgIC8vXG4gICAgcHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uOiBmYWxzZSxcblxuICAgIC8vIFRvIHN1cHBvcnQgaU9TJ3Mgc3dpcGUtdG8tZ28tYmFjayBnZXN0dXJlICh3aGVuIGJlaW5nIHVzZWQgaW4tYXBwLCB3aXRoIFVJV2ViVmlldykuXG4gICAgZWRnZVN3aXBlRGV0ZWN0aW9uOiBmYWxzZSxcbiAgICBlZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuXG4gICAgLy8gRnJlZSBtb2RlXG4gICAgZnJlZU1vZGU6IGZhbHNlLFxuICAgIGZyZWVNb2RlTW9tZW50dW06IHRydWUsXG4gICAgZnJlZU1vZGVNb21lbnR1bVJhdGlvOiAxLFxuICAgIGZyZWVNb2RlTW9tZW50dW1Cb3VuY2U6IHRydWUsXG4gICAgZnJlZU1vZGVNb21lbnR1bUJvdW5jZVJhdGlvOiAxLFxuICAgIGZyZWVNb2RlTW9tZW50dW1WZWxvY2l0eVJhdGlvOiAxLFxuICAgIGZyZWVNb2RlU3RpY2t5OiBmYWxzZSxcbiAgICBmcmVlTW9kZU1pbmltdW1WZWxvY2l0eTogMC4wMixcblxuICAgIC8vIEF1dG9oZWlnaHRcbiAgICBhdXRvSGVpZ2h0OiBmYWxzZSxcblxuICAgIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gICAgc2V0V3JhcHBlclNpemU6IGZhbHNlLFxuXG4gICAgLy8gVmlydHVhbCBUcmFuc2xhdGVcbiAgICB2aXJ0dWFsVHJhbnNsYXRlOiBmYWxzZSxcblxuICAgIC8vIEVmZmVjdHNcbiAgICBlZmZlY3Q6ICdzbGlkZScsIC8vICdzbGlkZScgb3IgJ2ZhZGUnIG9yICdjdWJlJyBvciAnY292ZXJmbG93JyBvciAnZmxpcCdcblxuICAgIC8vIEJyZWFrcG9pbnRzXG4gICAgYnJlYWtwb2ludHM6IHVuZGVmaW5lZCxcblxuICAgIC8vIFNsaWRlcyBncmlkXG4gICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgIHNsaWRlc1BlckNvbHVtbkZpbGw6ICdjb2x1bW4nLFxuICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsIC8vIGluIHB4XG4gICAgc2xpZGVzT2Zmc2V0QWZ0ZXI6IDAsIC8vIGluIHB4XG4gICAgbm9ybWFsaXplU2xpZGVJbmRleDogdHJ1ZSxcbiAgICBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IGZhbHNlLFxuXG4gICAgLy8gRGlzYWJsZSBzd2lwZXIgYW5kIGhpZGUgbmF2aWdhdGlvbiB3aGVuIGNvbnRhaW5lciBub3Qgb3ZlcmZsb3dcbiAgICB3YXRjaE92ZXJmbG93OiBmYWxzZSxcblxuICAgIC8vIFJvdW5kIGxlbmd0aFxuICAgIHJvdW5kTGVuZ3RoczogZmFsc2UsXG5cbiAgICAvLyBUb3VjaGVzXG4gICAgdG91Y2hSYXRpbzogMSxcbiAgICB0b3VjaEFuZ2xlOiA0NSxcbiAgICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxuICAgIHNob3J0U3dpcGVzOiB0cnVlLFxuICAgIGxvbmdTd2lwZXM6IHRydWUsXG4gICAgbG9uZ1N3aXBlc1JhdGlvOiAwLjUsXG4gICAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gICAgZm9sbG93RmluZ2VyOiB0cnVlLFxuICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuICAgIHRocmVzaG9sZDogMCxcbiAgICB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IGZhbHNlLFxuICAgIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogdHJ1ZSxcbiAgICB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogZmFsc2UsXG4gICAgdG91Y2hSZWxlYXNlT25FZGdlczogZmFsc2UsXG5cbiAgICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICAgIHVuaXF1ZU5hdkVsZW1lbnRzOiB0cnVlLFxuXG4gICAgLy8gUmVzaXN0YW5jZVxuICAgIHJlc2lzdGFuY2U6IHRydWUsXG4gICAgcmVzaXN0YW5jZVJhdGlvOiAwLjg1LFxuXG4gICAgLy8gUHJvZ3Jlc3NcbiAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcbiAgICB3YXRjaFNsaWRlc1Zpc2liaWxpdHk6IGZhbHNlLFxuXG4gICAgLy8gQ3Vyc29yXG4gICAgZ3JhYkN1cnNvcjogZmFsc2UsXG5cbiAgICAvLyBDbGlja3NcbiAgICBwcmV2ZW50Q2xpY2tzOiB0cnVlLFxuICAgIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZSxcblxuICAgIC8vIEltYWdlc1xuICAgIHByZWxvYWRJbWFnZXM6IHRydWUsXG4gICAgdXBkYXRlT25JbWFnZXNSZWFkeTogdHJ1ZSxcblxuICAgIC8vIGxvb3BcbiAgICBsb29wOiBmYWxzZSxcbiAgICBsb29wQWRkaXRpb25hbFNsaWRlczogMCxcbiAgICBsb29wZWRTbGlkZXM6IG51bGwsXG4gICAgbG9vcEZpbGxHcm91cFdpdGhCbGFuazogZmFsc2UsXG5cbiAgICAvLyBTd2lwaW5nL25vIHN3aXBpbmdcbiAgICBhbGxvd1NsaWRlUHJldjogdHJ1ZSxcbiAgICBhbGxvd1NsaWRlTmV4dDogdHJ1ZSxcbiAgICBzd2lwZUhhbmRsZXI6IG51bGwsIC8vICcuc3dpcGUtaGFuZGxlcicsXG4gICAgbm9Td2lwaW5nOiB0cnVlLFxuICAgIG5vU3dpcGluZ0NsYXNzOiAnc3dpcGVyLW5vLXN3aXBpbmcnLFxuICAgIG5vU3dpcGluZ1NlbGVjdG9yOiBudWxsLFxuXG4gICAgLy8gUGFzc2l2ZSBMaXN0ZW5lcnNcbiAgICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuXG4gICAgLy8gTlNcbiAgICBjb250YWluZXJNb2RpZmllckNsYXNzOiAnc3dpcGVyLWNvbnRhaW5lci0nLCAvLyBORVdcbiAgICBzbGlkZUNsYXNzOiAnc3dpcGVyLXNsaWRlJyxcbiAgICBzbGlkZUJsYW5rQ2xhc3M6ICdzd2lwZXItc2xpZGUtaW52aXNpYmxlLWJsYW5rJyxcbiAgICBzbGlkZUFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWFjdGl2ZScsXG4gICAgc2xpZGVEdXBsaWNhdGVBY3RpdmVDbGFzczogJ3N3aXBlci1zbGlkZS1kdXBsaWNhdGUtYWN0aXZlJyxcbiAgICBzbGlkZVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS12aXNpYmxlJyxcbiAgICBzbGlkZUR1cGxpY2F0ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZScsXG4gICAgc2xpZGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtbmV4dCcsXG4gICAgc2xpZGVEdXBsaWNhdGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtZHVwbGljYXRlLW5leHQnLFxuICAgIHNsaWRlUHJldkNsYXNzOiAnc3dpcGVyLXNsaWRlLXByZXYnLFxuICAgIHNsaWRlRHVwbGljYXRlUHJldkNsYXNzOiAnc3dpcGVyLXNsaWRlLWR1cGxpY2F0ZS1wcmV2JyxcbiAgICB3cmFwcGVyQ2xhc3M6ICdzd2lwZXItd3JhcHBlcicsXG5cbiAgICAvLyBDYWxsYmFja3NcbiAgICBydW5DYWxsYmFja3NPbkluaXQ6IHRydWUsXG4gIH07XG5cbiAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiBcIm9mZlwiICovXG5cbiAgdmFyIHByb3RvdHlwZXMgPSB7XG4gICAgdXBkYXRlOiB1cGRhdGUsXG4gICAgdHJhbnNsYXRlOiB0cmFuc2xhdGUsXG4gICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbiQxLFxuICAgIHNsaWRlOiBzbGlkZSxcbiAgICBsb29wOiBsb29wLFxuICAgIGdyYWJDdXJzb3I6IGdyYWJDdXJzb3IsXG4gICAgbWFuaXB1bGF0aW9uOiBtYW5pcHVsYXRpb24sXG4gICAgZXZlbnRzOiBldmVudHMsXG4gICAgYnJlYWtwb2ludHM6IGJyZWFrcG9pbnRzLFxuICAgIGNoZWNrT3ZlcmZsb3c6IGNoZWNrT3ZlcmZsb3ckMSxcbiAgICBjbGFzc2VzOiBjbGFzc2VzLFxuICAgIGltYWdlczogaW1hZ2VzLFxuICB9O1xuXG4gIHZhciBleHRlbmRlZERlZmF1bHRzID0ge307XG5cbiAgdmFyIFN3aXBlciA9IC8qQF9fUFVSRV9fKi8oZnVuY3Rpb24gKFN3aXBlckNsYXNzKSB7XG4gICAgZnVuY3Rpb24gU3dpcGVyKCkge1xuICAgICAgdmFyIGFzc2lnbjtcblxuICAgICAgdmFyIGFyZ3MgPSBbXSwgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgIHdoaWxlICggbGVuLS0gKSBhcmdzWyBsZW4gXSA9IGFyZ3VtZW50c1sgbGVuIF07XG4gICAgICB2YXIgZWw7XG4gICAgICB2YXIgcGFyYW1zO1xuICAgICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGFyZ3NbMF0uY29uc3RydWN0b3IgJiYgYXJnc1swXS5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0KSB7XG4gICAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAoYXNzaWduID0gYXJncywgZWwgPSBhc3NpZ25bMF0sIHBhcmFtcyA9IGFzc2lnblsxXSk7XG4gICAgICB9XG4gICAgICBpZiAoIXBhcmFtcykgeyBwYXJhbXMgPSB7fTsgfVxuXG4gICAgICBwYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHBhcmFtcyk7XG4gICAgICBpZiAoZWwgJiYgIXBhcmFtcy5lbCkgeyBwYXJhbXMuZWwgPSBlbDsgfVxuXG4gICAgICBTd2lwZXJDbGFzcy5jYWxsKHRoaXMsIHBhcmFtcyk7XG5cbiAgICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXMpLmZvckVhY2goZnVuY3Rpb24gKHByb3RvdHlwZUdyb3VwKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdKS5mb3JFYWNoKGZ1bmN0aW9uIChwcm90b01ldGhvZCkge1xuICAgICAgICAgIGlmICghU3dpcGVyLnByb3RvdHlwZVtwcm90b01ldGhvZF0pIHtcbiAgICAgICAgICAgIFN3aXBlci5wcm90b3R5cGVbcHJvdG9NZXRob2RdID0gcHJvdG90eXBlc1twcm90b3R5cGVHcm91cF1bcHJvdG9NZXRob2RdO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU3dpcGVyIEluc3RhbmNlXG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLm1vZHVsZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHN3aXBlci5tb2R1bGVzID0ge307XG4gICAgICB9XG4gICAgICBPYmplY3Qua2V5cyhzd2lwZXIubW9kdWxlcykuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlTmFtZSkge1xuICAgICAgICB2YXIgbW9kdWxlID0gc3dpcGVyLm1vZHVsZXNbbW9kdWxlTmFtZV07XG4gICAgICAgIGlmIChtb2R1bGUucGFyYW1zKSB7XG4gICAgICAgICAgdmFyIG1vZHVsZVBhcmFtTmFtZSA9IE9iamVjdC5rZXlzKG1vZHVsZS5wYXJhbXMpWzBdO1xuICAgICAgICAgIHZhciBtb2R1bGVQYXJhbXMgPSBtb2R1bGUucGFyYW1zW21vZHVsZVBhcmFtTmFtZV07XG4gICAgICAgICAgaWYgKHR5cGVvZiBtb2R1bGVQYXJhbXMgIT09ICdvYmplY3QnIHx8IG1vZHVsZVBhcmFtcyA9PT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgICAgICBpZiAoIShtb2R1bGVQYXJhbU5hbWUgaW4gcGFyYW1zICYmICdlbmFibGVkJyBpbiBtb2R1bGVQYXJhbXMpKSB7IHJldHVybjsgfVxuICAgICAgICAgIGlmIChwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7IGVuYWJsZWQ6IHRydWUgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSAnb2JqZWN0J1xuICAgICAgICAgICAgJiYgISgnZW5hYmxlZCcgaW4gcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkgeyBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHsgZW5hYmxlZDogZmFsc2UgfTsgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gRXh0ZW5kIGRlZmF1bHRzIHdpdGggbW9kdWxlcyBwYXJhbXNcbiAgICAgIHZhciBzd2lwZXJQYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIGRlZmF1bHRzKTtcbiAgICAgIHN3aXBlci51c2VNb2R1bGVzUGFyYW1zKHN3aXBlclBhcmFtcyk7XG5cbiAgICAgIC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIHBhc3NlZCBwYXJhbXNcbiAgICAgIHN3aXBlci5wYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHN3aXBlclBhcmFtcywgZXh0ZW5kZWREZWZhdWx0cywgcGFyYW1zKTtcbiAgICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcyA9IFV0aWxzLmV4dGVuZCh7fSwgc3dpcGVyLnBhcmFtcyk7XG4gICAgICBzd2lwZXIucGFzc2VkUGFyYW1zID0gVXRpbHMuZXh0ZW5kKHt9LCBwYXJhbXMpO1xuXG4gICAgICAvLyBTYXZlIERvbSBsaWJcbiAgICAgIHN3aXBlci4kID0gJDtcblxuICAgICAgLy8gRmluZCBlbFxuICAgICAgdmFyICRlbCA9ICQoc3dpcGVyLnBhcmFtcy5lbCk7XG4gICAgICBlbCA9ICRlbFswXTtcblxuICAgICAgaWYgKCFlbCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBpZiAoJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIHN3aXBlcnMgPSBbXTtcbiAgICAgICAgJGVsLmVhY2goZnVuY3Rpb24gKGluZGV4LCBjb250YWluZXJFbCkge1xuICAgICAgICAgIHZhciBuZXdQYXJhbXMgPSBVdGlscy5leHRlbmQoe30sIHBhcmFtcywgeyBlbDogY29udGFpbmVyRWwgfSk7XG4gICAgICAgICAgc3dpcGVycy5wdXNoKG5ldyBTd2lwZXIobmV3UGFyYW1zKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc3dpcGVycztcbiAgICAgIH1cblxuICAgICAgZWwuc3dpcGVyID0gc3dpcGVyO1xuICAgICAgJGVsLmRhdGEoJ3N3aXBlcicsIHN3aXBlcik7XG5cbiAgICAgIC8vIEZpbmQgV3JhcHBlclxuICAgICAgdmFyICR3cmFwcGVyRWw7XG4gICAgICBpZiAoZWwgJiYgZWwuc2hhZG93Um9vdCAmJiBlbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgICAgJHdyYXBwZXJFbCA9ICQoZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKChcIi5cIiArIChzd2lwZXIucGFyYW1zLndyYXBwZXJDbGFzcykpKSk7XG4gICAgICAgIC8vIENoaWxkcmVuIG5lZWRzIHRvIHJldHVybiBzbG90IGl0ZW1zXG4gICAgICAgICR3cmFwcGVyRWwuY2hpbGRyZW4gPSBmdW5jdGlvbiAob3B0aW9ucykgeyByZXR1cm4gJGVsLmNoaWxkcmVuKG9wdGlvbnMpOyB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJHdyYXBwZXJFbCA9ICRlbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MpKSk7XG4gICAgICB9XG4gICAgICAvLyBFeHRlbmQgU3dpcGVyXG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgICRlbDogJGVsLFxuICAgICAgICBlbDogZWwsXG4gICAgICAgICR3cmFwcGVyRWw6ICR3cmFwcGVyRWwsXG4gICAgICAgIHdyYXBwZXJFbDogJHdyYXBwZXJFbFswXSxcblxuICAgICAgICAvLyBDbGFzc2VzXG4gICAgICAgIGNsYXNzTmFtZXM6IFtdLFxuXG4gICAgICAgIC8vIFNsaWRlc1xuICAgICAgICBzbGlkZXM6ICQoKSxcbiAgICAgICAgc2xpZGVzR3JpZDogW10sXG4gICAgICAgIHNuYXBHcmlkOiBbXSxcbiAgICAgICAgc2xpZGVzU2l6ZXNHcmlkOiBbXSxcblxuICAgICAgICAvLyBpc0RpcmVjdGlvblxuICAgICAgICBpc0hvcml6b250YWw6IGZ1bmN0aW9uIGlzSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgICAgfSxcbiAgICAgICAgaXNWZXJ0aWNhbDogZnVuY3Rpb24gaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgICAgIH0sXG4gICAgICAgIC8vIFJUTFxuICAgICAgICBydGw6IChlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gJ3J0bCcgfHwgJGVsLmNzcygnZGlyZWN0aW9uJykgPT09ICdydGwnKSxcbiAgICAgICAgcnRsVHJhbnNsYXRlOiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIChlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gJ3J0bCcgfHwgJGVsLmNzcygnZGlyZWN0aW9uJykgPT09ICdydGwnKSxcbiAgICAgICAgd3JvbmdSVEw6ICR3cmFwcGVyRWwuY3NzKCdkaXNwbGF5JykgPT09ICctd2Via2l0LWJveCcsXG5cbiAgICAgICAgLy8gSW5kZXhlc1xuICAgICAgICBhY3RpdmVJbmRleDogMCxcbiAgICAgICAgcmVhbEluZGV4OiAwLFxuXG4gICAgICAgIC8vXG4gICAgICAgIGlzQmVnaW5uaW5nOiB0cnVlLFxuICAgICAgICBpc0VuZDogZmFsc2UsXG5cbiAgICAgICAgLy8gUHJvcHNcbiAgICAgICAgdHJhbnNsYXRlOiAwLFxuICAgICAgICBwcmV2aW91c1RyYW5zbGF0ZTogMCxcbiAgICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICAgIHZlbG9jaXR5OiAwLFxuICAgICAgICBhbmltYXRpbmc6IGZhbHNlLFxuXG4gICAgICAgIC8vIExvY2tzXG4gICAgICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcblxuICAgICAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAgICAgdG91Y2hFdmVudHM6IChmdW5jdGlvbiB0b3VjaEV2ZW50cygpIHtcbiAgICAgICAgICB2YXIgdG91Y2ggPSBbJ3RvdWNoc3RhcnQnLCAndG91Y2htb3ZlJywgJ3RvdWNoZW5kJywgJ3RvdWNoY2FuY2VsJ107XG4gICAgICAgICAgdmFyIGRlc2t0b3AgPSBbJ21vdXNlZG93bicsICdtb3VzZW1vdmUnLCAnbW91c2V1cCddO1xuICAgICAgICAgIGlmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgICAgIGRlc2t0b3AgPSBbJ3BvaW50ZXJkb3duJywgJ3BvaW50ZXJtb3ZlJywgJ3BvaW50ZXJ1cCddO1xuICAgICAgICAgIH0gZWxzZSBpZiAoU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgICAgIGRlc2t0b3AgPSBbJ01TUG9pbnRlckRvd24nLCAnTVNQb2ludGVyTW92ZScsICdNU1BvaW50ZXJVcCddO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNUb3VjaCA9IHtcbiAgICAgICAgICAgIHN0YXJ0OiB0b3VjaFswXSxcbiAgICAgICAgICAgIG1vdmU6IHRvdWNoWzFdLFxuICAgICAgICAgICAgZW5kOiB0b3VjaFsyXSxcbiAgICAgICAgICAgIGNhbmNlbDogdG91Y2hbM10sXG4gICAgICAgICAgfTtcbiAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wID0ge1xuICAgICAgICAgICAgc3RhcnQ6IGRlc2t0b3BbMF0sXG4gICAgICAgICAgICBtb3ZlOiBkZXNrdG9wWzFdLFxuICAgICAgICAgICAgZW5kOiBkZXNrdG9wWzJdLFxuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIFN1cHBvcnQudG91Y2ggfHwgIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCA/IHN3aXBlci50b3VjaEV2ZW50c1RvdWNoIDogc3dpcGVyLnRvdWNoRXZlbnRzRGVza3RvcDtcbiAgICAgICAgfSgpKSxcbiAgICAgICAgdG91Y2hFdmVudHNEYXRhOiB7XG4gICAgICAgICAgaXNUb3VjaGVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0b3VjaFN0YXJ0VGltZTogdW5kZWZpbmVkLFxuICAgICAgICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgICAgICAgY3VycmVudFRyYW5zbGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXJ0VHJhbnNsYXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlOiB1bmRlZmluZWQsXG4gICAgICAgICAgLy8gRm9ybSBlbGVtZW50cyB0byBtYXRjaFxuICAgICAgICAgIGZvcm1FbGVtZW50czogJ2lucHV0LCBzZWxlY3QsIG9wdGlvbiwgdGV4dGFyZWEsIGJ1dHRvbiwgdmlkZW8nLFxuICAgICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICAgIGxhc3RDbGlja1RpbWU6IFV0aWxzLm5vdygpLFxuICAgICAgICAgIGNsaWNrVGltZW91dDogdW5kZWZpbmVkLFxuICAgICAgICAgIC8vIFZlbG9jaXRpZXNcbiAgICAgICAgICB2ZWxvY2l0aWVzOiBbXSxcbiAgICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlOiB1bmRlZmluZWQsXG4gICAgICAgICAgaXNUb3VjaEV2ZW50OiB1bmRlZmluZWQsXG4gICAgICAgICAgc3RhcnRNb3Zpbmc6IHVuZGVmaW5lZCxcbiAgICAgICAgfSxcblxuICAgICAgICAvLyBDbGlja3NcbiAgICAgICAgYWxsb3dDbGljazogdHJ1ZSxcblxuICAgICAgICAvLyBUb3VjaGVzXG4gICAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuXG4gICAgICAgIHRvdWNoZXM6IHtcbiAgICAgICAgICBzdGFydFg6IDAsXG4gICAgICAgICAgc3RhcnRZOiAwLFxuICAgICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICAgIGN1cnJlbnRZOiAwLFxuICAgICAgICAgIGRpZmY6IDAsXG4gICAgICAgIH0sXG5cbiAgICAgICAgLy8gSW1hZ2VzXG4gICAgICAgIGltYWdlc1RvTG9hZDogW10sXG4gICAgICAgIGltYWdlc0xvYWRlZDogMCxcblxuICAgICAgfSk7XG5cbiAgICAgIC8vIEluc3RhbGwgTW9kdWxlc1xuICAgICAgc3dpcGVyLnVzZU1vZHVsZXMoKTtcblxuICAgICAgLy8gSW5pdFxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaW5pdCkge1xuICAgICAgICBzd2lwZXIuaW5pdCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXR1cm4gYXBwIGluc3RhbmNlXG4gICAgICByZXR1cm4gc3dpcGVyO1xuICAgIH1cblxuICAgIGlmICggU3dpcGVyQ2xhc3MgKSBTd2lwZXIuX19wcm90b19fID0gU3dpcGVyQ2xhc3M7XG4gICAgU3dpcGVyLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoIFN3aXBlckNsYXNzICYmIFN3aXBlckNsYXNzLnByb3RvdHlwZSApO1xuICAgIFN3aXBlci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBTd2lwZXI7XG5cbiAgICB2YXIgc3RhdGljQWNjZXNzb3JzID0geyBleHRlbmRlZERlZmF1bHRzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LGRlZmF1bHRzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LENsYXNzOiB7IGNvbmZpZ3VyYWJsZTogdHJ1ZSB9LCQ6IHsgY29uZmlndXJhYmxlOiB0cnVlIH0gfTtcblxuICAgIFN3aXBlci5wcm90b3R5cGUuc2xpZGVzUGVyVmlld0R5bmFtaWMgPSBmdW5jdGlvbiBzbGlkZXNQZXJWaWV3RHluYW1pYyAoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gICAgICB2YXIgc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkO1xuICAgICAgdmFyIHN3aXBlclNpemUgPSBzd2lwZXIuc2l6ZTtcbiAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgIHZhciBzcHYgPSAxO1xuICAgICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICB2YXIgc2xpZGVTaXplID0gc2xpZGVzW2FjdGl2ZUluZGV4XS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgIHZhciBicmVha0xvb3A7XG4gICAgICAgIGZvciAodmFyIGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgeyBicmVha0xvb3AgPSB0cnVlOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkkMSA9IGFjdGl2ZUluZGV4IC0gMTsgaSQxID49IDA7IGkkMSAtPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpJDFdICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaSQxXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSB7IGJyZWFrTG9vcCA9IHRydWU7IH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkkMiA9IGFjdGl2ZUluZGV4ICsgMTsgaSQyIDwgc2xpZGVzLmxlbmd0aDsgaSQyICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzR3JpZFtpJDJdIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplKSB7XG4gICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBzcHY7XG4gICAgfTtcblxuICAgIFN3aXBlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlICgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cbiAgICAgIHZhciBzbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZDtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgLy8gQnJlYWtwb2ludHNcbiAgICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci51cGRhdGVTaXplKCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZVZhbHVlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgKiAtMSA6IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICAgIHZhciBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heCh0cmFuc2xhdGVWYWx1ZSwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICAgIH1cbiAgICAgIHZhciB0cmFuc2xhdGVkO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0cmFuc2xhdGVkKSB7XG4gICAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XG4gICAgICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgICB9XG4gICAgICBzd2lwZXIuZW1pdCgndXBkYXRlJyk7XG4gICAgfTtcblxuICAgIFN3aXBlci5wcm90b3R5cGUuY2hhbmdlRGlyZWN0aW9uID0gZnVuY3Rpb24gY2hhbmdlRGlyZWN0aW9uIChuZXdEaXJlY3Rpb24sIG5lZWRVcGRhdGUpIHtcbiAgICAgIGlmICggbmVlZFVwZGF0ZSA9PT0gdm9pZCAwICkgbmVlZFVwZGF0ZSA9IHRydWU7XG5cbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIGN1cnJlbnREaXJlY3Rpb24gPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbjtcbiAgICAgIGlmICghbmV3RGlyZWN0aW9uKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBuZXdEaXJlY3Rpb24gPSBjdXJyZW50RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgICAgfVxuICAgICAgaWYgKChuZXdEaXJlY3Rpb24gPT09IGN1cnJlbnREaXJlY3Rpb24pIHx8IChuZXdEaXJlY3Rpb24gIT09ICdob3Jpem9udGFsJyAmJiBuZXdEaXJlY3Rpb24gIT09ICd2ZXJ0aWNhbCcpKSB7XG4gICAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci4kZWxcbiAgICAgICAgLnJlbW92ZUNsYXNzKChcIlwiICsgKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBjdXJyZW50RGlyZWN0aW9uKSlcbiAgICAgICAgLmFkZENsYXNzKChcIlwiICsgKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBuZXdEaXJlY3Rpb24pKTtcblxuICAgICAgc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPSBuZXdEaXJlY3Rpb247XG5cbiAgICAgIHN3aXBlci5zbGlkZXMuZWFjaChmdW5jdGlvbiAoc2xpZGVJbmRleCwgc2xpZGVFbCkge1xuICAgICAgICBpZiAobmV3RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgICAgc2xpZGVFbC5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNsaWRlRWwuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBzd2lwZXIuZW1pdCgnY2hhbmdlRGlyZWN0aW9uJyk7XG4gICAgICBpZiAobmVlZFVwZGF0ZSkgeyBzd2lwZXIudXBkYXRlKCk7IH1cblxuICAgICAgcmV0dXJuIHN3aXBlcjtcbiAgICB9O1xuXG4gICAgU3dpcGVyLnByb3RvdHlwZS5pbml0ID0gZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVJbml0Jyk7XG5cbiAgICAgIC8vIFNldCBicmVha3BvaW50XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgQ2xhc3Nlc1xuICAgICAgc3dpcGVyLmFkZENsYXNzZXMoKTtcblxuICAgICAgLy8gQ3JlYXRlIGxvb3BcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIHNpemVcbiAgICAgIHN3aXBlci51cGRhdGVTaXplKCk7XG5cbiAgICAgIC8vIFVwZGF0ZSBzbGlkZXNcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykge1xuICAgICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgR3JhYiBDdXJzb3JcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMucHJlbG9hZEltYWdlcykge1xuICAgICAgICBzd2lwZXIucHJlbG9hZEltYWdlcygpO1xuICAgICAgfVxuXG4gICAgICAvLyBTbGlkZSBUbyBJbml0aWFsIFNsaWRlXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlICsgc3dpcGVyLmxvb3BlZFNsaWRlcywgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQXR0YWNoIGV2ZW50c1xuICAgICAgc3dpcGVyLmF0dGFjaEV2ZW50cygpO1xuXG4gICAgICAvLyBJbml0IEZsYWdcbiAgICAgIHN3aXBlci5pbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICAgIC8vIEVtaXRcbiAgICAgIHN3aXBlci5lbWl0KCdpbml0Jyk7XG4gICAgfTtcblxuICAgIFN3aXBlci5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uIGRlc3Ryb3kgKGRlbGV0ZUluc3RhbmNlLCBjbGVhblN0eWxlcykge1xuICAgICAgaWYgKCBkZWxldGVJbnN0YW5jZSA9PT0gdm9pZCAwICkgZGVsZXRlSW5zdGFuY2UgPSB0cnVlO1xuICAgICAgaWYgKCBjbGVhblN0eWxlcyA9PT0gdm9pZCAwICkgY2xlYW5TdHlsZXMgPSB0cnVlO1xuXG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG5cbiAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcyA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyLmRlc3Ryb3llZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZURlc3Ryb3knKTtcblxuICAgICAgLy8gSW5pdCBGbGFnXG4gICAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgICAgLy8gRGV0YWNoIGV2ZW50c1xuICAgICAgc3dpcGVyLmRldGFjaEV2ZW50cygpO1xuXG4gICAgICAvLyBEZXN0cm95IGxvb3BcbiAgICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2xlYW51cCBzdHlsZXNcbiAgICAgIGlmIChjbGVhblN0eWxlcykge1xuICAgICAgICBzd2lwZXIucmVtb3ZlQ2xhc3NlcygpO1xuICAgICAgICAkZWwucmVtb3ZlQXR0cignc3R5bGUnKTtcbiAgICAgICAgJHdyYXBwZXJFbC5yZW1vdmVBdHRyKCdzdHlsZScpO1xuICAgICAgICBpZiAoc2xpZGVzICYmIHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgICBzbGlkZXNcbiAgICAgICAgICAgIC5yZW1vdmVDbGFzcyhbXG4gICAgICAgICAgICAgIHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyxcbiAgICAgICAgICAgICAgcGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MsXG4gICAgICAgICAgICAgIHBhcmFtcy5zbGlkZU5leHRDbGFzcyxcbiAgICAgICAgICAgICAgcGFyYW1zLnNsaWRlUHJldkNsYXNzIF0uam9pbignICcpKVxuICAgICAgICAgICAgLnJlbW92ZUF0dHIoJ3N0eWxlJylcbiAgICAgICAgICAgIC5yZW1vdmVBdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHN3aXBlci5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAgIC8vIERldGFjaCBlbWl0dGVyIGV2ZW50c1xuICAgICAgT2JqZWN0LmtleXMoc3dpcGVyLmV2ZW50c0xpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIHN3aXBlci5vZmYoZXZlbnROYW1lKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoZGVsZXRlSW5zdGFuY2UgIT09IGZhbHNlKSB7XG4gICAgICAgIHN3aXBlci4kZWxbMF0uc3dpcGVyID0gbnVsbDtcbiAgICAgICAgc3dpcGVyLiRlbC5kYXRhKCdzd2lwZXInLCBudWxsKTtcbiAgICAgICAgVXRpbHMuZGVsZXRlUHJvcHMoc3dpcGVyKTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci5kZXN0cm95ZWQgPSB0cnVlO1xuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgU3dpcGVyLmV4dGVuZERlZmF1bHRzID0gZnVuY3Rpb24gZXh0ZW5kRGVmYXVsdHMgKG5ld0RlZmF1bHRzKSB7XG4gICAgICBVdGlscy5leHRlbmQoZXh0ZW5kZWREZWZhdWx0cywgbmV3RGVmYXVsdHMpO1xuICAgIH07XG5cbiAgICBzdGF0aWNBY2Nlc3NvcnMuZXh0ZW5kZWREZWZhdWx0cy5nZXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZXh0ZW5kZWREZWZhdWx0cztcbiAgICB9O1xuXG4gICAgc3RhdGljQWNjZXNzb3JzLmRlZmF1bHRzLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9O1xuXG4gICAgc3RhdGljQWNjZXNzb3JzLkNsYXNzLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBTd2lwZXJDbGFzcztcbiAgICB9O1xuXG4gICAgc3RhdGljQWNjZXNzb3JzLiQuZ2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuICQ7XG4gICAgfTtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKCBTd2lwZXIsIHN0YXRpY0FjY2Vzc29ycyApO1xuXG4gICAgcmV0dXJuIFN3aXBlcjtcbiAgfShTd2lwZXJDbGFzcykpO1xuXG4gIHZhciBEZXZpY2UkMSA9IHtcbiAgICBuYW1lOiAnZGV2aWNlJyxcbiAgICBwcm90bzoge1xuICAgICAgZGV2aWNlOiBEZXZpY2UsXG4gICAgfSxcbiAgICBzdGF0aWM6IHtcbiAgICAgIGRldmljZTogRGV2aWNlLFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIFN1cHBvcnQkMSA9IHtcbiAgICBuYW1lOiAnc3VwcG9ydCcsXG4gICAgcHJvdG86IHtcbiAgICAgIHN1cHBvcnQ6IFN1cHBvcnQsXG4gICAgfSxcbiAgICBzdGF0aWM6IHtcbiAgICAgIHN1cHBvcnQ6IFN1cHBvcnQsXG4gICAgfSxcbiAgfTtcblxuICB2YXIgQnJvd3NlciA9IChmdW5jdGlvbiBCcm93c2VyKCkge1xuICAgIGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgICAgdmFyIHVhID0gd2luLm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICAgIHJldHVybiAodWEuaW5kZXhPZignc2FmYXJpJykgPj0gMCAmJiB1YS5pbmRleE9mKCdjaHJvbWUnKSA8IDAgJiYgdWEuaW5kZXhPZignYW5kcm9pZCcpIDwgMCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBpc0VkZ2U6ICEhd2luLm5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2UvZyksXG4gICAgICBpc1NhZmFyaTogaXNTYWZhcmkoKSxcbiAgICAgIGlzVWlXZWJWaWV3OiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdCg/IS4qU2FmYXJpKS9pLnRlc3Qod2luLm5hdmlnYXRvci51c2VyQWdlbnQpLFxuICAgIH07XG4gIH0oKSk7XG5cbiAgdmFyIEJyb3dzZXIkMSA9IHtcbiAgICBuYW1lOiAnYnJvd3NlcicsXG4gICAgcHJvdG86IHtcbiAgICAgIGJyb3dzZXI6IEJyb3dzZXIsXG4gICAgfSxcbiAgICBzdGF0aWM6IHtcbiAgICAgIGJyb3dzZXI6IEJyb3dzZXIsXG4gICAgfSxcbiAgfTtcblxuICB2YXIgUmVzaXplID0ge1xuICAgIG5hbWU6ICdyZXNpemUnLFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgIHJlc2l6ZToge1xuICAgICAgICAgIHJlc2l6ZUhhbmRsZXI6IGZ1bmN0aW9uIHJlc2l6ZUhhbmRsZXIoKSB7XG4gICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlUmVzaXplJyk7XG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgncmVzaXplJyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXI6IGZ1bmN0aW9uIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcigpIHtcbiAgICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdvcmllbnRhdGlvbmNoYW5nZScpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgLy8gRW1pdCByZXNpemVcbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHN3aXBlci5yZXNpemUucmVzaXplSGFuZGxlcik7XG5cbiAgICAgICAgLy8gRW1pdCBvcmllbnRhdGlvbmNoYW5nZVxuICAgICAgICB3aW4uYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBzd2lwZXIucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgICB9LFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHdpbi5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzd2lwZXIucmVzaXplLnJlc2l6ZUhhbmRsZXIpO1xuICAgICAgICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBzd2lwZXIucmVzaXplLm9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIE9ic2VydmVyID0ge1xuICAgIGZ1bmM6IHdpbi5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbi5XZWJraXRNdXRhdGlvbk9ic2VydmVyLFxuICAgIGF0dGFjaDogZnVuY3Rpb24gYXR0YWNoKHRhcmdldCwgb3B0aW9ucykge1xuICAgICAgaWYgKCBvcHRpb25zID09PSB2b2lkIDAgKSBvcHRpb25zID0ge307XG5cbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICB2YXIgT2JzZXJ2ZXJGdW5jID0gT2JzZXJ2ZXIuZnVuYztcbiAgICAgIHZhciBvYnNlcnZlciA9IG5ldyBPYnNlcnZlckZ1bmMoZnVuY3Rpb24gKG11dGF0aW9ucykge1xuICAgICAgICAvLyBUaGUgb2JzZXJ2ZXJVcGRhdGUgZXZlbnQgc2hvdWxkIG9ubHkgYmUgdHJpZ2dlcmVkXG4gICAgICAgIC8vIG9uY2UgZGVzcGl0ZSB0aGUgbnVtYmVyIG9mIG11dGF0aW9ucy4gIEFkZGl0aW9uYWxcbiAgICAgICAgLy8gdHJpZ2dlcnMgYXJlIHJlZHVuZGFudCBhbmQgYXJlIHZlcnkgY29zdGx5XG4gICAgICAgIGlmIChtdXRhdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ29ic2VydmVyVXBkYXRlJywgbXV0YXRpb25zWzBdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9ic2VydmVyVXBkYXRlID0gZnVuY3Rpb24gb2JzZXJ2ZXJVcGRhdGUoKSB7XG4gICAgICAgICAgc3dpcGVyLmVtaXQoJ29ic2VydmVyVXBkYXRlJywgbXV0YXRpb25zWzBdKTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAod2luLnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICAgIHdpbi5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob2JzZXJ2ZXJVcGRhdGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdpbi5zZXRUaW1lb3V0KG9ic2VydmVyVXBkYXRlLCAwKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICAgIGF0dHJpYnV0ZXM6IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuYXR0cmlidXRlcyxcbiAgICAgICAgY2hpbGRMaXN0OiB0eXBlb2Ygb3B0aW9ucy5jaGlsZExpc3QgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuY2hpbGRMaXN0LFxuICAgICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGEsXG4gICAgICB9KTtcblxuICAgICAgc3dpcGVyLm9ic2VydmVyLm9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghU3VwcG9ydC5vYnNlcnZlciB8fCAhc3dpcGVyLnBhcmFtcy5vYnNlcnZlcikgeyByZXR1cm47IH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLm9ic2VydmVQYXJlbnRzKSB7XG4gICAgICAgIHZhciBjb250YWluZXJQYXJlbnRzID0gc3dpcGVyLiRlbC5wYXJlbnRzKCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIHN3aXBlci5vYnNlcnZlci5hdHRhY2goY29udGFpbmVyUGFyZW50c1tpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8vIE9ic2VydmUgY29udGFpbmVyXG4gICAgICBzd2lwZXIub2JzZXJ2ZXIuYXR0YWNoKHN3aXBlci4kZWxbMF0sIHsgY2hpbGRMaXN0OiBzd2lwZXIucGFyYW1zLm9ic2VydmVTbGlkZUNoaWxkcmVuIH0pO1xuXG4gICAgICAvLyBPYnNlcnZlIHdyYXBwZXJcbiAgICAgIHN3aXBlci5vYnNlcnZlci5hdHRhY2goc3dpcGVyLiR3cmFwcGVyRWxbMF0sIHsgYXR0cmlidXRlczogZmFsc2UgfSk7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIub2JzZXJ2ZXIub2JzZXJ2ZXJzLmZvckVhY2goZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLm9ic2VydmVyLm9ic2VydmVycyA9IFtdO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIE9ic2VydmVyJDEgPSB7XG4gICAgbmFtZTogJ29ic2VydmVyJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIG9ic2VydmVyOiBmYWxzZSxcbiAgICAgIG9ic2VydmVQYXJlbnRzOiBmYWxzZSxcbiAgICAgIG9ic2VydmVTbGlkZUNoaWxkcmVuOiBmYWxzZSxcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgIG9ic2VydmVyOiB7XG4gICAgICAgICAgaW5pdDogT2JzZXJ2ZXIuaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgICAgYXR0YWNoOiBPYnNlcnZlci5hdHRhY2guYmluZChzd2lwZXIpLFxuICAgICAgICAgIGRlc3Ryb3k6IE9ic2VydmVyLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICAgIG9ic2VydmVyczogW10sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLm9ic2VydmVyLmluaXQoKTtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLm9ic2VydmVyLmRlc3Ryb3koKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgVmlydHVhbCA9IHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShmb3JjZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcmVmID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIHZhciBzbGlkZXNQZXJWaWV3ID0gcmVmLnNsaWRlc1BlclZpZXc7XG4gICAgICB2YXIgc2xpZGVzUGVyR3JvdXAgPSByZWYuc2xpZGVzUGVyR3JvdXA7XG4gICAgICB2YXIgY2VudGVyZWRTbGlkZXMgPSByZWYuY2VudGVyZWRTbGlkZXM7XG4gICAgICB2YXIgcmVmJDEgPSBzd2lwZXIucGFyYW1zLnZpcnR1YWw7XG4gICAgICB2YXIgYWRkU2xpZGVzQmVmb3JlID0gcmVmJDEuYWRkU2xpZGVzQmVmb3JlO1xuICAgICAgdmFyIGFkZFNsaWRlc0FmdGVyID0gcmVmJDEuYWRkU2xpZGVzQWZ0ZXI7XG4gICAgICB2YXIgcmVmJDIgPSBzd2lwZXIudmlydHVhbDtcbiAgICAgIHZhciBwcmV2aW91c0Zyb20gPSByZWYkMi5mcm9tO1xuICAgICAgdmFyIHByZXZpb3VzVG8gPSByZWYkMi50bztcbiAgICAgIHZhciBzbGlkZXMgPSByZWYkMi5zbGlkZXM7XG4gICAgICB2YXIgcHJldmlvdXNTbGlkZXNHcmlkID0gcmVmJDIuc2xpZGVzR3JpZDtcbiAgICAgIHZhciByZW5kZXJTbGlkZSA9IHJlZiQyLnJlbmRlclNsaWRlO1xuICAgICAgdmFyIHByZXZpb3VzT2Zmc2V0ID0gcmVmJDIub2Zmc2V0O1xuICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcblxuICAgICAgdmFyIG9mZnNldFByb3A7XG4gICAgICBpZiAoc3dpcGVyLnJ0bFRyYW5zbGF0ZSkgeyBvZmZzZXRQcm9wID0gJ3JpZ2h0JzsgfVxuICAgICAgZWxzZSB7IG9mZnNldFByb3AgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJzsgfVxuXG4gICAgICB2YXIgc2xpZGVzQWZ0ZXI7XG4gICAgICB2YXIgc2xpZGVzQmVmb3JlO1xuICAgICAgaWYgKGNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgIHNsaWRlc0FmdGVyID0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyBzbGlkZXNQZXJHcm91cCArIGFkZFNsaWRlc0JlZm9yZTtcbiAgICAgICAgc2xpZGVzQmVmb3JlID0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyBzbGlkZXNQZXJHcm91cCArIGFkZFNsaWRlc0FmdGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVzQWZ0ZXIgPSBzbGlkZXNQZXJWaWV3ICsgKHNsaWRlc1Blckdyb3VwIC0gMSkgKyBhZGRTbGlkZXNCZWZvcmU7XG4gICAgICAgIHNsaWRlc0JlZm9yZSA9IHNsaWRlc1Blckdyb3VwICsgYWRkU2xpZGVzQWZ0ZXI7XG4gICAgICB9XG4gICAgICB2YXIgZnJvbSA9IE1hdGgubWF4KChhY3RpdmVJbmRleCB8fCAwKSAtIHNsaWRlc0JlZm9yZSwgMCk7XG4gICAgICB2YXIgdG8gPSBNYXRoLm1pbigoYWN0aXZlSW5kZXggfHwgMCkgKyBzbGlkZXNBZnRlciwgc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgICAgdmFyIG9mZnNldCA9IChzd2lwZXIuc2xpZGVzR3JpZFtmcm9tXSB8fCAwKSAtIChzd2lwZXIuc2xpZGVzR3JpZFswXSB8fCAwKTtcblxuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci52aXJ0dWFsLCB7XG4gICAgICAgIGZyb206IGZyb20sXG4gICAgICAgIHRvOiB0byxcbiAgICAgICAgb2Zmc2V0OiBvZmZzZXQsXG4gICAgICAgIHNsaWRlc0dyaWQ6IHN3aXBlci5zbGlkZXNHcmlkLFxuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIG9uUmVuZGVyZWQoKSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIGlmIChzd2lwZXIubGF6eSAmJiBzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAocHJldmlvdXNGcm9tID09PSBmcm9tICYmIHByZXZpb3VzVG8gPT09IHRvICYmICFmb3JjZSkge1xuICAgICAgICBpZiAoc3dpcGVyLnNsaWRlc0dyaWQgIT09IHByZXZpb3VzU2xpZGVzR3JpZCAmJiBvZmZzZXQgIT09IHByZXZpb3VzT2Zmc2V0KSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlcy5jc3Mob2Zmc2V0UHJvcCwgKG9mZnNldCArIFwicHhcIikpO1xuICAgICAgICB9XG4gICAgICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLnJlbmRlckV4dGVybmFsKSB7XG4gICAgICAgIHN3aXBlci5wYXJhbXMudmlydHVhbC5yZW5kZXJFeHRlcm5hbC5jYWxsKHN3aXBlciwge1xuICAgICAgICAgIG9mZnNldDogb2Zmc2V0LFxuICAgICAgICAgIGZyb206IGZyb20sXG4gICAgICAgICAgdG86IHRvLFxuICAgICAgICAgIHNsaWRlczogKGZ1bmN0aW9uIGdldFNsaWRlcygpIHtcbiAgICAgICAgICAgIHZhciBzbGlkZXNUb1JlbmRlciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IGZyb207IGkgPD0gdG87IGkgKz0gMSkge1xuICAgICAgICAgICAgICBzbGlkZXNUb1JlbmRlci5wdXNoKHNsaWRlc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2xpZGVzVG9SZW5kZXI7XG4gICAgICAgICAgfSgpKSxcbiAgICAgICAgfSk7XG4gICAgICAgIG9uUmVuZGVyZWQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHByZXBlbmRJbmRleGVzID0gW107XG4gICAgICB2YXIgYXBwZW5kSW5kZXhlcyA9IFtdO1xuICAgICAgaWYgKGZvcmNlKSB7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmZpbmQoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykpKS5yZW1vdmUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBwcmV2aW91c0Zyb207IGkgPD0gcHJldmlvdXNUbzsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGkgPCBmcm9tIHx8IGkgPiB0bykge1xuICAgICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuZmluZCgoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSArIFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGkgKyBcIlxcXCJdXCIpKS5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkkMSA9IDA7IGkkMSA8IHNsaWRlcy5sZW5ndGg7IGkkMSArPSAxKSB7XG4gICAgICAgIGlmIChpJDEgPj0gZnJvbSAmJiBpJDEgPD0gdG8pIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHByZXZpb3VzVG8gPT09ICd1bmRlZmluZWQnIHx8IGZvcmNlKSB7XG4gICAgICAgICAgICBhcHBlbmRJbmRleGVzLnB1c2goaSQxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGkkMSA+IHByZXZpb3VzVG8pIHsgYXBwZW5kSW5kZXhlcy5wdXNoKGkkMSk7IH1cbiAgICAgICAgICAgIGlmIChpJDEgPCBwcmV2aW91c0Zyb20pIHsgcHJlcGVuZEluZGV4ZXMucHVzaChpJDEpOyB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhcHBlbmRJbmRleGVzLmZvckVhY2goZnVuY3Rpb24gKGluZGV4KSB7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLmFwcGVuZChyZW5kZXJTbGlkZShzbGlkZXNbaW5kZXhdLCBpbmRleCkpO1xuICAgICAgfSk7XG4gICAgICBwcmVwZW5kSW5kZXhlcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBiIC0gYTsgfSkuZm9yRWFjaChmdW5jdGlvbiAoaW5kZXgpIHtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwucHJlcGVuZChyZW5kZXJTbGlkZShzbGlkZXNbaW5kZXhdLCBpbmRleCkpO1xuICAgICAgfSk7XG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbignLnN3aXBlci1zbGlkZScpLmNzcyhvZmZzZXRQcm9wLCAob2Zmc2V0ICsgXCJweFwiKSk7XG4gICAgICBvblJlbmRlcmVkKCk7XG4gICAgfSxcbiAgICByZW5kZXJTbGlkZTogZnVuY3Rpb24gcmVuZGVyU2xpZGUoc2xpZGUsIGluZGV4KSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnZpcnR1YWw7XG4gICAgICBpZiAocGFyYW1zLmNhY2hlICYmIHN3aXBlci52aXJ0dWFsLmNhY2hlW2luZGV4XSkge1xuICAgICAgICByZXR1cm4gc3dpcGVyLnZpcnR1YWwuY2FjaGVbaW5kZXhdO1xuICAgICAgfVxuICAgICAgdmFyICRzbGlkZUVsID0gcGFyYW1zLnJlbmRlclNsaWRlXG4gICAgICAgID8gJChwYXJhbXMucmVuZGVyU2xpZGUuY2FsbChzd2lwZXIsIHNsaWRlLCBpbmRleCkpXG4gICAgICAgIDogJCgoXCI8ZGl2IGNsYXNzPVxcXCJcIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpICsgXCJcXFwiIGRhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIGluZGV4ICsgXCJcXFwiPlwiICsgc2xpZGUgKyBcIjwvZGl2PlwiKSk7XG4gICAgICBpZiAoISRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykpIHsgJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnLCBpbmRleCk7IH1cbiAgICAgIGlmIChwYXJhbXMuY2FjaGUpIHsgc3dpcGVyLnZpcnR1YWwuY2FjaGVbaW5kZXhdID0gJHNsaWRlRWw7IH1cbiAgICAgIHJldHVybiAkc2xpZGVFbDtcbiAgICB9LFxuICAgIGFwcGVuZFNsaWRlOiBmdW5jdGlvbiBhcHBlbmRTbGlkZShzbGlkZXMpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZXMgPT09ICdvYmplY3QnICYmICdsZW5ndGgnIGluIHNsaWRlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZXNbaV0pIHsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnB1c2goc2xpZGVzW2ldKTsgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIudmlydHVhbC5zbGlkZXMucHVzaChzbGlkZXMpO1xuICAgICAgfVxuICAgICAgc3dpcGVyLnZpcnR1YWwudXBkYXRlKHRydWUpO1xuICAgIH0sXG4gICAgcHJlcGVuZFNsaWRlOiBmdW5jdGlvbiBwcmVwZW5kU2xpZGUoc2xpZGVzKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgIHZhciBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgMTtcbiAgICAgIHZhciBudW1iZXJPZk5ld1NsaWRlcyA9IDE7XG5cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNsaWRlcykpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzW2ldKSB7IHN3aXBlci52aXJ0dWFsLnNsaWRlcy51bnNoaWZ0KHNsaWRlc1tpXSk7IH1cbiAgICAgICAgfVxuICAgICAgICBuZXdBY3RpdmVJbmRleCA9IGFjdGl2ZUluZGV4ICsgc2xpZGVzLmxlbmd0aDtcbiAgICAgICAgbnVtYmVyT2ZOZXdTbGlkZXMgPSBzbGlkZXMubGVuZ3RoO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnVuc2hpZnQoc2xpZGVzKTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gc3dpcGVyLnZpcnR1YWwuY2FjaGU7XG4gICAgICAgIHZhciBuZXdDYWNoZSA9IHt9O1xuICAgICAgICBPYmplY3Qua2V5cyhjYWNoZSkuZm9yRWFjaChmdW5jdGlvbiAoY2FjaGVkSW5kZXgpIHtcbiAgICAgICAgICB2YXIgJGNhY2hlZEVsID0gY2FjaGVbY2FjaGVkSW5kZXhdO1xuICAgICAgICAgIHZhciBjYWNoZWRFbEluZGV4ID0gJGNhY2hlZEVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgICAgaWYgKGNhY2hlZEVsSW5kZXgpIHtcbiAgICAgICAgICAgICRjYWNoZWRFbC5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIHBhcnNlSW50KGNhY2hlZEVsSW5kZXgsIDEwKSArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuZXdDYWNoZVtwYXJzZUludChjYWNoZWRJbmRleCwgMTApICsgbnVtYmVyT2ZOZXdTbGlkZXNdID0gJGNhY2hlZEVsO1xuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLnZpcnR1YWwuY2FjaGUgPSBuZXdDYWNoZTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0FjdGl2ZUluZGV4LCAwKTtcbiAgICB9LFxuICAgIHJlbW92ZVNsaWRlOiBmdW5jdGlvbiByZW1vdmVTbGlkZShzbGlkZXNJbmRleGVzKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVzSW5kZXhlcyA9PT0gJ3VuZGVmaW5lZCcgfHwgc2xpZGVzSW5kZXhlcyA9PT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICAgIHZhciBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHNsaWRlc0luZGV4ZXMpKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSBzbGlkZXNJbmRleGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwuc2xpZGVzLnNwbGljZShzbGlkZXNJbmRleGVzW2ldLCAxKTtcbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmNhY2hlKSB7XG4gICAgICAgICAgICBkZWxldGUgc3dpcGVyLnZpcnR1YWwuY2FjaGVbc2xpZGVzSW5kZXhlc1tpXV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzbGlkZXNJbmRleGVzW2ldIDwgYWN0aXZlSW5kZXgpIHsgYWN0aXZlSW5kZXggLT0gMTsgfVxuICAgICAgICAgIGFjdGl2ZUluZGV4ID0gTWF0aC5tYXgoYWN0aXZlSW5kZXgsIDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIudmlydHVhbC5zbGlkZXMuc3BsaWNlKHNsaWRlc0luZGV4ZXMsIDEpO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmNhY2hlKSB7XG4gICAgICAgICAgZGVsZXRlIHN3aXBlci52aXJ0dWFsLmNhY2hlW3NsaWRlc0luZGV4ZXNdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzbGlkZXNJbmRleGVzIDwgYWN0aXZlSW5kZXgpIHsgYWN0aXZlSW5kZXggLT0gMTsgfVxuICAgICAgICBhY3RpdmVJbmRleCA9IE1hdGgubWF4KGFjdGl2ZUluZGV4LCAwKTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgIHN3aXBlci5zbGlkZVRvKGFjdGl2ZUluZGV4LCAwKTtcbiAgICB9LFxuICAgIHJlbW92ZUFsbFNsaWRlczogZnVuY3Rpb24gcmVtb3ZlQWxsU2xpZGVzKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIudmlydHVhbC5zbGlkZXMgPSBbXTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWwuY2FjaGUpIHtcbiAgICAgICAgc3dpcGVyLnZpcnR1YWwuY2FjaGUgPSB7fTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSh0cnVlKTtcbiAgICAgIHN3aXBlci5zbGlkZVRvKDAsIDApO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIFZpcnR1YWwkMSA9IHtcbiAgICBuYW1lOiAndmlydHVhbCcsXG4gICAgcGFyYW1zOiB7XG4gICAgICB2aXJ0dWFsOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzbGlkZXM6IFtdLFxuICAgICAgICBjYWNoZTogdHJ1ZSxcbiAgICAgICAgcmVuZGVyU2xpZGU6IG51bGwsXG4gICAgICAgIHJlbmRlckV4dGVybmFsOiBudWxsLFxuICAgICAgICBhZGRTbGlkZXNCZWZvcmU6IDAsXG4gICAgICAgIGFkZFNsaWRlc0FmdGVyOiAwLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgIHZpcnR1YWw6IHtcbiAgICAgICAgICB1cGRhdGU6IFZpcnR1YWwudXBkYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBhcHBlbmRTbGlkZTogVmlydHVhbC5hcHBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgcHJlcGVuZFNsaWRlOiBWaXJ0dWFsLnByZXBlbmRTbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgcmVtb3ZlU2xpZGU6IFZpcnR1YWwucmVtb3ZlU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHJlbW92ZUFsbFNsaWRlczogVmlydHVhbC5yZW1vdmVBbGxTbGlkZXMuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHJlbmRlclNsaWRlOiBWaXJ0dWFsLnJlbmRlclNsaWRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBzbGlkZXM6IHN3aXBlci5wYXJhbXMudmlydHVhbC5zbGlkZXMsXG4gICAgICAgICAgY2FjaGU6IHt9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goKChzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpICsgXCJ2aXJ0dWFsXCIpKTtcbiAgICAgICAgdmFyIG92ZXJ3cml0ZVBhcmFtcyA9IHtcbiAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zKTtcblxuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlKSB7XG4gICAgICAgICAgc3dpcGVyLnZpcnR1YWwudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci52aXJ0dWFsLnVwZGF0ZSgpO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHZhciBLZXlib2FyZCA9IHtcbiAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZTtcbiAgICAgIHZhciBlID0gZXZlbnQ7XG4gICAgICBpZiAoZS5vcmlnaW5hbEV2ZW50KSB7IGUgPSBlLm9yaWdpbmFsRXZlbnQ7IH0gLy8ganF1ZXJ5IGZpeFxuICAgICAgdmFyIGtjID0gZS5rZXlDb2RlIHx8IGUuY2hhckNvZGU7XG4gICAgICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiAoKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBrYyA9PT0gMzkpIHx8IChzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGtjID09PSA0MCkgfHwga2MgPT09IDM0KSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiAoKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBrYyA9PT0gMzcpIHx8IChzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIGtjID09PSAzOCkgfHwga2MgPT09IDMzKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoZS5zaGlmdEtleSB8fCBlLmFsdEtleSB8fCBlLmN0cmxLZXkgfHwgZS5tZXRhS2V5KSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgJiYgZG9jLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUgJiYgKGRvYy5hY3RpdmVFbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdpbnB1dCcgfHwgZG9jLmFjdGl2ZUVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ3RleHRhcmVhJykpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmtleWJvYXJkLm9ubHlJblZpZXdwb3J0ICYmIChrYyA9PT0gMzMgfHwga2MgPT09IDM0IHx8IGtjID09PSAzNyB8fCBrYyA9PT0gMzkgfHwga2MgPT09IDM4IHx8IGtjID09PSA0MCkpIHtcbiAgICAgICAgdmFyIGluVmlldyA9IGZhbHNlO1xuICAgICAgICAvLyBDaGVjayB0aGF0IHN3aXBlciBzaG91bGQgYmUgaW5zaWRlIG9mIHZpc2libGUgYXJlYSBvZiB3aW5kb3dcbiAgICAgICAgaWYgKHN3aXBlci4kZWwucGFyZW50cygoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSkpLmxlbmd0aCA+IDAgJiYgc3dpcGVyLiRlbC5wYXJlbnRzKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpKSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgd2luZG93V2lkdGggPSB3aW4uaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdpbmRvd0hlaWdodCA9IHdpbi5pbm5lckhlaWdodDtcbiAgICAgICAgdmFyIHN3aXBlck9mZnNldCA9IHN3aXBlci4kZWwub2Zmc2V0KCk7XG4gICAgICAgIGlmIChydGwpIHsgc3dpcGVyT2Zmc2V0LmxlZnQgLT0gc3dpcGVyLiRlbFswXS5zY3JvbGxMZWZ0OyB9XG4gICAgICAgIHZhciBzd2lwZXJDb29yZCA9IFtcbiAgICAgICAgICBbc3dpcGVyT2Zmc2V0LmxlZnQsIHN3aXBlck9mZnNldC50b3BdLFxuICAgICAgICAgIFtzd2lwZXJPZmZzZXQubGVmdCArIHN3aXBlci53aWR0aCwgc3dpcGVyT2Zmc2V0LnRvcF0sXG4gICAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0LCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVyLmhlaWdodF0sXG4gICAgICAgICAgW3N3aXBlck9mZnNldC5sZWZ0ICsgc3dpcGVyLndpZHRoLCBzd2lwZXJPZmZzZXQudG9wICsgc3dpcGVyLmhlaWdodF0gXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzd2lwZXJDb29yZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIHZhciBwb2ludCA9IHN3aXBlckNvb3JkW2ldO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHBvaW50WzBdID49IDAgJiYgcG9pbnRbMF0gPD0gd2luZG93V2lkdGhcbiAgICAgICAgICAgICYmIHBvaW50WzFdID49IDAgJiYgcG9pbnRbMV0gPD0gd2luZG93SGVpZ2h0XG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBpblZpZXcgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWluVmlldykgeyByZXR1cm4gdW5kZWZpbmVkOyB9XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIGlmIChrYyA9PT0gMzMgfHwga2MgPT09IDM0IHx8IGtjID09PSAzNyB8fCBrYyA9PT0gMzkpIHtcbiAgICAgICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cbiAgICAgICAgICBlbHNlIHsgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCgoa2MgPT09IDM0IHx8IGtjID09PSAzOSkgJiYgIXJ0bCkgfHwgKChrYyA9PT0gMzMgfHwga2MgPT09IDM3KSAmJiBydGwpKSB7IHN3aXBlci5zbGlkZU5leHQoKTsgfVxuICAgICAgICBpZiAoKChrYyA9PT0gMzMgfHwga2MgPT09IDM3KSAmJiAhcnRsKSB8fCAoKGtjID09PSAzNCB8fCBrYyA9PT0gMzkpICYmIHJ0bCkpIHsgc3dpcGVyLnNsaWRlUHJldigpOyB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoa2MgPT09IDMzIHx8IGtjID09PSAzNCB8fCBrYyA9PT0gMzggfHwga2MgPT09IDQwKSB7XG4gICAgICAgICAgaWYgKGUucHJldmVudERlZmF1bHQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgICAgICAgZWxzZSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChrYyA9PT0gMzQgfHwga2MgPT09IDQwKSB7IHN3aXBlci5zbGlkZU5leHQoKTsgfVxuICAgICAgICBpZiAoa2MgPT09IDMzIHx8IGtjID09PSAzOCkgeyBzd2lwZXIuc2xpZGVQcmV2KCk7IH1cbiAgICAgIH1cbiAgICAgIHN3aXBlci5lbWl0KCdrZXlQcmVzcycsIGtjKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfSxcbiAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgJChkb2MpLm9uKCdrZXlkb3duJywgc3dpcGVyLmtleWJvYXJkLmhhbmRsZSk7XG4gICAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlZCA9IHRydWU7XG4gICAgfSxcbiAgICBkaXNhYmxlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgJChkb2MpLm9mZigna2V5ZG93bicsIHN3aXBlci5rZXlib2FyZC5oYW5kbGUpO1xuICAgICAgc3dpcGVyLmtleWJvYXJkLmVuYWJsZWQgPSBmYWxzZTtcbiAgICB9LFxuICB9O1xuXG4gIHZhciBLZXlib2FyZCQxID0ge1xuICAgIG5hbWU6ICdrZXlib2FyZCcsXG4gICAgcGFyYW1zOiB7XG4gICAgICBrZXlib2FyZDoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgb25seUluVmlld3BvcnQ6IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAga2V5Ym9hcmQ6IHtcbiAgICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICBlbmFibGU6IEtleWJvYXJkLmVuYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgZGlzYWJsZTogS2V5Ym9hcmQuZGlzYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgaGFuZGxlOiBLZXlib2FyZC5oYW5kbGUuYmluZChzd2lwZXIpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmtleWJvYXJkLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIua2V5Ym9hcmQuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5rZXlib2FyZC5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLmtleWJvYXJkLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzRXZlbnRTdXBwb3J0ZWQoKSB7XG4gICAgdmFyIGV2ZW50TmFtZSA9ICdvbndoZWVsJztcbiAgICB2YXIgaXNTdXBwb3J0ZWQgPSBldmVudE5hbWUgaW4gZG9jO1xuXG4gICAgaWYgKCFpc1N1cHBvcnRlZCkge1xuICAgICAgdmFyIGVsZW1lbnQgPSBkb2MuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShldmVudE5hbWUsICdyZXR1cm47Jyk7XG4gICAgICBpc1N1cHBvcnRlZCA9IHR5cGVvZiBlbGVtZW50W2V2ZW50TmFtZV0gPT09ICdmdW5jdGlvbic7XG4gICAgfVxuXG4gICAgaWYgKCFpc1N1cHBvcnRlZFxuICAgICAgJiYgZG9jLmltcGxlbWVudGF0aW9uXG4gICAgICAmJiBkb2MuaW1wbGVtZW50YXRpb24uaGFzRmVhdHVyZVxuICAgICAgLy8gYWx3YXlzIHJldHVybnMgdHJ1ZSBpbiBuZXdlciBicm93c2VycyBhcyBwZXIgdGhlIHN0YW5kYXJkLlxuICAgICAgLy8gQHNlZSBodHRwOi8vZG9tLnNwZWMud2hhdHdnLm9yZy8jZG9tLWRvbWltcGxlbWVudGF0aW9uLWhhc2ZlYXR1cmVcbiAgICAgICYmIGRvYy5pbXBsZW1lbnRhdGlvbi5oYXNGZWF0dXJlKCcnLCAnJykgIT09IHRydWVcbiAgICApIHtcbiAgICAgIC8vIFRoaXMgaXMgdGhlIG9ubHkgd2F5IHRvIHRlc3Qgc3VwcG9ydCBmb3IgdGhlIGB3aGVlbGAgZXZlbnQgaW4gSUU5Ky5cbiAgICAgIGlzU3VwcG9ydGVkID0gZG9jLmltcGxlbWVudGF0aW9uLmhhc0ZlYXR1cmUoJ0V2ZW50cy53aGVlbCcsICczLjAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gaXNTdXBwb3J0ZWQ7XG4gIH1cbiAgdmFyIE1vdXNld2hlZWwgPSB7XG4gICAgbGFzdFNjcm9sbFRpbWU6IFV0aWxzLm5vdygpLFxuICAgIGV2ZW50OiBmdW5jdGlvbiBldmVudCgpIHtcbiAgICAgIGlmICh3aW4ubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdmaXJlZm94JykgPiAtMSkgeyByZXR1cm4gJ0RPTU1vdXNlU2Nyb2xsJzsgfVxuICAgICAgcmV0dXJuIGlzRXZlbnRTdXBwb3J0ZWQoKSA/ICd3aGVlbCcgOiAnbW91c2V3aGVlbCc7XG4gICAgfSxcbiAgICBub3JtYWxpemU6IGZ1bmN0aW9uIG5vcm1hbGl6ZShlKSB7XG4gICAgICAvLyBSZWFzb25hYmxlIGRlZmF1bHRzXG4gICAgICB2YXIgUElYRUxfU1RFUCA9IDEwO1xuICAgICAgdmFyIExJTkVfSEVJR0hUID0gNDA7XG4gICAgICB2YXIgUEFHRV9IRUlHSFQgPSA4MDA7XG5cbiAgICAgIHZhciBzWCA9IDA7XG4gICAgICB2YXIgc1kgPSAwOyAvLyBzcGluWCwgc3BpbllcbiAgICAgIHZhciBwWCA9IDA7XG4gICAgICB2YXIgcFkgPSAwOyAvLyBwaXhlbFgsIHBpeGVsWVxuXG4gICAgICAvLyBMZWdhY3lcbiAgICAgIGlmICgnZGV0YWlsJyBpbiBlKSB7XG4gICAgICAgIHNZID0gZS5kZXRhaWw7XG4gICAgICB9XG4gICAgICBpZiAoJ3doZWVsRGVsdGEnIGluIGUpIHtcbiAgICAgICAgc1kgPSAtZS53aGVlbERlbHRhIC8gMTIwO1xuICAgICAgfVxuICAgICAgaWYgKCd3aGVlbERlbHRhWScgaW4gZSkge1xuICAgICAgICBzWSA9IC1lLndoZWVsRGVsdGFZIC8gMTIwO1xuICAgICAgfVxuICAgICAgaWYgKCd3aGVlbERlbHRhWCcgaW4gZSkge1xuICAgICAgICBzWCA9IC1lLndoZWVsRGVsdGFYIC8gMTIwO1xuICAgICAgfVxuXG4gICAgICAvLyBzaWRlIHNjcm9sbGluZyBvbiBGRiB3aXRoIERPTU1vdXNlU2Nyb2xsXG4gICAgICBpZiAoJ2F4aXMnIGluIGUgJiYgZS5heGlzID09PSBlLkhPUklaT05UQUxfQVhJUykge1xuICAgICAgICBzWCA9IHNZO1xuICAgICAgICBzWSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHBYID0gc1ggKiBQSVhFTF9TVEVQO1xuICAgICAgcFkgPSBzWSAqIFBJWEVMX1NURVA7XG5cbiAgICAgIGlmICgnZGVsdGFZJyBpbiBlKSB7XG4gICAgICAgIHBZID0gZS5kZWx0YVk7XG4gICAgICB9XG4gICAgICBpZiAoJ2RlbHRhWCcgaW4gZSkge1xuICAgICAgICBwWCA9IGUuZGVsdGFYO1xuICAgICAgfVxuXG4gICAgICBpZiAoKHBYIHx8IHBZKSAmJiBlLmRlbHRhTW9kZSkge1xuICAgICAgICBpZiAoZS5kZWx0YU1vZGUgPT09IDEpIHsgLy8gZGVsdGEgaW4gTElORSB1bml0c1xuICAgICAgICAgIHBYICo9IExJTkVfSEVJR0hUO1xuICAgICAgICAgIHBZICo9IExJTkVfSEVJR0hUO1xuICAgICAgICB9IGVsc2UgeyAvLyBkZWx0YSBpbiBQQUdFIHVuaXRzXG4gICAgICAgICAgcFggKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgICAgcFkgKj0gUEFHRV9IRUlHSFQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRmFsbC1iYWNrIGlmIHNwaW4gY2Fubm90IGJlIGRldGVybWluZWRcbiAgICAgIGlmIChwWCAmJiAhc1gpIHtcbiAgICAgICAgc1ggPSAocFggPCAxKSA/IC0xIDogMTtcbiAgICAgIH1cbiAgICAgIGlmIChwWSAmJiAhc1kpIHtcbiAgICAgICAgc1kgPSAocFkgPCAxKSA/IC0xIDogMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3Bpblg6IHNYLFxuICAgICAgICBzcGluWTogc1ksXG4gICAgICAgIHBpeGVsWDogcFgsXG4gICAgICAgIHBpeGVsWTogcFksXG4gICAgICB9O1xuICAgIH0sXG4gICAgaGFuZGxlTW91c2VFbnRlcjogZnVuY3Rpb24gaGFuZGxlTW91c2VFbnRlcigpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgc3dpcGVyLm1vdXNlRW50ZXJlZCA9IHRydWU7XG4gICAgfSxcbiAgICBoYW5kbGVNb3VzZUxlYXZlOiBmdW5jdGlvbiBoYW5kbGVNb3VzZUxlYXZlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIubW91c2VFbnRlcmVkID0gZmFsc2U7XG4gICAgfSxcbiAgICBoYW5kbGU6IGZ1bmN0aW9uIGhhbmRsZShldmVudCkge1xuICAgICAgdmFyIGUgPSBldmVudDtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubW91c2V3aGVlbDtcblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc3dpcGVyLm1vdXNlRW50ZXJlZCAmJiAhcGFyYW1zLnJlbGVhc2VPbkVkZ2VzKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgICAgIGlmIChlLm9yaWdpbmFsRXZlbnQpIHsgZSA9IGUub3JpZ2luYWxFdmVudDsgfSAvLyBqcXVlcnkgZml4XG4gICAgICB2YXIgZGVsdGEgPSAwO1xuICAgICAgdmFyIHJ0bEZhY3RvciA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtMSA6IDE7XG5cbiAgICAgIHZhciBkYXRhID0gTW91c2V3aGVlbC5ub3JtYWxpemUoZSk7XG5cbiAgICAgIGlmIChwYXJhbXMuZm9yY2VUb0F4aXMpIHtcbiAgICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAgIGlmIChNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkpIHsgZGVsdGEgPSBkYXRhLnBpeGVsWCAqIHJ0bEZhY3RvcjsgfVxuICAgICAgICAgIGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICB9IGVsc2UgaWYgKE1hdGguYWJzKGRhdGEucGl4ZWxZKSA+IE1hdGguYWJzKGRhdGEucGl4ZWxYKSkgeyBkZWx0YSA9IGRhdGEucGl4ZWxZOyB9XG4gICAgICAgIGVsc2UgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsdGEgPSBNYXRoLmFicyhkYXRhLnBpeGVsWCkgPiBNYXRoLmFicyhkYXRhLnBpeGVsWSkgPyAtZGF0YS5waXhlbFggKiBydGxGYWN0b3IgOiAtZGF0YS5waXhlbFk7XG4gICAgICB9XG5cbiAgICAgIGlmIChkZWx0YSA9PT0gMCkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICBpZiAocGFyYW1zLmludmVydCkgeyBkZWx0YSA9IC1kZWx0YTsgfVxuXG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuZnJlZU1vZGUpIHtcbiAgICAgICAgaWYgKFV0aWxzLm5vdygpIC0gc3dpcGVyLm1vdXNld2hlZWwubGFzdFNjcm9sbFRpbWUgPiA2MCkge1xuICAgICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgIGlmICgoIXN3aXBlci5pc0VuZCB8fCBzd2lwZXIucGFyYW1zLmxvb3ApICYmICFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3Njcm9sbCcsIGUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJhbXMucmVsZWFzZU9uRWRnZXMpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCghc3dpcGVyLmlzQmVnaW5uaW5nIHx8IHN3aXBlci5wYXJhbXMubG9vcCkgJiYgIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGwnLCBlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHBhcmFtcy5yZWxlYXNlT25FZGdlcykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXBlci5tb3VzZXdoZWVsLmxhc3RTY3JvbGxUaW1lID0gKG5ldyB3aW4uRGF0ZSgpKS5nZXRUaW1lKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBGcmVlbW9kZSBvciBzY3JvbGxDb250YWluZXI6XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwb3NpdGlvbiA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKSArIChkZWx0YSAqIHBhcmFtcy5zZW5zaXRpdml0eSk7XG4gICAgICAgIHZhciB3YXNCZWdpbm5pbmcgPSBzd2lwZXIuaXNCZWdpbm5pbmc7XG4gICAgICAgIHZhciB3YXNFbmQgPSBzd2lwZXIuaXNFbmQ7XG5cbiAgICAgICAgaWYgKHBvc2l0aW9uID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkgeyBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTsgfVxuICAgICAgICBpZiAocG9zaXRpb24gPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7IHBvc2l0aW9uID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpOyB9XG5cbiAgICAgICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG5cbiAgICAgICAgaWYgKCghd2FzQmVnaW5uaW5nICYmIHN3aXBlci5pc0JlZ2lubmluZykgfHwgKCF3YXNFbmQgJiYgc3dpcGVyLmlzRW5kKSkge1xuICAgICAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZVN0aWNreSkge1xuICAgICAgICAgIGNsZWFyVGltZW91dChzd2lwZXIubW91c2V3aGVlbC50aW1lb3V0KTtcbiAgICAgICAgICBzd2lwZXIubW91c2V3aGVlbC50aW1lb3V0ID0gVXRpbHMubmV4dFRpY2soZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XG4gICAgICAgICAgfSwgMzAwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBFbWl0IGV2ZW50XG4gICAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGwnLCBlKTtcblxuICAgICAgICAvLyBTdG9wIGF1dG9wbGF5XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5ICYmIHN3aXBlci5wYXJhbXMuYXV0b3BsYXlEaXNhYmxlT25JbnRlcmFjdGlvbikgeyBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpOyB9XG4gICAgICAgIC8vIFJldHVybiBwYWdlIHNjcm9sbCBvbiBlZGdlIHBvc2l0aW9uc1xuICAgICAgICBpZiAocG9zaXRpb24gPT09IHN3aXBlci5taW5UcmFuc2xhdGUoKSB8fCBwb3NpdGlvbiA9PT0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICB9XG5cbiAgICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSB7IGUucHJldmVudERlZmF1bHQoKTsgfVxuICAgICAgZWxzZSB7IGUucmV0dXJuVmFsdWUgPSBmYWxzZTsgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgZW5hYmxlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBldmVudCA9IE1vdXNld2hlZWwuZXZlbnQoKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50LCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghZXZlbnQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICBpZiAoc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIHZhciB0YXJnZXQgPSBzd2lwZXIuJGVsO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQgIT09ICdjb250YWluZXInKSB7XG4gICAgICAgIHRhcmdldCA9ICQoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmV2ZW50c1RhcmdlZCk7XG4gICAgICB9XG4gICAgICB0YXJnZXQub24oJ21vdXNlZW50ZXInLCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGVNb3VzZUVudGVyKTtcbiAgICAgIHRhcmdldC5vbignbW91c2VsZWF2ZScsIHN3aXBlci5tb3VzZXdoZWVsLmhhbmRsZU1vdXNlTGVhdmUpO1xuICAgICAgdGFyZ2V0Lm9uKGV2ZW50LCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGUpO1xuICAgICAgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlZCA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBldmVudCA9IE1vdXNld2hlZWwuZXZlbnQoKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBzd2lwZXIubW91c2V3aGVlbC5oYW5kbGUpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmICghZXZlbnQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICBpZiAoIXN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICB2YXIgdGFyZ2V0ID0gc3dpcGVyLiRlbDtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLm1vdXNld2hlZWwuZXZlbnRzVGFyZ2VkICE9PSAnY29udGFpbmVyJykge1xuICAgICAgICB0YXJnZXQgPSAkKHN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5ldmVudHNUYXJnZWQpO1xuICAgICAgfVxuICAgICAgdGFyZ2V0Lm9mZihldmVudCwgc3dpcGVyLm1vdXNld2hlZWwuaGFuZGxlKTtcbiAgICAgIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIE1vdXNld2hlZWwkMSA9IHtcbiAgICBuYW1lOiAnbW91c2V3aGVlbCcsXG4gICAgcGFyYW1zOiB7XG4gICAgICBtb3VzZXdoZWVsOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICByZWxlYXNlT25FZGdlczogZmFsc2UsXG4gICAgICAgIGludmVydDogZmFsc2UsXG4gICAgICAgIGZvcmNlVG9BeGlzOiBmYWxzZSxcbiAgICAgICAgc2Vuc2l0aXZpdHk6IDEsXG4gICAgICAgIGV2ZW50c1RhcmdlZDogJ2NvbnRhaW5lcicsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgbW91c2V3aGVlbDoge1xuICAgICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgIGVuYWJsZTogTW91c2V3aGVlbC5lbmFibGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIGRpc2FibGU6IE1vdXNld2hlZWwuZGlzYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgaGFuZGxlOiBNb3VzZXdoZWVsLmhhbmRsZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgaGFuZGxlTW91c2VFbnRlcjogTW91c2V3aGVlbC5oYW5kbGVNb3VzZUVudGVyLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBoYW5kbGVNb3VzZUxlYXZlOiBNb3VzZXdoZWVsLmhhbmRsZU1vdXNlTGVhdmUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIGxhc3RTY3JvbGxUaW1lOiBVdGlscy5ub3coKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMubW91c2V3aGVlbC5lbmFibGVkICYmIHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci5tb3VzZXdoZWVsLmRpc2FibGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5tb3VzZXdoZWVsLmVuYWJsZWQpIHsgc3dpcGVyLm1vdXNld2hlZWwuZW5hYmxlKCk7IH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICAgIHN3aXBlci5tb3VzZXdoZWVsLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIubW91c2V3aGVlbC5lbmFibGVkKSB7IHN3aXBlci5tb3VzZXdoZWVsLmRpc2FibGUoKTsgfVxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHZhciBOYXZpZ2F0aW9uID0ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgICAgLy8gVXBkYXRlIE5hdmlnYXRpb24gQnV0dG9uc1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgICAgdmFyICRuZXh0RWwgPSByZWYuJG5leHRFbDtcbiAgICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XG5cbiAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgJHByZXZFbC5hZGRDbGFzcyhwYXJhbXMuZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJHByZXZFbC5yZW1vdmVDbGFzcyhwYXJhbXMuZGlzYWJsZWRDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgICAgJHByZXZFbFtzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKCRuZXh0RWwgJiYgJG5leHRFbC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICAkbmV4dEVsLmFkZENsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkbmV4dEVsLnJlbW92ZUNsYXNzKHBhcmFtcy5kaXNhYmxlZENsYXNzKTtcbiAgICAgICAgfVxuICAgICAgICAkbmV4dEVsW3N3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10ocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvblByZXZDbGljazogZnVuY3Rpb24gb25QcmV2Q2xpY2soZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgfSxcbiAgICBvbk5leHRDbGljazogZnVuY3Rpb24gb25OZXh0Q2xpY2soZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBpZiAoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHsgcmV0dXJuOyB9XG4gICAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuICAgICAgaWYgKCEocGFyYW1zLm5leHRFbCB8fCBwYXJhbXMucHJldkVsKSkgeyByZXR1cm47IH1cblxuICAgICAgdmFyICRuZXh0RWw7XG4gICAgICB2YXIgJHByZXZFbDtcbiAgICAgIGlmIChwYXJhbXMubmV4dEVsKSB7XG4gICAgICAgICRuZXh0RWwgPSAkKHBhcmFtcy5uZXh0RWwpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50c1xuICAgICAgICAgICYmIHR5cGVvZiBwYXJhbXMubmV4dEVsID09PSAnc3RyaW5nJ1xuICAgICAgICAgICYmICRuZXh0RWwubGVuZ3RoID4gMVxuICAgICAgICAgICYmIHN3aXBlci4kZWwuZmluZChwYXJhbXMubmV4dEVsKS5sZW5ndGggPT09IDFcbiAgICAgICAgKSB7XG4gICAgICAgICAgJG5leHRFbCA9IHN3aXBlci4kZWwuZmluZChwYXJhbXMubmV4dEVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5wcmV2RWwpIHtcbiAgICAgICAgJHByZXZFbCA9ICQocGFyYW1zLnByZXZFbCk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzXG4gICAgICAgICAgJiYgdHlwZW9mIHBhcmFtcy5wcmV2RWwgPT09ICdzdHJpbmcnXG4gICAgICAgICAgJiYgJHByZXZFbC5sZW5ndGggPiAxXG4gICAgICAgICAgJiYgc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5wcmV2RWwpLmxlbmd0aCA9PT0gMVxuICAgICAgICApIHtcbiAgICAgICAgICAkcHJldkVsID0gc3dpcGVyLiRlbC5maW5kKHBhcmFtcy5wcmV2RWwpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgkbmV4dEVsICYmICRuZXh0RWwubGVuZ3RoID4gMCkge1xuICAgICAgICAkbmV4dEVsLm9uKCdjbGljaycsIHN3aXBlci5uYXZpZ2F0aW9uLm9uTmV4dENsaWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgICAkcHJldkVsLm9uKCdjbGljaycsIHN3aXBlci5uYXZpZ2F0aW9uLm9uUHJldkNsaWNrKTtcbiAgICAgIH1cblxuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgICAgICRuZXh0RWw6ICRuZXh0RWwsXG4gICAgICAgIG5leHRFbDogJG5leHRFbCAmJiAkbmV4dEVsWzBdLFxuICAgICAgICAkcHJldkVsOiAkcHJldkVsLFxuICAgICAgICBwcmV2RWw6ICRwcmV2RWwgJiYgJHByZXZFbFswXSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgICAgdmFyICRuZXh0RWwgPSByZWYuJG5leHRFbDtcbiAgICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XG4gICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCkge1xuICAgICAgICAkbmV4dEVsLm9mZignY2xpY2snLCBzd2lwZXIubmF2aWdhdGlvbi5vbk5leHRDbGljayk7XG4gICAgICAgICRuZXh0RWwucmVtb3ZlQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKCRwcmV2RWwgJiYgJHByZXZFbC5sZW5ndGgpIHtcbiAgICAgICAgJHByZXZFbC5vZmYoJ2NsaWNrJywgc3dpcGVyLm5hdmlnYXRpb24ub25QcmV2Q2xpY2spO1xuICAgICAgICAkcHJldkVsLnJlbW92ZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHZhciBOYXZpZ2F0aW9uJDEgPSB7XG4gICAgbmFtZTogJ25hdmlnYXRpb24nLFxuICAgIHBhcmFtczoge1xuICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICBuZXh0RWw6IG51bGwsXG4gICAgICAgIHByZXZFbDogbnVsbCxcblxuICAgICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICAgIGRpc2FibGVkQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWRpc2FibGVkJyxcbiAgICAgICAgaGlkZGVuQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWhpZGRlbicsXG4gICAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1idXR0b24tbG9jaycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgbmF2aWdhdGlvbjoge1xuICAgICAgICAgIGluaXQ6IE5hdmlnYXRpb24uaW5pdC5iaW5kKHN3aXBlciksXG4gICAgICAgICAgdXBkYXRlOiBOYXZpZ2F0aW9uLnVwZGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgZGVzdHJveTogTmF2aWdhdGlvbi5kZXN0cm95LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBvbk5leHRDbGljazogTmF2aWdhdGlvbi5vbk5leHRDbGljay5iaW5kKHN3aXBlciksXG4gICAgICAgICAgb25QcmV2Q2xpY2s6IE5hdmlnYXRpb24ub25QcmV2Q2xpY2suYmluZChzd2lwZXIpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHN3aXBlci5uYXZpZ2F0aW9uLmluaXQoKTtcbiAgICAgICAgc3dpcGVyLm5hdmlnYXRpb24udXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgdG9FZGdlOiBmdW5jdGlvbiB0b0VkZ2UoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICBmcm9tRWRnZTogZnVuY3Rpb24gZnJvbUVkZ2UoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIubmF2aWdhdGlvbi51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLm5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgICAgfSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhlKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICB2YXIgcmVmID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgICAgIHZhciAkbmV4dEVsID0gcmVmLiRuZXh0RWw7XG4gICAgICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZU9uQ2xpY2tcbiAgICAgICAgICAmJiAhJChlLnRhcmdldCkuaXMoJHByZXZFbClcbiAgICAgICAgICAmJiAhJChlLnRhcmdldCkuaXMoJG5leHRFbClcbiAgICAgICAgKSB7XG4gICAgICAgICAgdmFyIGlzSGlkZGVuO1xuICAgICAgICAgIGlmICgkbmV4dEVsKSB7XG4gICAgICAgICAgICBpc0hpZGRlbiA9ICRuZXh0RWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCRwcmV2RWwpIHtcbiAgICAgICAgICAgIGlzSGlkZGVuID0gJHByZXZFbC5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNIaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCduYXZpZ2F0aW9uU2hvdycsIHN3aXBlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCduYXZpZ2F0aW9uSGlkZScsIHN3aXBlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkbmV4dEVsKSB7XG4gICAgICAgICAgICAkbmV4dEVsLnRvZ2dsZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkcHJldkVsKSB7XG4gICAgICAgICAgICAkcHJldkVsLnRvZ2dsZUNsYXNzKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIFBhZ2luYXRpb24gPSB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAvLyBSZW5kZXIgfHwgVXBkYXRlIFBhZ2luYXRpb24gYnVsbGV0cy9pdGVtc1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcnRsID0gc3dpcGVyLnJ0bDtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgICBpZiAoIXBhcmFtcy5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLiRlbCB8fCBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgdmFyICRlbCA9IHN3aXBlci5wYWdpbmF0aW9uLiRlbDtcbiAgICAgIC8vIEN1cnJlbnQvVG90YWxcbiAgICAgIHZhciBjdXJyZW50O1xuICAgICAgdmFyIHRvdGFsID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzbGlkZXNMZW5ndGggLSAoc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgY3VycmVudCA9IE1hdGguY2VpbCgoc3dpcGVyLmFjdGl2ZUluZGV4IC0gc3dpcGVyLmxvb3BlZFNsaWRlcykgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgICAgaWYgKGN1cnJlbnQgPiBzbGlkZXNMZW5ndGggLSAxIC0gKHN3aXBlci5sb29wZWRTbGlkZXMgKiAyKSkge1xuICAgICAgICAgIGN1cnJlbnQgLT0gKHNsaWRlc0xlbmd0aCAtIChzd2lwZXIubG9vcGVkU2xpZGVzICogMikpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJyZW50ID4gdG90YWwgLSAxKSB7IGN1cnJlbnQgLT0gdG90YWw7IH1cbiAgICAgICAgaWYgKGN1cnJlbnQgPCAwICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvblR5cGUgIT09ICdidWxsZXRzJykgeyBjdXJyZW50ID0gdG90YWwgKyBjdXJyZW50OyB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjdXJyZW50ID0gc3dpcGVyLnNuYXBJbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcbiAgICAgIH1cbiAgICAgIC8vIFR5cGVzXG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgYnVsbGV0cyA9IHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHM7XG4gICAgICAgIHZhciBmaXJzdEluZGV4O1xuICAgICAgICB2YXIgbGFzdEluZGV4O1xuICAgICAgICB2YXIgbWlkSW5kZXg7XG4gICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRTaXplID0gYnVsbGV0cy5lcSgwKVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnb3V0ZXJXaWR0aCcgOiAnb3V0ZXJIZWlnaHQnXSh0cnVlKTtcbiAgICAgICAgICAkZWwuY3NzKHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd3aWR0aCcgOiAnaGVpZ2h0JywgKChzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRTaXplICogKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgKyA0KSkgKyBcInB4XCIpKTtcbiAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyA+IDEgJiYgc3dpcGVyLnByZXZpb3VzSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ICs9IChjdXJyZW50IC0gc3dpcGVyLnByZXZpb3VzSW5kZXgpO1xuICAgICAgICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCA+IChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMSkpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ID0gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyAtIDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5wYWdpbmF0aW9uLmR5bmFtaWNCdWxsZXRJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZHluYW1pY0J1bGxldEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZmlyc3RJbmRleCA9IGN1cnJlbnQgLSBzd2lwZXIucGFnaW5hdGlvbi5keW5hbWljQnVsbGV0SW5kZXg7XG4gICAgICAgICAgbGFzdEluZGV4ID0gZmlyc3RJbmRleCArIChNYXRoLm1pbihidWxsZXRzLmxlbmd0aCwgcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cykgLSAxKTtcbiAgICAgICAgICBtaWRJbmRleCA9IChsYXN0SW5kZXggKyBmaXJzdEluZGV4KSAvIDI7XG4gICAgICAgIH1cbiAgICAgICAgYnVsbGV0cy5yZW1vdmVDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIiBcIiArIChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItbmV4dCBcIiArIChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItbmV4dC1uZXh0IFwiICsgKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2IFwiICsgKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2LXByZXYgXCIgKyAocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW1haW5cIikpO1xuICAgICAgICBpZiAoJGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBidWxsZXRzLmVhY2goZnVuY3Rpb24gKGluZGV4LCBidWxsZXQpIHtcbiAgICAgICAgICAgIHZhciAkYnVsbGV0ID0gJChidWxsZXQpO1xuICAgICAgICAgICAgdmFyIGJ1bGxldEluZGV4ID0gJGJ1bGxldC5pbmRleCgpO1xuICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICAgICRidWxsZXQuYWRkQ2xhc3MocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID49IGZpcnN0SW5kZXggJiYgYnVsbGV0SW5kZXggPD0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgJGJ1bGxldC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1tYWluXCIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPT09IGZpcnN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgICAkYnVsbGV0XG4gICAgICAgICAgICAgICAgICAucHJldigpXG4gICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoKChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItcHJldlwiKSlcbiAgICAgICAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1wcmV2LXByZXZcIikpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgICAgJGJ1bGxldFxuICAgICAgICAgICAgICAgICAgLm5leHQoKVxuICAgICAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW5leHRcIikpXG4gICAgICAgICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAgICAgICAuYWRkQ2xhc3MoKChwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpICsgXCItbmV4dC1uZXh0XCIpKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciAkYnVsbGV0ID0gYnVsbGV0cy5lcShjdXJyZW50KTtcbiAgICAgICAgICAkYnVsbGV0LmFkZENsYXNzKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcyk7XG4gICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICAgdmFyICRmaXJzdERpc3BsYXllZEJ1bGxldCA9IGJ1bGxldHMuZXEoZmlyc3RJbmRleCk7XG4gICAgICAgICAgICB2YXIgJGxhc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzLmVxKGxhc3RJbmRleCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gZmlyc3RJbmRleDsgaSA8PSBsYXN0SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgICBidWxsZXRzLmVxKGkpLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLW1haW5cIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJGZpcnN0RGlzcGxheWVkQnVsbGV0XG4gICAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLXByZXZcIikpXG4gICAgICAgICAgICAgIC5wcmV2KClcbiAgICAgICAgICAgICAgLmFkZENsYXNzKCgocGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzKSArIFwiLXByZXYtcHJldlwiKSk7XG4gICAgICAgICAgICAkbGFzdERpc3BsYXllZEJ1bGxldFxuICAgICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0XCIpKVxuICAgICAgICAgICAgICAubmV4dCgpXG4gICAgICAgICAgICAgIC5hZGRDbGFzcygoKHBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcykgKyBcIi1uZXh0LW5leHRcIikpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgdmFyIGR5bmFtaWNCdWxsZXRzTGVuZ3RoID0gTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgKyA0KTtcbiAgICAgICAgICB2YXIgYnVsbGV0c09mZnNldCA9ICgoKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldFNpemUgKiBkeW5hbWljQnVsbGV0c0xlbmd0aCkgLSAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0U2l6ZSkpIC8gMikgLSAobWlkSW5kZXggKiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRTaXplKTtcbiAgICAgICAgICB2YXIgb2Zmc2V0UHJvcCA9IHJ0bCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgICAgYnVsbGV0cy5jc3Moc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gb2Zmc2V0UHJvcCA6ICd0b3AnLCAoYnVsbGV0c09mZnNldCArIFwicHhcIikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICAgJGVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy5jdXJyZW50Q2xhc3MpKSkudGV4dChwYXJhbXMuZm9ybWF0RnJhY3Rpb25DdXJyZW50KGN1cnJlbnQgKyAxKSk7XG4gICAgICAgICRlbC5maW5kKChcIi5cIiArIChwYXJhbXMudG90YWxDbGFzcykpKS50ZXh0KHBhcmFtcy5mb3JtYXRGcmFjdGlvblRvdGFsKHRvdGFsKSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgICAgdmFyIHByb2dyZXNzYmFyRGlyZWN0aW9uO1xuICAgICAgICBpZiAocGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGUpIHtcbiAgICAgICAgICBwcm9ncmVzc2JhckRpcmVjdGlvbiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzY2FsZSA9IChjdXJyZW50ICsgMSkgLyB0b3RhbDtcbiAgICAgICAgdmFyIHNjYWxlWCA9IDE7XG4gICAgICAgIHZhciBzY2FsZVkgPSAxO1xuICAgICAgICBpZiAocHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIHNjYWxlWCA9IHNjYWxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjYWxlWSA9IHNjYWxlO1xuICAgICAgICB9XG4gICAgICAgICRlbC5maW5kKChcIi5cIiArIChwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpKSkudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZVgoXCIgKyBzY2FsZVggKyBcIikgc2NhbGVZKFwiICsgc2NhbGVZICsgXCIpXCIpKS50cmFuc2l0aW9uKHN3aXBlci5wYXJhbXMuc3BlZWQpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnY3VzdG9tJyAmJiBwYXJhbXMucmVuZGVyQ3VzdG9tKSB7XG4gICAgICAgICRlbC5odG1sKHBhcmFtcy5yZW5kZXJDdXN0b20oc3dpcGVyLCBjdXJyZW50ICsgMSwgdG90YWwpKTtcbiAgICAgICAgc3dpcGVyLmVtaXQoJ3BhZ2luYXRpb25SZW5kZXInLCBzd2lwZXIsICRlbFswXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuZW1pdCgncGFnaW5hdGlvblVwZGF0ZScsIHN3aXBlciwgJGVsWzBdKTtcbiAgICAgIH1cbiAgICAgICRlbFtzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkID8gJ2FkZENsYXNzJyA6ICdyZW1vdmVDbGFzcyddKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgIH0sXG4gICAgcmVuZGVyOiBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgICAvLyBSZW5kZXIgQ29udGFpbmVyXG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgICBpZiAoIXBhcmFtcy5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLiRlbCB8fCBzd2lwZXIucGFnaW5hdGlvbi4kZWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuXG4gICAgICB2YXIgJGVsID0gc3dpcGVyLnBhZ2luYXRpb24uJGVsO1xuICAgICAgdmFyIHBhZ2luYXRpb25IVE1MID0gJyc7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJykge1xuICAgICAgICB2YXIgbnVtYmVyT2ZCdWxsZXRzID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKChzbGlkZXNMZW5ndGggLSAoc3dpcGVyLmxvb3BlZFNsaWRlcyAqIDIpKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJPZkJ1bGxldHM7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChwYXJhbXMucmVuZGVyQnVsbGV0KSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBwYXJhbXMucmVuZGVyQnVsbGV0LmNhbGwoc3dpcGVyLCBpLCBwYXJhbXMuYnVsbGV0Q2xhc3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBcIjxcIiArIChwYXJhbXMuYnVsbGV0RWxlbWVudCkgKyBcIiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLmJ1bGxldENsYXNzKSArIFwiXFxcIj48L1wiICsgKHBhcmFtcy5idWxsZXRFbGVtZW50KSArIFwiPlwiO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkZWwuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgPSAkZWwuZmluZCgoXCIuXCIgKyAocGFyYW1zLmJ1bGxldENsYXNzKSkpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnZnJhY3Rpb24nKSB7XG4gICAgICAgIGlmIChwYXJhbXMucmVuZGVyRnJhY3Rpb24pIHtcbiAgICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJGcmFjdGlvbi5jYWxsKHN3aXBlciwgcGFyYW1zLmN1cnJlbnRDbGFzcywgcGFyYW1zLnRvdGFsQ2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gXCI8c3BhbiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLmN1cnJlbnRDbGFzcykgKyBcIlxcXCI+PC9zcGFuPlwiXG4gICAgICAgICAgKyAnIC8gJ1xuICAgICAgICAgICsgXCI8c3BhbiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLnRvdGFsQ2xhc3MpICsgXCJcXFwiPjwvc3Bhbj5cIjtcbiAgICAgICAgfVxuICAgICAgICAkZWwuaHRtbChwYWdpbmF0aW9uSFRNTCk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhcikge1xuICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlclByb2dyZXNzYmFyLmNhbGwoc3dpcGVyLCBwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHBhZ2luYXRpb25IVE1MID0gXCI8c3BhbiBjbGFzcz1cXFwiXCIgKyAocGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzKSArIFwiXFxcIj48L3NwYW4+XCI7XG4gICAgICAgIH1cbiAgICAgICAgJGVsLmh0bWwocGFnaW5hdGlvbkhUTUwpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlICE9PSAnY3VzdG9tJykge1xuICAgICAgICBzd2lwZXIuZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIHN3aXBlci5wYWdpbmF0aW9uLiRlbFswXSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgaWYgKCFwYXJhbXMuZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciAkZWwgPSAkKHBhcmFtcy5lbCk7XG4gICAgICBpZiAoJGVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cblxuICAgICAgaWYgKFxuICAgICAgICBzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzXG4gICAgICAgICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnXG4gICAgICAgICYmICRlbC5sZW5ndGggPiAxXG4gICAgICAgICYmIHN3aXBlci4kZWwuZmluZChwYXJhbXMuZWwpLmxlbmd0aCA9PT0gMVxuICAgICAgKSB7XG4gICAgICAgICRlbCA9IHN3aXBlci4kZWwuZmluZChwYXJhbXMuZWwpO1xuICAgICAgfVxuXG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAgICRlbC5hZGRDbGFzcyhwYXJhbXMuY2xpY2thYmxlQ2xhc3MpO1xuICAgICAgfVxuXG4gICAgICAkZWwuYWRkQ2xhc3MocGFyYW1zLm1vZGlmaWVyQ2xhc3MgKyBwYXJhbXMudHlwZSk7XG5cbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAkZWwuYWRkQ2xhc3MoKFwiXCIgKyAocGFyYW1zLm1vZGlmaWVyQ2xhc3MpICsgKHBhcmFtcy50eXBlKSArIFwiLWR5bmFtaWNcIikpO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5keW5hbWljQnVsbGV0SW5kZXggPSAwO1xuICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyA8IDEpIHtcbiAgICAgICAgICBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAncHJvZ3Jlc3NiYXInICYmIHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlKSB7XG4gICAgICAgICRlbC5hZGRDbGFzcyhwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgJGVsLm9uKCdjbGljaycsIChcIi5cIiArIChwYXJhbXMuYnVsbGV0Q2xhc3MpKSwgZnVuY3Rpb24gb25DbGljayhlKSB7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHZhciBpbmRleCA9ICQodGhpcykuaW5kZXgoKSAqIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkgeyBpbmRleCArPSBzd2lwZXIubG9vcGVkU2xpZGVzOyB9XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5wYWdpbmF0aW9uLCB7XG4gICAgICAgICRlbDogJGVsLFxuICAgICAgICBlbDogJGVsWzBdLFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgICAgaWYgKCFwYXJhbXMuZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi4kZWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uJGVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgIHZhciAkZWwgPSBzd2lwZXIucGFnaW5hdGlvbi4kZWw7XG5cbiAgICAgICRlbC5yZW1vdmVDbGFzcyhwYXJhbXMuaGlkZGVuQ2xhc3MpO1xuICAgICAgJGVsLnJlbW92ZUNsYXNzKHBhcmFtcy5tb2RpZmllckNsYXNzICsgcGFyYW1zLnR5cGUpO1xuICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMpIHsgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5yZW1vdmVDbGFzcyhwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3MpOyB9XG4gICAgICBpZiAocGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgICAkZWwub2ZmKCdjbGljaycsIChcIi5cIiArIChwYXJhbXMuYnVsbGV0Q2xhc3MpKSk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICB2YXIgUGFnaW5hdGlvbiQxID0ge1xuICAgIG5hbWU6ICdwYWdpbmF0aW9uJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHBhZ2luYXRpb246IHtcbiAgICAgICAgZWw6IG51bGwsXG4gICAgICAgIGJ1bGxldEVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgICByZW5kZXJCdWxsZXQ6IG51bGwsXG4gICAgICAgIHJlbmRlclByb2dyZXNzYmFyOiBudWxsLFxuICAgICAgICByZW5kZXJGcmFjdGlvbjogbnVsbCxcbiAgICAgICAgcmVuZGVyQ3VzdG9tOiBudWxsLFxuICAgICAgICBwcm9ncmVzc2Jhck9wcG9zaXRlOiBmYWxzZSxcbiAgICAgICAgdHlwZTogJ2J1bGxldHMnLCAvLyAnYnVsbGV0cycgb3IgJ3Byb2dyZXNzYmFyJyBvciAnZnJhY3Rpb24nIG9yICdjdXN0b20nXG4gICAgICAgIGR5bmFtaWNCdWxsZXRzOiBmYWxzZSxcbiAgICAgICAgZHluYW1pY01haW5CdWxsZXRzOiAxLFxuICAgICAgICBmb3JtYXRGcmFjdGlvbkN1cnJlbnQ6IGZ1bmN0aW9uIChudW1iZXIpIHsgcmV0dXJuIG51bWJlcjsgfSxcbiAgICAgICAgZm9ybWF0RnJhY3Rpb25Ub3RhbDogZnVuY3Rpb24gKG51bWJlcikgeyByZXR1cm4gbnVtYmVyOyB9LFxuICAgICAgICBidWxsZXRDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWJ1bGxldCcsXG4gICAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tYnVsbGV0LWFjdGl2ZScsXG4gICAgICAgIG1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi0nLCAvLyBORVdcbiAgICAgICAgY3VycmVudENsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tY3VycmVudCcsXG4gICAgICAgIHRvdGFsQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi10b3RhbCcsXG4gICAgICAgIGhpZGRlbkNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24taGlkZGVuJyxcbiAgICAgICAgcHJvZ3Jlc3NiYXJGaWxsQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1wcm9ncmVzc2Jhci1maWxsJyxcbiAgICAgICAgcHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzOiAnc3dpcGVyLXBhZ2luYXRpb24tcHJvZ3Jlc3NiYXItb3Bwb3NpdGUnLFxuICAgICAgICBjbGlja2FibGVDbGFzczogJ3N3aXBlci1wYWdpbmF0aW9uLWNsaWNrYWJsZScsIC8vIE5FV1xuICAgICAgICBsb2NrQ2xhc3M6ICdzd2lwZXItcGFnaW5hdGlvbi1sb2NrJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgICAgaW5pdDogUGFnaW5hdGlvbi5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICByZW5kZXI6IFBhZ2luYXRpb24ucmVuZGVyLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICB1cGRhdGU6IFBhZ2luYXRpb24udXBkYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBkZXN0cm95OiBQYWdpbmF0aW9uLmRlc3Ryb3kuYmluZChzd2lwZXIpLFxuICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleDogMCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5pbml0KCk7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLnJlbmRlcigpO1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICBhY3RpdmVJbmRleENoYW5nZTogZnVuY3Rpb24gYWN0aXZlSW5kZXhDaGFuZ2UoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHN3aXBlci5zbmFwSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzbmFwSW5kZXhDaGFuZ2U6IGZ1bmN0aW9uIHNuYXBJbmRleENoYW5nZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzbGlkZXNMZW5ndGhDaGFuZ2U6IGZ1bmN0aW9uIHNsaWRlc0xlbmd0aENoYW5nZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5yZW5kZXIoKTtcbiAgICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNuYXBHcmlkTGVuZ3RoQ2hhbmdlOiBmdW5jdGlvbiBzbmFwR3JpZExlbmd0aENoYW5nZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24ucmVuZGVyKCk7XG4gICAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24udXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uZGVzdHJveSgpO1xuICAgICAgfSxcbiAgICAgIGNsaWNrOiBmdW5jdGlvbiBjbGljayhlKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVsXG4gICAgICAgICAgJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGVPbkNsaWNrXG4gICAgICAgICAgJiYgc3dpcGVyLnBhZ2luYXRpb24uJGVsLmxlbmd0aCA+IDBcbiAgICAgICAgICAmJiAhJChlLnRhcmdldCkuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKVxuICAgICAgICApIHtcbiAgICAgICAgICB2YXIgaXNIaWRkZW4gPSBzd2lwZXIucGFnaW5hdGlvbi4kZWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgICBpZiAoaXNIaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uU2hvdycsIHN3aXBlcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdwYWdpbmF0aW9uSGlkZScsIHN3aXBlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC50b2dnbGVDbGFzcyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIFNjcm9sbGJhciA9IHtcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cbiAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgICAgdmFyIHJ0bCA9IHN3aXBlci5ydGxUcmFuc2xhdGU7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSBzd2lwZXIucHJvZ3Jlc3M7XG4gICAgICB2YXIgZHJhZ1NpemUgPSBzY3JvbGxiYXIuZHJhZ1NpemU7XG4gICAgICB2YXIgdHJhY2tTaXplID0gc2Nyb2xsYmFyLnRyYWNrU2l6ZTtcbiAgICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XG4gICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcblxuICAgICAgdmFyIG5ld1NpemUgPSBkcmFnU2l6ZTtcbiAgICAgIHZhciBuZXdQb3MgPSAodHJhY2tTaXplIC0gZHJhZ1NpemUpICogcHJvZ3Jlc3M7XG4gICAgICBpZiAocnRsKSB7XG4gICAgICAgIG5ld1BvcyA9IC1uZXdQb3M7XG4gICAgICAgIGlmIChuZXdQb3MgPiAwKSB7XG4gICAgICAgICAgbmV3U2l6ZSA9IGRyYWdTaXplIC0gbmV3UG9zO1xuICAgICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICAgIH0gZWxzZSBpZiAoLW5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XG4gICAgICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSArIG5ld1BvcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChuZXdQb3MgPCAwKSB7XG4gICAgICAgIG5ld1NpemUgPSBkcmFnU2l6ZSArIG5ld1BvcztcbiAgICAgICAgbmV3UG9zID0gMDtcbiAgICAgIH0gZWxzZSBpZiAobmV3UG9zICsgZHJhZ1NpemUgPiB0cmFja1NpemUpIHtcbiAgICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSAtIG5ld1BvcztcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyBuZXdQb3MgKyBcInB4LCAwLCAwKVwiKSk7XG4gICAgICAgICRkcmFnRWxbMF0uc3R5bGUud2lkdGggPSBuZXdTaXplICsgXCJweFwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGRyYWdFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMHB4LCBcIiArIG5ld1BvcyArIFwicHgsIDApXCIpKTtcbiAgICAgICAgJGRyYWdFbFswXS5zdHlsZS5oZWlnaHQgPSBuZXdTaXplICsgXCJweFwiO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzd2lwZXIuc2Nyb2xsYmFyLnRpbWVvdXQpO1xuICAgICAgICAkZWxbMF0uc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICAgIHN3aXBlci5zY3JvbGxiYXIudGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgICAkZWwudHJhbnNpdGlvbig0MDApO1xuICAgICAgICB9LCAxMDAwKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuJGRyYWdFbC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICB9LFxuICAgIHVwZGF0ZVNpemU6IGZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgICAgdmFyICRkcmFnRWwgPSBzY3JvbGxiYXIuJGRyYWdFbDtcbiAgICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xuXG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgdmFyIHRyYWNrU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICRlbFswXS5vZmZzZXRXaWR0aCA6ICRlbFswXS5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgIHZhciBkaXZpZGVyID0gc3dpcGVyLnNpemUgLyBzd2lwZXIudmlydHVhbFNpemU7XG4gICAgICB2YXIgbW92ZURpdmlkZXIgPSBkaXZpZGVyICogKHRyYWNrU2l6ZSAvIHN3aXBlci5zaXplKTtcbiAgICAgIHZhciBkcmFnU2l6ZTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIGRyYWdTaXplID0gdHJhY2tTaXplICogZGl2aWRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRyYWdTaXplID0gcGFyc2VJbnQoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUsIDEwKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLndpZHRoID0gZHJhZ1NpemUgKyBcInB4XCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkZHJhZ0VsWzBdLnN0eWxlLmhlaWdodCA9IGRyYWdTaXplICsgXCJweFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAoZGl2aWRlciA+PSAxKSB7XG4gICAgICAgICRlbFswXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJGVsWzBdLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5oaWRlKSB7XG4gICAgICAgICRlbFswXS5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgIH1cbiAgICAgIFV0aWxzLmV4dGVuZChzY3JvbGxiYXIsIHtcbiAgICAgICAgdHJhY2tTaXplOiB0cmFja1NpemUsXG4gICAgICAgIGRpdmlkZXI6IGRpdmlkZXIsXG4gICAgICAgIG1vdmVEaXZpZGVyOiBtb3ZlRGl2aWRlcixcbiAgICAgICAgZHJhZ1NpemU6IGRyYWdTaXplLFxuICAgICAgfSk7XG4gICAgICBzY3JvbGxiYXIuJGVsW3N3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgPyAnYWRkQ2xhc3MnIDogJ3JlbW92ZUNsYXNzJ10oc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKTtcbiAgICB9LFxuICAgIGdldFBvaW50ZXJQb3NpdGlvbjogZnVuY3Rpb24gZ2V0UG9pbnRlclBvc2l0aW9uKGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICByZXR1cm4gKChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyB8fCBlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVggfHwgZS5jbGllbnRYKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGUudHlwZSA9PT0gJ3RvdWNobW92ZScpID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWSB8fCBlLmNsaWVudFkpO1xuICAgIH0sXG4gICAgc2V0RHJhZ1Bvc2l0aW9uOiBmdW5jdGlvbiBzZXREcmFnUG9zaXRpb24oZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuICAgICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgICB2YXIgZHJhZ1NpemUgPSBzY3JvbGxiYXIuZHJhZ1NpemU7XG4gICAgICB2YXIgdHJhY2tTaXplID0gc2Nyb2xsYmFyLnRyYWNrU2l6ZTtcbiAgICAgIHZhciBkcmFnU3RhcnRQb3MgPSBzY3JvbGxiYXIuZHJhZ1N0YXJ0UG9zO1xuXG4gICAgICB2YXIgcG9zaXRpb25SYXRpbztcbiAgICAgIHBvc2l0aW9uUmF0aW8gPSAoKHNjcm9sbGJhci5nZXRQb2ludGVyUG9zaXRpb24oZSkpIC0gJGVsLm9mZnNldCgpW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnXVxuICAgICAgICAtIChkcmFnU3RhcnRQb3MgIT09IG51bGwgPyBkcmFnU3RhcnRQb3MgOiBkcmFnU2l6ZSAvIDIpKSAvICh0cmFja1NpemUgLSBkcmFnU2l6ZSk7XG4gICAgICBwb3NpdGlvblJhdGlvID0gTWF0aC5tYXgoTWF0aC5taW4ocG9zaXRpb25SYXRpbywgMSksIDApO1xuICAgICAgaWYgKHJ0bCkge1xuICAgICAgICBwb3NpdGlvblJhdGlvID0gMSAtIHBvc2l0aW9uUmF0aW87XG4gICAgICB9XG5cbiAgICAgIHZhciBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSArICgoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIHBvc2l0aW9uUmF0aW8pO1xuXG4gICAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MocG9zaXRpb24pO1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShwb3NpdGlvbik7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgfSxcbiAgICBvbkRyYWdTdGFydDogZnVuY3Rpb24gb25EcmFnU3RhcnQoZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcbiAgICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLmlzVG91Y2hlZCA9IHRydWU7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLmRyYWdTdGFydFBvcyA9IChlLnRhcmdldCA9PT0gJGRyYWdFbFswXSB8fCBlLnRhcmdldCA9PT0gJGRyYWdFbClcbiAgICAgICAgPyBzY3JvbGxiYXIuZ2V0UG9pbnRlclBvc2l0aW9uKGUpIC0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCddIDogbnVsbDtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgICR3cmFwcGVyRWwudHJhbnNpdGlvbigxMDApO1xuICAgICAgJGRyYWdFbC50cmFuc2l0aW9uKDEwMCk7XG4gICAgICBzY3JvbGxiYXIuc2V0RHJhZ1Bvc2l0aW9uKGUpO1xuXG4gICAgICBjbGVhclRpbWVvdXQoc3dpcGVyLnNjcm9sbGJhci5kcmFnVGltZW91dCk7XG5cbiAgICAgICRlbC50cmFuc2l0aW9uKDApO1xuICAgICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICAgICRlbC5jc3MoJ29wYWNpdHknLCAxKTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuY3NzKCdzY3JvbGwtc25hcC10eXBlJywgJ25vbmUnKTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGxiYXJEcmFnU3RhcnQnLCBlKTtcbiAgICB9LFxuICAgIG9uRHJhZ01vdmU6IGZ1bmN0aW9uIG9uRHJhZ01vdmUoZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICAgIHZhciAkd3JhcHBlckVsID0gc3dpcGVyLiR3cmFwcGVyRWw7XG4gICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcbiAgICAgIHZhciAkZHJhZ0VsID0gc2Nyb2xsYmFyLiRkcmFnRWw7XG5cbiAgICAgIGlmICghc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgeyBlLnByZXZlbnREZWZhdWx0KCk7IH1cbiAgICAgIGVsc2UgeyBlLnJldHVyblZhbHVlID0gZmFsc2U7IH1cbiAgICAgIHNjcm9sbGJhci5zZXREcmFnUG9zaXRpb24oZSk7XG4gICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb24oMCk7XG4gICAgICAkZWwudHJhbnNpdGlvbigwKTtcbiAgICAgICRkcmFnRWwudHJhbnNpdGlvbigwKTtcbiAgICAgIHN3aXBlci5lbWl0KCdzY3JvbGxiYXJEcmFnTW92ZScsIGUpO1xuICAgIH0sXG4gICAgb25EcmFnRW5kOiBmdW5jdGlvbiBvbkRyYWdFbmQoZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG5cbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICAgIHZhciAkZWwgPSBzY3JvbGxiYXIuJGVsO1xuXG4gICAgICBpZiAoIXN3aXBlci5zY3JvbGxiYXIuaXNUb3VjaGVkKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLnNjcm9sbGJhci5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwuY3NzKCdzY3JvbGwtc25hcC10eXBlJywgJycpO1xuICAgICAgICAkd3JhcHBlckVsLnRyYW5zaXRpb24oJycpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzd2lwZXIuc2Nyb2xsYmFyLmRyYWdUaW1lb3V0KTtcbiAgICAgICAgc3dpcGVyLnNjcm9sbGJhci5kcmFnVGltZW91dCA9IFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAkZWwuY3NzKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgJGVsLnRyYW5zaXRpb24oNDAwKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9XG4gICAgICBzd2lwZXIuZW1pdCgnc2Nyb2xsYmFyRHJhZ0VuZCcsIGUpO1xuICAgICAgaWYgKHBhcmFtcy5zbmFwT25SZWxlYXNlKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdCgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZW5hYmxlRHJhZ2dhYmxlOiBmdW5jdGlvbiBlbmFibGVEcmFnZ2FibGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwpIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgc2Nyb2xsYmFyID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICAgIHZhciB0b3VjaEV2ZW50c1RvdWNoID0gc3dpcGVyLnRvdWNoRXZlbnRzVG91Y2g7XG4gICAgICB2YXIgdG91Y2hFdmVudHNEZXNrdG9wID0gc3dpcGVyLnRvdWNoRXZlbnRzRGVza3RvcDtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgdmFyICRlbCA9IHNjcm9sbGJhci4kZWw7XG4gICAgICB2YXIgdGFyZ2V0ID0gJGVsWzBdO1xuICAgICAgdmFyIGFjdGl2ZUxpc3RlbmVyID0gU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IGZhbHNlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgICB2YXIgcGFzc2l2ZUxpc3RlbmVyID0gU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7IHBhc3NpdmU6IHRydWUsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcbiAgICAgIGlmICghU3VwcG9ydC50b3VjaCkge1xuICAgICAgICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3Auc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHNEZXNrdG9wLm1vdmUsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3AuZW5kLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzVG91Y2guc3RhcnQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHNUb3VjaC5tb3ZlLCBzd2lwZXIuc2Nyb2xsYmFyLm9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICAgICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHNUb3VjaC5lbmQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGlzYWJsZURyYWdnYWJsZTogZnVuY3Rpb24gZGlzYWJsZURyYWdnYWJsZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCkgeyByZXR1cm47IH1cbiAgICAgIHZhciBzY3JvbGxiYXIgPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgICAgdmFyIHRvdWNoRXZlbnRzVG91Y2ggPSBzd2lwZXIudG91Y2hFdmVudHNUb3VjaDtcbiAgICAgIHZhciB0b3VjaEV2ZW50c0Rlc2t0b3AgPSBzd2lwZXIudG91Y2hFdmVudHNEZXNrdG9wO1xuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gICAgICB2YXIgJGVsID0gc2Nyb2xsYmFyLiRlbDtcbiAgICAgIHZhciB0YXJnZXQgPSAkZWxbMF07XG4gICAgICB2YXIgYWN0aXZlTGlzdGVuZXIgPSBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHsgcGFzc2l2ZTogZmFsc2UsIGNhcHR1cmU6IGZhbHNlIH0gOiBmYWxzZTtcbiAgICAgIHZhciBwYXNzaXZlTGlzdGVuZXIgPSBTdXBwb3J0LnBhc3NpdmVMaXN0ZW5lciAmJiBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHsgcGFzc2l2ZTogdHJ1ZSwgY2FwdHVyZTogZmFsc2UgfSA6IGZhbHNlO1xuICAgICAgaWYgKCFTdXBwb3J0LnRvdWNoKSB7XG4gICAgICAgIHRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzRGVza3RvcC5zdGFydCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdTdGFydCwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICBkb2MucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c0Rlc2t0b3AubW92ZSwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKHRvdWNoRXZlbnRzRGVza3RvcC5lbmQsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIodG91Y2hFdmVudHNUb3VjaC5zdGFydCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdTdGFydCwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c1RvdWNoLm1vdmUsIHN3aXBlci5zY3JvbGxiYXIub25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xuICAgICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcih0b3VjaEV2ZW50c1RvdWNoLmVuZCwgc3dpcGVyLnNjcm9sbGJhci5vbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHNjcm9sbGJhciA9IHN3aXBlci5zY3JvbGxiYXI7XG4gICAgICB2YXIgJHN3aXBlckVsID0gc3dpcGVyLiRlbDtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcblxuICAgICAgdmFyICRlbCA9ICQocGFyYW1zLmVsKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmICRlbC5sZW5ndGggPiAxICYmICRzd2lwZXJFbC5maW5kKHBhcmFtcy5lbCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICRlbCA9ICRzd2lwZXJFbC5maW5kKHBhcmFtcy5lbCk7XG4gICAgICB9XG5cbiAgICAgIHZhciAkZHJhZ0VsID0gJGVsLmZpbmQoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdDbGFzcykpKTtcbiAgICAgIGlmICgkZHJhZ0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkZHJhZ0VsID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJcIiArIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3MpICsgXCJcXFwiPjwvZGl2PlwiKSk7XG4gICAgICAgICRlbC5hcHBlbmQoJGRyYWdFbCk7XG4gICAgICB9XG5cbiAgICAgIFV0aWxzLmV4dGVuZChzY3JvbGxiYXIsIHtcbiAgICAgICAgJGVsOiAkZWwsXG4gICAgICAgIGVsOiAkZWxbMF0sXG4gICAgICAgICRkcmFnRWw6ICRkcmFnRWwsXG4gICAgICAgIGRyYWdFbDogJGRyYWdFbFswXSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocGFyYW1zLmRyYWdnYWJsZSkge1xuICAgICAgICBzY3JvbGxiYXIuZW5hYmxlRHJhZ2dhYmxlKCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLmRpc2FibGVEcmFnZ2FibGUoKTtcbiAgICB9LFxuICB9O1xuXG4gIHZhciBTY3JvbGxiYXIkMSA9IHtcbiAgICBuYW1lOiAnc2Nyb2xsYmFyJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIHNjcm9sbGJhcjoge1xuICAgICAgICBlbDogbnVsbCxcbiAgICAgICAgZHJhZ1NpemU6ICdhdXRvJyxcbiAgICAgICAgaGlkZTogZmFsc2UsXG4gICAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICAgIHNuYXBPblJlbGVhc2U6IHRydWUsXG4gICAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItbG9jaycsXG4gICAgICAgIGRyYWdDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItZHJhZycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgc2Nyb2xsYmFyOiB7XG4gICAgICAgICAgaW5pdDogU2Nyb2xsYmFyLmluaXQuYmluZChzd2lwZXIpLFxuICAgICAgICAgIGRlc3Ryb3k6IFNjcm9sbGJhci5kZXN0cm95LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICB1cGRhdGVTaXplOiBTY3JvbGxiYXIudXBkYXRlU2l6ZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc2V0VHJhbnNsYXRlOiBTY3JvbGxiYXIuc2V0VHJhbnNsYXRlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBzZXRUcmFuc2l0aW9uOiBTY3JvbGxiYXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICAgICAgZW5hYmxlRHJhZ2dhYmxlOiBTY3JvbGxiYXIuZW5hYmxlRHJhZ2dhYmxlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBkaXNhYmxlRHJhZ2dhYmxlOiBTY3JvbGxiYXIuZGlzYWJsZURyYWdnYWJsZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc2V0RHJhZ1Bvc2l0aW9uOiBTY3JvbGxiYXIuc2V0RHJhZ1Bvc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBnZXRQb2ludGVyUG9zaXRpb246IFNjcm9sbGJhci5nZXRQb2ludGVyUG9zaXRpb24uYmluZChzd2lwZXIpLFxuICAgICAgICAgIG9uRHJhZ1N0YXJ0OiBTY3JvbGxiYXIub25EcmFnU3RhcnQuYmluZChzd2lwZXIpLFxuICAgICAgICAgIG9uRHJhZ01vdmU6IFNjcm9sbGJhci5vbkRyYWdNb3ZlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBvbkRyYWdFbmQ6IFNjcm9sbGJhci5vbkRyYWdFbmQuYmluZChzd2lwZXIpLFxuICAgICAgICAgIGlzVG91Y2hlZDogZmFsc2UsXG4gICAgICAgICAgdGltZW91dDogbnVsbCxcbiAgICAgICAgICBkcmFnVGltZW91dDogbnVsbCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLmluaXQoKTtcbiAgICAgICAgc3dpcGVyLnNjcm9sbGJhci51cGRhdGVTaXplKCk7XG4gICAgICAgIHN3aXBlci5zY3JvbGxiYXIuc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLnVwZGF0ZVNpemUoKTtcbiAgICAgIH0sXG4gICAgICByZXNpemU6IGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHN3aXBlci5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xuICAgICAgfSxcbiAgICAgIG9ic2VydmVyVXBkYXRlOiBmdW5jdGlvbiBvYnNlcnZlclVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHN3aXBlci5zY3JvbGxiYXIudXBkYXRlU2l6ZSgpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLnNjcm9sbGJhci5zZXRUcmFuc2xhdGUoKTtcbiAgICAgIH0sXG4gICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBzd2lwZXIuc2Nyb2xsYmFyLmRlc3Ryb3koKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgUGFyYWxsYXggPSB7XG4gICAgc2V0VHJhbnNmb3JtOiBmdW5jdGlvbiBzZXRUcmFuc2Zvcm0oZWwsIHByb2dyZXNzKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsO1xuXG4gICAgICB2YXIgJGVsID0gJChlbCk7XG4gICAgICB2YXIgcnRsRmFjdG9yID0gcnRsID8gLTEgOiAxO1xuXG4gICAgICB2YXIgcCA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheCcpIHx8ICcwJztcbiAgICAgIHZhciB4ID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXgnKTtcbiAgICAgIHZhciB5ID0gJGVsLmF0dHIoJ2RhdGEtc3dpcGVyLXBhcmFsbGF4LXknKTtcbiAgICAgIHZhciBzY2FsZSA9ICRlbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1zY2FsZScpO1xuICAgICAgdmFyIG9wYWNpdHkgPSAkZWwuYXR0cignZGF0YS1zd2lwZXItcGFyYWxsYXgtb3BhY2l0eScpO1xuXG4gICAgICBpZiAoeCB8fCB5KSB7XG4gICAgICAgIHggPSB4IHx8ICcwJztcbiAgICAgICAgeSA9IHkgfHwgJzAnO1xuICAgICAgfSBlbHNlIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgeCA9IHA7XG4gICAgICAgIHkgPSAnMCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB5ID0gcDtcbiAgICAgICAgeCA9ICcwJztcbiAgICAgIH1cblxuICAgICAgaWYgKCh4KS5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICB4ID0gKHBhcnNlSW50KHgsIDEwKSAqIHByb2dyZXNzICogcnRsRmFjdG9yKSArIFwiJVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeCA9ICh4ICogcHJvZ3Jlc3MgKiBydGxGYWN0b3IpICsgXCJweFwiO1xuICAgICAgfVxuICAgICAgaWYgKCh5KS5pbmRleE9mKCclJykgPj0gMCkge1xuICAgICAgICB5ID0gKHBhcnNlSW50KHksIDEwKSAqIHByb2dyZXNzKSArIFwiJVwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgeSA9ICh5ICogcHJvZ3Jlc3MpICsgXCJweFwiO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIG9wYWNpdHkgIT09ICd1bmRlZmluZWQnICYmIG9wYWNpdHkgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRPcGFjaXR5ID0gb3BhY2l0eSAtICgob3BhY2l0eSAtIDEpICogKDEgLSBNYXRoLmFicyhwcm9ncmVzcykpKTtcbiAgICAgICAgJGVsWzBdLnN0eWxlLm9wYWNpdHkgPSBjdXJyZW50T3BhY2l0eTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2Ygc2NhbGUgPT09ICd1bmRlZmluZWQnIHx8IHNjYWxlID09PSBudWxsKSB7XG4gICAgICAgICRlbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiLCAwcHgpXCIpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBjdXJyZW50U2NhbGUgPSBzY2FsZSAtICgoc2NhbGUgLSAxKSAqICgxIC0gTWF0aC5hYnMocHJvZ3Jlc3MpKSk7XG4gICAgICAgICRlbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiLCAwcHgpIHNjYWxlKFwiICsgY3VycmVudFNjYWxlICsgXCIpXCIpKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgJGVsID0gc3dpcGVyLiRlbDtcbiAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgICAgdmFyIHByb2dyZXNzID0gc3dpcGVyLnByb2dyZXNzO1xuICAgICAgdmFyIHNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkO1xuICAgICAgJGVsLmNoaWxkcmVuKCdbZGF0YS1zd2lwZXItcGFyYWxsYXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteF0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC15XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LW9wYWNpdHldLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgtc2NhbGVdJylcbiAgICAgICAgLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICAgIHN3aXBlci5wYXJhbGxheC5zZXRUcmFuc2Zvcm0oZWwsIHByb2dyZXNzKTtcbiAgICAgICAgfSk7XG4gICAgICBzbGlkZXMuZWFjaChmdW5jdGlvbiAoc2xpZGVJbmRleCwgc2xpZGVFbCkge1xuICAgICAgICB2YXIgc2xpZGVQcm9ncmVzcyA9IHNsaWRlRWwucHJvZ3Jlc3M7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJykge1xuICAgICAgICAgIHNsaWRlUHJvZ3Jlc3MgKz0gTWF0aC5jZWlsKHNsaWRlSW5kZXggLyAyKSAtIChwcm9ncmVzcyAqIChzbmFwR3JpZC5sZW5ndGggLSAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgc2xpZGVQcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHNsaWRlUHJvZ3Jlc3MsIC0xKSwgMSk7XG4gICAgICAgICQoc2xpZGVFbCkuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXScpXG4gICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGluZGV4LCBlbCkge1xuICAgICAgICAgICAgc3dpcGVyLnBhcmFsbGF4LnNldFRyYW5zZm9ybShlbCwgc2xpZGVQcm9ncmVzcyk7XG4gICAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIGlmICggZHVyYXRpb24gPT09IHZvaWQgMCApIGR1cmF0aW9uID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG5cbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgICAkZWwuZmluZCgnW2RhdGEtc3dpcGVyLXBhcmFsbGF4XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXhdLCBbZGF0YS1zd2lwZXItcGFyYWxsYXgteV0sIFtkYXRhLXN3aXBlci1wYXJhbGxheC1vcGFjaXR5XSwgW2RhdGEtc3dpcGVyLXBhcmFsbGF4LXNjYWxlXScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uIChpbmRleCwgcGFyYWxsYXhFbCkge1xuICAgICAgICAgIHZhciAkcGFyYWxsYXhFbCA9ICQocGFyYWxsYXhFbCk7XG4gICAgICAgICAgdmFyIHBhcmFsbGF4RHVyYXRpb24gPSBwYXJzZUludCgkcGFyYWxsYXhFbC5hdHRyKCdkYXRhLXN3aXBlci1wYXJhbGxheC1kdXJhdGlvbicpLCAxMCkgfHwgZHVyYXRpb247XG4gICAgICAgICAgaWYgKGR1cmF0aW9uID09PSAwKSB7IHBhcmFsbGF4RHVyYXRpb24gPSAwOyB9XG4gICAgICAgICAgJHBhcmFsbGF4RWwudHJhbnNpdGlvbihwYXJhbGxheER1cmF0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgfSxcbiAgfTtcblxuICB2YXIgUGFyYWxsYXgkMSA9IHtcbiAgICBuYW1lOiAncGFyYWxsYXgnLFxuICAgIHBhcmFtczoge1xuICAgICAgcGFyYWxsYXg6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgcGFyYWxsYXg6IHtcbiAgICAgICAgICBzZXRUcmFuc2Zvcm06IFBhcmFsbGF4LnNldFRyYW5zZm9ybS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc2V0VHJhbnNsYXRlOiBQYXJhbGxheC5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHNldFRyYW5zaXRpb246IFBhcmFsbGF4LnNldFRyYW5zaXRpb24uYmluZChzd2lwZXIpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgPSB0cnVlO1xuICAgICAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICB9LFxuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMucGFyYWxsYXguZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLnBhcmFsbGF4LnNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5wYXJhbGxheC5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIucGFyYWxsYXguc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIFpvb20gPSB7XG4gICAgLy8gQ2FsYyBTY2FsZSBGcm9tIE11bHRpLXRvdWNoZXNcbiAgICBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzOiBmdW5jdGlvbiBnZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpIHtcbiAgICAgIGlmIChlLnRhcmdldFRvdWNoZXMubGVuZ3RoIDwgMikgeyByZXR1cm4gMTsgfVxuICAgICAgdmFyIHgxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgICAgdmFyIHkxID0gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZO1xuICAgICAgdmFyIHgyID0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VYO1xuICAgICAgdmFyIHkyID0gZS50YXJnZXRUb3VjaGVzWzFdLnBhZ2VZO1xuICAgICAgdmFyIGRpc3RhbmNlID0gTWF0aC5zcXJ0KChNYXRoLnBvdyggKHgyIC0geDEpLCAyICkpICsgKE1hdGgucG93KCAoeTIgLSB5MSksIDIgKSkpO1xuICAgICAgcmV0dXJuIGRpc3RhbmNlO1xuICAgIH0sXG4gICAgLy8gRXZlbnRzXG4gICAgb25HZXN0dXJlU3RhcnQ6IGZ1bmN0aW9uIG9uR2VzdHVyZVN0YXJ0KGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICAgIHpvb20uZmFrZUdlc3R1cmVUb3VjaGVkID0gZmFsc2U7XG4gICAgICB6b29tLmZha2VHZXN0dXJlTW92ZWQgPSBmYWxzZTtcbiAgICAgIGlmICghU3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICBpZiAoZS50eXBlICE9PSAndG91Y2hzdGFydCcgfHwgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPCAyKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB6b29tLmZha2VHZXN0dXJlVG91Y2hlZCA9IHRydWU7XG4gICAgICAgIGdlc3R1cmUuc2NhbGVTdGFydCA9IFpvb20uZ2V0RGlzdGFuY2VCZXR3ZWVuVG91Y2hlcyhlKTtcbiAgICAgIH1cbiAgICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCB8fCAhZ2VzdHVyZS4kc2xpZGVFbC5sZW5ndGgpIHtcbiAgICAgICAgZ2VzdHVyZS4kc2xpZGVFbCA9ICQoZS50YXJnZXQpLmNsb3Nlc3QoJy5zd2lwZXItc2xpZGUnKTtcbiAgICAgICAgaWYgKGdlc3R1cmUuJHNsaWRlRWwubGVuZ3RoID09PSAwKSB7IGdlc3R1cmUuJHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7IH1cbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IGdlc3R1cmUuJHNsaWRlRWwuZmluZCgnaW1nLCBzdmcsIGNhbnZhcycpO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IGdlc3R1cmUuJGltYWdlRWwucGFyZW50KChcIi5cIiArIChwYXJhbXMuY29udGFpbmVyQ2xhc3MpKSk7XG4gICAgICAgIGdlc3R1cmUubWF4UmF0aW8gPSBnZXN0dXJlLiRpbWFnZVdyYXBFbC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcGFyYW1zLm1heFJhdGlvO1xuICAgICAgICBpZiAoZ2VzdHVyZS4kaW1hZ2VXcmFwRWwubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgZ2VzdHVyZS4kaW1hZ2VFbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdlc3R1cmUuJGltYWdlRWwudHJhbnNpdGlvbigwKTtcbiAgICAgIHN3aXBlci56b29tLmlzU2NhbGluZyA9IHRydWU7XG4gICAgfSxcbiAgICBvbkdlc3R1cmVDaGFuZ2U6IGZ1bmN0aW9uIG9uR2VzdHVyZUNoYW5nZShlKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG4gICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xuICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XG4gICAgICBpZiAoIVN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNobW92ZScgfHwgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA8IDIpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHpvb20uZmFrZUdlc3R1cmVNb3ZlZCA9IHRydWU7XG4gICAgICAgIGdlc3R1cmUuc2NhbGVNb3ZlID0gWm9vbS5nZXREaXN0YW5jZUJldHdlZW5Ub3VjaGVzKGUpO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgaWYgKFN1cHBvcnQuZ2VzdHVyZXMpIHtcbiAgICAgICAgem9vbS5zY2FsZSA9IGUuc2NhbGUgKiB6b29tLmN1cnJlbnRTY2FsZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHpvb20uc2NhbGUgPSAoZ2VzdHVyZS5zY2FsZU1vdmUgLyBnZXN0dXJlLnNjYWxlU3RhcnQpICogem9vbS5jdXJyZW50U2NhbGU7XG4gICAgICB9XG4gICAgICBpZiAoem9vbS5zY2FsZSA+IGdlc3R1cmUubWF4UmF0aW8pIHtcbiAgICAgICAgem9vbS5zY2FsZSA9IChnZXN0dXJlLm1heFJhdGlvIC0gMSkgKyAoTWF0aC5wb3coICgoem9vbS5zY2FsZSAtIGdlc3R1cmUubWF4UmF0aW8pICsgMSksIDAuNSApKTtcbiAgICAgIH1cbiAgICAgIGlmICh6b29tLnNjYWxlIDwgcGFyYW1zLm1pblJhdGlvKSB7XG4gICAgICAgIHpvb20uc2NhbGUgPSAocGFyYW1zLm1pblJhdGlvICsgMSkgLSAoTWF0aC5wb3coICgocGFyYW1zLm1pblJhdGlvIC0gem9vbS5zY2FsZSkgKyAxKSwgMC41ICkpO1xuICAgICAgfVxuICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiICsgKHpvb20uc2NhbGUpICsgXCIpXCIpKTtcbiAgICB9LFxuICAgIG9uR2VzdHVyZUVuZDogZnVuY3Rpb24gb25HZXN0dXJlRW5kKGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuem9vbTtcbiAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICAgIGlmICghU3VwcG9ydC5nZXN0dXJlcykge1xuICAgICAgICBpZiAoIXpvb20uZmFrZUdlc3R1cmVUb3VjaGVkIHx8ICF6b29tLmZha2VHZXN0dXJlTW92ZWQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudHlwZSAhPT0gJ3RvdWNoZW5kJyB8fCAoZS50eXBlID09PSAndG91Y2hlbmQnICYmIGUuY2hhbmdlZFRvdWNoZXMubGVuZ3RoIDwgMiAmJiAhRGV2aWNlLmFuZHJvaWQpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHpvb20uZmFrZUdlc3R1cmVUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgIHpvb20uZmFrZUdlc3R1cmVNb3ZlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgem9vbS5zY2FsZSA9IE1hdGgubWF4KE1hdGgubWluKHpvb20uc2NhbGUsIGdlc3R1cmUubWF4UmF0aW8pLCBwYXJhbXMubWluUmF0aW8pO1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2l0aW9uKHN3aXBlci5wYXJhbXMuc3BlZWQpLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoXCIgKyAoem9vbS5zY2FsZSkgKyBcIilcIikpO1xuICAgICAgem9vbS5jdXJyZW50U2NhbGUgPSB6b29tLnNjYWxlO1xuICAgICAgem9vbS5pc1NjYWxpbmcgPSBmYWxzZTtcbiAgICAgIGlmICh6b29tLnNjYWxlID09PSAxKSB7IGdlc3R1cmUuJHNsaWRlRWwgPSB1bmRlZmluZWQ7IH1cbiAgICB9LFxuICAgIG9uVG91Y2hTdGFydDogZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGUpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xuICAgICAgdmFyIGltYWdlID0gem9vbS5pbWFnZTtcbiAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgIGlmIChpbWFnZS5pc1RvdWNoZWQpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAoRGV2aWNlLmFuZHJvaWQpIHsgZS5wcmV2ZW50RGVmYXVsdCgpOyB9XG4gICAgICBpbWFnZS5pc1RvdWNoZWQgPSB0cnVlO1xuICAgICAgaW1hZ2UudG91Y2hlc1N0YXJ0LnggPSBlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICBpbWFnZS50b3VjaGVzU3RhcnQueSA9IGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnID8gZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VZIDogZS5wYWdlWTtcbiAgICB9LFxuICAgIG9uVG91Y2hNb3ZlOiBmdW5jdGlvbiBvblRvdWNoTW92ZShlKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XG4gICAgICB2YXIgdmVsb2NpdHkgPSB6b29tLnZlbG9jaXR5O1xuICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgIGlmICghaW1hZ2UuaXNUb3VjaGVkIHx8ICFnZXN0dXJlLiRzbGlkZUVsKSB7IHJldHVybjsgfVxuXG4gICAgICBpZiAoIWltYWdlLmlzTW92ZWQpIHtcbiAgICAgICAgaW1hZ2Uud2lkdGggPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICBpbWFnZS5oZWlnaHQgPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldEhlaWdodDtcbiAgICAgICAgaW1hZ2Uuc3RhcnRYID0gVXRpbHMuZ2V0VHJhbnNsYXRlKGdlc3R1cmUuJGltYWdlV3JhcEVsWzBdLCAneCcpIHx8IDA7XG4gICAgICAgIGltYWdlLnN0YXJ0WSA9IFV0aWxzLmdldFRyYW5zbGF0ZShnZXN0dXJlLiRpbWFnZVdyYXBFbFswXSwgJ3knKSB8fCAwO1xuICAgICAgICBnZXN0dXJlLnNsaWRlV2lkdGggPSBnZXN0dXJlLiRzbGlkZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICBnZXN0dXJlLnNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMCk7XG4gICAgICAgIGlmIChzd2lwZXIucnRsKSB7XG4gICAgICAgICAgaW1hZ2Uuc3RhcnRYID0gLWltYWdlLnN0YXJ0WDtcbiAgICAgICAgICBpbWFnZS5zdGFydFkgPSAtaW1hZ2Uuc3RhcnRZO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvLyBEZWZpbmUgaWYgd2UgbmVlZCBpbWFnZSBkcmFnXG4gICAgICB2YXIgc2NhbGVkV2lkdGggPSBpbWFnZS53aWR0aCAqIHpvb20uc2NhbGU7XG4gICAgICB2YXIgc2NhbGVkSGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0ICogem9vbS5zY2FsZTtcblxuICAgICAgaWYgKHNjYWxlZFdpZHRoIDwgZ2VzdHVyZS5zbGlkZVdpZHRoICYmIHNjYWxlZEhlaWdodCA8IGdlc3R1cmUuc2xpZGVIZWlnaHQpIHsgcmV0dXJuOyB9XG5cbiAgICAgIGltYWdlLm1pblggPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVXaWR0aCAvIDIpIC0gKHNjYWxlZFdpZHRoIC8gMikpLCAwKTtcbiAgICAgIGltYWdlLm1heFggPSAtaW1hZ2UubWluWDtcbiAgICAgIGltYWdlLm1pblkgPSBNYXRoLm1pbigoKGdlc3R1cmUuc2xpZGVIZWlnaHQgLyAyKSAtIChzY2FsZWRIZWlnaHQgLyAyKSksIDApO1xuICAgICAgaW1hZ2UubWF4WSA9IC1pbWFnZS5taW5ZO1xuXG4gICAgICBpbWFnZS50b3VjaGVzQ3VycmVudC54ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCA6IGUucGFnZVg7XG4gICAgICBpbWFnZS50b3VjaGVzQ3VycmVudC55ID0gZS50eXBlID09PSAndG91Y2htb3ZlJyA/IGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG5cbiAgICAgIGlmICghaW1hZ2UuaXNNb3ZlZCAmJiAhem9vbS5pc1NjYWxpbmcpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHN3aXBlci5pc0hvcml6b250YWwoKVxuICAgICAgICAgICYmIChcbiAgICAgICAgICAgIChNYXRoLmZsb29yKGltYWdlLm1pblgpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WCkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueCA8IGltYWdlLnRvdWNoZXNTdGFydC54KVxuICAgICAgICAgICAgfHwgKE1hdGguZmxvb3IoaW1hZ2UubWF4WCkgPT09IE1hdGguZmxvb3IoaW1hZ2Uuc3RhcnRYKSAmJiBpbWFnZS50b3VjaGVzQ3VycmVudC54ID4gaW1hZ2UudG91Y2hlc1N0YXJ0LngpXG4gICAgICAgICAgKVxuICAgICAgICApIHtcbiAgICAgICAgICBpbWFnZS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gaWYgKFxuICAgICAgICAgICFzd2lwZXIuaXNIb3Jpem9udGFsKClcbiAgICAgICAgICAmJiAoXG4gICAgICAgICAgICAoTWF0aC5mbG9vcihpbWFnZS5taW5ZKSA9PT0gTWF0aC5mbG9vcihpbWFnZS5zdGFydFkpICYmIGltYWdlLnRvdWNoZXNDdXJyZW50LnkgPCBpbWFnZS50b3VjaGVzU3RhcnQueSlcbiAgICAgICAgICAgIHx8IChNYXRoLmZsb29yKGltYWdlLm1heFkpID09PSBNYXRoLmZsb29yKGltYWdlLnN0YXJ0WSkgJiYgaW1hZ2UudG91Y2hlc0N1cnJlbnQueSA+IGltYWdlLnRvdWNoZXNTdGFydC55KVxuICAgICAgICAgIClcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW1hZ2UuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpbWFnZS5pc01vdmVkID0gdHJ1ZTtcbiAgICAgIGltYWdlLmN1cnJlbnRYID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSBpbWFnZS50b3VjaGVzU3RhcnQueCkgKyBpbWFnZS5zdGFydFg7XG4gICAgICBpbWFnZS5jdXJyZW50WSA9IChpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gaW1hZ2UudG91Y2hlc1N0YXJ0LnkpICsgaW1hZ2Uuc3RhcnRZO1xuXG4gICAgICBpZiAoaW1hZ2UuY3VycmVudFggPCBpbWFnZS5taW5YKSB7XG4gICAgICAgIGltYWdlLmN1cnJlbnRYID0gKGltYWdlLm1pblggKyAxKSAtIChNYXRoLnBvdyggKChpbWFnZS5taW5YIC0gaW1hZ2UuY3VycmVudFgpICsgMSksIDAuOCApKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbWFnZS5jdXJyZW50WCA+IGltYWdlLm1heFgpIHtcbiAgICAgICAgaW1hZ2UuY3VycmVudFggPSAoaW1hZ2UubWF4WCAtIDEpICsgKE1hdGgucG93KCAoKGltYWdlLmN1cnJlbnRYIC0gaW1hZ2UubWF4WCkgKyAxKSwgMC44ICkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW1hZ2UuY3VycmVudFkgPCBpbWFnZS5taW5ZKSB7XG4gICAgICAgIGltYWdlLmN1cnJlbnRZID0gKGltYWdlLm1pblkgKyAxKSAtIChNYXRoLnBvdyggKChpbWFnZS5taW5ZIC0gaW1hZ2UuY3VycmVudFkpICsgMSksIDAuOCApKTtcbiAgICAgIH1cbiAgICAgIGlmIChpbWFnZS5jdXJyZW50WSA+IGltYWdlLm1heFkpIHtcbiAgICAgICAgaW1hZ2UuY3VycmVudFkgPSAoaW1hZ2UubWF4WSAtIDEpICsgKE1hdGgucG93KCAoKGltYWdlLmN1cnJlbnRZIC0gaW1hZ2UubWF4WSkgKyAxKSwgMC44ICkpO1xuICAgICAgfVxuXG4gICAgICAvLyBWZWxvY2l0eVxuICAgICAgaWYgKCF2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSB7IHZlbG9jaXR5LnByZXZQb3NpdGlvblggPSBpbWFnZS50b3VjaGVzQ3VycmVudC54OyB9XG4gICAgICBpZiAoIXZlbG9jaXR5LnByZXZQb3NpdGlvblkpIHsgdmVsb2NpdHkucHJldlBvc2l0aW9uWSA9IGltYWdlLnRvdWNoZXNDdXJyZW50Lnk7IH1cbiAgICAgIGlmICghdmVsb2NpdHkucHJldlRpbWUpIHsgdmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpOyB9XG4gICAgICB2ZWxvY2l0eS54ID0gKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSAvIChEYXRlLm5vdygpIC0gdmVsb2NpdHkucHJldlRpbWUpIC8gMjtcbiAgICAgIHZlbG9jaXR5LnkgPSAoaW1hZ2UudG91Y2hlc0N1cnJlbnQueSAtIHZlbG9jaXR5LnByZXZQb3NpdGlvblkpIC8gKERhdGUubm93KCkgLSB2ZWxvY2l0eS5wcmV2VGltZSkgLyAyO1xuICAgICAgaWYgKE1hdGguYWJzKGltYWdlLnRvdWNoZXNDdXJyZW50LnggLSB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YKSA8IDIpIHsgdmVsb2NpdHkueCA9IDA7IH1cbiAgICAgIGlmIChNYXRoLmFicyhpbWFnZS50b3VjaGVzQ3VycmVudC55IC0gdmVsb2NpdHkucHJldlBvc2l0aW9uWSkgPCAyKSB7IHZlbG9jaXR5LnkgPSAwOyB9XG4gICAgICB2ZWxvY2l0eS5wcmV2UG9zaXRpb25YID0gaW1hZ2UudG91Y2hlc0N1cnJlbnQueDtcbiAgICAgIHZlbG9jaXR5LnByZXZQb3NpdGlvblkgPSBpbWFnZS50b3VjaGVzQ3VycmVudC55O1xuICAgICAgdmVsb2NpdHkucHJldlRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyAoaW1hZ2UuY3VycmVudFgpICsgXCJweCwgXCIgKyAoaW1hZ2UuY3VycmVudFkpICsgXCJweCwwKVwiKSk7XG4gICAgfSxcbiAgICBvblRvdWNoRW5kOiBmdW5jdGlvbiBvblRvdWNoRW5kKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xuICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XG4gICAgICB2YXIgaW1hZ2UgPSB6b29tLmltYWdlO1xuICAgICAgdmFyIHZlbG9jaXR5ID0gem9vbS52ZWxvY2l0eTtcbiAgICAgIGlmICghZ2VzdHVyZS4kaW1hZ2VFbCB8fCBnZXN0dXJlLiRpbWFnZUVsLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgIGlmICghaW1hZ2UuaXNUb3VjaGVkIHx8ICFpbWFnZS5pc01vdmVkKSB7XG4gICAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBpbWFnZS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGltYWdlLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgaW1hZ2UuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb25YID0gMzAwO1xuICAgICAgdmFyIG1vbWVudHVtRHVyYXRpb25ZID0gMzAwO1xuICAgICAgdmFyIG1vbWVudHVtRGlzdGFuY2VYID0gdmVsb2NpdHkueCAqIG1vbWVudHVtRHVyYXRpb25YO1xuICAgICAgdmFyIG5ld1Bvc2l0aW9uWCA9IGltYWdlLmN1cnJlbnRYICsgbW9tZW50dW1EaXN0YW5jZVg7XG4gICAgICB2YXIgbW9tZW50dW1EaXN0YW5jZVkgPSB2ZWxvY2l0eS55ICogbW9tZW50dW1EdXJhdGlvblk7XG4gICAgICB2YXIgbmV3UG9zaXRpb25ZID0gaW1hZ2UuY3VycmVudFkgKyBtb21lbnR1bURpc3RhbmNlWTtcblxuICAgICAgLy8gRml4IGR1cmF0aW9uXG4gICAgICBpZiAodmVsb2NpdHkueCAhPT0gMCkgeyBtb21lbnR1bUR1cmF0aW9uWCA9IE1hdGguYWJzKChuZXdQb3NpdGlvblggLSBpbWFnZS5jdXJyZW50WCkgLyB2ZWxvY2l0eS54KTsgfVxuICAgICAgaWYgKHZlbG9jaXR5LnkgIT09IDApIHsgbW9tZW50dW1EdXJhdGlvblkgPSBNYXRoLmFicygobmV3UG9zaXRpb25ZIC0gaW1hZ2UuY3VycmVudFkpIC8gdmVsb2NpdHkueSk7IH1cbiAgICAgIHZhciBtb21lbnR1bUR1cmF0aW9uID0gTWF0aC5tYXgobW9tZW50dW1EdXJhdGlvblgsIG1vbWVudHVtRHVyYXRpb25ZKTtcblxuICAgICAgaW1hZ2UuY3VycmVudFggPSBuZXdQb3NpdGlvblg7XG4gICAgICBpbWFnZS5jdXJyZW50WSA9IG5ld1Bvc2l0aW9uWTtcblxuICAgICAgLy8gRGVmaW5lIGlmIHdlIG5lZWQgaW1hZ2UgZHJhZ1xuICAgICAgdmFyIHNjYWxlZFdpZHRoID0gaW1hZ2Uud2lkdGggKiB6b29tLnNjYWxlO1xuICAgICAgdmFyIHNjYWxlZEhlaWdodCA9IGltYWdlLmhlaWdodCAqIHpvb20uc2NhbGU7XG4gICAgICBpbWFnZS5taW5YID0gTWF0aC5taW4oKChnZXN0dXJlLnNsaWRlV2lkdGggLyAyKSAtIChzY2FsZWRXaWR0aCAvIDIpKSwgMCk7XG4gICAgICBpbWFnZS5tYXhYID0gLWltYWdlLm1pblg7XG4gICAgICBpbWFnZS5taW5ZID0gTWF0aC5taW4oKChnZXN0dXJlLnNsaWRlSGVpZ2h0IC8gMikgLSAoc2NhbGVkSGVpZ2h0IC8gMikpLCAwKTtcbiAgICAgIGltYWdlLm1heFkgPSAtaW1hZ2UubWluWTtcbiAgICAgIGltYWdlLmN1cnJlbnRYID0gTWF0aC5tYXgoTWF0aC5taW4oaW1hZ2UuY3VycmVudFgsIGltYWdlLm1heFgpLCBpbWFnZS5taW5YKTtcbiAgICAgIGltYWdlLmN1cnJlbnRZID0gTWF0aC5tYXgoTWF0aC5taW4oaW1hZ2UuY3VycmVudFksIGltYWdlLm1heFkpLCBpbWFnZS5taW5ZKTtcblxuICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwudHJhbnNpdGlvbihtb21lbnR1bUR1cmF0aW9uKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyAoaW1hZ2UuY3VycmVudFgpICsgXCJweCwgXCIgKyAoaW1hZ2UuY3VycmVudFkpICsgXCJweCwwKVwiKSk7XG4gICAgfSxcbiAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgIHZhciBnZXN0dXJlID0gem9vbS5nZXN0dXJlO1xuICAgICAgaWYgKGdlc3R1cmUuJHNsaWRlRWwgJiYgc3dpcGVyLnByZXZpb3VzSW5kZXggIT09IHN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKDEpJyk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zZm9ybSgndHJhbnNsYXRlM2QoMCwwLDApJyk7XG5cbiAgICAgICAgem9vbS5zY2FsZSA9IDE7XG4gICAgICAgIHpvb20uY3VycmVudFNjYWxlID0gMTtcblxuICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZUVsID0gdW5kZWZpbmVkO1xuICAgICAgICBnZXN0dXJlLiRpbWFnZVdyYXBFbCA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9LFxuICAgIC8vIFRvZ2dsZSBab29tXG4gICAgdG9nZ2xlOiBmdW5jdGlvbiB0b2dnbGUoZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgem9vbSA9IHN3aXBlci56b29tO1xuXG4gICAgICBpZiAoem9vbS5zY2FsZSAmJiB6b29tLnNjYWxlICE9PSAxKSB7XG4gICAgICAgIC8vIFpvb20gT3V0XG4gICAgICAgIHpvb20ub3V0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBab29tIEluXG4gICAgICAgIHpvb20uaW4oZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBpbjogZnVuY3Rpb24gaW4kMShlKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcblxuICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnpvb207XG4gICAgICB2YXIgZ2VzdHVyZSA9IHpvb20uZ2VzdHVyZTtcbiAgICAgIHZhciBpbWFnZSA9IHpvb20uaW1hZ2U7XG5cbiAgICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCkge1xuICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLmNsaWNrZWRTbGlkZSA/ICQoc3dpcGVyLmNsaWNrZWRTbGlkZSkgOiBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSBnZXN0dXJlLiRzbGlkZUVsLmZpbmQoJ2ltZywgc3ZnLCBjYW52YXMnKTtcbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwgPSBnZXN0dXJlLiRpbWFnZUVsLnBhcmVudCgoXCIuXCIgKyAocGFyYW1zLmNvbnRhaW5lckNsYXNzKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICBnZXN0dXJlLiRzbGlkZUVsLmFkZENsYXNzKChcIlwiICsgKHBhcmFtcy56b29tZWRTbGlkZUNsYXNzKSkpO1xuXG4gICAgICB2YXIgdG91Y2hYO1xuICAgICAgdmFyIHRvdWNoWTtcbiAgICAgIHZhciBvZmZzZXRYO1xuICAgICAgdmFyIG9mZnNldFk7XG4gICAgICB2YXIgZGlmZlg7XG4gICAgICB2YXIgZGlmZlk7XG4gICAgICB2YXIgdHJhbnNsYXRlWDtcbiAgICAgIHZhciB0cmFuc2xhdGVZO1xuICAgICAgdmFyIGltYWdlV2lkdGg7XG4gICAgICB2YXIgaW1hZ2VIZWlnaHQ7XG4gICAgICB2YXIgc2NhbGVkV2lkdGg7XG4gICAgICB2YXIgc2NhbGVkSGVpZ2h0O1xuICAgICAgdmFyIHRyYW5zbGF0ZU1pblg7XG4gICAgICB2YXIgdHJhbnNsYXRlTWluWTtcbiAgICAgIHZhciB0cmFuc2xhdGVNYXhYO1xuICAgICAgdmFyIHRyYW5zbGF0ZU1heFk7XG4gICAgICB2YXIgc2xpZGVXaWR0aDtcbiAgICAgIHZhciBzbGlkZUhlaWdodDtcblxuICAgICAgaWYgKHR5cGVvZiBpbWFnZS50b3VjaGVzU3RhcnQueCA9PT0gJ3VuZGVmaW5lZCcgJiYgZSkge1xuICAgICAgICB0b3VjaFggPSBlLnR5cGUgPT09ICd0b3VjaGVuZCcgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYIDogZS5wYWdlWDtcbiAgICAgICAgdG91Y2hZID0gZS50eXBlID09PSAndG91Y2hlbmQnID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWSA6IGUucGFnZVk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0b3VjaFggPSBpbWFnZS50b3VjaGVzU3RhcnQueDtcbiAgICAgICAgdG91Y2hZID0gaW1hZ2UudG91Y2hlc1N0YXJ0Lnk7XG4gICAgICB9XG5cbiAgICAgIHpvb20uc2NhbGUgPSBnZXN0dXJlLiRpbWFnZVdyYXBFbC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcGFyYW1zLm1heFJhdGlvO1xuICAgICAgem9vbS5jdXJyZW50U2NhbGUgPSBnZXN0dXJlLiRpbWFnZVdyYXBFbC5hdHRyKCdkYXRhLXN3aXBlci16b29tJykgfHwgcGFyYW1zLm1heFJhdGlvO1xuICAgICAgaWYgKGUpIHtcbiAgICAgICAgc2xpZGVXaWR0aCA9IGdlc3R1cmUuJHNsaWRlRWxbMF0ub2Zmc2V0V2lkdGg7XG4gICAgICAgIHNsaWRlSGVpZ2h0ID0gZ2VzdHVyZS4kc2xpZGVFbFswXS5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIG9mZnNldFggPSBnZXN0dXJlLiRzbGlkZUVsLm9mZnNldCgpLmxlZnQ7XG4gICAgICAgIG9mZnNldFkgPSBnZXN0dXJlLiRzbGlkZUVsLm9mZnNldCgpLnRvcDtcbiAgICAgICAgZGlmZlggPSAob2Zmc2V0WCArIChzbGlkZVdpZHRoIC8gMikpIC0gdG91Y2hYO1xuICAgICAgICBkaWZmWSA9IChvZmZzZXRZICsgKHNsaWRlSGVpZ2h0IC8gMikpIC0gdG91Y2hZO1xuXG4gICAgICAgIGltYWdlV2lkdGggPSBnZXN0dXJlLiRpbWFnZUVsWzBdLm9mZnNldFdpZHRoO1xuICAgICAgICBpbWFnZUhlaWdodCA9IGdlc3R1cmUuJGltYWdlRWxbMF0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBzY2FsZWRXaWR0aCA9IGltYWdlV2lkdGggKiB6b29tLnNjYWxlO1xuICAgICAgICBzY2FsZWRIZWlnaHQgPSBpbWFnZUhlaWdodCAqIHpvb20uc2NhbGU7XG5cbiAgICAgICAgdHJhbnNsYXRlTWluWCA9IE1hdGgubWluKCgoc2xpZGVXaWR0aCAvIDIpIC0gKHNjYWxlZFdpZHRoIC8gMikpLCAwKTtcbiAgICAgICAgdHJhbnNsYXRlTWluWSA9IE1hdGgubWluKCgoc2xpZGVIZWlnaHQgLyAyKSAtIChzY2FsZWRIZWlnaHQgLyAyKSksIDApO1xuICAgICAgICB0cmFuc2xhdGVNYXhYID0gLXRyYW5zbGF0ZU1pblg7XG4gICAgICAgIHRyYW5zbGF0ZU1heFkgPSAtdHJhbnNsYXRlTWluWTtcblxuICAgICAgICB0cmFuc2xhdGVYID0gZGlmZlggKiB6b29tLnNjYWxlO1xuICAgICAgICB0cmFuc2xhdGVZID0gZGlmZlkgKiB6b29tLnNjYWxlO1xuXG4gICAgICAgIGlmICh0cmFuc2xhdGVYIDwgdHJhbnNsYXRlTWluWCkge1xuICAgICAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGVNaW5YO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFuc2xhdGVYID4gdHJhbnNsYXRlTWF4WCkge1xuICAgICAgICAgIHRyYW5zbGF0ZVggPSB0cmFuc2xhdGVNYXhYO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRyYW5zbGF0ZVkgPCB0cmFuc2xhdGVNaW5ZKSB7XG4gICAgICAgICAgdHJhbnNsYXRlWSA9IHRyYW5zbGF0ZU1pblk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRyYW5zbGF0ZVkgPiB0cmFuc2xhdGVNYXhZKSB7XG4gICAgICAgICAgdHJhbnNsYXRlWSA9IHRyYW5zbGF0ZU1heFk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zbGF0ZVggPSAwO1xuICAgICAgICB0cmFuc2xhdGVZID0gMDtcbiAgICAgIH1cbiAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoXCIgKyB0cmFuc2xhdGVYICsgXCJweCwgXCIgKyB0cmFuc2xhdGVZICsgXCJweCwwKVwiKSk7XG4gICAgICBnZXN0dXJlLiRpbWFnZUVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlKFwiICsgKHpvb20uc2NhbGUpICsgXCIpXCIpKTtcbiAgICB9LFxuICAgIG91dDogZnVuY3Rpb24gb3V0KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG5cbiAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy56b29tO1xuICAgICAgdmFyIGdlc3R1cmUgPSB6b29tLmdlc3R1cmU7XG5cbiAgICAgIGlmICghZ2VzdHVyZS4kc2xpZGVFbCkge1xuICAgICAgICBnZXN0dXJlLiRzbGlkZUVsID0gc3dpcGVyLmNsaWNrZWRTbGlkZSA/ICQoc3dpcGVyLmNsaWNrZWRTbGlkZSkgOiBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIGdlc3R1cmUuJGltYWdlRWwgPSBnZXN0dXJlLiRzbGlkZUVsLmZpbmQoJ2ltZywgc3ZnLCBjYW52YXMnKTtcbiAgICAgICAgZ2VzdHVyZS4kaW1hZ2VXcmFwRWwgPSBnZXN0dXJlLiRpbWFnZUVsLnBhcmVudCgoXCIuXCIgKyAocGFyYW1zLmNvbnRhaW5lckNsYXNzKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXN0dXJlLiRpbWFnZUVsIHx8IGdlc3R1cmUuJGltYWdlRWwubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICB6b29tLnNjYWxlID0gMTtcbiAgICAgIHpvb20uY3VycmVudFNjYWxlID0gMTtcbiAgICAgIGdlc3R1cmUuJGltYWdlV3JhcEVsLnRyYW5zaXRpb24oMzAwKS50cmFuc2Zvcm0oJ3RyYW5zbGF0ZTNkKDAsMCwwKScpO1xuICAgICAgZ2VzdHVyZS4kaW1hZ2VFbC50cmFuc2l0aW9uKDMwMCkudHJhbnNmb3JtKCd0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGUoMSknKTtcbiAgICAgIGdlc3R1cmUuJHNsaWRlRWwucmVtb3ZlQ2xhc3MoKFwiXCIgKyAocGFyYW1zLnpvb21lZFNsaWRlQ2xhc3MpKSk7XG4gICAgICBnZXN0dXJlLiRzbGlkZUVsID0gdW5kZWZpbmVkO1xuICAgIH0sXG4gICAgLy8gQXR0YWNoL0RldGFjaCBFdmVudHNcbiAgICBlbmFibGU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHpvb20gPSBzd2lwZXIuem9vbTtcbiAgICAgIGlmICh6b29tLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICB6b29tLmVuYWJsZWQgPSB0cnVlO1xuXG4gICAgICB2YXIgcGFzc2l2ZUxpc3RlbmVyID0gc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgc3dpcGVyLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgICB2YXIgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZSA9IFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogdHJ1ZSB9IDogdHJ1ZTtcblxuICAgICAgLy8gU2NhbGUgaW1hZ2VcbiAgICAgIGlmIChTdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKCdnZXN0dXJlc3RhcnQnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKCdnZXN0dXJlY2hhbmdlJywgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oJ2dlc3R1cmVlbmQnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIGlmIChzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVTdGFydCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLm1vdmUsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVDaGFuZ2UsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9uKHN3aXBlci50b3VjaEV2ZW50cy5lbmQsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIGlmIChzd2lwZXIudG91Y2hFdmVudHMuY2FuY2VsKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub24oc3dpcGVyLnRvdWNoRXZlbnRzLmNhbmNlbCwgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUVuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBNb3ZlIGltYWdlXG4gICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vbihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgKFwiLlwiICsgKHN3aXBlci5wYXJhbXMuem9vbS5jb250YWluZXJDbGFzcykpLCB6b29tLm9uVG91Y2hNb3ZlLCBhY3RpdmVMaXN0ZW5lcldpdGhDYXB0dXJlKTtcbiAgICB9LFxuICAgIGRpc2FibGU6IGZ1bmN0aW9uIGRpc2FibGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciB6b29tID0gc3dpcGVyLnpvb207XG4gICAgICBpZiAoIXpvb20uZW5hYmxlZCkgeyByZXR1cm47IH1cblxuICAgICAgc3dpcGVyLnpvb20uZW5hYmxlZCA9IGZhbHNlO1xuXG4gICAgICB2YXIgcGFzc2l2ZUxpc3RlbmVyID0gc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0ID09PSAndG91Y2hzdGFydCcgJiYgU3VwcG9ydC5wYXNzaXZlTGlzdGVuZXIgJiYgc3dpcGVyLnBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8geyBwYXNzaXZlOiB0cnVlLCBjYXB0dXJlOiBmYWxzZSB9IDogZmFsc2U7XG4gICAgICB2YXIgYWN0aXZlTGlzdGVuZXJXaXRoQ2FwdHVyZSA9IFN1cHBvcnQucGFzc2l2ZUxpc3RlbmVyID8geyBwYXNzaXZlOiBmYWxzZSwgY2FwdHVyZTogdHJ1ZSB9IDogdHJ1ZTtcblxuICAgICAgLy8gU2NhbGUgaW1hZ2VcbiAgICAgIGlmIChTdXBwb3J0Lmdlc3R1cmVzKSB7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZignZ2VzdHVyZXN0YXJ0JywgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZVN0YXJ0LCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoJ2dlc3R1cmVjaGFuZ2UnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlQ2hhbmdlLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoJ2dlc3R1cmVlbmQnLCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICAgICAgfSBlbHNlIGlmIChzd2lwZXIudG91Y2hFdmVudHMuc3RhcnQgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbC5vZmYoc3dpcGVyLnRvdWNoRXZlbnRzLnN0YXJ0LCAnLnN3aXBlci1zbGlkZScsIHpvb20ub25HZXN0dXJlU3RhcnQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIHN3aXBlci4kd3JhcHBlckVsLm9mZihzd2lwZXIudG91Y2hFdmVudHMubW92ZSwgJy5zd2lwZXItc2xpZGUnLCB6b29tLm9uR2VzdHVyZUNoYW5nZSwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5lbmQsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIGlmIChzd2lwZXIudG91Y2hFdmVudHMuY2FuY2VsKSB7XG4gICAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5jYW5jZWwsICcuc3dpcGVyLXNsaWRlJywgem9vbS5vbkdlc3R1cmVFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTW92ZSBpbWFnZVxuICAgICAgc3dpcGVyLiR3cmFwcGVyRWwub2ZmKHN3aXBlci50b3VjaEV2ZW50cy5tb3ZlLCAoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy56b29tLmNvbnRhaW5lckNsYXNzKSksIHpvb20ub25Ub3VjaE1vdmUsIGFjdGl2ZUxpc3RlbmVyV2l0aENhcHR1cmUpO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIFpvb20kMSA9IHtcbiAgICBuYW1lOiAnem9vbScsXG4gICAgcGFyYW1zOiB7XG4gICAgICB6b29tOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBtYXhSYXRpbzogMyxcbiAgICAgICAgbWluUmF0aW86IDEsXG4gICAgICAgIHRvZ2dsZTogdHJ1ZSxcbiAgICAgICAgY29udGFpbmVyQ2xhc3M6ICdzd2lwZXItem9vbS1jb250YWluZXInLFxuICAgICAgICB6b29tZWRTbGlkZUNsYXNzOiAnc3dpcGVyLXNsaWRlLXpvb21lZCcsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciB6b29tID0ge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgIGN1cnJlbnRTY2FsZTogMSxcbiAgICAgICAgaXNTY2FsaW5nOiBmYWxzZSxcbiAgICAgICAgZ2VzdHVyZToge1xuICAgICAgICAgICRzbGlkZUVsOiB1bmRlZmluZWQsXG4gICAgICAgICAgc2xpZGVXaWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgIHNsaWRlSGVpZ2h0OiB1bmRlZmluZWQsXG4gICAgICAgICAgJGltYWdlRWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICAkaW1hZ2VXcmFwRWw6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtYXhSYXRpbzogMyxcbiAgICAgICAgfSxcbiAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXG4gICAgICAgICAgY3VycmVudFg6IHVuZGVmaW5lZCxcbiAgICAgICAgICBjdXJyZW50WTogdW5kZWZpbmVkLFxuICAgICAgICAgIG1pblg6IHVuZGVmaW5lZCxcbiAgICAgICAgICBtaW5ZOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWF4WDogdW5kZWZpbmVkLFxuICAgICAgICAgIG1heFk6IHVuZGVmaW5lZCxcbiAgICAgICAgICB3aWR0aDogdW5kZWZpbmVkLFxuICAgICAgICAgIGhlaWdodDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXJ0WDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0YXJ0WTogdW5kZWZpbmVkLFxuICAgICAgICAgIHRvdWNoZXNTdGFydDoge30sXG4gICAgICAgICAgdG91Y2hlc0N1cnJlbnQ6IHt9LFxuICAgICAgICB9LFxuICAgICAgICB2ZWxvY2l0eToge1xuICAgICAgICAgIHg6IHVuZGVmaW5lZCxcbiAgICAgICAgICB5OiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJldlBvc2l0aW9uWDogdW5kZWZpbmVkLFxuICAgICAgICAgIHByZXZQb3NpdGlvblk6IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcmV2VGltZTogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgKCdvbkdlc3R1cmVTdGFydCBvbkdlc3R1cmVDaGFuZ2Ugb25HZXN0dXJlRW5kIG9uVG91Y2hTdGFydCBvblRvdWNoTW92ZSBvblRvdWNoRW5kIG9uVHJhbnNpdGlvbkVuZCB0b2dnbGUgZW5hYmxlIGRpc2FibGUgaW4gb3V0Jykuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChtZXRob2ROYW1lKSB7XG4gICAgICAgIHpvb21bbWV0aG9kTmFtZV0gPSBab29tW21ldGhvZE5hbWVdLmJpbmQoc3dpcGVyKTtcbiAgICAgIH0pO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICB6b29tOiB6b29tLFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBzY2FsZSA9IDE7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoc3dpcGVyLnpvb20sICdzY2FsZScsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgcmV0dXJuIHNjYWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICAgIGlmIChzY2FsZSAhPT0gdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpbWFnZUVsID0gc3dpcGVyLnpvb20uZ2VzdHVyZS4kaW1hZ2VFbCA/IHN3aXBlci56b29tLmdlc3R1cmUuJGltYWdlRWxbMF0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YXIgc2xpZGVFbCA9IHN3aXBlci56b29tLmdlc3R1cmUuJHNsaWRlRWwgPyBzd2lwZXIuem9vbS5nZXN0dXJlLiRzbGlkZUVsWzBdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3pvb21DaGFuZ2UnLCB2YWx1ZSwgaW1hZ2VFbCwgc2xpZGVFbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjYWxlID0gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBpbml0OiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLnpvb20uZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgc3dpcGVyLnpvb20uZGlzYWJsZSgpO1xuICAgICAgfSxcbiAgICAgIHRvdWNoU3RhcnQ6IGZ1bmN0aW9uIHRvdWNoU3RhcnQoZSkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIuem9vbS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIuem9vbS5vblRvdWNoU3RhcnQoZSk7XG4gICAgICB9LFxuICAgICAgdG91Y2hFbmQ6IGZ1bmN0aW9uIHRvdWNoRW5kKGUpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnpvb20uZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLnpvb20ub25Ub3VjaEVuZChlKTtcbiAgICAgIH0sXG4gICAgICBkb3VibGVUYXA6IGZ1bmN0aW9uIGRvdWJsZVRhcChlKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy56b29tLmVuYWJsZWQgJiYgc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20udG9nZ2xlKSB7XG4gICAgICAgICAgc3dpcGVyLnpvb20udG9nZ2xlKGUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuem9vbS5lbmFibGVkICYmIHN3aXBlci5wYXJhbXMuem9vbS5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLnpvb20ub25UcmFuc2l0aW9uRW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzbGlkZUNoYW5nZTogZnVuY3Rpb24gc2xpZGVDaGFuZ2UoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnpvb20uZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIuem9vbS5vblRyYW5zaXRpb25FbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHZhciBMYXp5ID0ge1xuICAgIGxvYWRJblNsaWRlOiBmdW5jdGlvbiBsb2FkSW5TbGlkZShpbmRleCwgbG9hZEluRHVwbGljYXRlKSB7XG4gICAgICBpZiAoIGxvYWRJbkR1cGxpY2F0ZSA9PT0gdm9pZCAwICkgbG9hZEluRHVwbGljYXRlID0gdHJ1ZTtcblxuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5sYXp5O1xuICAgICAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlcy5sZW5ndGggPT09IDApIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG5cbiAgICAgIHZhciAkc2xpZGVFbCA9IGlzVmlydHVhbFxuICAgICAgICA/IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgaW5kZXggKyBcIlxcXCJdXCIpKVxuICAgICAgICA6IHN3aXBlci5zbGlkZXMuZXEoaW5kZXgpO1xuXG4gICAgICB2YXIgJGltYWdlcyA9ICRzbGlkZUVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy5lbGVtZW50Q2xhc3MpICsgXCI6bm90KC5cIiArIChwYXJhbXMubG9hZGVkQ2xhc3MpICsgXCIpOm5vdCguXCIgKyAocGFyYW1zLmxvYWRpbmdDbGFzcykgKyBcIilcIikpO1xuICAgICAgaWYgKCRzbGlkZUVsLmhhc0NsYXNzKHBhcmFtcy5lbGVtZW50Q2xhc3MpICYmICEkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMubG9hZGVkQ2xhc3MpICYmICEkc2xpZGVFbC5oYXNDbGFzcyhwYXJhbXMubG9hZGluZ0NsYXNzKSkge1xuICAgICAgICAkaW1hZ2VzID0gJGltYWdlcy5hZGQoJHNsaWRlRWxbMF0pO1xuICAgICAgfVxuICAgICAgaWYgKCRpbWFnZXMubGVuZ3RoID09PSAwKSB7IHJldHVybjsgfVxuXG4gICAgICAkaW1hZ2VzLmVhY2goZnVuY3Rpb24gKGltYWdlSW5kZXgsIGltYWdlRWwpIHtcbiAgICAgICAgdmFyICRpbWFnZUVsID0gJChpbWFnZUVsKTtcbiAgICAgICAgJGltYWdlRWwuYWRkQ2xhc3MocGFyYW1zLmxvYWRpbmdDbGFzcyk7XG5cbiAgICAgICAgdmFyIGJhY2tncm91bmQgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLWJhY2tncm91bmQnKTtcbiAgICAgICAgdmFyIHNyYyA9ICRpbWFnZUVsLmF0dHIoJ2RhdGEtc3JjJyk7XG4gICAgICAgIHZhciBzcmNzZXQgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLXNyY3NldCcpO1xuICAgICAgICB2YXIgc2l6ZXMgPSAkaW1hZ2VFbC5hdHRyKCdkYXRhLXNpemVzJyk7XG5cbiAgICAgICAgc3dpcGVyLmxvYWRJbWFnZSgkaW1hZ2VFbFswXSwgKHNyYyB8fCBiYWNrZ3JvdW5kKSwgc3Jjc2V0LCBzaXplcywgZmFsc2UsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHN3aXBlciA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyID09PSBudWxsIHx8ICFzd2lwZXIgfHwgKHN3aXBlciAmJiAhc3dpcGVyLnBhcmFtcykgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBpZiAoYmFja2dyb3VuZCkge1xuICAgICAgICAgICAgJGltYWdlRWwuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywgKFwidXJsKFxcXCJcIiArIGJhY2tncm91bmQgKyBcIlxcXCIpXCIpKTtcbiAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtYmFja2dyb3VuZCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoc3Jjc2V0KSB7XG4gICAgICAgICAgICAgICRpbWFnZUVsLmF0dHIoJ3NyY3NldCcsIHNyY3NldCk7XG4gICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc3Jjc2V0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc2l6ZXMpIHtcbiAgICAgICAgICAgICAgJGltYWdlRWwuYXR0cignc2l6ZXMnLCBzaXplcyk7XG4gICAgICAgICAgICAgICRpbWFnZUVsLnJlbW92ZUF0dHIoJ2RhdGEtc2l6ZXMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzcmMpIHtcbiAgICAgICAgICAgICAgJGltYWdlRWwuYXR0cignc3JjJywgc3JjKTtcbiAgICAgICAgICAgICAgJGltYWdlRWwucmVtb3ZlQXR0cignZGF0YS1zcmMnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkaW1hZ2VFbC5hZGRDbGFzcyhwYXJhbXMubG9hZGVkQ2xhc3MpLnJlbW92ZUNsYXNzKHBhcmFtcy5sb2FkaW5nQ2xhc3MpO1xuICAgICAgICAgICRzbGlkZUVsLmZpbmQoKFwiLlwiICsgKHBhcmFtcy5wcmVsb2FkZXJDbGFzcykpKS5yZW1vdmUoKTtcbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmIGxvYWRJbkR1cGxpY2F0ZSkge1xuICAgICAgICAgICAgdmFyIHNsaWRlT3JpZ2luYWxJbmRleCA9ICRzbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgICAgICBpZiAoJHNsaWRlRWwuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgICB2YXIgb3JpZ2luYWxTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKChcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBzbGlkZU9yaWdpbmFsSW5kZXggKyBcIlxcXCJdOm5vdCguXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSArIFwiKVwiKSk7XG4gICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKG9yaWdpbmFsU2xpZGUuaW5kZXgoKSwgZmFsc2UpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIGR1cGxpY2F0ZWRTbGlkZSA9IHN3aXBlci4kd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpICsgXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgc2xpZGVPcmlnaW5hbEluZGV4ICsgXCJcXFwiXVwiKSk7XG4gICAgICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGR1cGxpY2F0ZWRTbGlkZS5pbmRleCgpLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXBlci5lbWl0KCdsYXp5SW1hZ2VSZWFkeScsICRzbGlkZUVsWzBdLCAkaW1hZ2VFbFswXSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHN3aXBlci5lbWl0KCdsYXp5SW1hZ2VMb2FkJywgJHNsaWRlRWxbMF0sICRpbWFnZUVsWzBdKTtcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgbG9hZDogZnVuY3Rpb24gbG9hZCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICAgIHZhciBzd2lwZXJQYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gICAgICB2YXIgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICB2YXIgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyUGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXJQYXJhbXMubGF6eTtcblxuICAgICAgdmFyIHNsaWRlc1BlclZpZXcgPSBzd2lwZXJQYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldyA9IDA7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNsaWRlRXhpc3QoaW5kZXgpIHtcbiAgICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICAgIGlmICgkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXJQYXJhbXMuc2xpZGVDbGFzcykgKyBcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBpbmRleCArIFwiXFxcIl1cIikpLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNsaWRlc1tpbmRleF0pIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gc2xpZGVJbmRleChzbGlkZUVsKSB7XG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICByZXR1cm4gJChzbGlkZUVsKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAkKHNsaWRlRWwpLmluZGV4KCk7XG4gICAgICB9XG5cbiAgICAgIGlmICghc3dpcGVyLmxhenkuaW5pdGlhbEltYWdlTG9hZGVkKSB7IHN3aXBlci5sYXp5LmluaXRpYWxJbWFnZUxvYWRlZCA9IHRydWU7IH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoU2xpZGVzVmlzaWJpbGl0eSkge1xuICAgICAgICAkd3JhcHBlckVsLmNoaWxkcmVuKChcIi5cIiArIChzd2lwZXJQYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpKSkuZWFjaChmdW5jdGlvbiAoZWxJbmRleCwgc2xpZGVFbCkge1xuICAgICAgICAgIHZhciBpbmRleCA9IGlzVmlydHVhbCA/ICQoc2xpZGVFbCkuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSA6ICQoc2xpZGVFbCkuaW5kZXgoKTtcbiAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShpbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChzbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gYWN0aXZlSW5kZXg7IGkgPCBhY3RpdmVJbmRleCArIHNsaWRlc1BlclZpZXc7IGkgKz0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkpKSB7IHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGkpOyB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5sYXp5LmxvYWRJblNsaWRlKGFjdGl2ZUluZGV4KTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMubG9hZFByZXZOZXh0KSB7XG4gICAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID4gMSB8fCAocGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudCAmJiBwYXJhbXMubG9hZFByZXZOZXh0QW1vdW50ID4gMSkpIHtcbiAgICAgICAgICB2YXIgYW1vdW50ID0gcGFyYW1zLmxvYWRQcmV2TmV4dEFtb3VudDtcbiAgICAgICAgICB2YXIgc3B2ID0gc2xpZGVzUGVyVmlldztcbiAgICAgICAgICB2YXIgbWF4SW5kZXggPSBNYXRoLm1pbihhY3RpdmVJbmRleCArIHNwdiArIE1hdGgubWF4KGFtb3VudCwgc3B2KSwgc2xpZGVzLmxlbmd0aCk7XG4gICAgICAgICAgdmFyIG1pbkluZGV4ID0gTWF0aC5tYXgoYWN0aXZlSW5kZXggLSBNYXRoLm1heChzcHYsIGFtb3VudCksIDApO1xuICAgICAgICAgIC8vIE5leHQgU2xpZGVzXG4gICAgICAgICAgZm9yICh2YXIgaSQxID0gYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3OyBpJDEgPCBtYXhJbmRleDsgaSQxICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkkMSkpIHsgc3dpcGVyLmxhenkubG9hZEluU2xpZGUoaSQxKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBQcmV2IFNsaWRlc1xuICAgICAgICAgIGZvciAodmFyIGkkMiA9IG1pbkluZGV4OyBpJDIgPCBhY3RpdmVJbmRleDsgaSQyICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChzbGlkZUV4aXN0KGkkMikpIHsgc3dpcGVyLmxhenkubG9hZEluU2xpZGUoaSQyKTsgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbmV4dFNsaWRlID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyUGFyYW1zLnNsaWRlTmV4dENsYXNzKSkpO1xuICAgICAgICAgIGlmIChuZXh0U2xpZGUubGVuZ3RoID4gMCkgeyBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShzbGlkZUluZGV4KG5leHRTbGlkZSkpOyB9XG5cbiAgICAgICAgICB2YXIgcHJldlNsaWRlID0gJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyUGFyYW1zLnNsaWRlUHJldkNsYXNzKSkpO1xuICAgICAgICAgIGlmIChwcmV2U2xpZGUubGVuZ3RoID4gMCkgeyBzd2lwZXIubGF6eS5sb2FkSW5TbGlkZShzbGlkZUluZGV4KHByZXZTbGlkZSkpOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHZhciBMYXp5JDEgPSB7XG4gICAgbmFtZTogJ2xhenknLFxuICAgIHBhcmFtczoge1xuICAgICAgbGF6eToge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgbG9hZFByZXZOZXh0OiBmYWxzZSxcbiAgICAgICAgbG9hZFByZXZOZXh0QW1vdW50OiAxLFxuICAgICAgICBsb2FkT25UcmFuc2l0aW9uU3RhcnQ6IGZhbHNlLFxuXG4gICAgICAgIGVsZW1lbnRDbGFzczogJ3N3aXBlci1sYXp5JyxcbiAgICAgICAgbG9hZGluZ0NsYXNzOiAnc3dpcGVyLWxhenktbG9hZGluZycsXG4gICAgICAgIGxvYWRlZENsYXNzOiAnc3dpcGVyLWxhenktbG9hZGVkJyxcbiAgICAgICAgcHJlbG9hZGVyQ2xhc3M6ICdzd2lwZXItbGF6eS1wcmVsb2FkZXInLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgIGxhenk6IHtcbiAgICAgICAgICBpbml0aWFsSW1hZ2VMb2FkZWQ6IGZhbHNlLFxuICAgICAgICAgIGxvYWQ6IExhenkubG9hZC5iaW5kKHN3aXBlciksXG4gICAgICAgICAgbG9hZEluU2xpZGU6IExhenkubG9hZEluU2xpZGUuYmluZChzd2lwZXIpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgYmVmb3JlSW5pdDogZnVuY3Rpb24gYmVmb3JlSW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMpIHtcbiAgICAgICAgICBzd2lwZXIucGFyYW1zLnByZWxvYWRJbWFnZXMgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sYXp5LmVuYWJsZWQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiBzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSA9PT0gMCkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjcm9sbDogZnVuY3Rpb24gc2Nyb2xsKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgIXN3aXBlci5wYXJhbXMuZnJlZU1vZGVTdGlja3kpIHtcbiAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXNpemU6IGZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjcm9sbGJhckRyYWdNb3ZlOiBmdW5jdGlvbiBzY3JvbGxiYXJEcmFnTW92ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRyYW5zaXRpb25TdGFydDogZnVuY3Rpb24gdHJhbnNpdGlvblN0YXJ0KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5lbmFibGVkKSB7XG4gICAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMubGF6eS5sb2FkT25UcmFuc2l0aW9uU3RhcnQgfHwgKCFzd2lwZXIucGFyYW1zLmxhenkubG9hZE9uVHJhbnNpdGlvblN0YXJ0ICYmICFzd2lwZXIubGF6eS5pbml0aWFsSW1hZ2VMb2FkZWQpKSB7XG4gICAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiAhc3dpcGVyLnBhcmFtcy5sYXp5LmxvYWRPblRyYW5zaXRpb25TdGFydCkge1xuICAgICAgICAgIHN3aXBlci5sYXp5LmxvYWQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiBzbGlkZUNoYW5nZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmxhenkuZW5hYmxlZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIubGF6eS5sb2FkKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICAvKiBlc2xpbnQgbm8tYml0d2lzZTogW1wiZXJyb3JcIiwgeyBcImFsbG93XCI6IFtcIj4+XCJdIH1dICovXG5cbiAgdmFyIENvbnRyb2xsZXIgPSB7XG4gICAgTGluZWFyU3BsaW5lOiBmdW5jdGlvbiBMaW5lYXJTcGxpbmUoeCwgeSkge1xuICAgICAgdmFyIGJpbmFyeVNlYXJjaCA9IChmdW5jdGlvbiBzZWFyY2goKSB7XG4gICAgICAgIHZhciBtYXhJbmRleDtcbiAgICAgICAgdmFyIG1pbkluZGV4O1xuICAgICAgICB2YXIgZ3Vlc3M7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYXJyYXksIHZhbCkge1xuICAgICAgICAgIG1pbkluZGV4ID0gLTE7XG4gICAgICAgICAgbWF4SW5kZXggPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKG1heEluZGV4IC0gbWluSW5kZXggPiAxKSB7XG4gICAgICAgICAgICBndWVzcyA9IG1heEluZGV4ICsgbWluSW5kZXggPj4gMTtcbiAgICAgICAgICAgIGlmIChhcnJheVtndWVzc10gPD0gdmFsKSB7XG4gICAgICAgICAgICAgIG1pbkluZGV4ID0gZ3Vlc3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXhJbmRleCA9IGd1ZXNzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWF4SW5kZXg7XG4gICAgICAgIH07XG4gICAgICB9KCkpO1xuICAgICAgdGhpcy54ID0geDtcbiAgICAgIHRoaXMueSA9IHk7XG4gICAgICB0aGlzLmxhc3RJbmRleCA9IHgubGVuZ3RoIC0gMTtcbiAgICAgIC8vIEdpdmVuIGFuIHggdmFsdWUgKHgyKSwgcmV0dXJuIHRoZSBleHBlY3RlZCB5MiB2YWx1ZTpcbiAgICAgIC8vICh4MSx5MSkgaXMgdGhlIGtub3duIHBvaW50IGJlZm9yZSBnaXZlbiB2YWx1ZSxcbiAgICAgIC8vICh4Myx5MykgaXMgdGhlIGtub3duIHBvaW50IGFmdGVyIGdpdmVuIHZhbHVlLlxuICAgICAgdmFyIGkxO1xuICAgICAgdmFyIGkzO1xuXG4gICAgICB0aGlzLmludGVycG9sYXRlID0gZnVuY3Rpb24gaW50ZXJwb2xhdGUoeDIpIHtcbiAgICAgICAgaWYgKCF4MikgeyByZXR1cm4gMDsgfVxuXG4gICAgICAgIC8vIEdldCB0aGUgaW5kZXhlcyBvZiB4MSBhbmQgeDMgKHRoZSBhcnJheSBpbmRleGVzIGJlZm9yZSBhbmQgYWZ0ZXIgZ2l2ZW4geDIpOlxuICAgICAgICBpMyA9IGJpbmFyeVNlYXJjaCh0aGlzLngsIHgyKTtcbiAgICAgICAgaTEgPSBpMyAtIDE7XG5cbiAgICAgICAgLy8gV2UgaGF2ZSBvdXIgaW5kZXhlcyBpMSAmIGkzLCBzbyB3ZSBjYW4gY2FsY3VsYXRlIGFscmVhZHk6XG4gICAgICAgIC8vIHkyIDo9ICgoeDLiiJJ4MSkgw5cgKHkz4oiSeTEpKSDDtyAoeDPiiJJ4MSkgKyB5MVxuICAgICAgICByZXR1cm4gKCgoeDIgLSB0aGlzLnhbaTFdKSAqICh0aGlzLnlbaTNdIC0gdGhpcy55W2kxXSkpIC8gKHRoaXMueFtpM10gLSB0aGlzLnhbaTFdKSkgKyB0aGlzLnlbaTFdO1xuICAgICAgfTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sXG4gICAgLy8geHh4OiBmb3Igbm93IGkgd2lsbCBqdXN0IHNhdmUgb25lIHNwbGluZSBmdW5jdGlvbiB0byB0b1xuICAgIGdldEludGVycG9sYXRlRnVuY3Rpb246IGZ1bmN0aW9uIGdldEludGVycG9sYXRlRnVuY3Rpb24oYykge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zcGxpbmUgPSBzd2lwZXIucGFyYW1zLmxvb3BcbiAgICAgICAgICA/IG5ldyBDb250cm9sbGVyLkxpbmVhclNwbGluZShzd2lwZXIuc2xpZGVzR3JpZCwgYy5zbGlkZXNHcmlkKVxuICAgICAgICAgIDogbmV3IENvbnRyb2xsZXIuTGluZWFyU3BsaW5lKHN3aXBlci5zbmFwR3JpZCwgYy5zbmFwR3JpZCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZShzZXRUcmFuc2xhdGUkMSwgYnlDb250cm9sbGVyKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBjb250cm9sbGVkID0gc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgIHZhciBtdWx0aXBsaWVyO1xuICAgICAgdmFyIGNvbnRyb2xsZWRUcmFuc2xhdGU7XG4gICAgICBmdW5jdGlvbiBzZXRDb250cm9sbGVkVHJhbnNsYXRlKGMpIHtcbiAgICAgICAgLy8gdGhpcyB3aWxsIGNyZWF0ZSBhbiBJbnRlcnBvbGF0ZSBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgc25hcEdyaWRzXG4gICAgICAgIC8vIHggaXMgdGhlIEdyaWQgb2YgdGhlIHNjcm9sbGVkIHNjcm9sbGVyIGFuZCB5IHdpbGwgYmUgdGhlIGNvbnRyb2xsZWQgc2Nyb2xsZXJcbiAgICAgICAgLy8gaXQgbWFrZXMgc2Vuc2UgdG8gY3JlYXRlIHRoaXMgb25seSBvbmNlIGFuZCByZWNhbGwgaXQgZm9yIHRoZSBpbnRlcnBvbGF0aW9uXG4gICAgICAgIC8vIHRoZSBmdW5jdGlvbiBkb2VzIGEgbG90IG9mIHZhbHVlIGNhY2hpbmcgZm9yIHBlcmZvcm1hbmNlXG4gICAgICAgIHZhciB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuZ2V0SW50ZXJwb2xhdGVGdW5jdGlvbihjKTtcbiAgICAgICAgICAvLyBpIGFtIG5vdCBzdXJlIHdoeSB0aGUgdmFsdWVzIGhhdmUgdG8gYmUgbXVsdGlwbGljYXRlZCB0aGlzIHdheSwgdHJpZWQgdG8gaW52ZXJ0IHRoZSBzbmFwR3JpZFxuICAgICAgICAgIC8vIGJ1dCBpdCBkaWQgbm90IHdvcmsgb3V0XG4gICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9IC1zd2lwZXIuY29udHJvbGxlci5zcGxpbmUuaW50ZXJwb2xhdGUoLXRyYW5zbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbnRyb2xsZWRUcmFuc2xhdGUgfHwgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnY29udGFpbmVyJykge1xuICAgICAgICAgIG11bHRpcGxpZXIgPSAoYy5tYXhUcmFuc2xhdGUoKSAtIGMubWluVHJhbnNsYXRlKCkpIC8gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XG4gICAgICAgICAgY29udHJvbGxlZFRyYW5zbGF0ZSA9ICgodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIG11bHRpcGxpZXIpICsgYy5taW5UcmFuc2xhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuaW52ZXJzZSkge1xuICAgICAgICAgIGNvbnRyb2xsZWRUcmFuc2xhdGUgPSBjLm1heFRyYW5zbGF0ZSgpIC0gY29udHJvbGxlZFRyYW5zbGF0ZTtcbiAgICAgICAgfVxuICAgICAgICBjLnVwZGF0ZVByb2dyZXNzKGNvbnRyb2xsZWRUcmFuc2xhdGUpO1xuICAgICAgICBjLnNldFRyYW5zbGF0ZShjb250cm9sbGVkVHJhbnNsYXRlLCBzd2lwZXIpO1xuICAgICAgICBjLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICAgIGMudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udHJvbGxlZCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250cm9sbGVkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNsYXRlKGNvbnRyb2xsZWRbaV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChjb250cm9sbGVkIGluc3RhbmNlb2YgU3dpcGVyICYmIGJ5Q29udHJvbGxlciAhPT0gY29udHJvbGxlZCkge1xuICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNsYXRlKGNvbnRyb2xsZWQpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBjb250cm9sbGVkID0gc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbDtcbiAgICAgIHZhciBpO1xuICAgICAgZnVuY3Rpb24gc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oYykge1xuICAgICAgICBjLnNldFRyYW5zaXRpb24oZHVyYXRpb24sIHN3aXBlcik7XG4gICAgICAgIGlmIChkdXJhdGlvbiAhPT0gMCkge1xuICAgICAgICAgIGMudHJhbnNpdGlvblN0YXJ0KCk7XG4gICAgICAgICAgaWYgKGMucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgICAgIFV0aWxzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgYy51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYy4kd3JhcHBlckVsLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCFjb250cm9sbGVkKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgaWYgKGMucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnBhcmFtcy5jb250cm9sbGVyLmJ5ID09PSAnc2xpZGUnKSB7XG4gICAgICAgICAgICAgIGMubG9vcEZpeCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYy50cmFuc2l0aW9uRW5kKCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRyb2xsZWQpKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBjb250cm9sbGVkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xsZWRbaV0gIT09IGJ5Q29udHJvbGxlciAmJiBjb250cm9sbGVkW2ldIGluc3RhbmNlb2YgU3dpcGVyKSB7XG4gICAgICAgICAgICBzZXRDb250cm9sbGVkVHJhbnNpdGlvbihjb250cm9sbGVkW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoY29udHJvbGxlZCBpbnN0YW5jZW9mIFN3aXBlciAmJiBieUNvbnRyb2xsZXIgIT09IGNvbnRyb2xsZWQpIHtcbiAgICAgICAgc2V0Q29udHJvbGxlZFRyYW5zaXRpb24oY29udHJvbGxlZCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcbiAgdmFyIENvbnRyb2xsZXIkMSA9IHtcbiAgICBuYW1lOiAnY29udHJvbGxlcicsXG4gICAgcGFyYW1zOiB7XG4gICAgICBjb250cm9sbGVyOiB7XG4gICAgICAgIGNvbnRyb2w6IHVuZGVmaW5lZCxcbiAgICAgICAgaW52ZXJzZTogZmFsc2UsXG4gICAgICAgIGJ5OiAnc2xpZGUnLCAvLyBvciAnY29udGFpbmVyJ1xuICAgICAgfSxcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgIGNvbnRyb2xsZXI6IHtcbiAgICAgICAgICBjb250cm9sOiBzd2lwZXIucGFyYW1zLmNvbnRyb2xsZXIuY29udHJvbCxcbiAgICAgICAgICBnZXRJbnRlcnBvbGF0ZUZ1bmN0aW9uOiBDb250cm9sbGVyLmdldEludGVycG9sYXRlRnVuY3Rpb24uYmluZChzd2lwZXIpLFxuICAgICAgICAgIHNldFRyYW5zbGF0ZTogQ29udHJvbGxlci5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHNldFRyYW5zaXRpb246IENvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbi5iaW5kKHN3aXBlciksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVzaXplOiBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChzd2lwZXIuY29udHJvbGxlci5zcGxpbmUpIHtcbiAgICAgICAgICBzd2lwZXIuY29udHJvbGxlci5zcGxpbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgZGVsZXRlIHN3aXBlci5jb250cm9sbGVyLnNwbGluZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9ic2VydmVyVXBkYXRlOiBmdW5jdGlvbiBvYnNlcnZlclVwZGF0ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHN3aXBlci5jb250cm9sbGVyLnNwbGluZSkge1xuICAgICAgICAgIHN3aXBlci5jb250cm9sbGVyLnNwbGluZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBkZWxldGUgc3dpcGVyLmNvbnRyb2xsZXIuc3BsaW5lO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKTtcbiAgICAgIH0sXG4gICAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgYTExeSA9IHtcbiAgICBtYWtlRWxGb2N1c2FibGU6IGZ1bmN0aW9uIG1ha2VFbEZvY3VzYWJsZSgkZWwpIHtcbiAgICAgICRlbC5hdHRyKCd0YWJJbmRleCcsICcwJyk7XG4gICAgICByZXR1cm4gJGVsO1xuICAgIH0sXG4gICAgYWRkRWxSb2xlOiBmdW5jdGlvbiBhZGRFbFJvbGUoJGVsLCByb2xlKSB7XG4gICAgICAkZWwuYXR0cigncm9sZScsIHJvbGUpO1xuICAgICAgcmV0dXJuICRlbDtcbiAgICB9LFxuICAgIGFkZEVsTGFiZWw6IGZ1bmN0aW9uIGFkZEVsTGFiZWwoJGVsLCBsYWJlbCkge1xuICAgICAgJGVsLmF0dHIoJ2FyaWEtbGFiZWwnLCBsYWJlbCk7XG4gICAgICByZXR1cm4gJGVsO1xuICAgIH0sXG4gICAgZGlzYWJsZUVsOiBmdW5jdGlvbiBkaXNhYmxlRWwoJGVsKSB7XG4gICAgICAkZWwuYXR0cignYXJpYS1kaXNhYmxlZCcsIHRydWUpO1xuICAgICAgcmV0dXJuICRlbDtcbiAgICB9LFxuICAgIGVuYWJsZUVsOiBmdW5jdGlvbiBlbmFibGVFbCgkZWwpIHtcbiAgICAgICRlbC5hdHRyKCdhcmlhLWRpc2FibGVkJywgZmFsc2UpO1xuICAgICAgcmV0dXJuICRlbDtcbiAgICB9LFxuICAgIG9uRW50ZXJLZXk6IGZ1bmN0aW9uIG9uRW50ZXJLZXkoZSkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5hMTF5O1xuICAgICAgaWYgKGUua2V5Q29kZSAhPT0gMTMpIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgJHRhcmdldEVsID0gJChlLnRhcmdldCk7XG4gICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCAmJiAkdGFyZ2V0RWwuaXMoc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkpIHtcbiAgICAgICAgaWYgKCEoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3ApKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgICAgICBzd2lwZXIuYTExeS5ub3RpZnkocGFyYW1zLmxhc3RTbGlkZU1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5hMTF5Lm5vdGlmeShwYXJhbXMubmV4dFNsaWRlTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsICYmICR0YXJnZXRFbC5pcyhzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSkge1xuICAgICAgICBpZiAoIShzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCkpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICAgIHN3aXBlci5hMTF5Lm5vdGlmeShwYXJhbXMuZmlyc3RTbGlkZU1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5hMTF5Lm5vdGlmeShwYXJhbXMucHJldlNsaWRlTWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiAkdGFyZ2V0RWwuaXMoKFwiLlwiICsgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpKSkge1xuICAgICAgICAkdGFyZ2V0RWxbMF0uY2xpY2soKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIG5vdGlmeTogZnVuY3Rpb24gbm90aWZ5KG1lc3NhZ2UpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIG5vdGlmaWNhdGlvbiA9IHN3aXBlci5hMTF5LmxpdmVSZWdpb247XG4gICAgICBpZiAobm90aWZpY2F0aW9uLmxlbmd0aCA9PT0gMCkgeyByZXR1cm47IH1cbiAgICAgIG5vdGlmaWNhdGlvbi5odG1sKCcnKTtcbiAgICAgIG5vdGlmaWNhdGlvbi5odG1sKG1lc3NhZ2UpO1xuICAgIH0sXG4gICAgdXBkYXRlTmF2aWdhdGlvbjogZnVuY3Rpb24gdXBkYXRlTmF2aWdhdGlvbigpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZiA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgICAgdmFyICRuZXh0RWwgPSByZWYuJG5leHRFbDtcbiAgICAgIHZhciAkcHJldkVsID0gcmVmLiRwcmV2RWw7XG5cbiAgICAgIGlmICgkcHJldkVsICYmICRwcmV2RWwubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICAgICAgc3dpcGVyLmExMXkuZGlzYWJsZUVsKCRwcmV2RWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5hMTF5LmVuYWJsZUVsKCRwcmV2RWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoJG5leHRFbCAmJiAkbmV4dEVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgICAgIHN3aXBlci5hMTF5LmRpc2FibGVFbCgkbmV4dEVsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuYTExeS5lbmFibGVFbCgkbmV4dEVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlUGFnaW5hdGlvbjogZnVuY3Rpb24gdXBkYXRlUGFnaW5hdGlvbigpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcbiAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGgpIHtcbiAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5lYWNoKGZ1bmN0aW9uIChidWxsZXRJbmRleCwgYnVsbGV0RWwpIHtcbiAgICAgICAgICB2YXIgJGJ1bGxldEVsID0gJChidWxsZXRFbCk7XG4gICAgICAgICAgc3dpcGVyLmExMXkubWFrZUVsRm9jdXNhYmxlKCRidWxsZXRFbCk7XG4gICAgICAgICAgc3dpcGVyLmExMXkuYWRkRWxSb2xlKCRidWxsZXRFbCwgJ2J1dHRvbicpO1xuICAgICAgICAgIHN3aXBlci5hMTF5LmFkZEVsTGFiZWwoJGJ1bGxldEVsLCBwYXJhbXMucGFnaW5hdGlvbkJ1bGxldE1lc3NhZ2UucmVwbGFjZSgve3tpbmRleH19LywgJGJ1bGxldEVsLmluZGV4KCkgKyAxKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuXG4gICAgICBzd2lwZXIuJGVsLmFwcGVuZChzd2lwZXIuYTExeS5saXZlUmVnaW9uKTtcblxuICAgICAgLy8gTmF2aWdhdGlvblxuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuYTExeTtcbiAgICAgIHZhciAkbmV4dEVsO1xuICAgICAgdmFyICRwcmV2RWw7XG4gICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbCkge1xuICAgICAgICAkbmV4dEVsID0gc3dpcGVyLm5hdmlnYXRpb24uJG5leHRFbDtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsKSB7XG4gICAgICAgICRwcmV2RWwgPSBzd2lwZXIubmF2aWdhdGlvbi4kcHJldkVsO1xuICAgICAgfVxuICAgICAgaWYgKCRuZXh0RWwpIHtcbiAgICAgICAgc3dpcGVyLmExMXkubWFrZUVsRm9jdXNhYmxlKCRuZXh0RWwpO1xuICAgICAgICBzd2lwZXIuYTExeS5hZGRFbFJvbGUoJG5leHRFbCwgJ2J1dHRvbicpO1xuICAgICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRuZXh0RWwsIHBhcmFtcy5uZXh0U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgJG5leHRFbC5vbigna2V5ZG93bicsIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgfVxuICAgICAgaWYgKCRwcmV2RWwpIHtcbiAgICAgICAgc3dpcGVyLmExMXkubWFrZUVsRm9jdXNhYmxlKCRwcmV2RWwpO1xuICAgICAgICBzd2lwZXIuYTExeS5hZGRFbFJvbGUoJHByZXZFbCwgJ2J1dHRvbicpO1xuICAgICAgICBzd2lwZXIuYTExeS5hZGRFbExhYmVsKCRwcmV2RWwsIHBhcmFtcy5wcmV2U2xpZGVNZXNzYWdlKTtcbiAgICAgICAgJHByZXZFbC5vbigna2V5ZG93bicsIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQYWdpbmF0aW9uXG4gICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5vbigna2V5ZG93bicsIChcIi5cIiArIChzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpKSwgc3dpcGVyLmExMXkub25FbnRlcktleSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBpZiAoc3dpcGVyLmExMXkubGl2ZVJlZ2lvbiAmJiBzd2lwZXIuYTExeS5saXZlUmVnaW9uLmxlbmd0aCA+IDApIHsgc3dpcGVyLmExMXkubGl2ZVJlZ2lvbi5yZW1vdmUoKTsgfVxuXG4gICAgICB2YXIgJG5leHRFbDtcbiAgICAgIHZhciAkcHJldkVsO1xuICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWwpIHtcbiAgICAgICAgJG5leHRFbCA9IHN3aXBlci5uYXZpZ2F0aW9uLiRuZXh0RWw7XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbCkge1xuICAgICAgICAkcHJldkVsID0gc3dpcGVyLm5hdmlnYXRpb24uJHByZXZFbDtcbiAgICAgIH1cbiAgICAgIGlmICgkbmV4dEVsKSB7XG4gICAgICAgICRuZXh0RWwub2ZmKCdrZXlkb3duJywgc3dpcGVyLmExMXkub25FbnRlcktleSk7XG4gICAgICB9XG4gICAgICBpZiAoJHByZXZFbCkge1xuICAgICAgICAkcHJldkVsLm9mZigna2V5ZG93bicsIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgfVxuXG4gICAgICAvLyBQYWdpbmF0aW9uXG4gICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLiRlbC5vZmYoJ2tleWRvd24nLCAoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSksIHN3aXBlci5hMTF5Lm9uRW50ZXJLZXkpO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG4gIHZhciBBMTF5ID0ge1xuICAgIG5hbWU6ICdhMTF5JyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGExMXk6IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbm90aWZpY2F0aW9uQ2xhc3M6ICdzd2lwZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgcHJldlNsaWRlTWVzc2FnZTogJ1ByZXZpb3VzIHNsaWRlJyxcbiAgICAgICAgbmV4dFNsaWRlTWVzc2FnZTogJ05leHQgc2xpZGUnLFxuICAgICAgICBmaXJzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGZpcnN0IHNsaWRlJyxcbiAgICAgICAgbGFzdFNsaWRlTWVzc2FnZTogJ1RoaXMgaXMgdGhlIGxhc3Qgc2xpZGUnLFxuICAgICAgICBwYWdpbmF0aW9uQnVsbGV0TWVzc2FnZTogJ0dvIHRvIHNsaWRlIHt7aW5kZXh9fScsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgYTExeToge1xuICAgICAgICAgIGxpdmVSZWdpb246ICQoKFwiPHNwYW4gY2xhc3M9XFxcIlwiICsgKHN3aXBlci5wYXJhbXMuYTExeS5ub3RpZmljYXRpb25DbGFzcykgKyBcIlxcXCIgYXJpYS1saXZlPVxcXCJhc3NlcnRpdmVcXFwiIGFyaWEtYXRvbWljPVxcXCJ0cnVlXFxcIj48L3NwYW4+XCIpKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgT2JqZWN0LmtleXMoYTExeSkuZm9yRWFjaChmdW5jdGlvbiAobWV0aG9kTmFtZSkge1xuICAgICAgICBzd2lwZXIuYTExeVttZXRob2ROYW1lXSA9IGExMXlbbWV0aG9kTmFtZV0uYmluZChzd2lwZXIpO1xuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5hMTF5LmluaXQoKTtcbiAgICAgICAgc3dpcGVyLmExMXkudXBkYXRlTmF2aWdhdGlvbigpO1xuICAgICAgfSxcbiAgICAgIHRvRWRnZTogZnVuY3Rpb24gdG9FZGdlKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmExMXkudXBkYXRlTmF2aWdhdGlvbigpO1xuICAgICAgfSxcbiAgICAgIGZyb21FZGdlOiBmdW5jdGlvbiBmcm9tRWRnZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5hMTF5LmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5hMTF5LnVwZGF0ZU5hdmlnYXRpb24oKTtcbiAgICAgIH0sXG4gICAgICBwYWdpbmF0aW9uVXBkYXRlOiBmdW5jdGlvbiBwYWdpbmF0aW9uVXBkYXRlKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmExMXkuZW5hYmxlZCkgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmExMXkudXBkYXRlUGFnaW5hdGlvbigpO1xuICAgICAgfSxcbiAgICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMuYTExeS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIuYTExeS5kZXN0cm95KCk7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIEhpc3RvcnkgPSB7XG4gICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLmhpc3RvcnkpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAoIXdpbi5oaXN0b3J5IHx8ICF3aW4uaGlzdG9yeS5wdXNoU3RhdGUpIHtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGhpc3RvcnkgPSBzd2lwZXIuaGlzdG9yeTtcbiAgICAgIGhpc3RvcnkuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgICAgaGlzdG9yeS5wYXRocyA9IEhpc3RvcnkuZ2V0UGF0aFZhbHVlcygpO1xuICAgICAgaWYgKCFoaXN0b3J5LnBhdGhzLmtleSAmJiAhaGlzdG9yeS5wYXRocy52YWx1ZSkgeyByZXR1cm47IH1cbiAgICAgIGhpc3Rvcnkuc2Nyb2xsVG9TbGlkZSgwLCBoaXN0b3J5LnBhdGhzLnZhbHVlLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCk7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgd2luLmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgc3dpcGVyLmhpc3Rvcnkuc2V0SGlzdG9yeVBvcFN0YXRlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGRlc3Ryb3k6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSkge1xuICAgICAgICB3aW4ucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCBzd2lwZXIuaGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0SGlzdG9yeVBvcFN0YXRlOiBmdW5jdGlvbiBzZXRIaXN0b3J5UG9wU3RhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHN3aXBlci5oaXN0b3J5LnBhdGhzID0gSGlzdG9yeS5nZXRQYXRoVmFsdWVzKCk7XG4gICAgICBzd2lwZXIuaGlzdG9yeS5zY3JvbGxUb1NsaWRlKHN3aXBlci5wYXJhbXMuc3BlZWQsIHN3aXBlci5oaXN0b3J5LnBhdGhzLnZhbHVlLCBmYWxzZSk7XG4gICAgfSxcbiAgICBnZXRQYXRoVmFsdWVzOiBmdW5jdGlvbiBnZXRQYXRoVmFsdWVzKCkge1xuICAgICAgdmFyIHBhdGhBcnJheSA9IHdpbi5sb2NhdGlvbi5wYXRobmFtZS5zbGljZSgxKS5zcGxpdCgnLycpLmZpbHRlcihmdW5jdGlvbiAocGFydCkgeyByZXR1cm4gcGFydCAhPT0gJyc7IH0pO1xuICAgICAgdmFyIHRvdGFsID0gcGF0aEFycmF5Lmxlbmd0aDtcbiAgICAgIHZhciBrZXkgPSBwYXRoQXJyYXlbdG90YWwgLSAyXTtcbiAgICAgIHZhciB2YWx1ZSA9IHBhdGhBcnJheVt0b3RhbCAtIDFdO1xuICAgICAgcmV0dXJuIHsga2V5OiBrZXksIHZhbHVlOiB2YWx1ZSB9O1xuICAgIH0sXG4gICAgc2V0SGlzdG9yeTogZnVuY3Rpb24gc2V0SGlzdG9yeShrZXksIGluZGV4KSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmhpc3RvcnkuaW5pdGlhbGl6ZWQgfHwgIXN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpbmRleCk7XG4gICAgICB2YXIgdmFsdWUgPSBIaXN0b3J5LnNsdWdpZnkoc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5JykpO1xuICAgICAgaWYgKCF3aW4ubG9jYXRpb24ucGF0aG5hbWUuaW5jbHVkZXMoa2V5KSkge1xuICAgICAgICB2YWx1ZSA9IGtleSArIFwiL1wiICsgdmFsdWU7XG4gICAgICB9XG4gICAgICB2YXIgY3VycmVudFN0YXRlID0gd2luLmhpc3Rvcnkuc3RhdGU7XG4gICAgICBpZiAoY3VycmVudFN0YXRlICYmIGN1cnJlbnRTdGF0ZS52YWx1ZSA9PT0gdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5yZXBsYWNlU3RhdGUpIHtcbiAgICAgICAgd2luLmhpc3RvcnkucmVwbGFjZVN0YXRlKHsgdmFsdWU6IHZhbHVlIH0sIG51bGwsIHZhbHVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbi5oaXN0b3J5LnB1c2hTdGF0ZSh7IHZhbHVlOiB2YWx1ZSB9LCBudWxsLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzbHVnaWZ5OiBmdW5jdGlvbiBzbHVnaWZ5KHRleHQpIHtcbiAgICAgIHJldHVybiB0ZXh0LnRvU3RyaW5nKClcbiAgICAgICAgLnJlcGxhY2UoL1xccysvZywgJy0nKVxuICAgICAgICAucmVwbGFjZSgvW15cXHctXSsvZywgJycpXG4gICAgICAgIC5yZXBsYWNlKC8tLSsvZywgJy0nKVxuICAgICAgICAucmVwbGFjZSgvXi0rLywgJycpXG4gICAgICAgIC5yZXBsYWNlKC8tKyQvLCAnJyk7XG4gICAgfSxcbiAgICBzY3JvbGxUb1NsaWRlOiBmdW5jdGlvbiBzY3JvbGxUb1NsaWRlKHNwZWVkLCB2YWx1ZSwgcnVuQ2FsbGJhY2tzKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIHZhciBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZXEoaSk7XG4gICAgICAgICAgdmFyIHNsaWRlSGlzdG9yeSA9IEhpc3Rvcnkuc2x1Z2lmeShzbGlkZS5hdHRyKCdkYXRhLWhpc3RvcnknKSk7XG4gICAgICAgICAgaWYgKHNsaWRlSGlzdG9yeSA9PT0gdmFsdWUgJiYgIXNsaWRlLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMuc2xpZGVEdXBsaWNhdGVDbGFzcykpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHNsaWRlLmluZGV4KCk7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbygwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHZhciBIaXN0b3J5JDEgPSB7XG4gICAgbmFtZTogJ2hpc3RvcnknLFxuICAgIHBhcmFtczoge1xuICAgICAgaGlzdG9yeToge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgcmVwbGFjZVN0YXRlOiBmYWxzZSxcbiAgICAgICAga2V5OiAnc2xpZGVzJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBoaXN0b3J5OiB7XG4gICAgICAgICAgaW5pdDogSGlzdG9yeS5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBzZXRIaXN0b3J5OiBIaXN0b3J5LnNldEhpc3RvcnkuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHNldEhpc3RvcnlQb3BTdGF0ZTogSGlzdG9yeS5zZXRIaXN0b3J5UG9wU3RhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHNjcm9sbFRvU2xpZGU6IEhpc3Rvcnkuc2Nyb2xsVG9TbGlkZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgZGVzdHJveTogSGlzdG9yeS5kZXN0cm95LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuaGlzdG9yeS5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGlzdG9yeS5lbmFibGVkKSB7XG4gICAgICAgICAgc3dpcGVyLmhpc3RvcnkuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuaGlzdG9yeS5pbml0aWFsaXplZCkge1xuICAgICAgICAgIHN3aXBlci5oaXN0b3J5LnNldEhpc3Rvcnkoc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmtleSwgc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiBzbGlkZUNoYW5nZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuaGlzdG9yeS5pbml0aWFsaXplZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIuaGlzdG9yeS5zZXRIaXN0b3J5KHN3aXBlci5wYXJhbXMuaGlzdG9yeS5rZXksIHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgSGFzaE5hdmlnYXRpb24gPSB7XG4gICAgb25IYXNoQ2FuZ2U6IGZ1bmN0aW9uIG9uSGFzaENhbmdlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgbmV3SGFzaCA9IGRvYy5sb2NhdGlvbi5oYXNoLnJlcGxhY2UoJyMnLCAnJyk7XG4gICAgICB2YXIgYWN0aXZlU2xpZGVIYXNoID0gc3dpcGVyLnNsaWRlcy5lcShzd2lwZXIuYWN0aXZlSW5kZXgpLmF0dHIoJ2RhdGEtaGFzaCcpO1xuICAgICAgaWYgKG5ld0hhc2ggIT09IGFjdGl2ZVNsaWRlSGFzaCkge1xuICAgICAgICB2YXIgbmV3SW5kZXggPSBzd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbigoXCIuXCIgKyAoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSArIFwiW2RhdGEtaGFzaD1cXFwiXCIgKyBuZXdIYXNoICsgXCJcXFwiXVwiKSkuaW5kZXgoKTtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKG5ld0luZGV4KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNldEhhc2g6IGZ1bmN0aW9uIHNldEhhc2goKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLmluaXRpYWxpemVkIHx8ICFzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5yZXBsYWNlU3RhdGUgJiYgd2luLmhpc3RvcnkgJiYgd2luLmhpc3RvcnkucmVwbGFjZVN0YXRlKSB7XG4gICAgICAgIHdpbi5oaXN0b3J5LnJlcGxhY2VTdGF0ZShudWxsLCBudWxsLCAoKFwiI1wiICsgKHN3aXBlci5zbGlkZXMuZXEoc3dpcGVyLmFjdGl2ZUluZGV4KS5hdHRyKCdkYXRhLWhhc2gnKSkpIHx8ICcnKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgc2xpZGUgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIHZhciBoYXNoID0gc2xpZGUuYXR0cignZGF0YS1oYXNoJykgfHwgc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5Jyk7XG4gICAgICAgIGRvYy5sb2NhdGlvbi5oYXNoID0gaGFzaCB8fCAnJztcbiAgICAgIH1cbiAgICB9LFxuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy5oYXNoTmF2aWdhdGlvbi5lbmFibGVkIHx8IChzd2lwZXIucGFyYW1zLmhpc3RvcnkgJiYgc3dpcGVyLnBhcmFtcy5oaXN0b3J5LmVuYWJsZWQpKSB7IHJldHVybjsgfVxuICAgICAgc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgIHZhciBoYXNoID0gZG9jLmxvY2F0aW9uLmhhc2gucmVwbGFjZSgnIycsICcnKTtcbiAgICAgIGlmIChoYXNoKSB7XG4gICAgICAgIHZhciBzcGVlZCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW5ndGggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgdmFyIHNsaWRlID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgICB2YXIgc2xpZGVIYXNoID0gc2xpZGUuYXR0cignZGF0YS1oYXNoJykgfHwgc2xpZGUuYXR0cignZGF0YS1oaXN0b3J5Jyk7XG4gICAgICAgICAgaWYgKHNsaWRlSGFzaCA9PT0gaGFzaCAmJiAhc2xpZGUuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gc2xpZGUuaW5kZXgoKTtcbiAgICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGluZGV4LCBzcGVlZCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSkge1xuICAgICAgICAkKHdpbikub24oJ2hhc2hjaGFuZ2UnLCBzd2lwZXIuaGFzaE5hdmlnYXRpb24ub25IYXNoQ2FuZ2UpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuaGFzaE5hdmlnYXRpb24ud2F0Y2hTdGF0ZSkge1xuICAgICAgICAkKHdpbikub2ZmKCdoYXNoY2hhbmdlJywgc3dpcGVyLmhhc2hOYXZpZ2F0aW9uLm9uSGFzaENhbmdlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICB2YXIgSGFzaE5hdmlnYXRpb24kMSA9IHtcbiAgICBuYW1lOiAnaGFzaC1uYXZpZ2F0aW9uJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGhhc2hOYXZpZ2F0aW9uOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICByZXBsYWNlU3RhdGU6IGZhbHNlLFxuICAgICAgICB3YXRjaFN0YXRlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBoYXNoTmF2aWdhdGlvbjoge1xuICAgICAgICAgIGluaXRpYWxpemVkOiBmYWxzZSxcbiAgICAgICAgICBpbml0OiBIYXNoTmF2aWdhdGlvbi5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBkZXN0cm95OiBIYXNoTmF2aWdhdGlvbi5kZXN0cm95LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBzZXRIYXNoOiBIYXNoTmF2aWdhdGlvbi5zZXRIYXNoLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBvbkhhc2hDYW5nZTogSGFzaE5hdmlnYXRpb24ub25IYXNoQ2FuZ2UuYmluZChzd2lwZXIpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmhhc2hOYXZpZ2F0aW9uLmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdHJhbnNpdGlvbkVuZDogZnVuY3Rpb24gdHJhbnNpdGlvbkVuZCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuaGFzaE5hdmlnYXRpb24uaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uc2V0SGFzaCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2xpZGVDaGFuZ2U6IGZ1bmN0aW9uIHNsaWRlQ2hhbmdlKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5oYXNoTmF2aWdhdGlvbi5pbml0aWFsaXplZCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgICBzd2lwZXIuaGFzaE5hdmlnYXRpb24uc2V0SGFzaCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBcIm9mZlwiICovXG5cbiAgdmFyIEF1dG9wbGF5ID0ge1xuICAgIHJ1bjogZnVuY3Rpb24gcnVuKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgJGFjdGl2ZVNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmVxKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICB2YXIgZGVsYXkgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgICAgaWYgKCRhY3RpdmVTbGlkZUVsLmF0dHIoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JykpIHtcbiAgICAgICAgZGVsYXkgPSAkYWN0aXZlU2xpZGVFbC5hdHRyKCdkYXRhLXN3aXBlci1hdXRvcGxheScpIHx8IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgICB9XG4gICAgICBjbGVhclRpbWVvdXQoc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQpO1xuICAgICAgc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQgPSBVdGlscy5uZXh0VGljayhmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnJldmVyc2VEaXJlY3Rpb24pIHtcbiAgICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlUHJldihzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgICAgICAgc3dpcGVyLnNsaWRlUHJldihzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCdhdXRvcGxheScpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlKSB7XG4gICAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIHN3aXBlci5wYXJhbXMuc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLmlzRW5kKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dChzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbygwLCBzd2lwZXIucGFyYW1zLnNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIuZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHsgc3dpcGVyLmF1dG9wbGF5LnJ1bigpOyB9XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSxcbiAgICBzdGFydDogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQgIT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7IHJldHVybiBmYWxzZTsgfVxuICAgICAgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgPSB0cnVlO1xuICAgICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5U3RhcnQnKTtcbiAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgc3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgeyByZXR1cm4gZmFsc2U7IH1cbiAgICAgIGlmICh0eXBlb2Ygc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7IHJldHVybiBmYWxzZTsgfVxuXG4gICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHN3aXBlci5hdXRvcGxheS50aW1lb3V0KTtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnRpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IGZhbHNlO1xuICAgICAgc3dpcGVyLmVtaXQoJ2F1dG9wbGF5U3RvcCcpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBwYXVzZTogZnVuY3Rpb24gcGF1c2Uoc3BlZWQpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgaWYgKCFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgeyByZXR1cm47IH1cbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7IHJldHVybjsgfVxuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS50aW1lb3V0KSB7IGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkudGltZW91dCk7IH1cbiAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSB0cnVlO1xuICAgICAgaWYgKHNwZWVkID09PSAwIHx8ICFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LndhaXRGb3JUcmFuc2l0aW9uKSB7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnJ1bigpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLiR3cmFwcGVyRWxbMF0uYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5hdXRvcGxheS5vblRyYW5zaXRpb25FbmQpO1xuICAgICAgICBzd2lwZXIuJHdyYXBwZXJFbFswXS5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgc3dpcGVyLmF1dG9wbGF5Lm9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICB9XG4gICAgfSxcbiAgfTtcblxuICB2YXIgQXV0b3BsYXkkMSA9IHtcbiAgICBuYW1lOiAnYXV0b3BsYXknLFxuICAgIHBhcmFtczoge1xuICAgICAgYXV0b3BsYXk6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGRlbGF5OiAzMDAwLFxuICAgICAgICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IHRydWUsXG4gICAgICAgIHN0b3BPbkxhc3RTbGlkZTogZmFsc2UsXG4gICAgICAgIHJldmVyc2VEaXJlY3Rpb246IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGNyZWF0ZTogZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBVdGlscy5leHRlbmQoc3dpcGVyLCB7XG4gICAgICAgIGF1dG9wbGF5OiB7XG4gICAgICAgICAgcnVubmluZzogZmFsc2UsXG4gICAgICAgICAgcGF1c2VkOiBmYWxzZSxcbiAgICAgICAgICBydW46IEF1dG9wbGF5LnJ1bi5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc3RhcnQ6IEF1dG9wbGF5LnN0YXJ0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBzdG9wOiBBdXRvcGxheS5zdG9wLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICBwYXVzZTogQXV0b3BsYXkucGF1c2UuYmluZChzd2lwZXIpLFxuICAgICAgICAgIG9uVmlzaWJpbGl0eUNoYW5nZTogZnVuY3Rpb24gb25WaXNpYmlsaXR5Q2hhbmdlKCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ2hpZGRlbicgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAndmlzaWJsZScgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblRyYW5zaXRpb25FbmQ6IGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuJHdyYXBwZXJFbCkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgeyByZXR1cm47IH1cbiAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgIHN3aXBlci4kd3JhcHBlckVsWzBdLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBzd2lwZXIuYXV0b3BsYXkub25UcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcbiAgICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN3aXBlci5hdXRvcGxheS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBvbjoge1xuICAgICAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmVuYWJsZWQpIHtcbiAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RhcnQoKTtcbiAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgc3dpcGVyLmF1dG9wbGF5Lm9uVmlzaWJpbGl0eUNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBiZWZvcmVUcmFuc2l0aW9uU3RhcnQ6IGZ1bmN0aW9uIGJlZm9yZVRyYW5zaXRpb25TdGFydChzcGVlZCwgaW50ZXJuYWwpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIGlmIChpbnRlcm5hbCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlKHNwZWVkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzbGlkZXJGaXJzdE1vdmU6IGZ1bmN0aW9uIHNsaWRlckZpcnN0TW92ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkuc3RvcCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3VjaEVuZDogZnVuY3Rpb24gdG91Y2hFbmQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlICYmIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgJiYgIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgICAgICBzd2lwZXIuYXV0b3BsYXkucnVuKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgc3dpcGVyLmF1dG9wbGF5Lm9uVmlzaWJpbGl0eUNoYW5nZSk7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgdmFyIEZhZGUgPSB7XG4gICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyICRzbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5lcShpKTtcbiAgICAgICAgdmFyIG9mZnNldCA9ICRzbGlkZUVsWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgICB2YXIgdHggPSAtb2Zmc2V0O1xuICAgICAgICBpZiAoIXN3aXBlci5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkgeyB0eCAtPSBzd2lwZXIudHJhbnNsYXRlOyB9XG4gICAgICAgIHZhciB0eSA9IDA7XG4gICAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgdHkgPSB0eDtcbiAgICAgICAgICB0eCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNsaWRlT3BhY2l0eSA9IHN3aXBlci5wYXJhbXMuZmFkZUVmZmVjdC5jcm9zc0ZhZGVcbiAgICAgICAgICA/IE1hdGgubWF4KDEgLSBNYXRoLmFicygkc2xpZGVFbFswXS5wcm9ncmVzcyksIDApXG4gICAgICAgICAgOiAxICsgTWF0aC5taW4oTWF0aC5tYXgoJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICAgICRzbGlkZUVsXG4gICAgICAgICAgLmNzcyh7XG4gICAgICAgICAgICBvcGFjaXR5OiBzbGlkZU9wYWNpdHksXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgdHggKyBcInB4LCBcIiArIHR5ICsgXCJweCwgMHB4KVwiKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICAgIHNsaWRlcy50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgJiYgZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgdmFyIGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgIHNsaWRlcy50cmFuc2l0aW9uRW5kKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICAgIHZhciB0cmlnZ2VyRXZlbnRzID0gWyd3ZWJraXRUcmFuc2l0aW9uRW5kJywgJ3RyYW5zaXRpb25lbmQnXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyaWdnZXJFdmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICAgICR3cmFwcGVyRWwudHJpZ2dlcih0cmlnZ2VyRXZlbnRzW2ldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gIH07XG5cbiAgdmFyIEVmZmVjdEZhZGUgPSB7XG4gICAgbmFtZTogJ2VmZmVjdC1mYWRlJyxcbiAgICBwYXJhbXM6IHtcbiAgICAgIGZhZGVFZmZlY3Q6IHtcbiAgICAgICAgY3Jvc3NGYWRlOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBmYWRlRWZmZWN0OiB7XG4gICAgICAgICAgc2V0VHJhbnNsYXRlOiBGYWRlLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc2V0VHJhbnNpdGlvbjogRmFkZS5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmYWRlJykgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImZhZGVcIikpO1xuICAgICAgICB2YXIgb3ZlcndyaXRlUGFyYW1zID0ge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmFkZScpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5mYWRlRWZmZWN0LnNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2ZhZGUnKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIuZmFkZUVmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgQ3ViZSA9IHtcbiAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgICB2YXIgJHdyYXBwZXJFbCA9IHN3aXBlci4kd3JhcHBlckVsO1xuICAgICAgdmFyIHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gICAgICB2YXIgc3dpcGVyV2lkdGggPSBzd2lwZXIud2lkdGg7XG4gICAgICB2YXIgc3dpcGVySGVpZ2h0ID0gc3dpcGVyLmhlaWdodDtcbiAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuICAgICAgdmFyIHN3aXBlclNpemUgPSBzd2lwZXIuc2l6ZTtcbiAgICAgIHZhciBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmN1YmVFZmZlY3Q7XG4gICAgICB2YXIgaXNIb3Jpem9udGFsID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgICAgdmFyIGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgdmFyIHdyYXBwZXJSb3RhdGUgPSAwO1xuICAgICAgdmFyICRjdWJlU2hhZG93RWw7XG4gICAgICBpZiAocGFyYW1zLnNoYWRvdykge1xuICAgICAgICBpZiAoaXNIb3Jpem9udGFsKSB7XG4gICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICR3cmFwcGVyRWwuZmluZCgnLnN3aXBlci1jdWJlLXNoYWRvdycpO1xuICAgICAgICAgIGlmICgkY3ViZVNoYWRvd0VsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJGN1YmVTaGFkb3dFbCA9ICQoJzxkaXYgY2xhc3M9XCJzd2lwZXItY3ViZS1zaGFkb3dcIj48L2Rpdj4nKTtcbiAgICAgICAgICAgICR3cmFwcGVyRWwuYXBwZW5kKCRjdWJlU2hhZG93RWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkY3ViZVNoYWRvd0VsLmNzcyh7IGhlaWdodDogKHN3aXBlcldpZHRoICsgXCJweFwiKSB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkY3ViZVNoYWRvd0VsID0gJGVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKTtcbiAgICAgICAgICBpZiAoJGN1YmVTaGFkb3dFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRjdWJlU2hhZG93RWwgPSAkKCc8ZGl2IGNsYXNzPVwic3dpcGVyLWN1YmUtc2hhZG93XCI+PC9kaXY+Jyk7XG4gICAgICAgICAgICAkZWwuYXBwZW5kKCRjdWJlU2hhZG93RWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgICB2YXIgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgICBzbGlkZUluZGV4ID0gcGFyc2VJbnQoJHNsaWRlRWwuYXR0cignZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzbGlkZUFuZ2xlID0gc2xpZGVJbmRleCAqIDkwO1xuICAgICAgICB2YXIgcm91bmQgPSBNYXRoLmZsb29yKHNsaWRlQW5nbGUgLyAzNjApO1xuICAgICAgICBpZiAocnRsKSB7XG4gICAgICAgICAgc2xpZGVBbmdsZSA9IC1zbGlkZUFuZ2xlO1xuICAgICAgICAgIHJvdW5kID0gTWF0aC5mbG9vcigtc2xpZGVBbmdsZSAvIDM2MCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oJHNsaWRlRWxbMF0ucHJvZ3Jlc3MsIDEpLCAtMSk7XG4gICAgICAgIHZhciB0eCA9IDA7XG4gICAgICAgIHZhciB0eSA9IDA7XG4gICAgICAgIHZhciB0eiA9IDA7XG4gICAgICAgIGlmIChzbGlkZUluZGV4ICUgNCA9PT0gMCkge1xuICAgICAgICAgIHR4ID0gLXJvdW5kICogNCAqIHN3aXBlclNpemU7XG4gICAgICAgICAgdHogPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMSkgJSA0ID09PSAwKSB7XG4gICAgICAgICAgdHggPSAwO1xuICAgICAgICAgIHR6ID0gLXJvdW5kICogNCAqIHN3aXBlclNpemU7XG4gICAgICAgIH0gZWxzZSBpZiAoKHNsaWRlSW5kZXggLSAyKSAlIDQgPT09IDApIHtcbiAgICAgICAgICB0eCA9IHN3aXBlclNpemUgKyAocm91bmQgKiA0ICogc3dpcGVyU2l6ZSk7XG4gICAgICAgICAgdHogPSBzd2lwZXJTaXplO1xuICAgICAgICB9IGVsc2UgaWYgKChzbGlkZUluZGV4IC0gMykgJSA0ID09PSAwKSB7XG4gICAgICAgICAgdHggPSAtc3dpcGVyU2l6ZTtcbiAgICAgICAgICB0eiA9ICgzICogc3dpcGVyU2l6ZSkgKyAoc3dpcGVyU2l6ZSAqIDQgKiByb3VuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJ0bCkge1xuICAgICAgICAgIHR4ID0gLXR4O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0hvcml6b250YWwpIHtcbiAgICAgICAgICB0eSA9IHR4O1xuICAgICAgICAgIHR4ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSBcInJvdGF0ZVgoXCIgKyAoaXNIb3Jpem9udGFsID8gMCA6IC1zbGlkZUFuZ2xlKSArIFwiZGVnKSByb3RhdGVZKFwiICsgKGlzSG9yaXpvbnRhbCA/IHNsaWRlQW5nbGUgOiAwKSArIFwiZGVnKSB0cmFuc2xhdGUzZChcIiArIHR4ICsgXCJweCwgXCIgKyB0eSArIFwicHgsIFwiICsgdHogKyBcInB4KVwiO1xuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSAmJiBwcm9ncmVzcyA+IC0xKSB7XG4gICAgICAgICAgd3JhcHBlclJvdGF0ZSA9IChzbGlkZUluZGV4ICogOTApICsgKHByb2dyZXNzICogOTApO1xuICAgICAgICAgIGlmIChydGwpIHsgd3JhcHBlclJvdGF0ZSA9ICgtc2xpZGVJbmRleCAqIDkwKSAtIChwcm9ncmVzcyAqIDkwKTsgfVxuICAgICAgICB9XG4gICAgICAgICRzbGlkZUVsLnRyYW5zZm9ybSh0cmFuc2Zvcm0pO1xuICAgICAgICBpZiAocGFyYW1zLnNsaWRlU2hhZG93cykge1xuICAgICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgICAgdmFyIHNoYWRvd0JlZm9yZSA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICAgIHZhciBzaGFkb3dBZnRlciA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICBpZiAoc2hhZG93QmVmb3JlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2hhZG93QmVmb3JlID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnKSArIFwiXFxcIj48L2Rpdj5cIikpO1xuICAgICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0JlZm9yZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHNoYWRvd0FmdGVyID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcbiAgICAgICAgICAgICRzbGlkZUVsLmFwcGVuZChzaGFkb3dBZnRlcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoKSB7IHNoYWRvd0JlZm9yZVswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgoLXByb2dyZXNzLCAwKTsgfVxuICAgICAgICAgIGlmIChzaGFkb3dBZnRlci5sZW5ndGgpIHsgc2hhZG93QWZ0ZXJbMF0uc3R5bGUub3BhY2l0eSA9IE1hdGgubWF4KHByb2dyZXNzLCAwKTsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICAkd3JhcHBlckVsLmNzcyh7XG4gICAgICAgICctd2Via2l0LXRyYW5zZm9ybS1vcmlnaW4nOiAoXCI1MCUgNTAlIC1cIiArIChzd2lwZXJTaXplIC8gMikgKyBcInB4XCIpLFxuICAgICAgICAnLW1vei10cmFuc2Zvcm0tb3JpZ2luJzogKFwiNTAlIDUwJSAtXCIgKyAoc3dpcGVyU2l6ZSAvIDIpICsgXCJweFwiKSxcbiAgICAgICAgJy1tcy10cmFuc2Zvcm0tb3JpZ2luJzogKFwiNTAlIDUwJSAtXCIgKyAoc3dpcGVyU2l6ZSAvIDIpICsgXCJweFwiKSxcbiAgICAgICAgJ3RyYW5zZm9ybS1vcmlnaW4nOiAoXCI1MCUgNTAlIC1cIiArIChzd2lwZXJTaXplIC8gMikgKyBcInB4XCIpLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChwYXJhbXMuc2hhZG93KSB7XG4gICAgICAgIGlmIChpc0hvcml6b250YWwpIHtcbiAgICAgICAgICAkY3ViZVNoYWRvd0VsLnRyYW5zZm9ybSgoXCJ0cmFuc2xhdGUzZCgwcHgsIFwiICsgKChzd2lwZXJXaWR0aCAvIDIpICsgcGFyYW1zLnNoYWRvd09mZnNldCkgKyBcInB4LCBcIiArICgtc3dpcGVyV2lkdGggLyAyKSArIFwicHgpIHJvdGF0ZVgoOTBkZWcpIHJvdGF0ZVooMGRlZykgc2NhbGUoXCIgKyAocGFyYW1zLnNoYWRvd1NjYWxlKSArIFwiKVwiKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNoYWRvd0FuZ2xlID0gTWF0aC5hYnMod3JhcHBlclJvdGF0ZSkgLSAoTWF0aC5mbG9vcihNYXRoLmFicyh3cmFwcGVyUm90YXRlKSAvIDkwKSAqIDkwKTtcbiAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IDEuNSAtIChcbiAgICAgICAgICAgIChNYXRoLnNpbigoc2hhZG93QW5nbGUgKiAyICogTWF0aC5QSSkgLyAzNjApIC8gMilcbiAgICAgICAgICAgICsgKE1hdGguY29zKChzaGFkb3dBbmdsZSAqIDIgKiBNYXRoLlBJKSAvIDM2MCkgLyAyKVxuICAgICAgICAgICk7XG4gICAgICAgICAgdmFyIHNjYWxlMSA9IHBhcmFtcy5zaGFkb3dTY2FsZTtcbiAgICAgICAgICB2YXIgc2NhbGUyID0gcGFyYW1zLnNoYWRvd1NjYWxlIC8gbXVsdGlwbGllcjtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyYW1zLnNoYWRvd09mZnNldDtcbiAgICAgICAgICAkY3ViZVNoYWRvd0VsLnRyYW5zZm9ybSgoXCJzY2FsZTNkKFwiICsgc2NhbGUxICsgXCIsIDEsIFwiICsgc2NhbGUyICsgXCIpIHRyYW5zbGF0ZTNkKDBweCwgXCIgKyAoKHN3aXBlckhlaWdodCAvIDIpICsgb2Zmc2V0KSArIFwicHgsIFwiICsgKC1zd2lwZXJIZWlnaHQgLyAyIC8gc2NhbGUyKSArIFwicHgpIHJvdGF0ZVgoLTkwZGVnKVwiKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciB6RmFjdG9yID0gKEJyb3dzZXIuaXNTYWZhcmkgfHwgQnJvd3Nlci5pc1VpV2ViVmlldykgPyAoLXN3aXBlclNpemUgLyAyKSA6IDA7XG4gICAgICAkd3JhcHBlckVsXG4gICAgICAgIC50cmFuc2Zvcm0oKFwidHJhbnNsYXRlM2QoMHB4LDAsXCIgKyB6RmFjdG9yICsgXCJweCkgcm90YXRlWChcIiArIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAwIDogd3JhcHBlclJvdGF0ZSkgKyBcImRlZykgcm90YXRlWShcIiArIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAtd3JhcHBlclJvdGF0ZSA6IDApICsgXCJkZWcpXCIpKTtcbiAgICB9LFxuICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyICRlbCA9IHN3aXBlci4kZWw7XG4gICAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICAgIHNsaWRlc1xuICAgICAgICAudHJhbnNpdGlvbihkdXJhdGlvbilcbiAgICAgICAgLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpXG4gICAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmN1YmVFZmZlY3Quc2hhZG93ICYmICFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgJGVsLmZpbmQoJy5zd2lwZXItY3ViZS1zaGFkb3cnKS50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHZhciBFZmZlY3RDdWJlID0ge1xuICAgIG5hbWU6ICdlZmZlY3QtY3ViZScsXG4gICAgcGFyYW1zOiB7XG4gICAgICBjdWJlRWZmZWN0OiB7XG4gICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgc2hhZG93OiB0cnVlLFxuICAgICAgICBzaGFkb3dPZmZzZXQ6IDIwLFxuICAgICAgICBzaGFkb3dTY2FsZTogMC45NCxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBjdWJlRWZmZWN0OiB7XG4gICAgICAgICAgc2V0VHJhbnNsYXRlOiBDdWJlLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc2V0VHJhbnNpdGlvbjogQ3ViZS5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjdWJlJykgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImN1YmVcIikpO1xuICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiM2RcIikpO1xuICAgICAgICB2YXIgb3ZlcndyaXRlUGFyYW1zID0ge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgcmVzaXN0YW5jZVJhdGlvOiAwLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gICAgICAgICAgdmlydHVhbFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci5wYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XG4gICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtcyk7XG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNsYXRlOiBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjdWJlJykgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmN1YmVFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY3ViZScpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5jdWJlRWZmZWN0LnNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIHZhciBGbGlwID0ge1xuICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgICAgIHZhciBydGwgPSBzd2lwZXIucnRsVHJhbnNsYXRlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgdmFyICRzbGlkZUVsID0gc2xpZGVzLmVxKGkpO1xuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAkc2xpZGVFbFswXS5wcm9ncmVzcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZmxpcEVmZmVjdC5saW1pdFJvdGF0aW9uKSB7XG4gICAgICAgICAgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigkc2xpZGVFbFswXS5wcm9ncmVzcywgMSksIC0xKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb2Zmc2V0ID0gJHNsaWRlRWxbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgIHZhciByb3RhdGUgPSAtMTgwICogcHJvZ3Jlc3M7XG4gICAgICAgIHZhciByb3RhdGVZID0gcm90YXRlO1xuICAgICAgICB2YXIgcm90YXRlWCA9IDA7XG4gICAgICAgIHZhciB0eCA9IC1vZmZzZXQ7XG4gICAgICAgIHZhciB0eSA9IDA7XG4gICAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgICAgdHkgPSB0eDtcbiAgICAgICAgICB0eCA9IDA7XG4gICAgICAgICAgcm90YXRlWCA9IC1yb3RhdGVZO1xuICAgICAgICAgIHJvdGF0ZVkgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKHJ0bCkge1xuICAgICAgICAgIHJvdGF0ZVkgPSAtcm90YXRlWTtcbiAgICAgICAgfVxuXG4gICAgICAgICRzbGlkZUVsWzBdLnN0eWxlLnpJbmRleCA9IC1NYXRoLmFicyhNYXRoLnJvdW5kKHByb2dyZXNzKSkgKyBzbGlkZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZsaXBFZmZlY3Quc2xpZGVTaGFkb3dzKSB7XG4gICAgICAgICAgLy8gU2V0IHNoYWRvd3NcbiAgICAgICAgICB2YXIgc2hhZG93QmVmb3JlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpIDogJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wJyk7XG4gICAgICAgICAgdmFyIHNoYWRvd0FmdGVyID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJHNsaWRlRWwuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbScpO1xuICAgICAgICAgIGlmIChzaGFkb3dCZWZvcmUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBzaGFkb3dCZWZvcmUgPSAkKChcIjxkaXYgY2xhc3M9XFxcInN3aXBlci1zbGlkZS1zaGFkb3ctXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCcpICsgXCJcXFwiPjwvZGl2PlwiKSk7XG4gICAgICAgICAgICAkc2xpZGVFbC5hcHBlbmQoc2hhZG93QmVmb3JlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgc2hhZG93QWZ0ZXIgPSAkKChcIjxkaXYgY2xhc3M9XFxcInN3aXBlci1zbGlkZS1zaGFkb3ctXCIgKyAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3JpZ2h0JyA6ICdib3R0b20nKSArIFwiXFxcIj48L2Rpdj5cIikpO1xuICAgICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKHNoYWRvd0FmdGVyKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNoYWRvd0JlZm9yZS5sZW5ndGgpIHsgc2hhZG93QmVmb3JlWzBdLnN0eWxlLm9wYWNpdHkgPSBNYXRoLm1heCgtcHJvZ3Jlc3MsIDApOyB9XG4gICAgICAgICAgaWYgKHNoYWRvd0FmdGVyLmxlbmd0aCkgeyBzaGFkb3dBZnRlclswXS5zdHlsZS5vcGFjaXR5ID0gTWF0aC5tYXgocHJvZ3Jlc3MsIDApOyB9XG4gICAgICAgIH1cbiAgICAgICAgJHNsaWRlRWxcbiAgICAgICAgICAudHJhbnNmb3JtKChcInRyYW5zbGF0ZTNkKFwiICsgdHggKyBcInB4LCBcIiArIHR5ICsgXCJweCwgMHB4KSByb3RhdGVYKFwiICsgcm90YXRlWCArIFwiZGVnKSByb3RhdGVZKFwiICsgcm90YXRlWSArIFwiZGVnKVwiKSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRUcmFuc2l0aW9uOiBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgICAgdmFyIGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICAgIHNsaWRlc1xuICAgICAgICAudHJhbnNpdGlvbihkdXJhdGlvbilcbiAgICAgICAgLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpXG4gICAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgJiYgZHVyYXRpb24gIT09IDApIHtcbiAgICAgICAgdmFyIGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBzbGlkZXMuZXEoYWN0aXZlSW5kZXgpLnRyYW5zaXRpb25FbmQoZnVuY3Rpb24gb25UcmFuc2l0aW9uRW5kKCkge1xuICAgICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgeyByZXR1cm47IH1cbiAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSB7IHJldHVybjsgfVxuICAgICAgICAgIC8vIGlmICghJCh0aGlzKS5oYXNDbGFzcyhzd2lwZXIucGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpKSByZXR1cm47XG4gICAgICAgICAgZXZlbnRUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgICB2YXIgdHJpZ2dlckV2ZW50cyA9IFsnd2Via2l0VHJhbnNpdGlvbkVuZCcsICd0cmFuc2l0aW9uZW5kJ107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmlnZ2VyRXZlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICAkd3JhcHBlckVsLnRyaWdnZXIodHJpZ2dlckV2ZW50c1tpXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICB9O1xuXG4gIHZhciBFZmZlY3RGbGlwID0ge1xuICAgIG5hbWU6ICdlZmZlY3QtZmxpcCcsXG4gICAgcGFyYW1zOiB7XG4gICAgICBmbGlwRWZmZWN0OiB7XG4gICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgICAgbGltaXRSb3RhdGlvbjogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBmbGlwRWZmZWN0OiB7XG4gICAgICAgICAgc2V0VHJhbnNsYXRlOiBGbGlwLnNldFRyYW5zbGF0ZS5iaW5kKHN3aXBlciksXG4gICAgICAgICAgc2V0VHJhbnNpdGlvbjogRmxpcC5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdmbGlwJykgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaCgoKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgKyBcImZsaXBcIikpO1xuICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiM2RcIikpO1xuICAgICAgICB2YXIgb3ZlcndyaXRlUGFyYW1zID0ge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICAgICAgc2xpZGVzUGVyQ29sdW1uOiAxLFxuICAgICAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgICAgIHZpcnR1YWxUcmFuc2xhdGU6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgICBVdGlscy5leHRlbmQoc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCBvdmVyd3JpdGVQYXJhbXMpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnZmxpcCcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5mbGlwRWZmZWN0LnNldFRyYW5zbGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2ZsaXAnKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIuZmxpcEVmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgQ292ZXJmbG93ID0ge1xuICAgIHNldFRyYW5zbGF0ZTogZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICB2YXIgc3dpcGVyV2lkdGggPSBzd2lwZXIud2lkdGg7XG4gICAgICB2YXIgc3dpcGVySGVpZ2h0ID0gc3dpcGVyLmhlaWdodDtcbiAgICAgIHZhciBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAgICAgdmFyICR3cmFwcGVyRWwgPSBzd2lwZXIuJHdyYXBwZXJFbDtcbiAgICAgIHZhciBzbGlkZXNTaXplc0dyaWQgPSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkO1xuICAgICAgdmFyIHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuY292ZXJmbG93RWZmZWN0O1xuICAgICAgdmFyIGlzSG9yaXpvbnRhbCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICAgIHZhciB0cmFuc2Zvcm0gPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgdmFyIGNlbnRlciA9IGlzSG9yaXpvbnRhbCA/IC10cmFuc2Zvcm0gKyAoc3dpcGVyV2lkdGggLyAyKSA6IC10cmFuc2Zvcm0gKyAoc3dpcGVySGVpZ2h0IC8gMik7XG4gICAgICB2YXIgcm90YXRlID0gaXNIb3Jpem9udGFsID8gcGFyYW1zLnJvdGF0ZSA6IC1wYXJhbXMucm90YXRlO1xuICAgICAgdmFyIHRyYW5zbGF0ZSA9IHBhcmFtcy5kZXB0aDtcbiAgICAgIC8vIEVhY2ggc2xpZGUgb2Zmc2V0IGZyb20gY2VudGVyXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gc2xpZGVzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIHZhciAkc2xpZGVFbCA9IHNsaWRlcy5lcShpKTtcbiAgICAgICAgdmFyIHNsaWRlU2l6ZSA9IHNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICAgICAgdmFyIHNsaWRlT2Zmc2V0ID0gJHNsaWRlRWxbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICAgIHZhciBvZmZzZXRNdWx0aXBsaWVyID0gKChjZW50ZXIgLSBzbGlkZU9mZnNldCAtIChzbGlkZVNpemUgLyAyKSkgLyBzbGlkZVNpemUpICogcGFyYW1zLm1vZGlmaWVyO1xuXG4gICAgICAgIHZhciByb3RhdGVZID0gaXNIb3Jpem9udGFsID8gcm90YXRlICogb2Zmc2V0TXVsdGlwbGllciA6IDA7XG4gICAgICAgIHZhciByb3RhdGVYID0gaXNIb3Jpem9udGFsID8gMCA6IHJvdGF0ZSAqIG9mZnNldE11bHRpcGxpZXI7XG4gICAgICAgIC8vIHZhciByb3RhdGVaID0gMFxuICAgICAgICB2YXIgdHJhbnNsYXRlWiA9IC10cmFuc2xhdGUgKiBNYXRoLmFicyhvZmZzZXRNdWx0aXBsaWVyKTtcblxuICAgICAgICB2YXIgdHJhbnNsYXRlWSA9IGlzSG9yaXpvbnRhbCA/IDAgOiBwYXJhbXMuc3RyZXRjaCAqIChvZmZzZXRNdWx0aXBsaWVyKTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZVggPSBpc0hvcml6b250YWwgPyBwYXJhbXMuc3RyZXRjaCAqIChvZmZzZXRNdWx0aXBsaWVyKSA6IDA7XG5cbiAgICAgICAgLy8gRml4IGZvciB1bHRyYSBzbWFsbCB2YWx1ZXNcbiAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVgpIDwgMC4wMDEpIHsgdHJhbnNsYXRlWCA9IDA7IH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVkpIDwgMC4wMDEpIHsgdHJhbnNsYXRlWSA9IDA7IH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHRyYW5zbGF0ZVopIDwgMC4wMDEpIHsgdHJhbnNsYXRlWiA9IDA7IH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVkpIDwgMC4wMDEpIHsgcm90YXRlWSA9IDA7IH1cbiAgICAgICAgaWYgKE1hdGguYWJzKHJvdGF0ZVgpIDwgMC4wMDEpIHsgcm90YXRlWCA9IDA7IH1cblxuICAgICAgICB2YXIgc2xpZGVUcmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKFwiICsgdHJhbnNsYXRlWCArIFwicHgsXCIgKyB0cmFuc2xhdGVZICsgXCJweCxcIiArIHRyYW5zbGF0ZVogKyBcInB4KSAgcm90YXRlWChcIiArIHJvdGF0ZVggKyBcImRlZykgcm90YXRlWShcIiArIHJvdGF0ZVkgKyBcImRlZylcIjtcblxuICAgICAgICAkc2xpZGVFbC50cmFuc2Zvcm0oc2xpZGVUcmFuc2Zvcm0pO1xuICAgICAgICAkc2xpZGVFbFswXS5zdHlsZS56SW5kZXggPSAtTWF0aC5hYnMoTWF0aC5yb3VuZChvZmZzZXRNdWx0aXBsaWVyKSkgKyAxO1xuICAgICAgICBpZiAocGFyYW1zLnNsaWRlU2hhZG93cykge1xuICAgICAgICAgIC8vIFNldCBzaGFkb3dzXG4gICAgICAgICAgdmFyICRzaGFkb3dCZWZvcmVFbCA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKSA6ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCcpO1xuICAgICAgICAgIHZhciAkc2hhZG93QWZ0ZXJFbCA9IGlzSG9yaXpvbnRhbCA/ICRzbGlkZUVsLmZpbmQoJy5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0JykgOiAkc2xpZGVFbC5maW5kKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20nKTtcbiAgICAgICAgICBpZiAoJHNoYWRvd0JlZm9yZUVsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgJHNoYWRvd0JlZm9yZUVsID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdsZWZ0JyA6ICd0b3AnKSArIFwiXFxcIj48L2Rpdj5cIikpO1xuICAgICAgICAgICAgJHNsaWRlRWwuYXBwZW5kKCRzaGFkb3dCZWZvcmVFbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2hhZG93QWZ0ZXJFbC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICRzaGFkb3dBZnRlckVsID0gJCgoXCI8ZGl2IGNsYXNzPVxcXCJzd2lwZXItc2xpZGUtc2hhZG93LVwiICsgKGlzSG9yaXpvbnRhbCA/ICdyaWdodCcgOiAnYm90dG9tJykgKyBcIlxcXCI+PC9kaXY+XCIpKTtcbiAgICAgICAgICAgICRzbGlkZUVsLmFwcGVuZCgkc2hhZG93QWZ0ZXJFbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkc2hhZG93QmVmb3JlRWwubGVuZ3RoKSB7ICRzaGFkb3dCZWZvcmVFbFswXS5zdHlsZS5vcGFjaXR5ID0gb2Zmc2V0TXVsdGlwbGllciA+IDAgPyBvZmZzZXRNdWx0aXBsaWVyIDogMDsgfVxuICAgICAgICAgIGlmICgkc2hhZG93QWZ0ZXJFbC5sZW5ndGgpIHsgJHNoYWRvd0FmdGVyRWxbMF0uc3R5bGUub3BhY2l0eSA9ICgtb2Zmc2V0TXVsdGlwbGllcikgPiAwID8gLW9mZnNldE11bHRpcGxpZXIgOiAwOyB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IGNvcnJlY3QgcGVyc3BlY3RpdmUgZm9yIElFMTBcbiAgICAgIGlmIChTdXBwb3J0LnBvaW50ZXJFdmVudHMgfHwgU3VwcG9ydC5wcmVmaXhlZFBvaW50ZXJFdmVudHMpIHtcbiAgICAgICAgdmFyIHdzID0gJHdyYXBwZXJFbFswXS5zdHlsZTtcbiAgICAgICAgd3MucGVyc3BlY3RpdmVPcmlnaW4gPSBjZW50ZXIgKyBcInB4IDUwJVwiO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICBzd2lwZXIuc2xpZGVzXG4gICAgICAgIC50cmFuc2l0aW9uKGR1cmF0aW9uKVxuICAgICAgICAuZmluZCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JylcbiAgICAgICAgLnRyYW5zaXRpb24oZHVyYXRpb24pO1xuICAgIH0sXG4gIH07XG5cbiAgdmFyIEVmZmVjdENvdmVyZmxvdyA9IHtcbiAgICBuYW1lOiAnZWZmZWN0LWNvdmVyZmxvdycsXG4gICAgcGFyYW1zOiB7XG4gICAgICBjb3ZlcmZsb3dFZmZlY3Q6IHtcbiAgICAgICAgcm90YXRlOiA1MCxcbiAgICAgICAgc3RyZXRjaDogMCxcbiAgICAgICAgZGVwdGg6IDEwMCxcbiAgICAgICAgbW9kaWZpZXI6IDEsXG4gICAgICAgIHNsaWRlU2hhZG93czogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBjcmVhdGU6IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlciwge1xuICAgICAgICBjb3ZlcmZsb3dFZmZlY3Q6IHtcbiAgICAgICAgICBzZXRUcmFuc2xhdGU6IENvdmVyZmxvdy5zZXRUcmFuc2xhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIHNldFRyYW5zaXRpb246IENvdmVyZmxvdy5zZXRUcmFuc2l0aW9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgb246IHtcbiAgICAgIGJlZm9yZUluaXQ6IGZ1bmN0aW9uIGJlZm9yZUluaXQoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09ICdjb3ZlcmZsb3cnKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goKChzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpICsgXCJjb3ZlcmZsb3dcIikpO1xuICAgICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKCgoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSArIFwiM2RcIikpO1xuXG4gICAgICAgIHN3aXBlci5wYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyA9IHRydWU7XG4gICAgICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzID0gdHJ1ZTtcbiAgICAgIH0sXG4gICAgICBzZXRUcmFuc2xhdGU6IGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gJ2NvdmVyZmxvdycpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci5jb3ZlcmZsb3dFZmZlY3Quc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9LFxuICAgICAgc2V0VHJhbnNpdGlvbjogZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSAnY292ZXJmbG93JykgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLmNvdmVyZmxvd0VmZmVjdC5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICB2YXIgVGh1bWJzID0ge1xuICAgIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciByZWYgPSBzd2lwZXIucGFyYW1zO1xuICAgICAgdmFyIHRodW1ic1BhcmFtcyA9IHJlZi50aHVtYnM7XG4gICAgICB2YXIgU3dpcGVyQ2xhc3MgPSBzd2lwZXIuY29uc3RydWN0b3I7XG4gICAgICBpZiAodGh1bWJzUGFyYW1zLnN3aXBlciBpbnN0YW5jZW9mIFN3aXBlckNsYXNzKSB7XG4gICAgICAgIHN3aXBlci50aHVtYnMuc3dpcGVyID0gdGh1bWJzUGFyYW1zLnN3aXBlcjtcbiAgICAgICAgVXRpbHMuZXh0ZW5kKHN3aXBlci50aHVtYnMuc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCB7XG4gICAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgICAgICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZSxcbiAgICAgICAgfSk7XG4gICAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIudGh1bWJzLnN3aXBlci5wYXJhbXMsIHtcbiAgICAgICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgICAgIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoVXRpbHMuaXNPYmplY3QodGh1bWJzUGFyYW1zLnN3aXBlcikpIHtcbiAgICAgICAgc3dpcGVyLnRodW1icy5zd2lwZXIgPSBuZXcgU3dpcGVyQ2xhc3MoVXRpbHMuZXh0ZW5kKHt9LCB0aHVtYnNQYXJhbXMuc3dpcGVyLCB7XG4gICAgICAgICAgd2F0Y2hTbGlkZXNWaXNpYmlsaXR5OiB0cnVlLFxuICAgICAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG4gICAgICAgIH0pKTtcbiAgICAgICAgc3dpcGVyLnRodW1icy5zd2lwZXJDcmVhdGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci50aHVtYnMuc3dpcGVyLiRlbC5hZGRDbGFzcyhzd2lwZXIucGFyYW1zLnRodW1icy50aHVtYnNDb250YWluZXJDbGFzcyk7XG4gICAgICBzd2lwZXIudGh1bWJzLnN3aXBlci5vbigndGFwJywgc3dpcGVyLnRodW1icy5vblRodW1iQ2xpY2spO1xuICAgIH0sXG4gICAgb25UaHVtYkNsaWNrOiBmdW5jdGlvbiBvblRodW1iQ2xpY2soKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIHZhciB0aHVtYnNTd2lwZXIgPSBzd2lwZXIudGh1bWJzLnN3aXBlcjtcbiAgICAgIGlmICghdGh1bWJzU3dpcGVyKSB7IHJldHVybjsgfVxuICAgICAgdmFyIGNsaWNrZWRJbmRleCA9IHRodW1ic1N3aXBlci5jbGlja2VkSW5kZXg7XG4gICAgICB2YXIgY2xpY2tlZFNsaWRlID0gdGh1bWJzU3dpcGVyLmNsaWNrZWRTbGlkZTtcbiAgICAgIGlmIChjbGlja2VkU2xpZGUgJiYgJChjbGlja2VkU2xpZGUpLmhhc0NsYXNzKHN3aXBlci5wYXJhbXMudGh1bWJzLnNsaWRlVGh1bWJBY3RpdmVDbGFzcykpIHsgcmV0dXJuOyB9XG4gICAgICBpZiAodHlwZW9mIGNsaWNrZWRJbmRleCA9PT0gJ3VuZGVmaW5lZCcgfHwgY2xpY2tlZEluZGV4ID09PSBudWxsKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHNsaWRlVG9JbmRleDtcbiAgICAgIGlmICh0aHVtYnNTd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgICAgc2xpZGVUb0luZGV4ID0gcGFyc2VJbnQoJCh0aHVtYnNTd2lwZXIuY2xpY2tlZFNsaWRlKS5hdHRyKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZVRvSW5kZXggPSBjbGlja2VkSW5kZXg7XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgIHZhciBjdXJyZW50SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICAgIGlmIChzd2lwZXIuc2xpZGVzLmVxKGN1cnJlbnRJbmRleCkuaGFzQ2xhc3Moc3dpcGVyLnBhcmFtcy5zbGlkZUR1cGxpY2F0ZUNsYXNzKSkge1xuICAgICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLiR3cmFwcGVyRWxbMF0uY2xpZW50TGVmdDtcbiAgICAgICAgICBjdXJyZW50SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZJbmRleCA9IHN3aXBlci5zbGlkZXMuZXEoY3VycmVudEluZGV4KS5wcmV2QWxsKChcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyBzbGlkZVRvSW5kZXggKyBcIlxcXCJdXCIpKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICB2YXIgbmV4dEluZGV4ID0gc3dpcGVyLnNsaWRlcy5lcShjdXJyZW50SW5kZXgpLm5leHRBbGwoKFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIHNsaWRlVG9JbmRleCArIFwiXFxcIl1cIikpLmVxKDApLmluZGV4KCk7XG4gICAgICAgIGlmICh0eXBlb2YgcHJldkluZGV4ID09PSAndW5kZWZpbmVkJykgeyBzbGlkZVRvSW5kZXggPSBuZXh0SW5kZXg7IH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIG5leHRJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHsgc2xpZGVUb0luZGV4ID0gcHJldkluZGV4OyB9XG4gICAgICAgIGVsc2UgaWYgKG5leHRJbmRleCAtIGN1cnJlbnRJbmRleCA8IGN1cnJlbnRJbmRleCAtIHByZXZJbmRleCkgeyBzbGlkZVRvSW5kZXggPSBuZXh0SW5kZXg7IH1cbiAgICAgICAgZWxzZSB7IHNsaWRlVG9JbmRleCA9IHByZXZJbmRleDsgfVxuICAgICAgfVxuICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICB9LFxuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKGluaXRpYWwpIHtcbiAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgdmFyIHRodW1ic1N3aXBlciA9IHN3aXBlci50aHVtYnMuc3dpcGVyO1xuICAgICAgaWYgKCF0aHVtYnNTd2lwZXIpIHsgcmV0dXJuOyB9XG5cbiAgICAgIHZhciBzbGlkZXNQZXJWaWV3ID0gdGh1bWJzU3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bydcbiAgICAgICAgPyB0aHVtYnNTd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKVxuICAgICAgICA6IHRodW1ic1N3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldztcblxuICAgICAgaWYgKHN3aXBlci5yZWFsSW5kZXggIT09IHRodW1ic1N3aXBlci5yZWFsSW5kZXgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRUaHVtYnNJbmRleCA9IHRodW1ic1N3aXBlci5hY3RpdmVJbmRleDtcbiAgICAgICAgdmFyIG5ld1RodW1ic0luZGV4O1xuICAgICAgICBpZiAodGh1bWJzU3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICAgICAgaWYgKHRodW1ic1N3aXBlci5zbGlkZXMuZXEoY3VycmVudFRodW1ic0luZGV4KS5oYXNDbGFzcyh0aHVtYnNTd2lwZXIucGFyYW1zLnNsaWRlRHVwbGljYXRlQ2xhc3MpKSB7XG4gICAgICAgICAgICB0aHVtYnNTd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgICAgICB0aHVtYnNTd2lwZXIuX2NsaWVudExlZnQgPSB0aHVtYnNTd2lwZXIuJHdyYXBwZXJFbFswXS5jbGllbnRMZWZ0O1xuICAgICAgICAgICAgY3VycmVudFRodW1ic0luZGV4ID0gdGh1bWJzU3dpcGVyLmFjdGl2ZUluZGV4O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBGaW5kIGFjdHVhbCB0aHVtYnMgaW5kZXggdG8gc2xpZGUgdG9cbiAgICAgICAgICB2YXIgcHJldlRodW1ic0luZGV4ID0gdGh1bWJzU3dpcGVyLnNsaWRlcy5lcShjdXJyZW50VGh1bWJzSW5kZXgpLnByZXZBbGwoKFwiW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVxcXCJcIiArIChzd2lwZXIucmVhbEluZGV4KSArIFwiXFxcIl1cIikpLmVxKDApLmluZGV4KCk7XG4gICAgICAgICAgdmFyIG5leHRUaHVtYnNJbmRleCA9IHRodW1ic1N3aXBlci5zbGlkZXMuZXEoY3VycmVudFRodW1ic0luZGV4KS5uZXh0QWxsKChcIltkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cXFwiXCIgKyAoc3dpcGVyLnJlYWxJbmRleCkgKyBcIlxcXCJdXCIpKS5lcSgwKS5pbmRleCgpO1xuICAgICAgICAgIGlmICh0eXBlb2YgcHJldlRodW1ic0luZGV4ID09PSAndW5kZWZpbmVkJykgeyBuZXdUaHVtYnNJbmRleCA9IG5leHRUaHVtYnNJbmRleDsgfVxuICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBuZXh0VGh1bWJzSW5kZXggPT09ICd1bmRlZmluZWQnKSB7IG5ld1RodW1ic0luZGV4ID0gcHJldlRodW1ic0luZGV4OyB9XG4gICAgICAgICAgZWxzZSBpZiAobmV4dFRodW1ic0luZGV4IC0gY3VycmVudFRodW1ic0luZGV4ID09PSBjdXJyZW50VGh1bWJzSW5kZXggLSBwcmV2VGh1bWJzSW5kZXgpIHsgbmV3VGh1bWJzSW5kZXggPSBjdXJyZW50VGh1bWJzSW5kZXg7IH1cbiAgICAgICAgICBlbHNlIGlmIChuZXh0VGh1bWJzSW5kZXggLSBjdXJyZW50VGh1bWJzSW5kZXggPCBjdXJyZW50VGh1bWJzSW5kZXggLSBwcmV2VGh1bWJzSW5kZXgpIHsgbmV3VGh1bWJzSW5kZXggPSBuZXh0VGh1bWJzSW5kZXg7IH1cbiAgICAgICAgICBlbHNlIHsgbmV3VGh1bWJzSW5kZXggPSBwcmV2VGh1bWJzSW5kZXg7IH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IHN3aXBlci5yZWFsSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRodW1ic1N3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcyAmJiB0aHVtYnNTd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMuaW5kZXhPZihuZXdUaHVtYnNJbmRleCkgPCAwKSB7XG4gICAgICAgICAgaWYgKHRodW1ic1N3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgICAgIGlmIChuZXdUaHVtYnNJbmRleCA+IGN1cnJlbnRUaHVtYnNJbmRleCkge1xuICAgICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IG5ld1RodW1ic0luZGV4IC0gTWF0aC5mbG9vcihzbGlkZXNQZXJWaWV3IC8gMikgKyAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbmV3VGh1bWJzSW5kZXggPSBuZXdUaHVtYnNJbmRleCArIE1hdGguZmxvb3Ioc2xpZGVzUGVyVmlldyAvIDIpIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKG5ld1RodW1ic0luZGV4ID4gY3VycmVudFRodW1ic0luZGV4KSB7XG4gICAgICAgICAgICBuZXdUaHVtYnNJbmRleCA9IG5ld1RodW1ic0luZGV4IC0gc2xpZGVzUGVyVmlldyArIDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRodW1ic1N3aXBlci5zbGlkZVRvKG5ld1RodW1ic0luZGV4LCBpbml0aWFsID8gMCA6IHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQWN0aXZhdGUgdGh1bWJzXG4gICAgICB2YXIgdGh1bWJzVG9BY3RpdmF0ZSA9IDE7XG4gICAgICB2YXIgdGh1bWJBY3RpdmVDbGFzcyA9IHN3aXBlci5wYXJhbXMudGh1bWJzLnNsaWRlVGh1bWJBY3RpdmVDbGFzcztcblxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgdGh1bWJzVG9BY3RpdmF0ZSA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIH1cblxuICAgICAgdGh1bWJzU3dpcGVyLnNsaWRlcy5yZW1vdmVDbGFzcyh0aHVtYkFjdGl2ZUNsYXNzKTtcbiAgICAgIGlmICh0aHVtYnNTd2lwZXIucGFyYW1zLmxvb3AgfHwgKHRodW1ic1N3aXBlci5wYXJhbXMudmlydHVhbCAmJiB0aHVtYnNTd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aHVtYnNUb0FjdGl2YXRlOyBpICs9IDEpIHtcbiAgICAgICAgICB0aHVtYnNTd2lwZXIuJHdyYXBwZXJFbC5jaGlsZHJlbigoXCJbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XFxcIlwiICsgKHN3aXBlci5yZWFsSW5kZXggKyBpKSArIFwiXFxcIl1cIikpLmFkZENsYXNzKHRodW1iQWN0aXZlQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKHZhciBpJDEgPSAwOyBpJDEgPCB0aHVtYnNUb0FjdGl2YXRlOyBpJDEgKz0gMSkge1xuICAgICAgICAgIHRodW1ic1N3aXBlci5zbGlkZXMuZXEoc3dpcGVyLnJlYWxJbmRleCArIGkkMSkuYWRkQ2xhc3ModGh1bWJBY3RpdmVDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICB9O1xuICB2YXIgVGh1bWJzJDEgPSB7XG4gICAgbmFtZTogJ3RodW1icycsXG4gICAgcGFyYW1zOiB7XG4gICAgICB0aHVtYnM6IHtcbiAgICAgICAgc3dpcGVyOiBudWxsLFxuICAgICAgICBzbGlkZVRodW1iQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtdGh1bWItYWN0aXZlJyxcbiAgICAgICAgdGh1bWJzQ29udGFpbmVyQ2xhc3M6ICdzd2lwZXItY29udGFpbmVyLXRodW1icycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3JlYXRlOiBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgIFV0aWxzLmV4dGVuZChzd2lwZXIsIHtcbiAgICAgICAgdGh1bWJzOiB7XG4gICAgICAgICAgc3dpcGVyOiBudWxsLFxuICAgICAgICAgIGluaXQ6IFRodW1icy5pbml0LmJpbmQoc3dpcGVyKSxcbiAgICAgICAgICB1cGRhdGU6IFRodW1icy51cGRhdGUuYmluZChzd2lwZXIpLFxuICAgICAgICAgIG9uVGh1bWJDbGljazogVGh1bWJzLm9uVGh1bWJDbGljay5iaW5kKHN3aXBlciksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9LFxuICAgIG9uOiB7XG4gICAgICBiZWZvcmVJbml0OiBmdW5jdGlvbiBiZWZvcmVJbml0KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgdmFyIHJlZiA9IHN3aXBlci5wYXJhbXM7XG4gICAgICAgIHZhciB0aHVtYnMgPSByZWYudGh1bWJzO1xuICAgICAgICBpZiAoIXRodW1icyB8fCAhdGh1bWJzLnN3aXBlcikgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLnRodW1icy5pbml0KCk7XG4gICAgICAgIHN3aXBlci50aHVtYnMudXBkYXRlKHRydWUpO1xuICAgICAgfSxcbiAgICAgIHNsaWRlQ2hhbmdlOiBmdW5jdGlvbiBzbGlkZUNoYW5nZSgpIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIGlmICghc3dpcGVyLnRodW1icy5zd2lwZXIpIHsgcmV0dXJuOyB9XG4gICAgICAgIHN3aXBlci50aHVtYnMudXBkYXRlKCk7XG4gICAgICB9LFxuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci50aHVtYnMuc3dpcGVyKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIudGh1bWJzLnVwZGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHJlc2l6ZTogZnVuY3Rpb24gcmVzaXplKCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgaWYgKCFzd2lwZXIudGh1bWJzLnN3aXBlcikgeyByZXR1cm47IH1cbiAgICAgICAgc3dpcGVyLnRodW1icy51cGRhdGUoKTtcbiAgICAgIH0sXG4gICAgICBvYnNlcnZlclVwZGF0ZTogZnVuY3Rpb24gb2JzZXJ2ZXJVcGRhdGUoKSB7XG4gICAgICAgIHZhciBzd2lwZXIgPSB0aGlzO1xuICAgICAgICBpZiAoIXN3aXBlci50aHVtYnMuc3dpcGVyKSB7IHJldHVybjsgfVxuICAgICAgICBzd2lwZXIudGh1bWJzLnVwZGF0ZSgpO1xuICAgICAgfSxcbiAgICAgIHNldFRyYW5zaXRpb246IGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICAgICAgdmFyIHN3aXBlciA9IHRoaXM7XG4gICAgICAgIHZhciB0aHVtYnNTd2lwZXIgPSBzd2lwZXIudGh1bWJzLnN3aXBlcjtcbiAgICAgICAgaWYgKCF0aHVtYnNTd2lwZXIpIHsgcmV0dXJuOyB9XG4gICAgICAgIHRodW1ic1N3aXBlci5zZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgICAgIH0sXG4gICAgICBiZWZvcmVEZXN0cm95OiBmdW5jdGlvbiBiZWZvcmVEZXN0cm95KCkge1xuICAgICAgICB2YXIgc3dpcGVyID0gdGhpcztcbiAgICAgICAgdmFyIHRodW1ic1N3aXBlciA9IHN3aXBlci50aHVtYnMuc3dpcGVyO1xuICAgICAgICBpZiAoIXRodW1ic1N3aXBlcikgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKHN3aXBlci50aHVtYnMuc3dpcGVyQ3JlYXRlZCAmJiB0aHVtYnNTd2lwZXIpIHtcbiAgICAgICAgICB0aHVtYnNTd2lwZXIuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgLy8gU3dpcGVyIENsYXNzXG5cbiAgdmFyIGNvbXBvbmVudHMgPSBbXG4gICAgRGV2aWNlJDEsXG4gICAgU3VwcG9ydCQxLFxuICAgIEJyb3dzZXIkMSxcbiAgICBSZXNpemUsXG4gICAgT2JzZXJ2ZXIkMSxcbiAgICBWaXJ0dWFsJDEsXG4gICAgS2V5Ym9hcmQkMSxcbiAgICBNb3VzZXdoZWVsJDEsXG4gICAgTmF2aWdhdGlvbiQxLFxuICAgIFBhZ2luYXRpb24kMSxcbiAgICBTY3JvbGxiYXIkMSxcbiAgICBQYXJhbGxheCQxLFxuICAgIFpvb20kMSxcbiAgICBMYXp5JDEsXG4gICAgQ29udHJvbGxlciQxLFxuICAgIEExMXksXG4gICAgSGlzdG9yeSQxLFxuICAgIEhhc2hOYXZpZ2F0aW9uJDEsXG4gICAgQXV0b3BsYXkkMSxcbiAgICBFZmZlY3RGYWRlLFxuICAgIEVmZmVjdEN1YmUsXG4gICAgRWZmZWN0RmxpcCxcbiAgICBFZmZlY3RDb3ZlcmZsb3csXG4gICAgVGh1bWJzJDFcbiAgXTtcblxuICBpZiAodHlwZW9mIFN3aXBlci51c2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgU3dpcGVyLnVzZSA9IFN3aXBlci5DbGFzcy51c2U7XG4gICAgU3dpcGVyLmluc3RhbGxNb2R1bGUgPSBTd2lwZXIuQ2xhc3MuaW5zdGFsbE1vZHVsZTtcbiAgfVxuXG4gIFN3aXBlci51c2UoY29tcG9uZW50cyk7XG5cbiAgcmV0dXJuIFN3aXBlcjtcblxufSkpO1xuIiwidmFyICQsIEZpeGVkTmF2YmFyLFxuICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gRml4ZWROYXZiYXIgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEZpeGVkTmF2YmFyKG5hdmJhclNlbGVjdG9yLCBib2R5U2VsZWN0b3IpIHtcbiAgICB0aGlzLmluaXQgPSBiaW5kKHRoaXMuaW5pdCwgdGhpcyk7XG4gICAgdGhpcy5nZXROYXZiYXJPZmZzZXQgPSBiaW5kKHRoaXMuZ2V0TmF2YmFyT2Zmc2V0LCB0aGlzKTtcbiAgICB0aGlzLmdldE5hdmJhckhlaWdodCA9IGJpbmQodGhpcy5nZXROYXZiYXJIZWlnaHQsIHRoaXMpO1xuICAgIHRoaXMuJG5hdmJhciA9ICQobmF2YmFyU2VsZWN0b3IpO1xuICAgIHRoaXMuJGJvZHkgPSAkKGJvZHlTZWxlY3Rvcik7XG4gICAgdGhpcy5vbigpO1xuICAgIHRoaXMuaW5pdCgpO1xuICB9XG5cbiAgRml4ZWROYXZiYXIucHJvdG90eXBlLmdldE5hdmJhckhlaWdodCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLiRuYXZiYXIuaGVpZ2h0KCk7XG4gIH07XG5cbiAgRml4ZWROYXZiYXIucHJvdG90eXBlLmdldE5hdmJhck9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLiRuYXZiYXIucG9zaXRpb24oKS50b3A7XG4gIH07XG5cbiAgRml4ZWROYXZiYXIucHJvdG90eXBlLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRuYXZiYXIuYWRkQ2xhc3MoJ2lzLWZpeGVkJyk7XG4gICAgcmV0dXJuIHRoaXMuJGJvZHkuY3NzKHtcbiAgICAgIHBhZGRpbmdUb3A6IHRoaXMuZ2V0TmF2YmFySGVpZ2h0KClcbiAgICB9KTtcbiAgfTtcblxuICBGaXhlZE5hdmJhci5wcm90b3R5cGUub24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgJHdpbmRvdztcbiAgICAkd2luZG93ID0gJCh3aW5kb3cpO1xuICAgICR3aW5kb3cucmVzaXplKHRoaXMuaW5pdCk7XG4gICAgJHdpbmRvdy5vbihcImhhc2hjaGFuZ2VcIiwgdGhpcy5zaGlmdFdpbmRvdyk7XG4gICAgcmV0dXJuICQoXCJib2R5XCIpLm9uKFwiY2xpY2tcIiwgXCJhXCIsIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKGV2ZW50KSB7fTtcbiAgICB9KSh0aGlzKSk7XG4gIH07XG5cbiAgcmV0dXJuIEZpeGVkTmF2YmFyO1xuXG59KSgpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaUwxVnpaWEp6TDJsdVlXMXZjbWt0YmkxM2IzSnJjeTlFYjJOMWJXVnVkSE12ZDJocGJHd3RaWFZ5YjNCbExtTnZiUzkzY0MxMGFHVnRaUzFoYzNObGRITXZjMk55YVhCMGN5OUdhWGhsWkU1aGRtSmhjaTVqYjJabVpXVWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGN5STZXeUl2VlhObGNuTXZhVzVoYlc5eWFTMXVMWGR2Y210ekwwUnZZM1Z0Wlc1MGN5OTNhR2xzYkMxbGRYSnZjR1V1WTI5dEwzZHdMWFJvWlcxbExXRnpjMlYwY3k5elkzSnBjSFJ6TDBacGVHVmtUbUYyWW1GeUxtTnZabVpsWlNKZExDSnVZVzFsY3lJNlcxMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFTeEpRVUZCTEdOQlFVRTdSVUZCUVRzN1FVRkJRU3hEUVVGQkxFZEJRVWtzVDBGQlFTeERRVUZSTEZGQlFWSTdPMEZCUTBvc1RVRkJUU3hEUVVGRExFOUJRVkFzUjBGQmRVSTdSVUZEVkN4eFFrRkJSU3hqUVVGR0xFVkJRV3RDTEZsQlFXeENPenM3TzBsQlExWXNTVUZCUXl4RFFVRkJMRTlCUVVRc1IwRkJWeXhEUVVGQkxFTkJRVVVzWTBGQlJqdEpRVU5ZTEVsQlFVTXNRMEZCUVN4TFFVRkVMRWRCUVZNc1EwRkJRU3hEUVVGRkxGbEJRVVk3U1VGRFZDeEpRVUZETEVOQlFVRXNSVUZCUkN4RFFVRkJPMGxCUTBFc1NVRkJReXhEUVVGQkxFbEJRVVFzUTBGQlFUdEZRVXBWT3p0M1FrRlBXaXhsUVVGQkxFZEJRV2xDTEZOQlFVRTdWMEZEWml4SlFVRkRMRU5CUVVFc1QwRkJUeXhEUVVGRExFMUJRVlFzUTBGQlFUdEZRVVJsT3p0M1FrRkpha0lzWlVGQlFTeEhRVUZwUWl4VFFVRkJPMWRCUTJZc1NVRkJReXhEUVVGQkxFOUJRVThzUTBGQlF5eFJRVUZVTEVOQlFVRXNRMEZCYlVJc1EwRkJRenRGUVVSTU96dDNRa0ZWYWtJc1NVRkJRU3hIUVVGTkxGTkJRVUU3U1VGRFNpeEpRVUZETEVOQlFVRXNUMEZCVHl4RFFVRkRMRkZCUVZRc1EwRkJhMElzVlVGQmJFSTdWMEZEUVN4SlFVRkRMRU5CUVVFc1MwRkJTeXhEUVVGRExFZEJRVkFzUTBGQlZ6dE5RVUZCTEZWQlFVRXNSVUZCV1N4SlFVRkRMRU5CUVVFc1pVRkJSQ3hEUVVGQkxFTkJRVm83UzBGQldEdEZRVVpKT3p0M1FrRkxUaXhGUVVGQkxFZEJRVWtzVTBGQlFUdEJRVU5HTEZGQlFVRTdTVUZCUVN4UFFVRkJMRWRCUVZVc1EwRkJRU3hEUVVGRkxFMUJRVVk3U1VGRFZpeFBRVUZQTEVOQlFVTXNUVUZCVWl4RFFVRmxMRWxCUVVNc1EwRkJRU3hKUVVGb1FqdEpRVVZCTEU5QlFVOHNRMEZCUXl4RlFVRlNMRU5CUVZjc1dVRkJXQ3hGUVVGNVFpeEpRVUZETEVOQlFVRXNWMEZCTVVJN1YwRkZRU3hEUVVGQkxFTkJRVVVzVFVGQlJpeERRVUZUTEVOQlFVTXNSVUZCVml4RFFVRmhMRTlCUVdJc1JVRkJjMElzUjBGQmRFSXNSVUZCTWtJc1EwRkJRU3hUUVVGQkxFdEJRVUU3WVVGQlFTeFRRVUZETEV0QlFVUXNSMEZCUVR0SlFVRkJMRU5CUVVFc1EwRkJRU3hEUVVGQkxFbEJRVUVzUTBGQk0wSTdSVUZPUlNKOVxuIiwidmFyICQsIEZpeGVkU3ViTmF2YmFyLFxuICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gRml4ZWRTdWJOYXZiYXIgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIEZpeGVkU3ViTmF2YmFyKCRlbGVtZW50LCBjbGFzc0RhdGEsIG5hdmJhcikge1xuICAgIHRoaXMuYWN0aW9uID0gYmluZCh0aGlzLmFjdGlvbiwgdGhpcyk7XG4gICAgdGhpcy5nZXRPZmZzZXQgPSBiaW5kKHRoaXMuZ2V0T2Zmc2V0LCB0aGlzKTtcbiAgICB0aGlzLnVuc2V0Q2xhc3MgPSBiaW5kKHRoaXMudW5zZXRDbGFzcywgdGhpcyk7XG4gICAgdGhpcy5zZXRDbGFzcyA9IGJpbmQodGhpcy5zZXRDbGFzcywgdGhpcyk7XG4gICAgdGhpcy5uYXZiYXIgPSBuYXZiYXI7XG4gICAgdGhpcy4kZWxlbWVudCA9ICRlbGVtZW50O1xuICAgIHRoaXMuY2xhc3NEYXRhID0gY2xhc3NEYXRhO1xuICAgIHRoaXMuJHdpbmRvdyA9ICQod2luZG93KTtcbiAgICB0aGlzLmFjdGlvbigpO1xuICAgIHRoaXMuJHdpbmRvdy5vbihcImxvYWQgcmVzaXplIHNjcm9sbFwiLCB0aGlzLmFjdGlvbik7XG4gIH1cblxuICBGaXhlZFN1Yk5hdmJhci5wcm90b3R5cGUuc2V0Q2xhc3MgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMuY2xhc3NEYXRhKTtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC50cmlnZ2VyKFwic2V0Q2xhc3NcIik7XG4gIH07XG5cbiAgRml4ZWRTdWJOYXZiYXIucHJvdG90eXBlLnVuc2V0Q2xhc3MgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuY2xhc3NEYXRhKTtcbiAgICByZXR1cm4gdGhpcy4kZWxlbWVudC50cmlnZ2VyKFwidW5zZXRDbGFzc1wiKTtcbiAgfTtcblxuICBGaXhlZFN1Yk5hdmJhci5wcm90b3R5cGUuZ2V0T2Zmc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuJGVsZW1lbnQub2Zmc2V0KCkudG9wKTtcbiAgfTtcblxuICBGaXhlZFN1Yk5hdmJhci5wcm90b3R5cGUuYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuJHdpbmRvdy5zY3JvbGxUb3AoKSA8IHRoaXMuZ2V0T2Zmc2V0KCkgLSBwYXJzZUludCh0aGlzLm5hdmJhci5nZXROYXZiYXJIZWlnaHQoKSkpIHtcbiAgICAgIHJldHVybiB0aGlzLnVuc2V0Q2xhc3MoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuc2V0Q2xhc3MoKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIEZpeGVkU3ViTmF2YmFyO1xuXG59KSgpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaUwxVnpaWEp6TDJsdVlXMXZjbWt0YmkxM2IzSnJjeTlFYjJOMWJXVnVkSE12ZDJocGJHd3RaWFZ5YjNCbExtTnZiUzkzY0MxMGFHVnRaUzFoYzNObGRITXZjMk55YVhCMGN5OUdhWGhsWkZOMVlrNWhkbUpoY2k1amIyWm1aV1VpTENKemIzVnlZMlZTYjI5MElqb2lJaXdpYzI5MWNtTmxjeUk2V3lJdlZYTmxjbk12YVc1aGJXOXlhUzF1TFhkdmNtdHpMMFJ2WTNWdFpXNTBjeTkzYUdsc2JDMWxkWEp2Y0dVdVkyOXRMM2R3TFhSb1pXMWxMV0Z6YzJWMGN5OXpZM0pwY0hSekwwWnBlR1ZrVTNWaVRtRjJZbUZ5TG1OdlptWmxaU0pkTENKdVlXMWxjeUk2VzEwc0ltMWhjSEJwYm1keklqb2lRVUZCUVN4SlFVRkJMR2xDUVVGQk8wVkJRVUU3TzBGQlFVRXNRMEZCUVN4SFFVRkpMRTlCUVVFc1EwRkJVU3hSUVVGU096dEJRVU5LTEUxQlFVMHNRMEZCUXl4UFFVRlFMRWRCUVhWQ08wVkJSVlFzZDBKQlFVTXNVVUZCUkN4RlFVRlhMRk5CUVZnc1JVRkJjMElzVFVGQmRFSTdPenM3TzBsQlExWXNTVUZCUXl4RFFVRkJMRTFCUVVRc1IwRkJWVHRKUVVOV0xFbEJRVU1zUTBGQlFTeFJRVUZFTEVkQlFWazdTVUZEV2l4SlFVRkRMRU5CUVVFc1UwRkJSQ3hIUVVGaE8wbEJRMklzU1VGQlF5eERRVUZCTEU5QlFVUXNSMEZCVnl4RFFVRkJMRU5CUVVVc1RVRkJSanRKUVVWWUxFbEJRVU1zUTBGQlFTeE5RVUZFTEVOQlFVRTdTVUZGUVN4SlFVRkRMRU5CUVVFc1QwRkJUeXhEUVVGRExFVkJRVlFzUTBGQldTeHZRa0ZCV2l4RlFVRnJReXhKUVVGRExFTkJRVUVzVFVGQmJrTTdSVUZTVlRzN01rSkJWVm9zVVVGQlFTeEhRVUZUTEZOQlFVRTdTVUZGVEN4SlFVRkRMRU5CUVVFc1VVRkJVU3hEUVVGRExGRkJRVllzUTBGQmJVSXNTVUZCUXl4RFFVRkJMRk5CUVhCQ08xZEJRMEVzU1VGQlF5eERRVUZCTEZGQlFWRXNRMEZCUXl4UFFVRldMRU5CUVd0Q0xGVkJRV3hDTzBWQlNFczdPekpDUVV0VUxGVkJRVUVzUjBGQlZ5eFRRVUZCTzBsQlJWQXNTVUZCUXl4RFFVRkJMRkZCUVZFc1EwRkJReXhYUVVGV0xFTkJRWE5DTEVsQlFVTXNRMEZCUVN4VFFVRjJRanRYUVVOQkxFbEJRVU1zUTBGQlFTeFJRVUZSTEVOQlFVTXNUMEZCVml4RFFVRnJRaXhaUVVGc1FqdEZRVWhQT3pzeVFrRkxXQ3hUUVVGQkxFZEJRVlVzVTBGQlFUdFhRVU5TTEZGQlFVRXNRMEZCVXl4SlFVRkRMRU5CUVVFc1VVRkJVU3hEUVVGRExFMUJRVllzUTBGQlFTeERRVUZyUWl4RFFVRkRMRWRCUVRWQ08wVkJSRkU3T3pKQ1FVbFdMRTFCUVVFc1IwRkJUeXhUUVVGQk8wbEJRMHdzU1VGQlJ5eEpRVUZETEVOQlFVRXNUMEZCVHl4RFFVRkRMRk5CUVZRc1EwRkJRU3hEUVVGQkxFZEJRWGRDTEVsQlFVTXNRMEZCUVN4VFFVRkVMRU5CUVVFc1EwRkJRU3hIUVVGbExGRkJRVUVzUTBGQlV5eEpRVUZETEVOQlFVRXNUVUZCVFN4RFFVRkRMR1ZCUVZJc1EwRkJRU3hEUVVGVUxFTkJRVEZETzJGQlEwVXNTVUZCUXl4RFFVRkJMRlZCUVVRc1EwRkJRU3hGUVVSR08wdEJRVUVzVFVGQlFUdGhRVWRGTEVsQlFVTXNRMEZCUVN4UlFVRkVMRU5CUVVFc1JVRklSanM3UlVGRVN5SjlcbiIsImltcG9ydCBTd2lwZXIgZnJvbSBcInN3aXBlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBGcm9uUGFnZU1haW5WaXN1YWwge1xuICAvLyDliJ3mnJ/ljJZcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1wYWdlPVxcXCJmcm9udC1wYWdlXFxcIl0gLm1haW4tdmlzdWFsXCIpO1xuICAgIGNvbnN0IGZpZ3VyZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2RhdGEtcGFnZT1cXFwiZnJvbnQtcGFnZVxcXCJdIC5maWd1cmVzID4gZmlndXJlXCIpO1xuXG4gICAgaWYgKHJvb3QgJiYgZmlndXJlcy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBZb3VUdWJlIElGcmFtZSBQbGF5ZXIgQVBJ44KS6Kqt6L6844G/XG4gICAgICBjb25zdCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO1xuICAgICAgc2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vaWZyYW1lX2FwaVwiO1xuICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChzY3JpcHQpO1xuXG4gICAgICAvLyBBUEnjga7mupblgpnlrozkuoblvozjgavliJ3mnJ/ljJZcbiAgICAgIHdpbmRvdy5vbllvdVR1YmVJZnJhbWVBUElSZWFkeSA9ICgpID0+IHtcbiAgICAgICAgbmV3IEZyb25QYWdlTWFpblZpc3VhbChyb290LCBmaWd1cmVzKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLy8g44Kz44Oz44K544OI44Op44Kv44K/XG4gIGNvbnN0cnVjdG9yKHJvb3QsIGZpZ3VyZXMpIHtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuc2luZ2xlID0gZmlndXJlcy5sZW5ndGggPT09IDE7XG4gICAgdGhpcy5zd2lwZXIgPSBudWxsO1xuICAgIHRoaXMuc3dpcGVyVG91Y2hpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnN3aXBlckF1dG9wbGF5ID0ge307XG4gICAgdGhpcy52aWRlb1BsYXllciA9IHt9O1xuICAgIHRoaXMubW9kYWxWaWRlb1BsYXllciA9IG51bGw7XG5cbiAgICB0aGlzLnJlc2l6ZVZpZGVvUGxheWVycyA9IHRoaXMucmVzaXplVmlkZW9QbGF5ZXJzLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vcGVuTW9kYWwgPSB0aGlzLm9wZW5Nb2RhbC5iaW5kKHRoaXMpO1xuICAgIHRoaXMuY2xvc2VNb2RhbCA9IHRoaXMuY2xvc2VNb2RhbC5iaW5kKHRoaXMpO1xuXG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLXdyYXBwZXJcIik7XG5cbiAgICBBcnJheS5mcm9tKGZpZ3VyZXMpLmZvckVhY2goKGZpZ3VyZSwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHNsaWRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJzd2lwZXItc2xpZGVcIik7XG4gICAgICBzbGlkZS5hcHBlbmRDaGlsZCh0aGlzLmNyZWF0ZUxvYWRlcigpKTtcbiAgICAgIHNsaWRlLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlQ2FwdGlvbihmaWd1cmUpKTtcblxuICAgICAgLy8g5YuV55S744K544Op44Kk44OJ44KS6Kit5a6aXG4gICAgICBpZiAoZmlndXJlLmNsYXNzTGlzdC5jb250YWlucyhcIndwLWJsb2NrLWVtYmVkLXlvdXR1YmVcIikpIHtcbiAgICAgICAgY29uc3QgaWZyYW1lID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIik7XG4gICAgICAgIGNvbnN0IHZpZGVvSWQgPSBpZnJhbWUuc3JjLm1hdGNoKC9cXC9lbWJlZFxcLyhbXj9dKykvKVsxXTtcbiAgICAgICAgc2xpZGUuZGF0YXNldC52aWRlb0lkID0gdmlkZW9JZDtcbiAgICAgICAgc2xpZGUuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cbiAgICAgICAgICBgdXJsKGh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpLyR7dmlkZW9JZH0vaHFkZWZhdWx0LmpwZylgO1xuICAgICAgICAgIC8vIGB1cmwoaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJHt2aWRlb0lkfS9tYXhyZXNkZWZhdWx0LmpwZylgO1xuICAgICAgfVxuICAgICAgLy8g6Z2Z5q2i55S744K544Op44Kk44OJ44KS6Kit5a6aXG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgaW1nID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoXCJpbWdcIik7XG4gICAgICAgIHNsaWRlLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoJHtpbWcuc3JjfSlgO1xuICAgICAgfVxuXG4gICAgICBmaWd1cmUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChmaWd1cmUpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNsaWRlKTtcbiAgICB9KTtcblxuICAgIHRoaXMuaW5pdFN3aXBlcigpO1xuXG4gICAgLy8gU3dpcGVy44Gu5Yid5pyf6KGo56S65L2N572u44GM5LiL44Gr44Ga44KM44KL5ZWP6aGM5a++562WXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsICgpID0+IHtcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcInJlc2l6ZVwiKSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLnJlc2l6ZVZpZGVvUGxheWVycyk7XG4gIH1cblxuICAvLyDjg63jg7zjg4Djg7zopoHntKDjgpLnlJ/miJBcbiAgY3JlYXRlTG9hZGVyKCkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJsb2FkZXJcIik7XG4gICAgY29udGFpbmVyLmRhdGFzZXQuc3dpcGVyUGFyYWxsYXggPSAtNTAwO1xuXG4gICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgfVxuXG4gIC8vIOOCreODo+ODl+OCt+ODp+ODs+imgee0oOOCkueUn+aIkFxuICBjcmVhdGVDYXB0aW9uKGZpZ3VyZSkge1xuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJjYXB0aW9uXCIpO1xuICAgIGNvbnRhaW5lci5kYXRhc2V0LnN3aXBlclBhcmFsbGF4ID0gLTUwMDtcblxuICAgIGNvbnN0IHRpdGxlID0gZmlndXJlLnF1ZXJ5U2VsZWN0b3IoXCJmaWdjYXB0aW9uIHN0cm9uZ1wiKTtcbiAgICBpZiAodGl0bGUpIHtcbiAgICAgIHRpdGxlLmNsYXNzTGlzdC5hZGQoXCJ0aXRsZVwiKTtcbiAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aXRsZSk7XG4gICAgfVxuXG4gICAgY29uc3QgbGluayA9IGZpZ3VyZS5xdWVyeVNlbGVjdG9yKFwiZmlnY2FwdGlvbiBhXCIpO1xuICAgIGlmIChsaW5rKSB7XG4gICAgICBsaW5rLmNsYXNzTGlzdC5hZGQoXCJsaW5rXCIpO1xuICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGxpbmspO1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXI7XG4gIH1cblxuICAvLyBTd2lwZXLliJ3mnJ/ljJZcbiAgaW5pdFN3aXBlcigpIHtcbiAgICB0aGlzLnN3aXBlciA9IG5ldyBTd2lwZXIodGhpcy5yb290LnF1ZXJ5U2VsZWN0b3IoXCIuc3dpcGVyLWNvbnRhaW5lclwiKSwge1xuICAgICAgaW5pdDogZmFsc2UsXG4gICAgICBsb29wOiAhdGhpcy5zaW5nbGUsXG4gICAgICBhbGxvd1RvdWNoTW92ZTogIXRoaXMuc2luZ2xlLFxuICAgICAgcGFyYWxsYXg6IHRydWUsXG4gICAgICBwYWdpbmF0aW9uOiB7XG4gICAgICAgIGVsOiB0aGlzLnNpbmdsZSA/IG51bGwgOiB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcihcIi5zd2lwZXItcGFnaW5hdGlvblwiKVxuICAgICAgfSxcbiAgICAgIG9uOiB7XG4gICAgICAgIGluaXQ6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnBsYXkodGhpcy5zd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgICB9LFxuICAgICAgICBzbGlkZUNoYW5nZTogKCkgPT4ge1xuICAgICAgICAgIHRoaXMucGxheSh0aGlzLnN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zaXRpb25FbmQ6ICgpID0+IHtcbiAgICAgICAgICBBcnJheS5mcm9tKHRoaXMuc3dpcGVyLnNsaWRlcykuZm9yRWFjaCgoc2xpZGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAvLyDjgrnjg6/jgqTjg5fkuK3jgavjg4njg6njg4PjgrDjgpLntq3mjIHjgZfjgabjgYTjgaZcbiAgICAgICAgICAgIC8vIOOCouOCr+ODhuOCo+ODluOBquOCueODqeOCpOODieOBjOWGjeeUn+e1guS6huOBl+OBn+WgtOWQiOOBr+acgOWIneOBi+OCieWGjeeUn1xuICAgICAgICAgICAgaWYgKGluZGV4ID09PSB0aGlzLnN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgICBpZiAoc2xpZGUuY2xhc3NMaXN0LmNvbnRhaW5zKFwiZW5kZWRcIikpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKGluZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXkoaW5kZXgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyDpnZ7jgqLjgq/jg4bjgqPjg5bjgarjgrnjg6njgqTjg4njgpLjgq/jg6rjgqJcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmNsZWFyKGluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgdG91Y2hTdGFydDogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3dpcGVyVG91Y2hpbmcgPSB0cnVlO1xuICAgICAgICB9LFxuICAgICAgICB0b3VjaEVuZDogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc3dpcGVyVG91Y2hpbmcgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuc3dpcGVyLmluaXQoKTtcbiAgfVxuXG4gIC8vIOOCueODqeOCpOODieOCkuWGjeeUn1xuICBwbGF5KGluZGV4KSB7XG4gICAgY29uc3Qgc2xpZGUgPSB0aGlzLnN3aXBlci5zbGlkZXNbaW5kZXhdO1xuICAgIGlmIChzbGlkZS5kYXRhc2V0LnZpZGVvSWQpIHtcbiAgICAgIC8vIOODquODs+OCr+WFiOOBjFlvdVR1YmXjga7loLTlkIjjga/jg6Ljg7zjg4Djg6vli5XnlLvjg5fjg6zjgqTjg6Tjg7zjgpLnlJ/miJBcbiAgICAgIGNvbnN0IGxpbmsgPSBzbGlkZS5xdWVyeVNlbGVjdG9yKFwiLmNhcHRpb24gLmxpbmtcIik7XG4gICAgICBjb25zdCBsaW5rTWF0Y2hlcyA9IGxpbmsgPyBsaW5rLmhyZWYubWF0Y2goL3d3dy55b3V0dWJlLmNvbVxcL3dhdGNoXFw/dj0oLispLykgOiBudWxsO1xuICAgICAgaWYgKGxpbmtNYXRjaGVzKSB7XG4gICAgICAgIHRoaXMubW9kYWxWaWRlb1BsYXllciA9IHRoaXMuY3JlYXRlTW9kYWxWaWRlb1BsYXllcihsaW5rTWF0Y2hlc1sxXSk7XG4gICAgICAgIGxpbmsuY2xhc3NMaXN0LmFkZChcInBsYXlcIik7XG4gICAgICAgIGxpbmsuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRoaXMub3Blbk1vZGFsKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy52aWRlb1BsYXllcltpbmRleF0gPSB0aGlzLmNyZWF0ZVZpZGVvUGxheWVyKGluZGV4KTtcbiAgICAgIHRoaXMucmVzaXplVmlkZW9QbGF5ZXJzKCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgc2xpZGUuY2xhc3NMaXN0LmFkZChcInBsYXlpbmdcIik7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kZWRcIik7XG5cbiAgICAgIC8vIOOCueODqeOCpOODieOBjOOBsuOBqOOBpOOBruWgtOWQiOOBr+S9leOCguOBl+OBquOBhFxuICAgICAgaWYgKHRoaXMuc2luZ2xlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gNeenkuOBp+iHquWLleeahOOBq+asoeOBuFxuICAgICAgdGhpcy5zd2lwZXJBdXRvcGxheVtpbmRleF0gPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgdGhpcy5wbGF5TmV4dChpbmRleCk7XG4gICAgICB9LCAxMDAwICogNSk7XG4gICAgfVxuICB9XG5cbiAgLy8g5qyh44Gu44K544Op44Kk44OJ44KS5YaN55SfXG4gIHBsYXlOZXh0KGluZGV4KSB7XG4gICAgY29uc3Qgc2xpZGUgPSB0aGlzLnN3aXBlci5zbGlkZXNbaW5kZXhdO1xuICAgIHNsaWRlLmNsYXNzTGlzdC5yZW1vdmUoXCJwbGF5aW5nXCIpO1xuICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJlbmRlZFwiKTtcblxuICAgIGlmICghdGhpcy5zd2lwZXJUb3VjaGluZyAmJiBpbmRleCA9PT0gdGhpcy5zd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICAgIHRoaXMuc3dpcGVyLnNsaWRlTmV4dCgxMDAwKTtcbiAgICB9XG4gIH1cblxuICAvLyDjgrnjg6njgqTjg4njgpLjgq/jg6rjgqJcbiAgY2xlYXIoaW5kZXgpIHtcbiAgICBjb25zdCBzbGlkZSA9IHRoaXMuc3dpcGVyLnNsaWRlc1tpbmRleF07XG4gICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIiwgXCJwbGF5aW5nXCIsIFwiZW5kZWRcIik7XG5cbiAgICBpZiAoc2xpZGUuZGF0YXNldC52aWRlb0lkKSB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBzbGlkZS5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvLWNvbnRhaW5lclwiKTtcbiAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY29udGFpbmVyKTtcbiAgICAgIH1cbiAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zd2lwZXJBdXRvcGxheVtpbmRleF0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aGlzLnN3aXBlckF1dG9wbGF5W2luZGV4XSk7XG4gICAgfVxuICB9XG5cbiAgLy8g5YuV55S744OX44Os44Kk44Ok44O844KS55Sf5oiQXG4gIGNyZWF0ZVZpZGVvUGxheWVyKGluZGV4KSB7XG4gICAgY29uc3Qgc2xpZGUgPSB0aGlzLnN3aXBlci5zbGlkZXNbaW5kZXhdO1xuICAgIGlmIChzbGlkZS5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvLWNvbnRhaW5lclwiKSkge1xuICAgICAgcmV0dXJuIHRoaXMudmlkZW9QbGF5ZXJbaW5kZXhdO1xuICAgIH1cblxuICAgIC8vIOmFjee9rueUqOOCs+ODs+ODhuODiuOCkuS9nOaIkFxuICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJ2aWRlby1jb250YWluZXJcIik7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIHNsaWRlLmFwcGVuZENoaWxkKGNvbnRhaW5lcik7XG4gICAgc2xpZGUuY2xhc3NMaXN0LmFkZChcImxvYWRpbmdcIik7XG5cbiAgICByZXR1cm4gbmV3IFlULlBsYXllcihjb250YWluZXIuZmlyc3RDaGlsZCwge1xuICAgICAgdmlkZW9JZDogc2xpZGUuZGF0YXNldC52aWRlb0lkLFxuICAgICAgcGxheWVyVmFyczoge1xuICAgICAgICBjb250cm9sczogMCxcbiAgICAgICAgZGlzYWJsZWtiOiAxLFxuICAgICAgICBmczogMCxcbiAgICAgICAgbW9kZXN0YnJhbmRpbmc6IDEsXG4gICAgICAgIGl2X2xvYWRfcG9saWN5OiAzLFxuICAgICAgICByZWw6IDAsXG4gICAgICAgIG11dGU6IDEsXG4gICAgICAgIHBsYXlzaW5saW5lOiAxXG4gICAgICB9LFxuICAgICAgZXZlbnRzOiB7XG4gICAgICAgIG9uUmVhZHk6IGUgPT4ge1xuICAgICAgICAgIGNvbnN0IHZpZGVvUGxheWVyID0gZS50YXJnZXQ7XG4gICAgICAgICAgdmlkZW9QbGF5ZXIucGxheVZpZGVvKCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uU3RhdGVDaGFuZ2U6IGUgPT4ge1xuICAgICAgICAgIGNvbnN0IHZpZGVvUGxheWVyID0gZS50YXJnZXQ7XG4gICAgICAgICAgc3dpdGNoIChlLmRhdGEpIHtcbiAgICAgICAgICAgIGNhc2UgWVQuUGxheWVyU3RhdGUuUExBWUlORzpcbiAgICAgICAgICAgICAgc2xpZGUuY2xhc3NMaXN0LnJlbW92ZShcImxvYWRpbmdcIik7XG4gICAgICAgICAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoXCJwbGF5aW5nXCIpO1xuICAgICAgICAgICAgICBzbGlkZS5jbGFzc0xpc3QucmVtb3ZlKFwiZW5kZWRcIik7XG5cbiAgICAgICAgICAgICAgLy8g44K544Op44Kk44OJ44GM44Gy44Go44Gk44Gu5aC05ZCI44Gv5L2V44KC44GX44Gq44GEXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNpbmdsZSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIOWLleeUu+OBruWGjeeUn+e1guS6huaZgumWk+OBrjHnp5LliY3jgavoh6rli5XnmoTjgavmrKHjgbhcbiAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSB2aWRlb1BsYXllci5nZXREdXJhdGlvbigpO1xuICAgICAgICAgICAgICB0aGlzLnN3aXBlckF1dG9wbGF5W2luZGV4XSA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZHVyYXRpb24gLSB2aWRlb1BsYXllci5nZXRDdXJyZW50VGltZSgpIDwgMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5TmV4dChpbmRleCk7XG4gICAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3dpcGVyQXV0b3BsYXlbaW5kZXhdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sIDEwMCk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBZVC5QbGF5ZXJTdGF0ZS5FTkRFRDpcbiAgICAgICAgICAgICAgLy8g44K544Op44Kk44OJ44GM44Gy44Go44Gk44Gu5aC05ZCI44Gv44Or44O844OX5YaN55SfXG4gICAgICAgICAgICAgIGlmICh0aGlzLnNpbmdsZSkge1xuICAgICAgICAgICAgICAgIHZpZGVvUGxheWVyLnNlZWtUbygwKTtcbiAgICAgICAgICAgICAgICB2aWRlb1BsYXllci5wbGF5VmlkZW8oKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyDli5XnlLvjga7lho3nlJ/ntYLkuoblvozjga7plqLpgKPli5XnlLvooajnpLrliY3jgavlgZzmraJcbiAgICAgICAgICAgICAgdmlkZW9QbGF5ZXIuc3RvcFZpZGVvKCk7XG4gICAgICAgICAgICAgIHZpZGVvUGxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyDjg6Ljg7zjg4Djg6vli5XnlLvjg5fjg6zjgqTjg6Tjg7zjgpLnlJ/miJBcbiAgY3JlYXRlTW9kYWxWaWRlb1BsYXllcih2aWRlb0lkKSB7XG4gICAgY29uc3QgbW9kYWwgPSB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKTtcblxuICAgIC8vIOmFjee9rueUqOOCs+ODs+ODhuODiuOCkuOCr+ODquOColxuICAgIGNvbnN0IGNvbnRhaW5lciA9IG1vZGFsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkZW8tY29udGFpbmVyXCIpO1xuICAgIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuXG4gICAgcmV0dXJuIG5ldyBZVC5QbGF5ZXIoY29udGFpbmVyLmZpcnN0Q2hpbGQsIHtcbiAgICAgIHZpZGVvSWQ6IHZpZGVvSWQsXG4gICAgICBwbGF5ZXJWYXJzOiB7XG4gICAgICAgIGNvbnRyb2xzOiAxLFxuICAgICAgICBkaXNhYmxla2I6IDEsXG4gICAgICAgIGZzOiAwLFxuICAgICAgICBtb2Rlc3RicmFuZGluZzogMCxcbiAgICAgICAgaXZfbG9hZF9wb2xpY3k6IDMsXG4gICAgICAgIHJlbDogMCxcbiAgICAgICAgbXV0ZTogMCxcbiAgICAgICAgcGxheXNpbmxpbmU6IDFcbiAgICAgIH0sXG4gICAgICBldmVudHM6IHtcbiAgICAgICAgb25TdGF0ZUNoYW5nZTogZSA9PiB7XG4gICAgICAgICAgY29uc3QgdmlkZW9QbGF5ZXIgPSBlLnRhcmdldDtcbiAgICAgICAgICBzd2l0Y2ggKGUuZGF0YSkge1xuICAgICAgICAgICAgY2FzZSBZVC5QbGF5ZXJTdGF0ZS5FTkRFRDpcbiAgICAgICAgICAgICAgLy8g5YuV55S744Gu5YaN55Sf57WC5LqG5b6M44Gu6Zai6YCj5YuV55S76KGo56S65YmN44Gr5YGc5q2iXG4gICAgICAgICAgICAgIHZpZGVvUGxheWVyLnN0b3BWaWRlbygpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8vIOWLleeUu+ODl+ODrOOCpOODpOODvOOBruOCteOCpOOCuuOCkuiqv+aVtFxuICByZXNpemVWaWRlb1BsYXllcnMoKSB7XG4gICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IGhlaWdodCA9IHdpZHRoICogKDkgLyAxNik7XG4gICAgbGV0IHggPSAwO1xuICAgIGxldCB5ID0gMDtcblxuICAgIC8vIOWfuua6luOBrumrmOOBlVxuICAgIGxldCBiYXNlSGVpZ2h0ID0gMzc1O1xuICAgIGlmICh3aWR0aCA+PSAxMDAwKSB7XG4gICAgICBiYXNlSGVpZ2h0ID0gNjAwO1xuICAgIH1cbiAgICBlbHNlIGlmICh3aWR0aCA+PSA3NjgpIHtcbiAgICAgIGJhc2VIZWlnaHQgPSA0ODA7XG4gICAgfVxuXG4gICAgLy8g57im5L2N572u44KS6Kq/5pW0XG4gICAgaWYgKGhlaWdodCA+IGJhc2VIZWlnaHQpIHtcbiAgICAgIHkgPSAoaGVpZ2h0IC0gYmFzZUhlaWdodCkgLyAtMjtcbiAgICB9XG4gICAgLy8g6auY44GV44GM5Z+65rqW44Gr5rqA44Gf44Gq44GE5aC05ZCI44Gr5bmF44Go5qiq5L2N572u44KS6Kq/5pW0XG4gICAgZWxzZSB7XG4gICAgICBoZWlnaHQgPSBiYXNlSGVpZ2h0O1xuICAgICAgd2lkdGggPSBoZWlnaHQgKiAoMTYgLyA5KTtcbiAgICAgIHggPSAod2lkdGggLSB3aW5kb3cuaW5uZXJXaWR0aCkgLyAtMjtcbiAgICB9XG5cbiAgICBBcnJheS5mcm9tKHRoaXMuc3dpcGVyLnNsaWRlcykuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICBjb25zdCBjb250YWluZXIgPSBzbGlkZS5xdWVyeVNlbGVjdG9yKFwiLnZpZGVvLWNvbnRhaW5lclwiKTtcbiAgICAgIGlmIChjb250YWluZXIpIHtcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gd2lkdGggKyBcInB4XCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyBcInB4XCI7XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KWA7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyDjg6Ljg7zjg4Djg6vjgpLplovjgY9cbiAgb3Blbk1vZGFsKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBpbmRleCA9IHRoaXMuc3dpcGVyLmFjdGl2ZUluZGV4O1xuXG4gICAgLy8g44K544Op44Kk44OJ44Gu5YuV55S744KS5LiA5pmC5YGc5q2iXG4gICAgdGhpcy52aWRlb1BsYXllcltpbmRleF0ucGF1c2VWaWRlbygpO1xuICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zd2lwZXJBdXRvcGxheVtpbmRleF0pO1xuXG4gICAgLy8g44Oi44O844OA44Or44Gu5YuV55S744KS5YaN55SfXG4gICAgdGhpcy5tb2RhbFZpZGVvUGxheWVyLnBsYXlWaWRlbygpO1xuXG4gICAgY29uc3QgbW9kYWwgPSB0aGlzLnJvb3QucXVlcnlTZWxlY3RvcihcIi5tb2RhbFwiKTtcbiAgICBtb2RhbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0aGlzLmNsb3NlTW9kYWwpO1xuICB9XG5cbiAgLy8g44Oi44O844OA44Or44KS6ZaJ44GY44KLXG4gIGNsb3NlTW9kYWwoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zd2lwZXIuYWN0aXZlSW5kZXg7XG5cbiAgICAvLyDjgrnjg6njgqTjg4njga7li5XnlLvjgpLlho3nlJ9cbiAgICB0aGlzLnZpZGVvUGxheWVyW2luZGV4XS5wbGF5VmlkZW8oKTtcblxuICAgIC8vIOODouODvOODgOODq+OBruWLleeUu+OCkuWBnOatolxuICAgIHRoaXMubW9kYWxWaWRlb1BsYXllci5zdG9wVmlkZW8oKTtcblxuICAgIC8vIOWGjeW4sOeahOOBq+ODouODvOODgOODq+imgee0oOOCkuWPluW+l1xuICAgIGxldCBtb2RhbCA9IGUudGFyZ2V0O1xuICAgIHdoaWxlICghbW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwibW9kYWxcIikpe1xuICAgICAgbW9kYWwgPSBtb2RhbC5wYXJlbnROb2RlXG4gICAgfVxuICAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH1cbn1cbiIsImltcG9ydCBqdW1wIGZyb20gXCJqdW1wLmpzXCJcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFnZXRvcCB7XG4gIHN0YXRpYyBpbml0KCkge1xuICAgIGNvbnN0IGxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIltkYXRhLWNvbXBvbmVudD1cXFwicGFnZXRvcFxcXCJdXCIpO1xuICAgIGlmIChsaW5rcykge1xuICAgICAgcmV0dXJuIG5ldyBQYWdldG9wKGxpbmtzKTtcbiAgICB9XG4gIH1cblxuICBjb25zdHJ1Y3RvcihsaW5rcykge1xuICAgIEFycmF5LmZyb20obGlua3MpLmZvckVhY2gobGluayA9PiB7XG4gICAgICBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgIGp1bXAoXCJib2R5XCIsIHsgZHVyYXRpb246IDYwMCB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iLCJpbXBvcnQgU3dpcGVyIGZyb20gXCJzd2lwZXJcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU2NyZWVuc2hvdHMge1xuICAvLyDliJ3mnJ/ljJZcbiAgc3RhdGljIGluaXQoKSB7XG4gICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbZGF0YS1jb21wb25lbnQ9XFxcInNjcmVlbnNob3RzXFxcIl1cIik7XG4gICAgaWYgKHJvb3QpIHtcbiAgICAgIHJldHVybiBuZXcgU2NyZWVuc2hvdHMocm9vdCk7XG4gICAgfVxuICB9XG5cbiAgLy8g44Kz44Oz44K544OI44Op44Kv44K/XG4gIGNvbnN0cnVjdG9yKHJvb3QpIHtcbiAgICB0aGlzLnJvb3QgPSByb290O1xuICAgIHRoaXMuc3dpcGVyID0gbnVsbDtcblxuICAgIHRoaXMuaW5pdFN3aXBlcigpO1xuICB9XG5cbiAgLy8gU3dpcGVy5Yid5pyf5YyWXG4gIGluaXRTd2lwZXIoKSB7XG4gICAgdGhpcy5zd2lwZXIgPSBuZXcgU3dpcGVyKHRoaXMucm9vdC5xdWVyeVNlbGVjdG9yKFwiLnN3aXBlci1jb250YWluZXJcIiksIHtcbiAgICAgIGluaXQ6IGZhbHNlLFxuICAgICAgaW5pdGlhbFNsaWRlOiAxLFxuICAgICAgY2VudGVyZWRTbGlkZXM6IHRydWUsXG4gICAgICBsb29wOiB0cnVlLFxuICAgICAgYXV0b3BsYXk6IHtcbiAgICAgICAgZGVsYXk6IDMwMDAsXG4gICAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgIDA6IHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAyLFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgNzY4OiB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldzogMi41LFxuICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzAsXG4gICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgMTAwMDoge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDMsXG4gICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBvbjoge1xuICAgICAgICBpbml0OiAoKSA9PiB7XG4gICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN3aXBlclJlc2l6ZSgpO1xuICAgICAgICAgIH0sIDApO1xuICAgICAgICB9LFxuICAgICAgICByZXNpemU6ICgpID0+IHtcbiAgICAgICAgICB0aGlzLnN3aXBlclJlc2l6ZSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5zd2lwZXIuaW5pdCgpO1xuICB9XG5cbiAgLy8g44Oq44K144Kk44K65pmC44Gr6Ieq5YuV5YaN55Sf44KS5YiH5pu/44GIXG4gIHN3aXBlclJlc2l6ZSgpIHtcbiAgICBpZiAodGhpcy5zd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlKSB7XG4gICAgICB0aGlzLnN3aXBlci5hdXRvcGxheS5zdGFydCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRoaXMuc3dpcGVyLmF1dG9wbGF5LnN0b3AoKTtcbiAgICB9XG4gIH1cbn1cbiIsInZhciAkLCBTY3JvbGxBY3Rpb24sXG4gIGJpbmQgPSBmdW5jdGlvbihmbiwgbWUpeyByZXR1cm4gZnVuY3Rpb24oKXsgcmV0dXJuIGZuLmFwcGx5KG1lLCBhcmd1bWVudHMpOyB9OyB9O1xuXG4kID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2pRdWVyeSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnalF1ZXJ5J10gOiBudWxsKTtcblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxBY3Rpb24gPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFNjcm9sbEFjdGlvbigkZWxlbWVudCwgY2xhc3NEYXRhKSB7XG4gICAgdGhpcy5hY3Rpb24gPSBiaW5kKHRoaXMuYWN0aW9uLCB0aGlzKTtcbiAgICB0aGlzLmdldE9mZnNldCA9IGJpbmQodGhpcy5nZXRPZmZzZXQsIHRoaXMpO1xuICAgIHRoaXMudW5zZXRDbGFzcyA9IGJpbmQodGhpcy51bnNldENsYXNzLCB0aGlzKTtcbiAgICB0aGlzLnNldENsYXNzID0gYmluZCh0aGlzLnNldENsYXNzLCB0aGlzKTtcbiAgICB0aGlzLiRlbGVtZW50ID0gJGVsZW1lbnQ7XG4gICAgdGhpcy5jbGFzc0RhdGEgPSBjbGFzc0RhdGE7XG4gICAgdGhpcy4kd2luZG93ID0gJCh3aW5kb3cpO1xuICAgIHRoaXMuJHdpbmRvdy5vbihcImxvYWQgcmVzaXplIHNjcm9sbFwiLCB0aGlzLmFjdGlvbik7XG4gICAgdGhpcy5hY3Rpb24oKTtcbiAgfVxuXG4gIFNjcm9sbEFjdGlvbi5wcm90b3R5cGUuc2V0Q2xhc3MgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoIXRoaXMuJGVsZW1lbnQuaGFzQ2xhc3ModGhpcy5jbGFzc0RhdGEpKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LmFkZENsYXNzKHRoaXMuY2xhc3NEYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJzZXRDbGFzc1wiKTtcbiAgICB9XG4gIH07XG5cbiAgU2Nyb2xsQWN0aW9uLnByb3RvdHlwZS51bnNldENsYXNzID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuJGVsZW1lbnQuaGFzQ2xhc3ModGhpcy5jbGFzc0RhdGEpKSB7XG4gICAgICB0aGlzLiRlbGVtZW50LnJlbW92ZUNsYXNzKHRoaXMuY2xhc3NEYXRhKTtcbiAgICAgIHJldHVybiB0aGlzLiRlbGVtZW50LnRyaWdnZXIoXCJ1bnNldENsYXNzXCIpO1xuICAgIH1cbiAgfTtcblxuICBTY3JvbGxBY3Rpb24ucHJvdG90eXBlLmdldE9mZnNldCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICh0aGlzLiRlbGVtZW50LmNzcygncG9zaXRpb24nKSA9PT0gXCJmaXhlZFwiKSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnQodGhpcy4kZWxlbWVudC5oZWlnaHQoKSkgKyBwYXJzZUludCh0aGlzLiRlbGVtZW50LnBvc2l0aW9uKCkudG9wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuJGVsZW1lbnQub2Zmc2V0KCkudG9wKTtcbiAgICB9XG4gIH07XG5cbiAgU2Nyb2xsQWN0aW9uLnByb3RvdHlwZS5hY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICBpZiAodGhpcy4kd2luZG93LnNjcm9sbFRvcCgpIDwgdGhpcy5nZXRPZmZzZXQoKSkge1xuICAgICAgcmV0dXJuIHRoaXMudW5zZXRDbGFzcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXRDbGFzcygpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gU2Nyb2xsQWN0aW9uO1xuXG59KSgpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaUwxVnpaWEp6TDJsdVlXMXZjbWt0YmkxM2IzSnJjeTlFYjJOMWJXVnVkSE12ZDJocGJHd3RaWFZ5YjNCbExtTnZiUzkzY0MxMGFHVnRaUzFoYzNObGRITXZjMk55YVhCMGN5OVRZM0p2Ykd4QlkzUnBiMjR1WTI5bVptVmxJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTDFWelpYSnpMMmx1WVcxdmNta3RiaTEzYjNKcmN5OUViMk4xYldWdWRITXZkMmhwYkd3dFpYVnliM0JsTG1OdmJTOTNjQzEwYUdWdFpTMWhjM05sZEhNdmMyTnlhWEIwY3k5VFkzSnZiR3hCWTNScGIyNHVZMjltWm1WbElsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMRWxCUVVFc1pVRkJRVHRGUVVGQk96dEJRVUZCTEVOQlFVRXNSMEZCU1N4UFFVRkJMRU5CUVZFc1VVRkJVanM3UVVGSFNpeE5RVUZOTEVOQlFVTXNUMEZCVUN4SFFVRjFRanRGUVVWVUxITkNRVUZETEZGQlFVUXNSVUZCVnl4VFFVRllPenM3T3p0SlFVTldMRWxCUVVNc1EwRkJRU3hSUVVGRUxFZEJRVms3U1VGRFdpeEpRVUZETEVOQlFVRXNVMEZCUkN4SFFVRmhPMGxCUTJJc1NVRkJReXhEUVVGQkxFOUJRVVFzUjBGQlZ5eERRVUZCTEVOQlFVVXNUVUZCUmp0SlFVTllMRWxCUVVNc1EwRkJRU3hQUVVGUExFTkJRVU1zUlVGQlZDeERRVUZaTEc5Q1FVRmFMRVZCUVd0RExFbEJRVU1zUTBGQlFTeE5RVUZ1UXp0SlFVTkJMRWxCUVVNc1EwRkJRU3hOUVVGRUxFTkJRVUU3UlVGTVZUczdlVUpCVDFvc1VVRkJRU3hIUVVGVExGTkJRVUU3U1VGRFVDeEpRVUZCTEVOQlFVOHNTVUZCUXl4RFFVRkJMRkZCUVZFc1EwRkJReXhSUVVGV0xFTkJRVzFDTEVsQlFVTXNRMEZCUVN4VFFVRndRaXhEUVVGUU8wMUJRMFVzU1VGQlF5eERRVUZCTEZGQlFWRXNRMEZCUXl4UlFVRldMRU5CUVcxQ0xFbEJRVU1zUTBGQlFTeFRRVUZ3UWp0aFFVTkJMRWxCUVVNc1EwRkJRU3hSUVVGUkxFTkJRVU1zVDBGQlZpeERRVUZyUWl4VlFVRnNRaXhGUVVaR096dEZRVVJQT3p0NVFrRkxWQ3hWUVVGQkxFZEJRVmNzVTBGQlFUdEpRVU5VTEVsQlFVY3NTVUZCUXl4RFFVRkJMRkZCUVZFc1EwRkJReXhSUVVGV0xFTkJRVzFDTEVsQlFVTXNRMEZCUVN4VFFVRndRaXhEUVVGSU8wMUJRMFVzU1VGQlF5eERRVUZCTEZGQlFWRXNRMEZCUXl4WFFVRldMRU5CUVhOQ0xFbEJRVU1zUTBGQlFTeFRRVUYyUWp0aFFVTkJMRWxCUVVNc1EwRkJRU3hSUVVGUkxFTkJRVU1zVDBGQlZpeERRVUZyUWl4WlFVRnNRaXhGUVVaR096dEZRVVJUT3p0NVFrRkxXQ3hUUVVGQkxFZEJRVlVzVTBGQlFUdEpRVU5TTEVsQlFVY3NTVUZCUXl4RFFVRkJMRkZCUVZFc1EwRkJReXhIUVVGV0xFTkJRV01zVlVGQlpDeERRVUZCTEV0QlFUWkNMRTlCUVdoRE8yRkJRMFVzVVVGQlFTeERRVUZUTEVsQlFVTXNRMEZCUVN4UlFVRlJMRU5CUVVNc1RVRkJWaXhEUVVGQkxFTkJRVlFzUTBGQlFTeEhRVUVyUWl4UlFVRkJMRU5CUVZNc1NVRkJReXhEUVVGQkxGRkJRVkVzUTBGQlF5eFJRVUZXTEVOQlFVRXNRMEZCYjBJc1EwRkJReXhIUVVFNVFpeEZRVVJxUXp0TFFVRkJMRTFCUVVFN1lVRkhSU3hSUVVGQkxFTkJRVk1zU1VGQlF5eERRVUZCTEZGQlFWRXNRMEZCUXl4TlFVRldMRU5CUVVFc1EwRkJhMElzUTBGQlF5eEhRVUUxUWl4RlFVaEdPenRGUVVSUk96dDVRa0ZQVml4TlFVRkJMRWRCUVU4c1UwRkJRVHRKUVVOTUxFbEJRVWNzU1VGQlF5eERRVUZCTEU5QlFVOHNRMEZCUXl4VFFVRlVMRU5CUVVFc1EwRkJRU3hIUVVGMVFpeEpRVUZETEVOQlFVRXNVMEZCUkN4RFFVRkJMRU5CUVRGQ08yRkJRMFVzU1VGQlF5eERRVUZCTEZWQlFVUXNRMEZCUVN4RlFVUkdPMHRCUVVFc1RVRkJRVHRoUVVkRkxFbEJRVU1zUTBGQlFTeFJRVUZFTEVOQlFVRXNSVUZJUmpzN1JVRkVTeUo5XG4iLCJpbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTbGlkZU1lbnUge1xuXG5cdGNvbnN0cnVjdG9yKCRlbCkge1xuXHRcdHRoaXMuJGVsID0gJGVsO1xuXHRcdHRoaXMuc3RhdGUgPSBmYWxzZTtcblx0XHR0aGlzLiR0YXJnZXQgPSAkKHRoaXMuJGVsLmRhdGEoXCJzbGlkZW1lbnUtdGFyZ2V0XCIpKTtcblx0XHR0aGlzLm9uKCk7XG5cdH1cblxuXHRvbigpIHtcblx0XHR0aGlzLiRlbC5vbignY2xpY2snLCB0aGlzLnRvZ2dsZS5iaW5kKHRoaXMpKTtcblx0fVxuXG5cdHRvZ2dsZShldmVudCkge1xuXHRcdGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cdFx0dGhpcy5zdGF0ZSA9ICF0aGlzLnN0YXRlO1xuXHRcdGlmICh0aGlzLnN0YXRlKSB7XG5cdFx0XHR0aGlzLm9wZW4oKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGhpcy5jbG9zZSgpO1xuXHRcdH1cblx0fVxuXG5cdG9wZW4oKSB7XG5cdFx0dmFyIGhlaWdodDtcblx0XHR0aGlzLiRlbC5hZGRDbGFzcyhcImlzLW9wZW5cIik7XG5cdFx0dGhpcy4kdGFyZ2V0LmFkZENsYXNzKFwiaXMtb3BlblwiKTtcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KFwiXCIpO1xuXHRcdGhlaWdodCA9IHRoaXMuJHRhcmdldC5oZWlnaHQoKTtcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KDApO1xuXHRcdHRoaXMuJHRhcmdldC5oZWlnaHQoaGVpZ2h0KTtcblx0fVxuXG5cdGNsb3NlKCkge1xuXHRcdHRoaXMuJHRhcmdldC5oZWlnaHQodGhpcy4kdGFyZ2V0LmhlaWdodCgpKTtcblx0XHR0aGlzLiR0YXJnZXQuaGVpZ2h0KDApO1xuXHRcdHRoaXMuJGVsLnJlbW92ZUNsYXNzKFwiaXMtb3BlblwiKTtcblx0XHR0aGlzLiR0YXJnZXQucmVtb3ZlQ2xhc3MoXCJpcy1vcGVuXCIpO1xuXHR9XG5cblxuXHRzdGF0aWMgaW5pdCgpIHtcblx0XHQkKFwiW2RhdGEtc2xpZGVtZW51LXRhcmdldF1cIikuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBuZXcgU2xpZGVNZW51KCQodGhpcykpO1xuXHRcdH0pO1xuXHR9XG5cbn0iLCJ2YXIgJCwgU3ViTmF2aWdhdGlvbiwgXztcblxuJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbCk7XG5cbl8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snXyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnXyddIDogbnVsbCk7XG5cbm1vZHVsZS5leHBvcnRzID0gU3ViTmF2aWdhdGlvbiA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gU3ViTmF2aWdhdGlvbihzZWxlY3RvciwgY29udGVudHNTZWxlY3Rvcikge1xuICAgIHZhciBpdGVtcywgc2VsZjtcbiAgICB0aGlzLiRlbGVtZW50ID0gJChzZWxlY3Rvcik7XG4gICAgdGhpcy4kY29udGVudCA9ICQoY29udGVudHNTZWxlY3Rvcik7XG4gICAgaXRlbXMgPSB0aGlzLmNyZWF0ZSgpO1xuICAgIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuJGVsZW1lbnQuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgIHZhciAkdGhpcywgaHRtbCwgdGVtcGxhdGU7XG4gICAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgICB0ZW1wbGF0ZSA9IF8udGVtcGxhdGUoJCgnW2RhdGEtc3ViLW5hdmlnYXRpb24tdGVtcGxhdGVdJykudGV4dCgpKTtcbiAgICAgIGlmICh0ZW1wbGF0ZSkge1xuICAgICAgICBodG1sID0gXy5tYXAoaXRlbXMsIGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gdGVtcGxhdGUoaXRlbSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gJHRoaXMuYXBwZW5kKGh0bWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgU3ViTmF2aWdhdGlvbi5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zO1xuICAgIGl0ZW1zID0gW107XG4gICAgdGhpcy4kY29udGVudC5maW5kKCdoMSwgaDIsIGgzLCBoNCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgJHRoaXMsIGlkO1xuICAgICAgJHRoaXMgPSAkKHRoaXMpO1xuICAgICAgaWQgPSAkdGhpcy5hdHRyKCdpZCcpO1xuICAgICAgaWYgKCFpZCkge1xuICAgICAgICBpZCA9ICR0aGlzLmZpbmQoJ2EnKS5hdHRyKCdpZCcpO1xuICAgICAgfVxuICAgICAgaWYgKGlkKSB7XG4gICAgICAgIHJldHVybiBpdGVtcy5wdXNoKHtcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgdGV4dDogJHRoaXMudGV4dCgpXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBpdGVtcztcbiAgfTtcblxuICByZXR1cm4gU3ViTmF2aWdhdGlvbjtcblxufSkoKTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0ptYVd4bElqb2lMMVZ6WlhKekwybHVZVzF2Y21rdGJpMTNiM0pyY3k5RWIyTjFiV1Z1ZEhNdmQyaHBiR3d0WlhWeWIzQmxMbU52YlM5M2NDMTBhR1Z0WlMxaGMzTmxkSE12YzJOeWFYQjBjeTlUZFdKT1lYWnBaMkYwYVc5dUxtTnZabVpsWlNJc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKemIzVnlZMlZ6SWpwYklpOVZjMlZ5Y3k5cGJtRnRiM0pwTFc0dGQyOXlhM012Ukc5amRXMWxiblJ6TDNkb2FXeHNMV1YxY205d1pTNWpiMjB2ZDNBdGRHaGxiV1V0WVhOelpYUnpMM05qY21sd2RITXZVM1ZpVG1GMmFXZGhkR2x2Ymk1amIyWm1aV1VpWFN3aWJtRnRaWE1pT2x0ZExDSnRZWEJ3YVc1bmN5STZJa0ZCUVVFc1NVRkJRVHM3UVVGQlFTeERRVUZCTEVkQlFVa3NUMEZCUVN4RFFVRlJMRkZCUVZJN08wRkJRMG9zUTBGQlFTeEhRVUZKTEU5QlFVRXNRMEZCVVN4WlFVRlNPenRCUVVOS0xFMUJRVTBzUTBGQlF5eFBRVUZRTEVkQlFYVkNPMFZCUlZJc2RVSkJRVVVzVVVGQlJpeEZRVUZaTEdkQ1FVRmFPMEZCUlZnc1VVRkJRVHRKUVVGQkxFbEJRVU1zUTBGQlFTeFJRVUZFTEVkQlFWa3NRMEZCUVN4RFFVRkZMRkZCUVVZN1NVRkRXaXhKUVVGRExFTkJRVUVzVVVGQlJDeEhRVUZaTEVOQlFVRXNRMEZCUlN4blFrRkJSanRKUVVOYUxFdEJRVUVzUjBGQlVTeEpRVUZETEVOQlFVRXNUVUZCUkN4RFFVRkJPMGxCUlZJc1NVRkJRU3hIUVVGUE8wbEJRMUFzU1VGQlF5eERRVUZCTEZGQlFWRXNRMEZCUXl4SlFVRldMRU5CUVdVc1UwRkJRVHRCUVVOaUxGVkJRVUU3VFVGQlFTeExRVUZCTEVkQlFWRXNRMEZCUVN4RFFVRkZMRWxCUVVZN1RVRkRVaXhSUVVGQkxFZEJRVmNzUTBGQlF5eERRVUZETEZGQlFVWXNRMEZCVnl4RFFVRkJMRU5CUVVVc1owTkJRVVlzUTBGQmJVTXNRMEZCUXl4SlFVRndReXhEUVVGQkxFTkJRVmc3VFVGRldDeEpRVUZITEZGQlFVZzdVVUZEUlN4SlFVRkJMRWRCUVU4c1EwRkJReXhEUVVGRExFZEJRVVlzUTBGQlRTeExRVUZPTEVWQlFXRXNVMEZCUXl4SlFVRkVPMmxDUVVGVExGRkJRVUVzUTBGQlV5eEpRVUZVTzFGQlFWUXNRMEZCWWp0bFFVTlFMRXRCUVVzc1EwRkJReXhOUVVGT0xFTkJRV0VzU1VGQllpeEZRVVpHT3p0SlFVcGhMRU5CUVdZN1JVRlFWenM3TUVKQlpXSXNUVUZCUVN4SFFVRlJMRk5CUVVFN1FVRkRUaXhSUVVGQk8wbEJRVUVzUzBGQlFTeEhRVUZSTzBsQlExSXNTVUZCUXl4RFFVRkJMRkZCUVZFc1EwRkJReXhKUVVGV0xFTkJRV1VzWjBKQlFXWXNRMEZCWjBNc1EwRkJReXhKUVVGcVF5eERRVUZ6UXl4VFFVRkJPMEZCUTNCRExGVkJRVUU3VFVGQlFTeExRVUZCTEVkQlFWRXNRMEZCUVN4RFFVRkZMRWxCUVVZN1RVRkRVaXhGUVVGQkxFZEJRVXNzUzBGQlN5eERRVUZETEVsQlFVNHNRMEZCVnl4SlFVRllPMDFCUTB3c1NVRkJRU3hEUVVGMVF5eEZRVUYyUXp0UlFVRkJMRVZCUVVFc1IwRkJTeXhMUVVGTExFTkJRVU1zU1VGQlRpeERRVUZYTEVkQlFWZ3NRMEZCWlN4RFFVRkRMRWxCUVdoQ0xFTkJRWEZDTEVsQlFYSkNMRVZCUVV3N08wMUJRMEVzU1VGQlJ5eEZRVUZJTzJWQlEwVXNTMEZCU3l4RFFVRkRMRWxCUVU0c1EwRkJWenRWUVVGRkxFVkJRVUVzUlVGQlNTeEZRVUZPTzFWQlFWVXNTVUZCUVN4RlFVRk5MRXRCUVVzc1EwRkJReXhKUVVGT0xFTkJRVUVzUTBGQmFFSTdVMEZCV0N4RlFVUkdPenRKUVVwdlF5eERRVUYwUXp0WFFVOUJPMFZCVkUwaWZRPT1cbiIsInZhciAkLCBGaXhlZE5hdmJhciwgRml4ZWRTdWJOYXZiYXIsIEZyb25QYWdlTWFpblZpc3VhbCwgUGFnZXRvcCwgU2NyZWVuc2hvdHMsIFNjcm9sbEFjdGlvbiwgU2xpZGVNZW51LCBTdWJOYXZpZ2F0aW9uO1xuXG4kID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2pRdWVyeSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnalF1ZXJ5J10gOiBudWxsKTtcblxuRnJvblBhZ2VNYWluVmlzdWFsID0gcmVxdWlyZSgnLi9Gcm9uUGFnZU1haW5WaXN1YWwnKTtcblxuUGFnZXRvcCA9IHJlcXVpcmUoJy4vUGFnZXRvcCcpO1xuXG5TY3JlZW5zaG90cyA9IHJlcXVpcmUoJy4vU2NyZWVuc2hvdHMnKTtcblxuU2xpZGVNZW51ID0gcmVxdWlyZSgnLi9TbGlkZU1lbnUnKTtcblxuRml4ZWROYXZiYXIgPSByZXF1aXJlKCcuL0ZpeGVkTmF2YmFyJyk7XG5cblNjcm9sbEFjdGlvbiA9IHJlcXVpcmUoJy4vU2Nyb2xsQWN0aW9uJyk7XG5cblN1Yk5hdmlnYXRpb24gPSByZXF1aXJlKCcuL1N1Yk5hdmlnYXRpb24nKTtcblxuRml4ZWRTdWJOYXZiYXIgPSByZXF1aXJlKCcuL0ZpeGVkU3ViTmF2YmFyJyk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gIEZyb25QYWdlTWFpblZpc3VhbC5pbml0KCk7XG4gIFBhZ2V0b3AuaW5pdCgpO1xuICByZXR1cm4gU2NyZWVuc2hvdHMuaW5pdCgpO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gIHJldHVybiAkKCcubWVudS1pdGVtLWhhcy1jaGlsZHJlbicpLmFmdGVyKCkub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBpZiAoISghJChldmVudC50YXJnZXQpLmlzKCdsaScpKSkge1xuICAgICAgcmV0dXJuICQodGhpcykudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuJChmdW5jdGlvbigpIHtcbiAgcmV0dXJuICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkKCcucC1tYWluLXZpc3VhbF9fb3ZlcmxheV9mYWRlb3V0JykuZGVsYXkoNTAwMCkucXVldWUoZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gJCh0aGlzKS5hZGRDbGFzcyhcInAtbWFpbi12aXN1YWxfX292ZXJsYXlfaGlkZVwiKS5kZXF1ZXVlKCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gIHZhciB5b3V0dWJlO1xuICAkKCdhW2hyZWYqPVwieW91dHUuYmVcIl0nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciBocmVmO1xuICAgIGhyZWYgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcbiAgICBocmVmID0gaHJlZi5yZXBsYWNlKFwieW91dHUuYmUvXCIsIFwid3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9XCIpO1xuICAgIHJldHVybiAkKHRoaXMpLmF0dHIoJ2hyZWYnLCBocmVmKTtcbiAgfSk7XG4gIHlvdXR1YmUgPSAkKCdhW2hyZWYqPVwieW91dHVcIl06aGFzKGltZyk6bm90KC5oZWFkZXIteW91dHViZSknKTtcbiAgeW91dHViZS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJwLXRleHQtaW1hZ2UtYmxvY2tfX3BsYXktYnRuXCIvPicpO1xuICByZXR1cm4geW91dHViZS5tYWduaWZpY1BvcHVwKHtcbiAgICB0eXBlOiAnaWZyYW1lJyxcbiAgICBtYWluQ2xhc3M6ICdtZnAtZmFkZScsXG4gICAgcmVtb3ZhbERlbGF5OiAxNjAsXG4gICAgcHJlbG9hZGVyOiBmYWxzZSxcbiAgICBmaXhlZENvbnRlbnRQb3M6IGZhbHNlXG4gIH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gIHJldHVybiAkKCdhLnAtbWFpbi12aXN1YWwnKS5tYWduaWZpY1BvcHVwKHtcbiAgICB0eXBlOiAnaWZyYW1lJyxcbiAgICBtYWluQ2xhc3M6ICdtZnAtZmFkZScsXG4gICAgcmVtb3ZhbERlbGF5OiAxNjAsXG4gICAgcHJlbG9hZGVyOiBmYWxzZSxcbiAgICBmaXhlZENvbnRlbnRQb3M6IGZhbHNlXG4gIH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gIHJldHVybiAkKGRvY3VtZW50KS5hamF4U3VjY2VzcyhmdW5jdGlvbihldmVudCwgeGhyLCBzZXR0aW5ncykge1xuICAgIHZhciB1cmw7XG4gICAgdXJsID0gc2V0dGluZ3MudXJsO1xuICAgIGlmICh0eXBlb2YgZ2EgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2EgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiBnYSgnc2VuZCcsICdwYWdldmlldycsIHVybC5yZXBsYWNlKGxvY2F0aW9uLm9yaWdpbiwgXCJcIikpO1xuICAgIH1cbiAgfSk7XG59KTtcblxuJChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIFNsaWRlTWVudS5pbml0KCk7XG59KTtcblxuJChmdW5jdGlvbigpIHtcbiAgcmV0dXJuICQod2luZG93KS5vbignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkKCcucC12b2ljZS1jb250YWluZXInKS5hZGRDbGFzcygnaXMtdHJhbnNpdGlvbicpO1xuICB9KTtcbn0pO1xuXG4kKGZ1bmN0aW9uKCkge1xuICBpZiAoISghbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvTW9iaWxlL2kpICYmICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9pb3MvaSkgJiYgIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL2FuZHJvaWQvaSkpKSB7XG4gICAgcmV0dXJuICQoXCJ2aWRlb1wiKS5hdHRyKFwiY29udHJvbHNcIiwgXCJjb250cm9sc1wiKTtcbiAgfVxufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gICQoXCJbZGF0YS1wYWdlVG9wXVwiKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICB2YXIgc3BlZWQ7XG4gICAgc3BlZWQgPSA4MDA7XG4gICAgJChcImh0bWwsIGJvZHlcIikuYW5pbWF0ZSh7XG4gICAgICBzY3JvbGxUb3A6IDBcbiAgICB9LCBzcGVlZCwgXCJlYXNlT3V0RXhwb1wiKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0pO1xuICByZXR1cm4gJChmdW5jdGlvbigpIHtcbiAgICB2YXIgZml4SGFzaDtcbiAgICBmaXhIYXNoID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBvZmZzZXRUb3A7XG4gICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIH1cbiAgICAgIGlmIChsb2NhdGlvbi5oYXNoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgb2Zmc2V0VG9wID0gJChsb2NhdGlvbi5oYXNoKS5vZmZzZXQoKS50b3A7XG4gICAgICAgICQod2luZG93KS5zY3JvbGxUb3Aob2Zmc2V0VG9wIC0gMTMwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIGZpeEhhc2goKTtcbiAgICAkKHdpbmRvdykub24oXCJoYXNoY2hhbmdlXCIsIGZpeEhhc2gpO1xuICAgIHJldHVybiAkKCcucC1zdWItbmF2aWdhdGlvbicpLm9uKCdjbGljaycsICdhJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciAkdGFyZ2V0LCBoYXNoLCBvZmZzZXRUb3A7XG4gICAgICBoYXNoID0gdGhpcy5oYXNoO1xuICAgICAgJHRhcmdldCA9ICQoaGFzaCk7XG4gICAgICBpZiAoJHRhcmdldC5sZW5ndGgpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgb2Zmc2V0VG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3AgLSAxMzA7XG4gICAgICAgIHJldHVybiAkKFwiaHRtbCwgYm9keVwiKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6IG9mZnNldFRvcFxuICAgICAgICB9LCA2MDAsIFwiZWFzZU91dEV4cG9cIikucHJvbWlzZSgpLmRvbmUoZnVuY3Rpb24oKSB7fSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufSk7XG5cbiQoZnVuY3Rpb24oKSB7XG4gIHZhciBuYXZiYXIsIHN1Yk5hdmlnYXRpb247XG4gIHN1Yk5hdmlnYXRpb24gPSBuZXcgU3ViTmF2aWdhdGlvbignW2RhdGEtc3ViLW5hdmlnYXRpb25dJywgJy5wLXBhZ2UtY29udGVudCcpO1xuICBzdWJOYXZpZ2F0aW9uLiRlbGVtZW50LmNsb25lKHRydWUpLmFwcGVuZFRvKCQoJ1tkYXRhLXN1Yi1uYXZpZ2F0aW9uLWZpeGVkXScpKTtcbiAgbmF2YmFyID0gbmV3IEZpeGVkTmF2YmFyKCdbZGF0YS1maXhlZC1uYXZiYXJdJywgJ1tkYXRhLWZpeGVkLWJvZHldJyk7XG4gIHJldHVybiAkKFwiW2RhdGEtc3ViLW5hdmlnYXRpb24tY29udGFpbmVyXVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzdWJOYXZpZ2F0aW9uID0gbmV3IEZpeGVkU3ViTmF2YmFyKCQodGhpcyksICdpcy1oaWRkZW4nLCBuYXZiYXIpO1xuICB9KS5vbihcInNldENsYXNzXCIsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkKFwiLnAtbmF2YmFyX19zdWItbmF2aWdhdGlvblwiKS5zaG93KCk7XG4gIH0pLm9uKFwidW5zZXRDbGFzc1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJChcIi5wLW5hdmJhcl9fc3ViLW5hdmlnYXRpb25cIikuaGlkZSgpO1xuICB9KTtcbn0pO1xuXG4kKGZ1bmN0aW9uKCkge1xuICAkKFwiW2RhdGEtc2Nyb2xsLWFkZGNsYXNzXVwiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciAkdGhpcztcbiAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgcmV0dXJuIG5ldyBTY3JvbGxBY3Rpb24oJHRoaXMsICR0aGlzLmRhdGEoXCJzY3JvbGwtYWRkY2xhc3NcIikpO1xuICB9KTtcbiAgJCgnLnAtbmF2YmFyJykub24oXCJzZXRDbGFzc1wiLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICB9KS5vbihcInVuc2V0Q2xhc3NcIiwgZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbC1jb250ZW50XCIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgfSk7XG4gICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbCBpXCIpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAkKFwiLnAtbmF2aWdhdGlvbl9faXRlbV90ZWwtY29udGVudFwiKS50b2dnbGVDbGFzcygnaXMtYWN0aXZlJyk7XG4gIH0pO1xuICBpZiAoJChcIi5wLW5hdmJhcl9zbWFsbFwiKS5sZW5ndGggPiAwKSB7XG4gICAgJChcIi5wLW5hdmlnYXRpb25fX2l0ZW1fdGVsLWNvbnRlbnRcIikucmVtb3ZlQ2xhc3MoJ2lzLWFjdGl2ZScpO1xuICB9IGVsc2Uge1xuICAgICQoXCIucC1uYXZpZ2F0aW9uX19pdGVtX3RlbC1jb250ZW50XCIpLmFkZENsYXNzKCdpcy1hY3RpdmUnKTtcbiAgfVxuICByZXR1cm4gJChcIi5wLXBhZ2UtY29udGVudCB2aWRlb1wiKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgIHZhciAkdGhpcztcbiAgICAkdGhpcyA9ICQodGhpcyk7XG4gICAgcmV0dXJuICR3aW5kb3cub24oJ2xvYWQgc2Nyb2xsJywgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB0cmlnZ2VyTm9kZVBvc2l0aW9uO1xuICAgICAgICBpZiAoIW5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL01vYmlsZS9pKSAmJiAhbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvaW9zL2kpICYmICFuYXZpZ2F0b3IudXNlckFnZW50Lm1hdGNoKC9hbmRyb2lkL2kpKSB7XG4gICAgICAgICAgdHJpZ2dlck5vZGVQb3NpdGlvbiA9ICR0aGlzLm9mZnNldCgpLnRvcCAtICR3aW5kb3cuaGVpZ2h0KCk7XG4gICAgICAgICAgaWYgKHRyaWdnZXJOb2RlUG9zaXRpb24gPCAkd2luZG93LnNjcm9sbFRvcCgpICYmICR3aW5kb3cuc2Nyb2xsVG9wKCkgPCAkdGhpcy5vZmZzZXQoKS50b3AgKyAkdGhpcy5oZWlnaHQoKSkge1xuICAgICAgICAgICAgcmV0dXJuICR0aGlzLmdldCgwKS5wbGF5KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAkdGhpcy5nZXQoMCkucGF1c2UoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfSkodGhpcykpO1xuICB9KTtcbn0pO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSm1hV3hsSWpvaUwxVnpaWEp6TDJsdVlXMXZjbWt0YmkxM2IzSnJjeTlFYjJOMWJXVnVkSE12ZDJocGJHd3RaWFZ5YjNCbExtTnZiUzkzY0MxMGFHVnRaUzFoYzNObGRITXZjMk55YVhCMGN5OWhiR3d1WTI5bVptVmxJaXdpYzI5MWNtTmxVbTl2ZENJNklpSXNJbk52ZFhKalpYTWlPbHNpTDFWelpYSnpMMmx1WVcxdmNta3RiaTEzYjNKcmN5OUViMk4xYldWdWRITXZkMmhwYkd3dFpYVnliM0JsTG1OdmJTOTNjQzEwYUdWdFpTMWhjM05sZEhNdmMyTnlhWEIwY3k5aGJHd3VZMjltWm1WbElsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJMRWxCUVVFN08wRkJRVUVzUTBGQlFTeEhRVUZKTEU5QlFVRXNRMEZCVVN4UlFVRlNPenRCUVVOS0xHdENRVUZCTEVkQlFYRkNMRTlCUVVFc1EwRkJVU3h6UWtGQlVqczdRVUZEY2tJc1QwRkJRU3hIUVVGVkxFOUJRVUVzUTBGQlVTeFhRVUZTT3p0QlFVTldMRmRCUVVFc1IwRkJZeXhQUVVGQkxFTkJRVkVzWlVGQlVqczdRVUZEWkN4VFFVRkJMRWRCUVZrc1QwRkJRU3hEUVVGUkxHRkJRVkk3TzBGQlExb3NWMEZCUVN4SFFVRmpMRTlCUVVFc1EwRkJVU3hsUVVGU096dEJRVU5rTEZsQlFVRXNSMEZCWlN4UFFVRkJMRU5CUVZFc1owSkJRVkk3TzBGQlEyWXNZVUZCUVN4SFFVRm5RaXhQUVVGQkxFTkJRVkVzYVVKQlFWSTdPMEZCUTJoQ0xHTkJRVUVzUjBGQmFVSXNUMEZCUVN4RFFVRlJMR3RDUVVGU096dEJRVVZxUWl4RFFVRkJMRU5CUVVVc1UwRkJRVHRGUVVOQkxHdENRVUZyUWl4RFFVRkRMRWxCUVc1Q0xFTkJRVUU3UlVGRFFTeFBRVUZQTEVOQlFVTXNTVUZCVWl4RFFVRkJPMU5CUTBFc1YwRkJWeXhEUVVGRExFbEJRVm9zUTBGQlFUdEJRVWhCTEVOQlFVWTdPMEZCUzBFc1EwRkJRU3hEUVVGRkxGTkJRVUU3VTBGRFFTeERRVUZCTEVOQlFVVXNlVUpCUVVZc1EwRkJORUlzUTBGQlF5eExRVUUzUWl4RFFVRkJMRU5CUVc5RExFTkJRVU1zUlVGQmNrTXNRMEZCZDBNc1QwRkJlRU1zUlVGQmFVUXNVMEZCUXl4TFFVRkVPMGxCUXk5RExFbEJRVUVzUTBGQlRTeERRVUZETEVOQlFVTXNRMEZCUVN4RFFVRkZMRXRCUVVzc1EwRkJReXhOUVVGU0xFTkJRV1VzUTBGQlF5eEZRVUZvUWl4RFFVRnRRaXhKUVVGdVFpeERRVUZHTEVOQlFVNDdZVUZEUlN4RFFVRkJMRU5CUVVVc1NVRkJSaXhEUVVGUExFTkJRVU1zVjBGQlVpeERRVUZ2UWl4UlFVRndRaXhGUVVSR096dEZRVVFyUXl4RFFVRnFSRHRCUVVSQkxFTkJRVVk3TzBGQlMwRXNRMEZCUVN4RFFVRkZMRk5CUVVFN1UwRkxRU3hEUVVGQkxFTkJRVVVzVFVGQlJpeERRVUZUTEVOQlFVTXNSVUZCVml4RFFVRmhMRTFCUVdJc1JVRkJjVUlzVTBGQlFUdFhRVU51UWl4RFFVRkJMRU5CUVVVc2FVTkJRVVlzUTBGRFFTeERRVUZETEV0QlJFUXNRMEZEVHl4SlFVUlFMRU5CUlVFc1EwRkJReXhMUVVaRUxFTkJSVkVzVTBGQlFUdGhRVUZOTEVOQlFVRXNRMEZCUlN4SlFVRkdMRU5CUVU4c1EwRkJReXhSUVVGU0xFTkJRV2xDTERaQ1FVRnFRaXhEUVVFclF5eERRVUZETEU5QlFXaEVMRU5CUVVFN1NVRkJUaXhEUVVaU08wVkJSRzFDTEVOQlFYSkNPMEZCVEVFc1EwRkJSanM3UVVGWlFTeERRVUZCTEVOQlFVVXNVMEZCUVR0QlFVMUJMRTFCUVVFN1JVRkJRU3hEUVVGQkxFTkJRVVVzY1VKQlFVWXNRMEZCZDBJc1EwRkJReXhKUVVGNlFpeERRVUU0UWl4VFFVRkJPMEZCUXpWQ0xGRkJRVUU3U1VGQlFTeEpRVUZCTEVkQlFVOHNRMEZCUVN4RFFVRkZMRWxCUVVZc1EwRkJUeXhEUVVGRExFbEJRVklzUTBGQllTeE5RVUZpTzBsQlExQXNTVUZCUVN4SFFVRlBMRWxCUVVrc1EwRkJReXhQUVVGTUxFTkJRV0VzVjBGQllpeEZRVUV3UWl3d1FrRkJNVUk3VjBGRFVDeERRVUZCTEVOQlFVVXNTVUZCUml4RFFVRlBMRU5CUVVNc1NVRkJVaXhEUVVGaExFMUJRV0lzUlVGQmNVSXNTVUZCY2tJN1JVRklORUlzUTBGQk9VSTdSVUZMUVN4UFFVRkJMRWRCUVZVc1EwRkJRU3hEUVVGSExHZEVRVUZJTzBWQlExWXNUMEZCVHl4RFFVRkRMRTFCUVZJc1EwRkJaU3cyUTBGQlpqdFRRVU5CTEU5QlFVOHNRMEZCUXl4aFFVRlNMRU5CUVhOQ08wbEJRM0JDTEVsQlFVRXNSVUZCVFN4UlFVUmpPMGxCUlhCQ0xGTkJRVUVzUlVGQlZ5eFZRVVpUTzBsQlIzQkNMRmxCUVVFc1JVRkJZeXhIUVVoTk8wbEJTWEJDTEZOQlFVRXNSVUZCVnl4TFFVcFRPMGxCUzNCQ0xHVkJRVUVzUlVGQmFVSXNTMEZNUnp0SFFVRjBRanRCUVdKQkxFTkJRVVk3TzBGQmNVSkJMRU5CUVVFc1EwRkJSU3hUUVVGQk8xTkJSMEVzUTBGQlFTeERRVUZITEdsQ1FVRklMRU5CUVhOQ0xFTkJRVU1zWVVGQmRrSXNRMEZCY1VNN1NVRkRia01zU1VGQlFTeEZRVUZOTEZGQlJEWkNPMGxCUlc1RExGTkJRVUVzUlVGQlZ5eFZRVVozUWp0SlFVZHVReXhaUVVGQkxFVkJRV01zUjBGSWNVSTdTVUZKYmtNc1UwRkJRU3hGUVVGWExFdEJTbmRDTzBsQlRXNURMR1ZCUVVFc1JVRkJhVUlzUzBGT2EwSTdSMEZCY2tNN1FVRklRU3hEUVVGR096dEJRV05CTEVOQlFVRXNRMEZCUlN4VFFVRkJPMU5CUTBFc1EwRkJRU3hEUVVGRkxGRkJRVVlzUTBGQlZ5eERRVUZETEZkQlFWb3NRMEZCZDBJc1UwRkJReXhMUVVGRUxFVkJRVkVzUjBGQlVpeEZRVUZoTEZGQlFXSTdRVUZEZEVJc1VVRkJRVHRKUVVGQkxFZEJRVUVzUjBGQlRTeFJRVUZSTEVOQlFVTTdTVUZEWml4SlFVRkhMSGREUVVGSU8yRkJRMFVzUlVGQlFTeERRVUZITEUxQlFVZ3NSVUZCVnl4VlFVRllMRVZCUVhWQ0xFZEJRVWNzUTBGQlF5eFBRVUZLTEVOQlFWa3NVVUZCVVN4RFFVRkRMRTFCUVhKQ0xFVkJRVFpDTEVWQlFUZENMRU5CUVhaQ0xFVkJSRVk3TzBWQlJuTkNMRU5CUVhoQ08wRkJSRUVzUTBGQlJqczdRVUZOUVN4RFFVRkJMRU5CUVVVc1UwRkJRVHRUUVVOQkxGTkJRVk1zUTBGQlF5eEpRVUZXTEVOQlFVRTdRVUZFUVN4RFFVRkdPenRCUVVkQkxFTkJRVUVzUTBGQlJTeFRRVUZCTzFOQlEwRXNRMEZCUVN4RFFVRkZMRTFCUVVZc1EwRkJVeXhEUVVGRExFVkJRVllzUTBGQllTeE5RVUZpTEVWQlFYRkNMRk5CUVVFN1YwRkRia0lzUTBGQlFTeERRVUZGTEc5Q1FVRkdMRU5CUVhWQ0xFTkJRVU1zVVVGQmVFSXNRMEZCYVVNc1pVRkJha003UlVGRWJVSXNRMEZCY2tJN1FVRkVRU3hEUVVGR096dEJRVWxCTEVOQlFVRXNRMEZCUlN4VFFVRkJPMFZCUTBFc1NVRkJRU3hEUVVGQkxFTkJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNVMEZCVXl4RFFVRkRMRXRCUVhCQ0xFTkJRVEJDTEZOQlFURkNMRU5CUVVRc1NVRkJNRU1zUTBGQlF5eFRRVUZUTEVOQlFVTXNVMEZCVXl4RFFVRkRMRXRCUVhCQ0xFTkJRVEJDTEUxQlFURkNMRU5CUVRORExFbEJRV2xHTEVOQlFVTXNVMEZCVXl4RFFVRkRMRk5CUVZNc1EwRkJReXhMUVVGd1FpeERRVUV3UWl4VlFVRXhRaXhEUVVGNlJpeERRVUZCTzFkQlEwVXNRMEZCUVN4RFFVRkZMRTlCUVVZc1EwRkJWU3hEUVVGRExFbEJRVmdzUTBGQlowSXNWVUZCYUVJc1JVRkJNa0lzVlVGQk0wSXNSVUZFUmpzN1FVRkVRU3hEUVVGR096dEJRVTFCTEVOQlFVRXNRMEZCUlN4VFFVRkJPMFZCVFVFc1EwRkJRU3hEUVVGRkxHZENRVUZHTEVOQlFXMUNMRU5CUVVNc1MwRkJjRUlzUTBGQk1FSXNVMEZCUVR0QlFVTjRRaXhSUVVGQk8wbEJRVUVzUzBGQlFTeEhRVUZSTzBsQlExSXNRMEZCUVN4RFFVRkZMRmxCUVVZc1EwRkJaU3hEUVVGRExFOUJRV2hDTEVOQlFYZENPMDFCUVVNc1UwRkJRU3hGUVVGVkxFTkJRVmc3UzBGQmVFSXNSVUZCZFVNc1MwRkJka01zUlVGQk9FTXNZVUZCT1VNN1FVRkRRU3hYUVVGUE8wVkJTR2xDTEVOQlFURkNPMU5CVlVFc1EwRkJRU3hEUVVGRkxGTkJRVUU3UVVGRlFTeFJRVUZCTzBsQlFVRXNUMEZCUVN4SFFVRlZMRk5CUVVNc1MwRkJSRHRCUVVWU0xGVkJRVUU3VFVGQlFTeEpRVUZITEV0QlFVZzdVVUZEUlN4TFFVRkxMRU5CUVVNc1kwRkJUaXhEUVVGQkxFVkJSRVk3TzAxQlJVRXNTVUZCUnl4UlFVRlJMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRV1FzUjBGQmRVSXNRMEZCTVVJN1VVRkRSU3hUUVVGQkxFZEJRVmtzUTBGQlFTeERRVUZGTEZGQlFWRXNRMEZCUXl4SlFVRllMRU5CUVdkQ0xFTkJRVU1zVFVGQmFrSXNRMEZCUVN4RFFVRjVRaXhEUVVGRE8xRkJRM1JETEVOQlFVRXNRMEZCUlN4TlFVRkdMRU5CUVZNc1EwRkJReXhUUVVGV0xFTkJRVzlDTEZOQlFVRXNSMEZCV1N4SFFVRm9ReXhGUVVaR096dGhRVWRCTzBsQlVGRTdTVUZUVml4UFFVRkJMRU5CUVVFN1NVRkZRU3hEUVVGQkxFTkJRVVVzVFVGQlJpeERRVUZUTEVOQlFVTXNSVUZCVml4RFFVRmhMRmxCUVdJc1JVRkJNa0lzVDBGQk0wSTdWMEZIUVN4RFFVRkJMRU5CUVVVc2JVSkJRVVlzUTBGQmMwSXNRMEZCUXl4RlFVRjJRaXhEUVVFd1FpeFBRVUV4UWl4RlFVRnRReXhIUVVGdVF5eEZRVUYzUXl4VFFVRkRMRXRCUVVRN1FVRkZkRU1zVlVGQlFUdE5RVUZCTEVsQlFVRXNSMEZCVHl4SlFVRkRMRU5CUVVNN1RVRkRWQ3hQUVVGQkxFZEJRVlVzUTBGQlFTeERRVUZGTEVsQlFVWTdUVUZEVml4SlFVRkhMRTlCUVU4c1EwRkJReXhOUVVGWU8xRkJRMFVzUzBGQlN5eERRVUZETEdOQlFVNHNRMEZCUVR0UlFVTkJMRk5CUVVFc1IwRkJXU3hQUVVGUExFTkJRVU1zVFVGQlVpeERRVUZCTEVOQlFXZENMRU5CUVVNc1IwRkJha0lzUjBGQmRVSTdaVUZEYmtNc1EwRkJRU3hEUVVGRkxGbEJRVVlzUTBGQlpTeERRVUZETEU5QlFXaENMRU5CUVhkQ08xVkJRVU1zVTBGQlFTeEZRVUZWTEZOQlFWZzdVMEZCZUVJc1JVRkJLME1zUjBGQkwwTXNSVUZCYjBRc1lVRkJjRVFzUTBGQmEwVXNRMEZCUXl4UFFVRnVSU3hEUVVGQkxFTkJRVFJGTEVOQlFVTXNTVUZCTjBVc1EwRkJhMFlzVTBGQlFTeEhRVUZCTEVOQlFXeEdMRVZCU0VZN08wbEJTbk5ETEVOQlFYaERPMFZCYUVKQkxFTkJRVVk3UVVGb1FrRXNRMEZCUmpzN1FVRnBSRUVzUTBGQlFTeERRVUZGTEZOQlFVRTdRVUZEUVN4TlFVRkJPMFZCUVVFc1lVRkJRU3hIUVVGcFFpeEpRVUZKTEdGQlFVb3NRMEZCYTBJc2RVSkJRV3hDTEVWQlFUSkRMR2xDUVVFelF6dEZRVU5xUWl4aFFVRmhMRU5CUVVNc1VVRkJVU3hEUVVGRExFdEJRWFpDTEVOQlFUWkNMRWxCUVRkQ0xFTkJRV3RETEVOQlFVTXNVVUZCYmtNc1EwRkJORU1zUTBGQlFTeERRVUZGTERaQ1FVRkdMRU5CUVRWRE8wVkJSVUVzVFVGQlFTeEhRVUZUTEVsQlFVa3NWMEZCU2l4RFFVRm5RaXh4UWtGQmFFSXNSVUZCZFVNc2JVSkJRWFpETzFOQlJWUXNRMEZCUVN4RFFVRkZMR2xEUVVGR0xFTkJRVzlETEVOQlFVTXNTVUZCY2tNc1EwRkJNRU1zVTBGQlFUdFhRVU40UXl4aFFVRkJMRWRCUVdkQ0xFbEJRVWtzWTBGQlNpeERRVUZ0UWl4RFFVRkJMRU5CUVVVc1NVRkJSaXhEUVVGdVFpeEZRVUY1UWl4WFFVRjZRaXhGUVVGelF5eE5RVUYwUXp0RlFVUjNRaXhEUVVFeFF5eERRVWRCTEVOQlFVTXNSVUZJUkN4RFFVZEpMRlZCU0Vvc1JVRkhaMElzVTBGQlFUdFhRVU5rTEVOQlFVRXNRMEZCUlN3eVFrRkJSaXhEUVVFNFFpeERRVUZETEVsQlFTOUNMRU5CUVVFN1JVRkVZeXhEUVVob1FpeERRVTFCTEVOQlFVTXNSVUZPUkN4RFFVMUpMRmxCVGtvc1JVRk5hMElzVTBGQlFUdFhRVU5vUWl4RFFVRkJMRU5CUVVVc01rSkJRVVlzUTBGQk9FSXNRMEZCUXl4SlFVRXZRaXhEUVVGQk8wVkJSR2RDTEVOQlRteENPMEZCVGtFc1EwRkJSanM3UVVGeFFrRXNRMEZCUVN4RFFVRkZMRk5CUVVFN1JVRkRRU3hEUVVGQkxFTkJRVVVzZDBKQlFVWXNRMEZCTWtJc1EwRkJReXhKUVVFMVFpeERRVUZwUXl4VFFVRkJPMEZCUXk5Q0xGRkJRVUU3U1VGQlFTeExRVUZCTEVkQlFWRXNRMEZCUVN4RFFVRkZMRWxCUVVZN1YwRkRVaXhKUVVGSkxGbEJRVW9zUTBGQmFVSXNTMEZCYWtJc1JVRkJkMElzUzBGQlN5eERRVUZETEVsQlFVNHNRMEZCVnl4cFFrRkJXQ3hEUVVGNFFqdEZRVVlyUWl4RFFVRnFRenRGUVV0QkxFTkJRVUVzUTBGQlJTeFhRVUZHTEVOQlEwRXNRMEZCUXl4RlFVUkVMRU5CUTBrc1ZVRkVTaXhGUVVOblFpeFRRVUZCTzFkQlEyUXNRMEZCUVN4RFFVRkZMR2xEUVVGR0xFTkJRVzlETEVOQlFVTXNWMEZCY2tNc1EwRkJhVVFzVjBGQmFrUTdSVUZFWXl4RFFVUm9RaXhEUVVsQkxFTkJRVU1zUlVGS1JDeERRVWxKTEZsQlNrb3NSVUZKYTBJc1UwRkJRVHRYUVVOb1FpeERRVUZCTEVOQlFVVXNhVU5CUVVZc1EwRkJiME1zUTBGQlF5eFJRVUZ5UXl4RFFVRTRReXhYUVVFNVF6dEZRVVJuUWl4RFFVcHNRanRGUVZGQkxFTkJRVUVzUTBGQlJTd3lRa0ZCUml4RFFVRTRRaXhEUVVGRExFVkJRUzlDTEVOQlFXdERMRTlCUVd4RExFVkJRVEpETEZOQlFVRTdWMEZEZWtNc1EwRkJRU3hEUVVGRkxHbERRVUZHTEVOQlFXOURMRU5CUVVNc1YwRkJja01zUTBGQmFVUXNWMEZCYWtRN1JVRkVlVU1zUTBGQk0wTTdSVUZKUVN4SlFVRkhMRU5CUVVFc1EwRkJSU3hwUWtGQlJpeERRVUZ2UWl4RFFVRkRMRTFCUVhKQ0xFZEJRVGhDTEVOQlFXcERPMGxCUTBVc1EwRkJRU3hEUVVGRkxHbERRVUZHTEVOQlFXOURMRU5CUVVNc1YwRkJja01zUTBGQmFVUXNWMEZCYWtRc1JVRkVSanRIUVVGQkxFMUJRVUU3U1VGSlJTeERRVUZCTEVOQlFVVXNhVU5CUVVZc1EwRkJiME1zUTBGQlF5eFJRVUZ5UXl4RFFVRTRReXhYUVVFNVF5eEZRVXBHT3p0VFFXZENRU3hEUVVGQkxFTkJRVVVzZFVKQlFVWXNRMEZCTUVJc1EwRkJReXhKUVVFelFpeERRVUZuUXl4VFFVRkJPMEZCUXpsQ0xGRkJRVUU3U1VGQlFTeExRVUZCTEVkQlFWRXNRMEZCUVN4RFFVRkZMRWxCUVVZN1YwRkRVaXhQUVVGUExFTkJRVU1zUlVGQlVpeERRVUZYTEdGQlFWZ3NSVUZCTUVJc1EwRkJRU3hUUVVGQkxFdEJRVUU3WVVGQlFTeFRRVUZCTzBGQlEzaENMRmxCUVVFN1VVRkJRU3hKUVVGSExFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4TFFVRndRaXhEUVVFd1FpeFRRVUV4UWl4RFFVRkVMRWxCUVRCRExFTkJRVU1zVTBGQlV5eERRVUZETEZOQlFWTXNRMEZCUXl4TFFVRndRaXhEUVVFd1FpeE5RVUV4UWl4RFFVRXpReXhKUVVGcFJpeERRVUZETEZOQlFWTXNRMEZCUXl4VFFVRlRMRU5CUVVNc1MwRkJjRUlzUTBGQk1FSXNWVUZCTVVJc1EwRkJja1k3VlVGRFJTeHRRa0ZCUVN4SFFVRnpRaXhMUVVGTExFTkJRVU1zVFVGQlRpeERRVUZCTEVOQlFXTXNRMEZCUXl4SFFVRm1MRWRCUVhGQ0xFOUJRVThzUTBGQlF5eE5RVUZTTEVOQlFVRTdWVUZETTBNc1NVRkJSeXh0UWtGQlFTeEhRVUZ6UWl4UFFVRlBMRU5CUVVNc1UwRkJVaXhEUVVGQkxFTkJRWFJDTEVsQlFUaERMRTlCUVU4c1EwRkJReXhUUVVGU0xFTkJRVUVzUTBGQlFTeEhRVUZ6UWl4TFFVRkxMRU5CUVVNc1RVRkJUaXhEUVVGQkxFTkJRV01zUTBGQlF5eEhRVUZtTEVkQlFYRkNMRXRCUVVzc1EwRkJReXhOUVVGT0xFTkJRVUVzUTBGQk5VWTdiVUpCUTBVc1MwRkJTeXhEUVVGRExFZEJRVTRzUTBGQlZTeERRVUZXTEVOQlFWa3NRMEZCUXl4SlFVRmlMRU5CUVVFc1JVRkVSanRYUVVGQkxFMUJRVUU3YlVKQlIwVXNTMEZCU3l4RFFVRkRMRWRCUVU0c1EwRkJWU3hEUVVGV0xFTkJRVmtzUTBGQlF5eExRVUZpTEVOQlFVRXNSVUZJUmp0WFFVWkdPenROUVVSM1FqdEpRVUZCTEVOQlFVRXNRMEZCUVN4RFFVRkJMRWxCUVVFc1EwRkJNVUk3UlVGR09FSXNRMEZCYUVNN1FVRnNRMEVzUTBGQlJpSjlcbiJdfQ==
