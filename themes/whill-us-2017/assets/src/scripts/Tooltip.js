import $ from 'jquery';

export default class Tooltip {

  static init() {
    $('#supportTooltip').toggle();
    $(document)
      .on('click', '#showSupportTooltip, #supportTooltip .close', function() {
        $('#supportTooltip').toggle();
      });
  }

}