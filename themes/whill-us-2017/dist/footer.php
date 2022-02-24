<footer class="p-footer" role="contentinfo">

  <?php if ( is_active_sidebar( 'floating_right_bottom_popup' ) ) : ?>
    <div id="primary-sidebar" class="primary-sidebar widget-area subscription-popup" role="complementary">
      <?php dynamic_sidebar( 'floating_right_bottom_popup' ); ?>
      <a class="close-popup" href="javascript:void(0);">close</a>
      <!--<div class="track-submitting"></div>-->
    </div><!-- #primary-sidebar -->
  <?php endif; ?>
  
    <?php
        /*
        <form action="http://whill.createsend.com/t/d/s/jrlia/" method="post" class="p-subscribe">
            <div>Receive great content in our monthly newsletter:
                <!--<input id="fieldName" class="p-subscribe__input" name="cm-name" type="text" placeholder="Name" />-->
                <input id="fieldEmail" class="p-subscribe__input" name="cm-jrlia-jrlia" required="" type="email" placeholder="Email" />
                <button class="c-btn c-btn_primary p-subscribe__submit" type="submit">Subscribe</button>
            </div>
        </form>
        <div class="c-grid__u c-grid__u_large_1of4 c-grid__u_xlarge_1of6">
          <div class="c-container p-footer__buttons">
            <div class="c-grid c-grid_tight">
              <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                <p><a href="/contact" class="c-btn c-btn_block c-btn_primary">Contact</a></p>
              </div>
              <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                <p><a href="<?php echo wp_get_attachment_url( get_option('options_catalog') ) ?>" class="c-btn c-btn_block c-btn_secondary"><i class="fa fa-file-pdf-o fa-lg"></i> Brochure</a></p>
              </div>
              <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                <p><a href="https://www.dropbox.com/sh/paox7qzreog7x0q/AABgCWwAIRElRD1-oAldIGcGa?dl=0" class="c-btn c-btn_block c-btn_secondary">Media Kit</a></p>
              </div>
              <div class="c-grid__u c-grid__u_1of2 c-grid__u_small_1of2 c-grid__u_large_1of2">
                <p><a href="https://www.facebook.com/teamWHILL" target="_blank" class="c-btn c-btn_block c-btn_facebook"><i class="fa fa-facebook-official fa-lg"></i> Facebook</a></p>
              </div>
              <div class="c-grid__u c-grid__u_1of2  c-grid__u_small_1of2 c-grid__u_large_1of2">
                <p><a href="https://twitter.com/_whill" target="_blank" class="c-btn c-btn_block c-btn_twitter"><i class="fa fa-twitter fa-lg"></i> WHILL</a></p>
              </div>
            </div>
          </div>
        </div>
        */
    ?>

    <?php if ( get_page_template_slug( $post->ID ) != 'page-no-subscription.php' ) : ?>
        <div class="p-band p-band_bronze subscription-bottom-wrapper">
            <?php
            /*
            <!--<iframe class="subscription-bottom" src="//go.whill.us/l/311981/2017-07-28/2gk3q" type="text/html" frameborder="0" allowTransparency="true"></iframe>-->
            <!--<iframe class="subscription-bottom" src="//go.whill.us/l/311981/2017-11-13/486gq" type="text/html" frameborder="0" allowTransparency="true"></iframe>-->
            */
            ?>
            <noscript>
                <iframe src="//go.whill.us/l/311981/2017-11-13/486gq" type="text/html" frameborder="0" allowTransparency="true"></iframe>
            </noscript>
            <script type="text/javascript">
                var form = '//go.whill.us/l/311981/2017-11-13/486gq';
                var params = window.location.search;
                var thisScript = document.scripts[document.scripts.length - 1];
                var iframe = document.createElement('iframe');
                iframe.setAttribute('src', form + params);
                //iframe.setAttribute('width', '960');
                //iframe.setAttribute('height', 400);
                iframe.setAttribute('type', 'text/html');
                iframe.setAttribute('frameborder', 0);
                iframe.setAttribute('allowTransparency', 'true');
                iframe.setAttribute('class', 'subscription-bottom');
                //iframe.style.border = '0';
                thisScript.parentElement.replaceChild(iframe, thisScript);
            </script>
        </div>
    <?php endif; ?>
  
	<div class="p-band p-band_footer p-footer__info">
		<div class="c-container">
    
			<div class="p-footer__nav">
				<div class="c-grid c-grid_collapse">
					<div class="c-grid__u c-grid__u_large_3of4 c-grid__u_xlarge_5of6">
						<ul class="c-grid c-grid_collapse p-footer__links">
							<?php wp_nav_menu( [
								'theme_location' => 'secondary',
								'li_class' => 'c-grid__u  c-grid__u_1of2 c-grid__u_large_1of5',
								'before'   => '<aside class="p-link-widget"><h3 class="p-link-widget__title">',
								'after'    => '</h3></aside>',
								'items_wrap'=> '%3$s',
								'container' => false,
							] );?>
						</ul>
					</div>
          
                    <?php
                    /*
                    <!--
                        <div class="c-grid__u c-grid__u_large_1of4 c-grid__u_xlarge_1of6">
                            <div class="c-container p-footer__buttons">
                                <div class="c-grid c-grid_tight">
                                    <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                                        <p><a href="/contact" class="c-btn c-btn_block c-btn_primary">Contact</a></p>
                                    </div>
                                    <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                                        <p><a href="<?php echo wp_get_attachment_url( get_option('options_catalog') ) ?>" class="c-btn c-btn_block c-btn_secondary"><i class="fa fa-file-pdf-o fa-lg"></i> Brochure</a></p>
                                    </div>
                                    <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                                        <p><a href="https://www.dropbox.com/sh/paox7qzreog7x0q/AABgCWwAIRElRD1-oAldIGcGa?dl=0" class="c-btn c-btn_block c-btn_secondary">Media Kit</a></p>
                                    </div>
                                    <div class="c-grid__u c-grid__u_1of2 c-grid__u_small_1of2 c-grid__u_large_1of2">
                                        <p><a href="https://www.facebook.com/teamWHILL" target="_blank" class="c-btn c-btn_block c-btn_facebook"><i class="fa fa-facebook-official fa-lg"></i> Facebook</a></p>
                                    </div>
                                    <div class="c-grid__u c-grid__u_1of2  c-grid__u_small_1of2 c-grid__u_large_1of2">
                                        <p><a href="https://twitter.com/_whill" target="_blank" class="c-btn c-btn_block c-btn_twitter"><i class="fa fa-twitter fa-lg"></i> WHILL</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    -->
                    */
                    ?>
          
				</div>
			</div>
      
              <div class="c-grid c-grid_collapse">
                    <div class="c-grid__u c-grid__u_small_10of12">
                      <div class="p-footer__address">
                        <?php
                        /*
                        <!--<p class="u-text-left">
                          WHILL Model A is not considered a medical device and has not been submitted to the Food and Drug Administration for review or clearance.<br>
                          WHILL Model M CAUTION: Federal law restricts this device to sale by or on the order of a physician.  2/17 740-01346<br>
                          WHILL, Inc. +1-844-MY-WHILL +1-844-699-4455 MAIL: <a href="mailto:info@whill.us">info@whill.us</a><br>
                          Copyright © 2017  WHILL Inc. All Rights Reserved.<br>
                        </p>-->
                        */
                        ?>
                        <?php the_field('footer_text' , 'option'); ?>
                      </div>
                    
                      <div class="p-footer__nav">
                        <div class="c-grid c-grid_collapse">
                          <div class="c-grid__u c-grid__u_large_3of4 c-grid__u_xlarge_5of6">
                            <ul class="c-grid c-grid_collapse p-footer__links">
                              <?php wp_nav_menu( [
                                'theme_location' => 'secondary',
                                //'li_class' => 'c-grid__u  c-grid__u_1of2 c-grid__u_large_1of5',
                                //'before'   => '<aside class="p-link-widget"><h3 class="p-link-widget__title">',
                                //'after'    => '</h3></aside>',
                                'li_class' => '',
                                'before'   => '',
                                'after'    => '',
                                'items_wrap'=> '%3$s',
                                'container' => false,
                              ] );?>
                            </ul>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    <div class="c-grid__u c-grid__u_large_3of12">
                      <div class="nav-socials">
                        <?php if (get_field('facebook_link', 'option')): ?>
                          <a href="<?php the_field('facebook_link' , 'option'); ?>" target="_blank"><img src="<?php the_field('facebook_icon' , 'option'); ?>"/></a>
                        <?php endif; ?>
                        <?php if (get_field('twitter_link', 'option')): ?>
                          <a href="<?php the_field('twitter_link' , 'option'); ?>" target="_blank"><img src="<?php the_field('twitter_icon' , 'option'); ?>"/></a>
                        <?php endif; ?>
                        <?php if (get_field('instagram_link', 'option')): ?>
                          <a href="<?php the_field('instagram_link' , 'option'); ?>" target="_blank"><img src="<?php the_field('instagram_icon' , 'option'); ?>"/></a>
                        <?php endif; ?>
                        <?php if (get_field('youtube_link', 'option')): ?>
                          <a href="<?php the_field('youtube_link' , 'option'); ?>" class="header-youtube" target="_blank"><img src="<?php the_field('youtube_icon' , 'option'); ?>"/></a>
                        <?php endif; ?>
                      </div>
                      <div class="footer-info">
                        <?php the_field('footer_text' , 'option'); ?>
                      </div>
                    </div>
              </div>
		</div>
	</div>
  
