<?php get_header(); ?>
		
	<div class="news-outer">
		
		<div class="news-top">
			
			<div class="news-top-inner">
				<h1><?php _e('Search results for','all_wp_theme'); ?> <span>: <?php echo get_search_query(); ?></span></h1>
				<?php echo get_template_part('partials/section','search-form'); ?>
			</div>
		
		</div>
		
		<div class="news-content">

			<main>
				<?php if (have_posts()) : ?>
					<div class="blog-roll regular">
						<?php while (have_posts()) : the_post(); ?>
							<?php echo get_template_part('partials/item','news'); ?>
						<?php endwhile; ?>
					</div>
				<?php else : ?>
				<p class="no-posts"><?php _e('No posts found','all_wp_theme'); ?></p>
				<?php endif; ?>
			</main>

			<aside>
				<?php get_sidebar(); ?>
			</aside>
			
		</div>

	</div>

<?php echo get_template_part('partials/section','footer'); ?>

<?php  get_footer(); ?>