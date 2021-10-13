<?php get_header(); ?>
		
	<div class="news-outer">
		
		<div class="news-top">
			
			<div class="news-top-inner">
				<?php if(is_category()) : ?>
				<h1><a href="<?php echo get_post_type_archive_link( 'post' ); ?>"><?php _e('NEWS & EVENTS','all_wp_theme'); ?></a> <span>/ <?php single_cat_title(); ?></span></h1>
				<?php elseif(is_tag()) : ?>
				<h1><a href="<?php echo get_post_type_archive_link( 'post' ); ?>"><?php _e('NEWS & EVENTS','all_wp_theme'); ?></a> <span>/ <?php single_tag_title(); ?></span></h1>
				<?php else : ?>
				<h1><?php _e('NEWS & EVENTS','all_wp_theme'); ?></h1>
				<?php endif; ?>
				
				<div class="mobile-filter-outer">
					<?php echo get_template_part('partials/section','search-form'); ?>
					<a href="#" class="filter-trigger">
						<svg width="26" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2H26V4H0V2ZM0 11H26V13H0V11ZM26 20H0V22H26V20Z" fill="black"/>
							<circle cx="9" cy="3" r="3" fill="#F9F9F9"/>
							<circle cx="9" cy="21" r="3" fill="#F9F9F9"/>
							<circle cx="9" cy="3" r="2" fill="black"/>
							<circle cx="19" cy="12" r="3" fill="#F9F9F9"/>
							<circle cx="19" cy="12" r="2" fill="black"/>
							<circle cx="9" cy="21" r="2" fill="black"/>
						</svg>
					</a>
				</div>
				
			</div>
			
		
		</div>
		
		<div class="news-content">

			<main>
				<?php 
				
					if(is_category()) {

						$args = array(
							'post_type' => 'post',
							'posts_per_page' => 6,
							'cat' => get_query_var( 'cat' ),
						);

						} elseif(is_tag()) {

							$args = array(
								'post_type' => 'post',
								'posts_per_page' => 6,
								'tag_id' => $tag_id,
							);

						} else {
				
						$args = array(
							'post_type' => 'post',
							'posts_per_page' => 6
						);
					
					}

					$the_query = new WP_Query($args);

					$total = $the_query->found_posts;

					if ($the_query->have_posts()) {
				?>
					<div class="blog-roll regular" 
						 data-id="<?php if(is_category()){ echo get_query_var( 'cat' ); } elseif(is_tag()) { echo $tag_id; }?>" 
						 data-posttype="<?php if(is_category()){ echo 'category'; } elseif(is_tag()) { echo 'tag'; } else { echo 'all'; } ?>" data-counter="<?php echo $total; ?>"
					>
						<?php while ($the_query->have_posts()) { $the_query->the_post(); ?>
							<?php echo get_template_part('partials/item','news'); ?>
						<?php } ?>
					</div>
				<?php
					if($total > 5) :
				?>

				<div class="load-more">
					Show More
				</div>

				<?php endif; ?>

				<?php } wp_reset_postdata(); ?>
			</main>

			<aside id="news-scroll-indicator">
				<?php get_sidebar(); ?>
			</aside>
			
		</div>
		
		<?php if(wp_is_mobile()) { ?>
		
		<?php
		$lastest = new WP_Query(array(
			'post_type' => 'post',
			'posts_per_page' => 3
		));
		if ($lastest->have_posts()) : ?>
			<div class="widget widget-mobile-only">
				<h3>Most Recent Stories</h3>
				<ul class="aside-post-list">
					<?php 
						while ($lastest->have_posts()) : $lastest->the_post(); 
						$title = get_the_title();
						$trimmTitle = substr($title,0,50).'...';
					?>
						<li>
							<?php $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'thumbnail'); ?>
							<a href="<?php the_permalink(); ?>" class="thumb-outer">
								<figure <?php if ( has_post_thumbnail() ) { ?>class="has-image"<?php } ?>>
									<?php if ( has_post_thumbnail() ) { ?><img src="<?php echo $featured_img_url; ?>" alt="<?php the_title(); ?>"><?php } ?>
								</figure>
							</a>
							<hgroup>
								<h4><a href="<?php the_permalink(); ?>"><?php echo $trimmTitle; ?></a></h4>
								<p class="meta"><?php the_time('jS F Y'); ?></p>
							</hgroup>
						</li>
					<?php endwhile; ?>
				</ul>
			</div>
		<?php endif; wp_reset_postdata(); ?>
		
		<?php } ?>

	</div>

<?php echo get_template_part('partials/section','footer'); ?>

<?php  get_footer(); ?>