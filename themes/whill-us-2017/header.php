<!doctype html>
<html lang="en" class="no-webp">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0,  minimum-scale=1.0, user-scalable=yes">
    <meta name="google-site-verification" content="LV-UwqJiVwF6lU0BKea3RR6kdc3XmK4mWSoksqVTofw" />
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="image/vnd.microsoft.icon"/>
    <link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css"/>
    <?php if(is_front_page()):?>
        <link rel="alternate" hreflang="en" href="https://whill.inc/us/" />
        <link rel="alternate" hreflang="ja" href="https://whill.inc/jp/" />
    <?php endif;?>
    <?php get_template_part( 'check_support_webp'); ?>
    <?php get_template_part( 'fonts-com'); ?>
    <?php wp_head(); ?>

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <!-- test -->
  	<?php /*function get_client_ip() {
  	    $ipaddress = '';
  	    if (isset($_SERVER['HTTP_CLIENT_IP']))
  	        $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
  	    else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
  	        $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
  	    else if(isset($_SERVER['HTTP_X_FORWARDED']))
  	        $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
  	    else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
  	        $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
  	    else if(isset($_SERVER['HTTP_FORWARDED']))
  	        $ipaddress = $_SERVER['HTTP_FORWARDED'];
  	    else if(isset($_SERVER['REMOTE_ADDR']))
  	        $ipaddress = $_SERVER['REMOTE_ADDR'];
  	    else
  	        $ipaddress = 'UNKNOWN';
  	    return $ipaddress;
  	}
  	$PublicIP = get_client_ip();
  	$PublicIP = substr($PublicIP, 0, strpos($PublicIP, ','));
  	$json     = file_get_contents("http://ipinfo.io/$PublicIP/geo");
  	$json			= json_decode($json, true);
  	$country	= $json['country'];*/
	
	$accessKey = 'LoBw5YrUelcIp9E';
    $current = strtoupper(substr($_SERVER['REQUEST_URI'],1,2));
	$currentUrl = substr($_SERVER['REQUEST_URI'],1,2);

    $country_sites = array(
  		'US' => array(
  			'country' => 'USA',
  			'href' => '/us',
  			'value' => 'en'
  		),
  		'CA' => array(
  			'country' => 'Canada (English)',
  			'href' => '/ca',
  			'value' => 'en'
  		),
      'FR' => array(
  			'country' => 'France',
  			'href' => '/fr',
  			'value' => 'fr'
  		),
      'DE' => array(
  			'country' => 'Germany',
  			'href' => '/de',
  			'value' => 'de'
  		),
      'IT' => array(
  			'country' => 'Italy',
  			'href' => '/it',
  			'value' => 'it'
  		),
      'NL' => array(
  			'country' => 'Netherlands',
  			'href' => '/nl',
  			'value' => 'nl'
  		),
      'ES' => array(
  			'country' => 'Spain',
  			'href' => '/es',
  			'value' => 'es'
  		),
      'GB' => array(
  			'country' => 'United Kingdom',
  			'href' => '/gb',
  			'value' => 'en'
  		)
  	);

  	// if($country == 'CA' && !isset($_COOKIE['loc'])) setcookie('loc','en');
    // if( ( ($country == $current && !isset($_GET['ref'])) || (isset($_GET['loc'])) ) && !isset($_COOKIE['loc']) ) setcookie('loc','en');
/*    if( ( ($country == $current && !isset($_GET['ref'])) || (isset($_GET['loc'])) ) && !isset($_COOKIE['loc']) ){
      foreach ($country_sites as $key => $c){
        if($country == $key){
          setcookie('loc',$c['value']);
        } else {
          setcookie('loc',strtolower($country));
        }
      }
    }*/
	
	//uncomment later
	// if( ( (isset($_GET['loc'])) ) && !isset($_COOKIE['loc']) ){
		// $exist = false;
		// foreach ($country_sites as $key => $c){
			// if(strtoupper($_GET['loc']) == $key){
				// $exist = true;
				// setcookie('loc',$c['value']);
			// }
		// }
		// if($exist == false) setcookie('loc','en');
	// }
	//uncomment later
	
