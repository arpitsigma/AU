
_ = require('underscore')
$ = require('jquery')
require('jquery-bridget')
$.bridget( 'packery', require('packery') )




module.exports = (option) ->


  page = 1

  isLoading = false

  $masonry = $('[data-masonry]').packery({
    columnWidth:      '[data-masonry-sizer]'
    itemSelector:     '[data-masonry-item]'
    percentPosition:  true,
    transitionDuration: 0
  })

  isContentsOverScreen = ->
    $container = $('[data-masonry]')
    $container.height() + $container.offset().top < $(window).height() + $(window).scrollTop()

  triggerScrollToBottom = ->
    if isContentsOverScreen()
      $(window).trigger 'scrollToBottom'



  append = ->

    unless isLoading
      if page < $masonry.data('masonry-max-page')

        nextPage = page + 1;
        isLoading = true

        $masonry.packery 'once', 'layoutComplete', () ->
          isLoading = false
          page++

        $.ajax(
          url: '/experiences/page/' + nextPage
        )
        .done( ( data ) ->
          html =  '<div>' + data + '</div>'
          $items = $(html).find('[data-masonry-item]')
          $masonry.append( $items )
          $masonry.packery( 'appended', $items )
        )

  #append()

  $masonry.on layoutComplete: ->
    console.log( 'Packery layout completed on 1' )
    $('.p-voices__item').css('opacity', '1');
    console.log( 'Packery layout completed on 2' )
  
  ###
  $grid.on( 'layoutComplete',
    function( event, laidOutItems ) {
      console.log( 'Packery layout completed on ' +
        laidOutItems.length + ' items' );
    }
  );
  ###
  
  $(document).on "click", ".js-select-category", ->
    $(this).parent().siblings().find('a').removeClass('selected')
    $(this).toggleClass('selected')
    if $(this).hasClass('selected')
        $('.p-voices__item').hide()
        masonryItemSelector = '.'.concat $(this).data('tile-target')
        $(masonryItemSelector).show();
        $masonry = $('[data-masonry]').packery({
            columnWidth:      '[data-masonry-sizer]'
            itemSelector:     masonryItemSelector
            percentPosition:  true,
            transitionDuration: 0
        })
    else
        $('.p-voices__item').show()
        $masonry = $('[data-masonry]').packery({
            columnWidth:      '[data-masonry-sizer]'
            itemSelector:     '[data-masonry-item]'
            percentPosition:  true,
            transitionDuration: 0
        })

  $appendButton = $('[data-tile-append]')

  if $appendButton
    $appendButton.on 'click', (event) =>
      event.preventDefault()
      _.throttle(append, 0)

  if $masonry.length > 0
    $(window).on 'load', () ->
      $masonry.packery()

    $(window).on 'scroll', _.throttle( triggerScrollToBottom , 0 )
    $(window).on 'scrollToBottom', append
