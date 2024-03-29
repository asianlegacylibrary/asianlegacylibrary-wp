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
	<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700&display=swap" rel="stylesheet">
	<?php } ?>
	
    <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
    <link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
    <link rel="alternate" type="application/atom+xml" title="Atom 1.0" href="<?php bloginfo('atom_url'); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<script type="text/javascript">var ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>";</script>
	<?php wp_head(); ?>
	
	<!-- Google Tag Manager -->
	<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
	new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
	j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
	'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
	})(window,document,'script','dataLayer','GTM-M7XFXCC');</script>
	<!-- End Google Tag Manager -->

    <!-- Global site tag (gtag.js) - Google Ads -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=AW-10892327433"> </script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js' , new Date() );
        gtag('config', 'AW-10892327433');
    </script>

    <!-- Facebook Pixel Code -->
    <script>
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '789981728127844');
        fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none"
                   src="https://www.facebook.com/tr?id=789981728127844&ev=PageView&noscript=1"
        /></noscript>
    <!-- End Facebook Pixel Code -->
    
	<!-- 
		MAILCHIMP POP-UP Code
		Popup created and maintained in Mailchimp. Limited customizability but should be fine for our purposes.
	-->
	<script id="mcjs">
		!function(c,h,i,m,p)
		{
			m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)
		}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/1b327336d6024b90615b2dd07/837ed7c2f3396b460e2c6d191.js");
	</script>
    <!-- End Mailchimp pop-up code --> 

</head>

<body <?php body_class(); ?>>
	
	<!-- Google Tag Manager (noscript) -->
	<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-M7XFXCC"
	height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
	<!-- End Google Tag Manager (noscript) -->
	
	<div class="loading-holder"></div>
	<div class="landscape-message"></div>

	<header>
		<div class="holder">
			<a href="<?php echo home_url(); ?>" class="logo">
				<span class="lottie logo-1" id="logo-1"></span>
				<span class="lottie logo-2" id="logo-2"></span>
			</a>
			<nav>
				<ul class="main-nav">
					<?php 
					wp_nav_menu(
							    array(
							        'menu' => 'Main Menu',
							        'container' => false, 'items_wrap' => '%3$s',
							        'walker' => new CustomMenuHierarchyClass()
							    )
							); ?>
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
	