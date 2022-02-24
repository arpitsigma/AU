<?php get_header(); ?>

<main role="main">

	<div class="p-band p-band_primary" style="background-image: url('<?php echo get_template_directory_uri(); ?>/assets/dist/images/experience-opt.jpg');">
		<div class="c-container c-container_full">
			<header class="p-page-header p-page-header_with-content p-page-header_customers-voice">
				<div class="p-page-header__container">
					<div class="p-page-header__text">
            <h1 class="p-page-header__title">Lifestyle Experiences</h1>
						<div class="p-page-header__description">
							<?php the_field('experiences_description', 'option'); ?>
						</div>
					</div>
				</div>

			</header>
		</div>
	</div>

	<div class="c-container">
		<div class="p-page-content">
			<div class="p-voices" data-masonry data-masonry-max-page="<?php echo $wp_query->max_num_pages;?>">
				<?php if ( have_posts() ): ?>
					<div data-masonry-sizer class="p-voices__item p-voices__item_sizer p-voices__item_1x1"></div>
					<?php while(have_posts()):?>
						<?php the_post(); ?>
						<?php $size = post_custom('thumbnail_size');?>
                                <?php
                                echo wp_get_attachment_image( post_custom( 'thumbnail_'.$size ), $size );
                                ?>
						<a data-masonry-item class="p-voices__item p-voices__item_<?php echo $size;?>" href="<?php the_permalink();?>">
							<?php
							echo wp_get_attachment_image( post_custom( 'thumbnail_'.$size ), $size );
							?>
                              <!--
                                <span class="p-voices__title"><?php the_title();?></span>
                              -->
                              <span class="p-voices__title"><?= esc_html( get_post_meta( get_the_ID(), 'user_name', true ) ); ?> <?= esc_html( get_post_meta( get_the_ID(), 'ages', true ) ); ?>, <?= esc_html( get_post_meta( get_the_ID(), 'home_towns', true ) ); ?></span>
                              <!--
                              <span class="p-voices__title-wrapper">
                                <span class="p-voices__title"><?= esc_html( get_post_meta( get_the_ID(), 'user_name', true ) ); ?></span><br>
                                <span class="p-voices__sub-title"><?= esc_html( get_post_meta( get_the_ID(), 'home_towns', true ) ); ?></span><br>
                                <span class="p-voices__sub-title"><?= esc_html( get_post_meta( get_the_ID(), 'ages', true ) ); ?></span>
                              </span>
                              -->
						</a>

					<?php endwhile;?>
				<?php endif; ?>

			</div>
		</div>
	</div>
	<div class="p-voice-container" data-voice-container>

	</div>

</main>

<?php get_footer(); ?>
