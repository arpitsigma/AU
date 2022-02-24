<?php
/**
 * Template Name: Resellers Page
 *
 */
get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article>

			<?php get_template_part( 'partial/page-content', 'reseller' ); ?>

		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
