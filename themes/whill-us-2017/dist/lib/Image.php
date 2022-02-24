<?php

namespace WHILL;

Class Image {
	/** @var array */
	private $image_sizes = [ ];
	public function __construct() {
		add_action( 'init', [ $this, 'register_image_sizes' ] );
		add_filter( 'image_size_names_choose', [ $this, 'add_image_size_select' ] );
	}
	/**
	 * @param string $name
	 * @param int $width
	 * @param int $height
	 * @param bool $crop
	 * @param bool $selectable show admin select.
	 * @param string $label admin menu name.
	 */
	public function add_size( $name, $width, $height, $crop = false, $selectable = false, $label = "" ) {
		if( !$label ) {
			$label = $name;
		}
		$this->image_sizes[ $name ] = [
			'label'      => $label, // 選択肢のラベル名
			'width'      => $width,    // 最大画像幅
			'height'     => $height,    // 最大画像高さ
			'crop'       => $crop,  // 切り抜きを行うかどうか
			'selectable' => $selectable   // 選択肢に含めるかどうか
		];
	}
	/**
	 * @param string $label
	 * @param string $name
	 * @param int $width
	 * @param int $height
	 * @param bool $crop
	 */
	public function add_selectable_size ( $label, $name , $width, $height, $crop = false ) {
		$this->add_size( $name , $width, $height, $crop , true, $label );
	}
	/**
	 *
	 */
	public function register_image_sizes() {
		foreach ( $this->image_sizes as $slug => $size ) {
			add_image_size( $slug, $size['width'], $size['height'], $size['crop'] );
		}
	}
	/**
	 * @param array $size_names
	 *
	 * @return mixed
	 */
	public function add_image_size_select( $size_names ) {
		$custom_sizes = get_intermediate_image_sizes();
		foreach ( $custom_sizes as $custom_size ) {
			if ( !empty( $this->image_sizes[ $custom_size ]['selectable'] ) ) {
				$size_names[ $custom_size ] = $this->image_sizes[ $custom_size ]['label'];
			}
		}
		return $size_names;
	}
}