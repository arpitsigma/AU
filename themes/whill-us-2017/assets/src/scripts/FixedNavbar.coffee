$ = require 'jquery'
module.exports = class FixedNavbar
  constructor:( navbarSelector, bodySelector ) ->
    @$navbar = $ navbarSelector
    @$body = $ bodySelector
    @on()
    @init()


  getNavbarHeight: =>
    @$navbar.height()


  getNavbarOffset: =>
    @$navbar.position().top


#  shiftWindow: =>
#    setTimeout( () =>
#      window.scrollBy 0, -1 * @getNavbarHeight() - @getNavbarOffset()
#    , 0 )


  init: =>
    @$navbar.addClass('is-fixed')
    @$body.css paddingTop: @getNavbarHeight()


  on: ->
    $window = $(window)
    $window.resize @init

    $window.on "hashchange", @shiftWindow

    $("body").on "click", "a", (event) =>

#
#      if $(event.currentTarget).attr("href").match(/^#.+/)
#        @shiftWindow()
#      #todo
#      if location.hash == $(event.currentTarget).attr("href")
#        @shiftWindow()
#
#    $window.on 'load', =>
#      if location.hash
#        @shiftWindow()
