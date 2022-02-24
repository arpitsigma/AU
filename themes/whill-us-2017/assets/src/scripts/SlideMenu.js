import $ from 'jquery';

export default class SlideMenu {

	constructor($el) {
		this.$el = $el;
		this.state = false;
		this.$target = $(this.$el.data("slidemenu-target"));
		this.on();
	}

	on() {
		this.$el.on('click', this.toggle.bind(this));
	}

	toggle(event) {
		event.preventDefault();
		this.state = !this.state;
		if (this.state) {
			this.open();
		} else {
			this.close();
		}
	}

	open() {
		var height;
		this.$el.addClass("is-open");
		this.$target.addClass("is-open");
		this.$target.height("");
		height = this.$target.height();
		this.$target.height(0);
		this.$target.height(height);
    if (this.$el.hasClass('p-navbar__toggle')) {
      $('body').height(height).css('overflow', 'hidden');
    }
	}

	close() {
		this.$target.height(this.$target.height());
		this.$target.height(0);
		this.$el.removeClass("is-open");
		this.$target.removeClass("is-open");
    if (this.$el.hasClass('p-navbar__toggle')) {
      $('body').height('auto').css('overflow', 'visible');
    }
	}
  
	static init() {
		$("[data-slidemenu-target]").each(function() {
			return new SlideMenu($(this));
		});
	}

}