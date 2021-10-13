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
$className = 'video-outer';
if( !empty($block['className']) ) {
    $className .= ' ' . $block['className'];
}

$video_file 				= get_field('video_file');
$poster_image 				= get_field('poster_image');
$video_caption 				= get_field('video_caption');
$external_video 			= get_field('external_video');
$external_video_platform 	= get_field('external_video_platform');

?>

<section class="<?php echo esc_attr($className); ?> <?php if($external_video) : echo 'external'; else : echo 'local'; endif; ?> <?php echo $external_video_platform; ?>">
	<figure class="video-wrapper">
		<?php if($external_video) : ?>
		<div class="video">
			<div class="external-video">
				<?php echo $external_video; ?>
			</div>
			<span class="with-effect" style="background-image: url(<?php echo $poster_image['url']; ?>)"><span class="play"></span></span>
		</div>
		<?php else : ?>
		<div class="video">
			<video width="320" height="240" controls>
				<source src="<?php echo $video_file['url']; ?>" type="video/mp4">
				Your browser does not support the video tag.
			</video>
			<span class="with-effect" style="background-image: url(<?php echo $poster_image['url']; ?>)"><span class="play"></span></span>
		</div>
		<?php endif; ?>
		<?php if($video_caption) : ?>
		<figcaption><?php echo $video_caption; ?></figcaption>
		<?php endif; ?>
	</figure>
</section><!-- / Custom video -->