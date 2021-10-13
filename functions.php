<?php
/**
 * INITIALIZE theme assets
 *
 * @package all_wp_theme
 */
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'includes.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'blocks.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'cpt.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'tax.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'shortcodes.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'acf.php';
require_once dirname(__FILE__) . DIRECTORY_SEPARATOR . 'inits' . DIRECTORY_SEPARATOR . 'loadmore.php';

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function the_theme_widgets_init() {
	register_sidebar( array(
		'name'          => 'Sidebar',
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<div id="%1$s" class="widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3 class="widget-title">',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'the_theme_widgets_init' );

// Post thumbnails
add_theme_support('post-thumbnails');

/**
 *  Remove all the filters and actions from
 * the /wp-includes/default-filters.php file 
 **/
	function microdot_remove_emoji_support() {
		remove_filter( 'the_content_feed', 'wp_staticize_emoji' );
		remove_filter( 'comment_text_rss', 'wp_staticize_emoji' );
		remove_filter( 'wp_mail', 'wp_staticize_emoji_for_email' );
		remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
		remove_action( 'wp_print_styles', 'print_emoji_styles' );
		remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
		remove_action( 'admin_print_styles', 'print_emoji_styles' );
		remove_action( 'embed_head', 'print_emoji_detection_script' );
	}
	add_action('init', 'microdot_remove_emoji_support');

	// Remove the `wp_emoji` plugin added to TinyMCE in
	// the /wp-includes/class-wp-editor.php file
	function microdot_remove_emoji_from_tinymce( $plugins ) {
		$key = array_search( 'wpemoji', $plugins );

		if( $key !== false ) {
			unset( $plugins[$key] );
		}

		return $plugins;
	}
	add_filter( 'tiny_mce_plugins', 'microdot_remove_emoji_from_tinymce', 9999, 1 );

	// Removed the DNS prefetch for the Emoji CDN via the filter found in
	// the /wp-includes/general-template.php file
	function microdot_filter_wp_resource_hints( $urls, $relation_type ) {
		if( $relation_type === 'dns-prefetch') {
			$key = array_search( 'https://s.w.org/images/core/emoji/2/svg/', $urls );
			if( $key !== false ) {
				unset( $urls[$key] );
			}
		}

		return $urls;
	}
	add_filter('wp_resource_hints', 'microdot_filter_wp_resource_hints', 999, 2);

    // Move Yoast to bottom
    function yoasttobottom() {
        return 'low';
    }
    add_filter( 'wpseo_metabox_prio', 'yoasttobottom');

	// Limit except length to 125 characters.
	function get_excerpt( $count ) {
		$permalink = get_permalink($post->ID);
		$excerpt = get_the_content();
		$excerpt = strip_tags($excerpt);
		$excerpt = substr($excerpt, 0, $count);
		$excerpt = substr($excerpt, 0, strripos($excerpt, " "));
		$excerpt = '<p>'.$excerpt.'...</p>';
		return $excerpt;
	}

?>