/*
    $notCurrentnoCookie = ($country != $current && !isset($_COOKIE['loc']));
    // if($notCAnoCookie && !isset($_GET['loc'])) header("Location: http://corporate-stg-cf.whill.inc/" . strtolower($country) . "?ref=".substr($_SERVER['REQUEST_URI'],1,2));
    if( $notCurrentnoCookie && !isset($_GET['loc']) && !isset($_GET['ref']) ){
  		$url = "https://corporate-stg-cf.whill.inc/" . strtolower($country);
  		$header_data = @get_headers($url);
  		$verify = $header_data[0]; // moved
  		$verify2 = $header_data[11]; // after move
  		if(!strpos($verify, '404') && !strpos($verify2, '404')){
  			header("Location: " . $url . "?ref=".substr($_SERVER['REQUEST_URI'],1,2));
  		} else {
  			header("Location: http://corporate-stg-cf.whill.inc/us?ref=".substr($_SERVER['REQUEST_URI'],1,2));
  		}
  	}

    function getCountry( $var = NULL )
  {
      static $internal;
      if ( NULL !== $var )
      {
          $internal = $var;
      }
      return $internal;
  }
  getCountry($country);
  function getCountryList( $var = NULL )
  {
    static $internal;
    if ( NULL !== $var )
    {
        $internal = $var;
    }
    return $internal;
  }
  getCountryList($country_sites);*/
  	?>
  	<script type="text/javascript">
  		// console.log(<?= '"'.$PublicIP.'"' ?>);
  		// console.log(<?= '"'.$country.'"' ?>);
  		// console.log(<?='"'.$_SERVER['HTTP_ACCEPT_LANGUAGE'].'"'?>);
      // console.log("<?=$current?>");
	  
	  /*uncomment later*/
	    // function createCookie(name, value) {
			// var expires; 
			// var date = new Date(); 
			// date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000)); 
			// expires = "; expires=" + date.toGMTString();
			// document.cookie = escape(name) + "=" +  
				// escape(value) + expires + "; path=/"; 
		// }
		// function getCookie(name) {
			// var dc = document.cookie;
			// var prefix = name + "=";
			// var begin = dc.indexOf("; " + prefix);
			// if (begin == -1) {
				// begin = dc.indexOf(prefix);
				// if (begin != 0) return null;
			// }
			// else
			// {
				// begin += 2;
				// var end = document.cookie.indexOf(";", begin);
				// if (end == -1) {
				// end = dc.length;
				// }
			// }
			// /* because unescape has been deprecated, replaced with decodeURI
			// return unescape(dc.substring(begin + prefix.length, end)); */
			// return decodeURI(dc.substring(begin + prefix.length, end));
		// } 
		// function getUrlParameter(o) {
		    // o = o.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
			// var e = new RegExp("[\\?&]" + o + "=([^&#]*)").exec(location.search);
			// return null === e ? "" : decodeURIComponent(e[1].replace(/\+/g, " "))
		// }
		// function topPad(q) {
			// if (q.matches) {
				// $('div#viewport').css('paddingTop', '70px');
			// } else {
				// $('div#viewport').css('paddingTop', '70px');
			// }
		// }
		// var JSip, geoLoc, geoLocHref, geoLocLang, loc, storeSelect, urlRedirect;
		// var paramRef = getUrlParameter("ref");
		// var paramLoc = getUrlParameter("loc");//new URLSearchParams(window.location.search);
		// var mediaMatch = window.matchMedia("(max-width: 767px;)");
		// var countrySites = new Array();
		// countrySites = <?php echo json_encode($country_sites); ?>;
		// var endpoint = "https://pro.ip-api.com/json/?fields=61439&key=<?= $accessKey ?>";
		// var ck = document.cookie.indexOf('loc');
		// var xhr = new XMLHttpRequest();
		// var xhr = new XMLHttpRequest();
		// xhr.onreadystatechange = function() {
			// if (this.readyState == 4 && this.status == 200) {
				// var response = JSON.parse(this.responseText);
				// if(response.status !== 'success') {
					// console.log('query failed: ' + response.message);
					// return
				// }
				// geoLoc = response.countryCode;
				
				// $.each(countrySites, function(key, value) {
					// if(key == geoLoc) {
						// geoLocHref = value.href;
						// geoLocLang = value.value;
					// }
				// });
				// /*  console.log("geoLoc: " + geoLoc);
				 // console.log("geoLocHref: " + geoLocHref);
				 // console.log("geoLocLang: " + geoLocLang); */
				// if (ck != -1) { storeSelect = $('#storeSelect').detach(); topPad(mediaMatch); mediaMatch.addListener(topPad); }
				// if("<?=$current?>" == geoLoc && paramRef == "") {
					// (ck != 0) ? createCookie('loc' , geoLocLang) : "";
					// storeSelect = $('#storeSelect').detach();
					// topPad(mediaMatch);
					// mediaMatch.addListener(topPad);
				// } else {
					// if( paramRef == "" && ck != 0 ) {
								// var status;
								// urlRedirect = "https://corporate-stg-cf.whill.inc"+geoLocHref;
								// console.log("urlRedirect: " + urlRedirect);
								// $.ajax({
									// type: 'POST',
									// url: '/us/wp-content/themes/whill-us-2017/urlcheck.php',
									// data: { 'data' : urlRedirect },
									// success: function(response){
										// /* console.log("Response: " + response); */
										// if(response == 200){
											// window.location.replace(urlRedirect + "?ref=<?=$currentUrl?>");
											// console.log(response + " - " + urlRedirect);
										// } else {
											// window.location.replace("https://corporate-stg-cf.whill.inc/us?ref=<?=$current?>");
											// console.log(response + " - " + urlRedirect);
										// }
									// }
								// });
					// }
				// }
			// }
		// };
		// xhr.open('GET', endpoint, true);
		// xhr.send();
		/*uncomment later*/
		
		/* // test section detect for parallax
		window.addEventListener('scroll', function() {
			var element = document.querySelectorAll('.we-are-whill')[0];
			var position = element.getBoundingClientRect();

			// checking whether fully visible
			if(position.top >= 0 && position.bottom <= window.innerHeight) {
				//console.log('Element is fully visible in screen');
			}

			// checking for partial visibility
			if(position.top < window.innerHeight && position.bottom >= 0) {
				//console.log('Element is partially visible in screen | top: ' + position.top + ', bottom: ' + position.bottom);
				if( (position.top * -1) >= 40 ) {
					var pos = (position.top * -1);
					//$('.we-are-whill .p-page-header__container').css('marginTop', 'calc(60px + ' + pos +'px)');
					//$('.we-are-whill .p-page-header__container').css('marginTop', pos +'px');
				}
			}
		});*/
		/* 
		var observer = new IntersectionObserver(function(entries) {
			// isIntersecting is true when element and viewport are overlapping
			// isIntersecting is false when element and viewport don't overlap
			if(entries[0].isIntersecting === true)
				console.log('Element has just become visible in screen');
		}, { threshold: [0] });

		//$(document).ready(function (){
		$(function() {
			const waw = document.querySelectorAll('.we-are-whill')[0]; observer.observe(waw);
		});
		//console.log($('.we-are-whill:first-of-type')); */
		function openFixedForm() {
			$('.fixed-form-drawer').toggleClass("open");
			if (window.innerWidth < 1000) {
				$('body').toggleClass('stop');
				$('header.p-navbar_small').toggle();
			}
		}
		$(function() {
			$('.p-navbar-search__toggle').first().click(function() {
				if( $('.p-navbar__toggle').first().hasClass('is-open') && $('.c-slidemenu.p-navbar__slidemenu').first().hasClass('is-open') ) {
					$('.p-navbar__toggle').removeClass('is-open');
					$('.c-slidemenu.p-navbar__slidemenu').removeClass('is-open');
					$('.c-slidemenu.p-navbar__slidemenu').css('height', 0);
					$('body').css( {'height':'auto','overflow':'visible'} );
				}
				$(this).toggleClass('is-open');
				//$('.whill-2021 header.p-navbar_small .search-form').toggleClass('is-open');
				$('.whill-2021 header.p-navbar_small #ajaxsearchlite1').toggleClass('is-open');
				$('.whill-2021 header.p-navbar_small .c-slidemenu').toggle();
				if (window.innerWidth < 1000) { $('.p-navbar__toggle').toggle(); }
				$('body').toggleClass('stop');
				 setTimeout(function(){
					// if( $('header.p-navbar').first().hasClass('scrdown-nav-hide') ){
						$('header.p-navbar').removeClass('scrdown-nav-hide');//$('header.p-navbar').addClass('scrup-nav-show');
					// }
				 }, 50);
				
				$('#ajaxsearchlite1 .probox .proinput input[type="search"]').focus();
			});
			
			/*go-below*/
			$('.go-below').click(function(c) {
				var homeTop = $('main .p-jumbotron:first-child').next(),
				homeSections = $('main .p-jumbotron:nth-child(2)');
				// console.log(homeTop.offset().top);
				// console.log(homeSections.scrollTop());
				c.preventDefault();
				$('html, body').animate({
					scrollTop: ( homeSections.scrollTop() != null ? homeSections.scrollTop() : 0 ) + homeTop.offset().top
				}, 700)
			});
			/*fixed-form-drawer*/
			//$('.fixed-form-drawer .fixed-form-title > span').click(function() {
			$('.fixed-form-drawer .fixed-form-title').click(function() { openFixedForm(); });
			$('a.openForm').click(function(c){
				c.preventDefault(); openFixedForm();
			});
			$('.fixed-form-drawer .x-btn').click(function() {
				console.log('close drawer');
			});
			/*store locator widget*/
			$('#store_locator_address_field').attr('placeholder', 'Enter Zip/Postal Code');
			
			$('.jarallax').jarallax({
				speed: 0.3,
				disableParallax: /iPad|iPhone|iPod|Android/,
				disableVideo: /iPad|iPhone|iPod|Android/
			});
		});
  	</script>
  	<!-- test end -->
