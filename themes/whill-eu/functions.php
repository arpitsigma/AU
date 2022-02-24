<?php
require dirname( __FILE__ ) . '/lib/Image.php';
require dirname( __FILE__ ) . '/lib/Tiny_MCE.php';
require dirname( __FILE__ ) . '/lib/Assets.php';
require dirname( __FILE__ ) . '/lib/Support.php';

use WHILL\Assets;
use WHILL\Image;
use WHILL\Support;
use WHILL\Tiny_MCE;



function theme_image_sizes() {
  set_post_thumbnail_size( 576, 324, true );
  add_image_size( '1x1', 400, 400, true );
  add_image_size( '1x2', 400, 800, true );
  add_image_size( '2x1', 800, 400, true );
  add_image_size( 'page_header', 1200, 648, true );
  add_image_size( 'origin_size', 1600, 700, true );
//  add_image_size( 'customer_voice_main', 1600, 800, true );
//  add_image_size( 'customer_voice_sub', 780, 500, true );

  $image = new Image();
  //$image->add_size( 'viewport', 2000, 1000, false, true, $label = 'ビューポートサイズ' );
}
add_action( 'after_setup_theme', 'theme_image_sizes' );



/**
 *
 * Theme Initialize
 *
 */
function theme_setup() {

  new Assets();
  new Tiny_MCE();
  new Support();

  register_nav_menus( array(
    'primary'     => __( 'Top Primary Menu' ),
    'footer_menu' => __( 'Footer Menu' ),
    'secondary'   => __( 'Footer Links' ),
  ) );


}
add_action( 'after_setup_theme', 'theme_setup' );

add_filter( 'nav_menu_css_class', function ( $classes, $item, $args, $depth ) {
  if ( ! empty( $args->li_class ) ) {
    $classes[] = $args->li_class;
  }

  return $classes;
}, 10, 4 );



function remove_video_control( $html ) {
  return str_replace('controls="controls"', 'loop="true"', $html);
}
//add_filter( 'wp_video_shortcode', 'remove_video_control' );

/**
 *
 * get post thumbnail image uri.
 *
 * @param string $size
 *
 * @return string|bool
 */
function get_post_thumbnail_src( $size = 'post-thumbnail' ) {
  $attachment = wp_get_attachment_image_src( get_post_thumbnail_id(), $size );

  if ( isset( $attachment[0] ) ) {
    return $attachment[0];
  } else {
    return false;
  }
}



if ( ! function_exists( 'get_the_name' ) ) {
  function get_the_name() {
    $post = get_post();

    return ! empty( $post ) ? $post->post_name : false;
  }
}



//add_filter('jetpack_youtube_allow_autoplay', '__return_true');



if ( function_exists( 'acf_add_options_page' ) ) {
  //acf_add_options_page();

  acf_add_options_page(array(
    'page_title' => 'Theme General Settings',
    'menu_title' => 'Theme Settings',
    'menu_slug'  => 'theme-general-settings',
    'capability' => 'edit_posts',
    'redirect'   => false
  ));
}

function do_excerpt($string, $word_limit) {
  $words = explode(' ', $string, ($word_limit + 1));
  if (count($words) > $word_limit)
  array_pop($words);
  echo implode(' ', $words).' ...';
}

function sort_resellers($a, $b) {
    return get_field('reseller_location', $a->ID) > get_field('reseller_location', $b->ID);
}

function get_local_resellers() {
    $query = new WP_Query([ 'post_type' => 'resellers', "orderby" => "menu_order", "nopaging" => true]);
    $localResellers = $query->get_posts();
    usort($localResellers, 'sort_resellers');
    return $localResellers;
}

function the_title_trim($title) {

  $title = esc_attr($title);

  $findthese = array(
    '#Protected:#',
    '#Private:#'
  );

  $replacewith = array(
    '', // What to replace "Protected:" with
    '' // What to replace "Private:" with
  );

  $title = preg_replace($findthese, $replacewith, $title);
  return $title;
}
add_filter('the_title', 'the_title_trim');

/**
 * Register our sidebars and widgetized areas.
 *
 */
