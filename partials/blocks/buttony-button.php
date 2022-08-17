<?php

/**
 * Video Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create class attribute allowing for custom "className" and "align" values.
$className = 'buttony-button';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$button_text				= get_field('all_button_text');
$button_link				= get_field('all_button_link');

?>

<div class="<?php echo esc_attr($className); ?>">
		<a href="<?php echo $button_link; ?>"><?php echo $button_text; ?></a>
</div>