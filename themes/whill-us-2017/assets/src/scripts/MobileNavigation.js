import $ from 'jquery';

export default class MobileNavigation {

  static init() {
    
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) { 
    
      // Touch events are supported
      
      $(document)
        .on('touchstart', '.menu-item-has-children', function(e) {
          if (e.target.tagName == 'LI') {
            $(this).toggleClass('active');
          }
        });
        
    } else {
      
      $(document)
        .on('click', '.menu-item-has-children', function(e) {
          if (e.target.tagName == 'LI') {
            $(this).toggleClass('active');
          }
        });
        
    }
    
    $(window).resize(function() {
      $('.menu-item-has-children').removeClass('active');
    });
  }

}