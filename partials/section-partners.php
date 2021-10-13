<div class="partners-outer">
	
	<div class="wp-block-columns">
		<div class="wp-block-column">
		<?php if( have_rows('institutional_partners', 'option') ): ?>
			<h2><?php _e('INSTITUTIONAL PARTNERS','all_wp_theme'); ?></h2>
			<?php while( have_rows('institutional_partners', 'option') ): the_row(); 
				$logo_image 	= get_sub_field('logo_image');
				$partner_name 	= get_sub_field('partner_name');
				$partner_info 	= get_sub_field('partner_info');
			?>
			<div class="partner-item">
				<hgroup>
					<?php if($logo_image) { ?>
					<figure>
						<img src="<?php echo $logo_image['url']; ?>" alt="<?php echo $logo_image['alt']; ?>">
					</figure>
					<?php } ?>
					<h4><?php echo $partner_name; ?></h4>
				</hgroup>
				<?php echo $partner_info; ?>
			</div>
			<?php endwhile; ?>
		<?php endif; ?>
		</div>

		<div class="wp-block-column">
		<?php if( have_rows('funding_partners', 'option') ): ?>
			<h2><?php _e('FUNDING PARTNERS','all_wp_theme'); ?></h2>
			<?php while( have_rows('funding_partners', 'option') ): the_row(); 
				$logo_image 	= get_sub_field('logo_image');
				$partner_name 	= get_sub_field('partner_name');
				$partner_info 	= get_sub_field('partner_info');
			?>
			<div class="partner-item">
				<hgroup>
					<?php if($logo_image) { ?>
					<figure>
						<img src="<?php echo $logo_image['url']; ?>" alt="<?php echo $logo_image['alt']; ?>">
					</figure>
					<?php } ?>
					<h4><?php echo $partner_name; ?></h4>
				</hgroup>
				<?php echo $partner_info; ?>
			</div>
			<?php endwhile; ?>
		<?php endif; ?>
		</div>
	</div>

</div>