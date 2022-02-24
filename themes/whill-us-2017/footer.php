</div>
  <footer class="p-footer whill-footer" role="contentinfo">
    <?php if(!isset($_COOKIE['loc'])): ?>
      <script type="text/javascript">
	  //var mediaMatch = window.matchMedia("(max-width: 767px;)");
      function getCookie(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return "";
      }
        var c = getCookie('loc');
        var region = window.location.pathname;
        region = region.split('/')[1];
        if(c == '') {
          var date = new Date();
          date.setTime(date.getTime()+(365*24*60*60*1000));
          $('#store').click(function(e){
            e.preventDefault();
            for (const option of document.querySelectorAll(".custom-option")) {
              if($('.custom-select .custom-select__trigger span').text() == option.querySelector('span').textContent) {
                document.cookie = 'loc='+option.querySelector('span').getAttribute('data-value')+'; expires='+date+';path=/'+region;
                $('#storeSelect').remove();
                //$('div#viewport').css('paddingTop', 'unset');
				topPad(mediaMatch);
              }

            }

          });
          console.log(window.location.href);

          document.querySelector('.custom-select-wrapper').addEventListener('click', function() {
              this.querySelector('.custom-select').classList.toggle('open');
          })
          for (const option of document.querySelectorAll(".custom-option")) {
              option.addEventListener('click', function() {
                  if (!this.classList.contains('selected')) {
                      this.parentNode.querySelector('.custom-option.selected').classList.remove('selected');
                      this.classList.add('selected');
                      this.closest('.custom-select').querySelector('.custom-select__trigger span').textContent = this.querySelector('span').textContent;

                      if($('span',this).attr('data-href') != '' && $('span',this).attr('data-value') != 'other'){window.location = ('https://' + window.location.host + $('span',this).attr('data-href'));}
                      if($('span',this).attr('data-value') == 'other'){
                        // window.location = 'https://corporate-stg-cf.whill.inc/choose-country-region/index.html';
                        $('div.choose-region').removeClass('closed');
                        $('div.choose-region').addClass('open');
                        $('div#viewport header').addClass('hidden');
                      }
                  }
              });

          }
          window.addEventListener('click', function(e) {
              const select = document.querySelector('.custom-select')
              if (!select.contains(e.target)) {
                  select.classList.remove('open');
              }
          });

        } else {
          $('#storeSelect').remove();
        } // if cookie set

         <?php //foreach (getCountryList() as $key => $c): ?>
           <?php //if($key != 'US'): ?>
        //     window.location = "https://" + window.location.hostname + '<?=$c['href']?>?ref=us';
           <?php //endif;?>
         <?php //endforeach; ?>

        $(document).ready(function(){
          $('.overlay.choose-region .overlay-header .top-header .close-btn a').click(function(e) {
            e.preventDefault();
            $('.choose-region').removeClass('open');
            $('.choose-region').addClass('closed');
            $('div#viewport header').removeClass('hidden');
            $('.custom-select-wrapper .custom-select .custom-option').each(function() {
              $(this).removeClass('selected');
            });
            $('.custom-select-wrapper .custom-select .custom-option:first-of-type').addClass('selected');
            $('.custom-select-wrapper .custom-select .custom-select__trigger span').text($('.custom-select-wrapper .custom-select .custom-option:first-of-type').text());
            $('.custom-select-wrapper .custom-select .custom-select__trigger img').attr('src', $('.custom-select-wrapper .custom-select .custom-option:first-of-type img').attr('src'));
          });

          $('.choose-region .regionWrapper .region dl dd a').each(function() {
            <?php if(isset($_GET['ref'])): ?>
              $(this).attr('data-ref','<?=$_GET["ref"]?>');
            <?php endif;?>
            $(this).click(function(e){
              e.preventDefault();
              document.cookie = 'loc='+$(this).attr('data-value')+'; expires='+date+';path=/'+region;
              window.location = $(this).attr('href') + ( ($(this).attr('data-href') != '') ? '?loc='+region : "");
            });
          });
        });
      </script>
    <?php endif;?>

      <?php
      /*
      <?php if ( is_active_sidebar( 'floating_right_bottom_popup' ) ) : ?>
          <div id="primary-sidebar" class="primary-sidebar widget-area subscription-popup" role="complementary">
              <?php dynamic_sidebar( 'floating_right_bottom_popup' ); ?>
          <a class="close-popup" href="javascript:void(0);">close</a>
          </div>
      <?php endif; ?>
      */
      ?>

      <?php
          /*
          <form action="//whill.createsend.com/t/d/s/jrlia/" method="post" class="p-subscribe">
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
                  <p><a href="<?php echo site_url('/contact'); ?>"" class="c-btn c-btn_block c-btn_primary">Contact</a></p>
                </div>
                <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                  <p><a href="<?php echo wp_get_attachment_url( get_option('options_catalog') ) ?>" class="c-btn c-btn_block c-btn_secondary"><i class="fa fa-file-pdf-o fa-lg"></i> Brochure</a></p>
                </div>
                <div class="c-grid__u c-grid__u_small_1of2 c-grid__u_large_1of1">
                  <p><a href="//www.dropbox.com/sh/paox7qzreog7x0q/AABgCWwAIRElRD1-oAldIGcGa?dl=0" class="c-btn c-btn_block c-btn_secondary">Media Kit</a></p>
                </div>
                <div class="c-grid__u c-grid__u_1of2 c-grid__u_small_1of2 c-grid__u_large_1of2">
                  <p><a href="//www.facebook.com/teamWHILL" target="_blank" class="c-btn c-btn_block c-btn_facebook"><i class="fa fa-facebook-official fa-lg"></i> Facebook</a></p>
                </div>
                <div class="c-grid__u c-grid__u_1of2  c-grid__u_small_1of2 c-grid__u_large_1of2">
                  <p><a href="//twitter.com/_whill" target="_blank" class="c-btn c-btn_block c-btn_twitter"><i class="fa fa-twitter fa-lg"></i> WHILL</a></p>
                </div>
              </div>
            </div>
          </div>
          */
      ?>

      <?php //if ( get_page_template_slug( $post->ID ) != 'page-no-subscription.php' ) : ?>
          <!-- <div class="p-band p-band_metallic subscription-bottom-wrapper">
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
                  var form = 'https://go.pardot.com/l/311981/2017-11-13/486gq';
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
          </div> -->
      <?php //endif; ?>

  	<div class="p-band p-band_footer p-footer__info">
  		<div class="c-container">

        <div class="c-grid c-grid_collapse">
          <!-- Footer v2 -->
          <div class="c-grid__u c-grid__u_large_3of12">
            <div class="p-footer__nav">
              <img src="/gb/wp-content/themes/whill-us-2017/assets/dist/images/logo-gray.svg" alt="WHILL" style="max-width: 81px;"/>
            </div>
          </div>
          <div class="c-grid__u c-grid__u_large_9of12">
            <div class="p-navigation">
              <div class="p-footer__nav footer__nav_v2">
                <ul class="p-navigation__items">
                  <?php wp_nav_menu( [
                    'theme_location' => 'footer_menu',
                    'li_class' => 'p-navigation__item',
                    'link_before'   => '<span class="p-navigation__text">',
                    'link_after'    => '</span>',
                    'items_wrap'=> '%3$s',
                    'container' => false,
                  ] );?>
                </ul>
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
              </div>
            </div>
          </div>
          <!-- Footer v2 -->
          <!-- <div class="c-grid__u c-grid__u_large_9of12">

            <div class="p-navigation">
              <div class="p-footer__nav">
                <ul class="p-navigation__items">
                  <?php wp_nav_menu( [
                    'theme_location' => 'footer_menu',
                    'li_class' => 'p-navigation__item',
                    'link_before'   => '<span class="p-navigation__text">',
                    'link_after'    => '</span>',
                    'items_wrap'=> '%3$s',
                    'container' => false,
                  ] );?>
                </ul>
              </div>
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

          </div> -->
          <!-- <div class="c-grid__u c-grid__u_large_3of12">
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
          </div> -->
        </div>

        <div class="p-footer__nav p-footer__info_end">
          <div class="c-grid c-grid_collapse">
            <div class="c-grid__u c-grid__u_large_9of12"><!-- c-grid__u_large_3of4 c-grid__u_xlarge_5of6 -->
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
            <div class="c-grid__u c-grid__u_large_3of12 p-footer__copyright">
              <div class="footer-info">
                <!-- <?php the_field('footer_text' , 'option');?> found under Theme Settings -->
                <span class="footer-contact" style="margin-top: 2.5rem; color: #fff;">© <?= date('Y') ?> WHILL Inc. All Rights Reserved.</span>
              </div>
            </div>
          </div>
        </div>

  		</div>
  	</div>

  </footer>

  <?php if(!isset($_COOKIE['loc'])): ?>
    <div class="overlay choose-region closed <?= $current ?>">
      <div class="overlay-header">
        <div class="top-header">
          <div class="top-logo">
            <img src="https://whill.inc/choose-country-region/img/header_logo@2x.png"/>
          </div>
          <div class="close-btn">
  					<a href="#"><span>✕</span></a>
  				</div>
        </div>
        <div class="overlay-title">
          <div class="headingWrapper">
            <h2 class="heading">Choose a Country<span class="pc-only">&nbsp;</span><br class="sp-only">or Region</h2>
          </div>
        </div>
      </div>
      <div class="regionWrapper">

        <section class="region">
            <dl>
                <dt>Asia</dt>
                <dd><a data-value='zh' href="https://https://corporate-stg-cf.whill.inc/cn/">China</a></dd>
                <dd><a data-value='zh' href="https://corporate-stg-cf.whill.inc/hk/">Hong Kong</a></dd>
                <dd><a data-value='jp' href="https://corporate-stg-cf.whill.inc/jp/">Japan</a></dd>
                <dd><a data-value='zh' href="https://corporate-stg-cf.whill.inc/tw/">Taiwan</a></dd>
            </dl>
        </section>

        <section class="region">
            <dl>
                <dt>Europe</dt>
                <dd><a data-value='fr' href="https://corporate-stg-cf.whill.inc/fr/">France</a></dd>
                <dd><a data-value='de' href="https://corporate-stg-cf.whill.inc/de/">Germany</a></dd>
                <dd><a data-value='it' href="https://corporate-stg-cf.whill.inc/it/">Italy</a></dd>
                <dd><a data-value='nl' href="https://corporate-stg-cf.whill.inc/nl/">Netherlands</a></dd>
                <dd><a data-value='es' href="https://corporate-stg-cf.whill.inc/es/">Spain</a></dd>
                <dd><a data-value='en' href="https://corporate-stg-cf.whill.inc/gb/">United Kingdom</a></dd>
            </dl>
        </section>

        <section class="region">
            <dl>
                <dt>North America</dt>
                <dd><a data-value='en' href="https://corporate-stg-cf.whill.inc/ca/">Canada</a></dd>
                <dd><a data-value='en' href="https://corporate-stg-cf.whill.inc/us/">United States</a></dd>
            </dl>
        </section>

      </div>
    </div>
  <?php endif; ?>
