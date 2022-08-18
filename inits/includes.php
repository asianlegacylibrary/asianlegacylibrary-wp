<?php 
/**
 * The theme includes file
 *
 * @package all_wp_theme
 */

// THEME CONSTANTS
define('BASE_PATH', dirname(__FILE__) . DIRECTORY_SEPARATOR);
define('THEME_ASSETS', get_template_directory_uri() . '/assets/');

// THEME ASSETS
function enqueueStylesAndScripts() {
    
    // STYLES
    wp_register_style('main', THEME_ASSETS . 'css/main.css', false, '1.0');
    wp_enqueue_style('main');

    # enqueue-ing a new style sheet for ALL updates -----------------------------------------------
    wp_register_style('child-style', THEME_ASSETS . 'css/asianlegacylibrary-styles.css', false, '1.0');
    wp_enqueue_style('child-style');
    
    // FOOTER SCRIPTS2
    wp_deregister_script('jquery'); 
    wp_register_script('jquery', THEME_ASSETS . 'js/libs/jquery.min.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('jquery');
    wp_register_script('device', THEME_ASSETS . 'js/libs/jquery.device.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('device');
    wp_register_script('preloading', THEME_ASSETS . 'js/libs/jquery.preloading.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('preloading');
    wp_register_script('lottie', THEME_ASSETS . 'js/libs/lottie.min.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('lottie');
    wp_register_script('swipe', THEME_ASSETS . 'js/libs/jquery.swipe.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('swipe');
    wp_register_script('anime', THEME_ASSETS . 'js/libs/anime.min.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('anime');
    wp_register_script('imagesloaded', THEME_ASSETS . 'js/libs/imagesloaded.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('imagesloaded');
    wp_register_script('test', THEME_ASSETS . 'js/libs/test.js', FALSE, '1.11.0', TRUE);
    wp_enqueue_script('test');
    wp_register_script('loadmore', THEME_ASSETS . 'js/load-more.js', FALSE, '1.11.2', TRUE);
    wp_enqueue_script('loadmore');
	
    wp_register_script('init', THEME_ASSETS . 'js/init.js', array(), false, true);
    wp_enqueue_script('init');
    
}
add_action('wp_enqueue_scripts', 'enqueueStylesAndScripts');

if (is_admin()) {
    wp_register_style('admin', THEME_ASSETS . 'css/admin/admin.css');
    wp_enqueue_style('admin');
}