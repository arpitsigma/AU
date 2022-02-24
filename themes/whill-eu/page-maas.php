<?php
/**
 * Template Name: MaaS
 *
 */
get_header(); ?>

<main role="main" class="maas2020" data-page="maas">

    <article>
        <div class="c-band c-band_highlight p-page-header_maas">
            <div class="l-container l-container_full">
                <header class="p-page-header">
                    <div class="p-page-header__container">
                        <div class="p-page-header__text">
                            <h1 class="p-page-header__title title_maas">MaaS<span class="pc-only">&nbsp;</span><br class="sp-only"/>Business</h1>
                        </div>
                    </div>

                </header>
            </div>
        </div>

      <?php
//      $current_language_code = apply_filters( 'wpml_current_language', null );
//      get_template_part( 'maas/page-'.$current_language_code );
      get_template_part( 'maas/page-en' );
      ?>
    </article>

</main>

<?php get_footer(); ?>
