<?php 
/**
 * Shortcodes
 *
 * @package all_wp_theme
 */

	/* OPTIONS PAGES */
	if( function_exists('acf_add_options_page') ) {

		$parent = acf_add_options_page(array(
			'page_title' 	=> 'Theme Settings',
			'menu_title'	=> 'Theme Settings',
			'menu_slug' 	=> 'theme-general-settings',
			'capability'	=> 'edit_posts',
			'redirect'		=> false
		));

		// add sub page
		acf_add_options_sub_page(array(
			'page_title' 	=> 'Partners',
			'menu_title' 	=> 'Partners',
			'parent_slug' 	=> $parent['menu_slug'],
		));

		// add sub page
		acf_add_options_sub_page(array(
			'page_title' 	=> 'Admin Help',
			'menu_title' 	=> 'Admin Help',
			'parent_slug' 	=> $parent['menu_slug'],
		));
		
	}



	function add_acf_body_class($class) {
		$value = get_field('header_style');
		$class[] = $value;
		return $class;
	}
	add_filter('body_class', 'add_acf_body_class');