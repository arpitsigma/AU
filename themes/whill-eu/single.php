<?php get_header(); ?>

<main role="main" data-page="news-single">
  <div class="p-band p-band_primary">
    <div class="c-container c-container_full">
      <header class="p-page-header p-page-header_no-image">
        <div class="p-page-header__container">
          <div class="p-page-header__text">
            <h1 class="p-page-header__title"><?php _e('News', 'whill-theme'); ?></h1>
          </div>
        </div>
      </header>
    </div>
  </div>

  <div class="p-page-sub-navigation" data-sub-navigation-container>
    <div class="p-band p-band_tint">
      <div class="c-container">
        <ul class="p-sub-navigation p-sub-navigation_single" data-sub-navigation>
          <li class="p-sub-navigation__item"><a href="<?php echo whill_get_permalink(); ?>"><i class="fa fa-angle-left fa-lg fa-fw"></i><?php _e('Back to Top', 'whill-theme'); ?></a></li>
        </ul>
      </div>
    </div>
  </div>

<div class="c-container c-container_full">
  <div class="p-news-columns">
    <div class="p-news-columns__main">
      <div class="c-container">
        <div class="p-news-list">
          <?php if (have_posts()): ?>
            <?php the_post(); ?>
            <article class="p-post">
              <header class="p-post__header">
                <time class="p-post__time"><?php the_time('Y.m.d'); ?></time>
                <h1 class="p-post__title"><?php the_title(); ?></h1>
              </header>
              <div class="p-post__content">
                <?php the_content(); ?>
              </div>
            </article>
          <?php endif; ?>
        </div>
      </div>
    </div>
    <div class="p-news-columns__sub">
      <div class="c-container">
        <aside class="p-widget">
          <h4 class="p-widget__title"><?php _e('Recent Posts', 'whill-theme'); ?></h4>
          <?php $latest = new WP_Query(['post_type' => 'post', 'posts_per_page' => 5]); ?>
          <?php while ($latest->have_posts()): ?>
            <?php $latest->the_post(); ?>
            <article class="p-widget__article">
              <time class="p-widget__article-pubdate"><?php the_time('Y.m.d'); ?></time>
              <h5 class="p-widget__article-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
            </article>
          <?php endwhile; ?>
          <?php wp_reset_postdata(); ?>
        </aside>
        <aside class="p-widget">
          <h4 class="p-widget__title"><?php _e('Recent Posts', 'whill-theme'); ?></h4>
          <?php wp_get_archives(['type' => 'yearly']); ?>
        </aside>
      </div>
    </div>
  </div>

</div>
</main>

<?php get_footer(); ?>
