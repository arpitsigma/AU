<?php get_header(); ?>

<main role="main" data-page="news">
  <article>
  <?php
    if (is_home()) {
      $attachment_images = wp_get_attachment_image_src(get_post_thumbnail_id(get_option('page_for_posts')), 'full');
      $featured_image = $attachment_images[0];
    }
  ?>
  <div class="p-band p-band_primary"
    <?php if ($featured_image): ?>
      style="background-image: url('<?php echo $featured_image; ?>');"
    <?php endif; ?>
  >
    <div class="c-container c-container_full">
      <header class="p-page-header p-page-header_with-content p-page-header_<?php echo get_the_name(); ?> <?php if (!has_post_thumbnail()): ?>p-page-header_no-image<?php endif; ?>">
        <div class="p-page-header__container">
          <div class="p-page-header__text">
            <h1 class="p-page-header__title"><?php _e('News', 'whill-theme'); ?></h1>
          </div>
        </div>
      </header>
    </div>
  </div>

  <div id="news" class="c-full-row">
    <div class="p-band p-band_light"><div class="p-page-content"><div class="c-container">
    <div class="c-grid">
      <?php $news = new WP_Query(['posts_per_page' => 6]); ?>
      <?php if ($news->have_posts()): ?>
        <?php while ($news->have_posts()): ?>
          <?php $news->the_post(); ?>
          <div class="c-grid__u c-grid__u_medium_1of3">
            <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            <div class="thumbnail"><a href="<?php the_permalink(); ?>"><?php the_post_thumbnail('medium_large'); ?></a></div>
            <div class="excerpt"><?php do_excerpt(get_the_excerpt(), 70); ?></div>
          </div>
        <?php endwhile; ?>
      <?php endif; ?>
      <?php wp_reset_postdata(); wp_reset_query(); ?>
    </div>
    </div></div></div>
    </div>
  </article>
</main>

<?php get_footer(); ?>
