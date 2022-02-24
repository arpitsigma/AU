<?php get_header(); ?>

<main role="main">

  <?php
    $home_top_section_field = get_field_object('home_top_section' , 'option');
    $home_top_section_value = $home_top_section_field['value'];
    $home_title_field = get_field_object('title_visibility' , 'option');
    $home_title_value = $home_title_field['value'];
  ?>

  <?php if ($home_top_section_value == 'video'): ?>
    <div class="p-main-visual" style="background: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>') center top no-repeat; background-size: cover;">

      <?php if($home_title_value == 'Yes'): ?>
        <div class="p-main-visual__overlay p-page-header__title"><?php the_title(); ?></div>
      <?php endif; ?>

      <div class="p-main-visual__video">
        <div class="player" data-property="{videoURL:'<?php the_field('youtube_video_id_for_background' , 'option'); ?>', containment:'.p-main-visual__video', autoPlay:true, loop:true, mute:true, startAt:0, opacity:1, showControls: false, showYTLogo: false, gaTrack: false, quality: 'highres'}"></div>
      </div>

      <a href="<?php the_field('overlay_link' , 'option'); ?>" class="p-main-visual__overlay p-page-header__title title-over-video" style="background: url('<?php the_field('overlay_image' , 'option'); ?>') center center no-repeat; background-size: cover;">
        <?php /* <span class="label-new">New</span> <span class="label-text">WHILL Model Ci</span> */ ?>
      </a>

    </div>
  <?php endif; ?>

  <?php if ($home_top_section_value == 'teaser'): ?>
    <div class="swiper-container p-jumbotron">
      <div class="swiper-wrapper p-jumbotron__items">
        <?php
          $jumbotron = new WP_Query( [ 'post_type' => 'jumbotron', 'order' => 'ASC', 'orderby' => 'menu_order' ] );
          while( $jumbotron->have_posts() ): $jumbotron->the_post();
        ?>
          <div class="swiper-slide p-jumbotron__item swiper-no-swiping jarallax" style="color: <?php echo esc_attr( get_post_meta( get_the_ID(), 'text_color', true ) );?> ;background-image: url(<?php echo get_the_post_thumbnail_url( get_post(), 'full' );?>)" data-rel="<?php echo get_the_post_thumbnail_url( get_post(), 'full' );?>">
            <div class="p-jumbotron__container button-top">
              <div class="c-container">
                <div class="c-grid">
                  <div class="c-grid__u
                    <?php if( get_field('text_position') == 'Center' ): ?> u-text-center<?php endif; ?>
                    <?php if( get_field('text_position') == 'Left Side' ): ?> c-grid__u_medium_9of12 c-grid__u_medium_offset_1of12<?php endif; ?>
                    <?php if( get_field('text_position') == 'Right Side' ): ?> c-grid__u_small_6of12 c-grid__u_small_offset_6of12 c-grid__u_medium_6of12 c-grid__u_medium_offset_6of12<?php endif; ?>
                    <?php if( get_field('text_position') == 'Almost Right Side' ): ?> c-grid__u_small_6of12 c-grid__u_small_offset_6of12 c-grid__u_medium_7of12 c-grid__u_medium_offset_5of12<?php endif; ?>"><?php if( $large_text = get_post_meta( get_the_ID(), 'large_text', true ) ):?>
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
                        <a href="<?php echo esc_url( get_post_meta( get_the_ID(), 'link', true ) );?>" class="c-btn c-btn_primary"><!-- js-show-teaser-popup target="_blank" -->
                          <?php echo esc_html( $link_title );?>
                        </a>
                      </p>
                    <?php endif;?>
                  </div>
                </div>
              </div>
            </div>

	    <div class="p-jumbotron__container button-bottom">
              <div class="c-container">
                <div class="c-grid">
                  <div class="c-grid__u u-text-center">
                    <p><a href="#" class="go-below">
                      <img src="<?php get_template_directory_uri()?>wp-content/themes/whill-us-2017/assets/dist/images/arrow-down.png" alt="">
                    </a></p>
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
      <?php /* div class="p-jumbotron__pagination"></div>--> */ ?>
    </div>
  <?php endif; ?>

  <?php if(have_posts()):?>
    <?php the_post();?>
