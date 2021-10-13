<?php 
/**
 * Custom post types
 *
 * @package all_wp_theme
 */


// Custom post type People
function create_people_cpt(){
    $labels = array(
        'name'                  => __('People'),
        'singular_name'         => __('People'),
        'add_new'               => __('Add People Entry'),
        'add_new_item'          => __('Add New People Entry'),
        'edit_item'             => __('Edit People Entry'),
        'new_item'              => __('New People Entry'),
        'all_items'             => __('All People Entries'),
        'view_item'             => __('View People'),
        'search_items'          => __('Search People'),
        'not_found'             => __('No People found'),
        'not_found_in_trash'    => __('No People found in the Trash'),
        'menu_name'             => 'People',
        );
    $args = array(
        'labels'        => $labels,
        'public'        => true,
        'menu_position' => 25,
        'menu_icon'     => __( 'dashicons-universal-access' ),
        'supports'      => array('title', 'editor', 'excerpt', 'thumbnail'),
		'show_in_rest' 	=> true,
        'exclude_from_search' => false
        );
    register_post_type('people', $args);
}
add_action('init', 'create_people_cpt');