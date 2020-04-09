# Post Header Image
* Contributors: wearerequired, hubersen, grapplerulrich
* Tags:
* Requires at least: 5.0
* Tested up to: 5.2
* Requires PHP: 7.0
* Stable tag: 1.0
* License: GPLv2 or later
* License URI: http://www.gnu.org/licenses/gpl-2.0.html

WordPress plugin for adding a custom header image to posts. Only supports the block editor. There is no support for the classic editor.

By default, custom header images is only enabled for posts. To add support to other post types use the the 'add_post_type_support()` function. Example for pages:

	add_post_type_support( 'page', 'post-header-image' );

## Block Editor

* Install npm dependencies via `npm install`
* Enable watch task with `npm run dev`
* Build files with `npm run build`
* Update language file with `npm run pot-to-php`. Make sure to run `npm run build` first.
