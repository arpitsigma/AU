<?php

namespace WHILL;

Class Tiny_MCE {

	public function __construct() {
		add_filter( 'mce_buttons_2', [ $this, 'mce_buttons_2' ] );
		add_filter( 'tiny_mce_before_init', [ $this, 'tiny_mce_before_init' ], 9999 );
	}

	public function mce_buttons_2( $buttons ) {
		array_unshift( $buttons, 'styleselect' );

		return $buttons;
	}

	public function tiny_mce_before_init( $initArray ) {

		//スタイリング用クラス
		$style_formats = [
			[
				'title' => 'Grid',
				'items' => [
					[
						'title'   => 'Grid Container',
						'block'   => 'div',
						'wrapper' => true,
						'classes' => 'c-grid',
						'exact'   => true,
					],
					[
						'title'   => 'Gird Gutter',
						'items'   => [
							[
								'title'    => 'Collapse',
								'selector' => '.c-grid',
								'classes'  => 'c-grid_collapse',
								'exact'    => true,
							],
							[
								'title'    => 'Tight',
								'selector' => '.c-grid',
								'classes'  => 'c-grid_tight',
								'exact'    => true,
							],
							[
								'title'    => 'Loose',
								'selector' => '.c-grid',
								'classes'  => 'c-grid_loose',
								'exact'    => true,
							],
						]
					],
					[
						'title'   => 'Grid Column',
						'block'   => 'div',
						'wrapper' => true,
						'exact'   => false,
						'classes' => 'c-grid__u',
					],
					[
						'title' => 'Grid Size',
						'items' => [
							[
								'title' => 'Base',
								'items' => [
									[
										'title'    => 'Grid Column 1/2',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_1of2',
										'exact'    => true,
									],
									[
										'title'    => 'Grid Column 1/3',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_1of3',
										'exact'    => true,
									],
									[
										'title'    => 'Grid Column 2/3',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_2of3',
										'exact'    => true,
									],
								],
							],
							[
								'title' => 'Small',
								'items' => [
									[
										'title'    => 'Grid Column 1/2',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_small_1of2',
										'exact'    => true,
									],
									[
										'title'    => 'Grid Column 1/3',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_small_1of3',
										'exact'    => true,
									],
									[
										'title'    => 'Grid Column 2/3',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_small_2of3',
										'exact'    => true,
									],
								],
							],
							[
								'title' => 'Medium',
								'items' => [
									[
										'title'    => 'Grid Column 1/2',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_medium_1of2',
										'exact'    => true,
									],
									[
										'title'    => 'Grid Column 1/3',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_medium_1of3',
										'exact'    => true,
									],
									[
										'title'    => 'Grid Column 2/3',
										'selector' => '.c-grid__u',
										'classes'  => 'c-grid__u_medium_2of3',
										'exact'    => true,
									],
								],
							],
						]
					],
				]
			],
			[
				'title' => 'Text',
				'items' => [
					[
						'title'    => 'large',
						'selector' => 'p,span',
						'classes'  => 'u-text-large',
						'exact'    => true,
					],
					[
						'title'    => 'xlarge',
						'selector' => 'p',
						'classes'  => 'u-text-xlarge',
						'exact'    => true,
					],
				]
			],
			[
				'title' => 'Button',
				'items' => [
					[
						'title'    => 'Button',
						'selector' => 'a',
						'classes'  => 'c-btn',
						'exact'    => true,
					],
					[
						'title'    => 'Default',
						'selector' => 'a',
						'classes'  => 'c-btn_default',
						'exact'    => true,
					],
					[
						'title'    => 'Primary',
						'selector' => 'a',
						'classes'  => 'c-btn_primary',
						'exact'    => true,
					],
					[
						'title'    => 'Secondary',
						'selector' => 'a',
						'classes'  => 'c-btn_secondary',
						'exact'    => true,
					],                    [
						'title'    => 'Block',
						'selector' => 'a',
						'classes'  => 'c-btn_block',
						'exact'    => true,
					],
				]
			],
		];
		$initArray['style_formats'] = json_encode( $style_formats );

		return $initArray;
	}


}