<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @package WordPress
 */

get_header(); ?>

	<div class="content-outer inner-page-content page-entry not-found">
		
		<div class="wrapper">
			
			<h2 class="line">404 <br>Page not found</h2>
			<p>Return to <a href="<?php bloginfo('url'); ?>">Homepage</a></p>
		
		</div>

	</div>

<?php echo get_template_part('partials/section','footer'); ?>

<?php get_footer(); ?>