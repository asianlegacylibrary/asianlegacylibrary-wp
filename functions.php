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

// load css into the website's front-end
function asianlegacylibrary_enqueue_style() {
    wp_enqueue_style( 'asianlegacylibrary-style', get_template_directory_uri().'/style.css' ); 
}
add_action( 'wp_enqueue_scripts', 'asianlegacylibrary_enqueue_style' );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function the_theme_widgets_init()
{
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
	function microdot_remove_emoji_support()
    {
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
	function microdot_remove_emoji_from_tinymce( $plugins )
    {
		$key = array_search( 'wpemoji', $plugins );

		if( $key !== false ) {
			unset( $plugins[$key] );
		}

		return $plugins;
	}
	add_filter( 'tiny_mce_plugins', 'microdot_remove_emoji_from_tinymce', 9999, 1 );

	// Removed the DNS prefetch for the Emoji CDN via the filter found in
	// the /wp-includes/general-template.php file
	function microdot_filter_wp_resource_hints( $urls, $relation_type )
    {
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
    function yoasttobottom()
    {
        return 'low';
    }
    add_filter( 'wpseo_metabox_prio', 'yoasttobottom');

	// Limit except length to 125 characters.
	function get_excerpt( $count )
    {
		$permalink = get_permalink($post->ID);
		$excerpt = get_the_content();
		$excerpt = strip_tags($excerpt);
		$excerpt = substr($excerpt, 0, $count);
		$excerpt = substr($excerpt, 0, strripos($excerpt, " "));
		$excerpt = '<p>'.$excerpt.'...</p>';
		return $excerpt;
	}

    function wpPostsByCategory($atts)
    {
        extract( shortcode_atts( array( 'num_posts' => 2 ), $atts, 'num_posts' ) );
        extract( shortcode_atts( array( 'category_id' => 75 ), $atts, 'category_id' ) );

        // the query
        $the_query = new WP_Query( array(
            'cat' => $category_id,
            'posts_per_page' => $num_posts
        ) );

        $string = '<div><br><h3>Related stories</h3></div>';
        $string .= '<div class="blog-roll ts-fn-ln-114">';
        // The Loop
        if ( $the_query->have_posts() ) {
            while ( $the_query->have_posts() ) {
                $the_query->the_post();
                $string .= '<article id="recent-post-' . get_the_ID() . '" class="ts-fn-ln-120">';
                $string .= '<span class="meta">' . get_the_author() . ' - ' . get_the_time('jS M') . '</span>';
                if ( has_post_thumbnail() ) {
                    $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'small');
                    $string .= '<figure class="has-image">';
                    $string .= '<a href="' . get_the_permalink() . '" class="inner-post-thumbnail" style="background-image:url(' . $featured_img_url . ');"></a>';
                    $string .= '</figure>';
                }
                $string .= '<h3><a href="' . get_the_permalink() .'" rel="bookmark">' . get_the_title() .'</a></h3>';
                $string .= '</article>';
            }

            /* Restore original Post Data */
            wp_reset_postdata();
        } else {
            // no recent posts found
            $string .= '<div>No Recent Posts Found</div>';
        }
        $string .= '</div>';

        return $string;
    }
    // Add a shortcode
    add_shortcode('category_posts', 'wpPostsByCategory');

if (!class_exists('CustomMenuHierarchyClass')) {
	class CustomMenuHierarchyClass extends Walker_Nav_Menu
	{
		   	// add classes to ul sub-menus
			function start_lvl(&$output, $depth = 0, $args = NULL)
			{
			    // depth dependent classes
			    $indent = ($depth > 0  ? str_repeat("\t", $depth) : ''); // code indent
			    $display_depth = ($depth + 1); // because it counts the first submenu as 0
			    $classes = array(
			        '',
			        ($display_depth % 2  ? 'menu-odd' : 'menu-even'),
			        ($display_depth >= 2 ? 'menu__subsub-list' : 'menu__sub-list'),
			        'menu-depth-' . $display_depth
			    );
			    $class_names = implode(' ', $classes);

			    // build html
			    if ($display_depth === 1) : 

			        $output .= "\n" . $indent . '<ul class="' . $class_names . '">' . "\n";

			    elseif ($display_depth === 2) : 

			        $output .= "\n" . $indent . '<ul class="' . $class_names . '">' . "\n";

			    else :
			        $output .= "\n" . $indent . '<ul class="' . $class_names . '">' . "\n";

			    endif;
			}

			// add main/sub classes to li's and links
			function start_el(&$output, $item, $depth = 0, $args = NULL, $id = 0)
			{
			    global $wp_query;
			    $indent = ($depth > 0 ? str_repeat("\t", $depth) : ''); // code indent

			    // depth dependent classes
			    $depth_classes = array(
			        ($depth == 0 ? 'menu__item' : ''),
			        ($depth == 1 ? 'menu__sub-item' : ''),
			        ($depth >= 2 ? 'menu__subsub-item' : ''),
			        ($depth % 2 ? 'menu-item-odd' : 'menu-item-even'),
			        'menu-item-depth-' . $depth
			    );
			    $depth_class_names = esc_attr(implode(' ', $depth_classes));

			    // passed classes
			    $classes = empty($item->classes) ? array() : (array) $item->classes;
			    $class_names = esc_attr(implode(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item)));

			    // build html
			    $output .= $indent . '<li id="nav-menu-item-' . $item->ID . '" class="' . $depth_class_names . ' ' . $class_names . '">';

			    // link attributes
			    $attributes  = !empty($item->attr_title) ? ' title="'  . esc_attr($item->attr_title) . '"' : '';
			    $attributes .= !empty($item->target)     ? ' target="' . esc_attr($item->target) . '"' : '';
			    $attributes .= !empty($item->xfn)        ? ' rel="'    . esc_attr($item->xfn) . '"' : '';
			    $attributes .= !empty($item->url)        ? ' href="'   . esc_attr($item->url) . '"' : '';
			    $attributes .= ' class="' . ($depth == 0 ? 'menu__link' : '') . ($depth == 1 ? 'menu__sub-link' : '') . ($depth >= 2 ? 'menu__subsub-link' : '') . '"';

			    $item_output = sprintf(
			        '%1$s<a%2$s>%3$s%4$s%5$s</a>%6$s',
			        $args->before,
			        $attributes,
			        $args->link_before,
			        apply_filters('the_title', $item->title, $item->ID),
			        $args->link_after,
			        $args->after
			    );

			    // build html
			    $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
			}
			
	}
}