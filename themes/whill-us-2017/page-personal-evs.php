<?php
/**
 * Template Name: Personal EVs
 *
 */
get_header(); ?>

<main role="main">

	<?php if ( have_posts() ): ?>
		<?php the_post(); ?>

		<article>
    
      <!--
			<div class="p-band p-band_primary"
				<?php if(has_post_thumbnail()):?>
			     style="background-image: url('<?php echo get_post_thumbnail_src( 'origin_size' ); ?>');"
				<?php endif;?>
				>
				<div class="c-container c-container_full" style="postition: relative;">
        
          <div style="position: absolute; width: 50%; left: 0; top: 0; bottom: 0; background: url('<?php the_field('personal_ev_left'); ?>') center center no-repeat;"></div>
          <div style="position: absolute; width: 50%; right: 0; top: 0; bottom: 0; background: url('<?php the_field('personal_ev_right'); ?>') center center no-repeat;"></div>
        
					<header class="p-page-header p-page-header_with-content <?php if(!has_post_thumbnail()):?>p-page-header_no-image<?php endif;?>">
          
						<div class="p-page-header__container">
							<div class="p-page-header__text">
              
								<?php get_template_part( 'partial/page-content', 'personal-evs' ); ?>
                
							</div>
						</div>

					</header>
				</div>
			</div>
      -->

      <!--
      <div class="p-page-content">
        <div class="c-container text-center">
        
          <?php if ( $description = get_post_meta( get_the_ID(), 'page_description', true ) ): ?>
            <?php echo wpautop( $description ); ?>
          <?php endif ?>

        </div>
      </div>
      -->
      
      <?php get_template_part( 'partial/page-content', 'personal-evs' ); ?>

		</article>

	<?php endif; ?>

</main>

<?php get_footer(); ?>
