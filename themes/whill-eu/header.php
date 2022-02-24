<?php
global $wp;
if(!is_home()) {
        if($wp->request == 'partner') {
        $userArray = array("whillpartner" => "yesiwhill");
        basic_auth($userArray);
    }
}
function get_client_ip() {
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
$country	= $json['country'];
$current = strtoupper(substr($_SERVER['REQUEST_URI'],1,2));

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

if( ( ($country == $current && !isset($_GET['ref'])) || (isset($_GET['loc'])) ) && !isset($_COOKIE['loc']) ){
  foreach ($country_sites as $key => $c){
    if($country == $key){
      setcookie('loc',$c['value']);
    } else {
      setcookie('loc',strtolower($country));
    }
  }
}

$notCurrentnoCookie = ($country != $current && !isset($_COOKIE['loc']));
if( $notCurrentnoCookie && !isset($_GET['loc']) && !isset($_GET['ref']) ){
	$url = "https://whill.inc/" . strtolower($country);
	$header_data = @get_headers($url);
	$verify = $header_data[0]; // moved
	$verify2 = $header_data[11]; // after move
	if(!strpos($verify, '404') && !strpos($verify2, '404')){
		// header("Location: " . $url . "?ref=".substr($_SERVER['REQUEST_URI'],1,2));
	} else {
		// header("Location: https://whill.inc/gb?ref=".substr($_SERVER['REQUEST_URI'],1,2));
	}
}
?>

<!doctype html>
<html lang="<?php echo whill_get_lang_code(); ?>" class="no-webp">
<head>
    <meta charset="UTF-8">
    <?php if (defined('WP_DEV') && WP_DEV): ?>
    <meta name="robots" content="noindex">
    <?php endif; ?>
    <meta name="viewport" content="width=device-width, initial-scale=1.0,  minimum-scale=1.0, user-scalable=yes">
    <meta name="google-site-verification" content="LV-UwqJiVwF6lU0BKea3RR6kdc3XmK4mWSoksqVTofw" />
    <link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/favicon.ico" type="image/vnd.microsoft.icon"/>
    <?php if (is_front_page()): ?>
    <link rel="alternate" hreflang="ja" href="https://whill.inc/jp/" />
    <?php endif; ?>

    <?php get_template_part( 'check_support_webp'); ?>
    <?php get_template_part( 'fonts-com'); ?>
    <?php wp_head(); ?>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-173934998-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'UA-173934998-1');
    </script>
</head>
<body <?php body_class(); ?>>
<div id="viewport" class="l-body" data-fixed-body>
  <header class="p-navbar" data-fixed-navbar data-scroll-addclass="p-navbar_small">
    <?php if(!isset($_COOKIE['loc'])): ?>
      <div id="storeSelect" class="" style="display: none;">
        <div class="custom-select-wrapper">
            <div class="custom-select">
                <div class="custom-select__trigger">
                  <?php foreach ($country_sites as $key => $c): ?>
                    <?php if($current == $key): // if country is the same as domain country ?>
                      <img src="./wp-content/themes/whill-eu/assets/dist/images-eu/lang-<?=strtolower($current)?>.png" alt="" />
                      <span><?php $str = str_replace("\r\n",'', $c['country']); echo $str; ?></span><div class="arrow"></div>
                    <?php endif;?>
                  <?php endforeach; ?>
                </div>
                <div class="custom-options">
                  <?php foreach ($country_sites as $key => $c): ?>
                    <?php if($current == $key): /*($country == $key) && $country == $current*/ // same as above for adding selected option ?>
                      <div class="custom-option selected">
                        <img src="./wp-content/themes/whill-eu/assets/dist/images-eu/lang-<?=strtolower($current)?>.png" alt="" />
                        <span class="" data-href="<?=$c['href']?>" data-value="<?=$c['value']?>"><?=$c['country']?></span>
                      </div>
                    <?php endif;?>
                  <?php endforeach; ?>

                    <div class="custom-option">
                      <img src="./wp-content/themes/whill-eu/assets/dist/images-eu/intl.png" alt="" />
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
        <h1 class="p-navbar__brand"><a href="<?php echo whill_get_permalink(); ?>"><img src="<?php echo get_template_directory_uri(); ?>/assets/dist/images/logo.svg" alt="WHILL"/></a></h1>
        <button class="p-navbar__toggle c-menu-btn" data-slidemenu-target=".slidemenu-target" title="menu"><span></span></button>
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
                'container' => false,
              ] );?>
              <!-- 20201006 Hide the lang switcher -->
              <!-- <li class="menu-item menu-item-lang-switcher menu-item-has-children p-navigation__item active">
                <a>
          				<span class="flag <?php echo defined('ICL_LANGUAGE_CODE') ? ICL_LANGUAGE_CODE : 'en'; ?>"></span>
          				<span class="p-navigation__text"><?php _e('Language', 'whill-theme'); ?></span>
                </a>
                <span class="sub-menu-label"><?php _e('Select Your Language', 'whill-theme'); ?></span>
                <ul class="sub-menu">
                  <?php foreach (icl_get_languages('skip_missing=0') as $lang): ?>
                    <li class="menu-item p-navigation__item">
                      <a href="<?php echo $lang['url']; ?>">
                        <span class="flag <?php echo $lang['code']; ?>"></span>
                        <span class="p-navigation__text"><?php echo $lang['translated_name']; ?></span>
                      </a>
                    </li>
                  <?php endforeach; ?>
                </ul>
              </li> -->
            </ul>
          </div>
        </nav>

      </div>

    </div>
  </header>
