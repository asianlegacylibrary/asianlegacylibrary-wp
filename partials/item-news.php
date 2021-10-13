	<article id="post-<?php the_ID(); ?>">
								
		<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'large'); ?>

		<figure <?php if ( has_post_thumbnail() ) { ?> class="has-image" <?php } ?>>
			<a href="<?php the_permalink(); ?>" <?php if ( has_post_thumbnail() ) { ?>style="background-image:url(<?php echo $featured_img_url; ?>);" <?php } ?>></a>
		</figure>
		<small class="meta"><?php the_author(); ?> - <?php the_time('jS F Y'); ?></small>
		<h3><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h3>
		<div class="post-content"><?php echo get_excerpt(110); ?></div>

	</article>