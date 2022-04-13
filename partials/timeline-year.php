<?php
    $item_year      = get_sub_field('item_year');
    $year_subtitle  = get_sub_field('year_subtitle');
    $year_content   = get_sub_field('year_content');

    $item_image_1   = get_sub_field('item_image_1');
    $item_image_2   = get_sub_field('item_image_2');
    $item_image_3   = get_sub_field('item_image_3');
    $item_image_4   = get_sub_field('item_image_4');
?>

<section class="year">
    <span class="bgr test" style="background-image: url(<?php echo $item_image_1['url']; ?>);"></span>
    <?php echo get_template_part('partials/timeline','decoration'); ?>
    <div class="pieces">
        <span class="first test" style="background-image: url(<?php echo $item_image_3['url']; ?>)"></span>
        <span class="last test" style="background-image: url(<?php echo $item_image_4['url']; ?>)"></span>
    </div>
    <div class="sliced test">
        <img src="<?php echo $item_image_2['url']; ?>">
    </div>
    <hgroup>
        <h3><?php echo $item_year; ?></h3>
        <h4>
            <?php echo $year_subtitle; ?>
        </h4>
    </hgroup>
    <div class="holder">
        <div class="content">
            <article>
                <?php echo $year_content; ?>
                <a href="#" class="close-btn">Close</a>
            </article>
        </div>
        <a href="#" class="trigger"><span></span></a>
    </div>
    <div class="glow">
        <span class="left"></span>
        <span class="right"></span>
    </div>
</section>