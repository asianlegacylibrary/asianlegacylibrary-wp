<?php
	$address 				= get_field('address','option');
	$google_map_address_link = get_field('google_map_address_link','option');
	$contact_info 			= get_field('contact_info','option');
	$bottom_copyright_text 	= get_field('bottom_copyright_text','option');
	$different_footer_cta	= get_field('different_footer_cta');
	if ($different_footer_cta) {
		$cta_text 			= get_field('donation_call_to_action_link_text','option');
		$cta_link			= get_field('donation_call_to_action_link','option');
	} else {
		$cta_text 			= get_field('call_to_action_link_text','option');
		$cta_link			= get_field('call_to_action_link','option');
	}
	
?>

<?php if($cta_link) : ?>
<div class="pre-footer">
	<a class="cta-link" href="<?php echo esc_url( $cta_link ); ?>"><span><?php echo $cta_text; ?></span></a>
</div>
<?php endif; ?>

<footer>

	<div class="wrapper">
		<a class="footer-logo-holder" href="<?php echo site_url(); ?>">
			<img class="logo-footer" src="<?php echo get_template_directory_uri(); ?>/pictures/logo-white.svg" alt="Asian Legacy Library">
		</a>
		<div class="footer-columns">
			<div class="col">
				<p><strong><?php _e('The Asian Legacy Library','all_wp_theme'); ?></strong><br>
				<?php echo $address; ?></p>
				<p class="usa-icon">
					<a href="<?php echo $google_map_address_link; ?>" target="_blank">
						USA 
						<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 8.49478C8.604 8.49478 9.5 7.59934 9.5 6.49606C9.5 5.39278 8.604 4.49738 7.5 4.49738C6.396 4.49738 5.5 5.39278 5.5 6.49606C5.5 7.59934 6.396 8.49478 7.5 8.49478Z" stroke="#96A7B6" stroke-linecap="square"/>
							<path fill-rule="evenodd" clip-rule="evenodd" d="M13.5 6.49606C13.5 11.4928 8.5 14.4909 7.5 14.4909C6.5 14.4909 1.5 11.4928 1.5 6.49606C1.5 3.18522 4.187 0.5 7.5 0.5C10.813 0.5 13.5 3.18522 13.5 6.49606Z" stroke="#96A7B6" stroke-linecap="square"/>
						</svg>
					</a>
				</p>
			</div>
			<div class="col">
				<p><strong><?php _e('CONTACT','all_wp_theme'); ?></strong><br>
				<?php echo $contact_info; ?></p>
			</div>
			<div class="col">
				<p><strong><?php _e('FOLLOW US','all_wp_theme'); ?></strong></p>
				<ul class="social-nav">
					<?php wp_nav_menu(array('menu' => 'Social Menu', 'container' => false, 'items_wrap' => '%3$s')); ?>
				</ul>
			</div>
		</div>
		<p class="copy"><?php echo $bottom_copyright_text; ?></p>
	</div>

</footer>