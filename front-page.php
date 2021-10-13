<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	
	<?php if( have_rows('content_blocks') ):
		$all_fields_count = count(get_field('content_blocks'));
        $fields_count = 1;
	?>
	
	<div class="bgrs-holder">
		<?php while( have_rows('content_blocks') ): the_row(); 
			$row_index				= get_row_index();
		
        	$block_image 			= get_sub_field('block_image');
        	$image_identifier_1 	= get_sub_field('image_identifier_1');
        	$image_identifier_2 	= get_sub_field('image_identifier_2');
        ?>
		<section class="<?php if ($row_index == 1) echo 'active' ?>">
			<?php if($image_identifier_1) : ?>
			<div class="<?php echo $image_identifier_1; ?>" style="background-image: url(<?php echo $block_image['url']; ?>)"></div>
			<?php endif; ?>
			<?php if($image_identifier_2) : ?>
			<div class="<?php echo $image_identifier_2; ?>" style="background-image: url(<?php echo $block_image['url']; ?>)"></div>
			<?php endif; ?>
			<div class="decoration">
				<div class="texts-holder">
					<p>
						揭谛揭谛，波罗揭谛，波罗僧揭谛，菩提萨婆诃。
					</p>
					<p>
						तद्यथा गते गते पारगते पारसङ्गते बोधि स्वाहा
					</p>
					<p>
						ཏདྱ་ཐཱ  ག་ཏེ་ག་ཏེ།  པཱ་ར་ག་ཏེ།  པཱ་ར་སཾ་ག་ཏེ།  བོ་དྷི་སྭཱ་ཧཱ།
					</p>
					<p>
						Tadyatha. Gate gate paragate parasamgate bodhi svaha.
					</p>
				</div>
				<div class="boxes-holder">
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
					<div class="box"></div>
				</div>
				<div class="progresses-holder">
					<div class="progress">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="progress">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="progress">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
					<div class="progress">
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
						<span></span>
					</div>
				</div>
			</div>
		</section>
		<?php endwhile; ?>
		<div id="noise"></div>
	</div>

	<div class="sections-holder">
		<?php while( have_rows('content_blocks') ): the_row(); 
			$row_index				= get_row_index();
        	$block_content			= get_sub_field('block_content');
        ?>
		<?php if($row_index == 1) { ?>
		
		<section class="hero">
			<div class="holder" data-delay-up="0" data-delay-anim-down="1000">
				<article>
					<h1><?php echo $block_content; ?></h1>
				</article>
			</div>
		</section>
		
		<?php } else { ?>
		
			<?php if ($fields_count == $all_fields_count) { ?>
			<section class="footer">
				<div class="holder" data-delay-anim-up="1250">
					<?php echo get_template_part('partials/section','home-footer'); ?>
				</div>
			</section>
			<?php } else { ?>
			<section class="with-auto-height">
				<div class="holder" data-delay-anim-up="1250" data-delay-anim-down="1000">
					<article>
						<p><?php echo $block_content; ?></p>
						<div class="mobile-scroll-indicator"></div>
					</article>
				</div>
				<?php 
				$link = get_sub_field('call_to_action_link');
				$linkTxt = get_sub_field('call_to_action_text_for_link');
				if( $link ): 
					$link_url = $link['url'];
					$link_title = $link['title'];
					$link_target = $link['target'] ? $link['target'] : '_self';
					?>
				<a href="<?php echo esc_url( $link_url ); ?>" class="learn-more-btn" target="<?php echo esc_attr( $link_target ); ?>"><?php echo $linkTxt; ?></a>
				<?php endif; ?>
			</section>
			<?php } ?>
		
		<?php } ?>
		
		<?php $fields_count++; endwhile; ?>
	</div>

	<ul class="side-nav">
		<?php while( have_rows('content_blocks') ): the_row();
			$row_index				= get_row_index();
		?>
		<li <?php if($row_index == 1) { ?>class="active"<?php } ?>><a href="#"><?php echo $row_index; ?></a></li>
		<?php endwhile; ?>
	</ul>
	<?php endif; ?>

	<div class="scroll-indicator">
		<?php _e('Scroll','all_wp_theme'); ?>
		<span></span>
	</div>

	<?php 
		$cta_text 	= get_field('call_to_action_link_text','option');
		$cta_link 	= get_field('call_to_action_link','option');
	?>
	<?php if($cta_link) : ?>
	<a class="cta-btn" href="<?php echo esc_url( $cta_link ); ?>"><span><?php echo $cta_text; ?></span></a>
	<?php endif; ?>
<?php endwhile; endif; ?>

<?php get_footer(); ?>