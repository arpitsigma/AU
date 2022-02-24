<?php
/**
 * Template Name: About Us
 *
 */
get_header(); ?>

<main role="main" class="about-company" data-page="about-company">
<?php if (have_posts()): ?>
  <?php the_post(); ?>
  <article>
    <div class="p-band p-band_blue p-page-header_about-us">
      <div class="c-container c-container_full">
        <header class="p-page-header p-page-header_with-content <?php if (!has_post_thumbnail()): ?>p-page-header_no-image<?php endif; ?>">
          <div class="p-page-header__container">
            <div class="p-page-header__text">
              <h1 class="p-page-header__title title_about-us"><?php the_title(); ?></h1>
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

      <?php
      $current_language_code = apply_filters( 'wpml_current_language', null );
      get_template_part( 'about-us/page-'.$current_language_code );
      ?>
  </article>
<?php endif; ?>
</main>

<?php get_footer(); ?>
