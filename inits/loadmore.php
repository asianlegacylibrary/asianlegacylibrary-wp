<?php 
/**
 * Load more functionality
 *
 * @package all_wp_theme
 */
	function load_more_posts(){

		$id 	= $_POST['id'];
		$type 	= $_POST['type'];
		$offset	= $_POST['offset'];

		if($type == "category"){

			$args = array(
				'post_type' 		=> 'post',
				'cat' 				=> $id,
				'posts_per_page' 	=> 6,
				'offset' 			=> $offset,
			);

		} else if ($type == "tag") {

			$args = array(
				'post_type' 		=> 'post',
				'tag_id' 			=> $id,
				'posts_per_page' 	=> 6,
				'offset' 			=> $offset,
			);

		} else if ($type == "all") {

			$args = array(
				'post_type' 		=> 'post',
				'posts_per_page' 	=> 6,
				'offset' 			=> $offset,
			);

		} else if ($type == "popular") {

			$args = array(
				'post_type' 		=> 'post',
				'posts_per_page' 	=> 6,
				'offset' 			=> $offset,
				'meta_key' 			=> 'popular_posts',
				'orderby' 			=> 'meta_value_num',
			);

		}


		$query = new WP_Query( $args );

		$total = $query->found_posts;

		if ($query->have_posts()) : while ($query->have_posts()) : $query->the_post(); ?>

			<?php echo get_template_part('partials/item','news'); ?>

		<?php endwhile; 
		
		endif; 

		exit;
		
	}
	
	add_action('wp_ajax_load_more_posts', 'load_more_posts');
	add_action('wp_ajax_nopriv_load_more_posts', 'load_more_posts');