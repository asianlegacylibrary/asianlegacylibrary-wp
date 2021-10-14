<?php
/**
 * The sidebar containing the main widget area.
 *
 * @package wordpress
 */

if (!is_active_sidebar('sidebar-1')) {
	return;
}
?>
	
	<a href="#" class="close-aside">Close</a>

	<div class="widget widget-cats">
		<h3><?php _e('Categories','all_wp_theme'); ?></h3>
		<ul class="category-list">
		<?php
		$categories = get_categories( array(
			'orderby' => 'name',
			'order'   => 'ASC'
		) );

		foreach( $categories as $category ) {
			$category_link = sprintf( 
				'<a href="%1$s" alt="%2$s">%3$s</a>',
				esc_url( get_category_link( $category->term_id ) ),
				esc_attr( sprintf( __( '%s', 'all_wp_theme' ), $category->name ) ),
				esc_html( $category->name )
			);

			echo '<li>' . sprintf( esc_html__( '%s', 'all_wp_theme' ), $category_link ) . '</li> ';
		} ?>
		</ul>
	</div>

	<?php
	$lastest = new WP_Query(array(
		'post_type' => 'post',
		'posts_per_page' => 3
	));
	if ($lastest->have_posts()) : ?>
		<div class="widget widget-recent-posts">
			<h3><?php _e('Most Recent Stories','all_wp_theme'); ?></h3>
			<ul class="aside-post-list">
				<?php 
					while ($lastest->have_posts()) : $lastest->the_post(); 
					$title = get_the_title();
					$trimmTitle = substr($title,0,50).'...';
				?>
					<li>
						<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'thumbnail'); ?>
						<a href="<?php the_permalink(); ?>" class="thumb-outer">
							<figure <?php if ( has_post_thumbnail() ) { ?>class="has-image"<?php } ?>>
								<?php if ( has_post_thumbnail() ) { ?><img src="<?php echo $featured_img_url; ?>" alt="<?php the_title(); ?>"><?php } ?>
							</figure>
						</a>
						<hgroup>
							<h4><a href="<?php the_permalink(); ?>"><?php echo $trimmTitle; ?></a></h4>
							<p class="meta"><?php the_time('jS F Y'); ?></p>
						</hgroup>
					</li>
				<?php endwhile; ?>
			</ul>
		</div>
	<?php endif; wp_reset_postdata(); ?>

	<div class="widget tags">

		<h3><?php _e('Tags','all_wp_theme'); ?></h3>

		<?php
		$tags = get_tags(array(
			'hide_empty' => true,
			'orderby' => 'count',
			'number' => 30
		));
		echo '<ul class="tag-list">';
		foreach ($tags as $tag) {
			echo '<li><a href="' . get_tag_link($tag->term_id) . '">' . $tag->name . '</a></li>';
		}
		echo '</ul>';
		?>

	</div>
