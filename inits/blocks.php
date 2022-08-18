<?php 
/**
 * The theme blocks file
 *
 * @package all_wp_theme
 */
	
	
	/**
	 * Allow block types
	 */
	function all_allowed_block_types( $allowed_block_types, $post ) {
		
		if($post->post_type == 'page') {
			return array(
				'core/block',
				'core/paragraph',
				'core/image',
				'core/heading',
				'core/media-text',
				'core/video',
				'core/buttons',
				'core/columns',
				'core/shortcode',
				'core/list',
				'acf/pagehero',
				'acf/slider',
				'acf/imageheading',
				'acf/darkwrapper',
				'acf/customvideo',
				'acf/custombutton',
				'acf/textualcontent'
			);
		}
		
		if($post->post_type == 'post') {
			return array(
				'core/block',
				'core/paragraph',
				'core/image',
				'core/heading',
				'core/media-text',
				'core/video',
				'core/buttons',
				'core/shortcode',
				'core/quote',
				'core/list',
				'acf/slider',
				'acf/customvideo',
				'acf/custombutton',
				'acf/textualcontent'
			);
		}
		
		return $allowed_block_types;
	}
	add_filter( 'allowed_block_types', 'all_allowed_block_types', 10, 2 );

	/**
	 * Disable blocks for Posts
	 */
	function all_filter_disable_block_editor_pt( $use_block_editor, $post_type ){
		if( 'people' == $post_type){
			$use_block_editor = false;
		}
		return $use_block_editor;
	}
	add_filter( 'use_block_editor_for_post_type', 'all_filter_disable_block_editor_pt', 10, 2 );

	
	/**
	 * Register and enqueue a custom stylesheet in the WordPress admin.
	 */
	function wpdocs_enqueue_custom_admin_style() {
			wp_register_style( 'custom_wp_admin_css', get_template_directory_uri() . '/assets/css/admin/admin.css', false, '1.0.0' );
			wp_enqueue_style( 'custom_wp_admin_css' );
	}
	add_action( 'admin_enqueue_scripts', 'wpdocs_enqueue_custom_admin_style' );

	
	/**
	 * Register ACF blocks
	 */
	function register_acf_block_types() {

		acf_register_block_type(array(
			'name'              => 'pagehero',
			'title'             => __('Page hero'),
			'description'       => __('A custom page hero block.'),
			'render_template'   => 'partials/blocks/page-hero.php',
			'post_types' 		=> array('page'),
			'category'          => 'layout',
			'icon'              => 'align-center',
			'keywords'          => array( 'hero', 'title', 'image' ),
			'supports' 			=> array(
				'align' => false,
				'multiple' => false,
			),
		));

		acf_register_block_type(array(
			'name'              => 'slider',
			'title'             => __('Slider'),
			'description'       => __('A custom slider block.'),
			'render_template'   => 'partials/blocks/slider.php',
			'post_types' 		=> array('page','post'),
			'category'          => 'layout',
			'icon'              => 'slides',
			'keywords'          => array( 'slider', 'image', 'text' ),
			'supports' 			=> array(
				'align' => false,
			),
		));

		acf_register_block_type(array(
			'name'              => 'imageheading',
			'title'             => __('Image heading'),
			'description'       => __('A custom image heading block.'),
			'render_template'   => 'partials/blocks/image-heading.php',
			'post_types' 		=> array('page'),
			'category'          => 'layout',
			'icon'              => 'editor-paste-text',
			'keywords'          => array( 'text', 'image', 'heading' ),
		));

		acf_register_block_type(array(
			'name'              => 'darkwrapper',
			'title'             => __('Dark wrapper'),
			'description'       => __('A custom dark content block.'),
			'render_template'   => 'partials/blocks/dark-wrapper.php',
			'post_types' 		=> array('page'),
			'category'          => 'layout',
			'icon'              => 'format-aside',
			'keywords'          => array( 'text' ),
			'supports' 			=> array(
                'align' => false,
                'jsx' => true,
			),
		));

		acf_register_block_type(array(
			'name'              => 'customvideo',
			'title'             => __('Custom Video'),
			'description'       => __('A custom video block.'),
			'render_template'   => 'partials/blocks/video.php',
			'post_types' 		=> array('page','post'),
			'category'          => 'layout',
			'icon'              => 'video-alt3',
			'keywords'          => array( 'video', 'image', 'media' ),
			'supports' 			=> array(
				'align' => true,
			),
		));

		# registering a new btn block ---------------------
		acf_register_block_type(array(
			'name'              => 'custombutton',
			'title'             => __('Custom ALL Button'),
			'description'       => __('A custom button block.'),
			'render_template'   => 'partials/blocks/buttony-button.php',
			'post_types' 		=> array('page','post'),
			'category'          => 'layout',
			'icon'              => 'video-alt3',
			'keywords'          => array( 'text', 'content' ),
			'supports' 			=> array(
				'align' => false,
			),
		));

		acf_register_block_type(array(
			'name'              => 'textualcontent',
			'title'             => __('Text'),
			'description'       => __('A custom text block.'),
			'render_template'   => 'partials/blocks/text-content.php',
			'post_types' 		=> array('page','post'),
			'category'          => 'layout',
			'icon'              => 'media-text',
			'keywords'          => array( 'text' , 'content'),
			'supports' 			=> array(
                'align' => false,
                'jsx' => true,
			),
		));
		
	}

	// Check if function exists and hook into setup.
	if( function_exists('acf_register_block_type') ) {
		add_action('acf/init', 'register_acf_block_types');
	}