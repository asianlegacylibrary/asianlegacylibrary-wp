<?php

/**
 * Page Slider Block Template.
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
$slider_type 	= get_field('slider_type');
$slider_images 	= get_field('slider_images');
$slider_content = get_field('slider_content');


?>

<?php if(!is_admin()) { ?>
</div><!-- / Wrapper -->
<?php } ?>

<?php if($slider_type === 'extended') { ?>

<div class="carousel <?php echo esc_attr($className); ?>">
	<div class="holder">
		<div class="slider">
			<?php if( $slider_images ): ?>
			<ul class="imgs" data-imgs="<?php $images_string = implode( ', ', $slider_images ); echo esc_attr($images_string); ?>">
				<li>
					<div><span class="with-effect square"></span></div>
					<a href="#" class="prev"></a>
				</li>
				<li>
					<div><span class="with-effect square"></span></div>
				</li>
				<li>
					<div><span class="with-effect square"></span></div>
					<a href="#" class="next"></a>
				</li>				
			</ul>
			<ul class="bullets"></ul>
			<?php endif; ?>
		</div>
		<article>
			<?php echo $slider_content; ?>
		</article>
	</div>
</div>

<?php } else { ?>

<div class="img-slider <?php echo esc_attr($className); ?>">
	<div class="holder">
		<div class="slider">
			<?php if( $slider_images ): ?>
			<ul class="imgs" data-imgs="<?php $images_string = implode( ', ', $slider_images ); echo esc_attr($images_string); ?>">
				<li><div><span class="with-effect"></span></div>
			</ul>
			<ul class="prev-next">
				<li class="prev"><a href="#"></a></li>
				<li class="next"><a href="#"></a></li>
			</ul>
			<ul class="bullets"></ul>
			<?php endif; ?>
		</div>
	</div>
</div>

<?php } ?>

<?php if(!is_admin()) { ?>
<div class="wrapper">
<?php } ?>