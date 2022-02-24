<?php get_header(); ?>

<main role="main" data-page="front-page">
  <div class="main-visual">
    <div class="modal">
      <div class="video-container"></div>
    </div>
    <div class="swiper-container">
      <div class="swiper-wrapper"></div>
      <div class="swiper-pagination"></div>
    </div>
  </div>

  <?php if (have_posts()): ?>
    <?php the_post(); ?>
    <div class="p-page-content">
      <div class="c-container figures" style="display: flex; flex-direction: column;">
        <?php the_content(); ?>
      </div>
    </div>
  <?php endif; ?>

  <?php if (whill_get_lang_code() == 'en'): ?>
    <div id="front-page-latest-news" class="c-full-row">
      <div class="p-band p-band_extra-light">
        <div class="p-page-content">
          <div class="c-container">
            <section>
              <h2 id="news" class="p-section-title"><?php _e('Latest News', 'whill-theme'); ?></h2>

              <?php $news = new WP_Query(['posts_per_page' => 1]); ?>
              <?php if ($news->have_posts()): ?>
                <?php while ($news->have_posts()): ?>
                  <?php $news->the_post(); ?>
                  <article class="p-large-news">
                    <div class="p-large-news__thumbnail">
                      <a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium_large'); ?></a>
                    </div>
                    <div class="p-large-news__body">
                      <h3 class="p-large-news__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
                      <?php do_excerpt(get_the_excerpt(), 70); ?>
                    </div>
                  </article>
                <?php endwhile; ?>
              <?php endif; ?>
              <?php wp_reset_postdata(); wp_reset_query(); ?>

              <div class="c-grid_row c-grid__u c-grid__u_large_1of3 c-grid__u_large_offset_1of3">
                <a href="<?php echo whill_get_permalink('news'); ?>" class="c-btn c-btn_block c-btn_primary p-list-round-button"><?php _e('More News', 'whill-theme'); ?></a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  <?php endif; ?>
</main>

<?php get_footer(); ?>
