<?php
/**
 * Template Name: Event Page
 *
 */
get_header();?>

	<main role="main">

		<?php if(have_posts()):?>
				<?php the_post();?>

					<article>
						<div class="p-band  p-band_primary" style="background-image: url('<?php echo get_template_directory_uri()?>/assets/dist/images/events-jumbotron.jpg');">
							<div class="c-container c-container_full">
							<header class="p-page-header">
								<div class="p-page-header__container">
									<div class="p-page-header__text">
										<h2 class="p-page-header__title">Events</h2>
										<div class="p-page-header__description">
											<?php the_field('events_description' , 'option'); ?>
										</div>
									</div>
								</div>

							</header>
							</div>
						</div>

						<?php get_template_part( 'partial/page-content', get_the_name() ); ?>

					</article>

		<?php endif;?>

	</main>

<?php get_footer();?>
