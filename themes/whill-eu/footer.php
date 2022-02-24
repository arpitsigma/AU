<footer class="p-footer" role="contentinfo">
  <?php if(!isset($_COOKIE['loc'])): ?>
    <script type="text/javascript">
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
              $('div#viewport').css('paddingTop', 'unset');
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
  <div class="p-band p-band_dark">
    <a class="pagetop" data-component="pagetop"><?php _e('Go to Pagetop', 'whill-theme'); ?></a>
  </div>
  <div class="p-band p-band_footer p-footer__info">
    <div class="c-container">
      <div class="c-grid c-grid_collapse">
        <div class="c-grid__u c-grid__u_large_6of12">

          <div class="p-navigation">
            <div class="p-footer__nav">
              <ul class="p-navigation__items">
                <?php wp_nav_menu([
                  'theme_location' => 'secondary',
                  'li_class'       => ' p-navigation__item',
                  'link_before'    => '<span class="p-navigation__text">',
                  'link_after'     => '</span>',
                  'items_wrap'     => '%3$s',
                  'container'      => false,
                ]); ?>
              </ul>
            </div>
          </div>

          <div class="p-footer__nav">
            <div class="c-grid c-grid_collapse">
              <div class="c-grid__u c-grid__u_large_4of4 c-grid__u_xlarge_6of6">
                <ul class="c-grid c-grid_collapse p-footer__links">
                  <?php wp_nav_menu([
                    'theme_location' => 'tertiary',
                    'items_wrap'     => '%3$s',
                    'container'      => false,
                  ]); ?>
                </ul>
              </div>
            </div>
          </div>

        </div>
        <div class="c-grid__u c-grid__u_large_6of12">
          <div class="nav-socials">
            <a href="https://www.youtube.com/channel/UCH3L6VmeSVubdkZghEGOVDg/featured" class="header-youtube" target="_blank"><img src="<?php echo get_template_directory_uri(); ?>/assets/dist/images/icon-youtube.png" scale="0" /> <span class="label">YouTube</span></a>
          </div>
          <div class="footer-info">
            <p><span class="footer-contact">WHILL Europe B.V.<br><a href="mailto:info@whill-europe.com">info@whill-europe.com</a></span></p>
            <ul class="footer-info-list">
              <li>Johan Cruijff Boulevard 61, 1101 DL, Amsterdam, The Netherlands</li>
              <li>Commercial register number: 72465700&nbsp;&nbsp;&nbsp;&nbsp;Sales tax identification number: NL859118666B01</li>
            </ul>
            <p><span class="footer-copyright">Copyright © <?php echo date('Y'); ?> WHILL, Inc. All Rights Reserved.</span></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
<?php if(!isset($_COOKIE['loc'])): ?>
  <div class="overlay choose-region closed">
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
              <dd><a data-value='zh' href="https://whill.inc/cn/">China</a></dd>
              <dd><a data-value='zh' href="https://whill.inc/hk/">Hong Kong</a></dd>
              <dd><a data-value='jp' href="https://whill.inc/jp/">Japan</a></dd>
              <dd><a data-value='zh' href="https://whill.inc/tw/">Taiwan</a></dd>
          </dl>
      </section>

      <section class="region">
          <dl>
              <dt>Europe</dt>
              <dd><a data-value='fr' href="https://whill.inc/fr/">France</a></dd>
              <dd><a data-value='de' href="https://whill.inc/de/">Germany</a></dd>
              <dd><a data-value='it' href="https://whill.inc/it/">Italy</a></dd>
              <dd><a data-value='nl' href="https://whill.inc/nl/">Netherlands</a></dd>
              <dd><a data-value='es' href="https://whill.inc/es/">Spain</a></dd>
              <dd><a data-value='en' href="https://whill.inc/gb/">United Kingdom</a></dd>
          </dl>
      </section>

      <section class="region">
          <dl>
              <dt>North America</dt>
              <dd><a data-value='en' href="https://whill.inc/ca/">Canada</a></dd>
              <dd><a data-value='en' href="https://whill.inc/us/">United States</a></dd>
          </dl>
      </section>

    </div>
  </div>
<?php endif; ?>
</div>

<?php wp_footer();?>
</body>
</html>
