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
$className = 'text-content-outer';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}



$allowed_blocks = array( 'core/paragraph', 'core/heading', 'core/buttons', 'core/list', 'core/columns' );

?>

<div class="<?php echo esc_attr($className); ?>">
	<div class="wrapper">
		<div class="text-content text-entry">
			<InnerBlocks allowedBlocks="<?php echo esc_attr(wp_json_encode($allowed_blocks)); ?>" />
		</div>
	</div>
</div>
