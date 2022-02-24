<?php get_header(); ?>

<main role="main">

    <div class="p-main-visual" style="background: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>') center top no-repeat; background-size: cover;">
        <?php /* <div class="p-main-visual__overlay p-page-header__title"><?php the_title(); ?></div> */ ?>
        <div class="p-main-visual__video">
            <div class="player" data-property="{videoURL:'<?php the_field('youtube_video_id_for_background' , 'option'); ?>', containment:'.p-main-visual__video', autoPlay:true, loop:true, mute:true, startAt:0, opacity:1, showControls: false, showYTLogo: false, gaTrack: false, quality: 'highres'}"></div>
        </div>
        <div class="p-main-visual__overlay p-page-header__title title-over-video"><span class="label-new">New</span> <span class="label-text">WHILL Model Ci</span></div>
    </div>
  
    <?php
    /*
	<div class="swiper-container p-jumbotron">
		<div class="swiper-wrapper p-jumbotron__items">
			<?php
			$jumbotron = new WP_Query( [ 'post_type' => 'jumbotron', 'order' => 'ASC', 'orderby' => 'menu_order' ] );
			while( $jumbotron->have_posts() ): $jumbotron->the_post();
			?>
				<div class="swiper-slide p-jumbotron__item swiper-no-swiping" style="color: <?php echo esc_attr( get_post_meta( get_the_ID(), 'text_color', true ) );?> ;background-image: url(<?php echo get_the_post_thumbnail_url( get_post(), 'full' );?>)" data-rel="<?php echo get_the_post_thumbnail_url( get_post(), 'full' );?>">
					<div class="p-jumbotron__container">
						<div class="c-container">
							<div class="c-grid">
                                <div class="c-grid__u 
                                    <?php if( get_field('text_position') == 'Left Side' ): ?> c-grid__u_medium_9of12 c-grid__u_medium_offset_1of12<?php endif; ?><?php if( get_field('text_position') == 'Right Side' ): ?> c-grid__u_small_6of12 c-grid__u_small_offset_6of12 c-grid__u_medium_6of12 c-grid__u_medium_offset_6of12<?php endif; ?><?php if( get_field('text_position') == 'Almost Right Side' ): ?> c-grid__u_small_6of12 c-grid__u_small_offset_6of12 c-grid__u_medium_7of12 c-grid__u_medium_offset_5of12<?php endif; ?>"><?php if( $large_text = get_post_meta( get_the_ID(), 'large_text', true ) ):?>
                                      <p class="p-jumbotron__copy">
                                        <?php echo nl2br( $large_text );?>
                                      </p>
                                    <?php endif;?>
                                    <?php if( $small_text = get_post_meta( get_the_ID(), 'small_text', true ) ):?>
                                      <p class="p-jumbotron__small-text">
                                        <?php echo nl2br( $small_text );?>
                                      </p>
                                    <?php endif;?>
                                    <?php if( $link_title = get_post_meta( get_the_ID(), 'link_title', true ) ):?>
                                      <p>
                                        <a href="<?php echo esc_url( get_post_meta( get_the_ID(), 'link', true ) );?>" target="_blank" class="c-btn c-btn_primary js-show-teaser-popup">
                                          <?php echo esc_html( $link_title );?>
                                        </a>
                                      </p>
                                    <?php endif;?>
								</div>
							</div>
						</div>
					</div>
                    <?php if( $signature = get_post_meta( get_the_ID(), 'signature', true ) ):?>
                        <p class="p-jumbotron__signature">
                            <?php echo nl2br( $signature );?>
                        </p>
                    <?php endif;?>
				</div>
			<?php
			endwhile;?>
		</div>
        <!--<div class="p-jumbotron__pagination"></div>-->
	</div>
    */
    ?>
  
  <?php if(have_posts()):?>
    <?php the_post();?>
    <div class="p-page-content p-page-content_double-tight">
      <div class="c-container" style="display: flex; flex-direction: column;">

        <?php the_content();?>
        
        <div class="c-full-row" style="order: 0;">
            <div class="p-band p-band_highlight">
                <div class="p-page-content p-page-content_width-1200">
                    <h2 style="text-align: center; margin-bottom: 0;">Everyone’s Story is Unique</h2>
                    <p style="text-align: center; margin-top: 0; margin-bottom: 40px;">With the ideal balance of comfort, safety—and of course, fun— WHILL Personal EVs are <br>
                    for people who crave versatility and live life to the fullest.</p>
                    <!-- Swiper -->
                      <div class="swiper-container gallery-top">
                        <div class="swiper-wrapper">
                            <?php
                            $argsSE = array( 'post_type' => 'customers_voice', 'posts_per_page' => 50 );
                            $loopSE = new WP_Query( $argsSE );
                            while ( $loopSE->have_posts() ) : $loopSE->the_post();
                                $show_or_not = get_field('show_on_homepage');
                                if ($show_or_not && in_array('yes', $show_or_not)) {
                                    echo '<div class="swiper-slide">';
                                        echo '<div class="left-part">';
                                            echo '<a href="' . get_permalink() . '" target="blank">';
                                                $imageSE = get_field('thumbnail_1x1');
                                                $sizeSE = 'full'; // (thumbnail, medium, large, full or custom size)
                                                if( $imageSE ) {
                                                    echo wp_get_attachment_image( post_custom( 'thumbnail_1x1' ), $sizeSE );
                                                }
                                            echo '</a>';
                                        echo '</div>';
                                        echo '<div class="right-part">';
                                            echo '<div>';
                                            /*echo the_field('show_on_homepage');*/
                                            echo '</div><div>';
                                            /*echo the_field('excerpt_of_experience');*/
                                            echo get_post_meta( get_the_ID(), 'excerpt_of_experience', true );
                                            echo '</div><div>';
                                            echo get_post_meta( get_the_ID(), 'quote_of_experience', true );
                                            echo '</div><div>';
                                            echo '<a class="c-btn c-btn_primary" href="' . get_permalink() . '" target="blank">Read Story</a>';
                                            echo '</div>';
                                        echo '</div>';
                                    echo '</div>';
                                }
                            endwhile;
                            ?>
                        </div>
                        <!-- Add Arrows -->
                        <div class="swiper-button-next swiper-button-white"></div>
                        <div class="swiper-button-prev swiper-button-white"></div>
                      </div>
                      <div class="swiper-container gallery-thumbs">
                        <div class="swiper-wrapper">
                            <?php
                            $argsSE = array( 'post_type' => 'customers_voice', 'posts_per_page' => 50 );
                            $loopSE = new WP_Query( $argsSE );
                            while ( $loopSE->have_posts() ) : $loopSE->the_post();
                                $show_or_not = get_field('show_on_homepage');
                                if ($show_or_not && in_array('yes', $show_or_not)) {
                                    /*echo '<div class="swiper-slide" style="background-image:url(' . get_the_post_thumbnail_url() . ')">';
                                    echo '</div>';*/
                                    echo '<div class="swiper-slide">';
                                        $imageSE = get_field('thumbnail_1x1');
                                        $sizeSE = 'full'; // (thumbnail, medium, large, full or custom size)
                                        if( $imageSE ) {
                                            echo wp_get_attachment_image( post_custom( 'thumbnail_1x1' ), $sizeSE );
                                        }
                                    echo '</div>';
                                }
                            endwhile;
                            ?>
                        </div>
                      </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  <?php endif;?>

    <div class="c-full-row">
        <div class="p-band p-band_highlight">
            <div class="p-page-content">
            
                <div class="c-container">
                    <div class="c-row">
                        <h1 class="p-section-title">Awards &amp; Recognition</h1>
                        <div class="c-grid u-text-center">
                            <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of4">
                                <img alt="CES Innovation Awards 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/CES-2018-Best-of-Innovation-Award_250x150.png" />
                            </div>
                            <?php /*
                            <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of4">
                                <img alt="" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-engadget_250x150_transp.png" />
                            </div>
                            */ ?>
                            <?php /*
                            <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of4">
                                <img alt="" src="<?php echo get_template_directory_uri();?>/assets/dist/images/ces-2018-finalist_250x150.png" />
                            </div>
                            */ ?>
                            <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of4">
                                <img alt="IF Design Award 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/if-design-award-2018.png" />
                            </div>
                            <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of4">
                                <img alt="Good Design Award 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-gda_250x150.png" />
                            </div>
                            <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of4">
                                <img alt="International Design Excellence Awards 2014" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-bronze14_250x150_transp.png" />
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
  
  <div class="c-full-row">
    <div class="p-band p-band_light">
      <div class="p-page-content">
        <div class="c-container">
          <section>
            <h1 class="p-section-title" id="news"><a href="<?php echo get_permalink( get_option('page_for_posts') );?>">Latest News</a></h1>

            <?php $news = new WP_Query([ 'posts_per_page' => 1]);?>

            <?php if ( $news->have_posts() ): ?>
              <?php while ( $news->have_posts() ): ?>
                <?php $news->the_post(); ?>
                <article class="p-large-news">
                  <div class="p-large-news__thumbnail">
                    <?php the_post_thumbnail('medium_large');?>
                  </div>
                  <div class="p-large-news__body">
                    <h1 class="p-large-news__title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h1>

                    <?php do_excerpt(get_the_excerpt(), 70); ?>
                  </div>
                </article>
              <?php endwhile; ?>
            <?php endif; ?>
            <?php wp_reset_postdata(); wp_reset_query();?>

            <div class="c-grid_row c-grid__u c-grid__u_large_1of3 c-grid__u_large_offset_1of3">
              <a href="<?php echo get_permalink( get_option('page_for_posts') );?>" class="c-btn c-btn_block c-btn_primary p-list-round-button">More News</a>
            </div>

          </section>
        </div>
      </div>
		</div>
	</div>


</main>

<?php get_footer(); ?>
