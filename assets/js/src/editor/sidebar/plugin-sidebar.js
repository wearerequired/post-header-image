/**
 * WordPress dependencies
 */
import { registerPlugin } from '@wordpress/plugins';

/**
 * Internal dependencies
 */
import edit from './edit';

registerPlugin( 'post-header-image-sidebar', {
	icon: 'welcome-widgets-menus',
	render: edit,
} );
