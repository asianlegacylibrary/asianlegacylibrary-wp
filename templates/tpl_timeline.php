<?php 
/*
Template Name: Timeline
*/
get_header();
if (have_posts()) : while (have_posts()) : the_post();
?>	

<?php if( have_rows('timeline_sections') ): ?>
    <div class="timeline-holder">
    <?php while( have_rows('timeline_sections') ): the_row(); ?>
        <?php if( get_row_layout() == 'timeline_decade' ): ?>
            
            <?php echo get_template_part('partials/timeline','decade'); ?>

        <?php elseif( get_row_layout() == 'timeline_year' ): ?>

            <?php echo get_template_part('partials/timeline','year'); ?>

        <?php endif; ?>
    <?php endwhile; ?>
    </div>

    <div class="timeline-bullets dark">
		<ul>
        <?php $i = 0; while( have_rows('timeline_sections') ): the_row(); $i++; if( get_row_layout() == 'timeline_decade' ): ?>
            <?php 
                $decade_year_span       = get_sub_field('decade_year_span');
                $decade_sidebar_info    = get_sub_field('decade_sidebar_info');
            ?>
			<li class="<?php if( $i ==1 ){ echo "active"; } ?>">
				<span>
					<strong><?php echo $decade_year_span; ?></strong>
					<em><?php echo $decade_sidebar_info; ?></em>
				</span>
			</li>
        <?php endif; endwhile; ?>
		</ul>
		<span class="progress"></span>
	</div>

	<div class="content-popup">
		<a href="#" class="close-btn">Close</a>
		<div class="content">

		</div>
	</div>

<?php endif; ?>

	

<?php endwhile; endif; get_footer(); ?>