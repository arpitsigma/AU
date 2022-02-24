<?php
/**
 * Template Name: Latest News
 *
 */
get_header(); ?>

<main role="main">

  <div class="p-band p-band_primary">
    <div class="c-container c-container_full">
      <header class="p-page-header p-page-header_no-image">
        <div class="p-page-header__container">
          <div class="p-page-header__text">
            <h1 class="p-page-header__title">News &amp; Events</h1>
          </div>
        </div>

      </header>
    </div>
  </div>

	<div class="p-page-content">
		<div class="c-container">
			<section class="p-latest-news">
      
				<h1 class="p-section-title"><a href="<?php echo get_permalink( get_option('page_for_posts') );?>">Latest News</a></h1>
        <!--<h1 class="p-section-title" id="news">Latest News</h1>-->

				<?php $news = new WP_Query([ 'posts_per_page' => 1]);?>

				<?php if ( $news->have_posts() ): ?>
					<?php while ( $news->have_posts() ): ?>
						<?php $news->the_post(); ?>
						<article>
              <h2 class="p-section-title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h2>
              <div class="c-grid_row">
                <img src="<?php echo get_post_thumbnail_src( 'origin_size' ); ?>" alt="">
              </div>
              <div class="c-grid_row">
                <?php do_excerpt(get_the_excerpt(), 70); ?>
                <a href="<?php the_permalink();?>">read more</a>
                
                <!--
                <?php the_content();?>
                -->
                
              </div>
						</article>
					<?php endwhile; ?>
				<?php endif; ?>
				<?php wp_reset_postdata(); wp_reset_query();?>

        <!--
        <div class="c-grid">
          <div class="c-grid_row c-grid__u c-grid__u_large_4of12 c-grid__u_large_offset_2of12">
            <a href="<?php echo get_permalink( get_option('page_for_posts') );?>" class="c-btn c-btn_block c-btn_primary p-list-round-button">More News</a>
          </div>
          <div class="c-grid_row c-grid__u c-grid__u_large_4of12">
            <a href="<?php echo get_permalink( get_option('page_for_posts') );?>" class="c-btn c-btn_block c-btn_primary p-list-round-button">Events</a>
          </div>
        </div>
        -->
        
        <?php the_content();?>

			</section>
		</div>
	</div>


</main>

<?php get_footer(); ?>
