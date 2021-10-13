<!DOCTYPE html>
<html <?php language_attributes();?> dir="ltr" id="modernizrcom" class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">

	<title><?php if(is_home()) bloginfo('name'); else wp_title(''); ?></title>
    
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta name="facebook-domain-verification" content="17wc6dgj3jqjas3tmilvsjzu299oh8" />
	
	<link rel="icon" type="image/svg+xml" href="<?php echo get_template_directory_uri() ?>/favicon.svg">
	<link rel="alternate icon" href="<?php echo get_template_directory_uri() ?>/favicon.ico">
	<link rel="mask-icon" href="<?php echo get_template_directory_uri() ?>/safari-pinned-tab.svg" color="#E6FA05">
	
	<?php if(ICL_LANGUAGE_CODE !== 'en') { ?>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap" rel="stylesheet">
	<?php } ?>
	
    <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
    <link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
    <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="<?php bloginfo('atom_url'); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<script type="text/javascript">var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";</script>
	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>
	
	<div class="loading-holder"></div>

	<header>
		<div class="holder">
			<a href="<?php bloginfo('url'); ?>" class="logo"><?php _e('Asian Legacy Library','all_wp_theme'); ?></a>
			<nav>
				<ul class="main-nav">
					<?php wp_nav_menu(array('menu' => 'Main Menu', 'container' => false, 'items_wrap' => '%3$s')); ?>
				</ul>
			</nav>
			<a href="#" class="nav-trigger">
				<span></span>
				<span></span>
				<span></span>
			</a>
		</div>
		<div class="sub-nav"><ul></ul></div>
	</header>
	