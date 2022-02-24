<?php
/**
 * Template Name: Test Drive page
 *
 */
get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article>
			<div class="p-band p-band_primary row-banner-overlay bg-maas-business-system mb0"
				<?php if(has_post_thumbnail()):?>
			     style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');background-size: contain; background-repeat: no-repeat; background-color: #fff;justify-content: left;"
				<?php endif;?>
				>
				<div class="inner-content">
						<a class="c-btn c-btn_primary" href="#finddealer" rel="noopener noreferrer" style="">Find a Dealer Now!</a>
				</div>
				<!-- <div class="c-container c-container_full">
					<header class="p-page-header p-page-header_with-content p-page-header_<?php echo get_the_name(); ?> <?php if(!has_post_thumbnail()):?>p-page-header_no-image<?php endif;?>">
						<div class="p-page-header__container">
							<div class="p-page-header__text">
								<h1 class="p-page-header__title"><?php the_title(); ?></h1>
								<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
									<div class="p-page-header__description">
										<?php echo wpautop( $description ); ?>
									</div>
								<?php endif ?>

							</div>
						</div>

					</header>
				</div> -->
			</div>

			<?php get_template_part( 'partial/page-content', 'test-drive' ); ?>

		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
