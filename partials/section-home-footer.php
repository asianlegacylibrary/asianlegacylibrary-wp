<?php
	$address 				= get_field('address','option');
	$contact_info 			= get_field('contact_info','option');
	$bottom_copyright_text 	= get_field('bottom_copyright_text','option');
?>

<article>
	<ul>
		<li><?php echo $address; ?></li>
	</ul>
	<ul>
		<li><?php echo $contact_info; ?></li>
	</ul>
	<ul class="social-nav">
		<?php wp_nav_menu(array('menu' => 'Social Menu', 'container' => false, 'items_wrap' => '%3$s')); ?>
	</ul>
	<p><?php echo $bottom_copyright_text; ?></p>
</article>