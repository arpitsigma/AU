<?php
/**
 * Template Name: Newsletters
 *
 */
get_header();?>

	<main role="main">
  
    <article>

      <div class="p-band p-band_primary">
        <div class="c-container c-container_full">
          <header class="p-page-header p-page-header_no-image">
            <div class="p-page-header__container">
              <div class="p-page-header__text">
                <h1 class="p-page-header__title"><?php wp_title($sep = ''); ?></h1>
              </div>
            </div>
          </header>
        </div>
      </div>
      
      <div class="p-page-content">
        <div class="c-container">
        
          <div class="btn-switcher">
            <div class="c-grid c-grid_collapse">
              <div class="c-grid_row c-grid__u_6of12 c-grid__u_medium_3of12 c-grid__u_medium_offset_3of12">
                <a href="javascript:void(0);" class="c-btn c-btn_block c-btn_primary p-list-round-button left-part">Newsletters</a>
              </div>
              <div class="c-grid_row c-grid__u c-grid__u_6of12 c-grid__u_medium_3of12">
                <a href="/blogs" class="c-btn c-btn_block c-btn_tint p-list-round-button right-part">Blogs</a>
              </div>
            </div>
          </div>
          
          <?php echo do_shortcode('[cactus-masonry quality="medium" post_category="newsletter" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>

        </div>
      </div>

    </article>

	</main>

<?php get_footer();?>
