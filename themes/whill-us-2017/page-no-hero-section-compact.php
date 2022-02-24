<?php
/**
 * Template Name: No Hero Section + Compact
 *
 */
get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article>
			<div class="p-band p-band_primary"
				<?php if(has_post_thumbnail()):?>
			     style="background-image: url('<?php echo get_post_thumbnail_src( 'page_header' ); ?>');"
				<?php endif;?>
				>
			</div>

			<?php get_template_part( 'partial/page-content', 'tight' ); ?>

		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
