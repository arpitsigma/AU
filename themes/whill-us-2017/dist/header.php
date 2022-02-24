<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0,  minimum-scale=1.0, user-scalable=yes">
	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico"
	      type="image/vnd.microsoft.icon"/>
	<?php if(is_front_page()):?>
		<link rel="alternate" hreflang="ja" href="http://whill.jp/" />
	<?php endif;?>
	<?php wp_head(); ?>
  <style type="text/css">
    @font-face {
        font-family: "FF-DIN-Regular";
        src: url(<?php echo get_template_directory_uri(); ?>/assets/fonts/DINOffc.ttf) format("truetype");
    }
    @font-face {
        font-family: "FF-DIN-Light";
        src: url(<?php echo get_template_directory_uri(); ?>/assets/fonts/DINOffc-Light.ttf) format("truetype");
    }
    body { 
        font-family: "FF-DIN-Regular", Verdana, Tahoma;
    }
  </style>
</head>
<body <?php body_class(); ?>>
<div class="l-body" data-fixed-body>
	<header class="p-navbar" data-fixed-navbar data-scroll-addclass="p-navbar_small">
		<div class="c-container c-container_full">
			<div class="p-navbar__container">
				<h1 class="p-navbar__brand"><a href="/"><img
							src="<?php echo get_template_directory_uri(); ?>/assets/dist/images/logo.svg" alt="WHILL"/></a>
				</h1>
				<button class="p-navbar__toggle c-menu-btn" data-slidemenu-target=".slidemenu-target" title="menu">
					<span></span></button>
				<div class="p-navbar__spacer"></div>

				<nav class="c-slidemenu p-navbar__slidemenu slidemenu-target" role="navigation">
					<div class="p-navigation">

						<ul class="p-navigation__items">

							<?php wp_nav_menu( [
								'theme_location' => 'primary',
								'menu_class' => 'p-navigation',
								'li_class' => 'p-navigation__item',
								'link_before'   => '<span class="p-navigation__text">',
								'link_after'    => '</span>',
								'items_wrap'=> '%3$s',
								'container' => false
							] );?>
              
						</ul>

					</div>
				</nav>

			</div>


		</div>
<!--		<div class="p-navbar__sub-navigation">-->
<!--			<div class="p-band p-band_tint">-->
<!--				<div class="c-container" data-sub-navigation-fixed>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
	</header>
