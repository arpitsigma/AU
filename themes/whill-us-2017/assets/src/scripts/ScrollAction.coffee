$ = require 'jquery'


module.exports = class ScrollAction

  constructor:($element, classData)->
    @$element = $element
    @classData = classData
    @$window = $ window;
    @$window.on "load resize scroll", @action
    @action()

  setClass:() =>
    unless @$element.hasClass @classData
      @$element.addClass @classData
      @$element.trigger "setClass"

  unsetClass:() =>
    if @$element.hasClass @classData
      @$element.removeClass @classData
      @$element.trigger "unsetClass"

  getOffset:() =>
    if @$element.css('position') == "fixed"
      parseInt(@$element.height()) + parseInt(@$element.position().top)
    else
      parseInt(@$element.offset().top)


  action:() =>
    if @$window.scrollTop() < @getOffset()
      @unsetClass()
    else
      @setClass()


