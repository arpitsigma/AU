import $ from 'jquery';

export default class SubscriptionPopup {

  static init() {
    
    var targetHeight = $(window).height(),
        subPop = $('.subscription-popup'),
        showSubscriptionPopup = false;
    
    if (typeof(Storage) !== 'undefined') {
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
    
    $(window).scroll(function() {
      var scrollPos = $(document).scrollTop();
      if (scrollPos > targetHeight && showSubscriptionPopup) {
        subPop.addClass('showed-popup');
      } else {
        subPop.removeClass('showed-popup');
      }
    });
    
    $(document)
      .on('click', '.subscription-popup .close-popup', function() {
        subPop.hide();
        sessionStorage.subscriptionClosed = 'yes';
      })
      .on('click', '.pardot-forms-widget', function() {
        //console.log('click');
      })
      .on('click', '.js-show-teaser-popup', function(e) {
        e.preventDefault();
        ShowTeaserBG(function() {
            setTimeout(function() {
                ShowTeaserPopup();
            }, 100);
        });
      })
      .on('click', '.teaser-popup-wrapper .close-popup', function(e) {
        $('.teaser-popup-wrapper').removeClass('showed-popup').addClass('closed-popup');
      });
    
    function ShowTeaserBG(callback) {
        $('.teaser-popup-wrapper').toggleClass('closed-popup');
        if(typeof callback == "function"){
            callback();
        }
    }
    
    function ShowTeaserPopup() {
        $('.teaser-popup-wrapper').toggleClass('showed-popup');
    }
  }

}