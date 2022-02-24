<?php
/*
<?php $nationalResellers = new WP_Query([ 'post_type'=> 'nationalResellers', "orderby" => "menu_order", "nopaging" => true]);?>
<?php $localResellers = get_local_resellers();?>
*/
?>

<?php
/*
<!--
Output National Resellers
-->
<div class="c-grid c-grid_center">
    <?php while($nationalResellers->have_posts()):?>
      <?php $nationalResellers->the_post();?>
        
        <div class="c-grid__u c-grid__u_medium_1of2 reseller-item">
          
          <?php if ( get_field('national_reseller_location') ): ?>
            <h4><?php the_field('national_reseller_location'); ?></h4>
          <?php endif; ?>
          
          <div class="reseller-logo-wrapper">
          
            <?php if ( get_field('national_reseller_link') ): ?>
              <a class="reseller-link" href="<?php the_field('national_reseller_link'); ?>" target="_blank">
                <img class="alignnone size-full reseller-logo" src="<?php the_field('national_reseller_logo'); ?>" alt="" />
              </a>
            <?php endif; ?>
            
            <?php if ( !get_field('national_reseller_link') ): ?>
              <img class="alignnone size-full reseller-logo" src="<?php the_field('national_reseller_logo'); ?>" alt="" />
            <?php endif; ?>
            
          </div>
          
          <?php if ( get_field('national_reseller_title') ): ?>
            <h3><?php the_field('national_reseller_title'); ?></h3>
          <?php endif; ?>
          
          <?php if ( get_field('national_reseller_contacts') ): ?>
            <h5><?php the_field('national_reseller_contacts'); ?></h5>
          <?php endif; ?>
          
        </div>

    <?php endwhile; wp_reset_postdata();?>
</div>
*/
?>

<?php
/*
<!--
Output Local Resellers
-->
<!--
<div class="c-grid c-grid_center">
  
  <?php foreach($localResellers as $reseller):?>

      <div class="c-grid__u c-grid__u_medium_1of3 reseller-item">
        <h4><?php the_field('reseller_location', $reseller->ID); ?></h4>
        
        <div class="reseller-logo-wrapper">
        
          <?php if ( get_field('reseller_link', $reseller->ID) ): ?>
            <a class="reseller-link" href="<?php the_field('reseller_link', $reseller->ID); ?>" target="_blank">
              <img class="alignnone size-full reseller-logo" src="<?php the_field('reseller_logo', $reseller->ID); ?>" alt="" />
            </a>
          <?php endif; ?>
          
          <?php if ( !get_field('reseller_link', $reseller->ID) ): ?>
            <img class="alignnone size-full reseller-logo" src="<?php the_field('reseller_logo', $reseller->ID); ?>" alt="" />
          <?php endif; ?>
        </div>
        
        <h3><?php the_field('reseller_title', $reseller->ID); ?></h3>
        <h5><?php the_field('reseller_contacts', $reseller->ID); ?></h5>
      </div>

  <?php endforeach; wp_reset_postdata();?>

</div>
-->
*/
?>

<?php
/*
<!--<div class="resellers-category local-category">
</div>-->
*/
?>    

<?php the_content();?>

<div class="resellers-wrapper">
    <div class="resellers-category national-category">
        <div class="p-page-content">
            <?php echo do_shortcode("[slplus]"); ?>

<!--[if lte IE 8]>
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
<![endif]-->
<script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
<script>
  hbspt.forms.create({
	portalId: "6576727",
	formId: "7f3d724d-0597-4693-a022-a13173e60b63"
});
</script>

        </div>
    </div>
</div>

<style>
#map_sidebar,
#slp_bubble_name,
#slp_bubble_address,
#slp_bubble_directions {
    display: none !important;
}
#sl_info_bubble {
    text-align: left;
}
</style>