function whill_widgets_init() {

  register_sidebar( array(
    'name'          => 'Floating right|bottom popup',
    'id'            => 'floating_right_bottom_popup',
    'before_widget' => '<div>',
    'after_widget'  => '</div>',
    'before_title'  => '<h3 style="margin: 0 auto;">',
    'after_title'   => '</h3>',
  ) );

}
add_action( 'widgets_init', 'whill_widgets_init' );

/*
function add_async_attribute($tag, $handle) {
    $scripts_to_async = array('jquery');
    foreach($scripts_to_async as $async_script) {
      if ($async_script === $handle) {
         return str_replace(' src', ' async="async" src', $tag);
      }
    }
    return $tag;
}

add_filter('script_loader_tag', 'add_async_attribute', 10, 2);

function add_defer_attribute($tag, $handle) {
    $scripts_to_defer = array('jquery-easing', 'jquery-magnific-popup');
    foreach($scripts_to_defer as $defer_script) {
      if ($defer_script === $handle) {
         return str_replace(' src', ' defer="defer" src', $tag);
      }
    }
    return $tag;
}

add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);
*/

// Custom Scripting to Move JavaScript from the Head to the Footer
/*function remove_head_scripts() {
   remove_action('wp_head', 'wp_print_scripts');
   remove_action('wp_head', 'wp_print_head_scripts', 9);
   remove_action('wp_head', 'wp_enqueue_scripts', 1);

   add_action('wp_footer', 'wp_print_scripts', 5);
   add_action('wp_footer', 'wp_enqueue_scripts', 5);
   add_action('wp_footer', 'wp_print_head_scripts', 5);
}
add_action( 'wp_enqueue_scripts', 'remove_head_scripts' );*/

// END Custom Scripting to Move JavaScript

// Don't show warnings about deprecated php functions
error_reporting(E_ALL & ~E_DEPRECATED & ~E_NOTICE);

// Extend navigation
function prefix_nav_description( $item_output, $item, $depth, $args ) {
    if ( !empty( $item->description ) ) {
        $item_output = str_replace( $args->link_after . '</a>', '<br><span class="menu-item-description">' . $item->description . '</span>' . $args->link_after . '</a>', $item_output );
    }

    return $item_output;
}
add_filter( 'walker_nav_menu_start_el', 'prefix_nav_description', 10, 4 );

// Enable 'Email' sharing
add_filter( 'sharing_services_email', '__return_true' );

function jptweak_remove_share() {
    remove_filter( 'the_content', 'sharing_display', 19 );
    remove_filter( 'the_excerpt', 'sharing_display', 19 );
    if ( class_exists( 'Jetpack_Likes' ) ) {
        remove_filter( 'the_content', array( Jetpack_Likes::init(), 'post_likes' ), 30, 1 );
    }
}
add_action( 'loop_start', 'jptweak_remove_share' );

/* WHILL EU */
function whill_excerpt_more($more) {
  return '';
}
add_filter('excerpt_more', 'whill_excerpt_more');
add_filter('wp_calculate_image_srcset', '__return_false');

function whill_get_lang_code() {
  return defined('ICL_LANGUAGE_CODE') ? ICL_LANGUAGE_CODE : 'en';
}

function whill_get_permalink($slug = null) {
  $id = isset($slug) ? get_page_by_path($slug)->ID : get_option('page_on_front');

  return apply_filters('wpml_permalink', get_permalink($id), whill_get_lang_code());
}

remove_filter('the_title', 'wptexturize');
remove_filter('the_content', 'wptexturize');
remove_filter('the_excerpt', 'wptexturize');

function basic_auth($auth_list,$realm="Restricted Area",$failed_text="Failed in Authentication"){
	if (isset($_SERVER['PHP_AUTH_USER']) and isset($auth_list[$_SERVER['PHP_AUTH_USER']])){
		if ($auth_list[$_SERVER['PHP_AUTH_USER']] == $_SERVER['PHP_AUTH_PW']){
			return $_SERVER['PHP_AUTH_USER'];
		}
	}
	header('WWW-Authenticate: Basic realm="'.$realm.'"');
	header('HTTP/1.0 401 Unauthorized');
	header('Content-type: text/html; charset='.mb_internal_encoding());
	die($failed_text);
}
