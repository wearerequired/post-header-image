<?php

namespace Required\PostHeaderImage;

const POST_META_NAME = 'post_header_image';

/**
 * Register actions/hooks.
 *
 * @return void
 */
function bootstrap() {
	add_action( 'init', __NAMESPACE__ . '\register_editor_assets' );
	add_action( 'init', __NAMESPACE__ . '\register_post_meta' );
	add_action( 'enqueue_block_editor_assets', __NAMESPACE__ . '\enqueue_block_editor_assets' );
}

/**
 * Register post meta used for all kinds of post types.
 *
 * @return void
 */
function register_post_meta() {
	\register_post_meta(
		apply_filters( 'post_header_image.post_type', '' ),
		POST_META_NAME,
		[
			'show_in_rest' => true,
			'single'       => true,
			'type'         => 'integer',
		]
	);
}

/**
 * Registers JavaScript and CSS for the block editor.
 */
function register_editor_assets() {
	$script_asset      = [];
	$script_asset_path = plugin_dir_path( PLUGIN_FILE ) . 'assets/js/editor.asset.php';
	if ( file_exists( $script_asset_path ) ) {
		$script_asset = require $script_asset_path;
	} else {
		$script_asset = [
			'dependencies' => [],
			'version'      => filemtime( plugin_dir_path( PLUGIN_FILE ) . 'assets/js/editor.js' ),
		];
	}

	wp_register_script(
		'post-header-image',
		plugins_url( 'assets/js/editor.js', PLUGIN_FILE ),
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_set_script_translations( 'post-header-image', 'post-header-image' );

	wp_register_style(
		'post-header-image',
		plugins_url( 'assets/css/editor.css', PLUGIN_FILE ),
		[],
		filemtime( plugin_dir_path( PLUGIN_FILE ) . 'assets/css/editor.css' )
	);
}

/**
 * Enques JavaScript and CSS for the block editor.
 */
function enqueue_block_editor_assets() {
	wp_enqueue_script( 'post-header-image' );
	wp_enqueue_style( 'post-header-image' );
}
