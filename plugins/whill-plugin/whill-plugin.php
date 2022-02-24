<?php

/*
Plugin Name: WHILL Plugin
Description: WHILL Plugin
Author: Toro_Unit / Updated by GFL
*/

namespace WHILL;

use Torounit\WPLibrary\Post_Type;

require "lib/Post_Type.php";

//add_filter( 'jetpack_development_mode', '__return_true' );
new Post_Type( 'customers_voice', 'Experiences', [
	'labels'             => array(
		'name'               => 'Lifestyle Experiences',
		'singular_name'      => 'Experience',
		'add_new'            => __( 'Add New' ),
		'add_new_item'       => 'Add Experience',
		'edit_item'          => 'Edit Experience',
		'new_item'           => 'New Experience',
		'view_item'          => 'View Experience',
		'search_items'       => 'Search Experiences',
		'not_found'          => 'No Experience found',
		'not_found_in_trash' => 'No Experience found in Trash.',
		'menu_name'          => 'Experiences',
	),
	'public'             => true,
	'publicly_queryable' => true,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => true,
	'rewrite'            => [ 'slug' => 'experiences', 'with_front' => false ],
	'has_archive'        => true,
	'hierarchical'       => false,
	'menu_position'      => null,
	'supports'           => [ 'title', 'author', 'thumbnail','editor' ]
]);

new Post_Type( 'faq', "FAQ", [
	'public'             => false,
	'publicly_queryable' => false,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => false,
	'rewrite'            => [ 'slug' => 'faq', 'with_front' => false ],
	'has_archive'        => false,
	'hierarchical'       => false,
	'menu_position'      => null,
	'supports'           => [ 'title', 'author', 'editor','page-attributes' ],
	'menu_icon'          => 'dashicons-editor-help',
  //'taxonomies'         => ['category', 'post_tag']
  'taxonomies'         => ['faq-category']
]);

new Post_Type( 'jumbotron', "Jumbotron", [
	'public'             => false,
	'publicly_queryable' => false,
	'exclude_from_search'=> true,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => false,
	'rewrite'            => false,
	'has_archive'        => false,
	'hierarchical'       => false,
	'menu_position'      => null,
	'supports'           => [ 'title', 'author', 'thumbnail' , 'page-attributes' ],
	'menu_icon'          => 'dashicons-images-alt2'
]);

new Post_Type( 'nationalResellers', "National Resellers", [
	'public'             => false,
	'publicly_queryable' => false,
	'exclude_from_search'=> true,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => false,
	'rewrite'            => false,
	'has_archive'        => false,
	'hierarchical'       => false,
	'menu_position'      => null,
	'supports'           => [ 'title', 'author', 'thumbnail' , 'page-attributes' ],
	'menu_icon'          => 'dashicons-admin-users'
]);

new Post_Type( 'resellers', "Local Resellers", [
	'public'             => false,
	'publicly_queryable' => false,
	'exclude_from_search'=> true,
	'show_ui'            => true,
	'show_in_menu'       => true,
	'query_var'          => false,
	'rewrite'            => false,
	'has_archive'        => false,
	'hierarchical'       => false,
	'menu_position'      => null,
	'supports'           => [ 'title', 'author', 'thumbnail' , 'page-attributes' ],
	'menu_icon'          => 'dashicons-admin-users'
]);

function create_faq_tax() {
    register_taxonomy(
        'faq-category',
        'faq',
        array(
            'label' => __( 'Category' ),
            'rewrite' => array( 'slug' => 'faq-category' ),
            'hierarchical' => false,
            'show_ui' => true,
            'show_admin_column' => true,
            'query_var'         => true,
        )
    );
}

add_action('init', 'WHILL\create_faq_tax');