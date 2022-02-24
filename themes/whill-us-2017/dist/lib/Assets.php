<?php

namespace WHILL;

Class Assets {

	private $css_path;
	private $script_path;
	private $theme_version;


	public function __construct() {

		$theme = wp_get_theme();
		$this->theme_version = $theme->get( 'Version' );

		$this->css_path = ( WP_DEBUG ) ? '/assets/dist/styles/all.css' : '/assets/dist/styles/all.min.css';
		$this->script_path = ( WP_DEBUG ) ? '/assets/dist/scripts/all.js' : '/assets/dist/scripts/all.min.js';

		if ( ! is_admin() ) {
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_styles' ] );
			add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
		}

		//add_editor_style( 'http://fast.fonts.net/cssapi/833c2c2d-6c41-4781-b40c-3c528abff04a.css' );
		//add_editor_style( '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
		add_editor_style( $this->css_path );
        add_filter( 'tiny_mce_before_init', array($this, 'setTinyMCECacheSuffix') );
    }

    function setTinyMCECacheSuffix($mce_init) {

        $mce_init['cache_suffix'] = 'vmce=20170802';

        return $mce_init;
    }

	/**
	 *
	 * Add Css.
	 *
	 */
	public function enqueue_styles() {
		//wp_enqueue_style( 'dashicons');
		//wp_enqueue_style( 'font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' );
		//wp_enqueue_style( 'din', 'http://fast.fonts.net/cssapi/833c2c2d-6c41-4781-b40c-3c528abff04a.css');
		//wp_enqueue_style( 'jquery-magnific-popup', 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/magnific-popup.min.css', [], "1.1.0");
		wp_enqueue_style( 'all', get_template_directory_uri() . $this->css_path, [ ], $this->theme_version  );

	}

	/**
	 *
	 * Add Js.
	 *
	 */
	public function enqueue_scripts() {

//		wp_deregister_script( 'mediaelement' );
//		wp_deregister_script( 'wp-mediaelement' );

		if( !is_user_logged_in() ) {
			wp_deregister_script( 'jquery' );
			wp_register_script( 'jquery', 'https://code.jquery.com/jquery-2.1.3.min.js', [ ], '2.1.3', true );
		}

		wp_register_script( 'jquery-easing', 'https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js', [ 'jquery' ], '1.3', true );
		wp_register_script( 'jquery-magnific-popup', 'https://cdnjs.cloudflare.com/ajax/libs/magnific-popup.js/1.1.0/jquery.magnific-popup.min.js',[ 'jquery' ], '1.1.0', true  );
		wp_register_script( 'jquery-mb-ytplayer', get_template_directory_uri().'/bower_components/jquery.mb.ytplayer/dist/jquery.mb.YTPlayer.min.js',[ 'jquery' ], '2.9.4', true  );
		wp_enqueue_script( 'all', get_template_directory_uri() . $this->script_path, [
			'underscore',
			'jquery',
			'jquery-easing',
			'jquery-magnific-popup',
			'jquery-mb-ytplayer'
		], $this->theme_version, true );
	}


}