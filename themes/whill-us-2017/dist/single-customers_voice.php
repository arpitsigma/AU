<?php get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

    <!--
		<div class="p-band p-band_primary" style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/dist/imagesexperiences.jpg');">
			<div class="c-container c-container_full">
				<header class="p-page-header p-page-header_customers-voice">
					<div class="p-page-header__container">
						<div class="p-page-header__text">
							<h1 class="p-page-header__title">Experiences</h1>
							<div class="p-page-header__description">
								<?php the_field('experiences_description', 'option'); ?>
							</div>
						</div>
					</div>

				</header>
			</div>
		</div>

		<div class="p-page-sub-navigation"  data-sub-navigation-container>
			<div class="p-band p-band_tint">
				<div class="c-container">
					<ul class="p-sub-navigation p-sub-navigation_single"  data-sub-navigation>
						<li class="p-sub-navigation__item"><a href="/experiences"><i class="fa fa-angle-left fa-lg fa-fw"></i>Back to Index</a></li>

					</ul>
				</div>
			</div>
		</div>
    -->

		<article data-voice-content>
			<header class="p-voice-content-header">

				<div class="c-container">
					<h3 class="p-voice-content-header__title"><?= esc_html( get_post_meta( get_the_ID(), 'catchphrase', true ) ); ?></h3>
				</div>
        
        <!--
        <div class="c-container c-container_full">
          <a class="p-main-visual p-main-visual__testimonial" style="background-image: url(<?= '//img.youtube.com/vi/', esc_html( get_post_meta( get_the_ID(), 'youtube_video_id', true ) ), '/maxresdefault.jpg' ?>);" href="<?= '//www.youtube.com/watch?v=', esc_html( get_post_meta( get_the_ID(), 'youtube_video_id', true ) ); ?>">
            <span>Play Testimonial</span>
          </a>
        </div>
        -->
        
        <div class="c-container c-container_full">
        
          <?php if ( esc_html( get_post_meta( get_the_ID(), 'youtube_video_id', true ) ) ): ?>
        
            <a class="p-main-visual p-main-visual__testimonial" style="background-image: url(<?php the_post_thumbnail_url('origin-size'); ?> );" href="<?= '//www.youtube.com/watch?v=', esc_html( get_post_meta( get_the_ID(), 'youtube_video_id', true ) ); ?>">
              <span>Play Testimonial</span>
            </a>
          
          <?php endif; ?>
          
          <?php if ( !esc_html( get_post_meta( get_the_ID(), 'youtube_video_id', true ) ) ): ?>
          
            <span class="p-main-visual p-main-visual__testimonial" style="background-image: url(<?php the_post_thumbnail_url('origin-size'); ?> );"></span>
          
          <?php endif; ?>
          
          
        </div>
        
			</header>

      <!--
			<div class="c-container c-container_full">
				<?php the_post_thumbnail( 'customer_voice_main' ); ?>
			</div>
      -->
      
			<div class="p-page-content">

				<div class="c-container">
					<?php the_content();?>
				</div>
			</div>
      
      <div class="c-full-row">
        <div class="p-band p-band_highlight">
          <div class="p-page-content">
          
            <div class="c-container" style="text-align: center;">
            
              <h3><?= (the_field('header', 'option')); ?></h3>
              <p><?= (the_field('sub-text', 'option')); ?></p>
              
              <?php if (get_field('button_link', 'option') && get_field('button_text', 'option')): ?>
                <div class="c-grid_row c-grid__u c-grid__u_large_1of3 c-grid__u_large_offset_1of3">
                  <a href="<?= (the_field('button_link', 'option')) ?>" class="c-btn c-btn_block c-btn_primary p-list-round-button"><?= (the_field('button_text', 'option')); ?></a>
                </div>
              <?php endif; ?>
              
            </div>
            
            <div class="c-container">
              <p style="font-size: small;"><strong><?= (the_field('note', 'option')); ?></strong></p>
            </div>
            
          </div>
        </div>
      </div>
      
      <div class="p-page-content">
        <div class="c-container">
          <a href="/experiences" class="c-btn c-btn_secondary"><i class="fa fa-angle-left fa-lg fa-fw"></i>Back</a>
        </div>
      </div>
      
		</article>


	<?php endif; ?>

</main>

<?php get_footer(); ?>
