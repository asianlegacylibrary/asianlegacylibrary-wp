<?php 
/**
 * Shortcodes
 *
 * @package all_wp_theme
 */


    // ACF title change
	function my_layout_title($title, $field, $layout, $i) {
		if($value = get_sub_field('title')) {
			return $value;
		} else {
			foreach($layout['sub_fields'] as $sub) {
				if($sub['name'] == 'title') {
					$key = $sub['key'];
					if(array_key_exists($i, $field['value']) && $value = $field['value'][$i][$key])
						return $value;
				}
			}
		}
		return $title;
	}
	add_filter('acf/fields/flexible_content/layout_title', 'my_layout_title', 10, 4);

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

    // Body class
	function add_acf_body_class($class) {
        if(is_page_template('templates/tpl_annual_report.php')) {
            $value = 'annual-report light';
        } else {
            $value = get_field('header_style');
        }
		$class[] = $value;
		return $class;
	}
	add_filter('body_class', 'add_acf_body_class');