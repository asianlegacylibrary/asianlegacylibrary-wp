<?php

$link = get_permalink(get_the_ID()); 

if ($post->post_parent) {
	$ancestors = get_post_ancestors($post->ID);
    $parent = $ancestors[count($ancestors) - 1];
} else {
	$parent = $post->ID;
}

$args = array(
    'post_type'      => 'page',
    'posts_per_page' => -1,
    'post_parent'    => $parent,
    'order'          => 'ASC',
    'orderby'        => 'menu_order'
 );

$parent = new WP_Query( $args );

if ( $parent->have_posts() ) : ?>
<div class="subpage-nav-outer">
	<ul class="subpage-nav">
		<?php if (!$post->post_parent) { ?>
		<li class="active">
			<span><?php echo get_the_title($post->post_parent); ?></span>
		</li>
		<?php } else { ?>
		<li>
			<a href="<?php echo get_permalink($post->post_parent); ?>"><?php echo get_the_title($post->post_parent); ?></a>
		</li>
		<?php } ?>
		<?php while ( $parent->have_posts() ) : $parent->the_post(); ?>
			<?php if (is_page( $post->ID ) ) { ?>
			<li class="active">
				<span><?php the_title(); ?></span>
			</li>
			<?php } else { ?>
			<li>
				<a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"><?php the_title(); ?></a>
			</li>
			<?php } ?>
		<?php endwhile; ?>
	</ul>
</div>
<?php endif; wp_reset_postdata(); ?>