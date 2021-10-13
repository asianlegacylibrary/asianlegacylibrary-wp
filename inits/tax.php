<?php 
/**
 * Custom taxonomies
 *
 * @package all_wp_theme
 */

// People taxonomy - CATEGORIES
function create_people_cats_taxonomy() {
  $labels = array(
    'name' 						=> _x( 'Categories', 'taxonomy general name','bitdgtl_wp_theme' ),
    'singular_name' 			=> _x( 'Category', 'taxonomy singular name','bitdgtl_wp_theme' ),
    'search_items' 				=> __( 'Search Categories','bitdgtl_wp_theme'),
    'all_items' 				=> __( 'All Categories','bitdgtl_wp_theme' ),
    'parent_item' 				=> __( 'Parent Category','bitdgtl_wp_theme'),
    'parent_item_colon' 		=> __( 'Parent Category:','bitdgtl_wp_theme' ),
    'edit_item'	 				=> __( 'Edit Category','bitdgtl_wp_theme'), 
    'update_item' 				=> __( 'Update Category','bitdgtl_wp_theme' ),
    'add_new_item' 				=> __( 'Add new Category','bitdgtl_wp_theme'),
    'new_item_name'				=> __( 'New Category','bitdgtl_wp_theme' ),
    'menu_name' 				=> __( 'Categories','bitdgtl_wp_theme' ),
  ); 	
 
  register_taxonomy('peoplecats',array('people'), array(
    'hierarchical' 				=> true,
    'labels' 					=> $labels,
    'show_ui' 					=> true,
	'has_archive' 				=> true,
    'show_admin_column' 		=> true,
	'publicly_queryable'		=> true,
  ));
}
add_action( 'init', 'create_people_cats_taxonomy', 0 );