</footer>

</div>

<div class="teaser-popup-wrapper closed-popup">
    <div class="teaser-popup">
        <noscript>
            <iframe src="//go.whill.us/l/311981/2017-12-06/4lr1m" width="960" height="400" type="text/html" frameborder="0" allowTransparency="true" style="border: 0"></iframe>
        </noscript>
        <script type="text/javascript">
            var form = '//go.whill.us/l/311981/2017-12-06/4lr1m';
            var params = window.location.search;
            var thisScript = document.scripts[document.scripts.length - 1];
            var iframe = document.createElement('iframe');
            iframe.setAttribute('src', form + params);
            iframe.setAttribute('width', '960');
            iframe.setAttribute('height', 400);
            iframe.setAttribute('type', 'text/html');
            iframe.setAttribute('frameborder', 0);
            iframe.setAttribute('allowTransparency', 'true');
            iframe.style.border = '0';
            thisScript.parentElement.replaceChild(iframe, thisScript);
        </script>
        <a class="close-popup" href="javascript:void(0);">close</a>
    </div>
</div>

<?php wp_footer();?>

<!-- Google Code for Remarketing Tag -->
<!--------------------------------------------------
Remarketing tags may not be associated with personally identifiable information or placed on pages related to sensitive categories. See more information and instructions on how to setup the tag on: http://google.com/ads/remarketingsetup
--------------------------------------------------->
<script type="text/javascript">
/* <![CDATA[ */
var google_conversion_id = 968633057;
var google_custom_params = window.google_tag_params;
var google_remarketing_only = true;
/* ]]> */
</script>
<script type="text/javascript" src="//www.googleadservices.com/pagead/conversion.js">
</script>
<noscript>
<div style="display:inline;">
<img height="1" width="1" style="border-style:none;" alt="" src="//googleads.g.doubleclick.net/pagead/viewthroughconversion/968633057/?guid=ON&amp;script=0"/>
</div>
</noscript>

</body>
</html>
