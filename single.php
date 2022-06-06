<?php get_header(); ?>
		
	<div class="news-outer single-news-post">
		
		<?php if (have_posts()) : while (have_posts()) : the_post();
			$featured_img_url 		= get_the_post_thumbnail_url(get_the_ID(),'large'); 
			$featured_img_caption 	= get_the_post_thumbnail_caption(get_the_ID()); 
		?>
		<div class="news-top">
			
			<div class="news-top-inner">
				<small class="meta"><?php the_author(); ?> - <?php the_time('jS F Y'); ?></small>
				<h1><?php the_title(); ?></h1>
			</div>
		
		</div>
		
		<div class="news-content">

			<main>
				<div class="entry">
					<?php /* if ( has_post_thumbnail() ) { ?>
					<figure class="featured-image">
						<img src="<?php echo $featured_img_url; ?>" alt="<?php the_title(); ?>">
						<figcaption><?php echo $featured_img_caption; ?></figcaption>
					</figure>
					<?php } */ ?>
					<?php the_content(); ?>
				</div>
				<div class="share-post">
					<p><?php _e('Share','all_wp_theme'); ?></p>
					<ul>
						<li><a href="https://www.facebook.com/sharer/sharer.php?u=<?php the_permalink(); ?>"  onclick="window.open(this.href, 'mywin', 'left=20,top=20,width=500,height=500,toolbar=1,resizable=0'); return false;">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon-facebook.svg" alt="Share on Facebook">
						</a></li>
						<li><a href="https://twitter.com/share?url=<?php the_permalink(); ?>&text=<?php the_title(); ?>" target="_blank" onclick="window.open(this.href, 'twshare', 'left=20,top=20,width=500,height=300,toolbar=1,resizable=0'); return false;">
						<img src="<?php echo get_template_directory_uri(); ?>/assets/img/icon-twitter.svg" alt="Share on Twitter">
						</a></li>
					</ul>
				</div>
				<?php 
					$categories = get_the_category($post->ID);?>
					<?php 
						$category_ids = array();
						foreach($categories as $individual_category) $category_ids[] = $individual_category->term_id;
						$args=array(
							'category__in' => $category_ids,
							'post__not_in' => array($post->ID),
							'posts_per_page'=> 2
						);
						$RelatedPosts = new wp_query( $args );
					if( $RelatedPosts->have_posts() ) : ?>
						<div class="related-posts">
							<h3><?php _e('Related Stories','all_wp_theme'); ?></h3>
							<div class="blog-roll">
								<?php while ($RelatedPosts->have_posts()) :  $RelatedPosts->the_post(); ?>
									<?php echo get_template_part('partials/item','news'); ?>
								<?php endwhile; ?>
							</div>
						</div>
					<?php endif;
				wp_reset_postdata(); ?>
				<script type="text/javascript">
					function GetReferrer() {
						var preUrl = document.referrer;
					}
       			</script>
				<a href="javascript:location.href=document.referrer;" class="back-btn"><?php _e('Go back','all_wp_theme'); ?></a>
			</main>

			<aside>
				<?php get_sidebar(); ?>
			</aside>
			
		</div>

		
		<?php endwhile; endif; ?>

	</div>

<?php echo get_template_part('partials/section','footer'); ?>

<?php  get_footer(); ?>
