<?php

/**
 * Image heading Block Template.
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
$block_heading 		= get_field('block_heading') ?: 'Your content here...';
$block_background 	= get_field('heading_block_background_image');

?>

<div class="image-heading-outer <?php echo esc_attr($className); ?>">
	<hgroup>
		<h3><?php echo $block_heading; ?></h3>
	</hgroup>
	<?php if($block_background) { ?>
	<div class="block-bgr with-effect" style="background-image:url(<?php echo $block_background['url']; ?>);"><span></span></div>
	<?php } ?>
</div>