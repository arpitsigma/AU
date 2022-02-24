<?php
/**
 * Template Name: Newsletters V2
 *
 */
get_header();?>

	<main role="main">
  
    <article class="wht-bg">

      <div class="p-band p-band_primary wht-bg p-band_header-default"
		<?php if(has_post_thumbnail()):?>
		     style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');"
		<?php endif;?>
	  >
			<div class="c-container c-container_full">
				<header class="p-page-header p-page-header_with-content p-page-header_<?php echo get_the_name(); ?> <?php if(!has_post_thumbnail()):?>p-page-header_no-image<?php endif;?>">
					<div class="p-page-header__container">
						<div class="p-page-header__text">
							<h1 class="p-page-header__title"><?php the_title(); ?></h1>
							<?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
								<div class="p-page-header__description">
									<?php echo wpautop( $description ); ?>
								</div>
							<?php endif ?>
						</div>
					</div>
					<hr class="hr-custom" />
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
                <a href="<?php echo site_url('/blogs'); ?>"" class="c-btn c-btn_block c-btn_tint p-list-round-button right-part">Blog</a>
              </div>
            </div>
          </div>
          
          <?php echo do_shortcode('[cactus-masonry quality="medium" post_category="newsletter" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>

        </div>
      </div>

    </article>

	</main>

<?php get_footer();?>
