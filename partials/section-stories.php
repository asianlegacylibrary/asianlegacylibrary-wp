<div class="stories-outer">
	
	<?php 
		$args = array (
			'post_type'         => 'post',
			'posts_per_page'    => 3,
			'orderby'           => 'date',
			'order'             => 'DESC',
		);
		$loop = new WP_Query($args);
		if ( $loop->have_posts() ) : ?>
		<div class="stories-title-line">
			<h4><?php _e('Latest Stories','all_wp_theme'); ?></h4>
			<a href="<?php echo get_permalink( get_option( 'page_for_posts' ) ); ?>" class="btn"><?php _e('SEE MORE','all_wp_theme'); ?></a>
		</div>
		<div class="blog-roll three-cols">
			<?php while ( $loop->have_posts() ) : $loop->the_post(); ?>
				<?php echo get_template_part('partials/item','news'); ?>
			<?php endwhile; ?>
		</div>
	<?php endif; wp_reset_postdata(); ?>
	
</div>