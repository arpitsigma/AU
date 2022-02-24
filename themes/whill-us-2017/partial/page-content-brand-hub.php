

<div class="c-grid" style="width: 100%;margin: auto;">
	<div class="c-grid__u c-grid__u_medium_3of12 brandhub_left hide-mobile" style="background: #efefef;">
		<div class="brand-hub-nav-container">
			<?php wp_nav_menu(array(
				'theme_location'=>'brandhub_side',
				'depth' => 2,
				'container' => 'ul',
				'menu_class'=>'list-vertical',

				)); ?>
		</div>
	</div>
	<div class="c-grid__u c-grid__u_medium_9of12 brandhub_right">
		<div class="c-container brand-hub-container">
			<?php the_content();?>
		</div>
	</div>
</div>
