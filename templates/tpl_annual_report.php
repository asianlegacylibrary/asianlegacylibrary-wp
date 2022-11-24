<?php 
/*
Template Name: Annual Report
*/
get_header(); ?>	


<?php if (have_posts()) : while (have_posts()) : the_post(); 
    $featured_img_url = get_the_post_thumbnail_url(get_the_ID(),'large');

    $slide_1_content    = get_field('slide_1_content');
    $slide_1_image      = get_field('slide_1_image');
    $slide_2_content    = get_field('slide_2_content');
    $slide_2_image      = get_field('slide_2_image');

?>

		
	<div class="bgrs-holder">
        <section class="active">
            <div class="sliced front initialized">
  				<img src="<?php echo $slide_1_image['url']; ?>" class="sliced-img"/>
			</div>
            
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
        <section class="">
            <div class="sliced front ">
  				<img src="<?php echo $slide_2_image['url']; ?>" class="sliced-img"/>
			</div>
            <div class="sliced back">
  				<img src="<?php echo $slide_2_image['url']; ?>" class="sliced-img"/>
			</div>
            *<div class="decoration">
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
		<div id="noise"></div>
	</div>

	<div class="sections-holder">
						
		<section class="hero">
			<div class="holder" data-delay-up="0" data-delay-anim-down="1000">
				<article>
					<h1><?php echo $slide_1_content; ?></h1>
                    <div class="mobile-scroll-indicator"></div>
				</article>
			</div>
		</section>
        
        <section class="with-auto-height">
            <div class="holder" data-delay-anim-up="1250" data-delay-anim-down="1000">
                <article>
                    <p><?php echo $slide_2_content; ?></p>
                    <div class="mobile-scroll-indicator"></div>
                </article>
            </div>
        </section>
					
				
						
		<ul class="side-nav">
            <li class="active"><a href="#">1</a></li>
            <li ><a href="#">2</a></li>
        </ul>
	
	<div class="scroll-indicator">
		Scroll<span></span>
	</div>

</div>

	<div class="content-outer inner-page-content page-entry annual-content-holder">
		
		<div class="wrapper report-content-wrapper">
			
			<?php the_content(); ?>
		
		</div>

        <?php echo get_template_part('partials/section','footer'); ?>

	</div>

<?php endwhile; endif; ?>

<?php get_footer(); ?>