<?php get_header();?>

  <?php
    $isNewletter = false;
    $test = wp_get_post_categories( $post->ID, array('fields' => 'all') );
    foreach( $test as $cat ){
      //echo $cat->name .'<br>';
      if ($cat->name == 'Newsletter') {
        $isNewletter = true;
      }
    }
  ?>

	<main role="main">

		<div class="p-band p-band_primary">
			<div class="c-container c-container_full">
				<header class="p-page-header p-page-header_no-image">
					<div class="p-page-header__container">
						<div class="p-page-header__text">
							
              <?php
                if ($isNewletter) {
                  ?>
                  <h1 class="p-page-header__title">Newsletters</h1>
                  <?php
                } else {
                  ?>
                  <h1 class="p-page-header__title">News</h1>
                  <?php
                }
              ?>
              
						</div>
					</div>

				</header>
			</div>
		</div>

		<div class="p-page-sub-navigation"  data-sub-navigation-container>
			<div class="p-band p-band_tint">
				<div class="c-container">
					<ul class="p-sub-navigation p-sub-navigation_single" data-sub-navigation>
						
            <?php
              if ($isNewletter) {
                ?>
                <li class="p-sub-navigation__item"><a href="/newsletters/"><i class="fa fa-angle-left fa-lg fa-fw"></i>Back</a></li>
                <?php
              } else {
                ?>
                <li class="p-sub-navigation__item"><a href="<?php echo get_permalink( get_option('page_for_posts') );?>"><i class="fa fa-angle-left fa-lg fa-fw"></i>Back</a></li>
                <?php
              }
            ?>
            
					</ul>

				</div>
			</div>
		</div>


		<div class="c-container c-container_full">
			<div class="p-news-columns">
				<div class="p-news-columns__main">
					<div class="c-container">
						<div class="p-news-list">

							<?php if(have_posts()):?>
								<?php the_post();?>

								<article class="p-post">

									<header class="p-post__header">
                  
                    <?php
                      if (!$isNewletter) {
                        ?>
                        <time class="p-post__time"><?php the_time('Y.m.d');?></time>
                        <?php
                      }
                    ?>
                    
										<h1 class="p-post__title"><?php the_title();?></h1>
                    
									</header>

<!--									<div class="p-post__thubnail">-->
<!--										--><?php //the_post_thumbnail();?>
<!--									</div>-->

									<div class="p-post__content">
										<?php the_content();?>
									</div>


								</article>

							<?php endif;?>

						</div>

					</div>


				</div>
				<div class="p-news-columns__sub">
					<div class="c-container">
						<?php get_template_part('partial/news-sidebar');?>
					</div>


				</div>



			</div>


		</div>

	</main>

<?php get_footer();?>
