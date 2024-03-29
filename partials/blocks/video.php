<?php

/**
 * Video Block Template. SUBMODULE IS UPDATED IF YOU SEE THIS ON WP ENGINE :)
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
# $external_video 			= get_field('external_video');

# UPDATED VIDEO field for video block, need to remove the embed iframe field from ACF and from here ------------------
# add new ACF for video URL, afterwards we can delete some of these unused ---------------------
$external_video_url 		= get_field('external_video_url');

$external_video_platform 	= get_field('external_video_platform');

# Note: need to update how translators can 'translate' the video URL for their language -----------------------
# external_video_url will be the video URL, instead of using the embed code (iframe)
# get the ID of the video from the URL (last element)
$video_url_bits = explode('/', $external_video_url);
$video_id = end($video_url_bits);
$video_url = "https://player.vimeo.com/video/". $video_id . "?"; # note that the ? is necessary even when you have no params

# we replace the $external_video (which was the embed code from vimeo, an iframe)
# with the iframe we create using the video_url 
# ----------------------------------------------------------------------------------------


?>

<section class="<?php echo esc_attr($className); ?> <?php if($external_video_url) : echo 'external'; else : echo 'local'; endif; ?> <?php echo $external_video_platform; ?>">
	<figure class="video-wrapper">
		<?php if($external_video_url) : ?>
		<div class="video">
			<div class="external-video">
				<!-- we've replaced the video embed with our own, using a much simpler URL from vimeo, then we build the iframe here
					this makes it much easier for translators and people creating news posts to add video links  -->
				<iframe src="<?php echo $video_url; ?>" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
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