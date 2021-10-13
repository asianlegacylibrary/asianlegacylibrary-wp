<?php  get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

	<div class="content-outer inner-page-content page-entry">
		
		<div class="wrapper">
			
			<?php the_content(); ?>
		
		</div>

	</div>

<?php endwhile; endif; ?>

<?php echo get_template_part('partials/section','footer'); ?>

<?php get_footer(); ?>