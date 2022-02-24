<?php
/**
 * Template Name: Where to Buy Template
 *
 */
get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article class="wht-bg">
			<div
				<?php if(has_post_thumbnail()):?>
			    class="p-band p-band_primary p-jumbotron" style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');"
			  <?php else:?>
					class="p-band p-band_primary wht-bg p-band_header-default"
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
						<hr class="hr-custom" />
					</header>
				</div>
			</div>

			<?php the_content();?>
			<?php get_template_part( 'partial/page-content', 'requesttestdrive' ); ?>
		</article>

	<?php endif; ?>

</main>
<div class="fixed-form-drawer">
	<div>
		<div class="fixed-form-title">
			<span>We're here to help!</span>
			<svg class="fixed-form-ic" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 800 800" enable-background="new 0 0 800 800" xml:space="preserve">
				<g>
					<g>
						<path fill="#0075B8" stroke="#0075B8" d="M775,25H25C11.192,25,0,36.192,0,50v550c0,13.808,11.192,25,25,25h374v125
							c0,13.808,11.192,25,25,25c6.558-0.028,12.844-2.631,17.5-7.25L584.25,625H775c13.808,0,25-11.192,25-25V50
							C800,36.192,788.808,25,775,25z M750,575H574c-6.682,0.028-13.073,2.729-17.75,7.5L449,689.75V600c0-13.808-11.192-25-25-25H50V75
							h700V575z"></path>
					</g>
				</g>
			</svg>
			<div class="mini-or-close">
				<div class="mini-btn"><span></span></div>
				<div class="x-btn"><span class=""></span></div>
			</div>
		</div>
		<p class="fixed-form-desc">Let us help you find the right dealer to buy a WHILL personal electric vehicle.</p>
		<!--[if lte IE 8]>
		<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
		<![endif]-->
		<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
		<script>
		  hbspt.forms.create({
			portalId: "6576727",
			formId: "872d2f6a-3173-428a-a70d-93b5c6bd0268"
		});
		</script>
		<div class="fixed-form-logo"><img src='<?php echo get_template_directory_uri(); ?>/assets/dist/images/logo.svg' /></div>
	</div>
</div>
<?php get_footer(); ?>
