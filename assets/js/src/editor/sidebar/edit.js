/**
 * External dependencies
 */
import { has } from 'lodash';

/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import {
	PluginSidebar,
	PluginSidebarMoreMenuItem,
} from '@wordpress/edit-post';
import {
	Button,
	PanelBody,
	ResponsiveWrapper,
	Spinner,
} from '@wordpress/components';
import {
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/editor';
import {
	withSelect,
	withDispatch,
} from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { compose } from '@wordpress/compose';
import { applyFilters } from '@wordpress/hooks';

/**
 * Internal dependencies
 */
import './editor.css';

const ALLOWED_FILE_TYPES = [ 'image' ];
const META_BACKGROUND_IMAGE_NAME = 'post_header_image';

function Edit( { media, headerImageId, onUpdateImage, onRemoveImage } ) {
	let mediaWidth, mediaHeight, mediaSourceUrl;
	if ( media ) {
		const mediaSize = applyFilters( 'editor.PostHeaderImage.imageSize', 'post-thumbnail', media.id );
		if ( has( media, [ 'media_details', 'sizes', mediaSize ] ) ) {
			mediaWidth = media.media_details.sizes[ mediaSize ].width;
			mediaHeight = media.media_details.sizes[ mediaSize ].height;
			mediaSourceUrl = media.media_details.sizes[ mediaSize ].source_url;
		} else {
			mediaWidth = media.media_details.width;
			mediaHeight = media.media_details.height;
			mediaSourceUrl = media.source_url;
		}
	}

	return (
		<Fragment>
			<PluginSidebarMoreMenuItem
				target="post-header-image-sidebar"
			>
				{ __( 'Post Header Image', 'post-header-image' ) }
			</PluginSidebarMoreMenuItem>
			<PluginSidebar
				name="post-header-image-sidebar"
				title={ _x( 'Post Header Image', 'Plugin sidebar options title', 'post-header-image' ) }
			>
				<PanelBody
					title={ __( 'Header Image', 'post-header-image' ) }
				>
					<MediaUploadCheck>
						<MediaUpload
							title={ __( 'Header Image', 'post-header-image' ) }
							onSelect={ onUpdateImage }
							allowedTypes={ ALLOWED_FILE_TYPES }
							render={ ( { open } ) => (
								<Button
									onClick={ open }
									className={ ! headerImageId ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
									aria-label={ ! headerImageId ? null : __( 'Edit or update the image' ) }
								>
									{ !! headerImageId && media &&
										<ResponsiveWrapper
											naturalWidth={ mediaWidth }
											naturalHeight={ mediaHeight }
										>
											<img src={ mediaSourceUrl } alt="" />
										</ResponsiveWrapper>
									}
									{ !! headerImageId && ! media && <Spinner /> }
									{ ! headerImageId && __( 'Set Header Image', 'post-header-image' ) }
								</Button>
							) }
						/>
					</MediaUploadCheck>
					{ !! headerImageId && media && ! media.isLoading &&
						<MediaUploadCheck>
							<MediaUpload
								title={ __( 'Set Header Image', 'post-header-image' ) }
								onSelect={ onUpdateImage }
								allowedTypes={ ALLOWED_FILE_TYPES }
								render={ ( { open } ) => (
									<Button onClick={ open } isDefault isLarge>
										{ __( 'Replace Image', 'post-header-image' ) }
									</Button>
								) }
							/>
						</MediaUploadCheck>
					}
					{ !! headerImageId &&
						<MediaUploadCheck>
							<Button onClick={ onRemoveImage } isLink isDestructive>
								{ __( 'Remove Image', 'post-header-image' ) }
							</Button>
						</MediaUploadCheck>
					}
				</PanelBody>
			</PluginSidebar>
		</Fragment>
	);
}

export default compose(
	withSelect( ( select ) => {
		const { getMedia } = select( 'core' );
		const { getEditedPostAttribute } = select( 'core/editor' );
		const headerImageId = getEditedPostAttribute( 'meta' )[ META_BACKGROUND_IMAGE_NAME ];

		return {
			media: headerImageId ? getMedia( headerImageId ) : null,
			headerImageId,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { editPost } = dispatch( 'core/editor' );
		return {
			onUpdateImage( image ) {
				editPost( { meta: { [ META_BACKGROUND_IMAGE_NAME ]: image.id } } );
			},
			onRemoveImage() {
				editPost( { meta: { [ META_BACKGROUND_IMAGE_NAME ]: 0 } } );
			},
		};
	} ),
)( Edit );
