<?php
/**
 * Template Name: Where to Buy
 *
 */
get_header(); ?>

<main role="main" data-page="where-to-buy">
<?php if (have_posts()): ?>
  <?php the_post(); ?>
  <article>
    <div class="p-band p-band_primary"
      <?php if (has_post_thumbnail()): ?>
        style="background-image: url('<?php echo get_post_thumbnail_src('full'); ?>');"
      <?php endif; ?>
    >
      <div class="c-container c-container_full">
        <header class="p-page-header p-page-header_<?php echo get_the_name(); ?> <?php if (!has_post_thumbnail()): ?>p-page-header_no-image<?php endif; ?>">
          <div class="p-page-header__container">
            <div class="p-page-header__text">
              <h1 class="p-page-header__title"><?php the_title(); ?></h1>
              <?php if ($description = get_post_meta(get_the_ID(), 'page_description', true)): ?>
                <div class="p-page-header__description">
                  <?php echo wpautop($description); ?>
                </div>
              <?php endif; ?>
            </div>
          </div>
        </header>
      </div>
    </div>
    <div class="p-page-content">
      <div class="c-container">
        <?php the_content(); ?>
      </div>
    </div>
  </article>
<?php endif; ?>
</main>

<?php get_footer(); ?>
