<?php
/**
 * Plugin Name: Post Header Image
 * Plugin URI:  https://github.com/wearerequired/post-header-image/
 * Description: WordPress plugin for adding a custom header image to posts.
 * Version:     1.0.0
 * Author:      required
 * Author URI:  https://required.com
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: post-header-image
 *
 * @package Required\PostHeaderImage
 */

namespace Required\PostHeaderImage;

if ( file_exists( __DIR__ . '/vendor/autoload.php' ) ) {
	require __DIR__ . '/vendor/autoload.php';
}

const PLUGIN_DIR  = __DIR__;
const PLUGIN_FILE = __FILE__;

add_action( 'plugins_loaded', __NAMESPACE__ . '\bootstrap' );
