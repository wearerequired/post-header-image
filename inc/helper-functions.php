<?php
/**
 * Helper functions which do specific tasks.
 *
 * @package Required\PostHeaderImage
 */

namespace Required\PostHeaderImage;

/**
 * Retrieve post header ID.
 *
 * @param int $post Post ID.
 * @return int Post header ID.
 */
function get_post_header_id( int $post_id ): int {
	return (int) get_post_meta( $post_id, POST_META_NAME, true );
}

/**
 * Determines whether a post has an image attached.
 *
 * @param int $post Post ID.
 * @return bool Whether the post has an image attached.
 */
function has_post_header( int $post_id ): bool {
	return (bool) get_post_header_id( $post_id );
}

/**
 * Return the post header URL.
 *
 * @param int  $post Post ID.
 * @param string $size Optional. Registered image size to retrieve the source for. Default 'post-thumbnail'.
 * @return string|false Post header URL or false if no URL is available.
 */
function get_the_post_header_url( int $post_id, string $size = 'post-thumbnail' ) {
	$post_header_id = get_post_header_id( $post_id );
	if ( ! $post_header_id ) {
		return false;
	}
	return wp_get_attachment_image_url( $post_header_id, $size );
}
