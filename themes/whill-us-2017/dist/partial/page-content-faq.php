<div class="p-page-content">
	<div class="c-container">
        <?php
        $terms = get_terms('faq-category');
        $ids = array_map(function($term) {
              return $term->term_id;
          }, $terms);
        
        array_unshift($terms, false);
        ?>
        <?php foreach ($terms as $term) { ?>
            <?php
                $query = array('post_type' => 'faq',
                    'orderby' => 'menu_order',
                    'nopaging' => true);
                if ($term) {
                    $query['tax_query'] = array(
                        array(
                            'taxonomy' => 'faq-category',
                            'field' => 'term_id',
                            'terms' => $term->term_id,
                        )
                    );
                } else {
                    $query['tax_query'] = array(
                        array(
                            'taxonomy' => 'faq-category',
                            'terms'    => $ids,
                            'operator' => 'NOT IN'
                        )
                    );
                }
            ?>
            <?php $faq = new WP_Query($query); ?>
            <?php if ($faq->have_posts()) { ?>
                <?php if ($term) { ?>
                <section class="p-faq">
                  <h2 class="title"><?php echo $term->name ?></h2>
                </section>
                <?php } ?>
                <?php while($faq->have_posts()): ?>
                    <?php $faq->the_post(); ?>
                    <section class="p-faq">
                        <h2 class="p-faq__question" data-slidemenu-target=".p-faq__answer_<?php the_ID(); ?>">
                            <?php the_title();?>
                        </h2>

                        <div class="p-faq__answer p-faq__answer_<?php the_ID(); ?>">
                            <?php the_content(); ?>
                            
                        </div>
                    </section>
                <?php endwhile; ?>
            <?php } ?>
            <?php wp_reset_postdata(); ?>
        <?php } ?>
		<?php the_content(); ?>
	</div>
</div>