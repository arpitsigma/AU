$ = require 'jquery'
_ = require 'underscore'
module.exports = class SubNavigation

  constructor: ( selector, contentsSelector ) ->

    @$element = $ selector
    @$content = $ contentsSelector
    items = @create()

    self = @
    @$element.each () ->
      $this = $(@)
      template = _.template $('[data-sub-navigation-template]').text()

      if template
        html = _.map items, (item)-> template item
        $this.append html

  create: ->
    items = []
    @$content.find('h1, h2, h3, h4').each () ->
      $this = $ @
      id = $this.attr('id')
      id = $this.find('a').attr('id') unless id
      if id
        items.push { id: id, text: $this.text() }

    items

