<?php

/**
 * Dark content Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create class attribute allowing for custom "className" and "align" values.
$className = '';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

// Custom fields
$block_background 			= get_field('dark_block_background');
$block_background_position 	= get_field('dark_block_background_position');


$allowed_blocks = array( 'core/paragraph', 'core/heading', 'core/media-text', 'core/buttons', 'core/list', 'core/columns', 'acf/imageheading' );

?>

<?php if(!is_admin()) { ?>
</div><!-- / Wrapper -->
<?php } ?>
<div class="dark-content-outer <?php echo esc_attr($className); ?> <?php if($block_background_position) : ?>bgr-position-<?php echo $block_background_position; ?><?php endif; ?>">
	<?php if($block_background) { ?>
	<div class="block-bgr with-effect" style="background-image:url(<?php echo $block_background; ?>);"><span></span></div>
	<?php } ?>
	<div class="wrapper">
		<div class="dark-content">
			<InnerBlocks allowedBlocks="<?php echo esc_attr(wp_json_encode($allowed_blocks)); ?>" />
		</div>
	</div>
	
</div>
<?php if(!is_admin()) { ?>
<div class="wrapper">
<?php } ?>
