<?php
/**
 * Template Name: Features Model A Page
 *
 */
get_header();?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

        <article>
					<div class="u-row-viewport-large-banner movie-center product-video" data-w="1920" data-h="1080">
						<?php $vidOff = true; if($vidOff == false): ?>
					    <video class="cover tgt-movie" muted autoplay playsinline loop poster="<?php echo get_post_thumbnail_src( 'origin_size' ); ?>">
							<?php if(!$isAndroid){?>
					            <source src="<?php echo get_template_directory_uri(); ?>/movies/maas-short/Whill-Model-Ci2-Copy.mov" type="application/x-mpegURL">
							<?php }?>
					        <source src="<?php echo get_template_directory_uri(); ?>/movies/maas-short/Whill-Model-Ci2-Copy.mov" type="video/mp4" />
					        動画を再生するにはvideoタグをサポートしたブラウザが必要です。
					    </video>
						<?php else: ?>
							<iframe id="product-video" src="https://www.youtube.com/embed/h3zzRqA3ouA?enablejsapi=1&mute=1&autoplay=1&loop=1&controls=0&playlist=h3zzRqA3ouA&disablekb=1&showinfo=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
						<?php endif; ?>
							<div class="video-overlay intro-lg">
								<div class="overlay-content">
									<h1><?php wp_title("", true); ?></h1>
									<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
										<p class="no-margin"><?php echo $description; ?></p>
									<?php endif ?>
								</div>
							</div>
							<div class="btn-movie-play-wrapper">
						    <a href="https://www.youtube.com/watch?v=h3zzRqA3ouA" class="btn-movie-play vp-s" id="btn-maas-vision" data-yt="h3zzRqA3ouA"><div class="inner"></div></a>
							</div>
					</div>
					<!-- <div class="vid-wrapper">
						<img id="video-cover" src="<?php echo get_post_thumbnail_src( 'origin_size' ); ?>" alt="<?php the_title(); ?>">
						<iframe id="player" class="yt-vid-banner" width="100%" height="315" src="https://www.youtube.com/embed/g_RDX_sNw30" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						<h1 class="p-page-header__title"><?php wp_title("", true); ?></h1>
						<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
														<div class="p-page-header__description">
						<?php echo wpautop( $description ); ?>
														</div>
						<?php endif ?>
						<button id="play" class="play-btn">
							<svg enable-background="new 0 0 141.73 141.73" height="141.73px" id="Warstwa_1" version="1.1" viewBox="0 0 141.73 141.73" width="141.73px" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><path d="M101.628,40.092c-8.22-8.22-19.149-12.746-30.774-12.746c-11.624,0-22.553,4.526-30.772,12.746   c-16.968,16.969-16.967,44.578,0.001,61.546c8.22,8.22,19.149,12.747,30.773,12.747s22.553-4.526,30.772-12.746   s12.747-19.148,12.747-30.773S109.848,48.312,101.628,40.092z M100.214,100.225c-7.842,7.842-18.269,12.16-29.358,12.16   s-21.517-4.319-29.359-12.161c-16.188-16.188-16.188-42.529-0.001-58.718c7.842-7.842,18.269-12.16,29.358-12.16   c11.091,0,21.518,4.318,29.36,12.16c7.842,7.843,12.161,18.269,12.161,29.359S108.056,92.382,100.214,100.225z" fill="#ffffff"/><path d="M65.893,55.983c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l13.466,13.466L64.478,84.331   c-0.391,0.391-0.391,1.023,0,1.414c0.195,0.195,0.451,0.293,0.707,0.293s0.512-0.098,0.707-0.293L80.065,71.57   c0.391-0.391,0.391-1.023,0-1.414L65.893,55.983z" fill="#ffffff"/></g></svg>
						</button>
					</div> -->
            <!-- <div class="p-band p-band_primary" style="background-image: url(<?php echo get_template_directory_uri(); ?>/assets/dist/images/model-c/model-c-mv.jpg);">
                <div class="c-container c-container_full">
                    <header class="p-page-header p-page-header_with-content p-page-header_<?php echo get_the_name(); ?> <?php if(!has_post_thumbnail()):?>p-page-header_no-image<?php endif;?>">
                        <div class="p-page-header__container">
                            <div class="p-page-header__text">
                                <h1 class="p-page-header__title"><?php wp_title("", true); ?></h1>
								<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
                                    <div class="p-page-header__description">
										<?php echo wpautop( $description ); ?>
                                    </div>
								<?php endif ?>

                            </div>
                        </div>

                    </header>
                </div>
            </div> -->


			<?php //get_template_part( 'partial/page-content', 'tight' ); ?>
			<?php the_content();?>
			<!--<?php //get_template_part( 'partial/page-content', 'whilligfeed' ); ?>-->
			<?php get_template_part( 'partial/page-content', 'whillmodels' ); ?>
			<?php get_template_part( 'partial/page-content', 'readytoride' ); ?>

        </article>

	<?php endif; ?>

</main>
<script type="text/javascript">
	$('#play').on('click', function(e) {
	e.preventDefault();
	$("#player")[0].src += "?autoplay=1";
	$('#player').show();
	$('#video-cover').hide();
	$('#play').hide();
	})
</script>
<!--
<div class="cta-block">
    <span class="tooltip tooltip-left">Get in the Driver’s Seat</span>
    <a class="c-btn c-btn_primary" href="<?php echo site_url('/buy-personal-ev/'); ?>">Buy Now</a>
    <a class="c-btn c-btn_primary" href="<?php echo site_url('/test-drive-personal-ev/'); ?>">Test Drive</a>
</div> -->

<?php get_footer(); ?>