$ = require 'jquery'
module.exports = class FixedSubNavbar

  constructor:($element, classData, navbar)->
    @navbar = navbar
    @$element = $element
    @classData = classData
    @$window = $ window;

    @action()

    @$window.on "load resize scroll", @action

  setClass:() =>
    #unless @$element.hasClass @classData
      @$element.addClass @classData
      @$element.trigger "setClass"

  unsetClass:() =>
    #if @$element.hasClass @classData
      @$element.removeClass @classData
      @$element.trigger "unsetClass"

  getOffset:() =>
    parseInt(@$element.offset().top)


  action:() =>
    if @$window.scrollTop() <  @getOffset() - parseInt(@navbar.getNavbarHeight())
      @unsetClass()
    else
      @setClass()

