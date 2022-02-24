<?php
/**
 * Template Name: Brand Hub
 *
 */
?>
<?php if (!is_user_logged_in()) {
		printf( '<a href="%s">%s</a>',
        wp_login_url( get_permalink() ),
        __( 'You need to login to view this page!' )
    );
header('Refresh:3, url='.wp_login_url(get_permalink()) );
exit;
?>
<?php }else{ ?>
<?php get_header(); ?>
<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article>
			<div class="p-band p-band_primary"
				<?php if(has_post_thumbnail()):?>
			     style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');"
				<?php endif;?>
				>
				<div>
					<header class="p-page-header p-page-header_with-content p-page-header_<?php echo get_the_name(); ?> <?php if(!has_post_thumbnail()):?>p-page-header_no-image<?php endif;?>" style="max-width: unset;">
						<div style="position: absolute;top: 40%;left: 5%;">
							<div class="p-page-header__text">
								<h1 class="p-page-header__title">WHILL Brand Hub</h1>
								<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
									<div class="p-page-header__description">
										<?php echo wpautop( $description ); ?>
									</div>
								<?php endif ?>

							</div>
						</div>

						<div class="brand-hub-main-menu hide-mobile">
							<div class="btt"><a class="btt" href="#">Back to top</a></div>
							<?php wp_nav_menu(array(
						    'theme_location'=>'brandhub_top',
						    'depth' => 1,
						    'container' => 'ul',
						    'menu_class'=>'list-horizontal brand-hub',
						    'link_after' => '</span>'

						    )); ?>
						</div>

					</header>
				</div>
			</div>

			<?php get_template_part( 'partial/page-content-brand-hub', get_the_name() ); ?>

		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
<?php } ?>
