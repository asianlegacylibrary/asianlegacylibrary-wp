<?php

/**
 * Page Hero Block Template.
 *
 * @param   array $block The block settings and attributes.
 * @param   string $content The block inner HTML (empty).
 * @param   bool $is_preview True during AJAX preview.
 * @param   (int|string) $post_id The post ID this block is saved to.
 */

// Create class attribute allowing for custom "className" and "align" values.
$className = 'page-hero';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

// Custom fields
$hero_content 				= get_field('hero_content');
$hero_background_image 		= get_field('hero_background_image');
$hero_type 					= get_field('hero_type');
$hero_additional_column		= get_field('hero_additional_column');
$hero_column_title			= get_field('hero_column_title');

?>

<?php if(!is_admin()) { ?>
</div><!-- / Wrapper -->
<?php } ?>

<section class="<?php echo esc_attr($className); ?> <?php if($hero_type) : echo 'extended'; endif; ?>">
	<hgroup>
		<?php if(!$hero_additional_column) { ?>
		<div class="wrapper">
			<?php echo $hero_content; ?>
		</div>
		<?php } else { ?>
		<div class="wrapper hero-cols-outer">
			<h1><?php echo $hero_column_title ?></h1>
			<div class="hero-cols">
				<div class="col">
					<?php echo $hero_content; ?>
				</div>
				<div class="col">
					<?php echo $hero_additional_column; ?>
				</div>
			</div>
		</div>
		<?php } ?>
	</hgroup>
	<?php if($hero_type): ?>
	<a href="#content-scroll-to" class="scroll-indicator to-content">
		<?php _e('Scroll','all_wp_theme'); ?>
		<span></span>
	</a>
	<div class="sliced front initialized">
  		<img src="<?php echo $hero_background_image['url']; ?>" class="sliced-img"/>
	</div>
	<?php endif; ?>
</section><!-- / Page Hero -->

<?php if(!is_admin()) { ?>
<div class="wrapper" id="content-scroll-to">
<?php } ?>

