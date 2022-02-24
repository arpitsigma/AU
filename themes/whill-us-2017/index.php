<?php get_header(); $hide = true; ?>

	<main role="main">
  
    <article>

      <div class="p-band p-band_primary">
        <div class="c-container c-container_full">
          <header class="p-page-header p-page-header_no-image">
            <div class="p-page-header__container">
              <div class="p-page-header__text">
                <h1 class="p-page-header__title"><?php //wp_title($sep = ''); ?>News and Events</h1>
              </div>
            </div>
          </header>
        </div>
      </div>

      <!--
      <div class="p-page-sub-navigation"  data-sub-navigation-container>
        <div class="p-band p-band_tint">
          <div class="c-container">
            <div class="p-sub-navigation"  data-sub-navigation>
              <a href="<?php echo site_url('/'); ?>"><i class="fa fa-angle-left fa-lg fa-fw"></i>Back to Top</a>
            </div>

          </div>
        </div>
      </div>
      -->
      
      <div class="p-page-content">
        <div class="c-container">
        <?php if($hide == false): ?>
          <div class="btn-switcher">
            <div class="c-grid c-grid_collapse">
              <div class="c-grid_row c-grid__u_6of12 c-grid__u_medium_3of12 c-grid__u_medium_offset_3of12">
                <a href="javascript:void(0);" class="c-btn c-btn_block c-btn_primary p-list-round-button left-part">News</a>
              </div>
              <div class="c-grid_row c-grid__u c-grid__u_6of12 c-grid__u_medium_3of12">
                <a href="<?php echo site_url('/list-of-events'); ?>" class="c-btn c-btn_block c-btn_tint p-list-round-button right-part">Events</a>
              </div>
            </div>
          </div>
		<?php endif; ?>
          
          <script>
            // jQuery(document)
              // .on('click', '#showEvents', function() {
                // showEvents();
              // })
              // .on('click', '#showNews', function() {
                // showNews();
              // });
            // function showEvents() {
              // jQuery('#showEvents').removeClass('c-btn_tint').addClass('c-btn_primary');
              // jQuery('#showNews').removeClass('c-btn_primary').addClass('c-btn_tint');
              // jQuery('#outputNews').hide();
              // jQuery('#outputEvents').show();
            // }
            // function showNews() {
              // jQuery('#showNews').removeClass('c-btn_tint').addClass('c-btn_primary');
              // jQuery('#showEvents').removeClass('c-btn_primary').addClass('c-btn_tint');
              // jQuery('#outputEvents').hide();
              // jQuery('#outputNews').show();
            // }
            // jQuery(document).ready(function() {
                // jQuery('#showNews').trigger('click');
            // });
          </script>
          
          <?php //echo do_shortcode('[cactus-masonry quality="medium" post_category="news" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>
          
          <?php //echo do_shortcode('[cactus-masonry quality="medium" show_posts="false" custom_post_types="customers_voice" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>
          
          <?php //echo do_shortcode('[cactus-masonry quality="medium" show_posts="false" custom_post_types="jumbotron" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>
          
          <?php //echo do_shortcode('[cactus-masonry quality="medium" post_category="blog, news, press, press-ja, 未分類" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>
		  <?php //echo do_shortcode('[cactus-masonry quality="medium" post_category="news" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>
          
          <?php //echo do_shortcode('[cactus-masonry quality="medium" show_posts="false" custom_post_types="tribe_events" display_post_titles="true" display_post_excerpts="true" width="33.33%" horizontal_spacing="20" vertical_spacing="20" posts_per_page="6" show_loader="false"]', false ); ?>

        </div>
      </div>
      <?php $test = false; if ($test == true): ?>
	  <div class="c-container c-container_full">
        <div class="p-news-columns">
          <div class="p-news-columns__main">
            <div class="c-container">
              <!--<div class="p-news-list">-->

                <?php if( have_posts() ){
					$types = array('page', 'post', 'faq');
					foreach( $types as $type ){
						echo '<div class="' . $type . ' search-result">';
						echo '<h2>'.ucwords($type).'s</h2>';
						while( have_posts() ){
							the_post();
							if( $type == get_post_type() ){ ?>
								<!-- get_template_part('content', $type); -->
								<article class="p-news-list__item">

								  <header class="p-news-list__body">
									<time><?php the_time('Y.m.d');?></time>
									<h3 class="p-news-list__title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h3>
									<?php do_excerpt(get_the_excerpt(), 70); ?>
								  </header>

								  <div class="p-news-list__thumbnail">
									<a href="<?php the_permalink();?>"><?php the_post_thumbnail();?></a>
								  </div>

								</article>
							<?php }
						} ?>
						<!--<nav class="p-paginate u-text-center">
							<?= paginate_links([
							  'prev_text' => '<i class="fa fa-angle-left"></i> Prev',
							  'next_text' => 'Next <i class="fa fa-angle-right"></i>',
							]); ?>
						  </nav>-->
						<?php
						rewind_posts();
						echo '</div>';
					}
				} else { ?>
					<h3 style="text-align: center;">No Results found...</h3>
				<?php }; ?>
              <!--</div>-->
            </div>

          </div>
        </div>
      </div>
	  <?php endif; ?>
	  <?php $test = false; if ($test == true): ?>
      <!--
      <div class="c-container c-container_full">
        <div class="p-news-columns">
          <div class="p-news-columns__main">
            <div class="c-container">
              <div class="p-news-list">

                <?php if(have_posts()):?>
                  <?php while(have_posts()):?>
                    <?php the_post();?>

                    <article class="p-news-list__item">

                      <header class="p-news-list__body">
                        <time><?php the_time('Y.m.d');?></time>
                        <h3 class="p-news-list__title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h3>
                        <?php do_excerpt(get_the_excerpt(), 70); ?>
                      </header>

                      <div class="p-news-list__thumbnail">
                        <a href="<?php the_permalink();?>"><?php the_post_thumbnail();?></a>
                      </div>

                    </article>

                  <?php endwhile;?>

                  <nav class="p-paginate u-text-center">
                    <?= paginate_links([
                      'prev_text' => '<i class="fa fa-angle-left"></i> Prev',
                      'next_text' => 'Next <i class="fa fa-angle-right"></i>',
                    ]); ?>
                  </nav>
                <?php endif;?>

              </div>

            </div>


          </div>
          
          <div class="p-news-columns__sub">
            <div class="c-container">
              <?php //get_template_part('partial/news-sidebar');?>
            </div>
          </div>
          
        </div>

      </div>
      -->
	  <?php endif; ?>
	  <div class="c-container c-container_full">
        <div class="p-news-columns">
          <div class="p-news-columns__main">
            <div class="c-container">
              <div class="p-news-list">
				<?php $the_query = new WP_Query(
						array(
						  'category_name' => 'news', 
						  'posts_per_page' => 5
						)
					);
				?>
                <?php if($the_query->have_posts()):?>
                  <?php while($the_query->have_posts()):?>
                    <?php $the_query->the_post();?>

                    <article class="p-news-list__item">

                      <header class="p-news-list__body">
                        <time><?php the_time('Y.m.d');?></time>
                        <h3 class="p-news-list__title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h3>
                        <?php do_excerpt(get_the_excerpt(), 70); ?>
                      </header>

                      <div class="p-news-list__thumbnail">
                        <a href="<?php the_permalink();?>"><?php the_post_thumbnail();?></a>
                      </div>

                    </article>

                  <?php endwhile;?>
				
				<?php else: ?>
					<div>No news yet...</div>
                  
                <?php endif;?>
				<!--
				<nav class="p-paginate u-text-center">
                    <?= paginate_links([
                      'prev_text' => '<i class="fa fa-angle-left"></i> Prev',
                      'next_text' => 'Next <i class="fa fa-angle-right"></i>',
                    ]); ?>
                  </nav>-->

              </div>

            </div>
<?php // test
function wpb_postsbycategory() {
// the query
$the_query = new WP_Query( array( 
    'category_name' => 'news', 
    'posts_per_page' => 5 
) ); 
  
// The Loop
if ( $the_query->have_posts() ) {
    $string .= '<ul class="postsbycategory widget_recent_entries">';
    while ( $the_query->have_posts() ) {
        $the_query->the_post();
            if ( has_post_thumbnail() ) {
            $string .= '<li>';
            $string .= '<a href="' . get_the_permalink() .'" rel="bookmark">' . get_the_post_thumbnail($post_id, array( 50, 50) ) . get_the_title() .'</a></li>';
            } else { 
            // if no featured image is found
            $string .= '<li><a href="' . get_the_permalink() .'" rel="bookmark">' . get_the_title() .'</a></li>';
            }
            }
    } else {
    // no posts found
}
$string .= '</ul>';
  
return $string;
  
/* Restore original Post Data */
wp_reset_postdata();
}
// Add a shortcode
add_shortcode('categoryposts', 'wpb_postsbycategory');?>

          </div>
          
        </div>

      </div>
    
    </article>

	</main>

<?php get_footer();?>
