<?php
/*
 * Template Name: MaaS
 */
get_header(); $hide = true;?>

<main role="main" class="maas2020" data-page="maas">

    <article>
        <div class="c-band c-band_highlight p-page-header_maas">
            <div class="l-container l-container_full">
                <header class="p-page-header">
                    <div class="p-page-header__container">
                        <div class="p-page-header__text">
                            <?php if($hide == false):?><h1 class="p-page-header__title title_maas">MaaS<span class="pc-only">&nbsp;</span><br class="sp-only"/>Business</h1><?php endif; ?>
							<h1 class="p-page-header__title title_maas"><?php the_title(); ?></h1>
                        </div>
                    </div>

                </header>
            </div>
        </div>

        <?php get_template_part( 'partial/page-maas-2020', get_the_name() ); ?>

    </article>

</main>

<?php get_footer(); ?>
