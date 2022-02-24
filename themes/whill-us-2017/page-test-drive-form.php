<?php
/**
 * Template Name: Test Drive Form
 *
 */
get_header(); $hide = true; ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article class="wht-bg test-drive-form-page">
			<div
				<?php if(has_post_thumbnail()):?>
			    class="p-band p-band_primary" style="background-image: url('<?php echo get_post_thumbnail_src( 'full' ); ?>');"
			  <?php else:?>
					class="p-band p-band_primary"
				<?php endif;?>
				>
				<div class="c-container c-container_full">
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
					<?php the_content();?>
				</div>
				<?php if($hide == false): ?>
				<div class="p-jumbotron__container button-bottom page">
				  <div class="c-container">
					<div class="c-grid">
					  <div class="c-grid__u u-text-center">
						<p><a href="#" class="go-below">
						  <img src="/ca/wp-content/themes/whill-us-2017/assets/dist/images/arrow-down.png" alt="">
						</a></p>
					  </div>
					</div>
				  </div>
				</div>
				<?php endif; ?>
			</div>
			<?php if($hide == false): ?>
			<div class="bl-bg bottom-section-padding test-drive-bottom">
			<div>
			<h2 class="text-center">Want to Meet a Real WHILL User?</h2>
			<p style="margin: -15px auto 10px auto;">Hear firsthand how WHILL products have positively impacted the lives of our customers. Schedule a test drive with a user near you today!</p>
			<div class="inline-btns"><a class="c-btn c-btn_whtblue" href="https://wedrive.whill.us/en/" target="_blank">Visit WeDrive</a><a class="c-btn c-btn_whtblue" href="/ca/contact">Contact Us</a></div>

			</div>
			</div>
			<?php endif; ?>
		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
