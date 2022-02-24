<aside class="p-widget">
	<h4 class="p-widget__title">Recent Posts</h4>

	<?php $latest = new WP_Query(['post_type' => 'post', 'posts_per_page' => 5 ]);?>

	<?php while( $latest->have_posts() ):?>
		<?php $latest->the_post();?>
		<article class="p-widget__article">
			<time class="p-widget__article-pubdate"><?php the_time('Y.m.d');?></time>
			<h5 class="p-widget__article-title"><a href="<?php the_permalink();?>"><?php the_title();?></a></h5>
		</article>
	<?php endwhile;?>

	<?php wp_reset_postdata();?>
</aside>

<aside class="p-widget">
	<h4 class="p-widget__title">Recent Posts</h4>
	<?php wp_get_archives(['type' => 'yearly']);?>
</aside>