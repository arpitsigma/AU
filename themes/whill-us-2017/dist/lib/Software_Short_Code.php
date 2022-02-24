<?php


namespace WHILL;


Class Software_Short_Code {


	/**
	 * Software_Short_Code constructor.
	 */
	public function __construct() {
		add_shortcode( 'software-animation', [ $this, 'software_animation' ] );
		add_action( 'init', [ $this, 'add_mce_plugin' ] );
	}

	/**
	 * short code.
	 * @return string
	 */
	public function software_animation() {

		ob_start();
		get_template_part( 'partial/iphone' );
		$html = ob_get_contents();
		ob_end_clean();

		return $html;

	}

	public function add_mce_plugin() {
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			return;
		}
		//リッチエディタの時だけ追加
		if ( get_user_option( 'rich_editing' ) == 'true' ) {
			add_filter( "mce_external_plugins", array( &$this, 'mce_external_plugins' ) );
		}
	}

	public function mce_external_plugins( $plugin_array ) {
		//プラグイン関数名＝ファイルの位置
		$plugin_array['softwareAnimation'] = get_bloginfo( 'template_directory' ) . '/lib/softwareAnimation.js';

		return $plugin_array;
	}

}