<!--</div>-->

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

<?php
// 2020-08-16 依頼
// MaaSページはヘルプを非表示に
$name = get_the_name();
if('maas-business'!==$name){
  ?>
  <!-- Start of whillsupport Zendesk Widget script -->
  <script>/*<![CDATA[*/window.zEmbed||function(e,t){var n,o,d,i,s,a=[],r=document.createElement("iframe");window.zEmbed=function(){a.push(arguments)},window.zE=window.zE||window.zEmbed,r.src="javascript:false",r.title="",r.role="presentation",(r.frameElement||r).style.cssText="display: none",d=document.getElementsByTagName("script"),d=d[d.length-1],d.parentNode.insertBefore(r,d),i=r.contentWindow,s=i.document;try{o=s}catch(e){n=document.domain,r.src='javascript:var d=document.open();d.domain="'+n+'";void(0);',o=s}o.open()._l=function(){var e=this.createElement("script");n&&(this.domain=n),e.id="js-iframe-async",e.src="https://assets.zendesk.com/embeddable_framework/main.js",this.t=+new Date,this.zendeskHost="whillsupport.zendesk.com",this.zEQueue=a,this.body.appendChild(e)},o.write('<body onload="document._l();">'),o.close()}();
      /*]]>*/</script>
  <!-- End of whillsupport Zendesk Widget script -->
  <?php
}
?>

</body>
</html>
