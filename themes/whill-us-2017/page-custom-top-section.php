<?php
/**
 * Template Name: Custom Top
 *
 */
get_header(); ?>

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

      <div class="p-main-visual__overlay p-page-header__title title-over-video" style="background: url('<?php the_field('overlay_image' , 'option'); ?>') center center no-repeat; background-size: cover;">
      </div>

    </div>
  <?php endif; ?>

  <?php if ($home_top_section_value == 'teaser'): ?>
    <div class="swiper-container p-jumbotron">
      <div class="swiper-wrapper p-jumbotron__items">
        <?php
          $jumbotron = new WP_Query( [ 'post_type' => 'jumbotron', 'order' => 'ASC', 'orderby' => 'menu_order' ] );
          while( $jumbotron->have_posts() ): $jumbotron->the_post();
        ?>
          <div class="swiper-slide p-jumbotron__item swiper-no-swiping" style="color: <?php echo esc_attr( get_post_meta( get_the_ID(), 'text_color', true ) );?> ;background-image: url(<?php echo get_the_post_thumbnail_url( get_post(), 'full' );?>)" data-rel="<?php echo get_the_post_thumbnail_url( get_post(), 'full' );?>">
            <div class="p-jumbotron__container button-bottom">
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
    </div>
  <?php endif; ?>
  
  <?php if ( have_posts() ): ?>
    <?php the_post(); ?>
  <div class="p-page-content p-page-content_double-tight">
    <div class="c-container">
      <?php the_content();?>
    </div>
  </div>
  <?php endif; ?>

</main>

<?php get_footer(); ?>