<?php $hide = true; if(!$hide): ?>
    <div class="p-page-content p-page-content_double-tight">
      <div class="c-container" style="display: flex; flex-direction: column;">
<?php endif; ?>
        <?php the_content();?>
<?php $hide = true; if(!$hide): ?>
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
<?php endif; ?>
<?php $hide = true; if(!$hide): ?>
      </div>
    </div>
<?php endif;?>
  <?php endif;?>

  <div class="c-full-row home-awards">
    <div class="p-band p-band_highlight">
      <div class="p-page-content">

        <div class="c-container">
          <div class="c-row">
            <h1 class="p-section-title">Awards &amp; Recognition</h1>
            <?php /*<div class="c-grid grid-logos">
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of3">
                    <img alt="Time Best Inventions 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-time-best-inventions-2018.png" />
                </div>
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of3">
                    <img alt="Fast Company - The World's Most Innovative Companies 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-fast-company-award-2018.png" />
                </div>
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of3">
                    <img alt="CES Innovation Awards 2019" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-ces-best-of-innovation-2019.png" />
                </div>
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of3">
                    <img alt="IF Design Award 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-if-design-award-2018.png" />
                </div>
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of3">
                    <img alt="Good Design Award 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-good-design-award.png" />
                </div>
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_medium_1of3">
                    <img alt="Red Dot Award 2018 - Best of the best" src="<?php echo get_template_directory_uri();?>/assets/dist/images/logo-red-dot-award-2018.png" />
                </div>
            </div>*/ ?>
            <div class="c-grid c-grid_center grid-logos">
              <img alt="Fast Company - The World's Most Innovative Companies 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/fast-company.jpg" />
              <img alt="CES Innovation Awards 2019" src="<?php echo get_template_directory_uri();?>/assets/dist/images/ces.jpg" />
              <img alt="IF Design Award 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/IF-design-award.jpg" />
              <img alt="Good Design Award 2018" src="<?php echo get_template_directory_uri();?>/assets/dist/images/good-design.jpg" />
              <img alt="Red Dot Award 2018 - Best of the best" src="<?php echo get_template_directory_uri();?>/assets/dist/images/red-dot.jpg" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="c-full-row home-news">
    <div class="p-band p-band_light">
      <div class="p-page-content">
        <div class="c-container">
          <section>
            <h2 class="p-section-title" id="news">News</h2>

            <?php
              // $news = new WP_Query([ 'posts_per_page' => 1]);

              // $sticky = get_option( 'sticky_posts' );
              // $news = new WP_Query( 'p=' . $sticky[0] );

              $args = array(
                'posts_per_page' => 2,
                'post__in'  => get_option( 'sticky_posts' ),
                'ignore_sticky_posts' => 2,
				'category_name' => 'news'
              );
              $news = new WP_Query( $args );
            ?>

            <?php if ( $news->have_posts() ): ?>
              <?php while ( $news->have_posts() ): ?>
                <?php $news->the_post(); ?>
                <article class="p-large-news">
                  <div class="p-large-news__thumbnail">
                    <?php the_post_thumbnail('medium_large');?>
                  </div>
                  <div class="p-large-news__body">
					<div>
						<time class="p-post__time"><?= strtoupper( get_the_date('F j') ); ?></time>
						<h2 class="p-large-news__title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>

						<?php //do_excerpt(get_the_excerpt(), 70); ?>
						<a href="<?php the_permalink();?>" class="c-btn c-btn_primary c-btn_wht">Read More</a>
					</div>
                  </div>
                </article>
              <?php endwhile; ?>
            <?php endif; ?>
            <?php wp_reset_postdata(); wp_reset_query();?>

            <div class="c-grid_row c-grid__u text-center">
              <!-- <a href="<?php echo get_permalink( get_option('page_for_posts') );?>" class="c-btn c-btn_block c-btn_primary p-list-round-button">More News</a> -->
	      <a href="<?php echo get_permalink( get_option('page_for_posts') );?>" class="c-btn c-btn_primary c-btn_grey">SEE ALL</a>
            </div>

          </section>
        </div>
      </div>
		</div>
	</div>

</main>

<?php get_footer(); ?>
