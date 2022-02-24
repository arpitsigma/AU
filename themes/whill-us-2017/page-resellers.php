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
			<div class="p-band p-band_primary row-banner-overlay bg-maas-business-system mb0"
				<?php if(has_post_thumbnail()):?>
			     style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');background-size: contain; background-repeat: no-repeat; background-color: #fff;justify-content: left;"
				<?php endif;?>
				>
				<div class="inner-content" >
						<a class="c-btn c-btn_primary" href="#finddealer" rel="noopener noreferrer" style="">Find a Dealer Now!</a>
				</div>
				<!-- <div class="c-container c-container_full">
					<header class="p-page-header p-page-header_with-content p-page-header_<?php //echo get_the_name(); ?> <?php //if(!has_post_thumbnail()):?>p-page-header_no-image<?php //endif;?>">
						<div class="p-page-header__container">

						</div>

					</header>
				</div> -->
			</div>
			<?php get_template_part( 'partial/page-content', 'reseller' ); ?>
			<div class="resellers-wrapper">
			<div class="p-page-content" style="margin-top: 0;">
			<h2>Also Available at These Online Retailers</h2>
			<div class="c-grid c-grid_center">
			<div class="c-grid__u c-grid__u_medium_1of4 c-grid__u_small_1of2 reseller-item">
			<div class="reseller-logo-wrapper"><a class="reseller-link" href="https://accessnsm.com/whill-model-ci-powerchair/" target="_blank" rel="noopener noreferrer"><img class="reseller-logo aligncenter size-full wp-image-11404" src="https://corporate-stg-cf.whill.inc/ca/wp-content/uploads/2018/03/logo-nsm-2018-transp.png" sizes="(max-width: 500px) 100vw, 500px" srcset="https://corporate-stg-cf.whill.inc/ca/wp-content/uploads/2018/03/logo-nsm-2018-transp.png 500w, https://corporate-stg-cf.whill.inc/ca/wp-content/uploads/2018/03/logo-nsm-2018-transp-150x56.png 150w, https://corporate-stg-cf.whill.inc/ca/wp-content/uploads/2018/03/logo-nsm-2018-transp-300x111.png 300w" alt="" width="500" height="185"></a></div>
			</div>
			<div class="c-grid__u c-grid__u_medium_1of4 c-grid__u_small_1of2 reseller-item">
			<div class="reseller-logo-wrapper"><a class="reseller-link" href="https://shop.scootaround.com/model-ci" target="_blank" rel="noopener noreferrer"><img class="reseller-logo aligncenter" src="/ca/wp-content/uploads/2017/08/Scootaround_logo.png" alt="" width="271" height="52"></a></div>
			</div>
			<div class="c-grid__u c-grid__u_medium_1of4 c-grid__u_small_1of2 reseller-item">
			<div class="reseller-logo-wrapper"><a class="reseller-link" href="https://www.spinlife.com/search.cfm?keyword=whill" target="_blank" rel="noopener noreferrer"><img class="reseller-logo aligncenter size-full wp-image-11404" src="https://corporate-stg-cf.whill.inc/ca/wp-content/uploads/2017/03/SL_newLogo.png" alt="" width="550" height="185"></a></div>
			</div>
			<div class="c-grid__u c-grid__u_medium_1of4 c-grid__u_small_1of2 reseller-item">
			<div class="reseller-logo-wrapper"><a class="reseller-link" href="https://www.topmobility.com/whill-model-ci.htm" target="_blank" rel="noopener noreferrer"><img class="reseller-logo aligncenter" src="/ca/wp-content/uploads/2019/07/Top-Mobility-Logo-WEB-blue-background.png" alt="" width="643" height="253"></a></div>
			</div>
			</div>
			</div>
			</div>
		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
