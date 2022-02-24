<?php
/*
 * Template Name: About Company
 */
get_header(); ?>

	<main role="main" class="about-company">

		<article>
			<div class="c-band c-band_highlight p-page-header_about-us">
				<div class="l-container l-container_full">
					<header class="p-page-header">
						<div class="p-page-header__container">
							<div class="p-page-header__text">
								<h1 class="p-page-header__title title_about-us">About Us</h1>
							</div>
						</div>

					</header>
				</div>
			</div>

			<?php get_template_part('about-us/page-en'); ?>

		</article>

	</main>

<?php get_footer(); ?>