<?php
/**
 * Template Name: About Page v2
 *
 */
get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article>
			<div class="p-band p-band_primary"
				<?php if(has_post_thumbnail()):?>
			     style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');"
				<?php endif;?>
				>
				<div class="c-container c-container_full">
					<header class="p-page-header p-page-header_with-content p-page-header_<?php echo get_the_name(); ?> <?php if(!has_post_thumbnail()):?>p-page-header_no-image<?php endif;?>">
						<p class="p-page-header__title" style="position: absolute;left: 10%;top: 30%;color: white;">About Us</p>

					</header>
				</div>
			</div>

			<?php get_template_part( 'partial/page-content', 'about-company-v2' ); ?>

		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
