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

$block_type         = get_field('block_type');
$column_1           = get_field('column_1');
$column_2           = get_field('column_2');
$column_2           = get_field('column_2');
$extended_classes   = get_field('extended_type_additional_classes');

?>

<div class="image-heading-holder <?php if($block_type === 'extended') { ?> <?php echo 'is-extended'; ?> <?php echo $extended_classes; ?> <?php } ?>">

    <div class="image-heading-outer <?php echo esc_attr($className); ?>">
        <hgroup>
            <h3><?php echo $block_heading; ?></h3>
        </hgroup>
        <?php if($block_background) { ?>
        <div class="block-bgr with-effect" style="background-image:url(<?php echo $block_background['url']; ?>);"><span></span></div>
        <?php } ?>

    </div>

    <?php if($block_type === 'extended') { ?>

    <div class="image-heading-columns <?php if(!$column_2) { 'one-col'; } ?>">
        <div class="col">
            <?php echo $column_1; ?>
        </div>
        <?php if($column_2) { ?>
        <div class="col">
            <?php echo $column_2; ?>
        </div>
        <?php } ?>
    </div>

    <?php } ?>
    
</div>