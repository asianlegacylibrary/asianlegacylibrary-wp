<?php 
	$featured_img_url 	= get_the_post_thumbnail_url(get_the_ID(),'large');
	$position = get_field('position'); 
	global $post;
	$slug = $post->post_name;
?>
<article>
	<?php if( has_term('headquarters', 'peoplecats')){ ?>
	<a href="#" class="team-popup-trigger"  id="<?php echo $slug; ?>">
		<figure style="background-image:url(<?php echo $featured_img_url; ?>);"></figure>
		<?php if($position) : ?>
		<p class="position"><?php echo $position; ?></p>
		<?php endif; ?>
		<h4><?php the_title(); ?></h4>
	</a>
	<?php } else { ?>
	<div class="simple-item-wrapper">
		<h4><?php the_title(); ?></h4>
		<?php the_excerpt(); ?>
	</div>
	<?php } ?>
</article>