</head>
<body <?php body_class(); ?>>

<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5HV78RW" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->

<div id="viewport" class="l-body whill-2021 view-<?php echo get_the_name(); ?>" data-fixed-body>
    <!--<header class="p-navbar" data-fixed-navbar data-scroll-addclass="p-navbar_small">-->
	<header class="p-navbar p-navbar_small" data-fixed-navbar>
      <?php if(!isset($_COOKIE['loc'])): ?>
  			<div id="storeSelect" class="" style="display: none;">
  				<div class="custom-select-wrapper">
  				    <div class="custom-select">
  				        <div class="custom-select__trigger">
                    <?php foreach ($country_sites as $key => $c): ?>
                      <?php if($current == $key): // if country is the same as domain country ?>
      									<img src="https://corporate-stg-cf.whill.inc/ca/wp-content/themes/whill-us-2017/assets/dist/images/flags/<?=$current?>.png" alt="" />
      									<span><?php $str = str_replace("\r\n",'', $c['country']); echo $str; ?></span><div class="arrow"></div>
                      <?php endif;?>
                    <?php endforeach; ?>
  				        </div>
  				        <div class="custom-options">
                    <?php foreach ($country_sites as $key => $c): ?>
                      <?php if($current == $key): /*($country == $key) && $country == $current*/ // same as above for adding selected option ?>
                        <div class="custom-option selected">
                          <img src="https://corporate-stg-cf.whill.inc/ca/wp-content/themes/whill-us-2017/assets/dist/images/flags/<?=$current?>.png" alt="" />
      										<span class="" data-href="<?=$c['href']?>" data-value="<?=$c['value']?>"><?=$c['country']?></span>
                        </div>
                      <?php endif;?>
                    <?php endforeach; ?>

                      <?php foreach ($country_sites as $key => $c): ?>
  											<?php if(($country == $key) && $country != $current): // if country is not the same as domain country, add multi-language in the future?>
                          <!-- <div class="custom-option">
                            <img src='<?= "https://corporate-stg-cf.whill.inc/ca/wp-content/themes/whill-us-2017/assets/dist/images/flags/".$country.".png" ?>' alt="" />
    												<span class="" data-href="<?=$c['href']?>" data-value="<?=$c['value']?>"><?=$c['country']?></span>
                          </div> -->
  											<?php endif;?>
  										<?php endforeach; ?>
                      <div class="custom-option">
                        <img src="<?php echo site_url(); ?>/wp-content/themes/whill-us-2017/assets/dist/images/flags/intl.png" alt="" />
    				            <span class="" data-value="other">Other Region</span>
                      </div>
  				        </div>
  				    </div>
  				</div>
  				<div class="close-btn">
  					<a href="#" id="store">
  						<span>✕</span></a>
  				</div>
  			</div>
  		<?php endif;?>
        <div class="c-container c-container_full">
            <div class="p-navbar__container">
                <div class="p-navbar__brand"><a href="<?php echo site_url('/'); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/dist/images/logo.svg" alt="WHILL"/></a>
                </div>
                <button class="p-navbar__toggle c-menu-btn" data-slidemenu-target=".slidemenu-target" title="menu">
                    <span></span></button>
                <div class="p-navbar__spacer"></div>

                <nav class="c-slidemenu p-navbar__slidemenu slidemenu-target" role="navigation">
                    <div class="p-navigation">

                        <ul class="p-navigation__items">

                            <?php wp_nav_menu( [
                                'theme_location' => 'primary',
                                'menu_class' => 'p-navigation',
                                'li_class' => 'p-navigation__item',
                                'link_before'   => '<span class="p-navigation__text">',
                                'link_after'    => '</span>',
                                'items_wrap'=> '%3$s',
                                'container' => false
                            ] );?>

                        </ul>

                    </div>
                </nav>
				<button class="p-navbar-search__toggle c-menu-btn" title="search-mobile">
                    <span></span></button>
<?php echo do_shortcode('[wpdreams_ajaxsearchlite]'); ?>
            </div>


        </div>

    </header>
